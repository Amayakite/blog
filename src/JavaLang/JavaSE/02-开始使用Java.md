---
title: 02-开始使用Java
date: 2021-10-25 17:47:29
category: JavaSE
tag:
 - Java
 - JavaSE
---

# 开始使用Java

## 第一个程序-HelloWorld

> 随便找个文件夹 创建个文件`_001helloWorld.java`然后使用Sublime打开它

```java
// _001helloWorld.java
// 这是Java的快速入门,演示Java的开发步骤
// 对代码的相关说明
// 1.public class _001helloWorld 表示_001helloWorld是一个类，一个public公有类
// 2.public static void main(String[] args) 表示程序的入口（主方法）
// 3.main{} 表示方法的开始和结束
// 4. System.out.println("Hello world") 表示输出Hello world到屏幕上
// 5. Java要求所有语句都得加分号;
public class _001helloWorld{
 public static void main(String[] args){
  System.out.println("Hello world");
 }
}
```

运行：

​ 首先在sublime中安装好Pluginstall，然后进行以下操作

- 按`Ctrl+Shift+P` 调出控制面板，这之中找到PluginStall 按回车 然后输入`ConvertToUTF8`安装，就可以在`文件`-`set File Encoding To`中找到GKB编码 选中改编码并保存，然后打开cmd或者power shell 或者终端开始操作

```powershell
javac .\_001helloWorld.java
java _001helloWorld # 注意 这里不能带有后缀或者路径名什么的
```

![image-20211025174538882](/images/Java/JavaSE/02-开始使用Java/image-20211025174538882.png)

### 刚刚发生了什么？

- 什么是编译`javac .\_001helloWorld.java`
  1. 有了Java文件 可以通过编译器将其编译成JVM可以识别的字节码文件
  2. 在该源文件目录下，通过JavaC编译工具对`_001helloWorld.java`进行编译
  3. 如果程序没有错误则不会产生任何提示，并且会在当前的目录下生成一个`_001helloWorld.java`的文件，该文件被称为字节码文件，也是可以执行的Java程序
  4. 也就是说，Java真正执行的是`.class`文件，跟`.java`源文件没有任何关系
  5. 如果程序本身有错误则会抛出异常
- 什么是运行
  1. 有了可执行的Java程序(`_001helloWorld.class`字节码文件)
  2. 通过运行工具`java.exe`对字节码文件进行执行，本质就是.class装载到JVM去执行
- Java开发注意事项
  - 对修改后的HelloWorld.java源文件需要重新编译，生成新的.class文件后，再进行执行才能生效

> 自此 第一个程序HelloWorld运行完毕
>
> tips:小练：使用Java开发一个带有你名字的控制带程序：例如`YouName` 开始使用了Java

### 补充：Java开发注意事项和细节说明

1. Java源文件以`.java`为扩展名，源文件的基本组成部分是类(Class)，如本类中的`_001helloWorld`类

2. Java应用程序的执行入口是main方法，他有固定的书写格式
   `public static void main(String[] args){...}`

3. Java语言**严格区分大小写**

4. Java方法都有一条条语句构成，每个语句以`;`结束

5. 大括号都是成对出现的，**缺一不可**

6. 一个源文件中最多包含一个`public`类，其他的类**个数不限**

7. 如果源文件中包含一个Public类，**则文件名必须按照该类命名命名**

8. 一个源文件中最多只能有个Public类，其他类的个数不限，也可以将`main`方法写在非public类中，然后指定运行非public类，这样入口方法就是非public的`main`方法，例如

   ```java
   // _001helloWorld.java
   public class _001helloWorld{
    public static void main(String[] args){
     System.out.println("Hello world");
    }
   }
   
   class Person{
    public static void main(String[] args){
     System.out.println("Hello This is Person");
    }
   }
   ```

   然后回到控制台，执行`javac .\_001helloWorld.java`，就能得到两个文件：`_001helloWorld.class`与`Person.class`,如果想要运行Person只需要`java Person` 即可

   ![image-20211025181532560](/images/Java/JavaSE/02-开始使用Java/image-20211025181532560.png)

### 扩展：如何更方便的学习Java

> EMM 这篇文章应该只有我看吧，大概率没有别人看了，所以主要是写给我自己看的

​  因为我有**需求**：我想跳槽，跳出目前这个技能池能干的事情的鱼潭，我想通过这门技术方便我以后吃饭，睡觉，游玩，并且我也接触电脑这么多年了（玩电脑），想实际变现，毕竟也20岁一个人了，老大不小了

​  因为有过JavaScript的经验和Typescript的经验，Java目前来说并没有太大难度

​  如果你正巧是跟我一样有过其他语言经验的，那Java对你来说并不会太难

​  如果你没有的话，我个人建议你去网上跟着教程从零开始学习，而非看着我这些文章。

在学习Java时，主要以了解技术的基本原理和基本语法为主，除非必要，不然不要去考虑细节（不要扣细节）

​  简单来说，互联网方向的知识点都是网状知识，环环相套，扣细节很容易迷失在网中

​  因此需要先做到会用，同时保持思考和疑惑，建立自己的知识网，就自然明白道理了

- 首先是入门（基本程序，CRUD）
- 然后才是开始研究技术的注意事项，使用细节，使用规范，如何优化，优化是没有止境的(**尤其在多线程，高并发上**)多线程和高并发是决定工资的玩意

## 转义符，让文本之间可以高校换行

> 什么是转义字符？
>
> Java 中 某些东西是不能直接输出来的，
>
> 例如`System.out.println("你好，我是张三你好，我是李四");`我想让这两句话中间换个行，但是又不想多打一遍sout(`System.out.println`，以下统一简称sout)
>
> 又或者我想在sout中输出`"`或者`"`，这些你直接在sout中使用大概率是会报错的~
>
> 所以就需要用到转义符

该如何使用转义符？

```java
//_002ChangeChar.java
// 演示转义字符的使用
public class _002ChangeChar{
 public static void main(String[] args){
  // \t 制表符 可以理解成键盘上的Tab键，实现对其用的
  System.out.println("北京\t天津\t上海");
  // \n 换行符，在Linux上是\r,一般情况下来说两个都用上都行
  // Windows智能识别\n Linux只能识别\r
  System.out.println("你好，我是张三\r\n你好，我是李四");
  // 如果想输入一个"\" 只要\\这样即可
  System.out.println("我想打出一个\\\"\'");
  // \"  \'  同上
 }
}
```

最终输出

```shell
javac .\_002ChangeChar.java
java _002ChangeChar
# 输出结果：
北京    天津    上海
你好，我是张三
你好，我是李四
我想打出一个\"'
```

### 扩展：初学Java容易犯的错误

1. 找不到文件

   ```shell
   D:\JavaStudy\01-基础知识> javac .\_002ChangeChar2.java
   javac: 找不到文件: .\_002ChangeChar2.java
   用法: javac <options> <source files>
   -help 用于列出可能的选项
   ```

   解决：源文件名不存在或者写错，或者当前路径错误

2. 主类名和文件名不一致
   解决方法，声明的public主类应与文件名一致，否则文件编译失败

3. 缺少分号：你觉得呢？

## 注释

> 用于注解说明程序的文字就是注释，注释提高了代码的阅读性（可读性）
>
> 注释是一个程序员必须有的良好编程习惯
>
> 将自己的思想通过注释先整理出来，再用代码去体现

1. 单行注释：两个`//`后面跟着的内容就是注释

2. 多行注释：`/**/` 里面包含注释内容

3. 文档注释

   ```java
   //这里就是文档注释 文档注释中@author表示作者名 @version 表示版本号
   /**
    * @author Amayakite
    * @version 0.1.0 
    * 
    */
   public class _002ChangeChar{
    public static void main(String[] args){
     // \t 制表符 可以理解成键盘上的Tab键，实现对其用的
     System.out.println("北京\t天津\t上海");
     // \n 换行符，在Linux上是\r,一般情况下来说两个都用上都行
     // Windows智能识别\n Linux只能识别\r
     System.out.println("你好，我是张三\r\n你好，我是李四");
     // 如果想输入一个"\" 只要\\这样即可
     System.out.println("我想打出一个\\\" \'");
     // \"  \'  同上
    }
    /**
     * 
     * @param a 一个数值
     * @param b 第二个数值
     * @return A+B
     */
    public int add(int a,int b){
     return a+b;
    }
   }
   ```

   有了文档注释的文件可以通过JavaDoc生成注释文件

   例如上面这个文件 就可以通过:

   ```shell
   javadoc -d d:\\temp -author -version _002ChangeChar.java
   #可以通过这行命令在D:\\temp目录下生成注释文件
   ```

   ![image-20211025190340940](/images/Java/JavaSE/02-开始使用Java/image-20211025190340940.png)

   进入该目录，点开index.html即可查看注释中的内容

### 补充：Java代码规范

1. 类，方法的注释，要以javadoc的方式来写
2. 非Java Doc的注释，往往是给代码的维护者来看的，着重告诉维护者为什么要这样写，如何修改，注意什么问题等
3. 使用tab操作，实现整体缩进，默认整体向右边移动，时候使用`shift+tab`整体向左移
4. 使用运算符和 = 两边习惯性的各家一个空格，比如：`2 + 4 + * 5 + 345 - 89`
5. 源文件使用`UTF-8`编码(截止至IEDA前这里所写的代码是因为cmd的原因导致设置成GBK)
6. 行宽度不要超过80个字符
7. 代码编写次行风格和行尾风格，推荐使用行尾风格
8. 实际开发过程中建议参照：《阿里巴巴Java开发手册》

## 本章作业

1. 编写一个Hello World的程序`HomeWork.java`
2. 将个人的基本信息（姓名，性别，籍贯，地址）打印到控制台上面，各条信息各占一行
3. 口述一下JDK，JRE，JVM的关系

> 答案

1. ```java
   /**
    * @author Amyakite
    * @version 0.0.1
    */
   public class _003HomeWork{
    public static void main(String[] args){
     System.out.println(
      "姓名：Amayakite\n"+
      "性别：男\n"+
      "籍贯：中国\n"+
      "地址：...."
     ); 
    }
   }
   ```
