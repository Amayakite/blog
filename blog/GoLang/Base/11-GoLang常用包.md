---
title: GoLang常用包
date: 2022-4-29 13:40:47
category: GoLang
tag:
  - GoLang
  - module
  - Package
---

## Golang包大全

详情可以看这个网址<https://awesome-go.com/>

翻译成中文即可，里面有能想到的所有的类型的包

## Web层

### Gin

```shell
go get github.com/gin-gonic/gin
```

### Websocket

导包

```shell
go get github.com/gorilla/websocket
```

使用

```go
var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

func handler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    // TODO Do Something in Conn
}
```

### 假数据生成

导包

```shell
go get github.com/manveru/faker
```

使用

```go
package main

import (
	"fmt"

	"github.com/manveru/faker"
)

func main() {
	f, err := faker.New("zh-CN")
	if err != nil {
		fmt.Printf("异常: %v\n", err)
		return
	}

}
```



## 数据层

### 单Mysql

先导包

```shell
go get github.com/go-sql-driver/mysql
```

使用

```go
package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// 先定义一个addr 命名规范：账号:密码@tcp(ip:端口)/数据库名称?对应的参数
	addr := "root:amayakiteProjectMysql@tcp(myserver:13001)/go_data"
	// 连接数据库
	db, err := sql.Open("mysql", addr)
	if err != nil {
		fmt.Println("连接数据库失败，格式有误或账号密码错误", err)
		return
	}
	defer db.Close()
	// 看下是否能ping通，能ping通就是连接成功
	err = db.Ping()
	if err != nil {
		fmt.Println("连接数据库失败", err)
		return
	}
	fmt.Println("连接数据库成功")

}

```

### Gorm

#### 配合Mysql

> 导包

```shell
# 配合sqlite
go get gorm.io/gorm
go get gorm.io/driver/mysql
```

使用

```go
import (
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

func main() {
  // 参考 https://github.com/go-sql-driver/mysql#dsn-data-source-name 获取详情
  dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
}
```

#### 配合Sqlite

> 导包

```shell
go get gorm.io/gorm
go get gorm.io/driver/sqlite
```

使用

```go
import (
  "gorm.io/gorm"
  "gorm.io/driver/sqlite"
)

func main() {
  db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }
}
```
