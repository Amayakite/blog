---
title: 07-SpringMVC拦截器和异常的处理
date: 2021-12-13 16:25:30
category: Spring-FrameWork
tag:
- Java
- Spring
- SpringMvc
- JavaWeb
- 拦截器
- 过滤器
- 异常
- Execption

---

## 拦截器基本介绍

​  SPringMVC的拦截器类似于Servlet开发中的过滤器filter，用于对处理器进行**预处理**或**后处理**

​  将拦截器按照一定的顺序连接成一条链，这条链也被称为拦截器链，在访问被拦截方法或字段时，拦截器链中的拦截器就会按其之前定义的顺序被调用，拦截器也是AOP思想的具体实现

### 拦截器和过滤器的区别

|   区别   | 过滤器(Filter)                                                | 拦截器(Interceptor)                                                                                                                                    |
| :------: | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 使用范围 | 是Servlet的一部分，任何JavaWeb工程都可以使用                  | 是SpringMVC框架自己的<br />只有使用了SpringMVC框架才可以使用                                                                                           |
| 拦截范围 | 在url-pattern中配置了`/*`之后，可以对所有要访问的资源进行拦截 | 在`<mvc:mapping path=""/>`中配置了`/**`之后<br />也可以对多个资源进行拦截，但是可以通过<br />`<mvc:exculede-mapping paht=""/>`标签排除不需要拦截的功能 |

简而言之，拦截器就相当于SPring帮我们封装好了的Filter

### 拦截器的快速入门

自定义拦截器很简单，只需要如下三步即可实现

1. 创建拦截器类实现HandlerInterceptor接口
2. 配置拦截器(spring-mvc.xml)
3. 测试拦截器的拦截效果

我们先配置下基本的项目

spring-mvc.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <!--    注解扫描-->
    <context:component-scan base-package="com.MyInterceptor.controller"/>

    <!--    mvc注解驱动-->
    <mvc:annotation-driven/>
    <!--    访问资源控制-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"
          id="internalResourceViewResolver">
        <property name="prefix" value="/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--    静态资源开放-->
    <mvc:default-servlet-handler/>


</beans>
```

web.xml

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

然后新建一个index.jsp 里面随便写一些内容

再然后在controller包下新建一个TargetController

```java
@Controller
public class TargetController {

    @RequestMapping("/target")
    public String show() {
        return "index";
    }

    @RequestMapping("/target1")
    @ResponseBody
    public String show1() {
        return "index";
    }

}
```

测试一下，能够正常访问

#### 创建拦截器类实现HandlerInterceptor接口

我们创建一个interceptor文件夹，在其中创建MyInterceptor类，并实现HandlerInterceptor接口

```java
public class MyInterceptor implements HandlerInterceptor {
}
```

实现完毕后发现并没有实际要我们实现的接口

但是发现他有三个default的方法

![image-20211213175241236](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213175241236.png)

我们现在把三个都重写一下： 他们三对应了三个区域

```java
public class MyInterceptor implements HandlerInterceptor {
    /**
     * 在目标方法执行之前执行
     *
     * @param request
     * @param response
     * @param handler
     * @return 返回true或者false 如果返回false则不返回任何内容 默认是返回true
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle:在目标方法执行之前执行");
        return true;
    }

    /**
     * 在目标方法执行之后 视图返回之前执行
     *
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle:在目标方法执行之后 视图返回之前执行");
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * 在整个流程都执行完毕后执行
     *
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion:在整个流程都执行完毕后执行");
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```

接下来配置下看卡能否正常生效

#### 配置拦截器(spring-mvc.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <!--    注解扫描-->
    <context:component-scan base-package="com.MyInterceptor.controller"/>

    <!--    mvc注解驱动-->
    <mvc:annotation-driven/>
    <!--    访问资源控制-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"
          id="internalResourceViewResolver">
        <property name="prefix" value="/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--    静态资源开放-->
    <mvc:default-servlet-handler/>

    <!--    配置拦截器-->
    <mvc:interceptors>
        <mvc:interceptor>
            <!--            path表示对哪些资源进行拦截控制，/**表示对所有资源都进行拦截操作-->
            <mvc:mapping path="/**"/>
            <!--            使用我们刚刚写的那个自定义资源拦截器-->
            <bean class="com.MyInterceptor.interceptor.MyInterceptor" id="interceptor"/>
        </mvc:interceptor>
    </mvc:interceptors>
</beans>
```

#### 测试拦截器的拦截效果

接下来部署一下工程并发布，看看效果如何

当我们访问`/tatget`和`/target1`以及不存在的资源的时候，拦截器都被触发了：

```md
preHandle:在目标方法执行之前执行
postHandle:在目标方法执行之后 视图返回之前执行
afterCompletion:在整个流程都执行完毕后执行
```

### ✨preHandle 对用户传入的信息进行处理

```java
/**
     * 在目标方法执行之前执行
     *
     * @param request
     * @param response
     * @param handler
     * @return 返回true或者false 如果返回false则不返回任何内容 默认是返回true
     * @throws Exception
     */
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    System.out.println("preHandle:在目标方法执行之前执行");
    return true;
}

```

如果我们这里返回false 则我们访问的路径：将什么都不会返回

![image-20211213180515878](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213180515878.png)

### postHandle 对ModelAndView的进一步处理

```java
/**
     * 在目标方法执行之后 视图返回之前执行
     *
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
@Override
public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    System.out.println("postHandle:在目标方法执行之后 视图返回之前执行");
    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
}
```

可以看到，这里接受了一个modelAdnView的参数 也就是说我们可以自由的添加一些request域的参数

比方说我们的index.jsp接收一个参数：successMessage

```html
<jsp:useBean id="successMessage" scope="request" type="java.lang.String"/>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
${successMessage}
this is a index
</body>
</html>

```

但是我们直接请求这个参数是坑定为null的，所以说只需要在postHandler中做如下设置：

```java
@Override
public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    System.out.println("postHandle:在目标方法执行之后 视图返回之前执行");
    modelAndView.addObject("successMessage", "This is a postHandle");
    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
}
```

接着访问，得到了我们设置的

![image-20211213181154753](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213181154753.png)

### afterCompletion 对异常的处理

```java
/**
     * 在整个流程都执行完毕后执行
     *
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
@Override
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    System.out.println("afterCompletion:在整个流程都执行完毕后执行");
    HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
}
```

这个用的实际上比较少，一般是用作对异常的处理，例如：

我们现在由两个页面，一个没有任何异常，一个有异常：

```java
@RequestMapping("/target")
public String show() {
    return "index";
}

@RequestMapping("/target1")
@ResponseBody
public String show1() {
    return String.valueOf(1 / 0);
}
```

那么直接访问这个有异常的是会直接返回500

所以说可以这样配置：

```java
@Override
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    System.out.println("afterCompletion:在整个流程都执行完毕后执行");
    //        如果由异常则进行对异常的处理
    if (ex != null) {
        System.out.println("exception: " + ex.getMessage());
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("出现异常辣");
        response.getWriter().close();
    }
}
```

接着访问那个有异常的页面：

![image-20211213181808716](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213181808716.png)

## 拦截器的总结以及不拦截某个地址

![image-20211213182233515](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213182233515.png)

使用：

```java
public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle:在目标方法执行之前执行");
        return true;
    }


    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle:在目标方法执行之后 视图返回之前执行");
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }


    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion:在整个流程都执行完毕后执行");
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```

注册路径：spring-mvc中配置：

```xml
<!--    配置拦截器-->
<mvc:interceptors>
    <mvc:interceptor>
        <!--            path表示对哪些资源进行拦截控制，/**表示对所有资源都进行拦截操作
      这里一般是：/admin/** 或者 /xx/** 或者
  -->
        <mvc:mapping path="/**"/>
        
        <!--这里配置excluede指的是不拦截某个地址，例如我上面那里写了/admin/** 但是下面写了：/admin/login
   则：/admin/login不会被拦截 注意 mappping 和 exclude-mapping 都要写在bean的上面 不然会报错
   这里和mapping一样，支持/admin/aa/** 这种风格的写法
  -->
        <mvc:exclude-mapping path="/index.jsp"/>

        <!--            使用我们刚刚写的那个自定义资源拦截器-->
        <bean class="com.MyInterceptor.interceptor.MyInterceptor" id="interceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

## SpringMVC中异常的处理

我们现在有着如下项目结构：

![image-20211213184231469](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213184231469.png)

接下来我们在DemoServiceImpl中人为的增加一些异常：

```java
public class DemoServiceImpl {
    public void show1() {
        System.out.println("抛出类型转换异常");
        Object str = "张三";
        Integer num = (Integer) str;
    }

    public void show2() {
        System.out.println("抛出空指针异常");
        Object obj = null;
        System.out.println(obj.toString());
    }

    public void show3() {
        System.out.println("抛出数组越界异常");
        int[] arr = new int[2];
        System.out.println(arr[2]);
    }

    public void show4() {
        System.out.println("抛出除数为0异常");
        int a = 1 / 0;
    }

    public void show5() throws IOException {
        System.out.println("抛出IO异常");
        throw new IOException();
    }

    public void show6() throws MyException {
        System.out.println("抛出自定义异常");
        throw new MyException("自定义异常");
    }

}

class MyException extends Exception {
    public MyException(String msg) {
        super(msg);
    }
}
```

好了，接下来我们写个Controller来调用下：

```java
private DemoServiceImpl demoService = new DemoServiceImpl();

@RequestMapping("/testException")
@ResponseBody
public String show1() {
    demoService.show1();
    return "Hello~";
}
```

### 异常处理的思路

​  系统中异常包括两类

- 预期异常
- 运行时异常RuntimeException

前者通过捕获获取异常信息，后者主要通过规范代码开发，测试等手段减少运行时异常的发生

系统的Dao、Service、Controller出现都通过throws Exception向上抛出，最后由SpringMVC前端控制交给**异常处理器**进行异常处理，如下图：

![image-20211213202431112](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213202431112.png)

## 异常处理的两种方式

### ✨SimpleMapExceptionResolver简单异常处理器

 SpringMVC已经定义好了该类型转换器，在使用时可以根据项目情况进行相应异常与视图的映射配置

我们先手动创建两个文件吧

![image-20211213205343528](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213205343528.png)

下面那个error里面写一个通用的异常处理

上面那个里面写：针对于转换异常的异常处理

配置异常处理器非常简单，只需要在xml中注册`SimpleMappingExceptionResolver`：

注意：defaultErrorView和exceptionMappings不同的是：

defaultErrorView

```xml
<!--    配置异常处理器-->
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver" id="exceptionResolver">
    <!--       配置通用的异常处理机制，会捕获基本的异常并统一处理 这里的error代表着根目录下的error.jsp-->
    <property name="defaultErrorView" value="error"/>
 
    <!--正常的工作中就算用也只会用到下面的那个 比较少用上面的-->
    
    <!--        通过exceptionMappings根据触发异常的类型来指定异常的处理机制-->
    <property name="exceptionMappings">
        <map>
            <!--                这里配置类型转换异常的处理方案-->
            <entry key="java.lang.ClassCastException" value="errorpage/defult"/>
        </map>
    </property>
</bean>
```

接下来写两个类看看都有什么效果：

```java
@RequestMapping("/testException")
@ResponseBody
public String show1() {
    demoService.show1();
    return "Hello~";
}

@RequestMapping("/testException2")
@ResponseBody
public String show2() {
    demoService.show2(); //这里是空指针异常
    return "Hello~";
}
```

访问：

![image-20211213210004430](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213210004430.png)

![image-20211213210014009](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213210014009.png)

看来东西没错

那自定义异常又该如何处理呢？

### ✨HandlerExceptionResolver自定义异常处理器

注意 这个和上面那个只能二选一， 这种方式配置的异常处理器是全局异常处理器

1. 创建异常处理器类实现HandlerExceptionResolver接口
2. 配置异常处理器
3. 编写异常页面

他这里需要重写一个方法：

我们新建一个error文件夹 用于处理error

```java
public class MyException implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        return null;
    }
}
```

可以看到，最后返回的是一个ModelAndView

并且接受四个参数 req res handler exeception

那这就简单了啊

```java
public class MyException implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

//        能进进入到这里的，ex肯定为true
        System.out.println("进入了MyException");
//        判断是否是自定义异常
        if (ex instanceof com.MyInterceptor.service.MyException) {
            ModelAndView modelAndView = new ModelAndView();
//            设定页面
            modelAndView.setViewName("myerror");
            modelAndView.addObject("exception", ex.getMessage());
            return modelAndView;
        }
        return null;
    }
}
```

接着只需要在spring-mvc中配置如下内容 不需要填写id之类的

```xml
<bean class="com.MyInterceptor.error.MyException"></bean>
```

接着我们创建一个myerror.jsp

```html
<jsp:useBean id="exception" scope="request" type="java.lang.String"/>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>Error</h1>
${exception}


</body>
</html>

```

然后再尝试抛出一个自定义异常：

```java
@RequestMapping("/testException3")
@ResponseBody
public void show6() throws MyException {
    demoService.error6();

}
public void error6() throws MyException {
    System.out.println("抛出自定义异常");
    throw new MyException("自定义异常");
}
```

访问：

![image-20211213213015952](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213213015952.png)

## 异常处理的总结

![image-20211213213334067](/images/SpringFrameWork/07-SpringMVC拦截器/image-20211213213334067.png)
