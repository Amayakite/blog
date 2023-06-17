---
title: 04-Netty-RPC
date: 2022-5-21 20:53:00
category: Netty
tag:
- Netty
- RPC
---

## RPC的基本介绍

Remote Procedure Call——远程调用过程，是一个计算机通讯协议，该协议允许运行于一台计算机程序端调用另一台计算机的子程序，而程序员无序额外的为这个交互作用编程

两个或者多个应用程序都分布在不同的服务器上，他们之间的调用都像是本地的方法互调一样

![image-20220521205517334](/images/Java/Netty/04-Netty-RPC/image-20220521205517334.png)

常见的RPC框架有：阿里的Dubbo、google的gRPC、Golang的rpcx，Apache的Thrif，Spring旗下的SpringCloud

之前已经接触过SpringCloud架构了，整体来说那是通过http进行一个rpc调用（open fegin基于netty）

![image-20220521210328938](/images/Java/Netty/04-Netty-RPC/image-20220521210328938.png)

![image-20220521210418540](/images/Java/Netty/04-Netty-RPC/image-20220521210418540.png)

在这里，我们将会基于Netty实现一个类似于Dubbo的RPC框架

## 整体思路

![image-20220521215244853](/images/Java/Netty/04-Netty-RPC/image-20220521215244853.png)

## 简单的接口准备

就像是在Spring Boot中调用一样，准备好一个service和配套的impl

```java
package com.project.rpc.publicinterface;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日21时35分00秒
 * @description 这个是接口，是服务提供方和消费者方都需要的
 */
public interface HelloService {
    String sayHello(String message);
}


package com.project.rpc.provider;

import com.project.rpc.publicinterface.HelloService;
import io.netty.util.internal.StringUtil;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日21时36分49秒
 * @description 返回一个结果（当有消费方调用该方法时返回一个字符串）
 */
public class HelloServiceImpl implements HelloService {
    @Override
    public String sayHello(String message) {
        System.out.println("接收到的消息：" + message);
        if (StringUtil.isNullOrEmpty(message)) {
            return "Message is empty or null";
        }
        return "Hello " + message;
    }
}

```

## 服务端（Netty）的搭建

其实这里都是比较简单的，客户端发过来指定的消息，找到指定的类调用对应的方法，然后返回过去就行了

### NettyServer

这里对于那啥做了一点简单的封装，看起来舒服点点

```java
package com.project.rpc.netty;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日21时40分44秒
 * @description Netty Server 这里继承Runnable方便启动线程
 */
@Data
@AllArgsConstructor
public class NettyServer implements Runnable {

    private String host;
    private int port;

    public static void main(String[] args) {
        new NettyServer("127.0.0.1", 8080).run();
    }


    @Override
    public void run() {
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 1024)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            pipeline.addLast("decoder", new StringDecoder());
                            pipeline.addLast("encoder", new StringEncoder());
                            pipeline.addLast("MyHandler", new NettyServerHandler());
                        }
                    });
            serverBootstrap
                    .bind(host, port)
                    .addListener((ChannelFuture future) -> {
                        if (future.isSuccess()) {
                            System.out.println("Netty Server start success, host:" + host + ", port:" + port);
                        } else {
                            System.out.println("Netty Server start fail, host:" + host + ", port:" + port);
                        }
                    }).sync().channel().closeFuture().sync();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}

```

### ServerHandler

这里略微用到了一点反射的机制来调用方法，当然，也可以直接那啥对号入座的调用

```java
package com.project.rpc.netty;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日21时53分37秒
 * @description Netty的服务端处理器
 */
public class NettyServerHandler extends SimpleChannelInboundHandler<String> {
    public static final String SPLIT_FIX = "#";
    public static final String LAST_FIX = "@";
    public static final String START_FIX = "$";


    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        System.out.println("接收到的消息：" + msg);
        //        定义一个自己的特殊协议，也就是说要满足特定的语法，例如必须得以以某个特定的字符分隔，结束以某个字符串结尾
        //        例如调用HelloService的sayHello方法，其语法为：$HelloService#sayHello#张三@
        if (!msg.startsWith(START_FIX) || !msg.endsWith(LAST_FIX)) {
            System.out.println("消息格式不正确，请检查！");
            return;
        }
        //        去除前后
        msg = msg.substring(1, msg.length() - 1);
        String[] msgs = msg.split(SPLIT_FIX);
        if (msgs.length == 0) {
            //            说明没有调用任何方法
            System.out.println("没有调用任何方法");
            return;
        }
        //        ClassName
        String className = msgs[0];
        //        MethodName
        String methodName = msgs[1];
        //        参数
        Object[] params = Arrays.copyOfRange(msgs, 2, msgs.length);

        //        调用反射方法 这里封装的反射方法的返回值一定不是null的
        Object o = reflectInvokeMethod(className, methodName, params);
        //        返回给调用者
        ctx.writeAndFlush(o);
    }

    /**
     * 通过反射调用本地的方法 这里简单封装了下
     *
     * @param className  类名
     * @param methodName 方法名
     * @param params     参数
     * @return 返回值
     */
    private Object reflectInvokeMethod(String className, String methodName, Object[] params) {
        //        先看看className是不是以Impl结尾
        if (!className.endsWith("Impl")) {
            className = className + "Impl";
        }
        //        className使用统一前缀（调用指定地方的）
        //        先看看className有没有.，如果没有，就加上统一前缀
        //        有的话说明那边指定了完整的类名，就不用加前缀了
        if (!className.contains(".")) {
            className = "com.project.rpc.provider." + className;
        }
        Class<?> clazz = null;
        try {
            clazz = Class.forName(className);
        } catch (ClassNotFoundException e) {
            //            TODO 这里开始遇到异常应该返回异常给调用者
            System.out.println("没有找到指定的类！");
            return "没有找到指定的类";
        }
        Object obj = null;
        try {
            obj = clazz.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            System.out.println("实例化失败！Impl类必须有无参构造方法！");
            return "实例化失败！Impl类必须有无参构造方法！";
        }
        Class<?>[] paramTypes = new Class[params.length];
        for (int i = 0; i < params.length; i++) {
            paramTypes[i] = params[i].getClass();
        }
        Method method = null;
        try {
            method = clazz.getMethod(methodName, paramTypes);
        } catch (NoSuchMethodException e) {
            System.out.println("没有找到指定的方法！");
            return "没有找到指定的方法！";
        }
        try {
            //            这里是直接返回调用方法的结果
            return method.invoke(obj, params);
        } catch (IllegalAccessException | InvocationTargetException e) {
            //            调用方法失败，直接返回异常值
            return e.getMessage();
        }
    }


    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}

```

## 客户端Client的搭建

### ClientHandler

首先这里面有notify和wait，众所周知，在同一个对象内，调用notify可以让wait结束，从而实现同步调用 

```java
package com.project.rpc.netty;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.concurrent.Callable;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日22时42分26秒
 * @description 注意 额外实现了callable接口 这个接口是用来处理异步调用的
 */
public class NettyClientHandler extends ChannelInboundHandlerAdapter implements Callable<Object> {

    /**
     * 上下文对象 这里和下面的都是非static的，所以每个实例都会有一个
     */
    private ChannelHandlerContext context;

    /**
     * 返回的结果
     */
    private String result;

    /**
     * 客户端调用方法时传入的参数 如果是正常情况下这里应该封装成一个对象（防止粘包）
     */
    private String params;


    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
//        在其他方法中会使用这个ctx，所以这里需要赋值
        context = ctx;
    }

    @Override
    public synchronized void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
//        收到服务器的数据后调用（NettyServer返回值）
//        把返回值赋值给result
        result = (String) msg;
//        唤醒一个等待的线程
        notify();
    }

    /**
     * 被代理对象调用，发送数据给服务器->等待被唤醒
     *
     * @return
     * @throws Exception
     */
    @Override
    public synchronized Object call() throws Exception {
        context.writeAndFlush(params);
//        等待被唤醒
        wait();
//        返回结果
        return result;
    }


    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        super.exceptionCaught(ctx, cause);
    }

    void setParams(Object... params1) {
//        这里应该接收一个特殊的对象然后那个对象的toString自己手动重写更好些
        if (params1.length < 2) {
//            最少应该要两个参数，一个是类名，一个是方法名
            throw new IllegalArgumentException("参数不足");
        }
        String className = params1[0].toString();
        String methodName = params1[1].toString();
//        剩下的都是methodParams
        Object[] methodParams = Arrays.copyOfRange(params1, 2, params1.length);
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(NettyServerHandler.START_FIX);
        stringBuilder.append(className);
        stringBuilder.append(NettyServerHandler.SPLIT_FIX);
        stringBuilder.append(methodName);
        for (Object methodParam : methodParams) {
            stringBuilder.append(NettyServerHandler.SPLIT_FIX);
//            参数统一转成字符串
            stringBuilder.append(methodParam.toString());
        }
        stringBuilder.append(NettyServerHandler.LAST_FIX);
        params = stringBuilder.toString();


    }


}

```

### Client

这里使用了jdk的代理对象，来动态增强我们的对象，我们在外部主要是调用那个getBean

```java
package com.project.rpc.netty;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日23时17分41秒
 * @description TODO
 */
public class NettyClient {
    @SuppressWarnings("all")
    private static ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());

    private static NettyClientHandler client;

    /**
     * 自定义的代理类
     *
     * @param serviceClass 要被代理的接口
     * @param methodName   要被代理的方法名
     * @return
     */
    public Object getBean(final Class<?> serviceClass, final String methodName) {
        return Proxy.newProxyInstance(serviceClass.getClassLoader(), new Class[]{serviceClass}, (proxy, method, args) -> {
            if (client == null) {
                initClient();
            }
            System.out.println("调用的类和方法：" + serviceClass.getName() + "." + methodName);
//            只要简单的类名（等下直接传递给）
            System.out.println("调用的类名：" + serviceClass.getSimpleName());
//            如果方法名相同，则增强
            if (methodName.equals(method.getName())) {
                client.setParams(serviceClass.getSimpleName(), methodName, args);
                //            submit需要传入一个Callable对象，这个对象的run方法会在线程池中执行
                return executorService.submit(client).get();
            }
//            如果方法名不同，则不增强
            System.out.println("方法名不同，不增强");
            return null;
        });
    }


    private static void initClient() {
        client = new NettyClientHandler();
        NioEventLoopGroup eventExecutors = new NioEventLoopGroup();
        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(eventExecutors)
                    .channel(NioSocketChannel.class)
//                    TCP_NODELAY参数用于设置是否启用 Nagle 算法，设置为true的时候可以提高网络性能（不延时）
                    .option(ChannelOption.TCP_NODELAY, true)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ChannelPipeline pipeline = ch.pipeline();
                            pipeline.addLast(new StringDecoder());
                            pipeline.addLast(new StringEncoder());
                            pipeline.addLast(client);
                        }
                    });
            bootstrap.connect("127.0.0.1", 8080).sync();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
//        注意 这里没有finally 如果加上了之后，将会等待关闭后后续的代码才会执行（也就是会立刻关闭连接）


    }


}

```

### ClientBootstrap

接下来测试下

```java
package com.project.rpc.netty;

import com.project.rpc.publicinterface.HelloService;
import lombok.Value;

import java.util.concurrent.TimeUnit;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月21日23时47分57秒
 * @description TODO
 */
public class ClientBootstrap {
    public static void main(String[] args) throws InterruptedException {
        NettyClient nettyClient = new NettyClient();
        HelloService helloService = (HelloService) nettyClient.getBean(HelloService.class, "sayHello");
        for (; ; ) {
            TimeUnit.SECONDS.sleep(3);
            String amayakite = helloService.sayHello("Amayakite");
            System.out.println("result = " + amayakite);
        }

    }
}

```

嘛 虽然说转换的时候有点问题，不过貌似已经成功了

![image-20220522133337633](/images/Java/Netty/04-Netty-RPC/image-20220522133337633.png)
