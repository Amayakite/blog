---
title: 03-Netty-GoogleProtobuf
date: 2022-5-17 22:54:39
category: Netty
tag:
- Netty
- Google ProtoBuf
---

## 概述

这里主要说明下咋在Netty中使用一个由Google开发的高性能协议 Google ProtoBuf(基于TCP)

唉，最近找工作有点难受，学历不够做啥都是硬伤..找了几个月都没公司要（2022年5月17日22:56:16），准备老老实实的再学学找找，不行的话可能真得进厂拧螺丝了

## 编码和解码的介绍

在开始之前，得先了解下这玩意

- 在编写网络应用的时候，因为数据在网络传输中都是使用的二进制字节码数据，在发送数据时就需要编码，接收数据的时候就要解码
- codec(解码器)的组成部分有两个
  - decoder解码器，负责把字节码数据转换成业务数据
  - encoder编码器，负责把业务数据转换成字节码数据

![image-20220517225915934](/images/Netty/03-Netty-GoogleProtobuf/image-20220517225915934.png)

- Netty自身提供了一些codec（解码器），例如：
  - StringEncoder，对字符串编码，StringDecoder解码
  - ObjectEncoder，对Java对象，ObjectDecoder解码
  - ……
- Netty自带的ObjectEncoder可以实现对POJO对象之类的编码解码，底层使用的是JDK序列化，这个东西本身效率并不高，存在如下问题
  - 无法跨语言
  - 序列化后的体积太大，是二进制编码的5倍多
  - 序列化性能太低

因此，这个时候就有一个完美的开源的解决方案：Google Protobuf

## Protobuf

### 基本介绍

1. 是Google发布的开源项目，全称：Google Protobuf Buffers，是一种高效的结构化数据存储格式，可以用于结构化数据的串行化，或者说序列化，他很适合做数据存储或者**RPC数据交换格式**
   - RPC-远程过程调用(remote procedure call)，Netty没有RPC是没有灵魂就像是西方没有耶路撒冷，之后学Dubbo的时候会更深刻的了解到RPC调用
2. ProtocolBuf是以**message**的方式来管理数据的
3. 支持跨平台，跨语言，目前支持绝大部分语言，例如C++，Java，C#，Python，Golang(需要额外安装解码器)，javascript……
4. 语言指南<[Language Guide (proto3)  | Protocol Buffers  | Google Developers](https://developers.google.cn/protocol-buffers/docs/proto3)>
   - 可能需要挂代理
5. 很多项目使用了它，例如Dubbo，Seata等，用它的原因是因为它对数据的极致压缩

它实际上是一个新的文件类型，同时类型和不用的语言有不同的对应（并不需要去记，有自动转换工具）

![image-20220517231048311](/images/Netty/03-Netty-GoogleProtobuf/image-20220517231048311.png)

![image-20220517231157320](/images/Netty/03-Netty-GoogleProtobuf/image-20220517231157320.png)

## Protobuf-快速入门

> 需求：
>
> 1. 客户端可以发送一个Student Pojo对象到服务器（通过protobuf）
> 2. 服务端能接收Student Pojo对象，并显示信息（通过protobuf）
> 3. 客户端分别使用java和golang来完成

### 依赖和Domain的生成

Java的依赖为

```xml
<dependency>
    <groupId>com.google.protobuf</groupId>
    <artifactId>protobuf-java</artifactId>
    <version>3.20.1</version>
</dependency>
```

然后创建文件`Student.proto`，并且确保IEDA或者Vscode中安装了`protocol Buffers`之类的插件

```protobuf
//声明协议版本号，Proto目前有2和3，通常情况下都是声明3
syntax = "proto3";
// 声明导出时候的报名（Java 其他语言差不多也是这种写法）
option java_package = "com.project.codec";
//声明导出Java时的外部类名，同时也是文件名
option java_outer_classname = "StudentEntity";
//定义message
//这里声明的Student会在StudentEntity外部类生成一个内部类Student,这就是我们真正发送的POJO对象
message Student {
  //  对应的是java中的 long StudentEntity.Student.id
  //  这里的1表示的是属性的序号，不是value
  int64 id = 1;
  string name = 2;
  int32 age = 3;
}

```

接着，我们要去它的仓库内下载好编译器

[Releases · protocolbuffers/protobuf (github.com)](https://github.com/protocolbuffers/protobuf/releases)

嘛反正下载对应系统的版本即可，这里放一个我的[下载链接](https://gh2.yanqishui.work/https://github.com/protocolbuffers/protobuf/releases/download/v21.0-rc1/protoc-21.0-rc-1-win64.zip)

![image-20220517233144250](/images/Netty/03-Netty-GoogleProtobuf/image-20220517233144250.png)

然后把bin中的内容丢到path即可（如果你用过golang的话建议是丢在gopath/bin中，方便管理些..）

接着在刚刚编写文件的位置打开shell，输入

```shell
protoc --java_out=. .\Student.proto
# 注意 out=后面有个点 是输出目录 可以替换成上级之类的 这个随意
# 当然 你可以替换成--go_out来变成go（要在proto内加上option go_package = "com.project.codec";）或者其他语言，这个随你心意
```

然后你就可以得到一个Java文件，并且它的文件头还写了一些话

![image-20220517234742730](/images/Netty/03-Netty-GoogleProtobuf/image-20220517234742730.png)

> **由协议缓冲区编译器生成。不要编辑!来源:Student.proto**
>
> 也就是说我们要用的时候直接调用它即可，**不要修改**它生成的内容

而且这实体类七八百行，md如何把一个实体类写的我看不懂系列

### 客户端

这里总的来说也是固定写法，main中加入个编码器（解码器之后可以在服务端看到），然后调用固定类的build创建对象再用

> Main

```java {31-32}
package com.project.codec;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.protobuf.ProtobufEncoder;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时49分48秒
 * @description TODO
 */
public class ProtoClient {
    public static void main(String[] args) {
        NioEventLoopGroup eventExecutors = new NioEventLoopGroup();

        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap
                    .group(eventExecutors)
                    .channel(NioSocketChannel.class)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            // 加入编码器（重要，可以让我们直接发送ProtoBuf的对象而不需要做其他操作）
                            pipeline.addLast(new ProtobufEncoder());
                            pipeline.addLast(new ProtoClientHandler());
                        }
                    });
            System.out.println("客户端准备完毕");

            ChannelFuture localhost = bootstrap.connect("localhost", 8080).sync();
            localhost.channel().closeFuture().sync();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            eventExecutors.shutdownGracefully();
        }


    }
}

```

然后是Handler

```java {24-28}
package com.project.codec;

import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日18时28分34秒
 * @description TODO
 */
public class ProtoClientHandler extends ChannelInboundHandlerAdapter {
    /**
     * 当通道准备就绪时触发该方法（和服务端连接成功时）
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("客户端已连接，ctx对象：" + ctx);
        System.out.println("服务端地址为：" + ctx.channel().remoteAddress());
        // 下面通过Message类中的newBuild()...build()来构建一个对象 固定写法
        StudentEntity.Student student = StudentEntity.Student.newBuilder().setId(1).setName("张三").setAge(18).build();
//        ctx.writeAndFlush(Unpooled.copiedBuffer(student.toByteArray()));
//        下面和上面的效果一样（应该，反正我两种都成功了）
        ctx.writeAndFlush(student);
        System.out.println("客户端发送消息成功");
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}

```

### 服务端

主要是解码器得好好设置，然后就能够正确获取对象了

```java {37-39}
package com.project.codec;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.protobuf.ProtobufDecoder;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时01分32秒
 * @description TODO
 */
public class ProtoServer {
    public static void main(String[] args) {

        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();

            serverBootstrap
                    .group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
//                            添加解码器，这里是固定写法，xxx.xxx.getDefaultInstance()即可得到实例
                            pipeline.addLast(new ProtobufDecoder(StudentEntity.Student.getDefaultInstance()));
                            pipeline.addLast(new ProtoServerHandler());
                        }
                    });

            ChannelFuture sync = serverBootstrap.bind(8080).addListener(future -> {
                if (future.isSuccess()) {
                    System.out.println("监听端口成功");
                } else {
                    System.out.println("监听端口失败");
                }
            }).sync();
            sync.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }


    }
}

```

然后是Handler，两种写法，第一种手动转换

```java
package com.project.codec;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;


/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时36分54秒
 * @description
 */
public class ProtoServerHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("服务端接收到的数据对象：" + msg);
        System.out.println("服务端接收到的数据对象的类型：" + msg.getClass());
    }


    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
// 结果：
服务端接收到的数据对象：id: 1
name: "\345\274\240\344\270\211"
age: 18

服务端接收到的数据对象的类型：class com.project.codec.StudentEntity$Student
// 上面那可以直接转换成对应的对象然后进行后续的操作了
```

当然也可以用Simple来，效果是一样的

```java
package com.project.codec;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.SimpleChannelInboundHandler;


/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时36分54秒
 * @description
 */
public class ProtoServerHandler extends SimpleChannelInboundHandler<StudentEntity.Student> {

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, StudentEntity.Student student) throws Exception {
        System.out.println("收到客户端发来的消息：" + student.toString());
//       PS: 分别打印信息 如果是上面的toString，则字符串会乱码，直接获取getName则不会
        System.out.println("name:" + student.getName());
        System.out.println("age:" + student.getAge());
        System.out.println("id:" + student.getId());
    }
}
// 效果
收到客户端发来的消息：id: 1
name: "\345\274\240\344\270\211"
age: 18

name:张三
age:18
id:1

```

## 发送不同类型的对象

首先我们要编写好一个proto文件

```protobuf
//声明协议版本号，Proto目前有2和3，通常情况下都是声明3
syntax = "proto3";
// 声明导出时候的报名（Java 其他语言差不多也是这种写法）
option java_package = "com.project.codec";
//声明导出Java时的外部类名，同时也是文件名
option java_outer_classname = "StudentEntity";

//optimize_for = SPEED ：代码优化策略，默认是SPEED，可选的还有CODE_SIZE，LITE_RUNTIME（SPEED最快）
option optimize_for = SPEED;


// ProtoBuf可以使用message管理其他的message

message  MyMessage {
  //  定义一个枚举类型 这里也可以放到外部定义（这里就相当于是定义了一个内部类一样）
  enum DataType {
    //    注意 枚举类型的话，序号是从0开始的，不是从1开始的
    StudentType = 0;
    WorkerType = 1;
  }

  //  下面的才是数据

  //  用data_type来标识传递的数据类型（哪一个枚举类型）
  DataType dataType = 1;
  //  表示每次枚举类型最多只能出现其中的一个，节省空间（也就是下面最终只会出现一个对象）
  oneof dataBody {
    //    这里写了两个，表示可以出现两种类型，Student和Worker
    Student student = 2;
    Worker worker = 3;
  }

}

message Student {
  int64 id = 1;
  string name = 2;
  int32 age = 3;
}

message Worker{
  string name = 1;
  bool sex = 2;
}
```

接着生成实体类

```shell
protoc --java_out=你项目的java目录，例如/home/aaa/ccc/src/main/java .\Student.proto
```

然后就得到了一个三千行的文件

![image-20220518214443747](/images/Netty/03-Netty-GoogleProtobuf/image-20220518214443747.png)

然后结构如下

![image-20220518214542916](/images/Netty/03-Netty-GoogleProtobuf/image-20220518214542916.png)

接着是客户端发送，只需要知道DataType是一个枚举类即可

```java
package com.project.codec;

import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import java.util.Random;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日18时28分34秒
 * @description TODO
 */
public class ProtoClientHandler extends ChannelInboundHandlerAdapter {
    /**
     * 当通道准备就绪时触发该方法（和服务端连接成功时）
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        int nextInt = new Random().nextInt(100);
        StudentEntity.MyMessage message = null;
        
        if (nextInt % 2 == 0) {
            StudentEntity.Student student = StudentEntity.Student.newBuilder().setId(1).setName("张三").setAge(20).build();
//            发送Student对象
            message = StudentEntity.MyMessage.newBuilder()
                    .setDataType(StudentEntity.MyMessage.DataType.StudentType)
                // 注意这个build，稍微有点套娃了属于
                    .setStudent(student).build();
        } else {
//            发送Worker对象
            StudentEntity.Worker worker = StudentEntity.Worker.newBuilder().setName("李四").setSex(false).build();
            message = StudentEntity.MyMessage.newBuilder()
                    .setDataType(StudentEntity.MyMessage.DataType.WorkerType)
                    .setWorker(worker).build();
        }
//        发送消息
        ctx.writeAndFlush(message);
        System.out.println("发送消息给服务端成功");
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}

```

然后是服务端，main中的`childHandler`中的解码器消息类型改下

```java
new ChannelInitializer<SocketChannel>() {
    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
        // 这里解码器使用到我们定义的MyMessage
        pipeline.addLast(new ProtobufDecoder(StudentEntity.MyMessage.getDefaultInstance()));
        pipeline.addLast(new ProtoServerHandler());
    }
}
```

然后是Handler

```java
package com.project.codec;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.SimpleChannelInboundHandler;


/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时36分54秒
 * @description
 */
public class ProtoServerHandler extends SimpleChannelInboundHandler<StudentEntity.MyMessage> {

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, StudentEntity.MyMessage message) throws Exception {
        StudentEntity.MyMessage.DataType dataType = message.getDataType();
        // 直接根据枚举类判断即可
        switch (dataType) {
            case StudentType:
                StudentEntity.Student student = message.getStudent();
                System.out.println("收到的学生信息：" + student.getName() + "," + student.getAge() + "," + student.getId());
                break;
            case WorkerType:
                StudentEntity.Worker worker = message.getWorker();
                System.out.println("收到的工人信息：" + worker.getName() + "," + worker.getSex());
                break;
            default:
                System.out.println("收到未知类型的消息");
        }
    }
}

```
