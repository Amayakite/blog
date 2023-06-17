---
title: 1-Gradle
date: 2022-5-5 14:30:19
category: Andorid
tag:
- Java
- Gradle
---

## 概述

嘛，最近是发现越来越多新型项目都是使用的gradle作为包管理工具而不是maven了，所以觉得有必要去学习下它，并且近期SpringBoot也发文说明下一代将使用JDK17为默认版本以及gradle为默认构建脚本

这玩意好处比较多，坏处是学习起来比较费劲（指目前没有几个好的资料）

这东西是谷歌开发的给Android背书的工具，所以对于Java方面市面上的资料并不多

::: tip 背景

2000年第一款管理工具ant诞生，纯java

2004年，maven发布

2012年，gradle goole背书的一款项目管理工具

- 优势：简洁、groovy语法，build速度比maven快
- Spring源码采用gradle管理
- 依赖配置文件比较庞大
- 劣势：每一个版本都较上次有非常大的改动，没有做好向上兼容，例如现在我这最新版本是7，那么如果跑6的项目则会报错
- 学习成本高，需要用到groovy脚本语言

:::

## 安装和配置

首先去他的下载地址<[Gradle | Releases](https://gradle.org/releases/)>

然后选择你能看到的最新的附带源码的包下载即可（Binary-only二进制，complete带有文档，选择下载即可，一般都是二进制即可（））

![image-20220505143500414](/images/Android/01-Gradle/image-20220505143500414.png)



得到压缩包后解压即可，是一个标准的java文件目录

接着创建一个环境变量`GRADLE_HOME`，为刚刚解压的路径，然后在path中（windows）加上`%GRADLE_HOME%\bin`

然后打开shell，输入

```shell
gradle -v
# 如果之前没问题的话，将会输出这些
Welcome to Gradle 7.4.2!

------------------------------------------------------------
Gradle 7.4.2
------------------------------------------------------------

Build time:   2022-03-31 15:25:29 UTC
Revision:     540473b8118064efcc264694cbcaa4b677f61041

Kotlin:       1.5.31
Groovy:       3.0.9
Ant:          Apache Ant(TM) version 1.10.11 compiled on July 10 2021
JVM:          17.0.2 (Eclipse Adoptium 17.0.2+8)
OS:           Windows 10 10.0 amd64
```

## Gradle HelloWorld

在Gradle中有两大对象：`Project`和`Task`

- 一个构建脚本就是一个Project，任何一个Gradle构建都是由一个或者多个Project组成，可以吧一个Project比作一个`POM`模块或者jar包，每一个Project都是一个`groovy`脚本文件
- Task：顾名思义就是任务，它是Gradle中的最小执行单元，类似...java中的方法，go中的func，JavaScript中的function函数，如编译、打包、生成javadoc等，一个Project中会有多个tasks

回到Hello World上，我们先随便创建一个文件夹，然后在里面创建一个`build.gradle`文件，输入如下内容

```groovy
task say{
	println "Hello World"
}
```

然后打开shell，输入

```shell
gradle -q say
# 结果
Hello World
```

同时当前目录下生成了一个文件夹

![image-20220505154733905](/images/Android/01-Gradle/image-20220505154733905.png)

这...是否有点像Python...

其实我们刚刚编写的实际上是一个groovy脚本，所以它能够被执行

`build.gradle`这个文件是官方指定的，就像是maven中的`pom.xml`，nodeJs的`package.json`，golang的`pom.xml`等

刚刚这个task实际上继承自DefaultTask，详细文档可以看

[DefaultTask - Gradle DSL Version 7.4.2](https://docs.gradle.org/current/dsl/org.gradle.api.DefaultTask.html)

它内部有很多函数，这里找两个出来测试下

```groovy
task sayDoLast{
    doLast{
        println "Destory"
    }
    doFirst{
        println "Init"
    }
    println "Running"
}
// 运行结果：
Running
Init
Destory
```

::: tip 额外说明

刚刚有一个`gradle -q taskName`中的 -q没有说明，下面说明下

- -q：输出QUITE级别以及其之上的日志信息
- -i：输出INFO级别以及其之上的日志信息
- -d：输出DEBUG级别以及其之上的日志信息

> 每一个task都是DefaultTask类型，没有例外，就像是Object那样

:::

## Gradle项目文件说明

我们再次随便找一个文件夹，打开shell输入如下内容

```shell
gradle init
```

然后进入了如下流程

```shell
选择应用的类型
Select type of project to generate:
1: basic
2: application 应用程序
3: library 第三方插件
4: Gradle plugin gradle插件
Enter selection (default: basic) [1..4] 2

选择语言
Select implementation language:
1: C++
2: Groovy
3: Java
4: Kotlin
5: Scala
6: Swift
Enter selection (default: Java) [1..6] 3

该应用是否是一个多模块（就像是maven的一个父pom管理很多子pom样，默认fasle）
Split functionality across multiple subprojects?:
1: no - only one application project
2: yes - application and library projects
Enter selection (default: no - only one application project) [1..2] 1

管理脚本，默认Groovy
Select build script DSL:
1: Groovy
2: Kotlin
Enter selection (default: Groovy) [1..2] 1

# 是否使用最新版本的（dev ）api（可能会被删除的）
Generate build using new APIs and behavior (some features may change in the next minor release)? (default: no) [yes, no]                                                                                                                       no

# 测试包版本
Select test framework:
1: JUnit 4
2: TestNG
3: Spock
4: JUnit Jupiter
Enter selection (default: JUnit Jupiter) [1..4] 1

# 项目名称
Project name (default: TestGradle):
# 包名
Source package (default: TestGradle):

> Task :init
Get more help with your project: https://docs.gradle.org/7.4.2/samples/sample_building_java_applications.html

BUILD SUCCESSFUL in 3m 9s
2 actionable tasks: 2 executed
```

完了会得到这一堆东西

![image-20220505162149169](/images/Android/01-Gradle/image-20220505162149169.png)

接着看看SpringBoot的结构

首先去[Spring Initializr](https://start.spring.io/)，选择好对应的内容（LomBok、Web）然后选择Gradle构建，然后下载zip包

![image-20220505160721709](/images/Android/01-Gradle/image-20220505160721709.png)

得到了如下文件

![image-20220505163829544](/images/Android/01-Gradle/image-20220505163829544.png)



文件结构如下

```shell
.
├── build.gradle // 核心文件，类似于pom.xml
├── gradlew
├── gradlew.bat // 这个和上面的是打包和推包之类的时候要用到的脚本,bat是windows下的，另一个是linux下使用的
├── gradle 
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── HELP.md
├── settings.gradle // 包含了一些设置，例如任务和项目之间的依赖关系（相当于项目的简介一样）等，暂时没啥特别的用途
└── src
	......
```

接下来对比下自己的build.gradle和springboot的

自己的：(在app目录下)

```groovy
plugins {
    // Apply the application plugin to add support for building a CLI application in Java.
    id 'application'
}

repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}

dependencies {
    // Use JUnit test framework.
    testImplementation 'junit:junit:4.13.2'

    // This dependency is used by the application.
    implementation 'com.google.guava:guava:30.1.1-jre'
}

application {
    // Define the main class for the application.
    mainClass = 'TestGradle.App'
}

```

SpringBoot的

```groovy
//项目用到的插件,相当于导入了某个包内的所有task
plugins {
    // 例如导入了springboot，则可以通过gradle -q bootRun 来运行，gradle bootJar来打包
	id 'org.springframework.boot' version '2.6.7'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    // java的插件
	id 'java'
}

// 和maven一样
group = 'com.example'
version = '0.0.1-SNAPSHOT'
// 源代码编译的版本
sourceCompatibility = '17'

configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

// 定义仓库
repositories {
// 使用maven的中央仓库
    // 这里也可以选择 jcenter() 谷歌推的给Android的仓库（cdn多） 还有google()
    // 也可以三个一起全部写上
	mavenCentral()
}

// 依赖包管理（项目依赖）
dependencies {
    //implementation：运行时需要的依赖
	implementation 'org.springframework.boot:spring-boot-starter-web'
    // 只编译，不在运行时参合的依赖
	compileOnly 'org.projectlombok:lombok'
    // 额外的注释处理器
	annotationProcessor 'org.projectlombok:lombok'
    //testImplementation测试环境下需要的依赖
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

// 声明单元测试的平台
tasks.named('test') {
	useJUnitPlatform()
}
```

### IDEA使用Gradle

首先，我们打开刚刚download的SpringBoot项目中的`gradle\wrapper\gradle-wrapper.properties`

可以看到有如下内容

```properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
// gradle依赖版本的链接
distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.1-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists

```

如果你把这玩意拖进ieda里面，就会非常惊奇的发现，idea自动给你又下了一遍gradle，内容就是这个zip...这就是gradle坑爹的地方，他初心是说在任何机器上无论有没有转gradle都可以run，这就显得我们自己下载的gradle非常多余了起来

而且注意另外两个文件`gradlew`和`gradlew.bat`

他们的名字中有一个`w`，这表示他们在运行的时候将默认使用`gradle\wrapper`下的对应版本的gradle进行运行，而不是像我们在控制台那样直接调用环境变量的运行

所以说ieda自动给你下的gradle就不要管了，但是可以改动下存储的位置

::: warning 不推荐

![image-20220505170931310](/images/Android/01-Gradle/image-20220505170931310.png)

例如改到其他盘下

PS：还要在设置-新项目设置 内改动下，让全局生效

:::

当然，刚刚在新建项目的时候还是会默认的去下载到刚刚的默认位置，为啥呢？回到配置文件

`gradle\wrapper\gradle-wrapper.properties`

```properties
// gradle的用户路径 找这个环境变量，默认是在当前用户/.gradle下
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.1-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists

```

> 推荐的做法

所以说要解决这个问题的话，我们只需要新建一个环境变量，改成自己想要的地方即可

### 如何导包

其实非常单件，在dependencies内输入即可

例如：

```groovy {2-3}
dependencies {
    implementation 'com.github.javafaker:javafaker:1.0.2'
    implementation 'com.alibaba:fastjson:1.2.80'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

faker和fastjson都是我导入的，直接去maven仓库或者安装一个maven search插件即可

## ✨导包细节

Gradle 依赖的粒度控制相较于 Maven 也更加精细，Maven 只有 `compile`、`provided`、`test`、`runtime·四种 scope，而 Gradle 有以下几种 scope：

- `implementation` ：默认的 scope。implementation 的作用域会让依赖在编译和运行时均包含在内，但是不会暴露在类库使用者的编译时。举例，如果我们的类库包含了 gson，那么其他人使用我们的类库时，编译时不会出现 gson 的依赖。
- `api` :和 implementation 类似，都是编译和运行时都可见的依赖。但是 api 允许我们将自己类库的依赖暴露给我们类库的使用者。
- `compileOnly` 和`runtimeOnly` :这两种顾名思义，一种只在编译时可见，一种只在运行时可见。而`runtimeOnly`和 Maven 的`provided`比较接近。
- `testImplementation` :这种依赖在测试编译时和运行时可见，类似于 Maven 的`test`作用域。
- `testCompileOnly`和`testRuntimeOnly` ：两种类似于`compileOnly`和`runtimeOnly`，但是作用于测试编译时和运行时。

通过简短精悍的依赖配置和多种多样的作用与选择，Gradle 可以为我们提供比 Maven 更加优秀的依赖管理功能。

## ✨配置代理仓库

这里以阿里云为例，在`%GRADLE_USER_HOME%`目录下新建一个`init.gradle`

然后写入如下内容

```groovy
// %GRADLE_USER_HOME%/init.gradle
allprojects {
    repositories {
        // 额外使用阿里云的maven仓库
        maven {
            url "https://maven.aliyun.com/repository/public/"
        }
        maven {
            url "https://maven.aliyun.com/repository/jcenter/"
        }
        maven {
            url "https://maven.aliyun.com/repository/spring/"
        }
        maven {
            url "https://maven.aliyun.com/repository/spring-plugin/"
        }
        maven {
            url "https://maven.aliyun.com/repository/Gradle-plugin/"
        }
        maven {
            url "https://maven.aliyun.com/repository/google/"
        }
        maven {
            url "https://maven.aliyun.com/repository/grails-core/"
        }
        maven {
            url "https://maven.aliyun.com/repository/apache-snapshots/"
        }
        // 以及本地仓库
        mavenLocal()
    }
}
```

然后就可以生效了，对，其他什么操作都不用做

更新依赖时效果：

![image-20220506132417604](/images/Android/01-Gradle/image-20220506132417604.png)

## Groovy语法

因为gradle的build.gradle就是这玩意整的，所以需要学下它

> PS：后续我懒得用ieda，所以用了人家的在线编译器
>
> [groovy在线编译器 (dooccn.com)](http://www.dooccn.com/groovy/)

### 基础语法

和Python有点像

```groovy
println("Hello World")

// 创建变量

def domain = "张三"

// 创建函数
def buildString(String a ,String b){
    println("$a-$b")
    // 模板字符串
    return "$a-$b"
}

// 执行函数，传入变量
def result = buildString("Hello",domain)

println("result:$result")
```

执行结果：

```shell
Hello World
Hello-张三
result:Hello-张三
```

其余运算之类的和java的差不多，这里不展示了

### 字符串的额外说明

有三种引号，单引号、双引号、三引号

单引号没法使用模板字符串($变量名)，双引号可以，三引号可以渲染多行字符串（保留换行缩进之类的），但是不支持使用模板字符串

如果直接使用`$变量名`感觉变扭的话，可以使用js的方式`${变量名}`

### 循环的额外说明

有个闭包玩法

emm在java中不太直观，就拿golang的语法来举例子吧

```go
func zeroAddAndCallBack(num int , f func(n int)){
    for i :=0;i<num;i++{
        f(i)
    }
}
func main(){
    zeroAddAndCallBack(10,func(x int){
        println(x)
    })
}
```

就类似于这样，传入函数即闭包

在groovy中，获取闭包中的值通过it即可，这种语法比较常见

![image-20220505181804228](/images/Android/01-Gradle/image-20220505181804228.png)

### 使用JavaBean

直接用即可

```groovy
class Person{
    def name = "张三"
}

def person = new Person()

println person.name
```

groovy会给类中每个**没有可见性修饰符的属性**，自动生成get/set方法，我们访问这些属性的时候实际上是在调用这些方法

### List和Map

> List
>
> 除了普通的下标索引，还支持负下标索引（-1开始，最后一位）和范围索引

```groovy
def nameList = ["1","3","5","7","9"]
println nameList[0]
println nameList[-1]
println nameList[0..2] // 第一个到第三个
println nameList[-1,0] // 倒数第一个到正数第一个，倒序打印
```

> Map
>
> 可以使用instanceof来判断是不是一个hashMap
>
> 注意，在groovy语法中，key始终都是string

```groovy
def map = [
    Name:"User",
    Age:111
]
println map instanceof HashMap

if (map.containsKey("Name")){
    println map["Name"]
    map["Name"]="aaa"
}
map.each(k,v->println "${k}:${v}")
for (e in map){
    println e.key+e.value
}
```

好，暂时先这样吧，以后有啥不懂得再去看看视频

Mark下[视频地址](https://www.bilibili.com/video/BV1ja411a7fW?p=13&spm_id_from=333.880.my_history.page.click&t=2.2)
