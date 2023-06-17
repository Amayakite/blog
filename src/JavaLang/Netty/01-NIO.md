---
title: 01-NIO
date: 2022-5-9 20:18:55
category: Netty
tag:
- NIO
- JavaNIO
---

## 概述

Nio，异步非阻塞的一个概念，在你学习这个之前，首先需要熟悉Java：OOP、多线程、网络编程等

因为过了NIO就是Netty，Netty是一个非常牛逼的Java框架，就是用到了NIO的概念

这里说下I/O模型

1. 就是用什么样的通道进行数据的发送和接收，很大程序上决定了程序的通讯性能
2. Java中共有三种编程模型/IO模式：BIO、NIO、AIO
3. BIO：同步并阻塞（传统阻塞形），服务器实现为一个连接一个线程，也就是说，如果这个连接即使不做任何事情，也有不必要的开销
4. NIO：同步非阻塞：服务器实现模式为一个线程处理多个请求（连接），即客户端发送的连接请求都会注册到多路复用器上，多路复用器轮循到连接有I/O请求就进行处理
5. AIO：异步非阻塞，AIO引入了异步通道的概念，才用的Proactor模式，简化了程序的编写，有效的请求才启动线程，它的特点是先由操作系统完成后才通知服务端程序去处理，一般适用于连接数较多且时间长的应用

BIO我们天天都在用这，这里就不多说了（InputStream、OutputStream）

## NIO基本介绍

- 全称Java non-blocking IO ，是JDK提供的（1.4开始）一系列改进的输入输出的新特性，都被统称为NIO（new IO），是同步非阻塞的
- NIO相关类都被放在`java.nio`包及子包下，并且对原先`java.io`包中的很多类都进行了改写
- NIO有三大核心部分：Channel（通道），Buffer（缓冲区），Selector（选择器）
- NIO是面向缓冲区，或者面向块编程的，数据读取到一个它稍后处理的缓冲区，需要时可以在缓冲区中前后移动，这就增加了处理过程中的灵活性，使用它可以提供非阻塞式的高伸缩性网路
- Java NIO的非阻塞模式，使一个线程从某通道发送请求或者读取数据，但是它仅仅能得到目前可用的数据，如果目前没有数据可用，则什么都不会读取，而**不是保持线程阻塞**，所以直至数据变得可以读取之前，该线程可以继续做其他事情，非阻塞写也是如此，一个线程请求写入一些数据到某些通道，但不需要等待它完全写入，这个线程同时也可以去做些别的事情，之后会举例说明
- 通俗点说，NIO就是可以做到用一个线程来处理多个操作的，假设有1w个请求过来，根据实际情况，可以分配50或者100个线程来处理，而不像BIO那样，非得1w个线程
- Http2.0使用了多路复用的技术，做到了一个连接并发处理多个请求，而且并发请求的数据比Http1.1大了好几个数量级

先来看看最基本的使用

```java
public class BaseBuffer {
    public static void main(String[] args) {
//        创建一个IntBuffer 大小为5，也就是可以存放5个int
        IntBuffer allocate = IntBuffer.allocate(5);

//        向buffer中存放数据
        for (int i = 1; i <= 5; i++) {
            allocate.put(i);
        }

//        转换成读取模式
        allocate.flip();

//        从buffer中读取数据
        while (allocate.hasRemaining()) {
            System.out.println(allocate.get());
        }
//        清除现有数据并转换成写入模式
        allocate.clear();

//        向buffer中存放数据
        for (int i = 1; i <= 5; i++) {
            allocate.put(i);
        }
        allocate.flip();
//        模拟读取数据
        System.out.println(Arrays.toString(allocate.array()));
//        再次读取
        while (allocate.hasRemaining()) {
            System.out.println(allocate.get());
        }
        System.out.println("end");


    }
}

```

## NIO三大核心原理示意图

![image-20220509210044642](/images/Java/Netty/01-NIO/image-20220509210044642.png)

## 缓冲区Buffer

本质上是一个可以读写的内存块，可以理解成是一个容器对象（含数组），该对象提供了一组方法，可以轻松地使用内存块，缓冲区对象内置了一些机制，能够跟踪和记录缓冲区的状态变化，Channel提供从文件，网络读取数据的渠道，但是读取或写入的数据都必须经过Buffer

![image-20220509210438546](/images/Java/Netty/01-NIO/image-20220509210438546.png)

buffer是一个抽象类，里面有很多属性和方法

```java
public abstract class Buffer {
    static final Unsafe UNSAFE = Unsafe.getUnsafe();

    static final ScopedMemoryAccess SCOPED_MEMORY_ACCESS = ScopedMemoryAccess.getScopedMemoryAccess();


    static final int SPLITERATOR_CHARACTERISTICS =
        Spliterator.SIZED | Spliterator.SUBSIZED | Spliterator.ORDERED;

    // Invariants: mark <= position <= limit <= capacity
    // 记住下面四个属性，后面用的上
    private int mark = -1;
    private int position = 0;
    private int limit;
    private int capacity;

 
    long address;

    final MemorySegmentProxy segment;
    // ....
```

它是一个定级父类，有如下子类

![image-20220509211342753](/images/Java/Netty/01-NIO/image-20220509211342753.png)

PS：按ctrl+H可以在IEDA中查看层次继承结构

![image-20220509211449697](/images/Java/Netty/01-NIO/image-20220509211449697.png)

这里面最常用的是ByteBuffer

然后就是刚刚的四个属性

![image-20220509211517378](/images/Java/Netty/01-NIO/image-20220509211517378.png)

这样说吧，你初始化设定的值就是Capacity，然后Limit默认就是它，可以手动调整，但是不能大于它

你读取数据的时候，是从0的位置开始读的，读取和修改数据的时候，Position都会发生变化

这样说吧，Capacity>=Limit>=Postion Position的最大值是Limit，超过这个值将不会进行读取/写入

如果说超过指定值了仍然试图读取/写入，则会抛出BufferOverflowException异常

常用方法如下

![image-20220509213350041](/images/Java/Netty/01-NIO/image-20220509213350041.png)

最常用的Buffer和方法如下

![image-20220509213851185](/images/Java/Netty/01-NIO/image-20220509213851185.png)

## 通道Channel

### 基本概念

NIO的通道类似于流，但有些区别如下

- 通道可以同时进行读写，而流只能读或者写
- 通道可以实现异步读写数据
- 通道可以从缓冲区(buffer)读数据，也可以写数据到缓冲

![image-20220509220754068](/images/Java/Netty/01-NIO/image-20220509220754068.png)

用的比较多的是FileChannel和ServerSocketChann和SocketChannel

ServerSocketChannel类似于java的ServerSocket（服务端）

SocketChannel类似于java的Socket（客户端）

### FileBuffer

注意：**虽然FileChannel是Java NIO的一部分，但是FileChannel操作是阻塞的，并且没有非阻塞模式。**

![image-20220509224607239](/images/Java/Netty/01-NIO/image-20220509224607239.png)

例子

```java
// 写入文件
public class BaseBuffer {
    public static void main(String[] args) throws IOException {
        FileChannel channel = new FileOutputStream("aaa.txt").getChannel();
        // 方式1
        ByteBuffer byteBuffer = ByteBuffer.wrap("Hello World".getBytes());
        channel.write(byteBuffer);
        channel.close();
      
    }
}
// 写入文件 方式2（在不知道到底是写入啥的情况下）
public class BaseBuffer {
    public static void main(String[] args) throws IOException {
        String str;
        FileChannel channel = new FileOutputStream("aaa.txt").getChannel();
        ByteBuffer buffer = ByteBuffer.allocate(1);
//        读取控制台输入
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        str = reader.readLine();
//        获取缓冲区的容量
        int bufferLen = buffer.capacity();
//        获取字符串的长度 （假设开始并不知道）
        int strLen = str.length();
        for (int i = 0; i < strLen; i += bufferLen) {
            buffer.clear();
            int len = Math.min(bufferLen, strLen - i);
            buffer.put(str.substring(i, i + len).getBytes());
            buffer.flip();
            channel.write(buffer);
        }
    }
}
// 读取文件
public class BaseBuffer {
    public static void main(String[] args) throws IOException {
        FileChannel channel = new FileInputStream("aaa.txt").getChannel();
        ByteBuffer buffer = ByteBuffer.allocate(1);
//        读取channel中的数据到buffer中,并返回读取的字节数 
        while (channel.read(buffer) != -1) {
//            说明buffer中有数据
            buffer.flip();
//            读取buffer中的数据
            while (buffer.hasRemaining()) {
                System.out.print((char) buffer.get());
            }
//            读取完了记得清空buffer
            buffer.clear();
        }
    }
}

```

### Channel直接拷贝文件

如果两个文件要互拷的话，下面的方式更方便一些

```java
public class BaseBuffer {
    public static void main(String[] args) throws IOException {
        FileChannel readChannel = new FileInputStream("aaa.txt").getChannel();
        FileChannel writeChannel = new FileOutputStream("bbb.txt").getChannel();
//        通道互拷 - 将readChannel中的数据写入writeChannel
        readChannel.transferTo(0, readChannel.size(), writeChannel);

    }
}
```

实际上就是封装了一些常用操作罢了

不过看到源码里有一个强转int的操作，可能超过2G会有一定的风险，不建议超过2G的用这个玩意

```java
public long transferTo(long position, long count,
                       WritableByteChannel target)
    throws IOException
{
    ensureOpen();
    if (!target.isOpen())
        throw new ClosedChannelException();
    if (!readable)
        throw new NonReadableChannelException();
    if (target instanceof FileChannelImpl &&
        !((FileChannelImpl)target).writable)
        throw new NonWritableChannelException();
    if ((position < 0) || (count < 0))
        throw new IllegalArgumentException();
    long sz = size();
    if (position > sz)
        return 0;

    if ((sz - position) < count)
        count = sz - position;

    // Attempt a direct transfer, if the kernel supports it, limiting
    // the number of bytes according to which platform
    // 注意 这里强转了int
    int icount = (int)Math.min(count, MAX_DIRECT_TRANSFER_SIZE);
    long n;
    if ((n = transferToDirectly(position, icount, target)) >= 0)
        return n;

    // Attempt a mapped transfer, but only to trusted channel types
    if ((n = transferToTrustedChannel(position, count, target)) >= 0)
        return n;

    // Slow path for untrusted targets
    return transferToArbitraryChannel(position, count, target);
}
```

### MappedByteBuffer 堆外内存操作

这个东西可以让文件直接在内存（真正的内存，这个内存是物理内存，是Java底层的unsafe才能掉的本地方法 ）中进行修改，所以速度会比较快

继承关系如图

![image-20220510221507035](/images/Java/Netty/01-NIO/image-20220510221507035.png)

那个带R的是只读的

```java
public class BaseBuffer {
    public static void main(String[] args) throws IOException {
//        创建一个RandomAccessFile 读取的文件模式为rw-读写
//        模式对应的mode为：
//        r：读取模式
//        rw：读写模式
//        rws：读写共享模式
//        rwd：读写独占模式
//        w：写入模式
//        ws：写入共享模式
//        wd：写入独占模式
//        a：追加模式
//        as：追加共享模式
//        ad：追加独占模式
        RandomAccessFile rw = new RandomAccessFile("aaa.txt", "rw");
        FileChannel channel = rw.getChannel();
//        参数1：读写的模式 FileChannel.MapMode.READ_WRITE 可读可写
//        参数2：开始位置（可以修改的）
//        参数3：长度 也是映射到内存的长度 即文件的多少个字节映射到内存 例如下方，可以直接修改的范围就是0-5（不包含5）
        MappedByteBuffer map = channel.map(FileChannel.MapMode.READ_WRITE, 0, 5);
        map.put(0, (byte) 'a');
        map.put(1, (byte) 'b');
        map.put(2, (byte) 'c');
        map.put(3, (byte) 'd');
        map.put(4, (byte) 'e');

//        关闭资源
        rw.close();

    }
}
```

## Selector

![image-20220510225558826](/images/Java/Netty/01-NIO/image-20220510225558826.png)

![image-20220511112350463](/images/Java/Netty/01-NIO/image-20220511112350463.png)

一个线程管理一个Selector，一个Selector管理多个Channel，每个Channel分别对应一个Buffer

### Selector Api一览

![image-20220511112915831](/images/Java/Netty/01-NIO/image-20220511112915831.png)

![image-20220511113619417](/images/Java/Netty/01-NIO/image-20220511113619417.png)

![image-20220511114501959](/images/Java/Netty/01-NIO/image-20220511114501959.png)

可以绑定的事件主要有如下几个

![image-20220511114343968](/images/Java/Netty/01-NIO/image-20220511114343968.png)

### NIO快速入门

理论还是有点头大，直接进入demo吧，这里展示一个简单的通过nio服务端与客户端

服务端

```java
public class NioServer {
    public static void main(String[] args) throws Throwable {
//        创建一个ServerSocketChannel --》 ServerSocket
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();

//        得到一个Selector对象
        Selector selector = Selector.open();

//        绑定一个端口8080
        serverSocketChannel.socket().bind(new InetSocketAddress(8080));
//        设置为非阻塞模式
        serverSocketChannel.configureBlocking(false);

//        将ServerSocketChannel注册到Selector上，关心的事件是有客户端连接进来
        serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

//        循环监听客户端链接
        while (true) {
            // 轮询selector上的事件 这里是阻塞1s 如果不填的话 则是有事件才触发(阻塞)
            int readyChannels = selector.select(1000);
            if (readyChannels == 0) {
//                没有任何事件发生(没有客户端链接进来)
                continue;
            }
//            如果返回的不是0 就表示已经获取到关注的事件 取到相关的SelectionKey集合（有事件发生的SelectKey）
//            selector.selectedKeys();是获取一个关注的事件集合
            Set<SelectionKey> selectionKeys = selector.selectedKeys();
//            通过它可以反向获取到相关的ServerSocketChannel
            selectionKeys.forEach(key -> {
//                根据key对应的通道发生的事件做相应的处理
                if (key.isAcceptable()) {
//                    如果是客户端的连接事件（新的客户端连接）
//                    给该客户端生成一个SocketChannel
                    try {
                        SocketChannel socketChannel = serverSocketChannel.accept();
//                        将socketChannel设置为非阻塞模式
                        socketChannel.configureBlocking(false);
//                        注册到selector上，关心的事件是读取客户端发送的数据 同时给channel关联一个buffer
                        socketChannel.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(1024));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }

//                如果是客户端发送的数据事件
                if (key.isReadable()) {
//                    获取到相关的channel
                    SocketChannel socketChannel = (SocketChannel) key.channel();
//                    获取到相关的buffer
                    ByteBuffer buffer = (ByteBuffer) key.attachment();
//                    将数据从channel中读取到buffer中
                    try {
                        socketChannel.read(buffer);
                        System.out.println(String.format("从客户端%s读取到的数据是%s", socketChannel.getRemoteAddress(), new String(buffer.array(), 0, buffer.position(), StandardCharsets.UTF_8)));
//                        清空buffer
                        buffer.clear();

                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }

//                从selector上移除相关的key 防止重复监听
                key.cancel();

            });
        }
    }
}
```

> 客户端

```java
public class NioClient {
    public static void main(String[] args) throws Throwable {
//        获取一个网络通道
        SocketChannel socketChannel = SocketChannel.open();
//        设置非阻塞模式
        socketChannel.configureBlocking(false);
//        提供服务器的信息
        InetSocketAddress localhost = new InetSocketAddress("localhost", 8080);
//        连接服务器
        if (!socketChannel.connect(localhost)) {
//        如果链接服务器失败 ，则尝试重新连接（while循环）
            while (!socketChannel.finishConnect()) {
//            如果还没有连接上服务器
                System.out.println("还没有连接上服务器，但是客户端不会阻塞，可以做一些其他的工作...");
            }
        }
//        如果链接成功，就发送数据
        ByteBuffer buffer = ByteBuffer.wrap("Hello Server".getBytes(StandardCharsets.UTF_8));
//        发送数据
        socketChannel.write(buffer);
//        关闭通道
        socketChannel.close();

    }
}

```

## NIO和零拷贝

- 零拷贝是网络编程的关键，很多性能优化都离不开它
- 在Java程序中，常用的零拷贝有mmap(内存映射)和sendFile
- 嘛总之原理都是操作系统内核态的（涉及到内存和CPU之间的拷贝操作 比较复杂），要用他的话只需要知道这玩意比一般的拷贝快即可
- PS：实际上零拷贝也是需要将一些信息例如position和offset拷贝到CPU（Linux 2.4内核）

这里我用一个例子来展示下零拷贝的速度

首先我有一个文件

![image-20220511135639922](/images/Java/Netty/01-NIO/image-20220511135639922.png)

我先用普通的IO拷贝让其到D盘

```java
public class NioZeroCopy {
    public static final String FILEPATH = "C:\\Users\\Amayakite\\Downloads\\ubuntu-22.04-desktop-amd64.iso";
    public static final String TO_PATH = "D:\\aaa.iso";

    public static void main(String[] args) throws IOException {
//        普通的IO方式
        FileInputStream fileInputStream = new FileInputStream(FILEPATH);
        long startTime = System.currentTimeMillis();
        FileOutputStream fileOutputStream = new FileOutputStream(TO_PATH);
        byte[] bytes = new byte[1024];
        int len = 0;
        while ((len = fileInputStream.read(bytes)) != -1) {
            fileOutputStream.write(bytes, 0, len);
            fileOutputStream.flush();
        }
        fileInputStream.close();
        fileOutputStream.close();
        long endTime = System.currentTimeMillis();
        System.out.println("普通IO方式耗时：" + (endTime - startTime));
    }
}
```

结果：普通IO方式耗时：51082ms

再来试试零拷贝

```java {10}
public class NioZeroCopy {
    public static final String FILEPATH = "C:\\Users\\Amayakite\\Downloads\\ubuntu-22.04-desktop-amd64.iso";
    public static final String TO_PATH = "D:\\aaa.iso";

    public static void main(String[] args) throws IOException {
//        零拷贝方式
        FileInputStream fileInputStream = new FileInputStream(FILEPATH);
        long startTime = System.currentTimeMillis();
        FileOutputStream fileOutputStream = new FileOutputStream(TO_PATH);
        fileInputStream.transferTo(fileOutputStream);
        long endTime = System.currentTimeMillis();
        System.out.println("零拷贝方式耗时：" + (endTime - startTime) + "ms");
    }
}
// 零拷贝方式耗时：11674ms
```

## AIO基本介绍

![image-20220511141444908](/images/Java/Netty/01-NIO/image-20220511141444908.png)

这玩意据说不稳，大部分情况下还是更推荐NIO
