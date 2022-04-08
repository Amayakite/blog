---
title: 01-初识JavaWeb
date: 2021-12-01 12:53:05
category: JavaWeb
tag:
 - Java
 - JavaWeb
---

## 开始前

​  终于将JavaSE的基础部分搞完了，当然那玩意远远不止那些，有空了得取看看老韩的[算法讲解](https://www.bilibili.com/video/BV1E4411H73v)，老韩是真的牛逼......现在时间是2021年12月1日13:19:56，期待他以后能出更好的课程

​  现在的学习计划：Javaweb一条龙，然后就是算法和linux之类杂七杂八的使用，之后就去面试了

​  如果你看到了这篇文章，我建议你从JavaWeb开始学起，了解这玩意，然后再去玩Spring Boot（那玩意不用代码的...）如果说你直接跳过了这玩意，再去学

## 基本概念

web开发：

- WEB(World Wide Web) 网页的意思，之前在基础部分使用socket的时候也有带过一遍，现在来说说它吧
- 静态Web
  - HTML、CSS
  - 提供给所有人看的数据始终不会发生变化
- 动态Web
  - HTML、CSS、JavaScript
  - 现在百分之九十九的网站都是动态web，例如淘宝、百度、腾讯、Google、GitHub等
  - 提供给所有人看的数据始终会发生变化，每个人在不同的时间，不同的低点看到的信息各不相同
  - 技术栈：Servlet/JSP（Java）、ASP（微软Microsoft）、PHP等

**在Java中，动态WEB资源开发的技术统称为JavaWeb**

如果你是一名阅读者，想要学习JavaWEB，我建议你在正式开始学习前先学习如下内容

- [x] 网络的基础知识：端口、协议等
- [x] HTML
- [x] CSS
- [x] JavaScript
- [x] Vue、React、**JQuery**

Vue和React可以先不学(迟早要学)，但是JQuery是必须要学的，当然还有nodejs如果感兴趣的话可以了解下（还有webpack 如果上面这几个都熟手了甚至可以去当一个前端开发...）

## Web应用程序的概念

Web应用程序：可以提供浏览器访问程序

- `a.html`，`b.html`等多个web资源，这些web资源都可以被外界访问，对外界提供服务
- 就目前来说，能访问到的任何资源，包括这个Blog(目前是使用GitHub Pages搭建，托管在GitHub上)，都存在于这个世界上的某一个角落的计算机上
- URL：统一资源定位符
- 这些统一的Web资源会被放在同一个文件夹下，这就是一个Web应用程序，在Java中，它依赖于Tomcat：服务器
- 一个Web应用由多部分组成
  - HTML、CSS、JS
  - JSP、Servlet
  - Java程序
  - Jar包
  - 配置文件，数据文件（Properties、XML、JSON）

Web应用程序编写完毕后，若想提供给外界访问：需要一个服务器来统一管理

### 静态Web

- `*.htm|html`这些都是网页的后缀，如果服务器上一直存在这些东西，我们就可以直接进行读取

![image-20211201131810873](/images/JavaEE/01-JavaWeb/image-20211201131810873.png)

静态Web存在的缺点：

- Web页面无法动态更新数据（例如用户的信息）
- 所有用户看到的都是同一个页面
  - 轮播图、点击特效、页面跳转等都是JavaScript或者VBScript(微软家的，现在没几个人用)实现的伪动态
- 无法和数据库交互（数据无法持久化，用户无法交互）

### 动态Web

页面会动态展示

- Web的页面展示的效果因人而异（每个用户看到的可能都是不同的页面）

目前来说，可以这样理解（之后Spring Boot的时候会不一样）

![image-20211201132814923](/images/JavaEE/01-JavaWeb/image-20211201132814923.png)

缺点

- 假如服务器的动态Web资源出现了错误（服务器崩了）
- 需要重新编写后台程序（或者重启后台程序）让用户能够继续访问
  - 在早期互联网的时候，这叫停机维护

有点

- Web页面可以动态更新，所有用户看到的都不一定是同一个页面
- 可以与数据库交互，用户数据能够持久化(比如用户注册后，相关信息存储到数据库中)

![image-20211201133526546](/images/JavaEE/01-JavaWeb/image-20211201133526546.png)

## 认识Web服务器

就目前来说，实现Web服务器的方式非常多

几乎每种语言都有各自的实现方法

市面上常见的有：

- ASP

  - 微软家的，国内最早流行的就是它

  - 特点是在HTML嵌入VB脚本，ASP+COM

  - 在ASP开发中，基本一个页面要像这样嵌入代码，每个页面都有几千行的业务逻辑代码，页面极其混乱

  - 维护成本极高

  - 在ASP里面，用的是C#（ASp.net）

    ```html
    <h1>
        <h1>
            <h1></h1>
            <%
               System.out.writeLine("hello world");
               >
        </h1>
    </h1>
    ```

- PHP

  - PHP开发速度很快，功能很强大，跨平台，代码很简单
  - 无法承载大访问量的情况（高并发情况下效率堪忧）
    - 有局限性
  - 只适用于中小型网站：但恰恰国内的大部分网站都是中小型的。。。所以比较多人用
  - 常见的人人都能用的大概有：WordPress（挺好用的Blog网站）

- JSP/Servlet

  - Sun公司（目前被甲骨文收购了）主推的B/S架构
    - B/S:浏览器和服务器
    - C/S:客户端和服务器
  - JSP的本质是Servlet
  - 基于Java语言（恰好所有的大公司，或者一些开源的组件，都使用Java写的）
  - 可以承载三高带来的影响（高并发。高可用。高性能）
  - 语法很像ASP-->ASP可以转JSP，加强市场强度

- NodeJs

  - 一般是搭配egg(Koa)来完成搭建WEB服务器
  - 好处是JavaScript一条龙
  - 坏处是：JavaScript是一个单线程的语言（虽然效率较高）

- 还有很多，例如Python的Django、Flask等，这类不多做讲解了

## Web服务器

服务器是一种被动的操作，用来处理的一些请求和给用户相应一些信息

### IIS

微软的，可以跑ASP.net windows系统中自带

### TomCat

这玩意应该面向百度编程：上百度查查[这玩意](https://baike.baidu.com/item/tomcat/255751?fr=aladdin)

​  Tomcat是Apache 软件基金会（Apache Software Foundation）的Jakarta 项目中的一个核心项目，由[Apache](https://baike.baidu.com/item/Apache/6265)、Sun 和其他一些公司及个人共同开发而成。由于有了Sun 的参与和支持，最新的Servlet 和JSP 规范总是能在Tomcat 中得到体现，Tomcat 5支持最新的Servlet 2.4 和JSP 2.0 规范。因为Tomcat 技术先进、性能稳定，而且**免费(免费的才是最好的)**，因而深受Java 爱好者的喜爱并得到了部分软件开发商的认可，成为比较流行的Web 应用服务器。

​  Tomcat 服务器是一个免费的开放源代码的Web 应用服务器，属于轻量级应用[服务器](https://baike.baidu.com/item/服务器)，在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试JSP 程序的首选。**对于一个Java初初学WEB的人来说，可以这样认为，当在一台机器上配置好Apache 服务器**，可利用它响应[HTML](https://baike.baidu.com/item/HTML)（[标准通用标记语言](https://baike.baidu.com/item/标准通用标记语言/6805073)下的一个应用）页面的访问请求。实际上Tomcat是Apache 服务器的扩展，但运行时它是独立运行的，所以当你运行tomcat 时，它实际上作为一个与Apache 独立的进程单独运行的。

​  诀窍是，当配置正确时，Apache 为HTML页面服务，而Tomcat 实际上运行JSP 页面和Servlet。另外，Tomcat和[IIS](https://baike.baidu.com/item/IIS)等Web服务器一样，具有处理HTML页面的功能，另外它还是一个Servlet和JSP容器，独立的Servlet容器是Tomcat的默认模式。不过，Tomcat处理静态[HTML](https://baike.baidu.com/item/HTML)的能力不如Apache服务器。Tomcat最新版本为10.0.5**。**

工作3~5年之后，可以尝试手写一个TomCat

ps：手写一个这玩意应该不难

### TomCat的基本使用

### 下载

先进入[官网](https://tomcat.apache.org/)

可以看到自己应该选择哪种版本，这里我是JDK1.8 所以选择10.0.x版本，当然，一般也可以选9，都差不多

![image-20211201144410171](/images/JavaEE/01-JavaWeb/image-20211201144410171.png)

然后根据自己的系统(windows x64 or x86)下载对应的压缩包即可，Linux下载tar.gz即可

![image-20211201144552317](/images/JavaEE/01-JavaWeb/image-20211201144552317.png)

### 使用

在上一步中，下载到了一个压缩包，直接解压，得到这些文件：

![image-20211201145309735](/images/JavaEE/01-JavaWeb/image-20211201145309735.png)

接下来尝试启动和关闭TomCat

先进入到bin目录，然后试图启动，发现了如下问题：

```powershell
PS C:\Users\U\Desktop\apache-tomcat-10.0.13\bin> .\startup.bat

Neither the JAVA_HOME nor the JRE_HOME environment variable is defined
At least one of these environment variable is needed to run this program
```

解决方法：打开文本编辑器，把`startup.bat`拉进去，在最前面加上

```bash
set JAVA_HOME=C:\Program Files\Java\jdk-1.8.0_60       #（本机jdk安装目录）
set JRE_HOME=C:\Program Files\Java\jdk-1.8.0_60\jre         #（本机jre安装目录）
```

![image-20211201150237458](/images/JavaEE/01-JavaWeb/image-20211201150237458.png)

大概这样即可，然后再次重试启动：

![image-20211201150302986](/images/JavaEE/01-JavaWeb/image-20211201150302986.png)

发现启动时启动了，但是出现了乱码的情况

根据百度得出[解决方法](https://blog.csdn.net/qq_25775675/article/details/104839569)

修改`conf`文件下的`logging.properties`文件,将控制台输出的编码修改为GBK：

当然，这一步是可选的，等下到IEDA上跑就不会出现这样的问题了（改了反而可能会出问题）

```properties
java.util.logging.ConsoleHandler.encoding = GBK
```

完美解决

![image-20211201150522519](/images/JavaEE/01-JavaWeb/image-20211201150522519.png)

目前来说，我们接触到的脚本就两个：

![image-20211201150659131](/images/JavaEE/01-JavaWeb/image-20211201150659131.png)

关闭手动关跟通过脚本关都可（一般直接关即可，不需要那个关闭脚本）

启动完毕后，访问下<http://localhost:8080/>即可看到

它的相关端口信息（为什么能通过8080访问到）都是配置在`conf`目录下的`server.xml`XML文件中

可以通过更该这个`port="8080"`中的8080改成想要的端口，如：80

修改完毕后需要重启服务

![image-20211201152650445](/images/JavaEE/01-JavaWeb/image-20211201152650445.png)

更该主机IP地址同理：改这个字段即可

![image-20211201152822485](/images/JavaEE/01-JavaWeb/image-20211201152822485.png)

> 小TIPs：如果将这个Localhost更换成例如：`www.a.com`试图直接访问是访问不到的，因为其默认是将服务开启到本机上（本质还是：127.0.0.1:8080）
>
> 所以可以通过修改系统host的方式来将其重定向`127.0.0.1    www.a.com`（域名重定向）
>
> 当然，如果是在一台服务器上跑，比如`1.1.1.1`，并且这里填写的是`1.1.1.1`那么是可以访问到的

我们访问的localhost:8080的网页文件在`webapps/ROOT`目录下

![image-20211201151931839](/images/JavaEE/01-JavaWeb/image-20211201151931839.png)

可以在这个目录下看到一个`index.jsp`文件，打开后会有种熟悉的感觉：很像React、Vue

里面很像HTML代码，但是又包含一些特殊的东西：用`${}`包裹了一些内容，，如果你学过React、Vue之类的，应该对这个玩意不陌生，是一个**模板字符串**，其具体的内容由脚本控制，当视图在上面改动一些东西，刷新页面，也会同步刷新（就像是用XXX CLI那样）

![image-20211201152144151](/images/JavaEE/01-JavaWeb/image-20211201152144151.png)

例如我替换下原来的Home之类的字段

```html
<span id="nav-home"><a href="${tomcatUrl}">首页</a></span>
<span id="nav-hosts"><a href="${tomcatDocUrl}">文档</a></span>
<span id="nav-config"><a href="${tomcatDocUrl}config/">配置文件</a></span>
```

刷新网页，发现同步更新了

接下来可以尝试去配置环境变量等杂七杂八的东西，当然也可以不配置（等下是要到IEDA上跑的）

### 尝试发布一个网站

先把root文件夹复制一份到同级目录下，然后随便改个名字，把除了`WEB-INF`这个文件夹外的所有文件都删了

![image-20211201160439772](/images/JavaEE/01-JavaWeb/image-20211201160439772.png)

这里我的名字是amayakite，你可以根据自己想的更该

然后进入`WEB-INF`目录下，可以看到里面有一个`web.xml`文件，打开

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
这里是一些注释信息，可以删了
-->
<!--
下面的webapp是一些注释头文件，不能删
-->
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                      https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
  version="5.0"
  metadata-complete="true">

    <!--
 下面这两个 一个是名字 一个是 注释 可以删掉或自由更改
    -->
  <display-name>Welcome to Tomcat</display-name>
  <description>
     Welcome to Tomcat
  </description>

</web-app>

```

然后将你之前通过任意前端技术写的东西（如：Jquery Vue  React等写出来的项目的最终文件(build文件，JQuery直接上文件即可)）丢到`amayakite`(你起的名字的文件夹下)，需要确保至少有一个index.html文件（我这里是用VuePerss打包后的文件）

如果说你不会jq、vue、react之类的话，...就写个index.html，然后里面随便写点内容吧

![image-20211201160935278](/images/JavaEE/01-JavaWeb/image-20211201160935278.png)

然后在启动Tomcat，在浏览器中输入`域名|ip地址:端口/文件夹名`即可访问，这样访问的话默认是访问该文件夹下的index.html或index,jsp，也可以手动输入要访问哪个文件

可选操作：将原先的root文件夹删掉，把这个文件夹名字改成`ROOT`即可在访问的时候直接`域名|ip地址:端口`访问

> 接下来尝试访问 完美！

![image-20211201161333604](/images/JavaEE/01-JavaWeb/image-20211201161333604.png)

#### Tomcat的webapps目录结构

一个正常的通过Tomcat服务器建设的网站大概是长这样子的：

```md
-- webapps: Tomcat服务器的WEB目录
 - ROOT
 - 其他文件夹
 - amayakite：网站的目录名
  - WEB_INF
   - classes: Java程序
   - lib：web应用所依赖的jar包
   - web.xml：网站的配置文件
       - index.html  网站的首页
       - static
         -css
          -style.css
         -js
         -img
         -等其他的静态资源文件
```

#### 扩展-高频率面试题-网站是如何进行访问的

请谈谈网站是如何进行访问的

1. 用户输入一个域名；回车

2. 电脑检查本机的HOST配置文件下有没有这个域名映射

   1. 有：直接返回对应的IP地址

      ```md
      127.0.0.1 www.a.com
      ```

   2. 没有：去DNS服务器找（DNS服务器上记录了所有的域名端口的对应，一般来说要去DNS服务器首先得通过自身宽带的DNS服务器走一些复杂的交换流程），找的到的话就返回，找不到就返回找不到（报错），当然如果已经访问过的网站（如www.baidu.com）会在本机建立一个缓存，默认情况下，会先到这个缓存中去找，没有的话才回去DNS服务器上走流程

## HTTP的基本概念

在继续之后的学习之前，先来了解下什么是HTTP吧

​  HTTP(超文本传输协议)是一个简单的请求-响应协议，它通常**运行在TCP之上**

- 文本：html、字符串......
- 超文本：图片、音乐、视频、定位、地图......
- HTTP协议的默认端口为80

HTTPS：更安全的HTTP协议

- 默认端口为443

### HTTP的两个时代

- http1.0
  - HTTP/1.0
  - 客户端可以与web服务端连接后，只能获得**一个**web资源，然后断开连接
- http2.0
  - HTTP/1.1
  - 客户端与web服务端连接后，可以获得**多个**web资源，然后断开连接
  - 2.0 头部压缩，采用二进制帧进行传输，解决了1.1的队头阻塞问题

### HTTP请求（Request）

客户端发送请求给服务器

拿访问一次百度举例子吧

当你打开浏览器，输入www.baidu.com之后，实际上你的浏览器向百度发送了如下数据

```md
Request URL: https://www.baidu.com/ 请求地址
Request Method: GET 请求方式
Status Code: 200 OK  状态码
Remote Address: 36.152.44.96:443 远程地址
Referrer Policy: unsafe-url 或者 no-referrer-when-downgrade 一个协议，代表能访问到哪些东西
```

以及一个请求头 这个请求头不多做讲解了，实际上用的时候直接往里面添加一些别的内容即可，比如JWT生成的COOKIE，或者做爬虫的使用借用下这里面的User-Agent

```md
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9 这里设置的是语言
Cache-Control: max-age=0
Connection: keep-alive
Cookie: COOKIE 信息
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36
```

这之中可以细分下：

#### 请求行

- 上方请求体中的请求方式：Get
- 请求方式大概有：get/post/head/delete/put/tract.....常用的就两个（其他的都是今年来新生的）
  - get:请求能够携带的参数比较少，大小有限制，会在浏览器的URL地址栏显示数据，不安全，但高效(当然使用ajax之类的请求是不会在浏览器的url显示数据的)
  - post:请求能够携带的参数没有限制，大小没有限制，不会在浏览器URL地址显示内容，安全但不高效
  - 当然，高不高效对于现在来说已经体验不到什么了，一般来说，get请求数据，post提交数据，这样用即可

#### 请求头

```md
Accept: 告诉服务器这个浏览器所支持的格式
Accept-Encoding: gzip, deflate,告诉服务器 支持哪种编码格式 
Accept-Language: zh-CN,zh;q=0.9 告诉服务器 浏览器的语言环境
Cache-Control: max-age=0 告诉服务器 缓存控制
Connection: keep-alive 告诉服务器，请求完成是断开还是保持连接
```

### HTTP相应(Response)

例如请求百度的响应

```md
Cache-Control: private 缓存控制
Connection: keep-alive 连接：保持连接(保持活着)
Content-Encoding: gzip 编码：gzip
Content-Type: text/html;charset=utf-8 响应数据：html，utf8编码

# 实际上就上面那四个是最有用的

Date: Wed, 01 Dec 2021 08:42:34 GMT 响应时间
Expires: Wed, 01 Dec 2021 08:42:34 GMT 同上
Server: BWS/1.1 浏览器的服务信息
Set-Cookie: BDSVRTM=299; path=/ COOKIE地址
Set-Cookie: BD_HOME=1; path=/
Set-Cookie: COOKIE的内容
Strict-Transport-Security: max-age=172800 一些安全设置
Transfer-Encoding: chunked
X-Frame-Options: sameorigin
X-Ua-Compatible: IE=Edge,chrome=1  浏览器的响应兼容性
```

响应体

```md
Accept: 告诉浏览器，它的数据类型
Accept-Encoding：支持哪种编码格式
Accept-Language：语言环境
Cache-Control：缓存控制
Conection：告诉浏览器，请求完成是断开连接还是保持连接
HOST：主机
Refresh：告诉客户端，多就刷新一次
Location：让网页重新定位
```

200  （成功） 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。
201  （已创建） 请求成功并且服务器创建了新的资源。
202  （已接受） 服务器已接受请求，但尚未处理。
203  （非授权信息） 服务器已成功处理了请求，但返回的信息可能来自另一来源。
204  （无内容） 服务器成功处理了请求，但没有返回任何内容。
205  （重置内容） 服务器成功处理了请求，但没有返回任何内容。
206  （部分内容） 服务器成功处理了部分 GET 请求。

***\*http状态返回代码\** 3xx （重定向）**
表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。

**http状态返回代码** 代码  说明
300  （多种选择） 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。
301  （永久移动） 请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
302  （临时移动） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
303  （查看其他位置） 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。

304  （未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。
305  （使用代理） 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。
307  （临时重定向） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。

***\*http状态返回代码\** 4xx（请求错误）**
这些状态代码表示请求可能出错，妨碍了服务器的处理。

**http状态返回代码** 代码  说明
400  （错误请求） 服务器不理解请求的语法。
401  （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
403  （禁止） 服务器拒绝请求。
404  （未找到） 服务器找不到请求的网页。
405  （方法禁用） 禁用请求中指定的方法。
406  （不接受） 无法使用请求的内容特性响应请求的网页。
407  （需要代理授权） 此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理。
408  （请求超时） 服务器等候请求时发生超时。
409  （冲突） 服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。
410  （已删除） 如果请求的资源已永久删除，服务器就会返回此响应。
411  （需要有效长度） 服务器不接受不含有效内容长度标头字段的请求。
412  （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。
413  （请求实体过大） 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。
414  （请求的 URI 过长） 请求的 URI（通常为网址）过长，服务器无法处理。
415  （不支持的媒体类型） 请求的格式不受请求页面的支持。
416  （请求范围不符合要求） 如果页面无法提供请求的范围，则服务器会返回此状态代码。
417  （未满足期望值） 服务器未满足"期望"请求标头字段的要求。

***\*http状态返回代码\** 5xx（服务器错误）**
这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错。

**http状态返回代码** 代码  说明
500  （服务器内部错误） 服务器遇到错误，无法完成请求。
501  （尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
502  （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。
503  （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。
504  （网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
505  （HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本。

一些常见的**http状态返回代码**为：

## HTTP 状态码分类

HTTP 状态码由三个十进制数字组成，第一个十进制数字定义了状态码的类型。响应分为五类：信息响应(100–199)，成功响应(200–299)，重定向(300–399)，客户端错误(400–499)和服务器错误 (500–599)：常见的有：200/204/304/404/503

| 分类 | 分类描述                                       |
| :--- | :--------------------------------------------- |
| 1**  | 信息，服务器收到请求，需要请求者继续执行操作   |
| 2**  | 成功，操作被成功接收并处理                     |
| 3**  | 重定向，需要进一步的操作以完成请求             |
| 4**  | 客户端错误，请求包含语法错误或无法完成请求     |
| 5**  | 服务器错误，服务器在处理请求的过程中发生了错误 |

HTTP状态码列表:

| 状态码 | 状态码英文名称                  | 中文描述                                                                                                                                                         |
| :----- | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 100    | Continue                        | 继续。客户端应继续其请求                                                                                                                                         |
| 101    | Switching Protocols             | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议                                                                   |
|        |                                 |                                                                                                                                                                  |
| 200    | OK                              | 请求成功。一般用于GET与POST请求                                                                                                                                  |
| 201    | Created                         | 已创建。成功请求并创建了新的资源                                                                                                                                 |
| 202    | Accepted                        | 已接受。已经接受请求，但未处理完成                                                                                                                               |
| 203    | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本                                                                                             |
| 204    | No Content                      | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档                                                                         |
| 205    | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域                                                               |
| 206    | Partial Content                 | 部分内容。服务器成功处理了部分GET请求                                                                                                                            |
|        |                                 |                                                                                                                                                                  |
| 300    | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择                                                           |
| 301    | Moved Permanently               | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替                                   |
| 302    | Found                           | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI                                                                                               |
| 303    | See Other                       | 查看其它地址。与301类似。使用GET和POST请求查看                                                                                                                   |
| 304    | Not Modified                    | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305    | Use Proxy                       | 使用代理。所请求的资源必须通过代理访问                                                                                                                           |
| 306    | Unused                          | 已经被废弃的HTTP状态码                                                                                                                                           |
| 307    | Temporary Redirect              | 临时重定向。与302类似。使用GET请求重定向                                                                                                                         |
|        |                                 |                                                                                                                                                                  |
| 400    | Bad Request                     | 客户端请求的语法错误，服务器无法理解                                                                                                                             |
| 401    | Unauthorized                    | 请求要求用户的身份认证                                                                                                                                           |
| 402    | Payment Required                | 保留，将来使用                                                                                                                                                   |
| 403    | Forbidden                       | 服务器理解请求客户端的请求，但是拒绝执行此请求                                                                                                                   |
| 404    | Not Found                       | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面                                                     |
| 405    | Method Not Allowed              | 客户端请求中的方法被禁止                                                                                                                                         |
| 406    | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                                                                                                                       |
| 407    | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权                                                                                                  |
| 408    | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                                                                                                                         |
| 409    | Conflict                        | 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突                                                                                          |
| 410    | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置                                 |
| 411    | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息                                                                                                           |
| 412    | Precondition Failed             | 客户端请求信息的先决条件错误                                                                                                                                     |
| 413    | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息    |
| 414    | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理                                                                                                                   |
| 415    | Unsupported Media Type          | 服务器无法处理请求附带的媒体格式                                                                                                                                 |
| 416    | Requested range not satisfiable | 客户端请求的范围无效                                                                                                                                             |
| 417    | Expectation Failed              | 服务器无法满足Expect的请求头信息                                                                                                                                 |
|        |                                 |                                                                                                                                                                  |
| 500    | Internal Server Error           | 服务器内部错误，无法完成请求                                                                                                                                     |
| 501    | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                                                                                                                             |
| 502    | Bad Gateway                     | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应                                                                                   |
| 503    | Service Unavailable             | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中                                                              |
| 504    | Gateway Time-out                | 充当网关或代理的服务器，未及时从远端服务器获取请求                                                                                                               |
| 505    | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理                                                                                                                   |

### 扩展-面试必问：当你的浏览器中地址栏输入回车的一瞬间到页面能够展示回来，经历了什么？

这道题暂时先不说明把。学完JavaWeb应该就明白了，或者回头百度即可

给个tips：http的底层依旧是TCP/IP
