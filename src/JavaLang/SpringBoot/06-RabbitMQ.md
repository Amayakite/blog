---
title: 06-RabbitMQ
date: 2021-12-27 22:56:30
category: SpringBoot
tag:
- RabbitMQ
- SpringBoot 
---

## 简介

感觉没啥好说的 暂时可以把这个玩意当成另一个Mysql或者Redis来看待，总之 是为了之后的Spring Cloud做铺垫

这里的课程看的是狂神的

![cardImage](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy7a8af1c2-b406-46d9-965e-df81525649cd.png)

![cardImage2](/images/Java/SpringBoot/06-RabbitMQ/kuangstudyb888e5f0-2c0f-4576-af88-0176abfa7832.png)

![image-20211227231239303](/images/Java/SpringBoot/06-RabbitMQ/image-20211227231239303.png)

这样说吧

RabbitMq具有接受数据、接受请求、存储数据、发送数据等技术服务

它有消息队列：负责数据的接收、存储和传递，性能远高于我们的Java代码

而消息中间件采用的并不是http协议，而常见的消息中间件协议有：OpenWire、AMQP、MQTT、Kafka，OpenMessage协议。

> **面试题：为什么消息中间件不直接使用http协议呢？**
>
> 1. 因为http请求报文头和响应报文头是比较复杂的，包含了cookie，数据的加密解密，状态码，响应码等附加的功能，但是对 于一个消息而言，我们并不需要这么复杂，也没有这个必要性，它其实就是负责数据传递，存储，分发就行，一定要追求的是高性能。尽量简洁，快速。
> 2. 大部分情况下http大部分都是短链接，在实际的交互过程中，一个请求到响应很有可能会中断，中断以后就不会就行持久化，就会造成请求的丢失。这样就不利于消息中间件的业务场景，因为消息中间件可能是一个长期的获取消息的过程，出现问题和故障要对数据或消息就行持久化等，目的是为了保证消息和数据的高可靠和稳健的运行。

### AMQP协议

> AMQP：(全称：Advanced Message Queuing Protocol) 是高级消息队列协议。由摩根大通集团联合其他公司共同设计。是一个提供统一消息服务的应用层标准高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计。基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同的开发语言等条件的限制。**Erlang**中的实现有RabbitMQ等。
> 特性：
> 1：分布式事务支持。
> 2：消息的持久化支持。
> 3：高性能和高可靠的消息处理优势。

支持这个协议的有

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy1705264a-5917-4bf7-99a8-2ed993b463fa-16406198611524.png)

这个协议是基于Erlang 所以使用它需要安装Erlang 就像使用Java要安装JDK一样

### MQTT协议

MQTT协议：（Message Queueing Telemetry Transport）消息队列是IBM开放的一个即时通讯协议，物联网系统架构中的重要组成部分。
特点：
1：轻量
2：结构简单
3：传输快，不支持事务
4：没有持久化设计。
应用场景：
1：适用于计算能力有限
2：低带宽
3：网络不稳定的场景。
支持者：同AMQP

### OpenMessage协议

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy579c94ed-0947-439e-95e7-2ca6b425dc79.png)

是近几年由阿里、雅虎和滴滴出行、Stremalio等公司共同参与创立的分布式消息中间件、流处理等领域的应用开发标准。
特点：
1：结构简单
2：解析速度快
3：支持事务和持久化设计。

### Kafka协议

Kafka协议是基于TCP/IP的二进制协议。消息内部是通过长度来分割，由一些基本数据类型组成。
特点是：
1：结构简单
2：解析速度快
3：无事务支持
4：有持久化设计

### 消息分发策略的机制和对比

|          | ActiveMQ | RabbitMQ | Kafka | RocketMQ |
| -------- | -------- | -------- | ----- | -------- |
| 发布订阅 | 支持     | 支持     | 支持  | 支持     |
| 轮询分发 | 支持     | 支持     | 支持  | /        |
| 公平分发 | /        | 支持     | 支持  | /        |
| 重发     | 支持     | 支持     | /     | 支持     |
| 消息拉取 | /        | 支持     | 支持  | 支持     |

这里看一眼就可以 以后会具体了解

轮询是消息的负载均衡  ,公平是服务器的负载均衡

## RabbitMQ的入门及安装

RabbitMQ是一个开源的遵循AMQP协议实现基于Erlang语言编写支持多种客户端

用于在分布式系统内存储消息、转发消息，且具有高可用、高可扩性、易用性等特征

这玩意Spring的团队也参与了维护 所以和spring家族的兼容性非常好

<https://www.rabbitmq.com/>

下载可以看官网说明

<https://www.rabbitmq.com/download.html>

### 普通的安装方式

要安装它  首先得安装ErLang

这里以ubuntu为例

```bash
sudo apt-get install erlang
```

接着 将在官网下载的安装包用dpkg命令安装

```bash
dpkg -i xxx.deb
```

然后启动

```bash
systemctl start rabbitmq-server
```

查看状态

```bash
systemctl status rabbitmq-server.service
```

接这 如果在avtive中看到了一个绿色的running 表示成功运行

绑定开机启动

```bash
systemctl enable rabbitmq-server
```

停止

```bash
systemctl stop rabbitmq-server
```

然后RabbitMQ有一个WEB管理界面，默认是未安装的 需要手动安装

```bash
rabbitmq-plugins enable rabbitmq_management
```

> 说明 rabbitmq有一个账号默认账号密码是 `guest` 默认情况下是只能在localhost下访问
>
> 所以需要添加一个远程登录的账户

安装完毕后 重启服务即可

```bash
systemctl restart rabbitmq-server
```

安装完毕后访问你的`ip:15672`（注意之前要放行对应的端口）

就可以访问

当然默认你输入guest是访问不了滴

所以需要

新增用户

```bash
rabbitmqctl add_user admin 密码
```

前面的是账号后面的是密码

然后分配操作权限

```bash
rabbitmqctl set_user_tags admin administrator
```

这里说下权限的级别：

1. Administrator 可以登陆控制台、查看所有信息，可以对rabbitmq进行管理
2. monitoring 监控者 可以登陆控制台、查看所有信息
3. policymaker 策略定制者 登陆控制台 指定策略
4. manmgement 普通管理员 登陆控制台

上面这四个有的玩意都不一样 反正Administrator是最大的

接下来添加能从什么地方访问

```bash
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

这里是授予这个admin在所有地方访问这个根节点的权限

**访问后一定要在admin标签内删除guest**

**访问后一定要在admin标签内删除guest**

**访问后一定要在admin标签内删除guest**

**访问后一定要在admin标签内删除guest**

**访问后一定要在admin标签内删除guest**

### docker的安装方式

先拉取下镜像

```bash
docker pull rabbitmq:management
```

接着前台启动下

```bash
docker run -d --name  rabbitmq  -p 5672:5672 -p 15672:15672 rabbitmq:management
```

接着进入容器

```bash
docker exec -it rabbitmq bash
```

然后按照正常安装的方式配置用户：

安装RabbitMQ的WEB管理界面

```bash
rabbitmq-plugins enable rabbitmq_management
```

> 说明 rabbitmq有一个账号默认账号密码是 `guest` 默认情况下是只能在localhost下访问
>
> 所以需要添加一个远程登录的账户

安装完毕后 重启服务即可

```bash
systemctl restart rabbitmq-server
```

安装完毕后访问你的`ip:15672`（注意之前要放行对应的端口）

就可以访问

当然默认你输入guest是访问不了滴

所以需要

新增用户

```bash
rabbitmqctl add_user admin 密码
```

前面的是账号后面的是密码

然后分配操作权限

```bash
rabbitmqctl set_user_tags admin administrator
```

这里说下权限的级别：

1. Administrator 可以登陆控制台、查看所有信息，可以对rabbitmq进行管理
2. monitoring 监控者 可以登陆控制台、查看所有信息
3. policymaker 策略定制者 登陆控制台 指定策略
4. manmgement 普通管理员 登陆控制台

上面这四个有的玩意都不一样 反正Administrator是最大的

接下来添加能从什么地方访问

```bash
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

这里是授予这个admin在所有地方访问这个根节点的权限

然后访问即可

![image-20211228163633439](/images/Java/SpringBoot/06-RabbitMQ/image-20211228163633439.png)

**访问后一定要在admin标签内删除guest**

**访问后一定要在admin标签内删除guest**

**访问后一定要在admin标签内删除guest**

**访问后一定要在admin标签内删除guest**

**访问后一定要在admin标签内删除guest**

### RabbitMQ的角色权限相关说明

1. None
   - 不能访问management plugin
2. management：查看自己相关节点信息
   - 列出自己可以通过AMQP登入的虚拟机
   - 查看自己的虚拟机节点 virtual hosts的queues,exchanges和bindings信息
   - 查看和关闭自己的channels和connections
   - 查看有关自己的虚拟机节点virtual hosts的统计信息。包括其他用户在这个节点virtual hosts中的活动信息。
3. Policymaker
   - 包含management所有权限
   - 查看和创建和删除自己的virtual hosts所属的policies和parameters信息。
4. Monitoring
   - 包含management所有权限
   - 罗列出所有的virtual hosts，包括不能登录的virtual hosts。
   - 查看其他用户的connections和channels信息
   - 查看节点级别的数据如clustering和memory使用情况
   - 查看所有的virtual hosts的全局统计信息。
5. Administrator
   - 最高权限
   - 可以创建和删除virtual hosts
   - 可以查看，创建和删除users
   - 查看创建permisssions
   - 关闭所有用户的connections

## RabbitMQ入门案例-Simple简单模式

### 代码实现

可以在官网看到入门案例<https://www.rabbitmq.com/getstarted.html>

我们这里就先不用springboot了 先用个原生的依赖

```xml
<dependencies>
    <!-- https://mvnrepository.com/artifact/com.rabbitmq/amqp-client -->
    <dependency>
        <groupId>com.rabbitmq</groupId>
        <artifactId>amqp-client</artifactId>
        <version>5.14.0</version>
    </dependency>

    <!--下面这两个是标配了 日至相关和lombok-->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-simple</artifactId>
        <version>1.7.32</version>
        <scope>compile</scope>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.22</version>
    </dependency>

</dependencies>
```

接下来先简单使用下

消费者

```java
public class Producer {
    @SneakyThrows
    public static void main(String[] args) {

        //        1. 创建连接工程
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("你服务器的IP");
        //        注意 这里在云上也要开放对应的端口
        connectionFactory.setPort(5672);
        //        设置账号密码
        connectionFactory.setUsername("你的账号");
        connectionFactory.setPassword("你的密码");
        //        设置虚拟访问节点 在根节点上
        connectionFactory.setVirtualHost("/");
        //        2. 创建连接Connection
        Connection connection = connectionFactory.newConnection("消费者");
        //        3. 通过连接获取Channel
        Channel channel = connection.createChannel();

        channel.basicConsume("queue1", true, new DeliverCallback() {
            @Override
            public void handle(String consumerTag, Delivery message) throws IOException {
                System.out.println("收到消息：" + new String(message.getBody()));
            }
        }, new CancelCallback() {
            @Override
            public void handle(String consumerTag) throws IOException {
                System.out.println("接收消息失败..");
            }
        });
        System.out.println("开始接受消息");
        System.in.read();
        //        close
        channel.close();
        connection.close();
    }
}
```

生产者

```java
public class Consumer {

    public static void main(String[] args) throws IOException, TimeoutException {
        //        所有中间件都是基于TCP/IP协议之上构建的新规范，rabbitmq遵循的是amqp
        //        ip :port

        //        1. 创建连接工程
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("你服务器的IP");
        //        注意 这里在云上也要开放对应的端口
        connectionFactory.setPort(5672);
        //        设置账号密码
        connectionFactory.setUsername("你的账号");
        connectionFactory.setPassword("你的密码");
        //        设置虚拟访问节点 在根节点上
        connectionFactory.setVirtualHost("/");
        //        2. 创建连接Connection
        Connection connection = connectionFactory.newConnection("生产者");
        //        3. 通过连接获取Channel
        Channel channel = connection.createChannel();
        //        4. 通过创建交换机，声明队列，绑定关系，路由key，发送消息，和接收消息
        String queueName = "queue1";
        channel.queueDeclare(
            //                队列名称
            queueName,
            //                是否要持久化 true 的话 会持久化
            false,
            //                排他性 是否是一个独占队列
            false,
            //                是否会自动删除 随着最后一个消费者消费完消息之后是否要把队列删除
            true,
            //                携带一些附加参数
            null
        );
        //        4. 准备消息内容
        String message = "hello world";
        //        6. 发送消息给队列queue
        channel.basicPublish("", queueName, null, message.getBytes(StandardCharsets.UTF_8));
        //        7. 关闭连接
        channel.close();
        //        8. 关闭通道
        connection.close();

    }
}
```

接下来先运行下这个生产者：

![image-20211228205739324](/images/Java/SpringBoot/06-RabbitMQ/image-20211228205739324.png)

你接着能在这个Queues内看到它

![image-20211228205821025](/images/Java/SpringBoot/06-RabbitMQ/image-20211228205821025.png)

并且还可以在Channels中看到一个玩意

紧接着我们运行下消费者

成功接收到了刚刚生产者发送的消息

![image-20211228210020027](/images/Java/SpringBoot/06-RabbitMQ/image-20211228210020027.png)

好了 这就是一次简单AMQP消息传递的流程

### 什么是AMQP

> AMQP的全程：Advanced Message Queuing Protocol（高级消息队列协议）
>
> 是应用层协议的一个开发标准，为面向消息的中间件

它的流程大概是这样

生产者的流程：

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy7c8a41b8-e3bf-4821-a1f1-a18860277663.png)

首先 建立连接

```java
//        1. 创建连接工程
ConnectionFactory connectionFactory = new ConnectionFactory();
connectionFactory.setHost("你服务器的IP");
//        注意 这里在云上也要开放对应的端口
connectionFactory.setPort(5672);
//        设置账号密码
connectionFactory.setUsername("你的账号");
connectionFactory.setPassword("你的密码");
//        设置虚拟访问节点 在根节点上
connectionFactory.setVirtualHost("/");
//        2. 创建连接Connection
Connection connection = connectionFactory.newConnection("生产者");
```

接下来开启通道 发送消息

```java
//        3. 通过连接获取Channel
Channel channel = connection.createChannel();
//        4. 通过创建交换机，声明队列，绑定关系，路由key，发送消息，和接收消息
String queueName = "queue1";
channel.queueDeclare(
    //                队列名称
    queueName,
    //                是否要持久化 true 的话 会持久化
    false,
    //                排他性 是否是一个独占队列
    false,
    //                是否会自动删除 随着最后一个消费者消费完消息之后是否要把队列删除
    true,
    //                携带一些附加参数
    null
);
//        4. 准备消息内容
String message = "hello world";
//        6. 发送消息给队列queue
channel.basicPublish("", queueName, null, message.getBytes(StandardCharsets.UTF_8));
```

RabbitMq为什么是基于通道去处理的，而不是连接呢？

在我们的Redis、Mysql中，存放数据之类的都是通过连接来进行管理

但是在RabbitMq中，貌似最重要的是这个连接

实际上想一想就非常清楚

向我们常用的HTTP协议

每次连接的时候 都需要请求头等一系列参数 这样就会让这个连接变得臃肿 每次连接和被连接都是需要时间的

（尤其是三次握手、四次挥手环节都消耗一定的时间）

而且每次连接又开有关会造成很大的性能开销

所以在AMQP协议中，连接是一个长连接

一个长连接内，包含很多的信道（Channel）---在我们高并发的场景下 这个信道的效率就会非常高

一个连接可能会常见多个信道来处理消息 减少了连接的开销 所以效率非常高

这就有点类似于数据库的连接池----一个连接，多次复用

接下来看看消费者的流转过程：

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy081077ba-eced-43f9-b148-6f63987f1d2f.png)

 和我们的生产者差不多 但是 这里的连接也有可能是从同一个连接内出来的

所以我们以后有可能会遇到这样的情况：连接只有一个，但是通道有非常多

### RabbitMQ的组件和架构

```java
channel.basicPublish("", queueName, null, message.getBytes(StandardCharsets.UTF_8));
```

可能你刚刚已经注意到了这个方法

这个方法内接受四个参数

1. 交换机地址
2. 队列、路由key
3. 消息的状态控制
4. 消息的内容主题

有一道面试题：可以存在没有交换机的队列吗

答：不可能的，虽然我们像上面一样没有指定交换机，但是一定会存在一个默认的**交换机**

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy62a1f9e3-027d-408a-8fb4-a176bd184d23.png)

- Broker就是我们的RabbitMq 可能同时存在多个Broker（以后集群的话会涉及到），Broker就像是Mysql的database
- 在Broker内 为了更好的区分和分辨 也整出了一个东西 ---虚拟机节点
  - 这个东西就像是电脑的硬盘那样 为了我们更好的区分 分成了类似于 c 、d、e、f盘
  - 在我们的项目中，可能我们的订单要发消息，我们的用户要发消息，我们的其他业务也要发消息，全局堆积在一个根下面的话 其实会很杂乱的，且很庞大的
  - 所以RabbitMq就整了一个虚拟机节点来做隔离，这个东西就相当于是Mysql的table那样

我们可以在Rabbit的管理面板中添加额外的节点

![image-20211228212755591](/images/Java/SpringBoot/06-RabbitMQ/image-20211228212755591.png)

添加完毕后 就能看到

![image-20211228212814207](/images/Java/SpringBoot/06-RabbitMQ/image-20211228212814207.png)

我们之后就可以在设置访问节点的时候 指定为我们的节点

```java
connectionFactory.setVirtualHost("/order");
```

接下来总结下：

> **Server**：又称Broker ,接受客户端的连接，实现AMQP实体服务。 安装rabbitmq-server
> **Connection**：连接，应用程序与Broker的网络连接 TCP/IP/ 三次握手和四次挥手
> **Channel**：网络信道，几乎所有的操作都在Channel中进行，Channel是进行消息读写的通道，客户端可以建立对各Channel，每个Channel代表一个会话任务。
> **Message** :消息：服务与应用程序之间传送的数据，由Properties和body组成，Properties可是对消息进行修饰，比如消息的优先级，延迟等高级特性，Body则就是消息体的内容。
> **Virtual Host** 虚拟地址，用于进行逻辑隔离，最上层的消息路由，一个虚拟主机理由可以有若干个Exhange和Queueu，同一个虚拟主机里面不能有相同名字的Exchange
> **Exchange**：交换机，接受消息，根据路由键发送消息到绑定的队列。(==不具备消息存储的能力==)
> **Bindings**：Exchange和Queue之间的虚拟连接，binding中可以保护多个routing key.
> **Routing key**：是一个路由规则，虚拟机可以用它来确定如何路由一个特定消息。
> **Queue**：队列：也成为Message Queue,消息队列，保存消息并将它们转发给消费者。

然后回到我们的交换机问题

我们首先让生产者再生产一条消息

然后点进这个queue内查看它的详细信息

![image-20211228213330143](/images/Java/SpringBoot/06-RabbitMQ/image-20211228213330143.png)

查看它的绑定

![image-20211228213402643](/images/Java/SpringBoot/06-RabbitMQ/image-20211228213402643.png)

可以看到 即使我们没有绑定交换机 它依旧是有一个默认的交换机

![image-20211228213436236](/images/Java/SpringBoot/06-RabbitMQ/image-20211228213436236.png)

我们也可以直接到这个面板查看所有的交换机

![image-20211228213535065](/images/Java/SpringBoot/06-RabbitMQ/image-20211228213535065.png)

非常显眼的 Default

接着点进去 看下它的绑定 上面就直接说明了

![image-20211228213606264](/images/Java/SpringBoot/06-RabbitMQ/image-20211228213606264.png)

默认交换隐式绑定到每个队列，路由键等于队列名称。无法明确绑定到默认交换或从默认交换中解除绑定。它也无法删除。

也就是 这是一个默认的交换机 当我们在开发过程中队列的名字或者路由的名字没有指定我们的交换机

所以在开发当中，我们常常都会去指定交换机

接下来再说说Routing key

路由key

我们目前开发的demo实现的效果是 一个生产者 生产的消息可能由多个消费者收到

但是实际中我们可能只想要固定类型的消费者（例如比较有钱的）收到特定的消息

那怎么辨别呢？

非常简单 就像是让富人出示钱包那样 我们可以让接收者符合一定的条件

例如：`where routerkey=XXXX`

嘛 总体流程大概是这样

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy2704cee9-3595-45de-892d-ee658e848806.png)

## 图形化操作

### 使用图形化界面完成HelloWorld

这就像是那啥一样------我们的最简单的Java Socket那样

一个人发 一个人收

![img](/images/Java/SpringBoot/06-RabbitMQ/python-one.png)

始终要记住的一点：我们无论是否指定交换机 都将有交换机来为我们处理数据 没有指定的时候用的就是默认的default交换机

我们先进入到Queues 可以看到如下内容

![image-20211228221743907](/images/Java/SpringBoot/06-RabbitMQ/image-20211228221743907.png)

它的发送消息有两种模式

![image-20211228221809042](/images/Java/SpringBoot/06-RabbitMQ/image-20211228221809042.png)

一种是不持久化（服务宕机或者重启后数据会丢失）另一种则是持久化存储

我们先补到这里发消息，而是去交换机那

![image-20211228221849246](/images/Java/SpringBoot/06-RabbitMQ/image-20211228221849246.png)

因为我们之前没有指定交换机 所以这里直接进入默认的

![image-20211228221933399](/images/Java/SpringBoot/06-RabbitMQ/image-20211228221933399.png)

我们可以在队列名称中填入我们的队列queue1

然后消息体来个 Hello RabbitMQ

然后点击发布

![image-20211228222014231](/images/Java/SpringBoot/06-RabbitMQ/image-20211228222014231.png)

发布成功会有这个提示

TIPS：这一步的时候一定要把之前的 Java接收端程序关了 不然你会发现你这个时候发送的消息在那边自动接收了

下一步我们开始接受

![image-20211228222221041](/images/Java/SpringBoot/06-RabbitMQ/image-20211228222221041.png)

注意 这里它的模式好几种

![image-20211228222253379](/images/Java/SpringBoot/06-RabbitMQ/image-20211228222253379.png)

一定要选择第一种 其他的三个都想当于实际接受了数据（会把消息从队列中删除 在生产环境中这可是一个大问题）

接着我们点击获取

![image-20211228222344554](/images/Java/SpringBoot/06-RabbitMQ/image-20211228222344554.png)

成功获取到了刚刚发送的消息

你在这里可以尝试下第二个 其他的两个就先别去试了 也可以在Queues内尝试发送消息 效果和在队列中是一样的

### Fanout-生产消费者模式-控制面板实现

就是一个消息 可以传递到多个队列中 让多个接收方接收

我们现在管理界面的交换机处创建一个新的交换机

![image-20211228222857157](/images/Java/SpringBoot/06-RabbitMQ/image-20211228222857157.png)

这个type一定要选择fanout

接下来我们去队列那创建两个队列，分别叫q2和q3吧

这个auto delete就是当最后一个message发送出去的时候是否删除整个队列 我们就保持默认no即可

实际工作中也是no较多

Durability 表示是否持久化 我们这里依旧使用默认的Durability即可 另外一个就是不持久化

![image-20211228223004267](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223004267.png)

![image-20211228223014827](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223014827.png)

创建完毕后大概这样

接着我们进入到这两个队列中 发现都没有绑定我们指定的交换机 于是可以手动绑定下

![image-20211228223317469](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223317469.png)

绑定完毕后

![image-20211228223423655](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223423655.png)

当然，也可以到交换机处绑定

![image-20211228223450574](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223450574.png)

![image-20211228223454946](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223454946.png)

接下来我们在交换机中发送消息-但是无需指定接收方

![image-20211228223706076](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223706076.png)

回到队列中 你就会发现这两个家伙都接受到消息了

![image-20211228223744663](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223744663.png)

接下来发布多条试试

![image-20211228223813850](/images/Java/SpringBoot/06-RabbitMQ/image-20211228223813850.png)

效果依旧

### Routing模式-路由模式-面板实现

看看模式

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy33427b78-879d-4511-9dd7-42fb33108339.png)

可以看到 这貌似是在发布则模式上增加了亿点点东西完成的

接下来我们创建一个对应的交换机

![image-20211228230744821](/images/Java/SpringBoot/06-RabbitMQ/image-20211228230744821.png)

注意 type要选择direct_change

接下来我们进入并绑定

![image-20211228230942800](/images/Java/SpringBoot/06-RabbitMQ/image-20211228230942800.png)、

这里routingkey 取一个自己喜欢的

然后在如法炮制一个q3 收发邮件的

![image-20211228231053723](/images/Java/SpringBoot/06-RabbitMQ/image-20211228231053723.png)

而且可以给一个队列 分配多个 routing key

![image-20211228231208575](/images/Java/SpringBoot/06-RabbitMQ/image-20211228231208575.png)

接下来我们可以指定发送的router key

![image-20211228231310698](/images/Java/SpringBoot/06-RabbitMQ/image-20211228231310698.png)

![image-20211228231325958](/images/Java/SpringBoot/06-RabbitMQ/image-20211228231325958.png)

2收到了 3 也收到了

再尝试下course

![image-20211228231408936](/images/Java/SpringBoot/06-RabbitMQ/image-20211228231408936.png)

只有2收到了

![image-20211228231432912](/images/Java/SpringBoot/06-RabbitMQ/image-20211228231432912.png)

### Topic-模糊匹配的面板实现

![img](/images/Java/SpringBoot/06-RabbitMQ/python-five.png)

创建

![image-20211228232005779](/images/Java/SpringBoot/06-RabbitMQ/image-20211228232005779.png)

注意 type要选择topic

绑定队列

![image-20211228232238825](/images/Java/SpringBoot/06-RabbitMQ/image-20211228232238825.png)

分别绑定四个

规则是有点类似于正则匹配的

- `#`：匹配路由键的一个或多个词 或者啥都不传入 可以有多个 0个 一个等
- `*`：匹配路由键的**一个词** 就是 **不能为空** 有且只有一个

上面这些的实例的话：

- com.abc.edf 能匹配上第一个
- `.sources.`能匹配上第二个
- com.source.abc 能匹配上第一个和第二个
- `order`能匹配上第三个
- `caadasd.dadasd.adsada.order.sadasd`能匹配上第三个
- `user.`能匹配上第四个
- `aaddd.user.aadas.dasdas`能匹配上第四个

### Header模式-面板实现

先创建一个交换机 选择header模式

![image-20211228235852863](/images/Java/SpringBoot/06-RabbitMQ/image-20211228235852863.png)

接着依旧是要进入添加队列

但是在添加队列的时候 可以额外指定一些参数

![image-20211228235939199](/images/Java/SpringBoot/06-RabbitMQ/image-20211228235939199.png)

![image-20211229000003575](/images/Java/SpringBoot/06-RabbitMQ/image-20211229000003575.png)

就相当于 emm  往这里存放参数 需要携带固定的header

并且我们添加参数 也可以直接指定headers的方式来进行添加

![image-20211229000040388](/images/Java/SpringBoot/06-RabbitMQ/image-20211229000040388.png)

## 代码实现

### 准备工作-工具类

简单的封装了下固定的操作为工具类使用 close可以有更多的方法来关闭 这里就先这样了

然后是通过resources下的rabbit.properties来进行配置的

实际上可以省略这个properties 自己写死在里面

```properties
host=你服务器的端口或者127.0.0.1
port=5672
username=账号
password=密码
virtualHost=/
```

实体类：

```java
public class RabbitMQ {

    public static final ConnectionFactory CONNECTION_FACTORY;

    static {
        CONNECTION_FACTORY = new ConnectionFactory();
        Properties properties = new Properties();
        try {
            properties.load(RabbitMQ.class.getClassLoader().getResourceAsStream("rabbit.properties"));
            CONNECTION_FACTORY.setHost(properties.getProperty("host"));
            CONNECTION_FACTORY.setPort(Integer.parseInt(properties.getProperty("port")));
            CONNECTION_FACTORY.setUsername(properties.getProperty("username"));
            CONNECTION_FACTORY.setPassword(properties.getProperty("password"));
            CONNECTION_FACTORY.setVirtualHost(properties.getProperty("virtualHost"));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    /**
     * 创建连接
     *
     * @param name 连接的名字
     * @return 一个RabbitMQ的连接对象
     * @throws IOException
     * @throws TimeoutException
     */
    public static Connection getConnection(String name) throws IOException, TimeoutException {
        return CONNECTION_FACTORY.newConnection(name);
    }

    /**
     * 关闭连接
     * 因为这玩意可以直接通过channel来获取connection，所以只需要传入一个即可
     *
     * @param channel
     */
    public static void close(Channel channel) {
        if (channel != null) {
            Connection connection = channel.getConnection();
            try {
                channel.close();
                connection.close();

            } catch (IOException | TimeoutException e) {
                e.printStackTrace();
            }
        }
    }


}
```

### Fanout-生产消费者模式

首先 我们之前已经创建好了对应的队列

![image-20211229131848356](/images/Java/SpringBoot/06-RabbitMQ/image-20211229131848356.png)

然后在交换机fanout-exchange中绑定了三个队列

![image-20211229131931673](/images/Java/SpringBoot/06-RabbitMQ/image-20211229131931673.png)

接着我们来使用生产者生产下消息发送到这三个队列内

```java
@SuppressWarnings("all")
public class Consumer {

    public static void main(String[] args) throws IOException, TimeoutException {
        Connection connection = RabbitMQ.getConnection("生产者");
        //        准备消息和交换机
        String message = "Hello Fanout";
        //        注意 交换机是我们之前创建好的
        String exchangeName = "fanout-exchange";
        //        路由key 我们这里不需要 所以为空
        String routeKey = "";
        //        指定交换机的类型
        String type = "fanout";
        //        投递消息
        Channel channel = connection.createChannel();
        
        channel.basicPublish(
            //                指定交换机
            exchangeName, 
            //                指定route名称 也就是队列名称
            routeKey, 
            //                指定消息的属性 
            null,
            //                消息体
            message.getBytes());
        System.out.println("消息投递成功");

        //        close
        RabbitMQ.close(channel);
    }
}

```

然后可以在消息列表内看到我们的三个消息

![image-20211229132158261](/images/Java/SpringBoot/06-RabbitMQ/image-20211229132158261.png)

然后我们使用线程来创建三个消费者

```java
public class Producer {

    public static void runPro(String queueName) {
        Channel channel = null;
        try {
            //        获取连接
            Connection connection = RabbitMQ.getConnection("消费者");
            //        获取channel
            channel = connection.createChannel();
            channel.basicConsume(
                //                    队列的名称
                queueName,
                //                    是否是取出消息
                true,
                //                    接收成功的回调
                new DeliverCallback() {
                    @Override
                    public void handle(String consumerTag, Delivery message) throws IOException {
                        System.out.println("消费者在队列" + queueName + "接收到消息：" + new String(message.getBody()));
                    }
                },
                //                    接受失败的回调
                new CancelCallback() {
                    @Override
                    public void handle(String consumerTag) throws IOException {
                        System.out.println("消费者在队列" + queueName + "接收失败");
                    }
                }
            );
        } catch (IOException | TimeoutException e) {
            throw new RuntimeException(e);
        } finally {
            if (channel != null) {
                RabbitMQ.close(channel);
            }
        }
    }

    @SuppressWarnings("all")
    public static void main(String[] args) {
        //        开启三个线程模拟并发获取
        new Thread(
            () -> {
                runPro("q1");
            }
        ).start();
        new Thread(
            () -> {
                runPro("q2");
            }
        ).start();
        new Thread(
            () -> {
                runPro("q3");
            }
        ).start();

    }

}
```

接着运行 可以看到 成功接收到了对应的消息

```md
消费者在队列q1接收到消息：Hello Fanout
消费者在队列q2接收到消息：Hello Fanout
消费者在队列q3接收到消息：Hello Fanout
```

同时队列内的消息也是同步变成0了

![image-20211229132449143](/images/Java/SpringBoot/06-RabbitMQ/image-20211229132449143.png)

### Routing-路由模式

我们现在的route-exchange交换机绑定如下

![image-20211229142319931](/images/Java/SpringBoot/06-RabbitMQ/image-20211229142319931.png)

接下来使用它给email发送消息

```java {11,13,15}
@SuppressWarnings("all")
public class Consumer {

    public static void main(String[] args) throws IOException, TimeoutException {

        Connection connection = RabbitMQ.getConnection("生产者");

//        准备消息和交换机
        String message = "Hello Routing";
//        注意 交换机是我们之前创建好的
        String exchangeName = "routing_exchange";
//        路由key
        String routeKey = "email";
//        指定交换机的类型
        String type = "direct";

//        投递消息
        Channel channel = connection.createChannel();
        channel.basicPublish(
//                指定交换机
                exchangeName,
//                指定route名称 也就是队列名称
                routeKey,
//                指定消息的属性
                null,
//                消息体
                message.getBytes());
        System.out.println("消息投递成功");

//        close
        RabbitMQ.close(channel);


    }

}

```

接收

```java
public class Producer {

    public static void runPro(String queueName) {
        Channel channel = null;
        try {
            //        获取连接
            Connection connection = RabbitMQ.getConnection("消费者");
//        获取channel
            channel = connection.createChannel();
            channel.basicConsume(
//                    队列的名称
                    queueName,
//                    是否是取出消息
                    true,
//                    接收成功的回调
                    new DeliverCallback() {
                        @Override
                        public void handle(String consumerTag, Delivery message) throws IOException {
                            System.out.println("消费者在队列" + queueName + "接收到消息：" + new String(message.getBody()));
                        }
                    },
//                    接受失败的回调
                    new CancelCallback() {
                        @Override
                        public void handle(String consumerTag) throws IOException {
                            System.out.println("消费者在队列" + queueName + "接收失败");
                        }
                    }
            );
        } catch (IOException | TimeoutException e) {
            throw new RuntimeException(e);
        } finally {
            if (channel != null) {
                RabbitMQ.close(channel);
            }
        }
    }

    @SuppressWarnings("all")
    public static void main(String[] args) {
//        开启三个线程模拟并发获取
        new Thread(
                () -> {
                    runPro("q1");
                }
        ).start();
        new Thread(
                () -> {
                   runPro("q2");
                }
        ).start();
        new Thread(
                () -> {
                    runPro("q3");
                }
        ).start();

    }


}
```

### Topic-模糊匹配

交换机如图

![image-20211229143147758](/images/Java/SpringBoot/06-RabbitMQ/image-20211229143147758.png)

我们现在想让q2和q4收到消息

```java {10,12,14}
public class Consumer {

    public static void main(String[] args) throws IOException, TimeoutException {

        Connection connection = RabbitMQ.getConnection("生产者");

//        准备消息和交换机
        String message = "Hello Topic";
//        注意 交换机是我们之前创建好的
        String exchangeName = "topic_exchange";
//        路由key
        String routeKey = "com.abc.order.myfilter";
//        指定交换机的类型
        String type = "topic";

//        投递消息
        Channel channel = connection.createChannel();
        channel.basicPublish(
//                指定交换机
                exchangeName,
//                指定route名称 也就是队列名称
                routeKey,
//                指定消息的属性
                null,
//                消息体
                message.getBytes());
        System.out.println("消息投递成功");

//        close
        RabbitMQ.close(channel);


    }

}
```

这样既可 接收的话看之前的代码

## 通过代码来完成绑定交换机和队列

通常情况下来说 我们都需要在程序内提前声明好对应的交换机和队列 可以在发送方声明 也可以在接收方声明

```java {9-38}
@SuppressWarnings("all")
public class Consumer {

    public static void main(String[] args) throws IOException, TimeoutException {

        Connection connection = RabbitMQ.getConnection("生产者");
        Channel channel = connection.createChannel();

//        准备消息和交换机
        String message = "Hello driect";
//        创建自己的交换机
        String exchangeName = "direct_message_exchange";
//        指定交换机的类型
        String type = "direct";

//        创建一个交换机 第一个参数名字 第二个参数类型 第三个参数表示是否持久化
        channel.exchangeDeclare(exchangeName, type, true);

//        声明队列
        channel.queueDeclare(
//                队列名称
                "f1",
//                是否持久化
                true,
//                是否为独占的队列（只有我们当前这个连接可以用）
                false,
//                是否自动删除
                false,
//                队列需要携带的参数 这个是只有我们在使用header模式才需要用的 可以接收一个Map<String,Object>的参数
                null
        );
        channel.queueDeclare("f2", true, false, false, null);
        channel.queueDeclare("f3", true, false, false, null);

//        绑定队列和交换机的关系
        channel.queueBind("f1", exchangeName, "order");
        channel.queueBind("f2", exchangeName, "order");
        channel.queueBind("f3", exchangeName, "course");


//        路由key
        String routeKey = "order";
        channel.basicPublish(
//                指定交换机
                exchangeName,
//                指定route名称 也就是队列名称
                routeKey,
//                指定消息的属性
                null,
//                消息体
                message.getBytes());
        System.out.println("消息投递成功");
//        close
        RabbitMQ.close(channel);

    }

}

```

接下来接收消息

```java
public class Producer {

    public static void runPro(String queueName) {
        Channel channel = null;
        try {
            //        获取连接
            Connection connection = RabbitMQ.getConnection("消费者");
//        获取channel
            channel = connection.createChannel();
            channel.basicConsume(
//                    队列的名称
                    queueName,
//                    是否是取出消息
                    true,
//                    接收成功的回调
                    new DeliverCallback() {
                        @Override
                        public void handle(String consumerTag, Delivery message) throws IOException {
                            System.out.println("消费者在队列" + queueName + "接收到消息：" + new String(message.getBody()));
                        }
                    },
//                    接受失败的回调
                    new CancelCallback() {
                        @Override
                        public void handle(String consumerTag) throws IOException {
                            System.out.println("消费者在队列" + queueName + "接收失败");
                        }
                    }
            );
            System.in.read();
        } catch (IOException | TimeoutException e) {
            throw new RuntimeException(e);
        } finally {
            if (channel != null) {
                RabbitMQ.close(channel);
            }
        }
    }

    @SuppressWarnings("all")
    public static void main(String[] args) {
//        开启三个线程模拟并发获取
        new Thread(
                () -> {
                    runPro("f1");
                }
        ).start();
        new Thread(
                () -> {
                    runPro("f2");
                }
        ).start();
        new Thread(
                () -> {
                    runPro("f3");
                }
        ).start();

    }


}
```

发送多次测试 均只有1.2接收到了消息

![image-20211229150022504](/images/Java/SpringBoot/06-RabbitMQ/image-20211229150022504.png)

## Work-工作队列模式

这个模式分为两种

- 轮询模式：一个消费者只能消费一条消息，**按均分配**
- 公平分发模式：根据消费者的能力进行公平分配，处理快的处理的多，反之亦然，按劳分配

![img](/images/Java/SpringBoot/06-RabbitMQ/python-two.png)

### 轮询模式

RabbitMQ默认就是这个模式 比较公平 接下来用代码测试下

发布着 发布十条消息

```java
String queueName = "queue1";
// 注意要把自动删除设置为false
channel.queueDeclare(queueName, false, false, false, null);
for (int i = 1; i <= 10; i++) {
    String message = "hello world" + i;
    channel.basicPublish("", queueName, null, message.getBytes(StandardCharsets.UTF_8));
}
```

消费者代码

```java
public class Producer {

    public static void runPro(String name, String queueName, long time) {
        Channel channel = null;
        try {
            Connection connection = RabbitMQ.getConnection("消费者");
            channel = connection.createChannel();
            long finalTime = time;
            channel.basicConsume(
                queueName,
                true,
                new DeliverCallback() {
                    @Override
                    public void handle(String consumerTag, Delivery message) {
                        System.out.println(name + "在队列" + queueName + "接收到消息：" + new String(message.getBody()));
                        try {
                            Thread.sleep(finalTime);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                },
                //                    接受失败的回调
                new CancelCallback() {
                    @Override
                    public void handle(String consumerTag) throws IOException {
                        System.out.println(name + "在队列" + queueName + "接收失败");
                    }
                }
            );
            System.in.read();
        } catch (IOException | TimeoutException e) {
            throw new RuntimeException(e);
        } finally {
            if (channel != null) {
                RabbitMQ.close(channel);
            }
        }
    }

    @SuppressWarnings("all")
    public static void main(String[] args) {
        //        开启三个线程模拟并发获取
        new Thread(
            () -> {
                runPro("消费者1", "queue1", 1000);
            }
        ).start();
        new Thread(
            () -> {
                runPro("消费者2", "queue1", 100);
            }
        ).start();
    }
}

```

接着我们先运行第一次生产者和消费者

```md
消费者2在队列queue1接收到消息：hello world1
消费者1在队列queue1接收到消息：hello world2
消费者2在队列queue1接收到消息：hello world3
消费者2在队列queue1接收到消息：hello world5
消费者2在队列queue1接收到消息：hello world7
消费者2在队列queue1接收到消息：hello world9
消费者1在队列queue1接收到消息：hello world4
消费者1在队列queue1接收到消息：hello world6
消费者1在队列queue1接收到消息：hello world8
消费者1在队列queue1接收到消息：hello world10
```

你就能看到 虽然说消费者1比消费者2慢非常多

消费者2 每100毫秒获取一次

消费者2 每1秒获取一次

但是他们那两个最终获取到的东西都是相同的

消费者1 获取到了 1 3 5 7 9

2 获取到了 2 4 6 8 10

这就是轮询模式----无论多少人 始终保持平均分配

### 公平分发模式

公平分发必须改为手动应答，不然怎么知道你啥时候处理完，又怎么能实现能者多劳。因此就需要手动应答了

这里先放代码

```java {14-17,21-22,33-34}
public class Producer {

    public static void runPro(String name, String queueName, long time) {
        Channel channel = null;
        try {
            //        获取连接
            Connection connection = RabbitMQ.getConnection("消费者");
//        获取channel
            channel = connection.createChannel();
            // 定义常量 方便在内部类中读取
            long finalTime = time;
            Channel finalChannel = channel;
            
//            qos代表的就是每次从队列中取出的数据量  这个根据服务器的好坏来决定 例如以后每秒有一千条数据 五台服务器  就可以设置为1000/5/2=100 
//            当然 这也只是估算值 建议的话保持1  速率也是非常快的 除非有特殊需求 再设定为指定的数值才是好的
//            例如 网站每天要处理海量的数据
            finalChannel.basicQos(1);
            channel.basicConsume(
//                    队列的名称
                    queueName,
//                    是否是取出消息 注意 这类要设置为false 取消自动应答 让我们来手动应答消息
                    false,
//                    接收成功的回调
                    new DeliverCallback() {
                        @Override
                        public void handle(String consumerTag, Delivery message) throws IOException {
                            System.out.println(name + "在队列" + queueName + "接收到消息：" + new String(message.getBody()));
                            try {
                                Thread.sleep(finalTime);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
//                            这里是手动应答消息
                            finalChannel.basicAck(message.getEnvelope().getDeliveryTag(),false);
                        }
                    },
//                    接受失败的回调
                    new CancelCallback() {
                        @Override
                        public void handle(String consumerTag) throws IOException {
                            System.out.println(name + "在队列" + queueName + "接收失败");
                        }
                    }
            );
            System.in.read();
        } catch (IOException | TimeoutException e) {
            throw new RuntimeException(e);
        } finally {
            if (channel != null) {
                RabbitMQ.close(channel);
            }
        }
    }

    @SuppressWarnings("all")
    public static void main(String[] args) {
//        开启三个线程模拟并发获取
        new Thread(
                () -> {
                    runPro("消费者1", "queue1", 1000);
                }
        ).start();
        new Thread(
                () -> {
                    runPro("消费者2", "queue1", 100);
                }
        ).start();


    }


}
```

运行结果：能者多劳

```md
消费者2在队列queue1接收到消息：hello world1
消费者1在队列queue1接收到消息：hello world2
消费者2在队列queue1接收到消息：hello world3
消费者2在队列queue1接收到消息：hello world5
消费者2在队列queue1接收到消息：hello world7
消费者2在队列queue1接收到消息：hello world9
消费者1在队列queue1接收到消息：hello world4
消费者1在队列queue1接收到消息：hello world6
消费者1在队列queue1接收到消息：hello world8
消费者1在队列queue1接收到消息：hello world10
```

## RabbitMq的实际应用场景

<https://www.bilibili.com/video/BV1dX4y1V73G?p=26&spm_id_from=pageDriver>

这里面的面试部分建议全文背诵

然后这里用一个简单的例子

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy3c16e7cd-e504-497e-a9fc-2260f74e5e51.png)

我们平常如果给用户发一个消息的话，需要三步 并且都需要时间

这时候可以考虑用线程池来解决

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy29bb193d-94fe-41a5-8d53-8e460316a7ba.png)

当然在Java中线程从来不是一个简单的东西…维护之类的极其繁琐，并且耦合性极高

存在问题：
1：耦合度高
2：需要自己写线程池自己维护成本太高
3：出现了消息可能会丢失，需要你自己做消息补偿
4：如何保证消息的可靠性你自己写
5：如果服务器承载不了，你需要自己去写高可用

所以我们就可以用RabbitMQ的异步消息队列模式

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudydfbeb825-015d-4be0-abba-d2dc7084cb84.png)

**好处**
1：完全解耦，用MQ建立桥接
2：有独立的线程池和运行模型
3：出现了消息可能会丢失，MQ有持久化功能
4：如何保证消息的可靠性，死信队列和消息转移的等
5：如果服务器承载不了，你需要自己去写高可用，HA镜像模型高可用。
按照以上约定，用户的响应时间相当于是订单信息写入数据库的时间，也就是50毫秒。注册邮件，发送短信写入消息队列后，直接返回，因此写入消息队列的速度很快，基本可以忽略，因此用户的响应时间可能是50毫秒。因此架构改变后，系统的吞吐量提高到每秒20 QPS。比串行提高了3倍，比并行提高了两倍

并且还可以通过它来对整个项目进行解耦合 使维护更加方便

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudya1f53997-b01d-443f-98cd-86a38223fe19.png)

还可以完成非常有效的秒杀队列、流量削峰

04、分布式事务的可靠消费和可靠生产
05、索引、缓存、静态化处理的数据同步
06、流量监控
07、日志监控（ELK）
08、下单、订单分发、抢票

## SpringBoot整合RabbitMQ

### 添加依赖

我们先创建一个project

![image-20211229170017594](/images/Java/SpringBoot/06-RabbitMQ/image-20211229170017594.png)

首先 可以在pom中看到这样一个依赖包

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

然后依赖有这些

![image-20211229170546479](/images/Java/SpringBoot/06-RabbitMQ/image-20211229170546479.png)

跟着包我们可以直接进入spring的autoconfiguration中查看

![image-20211229170232886](/images/Java/SpringBoot/06-RabbitMQ/image-20211229170232886.png)

在autoconfiguration内

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass({ RabbitTemplate.class, Channel.class })
@EnableConfigurationProperties(RabbitProperties.class)
@Import({ RabbitAnnotationDrivenConfiguration.class, RabbitStreamConfiguration.class })
public class RabbitAutoConfiguration {
   
    // 这里一堆bean
    
}
```

绑定的是`RabbitProperties`这个配置类

接下来看看这个文件中绑定的是哪个配置项

```java {1}
@ConfigurationProperties(prefix = "spring.rabbitmq")
public class RabbitProperties {
    // 相关的配置
}
```

可以得出 我们以后只需要修改spring.rabbitmq中的配置即可

然后还可以看到 里面有一个默认的账号和密码可以给我们使用

```java
private String host = "localhost";
private Integer port;
private String username = "guest";
private String password = "guest";
```

### 修改配置文件

```yaml
spring:
  rabbitmq:
    host: 你的服务器IP
    port: 5672
    username: 你的账户名
    password: 你的密码
    virtual-host: /
```

### Fanout模式-生产者

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy61c5b87b-d787-4d62-9e7c-85e8f26b02f8.png)

开始之前 我们先把所有用不上的交换机和队列之类的都删了（就像是恢复到刚刚装上那样）

![image-20211229173328022](/images/Java/SpringBoot/06-RabbitMQ/image-20211229173328022.png)

接下来我们先写一个service

```java {26}
@Service
@Slf4j
public class OrderService {

    @Autowired
    RabbitTemplate rabbitTemplate;

    /**
     * 模拟用户下单
     *
     * @param userId
     * @param productId
     * @param num
     */
    public void markOrder(String userId, String productId, int num) {
        //        1 根据商品id查询商品是否充足
        //        2 保存订单
        String orderId = UUID.randomUUID().toString();
        log.info("用户下单，订单id：{}", orderId);
        //        3 通过MQ完成消息的分发
        //        参数1 交换机
        String exchangeName = "fanout_order_exchange";
        //        参数2 路由key/queue队里名称
        String routingKey = "";
        //        参数3 消息内容
        rabbitTemplate.convertAndSend(exchangeName,routingKey,orderId);

    }

}

```

现在service有了 我们该如何创建交换机和队列以及让他们互相关联呢？

其实非常简单 我们先创建一个RabbitMQ的配置类RabbitMqConfiguration

然后

```java
@Configuration
public class RabbitMqConfiguration {

    /**
     * 1. 声明fanout模式的交换机
     *
     * @return
     */
    @Bean
    public FanoutExchange fanoutExchange() {
        //        第二个参数是持久化 第三个是是否自动删除
        return new FanoutExchange("fanout_order_exchange", true, false);
    }

    /**
     * 2. 声明队列
     * sms.fanout.queue
     * email.fanout.queue
     * duanxin.fanout.queue
     *
     * @return
     */
    @Bean
    public Queue smsQueue() {
        //        第二个参数：开启持久化
        return new Queue("sms.fanout.queue", true);
    }

    @Bean
    public Queue emailQueue() {
        //        第二个参数：开启持久化
        return new Queue("email.fanout.queue", true);
    }

    @Bean
    public Queue duanxinQueue() {
        //        第二个参数：开启持久化
        return new Queue("duanxin.fanout.queue", true);
    }

    /**
     * 3. 将队列绑定到交换机
     *
     * @return
     */
    @Bean
    public Binding smsBinding() {
        //        把指定的队列绑定到指定的交换机上
        return BindingBuilder.bind(smsQueue()).to(fanoutExchange());
    }

    @Bean
    public Binding emailBinding() {
        //        把指定的队列绑定到指定的交换机上
        return BindingBuilder.bind(emailQueue()).to(fanoutExchange());
    }

    @Bean
    public Binding duanxinBinding() {
        //        把指定的队列绑定到指定的交换机上
        return BindingBuilder.bind(duanxinQueue()).to(fanoutExchange());
    }
}
```

接下来使用

```java
@SpringBootTest
class OrderServiceTest {
    @Autowired
    OrderService orderService;

    @Test
    void markOrder() {
    orderService.markOrder("1","1",12);
    }
}
```

Log内成功打印了如下内容 80d0bf04-43ec-4553-8ff9-f1d8957f4d46

![image-20211229181417541](/images/Java/SpringBoot/06-RabbitMQ/image-20211229181417541.png)

接下来我们看下rabbitmq

![image-20211229181448440](/images/Java/SpringBoot/06-RabbitMQ/image-20211229181448440.png)

三个队列内都有消息了 现在随便打开一个看看获取到的消息内容

![image-20211229181508511](/images/Java/SpringBoot/06-RabbitMQ/image-20211229181508511.png)

和我们发送的一模一样

好了，接下来我们该完成消费者的部分

### Fanout模式-消费者

我们先创建一个fanout文件夹，然后依次创建三个类

- `@RabbitListener(queues = "duanxin.fanout.queue")`代表要监听的队列
- `@RabbitHandler`表示接收到消息执行的回调

```java
@Component
@RabbitListener(queues = "duanxin.fanout.queue")
@Slf4j(topic = "FanoutDuanxinConsumer")
public class FanoutDuanxinConsumer {

    @RabbitHandler
    public void reviseMessage(String message) {
        log.info("FanoutDuanxinConsumer队列接收到了消息：{}", message);
    }

}
```

上面这个是短信的，再创建一个sms和一个email的

```java
@Component
@RabbitListener(queues = "email.fanout.queue")
@Slf4j(topic = "FanoutEmailConsumer")
public class FanoutEmailConsumer {
    @RabbitHandler
    public void process(String msg) {
        log.info("FanoutEmailConsumer接收到消息：{}", msg);
    }
}

```

```java
@Component
@RabbitListener(queues = "sms.fanout.queue")
@Slf4j(topic = "FanoutSmsConsumer")
public class FanoutSmsConsumer {

    @RabbitHandler
    public void receive(String msg) {
        log.info("FanoutSmsConsumer接收到了消息: {}", msg);
    }
}
```

最终结构如下

![image-20211229193954231](/images/Java/SpringBoot/06-RabbitMQ/image-20211229193954231.png)

然后我们启动这个application

![image-20211229194006577](/images/Java/SpringBoot/06-RabbitMQ/image-20211229194006577.png)

启动完毕后是什么都没有的

但是紧接着运行我们之前测试类内的消费者

![image-20211229194059678](/images/Java/SpringBoot/06-RabbitMQ/image-20211229194059678.png)

得到了订单号763c256b-7c28-40a3-a8ba-460abdebadb3

我们再回到application进程中

![image-20211229194120447](/images/Java/SpringBoot/06-RabbitMQ/image-20211229194120447.png)

可以看到成功接收到了消息..

### Routing(direct)模式-路由

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy61c5b87b-d787-4d62-9e7c-85e8f26b02f8-16407782199107.png)

应该是这样的

所以我们应该先去定义下对应的交换机和队列的关系 然后再通过交换机投递消息

```java {10,12,48,53,58,38,32,26}
@Configuration
public class RabbitMqConfiguration {

    /**
     * 1. 声明 Direct模式的交换机
     *   
     * @return
     */
    @Bean
    public DirectExchange fanoutExchange() {
        //        第二个参数是持久化 第三个是是否自动删除
        return new DirectExchange("direct_order_exchange", true, false);
    }

    /**
     * 2. 声明队列
     * sms.fanout.queue
     * email.fanout.queue
     * duanxin.fanout.queue
     *
     * @return
     */
    @Bean
    public Queue smsQueue() {
        //        第二个参数：开启持久化  注意明明规范 路由模式要以xxx.direct.xxx命名
        return new Queue("sms.direct.queue", true);
    }

    @Bean
    public Queue emailQueue() {
        //        第二个参数：开启持久化
        return new Queue("email.direct.queue", true);
    }

    @Bean
    public Queue duanxinQueue() {
        //        第二个参数：开启持久化
        return new Queue("duanxin.direct.queue", true);
    }

    /**
     * 3. 将队列绑定到交换机 同时指定绑定的路由key
     *    with("xxxx");绑定的同时指定路由key 
     * @return
     */
    @Bean
    public Binding smsBinding() {
        return BindingBuilder.bind(smsQueue()).to(fanoutExchange()).with("sms");
    }

    @Bean
    public Binding emailBinding() {
        return BindingBuilder.bind(emailQueue()).to(fanoutExchange()).with("email");
    }

    @Bean
    public Binding duanxinBinding() {
        return BindingBuilder.bind(duanxinQueue()).to(fanoutExchange()).with("duanxin");
    }
}

```

接着在我们的service中添加对应的方法

```java {30-47}
@Service
@Slf4j
public class OrderService {

    @Autowired
    RabbitTemplate rabbitTemplate;

    /**
     * 模拟用户下单
     *
     * @param userId
     * @param productId
     * @param num
     */
    public void markOrder(String userId, String productId, int num) {
//        1 根据商品id查询商品是否充足
//        2 保存订单
        String orderId = UUID.randomUUID().toString();
        log.info("用户下单，订单id：{}", orderId);
//        3 通过MQ完成消息的分发
//        参数1 交换机
        String exchangeName = "fanout_order_exchange";
//        参数2 路由key/queue队里名称
        String routingKey = "";
//        参数3 消息内容
        rabbitTemplate.convertAndSend(exchangeName, routingKey, orderId);

    }

    /**
     * 通过Driect(精准匹配，也叫路由)模式完成消息的分发
     * @param userId
     * @param productId
     * @param num
     */
    public void makeOrderDirect(String userId, String productId, int num) {
//        1 根据商品id查询商品是否充足
//        2 保存订单
        String orderId = UUID.randomUUID().toString();
        log.info("用户下单，订单id：{}", orderId);
//        3 通过MQ完成消息的分发
//        参数1 交换机
        String exchangeName = "direct_order_exchange";
//        参数3 消息内容 第一个参数指定交换机 第二个参数指定路由key 第三个参数指定内容
        rabbitTemplate.convertAndSend(exchangeName, "sms", orderId);
        rabbitTemplate.convertAndSend(exchangeName, "email", orderId);
    }
}

```

消费者和fanout内是一模一样的

接下来我们在测试类中改动下方法的调用

```java
@SpringBootTest
class OrderServiceTest {
    @Autowired
    OrderService orderService;

    @Test
    void markOrder() {
        orderService.makeOrderDirect("1", "1", 12);
    }
}
```

紧接着 因为我们更改了队列名 所以说在监听队列的类中也要做相应的变动

```java {2}
@Component
@RabbitListener(queues = "duanxin.direct.queue")
@Slf4j(topic = "FanoutDuanxinConsumer")
public class FanoutDuanxinConsumer {

    @RabbitHandler
    public void reviseMessage(String message) {
        log.info("FanoutDuanxinConsumer队列接收到了消息：{}", message);
    }

}
```

这里就不放另外两个了  按照这个方式改动下即可，当然你也可以为了规范把类名之类的都改成DriectXXXXX

然后先启动主线程，再启动测试类

![image-20211229195750062](/images/Java/SpringBoot/06-RabbitMQ/image-20211229195750062.png)

我们代码中是制定了向sms和email发送消息

然后发送了c036ba6e-054c-449d-a4c3-12264adbccba

接下来回到application进程 看看效果

![image-20211229195828914](/images/Java/SpringBoot/06-RabbitMQ/image-20211229195828914.png)

只有email和sms收到了消息

#### 关于交换机和队列的绑定放在生产者还是消费者的问题

我们实际开发过程中

生产者和消费者可能是分开来的

例如 两个java进程 均不知道是否有对方的存在

这个时候我们的配置文件（交换机和队列绑定的configuration）应该放在谁那里呢？

通常情况下为了排除错误之类 一般两边都会放  但如果是实际生产环境中 有可能是偏向于只放在**消费者那儿**

在启动过程中 如果消费者没有找到队列 会直接报错（消费者只和队列打交道）

### TOPIC模式-模糊匹配（额外附带注解替换配置类）

嘛 之前总是通过配置类来配置太麻烦了 这次用注解吧

其实蛮简单的

但是实际开发中并不推荐这样用 更难维护了..

PS：这个@RabbitListener注解官方是推荐放在方法上 但是大部分都是放在类上 更好辨别

```java
@Component
@RabbitListener(
    bindings = @QueueBinding(
        // 配置队列 第一个队列名 第二个是否持久化 第三个是否自动删除 md这开发者脑袋有点问题 好好的布尔值不用非要用字符串
        value = @Queue(value = "duanxin.topic.queue", declare = "true", autoDelete = "false"),
        // 配置交换机 第二个参数是交换机的类型 要用ExchangeTypes枚举类指定
        exchange = @Exchange(value = "topic_order_exchange", type = ExchangeTypes.TOPIC),
        // 这里是配置router key 按照我们之前topic的规则来即可
        key = "#.duanxin.#"
    )
)
@Slf4j(topic = "TopicDuanxinConsumer")
public class TopicDuanxinConsumer {

    @RabbitHandler
    public void reviseMessage(String message) {
        log.info("TopicDuanxinConsumer队列接收到了消息：{}", message);
    }

}

```

接下来另外两个同理

```java
@Component
@RabbitListener(
    bindings = @QueueBinding(
        value = @Queue(value = "email.topic.queue", declare = "true", autoDelete = "false"),
        exchange = @Exchange(value = "topic_order_exchange", type = ExchangeTypes.TOPIC),
        key = "#.email.#"
    )
)
@Slf4j(topic = "TopicEmailConsumer")
public class TopicEmailConsumer {
    @RabbitHandler
    public void process(String msg) {
        log.info("TopicEmailConsumer接收到消息：{}", msg);
    }
}
```

```java
@Component
@RabbitListener(
    bindings = @QueueBinding(
        value = @Queue(value = "sms.topic.queue", declare = "true", autoDelete = "false"),
        exchange = @Exchange(value = "topic_order_exchange", type = ExchangeTypes.TOPIC),
        key = "#.sms.#"
    )
)
@Slf4j(topic = "TopicSmsConsumer")
public class TopicSmsConsumer {

    @RabbitHandler
    public void receive(String msg) {
        log.info("TopicSmsConsumer接收到了消息: {}", msg);
    }
}
```

然后我们继续来写一下生产者内的方法

```java

public void makeOrderTopic(String userId, String productId, int num) {
    //        1 根据商品id查询商品是否充足
    //        2 保存订单
    String orderId = UUID.randomUUID().toString();
    log.info("用户下单，订单id：{}", orderId);
    //        3 通过MQ完成消息的分发
    //        参数1 交换机
    String exchangeName = "topic_order_exchange";
    //        参数3 消息内容
    rabbitTemplate.convertAndSend(exchangeName, "com.abcdefg.email.aaa", orderId);
}
```

接着先启动消费者的application

然后再到生产者的测试类内调用这个方法

```java
@SpringBootTest
class OrderServiceTest {
    @Autowired
    OrderService orderService;

    @Test
    void markOrder() {
        orderService.makeOrderTopic("1", "1", 12);
    }
}
```

结果：

![image-20211229203720902](/images/Java/SpringBoot/06-RabbitMQ/image-20211229203720902.png)

![image-20211229203726541](/images/Java/SpringBoot/06-RabbitMQ/image-20211229203726541.png)

## RabbitMQ高级开发

在之前的学习中 我们始终没有说到过在队列中的这些东西

![image-20211229204411755](/images/Java/SpringBoot/06-RabbitMQ/image-20211229204411755.png)

接下来一个一个的说明

### 过期时间TTL

> 过期时间TTL表示可以对消息设置预期的时间
>
> 在这个时间内都可以被消费者消费获取
>
> 过了之后消息将自动删除
>
> RabbitMQ可以对 **消息和队列** 设置TTL 目前有两种方式来设置
>
> - 第一种方式是通过队列属性设置，队列中的所有消息都有相同的过期时间
> - 第二种方式是对消息进行单独设置，每条消息都将可以不同
>
> 如果上述两种方式同时使用，则过期时间取两者内更短的那个数值
>
> 消息队列的消息一旦超过设置的ttl值，就成为dead message 被投递到死信队列
>
> 消费者将无法收到该类消息

我们设置ttl非常简单

#### 给队列设置过期时间

```java {24-33}
@Configuration
public class RabbitMqConfiguration {

    /**
     * 1. 声明fanout模式的交换机
     *
     * @return
     */
    @Bean
    public DirectExchange ttlDirectExchange() {
//        第二个参数是持久化 第三个是是否自动删除
        return new DirectExchange("ttl_direct_order_exchange", true, false);
    }

    /**
     * 2. 声明队列
     * sms.fanout.queue
     * email.fanout.queue
     * duanxin.fanout.queue
     *
     * @return
     */
    @Bean
    public Queue ttlSmsQueue() {
        HashMap<String, Object> args = new HashMap<>();
//        设置队列的过期时间 单位是毫秒 这里一定得是一个int类型（整形） 不然会报错
        args.put("x-message-ttl", 10000);
//        第二个参数 是否持久化
//        第三个参数 是否是单前连接私有队列
//        第四个参数 是否自动删除
//        第五个参数 为我们的args-附带额外值
        return new Queue("ttl.sms.fanout.queue", true, false, false, args);
    }


    /**
     * 3. 将队列绑定到交换机 同时指定绑定的路由key
     *
     * @return
     */
    @Bean
    public Binding smsBinding() {
        return BindingBuilder.bind(ttlSmsQueue()).to(ttlDirectExchange()).with("sms");
    }


}

```

绑定任意的交换机都可

接着我们正常写service即可

```java
public void ttlMakeOrderDirect(String userId, String productId, int num) {
    //        1 根据商品id查询商品是否充足
    //        2 保存订单
    String orderId = UUID.randomUUID().toString();
    log.info("用户下单，订单id：{}", orderId);
    //        3 通过MQ完成消息的分发
    //        参数1 交换机
    String exchangeName = "ttl_direct_order_exchange";
    //        参数3 消息内容
    rabbitTemplate.convertAndSend(exchangeName, "sms", orderId);
    rabbitTemplate.convertAndSend(exchangeName, "email", orderId);
}
```

十秒内访问（我们设置的过期时间是10秒）

![image-20211229211750899](/images/Java/SpringBoot/06-RabbitMQ/image-20211229211750899.png)

十秒后访问

![image-20211229211808038](/images/Java/SpringBoot/06-RabbitMQ/image-20211229211808038.png)

并且可以看到上面有一个配置项

![image-20211229211847472](/images/Java/SpringBoot/06-RabbitMQ/image-20211229211847472.png)

明确的说明了过期时间

并且还能在队列内明确的发现 这是一个带有TTL过期时间的队列

![image-20211229211944694](/images/Java/SpringBoot/06-RabbitMQ/image-20211229211944694.png)

但是这个过期并非是真正的删除 还有一个死信队列可以来接收过期的队列

#### 给消息设置单独的过期时间

**无论消息队列是否是ttl的 都可以这样单独的给一条消息设置过期时间 但是实际上并不怎么会用这个方式**

如果说队列和消息均有过期时间，则使用更短的那个

```java {10-20}
    public void ttlMakeOrderDirect(String userId, String productId, int num) {
//        1 根据商品id查询商品是否充足
//        2 保存订单
        String orderId = UUID.randomUUID().toString();
        log.info("用户下单，订单id：{}", orderId);
//        3 通过MQ完成消息的分发
//        参数1 交换机
        String exchangeName = "direct_order_exchange";
//        参数3 消息内容
        rabbitTemplate.convertAndSend(exchangeName, "sms", orderId,
                new MessagePostProcessor() {
                    @Override
                    public Message postProcessMessage(Message message) throws AmqpException {
                        // 设置过期时间
                        message.getMessageProperties().setExpiration("5000");
                        // 设置编码
                        message.getMessageProperties().setContentType("UTF-8");
                        return message;
                    }
                }
        );
    }
```

### 死信队列

当消息在一个队列变成死信后，可以被重新发送到另一个交换机内，这个交换机就是DLX（dead leffet exchange）绑定的DLX就被称之为死信队列

消息变成死信可能是由于如下原因

- 消息被拒绝
- 消息过期
- 队列达到最大长度

DLX也是一个正常的交换机 和一般的交换机没有区别

它能在任何的队列上被指定

实际上就是设置某一个队列的属性

当这个队列中存在死信时，RabbitMQ会自动的将这个消息重新发布到指定的DLX内，进而路由另一个队列，即死信队列

想要使用死信，只需要再定义列表的时候设置队列参数：`x-dead-letter-exchange`然后指定交换机即可

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy95eb209a-1bcd-487b-832a-e09d88da3beb.png)

我们这里是这样的

前置步骤 先创建一个交换机 及其对应的队列 命名规范应该为 dead_xxx_xxx，队列同理 应该为 dead.com.xxx.xxx

然后在我们的普通队列中进行如下配置

```java
@Bean
public Queue ttlSmsQueue() {
    HashMap<String, Object> args = new HashMap<>();
    //        设置队列的过期时间 单位是毫秒 这里一定得是一个int类型（整形） 不然会报错
    args.put("x-message-ttl", 10000);
    //        指定死信队列交换机
    args.put("x-dead-letter-exchange", "dead_direct_exchange");
    //        设置死信队列的路由key  如果说是fanout模式 则下面不需要配置
    args.put("x-dead-letter-routing-key", "sms");
    //        第二个参数 是否持久化
    //        第三个参数 是否是单前连接私有队列
    //        第四个参数 是否自动删除
    //        第五个参数 为我们的args-附带额外值
    //        PS：这里如果之前创建过队列了 需要先删掉 再创建 不会额外自动创建的 而是会报错 但是如果在实际工作中 千万不能直接删除 而是要一步一步的替换掉
    return new Queue("ttl.sms.fanout.queue", true, false, false, args);
}
```

这样即可 这里就不做案例测试了

当然我们还可以设置一个队列的最长值

`x-max-length` 需要传入一个int

当超过限制的长度的时候 新添加的内容将会被转移到死信队列

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy4b80ded8-9524-4986-9485-aad2946124b2.png)

## Rabbit内存磁盘的监控

当内存使用超过配置的阈值或者磁盘空间剩余空间对于配置的阈值时，RabbitMQ会暂时阻塞客户端的连接，并且停止接收从客户端发来的消息，以此避免服务器的崩溃，客户端与服务端的心态检测机制也会失效。

![image-20211229220308754](/images/Java/SpringBoot/06-RabbitMQ/image-20211229220308754.png)如下图：

![img](/images/Java/SpringBoot/06-RabbitMQ/kuangstudy414d826e-5cea-4caa-aba2-92cd30be34f4.png)

当队列出现blocking或blocked话说明到达了阈值和以及高负荷运行了。

然后这里面可以调整内存的分配 具体这里就不说了 可以看这个视频<https://www.bilibili.com/video/BV1dX4y1V73G?p=34&spm_id_from=pageDriver>

修改内存的最大大小

修改配置文件`/etc/rabbitmq/rabbitmq.conf`

```ini
#默认
#vm_memory_high_watermark.relative = 0.4
# 使用relative相对值进行设置fraction,建议取值在04~0.7之间，不建议超过0.7.
vm_memory_high_watermark.relative = 0.6
# 使用absolute的绝对值的方式，单位是KB,MB,GB 对应的命令如下
vm_memory_high_watermark.absolute = 2GB
```

里面的两种方式二选一 ，一般是上面那个百分比的多一些

设置完毕后重启即可

然后就是内存换页

在某个Broker节点及内存阻塞生产者之前，它会尝试将队列中的消息换页到磁盘以释放内存空间，持久化和非持久化的消息都会写入磁盘中，其中持久化的消息本身就在磁盘中有一个副本，所以在转移的过程中持久化的消息会先从内存中清除掉。

> 默认情况下，内存到达的阈值是50%时就会换页处理。
> 也就是说，在默认情况下该内存的阈值是0.4的情况下，当内存超过0.4*0.5=0.2时，会进行换页动作。

比如有1000MB内存，当内存的使用率达到了400MB,已经达到了极限，但是因为配置的换页内存0.5，这个时候会在达到极限400mb之前，会把内存中的200MB进行转移到磁盘中。从而达到稳健的运行。

可以通过设置 `vm_memory_high_watermark_paging_ratio` 来进行调整

依旧是在`/etc/rabbitmq/rabbitmq.conf`内配置

```ini
vm_memory_high_watermark.relative = 0.4
vm_memory_high_watermark_paging_ratio = 0.7（设置小于1的值）
```

为什么设置小于1，以为你如果你设置为1的阈值。内存都已经达到了极限了。你在去换页意义不是很大了。

然后就是RabbitMQ的磁盘预警

当磁盘的剩余空间低于确定的阈值时，RabbitMQ同样会阻塞生产者，这样可以避免因非持久化的消息持续换页而耗尽磁盘空间导致服务器崩溃。

> 默认情况下：磁盘预警为50MB的时候会进行预警。表示当前磁盘空间第50MB的时候会阻塞生产者并且停止内存消息换页到磁盘的过程。
> 这个阈值可以减小，但是不能完全的消除因磁盘耗尽而导致崩溃的可能性。比如在两次磁盘空间的检查空隙内，第一次检查是：60MB ，第二检查可能就是1MB,就会出现警告。

通过命令方式修改如下：

```bash
rabbitmqctl set_disk_free_limit  <disk_limit>
rabbitmqctl set_disk_free_limit memory_limit  <fraction>
# disk_limit：固定单位 KB MB GB
# fraction ：是相对阈值，建议范围在:1.0~2.0之间。（相对于内存）
```

配置文件的话就是

```ini
disk_free_limit.relative = 3.0
disk_free_limit.absolute = 50mb
```

## RabbitMQ的集群搭建

### 主从节点

普通搭建看视频即可<https://www.bilibili.com/video/BV1dX4y1V73G?p=35&spm_id_from=pageDriver>

建议是先看一遍视频 再来开始用docker 搭建 会少蛮多坑

我这里使用docker搭建

看的教程是<https://www.cnblogs.com/vipstone/p/9362388.html>

先把之前的容器全部删了

然后重新创建三个

```bash
docker run -d --hostname rabbit1 --name myrabbit1 -p 15672:15672 -p 5672:5672 -e RABBITMQ_ERLANG_COOKIE='rabbitcookie' rabbitmq:management

docker run -d --hostname rabbit2 --name myrabbit2 -p 5673:5672 --link myrabbit1:rabbit1 -e RABBITMQ_ERLANG_COOKIE='rabbitcookie' rabbitmq:management

docker run -d --hostname rabbit3 --name myrabbit3 -p 5674:5672 --link myrabbit1:rabbit1 --link myrabbit2:rabbit2 -e RABBITMQ_ERLANG_COOKIE='rabbitcookie' rabbitmq:management
```

接着进入到第一个并执行对应的命令

```bash
docker exec -it myrabbit1 bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
exit
```

这里百分之一百会弹出这样一个警告

`RABBITMQ_ERLANG_COOKIE env variable support is deprecated and will be REMOVED in a future version. Use the $HOME/.erlang.cookie file or the --erlang-cookie switch instead.`

不用管他

然后进入到第二个 设置集群

```bash
docker exec -it myrabbit2 bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbit1
rabbitmqctl start_app
exit
```

第三个同理

```bash
docker exec -it myrabbit3 bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbit1
rabbitmqctl start_app
exit
```

接着我们访问对应的网址 用默认账号 guest 密码guest登陆

![image-20211229233609159](/images/Java/SpringBoot/06-RabbitMQ/image-20211229233609159.png)

可以看到集群搭建好了（记得要在admin处新建你的用户并把guest删掉 不然分分钟变成肉鸡）

## 镜像集群

<https://www.bilibili.com/video/BV1dE411K7MG?p=20>

看看这个视频吧 我目前用不太上 先过了

### SpringBoot连接集群

```yaml
spring:
  rabbitmq:
#    host: 你的IP
#    port: 端口
    username: amayakite
    password: 123456789
    virtual-host: /
    addresses: 你的IP:端口

```

之后还有一些高并发 集群相关的 等到学完Spring Cloud再说了
