---
title: 04-Consul服务注册与发现
date: 2022-1-6 16:01:03
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Consul
- SpringCloud
---

## 简介

这玩意可以跳过，Consul公司貌似之前发过公告，国内使用必须要官方授权还是啥的，具体的可以百度 简单了解下即可

不过，美国人都在用它（百分之七十以上的企业）

官网<https://www.consul.io/>不错，是拿go语言写的

Zookeeper用的比较少（可能银行之类的用的多）

提供了微服务系统中的服务治理、配置中心、控制总线等功能，这些功能中的每个都可以根据需求单独使用，也可以一起构建全方位的服务，总之是一种完整的服务网格解决方案

优点很多：基于raft协议，比较简洁，支持健康检查，支持HTTP和DNS协议 支持跨数据中心的WAN集群，提供图形界面，跨平台，支持LInux、Mac、Windows

PS：主要是有一个可视化的WEB界面

使用方法也很简单（有中文文档hhhh）链接：<https://www.springcloud.cc/spring-cloud-consul.html>

### 安装

<https://www.consul.io/downloads>

直接下个包 然后安装即可 linux跟着上面文档走 ，docker看[这里](https://hub.docker.com/_/consul)

得益于golang，下载解压后就是一个可执行文件

![image-20220106163759287](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106163759287.png)

启动的话

```powershell
.\consul.exe agent -dev
```

其他系统同理`./consul.exe agent -dev`

然后你就可以访问<http://localhost:8500>进入到控制面板

![image-20220106164236868](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106164236868.png)

## 通过SpringCloud使用

### 服务提供方8004的依赖准备

我们新建一个module，名字为`cloud-provider-payment8004`

主要是第一个，其他的都是标配

```xml
<dependencies>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-consul-discovery</artifactId>
    </dependency>

    <!--        SpringCLoud之类的标配品-->
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
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>

</dependencies>
```

### 配置文件和主启动类和Controller

```yaml
#端口号
server:
  port: 8004
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

主启动类

都是老一套了

 ```java
 @SpringBootApplication
 @EnableDiscoveryClient
 public class Payment8004Application {
     public static void main(String[] args) {
         SpringApplication.run(Payment8004Application.class, args);
     }
 }
 ```

然后接着是controller

```java
@RestController
@Slf4j
@RequestMapping("/payment")
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/consul")
    public String paymentConsul() {
        return "springcloud with consul: " + serverPort + "\t" + UUID.randomUUID().toString();
    }
}
```

### 启动并测试

首先启动

![image-20220106165713089](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106165713089.png)

然后访问网页 可以看到多了一个服务

![image-20220106165727754](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106165727754.png)

点进去还有详细信息

![image-20220106165754657](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106165754657.png)

我们运行http请求也是正常的成功了

![image-20220106165856781](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106165856781.png)

### 客户端80的依赖准备

新建一个Maven项目，依赖和之前一样cloud-consumer-consul-order-80

```xml
<dependencies>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-consul-discovery</artifactId>
    </dependency>

    <!--        SpringCLoud之类的标配品-->
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
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>

</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <fork>true</fork>
                <addResources>true</addResources>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### 配置文件和main以及restTemplate和Controller

```yaml
#端口号
server:
  port: 80
spring:
  application:
    name: cloud-consumer-consul-order

  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
#        hostname: 127.0.0.1
```

main：

```java {2}
@SpringBootApplication
@EnableDiscoveryClient
public class CloudConsumer80Application {

    public static void main(String[] args) {
        SpringApplication.run(CloudConsumer80Application.class, args);
    }
}

```

resttemplate

```java {5}
@Configuration
public class ConsumerApplicationConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }

}
```

controller

```java
@RestController
public class ConsumerController {

    private final String ConsulProviderPayment = "http://consul-provider-payment";

    @Resource
    RestTemplate restTemplate;
    @GetMapping("/consumer/payment/consul")
    public String paymentInfo() {
        return restTemplate.getForObject(ConsulProviderPayment + "/payment/consul", String.class);
    }
}

```

### 测试

两个都运行之后

![image-20220106171431110](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106171431110.png)

网页

![image-20220106171444287](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106171444287.png)



get 80

![image-20220106171457396](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106171457396.png)

### 如果用docker之类的配置出现问题

在yaml加一句即可

```yaml
spring
	cloud
		consul
			discovery
				heartbeat
					enabled: true
```

### 多个相同服务之间的别名区分

每个服务加上 instance-id即可 可以为中文

```yaml {14}
#端口号
server:
  port: 8002
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
        instance-id: 服务提供方2
#        hostname: 127.0.0.1

```



## 三个注册中心的相同点（CAP）

可以发现 这三个注册中心都是大同小异的

| 组件名    | 语言 | CAP | 服务健康检查 | 对外暴露接口        | Spring Cloud集成 |
| --------- | ---- | --- | ------------ | ------------------- | ---------------- |
| Eureka    | Java | AP  | 可配支持     | HTTP，有web界面     | 已集成           |
| Consul    | Go   | CP  | 支持         | HTTP/DNS，有web界面 | 已集成           |
| Zookeeper | Java | CP  | 支持         | 客户端              | 已集成           |

![image-20220106172705021](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106172705021.png)

CAP是啥？

- C：Consistency（强一致性）
- A：Availability（可用性）
- P：Partition Tolerance（分区容错性）

CAP理论关注粒度是数据，而不是整体系统设计的容错

分布式架构内，P永远要保证，所以一般来说都是CP或者AP

我们的Redis设就是CP

我们的mysql就是CA

- CA：单点集群，满足一致性，可用性的系统，通常在扩展上不太强大
- CP：满足一致性，分区容忍性的系统，通常性能不是特别高
- AP：满足可用性，分区容忍性的系统，通常可能会对一致性要求稍微低一些

CAP 这玩意**最多能同时较好的满足两个**，理论的核心是：一个分布式系统不可能满足很好的一致性，可用性和容错性这三个需求，因此，根据CAP原理将NOSQL数据库分成了满足CA原则、满足CP原则和满足AP原则三大类

结论：**重要数据cp，次要数据ap**

![image-20220106173752497](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106173752497.png)

![image-20220106173655145](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106173655145.png)

![image-20220106173856537](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106173856537.png)

![image-20220106173815094](/images/Java/SpringCloud/04-Consul服务注册与发现/image-20220106173815094.png)

