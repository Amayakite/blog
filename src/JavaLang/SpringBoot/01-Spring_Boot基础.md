---
title: 01-SpringBoot基础
date: 2021-12-17 17:27:13
category: SpringBoot
tag:
- Java
- SpringBoot
---

## 简介

​终于到了学习Java最为兴奋的环节了！！！

​我们先来回顾一下Spring能做什么：这里直接看[官网](https://spring.io/)的了

![image-20211217143002083](/images/SpringBoot/01-Spring_Boot基础/image-20211217143002083.png)

可以看到，他能完成非常多的事情，但是这些玩意坑顶不单单是一个Spring FrameWork(Spring context Spring mvc...)能来完成的

我们之前学习的Spring 基础部分 就属性 Spring Framework

![image-20211217143125919](/images/SpringBoot/01-Spring_Boot基础/image-20211217143125919.png)

可以看到，距离学完Spring 还有辣么大一截。。。

Spring并不单单指的是一个框架，而是一个非常庞大的生态圈，就如同它的名字一样：春天，衍生万物

也就是说，当我们学习到这里时，是**半个脚踏入Java**了

如果说你能把Spring的所有涵盖的内容都学习完毕之后....你可以真正意义上的月入10k+

那Spring Boot是拿来做什么的呢？

​我们之前配置Spring的时候，光是整合一个Spring jdbc 就需要话费非常大的力气

​而它的出现就是来简化这个问题的

​这是一个高层的框架，它的底层是Spring FrameWork

​它可以帮我们整合整个Spring系列集框架，来完成我们整个应用的开发，这样做在以后就可以免于写一大堆又臭又长的配置文件了，只需要专心于我们的业务文件

> Spring的作用就是让我们快速创建出Spring应用

优点：

- 创建独立的Spring应用
- 内嵌Web服务器（内嵌了Tomcat、Jetty等）
- 自动starter依赖，简化结构配置
  - 自动导入相应的依赖，并且配置好版本之间的兼容性
- 自动配置Spring以及第三方功能
- 提供伸长级别的监控、健康检查及外部化配置
- 无代码生成、无序编写XML

缺点：

- 人称版本帝，迭代块，需要时刻关注变化
- 封装非常深，内部原理极其复杂，非常难以精通

### 微服务的概念

- 微服务是一种架构风格
- 一个应用拆分成一组小型服务
- 每个服务运行在自己的进程内，也就是可以独立部署和升级
- 服务之间使用轻量级Http交互
- 服务围绕业务功能拆分
- 可以由全自动部署机制独立部署
- 去中心化、服务自治、服务可以使用不同的语言，不同的存储技术

这个看起来很简单对吧，实际上涉及到了非常多的问题，以及需要众多的解决方案

比如Nginx、Spring Cloud 、Docker 、K8S等等等等Super多的玩意

如果全部学完了，至少是月薪30k起步

### 快速入门Spring Boot

如果你是想完整的入门，建议去看看尚硅谷的[视频](https://www.bilibili.com/video/BV19K4y1L7MT?p=1&spm_id_from=pageDriver)

因为涉及到很多的小细节，这里就不多做说明了

这里我用的是spring boot 2.6.1

先看下官方文档按照Spring boot 2.6.1需要哪些[准备工作](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started)

JDK 1.8+ Maven版本要在3.5+ 我这里maven是3.8.4

#### 准备工作

conf/setting.xml的配置如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">

  <!-- 更换为在maven目录下 -->
  <localRepository>D:\apache-maven-3.8.4\maven-repo</localRepository>
  <mirrors>
    <!-- 

    Mirrors：镜像：方便下载使用
    Maven自带的镜像是国外的，国内有强，我们访问外网会非常的慢
    可以通过设置成国内镜像或者使用梯子的方式解决

   -->
    <mirror>
      <id>aliyunmaven</id>
      <mirrorOf>*</mirrorOf>
      <name>阿里云公共仓库</name>
      <url>https://maven.aliyun.com/repository/public</url>
    </mirror>


  </mirrors>

    <!--配置JDK版本-->
  <profiles>
    <profile>
      <id>jdk-1.8</id>
      <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
      </activation>
      <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
      </properties>
    </profile>
  </profiles>
</settings>
```

#### 导入依赖

接着创建一个空的Maven项目并按照[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started.first-application)的说明加入如下依赖：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>21-SpringBoot-HelloWorld</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <!--实际上你只需要加下面这句话即可-->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.1</version>
    </parent>

</project>
```

接着根据[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started.first-application.dependencies)的说明，我们要导入Web依赖只需要用普通的形式添加一个依赖即可：

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

接着我们来看下目前项目中都有哪些内容

![image-20211217153403927](/images/SpringBoot/01-Spring_Boot基础/image-20211217153403927.png)

可以看到，一大堆我们非常熟悉的功能：

jakson spring context spring mvc spring aoc 等全都被导入进来了

#### 编写代码

接下来我们创建下java文件 com.springboot.boot.MainApplication.java

 ```java
 @SpringBootApplication(scanBasePackages = "com.springboot")
 public class MainApplication {
 
     /**
      * 这里的main方法也是固定写法 SpringApplication.run(MainApplication.class, args);
      * @param args
      */
     public static void main(String[] args) {
         SpringApplication.run(MainApplication.class, args);
     }
 
 }
 ```

接着，我们在com.springboot.controller文件夹下新建一个HelloController.java

并写上相应的web逻辑

```java
/**
 * 说明： @RestController就是@Controller和@ResponseBody的合体内容 相当于封装了那两个
 */
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String index() {
        return "Hello Spring Boot!";
    }
}
```

#### 开始测试

紧接着，我们启动MainApplication.java

接着访问<http://localhost:8080/hello>

你就能看到学习Spring以来最神奇的事情

![image-20211217155636396](/images/SpringBoot/01-Spring_Boot基础/image-20211217155636396.png)

草，几行代码 直接把整个SpringMVC的配置都一笔带过了

接着还有更神奇的事情

我们在resources文件夹下新建`application.properties`

在里面写一句话（在你打service的时候IEDA应该就有智能提示了）

```properties
server.port=8888
```

接着重启服务，你就能在你的8888端口上成功的访问到我们相应的资源

![image-20211217160013819](/images/SpringBoot/01-Spring_Boot基础/image-20211217160013819.png)

关于这个配置文件，我们可以在spring的[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties)内看到相应能配置的东西，非常之多...

#### 简化打包

之前我们要将Spring项目打包成tomcat 项目 需要在pom.xml中手动添加

```xml
<packaging>war</packaging>
```

让其打包成war包 并且手动丢进tomcat文件夹内

接着，我们看下Spring[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started.first-application.executable-jar)内的说明

> 我们通过创建一个完全独立的可执行 jar 文件来完成我们的示例，我们可以在生产中运行该文件。可执行 jar（有时称为“fat jar”(小胖jar，里面啥都有)）是包含已编译类以及代码运行所需的所有 jar 依赖项的档案。
>
> 要创建一个可执行的JAR，我们需要添加`spring-boot-maven-plugin`到我们`pom.xml`。为此，请在该`dependencies`部分下方插入以下几行：
>
> ```xml
> <build>
>     <plugins>
>         <plugin>
>             <groupId>org.springframework.boot</groupId>
>             <artifactId>spring-boot-maven-plugin</artifactId>
>         </plugin>
>     </plugins>
> </build>
> 
> ```

我们添加完毕之后，打开Maven控制，点击package

![image-20211217160748984](/images/SpringBoot/01-Spring_Boot基础/image-20211217160748984.png)

接着就能在我们的target文件夹中看到一个jar文件

![image-20211217160841354](/images/SpringBoot/01-Spring_Boot基础/image-20211217160841354.png)

接着进入到这个文件夹内（用资源管理器之类的 ）

然后打开终端，输入

```shell
 java -jar 刚刚打包的jar文件
```

![image-20211217161024867](/images/SpringBoot/01-Spring_Boot基础/image-20211217161024867.png)

我曹 一个项目就好了？

浏览器访问：

![image-20211217161049179](/images/SpringBoot/01-Spring_Boot基础/image-20211217161049179.png)

并且这玩意打开速率比Tomcat快多了 草真的爽

刚刚学完SSM的我惊呆了

## SpringBoot的特点

### 依赖管理

首先就是副项目做依赖管理，我们最开始导入了一个包：

```xml
<!--parent 父项目依赖 子项目只要继承了这个父项目，以后子项目写依赖就不需要添加版本号了
 所以我们之后添加的spring-boot-starter-web 也没有写上版本号
-->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.1</version>
</parent>

ctrl+鼠标左键点击spring-boot-starter-parent 看看里面都有什么： 可以看到还有一个父项目
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.6.1</version>
</parent>
再进去 可以看到这里声明了一大堆jar包的版本
<properties>
    <activemq.version>5.16.3</activemq.version>
    <antlr2.version>2.7.7</antlr2.version>
    <appengine-sdk.version>1.9.92</appengine-sdk.version>
    <artemis.version>2.19.0</artemis.version>
    <aspectj.version>1.9.7</aspectj.version>
    <assertj.version>3.21.0</assertj.version>
    <atomikos.version>4.0.6</atomikos.version>
    ........
</properties>

比如说 log4j 和 logback 和 mysql
<log4j2.version>2.14.1</log4j2.version>
<logback.version>1.2.7</logback.version>
<mysql.version>8.0.27</mysql.version>

几乎声明了我们所有开发中所有常用的jar的版本号
所以我们无需写版本号

如果我们需要自定义版本 也是只需要在写驱动版本的时候自己的添加properties限定mysql版本
例如mysql5
在自己的pom.xml中
注意 加了这个properties是更方便管理版本，也可以按照之前的方式来在depedency中加上version来控制，但是那样就不方便管理
<properties>
    <mysql.version>5.1.49</mysql.version>
</properties>
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
</dependencies>

```

### 关于spring-boot-starter-web

在Spring的[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)中，我们可以获取到如下信息

> Starters 是一组方便的依赖描述符，您可以将它们包含在您的应用程序中。您可以获得所需的所有 Spring 和相关技术的一站式服务，而无需搜索示例代码和复制粘贴加载的依赖项描述符。例如，如果您想开始使用 Spring 和 JPA 进行数据库访问，请`spring-boot-starter-data-jpa`在您的项目中包含依赖项。
>
> starters 包含许多依赖项，您需要这些依赖项来快速启动和运行项目，并使用一组一致的、受支持的托管传递依赖项。
>
> 所有**官方**首发都遵循类似的命名模式；`spring-boot-starter-*`，其中`*`是特定类型的应用程序。此命名结构旨在在您需要查找入门时提供帮助。许多 IDE 中的 Maven 集成允许您按名称搜索依赖项。例如，安装适当的 Eclipse 或 Spring Tools 插件后，您可以`ctrl-space`在 POM 编辑器中按并键入“spring-boot-starter”以获得完整列表。
>
> 正如“[创建您自己的启动器](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-auto-configuration.custom-starter)”部分所述，第三方启动器不应以 开头`spring-boot`，因为它是为官方 Spring Boot 工件保留的。相反，第三方启动器通常以项目名称开头。例如，名为的第三方启动项目`thirdpartyproject`通常命名为`thirdpartyproject-spring-boot-starter`。

然后可以看到有很多`spring-boot-starter-*`

也就是说，根据我们项目需要的starter，这个场景所有常规需要的依赖，都会自动引入（根据Maven的特性）

SpringBoot所有支持的场景都可以在[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)中看到

当然我们也可以使用一些自定义或者第三方的starter这些以后会遇上

当让：我们自己创建的stater不要以spring-boot-starter开头，以免和官方的包混淆

例如：`ZhangSan-spring-boot-starter`

一看到这种类型的名字 也就应该知道 这个是第三方的starter

### 自动配置

- 自动配好Tomcat

  - 引入了Tomcat的依赖（在spring-boot-starter-web中）

    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-tomcat</artifactId>
        <version>2.6.1</version>
        <scope>compile</scope>
    </dependency>
    ```

  - 配置了Tomcat 这个我们之后会了解到 自动配置的原理

- 自动配置好SpringMVC

  - ```xml
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>5.3.13</version>
        <scope>compile</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.13</version>
        <scope>compile</scope>
    </dependency>
    ```

- 自动配置好了WEB常见功能

  - 例如我们之前要用SpringMVC的话，就得在web.xml中配置DispatcherServlet并设定为缺省值，现在，我们可以通过如下方法获取到spring boot 有没有配置它

  - ```java
    public static void main(String[] args) {
        //        返回我们的IOC容器
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
        //        查看容器里面的组件
        for (String name : run.getBeanDefinitionNames()) {
            System.out.println("组件名称：" + name);
        }
    }
    ```

  - 结果：
    ![image-20211217165321078](/images/SpringBoot/01-Spring_Boot基础/image-20211217165321078.png)

- 并且还配置好了characterEncodingFilter 字符编码拦截器 保证我们返回给客户端的中文不会乱码

- 并且还有multpartResolver文件上传功能等等等等诸多的常见功能

### 关于扫包

​在Spring的[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.structuring-your-code)中，我们可以看到如下信息：

> 我们通常建议您将主应用程序类放在其他类之上的根包中。该[`@SpringBootApplication`注解](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.using-the-springbootapplication-annotation)往往放在你的主类，它隐含地定义为某些项目一基地“搜索包”。例如，如果您正在编写 JPA 应用程序，`@SpringBootApplication`则使用带注释的类的包来搜索`@Entity`项目。使用根包还允许组件扫描仅应用于您的项目。
>
> ::: tip
>
> 如果您不想使用`@SpringBootApplication`，它导入的`@EnableAutoConfiguration`和`@ComponentScan`注释定义了该行为，因此您也可以改用它们。
>
> :::
>
> 以下清单显示了一个典型的布局：
>
> ```
> com
>  +- example
>      +- myapplication
>          +- MyApplication.java
>          |
>          +- customer
>          |   +- Customer.java
>          |   +- CustomerController.java
>          |   +- CustomerService.java
>          |   +- CustomerRepository.java
>          |
>          +- order
>              +- Order.java
>              +- OrderController.java
>              +- OrderService.java
>              +- OrderRepository.java
> ```

也就是主程序所在的包及其下面的所有子包里面的组件都会被默认扫描

也就是说我们可以把我们的项目结构改成这样

![image-20211217170444501](/images/SpringBoot/01-Spring_Boot基础/image-20211217170444501.png)

接着在MainApplication中把之前的扫包代码`@SpringBootApplication(scanBasePackages = "com.springboot")`

删掉 只保留`@SpringBootApplication`

```java {1}
@SpringBootApplication
public class MainApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
        for (String name : run.getBeanDefinitionNames()) {
            System.out.println("组件名称：" + name);
        }
    }
}
```

接着启动试试

![image-20211217170749178](/images/SpringBoot/01-Spring_Boot基础/image-20211217170749178.png)

依旧能够正常的访问到我们的内容

### 关于各种默认配置

其实在我们写application.xml的时候，你能发现写port之前有默认提示和默认值

![image-20211217171616232](/images/SpringBoot/01-Spring_Boot基础/image-20211217171616232.png)

我们也可以看到 例如文件上传的一些默认值

![image-20211217171657641](/images/SpringBoot/01-Spring_Boot基础/image-20211217171657641.png)

每个文件最大是1mb 总计最多上传10mb等

也就是说 每个配置都有默认的值，并且最终都是映射到某一个类上面的

比方说我们设置下文件的最大值

```properties
spring.servlet.multipart.max-file-size=5MB
```

然后左键点击它 就能跳转到对应的类内

![image-20211217171914961](/images/SpringBoot/01-Spring_Boot基础/image-20211217171914961.png)

并且由于我们修改了值，左边还贴心的给我们标识了。。

所以说，配置文件的值最终都会绑定到类上面，这个类会在容器中创建对象

并且它有按需加载自动匹配项

我们现在只引入了web的starter 所以程序在启动的时候，容器内并不含有jdbc相关的对象

但如果我们以后引入了jdbc的starter 那么该场景的jdbc自动配置将会被开启、容器内也会创建相应的对象

SpringBoot的所有配置功能都在`spring-boot-autoconfigura`这个依赖里边

PS：该依赖在web下的spring-boot-starter（Spring boot核心配置文件包）内

![image-20211217172803061](/images/SpringBoot/01-Spring_Boot基础/image-20211217172803061.png)

当然目前你能看有很多包下的类都是发红的，具体原因之后再说

但是就目前来说的话，应该是我们有了某种场景，相应的包才能生效

## 组件添加

### @Configuration配置类注解的额外说明-单例(Proxy)和多例

在之前学习Spring的过程中，我们常常食用@Configuration来标注某个类是一个配置类，在spring boot中同理

我现在创建一个user 和 cat的domain 具体内容就不多谈了，总之，user中含有一个对象cat

```java
@Configuration
public class MyConfig {
    @Bean
    public User user() {
        return new User("Tom", 10, cat());
    }

    @Bean
    public Cat cat() {
        return new Cat("Tomcat", 1, "Orange");
    }

}
```

接着在main方法中测试下 这玩意是否为单例的

```java
public static void main(String[] args) {
    //        返回我们的IOC容器
    ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
    //        在容器中，configuration也是一个bean对象
    MyConfig bean = run.getBean(MyConfig.class);
    User user = bean.user();
    User user1 = bean.user();
    Cat cat = bean.cat();
    System.out.println(user1==user);
    System.out.println("cat=====");
    System.out.println(cat==user.getCat());
    System.out.println(bean.getClass());

}
```

运行结果：

```
true
cat=====
true
class com.springboot.boot.config.MyConfig$$EnhancerBySpringCGLIB$$9cde7f34
```

这里我们成功的得到了几个ture，这和之前学SPring的时候性质一样-----相应的对象都在**容器**创建的时候创建好了，我们user中的`cat()`也是如此，它底层转换为xml大概是这个样子：

```xml
<bean id="cat" xxxx>
...构造方法传参
</bean>
<bean id="user" xxxx>
 <构造参数xxx name="cat" ref="cat">
</bean>
```

而且容器默认是单例模式---如果我们要修改成多例的话，只知道能在xml中配置：

```java
<bean id="cat" xxxx  scope="prototype">
...构造方法传参
</bean>
```

在@Bean方法中是没有办法定义的，那么我们该如何在java配置中开启多例模式呢？

按照之前学习的，可以这样

```java
@Bean()
@Scope("prototype")
public User user() {
    return new User("Tom", 10, cat());
}
```

但是这样cat依旧是那一个cat，我们想要给整个类开启多例模式的话--可以这样做：

```java
@Configuration(proxyBeanMethods = false)
// 配置proxyBeanMethods  这项默认为true  即：单例模式（代理模式）
// 可以配置为false 关闭单例模式（代理模式） 
public class MyConfig {
    @Bean()
    public User user() {
        return new User("Tom", 10, cat());
    }

    @Bean
    public Cat cat() {
        return new Cat("Tomcat", 1, "Orange");
    }

}
```

运行结果：

```
false
cat=====
false
class com.springboot.boot.config.MyConfig
```

这里并不是说单例和多例模式的注解应该怎么用

- 在我们相应的bean并不会被进行多次调用 并且是应该是动态的时候（例如创建一个虚拟的user对象，一个虚拟的cat 临时的密码等） 应该用多例模式
  - 使用多例模式的话，在程序启动的时候，SPring并不会帮助我们去创建对象， 而是在需要的时候（被调用的时候）才会创建相应的对象，所以说可以有效降低一些资源占用
  - 并且多例模式可以正常的被gc(垃圾回收机制)进行回收处理，单例则不行
- 如果我们需要一个全局唯一的对象，例如全局的一个DataSource，这样就必须得使用单例模式，虽然说会占用一些内存，但是可以有效提高之后的运行效率和速度

在实际使用中，单例模式也被称为FULL模式，方法调用会得到单例，开始时就创建好相应的内容

多例模式也被称为lite模式，类组件之间无依赖关系，按需加载

总结： 如果为true，得到的配置对象是代理对象，调用多次方法都会从容器中寻找，不会创建。 如果为false，得到的配置对象是一个普通对象，调用方法就是执行代码，调用几次，就创建几个对象

### @Import注解-可以导入class自动生成对象

我们现在有一个Person类，里面有username和password属性

接下来在我们的配置类中加入@Import注解

```java
@Import(Person.class)
@Configuration(proxyBeanMethods = true)
public class MyConfig {
}

```

就相当于自动生成了一个Bean对象，它可以传入一个数组{Person.class,Student.class}，**自动调用无参构造**

使用：通过run获取即可

```java
public static void main(String[] args) {
    //        返回我们的IOC容器
    ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
    //        在容器中，configuration也是一个bean对象
    Person bean = run.getBean(Person.class);
    System.out.println(bean);
}
```

### @Conditional 条件装配

满足Conditional指定条件，则进行组件注入，否则不进行注入

它是一个根注解，有很多派生注解

![image-20211217212137538](/images/SpringBoot/01-Spring_Boot基础/image-20211217212137538.png)

除了这些还有个叫@Propfile的

这些注解都言简意赅，比方说onBean 当某个容器内包含某个Bean的时候，才会进行注入， onClass当某个容器内包含某个Class的时候才会进行注入 onResources 当这个组件的项目类路径内存在某个资源的时候才进行注入，onJava 当满足指定的一些java版本号才会进行注入 onWebapplication 当是一个web应用的时候才会进行注入

这里以@ConditionalOnBean来示例

我们在myConfig.java中把Cat的Bean注释掉

```java {9}
@Import(Person.class)
@Configuration(proxyBeanMethods = true)
public class MyConfig {
    @Bean()
    public User user() {
        return new User("Tom", 10, cat());
    }
 
    //@Bean
    public Cat cat() {
        return new Cat("Tomcat", 1, "Orange");
    }

}
```

接下来测试一下：

```java
public static void main(String[] args) {
    //        返回我们的IOC容器
    ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);

    //       如果@Bean时，没有指定名字，默认是按照方法名创建
    boolean cat = run.containsBean("cat");
    System.out.println("容器内是否有cat组件"+cat);
    boolean user = run.containsBean("user");
    System.out.println("容器内是否有user组件"+user);

}
```

```
容器内是否有cat组件false
容器内是否有user组件true
```

接下来我们给MyConfig的User添加一个条件装备

```java
@Import(Person.class)
@Configuration(proxyBeanMethods = true)
public class MyConfig {
    /**
     *这里也可以通过 @ConditionalOnBean("cat")来进行判断
     */
    @Bean()
    @ConditionalOnBean(Cat.class) 
    public User user() {
        return new User("Tom", 10, cat());
    }
    public Cat cat() {
        return new Cat("Tomcat", 1, "Orange");
    }

}
```

再度运行的结果：

```
容器内是否有cat组件false
容器内是否有user组件false
```

甚至可以把这玩意标注在这个类上

```java
@Import(Person.class)
@Configuration(proxyBeanMethods = true)
@ConditionalOnBean(Cat.class) 
public class MyConfig {

    @Bean()
    public User user() {
        return new User("Tom", 10, cat());
    }
    public Cat cat() {
        return new Cat("Tomcat", 1, "Orange");
    }

}
```

当让也可以反向实现：当容器中没有cat的时候，才会进行对相应bean的注册：

```java
@Import(Person.class)
@Configuration(proxyBeanMethods = true)
@ConditionalOnMissingBean("cat") 
public class MyConfig {

    @Bean()
    public User user() {
        return new User("Tom", 10, cat());
    }
    public Cat cat() {
        return new Cat("Tomcat", 1, "Orange");
    }

}
```

也就是当这个类中有bean组件的时候，这个类中的所有bean注册才生效，否则全都不生效

**加了条件注解，代码执行到此处会先记录忽略，等容器其他组件加载完，再来判断是否注册组件**

我们之后在看底层的时候会看到非常非常多的条件装配，到时候可以看到

### @ImportResource 导入资源

比方说我们现在有一个原生的xml配置文件：mybeans.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean class="com.springboot.boot.domain.Person" id="zhangSan">
        <property name="username" value="张三"/>
        <property name="password" value="123456"/>
    </bean>
    <bean class="com.springboot.boot.domain.User" id="userRoot">
        <property name="name" value="root"/>
        <property name="age" value="18"/>
        <property name="cat" ref="tim"/>
    </bean>

    <bean class="com.springboot.boot.domain.Cat" id="tim">
        <property name="name" value="小花猫"/>
        <property name="age" value="1"/>
        <property name="color" value="彩色"/>
    </bean>

</beans>
```

我们想把这个玩意一点一点的迁移到Java注解中，但是因为懒惰或者老板不让而放弃了

只需要这样做就可以将其导入到我们的Java注解配置类中

```java
@Configuration(proxyBeanMethods = true)
@ImportResource(locations = "classpath:myBeans.xml")
public class MyConfig {
// 这里写你自己的代码
}
```

@->XML:没想到吧，时代变了，大人

使用：就像在application对象中那样丝滑 不对  

ConfigurableApplicationContext就是ApplicationContext类的实现...

```java
public static void main(String[] args) {
    //        返回我们的IOC容器
    ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
    User userRoot = run.getBean("userRoot", User.class);
    System.out.println(userRoot);

}
```

运行结果：

```md
User{name='root', age=18, cat=Cat{name='小花猫', age=1, color='彩色'}}
```

## @ConfigurationProperties 配置绑定

### 配合@Component

使用Java读取Properties文件的内容，并将其封装到JavaBean中

比方说我们现在有一个类 Car

```java
public class Car {
    private String brand;
    private Integer price;
}
```

然后我们在application.properties中加入如下内容

```properties
server.port=8888

mycar.brand=BYD
mycar.price=100000
```

接着回到Car类中

@ConfigurationProperties内有一个属性prefix

这个的意思是，查找在application.properties文件内 有指定字段前缀的属性

比方说下面的 prefix = "mycar" 这代表着查找 `mycar.*`的内容，并通过查找到的key自动匹配我们这个类的属性（PS：properties文件是不支持中文值的，即使你是utf-8的编码....）

我们在加上ConfigurationProperties之后，一定得加上容器标识符，否则是无法使用spring boot提供的强大功能呢的

```java
@Component
@ConfigurationProperties(prefix = "mycar")
public class Car {
    private String brand;
    private Integer price;
 //......
}

```

接下来我们在helloController中测试一下

```java
@RestController
public class HelloController {
 
    //注入bean
    @Resource(type = Car.class)
    private Car car;

    @RequestMapping("/hello")
    public String index() {
        return "世界你好";
    }

    @RequestMapping("/car")
    public Car car() {
        return car;
    }

}
```

结果：（PS：json转换器jackson 它也给我们配置好了）

![image-20211217222725283](/images/SpringBoot/01-Spring_Boot基础/image-20211217222725283.png)

### 配合@EnableConfigurationProperties

在某些情况下，我们并不想为了一个bean而去注册一个Component容器

或者说某些情况下无法为其创建一个容器

所以说Spring也提供了一个方法给我们这样配置

注意 @ConfigurationProperties这个玩意在Spring Boot的底层非常容易见到

```java {1}
//@Component 这个注释掉
@ConfigurationProperties(prefix = "mycar")
public class Car {
    private String brand;
    private Integer price;
 //......
}

```

然后在我们的main坐在的Class内加上

```java {2}
@SpringBootApplication
@EnableConfigurationProperties(Car.class) //这里可以传入一个数组class 相当于把这个Car自动注册到容器内
public class MainApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }
    
}
```

## Spring Boot自动配置原理入门

### @SpringBootApplication的构成

我们在编写Spring Boot程序的时候，写的第一句话是

```java
@SpringBootApplication
```

这个注解是干嘛用的呢？

我们先看源码，发现它有三个组合注解

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
```

第三个我们都非常眼熟了，扫包的，但是前两个

`@SpringBootConfiguration`和`@EnableAutoConfiguration`又是干嘛用的呢？

### @SpringBootConfiguration

这个当我们看到proxyBeanMethods的时候就应该知道

代表这个类当前是一个配置类

```java

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
@Indexed
public @interface SpringBootConfiguration {

    @AliasFor(annotation = Configuration.class)
    boolean proxyBeanMethods() default true;

}

```

### @EnableAutoConfiguration

一个@AutoConfigurationPackage？ 自动配置包？

还有一个是啥？@Import了什么？

```java
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {


 String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";


 Class<?>[] exclude() default {};


 String[] excludeName() default {};

}

```

接下来我们看看@AutoConfigurationPackage

#### @AutoConfigurationPackage

```java

@Import(AutoConfigurationPackages.Registrar.class)
public @interface AutoConfigurationPackage {


 String[] basePackages() default {};


 Class<?>[] basePackageClasses() default {};

}

```

也就是说核心是这个AutoConfigurationPackages.Registrar.class

##### AutoConfigurationPackages.Registrar.class

```java
static class Registrar implements ImportBeanDefinitionRegistrar, DeterminableImports {

    @Override
    public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
        register(registry, new PackageImports(metadata).getPackageNames().toArray(new String[0]));
    }

    @Override
    public Set<Object> determineImports(AnnotationMetadata metadata) {
        return Collections.singleton(new PackageImports(metadata));
    }

}
```

这里就言简意赅的概括下这里是干嘛用的

最主要的是这个方法：

```java
public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
    register(registry, new PackageImports(metadata).getPackageNames().toArray(new String[0]));
}

```

metadata就是我们正在运行的这个main方法，com.springboot.boot.MainApplication

![image-20211217231817272](/images/SpringBoot/01-Spring_Boot基础/image-20211217231817272-16397542988091.png)

然后代码中的new packageImports 获取到我们这个main方法所在包的包名

![image-20211217231944074](/images/SpringBoot/01-Spring_Boot基础/image-20211217231944074.png)

接着使用array+String接收

![image-20211217232038410](/images/SpringBoot/01-Spring_Boot基础/image-20211217232038410.png)

也就是最终获取到了我们这个包名

接着就是register方法，根据官方文档，可以看到它完成了如下内容：

> 以编程方式注册自动配置包名称。后续调用将把给定的包名添加到已经注册的包名中。您可以使用此方法手动定义将用于给定BeanDefinitionRegistry的基本包。通常，建议您不要直接调用此方法，而是依赖默认约定，其中包名是从@EnableAutoConfiguration类设置的。
>
> 形参:
>
> ​ registry–bean定义注册表
>
> ​ packageNames–要设置的包名称

也就是说，我们传入一个包名 它会自动帮我们注册到包名列表

此配置用于记录包扫描入口，常用于扫描@Mapper注解，区别于@MapperScan的另一种方式

所以说我们默认的包路径是main这个路径下，原因就在这

接着就是导入了

```java
@Override
public Set<Object> determineImports(AnnotationMetadata metadata) {
    return Collections.singleton(new PackageImports(metadata));
}
```

#### AutoConfigurationImportSelector

![image-20211217233624905](/images/SpringBoot/01-Spring_Boot基础/image-20211217233624905.png)

我只能说 关于这玩意太复杂了

反正是通过了这三个内部类 来获取到所有的组件名到一个LinkedList到一个集合中

md我跳过了 以后回来在看 视频<https://www.bilibili.com/video/BV19K4y1L7MT?p=14&spm_id_from=pageDriver>

#### 按需加载

虽然说我们导入的类所有自动配置的启动的时候都会默认加载，但是按照条件装配规则（@conditional），最终会按需配置（即：是否有某个依赖之类的才会进行加载）

#### 自动配置的原理

建议还是看这个[视频](https://www.bilibili.com/video/BV19K4y1L7MT?p=15)

我们现在随便打开spring-boot-autoconfigure的某个包，这里以aop为例

```java {2,5}
@Configuration(proxyBeanMethods = false)
@ConditionalOnProperty(prefix = "spring.aop", name = "auto", havingValue = "true", matchIfMissing = true)
public class AopAutoConfiguration {

    @Configuration(proxyBeanMethods = false)
    @ConditionalOnClass(Advice.class)
    static class AspectJAutoProxyingConfiguration {

///.......
    }
}

```

首先可以看到第二行的

`@ConditionalOnProperty(prefix = "spring.aop", name = "auto", havingValue = "true", matchIfMissing = true)`

这里前面的我们都看得懂  spring.aop.auto=true 对应前面三个 ，然后就是matchIfMissing

这个属性的含义是---如果没有设定属性，条件是否匹配---也就是说  如果我们没有配置对应的属性，是否应该也匹配上前面的配置，如果为false 则不匹配 则不加载 如果为true 则匹配 进行加载

这里为true 所以自动加载，

接下来是`@ConditionalOnClass(Advice.class)`

因为我们并没有安装aop相关的，它这里依赖的是aspectj相关的包

![image-20211218115315943](/images/SpringBoot/01-Spring_Boot基础/image-20211218115315943.png)

所以这里将不会匹配，这个AspectJAutoProxyingConfiguration将不会被加载

### 如何使用springboot

- 引入对应的场景依赖
  - <https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters>
- 查看自动配置了哪些
  - 自己分析，引入场景后在autoconfiguration内查看 例如web就是里面的web
  - 在application.properties中加入`debug=true`，然后看console里打印出来的含有Did not Match的都是不生效的(ctrl+F 搜索Negative matches 那下面的就是)
    ![image-20211218122100906](/images/SpringBoot/01-Spring_Boot基础/image-20211218122100906.png)
- 是否需要修改
  - 参照[配置文档](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties)进行修改配置项
  - 自己按照感觉修改
  - 比方说我现在觉得spring启动的时候的banner图片不好看
    ![image-20211218122337635](/images/SpringBoot/01-Spring_Boot基础/image-20211218122337635.png)
  - 我想换成自己的，一搜索image发现了如下匹配项
    ![image-20211218122410302](/images/SpringBoot/01-Spring_Boot基础/image-20211218122410302.png)
  - 接着发现支持
    ![image-20211218122634928](/images/SpringBoot/01-Spring_Boot基础/image-20211218122634928.png)
  - 修改：你可以到这个网站去生成一个spring boot banner<https://www.bootschool.net/ascii>
  - 当然你甚至可以用txt
    ![image-20211218123227901](/images/SpringBoot/01-Spring_Boot基础/image-20211218123227901.png)
- 当然 你也可以自定义加入或者替换组件，原理看这个[视频](https://www.bilibili.com/video/BV19K4y1L7MT?p=15&spm_id_from=pageDriver)

### 开发小技巧

#### Lombok-自动生成getset

第一步，添加依赖

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>
```

第二步：安装这个插件

![image-20211218124027221](/images/SpringBoot/01-Spring_Boot基础/image-20211218124027221.png)

新版本的IEDA自带 无序安装

然后在你想要的类上 比如User

```java
@Data
public class User {
    private String name;
    private Integer age;
    private Cat cat;


    public User() {
    }

    public User(String name, Integer age, Cat cat) {
        this.name = name;
        this.age = age;
        this.cat = cat;
    }


}
```

把get set 什么的都去掉 加上@Data

然后运行下程序 你就可以得到如下内容Get Set  hashcode equals  tostring 等（IEDA 2021.1.3）

当然你也可以这样写

```java
@Data
@AllArgsConstructor //自动加上有参构造器 注意 有参构造器 是把所有参数都弄进去 如果要指定哪几个参数的话 要自己写
@NoArgsConstructor //自动加上无参构造器
public class User {
    private String name;
    private Integer age;
    private Cat cat;
}
```

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.springboot.boot.domain;

public class User {
    private String name;
    private Integer age;
    private Cat cat;

    public User() {
    }

    public User(String name, Integer age, Cat cat) {
        this.name = name;
        this.age = age;
        this.cat = cat;
    }

    public String getName() {
        return this.name;
    }

    public Integer getAge() {
        return this.age;
    }

    public Cat getCat() {
        return this.cat;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setAge(final Integer age) {
        this.age = age;
    }

    public void setCat(final Cat cat) {
        this.cat = cat;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof User)) {
            return false;
        } else {
            User other = (User)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label47: {
                    Object this$age = this.getAge();
                    Object other$age = other.getAge();
                    if (this$age == null) {
                        if (other$age == null) {
                            break label47;
                        }
                    } else if (this$age.equals(other$age)) {
                        break label47;
                    }

                    return false;
                }

                Object this$name = this.getName();
                Object other$name = other.getName();
                if (this$name == null) {
                    if (other$name != null) {
                        return false;
                    }
                } else if (!this$name.equals(other$name)) {
                    return false;
                }

                Object this$cat = this.getCat();
                Object other$cat = other.getCat();
                if (this$cat == null) {
                    if (other$cat != null) {
                        return false;
                    }
                } else if (!this$cat.equals(other$cat)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof User;
    }

    public int hashCode() {
        int PRIME = true;
        int result = 1;
        Object $age = this.getAge();
        int result = result * 59 + ($age == null ? 43 : $age.hashCode());
        Object $name = this.getName();
        result = result * 59 + ($name == null ? 43 : $name.hashCode());
        Object $cat = this.getCat();
        result = result * 59 + ($cat == null ? 43 : $cat.hashCode());
        return result;
    }

    public String toString() {
        return "User(name=" + this.getName() + ", age=" + this.getAge() + ", cat=" + this.getCat() + ")";
    }
}

```

#### 热更新

有两个选择

第一个是spring-boot-devtools 添加下这个依赖，官方推荐用这个

<https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools>

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

然后正常运行，需要热部署的时候用这个构建即可

![image-20211218130947744](/images/SpringBoot/01-Spring_Boot基础/image-20211218130947744.png)

**springboot的devtools本质上是重启项目**

这玩意并不是真正的热更新，官方是这样说的：推荐使用JRebel

![image-20211218131426831](/images/SpringBoot/01-Spring_Boot基础/image-20211218131426831.png)

<https://blog.csdn.net/lianghecai52171314/article/details/105637251>

### Spring-initializr 快速创建spring boot project

如果说服务器连接不上的话 可以更换成阿里的`https://start.aliyun.com`

不过**阿里云的版本非常低** 建议有能力的话还是挂个梯子

刚刚又看到了几个解决方案 优先推荐：

- `http://start.spring.io`
- `https://start.springboot.io` 推荐使用这个 不知道为啥就这个最快最稳定

![image-20211218131951227](/images/SpringBoot/01-Spring_Boot基础/image-20211218131951227.png)

然后就可以自由的选择需要哪种类型的开发

![image-20211218134535632](/images/SpringBoot/01-Spring_Boot基础/image-20211218134535632.png)

比方说我这里选择了WEB Mybatis 和一个redis

![image-20211218134642400](/images/SpringBoot/01-Spring_Boot基础/image-20211218134642400.png)

紧接着你就能得到如下文件

![image-20211218135032347](/images/SpringBoot/01-Spring_Boot基础/image-20211218135032347.png)

src目录结构如下

![image-20211218140059920](/images/SpringBoot/01-Spring_Boot基础/image-20211218140059920.png)
