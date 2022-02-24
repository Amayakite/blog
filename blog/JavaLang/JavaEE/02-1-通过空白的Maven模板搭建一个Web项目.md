---
title: 02-1-通过空白的Maven模板搭建一个Web项目
date: 2021-12-02 16:07:23
category: JavaWeb
tag:
 - Java
 - JavaWeb
 - maven
---

我TM真的有点服了某些讲课的...硬生生的看了一下午的视频，不如自己动手折腾两下

在开始前，必须要明确的点是：

Maven就一个包管理工具 Maven就一个包管理工具 Maven就一个包管理工具 Maven就一个包管理工具

## 创建一个空白项目前需要做的事情

### 设置下默认的maven版本、配置文件、仓库路径

防止每次都需要自己手动到设置中调

如果说你已经打开了一个项目，就：



如果没打开的话应该也是能找到这个配置，反正在这里面能够找到Maven的路径，然后进行修改即可：

![image-20211202161214531](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202161214531.png)

理论上来说，新版的IDEA，会在你读取Maven的主路径的时候，自动读取`本地仓库`地址

## 创建一个空白项目，并检查相关配置

就按照往常的来，新建一个空白的maven项目，然后填写下相关的信息

![image-20211202161437222](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202161437222.png)

这个工作坐标之类的随意填写，或者就按照默认的来即可，不影响

## 准备工作-创建一系列的文件

首先，在src-main目录下，创建一个webapp文件夹

然后打开tomcat的webapps文件夹，把里面的ROOT文件夹中的`WEB-INF`文件夹整个拷贝过来

然后在这个`WEB-INF`文件夹内新建一个`index.jsp`

![image-20211202162008344](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202162008344.png)

当你放置完这些文件的时候，右下角百分之一千会出现一个：配置web框架

![image-20211202162231845](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202162231845.png)

如果说没有的话，按下`ctrl+alt+shift+s`或者点击`文件-项目结构`调出项目配置，在里面这样配置

![image-20211202162747976](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202162747976.png)

还有那个**创建工作** 一定要点一下（右下角的）

然后把那个index.jsp删了，重新创建一个，系统会给你一个模板 不要删 不管他

```html
<%--
  Created by IntelliJ IDEA.
  User: Amayakite
  Date: 2021/12/2
  Time: 16:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

</body>
</html>

```

## 创建Java文件，让我们的Java中的内容能在网页上显示

完成上面的步骤之后，接下来要做的就是：在java中创建一个MyApps文件

如果你要追求规范，也可以这样创建：`com.localhost.www.MyApps.java`

这里我选择后者吧，毕竟以后都是要这样做的

然后你就能得到一个这样的文件：

![image-20211202163103074](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163103074.png)

接下来打开tomcat，看下里面的examples中的案例-我们该怎样在Java中来渲染网页

启动完tomcat后，我们进入到examples目录下，选择第一个

![image-20211202163705993](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163705993.png)

然后可以看到各种案例模板，每个案例左边是预览，右边是代码，我们直接点右边（在网页上渲染一个Hello World）

![image-20211202163733098](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163733098.png)

得到了如下代码：

```
import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

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

然后我们在IEDA中先输入这个`HttpServlet`，看看当前有没有这个包

![image-20211202163907316](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163907316.png)

发现没有，这个时候有个添加Maven依赖项

点进去，发现啥都没有

![image-20211202163937171](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163937171.png)

如果有的话，就直接从这里面选就行了，但是这里没有

### 去Maven仓库找到对应的包，并加入依赖

首先，我们得到的代码中包含了如下信息

```java
import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

    说明这个HttpServlet一定是在jakarta.servlet或者jakarta.servlet.http这个包下的，所以只需要去仓库中搜索
```

在[Maven仓库](https://mvnrepository.com/)中搜索，得到了如下结果

![image-20211202164457153](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164457153.png)

接下来进去找到对应版本的包：

![image-20211202164615204](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164615204.png)

得到了如下安装代码：

```xml
<!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api -->
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-servlet-api</artifactId>
    <version>10.0.13</version>
</dependency>
```

然后再加入到`pom.xml`中即可

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>16-myJavaWebProjcet</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    
    <dependencies>
    <!-- 在这里插入-->
        <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api -->
        <dependency>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-servlet-api</artifactId>
            <version>10.0.13</version>
        </dependency>
    </dependencies>
</project>
```

然后点击这个加载变更

![image-20211202164738547](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164738547.png)

过了几秒后，能看到Maven的依赖库中多了个玩意出来

![image-20211202164820053](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164820053.png)

回到代码，尝试写入

![image-20211202164841675](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164841675.png)

直接就有个导入类了，看来是没错的

然后继续把剩下的代码粘贴上去，哪里红了导哪里

我这里额外加了一句设置编码的，防止乱码

```java
package com.localhost.www;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 16-myJavaWebProjcet
 * @BelongsPackage com.localhost.www
 * @date 2021/12/2 16:30
 * @description 项目描述
 */
public class MyApps extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        
        //设置UTF-8编码
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Hello World!</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>Hello World!</h1>");
        out.println("<h1>Hello World!22222</h1>");
        out.println("<h1>Hello World!22222</h1>");
        out.println("<h1>Hello World!3333</h1>");
        out.println("<h1>Hello World!44444</h1>");
        out.println("</body>");
        out.println("</html>");
    }
}

```

至此，Java代码部分就完成了

## 配置web.xml文件-添加路由

md大部分鸟人这里讲的云里雾里的，我这里先放最终文件吧

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--这里是我们直接拷贝的tomcat的配置文件头-->
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                      https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
         version="5.0"
         metadata-complete="true">

    <!--    注册一个Servlet 这个就相当于注册一个路由一样-->
    <servlet>
<!--        这里是这个路由的名字-->
        <servlet-name>MyApps</servlet-name>
<!--        这里是这个路由的实际文件位置(class文件)-->
        <servlet-class>com.localhost.www.MyApps</servlet-class>
    </servlet>

    <!--    然后将这个路由绑定到指定的路由地址中  就相当于这里创建了一个真正的Router 然后绑定一个个的route-->
    <servlet-mapping>
<!--        这里是绑定的路由-->
        <servlet-name>MyApps</servlet-name>
        <!--  这个是请求路径-->
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>

    <!--这两个可以省略-->
    <display-name>Welcome to Tomcat</display-name>
    <description>
        Welcome to Tomcat
    </description>

</web-app>
```

接下来一点一点的分析：实际上我们就添加了两端代码

```xml
<!--    注册一个Servlet 这个就相当于注册一个路由一样-->
<servlet>
    <!--        这里是这个路由的名字-->
    <servlet-name>MyApps</servlet-name>
    <!--        这里是这个路由的实际文件位置(class文件)-->
    <servlet-class>com.localhost.www.MyApps</servlet-class>
</servlet>
```

这里就相当于是申明了一个route，就像在Vue Router中声明了一个字路由（没有path的那种）一样：

```js
route={
    name:"Myapps",
    component:()=>require("com/local/www/Myapps")
}
```

然后是：这里就相当于是一个总**Router**，里面可以给各个子路由配置相关的路径

```xml
<!--    然后将这个路由绑定到指定的路由地址中  就相当于这里创建了一个真正的Router 然后绑定一个个的route-->
<servlet-mapping>
    <!--        这里是绑定的路由-->
    <servlet-name>MyApps</servlet-name>
    <!--  这个是请求路径-->
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
```

如果放在Vue router中 大概长这样：

```js
router ={
    component:router.component,
    name:router.name,
    path:"/hello"
}
```

如果说你没有学过其他的语言的话就当没看到这个js吧。

## 配置tomcat

在左上角或者右上角找到这个添加配置

![image-20211202170123541](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202170123541.png)

然后Tomcat的路径之类的这里就不说明了，在部署这里选择刚刚创建的工作

![image-20211202170701479](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202170701479.png)

如果说你点击这个加号没有显示工作的话

![image-20211202170737182](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202170737182.png)

那就先回到这一步`打开项目结构`：`ctrl+alt+shift+s`

检查右下角这个是不是像这样提示，如果是的话，点击创建工作，然后返回tomcat继续配置即可

![image-20211202170831500](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202170831500.png)

然后我们再把上下文该个好记的

![image-20211202171146353](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171146353.png)

然后运行tomcat：

你就能得到一个啥都没有的页面：

![image-20211202171207069](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171207069.png)

为啥呢？

你还记得之前配置的Servlet(Router)吗

我们的router是绑定了一个在该目录下的`hello`

我们接下来进入`/hello`试试

![image-20211202171218874](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171218874.png)

是不是有一丢丢小激动

TMD，这玩意坑倒是不多，讲课的SB多。

## 补充-更新页面

比方说，我在Java程序中添加了一些其他的话：

![image-20211202171334898](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171334898.png)

这个时候刷新页面是不管用的，点一下这里

![image-20211202171416767](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171416767.png)

选择这个

![image-20211202171505255](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171505255.png)

然后刷新网页，你就能看到更新后的内容了

![image-20211202171519474](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171519474.png)

当然如果没有动java文件，只需要点那个**更新类和资源即**可

如果说你要在这个网站中添加一些其他的页面，比如a.html

那么添加完毕后直接访问相对应的资源即可

我这里创建一个my.html演示

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div class="myapps">
    My Apps

</div>
</body>
<style>
    .myapps {
        width: 100%;
        height: 100%;
        background-color: #4160d7;
        text-align: center;
        padding-top: 20px;
        color: aliceblue;
    }
</style>
</html>
```

点击更新类和资源

![image-20211202171956804](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171956804.png)

进入这个页面

![image-20211202172009924](/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202172009924.png)

好了，项目配置完毕，接下来去学些更令人舒畅的玩意吧

