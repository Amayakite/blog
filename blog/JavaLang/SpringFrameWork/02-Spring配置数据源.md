---
title: 02-Spring配置JDBC数据源
date: 2021-12-10 0:12:30
category: Spring-FrameWork
tag:
- Java
- Spring
- Jdbc
---

## 回顾数据源(连接池)的作用

​  还记得Druid吗，我是印象深刻（老韩讲的太好了）

​  数据源就是为了提高程序性能而出现的

​  使用数据源的话，我们要先实例化数据源，初始化部分链接资源

​  使用连接资源的时候从数据源中读取

​  使用完毕后将资源归还给数据源

### 数据源的开发步骤

1. 导包
2. 创建数据源的对象
3. 设置数据源的基本连接数据
   1. Driver
   2. url
   3. username
   4. password
4. 使用数据源获取链接资源和归还连接资源

### 导包、配置

我们这里把C3P0也跟进来用下，Mysql8+的话用自己对应的版本即可，8-的话自行百度

```xml
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
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
<!-- https://mvnrepository.com/artifact/com.mchange/c3p0 -->
<dependency>
    <groupId>com.mchange</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.5.5</version>
</dependency>
```

让我们先来测试下C3P0 下面的相关信息换成你自己的（Mysql8以下的没有cj，是直接mysql.jdbc ）

```java
@Test
public void test() throws ClassNotFoundException, SQLException, PropertyVetoException {
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    //        反射加载
    //        Class.forName("com.mysql.cj.jdbc.Driver");
    dataSource.setDriverClass("com.mysql.cj.jdbc.Driver");
    dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/db1");
    dataSource.setUser("root");
    dataSource.setPassword("123456");
    Connection connection = dataSource.getConnection();
    String sql = "select * from db1.admin";
    PreparedStatement statement = connection.prepareStatement(sql);
    ResultSet resultSet = statement.executeQuery();
    while (resultSet.next()) {
        String name = resultSet.getString("name");
        String pwd = resultSet.getString("pwd");
        System.out.println(name + " " + pwd);

    }
    resultSet.close();
    statement.close();
    connection.close();
    dataSource.close();
}
```

然后再对Druid进行下测试

```java
@Test
public void testDruid() throws ClassNotFoundException, SQLException {
    DruidDataSource dataSource = new DruidDataSource();
    //        反射加载
    //Class.forName("com.mysql.cj.jdbc.Driver");
    dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
    dataSource.setUrl("jdbc:mysql://localhost:3306/db1");
    dataSource.setUsername("root");
    dataSource.setPassword("123456");
    Connection connection = dataSource.getConnection();
    String sql = "select * from db1.admin";
    PreparedStatement statement = connection.prepareStatement(sql);
    ResultSet resultSet = statement.executeQuery();
    while (resultSet.next()) {
        String name = resultSet.getString("name");
        String pwd = resultSet.getString("pwd");
        System.out.println(name + " " + pwd);
    }
    resultSet.close();
    statement.close();
    connection.close();
    dataSource.close();
}
```

然后接着创建下相应的配置文件进行配置

配置文件放在resources内即可

[C3P0配置教程](https://blog.csdn.net/caychen/article/details/79625411)

Druid配置有点特殊，这里单独说明下

### 补充-Maven项目中配置Druid

我们依旧是在res文件夹下创建对应的文件-这里取名为`druid.properties`

然后写入如下内容：

```properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/db1?rewriteBatchedStatements=true
username=root
password=123456
initialSize=10
minIdle=5
maxActive=50
maxWait=5000
```

还有其他它的配置信息自己看着来写

然后读取的话，我们在测试单元创建一个测试文件，类名随便，我这里就叫DataSource

然后写一个测试

```java
@Test
public void testDruid() throws Exception {
    Properties properties = new Properties();
    //这里根据类名获取根目录下的文件 classpath默认会将res目录中的资源放到根目录下 切记一定要加斜杠不然读取的就是这个类的同级文件了
    InputStream resourceAsStream = DataSource.class.getResourceAsStream("/druid.properties");
    properties.load(resourceAsStream);
    
    //通过Druid的工厂模式来读取配置文件，生成连接池
    javax.sql.DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);

    Connection connection = dataSource.getConnection();
    String sql = "select * from db1.admin";
    PreparedStatement statement = connection.prepareStatement(sql);
    ResultSet resultSet = statement.executeQuery();
    while (resultSet.next()) {
        String name = resultSet.getString("name");
        String pwd = resultSet.getString("pwd");
        System.out.println(name + " " + pwd);
    }
    resultSet.close();
    statement.close();
    connection.close();
}
```

运行结果：

```md
十二月 10, 2021 1:03:59 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} inited
10 56456
111 222
15 231
5456 2312
65165 561651
Jumping 156465
tom 123

进程已结束,退出代码0
```

### 在Spring中配置线程池-普通注入

这里就按照之前学习的，照葫芦画瓢即可

在applicationContext.xml中添加如下内容，property来set相对应的值

```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="username" value="root"/>
    <property name="password" value="123456"/>
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
    <property name="url"
              value="jdbc:mysql://localhost:3306/db1?useUnicode=true&amp;characterEncoding=utf-8&amp;useSSL=false&amp;rewriteBatchedStatements=true"/>
</bean>
```

测试：

```java
@Test
public void test3() throws SQLException {
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    //这里通过传入class来省去我们手动向下转型
    DruidDataSource dataSource = app.getBean("dataSource", DruidDataSource.class);
    Connection connection = dataSource.getConnection();
    String sql = "select * from db1.admin";
    PreparedStatement statement = connection.prepareStatement(sql);
    ResultSet resultSet = statement.executeQuery();
    while (resultSet.next()) {
        String name = resultSet.getString("name");
        String pwd = resultSet.getString("pwd");
        System.out.println(name + " " + pwd);
    }
    resultSet.close();
    statement.close();
    connection.close();
}
```

运行结果：

```md
10 56456
111 222
15 231
5456 2312
65165 561651
Jumping 156465
tom 123
```

### 在Spring中配置数据源-通过Properties配置文件

​  上面的注入配置可以正常跑起来，但是总感觉这样并不完美，我们的理想状态是通过Druid的工厂类中的方法去读取一个properties文件来进行创建，再度降低耦合性

我们首先要在applicationContext-db.xml中在头部beans中加入如下内容：

```xml
xmlns:context="http://www.springframework.org/schema/context"
```

然后在头部`xsi:schemaLocation`字段末尾追加

```md
http://www.springframework.org/schema/context
https://www.springframework.org/schema/context/spring-context.xsd
```

最终配置的结果大概是这样：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       这个context是我们加上的
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
                           下面这两个是我们加上的
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd"
       >

</beans>
```

当然上面这些步骤我们可以用过智能的IEDA帮助我们自动添加

我们在beans标签内部，添加一个子标签，你输入`<context:property-placeholder` 然后ieda会自动提示并帮你引入上面的那几个玩意

好了，然后我们把这个标签完善下：

```xml
<context:property-placeholder location="classpath:druid.properties"/>
```

property-placeholder：表示倒入一个properties配置项

location：指定路径

classpath：classes目录（打包后的目录）下的druid.properties

这里的意思就是：把一个配置文件中的所有字段信息，都导入到这个applicationContext文件中，并为没一个字段创建一个Bean

那么紧接着我们该怎么写呢？

还记得JSP中的EL表达式吗：`${获取的属性}`，没错，Spring中内置了EL表达式，没想到吧？我也没想到

md 绝了！

总所周知，JSP中的EL表达式可以使用的内容都是这个方法内已经定义了的，所以说我们只要尝试着输入一下看看IEDA有没有智能提示就可以了：

我们就直接按照properties文件中的我们定义的字段名来输入

注意，这里有一个天坑：我们导入Spring容器中的数据时，如果有多个名称相同的数据

比如，Spring自带一个username，值为当前操作系统的用户名

然后我们导入了properties，里面也有一个username，是连接数据库的用户名

那么Spring会遵循先来后到原则----多个重名的，只获取第一个

所以我们要在properties配置中，给我们的配置添加一些前缀，并且在使用时，也用上前缀，预防重名

一般前缀是用`xxx.`，也可以`xxx-`，这要看项目整体的需求，建议使用`xxx.`

```properties
jdbc.driverClassName=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/db1?useUnicode=true&characterEncoding=utf-8&useSSL=false&rewriteBatchedStatements=true
jdbc.username=root
jdbc.password=123456
jdbc.initialSize=10
jdbc.minIdle=5
jdbc.maxActive=50
jdbc.maxWait=5000
```

然后在里面输入jdbc.username发现有提示，于是乎就全部输入一遍

```xml
<context:property-placeholder location="classpath:druid.properties"/>
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">

    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="initialSize" value="${jdbc.initialSize}"/>
    <property name="minIdle" value="${jdbc.minIdle}"/>
    <property name="maxActive" value="${jdbc.maxActive}"/>
    <property name="maxWait" value="${jdbc.maxWait}"/>
</bean>
```

好了，接下来测试下能否正常使用

```java
@Test
public void test3() throws SQLException {
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext-db.xml");
    DruidDataSource dataSource = app.getBean("dataSource", DruidDataSource.class);
    Connection connection = dataSource.getConnection();
    String sql = "select * from db1.admin";
    PreparedStatement statement = connection.prepareStatement(sql);
    ResultSet resultSet = statement.executeQuery();
    while (resultSet.next()) {
        String name = resultSet.getString("name");
        String pwd = resultSet.getString("pwd");
        System.out.println(name + " " + pwd);
    }
    resultSet.close();
    statement.close();
    connection.close();
}
```

结果：

```md
十二月 10, 2021 2:51:40 下午 com.alibaba.druid.support.logging.JakartaCommonsLoggingImpl info
信息: {dataSource-1} inited
10 56456
111 222
15 231
5456 2312
65165 561651
Jumping 156465
tom 123

进程已结束,退出代码0

```

### 通过Properties配置文件在Spring中配置JDBC总结

语法：`<context:property-placeholder location="classpath:要引入的配置文件，需要带上后缀"/>`

使用：`<property name="username" value="${配置文件中定义的字段名}"/>`

完整JDBC配置模板（以后应该也会回来直接Copy）

Properties部分，文件名为：druid.properties

```properties
jdbc.driverClassName=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/db1?useUnicode=true&characterEncoding=utf-8&useSSL=false&rewriteBatchedStatements=true
jdbc.username=你的sql数据库用户名
jdbc.password=你的sql数据库密码
jdbc.initialSize=10
jdbc.minIdle=5
jdbc.maxActive=50
jdbc.maxWait=5000
```

ApplicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd"

>
<!--    注入文件-->
    <context:property-placeholder location="classpath:druid.properties"/>
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
<!--        通过EL表达式：${}来使用注入的数据-->
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="driverClassName" value="${jdbc.driverClassName}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="initialSize" value="${jdbc.initialSize}"/>
        <property name="minIdle" value="${jdbc.minIdle}"/>
        <property name="maxActive" value="${jdbc.maxActive}"/>
        <property name="maxWait" value="${jdbc.maxWait}"/>
    </bean>

</beans>
```
