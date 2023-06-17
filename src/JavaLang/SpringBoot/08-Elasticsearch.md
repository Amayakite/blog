---
title: 08-ElasticSearch
date: 2021-12-30 22:45:50
category: SpringBoot
tag:
- ElasticSearch
- SpringBoot
---

# 简介

我们在实际开发过程中可能会遇到三种数据类型

- 结构化数据
  - 例如用户的账号、密码、年龄等
  - 这些信息是有关系的，所以我们可以保存到关系型数据库内
  - 但是这玩意也有缺点
    - 结构是固定死了的，我们已经有了固定结构之后在想添加新的字段扩展不方便
- 非结构化数据
  - 人话：我们无法用二维表表示的东西
  - 比方说服务器日志、我们的通信记录、我们的工作文档、报表、视频、图片等内容
  - 这些玩意的维度广度都比较大，所以数据存储和查询的成本都是非常大的
  - 一般会将这样的数据保存到nosql数据库内，比如redis，使用k-v结构进行保存
  - 通过key查询数据 相对来说比较快
- 半结构化数据
  - 就是将内容和结构混合在一起的数据
  - 比如XML、HTML、Markdown
  - 这样的数据一般也是保存在NoSQL数据库内
  - 但是这玩意的话 查询起来不是很容易

我们的实际生产环境中，并非都是关系形结构化的信息，我们无法向数据库模糊查询那样模糊匹配，更不可能遍历所有的内容做匹配

毕竟查询的目的是为了让我们更快速的找到自己想要的信息

所以这ElasticSearch这类的**中间件**诞生了

好！中间件又喜加一

## ElasticSearch概述

![Elasticsearch logo.svg](/images/SpringBoot/08-Elasticsearch/1920px-Elasticsearch_logo.svg.png)

The Elastic Static，包括ElasticSearch、Kibana、Beats和Logstash(也称为TLK Stack)

能够安全可靠的获取任何来源、任何风格、任何格式的数据，然后实时对数据进行搜索、分析和可视化

ElaticSearch，简称为ES，ES是一个**开源的高扩展的分布式全文搜索引擎**，是整个Elastic Static的核心

它可以近乎实时的存储、搜索数据

本身扩展性非常好，可以扩展到上百台服务器，处理PB级别的数据

### 全文搜索引擎

Google、百度类的网站搜索，他们都是根据网页内的关键字生成索引，我们在搜索的时候输入关键字，他们会将该关键字即索引匹配到的所有网页返回，还有常见的项目中的应用日志等

对于这些非结构化的数据文本，关系型数据库搜索不是能很好的支持

一般传统的数据库，全文搜索实现的都非常鸡肋，因为一般也没人用数据库存放文本字段

进行全文搜索需要扫描整个表，如果数据量打的话即使对SQL的语法优化，也收效甚微，即使建立了索引，维护起来也非常麻烦，而且insert和update都会重新构建索引

基于以上原因可以分析出，在一些生产环境中，使用常规的搜索方式，性能是非常差的

- 搜索的数据对象是大量的非结构化的文本数据
- 文件记录量能达到数十万个、百万个，甚至更多
- 支持大量基于交互式文本的查询
- 需求非常灵活的全文查询
- 对高度相关的搜索结果的有特殊需求，但是没有可用的关系型数据库可以满足
- 对不同记录类型，非文本数据操作或安全事务处理的需求相对较少的情况

为了解决结构化数据搜索和非结构化数据搜索性能的问题，我们就需要专业、健全、强大的全文搜索引擎

这里说到的全文搜索引擎指的是目前广泛应用的主流搜索引擎

它的原理是计算机的索引程序通过扫描文章中的每一个词，对每一个词建立一个索引，指明该词在文章中出现的次数和位置

当用户查询时，检索程序就根据事先建立的搜索引擎进行查找，并将查找的结果反馈给用户的检索方式

这个过程类似于通过字典中的检索字查字表的过程

### ElasticSearch And Solr

Lucene是Apache软件基金会Jakarta项目组的一个子项目（草 tomcat10同一个项目组的）

提供了一个非常强大的应用程式接口，能够做到全文索引和搜寻

在Java开发环境内Lucene是一个成熟的免费开源工具，就其本身而言，Lucene是当前及近几年最受欢迎的免费Java信息检索程序库

但Lucene只是一个提供全文搜索功能类库的核心工具包，真正的使用他还需要一个完善的服务框架搭建起来进行应用

在使用过程中，一般都会将ElasticSearch和Solr这两个软件进行对比，然后进行选型，这两个搜索引擎都是流行的，先进的开源式搜索引擎

他们都是围绕着底层的核心库-Lucene构建的---但他们又是不同的，像是所有的东西一样，每个都有其有点和缺点

![image-20211230232211141](/images/SpringBoot/08-Elasticsearch/image-20211230232211141.png)

那么我们该如何选择呢？

- Google搜索趋势表名，和Solr相比，ElasticSearch具有更大的吸引力，但这并不意味着Apache Solr已经死亡，它目前依旧是最受欢迎的搜索引擎之一，有着强大的社区和开源的支持

- 和Solr相比，ElasticSearch易于安装且非常轻巧，此外，我们可以在几分钟内安装并运行ElasticSearch，但如果ElasticSearch管理不当，这种易于部署可能会成为一个问题。基于Json的配置很简单，但如果要为文件中的每个配置指定注释，那么这玩意不太适合。总的来说，如果应用使用的是Json，那么ElasticSearch是一个更好的选择，否则最好使用Solr，它的`schema.xml`和`solconfig.xml`都有很好的文档记录

- Solr拥有更强大、更成熟的用户，开发者和贡献社区，ES虽然拥有的规模较小但活跃的用户社区以及不断增长的贡献者社区

- Solr的贡献者和提交者来自许多不同的组织，而ElasticSearch提交者来自单个公司

- Solr更成熟，但ES增长迅速，更稳定

- Solr是一个非常有据可查的产品，具有更清晰的示例和API应用场景，ElasticSearch的文档组织良好，但它缺乏好的示例和清晰的配置说明

**那么，到底是Solr还是ES呢？**

有时很那找到明确的答案，但是我们可以更具特征来归纳

- 由于易于使用，ElasticSearch在新开发者中更受欢迎，一个下载和一个命令就可以启动一切

- 如果除了文本搜索之外还需要它来处理分析查询，ElasticSearch是更好的选择

- 如果需要分布式搜索，则需要ElasticSearch，对于良好可伸缩性和及性能分布式环境，它是更好的选择

- ElasticSearch在开源日志管理用例中占主导地位，许多组织在ElasticSearch中搜索他们的日志以使其可搜索

- 如果喜欢指标和监控，那么请使用ElasticSearch，因为相较于Solr，ElasticSearch暴露了更多的关键指标

ES的数据用例：

- **Github**：在2013年初，抛弃了Solr，采取ES，才做PB级别的搜索，Github才用ES搜索20TB的数据，包含13亿文件的1300亿代码

- **维基百科**：启用以ES为基础的核心搜索架构

- **SoundCloud**：使用ES为1.8E用户提供及时而精准的音乐搜索服务

- **百度**：目前广泛使用ES作为文本数据分析，才用百度服务器上的各类指标及用户自定义数据，通过对各种数据进行多维分析展示，辅助定位分析实例异常或业务层面异常。目前覆盖百度内部超多的业务，单集群最大一百台机器，200个ES节点，每天导入30TB+的数据

- **新浪**：使用ES分析处理32亿条实时日志

- **阿里**：使用ES构建日志采集和分析体系

- **Stack Overflow**：也是才用了ES来记录问题和答案

# ElasticSearch入门

## 下载及安装

官方网址：<https://www.elastic.co/cn>

下载ElasticSearch：<https://www.elastic.co/cn/downloads/elasticsearch>

下载后，你能得到一个压缩包，解压可以得到这些文件

![image-20211230234912737](/images/SpringBoot/08-Elasticsearch/image-20211230234912737.png)

- bin：二进制可执行文件
- config：配置项
- jdk：内置了一个Java
- lib：java的jar包之类的依赖
- logs：日志
- modules：模块
- plugins：插件

接着我们启动bin下的文件（建议在powershell内启动 不建议双击运行）

```shell
[2021-12-30T23:52:21,291][INFO ]
[o.e.x.d.l.DeprecationIndexingComponent] [DESKTOP-USEHA9I]
deprecation component started[2021-12-30T23:52:21,594][INFO ]
[o.e.t.TransportService   ] 
[DESKTOP-USEHA9I] 
publish_address {127.0.0.1:9300},
bound_addresses {127.0.0.1:9300}, {[::1]:9300}
```

启动后会有一个端口号要注意一下

9300为ElasticSearch集群间组件的通讯端口，9200为浏览器访问的HTTP协议RestFul端口

接着我们访问localhost:9200

![image-20211230235657678](/images/SpringBoot/08-Elasticsearch/image-20211230235657678.png)

看到了这个就说明成功了

这玩意是依赖Java开发的，需要JDK8+默认安装包内带有JDK环境，如果系统设置了`JAVA_HOME`环境变量，则用系统的，否则用自带的，一般情况下，建议自己设置下 用系统的

## 数据格式

ES是面向文档型数据库，一条数据在这里就是一个文档

大概就是

![image-20211231002653452](/images/SpringBoot/08-Elasticsearch/image-20211231002653452.png)

ES里的index可以看做成一个库，而Types相当于表，Document相当于行

这里Types的概念已经被逐渐弱化了，在ES6.x版本中，一个index只能包含一个type，在ES7.x中，Type的概念已经被删除了

并且在ES内，数据是倒排索引的

正排：通过key找value，倒排，通过value找key

![image-20211231003023722](/images/SpringBoot/08-Elasticsearch/image-20211231003023722.png)

正排索引就是通过id找context，但是倒排不一样 有了一个额外的东西

![image-20211231003232284](/images/SpringBoot/08-Elasticsearch/image-20211231003232284.png)

# 索引操作

### 创建索引-PUT

这玩意是基于RestFul风格来进行数据传输的，所我们只要进行如下操作就可以创建一个数据库

我们只需要像ES服务器发送put请求，即可创建数据库

- PUT-`http://localhost:9200/shopping`
  - 创建一个shopping的数据库

这里开始用postman来代替我们进行测试

![image-20211231004006598](/images/SpringBoot/08-Elasticsearch/image-20211231004006598.png)

会返回一个json格式的返回结果

```json
{
    // 表示创建是否成功 true成功
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "shopping"
}
```

如果说你再次发送相同的请求 会发现

```json
{
    "error": {
        "root_cause": [
            {
                "type": "resource_already_exists_exception",
                "reason": "index [shopping/7y1dV5_6Tw2JTVyli7RKrg] already exists",
                "index_uuid": "7y1dV5_6Tw2JTVyli7RKrg",
                "index": "shopping"
            }
        ],
        "type": "resource_already_exists_exception",
        "reason": "index [shopping/7y1dV5_6Tw2JTVyli7RKrg] already exists",
        "index_uuid": "7y1dV5_6Tw2JTVyli7RKrg",
        "index": "shopping"
    },
    "status": 400
}
```

返回了一个异常， 并且是400 code 这里说明这个玩意已经存在了

PS：索引只支持GET/PUT/Delete/HEAD请求 分别对应 获取 创建 删除 head和get差不多，区别在于消息通过请求头返回

### 索引的查询、删除-GET/DELETE

- 查询-GET请求`http://localhost:9200/shopping`
- 删除-DELETE请求`http://localhost:9200/shopping`

查询的结果

```json
{
    "shopping": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "routing": {
                    "allocation": {
                        "include": {
                            "_tier_preference": "data_content"
                        }
                    }
                },
                "number_of_shards": "1",
                "provided_name": "shopping",
                "creation_date": "1640882386116",
                "number_of_replicas": "1",
                "uuid": "7y1dV5_6Tw2JTVyli7RKrg",
                "version": {
                    "created": "7160299"
                }
            }
        }
    }
}
```

当然 如果要获取一个索引的所有信息 这里以ES自带的`_cat`索引为例

只需要GET这个地址`http://localhost:9200/_cat/indices?v`

你就能获取到如下信息

```md
health status index            uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   .geoip_databases aOJVvE_FT2aG2Y9BKprCRQ   1   0         44           44     43.8mb         43.8mb
yellow open   shopping         7y1dV5_6Tw2JTVyli7RKrg   1   1          0            0       226b           226b

```

他这里棉的一些数据之后会说到

删除索引：DELETE请求`http://localhost:9200/shopping`

如果删除成功会返回如下内容

```json
{
    "acknowledged": true
}
```

删除失败会返回如下内容

```json
{
    "error": {
        "root_cause": [
            {
                "type": "index_not_found_exception",
                "reason": "no such index [shopping]",
                "resource.type": "index_or_alias",
                "resource.id": "shopping",
                "index_uuid": "_na_",
                "index": "shopping"
            }
        ],
        "type": "index_not_found_exception",
        "reason": "no such index [shopping]",
        "resource.type": "index_or_alias",
        "resource.id": "shopping",
        "index_uuid": "_na_",
        "index": "shopping"
    },
    "status": 404
}
```

如果说一个索引删除后再试图查询，会返回如下内容

```json
{
    "error": {
        "root_cause": [
            {
                "type": "index_not_found_exception",
                "reason": "no such index [shopping]",
                "resource.type": "index_or_alias",
                "resource.id": "shopping",
                "index_uuid": "_na_",
                "index": "shopping"
            }
        ],
        "type": "index_not_found_exception",
        "reason": "no such index [shopping]",
        "resource.type": "index_or_alias",
        "resource.id": "shopping",
        "index_uuid": "_na_",
        "index": "shopping"
    },
    "status": 404
}
```

# 文档操作

## 创建文档-POST

索引已经创建好了，接下来我们来创建文档，并添加数据

这里的文档可以比作数据库内的表数据，添加的数据格式为json格式

在postman中，向ES服务器发**POST**请求

`http://localhost:9200/shopping/_doc`

然后请求体(raw)内容为

```json
{
    "title":"小米手机",
    "category":"小米",
    "images":"https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
    "price":4699.00
}
```

请求成功后，会返回如下内容

![image-20211231122351161](/images/SpringBoot/08-Elasticsearch/image-20211231122351161.png)

```json
{
    "_index": "shopping",
    "_type": "_doc",
    // 数据的唯一性标识 类似于UUID 由ES随机生成
    "_id": "p4i6Dn4BV-gGdE5MAcvG",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

同样的请求多次发送 返回的id是不同的（也就是数据内容可以重复，但是这个id就像是主键一样不能重复也不可能重复）

第二次发送：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "qIi9Dn4BV-gGdE5MjMud",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 1,
    "_primary_term": 1
}
```

当让我们也可以在请求uri中添加下额外的信息来自定义ID

`http://localhost:9200/shopping/_doc/1001`

此时发送，返回的唯一性ID就是我们指定的ID

![image-20211231122952292](/images/SpringBoot/08-Elasticsearch/image-20211231122952292.png)

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 2,
    "_primary_term": 1
}
```

不过特别不推荐这样做，因为自定义id，每次插入es会去校验是否重复，数据量大的情况下根本无法接受

我们还可以通过另一种方式来创建

`http://localhost:9200/shopping/_create/1002`

![image-20211231123149960](/images/SpringBoot/08-Elasticsearch/image-20211231123149960.png)

效果都是一样的，都成功添加了数据

## 查询文档-主键查询

如果是通过ID查找的话 和我们之前创建文档一样的方式

`http://localhost:9200/shopping/_doc/1001`

GET请求即可

![image-20211231123432021](/images/SpringBoot/08-Elasticsearch/image-20211231123432021.png)

返回值

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "_seq_no": 2,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "title": "小米手机",
        "category": "小米",
        "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
        "price": 4699.00
    }
}
```

如果试图查询一个不存在的ID

<http://localhost:9200/shopping/_doc/100>

会返回

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "100",
    "found": false
}
```

## 查询文档-全查询

如果想要查询所有数据

则可以：

GET ：<http://localhost:9200/shopping/_search>

将会返回我们的所有数据

```json
{
    "took": 6,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 4,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "p4i6Dn4BV-gGdE5MAcvG",
                "_score": 1.0,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "qIi9Dn4BV-gGdE5MjMud",
                "_score": 1.0,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "1002",
                "_score": 1.0,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                }
            }
        ]
    }
}
```

## 修改文档-全量修改

比如说我想把1001的数据修改下

只需要 PUT请求 <http://localhost:9200/shopping/_doc/1001>

然后请求体内容写上我们修改后的内容

```json
{
    "title":"小米12",
    "category":"小米",
    "images":"https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
    "price":8888.00
}
```

然后就能得到如下内容

![image-20211231124522970](/images/SpringBoot/08-Elasticsearch/image-20211231124522970.png)

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 2,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 4,
    "_primary_term": 1
}
```

接着我们查询一下，内容也是同步变动的

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 3,
    "_seq_no": 5,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "title": "小米12",
        "category": "小米",
        "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
        "price": 8888.00
    }
}
```

但是这种update是全量的数据更新， 也就是说有内容都会被修改为我们传入的

实际过程中，我们往往只需要修改指定的一处，所以就需要用到局部修改了

## 修改文档-局部修改

局部修改的话 就得用`POST`请求

请求格式如下

<http://localhost:9200/shopping/_update/1001>

注意 这个`_update` 如果还是`_doc`的话是修改不了的

然后请求体格式如下

```json
{
    "doc":{
        // 这里填写你要修改的属性和对应的值
        "title":"苹果手机"
    }
}
```

结果如下

![image-20211231125217350](/images/SpringBoot/08-Elasticsearch/image-20211231125217350.png)

JSON：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 5,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 7,
    "_primary_term": 1
}
```

## 删除文档

使用`DELETE`请求

<http://localhost:9200/shopping/_doc/1001>

删除成功返回

```json {6}
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 6,
    "result": "deleted",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 8,
    "_primary_term": 1
}
```

删除不存在的返回

```json {6}
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 7,
    "result": "not_found",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 9,
    "_primary_term": 1
}
```

## 查询文档-条件查询

**GET请求**

方式一 ：params

`http://localhost:9200/shopping/_search?q=category:小米`

- `q=xxx:xx`这种格式是 指定某个字段等于啥 就像是 where category = "小米" 这样
- 可以指定多个`q=xxx:qq` 等同mysql内的`where .... and ... and ..`

查询结果

```json
{
    "took": 5,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 0.12907705,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "p4i6Dn4BV-gGdE5MAcvG",
                "_score": 0.12907705,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                }
            }
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "1002",
                "_score": 0.12907705,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 3366.0
                }
            }
        ]
    }
}
```

当然 也可以通过请求体的方式来指定查询条件

GET <http://localhost:9200/shopping/_search>

```json
{
    "query":{
        "match":{
            "category":"小米"
        }
    }
}
```

结果

![image-20211231130714479](/images/SpringBoot/08-Elasticsearch/image-20211231130714479.png)

## 查询文档-分页查询

GET 请求

<http://localhost:9200/shopping/_search>

body：

```json
{
    "query":{
        //match_all 代表查询所有 也可以根据自己的需求替换成指定的查询规则
        "match_all":{
           
        }
    },
    // 索引的位置
    "from":0,
    // 查询的数量
    "size":2
}
```

上方等同于sql内的`select * from xxx limit 0,2`

注意 最大返回20000条

结果：

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "p4i6Dn4BV-gGdE5MAcvG",
                "_score": 1.0,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "qIi9Dn4BV-gGdE5MjMud",
                "_score": 1.0,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                }
            }
        ]
    }
}
```

但实际上我们可能不需要这些文档的全部数据 有可能只需要一个title

## 查询文档-指定返回字段

这个时候就可以通过`_source`指定字段

GET <http://localhost:9200/shopping/_search>

body:

```json
{
    "query":{
        "match_all":{
           
        }
    },
    "from":0,
    "size":2,
    // source接受一个数组 指定要返回哪些值 等同于sql中的 select xxx,xxx from xxx;
    "_source":["title"]
}
```

结果

```json
{
    "took": 7,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "p4i6Dn4BV-gGdE5MAcvG",
                "_score": 1.0,
                "_source": {
                    "title": "小米手机"
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "qIi9Dn4BV-gGdE5MjMud",
                "_score": 1.0,
                "_source": {
                    "title": "小米手机"
                }
            }
        ]
    }
}
```

## 查询文档-结果排序

依旧是GET

<http://localhost:9200/shopping/_search>

body：

```json
{
    "query":{
        "match_all":{
           
        }
    },
    "sort":{
        // 指定排序字段
        "price":{
            // asc 小到大 desc 大到小
            "order":"asc"
        }
    }
}
```

运行结果

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": null,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "1002",
                "_score": null,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 3366.0
                },
                "sort": [
                    3366.0
                ]
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "p4i6Dn4BV-gGdE5MAcvG",
                "_score": null,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                },
                "sort": [
                    4699.0
                ]
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "qIi9Dn4BV-gGdE5MjMud",
                "_score": null,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
                    "price": 4699.00
                },
                "sort": [
                    4699.0
                ]
            }
        ]
    }
}
```

## 查询文档-多条件查询、范围查询

GET请求

<http://localhost:9200/shopping/_search>

1. 固定值查询

body：

```json
{
    "query":{
        // 声明是一个多条件查询
        "bool":{
            // must 相当于 mysql内的 and Java的 &&
            // 可以换成should 相当于mysql 内的 or
            "must":[
                {
                    "match":{
                        "category":"小米"
                    }
                },{
                    "match":{
                        "price":3366
                    }
                }
            ]
        }
    }
}
```

2. 范围查询

body:

```json
{
    "query":{
        "bool":{
            // must 相当于 mysql内的 and Java的 &&
            //  // 可以换成should 相当于mysql 内的 or
            "must":[
                {
                    "match":{
                        "category":"小米"
                    }
                }
            ],
            "filter":{
                "range":{
                    "price":{
                        // 范围查询  gt达标大于
                        // 还有eq、ne、gt、lt、ge、le 具体的用法百度
                        "gt":3000
                    }
                }
            }
        }
    }
}
```

## 文档查询-完全匹配查询

正常查询中

我的几条数据的category都是小米 那么用米也可以匹配上

```json
{
    "query":{
        "match":{
            "category":"米"
        }
    }
}
```

![image-20211231142505742](/images/SpringBoot/08-Elasticsearch/image-20211231142505742.png)

因为我们用的是match--分词查询-这就有点类似于sql中的正则匹配

ES会将文章的内容进行分词 在倒排索引中给我们去进行匹配

举个例子

我们现在有三条数据

- 小米
- 华为
- 小红米

那么我们这样进行查询的话：

```json
{
    "query":{
        "match":{
            "category":"小华"
        }
    }
}
```

结果的话是三条数据都能匹配上

因为它会自动将我们的 小 和 华分成两个词

然后逐一对词库进行匹配

- 小米：小，米
- 华为：华，为
- 小红米：小，红，米

所以就能匹配的上..

如果我们不想分词匹配而是完全匹配

例如 我输入小米只匹配category内的内容只为小米的 而并非红米的

就要这样

```json {3}
{
    "query":{
        "match_phrase":{
            "category":"小米"
        }
    }
}
```

但是注意 如果我输入

```json
{
    "query":{
        "match_phrase":{
            "category":"米"
        }
    }
}
```

依旧能把所有的小米和红米匹配上…

## 文档查询-结果高亮显示

如果说我想让查询的结果高亮显示，需要

```json {7-10}
{
    "query":{
        "match_phrase":{
            "category":"小米"
        }
    },
    "highlight":{
       "fields":{
            "category":{}
       }
    }
}
```

查询出的结果如下所示

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1002",
    "_score": 0.26706278,
    "_source": {
        "title": "小米手机",
        "category": "小米",
        "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
        "price": 3366.0
    },
    "highlight": {
        "category": [
            "<em>小</em><em>米</em>"
        ]
    }
}
```

如果说是一个字的话

```json
{
    "query":{
        "match_phrase":{
            "category":"米"
        }
    },
    "highlight":{
       "fields":{
            "category":{}
       }
    }
}
```

结果：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "p4i6Dn4BV-gGdE5MAcvG",
    "_score": 0.13353139,
    "_source": {
        "title": "小米手机",
        "category": "小米",
        "images": "https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi12proarp71i/header_img1.jpg",
        "price": 4699.00
    },
    "highlight": {
        "category": [
            "小<em>米</em>"
        ]
    }
},
```

## 文章查询-聚合查询

### 分组

我们现在想把不同价格之间的做一个统计

```json
{
    // 聚合操作
    "aggs":{
        // 分组名称 可以随意取名
        "price_group":{
            // 分组
            "terms":{
                // 分组字段
                "field":"price"
            }
        }
    }
}
```

查询结果中会多出这些

```json
"aggregations": {
    "price_group": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
            {
                "key": 4699.0,
                "doc_count": 2
            },
            {
                "key": 3366.0,
                "doc_count": 1
            }
        ]
    }
}
```

但是这样的话原始数据也在查询结果内

![image-20211231144725551](/images/SpringBoot/08-Elasticsearch/image-20211231144725551.png)

### 只取统计的字段

如果我们只想要统计的字段的话 只需要

```json {13}
{
    // 聚合操作
    "aggs":{
        // 分组名称 可以随意取名
        "price_group":{
            // 分组
            "terms":{
                // 分组字段
                "field":"price"
            }
        }
    },
    "size":0
}
```

设置查询的hits结果数量 设置为0

结果：

```json
{
    "took": 13,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "price_group": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
                {
                    "key": 4699.0,
                    "doc_count": 2
                },
                {
                    "key": 3366.0,
                    "doc_count": 1
                }
            ]
        }
    }
}
```

## 平均值等

- min ：最小值
- max ：最大值
- sum ：用所有值
- avg ：用所有值的平均值
- median ：用所有值的中间值

```json
{
    // 聚合操作
    "aggs":{
        // 分组名称 可以随意取名
        "price_group":{
            // 取平均值
            "avg":{
                // 分组字段
                "field":"price"
            }
        }
    },
    "size":0
}
```

结果：

```json
{
    "took": 3,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "price_group": {
            "value": 4254.666666666667
        }
    }
}
```

## 字段类型的约束（声明类型）

我们先创建一个User

PUT：<http://localhost:9200/user>

然后依旧是PUT请求 <http://localhost:9200/user/_mapping>

```json
{
    "properties":{
        // 指定字段
        "name":{
            // 字段的类型
            "type":"text",
            // 字段是否可以被索引查询
            "index":true
        },
        "sex":{
            // keyword 不能被分词查询 必须要完整匹配差能被查询
            "type":"keyword",
            "index":true
        },
        "tel":{
            "type":"keyword",
            // 不能够被索引
            "index":false
        }
    }
}
```

接着可以get <http://localhost:9200/user/_mapping> 查看字段信息

```json
{
    "user": {
        "mappings": {
            "properties": {
                "name": {
                    "type": "text"
                },
                "sex": {
                    "type": "keyword"
                },
                "tel": {
                    "type": "keyword",
                    "index": false
                }
            }
        }
    }
}
```

接着我们正常给他插入一条数据

POST <http://localhost:9200/user/_create/1001>

```json
{
    "name":"张三",
    "sex":"男",
    "tel":"1111"
}
```

运行结果

```json
{
    "_index": "user",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

接下来我们进行查询

GET <http://localhost:9200/user/_search>

查询name

```json
{
    "query":{
        "match":{
            "name":"老张"
        }
    }
}
```

查询的到

查询性别：通过模糊匹配

```json
{
    "query":{
        "match":{
            "sex":"老男人了"
        }
    }
}
```

查询不到

通过全部都匹配得上

```json
{
    "query":{
        "match":{
            "sex":"男"
        }
    }
}
```

如果说查手机号的话

```json
{
    "query":{
        "match_phrase":{
            "tel":"1111"
        }
    }
}
```

会直接报错 因为它不能被索引 也就是不能通过这个字段来进行查询

```json
{
    "error": {
        "root_cause": [
            {
                "type": "query_shard_exception",
                "reason": "failed to create query: Cannot search on field [tel] since it is not indexed.",
                "index_uuid": "xAk-eeCTQ4W28EVrSUlrmQ",
                "index": "user"
            }
        ],
        "type": "search_phase_execution_exception",
        "reason": "all shards failed",
        "phase": "query",
        "grouped": true,
        "failed_shards": [
            {
                "shard": 0,
                "index": "user",
                "node": "Y2PQHruOS0GY2BqQlRHN6A",
                "reason": {
                    "type": "query_shard_exception",
                    "reason": "failed to create query: Cannot search on field [tel] since it is not indexed.",
                    "index_uuid": "xAk-eeCTQ4W28EVrSUlrmQ",
                    "index": "user",
                    "caused_by": {
                        "type": "illegal_argument_exception",
                        "reason": "Cannot search on field [tel] since it is not indexed."
                    }
                }
            }
        ]
    },
    "status": 400
}
```

## Java API

### 环境准备

我们先创建一个空的maven项目

然后添加如下依赖

前面两个是必须的 一个连接 一个做json数据转换

这里说下 目前7.x版本的情况下 使用下面那个啥玩意 会提示说推荐用最新的elasticsearch-java

但是那个elasticsearch-java的文档特别云里雾里 我看了一下午没看明白 以后再研究了（估计以后也用不上这玩意 太痛苦了）

```xml
<dependencies>

    <dependency>
        <groupId>co.elastic.clients</groupId>
        <artifactId>elasticsearch-java</artifactId>
        <version>7.16.2</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.1</version>
    </dependency>



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

### 创建索引

```java {14}
public class ESTest_Client {
    public static void main(String[] args) throws IOException {

//        创建连接 这是固定操作
        HttpHost httpHost = new HttpHost("localhost", 9200, "http");
        RestClientBuilder builder = RestClient.builder(httpHost);

        RestHighLevelClient client =  new RestHighLevelClient(builder);

//        创建索引
        CreateIndexResponse user = client.indices().create(
            // 第一个是要创建的索引的信息 这里直接创建一个user的索引 所以填一个User就行了
            new CreateIndexRequest("user"),
            // 第二个是请求方式 我们直接使用默认的请求方式即可
            RequestOptions.DEFAULT
        );
        
        // 这里的user就相当于是封装好了的响应体 可以通过isAcknowledged 获取 json中的
        Boolean aBoolean = user.isAcknowledged();
        
        System.out.println(aBoolean);
        

//        关闭链接也是固定操作
        client.close();
    }
}

```

返回结果：true

### 查询索引

为了简化我之后的操作 这里整一个工具类

```java
public class RestClientUtils {

    private static final RestHighLevelClient TRANSPORT;

    static {
        HttpHost httpHost = new HttpHost("localhost", 9200, "http");
        RestClientBuilder builder = RestClient.builder(httpHost);
        TRANSPORT = new RestHighLevelClient(builder);
    }
 
    // 获取client
    public static RestHighLevelClient getClient() {
        return TRANSPORT;
    }
 
    // 关闭client
    public static void close() {
        try {
            TRANSPORT.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
```

接着我们写如下代码 即可等效于get <http://localhost:9200/user>

我们首先看下直接get 的结果

```json
{
    "user": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "routing": {
                    "allocation": {
                        "include": {
                            "_tier_preference": "data_content"
                        }
                    }
                },
                "number_of_shards": "1",
                "provided_name": "user",
                "creation_date": "1640945308925",
                "number_of_replicas": "1",
                "uuid": "B-DxzXR_Qluvrbckja07lA",
                "version": {
                    "created": "7160299"
                }
            }
        }
    }
}
```

在settings里面有蛮多信息 其他里面都没有东西 接下来我们代码实现 固定写法

```java {5-6}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    GetIndexRequest userRequest = new GetIndexRequest().indices("user");
    GetIndexResponse user = client.indices().get(userRequest, RequestOptions.DEFAULT);

    System.out.println("getSettings:"+user.getSettings()); // 之后就可以直接get到对应的信息
    System.out.println("getAliases:"+user.getAliases());
    System.out.println("getMappings:"+user.getMappings());
    RestClientUtils.close();


}
```

运行结果：

```md
getSettings:[user=>{"index.creation_date":"1640945308925","index.number_of_replicas":"1","index.number_of_shards":"1","index.provided_name":"user","index.routing.allocation.include._tier_preference":"data_content","index.uuid":"B-DxzXR_Qluvrbckja07lA","index.version.created":"7160299"}]
getAliases:[user=>[]]
getMappings:[user=>[]]
```

### 删除索引

更加固定的写法

```java {4}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();
    AcknowledgedResponse user = client.indices().delete(new DeleteIndexRequest("user"), RequestOptions.DEFAULT);
    System.out.println(user.isAcknowledged() ? "删除成功" : "删除失败");
    RestClientUtils.close();
}
```

结果：删除成功

如果删除失败，且是在索引不存在的情况下，在那一行中会直接抛出异常

### 新建文档

```java
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    //        插入数据
    //        1 创建请求体
    IndexRequest indexRequest = new IndexRequest();
    //        2 设置插入哪个索引 并指定id（如果说索引不存在，会自动创建）
    indexRequest.index("user").id("1001");
    //        3 创建一个User对象
    User user = new User("张三", "男", 18);
    //        把对象转换成json
    ObjectMapper objectMapper = new ObjectMapper();
    String userJson = objectMapper.writeValueAsString(user);
    //        4 设置请求体的内容 后面哪个是请求体的格式 只能选择json
    indexRequest.source(userJson, XContentType.JSON);
    //         发送请求 并获取响应
    IndexResponse response = client.index(indexRequest, RequestOptions.DEFAULT);

    //        获取响应状态
    System.out.println(response.getResult());

    RestClientUtils.close();
}
```

返回值：CREATED

直接get user表

![image-20211231185118642](/images/SpringBoot/08-Elasticsearch/image-20211231185118642.png)

Get 文档： <http://localhost:9200/user/_search>

结果

```json
{
    "took": 8,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "user",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "张三",
                    "sex": "男",
                    "age": 18
                }
            }
        ]
    }
}
```

### 修改文档

```java {6-12}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();
    ObjectMapper objectMapper = new ObjectMapper();

    //        修改数据
    //         创建UpdateRequest请求体
    UpdateRequest updateRequest = new UpdateRequest();
    updateRequest.index("user").id("1001");
    HashMap<String, String> map = new HashMap<>();
 // 注意 修改的话  只能用这种格式 不然修改不成。 可以同时传入多个这样的key-value
    updateRequest.doc( XContentType.JSON,"sex","女"); 

    //         发送请求 并获取响应
    UpdateResponse response = client.update(updateRequest, RequestOptions.DEFAULT);

    //        获取响应状态
    System.out.println(response.getResult());

    RestClientUtils.close();
}
```

若修改成功返回UPDATED

### 查询文档

```java
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    // 依旧是老一套 模板都长这样
    GetRequest getRequest = new GetRequest();
    // 这个id不可省略 会报错
    getRequest.index("user").id("1001");

    GetResponse response = client.get(getRequest, RequestOptions.DEFAULT);
    // 这里还可以获取一些其他信息 按需get即可 这里的getSourceAsString 是将返回值封装成String
    System.out.println(response.getSourceAsString());
    
    //字符串转换成Object
    User user = new ObjectMapper().readValue(response.getSourceAsString(), User.class);
    System.out.println(user);

    RestClientUtils.close();
}
```

运行结果：

```md
{"name":"张三","sex":"男","age":18}
User(name=张三, sex=男, age=18)
```

### 删除文档

```java
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    DeleteRequest deleteRequest = new DeleteRequest();
    deleteRequest.index("user").id("1001");

    DeleteResponse response = client.delete(deleteRequest, RequestOptions.DEFAULT);
    System.out.println(response.getResult());


    RestClientUtils.close();
}
```

结果：DELETED

### 批量插入

其实就是把多个单个插入整到一块一次性插入

```java
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    //        批量插入数据
    BulkRequest bulkRequest = new BulkRequest();
 
    // 这里就省略了实体对象转成JSon  直接插入了
    bulkRequest.add(new IndexRequest().index("user").id("1001").source("{\"name\":\"张三\",\"age\":18}", XContentType.JSON));
    bulkRequest.add(new IndexRequest().index("user").id("1002").source("{\"name\":\"李四\",\"age\":19}", XContentType.JSON));
    bulkRequest.add(new IndexRequest().index("user").id("1003").source("{\"name\":\"王五\",\"age\":20}", XContentType.JSON));
    bulkRequest.add(new IndexRequest().index("user").id("1004").source("{\"name\":\"赵六\",\"age\":21}", XContentType.JSON));


    BulkResponse responses = client.bulk(bulkRequest, RequestOptions.DEFAULT);

    System.out.println(responses.getTook());
    System.out.println(Arrays.toString(responses.getItems()));

    RestClientUtils.close();
}
```

结果测试

![image-20211231202525037](/images/SpringBoot/08-Elasticsearch/image-20211231202525037.png)

### 文档操作-批量删除

```java
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    //        批量删除数据
    BulkRequest bulkRequest = new BulkRequest();
 
    // 和批量添加一样的操作 只是IndexRequest换成了DeleteRequest而已
    bulkRequest.add(new DeleteRequest().index("user").id("1001"));
    bulkRequest.add(new DeleteRequest().index("user").id("1002"));
    bulkRequest.add(new DeleteRequest().index("user").id("1003"));
    bulkRequest.add(new DeleteRequest().index("user").id("1004"));


    BulkResponse responses = client.bulk(bulkRequest, RequestOptions.DEFAULT);

    System.out.println(responses.getTook());
    System.out.println(Arrays.toString(responses.getItems()));

    RestClientUtils.close();
}
```

### 高级查询-全量查询

这里先批量插入一些数据

```java
public class ESTest_Client {
    public static void main(String[] args) throws IOException {

        RestHighLevelClient client = RestClientUtils.getClient();

//        批量插入数据
        BulkRequest bulkRequest = new BulkRequest();
//        姓名、年龄、性别、地址
        ObjectMapper objectMapper = new ObjectMapper();
        String user1 = objectMapper.writeValueAsString(new User("张三", "男", 18, "北京"));
        String user2 = objectMapper.writeValueAsString(new User("李四", "男", 19, "上海"));
        String user3 = objectMapper.writeValueAsString(new User("王五", "男", 20, "广州"));
        String user4 = objectMapper.writeValueAsString(new User("赵六", "男", 21, "深圳"));
        String user5 = objectMapper.writeValueAsString(new User("钱七", "男", 22, "杭州"));
        String user6 = objectMapper.writeValueAsString(new User("孙八", "男", 23, "南京"));
        String user7 = objectMapper.writeValueAsString(new User("周九", "男", 24, "武汉"));
        String user8 = objectMapper.writeValueAsString(new User("吴十", "男", 25, "成都"));
        addPerson(bulkRequest, user1, user2, user3, user4,user5, user6, user7, user8);
        BulkResponse responses = client.bulk(bulkRequest, RequestOptions.DEFAULT);
        System.out.println(responses.getTook());
        System.out.println(Arrays.toString(responses.getItems()));

        RestClientUtils.close();
    }

    private static void addPerson(BulkRequest bulkRequest, String ...args) {
        for (String arg : args) {
            bulkRequest.add(new IndexRequest("user").source(arg, XContentType.JSON));
        }
    }
}
```

接着变写如下代码

```java {7}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");
    //        设置查询规则 这里是查询所有数据
    SearchSourceBuilder query = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());
    searchRequest.source(query);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    //       草 lombok里面有一个val 我才发现
    val hits = search.getHits();
    ObjectMapper mapper = new ObjectMapper();
    for (SearchHit hit : hits) {
        //            System.out.println(hit);
        //            转换成User对象
        System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));

    }

    RestClientUtils.close();
}
```

运行结果：

```md
User(name=张三, sex=男, age=18, city=北京)
User(name=李四, sex=男, age=19, city=上海)
User(name=王五, sex=男, age=20, city=广州)
User(name=赵六, sex=男, age=21, city=深圳)
User(name=钱七, sex=男, age=22, city=杭州)
User(name=孙八, sex=男, age=23, city=南京)
User(name=周九, sex=男, age=24, city=武汉)
User(name=吴十, sex=男, age=25, city=成都)
```

### 条件查询

这里有个坑，中文全称通过termQuery是查不到的。

因为默认字符串分词，找不到这个全称的索引。

得通过`matchQuery`来进行查询（）

下面是地址

```java {9}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");
    //        设置查询规则 
    SearchSourceBuilder query = new SearchSourceBuilder().query(
        QueryBuilders.termQuery("age",18)
    );
    searchRequest.source(query);
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    //        lombok里面有一个val
    val hits = search.getHits();
    ObjectMapper mapper = new ObjectMapper();
    for (SearchHit hit : hits) {
        //            System.out.println(hit);
        //            转换成User对象
        System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));

    }
```

结果：User(name=张三, sex=男, age=18, city=北京)

### 分页查询

注意是在query内添加

```java {11-12}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");
    //        设置查询规则
    SearchSourceBuilder query = new SearchSourceBuilder().query(
        QueryBuilders.matchAllQuery()
    );
    query.from(0);
    query.size(2);
    searchRequest.source(query);

    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    //        lombok里面有一个val
    val hits = search.getHits();
    ObjectMapper mapper = new ObjectMapper();
    for (SearchHit hit : hits) {
        //            System.out.println(hit);
        //            转换成User对象
        System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));

    }

    RestClientUtils.close();
}
```

结果：

```md
User(name=张三, sex=男, age=18, city=北京)
User(name=李四, sex=男, age=19, city=上海)
```

### 查询结果排序

依旧是在query对象中操作

```java {11}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");
    //        设置查询规则
    SearchSourceBuilder query = new SearchSourceBuilder().query(
        QueryBuilders.matchAllQuery()
    );
    query.sort("age", SortOrder.DESC);

    searchRequest.source(query);

    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    //        lombok里面有一个val
    val hits = search.getHits();
    ObjectMapper mapper = new ObjectMapper();
    for (SearchHit hit : hits) {
        //            System.out.println(hit);
        //            转换成User对象
        System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));

    }

    RestClientUtils.close();
}
```

结果

```md
User(name=吴十, sex=男, age=25, city=成都)
User(name=周九, sex=男, age=24, city=武汉)
User(name=孙八, sex=男, age=23, city=南京)
User(name=钱七, sex=男, age=22, city=杭州)
User(name=赵六, sex=男, age=21, city=深圳)
User(name=王五, sex=男, age=20, city=广州)
User(name=李四, sex=男, age=19, city=上海)
User(name=张三, sex=男, age=18, city=北京)
```

### 过滤字段

例如我们只想要姓名和年龄

如果说你只设置了excludes  ，includes为空数组或者null，则只会排除指定的字段

例如 name age sex 你设置排除sex 没有设置includes 则返回 name age

```java {11-14}
    public static void main(String[] args) throws IOException {

        RestHighLevelClient client = RestClientUtils.getClient();

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices("user");
//        设置查询规则
        SearchSourceBuilder query = new SearchSourceBuilder().query(
                QueryBuilders.matchAllQuery()
        );
        // include是包含的字段 另一个是排除的字段 一般来说只要设置一种就行 另一种填null
        String[] includes = {"name", "age"};
        String[] excludes = {};
        query.fetchSource(includes, excludes);

        searchRequest.source(query);

        SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
//        lombok里面有一个val
        val hits = search.getHits();
        ObjectMapper mapper = new ObjectMapper();
        for (SearchHit hit : hits) {
//            System.out.println(hit);
//            转换成User对象
            System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));

        }

        RestClientUtils.close();
    }
```

结果

```md
User(name=张三, sex=null, age=18, city=null)
User(name=李四, sex=null, age=19, city=null)
User(name=王五, sex=null, age=20, city=null)
User(name=赵六, sex=null, age=21, city=null)
User(name=钱七, sex=null, age=22, city=null)
User(name=孙八, sex=null, age=23, city=null)
User(name=周九, sex=null, age=24, city=null)
User(name=吴十, sex=null, age=25, city=null)
```

### 组合查询

```java {10-17}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");
    //        设置查询规则
    SearchSourceBuilder builder = new SearchSourceBuilder();

    BoolQueryBuilder query = QueryBuilders.boolQuery();
    //        must 必须满足指定条件 、 mustNot 必须不满足什么样的条件 should 可能满足什么样的条件
    query.must(QueryBuilders.matchQuery("sex", "男"));
    // 下面这里可以设置为matchPhraseQuery来进行全字段匹配
    query.must(QueryBuilders.matchQuery("city", "北京"));
    builder.query(query);

    searchRequest.source(builder);

    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    //        lombok里面有一个val
    val hits = search.getHits();
    ObjectMapper mapper = new ObjectMapper();
    for (SearchHit hit : hits) {
        //            System.out.println(hit);
        //            转换成User对象
        System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));

    }

    RestClientUtils.close();
}
```

结果：

```md
User(name=张三, sex=男, age=18, city=北京)
User(name=孙八, sex=男, age=23, city=南京)
```

你还可以 设置两个should 让某个值例如age的取值为两个值

例如

```java
query.must(QueryBuilders.should("age", 18));
query.must(QueryBuilders.should("age", 20));
```

这样年龄就得是18或者20

### 范围查询

```java {10,15}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");
    //        设置查询规则
    SearchSourceBuilder builder = new SearchSourceBuilder();

    RangeQueryBuilder query = QueryBuilders.rangeQuery("age");

    //        大于等于20  如果没有那个e则表示单纯的大于20 下面的同理
    query.gte(20);
    //        小于等于25
    query.lte(25);


    builder.query(query);

    searchRequest.source(builder);

    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    //        lombok里面有一个val
    val hits = search.getHits();
    ObjectMapper mapper = new ObjectMapper();
    for (SearchHit hit : hits) {
        //            System.out.println(hit);
        //            转换成User对象
        System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));

    }

    RestClientUtils.close();
}
```

结果：

```md
User(name=王五, sex=男, age=20, city=广州)
User(name=赵六, sex=男, age=21, city=深圳)
User(name=钱七, sex=男, age=22, city=杭州)
User(name=孙八, sex=男, age=23, city=南京)
User(name=周九, sex=男, age=24, city=武汉)
User(name=吴十, sex=男, age=25, city=成都)
```

### 模糊查询

```java {10}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");
    //        设置查询规则
    SearchSourceBuilder builder = new SearchSourceBuilder();

    FuzzyQueryBuilder query = QueryBuilders.fuzzyQuery("name", "王三").fuzziness(Fuzziness.ONE);


    builder.query(query);

    searchRequest.source(builder);

    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    //        lombok里面有一个val
    val hits = search.getHits();
    ObjectMapper mapper = new ObjectMapper();
    for (SearchHit hit : hits) {
        //            System.out.println(hit);
        //            转换成User对象
        System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));

    }

    RestClientUtils.close();
}
```

这里的`QueryBuilders.fuzzyQuery("name", "王三")`是模糊查询表达式

name=王三

然后后面`fuzziness(Fuzziness.ONE);`是允许不同的字数

例如 ONE 则表示和其中一个字不同的都会匹配

也就是说-----王，三，这两个只要匹配上一个就会查询出来

- 王五
- 张三
- 王三二

这些都能匹配上

这个例子中的代码 能匹配上之前存储的字段为

```md
User(name=张三, sex=男, age=18, city=北京)
User(name=王五, sex=男, age=20, city=广州)
```

还支持如下的常量

```java
public static final String X_FIELD_NAME = "fuzziness";
public static final Fuzziness ZERO = new Fuzziness(0);
public static final Fuzziness ONE = new Fuzziness(1);
public static final Fuzziness TWO = new Fuzziness(2);
public static final Fuzziness AUTO = new Fuzziness("AUTO");
public static final ParseField FIELD = new ParseField(X_FIELD_NAME);
```

### 高量查询

代码

```java {16-23,36-37}
public static void main(String[] args) throws IOException {

    RestHighLevelClient client = RestClientUtils.getClient();

    SearchRequest searchRequest = new SearchRequest();
    searchRequest.indices("user");
    //        设置查询规则
    SearchSourceBuilder builder = new SearchSourceBuilder();


    //        这里依旧用match查询
    MatchQueryBuilder query = QueryBuilders.matchQuery("name", "张三");
    // 绑定查询规则
    builder.query(query);

    HighlightBuilder highlightBuilder = new HighlightBuilder();
    //        这里是自定义高亮显示的样式
    highlightBuilder.preTags("<span style='color:red'>");
    highlightBuilder.postTags("</span>");
    //        对哪个查询结果需要进行高亮显示
    highlightBuilder.field("name");
    // 绑定高量规则
    builder.highlighter(highlightBuilder);

    searchRequest.source(builder);

    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
    //        lombok里面有一个val
    val hits = search.getHits();
    ObjectMapper mapper = new ObjectMapper();
    for (SearchHit hit : hits) {
        //            System.out.println(hit);
        //            转换成User对象
        //            System.out.println(mapper.readValue(hit.getSourceAsString(), User.class));
        System.out.println(hit.getSourceAsString());
        //            获取高亮显示的字段
        System.out.println(hit.getHighlightFields());
    }

    RestClientUtils.close();
}
```

结果

```md
{name=[name], fragments[[<span style='color:red'>张</span><span style='color:red'>三</span>]]}
```

### 最大值查询

最小值之类的同理

```java
public static void main(String[] args) throws IOException {
    ObjectMapper mapper = new ObjectMapper();

    //        获取连接
    RestHighLevelClient client = RestClientUtils.getClient();
    //        创建查询请求体
    SearchRequest searchRequest = new SearchRequest();
    //        设置查询的索引
    searchRequest.indices("user");
    //        创建查询规则
    SearchSourceBuilder builder = new SearchSourceBuilder();

    //       设置聚合查询条件-最大值查询个 第一个参数 组名 第二个参数 字段名
    MaxAggregationBuilder age = AggregationBuilders.max("maxAge").field("age");

    //        将最大值查询条件添加到查询规则中
    builder.aggregation(age);
    //        将查询规则设置到查询请求体中
    searchRequest.source(builder);
    //        开始查询
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);

    for (Map.Entry<String, Aggregation> entry : search.getAggregations().asMap().entrySet()) {
        //            获取聚合结果 转换成json 并打印
        System.out.println(mapper.writeValueAsString(entry.getValue()));
    }
    RestClientUtils.close();
}
```

结果

```json
{"name":"maxAge","metadata":null,"value":25.0,"valueAsString":"25.0","type":"max","fragment":true}
```

### 分组查询

```java
public static void main(String[] args) throws IOException {
    ObjectMapper mapper = new ObjectMapper();

    //        获取连接
    RestHighLevelClient client = RestClientUtils.getClient();
    //        创建查询请求体
    SearchRequest searchRequest = new SearchRequest();
    //        设置查询的索引
    searchRequest.indices("user");
    //        创建查询规则
    SearchSourceBuilder builder = new SearchSourceBuilder();
 
    // 设置分组查询 第一个参数 组名 第二个参数 字段名
    TermsAggregationBuilder field = AggregationBuilders.terms("ageGroup").field("age");

    //        将分组查询条件添加到查询规则中
    builder.aggregation(field);
    //        将查询规则设置到查询请求体中
    searchRequest.source(builder);
    //        开始查询
    SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);

    //        获取分组结果
    Aggregation ageGroup = search.getAggregations().get("ageGroup");
    //        获取分组结果集
    System.out.println(mapper.writeValueAsString(ageGroup));

    RestClientUtils.close();
}
```

结果： 每个的数量都是1

```json
{
    "name": "ageGroup",
    "metadata": null,
    "buckets": [
        {
            "aggregations": {
                "asMap": {},
                "fragment": true
            },
            "keyAsString": "18",
            "docCount": 1,
            "docCountError": 0,
            "key": 18,
            "keyAsNumber": 18,
            "fragment": true
        },
        {
            "aggregations": {
                "asMap": {},
                "fragment": true
            },
            "keyAsString": "19",
            "docCount": 1,
            "docCountError": 0,
            "key": 19,
            "keyAsNumber": 19,
            "fragment": true
        },
        {
            "aggregations": {
                "asMap": {},
                "fragment": true
            },
            "keyAsString": "20",
            "docCount": 1,
            "docCountError": 0,
            "key": 20,
            "keyAsNumber": 20,
            "fragment": true
        },
        {
            "aggregations": {
                "asMap": {},
                "fragment": true
            },
            "keyAsString": "21",
            "docCount": 1,
            "docCountError": 0,
            "key": 21,
            "keyAsNumber": 21,
            "fragment": true
        },
        {
            "aggregations": {
                "asMap": {},
                "fragment": true
            },
            "keyAsString": "22",
            "docCount": 1,
            "docCountError": 0,
            "key": 22,
            "keyAsNumber": 22,
            "fragment": true
        },
        {
            "aggregations": {
                "asMap": {},
                "fragment": true
            },
            "keyAsString": "23",
            "docCount": 1,
            "docCountError": 0,
            "key": 23,
            "keyAsNumber": 23,
            "fragment": true
        },
        {
            "aggregations": {
                "asMap": {},
                "fragment": true
            },
            "keyAsString": "24",
            "docCount": 1,
            "docCountError": 0,
            "key": 24,
            "keyAsNumber": 24,
            "fragment": true
        },
        {
            "aggregations": {
                "asMap": {},
                "fragment": true
            },
            "keyAsString": "25",
            "docCount": 1,
            "docCountError": 0,
            "key": 25,
            "keyAsNumber": 25,
            "fragment": true
        }
    ],
    "type": "lterms",
    "docCountError": 0,
    "sumOfOtherDocCounts": 0,
    "fragment": true
}

```

# ElasticSearch环境

## 单机和集群

单台ElasticSearch服务器提供服务，往往都有最大的负载能力，超过这个阀值，服务器性能就会大大降低甚至不可用，所以在生产环境中，这玩意一般都是部署在集群内

除了负载能力，单点服务器也存在其他问题

- 单台机器容量存储有限
- 单台服务器容易出现单点故障， 无法实现高可用
- 单服务器的并发处理能力有限

配置服务器集群时，集群中的节点数量没有限制，大于等于两个节点就可以看做是集群了，一般情况下都是两个以上

## 集群Cluster

一个集群就是由一个或者多个服务器节点组织在一起，共同持有整个的数据，并一起提供索引和搜索功能，一个ElasticSearch集群有一个唯一的名字标识，这个名字默认就是`elasticsearch`，因为一个节点只能通过指定某个集群的名字，来加入这个集群

## 节点Node

集群中包含很多服务器，一个节点就是其中一台服务器，作为集群的一部分，它存储数据，参与集群的索引和搜索功能

一个节也是由名字来标识的，默认情况下，这个名字是一个随机的**漫威漫画角色名**，这个名字会在启动的过程中赋予节点

例如：钢铁侠、绿巨人….

这个名字挺重要的，因为在这个管理过程中，你会去指定网络中的哪些服务器对应ElasticSearch集群中的哪些节点

一个节点可以通过配置集群名字的方式来加入一个指定的集群，默认情况下，每个节点都会被安排到一个叫做`elasticsearch`的集群中，这意味着----如果我们在网络中启动了若干个节点，并假定他们能够互相发现彼此，他们会自动的加入到一个叫做`elasticsearch`的集群内

## Windows下部署集群

如果你之前启动过ES 那先把这两个文件夹内的所有内容都删除（这两个文件夹要留着）

![image-20220101144013286](/images/SpringBoot/08-Elasticsearch/image-20220101144013286.png)

紧接着 你打开config目录下的elasticsearch.yml 会发现全都是注释 把他们全部删除掉 填入如下内容

PS 可以不用这样 写 可以像正常的写application配置那样分层的写 这里写只是为了直观看到这些内容

```yaml
# 集群的名字 每个节点之间这个字段要保持一致
cluster.name: my-application

# 节点名称 在集群内是唯一的
node.name: node-1001
# 这个节点是否是master节点
node.master: true
node.data: true



# IP地址
network.host: localhost
# HTTP 监听端口
http.port: 7001
# TCP监听端口
transport.tcp.port: 9301

# 跨域配置
# 是否允许跨域
http.cors.enabled: true
# 允许跨域的地址
http.cors.allow-origin: "*"


```

接着我们正产启动 然后丢一边

再打开postman，发送get请求

<http://localhost:7001/_cluster/health>

这个命令是查询集群的健康状态

```json
{
    "cluster_name": "my-application",
    // 当前节点的健康状态 green表示正常
    "status": "green",
    "timed_out": false,
    // 当前的节点数量
    "number_of_nodes": 1,
    // 当前的数据节点数量
    "number_of_data_nodes": 1,
    "active_primary_shards": 3,
    "active_shards": 3,
    "relocating_shards": 0,
    "initializing_shards": 0,
    "unassigned_shards": 0,
    "delayed_unassigned_shards": 0,
    "number_of_pending_tasks": 0,
    "number_of_in_flight_fetch": 0,
    "task_max_waiting_in_queue_millis": 0,
    "active_shards_percent_as_number": 100.0
}
```

紧接着我们将ES 的文件夹（整个）复制一份，然后将data和logs删除。并修改yaml

```yaml {5,14-17,25-31}
# 集群的名字 每个节点之间这个字段要保持一致
cluster.name: my-application

# 节点名称 在集群内是唯一的
node.name: node-1002
# 这个节点是否是master节点
node.master: true
node.data: true



# IP地址
network.host: localhost
# HTTP 监听端口
http.port: 7002
# TCP监听端口
transport.tcp.port: 9302

# 跨域配置
# 是否允许跨域
http.cors.enabled: true
# 允许跨域的地址
http.cors.allow-origin: "*"

# 集群额外配置
# 查找节点 这里填写第一个节点的tcp.port
discovery.seed_hosts: ["localhost:9301"]
# 超时时间1分钟
discovery.zen.fd.ping_timeout: 1m
# 重新连接次数
discovery.zen.fd.ping_retries: 5

```

配置完毕后启动

然后你就能get之前第一个节点的地址 获取现在的节点数量

```json
{
    "cluster_name": "my-application",
    "status": "green",
    "timed_out": false,
    // 节点数量-2
    "number_of_nodes": 2,
    "number_of_data_nodes": 2,
    "active_primary_shards": 3,
    "active_shards": 6,
    "relocating_shards": 0,
    "initializing_shards": 0,
    "unassigned_shards": 0,
    "delayed_unassigned_shards": 0,
    "number_of_pending_tasks": 0,
    "number_of_in_flight_fetch": 0,
    "task_max_waiting_in_queue_millis": 0,
    "active_shards_percent_as_number": 100.0
}
```

如果说还要继续添加新的节点的话

```yaml {5,12-17,27}
# 集群的名字 每个节点之间这个字段要保持一致
cluster.name: my-application

# 节点名称 在集群内是唯一的
node.name: node-1003
# 这个节点是否是master节点
node.master: true
node.data: true



# IP地址
network.host: localhost
# HTTP 监听端口
http.port: 7003
# TCP监听端口
transport.tcp.port: 9303

# 跨域配置
# 是否允许跨域
http.cors.enabled: true
# 允许跨域的地址
http.cors.allow-origin: "*"

# 集群额外配置
# 查找节点 这里填写之前节点的tcp端口
discovery.seed_hosts: ["localhost:9301","localhost:9302"]
# 超时时间1分钟
discovery.zen.fd.ping_timeout: 1m
# 重新连接次数
discovery.zen.fd.ping_retries: 5

```

## Linux下的ES的安装

<https://www.elastic.co/cn/downloads/elasticsearch>

下载linux x86-64的即可

可以选择下载好了后发过去

这玩意是不允许在root用户下使用的，所以要自行先创建一个子用户

如果对自己的服务器速率比较自信的 可以直接在linux下载

```shell
mkdir elasticsearch && cd ./elasticsearch
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.16.2-linux-x86_64.tar.gz -O "elasticsearch.tar.gz"
```

然后解压缩到当前目录下

```shell
tar -zxvf elasticsearch.tar.gz
# 然后用mv改个名 例如改成es
```

然后你就能看到 和windows一样的文件

![image-20220101155626598](/images/SpringBoot/08-Elasticsearch/image-20220101155626598.png)

你在这一部可以先按照之前为windows的方式改动配置

改动yaml完毕之后  还需要额外增加个配置

用有权限的用户：

```shell
sudo vim /etc/security/limits.conf
```

在末尾添加如下内容 这一步是增加这个用户的最大打开文件数量

```ini
# 第一个是用户名 第四个是数量 这个数量按照自己的心情写即可
es soft nofile 65536
es hard nofile 65536
```

接着 还要修改下另外一个玩意

```bash
 sudo vi /etc/sysctl.conf
```

增加一个话

```ini
# 一个进程可以拥有的vam虚拟机内存区域的数量 默认是65536
vm.max_map_count=655350
```

以上修改完毕后重载即可

```bash
sysctl -p
```

接着 cd到es文件夹 `./bin/elasticsearch`即可启动

也可以加参数 `elasticsearch -d` 后台启动

反正启动的时候没有报错就是大成功

我这里并没有修改yaml

所以是9300端口访问

这里你如果是多机运行的话 可以先去了解下hadoop  里面有个xsync可以方便的传输文件（以后也得学）

接着 我们的配置文件需要变动一下

如果是多个主机 ，唯一需要变动的只有node.name和discovery.seed_hosts的地址

```yaml
# 集群的名字 每个节点之间这个字段要保持一致
cluster.name: my-application

# 节点名称 在集群内是唯一的
node.name: node-1001
# 是不是有资格主节点
node.master: true
node.data: true


# IP地址
network.host: localhost
# HTTP 监听端口
http.port: 7003
# TCP监听端口
transport.tcp.port: 9303

# 跨域配置
# 是否允许跨域
http.cors.enabled: true
# 允许跨域的地址
http.cors.allow-origin: "*"


##### 节点的配置

# 集群额外配置
# 初始化一个新的集群时，通过下面这一个配置来选举master节点
cluster.initial_master_nodes: ["node1"]

# 节点发现 
discovery.seed_hosts: ["localhost:9301","localhost:9302","localhost:9303"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true

# 集群内同时启动的数据任务个数 默认是2个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
# 添加或删除节点及负载均衡时并发恢复的线程个数 默认是4个
cluster.routing.allocation.node_concurrent_recoveries: 16
# 初始化数据恢复时，并发恢复的线程个数，默认是4个
cluster.routing.allocation.node_initial_primaries_recoveries: 16


# 超时时间1分钟
discovery.zen.fd.ping_timeout: 1m
# 重新连接次数
discovery.zen.fd.ping_retries: 5
```

之后访问任意一个节点

例如：`localhost:9200/_cat/nodes`即可看到所有节点的信息

Docker更简单些 只需要制定配置文件就行了，这里就不做演示

PS：这玩意的内存开销比较大  不建议在一台服务器上跑多个…

## 原理分析

### 单节点集群和故障转移

我们先启动windows上的es，启动两个

node-1和node-2

端口分别为7001和7002

接下来再7001中put创建一个user <http://localhost:7001/user/>

请求体内容如下

```json
{
    "settings":{
        "number_of_shards":3,
        "number_of_replicas":1
    }
}
```

这里是设置分片数量，就类似于数据库的中的表一样，shards设置总数量，replicas设置每个分片的备份数量

接下来 get

<http://localhost:7001/user>

```json
{
    "user": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "routing": {
                    "allocation": {
                        "include": {
                            "_tier_preference": "data_content"
                        }
                    }
                },
                //分片数量
                "number_of_shards": "3",
                "provided_name": "user",
                "creation_date": "1641029070478",
                // 每个分片的备份数量
                "number_of_replicas": "1",
                "uuid": "PLcCWftvTFKHYHieXF65vg",
                "version": {
                    "created": "7160299"
                }
            }
        }
    }
}
```

现在我们的集群时一个拥有索引的单节点集群，所有的三个主分片都被分配在node-1

![image-20220101172832461](/images/SpringBoot/08-Elasticsearch/image-20220101172832461.png)

PS: chrome可以通过安装浏览器插件-`elasticsearch-head`查看当前的集群情况

安装完毕后打开扩展页面输入地址即可访问

![image-20220101173306779](/images/SpringBoot/08-Elasticsearch/image-20220101173306779.png)

![image-20220101173401682](/images/SpringBoot/08-Elasticsearch/image-20220101173401682.png)

如果说遇到这个黄色的健康值，其实就是在告诉你 你没有留有兜底操作

也就是说你的主节点数据没有共享到其他的从节点上，所以我们只需要启动好从节点就不会遇到这样的问题了

从节点启后后，只要他和主节点有同样的cluster.name，他就会自动加入到这个集群中，然后会自动将我们的索引备份复制到自己这

![image-20220101173930464](/images/SpringBoot/08-Elasticsearch/image-20220101173930464.png)

### 水平扩容

人话来说就是 如果说我们启动了三个节点的集群，那么副本和朱分片将会均匀的分配到这三个节点上

例如 现在我们的user 三个分片 每个分片有一个副本 总计六个副本

- 只有一个节点的情况
  - 三主三副都在同一个节点上
- 有两个节点
  - 三个主在1，三个副在2
- 有三个节点
  - 均匀分配到三个节点上，将会这样：

![image-20220101174438104](/images/SpringBoot/08-Elasticsearch/image-20220101174438104.png)

![image-20220101174510432](/images/SpringBoot/08-Elasticsearch/image-20220101174510432.png)

这样看来 我们理论可以扩容到六个，让所有分片均匀分配在每一个节点上

但是，如果我们想要扩容超过六个节点该怎么办呢？

**主分片的数目在索引创建的时候就已经确定下来了，是不可以更改的**，实际上，这个数目定义了这个索引能够存储的最大数量

（实际取决于数据、硬件和使用场景）

但是，读操作---搜索和返回数据都可以同时被主分片或附分片或副本分片处理，所以当我们拥有越多的副本分片时，也将拥有更高的吞吐量

在运行中的集群上是可以动态调整副本分片的数量的，我们可以按需伸缩集群，让我们把默认的副本数从1增加到2

我们PUT <http://localhost:7001/user/_settings>

请求体内容

```json
{
    "number_of_replicas": 2
}
```

这样就可以修改副本分片的数量

接下来我们如果值开两个node访问 就会发现

![image-20220101175259556](/images/SpringBoot/08-Elasticsearch/image-20220101175259556.png)

标黄了，说明总共要有九个分片，也就是三个节点才可以完成这个操作

我们的User索引现在拥有9个分片---三个主分片和6个附分片，这意味着我们可以将集群扩容到九个节点，每个节点上一个分片，相比较于原来的三个分片，集群搜索性能可以提升三倍..

### 应对故障

我们的节点随时都有概率挂掉

我们现在启动三个节点 并且创建一个主3 附2*3的索引

注意 这里使用的配置文件yaml是之前在linux系统安装中写的那一套

![image-20220101182737565](/images/SpringBoot/08-Elasticsearch/image-20220101182737565.png)

但如果此时我们将node-1关了 或者说它宕机了

![image-20220101183040589](/images/SpringBoot/08-Elasticsearch/image-20220101183040589.png)

连接他是没有任何东西产生

接下来连接node2看看是什么情况

可以发现两件事情

![image-20220101183155747](/images/SpringBoot/08-Elasticsearch/image-20220101183155747.png)

node-2变成了主节点，并且依旧存在副本

这有点像是redis的哨兵…自动易主 我曹高端

接下来重启node-1

可以发现他边成了从节点

![image-20220101183350793](/images/SpringBoot/08-Elasticsearch/image-20220101183350793.png)

### 路由计算和分片控制

插入是这种方式插入的 这也叫做路由计算

![image-20220101201724622](/images/SpringBoot/08-Elasticsearch/image-20220101201724622.png)

然后因为附分片均匀的分配在这些node上，并且主分片会自动复制内容到负分片 所以无论访问哪个都能查询得到数据

这就是分片控制：用户可以访问任意一个节点获取数据，这个节点称之为协调节点

![image-20220101202100665](/images/SpringBoot/08-Elasticsearch/image-20220101202100665.png)

然后 这之中 是通过轮循操作来进行负载均衡（例如node-1此时超多用户访问 你再去查询 它将会将你这个请求转发到node-2，让node-2来处理你的请求，这些都是封装好了的）

### 数据写流程

![image-20220101202645937](/images/SpringBoot/08-Elasticsearch/image-20220101202645937.png)

客户端收到响应的时候，文档变更已经在主分片和所有副本分片执行完成，变更是安全的

**有一些可选的请求参数会影响这个过程**，这些请求参数可能是以数据安全为代价提升性能（例如让主分片存储完成就发送反馈，存储到副本分片的事情之后慢慢处理）

这些选项很少使用，因为ElasticSearch已经很快了，但是为了完整起见，可以参考下方表格

| 参数        | 含义                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| consistency | 和名字一样，一致性的意思，即使是在试图执行一个写操作之前<br />主分片都会要求，必须有规定数量（也就是大多数）的分片副本处于活跃可用状态<br />才会去执行写操作（其中分片副本可以是主分片或者副本分片）<br />这是为了避免在发生网络故障的时候进行写操作，进而导致数据不一致<br />规定数量：`int (pirmary+number_of_repilcas)/2+1`<br />consistency的参数可以设置为<br />`ONE`（主要主分片状态OK就允许执行写操作）<br />`ALL`（必须要主分片和所有副本分片的状态没问题才允许执行写操作）<br />或者<br />`quorum`---默认值--大多数的分片副本没问题的情况下就允许执行写操作(50%+)<br />注意 number_of_repilcas指的是在索引设置中设定的副本分片数<br />而不是指当前处理活动状态的分片数<br />如果在索引中指定了当前索引拥有三个副本分片，那规定数量的计算结果即：<br />`int (primary+3)/2+1=3`<br />如果这个时候我们只有两个节点，那么处于活跃部分的分片数量就达不到规定数量<br />因此将无法索引和删除任何文档 |
| timeout     | 如果没有足够的副本分片时，ElasticSearch将会等待，希望更多分片出现<br />在默认情况下，它最多等待一分钟<br />如果需要，可以使用timeout参数让它更早的终止<br />例如： 10000=10000毫秒 30s= 30秒                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

### 数据读流程

![image-20220101204729315](/images/SpringBoot/08-Elasticsearch/image-20220101204729315.png)

### 更新流程和批量处理流程

![image-20220101204831947](/images/SpringBoot/08-Elasticsearch/image-20220101204831947.png)

更新一个文档的步骤如下：

1. 客户端向Node1发送请求

2. 它将请求转发到主分片所在的Node3

3. Node3 此时可能还有别的线程正在写（内部通过锁来控制，需要抢占锁）

   1. 如果没有抢到，则继续抢，直到抢到了为止

4. 如果Node3成功更新文档，它将新版本的文档并行转发到Node1和Node2上的副本分片，重新建立索引，一旦部分分片都返回成功，Node3向协调节点也返回成功，协调节点向客户端返回成功

   - 当主分片把更该转发到副本时，他不会转发更新请求
   - 相反，他转发完整的更新文档
   - 这些更改将会异步转发的附分片，并且不能保证他们相同的顺序到达
   - 如果ES仅仅转发更该请求，则可能以错误的顺序更该，从而得到损坏的文档
     - 如果说是转发-则副本分片又会转发到主分片上--无线套娃，栈溢出警告

   >  多文档处理流程的话和单文档差不多，区别在于协调节点知道每个文档存在于哪个分片中

   它将整个多文档请求分解成 每个分片 的多文档请求，并且将这些数据并行转发到每个参与节点

   协调节点一旦收到来自每个节点的应答，就会将每个节点的响应数据整理成单个响应，返回给客户端

   ![image-20220101205733691](/images/SpringBoot/08-Elasticsearch/image-20220101205733691.png)

   核心流程和单文档修改是完全一致的

### 分片原理和倒排索引

> 分片是ES最小工作单元
>
> 传统的数据库对每个字段存储单个值，但这对全文检索并不够，文本字段中的每个单词需要被搜索，对数据库意味着需要对单个字段有索引多值的能力
>
> 最好的支持是一个字段多个值，需求的数据结构是**倒排结构**

ES使用的一种称为**倒排索引**的结构，它适用于快速的全文搜索

如其名，有倒排索引，必然有正向索引

正向索引(Forward index)，反向索引（Inverted index）更熟悉的名字是倒排索引

倒排索引有三个核心概念

- 词条：索引中最小存储和查询的单元
  - 在英文环境中，一般是一个单词 在中文环境中一般是一个词组
- 词典：字典，词条的集合，会有两种结构来进行结合
  - B+数
  - HashMap
- 倒排表：记录了出现过的某个单词的所有文档列表及单词在该文档中出现的位置信息
  - 每条记录称之为一个倒排项
  - 根据倒排列表，可以获知哪些文档包含哪个单词
  - 这玩意并不算存放了一个文档ID这么简单，还有一些其他信息
    - 词频（词条出现的次数）
    - 偏移量（Offset）
    - 可以理解成是一个Java中实体对象，，，不对 貌似ES就是Java写的 本身存储的就是Java实体对象

例如我们存放一个用户数据

![img](/images/SpringBoot/08-Elasticsearch/874963-20190127173241683-1331385372.png)

则ES将会帮我们存储为：

- Name字段
  ![img](/images/SpringBoot/08-Elasticsearch/874963-20190127175423615-230290274.png)
- Age字段
  ![img](/images/SpringBoot/08-Elasticsearch/874963-20190127175627644-1013476663.png)
- gender字段
  ![img](/images/SpringBoot/08-Elasticsearch/874963-20190127175809626-1224287371.png)
- address字段
  ![img](/images/SpringBoot/08-Elasticsearch/874963-20190127180053644-1305820142.png)

> Es分别为每个字段都建立了一个倒排索引
>
> 比如：在上面，张三、北京、22这些都是词条，而[1，3]是倒排列表
>
> 倒排列表是一个组数，存储了符合某个Term的文档ID
>
> 只要知道文档ID，就能快速找到文档

可是，该怎么样通过我们给定的关键词快速的找到这个词条呢？

当然是建立索引了，为Terms建立索引

最好的就是B—Tree，B树

这玩意大概是这样的

![img](/images/SpringBoot/08-Elasticsearch/874963-20190127183530633-1940483075.png)

在倒排索引中，通过Term索引可以找到Term在Term Dictionary中的位置，进而找到Posting List，有了倒排列表就可以根据ID找到文档了

emm大概流程应该是这样

![img](/images/SpringBoot/08-Elasticsearch/874963-20190127184959667-1135956344.png)

![img](/images/SpringBoot/08-Elasticsearch/874963-20190127185725607-2022920549.png)

就是分两个地方存储数据，查询的时候两个地方都查，查询结果是两个查询的并集，相当于mysql中的union all

### 文档搜索-索引更新规则

早期的全文检索会为整个文档集合建立一个很大的倒排索引并将其写入到磁盘。 一旦新的索引就绪，旧的就会被其替换，这样最近的变化便可以被检索到。

倒排索引被写入磁盘后是不可改变的：**它永远不会修改**。

- 不需要锁。如果你从来不更新索引，你就不需要担心多进程同时修改数据的问题。
- 一旦索引被读入内核的文件系统缓存，便会留在哪里，由于其不变性。只要文件系统缓存中还有足够的空间，那么大部分读请求会直接请求内存，而不会命中磁盘。这提供了很大的性能提升。
- 其它缓存(像filter缓存)，在索引的生命周期内始终有效。它们不需要在每次数据改变时被重建，因为数据不会变化。
- 写入单个大的倒排索引允许数据被压缩，减少磁盘IO和需要被缓存到内存的索引的使用量。

当然，一个不变的索引也有不好的地方。主要事实是它是不可变的! 你不能修改它。如果你需要让一个新的文档可被搜索，你需要重建整个索引。这要么对一个索引所能包含的数据量造成了很大的限制，要么对索引可被更新的频率造成了很大的限制。

> 如何在保留不变性的前提下实现倒排索引的更新？

答案是：用更多的索引。**通过增加新的补充索引来反映新近的修改，而不是直接重写整个倒排索引**。每一个倒排索引都会被轮流查询到,从最早的开始查询完后再对结果进行合并。

Elasticsearch基于Lucene，这个java库引入了按段搜索的概念。

每一段本身都是一个倒排索引，但索引在 Lucene 中除表示所有段的集合外，还增加了提交点的概念—一个**列出了所有已知段的文件**。

![img](/images/SpringBoot/08-Elasticsearch/9ee1adbb2d55e710257e01b812a6d8cf.png)

按段搜索会以如下流程执行：

1. 新文档被收集到内存索引缓存
   ![img](/images/SpringBoot/08-Elasticsearch/9d499fde966ee9825fa5a424d8357489.png)
2. 不时地, 缓存被提交
   - 一个新的段，一个追加的倒排索引，被写入磁盘。
   - 一个新的包含新段名字的提交点被写入磁盘。
   - 磁盘进行同步，所有在文件系统缓存中等待的写入都刷新到磁盘，以确保它们被写入物理文件
3. 新的段被开启，让它包含的文档可见以被搜索。
4. 内存缓存被清空，等待接收新的文档。
   ![img](/images/SpringBoot/08-Elasticsearch/f74828ff58cc4635a97e88706a221e50.png)

> 当一个查询被触发，所有已知的段按顺序被查询。词项统计会对所有段的结果进行聚合，以保证每个词和每个文档的关联都被准确计算。这种方式可以用相对较低的成本将新文档添加到索引。

段是不可改变的，所以既不能从把文档从旧的段中移除，也不能修改旧的段来进行反映文档的更新。取而代之的是，每个提交点会包含一个.del 文件，文件中会列出这些被删除文档的段信息。

当一个文档被`删除`时

- 它实际上只是在 .del 文件中被标记删除
- 一个被标记删除的文档仍然可以被查询匹配到，但它会在最终结果被返回前从结果集中移除（ES会自动过滤掉）。

文档更新也是类似的操作方式:

- 当一个文档被`更新`时，旧版本文档被标记删除，文档的新版本被索引到一个新的段中
- 可能两个版本的文档都会被一个查询匹配到，但被删除的那个旧版本文档在结果集返回前就已经被移除。

### 文档分析

包含下面的流程

- 将一块文本分成合适的用于倒排索引的独立的词条
- 将这些词条统一话为标准格式以提高他们的可搜索性，或者reacall分析器执行上面的操作，分析器实际上是将三个功能分装到了一个包内
  - 字符过滤器
    - 首先，字符按顺序通过每个字符过滤器，他们的任务是在分词前整理字符串，一个字符过滤器可以用来去掉HTML，或者将&转换为and
  - 分词器
    - 其次，字符串被分词器分为单个的词条，一个简单的分词器遇到空格和标点的时候，可能会将文本拆分成词条
  - Token过滤器
    - 最后，此条按照顺序通过每个Token过滤器，这个过程可能会改变词条（例如：小写化Quick）、删除词条（例如，像，and，the等无用词）或者增加词条（例如：jump和leap这种同义词）

### 内置分析器

ES还附带了可以直接使用的预包装分析器

> 我们准备一段话 `Set the shape to semi-transparent by calling set_trans(5)`

- 标准分析器
  - ES默认使用的分析器，它是分析各种语言文本最常用的选择，它根据Unicode联盟定义的单词边界来划分文本，删除绝大部分标点，最后，将词条小写
  - 上面 那段话通过它解析后：
    - `[set,the,shape,to,semi,transparent,by,calling,set,trans,5]`
- 简单分析器
  - 这玩意在任何不是字母的地方分割文本，将词条小写，他会产生：
    - `[set,the,shape,to,semi,transparent,by,calling,set,trans,5]`
- 空格分析器
  - 将空格在的地方划分文本，它会产生
    - `[Set,the,shape,to,semi-transparent,by,calling,set_trans(5)]`
- 语言分析器
  - 特定语言分析器可用于很多语言
  - 他们可以考虑指定语言的特点
    - 例如英语分析器附带了一组英语无用词：像and或者the，他们对关键性没有多少印象
    - 这些玩一会被删除，由于理解英语语法的规则，这个分词器可以提取英语单词的词干
  - 使用它会产生如下词条
    - `[set,shape,semi,transpar,call,set_tran,5]`

### 分析器的使用场景

> 当我们索引一个文档，它的全文域将被分析器词条以用来创建倒排索引
>
> 但是，当我们在全文搜索域搜索的时候，我们需要将查询字符串通过相同的分析过程，以保证我们搜索的词条格式与索引中的词条格式一致

全文查询，理解每个域是如何定义的，因此他们可以做正确的事：

- 当查询一个**全文**域时，会对查询字符串应用相同的分析器，以产生正确的搜索词条列表
- 当查询一个 **精确值** 域时，不会分析查询字符串，而是搜索你指定的精确值。

#### 测试分析器

有些时候很难理解分词的过程和实际被存储到索引中的词条，特别是你刚接触 Elasticsearch。为了理解发生了什么，你可以使用 analyze API 来看文本是如何被分析的。 在消息体里，指定分析器和要分析的文本

```http
GET http://localhost:9200/_analyze
{
 "analyzer": "standard",
 "text": "Text to analyze"
}
```

结果中的每个元素代表一个单独的词条

position指明该词条在原始文本中出现的位置

start_offset和end_offset指明字符在原始字符串中的位置

```json
{
    "tokens": [
        {
            "token": "text",
            "start_offset": 0,
            "end_offset": 4,
            "type": "<ALPHANUM>",
            "position": 0
        },
        {
            "token": "to",
            "start_offset": 5,
            "end_offset": 7,
            "type": "<ALPHANUM>",
            "position": 1
        },
        {
            "token": "analyze",
            "start_offset": 8,
            "end_offset": 15,
            "type": "<ALPHANUM>",
            "position": 2
        }
    ]
}
```

### 指定分词器

当ES在我们的文档中检测到一个新的字符串域，它会自动设置为一个全文字符串域，使用标准的分析器对他进行分析

我们不希望总是这样，可能我们想使用一个不同的分析器，适用于我们的数据的语言

有时我们希望一个字符串就是一个字符串域，不适用分析器，直接索引传入的精确的值，例如用户ID或者一个内部的状态域标签，要做到这一点，我们必须手动指定这些域的映射

### IK分词器

首先我们通过POSTMan发送Get请求查询分词效果

```http
GET http://localhost:9200/_analyze
{
 "analyzer": "standard",
 "text": "测试单词"
}
```

可以发现使用默认的分词器（那个analyzer可以省略掉 效果一样的）

获取的值 是这样的 四个字都被拆分了，但实际上我们希望的是 测试是一个词，单词是一个词

```json
{
    "tokens": [
        {
            "token": "测",
            "start_offset": 0,
            "end_offset": 1,
            "type": "<IDEOGRAPHIC>",
            "position": 0
        },
        {
            "token": "试",
            "start_offset": 1,
            "end_offset": 2,
            "type": "<IDEOGRAPHIC>",
            "position": 1
        },
        {
            "token": "单",
            "start_offset": 2,
            "end_offset": 3,
            "type": "<IDEOGRAPHIC>",
            "position": 2
        },
        {
            "token": "词",
            "start_offset": 3,
            "end_offset": 4,
            "type": "<IDEOGRAPHIC>",
            "position": 3
        }
    ]
}
```

这个时候我们就可以用到IK分词器了

仓库地址

<https://github.com/medcl/elasticsearch-analysis-ik/tree/master>

进入releases页面下载最新的即可

下载后解压到ES的plugins文件夹内 重启ES即可使用

![image-20220101222326958](/images/SpringBoot/08-Elasticsearch/image-20220101222326958.png)

接下里我们的分词器将会多两个选项

- `ik_max_word`:会将文本做最细粒度的拆分
- `ik_smart`:会将文本做最粗粒度的拆分

效果 这两个都差不多 具体可以自己测试

![image-20220101222642674](/images/SpringBoot/08-Elasticsearch/image-20220101222642674.png)

#### 自己扩展词汇

例如

```http
GET http://localhost:9200/_analyze
{
 "analyzer": "ik_max_word",
 "text": "我是神里绫华的狗"
}
```

我希望神里绫华是一个词..但是实际上她被拆分成了四个词

所以我们需要自己来扩展词汇

我们先进入到plugins下的ik文件夹，进入其config目录

创建`custom.dic`文件，写入神里绫华

同时打开`IKAnalyzer.cfg.xml`文件，将custom.dic配置在其中，然后重启ES服务器

![image-20220101223433557](/images/SpringBoot/08-Elasticsearch/image-20220101223433557.png)

![image-20220101223558096](/images/SpringBoot/08-Elasticsearch/image-20220101223558096.png)

接着重启后，我们就可以成为神里绫华的狗了

```http
GET http://localhost:9200/_analyze
{
 "analyzer": "ik_max_word",
 "text": "我是神里绫华的狗"
}
```

![image-20220101223843621](/images/SpringBoot/08-Elasticsearch/image-20220101223843621.png)

### 自定义分析器

虽然 Elasticsearch 带有一些现成的分析器，然而在分析器上 Elasticsearch 真正的强大之 处在于，你可以通过在一个适合你的特定数据的设置之中组合字符过滤器、分词器、词汇单 元过滤器来创建自定义的分析器。在 分析与分析器 我们说过，一个 分析器 就是在一个包 里面组合了三种函数的一个包装器， 三种函数按照顺序被执行

> 字符过滤器

 字符过滤器 用来 整理 一个尚未被分词的字符串。

- 例如，如果我们的文本是 HTML 格式的，它会包含像`<p>`或者`<div>`这样的 HTML 标签，这些标签是我们不想索引的。

我们可以使用 html 清除 字符过滤器 来移除掉所有的 HTML 标签，并且像把`&Aacute;`转换为相对应的 Unicode 字符`Á`这样，转换 HTML 实体。

一个分析器可能有 0 个或者多个字符过滤器。

> 分词器

一个分析器 必须 有一个唯一的分词器。

分词器把字符串分解成单个词条或者词汇单元。

 标准分析器里使用的 标准 分词器 把一个字符串根据单词边界分解成单个词条，并 且移除掉大部分的标点符号，然而还有其他不同行为的分词器存在。

例如

- 关键词 分词器 完整地输出 接收到的同样的字符串，并不做任何分词。

- 空格 分词 器 只根据空格分割文本 。
- 正则 分词器 根据匹配正则表达式来分割文本 。

> 词单元过滤器

经过分词，作为结果的 词单元流 会按照指定的顺序通过指定的词单元过滤器 。

词单元过滤器可以修改、添加或者移除词单元。

我们已经提到过 lowercase 和 stop 词过滤 器 ，但是在 Elasticsearch 里面还有很多可供选择的词单元过滤器。

词干过滤器 把单词遏制为词干。

ascii_folding 过滤器移除变音符，把一个像 "très" 这样的词转换为 "tres" 。

ngram 和 edge_ngram 词单元过滤器 可以产生 适合用于部分匹配或者自动补全的词单元。

接下来，我们看看如何创建自定义的分析器：

```http
PUT http://localhost:9200/my_index
{
    "settings": {
        "analysis": {
            "char_filter": {
             // 自定义的过滤操作
                "&_to_and": {
                    "type": "mapping",
                    "mappings": [ "&=> and "]
                }},
            "filter": {
             // 停用的过滤操作
                "my_stopwords": {
                    "type": "stop",
                    "stopwords": [ "the", "a" ]
                }},
            "analyzer": {
                "my_analyzer": {
                    "type": "custom",
                    //过滤器
                    "char_filter": [ "html_strip", "&_to_and" ],
                    "tokenizer": "standard",
                   //分词器
                   "filter": [ "lowercase", "my_stopwords" ]
                }}
        }
    }
}
```

接下来测试下

```http
GET http://localhost:9200/my_index/_analyze
{
    "text":"The quick & brown fox",
    "analyzer":"my_analyzer"
}
```

结果

```json
{
    "tokens": [
        {
            "token": "quick",
            "start_offset": 4,
            "end_offset": 9,
            "type": "<ALPHANUM>",
            "position": 1
        },
        {
            "token": "and",
            "start_offset": 10,
            "end_offset": 11,
            "type": "<ALPHANUM>",
            "position": 2
        },
        {
            "token": "brown",
            "start_offset": 12,
            "end_offset": 17,
            "type": "<ALPHANUM>",
            "position": 3
        },
        {
            "token": "fox",
            "start_offset": 18,
            "end_offset": 21,
            "type": "<ALPHANUM>",
            "position": 4
        }
    ]
}
```

### 文档冲突的解决方案

当我们使用indexAPI更新文档，可以一次性读取原始文档，做我们的修改，然后重新索引整个文档

最近的请求索引将获胜，无论哪一个文档被缩影，都将被唯一存储在ES中

如果有别人更新这个文档，他们的更该将丢失

很多时候是没有这个问题的，也许我们的主数据存储的是一个关系型数据库，我们只是将数据复制到ElasticSearch中并使其可以被搜索，也许两个人同时更改文档的概率很小，或者对于我们的业务来说偶尔去丢失更改并不是很严重的问题

但有时丢失了一个变更就是非常严重的

例如我们用ES存储我们网上的商城商品库存数量，每次我们卖一个商品的时候，ES中库存就减一

如果有一天，管理层决定做一次促销，突然的，我们一秒要卖好几个商品，假设有两个Web程序并行运行，每一个都同时处理所有商品的销售

![image-20220101230107465](/images/SpringBoot/08-Elasticsearch/image-20220101230107465.png)

Web1对stock_count所做的更该已经丢失，因为web2不知道它的stock_count的拷贝已经过期

结果我们会认为有超时的商品的实际数量库存，因为卖给客户的库存商品并不存在，我们将让他们非常失望

解决方案有，而且非常的眼熟

- 悲观锁
- 乐观锁

### 乐观并发控制

ES是分布式的

当创建文档、更新或删除时，新版本的文档必须复制到集群中的其他节点，ES却也是异步和并发的，这意味着这些复制请求被发送，并且达到目的地时顺序也许是乱的，ElasticSearch需要一种方法区确保文档的旧版本不会覆盖新的版本

当我们之前讨论index，GET、和DELETE请求时，每个文档都有一个_version版本号

当文档被修改时版本号递增，ES使用这个version号来确保变更以正确顺序得到执行

入股过旧版本的文档在新版本之后到达，它可以被简单的忽略

我们可以利用version来确保应用中相互冲突的变更不会导致数据丢失，我们通过指定想要修改文档的version来达到这个目的，如果该版本号不是当前的版本号，我们的请求将会失败

我们先创建一个数据

```http
PUT http://localhost:9200/user/_create/1001
{
    "name":"张三",
    "sex":"男",
    "tel":"1111"
}
```

运行结果

```json
{
    "_index": "user",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

接下来我们再来发送一个修改的请求

```http
POST http://localhost:9200/user/_update/1001
{
    "doc":{
         "name":"李四"
    }
}
```

结果

```json {5,12}
{
    "_index": "user",
    "_type": "_doc",
    "_id": "1001",
    "_version": 2,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 1,
    "_primary_term": 1
}
```

可以看到，版本号和一个seq_no发生变化了

这个时候，我们试图指定版本号来进行更新

```http
POST http://localhost:9200/user/_update/1001?version=1
{
    "doc":{
         "name":"李四"
    }
}
```

可以得到一个错误

```json
{
    "error": {
        "root_cause": [
            {
                "type": "action_request_validation_exception",
                "reason": "Validation Failed: 1: internal versioning can not be used for optimistic concurrency control. Please use `if_seq_no` and `if_primary_term` instead;"
            }
        ],
        "type": "action_request_validation_exception",
        "reason": "Validation Failed: 1: internal versioning can not be used for optimistic concurrency control. Please use `if_seq_no` and `if_primary_term` instead;"
    },
    "status": 400
}
```

这是因为这个玩意官方已经不推荐使用了

而是推荐我们通过`if_seq_no` 和 `if_primary_term` 来进行版本锁控制

所以我们应该这样请求

```http
POST http://localhost:9200/user/_update/1001?if_seq_no=1&if_primary_term=1
{
    "doc":{
         "name":"王老五"
    }
}
```

结果

```json {5,12}
{
    "_index": "user",
    "_type": "_doc",
    "_id": "1001",
    "_version": 3,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 2,
    "_primary_term": 1
}
```

可以看到 version和 seq_no又发生变化了

这个时候如果我们再次尝试

<http://localhost:9200/user/_update/1001?if_seq_no=1&if_primary_term=1>

这样更改 将会抛出异常

```json
{
    "error": {
        "root_cause": [
            {
                "type": "version_conflict_engine_exception",
                "reason": "[1001]: version conflict, required seqNo [1], primary term [1]. current document has seqNo [2] and primary term [1]",
                "index_uuid": "1FKrmOb0QQ-rM7ScAbCP6A",
                "shard": "0",
                "index": "user"
            }
        ],
        "type": "version_conflict_engine_exception",
        "reason": "[1001]: version conflict, required seqNo [1], primary term [1]. current document has seqNo [2] and primary term [1]",
        "index_uuid": "1FKrmOb0QQ-rM7ScAbCP6A",
        "shard": "0",
        "index": "user"
    },
    "status": 409
}
```

但是这样的话  我们就需要那啥 做多个请求来获取数据 这样是非常痛苦的

### 外部系统版本控制

**在最新版本（7.16.x）中，这个方案已经被废弃了====不清楚是不是废弃 或者说这个功能是高级版才有的..没有在update日志中看到过关于这个变动的说明，看视频7.8.0是可以正常用的**

最新版本中 可以将更新结果 和 数据库内进行匹配后进行返回

一个常见的设置是使用其它数据库作为主要的数据存储，使用ElasticSearch做数据检索，这意味着主数据库的所有更该发生时都需要被复制到ElasticSearch，如果多个进程负责这一数据同步，我们可能会遇到之前描述的并发问题

如果我们的主数据库已经有了版本号或一个能作为版本号字段的值timestamp

那么就可以通过在ElasticSearch中通过添加`version_type=external`到查询字符串的方式重用这些相同的版本号，版本号必须是大于零的整数，并且小于Java中Long的最大值`9.2E+18`

```http
POST http://localhost:9200/user/_update/1001?version=1&if_primary_termversion_type=external
{
    "doc":{
         "name":"十六春"
    }
}
```

这里的version就相当于指定了我们的外部版本号，es会用他跟自己的`_version`进行对比 如果说对比结果为true，则过，否则不通过 之前我们修改过了这个的数据 所以他目前是3 故不通过

```json
{
    "error": {
        "root_cause": [
            {
                "type": "action_request_validation_exception",
                "reason": "Validation Failed: 1: internal versioning can not be used for optimistic concurrency control. Please use `if_seq_no` and `if_primary_term` instead;"
            }
        ],
        "type": "action_request_validation_exception",
        "reason": "Validation Failed: 1: internal versioning can not be used for optimistic concurrency control. Please use `if_seq_no` and `if_primary_term` instead;"
    },
    "status": 400
}
```

### Kibana

一个免费，开源的图形化管理工具

地址

<https://www.elastic.co/downloads/kibana>

下载好了之后解压

然后修改`config/kibana.yml`文件为如下内容

```yaml
# 默认端口
server.port: 5601

# ES服务器的地址
elasticsearch.hosts: ["http://localhost:9200"]

# 索引名
kibana.index: ".kibana"

# 支持中文
i18n.locale: "zh-CN"
```

然后运行`bin/kibana.bat`即可

然后访问：<http://localhost:5601>

即可

![image-20220102003021879](/images/SpringBoot/08-Elasticsearch/image-20220102003021879.png)

选择右边的即可

具体的就不多说了  主要这玩意还是蛮吃内存的..

# ElasticSearch集成

## Spring Data框架集成

### Spring Data介绍

Spring Data是一个用于简化数据库、非关系形数据库、索引库访问，并支持云服务的开源框架

其主要目的是使得对数据的访问变得方便快捷，并支持map-reduce框架和云计算服务

Spring Data可以极大地简化JPA（ElasticSearch…）的写法，可以在几乎不用写实现的情况下，实现对数据的访问和操作

除了CRUD之外，还包括一些如分页、排序等常用的功能

> Spring Data ElasticSearch基于Spring Data Api简化ElasticSearch的操作，将原始操作ElasticSearch的客户端API进行封装，Spring Data为ElasticSearch项目提供集成搜索引擎

这玩意对ElasticSearch的版本是有要求的

<https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#preface.versions>

目前最新是4.3.0 最高支持 ElasticSearch 7.15.x

![image-20220102122714859](/images/SpringBoot/08-Elasticsearch/image-20220102122714859.png)

![image-20220102122739215](/images/SpringBoot/08-Elasticsearch/image-20220102122739215.png)

并且不同版本之间有些APi变动有那么亿点点大

### Spring Boot集成

![image-20220102123221639](/images/SpringBoot/08-Elasticsearch/image-20220102123221639.png)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

接下来看看父依赖中需要的ElasticSearch的版本

```xml
<elasticsearch.version>7.15.2</elasticsearch.version>
```

要7.15.2的。。。

所以说得去下载这个版本的

<https://www.elastic.co/downloads/past-releases#elasticsearch>

接着IK也顺手装一下

<https://github.com/medcl/elasticsearch-analysis-ik/releases>

接着我们看下这玩意的自动配置文件

![image-20220102124727964](/images/SpringBoot/08-Elasticsearch/image-20220102124727964.png)

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass({ ElasticsearchRestTemplate.class })
@AutoConfigureAfter({ ElasticsearchRestClientAutoConfiguration.class,
                     ReactiveElasticsearchRestClientAutoConfiguration.class })
@Import({ ElasticsearchDataConfiguration.BaseConfiguration.class,
         ElasticsearchDataConfiguration.RestClientConfiguration.class,
         ElasticsearchDataConfiguration.ReactiveRestClientConfiguration.class })
public class ElasticsearchDataAutoConfiguration {

}

```

emm没看出啥来 先用吧

### 配置文件

我们目前只需要配置

```yaml
# ES服务器地址
spring:
  elasticsearch:
    uris: "http://localhost:9200"

# 开下debug 这里是为了能看到请求路径
logging.level.com.myproject: debug
```

看下这个uris对应的配置文件

```java
/**
  * Comma-separated list of the Elasticsearch instances to use.
  */
private List<String> uris = new ArrayList<>(Collections.singletonList("http://localhost:9200"));

/**
  * Username for authentication with Elasticsearch.
  */
private String username;

/**
  * Password for authentication with Elasticsearch.
  */
private String password;

/**
  * Connection timeout used when communicating with Elasticsearch.
  */
private Duration connectionTimeout = Duration.ofSeconds(1);

/**
  * Socket timeout used when communicating with Elasticsearch.
  */
private Duration socketTimeout = Duration.ofSeconds(30);

/**
  * Prefix added to the path of every request sent to Elasticsearch.
  */
private String pathPrefix;
```

原来配置不在data目录下

![image-20220102125416311](/images/SpringBoot/08-Elasticsearch/image-20220102125416311.png)

### 索引的基本添加和删除

我们先添加一个domain

这些见名知意 @id为指定id字段

@field指定字段类型 是text 还是keyword

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
// 下面这个@Document一定不能省略  然后如果是老版本（7.8以及之前应该都是 @setting中的内容是卸载这个document内的）
@Document(indexName = "shopping")
@Setting(shards = 3, replicas = 1)
public class Product {
    /**
     * 商品id
     */
    @Id
    private Long id;
    /**
     * 商品名称
     */
    @Field(type = FieldType.Text, analyzer = "ik_max_word", searchAnalyzer = "ik_max_word")
    private String title;
    /**
     * 分类名称
     */
    @Field(type = FieldType.Keyword)
    private String category;
    /**
     * 商品价格
     */
    @Field(type = FieldType.Double)
    private Double price;
    /**
     * 图片地址
     */
    @Field(type = FieldType.Keyword,index = false)
    private String images;
}
```

然后就可以了

对这样就可以了

其他的什么事情都不用做

springboot将会在启动的时候自动创建索引

我们要删除也非常简单

```java {15-20}
@SpringBootTest
@Slf4j
class ApplicationTests {

    @Autowired
    ElasticsearchRestTemplate elasticsearchRestTemplate;
    
    @Test
    void contextLoads() {
//        初始化的时候会自动创建索引

        log.info("创建索引");
    }

    @Test
    public void deleteIndex() {
//        如果说是在7.8.0版本之下 需要通过elasticsearchRestTemplate.deleteIndex(Product.class)来删除索引
        val delete = elasticsearchRestTemplate.indexOps(Product.class).delete();
        log.info("删除索引：{}", delete);
    }

}
```

日志：

![image-20220102160902051](/images/SpringBoot/08-Elasticsearch/image-20220102160902051.png)

### 文档的基本操作

我们先创建一个pojo

```java
@Repository
public interface ProductDao extends ElasticsearchRepository<Product,Long> {
}

```

这玩意就类似于Mybatis的那啥一样 反正很方便就是了 加一个继承接口就可以使用它的全部功能，接下来使用

#### 基本增删改查

```java
@SpringBootTest
@Slf4j
class ApplicationTests {
 // 自动导入即可
    @Autowired
    ProductDao purchaseDao;

    @Test
    void create() {
        val product = new Product();
        product.setId(1L);
        product.setTitle("iphone 999 plus");
        product.setCategory("苹果手机");
        product.setPrice(10000.0);
//        存储对象
        purchaseDao.save(product);
//        通过id获取对象
        log.info("product:{}", purchaseDao.findById(1L));
    }

    @Test
    public void update() {
//        修改和增加用的是同一个方法 会覆盖原来的数据
        val product = new Product();
        product.setId(1L);
        product.setTitle("iphone 666 plus");
        product.setCategory("苹果手机");
        product.setPrice(10000.0);
        purchaseDao.save(product);
        log.info("product:{}", purchaseDao.findById(1L));
    }

    @Test
    public void search() {
//         查询
//         通过id查询
        Optional<Product> byId = purchaseDao.findById(1L);
        log.info("product:{}", byId);
//         查询全部
        log.info("============");
        purchaseDao.findAll().forEach(product -> log.info("product:{}", product));

    }

    @Test
    public void delete() {
//        删除 这玩意没有返回值 如果说东西不存在也不会报错
        purchaseDao.deleteById(1L);
    }

}

```

#### 批量增删改查和分页、排序查询

```java
@Test
public void saveAll() {
    //        批量插入 其他的都差不多是这个样子做即可
    ArrayList<Product> products = new ArrayList<>();
    for (long i = 0; i < 10; i++) {
        products.add(new Product(i, "iphone" + i, "苹果手机", i * 1000.0, "www.aaa.com"));
    }
    Iterable<Product> products1 = purchaseDao.saveAll(products);
    products1.forEach(product -> log.info("product:{}", product));
}

@Test
public void findByPageable() {
    //        分页查询和排序
    //         先设置 排序规则这里通过id倒序排序
    Sort idSort = Sort.by(Sort.Direction.DESC, "id");
    //        设置查询分页

    //        当前页
    int currentPage = 0;
    //        每页的数据
    int pageSize = 5;
    //        分页查询 设置 页数 和规则
    PageRequest pageRequest = PageRequest.of(currentPage, pageSize, idSort);
    purchaseDao.findAll(pageRequest).forEach(product -> log.info("product:{}", product));
}
```

### 文档搜索

我们的文档内现在有十条数据

![image-20220102164058988](/images/SpringBoot/08-Elasticsearch/image-20220102164058988.png)

这里就用一个简单的term查询了

```java {14}
@SpringBootTest
@Slf4j
class ApplicationTests {


    @Autowired
    ElasticsearchRestTemplate elasticsearchRestTemplate;


    @Test
    public void termQuery() {
        //        就和之前用JavaApi那样 进行查询builder封装
        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("title", "6");
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(termQueryBuilder);
        SearchHits<Product> search = elasticsearchRestTemplate.search(nativeSearchQuery, Product.class);
        search.forEach(hit -> log.info("hit:{}", hit));
    }
}

```

这玩意查询有点怪….只能说 如果要加其他条件 比如排序啥的

在nativeSearchQuery内添加 例如`nativeSearchQuery.addSort(new Sort.....)`

类似于这样

模糊查询之类的 和原生APi没啥两样 不过是换了个方式查而已。。。

## Spark和Filnk框架集成ES

这两个是大数据框架

暂时先过了

<https://www.bilibili.com/video/BV1hh411D7sb?p=54&spm_id_from=pageDriver>

54 -55 说了如何集成

# ES的优化

## 硬件的选择

ES的所有索引和文档数据都是存储在本地硬盘中的

可以通过修改`/config/elasticsearch.yml`中的配置来进行修改

```yaml
path
 data: /path/to/data
 logs: /path/to/logs
```

上面的是默认值

 爱咋改咋改

![image-20220102173605929](/images/SpringBoot/08-Elasticsearch/image-20220102173605929.png)

## 分片策略

分片和副本的设计为ES提供了支持分布式和故障转移的特性，但并不意味着分片和副本是可以无限分配的

而且索引的分片完成后由于索引的路由机制，我们是不能在这之后修改分片数量

可能有人会说：我不知道这个索引将来会变得多大，并且过后我也不能更该索引的大小，所以为了保险起见先来个1k

但--分片也是有代价的

- 一个分片的底层是一个Lucene索引，它会消耗一定的句柄内存和CPU运转
- 每一个搜索请求都需要命中一个节点，如果没一个分片都处于不同的节点还好，但如果多个分片都需要在同一个节点上竞争使用相同的资源就GG了
- 用户计算相关度的词项统计信息是基于分片的，如果有序多分片，每一个都只会有很少的数据导致很低的相关度

![image-20220102174345075](/images/SpringBoot/08-Elasticsearch/image-20220102174345075.png)

![image-20220102174409304](/images/SpringBoot/08-Elasticsearch/image-20220102174409304.png)

![image-20220102174458115](/images/SpringBoot/08-Elasticsearch/image-20220102174458115.png)

## 写入优化

![image-20220102174628693](/images/SpringBoot/08-Elasticsearch/image-20220102174628693.png)

![image-20220102174747109](/images/SpringBoot/08-Elasticsearch/image-20220102174747109.png)

![image-20220102174809106](/images/SpringBoot/08-Elasticsearch/image-20220102174809106.png)

![image-20220102174828216](/images/SpringBoot/08-Elasticsearch/image-20220102174828216.png)

![image-20220102174853617](/images/SpringBoot/08-Elasticsearch/image-20220102174853617.png)

![image-20220102174913428](/images/SpringBoot/08-Elasticsearch/image-20220102174913428.png)

## 内存设置

![image-20220102175012177](/images/SpringBoot/08-Elasticsearch/image-20220102175012177.png)

![image-20220102175110536](/images/SpringBoot/08-Elasticsearch/image-20220102175110536.png)

![image-20220102175127313](/images/SpringBoot/08-Elasticsearch/image-20220102175127313.png)

![image-20220102175140594](/images/SpringBoot/08-Elasticsearch/image-20220102175140594.png)

## 重要配置项

| 参数名                             | 参数值        | 说明                                                                                                                                                                                                                                                |
| ---------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cluster.name                       | elasticsearch | 配置 ES 的集群名称，默认值是 ES，建议改成与所存数据相关的名称，ES 会自动发现在同一网段下的 集群名称相同的节点                                                                                                                                       |
| node.name                          | node-1        | 集群中的节点名，在同一个集群中不能重复。节点 的名称一旦设置，就不能再改变了。当然，也可以 设 置 成 服 务 器 的 主 机 名 称 ， 例 如 node.name:${HOSTNAME}。                                                                                         |
| node.master                        | true          | 指定该节点是否有资格被选举成为 Master 节点，默 认是 True，如果被设置为 True，则只是有资格成为 Master 节点，具体能否成为 Master 节点，需要通 过选举产生。                                                                                            |
| node.data                          | true          | 指定该节点是否存储索引数据，默认为 True。数据 的增、删、改、查都是在 Data 节点完成的。                                                                                                                                                              |
| index.number_of_shards             | 1             | 设置都索引分片个数，默认是 1 片。也可以在创建 索引时设置该值，具体设置为多大都值要根据数据 量的大小来定。如果数据量不大，则设置成 1 时效 率最高                                                                                                     |
| index.number_of_replicas           | 1             | 设置默认的索引副本个数，默认为 1 个。副本数越 多，集群的可用性越好，但是写索引时需要同步的 数据越多。                                                                                                                                               |
| transport.tcp.compress             | true          | 设置在节点间传输数据时是否压缩，默认为 False， 不压缩                                                                                                                                                                                               |
| discovery.zen.minimum_master_nodes | 1             | 设置在选举 Master 节点时需要参与的最少的候选 主节点数，默认为 1。<br />如果使用默认值，则当网络 不稳定时有可能会出现脑裂。<br /> 合理的数值为 (master_eligible_nodes/2)+1 <br />其中 master_eligible_nodes 表示集群中的候选主节点数<br />(超过半数) |
| discovery.zen.ping.timeout         | 3s            | 设置在集群中自动发现其他节点时 Ping 连接的超 时时间，默认为 3 秒。 在较差的网络环境下需要设置得大一点，防止因误 判该节点的存活状态而导致分片的转移                                                                                                  |

剩下的一些面试题

建议看

<https://www.bilibili.com/video/BV1hh411D7sb?p=62&spm_id_from=pageDriver>
