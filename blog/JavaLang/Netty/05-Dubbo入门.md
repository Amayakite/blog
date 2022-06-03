---
title: 05-Dubbo入门
date: 2022-5-22 14:33:44
category: Netty
tag:
- Dubbo
---

## 概述

这里直接引用官网的话语

> **Apache Dubbo 是一款微服务框架，为大规模微服务实践提供高性能 RPC 通信、流量治理、可观测性等解决方案，**
> **涵盖 Java、Golang 等多种语言 SDK 实现。**
>
> Dubbo3 已被阿里巴巴、饿了么、钉钉、工商银行、小米等在生产环境广泛采用

总而言之，就是一套微服务的RPC调度解决方案

这里会简单的使用Dubbo以及说明一些Dubbo的新特性和在golang中调用java服务

## 快速开始

### 两个服务的准备

这里先创建两个简简单单的SpringBoot项目，分别是consumer和provider

![image-20220522153343401](/images/Netty/05-Dubbo入门/image-20220522153343401.png)

然后provider是8080，另外一个是8081，provider的controller和service如下，application正常的写

```java
//user controller
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
//        突然就不太想用@Autowired，所以直接构造函数了
        this.userService = userService;
    }


    @GetMapping("/user")
    public String getUser() {
        return userService.getUserName();
    }

}

```

service

```java
// user service
@Service
public class UserService {

    public String getUserName() {
        return System.getProperty("user.name");
    }
}

```

然后是consumer

application

```java
@SpringBootApplication
public class ConsumerApplication {

    // 来个rest template
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }
}
```

然后orderController

```java
@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @GetMapping("/order")
    public String getOrder() {
        return orderService.getOrder();
    }

}

```

以及service，service是调用了8080的东西

```java
@Service
public class OrderService {
    @Resource
    RestTemplate restTemplate;


    public String getOrder() {
        String result = restTemplate.getForObject("http://localhost:8080/user", String.class);
        return result + "====OrderService";

    }
}
```

这个时候正常的run是完全没问题的，接下来将它改造成Dubbo

### Dubbo的安装和配置

要使用dubbo，我们想给之前的两个模块都加上下方依赖

```xml
<!--        本体-->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-spring-boot-starter</artifactId>
    <version>3.0.7</version>
</dependency>
<!--        使用的协议 还有一些其他的协议，这里先用这个 注意 这里还有个groupID是alibaba的，别用那个，依赖会冲突-->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-rpc-dubbo</artifactId>
    <version>3.0.7</version>
</dependency>
<!--        使用的注册中心，也可以使用nacos之类的-->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-registry-zookeeper</artifactId>
    <version>3.0.7</version>
</dependency>

```

然后给provider的配置中加上

```yaml
server:
  port: 8080
dubbo:
#  dubbo中的名称
  application:
    name: provider-application
    
#    当前项目提供服务的时候服务名和对应的端口
  protocol:
    name: dubbo #  这里是使用的协议
   
    port: 20880
    
#    注册中心的地址
  registry:
    address: zookeeper://127.0.0.1:2181
```

当然consumer也改改

```yaml
server:
  port: 8081

dubbo:
  #  dubbo中的名称
  application:
    name: provider-application
  
  # 因为这里不提供服务，所以不需要protocol，如果提供的话，要确保端口啥的和provider不一样
  
  #    注册中心的地址
  registry:
    address: zookeeper://127.0.0.1:2181
```

### 改造-抽离接口

要先在不同的服务间互相调用方法，按照我们之前的rpc流程，应该是有一个接口的，所以将userService的接口抽离出来

PS：Dubbo的RPC是方法互调

首先把接口抽离出到common模块中

![image-20220522162003908](/images/Netty/05-Dubbo入门/image-20220522162003908.png)

接着在provider实现类

```java {1}
@DubboService
public class UserServiceImpl  implements UserService {

    @Override
    public String getUserName() {
        return System.getProperty("user.name");
    }
}
```

注意，注解从@Service变成了@DubboService

然后修改consumer中的OrderSerivce

```java
@Service
public class OrderService {

 // 这里的DubboReference就是相当于将服务注册到这个bean上
    @DubboReference(version="1.1")
    UserService userService;


    public String getOrder() {
        // 直接调用
        String result = userService.getUserName();
        return result + "====OrderService";

    }
}
```

当然，因为已经用不到Provider的Controller了，所以可以直接删掉

![image-20220522162513134](/images/Netty/05-Dubbo入门/image-20220522162513134.png)

当然，还需要分别在provider和consumer中分别加上注解

```java {2}
@SpringBootApplication
@EnableDubbo // Provider同理
public class ConsumerApplication {


    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }
}
```

当然，还有重要的一步，因为我们是用的Zookeeper来作为注册中心，所以要

[Apache ZooKeeper](https://zookeeper.apache.org/releases.html)

下载好（随便选一个版本），然后解压启动即可(记得把config中的那个zoo_sample.cfg中的_sample删掉)

然后启动`zkServer.cmd/sh`即可

然后Zookeeper会占用8080(管理台)，所以我们的服务改下端口，provider=8001，consumer=8002

Consume在启动的时候有可能会抛出这个异常

![image-20220522165235981](/images/Netty/05-Dubbo入门/image-20220522165235981.png)

不用管，不影响使用...貌似是JDK版本太高引起的（JDK 17）

接着访问

![image-20220522165327369](/images/Netty/05-Dubbo入门/image-20220522165327369.png)

恩，远程调用完成！

## Triple协议

### 概述

官网描述如下

> 定义了全新的 RPC 通信协议 – Triple，一句话概括 Triple：它是基于 HTTP/2 上构建的 RPC 协议，完全兼容 gRPC，并在此基础上扩展出了更丰富的语义。 使用 Triple 协议，用户将获得以下能力
>
> - 更容易到适配网关、Mesh架构，Triple 协议让 Dubbo 更方便的与各种网关、Sidecar 组件配合工作。
> - 多语言友好，推荐配合 Protobuf 使用 Triple 协议，使用 IDL 定义服务，使用 Protobuf 编码业务数据。
> - 流式通信支持。Triple 协议支持 Request Stream、Response Stream、Bi-direction Stream
>
> > GRPC：基于Google Protobuf来进行远程调用

### 入门使用

要使用这个协议，只需要

```xml {7-12}
<!--        本体-->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-spring-boot-starter</artifactId>
    <version>3.0.7</version>
</dependency>
<!--        使用的协议-->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-rpc-dubbo</artifactId>
    <version>3.0.7</version>
</dependency>

<!-- 添加triple协议依赖，上面的dubbo不要删，貌似底层要用上 -->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-rpc-triple</artifactId>
    <version>3.0.7</version>
</dependency>

<!--        使用的注册中心-->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-registry-zookeeper</artifactId>
    <version>3.0.7</version>
</dependency>
```

接着，在provider和consumer的application.yml中将协议改变成这样

```yaml {11}
server:
  port: 8001
dubbo:
#  dubbo中的名称
  application:
    name: provider-application

#    当前项目提供服务的时候服务名和对应的端口
  protocol:
#   before：  name: dubbo
    name: tri
    port: 20880
#    注册中的地址
  registry:
    address: zookeeper://127.0.0.1:2181
```

对，只需要这样即可，不需要其他操作

然后东西也是正常调用

![image-20220522173802103](/images/Netty/05-Dubbo入门/image-20220522173802103.png)

### Triple协议的几种调用方法

主要有如下几种

> UNARY

这个就是我们正常的调用方法

```java
@DubboService(version = "1.1")
public class UserServiceImpl  implements UserService {

    @Override
    public String getUserName() {
        return System.getProperty("user.name");
    }
}


//调用：
@Service
public class OrderService {


    @DubboReference(version="1.1")
    UserService userService;


    public String getOrder() {
        String result = userService.getUserName();
        return result + "====OrderService";

    }
}

```

然后除此之外还有Server Stream，Client Stream以及BI Stream（这个和Client Stream一样的）

### 使用Server Stream和Client Stream的前置操作

首先需要在自己的common或者其他全部都能使用的地方加上这个依赖

```xml
<!-- 注意 这里是apache的，3.0之后一律Apache，之前一律alibaba-->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-common</artifactId>
    <version>3.0.7</version>
</dependency>
```

### Server Stream的使用

众所周知 一个方法通常最多只能返回一次，但是通过这种流可以来达到返回多次的效果

首先我们服务端应该以这种语法来写实现的类

```java {9-19}
public interface UserService {
    /**
     * 正常调用：Unary
     *
     * @return String
     */
    String getUserName();

    /**
     * 服务端流（Server Stream） 这里也可以不写default（顺便加上了懒得删）
     * 注意 返回类型必须得是void
     * 然后一定要有一个 {@link StreamObserver<?>}的参数 这非常重要
     *
     * @param name     这个方法 原本需要的参数
     * @param response 回调参数 重要
     */
    default void sayHelloServerStream(String name, StreamObserver<String> response) {

    }
}
```

接着服务端实现这个方法（Provider）

```java {22-30}
package com.project.service;

import org.apache.catalina.User;
import org.apache.dubbo.common.stream.StreamObserver;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.stereotype.Service;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月22日15时25分43秒
 * @description DubboService的version属性，可以指定版本号，默认为空
 */
@DubboService(version = "1.1")
public class UserServiceImpl implements UserService {

    @Override
    public String getUserName() {
        return System.getProperty("user.name");
    }

    @Override
    public void sayHelloServerStream(String name, StreamObserver<String> response) {
//        响应一次
        response.onNext("Hello~" + name);
//        再响应一次
        response.onNext("Good Bye~" + name);
//        结束响应
        response.onCompleted();
    }
}

```

然后服务端调用，这里直接用匿名内部类

```java {24-59}
package com.project.service;

import org.apache.catalina.User;
import org.apache.dubbo.common.stream.StreamObserver;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月22日15时25分43秒
 * @description TODO
 */
@Service
public class OrderService {


    @DubboReference(version = "1.1")
    UserService userService;

    /**
     *
     * @return Str
     */
    public String getOrder() {
        final StringBuilder builder = new StringBuilder();
        userService.sayHelloServerStream("张三", new StreamObserver<String>() {
            /**
             * 接收到消息的时候触发
             * @param data to process
             */
            @Override
            public void onNext(String data) {
                System.out.println("接收到了消息:" + data);
                builder.append(data);
                builder.append('\n');
            }

            /**
             * 接收到异常的时候触发
             * @param throwable error
             */
            @Override
            public void onError(Throwable throwable) {
                throw new RuntimeException(throwable);
            }

            /**
             * 完成的时候触发
             */
            @Override
            public void onCompleted() {
                System.out.println("客户端接收消息完毕");
            }
        });
        return builder.toString();
    }
}
```

然后调用的时候

![image-20220524140947079](/images/Netty/05-Dubbo入门/image-20220524140947079.png)

![image-20220524141021184](/images/Netty/05-Dubbo入门/image-20220524141021184.png)

我们本身没有任何返回值，但是内容是收到了...可能这玩意是异步的？

然后尝试在return 前加一个sleep 1s

![image-20220524141143182](/images/Netty/05-Dubbo入门/image-20220524141143182.png)

这个时候能正常接收到内容了，不过这等待有点蛋疼，感觉更适合做异步操作之类的东西

### Client Stream

这个就是用于双端即时通讯的，一般不会用在对用户接口上（就算用上了也是ws之类的情景，因为底层实际上还是异步执行的），所以也称为双端流

首先依旧是接口的书写

```java {9-18}
public interface UserService {
    /**
     * 正常调用：Unary
     *
     * @return String
     */
    String getUserName();

    /**
     * 客户端流（Client Stream / BI Stream）
     * 返回类型必须得是 {@link  StreamObserver<?>} 同时入参要和返回值一模一样
     *
     * @param response
     * @return
     */
    default StreamObserver<String> sayHelloClietnStream(StreamObserver<String> response) {
        return response;
    }


}

```

然后先写客户端(调用方)

```java
package com.project.service;

import lombok.val;
import org.apache.dubbo.common.stream.StreamObserver;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.stereotype.Service;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月22日15时25分43秒
 * @description TODO
 */
@Service
public class OrderService {


    @DubboReference(version = "1.1")
    UserService userService;

    /**
     * Unary
     *
     * @return Str
     */
    public String getOrder() {
        val resultStreamObserver = userService.sayHelloClietnStream(new StreamObserver<String>() {
            @Override
            public void onNext(String data) {
                System.out.println("客户端接收到了数据" + data);
            }

            @Override
            public void onError(Throwable throwable) {

            }

            @Override
            public void onCompleted() {
                System.out.println("client observer on close ");
            }
        });
//        这里是给服务端方发送数据
        resultStreamObserver.onNext("1");
        resultStreamObserver.onNext("2");
        resultStreamObserver.onNext("3");
        resultStreamObserver.onCompleted();


        return null;
    }


}
```

接着服务端

```java {9-30}
@DubboService(version = "1.1")
public class UserServiceImpl implements UserService {

    @Override
    public String getUserName() {
        return System.getProperty("user.name");
    }

    @Override
    public StreamObserver<String> sayHelloClietnStream(StreamObserver<String> response) {
        return new StreamObserver<String>() {
            @Override
            public void onNext(String data) {
                System.out.println("服务端接收到了数据" + data);
                response.onNext("server result:" + data);
            }

            @Override
            public void onError(Throwable throwable) {

            }

            @Override
            public void onCompleted() {
                System.out.println("server observer close ");
//                同时让客户端那边也关闭
                response.onCompleted();
            }
        };
    }
}
```

服务端结果

![image-20220524142654583](/images/Netty/05-Dubbo入门/image-20220524142654583.png)

客户端结果

![image-20220524142703912](/images/Netty/05-Dubbo入门/image-20220524142703912.png)

## 跨语言通讯-和Golang通讯

这里假设你学过了golang（附带gomod之类的），没有的话可以不看

这里ieda转了go插件，所以直接在ieda里面创建模块

![image-20220524143319226](/images/Netty/05-Dubbo入门/image-20220524143319226.png)

PS：后面试了下，貌似有点问题，我直接新建文件夹然后go mod init了

### UserService接口的双方使用-Protobuf

我们可以使用protobuf来定义接口，然后通过protobuf的编译器将接口编译为特定语言的实现

我们在src/main下面新建proto文件夹，注意 这里是和java平级的

![image-20220524212736948](/images/Netty/05-Dubbo入门/image-20220524212736948.png)

然后写入如下内容

```java
syntax = "proto3";

package api;

option go_package = "./;api";

option java_multiple_files = true;

option java_package = "com.project.service";

option java_outer_classname = "UserServiceProto";


//定义一个服务
service UserService{
//  rpc调用 getUser 需要传入的参数 和返回值
  rpc GetUser(UserRequest) returns (User){}
}

message UserRequest{
  string  uid = 1;
}
message User{
  string uid = 1;
  string username = 2;
}
```

### Java端一键编译proto文件的方式

我们在provider中加入如下内容（这里是额外加入，spring boot之类的交给父pom在管理）

这下面的都是固定写法，需要用上了直接copy即可

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>Dubbo</artifactId>
        <groupId>com.example</groupId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>provider</artifactId>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <!-- 规定proto版本 一般最新即可-->
        <protobuf.version>3.20.1</protobuf.version>
    </properties>

    <dependencies>
        <!--让在java中可以使用protobuf-->
        <dependency>
            <groupId>com.google.protobuf</groupId>
            <artifactId>protobuf-java</artifactId>
            <version>${protobuf.version}</version>
        </dependency>
    </dependencies>


    <build>
        <!--        下面这个不去掉会报错，后面的os.detected.classifier变量会用不了-->
        <extensions>
            <extension>
                <groupId>kr.motd.maven</groupId>
                <artifactId>os-maven-plugin</artifactId>
                <version>1.7.0</version>
            </extension>
        </extensions>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <!--                最新版本即可-->
                <version>3.10.1</version>
                <configuration>
                    <!--                    这里的java版本一定要是项目java版本（如果是1.8就写1.8，11就写11，17就写17）-->
                    <target>17</target>
                    <source>17</source>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.xolstice.maven.plugins</groupId>
                <artifactId>protobuf-maven-plugin</artifactId>
                <!--                最新版本即可-->
                <version>0.6.1</version>
                <configuration>
                    <!--                    这里的版本要和上面的一样 然后mvn会自动下载对应的protoc并且自动打包-->
                    <protocArtifact>com.google.protobuf:protoc:${protobuf.version}:exe:${os.detected.classifier}
                    </protocArtifact>
                    <!--                    去哪个文件夹找proto文件-->
                    <protoSourceRoot>${project.basedir}/src/main/proto</protoSourceRoot>
                    <!--                    把编译好的java文件输出在哪儿-->
                    <outputDirectory>${project.basedir}/src/main/java</outputDirectory>
                    <clearOutputDirectory>false</clearOutputDirectory>
                    <protocPlugins>
                        <!--这里是让其支持dubbo的功能-->
                        <protocPlugin>
                            <id>dubbo</id>
                            <groupId>org.apache.dubbo</groupId>
                            <artifactId>dubbo-compiler</artifactId>
                            <version>0.0.3</version>
                            <mainClass>org.apache.dubbo.gen.dubbo.Dubbo3Generator</mainClass>
                        </protocPlugin>
                    </protocPlugins>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>compile</goal>
                            <goal>test-compile</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>


</project>
```

接着点击这即可自动转换proto文件

![image-20220524213149112](/images/Netty/05-Dubbo入门/image-20220524213149112.png)

效果

![image-20220524213157156](/images/Netty/05-Dubbo入门/image-20220524213157156.png)

生成了7个文件

### Java服务端Provider的代码编写

我们这里就是直接写一个类实现UserService（由Protobuf生成的那个）然后实现下刚刚手写的getUser方法即可

```java
package com.project.service;

import org.apache.dubbo.config.annotation.DubboService;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022-05-24 21:35
 * @packageName com.project.service
 * @description Java Provider服务端
 */
@DubboService(version = "1.1")
public class UserServiceImpl implements UserService {
    @Override
    public User getUser(UserRequest request) {
        String uid = request.getUid();
//        写法还是和之前在Netty中一致的，正常newBuild和build即可
        return User.newBuilder().setUid(uid).setUsername("张三").build();
    }
}

```

### Golang端的struct生成

首先，我们把proto文件复制到go模块中的proto文件夹内，并且再新建个api文件夹方便之后存储生成的文件

![image-20220524214250276](/images/Netty/05-Dubbo入门/image-20220524214250276.png)

然后我假设你还没有在电脑上下载protoc，就去[Releases · protocolbuffers/protobuf (github.com)](https://github.com/protocolbuffers/protobuf/releases/)下载一个latest版本的（绿色的windows二进制）

然后把里面的bin中的protoc.exe拷出来添加到path环境变量中

同时go的安装之类的整好，然后在`go-consumer/proto`中打开shell，输入如下内容

```shell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct

go get -u github.com/dubbogo/tools/cmd/protoc-gen-go-triple
# 注意 这里要保证gopath中的bin添加到环境变量内
go install github.com/golang/protobuf/protoc-gen-go@latest
go install github.com/dubbogo/tools/cmd/protoc-gen-go-triple@latest

# 接着运行
protoc -I. userservice.proto --go_out=../api --go-triple_out=../api
```

然后就可以得到两个喜闻热见的超大文件了

当然 这个时候可以看得到有很多爆红的

![image-20220524215530485](/images/Netty/05-Dubbo入门/image-20220524215530485.png)

直接在这个go-consumer下的任意路径shell输入

```shell
go mod tidy
```

然后等待拉包即可

![image-20220524215638445](/images/Netty/05-Dubbo入门/image-20220524215638445.png)

可以看到，需要非常多的包...

然后在main.go(自己new一个)写入如下内容

```go
package main

import (
    "context"
    "fmt"
    "go-consumer/api"

    "dubbo.apache.org/dubbo-go/v3/common/logger"
    "dubbo.apache.org/dubbo-go/v3/config"
    _ "dubbo.apache.org/dubbo-go/v3/imports"
)

var userServiceImpl = new(api.UserServiceClientImpl)

// export DUBBO_GO_CONFIG_PATH=conf/dubbogo.yml
func main() {
    config.SetConsumerService(userServiceImpl)
    err := config.Load()
    if err != nil {
        fmt.Println("load error")
        return
    }
    logger.Info("start to test dubbo")

    req := &api.UserRequest{
        Uid: "1",
    }

    u, err := userServiceImpl.GetUser(context.Background(), req)
    if err != nil {
        logger.Error("出现异常了")
        logger.Error(err)
    }
    logger.Infof("client response result: %v\n", u)

}

```

然后运行

```shell
# 再tidy下
go mod tidy
# 指定环境变量路径
go run . -DUBBO_GO_CONFIG_PATH=conf/dubbogo.yml
```

按道理来说这一步应该就成功了，但是我这抛异常，也不知道啥情况（主要还是build的异常，算了，之后有空学学go的rpx应该就知道这是啥情况了）

![image-20220524224556075](/images/Netty/05-Dubbo入门/image-20220524224556075.png)

## 底层TODO

底层原理就像搁一边吧，准备先去过一遍Android再来耍耍Dubbo底层
