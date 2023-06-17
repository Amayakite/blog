---
title: 01-Spring
date: 2021-12-09 15:07:15
category: Spring-FrameWork
tag:
- Java
- Spring
---

## Spring的简介

> md总算学到这个玩意了，这个东西是Java程序员的命根子。。

​  首先解决下你的疑惑，Spring是**分层的JavaSE/EE应用**full-stack**轻量级**开源框架，以Ioc(Inverse Of Count：反转控制)和Aop(Aspect OrientedProgramming：**面向切面编程**)为内核

​  Spring提供了展现层`SpringMVC`和持久层`Spring JDBCTemplate`以及业务层事务管理等众多的企业级应用技术，还能整合开源世界众多著名的第三方框架和库，逐渐成为使用最多的JavaEE企业级应用开源框架

- 控制反转：这里简单说下，就是反转Bean的创建权  

- 面向切面编程：还记得我们的注解吗...

- Spring是一个全栈的框架：前端后端都有解决方案

- Web层：SpringMVC

- DAO层：SpringJDBC模板

- SpringDate：也是一个存放数据的东西

PS：一张图让你明白Spring是干嘛用的：

![img](/images/Java/SpringFrameWork/01-Spring/40f82edda3cc7cd97dc293bf3501213fb90e9145.jpg)

### Spring的优势

1. 方便解耦，简化开发

  > 通过SPring提供的IOC(控制反转)容器，可以将对象间的依赖关系交由SPring进行控制，避免硬编码所造成的过度耦合，用户也不必再为单例模式类、属性文件解析等这些很底层的需求编写代码，可以更专注于上层应用
  >
  > 举个例子：之前我们编写JavaWEB时，我们要和数据库之间进行操作时，需要借助一个相应的对象，这个对象是死的，每次都要NEW出来，例如跟user数据库联系需要一个User类
  >
  > Spring就可以很好地解决这一点，具体学到了就知道了

2. Aop编程的支持

  > 通过Spring的Aop(面向切面编程)功能，方便进行面向切面编程，许多不容易用传统OOP实现的功能可以通过AOP轻松实现

3. 声明式事务的支持

  > 可以将我们从单调烦闷的事务管理代码中解脱出来，通过声明方式灵活得进行事务管理，提高开发的效率
  >
  > 例如我们原先来控制JDBC的事务，我们需要：
  >
  > autoCommit设为false，开启事务；commit提交事务；rollback回滚
  >
  > 但是我们实际的业务中可能有非常多的地方需要进行事务的控制，那么我们的大部分地方都需要些刚才的那些代码，非常痛苦
  >
  > Spring就可以通过配置的方式一次性配置一片方法，自动地进行事务控制

4. 方便程序的测试

  > Spring可以集成我们常用的junit（@Test），可以更加方便地进行测试
  >
  > 用非容器依赖的编程方式进行几乎所有的测试工作，测试不再是昂贵的工作，而是随手可做的事情

5. 方便集成各种优秀的框架

  > Spring能够对各种优秀的框架(Struts、Hibernate、Hessian、Quartz等)的支持

6. 降低JavaEE API的使用难度

  >Spring 对于JavaEE API（JDBC、JavaMail（一个邮件库）、远程调用等进行了薄薄的封装，使得使用这些API的难度大大降低

7. Java源码是经典学习范例

  > Spring的源代码设计精妙，结构清晰，匠心杜勇，处处体现着大师对Java设计模式灵活运用以及对Java技术的高深造诣，它的源代码无疑是Java技术的最佳实践范例

### Spring的体系结构

Spring框架至今已集成了20多个模块，这些模块分布在以下模块中：

- **核心容器（Core Container）**
- 数据访问/集成（Data Access/Integration）层
- Web层
- AOP（Aspect Oriented Programming）模块
- 植入（Instrumentation）模块
- 消息传输（Messaging）
- 测试（Test）模块

![img](https://img2018.cnblogs.com/blog/480452/201903/480452-20190318225849216-2097896352.png)

### Spring程序开发步骤

在我们之前实现一个对数据库的操作是这样的：

```mermaid
graph LR
A[USerDao userDao = new UserDaoImpl]-->|UserDaoImpl|B[save方法<br>update方法...]
```

Spring把这一步解耦成了如下内容：

![image-20211209155620653](/images/Java/SpringFrameWork/01-Spring/image-20211209155620653.png)

1. 导入Spring开发包的基本实现坐标
2. 编写Dao接口和实现类
3. 创建SPring核心配置文件
4. 在Spring配置文件中配置UserDaoImpl
5. 使用SPring的API获取Bean实例

### 使用SPring完成对Dao的操作

我们首先创建一个空的Maven项目

然后我们加入Spring-context的依赖，这里直接去Maven仓库找即可，用最新的

[链接](https://mvnrepository.com/artifact/org.springframework/spring-context)

我这里用的是5.3.13

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
   <groupId>org.springframework</groupId>
   <artifactId>spring-context</artifactId>
   <version>5.3.13</version>
</dependency>
```

接着，我们建立如下dao文件

![image-20211209160749233](/images/Java/SpringFrameWork/01-Spring/image-20211209160749233.png)

UserDao接口只有一个方法

```java
public interface UserDao {
   public void save();
}
```

UserDaoImpl只做个简单的实现，并不去连接数据库

```java
public class UserDaoImpl implements UserDao {
   @Override
   public void save() {
       System.out.println("UserDaoImpl.save()");
   }
}
```

接着，我们在res文件夹中创建一个SPring的配置文件

![image-20211209161009456](/images/Java/SpringFrameWork/01-Spring/image-20211209161009456.png)

文件名没有硬性规定，但是一般在开发中都会习惯性地设置为applicationContext

设置内容为(原理先不管)：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
   
   <bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
   
</beans>
```

紧接着，我们创建一个测试类，写入如下方法，原理也先不管

```java
@Test
public void testJ(){
   ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
   UserDaoImpl userDao = (UserDaoImpl) app.getBean("userDao");
   userDao.save();
}
```

然后我们创建测试文件(在impl文件中按下alt+insert快速创建) 下面测试类中的代码原理我们先不管

```java
class UserDaoImplTest {

   @Test
   void save() {
       ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
       UserDaoImpl userDao = (UserDaoImpl) app.getBean("userDao");
       userDao.save();
   }
}
```

输出结果，完美运行：

```md
UserDaoImpl.save()
```

接下来我们回顾一下开发步骤

1. 导入坐标（Spring-context）
2. 创建Bean（UserDao和UserDaoImpl）
3. 创建applicationContext.xml
4. 在配置文件中配置id和class路径
5. 创建ApplicationContext对象
6. GetBean

是不是还没搞明白，接下来我们一步一步地了解Spring

## Spring的配置文件

## ✨✨Spring配置文件一览

这里不是写给在读的人看的，这里是写给之后的我看的 如果你是直接看我的文章到这里的话，先略过这一步

来自[这篇文章](https://blog.csdn.net/zxcbnm7089/article/details/105677523)

```xml
<!-- 注解包扫描 -->
<context:component-scan base-package="com.test.fx.service"></context:component-scan>
<!-- 引入DB配置文件 -->
<context:property-placeholder location="classpath:oracleDriver.properties"/> 
<!-- 配置数据源 -->
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
    <property name="driverClassName" value="${driver}"></property>
    <property name="url" value="${url}"></property>
    <property name="username" value="${name}"></property>
    <property name="password" value="${password}"></property>
</bean>
<!-- 创建SqlSessionFactory -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <property name="mapperLocations" value="classpath:com/baizhi/fx/dao/*DaoImpl.xml"></property>
</bean>
<!-- 扫描Mapper文件并生成dao对象 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"></property>
    <property name="basePackage" value="com.test.fx.dao"></property>
</bean>
<!-- 配置事务管理器 -->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>
<!-- 事务管理器注解 --> 
<tx:annotation-driven transaction-manager="transactionManager"/>



```

### Bean标签的基本配置

我们刚刚在创建applicationContext的时候，默认是只有这些内容的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
   
   
  
</beans>
```

我们在其中添加了一句话：

```xml
<bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
```

这玩意用于配置对象交由**Spring**来创建

默认情况下它调用的是类中的**无参构造器**（TIPS:反射创建对象默认就是调用无参构造器），如果没有无参构造器则不能创建成功

这个bean的基本属性有两点：

- id：Bean实例在Spring容器中的唯一标识，就像身份证一样，不可重复
- class：Bean的全限定名称

#### Bean标签的范围配置-scope

除了上述两个属性，我们还可以配置scope：对象的作用范围，取值如下

|    取值范围    | 说明                                                                               |
| :------------: | ---------------------------------------------------------------------------------- |
| **singleton**  | 单例的，默认值                                                                     |
| **prototype**  | 多例的                                                                             |
|    request     | Web项目中，Spring创建一个Bean对象，将对象存入到request域中<br />单次的请求域       |
|    session     | Web项目中，Spring创建一个Bean对象，将对象存储到session域中<br />单个会话的域       |
| global session | Web项目中，应用在Portlet环境，如果没有Portlet环境，nameglobal session等同于session |

接下来我们主要说明singleton和prototype（其他的几个之后再说）

其实测试非常简单，我们首先回顾下单例模式：

在学习JavaSE的时候，我们有一种创建对象的方式

```java
Class A{
   //私有构造器
   private A(){};
//...这里跟上一些属性和变量之类的
   private final static A priA;
   static{
      priA = new A();
   }
   public static A getA(){return priA};
}
```

我们通过getA调用返回的A始终是全局唯一的，这就是单例设计模式

接下来便写下代码测试下Spring这个singleton是否为单例：只需要判断其返回的对象的地址是否全部都相同

```java
@Test
public void testScope(){
   ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
   UserDaoImpl userDao1 = (UserDaoImpl) app.getBean("userDao");
   UserDaoImpl userDao2 = (UserDaoImpl) app.getBean("userDao");
   System.out.println(userDao1);
   //com.MySpring.dao.impl.UserDaoImpl@7f0eb4b4
   System.out.println(userDao1);
   //com.MySpring.dao.impl.UserDaoImpl@7f0eb4b4
   System.out.println(userDao1==userDao2);
   //true
}
```

结果和我们预想的一样，他们都是同一个对象

那么把scope改成prototype呢？接下来测试下

```xml
<bean id="userDao" 
      class="com.MySpring.dao.impl.UserDaoImpl"
      scope="prototype"
      ></bean>
```

接着运行上面的代码，发现了如下结果：

```java
com.MySpring.dao.impl.UserDaoImpl@3febb011
com.MySpring.dao.impl.UserDaoImpl@10e31a9a
false
```

(如果你运行的时候发现获取的两个com长得一模一样，不用担心，那是因为离太近操作系统分配的内存地址太近了，可以在他们中间放一些其他代码，就能看出区别了)

#### singleton和prototype的创建时机的区别

​  （TIPS：可以直接到最下面看总结）

​  到这里，你可能会有疑问，这两玩意连创建时机都不同的？

​  我们直接上代码说明吧

现在UserDaoImpl中加入一个无参构造，打印一句话出来：

```java
public UserDaoImpl() {
   System.out.println("UserDaoImpl.UserDaoImpl()无参构造被调用了");
}
```

接着将applicationContext的userBean修改成单例模式

```xml
<bean id="userDao" 
      class="com.MySpring.dao.impl.UserDaoImpl"
     scope="singleton"></bean>
```

然后在测试类中加入如下代码并运行：

```java
@Test
public void testScope() {
   System.out.println("TestScope开始执行了");
   ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
   System.out.println("创建app完毕");
   UserDaoImpl userDao1 = (UserDaoImpl) app.getBean("userDao");
   System.out.println("创建userDao1完毕");
   UserDaoImpl userDao2 = (UserDaoImpl) app.getBean("userDao");
   System.out.println("创建userDao2完毕");
}
```

结果：

```md
TestScope开始执行了
UserDaoImpl.UserDaoImpl()无参构造被调用了
创建app完毕
创建userDao1完毕
创建userDao2完毕
```

​    我们还没有获取到userBean的实例对象的时候，userDaoImpl的无参构造器就被调用了  

    也就是说这个UserDaoImpl在扫描到ApplicationContext.xml的时候就通过反射调用无参构造器创建了一个实例对象出来

接下来我们将singleton替换为prototype

```xml
<bean id="userDao" 
      class="com.MySpring.dao.impl.UserDaoImpl"
      scope="prototype"
      ></bean>
```

再试图运行下代码：

```md
TestScope开始执行了
创建app完毕
UserDaoImpl.UserDaoImpl()无参构造被调用了
创建userDao1完毕
UserDaoImpl.UserDaoImpl()无参构造被调用了
创建userDao2完毕
```

可以发现，在prototype模式下，我们只有每次getBean的时候才会创建一个实例对象

总结：

1. 当scope的取值为**singleton**时
   - Bean的实例化个数：1个
   - Bean的实例化时机：当Spring核心文件被加载时，实例化配置的Bean实例
   - Bean的生命周期
     - 对象创建：当应用加载，容器创建时，对象就创建了
     - 对象运行：**只要容器在，对象就一直活着**
     - 对象销毁：**当应用卸载时（应用结束时），销毁容器时，对象就被销毁了**
2. 当scope的取值为**prototype**时
   - Bean的实例化个数：多个
   - Bean的实例化时机：当调用getBean()方法时实例化Bean
     - 对象创建：当适用对象时，创建新的对象实例
     - 对象运行：**只要对象在使用中，就一直活着**
     - 对象销毁：**当对象长时间不用时，被Java的垃圾回收机制(Gc)回收**

### Bean生命周期配置的属性

我们可以自由的配置Bean生命周期中创建时和销毁时执行的东西

- `init-method`：指令类中的初始化方法名称
- `destory-method`：制定类中销毁方法的名称

使用方式：我们首先在UserDaoImpl中新增两个方法：

```java
public class UserDaoImpl implements UserDao {
    // ...All the other things
    public void init() {
        System.out.println("=================INIT初始化方法被调用了");
    }

    public void destroy() {
        System.out.println("=================DESTROY销毁方法被调用了");
    }
}
```

接着在applicationContext.xml配置的bean中额外添加如下内容

```xml
<bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"
      scope="singleton"
      init-method="init" 
      destroy-method="destroy">
</bean>
```

这样就可以了，在创建和销毁这个Bean的实例的时候，都会调用其方法，接下来创建一个测试单元测试一下：

```java
@Test
public void testLifeCycle(){
    System.out.println("TestScope开始执行了");
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    System.out.println("创建app完毕");
    UserDaoImpl userDao1 = (UserDaoImpl) app.getBean("userDao");
    System.out.println("创建userDao1完毕");
    System.out.println("主程序结束");

}
```

但似乎运行结果少了个Destory的方法

```md
TestScope开始执行了
创建app完毕
UserDaoImpl.UserDaoImpl()无参构造被调用了
=================INIT初始化方法被调用了
创建userDao1完毕
主程序结束
```

其实原因非常简单，平常这东西都是丢到tomcat上跑，tomcat在关闭之前会给其所有程序下达命令，Spring也会接收到，然后开始自身的销毁，我们这一个单元测试太快就结束了，它来不及的去销毁，所以就导致了如上情况发生

有一个可能可以调用成功我们destory的方法（不一定成功）

```java
@Test
public void testLifeCycle(){
    System.out.println("TestScope开始执行了");
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    System.out.println("创建app完毕");
    UserDaoImpl userDao1 = (UserDaoImpl) app.getBean("userDao");
    System.out.println("创建userDao1完毕");
    System.out.println("主程序结束");
    //        试图通过向下转型来调用close方法，不一定调用成功（留给她的时间太短了）
    //        我们是new 了一个 ClassPathXmlApplicationContext 并向上转型成ApplicationContext
    //       ApplicationContext中并没有close方法，但是ClassPathXmlApplicationContext内有
    ((ClassPathXmlApplicationContext)app).close();
}
```

### 配置文件中设定实例化的方式（无参、工厂静态、工厂实例）

Spring当让不可能只提供一个无参构造给我们

它总共提供了三种实例化方式供我们选择

- **无参构造**方法实例化
- **工厂静态**方法实例化
- **工厂实例**方法实例化

因为默认就是无参构造，这里就不做演示了

#### 为什么要通过工厂来创建实例

​  很简单，因为我们创建对象的时候，不一定是通过无参构造来创建的，而是通过有参构造，但是在Spring中无法直接传入参数（目前来说），所以就需要工厂来帮我们具体的执行创建对象

​  就比如说创建JDBC的实例，是一定要传入一个db.properties的实例对象的(Druid)，我们直接通过无参构造的方式无法实现动态的传入（例如在开发中和实际项目上线的时候，可能用的是两个sql数据库），所以就需要工厂来帮我们实现动态的传入指定的db.properti

#### 工厂静态

我们先新建一个工厂类 其中包含一个返回UserDaoImpl的实例对象的方法

```java
package com.MySpring.factory;

import com.MySpring.dao.UserDao;
import com.MySpring.dao.impl.UserDaoImpl;

public class StaticFactory {
    public static UserDao getUserDao() {
        return new UserDaoImpl();
    }
}

```

然后修改下application

```xml
<bean id="userDao"
      # 下面这里修改为工厂的class
      class="com.MySpring.factory.StaticFactory"
      # 下面是要调用的工厂的哪个方法来创建实例对象 
      factory-method="getUserDao"
      >
</bean>
```

接着测试下：

```java
@Test
public void testLifeCycle(){
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    System.out.println("创建app完毕");
    UserDaoImpl userDao1 = (UserDaoImpl) app.getBean("userDao");
    System.out.println("创建userDao1完毕");
    System.out.println(userDao1);

}
```

```java
UserDaoImpl.UserDaoImpl()无参构造被调用了
创建app完毕
创建userDao1完毕
com.MySpring.dao.impl.UserDaoImpl@2f9f7dcf
```

完美创建了，接下来我们使用工厂实例方法创建

#### 工厂实例

先说下，这和工厂静态的不同是：多了一个工厂的实例对象，我们以后可以方便的调用这个工厂

现在可能不太理解为啥要这样做，但是等以后学到Spring Boot 就知道了

首先，我们的工厂类要这样写：

```java
public class StaticFactory {
    //注意，这里不是静态方法
    public UserDao getMyUserDao() {
        return new UserDaoImpl();
    }
}
```

然后按照这样配置applicationContext.xml

```xml
<bean id="factory" class="com.MySpring.factory.StaticFactory"></bean>
<bean id="userDao" factory-bean="factory" factory-method="getMyUserDao"></bean>
```

- factory-bean：设置工厂的名称
- factory-method：设置执行工厂中的哪个方法获取实例

测试：

```java
@Test
public void testLifeCycle(){
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    System.out.println("创建app完毕");
    UserDaoImpl userDao1 = (UserDaoImpl) app.getBean("userDao");
    System.out.println("创建userDao1完毕");
    System.out.println(userDao1);

}
```

结果：

```md
UserDaoImpl.UserDaoImpl()无参构造被调用了
创建app完毕
创建userDao1完毕
com.MySpring.dao.impl.UserDaoImpl@1bd4fdd
```

### 配置文件-依赖注入

我们先来模拟一下实际WEB开发中文件的过程吧

首先我们需要有一个Services包，这个包内有相关接口和实现类，比如UserServices

![image-20211209204903649](/images/Java/SpringFrameWork/01-Spring/image-20211209204903649.png)

编写一下接口：这里做最简单的模拟

```java
public interface UserService {
     void save();
}
```

然后给他一个实现类，实现类有如下内容：获取一个UserDao

```java
public class UserServiceImpl implements UserService {
    @Override
    public void save() {
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserDao userdao = (UserDao) app.getBean("userDao");
        userdao.save();
    }
}
```

然后在Demo目录下新建一个UserController，里面编写如下内容（就当成有用户访问就执行其中的内容）

```java
public class UserController {
    public static void main(String[] args) {
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = (UserService) app.getBean("userService");
        userService.save();
    }
}
```

然后在applicationContext中加入如下内容：

```xml
<bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
<bean id="userService" class="com.MySpring.services.impl.UserServiceImpl"></bean>
```

然后运行一下，似乎是没问题的

```md
UserDaoImpl.UserDaoImpl()无参构造被调用了
UserDaoImpl.UserDaoImpl()无参构造被调用了
UserDaoImpl.save()被调用了
```

但是仔细一想，不对啊，ApplicationContext被创建了两次、加载了两次配置文件？！

​  `UserDaoImpl.UserDaoImpl()无参构造被调用了` 这句话出现了两次，表示创建了两个UserDao

​  仔细捋一捋，目前UserService实例和UserDao实例都保存在Spring容器中，当前的做法是在容器外部分别获得UserDao实例和Userservice实例，然后在程序中进行结合

![image-20211209205819276](/images/Java/SpringFrameWork/01-Spring/image-20211209205819276.png)

​  **那么我们是否可以换一个思路，因为UserService和UserDao都在Spring容器中，而最终程序直接使用的是UserService，所以我们是否可以将UserDao设置在UserService内部？**

​  问题来了，我们该怎么把某个对象、某个数据给另外一个对象？

​  那么总得调用另外一个对象的某个方法，才能把这个玩意给他吧？

​  无非就是两种方法嘛

```java
class A{
    private B b ;
    //方法1 构造函数
    public A(B b){
        this.b=b;
    }
    //方法2 set方法
    public void setB(B b){
        this.b = b;
    }
}
// 那么如何通过Spring来进行依赖注入呢
```

![image-20211209210404022](/images/Java/SpringFrameWork/01-Spring/image-20211209210404022.png)

### 依赖注入的概念

​  在刚刚的案例中，我们得到的结论无非就是，在UserService中，需要一个UserDao，最笨的方法就是：在UserService中新建一个set方法，然后再到我们的操作层手动的将UserDao给set进去，然后再调用-----但是这样做的话，UserService的作用何在？我还不如直接调用UserDao得了

​  这时候，就要用到Spring的依赖注入了。

​  依赖注入（Dependency Injection），是Spring核心框架Ioc的具体实现

​  在编写程序时，通过Ioc控制反转，把对象的创建交给了Spring，但是代码中不可能会出现没有依赖的情况，Ioc解耦只是降低他们的依赖关系，但不会消除，例如：业务层仍会调用持久层的方法

​  那这种业务层和持久层的依赖关系，在使用Spring后，就让Spring来维护了

​  简单的说，就是坐等框架把持久层传入业务层，而不用我们自己去获取了

刚刚也说了，现在有两种方法可以把数据注入到UserService内部

- 构造方法 有参构造
- set方法

我们先说Set方法吧

#### 通过set方法来进行配置注入

首先将UserService改成这样：就像正常的程序一样

```java
public class UserServiceImpl implements UserService {
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public void save() {
        userDao.save();
    }
}
```

然后修改applicationContext.xml

```xml
<bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
<bean id="userService" class="com.MySpring.services.impl.UserServiceImpl">
    <property name="userDao" ref="userDao"></property>
</bean>
```

这里的property是这样的：

- name的值得是SetXXX中的XXX，XXX的首字母替换成小写后放到这里来，我们的是`setUserDao`
  - 所以传入`userDao`

- ref是要传入的值是谁，需要Spring容器中的Bean的ID
  - 所以我们传入之前定义的userDao

或者说如果感觉这样有点绕的话：

```xml
<bean id="ServerUserDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
<bean id="userService" class="com.MySpring.services.impl.UserServiceImpl">
    <property name="userDao" ref="ServerUserDao"></property>
</bean>
```

是不是就清晰了

接下来我们回过头测试一下

```java
public class UserController {
    public static void main(String[] args) {
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = (UserService) app.getBean("userService");
        userService.save();
    }
}
```

结果：

```md
UserDaoImpl.UserDaoImpl()无参构造被调用了
UserDaoImpl.save()
```

这下舒服了，只创建了一个UserDaoImpl，完美解决了资源浪费以及后面可能会出现的一系列问题

##### Set注入的两种方式

除了我们刚刚的那一种：

```xml
<bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
<bean id="userService" class="com.MySpring.services.impl.UserServiceImpl">
    <property name="字段名" ref="注入的内容ID"></property>
</bean>
```

还有一种更简便的方式可以来注入内容：通过P命名空间来注入

​  P命名空间注入本质也是set方法注入，但比起上面的那个set方法注入更加方便，主要体现在配置文件中

分为两步：

1. 引入p命名空间：在beans标签中加入如下属性

   ```xml
   xmlns:p="http://www.springframework.org/schema/p"
   ```

2. 紧接着，修改注入方式

   ```xml
   <bean id="userService" class="com.MySpring.services.impl.UserServiceImpl"
         p:userDao-ref="userDao"></bean>
   ```

   - 小tips：这里你直接输入一个`p:`，然后ieda会提示你引入，按下ctrl+enter即可自动引入步骤1中的属性

这里的`p:userDao-ref="userDao"`大概是如下意思

- `userDao-ref`要设定的属性
- `=userDao`设定的值

这就是个语法糖（像JSp的JSTL那样），降低了我们的步骤

#### 通过构造函数来进行配置注入

我们把UserService改成如下内容：

```java
public class UserServiceImpl implements UserService {
    private UserDao userDao;
 // 无论是在什么情况下，使用反射来创建对象一定要保留一个无参构造器
    public UserServiceImpl() {
    }

    // 注意下 我这里取的变量名是 ServerUserDao 防止你等下绕晕
    public UserServiceImpl(UserDao ServerUserDao) {
        this.userDao = ServerUserDao;
    }

    @Override
    public void save() {
        userDao.save();
    }
}
```

然后在applicationContext.xml中添加如下内容：

```xml
<bean id="userDao" class="com.MySpring.dao.impl.UserDaoImpl"></bean>
<bean id="userService" class="com.MySpring.services.impl.UserServiceImpl">
    <constructor-arg name="ServerUserDao" ref="userDao"></constructor-arg>
</bean>
```

这里construcotr-arg标签中的name表示要设置哪个属性（传入属性名）

ref表示引用Spring容器中的BeanID

然后测试一下

```java
public class UserController {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = context.getBean("userService", UserService.class);
        userService.save();
    }
}
```

结果：

```md
UserDaoImpl.UserDaoImpl()无参构造被调用了
UserDaoImpl.save()
```

这就是通过构造方法传值

### Bean依赖注入支持的类型

除了我们刚刚用的通过传入BeanID的方式注入，Spring还支持普通数据类型、集合的注入

注入数据的三种数据类型

- 普通数据类型
- 引用数据类型-BeanID
- 集合数据类型

这里我们先来说下普通数据类型的注入

#### 普通数据类型的注入

我们先将UserService改成这样：

```java
public class UserServiceImpl implements UserService {
    private UserDao userDao;
    private String username;
    private int age;


    public void setUsername(String username) {
        this.username = username;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public UserServiceImpl() {
    }

    public UserServiceImpl(UserDao ServerUserDao) {
        this.userDao = ServerUserDao;
    }

    @Override
    public void save() {
        System.out.println(username);
        System.out.println(age);
        userDao.save();
    }
}
```

然后我们进行注入，普通属性使用value决定值即可，你也可以像注入userDao一样，把property换成constructor-arg来进行构造的注入，ref是引用注入，value是基本数据类型注入

```xml
<bean id="userService" class="com.MySpring.services.impl.UserServiceImpl">
    <constructor-arg name="ServerUserDao" ref="userDao"></constructor-arg>
    <property name="age" value="25"></property>
    <property name="username" value="张三"></property>
</bean>
```

然后试图运行：

```md
张三
25
UserDaoImpl.save()
```

#### 集合的注入-List、Map、Properties

我们先修改UserServiceImpl成这样：

```java
public class UserServiceImpl implements UserService {
    private List<String> list;
    /**
     * 这个User 有username password两个属性 有构造方法（只有有参） 有重写了tostring()
     */
    private Map<String, User> userMap;
    private Properties properties;

    // 三个set方法
    public void setList(List<String> list) {
        this.list = list;
    }

    public void setUserMap(Map<String, User> userMap) {
        this.userMap = userMap;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public UserServiceImpl() {
    }


    @Override
    public void save() {
//        打印
        System.out.println(list);
        System.out.println(userMap);
        System.out.println(properties);
    }
}

```

然后编写下applicationContext.xml

```xml
<bean name="user1" class="com.MySpring.services.impl.User">
    <constructor-arg name="username" value="admin"/>
    <constructor-arg name="password" value="123456"/>
</bean>
<bean name="user2" class="com.MySpring.services.impl.User">
    <constructor-arg name="username" value="user"/>
    <constructor-arg name="password" value="123456789"/>
</bean>
<bean name="user3" class="com.MySpring.services.impl.User">
    <constructor-arg name="username" value="grid"/>
    <constructor-arg name="password" value="12345600000"/>
</bean>
<!--    下面这里是userService的-->
<bean id="userService" class="com.MySpring.services.impl.UserServiceImpl">
    <!--        List的传值，直接用list标签，然后value标签里面写入想要的值即可（普通属性的话） 如果是Object之类的话，<ref bean="BeanID即可"/>-->
    <property name="list">
        <list>
            <value>张三</value>
            <value>李四</value>
            <value>王老五</value>
        </list>
    </property>
    <property name="userMap">
        <!--            map中，如果key是Object 就要通过key-ref来进行BeanID引用 value同理-->
        <map>
            <entry key="1" value-ref="user1"></entry>
            <entry key="2" value-ref="user2"></entry>
            <entry key="3" value-ref="user3"></entry>
        </map>

    </property>
    <property name="properties">
        <!--            properties的话，因为值是固定死了的，所以只需要 prop key=自定 然后标签体内传入想要设定的值-->
        <props>
            <prop key="name">张三</prop>
            <prop key="age">18</prop>
            <prop key="password">123123123123</prop>
        </props>
    </property>

```

运行一下试试：

```md
[张三, 李四, 王老五]
{1=User{username='admin', password='123456'}, 2=User{username='user', password='123456789'}, 3=User{username='grid', password='12345600000'}}
{age=18, password=123123123123, name=张三}
```

结果和我们注入的一样，看起来没问题了，就是这样写太tm难受了

当让以后会使用AIO来进行解决（就像是@WebServlet那样）

### 分模块开发-将配置文件变成多个，并引入

像刚刚那种样子，xml一大堆一大堆的，看起来非常痛苦，也不利于我们的后期维护

在实际开发过程中，这个量会远远比这个多得多，这样就导致Spring的配置繁杂且体积很大，所以，可以将部分配置拆解到其他配置文件在，而在Spring主配置文件通过import标签实现加载

例如我们现在把User单独的放置到`applicationContext-user.xml`中

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <bean name="user1" class="com.MySpring.services.impl.User">
        <constructor-arg name="username" value="admin"/>
        <constructor-arg name="password" value="123456"/>
    </bean>
    <bean name="user2" class="com.MySpring.services.impl.User">
        <constructor-arg name="username" value="user"/>
        <constructor-arg name="password" value="123456789"/>
    </bean>
    <bean name="user3" class="com.MySpring.services.impl.User">
        <constructor-arg name="username" value="grid"/>
        <constructor-arg name="password" value="12345600000"/>
    </bean>
</beans>
```

然后在`applicationContext.xml`中添加一个标签即可(一般都是在最上面加)

```xml
<import resource="applicationContext-user.xml"></import>
```

当让这个玩意还可以细分的创建，例如`applicationContext-db-create-user.xml`之类的，这个标签**支持链式加载**，我们最终要写入到Java代码的只有`applicationContext.xml`

### Spring配置的总结

```xml
<bean>标签
    id属性：在容器中Bean实例的唯一标识，不允许重复
    class属性：要实例化的Bean全限定名
    scope属性：Bean的作用范围，常用是Singleton(默认)和prototype
    <property>标签：set注入
        name属性：属性名称
        value属性：注入的属性值
        ref属性：注入的对象引用值
        <list>标签
        <map>标签
        <properties>标签
   <construcort-arg>标签：构造方法注入
<import>标签：倒入其他的Spring配置文件
```

目前来说，Spring这玩意看起来非常难用，但是它是其他超好用的框架的垫脚石》。

## Spring相关的API

### ApplicationContext的继承体系

​  说起Spring 我们第一个当然要说这玩意啦~在我们写第一段SPring代码的时候，它就一直在那了

```java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
```

可以看到，我们使用多态的方式去定义它的，前面用的`ApplicationContext`作为编译类型，运行类型则是`ClassPathXmlApplicationContext`，从这一点我们可以轻松的看出他们两是父子关系

接下来看看类图，看看Application的上下都有哪些类和接口

![image-20211209234155136](/images/Java/SpringFrameWork/01-Spring/image-20211209234155136.png)

首先看左下那两个，其中一个就是我们正在使用的`ClassPathXmlApplicationContext`

他们两个继承了四个抽象类，然后顶上全都是接口

ApplicationContext也是一个接口

我们这里说下三个常用的实现类：

- ClassPathXmlApplicationContext
  - 它是从类的根路径下加载配置文件 通常来说开发项目都是使用这种
- FileSystemXmlApplicationContext
  - 它是从磁盘路径下加载配置文件，配置文件可以在磁盘的任意位置
  - new它的时候必须得指定绝对路径或者基于部署目录的相对路径（一般都是绝对路径）
- AnnotationConfigApplicationContext
  - 使用注解来配置容器对象时，需要用此类来创建Spring容器，它用于读取注解
  - 这个之后注解开发用的多

### getBean方法的使用

我们看下源码：发现他有很多中重载方式

```java
//只传入一个String 返回一个Object
public Object getBean(String name) throws BeansException {
    assertBeanFactoryActive();
    return getBeanFactory().getBean(name);
}
// 传入一个Clazz 获取对应的Bean 如果有多个使用相同的clazz创建的Bean的时候，不建议使用这个
public <T> T getBean(Class<T> requiredType) throws BeansException {
    assertBeanFactoryActive();
    return getBeanFactory().getBean(requiredType);
}
//传入一个name 和一个Clazz 返回一个 Clazz类型的数据（泛型）
// 这就是上面那两位的结合强化版，推荐使用这种方式，可以不用向下转型的获取执行类型的Bean实例对象
public <T> T getBean(String name, Class<T> requiredType) throws BeansException {
    assertBeanFactoryActive();
    return getBeanFactory().getBean(name, requiredType);
}
// 下面的这几个后面再说 悄咪咪的告诉你 可以动态传值
public Object getBean(String name, Object... args) throws BeansException {
    assertBeanFactoryActive();
    return getBeanFactory().getBean(name, args);
}

public <T> T getBean(Class<T> requiredType, Object... args) throws BeansException {
    assertBeanFactoryActive();
    return getBeanFactory().getBean(requiredType, args);
}
```
