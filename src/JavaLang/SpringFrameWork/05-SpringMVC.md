---
title: 05-SpringMVC
date: 2021-12-11 11:39:23
category: Spring-FrameWork
tag:
- Java
- Spring
- SpringMvc
- JavaWeb
---

## 概述

> ​  SpringMvc是一种基于Java实现**Mvc设计模型**的请求驱动类的轻量级**Web框架**，属于**SpringFrameWork**的后续产品，已经融合在Spring web Flow中
>
> - M：module，模型，主要用于数据封装和业务逻辑处理
> - V：view，视图，用于数据的展示
> - C：controller，控制器，用于分发、指派的工作

​  SpringMVC已经成为目前最主流的MCV框架之一，并随着Spring3.0的发布，全面超越Strut2，成为最优秀的MVC框架。

​  它通过一套注解，让一个简单的Java类成为处理请求的控制器，而无需实现任何接口

​  同时它还支持**RESTful**编程风格的请求

其原理大概是这样

![image-20211211124951804](/images/SpringFrameWork/05-SpringMVC/image-20211211124951804.png)

看起来有点绕对吧？

接下来我们简单实现一个

### 简单的实现共有行为-BaseServlet

我们就简单模拟下吧

假设现在index.jsp中有四个请求

```html
<a href="${pageContext.request.contextPath}/user?method=find">User Find</a><br>
<a href="${pageContext.request.contextPath}/user?method=login">User Login</a><br>
<a href="${pageContext.request.contextPath}/admin?method=login">Admin Login</a><br>
<a href="${pageContext.request.contextPath}/admin?method=find">Admin find</a><br>
```

可以看到他们的请求都是非常的相似，但是为此我们需要这样编写

UserServlet

```java
@WebServlet
public class UserServlet extends HttpServlet{
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res){
        String method = req.getParameter("method");
        if(method==null){
            throw new RuntimeException("请求参数不能为空"); //或者做其他处理，例如跳转到首页
        }
   //这里设置什么utf-8之类的
        //....
        switch(method){
            case "find":
                find(req,res)
                break;
            case "login":
                login(req,res)
                break;
            default:
                //这里做默认处理：跳转这类的
                break;
        }
    }
    public void find(req,res){
        //。。做find做的事情
    }
    public void login(req,res){
        //做login该做的事情
    }
}
```

单写一个看起来没什么问题对吧？

但是你想一想，如果说把admin也写上，那不就是又要写一个跟这个一模一样的模板，并且判断之类的也要重写一遍

​  而且这样不利于我们后期的维护，比方说，后期又加了一个`method=logout`

​  那不是又要写一个case...

也就是这样：

![images](/images/SpringFrameWork/05-SpringMVC/70.png)

那这也太痛苦了，所以我们可以创建一个类，其提供的功能就是：**可以调用继承此类中的任意方法**，至于要调用哪个方法，由请求所携带的参数决定，这样我们就不必要写那么多switch、if语句，只需要把终点放在如何实现业务需求上

### baseServlet代码实现

![images2](/images/SpringFrameWork/05-SpringMVC/70-16391992757253.png)

要实现一个这玩意，实际上有如下几步：

1. 创建一个baseServlet类，继承自HttpServlet
2. 重写service方法
3. 获取请求携带的方法参数值
4. 通过反射获取指定类的字节码对象
5. 根据请求携带的方法参数值，在通过字节码对象获取指定的方法
6. 最后执行指定的方法

说干就干，我们接下来手动实现一个吧：

```java
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        得到session对象
        session = req.getSession();
//        得到项目名
        rootPath = req.getContextPath();
//        处理编码问题
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
//        获取请求参数的值
        String methodName = req.getParameter("method");
        if (methodName == null) {
            throw new RuntimeException("请求方法不能为空");
        }
        System.out.println("Base Servlet service被调用了");
//        获取方法
        Method method = null;
        try {
//            这里是通过反射+动态绑定的方式来获取：
//            this 指的是当前正在运行的类
//            methodName是要获取的方法名，其余两个是该方法需要接收的参数
//            这个之前在反射的时候有了解过
            method = this.getClass().getMethod(methodName,
                    HttpServletRequest.class,
                    HttpServletResponse.class);
        } catch (NoSuchMethodException e) {
//            这里如果找不到方法就先抛出一个异常处理
            throw new RuntimeException("服务器中未存在该资源对象");
        }
        try {
            System.out.println("invoke注入被调用了");
//            这里通过反射来直接调用该方法，并获取返回值
//            这里的this指的是当前正在运行的类 req res 是传入的参数
            Object o = method.invoke(this, req, resp);
            /*
             * 简化重定向和转发操作
             * r:/index.jsp  重定向
             * f:/index.jsp  转发
             * 当然实际开发中可以把个抽出来成单独的方法，省的每次去记r和f
             */
            if (o != null && o.getClass() == String.class) {
                String str = (String) o;
//                判断是不是以f:开头，如果是的就请求转发到指定的页面
                if (str.matches("^f:.*")) {
                    str = str.substring(2);
//                    请求转发到指定的页面
                    req.getRequestDispatcher(str).forward(req, resp);
                } else if (str.matches("^r:.*")) {
//                    如果是以r开头的话就请求重定向到指定的页面
                    str = str.substring(2);
//                    请求重定向到指定的页面 req.getContextPath() 得到项目名 防止乱跳转
                    resp.sendRedirect(req.getContextPath() + str);
                }
            }
        } catch (Exception e) {
//            如果方法在执行的过程中出现了问题，直接抛出运行时异常
            throw new RuntimeException(e);
        }

    }
}

```

它的使用也是非常简单：

```java
@WebServlet("/user")
public class UserServlet extends BaseServlet {
 //返回标准值
    public void find(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter writer = response.getWriter();
        writer.write("Hello find");
     writer.close();
    }
 //下面是请求重定向
    public String login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        return "r:/login.jsp";
    }

}
```

访问：

![image-20211211132941656](/images/SpringFrameWork/05-SpringMVC/image-20211211132941656.png)

![image-20211211132956284](/images/SpringFrameWork/05-SpringMVC/image-20211211132956284.png)

### baseServlet的弊端

​  它有如下几个弊端：

1. 直接重写service方法的话，无法分辨get、post
   - 需要自己手动在实现方法（也就是最终我们写方法的地方，简称PoJo）去自行判断、分辨
   - 或者自行手动重写get、post，而不是重写service，让get和post来做service该做的事情
2. 多重判断还是不够简洁
   1. 例如我们现在不只是单纯的判断method了，而是要进一步的跟上一些其他参数，例如查询的时候要给予的id
   2. 这个时候就又要自己手动的在最终的POJO方法中编写，当然这有时候也是必然的
3. 如果是无参的话就又要用回普通的HttpServlet
   1. 比方说某些接口需要的参数在设计的时候就不能存在method而是转而使用其他参数来进行判断，或者某些接口压根就不想要method。。那就得用回普通的HttpServlet
4. 对于编写文档不太友好
   1. 实际开发中弄这玩意要写一大堆帮助文档，给前端看，同时还容易搞混
   2. 比方说login 就普普通通的请求`/user/login`不就可以了，弄成这样的话得`/user?method=login`，显得没有必要
5. 当然总的来说，这也是个不错的选择，它具有丰富的多样性

## SpringMVC的开发步骤

![image-20211211144855797](/images/SpringFrameWork/05-SpringMVC/image-20211211144855797.png)

1. 倒入SpringMVC的相关坐标（库）
2. 配置SpringMVC核心控制器DispathcerServlet
3. 创建Controller（控制器、POJO）类和视图页面
4. 使用注解Controller类中的业务方法的映射地址
5. 配置SpringMVC的核心配置文件spring-mvc.xml
6. 客户端发起请求测试

需求：及客户端发起请求、服务端接收请求，执行逻辑并进行视图跳转

### SpringMVC的快速入门

这里通过新建一个web module来演示(tomcat 9)

#### 添加Spring-mvc的依赖

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.13</version>
</dependency>
```

版本号改成和你的spring-context相同即可，注意：spring-webmvc和spring-web是两个不同的东西

#### 配置DispathcerServlet

在web.xml中配置如下内容：

```xml
<!--    配置SpringMVC的前端控制器-->
<servlet>
    <servlet-name>DispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--        下面这里表示服务器启动的时候就去创建这个对象，我们配置个优先级为1-->
    <load-on-startup>1</load-on-startup>
</servlet>

<!--    覆盖默认的缺省值为SpringMvc-->
<servlet-mapping>
    <servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

#### 编写自己的UserController

我们在`com.你的项目名称.tontroller`目录下新建一个UserController：

这之中的原理之后会说

```java
// 注册bean 表示这是个WEB类层上用于实例化Bean
@Controller
public class UserController {
    //使用RequestMapping设置路径 原理先不管
    @RequestMapping("/quick")
    public String save() {
        System.out.println("UserController Running");
        return "success.jsp"; 
        //我们这里在webapp目录下新建一个suucess.jsp 里面随便写点什么即可 例如一个h1标签里面写着Success
    }
}
```

#### 配置Spring-mvc.xml

这里使用context:component-scan来扫包即可，注意，只扫描controller这个文件夹，SpringMVC的使用一定要和Spring-context区分开来

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           https://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.MySpringMvc.controller"/>

</beans>
```

#### 完善DispathcerServlet

紧接着，我们要让DIspatch知道它该读取那个配置文件，所以直接在注册它的Servlet的时候给他初始化参数即可

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--    配置SpringMVC的前端控制器-->
    <servlet>
        <servlet-name>DispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<!--        注意 init-param一定要写在load-on-startup上面 不然会报错-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <!--        下面这里表示服务器启动的时候就去创建这个对象，我们配置个优先级为1-->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!--    覆盖默认的缺省值为SpringMvc-->
    <servlet-mapping>
        <servlet-name>DispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>


</web-app>
```

#### 运行并测试

最终目录结构是这个样子

![image-20211211153033596](/images/SpringFrameWork/05-SpringMVC/image-20211211153033596.png)

接着，我们启动tomcat，访问/quick

如果在启动的时候遇到了找不到类的问题：

项目结构-工件-选择你的Web项目-在可用元素内找到你这个项目的包，右键-置于Output Root即可

![image-20211211153203976](/images/SpringFrameWork/05-SpringMVC/image-20211211153203976.png)

### 分析Spring-MVC在启动的时候都做了什么

​  我们给tomcat配置了全局缺省值`/`也就是说，所有请求都会从他手上过一遍，而这之后我们又定义了一个UserController，这里面通过注解配置了一个@RequestMapping("/quick")

所以大概流程应该就是这样的

![image-20211211153834179](/images/SpringFrameWork/05-SpringMVC/image-20211211153834179.png)

也就是说Spring相当于给我们封装了一个超级强大的baseServlet

它的内部给我们封装了很多共有的行为，我们只需要编写非常少量的代码，就能够非常顺畅的完成我们的业务

![image-20211211154015051](/images/SpringFrameWork/05-SpringMVC/image-20211211154015051.png)

### 📕SpringMVC的执行流程

![image-20211211161238095](/images/SpringFrameWork/05-SpringMVC/image-20211211161238095.png)

看起来很复杂对吧？

实际上它就是这么复杂，SSM(Spring-Context,Spring-MVC,Mybatis)框架中，最难的就是SpringMVC，得沉住气的学

这也是为什么之后学习的Spring Boot会那么多人用的原因---那玩意就相当于简化了SSM的所有操作

执行流程通过文字来描述的话就是

1. 用户发送请求至前端处理器`DispatcherServlet`
2. `DispatcherServlet`收到请求调用`HandlerMapping`处理器映射器
3. 处理器映射器找到具体的处理器(可以根据xml配置、或者通过注解进行查找)，生成处理器对象及处理拦截器（如果有则生成），并返回给`DispatcherServlet`
4. `DispatcherServlet`再调用`HandlerAdapter`处理器适配器
5. `HandlerAdapter`经过适配调用具体的处理器(Controller，也叫后端控制器、Pojo)
6. Controller执行完成返回一个`ModelAndView`
7. `HandlerAdapter`将Controller的执行结果`ModelAndView`返回给`DispatcherServlet`
8. `DispatcherServlet`将`ModelAndView`传递给`ViewReslover`视图解析器
9. `ViewReslover`解析后返回具体的View给`DispatcherServlet`
10. `DispatcherServlet`根据拿到的View进行渲染视图（将数据模型填充至视图中）
11. `DispatcherServlet`响应用户

这每一步在之后都会具体说明

### @RequestMapping

我们在刚刚编写第一个SpringMVC的代码时，使用了如下的注解

```java
// 注册bean 表示这是个WEB类层上用于实例化Bean
@Controller
public class UserController {
   
    @RequestMapping("/quick")
    public String save() {
        System.out.println("UserController Running");
        return "success.jsp"; 
      
    }
}
```

第一个注解我们都知道是干嘛用的了--就是注册一个Bean，那么这个@RequestMapping又是干嘛的呢？

首先，我们知道，定义了这个玩意之后，就可以通过ip:port/项目地址/quick访问到他，那么这个玩意的作用应该是等同于在web.xml中配置

```xml
<servlet>
 <serlvet-name>xxx</serlvet-name>
 <servlet-class>UserController.????这里应该是什么呢</servlet-class>
</servlet>
<servlet-mapping>
 <servlet-name>xxx</servlet-name>
 <url-pattern>/quick</url-pattern>
</servlet-mapping>
```

应该是和这样配置的作用一致，我们接下来看下注解的源码：

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface RequestMapping {
 String name() default "";
 @AliasFor("path")
 String[] value() default {};
 @AliasFor("value")
 String[] path() default {};
 RequestMethod[] method() default {};
 String[] params() default {};
 String[] headers() default {};
 String[] consumes() default {};
 String[] produces() default {};
}

```

​  在@Target中，可以传入两个属性，分别为 `ElementType.METHOD` 和 `ElementType.TYPE`，也就是说 @RequestMapping 可以在方法和类的声明中使用

​  并且可以看到注解中的属性除了name()返回的是字符串以外，其他的全都返回的是数组，也就是可以定义多个属性值，例如 value() 和 path() 都可以同时定义多个字符串值来接收多个URL请求

那么我们先来测试下它的@Target中的属性是否可行，例如，我现在想通过`/user/quick`来访问：

```java
@Controller
@RequestMapping("/user")
public class UserController {
    @RequestMapping("/quick")
    public String save() {
        System.out.println("UserController Running");
        return "success.jsp";
    }
}
```

接着打开PostMan来测试一下

![image-20211211164313409](/images/SpringFrameWork/05-SpringMVC/image-20211211164313409.png)

​  未找到`/user/success.jsp`，也就是说我们可以通过这样正确的设置嵌套路径，那么目前这个情况是怎么回事呢？

​  还记得我们给`DispatcherServlet`设置的路径是`/`覆盖默认缺省吗，我们在之前访问`/quick`的时候，实际上查找的路径是相对于`/`，但是现在我们是`/user/quick`，所以是查找`/user`路径下的资源

​  也就是说，如果没有指定具体路径的话，默认是查找当前路径下的资源，所以相对应的解决方案也就有了：

```java
@Controller
@RequestMapping("/user")
public class UserController {
    @RequestMapping("/quick")
    public String save() {
        System.out.println("UserController Running");
        //尝试通过指定的路径来访问对应的资源
        return "/success.jsp";
    }
}
```

测试下，成功了

![image-20211211165039863](/images/SpringFrameWork/05-SpringMVC/image-20211211165039863.png)

好了，接下来说说它的参数

### ✨@RequestMapping的参数

我们刚刚在看源码的时候，就发现他可以接收如下的参数

```java
String name() default "";

@AliasFor("path")
String[] value() default {};

@AliasFor("value")
String[] path() default {};

RequestMethod[] method() default {};

String[] params() default {};

String[] headers() default {};


String[] consumes() default {}; //这个是获取请求的context

String[] produces() default {}; //这个是设置响应的context
```

总共有10个参数可以提供给他，并且大部分都是见名知意的

接下来一个一个说

1. `name`：等同于在xml中配置的servlet-name，感觉并有什么实际作用

   ```java
   String name() default "";
   
   @RequestMapping(name="quick",value = "/quick")
   ```

2. `Value`：用于指定请求的URL。它和path属性的作用是一样的（Path可以通过数组的方式指定多个路径）

   ```java
   String[] value() default {};
   String[] path() default {};
   //两个都是可以传入字符串数组
   
   @RequestMapping(value = "/quick") //指定请求路径 当让如果只指定请求路径 这个value是可以省略的
   
   @RequestMapping("/quick") // 上面的简写
   
   @RequestMapping(path = {"/quick","/start"}) // 配置多个请求路径 就像@WebServlet中使用注解那样
   @RequestMapping(value = {"/quick","/start"}) // 效果同上
   ```

3. `Method`:可以指定请求方式：定义之后，如果没有按照指定的方式请求，会返回405错误

   ```java
   RequestMethod[] method() default {};
   //可以看到，这玩意接收的值有点特殊，是一个对象数组
   //我们看源码可以发现，这个RequestMethod是一个枚举类
   public enum RequestMethod {
       GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, TRACE
   }
   
   //那这就好办了嘛
   @RequestMapping(
       path = {"/quick", "/start"},
       method = RequestMethod.GET
       // 指定只有get请求才能访问
   )
   
   @RequestMapping(
       path = {"/quick", "/start"},
       method = {RequestMethod.GET, RequestMethod.POST}
       //指定get post请求都能访问
   )
   
   ```

4. `params`：用于指定闲置请求参数的条件。支持简单的表达式

   ```java
   String[] params() default {};
   //可以看到，支持传递数组
   
   @RequestMapping(
       path = "/quick",
       method = RequestMethod.GET,
       params = "username=root"
   ) // 限制只能通过get请求访问并且需要携带请求体username=root
   
   @RequestMapping(
       path = "/quick",
       method = RequestMethod.GET,
       params = {"username=root","password=123456"}
   ) // 同上 加了一个password=123456
   
   //表达式支持：
   params="accountName"; // 表示请求参数必须带有accountName
   params="money!100"; //表示请求参数中money不能是100
   params="age=18"; //请求参数中的age必须是18
   
   ```

   如果说没有发送指定值的话，会返回400，并告诉客户端需要哪些值....

   ![image-20211211171405697](/images/SpringFrameWork/05-SpringMVC/image-20211211171405697.png)

5. header和params差不多

6. `produces` **设置返回的数据类型**

   ```java
   produces="application/json"; 设置返回值为json
   
   //设置返回值为json并且编码为utf-8
   produces="text-html;charset=utf-8";
   ```

7. `consumes`：指定处理请求当中的提交内容类型（Content-Type）：application/json, text/html等

   ```java
    consumes = {"application/json;charset=UTF-8"}
   //指定客户端请求服务器时发送的数据为json
   ```

#### SpringMVC组件配置扫描-指定不扫描某种注解（不重要）

我们之前是通过这种方式来配置了组件扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           https://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.MySpringMvc.controller"/>

</beans>
```

但是正常情况下，我们并不只有一个spring-mvc.xml，我们还有spring的全局上下文容器applicationContext.xml

通常情况下，我们的全局上下文容器都是扫描整个包的，这样的话就会造成了重复扫描...这样不好

所以说我们可以通过如下方式来配置路径：切记，这是在applicationContext中进行配置

```xml
<context:component-scan base-package="com.MySpringMvc">
    <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    //这句话的意思就是，不扫描所有Controller相关的注解
</context:component-scan>
```

但是实际开发过程中，一般都不会这样用，指定好哪个包就行....无需在意这些小细节

### SpringMVC跳转时的前缀和后缀

我们刚刚在写代码的时候，有一点非常令人在意

```java
@Controller
public class UserController {
   
    @RequestMapping("/quick")
    public String save() {
        System.out.println("UserController Running");
        return "success.jsp";  //为什么就能自动跳转到success.jsp
      
    }
}
```

![image-20211211161238095](/images/SpringFrameWork/05-SpringMVC/image-20211211161238095.png)

​   首先我们回顾下这玩意是怎么运行期的，在我们的处理器处理完毕后，返回的是一个ModelAndView给视图解析器处理

​  那么我们先要做的事情很简单，找到这个视图解析器，就能知道它都做了什么

可以看到，在spring-mvc中有个显眼的properties文件

![image-20211211175208318](/images/SpringFrameWork/05-SpringMVC/image-20211211175208318.png)

点进去，可以直接看到它的所有默认解析器

![image-20211211175316491](/images/SpringFrameWork/05-SpringMVC/image-20211211175316491.png)

其中跟视图相关的字眼有一个`ViewResolver`

```properties
org.springframework.web.servlet.ViewResolver=org.springframework.web.servlet.view.InternalResourceViewResolver
```

但是我们直接点进去这个类貌似并没有看到跟请求转发相关的字眼，但是看到了一个方法：

```java
//           前缀   后缀
public InternalResourceViewResolver(String prefix, String suffix) {
    this();
    this.setPrefix(prefix);
    this.setSuffix(suffix);
}

```

然后我们追一下这方法，导航到了它的父类`UrlBasedViewResolver`

我们到父类的最头上

发现有两个非常眼熟的常量

![image-20211211175652043](/images/SpringFrameWork/05-SpringMVC/image-20211211175652043.png)

跟我们自己写的baseServlet中请求转发的值非常相似

那么我们现在的就是redirect了，接下来尝试改一改代码：

```java
@RequestMapping(
    path = "/quick",
    method = RequestMethod.GET

)
public String save() {
    System.out.println("UserController Running");
    return "forward:/success.jsp";
}
```

然后访问，看看会发生什么

![image-20211211180059669](/images/SpringFrameWork/05-SpringMVC/image-20211211180059669.png)

可以看到，页面并没有被重定向，而是被请求转发了

也就是说，实际上我们已开始写的代码，实际上是这样的

```java
@RequestMapping(
    path = "/quick",
    method = RequestMethod.GET

)
public String save() {
    System.out.println("UserController Running");
    return "redirect:/success.jsp";
}
```

可能你会问，那得到的这结果又有什么用呢？

我们在看源码的时候看到调用了这两项内容：

```java
this.setPrefix(prefix);
this.setSuffix(suffix);

//他们对应的方法为
public void setPrefix(@Nullable String prefix) {
    this.prefix = prefix != null ? prefix : "";
}
public void setSuffix(@Nullable String suffix) {
    this.suffix = suffix != null ? suffix : "";
}
```

可以看到在，这两个值set了一个空值....

总所周知，Spring可以通过bean来set对应的值，也就是说我们可以通过修改配置文件的方式，来指定我们的访问路径的前缀

```xml
<!--注意，这个id只能写成所用的类的名称(首字母转换成小写)，写成其他的spring-mvc读取不到-->
    <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <!--修改跳转。重定向的路径的开头前加上一个/jsp-->
    <property name="prefix" value="/jsp"></property>
    
</bean>
```

接下来我们把success.jsp放到/jsp文件夹中

![image-20211211182848390](/images/SpringFrameWork/05-SpringMVC/image-20211211182848390.png)

然后代码改成：

```java
public String save() {
    System.out.println("UserController Running");
    return "success.jsp";
}
```

看下能否正常访问

![image-20211211182913639](/images/SpringFrameWork/05-SpringMVC/image-20211211182913639.png)

依旧是可以正常访问

浏览器访问发现是请求转发：

![image-20211211184109766](/images/SpringFrameWork/05-SpringMVC/image-20211211184109766.png)

我们在spring-mvc中前置加上后缀试试

```xml
<bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/jsp/"></property>
    <property name="suffix" value=".jsp"></property>
</bean>
```

代码：

```java
@RequestMapping(
    path = "/quick",
    method = RequestMethod.GET

)
public String save() {
    System.out.println("UserController Running");
    return "success";
}
```

好了~测试依旧通过

## SpringMVC的数据响应

### 页面跳转

#### 直接返回字符串

就像我们之前写的那样：

```java
@RequestMapping(
    path = "/quick",
    method = RequestMethod.GET

)
public String save() {
    System.out.println("UserController Running");
    return "/jsp/success.jsp";
}
```

此种方式会将返回的字符串与视图解析器的前后缀**拼接**后跳转

也可以像刚刚那样在springmvc的配置文件中通过配置内部资源视图解析器的方式来自定义的添加前缀和后缀（在开发中用的比较少）

```xml
<bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    自定义前缀
    <property name="prefix" value="/jsp/"></property>
    自定义后缀
    <property name="suffix" value=".jsp"></property>
</bean>
```

大概就是这样

![image-20211211222121214](/images/SpringFrameWork/05-SpringMVC/image-20211211222121214.png)

如果需要转发或者重定向的话：

```java
@RequestMapping(
    path = "/quick",
    method = RequestMethod.GET

)
public String save() {
    System.out.println("UserController Running");
    return "forward:/jsp/success.jsp"; //转发 默认就是转发
     return "redirect:/jsp/success.jsp"; //重定向
    //注意 如果要自定转发或者重定向，则不能使用配置文件来配置前后缀（这玩意是直接前缀+字符串内容+后缀来拼接的）
}
```

#### 通过ModelAndView对象返回/并且传递参数

Spring可以传递request域对象到最终的网页上（因为是请求转发，可以携带参数）

我们可以先在success.jsp中加入el表达式来进行接收

```html
<body>
    <h1>Success!</h1>
    <h2>${username}</h2>
</body>
```

然后编写如下一些方法来传递参数 ，每种方法都可以在request域中传递数据

```java
@RequestMapping("/quick2")
public ModelAndView save2() {
    /*
         * Model 模型 作用 封装数据
         * View  视图 作用 展示数据
         * */
    ModelAndView modelAndView = new ModelAndView();
    //        设置视图
    modelAndView.setViewName("/jsp/success.jsp");
    //        设置模型数据 这里写入的数据会直接传入到request域对象内 在jsp中可以直接通过${username}获取
    modelAndView.addObject("username", "root");
    return modelAndView;
}

/**
     * 其实在访问阶段 SPring MVC如果检测到返回的是一个ModelAndView 会自动创建一个并传递过来
     *
     * @param modelAndView
     * @return
     */
@RequestMapping("/quick3")
public ModelAndView save3(ModelAndView modelAndView) {
    modelAndView.setViewName("/jsp/success.jsp");
    /*
         * 这里的addObject Spring也会在之后直接注入到JSP中
         * */
    modelAndView.addObject("username", "admin");
    return modelAndView;
}

/**
     * 访问阶段，如果SPring发现这里接收一个Model 也会传递一个Model过来
     *
     * @param model
     * @return
     */
@RequestMapping("/quick4")
public String save4(Model model) {
    //        model来设置request对象
    model.addAttribute("username", "Hex");
    return "/jsp/success.jsp";
}

/**
     * 在访问阶段，如果Spring发现这里接收一个HttpServletRequest对象 也会直接传入一个过来
     * 这个方式在实际开发中用的比较少，Spring该封装的都给我们封装了
     * @param request
     * @return
     */
@RequestMapping("/quick5")
public String save5(HttpServletRequest request) {
    request.setAttribute("username", "Version");
    return "/jsp/success.jsp";
}
```

### 回写数据

#### 直接返回字符串

我们在直接接触Servlet中，如果想直接会写字符串作为响应体返回的话，需要调用`res.getWriter()`获取到输出流并进行写入数据的方式发送数据即可

那么在Controller中如果想直接会写字符串该怎么样呢？

在我们刚刚使用ModelAndView返回对象的时候，可以直接找Spring要一个HttpServletRequest，那么是否也可以直接找他要一个HttpServletResponse呢？

接下来试一试

```java
@RequestMapping("/write1")
//页面跳转的话是return 那么返回普通的东西的话应该不需要返回值 直接void
public void write1(HttpServletResponse response) throws IOException {
    response.getWriter().write("<h1>Hello SpringMVC</h1>");
}
```

接着测试一下：

![image-20211211232232986](/images/SpringFrameWork/05-SpringMVC/image-20211211232232986.png)

但是总感觉这样不太对劲，Spring应该远不止只提供一个Response，

我们的理想状态是：

```java
public String write1()   {
    return "ABC";
}
```

但是实际上这样是行不通的，Spring会自动给我们识别成读取相应的文件并返回给客户端

但实际上有解决方案

### ✨@ResponseBody 标注不进行页面跳转

如果需要回写的字符串直接返回，此时可以通过`@ResponseBody`注解告知SpringMVC框架，方法需要返回的字符串，而不是跳转直接在Http响应中返回

consumes

```java
@RequestMapping("/write2")
@ResponseBody
public String write2() {
    return "123456";
}
```

测试：

![image-20211211234514840](/images/SpringFrameWork/05-SpringMVC/image-20211211234514840.png)

### 返回Json给客户端-使用jackson

这里返回的话我们也是先直接返回字符串即可

JSOn的转换工具有非常多，但是有个说是效率超级快的Jackson

详细使用教程看[这篇文章](https://blog.csdn.net/qidasheng2012/article/details/105771052)

这里坐下简单的使用

导包 要导三个 每次 就是三个 一个核心 一个databind 一个注解

```xml
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
```

版本的话，你可以看看这个[链接](https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-annotations)最新是什么版本，这三个就写什么版本

然后我们创建一个User类，只有name，age，构造函数和get set  没有其他东西 tostring也没有

接着编写如下代码：

```java
@RequestMapping(value = "/write2", produces = "application/json;charset=UTF-8")
@ResponseBody
public String write2() throws JsonProcessingException {
    //        HashMap<String, String> map = new HashMap<>();
    //        map.put("name", "Hex");
    //        map.put("age", "18");
    //这个user对象是只有get set 构造方法 没有别的方法
    User user = new User("张三", 18);
    //        通过使用jackson来快速转换成json
    ObjectMapper objectMapper = new ObjectMapper();
    String s = objectMapper.writeValueAsString(user);
    return s;

}
```

我这里就拿postman来测试返回类型是否为json了

![image-20211212003827824](/images/SpringFrameWork/05-SpringMVC/image-20211212003827824.png)

### ✨返回对象或者集合，配置处理器适配器转换成JSon

我们现在不仅仅是想让客户端返回转换后的json字符串了，而是直接返回OBject或者集合给客户端

```java
@RequestMapping(value = "/write3", produces = "application/json;charset=UTF-8")
@ResponseBody
public User write3() {
    User user = new User("李四", 18);
    return user;
}
```

我想这样写直接返回json给客户顿

首先，我们得明白是谁在帮我们处理数据

安装流程，是处理器查找器查找完毕后交给处理器适配器来进行处理的

也就是`HandlerAdapter`

我们依旧打开下它根目录下的DispatcherServlet.properties，找到`HandlerAdapter`，发现它由多个依赖，我们看第三个：`RequestMappingHandlerAdapter`(请求映射处理程序适配器)

```properties
org.springframework.web.servlet.HandlerAdapter=org.springframework.web.servlet.mvc.HttpRequestHandlerAdapter,\
 org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter,\
 org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter,\
 org.springframework.web.servlet.function.support.HandlerFunctionAdapter
```

选中它，按两下shift，搜索并进入这个类

进入后，能发现有一个方法：`setMessageConverters`(设置消息转换器)

```java
public void setMessageConverters(List<HttpMessageConverter<?>> messageConverters) {
    this.messageConverters = messageConverters;
}
```

可以看到，他接受一个list`HttpMessageConverter`类型的参数，所以我们打开下类图，**搜索**下它有没有`Jackson`相关的子类

![image-20211212123422925](/images/SpringFrameWork/05-SpringMVC/image-20211212123422925.png)

发现有四个实际的子类，接着我一个一个查看，发现他们四个分别对应了四种数据类型

得出了如下结果

| 类名                                     | 用途                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| MappingJackson2SmileHttpMessageConverter | 支持x-jackson-smile这种数据类型的转换<br />需要额外下载jackson dataformat包 |
| **MappingJackson2HttpMessageConverter**  | 支持Json数据，只需要jackson三件套即可                                       |
| MappingJackson2CborHttpMessageConverter  | 支持CBOR数据<br />需要额外下载jackson dataformat包                          |
| MappingJackson2XmlHttpMessageConverter   | 支持XML数据<br />需要额外下载jackson dataformat包                           |

那这就简单了，一目了然的知道我们需要使用的是第二个，接下来配置它

根据我们之前学习的Spring基础，可以在spring-mvc.xml中添加配置来覆盖原本的配置

```xml
<!--    配置处理器映射器
            这里的名字(id)一定要是首字母小写的RequestMappingHandlerAdapter
    -->
<bean id="requestMappingHandlerAdapter"
      class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
    <property name="messageConverters">
        <!--            传入一个list-->
        <list>
<!--注意，这里的MappingJackson2HttpMessageConverter要自己点进去看下，看看支持哪些jackson版本
	通常来说，比他要求的高一些不要紧，只要能跑起来就行
-->
            <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
        </list>
    </property>
</bean>
```

补充：我目前的spring版本为5.13.0，jackson的依赖使用如下：

```xml
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
```

配置好了，接下来我们尝试试用下，看看能不能行

```java
@RequestMapping(value = "/write3", produces = "application/json;charset=UTF-8")
@ResponseBody
public User write3() {
    return new User("李四", 18);
}
```

访问结果：

![image-20211212124336459](/images/SpringFrameWork/05-SpringMVC/image-20211212124336459.png)

完美运行

同理，还可以测试下Map、List之类的能不能正常转换为json并返回

```java
@RequestMapping(value = "/write4", produces = "application/json;charset=UTF-8")
@ResponseBody
public Map<String, Integer> write4() {
    HashMap<String, Integer> map = new HashMap<>();
    map.put("张三", 18);
    map.put("李四", 20);
    map.put("王老五", 22);
    return map;
}

@RequestMapping(value = "/write5", produces = "application/json;charset=UTF-8")
@ResponseBody
public List<Map<Integer, User>> write5() {
    ArrayList<Map<Integer, User>> maps = new ArrayList<>();
    Map<Integer, User> map = new HashMap<>();
    map.put(1, new User("张三", 18));
    map.put(2, new User("李四", 20));
    map.put(3, new User("王老五", 22));
    map.put(4, new User("刘七", 10));
    maps.add(map);
    return maps;
}

@RequestMapping(value = "/write6", produces = "application/json;charset=UTF-8")
@ResponseBody
public List<User> write6() {
    ArrayList<User> users = new ArrayList<>();
    users.add(new User("张三", 18));
    users.add(new User("李四", 20));
    users.add(new User("王老五", 22));
    users.add(new User("刘七", 10));
    return users;
}
```

### ✨✨返回对象或集合-让Spring自动配置Json解析器(jackson)

我们刚刚在方法上添加@ResponseBody并添加如下配置就可以返回Json格式的字符串

```xml
<bean id="requestMappingHandlerAdapter"
      class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
    <property name="messageConverters">
        <list>
            <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
        </list>
    </property>
</bean>
```

但是，这样配置比较麻烦，配置的代码比较多，而且比较容易写错...

所以Spring不仅仅提供了这种方式来给我们配置，还提供了一种更方便的方式

关于它的参数说明这里我就先不说了，感兴趣的话去看[官方文档](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc)(PS：主要是看不懂它支持的参数是干嘛用的)

```xml
<!--MVC的注解驱动-->
<mvc:annotation-driven/>
```

​  在SpringMVC的各个组件中、处理器映射器、处理器适配器、视图解析器称为SpringMVC的三大组件

​  使用`<mvc:annotation-driven>`会自动加载：

- RequestMappingHandlerMapping（处理器映射器）
- RequestMappingHandlerAdapter（处理器适配器）

可以在spring-mvc.xml中使用`<mvc:annotation-driven/>`替代注解处理器和适配器的配置

同时使用`<mvc:annotation-driven/>`默认底层就会集成jackson进行对象或集合的json格式字符串的转换

注意，在写入xml的时候下面这玩意可能会出现多个，选择链接带有mvc的

![image-20211212131752889](/images/SpringFrameWork/05-SpringMVC/image-20211212131752889.png)

接下来我们测试一下：

```java
@RequestMapping(value = "/write6", produces = "application/json;charset=UTF-8")
@ResponseBody
public List<User> write6() {
    ArrayList<User> users = new ArrayList<>();
    users.add(new User("张三", 18));
    users.add(new User("李四", 20));
    users.add(new User("王老五", 22));
    users.add(new User("刘七", 10));
    return users;
}
```

访问结果：

![image-20211212131935147](/images/SpringFrameWork/05-SpringMVC/image-20211212131935147.png)

## ✨SpringMVC获取请求数据

众所周知，客户端请求参数的格式是：`name=value1&key=value2....`

服务器端要获得请求的参数，有时还需要进行数据的封装，SpringMVC可以接收如下类型的参数

- 基本类型参数
- POJO类型参数

### 获得基本类型参数

Controller中的业务方法的参数名称要与请求的参数的name一致，参数值会自动匹配

比方说：`http://ip:port/项目名称/test?username=张三&password=123456`

我们现在尝试一下，看看在函数中直接添加username和password接收参数能不能行

```java
@Controller
@RequestMapping("/testParams")
public class UserParamsController {


    @RequestMapping("/test1")
    @ResponseBody
    public void test1(String username, String password) {
        System.out.println("username:" + username + " password:" + password);
    }
}
```

接下来尝试一下，看下控制台能不能获取得到

![image-20211212144302145](/images/SpringFrameWork/05-SpringMVC/image-20211212144302145.png)访问后成功获取了！！！

那如果我们访问的时候不加上password呢？

`http://localhost:8080/SpringWeb/testParams/test1?username=张三`

控制台输出：`username:张三 password:null`

### 获取POJO类型参数

Controller中的业务方法的POJO参数的属性名与请求参数的name一致，参数会自动映射匹配

我们现在有一个User类，有name，age

```java
public class User {
    private String name;
    private Integer age;

    public User() {
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
    //后面是getset
}
```

我们尝试下能否直接在声明方法的时候接受一个User对象

PS：这之前将返回类型通过mvc提供的注解类型设置下

```xml
<!--spring-mvc.xml 注册注解驱动-->
<mvc:annotation-driven/>
```

```java
@RequestMapping("/test2")
@ResponseBody
public User test2(User user) {
    System.out.println("name:" + user.getName() + " age:" + user.getAge());
    return user;
}
```

成功获取了

![image-20211212145322280](/images/SpringFrameWork/05-SpringMVC/image-20211212145322280.png)

控制台输出：`username:王老五 age:666`

也就是说，在SpringMVC中，请求的参数名和我们实体POJO的属性名一致，它将会调用反射自动创建并调用set方法

个人推测底层应该是这样的：

​  首先通过反射new一个User

​  反射获取User的所有Field参数，然后进行逐一匹配对比，匹配上了就进行set操作

​  如果传入空值，那么我们应该也是能够获取一个user，但是里面的所有属性都是空的

接下来测试下：

![image-20211212150211730](/images/SpringFrameWork/05-SpringMVC/image-20211212150211730.png)

### 获取数组类型的参数

例如我们现在有如下参数：

```json
"names" =[
    "张三",
    "李四",
    "王老五",
    "刘六"
]
```

也就是：

`/test3?names=%E5%BC%A0%E4%B8%89&names=%E6%9D%8E%E5%9B%9B`

那么只需要这样就可以接收：

```java
@RequestMapping(value = "/test3")
@ResponseBody
public String[] test3(String[] names) { //这里一定要写和请求中相匹配的，否则无法获取 请求中是names
    System.out.println(Arrays.toString(names));
    return names;
}
```

运行结果：

![image-20211212151546302](/images/SpringFrameWork/05-SpringMVC/image-20211212151546302.png)

### ✨✨@RequestBody获取请求体（附带跨域的解决）

一般情况下，我们都是通过ajax来发送数据的，接下来使用axios简单模拟下（不会把不会吧，都2021年了还会还有人吗在用from表单提交数据吧） 注意 我这下面的ajax请求的格式

```html
<!-- 此处省略不重要的头部信息 -->
<!-- 使用Vue来操作~ -->
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js"></script>
<!-- axios 请求 -->
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script>
<body>
    <div id="app">
        <a href="#" @click="testParams">{{test}}</a>
    </div>
</body>
<script>
    window.onload = function () {
        let userList = [
            { name: "张三", age: 18, },
            { name: "李四", age: 19, },
            { name: "王五", age: 20, },
            { name: "赵六", age: 21, }
        ]
        var app = new Vue({
            el: '#app',
            data: { test: '测试发送集合' },
            methods: {
                testParams: () => {
                    // 这里有有必要额外说一下，服务器是直接解析data
                    // 也就是说，如果直接传入的是：{userList:userList}
                    // 那么服务收到的就是 data: { userlist:[{name:xxx,age:xxx}] }...
                    // 所以我们下面直接写userList就代表了
                    // data:[{name:xxx,age:xxx},{name:xxx,age:xxx}.....]
                    axios.post("http://localhost:8080/SpringWeb/testParams/test4", userList)
                        .then(function (response) {
                        console.log(response.data);
                    })
                        .catch(
                        function (error) {
                            console.log(error);
                        }
                    );
                }
            }
        })
        }
</script>
</html>
```

编写java代码接收

在SpringMVC中，我们可以使用@RequestBody来接收客户端发送过来**请求体**数据

还记得之前在学习JavaWeb获取客户端传过来的数据文件吗？

我们当时是通过`req.getInputSteam()`获取二进制文件 然后进行转换获取到请求体数据

这里就相当于封装了那一步一样，可以直接通过@RequestBody来获取

我们只需要这样写：

```java
@RequestMapping(value = "/test4", method = RequestMethod.POST)
@ResponseBody
@CrossOrigin //这个是跨域注解 允许浏览器跨域
public List<User> test4(@RequestBody List<User> aaa) {
//        aaa不同于其他，只是一个普通的形参，不需要像接收param那样验证valueName
System.out.println(aaa);
return aaa;
}
```

@RequestBody只能接收json类型的数据，当然文件上传下载之后会提到

它有一个参数：`boolean required() default true;`

这个表示是否一定要有请求体，可以设置为false来让请求无序请求体也可以响应

```java
@RequestMapping(value = "/test4", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
@ResponseBody
@CrossOrigin //这个是跨域注解 允许浏览器跨域
public String test4(@RequestBody(required = false) List<User> aaa) {
    //        aaa不同于其他，只是一个普通的形参，不需要像接收param那样验证valueName
    if (aaa == null) {
        return "没有数据";
    }
    return "有数据";

}
```

![image-20211212173710257](/images/SpringFrameWork/05-SpringMVC/image-20211212173710257.png)

当让，我们也可以指定让用户发送一个user对象

```java
@RequestMapping(value = "/test5", method = RequestMethod.POST)
@ResponseBody
public User test5(@RequestBody User user) {
    System.out.println("name:" + user.getName() + " age:" + user.getAge());
    return user;
}
```

发送：

![image-20211212174138581](/images/SpringFrameWork/05-SpringMVC/image-20211212174138581.png)

### ✨SpringMVC中直接访问静态资源的访问配置

比方说我现在把刚刚写的ajax请求的网页丢到项目内，并且将依赖改成本地依赖：

![image-20211212175703946](/images/SpringFrameWork/05-SpringMVC/image-20211212175703946.png)

然后试图访问一下：

![image-20211212175905867](/images/SpringFrameWork/05-SpringMVC/image-20211212175905867.png)

发现了404错误

这是为什么呢？

因为我们在最开始使用Spring的时候，在web.xml做了以下配置：

```xml
<!--    覆盖默认的缺省值为SpringMvc-->
<servlet-mapping>
    <servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

做了一个缺省的配置：什么资源都要过一遍DispatcherServlet的手

​  也就是说，DispatchServlet会拦截所有请求（除了.jsp文件，因为JSP本质就是一个Servlet，映射方法中有配置jsp的映射），并交给我们的请求器适配器处理，在我们定义的@RequestMapping中，并没有定义params.html这个东西，所以虚拟路径匹配就匹配不到它，所以直接返回404

​  所以SpringMVC提供了一个能让我们访问静态资源的方法：

接下来试用下它，先配置下JS的访问：（在spring-mvc.xml中配置）

```xml
<mvc:resources mapping="/js/**" location="/js/"/>
```

这里的`mapping='/js/**'`表示客户端请求时请求了`ip:port/项目名称/js/任意文件`都会交给

在`localtion='/js/'`处理

`localtion='/js/'`表示要对外展示的本地资源文件

接下来我们尝试访问一下`/js/vue.js`

![image-20211212181433686](/images/SpringFrameWork/05-SpringMVC/image-20211212181433686.png)

访问成功，但是那个html是没办法处理的，因为我们无法覆盖掉刚刚已经配置好的缺省，mvc:resouces也不允许我们定义根路径为location

那我们应该怎么做呢？

当让是直接把这个html改成jsp 直接注册路由（你可能会想自己注册一个@RequestMapping不行吗----没有必要为一个文件创建一个方法，并且转换成jsp后可以直接加动态前缀，让静态资源路径不容易乱）

改动后：params.jsp

改动后访问：jsp能够正常获取，且js静态资源文件也可以正常获取

![image-20211212182030803](/images/SpringFrameWork/05-SpringMVC/image-20211212182030803.png)

那么问题来了，如果我不想把这个文件改成JSP呢？

那当让是有办法的

#### ✨让@RequestMapping中找不到的静态资源转交给Tomcat处理

我们只需要**在spring-mvc.xml中配置加一句话**，就可以让在@RequestMapping中**找不到的资源全部转交给Tomcat来进行处理：**

```xml
<mvc:default-servlet-handler/>  
```

紧接着将我们在根目录下的params.jsp改成params.html，并且将其相应的资源路径改成相对路径

![image-20211212182646989](/images/SpringFrameWork/05-SpringMVC/image-20211212182646989.png)

紧接着测试一下：

![image-20211212182727163](/images/SpringFrameWork/05-SpringMVC/image-20211212182727163.png)

成功了hhh

> 实际上我们在实际开发中一般这两种方式都会用，通常是直接下面设置default，上面那个要一条一条的配置，比较麻烦

```xml
<mvc:resources mapping="/js/**" location="/js/"/>
<mvc:default-servlet-handler/>
```

### 配置全局请求编码-解决请求数据乱码的问题

我们之前是这样去设置每个请求的编码：

```java
@RequestMapping(value = "/test4", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
```

但是这样设置太麻烦了....I以后多了每个类或者每个方法都要设置一个（目前我是直接挂在一个类上的），所以：

可以通过在web.xml中配置SpringMVC的Encoding来配置

```xml
<!--    覆盖默认的缺省值为SpringMvc-->
<servlet-mapping>
    <servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
<!--配置全局过滤的filter-->
<filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <!--            指定以哪种方式进行编码-->
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
</filter>
<!--注册mapping-->
<filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

这样就可以了，它相当于手动帮我们给所有请求自动加上了一个`req.setEncoding("UTF-8")`

### ✨@RequestParam获取param参数

​  假设现在有一个需求：

​  有个傻逼项目经理，提出了一个必要条件：客户端在请求/xxx/admin接口的时候，需要携带两个东西：一个是params中的token，另一个是请求体中的用户信息

用axios来实现大概是这样：

```javascript
axios.post(
    "http://localhost:8080/SpringWeb/testParams/admin1", 
    {token: "123456"},
    {
        params: {
            name: "张三",
            age: 18
        }
    }
);
```

也就是说一个请求中同时存在请求体和param

现在尝试下用之前的方法，看看能不能同时获取这两个值：

```java
@RequestMapping("/admin1")
@ResponseBody
public User admin1(String token, @RequestBody User user) {
    System.out.println("token:" + token);
    System.out.println("user:" + user);
    return user;

}
```

显而易见的失败了：获取到了user，但是没有获取到token

![image-20211212190419613](/images/SpringFrameWork/05-SpringMVC/image-20211212190419613.png)

并且发现请求体也没有获取到

![image-20211212191057250](/images/SpringFrameWork/05-SpringMVC/image-20211212191057250.png)

或者说我们现在有另一个需求：如果说是get请求，传递的param不是name而是username，我们是不是得...更改自己的代码成String username，不然就无法获取到该数据

```java
@RequestMapping("/admin1")
@ResponseBody
public void admin1(String username) {
    System.out.println("token:" + username);
}
```

如果我就想让参数名为name，那么就匹配不上了

因此，Spring给我们提供了一个直观的注解：

`@RequestParam("name")`

它可以接收三个参数：

- value：与请求参数的名称
- required：是否是必须的，默认true，为true且用户没传入则报错
- defaultValue：配置默认值，当上面的为false时，如果配置了这个，则返回这个

所以我们想在获取参数时具名只需要：

```java
@RequestMapping("/admin1")
@ResponseBody
public void admin1(@RequstParam("name") String username) {
    System.out.println("token:" + username);
}
```

这样就可以了，当然你也可以理解为这样做是为了让获取到的参数看起来更正规一点

但是当我们尝试同时获取param和请求体的时候依旧失败...

当让这个会在后面解决

### Restful风格的参数

Restful是一种软件架构风格、设计风格，而不是标准，只提供了一组设计原则和约束条件，主要用于客户端和服务器交互的软件，基于这个风格的设计的软件可以更简洁，更有层次感，更易于实现缓存机制等

Restful风格的请求使用的是`url+请求方式`表示一次请求的目的地，Http里面四个表示操作方式的动词如下：

- get 用于获取资源
- post 用于新建资源
- put 用于更新资源
- delete 用于删除资源

例如：

- /user/1 GET ：得到id=1的user
- /user/1 DELETE：删除id=1的user
- /user/1 PUT：更新id=1的user
- /user  POST：新增User

我曹 这样真的很方便，比我之前给新增user来了个newUser方便多了...

### ✨获得Restful风格的参数

上述url地址在/user/1中的1就是要获取的请求参数，在SPringMVC中可以通过占位符的方式进行参数绑定，地址`/user/1`可以写成`/user/{id}`，占位符{id}对应就是1的值，在业务方法中我们可以使用@PathVariable注解进行占位符的匹配获取工作

例如：

`http:ip:port/项目名称/search/user/1`

```java
@RequestMapping("/search/{name}")
@ResponseBody
public void search1(@PathVariable(value="name",require=true) String name){
    System.out.println(name)
}
```

他可以接收多个参数

下面来简单演示一下：接收name和age，返回一个User

```java
@RequestMapping(value = "/search", produces = "application/json;charset=UTF-8")
public class UserSearchController {
    @RequestMapping("/user/{name}/{age}")
    @ResponseBody
    public User search1(
            @PathVariable(value = "name", required = true) String name,
            @PathVariable(value = "age", required = false) int age) {
        User user = new User();
        user.setName(name);
        user.setAge(age);
        return user;
    }
}
```

运行结果：

![image-20211212214244032](/images/SpringFrameWork/05-SpringMVC/image-20211212214244032.png)

### ✨自定义类型转换器

SpringMVC默认已经提供了一些常用的类型转换器，例如客户端提交的字符串转换成int参数

但不是所有的数据类型都提供了转换器，没有提供的就需要自定义转换器，例如：日期类型

比如说前端发送的并非是**时间戳**而是`yyyy-MM-dd hh:mm:ss`格式的时间

自定义类型转换器的开发步骤：

1. 定义转换器类实现Converter接口
2. 在配置文件中声明转换器
3. 在`<annotaion-driven>`中引用转换器

其实实际操作起来非常简单

假设我们现在需要将`yyyy-MM-dd`格式的时间转换为时间格式，那么需要：

在`/controller`目录下新建一个DateController类，该类实现Converter接口

PS：注意，这个Converter接口是：import org.springframework.core.convert.converter.Converter; `core`包下的

```java
public class DateConverter implements Converter<String, Date> {

    @Override
    public Date convert(String source) {
//        将日期的字符串转换为字符串，并进行返回，日期字符串的格式为：2021-11-11
//        这里用的是Java的日期格式化类
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = simpleDateFormat.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
```

然后在spring-mvc中注册一下

```xml
<!--    声明时间转换器:在工厂中注入 spring工厂类中的converters相当于是我们可以自由的添加额外的解析字段-->
<bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
    <property name="converters">
        <list>
            <bean class="com.MySpringMvc.converter.DateConverter"/>
        </list>
    </property>
</bean>
```

最后在spring-mvc中应用这个转换器

```xml
<mvc:annotation-driven conversion-service="conversionService"/>
```

接下来我们通过两种方式来测试能不能获取date，第一种是通过RestFul风格参数获取，第二种是param获取

```java
@RequestMapping(value = "/user2/{date}", method = RequestMethod.GET)
@ResponseBody
public String search2(@PathVariable("date") Date date) {
    return date.toString();
}

@RequestMapping("/user3/{name}/{age}")
@ResponseBody
public Date search3(@PathVariable("name") String name, @PathVariable("age") int age,
                    @RequestParam("date") Date date) { //最后这个是获取时间参数
    System.out.println(name);
    System.out.println(age);
    System.out.println(date);
    return date.toString();

}
```

测试第二种，若第二种通过那么第一种肯定也通过：

![image-20211212221426046](/images/SpringFrameWork/05-SpringMVC/image-20211212221426046.png)

完美运行

### 获取Servlet相关的API(Req,Res,Session等)

![image-20211212221823213](/images/SpringFrameWork/05-SpringMVC/image-20211212221823213.png)

### ✨@RequestHeader获取请求头

使用@RequestHeader可以获取请求头信息，相当于Web阶段学习的`req.getHeader(name)`

@RequestHeader注解的属性如下：

- value：请求头的名称
- required：是否必须携带请求头
- defaultValue：当require为false时，给定的默认值

比方说我们要求客户端在发送数据的时候一定要带上User-Agent和Token

```java
@RequestMapping("/user4")
@ResponseBody
public String search3(@RequestHeader("Token") String token, @RequestHeader("User-Agent") String userAgent) {
    System.out.println(token);
    System.out.println(userAgent);
    return token;
}
```

PostMan测试结果：

服务端打印的数据：

```md
abcedfg
PostmanRuntime/7.28.4
```

![image-20211212222526347](/images/SpringFrameWork/05-SpringMVC/image-20211212222526347.png)

### ✨@CookieValue 获取cookie

使用@CookieValue可以获取指定的COOKIE值

注意 set Cookie 依旧是要通过Servlet的HttpServletRequest来进行操作

@CookieValue注解的属性如下：

- value ：Cookie名称
- required：是否必须
- defaultValue：当上面那个玩意为false时给予的值，默认是给一个：
  `\n\t\t\n\t\t\n\uE000\uE001\uE002\n\t\t\t\t\n`

这里就拿Servlet默认颁发的为了后续使用session的Cookie来演示：

![image-20211212224813359](/images/SpringFrameWork/05-SpringMVC/image-20211212224813359.png)

```java
@RequestMapping("/user5")
@ResponseBody
public String search4(@CookieValue("JSESSIONID") String sessionId) {
    System.out.println(sessionId);
    return sessionId;
}

```

测试：

![image-20211212225042899](/images/SpringFrameWork/05-SpringMVC/image-20211212225042899.png)

## 文件上传

首先回顾下文件上传的原理

![image-20211212230443867](/images/SpringFrameWork/05-SpringMVC/image-20211212230443867.png)

我们之前是通过Hutool或者Apache之类的插件获取到相应的内容..前提是获取到了OutputStream，而且流程也较为繁琐

现在我们新建一个uploadFile.jsp，用于上传文件

```html
<%--
  Created by IntelliJ IDEA.
  User: Amayakite
  Date: 2021/12/12
  Time: 22:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%--文件上传的表单--%>
<form action="${pageContext.request.contextPath}/search/uploadFile" method="post" enctype="multipart/form-data">
    文件名：<input type="text" name="name"/><br>
    选择文件：<input type="file" name="file"/><br>
    <input type="submit" value="上传"/><br>
</form>
</body>
</html>

```

### 单文件上传实现

Spring中内置了对Apache FileUpload的解析器，我们只需要进行如下三步即可完成配置：

1. 倒入Apache fileupload的依赖
2. 配置文件上传解析器
3. 配置文件上传编码

apache fileupload需要如下两个包

```xml
<!-- https://mvnrepository.com/artifact/commons-io/commons-io -->
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.11.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.4</version>
</dependency>

```

接着在spring-mvc.xml中配置文件上传的解析器

```xml
<!--    配置文件上传解析器 id一定要是multipartResolver-->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!--        上传文件总大小-->
    <property name="maxUploadSize" value="104857600"/>
    <!--        上传单个文件大小-->
    <property name="maxUploadSizePerFile" value="1048576"/>
    <!--        上传文件的编码类型-->
    <property name="defaultEncoding" value="UTF-8"/>
    <!--        还可以设置一些别的，具体有这种需求了再说-->
</bean>
```

接着编写代码实现文件的存储

```java
@RequestMapping("/uploadFile")
@ResponseBody
public String quick(String name, MultipartFile file) throws IOException {
    //        上面的形参要和上传时的参数名对应
    System.out.println(name);
    //        获得文件名称
    System.out.println(file.getOriginalFilename());
    //        保存文件 文件名使用传入的name，后缀使用文件的后缀
    file.transferTo(new File("d:/upload/" + name + "." + file.getOriginalFilename().split("\\.")[1]));
    return "quick";
}
```

接着测试一下：

![image-20211212232510392](/images/SpringFrameWork/05-SpringMVC/image-20211212232510392.png)

看看那个目录：

![image-20211212232538258](/images/SpringFrameWork/05-SpringMVC/image-20211212232538258.png)

### 多文件上传实现

其实很简单，先按照单文件上传的步骤走一遍，然后例如是上传两个文件：

uploadFIle.jsp:

```html
<form action="${pageContext.request.contextPath}/search/uploadFile" method="post" enctype="multipart/form-data">
    文件名：<input type="text" name="name"/><br>
    选择文件：<input type="file" name="file1"/><br>
    选择文件2：<input type="file" name="file2"/><br>
    <input type="submit" value="上传"/><br>
</form>
```

然后在用Java代码的时候声明接受两个`MultipartFile`即可：

```java
@RequestMapping("/uploadFile")
@ResponseBody
public String quick(String name, MultipartFile file1,MultipartFile file2) throws IOException {
    //做你想做的事情 例如保存文件：
    file1.transferTo(new File("d:/upload/" + name + "1." + file.getOriginalFilename().split("\\.")[1]));
    file2.transferTo(new File("d:/upload/" + name + "2." + file.getOriginalFilename().split("\\.")[1]));
    return "ok";
}

//或者说可以使用一个数组来进行接收 前提是上传时，所有的文件的name都要相同
//例如全都叫uploadFile
@RequestMapping("/uploadFile")
@ResponseBody
public String quick(String name, MultipartFile[] uploadFile) throws IOException {
    //做你想做的事情 例如保存文件：
    for(MultipartFile file:uploadfile){
        //上传文件
    }
    return "ok";
}



```
