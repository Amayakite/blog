---
title: 03-1-Response和Requests
date: 2021-12-03 16:44:05
category: JavaWeb
tag:
 - Java
 - JavaWeb
 - Request
 - Response
---



## 基本概念

嘛，这里主要是了解这两个东西是怎么样一个用法

我们在使用`doGet()`的时候，可以发现他接受两个对象：

```java
doGet(HttpServletRequest req, HttpServletResponse resp){
    ......
}
```

之前一直没怎么说，现在开始具体的说说它

​  Web服务器(Tomcat)接收到客户端的http请求，针对这个请求，分别创建了两个东西

- 代表请求的`HttpServletRequest`对象
  - 如果要获取客户端发过来的参数，找他就对了
- 代表响应的`HttpServletResponse`对象
  - 如果要给客户端响应，找他就对了

既然要学，我们肯定是要按照顺序来学习的，先从Request开始吧

# HttpServletRequest

相信学过爬虫的都对request这玩意不陌生，一个请求，在正式开始前，我们先来看看这张图

![资源分配图](/images/Java/JavaEE/03-1Response和Requests/20200305162320791.jpg)

​  从这张图中，我们可以看到，一个客户端请求分为好几步：

1. 客户端的网络请求首先会被Http服务器接收
   - 这里的Http服务器也叫作**Web服务器、Web容器，其需要提供web应用所需的环境，接受客户端的http请求**
   - 这里我们的服务器就是本机（<http://localhost:8080>）
2. web服务器根据请求的路径将请求转交给其对应的Servlet容器
   - Servlet容器，也称作Servlet引擎，**为Servlet的运行提供环境**
   - 也就是Tomcat或者其他服务器
3. Servlet容器根据对应的虚拟路径（@WebServlet中配置的（或者是在xml中配置的mapping））来加载Servlet，如果Serlvet没有被实例化则创建该Servlet的一个实例（调用init方法）
4. Servlet容器根据用户的HTTP请求，创建一个ServletRequest对象（HTTP的请求信息被封装在其中）和一个可以对HTTP请求进行响应的ServletResponse对象（类似于寄信，并在信中说明回信的地址）
   1. 然后调用HttpServlet中重写的service(ServletRequest req, ServletResponse res)方法，并在这个方法中，将ServletRequest、ServletResponse这两个对象向下转型，得到我们非常熟悉的HttpServletRequest和HttpServletResponse两个对象，然后将客户端的请求转发到HttpServlet中protected修饰的
5. service(HttpServletRequest req, HttpServletResponse resp)根据请求的method（get、post、put、delete、head、options、trace）来调用不同的方法，如doGet、doPost
6. 服务端处理完Http的请求后，根据HttpServletResponse对象将处理结果作为Http响应返回给客户端。

   上面就是一个客户端发起请求与接收响应之前服务器所执行的操作，对于一个Servlet来讲，其执行过程就等同于它的生命周期：
      1. 被Servlet容器加载------>
      2. 接收servlet容器转发的来自客户端的Http请求------->
      3. 处理完毕后，将处理结果返回至客户端------>
      4. web服务终止时被销毁。

​其中的2、3步骤，在web服务运行期间，可能会因为客户端的多次请求而执行多次，1、4步骤也有可能因为服务的重启或者主动销毁而多次执行。


### HttpServletRequest中获取请求行信息的方法

Http的请求行中，会包含请求方法、请求资源名、请求路径、Http版本等信息

我们可以在tomcat的安装目录–>logs—>localhost_access_log.xxx.txt中查看在某日期中(xxx为日期，格式为yyyy-MM-dd)请求本Tomcat的所有Http请求的请求头信息

如果你是在IEDA中启动tomcat的话，那么可以通过ieda的tomcat配置页面来设置log存放的路径：这两个勾上并配置即可

![image-20211203220423076](/images/Java/JavaEE/03-1Response和Requests/image-20211203220423076.png)

我们在上面请求HelloServlet的请求行信息格式大概如下：

![image-20211203220705031](/images/Java/JavaEE/03-1Response和Requests/image-20211203220705031.png)

在log信息中，括起来的为请求行信息，`GET`表示请求方式，`/`为请求url，`HTTP/1.1`为请求的协议及版本。

请求行后跟的200为Http响应的状态码（Status Code），11363为响应内容的长度（Content-Length）。

为了获取请求行中对应的信息，HttpServletRequest中实现了一堆的方法，让我们的操作变得更加简单快捷。相关方法如下：

|            方法名            | 描述                                                                                                                                                                        |
| :--------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      String getMehod()       | 该方法用于获取HTTP请求消息中的请求方式<br />（如GET、POST等）                                                                                                               |
|    String getRequestUrl()    | 该方法用于获取请求行中的资源名称部分<br />即位于URL的主机端口之后、参数部分之前的部分                                                                                       |
|   String getQueryString()    | 该方法用于获取请求体中的参数部分<br />例如：`localhost:8080/aa/b?name=hello&pwd=123`<br />则获取到的内容为：`name=hello&pwd=123`                                            |
|     String getProtocol()     | 该方法用户获取请求体中的协议名称和版本<br />例如：`HTTP/1.0`或`HTTP/1.1`                                                                                                    |
|   String getContextPath()    | 这个方法用于获取这个URL位于我们WEB应用程序的路径<br />例如访问`localhost:8080/aa/bb/cc`<br />则返回`/aa/bb/cc`<br />如果说访问的路径是根目录，则返回空字符串(不是null)      |
|   String getServletPath()    | 该方法用户获取 Servlet 的名称或Servlet所映射的路径                                                                                                                          |
|    String getRemoteAddr()    | 该方法用户获取客户端的IP地址，格式类似于"192.168.0.3"                                                                                                                       |
|    String getRemoteHost()    | 该方法用户获取客户端的完整主机名，其格式类似于`localhost`<br />需要注意的是，如果无法解析出该主机名，会返回客户端的IP地址                                                   |
|     int getRemotePort()      | 获取请求客户端网络连接的端口号                                                                                                                                              |
|    String getLocalAddr()     | 获取web服务器上接收当前请求网络连接的IP地址                                                                                                                                 |
|    String getLocalName()     | 获取web服务器上接收当前请求网络连接的IP地址所对应的主机名                                                                                                                   |
|      int getLocalPort()      | 获取web服务器上接收当前请求网络连接的端口号                                                                                                                                 |
|    String getServerName()    | 该方法用于获取当前请求所指向的主机名<br />即：HTTP请求消息中Host头字段所对应的主机名部分                                                                                    |
|     int getServerPort()      | 该方法用户获取当前请求所连接的服务器端口号<br />即如果是HTTP请求消息中Host头字段所有对应端口号部分                                                                          |
|      String getSchme()       | 该方法用户获取请求的协议名，例如`http`、`https`或`ftp`                                                                                                                      |
| StringBuffer getRequestURL() | 获取客户端发出请求的完整URL<br />包括协议、服务名、端口号、资源路径等信息<br />但是不包括后面的查询参数(params)部分<br />这玩意返回的是StringBuffer类型，更方便对结果的修改 |

为了更好的理解，我们通过一个例子来看下每个方法的返回值

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    resp.setContentType("text/plain;charset=utf-8");
    //        获取所有请求行相关的信息
    PrintWriter writer = resp.getWriter();
    writer.println("HttpServletRequest对象获取请求行信息方法示例：<br>");
    writer.println("getMethod : " + req.getMethod() + "<br>");
    writer.println("getRequestURI : " + req.getRequestURI() + "<br>");
    writer.println("getQueryString:" + req.getQueryString() + "<br>");
    writer.println("getProtocol : " + req.getProtocol() + "<br>");
    writer.println("getContextPath:" + req.getContextPath() + "<br>");
    writer.println("getServletPath : " + req.getServletPath() + "<br>");
    writer.println("getRemoteAddr : " + req.getRemoteAddr() + "<br>");
    writer.println("getRemoteHost : " + req.getRemoteHost() + "<br>");
    writer.println("getRemotePort : " + req.getRemotePort() + "<br>");
    writer.println("getLocalAddr : " + req.getLocalAddr() + "<br>");
    writer.println("getLocalName : " + req.getLocalName() + "<br>");
    writer.println("getLocalPort : " + req.getLocalPort() + "<br>");
    writer.println("getServerName : " + req.getServerName() + "<br>");
    writer.println("getServerPort : " + req.getServerPort() + "<br>");
    writer.println("getScheme : " + req.getScheme() + "<br>");
    writer.println("getRequestURL : " + req.getRequestURL() + "<br>");
}
```

![image-20211203223228622](/images/Java/JavaEE/03-1Response和Requests/image-20211203223228622.png)

换成127.0.0.1再试试（我电脑上装了docker，所以他识别我的主机名是docker（docker安装的时候会附带一个网络驱动））

![image-20211203223341940](/images/Java/JavaEE/03-1Response和Requests/image-20211203223341940.png)

​  我们可以看到，HttpServletRequest提供的方法几乎可以获取我们想要的任何请求头中的信息，还可以获得客户端的的ip地址（客户端出口的公网ip），在上例中，getRemoteAddr等四个方法获取到的值全为0:0:0:0:0:0:0:1

​  这是因为客户端和服务器端都在一个主机上，hosts文件解析地址的时候将localhost解析为ipv6了，我们可以将localhost改为127.0.0.1，即可获得ipv4的地址。

​  其中的getRemotePort获取的是客户端与服务器管建立的Tcp连接所使用的端口号。

### HttpServletRequest中获取请求头的相关方法

 当客户端请求Servlet时，需要通过请求头向服务器传递附加信息，例如客户端可以接受的数据类型、请求源、消息正文的长度、是否保持TCP连接等，我们先来看下Http中常见的请求头信息：

![资源分配图](/images/Java/JavaEE/03-1Response和Requests/20200305162936951.jpg)

 同样的，为了方便的获取请求头中对应的信息，HttpServletRequest也提供了一系列的方法，相关方法如下：

|               方法名                | 描述                                                                                                                                                                                       |
| :---------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|    String getHeader(String name)    | 该方法用于获取一个指定头字段<br />如果请求消息中没有包括指定的头字段，getHeader()方法就返回null<br />如果过请求消息中包含有多个指定名称的头字段，<br />getHeader()返回其中第一个头字段的值 |
| Enumeration getHeaders(String name) | 该方法返回一个`Enumeration<String>`集合对象<br />该机和对象有请求消息中出现的某个指定名称的所有头字段组成<br />在多数情况下，一个头字段名在请求消息中只出现一次<br />但有时候可能出现多次  |
|    Enumeration getHeaderNames()     | 获取所有请求头字段**名称**的`Enumeration<String>`对象                                                                                                                                      |
|    int getIntHeader(String name)    | 获取指定名称的头字段，并且将其转换为`int`类型<br />如果指定名称的头字段不存在，返回-1<br />如果获取到的头字段不能转换为int，则抛出<br />NumberFormatException异常                          |
|   long getDateHeader(String name)   | 该方法用户获取指定头字段的值<br />并且按照GMT时间格式转换成一个代表日期的长整数（时间戳）                                                                                                  |
|       String getContentType()       | 该方法用于获取`content-Type`头字段的值，结果为String类型                                                                                                                                   |
|       int getContentLength()        | 该方法用于获取Content-Length头字段的值，结果为int类型                                                                                                                                      |
|    String getCharacterEncoding()    | 返回请求消息的试题部分的字符集编码，通常是从`content-Type`头字段中进行提取，结果为String类型                                                                                               |
|        Cookie[] getCookies()        | 该方法用于获取所有的客户端传来的Cookie对象，如果客户端没有发送Cookie，则返回null                                                                                                           |

我们接着之前的代码，加上如下代码，然后跑起来访问一下看看：

```java
writer.println("<hr/>");
writer.println("HttpServletRequest对象获取请求头信息方法示例：<br>");
writer.println("getHeaderNames,all headers info as follows:" + "<br>");
// 获取请求消息中所有头字段
Enumeration<String> headerNames = req.getHeaderNames();
// 使用循环遍历所有请求头，并通过getHeader()方法获取一个指定名称的头字段
while (headerNames.hasMoreElements()) {
    String headerName = (String) headerNames.nextElement();
    writer.print(headerName + " : " + req.getHeader(headerName) + "<br>");
}
writer.println("getCookies,all cookies info as follows:" + "<br>");
Cookie[]cookies = req.getCookies();
for(Cookie cookie: cookies) {
    writer.println(cookie.getName() + ":" + cookie.getValue() + "<br>");
}
```

结果：这里也可以手动添加几个cookie看看cookie的效果

![image-20211203230732811](/images/Java/JavaEE/03-1Response和Requests/image-20211203230732811.png)

## HttpServletRequest中获取请求参数

  上面讲了这么多，其实都是HttpServletRequest提供的锦上添花的方法，HttpServletRequest最重要的，就是可以获取用户提交来的数据，比如表单数据或者一些查询参数。因为Servlet在MVC架构中是充当controller这个角色的，其负责响应用户的请求，也就需要和用户进行交互，负责获取从前端（JSP，客户端）获取数据（用户输入、或者查询条件等），并在处理结束后，给客户端一个响应。如果无法获取页面数据，那么后续的操作也就无从谈起。

​   当然，为了方便获取页面中的参数，HttpServletRequest也也也提供了一系列的方法，相关方法如下：

|                 方法声明                 | 功能描述                                                                                                                           |
| :--------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------- |
|     String getParameter(String name)     | 获取某个指定名称的参数值<br />如果在请求消息中没有包含指定名称的参数值<br />则返回null<br />如果有多个该指定名称的参数，返回第一个 |
| String[] getParameterValues(String name) | 获取某个指定名称的参数值<br />和上面不同的是，这玩意是处理多个该指定名称的参数的                                                   |
|      Enumeration getParamentNames()      | 返回一个包含请求消息中所有参数名的Enumeration 对象<br />在基础上，可以对请求消息中的所有参数进行遍历处理                           |
|          Map getParameterMap()           | 将请求信息中的所有参数名和值装入一个Map中返回                                                                                      |

# HttpServletResponse

首先瞄一眼结构：原来是两个接口

![image-20211203170325613](/images/Java/JavaEE/03-1Response和Requests/image-20211203170325613.png)

可以看到，它继承自ServletResponse，同时他本身并没有直接对流操作的方法，但是它的父类中有个两个对流操作的方法： 

```java
public ServletOutputStream getOutputStream() throws IOException;
public PrintWriter getWriter() throws IOException;
```

我们之前给浏览器发送文本，就是通过`getWriter`来进行发送的，那么发送文件之类的二进制数据应该是用`getOutputStream`了

我们来写行代码测试看下它的运行类型是什么：

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println(resp.getClass());
    System.out.println(resp.getOutputStream().getClass());
    System.out.println(resp.getWriter().getClass());
}
```

看来都是tomcat在实现这个东西

```md
# 1
class org.apache.catalina.connector.ResponseFacade
# 2
class org.apache.catalina.connector.CoyoteOutputStream
# 3
class org.apache.catalina.connector.ResponseFacade
class org.apache.catalina.connector.CoyoteOutputStream
```

貌似发现了什么，我接着写一些代码测试了下：

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println(resp.getClass());
    System.out.println(resp.getOutputStream().getClass());
    resp.getOutputStream().close();

    System.out.println(resp.getWriter().getClass());
    resp.setContentType("text/html;charset=utf-8");
    PrintWriter writer = resp.getWriter();
    writer.write("<h1>Hello World</h1>");
    writer.flush();
    writer.close();

}
```

写完这些后，我尝试的访问了下这个东西绑定的路径，发现没有返回任何消息

说明`getWriter`中的流是继承自`getOutputStream()`中的流的

接着，我们再来看看字段：

![image-20211203172224003](/images/Java/JavaEE/03-1Response和Requests/image-20211203172224003.png)

都是状态码的常量，这里面存放了各种常见的状态码，有需要的时候应该能直接调的来用

## 常见应用

### 设置状态码

### 发送消息

略，天天用

### 发送文件、展示图片

我这里以演示发送一个jpg文件为例，注意，文件存放的位置决定了发送时调用不同的方法

我把文件放在了静态资源的同级目录下，而非是我们代码的目录下

![image-20211203235821715](/images/Java/JavaEE/03-1Response和Requests/image-20211203235821715.png)

```java
@WebServlet(
        name = "testRes1",
        urlPatterns = {"/test-res-1"},
        description = "testRes"

)
public class testRes1 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        完成发送文件给客户端的操作
        String realPath = getServletContext().getRealPath("/01.jpg");
//        截取这个字符串最后一个\+1的index及之后的内容，
        String substring = realPath.substring(realPath.lastIndexOf("\\") + 1);
//        设置响应头为文件类型 并且将文件名编码设置为utf-8，防止中文乱码的问题
//        resp.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(substring, "UTF-8"));
        
//        如果要让浏览器不直接下载而是展现图片的话：
        resp.setContentType("image/jpg");
        
//        创建一个文件缓冲输入流
        BufferedInputStream inputStream =
                new BufferedInputStream(new FileInputStream(realPath));
//        如果说放在了resources文件夹下，那么这里的new BufferedInputStream()内应该是如下内容
//        getServletContext().getResourceAsStream("/WEB-INF/classes/01.jpg")
//        创建一个缓冲区
        byte[] bytes = new byte[1024];
        int count = 0;
        while ((count = inputStream.read(bytes)) != -1) {
            resp.getOutputStream().write(bytes, 0, count);
        }
        inputStream.close();
        resp.getOutputStream().close();
    }
}

```

### 验证码的实现

这里需要用到一个`Image`类

我也懒得整，直接看网上的教程做一遍

<https://www.cnblogs.com/hxw6/p/10151766.html>

这里放上我的代码，已经能够实现初步的发送图片了，剩下的只要调用下那位作者代码，获取到验证码明文，放到session内即可，剩下的就交给前端来验证

```java
@WebServlet(
        name = "testImagePace",
        urlPatterns = {"/testImagePace"}
)
public class testImagePace extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ImageVerificationCode ivc = new ImageVerificationCode();
        //获取验证码
        BufferedImage image = ivc.getImage();
        String text = ivc.getText();
        System.out.println(text);
//        发送图片
        resp.setContentType("image/jpeg");
//        让浏览器不缓存图片
        resp.setHeader("Pragma", "No-cache");
        resp.setHeader("Cache-Control", "no-cache");
        resp.setDateHeader("Expires", -10);
//        将图片写到输出流中
        ServletOutputStream sos = resp.getOutputStream();
//        这个output实际上调用的还是ImageIO.write(image, "jpeg", sos);
        ImageVerificationCode.output(image, sos);

        sos.close();

    }
}

```

![image-20211204004721307](/images/Java/JavaEE/03-1Response和Requests/image-20211204004721307.png)

而且每次的都不一样

### 实现重定向

![image-20211204121022669](/images/Java/JavaEE/03-1Response和Requests/image-20211204121022669.png)

B一个Web资源接收到客户端A请求后，他会通知客户端A去访问另一个WEb资源C，这个过程叫重定向

常见场景：

- 用户登录
