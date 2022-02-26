---
title: 01-初识GoLang
date: 2022-2-25 21:41:33
category: GoLang
tag:
 - GoLang
---

## 概述

长篇大论这里就不多说明了，总之 ，这是一门高并发非常牛逼的语言

额外说一嘴，这并不是一门高级语言，而是一门偏向底层的语言

性能优异的同时，带来的损失为：少了高级语言例如Java中一些灵活的特性，如泛型等

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

```go
package main

func main() {
	n := 5
	switch n {
	case 1:
		println("one")
	case 2:
		println("two")
	case 3:
		println("three")
	case 4:
		println("four")
	default:
		println("unknown")
	}
}
```

当然，在Switch中可以跟很多值，例如`case 1,3,5,7,9`，这里就不演示了

也可以跟判断，例如

```go
func main() {
	n := 5
	switch {
	case n > 30:
		println("n is greater than 30")
	case n > 20:
		println("n is greater than 20")
	case n > 10:
		println("n is greater than 10")
	default:
		println("n is less than 10")
	}
}
```

### GOTO  跳到指定的位置

我们都知道`break`是调出循环，然后`continue`是进入下一轮循环

如果想在go语言的循环的循环中调出所有循环，就可以使用GOTO

```go
package main

func main() {

	for i := 0; i < 1000; i++ {

		for j := 0; j < 1000; j++ {
			if i*j == 1000 {
				println(i * j)
				goto end
			}
		}
		println(i)
	}
end: // 这里是label标签 嘛反正通常是跟goto一起使用的
	println("end")
}
```

### GoLang中的字符串对比

这个放心，直接`==`对比就行了，是直接对比值的，和Java不一样的


## 数组

### 基本使用


```go
package main

import (
	"strings"
)

func main() {
	// 声明，不指定值 注意 如果声明的是int类型，那么默认值为0
	// 如果声明的是string类型，那么默认值为空字符串
	// 如果声明的是bool类型，那么默认值为false
	var arr [5]string
	arr[1] = "hello"
	println(strings.Join(arr[:], "_"))

	// 声明，指定值
	arr2 := [5]string{"a", "b", "c", "d", "e"}
	println(strings.Join(arr2[:], "_"))

	// 声明，根据初始化值自动确定长度
	arr3 := [...]string{"a", "b", "c", "d", "e"}
	println(strings.Join(arr3[:], "_"))
	println("数组长度：", len(arr3))

	// 声明，根据索引来初始化指定位置的值
	arr4 := [5]string{1: "a", 4: "d"}
	println(strings.Join(arr4[:], "_"))

	// 数组的遍历

	// 先创建一个数组，长度为10 string
	arr5 := [10]string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j"}

	// 使用普通for循环遍历
	for i := 0; i < len(arr5); i++ {
		println(arr5[i])
	}

	// 使用range遍历 i就是索引，v就是值
	for i, v := range arr5 {
		println(i, v)
	}

	// 创建一个二维数组
	arr6 := [2][3]int{{1, 2, 3}, {4, 5, 6}}
	for _, v := range arr6 {
		for _, v2 := range v {
			println(v2)
		}
	}
}


```

### 切片

emm就是不给定初始长度的数组

注意 如果说通过赋值的方式传递值

例如说通过拷贝数组的方式，则是指针传递，也就是传过去后，修改原来数组的指定位置的值，对应的，切片内的值也会被修改

它自己本身没有任何值，全都是引用其他地方的

那个append之后会说明

```go
package main

import "fmt"

func main() {

	var arrt []int

	// 添加方式1 支持扩容的
	arrt = append(arrt, 1)
	arrt = append(arrt, 2)
	arrt = append(arrt, 3)
	arrt = append(arrt, 4)
	fmt.Println(arrt)

	// 添加方式2
	var arrt2 []int
	arr := []int{1, 2, 3, 4}
	arrt2 = append(arrt2, arr...)
	fmt.Println(arrt2)

	// 添加方式3
	var attr3 []int
	// 包左不包右
	attr3 = arr[0:2]
	// 注意 这里都是指针传递
	arr[0] = 100
	fmt.Println(attr3)

}
```

### 切片的本质

```go
package main

import "fmt"

func main() {

	// 创建一个切片，类型是int，长度是5，容量是10
	// 长度就相当于初始的数组的长度
	// 容量就相当于最大的数量
	s1 := make([]int, 5, 10)
	fmt.Printf("s1=%v, len(s1)=%d, cap(s1)=%d\n", s1, len(s1), cap(s1))
	// s1=[0 0 0 0 0], len(s1)=5, cap(s1)=10
	// 添加11个元素
	for i := 0; i < 11; i++ {
		// append：给指定的切片添加一个元素
		s1 = append(s1, i)
	}
	fmt.Printf("s1=%v, len(s1)=%d, cap(s1)=%d\n", s1, len(s1), cap(s1))
	// s1=[0 0 0 0 0 0 1 2 3 4 5 6 7 8 9 10], len(s1)=16, cap(s1)=20
}
```

嘛，这东西，越用越像Java的ArrayList，可以看到，内容是动态添加的....，并且还会*2的扩容

貌似是Java中LinkedList的扩容机制

就是一个框，框柱了一块连续的内存

所以，要判断一个切片是否绑定了数组，需要`arr==nil`,要判断一个切片是否为空，则需要用`len(arr)==0`

> PS:`nil`值切片的长度和容量都是0

两个切片之间是不能通过`==`来判断是否相等的

```go
package main

func main() {

	var s0 []int

	// true
	println(s0 == nil)

	s1 := make([]int, 0, 0)
	// false
	println(s1 == nil)

}
```

### 切片的append和copy

就是给切片尾部追加一个元素，达到上限的时候会触发动态扩容机制

> PS 动态扩容机制：开始*2，如果老的容量大于等于1024时，则是1/4的增长 也就是 a + (0.25xa)

使用的时候必须调用原来的切片接收返回值(相当于返回一个对象，就跟Java中ArrayList的底层扩容机制似的，一个数组的长度是不可变的，要想增加只能创建一个新数组并替换老的数组)

```go
package main

import "fmt"

func main() {

	s1 := []string{"a", "b", "c"}

	s1 = append(s1, "d")

	fmt.Println(s1)
}

```

当然，Append还可以删除指定的元素，这里就不多做说明了（用到了再去百度）

至于Copy嘛，就非常简单了，就是将一个老的切片的内容复制给一个新的切片

```go
package main

import "fmt"

func main() {

	arr1 := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	arr2 := make([]int, 5, 5)
	// 第一个参数：接收方
	// 第二个参数：源
	copy(arr2, arr1)
	fmt.Println(arr2)

}

```

注意 上面的运行结果为：`[1 2 3 4 5]`，也就是说，接收方没法接收大于自己长度的切片 超过自己长度的将会被省略

## 指针

在Go语言中，这玩意被封装的还是比较简单的

Go语言中不存在指针的操作，只需要记住两个符号即可

1. `&`获取指针的地址
2. `*`根据地址取值

对 没错 就这两个，接下来测试下

```go
package main

import "fmt"

func main() {
	n := 18
	// 打印内存地址
	fmt.Println(&n)

	p := &n
	// 类型是一个指针类型*int
	fmt.Printf("类型为%T\n", p)

	// 打印指针的值(根据地址取值)
	fmt.Printf("指针的值为%d\n", *p)

}

```

### 创建指针和指针值的修改

非常简单

```go
package main

func main() {

	var a *int = new(int)
	*a = 10
	// 分别打印地址和值
	println("地址:", a)
	println("值:", *a)
}

```

反正只要记住两点，&是操纵地址，*是操纵(获取)实际的值


### 关于make方法

`make`也是用于内存分配的，区别于`new`，它只适用于`slice`、`map`、`channel`的内存创建，而且它的返回值类型就是这三个类型的本身，因为这三种类型本身就是引用类型，所以就没有必要返回他们的指针了，make函数的函数签名如下

```go
func make(t Type,size ...IntegerType) Type
```

make函数是无可替代的，在我们使用slice、map以及channel的时候，都需要使用make进行初始化，然后才可以进行对他们的操作，关于`channel`会在后面说明

总结就是如下几点：

1. make和new都是用来申请内存的
2. new很少用，一般都是来给基本的数据类型申请内存，例如string/int等
3. make是用来给`slice`、`map`、`channel`申请内存的，make函数返回对应的这三个类型本身

## Map

emm这东西就相当于Java的HashMap或者说JavaScript的Object,用法层面更像是JavaScript

底层实现是hash，也就是无序的key-value结构，并且key是不重复的

在go语言中使用它的时候，必须得先定义才能使用，定义的语法如下

```go
map[keyType]valueType
```

- `keyType`:键的类型
- `valueType`:值的类型


```go
package main

import (
	"fmt"
)

func main() {

	var myMap map[string]string

	// 在使用之前必须使用make来创建 这里和上面的可以合并成一句话
	// 上面只是声明，并没有初始化，就像是Java中 public HashMap map;一样
	myMap = make(map[string]string)

	// 赋值 固定方法
	myMap["key1"] = "value1"
	myMap["key2"] = "value2"
	fmt.Printf("myMap: %v\n", myMap)

	// 取指定值
	fmt.Printf("myMap[key1]: %v\n", myMap["key1"])

	// 改变值
	myMap["key1"] = "value1-new"
	fmt.Printf("myMap[key1]: %v\n", myMap["key1"])

	// 删除指定值 如果删除一个不存在的啥也不会发生
	delete(myMap, "key1")
	fmt.Printf("myMap: %v\n", myMap)

	// 判断是否存在指定值
	value, ok := myMap["key1"]
	if ok {
		fmt.Printf("myMap[key1]: %v\n", value)
	} else {
		fmt.Printf("myMap[key1] is not exist\n")
	}

	// 打印map的长度
	fmt.Printf("myMap length: %v\n", len(myMap))

	// 添加一些内容，并遍历打印
	myMap["key3"] = "value3"
	myMap["key4"] = "value4"
	for key, value := range myMap {
		fmt.Printf("key: %v, value: %v\n", key, value)
	}

}
```

## 函数

和其他语言不同的是，如果有返回值的情况下

可以给返回值指定名字

```go
package main

func main() {

	var (
		a int = 1
		b int = 2
	)

	println(add(1, 2))
	println(add2(1, 2))
	println(add3(&a, &b))

}

// 命名返回值，return的时候可以省略后面的内容（前提是返回值的内容要赋值过）
func add(x int, y int) (ret int) {
	ret = x + y
	return
}

// 下面这等价于上面
func add2(x int, y int) int {
	return x + y
}

// 也也可以用指针的方式
func add3(x *int, y *int) int {
	return *x + *y
}

```