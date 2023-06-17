---
title: 3-Kotlin-OOP
date: 2022-5-7 15:23:37
category: Andorid
tag:
- Java
- Kotlin
- Object
---

## 概述

Kotlin的Object相对于Java来说多了更多特性，这里就不从Java开始学了，只看Kotlin独有的特性

## field

实际上就是一个对象中的属性值，在Kotlin中有更舒服的用法（大概）

![image-20220507161319454](/images/Android/03-Kotlin-OOP/image-20220507161319454.png)

### 基本使用

先来定义一个类

```kotlin
class Player {
    var name: String = "Jack"
    var age: Int = 10
}
```

没错，就是这种写法，而不是public private之类的定义

来看看反编译文件

```java
public final class Player {
    // 自动private
    @NotNull
    private String name = "Jack";
    private int age = 10;

    // 自动getset
    @NotNull
    public final String getName() {
        return this.name;
    }

    public final void setName(@NotNull String var1) {
        Intrinsics.checkNotNullParameter(var1, "<set-?>");
        this.name = var1;
    }

    public final int getAge() {
        return this.age;
    }

    public final void setAge(int var1) {
        this.age = var1;
    }
}
```

接下来试用下

```kotlin
fun main() {
    val player = Player()
    player.name = "John"
    player.age = 20
    println("Name: ${player.name}, Age: ${player.age}")
}
```

然后看看反编译文件

```kotlin
public static final void main() {
    Player player = new Player();
    // 可以发现实际上就是调用了get/set方法
    player.setName("John");
    player.setAge(20);
    String var1 = "Name: " + player.getName() + ", Age: " + player.getAge();
    System.out.println(var1);
}
```

### 自定义get/set

其实非常简单

```kotlin
class Player {
    var name: String = "Jack"
        //        这里的field实际上就是name
//        uppercase:获取副本并且首字母大写
        get() = field.capitalize()
        set(value) {
//            set的时候自定义操作之类的 例如删除空格
            field = value.trim()
        }

    var age: Int = 10

}

fun main() {
    val player = Player()
    player.name = "aaaaaom"
    println(player.name)

}
```

同时你还可以让其私有化

```kotlin
class Player {
    var age: Int = 10
    // 禁止set
        private set(value) {
            field = value
        }
        get() = field + 999

}
```

## 构造函数

### 主构造函数

和Java不一样的是，这个玩意支持这样写构造函数，`_`下划线开头的东西变量，将作为临时变量，外部无法访问

```kotlin
class Player(_name: String, _age: Int, _position: String) {
    var name: String? = _name
    var age: Int? = _age
    var position: String? = _position
    override fun toString(): String {
        return "Player(name=$name, age=$age, position=$position)"
    }

}

fun main() {

    val player = Player("John", 30, "Midfielder")
    println(player)
    

}
```

如果你不需要重写get/set方法的话，甚至可以直接在主构造函数内定义属性，例如

```kotlin
class Player(var name: String, var age: Int) {

    fun showMessage(): String = "Hello $name, you are $age years old"

}

fun main() {

    val player = Player("John", 30)
    println(player.showMessage())

}
```

### 次构造函数

如果说想在主构造函数的基础上添加额外的构造，用`constructor`并调用`this`即可

例如

```kotlin
class Player(var name: String, var age: Int) {

    fun showMessage(): String = "Hello $name, you are $age years old"

   
    constructor(name: String) : this(name, 0)
	
    // 额外的无参
    constructor() : this("", 0)

}

fun main() {

    val player = Player("John", 30)
    println(player.showMessage())

}
```

### 默认值

和函数中一样，顺带一提，如果这个类没有其他方法，则可以省略大括号

```kotlin
class Player(var name: String, var age: Int = 10)

fun main() {
    val player = Player("John")
}
```

### 私有变量

和Java一样

```kotlin
class Player(var name: String, var age: Int = 10) {
    private var score = 0

    fun showMessage(): String {
        return "Hello, my name is $name and I am $age years old and I have $score points"
    }
}

fun main() {
    val player = Player("John")
    println(player.showMessage())

}
```

### Init初始化函数

这个在构造后立刻执行，可以在里面加一些额外的内容，例如判断下值是否匹配

```kotlin
class Player(var name: String, var age: Int = 10) {

    fun showMessage(): String {
        return "Hello, my name is $name and I am $age years old "
    }

    init {
        // require 当里面第一个值返回值为false的时候，抛出第二个值（异常的形式）
        // 第一个值是可以是一个boolean表达式
        require(name.isNotEmpty()) { "Name cannot be empty" }
    }
}

fun main() {
    val player = Player("")
    println(player.showMessage())

}
```

编译后，可以看到是在构造函数内部增强了

```kotlin
public final class Player {
   @NotNull
   private String name;
   private int age;
	
   //....
    
   public Player(@NotNull String name, int age) {
      Intrinsics.checkNotNullParameter(name, "name");
      super();
      this.name = name;
      this.age = age;
      CharSequence var3 = (CharSequence)this.name;
      boolean var5 = var3.length() > 0;
      if (!var5) {
         int var4 = false;
         String var6 = "Name cannot be empty";
         throw new IllegalArgumentException(var6.toString());
      }
   }

   // $FF: synthetic method
   public Player(String var1, int var2, int var3, DefaultConstructorMarker var4) {
      if ((var3 & 2) != 0) {
         var2 = 10;
      }

      this(var1, var2);
   }
}

```

### 初始化顺序

一张图带过

![image-20220507175512202](/images/Android/03-Kotlin-OOP/image-20220507175512202.png)



### 延迟初始化变量

例如有一个变量我不确定会不会用它，但是我想在要用到它的时候再进行初始化（手动初始化），以便降低内存损耗

那么就可以使用kotlin提供的延迟初始化关键字`lateinit`

```kotlin
class Player(var name: String = "张三", var age: Int = 10) {

    fun showMessage(): String {
        return "Hello, my name is $name and I am $age years old "
    }

    lateinit var equipment: String

    fun ready() {
        equipment = "ready"
    }

    fun battle() {
        println("equipment is $equipment")
    }


}

fun main() {
    val player = Player()
    // 变量还没初始化 直接调用这个 将会抛出异常UninitializedPropertyAccessException
    player.battle()
}
```

当然，一般来说要用这个变量的方法都会加一个安全的判断操作

```kotlin
class Player(var name: String = "张三", var age: Int = 10) {

    fun showMessage(): String {
        return "Hello, my name is $name and I am $age years old "
    }

    lateinit var equipment: String

    fun ready() {
        equipment = "ready"
    }

    fun battle() {
        // ::equipment.isInitialized 如果equipment变量已经被初始化，则返回true，否则返回false
        if (::equipment.isInitialized) {
            println("$name is ready to battle：$equipment")
        } else {
            println("$name is not ready to battle")
        }
    }


}

fun main() {
    val player = Player()
    player.ready()
    player.battle()
}
```

### 惰性初始化

延迟初始化并不是退后初始化的唯一方式，也可以暂时不初始化某个变量，直到首次使用它，这就是惰性初始化

语法：`val xxxx by lazy{lambda表达式}`

```kotlin
import java.util.concurrent.TimeUnit

class Player {

	// 这个可以传入任意值，如果传入的是方法，则方法的返回值是它的value
    val config by lazy { loadConfig() }
    private fun loadConfig(): String {
        println("loading...")
        return "xxx"
    }

}

fun main() {
    val player = Player()
    TimeUnit.SECONDS.sleep(1)
    println("延迟结束")
    println(player.config)
}
// 运行结果
延迟结束
loading...
xxx
```

和延迟初始化比起来，这个就像是饿汉式，延迟初始化就像是懒汉式

## 继承

所有类默认都是封闭的，要让某个类开放继承，必须使用`open`关键字来修饰它

### Open-开放继承

相当于把继承整的多了一个步骤，然后语法如下

```kotlin
/**
 * @author      Amayakite
 * @date    2022年05月07日20时45分05秒
 * @version     1.0
 * @description TODO
 */
open class Person(val name: String) {

    //    方法也是需要加open才能被重写
    open fun description() = "Person(name=$name)"
}

class User : Person("Amayakite") {
    // 重写直接override即可，不需要@注解了
    override fun description() = "Hello ${name.capitalize()}!"
}

fun main() {
    val user = User()
    println(user.description())
}

```

### 判断是否属于某类和转换成某个类

- 判断：`变量 is 类` 返回布尔
- 转换：`(变量 as 类).方法/值`

判断的话实际上就是把`instanceof`变得更短了

```kotlin {19}
open class Person(val name: String) {

    open fun description() = "Person(name=$name)"
}

class User : Person("Amayakite") {
    override fun description() = "Hello ${name.capitalize()}!"
}

fun main() {
    val user = User()
    println(user is Person)
}
```

看看底层：

```java
public static final void main() {
    User user = new User();
    boolean var1 = user instanceof Person;
    System.out.println(var1);
}
```

接下来是转换，语法稍微比java怪一些

```kotlin {21-23}
/**
 * @author      Amayakite
 * @date    2022年05月07日20时45分05秒
 * @version     1.0
 * @description TODO
 */
open class Person(val name: String) {

    //    方法也是需要加open才能被重写
    open fun description() = "Person(name=$name)"
}

class User : Person("Amayakite") {
    override fun description() = "Hello ${name.capitalize()}!"

    fun sayHello() = println("Hello ${name.capitalize()}!")
}

fun main() {
    val p: Person = User()
    if (p is User) {
        (p as User).sayHello()
    }
}

```

### 智能类型转换

在Java中，我们转换一个类型后，需要声明一个变量来接收

```java
void main(){
    Person p  = new User();
    if (p instanceof User){
        User u = (User)p;
        u.xxx();
        u.xxx()
    }
}
```

而在Kotlin中，我们只需要声明一次as，将会自动将对象转换至目标对象，例如

```kotlin {22-24}
/**
 * @author      Amayakite
 * @date    2022年05月07日20时45分05秒
 * @version     1.0
 * @description TODO
 */
open class Person(val name: String) {

    //    方法也是需要加open才能被重写
    open fun description() = "Person(name=$name)"
}

class User : Person("Amayakite") {
    override fun description() = "Hello ${name.capitalize()}!"

    fun sayHello() = println("Hello ${name.capitalize()}!")
}

fun main() {
    val p: Person = User()
    if (p is User) {
        (p as User).sayHello()
//        注意 下面没有加转换语句 内部自动智能转换为user了
        p.sayHello()
    }
}

```

### 超类Any

和Java的object一样，没啥好多说的

```kotlin
fun main() {
    val person = Person("")
    println(person is Any) // true
}
```

### 直接创建一个单例对象-Object

在Java中，管理单例对象一直都比较痛苦，但是在Kotlin中可以直接在定义的时候同时给你创建一份出来

例子

例如

```kotlin
import cn.hutool.http.HttpRequest
import cn.hutool.http.Method


// 使用object声明 这个类将在定义的时候自动创建一个单例对象
object RequestConfig {
    const val BASE_URL = "https://jsonplaceholder.typicode.com"
    var path = "/posts/1"
    var method: Method = Method.GET
    var headers: Map<String, String>? = mapOf("Content-Type" to "application/json")
    var body = ""
    public final fun sendRequestAndPrintResponse() {
        val response = HttpRequest.get(BASE_URL + path).also {
            headers?.forEach { hKey, HValue ->
                it.header(hKey, HValue)
            }
        }.setMethod(method).body(body).execute().body()
        println(response)

    }

}

fun main() {
    // 直接使用这个单例对象的方法 不需要初始化
    RequestConfig.sendRequestAndPrintResponse()
    // 直接修改值
    RequestConfig.path = "/posts/2"
    RequestConfig.sendRequestAndPrintResponse()
}

```

### 匿名内部类

使用如下方式可以创建一个匿名内部类（object关键字）

```kotlin
open class Person(var name: String) {

    open fun sayHello() {
        println("Hello, I'm $name")
    }
}

fun main() {
    // 这样出来也是单例的
    var p = object : Person("Alice") {
        override fun sayHello() {
            println("Very Good, I'm ${this.name}")
        }
    }
    p.sayHello()

}
```

### 伴生对象（解决Static问题）

在Kotlin中，没有Static关键字，解决方案是伴生对象，可以在一个类内使用`companion`关键字来定义一个伴生对象，且只能定义一个，这个伴生对象在声明后是**全局唯一**的（无论直接调用还是new了之后调用，都是同一个）

这玩意就是解决static的，不要想的太复杂，它比static更高级的是，不调用它的话，是不会实例化这个伴生对象的

先看例子

```kotlin
class ConfigMap {
    companion object {
        const val KEY_NAME = "name"
        const val KEY_AGE = "age"
        fun printKey() {
            println("KEY_NAME: $KEY_NAME")
            println("KEY_AGE: $KEY_AGE")
        }
    }

    init {
        val configName = KEY_NAME
        println(configName)
    }
}

fun main() {
    // 可以直接访问 说明是static
    ConfigMap.printKey()
    ConfigMap()

}


```

### 内部类

在Kotlin中定义内部类**无需使用static关键字**，默认就是静态的

```kotlin
class Person {
    class User(var name: String) {
        fun show() = println("User name is $name")
    }
}
 
fun main() {
    Person.User("张三").show()
}
```

### 数据类(lombok替代品)

顾名思义，就是专门设计用来存储数据的类

数据类停了toString的个性化实现

在kotlin中,`==`符号默认情况下，比较对象就是比较他们的值（调用equals，没有重写的情况下就是比较内存地址），数据类提供了equals和hashcode的个性化实现

首先我们来一个简单的类

```kotlin
class Coordinate(var x: Int, var y: Int) {
    val isInBounds
        get() = x in 0..9 && y in 0..9
}

fun main() {
    println(Coordinate(10, 20))
    // 结果：Coordinate@4f3f5b24
    println(Coordinate(10, 20)==Coordinate(10, 20))
    // 结果：false
}

```

我们在该类声明的时候加上一个data

```kotlin
data class Coordinate(var x: Int, var y: Int) {
    val isInBounds
        get() = x in 0..9 && y in 0..9
}

fun main() {
    println(Coordinate(10, 20))
    // Coordinate(x=10, y=20)
    println(Coordinate(10, 20) == Coordinate(10, 20))
    // 结果 true

}

```

在反编译文件中，可以看到

![image-20220507215525442](/images/Android/03-Kotlin-OOP/image-20220507215525442.png)

它重写了equals和hashcode还有tostring以及有一个额外的copy方法

### 类的结构赋值

如果是普通类（不是数据类），则需要这样声明（固定写法）

```kotlin

class User(val username: String, val password: String) {
    //    如果是普通类，必须得operator fun componentNumber()=字段值或者计算的值
//    这个component是必须以1开始，然后按照顺序来定义的，也就是不能出现0或者不连续的数字
    operator fun component1() = username
    operator fun component2() = password
}

fun main() {
    val user = User("admin", "password")
    val (username, password) = user
    println("$username, $password")
}
```

如果是数据类，则会默认使用主构造方法需要的参数作为结构赋值的内容

```kotlin
data class Coordinate(var x: Int, var y: Int) {
    val isInBounds
        get() = x in 0..9 && y in 0..9
}


fun main() {
    val coordinate = Coordinate(3, 4)
    var (x, y) = coordinate
    println("x = $x, y = $y")

}

```

### 运算符重载

例如在List中，可以通过list+="xxx"来添加新的value

在对象中同理，我们只需要写入`operator fun plus`方法即可，例如

```kotlin
data class Coordinate(var x: Int, var y: Int) {
    operator fun plus(other: Coordinate): Coordinate {
        return Coordinate(x + other.x, y + other.y)
    }
}
fun main() {
    var coordinate = Coordinate(3, 4)
    coordinate += Coordinate(1, 2)
    println(coordinate)
//    Coordinate(x=4, y=6)
}
```

其他的同理，常见的如下

![image-20220507224655047](/images/Android/03-Kotlin-OOP/image-20220507224655047.png)

### 枚举类

最简单的使用和Java差不多

```kotlin
// 用了枚举关键字也需要加上class关键字
enum class ResponseEnum {
    SUCCESS,
    FAILURE,
    ERROR,
    UNKNOWN,
    NOT_FOUND,
    FORBIDDEN,
    UNAUTHORIZED,
}

fun main() {
    println(ResponseEnum.SUCCESS) //SUCCESS
    println(ResponseEnum.SUCCESS is ResponseEnum) //true

}
```

当然，也可以加字段

```kotlin
enum class ResponseEnum(val code: Int, val message: String) {
    SUCCESS(200, "success"),
    FAIL(400, "fail"),
    UNAUTHORIZED(401, "unauthorized"),
    FORBIDDEN(403, "forbidden"),
    NOT_FOUND(404, "not found"),
    INTERNAL_SERVER_ERROR(500, "internal server error");

    override fun toString(): String {
        return "ResponseEnum(code=$code, message='$message')"
    }


}
fun main() {
    println(ResponseEnum.UNAUTHORIZED)
}
```

再或者，可以接收下其他obj，例如

```kotlin
// 注意 这里是private，外部是无法直接访问到person这个对象的
enum class PersonEnum(private val person: Person) {
    PERSON_1(Person("张三", 18)),
    PERSON_2(Person("李四", 20)),
    PERSON_3(Person("王五", 22));

}

fun main() {
    println("${PersonEnum.PERSON_1.name}:${PersonEnum.PERSON_1}")
//    迭代器遍历
    for (personEnum in PersonEnum.values()) {
        println("${personEnum.name}:${personEnum}")
    }
}
```

### 密封类

我现在想要一个效果，首先是一个枚举类代表该用户有没有驾照

然后通过一个函数来判断传入的obj是枚举类中的哪一个

如果是没有考或者没过，则返回错误信息，如果考过了，则返回成功信息和驾照编号

按照往常来说，这比较复杂， 但是Kotlin中的密封类（sealed class）能很好的解决这个问题

直接看例子把，它相当于一个超级舒服的枚举

```kotlin
sealed class LincesStatus {
    // 下面两个object都是单例Class对象，类型是LincesStatus$UnQualified和类型是LincesStatus￥Learning
    object UnQualified : LincesStatus()
    object Learning : LincesStatus()
    // 这个是多例
    class Qualified(val license: String) : LincesStatus()

}

class Driver(val status: LincesStatus) {
    fun checkLinces(): String {
        return when (status) {
            is LincesStatus.UnQualified -> "UnQualified"
            is LincesStatus.Learning -> "Learning"
            is LincesStatus.Qualified -> "有资格，您的驾照号码是${status.license}"
        }
    }
}

fun main() {
    println(Driver(LincesStatus.Learning).checkLinces())
    println(Driver(LincesStatus.Qualified("123456789")).checkLinces())

}
// 结果：
Learning
有资格，您的驾照号码是123456789
```

![image-20220508152810691](/images/Android/03-Kotlin-OOP/image-20220508152810691.png)

## 接口

![image-20220508152904862](/images/Android/03-Kotlin-OOP/image-20220508152904862.png)

在Kotlin中，接口的属性是可以被继承的

并且可以提供默认的实现

![image-20220508152959747](/images/Android/03-Kotlin-OOP/image-20220508152959747.png)

## 抽象类

和Java基本一致，用的不多没啥好多说的

![image-20220508153050954](/images/Android/03-Kotlin-OOP/image-20220508153050954.png)

## 泛型

和Java也差不多

![image-20220508153138509](/images/Android/03-Kotlin-OOP/image-20220508153138509.png)

### 泛型类型约束

例如想限制泛型必须是某个类或者其之类的话

```kotlin
open class Person(val name: String) {
    open fun greet() = "Hello, $name"
}

class User constructor(name: String) : Person(name) {
    fun login() = "User $name logged in"
    override fun greet(): String {
        return "Welcome, $name"
    }
}

// 注意 这里不是 extends 而是：
fun <T : Person> sayHello(person: T) = println(person.greet())

fun main() {
    val user = User("John")
    sayHello(user)
}

```

### out和in

这两个是限制interface中方法的对应内容的

通过out约束的泛型，使用其的方法只能将它作为返回值

通过in约束的泛型，使用其的方法只能将它作为参数

例如

```kotlin
interface Product<out T> {
    //    如果这里的T作为参数，则会报错
    fun getPrice(): T
}

interface Cosumer<in T> {
    // 如果这里的T作为返回值，则会报错
    fun accept(price: T)
}

class ProductAndComsumerImpl<T>(val userInfo: T) : Product<T>, Cosumer<T> {

    override fun getPrice(): T {
        return userInfo
    }


    override fun accept(price: T) {
        println(price)
    }
}

fun main() {
    val product = ProductAndComsumerImpl<String>("123")
    product.accept("123")
    println(product.getPrice())
}
```

额外说明

![image-20220508160254108](/images/Android/03-Kotlin-OOP/image-20220508160254108.png)

### reified-让泛型可以加入判断

![image-20220508160347079](/images/Android/03-Kotlin-OOP/image-20220508160347079.png)

```kotlin
open class Human(open val age: Int)
data class Man(val name: String, override val age: Int) : Human(age)
data class WuMan(val name: String, override val age: Int) : Human(age)

class MagicBox<T : Human> {
    // 在Kotlin中，泛型也是无法直接参与判断的，要想添加判断 这是固定写法
    // inline fun <reified T : XXX> xxx()
    // 这样这个T就可以直接参加到is判断内
    inline fun <reified T> randomOrBackUp(backup: () -> T): T {
        val randomHumanList = listOf<Human>(
            Man("张三", 10),
            WuMan("李四", 11)
        )
//        取随机的一个
        var randomHuman = randomHumanList.random()
        // is判断
        if (randomHuman is T) {
            return randomHuman
        }
        return backup()
    }
}


fun main() {
    var magicBox = MagicBox<Man>()
    println(magicBox.randomOrBackUp { Man("1111", 333) })
    println(magicBox.randomOrBackUp { Man("555", 666) })

}
```



## vararg-一次性接收多个参数

我们正常写的函数，一次性只能接收一个参数，如果想让其接受多个，就像是`main(String args[])`这样的话 则可以

```kotlin
fun logStringList(vararg strings: String) {
    // 用for循环之类的
    for (string in strings) {
        println(string)
    }
    // 增强for也可：strings.forEach { println(it) }
}

fun main() {
    logStringList("Hello", "World")
}

```

## 扩展函数

![image-20220508164602517](/images/Android/03-Kotlin-OOP/image-20220508164602517.png)

在Java中，要给一个类定义扩展函数，无非就是匿名内部类（实例化）和额外的方法使用

但是我现在非匿名内部类的情况下调用一个自定义方法，则可以通过如下方法

```kotlin
fun String.addExt(amount: Int): String {
    return this + "!".repeat(amount)
}

//或者给Any添加一个扩展函数
fun Any.easyPrint() = println(this)

fun main() {
    "Kotlin".addExt(2).easyPrint()
    // 结果：打印Kotlin!!
}
```

当然，也可以换一种写法

```kotlin
fun <T> T.easyPrint() = println(this)

fun main() {
    "Hello, world".easyPrint()
}
```

这个时候再返回去看看let的源码

```kotlin
public  fun <T, R> T.let(block: (T) -> R): R {
    return block(this)
}
// 是不是非常一目了然
```

## 扩展属性

![image-20220508172611028](/images/Android/03-Kotlin-OOP/image-20220508172611028.png)

```kotlin
val String.NumVowels
    get() = this.length

fun <T> T.easyPrint() = println(this)

fun main() {
    "Hello".NumVowels.easyPrint()
}
```

### 可空类型扩展和infix

![image-20220508172823607](/images/Android/03-Kotlin-OOP/image-20220508172823607.png)

```kotlin
infix fun String?.printWithDefault(default: String) = println(this ?: default)

fun main() {
    val MyStr: String? = null
    MyStr.printWithDefault("Hello")
}
```

那么这个infix有什么用呢？

它可以用于有单个参数的扩展类和函数，可以让我们**省略括号和点**，例如上方的代码还能改成这样

```kotlin {8}
infix fun String?.printWithDefault(default: String) = println(this ?: default)

fun main() {
    val MyStr: String? = null
//    before
    MyStr.printWithDefault("Hello")
//    after
    MyStr printWithDefault "Hello"
}
```

## 在不同的文件之间调用扩展和重命名扩展

![image-20220508173420097](/images/Android/03-Kotlin-OOP/image-20220508173420097.png)

重命名就加个as即可

![image-20220508173446595](/images/Android/03-Kotlin-OOP/image-20220508173446595.png)

![image-20220508173537833](/images/Android/03-Kotlin-OOP/image-20220508173537833.png)



## 内置注解

### @JvmName

这个就是指定编译成字节码后Java类的名字

```kotlin
@file:JvmName("MyApplication")

fun main() {
    println("Hello, world!")
}
```

编译后

```kotlin
@JvmName(
   name = "MyApplication"
)
public final class MyApplication {
   public static final void main() {
      String var0 = "Hello, world!";
      System.out.println(var0);
   }

   // $FF: synthetic method
   public static void main(String[] var0) {
      main();
   }
}

```

### @JvmField

![image-20220508174430506](/images/Android/03-Kotlin-OOP/image-20220508174430506.png)

没太大用途的注解，相当于是把某一个属性public了

### @JvmOverload

![image-20220508174543654](/images/Android/03-Kotlin-OOP/image-20220508174543654.png)

### @JvmStatic

![image-20220508174603069](/images/Android/03-Kotlin-OOP/image-20220508174603069.png)



### @Throws

![image-20220508174645345](/images/Android/03-Kotlin-OOP/image-20220508174645345.png)

