---
title: 12-Nacos服务注册和配置中心
date: 2022-1-10 14:25:10
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Alibaba
- Nacos
- SpringCloud
---

## 概述

见名知意

首先是服务注册，我们首先想到的就是Eureka、Zookeeper、Consul

其次是配置中心，我们想到了Spring Cloud Config和Spring Cloud Bus

它就是来替代如上六位的

> Nacos（Naming Configuration Service）
>
> 一个更易于构建云原生应用的动态服务发现、配置管理和服务平台
>
> Nacos就是注册中心+配置中心的组合，Nacos等价于Consul+Config+Bus
>
> ![image-20220110142942130](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110142942130-16417961842531.png)
>
> 官网<https://nacos.io/zh-cn/index.html>

## 安装和运行Nacos

这里只演示Windows，Linux同理，Docker可以去看[官方文档](https://nacos.io/zh-cn/docs/quick-start.html)部署

先去下载下对应的压缩包<https://github.com/alibaba/nacos/releases>

注意，需要事先准备好Jdk1.8+和Maven3.2+

下载解压后可以得到这些

![image-20220110144423601](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110144423601.png)

启动很简单，进入到bin

```shell
startup.cmd -m standalone
```

standalone代表着单机模式运行，非集群模式

看到这样就表示成功了

![image-20220110144828637](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110144828637.png)

接着访问<http://localhost:8848/nacos>

就能看到如下内容

![image-20220110144954427](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110144954427.png)

**默认的账号密码都是`nacos`，直接登陆即可**

登陆后可以看到如下页面

![image-20220110145113196](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110145113196.png)

我React亮了，说明这玩意是一个React前端Project，应该是用了阿里自家的Ant Design For React框架

IEDA插件alibaba  cloud toolkit 目前看很多人说可以装 不过我也不知道有啥用 先不装了

## 服务提供者注册

### 父pom依赖准备

参照官方文档<https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html>

为了防止我眼花，我这里新建一个Project

根据官网，我这里要现在父工程添加上依赖，依赖是在[github](https://github.com/alibaba/spring-cloud-alibaba)上面看

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.7.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

切记 一定要在github上看到的依赖 才是最新的 spring那不是最新的.,

**并且上面这样还不行**，官文内这样说：

> 项目版本号为xxx形式，其中x为数字，从0开始，不限于0~9范围。项目处于孵化器阶段时，版本号为0.xx
>
> 由于 Spring Boot 1 和 Spring Boot 2 的接口和注解在 Actuator 模块中发生了很大的变化，而 spring-cloud-commons 从 1.xx 到 2.0.0 也发生了很大的变化，我们采用相同的版本规则为SpringBoot 版本号。
>
> - 1.5.x 用于 Spring Boot 1.5.x
> - 2.0.x 用于 Spring Boot 2.0.x
> - 2.1.x 用于 Spring Boot 2.1.x
> - 2.2.x 用于 Spring Boot 2.2.x
> - 2020.x 用于 Spring Boot 2.4.x
> - 所以我现在用的2.5.8的springboot应该用2021.x 为了防止万一就用2021.1吧
>
> 然后我看了下官方[wiki](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)的版本推荐，草太乱了，我还是用这上面的SPring文档来整
>
> 反正最终我的那玩意版本是2021.1

最终root pom：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>31-cloud-alibaba</artifactId>
    <packaging>pom</packaging>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>cloud-alibaba-provider-payment-9001</module>
    </modules>


    <!--    统一管理Jar包版本-->
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <spring.cloud-version>2020.0.5</spring.cloud-version>
        <spring.boot.version>2.5.8</spring.boot.version>
        <spring.boot.alibaba.version>2021.1</spring.boot.alibaba.version>
        <mysql.version>8.0.27</mysql.version>
        <druid-spring-boot-starter.version>1.2.8</druid-spring-boot-starter.version>
        <junit.version>5.8.2</junit.version>
        <mybatis.plus.version>3.4.3.4</mybatis.plus.version>
        <lombok.version>1.18.22</lombok.version>
        <springfox-swagger.version>3.0.0</springfox-swagger.version>
    </properties>


    <!--    引入依赖dependencyManagement 是锁定版本 让子工程不用写groupId和version -->
    <dependencyManagement>
        <dependencies>
            <!--            spring boot 版本控制-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>${spring.boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!--            spring cloud 版本控制-->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring.cloud-version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>${spring.boot.alibaba.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid-spring-boot-starter</artifactId>
                <version>${druid-spring-boot-starter.version}</version>
            </dependency>
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-boot-starter</artifactId>
                <version>${mybatis.plus.version}</version>
            </dependency>
            <!--junit-->
            <dependency>
                <groupId>org.junit.jupiter</groupId>
                <artifactId>junit-jupiter</artifactId>
                <version>${junit.version}</version>
                <scope>test</scope>
            </dependency>
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </dependency>
            <dependency>
                <groupId>io.springfox</groupId>
                <artifactId>springfox-boot-starter</artifactId>
                <version>${springfox-swagger.version}</version>
            </dependency>
        </dependencies>


    </dependencyManagement>

</project>
```

### 子项目9001搭建

好了，接下来创建`cloud-alibaba-provider-payment-9001`，添加如下依赖

```xml
<dependencies>

    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
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

然后配置下配置文件

```yaml
server:
  port: 9001
spring:
  application:
    name: nacos-payment-provider
  cloud:
    # 配置nacos
    nacos:
      discovery:
        server-addr: localhost:8848
        username: nacos
        password: nacos
# 暴露监控端口
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

接着一个main

```java
@SpringBootApplication
@EnableDiscoveryClient
public class CloudNacos9001Application {
    public static void main(String[] args) {
        SpringApplication.run(CloudNacos9001Application.class, args);
    }
}

```

再来一个controller

```java
@RestController
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id) {
        return "nacos registry, serverPort: " + serverPort + "\t id" + id;
    }

}
```

好了，接下来我们启动这个module，然后进入nacos看看

为了方便之后查看，我给nacos添加一个host

```ini
127.0.0.1 mynacos.com
```

可以看到，服务成功注册

![image-20220110164428972](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110164428972.png)

接下来访问下

![image-20220110164535145](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110164535145.png)

### 服务提供者9002的快速构建

我们这里再建立一个9002来模拟负载均衡

这里我就懒得多弄一个9002了

首先，我们打开idea

在服务这里（如果你的9001启动不是在服务而是在运行那里的话）

![image-20220110165319308](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110165319308.png)

点进去，搜spring 找到 spring boot 添加即可

![image-20220110165346610](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110165346610.png)

然后右键它

![image-20220110165411157](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110165411157.png)

然后这样配置

![image-20220110170010504](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110170010504.png)

接着你就能得到两个微服务 注意 **这不能在生产环境中使用！！！**

当然 你也可以选择也可以用`-Dspring.profiles.active=`，也就是配置`spring.profiles.active`的方式来动态切换，下面会说

![image-20220110170028078](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110170028078.png)

在Nacos中也能看到

![image-20220110170102206](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110170102206.png)

接下来换一种方式吧，使用profile 更方便的我们自定义内容

我们先创建两个application

![image-20220110171451266](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110171451266.png)

9001和9002

9001的内容

```yaml
server:
  port: 9001
```

9002同理

接着在application.yaml中添加内容

```yaml {14-15}
server:
  port: 9001
spring:
  application:
    name: nacos-payment-provider
  cloud:
    # 配置nacos
    nacos:
      discovery:
        server-addr: localhost:8848
        username: nacos
        password: nacos
  # 默认使用9001内的相关配置 这些配置会覆盖application.yaml内的
  profiles:
    active: 9001
# 暴露监控端口
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

当然第一二行看不顺眼的话可以删了

接着运行 然后依旧是复制一份 改下vm配置

![image-20220110171710633](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110171710633.png)

然后就可以了

![image-20220110171719292](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110171719292.png)

你就能得到两个

运行起来效果也是跟之前一样的，一般这样使用的比较多，因为通过profile的方式我们可以更加自由的自定义一些其他东西

nacos内正常显示

![image-20220110171819338](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110171819338.png)

### 服务消费者80

我们新建一个module：`cloud-alibaba-consumer-payment-80`

依赖

```xml
<dependencies>

    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
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

接着，写下配置文件

```yaml
server:
  port: 80
spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: mynacos.com:8848

# 这里是等下要调用的（Controller中的链接）
service-url:
  nacos-user-service: http://nacos-payment-provider
```

然后创建main

```java
@EnableDiscoveryClient
@SpringBootApplication
public class Consumer80Application {
    public static void main(String[] args) {
        SpringApplication.run(Consumer80Application.class, args);
    }
}
```

接着注册下restTemplate

```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    @ConditionalOnMissingBean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

}
```

然后写一个controller

```java
@RestController
public class OrderController {

    @Resource
    RestTemplate restTemplate;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping("/payment/nacos/{id}")
    public String test(@PathVariable("id") Integer id) {
        return restTemplate.getForObject(serverURL + "/payment/nacos/" + id, String.class);
    }

}

```

接着访问即可

![image-20220110182348674](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110182348674.png)

![image-20220110182355351](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110182355351.png)

### 负载均衡遇到的坑

md这个坑 困扰了我十多分钟

如果你用的是较新版本的`spring-cloud-starter-alibaba-nacos-discovery`，则上面中，访问80端口的`/payment/nacos/{id}`会报错，解决方法有两种

首先我们的得知道问题在哪里，先看看nacos的依赖

![image-20220110182528922](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110182528922.png)

新版本spring-cloud-alibaba-dependencies（version 2021.1）内是没有ribbon和loadbalancer，因此无法实现负载均衡

所以我们现在有两个解决方案

1. 添加loadbalancer的依赖（Spring现在对ribbon不再支持也不推荐用了 可以用但是配置起来比较麻烦），添加完就可以正常的负载均衡

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-loadbalancer</artifactId>
   </dependency>
   ```

2. 添加OpenFegin和loadbalancer，因为OpenFegin是不带负载均衡的，所以也要手动装依赖

   1. 添加依赖

      ```xml
      <dependency>
          <groupId>org.springframework.cloud</groupId>
          <artifactId>spring-cloud-starter-openfeign</artifactId>
      </dependency>
      
      <dependency>
          <groupId>org.springframework.cloud</groupId>
          <artifactId>spring-cloud-loadbalancer</artifactId>
      </dependency>
      
      ```
   
   2. 注册service
   
      ```java
      @Service
      @FeignClient("nacos-payment-provider")
      public interface PaymentFeignService {
          @GetMapping("/payment/nacos/{id}")
          public String test(@PathVariable("id") Integer id);
      }
      
      ```
   
   3. 调用
   
      ```java
      @RestController
      public class OrderController {
      
          @Autowired
          PaymentFeignService paymentFeignService;
      
          @GetMapping("/payment/nacos/{id}")
          public String test(@PathVariable("id") Integer id) {
              return paymentFeignService.test(id);
          }
      
      }
      ```

## Nacos服务中心对比提升

| 组件名    | 语言 | CAP   | 服务健康检查 | 对外暴露接口            | Spring Cloud集成 |
| --------- | ---- | ----- | ------------ | ----------------------- | ---------------- |
| Eureka    | Java | AP    | 可配支持     | HTTP，有web界面         | 已集成           |
| Consul    | Go   | CP    | 支持         | HTTP/DNS，有web界面     | 已集成           |
| Zookeeper | Java | CP    | 支持         | 客户端                  | 已集成           |
| Nacos     | Java | AP/CP | 支持         | HTTP/DNS/UDP，有Web界面 | 已集成           |

![image-20220110204438870](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110204438870.png)

如何选择是AP还是CP？

- 如果不需要存储服务级别的信息且服务实例时通过nacos-client注册， 并能够保持上报心跳，那么就可以选择AP模式，当前主流的Spring Cloud 和 Dubbo都适用于AP模式，AP模式为了服务的可能性而削减了一致性，因此AP模式只支持注册临时实例
- 如果需要在服务级别编辑或存储配置信息，那么CP是必须，K8s服务和DNS服务则适用于CP模式，CP模式下则支持注册持久化实例，此时则是以Raft协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误

如何切换？

默认是AP，执行如下命令可以切换到CP 不过我们通常情况下没必要切换

```shell
curl -X PUT '$NACOS_SERVER:8848/nacos/v1/ns/operator/switches?entry=serverMode&value=CP'
```



## Nacos作为配置中心-基础配置

没错，这玩意还能拿来做配置中心的

### 依赖准备

我们首先创建一个cloud-alibaba-config-nacos-client-3377

然后填入如下依赖

```xml
<dependencies>
    <!--        Nacos Config-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    </dependency>
    <!--        Nacos-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    <!--        Spring CLoud Bootstrap 用于支持配置文件的优先加载 这个老版本不用（2.x.x）,新版本（2021.x，2020.x）开始都需要-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-bootstrap</artifactId>
    </dependency>

    <!--        Web + Actuator-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <!--        LomBok-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### 配置文件和对应类

我们要准备两个配置文件

![image-20220110210905360](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110210905360.png)

这也是他们设计的时候考虑到的事情，目的就是为了让Config和Nacos之间的迁移变得更加简单

Spring 2.4以后需要加入spring-cloud-starter-bootstrap依赖

bootstrap

```yaml
server:
  port: 3377
spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        # 连接服务中心
        server-addr: mynacos.com:8848
        username: nacos
        password: nacos
      config:
        # 连接配置中心
          #Nacos作为配置中心的地址
        server-addr: mynacos.com:8848
          # 指定yaml格式的配置文件
        file-extension: yaml
```

application

```yaml
spring:
  profiles:
    # 表示开发环境
    active: dev
```

启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class NacosConfig3377Application {
    public static void main(String[] args) {
        SpringApplication.run(NacosConfig3377Application.class, args);
    }
}
```

controller

```java
package com.Project.controller;

import org.springframework.beans.factory.annotation.Value;
// 注意是这个 别导错了
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * RefreshScope 支持Nacos的动态刷新功能 这个是SpringCLoud的原生注解 Nacos对齐做了兼容
 */
@RestController
@RefreshScope
public class ConfigClientController {

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }

}
```

### 编辑启动配置

我们参考官方文档<https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html>

里面是这样说的

> 在 Nacos Spring Cloud 中，`dataId` 的完整格式如下：
>
> ```plain
> ${prefix}-${spring.profiles.active}.${file-extension}
> ```
>
> - `prefix` 默认为 `spring.application.name` 的值，也可以通过配置项 `spring.cloud.nacos.config.prefix`来配置。
> - `spring.profiles.active` 即为当前环境对应的 profile，详情可以参考 [Spring Boot文档](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html#boot-features-profiles)。 **注意：当 `spring.profiles.active` 为空时，对应的连接符 `-` 也将不存在，dataId 的拼接格式变成 `${prefix}.${file-extension}`**
> - `file-exetension` 为配置内容的数据格式，可以通过配置项 `spring.cloud.nacos.config.file-extension` 来配置。目前只支持 `properties` 和 `yaml` 类型。
>
> 通过 Spring Cloud 原生注解 `@RefreshScope` 实现配置自动更新：

也就是说，我们配置的应用名称就为前缀，我们配置的spring.profiles.active就是中间的东西，我们之前设置的yaml就是后缀

所以说我们的3344实际上的对应的是`nacos-config-client-dev.yaml`

最后的公式为

```md
${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
```

接下来，我们进入那nacos的网页，进行设置

![image-20220110213603115](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110213603115.png)

然后新增，填入我们刚刚推断出来的内容，并选择格式

![image-20220110214104213](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214104213.png)



接着可以得到这个 注意 这里的那啥ID的名字结尾**必须**是`yaml`，不能是`yml`（因为我们之前在file-extension内定义的是yaml，所以必须是这个，**如果说你之前定义的是yml，则这里必须为yml**）

![image-20220110214518643](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214518643.png)



然后启动项目，尝试run一下

![image-20220110214121163](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214121163.png)

看起来没有问题了，接下来尝试下更新后能不能访问到最新的

```yaml
config:
    info: "Hello 这里是Dev的配置文件啊啊啊啊"
```

![image-20220110214236341](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214236341.png)

我曹 不用重启，同步更新

总结：

![image-20220110214449502](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214449502.png)

### 如果无法正常的获取到配置中心的内容

如果说你这样无法获取配置中心的内容的话(读取的时候不报错，但是最终读取出来的是null或者空白)

```java {2}
@RestController
@RefreshScope
public class ConfigClientController {

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }

}
```

加上一个字段即可

```java
@RestController
@RefreshScope(proxyMode = ScopedProxyMode.DEFAULT)
public class ConfigClientController {

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }

}
```





## Nacos作为配置中心-分类配置

### 概念引出

实际上我们开发中通常会准备

> dev开发环境
>
> test测试环境
>
> prod生产环境

如何保证指定环境启动时服务能正确读取到Nacos上对应环境的配置文件呢？

或者说

> 一个大型分布式微服务系统会有很多微服务子项目
>
> 每个微服务项目又都会有相应的开发环境、测试环境、预发环境、正式环境….
>
> 那么怎么对这些微服务配置进行管理呢？

我们之前在配置文件的时候，有一个东西并没有说

![image-20220110221116379](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110221116379.png)

这个GROUP

我们只需要对这个东西进行配置，即可完成分类配置

在这之前，我们首先要了解下命名空间

![image-20220110221240152](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110221240152.png)

在Nacos中，有三大块，分别是Namespace+Group+DATAID，其中DATAID我们之前已经用过了，Group刚刚也提到了，Namespace嘛，这个如果你接触过C# 或者C++之类的，应该对齐不陌生

就相当于是Java中的包

- Namespace===>Java的package
- Group===>Java的类
- DataID====>类中的属性

Group和DataID是拿来逻辑上区分两个目标对象的

他们三者的关系如下

![image-20220110221551421](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110221551421.png)

默认的情况下：

- Namespace=`public`
- Group=`DEFAULT_GROUP`
- Cluster=`DEFAULT`

接下来具体说说

- Nacos默认的命名空间是public，命名空间这玩意主要是用来实现隔离
  - 比方说我们现在有个三个环境：开发、测试、生产环境，我们就可以创建三个namespace，不同的namespace之间是隔离的
- Group默认是`DEFAULT_GROUP`，这玩意可以把不同的微服务划分到一个分组里面去（就像之前的Stream那样，把几个相同类型的微服务统一指定分组）
- Service就是微服务
  - 一个Service可以包含多个Cluster（集群），Nacos的Cluster默认是Default，Cluster是对指定的微服务的一个虚拟划分
  - 比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，这个时候就可以给杭州机房的Service微服务起一个集群名称（HZ），给广州机房的service微服务起一个集群名称（GZ），还可以尽量让同一个机房的微服务互相调用，以提升性能
- 最后的instance，就是微服务的实例

具体的可以看看官方文档<https://www.yuque.com/nacos/ebook/ynstox>，超级详细

### DataID的方案

三步

1. 指定spring.profile.active和配置文件的DataID来使不同环境下读取不同的配置，这个也是最常用的
2. 默认空间+默认分组+新建dev和test两个DataID
3. 通过spring.profile.active属性就能进行多环境下配置文件的读取

接下来开始

```yaml
# dev
config:
    info: "这里是dev的配置nacos-config-client-dev.yaml"

# test
config:
    info: "这里是test的配置nacos-config-client-test.yaml"
```

![image-20220110222837191](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110222837191.png)

接下来使用，我们只需要去修本地项目中对应的application内的值即可

```yaml
spring:
  profiles:
    # 表示开发环境
    active: dev
```

当然 这样比较麻烦

我选择IDEA中的附加vm

![image-20220110223037564](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110223037564.png)

在vm选项中输入如下内容

```md
-Dspring.profiles.active=test
```

也就是这样

![image-20220110223152016](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110223152016.png)

接着启动并访问，就能得到

```http
GET http://localhost:3377/config/info

HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8
Content-Length: 51
Date: Mon, 10 Jan 2022 14:32:12 GMT
Keep-Alive: timeout=60
Connection: keep-alive

这里是test的配置nacos-config-client-test.yaml

Response code: 200; Time: 97ms; Content length: 39 bytes
```

### Group方案

根据我们之前的了解，可以知道，是有一个默认的group---`DEFAULT_GROUP`，所以我们的实现理论上需要三步

1. 新建group
2. 在nacos中配置对应group内的DataID
3. 然后再到bootstrap和application配置文件内进行修改

其实非常简单，我们只需要在新建配置的时候手动输入即可

![image-20220110224301586](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224301586.png)

```yaml
config:
    info: "这里是来自DEV_GROUP内的nacos-config-client-info.yaml"
```



创建完毕后，多了一个Group

![image-20220110224316269](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224316269.png)

我们再来一个

![image-20220110224512764](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224512764-16418259138501.png)

最终得到了两个不同的组

![image-20220110224539709](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224539709.png)

他们现在我们有两个dataid一样的，但是group不一样的配置文件

接下来的修改非常简单

首先在bootstrap内增加一条group的配置

`spring.cloud.nacos.config.group=组名`

```yaml {20}
server:
  port: 3377
spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        # 连接服务中心
        server-addr: mynacos.com:8848
        username: nacos
        password: nacos
      config:
        # 连接配置中心
          #Nacos作为配置中心的地址
        server-addr: mynacos.com:8848
          # 指定yaml格式的配置文件
        file-extension: yaml
        # 指定组
        group: DEV_GROUP
```

然后别忘了修改下application，让其的active指向我们刚刚创建的info

```yaml
spring:
  profiles:
    active: info
```

接下来启动测试

![image-20220110224913873](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224913873.png)

dev的获取到了，接下来修改下vm选项然后重启试试

```md
-Dspring.cloud.nacos.config.group=TEST_GROUP
```

![image-20220110225015785](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225015785.png)

成功获取

总结：

![image-20220110225042704](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225042704.png)

### Namespace方案

1. 新建对应的namespace
2. 按照域名配置填写

我们新建命名空间非常简单，只需要

![image-20220110225801344](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225801344.png)

第一个ID通常让其自动生成即可，接着如法炮制一个test

![image-20220110225844405](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225844405.png)

接着回到配置管理

![image-20220110225859430](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225859430.png)

可以看得到多出了我们刚刚创建的

![image-20220110225913120](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225913120.png)

点进去啥也没有我们现在开始给dev和test添加配置吧

```yaml
config:
    info: "这里是dev命名空间的nacos-config-client-info.yaml"

# 分割
config:
    info: "这里是test命名空间的nacos-config-client-info.yaml"
```

![image-20220110230053271](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110230053271.png)

我现在的命名空间是这样的

| 命名空间名称     | 命名空间ID                           | 配置数 |
| :--------------- | :----------------------------------- | :----- |
| public(保留空间) |                                      | 4      |
| dev              | 4699fa93-f7ec-404c-b2d5-d520b20d3972 | 1      |
| test             | e0649097-a3bd-4e60-a40c-3d9161fd63cc | 1      |

接着返回我们的boostrap，添加如下配置

```yaml {19-20}
server:
  port: 3377
spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        # 连接服务中心
        server-addr: mynacos.com:8848
        username: nacos
        password: nacos
      config:
        # 连接配置中心
          #Nacos作为配置中心的地址
        server-addr: mynacos.com:8848
          # 指定yaml格式的配置文件
        file-extension: yaml
        # 这里的namespace是配置中心的namespace的id
        namespace: 4699fa93-f7ec-404c-b2d5-d520b20d3972
        #group: DEV_GROUP  如果有需要的话 group也可以填上
```

配置的路径为：`spring.cloud.nacos.config.namespace=命名空间ID`

接着启动（如果之前配置过vm记得删了）

测试

![image-20220110230619129](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110230619129.png)

切换成Test:

```md
-Dspring.cloud.nacos.config.namespace=你的Test命名空间ID
```

测试：

![image-20220110230736784](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110230736784.png)

注意 一般情况下 都是三者一块使用，而不是像我这些案例一样配合着使用

### 总结分类配置

```properties
# 分DataId
spring.profiles.active=test
# 分组
spring.cloud.nacos.config.group=TEST_GROUP
# 分命名空间
pring.cloud.nacos.config.namespace=test
```

## ✨Nacos集群和持久化

这是从Spring cloud开始的第一个✨标，足以证明重要程度

实际开发中，如果要用上Nacos，最少要三台

参考文档<https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html>

首先是一张图和三句话

![deployDnsVipMode.jpg](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/deployDnsVipMode-16418282349783.jpg)

`http://ip1:port/openAPI` 直连ip模式，机器挂则需要修改ip才可以使用。

`http://SLB:port/openAPI` 挂载SLB模式(内网SLB，不可暴露到公网，以免带来安全风险)，直连SLB即可，下面挂server真实ip，可读性不好。

`http://nacos.com:port/openAPI` 域名 + SLB模式(内网SLB，不可暴露到公网，以免带来安全风险)，可读性好，而且换ip方便，推荐模式

这里的SLB(Server Load Balancer 是不是瞬间明白了)之前写的是VIP(virtual ip，虚拟IP)

也就是，通过nginx之类的工具反代，打到负载均衡

并且还需要配置**数据库**

所以我们最终的样子应该是

![image-20220110232922725](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110232922725.png)

到了这里 你可能会有疑问 那之前nacos用的是啥来存储数据

我们看看nacos的文件

![image-20220110233202948](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110233202948.png)

conf里有好几个sql文件…啊这说明它有一个内嵌式的数据库derby（非常小巧，有点像是sqllite）

在它的[GitHub仓库](https://github.com/alibaba/nacos/blob/develop/pom.xml)内的Pom文件中可以看到如下内容

```xml
<!-- JDBC libs -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql-connector-java.version}</version>
</dependency>

<dependency>
    <groupId>org.apache.derby</groupId>
    <artifactId>derby</artifactId>
    <version>${derby.version}</version>
</dependency>
<!--接着看看版本-->
<mysql-connector-java.version>8.0.21</mysql-connector-java.version>
<derby.version>10.14.2.0</derby.version>
```

数据库5.7 nacos 1.4.1  需要在密码用户上加上.0在不报错

而且在官方文档中，可以发现，目前我们只能给他mysql数据库

### 持久化的数据库配置

首先，我们打开nacos的conf文件夹

![image-20220110234759443](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110234759443.png)

把这个sql文件执行

命令行方式

```shell
mysql -u账号 -p密码
# 然后要先创建一个数据库 名字是固定的
create database nacos_config;
use nacos_config;
source 路径xxxx文件.sql;
```

![image-20220110235523555](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110235523555.png)

最终的表结构应该是：

```sql
show tables;
# 结果：
+------------------------+
| Tables_in_nacos_config |
+------------------------+
| config_info            |
| config_info_aggr       |
| config_info_beta       |
| config_info_tag        |
| config_tags_relation   |
| group_capacity         |
| his_config_info        |
| permissions            |
| roles                  |
| tenant_capacity        |
| tenant_info            |
| users                  |
+------------------------+
12 rows in set (0.04 sec)
```

接着，我们打开conf下的这个配置文件

![image-20220110235817256](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220110235817256-16418302993504.png)

按照文档的要求，配置如下内容

```properties
#*************** Config Module Related Configurations ***************#
### If use MySQL as datasource:
spring.datasource.platform=mysql

### Count of DB: 这个和上面的是固定的
db.num=1

### Connect URL of DB: 这里你自由发挥 后面的那啥路径不要动 就动ip和端口和数据库 database一定要选择刚刚通过脚本创建的哪个
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=nacos
db.password.0=nacos
```

我的最终配置

```properties
spring.datasource.platform=mysql

db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=root
db.password.0=123456
```

接着我们重启nacos

```shell
./shutdown.cmd
./startup.cmd -m standalone
```

之前我们配置过的信息如下

![image-20220111000418726](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111000418726.png)

重启后

![image-20220111000718543](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111000718543.png)

全都没了，说明我们配置数据库成功了

如果说你想要自定义数据库版本的话：

1. 去下载一个mysql-connector-java-你想要的版本.jar
2. 放在nacos\plugins\mysql目录下
3. 例如5.7
4. mysql8.0+后面加上时区serverTimezone=UTC 不加百分百报错

接着我们随便新建一个Data项，名为`aaa.yaml`，再去看看数据库

![image-20220111001121547](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111001121547.png)

内容就是content

### 集群搭建-下载nacos

我们要搭建集群，需要准备

- 一个Nginx
- 最少要三个Nacos注册中心
- 一个Mysql

> 下载解压nacos

首先，到Github上面下载<https://github.com/alibaba/nacos/releases>对应的包

然后如果你没有安装java或者maven的话

```shell
# 安装java
# OpenJDK
sudo apt-get update
sudo apt-get install openjdk-8-jdk
java --version

# oracle Java JDK
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
java --version


# 安装maven
# 一键安装
sudo apt-get install maven
# 查看安装路径
whereis maven
# 配置文件默认在/etc/maven内
cd /etc/maven

# 手动安装
wget https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.8.4/binaries/apache-maven-3.8.4-bin.tar.gz -O "maven.tar.gz"
tar zxvf maven.tar.gz
# 然后cd进去 进入到conf修改内容 修改内容看下面
# 修改完毕后：

# 移动到固定目录（可选）
mkdir /usr/local/maven
sudo mv apache-maven-3.8.4 /usr/local/maven/

# 配置环境变量，让path能够找到maven的可执行文件   注意 只对当前用户生效
echo "MAVEN_HOME=/usr/local/maven" >> ~/.bashrc
echo "PATH=\${PATH}:\${MAVEN_HOME}/bin" >> ~/.bashrc
echo "export PATH" >> ~/.bashrc
source ~/.bashrc

# 检查maven是否安装成功
mvn -v
```

修改maven配置

```xml
# 切换仓库下载路径
 <localRepository>/你想要的路径</localRepository>
# 换源
<mirrors>
    <mirror>
        <id>aliyunmaven</id>
        <mirrorOf>*</mirrorOf>
        <name>阿里云公共仓库</name>
        <url>https://maven.aliyun.com/repository/public</url>
    </mirror>
</mirrors>

# 设置Java版本 可选
<profiles>
    <profile>
        <id>jdk-1.8</id>
        <activation>
            <activeByDefault>true</activeByDefault>
            <jdk>1.8</jdk>
        </activation>
        <properties>
            <maven.compiler.source>1.8</maven.compiler.source>
            <maven.compiler.target>1.8</maven.compiler.target>
            <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
        </properties>
    </profile>
</profiles>
```

然后下载maven

我这里看到的最新是2.0.3

```bash
# 下载
wget https://github.91chi.fun//https://github.com//alibaba/nacos/releases/download/2.0.3/nacos-server-2.0.3.tar.gz -O "nacos.tar.gz"
# 解压
tar -zvxf nacos.tar.gz
cd nacos/
ll
```

结果：

```md
总用量 44
drwxrwxr-x 5 root root  4096 1月  11 13:55 ./
drwxr-xr-x 4 root root  4096 1月  11 13:55 ../
drwxrwxr-x 2 root root  4096 1月  11 13:55 bin/
drwxr-xr-x 2 root root  4096 7月  27 14:18 conf/
-rw-r--r-- 1 root root 16583 3月  18  2021 LICENSE
-rw-r--r-- 1 root root  1305 5月  14  2020 NOTICE
drwxrwxr-x 2 root root  4096 1月  11 13:55 target/
```

### 集群搭建-配置nacos

注意：用nacos2以上的，貌似就用不了这个模拟集群的方法了，老实复制3个nacos文件夹再逐个启动

注意：用nacos2以上的，貌似就用不了这个模拟集群的方法了，老实复制3个nacos文件夹再逐个启动

注意：用nacos2以上的，貌似就用不了这个模拟集群的方法了，老实复制3个nacos文件夹再逐个启动



我们先把bin内的原始启动文件备份一下

```bash
cd nacos/bin
cp startup.sh startup.sh.bk
```

![image-20220111140117497](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111140117497.png)

在修改之前，我们首先要把sql之类的配置好

```sql
create database nacos_config;
# 然后通过source 或者第三方软件 把conf目录下的nacos-mysql.sql导入并运行 或者直接复制sql脚本粘贴即可
```

然后修改下application.properties，末尾添加如下内容，适配mysql

注意，这里有一个天坑：如果你的mysql是通过docker部署的，则一定要写容器在docker内的ip

![image-20220111155538577](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111155538577.png)

不然百分百报错，md这个错找了我半个小时

```properties
spring.datasource.platform=mysql

db.num=1
db.url.0=jdbc:mysql://127.17.0.3:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=root
db.password.0=123456
```

然后我们要在confi的这个文件内配置集群

![image-20220111142148661](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111142148661.png)

先复制下

```bash
cp cluster.conf.example cluster.conf
cat cluster.conf
# 结果:

#
# Copyright 1999-2018 Alibaba Group Holding Ltd.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
#it is ip
#example
192.168.16.101:8847
192.168.16.102
192.168.16.103
```

emm看着配置很简单

配置之前 一定要看看自己网卡

```bash
hostname -I
# 注意 是大写的I，我这里的结果是：
# 10.0.4.6 172.38.0.1 172.17.0.1 172.18.0.1 172.19.0.1 172.20.0.1
# 这上面随便用哪个都可以 绝对不能用localhost或者127.0.0.1

```

我的最终配置

```properties
10.0.4.6:14561
10.0.4.6:14562
10.0.4.6:14563
```

接下来我们修改startup脚本，让其能启动不同的端口，**我们希望传递不同的端口号传递不同的实例**

例如：`startup -p 1111`

```shell {49,62-64,86-92,141}
cygwin=false
darwin=false
os400=false
case "`uname`" in
CYGWIN*) cygwin=true;;
Darwin*) darwin=true;;
OS400*) os400=true;;
esac
error_exit ()
{
    echo "ERROR: $1 !!"
    exit 1
}
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=$HOME/jdk/java
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=/usr/java
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=/opt/taobao/java
[ ! -e "$JAVA_HOME/bin/java" ] && unset JAVA_HOME

if [ -z "$JAVA_HOME" ]; then
  if $darwin; then

    if [ -x '/usr/libexec/java_home' ] ; then
      export JAVA_HOME=`/usr/libexec/java_home`

    elif [ -d "/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home" ]; then
      export JAVA_HOME="/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home"
    fi
  else
    JAVA_PATH=`dirname $(readlink -f $(which javac))`
    if [ "x$JAVA_PATH" != "x" ]; then
      export JAVA_HOME=`dirname $JAVA_PATH 2>/dev/null`
    fi
  fi
  if [ -z "$JAVA_HOME" ]; then
        error_exit "Please set the JAVA_HOME variable in your environment, We need java(x64)! jdk8 or later is better!"
  fi
fi

export SERVER="nacos-server"
export MODE="cluster"
export FUNCTION_MODE="all"
export MEMBER_LIST=""
export EMBEDDED_STORAGE=""
# 新版本这里有个p了 我们换成别的来指定
# 原先：while getopts ":m:f:s:c:p:" opt
# 现在 1. 定义变量
export SERVER_PORT=""
# 第二 添加属性 获取分支
while getopts ":m:f:s:c:p:r:" opt
do
    case $opt in
        m)
            MODE=$OPTARG;;
        f)
            FUNCTION_MODE=$OPTARG;;
        s)
            SERVER=$OPTARG;;
        c)
            MEMBER_LIST=$OPTARG;;
        p)
            EMBEDDED_STORAGE=$OPTARG;;
        # 这里添加一个分支
        r)  
        	SERVER_PORT=$OPTARG;;
        ?)
        echo "Unknown parameter"
        exit 1;;
    esac
done

export JAVA_HOME
export JAVA="$JAVA_HOME/bin/java"
export BASE_DIR=`cd $(dirname $0)/..; pwd`
export CUSTOM_SEARCH_LOCATIONS=file:${BASE_DIR}/conf/

#===========================================================================================
# JVM Configuration
#===========================================================================================
if [[ "${MODE}" == "standalone" ]]; then
    JAVA_OPT="${JAVA_OPT} -Xms512m -Xmx512m -Xmn256m"
    JAVA_OPT="${JAVA_OPT} -Dnacos.standalone=true"
else
    if [[ "${EMBEDDED_STORAGE}" == "embedded" ]]; then
        JAVA_OPT="${JAVA_OPT} -DembeddedStorage=true"
    fi
    # 如果是单机跑集群一定要修改下这玩意 不然你的服务器扛不住...
    # 原本：JAVA_OPT="${JAVA_OPT} -server -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
   # -Xmx3550m：设置JVM最大可用内存为3550M。
	#-Xms3550m：设置JVM促使内存为3550m。此值可以设置与-Xmx相同，以避免每次垃圾回收完成后JVM重新分配内存。
	#-Xmn2g：设置年轻代大小
	#-Xss128k：设置每个线程的堆栈大小。
    JAVA_OPT="${JAVA_OPT} -server -Xms512m -Xmx512m -Xmn256m"
    JAVA_OPT="${JAVA_OPT} -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=${BASE_DIR}/logs/java_heapdump.hprof"
    JAVA_OPT="${JAVA_OPT} -XX:-UseLargePages"
fi



if [[ "${FUNCTION_MODE}" == "config" ]]; then
    JAVA_OPT="${JAVA_OPT} -Dnacos.functionMode=config"
elif [[ "${FUNCTION_MODE}" == "naming" ]]; then
    JAVA_OPT="${JAVA_OPT} -Dnacos.functionMode=naming"
fi

JAVA_OPT="${JAVA_OPT} -Dnacos.member.list=${MEMBER_LIST}"

JAVA_MAJOR_VERSION=$($JAVA -version 2>&1 | sed -E -n 's/.* version "([0-9]*).*$/\1/p')
if [[ "$JAVA_MAJOR_VERSION" -ge "9" ]] ; then
  JAVA_OPT="${JAVA_OPT} -Xlog:gc*:file=${BASE_DIR}/logs/nacos_gc.log:time,tags:filecount=10,filesize=102400"
else
  JAVA_OPT_EXT_FIX="-Djava.ext.dirs=${JAVA_HOME}/jre/lib/ext:${JAVA_HOME}/lib/ext"
  JAVA_OPT="${JAVA_OPT} -Xloggc:${BASE_DIR}/logs/nacos_gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M"
fi

JAVA_OPT="${JAVA_OPT} -Dloader.path=${BASE_DIR}/plugins/health,${BASE_DIR}/plugins/cmdb"
JAVA_OPT="${JAVA_OPT} -Dnacos.home=${BASE_DIR}"
JAVA_OPT="${JAVA_OPT} -jar ${BASE_DIR}/target/${SERVER}.jar"
JAVA_OPT="${JAVA_OPT} ${JAVA_OPT_EXT}"
JAVA_OPT="${JAVA_OPT} --spring.config.additional-location=${CUSTOM_SEARCH_LOCATIONS}"
JAVA_OPT="${JAVA_OPT} --logging.config=${BASE_DIR}/conf/nacos-logback.xml"
JAVA_OPT="${JAVA_OPT} --server.max-http-header-size=524288"

if [ ! -d "${BASE_DIR}/logs" ]; then
  mkdir ${BASE_DIR}/logs
fi

echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}"

if [[ "${MODE}" == "standalone" ]]; then
    echo "nacos is starting with standalone"
else
    echo "nacos is starting with cluster"
fi

# check the start.out log output file
if [ ! -f "${BASE_DIR}/logs/start.out" ]; then
  touch "${BASE_DIR}/logs/start.out"
fi
# start 启动的时候额外增加serverport
echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}" > ${BASE_DIR}/logs/start.out 2>&1 &
nohup "$JAVA" -Dserver.port=${SERVER_PORT} "$JAVA_OPT_EXT_FIX" ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
echo "nacos is starting，you can check the ${BASE_DIR}/logs/start.out"
```

我们接下来只需要

```bash
./startup.sh -r 14561
./startup.sh -r 14562
./startup.sh -r 14563
```

运行一个后 看到这玩意表示成功

```md
这里省略一堆东西
nacos is starting with cluster
nacos is starting，you can check the /home/root/javatest/nacos/logs/start.out
172.17.0.1
```

启动完毕后 输入` ps aux`

![image-20220111151648492](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111151648492.png)

。。。。md反正我这里第一个启动成功，二三个全部失败，算了，单击还是Docker吧

### Docker-集群搭建

参考官方文档即可<https://github.com/nacos-group/nacos-docker/blob/master/README_ZH.md>

步骤：

```bash
git clone --depth 1 https://github.com/nacos-group/nacos-docker.git
cd nacos-docker
tree
```

结果：

```md
.
├── build
│   ├── bin
│   │   └── docker-startup.sh
│   ├── conf
│   │   └── application.properties
│   ├── Dockerfile
│   └── Dockerfile.Slim
├── changlog
# 这里是对应的环境变量配置文件
├── env
│   ├── mysql.env #mysql配置文件
│   ├── nacos-embedded.env
│   ├── nacos-hostname.env
│   ├── nacos-ip.env  #下面的对应的配置文件
│   └── nacos-standlone-mysql.env
# 这里是启动文件 默认的sql账号密码是nacos，nacos也是这个 可以在上面那里配置
├── example
│   ├── cluster-embedded.yaml
│   ├── cluster-hostname.yaml # 用这个即可 这里可以修改下mysql的版本为8+ 看习惯
│   ├── cluster-ip.yaml
│   ├── standalone-derby.yaml
│   ├── standalone-mysql-5.7.yaml
│   └── standalone-mysql-8.yaml
├── README.md
└── README_ZH.md
```

### Nginx配置

我们之前已经搭建好了nacos，接下来用nginx来配置吧

注意 这里用了网卡 如果你没有用的话 后续的端口应该是127.17.0.1:8848~8850这样

我这里的是8435 你可以改成你喜欢的

```shell
docker run -d --network example_nacos_net -p 8435:80 --name nginx_nacos nginx
```

然后修改这个文件

![image-20220111164417136](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111164417136.png)

配置如下内容即可

```nginx
upstream cluster {
    server 172.16.238.10:8848;
    server 172.16.238.11:8848;
    server 172.16.238.12:8848;
}

server {
    listen 80;
    listen [::]:80;
    server_name localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        proxy_pass http://cluster;
        root /usr/share/nginx/html;
        index index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }


}


```

然后重启nginx即可

访问后，如果你不是通过端口转发来访问服务器 需要第一时间修改下nacos的密码（或者在创建集群的时候就要修改）

### 连接集群的Nacos

```yaml {10-11}
server:
  port: 9001
spring:
  application:
    name: nacos-payment-provider
  cloud:
    # 配置nacos
    nacos:
      discovery:
      # 这里填写你集群的地址即可(Nginx地址)
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

效果：

![image-20220111191959811](/images/Java/SpringCloud/12-Nacos服务注册和配置中心/image-20220111191959811.png)



### 集群搭建总结

非常简单，首先是`/conf`下的cluster.conf写入对应的ip和端口（开多少台就写多少个）

然后再到application.properties中开启数据库

然后通过nginx反代配置来实现负载均衡

然后客户端连接的话直接连nginx即可









