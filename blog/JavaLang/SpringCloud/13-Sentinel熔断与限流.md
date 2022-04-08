---
title: 13-Sentinel熔断与限流
date: 2022-1-11 19:23:22
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Alibaba
- Sentinel
- SpringCloud
---

## 概述

官网<https://github.com/alibaba/Sentinel>

中文文档<https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D>

介绍是：分布式系统的流量防卫兵

一句话概括：Hystrix的阿里版

![image-20220111192750054](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111192750054.png)

官方是这样介绍的

>Sentinel 具有以下特征:
>
>- **丰富的应用场景**：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
>- **完备的实时监控**：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
>- **广泛的开源生态**：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Apache Dubbo、gRPC、Quarkus 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。同时 Sentinel 提供 Java/Go/C++ 等多语言的原生实现。
>- **完善的 SPI 扩展机制**：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。
>
>当看到双十一的时候，就应该知道这玩意不是一般的牛逼

## 基本使用

### 下载安装和运行

下载<https://github.com/alibaba/Sentinel/releases/>

加速下载

```shell
wget https://github.91chi.fun//https://github.com//alibaba/Sentinel/releases/download/你想要的版本/sentinel-dashboard-你想要的版本.jar
```

下载完毕后得到一个jar包

Sentinel分为两个部分

- 核心库（Java客户端，就是我们刚刚下载到的那个）不依赖任何框架/库，能够运行于所有Java运行时环境，都是对Dubbo、Spring Cloud等框架也有较好的支持
- 控制台（Dashboard）基于Spring Boot开发，打包后可以直接运行，不需要额外的tomcat等应用容器

我们先运行jar吧

```powershell
java -jar .\sentinel-dashboard-1.8.3.jar
```

如果启动成功的话，应该显示如下页面

![image-20220111194433238](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111194433238.png)

这个时候访问<http://localhost:8080/>即可得到如下页面

![image-20220111194509918](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111194509918.png)

默认的用户和密码都是sentinel

如果要更该对应的参数的话 可以在启动的时候添加VM命令`-Dxxx=xxx`来实现

具体可以配置的参数看官方文档<https://github.com/alibaba/Sentinel/wiki/%E6%8E%A7%E5%88%B6%E5%8F%B0#%E6%8E%A7%E5%88%B6%E5%8F%B0%E9%85%8D%E7%BD%AE%E9%A1%B9>

不过因为这个是jar包的原因….所以要参考[这篇文章](https://www.cnblogs.com/coder-wzr/p/9987906.html)进入jar包后改一点内容才行

但是万能的spring boot早就给我们想到了这一点了，查了下，有一篇[文章](https://www.jianshu.com/p/fed7a174bfb8)说了解决方案

```powershell
java -jar .\sentinel-dashboard-1.8.3.jar --server.port=8181
# 这样就可以修改端口了，修改其他的同理
```

登陆后，可以得到这个

![image-20220111194649812](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111194649812.png)



### 使用-依赖

官方文档

<https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/en-us/index.html#_spring_cloud_alibaba_sentinel>

我们新建一个module：cloud-alibaba-sentinel-service-8401

然后准备如下依赖 阿里的这三以后基本上是常客了

```xml
<dependencies>

    <!--        这个后续持久化的时候要用到-->
    <dependency>
        <groupId>com.alibaba.csp</groupId>
        <artifactId>sentinel-datasource-nacos</artifactId>
    </dependency>

    <!--        Sentinel-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    </dependency>

    <!--        Nacos-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>

    <!--        openfeign-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>

    <!--        基本组件-->
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

### 使用-配置

```yaml
server:
  port: 8401
spring:
  application:
    name: cloud-alibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: myserver:8435
        username: nacos
        password: 123456789
    # 配置Sentinel
    sentinel:
      transport:
        # 配置Sentinel dashboard的地址
        dashboard: localhost:8181
        # 配置Sentinel端口，默认是8719，如果被占用，会从8719开始依次+1扫描，直至找到空闲的端口
        # 8719是http通信服务【sentinel后台监控服务】
        # 它监控8401【微服务】的同时，还与8080【sentinel前台展示服务】交互数据，将监控到的数据在dashboard上展现。
        # spring.cloud.sentinel.transport.port：指定应用与Sentinel控制台交互的端口，应用本地会起一个该端口占用的HttpServer
        port: 8719
# 暴露监控
management:
  endpoints:
    jmx:
      exposure:
        include: "*"

```

然后准备下controller和main

```java
@RestController
public class FlowLimitController {

    @GetMapping("/testA")
    public String testA(){
        return "testA";
    }
    @GetMapping("/testB")
    public String testB(){
        return "testB";
    }
}
```

main

```java
@SpringBootApplication
@EnableDiscoveryClient
public class Sentinel8401Application {
    public static void main(String[] args) {
        SpringApplication.run(Sentinel8401Application.class, args);
    }
}
```

### 测试

我们启动服务后

![image-20220111202253926](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202253926.png)

没有报错就算成功，然后我们访问下sentinel的控制面板

![image-20220111202312199](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202312199.png)

发现什么也没有

其实这玩意用了懒加载机制，我们只需要访问下我们服务内的接口，这里就有显示了

![image-20220111202344360](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202344360.png)

![image-20220111202400354](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202400354.png)

我们多访问几次A和B，就能看到有内容了

![image-20220111202556671](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202556671.png)

这就是它的实时监控

## 流控规则

### 基本介绍

就是这张图

![image-20220111202908226](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111203003636.png)



上面的名词：

- 资源名：唯一名称，默认是请求路径
- 针对来源：Sentinel可以对调用者进行限流，填写微服务名，默认default（不区分来源）
- 阀值类型/单机阀值
  - QPS：每秒钟的请求数量，当调用该API的QPS达到阀值的时候，进行限流
  - 线程数：当调用该API的线程数打到阀值的时候，进行限流
- 是否集群：就是这个接口是不是一个集群的接口
- 流控模式
  - 直接：API打到限流条件时，直接限流
  - 关联：当关联的资源达到阀值的时候，就限流自己
  - 链路：只记录指定链路上的流量（指定资源从入口资源进来的流量，如果打到阀值，就进行限流，API级别的针对来源）
- 流控效果
  - 快速失败：直接失败，抛异常
  - Warm UP：根据CodeFactor（冷加载因子，默认3）的值，从阀值/CodeFactor，经过预热时长，才达到设置的QPS阀值
  - 排队等待：匀速排队，让请求以匀速的速度通过，阀值类型必须设为QPS，否则无效

### 流控模式-QPS直接失败

![image-20220111203918916](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111203918916.png)

我们先来新建一个规则， 单机阀值设定为QPS-1，也就是每秒限制一个访问，其余的默认

然后快速访问

第一次

![image-20220111204039334](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111204039334.png)

第二次，抛出了这个东西：Blocked by Sentinel (flow limiting) 被Sentinel阻塞(流量限制)

![image-20220111204050691](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111204050691.png)

恩，看起来没问题了，轻轻松松的就做到了限流

但是这个过程中也存在问题

> 直接调用的是默认报错信息，技术方面OK，但是，是否可以像Hystrix那样应该有我们自己的后续处理？是不是应该有个fallback的兜底方法
>
> 这个之后会说到

### 流控模式-线程数直接失败

当调用该API的线程数打到阀值的时候，进行限流

这个跟QPS不是同一个东西，QPS是每秒的访问量，线程数是并行的访问量

线程数是只每秒访问api接口的线程数   妹的  怪不得没效果

而且我们可以发现，这玩意并没有直接失败之类的东西

![image-20220111204942886](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111204942886.png)

简单来说，线程数和QPS可以用一张图概括

QPS就是限制最多进来多少人，一旦每秒超过这个阀值，剩余的人就进不来

线程数就是，无论你多少人我都可以进来，但是我每秒只有一个线程在处理业务，也就是银行始终只有一个前台业务员，如果说这个线程正在处于忙碌状态并且有其他人进来了的情况，将会直接拒绝掉其他人的请求

> 就是说同时只允许一个工作线程(配置=1)，如果当前线程还没有执行完，其他线程请求就会限流

![image-20220111205109440](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111205109440.png)



你直接访问是察觉不出效果的，因为线程的处理速度飞快

所以我们可以手动加一个延迟

```java {6}
@RestController
public class FlowLimitController {

    @GetMapping("/testA")
    public String testA() throws InterruptedException {
        Thread.sleep(800);
        return "testA";
    }

    @GetMapping("/testB")
    public String testB() {
        return "testB";
    }
}
```

就能得到我们想要的效果

![image-20220111205548424](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111205548424.png)



### 流控模式-关联

关联：当关联的资源达到阀值的时候，就限流自己

比如果与A关联的资源B达到阀值后，就限流A自己

B惹事，A挂了

应用场景：支持接口达到阀值之后，限流下订单的接口，防止连坐效应，好比医生都生病不搞了，前台还使劲卖他的号，有用吗？

![image-20220111210133863](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111210133863.png)



B每秒超过一个访问，A将不能正常访问，但是B依旧可以正常访问

如果说要让B也不能访问，只需要给他自己加个直连限制即可

### 流控模式-链路

这个目前有问题，用不了（草，都一年了还没修好）

如果有兴趣的话可以了解看这个<https://blog.csdn.net/qq_31155349/article/details/108478190>

以及这个<https://blog.csdn.net/qq_42130098/article/details/111906577>

反正就是如果链路上有a和b，a凉了，那么b也跟着凉

链路还涉及了之后的注解还有版本问题，绝对是最麻烦最难的…

找到解决方案了，参考[这篇文章](https://blog.csdn.net/weixin_44353507/article/details/113815458?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164190905016780271537604%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=164190905016780271537604&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-4-113815458.nonecase&utm_term=Alibaba&spm=1018.2226.3001.4450)

有点绕，一定要按照这一套来，不然行不通

首先添加一个依赖

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-web-servlet</artifactId>
</dependency>
```

然后要在application.yaml中修改一个配置

```yaml {17-18}
server:
  port: 8401
spring:
  application:
    name: cloud-alibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: myserver:8435
        username: nacos
        password: nacos
    # 配置Sentinel
    sentinel:
      transport:
        dashboard: localhost:8181
        port: 8719
      # 注意 和transport平级
      web-context-unify: false
# 暴露监控
management:
  endpoints:
    jmx:
      exposure:
        include: "*"

```

然后要加一个config类

```java
@Configuration
public class FilterContextConfig {
    @Bean
    public FilterRegistrationBean sentinelFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new CommonFilter());
        registration.addUrlPatterns("/*");
        // 入口资源关闭聚合
        registration.addInitParameter(CommonFilter.WEB_CONTEXT_UNIFY, "false");
        registration.setName("sentinelFilter");
        registration.setOrder(1);
        return registration;
    }
}
```

接着写一个service，注意**一定要用**service之类的注解写一个类才行

```java
@Service
public class SentinelService {

    /**
     * @SentinelResource: 可以理解就是一个资源名
     */
    @SentinelResource("myresource")
    public String sentinelChain() {
        return "调用该资源成功！！！！！";
    }

}
```

然后写Controller方法调用

```java
@RestController
public class FlowLimitController {

    @Autowired
    SentinelService sentinelService;

    @GetMapping("/testC")
    public String testC() {
        return sentinelService.sentinelChain();
    }

    @GetMapping("/testD")
    public String testD() {
        return sentinelService.sentinelChain();
    }


}
```

如果说没问题的话，你在启动后分别访问完testc和d后是这样的

![image-20220111220251931](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111220251931.png)



接着，给这个myresource添加限流

这里给TestC中的它添加

![image-20220111220353476](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111220353476.png)

添加完毕后，当你每秒访问过多次的testC之后，就会出现这样的情况

![image-20220111220422331](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111220422331.png)

但是无论这里有没有出现问题，myresource的另外一个调用者：testD是不受影响的

也可以从数据中得到，我这里是两个同时访问了五十多次之后的结果（Chrome可以按住alt选中两个页面同时刷新）

![image-20220111220724345](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111220724345.png)



### 流控-预热(Warm Up削峰填谷)

公式：阀值除于clodFactor(默认值是3)，经过预热时长后才会达到阀值

就相当于防止服务瞬间被DDOS给整挂掉了

![image-20220111221130006](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111221130006.png)

![image-20220111221139041](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111221139041.png)

![image-20220111221949556](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111221949556.png)

10/3等于每秒访问量，5秒之后恢复10访问量

冷加载因子是写进了源码里的

![image-20220111222048858](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111222048858.png)

应用场景：秒杀系统开启瞬间，会有很多流量上来，有可能把系统整挂了，预热方式就是保护系统，让流量慢慢的进来，慢慢的增长到设定的阀值，防止一开始缓存还没成型，被击穿

已知被使用过的实际场景：淘宝双十一

### 流控-排队等待

一句话，都排队等，没轮到的慢慢排，愿意等就等，不愿意等就自己超时重试

![image-20220111222704429](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111222704429.png)



![image-20220111222837017](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111222837017.png)

- QPS=1，每个一秒处理一个请求
- 2,500毫秒
- 3,334毫秒
- 4,250毫秒
- 以此类推
- 如果超过20还没轮到，则就按照限流处理

## 降级（熔断）规则

![image-20220111223347592](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111223347592.png)

这玩意和Hystrix的相似度非常高

他有三个参数

- 慢调用比例(秒级)
  - 慢调用比例 (`SLOW_REQUEST_RATIO`)：选择以慢调用比例作为阈值，需要设置允许的慢调用 RT（即最大的响应时间），请求的响应时间大于该值则统计为慢调用。当单位统计时长（`statIntervalMs`）内请求数目大于设置的最小请求数目，并且慢调用的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求响应时间小于设置的慢调用 RT 则结束熔断，若大于设置的慢调用 RT 则会再次被熔断。异常比率的阈值范围是 `[0.0, 1.0]`，代表 0% - 100%。
  - 平均响应时间**超出阀值**且在**时间窗口内通过的请求>=5**，两个条件同时满足后触发降级，窗口期(统计时长)过后关闭断路器
  - 最大阀值是4900，需要更大的话需要在启动sentinel的时候附带参数`csp.sentinel.statistic.max.rt=xxx`才能生效
    - 1.8之前需要这样配置
    - 1.8之后官方修复了，最新版本随便造
- 异常比例
  - 单位统计时长（`statIntervalMs`）内请求数目大于设置的最小请求数目，并且异常的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。异常比率的阈值范围是 `[0.0, 1.0]`，代表 0% - 100%。
  - QPS>=5且异常比例超过阀值时，触发降级，时间窗口结束后，关闭降级
- 异常数
  - 当单位统计时长内的异常数目超过阈值之后会自动进行熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。
  - 超过指定的阀值，就会触发降级，时间窗口结束后，关闭降级

![image-20220111224619923](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111224619923.png)

Sentinel 1.8.0 版本对熔断降级特性进行了全新的改进升级 有恢复状态（HALF-OPEN 状态），而不单单只是之前的关和开，中间多出了一个半开

### 慢调用比例(RT)

![image-20220111231448891](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111231448891.png)

例子：

![image-20220111231958689](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111231958689.png)

### 异常比例

总体来说和慢调用比例差不多，唯一的区别就是，满调用比例是我们手动抛，这里是程序抛

![image-20220111232846091](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111232846091.png)

### 异常数

![image-20220111233414286](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111233414286.png)

和异常比例差不多，不过将比例换成了次数而已

经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态）

若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。

## 热点规则

![image-20220111234745115](/images/SpringCloud/13-Sentinel熔断与限流/image-20220111234745115.png)

就是这个玩意

[官方文档](https://github.com/alibaba/Sentinel/wiki/%E7%83%AD%E7%82%B9%E5%8F%82%E6%95%B0%E9%99%90%E6%B5%81)内是这样说的

> 何为热点？热点即经常访问的数据。很多时候我们希望统计某个热点数据中访问频次最高的 Top K 数据，并对其访问进行限制。比如：
>
> - 商品 ID 为参数，统计一段时间内最常购买的商品 ID 并进行限制
> - 用户 ID 为参数，针对一段时间内频繁访问的用户 ID 进行限制
>
> 热点参数限流会统计传入参数中的热点参数，并根据配置的限流阈值与模式，对包含热点参数的资源调用进行限流。热点参数限流可以看做是一种特殊的流量控制，仅对包含热点参数的资源调用生效。

源码在`com.alibaba.csp.sentinel.slots.block.BlockException`

### 自定义兜底方法

在开始热点之前，我们得了解下新的东西

> 兜底方法

这玩意分为系统默认和用户自定义，两种

我们之前的测试，限流出问题后，都使用sentinel系统的默认提示：`Blocked By Sentinel(Flow limiting)`

我们能否自定义？类似于Hystrix，某个方法出现问题了，找对应的兜底降级方法

阿里当让也为我们提供了一个注解`@SentinelResource`，等同于之前Hystrix内的`@HystrixCommand`

接下来简单演示下吧

```java
@RestController
public class FlowLimitController {


    @GetMapping("/testA")
    // value是用来标识资源名称 这个启动后访问下可以得到
    @SentinelResource(value = "testAResource", blockHandler = "testACallBack")
    public String testA() {
        Thread.sleep(1000);
        return "testA";
    }

	// 和Hystrix一样的流程 唯一不同的是 这里要额外接收一个BlockException参数
    // 然后就可以对齐进行自定义处理 如果说上面的那个方法要接收参数 这里也要
    // 例如 上面的接收String a,那么这里就要接受 String a 和 BlockException ex
    public String testACallBack(BlockException exception) {
        return "-----testA出现异常了";
    }
}
```

然后正常限流之类的就可以看得到效果了

### 热点规则-设置

我们首先定义下Controller，并为其打上@SentinelResource标签和指定对应的错误回调方法

```java
@RestController
public class FlowLimitController {

    @GetMapping("/testHotKey")
    @SentinelResource(value = "testHotKey", blockHandler = "dealTestHotKey")
    public String testHotKey(@RequestParam(value = "p1", required = false) String p1,
                             @RequestParam(value = "p2", required = false) String p2) {
        return "-----testHotKey";
    }

    public String dealTestHotKey(String p1, String p2, BlockException exception) {
        return "-----deal_testHotKey";
    }
}
```

这里接收两个参数 都是可选的，接下来开始对齐进行热点规则设置

![image-20220112133141502](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112133141502.png)

接着访问

![image-20220112133224572](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112133224572.png)

一秒内第一次正常

![image-20220112133238261](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112133238261.png)

第二次异常

反正只要带了这个参数的都会受到限制

当然我们也可以字自定义的排除一些

注意 下面这样操作的话 参数类型一定要写和我们在Java的方法声明中一样的类型，否则不生效

![image-20220112133751268](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112133751268.png)

但要注意的是，如果我们是在程序中出现了异常

```java {5}
@GetMapping("/testHotKey")
@SentinelResource(value = "testHotKey", blockHandler = "dealTestHotKey")
public String testHotKey(@RequestParam(value = "p1", required = false) String p1,
                         @RequestParam(value = "p2", required = false) String p2) {
    int a = 10/0;
    return "-----testHotKey";
}
```

是无法进行处理的（另外几个也是无法处理，这个处理方式之后会说）

![image-20220112141258458](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112141258458.png)

![image-20220112141250165](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112141250165.png)

## 系统规则-自适应限流

[官方文档](https://github.com/alibaba/Sentinel/wiki/%E7%B3%BB%E7%BB%9F%E8%87%AA%E9%80%82%E5%BA%94%E9%99%90%E6%B5%81)

> Sentinel 系统自适应限流从整体维度**对应用入口流量进行控制**，结合应用的 Load、CPU 使用率、总体平均 RT、入口 QPS 和并发线程数等几个维度的监控指标，通过自适应的流控策略，让系统的入口流量和系统的负载达到一个平衡，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。

在这里配置

![image-20220112141943800](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112141943800.png)

- **Load 自适应**（仅对 Linux/Unix-like 机器生效）：系统的 load1 作为启发指标，进行自适应系统保护。当系统 load1 超过设定的启发值，且系统当前的并发线程数超过估算的系统容量时才会触发系统保护（BBR 阶段）。系统容量由系统的 `maxQps * minRt` 估算得出。设定参考值一般是 `CPU cores * 2.5`。
- **CPU usage**（1.5.0+ 版本）：当系统 CPU 使用率超过阈值即触发系统保护（取值范围 0.0-1.0），比较灵敏。
- **平均 RT**：当单台机器上所有入口流量的平均 RT 达到阈值即触发系统保护，单位是毫秒。
  - 也就是平均处理时间
- **并发线程数**：当单台机器上所有入口流量的并发线程数达到阈值即触发系统保护。
- **入口 QPS**：当单台机器上所有入口流量的 QPS 达到阈值即触发系统保护。

> 这玩意是全局的，如果设置了的话是高于我们自己额外设定的
>
> 但是整体来说用的特别少，基本用不上

## @SentinelResource

### 按资源名称进行限流

代码

```java {6}
@RestController
public class RateLimitController {


    @GetMapping("/byResource")
    @SentinelResource(value = "byResource",blockHandler = "handlerException")
    public String byResource() {
        return "按照资源名称限流";
    }

    public String handlerException(BlockException exception) {
        return "资源名称被限流,暂时无法访问";
    }

}

```

设定规则

![image-20220112143231499](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112143231499.png)

一秒内

第一次访问

```md
http://localhost:8401/byResource

HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8
Content-Length: 24
Date: Wed, 12 Jan 2022 06:32:43 GMT
Keep-Alive: timeout=60
Connection: keep-alive

按照资源名称限流

Response code: 200; Time: 6ms; Content length: 8 bytes
```

第二次访问

```md
http://localhost:8401/byResource

HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8
Content-Length: 40
Date: Wed, 12 Jan 2022 06:32:48 GMT
Keep-Alive: timeout=60
Connection: keep-alive

资源名称被限流,暂时无法访问

Response code: 200; Time: 19ms; Content length: 14 bytes
```

但这里我们就有一个问题

> 我们这个服务是开在8401端口上的，当我们关闭8401，再重新打开后，所有的规则之类的都没有了
>
> 这个之前也有遇到过，说明是临时的，之后会解决

### 按照URL限流

非常简单，跟之前的一样

````java
@RestController
public class RateLimitController {


    /**
     * 注意 如果说是按照URL来限流而并非是资源名的话 我们的自定义blockHandler是无效的
     * @return String 
     */
    @GetMapping("/byResource")
    @SentinelResource(value = "res",blockHandler = "handlerException")
    public String byResource() {
        return "按照URL进行限流";
    }

    public String handlerException(BlockException exception) {
        return "URL被限流,暂时无法访问";
    }

}

````

![image-20220112144252118](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112144252118.png)

第一次访问

![image-20220112144303604](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112144303604.png)

第二次访问

![image-20220112144312165](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112144312165.png)



### 目前兜底方案中的问题

1. 系统默认的，没有体现我们自己的业务要求
2. 依照现有条件，我们自定义的处理方法又和业务代码耦合在一块，不直观
3. 每个业务方法都添加一个兜底的，那代码膨胀加剧
4. 全局统一的处理方法没有体现
5. 如果我们抛出自定义异常，比如空指针之类的无法处理
6. 不存在持久化，我们每次重启服务后都要手动在sentinel内进行配置

### 自定义限流处理逻辑

我们先来一个Controller

```java
@RestController
public class RateLimitController {

    @GetMapping("/rateLimit/customerBlockHandler")
    @SentinelResource(value = "customerBlockHandler")
    public String customerBlockHandler() {
        return "按自定义限流，这里是通过了的-OK";
    }

}

```

这个时候我们还没有自定义过处理，所以一定走的是默认的，但是我又不想在controller内写过多的业务代码，所以这个时候可以通过新建一个Handler类来进行解耦合

位置：`handler/CustomerBlockHandler`

代码 不需要加任何的bean之类的，但是注意方法需要为static的

```java
public class CustomerBlockHandler {

    public static String handlerException(BlockException exception){
        return "自定义限流处理---ERROR-----1";
    }

    public static String handlerException2(BlockException exception){
        return "自定义限流处理---ERROR-----2";
    }

}
```

接着回到controller，填上我们的内容

```java {5-11}
@RestController
public class RateLimitController {

    @GetMapping("/rateLimit/customerBlockHandler")
    @SentinelResource(
        value = "customerBlockHandler",
        // 找哪个类
        blockHandlerClass = CustomerBlockHandler.class, 
        // 指定类中的哪个方法 如果说没有指定类的话 默认是找本类的
        blockHandler = "handlerException2"
    )
    public String customerBlockHandler() {
        return "按自定义限流，这里是通过了的-OK";
    }

}
```

接着我们对自己的**资源**进行下限流

![image-20220112150037005](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112150037005.png)

访问过多的时候返回了我们想要的内容

![image-20220112150052275](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112150052275.png)

### @SentinelResource 参数说明

参照[官方文档](https://github.com/alibaba/Sentinel/wiki/%E6%B3%A8%E8%A7%A3%E6%94%AF%E6%8C%81)

> 注意：注解方式埋点不支持 private 方法。

`@SentinelResource` 用于定义资源，并提供可选的异常处理和 fallback 配置项。 `@SentinelResource` 注解包含以下属性：

> - `value`：资源名称，必需项（不能为空）
> - `entryType`：entry 类型，可选项（默认为 `EntryType.OUT`）
> - `blockHandler` / `blockHandlerClass`: `blockHandler` 对应处理 `BlockException` 的函数名称，可选项。
>   - blockHandler 函数访问范围需要是 `public`，返回类型需要与原方法相匹配，参数类型需要和原方法相匹配并且最后加一个额外的参数，类型为 `BlockException`
>   - blockHandler 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 `blockHandlerClass` 为对应的类的 `Class` 对象，**注意对应的函数必需为 static 函数**，否则无法解析。
> - `fallback` / `fallbackClass`：fallback 函数名称，可选项，用于在抛出异常的时候提供 fallback 处理逻辑。fallback 函数可以针对所有类型的异常（除了 `exceptionsToIgnore` 里面排除掉的异常类型）进行处理。fallback 函数签名和位置要求：
>   - 返回值类型必须与原函数返回值类型一致；
>   - 方法参数列表需要和原函数一致，或者可以额外多一个 `Throwable` 类型的参数用于接收对应的异常。
>   - fallback 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 `fallbackClass` 为对应的类的 `Class` 对象，注意对应的函数必需为 static 函数，否则无法解析。
> - `defaultFallback`（since 1.6.0）：默认的 fallback 函数名称，可选项，通常用于通用的 fallback 逻辑（即可以用于很多服务或方法）。默认 fallback 函数可以针对所有类型的异常（除了 `exceptionsToIgnore` 里面排除掉的异常类型）进行处理。若同时配置了 fallback 和 defaultFallback，则只有 fallback 会生效。defaultFallback 函数签名要求：
>   - 返回值类型必须与原函数返回值类型一致；
>   - 方法参数列表需要为空，或者可以额外多一个 `Throwable` 类型的参数用于接收对应的异常。
>   - defaultFallback 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 `fallbackClass` 为对应的类的 `Class` 对象，注意对应的函数必需为 static 函数，否则无法解析。
> - `exceptionsToIgnore`（since 1.6.0）：用于指定哪些异常被排除掉，不会计入异常统计中，也不会进入 fallback 逻辑中，而是会原样抛出。

1.8.0 版本开始，`defaultFallback` 支持在类级别进行配置。

> 注：1.6.0 之前的版本 fallback 函数只针对降级异常（`DegradeException`）进行处理，**不能针对业务异常进行处理**。

特别地，若 blockHandler 和 fallback 都进行了配置，则被限流降级而抛出 `BlockException` 时只会进入 `blockHandler` 处理逻辑。若未配置 `blockHandler`、`fallback` 和 `defaultFallback`，则被限流降级时会将 `BlockException` **直接抛出**（若方法本身未定义 throws BlockException 则会被 JVM 包装一层 `UndeclaredThrowableException`）。

![image-20220112152219401](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112152219401.png)

## Sentinel整合LoadBalancer和Feign

### 工程准备-服务提供者的搭建

服务提供者9001、9002

消费者80

我这里懒得弄杂七杂八的配置数据库了，正好刚刚在知乎看到Java有一个Faker库，所以直接拿来用用

Faker库的[地址](https://github.com/DiUS/java-faker)

```xml
<dependencies>

    <!--Faker库，注意 这里要排除掉那啥 不然会报错-->
    <dependency>
        <groupId>com.github.javafaker</groupId>
        <artifactId>javafaker</artifactId>
        <version>1.0.2</version>
        <exclusions>
            <exclusion>
                <groupId>org.yaml</groupId>
                <artifactId>snakeyaml</artifactId>
            </exclusion>
        </exclusions>
    </dependency>


    <!--        Nacos-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>



    <!--        基本组件-->
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

配置文件

```yaml
server:
  port: 9001
spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: myserver:8435
        username: nacos
        password: nacos

# 暴露监控端口
management:
  endpoints:
    web:
      exposure:
        include: "*"

```

main启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class CloudNacos9001Application {
    public static void main(String[] args) {
        SpringApplication.run(CloudNacos9001Application.class, args);
    }
}
```

controller，这里和service以及dao弄一块了，懒得搞别的

```java
@RestController
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/faker/{number}")
    public ResopnseResult<List<User>> fakerUser(@PathVariable("number") int number) {
        return getRandomUser("success-----" + serverPort, number);
    }


    /**
     * 用于生成假的随机数据
     */
    private static final Faker FAKER = new Faker(new Locale("zh-CN"));

    /**
     * 测试类
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class User {
        private String name;
        private String password;
        private String address;
        private String phone;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class ResopnseResult<T> {
        private int code;
        private String message;
        private T data;
    }

    /**
     * 生成User假数据
     *
     * @param number 生成的数量
     * @return User列表
     */
    private static ResopnseResult<List<User>> getRandomUser(String message, int number) {
        ArrayList<User> users = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            users.add(new User(FAKER.name().fullName(), FAKER.internet().password(), FAKER.address().fullAddress(), FAKER.phoneNumber().cellPhone()));
        }
        return new ResopnseResult<>(0, message, users);
    }


}
```

请求结果：

```json
// 请求： GET http://localhost:9001/faker/1
{
  "code": 0,
  "message": "success-----9001",
  "data": [
    {
      "name": "田熠彤",
      "password": "wvxrhu5ht5f",
      "address": "Apt. 728 魏侬3084号, 库尔勒, 京 581915",
      "phone": "17836909687"
    }
  ]
}
```

不得不说，Java的工具类库玩起来是真的舒服..

### 消费者80的搭建

首先是依赖

```xml
<dependencies>


    <!--        Sentinel持久化 这个后续持久化的时候要用到-->
    <dependency>
        <groupId>com.alibaba.csp</groupId>
        <artifactId>sentinel-datasource-nacos</artifactId>
    </dependency>

    <!--        Sentinel-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    </dependency>

    <!--        Nacos-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>

    <!--        负载均衡-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-loadbalancer</artifactId>
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

然后是配置文件，开启sentinel

```yaml
server:
  port: 80
spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: myserver:8435
        username: nacos
        password: nacos
    #nacos
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8719
# 暴露监控端口
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

启动类 记得开启Fegin

```java {3}
@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients
public class Consumer80Application {
    public static void main(String[] args) {
        SpringApplication.run(Consumer80Application.class, args);
    }
}
```

两个domain

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResopnseResult<T> {
    private int code;
    private String message;
    private T data;
}

@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    private String name;
    private String password;
    private String address;
    private String phone;
}
```

一个fegin的service接口

```java {2}
@Service
@FeignClient("nacos-payment-provider")
public interface PaymentFeignService {
    @GetMapping("/faker/{number}")
    public ResopnseResult<List<User>> fakerUser(@PathVariable("number") int number);
}
```

一个controller 注意 **这里带有Sentinel**以及异常

低于5个没有异常，等于2333抛异常，大于5个抛异常

```java {8}
@RestController
public class OrderController {

    @Resource
    PaymentFeignService paymentFeignService;

    @GetMapping("test/{count}")
    @SentinelResource("fakerFallback")
    public ResopnseResult<List<User>> fakerUsers(@PathVariable("count") int number) {
        if (number <= 5) {
            return paymentFeignService.fakerUser(number);
        } else if (number == 2333) {
            throw new IllegalArgumentException("参数异常");
        }
        throw new NullPointerException("超过5个");
    }

}

```

访问效果：

![image-20220112161742038](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112161742038.png)

第二次：

![image-20220112161757094](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112161757094.png)

负载均衡 Get

经过以上的配置，最终在nacos内的

![image-20220112162206114](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112162206114.png)

在sentinel内的

![image-20220112162449708](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112162449708.png)

### ✨服务熔断只配置fallback(服务降级-处理自定义异常)

我们刚刚手动写过两个错误，如果说直接抛出给用户的话不太友好

```java {4-9}
@GetMapping("test/{count}")
// 这里没有配置fallback
@SentinelResource("fakerFallback")
public ResponseResult<List<User>> fakerUsers(@PathVariable("count") int number) {
    if (number <= 5) {
        return paymentFeignService.fakerUser(number);
    } else if (number == 2333) {
        throw new IllegalArgumentException("参数异常");
    }
    throw new NullPointerException("超过5个");
}
```

如果说按照以往的思路，我们可以通过自定义一个SpringMVC的异常配置来进行处理，返回漂亮的结果

```java
@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler({IllegalArgumentException.class, NullPointerException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseResult<String> handleException(Exception e) {
        ResponseResult<String> result = new ResponseResult<>();
        result.setCode(500);
        result.setMessage("服务器内部错误");
        result.setData(e.getMessage());
        return result;
    }

}
```

访问返回了json

```json
{
    "code": 500,
    "message": "服务器内部错误",
    "data": "超过5个"
}
```

但是这显然没有达到我们的目的，接下来通过Sentinel来配置吧

```java {8,18-21}
@RestController
public class OrderController {

    @Resource
    PaymentFeignService paymentFeignService;

    @GetMapping("test/{count}")
    @SentinelResource(value = "fakerFallback", fallback = "handlerFallback")
    public ResponseResult<List<User>> fakerUsers(@PathVariable("count") int number) {
        if (number <= 5) {
            return paymentFeignService.fakerUser(number);
        } else if (number == 2333) {
            throw new IllegalArgumentException("参数异常");
        }
        throw new NullPointerException("超过5个");
    }

    public ResponseResult<String> handlerFallback(int number, Throwable throwable) {
        return new ResponseResult<>(400, "兜底异常handlerFallback触发", "exception的内容:" + throwable.getMessage());
    }
}
```

> 特别说明：**这个handlerFallback中的参数 如果要返回给用户异常之类的信息 一定要把之前fakerUsers这个方法内的参数（int number）也挪过来，不然百分之百不成功…**

效果

![image-20220112170024390](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112170024390.png)



### ✨只配置BlockHandler(处理sentinel控制台配置违规异常)

草，我才发现..这玩意有两个block 太草了

```java {11-17}
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface SentinelResource {
    String value() default "";

    EntryType entryType() default EntryType.OUT;

    int resourceType() default 0;

    String blockHandler() default "";

    Class<?>[] blockHandlerClass() default {};

    String fallback() default "";

    String defaultFallback() default "";

    Class<?>[] fallbackClass() default {};

    Class<? extends Throwable>[] exceptionsToTrace() default {Throwable.class};

    Class<? extends Throwable>[] exceptionsToIgnore() default {};
}

```

配置

```java {9,23-25}
@RestController
public class OrderController {

    @Resource
    PaymentFeignService paymentFeignService;

    @GetMapping("test/{count}")
    //    @SentinelResource(value = "fakerFallback", fallback = "handlerFallback")
    @SentinelResource(value = "fakerFallback", blockHandler = "sentinelFallBack")
    public ResponseResult<List<User>> fakerUsers(@PathVariable("count") int number) {
        if (number <= 5) {
            return paymentFeignService.fakerUser(number);
        } else if (number == 2333) {
            throw new IllegalArgumentException("参数异常");
        }
        throw new NullPointerException("超过5个");
    }

    public ResponseResult<String> handlerFallback(int number, Throwable throwable) {
        return new ResponseResult<>(400, "兜底异常handlerFallback触发", "exception的内容:" + throwable.getMessage());
    }

    public ResponseResult<String> sentinelFallBack(int number, Throwable throwable) {
        return new ResponseResult<>(400, "控制台异常sentinelFallBack触发", "exception的内容:" + throwable.getMessage());
    }
}
```

然后手动的给他上一个buff

![image-20220112171045872](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112171045872.png)

然后多次访问正确的

![image-20220112171327548](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112171327548.png)

单次访问错误的

![image-20220112171346760](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112171346760.png)

多次访问错误的

![image-20220112171356489](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112171356489.png)

### 目前两种配置方式存在的缺陷

只配置fallback的话，sentinel控制台的异常将捕获不到，反之亦然，解决方案也很简单，就是两个都配置

![image-20220112172309539](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112172309539.png)

### ✨Fallback和BlockHandler都配置

直接按照下方代码走一遭即可

```java {8,25-27,36-38}
@RestController
public class OrderController {

    @Resource
    PaymentFeignService paymentFeignService;

    @GetMapping("test/{count}")
    @SentinelResource(value = "fakerFallback", blockHandler = "sentinelFallBack", fallback = "handlerFallback")
    public ResponseResult<List<User>> fakerUsers(@PathVariable("count") int number) {
        if (number <= 5) {
            return paymentFeignService.fakerUser(number);
        } else if (number == 2333) {
            throw new IllegalArgumentException("参数异常");
        }
        throw new NullPointerException("超过5个");
    }

    /**
     * 本例是Fallback
     *
     * @param number
     * @param throwable
     * @return
     */
    public ResponseResult<String> handlerFallback(int number, Throwable throwable) {
        return new ResponseResult<>(400, "兜底异常handlerFallback触发", "exception的内容:" + throwable.getMessage());
    }

    /**
     * 本例是BlockHandler
     *
     * @param number
     * @param throwable
     * @return
     */
    public ResponseResult<String> sentinelFallBack(int number, BlockException throwable) {
        return new ResponseResult<>(400, "控制台异常sentinelFallBack触发", "exception的内容:" + throwable.getMessage());
    }


}

```

然后加个debuff

![image-20220112172744056](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112172744056.png)

直接访问错误的：

```json
{
    "code": 400,
    "message": "兜底异常handlerFallback触发",
    "data": "exception的内容:超过5个"
}
```

多次访问错误的：

```java
{
    "code": 400,
    "message": "控制台异常sentinelFallBack触发",
    "data": "exception的内容:null"
}
```

### 忽略指定的异常

![image-20220112173728910](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112173728910.png)

就是不捕获，让其自生自灭某个异常，在工作中应该用的上（人工修Bug的时候）

### ✨使用Fegin来完成服务宕机的熔断处理

配置文件先加上开启fegin

```yaml {23-25}
server:
  port: 80
spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: myserver:8435
        username: nacos
        password: nacos
    #nacos
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8719
# 暴露监控端口
management:
  endpoints:
    web:
      exposure:
        include: "*"
feign:
  circuitbreaker:
    enabled: true
```

然后写一个FallbackFactory

```java
@Component
public class PaymentFeignServiceFallbackImpl implements FallbackFactory<PaymentFeignService> {


    @Override
    public PaymentFeignService create(Throwable cause) {
        return new PaymentFeignServiceImpl();
    }

    private static class PaymentFeignServiceImpl implements PaymentFeignService {
        @Override
        public ResponseResult<List<User>> fakerUser(int number) {
            return new ResponseResult<>(411, "友好的服务降级", null);
        }

    }
}
```

然后到service中引入

```java {2}
@Service
@FeignClient(value = "nacos-payment-provider", fallbackFactory = PaymentFeignServiceFallbackImpl.class)
public interface PaymentFeignService {
    @GetMapping("/faker/{number}")
    public ResponseResult<List<User>> fakerUser(@PathVariable("number") int number);
}
```

再到controller内使用

```java
@RestController
public class OrderController {

    @Resource
    PaymentFeignService paymentFeignService;

    @GetMapping("test/{count}")
    @SentinelResource(value = "fakerFallback")
    public ResponseResult<List<User>> fakerUsers(@PathVariable("count") int number) {
        System.out.println("经过了我的方法");
        if (number <= 5) {
            return paymentFeignService.fakerUser(number);
        } else if (number == 2333) {
            throw new IllegalArgumentException("参数异常");
        }
        throw new NullPointerException("超过5个");
    }
}
```

最终main方法不要忘了加上

```java {3}
@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients
public class Consumer80Application {
    public static void main(String[] args) {
        SpringApplication.run(Consumer80Application.class, args);
    }
}

```

然后访问

当我们的服务正常的时候返回的值

```json
{
    "code": 0,
    "message": "success-----9001",
    "data": [
        {
            "name": "郑鹤轩",
            "password": "4eg5si5mc",
            "address": "严路079号, 武汉, 新 151681",
            "phone": "15708796654"
        }▸
    ]▸
}
```

当我们服务宕机的时候

![image-20220112180715043](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112180715043.png)

返回的值

```json
{
    "code": 411,
    "message": "友好的服务降级",
    "data": null
}
```

### 熔断框架比较

![image-20220112180954657](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112180954657.png)

最后一个国外用的多一些

## 规则持久化

说了好久了，一旦我们重启应用，Sentinel规则将消失，所以需要持久化来帮我们手动配置

### 如何持久化

只要有一个持久化的媒介即可，正好nacos支持配置存储，当然我们也可以选择redis之类的，反正只要能存储数据就行

本来我还纳闷为啥一定要中间件…不能直接存储吗…直到我看到了他们WIKI中的[这个](https://github.com/alibaba/Sentinel/wiki/AHAS-Sentinel-%E6%8E%A7%E5%88%B6%E5%8F%B0)

阿里还提供了AHAS Sentinel 控制台，功能比这个更丰富

懂了，要么自己折腾，要么花钱用他们家的

先自己折腾吧

### 依赖准备

除了Nacos，它还支持非常多的方式，可以在[这里](https://mvnrepository.com/search?q=sentinel-datasource)看到

```xml
   <dependencies>


        <!--        Sentinel持久化For Nacos-->
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>

        <!--        Sentinel-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>

        <!--        Nacos-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!--        其他组件-->
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

### 配置文件

```yaml {17-25}
server:
  port: 80
spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: myserver:8435
        username: nacos
        password: nacos
    #nacos
    sentinel:
      transport:
        dashboard: localhost:8080
        port: 8719
      datasource:
        # 这里相当于是它配置一个数据源 名字是ds1 这个千万不能漏了...
       ds1:
         nacos:
           # Nacos的地址
           server-addr: myserver:8435
           # DataID
           dataID: ${spring.application.name}
           # 分组
           groupID: DEFAULT_GROUP
           # 账号以及密码
           username: nacos
           password: nacos
           # 读取配置文件为json
           data-type: json
           # 流控规则 就是我们之前配置的限流等（有好几种：flow、degrade、authority、system、param-flow，gw-flow，gw-api-group）
           rule-type: flow
     # 关闭懒加载 启动的时候直接加载所有的配置
      eager: true
#      web-context-unify: false
# 暴露监控端口
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

### Nacos控制台配置

规则的种类可以在[这里](https://github.com/alibaba/Sentinel/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8#%E8%A7%84%E5%88%99%E7%9A%84%E7%A7%8D%E7%B1%BB)查看

这里只展示**流量控制规则**

| Field           | 说明                                                                   | 默认值                        |
| --------------- | ---------------------------------------------------------------------- | ----------------------------- |
| resource        | 资源名，资源名是限流规则的作用对象                                     |                               |
| count           | 限流阈值                                                               |                               |
| grade           | 限流阈值类型，QPS 模式（1）或并发线程数模式（0）                       | QPS 模式                      |
| limitApp        | 流控针对的调用来源                                                     | `default`，代表不区分调用来源 |
| strategy        | 调用关系限流策略：直接、链路、关联(0,1,2)                              | 根据资源本身（直接）          |
| controlBehavior | 流控效果（直接拒绝/WarmUp/匀速+排队等待），不支持按调用关系限流(0,1,2) | 直接拒绝                      |
| clusterMode     | 是否集群限流(true/false)                                               | 否                            |

Json：

```json
[
    {
        "resource":"/test/{count}",
        "limitApp":"default",
        "grade":2,
        "count":1,
        "strategy":0,
        "controlBehavior":0,
        "clusterMode":false
    }
]
```

![image-20220112195509106](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112195509106.png)

### 测试

刚启动 我啥都还没整，规则就有了

![image-20220112195417529](/images/SpringCloud/13-Sentinel熔断与限流/image-20220112195417529.png)

## 如何自定义Sentinel-让其自动持久化推送到Nacos

一句话概括：要改sentinel的源码

懒得改，用别人的吧

<https://www.jianshu.com/p/9c5ad75ddfa5>

<https://www.jianshu.com/p/9a6cf8634805>

<https://blog.csdn.net/weixin_42942786/article/details/108679948>

<https://www.jianshu.com/p/637ce8acc271>

主要是改不来 试了三个小时 依旧摸不着头脑，代码按照前面三个改动了 debug跑也正常 但nacos内就是不变更，感觉像是两边的api都有所变动导致的不对等造成的..

百度 `sentinel 集成 nacos`







