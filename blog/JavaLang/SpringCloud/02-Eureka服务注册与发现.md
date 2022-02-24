---
title: 02-Eureka服务注册与发现
date: 2022-1-3 19:37:20
category: 分布式-微服务
tag:
- 微服务
- SpringCloud
- Spring Cloud Eureka
---

## 什么是服务治理

SpringCloud封装了Netfix公司开发的Eureka来实现服务治理

在传统的RPC远程调用框架内，管理每个服务与服务之间的依赖关系比较复杂，管理比较复杂，所以需要使用服务治理，管理服务与服务之间的依赖关系，可以实现服务调用，负载均衡，容错等，实现服务发现与注册

说穿了就是，N多个消费者和N多个服务提供者，你找我我找你的非常麻烦，我们需要管理机制来实现服务治理

Eureka用了CS的设计架构，Eureka Server作为服务注册功能的服务器

它是服务注册中心，而系统中的其他微服务，使用Eureka的客户端连接到Eureka Server并维持心跳连接，这样的系统维护人员可以通过Eureka Server来监控系统中各个微服务是否正常运行

在服务注册与发现中，有一个注册中心，当服务器启动的时候，会把自己的服务器信息，例如 服务器通讯地址等信息以别名的方式注册到注册中心上，另一方（消费者、服务提供者）以改别名的方式去注册中心上获取到实际的服务通讯地址，然后再实现本地RPC远程调用框架核心设计思想，在于注册中心，因为使用注册中心管理每个服务与服务之间的一个依赖关系（服务治理概念），在任何RPC远程框架中，都会有一个注册中心（存放服务地址相关的信息（接口地址））

下图中，左边是Eureka右边是Dubbo

![image-20220103194544734](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103194544734.png)

Eureka包含两个组件：Eureka Server 和 Eureka Client

Eureka Server提供服务注册服务

各个微服务节点通过配置启动后，会在EurekaServer中进行注册，这样EurekaServer中的服务注册中心表中会将存储所有可用节点的信息，服务节点的信息可以在界面中直观的看到

EurekaClient通过注册中心进行访问

是一个Java客户端，用于简化Eureka Server的交互

客户端同时也是一个内置的，使用轮循负载算法的负载均衡器

在应用启动后，将会向Eureka Server发送心跳（默认周期为30S）

如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，它将会从服务注册表中把这个服务节点移除（默认90s）

## 单机Eureka构建步骤

### 创建工程并添加依赖

我这里由于之前的commons用了那啥mybatis plus 然后这里用上了 所以不知道咋回事得配置下数据库

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>cn.hutool</groupId>
        <artifactId>hutool-all</artifactId>
        <version>5.7.18</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-annotation</artifactId>
        <version>3.4.3.4</version>
        <scope>compile</scope>
    </dependency>
</dependencies>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

### 配置spring boot

```yaml
server:
  port: 7001
eureka:
  instance:
    #eureka服务端的实例名称 注意 是名称
    hostname: localhost
  client:
    # 是否要将自己注册进Eureka的服务中
    register-with-eureka: false
    # 下面这false表示自己就是服务中心，指责就是维护实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      # 设置和Eureka Server交互的地址，查询服务和注册中心服务都需要依赖这个地址
      defaultZone: "http://${eureka.instance.hostname}:${server.port}/eureka/"
spring:
  application:
    name: eureka-server
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456
```

### 启动并测试

启动：

![image-20220103211210821](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103211210821.png)

访问<http://localhost:7001>

![image-20220103211119857](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103211119857.png)



发现这个表示成功了

他这里最上面 是空 表示没有服务注册进来

## 将8001注册到7001内

### 添加依赖

之前7001是用了server 所以8001被注册的节点用client即可

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

md 注意 这玩意安装完后 一定要点下Maven的clean 找bug找了我十来分钟 结果发现clear一下就好了

### 配置application

```yaml
# 更该端口
server:
  port: 8001
# 开个debug
logging.level.com.Project: debug
spring:
  #  应用名称
  application:
    name: cloud-provider-payment-8001
  #  数据库相关配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456


mybatis-plus:
  #  扫mapper.xml
  mapper-locations: [ "classpath*:/mapper/**/*.xml" ]
springfox:
  documentation:
    swagger-ui:
      enabled: false
    enabled: false
# 配置Eureka
eureka:
  client:
    #表示是否将自己注册进EurekaServer 默认true
    register-with-eureka: true
    # 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载
    fetch-registry: true
    # EurekaServer的地址，默认为localhost:8761
    service-url:
      defaultZone: http://localhost:7001/eureka



```

### 启动并测试

![image-20220103212821967](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103212821967.png)

我们现在8001 和 7001 都是启动着的

然后去服务那看看

![image-20220103212847551](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103212847551.png)

然后在application内 可以看到我们的服务

这个名字**CLOUD-PROVIDER-PAYMENT-8001**就是我们之前在application内配置的

![image-20220103212946772](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103212946772.png)

至于**EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE.**这个是Eureka的自我保护机制 之后会说明

## 将80注册到7001

 依旧是老一套

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

配置文件：

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
      defaultZone: http://localhost:7001/eureka
spring:
  application:
    name: cloud-consumer-order-80
```

启动类

```java
@SpringBootApplication
@EnableEurekaClient
public class CloudConsumerOrder80Application {

    public static void main(String[] args) {
        SpringApplication.run(CloudConsumerOrder80Application.class, args);
    }

}
```

启动成功后可以看到它也被注册进入了

![image-20220103213703370](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103213703370.png)

## Eureka集群

![image-20220103214710700](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103214710700.png)

秉持着万物皆可集群的原则。。。。

Eureka也可以做集群

它的集群简单来说就是互相注册下

![image-20220103215131853](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103215131853.png)

如果有三个，则：

- 1指向2,3
- 2指向3,1
- 3指向1,2

其余同理 反正各自都需要给对方注册自己

### 创建7002

跟之前一样 依赖如下

```xml
<dependencies>
    <!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-eureka-server -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
    </dependency>
    <dependency>
        <groupId>com.amayakite</groupId>
        <artifactId>cloud-api-commons</artifactId>
        <version>1.0-SNAPSHOT</version>
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
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid-spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jdbc</artifactId>
    </dependency>

</dependencies>
```

### 修改配置并启动

这个跟单机的不一样

之前我们是这样配置的

```yaml
server:
  port: 7001
eureka:
  instance:
    #eureka服务端的实例名称 注意 是名称
    hostname: localhost
  client:
    # 是否要将自己注册进Eureka的服务中
    register-with-eureka: false
    # 下面这false表示自己就是服务中心，指责就是维护实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      # 设置和Eureka Server交互的地址，查询服务和注册中心服务都需要依赖这个地址
      defaultZone: "http://${eureka.instance.hostname}:${server.port}/eureka/"
spring:
  application:
    name: eureka-server
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456
```

首先是名字 然后是defaultZone需要修改

我们先把7001的修改下

```yaml {14}
server:
  port: 7001
eureka:
  instance:
    #eureka服务端的实例名称
    hostname: eureka-server-7001
  client:
    # 是否要将自己注册进Eureka的服务中
    register-with-eureka: false
    # 下面这false表示自己就是服务中心，指责就是维护实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      # 设置和Eureka Server交互的地址，查询服务和注册中心服务都需要依赖这个地址
      defaultZone: "http://127.0.0.1:7002/eureka/"
spring:
  application:
    name: eureka-server
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456
```

注意 链接要配置成7002的

然后7002的同理

然后给7002加一个启动类

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaMain7002Application {
    public static void main(String[] args) {
        SpringApplication.run(EurekaMain7002Application.class, args);
    }
}

```

接着依次启动这两个家伙

看看7001

![image-20220103220849634](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103220849634.png)

他之中有一个链接指向7002

再去看看7002

![image-20220103220915532](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103220915532.png)

他之中也有个链接指向7001

这样就搭建好了

当然 感觉这样不好看的可以自己手动修改下电脑的hosts

将127.0.0.1 指向 www.eureka-7001.com 另外一个同理

127.0.0.1—>www.rereka-7002.com

### 将80服务和8001服务分别注册进进群Eureka集群内

非常简单

但是 在启动这两个之前 一定要选先启动集群 不然我们的服务一定会报错

先是80，然后8001同理

```yaml {13}
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

用逗号分开即可 是不是很简单

8001

```yaml {35}
# 更该端口
server:
  port: 8001
# 开个debug
logging.level.com.Project: debug
spring:
  #  应用名称
  application:
    name: cloud-provider-payment-8001
  #  数据库相关配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456


mybatis-plus:
  #  扫mapper.xml
  mapper-locations: [ "classpath*:/mapper/**/*.xml" ]
springfox:
  documentation:
    swagger-ui:
      enabled: false
    enabled: false
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
```

接着启动

![image-20220103222059740](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103222059740.png)

7001成功注册了

接下来看看7002

![image-20220103222132429](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103222132429.png)

依旧是成功

## 支付微服务（8001）集群设置

![image-20220103222342194](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103222342194.png)

对，Java也可以集群

万物皆可集群

Java 程序集群 可不就是启动多个

所以我们全部都重8001复制过来 然后改个名字 改下yanl即可

![image-20220103223546321](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103223546321.png)

先尝试简单 弄一下 这样应不对

```yaml
# 更该端口
server:
  port: 8002
# 开个debug
logging.level.com.Project: debug
spring:
  #  应用名称
  application:
    name: cloud-provider-payment-8002
  #  数据库相关配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456


mybatis-plus:
  #  扫mapper.xml
  mapper-locations: [ "classpath*:/mapper/**/*.xml" ]
springfox:
  documentation:
    swagger-ui:
      enabled: false
    enabled: false
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



```

结果是这样的

![image-20220103223638609](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103223638609.png)

这就不对了 我们应该是要同一个名字 然后有两个微服务

所以得变动两个微服务

### 配置文件

Java程序的集群，应该是这样的：即使在不同的服务器，不同的端口上运行

服务名都应该是一样的 唯一有区别的可能只有 端口 和服务器

所以我们只需要给他们相同的应用名称 然后给予不同的端口即可 

```yaml {3,9}
# 更该端口
server:
  port: 8001
# 开个debug
logging.level.com.Project: debug
spring:
  #  应用名称
  application:
    name: cloud-provider-payment
  #  数据库相关配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456


mybatis-plus:
  #  扫mapper.xml
  mapper-locations: [ "classpath*:/mapper/**/*.xml" ]
springfox:
  documentation:
    swagger-ui:
      enabled: false
    enabled: false
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
```

接着启动看看集群

![image-20220103224040514](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103224040514.png)

好 变成两个了

也就是说 我们一个服务 可以是两个 也可以是两万个。。

### 验证微服务集群

为了验证下是否是同一个微服务上的

我在他们的查询方法上 加了一个 serverport的返回值

```java {10}
@Value("${server.port}")
private String serverPort;


@GetMapping("/query")
public ResponseResult<List<Payment>> query() {
    LambdaQueryWrapper<Payment> query = new LambdaQueryWrapper<>();
    query.eq(Payment::getId, 1);
    Map<String, Object> map = paymentService.getMap(query);
    return new ResponseResult<List<Payment>>(200, serverPort, paymentService.list());
}
```

好，现在的压力来到了我们的80

```java {5}
@RestController
@RequestMapping("/consumer")
public class OrderController {

    private static final String Payment_URL = "http://localhost:8001";

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/payment/create/{paymentName}")
    public ResponseResult<Payment> create(@PathVariable("paymentName") String paymentName) {
        return restTemplate.postForObject(Payment_URL + "/payment/create/" + paymentName, null, ResponseResult.class);
    }

    @GetMapping("/payment")
    public ResponseResult<Collection<Payment>> getPayment() {
//        注意这个 Collection 非常重要 可以预防list和map的类型转换异常
        return restTemplate.getForObject(Payment_URL + "/payment/query",
//                指定是ResponseResult<List<Payment>>类型
                ResponseResult.class
        );
    }
}

```

我们该怎么用这个微服务的地址

其实非产简单

还记得我们之前给微服务（8001 8002）设置的名称吗:`cloud-provider-payment`

我们只需要把这玩意改成全大写的再丢进去

```java {5}
@RestController
@RequestMapping("/consumer")
public class OrderController {

    private static final String Payment_URL = "http://CLOUD-PROVIDER-PAYMENT";

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/payment/create/{paymentName}")
    public ResponseResult<Payment> create(@PathVariable("paymentName") String paymentName) {
        return restTemplate.postForObject(Payment_URL + "/payment/create/" + paymentName, null, ResponseResult.class);
    }

    @GetMapping("/payment")
    public ResponseResult<Collection<Payment>> getPayment() {
//        注意这个 Collection 非常重要 可以预防list和map的类型转换异常
        return restTemplate.getForObject(Payment_URL + "/payment/query",
//                指定是ResponseResult<List<Payment>>类型
                ResponseResult.class
        );
    }
}

```

然后还要做一步：

赋予RestTemplate负载均衡的能力。。。

我也不知道为啥要这样 反正要在80的config内设置一下

说是这样加一个注解就可以让这个对象调用集群内对象就是了

```java {5}
@Configuration
public class ApplicationConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}

```

接着我们重启这玩个玩意 然后访问80的接口

因为懒 我这里用js模拟下并发请求了

```js
const axios = require("axios");
//const { randomUUID, randomInt } = require("crypto");
//let pet = "aa,18";
countOne = 0;
countTwo = 0;
errorCount = 0;
const run = () => {
    axios.get("http://localhost:80/consumer/payment").then(res => {
        if(res.data.msg==="8001"){
            countOne++;
            console.log("countOne=",countOne)
        }else{
            countTwo++;
            console.log("countTwo=",countTwo)
        }

    }).catch(err => {
        console.log(++errorCount);
    });
}
for (let i = 0; i < 1000; i++) {
    run();
}
```

![image-20220103232603375](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103232603375.png)

貌似没问题 但是JS是一个单线程语言 没有锁 所以我们用万能的Java来写一个demo

```java
@SpringBootTest
@Slf4j
class CloudConsumerOrder80ApplicationTests {


    @Autowired
    RestTemplate restTemplate;

    Integer one = 0;
    Integer two = 0;

    Lock lock = new ReentrantLock();

    public void get() {
        try {
            ResponseResult forObject = restTemplate.getForObject("http://CLOUD-PROVIDER-PAYMENT" + "/payment/query", ResponseResult.class);
            lock.lock();
            if (forObject.getMsg().equals("8001")) {
                one++;
            } else {
                synchronized (two) {
                    two++;
                }
            }
            lock.unlock();
        } catch (Exception e) {
            log.error("error:{}", e.getMessage());
        }
    }

    @Test
    public void run() throws InterruptedException {

        for (int i = 0; i < 1000; i++) {
            new Thread(() -> {
                get();
            }).start();
        }
        Thread.sleep(10000);
        log.info("one:{}", one);
        log.info("two:{}", two);
    }
    
}
```

运行结果：

![image-20220103234126276](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103234126276.png)

恩 看起来确实是轮番查询

好了，这玩意其实使用到Ribbon 这个玩意之后会说明

总之，他们两配合在一起后，我们的消费者Consumer可以直接调用服务而不用再担心端口号，而且服务还有负载均衡功能了

至于 负载均衡的轮循和按照能力来 之后会说到

## 一些额外的配置

### 主机名称和服务名称的修改

![image-20220103235322600](/images/SpringCloud/02-Eureka服务注册与发现/image-20220103235322600.png)

可改可不改

我们规范的要求一般是只有服务名 而不出现主机名称

并且这里并没有发现IP地址，以后我们的微服务肯定是要分配到不同的机子上面 端口分别是多少这样来进行操作

比方说部署到192.168.11.23:1111端口

所以 我们要想办法让他们显示出来

首先我们来自定义下显示的名称

我们就只对**8001和8002（两个莫得感情的查询微服务）**进行配置

非常简单

```yaml {36-37}
# 更该端口
server:
  port: 8002
# 开个debug
logging.level.com.Project: debug
spring:
  #  应用名称
  application:
    name: cloud-provider-payment
  #  数据库相关配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456


mybatis-plus:
  #  扫mapper.xml
  mapper-locations: [ "classpath*:/mapper/**/*.xml" ]
springfox:
  documentation:
    swagger-ui:
      enabled: false
    enabled: false
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
  instance:
    instance-id: "查询二号机"
```

另外一个同理 加一个instance-id即可

![image-20220104000029298](/images/SpringCloud/02-Eureka服务注册与发现/image-20220104000029298.png)

效果如上

然后接着是让访问连接变成IP地址（现在直接点一号机二号机你会发现进了docker.xxxx的网址）

其实也很简单 在接着上面那个操作之后 加一句

```yaml
  instance:
    instance-id: "查询二号机"
    #访问路径可以显示ip地址
    prefer-ip-address: true
```

接着通过连接点进去就是真实的IP地址了

![image-20220104000422367](/images/SpringCloud/02-Eureka服务注册与发现/image-20220104000422367.png)

## 服务发现Discovery

对于注册进Eureka里面的微服务，可以通过服务发现来获取该服务的信息

其实非常简单就能获取得到

```java
/**
     * 服务发现 Client端  注意 这玩意的包有两个 org.springframework.cloud.client.discovery.DiscoveryClient 要用这个
     */
@Resource
private DiscoveryClient discoveryClient;

@GetMapping("/discover")
public Object discover() {
    ArrayList arrayList = new ArrayList();

    //        获取服务清单列表
    List<String> services = discoveryClient.getServices();
    for (String service : services) {
        log.info("**********service: {}", service);
        arrayList.add(service);
    }
    //        根据具体的服务名称进一步地获取服务的相关信息
    List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PROVIDER-PAYMENT");
    for (ServiceInstance instance : instances) {
        log.info("**********instance: {}", instance.getHost() + ":" + instance.getPort() + ":" + instance.getUri());
        arrayList.add(instance);

    }
    return arrayList;
}
```

启动完毕这个微服务后，需要等待一段时间让他自检，不然获取不到对应的配置

我的电脑 目前开了5个服务的情况下 大概需要等待 20s左右

如果说没有下面那样的效果 可以在main中添加一个注解

```java {4}
@SpringBootApplication
@MapperScan("com.Project.mapper")
@EnableEurekaClient
@EnableDiscoveryClient
public class CloudProvider8001Application {
    public static void main(String[] args) {
        ConfigurableApplicationContext run = SpringApplication.run(CloudProvider8001Application.class, args);
    }
}

```

运行结果： 

```json
[
    // 两个服务
    "cloud-provider-payment",
    "cloud-consumer-order-80",
    // 两个CLOUD-PROVIDER-PAYMENT服务
    {
        "scheme": "http",
        "host": "192.168.31.234",
        "port": 8001,
        "metadata": {
            "management.port": "8001"
        },
        "secure": false,
        "uri": "http://192.168.31.234:8001",
        "instanceId": "查询一号机",
        "serviceId": "CLOUD-PROVIDER-PAYMENT",
        "instanceInfo": {
            "instanceId": "查询一号机",
            "app": "CLOUD-PROVIDER-PAYMENT",
            "appGroupName": null,
            "ipAddr": "192.168.31.234",
            "sid": "na",
            "homePageUrl": "http://192.168.31.234:8001/",
            "statusPageUrl": "http://192.168.31.234:8001/actuator/info",
            "healthCheckUrl": "http://192.168.31.234:8001/actuator/health",
            "secureHealthCheckUrl": null,
            "vipAddress": "cloud-provider-payment",
            "secureVipAddress": "cloud-provider-payment",
            "countryId": 1,
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            },
            "hostName": "192.168.31.234",
            "status": "UP",
            "overriddenStatus": "UNKNOWN",
            "leaseInfo": {
                "renewalIntervalInSecs": 30,
                "durationInSecs": 90,
                "registrationTimestamp": 1641226834227,
                "lastRenewalTimestamp": 1641226834227,
                "evictionTimestamp": 0,
                "serviceUpTimestamp": 1641226834227
            },
            "isCoordinatingDiscoveryServer": false,
            "metadata": {
                "management.port": "8001"
            },
            "lastUpdatedTimestamp": 1641226834227,
            "lastDirtyTimestamp": 1641226834180,
            "actionType": "ADDED",
            "asgName": null
        }
    },
    {
        "scheme": "http",
        "host": "192.168.31.234",
        "port": 8002,
        "metadata": {
            "management.port": "8002"
        },
        "secure": false,
        "uri": "http://192.168.31.234:8002",
        "instanceId": "查询二号机",
        "serviceId": "CLOUD-PROVIDER-PAYMENT",
        "instanceInfo": {
            "instanceId": "查询二号机",
            "app": "CLOUD-PROVIDER-PAYMENT",
            "appGroupName": null,
            "ipAddr": "192.168.31.234",
            "sid": "na",
            "homePageUrl": "http://192.168.31.234:8002/",
            "statusPageUrl": "http://192.168.31.234:8002/actuator/info",
            "healthCheckUrl": "http://192.168.31.234:8002/actuator/health",
            "secureHealthCheckUrl": null,
            "vipAddress": "cloud-provider-payment",
            "secureVipAddress": "cloud-provider-payment",
            "countryId": 1,
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            },
            "hostName": "192.168.31.234",
            "status": "UP",
            "overriddenStatus": "UNKNOWN",
            "leaseInfo": {
                "renewalIntervalInSecs": 30,
                "durationInSecs": 90,
                "registrationTimestamp": 1641225799412,
                "lastRenewalTimestamp": 1641226910280,
                "evictionTimestamp": 0,
                "serviceUpTimestamp": 1641225799412
            },
            "isCoordinatingDiscoveryServer": false,
            "metadata": {
                "management.port": "8002"
            },
            "lastUpdatedTimestamp": 1641225799412,
            "lastDirtyTimestamp": 1641225799361,
            "actionType": "ADDED",
            "asgName": null
        }
    }
]
```

## Eureka的保护模式

![image-20220104123204598](/images/SpringCloud/02-Eureka服务注册与发现/image-20220104123204598.png)

一句话概括：某个时刻某一个微服务不可用了，Eureka不会立刻清理，依旧会对该微服务的信息进行保存

为什么会有这个玩意？

> 为了防止EurekaClient可以正常运行，但是和EurekaServer网路不通的情况下，EurekaServer**不会立刻**将Eurekaclient服务剔除

什么市自我保护模式？

> 默认情况下，如果EurekaServer在一定时间没有接收到某个微服务的心跳，Eureka将会注销实例（默认90s）
>
> 但是当网络分区故障发生（延时、卡顿、拥挤）时，微服务与EurekaServer之间无法正常通讯，以上行为将会变得非常危险了，因为微服务本身是健康的，**此时本不应该注销这个微服务**
>
> Eureka通过进入自我保护模式，来解决这个问题---当Eureka短时间内丢失过多客户端时（可能发生了网络分区故障）那么这个节点就会进入自我保护模式
>
> 这有一个比例：短时间超过85%的实例没有心跳就进入自我保护机制

![image-20220104130057168](/images/SpringCloud/02-Eureka服务注册与发现/image-20220104130057168.png)

### 禁止自我保护

服务端加几行配置

```yaml {16-20}
server:
  port: 7002
eureka:
  instance:
    #eureka服务端的实例名称
    hostname: eureka-server-7002
  client:
    # 是否要将自己注册进Eureka的服务中
    register-with-eureka: false
    # 下面这false表示自己就是服务中心，指责就是维护实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      # 设置和Eureka Server交互的地址，查询服务和注册中心服务都需要依赖这个地址
      # 集群指向其他的Eureka 单机指向自己的地址即可
      defaultZone: "http://127.0.0.1:7001/eureka/"
  server:
    # 关闭自我保护机制，保证不可用服务及时的被剔除
    enable-self-preservation: false
    # 两秒
    eviction-interval-timer-in-ms: 2000
```

接着要在我们的微服务（Client）端加几行配置

```yaml {40-43}
# 更该端口
server:
  port: 8001
# 开个debug
logging.level.com.Project: debug
spring:
  #  应用名称
  application:
    name: cloud-provider-payment
  #  数据库相关配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/cloud
    username: root
    password: 123456


mybatis-plus:
  #  扫mapper.xml
  mapper-locations: [ "classpath*:/mapper/**/*.xml" ]
springfox:
  documentation:
    swagger-ui:
      enabled: false
    enabled: false
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
  instance:
    instance-id: "查询一号机"
    #访问路径可以显示ip地址
    prefer-ip-address: true
    # Eureka客户端发送心跳的时间间隔，单位为秒（默认是30秒）
    lease-renewal-interval-in-seconds: 1
    # Eureka服务端在收到最后一次心跳后等待的时间上限，单位是秒（默认90s），超时将剔除服务
    lease-expiration-duration-in-seconds: 2
```

这样即可
