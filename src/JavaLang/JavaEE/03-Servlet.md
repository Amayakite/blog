---
title: 03-Servle
date: 2021-12-02 17:26:20
category: JavaWeb
tag:
 - Java
 - JavaWeb
---

## Servlet简介

- Servlet是Sun公司开发动态web的一门技术
- Sun在这些API中提供了一个接口，接口名为：`Servlet`

也就是说，这玩意是一个接口，所以我们实际使用过程中可以知道

- 可以自己实现这个接口
  - 编写一个类，实现Servlet接口
  - 把编写好的Java类部署到服务器中
- **所用的现成的API都是实现了这个接口**

有点绕的一句话：`实现了Servlet接口的Java程序，叫做Servlet`

为了测试这个点，我们创建一个空的Maven项目来测试下，并删掉里面src及其目录下的所有东西

### 开始学习前的准备工作

![image-20211202192644896](/images/Java/JavaEE/03-Servlet/image-20211202192644896.png)

这里起我们学习就在这个Project内了，有了maven的管理，写程序来还是挺简单的

然后我们要分别去添加两个依赖：`servlet`和`jsp`的，这里我们选择和Tomcat版本兼容的（还是用Tomcat家的）

<https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api>

<https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-jsp-api>

当然，我这里先不用，用现在最多人用的，留个坑

下面这里是我找到的最多人用的两个jar包依赖，添加到pom.xml中

```xml
<!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
</dependency>
<!-- https://mvnrepository.com/artifact/javax.servlet.jsp/javax.servlet.jsp-api -->
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>javax.servlet.jsp-api</artifactId>
    <version>2.3.3</version>
    <scope>provided</scope>
</dependency>

```

从这里开始，我们将模块化编程-每个章节都是一个模块，减少Project的创建数量

![image-20211202193140078](/images/Java/JavaEE/03-Servlet/image-20211202193140078.png)

然后新建一个Maven JavaWeb APP模块，名字随意，Maven版本按照自己的来

![image-20211202193505154](/images/Java/JavaEE/03-Servlet/image-20211202193505154.png)

然后得到了这些东西

![image-20211202193610872](/images/Java/JavaEE/03-Servlet/image-20211202193610872.png)

### 扩展-Maven父子工程的理解

刚刚创建完那个模块后，在Maven管理页面看到多出了这些内容，他们之间pom,xml呈以下关系

- 父模块（工程）的Jar包（依赖）子模块可以随意使用
- 子模块的Jar包父模块无法调用

![image-20211202193657420](/images/Java/JavaEE/03-Servlet/image-20211202193657420.png)

好了，言归正传，继续我们的操作

继续新建几个软件包java和res：遵循约定大于配置

![image-20211202194512307](/images/Java/JavaEE/03-Servlet/image-20211202194512307.png)

然后修改`WEB-INF`中的`web.xml`

再配置下HelloWorld之类的，根据我之前那个章节的方式来做，Router设置为/hello

然后配置Tomcat启动试试

不出意外的出意外了

![image-20211202195331544](/images/Java/JavaEE/03-Servlet/image-20211202195331544.png)

这就是之前挖的坑，接下来用回适合我们tomcat版本的Servlet和jsp吧

我这里用的是10.0.13版本的tomcat，所以用的版本也是这样

```xml
    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api -->
        <dependency>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-servlet-api</artifactId>
            <version>10.0.13</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-jsp-api -->
        <dependency>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-jsp-api</artifactId>
            <version>10.0.13</version>
        </dependency>
    </dependencies>
```

配置这一步的时候，把之前的那两个包删了（直接在xml文件中删除即可）

然后再更新下MyApps.java中的依赖，重启下服务，完美解决

![image-20211202195743249](/images/Java/JavaEE/03-Servlet/image-20211202195743249.png)

好了，准备工作结束，接下来分析以下我们使用的`HttpServlet`的结构

## HttpServlet源码分析

![image-20211202211103009](/images/Java/JavaEE/03-Servlet/image-20211202211103009.png)

首先看类图，这个类是直接继承GenericServlet类

GenericServlet实现了三个接口：

- Serialzable 序列化
- Servlet接口
- ServletConfig接口

接下来我们看下Servlet接口都有哪些内容：

```java

package jakarta.servlet;

import java.io.IOException;


public interface Servlet {
    // 初始化（创建）一个Servlet
    public void init(ServletConfig config) throws ServletException;
 // 获取配置信息
    public ServletConfig getServletConfig();

 // 对于请求的处理
    public void service(ServletRequest req, ServletResponse res)
            throws ServletException, IOException;

    //获取这个servlet的信息
    public String getServletInfo();

 //销毁一个Servlet
    public void destroy();
}

```

然后再看下ServletConfig的信息

```java
public interface ServletConfig {

 //返回Servlet的名称
    public String getServletName();

 //返回调用者在其中执行的ServletContext的引用
    public ServletContext getServletContext();

 //返回一个包含初始化参数值的字符串，可能会返回null
    public String getInitParameter(String name);

 //返回Servlet初始化参数的名称作为String对象的Enumeration
    //Enumeration:一个接口，接口中定义了一些方法，通过这些方法可以枚举（一次获得一个）对象集合中的元素。
    public Enumeration<String> getInitParameterNames();
}

```

然后看看GenericServlet这个实现类中都有哪些东西

```java

package jakarta.servlet;

import java.io.IOException;
import java.util.Enumeration;


public abstract class GenericServlet implements Servlet, ServletConfig,
        java.io.Serializable {
 //序列化标识符
    private static final long serialVersionUID = 1L;

    //一个未初始化的ServletConfig对象
    private transient ServletConfig config;

 //这个构造函数什么也不做，交给init()方法来完成
    public GenericServlet() {
        // NOOP
    }

 //这里我目前还没太看明白
    @Override
    public void destroy() {
        // NOOP by default
    }

 //获取一些初始化的参数
    @Override
    public String getInitParameter(String name) {
        return getServletConfig().getInitParameter(name);
    }
 
 //同上 获取初始化的名字
    @Override
    public Enumeration<String> getInitParameterNames() {
        return getServletConfig().getInitParameterNames();
    }

 //获取config配置
    @Override
    public ServletConfig getServletConfig() {
        return config;
    }

 //下面都是一些获取相关信息的玩意
    @Override
    public ServletContext getServletContext() {
        return getServletConfig().getServletContext();
    }


    @Override
    public String getServletInfo() {
        return "";
    }

 // 初始化 可以看到这里对config进行了一个赋值
    @Override
    public void init(ServletConfig config) throws ServletException {
        this.config = config;
        this.init();
    }


    public void init() throws ServletException {
        // NOOP by default
    }

 
    public void log(String message) {
        getServletContext().log(getServletName() + ": " + message);
    }


    public void log(String message, Throwable t) {
        getServletContext().log(getServletName() + ": " + message, t);
    }

 //可以看到这里依旧对service并没有做任何的处理 直接继承过来了.. 
    @Override
    public abstract void service(ServletRequest req, ServletResponse res)
            throws ServletException, IOException;

 
    @Override
    public String getServletName() {
        return config.getServletName();
    }
}

```

可以非常清晰的了解到，这家伙实际上也没有做什么，看来主要的实现还是`HttpServlet`

接下来看看那家伙的源码吧

```java
......
public abstract class HttpServlet extends GenericServlet {
 //这里定义的都是一些常量
    private static final long serialVersionUID = 1L;

    private static final String METHOD_DELETE = "DELETE";
    private static final String METHOD_HEAD = "HEAD";
    private static final String METHOD_GET = "GET";
    private static final String METHOD_OPTIONS = "OPTIONS";
    private static final String METHOD_POST = "POST";
    private static final String METHOD_PUT = "PUT";
    private static final String METHOD_TRACE = "TRACE";

    private static final String HEADER_IFMODSINCE = "If-Modified-Since";
    private static final String HEADER_LASTMOD = "Last-Modified";

    private static final String LSTRING_FILE = "jakarta.servlet.http.LocalStrings";
    private static final ResourceBundle lStrings = ResourceBundle.getBundle(LSTRING_FILE);
 
    //这个transient的Object...应该是拿来锁线程用的
    private final transient Object cachedAllowHeaderValueLock = new Object();

    private volatile String cachedAllowHeaderValue = null;


    public HttpServlet() {
        // NOOP
    }

 //get方法
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException
    {
        //可以看到这里是直接整了个返回http.method_get_not_supported
        String msg = lStrings.getString("http.method_get_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }



    protected long getLastModified(HttpServletRequest req) {
        return -1;
    }

    //head请求的处理
    protected void doHead(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        if (DispatcherType.INCLUDE.equals(req.getDispatcherType())) {
            doGet(req, resp);
        } else {
            NoBodyResponse response = new NoBodyResponse(resp);
            doGet(req, response);
            if (req.isAsyncStarted()) {
                req.getAsyncContext().addListener(new NoBodyAsyncContextListener(response));
            } else {
                response.setContentLength();
            }
        }
    }


    //post请求的处理
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        String msg = lStrings.getString("http.method_post_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }


    //put请求的处理
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        String msg = lStrings.getString("http.method_put_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }


   //delete请求的处理
    protected void doDelete(HttpServletRequest req,
                            HttpServletResponse resp)
        throws ServletException, IOException {

        String msg = lStrings.getString("http.method_delete_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }

    //中间略过一段我不知道是干嘛用的东西
 //可以看到，这里正式重写了service，对所有请求进行处理
    protected void service(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        String method = req.getMethod();

        if (method.equals(METHOD_GET)) {
            long lastModified = getLastModified(req);
            if (lastModified == -1) {
                // servlet doesn't support if-modified-since, no reason
                // to go through further expensive logic
                doGet(req, resp);
            } else {
                long ifModifiedSince;
                try {
                    ifModifiedSince = req.getDateHeader(HEADER_IFMODSINCE);
                } catch (IllegalArgumentException iae) {
                    // Invalid date header - proceed as if none was set
                    ifModifiedSince = -1;
                }
                if (ifModifiedSince < (lastModified / 1000 * 1000)) {
                    // If the servlet mod time is later, call doGet()
                    // Round down to the nearest second for a proper compare
                    // A ifModifiedSince of -1 will always be less
                    maybeSetLastModified(resp, lastModified);
                    doGet(req, resp);
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
                }
            }

        } else if (method.equals(METHOD_HEAD)) {
            long lastModified = getLastModified(req);
            maybeSetLastModified(resp, lastModified);
            doHead(req, resp);

        } else if (method.equals(METHOD_POST)) {
            doPost(req, resp);

        } else if (method.equals(METHOD_PUT)) {
            doPut(req, resp);

        } else if (method.equals(METHOD_DELETE)) {
            doDelete(req, resp);

        } else if (method.equals(METHOD_OPTIONS)) {
            doOptions(req,resp);

        } else if (method.equals(METHOD_TRACE)) {
            doTrace(req,resp);

        } else {
            //
            // Note that this means NO servlet supports whatever
            // method was requested, anywhere on this server.
            //

            String errMsg = lStrings.getString("http.method_not_implemented");
            Object[] errArgs = new Object[1];
            errArgs[0] = method;
            errMsg = MessageFormat.format(errMsg, errArgs);

            resp.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, errMsg);
        }
    }

其他代码这里就不继续看了，现在的情况大概为：
    这里的doget和dopost之类的方法都是返回一份错误数据（应该是直接返回给客户端404）
    所以，我们要重写这些方法，让客户端在请求这些东西的时候，返回的不是404，而是我们想要给客户端的内容


```

接下来我们尝试下自定义的重写一些内容：

```java
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage PACKAGE_NAME
 * @date 2021/12/2 19:48
 * @description 项目描述
 */
public class MyApp extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
//        request 用户的请求 学过nodejs。一下就明白了该怎么用...
        System.out.println(request.getHeader("User-Agent"));
        BufferedReader reader = request.getReader();
        StringBuilder sb = new StringBuilder();
        String line = null;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        System.out.println(sb);
        reader.close();
//        response 我们相应用户的数据
        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        out.println("<h1>世界你好</h1>");
        out.close();

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}

```

![image-20211202222857926](/images/Java/JavaEE/03-Servlet/image-20211202222857926.png)

完美！

### 配置Servlet的映射(Router)

​  这是一个非常简单的道理，刚刚我们是处理了Servlet的请求和响应，接下来要正式在Java应用程序去处理它，也就是配置我们的web.xml文件

​  就好比我写了一个NodeJS的后端接口，但是没有给他配置他属于哪个路由，那不就废了吗~

​  Java同理，一个Java程序，我们需要通过浏览器访问，而浏览器需要连接WEb服务器，所以我们需要在Web服务中注册我们写的Servlet，还需要给他一个能够访问的路径

​  这就跟注册Router是一个道理，就是流程稍微变了一点

在web.xml中，我们之前编写了这些内容

servlet：就相当于一个路由所对应的Java程序

servlet-mapping：就相当于`一个路由`：访问到哪个页面-需要交给哪些Java程序来处理

```xml
<!--    注册一个Servlet 这个就相当于注册一个路由一样-->
<servlet>
    <!--        这里是这个路由的名字-->
    <servlet-name>MyApps</servlet-name>
    <!--        这里是这个路由的实际文件位置(class文件)-->
    <servlet-class>MyApp</servlet-class>
</servlet>

<!--    然后将这个路由绑定到指定的路由地址中  就相当于这里创建了一个真正的Router 然后绑定一个的route-->
<servlet-mapping>
    <!--        这里是绑定的路由-->
    <servlet-name>MyApps</servlet-name>
    <!--  这个是请求路径-->
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
```

如果你学过NodeJs，这里就非常明白了，大概就是一个没封装的Koa请求：

```js
//演示KOA的get请求
MyApps.get('/hello',async (ctx)=>{
    ctx.response.body="世界你好"
})
//演示Express请求 大概是这样吧，好久没用过express了
MyApps.get("/hello",(req,res)=>{
    res.body="世界你好"
})
```

## Servlet访问流程详解（未涉及tomcat底层）

虽然 但是 我就是想刨根问底

目前来说，我们的浏览器是访问了`localhost:8080/Servlet_01_war/hello`

我们返回了一个世界你好，这之中到底经历了什么？

就目前按照我找到的资料来说，访问经历了四个步骤

![image-20211202232840370](/images/Java/JavaEE/03-Servlet/image-20211202232840370.png)

- 浏览器：
  - 第一步：浏览器输入访问路径后，携带了请求行，头，体

- 服务器：
  - 第二步：根据访问路径找到已注册的servlet名称，既图中的`MyApps`
  - 第三步：根据映射找到对应的servlet名`MyApps`
  - 第四步：根据根据servlet名找到我们全限定类名，既我们自己写的类`MyApp`

​  服务器：**我们所用的服务器是Tomcat**，所以下文中的服务器实际上指的是tomcat

​  也就是说，浏览器就是发起了一次请求，剩余的步骤都是服务器来完成的（这也是基本常识了）

​  那么，服务器找到该类名后，又做了什么呢？

​  它会通过**反射**创建这个对象，同时创建一个`ServletConfig`，里面存放了一些初始化信息（服务器只会创建一次Servlet对象，所以ServletConfig也只有一个）

​  当对象创建好了之后，`tomcat`会执行`init`方法，此时我们知道，我们自己没有重写过init方法，同时HttpServlet也没有重写init方法，根据动态绑定，会调用GenericServlet的init方法：

```java
@Override
public void init(ServletConfig config) throws ServletException {
    this.config = config;
    
    //这个是无参构造方法
    this.init();
}
```

​  由于前面提到了，在反射创建我们的Servlet对象时，创建了一个Servlet对象，所以此时传入的ServletConfig为之前创建的（这一切都是由tomcat来完成的，之后有空了得了解下tomcat的源码）

​  这里额外说下，那个无参无返回值的`init()`方法，实际上是这玩意的开发者给我们留的后路，当我们想在服务器创建时额外做点什么，只需要在我们的代码中重写下这个无参或者有参的构造方法即可，例如：

```java
@Override
public void init(ServletConfig config) throws ServletException {
    System.out.println("服务器启动了");
    super.init(config);
}

@Override
public void init() throws ServletException {
    System.out.println("阿啊啊，服务器无参构造方法被调用了");
}
```

最终他们的执行顺序（动态绑定机制）

![image-20211202234232512](/images/Java/JavaEE/03-Servlet/image-20211202234232512.png)

这里的流程大概就是

![image-20211202234647857](/images/Java/JavaEE/03-Servlet/image-20211202234647857.png)

​  紧接着，我们就该很清晰的知道服务器下一步该调用哪个代码了：

​  那当让是Service方法！

先再来看看Service方法 草看到的第一眼就非常清晰了

```java
protected void service(HttpServletRequest req, HttpServletResponse resp)throws ServletException, IOException {
    //这一步是获取到请求的Method是那种类型的
    String method = req.getMethod();
    // 如果是get方法，则执行对应的操作
    if (method.equals(METHOD_GET)) {
        //lastModified 是一种保护机制，具体的有空了进一步分析
        long lastModified = getLastModified(req);
        if (lastModified == -1) {
            //执行get
            doGet(req, resp);
        } else {
            long ifModifiedSince;
            try {
                ifModifiedSince = req.getDateHeader(HEADER_IFMODSINCE);
            } catch (IllegalArgumentException iae) {
                // Invalid date header - proceed as if none was set
                ifModifiedSince = -1;
            }
            if (ifModifiedSince < (lastModified / 1000 * 1000)) {
                // If the servlet mod time is later, call doGet()
                // Round down to the nearest second for a proper compare
                // A ifModifiedSince of -1 will always be less
                maybeSetLastModified(resp, lastModified);
                doGet(req, resp);
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
            }
        }
 //执行其他相对应的方法
    } else if (method.equals(METHOD_HEAD)) {
        long lastModified = getLastModified(req);
        maybeSetLastModified(resp, lastModified);
        doHead(req, resp);

    } else if (method.equals(METHOD_POST)) {
        doPost(req, resp);

    } else if (method.equals(METHOD_PUT)) {
        doPut(req, resp);

    } else if (method.equals(METHOD_DELETE)) {
        doDelete(req, resp);

    } else if (method.equals(METHOD_OPTIONS)) {
        doOptions(req,resp);

    } else if (method.equals(METHOD_TRACE)) {
        doTrace(req,resp);

    } else {
  //如果说都不是的话，抛出异常给客户端
        String errMsg = lStrings.getString("http.method_not_implemented");
        Object[] errArgs = new Object[1];
        errArgs[0] = method;
        errMsg = MessageFormat.format(errMsg, errArgs);

        resp.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, errMsg);
    }
}
```

这里的流程是这样的：

1. 服务器创建两个对象：`ServletRequest`请求对象和`ServletResponse`响应对象，用来封装浏览器的请求数据和封装向浏览器的响应数据
2. 接着服务器会默认在我们写的类里寻找service(ServletRequest req, ServletResponse res)方法，但是DemoServlet中不存在，那么会到其父类中寻找
3. 到父类HttpServlet中发现有此方法，则直接调用此方法，并将之前创建好的两个对象传入
4. 然后将传入的两个参数强转，并调用HttpServlet下的另外个service方法
5. 接着执行service(HttpServletRequest req, HttpServletResponse resp)方法，在此方法内部进行了判断请求方式，并执行doGet和doPost，但是doGet和doPost方法已经被我们自己重写了，所以会执行我们重写的方法

这里就非常简单明了，那为什么我们不重写个service方法呢？

- 如果不是业务需求，谁愿意重写这玩意
- 重写这玩意的话，我们需要将强转，以及一系列的安全保护判断重写一遍，存在安全隐患

这里的流程画一张图就是：

![image-20211202235846846](/images/Java/JavaEE/03-Servlet/image-20211202235846846.png)

紧接着，处理响应，返回给浏览器：

![image-20211202235908042](/images/Java/JavaEE/03-Servlet/image-20211202235908042.png)

可以看到，这之中大部分的工作都是tomcat在帮我们做

​  这也印证了一点：我在开头的时候故意用的别的包的时候，引发了tomcat的报错，因为数据类型根本不是同一种的，其他包的实现功能虽然和这玩意差不多，但是一些细节的东西肯定跟tomcat的有偏差

​  比如说返回值要经过tomcat的处理，如果是其他的包，返回值的类型可能就不一样了

​  当然这只是初步的分析源码，如果能吃透这个tomcat应该对工作很有帮助

​  它里面应该涉及到了高并发之类的以及程序和程序之间的联系

既然了解完这个了，接下来了解下它的Servlet-mapping配置项吧

## web.xml中Servlet-mapping配置项可以兼容的地方

这玩意其实不难，只要你不把多个Servlet（子路由）绑定到同一个Servlet-mapping（主路由）上就行

### 单个Servlet绑定单个Servlet-mapping

```xml
<servlet>
    <servlet-name>MyApps</servlet-name>
    <servlet-class>MyApp</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
```

就是我们最常用的，访问`/hello`即可访问

### 单个Servlet绑定多个Servlet-mapping

```xml
<servlet>
    <servlet-name>MyApps</servlet-name>
    <servlet-class>MyApp</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/hello1</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/hello2</url-pattern>
</servlet-mapping>
```

然后我们访问`/hello1`、`/hello2`都可以访问到我们设定的内容

![image-20211203002325098](/images/Java/JavaEE/03-Servlet/image-20211203002325098.png)

### 单个Servlet绑定某个字段下的所有路径

```xml
<servlet>
    <servlet-name>MyApps</servlet-name>
    <servlet-class>MyApp</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/adminer/*</url-pattern>
</servlet-mapping>
```

这样你访问`/adminer`下的所有内容，都是在访问同一个Servlet

![image-20211203002315118](/images/Java/JavaEE/03-Servlet/image-20211203002315118.png)

### 覆盖所有页面

这玩意不可能用得上

```xml
<servlet>
    <servlet-name>MyApps</servlet-name>
    <servlet-class>MyApp</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/*</url-pattern>
</servlet-mapping>
```

### 自定义后缀

这个偶尔可能会用得上，注意点：不能加上`/`

```xml
<servlet>
    <servlet-name>MyApps</servlet-name>
    <servlet-class>MyApp</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>*.myabb</url-pattern>
</servlet-mapping>

下面这样是无效的，只有上面那样才有效 必须在根路径下...
<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/users/*.aua</url-pattern>
</servlet-mapping>
下面这样也是无效的
<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/users*.aua</url-pattern>
</servlet-mapping>
```

![image-20211203002251355](/images/Java/JavaEE/03-Servlet/image-20211203002251355.png)

### Mapping的优先级问题

指定了固有路径的优先级最高，如果找不到就会找默认的处理请求

固有路径>泛路径>默认处理请求

比方说我现在有两个Apps

第一个是访问输出:世界你好

第二个是访问输出：世界你好sss

现在我的xml是这样配置的：

```xml
第一个app
<servlet-mapping>
    <servlet-name>MyApps</servlet-name>
    <url-pattern>/adminer/*</url-pattern>
</servlet-mapping>
第二个app
<servlet-mapping>
    <servlet-name>MyApps2</servlet-name>
    <url-pattern>/adminer/uuu</url-pattern>
</servlet-mapping>
```

那么，当我访问`/adminer/uuu`的时候获取到的页面时

![image-20211203002953422](/images/Java/JavaEE/03-Servlet/image-20211203002953422.png)

访问该路径下的通常页面是：

![image-20211203003010310](/images/Java/JavaEE/03-Servlet/image-20211203003010310.png)

访问其他没有指定的路径是：Tomcat的默认处理

![image-20211203003024542](/images/Java/JavaEE/03-Servlet/image-20211203003024542.png)

## Servlet的生命周期

 Servlet 生命周期可被定义为从创建直到毁灭的整个过程。以下是 Servlet 遵循的过程，也对应三个阶段：

- 初始化阶段：Servlet 通过调用 init () 方法进行初始化；
- 运行阶段：Servlet 调用 service() 方法来处理客户端的请求；
- 销毁阶段：Servlet 通过调用 destroy() 方法终止（结束），并由 JVM 的垃圾回收器进行垃圾回收的。

   其中的init()方法应只调用一次，Servlet创建后，在其运行阶段，便可通过service方法来处理来自客户端的请求，通过，当服务器关闭（tomcat停止运行）或者应用被移除容器（tomcat下webapps目录中的文件被移除）时，调用destory()方法来终止Servlet。应其生命周期如下图所示：

![资源分配图](/images/Java/JavaEE/03-Servlet/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NjY2ODU3,size_16,color_FFFFFF,t_70.jpeg)

## 正式开始Servlet

经过上面的分析，我们目前来说对Servlet已经了解了一些了，接下来开始正式学习它

新建一个`module`:`Servlet-02`

里面配置好相关的文件，及写好一个继承自`HttpServlet`的App.java

然后重写doGet 方法，我们可以尝试在这个方法中获取一些相应的东西

比如通过`this`

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("相关的Servlet配置：" + this.getServletConfig());
    String method = req.getMethod();
    System.out.println("请求的方法(get/post等):" + method);
    System.out.println("上下文" + this.getServletContext());
    resp.getWriter().write("Hello Servlet");
}
```

这里能通过this能获取到的东西挺多的，不过目前来看貌似其他的都没有啥用，除了context上下文，接下来先了解下这玩意是干嘛用的

## ServletContext

​  在容器(Tomcat)启动的时候，他会为**每一个web程序**都创建一个对应的Servletcontext对象，他代表了当前的web应用，这个对象是全局唯一，而且在所有工程内部的所有Servlet都共享这个对象

所以它也被称为：全局应用程序共享对象

![ServletContent](/images/Java/JavaEE/03-Servlet/ServletContent.jpg)

他的用途：

- 是一个**域对象**
- 可以读取全局配置参数
- 可以搜索当前工程目录下的资源文件
- 可以获取当前工程名字
- 共享数据
  - 在这个Servlet中保存的数据，可以在另一个Servlet中拿到

### 域对象介绍

   域对象是服务器在内存上创建的存储空间，用于在不同动态资源（servlet）之间传递与共享数据。

​  简单来说就是：<u>应用范围-服务器范围,只要服务器不关闭,数据一致存在</u>

## ServletContext中常用的方法

| 方法名                                            | 详解                                                                                                                                                                                                                                                      |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Object getAttribute(String name)**              | 根据传入的name返回Servlet容器属性<br />（通过下面的setAttribute方法设置的）<br />如果没有对应的属性，则返回一个null；                                                                                                                                     |
| **void setAttribute(String name, Object object)** | 在serlvet容器中将给定的object绑定到对应的属性名name上<br />（其形如key:value）<br />如果serlvet容器中已经存在该name的属性<br />则将其原始值覆盖，如果传入的object为null<br />则和removeAttribute方法起到的效果一致<br />（注意，这点和我们使用的Map不同） |
| **void removeAttribute(String name)**             | 根据传入的name将对应的属性从Servlet容器中移除                                                                                                                                                                                                             |
| **getAttributeNames()**                           | 以`Enumeration<String>`的形式返回对应Servlet容器中可用的属性名称（其中的name，也就是key）；                                                                                                                                                               |
| **getResourcePaths(String path)**                 | 返回一个包含目录列表的集合，如果web应用中所有资源的路径都不是以path开头，则返回一个空的集合。<br />参数path是用与匹配资源的起始路径，且需要以"/"开头；                                                                                                    |
| **getResource(String path)**                      | 返回映射到给定路径的资源的URL对象，path需要以"/"开头；                                                                                                                                                                                                    |
| **getResourceAsStream(String path)**              | 返回映射到给定路径的资源的输入流（InputStream）<br />path需要以"/"开头，此方法无法获取到资源的类型和长度属性；                                                                                                                                            |
| **getRealPath(String path)**                      | 返回给定虚拟路径（相对于当前应用）的资源在主机上的真实路径，当servlet容器无法将给定的虚拟路径转换为真实路径时，返回null                                                                                                                                   |
| **getRequestDispatcher(String path)**             | 返回一个RequestDispatcher对象，该对象可用于将请求转发到资源（指定路径）或将资源包括在响应中，path需要以"/"开头；                                                                                                                                          |
| **String getContextPath()**                       | 获取当前项目位于`/`的目录(应用程序上下文目录)，比如说我当前的项目为hello<br />则返回`/hello`                                                                                                                                                              |

先来一个总代码，效果如下：

web.xml中添加全局资源 细节等下会说

```xml
<context-param>
  <param-name>BusinessName</param-name>
  <param-value>ZZXY</param-value>
</context-param>
<context-param>
  <param-name>CourseName</param-name>
  <param-value>JAVA WEB</param-value>
</context-param> 
```

然后是Java文件

```java
package com.amayakite.Servlet;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
import java.util.Date;
import java.util.Enumeration;
import java.util.Set;

//这个后面会说到
@WebServlet(
        name = "MyApp1",
        urlPatterns = {"/myapp"},
        initParams = {
                @WebInitParam(name = "name", value = "root"),
                @WebInitParam(name = "password", value = "123456")
        }
)
public class MyApp1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置返回客户端的contentType
        //text/plain ：纯文本格式  设置为text/html println的换行会失效
        resp.setContentType("text/plain;charset=utf-8");
        //resp.setCharacterEncoding("utf-8");
        PrintWriter out = resp.getWriter();
        //Servlet容器的上下文对应的相对的根目录
        out.print("1.Servlet容器的上下文对应的相对的根目录:");
        out.println("Served at: " + req.getContextPath());
        ServletConfig config = this.getServletConfig();
        //获取Servlet的初始化参数
        out.print("2.获取Servlet的初始化参数:");
        out.println("name: " + this.getInitParameter("name"));
        //获取Servlet的<servlet-name>
        out.print("3.获取Servlet的<servlet-name>:");
        out.println("访问的Servle名为：" + config.getServletName());

        // 得到包含所有初始化参数名的Enumeration对象
        Enumeration<String> paramNames = config.getInitParameterNames();
        //遍历所有的初始化参数名，得到相应的参数值
        out.println("4.遍历所有的初始化参数名，得到相应的参数值:");
        // 遍历所有的初始化参数名，得到相应的参数值并打印
        while (paramNames.hasMoreElements()) {
            String name = paramNames.nextElement();
            String value = ((ServletConfig) config).getInitParameter(name);
            out.println(name + ": " + value);
        }
        //得到ServletContext对象
        ServletContext context = this.getServletContext();
        //获取应用程序的初始化参数（全局的，所有的Servlet可共享）
        out.print("5.获取应用程序的初始化参数:");
        out.println("name's value: " + context.getInitParameter("BusinessName"));

        //一次获取所有的应用程序的初始化参数的name
        Enumeration<String> attributeNames = context.getInitParameterNames();
        out.println("6.遍历所有的应用程序的初始化参数:");
        while (attributeNames.hasMoreElements()) {
            String attributeName = attributeNames.nextElement();
            String value = context.getInitParameter(attributeName);
            out.println(attributeName + ": " + value);
        }
        //setAttribute，设置serlvet容器的属性,在另一个Servlet实例中获取
        context.setAttribute("setTime", new Date());
        //获取Servlet容器的上下文对应的相对的根目录下的文件和目录的集合，也对应path开头的"/"
        Set<String> pathSet = context.getResourcePaths("/");
        out.println("7.获取Servlet容器的上下文对应的相对的根目录下的文件和目录的集合:");
        for (String path : pathSet) {
            out.println(path);
        }
        //getResource方法，URL对象中包含资源文件的许多属性，比如文件类型、文件长度等
        out.println("8.获取对应资源的URL对象:");
        URL url = context.getResource("/index.jsp");
        out.println(url.toString());
        //getRealPath 获取对应资源虚拟路径的真实路径
        out.println("9.获取对应资源虚拟路径的真实路径:");
        out.println(context.getRealPath("/index.jsp"));
        //getRequestDispatcher实现转发
        //context.getRequestDispatcher("/AnswerServlet").forward(req, resp);
    }
}

```

最终效果：

![image-20211203214823062](/images/Java/JavaEE/03-Servlet/image-20211203214823062.png)

### 读写共享参数

但凡是域对象**都有**如下3个方法：

| 方法名                                                   | 用途                                            |
| -------------------------------------------------------- | ----------------------------------------------- |
| **void** setAttribute(**String** name,**Object** value); | 往域对象里面添加数据，添加时以key-value形式添加 |
| **Object** getAttribute(**String** name);                | 根据指定的key读取域对象里面的数据               |
| **void** removeAttribute(**String** name);               | 根据指定的key从域对象里面删除数据               |

接下来简单使用以下它

我们再创建一个`MyApp2`

然后在`web.xml`中建立下相关的映射：

- MyAPP对应路径：test1
- MyApp2对应路径：test2

然后在MyApp1的`doGet`方法中写入如下内容

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    getServletContext().setAttribute("userName", "张三");
    resp.getWriter().write("写入UserName到Servlet Content张三成功！");
}
```

然后在MyApp2的doGet中写入如下内容

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Object userName = getServletContext().getAttribute("userName");
    resp.getWriter().write("Hello " + userName);
}
```

此时，如果我们直接访问/test2 可以看到是null（未赋值）:

![image-20211203131349218](/images/Java/JavaEE/03-Servlet/image-20211203131349218.png)

访问下test1

![image-20211203131536087](/images/Java/JavaEE/03-Servlet/image-20211203131536087.png)

在访问下test2：

![image-20211203131553703](/images/Java/JavaEE/03-Servlet/image-20211203131553703.png)

成功读取到了该对象！

如果你学过相应的前端框架，应该在这时就能够反应过来：这玩意跟`rudex`的性质非常相似

### 读取全局配置参数（web.xml中的内容）

| 方法名                                                             | 用途                       |
| ------------------------------------------------------------------ | -------------------------- |
| `String` getServletContext().getInitParameter(name);               | 根据指定的参数名获取参数值 |
| Enumeration`<String>` getServletContext().getInitParameterNames(); | 获取所有参数名称列表       |

首先，我们在`web.xml`添加如下内容

```xml
    <!-- 全局配置参数，因为不属于任何一个servlet，但是所有的servlet都可以通过servletContext读取这个数据 -->
<!--每个contenxt-param理论上来说应该对应不同的数据-->
    <context-param>
        <param-name>jdbcConnection</param-name>
        <!--在xml配置文件中，url中的&符号需要转义成&,即使用：&amp;来替代& -->
        <param-value>jdbc:mysql://localhost:3306/testuser=root&amp;password=&amp;useUnicode=true&amp;characterEncoding=gbk&amp;autoReconnect=true&amp;failOverReadOnly=false</param-value>

    </context-param>

    <context-param>

        <param-name>jdbcDriver</param-name>

        <param-value>com.jdbc.mysql</param-value>

    </context-param>
```

然后新建一个MyApp3.java，继承HttpServlet，重写get方法，然后获取相应的内容

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //        根据名字获取单个Servlet-config
    String jdbcConnection = getServletContext().getInitParameter("jdbcConnection");
    
    //        获取全部Servlet-config的名字(key)返回的一个枚举类
    Enumeration<String> initParameterNames = getServletContext().getInitParameterNames();
    
    resp.setContentType("text/html;charset=utf-8");
    //发送单个字段
    resp.getWriter().write("<p>jdbcConnection:" + jdbcConnection + "</p>");
    
    while (initParameterNames.hasMoreElements()) {
        String initParameterName = initParameterNames.nextElement();
        //            通过循环获取到的key获取value
        resp.getWriter().write("<p>" + initParameterName + ":" + getServletContext().getInitParameter(initParameterName) + "</p>");
    }
}
```

然后配置下xml的路径，为test3

访问test3：成功获取到我们想要的对象

![image-20211203150156627](/images/Java/JavaEE/03-Servlet/image-20211203150156627.png)

### 使用ServletContext完成请求转发（不是重定向）

这玩意实际工作中用的比较少，一般都是用重定向，重定向后面再说，这里先放一下原理图

![请求转发和重定向](/images/Java/JavaEE/03-Servlet/请求转发和重定向.jpg)

我们新建两个Java文件：testForward1和testForward2

将他们的路径分配为：`/forward1`和`/forward2`

然后将1的内容设置为随便返回点什么给客户端，比如返回一个“ServletContext 测试请求转发”

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    resp.setContentType("text/html;charset=utf-8");
    resp.getWriter().write("这里是forward1 ServletContext 测试请求转发");
}
```

然后编写testForward2

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ServletContext servletContext = getServletContext();
    System.out.println("进入了testForward2");
    //通过转发请求的链接获取相应的对象
    RequestDispatcher dispatcher = servletContext.getRequestDispatcher("/forward1");
    //        调用该对象的forward方法进行重定向
    dispatcher.forward(req, resp);
    
    //上方的全部话的简写形式：
    getServletContext().getRequestDispatcher("/forward1").forward(req, resp);
    
}
```

然后我们启动服务、访问forward2，重新定向到了forward1页面的内容，但是链接不变

![image-20211203152524708](/images/Java/JavaEE/03-Servlet/image-20211203152524708.png)

### 使用ServletContext搜索当前工程目录下面的资源文件(XML/Properties)

#### 基本概念以及ClassPath（classess）

还记得我们在老早之前创建的那个resources文件夹吗，资源文件就是放在那里的，我们先新建一个`db.properties`到该文件夹下：

![image-20211203155322875](/images/Java/JavaEE/03-Servlet/image-20211203155322875.png)

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

![image-20211203155802117](/images/Java/JavaEE/03-Servlet/image-20211203155802117.png)

#### 可能会遇到的导出问题

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

#### 读取 修改内容

新建一个文件，读取下内容 我这里设置的是访问`/db`

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

![image-20211203162311727](/images/Java/JavaEE/03-Servlet/image-20211203162311727.png)

看起来没问题，接下来再尝试修改一下，看看是否能生效

## 使用注解的方式绕重复在xml中写内容来注册Servlet

TMD，我说咋感觉缺了点什么，合计又是这p网课老师漏了这最重要的东西

我们先前每注册一个Servlet，就要在web.xml中添加两条记录

这样非常不舒服

现在就有一个解决的方法，可以无需在web.xml中浪费这么多时间的事情，非常方便的 让我们注册好Servlet

首先，随便建一个java文件，然后覆盖粘贴如下内容：

```java
@WebServlet(
      description = "My First Servlet", 
      urlPatterns = { "/HelloServlet"  }, 
      initParams = { 
        @WebInitParam(name = "name", value = "join")
      })
public class HelloServlet extends HttpServlet {
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.getWriter().append("Served at: ").append(this.getServletInfo());
  }

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    doGet(request, response);
  }
}

```

访问这个页面，草有内容！

![image-20211203175447989](/images/Java/JavaEE/03-Servlet/image-20211203175447989.png)

接下来详细讲下这个注解是干什么的吧：

### @WebServlet注解

​  从上面的代码中，我们可以看到，顶部是一个@WebServlet注解，这个也是**Servlet3.0**之后的一个特点，配置注解化了，**不用在web.xml**中在去一个个配置了，但是**实现的功能是相同的**，我们可以看到，**@WebServlet中的一些属性就是我们在创建的过程中设置的**。其中@WebServlet中的每个属性的解释如下：

这些标签名（没见过的）会在之后的学习中逐一解释

| 属性名         | 类型           | 含义                                                                                                                     |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| name           | String         | 指定Servlet 的 name 属性，等价于`<servlet-name>`标签                                                                     |
| value          | String[]       | 该属性等价于 urlPatterns 属性。两个属性不能同时使用                                                                      |
| urlPatterns    | String[]       | 指定一组 Servlet 的 URL 匹配模式。等价于`<url-pattern>`标签                                                              |
| loadOnStartup  | int            | 指定 Servlet 的加载顺序，等价于 `<load-on-startup>`标签，0或者大于0，项目启动是就加载，大于0时，数字越小，启动优先级越高 |
| initParams     | WebInitParam[] | 一组 Servlet 初始化参数，等价于`<init-param>`标签                                                                        |
| asyncSupported | boolean        | 声明 Servlet 是否支持异步操作模式，等价于`<async-supported>` 标签，不设置时默认值为false                                 |
| description    | String         | Servlet 的描述信息，等价于 `<description>`标签                                                                           |
| displayName    | String         | Servlet 的显示名，等价于`<display-name>`标签                                                                             |

接下来只先讲解以下urlPatterns属性

### urlPatterns

我们之前配置的是

```java
@WebServlet(
  description = "My First Servlet", 
  urlPatterns = { "/HelloServlet"}, 
  initParams = { 
    @WebInitParam(name = "name", value = "join")
  })
```

如果改成这样：那么访问`/StillMe`也可以到这，就像是之前xml配置多个mapping一样

```java
@WebServlet(
  description = "My First Servlet", 
  urlPatterns = { "/HelloServlet", "/StillMe" }, 
  initParams = { 
    @WebInitParam(name = "name", value = "join")
  })
```

接下来详细说下它的匹配规则

- `精确匹配`：也就是我们在上面配置的匹配规则，需要完全相等才能匹配成功，这也是我们经常发生错误的地方，请求Servlet时的大小写拼写错误导致404；
- `路径匹配`：比如想匹配以rest开头的所有请求，可以写成"/rest/*"，其格式为以’/‘字符开头，并以’/*'结尾；
- `扩展名匹配`：比如想匹配所有以.do结尾的请求，可以写成"*.do"，其格式为以’*.’，后面跟上扩展名；
- `缺省匹配`：映射路径为"/"，那么这个Servlet就是当前应用的缺省Servlet，默认处理无法匹配到虚拟路径的请求。

   需要注意的是，**路径匹配和扩展匹配无法混合使用**，即urlPattern无法写成"`/rest/*.do"`；

​  这也是初学者容易感到困惑的地方

​  Servlet的虚拟路径匹配并不是完全的按照正则来匹配的

​  虽然路径匹配和扩展匹配是按照正则中的通配符(*)来匹配的，这也是部分人可以会写出特定的正则，但是却不是一个合法的虚拟路径

​  Servlet容器收到请求后，会将请求从上下文路径（通过`request.getContextPath()`获取的）处截断，**使用剩余的部分来进行路径匹配**

​  比如请求url为<http://localhost:8080/FirstProject/HelloServlet>，**那么Servlet容器就会使用"/HelloServlet"来匹配Servlet**

#### 优先级问题

优先级为：

​  精确匹配>路径匹配>扩展名匹配>缺省匹配，**Servlet容器会从优先级高的虚拟路径开始匹配，匹配到后就会立刻将请求交给对应的Servlet来处理**，不会再关心其他Servlet的虚拟路径是否会匹配成功。

下面来一组例子：

|     urlPatterns     | Servlet Name |
| :-----------------: | :----------: |
| `/abc/*`---路径匹配 |   Servlet1   |
|   `/`---缺省匹配    |   Servlet2   |
|  `/abc`---精准匹配  |   Servlet3   |
| `*.do`---扩展名匹配 |   Servlet4   |

- 当请求去除上下文路径后路径为：`/abc/a.html`时，根据上述规则，会调用**Servlet1**；
- 请求为：`/abc`，根据匹配优先级，会调用**Servlet3**；
- 请求为：`/abc/a.do`，会匹配到`/abc/*`、`*.do`，但根据匹配优先级，会调用**Servlet1**；
- 请求为：`/a.do`，会匹配到`/`、`*.do`，但根据匹配优先级，会调用**Servlet4**；

#### 测试缺省匹配

为了验证下缺省匹配，我们创建两个文件

第一个文件使用精准匹配：`/mybuild`

第二个文件使用缺省匹配：`/`

接下来打来浏览器尝试下访问`/mybuild`，看是哪个文件匹配上了

代码部分：

```java
//缺省的
@WebServlet(
        description = "testparrent2"
        , name = "allParent"
        , urlPatterns = {"/"}
)
public class testparrent2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write("hello world Servlet ");


    }
}

//精准的
@WebServlet(
        urlPatterns = {"/mybuild"},
        name = "myBuild",
        description = "testBuild"
)
public class testparrten1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        resp.getWriter().write("你访问到了myBuild");
    }
}

```

当我们访问到`mybuild`时，显示的内容

![image-20211203202601697](/images/Java/JavaEE/03-Servlet/image-20211203202601697.png)

好了，下一个问题，到我们访问一个不存在的页面时，返回的404是怎么来的

在此之前，我们先把那个缺省匹配删掉

### 缺省-关于静态文件和404 Not Found界面的处理方式

当我们访问一个我们未定义的页面

![image-20211203202937866](/images/Java/JavaEE/03-Servlet/image-20211203202937866.png)

这里会抛出一个404，提示没有该文件，这个玩意是怎么来的？我们又该怎么样去自定义？

在此之前，我们先回顾一个点：

我们先在web目录下新建一个文件`mybuild.html`

文件内容随意：

![image-20211203203311535](/images/Java/JavaEE/03-Servlet/image-20211203203311535.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
hello 这是build.html文件！
</body>
</html>
```

然后定义一个java文件，指向`/mybuild`

```java
@WebServlet(
        urlPatterns = {"/mybuild"},
        name = "myBuild",
        description = "testBuild"
)
public class testparrten1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        resp.getWriter().write("你访问到了myBuild 这里是Servlet生成的");
    }
}
```

接下来，我们访问mybuild

![image-20211203203541935](/images/Java/JavaEE/03-Servlet/image-20211203203541935.png)

跳出了一个这个

那访问mybuild.html呢？

![image-20211203203608836](/images/Java/JavaEE/03-Servlet/image-20211203203608836.png)

其实我们这个时候的想法应该是，服务器遵循文件的意愿，在用户输入`/mybuild`时访问`mybuild.html`，因为没多少人愿意花心情去整一个Java文件写多美观的页面，更多时候我们的Java文件应该是作为一个数据接口使用的

​  其实，**客户端的每个请求，都是由Servlet容器根据虚拟路径的匹配规则来进行处理的，包括静态资源**。

​  我们能通过servlet方便简单的开发网站，是因为我们站在了巨人的肩膀上，下面我们一起来看下Sun公司都为我们开发者提前做了些什么工作。

- Tomcat会为项目配置一个缺省的Servlet（如果项目中自行配置，则不会生效），配置文件在tomcat安装目录下conf目录中的web.xml文件中，具体内容如下，缺省的Servlet名为`DefaultServlet`。

打开这个文件，能看到如下内容

```xml
<servlet>
    <servlet-name>default</servlet-name>
    <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
    <init-param>
        <param-name>debug</param-name>
        <param-value>0</param-value>
    </init-param>
    <init-param>
        <param-name>listings</param-name>
        <param-value>false</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
```

​   客户端请求静态资源文件时，也是由缺省的Servlet处理的（自己单独配置Servlet除外），如果请求文件能找到，就会将页面通过HttpServletResponse对象以流的方式返回给客户端，否则报404错误。

​  不过讲到这里，大家可以自己试一试配置了缺省Servelt时

​  访问`mybuild.html`的情况（会调用SelfDefaultServlet），但是，如果我们在浏览器中输入`http://localhost:8080/项目名称/index.jsp`（index.jsp是创建的第一个jsp页面）呢？会是什么样一个结果？也是调用缺省的Servlet么？真是的运行结果如下：

![image-20211203204139560](/images/Java/JavaEE/03-Servlet/image-20211203204139560.png)

​  这是什么原因？

​  为什么不是调用缺省的servlet了？

​  这是因为**tomcat除了缺省Serlvet外**，还给我们**提供一个处理jsp文件的Servlet**，配置如下，因为**后缀匹配的优先级高于缺省的Servlet**，**所以访问JSP的时候需要交由JspServlet来处理**（JSP因为可能包含Java代码，所以第一次执行的时候需要先编译，这个工作由JspServlet完成）

```java
<servlet>
    <servlet-name>jsp</servlet-name>
    <servlet-class>org.apache.jasper.servlet.JspServlet</servlet-class>
        <init-param>
        <param-name>fork</param-name>
        <param-value>false</param-value>
        </init-param>
        <init-param>
        <param-name>xpoweredBy</param-name>
        <param-value>false</param-value>
        </init-param>
        <load-on-startup>3</load-on-startup>
</servlet>
```

接着来看下他们两的mapping

```java
<servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>

    <!-- The mappings for the JSP servlet -->
<servlet-mapping>
        <servlet-name>jsp</servlet-name>
        <url-pattern>*.jsp</url-pattern>
        <url-pattern>*.jspx</url-pattern>
 </servlet-mapping>
```

是不是发现了什么

jsp的匹配是`<url-pattern>*.jsp</url-pattern>`

而默认缺省处理是`<url-pattern>/</url-pattern>`

一个是扩展名匹配，一个是缺省匹配

到这里也就好说明404这个玩意是怎么来的了

就是通过缺省匹配查找相应的文件，找不到？那就返回404

​同时，我们可以自由的覆盖它，因为它的优先级是最低的，所以我们在测试`mybuild`和`mybuild.html`时，`mybuild`会优先展示的原因
