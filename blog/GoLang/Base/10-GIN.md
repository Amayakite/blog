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

## 请求

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

### [重要]接收数据并绑定对象

使用起来还是比较简单的，指定解析即可

```go {23}
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type LoginUser struct {
	// 用户名 form 表单参数，其余的正常参数 uri是路径参数 bingding=required 表示必须有这个字段（不能为空），没有的话会报错
	Username string `form:"username" json:"username" xml:"username" uri:"username"  binding:"required"`
	Password string `form:"password" json:"password" xml:"password" uri:"password"  binding:"required"`
}

func main() {
	r := gin.Default()

	r.POST("/login", func(c *gin.Context) {
		// 声明接收的变量
		var user LoginUser
		// 把接收到的数据绑定到变量上 json
		// 会将request的body中的数据自动解析到结构体 例如上方中，标记了json:username，则会解析请求体中json部分的username字段给到这里
		err := c.ShouldBindJSON(&user)
		// 如果出问题了
		if err != nil {
			// 返回错误信息
			// gin.H封装了生成json的工具
			c.JSON(http.StatusBadRequest, gin.H{
				"msg": err.Error(),
			})
			return

		}
		// 判断用户名和密码是否正确
		if user.Username != "admin" || user.Password != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"msg": "用户名或密码错误",
			})
			return
		}
		// 返回登录成功
		c.JSON(http.StatusOK, gin.H{
			"msg": "登录成功",
		})

	})

	r.Run(":8000")
}
```

::: tip

同理，还可以解析form和xml之类的，或者如下方所示通过`Bind`自动推断

:::

```go {25}
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type LoginUser struct {
	// 用户名 form 表单参数，其余的正常参数 uri是路径参数 bingding=required 表示必须有这个字段（不能为空），没有的话会报错
	Username string `form:"username" json:"username" xml:"username" uri:"username"  binding:"required"`
	Password string `form:"password" json:"password" xml:"password" uri:"password"  binding:"required"`
}

func main() {
	r := gin.Default()

	r.POST("/login", func(c *gin.Context) {
		// 声明接收的变量
		var user LoginUser
		// 把接收到的数据绑定到变量上 json
		// 会将request的body中的数据自动解析到结构体

		// 使用c.Bind会根据请求头中的content-type自动解析
		err := c.Bind(&user)
		// 如果出问题了
		if err != nil {
			// 返回错误信息
			// gin.H封装了生成json的工具
			c.JSON(http.StatusBadRequest, gin.H{
				"msg": err.Error(),
			})
			return

		}
		// 判断用户名和密码是否正确
		if user.Username != "admin" || user.Password != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"msg": "用户名或密码错误",
			})
			return
		}
		// 返回登录成功
		c.JSON(http.StatusOK, gin.H{
			"msg": "登录成功",
		})

	})

	r.Run(":8000")
}
```


::: info 说明

当然，也可以直接解析uri中的参数

:::

```go {21-22}
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type LoginUser struct {
	// 用户名 form 表单参数，其余的正常参数 uri是路径参数 bingding=required 表示必须有这个字段（不能为空），没有的话会报错
	Username string `form:"username" json:"username" xml:"username" uri:"username"  binding:"required"`
	Password string `form:"password" json:"password" xml:"password" uri:"password"  binding:"required"`
}

func main() {
	r := gin.Default()

	r.POST("/login/:username/:password", func(c *gin.Context) {
		// 声明接收的变量
		var user LoginUser
		// 把uri中的参数绑定到user中 注意 如果是uri绑定的话，没有传入指定参数则是直接返回404 not found
		err := c.ShouldBindUri(&user)
		// 如果出问题了
		if err != nil {
			// 返回错误信息
			// gin.H封装了生成json的工具
			c.JSON(http.StatusBadRequest, gin.H{
				"msg": err.Error(),
			})
			return

		}
		// 判断用户名和密码是否正确
		if user.Username != "admin" || user.Password != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"msg": "用户名或密码错误",
			})
			return
		}
		// 返回登录成功
		c.JSON(http.StatusOK, gin.H{
			"msg": "登录成功",
		})

	})

	r.Run(":8000")
}
```

## 响应

响应客户端数据的方式有很多，下面简单说明下，一般也是用json比较多

### 通常数据：Json、XML、Yaml等

```go
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	ri := r.Group("/test")
	{
		ri.GET("/exampleJson", func(c *gin.Context) {
			// 响应普通的json
			c.JSON(200, gin.H{
				"message": "hello world",
			})
		})
		// 响应对象类型json
		ri.GET("/exampleJson2", func(c *gin.Context) {
			var msg struct {
				Code    int         `json:"code"`
				Message string      `json:"message"`
				Data    interface{} `json:"data"`
			}
			msg.Code = 200
			msg.Message = "hello world"
			msg.Data = "hello world"
			c.JSON(200, msg)
		})
		// 响应xml
		ri.GET("/exampleXml", func(c *gin.Context) {
			c.XML(200, gin.H{
				"message": "hello world",
			})
		})
		// 响应Yaml
		ri.GET("/exampleYaml", func(c *gin.Context) {
			c.YAML(200, gin.H{
				"message": "hello world",
			})
		})
		// 响应文件
		ri.GET("/exampleFile", func(c *gin.Context) {
			c.File("./main.go")
		})
		// 相应html
		ri.GET("/exampleHtml", func(c *gin.Context) {
			c.HTML(200, "index.tmpl", gin.H{
				"title": "Main website",
			})
		})

	}

	r.Run(":8000")
}
```

### 模板渲染HTML

Gin支持加载HTML模板，然后根据模板参数进行配置并返回相应的数据，**本质上就是字符串替换**

使用`LoadHtmlGlob()`方法可以加载模板文件

例如我们先写一个简单的支持渲染的html模板`templates/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{.title}}</title>
</head>

<body>
    <!-- 下面是一个h1标签 -->
    <h1>{{.message}}</h1>

</body>

</html>
```

然后根据语法开始进行渲染

```go
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("templates/*")
	// 也可以直接加载单个文件 不过一般都不会加载单个文件，而是指定文件夹
	// r.LoadHTMLGlob("templates/index.html")
	r.GET("/", func(c *gin.Context) {
		// 第二个参数是要渲染的文件的文件名，第三个是替换模板的数据
		c.HTML(200, "index.html", gin.H{
			"title":   "Main website",
			"message": "Hello, World!",
		})
	})

	r.Run(":8000")
}
```

接着访问，就可以得到如下内容

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Main website</title>
</head>

<body>
	<h1>Hello, World!</h1>
</body>
</html>
```

### 重定向

这个也是比较简单的，因为所有内容都封装在了`gin.Context`内，所以可以非常方便的调用

我们想要重定向到百度的话，只需要这样做

```go
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/rediect", func(ctx *gin.Context) {
		ctx.Redirect(302, "https://www.baidu.com")
	})

	r.Run(":8000")
}
```

### 异步处理

有的时候，想要分批次存储数据的话，或者想异步写日志的话，就可以使用它了

```go
package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/sync", func(ctx *gin.Context) {
		// 首先获取一个上下文副本
		copyContex := ctx.Copy()
		// 异步处理
		go func() {
			time.Sleep(time.Second * 3)
			fmt.Println("异步执行结束：", copyContex.Request.URL.Path)
			// 异步无法返回值
			// copyContex.JSON(200, gin.H{
			// 	"message": "异步执行结束",
			// })
		}()
		// 注意 副本没法返回值，必须得用原始的上下文才能返回信息
		ctx.JSON(200, gin.H{
			"message": "异步执行中",
		})

	})
	r.GET("/no_sync", func(ctx *gin.Context) {
		// 同步执行
		time.Sleep(time.Second * 3)
		fmt.Println("同步执行结束：", ctx.Request.URL.Path)
		ctx.JSON(200, gin.H{
			"message": "同步执行结束",
		})
	})

	r.Run(":8000")
}
```



## 路由

这个在Gin框架中并不是复杂的东西，很简单就可以使用了

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

## 中间件

这个应该不陌生了，就相当于是NodeJS/Koa中的中间件，或者说Java的Filter、SpringBoot的Interceptor、handler

可以在请求前后对数据进行校验、处理、加工等操作

- Gin可以构建中间件，但它只对注册过的路由函数起作用
- 对于分组路由，嵌套使用中间件，可以限定中间件的作用范围
- 中间件分为全局中间件、单个路由中间件和群组中间件
- **Gin中间件必须是一个`gin.HandlerFunc`类型**

### 定义一个简单的中间件

这里先来定义一个简单的中间件

```go
package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// 注册全局中间件
	r.Use(MiddleWare())
	// 注册路由
	r.GET("/hello", func(c *gin.Context) {
		// get 获取上下文中的变量 如果返回的第二个值是false，则说明没有这个变量
		value, exists := c.Get("name")
		if exists {
			fmt.Println("获取到上下文的变量：", value)

		}
		c.JSON(200, gin.H{
			"message": "hello",
			// 获取上下文的变量 MustGet：如果不存在则抛出异常
			"name": c.MustGet("name"),
		})

	})

	r.Run(":8000")
}

// 定义中间件
func MiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("中间件开始执行了")
		// 获取请求的路径并打印
		path := c.Request.URL.Path
		fmt.Println("请求的路径是：", path)
		// 给上下文添加一个变量
		c.Set("name", "张三")
		// 放行 如果这里是鉴权的话，还可以直接返回鉴权错误时要返回的值
		c.Next()
	}
}

```

整体来说还是和Node中使用的方式差不多的，上面我们自己写了一个中间件并且注册到了全局，所以说有的请求都会走这个中间件

### 全局中间件和局部中间件

有些时候，不仅仅是全局要走中间件，局部也有可能要单独设立一个中间件，例如`/admin`路由下的东西需要鉴权才能访问

所以可以这样操作

```go {15-16}
package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// 注册全局中间件
	r.Use(GlobalMiddleWare())
	// 注册路由
	rg := r.Group("/admin")
	// 注册局部中间件
	rg.Use(AdminMiddleWare())
	{
		rg.GET("/index", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"code":   200,
				"userId": c.GetInt("userId"),
				"Auth":   c.GetString("Auth"),
			})
		})
	}

	r.Run(":8000")
}

// 定义全局中间件
func GlobalMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("全局中间件")
		// 获取请求的路径并打印
		path := c.Request.URL.Path
		fmt.Println("请求的路径是：", path)
		// 给上下文添加一个变量
		c.Set("name", "张三")
		// 放行 如果这里是鉴权的话，还可以直接返回鉴权错误时要返回的值
		c.Next()
	}
}

// 定义admin中间件
func AdminMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 判断请求头中是否有Authorization
		Authorization := c.Request.Header.Get("Authorization")
		if Authorization == "" {
			// auth不存在，返回错误
			c.JSON(401, gin.H{
				"code": 401,
				"msg":  "请求头中无Authorization",
			})
			fmt.Println("鉴权不通过")
			// 终止请求，不再调用后续的handler和中间件
			c.Abort()
			return
		}
		// auth存在，TODO 鉴权逻辑
		fmt.Println("鉴权通过")
		c.Set("userId", 1)
		c.Set("Auth", Authorization)
		// 放行
		c.Next()
	}
}
```

::: tip 

当然，我们还可以给某个路由单独定义使用额外的中间件，例如：

```go {14-15}
package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// 注册全局中间件
	r.Use(GlobalMiddleWare())

	// 针对单个路由注册中间件，则这个路由会额外走一遍指定的中间件
	r.GET("/authApi", AdminMiddleWare(), func(c *gin.Context) {
		c.JSON(200, gin.H{
			"code":   200,
			"userId": c.GetInt("userId"),
			"Auth":   c.GetString("Auth"),
		})
	})

	r.Run(":8000")
}

// 定义全局中间件
func GlobalMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("全局中间件")
		// 获取请求的路径并打印
		path := c.Request.URL.Path
		fmt.Println("请求的路径是：", path)
		// 给上下文添加一个变量
		c.Set("name", "张三")
		// 放行 如果这里是鉴权的话，还可以直接返回鉴权错误时要返回的值
		c.Next()
	}
}

// 定义admin中间件
func AdminMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 判断请求头中是否有Authorization
		Authorization := c.Request.Header.Get("Authorization")
		if Authorization == "" {
			// auth不存在，返回错误
			c.JSON(401, gin.H{
				"code": 401,
				"msg":  "请求头中无Authorization",
			})
			fmt.Println("鉴权不通过")
			// 终止请求，不再调用后续的handler和中间件
			c.Abort()
			return
		}
		// auth存在，TODO 鉴权逻辑
		fmt.Println("鉴权通过")
		c.Set("userId", 1)
		c.Set("Auth", Authorization)
		// 放行
		c.Next()
	}
}
```
:::

### 例子：中间件统计程序执行用时

其实非常简单，Next之后是还可以跟代码的，所以只需要这样操作即可


```go
func GlobalMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 获取当前系统时间
		start := time.Now()
		fmt.Println("全局中间件")
		// 获取请求的路径并打印
		path := c.Request.URL.Path
		fmt.Println("请求的路径是：", path)
		// 放行
		c.Next()
		// 获取当前时间
		end := time.Now()
		// 计算请求时间
		cost := end.Sub(start)
		// 打印花了多少毫秒
		fmt.Printf("本次请求用时%d毫秒，%d纳秒\n", cost.Milliseconds(), cost.Nanoseconds())
	}
}
```

使用：


```go
package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// 注册全局中间件
	r.Use(GlobalMiddleWare())

	// 针对单个路由注册中间件
	r.GET("/index", AdminMiddleWare(), func(c *gin.Context) {
		c.JSON(200, gin.H{
			"code":   200,
			"userId": c.GetInt("userId"),
			"Auth":   c.GetString("Auth"),
		})
	})

	r.Run(":8000")
}

// 定义全局中间件
func GlobalMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 获取当前系统时间
		start := time.Now()
		fmt.Println("全局中间件")
		// 获取请求的路径并打印
		path := c.Request.URL.Path
		fmt.Println("请求的路径是：", path)
		c.Next()
		// 获取当前时间
		end := time.Now()
		// 计算请求时间
		cost := end.Sub(start)
		// 打印花了多少毫秒
		fmt.Printf("本次请求用时%d毫秒，%d纳秒\n", cost.Milliseconds(), cost.Nanoseconds())
	}
}

// 定义admin中间件
func AdminMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 判断请求头中是否有Authorization
		Authorization := c.Request.Header.Get("Authorization")
		if Authorization == "" {
			// auth不存在，返回错误
			c.JSON(401, gin.H{
				"code": 401,
				"msg":  "请求头中无Authorization",
			})
			fmt.Println("鉴权不通过")
			// 终止请求，不再调用后续的handler和中间件
			c.Abort()
			return
		}
		// auth存在，TODO 鉴权逻辑
		fmt.Println("鉴权通过")
		c.Set("userId", 1)
		c.Set("Auth", Authorization)
		// 放行
		c.Next()
	}
}

```

## 鉴权

### COOKIE

获取和设置比较简单

```go
r.GET("/index", AdminMiddleWare(), func(c *gin.Context) {
	// 颁发cookie
	c.SetCookie("name", "value", 3600, "/", "localhost", false, true)
	// 获取cookie
	name, err := c.Cookie("name")
	if err != nil {
		fmt.Println("获取cookie失败")
		c.JSON(200, gin.H{
			"code": 200,
		})
	}
	fmt.Println("获取cookie成功", name)

	c.JSON(200, gin.H{
		"code": 200,
	})

})
```

当然，也可以在中间件内完成获取并鉴权之类的东西


