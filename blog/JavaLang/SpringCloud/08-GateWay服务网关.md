---
title: 08-GateWay服务网关
date: 2022-1-8 12:10:11
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud GateWay
- SpringCloud
---

## 概述

其实本来应该学下Zuul的，但是那玩意分歧比较大（Zuul和Zuul2杂七杂八的瓜）

反正GateWay是它的替代品

Zuul的网站<https://github.com/Netflix/zuul/wiki>

GateWay的网站<https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/>

Spring Cloud全家桶中有个很重要的组件就是网关，在1.x版本中使用的都是Zuul网关

但在2.x版本中，Zuul的升级一直跳票，SpringCloud最后自己研发了一个网关替代Zuul

也就是 Spring Cloud Gateway 一句话：gateway就是原zuul1.x版本的替代（貌似现在Zuul2.x出了 有机会可以去了解下）

Spring Cloud Gateway 是基于Webflux框架实现的，而WebFlux框架底层则使用了高性能的Reactor模式通信框架Netty

PS：Netty也是一个蛮牛逼的东西，以后要去了解下，好像老韩讲过这类的课程（主要是这个Netty非常抽象，我们一般都是用现成的）

它能做啥？

- 反向代理
- 鉴权
- 流量控制
- 熔断
- 日志监控

![image-20220108125324893](/images/SpringCloud/08-GateWay服务网关/image-20220108125324893.png)

网关是所有微服务的入口

Spring Cloud Gateway具有以下特性

1. 基于Spring FrameWork 5、Project Reactor 和 Spring Boot 2.0进行重构
2. 动态路由：能够匹配任何请求属性
3. 可以对路由指定Predicate(断言)和Filter(过滤器)
4. 集成Hystrix的断路器功能
5. 集成Spring Cloud服务发现功能
6. 易于编写的Predicate(断言)和Filter(过滤器)
7. 请求限流功能
8. 支持路径重写

![image-20220108125859245](/images/SpringCloud/08-GateWay服务网关/image-20220108125859245.png)

![image-20220108130508461](/images/SpringCloud/08-GateWay服务网关/image-20220108130508461.png)

## Gateway的三大核心概念

### 路由Route

构建网关的基本模块，它由ID，目标URL，一系列的断言和过滤器组成，如果断言为true，则表示匹配该路由

![image-20220108130822519](/images/SpringCloud/08-GateWay服务网关/image-20220108130822519.png)

### 断言Predicate

参考Java8的`java.util.function.Predicate`

开发人员可以匹配HTTP请求中的所有内容（例如请求头或请求参数），如果请求与断言匹配则进行路由

### 过滤Filter

指的是Spring框架中的GatewayFilter的实例，使用过滤器，可在请求路由前后对请求进行修改

![image-20220108134245168](/images/SpringCloud/08-GateWay服务网关/image-20220108134245168.png)

![image-20220108134429435](/images/SpringCloud/08-GateWay服务网关/image-20220108134429435.png)

就有点像是SpringSecurity那样

## 使用

### Gateway9527的搭建

依赖， 注意 没有web和actuator 这玩意不需要

```xml {2-5}
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-consul-discovery</artifactId>
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
  port: 9527
spring:
  application:
    name: cloud-gateway
  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
#        hostname: 127.0.0.1

```

然后主启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class CloudGateway9527Application {
    public static void main(String[] args) {
        SpringApplication.run(CloudGateway9527Application.class, args);
    }
}

```

## Router路由

### 配置Route

我现在的8001有如下的controller

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

我想在8001外面再套一层9527，可能你这个时候会想，为什么不用Nginx，那玩意不是也可以做到吗？

Gateway和Nginx的区别就是：Nginx是对外网关，GateWay是对内网关

我们要使用route也非常简单，就像是Vue那样

```yaml
#端口号
server:
  port: 9527
spring:
  application:
    name: cloud-gateway
  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
    #        hostname: 127.0.0.1
    gateway:
    # 注册route
      routes:
          # 路由的ID，没有固定规则但要求唯一，一般来说都是配合服务名称定义
        - id: payment_route1
          # 匹配后提供服务的路由地址 注意这里是uri别写成url了
          uri: http://localhost:8001
          # 断言 路径相匹配进行路由
          predicates:
            - Path=/payment/hystrix/ok/**
        - id: payment_route2
          uri: http://localhost:8001
          predicates:
            - Path=/payment/hystrix/timeout/**
        - id: payment_route3
          uri: http://localhost:8001
          predicates:
            - Path=/payment/hystrix/error/**
```

### 启动并测试

如果你之前没有移除web和actuator这连个依赖，Gateway在启动的时候将会报错

![image-20220108140811736](/images/SpringCloud/08-GateWay服务网关/image-20220108140811736.png)

我这里用的是consul，所以外部启动，然后依次启动两个服务即可

接着你可以看到9527这里标了一把×，这个不用管，是因为它更不提供服务导致的，它只有服务转发

![image-20220108141422980](/images/SpringCloud/08-GateWay服务网关/image-20220108141422980.png)

接着我们get 8001 <http://localhost:8001/payment/hystrix/ok/1>

![image-20220108141456256](/images/SpringCloud/08-GateWay服务网关/image-20220108141456256.png)

没问题

那么换成9527呢？ <http://localhost:9527/payment/hystrix/ok/1>

![image-20220108141515201](/images/SpringCloud/08-GateWay服务网关/image-20220108141515201.png)

依旧没问题

并且无论是error

![image-20220108141615360](/images/SpringCloud/08-GateWay服务网关/image-20220108141615360.png)

或者是timeout

![image-20220108141629093](/images/SpringCloud/08-GateWay服务网关/image-20220108141629093.png)

都可以直接通过9527进行访问

### 关于YAML的说明

![image-20220108141751711](/images/SpringCloud/08-GateWay服务网关/image-20220108141751711.png)

接下来尝试一下给8001添加一个路由

```java
@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("ls")
    public String ls() {
        return Thread.currentThread().getName() + "\n8001\n" + "hello world";
    }
}
```

然后我们同理在9527内进行配置

```yaml {18-21}
    gateway:
      routes:
          # 路由的ID，没有固定规则但要求唯一，一般来说都是配合服务名称定义
        - id: payment_route1
          # 匹配后提供服务的路由地址 注意这里是uri别写成url了
          uri: http://localhost:8001
          # 断言 路径相匹配进行路由
          predicates:
            - Path=/payment/hystrix/ok/**
        - id: payment_route2
          uri: http://localhost:8001
          predicates:
            - Path=/payment/hystrix/timeout/**
        - id: payment_route3
          uri: http://localhost:8001
          predicates:
            - Path=/payment/hystrix/error/**
        - id: payment_test_ls
          uri: http://localhost:8001
          predicates:
             - Path=/test/ls
```

然后重启这两位，访问下9527

![image-20220108142221668](/images/SpringCloud/08-GateWay服务网关/image-20220108142221668.png)

![image-20220108151632842](/images/SpringCloud/08-GateWay服务网关/image-20220108151632842.png)

依旧是成功的

用人话来概括就是：9527是唐伯虎点秋香中，星爷的下人编号

### GateWay的Router的第二种方式-Bean

我们除了像之前那样在yaml中进行配置，还可以通过在代码中注入RouteLocator的bean来进行配置(不过有点恶心)

它通过bean来配置的话，和Angular的路由配置书写风格很像

我们现在换一种方式吧，通过9527，访问到[百度新闻](http://news.baidu.com/guonei)的地址，就像是在Nginx中做的那样，又或者通过它，跳转到bilibili的[番剧区](https://bilibili.com/anime)

其实配置还是比较友好的，整体来说

```java
@Configuration
public class GateWayConfig {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        RouteLocatorBuilder.Builder routes = builder.routes();
        routes.route("baidu_new_guonei", new Function<PredicateSpec, Buildable<Route>>() {
            @Override
            public Buildable<Route> apply(PredicateSpec r) {
                // 这里的第一个参数是本地的路径 第二个参数是要最终跳转到的url
                return r.path("/guonei").uri("http://news.baidu.com/guonei");
            }
        }).build();
        // 上面的简写
        routes.route("bilibili_home_page", r -> r.path("/anime").uri("https://bilibili.com/anime")).build();

        return routes.build();
    }
}

```

访问`/guonei`

![image-20220108144047808](/images/SpringCloud/08-GateWay服务网关/image-20220108144047808.png)

访问`/anime`

![image-20220108144136434](/images/SpringCloud/08-GateWay服务网关/image-20220108144136434.png)

这个是由于啊b的重定向导致的..

gateway人称小nginx也就是这么来的

### 通过微服务名配置动态路由

我们想要的效果应该是这样的

![image-20220108145543353](/images/SpringCloud/08-GateWay服务网关/image-20220108145543353.png)

客户端 网关 注册中心 服务端 应该是这样的

> 在默认情况下， GateWay会根据注册中心注册 服务列表，以**注册中心**上**微服务名为路径**创建动态路由进行转发，从而实现动态路由功能

我们现在在再来创建一个8002

```yaml
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
        # 服务提供方1也加上对应的别名
        instance-id: 服务提供方2

```

![image-20220108150830914](/images/SpringCloud/08-GateWay服务网关/image-20220108150830914.png)

然后开始配置，只需要两步即可

1. 开启`spring.gateway,discovery.locator.enabled=true`
   1. 开启enable: true, 可以不用写routes, 即可通过服务名访问, 默认负载均衡为轮询方式
   2. enable: true的功能:
      - 自动以注册中心的服务名, 进行路由注册
      - 则此时可以通过ip:端口/注册服务名/请求URI进行访问
      - 如果设置routes的话, 则访问只需要 ip:端口/路径即可.
      - 但是, 不配置routes的话, 是无法完成更复杂的断言和筛选的
2. 将服务的url替换成以`lb://`开头（替换掉原本的`http://`）并将最终地址改成我们的服务名
   1. uri以lb://开头（lb代表从注册中心获取服务），后面接的就是你需要转发到的服务名称
   2. lb：是指路由的一种通信协议，它实现了负载均衡通信功能
   3. 路由方式有三种
      - `ws://host:port`（websocket方式）
      - `http://host:port`（HTTP方式）
      - `lb://微服务名`

```yaml {16-19,24,29,33,37}
#端口号
server:
  port: 9527
spring:
  application:
    name: cloud-gateway
  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
    #        hostname: 127.0.0.1
    gateway:
      discovery:
        locator:
          # 开启从服务中心动态创建路由的功能，利用微服务名进行路由
          enabled: true
      routes:
          # 路由的ID，没有固定规则但要求唯一，一般来说都是配合服务名称定义
        - id: payment_route1
          # 把原本的http换成lb://服务名即可
          uri: lb://consul-provider-payment
          # 断言 路径相匹配进行路由
          predicates:
            - Path=/payment/hystrix/ok/**
        - id: payment_route2
          uri: lb://consul-provider-payment
          predicates:
            - Path=/payment/hystrix/timeout/**
        - id: payment_route3
          uri: lb://consul-provider-payment
          predicates:
            - Path=/payment/hystrix/error/**
        - id: payment_test_ls
          uri: lb://consul-provider-payment
          predicates:
             - Path=/test/ls
```

接着重启，然后尝试访问

![image-20220108151653127](/images/SpringCloud/08-GateWay服务网关/image-20220108151653127.png)

![image-20220108151658449](/images/SpringCloud/08-GateWay服务网关/image-20220108151658449.png)

可以发现，这里是采用了轮循来进行负载均衡

## Predicate断言

在[官方文档](https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/#gateway-request-predicates-factories)中，我们可以看到很多对应的配置

![image-20220108152655804](/images/SpringCloud/08-GateWay服务网关/image-20220108152655804.png)

光看名字的话 emm前后前后然后cookie还有path之类的校验？

我们来看看第一个，简介内是这样说的：

> This predicate matches requests that happen after the specified datetime. The following example configures an after route predicate:
>
> 配置只在对应时间后发的请求才回进行处理

然后给出了如下的内容

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: after_route
        uri: https://example.org
        predicates:
        - After=2017-01-20T17:42:47.789-07:00[America/Denver]
```

接下来根据文档得知所有断言`Predicate`的父类是`RoutePredicateFactory<C>`这个类，类图如下，拥有这些实现类

![image-20220108153024021](/images/SpringCloud/08-GateWay服务网关/image-20220108153024021.png)

接下来简单说下使用

### 常用的Predicate

我们有这些可以开箱即用

![image-20220108153228339](/images/SpringCloud/08-GateWay服务网关/image-20220108153228339.png)

### 时间断言

1. 在指定的时间之后访问
2. 在指定的时间之前访问
3. 在指定的时间段内进行访问

官方文档的格式是：

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: after_route
        uri: https://example.org
        predicates:
        # 指定的时间后才能进行访问
        - After=2017-01-20T17:42:47.789-07:00[America/Denver]
        # 指定的时间之前 才能进行访问
        - Before=2017-01-20T17:42:47.789-07:00[America/Denver]
        # 在指定的时间段内之间 才能进行访问 第一个是开始时间，第二个是结束时间
        - Between=2017-01-20T17:42:47.789-07:00[America/Denver], 2017-01-21T17:42:47.789-07:00[America/Denver]
```

如果没有在指定的时间限制内进行访问，将会返回`404 not found`

应用场景：游戏开服，秒杀开始等（一般都是做游戏开服hhh秒杀也用不上这玩意）

> 然后是时间应该怎么填写的问题

根据对时间的了解，`2017-01-20T17:42:47.789-07:00[America/Denver]`指的是西时区`-7:00`也就是西七区标识是美国丹佛，而我国是东八区`+8:00`，然后标识是中国上海，`PRC` 也可以代表 中国时区，不过一般都是用上海

所以只需要

```yaml {9}
spring:
  cloud:
    gateway:
      routes:
      - id: after_route
        uri: https://example.org
        predicates:
        # 指定的时间后
        - After=2017-01-20T17:42:47.789+08:00[Asia/Shanghai]
```

我们也可以通过java8中的ZoneDateTime来生成

```java
public class test {

    @Test
    public void t1() {
//        默认时区
        ZonedDateTime now = ZonedDateTime.now();
        System.out.println("默认时区：" + now);
//        指定时区上海
        ZonedDateTime now1 = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));
        System.out.println("上海:Asia/Shanghai时区：" + now1);
//        美国
        ZonedDateTime now2 = ZonedDateTime.now(ZoneId.of("America/New_York"));
        System.out.println("美国:America/New_York时区：" + now2);
//        日本
        ZonedDateTime now3 = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        System.out.println("日本:Asia/Tokyo时区：" + now3);
//        法国
        ZonedDateTime now4 = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
        System.out.println("法国:Europe/Paris时区：" + now4);
//        澳大利亚
        ZonedDateTime now5 = ZonedDateTime.now(ZoneId.of("Australia/Sydney"));
        System.out.println("澳大利亚:Australia/Sydney时区：" + now5);
//        格林威治 属于英国伦敦，为世界标准时间，没有时区
        ZonedDateTime now6 = ZonedDateTime.now(ZoneId.of("Europe/London"));
        System.out.println("格林威治:Europe/London时区：" + now6);
    }
}
```

结果：

```md
默认时区：2022-01-08T15:42:57.509+08:00[Asia/Shanghai]
上海:Asia/Shanghai时区：2022-01-08T15:42:57.510+08:00[Asia/Shanghai]
美国:America/New_York时区：2022-01-08T02:42:57.512-05:00[America/New_York]
日本:Asia/Tokyo时区：2022-01-08T16:42:57.514+09:00[Asia/Tokyo]
法国:Europe/Paris时区：2022-01-08T08:42:57.515+01:00[Europe/Paris]
澳大利亚:Australia/Sydney时区：2022-01-08T18:42:57.516+11:00[Australia/Sydney]
格林威治:Europe/London时区：2022-01-08T07:42:57.517Z[Europe/London]
```

### Cookie断言

语法很简单

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: cookie_route
        uri: https://example.org
        predicates:
        - Cookie=chocolate, ch.p
```

Cookie Route Predicate需要接受两个参数

- 一个是Cookie name
- 一个是正则表达式

路由规则会通过获取对应的cookie name 值和 正则表达式去匹配，如果匹配上就去执行路由，否则不执行

我们现在来写一个简单的

```yaml
        - id: payment_test_ls
          uri: lb://consul-provider-payment
          predicates:
            - Path=/test/ls
            - Cookie=username,zzyy
```

认证用oauth2，用token而不是cookie来做认证，当然token会实际放到headers里，但并不需要在这里做认证，请求都会通过oauth2的资源服务器(即当前服务)转发到认证服务器认证

接下来我们重启，并打开cmd（Powershell没有curl）或者shell进行测试

![image-20220108160241641](/images/SpringCloud/08-GateWay服务网关/image-20220108160241641.png)

可以看到 当我们没有带cookie的时候 访问失败 返回404

带了cookie，则返回我们想要的内容

如果说想要正则表达式的话，切记要这样写：例如我想验证cookie的email是一个邮箱格式

```md
[\w!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[\w!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?
```

则这里也直接这样写就可以了，不要像在Java中使用正则表达式那样加两个`\`（YAML会自动帮我们转义）

也就是：

```yaml
        - id: payment_test_ls
          uri: lb://consul-provider-payment
          predicates:
            - Path=/test/ls
            - Cookie=email,^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
```

测试结果

![image-20220108161018403](/images/SpringCloud/08-GateWay服务网关/image-20220108161018403.png)

传入错误的值：

![image-20220108161035796](/images/SpringCloud/08-GateWay服务网关/image-20220108161035796.png)

### 请求头断言

使用和cookie一样

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: header_route
        uri: https://example.org
        predicates:
        - Header=X-Request-Id, \d+
```

上面指的是请求头要有`X-Request-Id`并且值为整数

如果验证不成功，返回404

### 指定的请求方法断言

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: method_route
        uri: https://example.org
        predicates:
        # 可以是一个 可以是多个
        - Method=GET,POST
```

### 指定的rest风格地址断言

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: path_route
        uri: https://example.org
        predicates:
        - Path=/red/{segment},/blue/{segment}
```

这里是放在path上的，然后这里放了两个

- 匹配`/red/{segment}`
- 匹配`/blud/{segment}`

也可以只放一个，也可以多段的放，例如：`/red/{abc}/123/{aaa}`

### 指定的请求参数

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: query_route
        uri: https://example.org
        predicates:
        - Query=username,\d+
        - Query=password
```

这里可以为正则表达式

第一个参数字段

第二个参数值

如果说没有填第二个参数的话表示只要有该字段即可

### 指定的ip地址/Host才能访问

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: remoteaddr_route
        uri: https://example.org
        predicates:
        # ip地址 可以配置多个 可以支持通配符*
        - RemoteAddr=192.168.1.1/24,111.11.111.*
        # 主机  可以配置多个
        - Host=**.somehost.org,**.abc.com
```

注意 remoteaddr是用户不可以自定义的，host是用户可以自定义的



### 设置权重形负载均衡

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: weight_high
        uri: https://weighthigh.org
        predicates:
        - Weight=group1, 8
      - id: weight_low
        uri: https://weightlow.org
        predicates:
        - Weight=group1, 2
```

Weight接收两个参数

- 组名
- 权重值（int）

组名相同的，将会按照权重值来进行分配

上面如果进行访问的话，百分之八十的访问会分配到`https://weighthigh.org`

剩余百分之二十会被分配到` https://weightlow.org`

## Filter过滤器

![image-20220108163539594](/images/SpringCloud/08-GateWay服务网关/image-20220108163539594.png)

这就像是Spring Security的过滤器那样 可以用于修改Http请求和返回的HTTP响应，路由过滤器只能只能指定路由进行使用

Spring Cloud Gateway内置了多种路由过滤器，他们都由GatewayFilterFactory工厂类来产生

![image-20220108163832946](/images/SpringCloud/08-GateWay服务网关/image-20220108163832946.png)

### 生命周期和种类以及内置的过滤器

有两个生命周期

- pre：业务逻辑之前
- post：业务逻辑之后

种类也有两种

- GetawayFilter当前的
  - <https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/#gatewayfilter-factories>
  - 有三十一种内置的单一过滤器
- GlobalFilter全局的
  - <https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/#global-filters>
  - 近十来个全局的

草 接近41个

这里就不一一说明了

### 自定义全局过滤器GlobalFilter

这能干啥嘞？

- 全局日志记录
- 统一网关鉴权
- …

为啥不用自带的？

因为不太好使，不如自己配置来的方便一些

我们要使用，只需要写一个自定义类，并实现两个接口即可`implements GlobalFilter, Ordered`

文件`filter/MyLogGateWayFilter.java`

```java
@Component
@Slf4j
public class MyLogGateWayFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//        获取ip地址
        String ip = exchange.getRequest().getRemoteAddress().getAddress().getHostAddress();
//        服务器收到了来自IP地址为xx的访问，时间为
        log.info("服务器收到了来自IP地址为{}的访问，时间为{}", ip, new Date());
        String username = exchange.getRequest().getQueryParams().getFirst("username");
        if (StringUtils.isEmpty(username)) {
            log.info("用户名为空,非法用户");
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.NOT_ACCEPTABLE);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }

    /**
     * 加载过滤器的顺序，数值越小，优先级越高
     *
     * @return
     */
    @Override
    public int getOrder() {
        return Integer.MIN_VALUE;
    }
}
```

这样就可以了 接着我们重启下服务，然后尝试访问

- 不带参数：

服务端日志为：

![image-20220108170828570](/images/SpringCloud/08-GateWay服务网关/image-20220108170828570.png)

客户端响应为：

![image-20220108170742279](/images/SpringCloud/08-GateWay服务网关/image-20220108170742279.png)



带上我们指定的参数：

![image-20220108170856987](/images/SpringCloud/08-GateWay服务网关/image-20220108170856987.png)

客户端成功获取

![image-20220108170906434](/images/SpringCloud/08-GateWay服务网关/image-20220108170906434.png)

服务端成功打印

