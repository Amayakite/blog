---
title: 09-ETCD和ElasticSearch
date: 2022-3-27 15:39:08
category: GoLang
tag:
  - GoLang
  - ETCD
  - ElasticSearch
---

## ETCD

这玩意类似于Zookeeper或者说是Consul，反正是一个管理的东西

大概东西就是：它的目标是构建一个高可用的分布式键值(key-value)数据库。etcd内部采用raft协议作为一致性算法，etcd基于Go语言实现。

### 下载和安装

首先去官网下载对应系统的安装包<https://github.com/etcd-io/etcd/releases/tag/v3.5.2>

我这里看到最新的是3.5.2

下载安装好后，先去修改下系统变量

::: warning

注意，下方操作非常重要，不可省略

:::

WIndows:

```cmd
SET ETCDCTL_API=3
```

Mac和Linux:

```shell
export ETCDCTL_API=3
```

然后启动下载好的压缩包内的`etcd`可执行程序即可

### 基本使用

刚刚启动好了ETCD之后，默认占用2379端口，这个时候就可以通过自带的`etcdctl`来操作它

它是一个kv数据库，所以可以自由的在其中添加可以k-v

```cmd
# 添加数据
 .\etcdctl.exe --endpoints=http://localhost:2379 put name "Amayakite"
# 获取数据
.\etcdctl.exe --endpoints=http://localhost:2379 get name
# 删除数据，返回受影响的行数
.\etcdctl.exe --endpoints=http://localhost:2379 del name
```

操作无非就get和put以及del

### 使用GO语言操作ETCD

还是比较简单的，需要安装的依赖

```shell
go get go.etcd.io/etcd/client/v3
```

emm这玩意我直接安装不成功，最后再ieda里面点击标红的来进行get才成功的，不知道为啥

```go
package main

import (
	"context"
	"fmt"
	"go.etcd.io/etcd/client/v3"
	"time"
)

func main() {
	cli, err := clientv3.New(clientv3.Config{
		//这里传入etdc地址切片
		Endpoints:   []string{"localhost:2379"},
		DialTimeout: 5 * time.Second,
	})
	if err != nil {
		// handle error!
	}
	defer func(cli *clientv3.Client) {
		err := cli.Close()
		if err != nil {
			//    DO Nothings
		}
	}(cli)
	timeout, cancelFunc := context.WithTimeout(context.Background(), time.Second)
	_, err = cli.Put(timeout, "key", "value")
	//等待1秒
	cancelFunc()
	if err != nil {
		// handle error!
	}
	//    获取值
	timeout, cancelFunc = context.WithTimeout(context.Background(), time.Second)
	resp, err := cli.Get(timeout, "key")
	//等待1秒
	cancelFunc()
	if err != nil {
		// handle error!
	}
	for _, ev := range resp.Kvs {
		//获取到的是byte类型，所以都要转换成string
		fmt.Println(string(ev.Key), string(ev.Value))
	}
	//    删除
	timeout, cancelFunc = context.WithTimeout(context.Background(), time.Second)
	_, err = cli.Delete(timeout, "key")
	//等待1秒
	cancelFunc()
	if err != nil {
		// handle error!

	}
    fmt.Println("程序结束")

}
```

### 监听一个值

这个还是比较简单的

```go
package main

import (
    "context"
    "fmt"
    "go.etcd.io/etcd/client/v3"
    "time"
)

func main() {
	cli, err := clientv3.New(clientv3.Config{
		//这里传入etdc地址切片
		Endpoints: []string{"localhost:2379"},
		//这里是超时时间
		DialTimeout: 5 * time.Second,
	})
	if err != nil {
		// handle error!
	}
	defer func(cli *clientv3.Client) {
		err := cli.Close()
		if err != nil {
			//    DO Nothings
		}
	}(cli)
	//这里拍一个哨兵监听值的变化（增删改查），返回一个只读的chan
	watch := cli.Watch(context.Background(), "name")
	//这里是一个循环，监听值的变化
	for wresp := range watch {
		//事件类型：如果返回的是put事件，则返回的是一个put事件，如果返回的是delete事件，则返回的是一个delete事件
		eventType := wresp.Events[0].Type
    //    判断是不是删除
        if eventType == clientv3.EventTypeDelete {
            fmt.Println("被删除了")
        }else{
            //无论是更新还是创建，都会返回一个put事件
            fmt.Println("被改变了",eventType)
        //    打印最新的值
            fmt.Println(string(wresp.Events[0].Kv.Value))
        }
	}
	time.Sleep(time.Hour)
}
```

## ElasticSearch

这个也不多介绍了，虽然说我也不太熟用这玩意

目前来说看到的官方已经出v8了emm看着鉴权完善了很多，我这里选择的版本是**7.17.1**

由于我懒得上服务器，所以直接在官网<https://www.elastic.co/cn/downloads/elasticsearch>下载后到本地跑起来

PS：主要是因为上服务器得再配置密码，懒得整

下载好了之后直接启动bin下的`elasticsearch.bat`即可


### GO操作ElasticSearch

首先要选择对应的依赖，依赖上这里找<https://pkg.go.dev/search?q=elasticsearch>

我的是7.17.1，选择的依赖是

```shell
go get github.com/elastic/go-elasticsearch/v7
```

然后直接使用即可，md这玩意新版本有点蛋疼，要把字符串转换成流才可以传入...

还有其他的API用上了去百度即可

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/elastic/go-elasticsearch/v7"
)

type Student struct {
	Name    string `json:"name"`
	Age     int    `json:"age"`
	Married bool   `json:"married"`
}

// 构造函数
func NewStudent(name string, age int, married bool) *Student {
	return &Student{
		Name:    name,
		Age:     age,
		Married: married,
	}
}

func main() {
	client, err := elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{"http://localhost:9200"},
	})
	if err != nil {
		fmt.Printf("Error creating the client: %s\n", err)
		return
	}
	fmt.Println("链接客户端成功", client)
	s := NewStudent("张三", 20, true)
	// 序列化
	data, _ := json.Marshal(s)
	r, err2 := client.Create("sutdent", "1", strings.NewReader(string(data)))
	if err2 != nil {
		fmt.Println("Error creating the document: %s\n", err2)
		return
	}
	fmt.Println("创建文档成功,文档id为：",r.Id)

	// 查询 名字中带有张的
	query, err := client.Search(
		client.Search.WithContext(context.Background()),
		client.Search.WithIndex("sutdent"),
		client.Search.WithBody(strings.NewReader(`{
			"query": {
				"match": {
					"name": "张"
				}
			}
		}`)))
	if err != nil {
		fmt.Println("Error getting the response: %s\n", err)
		return
	}
	defer query.Body.Close()
	fmt.Println(query.String())

	// 删除
	r, err3 := client.Delete("sutdent", "1")
	if err3 != nil {
		fmt.Println("Error deleting the document: %s\n", err3)
		return
	}
	fmt.Println(r.String())
}
```


