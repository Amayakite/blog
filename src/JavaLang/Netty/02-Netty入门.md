---
title: 02-Netty入门
date: 2022-5-11 14:17:07
category: Netty
tag:
- Netty
---

## 概述

首先来看看原生NIO中存在的一些问题

> 1. NIO的类库和API比较复杂（虽然说Netty也差不多），使用麻烦，需要数量掌握Selector、ServerSocketChannel、ByteBuffer等
> 2. 需要具备其他的额外技能：Java多线程、因为NIO编程涉及到Reactor模式，必须得对多线程和网络编程非常熟悉，才能写出高质量的NIO程序
> 3. 开发工作量和难度都非常大，例如客户端面临断连重连，网络闪断，半包读写，失败缓存，网络拥堵和异常流的处理等等
> 4. JAVA在NIO还是有一些BUG的，例如著名的JDK1.7中的Epoll BUG，会导致Selector空轮循

基于上述几点的情况下，Netty诞生了

官网<https://netty.io>

它支持如下的东西

![image-20220511142347578](/images/Java/Netty/02-Netty入门/image-20220511142347578.png)

PS：记住那个Google Protobuf 这个之后会用到

举几个Netty框架的实例吧：ElasticSearch和Dubbo（这个之后也会了解到）

还有一个近期比较多人start的某神游戏私服服务端的源码：[Grasscutters](https://github.com/Grasscutters/Grasscutter)，可以看到代码中也是有一堆Netty的身影

![image-20220511142730678](/images/Java/Netty/02-Netty入门/image-20220511142730678.png)

PS：目前Netty有3/4/5三个版本，5这个版本出现了重大BUG已经被官方废弃了，不建议用，通常情况下还是建议用4.x的版本

## Reactor模型说明

首先我们回顾下之前的模型

![image-20220511143541385](/images/Java/Netty/02-Netty入门/image-20220511143541385.png)

注意，这里并不是阻塞浪费资源，而是阻塞造成的CPU上下文切换占用资源

> Reactor就是一个线程可以处理多个业务
>
> Reactor的几种叫法：反应器模式、分发者模式、通知者模式

![image-20220511144115274](/images/Java/Netty/02-Netty入门/image-20220511144115274.png)

Reactor更像是一个NIO加线程池的样子，或者说就是这样设计的

![image-20220511144716957](/images/Java/Netty/02-Netty入门/image-20220511144716957.png)

所以基于Reactor出现了Reactor单线程，也就是之前的NIO使用时候的模式-一个线程处理多个请求

![image-20220511145808995](/images/Java/Netty/02-Netty入门/image-20220511145808995.png)

缺点也很明显，就是一个线程处理很多事情，如果说用户较多就直接GG了

![image-20220511150358489](/images/Java/Netty/02-Netty入门/image-20220511150358489.png)

Redis的存储就是用到的Reactor概念来实现的

再来看看单Reactor多线程

![image-20220511160642103](/images/Java/Netty/02-Netty入门/image-20220511160642103.png)

相当于是把实际的业务丢去别的线程去处理，然后主线程继续轮循并接收下对应线程的Callback然后发送给客户端，优缺点如下

![image-20220511161042540](/images/Java/Netty/02-Netty入门/image-20220511161042540.png)

接下来再来看看主从Reactor多线程，实际上就是在单Reactor多线程内做了进一步的细分

![image-20220511162608769](/images/Java/Netty/02-Netty入门/image-20220511162608769.png)

这个Java中的主从Reactor是谁提出来的呢？

是一位叫Doug  Lea的人，纽约大学的教师，java.uti.corurrent包就是出自它的手

![image-20220511162919373](/images/Java/Netty/02-Netty入门/image-20220511162919373.png)

## Netty模型说明

Netty模型主要基于主从Reactor模型，并做了进一步的改进，其中主从Reactor线程模型有多个Reactor

![image-20220511165457969](/images/Java/Netty/02-Netty入门/image-20220511165457969.png)

## Netty快速入门案例-TCP服务

需求：服务端监听8080，客户端能给服务端发送“Hello Serve！“，服务器可以回复消息”Hello Client！“

需要用的包如下（千万不要用5.x的netty，4.x的随便用）

```xml
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.1.76.Final</version>
</dependency>
```

然后创建一个服务端

```java
package com.project.simple;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时01分32秒
 * @description TODO
 */
public class TcpServer {
    public static void main(String[] args) {

//        创建bossGroup和workerGroup 这两个都是线程组
//        bossGroup只是处理连接请求，真正的IO通讯都是由workerGroup完成
//        在运行的时候，这两个group都是无限循环的
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
//        创建服务器端的启动对象
            ServerBootstrap serverBootstrap = new ServerBootstrap();

//        使用链式编程来进行设置
            serverBootstrap
                    //                绑定两个线程组
                    .group(bossGroup, workerGroup)
                    //                设置使用的channel为NioServerSocketChannel
                    .channel(NioServerSocketChannel.class)
                    //                设置线程队列等待连接的个数
                    .option(ChannelOption.SO_BACKLOG, 128)
                    //                设置连接保持活动状态
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    //                给bossGroup和workerGroup设置对应的管道处理器
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        //                    给pipeLine设置处理器
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            //                        获取pipeLine
                            ChannelPipeline pipeline = ch.pipeline();
                            //                        向pipeline的最后添加处理器
                            pipeline.addLast(new TcpServerHandler());
                        }
                    });
            System.out.println("server is ready");

//        绑定一个端口，同步等待启动成功 返回一个ChannelFuture
            ChannelFuture sync = serverBootstrap.bind(8080).sync();
            System.out.println("server is started");
//        对关闭通道进行监听
            sync.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
//        关闭两个线程组 优雅的关闭
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }


    }
}

```

TcpServerHandler内容如下

```java
package com.project.simple;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import java.nio.charset.StandardCharsets;


/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时36分54秒
 * @description 我们自定义一个Handler需要继承Netty规定好的某个HandlerAdapter类，这时我们的这个Handler才能被称为一个Handler
 */
public class TcpServerHandler extends ChannelInboundHandlerAdapter {
    /**
     * 读取实际的数据（客户端发送过来的数据）
     *
     * @param ctx 当前的上下文对象 可以通过它获取管道pipeLine对象、channel对象、eventLoop对象等
     * @param msg 就是客户端发送过来的数据，默认是Object的形式
     * @throws Exception
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("服务端接收到的数据对象：" + msg);
        System.out.println("ctx上下文对象：" + ctx);
//        将message转换成一个ByteBuf 注意 这里是一个ByteBuf(Netty的) 而不是java.nio.ByteBuffer
        ByteBuf buf = (ByteBuf) msg;
        System.out.println("服务端收到的数据为：" + buf.toString(StandardCharsets.UTF_8));
        System.out.println("客户端的地址为:" + ctx.channel().remoteAddress());
    }

    /**
     * 数据读取完毕后的处理
     *
     * @param ctx 当前的上下文对象 可以通过它获取管道pipeLine对象、channel对象、eventLoop对象等
     * @throws Exception
     */
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
//        writeAndFlush = write + flush
//        一般来说，都会对发送的数据先来一个编码
        ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!".getBytes(StandardCharsets.UTF_8)));
    }

    /**
     * 异常处理，一般来说需要在这里关闭通道
     *
     * @param ctx   上下文对象
     * @param cause 异常对象
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}

```

然后是客户端

```java
package com.project.simple;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时49分48秒
 * @description TODO
 */
public class TCPClient {
    public static void main(String[] args) {
//        客户端只需要一个事件组对象即可
        NioEventLoopGroup eventExecutors = new NioEventLoopGroup();

//        客户端的对象 注意 这里是Bootstrap对象(io.netty.bootstrap.Bootstrap;)
        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap
                    .group(eventExecutors)
                    .channel(NioSocketChannel.class)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline().addLast(new TCPClientHandler());
                        }
                    });
            System.out.println("客户端准备完毕");

//            启动客户端去连接服务器
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

以及客户端的Handler

```java
package com.project.simple;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import java.nio.charset.StandardCharsets;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日18时28分34秒
 * @description TODO
 */
public class TCPClientHandler extends ChannelInboundHandlerAdapter {
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
//        发送一条消息
        ctx.channel().writeAndFlush(Unpooled.copiedBuffer("Hello Server 我是客户端", StandardCharsets.UTF_8));
        System.out.println("客户端发送消息成功");
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        ByteBuf buf = (ByteBuf) msg;
        System.out.println("客户端收到消息：" + buf.toString(StandardCharsets.UTF_8));
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}

```

执行效果

![image-20220511183843290](/images/Java/Netty/02-Netty入门/image-20220511183843290.png)

## TaskQueue自定义任务

假设我们现在有一个东西需要耗费的时间比较长（比如要查数据库之类的），就可以提交到Worker Group的TaskQueue中去执行

![image-20220511190149296](/images/Java/Netty/02-Netty入门/image-20220511190149296.png)

### 自定义普通任务

例如服务端的handler现在是这样一个情况

```java
@Override
public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
    ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!".getBytes(StandardCharsets.UTF_8)));

    Thread.sleep(5 * 1000);
    System.out.println("Sleep 5s Over ");
    ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!222".getBytes(StandardCharsets.UTF_8)));
    System.out.println("send Message Success");


}
```

那么显而易见：客户端将会在开始收到条数据和5s后再收到条数据

就可以使用自定义普通任务来执行了

```java
@Override
public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
    ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!".getBytes(StandardCharsets.UTF_8)));

    //        通过channel获取到eventLoop对象，这是一个线程池，可以直接执行任务 所以直接传入一个Runnable对象即可
    ctx.channel().eventLoop().execute(() -> {
        try {
            Thread.sleep(5 * 1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("Sleep 5s Over ");
        ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!222".getBytes(StandardCharsets.UTF_8)));
    });
    System.out.println("send Message Success");


}
```

这样的好处是，可以降低对于资源的占用（延迟5秒也是在占用WorkerGroup的资源，不如直接丢到另一个线程池去run）服务端将不会阻塞

::: warning 注意

如果你要run多个任务，则这多个任务将会变成同步的（提交的任务之间，按照提交的顺序来一个一个的执行）

例如

```java
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!".getBytes(StandardCharsets.UTF_8)));
//        通过channel获取到eventLoop对象，这是一个线程池，可以直接执行任务 所以直接传入一个Runnable对象即可
        ctx.channel().eventLoop().execute(() -> {
            try {
                Thread.sleep(5 * 1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("Sleep 5s Over:" + (System.currentTimeMillis() / 1000));
            ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!222".getBytes(StandardCharsets.UTF_8)));
        });
        ctx.channel().eventLoop().execute(() -> {
            try {
                Thread.sleep(10 * 1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("Sleep 10s Over: " +( System.currentTimeMillis() / 1000));
            ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!333".getBytes(StandardCharsets.UTF_8)));
        });
    }
```

这里面的延迟10s的实际上是在延迟5s的结束了之后才开始执行的（内部的线程池应该始终是1，但是任务队列长度比较多）

:::

### 自定义定时任务

如果是定时任务的话，则可以解决上方同步运行的问题，使用方法如下

```java
@Override
public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
    ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client!".getBytes(StandardCharsets.UTF_8)));

    // schedule可以提交定时任务
    ctx.channel().eventLoop().schedule(() -> {
        ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client,This is a sleep 5s".getBytes(StandardCharsets.UTF_8)));
    }, 5, TimeUnit.SECONDS);

    ctx.channel().eventLoop().schedule(() -> {
        ctx.writeAndFlush(Unpooled.copiedBuffer("Hello.Client,This is a sleep 10s".getBytes(StandardCharsets.UTF_8)));
    }, 10, TimeUnit.SECONDS);

}
```

效果：

![image-20220511192753651](/images/Java/Netty/02-Netty入门/image-20220511192753651.png)

### 非当前Reactor线程调用Channel方法

例如在推送系统的业务线程里面，根据用户标识，找到对应的Channel引用，然后调用Writer类方法向该用户推送消息，就会进入到这种场景，最终的Writer会提交到任务队列后被异步消费

其实就在这段代码里

![image-20220511193623907](/images/Java/Netty/02-Netty入门/image-20220511193623907.png)

我们这里的ch是一个SocketChannel对象，所以可以在这一步的时候或者某一步验证成功的时候，将它加入到一个线程安全的Map或者存到Redis内，然后要用了就直接取出来调用writer之类的方法即可

## 异步模型-Futrue-Listener机制

如图

![image-20220511194739026](/images/Java/Netty/02-Netty入门/image-20220511194739026.png)

例子：之前的绑定端口是异步操作，当绑定操作处理完，将会调用相应的监听器处理逻辑

```java
//        绑定一个端口，同步等待启动成功 返回一个ChannelFuture
ChannelFuture sync = serverBootstrap.bind(8080).sync();
sync.addListener(future -> {
    if (future.isSuccess()) {
        System.out.println("监听端口成功");
    } else {
        System.out.println("监听端口失败");
    }
});
// PS  一般不会写在sync后面（sync是同步的，在那后面都完成了，所以success应该始终为true）正常来说是写在.sync()的前面：
ChannelFuture sync = serverBootstrap.bind(8080).addListener(future -> {
    if (future.isSuccess()) {
        System.out.println("监听端口成功");
    } else {
        System.out.println("监听端口失败");
    }
}).sync();
```

## Netty实例-Http服务

需求：

- 监听8080，浏览器可以通过<http://localhost:8080>进行访问
- 服务器可以回复消息`Hello 这里是服务器`，并对特定请求资源进行过滤

我们首先编写下基本的内容，固定写法了属于是

```java
package com.project.http;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelOption;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日19时57分20秒
 * @description TODO
 */
public class NettyHttpServer {
    public static void main(String[] args) {
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap
                    .group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 1024)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .childHandler(new HttpServerInitializer());
            ChannelFuture sync = serverBootstrap.bind(8080).sync();
            sync.channel().closeFuture().sync();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}

```

然后把init也封装

```java
package com.project.http;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpServerCodec;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月12日11时05分48秒
 * @description TODO
 */
public class HttpServerInitializer extends ChannelInitializer<SocketChannel> {
    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
//        加入netty提供的HttpServerCodec，它是netty提供的处理http请求的编解码器（可以完成编码和解码）
//        在最前面加入
        pipeline.addLast("HttpServerCodec", new HttpServerCodec());
//        加入自定义的HttpServerHandler 这种命名的方式是为了防止冲突（比如有多个的情况下）
        pipeline.addLast("MyHttpServerHandler", new HttpServerHandler());


    }
}

```

最后是Handler

```java
package com.project.http;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.*;

import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月12日11时12分45秒
 * @description SimpleChannelInboundHandler<HttpObject> 这个SimpleChannelInboundHandler相当于是给我们把需要自己转换的的对象转换好了再传递过来
 */
public class HttpServerHandler extends SimpleChannelInboundHandler<HttpObject> {

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, HttpObject msg) throws Exception {
        if (msg instanceof HttpRequest) {
//            获取请求的信息
            HttpRequest request = (HttpRequest) msg;
            System.out.println("请求方法：" + request.method());
            System.out.println("请求路径：" + request.uri());
//            如果请求的是/favicon.ico，就读取文件，并返回
            if ("/favicon.ico".equals(request.uri())) {
//                读取文件/favicon.ico
                FileInputStream fileInputStream = new FileInputStream("logo.png");
//                创建一个缓冲区
                ByteBuf byteBuf = Unpooled.buffer();
//                将文件读取到缓冲区
                byte[] bytes = new byte[1024];
                int len = 0;
                while ((len = fileInputStream.read(bytes)) != -1) {
                    byteBuf.writeBytes(bytes, 0, len);
                }
//                关闭文件
                fileInputStream.close();
//                创建一个HttpResponse对象 这里的byteBuf可以考虑缓存下，然后要用到了直接返回
                FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK, byteBuf);
//                设置响应头
                response.headers().set(HttpHeaderNames.CONTENT_TYPE, "image/png");
//                设置响应头
                response.headers().set(HttpHeaderNames.CONTENT_LENGTH, byteBuf.readableBytes());
//                发送响应
                ctx.writeAndFlush(response);
                System.out.println("响应图标完毕");
//                或者没有资源要返回的话，就直接返回一个404错误
                ctx.close();
                return;
            }

//            创建body
            ByteBuf byteBuf = Unpooled.copiedBuffer("你好，这里是服务器".getBytes(StandardCharsets.UTF_8));
//            创建相应对象：参数1：http版本号，参数2：状态码，参数3：body
            DefaultFullHttpResponse defaultFullHttpResponse = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK, byteBuf);
//            设置响应头(这里的编码是utf-8，防止乱码)
            defaultFullHttpResponse.headers().set(HttpHeaderNames.CONTENT_TYPE, "text/plain;charset=UTF-8");
//            写出响应
            ctx.writeAndFlush(defaultFullHttpResponse);
//            立刻断开连接
            ctx.close();

        }
    }
}

```

## Netty实例-群聊私聊TCP带心跳

注意 带有心跳检测（就是每隔一段时间给客户端发一次心跳，来检测客户端是不是断开连接了（因为正常情况下，只能通过读取消息或者写入消息来感知客户端是否意外掉线，来判定是否该断开连接，比如连续30s客户端没有响应 出现了连续三次 就表示客户端那边可能不在电脑前 可以断开连接））

### ServerMain

```java {35-36,42-59}
package com.project.chat.server;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.handler.timeout.IdleStateHandler;

import java.util.concurrent.TimeUnit;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月12日12时26分40秒
 * @description TODO
 */
public class ServerMain {
    public static void main(String[] args) {
//        BossGroup使用的线程数量=1
        NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);
//        workerGroup使用的线程数量=当前CPU核心数（默认）
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                 // 这个是记录日志的处理器
                    .handler(new LoggingHandler(LogLevel.INFO))
                    .option(ChannelOption.SO_BACKLOG, 1024)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            /**
                             * IdleStateHandler是一个空闲状态检测器，用于检测通道是否处于空闲状态
                             * 如果通道处于空闲状态，则触发userEventTriggered方法
                             * 参数1：读超时时间，如果超过这个时间没有数据读到，则发送一个心跳包检测是否连接，并触发下一个处理器中的userEventTriggered方法
                             * 参数2：写超时时间，如果超过这个时间没有数据写入，则发送一个心跳包检测是否连接，并触发下一个处理器中的userEventTriggered方法
                             * 参数3：读写超时时间，如果超过这个时间没有数据读写，则发送一个心跳包检测是否连接，并触发下一个处理器中的userEventTriggered方法
                             * 参数4：时间单位
                             */
                            // PS :一般情况下 这里的间隔都不会这么短 例如读30s，写不管，读写300s
                            pipeline.addLast(new IdleStateHandler(3, 5, 7, TimeUnit.SECONDS));
                            pipeline.addLast(new ServerIdleStateHandler());
//                            将字符串解码器添加到管道中
                            pipeline.addLast("decoder", new StringDecoder());
//                            将字符串编码器添加到管道中
                            pipeline.addLast("encoder", new StringEncoder());
//                            将自定义的服务器Handler添加到管道中
                            pipeline.addLast("handler", new ServerHandler());
                        }
                    });
            serverBootstrap.bind(8888).sync().channel().closeFuture().sync();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }

    }
}

```

### ServerIdleStatusHandle

```java
package com.project.chat.server;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月15日17时24分49秒
 * @description TODO
 */
public class ServerIdleStateHandler extends ChannelInboundHandlerAdapter {


    private int READ_IDLE_COUNT = 0;
    private int WRITE_IDLE_COUNT = 0;
    private int ALL_IDLE_COUNT = 0;

    private static final int MAX_COUNT = 5;

    
    // 出现了读事件表示客户端那边有响应，就可以直接清零之类的操作
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        super.channelReadComplete(ctx);
        READ_IDLE_COUNT = 0;
        WRITE_IDLE_COUNT = 0;
        ALL_IDLE_COUNT = 0;
    }

    /**
     * 对于接收到心跳包的处理
     *
     * @param ctx 上下文
     * @param evt 事件
     * @throws Exception
     */
    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
//        转换成IdleStateEvent
        IdleStateEvent event = (IdleStateEvent) evt;
        switch (event.state()) {
            case READER_IDLE:
                System.out.println("读空闲");
                READ_IDLE_COUNT++;
                break;
            case WRITER_IDLE:
                System.out.println("写空闲");
                WRITE_IDLE_COUNT++;
                break;
            case ALL_IDLE:
                System.out.println("读写空闲");
                ALL_IDLE_COUNT++;
                break;
            default:
                System.out.println("未知空闲");
                break;
        }
//        条件判断关闭连接
        if (READ_IDLE_COUNT > MAX_COUNT || WRITE_IDLE_COUNT > MAX_COUNT || ALL_IDLE_COUNT > MAX_COUNT) {
            ctx.channel().close();
            System.out.println("和客户端" + ctx.channel().remoteAddress() + "连接超时（心跳重连已达最大次数），关闭连接");
        }

    }
}

```

### ServerHandler

```java
package com.project.chat.server;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.util.concurrent.GlobalEventExecutor;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月12日12时44分08秒
 * @description TODO
 */
public class ServerHandler extends SimpleChannelInboundHandler<String> {

//    private static final ConcurrentHashMap<String, Channel> USER_MAP = new ConcurrentHashMap<>();

    /**
     * 定义一个channel组，用于管理所有的channel
     * GlobalEventExecutor.INSTANCE是一个全局的EventExecutor，它是一个单例对象
     * 这个比map或者list要好很多
     * PS :底层是个ConcurrentMap,没有线程安全问题
     */
    private static final ChannelGroup CHANNEL_GROUP = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

    /**
     * 用户的映射(这里是一个例子 只有登陆后的用户才能够存入这里，实际开发中应该丢进redis之类的地方并且和数据库关联)
     */
    private static final Map<String, Channel> USER_MAP = new ConcurrentHashMap<>();

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 当客户端连接上来时，触发该方法
     *
     * @param ctx 客户端连接上来的上下文对象
     * @throws Exception 异常
     */
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        Channel channel = ctx.channel();
//        存储到map中
        String formatStr = "[%s] 用户%s连接上了，当前在线人数：%s";
        String format = String.format(formatStr, DATE_FORMAT.format(System.currentTimeMillis()), channel.remoteAddress(), CHANNEL_GROUP.size() + 1);
        CHANNEL_GROUP.writeAndFlush(format);
//        将channel存储到map中
        CHANNEL_GROUP.add(channel);
    }

    /**
     * 当客户端断开连接时调用该方法
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        String formatStr = "[%s] 用户%s离线了，当前的在线人数：%s";
//        当这个函数执行前，会自动的将channel从channelGroup中移除
        String format = String.format(formatStr, DATE_FORMAT.format(System.currentTimeMillis()), ctx.channel().remoteAddress(), CHANNEL_GROUP.size());
        CHANNEL_GROUP.writeAndFlush(format);
//        同时将channel从map中移除
        CHANNEL_GROUP.remove(ctx.channel());
    }

    /**
     * 当客户端上线（不是连接上，而是处于活跃状态）时调用该方法
     *
     * @param ctx 客户端上线的上下文对象
     * @throws Exception 异常
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        String formatStr = "[%s] 用户%s上线了";
        String format = String.format(formatStr, DATE_FORMAT.format(System.currentTimeMillis()), ctx.channel().remoteAddress());
        System.out.println(format);
    }


    /**
     * 当客户端处于非活跃状态时调用该方法
     *
     * @param ctx 客户端下线的上下文对象
     * @throws Exception 异常
     */
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        String formatStr = "[%s] 用户%s下线了";
        String format = String.format(formatStr, DATE_FORMAT.format(System.currentTimeMillis()), ctx.channel().remoteAddress());
        System.out.println(format);
    }

    private static final String SPLIT = " ";
    private static final String PRIVATE_MESSAGE_TITLE = "@";

    private static final String LOGIN_MESSAGE_TITLE = "login";


    // 消息的处理 感觉这里还可以细化下 然后那啥丢到其他类中处理
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        if (msg.startsWith(PRIVATE_MESSAGE_TITLE)) {
            String[] split = msg.split(SPLIT);
            String toUser = split[1];
            Channel channel = USER_MAP.get(toUser);
//            发送私聊消息的时候确认下对方是否在线
            if (channel != null && channel.isActive()) {
                //            拼接content
                StringBuilder content = new StringBuilder();
                for (int i = 2; i < split.length; i++) {
                    content.append(split[i]);
                    content.append(SPLIT);
                }
                content.deleteCharAt(content.length() - 1);
                String formatStr = "[%s] 用户%s给用户你发送了私聊消息：%s";
                String format = String.format(formatStr, DATE_FORMAT.format(System.currentTimeMillis()), ctx.channel().remoteAddress(), content);
                channel.writeAndFlush(format);
                ctx.channel().writeAndFlush("私聊消息发送成功");
            } else {
                ctx.channel().writeAndFlush("对方不在线,请稍后重试");
            }
            return;
        }
        if (msg.startsWith(LOGIN_MESSAGE_TITLE)) {
            String[] split = msg.split(SPLIT);
            String userName = split[1];
            String formatStr = "[%s] 用户%s登录了";
            String format = String.format(formatStr, DATE_FORMAT.format(System.currentTimeMillis()), userName);
            CHANNEL_GROUP.writeAndFlush(format);
//            登陆
            USER_MAP.put(userName, ctx.channel());
            return;
        }

        String formatStr = "[%s]-【%s】说: %s";
        String format = String.format(formatStr, DATE_FORMAT.format(System.currentTimeMillis()), ctx.channel().remoteAddress(), msg);
//        发送给除自己外的所有人
        CHANNEL_GROUP.forEach(ch -> {
            if (ch != ctx.channel()) {
                ch.writeAndFlush(format);
            } else {
                ch.writeAndFlush("你发送了群聊消息：" + msg);
            }
        });
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        super.userEventTriggered(ctx, evt);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
//        当出现异常时，关闭连接
        ctx.close();
    }
}

```

### ClientMain

标准写法了

```java
package com.project.chat.client;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;

import java.util.Scanner;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月15日16时16分48秒
 * @description TODO
 */
public class ClientMain {

    private static String host = "127.0.0.1";
    private static int port = 8888;

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
//                            string 解码器
                            pipeline.addLast("decoder", new StringDecoder());
//                            string 编码器
                            pipeline.addLast("encoder", new StringEncoder());
//                            自定义的处理器
                            pipeline.addLast("handler", new ClientHandler());
                        }
                    });
            ChannelFuture channelFuture = bootstrap.connect(host, port).sync();
//            获取到连接的channel
            System.out.println("客户端连接成功,channel:" + channelFuture.channel());
//            获取用户输入内容，以回车分割
            String line = null;
            Scanner scanner = new Scanner(System.in);
            while (true) {
//                判断下有没有断开连接
                if (!channelFuture.channel().isActive()) {
                    System.out.println("客户端连接断开");
                    break;
                }
                line = scanner.nextLine();
                if ("bye".equals(line)) {
                    channelFuture.channel().close();
                    System.out.println("已经断开和服务端的链接");
                    break;
                }
                channelFuture.channel().writeAndFlush(line);
            }


        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            eventExecutors.shutdownGracefully();
        }


    }

}

```

### ClientHandler

```java
package com.project.chat.client;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月15日16时18分42秒
 * @description TODO
 */
public class ClientHandler extends SimpleChannelInboundHandler<String> {
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
//        这里是连接成功后的操作
        System.out.println("连接服务器成功，服务器的地址为：" + ctx.channel().remoteAddress());
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        System.out.println(msg);
    }
}

```

## 自定义编解码器

首先说下handler的调用机制（pipeline中的）

**入栈的就是从头到尾按照顺序走(解码器-处理器)，出栈的就是从尾到头逆着走（处理器-解码器）**

例如我们想要客户端发送一个long，服务器直接获取long

则可以这样

首先是ServerMain和ClientMain，都是和之前一样的写法，唯一不同的是pipleline

> Server

```java
new ChannelInitializer<SocketChannel>() {
    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {
        ChannelPipeline pipeline = socketChannel.pipeline();
        //                            入栈的handler进行解码：MyByteToLongDecoder
        pipeline.addLast(new MyByteToLongDecoder());
        pipeline.addLast(new ServerHandler());
    }
}
```

> Client

```java
new ChannelInitializer<SocketChannel>() {
    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {
        ChannelPipeline pipeline = socketChannel.pipeline();
        //                            编码器：MyLongToByteEncoder
        pipeline.addLast(new MyLongToByteEncoder());
        pipeline.addLast(new ClientHandler());

    }
}
```

然后是解码器

```java
package com.project.codeself;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.util.List;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月20日13时49分07秒
 * @description 解码器，将字节转换为Long
 */
public class MyByteToLongDecoder extends ByteToMessageDecoder {
    /**
     * @param channelHandlerContext 上下文
     * @param byteBuf               入栈的ByteBuf对象
     * @param list                  List集合，将解码后的数据传递给下一个Handler处理器
     * @throws Exception
     */
    @Override
    protected void decode(ChannelHandlerContext channelHandlerContext, ByteBuf byteBuf, List<Object> list) throws Exception {
        System.out.println("解码器被调用");
//        long的长度是8个字节，所以这里判断是否足够8个字节
        // 如果长度大于8个字节，则应该是16个字节的string，这里将会被解析两次
        if (byteBuf.readableBytes() >= 8) {
            //将ByteBuf中的数据读取到long中
//            list中的数据会传递给下一个Handler处理器，所以这里直接将long放入list中
            list.add(byteBuf.readLong());
        }
    }
}

```

编码器

```java
package com.project.codeself;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月20日14时02分43秒
 * @description 针对于Long数据类型的编码器
 */
public class MyLongToByteEncoder extends MessageToByteEncoder<Long> {
    @Override
    protected void encode(ChannelHandlerContext channelHandlerContext, Long aLong, ByteBuf byteBuf) throws Exception {
//        这里因为本来获取到的是long类型，所以啥都不需要处理，直接转换即可,或者对这个long进行一遍增加或者删除
        System.out.println("编码器被调用");
        byteBuf.writeLong(aLong + 666);
    }
}

```

然后是客户端的handler，编码器和处理器的关系就相当于对号入座一样

比如现在有两个编码器：String和Long的，则我们Handler中发送String，就调用String的(`ctx.writeAndFlush("aaaa")`)，或者如下保证自己传入的东西有对应的编码器处理（如果下方传入的是Int，则无法触发编码器运行）

```java {20-23}
package com.project.codeself;

import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

import java.nio.ByteBuffer;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月20日14时04分45秒
 * @description TODO
 */
public class ClientHandler extends SimpleChannelInboundHandler<Long> {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
//        发送一些数据
        for (long i = 0; i < 10; i++) {
//            这里一定要转换成Long或者已经是一个long...不然自己的编码器会识别到一个int，从而不生效
            ctx.writeAndFlush((long) i);
            System.out.println("发送数据成功" + i);
        }
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Long msg) throws Exception {
        System.out.println(msg);
    }
}

```

然后serverHandler正常写即可

```java
package com.project.codeself;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月20日13时52分42秒
 * @description TODO
 */
public class ServerHandler extends SimpleChannelInboundHandler<Long> {
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Long msg) throws Exception {
        System.out.println("收到客户端消息：" + msg);
        System.out.println("消息类型：" + msg.getClass());
    }
}

```

## 自定义编码器-编码解码在同一个类中

上方我们写了两个类来完成编码解码，但实际上只需要一个类就可以完成这项操作：

```java
package com.project.codeself;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageCodec;

import java.util.List;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月20日15时09分28秒
 * @description 一个简单的编解码器
 */
public class MyByteLongCodec extends ByteToMessageCodec<Long> {
    /**
     * 编码
     *
     * @param channelHandlerContext 上下文
     * @param aLong                 数据
     * @param byteBuf               字节缓冲
     * @throws Exception
     */
    @Override
    protected void encode(ChannelHandlerContext channelHandlerContext, Long aLong, ByteBuf byteBuf) throws Exception {
        byteBuf.writeLong(aLong);
    }

    /**
     * 解码
     *
     * @param channelHandlerContext 上下文
     * @param byteBuf               字节缓冲
     * @param list                  缓存列表
     * @throws Exception
     */
    @Override
    protected void decode(ChannelHandlerContext channelHandlerContext, ByteBuf byteBuf, List<Object> list) throws Exception {
        if (byteBuf.readableBytes() == 8) {
            list.add(byteBuf.readLong());
        }
    }
}

```

然后直接在pipeline中加入它即可

## TCP的粘包

一句话概括就是：**如果一个时间段内发送很多连续性的数据，则系统层面会自动给我们优化成一个包发送，接收方在接收到数据的时候就会认为只有一个包**

下面简单展示下在Netty中粘包是咋样的

客户端和服务端的基本轮子就不说明了，客户端的handler（extends ChannelInboundHandlerAdapter）如下

```java
@Override
public void channelActive(ChannelHandlerContext ctx) throws Exception {
    System.out.println("客户端已连接，ctx对象：" + ctx);
    System.out.println("服务端地址为：" + ctx.channel().remoteAddress());
    for (int i = 0; i < 10; i++) {
        ctx.channel().writeAndFlush(Unpooled.copiedBuffer("Hello Server 我是客户端" + i, StandardCharsets.UTF_8));
    }
    System.out.println("客户端发送消息成功");
}
```

服务端Handler继承ChannelInboundHandlerAdapter或者`SimpleChannelInboundHandler<ByteBuf>`

read代码

```java
package com.project.simple;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

import java.nio.charset.StandardCharsets;


public class TcpServerHandler extends SimpleChannelInboundHandler<ByteBuf> {


    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ByteBuf msg) throws Exception {
        System.out.println("服务端接收到的数据对象：" + msg.toString(StandardCharsets.UTF_8));
        System.out.println("客户端的地址为:" + ctx.channel().remoteAddress());
    }
}
```

最终服务端接收到的内容如下

```text
监听端口成功
服务端接收到的数据对象：Hello Server 我是客户端0Hello Server 我是客户端1Hello Server 我是客户端2Hello Server 我是客户端3Hello Server 我是客户端4Hello Server 我是客户端5Hello Server 我是客户端6Hello Server 我是客户端7Hello Server 我是客户端8Hello Server 我是客户端9
客户端的地址为:/127.0.0.1:57762
```

可以看到，内容全都在一个消息内了...而不是分成10个消息来进行处理

## 粘包的解决方案

使用自定义协议和编解码器即可解决

关键就是要解决和服务器端每次读取数据长度的问题，这个问题解决了就不会出现一次读取多或者少的问题，反正核心就是编解码器的使用

首先自定义一个消息类型

```java
package com.project.protoself;

import lombok.Data;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日17时43分19秒
 * @description TODO
 */
@Data
public class MessageProtocol {
    private Integer len;
    private byte[] content;
}

```

然后一个编码器

```java
package com.project.protoself;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日17时53分21秒
 * @description 自定义的消息类型编码器
 */
public class MyMessageEncoder extends MessageToByteEncoder<MessageProtocol> {
    @Override
    protected void encode(ChannelHandlerContext channelHandlerContext, MessageProtocol messageProtocol, ByteBuf byteBuf) throws Exception {
        System.out.println("Message Encoder被调用");
        // 将消息分成两部分发送
        byteBuf.writeInt(messageProtocol.getLen());
        byteBuf.writeBytes(messageProtocol.getContent());
    }
}

```

和一个解码器

```java
package com.project.protoself;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ReplayingDecoder;

import java.util.List;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日17时59分15秒
 * @description ReplayingDecoder可以不用判断长度来进行操作（自动给我们封装好了判断长度）
 */
public class MyMessageDecoder extends ReplayingDecoder<Void> {
    @Override
    protected void decode(ChannelHandlerContext channelHandlerContext, ByteBuf byteBuf, List<Object> list) throws Exception {
        System.out.println("MyMessageDecoder被调用");
//        需要将得到的二进制字节码->MessageProtocol数据包(对象)
//        先获取长度
        int len = byteBuf.readInt();
        byte[] content = new byte[len];
//        然后读取内容
        byteBuf.readBytes(content);
//        封装成对象
        MessageProtocol messageProtocol = new MessageProtocol();
        messageProtocol.setLen(len);
        messageProtocol.setContent(content);
//        将对象放入list中
        list.add(messageProtocol);
    }
}

```

接着 Client Handler

```java
public class TCPClientHandler extends SimpleChannelInboundHandler<MessageProtocol> {

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, MessageProtocol msg) throws Exception {
//        DO NOTHING
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        for (int i = 0; i < 10; i++) {
            MessageProtocol message = new MessageProtocol();
            String s = "Hello World!" + i;
            byte[] bytes = s.getBytes(StandardCharsets.UTF_8);
            message.setLen(bytes.length);
            message.setContent(bytes);
            ctx.writeAndFlush(message);

        }
    }

}
```

Server Handler

```java
package com.project.protoself;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

import java.nio.charset.StandardCharsets;


/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月11日17时36分54秒
 * @description 我们自定义一个Handler需要继承Netty规定好的某个HandlerAdapter类，这时我们的这个Handler才能被称为一个Handler
 */
public class TcpServerHandler extends SimpleChannelInboundHandler<MessageProtocol> {


    @Override
    protected void channelRead0(ChannelHandlerContext ctx, MessageProtocol msg) throws Exception {
        String format = String.format("收到客户端的消息了，长度为:%d,内容为:%s", msg.getContent().length, new String(msg.getContent(), StandardCharsets.UTF_8));
        System.out.println(format);

    }
}

```

运行结果

![image-20220521181103663](/images/Java/Netty/02-Netty入门/image-20220521181103663.png)
