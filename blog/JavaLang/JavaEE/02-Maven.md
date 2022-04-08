---
title: 02-使用Maven
date: 2021-12-01 12:53:05
category: JavaWeb
tag:

 - Java
 - JavaWeb
 - maven
---

## 初始Maven

在正式开始这个东西之前，我们回顾下之前学习内容

在使用JDBC对数据库进行管理的时候，我们在`libs`目录下导入了几个`jar`包，分别是

- 操控Mysql的
- C3P0
- Druid 管理连接池
- apache-common-utils 管理数据

我们下载那些包的过程并不短，甚至有些繁琐...在JavaWeb开发中，可能有大量的Jar包需要导入，比如看下Tomcat中lib目录下的jar包

![image-20211201180718966](/images/JavaEE/02-Maven/image-20211201180718966.png)

33个，如果说手动导入的话。。。可能得花一阵子时间

这个时候需要一个东西，它能通过简单的配置来帮我们自动导入和配置这个Jar包

这时，就需要用到Maven

Maven是一个**项目架构管理工具**，类似于Python中的pip包管理工具和Nodejs中的NPM包管理工具

我们目前用它来就是方便倒入jar包

Maven的核心思想：**约定大于配置**

- 有约束，不要去违反

Maven会规定好我们改如何去编写Java代码---必须要按照这个规范来（目录结构）

### 下载安装Maven

进入Maven的[官方下载页面](https://maven.apache.org/download.cgi)

根据自己的系统下载相应的二进制压缩包文件

![image-20211201181327547](/images/JavaEE/02-Maven/image-20211201181327547.png)

下载后解压，得到如下东西：

![image-20211201181517711](/images/JavaEE/02-Maven/image-20211201181517711.png)

然后打开conf下的setting.xml，这里有个东西要额外说明下（正常使用的话按照默认配置来即可，不需要做过多的改动）

```xml
<mirrors>
    <!-- 

    Mirrors：镜像：方便下载使用
    Maven自带的镜像是国外的，国内有强，我们访问外网会非常的慢
    可以通过设置成国内镜像或者使用梯子的方式解决
 下面那个注释也是默认注释的，暂时可以不用管
   -->
    <!-- mirror
     | Specifies a repository mirror site to use instead of a given repository. The repository that
     | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
     | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
     |
    <mirror>
      <id>mirrorId</id>
      <mirrorOf>repositoryId</mirrorOf>
      <name>Human Readable Name for this Mirror.</name>
      <url>http://my.repository.com/repo/path</url>
    </mirror>
     -->
    <mirror>
        <id>maven-default-http-blocker</id>
        <mirrorOf>external:http:*</mirrorOf>
        <name>Pseudo repository to mirror external repositories initially using HTTP.</name>
        <url>http://0.0.0.0/</url>
        <blocked>true</blocked>
    </mirror>
</mirrors>
```

### 更换镜像为阿里云

[官方帮助链接](https://developer.aliyun.com/mvn/guide)

![image-20211201211729442](/images/JavaEE/02-Maven/image-20211201211729442.png)

按照这个流程走一遍即可

最终结果：

```xml
  <mirrors>
    <!-- 

    Mirrors：镜像：阿里云 只保留这一个

   -->
    <mirror>
      <id>aliyunmaven</id>
      <mirrorOf>*</mirrorOf>
      <name>阿里云公共仓库</name>
      <url>https://maven.aliyun.com/repository/public</url>
    </mirror>


  </mirrors>
```

### 配置环境变量

这玩意是需要配置**系统环境**变量的

首先分别新建两个系统变量：`M2_HOME`为Maven的bin目录

![image-20211201210452874](/images/JavaEE/02-Maven/image-20211201210452874.png)

然后是`MAVEN_HOME`为Maven的目录

![image-20211201214857626](/images/JavaEE/02-Maven/image-20211201214857626.png)

最终的效果大概是这样的：

![image-20211201214944585](/images/JavaEE/02-Maven/image-20211201214944585.png)

然后再在系统Path变量中添加如下条目：

`%M2_HOME%`

![image-20211201211039308](/images/JavaEE/02-Maven/image-20211201211039308.png)

然后保存并关闭

打开shell，输入

```shell
mav --version
# 看到和下面内容差不多的表示安装完毕
Maven home: D:\apache-maven-3.8.4
Java version: 1.8.0_302, vendor: Temurin, runtime: C:\Program Files\Eclipse Foundation\jdk-8.0.302.8-hotspot\jre
Default locale: zh_CN, platform encoding: GBK
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
```

PS：为什么要多此一举配一个`M2_HOME`，直接配一个`MAVEN_HOME`然后在环境变量中`%MAVEN_HOME%\bin`不就可以了吗？

实际上这一步是为之后的Spring Boot做铺垫，那些框架是直接引用系统变量中的`M2_HOME`这个地址

### 建立本地仓库

其实就是修改了下默认的jar包之类的下载位置，方式很简单，在conf下的setting.xml中添加一段话即可：`<localRepository>${MAVEN_HOME}/maven-repo</localRepository>`

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">https://maven.apache.org/xsd/settings-1.2.0.xsd">
  <!-- 下面这里是默认的本地仓库目录，在用户名下的.m2文件夹：C:\Users\用户名\.m2 -->
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
<!-- 更换为在maven目录下 -->
  <localRepository>MAVEN安装目录，这里自己输入/maven-repo</localRepository>
    .......
</settings>
```

## 在IEDA中使用Maven

打开IEDA，Create Project

然后勾选的内容如图所示-->从原型创建+maven-archetype-webapp

**从原型创建**表示：这个项目使用Maven提供的一些模板

我们先使用Maven创建一个Web项目

### 使用Maven创建一个Web项目

maven-archetype-webapp表示：这是一个web应用

![image-20211201213609564](/images/JavaEE/02-Maven/image-20211201213609564.png)

然后继续下一步

之后和往常一样填写项目名，直到这一步时：

![image-20211201215824895](/images/JavaEE/02-Maven/image-20211201215824895.png)

然后

![image-20211201220017673](/images/JavaEE/02-Maven/image-20211201220017673.png)

配置完上面这两项后

可以在IEDA中看到：下方不停的有东西正在下载，如果没有东西正在下载的话，说明Maven配置文件有误(settings.xml)或者是IEDA和Maven版本不兼容

![image-20211201222224490](/images/JavaEE/02-Maven/image-20211201222224490.png)

当看到如下消息表示下载完毕

![image-20211201222744077](/images/JavaEE/02-Maven/image-20211201222744077.png)

这个时候进入到我们设置的Maven的本地仓库目录下，可以看到多出来了很多文件

![image-20211201222825095](/images/JavaEE/02-Maven/image-20211201222825095.png)

这表示依赖都下载完毕了，同时我们查看刚刚创建的项目中的文件：

可以看到`pom.xml`相比于刚创建时多出了很多数据（如果你有注意到的话）

![image-20211201223032384](/images/JavaEE/02-Maven/image-20211201223032384.png)

#### 在IEDA中设置Maven路径

**IEDA项目创建成功务必要看这一眼**

![image-20211201223552661](/images/JavaEE/02-Maven/image-20211201223552661.png)

然后配置下相关信息

![image-20211201223843588](/images/JavaEE/02-Maven/image-20211201223843588.png)

自此，Maven配置完毕，接下来我们看下都有哪些文件

可以很清晰的看到，这里面是一个标准的Tomcat的文件格式，这就是一个标准的java web 应用格式

![image-20211201224229408](/images/JavaEE/02-Maven/image-20211201224229408.png)

貌似少了些什么，我们再创建一个普通的Maven项目看看

#### 创建一个普通的Maven项目

![image-20211201224607370](/images/JavaEE/02-Maven/image-20211201224607370.png)

直接一路next

然后发现项目中拥有的内容不一样了

可以很清晰的明白：main.java是放置Java源代码的

main.resources是放置一些配置文件的

test.java是用来测试的

遵循**约定大于配置**

![image-20211201224755008](/images/JavaEE/02-Maven/image-20211201224755008.png)

然后还可以看到一个非常干净的配置文件

这就是初始的Maven配置文件

![image-20211201225035416](/images/JavaEE/02-Maven/image-20211201225035416.png)

并且：这个Maven并且变回了IEDA自带的版本....

![image-20211201224621994](/images/JavaEE/02-Maven/image-20211201224621994.png)

好了，这个小细节就先不管了，返回我们的JavaWeb项目，将这里面的文件夹都在那里新建一个

最终效果大概这样

![image-20211201225523654](/images/JavaEE/02-Maven/image-20211201225523654.png)

## 在Maven项目中使用Tomcat

首先点击这个添加配置 当然这玩意有可能在右上角

![image-20211201232124011](/images/JavaEE/02-Maven/image-20211201232124011.png)

然后点击添加配置

搜索tomcat，并选择**tomcat-本地**

![image-20211201232430919](/images/JavaEE/02-Maven/image-20211201232430919.png)

然后弹出一个窗口，填写下名称（随意）和填写Tomcat路径，填写完毕后会有个警告

![image-20211201232825003](/images/JavaEE/02-Maven/image-20211201232825003.png)

我们点击部署，点击加号-工作，会弹出新建工作区

![image-20211201233010080](/images/JavaEE/02-Maven/image-20211201233010080.png)

会弹出这个，选择第一个即可

![image-20211201233038476](/images/JavaEE/02-Maven/image-20211201233038476.png)

这样就成功解决了警告问题

PS：这里有个应用程序上下文，是项目的名称，

如果改成了`/`，则在后面启动时，访问的是Tomcat下的root文件夹

![image-20211201233244143](/images/JavaEE/02-Maven/image-20211201233244143.png)

我这里可以将它改成除了`/`以外的任何内容（并且不和Toncat现有的文件夹重名），例如这样：

![image-20211201234437048](/images/JavaEE/02-Maven/image-20211201234437048.png)

之后启动可以，可以在自动弹出的浏览器内看到如下内容

如果说启动的时候出现什么端口1099错误：把这个1099改成别的，比如1186 11451 或者删掉就行

> 出现 SSL HTTP Connector node not found错误的，点击run里的edit configurations将HTTP的1099去掉就行了 ----摘自网上

![image-20211201234927882](/images/JavaEE/02-Maven/image-20211201234927882.png)

![image-20211201234618325](/images/JavaEE/02-Maven/image-20211201234618325.png)

同时，我们若想预览更新后的内容，只需要：

![image-20211201234752963](/images/JavaEE/02-Maven/image-20211201234752963.png)

更改完毕后这样操作即可，然后刷新浏览器，就能看到我们更新后的内容

![image-20211201235100017](/images/JavaEE/02-Maven/image-20211201235100017.png)

### 扩展-Maven在IEDA右侧的操作栏

![image-20211201235408534](/images/JavaEE/02-Maven/image-20211201235408534.png)

## POM.XML文件的讲解

可能你从开始到现在都对这个文件`pom.xml`不是很理解，甚至不知道它是干嘛用的

可以这样说，如果你接触过Vue、React等东西，可以知道他们中有个很重要的`package.json`

这个的作用就相当于这类东西

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--Maven版本和头文件-->
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!--这里是项目的GAV-->
    <groupId>org.example</groupId>
    <artifactId>15-Java-Web-Mave</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!--  项目的打包方式
      jar: jar应用
      war: JavaWeb应用
    -->
    <packaging>war</packaging>
    <!--项目的名称 可以删-->
    <name>15-Java-Web-Mave Maven Webapp</name>
    <!-- 这个是项目最终的网站 可以删 -->
    <url>http://localhost:8080</url>
<!--项目的配置-->
    <properties>
<!--        项目的默认结构和编码-->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
<!--        项目最终编译打包输出的Java版本 默认是1.7 一般会改成1.8
            无论是1.7还是1.8，都不影响项目的运行
-->

        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
<!--项目依赖-->
    <dependencies>
<!--        具体依赖的jar包配置文件-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
<!--项目构建用的东西，比如说一些依赖的jar包，这个是我们使用了ieda这个模板导致的-->
    <build>
 .........
    </build>
</project>

```

我们现在先停住，返回到之前创建的那个空白的maven项目中

可以看到一个相当干净的配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>15-1-Maven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

</project>
```

接下来我们把他稍作修改，将在web那的东西copy过来

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>15-1-Maven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
        </dependency>
        
    </dependencies>


</project>
```

## 自由的添加依赖(Jar包)

接下来开始展现他神奇的地方

先到[Maven的仓库网站](https://mvnrepository.com/)中，搜索Spring 可以看到下载量比较多的是一个叫`Spring context`的东西

![image-20211202002108092](/images/JavaEE/02-Maven/image-20211202002108092.png)

我们就用最上面的那个吧，5.3.13

点进去，可以看到这些

![image-20211202002143589](/images/JavaEE/02-Maven/image-20211202002143589.png)

复制这段xml代码，粘贴到我们的`pom.xml`当中

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>15-1-Maven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
        </dependency>
        
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.13</version>
        </dependency>
        
    </dependencies>


</project>


```

然后你就可以看到IEDA下方的进度条亮了（如果没亮的话手动点下同步）

在进度条结束之后，能在IEDA的Maven管理页面中看到多出了这个包的内容

![image-20211202002349625](/images/JavaEE/02-Maven/image-20211202002349625.png)

这就是Maven的强大之处--一个命令，就能搞定一个包的下载，同时，**会下载其所有的依赖项**

接下来尝试安装下[HuTool工具类包](https://www.hutool.cn/docs/#/?id=%f0%9f%93%a6%e5%ae%89%e8%a3%85)

按照安装教程，这段话添加完毕之后，自动开始下载了，

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.7.16</version>
</dependency>
```

当然，你也可以下载一些其他的包，例如mysql gruid等

接下来我们尝试下用Hutool进行一次简单的生成nanoid：

```java
import cn.hutool.core.lang.id.NanoId;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 15-1-Maven
 * @BelongsPackage PACKAGE_NAME
 * @date 2021/12/2 0:27
 * @description 项目描述
 */
public class MyApps {
    public static void main(String[] args) {
        String s = NanoId.randomNanoId();
        System.out.println(s);
  //KWn2dpylfcYBq6FmgJHmk 完美的跑起来了!!!
    }
}

```

## 在使用Maven中可能会遇到的导出问题

由于Maven是约定大于配置的，我们之后有可能会遇到我们写的配置文件（xml或者properties等）无法被导出或者失效的问题，[解决方案](https://www.cnblogs.com/pixy/p/4798089.html) 这个问题大概在Mybatis使用的时候会遇到

解决方案：把下面这玩意复制到`pom.xml`中即可

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
<!--                让src下的main下的java中可以导出xml。properties文件-->
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

## 扩展-在IDEA中查看Maven中jar包的依赖数

![image-20211202004820035](/images/JavaEE/02-Maven/image-20211202004820035.png)

点击这个即可

## 在IEDA中使用Maven可能会遇到的问题

### 每次创建版本时，都要手动选择maven版本

在文件-新项目设置中进行设置

![image-20211202115559364](/images/JavaEE/02-Maven/image-20211202115559364.png)

可以看到，默认还是IEDA自带的Maven

![image-20211202115638074](/images/JavaEE/02-Maven/image-20211202115638074.png)

之后再新建项目：

![image-20211202115810365](/images/JavaEE/02-Maven/image-20211202115810365.png)

可以发现，默认的Maven版本变成了自己的

### 误删了pom.xml

如果说不小心把pom.xml误删了，后面创建的这个文件不被识别（所做的修改无法同步到Maven）

打开设置，到这里把创建的pom.xml文件勾上（按照目前版本来说，不勾也可）

![image-20211202120928118](/images/JavaEE/02-Maven/image-20211202120928118.png)

### 关于Maven中WebApp的WEB-INF中的web.xml文件

可以看到，其默认是一个这个：

```xml
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>
</web-app>
```

虽然说改不改都可，但是一般情况下，都会将其改成自己的Tomcat中web.xml中的版本

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                      https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
  version="5.0"
  metadata-complete="true">
<!--下方可以省略->
  <display-name>Welcome to Tomcat</display-name>
  <description>
     Welcome to Tomcat
  </description>

</web-app>

```

### 如何在创建的空白项目中使用tomcat

首先，看下tomcat的examples

![image-20211202122354090](/images/JavaEE/02-Maven/image-20211202122354090.png)

可以看到里面有对应的案例，这里点开第一个

看到了熟悉的Hello World

![image-20211202122421879](/images/JavaEE/02-Maven/image-20211202122421879.png)

点击右边的源码，得到如下内容

![image-20211202122440491](/images/JavaEE/02-Maven/image-20211202122440491.png)

回到IEDA，跟着它写一遍 发现刚写完一个HttpServlet就出现了这个问题

![image-20211202122533941](/images/JavaEE/02-Maven/image-20211202122533941.png)

解决方案很简单：

按下`alt+insert`

![image-20211202122612331](/images/JavaEE/02-Maven/image-20211202122612331.png)

点击添加Maven依赖项

到了这一步，如果说你之前创建过webApp项目，它应该是如下所示的

![image-20211202122800583](/images/JavaEE/02-Maven/image-20211202122800583.png)

这个时候点击第一个即可

如果说你之前没有创建过，那么这里应该是一片空白，这时就要去[Maven仓库](https://mvnrepository.com/)

手动搜索HttpServlet：发现了很多看不懂的东西

![image-20211202123110036](/images/JavaEE/02-Maven/image-20211202123110036.png)

这时，回到Tomcat，Tomcat能运行肯定是有相关的jar包在支持，

```java
import java.io.*;

import jakarta.servlet.*;
import jakarta.servlet.http.*; 
//可以看到，tomcat分别是导入了servlet，servlet.http这两个包下的所有文件，我们再到lib中看看

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

前往`lib`目录，发现了如下内容：servlet-api.jar

![image-20211202123357532](/images/JavaEE/02-Maven/image-20211202123357532.png)

我们再到Maven仓库中进行搜索，得到了如下内容

![image-20211202123622430](/images/JavaEE/02-Maven/image-20211202123622430.png)

这个时候也是得到了一堆，我们再回顾下刚刚在tomcat中看到的格式：

`import jakarta.servlet.*;
import jakarta.servlet.http.*;` 

好了，可以直接锁定是第四个，直接点进去，看到了如下版本：

![image-20211202123853255](/images/JavaEE/02-Maven/image-20211202123853255.png)

这个时候我用的tomcat版本是`apache-tomcat-10.0.13`，所以直接锁定那个10.0.13的安装即可

回到IEDA，在pom.xml中添加如下内容：

```xml
<!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api -->
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-servlet-api</artifactId>
    <version>10.0.13</version>
</dependency>

```

安装完毕后，依赖处多了一个这个

![image-20211202124120984](/images/JavaEE/02-Maven/image-20211202124120984.png)

然后回到刚刚代码处，导入类即可正常使用了

![image-20211202124156578](/images/JavaEE/02-Maven/image-20211202124156578.png)

接着剩下的就复制examples中的代码，有类就导入，最终代码如下：

```java
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 15-1-Maven
 * @BelongsPackage PACKAGE_NAME
 * @date 2021/12/2 0:27
 * @description 项目描述
 */
public class MyApps extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
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

然后在目录中添加如下文件：

![image-20211202130014795](/images/JavaEE/02-Maven/image-20211202130014795.png)

最后在web.xml中写入如下内容（这一步就跟注册路由一样）

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                      https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
         version="5.0"
         metadata-complete="true">
    <!--    注册一个Servlet 这个就相当于注册一个路由一样-->
    <servlet>
        <servlet-name>MyApps</servlet-name>
        <servlet-class>MyApps</servlet-class>
    </servlet>
    <!--    然后将这个路由绑定到指定的路由地址中-->
    <servlet-mapping>
        <servlet-name>MyApps</servlet-name>
        <!--        这个是请求路径-->
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>

    <!--这两个可以省略-->
    <display-name>Welcome to Tomcat</display-name>
    <description>
        Welcome to Tomcat
    </description>

</web-app>

```
