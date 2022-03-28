---
title: 10-GIN
date: 2022-3-27 22:27:35
category: GoLang
tag:
  - GoLang
  - Gin
---

## 概述

这个就相当于是Java中的Spring一样，或许并没有Spring那么强大，不过是大多数人的选择

是一个**微框架**，封装比较友好，API友好，具有灵活快捷、容错方便等特点

### 快速上手

首先安装下依赖

```shell
go mod init 
go get -u github.com/gin-gonic/gin
```

然后写如下代码

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1.创建路由
	r := gin.Default()
	// 2.绑定路由规则，执行的函数
	// gin.Context，封装了request和response
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hello World!")
	})
	// 3.监听端口，默认在8080
	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}
```

或者说些多一点

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1.创建路由
	r := gin.Default()

	r.GET("/get", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"code": 200,
			"msg":  "ok",
		})
	})
	// post
	r.POST("/post", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"code": 200,
			"msg":  "ok",
		})
	})
	// put
	r.PUT("/put", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"code": 200,
			"msg":  "ok",
		})
	})
	// delete restful 传入id
	r.DELETE("/delete/:id", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"code": 200,
			"msg":  "ok",
			"id":   ctx.Param("id"),
		})
	})

	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}

```


### 关于初始化路由和自定义初始化参数

我们在初始化的时候调用了`gin.Default()`，先看看它的代码

```go
func Default() *Engine {
	debugPrintWARNINGDefault()
	engine := New()
	engine.Use(Logger(), Recovery())
	return engine
}
```

可以看到 其中是`engine := New()`new了一个对象出来，然后调用Use调用了两个中间件并return

一个是Log的，另外一个恢复啥的东西

所以我们要自定义的话，只需要


```go
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// 1.创建路由 带有中间件
	_ := gin.Default()
	// 2. 创建路由 不带中间件
	_ := gin.New()

}
```

### 如何获取API参数

无非就三种参数，直接获取即可

```go
package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1.创建路由
	r := gin.Default()

	// post
	r.POST("/post/:method", func(ctx *gin.Context) {
		// 获取路由?参数id
		id := ctx.Query("id")
		// 打印请求参数
		fmt.Println("请求中的id为：", id)
		// 获取请求体
		rc := ctx.Request.Body
		// 读取请求体
		buf := make([]byte, 1024)
		rc.Read(buf)
		// 打印请求体
		fmt.Println("请求体为：", string(buf))
		// 获取路径参数
		method := ctx.Param("method")
		// 打印路径参数
		fmt.Println("路径参数为：", method)
		// 返回数据 json
		ctx.JSON(http.StatusOK, gin.H{
			"id":     id,
			"rc":     string(buf),
			"method": method,
		})

	})

	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}
```

### 获取Query参数时候的默认值设置

使用`DefaultQuery`即可给`?xxx=xxx`设定默认值

```go {7}
func main() {
	// 1.创建路由
	r := gin.Default()
	// post
	r.POST("/post/:method", func(ctx *gin.Context) {
		// 获取路由?参数id
		id := ctx.DefaultQuery("id", "6666")
		// 打印请求参数
		fmt.Println("请求中的id为：", id)
		// 获取请求体
		rc := ctx.Request.Body
		// 读取请求体
		buf := make([]byte, 1024)
		rc.Read(buf)
		// 打印请求体
		fmt.Println("请求体为：", string(buf))
		// 获取路径参数
		method := ctx.Param("method")
		// 打印路径参数
		fmt.Println("路径参数为：", method)
		// 返回数据 json
		ctx.JSON(http.StatusOK, gin.H{
			"id":     id,
			"rc":     string(buf),
			"method": method,
		})

	})

	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}
```

### 获取请求体

四种：application/json、form-urlencoded、xml,multipart/form-data


对于`form-urlencoded`这种格式，可以通过如下方式来指定获取某个字段的值（原生html的表单提交，ajax之类的提交的都是json，不适用）

```go
func main() {
	// 1.创建路由
	r := gin.Default()
	// post
	r.POST("/post", func(ctx *gin.Context) {
		// 获取请求体 单独获取某一个字段，获取到的内容都是string
		name := ctx.PostForm("name")
		// 获取请求体中的内容，获取某一个字段，设置默认值
		age := ctx.DefaultPostForm("age", "0")
		fmt.Println(name, age)
		ctx.JSON(200, gin.H{
			"name": name,
			"age":  age,
		})

	})
	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}
```
对于application/json和xml，则只能一次性获取所有请求体

### 获取上传的文件

上传文件有两种-单个文件和多个文件

> 上传单个文件



```go
package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
)

func randomUUID(length int) string {
	// 生成指定长度的uuid
	str := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	bytes := []byte(str)
	result := []byte{}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < length; i++ {
		result = append(result, bytes[r.Intn(len(bytes))])
	}
	return string(result)
}

func main() {
	// 1.创建路由
	r := gin.Default()
	// post
	r.POST("/upload", func(ctx *gin.Context) {
		// 1.获取文件 单个文件的获取
		file, err := ctx.FormFile("file")
		if err != nil {
			fmt.Println(err)
			return
		}
		// 2.获取文件的名称
		filename := file.Filename
		// 3.将文件写入本地 直接调用ctx的方法即可，不需要自己写，默认是存储在当前目录下
		ctx.SaveUploadedFile(file, randomUUID(10)+filename)
		// 4.返回文件名称
		ctx.JSON(200, gin.H{
			"filename": filename,
		})

	})

	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}
```

::: tip

可以通过file.size来限制大小，或者直接设置全局的限制，如下：

```go
package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1.创建路由
	r := gin.Default()
	// 设置文件上传的大小限制 默认为32M
	r.MaxMultipartMemory = 8 << 20 // 8M

	// post
	r.POST("/upload", func(ctx *gin.Context) {
		// 1.获取文件 单个文件的获取
		file, err := ctx.FormFile("file")
		if err != nil {
			fmt.Println(err)
			return
		}
		// 2.获取文件的名称
		filename := file.Filename
		// 4.返回文件名称
		ctx.JSON(200, gin.H{
			"filename": filename,
		})

	})
	r.Run(":8000")
}
```

:::

> 上传多个文件

```go
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// 1.创建路由
	r := gin.Default()
	// 设置文件上传的大小限制 默认为32M
	r.MaxMultipartMemory = 8 << 20 // 8M
	// post
	r.POST("/upload", func(ctx *gin.Context) {
		// 获取所有的上传文件
		// 1. 先获取form
		form, _ := ctx.MultipartForm()
		// 2. 获取所有的文件
		files := form.File["file"]
		for _, file := range files {
			// 获取文件名
			filename := file.Filename
			// 将文件内容写入到指定的目录
			ctx.SaveUploadedFile(file, filename)
		}
		// return ok
		ctx.JSON(200, gin.H{
			"message": "ok",
		})
	})

	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}
```

## 路由

### 设置前置路由（路由组）

有的时候，我们希望是访问这样的`/user/login`或者`/user/info`

所以这个时候可以通过路由组的方式来实现

```go {10}
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	user := r.Group("/user")
    // 下面这个大括号是书写规范，一般相同路由都是写在一个大括号内 
	{
		user.GET("/:id", func(c *gin.Context) {
			c.String(200, "User: %s", c.Param("id"))
		})
		user.POST("/:id", func(c *gin.Context) {
			c.String(200, "User: %s", c.Param("id"))
		})
	}

	r.Run(":8000")
}
```

::: tip

路由在各大语言中一般是以红黑树的形式存储，这样可以非常方便快捷的查询到想要的路由

:::