---
title: 03-Zookeeper服务注册与发现
date: 2022-1-4 13:46:30
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Zookeeper
- SpringCloud
---

## 关于Eureka停止更新

我们之前的1.x是一个长期维护的版本，但非常遗憾的是Eureka的2.x已经是停止更新了

所以这玩意目前来说不推荐使用

所以SpringCloud整合了Zookeeper来替换Eureka

要用这个玩意，我们得先去学下Zookeeper

![image-20220104135247204](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104135247204.png)

好！又一个中间件

## Zookeeper概述

开源的分布式的，为分布式框架提供协调服务的Apache项目

Zookeeper从设计模式角度来理解：是一个基于观察者模式设计的分布式服务管理框架，它负责存储和管理大家都关心的数据，然后接受观察者的注册

一旦这些数据的状态发生变化，Zookeeper就将负责通知已经在Zookeeper上注册的哪些观察者作出相应的反应

![image-20220104135849226](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104135849226.png)

### Zookeeper的特点

![image-20220104135935543](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104135935543.png)

1. Zookeeper是一个领导者（Leader），多个跟随者（Follower）组成的集群
2. 集群之中只要有**半数以上**的节点存活，Zookeeper集群就能正常服务，所以Zookeeper适合安装**奇数**台服务器
   ![image-20220104140125703](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104140125703.png)
3. 全局数据一致：每个server保存一份相同的数据副本，Client无论连接到哪个Server，数据都是一致的
4. 更新请求执行顺序：来自同一个Client的更新请求按其发送顺序依次执行
5. 数据更新原子性：一次数据更新要么成功，要么失败
6. 实时性：在一定的时间范围内，Client能读取到最新数据

### Zookeeper的数据结构

它的数据结构和**Unix文件系统很类似**，整体上可以看做是一棵树，每个节点成称作一个ZNode，每一个ZNode默认能够存储**1MB**的数据，每个ZNode都可以通过其路径唯一标识

![image-20220104140651563](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104140651563.png)

### 应用场景

> 提供的服务：统一命名服务，统一配置管理，统一集群管理，服务器节点动态上下线，软负载均衡等

- 统一命名服务，就类似于Nginx

![image-20220104140957112](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104140957112.png)

- 统一配置管理

![image-20220104141127106](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104141127106.png)

- 统一集群管理

![image-20220104141254358](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104141254358.png)

- 服务器的动态上下线

![image-20220104141347479](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104141347479.png)

- 软负载均衡

![image-20220104141451985](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220104141451985.png)

## Zookeeper的下载和安装

官方网站<https://zookeeper.apache.org/releases.html>

一般来说不会用最新的…

比较多人用的是3.5.7（企业当中）

但是我懒，所以选择目前能看得到3.5.x内最新的3.5.9了，应该效果是一样的

### 基本的Linux下载安装操作

[下载链接](https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.5.9/apache-zookeeper-3.5.9-bin.tar.gz)

linux

PS：下载速度百分之九十会比较慢 建议是现在windows上面下载好了COPY过去

```bash
wget https://dlcdn.apache.org/zookeeper/zookeeper-3.5.9/apache-zookeeper-3.5.9-bin.tar.gz -O "zookeeper.tar.gz"
```

然后安装前需要确保服务器上有JDK（自行安装）

```bash
java -version
```

解压

```bash
tar -zvxf zookeeper.tar.gz
# 如果要指定解压目录的话 加一个 -C /xxx/xxx
```

然后自行mv重名名下解压后的目录名称

之后可以看到熟悉的结构

```md
.
├── bin
├── conf
├── docs
│   ├── apidocs
│   │   ├── zookeeper-jute
│   │   │   └── org
│   │   │       └── apache
│   │   │           ├── jute
│   │   │           │   ├── class-use
│   │   │           │   └── compiler
│   │   │           │       ├── class-use
│   │   │           │       └── generated
│   │   │           │           └── class-use
│   │   │           └── zookeeper
│   │   │               ├── data
│   │   │               │   └── class-use
│   │   │               ├── proto
│   │   │               │   └── class-use
│   │   │               ├── server
│   │   │               │   ├── persistence
│   │   │               │   │   └── class-use
│   │   │               │   └── quorum
│   │   │               │       └── class-use
│   │   │               └── txn
│   │   │                   └── class-use
│   │   └── zookeeper-server
│   │       └── org
│   │           └── apache
│   │               └── zookeeper
│   │                   ├── admin
│   │                   │   └── class-use
│   │                   ├── class-use
│   │                   ├── cli
│   │                   │   └── class-use
│   │                   ├── client
│   │                   │   └── class-use
│   │                   ├── common
│   │                   │   └── class-use
│   │                   ├── jmx
│   │                   │   └── class-use
│   │                   ├── server
│   │                   │   ├── admin
│   │                   │   │   └── class-use
│   │                   │   ├── auth
│   │                   │   │   └── class-use
│   │                   │   ├── class-use
│   │                   │   ├── command
│   │                   │   │   └── class-use
│   │                   │   ├── persistence
│   │                   │   │   └── class-use
│   │                   │   ├── quorum
│   │                   │   │   ├── auth
│   │                   │   │   │   └── class-use
│   │                   │   │   ├── class-use
│   │                   │   │   └── flexible
│   │                   │   │       └── class-use
│   │                   │   └── util
│   │                   │       └── class-use
│   │                   ├── util
│   │                   │   └── class-use
│   │                   └── version
│   │                       ├── class-use
│   │                       └── util
│   │                           └── class-use
│   ├── images
│   └── skin
└── lib
```

貌似都是常规操作

按照常理 我们要先去看下conf

```md
conf
├── configuration.xsl
├── log4j.properties
└── zoo_sample.cfg
```

可以看到有三个文件

最下面的那个，sample一看就是要去掉的字眼 所以我们重命名`mv zoo_sample.cfg zoo.cfg`

接下来看看这玩意有什么配置项

```ini
# The number of milliseconds of each tick
tickTime=2000
# The number of ticks that the initial
# synchronization phase can take
initLimit=10
# The number of ticks that can pass between
# sending a request and getting an acknowledgement
syncLimit=5
# the directory where the snapshot is stored.
# do not use /tmp for storage, /tmp here is just
# example sakes. 这里是不推荐在/tmp目录下存放数据  因为这个文件夹每隔半个月一个月会自动清空一次
dataDir=/tmp/zookeeper
# the port at which the clients will connect
clientPort=2181
# the maximum number of client connections.
# increase this if you need to handle more clients
#maxClientCnxns=60
#
# Be sure to read the maintenance section of the
# administrator guide before turning on autopurge.
#
# http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance
#
# The number of snapshots to retain in dataDir
#autopurge.snapRetainCount=3
# Purge task interval in hours
# Set to "0" to disable auto purge feature
#autopurge.purgeInterval=1
```

所以我们找个顺眼的地方 门 mkdir一个文件夹 然后路径放进去即可

接着我们看看bin目录下的内容

```md {10}
.
├── README.txt
├── zkCleanup.sh
├── zkCli.cmd
├── zkCli.sh
├── zkEnv.cmd
├── zkEnv.sh
├── zkServer.cmd
├── zkServer-initialize.sh
├── zkServer.sh
├── zkTxnLogToolkit.cmd
└── zkTxnLogToolkit.sh
```

一看就是这个server来启动

启动

```bash
./zkServer.sh start
```

注意 这一步之前需要安装下jps

ubuntu：

```bash
apt install openjdk-11-jdk-headless  # version 11.0.13+8-0ubuntu1~20.04, or
apt install openjdk-13-jdk-headless  # version 13.0.7+5-0ubuntu1~20.04
apt install openjdk-16-jdk-headless  # version 16.0.1+9-1~20.04
apt install openjdk-17-jdk-headless  # version 17.0.1+12-1~20.04
apt install openjdk-8-jdk-headless   # version 8u312-b07-0ubuntu1~20.04
```

按照自己在服务器上的jdk版本来安装即可

接着输入jps就能看到这个服务了

```bash
915962 QuorumPeerMain
916193 Jps
```

接着启动客户端

```bash
 ./zkCli.sh
```

如果这里启动失败了的话 看下是不是有进程占用了8080端口 这玩意要8080端口才能执行

反正之后能进一个console即可 就像是mysql那样，然后可以输入quit退出

然后还可以通过

```bash
 ./zkServer.sh status
```

来查看当前Zookeeper的状态，里面的MODE表示当前的Zookeeper是什么性质 由于我们啥都没做 所以默认是standalone，也就是单一的，非集群的

然后停止Zookeeper的server也非产简单

```bash
 ./zkServer.sh stop
```

### Zookeeper的相关参数解读

```ini
# Zookeeper和客户端通信的心跳时间，单位毫秒  然后服务端和服务端的心跳时间也是在这配置 
tickTime=2000
# 这个是初始化的通讯时限，需要传入int 相当于Zookeeper在启动的时候，initLimit*tickTime毫秒内 对应的为服务端必须与其建立连接 否则Zookeeper就开始了傲娇了 一般这个会调高一点 
initLimit=10
# 这个是建立好了通讯之后，Server和我们的微服务之间的通讯时间如果超过syncLimit*tickTime毫秒，server就会认为我们的服务挂了，然后从服务列表中删掉它
syncLimit=5
# 保存Zookeeper中的数据的路径，注意 千万不要用/tmp目录 那个目录会被系统定期的删除
dataDir=/www/data
# 客户端链接Server的端口，通常情况下不动
clientPort=2181

# 下面这些暂时都用不上 不管
# the maximum number of client connections.
# increase this if you need to handle more clients
#maxClientCnxns=60
#
# Be sure to read the maintenance section of the
# administrator guide before turning on autopurge.
#
# http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance
#
# The number of snapshots to retain in dataDir
#autopurge.snapRetainCount=3
# Purge task interval in hours
# Set to "0" to disable auto purge feature
#autopurge.purgeInterval=1
```

## 集群的安装

emm由于我既没有学习Hadoop，也没有多台服务器，所以用docker来整了..

首先你准备好三台服务器 都整上Zookeeper，然后端口啥的自己配置好

如果你是docker 

看看[Dokcer Hub](https://hub.docker.com/_/zookeeper?tab=description)的操作即可

拉包

```bash
docker pull zookeeper:3.5.9
```

配置`stack.yml`

这里说下`ZOO_MY_ID`:如果是常规部署的话 这玩意应该在指定的`data`目录下创建一个`zkData`文件，这个文件里面包含着对应的服务编号，填个数字即可

![image-20220105172000909](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105172000909.png)

然后ZOO_SERVERS等同于这个

![image-20220105172204690](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105172204690.png)

![image-20220105172455341](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105172455341.png)



```yaml
version: '3.1'

services:
  zoo1:	
    image: zookeeper
    restart: always
    hostname: zoo1
    ports:
      - 2181:2181
    environment:
      ZOO_MY_ID: 1
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181

  zoo2:
    image: zookeeper
    restart: always
    hostname: zoo2
    ports:
      - 2182:2181
    environment:
      ZOO_MY_ID: 2
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181

  zoo3:
    image: zookeeper
    restart: always
    hostname: zoo3
    ports:
      - 2183:2181
    environment:
      ZOO_MY_ID: 3
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181
```

然后运行即可

```bash
docker-compose -f stack.yml up
```

接下来我们可以通过

```bash
./zkServer.sh status
```

看看2181的状态

```md
/usr/bin/java
ZooKeeper JMX enabled by default
Using config: /home/root/javatest/zookeeper/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost. Client SSL: false.
Mode: follower ====> 选举的结果 follower 跟随者
```

## Zookeeper的选举机制

### 服务器刚刚启动的时候

两句话概括：

- 当leader还没有被选举出来的时候，都会依次给自己进行投票直到有半数以上的人通过，权重的话是按照我们之前在myid设定的id为准，id越大，权重越大，将会选举出第一个老大
- 当老大选举完成之后，后来的都自动变为小弟

![image-20220105173504806](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105173504806.png)

![image-20220105173841671](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105173841671.png)

### 非第一次启动

概括：

- 挂掉的时候，任期数量最大的优先，如果一致，则变更为处理用户请求最多服务端优先，如果说相同的话，则在进行服务器的myid判断，最大的胜出

![image-20220105174336750](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105174336750.png)

## 客户端命令行操作

### 基本语法

如果要在启动的时候指定某个服务端，可以：

```bash
./zkCli.sh -server ip：端口
```



![image-20220105175039734](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105175039734.png)

首先 来看下znode节点数据信息

```bash
ls -s /
```

结果：

```bash
[zookeeper]cZxid = 0x0
ctime = Thu Jan 01 08:00:00 CST 1970
mZxid = 0x0
mtime = Thu Jan 01 08:00:00 CST 1970
pZxid = 0x0
cversion = -1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 0
numChildren = 1
```

![image-20220105175532838](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105175532838.png)



![image-20220105175919012](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105175919012.png)

### 节点的基本操作和节点类型

要创建一个节点非常简单

```bash
# 创建永久节点
create /mydoc "张飞"
create /mydoc/shuguo "刘备"
# 然后查看节点
ls /
# 结果：[mydoc, zookeeper]
ls /mydoc
# 结果：
[shuguo]
#--------
# 获取指定的值
get -s /mydoc
# 结果：
张飞
cZxid = 0x200000008
ctime = Wed Jan 05 18:02:19 CST 2022
mZxid = 0x200000008
mtime = Wed Jan 05 18:02:19 CST 2022
pZxid = 0x200000009
cversion = 1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 6
numChildren = 1

# 接下来看看shuguo 的信息
get -s /mydoc/shuguo
# 结果：
刘备
cZxid = 0x200000009
ctime = Wed Jan 05 18:03:06 CST 2022
mZxid = 0x200000009
mtime = Wed Jan 05 18:03:06 CST 2022
pZxid = 0x200000009
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 6
numChildren = 0

#---------------
# 创建临时节点：
create -s /mydoc/weiguo "曹操"
# 结果：Created /mydoc/weiguo0000000001
# 这时候如果退出客户端  然后再连接上的话  get -s /mydoc/weiguo 将获取不到任何信息
# 临时节点就相当于JavaEE的session会话域一样 一旦结束会话 就莫得了

# 修改节点的值
set /mydoc/shuguo "胡桃"

```



![image-20220105180142406](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105180142406.png)

### 监听器

例如我们想要实时监听一个节点的变化

客户端1

```bash
get -w /mydoc
```

客户端2

```bash
set /mydoc "杨贵妃"
```

![image-20220105182319121](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105182319121.png)

如果想要监听节点node值的变化

客户端1

```bash
ls -w /mydoc
```

客户端2 创建节点

```bash
create /mydoc/abc "aaa"
```

![image-20220105182628957](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105182628957.png)



![image-20220105181725562](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105181725562.png)

### 节点的删除以及查看

删除一个节点

```bash
delete /mydoc/aaa
```

递归删除节点(删除本身以及所有子节点)

```bash
deleteall /mydoc
```

查看某个节点的状态

```bash
 stat /mydo
 # 结果：
cZxid = 0x200000008
ctime = Wed Jan 05 18:02:19 CST 2022
mZxid = 0x200000013
mtime = Wed Jan 05 18:23:43 CST 2022
pZxid = 0x200000014
cversion = 4
dataVersion = 1
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 2
numChildren = 4
```

## Java-基本Api操作

### 安装依赖

```xml
<dependencies>
    <!-- https://mvnrepository.com/artifact/org.apache.zookeeper/zookeeper -->
    <dependency>
        <groupId>org.apache.zookeeper</groupId>
        <artifactId>zookeeper</artifactId>
        <version>3.5.9</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### 创建数据

```java
public class zkClient {
    public static ZooKeeper zooKeeper;

//    static {
//        try {
//            zooKeeper = new ZooKeeper("aaa.com:2181,aaa.com:2182,aaa.com:2183", 2000, new Watcher() {
//                @Override
//                public void process(WatchedEvent watchedEvent) {
//                }
//            });
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }

    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
//        这里是连接 也可以丢到上面静态代码块执行
        zooKeeper = new ZooKeeper("aaa.com:2181,aaa.com:2182,aaa.com:2183", 2000, new Watcher() {
            @Override
            public void process(WatchedEvent watchedEvent) {
            }
        });
        System.out.println(zooKeeper);
        // 这里如果创建失败会抛出异常
        String s = zooKeeper.create(
            "/myapp", 
            "hello world".getBytes(StandardCharsets.UTF_8),
            // 作用域：谁可以获取这个数据 这里是所有人
            ZooDefs.Ids.OPEN_ACL_UNSAFE,
            // 是否持久化 这里是持久化存储
            CreateMode.PERSISTENT
        );
        System.out.println(s);

    }
}

```

执行结果：

![image-20220105205311046](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105205311046.png)

成功存储

### 监听节点变化

```java
public static void main(String[] args) throws IOException, InterruptedException, KeeperException {    
    zooKeeper = new ZooKeeper("你的ip和端口", 2000, new Watcher() {
        @Override
        public void process(WatchedEvent watchedEvent) {
            // 这里相当于起了一个那啥守护线程来监听
            List<String> children;
            try {
                // 这里是获取节点的数据，第二个参数是是否监听 等价于getxxx
                // 删除之类的api 见名知意 delete等就是
                children = zooKeeper.getChildren("/", true);
                System.out.println(children);
            } catch (KeeperException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    });
    // 让主线程挂着
    Thread.sleep(Long.MAX_VALUE);
}
```

然后创建一个

![image-20220105210326254](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105210326254.png)

结果：

![image-20220105210333567](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105210333567.png)

### 判断节点是否存在

```bash
public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
Stat exists = zooKeeper.exists("/adadad", false);
System.out.println(exists == null ? "不存在" : "存在");
}
```

### 写入原理

![image-20220105211008352](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105211008352.png)

非常简单，或者说和那啥elasticsearch差不多

1. 发送写操作给服务端
2. 服务端（从机）接收到数据之后，转发给主机
3. 主机（Leader）写入完毕之后通知从一半机写入
4. 从机写入完毕后，通知主机，一旦通知的从机写入完毕了，就反馈给客户端
5. 反馈给客户端写入完毕之后，再通知剩余的从机
6. 就跟elasticsearch基本差不多

## 服务动态上下线

![image-20220105211450928](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105211450928.png)

也就是监听业务功能上下线

这不就非常简单了嘛

**我们启动一个服务的时候，自动和Zookeeper建立一个连接，然后注册一个临时的节点**

**然后我们的服务挂了，那个节点就会自动删除**

也就是上面那个服务端并非是Zookeeper的服务器，而是我们的服务的服务器（例如订单查询等）

然后所有进程，都监听我们制定的一个节点即可。。

假设这个是服务端：

```java
public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
    //      1.  获取zk连接
    zooKeeper = new ZooKeeper(connectString, 2000, new Watcher() {
        @Override
        public void process(WatchedEvent watchedEvent) {
            Stat exists = null;
            try {
                exists = zooKeeper.exists("/server", false);
            } catch (KeeperException | InterruptedException e) {
                e.printStackTrace();
            }
            if (exists == null) {
                //            如果没有server节点，则创建
                try {
                    zooKeeper.create("/server", "service".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
                } catch (KeeperException | InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    });

    //        2. 注册服务器到zk集群
    //        通过逗号分隔 成数组 这里我加装我是一个服务
    String[] split = connectString.split(",");
    for (String s : split) {
        //            										注册临时节点
        zooKeeper.create("/server/" + s, s.getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
    }


    //        延迟
    Thread.sleep(Integer.MAX_VALUE);
}
```

另一个监听端我就不写了，代码大概如下，放在process方法内即可

监听端：

```java
//                轮循的获取到节点并打印
List<String> strings ;
try {
    strings = zooKeeper.getChildren("/server", true);
    System.out.println(strings);
} catch (KeeperException | InterruptedException e) {
    e.printStackTrace();
}
```

然后我们开下第二个监听端 再开第一个服务端，然后把服务端踢掉，你就能在这个监听端内看到 变动了。。

草，难怪这玩意的源代码就9mb，原来是干这功能的

## Zookeeper分布式锁

比如说进程1在使用某项资源的时候，会先去获得锁，进程1获得锁后会对该资源保持独占，这样其他进程就无法访问该资源，进程1用完之后就会释放锁，让其他进程来获取锁，那么通过这个锁机制，我们就完成了分布式系统中多个进程能够有序的访问该临界资源，我们把这个分布式环境下的锁叫分布式锁

![image-20220105221305440](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220105221305440.png)

实现用到了juc的锁。。这个之后再了解了，反正 它的await就相当于等待锁释放

然后他的countDown相当于释放锁

```java
public class ZookpeerLock {
    public static final String connectString = "你的Zookeeper的ip和端口";

    CountDownLatch countDownLatch = new CountDownLatch(1);
    CountDownLatch waitLatch = new CountDownLatch(1);
    private ZooKeeper zooKeeper;

    private String waitPath;
    private String myNode;


    public ZookpeerLock() throws InterruptedException, IOException, KeeperException {
        zooKeeper = new ZooKeeper(connectString, 2000, new Watcher() {
            @Override
            public void process(WatchedEvent watchedEvent) {
//                watchedEvent 会监听说有事件
//                如果连接上 释放连接锁
                if (watchedEvent.getState() == Event.KeeperState.SyncConnected) {
                    countDownLatch.countDown();
                }
//                wait锁释放 这里是获取事件类型 如果是NodeChildrenChanged 删除事件 并且 删除的内容为我们指定的内容的话
                if (watchedEvent.getType() == Event.EventType.NodeDeleted && watchedEvent.getPath().equals(waitPath)) {
                    waitLatch.countDown();

                }
            }
        });
//        等待zk正常连接后，往下走程序
        countDownLatch.await();
//        判断根节点是否存在  实际开发中这一步应该交给静态代码块来完成
//        Stat exists = zooKeeper.exists("/locks", false);
//        if (exists == null) {
//            zooKeeper.create("/locks", "".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
//        }


    }

    /**
     * 加锁
     */
    public void zkLock() throws InterruptedException, KeeperException {
//        1 创建临时带序号的节点
        myNode = zooKeeper.create("/locks/seq-", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
//        2 判断当前的节点是不是最小序号的节点，如果是获取到锁，如果不是，监听序号前一个节点
        List<String> children = zooKeeper.getChildren("/locks", false);
        System.out.println(Thread.currentThread().getName() + "的锁名" + myNode);
//        如果只有一个，就直接获取锁，如果有多个节点，需要判断谁最小
        if (children.size() == 1) {
            System.out.println("获取到锁");
        } else {
//            排序
            Collections.sort(children);
//            获取节点名称 seq-0000000000001
            String substring = myNode.substring("/locks/".length());
//            通过节点名称获取到该节点在children集合的位置
            int index = children.indexOf(substring);
            System.out.println("锁列表" + children + "锁的index" + index);
//           判断
            if (index == -1) {
                System.out.println("数据异常");
            } else if (index == 0) {
                System.out.println("获取到锁");
                return;
            } else {
//                需要监听前一个节点的变化
                waitPath = "/locks/" + children.get(index - 1);
                System.out.println("前一个节点的变化" + waitPath);
                byte[] data = zooKeeper.getData(waitPath, true, null);
//                等待监听
                waitLatch.await();
            }
        }

    }

    /**
     * 解锁
     */
    public void zkUnLock() throws InterruptedException, KeeperException {
//        删除节点
        if (myNode != null) {
            System.out.println("释放的锁名" + myNode);
            zooKeeper.delete(myNode, -1);
            myNode = null;
        }
    }
}
```

使用

```java
public class ZookeeperLockTest {
    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
        for (int i = 0; i < 20; i++) {
            ZookpeerLock lock = new ZookpeerLock();
            new Thread(() -> {
                try {
                    lock.zkLock();
                    System.out.println(Thread.currentThread().getName() + "获取到锁");
                    Thread.sleep(1000);
                    System.out.println(Thread.currentThread().getName() + "释放锁");
                    lock.zkUnLock();
                } catch (InterruptedException | KeeperException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}

```

### Curator框架实现分布式锁案例

原生的Java Api开发存在问题

1. 会话连接时异步的，需要自己去处理，比如使用我们刚刚的CountDownLatch
2. Watch需要重复注册，不然就不能生效
3. 开发的复杂性还是比较高的
4. 不支持多借点的删除和创建，需要自己去递归

所以就得用上Curator，这是一个专门解决分布式锁的框架

官方文档：<https://curator.apache.org>

依赖安装

要三个

```xml
<!-- https://mvnrepository.com/artifact/org.apache.curator/curator-framework -->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
    <version>5.2.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.apache.curator/curator-recipes -->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.2.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.apache.curator/curator-client -->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-client</artifactId>
    <version>5.2.0</version>
</dependency>

```

使用起来也非常简单

```java
public class CuratorLockTest {
    public static void main(String[] args) {
        InterProcessMutex lock1 = new InterProcessMutex(getCuratorFramework(), "/locks");
        InterProcessMutex lock2 = new InterProcessMutex(getCuratorFramework(), "/locks");

        new Thread(() -> {
            try {
                lock1.acquire();
                String name = Thread.currentThread().getName();
                System.out.println(name + "获取到锁");
                lock1.acquire();
                System.out.println(name + "再次获取到锁");
                Thread.sleep(3 * 1000);
                lock1.release();
                System.out.println(name + "释放锁");
                lock1.release();
                System.out.println(name + "再次释放锁");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
        new Thread(() -> {
            try {
                lock2.acquire();
                String name = Thread.currentThread().getName();
                System.out.println(name + "获取到锁");
                lock2.acquire();
                System.out.println(name + "再次获取到锁");
                Thread.sleep(3 * 1000);
                lock2.release();
                System.out.println(name + "释放锁");
                lock2.release();
                System.out.println(name + "再次释放锁");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();

    }

    private static CuratorFramework getCuratorFramework() {
        CuratorFramework curatorFramework = CuratorFrameworkFactory
                .builder()
                .connectString("你的Zookeeper的连接池的ip地址，逗号分隔")
                .connectionTimeoutMs(2000)
                .sessionTimeoutMs(2000)
                .retryPolicy(new ExponentialBackoffRetry(3000, 3))
                .build();
//        启动客户端
        curatorFramework.start();
        System.out.println("客户端启动成功");
        return curatorFramework;


    }
}

```

运行结果：

![image-20220106135112076](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106135112076.png)

## Zookeeper应用到我们当前的分布式项目内

### 构建项目-服务提供者

我们创建一个项目:`cloud-provider-payment8003`

接着添加如下依赖 我们这里就省略DAO了

```xml
<dependencies>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
    </dependency>


    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!--        注意这个玩意 后面非常重要 通常和web一块出现-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
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
        <groupId>io.springfox</groupId>
        <artifactId>springfox-boot-starter</artifactId>
    </dependency>
</dependencies>
```

### 编写配置文件

```yaml
# 更该端口
server:
  port: 8003
# 开个debug
logging.level.com.Project: debug
spring:
  #  应用名称
  application:
    name: cloud-provider-payment

  cloud:
    zookeeper:
      # 服务器ip，多个之间用逗号隔开
      connect-string: zoo1:2181,zoo2:2182,zoo3:2183

springfox:
  documentation:
    swagger-ui:
      enabled: false
    enabled: false

```

### 编写main和controller

main:

```java
@SpringBootApplication
@EnableDiscoveryClient
public class CloudProvider8003Application {
    public static void main(String[] args) {
        SpringApplication.run(CloudProvider8003Application.class, args);
    }
}
```

controller

```java
@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/zk")
    public String paymentZk() {
        return "springcloud with zookeeper: " + serverPort + "\t" +"OK!";
    }

}

```

### 运行

启动的时候会出现一个id

![image-20220106151516438](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106151516438.png)

记住它

然后我们进入Zookeeper的客户端

```bash
./zkCli.sh
```

然后看下节点列表，可以发现三个节点

![image-20220106151611757](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106151611757.png)

services下的节点，就是我们这个服务的服务名

接着我们get一下

```bash
get -s /services/cloud-provider-payment/ea8d6c0d-21c8-4fe6-a1c8-509d33b77ac6
```

结果：

可以发现，存储的就是我们服务的信息

```json
{
  "name": "cloud-provider-payment",
  "id": "ea8d6c0d-21c8-4fe6-a1c8-509d33b77ac6",
  "address": "DESKTOP-USEHA9I",
  "port": 8003,
  "sslPort": null,
  "payload": {
    "@class": "org.springframework.cloud.zookeeper.discovery.ZookeeperInstance",
    "id": "cloud-provider-payment",
    "name": "cloud-provider-payment",
    "metadata": {
      "instance_status": "UP"
    }
  },
  "registrationTimeUTC": 1641452934251,
  "serviceType": "DYNAMIC",
  "uriSpec": {
    "parts": [
      {
        "value": "scheme",
        "variable": true
      },
      {
        "value": "://",
        "variable": false
      },
      {
        "value": "address",
        "variable": true
      },
      {
        "value": ":",
        "variable": false
      },
      {
        "value": "port",
        "variable": true
      }
    ]
  }
}
```

然后你访问之前定义的controller正常的话，表示程序是没有问题的

### 可能遇到的问题

注意 每个版本的这啥依赖都可能不一样 默认会自带一个Zookeeper的依赖

![image-20220106142132003](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106142132003.png)

这里是3.6.0 发现和我们的版本不符合（我的是…3.7.0，不过没有中断的异常就是了）

不过原则是**只要不是让程序终端的异常 就不管**

如果你执意要替换的话 一定要将自己导入进来的Zookeeper内的slf4j-log4j12排除

不然铁定会报错，并且这不是 少日志，这是日志门面Slf4j的日志实现冲突了，springboot已经是默认logback实现了，需要将新导进来的zookeeper依赖中所带的slf4j-log4j12实现给排除掉。

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
    <exclusions>
        <!--                排除自带的Zookeeper-->
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!--        添加自己的Zookeeper 注意 这里要把自己的Zookeeper的log4j2剔除，不然会爆冲突
	在新导入的zookeeper的版本jar包里面排除slf4j-log4j12
日志依赖冲突的朋友，mvn dependency:tree检查冲突，排除
-->
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.xxxxx</version>
</dependency>
```

如果说抛出这样的异常

![image-20220106144121169](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106144121169.png)

修改下host即可

```ini
127.0.0.1 zoo1 zoo2 zoo3
```

```ini
- 127.0.0.1:2181,127.0.0.1:2182,127.0.0.1:2183
+ zoo1:2181,zoo2:2182,zoo3:2183
```

### 它是临时节点还是持久节点？

Zookeeper的节点分为四种

- 普通临时节点
- 普通持久节点
- 带序号的临时节点
- 带序号的持久节点

这里我们的节点并没有带序号，所以两个序号的可以排除

那么它是临时节点还是持久节点呢？

所以我们把服务停了再去看看

![image-20220106153010252](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106153010252.png)

好，是**临时的普通节点**

并且全都是临时节点

![image-20220106153129196](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106153129196.png)

**zookeeper是高端女猎人 ATM没钱了立马就踢了**

**zookeeper保证cp，eureka保证ap**

### 构建服务-消费者

依赖和8003一样

```xml

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
</dependency>


<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!--        注意这个玩意 后面非常重要 通常和web一块出现-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>


<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
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
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
</dependency>
```

### 配置文件

和8003一样 就是改了个端口和名称

```yaml
# 更该端口
server:
  port: 8003
# 开个debug
logging.level.com.Project: debug
spring:
  #  应用名称
  application:
    name: cloud-provider-payment

  cloud:
    zookeeper:
      # 服务器ip，多个之间用逗号隔开
      connect-string: zoo1:2181,zoo2:2182,zoo3:2183

springfox:
  documentation:
    swagger-ui:
      enabled: false
    enabled: false
```

### main和restTemplate

main

```java
@SpringBootApplication
@EnableDiscoveryClient
public class CloudConsumerZk80Application {
    public static void main(String[] args) {
        SpringApplication.run(CloudConsumerZk80Application.class, args);
    }
}

```

rest:

```java
@Configuration
public class ApplicationContextConfig {

    /**
     * LoadBalanced这个注解千万不能忘了，这个就是负载均衡的注解
     * @return
     */
    @Bean
    @ConditionalOnMissingBean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

### controller

```java
@RestController
@Slf4j
public class OrderZkController {
	
    // 这里直接写服务名即可
    public static final String INVOKE_URL = "http://cloud-provider-payment";
    
    @Resource
    RestTemplate restTemplate;

    @GetMapping("/consumer/payment/zk")
    public String paymentInfo() {
        String result = restTemplate.getForObject(INVOKE_URL + "/payment/zk", String.class);
        return result;
    }
}
```

### 启动并测试

![image-20220106155808653](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106155808653.png)

两个服务都启动

get 80 zk

![image-20220106155820991](/images/SpringCloud/03-Zookeeper服务注册与发现/image-20220106155820991.png)

## Zookeeper的结束语

这个玩意非常简单

但是面试官可不这么认为。。。

以后有空了要把这个视频<https://www.bilibili.com/video/BV1to4y1C7gw?p=29>也看完去

不然难搞 md 代码简简单单，原理相当复杂

