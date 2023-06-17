---
title: 04-Spring-集成Web
date: 2021-12-10 21:08:05
category: Spring-FrameWork
tag:
- Java
- Spring
- JavaWeb
---

## Spring集成Web环境

​  我们首先需要创建一个新的Maven Moudle 然后进行如下操作

​  首先创建一个UserDao 和它的Impl（做一个简单的即可）以及UserService，**然后配置好相关的Spring--通过SpringConfiguration.java来进行配置**

> UserDao定义一个save方法，UserDaoImpl实现该方法，并在控制台打印一句话，Service同理，UserServiceImpl在实现save方法时要调用userDao的save方法（UserServiceImpl中保存着一个UserDao变量--通过Spring加载）

​  然后再添加下tomcat的Servlet的api和tomcat-jsp的API，我这里是10,10-的自己百度

> ```xml
> <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api -->
> <dependency>
>     <groupId>org.apache.tomcat</groupId>
>     <artifactId>tomcat-servlet-api</artifactId>
>     <version>10.0.13</version>
> </dependency>
> <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-jsp-api -->
> <dependency>
>     <groupId>org.apache.tomcat</groupId>
>     <artifactId>tomcat-jsp-api</artifactId>
>     <version>10.0.13</version>
> </dependency>
> ```

​  然后按下alt+shift+ctrl+s，唤醒出项目结构，给当前moudle新建web项目，然后配置好相关路径，最后一定要把tomcat的web.xml模板复制过来，里面有一处一定要修改

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                             https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
         version="5.0"
         metadata-complete="false">  左边这里原本是true，要改成false！！！不然WebServlet注解用不了的

    <display-name>Welcome to Tomcat</display-name>
    <description>
        Welcome to Tomcat
    </description>

</web-app>

```

紧接着，我们创建一个UserServlet，在web路径下

![image-20211210221807484](/images/Java/SpringFrameWork/04-Spring-Web/image-20211210221807484.png)

然后在里面写入如下内容，尝试调用下Spring

```java
@WebServlet("/user")
public class UserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ApplicationContext app = new AnnotationConfigApplicationContext(SpringConfiguration.class);
        UserService userService = (UserService) app.getBean("userService");
        userService.save();
        PrintWriter writer = resp.getWriter();
        writer.write("Hello Spring Web!");
        writer.close();
    }
}
```

#### 可能会遇到的NoClassDefFoundError异常问题

然后配置好tomcat，并运行，看看控制台是否有输出即可

这一步可能会遇到的问题：

**java.lang.NoClassDefFoundError: org/springframework/context/ApplicationContext**

我就遇到了，如果说你发现加上ApplicationContext app =xxx就启动不了tomcat表示和我出现的问题一样

具体解决方法看[这篇文章](https://blog.csdn.net/mo_ji63/article/details/107969415)即可

### 封装Application

​  想必从刚刚的代码中，你已经感觉到有点不对劲了，我们光是在一次用户发送请求的过程中，就调用了一次new XXXX来创建一个ApplicationContext，如果有1w个用户访问，那不得创建1W个？

​  我们可能首先想到的就是静态代码块，以及在Web项目启动的时候就创建一个，然后放到ServletContext全局上下文对象中...好像想到了什么

​  还记得我们在学习JavaWeb时使用的Listener监听器吗？

​  通过该方式创建对象，然后放到全局上下文对象中

接下来先试试：创建文件夹listener，里面新建一个Java类：

PS:我这里虽然是用注解来创建监听器的，但是一般全局监听器都建议是直接在web.app中直接配置：

```xml
<listener>
    <listener-class>
        com.SpringWeb.listener.WebServletContextListener
    </listener-class>
</listener>

```

```java
@WebListener
public class WebServletContextListener implements ServletContextListener {
    /**
     * Servlet启动时的监听器
     *
     * @param sce
     */
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext servletContext = sce.getServletContext();
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);
        servletContext.setAttribute("applicationContext", applicationContext);
    }

    /**
     * Servlet销毁时的监听器
     *
     * @param sce
     */
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        Object applicationContext = sce.getServletContext().getAttribute("applicationContext");
        ((AnnotationConfigApplicationContext) applicationContext).close();
    }
}
```

然后改动下我们的doGet

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Object applicationContext = getServletContext().getAttribute("applicationContext");
    UserService userService = ((ApplicationContext) applicationContext).getBean("userService", UserService.class);
    userService.save();
    PrintWriter writer = resp.getWriter();
    writer.write("Hello Spring Web!");
    writer.close();
    getServletConfig().getServletContext();
}
```

测试，无问题

![image-20211210230002404](/images/Java/SpringFrameWork/04-Spring-Web/image-20211210230002404.png)

### 将加载ApplicationConfig变成动态的

​  我们刚刚加载始终是加载的`SpringConfiguration.class`这样不太好，所以我们得再度解耦一波，那么该怎么去加载呢？

​  还记得之前在学JavaWeb时，有一个全局初始化参数吗，是不是可以把这个类名的全字符串丢进去，然后通过Class.forName来反射获取Clazz对象，然后丢进去创建

说干就干，接下来开始配置

web.xml

```xml
<!--    配置全局初始化参数-->
<context-param>
    <param-name>SpringConfig</param-name>
    <param-value>com.SpringWeb.config.SpringConfiguration</param-value>
</context-param>
```

接下来修改下ServletContextListener的init

```java
@Override
public void contextInitialized(ServletContextEvent sce) {
    ServletContext servletContext = sce.getServletContext();
    try {
        //        读取全局参数
        Class<?> springConfig = Class.forName(servletContext.getInitParameter("SpringConfig"));
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(springConfig);
        servletContext.setAttribute("applicationContext", applicationContext);
    } catch (ClassNotFoundException e) {
        throw new RuntimeException(e);
    }

}
```

测试，依旧成功：

![image-20211210225951611](/images/Java/SpringFrameWork/04-Spring-Web/image-20211210225951611.png)

### Spring集成Web环境-自己使用Utils进行封装

​  但是问题又来了，我们每次使用WebServlet来调用Application的时候，都要自己手动的执行下面的代码，我们能不能设计一个工具，传入一个上下文对象，自动获取Application呢？

```java
Object applicationContext = getServletContext().getAttribute("applicationContext");
UserService userService = ((ApplicationContext) 
```

说干就干，我们接着创建一个uitls目录下的WebApplicationContextUtils

写上如下代码：

```java
public class WebApplicationContextUtils {
    public static ApplicationContext getApplicationContext(ServletContext servletContext) {
        return ((ApplicationContext) servletContext.getAttribute("SpringConfig"));
    }
}
```

接着我们就可以轻松的在doGet中调用它

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ApplicationContext applicationContext = WebApplicationContextUtils.getApplicationContext(getServletContext());
    UserService userService = applicationContext.getBean("userService", UserService.class);
    userService.save();
    PrintWriter writer = resp.getWriter();
    writer.write("Hello Spring Web!");
    writer.close();
    getServletConfig().getServletContext();
}
```

但是，这玩意没必要做的。。。Spring提供了获取应用上下文的工具

## ContextLoaderListener类

​  我们之前所做的事情，其实都不用手动实现，Spring提供了监听器ContextLoaderListener就是对上述所有功能的封装，该监听器内部加载Spring配置文件，创建应用上下文对象，并存储到ServletContext中，提供了一个客户端工具`WebApplicationContextUtils`供使用者获取上下文对象

​  那我们上面写的那一摞子东西都是干嘛用的？

​  当让是写源码了hhhh

我们使用这个东西只需要做两件事：

1. 在Web.xml中配置ContextLoaderListener监听器（导入Spring-Web坐标）
2. 使用`WebApplicationContextUtils`获得应用上下文对象ApplicationContext

### 配置ContextLoaderListener

这玩意Spring-context可没有，它属于包`Spring-web`

[仓库链接](https://mvnrepository.com/artifact/org.springframework/spring-web)

导入和自己spring-context相同版本的即可，我这里是5.3.13

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-web -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>5.3.13</version>
</dependency>
```

接着在web.xml中配置下监听器（之前自己配置的那个可以注释掉了）：

```xml
<listener>
    <listener-class>
        org.springframework.web.context.ContextLoaderListener
    </listener-class>
</listener>
```

同时在web.xml中添加一个全局初始化参数

- 如果你是使用applicationContext.xml来加载Spring容器的话

  ```xml
  <context-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:你的配置文件.xml</param-value>
  </context-param>
  ```

- ~~如果你是用Java文件+注解来加载Spring容器的话~~ 不要这样用 一定会报错，手动配下applicationContext.xml，然后加个import标签，下面这个方法无效，如果你坚持这样做的话，会和我一样画好几个小时去解决BUG

  ```xml
  <context-param>
      <param-name>contextInitializerClasses</param-name>
      <param-value>该配置文件的全类名</param-value>
  </context-param>
  ```

然后你在自己的项目中直接这样就可以获取到了...

注意，引的包WebApplicationContext得是spring中的，而不是自己的

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    WebApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
    UserService userService = applicationContext.getBean("userService", UserService.class);
    userService.save();
    PrintWriter writer = resp.getWriter();
    writer.write("Hello Spring Web!");
    writer.close();
    getServletConfig().getServletContext();
}
```

当然，如果你是Tomcat10 这个时候可能已经彪红了

## 关于Tomcat10中无法使用WebApplicationContext的问题

如果你是tomcat10用户，到了最后使用WebApplicationContext大概率是会遇到这个问题：

![image-20211210235812891](/images/Java/SpringFrameWork/04-Spring-Web/image-20211210235812891.png)

![image-20211210235856888](/images/Java/SpringFrameWork/04-Spring-Web/image-20211210235856888-16391519384631.png)

类型不匹配嘛，但是很可惜，直到现在为止，Spring依旧是没有解决这个问题，可能是考虑到兼容性问题吧2021年12月11日00:00:01

目前的解决方案只有：用回tomcat9或者用自己的配置

接下来我们使用下tomcat9

### 安装tomcat9

在[这里下载](https://tomcat.apache.org/download-90.cgi)

![image-20211211001143685](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211001143685.png)

然后解压到自己喜欢的目录

修改conf文件夹下的loggin.properties文件，将所有UTF-8改成GBK，解决中文乱码的问题

然后再到bin/startup.bat中设置Java_Home

```ini
set JAVA_HOME=C:\Program Files\Eclipse Foundation\jdk-8.0.302.8-hotspot
set JRE_HOME=C:\Program Files\Eclipse Foundation\jdk-8.0.302.8-hotspot\jre
```

![image-20211211000739085](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211000739085.png)

启动测试（看见他启动了自己手动进下<http://localhost:8080>）：

![image-20211211001358066](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211001358066.png)

### 安装tomcat-9对应的Maven依赖

我们依旧是先进入这个hello看下有哪些代码：<http://localhost:8080/examples/servlets/helloworld.html>

发现他是依赖于一个javax.servlet，这就好办了

```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloWorld extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Hello World!</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>Hello World!</h1>");
        out.println("</body>");
        out.println("</html>");
    }
}
```

这里我们直接将自己项目中的依赖版本改成下载到的tomcat9版本，看下会不会报错

```xml
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-servlet-api</artifactId>
    <version>9.0.56</version>
</dependency>
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-jsp-api</artifactId>
    <version>9.0.56</version>
</dependency>
```

打开项目，一条红，说明包的前缀变了

![image-20211211002302922](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211002302922.png)

接下来要做的事情就很简单了，一个一个自己导入下

![image-20211211002400603](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211002400603.png)

没标红了，说明已经没问题了，我们看下引入的包名：

```java
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
```

好，依赖已经安装完毕

### 修改web.xml为tomcat9

可以看到，tomcat9(右边)的配置和tomcat10的配置是不一样的，所以我们需要改动一下配置，将项目中原本是tomcat10的配置改变为tomcat9(其实也就是一个5，一个4的区别)

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="false">
    <!--    DO Everything-->

</web-app>

```

接下来配置下ieda即可

![image-20211211002902507](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211002902507.png)

然后启动测试下

### 可能会遇到的问题ClassNotFoundException:org

解决思路来自[该博客](https://www.jianshu.com/p/18d068f47b09)

![image-20211211003337173](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211003337173.png)

其实和之前是一样的问题

我们按下ctrl+shift+alt+s打开项目结构窗口

点工件可以发现如下的内容：有三个标红

![image-20211211003425804](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211003425804.png)

这是为啥呢？

原因非常简单：**这是由于pom.xml中下载的jar包未被部署**

我们只需要

![image-20211211003607654](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211003607654.png)

这样既可

![image-20211211003617281](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211003617281.png)

但是紧接着我们又遇到了一个问题

### 使用Java配置文件配置ContextLoaderListener一定会遇到的问题

我长话短说了，不能用Java文件来配置ContextLoaderListener，这玩意是绝对行不通的...

前面的话也是我到这里加上去的，我相信你已经准备好了一个applicationContext.xml，如果没有的话，按照我的方式创建一个

res目录下：applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:content="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <content:component-scan base-package="com.SpringWeb"/>
</beans>
```

然后配置web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="false">

    <!--    配置全局初始化参数-->
    <context-param>
    <!--    配置文件字段-->
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>


</web-app>

```

接着运行：没有BUG了哈哈哈哈

![image-20211211011506765](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211011506765.png)

![image-20211211011453111](/images/Java/SpringFrameWork/04-Spring-Web/image-20211211011453111.png)
