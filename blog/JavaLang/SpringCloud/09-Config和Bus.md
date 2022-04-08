---
title: 09-Config和Bus-服务配置和服务总线
date: 2022-1-8 12:10:11
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Config
- Spring Cloud Bus
- SpringCloud
---

## Config概述

Spring Cloud Config是做服务配置的，Bus则是做服务总线的，他们两都做的非常好，但奈何阿里巴巴的Nacos太过强大..几乎垄断了半壁江山

![image-20220108171346242](/images/SpringCloud/09-Config和Bus/image-20220108171346242.png)

在开始之前，我们先看看目前分布式系统中存在的问题

![image-20220108171543877](/images/SpringCloud/09-Config和Bus/image-20220108171543877.png)

不知不觉已经这么多了啊….

不知道你有没有注意到，我们的每个工程内都有`application.yaml`

虽然说东西并不多，但是每个都写起来非常痛苦，加啥我们现在最下面的4个module都要连接同一个数据库，那么我们没有一个统一的配置的玩意的话，这些都需要自己手动配置，非常痛苦

而且这还是4个的情况，如果是40个的话…要改40次

而且我们实际工作中，往往有一堆对应的环境，例如dev，prod，test，就需要三套配置

大厂中更多：dev、test、SIT、UAT、准生产、生产

所以SpringCloud提供了ConfigServer来解决这个问题

它使用方便，且一次配置处处生效

![image-20220108172329947](/images/SpringCloud/09-Config和Bus/image-20220108172329947.png)

![image-20220108172730837](/images/SpringCloud/09-Config和Bus/image-20220108172730837.png)

至于配置文件存放到哪里

> 由于Spring Cloud Config默认使用git来存储配置文件（也有其他方式，比如支持[SVN](https://baike.baidu.com/item/SVN/3311103?fr=aladdin)(SVN现在没啥人用了)和本地文件），但最推荐的还是用Git，而且使用的是Http/Https访问形式
>
> Git的话，国内推荐Gitee，局域网推荐GitLab
>
> PS：GitLab汉化版Docker部署看这个[链接](https://hub.docker.com/r/twang2218/gitlab-ce-zh)，不过不太推荐在自己的服务器上跑 要2G左右的内存

## 简单使用Config

### 前期准备

这里我假设你会用git了，然后我现在用的是GitLab的仓库 你也可以自己在github上新建仓库

spring-cloud-config

然后克隆到本地

![image-20220108180050474](/images/SpringCloud/09-Config和Bus/image-20220108180050474.png)

新建如上文件 并提交

```shell
git add .
git commit -m "init yml"
git push origin master
```

![image-20220108180229992](/images/SpringCloud/09-Config和Bus/image-20220108180229992.png)

我这里用的是gitlab

### 配置中心的创建

都是刚需 主要是第一个，hystrix不用也可

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-server</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        <version>2.2.10.RELEASE</version>
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

接着编辑下你的配置文件

```yaml
server:
  port: 3344
spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          # git上面的仓库地址 可以是ssh url也可以是http/https 如果使用ssh的话要先准备好公钥
          uri: http://xxxxxxx.xxxx.xxxx/xxxxx/spring-cloud-config.git
          # 搜索目录
          search-paths:
            - spring-cloud-config
          # 如果使用的是https或者ssh协议 都需要提供账号密码之类的（密码可以是token】）
          password: xxxxx
          username: xxxxx
          # 如果使用的是https，则需要加上下面这个配置
         #skip-ssl-validation: true
      # 分支
      label: master
    # Consul相关配置
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
        instance-id: 全局配置中心
#        hostname: 127.0.0.1

```

接着编辑下启动类

```java {3}
@SpringBootApplication
@EnableDiscoveryClient
@EnableConfigServer
public class ConfigCloud3344Application {
    public static void main(String[] args) {
        SpringApplication.run(ConfigCloud3344Application.class, args);
    }
}

```

注意第三行的代码不要漏了

### 配置中心使用

返回git，给config-dev.yaml添加一点内容并提交

```yaml
config:
    info: "master branch,spring-cloud-config/config-dev.yaml version=1"
```

![image-20220108190011583](/images/SpringCloud/09-Config和Bus/image-20220108190011583.png)

接着，打开浏览器，访问<http://localhost:3344/master/config-dev.yaml>

![image-20220108190055153](/images/SpringCloud/09-Config和Bus/image-20220108190055153.png)

支持的Controller

![image-20220108190113967](/images/SpringCloud/09-Config和Bus/image-20220108190113967.png)

这个格式稍微有点奇怪，但是总得来说可以分为三种，注意，只支持如下三种，也就是说我们在Git上的文件必须是中横线风格命名的方式

1. `/{label}/{applicatgion}-{profile}.yaml||yml`
   1. 这种就是典型的分支名称--配置名.yml，例如：
      - <http://localhost:3344/master/config-dev.yaml>
      - <http://localhost:3344/master/config-prod.yaml>
      - <http://localhost:3344/master/config-test.yaml>
      - 或者`/dev/xxxx-xxx.yml`也可以，不过要访问dev分支的话，需要仓库内先有dev分支
2. 第二种，通过`/{application}-{profile}.yml`进行访问（没有前缀）
   - <http://localhost:3344/config-dev.yaml>
   - <http://localhost:3344/config-prod.yaml>
   - <http://localhost:3344/config-test.yaml>
   - 它这里是使用的仓库默认分支 你仓库默认是什么分支 它就是什么内容
3. 第三种，`/{application}/{profile}[/{label}]`
   - <http://localhost:3344/config/dev/master>
   - <http://localhost:3344/config/prod/master>
   - 如果要用默认分支 可以省略下，这样写<http://localhost:3344/config/dev>
   - 返回的是Json字符串而并非是yaml
     ![image-20220108191650052](/images/SpringCloud/09-Config和Bus/image-20220108191650052.png)
   - ….就是把第一个反过来一样，这个用的比较少，因为需要手动解析

> 至此，我们成功实现了Spring Cloud Config通过GitHub获取配置信息

### 客户端的搭建-依赖

我们新建一个cloud-config-client-3355

依赖  注意 有两个额外的 一个是config的客户端  另一个待会说

```xml {3-6,8-11}
<dependencies>
    
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-bootstrap</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-consul-discovery</artifactId>
    </dependency>


    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        <version>2.2.10.RELEASE</version>
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

### 配置文件-Bootstrap.yml

为啥要这个？

application.yml是用户级的资源配置项

bootstarp.yml是系统级的，**优先级更高**

> Spring Cloud会创建一个`Bootstarp Context`作为Spring应用`Application Context`的父上下文，初始化的时候，`Bootstarp Context`负责从**外部源**加载配置属性并解析配置
>
> 这两个上下文共享一个从外部获取的`Environment`

`Bootstarp`内的属性拥有高优先级，默认情况下，他们不会被本地覆盖，`Bootstarp Context`和`Application Context`有着不同的约定，所以新增了一个`Bootstarp.yml`配置文件，保证`Bootstarp Context`和`Application Context`配置的分离

要将Client模块下的`application.yml`文件改为`bootstrap.yml`这是很关键的

因为bootstrap.yml是比application.yml先加载，所以优先于高于application

bootstrap > extension > application

我们要使用它，必须要确保这个依赖装上了，不然启动的时候百分之一万会报错( spring cloud2020之前的版本不需要)

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```

接着配置

```yaml
# bootstrap.yml
server:
  port: 3355
spring:
  application:
    name: config-client
  cloud:
    # Config客户端的配置
    config:
      # 分支名称
      label: dev
      # 配置文件名称
      name: config
      # 读取后缀名称
      profile: dev
      # 配置中心地址
      uri: http://localhost:3344
      # 综上所述，dev分支上config-dev.yaml配置文件将被读取：http://localhost:3344/dev/config-dev.yaml

    #consul的配置
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
        instance-id: 微服务提供者
```

### 编写启动类、controller并测试

我们编写一个常规的启动类即可

```java
@SpringBootApplication
@EnableDiscoveryClient
public class CloudClient3355Application {
    public static void main(String[] args) {
        SpringApplication.run(CloudClient3355Application.class, args);
    }
}
```

然后在编写一个controller

```java {4-5}
@RestController
public class ConfigClientController {
    
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo() {
        return configInfo;
    }
}
```

注意 这里注入了我们git上之前配置的内容

![image-20220108215121638](/images/SpringCloud/09-Config和Bus/image-20220108215121638.png)

dev分支 访问的应该是这句话

接下来启动3344和3355 注意启动顺序

![image-20220108215221391](/images/SpringCloud/09-Config和Bus/image-20220108215221391.png)

然后我们访问下3355的这个接口

![image-20220108215245821](/images/SpringCloud/09-Config和Bus/image-20220108215245821.png)

看来没问题，这样说明我们切换分支之类的都是可以的

那动态更新呢？

![image-20220108215335793](/images/SpringCloud/09-Config和Bus/image-20220108215335793.png)

我提交了下

然后访问

![image-20220108215355430](/images/SpringCloud/09-Config和Bus/image-20220108215355430.png)

但是我访问3344，却显示的是正常的内容

![image-20220108215605239](/images/SpringCloud/09-Config和Bus/image-20220108215605239.png)

我接着重启了3355，才能获取到修改后的内容

![image-20220108215443902](/images/SpringCloud/09-Config和Bus/image-20220108215443902.png)

我们现在遇到的问题就是

![image-20220108215454549](/images/SpringCloud/09-Config和Bus/image-20220108215454549.png)

### 手动实现动态更新

为了解决之前遇到的问题，我们应该去定时或者说在啥情况下要刷新下配置

我们首先要保证3355（微服务提供方）保证有如下依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

接下来修改下`bootstrap.yml`，添加一些内容

```yaml {27-32}
server:
  port: 3355
spring:
  application:
    name: config-client
  cloud:
    # Config客户端的配置
    config:
      # 分支名称
      label: dev
      # 配置文件名称
      name: config
      # 读取后缀名称
      profile: dev
      # 配置中心地址
      uri: http://localhost:3344
      # 综上所述，master分支上config-dev.yaml配置文件将被读取：http://localhost:3344/master/config-dev.yaml

    #consul的配置
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
        instance-id: 微服务提供者

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

接下来在我们的业务类上添加一个新的注解@RefreshScope，原理不清楚，反正通过它可以动态刷新我们的内容

```java
@RestController
@RefreshScope
public class ConfigClientController {
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo() {
        return configInfo;
    }

}
```

接下来我先修改下git上面的内容

![image-20220108221335357](/images/SpringCloud/09-Config和Bus/image-20220108221335357.png)

然后启动 并访问

![image-20220108221355017](/images/SpringCloud/09-Config和Bus/image-20220108221355017.png)

获取是没问题，那么我修改下呢？

```yaml
config:
    info: "version=888888"
```

接着访问 发现依旧还是原来的内容

![image-20220108221454309](/images/SpringCloud/09-Config和Bus/image-20220108221454309.png)

其实这里并没有问题 还记得我们之前暴露了监控端点吗，没错，就是要通过那个玩意来手动刷新…

我们要`POST`请求`http://localhost:3355/actuator/refresh`这个地址，才能实现刷新

接下来测试下

![image-20220108221626341](/images/SpringCloud/09-Config和Bus/image-20220108221626341.png)

再次访问

![image-20220108221636942](/images/SpringCloud/09-Config和Bus/image-20220108221636942.png)

新内容就出来了

但是这样。。。。会不会太麻烦了，那如果有上百台客户端，运维人员是不是要发送100次不同的请求？

虽然说可以通过写一个sh脚本来每分钟轮循发送，但是这样我们不更新的话不就是造成了性能浪费吗？

![image-20220108222037135](/images/SpringCloud/09-Config和Bus/image-20220108222037135.png)

所以就得用到另外的东西来解决这个问题

## Bus概述

我们现在是想实现一个自动的、动态的刷新功能，然后Spring Cloud Bus可以配合Config来实现动态刷新的功能

Bus支持RabbitMq和Kafuka

Spring Cloud Bus配合Spring Cloud Config使用可以实现配置动态刷新

![image-20220108222704984](/images/SpringCloud/09-Config和Bus/image-20220108222704984.png)

![image-20220108222837482](/images/SpringCloud/09-Config和Bus/image-20220108222837482.png)



![image-20220108222934588](/images/SpringCloud/09-Config和Bus/image-20220108222934588.png)

	### 配置RabbitMQ环境

我们先启动一个rabbitmq

```shell
docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmqSpringCloud -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=aaaabbbbcccceeeddfj1113433 rabbitmq:management
```

这里配置了账号密码 你可以自由的修改

接着访问15672

![image-20220108224139699](/images/SpringCloud/09-Config和Bus/image-20220108224139699.png)



注意这个版本：RabbitMQ 3.9.11，待会依赖不要安装错了

接下来我们整一份3366 功能和3355一致

![image-20220108224929613](/images/SpringCloud/09-Config和Bus/image-20220108224929613.png)

PS：当只有一个配置文件的时候，**据说**叫application或者bootstrap都可以，不过保险起见，涉及到总线操作的建议统一命名为bootstrap.yml更好

### 刷新的两种方式

我们有两种方式可以刷新客户端

1. 通过消息总线触发一个客户端的`/bus/refresh`，而刷新所有客户端的配置
   ![image-20220108225807785](/images/SpringCloud/09-Config和Bus/image-20220108225807785.png)
2. 利用消息总线触发一个服务端ConfigServer的`/bus/refesh`端点，而刷新所有客户顿的配置
   ![image-20220108225832255](/images/SpringCloud/09-Config和Bus/image-20220108225832255.png)

一般情况下来说，都是直通知Server端，为啥是它呢？

因为客户端打破了微服务的指责单一性，因为微服务本身是业务模块，它本不应该承当刷新配置的指责

并且还破坏了微服务各个节点的对等性、还有一定的局限性：例如：微服务正在迁移时，它的网络地址通常会发生变化，此时如果想要做到自动刷新，就要增加更多的客户端

### 服务总线依赖添加

我们先在服务端（3344）添加RabbitMq的bus，完成服务总线的支持

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
```

添加了这个依赖，就相当于同时添加了Spring Cloud Bus 和Spring Boot AMQP

接着3355 3366 也添加这个依赖

### 修改配置文件

首先是服务端3344需要修改 需要增加一些

```yaml {30-35,41-46}
# 3344 application
server:
  port: 3344
spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          # git上面的仓库地址 可以是ssh url也可以是http/https
          uri: http://111.111.111.111:3000/amayakite/spring-cloud-config.git
          # 搜索目录
          search-paths:
            - spring-cloud-config
          # 如果使用的是https或者ssh协议 都需要提供账号密码之类的（密码可以是token】）
          password: MRRf47ncEdGcAfS
          username: amayakite
          # 如果使用的是https，则需要加上下面这个配置
         #skip-ssl-validation: true
      # 分支
      label: dev
    # Consul相关配置
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
        instance-id: 全局配置中心
  # rabbitMQ 的相关配置
  rabbitmq:
    port: 5672
    host: 你的服务器
    username: admin
    password: aaaabbbbcccceeeddfj1113433

#        hostname: 127.0.0.1
logging.level.com.Project: debug

# rabbitmq相关配置，暴露bus刷新配置的端点
management:
  endpoints:
    web:
      exposure:
        # bus-refresh 是actuator的刷新操作
        include: "bus-refresh"

```

接着是3355 3366 这两个只需要添加rabbitmq的依赖即可

```yaml {26-31}
server:
  port: 3355
spring:
  application:
    name: config-client
  cloud:
    # Config客户端的配置
    config:
      # 分支名称
      label: dev
      # 配置文件名称
      name: config
      # 读取后缀名称
      profile: dev
      # 配置中心地址
      uri: http://localhost:3344
      # 综上所述，master分支上config-dev.yaml配置文件将被读取：http://localhost:3344/master/config-dev.yaml

    #consul的配置
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
        instance-id: 微服务提供者1
  # rabbitMQ 的相关配置
  rabbitmq:
    port: 5672
    host: 你的服务器
    username: admin
    password: aaaabbbbcccceeeddfj1113433

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

### 启动并测试

对，没错，只要配置了就完了

为了方便区分，我这里给3355和3366的Controller添加上端口号

```java
@RestController
@RefreshScope
public class ConfigClientController {
    @Value("${server.port}")
    private String serverPort;

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo() {
        return "serverPort: " + serverPort + "\t\n\n configInfo: " + configInfo;
    }

}
```

接着开启三个服务开始测试

![image-20220108232415761](/images/SpringCloud/09-Config和Bus/image-20220108232415761.png)

3355第一次访问

![image-20220108232423863](/images/SpringCloud/09-Config和Bus/image-20220108232423863.png)

3366第一次访问

![image-20220108232434128](/images/SpringCloud/09-Config和Bus/image-20220108232434128.png)

接着修改下数据

![image-20220108232507071](/images/SpringCloud/09-Config和Bus/image-20220108232507071.png)

这时候我们只需要刷下3344`http://localhost:3344/actuator/busrefresh`

（注意 旧版本的话用的是访问bus-refresh来刷新，但新旧版本配置都是同一个，具体的可以看服务-Actuator-映射中的路径）

![image-20220108234237871](/images/SpringCloud/09-Config和Bus/image-20220108234237871.png)

![image-20220108232712902](/images/SpringCloud/09-Config和Bus/image-20220108232712902.png)

然后访问另外两位

![image-20220108232730938](/images/SpringCloud/09-Config和Bus/image-20220108232730938.png)

![image-20220108232735432](/images/SpringCloud/09-Config和Bus/image-20220108232735432.png)



![image-20220108234341945](/images/SpringCloud/09-Config和Bus/image-20220108234341945.png)

如果你感觉这样麻烦的话，实际工作环境内，可以写个git actions脚本 一旦发现提交立马触发脚本自动发送post请求

### Bus动态刷新-定点通知

上面我们已经配置完了自动的全局广播

那么现在问题来了，我如果只想通知其中一个，而不是通知全部刷新，也就是要精确通知，减少资源开销

其实实现比较简单

只需要POST请求`http://localhost:配置中心的端口号/actuator/busrefresh/{destination}`

`destination`：这个Rest风格的参数指定要更新配置的服务或实例

注意：旧版本中，请求路径的`busrefresh`要替换成`bus-refresh`（应该是2020之前的版本都是这样）

比方说我现在只想要通知3355，它在服务中心注册的服务名称是config-client，那么我只需使用服务名称+端口即可精准通知

使用：`curl -X POST http://localhost:3344/actuator/busrefresh/config-client:3355`

发送之前修改的内容

![image-20220108235416183](/images/SpringCloud/09-Config和Bus/image-20220108235416183.png)

发送之后，3305访问

![image-20220108235429862](/images/SpringCloud/09-Config和Bus/image-20220108235429862.png)

3360访问，还是之前的内容

![image-20220108235440607](/images/SpringCloud/09-Config和Bus/image-20220108235440607.png)

当然 也可以不指定端口号 让该类的所有服务都刷新（一般也是这样用的）

更新内容

![image-20220108235530802](/images/SpringCloud/09-Config和Bus/image-20220108235530802.png)

发送请求：`curl -X POST http://localhost:3344/actuator/busrefresh/config-client`

3355

![image-20220108235552600](/images/SpringCloud/09-Config和Bus/image-20220108235552600.png)

3366

![image-20220108235602407](/images/SpringCloud/09-Config和Bus/image-20220108235602407.png)

### 总线总结

一张图概括

![image-20220108235856681](/images/SpringCloud/09-Config和Bus/image-20220108235856681.png)



