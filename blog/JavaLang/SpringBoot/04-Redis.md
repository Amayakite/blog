---
title: 04-Redis
date: 2021-12-22 18:08:20
category: SpringBoot
tag:
- Redis
- SpringBoot 
---

# Redis Console

## 简介

这玩意 不太想多说是啥了

简单来说 就是一个在内存上的数据库，IO速度非常快~

属于NOSql：不仅仅有SQL

主要是做并发之类的用的

以及解决集群之间数据的共享问题

Nosql可以在百亿数据集达到毫秒级查询

![image-20211222180739538](/images/SpringBoot/04-Redis/image-20211222180739538.png)

还可以减少sql压力之类的，例如查询到的结果存放到nosql中 以后别人要数据 如果nosql中有，直接在那里面拿

![image-20211222180955536](/images/SpringBoot/04-Redis/image-20211222180955536.png)

![image-20211222181014333](/images/SpringBoot/04-Redis/image-20211222181014333.png)

![image-20211222181039767](/images/SpringBoot/04-Redis/image-20211222181039767.png)

![image-20211222181103747](/images/SpringBoot/04-Redis/image-20211222181103747.png)

![image-20211222181125028](/images/SpringBoot/04-Redis/image-20211222181125028.png)

顺带一提：Redis现在支持事务了

## 安装Redis

推荐看这篇文章<https://blog.csdn.net/qq_24958783/article/details/107541425>

我这里就不建议直接安了（维护蛮痛苦的），docker走起

```shell
docker pull redis:latest
mkdir .redis
cd .redis
touch redis.conf
vi redis.conf
```

```ini
#bind 127.0.0.1 
#注释掉这部分，这是限制redis只能本地访问

protected-mode no 
#默认yes，开启保护模式，限制为本地访问

daemonize no
#默认no，改为yes意为以守护进程方式启动，可后台运行，除非kill进程，改为yes会使配置文件方式启动redis失败

databases 16 
#数据库个数（可选），我修改了这个只是查看是否生效。。

dir  ./ 
#输入本地redis数据库存放文件夹（可选） 不动即可

appendonly yes 
#redis持久化（可选）

requirepass  密码 
#配置redis访问密码
```

然后启动

```shell
docker run -p 6379:6379 --name redis -v /home/你的用户名/.redis/redis.conf:/etc/redis/redis.conf -v /home/你的用户名/.redis/data/:/data  redis redis-server /etc/redis/redis.conf --appendonly yes
```

接着连接

```shell
docker exec -it redis bash
redis-cli
auth  刚刚设置的密码，按下回车后显示OK即可
```

就可以了 如果说启动后 docker ps 没有的话 就`docke logs redis`看下是哪里配置锁了

Redis的底层是单线程+多路IO复用 就有点像是JavaScript的async await 异步操作那样

![image-20211222185303744](/images/SpringBoot/04-Redis/image-20211222185303744.png)

## Redis的基本使用

假设你现在已经进入了redis-cli，并且完成了用户验证之类的（如果没有设置密码可以不要验证，在服务器上用的话务必得使用用户验证 不然之后端口已开分分钟被别人注虫）

## ✨基本的操作

| 键                                      | 说明                                                                                                                                                          | 举例                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `set key value`                         | 插入key-value键值对<br />如果是重复插入相同的，则覆盖之前的                                                                                                   | `set k1 张三`                                                       |
| `setnx key value`                       | 插入key-value键值对<br />只有key不存在时，才会插入<br />否则将啥都不会变                                                                                      |                                                                     |
| `mest k1 v1 k2 v2....`                  | 批量插入/设置键值对 以空格分隔                                                                                                                                |                                                                     |
| `mget k1 k2 k3..`                       | 批量通过key获取其对应value的值 以空格分隔                                                                                                                     |                                                                     |
| `mestnx k1 v1 k2 v2....`                | 批量插入/设置键值对<br />如果有的key已经存在，则全部都不会插入成功<br />只有当全部key原本都不存在的时候，才能插入成功<br />原子性：有一个失败则都失败         |                                                                     |
| `get key`                               | 通过key查询对应value                                                                                                                                          | `get k1`                                                            |
| `getset key value`                      | 获取到值的同时替换原本的值<br />返回原本的值                                                                                                                  |                                                                     |
| `incr key`                              | 只对数值类型的value有效<br />让其++（自增1）<br />这个和下面的几个都是原子性操作<br />原子性操作之后有说                                                      |                                                                     |
| `decr key`                              | 同上，不过是--（自减1）                                                                                                                                       |                                                                     |
| `incrby key number`                     | 将key中存储的数字按照number值进行增加<br />number由你来决定                                                                                                   |                                                                     |
| `decrby key number`                     | 同上                                                                                                                                                          |                                                                     |
| `append key value`                      | 在指定的key后面加上指定的value<br />返回追加完毕后的长度<br />（如果key不存在，则会创建新的key）                                                              | `append k1 123`                                                     |
| `getrange <key>  <起始位置> <结束位置>` | 获取值的范围，类似于Java中的substring<br />index从0开始技算，**包含**结束位置<br />例如0,3，返回前四个                                                        | `set username lucymary`<br />`GETRANGE username 0 3`<br />结果:lucy |
| `setrange <key> <起始位置> value`       | 基本同上 替换从指定范围起的值<br />注意 也是从0开始计数的                                                                                                     |                                                                     |
| `keys *`                                | 查看当前库的所有key(匹配：`keys *1`)                                                                                                                          | `keys k1`<br />`keys *1`<br />`kes *`                               |
| `exists key`                            | 判断某个key是否存在                                                                                                                                           |                                                                     |
| `type key`                              | 查看指定的key是什么类型                                                                                                                                       |                                                                     |
| `del key`                               | 根据key删除指定的key-value对                                                                                                                                  |                                                                     |
| `unlink key`                            | 根据`value`选择非阻塞删除指定的key-value对<br />也就是仅将`key`从`keyspace`元数据中删除<br />真正的删除会在后续异步操作<br />（正在使用的人依旧可以正常使用） |                                                                     |
| `expire key time`                       | 为给定的key设置过期时间，单位为秒                                                                                                                             | `exprie key k1 10`                                                  |
| `settx key 过期时间 value`              | 创建key-value的时候指定过期时间                                                                                                                               |                                                                     |
| `ttl key`                               | 查看key还有多少秒过期<br />-1表示永不过期<br />-2表示已过期                                                                                                   |                                                                     |
| `select index`                          | 切换数据库<br />默认是0号数据库 可以自由传入数值 进入指定的数据库                                                                                             | `select 1`<br />`select 0`                                          |
| `dbsize`                                | 查看当前数据库key的数量（不统计已过时的）                                                                                                                     |                                                                     |
| `flushdb`                               | 清空当前库的所有数据                                                                                                                                          |                                                                     |
| `flushall`                              | 删库跑路~清空全部数据库                                                                                                                                       |                                                                     |

### 原子性操作

所谓原子性操作就是指不回被线程调度机制打断的操作

这个操作一旦开始，就一直运行到结束，中间不会有任何context switch（切换另一个线程）

- 在单线程中，能够在单条指令中完成的操作都可以被认为是`原子操作`，因为中断只能发生于指令之间
- 在多线程中，不能被其他进程（线程）打断的操作就叫原子性操作
  比方说Java中的i++就不是原子性操作（geti,i=i+1）

Redis单命令的原子性主要得益于Redis的单线程

## String字符串

> String是Redis最基本的类型
>
> 是**二进制安全**的，Redis的String可以包含任何数据，比如jpg图片或者**序列化对象**
>
> String类型是Redis最基本的数据类型，一个Redis中字符串的**value**最多是**512MB**

额外说明：`Key`始终是字符串类型

redis中的key对应string类型的value

就像是Java中的`new HashMap<String,String>`一样

#### 字符串的底层结构

​String的数据结构为简单的动态字符串(Simple Dynamic String ，SDS)是可以修改的字符串，内部结构实现上类似于Java的ArrayList，才用预分配冗余空间的方式来减少内存的频繁分配

![image-20211222212302018](/images/SpringBoot/04-Redis/image-20211222212302018.png)

如上图所示，内部为当前实际分配的空间capacity，一般要高于实际字符串长度len

当字符串长度小于1MB时，扩容都是加倍现有空间，如果超过1MB，扩容一次只会增加1MB的空间

字符串的最大长度是512MB

## List列表

Redis的列表是简单的字符串列表，按照插入顺序排序

我们可以自由的添加一个元素到列表的头部或者尾部

它的底层实际上是一个**双向链表**，对两端的操作性能很高，通过索引下标操作中间的节点性能会比较差

![image-20211222212647326](/images/SpringBoot/04-Redis/image-20211222212647326.png)

### ✨列表的常用操作

|                    命令                     | 说明                                                                                                                                           |
| :-----------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------- |
|           `lpush key v1 v2 v3...`           | 创建一个列表，并且从左往右的放值<br />可以放任意数量的value，第一个为key                                                                       |
|      `lrange key startIndex endIndex`       | 从左往右的读取列表的数据<br />可以键入`0 -1` 获取一个列表的所有值                                                                              |
|            `rpush key value....`            | 同第一个，但顺序是从右往左                                                                                                                     |
|        `lpop/rpop key [count 可选]`         | 从列表中取出一个值（同时列表中会删除该值）<br />可以通过指定count来指定要取出的数量<br />如果说一个列表中的值没了 这个列表也没了               |
|            `rpoplpush key1 key2`            | 从key1 列表的最右边取出一个值<br />插入到key2列表的最左边<br />也就是将key1列表的最开始插入的值<br />取出放到key2列表的末尾                    |
|             `lindex key index`              | 根据指定下标获取到相应的元素<br />注意 这里获取元素时从左到右获取的<br />也就是说 第一个插入的元素在index -1<br />最后一个插入的元素在 index 0 |
|                 `llen key`                  | 获取列表的长度                                                                                                                                 |
| `linsert <key> before <value > <new value>` | 在`key`中指定的`value`的后面插入`newValue`的值<br />before可以换成after 换成after后就变成了前面插入                                            |
|          `lrem <key> <n> <value>`           | 从左到右删除n个指定的value<br />最后插入的优先删除                                                                                             |
|        `lset <key> <index> <value>`         | 将列表key下标为index的值替换成value                                                                                                            |

需要额外注意的是：列表读取是先进后出

例如我们从左往右放

- 第一次:放了v1， 列表的结构：`v1`
- 第二次 V2 列表的结构：`v2 v1`
- 第三次 v3 结构：`v3 v2 v1`
- 所以当你从左往右读取的时候 会先读取到v3 然后v2 最后 v1

举个例子：

![image-20211222214305623](/images/SpringBoot/04-Redis/image-20211222214305623.png)

创建一个从左往右的列表，从左往右的读取 能发现第一个读取到的是最后插入的值

![image-20211222214454125](/images/SpringBoot/04-Redis/image-20211222214454125.png)

但如果从右往左插入的表，那么得到的顺序将会按照我们插入的顺序来走

## Set集合

​Redis的Set对外停的功能和list差不多，特殊的地方是这玩意可以**自动重排**，当我们需要存储一个列表的数据，但又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list没有的

​Redis的Set是String类型的**无序集合**，它底层是一个value为null的Hash表（底层应该跟Java的HashSet差不多），所以增删改的复杂度都是`O(1)`

一个算法， 随着数据的增加，执行时间的长短，如果是`O(1)`数据增加，查找数据的时间不变

### ✨Set集合的基本操作

|                 命令                 | 说明                                                                                                                                |
| :----------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------- |
|     `sadd key value1 value2...`      | 将一个或者多个元素添加到set集合中<br />如果元素已存在将会被忽略                                                                     |
|            `smembers key`            | 取出该集合的所有值                                                                                                                  |
|         `smember key value`          | 判断集合中是否含有指定value的值<br />如果有返回1，没有返回0                                                                         |
|             `scard key`              | 返回该集合的元素个数                                                                                                                |
|     `srem key value1 value2...`      | 删除集合中的某个元素 可以删除多个                                                                                                   |
|          `sopo key [count]`          | **随机**从该集合中吐出一个值<br />注意 该值被吐出后将会被删除<br />可以指定count吐出多个值 <br />这个一般用于发牌或者抽奖之类的功能 |
| `smove <source> <destination> value` | 把集合**source**中的一个`value`取出移动到**destination**集合中                                                                      |
|          `sinter key1 key2`          | 取出两个集合中**交集**(相同的)的元素                                                                                                |
|          `sunion key1 key2`          | 返回两个集合中**并集**(就相当于是两个集合一块给你)的元素                                                                            |
|          `sdiff key1 key2`           | 返回两个集合中**差集**的元素<br />(key1有但是key2没有的元素)                                                                        |

## Hash（键值对）

Redis Hash是一个键值对的集合

Redis Hash是一个String类型的`field`和`value`映射表

Hash特别适合用于存储对象，类似于Java的`Map<String,Object>`

![image-20211222224058143](/images/SpringBoot/04-Redis/image-20211222224058143.png)

用户ID为查找的key，存储的value包含性别、年龄、生日等信息，如果用普通的key-value来保存的话：

![image-20211222224449309](/images/SpringBoot/04-Redis/image-20211222224449309.png)

可以非常直观的感受到这样不太行 当然我们也可以尝试使用Java的序列化存储，但是那样的话可视性、读取反射生成跟第一种的区别其实不大

所以就可以用到Hash 结构如下

![image-20211222224707303](/images/SpringBoot/04-Redis/image-20211222224707303.png)

### ✨Hash的常用命令

| 命令                            | 说明                                                                                                                                                                                      | 示例                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `hset <key> <field> <value>`    | 给key这个集合中，field字段赋值value                                                                                                                                                       | `hset user_1001 name jock` |
| `hget key filed`                | 从指定集合中取出指定的字段                                                                                                                                                                | `hget user_1001 name`      |
| `hmset key <f1> <v1> <f2> <v2>` | 批量设置指定字段的值<br />目前已经被官方弃用<br />使用hset也能达到同样的效果                                                                                                              |                            |
| `hexists key field`             | 查看指定的表中，给定的字段的值是否存在<br />存在返回1 不存在返回0                                                                                                                         |                            |
| `hkeys key`                     | 查看一个表中所有的**字段名**                                                                                                                                                              |                            |
| `hvals key`                     | 查看一个表中所有的**value**                                                                                                                                                               |                            |
| `hincrby key filed count`       | 将表中指定的字段增加count（数值）<br />例如给一个人的年龄+10<br />`hincrby userxxx age 10`                                                                                                |                            |
| `hsetnx key field value`        | 将哈希表key中的filed的值设置为value<br />这个操作只能在当前map中没有指定的filed时生效<br />也就是当filed字段存在的时候，将什么都不会发生<br />返回一个数值 为0 设置失败<br />为1 设置成功 |                            |

### Hash的数据结构

​这玩意有两种数据结构

​zipList 当你的数据比较少的使用用这个

​hashTable 数据有点多的时候用这个

## Zset(有序集合)

​这玩意和普通的set长得差不多，也是没有重复元素的字符串集合

​不同的地方是，有序集合的每个成员都关联了一个评分(score)，这个评分被用来按照最低到最高分的方式排序集合中的成员，集合的成员是唯一的，但是评分可以是重复的

​因为元素是有序的，所以可以很快的根据评分(sorce)或者次序(position)来获取一个范围的元素

​访问有序集合的中间元素也是非常快的，因此能够将一个有序集合作为一个没有重复成员的智能列表来使用

### ✨Zset常用命令

| 命令                                                                     | 说明                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zadd key sroce1 value1 sroce2 value2...`                                | 将一个或者多个member元素以及它的sroce值加入到有序的key当中<br />例如<br />`zadd topLanager 200 Java 300 C++ 400 Python 500 Javascript`                                                                                        |
| `zrange key startIndex endIndex [WITHSCORES] [limit offset count]`       | 取出一个ZSet的指定元素，传入0 -1 取出所有元素<br />元素将按照排名进行排序<br />WITHSCORES属性是一个可选的值：<br />带上他可以让分数一起返回到结果集<br />结果集的顺序将为：<br />[0]value?  [1]sroce1 [2]value? [3] sroce2... |
| `zrangebyscore key minNumber maxNumber [WITHSCORES][limit offset count]` | 返回有序集key中，所有的score值基于min和max之间（包括他们两）的所有成员<br />按照score的值递增（从小到大排列                                                                                                                   |
| `zrevrangebyscore xxxxx`                                                 | 同上 不过是冲大到小排序                                                                                                                                                                                                       |
| `zincrby key count value`                                                | 为指定的value的score增加指定的值                                                                                                                                                                                              |
| `zrem key value`                                                         | 删除指定的元素                                                                                                                                                                                                                |
| `zcount key min max`                                                     | 统计该集合分数区间的元素个数，返回一个number                                                                                                                                                                                  |
| `zrank key value`                                                        | 返回指定值在集合中的排名，从0开始<br />0是最大的                                                                                                                                                                              |

## ✨Redis配置文件-基本配置

| 配置项            | 说明                                                                                                                                                                                                                                                                                                                                                                             | 默认值                                                                                                                                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bind              | 可以在什么地方连接<br />设置成0.0.0.0 支持任何地方连接                                                                                                                                                                                                                                                                                                                           | 127.0.0.1 只能接收本机访问                                                                                                                                                                                 |
| protected-mode    | 是否开启保护模式<br />开启保护模式后只能通过本机访问<br />不能通过远程访问                                                                                                                                                                                                                                                                                                       | 默认值yes  可以改成no让远程可以访问                                                                                                                                                                        |
| port              | 端口号                                                                                                                                                                                                                                                                                                                                                                           | 6379                                                                                                                                                                                                       |
| tcp-backlog       | 允许最大未完成TCP三次握手和完成三次握手队列的数量总和                                                                                                                                                                                                                                                                                                                            | 默认是511，如果要追求高并发这个值可以改为更多                                                                                                                                                              |
| timeout           | 连接上后多长时间不操作会自动断开连接                                                                                                                                                                                                                                                                                                                                             | 默认是0--用不超时可以穿入以秒为单位，例如600                                                                                                                                                               |
| tcp-keepalive     | 连接上Redis之后每隔指定秒数检测心跳<br />（是否有在操作，如果没有在操作则断开连接）                                                                                                                                                                                                                                                                                              | 默认值是300，每隔300s检查一次心跳                                                                                                                                                                          |
| daemonize         | Redis是否可以后台启动                                                                                                                                                                                                                                                                                                                                                            | 默认no，改成yes才可以后台启动                                                                                                                                                                              |
| pidfile           | 指定文件夹，每次redis操作会将操作的内容放置到指定的文件内                                                                                                                                                                                                                                                                                                                        | 这个根据心情设置 传入相对路径或者绝对路径都可                                                                                                                                                              |
| loglevel          | 日志的级别<br />debug 开启这个能看到更详细的日志<br />verbose 类似于Java中的Info<br />notice 这个一般用于生产环境中<br />warning 只显示一些有用的或者重要的信息                                                                                                                                                                                                                  | 默认值时notice                                                                                                                                                                                             |
| logfile           | 设置日志的输出文件路径，可以指定相对路径或者绝对路径                                                                                                                                                                                                                                                                                                                             | 默认为空 可以设置到 例如/dev/redis文件夹中                                                                                                                                                                 |
| databases         | 设置redis有多少个数据库                                                                                                                                                                                                                                                                                                                                                          | 默认是16                                                                                                                                                                                                   |
| requirepass       | 设置连接redis的密码<br />redis默认是不需要密码就可以访问的<br />通常情况下一定要设置密码<br />**设置的密码建议使用随机生成的超过256位的**                                                                                                                                                                                                                                        | 默认没有密码<br />可以通过`requirepass 密码`设置<br />设置完毕后连接时需要通过`auth 密码`来提供密码进行登陆                                                                                                |
| maxclients        | 设置redis可以和多少个客户端进行连接<br />如果达到了设置的数量，redis会拒绝新的连接请求<br />并向这些连接方发出max number of clients reached作为回应                                                                                                                                                                                                                              | 默认值是10000，即可以同时和1W个客户端进行连接                                                                                                                                                              |
| maxmomory         | 设置Redis使用的内存量，一旦使用量达到上限，redis将会试图移除内部数据<br />移除规则可以通过`maxmemory-policy`指定<br />通常建议设置                                                                                                                                                                                                                                               | 默认是0<br />可以按照如下方式书写<br />maxmemory 1048576 <br />maxmemory 1048576B<br /> maxmemory 1000KB <br />maxmemory 100MB <br />maxmemory 1GB <br />maxmemory 1000K maxmemory 100M <br />maxmemory 1G |
| maxmemory-policy  | 设置当内存满的时候如何移除内部数据<br />volaie-lru 使用LRU算法移除key，只对设置了过期时间的键管用<br />allkeys-lru 在所有集合key中，使用LRU算法移除key<br />valatie-radom，在过期的集合中随机移除随机的key<br />allkeys-random  在所有集合的key中 移除随机的key<br />volatile-ttl 移除那些TTL值最小的key，也就是临近过期的key<br />noeviction 不进行移除，针对写操作返回错误信息 | volatile-lru                                                                                                                                                                                               |
| maxmemory-samples | 设置样本数量，LRU算法和最小TTL都并非算是精确的算法，而是估算值，所以可以设置样本的大小<br />redis会默认检查指定数量的key并选择其中LRU的那个<br />一般设置3~7的数字，数字越小样本越不准确，但是性能消耗越小                                                                                                                                                                       | 3<br />这玩意就类似于抽样一样，比如有10000个商品 抽取出三个商品就算合格                                                                                                                                    |

## Redis的发布和订阅

​Redis发布订阅(puh/sub)是一种消息通信模式，发送者(pub)发送消息，订阅者(sub)接收消息

​Redis客户端可以订阅任意数量的频道

![image-20211223121745764](/images/SpringBoot/04-Redis/image-20211223121745764.png)

### 用Redis实现一个简单的消息订阅

​实际生产过程中，这个玩意用的比较少

我们打开两个console，分别都连接上`redis-cli`

Console1 接收者

```shell
SUBSCRIBE MessageChannel_01
# SUBSCRIBE 订阅一个频道 MessageChannel_01是频道名称 注意 订阅后除非自己手动退出 不然这个连接就始终在接收这个频道的数据
```

![image-20211223122512138](/images/SpringBoot/04-Redis/image-20211223122512138.png)

Console2 发送者

```shell
publish MessageChannel_01 Hello
# publish 发送消息  MessageChannel_01 频道名  Hello 消息内容
```

发送完毕后返回一个integer 为接收者的数量，如果没有任何人接收返回0

接着在console1内可以发现接收到了Hello

![image-20211223122638825](/images/SpringBoot/04-Redis/image-20211223122638825.png)

注意：发布的消息没有持久化，如果在订阅的客户端收不到Hello，只能收到订阅后发布的消息

当让 可以退订  不过这玩意基本用不上 Java有更好的替代品 这个之后会说--rabbitmq

## Redis6的新数据类型

### Bitmaps

这个类型主要是可以来操作二进制数据（0101010这种）

- BitMaps本身不是一种数据类型，实际上它就是字符串`key-value`，但是它可以对字符串进行位操作
- bitMaps提供了一套命令，所以可以在redis中使用bitMaps和使用字符串的方法不太一样
- 可以把bitmaps想象成一个以位为单位的数组，数组的每个单元只能存储0和1，数组的下标在Bitmaps中叫做偏移量

实例：每个独立用户是否访问过网站存放在BitMaps中，访问的用户将被计数位1，没有范围的技数为0，用户偏移量作为用户的ID

设置键的offset个位的值（从0算起），假设现在有20个用户，userid=1，6,11,15,19的用户对网站进行了访问，那么当前BitMaps的初始化结果是

![image-20211223123601860](/images/SpringBoot/04-Redis/image-20211223123601860.png)

注意：很多用户的id以指定一个数值（例如10000开头）直接将用户的bitmaps的偏移量对应一定会造成浪费，通常的做法是每次`setbit`操作时将用户id减去这个指定的数字

在第一次初始化bitMap时，假如偏移量非常大，那么整个初始化过程将会比较慢，可能会造成Redis的阻塞

### ✨bitMaps的指令

| 指令                                          | 说明                                                                                                                                                                                                                                        | 例子                                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `setbit key index count`                      | 设置一个bit对象，并且将index位置的值设置为count                                                                                                                                                                                             | `setbit users_10001 1 1`<br />这里是将这个users_10001偏移量为1的位置的值设置为1<br />也可以：`setbit users_10001 18 1`  |
| `getbit key index`                            | 获取一个bit对象指定index位置的值                                                                                                                                                                                                            | `getbit users_10001 1`<br />结果：1<br />`getbit users_10001 18`<br />结果：1<br />`getbit users_10001 66`<br />结果：0 |
| `bitcount key`                                | 统计指定key中被设置为1的index的总数                                                                                                                                                                                                         | `bitcount users_10001`<br />结果：2                                                                                     |
|                                               | bitcoun还可以传入start 和end筛选<br />这个建议用了去查博客<br />稍微有点复杂<br />设置是按位，统计数量按字节，一个字节是八位                                                                                                                |                                                                                                                         |
| `bitop <and/or/not/xor> destkey key1,key2...` | 对一个或多个保存二进制位的字符串key进行位元操作，并将结果保存到destkey上                                                                                                                                                                    |                                                                                                                         |
|                                               | 例子：<br />`setbit user1 1 1`<br />然后2 3 4 分别也设置为1<br />`setbit user2 3 1`<br />user2 只有3是1<br />接下来整合，使用user3接收<br />`BITOP and user3 user1 user2`<br />然后获取user3的index=3的值<br />`getbit user3 3`<br />结果;1 |                                                                                                                         |

### BitMaps和set的对比

假设网站有1e个用户，每天独立访问5kw，如果每天用集合类型和bitmaps分别存储活跃用户可以得到表

![image-20211223130858482](/images/SpringBoot/04-Redis/image-20211223130858482.png)

很明显，这种情况下使用BitMaps能节省很多的空间，尤其是随着时间推移节省内存还是比较可观的

![image-20211223130940379](/images/SpringBoot/04-Redis/image-20211223130940379.png)

但BitMaps并不是万金油，假如网站每天的独立访问用户量很少，例如只有10万（大量的僵尸用户），那么两者的对比如下所示，很显然这个时候用bitmaps就不太合适了，因为基本上大部分位都是0

![image-20211223131115293](/images/SpringBoot/04-Redis/image-20211223131115293.png)

### HyperLoglog

​在工作当中，我们经常会遇到与统计相关的功能需求，例如统计网站PV（PageView页面访问量）可以使用redis的`incr`/`incrby`实现

​但是像UV（UniqueVistor，独立访客）、独立IP数，搜索记录数等需要去重和计数的问题该如何解决，这种求集合中不重复元素个数的问题被称为基数问题

解决基数问题有很多种方案：

1. 数据存储在Mysql表中，使用`distinct count`计算不重复个数
2. 使用Redis提供的`hash`、`set`、`bitmaps`等表数据结构来处理

以上的方案结果准确，但是随着数据不断的增加，导致占用空间也来越大，对于非常大的数据集是不切实际的

​所以Redis推出了HyperLoglog

​这是用来做统计基数的算法

- 优点：在输入元素的数量或者体积非常大的时候，计算基数的空间是固定的，并且是很小的

在Redis里面，每个HypeLoglog键只需要花费12kb的内存，就可以计算接近2^64个不同元素的基数

这和计算基数时，元素越多耗费的内存就越多的集合形成鲜明的对比

​但是：因为HyperLoglog只会根据输入元素来计算基数，而不会存储输入元素本身，所以HyperLoglog不能像集合那样，返回输入的各个元素

### ✨HyperLoglog的使用

| 命令                            | 说明                                          | 示例                                                                                    |
| ------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------- |
| `pfadd key elemnt [element...]` | 添加指定的元素(element)到HyperLoglog中        | `pfadd program java`<br />`pfadd program java c++`                                      |
| `pfcount key`                   | 统计这个key中所包含的元素个数，返回总元素数量 | `pfcount program`<br />返回值：2                                                        |
| `pfmerge dest k1 k2 ...`        | 将一个或者多个HyperLoglog合并存放到dest中     | `pfadd k1 a b`<br />`pfadd k2 a b c d`<br />`pfmerge k100 k1 k2`<br />此时k100的count=4 |

### Geospatial

​这玩意是拿来存储地理信息的

​存放元素的二维坐标

​redis基于该类型，提供了经纬度设置，查询，范围查询，距离查询，经纬度hash等常见操作

​这玩意简称GEO

### ✨Geo的使用

| 命令                                       | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `geoadd key {longitude latiude member}...` | 添加地理位置 进度 维度 名称 可以添加多个<br />如：<br />`geoadd china_city 121.47 31.23 ShangHai`<br />添加多个：<br />`geoadd china_city 106.50 29.53 Chongqing 114.05 22.52 ShenZhen 116.38 39.90 BeiJing`<br />注意：两级（北极南极）无法添加，一般会下载城市数据，直接通过Java程序一次性导入<br />有效的经纬度：<br />经度：-180~180<br />纬度：-85.05112878~85.05112878<br />当坐标位置超出指定范围时，该命令将返回一个错误<br />已经添加的数据，是无法再次往里面添加的（不能有重复） |
| `geopos key member`                        | 获取指定区域的坐标值<br />                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `geodist key m1 m2 单位`                   | 获取两个位置的直线距离：<br />例如：`GEODIST china_city ShangHai ShenZhen km`<br />结果：1215.9224<br />单位的可选单位<br />m：米，默认值，没有指定的话就是用这个<br />km:：千米<br />mi：英里<br />ft：英尺                                                                                                                                                                                                                                                                               |
| 还有一些别的，要用上了再去查查这个geo即可  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

# RedisJava

## Jedis--让Java操作Redis

### 安装依赖

只需要安装第一个即可 其他的都是附带的log打印

```xml
       <!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>4.0.0</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-simple -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.32</version>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>RELEASE</version>
            <scope>compile</scope>
        </dependency>



        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.22</version>
        </dependency>
```

### 扩展-Docker修改容器端口

<https://www.cnblogs.com/hkgov/p/14276263.html>

按照这篇文章走一遍 建议把redis的端口改成别的

这里我才用的最古老的方法，重新整一个容器

```shell
docker stop redis
docekr rm redis

# 下面先

docker run -d -p 最终你访问的端口:6379 --name redis -v /home/你的用户名/.redis/redis.conf:/etc/redis/redis.conf -v /home/你的用户名/.redis/data/:/data   redis redis-server /etc/redis/redis.conf --appendonly yes
```

如果你执意要使用6379的话，本地倒还好，云服务器的话大概几分钟左右的时间就会被别人注入挖矿之类的玩意

### 连接并使用redis

```java
public class JedisDemo {
    public static void main(String[] args) {
//        1 创建jedis对象
        Jedis jedis = new Jedis("这里填写ip 本地的话就localhost", 端口号-传入数值);
        jedis.auth("这里填写你的密码（如果有的话）");
//        测试
        String ping = jedis.ping();
        System.out.println(ping);
    }
}
```

如果没问题的话你的控制台会出现一个**PONG**

接下来测试下其他的方法

```java
@Slf4j
public class JedisDemo {

    public static Jedis jedis;

    @BeforeAll
    public static void before() {
        jedis = new Jedis("xxx", xxx);
        jedis.auth("xxx");
    }

    @Test
    public void test1() {
        Set<String> keys = jedis.keys("*");
        log.info("keys:{}", keys);
    }

    @Test
    public void test2() {
        jedis.set("name", "张三");
        log.info("name:{}", jedis.get("name"));
    }
    @Test
    public void mset(){
        jedis.mset("name","张三","age","18");
        List<String> mget = jedis.mget("name", "age");
        log.info("mget:{}", mget);
    }

    @AfterAll
    public static void close() {
        jedis.close();
    }

}
```

#### 操作hashmap

```java
@Test
public void hash(){
    //        赋值 也可以通过传入Map的方式替代field和value传值
    jedis.hset("users","age","20");
    //        取值
    String set = jedis.hget("users", "age");
    log.info("set:{}", set);
}
```

### Jedis实例-手机验证码

要求：

1. 输入手机号，点击发送后随机生成6位数字验证码，2分钟内有效
2. 输入验证码，点击验证，返回成功或失败
3. 每个手机号每天只能输入三次

思路：

1. 生成随机六位验证码，通过random
2. 把验证码放到redis里面，设置过期时间120s
3. 判断验证码是否一致，和输入的验证码进行匹配比较，如果一样的话就成功
4. 每个手机每天只能发送三次验证码
   1. incr 每次发送之后+1
   2. 大于2的时候，提示不能提交发送

下面的是一个比较简化的版本 实际生产环境中 应该都是调用其他地方的api来处理生成短信验证码

```java
public class PhoneCode {

    public static void main(String[] args) {
        //        verifyCode("18888888888");
        // gerRedisCode("18888888888", "069261");
        jedis.close();
    }

    public static Jedis jedis;

    static {
        jedis = new Jedis("xxxxx", xxx);
        jedis.auth("xxx");
    }

    /**
         * 生成随机验证码
         *
         * @param length 验证码长度
         * @return 数值验证码
         */
    public static String getCode(int length) {
        Random random = new Random();
        if (length < 1) {
            throw new IllegalArgumentException("length must be positive");
        }
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            builder.append(random.nextInt(10));
        }
        return builder.toString();
    }

    /**
         * 发送验证码 并存入redis
         * @param phone
         */
    public static void verifyCode(String phone) {
        //        手机发送次数的key
        String countKey = "phone_" + phone + "_count";
        //        每个手机每天只能发送三次
        String count = jedis.get(countKey);
        if (count == null) {
            //            如果为null表示没有发送过 新建一个有时长的key 过期时间为24h
            jedis.setex(countKey, 24 * 60 * 60, "1");
        } else if (Integer.parseInt(count) <= 2) {
            //            发送次数+1
            jedis.incr(countKey);
        } else {
            System.out.println("每天只能发送三次");
            //            注意这个return
            return;
        }

        //        验证码的key
        String codeKey = "phone_" + phone + "_code";
        //        发送的验证码要放到redis里面
        String code = getCode(6);
        //        过期时间为两分钟
        jedis.setex(codeKey, 60 * 2, code);

    }

    /**
         * 验证验证码
         * @param phone
         * @param code
         */
    public static void gerRedisCode(String phone, String code) {
        //        从redis中获取验证码
        String codeKey = "phone_" + phone + "_code";
        String code1 = jedis.get(codeKey);
        // 这里实际用的时候说多加一重验证 判断是获取到的验证码信息是否为null，如果为null表示验证码过期 就需要用户重新申请验证码了   或者这只前加一个ttl判断有没有过期
        if (code1.equals(code)) {
            System.out.println("验证成功");
        } else {
            System.out.println("验证失败");
        }
    }


}
```

使用 首先调用下

`verifyCode("18888888888");`

可以在redis中看到这些

## ✨SpringBoot整合redis

依旧是先到官网看看

<https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using>

看到了两个

![image-20211223170648151](/images/SpringBoot/04-Redis/image-20211223170648151.png)

用上面那个吧 听说下面的是做集群用的

当然我选择模板生成

![image-20211223171156327](/images/SpringBoot/04-Redis/image-20211223171156327.png)

### 添加依赖

现有的项目中加入

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

可以看到导入了蛮多依赖

![image-20211223173323095](/images/SpringBoot/04-Redis/image-20211223173323095.png)

额外说下 这玩意是基于lettuce的netty来进行操作的

接下来分析下自动配置

根据我们之前的学习可以知道 所有官方提供的整合包，自动配置都在官方的springbootautoconfiguration内，所以进去看看

redis 的包名为：spring-boot-starter-data-redis

所以在autoconfiguration下的data内的redis

可以看到显眼的autoConfiguration

![image-20211223173848353](/images/SpringBoot/04-Redis/image-20211223173848353.png)

接下来可以在这之中看到

```java {3}
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(RedisOperations.class)
@EnableConfigurationProperties(RedisProperties.class)
@Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
```

显眼的RedisProperties

这里再说下额外导入的东西：

- LettuceConnectionConfiguration客户端的连接配置

点进去看一下

![image-20211223174140887](/images/SpringBoot/04-Redis/image-20211223174140887.png)

这里看着就像是一个连接工厂的玩意 说明以后我们连接redis都是从这里获取连接

连接工厂准备好了的

接着看下另一个JedisConnectionConfiguration

![image-20211223174257801](/images/SpringBoot/04-Redis/image-20211223174257801.png)

一目了然 这不就是Jedis吗 也就是说只要我们的`spring.redis.client-type`为jedis的时候，底层默认的链接工厂为jedis

也就是说它同时支持两种客户端来操作Redis

Lettuce是一个比较新的客户端，Jedis是老牌的客户端

接着我们回到Autoconfiguration

```java {4,13}
@Bean
@ConditionalOnMissingBean(name = "redisTemplate")
@ConditionalOnSingleCandidate(RedisConnectionFactory.class)
public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
    RedisTemplate<Object, Object> template = new RedisTemplate<>();
    template.setConnectionFactory(redisConnectionFactory);
    return template;
}

@Bean
@ConditionalOnMissingBean
@ConditionalOnSingleCandidate(RedisConnectionFactory.class)
public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
    return new StringRedisTemplate(redisConnectionFactory);
}
```

注入了两个bean 之前jdbc是jdbcTemplate，这里是redisTemplate 那么说明这个玩意就是来操作redis的（就像jdbcTemplate那样）

总所周知，Redis是通过key-value来进行存储的，所以说`RedisTemplate<Object, Object>`这两个Object指的是我们的Key的类型和Value的类型 都支持Object

另外还给我们注入了一个stringRedisTemplate 这里简单说下 意思就是，Key和Value都是String的，因为我们k和v都是String的开发场景非常多，所以它也给我们注入了这个

也就是说底层我们只要使用`stringRedisTemplate`和`redisTemplate`就能来操作Redis了

### 简单使用Spring-Redis

我们可以在RedisProperties内看到非常多的配置

![image-20211223180656571](/images/SpringBoot/04-Redis/image-20211223180656571.png)

前缀都是spring.redis

### 配置Application中的redis项

接下来现在application.yml配置吧

```yaml
spring:
  redis:
    host: 网址
    port: 端口
    password:你的密码
    username: default
    # 如果是默认账户 username 可以省略
```

当然你也可以一句话概括上面的这些

`url: redis://default:XXXX@X.X.X.X:6379` 当然本人并不是很喜欢这样整 也不建议这样整

接着使用

```java
@SpringBootTest
@Slf4j
class ApplicationTests {

    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @Test
    void contextLoads() {
        ValueOperations<String, String> operations =
                stringRedisTemplate.opsForValue();
//        operations.set("hello", "张三");

        String hello = operations.get("hello");

        log.info("hello = {}", hello);
        log.info("StringRedisTemplate = {}", stringRedisTemplate);

    }

}

```

### 使用jedis替换Lettuce

先导入依赖

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```

 Springboot有声明jedis的版本 所以我们这里不用写版本号

接着在配置文件中启用即可

```yaml {6}
spring:
  redis:
    host: 网址
    port: 端口
    password:你的密码
    client-type: jedis
    # 然后可以对其做额外的配置 例如池子的大小等
    jedis:
     pool:
    max-active: 10
```

如果以后不想用jedis了 可以换回`lettuce`

```yaml
spring:
  redis:
    host: 网址
    port: 端口
    password:你的密码
    client-type: lettuce
    # 同上 可以用lettuce：xxx来进行一些指向性
```

接着测试依旧正常

如果说你使用jedis有问题 百分之九十是maven依赖没有更新

## Redis的事务

> Redis的事务是一个单独的隔离操作：事务中的所有命令都会序列化。按顺序的执行。
>
> 事务在执行的过程中，不会被其他客户端发送过来的命令打断

Redis事务主要作用就是**串联多个命令**防止别的命令插队

### ✨Multi、Exec、Discard

从输入`Multi`命令开始，输入的命令都会一次进入命令队列中，直到输入`Exec`后，Redis会将之前队列中的命令依次执行，如果说不想要提交，则可以通过`Discard`来取消提交

- Multi就像是Mysql的开启事务，开启新的事物
- Exec就像是Mysql的提交事务
- Discard就像是Mysql的回滚事务，取消事务的提交

![image-20211223203804732](/images/SpringBoot/04-Redis/image-20211223203804732.png)

总之使用和Mysql差不多 不过目前来说只是没有那几个分类的区别：什么读未提交之类的

注意

- 如果组队阶段出现了错误，则所有命令都不会被真正的执行
- **如果执行阶段出现了错误(例如setxxx 队列中有十条语句，但是有一条出错了，那么只有那一条出错的将不会被执行，其他的会正常执行)，则会没有原子性的执行**

Redis没有回滚这一个概念，只有提交和不提交的概念

### 事务解决数据冲突的问题

现在我们账面上有1w

然后目前有三个请求

- 一个请求想给金额减8k
- 一个请求想给金额减5k
- 一个金额想给金额减1k

![image-20211223205332078](/images/SpringBoot/04-Redis/image-20211223205332078.png)

### 悲观锁

​Pressimistic Lock 顾名思义，就是非常悲观，每次拿数据去的时候都认为被别人修改，所以每次在拿到数据的时候都会上锁，这样别人想拿这个锁就会block直到它拿到锁

​传统的关系型数据库里面就用到了很多这种机制，比如行锁，表锁等，都是在做操作之前先**上锁**

![image-20211223205700387](/images/SpringBoot/04-Redis/image-20211223205700387.png)

缺点是效率比较低 如果说同时执行的玩意较多 那么所有查询都要等待前面的结束

### 乐观锁

​非常乐观，每次拿数据的时候都认为别人不会去修改，所以不会上锁，但是在更新的时候判断一下在此期间别人有没有去更新这个数据，就类似于下图的版本号机制

​乐观锁用于多读的数据类型，这样可以提高吞吐量，Redis就是利用这种check-and-set实现事务的

![image-20211223210026383](/images/SpringBoot/04-Redis/image-20211223210026383.png)

比较现实的例子就是春运的火车抢票

### ✨Watch key [key...]

再执行multi提交之前，先执行`watch key1 key2...`可以监视一个或者多个key，如果在事务执行前这个（或这些）key被其他命令所改动，那么事务将会被打断

使用流程是：

- 先使用`watch`锁定字段
- 再使用`mutil`开启事务
- 最后使用`exec`提交事务

如果说最后提交的时候发现值被其他人修改了，将会返回null，并且不会对齐进行修改，否则返回`QUEUED`：操作成功

### unwatch

顾名思义，取消对事务的监视

### Redis事务三特性

- 单独的隔离操作
  - 事务中的所有命令都会序列化、按顺序的执行，事务在执行的过程中，不会被其他客户端发送来的命令打断
- 没有隔离级别的概念
  - 队列中的命令没有提交前都不会被实际执行，因为事务提交前任何指令都不会被实际执行
- 不保证原子性
  - 事务中如果有一条命令执行失败，其后的命令依然会被执行，没有回滚

### 模拟一个简单的售票系统

大概意思是

- 用户可以点击买票
- 返回值有success抢票成功
- fail抢票失败
- 只有一张票

HTML部分

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
    </head>
    <body>
        <div id="app">
            <div>
                <button @click="getTicket">点我抢票</button>
            </div>
            <div class="text">
                <h1>抢票结果：</h1>
                <h1>{{text}}</h1>
            </div>
        </div>
    </body>
    <script>
        window.onload = () => {
            new Vue({
                el: '#app',
                data: {
                    text: '',
                },
                methods: {
                    getTicket() {
                        axios.get('/runPiao',{params:{uid:111,pid:222}}).then(res => {
                            this.text = res.data.result;
                        })
                    }
                },

            })
        }
    </script>
</html>
```

Java 代码部分：

Service

```java
package com.MyProject.RedisForSpringBoot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 26-Redis-SpringBoot
 * @BelongsPackage com.MyProject.RedisForSpringBoot.service
 * @date 2021/12/23 21:42
 * @description 项目描述
 */
@Service
public class DoSeckill {

    @Autowired
    StringRedisTemplate redisTemplate;

    public boolean doSecKill(Long uid, Long prodid) {
        //        非空判断
        if (uid == null || prodid == null) {
            return false;
        }
        ValueOperations<String, String> ops = redisTemplate.opsForValue();

        //        定义库存key
        String kcKey = "product:" + prodid + ":stock";
        //        定义用户抢购key
        String userKey = "product:" + prodid + ":user:" + uid;
        //        获取库存
        String s = ops.get(kcKey);
        //        如果说库存为null 说明秒杀还没有开始
        if (s == null) {
            //        创建秒杀
            ops.setIfAbsent(kcKey, "1", Duration.ofMinutes(2));
            return false;
        }
        //        判断用户是否可以重复秒杀 这里设置个有效期为30s
        Boolean aBoolean = ops.setIfAbsent(userKey, "1", Duration.ofSeconds(30));
        //        一定有返回值 true  创建成功 false 创建失败
        assert aBoolean != null;
        if (!aBoolean) {
            return false;
        }
        //        注意 redis只能这样整事务
        Integer execute = redisTemplate.execute(new SessionCallback<Integer>() {
            @Override
            public <K, V> Integer execute(RedisOperations<K, V> operations) throws DataAccessException {
                //                    开启监听
                ValueOperations<K, V> forValue = operations.opsForValue();
                if (Integer.parseInt((String) forValue.get(kcKey)) <= 0) {
                    return 0;
                }
                operations.watch((K) kcKey);
                operations.multi();
                forValue.decrement((K) kcKey);
                return operations.exec().size() > 0 ? 1 : 0;

            }
        });
        //            如果执行成功 返回true
        assert execute != null;
        if (execute == 1) {
            return true;
        }

        return false;
    }
}

```

请求部分

```java
@RestController
public class QucikController {

    @Autowired
    DoSeckill doSeckill;

    @GetMapping("/runPiao")
    public String runPiao(@RequestParam("uid") Long uid, @RequestParam("pid") Long piaoId) {
        boolean shop1 = doSeckill.doSecKill(uid, piaoId);
        //        返回json
        return shop1 ? "{\"result\":\"success\"}" : "{\"result\":\"fail\"}";
    }

}
```

测试了下，效果可以

![image-20211224001053673](/images/SpringBoot/04-Redis/image-20211224001053673.png)

![image-20211224001100549](/images/SpringBoot/04-Redis/image-20211224001100549.png)

但是这样真的能解决高并发问题吗？

我接着用Python写了一个并发请求脚本（用Java也可以 不过比较痛苦）

```python
import requests
import json
import threading


def http_get(url,params):
    response = requests.get(url,params=params)
    # 结果转换为json格式
    result = json.loads(response.text)
    # 判断是否成功
    if result['result'] == "success":
        # 抢票成功
        print("抢票成功！")
    

# 生成随机六位数
def random_num():
    import random
    num = random.randint(100000,999999)
    return num

if __name__ == '__main__':
    # 发送httpget请求，获取响应结果
    url = "http://localhost:8080/runPiao"
    # 轮番发送1w次请求 多线程发送
    for i in range(10000):
        t = threading.Thread(target=http_get,args=(url,{
        'uid':random_num(),
        'pid':222
    }))
        t.start()
```

![image-20211224000756690](/images/SpringBoot/04-Redis/image-20211224000756690.png)

接着发现了超卖现象

同时票数也成为了负数

![image-20211224000827544](/images/SpringBoot/04-Redis/image-20211224000827544.png)

这可不太行..

这里简单说下这里面出现的问题

- 我们同时有一万个请求，但是Redis貌似并不能同时处理一万个请求
  - 所以有些请求将会等待，最终将会抛出连接超时问题
  - 这个连接超时就是最大连接数小于并发用户连接数
- 以及超卖问题

而且我发现用js的话问题更严重

```js
const axios = require("axios");
const { randomUUID, randomInt } = require("crypto");
let pet = "aa,18";
const run = () => {
    axios.get("http://localhost:8080/runPiao", {
        params: {
            // 随机生成6位数id
            uid: randomInt(100000, 999999),
            pid: 222
        }
    }).then(res => {
        if(res.data.result==="success"){
            console.log(res.data);
        }
    }).catch(err => {
        console.log("Error:"+err.message);
    });
}
for(let i=0;i<10000;i++){
    run();
}


```

![image-20211224003705848](/images/SpringBoot/04-Redis/image-20211224003705848.png)

1w次连接，2k次异常

## Lua

​Lua是一个小巧的脚本语言，可以很容易被C、C++代码调用，也可以通过反过来调用C/C++的函数，一个完整的Lua解析器不超过200KB，所以不适合用来做编程语言，而是作为嵌入式脚本语言

​很多应用程序、游戏使用Lua作为自己的嵌入式脚本语言，以此来实现可配置性、可扩展性

​在Redis中，将复杂的或者多步的redis操作，写成一个脚本，一次提交给redis执行，减少反复连接Redis的次数，提升性能

​Lua是类似Redis事务，有一定的原子性，不会被其他命令插队，可以完成一些Redis事务性操作

​我们可以利用脚本淘汰用户、解决超卖问题

​利用Lua脚本解决超卖问题，实际上是利用了Redis的单线程调用特性，用任务队列的方式解决多任务并发问题

```lua
local userid=KEYS[1];
local prodid=KEYS[2];
local qtkey = "ck:"..prodid..":qt";
local userKey="ck:"..prodid..":usr";
local userExists=redis.call("sismenber",userKey,userid);
if tonumber(userExists)==1 then
    return 2;
end
local num = redis.call("get",qtkey);
if tonumber(num)<=0 then
    return 0;
else
    redis.call("decr",qtkey);
    redis.call("sadd",userKey,userid);
end
return 1;

```

这里只做抛砖引玉 具体实现以后要用到了再说...

md主要是这老师讲的不详细 看不懂说了啥玩意..

## Redis持久化

就是让数据能存放到硬盘内，而不单单是在内存中

Redis提供了两套系统，一个是RDB 一个是AOF

### RDB

在指定的**时间间隔**内将内存中的数据集**快照**写入磁盘

使用这个玩意的话，Redis会单独创建一个子进程来进行持久化，会先将数据写入到一个临时文件中，待持久化过程都结束了，在用这个临时文件替换上次持久化好的文件。整个过程中，主进程是不进行任何IO操作的，这就确保了极高的性能，如果需要进行大规模数据的恢复，且对于数据的完整性不是很敏感，那么RDB要比AOF的方式更加高效

缺点是最后一次持久化后的数据可能会丢失（还没到指定时间的情况下服务器挂掉了）

### Rreis持久化路径的配置

默认是

```ini
dbfilename dump.db
```

可以更该自己喜欢的 不指定的话默认是按照相对路径（运行的路径下）

还有一些额外的配置

- `stop-writes-on-bgsave-error` 默认为yes 当redis无法写入硬盘时，直接关掉Redis的写操作 可选no

- `rdbcompression`对于存储到磁盘中的快照，设置是否可以进行压缩，如果是的话，redis会才用LZF算法进行压缩 默认yes  可以设置为no

- `rdbchecksum`检查完整性 在存储快照后，可以让Redis来进行数据校验，但是这样做会增加10%左右的性能消耗，如果希望获取到最大的性能提升，可以关闭这个功能，推荐yes 默认yes

- `save 时间 次数` 多少时间内（S）触发了多少次修改次数，触发存储

  - 默认是1分钟1w次，或者5分钟修改10次，又或者15分钟修改了一次

  - 禁用 方法：`save`传入空字符串即可

  - 这个是同步方法 会阻塞主线程

  - 例子：

    ```ini
    save 20 3
    # 20秒之内 最少有三个key发生了变化 触发存储
    
    # 可以同时存在多个 理论上来说 时间越长 数值越小 反之亦然
    save 600 1
    ```

- `bgsave 时间 次数`Redis会在后台异步的进行快照操作，快照同时还可以响应客户端的请求

  - 在使用中，可以通过`lastsave`命令来获取最后一次成功执行快照的时间

TMD 草了  这玩意说人话 就是 自动帮你把东西存储到一个文件内 文件名叫`dump.rdb`你可以自由的copy这个文件到其他地方

启动的时候 默认会找这个文件中的输入并导入到redis内

就这样 对 没错 就这样

搞得我还以为是多高级的玩意

### AOF

AOF是以日志的形式来记录每个写操作（增量保存），将Redis执行过的所有指令都记录下来（读操作不记录），只许追加文件不可以改写文件，redis启动之初会读取该文件重新构建数据，换言之，Redis重启的话就根据日志文件的内容将写指令从前到后执行一遍完成数据恢复的工作

**通常情况下  AOF不一定会设置**

AOF和RDB同时开启， 先加载RDB再加载AOF， 参考配置aof-use-rdb-preamble 默认是yes

AOF默认是不开启的，如果要开启的话

需要在配置文件中加上：

```ini
appendonly yes
# 开启aof持久化 默认是no不开启

#可选 开启aof后默认文件名为appendonly.aof
appendonlyfilename 文件名
```

恢复的话是要手动恢复的：

在**shell**中

```shell
redis-check-aof --fix 路径/文件 进行数据恢复
```

它的同步频率也可以在conf文件内配置

```ini
appendfsync always
#  始终同步 每次Redis的写入都会立刻计入日志，性能比较差但是数据完整性比较好 默认是这个
appendfsync everysec
# 每秒同步 每秒记录日志一次，如果服务器挂了，本秒的数据可能会丢失
appendfsync no
# redis不主动进行同步，把同步时机交给操作系统 由操作系统决定..不建议用这个
```

如果说感觉文件过大且没有什么用的话 可以设置重写

```ini
auto-aof-rewrite-percentage 数值 例如 100 或者 10 20 30 
# 设置重写的基准值，文件达到100%时开始重写（文件是原来重写后的2倍时触发）
auto-aof-rewrite-min-size 数值mb 例如：64mb(小写)
# 设置重写的基准值 最小文件64MB 达到这个基准值开始重写
```

例如：`auto-aof-rewrite-percentage`设置为100%

`auto-aof-rewrite-min-size`设置为64mb

则会在64mb+100%=128mb的时候触发重写

重写：例如原本

 set key value1

set key2 value

会简化成 set k1 v1 k2 v2

或者说你原本执行了两次自增 它将会帮你缩减成 +2

aof优点：每一次修改都同步，文件的完整性会更加好；每秒同步一次，可能会丢失一秒的数据；从不同步，效率最高的

缺点：相对于数据文件来说，aof远远大于rdb，修复的速度也比rdb慢；aof运行效率也要比rdb慢，所以我们redis默认的配置就是rdb持久化

### 持久化的补充说明

![image-20211224194823610](/images/SpringBoot/04-Redis/image-20211224194823610.png)

![image-20211224195019133](/images/SpringBoot/04-Redis/image-20211224195019133.png)

## Redis主从复制

概念大概是

一个主人 有两个仆从

加起来是3个人

主人吩咐的东西 仆从就去遵守主人的命令

​在Redis中，是指将一台Redis服务器的数据，复制到其他的Redis服务器，前者称为主节点（master/leader）后者称为从节点(slave/follwer)

​**数据的复制时是单向的，只能从主节点复制到从节点**

![image-20211224200220578](/images/SpringBoot/04-Redis/image-20211224200220578.png)

主从复制的作用主要包括：

1. 数据冗余：主从复制实现了数据的热备份，是持久化以外的另一种数据存储方式
2. 故障恢复：当主节点出现问题时，可以由从节点提供服务，实现快速的故障修复-实际上是一种服务的冗余
3. 负载均衡：在主从复制的基础上，配合读写分离，可以由主节点提供写服务，从节点提供读服务，即：写redis数据时应用连接主节点，读redis数据时应用连接从节点，分离服务器负担，尤其是在写少读多的情况下，通过多个节点分担负载，可以大大提高Redis服务器的并发量
4. 高可用基石：除了上述作用外，主从复制还是哨兵和集群能够实施的基础，因此说主从复制是redis高可用的基础

一般来说 要将redis运营到工程项目中，且只使用一台redis是万万不能的，原因如下：

1. 从结构上，单个redis服务器会发生单点故障，并且一台服务器需要处理所有的请求负载，压力较大
2. 从容量上，单个redis服务器的内存容量有限，就算一台redis服务器的内存容量为512gb，也不能将所有的内存用作redis存储内存，一般来说，单台redis最大使用内存不应该超过20g

电商网站上的商品，一般都是一次上传，无数次浏览的，专业点说，就是：多读少写

架构中比较常见的就是一主二从

### 配置主从集群

配置这玩意谨记一点即可：

**只配置从库，不用配置主库**

注意 配置文件要本地准备三份

额外指令： 在redis中使用`INFO replication` 可以查看当前redis的信息

```shell
127.0.0.1:6379> INFO replication
# Replication
role:master # 是什么级别 、什么角色
connected_slaves:0 # 有多少个随从
master_failover_state:no-failover
master_replid:b7a23646a995a5b4a25ba1a5c5cd02706a0237c6
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

这里附带一下我的完整流程

这里我是docker 所以 不提及别的

首先 给docker创建一个网关

```shell
docker network create redis --subnet 172.38.0.0/16
```

然后查看这个网关

```shell
docker network ls
```

![image-20211224225758243](/images/SpringBoot/04-Redis/image-20211224225758243.png)

看到了redis表示成功

接着 在你的用户的根目录下创建一个redis文件夹

```shell
mkdir redis
cd redis
mkdir data-0 data-1 data-2
```

接着运行如下脚本（存储为shell，修改下对应的值运行）

```shell
for index in $(seq 0 2);\
do \
mkdir -p /home/你的用户名/redis/data-${index}/conf
touch /home/你的用户名/redis/data-${index}/conf/redis.conf
cat << EOF >> /home/你的用户名/redis/data-${index}/conf/redis.conf
port 6379
bind 0.0.0.0
protected-mode no
daemonize no
appendonly yes
requirepass  这里设置访问密码 也可以不设置
EOF
done

```

接着运行 然后cd进去查看

![image-20211224230003789](/images/SpringBoot/04-Redis/image-20211224230003789.png)

看到有redis.conf表示成功

接着再创建一个shell脚本

```shell
for index in $(seq 0 2);\
do \
docker run -p 这里填写外部能访问的端口号${index}:6379 --name redis-${index} \
-v /home/你的用户名/redis/data-${index}/data:/data \
-v /home/你的用户名/redis/data-${index}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.1${index} redis redis-server /etc/redis/redis.conf
done

```

注意 ` -p 这里填写外部能访问的端口号${index}:6379 ` 这里  可以通过更该shell脚本的方式 让 data-1 和 2不能被外网访问（shell脚本加个判断 不是0的话 就不加这个）

#### 临时配置

接着进入redis-1和redis-2容器

```shell
docker exec - it redis-1 bash
# 进入后 先连接上redis-cli并验证
redis-cli -a 你的密码

#接着 运行如下命令
SLAVEOF 172.38.0.10 6379

# 如果主库设置了密码（redis-0） 则要进行验证
config set masterauth 主库密码

```

两个语法说明

```shell
slaveof <master-ip> <master-port>。
 <master-ip>为主库服务ip，<master-port>表示主库所在端口，默认6379 配置本库是谁的从库
config set masterauth <master-password>。
 <master-password>即为主库访问密码 这个是拿来验证密码的
```

接着你就能在主机中看到：

```shell
role:master
connected_slaves:2
slave0:ip=172.38.0.11,port=6379,state=online,offset=1512,lag=0
slave1:ip=172.38.0.12,port=6379,state=online,offset=1512,lag=0
master_failover_state:no-failover
master_replid:f9d1b67fba9d354ac724776540481cb8bf526353
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:1512
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:1512
```

自己有两个从机

此时你的data目录应该是如下的样子

![image-20211224231121355](/images/SpringBoot/04-Redis/image-20211224231121355.png)

此时你的主机中进行任何操作 从机都能同步的收集到信息

#### 永久配置

之前那种配置方式比较痛苦---繁琐且每次重启之后都需要重新配置

我们可以在从机的配置文件中进行直接的配置

```ini
replicaof 主机IP 端口
masterauth 主机密码（如果有的话）
```

我这里的配置是

```ini
replicaof 172.38.0.10 6379
masterauth 123456
```

接着重启docker 访问 效果依旧

```shell
> MyRedis connected!
> info replication
# Replication
role:master
connected_slaves:2
slave0:ip=172.38.0.11,port=6379,state=online,offset=182,lag=1
slave1:ip=172.38.0.12,port=6379,state=online,offset=182,lag=1
master_failover_state:no-failover
master_replid:961372891ca5d9ba9ceaefdae8fdaaf9a894a677
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:182
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:182

```

### 主从复制的特点

主机可以设置值，从机不能set值，只能get

从机想要set值的话会报错

```shell
127.0.0.1:6379> set k2 v2
(error) READONLY You can't write against a read only replica.
```

主机即使宕机了，从机的内容依旧完好无损

如果主机宕机了，它依旧是不能get

这也是主从复制的缺点

但是从机宕机了，主机和其他从机依旧能够正常运行

并且从机从新链接上来之后 可以直接获取到在宕机期间其他机子set的值

Slave（从机）启动成功连接到master后会发送一个sync同步命令

Master（主机）接到命令，启动后台的存盘进程，同时收集所有接收到用于修改数据集的命令，在后台进程执行完毕后，master将传送整个数据文件到slave，并完成一次完全同步

全量复制：而Slave服务在接收到数据库文件数据后，将其存盘并加载到内存中

增量复制：Master继续将新的所有收集到的修改命令依次传递给slave，完成同步

但是只要重新连接master，一次完全同步（全量复制）将被自动执行，我们的数据一定可以在从机中看到

如果说从机不想继续当了 可以通过以下命令取消它本身追随的主机

```shell
slaveof no one
```

这条命令可以让从机变回master

### 哨兵模式

​也叫自动选老大方式 之前的主从模式缺陷很多

​主机宕机了，就得手动选主机 这是最主要的

​所以哨兵模式来了，它能解决这个“谋朝篡位”的问题

​哨兵模式（Sentinel）是谋朝篡位的自动版，能监控后台主机是否故障，如果故障了根据投票数量**自动将从库转换为主库**

​哨兵模式是一种特殊的模式，首先Redis提供了哨兵的命令，哨兵是一个**独立的进程**，会独立运行，其原理是哨兵通过发送命令，等待Redis服务器响应，从而监控运行的多个Redis实例

​ ![image-20211225122151292](/images/SpringBoot/04-Redis/image-20211225122151292.png)

可能你会想到一个问题---这个哨兵死了咋办

哨兵是可以配置多个滴~

![image-20211225122339629](/images/SpringBoot/04-Redis/image-20211225122339629.png)

**实际场景中，哨兵一定是多个的**

> 假设主服务器宕机，哨兵1会先检测到这个结果，系统并不会马上进行failover（从新选举）的过程，仅仅是哨兵1主观认为主服务器是不可用的，这个现象称为**主观下线**
>
> 当后面的哨兵也检测到主服务器不可用，并且达到一定数量时，那么哨兵之间就会进行一次投票，投票的结果由一个哨兵发起，进行failover操作
>
> 切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的服务器切换为主机，这个过程也被称为**客观下线**
>
> 主（宕机）--->哨兵A、B、C检测主不可用--->随机一个哨兵发起投票、哨兵们投票---->故障转移--->发布订阅---->通知到redis服务器--->切换主机
>
> **注意：通常不会配置偶数的哨兵，偶数的哨兵有概率产生平票**

如果说哨兵全挂了，那就是真滴GG

### 配置哨兵

<https://www.cnblogs.com/joeymary/p/11492791.html> 参照这篇文章

理论上来说。。有多少个服务就要配置多少个哨兵

但是....我的服务器性能比较拉胯（2g4h）不敢多开 就只开一个了

首先在redis-0（master）的dokcer中创建一个文件（需要先安装vim）

安装vim

```shell
mv /etc/apt/sources.list /etc/apt/sources.list.bak
cat <<EOF >/etc/apt/sources.list
deb http://mirrors.ustc.edu.cn/debian stable main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free
EOF
apt update
apt install vim
```

接着创建一个文件

```shell
vim sentinel.conf
```

键入如下内容

```ini
# 哨兵模式的端口 如果要启动多个哨兵，则要配置多个端口 默认值时26379
port 26379
# sentinel monitor 这个是固定的写法
# mymaster 这个哨兵的名字
#  127.0.0.1 6379 要监控的主机
# 1代表的是同意主节点不可用的sentinel数量 也就是当多少个哨兵判定主机挂了之后 就会自动投票切换主机
# 这里的1是指只要有1个哨兵认为主服务器已经下线，主服务器就会被判定为客观下线
sentinel monitor mymaster 127.0.0.1 6379 1

# 哨兵的工作目录 下面是默认值
dir /tmp

# 当redis中开启了requirepass foobared 授权密码之后 所有链接redis的客户端都要提供密码
# 这里是设置哨兵链接主从的密码 注意 主从的访问密码都必须要相同
sentinel auth-pass mymaster 密码

# 指定多少毫秒后 主节点没有响应哨兵则认为主节点下线 默认30s
sentinel down-after-milliseconds mymaster 30000

# 配置发生了 重新选举 主备切换最多可以有多少个从机对新的master同步
# 这个数字越小 完成failover所需的时间就越长
# 但是这个数值越大 就意味着 多个slave因为replication不可用
# 可以通过设置为1 保证每次只有一个slave
sentinel parallel-syncs mymaster 1

# 故障转义的超时时间  默认是3分钟
sentinel failover-timeout mymaster 180000

# 配置当某一个件事情发生的时候要执行的shell脚本，例如全部redis都挂的时候
# notification-script是通知形脚本 注意 配置了就一定要有该文件 否则会启动不成功
#sentinel notification-script mymaster /var/xxx/xxxx.sh

# 下面这个是当重新选举出主节点时会执行的脚本 通知相关的人告知master地址已改变
#sentinel client-reconfig-script mymaster /var/xxx/xxx.sh


daemonize yes
```

接着运行：

```shell
redis-server sentinel.conf --sentinel
```

## 集群

![image-20211225132812624](/images/SpringBoot/04-Redis/image-20211225132812624.png)

集群最少需要三主三从（六台服务器）..

我们首先把之前配置的所有redis都删掉

执行如下步骤的前置条件：确保给docker创建了一个网关

```shell
docker network create redis --subnet 172.38.0.0/16
```

接着我们用shell创建六个conf

```shell
for index in $(seq 0 5);\
do \
mkdir -p /home/halo/redis/data-${index}/conf
touch /home/halo/redis/data-${index}/conf/redis.conf
cat << EOF >> /home/halo/redis/data-${index}/conf/redis.conf
port 6379
bind 0.0.0.0
protected-mode no
daemonize no

# 开启集群模式
cluster-enabled yes

# 设置节点的配置文件
#cluster-config-file nodes.conf

# 设置节点的失联时间
cluster-node-timeout 5000
# 集群各节点IP地址 注意 这个IP需要特别注意一下，如果要对外提供访问功能，需要填写宿主机的IP，如果填写docker分配的IP（172.x.x.x），可能会导致部分集群节点在跳转时失败
cluster-announce-ip 172.38.0.1${index}
# 集群节点映射端口 相当于监控哪个redis
cluster-announce-port 6379
# 集群总线端口 这个相当于所有集群节点交流的端口
cluster-announce-bus-port 16379
#appendonly yes

# 访问密码相关配置
requirepass 123456
masterauth 123456
EOF
done

```

接着再写一个shell脚本

```shell
for index in $(seq 0 5);\
do \
docker run -p redis对外IP${index}:6379 -p 16379${index}:16379 --name redis-${index} \
-v /home/halo/redis/data-${index}/data:/data \
-v /home/halo/redis/data-${index}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.1${index} redis redis-server /etc/redis/redis.conf
done
```

172.38.0.10

172.38.0.15

```shell
redis-cli --cluster create  172.38.0.10:6379  172.38.0.11:6379 172.38.0.12:6379  172.38.0.13:6379  172.38.0.14:6379  172.38.0.15:6379 -a u8li0XRo5tydsOOFtOBJJbuieF8HYZzGBL0CvvB3bGzQQLJa7RQYSvmSvZHQmEvSmwyzZGgceXzmIwWnt5Nz6T1r006QIOd1kOuM --cluster-relicas 1
```

redis-cli --cluster create  xxx

查看命令用法: redis-cli  --cluster  help
