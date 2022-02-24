---
title: 17-扩展-Lambda表达式
date: 2021-11-13 17:50:31
category: JavaSE
tag:
 - Java
 - JavaSE
 - Lambda
---

## 简要信息

- λ（alt+42699）希腊字母表中的第十一位字符，英语名称为Lambda
- 支持的版本：`JDK8，8+`，是由JDK8开始引入的，使用它设计的代码会更加简洁，通过Lambda表达式，可以替代我们以前经常写的匿名内部类来实现接口，Lambda表达式的本质是一个函数
- 用途:
  - 避免匿名内部类定义过多
  - 其实质属于函数式编程的概念
- 为什么要使用Lambda表达式？
  - 避免匿名内部类定义过多
  - 可以让代码看起来更简洁
  - 去掉了一堆没有意义的代码，只留下核心的逻辑

- 也许刚刚用它的时候，不但不觉得简介，反而觉得更乱了，看不懂，那是因为还没习惯，习惯就好（就和其他语言中的匿名函数，匿名方法一样，刚开始用的时候不习惯，用习惯了习惯用）
- 在正式开始之前，得先了解一些东西
  - `Function Interface`（函数式接口）是lambda表达式的关键所在
  - 函数式接口的定义：
    - 任何接口，如果**只包含唯一一个抽象方法**，那么他就是一个函数式接口
    - 对于函数式接口，可以通过lambda表达式来创建该接口的对象

## 表达式的使用

可能看完上面的会有点懵，但是它使用起来是非常简单的，而且在某些情况下能够节约一大堆敲代码的时间

接下来，使用传统的方法，来实现一个add方法

```java
package com.lambda_;

public class Lambda01 {
    public static void main(String[] args) {
        Cal c = new Cal() {
            @Override
            public int add(int a, int b) {
                return a + b;
            }
        };

        System.out.println(c.add(10, 20));

    }

    interface Cal {
        int add(int a, int b);
    }

}
```

可以看到，当我们想在方法中去创建一个匿名内部类，实现一些方法，还是需要点代码的，虽然在IDEA的加持下，并不需要多长时间，但是这个流程可以通过lambda更加简化:

```java
package com.lambda_;

public class Lambda01 {
    public static void main(String[] args) {
        Cal c = (int a, int b) -> {return a + b;};
        System.out.println(c.add(10, 20));
    }
    interface Cal {
        int add(int a, int b);
    }
}
//效果一样，但是更加简化
```

是不是感觉轻松了不少...如果之前你接触过go/python/JavaScript这类语言，可能立马就会发现，唉这玩意好手熟，name接下来说说他的语法：

`(int a, int b) -> {return a + b;};`

这个本质是还一个函数/方法，一般的函数类似如下：

```java
int add(int a, int b) {
    return a + b;
}
```

有**返回值，方法名，参数列表，方法体**

Lambda表达式函数的话，**只有参数列表、方法体**：

`(参数列表)->{方法体}`

说明:

- `()`用来描述参数列表
- `{}`用来描述方法体
- `->`Lambda运算符，可以叫做箭头符号，或者叫 *goes to*

## Lambda语法细讲

Lambda函数式中语法的可能性并不多（只有六种）

- 无参数无返回值`void test(){}`

  ```java
  interface If1 {
      /**
      * 无参数无返回值
      */
      void test();
  }
  main{
      If1 if1 = () -> {
          System.out.println("Hello world");
      };
      if1.test();
  }
  //其他的同理 但要注意的是，Lambda实现识别接口中只能有一个方法...
  //如果我在If1中多定义了一个方法
  interface If1{
      void test();
      int orun();
  }
  // 那就会报错...所以说这玩意目前而言是有些鸡肋的
  ```

- 无参数有返回值`test(){return XXX}`

- 单个参数无返回值`void test(T t){ }`

- 多个参数无返回值`void test(T t,E e...){}`

- 单个参数有返回值`void test(T t){ return xxx}`

- 多个参数有返回值`void test(T t,E e...){ return xxx}`

## 进一步精简语法

以下情况， 可以再进一步的精简语法

1. 参数类型可以忽略

   ```java
   interface If1{
    void test(int a);
   }
   main(){
       //把int省略了
       If1 if = (a)->{System.out.println(a)};
   }
   ```

2. 如果**只有一个**参数，`()`可以省略

   ```java
   If1 if = a ->{System.out.println(a)};
   ```

3. 如果方法只有一条语句,`{}`可以省略

   ```java
   If1 if = a ->System.out.println(a);
   ```

4. 如果方法中的一条语句是`return`返回语句，那么**省略大括号的同时**`return`语句也**也要**省略

   ```java
   interface If2{
    int test(int number);
   }
   main(){
       If2 if = a->a*5;
   }
   ```

## 方法引用

有时候多个lambda表达式实现函数是一样的，我们可以封装成通用方法，以便于维护

这时候可以用方法引用实现

语法是：`对象::方法`

假如是`static`方法，可以直接`类名::方法`

可能看着会有点懵逼，接下来用实例演示下：

```java
package com.lambda_;

public class Lambda02 {
    public static void main(String[] args) {

//        比方说有一个业务就是实现a-2
        If1 if1 = a -> a - 2;
        System.out.println(if1.test(10));//8

//        假设又有个地方又整了个这个出来，并且他们两的业务逻辑一模一样：
//        就可以通过方法引用的方式来简化
//        If1 if2 =a->a-2;
        If1 if2 = new Lambda02()::test; //简写，可以拆分为：
        Lambda02 lambda02 = new Lambda02();
        If1 if3 = lambda02::test;

        System.out.println(if2.test(555)); //553
        System.out.println(if3.test(666)); //664

//        如果是静态的，实例也不用new了:
        If1 if4 = Lambda02::NumberTT;
        System.out.println(if4.test(66));//64

    }

    //    定义函数
    public int test(int a) {
        return a - 2;
    }

    //    静态
    public static int NumberTT(int a) {
        return a - 2;
    }

    interface If1 {
        /**
         * 单个参数有返回值
         *
         * @param a number
         * @return number
         */
        int test(int a);

    }

}
```

## 构造方法引用

如果函数式的接口刚好可以通过调用一个类的构造方法来实现，那么就可以使用构造方法引用

语法：`类名::new`

实例：

其实非常简单...

```java
package com.lambda_;

public class Lambda03 {
    public static void main(String[] args) {
//        传统的方法来创建：
        DogService1 dog = () -> new Dog();
        System.out.println(dog.getDog() ); //Dog{name='null', age=0}

//        使用lambda构造方法引用：
        DogService1 dog1 = Dog::new;
        System.out.println(dog1.getDog());//Dog{name='null', age=0}
//        有参：
        DogService2 dog2 = Dog::new;
        System.out.println(dog2.getDog("张三",111));//Dog{name='张三', age=111}
    }
}

//定义两个接口
interface DogService1 {
    Dog getDog();
}

interface DogService2 {
    Dog getDog(String name, int age);
}

class Dog {
    private String name;
    private int age;

    public Dog(String name, int age) {
        System.out.println("有参构造方法");
        this.name = name;
        this.age = age;
    }

    public Dog() {
        System.out.println("无参构造方法");
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}
```

## Lambda的实际应用

比如说：要在一个`ArrayList`中添加一大堆对象...然后排个序

```java
package com.lambda_;

import com.sun.org.apache.bcel.internal.generic.NEW;

import java.util.ArrayList;
import java.util.Comparator;

public class Lambda03 {
    public static void main(String[] args) {
        ArrayList<Dog> dogs = new ArrayList<>();
        DogService2 getDog = Dog::new;
        dogs.add(getDog.getDog("小兰", 1));
        dogs.add(getDog.getDog("小黄", 2));
        dogs.add(getDog.getDog("小白", 88));
        dogs.add(getDog.getDog("小绿", 4));
        dogs.add(getDog.getDog("小紫", 55));
        dogs.add(getDog.getDog("小黑", 6));
//        再来排个序:  原本的排序需要这样：
//        dogs.sort(new Comparator<Dog>() {
//            @Override
//            public int compare(Dog o1, Dog o2) {
//                 return o2.getAge()- o1.getAge();
//            }
//        });
        dogs.sort((o1, o2) -> {
            return o2.getAge() - o1.getAge();
        });
//        再度简化就是：
        dogs.sort((o1, o2) -> o2.getAge() - o1.getAge());
        System.out.println(dogs);
//        然后还可以通过lambda来方便遍历：
        dogs.forEach(System.out::println);
    }
}

//定义两个接口
interface DogService1 {
    Dog getDog();
}

interface DogService2 {
    Dog getDog(String name, int age);
}

class Dog {
    private String name;
    private int age;

    public Dog(String name, int age) {
        System.out.println("有参构造方法");
        this.name = name;
        this.age = age;
    }

    public Dog() {
        System.out.println("无参构造方法");
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}
```

## @FunctionallInterface注解

首先打开`Comparator`源码，可以看到里面有个这玩意：

```java
@FunctionalInterface
public interface Comparator<T> {...}
```

这个注解是函数式注解，所谓的函数式接口，当然首先是一个接口，其次这个接口里面**只能有一个**抽象方法

这种接口类型也称为`SAM`接口：`Single Abstract Method interface`

特点：

- 接口只允许有一个抽象方法
- 运行定义静态方法
- 运行定义默认方法
- 允许`java.lang.Object`中的`public`方法
- 改注解不是必须的，如果一个接口符合**函数式接口**的话，加不加抖无所谓，加上这玩意是让编译器更好的检查（就跟`@Override`和`@SuppressWarnings({"all"})`）一样，加不加抖无所谓，但是如果不符合函数式接口，并且加上了`@FunctionallInterface`接口的话，编译器就会报错

```java
@FunctionalInterface
interface DogService2 {
    //    一个抽象的方法
    Dog getDog(String name, int age);

    //    n个Object类提供的方法

    boolean equals(Object o1);

    String toString();

    //    默认方法
    default void defaultMetod() {
        //DO Nothing
    }

    //    静态方法:
    static void StaticMetod() {
        System.out.println("hello world");
    }
}
//这样编译器是可以正常通过的，且lambda表达式也可以正常调用
```

### Java内置函数式接口

看看[这篇文章](https://blog.csdn.net/m2606707610/article/details/83754507)，用的也不多，基本上都是自己实现
