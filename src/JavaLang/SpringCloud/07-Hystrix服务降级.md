---
title: 07-Hystrix服务降级
date: 2022-1-7 15:38:30
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Hystrix
- SpringCloud
---

## 概述

我们在分布式系统中难免会遇到如下问题

复杂的分布式体系结构中的应用由数十个依赖关系，每个依赖关系在某些时候不可避免的失败

![image-20220107154127516](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107154127516.png)

服务雪崩警告

emm说人话吧

> 假设我们在服务调用的时候，A调用B，B调用C，如果C垮了，那么全员GG
>
> ABCD的调用也被称为扇出效应，如果扇出的链路上某个微服务响应时间过长或者不可用，对微服务A的调用就会占用越来越多的资源，进而引起系统崩溃，这也是所谓的雪崩效应
>
> 也就是说，对于高流量的应用的话，单一的后端依赖可能会导致所有服务器上的资源都在几秒钟之内饱和。。。非常恐怖
>
> 所以就需要服务降级了

Hysterix就是来解决这个问题的，它是一个用于分布式系统的延迟和容错的开源库，在分布式系统里，很多依赖会不可避免的调用失败，比如超时、异常等，它能够保证在一个依赖出问题的情况下，不导致整体服务失败，避免级联故障，以提高分布式系统的弹性

![image-20220107154732421](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107154732421.png)

遗憾的是，它目前已经停更了（在2017年就无了）

wiki<https://github.com/Netflix/Hystrix/wiki>

停更：

![image-20220107155057161](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107155057161.png)

虽然说他这里面说了替代品resilience4j，但是国内嘛。。Java还是得阿里巴巴牛逼

## Hystrix的重要概念

只能说 面试会问

服务熔断是客户端无法给消费端提供服务，然后断开连接。

服务降级是高级的连接无法达成，那么就降级用自己这端的方法。

服务限流是防止高峰导致服务器直接宕机，限制指定时间段内的访问数量

### 服务降级

一般也会称为fallback

emm举一个简单的例子吧

```java
if(a){
    
}else if(b){
    
}else{
    // 对方系统不可用了，给一个兜底的解决方案
}
// 或者
switch(data){
    case a:
        break;
    case b:
        break;
    default:
        // do something
}
```

也就是：服务忙，稍后再试，不让客户等待并立刻返回一个友好提示，fallback

> 那些情况会出现降级？

- 程序运行异常
- 超时
- 服务熔断触发降级
- 线程池、信号量打满也会导致服务降级

### 服务熔断

一般也会称为break

> 就像是我们家中必备的保险丝一样，达到最大服务访问后，直接拒绝访问（避免自己挂了），拉闸限电，然后调用服务降级的方法返回友好提示
>
> 说穿了就是保险丝：服务的降级->进而熔断->恢复调用链路

### 服务限流

一般也会被称为flowlimit

> 秒杀等高并发操作，严禁一蜂窝的过来拥挤，大家排队，一秒钟N个，有序的运行

## 准备工作

### 新建一个8001的依赖

我们先只保留一个服务中心，这里我就懒得用Eureka了，改成用**Consul**（Eureka启动起来有点烦人，当然你也可以继续选择使用Eureka）

集群就懒得搭建了，也是只保留一个

接下来准备下module:`cloud-provider-consul-hystrix-payment-8001`

依赖我就懒得弄这么多了 保留几个最经典的，以及我们的新伙伴

```xml {3-7}
<dependencies>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        <version>2.2.10.RELEASE</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-consul-discovery</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### 配置文件、service、controller、main的准备

配置文件 这里就简单配置下

```yaml
#端口号
server:
  port: 8001
spring:
  application:
    name: consul-provider-payment
  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
#        hostname: 127.0.0.1

```

main 标准写法

```java {2}
@SpringBootApplication
@EnableDiscoveryClient
public class ProviderConsul8001Application {
    public static void main(String[] args) {
        SpringApplication.run(ProviderConsul8001Application.class, args);
    }
}
```

一个service，这里懒得写接口之类的了

```java
@Service
public class PaymentService {

    /**
     * 正常访问Ok的方法
     *
     * @param id
     * @return
     */
    public String PaymentInfo(Integer id) {
        return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo,id:" + id + "\tOk";
    }

    /**
     * 抛出异常的方法
     *
     * @param id
     */
    public String PaymentInfoError(Integer id) {
        throw new RuntimeException("*****模拟抛出异常*****");
        //return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo,id:" + id + "\tOk";
    }

    /**
     * 延时返回的方法
     */
    public String PaymentInfoTimeout(Integer id) {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo_TIMEOUT,id:" + id + "\tOk,耗时3秒";
    }

}
```

还有一个controller

```java
@RestController
@Slf4j
@RequestMapping("/payment/hystrix")
public class ProviderController {

    @Resource(type = PaymentService.class)
    PaymentService paymentService;

    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/ok/{id}")
    public String paymentOk(@PathVariable("id") Integer id) {
        String result = paymentService.PaymentInfo(id);
        log.info("******result:" + result);
        return result;
    }

    @GetMapping("/timeout/{id}")
    public String paymentTimeout(@PathVariable("id") Integer id) {
        String result = paymentService.PaymentInfoTimeout(id);
        log.info("******result:" + result);
        return result;
    }

    @GetMapping("/error/{id}")
    public String paymentError(@PathVariable("id") Integer id) {
        String result = paymentService.PaymentInfoError(id);
        log.info("******result:" + result);
        return result;
    }

}
```

反正正反都可以成功访问不是error的那个

### 高并发测试Jemeter

上述的玩意（两个正常的controller）在非高并发的情况下，足以满足需求，但如果是高并发的话..

这里可以用postman来测试

![image-20220107171925536](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107171925536.png)

或者使用Apache的jmeter<https://jmeter.apache.org/>

非常简单

![image-20220107172147001](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107172147001.png)

下载，解压后得到一个文件夹，进入到bin运行

```shell
java -jar .\ApacheJMeter.jar
```

![image-20220107172227468](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107172227468.png)

结果：

![image-20220107172242770](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107172242770.png)

使用的话：

![image-20220107172803879](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107172803879.png)

这一步如果你电脑很勇的话建议第三个或者第一个值设置为原来的10倍或者100倍

![image-20220107172847131](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107172847131.png)

然后

![image-20220107172902293](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107172902293.png)

接着

![image-20220107172930204](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107172930204.png)

接着 你点进运行即可

![image-20220107173625286](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107173625286.png)

右上角表示还没有结束的线程数量

这个时候你访问<http://localhost:8001/payment/hystrix/timeout/1>

能感觉到明显的不止3秒钟，如果说刚刚你第一个值设置的比较多的话 应该就是10来秒 甚至拒绝响应..

![image-20220107173834926](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107173834926.png)

第一个参数是线程数 第二个参数是每个运行的间隔时间，第三个参数是每个线程要轮循执行多少次

如果你第一个设置为2w，则模拟的是每秒2w个线程并发访问（还差150W就能达到12306的春运水平）

上面的服务还只是8001自己测试，如果此时消费者80也来访问，那么消费者只能干等，最终导致消费者80端不满意，服务端8001被拖死

### 80消费者加入

老一套 先创建项目，添加依赖，我这里懒得用maven了，直接用Spring创建

`cloud-consumer-feign-hystrix-order-80`

依赖

hystrix 在消费端和服务端都可，降级用在消费侧，熔断用在服务侧

```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        
        <!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-hystrix -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
            <version>2.2.10.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>

```

配置文件：

```yaml
#端口号
server:
  port: 80
spring:
  application:
    name: consul-consumer-order
  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
#        hostname: 127.0.0.1
feign:
  client:
    config:
      default:
        connectTimeout: 5000
        # 来个10秒
        readTimeout: 10000


```

然后main

```java
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class FeignHystrixConsumer80Application {

    public static void main(String[] args) {
        SpringApplication.run(FeignHystrixConsumer80Application.class, args);
    }
}
```

service

```java
@Service
@FeignClient("consul-provider-payment")
public interface PaymentService {

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentOk(@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/timeout/{id}")
    public String paymentTimeout(@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/error/{id}")
    public String paymentError(@PathVariable("id") Integer id);

}
```

controller

```java
@RestController
public class FeignHystrixController {

    @Resource(type = PaymentService.class)
    PaymentService paymentService;

    @GetMapping("/ok/{id}")
    public String ok(@PathVariable("id") Integer id) {
        return paymentService.paymentOk(id);
    }

    @GetMapping("/timeout/{id}")
    public String timeout(@PathVariable("id") Integer id) {
        return paymentService.paymentTimeout(id);
    }

    @GetMapping("/error/{id}")
    public String error(@PathVariable("id") Integer id) {
        return paymentService.paymentError(id);
    }


}

```

启动后访问正常

![image-20220107180805463](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107180805463.png)

### 二者一起测试

我们接下来用Jemeter和80端口测试

Jemeter开1w个线程

已知`readTimeout: 10000`

开1w个

![image-20220107182752216](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107182752216.png)

完美超时

![image-20220107182824410](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107182824410.png)

并且你会发现你访问ok也不成功

![image-20220107183113983](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107183113983.png)

### 解决问题

我们现在要解决的是

![image-20220107183459964](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107183459964.png)



## 服务降级

### 基本使用

所以我们要先从服务端找问题，需要设置自身调用超时时间的峰值，峰值内可以正常运行，超过了就调用一个兜底性的方法处理，做服务降级fallback

实际上非常简单

我们只需要在8001上添加如下代码

```java {28-30,40-42}
@Service
public class PaymentService {
    //....其他方法
    /**
     * 延时返回的方法
     * HystrixCommand 第一个fallbackMethod设置服务降级时要运行的方法，第二个commandProperties则是Hystrix在什么时候要进行服务降级
     */
    @HystrixCommand(fallbackMethod = "PaymentInfoTimeoutHandler", commandProperties = {
        // 这里是只要这个方法的运行时间超过三秒，就进行服务降级
        @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
    })
    public String PaymentInfoTimeout(Integer id) {
        try {
            // 这里是延迟5秒
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo_TIMEOUT,id:" + id + "\tOk,耗时3秒";
    }

    public String PaymentInfoTimeoutHandler(Integer id) {
        return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo_TIMEOUT_Handler,id:" + id + "\tOk,系统繁忙，请稍后再试";
    }

}

```

然后在主启动类内加上一个注解即可

```java {3-4}
@SpringBootApplication
@EnableDiscoveryClient
@EnableCircuitBreaker // 老版本只要加这个 新版本 只需要加下面那个即可
@EnableHystrix
public class ProviderConsul8001Application {
    public static void main(String[] args) {
        SpringApplication.run(ProviderConsul8001Application.class, args);
    }
}
```

接下来我们启动并访问

8001:
![image-20220107195743528](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107195743528.png)

80:

![image-20220107195755158](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107195755158.png)

并且可以看到我们的线程被打断了

![image-20220107195907040](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107195907040.png)

然后你是否还有注意到一点，返回值是：

这样的：`线程池:HystrixTimer-1	PaymentInfo_TIMEOUT_Handler,id:1	Ok,系统繁忙，请稍后再试`

说明了Hystrix有一个专门的线程池来处理这个

我们再来一个对异常的兜底

```java
@HystrixCommand(fallbackMethod = "paymentInfoErrorHandler", commandProperties = {
    @HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds", value="3000")
})
public String PaymentInfoError(Integer id) {
    throw new RuntimeException("*****模拟抛出异常*****");
    //return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo,id:" + id + "\tOk";
}

public String paymentInfoErrorHandler(Integer id) {
    return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo_TIMEOUT_Handler,id:" + id + "\tOk,系统错误，请稍后再试";
}
```

测试：

![image-20220107200618261](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107200618261.png)

依旧能够返回我们预先设置的值

并且我可以把那个超时的去掉

```java {1}
@HystrixCommand(fallbackMethod = "paymentInfoErrorHandler")
public String PaymentInfoError(Integer id) {
    throw new RuntimeException("*****模拟抛出异常*****");
    //return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo,id:" + id + "\tOk";
}

public String paymentInfoErrorHandler(Integer id) {
    return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo_TIMEOUT_Handler,id:" + id + "\tOk,系统错误，请稍后再试";
}
```

相当于HystrixCommand就是来做当出现异常的时候要执行的方法，我们可以用commandProperties来手动抛出异常

既然这样的话 finally是否有效呢？

我接着测试下

```java
@HystrixCommand(fallbackMethod = "PaymentInfoTimeoutHandler", commandProperties = {
    @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
})
public String PaymentInfoTimeout(Integer id) {
    try {
        System.out.println("开始延迟");
        Thread.sleep(5000);
    } catch (InterruptedException e) {
        System.out.println("被打断了");
        e.printStackTrace();
    } finally {
        System.out.println("关闭资源等操作");
    }
    return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo_TIMEOUT,id:" + id + "\tOk,耗时3秒";
}

public String PaymentInfoTimeoutHandler(Integer id) {
    System.out.println("进行兜底操作");
    return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo_TIMEOUT_Handler,id:" + id + "\tOk,系统繁忙，请稍后再试";
}
```

发现是可以进行处理的

![image-20220107203215813](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107203215813.png)

也就是说，我们之后，无论是消费者还是服务提供者，都可以通过这种方式来做服务降级

但我们一般都是放在**客户端**，因为客户端是头，早发现问题早断开连接

### 应用到80端

我们先把之前服务端的相应的东西都删掉（除了那个异常的）

![image-20220107212038356](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107212038356.png)



然后去80端进行修改

main：

```java
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableHystrix
public class FeignHystrixConsumer80Application {

    public static void main(String[] args) {
        SpringApplication.run(FeignHystrixConsumer80Application.class, args);
    }
}
```

接着修改controller

```java {12-13,26-27}
@RestController
public class FeignHystrixController {

    @Resource(type = PaymentService.class)
    PaymentService paymentService;

    @GetMapping("/ok/{id}")
    public String ok(@PathVariable("id") Integer id) {
        return paymentService.paymentOk(id);
    }

    @HystrixCommand(fallbackMethod = "errorCallBackHandler", commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000")
    })
    @GetMapping("/timeout/{id}")
    public String timeout(@PathVariable("id") Integer id) {
        return paymentService.paymentTimeout(id);
    }

    @GetMapping("/error/{id}")
    public String error(@PathVariable("id") Integer id) {
        return paymentService.paymentError(id);
    }


    public String errorCallBackHandler(@PathVariable("id") Integer id) {
        return "网络过慢，请稍后再试！！！";
    }
}

```

接着正常测试没问题

![image-20220107212717005](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107212717005.png)

接着开5k个线程并发（PS：别忘了重启微服务）

![image-20220107212747672](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107212747672.png)

结果：

![image-20220107212753289](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107212753289.png)

### 全局服务降级

![image-20220107213535425](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107213535425.png)

我们只需要把这个注解往80的controller上面一粘贴就行

如果说某个需要专有的 就单独的在@HystrixCommand写上内容即可即可 遵循就近原则

使用步骤：

1. 加一个全局的@DefaultProperties
2. 设置全局的方法
3. 给需要进行服务降级的controller加上@HystrixCommand
   1. 如果说降级服务有其他需求，则额外增加即可

```java {2-4,16,28-30}
@RestController
@DefaultProperties(defaultFallback = "defaultCallBackHandler", commandProperties = {
        @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "4000")
})
public class FeignHystrixController {

    @Resource(type = PaymentService.class)
    PaymentService paymentService;

    @GetMapping("/ok/{id}")
    public String ok(@PathVariable("id") Integer id) {
        return paymentService.paymentOk(id);
    }


    @HystrixCommand
    @GetMapping("/timeout/{id}")
    public String timeout(@PathVariable("id") Integer id) {
        return paymentService.paymentTimeout(id);
    }

    @GetMapping("/error/{id}")
    public String error(@PathVariable("id") Integer id) {
        return paymentService.paymentError(id);
    }


    public String defaultCallBackHandler() {
        return "你的网络有问题，不是服务器有问题";
    }

}

```

![image-20220107214515555](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107214515555.png)

然后开并发，并单独开一个请求

![image-20220107214506708](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107214506708.png)

### 使用更优雅的通配进行服务降级

我们直接在80的controller上面加太容易导致混乱了。。。而且耦合程度过高

正常来说 确实是应该给每一个方法配置对应的fallback，但是不应该再controller处

假设：客户端去调用服务端，碰上服务端全部宕机或者关闭了，难不成全部都这样做吗..

我们以后工作无非就是三个异常

- 运行
- 超时
- 宕机

前面两个我们之前都解决了，接下来解决宕机

还记得之前我们配置过的service吗

![image-20220107214836543](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107214836543.png)

是不是可以对这个接口的微服务进行统一的处理，而不是在controller内处理呢？

当然是可以的

先看看这个service

```java
@Service
@FeignClient("consul-provider-payment")
public interface PaymentService {

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentOk(@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/timeout/{id}")
    public String paymentTimeout(@PathVariable("id") Integer id);


    @GetMapping("/payment/hystrix/error/{id}")
    public String paymentError(@PathVariable("id") Integer id);

}
```

这个其实用到了**Feign**

我们现在配置中开启下（注意 这里是3.0之后的，3.0之前的网上教程一大堆）

```yaml {2-3}
feign:
  circuitbreaker:
    enabled: true
  client:
    config:
      default:
        connectTimeout: 5000
        readTimeout: 4000
```

做到这一步的时候一定要确保你的man方法内有一个玩意：

```java {3}
@SpringBootApplication
@EnableHystrix
@EnableFeignClients
public class FeignHystrixConsumer80Application {

    public static void main(String[] args) {
        SpringApplication.run(FeignHystrixConsumer80Application.class, args);
    }
}
```

我就是不知道咋删了然后忘记加 导致找了办个小时的bug

接着，我们有两个选择

> 写一个类，实现我们的service接口

```java
@Component
public class PaymentFallBackService implements PaymentService {
    @Override
    public String paymentOk(Integer id) {
        return "=====PaymentFallBackService===>paymentOk===>Error";
    }

    @Override
    public String paymentTimeout(Integer id) {
        return "=====PaymentFallBackService===>paymentTimeout===>Error";
    }

    @Override
    public String paymentError(Integer id) {
        return "=====PaymentFallBackService===>paymentError===>Error";
    }
}
```

> 或者写一个类，实现`FallbackFactory<T>`接口，个人更推荐这样
>
> 上面那样的话我们就相当于有两个PaymentService的Bean，就需要具名调用

```java
@Component
public class MyFallbackFactory implements FallbackFactory<PaymentService> {
    @Override
    public PaymentService create(Throwable cause) {
        return new PaymentFallBackService();
    }

    private static class PaymentFallBackService implements PaymentService {
        @Override
        public String paymentOk(Integer id) {
            return "=====PaymentFallBackService===>paymentOk===>Error";
        }

        @Override
        public String paymentTimeout(Integer id) {
            return "=====PaymentFallBackService===>paymentTimeout===>Error";
        }

        @Override
        public String paymentError(Integer id) {
            return "=====PaymentFallBackService===>paymentError===>Error";
        }
    }
}
```

接着，回到我们的service，加上一个fallbackFactory属性即可（如果你是直接 implements PaymentService，那这里就换成`fallback=PaymentFallBackService.class`即可）

```java {2}
@Service
@FeignClient(value = "consul-provider-payment",fallbackFactory = MyFallbackFactory.class)
public interface PaymentService {

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentOk(@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/timeout/{id}")
    public String paymentTimeout(@PathVariable("id") Integer id);


    @GetMapping("/payment/hystrix/error/{id}")
    public String paymentError(@PathVariable("id") Integer id);


}
```

写在controller类内部的处理，并加上默认或者指定降级处理。**如果存在一个继承service的降级处理，他处理的是客户端自身的异常**

**他们俩都能处理服务端异常，但是如果都存在，则service优先处理服务端出现的异常。**

**官方是通过实现`FallbackFactory<T>`接口通过匿名内部类实现兜底方案**

接下来测试：

当我们两个服务都完好无损时

![image-20220107232320047](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107232320047.png)

请求结果正常

![image-20220107232330963](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107232330963.png)

当我们的8001挂掉时

![image-20220107232344486](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107232344486.png)

返回了我们的fallback工厂内的东西

![image-20220107232359906](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107232359906.png)

## 服务熔断

### 基本概念（重要）

![image-20220107232855289](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107232855289.png)

1. 调用失败会触发降级，而降级会调用fallback方法
2. 但无论如何降级的流程一定会先调用正常方法再调用fallback方法
3. 假如单位时间内调用失败次数过多，也就是降级次数过多，则触发熔断
4. 熔断以后就会跳过正常方法直接调用fallback方法
5. 所谓“熔断后服务不可用”就是因为跳过了正常方法直接执行fallback

记住这六点，面试应该会问



### 使用

我们现在有一个简单的controller

```java
@GetMapping("/ok/{id}")
@HystrixCommand(fallbackMethod = "idErrorHandler")
public String ok(@PathVariable("id") Integer id) {
    if (id < 0) {
        throw new RuntimeException("id不能为负数");
    }
    return paymentService.paymentOk(id);
}

public String idErrorHandler(@PathVariable("id") Integer id) {
    return "id不能为负数";
}
```

这个时候我们传入一个异常的数值

![image-20220107234143634](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107234143634.png)

是正常的

接下来我们加上服务熔断

```java
@GetMapping("/ok/{id}")
@HystrixCommand(fallbackMethod = "idErrorHandler",commandProperties = {
    @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),// 是否开启断路器
    @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"), // 请求次数
    @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000"), // 时间窗口期
    @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "60") // 失败率达到多少后跳闸
})
public String ok(@PathVariable("id") Integer id) {
    if (id < 0) {
        throw new RuntimeException("id不能为负数");
    }
    return paymentService.paymentOk(id);
}

public String idErrorHandler(@PathVariable("id") Integer id) {
    return "id不能为负数";
}
```

我们额外增加的@HystrixProperty的意思是：在10秒内(10000毫秒)，十次访问，失败率达到60%，就跳闸限电

拉闸限电后这10秒内的其他所有请求都会直接跳转到我们的`idErrorHandler`方法，10秒后恢复，重头开始

官网上的说明

![image-20220107235303403](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107235303403.png)



可以看一下HystrixPropertiesManager这个类  里面包含了所有的 限制类型

以及 这玩意有默认配置的，如果我们加了@HystrixCommand注解但是没有其他任何内容（除了callback），那么默认调用的是这个HystrixCommandProperties类的玩意

可以看到这个类内有非常多的配置项，包括我们之前的超时时间

![image-20220107235803670](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220107235803670.png)

这个超时时间默认是1s

为了验证熔断是否成功，我们再次改动一下代码

```java {9,18}
@GetMapping("/ok/{id}")
@HystrixCommand(fallbackMethod = "idErrorHandler",commandProperties = {
    @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),// 是否开启断路器
    @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"), // 请求次数
    @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000"), // 时间窗口期
    @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "60") // 失败率达到多少后跳闸
})
public String ok(@PathVariable("id") Integer id) {
    System.out.println("正常的方法被调用了红红火火恍恍惚惚哈哈哈哈哈哈哈哈");
    if (id < 0) {
        throw new RuntimeException("id不能为负数");
    }
    return paymentService.paymentOk(id);
}

public String idErrorHandler(@PathVariable("id") Integer id) {
    System.out.println("熔断的方法被调用了");
    return "id不能为负数";
}
```

接下来开一百个线程试试

![image-20220108000043391](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220108000043391.png)

这一百个有问题的线程执行完毕之后我立刻执行一次没有问题的get请求

然后没有问题的请求也返回了奇怪的值

![image-20220108000944973](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220108000944973.png)

过了一会儿正确的值再次访问

![image-20220108001023508](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220108001023508.png)

![image-20220108001629301](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220108001629301.png)

## 服务限流

这个之后阿里巴巴再说，毕竟这个玩意已经过时了

## 服务监控仪表盘

![image-20220108002802786](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220108002802786.png)

### 搭建

我们创建一个module并cloud-cosumer-hystrix-dashboard-9001并添加如下依赖

主要就是第一个

```xml {4-8}
<dependencies>

    <!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-hystrix -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
        <version>2.2.10.RELEASE</version>
    </dependency>


    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-consul-discovery</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

然后配置文件依旧

```yaml
#端口号
server:
  port: 9001
spring:
  application:
    name: cloud-cosumer-hystrix-dashboard
  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
#        hostname: 127.0.0.1

```



接着main

```java {2}
@SpringBootApplication
@EnableHystrixDashboard
public class HystrixDashboard9001Application {
    public static void main(String[] args) {
        SpringApplication.run(HystrixDashboard9001Application.class, args);
    }
}
```

注意 所有要被监控的服务，都需要有

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

这个依赖，否则监控不了

接下来我们访问<http://localhost:9001/hystrix>

如果出现如下页面，表示启动成功

![image-20220108003635296](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220108003635296.png)

### 使用

我们要在被监控的服务端的主启动类上额外添加一个配置，比如8001

```java
@SpringBootApplication
@EnableDiscoveryClient
@EnableHystrix
public class ProviderConsul8001Application {
    public static void main(String[] args) {
        SpringApplication.run(ProviderConsul8001Application.class, args);
    }

    /**
     * 这个玩意是为了服务监控而配置
     * 和服务容错本身无关，SpringCLoud升级后的坑
     * ServletRegistrationBean因为springboot的默认路径不是/hystrix.stream
     * 所以要自己配置
     *
     * @return
     */
    @Bean
    public ServletRegistrationBean<HystrixMetricsStreamServlet> getServlet() {
        HystrixMetricsStreamServlet hystrixMetricsStreamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean<HystrixMetricsStreamServlet> hystrBean = new ServletRegistrationBean<>(hystrixMetricsStreamServlet);
        hystrBean.setLoadOnStartup(1);
        hystrBean.addUrlMappings("/hystrix.stream");
        hystrBean.setName("HystrixMetricsStreamServlet");
        return hystrBean;
    }

}
```

management: enabled: false endpoints:  web:  exposure:  include: hystrix.stream       base-path: /

出错的在9001配置文件加上hystrix:   dashboard:     proxy-stream-allow-list: "*"

接着访问即可，在<http://localhost:9001/hystrix>内输入<http://localhost:8001/hystrix.stream>

![image-20220108004425099](/images/Java/SpringCloud/07-Hystrix服务降级/image-20220108004425099.png)

…这玩意貌似坑还不少 算了 没必要用。。真用上了去看看[视频](https://www.bilibili.com/video/BV18E411x7eT?p=64&spm_id_from=pageDriver)

