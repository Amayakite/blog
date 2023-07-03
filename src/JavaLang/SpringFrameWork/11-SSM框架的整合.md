---
title: 11-SSM框架的整合
date: 2021-12-16 17:12:53
category: Spring-FrameWork
tag:
- Java
- Spring
- SpringMVC
- Mybatis
---

## 概述

到了这里为止，SSM三大框架就已经学完了(Spring SpringMVC Mybatis)

SS两个框架整合我们都知道了，因为属于同一个生态系统，所以直接合并在一块用即可，但是Mybatis又该怎么整合呢？

为此，我们这里使用一个简单的例子来贯穿

先在数据库内创建一个表

```sql
create database ssm;
use ssm;
create table account(
 id int Primary key AUTO_INCREMENT,
    name varchar(50),
    money double
);
```

接着，我们创建一个Maven-Web工程（用不用模板都可 反正最后都要加web）

![image-20211216172448044](/images/Java/SpringFrameWork/11-SSM框架的整合/image-20211216172448044.png)

接着导入SSM依赖

### 准备工作-导入依赖

```xml
<!--Spring相关-->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.13</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.7</version>
    <scope>runtime</scope>
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
<!-- https://mvnrepository.com/artifact/org.springframework/spring-test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.3.13</version>
    <scope>test</scope>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.13</version>
</dependency>

<!--Tomcat相关-->
<!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api -->
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-servlet-api</artifactId>
    <version>9.0.56</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-jsp-api -->
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-jsp-api</artifactId>
    <version>9.0.56</version>
</dependency>

<!--Mybatis相关-->
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.8</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis-spring -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.6</version>
</dependency>

<!--Sql-->
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


```

### 准备工作-实体类

在domain下新建Account

```java
package com.ssm.domain;

public class Account {
    private Integer id;
    private String name;
    private Double money;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", money=" + money +
                '}';
    }
}

```

### 准备工作-编写Mapper接口和Service

```java
public interface AccountMapper {

    void save(Account account);

    List<Account> findAll();
}

```

service：

```java
public interface AccountService {

    void save(Account account);

    List<Account> findAll();

}
```

实现类：

```java
public class AccountServiceImpl implements AccountService {
    @Override
    public void save(Account account) {

    }

    @Override
    public List<Account> findAll() {
        return null;
    }
}
```

### 准备工作-AccountController

```java
@Controller
@RequestMapping(produces = "application/json;charset=utf-8") //返回都规定为json
public class AccountController {

    @Autowired
    private AccountService accountService;

    /**
     * 保存的方法
     *
     * @param account
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public String save() {
        return null;
    }

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    @ResponseBody
    public String queryAll() {

        return null;
    }


}
```

### 静态页面（使用vue+axios）

你也可以选择用jsp，我是不太喜欢用那玩意

add.html

```html
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta charset="UTF-8">
        <title>添加数据</title>
        <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.13/vue.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script>
    </head>
    <body>
        <div id="app">
            <h1>保存用户账单信息</h1>
            <div>
                用户名称<input type="text" v-model='name' name="name"><br>
                账户金额<input type="text" v-model="money" name="money"><br>
                <button @click="save">提交</button>
            </div>
        </div>
        <script>
            window.onload = function () {
                var app = new Vue({
                    el: '#app',
                    data: {
                        name: '',
                        money: ''
                    },
                    methods: {
                        save: function () {
                            axios.post('./save', {
                                name: this.name,
                                money: this.money
                            }).then(function (response) {
                                console.log(response);
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }
                    }
                });
            }
        </script>
    </body>
</html>
```

list.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.13/vue.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script>

    </head>
    <body>
        <div id="app">
            <tr>
                <th>账户id</th>
                <th>账户名称</th>
                <th>账户金额</th>
            </tr>
            <tr v-for="item in list">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.money}}</td>
            </tr>
        </div>
        <script>
            window.onload = function () {
                new Vue({
                    el: '#app',
                    data: {
                        list: []
                    },
                    mounted: function () {
                        this.getList();
                    },
                    methods: {
                        getList: function () {
                            axios.get('./findAll').then(function (response) {
                                this.list = response.data;
                            }.bind(this));
                        }
                    }
                });
            }
        </script>
    </body>
</html>
```

### 准备相关的配置文件

### jdbc.properties

```properties
jdbc.username=root
jdbc.password=123456
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssm?useUnicode=true&amp;characterEncoding=utf-8
```

### log4j.properties

```properties
### direct log messages to stdout ###
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

### direct messages to file mylog.log ###
log4j.appender.file=org.apache.log4j.FileAppender
log4j.appender.file.File=c:/mylog.log
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

### set log levels - for more verbose logging change 'info' to 'debug' ###
### 这里要改动的就只有这个info 可以改成debug  其余的不需要动
log4j.rootLogger=info, stdout

```

### web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="false">
    <!--  Spring监听器-->

    <!--  SpringMVC的前端控制器-->

    <!--    配置乱码过滤器-->

</web-app>

```

### applicationContext.xml和spring-mvc.xml

用同一套模板

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>
```

#### Mybatis配置文件

##### 映射配置文件-AccountMapper.xml

在com.ssm.mapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ssm.mapper.AccountMapper">

</mapper>
```

##### 核心配置文件-sqlMapConfig.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

</configuration>
```

### 配置Mybatis映射文件和核心配置文件

我们先在核心配置文件中配置下别名：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <typeAliases>
        <package name="com.ssm.domain"/>
    </typeAliases>
</configuration>
```

这里可以用`<package name="包名"/>`的方式来扫包，后续使用只需要使用类名的首字母小写形式即可

接着配置映射配置文件

::: tip

IEDA安装下`Mybatis X`插件 可以在Mapper接口类中按下ctrl+enter快速创建相应的语句

:::


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ssm.mapper.AccountMapper">

    <insert id="save" parameterType="account">
        insert into ssm.account(name, money)
        values (#{name}, #{money})
    </insert>
    <select id="findAll" resultType="account">
        select *
        from ssm.account
    </select>
</mapper>

```

接着配置下核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--    加载配置文件-->
    <properties resource="jdbc.properties"/>
    <typeAliases>
        <package name="com.ssm.domain"/>
    </typeAliases>
    <!--        配置环境-->
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

    <!--    加载映射-->
    <mappers>
        <!--        扫包的方式加载-->
        <package name="com.ssm.mapper"/>
    </mappers>

</configuration>
```

### 配置ApplicationContext

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!--    组件扫描：扫描service和mapper-->

    <context:component-scan base-package="com.ssm">
        <!--        排除扫描：controller-->
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>



</beans>
```

### 配置Spring-mvc.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--    组件扫描 扫描controller-->
    <context:component-scan base-package="com.ssm.controller"/>

    <!--    配置MVC的注解驱动-->
    <mvc:annotation-driven/>

    <!--    配置内部资源视图解析器 这一步可以省略-->
    <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/"/>
        <property name="suffix" value=".html"/>
    </bean>

    <!--    开放资源访问-->
    <mvc:default-servlet-handler/>

</beans>
```

### 配置web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="false">
    <!--  Spring监听器-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!--  SpringMVC的前端控制器-->

    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!--    配置前端控制器的映射-->
    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>


    <!--    配置乱码过滤器-->
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

</web-app>

```

### 扩展-配置json转换器

添加pom.xml依赖：

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-annotations -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.13.0</version>
</dependency>
```

在spring-mvc.xml中加入如下内容：

```xml
<!--先确保这个玩意加上去了-->
<mvc:annotation-driven/>

<!--    配置自动转换成json-->

<bean id="requestMappingHandlerAdapter"
      class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
    <property name="messageConverters">
        <list>
            <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
        </list>
    </property>
</bean>
```

### 编写业务层代码

```java
@Service("accountService")
public class AccountServiceImpl implements AccountService {
    @Override
    public void save(Account account) {
        try {
            InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
            SqlSession session = build.openSession();
            AccountMapper mapper = session.getMapper(AccountMapper.class);
            mapper.save(account);
            session.commit();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Account> findAll() {
        try {
            InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
            SqlSession session = build.openSession();
            AccountMapper mapper = session.getMapper(AccountMapper.class);
            List<Account> accounts = mapper.findAll();
            session.close();
            return accounts;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

```

### 编写访问代码

```java
package com.ssm.controller;

import com.ssm.domain.Account;
import com.ssm.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

 */
@Controller
@RequestMapping(produces = "application/json;charset=utf-8")
public class AccountController {

    @Autowired
    private AccountService accountService;

    /**
     * 保存的方法
     *
     * @param account
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public String save(@RequestBody Account account) {
        accountService.save(account);
        return "{\"success\":true}";
    }

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    @ResponseBody
    public List<Account> queryAll() {
        return accountService.findAll();
    }


}

```

### 测试

![image-20211216222604121](/images/Java/SpringFrameWork/11-SSM框架的整合/image-20211216222604121.png)

![image-20211216222626255](/images/Java/SpringFrameWork/11-SSM框架的整合/image-20211216222626255.png)

## ✨Spring整合MyBatis

### 不整合带来的困惑

现在我们出现的问题无非就是业务层的

```java
@Service("accountService")
public class AccountServiceImpl implements AccountService {
    @Override
    public void save(Account account) {
        try {
            InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
            SqlSession session = build.openSession();
            AccountMapper mapper = session.getMapper(AccountMapper.class);
            mapper.save(account);
            session.commit();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Account> findAll() {
        try {
            InputStream stream = Resources.getResourceAsStream("sqlMapConfig.xml");
            SqlSessionFactory build = new SqlSessionFactoryBuilder().build(stream);
            SqlSession session = build.openSession();
            AccountMapper mapper = session.getMapper(AccountMapper.class);
            List<Account> accounts = mapper.findAll();
            session.close();
            return accounts;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

```

我们在每次执行事务的时候都会访问Mybatis文件、创建Mybatis对象，所以这样效率就会非常慢

![image-20211216222912642](/images/Java/SpringFrameWork/11-SSM框架的整合/image-20211216222912642.png)

并且我们还没有用上Druid连接池和Spring的tx事务管理...

### 整合-合并配置文件

我们首先将Mybatis核心配置文件复制一份，重命名为sqlMapConfig-spring.xml，并且只保留如下内容

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <typeAliases>
        <package name="com.ssm.domain"/>
    </typeAliases>
<!--只保留别名-->
</configuration>
```

紧接着我们在applicationContext中进行如下配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--    组件扫描：扫描service和mapper-->

    <context:component-scan base-package="com.ssm">
        <!--        排除扫描：controller-->
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <!--    加载properties文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <!--    配置数据源信息-->
    <bean class="com.alibaba.druid.pool.DruidDataSource" id="dataSource">
        <property name="url" value="${jdbc.url}"/>
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--    配置session工厂-->
    <bean class="org.mybatis.spring.SqlSessionFactoryBean" id="sessionFactory">
        <property name="dataSource" ref="dataSource"/>
        <!--        加载mybatis核心配置文件-->
        <property name="configLocation" value="classpath:sqlMapConfig-spring.xml"/>
    </bean>
    <!--    扫描mapper所在的包，为mapper创建实现类-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.ssm.mapper"/>
    </bean>

    <!--    声明式事务控制-->
    <!--    声明平台事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--    配置事务增强-->
    <tx:advice id="txAdvice">
        <tx:attributes>
            <tx:method name="* "/>
        </tx:attributes>
    </tx:advice>
    <!--    配置事务的织入-->
    <aop:config>
        <aop:pointcut id="txAdvice" expression="execution(* com.ssm.service.*(..))"/>
    </aop:config>
</beans>
```

接着在userServiceImpl中修改代码：

```java
@Service("accountService")
public class AccountServiceImpl implements AccountService {

    @Resource(name = "accountMapper")
    private AccountMapper accountMapper;


    @Override
    public void save(Account account) {
        accountMapper.save(account);
    }

    @Override
    public List<Account> findAll() {
        return accountMapper.findAll();
    }
}
```

最后激动人心的时刻来了，测试：

![image-20211216225518745](/images/Java/SpringFrameWork/11-SSM框架的整合/image-20211216225518745.png)

## SSM 结束语

如果你成功的看到了这里，恭喜你，SSM框架已经学习完毕了

这也是Java中最蛋疼的部分，后面Spring Boot 会带你体会什么是世界一流框架

这里下面存放了模板 如果以后忘了我得回过头来看看

学完Spring Boot 就得去真正的学习 多线程----这是Java中最复杂的部分

以及 Java的底层--JVM虚拟机（拿来唬面试官的）

还有Mybatis Plus 可以让Mybatis变得不那么繁琐

## 🎉🎉SSM整合总结-模板

## 整体项目结构

一个完整的ssm项目结构如下：

![image-20211216225814220](/images/Java/SpringFrameWork/11-SSM框架的整合/image-20211216225814220.png)

## 项目的依赖

```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.11</version>
        <scope>test</scope>
    </dependency>
    <!--Spring相关-->
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.13</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.7</version>
        <scope>runtime</scope>
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
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-test -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.3.13</version>
        <scope>test</scope>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.13</version>
    </dependency>

    <!--Tomcat相关-->
    <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api -->
    <dependency>
        <groupId>org.apache.tomcat</groupId>
        <artifactId>tomcat-servlet-api</artifactId>
        <version>9.0.56</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-jsp-api -->
    <dependency>
        <groupId>org.apache.tomcat</groupId>
        <artifactId>tomcat-jsp-api</artifactId>
        <version>9.0.56</version>
    </dependency>

    <!--Mybatis相关-->
    <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.8</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis-spring -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>2.0.6</version>
    </dependency>

    <!--Sql-->
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

    <!--        转换成Json-->
    <!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.13.0</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.0</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-annotations -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.13.0</version>
    </dependency>
</dependencies>
```

## 数据源jdbc.properties的配置

```properties
jdbc.username=root
jdbc.password=123456
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssm
```

## Spring-Context的配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--    组件扫描：扫描service和mapper-->

    <context:component-scan base-package="com.ssm">
        <!--        排除扫描：controller-->
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <!--下面是Mybatis相关-->
    
    <!--    加载properties文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <!--    配置数据源信息-->
    <bean class="com.alibaba.druid.pool.DruidDataSource" id="dataSource">
        <property name="url" value="${jdbc.url}"/>
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--    配置session工厂-->
    <bean class="org.mybatis.spring.SqlSessionFactoryBean" id="sessionFactory">
        <property name="dataSource" ref="dataSource"/>
        <!--        加载mybatis核心配置文件-->
        <property name="configLocation" value="classpath:sqlMapConfig-spring.xml"/>
    </bean>
    <!--    扫描mapper所在的包，为mapper创建实现类-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.ssm.mapper"/>
    </bean>

    <!--    声明式事务控制-->
    <!--    声明平台事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--    配置事务增强-->
    <tx:advice id="txAdvice">
        <tx:attributes>
            <tx:method name="* "/>
        </tx:attributes>
    </tx:advice>
    <!--    配置事务的织入-->
    <aop:config>
        <aop:pointcut id="txAdvice" expression="execution(* com.ssm.service.*(..))"/>
    </aop:config>
</beans>
```

## Spring-MVC的配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--    组件扫描 扫描controller-->
    <context:component-scan base-package="com.ssm.controller"/>

    <!--    配置MVC的注解驱动-->
    <mvc:annotation-driven/>

    <!--    配置内部资源视图解析器 这一步可以省略-->
    <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/"/>
        <property name="suffix" value=".html"/>
    </bean>

    <!--    开放资源访问-->
    <mvc:default-servlet-handler/>

    <!--    配置自动转换成json-->

    <bean id="requestMappingHandlerAdapter"
          class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
        <property name="messageConverters">
            <list>
                <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
            </list>
        </property>
    </bean>
</beans>
```

## MyBatis的配置

### Mybatis核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <typeAliases>
        <package name="com.ssm.domain"/>
    </typeAliases>

</configuration>
```

### Mybatis 映射配置文件

注意 映射文件 除非特殊需求 不然和Mapper文件存放的位置是相似的

例如：Mapper.java文件放在src.com.ssm.Mapper目录下，

则Mybatis映射配置文件也要放在：resource/com/ssm/mapper目录下 这是约定俗成 而且也不容易乱

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ssm.mapper.AccountMapper">

    <insert id="save" parameterType="account">
        insert into ssm.account(name, money)
        values (#{name}, #{money})
    </insert>
    <select id="findAll" resultType="account">
        select *
        from ssm.account
    </select>
</mapper>

```

## Web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="false">
    <!--  Spring监听器-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!--  SpringMVC的前端控制器-->

    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!--    配置前端控制器的映射-->
    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>


    <!--    配置乱码过滤器-->
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

</web-app>

```

## 关于各个Java文件夹的说明

### Domain

存放最原始的对象，例如Account表对应的Account类

```java
package com.ssm.domain;


public class Account {
    private Integer id;
    private String name;
    private Double money;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Account other = (Account) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
                && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
                && (this.getMoney() == null ? other.getMoney() == null : this.getMoney().equals(other.getMoney()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getMoney() == null) ? 0 : getMoney().hashCode());
        return result;
    }

    private static final long serialVersionUID = 1L;

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", name=").append(name);
        sb.append(", money=").append(money);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}

```

### Mapper

用于配合Mapper处理数据，里面全部存放接口，例如：

```java
package com.ssm.mapper;

import com.ssm.domain.Account;

import java.util.List;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 20-SSM
 * @BelongsPackage com.ssm.mapper
 * @date 2021/12/16 17:45
 * @description 项目描述
 */
public interface AccountMapper {

    void save(Account account);

    List<Account> findAll();
}

```

### Service

Service用于存放操纵数据和相应逻辑处理的类

这里分为两层---第一层存放相应的方法接口

第二层impl存放相应的实现方法

![image-20211216230538430](/images/Java/SpringFrameWork/11-SSM框架的整合/image-20211216230538430.png)

接口：

```java
package com.ssm.service;

import com.ssm.domain.Account;

import java.util.List;


public interface AccountService {

    void save(Account account);

    List<Account> findAll();

}

```

方法

```java
package com.ssm.service.impl;

import com.ssm.domain.Account;
import com.ssm.mapper.AccountMapper;
import com.ssm.service.AccountService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("accountService")
public class AccountServiceImpl implements AccountService {

    @Resource(name = "accountMapper")
    private AccountMapper accountMapper;


    @Override
    public void save(Account account) {
        accountMapper.save(account);
    }

    @Override
    public List<Account> findAll() {
        return accountMapper.findAll();
    }
}

```

## Controller

用于存放和用户打交道的文件 一般情况下 用户传入的数据要在这一层进行第一次的筛选，然后交给Service类进行处理

```java
package com.ssm.controller;

import com.ssm.domain.Account;
import com.ssm.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@RequestMapping(produces = "application/json;charset=utf-8")
public class AccountController {

    @Autowired
    private AccountService accountService;

 // 用户请求save 存放一个account
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public String save(@RequestBody Account account) {
        accountService.save(account);
        return "{\"success\":true}";
    }
 
    // 用户请求findall 获取所有的account
    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    @ResponseBody
    public List<Account> queryAll() {
        return accountService.findAll();
    }


}

```
