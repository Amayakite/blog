---
title: 10-MyBatis
date: 2021-12-15 0:32:37
category: Spring-FrameWork
tag:
- Java
- Spring
- Mysql
- Jdbc
- Mybatis
---

## 基本介绍

回想下我们之前是怎么进行JDBC操作的

![image-20211215003424068](/images/Java/SpringFrameWork/10-Mybatis/image-20211215003424068.png)

![image-20211215003504392](/images/Java/SpringFrameWork/10-Mybatis/image-20211215003504392.png)

原始的JDBC开发存在的问题如下：

1. 数据库链接创建。释放频繁造成系统资源浪费从而影响系统性能
2. sql语句在代码中硬编码，造成代码不易维护，实际应用sql变化的可能较大， sql变动需要更改java代码
3. 查询操作时，需要手冻僵结果集中的数据手动封装到实体中，插入操作时，需要手动将实体的数据设置到sql的占位符位置

对应上述问题给出的解决方案

1. 使用数据库连接池初始化链接资源
2. 将sql语句抽取到xml配置文件中
3. 使用反射、内省等底层技术，自动将实体与表进行属性与字段的自动映射

看起来都可以实现 第一个是通过连接池 第二个是通过spring 配置 第三个使用spring的aop

但实际上我们要学习的MyBatis已经帮我们做好了这些事情了

> ​  MyBatis是一个优秀的基于Java的持久层框架，它内部封装了JDBC，使开发者只需要关注sql语句本身，而不需要花费精力去处理加载驱动，创建连接，创建statement等繁杂的过程
>
> ​  Mybatis通过xml或者注解的方式将要执行的各种statement配置起来，并通过Java对象和statement中的sql的动态参数进行映射生成最终执行的sql语句
>
> ​  最后mybatis框架执行sql语句并将结果映射为java对象返回，才用ORM（Object Relational Mapping 对象关系映射）思想解决了实体和数据库映射的问题，对JDBC进行了封装，屏蔽了JDBC api底层访问细节，使我们不用与jdbc api 打交道 就可以完成对数据库持久化的操作

当然 持久层框架不止有mybatis一个，还有hribernate、JOOQ/ebean等

Mybatis虽然不是最好的一个 但是作为初学者的话使用还是通过它比较好

## Mybatis的快速入门

1. 添加Mybatis的依赖
2. 编写User的数据表
3. 编写User实体类
4. 编写映射文件UserMapper.xml
5. 编写核心文件SqlMapConfig.xml
6. 测试

### 添加Mybatis的依赖

最开始是需要几个简单的库即可 sql druid和mybatis mybatis版本没有硬性要求

当然还有一个log4j 用来打印下log

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
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.8</version>
</dependency>
<!-- https://mvnrepository.com/artifact/log4j/log4j -->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>


```

### 编写User的数据表和实体User类

```sql
drop table if exists user;
create table user(
 id int primary key AUTO_INCREMENT,
    username varchar(32) not null unique,
    password char(40) not null default ""
);
insert into user(username,password) values("jock","12345"),("luck","789");
```

```java
package com.mybatis.domain;


public class User {
    private Integer id;
    private String username;
    private String password;
 // get set toString
}

```

### 编写映射文件UserMapper.xml

一般创建这类文件都是要和实体的包呈映射关系

比如说我现在是com.mybatis.xxxxx 那么mybatis的目录应该也是在res下的com.mybatis.mapper目录下

![image-20211215121324795](/images/Java/SpringFrameWork/10-Mybatis/image-20211215121324795.png)

然后我们在该目录下创建mybatis的配置文件userMapper.xml

接着在文件中进行一个文件头约束

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
```

写法是固定死了的

接着我们添加如下配置：

namespace是命名空间 如果你学过C# 对这玩意应该不陌生 调用它之中的findAll的时候 需要使用userMapper.findAll来进行调用

select 指的是创建一个查询的句柄 id是它的名称 resuleType是它的返回值转换成哪个对象

它的标签体内可以写sql语句 同理 我们还可以创建和select同级的

![image-20211215122503566](/images/Java/SpringFrameWork/10-Mybatis/image-20211215122503566.png)

这些东西

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="userMapper">
    <select id="findAll" resultType="com.mybatis.domain.User">
        select *
        from user
    </select>
</mapper>
```

### 编写核心文件SqlMapConfig.xml

紧接着我们在res根目录下新建sqlMapConfig.xml

它需要这样的头约束（固定死了的）

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
```

然后填写具体内容

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!--数据源的环境-->
    <environments default="dev">
        <!--        这里可以配置多个环境，然后在上面的default内填上 一般是用来区分开发环境和生产环境用的-->
        <environment id="dev">
            <!--            这里指的是要用哪个事务管理器 我们直接填JDBC 原理后面说-->
            <transactionManager type="JDBC"></transactionManager>
            <!--            这里是配置数据源 这个type先不管-->
            <dataSource type="POOLED">
                <!--                下面这里按照正常配置sql数据库来配置-->
                <property name="driver" value="com.mysql.jdbc.Driver"></property>
                <property name="url" value="jdbc:mysql://localhost:3306/db1"></property>
                <property name="username" value="root"></property>
                <property name="password" value="123456"></property>
            </dataSource>
        </environment>
    </environments>

    <!--    加载映射文件-->
    <mappers>
        <mapper resource="com/mybatis/mapper/userMapper.xml"></mapper>
    </mappers>

</configuration>
```

### 测试

这里有五步

1. 加载核心配置文件
2. 获取sqlSession工厂对象
3. 获得sqlSession对象
4. 执行sql语句
5. 执行结果
6. 释放资源

```java
package com.mybatis.test;

import com.mybatis.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MyBatisTest {

    @Test
    public void test1() throws IOException {
//        获得核心配置文件 注意 这里用的Resources是org.apache.ibatis.io.Resources 不是java.io.Resources
        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
//        得到Session工厂对象 传入我们刚刚获取到的文件的输入流
        SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
//        通过session工厂对象获取session会话对象
        SqlSession sqlSession = sessionFactory.openSession();
//        执行操作 参数就是我们的 namespace+id
        List<User> userList = sqlSession.selectList("userMapper.findAll");
//        打印结果
        System.out.println(userList);
//        释放资源
        sqlSession.close();
    }
}

```

运行结果：

```md
[User{id=1, username='jock', password='12345'}, User{id=2, username='luck', password='789'}]
```

我曹 牛逼

## ✨Mybatis的映射文件概述

一张图概括

![image-20211215134202667](/images/Java/SpringFrameWork/10-Mybatis/image-20211215134202667.png)

### ✨增删改查

查询我们都知道了，增加有点特殊，userMapper文件需要这样配置：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="userMapper">
    <!--    查询操作-->
    <select id="findAll" resultType="com.mybatis.domain.User">
        select *
        from user
    </select>
    <!--    插入操作 parameterType表示要接收的参数类型-->
    <!--    下面的values(#{username},#{password})表示使用这个user对象内部的username和password属性-->
    <insert id="save" parameterType="com.mybatis.domain.User">
        insert into db1.user(username,password) values(#{username},#{password})
    </insert>

</mapper>
```

注意：**Mybatis如果要执行增删改操作，都需要进行提交事务来完成！！！**

```java
@Test
public void test2() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sessionFactory.openSession();
    int i = sqlSession.insert("userMapper.save", new User("tom", "123456"));
    System.out.println(i > 0 ? "插入成功" : "插入失败");
    //        提交事务，一定不能忘了这玩意，否则插入不了
    sqlSession.commit();
    sqlSession.close();
}
```

### Mybatis插入操作时的注意事项

1. 插入语句使用insert标签
2. 在映射文件中使用parameterType属性指定要插入的数据类型
3. SQL语句中使用`#{实体属性名}`方式引用实体中的属性值
4. 插入操作使用的API是`sqlSession.insert("命名空间.id",实体对象)`
5. 插入操作设计数据库数据变化，所以要是用sqlSession对象显示提交事务，即：`sqlSession.commit()`

### Mybatis修改操作

在userMapper中这样既可 然后调用的时候记得一定要用commit

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="userMapper">


    <!--    更新操作-->
    <update id="update" parameterType="com.mybatis.domain.User">
        update user
        set username=#{username},
            password=#{password}
        where id = #{id}
    </update>

</mapper>
```

使用

```java
@Test
public void test3() throws IOException {
    //        获得核心配置文件 注意 这里用的Resources是org.apache.ibatis.io.Resources 不是java.io.Resources
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    //        得到Session工厂对象 传入我们刚刚获取到的文件的输入流
    SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    //        通过session工厂对象获取session会话对象
    SqlSession sqlSession = sessionFactory.openSession();
    //        执行操作 参数就是我们的 namespace+id
    int i = sqlSession.insert("userMapper.update", new User(1,"JackVersion", "123456"));
    //        打印结果
    System.out.println(i > 0 ? "更新成功" : "更新成功");
    //        提交事务，一定不能忘了这玩意，否则更新不了
    sqlSession.commit();
    //        释放资源
    sqlSession.close();
}
```

### ✨增删改查映射配置与API

![image-20211215153513639](/images/Java/SpringFrameWork/10-Mybatis/image-20211215153513639.png)

## ✨Mybatis核心配置文件概述

这里主要说下configuration标签的配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!--数据源的环境-->
    <environments default="dev">
        <!--        这里可以配置多个环境，然后在上面的default内填上 一般是用来区分开发环境和生产环境用的-->
        <environment id="dev">
            <!--            这里指的是要用哪个事务管理器 我们直接填JDBC 原理后面说-->
            <transactionManager type="JDBC"></transactionManager>
            <!--            这里是配置数据源 这个type先不管-->
            <dataSource type="POOLED">
                <!--                下面这里按照正常配置sql数据库来配置-->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"></property>
                <property name="url" value="jdbc:mysql://localhost:3306/db1"></property>
                <property name="username" value="root"></property>
                <property name="password" value="123456"></property>
            </dataSource>
        </environment>
    </environments>

    <!--    加载映射文件-->
    <mappers>
        <mapper resource="com/mybatis/mapper/userMapper.xml"></mapper>
    </mappers>

</configuration>
```

它支持如下的标签

![image-20211215153739412](/images/Java/SpringFrameWork/10-Mybatis/image-20211215153739412.png)

### environment 配置数据源环境

可以支持配置多个

![image-20211215153908922](/images/Java/SpringFrameWork/10-Mybatis/image-20211215153908922.png)

额外说明的点：

- `transationManager`的Type标签类型支持两种：

  - JDBC 这个配置就是直接使用了JDBC的提交和回滚设置，它依赖于从数据源得到的连接来管理事务的作用域，一般都是使用这种

  - MANAGED：这个配置几乎没做什么，它从来不回提交或者回滚一个连接，而是让容器来管理事务的整个生命周期（比如JEE应用服务器的上下文）。默认情况下它会关闭连接，但是有一些容器并不希望这样，因此要额外设置closeConnection属性为false来组织它默认的关闭行为

    ```xml
    <transactionManager type="MANAGED" >
        <property name="connection" value="false"/>
    </transactionManager>
    应该是这样，反正这个玩意不常用 用到了再百度
    ```

- `dataSource`的type类型支持如下三种(设置数据源类型)

  - UNPOOLED：这个数据源的实现只是每次连接请求时打开和关闭连接
  - POOLED：这个数据源实的实现用‘池’概念将JDBC创建的对象组织起来
  - JNDI：这个数据源的实现是为了能在如EJB或应用服务器这类容器中使用，容器可以集中在外部配置数据源，然后放置一个JNDI上下文的引用

### mappers 配置映射器

```xml
<mappers>
    <mapper resource="com/mybatis/mapper/userMapper.xml">
    </mapper>
</mappers>
```

该标签的作用是加载映射，加载的方式有如下几种，可以支持多个标签一一齐丢到mappers内

- 使用相对于类路径的资源引用，例如：

  ```xml
  <mapper resource="com/mybatis/mapper/userMapper.xml"/>
  ```

- 使用完全限定资源定位符（URL），例如：

  ```xml
  <mapper url="file:///var/mapper/xxx/xxxAutoMapper.xml"/>
  ```

- 使用映射器接口实现类的完全限定类名，例如：

  ```xml
  <mapper class="com.xxx.xxx.Mymaper"/>
  ```

- 将包内的映射器接口实现全部注册为映射器，例如：

  ```xml
  <package name="com.xxx.builder"/>
  ```

### 通过Properties动态加载jdbc配置文件

实际上非常简单，我们先抽取出来一个jdbc.properties

```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/db1
jdbc.username=root
jdbc.password=123456
```

它和我们的mybatis核心配置文件呈现如下对应关系

![image-20211215160743492](/images/Java/SpringFrameWork/10-Mybatis/image-20211215160743492.png)

接着加载配置文件即可， 注意 resource标签内**没有classpath:**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">


<configuration>

    <!--    加载配置文件-->
    <properties resource="jdbc.properties"/>
    <!--数据源的环境-->
    <environments default="dev">
        <environment id="dev">
            <transactionManager type="JDBC"/>

            <dataSource type="POOLED">
                <!--使用配置信息中的相关配置，这里${}内要写配置文件内的全名称-->
                <property name="driver" value="${jdbc.driver}"></property>
                <property name="url" value="${jdbc.url}"></property>
                <property name="username" value="${jdbc.username}"></property>
                <property name="password" value="${jdbc.password}"></property>
            </dataSource>
        </environment>


    </environments>

    <!--    加载映射文件-->
    <mappers>
        <mapper resource="com/mybatis/mapper/userMapper.xml"></mapper>
    </mappers>

</configuration>
```

测试：

```java
@Test
public void test1() throws IOException {
    //        获得核心配置文件 注意 这里用的Resources是org.apache.ibatis.io.Resources 不是java.io.Resources
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    //        得到Session工厂对象 传入我们刚刚获取到的文件的输入流
    SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    //        通过session工厂对象获取session会话对象
    SqlSession sqlSession = sessionFactory.openSession();
    //        执行操作 参数就是我们的 namespace+id
    List<User> userList = sqlSession.selectList("userMapper.findAll");
    //        打印结果
    System.out.println(userList);
    //        释放资源
    sqlSession.close();
}
```

### typeAliases标签-设定别名-自定义别名

我们刚刚使用的是

```xml
<mapper namespace="userMapper">
    <select id="findAll" resultType="com.mybatis.domain.User">
        select *
        from user
    </select>
    <insert id="save" parameterType="com.mybatis.domain.User">
        insert into db1.user(username, password)
        values (#{username}, #{password})
    </insert>
    <update id="update" parameterType="com.mybatis.domain.User">
        update user
        set username=#{username},
            password=#{password}
        where id = #{id}
    </update>

</mapper>
```

这种方式来操作，使用的parmeterType来给定别名，在Mybatis中，框架给我们将**包装类、集合类、基本属性**的别名都设置好了，例如删除一个ID为1的人

```xml
<update id="update" parameterType="Java.lang.Integet">
    delete from user where id = #{id}
</update>
```

然后再进行删除：`sqlSession.delete("xxx",1)`

但是实际上可以简化为这样： 效果是一样的

```xml
<update id="update" parameterType="int">
    delete from user where id = #{id}
</update>
```

我们可以通过在**核心配置文件**配置typeAliases，为com.mybatis.domain.User定义别名为user

注意  **typeAliases标签必须放在properties标签后面，其他标签前面 否则会报错！**

 ```xml
 <?xml version="1.0" encoding="UTF-8" ?>
 <!--mybatis-config约束-->
 <!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
 
 
 <configuration>
 
 
     <!--    加载配置文件-->
     <properties resource="jdbc.properties"/>
     <!--    设定别名-->
     <typeAliases>
         <typeAlias type="com.mybatis.domain.User" alias="User"></typeAlias>
     </typeAliases>
     <!--数据源的环境-->
     <environments default="dev">
         <!--        这里可以配置多个环境，然后在上面的default内填上 一般是用来区分开发环境和生产环境用的-->
         <environment id="dev">
             <transactionManager type="JDBC"/>
 
             <dataSource type="POOLED">
                 <property name="driver" value="${jdbc.driver}"></property>
                 <property name="url" value="${jdbc.url}"></property>
                 <property name="username" value="${jdbc.username}"></property>
                 <property name="password" value="${jdbc.password}"></property>
             </dataSource>
         </environment>
 
 
     </environments>
 
 
     <!--    加载映射文件-->
     <mappers>
         <mapper resource="com/mybatis/mapper/userMapper.xml"></mapper>
     </mappers>
 
 
 </configuration>
 ```

接着我们修改下UserMapper的配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="userMapper">
    <select id="findAll" resultType="User">
        select *
        from user
    </select>
    <insert id="save" parameterType="User">
        insert into db1.user(username, password)
        values (#{username}, #{password})
    </insert>
    <update id="update" parameterType="User">
        update user
        set username=#{username},
        password=#{password}
        where id = #{id}
    </update>

</mapper>
```

## Mybatis相应的API

虽然说以后整合的使用就不需要自己动手写这些代码了，但是目前来说，得先了解下都是怎么用的

### SqlSession工厂构建器SqlSessionFactoryBuilder

常用API：

- `SQLSessionFactory  build(InputStream inputStream)`

通过加载mybatis的核心配置文件的输入流形式构建一个SqlSessionFactory对象

```java
String resource = "sqlMapConfig.xml";
InputStream resourceAsStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
SqlSession sqlSession = sessionFactory.openSession();
```

其中，Resource工具类，这个类在org.apache.ibatis.io包中（ibatis是mybatis的前身）

Resources类可以帮助我们从类路径下、文件系统或一个web URL中加载资源文件

### ✨SqlSessionFactory类

`SqlSessionFactory`有多个方法创建SQL对象实例，常用的有如下两个：

| 方法                              | 解释                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `openSession()`                   | 会默认开启一个事务，但事务不会自动提交，也就意味着需要我们来手动提交该事物，更新操作数据才回持久化到数据库中 |
| `openSession(boolean autoCommit)` | 参数为是否自动提交，如果设置为true，那么不需要手动提交事务                                                   |

要注意的点：例如你的openSession创建的session加了true，自动提交事务的方式为：每次执行一条sql语句，都会提交一次事务

```java
    @Test
    public void test2() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        //开启自动提交
        SqlSession sqlSession = sessionFactory.openSession(true);
        int i = sqlSession.insert("userMapper.save", new User("1231231345325435", "123456"));
        //抛出错误
        i = 1 / 0;
        i = sqlSession.insert("userMapper.save", new User("dasdasddasd", "123456"));
        System.out.println(i > 0 ? "插入成功" : "插入失败");
        sqlSession.close();
    }
```

如果开启了自动提交，那么在中途中若出现错误，则这之前的操作依旧会被录入到持久层Mysql中

### ✨SqlSession会话对象类

SqlSession实例在Mybatis中是一个非常强大的类，在这里你会看到所有执行的语句、提交或者回滚事务和获取映射器实例的方法，执行语句的主方法主要有：

- `<T> T selectOne(String statemet,Object parameter)` 查询结果返回一个对象
- `<E> List<E> selectList(String statement,Object parameter)` 结果返回数组
- `int insert(String statement,Object parameter)`插入
- `int update(String statement,Object parameter)`修改
- `int delete(String statement,Object parameter)`删除

然后操作事务的方法有：

- `void commit()`提交事务
- `void rollback()`回滚事务

## MyBatis的Dao层实现

之前我们在使用Mybatis时都是通过单元测试文件来实现的，但是我们实际在项目中使用的时候，都是要把其内容写入到Dao层，所以我们现在来看看Mybatis的Dao层的实现方式

我们先统一下配置文件：

核心配置：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">


<configuration>


    <!--    加载配置文件-->
    <properties resource="jdbc.properties"/>
    <!--    设定别名-->
    <typeAliases>
        <typeAlias type="com.mybatis.domain.User" alias="User"></typeAlias>
    </typeAliases>
    <!--数据源的环境-->
    <environments default="dev">
        <!--        这里可以配置多个环境，然后在上面的default内填上 一般是用来区分开发环境和生产环境用的-->
        <environment id="dev">
            <transactionManager type="JDBC"/>

            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"></property>
                <property name="url" value="${jdbc.url}"></property>
                <property name="username" value="${jdbc.username}"></property>
                <property name="password" value="${jdbc.password}"></property>
            </dataSource>
        </environment>


    </environments>


    <!--    加载映射文件-->
    <mappers>
        <mapper resource="com/mybatis/mapper/userMapper.xml"></mapper>
    </mappers>


</configuration>
```

然后是userMapper-只保留findAll

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="userMapper">

    <!--    查询操作-->
    <select id="findAll" resultType="User">
        select *
        from user
    </select>

</mapper>
```

### 传统实现

我们先创建一个Dao

interface：UserMapper

```java
public interface UserMapper {

    List<User> findAll();
}
```

然后是它的Impl：

```java
public class UserMapperImpl implements UserMapper {
    @Override
    public List<User> findAll() {
        try {
            InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(resourceAsStream);
            SqlSession sqlSession = build.openSession();
            List<User> userMapper = sqlSession.selectList("UserMapper.findAll");
            return userMapper;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

接着我们在service中写一个类测试下：

```java
public class UserDemo {
    public static void main(String[] args) {
        UserMapperImpl userMapper = new UserMapperImpl();
        List<User> all = userMapper.findAll();
        for (User user : all) {
            System.out.println(user);
        }
    }
}
```

能够完美运行

### ✨代理开发方式-注意事项

使用MyBatis的代理开发方式需要Dao层的开发，这种方式是目前企业的主流

Mapper接口开发代理方法只需要我们编程实现Mapper接口（相当于Dao接口），由Mybatis框架根据接口定义创建接口的动态代理对象，代理对象的方法体同上边Dao接口实现类方法

Mapper接口开发需要遵循如下规范：

1. Mapper.xml文件(映射文件，就是我们写sql语句的文件)中的namespace和mapper接口的全限定类名相同
2. Mapper接口的方法名和Mapper.xml中定义的每个statement的id相同
3. Mapper接口方法是输入参数和Mapper.xml中定义的每个sql中的parameterType类型相同
4. Mapper接口方法的输出参数类型mapper.xml中定义的每个sql的resultType相同

![image-20211215174631064](/images/Java/SpringFrameWork/10-Mybatis/image-20211215174631064.png)

### ✨代理开发方式-简单实现

现在我们的dao层的接口是在这个位置：

![image-20211215174947589](/images/Java/SpringFrameWork/10-Mybatis/image-20211215174947589.png)

我们复制下它的全类名（左边的那个小红鸟先不管 是一个IEDA插件带来的 这个之后会说）

![image-20211215175009717](/images/Java/SpringFrameWork/10-Mybatis/image-20211215175009717.png)

接着我们在userMapper中作出如下的修改：

![image-20211215175056311](/images/Java/SpringFrameWork/10-Mybatis/image-20211215175056311.png)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

  <!--    这里填写我们的全类名-->
<mapper namespace="com.mybatis.dao.UserMapper">

  
    <select id="findAll" resultType="User">
        select *
        from user
    </select>

</mapper>
```

好了，截至目前已经配置完了

对，你没看错，配置完了，我们也无序写实现类..

接下来实际使用的方式会和之前有所不同：

```java
public class UserDemo {
    public static void main(String[] args) throws IOException {
        InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
        SqlSession sqlSession = build.openSession();

        //        通过传入class返回给定的映射器对象
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        //        调用方法
        for (User user : mapper.findAll()) {
            System.out.println(user);
        }

    }
}
```

测试通过，接下来试试增加数据

```xml
<!--    增加用户-->
<insert id="addUser" parameterType="User">
    insert into user(username, password)
    values (#{username}, #{password})
</insert>
```

然后在接口中添加：

```java
int addUser(User user);
```

接着测试：

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();

    //        通过传入class返回给定的映射器对象
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    //        调用方法
    int i = mapper.addUser(new User("老八", "123456"));
    //        注意 这里任然需要自己手动commit
    sqlSession.commit();
    System.out.println(i > 0 ? "添加成功" : "添加失败");

}
```

依旧正常运行

再来试试搜索用户

```xml
<!--    搜索用户-->
<select id="findUser" resultType="User" parameterType="int">
    select *
    from user
    where id = #{id}
</select>
```

在接口类中添加

```java
User findUser(int id);
```

接着测试一下：

```java
public class UserDemo {
    public static void main(String[] args) throws IOException {
        InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
        SqlSession sqlSession = build.openSession();

//        通过传入class返回给定的映射器对象
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
//        调用方法
        User user = mapper.findUser(1);
        System.out.println(user);

    }
}
```

我曹 太牛逼了吧..

也就是说，这玩意通过反射动态给我们生成了一个实现类...

## 动态Sql语句

Mybatis的映射技术中，前面我们的Sql都是比较简单的，有些时候业务逻辑复杂时，我们的Sql是动态变化的，此时之前的简单SQl就不能满足要求了

例如 我们有一个简简单单的sql语句

```xml
    <select id="findByCondition" parameterType="User" resultType="User">
        select *
        from user
        where id = #{id}
          and username = #{username}
          and password = #{password}
    </select>
```

看起来很正常对吧？

接下来测试一下：

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();

    //        通过传入class返回给定的映射器对象
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    //        调用方法
    User jackVersion = mapper.findByCondition(new User(1, "JackVersion", "123456"));
    System.out.println(jackVersion);


}
```

返回值也是很正常不过了，但是如果我们创建user对象的时候没有给定指定的值，就查询不到相应的结果了,.

![image-20211215193109709](/images/Java/SpringFrameWork/10-Mybatis/image-20211215193109709.png)

我们的理想状态是，在我们传入的对象中，例如User 三个参数都具备 就按照三个参数筛选，否则就按照已有的参数进行筛选

所以这个时候就需要动态sql语句来完成了

### ✨动态SQL语句-IF

> 我们根据实体类的不同取值，使用不同的SQl语句来进行查询，比如id如果不为空的时候可以进行ID查询，如果username不为空时，还要加入用户名作为调价，这种情况在我们的多条件组合查询中会经常用到

它的最基本的使用如下

```xml
<select id="findByCondition" parameterType="User" resultType="User">
    select *
    from user
    where 1=1
    <if test="id!=0">
        and id = #{id}
    </if>
    <if test="username!=null">
        and username = #{username}
    </if>
    <if test="password!=null">
        and password = #{password}
    </if>
</select>
```

精髓就在那个1=1，然后我们用if标签来判定值，如果是数值型就判断是否为默认值0，如果是字符串类型就判断是否为null即可，其他类型同理

当然，**因为一般情况下我们项目中使用的都是包装类**：

![image-20211215205450961](/images/Java/SpringFrameWork/10-Mybatis/image-20211215205450961.png)

所以说全部判断是否为null即可：

```xml
<select id="findByCondition" parameterType="User" resultType="User">
    select *
    from user
    where 1=1
    <if test="id!=null">
        and id = #{id}
    </if>
    <if test="username!=null">
        and username = #{username}
    </if>
    <if test="password!=null">
        and password = #{password}
    </if>
</select>
```

当然，老感觉那个1=1有点烦人，说一说Mybatis也提供了一个where标签，把if丢进去，它会自动给我们加上where标签

```xml
<select id="findByCondition" parameterType="User" resultType="User">
    select *
    from user
    <where>
        <if test="id!=null">
            and id = #{id}
        </if>
        <if test="username!=null">
            and username = #{username}
        </if>
        <if test="password!=null">
            and password = #{password}
        </if>
    </where>
</select>
```

但是这样也有一个缺点：如果说我们三个数据都没有的话 那上面这句话就等同于：

```sql
select * from user;
```

**这玩意在实际项目中出现那可是致命的，并且如果你是在返回一个对象的情况下触发了这种查询，程序会抛出异常**

**这个目前只能通过我们自己的代码进行相应的处理，例如在正式进行JDBC之前，对用户发送的所有数据进行强校验**

### ✨动态SQL语句-FOREACH

一般在如下情况下需要用到：

```sql
select * from user where id in(1,2,3....);
# 或者
inser into user(username,password) values(xxx,xxx),(xxx,xxx)...
```

我们这里就开门见山的说明这个foreach该怎么用吧

先来解决第一个问题：

```xml
<select id="findByIds" parameterType="list" resultType="User">
    select * from user
    <where>
        /*遍历list，每个元素都被赋值在item上面
        我们原本是要查询：select * from user where id in(1,2,3,4,5)
        open 表示整个话语的开头
        close 表示整个话语的结尾
        seprarator 表示每个item之间的分隔符
        我们只需要在foreach标签内部填写这个item的值：id，Mybatis将会自动帮我们进行拼接
        */
        <foreach collection="list" item="id" open="id in(" separator="," close=")">
            #{id}
        </foreach>
    </where>
</select>
```

注意 这个parameterType 中的list是MyBatis帮我们封装好了的 对应的就是java.util.List

接下来我们完善下UserService接口并测试：

```java
List<User> findByIds(List<Integer> ids);

```

测试：

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();

    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    ArrayList<Integer> integers = new ArrayList<>();
    integers.add(1);
    integers.add(2);
    integers.add(3);
    List<User> byIds = mapper.findByIds(integers);
    System.out.println(byIds);
}
```

运行结果：

![image-20211215212212357](/images/Java/SpringFrameWork/10-Mybatis/image-20211215212212357.png)

紧接着，就是我们的批量插入：

```xml
<insert id="saveUsers" parameterType="list">
    <foreach collection="list" item="user"
             open=" insert into user(username, password) values("
             separator="),("
             close=")">
        #{user.username}, #{user.password}
    </foreach>
</insert>
```

然后接口类配置：

```java
int saveUsers(List<User> users);
```

接着是代码：

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();

    //        通过传入class返回给定的映射器对象
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    //        调用方法
    ArrayList<User> integers = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
        integers.add(new User("test" + i, "password" + i));
    }
    int i = mapper.saveUsers(integers);
    //        要记得commit哦
    sqlSession.commit();
    System.out.println(i > 0 ? "插入成功" : "插入失败");
    System.out.println(i);

}
```

运行结果：

![image-20211215212954158](/images/Java/SpringFrameWork/10-Mybatis/image-20211215212954158.png)

### ✨SQL对象的抽取（SQL模板）

比方说我们现在有如下两个需求：

```sql
select * from user where  name=...and ....
select * from user where id in ....
```

那么按照以往的写法，这样整就会比较痛苦 我们要给一堆select标签设置同样的 select * from xxx

而且这样也会让代码变得不好维护

解决方法也很简单：

1. 在mapper标签中配置sql标签，id为标识符，标签体内填写sql语句
2. 在查询语句中使用`<include refid="sql标签ID"/>`获取相应的抽取到的模板语句

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.mybatis.dao.UserMapper">

    <!--    sql语句抽取-->
    <sql id="selectUser">select *
        from user</sql>

    <!--    获取所有用户-->
    <select id="findAll" resultType="User">
        <include refid="selectUser"/>
    </select>

    <!--    搜索用户-->
    <select id="findUser" resultType="User" parameterType="int">
        <include refid="selectUser"/>
        where id = #{id}

    </select>
 <!--搜索特定范围内的用户-->
    <select id="findByIds" parameterType="list" resultType="User">
        <include refid="selectUser"/>
        <where>
            <foreach collection="list" 
                     item="id" 
                     open="id in(" separator="," close=")">
                #{id}
            </foreach>
        </where>
    </select>
</mapper>
```

## TypeHandlers标签

​  无论是mybatis在预处理语句（PreparedStatement）中设置一个参数，还是从结果集中取出一个值时，都用类型处理器将获取的值以合适的方式转换为Java类型，我们可以通过如下方式查看，总计40个：

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();
    Configuration configuration = sqlSession.getConfiguration();
    TypeHandlerRegistry registry = configuration.getTypeHandlerRegistry();
    Collection<TypeHandler<?>> handlers = registry.getTypeHandlers();
    System.out.println("默认的TypeHandlers数量" + handlers.size());
    for (TypeHandler<?> handler : handlers) {
        System.out.println(handler.getClass().getName());
    }
    sqlSession.close();
}
```

![image-20211215220059676](/images/Java/SpringFrameWork/10-Mybatis/image-20211215220059676.png)

常用的有这些

![image-20211215220208445](/images/Java/SpringFrameWork/10-Mybatis/image-20211215220208445.png)

当让 如果这40个不够你用的话，可以考虑使用自定义的类转换器

### ✨重写/自定义类转换器

​  我们可以重写类处理器或创建我们自己的类型处理器来支持不支持或非标准类型

​  具体做法为：实现`org.apache.ibatis.type.TypeHandler`接口

​  或者继承一个很便利的类：`org.apache.ibatis.typeBase.BaseTypeHandler`

​  然后可以选择性的将她映射到一个JDBC类型

​  例如：**一个Java中的Date类型数据，我想存储到数据库的时候转换成时间戳，取出来转换成Java的Date，即：Java的Date和数据库之间的varchar毫秒值进行相互的转换**

开发步骤：

1. 定义类型转换器继承类`BaseTypeHandler<T>`
2. 覆盖四个为实现的方法，其中
   1. `setNonNullParamete`为Java程序设置到数据库的方法
   2. `getNullableResult`为查询时，mysql 的字符串转换成Java的type类型的方法
3. 在Mybatis的核心配置文件中进行注册
4. 测试转换是否正确

我们首先给user表添加一个属性-birthday 类型是bigint

```sql
create table user
(
    id int auto_increment    primary key,
    username varchar(32)         not null,
    password char(40) default '' not null,
    birthday bigint              null,
    constraint username
    unique (username)
);
```

然后在userMapper中这样配置：

```xml
<!--    插入带有生日的用户-->
<insert id="addUserWithBirthday" parameterType="User">
    insert into user(username, password, birthday)
    values (#{username}, #{password}, #{birthday})
</insert>
```

然后在user的domain中添加Date birthday字段

这里就不测试了，结果是显而易见的失败 ---Date默认情况下是无法直接转换为long的

接下来我们开始自定义类型处理器

#### ✨定义类型转换器继承类BaseTypeHandler、覆盖四个实现的方法

非常简单，在handler目录下新建一个DateTypeHandler类

```java
public class DateTypeHandler extends BaseTypeHandler<Date> {
    /**
     * 将Java类型转换成数据库需要的类型
     */
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Date parameter, JdbcType jdbcType) throws SQLException {
//        date.getTime 获取当前时间戳（按照秒）
        ps.setLong(i, parameter.getTime());
    }

    /**
     * 将数据库中的类型转换为Java的类型
     * 后面几个都是一样的 只是mybatis底层有时候会调用不同的方法
     * 这里String参数 是数据库中要转换的字段名称
     * resultSet 结果集
     */
    @Override
    public Date getNullableResult(ResultSet rs, String columnName) throws SQLException {
//        获取结果集中需要的类型---bigint-->转换成Date 并返回
        // 注意 这里是getlong 而不是getString 否则将返回错误的值！
        long string = rs.getLong(columnName);
        return new Date(string);

    }

    @Override
    public Date getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        long string = rs.getLong(columnIndex);
        return new Date(string);
    }

    @Override
    public Date getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        long string = cs.getLong(columnIndex);
        return new Date(string);
    }
}
```

#### 在Mybatis的核心配置文件中进行注册

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">


<configuration>

    <properties resource="jdbc.properties"/>
    <!--    设定别名-->
    <typeAliases>
        <typeAlias type="com.mybatis.domain.User" alias="User"></typeAlias>
    </typeAliases>
    
    <!--    自定义类型处理器 注意一定要在别名的下面，environments的上面 不然铁定会报错-->
    <typeHandlers >
        <typeHandler handler="com.mybatis.handler.DateTypeHandler"></typeHandler>
    </typeHandlers>
    
    
    <environments default="dev">
        <environment id="dev">
            <transactionManager type="JDBC"/>

            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"></property>
                <property name="url" value="${jdbc.url}"></property>
                <property name="username" value="${jdbc.username}"></property>
                <property name="password" value="${jdbc.password}"></property>
            </dataSource>
        </environment>


    </environments>


    <!--    加载映射文件-->
    <mappers>
        <mapper resource="com/mybatis/mapper/userMapper.xml"></mapper>
    </mappers>


</configuration>
```

#### 测试是否正确

我们的别的都不需要变动，正常使用即可：

```xml
<!--    插入带有生日的用户-->
<insert id="addUserWithBirthday" parameterType="User">
    insert into user(username, password, birthday)
    values (#{username}, #{password}, #{birthday})
</insert>
```

接口：

```java
int addUserWithBirthday(User user);
```

测试：

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();

    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    User myTestDates = new User("测试Date", "456456");
    myTestDates.setBirthday(new Date());

    int i = mapper.addUserWithBirthday(myTestDates);
    System.out.println(i > 0 ? "插入成功" : "插入失败");

    //        查询该用户
    User byCondition = mapper.findByCondition(myTestDates);
    System.out.println("查询结果：" + byCondition);

    sqlSession.commit();

}
```

运行结果：

![image-20211215231211454](/images/Java/SpringFrameWork/10-Mybatis/image-20211215231211454.png)

## ✨✨Plugins标签（插件标签）

Mybatis可以使用第三方的插件来对功能进行扩展

例如分页助手PageHelper是将分页的复杂操作进行封装，使用简单的方式即可获得分页相关的数据

开发步骤：

1. 倒入PageHelper的依赖
2. 在mybatis核心配置文件中配置PageHelper插件
3. 测试分页数据获取

依赖需要倒入两个： jsqlparser是解析器 都是github家的

```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.3.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.github.jsqlparser/jsqlparser -->
<dependency>
    <groupId>com.github.jsqlparser</groupId>
    <artifactId>jsqlparser</artifactId>
    <version>4.3</version>
</dependency>
```

接着说下配置，我们在核心配置文件中加入如下配置：

注意：pagehelper5和pagehelper4的配置有区别

### 扩展-pagehelper的配置

pagehelper4的配置参数看[这篇文章](https://www.cnblogs.com/kangoroo/p/7998433.html)

懒得看那篇文章的话直接用这套模板替换我下面的plugin

```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageHelper">
        <property name="dialect" value="mysql"/>
        <property name="offsetAsPageNum" value="false"/>
        <property name="rowBoundsWithCount" value="false"/>
        <property name="pageSizeZero" value="true"/>
        <property name="reasonable" value="false"/>
        <property name="supportMethodsArguments" value="false"/>
        <property name="returnPageInfo" value="none"/>
    </plugin>
</plugins>
```

pagehelper5看[官方文档](https://gitee.com/free/Mybatis_PageHelper)，非常简洁明了 如果是直接看配置文件部分 进这个[链接](https://github.com/pagehelper/Mybatis-PageHelper/blob/master/wikis/zh/HowToUse.md)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">


<configuration>
    <properties resource="jdbc.properties"/>
    <typeAliases>
        <typeAlias type="com.mybatis.domain.User" alias="User"></typeAlias>
    </typeAliases>
    <typeHandlers>
        <typeHandler handler="com.mybatis.handler.DateTypeHandler"/>
    </typeHandlers>

    <!--    配置分页助手插件-->
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <!--            这里是配置PageHelper的参数-->
            <property name="helperDialect" value="mysql"/>
        </plugin>
    </plugins>
    
    
    <environments default="dev">
        <environment id="dev">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"></property>
                <property name="url" value="${jdbc.url}"></property>
                <property name="username" value="${jdbc.username}"></property>
                <property name="password" value="${jdbc.password}"></property>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="com/mybatis/mapper/userMapper.xml"></mapper>
    </mappers>


</configuration>
```

接着测试

### 使用分页插件进行分页

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();

    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    //        设置分页相关参数，当前页+每页显示的条数  执行完这行代码之后下一句sql的查询语句将会被分页处理
    PageHelper.startPage(2, 3);
    List<User> all = mapper.findAll();
    System.out.println(all.size());
    for (User user : all) {
        System.out.println(user);
    }
    //        获得与分页相关参数 这里传入我们刚刚获取到的数据
    PageInfo<User> pageInfo = new PageInfo<>(all);
    System.out.println("当前页：" + pageInfo.getPageNum());
    System.out.println("总页数：" + pageInfo.getPages());
    System.out.println("总条数：" + pageInfo.getTotal());
    System.out.println("每页显示的条数：" + pageInfo.getPageSize());
    System.out.println("是否有上一页：" + pageInfo.isHasPreviousPage());
    System.out.println("是否有下一页：" + pageInfo.isHasNextPage());
    System.out.println("是否有第一页：" + pageInfo.isIsFirstPage());
    System.out.println("是否有最后一页：" + pageInfo.isIsLastPage());

    sqlSession.commit();
    sqlSession.close();
}
```

结果：

```md
User{id=8, username='tom', password='123456', birthday=Thu Jan 01 08:00:00 CST 1970}
User{id=9, username='1231231345325435', password='123456', birthday=Thu Jan 01 08:00:00 CST 1970}
User{id=11, username='老八', password='123456', birthday=Thu Jan 01 08:00:00 CST 1970}
当前页：2
总页数：7
总条数：19
每页显示的条数：3
是否有上一页：true
是否有下一页：true
是否有第一页：false
是否有最后一页：false

进程已结束,退出代码0

```

## Mybatis的多表操作

### 一对一查询的模式

![image-20211216000149849](/images/Java/SpringFrameWork/10-Mybatis/image-20211216000149849.png)

我们先创建一个order表吧

```sql
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ordertime` bigint DEFAULT NULL,
  `total` double DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_order` (`uid`),
  CONSTRAINT `user_order` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ;
插入几条数据
INSERT INTO `order` (`ordertime`, `total`, `uid`)  values
(1639585474030,233,1),
(1639565474030,55646,1),
(1639565477730,23365,1),
(1539564857732,6666,2),
(1539564275673,6544,2),
(1539564467306,3333,11);
```

在sql中，uid外键user.id

 但是在Java中，order对象得内置一个User对象

```java
public class Order {
    private Integer id;
    private Date ordertime;
    private Double total;
    //    当前订单属于哪个用户
    private User user;

// DO Get Set toString
}
```

然后我们在Mapper中新建一个OrderMapper interface

接着把UserMapper.xml复制一份 改个名字和namespace叫OrderMapper

然后在核心配置文件内增加下UserMapper

```xml
<!--    加载映射文件-->
<mappers>
    <mapper resource="com/mybatis/mapper/userMapper.xml"></mapper>
    <mapper resource="com/mybatis/mapper/OrderMapper.xml"></mapper>
</mappers>
```

然后我们尝试下查询数据-使用右外连接

```sql
select *  from
 `user` as u  Right JOIN `order` as o 
 ON u.id = o.uid;
```

![image-20211216003720702](/images/Java/SpringFrameWork/10-Mybatis/image-20211216003720702.png)

但是我们比较容易被这两个id所困惑，所以说实际上需要：

```sql
select *,o.id oid from
 `user` as u  Right JOIN `order` as o 
 ON u.id = o.uid;
```

![image-20211216003922476](/images/Java/SpringFrameWork/10-Mybatis/image-20211216003922476.png)

这样就好区分了嘛

然后我们在Order的配置文件当中加入这个sql语句：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.mybatis.dao.OrderMapper">


    <select id="findAll" resultType="???">
        select *, o.id oid
        from `user` as u
                 Right JOIN `order` as o ON u.id = o.uid;
    </select>

</mapper>
```

接着你会发现，这样做无法让Order类中的User被正确的赋值---它这里面即有User的信息，也有Order的信息，Mybatis此时无法正确区分谁是谁

我们这个时候应该告诉mybatis

- uid是user的
- username是user的
- password是user的
- birthday是user的

我们先到核心配置文件中配置好user和order的别名：

```xml
<typeAliases>
    <typeAlias type="com.mybatis.domain.User" alias="User"></typeAlias>
    <typeAlias type="com.mybatis.domain.Order" alias="Order"></typeAlias>
</typeAliases>
```

### 一对一查询的方式1---使用result普通属性接收

接着回到OrderMapper

我们可以通过在mapper中定义一个resultMap标签，里面按照如下方式自己的定义哪些字段对应哪些内容

然后在相关的crud语句中，使用`resultMap`属性来指定要用哪一个resultMap标签（传入id）

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.mybatis.dao.OrderMapper">

    <resultMap id="orderMap" type="Order">
        <!--        手动去指定字段和实体属性的映射关系
               cloumn:数据表的字段名称
               property:实体类的属性名称
               id表示主键 根据这个来分配每一行
               result表示 对应行的相关属性的分配
        -->
        <id property="id" column="oid"/>
        <!--        typeHandler 是显示指定使用哪个转换器-->
        <result property="ordertime" typeHandler="com.mybatis.handler.DateTypeHandler" column="ordertime"/>
        <result property="total" column="total"/>
        <!--        接下来就是user了 uid username password birthday 把属性都放到user对象内-->
        <result property="user.id" column="uid"/>
        <result property="user.username" column="username"/>
        <result property="user.password" column="password"/>
        <result property="user.birthday" typeHandler="com.mybatis.handler.DateTypeHandler" column="birthday"/>
    </resultMap>

    <!--    这里返回格式选择resultMap 内容填写我们刚刚创建的resultMap的id-->
    <select id="findAll" resultMap="orderMap">
        select *, o.id oid
        from `user` as u
                 Right JOIN `order` as o ON u.id = o.uid;
    </select>

</mapper>
```

接着使用：

```java
public interface OrderMapper {
    List<Order> findAll();
}
```

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();

    OrderMapper mapper = sqlSession.getMapper(OrderMapper.class);
    List<Order> all = mapper.findAll();
    for (Order order : all) {
        System.out.println(order);
    }

    sqlSession.commit();
    sqlSession.close();
}
```

结果：完美的契合了对应的内容

![image-20211216121526338](/images/Java/SpringFrameWork/10-Mybatis/image-20211216121526338.png)

### ✨一对一查询的方式2

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.mybatis.dao.OrderMapper">

    <resultMap id="orderMap" type="Order">
        <!--        手动去指定字段和实体属性的映射关系
               cloumn:数据表的字段名称
               property:实体类的属性名称
               id表示主键 根据这个来分配每一行
               result表示普通属性 格局查询结果来分配每一行（）
        -->
        <id property="id" column="oid"/>
        <!--        typeHandler 是显示指定使用哪个转换器-->
        <result property="ordertime" typeHandler="com.mybatis.handler.DateTypeHandler" column="ordertime"/>
        <result property="total" column="total"/>
        <!--        接下来就是user了 uid username password birthday 把属性都放到user对象内
                    property:当前实体的属性名称（Order对象内的private User user）
                    javaType:当前实体中的属性类型（com.mybatis.domain.User）
        -->
        <association property="user" javaType="User"  >
            <id property="id" column="uid"/>
            <!--            相当于让整个字段看起来更清楚了，跟上一个没有什么本质的区别-->
            <result property="username" column="username"/>
            <result property="password" column="password"/>
            <result property="birthday" column="birthday"/>
        </association>
    </resultMap>

    <!--    这里返回格式选择resultMap 内容填写我们刚刚创建的resultMap的id-->
    <select id="findAll" resultMap="orderMap">
        select *, o.id oid
        from `user` as u
        Right JOIN `order` as o ON u.id = o.uid;
    </select>

</mapper>
```

### ✨一对多的查询--使用Collection集合接收

我们现在有这样一条sql语句

```sql
select *,o.id oid from user u,`order` o where u.id=o.uid;
```

User表内并没有任何关于Order表的信息，但是Order表内涵盖有User表的信息

![image-20211216140740439](/images/Java/SpringFrameWork/10-Mybatis/image-20211216140740439.png)

我现在有一个需求：**查找所有的User（只查询有订单的），并且将其订单信息存放在User表内的一个集合中**

PS：如果你想要查找所有User，但是订单可有可无，只需要用左外连接查询即可，然后结果正常的按照我下方的方法整

现在我在User对象内添加一个属性---存放关于Order的所有信息（该用户的所有订单信息）

先在User中添加数据

```java
private List<Order> orderList;

public List<Order> getOrderList() {
    return orderList;
}

public void setOrderList(List<Order> orderList) {
    this.orderList = orderList;
}
```

接着按照如下方式来：先确定好查询语句

```sql
select *,o.id oid from user u,`order` o where u.id=o.uid;
```

接下来我们在userMapper中进行如下的配置：

```xml
<resultMap id="UserAndOrder" type="User">
    <id property="id" column="uid"/>
    <result property="username" column="username"/>
    <result property="password" column="password"/>
    <result property="birthday" typeHandler="com.mybatis.handler.DateTypeHandler" column="birthday"/>

    <!--       这里使用collection来封装集合 property表示接收数据的名称 我们之前定义的是 private orderList
            然后ofType表示里面每个对象的类型 都是Order对象
-->
    <collection property="orderList" ofType="Order">
        <id property="id" column="oid"/>
        <result property="ordertime" typeHandler="com.mybatis.handler.DateTypeHandler" column="ordertime"/>
        <result property="total" column="total"/>
    </collection>
</resultMap>

<!--    查询操作-->
<select id="findAll" resultMap="UserAndOrder">
    select *, o.id oid
    from user u,
    `order` o
    where u.id = o.uid;
</select>
```

测试：

```java
public static void main(String[] args) throws IOException {
    InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
    SqlSession sqlSession = build.openSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    List<User> all = mapper.findAll();
    for (User user : all) {
        System.out.println(user);
    }
    sqlSession.commit();
    sqlSession.close();
}
```

结果：

![image-20211216141802126](/images/Java/SpringFrameWork/10-Mybatis/image-20211216141802126.png)

## Mybatis注解开发

​  注解开发是目前市场的主流，Mybatis也可以使用注解开发方式，这样我们就可以减少编写Mapper映射文件了

### 注解一览

- @Insert 新增
- @Update 更新
- @Select 查询
- @Result 结果集封装
- @Results 可以跟@Result一起使用，封装多个结果集
- @One 实现一对一结果集封装
- @Many 实现一对多结果集封装

### ✨注解开发-基本使用

我们的文件按照如下方式排列

![image-20211216155232960](/images/Java/SpringFrameWork/10-Mybatis/image-20211216155232960.png)

User类中就是User的相关属性 和toString方法

DateType:bigint时间戳转换为Java的Date

```java
public class DateTypeHandler extends BaseTypeHandler<Date> {
    /**
     * 将Java类型转换成数据库需要的类型
     */
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Date parameter, JdbcType jdbcType) throws SQLException {
        //        date.getTime 获取当前时间戳（按照秒）
        ps.setLong(i, parameter.getTime());
    }

    /**
     * 将数据库中的类型转换为Java的类型
     * 后面几个都是一样的 只是mybatis底层有时候会调用不同的方法
     * 这里String参数 是数据库中要转换的字段名称
     * resultSet 结果集
     */
    @Override
    public Date getNullableResult(ResultSet rs, String columnName) throws SQLException {
        //        获取结果集中需要的类型---bigint-->转换成Date 并返回
        long string = rs.getLong(columnName);
        return new Date(string);

    }

    @Override
    public Date getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        long string = rs.getLong(columnIndex);
        return new Date(string);
    }

    @Override
    public Date getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        long string = cs.getLong(columnIndex);
        return new Date(string);
    }
}
```

userMapper这个后面说 接口类

jdbc配置数据库 log4j不管 这个用不上。。

sqlMapConfig 核心配置文件先进行如下配置：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!--    加载配置文件-->
    <properties resource="jdbc.properties"/>
    <!--    设定别名-->
    <typeAliases>
        <typeAlias type="com.mybatis.anno.domain.User" alias="User"/>
    </typeAliases>
    <!--    自定义类型处理器-->
    <typeHandlers>
        <typeHandler handler="com.mybatis.anno.handler.DateTypeHandler"/>
    </typeHandlers>

    <!--    配置分页助手插件-->
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <property name="helperDialect" value="mysql"/>
        </plugin>
    </plugins>
    <!--数据源的环境-->
    <environments default="dev">
        <environment id="dev">
            <transactionManager type="JDBC"/>

            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>


    </environments>

    <!--等下有东西要放在这个位置上-->
</configuration>
```

使用注解来开发Mybatis也非常简单，我们只需要在userMapper接口中加上我们之前在xml中配置的东西即可：对 简单的注解就是这么的简单

```java
import com.mybatis.anno.domain.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
public interface UserMapper {

    @Insert("insert into db1.user(username,password,birthday) values(#{username},#{password},#{birthday})")
    void save(User user);

    @Update("update db1.user set username=#{username},password=#{password},birthday=#{birthday} where id=#{id}")
    void update(User user);

    @Delete("delete from db1.user where id=#{id}")
    void delete(int id);

    @Select("select * from db1.user where id=#{id}")
    User findById(int id);

    @Select("select * from db1.user")
    List<User> findAll();

}
```

紧接着，在我们的sqlMapConfig.xml的configuration标签内部的最后面加上这个--本质上就跟Spring的扫包器一样，只是语法不同：

```xml
<mappers>
    <!--        package 声明扫包 name指定接口所在的包-->
    <package name="com.mybatis.anno.mapper"/>
</mappers>
```

紧接着测试：

```java
public class TestA {
    private static UserMapper mapper;
    private SqlSession sqlSession;

    @Before // 这里的@Before是Junit的前置代码 就像是静态代码块那样
    public void bef() throws IOException {
        InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
        sqlSession = build.openSession(true);
        mapper = sqlSession.getMapper(UserMapper.class);
    }
    @Test
    public void test1(){
        List<User> all = mapper.findAll();
        for (User user : all) {
            System.out.println(user);
        }
    }

    @After // 这个也是Junit的东西 就相当于程序结束时额外要运行的代码
    public void close() {
        sqlSession.close();

    }

}
```

运行结果：

![image-20211216155803016](/images/Java/SpringFrameWork/10-Mybatis/image-20211216155803016.png)

### Mybatis注解实现复杂的映射开发（多表查询）

​  如果说复杂的关系映射我们可以在之前的xml文件中通过配置`resultMap`来实现，使用注解开发后，我们可以使用

- @Results注解
- @Result注解
- @One注解
- @Many注解

四种注解来组合完成复杂的映射关系的配置

|   注解   | 说明                                                                                                                                                                                                                                                                                   | 案例 |
| :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| @Results | 代替标签`<resultMap>`<br />该注解中可以使用单个`@Result`注解标明字段<br />也可以用`@Result`集合，使用格式：<br />`@Results({@Result(),@Result()})`<br />或者`@Results(@Result())`                                                                                                      |      |
| @Result  | 代替了`<id>`标签和`<result>`标签<br />`@Result`属性介绍：（支持在xml中能够配置的所有属性）<br />**cloumn**：数据库返回的数据的名称<br />**property**：需要装配的属性名<br />**one**：需要使用的@One注解：`@Result(one=@One)`<br />**many**：需要使用的@Many注解：`@Result(many=@Many)` |      |

我们接着在domain定义好Order类，Order表在数据库中有个int uid 外链 user.id

```java
public class Order {
    private Integer id;
    private Date ordertime;
    private Double total;
    private User user;
}
```

此时的查询语句为：

```sql
select *, o.id oid
 from `user` as u
 Right JOIN `order` as o ON u.id = o.uid;
```

我们就可以在OrderMapper中按照xml的方式定义：

```java
public interface OrderMapper {

    @Select("select *, o.id oid\n" +
            "\tfrom `user` as u\n" +
            "\tRight JOIN `order` as o ON u.id = o.uid;")
    @Results({
        @Result(property = "id", column = "oid"),
        @Result(property = "ordertime", column = "ordertime"),
        @Result(property = "total", column = "total"),
        @Result(property = "user.id", cloumn="uid",
                ....下面同理 自己写 
               ))
    })
    List<Order> findAll();
}
```

测试：

```java
public class TestA {
    private SqlSession sqlSession;

    @Before
    public void bef() throws IOException {
        InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
        sqlSession = build.openSession(true);
    }
    @Test
    public void test1(){
        OrderMapper mapper = sqlSession.getMapper(OrderMapper.class);
        for (Order order : mapper.findAll()) {
            System.out.println(order);
        }
    }

    @After
    public void close() {
        sqlSession.close();

    }

}
```

结果：

![image-20211216163100570](/images/Java/SpringFrameWork/10-Mybatis/image-20211216163100570.png)

但是总感觉这两张表一起查比较难受 所以我们得用到一个强大的注解

### ✨@One注解

有没有注意到 我们的User和Order分别有自己对应的查询方式

而且Order表中的uid外链了User表的id属性

所以说Mybatis提供了这样一个注解，可以让我们在一个查询结果中调用另外一个查询

也就是这样的：

```sql
select * form `order`;
select * form user where id=?????
```

我们要先在order表中得到uid，然后在用这个uid执行user 的查询

```java
@Select("select *,`order`.id oid from `order`")
@Results({
    @Result(property = "id", column = "oid"),
    @Result(property = "ordertime", column = "ordertime"),
    @Result(property = "total", column = "total"),
    @Result(
        javaType = User.class, // 要封装的实体
        property = "user",  // 要封装的属性名称
        column = "uid", //根据哪个字段去查询User表的数据
        //                    select属性 代表查询哪个接口的方法 去获得  我们想要获得的数据
        // one属性要接收一个@One注解
        one = @One(select = "com.mybatis.anno.mapper.UserMapper.findById"))
})
List<Order> findAll();
```

接着老一套测试查询：

```java
@Test
public void test1(){
    OrderMapper mapper = sqlSession.getMapper(OrderMapper.class);
    for (Order order : mapper.findAll()) {
        System.out.println(order);
    }
}
```

查询结果：

![image-20211216164412666](/images/Java/SpringFrameWork/10-Mybatis/image-20211216164412666.png)

### ✨✨@Many注解

我们现在有一个需求：查询拥有订单(order)的user，并且将订单存放在user内的orderList属性中

> 提醒：使用这种@Many和@One会造成多次查询，如果只是简单的两三张表可以这样，但是特别多的表要聚合查询的话就不建议这样，还是老老实实的写SQL语句

也就是说我们最终的User属性如下：

```java
public class User{
    private Integer id;
    private String username;
    private String password;
    private Date birthday;
    private List<Order> orderList;
}
```

我们现在想要的是：

```sql
select * form user ;
select * form `order`where uid=?????
```

所以需要这样做：现在OrderMapper中添加一个通过uid查询的语句

```java
@Select("select *,`order`.id oid from `order` where id = #{id}")
List<Order> findByUserId(Integer uid);
```

接着在我们的UserMapper中这样操作：

```java
@Select("select * from db1.user")
@Results({
    @Result(id = true, property = "id", column = "id"), //id = true 表示这个是主键列
    @Result(property = "username", column = "username"),
    @Result(property = "password", column = "password"),
    @Result(property = "birthday", column = "birthday"),
    @Result(property = "orderList",
            column = "id",
            javaType = List.class, //这里表示返回一个list数组
            many = @Many(select = "com.mybatis.anno.mapper.OrderMapper.findByUserId")
           )
})
List<User> findUserAndOrderAll();
```

测试：

```java
@Test
public void test1(){
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    for (User user : mapper.findUserAndOrderAll()) {
        System.out.println(user);
    }
}
```

结果：

![image-20211216171148942](/images/Java/SpringFrameWork/10-Mybatis/image-20211216171148942.png)
