---
title: 03-1-Kotlin协程
date: 2022-6-10 21:12:02
category: Andorid
tag:
- Java
- Kotlin
- Thread
---

## 概述

这玩意学习起来略微有点难度

- Java当中不曾出现过，只有现代编程语言才有的特性
- 协程的概念不太清晰，我们目前看到的大都是不同语言对于协程的实现或者衍生
- 如果你Kotlin基础不扎实，或者多线程基础不太行的话…可能还会更难理解

这里举两个例子吧，在JavaScript和Golang中开启协程的方式：

```javascript
const fun1 = async ()=>{
    await api.post(...)
}
```

and

```go
func main(){
    go myFunction()
}
```

当然还有Python之类的协程，这里就不做演示了

协程实际上就是对多线程的一个进一步封装，就像是Java来对指针和GC进行了封装一样，可以让我们更方便的构建出更好的代码

在Kotlin中，协程基于线程，是一个轻量级的线程（一个线程调度框架）

在后续的Android开发中，协程并不是必须品，你也可以像Java那样使用线程，例如

```kotlin
package com.project


fun main(args: Array<String>) {
    Thread {
        println("Hello World")
    }.start()

}


```

当然，也可以使用线程池来完成这个内容

```kotlin
package com.project

import java.util.concurrent.Executors


fun main() {
    val executor = Executors.newFixedThreadPool(2)
//    创建一个带有返回值的任务
    val future = executor.submit<String> {
        Thread.sleep(1000)
        "Hello"
    }
    println(future.get())
}


```

但是若使用协程的话，可以让thread变得更容易进行管理，同时可以更轻松的使用

## 快速入门

首先需要安装两个依赖

```kotlin
// https://mvnrepository.com/artifact/org.jetbrains.kotlinx/kotlinx-coroutines-core
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.2")
// https://mvnrepository.com/artifact/org.jetbrains.kotlinx/kotlinx-coroutines-core-jvm
runtimeOnly("org.jetbrains.kotlinx:kotlinx-coroutines-core-jvm:1.6.2")
```

PS:如果是之后的Android项目的话，大概率是安装好了的，直接用即可，不需要额外安装其他内容

然后写点代码使用

```kotlin
package com.project

import kotlinx.coroutines.*
import java.util.concurrent.TimeUnit

//注意这个suspend
// suspend的函数可以挂起，挂起的函数可以被挂起的函数调用，挂起的函数可以被协程调用
suspend fun main() {
//    GlobalScope:是一个协程作用域，它可以被用来启动一个协程。
//    它也是一个顶级协程，它的作用域是整个程序。
//    然后调用launch()方法来启动一个协程。
//    这个方法返回一个Job对象，它可以用来取消协程。

//    这里的launch(Dispatchers.Main) 中 Dispatchers.Default 指的是在哪个线程中启动的协程
//    Default根据平台不同而定，在Android中是主线程，在JVM中是主线程，在JS中是主线程。（反正都是主线程就是了，不知道写啥就写Default）
    val launch = GlobalScope.launch(Dispatchers.Default) {

//        切换上下文到其他线程，这里是切换到IO线程中执行异步任务
        val withContext = withContext(Dispatchers.IO) {
            println(Thread.currentThread().name)
            TimeUnit.SECONDS.sleep(1)
//            这个值会被作为协程的返回值
            MyTestObj().getUser()
        }
        println(withContext)
    }

//    挂起当前线程（主线程），等待launch协程执行完毕，和线程池的join一样
    launch.join()
}

class MyTestObj {
    fun getUser(): String {
        TimeUnit.SECONDS.sleep(3)
        return "User"
    }
}


```

其实这样看起来有点怪哈，但如果你用过Java中的`CompletableFuture`，例如这样的代码

```java
CompletableFuture<ProductEntity> productEntityCompletableFuture = CompletableFuture.supplyAsync(() -> {
	// 这里经过一系列操作获取到了product
    return product;
}, executor);


CompletableFuture<Void> saveStore = productEntityCompletableFuture.thenAcceptAsync(product -> {

}, executor);
CompletableFuture<Void> saveBanner = productEntityCompletableFuture.thenAcceptAsync(product -> {

}, executor);
CompletableFuture<Void> saveDetail = productEntityCompletableFuture.thenAcceptAsync(product -> {

}, executor);
CompletableFuture<Void> saveTags = productEntityCompletableFuture.thenAcceptAsync(product -> {

}, executor);
CompletableFuture<Void> saveStandard = productEntityCompletableFuture.thenAcceptAsync(product -> {

}, executor);
try {
    CompletableFuture.allOf(productEntityCompletableFuture, saveStore, saveBanner, saveDetail, saveTags, saveStandard).get();
} catch (InterruptedException | ExecutionException e) {
    throw new RuntimeException(e);
}
```

这还只是一个callback，如果说上面的saveDetail要在saveStore之后执行…或者有更多的callback，那就成了地狱callback，可读性极差，协程在任何时候主要目的之一都是来解决地狱callback问题的

## 协程的挂起和恢复-概念

常规的函数基础操作包括invoke(或者call)和return，协程新增了suspend和resume

- suspend：让协程挂起或者暂停，用于执行当前协程，并保存所有的局部变量—如果说你学习过JavaScript或者C#，Python之类的，可以把这个当成是`async` 
- resume：用于让已暂停的协程从暂停处继续运行

```kotlin
package com.project

import kotlinx.coroutines.*
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.concurrent.TimeUnit

class MyApplication {
    /**
     * 无论是啥情况下，把suspend当成async来用就可以了（声明当前函数是一个异步任务）
     */
    suspend fun getUser() {
//        在suspend函数中调用带有suspend修饰的函数，就可以挂起（相当于等待该函数完毕 和其他语言的await一样）
//        也就是说 不需要额外的await语句，只需要在suspend函数中调用suspend函数就可以实现同步调用了
        val user = get()
        show(user)
    }

    private fun show(user: User) {
        println("${user.name} ${user.age}")
    }

    suspend fun get() = withContext(Dispatchers.IO) {
        delay(1000)
        User("张三", 18, LocalDateTime.now(), BigDecimal("100"))
    }
}

suspend fun main(args: Array<String>) {
    GlobalScope.launch(Dispatchers.Default) {
        MyApplication().getUser()
    }.join()

}

```

## 阻塞和挂起

例如某天你想去按个摩，点了98号技师，但是他正在忙，你要等待他忙完，这就是阻塞

![image-20220612115419560](/images/Java/Android/03-1-Kotlin协程/image-20220612115419560.png)

如果你某天想去按个摩，点了98号技师，但是它正在忙，你此时又有别的事情要做，就让前台给你记下你预约了98号，让98号之后来服务你，在这过程中你做你自己的事情，这就是挂起

![image-20220612115842357](/images/Java/Android/03-1-Kotlin协程/image-20220612115842357.png)

在Kotlin中，使用suspend关键字修饰的函数叫做挂起函数，**挂起函数只能在协程体内或者其他挂起函数内调用**

```kotlin
package com.project

import kotlinx.coroutines.*

suspend fun main(args: Array<String>) {
    GlobalScope.launch(Dispatchers.Default) {
        val result = async {
//            挂起 就相当于新开了一个线程来run这些内容 不会影响主线程
            delay(1000)
            "Hello"
        }
        println(result.await())
    }
//    阻塞 直接阻塞主线程
    // PS  可以把下面这行阻塞删掉并且上面的代码不加join看看是什么效果（协程将会随着Context线程的结束而结束
    Thread.sleep(2000)

}

```

### 扩展-使用原生API来完成协程

实际上我们刚刚使用的是封装过的API（相当于Netty一样），这里演示下使用原生的Api，实际工作中用不上， 看看就好

```kotlin
package com.project

import kotlin.coroutines.*

fun main(args: Array<String>) {
    
    val continuation = suspend {
        // 声明协程的主内容和返回值（就相当于一个runnable一样
        5
    }.createCoroutine(object : Continuation<Int> {
        // 设置上下文对象
        override val context: CoroutineContext = EmptyCoroutineContext

        // 这就是回调函数callback
        override fun resumeWith(result: Result<Int>) {
            println("=== ${result.getOrNull()?.toString()} ===")
        }
    })
    // 启动一个协程
    continuation.resume(Unit)
}
```

结果

```text
=== 5 ===
```

## 协程的调度器（上下文）

所有的协程必须在**调度器中运行**，即使在主线程上也是如此

![image-20220612124402104](/images/Java/Android/03-1-Kotlin协程/image-20220612124402104.png)

注意，Main只能在Android中使用，通常在开发web server例如SpringBoot的时候都是用Dispatchers.Default，当然如果你没有指定的话，默认也就是Dispatchers.Default

## 结构化并发

![image-20220612164411894](/images/Java/Android/03-1-Kotlin协程/image-20220612164411894.png)

![image-20220612164425988](/images/Java/Android/03-1-Kotlin协程/image-20220612164425988.png)



