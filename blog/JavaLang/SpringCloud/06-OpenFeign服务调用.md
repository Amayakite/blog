---
title: 06-OpenFeign服务调用
date: 2022-1-7 0:19:13
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud OpenFeign
- SpringCloud
---

## 概述

> 是啥？

![image-20220107002216095](/images/SpringCloud/06-OpenFeign服务调用/image-20220107002216095.png)

是一个声明式的Web客户端服务端，让web服务客户端变得非常容易，我们只需要创建一个接口并在接口上添加注解即可

![image-20220107002433314](/images/SpringCloud/06-OpenFeign服务调用/image-20220107002433314.png)



## 快速使用

### 依赖

非常简单，我们只需要添加一个依赖，为了防止冲突 我这里重新建立了一个包

依赖：

```xml {2-5}
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
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
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>com.amayakite</groupId>
        <artifactId>cloud-api-commons</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>org.jetbrains</groupId>
        <artifactId>annotations</artifactId>
        <version>RELEASE</version>
        <scope>compile</scope>
    </dependency>

</dependencies>
```

### 主程序和配置文件

我这里依旧使用的是Eureka，使用其他的main程序配置同理

```java {3}
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class OrderFeign80Application {

    public static void main(String[] args) {
        SpringApplication.run(OrderFeign80Application.class, args);
    }

}

```

这里的`@EnableFeignClients`表示开启feign服务

配置文件，连接Eureka

```yaml
server:
  port: 80

# 配置Eureka
eureka:
  client:
    #表示是否将自己注册进EurekaServer 默认true
    register-with-eureka: true
    # 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载
    fetch-registry: true
    # EurekaServer的地址，默认为localhost:8761
    service-url:
      defaultZone: http://localhost:7001/eureka,http://localhost:7002/eureka
spring:
  application:
    name: cloud-consumer-order-80
```

### services

我们只需要简单配置下service**接口**就能使用了，就像是mybatis那样

这个feign就相当于封装了restTemplate

```java {2,5-6}
@Service
@FeignClient("CLOUD-PROVIDER-PAYMENT")
public interface PaymentFeignService {
    
    @GetMapping("/payment/test")
    public String test();
}

```

这里的`@FeignClient`表示使用哪个服务，然后下面的`@getmapping`就相当于是访问指定服务的指定接口

这里的`/payment/test`我在8001和8002上对应的方法为：

```java
//8001
@GetMapping("/payment/test")
public String test() {
    return "8001 test";
}
// 8002
@GetMapping("/payment/test")
public String test() {
    return "8002 test";
}
```



### Controller

```java {4-5,9}
@RestController
public class OrderController {

    @Autowired
    PaymentFeignService paymentFeignService;

    @GetMapping("/test")
    public String test() {
        return paymentFeignService.test();
    }

}

```

我们使用的话也非常简单，只需要注入这个接口就行，然后调用刚刚我们定义的方法

### 启动并测试

启动后照常访问即可，结果就像是我们手动调用restTemplate那样

使用它的好处是：我们不用手动写RestTemplate了

![image-20220107140006892](/images/SpringCloud/06-OpenFeign服务调用/image-20220107140006892.png)



## OpenFeign的超时控制

比方说我现在的8001服务处理需要时间，例如三秒钟

```java
public String test() throws InterruptedException {
    Thread.sleep(3000);
    return "8001 test";
}
```

接着我们启动并测试，确实三秒多返回了结果（PS：552ms是因为第一次请求，所以要较长时间，之后就是20ms左右）

![image-20220107140639004](/images/SpringCloud/06-OpenFeign服务调用/image-20220107140639004.png)

如果是旧版本 默认是1s 也就是1s之后没有结果 抛出异常，新版本则是60s

旧版本修改默认超时时间为5s

```yaml
#设置feign客户端超时时间(OpenFeign默认支持ribbon)
ribbon:
#指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间
  ReadTimeout: 5000
#指的是建立连接后从服务器读取到可用资源所用的时间
  ConnectTimeout: 5000

```

新版本修改默认超时时间为5s

官方文档<https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/#timeout-handling>

这官方文档就tm的绕

```yaml
feign:
  client:
    config:
      default:
      # 这里使用驼峰也可以 都能那啥
        connect-timeout: 5000
        read-timeout: 5000
# 如果要指定某个服务的超时，例如CLOUD-PROVIDER-PAYMENT：
 feign:
  client:
    config:
    # 这里的服务名一定要是注册的服务名，如果不是Eureka，则要注意下大小写
      CLOUD-PROVIDER-PAYMENT:
        connectTimeout: 5000
        readTimeout: 61000
```

## OpenFeign的日志打印

![image-20220107151236540](/images/SpringCloud/06-OpenFeign服务调用/image-20220107151236540.png)

有四个级别

旧版本（使用ribbon的版本）需要手动注册下bean

```java
@Configuration
public class FeignConfig{
    
    @Bean
    Logger.Level feginLoggerLevel(){
        return Logger.Lever.FULL;
    }
    
}
```

接着在yaml中配置下debug级别即可

```yaml
logging.level.com.Project.cloud: debug
```

如果说是最新版本：直接在yaml中配置如下的即可

注意 配置的loggerLevel打印只在`logging.level.你项目的包`为debug模式的时候生效

```yaml
feign:
  client:
    config:
#      指定哪一个服务
      CLOUD-PROVIDER-PAYMENT:
        connectTimeout: 5000
        readTimeout: 5000
        loggerLevel: full
logging.level.com.Project.cloud: debug
```

结果：

![image-20220107153359361](/images/SpringCloud/06-OpenFeign服务调用/image-20220107153359361.png)

非常的详细

![image-20220107153506807](/images/SpringCloud/06-OpenFeign服务调用/image-20220107153506807.png)



