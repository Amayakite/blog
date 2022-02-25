---
title: 01-初识GoLang
date: 2022-2-25 21:41:33
category: GoLang
tag:
 - GoLang
---

## 概述

长篇大论这里就不多说明了，总之 ，这是一门高并发非常牛逼的语言

### 安装和配置 

Windows直接在官网下载安装最新版本即可<https://go.dev/>

直接无脑Next

Linux的话，这里以Ubuntu为例：

```shell
sudo apt install golang
```

如果你想要源码安装的话

```shell
#1.下载二进制源码包并将将下载的源码包解压至 /usr/local目录
wget https://dl.google.com/go/go1.16.6.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.16.6.linux-amd64.tar.gz

#2.将 /usr/local/go/bin 目录添加至PATH环境变量
#在/root/.profile进行添加
export GOROOT=/usr/local/go  # 安装目录
#GOROOT 第三方包的安装包路径
export GOPATH=/home/go/      # 项目路径一般指向src
#需要BIN目录和GOPATH
export PATH=$PATH:$GOROOT/bin

#3.验证是否安装成功, 可以打开终端窗口输入go version命令，查看安装的Go版本。
go env
go version go version go1.16.6 linux/amd64

#4.go语言程序编译运行
package main
import "fmt"
func main() {
   fmt.Println("Hello, World!")
}

#5.编译运行hello.go
go build hello.go
go run hello.go && ./hello
```

### GOPATH的配置

这个东西就相当于是配置maven的打包之类的路径一样，有个默认值

Windows: 在`%USERPROFILE%/go`中

Linux: `$HOME/go`

这个自己看着修改即可，Windows直接修改环境变量，加一个`GOPATH`即可

例如：`C:\goPath`，然后要在这个文件夹下分别新建三个目录

-  `bin` 用来存放编译后生成的可执行文件
-  `pkg` 用来存放编译后生成的归档文件
-  `src` 用来存放源码文件

然后再到**PATH**环境变量中，把刚刚的`GOPATH`中的bin丢进去，也就是：`%GOPATH%/bin`

PS：这个GOPATH电脑上有默认值的，一般直接修改默认值即可

至于Linux嘛，这里以Ubuntu为例：

```bash
vi ~/.profile
```

在文件末尾添加如下内容即可

```profile
export GOROOT="/usr/lib/go-1.8" // 引号内设置为你自己的go安装目录 如果是 apt安装的可以通过whereis golang来查看安装目录
export GOBIN=$GOROOT/bin
export GOPATH="/home/test/gopath" // 引号内设置为自己的go项目的工作区间
export PATH=$PATH:$GOPATH/bin // 原路径后用冒号连接新路径`
```

这里我的ubuntu流程为

```shell
# 环境变量
sudo vim /etc/profile.d/golang-env.sh
export GOROOT=/home/weiyigeek/app/program/go
export GOPATH=/home/weiyigeek/app/program/project/go
export PATH=${PATH}:${GOROOT}/bin

# 创建 bin,pkg,src
sudo mkdir -vp ${GOPATH}/{bin,pkg,src}

# 重开Shell验证版本
sudo  source /etc/profile
go version
  # go version go1.16.6 linux/amd64
```

### 关于go的项目路径

根据上面的gopath可以知道，我们的项目一般都是直接源码丢在gopath的src内

那么如何命名呢？

因为跟java不同 使用golang的可能是学生，所以一般命名方法是使用github名称来

例如我的话想要个blog项目和一个shop项目，则应该是

```bash
github.com/amayakite/blog
github.com/amayakite/shop
```

这样一个文件格式，总之和java也差不多

或者用我自己的域名

```bash
example.org/amayakite/blog
example.org/amayakite/shop
```

### 关于编辑器

看个人喜欢，微软的[VsCode](https://code.visualstudio.com/)或者Jetbrains的[GoLang](https://www.jetbrains.com/go)都可

PS：其实IEDA也可以写go

如果你选择了Vscode，只需要安装一个go插件就可以很舒服的使用了


## Hello World

这里我创建的工程路径为`C:\go\src\github.com\amayakite\study`

其中`C:\go`是GOPATH的工程路径

然后其中加一个文件，文件名随意，之后写入如下代码

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello World")
}
```

特别**注意** 这个package是 main 而不是其他的 否则将无法正确的运行

接下来你只需要在终端中输入`go build`或者点下运行按钮之类的即可看到控制台有内容输出


如果说你输入的是 go build 则还可以 看到同级目录下生成了一个*exe*可执行文件（Windows下的话，Linux同理）

当然 go build也可以这样用：`go build github.com/amayakite/study`

然后就能在`github.com\amayakite`目录下看到打包好的可执行文件

### 如何跨平台编译

默认我们go build的可执行文件都是当前操作系统可执行的文件，如果我想在windows下编译一个linux下可执行文件，那需要怎么做呢？

只需要指定目标操作系统的平台和处理器架构即可，例如Windows平台cmd下按如下方式指定环境变量编译出的可以执行文件则可以在Linux 操作系统 amd64 处理器中执行,然后再执行go build命令，得到的就是能够在Linux平台运行的可执行文件了。

PS 下面这里我也没搞成功，以后有机会去查查文档即可

Windows编译方式如下：

```bash
SET CGO_ENABLED=0  # 禁用CGO
SET GOOS=linux     # 目标平台是linux
SET GOARCH=amd64   # 目标处理器架构是amd64
go build # 打包
```

注意：如果你使用的是PowerShell终端，那么设置环境变量的语法为 `$ENV:CGO_ENABLED=0`

Linux和Mac下多平台的方式如下：

```bash
# 目标平台是linux
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build
# 目标平台Windows
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build
# 目标平台Mac
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build
```

### go-run

```bash
# 语法：go run xxx.go
go run main.go
```
就像是运行Python那样

### go-install

`go install fileName`

1. 先编译得到一个可执行文件
2. 将这个文件复制到GOPATH下的`bin`文件夹下


## 基础知识

带过一下，main包的话就相当于是Java中的`public static void  main(Stirng args[])`那样

通过`package main`标注的文件，其中的main方法将会自动作为程序的主方法

### 声明变量

注意 在go语言中，所有变量声明了 就必须使用，否则编译不给过

当然 可以先声明，然后在方法中赋值 都是可以的

```go
package main

import (
	"fmt"
	"strconv"
)

var name string = "张三"
var age int = 10
var isOk bool = true

func main() {
	fmt.Println("Hello World")

	fmt.Println("name:" + name)
	//数值转换Str
	fmt.Println("age:" + strconv.Itoa(age))
	fmt.Println(isOk)
}
```

### 模板字符串输出

使用`Printf`即可，然后`%s`表示要格式化成一个字符串

```go
package main

import ("fmt")

var name string = "张三"

func main() {
	fmt.Printf("name:%s\n", name)
}
```

### 匿名变量

先看代码

```go
package main

import "fmt"

func main() {
	var s, _ = foo()
	fmt.Println(s)
}
func foo() (string, int) {
	return "Amaya-kite", 10
}
```

> 当调用一个会返回多个返回值的函数时，如果不想要其中的某些返回值，可以使用`_`来接收，这样就不会报错，并且其余的可以正常使用（额外说下，这多个返回值看着还是蛮舒服的）

PS：匿名变量不占用命名空间，不会分配内存，所以匿名变量之间不存在重复声明

注意：

1. 函数外的每个语句都必须以关键字开始（var、const、func等）
2. `_`多用于占位，表示忽略该值


### 常量

就像是用JavaScript那样，或者Java中的`Final`那样，这玩意需要在声明的时候赋值：

语法很简单，就一个：`const xx  string = xx`

### 同时声明多个变量或者常量

```go
package main
var (
	name =  "张三"
	age = 10
	sex = true
)

const (
	city  = "ShangHai"
)
```

### 如果想省略var


注意 只能在方法内这样用

```go
package main

import "fmt"

func main() {
	f1 := 1.23456
	fmt.Println(f1)

}

```


### IOTA(自增)

应用场景应该是一些枚举之类的自增吧,当然这里面也可以使用`_`来略过某一个数值

```go
package main

import "fmt"

const (
	a1 = iota
	a2
	a3
)

func main() {
	fmt.Printf("a1:%d\n", a1)
	fmt.Printf("a2:%d\n", a2)
	fmt.Printf("a3:%d\n", a3)
}
```

结果：

```text
    a1:0
    a2:1
    a3:2
```

当然也可以插队

```go
package main

import "fmt"

const (
	a1 = iota
	a2 = 100
	a3 = iota
	a4
)

func main() {
	fmt.Printf("a1:%d\n", a1)
	fmt.Printf("a2:%d\n", a2)
	fmt.Printf("a3:%d\n", a3)
	fmt.Printf("a4:%d\n", a4)
}
```

运行结果：

```text
a1:0
a2:100
a3:2  
a4:3  
```

进阶用法：例如存储KB

（这里的<<表示左移操作，1<<10表示将1的二进制表示向左移10位，也就是由1变成了10000000000，也就是十进制的1024。同理2<<2表示将2的二进制表示向左移2位，也就是由10变成了1000，也就是十进制的8。） 

```go
package main

import "fmt"

const (
	_  = iota
	KB = 1 << (10 * iota)
	MB = 1 << (10 * iota)
	GB = 1 << (10 * iota)
	TB = 1 << (10 * iota)
	PB = 1 << (10 * iota)
)

func main() {
	fmt.Printf("KB:%d\n", KB)
	fmt.Printf("MB:%d\n", MB)
	fmt.Printf("GB:%d\n", GB)
	fmt.Printf("TB:%d\n", TB)
	fmt.Printf("PB:%d\n", PB)
}
```

结果：

```text
KB:1024
MB:1048576         
GB:1073741824      
TB:1099511627776   
PB:1125899906842624
```

### 关于整数的进制


```go
package main

import "fmt"

func main() {
	//十进制
	var i1 = 101
	fmt.Printf("%d\n", i1)
	//	八进制
	var i2 = 077
	fmt.Printf("%d\n", i2)
	//	十六进制
	var i3 = 0x123456789
	fmt.Printf("%d\n", i3)
}
```

转换的话，例如转换成int8，则需要`int8(132113)`

### 关于浮点数

默认类型是`float64`类型的

声明：

```go
package main

import "fmt"

func main() {
	f1 := 1.23456
	fmt.Println(f1)

}
```

如果要定义float32，则这样`f1 = float32(111.111)`

### 关于Boolean

> 如果不赋值的话 默认是false

```go
package main

import "fmt"

func main() {
	myBool := true
	fmt.Printf("%t\n", myBool)
}

```


### 关于字符串的转义符

- `\r`回车符（跳转到下一行行首）
- `\n`换行符（直接跳转到下一行同列位置）
- `\t`制表符
- `\'`单引号
- `\"`双引号
- `\\`反斜杠

和Java之类的是一样的

### 字符串的修改

直接修改的话 是这种画风

```go
package main

import "fmt"

func main() {
	str1 := "兔子"
	//转换成char数组 这里也叫rune
	str2 := []rune(str1)
	//指定位置的替换
	str2[0] = '猴'
	//然后再转换成字符串
	fmt.Println(string(str2))
}
```

当然 可以通过这种方式来获取字符串的长度

```go
package main

import "fmt"

func main() {
	fmt.Printf("字符串的长度为：%d\n", strCount("Hello World"))
}

func strCount(str string) int {
	return len([]rune(str))
}

```

### 关于if判断

基本语法和其他的语言没啥区别

```go
func main() {

	age := 18
	name := "张三"

	if age >= 18 && name == "李四" {
		fmt.Println("Say Hello ")
	}

}
```

但是在go中，可以声明只在if语句内起作用的变量

```go
func main() {

	if age := 19; age > 18 {
		fmt.Println("年龄大于18")
	}
}
```

这个age的作用域为这个if的语句内（包括后续的else 之类 的）

```go
package main

import "fmt"

func main() {

	if age := strCount("adsadsadsadsada"); age > 18 {
		fmt.Println("长度大于18")
	} else if age < 18 {
		fmt.Println("长度小于18")
	} else {
		fmt.Println(age)
	}
}

func strCount(str string) int {
	return len([]rune(str))
}
```

### 关于for循环

基本的使用和其他语言没啥区别

```go
func main() {

	for i := 0; i < 10; i++ {
		print("Hello ")
	}

}
```

增强for的话，语法是这样的

```go
func main() {

	str := "Hello World"
	for i := range str {
		println(i)
	}
}
```

注意 这相当于是一个语法糖，获取到的i本质还是一个0开始的数值

如果想要通过其来获取str的内容的话 可以这样

```go
func main() {

	str := "Hello World"

	strArray := []rune(str)

	for i := range str {
		println(string(strArray[i]))
	}
}
```

如果想要无限循环的话：

```go
for{
    循环体语句
}
```

### 关于switch

使用起来和其他语言没有区别（不过不用写break）