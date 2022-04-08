---
title: 08-AOP
date: 2021-12-13 21:35:30
category: Spring-FrameWork
tag:
- Java
- Spring
- AOP
---

## 基本介绍

> AOP是 Aspect Oriented Programming的缩写，意思是**面向切面编程**，是通过预编译方式和运行期**动态代理**实现程序功能的统一维护的一种技术
>
> AOP是OOP(面向对象)的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范围，利用AOP可以对业务逻辑的各个部分进行隔离，从而使得**业务逻辑各部分之间的耦合度降低**，提高程序的可用性。同时提高了开发效率

这么说你可能要有点懵逼 没错 我也一样

这玩意我不知道怎么说 只能举个例子吧

### 回顾动态代理

​  AOP说人话就是动态代理来缩短我们的编写代码的时间，那么该怎么缩短呢？

​  草，你忘了动态代理？

​  巧了，我也忘了，这玩意属于反射，当然之前在JavaSE中学到的动态代理也没那么明白，这里我举一个简单的例子吧：

- 你现在是一个上帝，想要去买电脑
- 现在有两个地方可以买电脑
  - 你家楼下的电脑店
  - 远在异国他乡的XXX官方工厂
- 你现在可以选择在两个地方购买同一个品牌的电脑，这个品牌我就叫`Kite`吧
- 你在你家楼下的电脑店买`Kite`电脑要1000块钱，他会给你送货上门，并送你鼠标键盘等
- 你到`Kite`的官方工厂买`Kite`电脑要500块钱，什么都不附赠

​  你会选择到哪里买？

​  傻X才回去异国他乡的本部买吧~

​  好了，到这里，你可能会有疑惑，好好的动态代理，怎么讲到电脑来了？

那可不！

​  现在有一个需求，定义一个接口 然后使用实现类调用它完成在楼下电脑店的购买和xx工厂的购买

```java
public interface DianNao {
    /**
     * 购买电脑的方法，应该返回一个String给客户端代表买到了什么东西
     *
     * @param money 购买电脑的金额
     * @return
     */
    String purchase(int money);

    /**
     * 打印客户买到的东西的信息
     */
    void show();

}
```

这是一个接口 如果说我们正常情况下来说的话

会定义两个类实现 一个类是总工厂类 （以下这玩意简称厂）一个类是楼下店类（以下这玩意简称店）

厂：

```java
publiv Cang implements DianNao{
    public String shop;
    //完成相应的方法
    public Stirng purchase(int money){
        if(money>=500){
            sout("厂家收到了%s的钱，发送一台电脑"+money);
            this.shop="一台电脑";
            return this.shop;
        }
    }
    pubic void show(){
        sout(shop)
    }

}
```

店：

```java
public Dian extends Cang{
    //重写方法，加价卖给客户
     public Stirng purchase(int money){
        if(money>=1000){
            sout("楼下小店收到了%s的钱，发送一台电脑+鼠标键盘+送货上门"+money);
            super.purchase(money);
            this.shop="一台电脑+鼠标键盘+送货上门";
            return this.shop;
        }
    }
}
```

看到这里 如果你感觉挺正常的----那没错，我也是这样想的

但是动态代理就是不走寻常路，还记得动态加载的特点吗：

**行时加载需要的类，如果运行时不用该类，即使不存在该类，也不报错，降低了依赖性**

但是我们这 有可能我并不会去楼下小店买啊，但是也创建了一个楼下小店的文件，这就有点。。。没太大必要吧

我们的理想状态是：需要什么，才会加载什么，但是这楼下的小店，我们并不一定会去啊

但是厂商，是我们无论如何都会接触到的

所以这个时候就需要用动态代理来实现了

动态代理的特点：

1. 增强参数列表
2. 增强返回值类型
3. 增强方法体执行逻辑

这看起来很高大上，实际上就是反射的调用罢了

具体的原理可以看看这个[视频](https://www.bilibili.com/video/BV1qv4y1o79t?p=366&share_source=copy_web)

假设你已经看完了，我们先创建好一个厂商类：

```java
public class Cang implements DianNao {
    private String shop;

    @Override
    public String purchase(int money) {
        if (money >= 500) {
            System.out.println("厂家收到了%s的钱，发送一台电脑" + money);
            this.shop = "一台电脑";
            return this.shop;
        } else {
            return null;
        }
    }

    @Override
    public void show() {
        System.out.println(this.shop);
    }

}
```

然后代码实现：

```java
package com.MyAoP;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 19-1-Spring注解
 * @BelongsPackage com.MyAoP
 * @date 2021/12/13 22:37
 * @description 项目描述
 */
public class MyGoShop {
    public static void main(String[] args) {
        //        众所周知，买电脑无论如何都要经手厂商，说以厂商是一定要有的
        Cang cang = new Cang();

        /*
         * 这里是动态代理增强cang对象
         * Proxy是java.lang.reflect 反射包中的一个工厂类
         * 它之中的newProxyInstance 创建动态代理对象
         * 接收三个参数：
         * 类加载器： cang.getClass().getClassLoader(),
         * 接口数组：cang.getClass().getInterfaces(),让返回值实现这些接口，方便我们强转
         * 增强类：InvocationHandler
         * 核心就在于这个InvocationHandler
         * 这个方法会返回一个代理的对象，这里通过接口来接收
         * */
        DianNao proxyInstance = (DianNao) Proxy.newProxyInstance(
            cang.getClass().getClassLoader(),
            cang.getClass().getInterfaces(),
            new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    /*
                    在InvocationHandler中只有一个方法：invoke
                    这个方法接收三个参数：
                    1.被代理对象
                    2.被代理对象的方法
                    3.方法的参数
                    其作用是拦截所有方法的执行，并改成我们想要的结果
                    */
                    //当你看到Method的时候，就应该想起来应该怎么做了
                    if (method.getName().equals("purchase")) {
                        System.out.println("购买电脑");
                        int money = (int) args[0];
                        if (money >= 1000) {
                            //添加自己的内容
                            System.out.println("在楼下小店购买成功");
                            //调用原有对象的方法 修改参数
                            Object invoke = method.invoke(cang, money - 500);
                            //                                注入
                            Field shop = cang.getClass().getDeclaredField("shop");
                            shop.setAccessible(true);
                            shop.set(cang,"一台电脑,鼠标键盘等,外加送货上门");
                            return "一台电脑,鼠标键盘等,外加送货上门";
                        } else {
                            return null;
                        }
                    } else {
                        return method.invoke(cang, args);
                    }
                }
            }
        );
        System.out.println(proxyInstance.purchase(1000));
        proxyInstance.show();
    }
}

```

### AOP的作用及优势

- 作用：在程序运行期间，在不修改源码的情况下对方法进行功能增强
- 优势：减少重复代码，提高开发效率，并且便于维护

大概就是这样，左边的目标方法和中间的日志控制功能增强方法，通过配置文件进行动态代理调用，最终运行

![image-20211213233258121](/images/SpringFrameWork/08-AOP/image-20211213233258121.png)

### AOP的底层实现

​  实际上，AOP的底层是通过SPring提供的动态代理技术实现的，在运行期间，Spring动过反射生成动态代理对象，代理对象方法执行时进行增强功能的介入，在去调用目标对线的方法，从而完善功能的增强

### 常用的动态代理技术(JDK/Cglib)

- JDK代理：基于接口的动态代理技术 就是我们刚刚用的
  如果说目标对象没有接口的话  就难办了
- cglib代理：基于父类的动态代理技术（第三方的），Spring集成了这个玩意

所以说，Spring这两种方式的动态代理都可以使用

![image-20211213234618553](/images/SpringFrameWork/08-AOP/image-20211213234618553.png)

### 简单实现动态代理增强(JDK)

如果你完整的看下来，到这里是手到擒来的问题

一个接口

```java
public interface TargetInterface {
    void say();
}

```

一个实现类：

```java
public class Target implements TargetInterface {
    @Override
    public void say() {
        System.out.println("Target的Say方法被调用了");
    }
}
```

一个增强类

```java
public class Advice {
    public void before() {
        System.out.println("前置增强...");
    }

    public void after() {
        System.out.println("后置增强...");
    }


}
```

最后写一个Proxy方法

注意啊，JDK的动态代理几乎所有框架都用了，所以得一目了然的使用他

```java
public class ProxyTest {
    public static void main(String[] args) {
        Target target = new Target();
        TargetInterface proxyInstance = (TargetInterface) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    Advice advice = new Advice();
                    advice.before();
                    Object invoke = method.invoke(target, args);
                    advice.after();
                    return invoke;
                }
            }
        );
        proxyInstance.say();
    }
}
```

运行结果：

```md
前置增强...
Target的Say方法被调用了
后置增强...
```

### 简单实现动态代理增强(Cglib)

其实我们之前已经导入过了，就在spring-context依赖的spring-core之中

为啥在这能找打它呢？

因为Spring从古至今都以来这玩意，之前有一段时间需要我们手动的去添加这个包的依赖，后面Spring觉得这样不好，于是就内置了一个cglib

![image-20211214114239332](/images/SpringFrameWork/08-AOP/image-20211214114239332.png)

接下来用cglib来演示一下---它不需要依赖接口，注意，下面这玩意不需要自个完全记住，但是等到工作个一两年了、需要自己手动造轮子了，就得好好的了解下它

```java
public static void main(String[] args) {
    // 目标对象
    Target target = new Target();
    // 增强对象
    final Advice advice = new Advice();

    // 1. 创建增强器 org.springframework.cglib.proxy.Enhancer;
    Enhancer enhancer = new Enhancer();

    // 2. 设置父类（目标）
    enhancer.setSuperclass(Target.class);

    // 3. 设置回调 需要传入一个callback对象 这里传入的是它的子接口MethodInterceptor的对象
    enhancer.setCallback(new MethodInterceptor() {
        @Override
        public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
            //                是不是感觉非常熟悉的东西来了
            //                执行前置
            advice.before();
            //                执行目标
            Object invoke = method.invoke(target, args);
            //                执行后置
            advice.after();
            return invoke;
        }
    });
    // 4. 生成代理对象
    Target proxy = (Target) enhancer.create();

    // 5. 执行代理对象的方法
    proxy.say();
    System.out.println(proxy.getClass()); //class com.aop.jdk.Target$$EnhancerByCGLIB$$b05937e8

}
```

执行结果：

```md
前置增强...
Target的Say方法被调用了
后置增强...
class com.aop.jdk.Target$$EnhancerByCGLIB$$b05937e8
```

### ✨AOP的相关概念

​  Spring的AOP实现底层就是对上面的动态代理的代码进行了封装，封装后我们只需要对需要关注的部分进行代码编写，并通过配置的方式完成指定目标的方法增强

​  在正式了解AOP的操作之前，我们必须理解AOP 相关术语，常用的术语如下：

- Target(目标对象)：的代理的目标对象
- Proxy(连接点)：一个类被AOP织入增强后，就产生一个结果代理类
- **Joinpoint(连接点)**，所谓连接点是指那些被拦截到的点，在Spring中，这些点指的是方法，因为Spring只支持方法类型的连接点
  - 人话就是：连接点就是要拦截(增强)的方法
  - 就相当于`method.getName().equals("XXXXX")`中的xxxx一样
- **Pointcut(切入点)**：所谓切入点是指我们要对哪些joinpoint进行拦截的定义
  - 人话就是：代理目标有10个方法可以被增强，那这10个方法叫连接点，其中只有5个你增强了，那么这5个方法就叫切入点
  - 连接点包含了切入点，切入点就是我们是实际要增强的方法
- **Advice(增强/通知)**：所谓通知是指拦截到的joinpoint之后所要做的事情就是通知
- **Aspect(切面)**：是切入点和通知的结合
- **Weaving（织入）**：是指把增强应用到目标对象来创建新的代理对象的过程，spring采用动态代理织入，而AspectJ采用编译织入和类装载器织入
  - 说白了就是将我们的切入点和我们的增强的过程，就是把他们组合在一起
- 这概念可真够抽象的

### ✨AOP开发明确的事项

> 需要我们编写的内容：

1. 编写核心业务代码（目标类的目标方法）就是要被增强的方法
2. 编写切面类，切面类中有通知（增强功能的方法）
3. 在配置文件中，配置织入关系，也就是将哪些要被增强的方法和哪些切面类进行结合

> AOP技术实现的内容：

​  Spring框架监控切入点方法的执行，一旦监控到切入点方法被运行，使用动态代理机制，动态创建目标对象的代理对象，根据通知类别，在代理对象的**对应位置**，将通知对应的功能织入，完成完整的代码逻辑运行

人话就是：相当于我们上面那两个简单实现的动态代理

> AOP底层使用哪种代理方式

​  在Spring中，框架会根据目标类是否实现了接口来决定才用哪种动态代理方式

> 知识要点

- AOP：面向切面编程
- AOP底层实现：基于JDK的动态代理和基于Cglib的动态代理
- AOP的重点概念：
  - Pointcut：切入点，被增强的方法
  - Advice：增强/通知，封装增强业务逻辑的方法
  - Aspect：切面，切点+通知
  - Weaving，织入，将切点与通知结合的过程

## ✨AOP编程的快速入门

1. 导入AOP的相关依赖
2. 创建目标接口和目标类（内部要有切入点）
3. 创建切面类（内部有增强方法）
4. 在目标类和切面类的对象创建权交给Spring
5. 在applicationContext.xml中配置织入关系
6. 测试代码

### 导入AOP的相关依赖

可能你会问，Spring的内部不是有一个aop了吗？为什么还要导入？

![image-20211214122952636](/images/SpringFrameWork/08-AOP/image-20211214122952636.png)

但实际上是，这玩意用的是AspectJ，这东西采用编译织入和类装载器织入

所以说 导包吧~

```xml
<!--前置：导入spring-context-->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.13</version>
</dependency>

<!--Spring要完成AOP有两套方案，第一是用原生的，第二是集成这个第三方的
 为啥呢，因为这个玩意比Spring自带的更好，更轻，所以打不过就加入
 所以我们实际上后面的AOP配置都是这个aspectjweaver的配置
 原生的和这个的区别：原生的只有增强，这个才有切入点之类的
-->
<!--         <!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.7</version>
    <scope>runtime</scope>
</dependency>
<!--可能你会问题了，下面这个包又是干嘛用的...上面的那个包是只在运行期生效
	虽然可以去掉那个runtime 但是我也不清楚官方是怎么想的，反正就硬生生的搞两个包
	你如果没有下面的那个包，在写代码的时候就无法调用一些相对应的内容
	当让上面的那个包去掉runtime貌似也可以，反正一般这两个包要一块用
	并且版本要一致
-->
<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjrt -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
    <version>1.9.7</version>
</dependency>



```

### 创建目标接口和目标类（内部要有切入点）

以下的内容都是在com.aop文件夹下

我们首先创建一个targetInterface接口

```java
public interface TargetInterface {
    void say();
}
```

然后创建一个实现类

```java
public class Target implements TargetInterface {
    @Override
    public void say() {
        System.out.println("Target的Say方法被调用了");
    }
}
```

切入点就是这个say方法

### 创建切面类（内部有增强方法）

我们就简单创建一个MyAspect

```java
public class MyAspect {
    public void before() {
        System.out.println("前置增强...");
    }
}
```

### 在目标类和切面类的对象创建权交给Spring

我们在Spring的配置中配置这两个玩意的bean

```xml
<!--    配置目标对象-->
<bean class="com.aop.Target" id="target"></bean>
<!--    配置切面对象-->
<bean class="com.aop.MyAspect" id="myAspect"></bean>
```

### 在applicationContext.xml中配置织入关系

接着在spring的配置文件中写入如下内容：

aop也是spring的一个依赖，你输入aop:con 然后就会自动弹出来导入

```xml
<!--    配置织入：告诉Spring
    哪些方法(切点)
    需要进行
    哪些增强（前置增强、后置增强）-->
<aop:config>
    <!--   声明切面：告诉Spring，哪个是切面类-->
    <aop:aspect ref="myAspect">
        <!--            声明哪个方法是哪处的增强：前置，后置
                            pointcut:告诉Spring，具体要对那个方法进行增强 需要传入一个表达式，这个execution表达式之后再说明
            -->
        <aop:before method="before"
                    pointcut="execution(public void com.aop.Target.say())">
        </aop:before>
    </aop:aspect>
</aop:config>
```

最终的配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--    配置目标对象-->
    <bean class="com.aop.Target" id="target"></bean>
    <!--    配置切面对象-->
    <bean class="com.aop.MyAspect" id="myAspect"></bean>

    <!--    配置织入：告诉Spring
    哪些方法(切点)
    需要进行
    哪些增强（前置增强、后置增强）-->
    <aop:config>
        <!--   声明切面：告诉Spring，哪个是切面类-->
        <aop:aspect ref="myAspect">
            <!--            声明哪个方法是哪处的增强：前置，后置
                            pointcut:告诉Spring，具体要对那个方法进行增强 需要传入一个表达式，这个execution表达式之后再说明
            -->
            <aop:before method="before"
                        pointcut="execution(public void com.aop.Target.say())">
            </aop:before>
        </aop:aspect>
    </aop:config>
</beans>
```

### 测试代码

编写一个测试类测试一下：

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class AopTest {
    @Autowired()
    public TargetInterface target;

    @Test
    public void test1(){
        target.say();
    }
}
```

运行结果：

```md
前置增强...
Target的Say方法被调用了
```

可以看到，我们想要的效果被实现了

但是实际上我们在代码中并没有对这两个类做任何事情，只是在配置文件中配置了下相应的内容，就这样了

接下来一步一步的说明吧，先说说那个看着有点繁琐的表达式

### AOP标签的说明

我们刚刚使用AOP的时候，使用了如下的标签：

```xml
<aop:config>
    <aop:aspect ref="myAspect">
        <aop:before method="before"
                    pointcut="execution(public void com.aop.Target.say())">
        </aop:before>
    </aop:aspect>
</aop:config>
```

其中第一个 aop:config 一眼就能看出来 这里可以配置aop相关的内容 所以也被称为配置织入：要对哪些类的哪些方法执行哪些时段的增强

然后里面的第一个标签：aop:aspect 就是声明我们的切面（增强类）

然后在这其中可以配置其的切点---aop:before

​  其中的method属性就是在某个类的某个方法的执行前执行的方法

​  然后ponitcut目前根据语法来看像是配置具体的方法

### ✨✨切点表达式execution

```xml
pointcut="execution(public void com.aop.Target.say())"
```

pointcut接收的参数叫切点表达式

我们可以通过表达式的语法形式，通过一个表达式一次性指定多个方法

我们这里可以非常直观的看明白，他这里指定的是Target下的say方法

接下来说一说这个execution

但是实际上我们开发时，某个前置增强可能要对多个方法或者说一堆类中的多个方法进行增强

切点表达式的语法为：

```xml
execution([修饰符 可写可不写] 返回值类型 包名.类名.方法名(参数))
```

- 访问修饰符可以省略
- **返回值类型、包名、类名、方法名**可以使用星号`*`代替，表示任意
- **包名与类名**之间的一个点`.`代表当前包下的类，两个点`..`表示当前包及其子包下的类
- 参数列表可以使用两个点`..`表示任意个数，任意类型的参数

比方说我们刚刚写的

```xml
execution(public void com.aop.Target.say())
```

就是指定  com.aop.Target类下的public void  say() 方法进行增强

接下来来几个实际一点的

```java
execution(public void com.MyProject.aop.Target.method());
//第一个 就是对 com.MyProjcet.aop.Target 中的 publi voic method()方法进行增强 并且这个method方法没有参数

execution( void com.MyProject.aop.Target.*(..));
// 第二个 就是对 com.MyProjcet.aop.Target下的 返回void的 所有方法 进行增强


execution(* com.MyProject.aop.*.*(..));
// 第三个 就是对 com.MyProjcet.aop 包下的 所有类 返回任意类型的所有方法 进行增强

execution(* com.MyProjcet.aop..*.*(..));
// 第四个 就是对 com.Myprojcet.aop 其包和其子包下的所有类 返回任意类型的所有方法 进行增强

execution(* *..*.*(..));
// 对所有包的所有类的所有方法进行增强
// 也就是只要存在于这个项目中的方法 都会被增强（在运行时）

```

### ✨✨通知的类型(aop:before等)

```xml
<aop:before method="before" pointcut="execution()"></aop:before>
```

也就是说，语法为：

```xml
<aop:通知类型 method="切面类(增强类)中的方法名" pointcut="切面表达式"></aop:通知类型>
```

通知类型分为5种：

| 名称             | 标签                                                     | 说明                                                                                                                   |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 前置通知         | `<aop:before>`                                           | 用于配置前置通知<br />指定增强方法在切入点的方法**之前**执行                                                           |
| 后置通知         | `<aop:after-returing>`                                   | 用于配置后置通知<br />指定增强方法在切入点的方法**之后**执行                                                           |
| 环绕通知         | `<aop:around>`                                           | 用于配置环绕通知<br />指定增强方法在切入点的**之前和之后**都执行                                                       |
| 异常抛出通知     | `<aop:throwing>`<br />较新版本中是<br />`after-throwing` | 用于配置异常抛出通知<br />指定增强的方法在**出现异常的时候**执行                                                       |
| 最终通知         | `<aop:after>`                                            | 用于配置最终通知<br />**无论增强方法执行是否有异常都会执行**                                                           |
| 特殊增强         | `<aop:declare-parents>`                                  | 看[这篇文章](https://blog.csdn.net/u011734144/article/details/77700072)<br />功能是**为一个已知的API添加一个新的功能** |
| 切点表达式的抽取 | `<aop:pointcut>`                                         | 用于切点表达式的抽取                                                                                                   |

这里额外说下环绕通知和异常抛出通知，以及切点表达式的抽取，其他的直接用即可

#### 环绕通知

这里写的方法有点特殊：

```java
public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    //        Proceeding JoinPoint 正在执行的连接点=切点
    System.out.println("环绕前增强");
    Object proceed = joinPoint.proceed();
    System.out.println("环绕后增强");
    return proceed;
}
```

它必须得返回一个Object 然后就是要使用ProceedingJoinPoint来接收正在运行的方法， 其次调用proceed()方法可能会抛出Throwable异常 当让我们只需要关心在他前面和后面写内容即可

同理，这个方法还支持重载：

```java
Object proceed() throws Throwable;

Object proceed(Object[] var1) throws Throwable;
```

也就是说可以替换传入的参数

接下来配置下文件

```xml
<aop:config>
    <aop:aspect ref="myAspect">
        <!--运行前-->
        <aop:before method="before"pointcut="execution(* com.aop..*.*(..))">
        </aop:before>
        <!--环绕-->
        <aop:around method="around" pointcut="execution(* com.aop..*.*(..))">
        </aop:around>
    </aop:aspect>
</aop:config>
```

测试：

```md
前置增强...
环绕前增强
Target的Say方法被调用了
环绕后增强
```

#### 异常抛出通知

顾名思义，就是有异常的时候要进行的处理

这玩意可以拦截异常Throwable 所有类型**错误**的父类

> 先说下，  AOP的AfterThrowing处理虽然可以对目标方法的异常进行处理，但这种处理与直接使用catch捕捉不同，catch捕捉意味着完全处理该异常，如果catch块中没有重新抛出新的异常，则该方法可能正常结束；而AfterThrowing处理虽然处理了该异常，但它不能完全处理异常，该异常依然会传播到上一级调用者，即JVM

也就是说，这玩意大概是这样的：

- 调用的代码发生异常
- Spring同时唤醒这个方法，并把异常交给JVM...

所以说它并不能拿来处理异常

```java
    public void afterThrowing(Throwable e) {
        System.out.println(e.getMessage());
        System.out.println("抛出异常后置增强...");
    }
```

say方法抛出一个异常

```java
public void say() {
    System.out.println(1/0);
    System.out.println("Target的Say方法被调用了");
}
```

配置：

```xml
<aop:after-throwing method="afterThrowing" pointcut-ref="mytarget" throwing="e"></aop:after-throwing>
```

这里的throwing 指的是 Throwable 的实例化对象，传递给哪个形参

也就是该方法中可以选择接收这个异常并做下其他相关的处理，比如记录下log，但是并不能处理该异常

当然也可以不传参，前提是该方法是不需要参数的，例如
`afterThrowing(Throwable e)` 你不在这传一个参数过去就会报错

但是`afterThrowing()` 它不接受参数的话，没传递参数也不影响

运行结果：

![image-20211214155638842](/images/SpringFrameWork/08-AOP/image-20211214155638842.png)

### ✨切点表达式的抽取

比方说我们现在有一堆玩意都用着同样的切点表达式：

```xml
<aop:before method="before"pointcut="execution(* com.aop..*.*(..))"></aop:before>

<aop:around method="around" pointcut="execution(* com.aop..*.*(..))"></aop:around>

<aop:after-throwing method="afterThrowing" pointcut="execution(* com.aop..*.*(..))"></aop:after-throwing>
```

那这也太痛苦了...

所以我们可以将切点表达式进行抽取，在增强中使用pointcut-ref属性代替pointcut属性来引用抽取后的表达式，例如：

```xml
<aop:config>
    <aop:aspect ref="myAspect">

        <!--     通过ponintcur-ref使用已经定义的切点表达式       -->
        <aop:before method="before" pointcut-ref="mytarget"></aop:before>
        <aop:around method="around" pointcut-ref="mytarget"></aop:around>
        <aop:after-throwing method="afterThrowing" pointcut-ref="mytarget"></aop:after-throwing>
        <!--
   定义切点表达式 注意 这里的名称最好是:aopTarget MyTarget之类的 反正不能叫target    之类的常见词汇 不然有概率冲突它可以在aop aspect内的任意位置定义 最前面或者最后面都可
  -->
        <aop:pointcut id="mytarget" expression="execution(* com.aop..*.*(..))"/>
    </aop:aspect>
</aop:config>
```

当然 一个aspect中可以存在多个切点表达式 名字不一样即可

## 基于注解的AOP开发

基于注解的AOP开发步骤

1. 创建目标和目标类（内部有切点）
2. 创建切面类（内部有增强方法）
3. 将目标类和切面类的对象创建权交给Spring
4. 在切面类中使用注解配置织入关系
5. 在配置文件中开启组件扫描和AOP的自动代理
6. 测试

我们先定义下类并使用注解：

```java
public interface TargetInterface {
    void say();
}
```

```java
@Component("target")
public class Target implements TargetInterface {
    @Override
    public void say() {
        System.out.println("Target的Say方法被调用了");
    }
}
```

```java
@Component("myAspect")
public class MyAspect {
    public void before() {
        System.out.println("前置增强...");
    }

    public void afterThrowing() {
        System.out.println("抛出异常后置增强...");
    }

    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
//        Proceeding JoinPoint 正在执行的连接点=切点
        System.out.println("环绕前增强");
        Object proceed = joinPoint.proceed();
        System.out.println("环绕后增强");
        return proceed;
    }
}
```

### ✨在切面类中使用注解配置织入关系

我们要在切面类中配置下织入关系

```java
@Component("myAspect")
@Aspect //Aspect 表示这个类是代理类
public class MyAspect {
    /**
     * 配置前置增强
     * Before注解定义前置增强 里面传递execution
     */
    @Before("execution(* com.aop.*.*(..))")
    public void before() {
        System.out.println("前置增强...");
    }

    /**
    * AfterThrowing 可以额外传值
    */
    @AfterThrowing(value = "execution(* com.aop.*.*(..))", throwing = "e")
    public void afterThrowing(Throwable e) {
        System.out.println(e.getMessage());
        System.out.println("抛出异常后置增强...");
    }

    @Around("execution(* com.aop.*.*(..))")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
//        Proceeding JoinPoint 正在执行的连接点=切点
        System.out.println("环绕前增强");
        Object proceed = joinPoint.proceed();
        System.out.println("环绕后增强");
        return proceed;
    }
}
```

### ✨在配置文件中开启组件扫描和AOP的自动代理

#### Configuration开启

```java
@Configuration
@ComponentScan(basePackages = "com.aop")
@EnableAspectJAutoProxy(proxyTargetClass = true) //AOP扫描自动代理
public class SpringConfiguration {
}
```

#### ApplicationContext开启

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
 <!--扫包-->
    <context:component-scan base-package="com.aop"/>
 <!--配置AOP扫描自动代理-->
    <aop:aspectj-autoproxy/>
</beans>
```

### 测试

这里我使用的是Configuration

创建测试类 和测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfiguration.class)
public class AopTest {
    @Autowired()
    public TargetInterface target;

    @Test
    public void test1() {
        target.say();
    }

}
```

运行结果：

```md
环绕前增强
前置增强...
Target的Say方法被调用了
环绕后增强
```

### ✨注解内切面表达式的抽取@Pointcut

我们原先是这样的，那这玩意能否像在xml配置文件中那样进行抽取配置呢？

```java
@Component("myAspect")
@Aspect //Aspect 表示这个类是代理类
public class MyAspect {

    @Before("execution(* com.aop.*.*(..))")
    public void before() {
        System.out.println("前置增强...");
    }

    @AfterThrowing(value = "execution(* com.aop.*.*(..))", throwing = "e")
    public void afterThrowing(Throwable e) {
        System.out.println(e.getMessage());
        System.out.println("抛出异常后置增强...");
    }

    @Around("execution(* com.aop.*.*(..))")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("环绕前增强");
        Object proceed = joinPoint.proceed();
        System.out.println("环绕后增强");
        return proceed;
    }
}
```

其实非常简单，只需要进行如下操作即可：

1. 定义个空方法，加上如下注解
    `@Pointcut("execution(表达式)")`
2. 使用：`@Before("刚刚定义的空方法()")`

```java

@Component("myAspect")
@Aspect
public class MyAspect {
    
    //这个方法名无所谓 主要是这个方法头上加上@Pointcut并定义即可
    @Pointcut("execution(* com.aop.*.*(..))")
    public void pointcut() {
        //方法体内部无需任何内容
    }

 //调用的时候，直接在这里面写上我们刚刚定义的那个方法即可pointcut()
    @Before("pointcut()")
    public void before() {
        System.out.println("前置增强...");
    }

    @AfterThrowing(value = "pointcut()", throwing = "e")
    public void afterThrowing(Throwable e) {
        System.out.println(e.getMessage());
        System.out.println("抛出异常后置增强...");
    }

    @Around("pointcut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("环绕前增强");
        Object proceed = joinPoint.proceed();
        System.out.println("环绕后增强");
        return proceed;
    }
}

```
