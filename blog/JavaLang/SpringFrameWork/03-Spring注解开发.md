---
title: 03-Spring注解开发
date: 2021-12-10 14:59:30
category: Spring-FrameWork
tag:
- Java
- Spring
- Junit
---

## 一些问题

在开始前，我们得再了解一下Spring

​  Spring是轻代码而重配置的框架，配置比较繁重，在之前的配置中（基本的配置。注入。注入Properties）中也可以得出这一点，我们实际上并没有写多少代码，大部分时间都在解耦合

​  所以我们就得用到注解来进行开发，Spring的注解就像之前在JavaWeb中，我们用的@WebServlet那样，能够代替XML进行文件，进行简化配置，提高效率

​  也就是说，我们不应该面向xml编程，而是面向注解编程

Spring的注解分为两种，但是实际上都可以用

- 原始注解：出现的比较早，所以被称之为原始注解
- 新注解：出现的比较晚，称之为新注解

​  Spring的原始注解主要是为了替代`<bean></bean>`的配置

## Spring的原始注解

这里先来说说原始注解吧

## ✨原始注解中包含的内容一览

| 注解                            | 说明                                             | 示例                                         |
| :------------------------------ | :----------------------------------------------- | -------------------------------------------- |
| 下面这几个都是创建相关          |                                                  |                                              |
| @Component                      | 用于在类上实例化Bean                             | @Component("userDao")                        |
| @Controller                     | 使用在WEB类层上用于实例化Bean                    | 同上                                         |
| @Service                        | 使用在Service层上用于实例化Bean                  | 同上                                         |
| @Repository                     | 使用在dao层上用于实例化Bean                      | 同上                                         |
| 下面这几个是替代ref来注入对象的 |                                                  |                                              |
| @Autowired                      | 使用在字段上用于根据类型依赖注入                 |                                              |
| @Qualifier                      | 结合@Autowired一起使用，用于根据名称进行依赖注入 |                                              |
| @Resource                       | 相当于@Autowired+@Qualifier，按照名称进行注入    | @Resource(name="userDao")                    |
| 下面这个是替代value注入属性的   |                                                  |                                              |
| @Value                          | 注入普通属性                                     | @Value("张三")<br />@Value("${db.username}") |
| 下面这几个见名知意              |                                                  |                                              |
| @Scope                          | 标注Bean的作用范围                               | @Scope("")                                   |
| @PostConstruct                  | 是用在方法上标注该方法是Bean的初始化方法         |                                              |
| @PreDestory                     | 使用在方法上标注该方法是Bean的销毁方法           |                                              |

### 使用Spring注解前要准备的东西（先用Bean来制作一遍）

我们先创建如下文件：

![image-20211210155656323](/images/SpringFrameWork/03-Spring注解开发/image-20211210155656323.png)

UserDao里面就一个save方法，IMPL实现了，打印了一句话

UserService方法里面也是就一个Save方法，然后IMPL实现了，并且IMPL中存在一个userDao的private变量，有该变量的set方法，以及调用它：

```java
public class UserServiceImpl implements UserService {

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    private UserDao userDao;

    @Override
    public void save() {
        System.out.println("UserService方法被调用了");
        System.out.println("====下面调用userDao的save方法");
        userDao.save();
    }
}
```

接着就是db.properties，就是简简单单的数据库配置文件

```properties
db.username=root
db.password=123456
db.driver=com.mysql.cj.jdbc.Driver
db.url=jdbc:mysql://localhost:3306/db1
```

最后是applicationContext.xml，配置了如下信息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <context:property-placeholder location="classpath:db.properties"/>
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${db.driver}"></property>
        <property name="url" value="${db.url}"></property>
        <property name="username" value="${db.username}"></property>
        <property name="password" value="${db.password}"></property>
    </bean>
    <bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
    <bean id="userService" class="com.MySpring.service.impl.UserServiceImpl">
        <property name="userDao" ref="userDao"></property>
    </bean>
</beans>
```

紧接着我们创建一个单元测试类，来测试下如上内容：

```java
class UserServiceImplTest {
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");

    @Test
    public void test() {
        UserServiceImpl userService = app.getBean("userService", UserServiceImpl.class);
        userService.save();
    }
    /**
UserService方法被调用了
====下面调用userDao的save方法
UserDao的保存用户被调用了
    */

    @Test
    public void test2() throws SQLException {
        DruidDataSource dataSource = app.getBean("dataSource", DruidDataSource.class);
        DruidPooledConnection connection = dataSource.getConnection();
        String sql = "select  * from db1.admin";
        PreparedStatement statement = connection.prepareStatement(sql);
        ResultSet resultSet = statement.executeQuery();
        while (resultSet.next()) {
            String name = resultSet.getString("name");
            String pwd = resultSet.getString("pwd");
            System.out.println(name + ":" + pwd);
        }
        resultSet.close();
        statement.close();
        connection.close();
        dataSource.close();
    }
}
    /**
admin:123456
root:789789
user:000006
    */
```

我们接下来对配置文件中的配置进行转换成注解

### @Component 声明

首先是在我们配置文件中的：

```xml
<bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
<bean id="userService" class="com.MySpring.service.impl.UserServiceImpl">
    <property name="userDao" ref="userDao"></property>
</bean>
```

这两位，我们先从userDao下手，方法非常简单：

```java
@Component("userDao")
//等同于<bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
        System.out.println("UserDao的保存用户被调用了");
    }
}
```

### @Autowired和@Qualifier

```xml
<bean id="userService" class="com.MySpring.service.impl.UserServiceImpl">
    <property name="userDao" ref="userDao"></property>
</bean>
```

这里对应着注入

```java
@Component("userService")
//这里就相当于<bean id="userService" class="com.xxxxxx.UserServiceImpl">
public class UserServiceImpl implements UserService {

    @Autowired()
    @Qualifier("userDao")
    //这里就相当于<property name="userDao" ref="userDao"></property>
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    private UserDao userDao;

    @Override
    public void save() {
        System.out.println("UserService方法被调用了");
        System.out.println("====下面调用userDao的save方法");
        userDao.save();
    }
}

```

### 使用注解开发的注意事项：一定要配置组件扫描

我们刚刚是用注解完成了对bean和set的替代，接下来测试下

```java
@Test
public void test() {
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");

    UserServiceImpl userService = app.getBean("userService", UserServiceImpl.class);
    userService.save();
}
```

运行之后，你会直接发现跳出一个非常显眼的异常

`org.springframework.beans.factory.NoSuchBeanDefinitionException: No bean named 'userService' available`

没有找到ID为userService的Bean

是因为我们还没有告诉Spring，该去哪里获取我们的注解

​  我们再使用注解进行开发时，需要在applicationContext.xml中配置组件扫描，作用是指定哪个包下的哪个Bean需要进行扫描识别使用注解配置的类、字段和方法

语法：

```xml
<context:component-scan base-package="这里跟包名，例如：com.MyProject.Dao"/>
```

base-package：设定基础包，设定完毕后，Spring会扫描这个基础包及其所有子包并解析，自动完成bean的定义和创建

所以我们只需要配置下我们当前用的包：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    
    <context:component-scan base-package="com.MySpring"/>
    
</beans>
```

接着测试下代码能不能跑起来

```md
UserService方法被调用了
====下面调用userDao的save方法
UserDao的保存用户被调用了
```

### @Component的替代品

为了我们的方便和直观的使用注解，Spring不仅仅提供了@Component，还提供了如下几个，他们最终的代码都一样，但是能更加直观的表示当前这个Bean是哪种类型的

| 注解名          | 说明                                |
| :-------------- | :---------------------------------- |
| @Component      | 用于在类上实例化Bean                |
| **@Controller** | **使用在WEB类层上用于实例化Bean**   |
| **@Service**    | **使用在Service层上用于实例化Bean** |
| **@Repository** | **使用在dao层上用于实例化Bean**     |

所以我们得在刚刚的Dao层这样做：

```java
//@Component("userDao")
@Repository("userDao")
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
        System.out.println("UserDao的保存用户被调用了");
    }
}
```

在Service层应该这样：

```java
//@Component("userService")
@Service("userSerivce")
public class UserServiceImpl implements UserService {
    @Autowired()
    @Qualifier("userDao")
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    private UserDao userDao;

    @Override
    public void save() {
        System.out.println("UserService方法被调用了");
        System.out.println("====下面调用userDao的save方法");
        userDao.save();
    }
}
```

### 使用@Autowired和@Qualifier的额外技巧

我们刚刚是这样使用它的

```java
private UserDao userDao;


@Autowired()
@Qualifier("userDao")
public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}
```

Spring也对其进行了优化，我们可以直接把注解放在字段声明之上，底层会通过反射来设定值

所以说我们这里可以使用：（官方不建议）

```java
@Autowired()
@Qualifier("userDao")
private UserDao userDao;

```

就可以省略掉set的书写了（这个要根据实际需求来省略set，但是注入是可以直接放在声明上面的）

并且我们还可以继续缩写：

```xml
@Autowired()
private UserDao userDao;
```

把@Qualifier也省略掉，然后运行一下，依旧是能正常跑起来

或者按照官方的建议，这样写（建议按照下面这种写法），效果都是一样的，前提是，我们定一过一个名为userDao的Bean

```java
private UserDao userDao;    
@Autowired()
public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}
```

当让，还有更直观的方法：

### @Resource的使用-@Autowired的替代品

在上面中，我们把@Autowired和@Qualifier缩写成了这样：

```java
private UserDao userDao;    
@Autowired()
public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}
```

但是感觉这样可视性不强

所以我们可以使用@Resource来更直观的进行注入

```java
@Resource(name="userDao")
private UserDao userDao;

public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}
```

你也可以把@Resource放在set上，效果都是一样的，他需要传递一个name

当让你还可以指定class防止调用错了

```java
@Resource(name = "userDao", type = UserDao.class)
private UserDao userDao;
```

@Resource是最常用的

### @Value注入普通属性、el表达式注入配置文件中的内容

我们还可以通过@value来注入一些普通的属性

```java
@Value("这里是@Value注入的Name")
private String name;
@Value("10")
private int age;
```

是不是感觉有点鸡肋？

但它平常并不是这样用，它可以配合el表达式一起使用

我们之前在applicationContext通过`context:property-placeholder`注入过一个db的配置文件，其中db.username的值是root，现在试图读取下它

```java
@Value("${db.username}")
private String name;
```

然后测试获取下，看看结果：

```md
name的值：root
```

### @Scope 设置作用范围

使用非常简单，只需要：

```java
@Service("userService")
@Scope("prototype")
public class UserServiceImpl{
    //......
}
```

### @PostConstruct和@PreDestory 创建和销毁时调用的方法

其实非常简单：

```java
@Repository("userDao")
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
        System.out.println("UserDao的保存用户被调用了");
    }

    //创建
    @PostConstruct()
    public void init() {
        System.out.println("userDao的初始化方法被调用了");
    }
 //销毁
    @PreDestroy
    public void destroy() {
        System.out.println("userDao的销毁方法被调用了");
    }
}

```

测试一下：

![image-20211210172350241](/images/SpringFrameWork/03-Spring注解开发/image-20211210172350241.png)

## Spring新注解

​  我们在刚刚已经使用了Spring的原始注解完成了一些基本的注解了，但是在我们的配置文件当中，还存有一个使用第三方包的bean，这个使用了第三方包的bean又该怎么处理呢？

​  以及这之中还存在了加载properties文件和组件扫描的配置又该怎么处理？

```java
<context:property-placeholder location="classpath:db.properties"/>

<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="${db.driver}"></property>
    <property name="url" value="${db.url}"></property>
    <property name="username" value="${db.username}"></property>
    <property name="password" value="${db.password}"></property>
</bean>

<context:component-scan base-package="com.MySpring"/>
```

​  所以说，使用原始注解并不能完全替代xml文件，还需要注解来替代的配置如下：

- 非自定义的Bean配置(使用了第三方模块的Bean)
- 加载Properties文件的配置
- 组件扫描的配置
- 还有引入其他文件`<import resource="文件名">`

所以就需要用到新注解了

## ✨新注解中包含的内容一览

| 注解            | 说明                                                                                                                                  | 实例                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| @Configuration  | 用于指定当前类是一个Spring的配置类<br />当创建容器时会从该类上加载注解<br />也就是声明一个类是Spring配置文件                          | @Configuration                             |
| @ComponentScan  | 用于指定Spring在初始化容器时需要扫描的包<br />作用和在Spring的xml配置文件中的<br />`content:component-scan base-package="包名"/>`一样 | @ComponentScan("com.MySpring")             |
| @Bean           | 用在方法上，标注将该方法的返回值存储到Spring容器中<br />等同于Bean标签创建                                                            | @Bean(name = "dataSource")                 |
| @PropertySource | 用于加载`.properties`文件中的配置                                                                                                     | @PropertySource("classpath:db.properties") |
| @Import         | 用于导入其他配置类                                                                                                                    | @Import({类1.class，类2.class...})         |

### 新注解的使用

首先，我们要摒弃以往的使用方式，在我们当前包下创建config文件夹，里面创建一个`SpringConfiguration`对文件

内容如下

```java
//这个是替代applicationContext.xml 声明当前类是一个SPring配置类
@Configuration

//这个是替代：
//<context:component-scan base-package="com.MySpring"/>
//表示Spring容器在创建时要扫描的包
@ComponentScan("com.MySpring")

//这个是替代：
//<context:property-placeholder location="classpath:db.properties"/>
// 加载指定的Properties文件到Spring容器中
@PropertySource("classpath:db.properties")
public class SpringConfiguration {

    //这个Bean相当于替代了：
    //<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    //通过这个@Bean定义的方法必须要有返回值 即使是null
    @Bean(name = "dataSource")
    public DataSource getDataSource() throws IOException {
        // 创建一个数据源
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(dirver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
 
    //这里通过el表达式来使用我们加载的db.properties中获取到的资源
    @Value("${db.driver}")
    private String dirver;

    @Value("${db.url}")
    private String url;

    @Value("${db.username}")
    private String username;

    @Value("${db.password}")
    private String password;
}

```

这样看起来有点臃肿，并且我们还没有使用到@Import接口，接下来使用Import接口把获取线程池的操作交给另外一个文件

我们创建一个DataSourceConfiguration.java，然后在里面把这上面有关连接池的获取复制过去

```java
//声明这是一个Spring配置文件
@Configuration
//倒入db配置文件
@PropertySource("classpath:db.properties")
public class DataSourceConfiguration {

    @Bean(name = "dataSource")
    public DataSource getDataSource() throws IOException {
        // 创建一个数据源
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(dirver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
    @Value("${db.driver}")
    private String dirver;

    @Value("${db.url}")
    private String url;

    @Value("${db.username}")
    private String username;

    @Value("${db.password}")
    private String password;
}
```

紧接着，我们在SpringConfiguration中加上@Import

```java
@Configuration
@ComponentScan("com.MySpring")
//Import可以导入其他的SPring配置文件到这里，需要传入一个数组，数组中的每个内容都得是clazz
@Import({DataSourceConfiguration.class})
public class SpringConfiguration {

}
```

### 在程序中使用新注解容器

​  竟然我们已经使用新注解来创建Spring容器了，那么就不应该通过往常的方法

​  去调用`ClassPathXmlApplicationContext`并传入xml来创建`ApplicationContext`对象了

​  所以我们就得用到Application的另外一个子实现类：AnnotationConfigApplicationContext

### AnnotationConfigApplicationContext的使用

其实使用起来非常简单，它的构造方法之一是传入一个clazz，所以我们只需要：

```java
@Test
public void test() {
    ApplicationContext app = new AnnotationConfigApplicationContext(SpringConfiguration.class);
    UserServiceImpl userService = app.getBean("userService", UserServiceImpl.class);
    userService.save();
}

```

运行结果：并没有出现任何异常

```md
userDao的初始化方法被调用了
UserService方法被调用了
====下面调用userDao的save方法
UserDao的保存用户被调用了
name的值：root
10
```

接下来试试对SQL的操作

```java
@Test
public void test2() throws SQLException {
    ApplicationContext app = new AnnotationConfigApplicationContext(SpringConfiguration.class);
    DruidDataSource dataSource = app.getBean("dataSource", DruidDataSource.class);
    DruidPooledConnection connection = dataSource.getConnection();
    String sql = "select  * from db1.admin";
    PreparedStatement statement = connection.prepareStatement(sql);
    ResultSet resultSet = statement.executeQuery();
    while (resultSet.next()) {
        String name = resultSet.getString("name");
        String pwd = resultSet.getString("pwd");
        System.out.println(name + ":" + pwd);
    }
    resultSet.close();
    statement.close();
    connection.close();
    dataSource.close();
}
```

结果：

```md
十二月 10, 2021 7:09:59 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} inited
10:56456
111:222
15:231
5456:2312

十二月 10, 2021 7:09:59 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} closing ...
十二月 10, 2021 7:09:59 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} closed

进程已结束,退出代码0
```

依旧完美运行

## Spring继承Junit

​  在我们的测试类中，每个测试方法都有如下两行代码：

```java
ApplicationContext app = new AnnotationConfigApplicationContext(SpringConfiguration.class);
DruidDataSource dataSource = app.getBean("dataSource", DruidDataSource.class);
```

这两行的代码的作用是获取容器，如果不写的话，直接会提示空指针异常，所以又不能轻易删掉

所以我们得做以下操作：

- 让SpringJunit 负责创建Spring容器，但是需要将配置文件的名称告诉它
- 将需要进行测试的Bean类直接在测试类中进行注入

### ✨Spring继承Junit的步骤

1. 导入Spring集成junit的包
2. 使用@Runwith注解替换原来的运行期
3. 使用@ContextConfiguration指定配置文件或配置类
4. 使用@Autowired注入需要测试的对象
5. 创建测试方法进行测试

首先是导包，这里需要用到的包是[Spring-test](https://mvnrepository.com/artifact/org.springframework/spring-test)，版本要和你用的spring-context包版本一致

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.3.13</version>
    <scope>test</scope>
</dependency>

```

注意，使用这个玩意要求的Junit的版本为4.x，所以我们还需要导入[Junit4.x](https://mvnrepository.com/artifact/junit/junit)

接下来使用他

```java

@RunWith(SpringJUnit4ClassRunner.class) // 这里是声明Junit的class
//@ContextConfiguration("classpath:applicationContext.xml") //这里是通过配置文件的方式
@ContextConfiguration(classes = {SpringConfiguration.class}) //这是通过传递类的方式
public class SpringJunitTest {
    /**
     * 这里是通过注解的方式注入需要使用的类 Spring-test将会自动注入我们所需要的内容
     */
    @Autowired
    private UserService userService;

    @Autowired
    private DataSource dataSource;

    /**
     * 然后正常测试即可
     */
    @Test
    public void test1() {
        userService.save();
    }

    @Test
    public void test2() throws SQLException {
        Connection connection = dataSource.getConnection();
        PreparedStatement statement = connection.prepareStatement("select * from db1.admin");
        ResultSet resultSet = statement.executeQuery();
        while (resultSet.next()) {
            String name = resultSet.getString(1);
            String pwd = resultSet.getString(2);
            System.out.println(name + ":" + pwd);
        }
        resultSet.close();
        statement.close();
        connection.close();

    }

}

```
