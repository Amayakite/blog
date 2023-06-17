---
title: 03-0规范的学习下Servlet
date: 2021-12-04 13:19:20
category: JavaWeb
tag:
 - Java
 - JavaWeb
 - Servlet
---

日了，服了某些自己都没搞明白的人怎么敢来放网课教程（虽然是免费的），我假设你看过我的前一个文章，知道了它的基本用法

接下来系统的学习下这玩意

## Servlet的简介和基本使用

### 什么是Servlet

1. 是JavaEE的规范之一，规范就是接口
2. Servlet是Javaweb的三大组件之一，三大组件分别是Servlet程序、Filter过滤器、Listener监听器
3. Servlet是运行在服务器（Tomcat）上的一个Java小程序，他可以接收客户端发送过来的请求，并响应数据给客户端

### 自己实现一个Servlet

首先，我们要引入tomcat中的相对应Jar包，这里我假设你已经看过了我之前的Maven文章，把相关的Jar包都以依赖的形式导入到了package中，如果没有，那就去看看，把前几个文章都看一遍，模仿着敲一遍，以及上一篇文章最后的@Servlet注解也看过了一遍

 过程分为三步：

1. 编写一个类去实现Servlet接口
2. 实现`service`方法，处理请求，并响应数据
   1. service方法是专门来处理请求和响应的，是最核心的方法
3. 到web.xml中去配置Servlet的访问地址（或者在注解中直接加上访问地址）

如果说你要在web.xml中配置：

```xml
<!--Servlet标签给tomcat配置一个Servlet程序-->
<servlet>
    <!--给程序起一个别名，一般都是用类名-->
 <servlet-name>myServlet</servlet-name>
    <!--这里是全类名-->
    <servlet-class>com.amayakite.Servlet.MyServlet</servlet-class>
</servlet>

<!--给Servlet程序配置访问地址-->
<servlet-mapping>
    <!--告诉服务器：我当前配置的地址，是给哪个Servlet程序去使用-->
 <servlet-name>myServlet</servlet-name>
    <!--url-pattern 标签配置访问地址 这个地址是基于工程路径的-->
    <url-pattern>/myServlet</url-pattern>
</servlet-mapping>
```

补充：工程路径就是我们在tomcat中部署那里设置的应用程序上下文，比如我设置个03，则访问地址为<http://localhost:8080/03/myServlet，需要以/开头，当让还有更多的方法，详情看我上一个文章（在最后@Servlet>那里有说明四种）

![image-20211204133523223](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204133523223.png)

```java
@WebServlet(
        name = "myServlet",
     //等同于一个<servlet>，其中<servlet-class>自动配置为当前文件地址
        urlPatterns = {"/myServlet"} //设置路径
)
public class MyServlet implements Servlet {
    @Override
    public void init(ServletConfig config) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        System.out.println("Hello servlet");
        res.setContentType("text/html;charset=utf-8");
        res.getWriter().write("<h1>Hello Servlet</h1>");

    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}
```

访问结果：

![image-20211204132730182](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204132730182.png)

## Servlet原理

一张图概括

![image-20211204135640694](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204135640694.png)

详细的看我上一个文章，里面有写详细的内容，底层通过反射调用

## Servlet的生命周期

1. 执行Servlet构造器方法
2. 执行init()初始化方法
3. 执行service方法
4. 执行destroy销毁方法

第一、第二步是在第一次访问时创建Servlet程序时被调用

第三步是每次访问都会调用

第四步是在web工程停止的时候才会被调用

代码验证：

```java
@WebServlet(
        name = "myServlet",
        urlPatterns = {"/myServlet"}
)
public class MyServlet implements Servlet {
    public MyServlet() {
        System.out.println("MyServlet()构造器被调用了");
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
        System.out.println("MyServlet()init()方法被调用了");
    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        System.out.println("MyServlet()service()方法被调用了");
        res.setContentType("text/html;charset=utf-8");
        res.getWriter().write("<h1>Hello Servlet</h1>");

    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {
        System.out.println("MyServlet()destroy()方法被调用了");
    }
}
```

当我们访问后，出现了如下内容：

```md
MyServlet()构造器被调用了
MyServlet()init()方法被调用了
MyServlet()service()方法被调用了
---下方是重复刷新这个页面
MyServlet()service()方法被调用了
MyServlet()service()方法被调用了
MyServlet()service()方法被调用了
MyServlet()service()方法被调用了
MyServlet()service()方法被调用了
...
```

当我们尝试终止这个程序的时候：

![image-20211204140606812](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204140606812.png)

## 引出doGet和doPost

在我们学习HTML的时候，已经使用过这些东西了，现在我们来尝试写个网页来发送相应的请求

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="/03/myServlet" method="get">
    用户名<input type="text" name="name"></br>
    <input type="submit" value="提交(GET)"></br>
</form>
<hr>
<form action="/03/myServlet" method="post">
    用户名<input type="text" name="name"></br>
    密码<input type="password" name="password" id=""></br>
    <input type="submit" value="提交(POST)"></br>
</form>
</body>
</html>
```

我们现在分别输入相应的内容，然后点击两个提交

发现他们两个返回的内容都是一样的---我之前写的Hello Servlet

![image-20211204141409097](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204141409097.png)

按照我们对于前端的学习，这个时候应该清楚的认识到，这两个玩意应该返回不一样的东西

为此，我们需要更改下service中的方法

首先，我们看下`ServletRequest req, ServletResponse res`这两个的运行类型是什么--因为实际上是tomcat创建了这两个对象给我们的Servlet处理，在service中加入如下代码

（因为ServletRequest  实际上是一个接口，没有具体的实现方法，我们需要一个实现方法）

```java
//        获取req res 的运行类型
System.out.println("req.getClass() = " + req.getClass());
System.out.println("res.getClass() = " + res.getClass());
```

获取结果：

```md
req.getClass() = class org.apache.catalina.connector.RequestFacade
res.getClass() = class org.apache.catalina.connector.ResponseFacade
```

哦豁，是我们没见过的类型，转换也找不到这个类-因为是tomcat中的

那我们得换一个思路，看下这个`ServletRequest`有没有什么子类

发现有一个：

![image-20211204142629615](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204142629615.png)

那这两个类能不能互相转换呢？

于是我打开了百度，查到了这个[结果](https://blog.csdn.net/m0_38039437/article/details/75271692)

原来Tomcat中的`RequestFacade`是`HttpServletRequest`的实现类，说明该类拥有ServletRequest中的所有方法和`HttpServletRequest`中的所有方法

我们接着看看这两个接口中有没有关于获取用户请求方法的定义：

在HttpServlet中找到了这个

```java
/**
     * Returns the name of the HTTP method with which this request was made, for
     * example, GET, POST, or PUT. Same as the value of the CGI variable
     * REQUEST_METHOD.
     *
     * @return a <code>String</code> specifying the name of the method with
     *         which this request was made
     */
public String getMethod();
```

那不就简单了，强转一波并判断

```java
@Override
public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
    System.out.println("MyServlet()service()方法被调用了");
    res.setContentType("text/html;charset=utf-8");
    //        获取req res 的运行类型
    System.out.println("req.getClass() = " + req.getClass());
    System.out.println("res.getClass() = " + res.getClass());
    //        获取客户端请求的方式，并判断
    //        先做一个类型转换：ServletRequest-> HttpServletRequest（它的子类）
    HttpServletRequest request = (HttpServletRequest) req;
    //        然后获取method
    String method = request.getMethod();
    //        判断get post
    if ("GET".equals(method)) {
        res.getWriter().write("<h1>GET请求</h1>");
    }
    if ("POST".equals(method)) {
        res.getWriter().write("<h1>POST请求</h1>");
    }

    res.getWriter().write("<h1>Hello Servlet</h1>");

}
```

验证：

点击get按钮：

![image-20211204143309321](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204143309321.png)

点击post按钮

![image-20211204143320053](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204143320053.png)

但是感觉这样又不太美观，我决定自己额外写两个方法来处理这些东西：

```java
@Override
public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
    System.out.println("MyServlet()service()方法被调用了");
    res.setContentType("text/html;charset=utf-8");
    System.out.println("req.getClass() = " + req.getClass());
    System.out.println("res.getClass() = " + res.getClass());
    HttpServletRequest request = (HttpServletRequest) req;
    String method = request.getMethod();
    if ("GET".equals(method)) {
        myGet(request, (HttpServletResponse) res);
    }
    if ("POST".equals(method)) {
        myPost(request, (HttpServletResponse) res);
    }
    res.getWriter().write("<h1>Hello Servlet</h1>");

}
public void myGet(HttpServletRequest req, HttpServletResponse res) throws ,IOException {
    res.getWriter().write("<h1>GET请求</h1>");
}
public void myPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.getWriter().write("<h1>POST请求</h1>");

}
```

然后尝试运行，依旧完美！

解决后，我又想到了一个问题：既然`ServletRequest` 有子接口，那么`Servlet`有没有子接口呢？

发现有两个实现类

![image-20211204143505902](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204143505902.png)

接着，我们看看在JavaEE手册中关于Servlet接口的详解：

[官方英文手册](https://javaee.github.io/javaee-spec/javadocs/)

![image-20211204144840470](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204144840470.png)

关于这个接口，官方给出了如下定义：

​  定义所有servlet必须实现的方法。
​  servlet是在Web服务器中运行的小型Java程序。servlet接收并响应来自Web客户机的请求，通常是通过HTTP(超文本传输协议)。

​  要实现这个接口，**你可以编写一个扩展javax.servlet.GenericServlet的通用servlet，或者一个扩展javax.servlet.http.HttpServlet的HTTP servlet。**

​  该接口定义了用于初始化servlet、服务请求和从服务器中删除servlet的方法。这些被称为生命周期方法，按以下顺序调用:

1. servlet被构造，然后用init方法初始化。
2. 客户端对服务方法的任何调用都会被处理。
3. servlet从服务中取出，然后使用destroy方法销毁，然后进行垃圾收集并最终完成。

​  除了生命周期方法外，该接口还提供getServletConfig方法和getServletInfo方法，servlet可以使用该方法获取任何启动信息，getServletInfo方法允许servlet返回关于自身的基本信息，如作者、版本和版权。

也就是说，我们可以通过HttpServlet更方便的使用Servlet，接下来说说这玩意该怎么用吧

## HttpServlet的使用

1. 编写一个类去继承HttpServlet类
2. 根据业务需求重写`doGet`或者`doPost`方法
3. 到`web.xml`或者在`@Servlet`中配置相关的信息及访问地址

这个玩意的源码我们已经在之前一讲中分析过了，实际上他就是完成了一系列的封装，让我们可以更方便的使用其内容

```java
@WebServlet(
        name = "MyServlet2",
        urlPatterns = {"/MyServlet2"}
)
public class MyServlet2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

//        设置响应头 和 编码
        setContentType(resp);

        resp.getWriter().write("接受到了客户端的get请求");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        设置响应头 和 编码
        setContentType(resp);
        resp.getWriter().write("接受到了客户端的post请求");
    }

    /**
     * 封装下方法 设置响应头和编码
     *
     * @param resp HttpServletResponse
     */
    public void setContentType(HttpServletResponse resp) {
        resp.setHeader("Content-Type", "text/html;charset=UTF-8");
    }

}
```

![image-20211204150014567](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204150014567.png)

可以看到，非常的方便

### 扩展-通过IEDA快速的的创建相关的HttpServlet及配置web.xml

在项目结构（ctrl+alt+shift+s）中的facet中配置如下内容：

如果你没有设置中文：File-Project Struture-facets-Source Roots

![image-20211204150526370](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204150526370.png)

然后点击这个就能快速创建并在xml中声明

![image-20211204150622245](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204150622245.png)

然后在这两个地方填上内容即可

![image-20211204150805807](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204150805807.png)

然后你会发现自动生成了一个带注解的

如果说不把那个`创建Java EE 6+`注解类勾上的话，就会在web.xml中生成相应的Servlet标签

如果不勾选注解的话，需要自己手动创建一下Servlet-mapping标签

```java
<servlet>
    <servlet-name>ServlettestIedacreate</servlet-name>
    <servlet-class>com.amayakite.testResponse.ServlettestIedacreate</servlet-class>
</servlet>
        下面是要自己手动创建的
<servlet-mapping>
        <servlet-name>ServlettestIedacreate</servlet-name>
        <url-pattern>/ServlettestIedacreate</url-pattern>
</servlet-mapping>
```

```java
@WebServlet(name = "testIedacreate", value = "/testIedacreate")
public class testIedacreate extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
```

## HttpServlet的继承关系

一张图概括

![image-20211204152154991](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204152154991.png)

## ServletConfig类

​  在这之前额外声明：Servlet程序和ServletConfig对象都是由Tomcat服务器创建，我们负责使用

​  **Servlet程序默认是第一次访问时创建，这个Servletconfig在其创建后立刻创建，主要存放一些我们的初始化参数**

这玩意是在GenericServlet中就开始了引用的，从字面意义上来看，就知道是Servlet程序的配置信息类

他主要有三个用途：

1. 获取到Servlet程序的别名 Servlet-name的值（也就是我们在xml/注解中给Servlet中配置的name）

2. 获取初始化参数 init-param

   - 这里分别说下两种方式创建初始化参数

   - 在web.xml中创建这个web.xml时指定：

     ```xml
     <servlet>
         <servlet-name>ServlettestIedacreate</servlet-name>
         <servlet-class>ServlettestIedacreate</servlet-class>
      <init-param>
             <param-name>username</param-name>
             <param-value>root</param-value>
      </init-param>
      <init-param>
             <param-name>password</param-name>
             <param-value>123456</param-value>
      </init-param>
     </servlet>
     ```

   - 在注解中指定：

     ```java
     @WebServlet(
             name = "ServlettestIedacreate",
             urlPatterns = {"/ServlettestIedacreate"},
             initParams = {
                     @WebInitParam(name = "username", value = "root"),
                     @WebInitParam(name = "password", value = "123456"),
             }
     )
     ```

   - 两种方式最终的结果都一样

3. 获取ServletContext对象

我们再代码中重写带参数的`init(Serverconfig config)`

```java
@Override
public void init(ServletConfig config) throws ServletException {
    super.init(config);
    //        看下这个config的用途
    //        1. 获取到Servlet程序的别名 Servlet-name的值
    System.out.println("Servlet-name:" + config.getServletName());
    //        2. 获取初始化参数 init-param
    System.out.println("init-param-username:" + config.getInitParameter("username"));
    System.out.println("init-param-password:" + config.getInitParameter("password"));
    //        3.  获取ServletContext对象
    ServletContext context = config.getServletContext();

}
```

然后访问一下，看看控制台会输出什么：

获取到了如下结果，和我们的预想结果一样：

```md
Servlet-name:ServlettestIedacreate
init-param-username:root
init-param-password:123456
```

### ServletConfig的注意事项

每个Servlet对应自己的ServletConfig----**ServletConfig不在所有的Servlet之中互通**

比方说我现在有两个Servlet

```xml
<servlet>
    <servlet-name>t1</servlet-name>
    <servlet-class>t1/servlet-class>
        <init-param>
            <param-name>Jdbc</param-name>
            <param-value>Hello</param-value>
        </init-param>
</servlet>
<servlet>
        <servlet-name>t2</servlet-name>
        <servlet-class>t2</servlet-class>
        <init-param>
            <param-name>username</param-name>
            <param-value>root</param-value>
        </init-param>
</servlet>
```

我**只能在t1的ServletConfig中获取JDBC属性，t2的ServletConfig中获取username属性，他们是不能相互获取的**

比如试图在t1中获取username属性，那么会返回null（不存在）

t2中获取Jdbc属性同理

并且在重写init带有config参数的方法时，必须显示调用其`super(config)`

```java
@Override
public void init(ServletConfig config) throws ServletException {
    super.init(config);
    // ....自己的逻辑代码

}
```

不然在后续试图访问其初始化属性`init-param`：`getInitParameter(参数名称)`时会报错

一般情况下，我们都是重写空参数的init()，而非有参的init()

```java
@Override
public void init() throws ServletException {
    super.init();
    System.out.println("无参数的init方法");
}
```

为啥呢？看下源码：非常清晰的说明了若有自己的逻辑写在这里就行了，init(config)会自动调用这个无参的init

```java
/**
     * A convenience method which can be overridden so that there's no need to
     * call <code>super.init(config)</code>.
     * <p>
     * Instead of overriding {@link #init(ServletConfig)}, simply override this
     * method and it will be called by
     * <code>GenericServlet.init(ServletConfig config)</code>. The
     * <code>ServletConfig</code> object can still be retrieved via
     * {@link #getServletConfig}.
     *
     * @exception ServletException
     *                if an exception occurs that interrupts the servlet's
     *                normal operation
     */
public void init() throws ServletException {
    // NOOP by default
}
```

ServletConfig还可以在doget、dopost中随意调用：`this.getServletConfig()`

```java
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println(this.getServletConfig().getServletName());
    }
```

## ServletContext(上下文)

在刚刚的ServletConfig中，ServletContext我们只是提了一嘴，并没有具体的使用他，接下来具体的介绍一下他，这玩意蛮有用的（用处比ServletConfig多多了）

1. 这是一个接口，具体的功能由tomcat实现，它表示Servlet上下文
2. 一个web工程（无论有多少个Servlet），只有一个ServletContext实例
3. ServletContext对象是一个域对象
4. 它在Web工程启动的时候创建，在Web工程停止的时候销毁

### 域对象

域对象的定义是：

1. 可以像Map一样存取数据的对象
2. 这里的域指的是操作范围

|        |      存数据      |      取数据      |      删除数据       |
| :----: | :--------------: | :--------------: | :-----------------: |
|  Map   |     `put()`      |     `get()`      |     `remove()`      |
| 域对象 | `setAttribute()` | `getAttribute()` | `removeAttribute()` |

### ServletContext类的四个作用

1. 获取web.xml中配置的上下文参数
   1. 如果值不存在，则返回null
2. 获取当前的工程路径
   1. 格式：`/工程路径`
3. 获取工程部署后在服务器硬盘上的绝对路径
4. 像Map一样存储数据

### Servlet常用方法一：读取上下文，工程路径，绝对路径

 我们先在`web.xml`填加如下内容：当然和`init-param`一样，它也可以添加多个

```java
<!--context-param是一个上下文参数，他属于整个web工程-->
    <context-param>
        <param-name>user</param-name>
        <param-value>root</param-value>
    </context-param>
```

然后读取：

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //        两种获取方式
    //        1.直接获取ServletContext对象
    ServletContext context = this.getServletContext();
    //        2.通过ServletConfig对象获取ServletContext对象
    ServletConfig config = this.getServletConfig();
    //        设置编码等
    response.setHeader("Content-Type", "text/plain;charset=utf-8");

    //        发送给客户端 context.getInitParameter(参数名)
    response.getWriter().println("初始化参数user的值:" + context.getInitParameter("user"));

    //        获取当前工程路径，并发送给客户端 context.getContextPath()
    response.getWriter().println("当前的路径是:" + context.getContextPath());

    //        获取工程部署后在服务器上的绝对路径 并发送给客户端 context.getRealPath("/")
    response.getWriter().println("工程部署的路径是:" + context.getRealPath("/"));
    response.getWriter().println("工程部署后index.jsp的路径是:" + context.getRealPath("/index.jsp"));
}
```

结果：

![image-20211204162409182](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204162409182.png)

可能你会有疑惑：这个工程部署路径有啥用呢？

​  emm这样说吧，比如说你要发送个文件(图片、视频等二进制文件)给客户端，就要通过它来将一个相对路径转换为一个绝对路径，来让FileInput流读取

​  我们的惯例应该是：除了一些隐私级别的文件，静态文件（html css 资源文件）同意放置在webapp目录下：

![image-20211204162732455](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204162732455.png)

用户访问这些也很简单，比如说一个01.jpg，访问地址则为`localhost:8080/工程路径/static/images/Java/01.jpg`

结果：

![image-20211204162850284](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204162850284.png)

java中获取这个图片的绝对路径的方式：

```java
response.getWriter().println("static/images/Java/01.jpg的绝对路径是:" + context.getRealPath("/static/images/Java/01.jpg"));
```

结果：

![image-20211204163134313](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204163134313.png)

### Servlet常用方法二：让Servlet通信

ps：若视图读取不存在的数据，会返回null=

context1存放了数据 key 是一个string value是一个Object

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    ServletContext servletContext = getServletContext();
    //        setAttribute(key , value )存放数据
    servletContext.setAttribute("name", "Amaya");
    servletContext.setAttribute("age", "18");
    servletContext.setAttribute("password", "123456");
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.getWriter().write("<h1>存放数据完毕</h1>");
}
```

context2读取数据(PS:读取数据的时候有个方法:getAttributeNames()可以获取当前所有上下文数据的名字，但是那里面会包含一些其他的内容，这里就不演示了，真正要用的话或许可以通过加个判定名字的长度来限制性输出)

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //        获取所有context中的上下文数据
    ServletContext servletContext = getServletContext();
    }
    //        读取name的值发送
    response.getWriter().write("修改和删除完数据后读取name的值：<br>");

    //        修改name=张三
    servletContext.setAttribute("name", "张三");
    //        删除age的值
    servletContext.removeAttribute("age");
    //        读取name的值发送
    response.getWriter().write("修改和删除完数据后读取name的值：<br>");
    response.getWriter().write(servletContext.getAttribute("name") + "<br>");
    //        读取age的值发送：
 response.getWriter().write(servletContext.getAttribute("age") + "<br>");
    }
}
```

### Servlet常用方法三：读取prperties等配置文件

先说方法：`getResourceAsStream("/WEB-INF/classes/路径/文件名或文件名");`可以读取`resources`目录下的配置文件

如果要读取java文件夹中的文件（比如包名为：`com.abc.AAA.testA`）:

则：`getResourceAsStream("/WEB-INF/classes/com/abc/aaa/testA.class")`

还记得我们在老早之前创建的那个resources文件夹吗，资源文件就是放在那里的，我们先新建一个`db.properties`到该文件夹下：

![image-20211203155322875](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211203155322875-16386087059881.png)

然后填写一些内容：(在这一步你可以先装个mysql-java，名称：mysql-connector-java)

```properties
username=root
password=123456
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/db1?useUnicode=true&characterEncoding=utf8
```

然后我们点击运行，查看下打包后的路径，这里有可能会出现一个问题，你在相同的路径下找不到那个文件

点击运行，等待运行完毕后，点开当前项目的target文件夹，可以看到我们刚刚写的db文件现在在**classes**目录下存放，我们在java文件夹内写的文件同理

这个classess路径也被称之为**classpath（类路径）**

![image-20211203155802117](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211203155802117-16386087059892.png)

可能会遇到的导出问题：

​  没有遇到这个问题就不要改`pom.xml`!

​  没有遇到这个问题就不要改`pom.xml`!

​  没有遇到这个问题就不要改`pom.xml`!

​  如果说你在这一部没有看到这个db.properties文件，那么百分之八十是maven的配置有问题（貌似新版不按照下面这样配置也不会出现这样的问题），在当前`module`的maven配置文件`pom.xml`中加上如下内容再重新打包即可（如果pom.xml中已经有`<build></build>`了，就在build中加入这两个resources，如果没有，就直接整个copy过去），即可解决该问题

```xml
<!--在build中配置resources 来防止我们资源导出失败的问题-->
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <excludes>
                <exclude>**/*.properties</exclude>
                <exclude>**/*.xml</exclude>
            </excludes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <!--                让src下的main下的java目录中可以导出xml。properties文件-->
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

然后读取即可：

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    InputStream resourceAsStream = getServletContext().getResourceAsStream("/WEB-INF/classes/db.properties");
    Properties properties = new Properties();
    properties.load(new InputStreamReader(resourceAsStream, StandardCharsets.UTF_8));
    String username = properties.getProperty("username");
    String password = properties.getProperty("password");
    String url = properties.getProperty("url");
    String driver = properties.getProperty("driver");
    resourceAsStream.close();
    resp.setContentType("text/html;charset=utf-8");
    resp.getWriter().write("<h1>数据库连接信息</h1>");
    resp.getWriter().write("<p>用户名：" + username + "</p>");
    resp.getWriter().write("<p>密码：" + password + "</p>");
    resp.getWriter().write("<p>url：" + url + "</p>");
    resp.getWriter().write("<p>driver：" + driver + "</p>");

}
```

## HTTP回顾

### 请求的HTTP协议格式

客户端给服务端发送数据叫请求

服务端给客户端发数据叫相应

常见的请求为get和post

#### get请求

1. 请求行
   1. 请求的方式：get
   2. 请求的资源路径[+?+参数]
   3. 请求的协议版本号： HTTP/1.1
2. 请求头
   1. 由key-value键值对组成，不同的键值对代表不同的含义

![image-20211204171938943](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204171938943.png)

#### post请求

1. 请求行

   1. 请求的方式：post

   1. 请求的资源路径[+?+参数]

   1. 请求的协议版本号： HTTP/1.1

2. 请求头

   1. 由key-value键值对组成，不同的键值对代表不同的含义

3. **一个空行，隔开请求头和请求体**

4. 请求体 就是发送给服务器的数据

![image-20211204172617660](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204172617660.png)

### 常用请求头说明

```md
Accept: 表示客户端可以接收的数据类型
Accept-Languege: 表示客户端可以接收的语言类型
User-Agent: 表示客户端浏览器的信息
Host: 表示客户端请求的服务器的IP和端口号
```

### Get请求和Post请求的区分

#### 什么算是get请求

1. from标签 method= get
2. a标签
3. link标签引入css
4. script标签引入js文件
5. img标签引入图片
6. iframe引入html页面
7. 在浏览器地址栏输入地址后敲回车
8. ajax的get请求
9. 其他软件封装的相关请求

#### 什么算是post请求

1. from标签 method= get
2. ajax或者其他软件编写的post请求

### 响应的HTTP格式

1. 响应行
   1. 响应的协议和端口号
   2. 响应的状态码
   3. 响应状态码的描述
2. 响应头
   1. key-value键值对
3. **一个空行，分割响应头和响应体**
4. 响应体

![image-20211204173630417](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204173630417.png)

### 常见的响应状态吗

- 200/204 表示请求成功
- 302 表示重定向
- 404 资源不存在（服务器没问题）
- 500/503 服务器内部错误

### MIME类型说明(Context-Type)

Mime是HTTP协议的中的数据类型

MIME的英文全称是：`Multipurpose Internet Mail Extensions` 多功能Internet邮件扩充服务，MIME的格式是：

`大类型/小类型`，并与某一种文件名的扩展名对应

|        文件        |              MIME类型              |
| :----------------: | :--------------------------------: |
| 超文本标记语言文本 |             text/html              |
|      普通文本      |             text/plain             |
|      RTF文本       |          application/rtf           |
|        图片        |             image/gif              |
|      声音文件      |            audio/basic             |
|    MIDI音乐文件    |      audio/midi，audio/x-midi      |
|    MPEG视频文件    |             video/mepg             |
|    AVI视频文件     |          video/x-msvideo           |
|      GZIP文件      | application/x-gzip gzip就是.gz文件 |
|      TAR文件       |         application/x-tar          |

当然，更具体的可以看[这个链接](https://www.w3school.com.cn/media/media_mimeref.asp)或者[这个链接](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

## HttpServletRequest类

### 基本介绍

每次只要有请求进入tomcat服务器，tomcat服务器就会把请求过来的HTTP协议解析好封装到Request对象中，然后传递到service()方法中，我们的HttpServlet中的service方法接收到这个后会传递到doGet()或者doPost()中，我们可以通过HttpServletRequest对象获取到所有请求的信息

### 常用方法

| 方法名                                | 说明                                                                 |
| ------------------------------------- | -------------------------------------------------------------------- |
| getRequestURI()                       | 获取请求的资源路径                                                   |
| getRequestURL()                       | 获取请求的统一资源定位符（绝对路径）<br />注意，这里是L，上面那个是I |
| getRemoteHost()                       | 获取客户端的IP地址                                                   |
| getHeader()                           | 获取请求头                                                           |
| getParameter(name)                    | 获取请求的参数                                                       |
| getParameterValues(name)              | 获取请求的参数(有同名时使用)                                         |
| getMethod()                           | 获取请求的方法                                                       |
| setAttribute(key,value)               | 设置域数据                                                           |
| getAttribute(key)                     | 获取域数据                                                           |
| getRequestDispatcher()                | 获取请求转发对象                                                     |
| setCharacterEncoding(String encoding) | 设置请求体字符集                                                     |

注意，**这个域数据的作用域并不是全局的**，仅限于当前请求及当前请求转发的对象，这个等下请求转发的时候会用到

无论是get还是post，接收数据前最好设置下setCharacterEncoding，尤其是Post(不设置的话中文一定会乱码)，防止中文乱码的问题

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    //| getRequestURI()          | 获取请求的资源路径 
    response.getWriter().write("请求的资源路径：" + request.getRequestURI() + "<br>");
    //| getRequestURL()          | 获取请求的统一资源定位符（绝对路径）<br />注意，这里是L，上面那个是I |
    response.getWriter().write("请求的统一资源定位符（绝对路径）：" + request.getRequestURL() + "<br>");
    //| getRemoteHost()          | 获取客户端的IP地址   
    response.getWriter().write("客户端的IP地址：" + request.getRemoteHost() + "<br>");
    //| getHeader()              | 获取请求头 
    response.getWriter().write("请求头：" + request.getHeader("User-Agent") + "<br>");
    //| getParameter(name)       | 获取请求的参数 
    response.getWriter().write("请求的参数：" + request.getParameter("name") + "<br>");
    //| getParameterValues(name) | 获取请求的参数(有同名时使用)  
    response.getWriter().write("请求的参数：" + Arrays.toString(request.getParameterValues("name")) + "<br>");
    //| getMethod()              | 获取请求的方法 
    response.getWriter().write("请求的方法：" + request.getMethod() + "<br>");

}
```

![image-20211204185818491](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204185818491.png)

### 请求转发

原理：

![image-20211204192808207](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204192808207.png)

代码部分：

ServletDispatcher1：

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //        获取请求的参数
    String username = request.getParameter("username");
    System.out.println("在Servlet1中查看该参数：" + username);
    if (username != null) {
        //            给材料改一个章，并传递到Servlet2中
        request.setAttribute("key", request.getRemoteAddr());

        //            问路：Servlet2怎么走：
        RequestDispatcher requestDispatcher = request.getRequestDispatcher("/ServletDispatcher2");
        //            进行请求转发
        requestDispatcher.forward(request, response);

    }
}
```

ServletDispatcher2：

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String remoteUser = request.getRemoteAddr();
    //        接收并验证数据 注意 这里的getAttribute并不是Context的，而是request的，作用域为：单个request连接对象
    if (remoteUser.equals((String) request.getAttribute("key"))) {
        response.getWriter().println("Hello, this is ServletDispatcher2. You are" + remoteUser);
    }
}
```

访问：并携带参数

![image-20211204191647686](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204191647686.png)

### 解决Post请求中中文参数乱码的问题

```java
@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    //        执行其他操作
}
```

### 扩展-HTML-Base标签的作用及解决请求转发的问题

我们先在webapp目录下新建如下文件：

![image-20211204193232189](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204193232189.png)

god.html中有个a标签，`herf="a/b/c/d.html"`

d.html中有一句话：`<h1>这是a下的b下的c下的d.html</h1>`

注意：这里的a标签中的`a/b/c/d.html`前面是没有`/`的（相对路径）

若有`/`会跳转到`localhost:8080/a/b/c/d.html`（绝对路径）

同时可以在d.html中添加a标签返回到`god.html`:`<a href="../../../god.html" class="herf"></a>`

然后测试下，发现他们可以进行互相之间的跳转

但是我们如果再添加一个请求转发的地址：

```java
@WebServlet(name = "ServletForward", value = "/ServletForward")
public class ServletForward extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 获取转发的目标地址
        RequestDispatcher requestDispatcher = request.getRequestDispatcher("/a/b/c/d.html");
        requestDispatcher.forward(request, response);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
```

并让god.html添加一个请求转发到d.html的标签：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<a href="a/b/c/d.html">点我跳转到d.html</a>
<a href="ServletForward">请求转发跳转</a>
</body>
</html>
```

你就会发现跳转过去没问题，但是从d.html中跳转回a却出了问题：

![image-20211204194727947](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204194727947.png)

分析：

![image-20211204194958004](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204194958004.png)

base是一个html标签，所以我们只需要：

 ```html
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>Title</title>
     <!--    base相当于声明了自身的绝对路径-->
     <base href="http://127.0.0.1:8080/03/god.html">
 </head>
 <body>
 <a href="a/b/c/d.html">点我跳转到d.html</a>
 <a href="ServletForward">请求转发跳转</a>
 </body>
 </html>
 ```

d.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <base href="http://127.0.0.1:8080/03/a/b/c/d.html">
</head>
<body>
<div>
    <h1>这是a下的b下的c下的d.html</h1>
    <a href="../../../god.html" class="herf">返回god.html</a>
</div>
</body>
</html>
```

就可以解决该问题

但是这样的话。。。我们的这个127.0.0.1:8080就写死了，所以在之后的jsp学习中，会有更好的替代品出现

## HttpServletResponse

​  跟Request一样，都是浏览器清流服务器时，Tomcat生成的对象，Request用于获取用户发送的数据，Response用户响应用户

特别基础的东西

## Response的两个输出流

- `getWriter` 字符输出流 用于响应文本数据
- `getOutoutStream` 字节数出流 用于响应文件
  - 响应字节数的时候得提前设置好Context-Type
  - 比如image/jpg、image/png 等
  - 具体的可以查看[MIME参考手册](https://www.w3school.com.cn/media/media_mimeref.asp)

注意 这两个流**不能混用**，即：**用了字符流就不能用字节流，反之亦然，否则会报错**

### 设置流的编码，返回格式

```java
@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //iso-8859-1 默认是这个编码 这种编码不支持特殊符号和中文
    String characterEncoding = response.getCharacterEncoding();
    System.out.println(characterEncoding);
    response.setCharacterEncoding("utf-8");
    //        设置 相应类型
    response.setContentType("text/html");
    //        上面的那两句一块的简写：
    response.setContentType("text/html;charset=utf-8");
    //        再度简写
    response.setHeader("Content-Type", "text/html;charset=utf-8");
}
```

### 请求重定向

原理(提一嘴，千万别手残打成304 304是永久重定向， 除非用户Ctrl+shift+R刷新页面，不然之后一直都是直接跳转到response2程序)

![image-20211204221219141](/images/Java/JavaEE/3-0规范的学习Servlet/image-20211204221219141.png)

方法1  分别设置Status和Header中的Location

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    System.out.println("曾到此一游");
    //        设置响应状态码 302 表示重定向（已迁移）
    response.setStatus(302);
    //        设置响应头中的Location，为迁移后的地址：
    //        response.setHeader("Location", "http://www.baidu.com");
    //        重定向可以给定绝对路径来设置成服务器的一些地址，比如index.jsp ，这样就可以让客户端访问到本项目的index.jsp 访问本项目的其他内容同理
    response.setHeader("Location", getServletContext().getContextPath() + "/index.jsp");
}
```

方法2 推荐使用这种：

```java
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    System.out.println("曾到此一游");
    response.sendRedirect(getServletContext().getContextPath() + "/index.jsp");
}
```

这句话相当于封装了`response.setStatus(302);`和`response.setHeader("Location", url);`
