---
title: 06-JdbcTemplate
date: 2021-12-13 00:03:05
category: Spring-FrameWork
tag:
- Java
- Spring
- SpringMvc
- JavaWeb
---

## 概述

​  它是Spring框架中提供的一个对象，是对原始繁琐的JDBC APi对象进行简单封装，Spring为我们集成了多个消息模板类，例如：

- 操作关系型数据库的JdbcTemplate和HibernateTemplate
- 操作Nosql数据库的RedisTemplate
- 操作消息队列的JmsTemplate

等等诸多玩意

### JDBCtemplate就像是apache jdbc utils 跟那玩意差不多的作用

### JDBCTemplate开发步骤

1. 导入spring-jdbc和spring-tx依赖
2. 创建数据库表和实体
3. 创建JDBCTemplate对象
4. 执行数据库操作

我们先导包吧，它需要导两个包（前提是你的springcontext和mysql之类的包都得先导进来）

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.13</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.springframework/spring-tx -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.3.13</version>
</dependency>


```

如果你还没倒的话...

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.13</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.26</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.8</version>
</dependency>    
<!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.13</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-tx -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.3.13</version>
</dependency>
```

紧接着创建一些mysql数据：

```sql
create database spring_jdbc;
use spring_jdbc;
create table account(
 name varchar(32) primary key,
    money double not null default 0
);
desc account;
```

结果：

```sql
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| name  | varchar(32) | NO   | PRI | NULL    |       |
| money | double      | NO   |     | 0       |       |
+-------+-------------+------+-----+---------+-------+
```

接着创建一下相应的Bean类

![image-20211213003222939](/images/Java/SpringFrameWork/06-JdbcTemplate/image-20211213003222939.png)

自行准备好字段、getset 无参构造等

接着测试一下：

```java
@Test
public void test() throws SQLException {
    DruidDataSource dataSource = new DruidDataSource();
    dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
    dataSource.setUrl("jdbc:mysql://localhost:3306/spring_jdbc");
    dataSource.setUsername("root");
    dataSource.setPassword("123456");
    DruidPooledConnection connection = dataSource.getConnection();
    PreparedStatement statement = connection.prepareStatement("insert into spring_jdbc.account values(?,?) ");
    statement.setObject(1, "张三");
    statement.setObject(2, 2000.0003);
    int i = statement.executeUpdate();
    System.out.println(i > 0 ? "插入成功" : "插入失败");
    //        close
    statement.close();
    connection.close();
    dataSource.close();
}
```

然后使用jdbcTemplate来完成操作：

```java
@Test
public void test() throws SQLException {
    //创建JDBCTemplate
    JdbcTemplate template = new JdbcTemplate();
    //        设置数据源对象
    DruidDataSource dataSource = new DruidDataSource();
    dataSource.setUrl("jdbc:mysql://localhost:3306/spring_jdbc");
    dataSource.setUsername("root");
    dataSource.setPassword("123456");
    dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
    //        set 数据源对象
    template.setDataSource(dataSource);

    //        update
    int update = template.update("insert  into spring_jdbc.account values(?,?) ", "Tom", 5000);

    System.out.println(update > 0 ? "插入成功" : "插入失败");


}
```

### Spring产生JDBCTemplate对象（配置文件 、注解配置文件）

看到上面的最后一步，你的脑袋里应该就想起了应该怎么操作：

我这里多看了一嘴源码，看到可以找构造函数中加入对象：

```java
public JdbcTemplate(DataSource dataSource) {
    this.setDataSource(dataSource);
    this.afterPropertiesSet();
}
```

1. 创建db.properties配置文件：

   ```properties
   db.username=root
   db.password=12456
   db.driver=com.mysql.cj.jdbc.Driver
   db.url=jdbc:mysql://localhost:3306/spring_jdbc
   ```

2. 在spring的配置文件.xml中配置对象：

   ```xml
   <!--倒入变量-->
   <mvc:property-placeholder location="classpath:db.properties"/>
   
   <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
       <property name="url" value="${db.url}"/>
       <property name="driverClassName" value="${db.driver}"/>
       <property name="username" value="${db.username}"/>
       <property name="password" value="${db.password}"/>
   </bean>
   
   <bean class="org.springframework.jdbc.core.JdbcTemplate" id="template">
       <constructor-arg ref="dataSource"/>
   </bean>
   ```

上面的步骤转换成注解的话就是：

```java
@Configuration
@PropertySource("classpath:db.properties")
public class SpringConfiguration {

    //这里通过el表达式来使用我们加载的db.properties中获取到的资源
    @Value("${db.driver}")
    private String dirver;

    @Value("${db.url}")
    private String url;

    @Value("${db.username}")
    private String username;

    @Value("${db.password}")
    private String password;
    private DataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(dirver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
    @Bean("jdbcTemplate")
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }

}
```

接下来简单测试一下

### 使用JDBCTemplate进行增删改

jdbcTemplate.`update(String sql, Object ...params)` 返回一个int

```java
@Test
public void test2() {
    ApplicationContext context;
    context = new AnnotationConfigApplicationContext(SpringConfiguration.class);
    JdbcTemplate template = context.getBean(JdbcTemplate.class);
    int jack = template.update("insert  into spring_jdbc.account values(?,?) ", "Jack", 5000);
    System.out.println(jack > 0 ? "插入成功" : "插入失败");
}
```

使用带有注解的junit来测试：

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringTest {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void test5() {
        String sql = "insert into account values(?,?)";
        int update = jdbcTemplate.update(sql, "666", 2333.23);

        System.out.println(update > 0 ? "插入成功" : "插入失败");
    }

}
```

## 使用jdbcTemplate进行查询的操作

我们可以看到，jdbctemplate中有一大堆参数类型，接下来说说都是干嘛用的

![image-20211213134155029](/images/Java/SpringFrameWork/06-JdbcTemplate/image-20211213134155029.png)

### RowMapper接口

这玩意是一个接口，我们首先看看它之中定义了哪些方法：

所属包：`org.springframework.jdbc.core;`

```java
@FunctionalInterface
public interface RowMapper<T> {
    @Nullable
    T mapRow(ResultSet rs, int rowNum) throws SQLException;
}
```

可以看到一个属性的resultSet 和一个int 行数

但是我们应该不是直接用这玩意，看看它有哪些实现

右键类名-转到实现

![image-20211213134524960](/images/Java/SpringFrameWork/06-JdbcTemplate/image-20211213134524960.png)

见名知意，看着第一个就是把结果分装成Bean对象

### ✨BeanPropertyRowMapper的使用

这个类实现了RowMapper接口，使用起来是非常简单的

比如我们这里使用的是account接口，那么先建一个Account的Domain

```java
public class Account {
    private String name;
    private Double money;

    //相关 get set 和to string 之类的 以及无常有参构造都写上
}
```

然后按照这个方式来进行使用即可： 返回结果是一个ArrayList（可以自己通过.getClass()了解到）

```java
@Test
public void testQuery() {
    String sql = "select * from account";
    //BeanPropertyRowMapper接收一个class参数对象，返回一个List集合
    List<Account> query = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Account.class));
    Iterator<Account> iterator = query.iterator();
    while (iterator.hasNext()) {
        Account next = iterator.next();
        System.out.println(next);
    }
}
```

执行结果：

```md
Account{name='1', money=1.0}
Account{name='666', money=2333.23}
Account{name='Jack', money=5000.0}
Account{name='Tom', money=5000.0}
Account{name='张三', money=2000.0003}
```

### ✨queryForObject查询单个对象

`jdbcTemplate.queryForObject`可以只查询单个对象，可以接收`RowMapper`接口参数进行使用

这里就用`RowMapper`接口的子实现类`BeanPropertyRowMapper`来尝试操作一下：

```java
@Test
public void testQueryOne() {
    String sql = "select * from account limit 0,1";
    Account account = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Account.class));
    System.out.println(account);
}
```

```md
Account{name='1', money=1.0}
```

### JDBCtemplate使用了RowMapper接口后接收参数

这个其实非常简单，我们可以在方法接收的参数中发现，无论是query还是queryForObject

都存在一个重载的方法：

![image-20211213140054463](/images/Java/SpringFrameWork/06-JdbcTemplate/image-20211213140054463.png)

这个方法可以接收：`String sql,RowMapper rowparre,Object... obj`

所以直接使用即可，接下来有一个需求：查询account中工资大于两千的，并对结果按照生序排序

```java
@Test
public void testQueryAndParams() {
    String sql = "select * from spring_jdbc.account where money>=? order by money";
    
    List<Account> accountList = 
        jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Account.class), 2000);
    
    for (Account account : accountList) {
        System.out.println(account);
    }
}
```

运行结果：

```md
Account{name='张三', money=2000.0003}
Account{name='666', money=2333.23}
Account{name='Tom', money=5000.0}
Account{name='Jack', money=6663.0}
```

### ✨查询单个字段-queryForObject传入class

​ 如果我们只需要查询一个字段，那么只需要：

`jdbcTemplate.queryForObject(sql, 包装类.class);`

```java
@Test
public void testQueryAndCount() {
    String sql= "select count(*) from spring_jdbc.account";
    Long aLong = jdbcTemplate.queryForObject(sql, Long.class);
    System.out.println("account的总数据数量为："+aLong);
}
```

结果：

```md
account的总数据数量为：5
```

## ✨✨  JdbcTemplate总结

### 引入依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.13</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.26</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.8</version>
</dependency> 

<!--主要是下面那两个-->

<!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.13</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-tx -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.3.13</version>
</dependency>
```

### 配置文件

#### applicationContext.xml

```xml
<!--引入properties-->
<mvc:property-placeholder location="classpath:db.properties"/>

<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="url" value="${db.url}"/>
    <property name="driverClassName" value="${db.driver}"/>
    <property name="username" value="${db.username}"/>
    <property name="password" value="${db.password}"/>
</bean>

<bean class="org.springframework.jdbc.core.JdbcTemplate" id="template">
    <constructor-arg ref="dataSource"/>
</bean>
```

#### 使用Class

```java
@Configuration
@PropertySource("classpath:db.properties")
public class SpringConfiguration {

    //这里通过el表达式来使用我们加载的db.properties中获取到的资源
    @Value("${db.driver}")
    private String dirver;

    @Value("${db.url}")
    private String url;

    @Value("${db.username}")
    private String username;

    @Value("${db.password}")
    private String password;
    private DataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(dirver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
    @Bean("jdbcTemplate")
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }

}
```

### 增删改查

#### 增删改

统一用update

例如：

```java
int jack = Jdbctemplate.update("insert  into spring_jdbc.account values(?,?) ", "Jack", 5000);
```

第一个值接收sql  之后全都是参数 返回一个int

### 查询

- 查询单个

  ```java
  @Test
  public void testQueryOne() {
      String sql = "select * from spring_jdbc.account limit 0,1";
      Account account = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Account.class));
      System.out.println(account);
  }
  ```

- 查询多个

  ```java
  @Test
  public void testQueryAndParams() {
      String sql = "select * from spring_jdbc.account where money>=? order by money";
      //BeanPropertyRowMapper接收返回值值类型 自动封装
      List<Account> accountList = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Account.class), 2000);
      for (Account account : accountList) {
          System.out.println(account);
      }
      System.out.println(accountList.getClass());
  }
  ```

- 查询单个字段 这样用即可

  ```java
  @Test
  public void testQueryAndCount() {
      String sql = "select count(*) from spring_jdbc.account";
      Long aLong = jdbcTemplate.queryForObject(sql, Long.class);
      System.out.println("account的总数据数量为：" + aLong);
  
  }
  ```

## 其他操作

比如要创建表之类的，一律用:

```java
jdbcTemplate.execute("create table if not exists spring_jdbc.account2(id int primary key auto_increment,money double)");
```

无返回值，失败则抛出`DataAccessException`异常
