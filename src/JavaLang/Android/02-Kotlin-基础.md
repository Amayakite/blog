---
title: 2-Kotlin-基础
date: 2022-5-5 21:29:18
category: Andorid
tag:
- Java
- Kotlin
---

## 概述

这个是基于JVM的语言，IDEA对其支持度非常好（亲儿子），在Java的基础上多了非常多的新特性，同理，上手起来比golang之类的语言更难...

在Android和近几年的新项目上，用Kotlin的比Java的多得多，由于其语法简单的特性（其实一堆注解之类的玩起来也不简单了），深受Android开发的喜爱（雾？），同时也是Google的亲儿子一样

Kotlin语法简洁，具备现代高级语言的特性，并且能和Java一流代码无缝操作，因为具备这些优势，至今为止越来越多的公司使用它来进行开发（无论是后端还是Android）

甚至**可以编译成二进制源码**

![image-20220505214535520](/images/Java/Android/02-Kotlin-基础/image-20220505214535520.png)

![image-20220505214612985](/images/Java/Android/02-Kotlin-基础/image-20220505214612985.png)

![image-20220505214638151](/images/Java/Android/02-Kotlin-基础/image-20220505214638151.png)



## 快速上手

### 基本使用

我们先创建一个Kotlin项目（IEDA 2022.1），这里使用了gradle来管理依赖

![image-20220505215010060](/images/Java/Android/02-Kotlin-基础/image-20220505215010060.png)

然后发现build.gradle后面多了个kts，并且语法也变了...

![image-20220505215534390](/images/Java/Android/02-Kotlin-基础/image-20220505215534390.png)

等到他加载完毕后，顺利的吃了我1G的硬盘

添加依赖去maven仓库看看即可，有一套专属语法

```kotlin
dependencies {
    testImplementation(kotlin("test"))
    // https://mvnrepository.com/artifact/com.alibaba/fastjson
    // 这样即可
    implementation("com.alibaba:fastjson:1.2.80")
}
```

接着我们新建一个Kotlin文件

![image-20220505220959295](/images/Java/Android/02-Kotlin-基础/image-20220505220959295.png)

注意，是文件，不是类

然后开始Hello World 吧

```kotlin
fun main() {
    println("Hello, Kotlin!")

}
```

### 变量、常量和内置数据类型

emm和原生Java差不多，定义变量的方式

```kotlin
fun main() {
    var a = "Hello World"
    a = a.replace("World", "Kotlin")
    println(a)
}
```

如果想要定义一个**只读变量**（并不是绝对不能修改的，之后会说到），则可以用val(L，L，L，别看错了)

> PS：这模板字符串不能说是和groovy非常相像了，只能说是一模一样

```kotlin
fun main() {
    val MyName = System.getProperty("user.name")
    println("Hello, $MyName")
}
```

如果是**常量**（编译时常量），则按照下方方式定义，注意，编译时常量只能是**Java的基本类型**

```kotlin
// 一定是 const val 才是编译时常量
const val USERNAME: String = "Amayakite"

fun main() {
    // 如果试图在方法内定义，则编译器会报错
    println("Hello, $USERNAME")
}
```

然后有一个自动类型推断，Over

至于内置数据类型，有这些

![image-20220505221735552](/images/Java/Android/02-Kotlin-基础/image-20220505221735552.png)

### 如何查看Kotlin的字节码文件

![image-20220505222521997](/images/Java/Android/02-Kotlin-基础/image-20220505222521997.png)

得到了如下内容

```java
import kotlin.Metadata;
import org.jetbrains.annotations.NotNull;

@Metadata(
   mv = {1, 6, 0},
   k = 2,
   d1 = {"\u0000\u000e\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0010\u0002\n\u0000\u001a\u0006\u0010\u0002\u001a\u00020\u0003\"\u000e\u0010\u0000\u001a\u00020\u0001X\u0086T¢\u0006\u0002\n\u0000¨\u0006\u0004"},
   d2 = {"USERNAME", "", "main", "", "KotlinStudy"}
)
public final class HelloKotlinKt {
   @NotNull
   public static final String USERNAME = "Amayakite";

   public static final void main() {
      String var0 = "Hello, Amayakite";
      System.out.println(var0);
   }

   // $FF: synthetic method
   public static void main(String[] var0) {
      main();
   }
}

```

再加点料看看效果

```kotlin
const val USERNAME: String = "Amayakite"

fun main() {
    println("Hello, $USERNAME")
    val Age = 18
    println("I am $Age years old")
    
}
```

结果。。。可以发现int是一个基本数据类型...

```java
import kotlin.Metadata;
import org.jetbrains.annotations.NotNull;

@Metadata(
   mv = {1, 6, 0},
   k = 2,
   d1 = {"\u0000\u000e\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0010\u0002\n\u0000\u001a\u0006\u0010\u0002\u001a\u00020\u0003\"\u000e\u0010\u0000\u001a\u00020\u0001X\u0086T¢\u0006\u0002\n\u0000¨\u0006\u0004"},
   d2 = {"USERNAME", "", "main", "", "KotlinStudy"}
)
public final class HelloKotlinKt {
   @NotNull
   public static final String USERNAME = "Amayakite";

   public static final void main() {
      String var0 = "Hello, Amayakite";
      System.out.println(var0);
      int Age = 18;
      String var1 = "I am " + Age + " years old";
      System.out.println(var1);
   }

   // $FF: synthetic method
   public static void main(String[] var0) {
      main();
   }
}

```

或者按两下shift，输入 show kotlin byte即可

![image-20220505222915659](/images/Java/Android/02-Kotlin-基础/image-20220505222915659.png)

### 条件语句

if语句和Java是一模一样的

```kotlin
fun main() {
    var myAge = 20
    var div = myAge.div(2)
    if (div > 0) {
        println("div is positive,$div")
    } else {
        println("div is negative,$div")
    }
}
```

然后是in：可以判断一个值是否在某个区段之间

```kotlin
fun main() {
    var myAge = 20
    var div = myAge.div(2)
    // 判断这个div是否处于1~10之间
    if (div in 1..10) {
        println("div is in 1..10")
    } else {
        println("div is not in 1..10，div = $div")
    }
}
```

反编译后是....

```java
public static final void main() {
    int myAge = 20;
    int div = myAge / 2;
    String var2;
    // 草，有点牛逼
    if (1 <= div) {
        if (10 >= div) {
            var2 = "div is in 1..10";
            System.out.println(var2);
            return;
        }
    }

    var2 = "div is not in 1..10，div = " + div;
    System.out.println(var2);
}
```

然后是when表达式，这个东西允许有返回值（增强版的switch）

```kotlin
const val USERNAME: String = "Amayakite"

fun main() {
    var newNumber = 20.div(3)
    var result = when (newNumber) {
        10 -> "Success"
        in 1..9 -> "Failure"
        else -> "Unknown"
    }
    println(result)
}
```

反编译后是这样的

```java

public static final void main() {
    int newNumber = 20 / 3;
    String var10000;
    if (newNumber == 10) {
        var10000 = "Success";
    } else {
        // 用label 太草了hhh
        label15: {
            if (1 <= newNumber) {
                if (9 >= newNumber) {
                    var10000 = "Failure";
                    break label15;
                }
            }

            var10000 = "Unknown";
        }
    }

    String result = var10000;
    System.out.println(result);
}
```

### 模板字符串

和在JavaScript中差不多，美中不足的是不支持三元运算符（好像java是支持的吧？）

```kotlin
const val USERNAME: String = "Amayakite"

fun main() {
    var orgin = "Jack"
    println("${if (orgin == "AAA") "张三" else "李四"}")
}
```

## 函数

### 基础

可以使用private来声明函数做用域（和Java一样），并且返回值可以用这种写法（md感觉还是三元运算更舒服些）

整体来说，这个语法更像是Typescript或者Python

```kotlin
fun main() {
    println(doSomething(20, false))
    println(doSomething(18, true))
    println(doSomething(1, false))

}

private fun doSomething(age: Int, flag: Boolean): String {
    return if (age > 18 || flag) {
        "Hello"
    } else {
        "World"
    }
}
```

 ### 参数默认值和具名传参

如果不打算传入值参，就可以先设定默认值

如果使用命名值传参，就可以不用管值参的顺序

```kotlin
fun main() {

    fix("张三")
    fix(age = 888, name = "李四")
    fix(name = "王五")

}

fun fix(name: String, age: Int = 12) {
    println("name:$name,age:$age")
}
```

编译成字节码后(md怎么感觉怪怪的)

```kotlin
public final class HelloKotlinKt {
   public static final void main() {
      fix$default("张三", 0, 2, (Object)null);
      String var0 = "李四";
      short var1 = 888;
      fix(var0, var1);
      fix$default("王五", 0, 2, (Object)null);
   }

   // $FF: synthetic method
   public static void main(String[] var0) {
      main();
   }

   public static final void fix(@NotNull String name, int age) {
      Intrinsics.checkNotNullParameter(name, "name");
      String var2 = "name:" + name + ",age:" + age;
      System.out.println(var2);
   }

   // $FF: synthetic method
   public static void fix$default(String var0, int var1, int var2, Object var3) {
      if ((var2 & 2) != 0) {
         var1 = 12;
      }

      fix(var0, var1);
   }
}

```

### Unit函数（Void）

就是Java中的`void methodName(xxx){xxx}`

Kotlin中没有返回值的函数叫做Unit函数，也就是说他们返回的类型是Unit，在Kotlin之前，函数不返回任何东西用Void描述，意思是没有返回类型，不会带来什么，忽略它，也就是说如果函数不返回任何内容就忽略类型，但是，void这种解决方法无法解释现代语言的一个重要特征-泛型

### Todo函数来抛出异常和自己抛出异常

TODO函数的任务就是抛出异常，就是永远别指望它运行成功，返回一个Error

它的源码如下

```kotlin
@kotlin.internal.InlineOnly
public inline fun TODO(reason: String): Nothing = throw NotImplementedError("An operation is not implemented: $reason")
// 上面这个写法相当于Java中的
public TODO(message String){
    throw new NotImplementedError(message);
}
```

注意，**这不是Java中的Exception类型，而是Error，所以需要特定的捕获语法**

PS：Error继承自Throwable

```kotlin
fun main() {

    try {
        fix("张三")
    } catch (e: Error) {
        println(e.message)
    }

}

// 这里可以自己指定返回Nothing类型，不过指不指定都无所谓
fun fix(name: String, age: Int = 12) {
    println("name:$name,age:$age")
    TODO("Hello World")
}
```

用TODO的好处是，编译器有提示，同时你的代码也有提示（真·运行层面的的TODO）

如果想要自己抛出异常的话，也比较简单（就把Exception换成Error即可）

```kotlin
fun main() {
    try {
        fix("张三")
    } catch (e: Error) {
        println(e.javaClass.name)
        println(e.message)
    }

}

fun fix(name: String, age: Int = 12) {
    if (age < 18) {
        throw Error("$name 年龄不足")
    }

}
// 运行结果：
java.lang.Error
张三 年龄不足
```

### 带有空格和特殊字符的函数名

想要用空格之类的函数可以，不过要用一个反引号括起来，用的时候也要用反引号括起来

```kotlin
fun main() {
    `hello****world user name 阿啊啊`("张三")

}

fun `hello****world user name 阿啊啊`(name: String, age: Int = 12) {
    println("hello world $name, age is $age")
}
```

## 匿名函数

这貌似是Kotlin中比较精髓的存在，先来看一个代码吧

```kotlin
fun main() {
    val count = "/Hello World/".count()
    println(count)
    val count1 = "abcabcabc".count { it == 'a' }
    println(count1)
    val count2 = "abcabcabc".count { letter -> letter == 'b' }
    println(count2)
}
// 结果：
13
3
3
```

可以看到，上述的count直接就...成为了String的函数，并且还能在里面传入表达式

接下来看看怎么自己写一个吧

### 创建一个最简单的匿名函数

非常简单，只需要像emm用JavaScript ES6语法那样就可，例如我在函数内部创建一个匿名函数

```java
fun main() {
    // 					类型->返回值
    val blessingFunction: () -> String = {
        // 和groovy一样，最后一句默认为返回值，所以不用写return
        "Hello Kotlin"
    }
    println(blessingFunction())

}

```

可以看到底层实际上是用了反射

```java
public final class HelloKotlinKt {
   public static final void main() {
       // 应该是反射吧？
      Function0 blessingFunction = (Function0)null.INSTANCE;
      Object var1 = blessingFunction.invoke();
      System.out.println(var1);
   }

   // $FF: synthetic method
   public static void main(String[] var0) {
      main();
   }
}

```

### 接收参数

参数类型写在定义那，参数名写在函数里面或者it替代

```kotlin
fun main() {
//    方式1
    val sayHello: (String) -> String = { name: String -> "Hello $name" }
    // or 
    val sayHello: (String) -> String = { name -> "Hello $name" }
    println(sayHello("Kotlin"))
//    方式2
    val sayHello2: (String) -> String = { "Hello $it" }
    println(sayHello2("Kotlin"))

}
```

### It关键字

PS：无论咋样做可读性都不咋地，建议是去ieda里面的设置-编辑器-嵌入提示中找到Kotlin并全部勾上

定义只有一个参数的匿名函数时，可以使用it关键字来表示参数名，当你要传入两个时，it就不能用了

```kotlin
fun main() {
    val sayHello2: (String) -> String = { "Hello $it" }
    println(sayHello2("Kotlin"))
}
```

同时没有参数时你还可以省略下声明

```kotlin
fun main() {

    val sayHello = { name: String -> "Hello $name" }
    println(sayHello("Kotlin"))
    
    val sayHello2 = {
        println("hello world")
        100
    }
    println(sayHello2())
}

```

有参数的话，则

```kotlin
import java.util.*

fun main() {
    val getAge = { name: String, year: Int ->
//        获取现在的年份
        val nowYear = Date().year + 1900
//        计算年龄
        val i = nowYear - year
        "name: $name, age: $i"
    }
    println(getAge("AAA", 1949))

}
```

## Lambda

例如我刚刚写的年龄的，在idea中最后是这样展现

![image-20220506145843647](/images/Java/Android/02-Kotlin-基础/image-20220506145843647.png)

::: tip

如果你并没有显示这些白色的东西，则可以去**设置-编辑器-嵌入提示**中找到Kotlin并全部勾上

:::

一般匿名函数称为lambda，将它的定义称为lambda表达式，它的返回值称为lambda的结果

emm就是匿名函数的高端叫法（md天天一堆啥都不会的人张口闭口xxx的lambda天下第一的，贼烦人）

### 函数的参数是函数

emm就像是java中要传入一个匿名内部类一样，例如new Thread需要传入一个Runnable接口，但是可以缩写成

```java
public static void main(String args[]){
    new Thread(()->{
        System.out.println("Say Hello")
    }).start()
}
```

但众所周知，实际上Thread接收的一直都只是Runnbale的实现类	，只不过是语法糖帮我们简化了而已

但是在Kotlin中，却直接可以传入函数进一个方法中，例子：

```kotlin
import kotlin.random.Random

fun main() {
    val showName = { name: String, age: Int ->
        "My name is $name and I am $age years old"
    }
    showOnBoard("测试文本", showName)
}


fun showOnBoard(goodsName: String, getDiscountWords: (String, Int) -> String) {
    val nextInt = Random(System.currentTimeMillis()).nextInt(222)
    println(getDiscountWords(goodsName, nextInt))
}
```

当然，还可以简化成这样

```kotlin
import kotlin.random.Random

fun main() {
    showOnBoard("测试文本") { name, age ->
        "My name is $name and I am $age years old"
    }
}


fun showOnBoard(goodsName: String, getDiscountWords: (String, Int) -> String) {
    val nextInt = Random(System.currentTimeMillis()).nextInt(222)
    println(getDiscountWords(goodsName, nextInt))
}
```

如果说函数的参数只有一个，且是函数的话，则还可以简写成这样

```kotlin
import kotlin.random.Random

fun main() {
    showMessage { "Number is a $it" }
}

fun showMessage(messageFunction: (num: Int) -> String) {
    val nextInt = Random(System.currentTimeMillis()).nextInt(333)
    println(messageFunction(nextInt))
}
```

可读性极差了属于是...敲代码一时爽，维护火葬场

### 返回值是函数

直接上代码吧，相当于返回了一个可以随时执行的函数

```kotlin
import java.util.*

fun main() {
    val configCallBack = configCallBack()
    println(configCallBack("张三"))
}

fun configCallBack(): (String) -> String {
    return { goodsName: String ->
        val currentYear = Calendar.getInstance().get(Calendar.YEAR)
        "Hello, $goodsName! The current year is $currentYear"
    }
}

```

如果说给那个currentYear加了作用域的话，例如定义在这个return前面，则对后续调用它的所有人来说，都是固定的值

```kotlin
import java.util.*

fun main() {
    val configCallBack = configCallBack()
    println(configCallBack("张三"))
    println(configCallBack("张三1"))
    println(configCallBack("张三2"))
    println(configCallBack("张三3"))
    println(configCallBack("张三4"))
    println(configCallBack("张三5"))
}

fun configCallBack(): (String) -> String {
    val currentYear = Random().nextInt(100)
    return { goodsName: String ->
        "Hello, $goodsName! The current year is $currentYear"
    }
}

```

就类似于这样

![image-20220506154756594](/images/Java/Android/02-Kotlin-基础/image-20220506154756594.png)



## Null的处理

![image-20220506163943325](/images/Java/Android/02-Kotlin-基础/image-20220506163943325.png)

在Kotlin中，除非另有规定，不然变量不可为空值，这样一来，运行时崩溃从根源上解决

### 声明可空类型

但是为了避免NullPointerException，Kotlin的做法是不让我们给非空类型变量赋null值，但是Null在Kotlin中依然存在

```kotlin
fun main() {
    var a = null
    println(a)
}

```

如果想让一个对象是可空的呢？

只需要这样

```kotlin
fun main() {
    var myStr: String? = null
    if (myStr != null) {
        println(myStr)
    } else {
        println("myStr is null")
    }
}
```

### null的安全处理-操作符和let

如下

```kotlin
fun main() {
    val capitalize: String? = null
    val capitalize1 = capitalize?.capitalize()
    println(capitalize1)
}
```

那个`?`的作用是如果说为空的话，就执行后面的函数，而是返回前面的值，如果是不为空的话，则执行后面的函数

同理，判断空了之后，还可以使用let来对其进行**进一步的判断和操作**，例如判断是否是空字符串（let：需要接受一个字符串，返回一个字符串）

```kotlin
fun main() {
    var capitalize: String? = ""
    val endValue = capitalize?.let {
        // 这里的it类型是String，而不是String?
        if (it.isEmpty()) {
            "This is a null or empty string"
        } else {
            it.uppercase()
        }
    }
    println(endValue)
}

```

### Null的安全处理-非空断言操作符

`!!`两个感叹号，表示该变量一定不为空，当变量为空的时候，使用它将会抛出Java的空异常`java.lang.NullPointerException`

```kotlin
fun main() {
    var capitalize: String? = null
    val endValue = capitalize!!.capitalize()
    println(endValue)
}
```

### Null的安全处理-If语句

这就是用Java的语法了，直接用即可

```kotlin
fun main() {
    var capitalize: String? = null
    if (capitalize != null) {
        println(capitalize.toUpperCase())
    } else {
        println("capitalize is null")
    }

}
```

虽然可以用if，但是相比之下安全调用操作符更灵活一些，代码也更简洁，安全调用操作符支持多函数链式调用

例如

```kotlin
fun main() {
    var capitalize: String? = null
    // ?: 当左边的为空的时候，返回右边的，否则
    println(capitalize ?: "This is a null value")
}

```

## 异常

### 自定义异常和异常处理

比较简单，这里就一笔带过

```kotlin
fun main() {
    try {
        MyTest(null)
    } catch (e: MyException) {
        println(e.message)
    }
}

class MyException : RuntimeException("自定义异常")

fun MyTest(num: Int?) {
    // 判断是是否为空
    num ?: throw MyException()
    // 判断value
    if (num < 0) {
        throw MyException()
    }
    println("num = $num")

}
```

### 先决条件函数

Kotlin标准库提供了一些遍历函数，使用这些内置函数，可以抛出带有自定义信息的异常，这些便利函数叫先决条件函数，可以使用它来定义先决条件，**条件必须满足，目标代码才可以执行**

![image-20220506192545125](/images/Java/Android/02-Kotlin-基础/image-20220506192545125.png)

例子

```kotlin
fun main() {
    checkOperator(null)
}

fun checkOperator(number: Int?) {
//    如果值为空，则抛出一个IllegalStateException，该异常带有调用lazyMessage的结果。否则返回非空值。
    // 如果这里传入了一个空，则后续的println将不会执行
    val checkNotNull = checkNotNull(number) { "这是一个null值" }
    println("Number is $checkNotNull")
}
```

源码是这样的

```kotlin
@kotlin.internal.InlineOnly
public inline fun <T : Any> checkNotNull(value: T?, lazyMessage: () -> Any): T {
    contract {
        returns() implies (value != null)
    }

    if (value == null) {
        val message = lazyMessage()
        throw IllegalStateException(message.toString())
    } else {
        return value
    }
}
```

## 字符串操作

### 截取字符串subString

其余的和Java一样，但是额外支持intRange类型（一个整数范围的类型）的参数，until创建的范围不包括上限值

例子：

```kotlin
const val NAME = "Amayakite"
fun main() {
    val index = NAME.indexOf("y")
//    0-2:Ama
    val substring = NAME.substring(0 until index)
    println(substring)
//    0-4:Amaya
    val substring1 = NAME.substring(0..4)
    println(substring1)
    
}
```

相当于是可以跟方便的定义截取的片段了

### 转换集合split

 ```kotlin
 const val NAMES = "jack,jacky,jason"
 fun main() {
 //    原先基础用法
     val nameList = NAMES.split(",")
     nameList.forEach {
         println("Hello, $it")
     }
 //    同时在List中，支持使用解构赋值的方式来获取元素
     val (first, second, third) = nameList
     println("first: $first, second: $second, third: $third")
 //    当然，也可以直接获取到切片就这样做
     val (j1, j2, j3) = NAMES.split(",")
     println("j1: $j1, j2: $j2, j3: $j3")
 
 }
 ```

### replace高级语法

它支持指定的字替换成哪些内容

```kotlin
const val NAME = "The people of the world"
fun main() {
    // 第一个参数：正则表达式
    val replace = NAME.replace(Regex("[peol]")) {
        // 第二个参数：一个函数，传入一个 MatchResult对象，返回一个Str
        when (it.value) {
            "p" -> "1"
            "e" -> "2"
            "o" -> "3"
            "l" -> "4"
            else -> it.value
        }
    }
    println(replace)

}

```

### 比较字符串或对象

和Java一样的是，可以通过equals来进行比较

不一样的是，多了一个`===`，并且`==`从地址比较变成了等效于equals，`===`才是比较地址

```kotlin
fun main() {
    val charArrayOf = charArrayOf('H', 'e', 'l', 'l', 'o')
    var a = String(charArrayOf)
    var b = "Hello"
    println(a == b) // true 因为本质是equals
    println(a === b) // 比较地址 相当于原生java的==
    println(a.equals(b)) // 不多说明
}

// 结果：
true
false
true
```

可以看到编译后的代码

```java
public final class HelloKotlinKt {
   public static final void main() {
      char[] charArrayOf = new char[]{'H', 'e', 'l', 'l', 'o'};
      String a = new String(charArrayOf);
      String b = "Hello";
       // 第一个 ==
      boolean var3 = Intrinsics.areEqual(a, b);
      System.out.println(var3);
       // 第二个 ===
      var3 = a == b;
      System.out.println(var3);
       // 第三个
      var3 = a.equals(b);
      System.out.println(var3);
   }
```

## 数值

### 安全转换数值

可以通过`toXXxOrNull`来进行方便快捷的转换

例如转换一个东西为int

```kotlin
fun main() {
    val toIntOrNull = "88.88".toIntOrNull()
    println(toIntOrNull)
}
// 传入的没法转换成int，返回null，可以转换成int，则转换成int
// 上面传入的是一个double，无法转换成int，返回null

// 下方转换double，可以转换，所以返回的是一个double数值 fun main() {
val toIntOrNull = "88.88".toDoubleOrNull();
println(toIntOrNull)

```

## 标准库

就像是javautil那样，或者golang的fmt、strconv等

### apply

直接看例子吧

```kotlin
import java.io.File


fun main() {
    var file = File("Hello.kt")
//    可读
    file.setReadable(true)
//    可写
    file.setWritable(true)
//    不可执行
    file.setExecutable(false)

//    上方可以通过apply函数来简化代码
    var file1 = File("Hello.kt").apply {
        setReadable(true)
        setWritable(true)
        setExecutable(false)
    }
}

```

![image-20220506223530079](/images/Java/Android/02-Kotlin-基础/image-20220506223530079.png)

它的源码是这样的

```kotlin
@kotlin.internal.InlineOnly
public inline fun <T> T.apply(block: T.() -> Unit): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block()
    return this
}
```

这个之后会说明

### let

![image-20220506223552653](/images/Java/Android/02-Kotlin-基础/image-20220506223552653.png)



例如：

```kotlin
fun main() {
    // last() 取最后一个，let 获取这个值 并且自己调整 然后返回
    var result = listOf<Int>(3, 4, 5).last().let {
        it * it
    }
    println(result)

}
```

如果不用let的话，是长这样的

```kotlin
fun main() {
    var result = listOf<Int>(3, 4, 5).last()
    result *= result
    println(result)

}
```

let也时常用来动态返回值

```kotlin
fun main() {
    println(formatGreeter())
    println(formatGreeter("张三"))
}

fun formatGreeter(name: String? = null): String {
//    1. 如果开始不为空，则为Hello, $name 所以返回左边的，否则返回右边的
    return name?.let { "Hello, $name" } ?: "Hello, anonymous"
}
```

### run

光看作用域行为，run和apply差不多，但是与其不同的是，run函数不返回接收者，run返回的是**Lambda的结果**，也就是最后行代码的结果

例如

```kotlin
import java.io.File

fun main() {
    val filePath = "E:\\MyProject\\blog_vite\\package.json"
    var file = File(filePath)
    var run = file.run {
        setReadable(true)
//        读取文件内的所有内容（如果超过了2G不建议用这个 这个是一次性读取）
        readText()
//                查看是否包含某些内容，这个方法返回一个boolean值
//                如果不写下面这一行，则返回的是读取到的所有内容
            .contains("vue-router")
    }
    println(run)

}

```

同时，它里面也可以直接传入一个函数

```kotlin
fun main() {

    var run = "The People's Republic of China".run(::isLongStr)
    println(run)

}

fun isLongStr(str: String): Boolean = str.length > 10


```

当然，还可以链试调用

```kotlin
fun main() {

    var run = "The People's Republic of China".run(::isLongStr).run(::showMessage)
    println(run)

}

fun isLongStr(str: String): Boolean = str.length > 10

fun showMessage(isLong: Boolean) = if (isLong) "message is long " else "please input message "

```

### With

和run的用途一样，唯一不同的是，run是直接调用，而with需要传入我们的内容

例子

```kotlin
fun main() {

    var with = with("Hello World This is a User") {
        with(isLongStr(this)) {
            showMessage(this)
        }
    }
    println(with)


}

fun isLongStr(str: String): Boolean = str.length > 10

fun showMessage(isLong: Boolean) = if (isLong) "message is long " else "please input message "

```

### also

这个和let比较像，不同的地方是，let返回的是最终的结果，而这个最终返回的是开始的调用的值，也就是说，可以基于一个值去做一些别的事情而不会影响到原来的值

- Let：传入一个值（源值），最终通过源值获取到其他值
- also：基于源值进行一些特定的操作，最后将没有被修改过的源值返回

```kotlin
fun main() {

    var also = 1.also {
        println(it + 10)
        it + 20
    }
    // 这里获取到的依旧是1
    println(also)

}
```

当然，光是这样肯定是不够的，拿文件举例

```kotlin
import java.io.File

fun main() {

    var fileContextList: List<String>
    val filePath = "E:\\MyProject\\blog_vite\\package.json"
    val file = File(filePath)
    file.also {
        println("fileName = ${it.name}")
        println("filePath = ${it.path}")
        println("fileAbsolutePath = ${it.absolutePath}")
        println("fileParent = ${it.parent}")
        println("fileParentFile = ${it.parentFile}")
    }.also {
        // readLines 读取文件，按照每一行来读取，返回一个list<String>
        fileContextList = it.readLines()
    }
    fileContextList.forEach {
        println(it)
    }

}
```

![image-20220506232001999](/images/Java/Android/02-Kotlin-基础/image-20220506232001999.png)

### takeIf

和其他标准函数有点不同，它需要判断lambda中提供的条件表达式，给出true或者false结果

如果判断结果是true，则takeIf返回调用者，如果是false，则返回null

如果需要判断某个条件是否满足，再决定是否可以赋值变量或执行某项任务，takeIf就非常有用，概念上讲，takeIf函数类似于If语句，但它的优势在于可以直接在对象实例上调用，避免了临时变量赋值的麻烦

例如：

```kotlin
import java.io.File

fun main() {
    val filePath = "E:\\MyProject\\blog_vite\\package.json"
    val file = File(filePath)
//    先判断是否可读写再进行后续的操作
    val let = file.takeIf { it.canRead() && it.canWrite() }?.let {
        println("File is readable and writable")
        it.readText()
    }
    println(let)

//    如果不是用的takeIf,则要这样
    if (file.canRead() && file.canWrite()) {
        println("File is readable and writable")
        println(file.readText())
    }
}
```

### fakeUnless

和takeIf是反着来的，只有我们给定的判定结果为false时，takeUnless才回返回原始接收者对象，否则返回null

例如：

```kotlin
import java.io.File

fun main() {
    val filePath = "E:\\MyProject\\blog_vite\\package.jsonaaa"
    val file = File(filePath)
//    先判断是否可执行再进行后续的操作
    val let = file.takeUnless { it.exists() }?.let {
        "文件不存在"
    }
    println(let)

}

```

## 集合

和其他类型一样，在Kotlin中，List、set、Map的变量也分为两类：**只读和可变**

### 不可变List的创建和获取

emm就是创建完毕后 不能增删改元素，只能查元素，使用ListOf来创建，就当是**Java中的数组**即可

```kotlin
fun main() {
    val list = listOf<String>("张三", "李四", "王五")
    println(list)
    println(list[0])
    println(list.get(0))
    println(list.first())
    println(list.last())
    println(list.size)
    println(list.isEmpty())
    println(list.contains("张三"))
    println(list.containsAll(listOf("张三", "李四")))
    println(list.indexOf("张三"))
    println(list.lastIndexOf("张三"))
    println(list.subList(0, 2))
    println(list.toString())
}
// 运行结果：
[张三, 李四, 王五]
张三
张三
张三
王五
3
false
true
true
0
0
[张三, 李四]
[张三, 李四, 王五]
[Ljava.lang.String;@6193b845

进程已结束,退出代码0

```

### 安全的获取List内的元素

使用`getOrElse即可`

![image-20220507141555685](/images/Java/Android/02-Kotlin-基础/image-20220507141555685.png)

首先你直接取出一个不存在的东西的话，会抛出如下异常

```kotlin
fun main() {
    val list = listOf<String>("张三", "李四", "王五")
    println(list.get(10))

}
// 抛出ArrayIndexOutOfBoundsException
```

用上安全的获取就是这样的

```kotlin
fun main() {
    val list = listOf<String>("张三", "李四", "王五")
    println(list.getOrElse(666) { "$it 位置的索引不存在，返回默认字符串" })
    val s = list.getOrNull(666) ?: "位置不存在，返回null"
    println(s)

}
```

### 可变List

就是Java中的普通列表，可以自由的给它增删改查元素

当然，除了下面这种方法，还可以直接用Java中的`ArrayList`之类的来进行创建

![image-20220507143117842](/images/Java/Android/02-Kotlin-基础/image-20220507143117842.png)



```kotlin
fun main() {
    val list = mutableListOf<String>("one", "two", "three")
    list.add("four")
//    添加，通过运算符+=
    list += "five"
//    指定位置插入（在指定位置之前）
    list.add(0, "zero")
    println(list)
//    删除-通过元素
    list.remove("two")
//    删除-通过位置
    list.removeAt(0)
//    删除：通过运算符-=
    list -= "three"
//    删除-通过语法糖
    list.removeIf { it.startsWith("o") }
    println(list)
//    替换
    list.set(0, "zero")
//    或者直接赋值
    list[0] = "abc"
//    查询
    println(list[0])
//    获取多个
    println(list.subList(0, 2))
//    转换成不可变集合
    val list2 = list.toList()
    println(list2)

}

```

### 遍历（索引遍历）

这里就不写基础的了，有个包含index的快速遍历函数

```kotlin
fun main() {
    val list = listOf<String>("one", "two", "three")
    list.forEachIndexed { index, s ->
        println("$index: $s")
    }

}

// 底层代码
public inline fun <T> Iterable<T>.forEachIndexed(action: (index: Int, T) -> Unit): Unit {
    var index = 0
    for (item in this) action(checkIndexOverflow(index++), item)
}
```

### 结构和过滤

可以通过`_`过滤不想要的元素（和golang很像），在Kotlin的结构中，是使用小括号进行包裹的

```kotlin
fun main() {
    val list = listOf<String>("one", "two", "three")
    val (one, _, three) = list
    println(one)
    println(three)
}
```

### Set

这个比较简单，和Java一样不允许重复，但是这里面的set支持使用index索引（elementAt函数，只支持这个）

```kotlin
fun main() {
    val myset = setOf<String>("one", "two", "three")
    println(myset.elementAt(1))
    println(myset.elementAtOrElse(10) { "default" })
    myset.forEach { println(it) }
}
```

当然，也支持可变的

```kotlin
fun main() {
    // 底层创建的是LinkedHashSet
    val myset = mutableSetOf<String>("one", "two", "three")
    println(myset.elementAt(1))
    println(myset.elementAtOrElse(10) { "default" })
    myset.forEach { println(it) }
    myset.add("four")
    myset.forEach { println(it) }
    myset.remove("one")
    myset.forEach { println(it) }
    myset.clear()
    myset.forEach { println(it) }
    println(myset.isEmpty())
    println(myset.size)
    println(myset.contains("one"))
}
```

### 数组

![image-20220507145041915](/images/Java/Android/02-Kotlin-基础/image-20220507145041915.png)

例子

```kotlin
fun main() {
    val myArray = arrayOf<String>("one", "two", "three")
    myArray[0] = "zero"
    println(myArray[0])
}
```

反编译结果

```java
   public static final void main() {
      String[] myArray = new String[]{"one", "two", "three"};
      myArray[0] = "zero";
      String var1 = myArray[0];
      System.out.println(var1);
   }
```

### Map的操作

整的来说和其他的一样

```kotlin
fun main() {
//    使用mapof这类东西创建的时候，可以 xx to xx来给定初始值
    val myMap = mutableMapOf<Int, String>(1 to "张三", 2 to "李四", 3 to "王五")
    myMap.forEach { key, value ->
        println("$key -> $value")
    }
    println("==============================")
    myMap.put(4, "赵六")
    // 或者
    myMap += 66 to "aaa"
    // 获取一个值，如果没有就添加
    myMap.getOrPut(4444){}
//    或者
    myMap[5] = "田七"
//    修改
    myMap[1] = "张三1"
//    删除
    myMap.remove(1)
    myMap.forEach { key, value ->
        println("$key -> $value")
    }
    // 取值的话 [key] 的方式取 如果不存在返回null
    // getValue(key) 不存在则抛出异常
    // getOrElse 取值，如果不能在则返回匿名函数的值
    // getOrDefault 如果不存在，则返回给定的第二个参数的值
}
```

实际上to是一个语法糖，mutableMapOf实际接收的是一堆Pair列表

```kotlin
public fun <K, V> mutableMapOf(vararg pairs: Pair<K, V>): MutableMap<K, V> =
    LinkedHashMap<K, V>(mapCapacity(pairs.size)).apply { putAll(pairs) }
```

所以我们也可以直接传入Pair，等效于上面的to

```kotlin
fun main() {
    val myMap = mutableMapOf<Int, String>(Pair(1, "One"), Pair(2, "Two"), Pair(3, "Three"))
    myMap.forEach { println(it) }
}

```
