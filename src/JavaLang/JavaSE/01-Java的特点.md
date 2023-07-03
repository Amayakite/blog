---
title: 01-Java的特点
date: 2021-10-25 16:25:51
category: JavaSE
tag:
 - Java
 - JavaSE
---
## Java的特点

1. Java是面向对象的(oop)
2. Java语言是健壮性的

   - Java的强类型机制/异常处理/垃圾的自动收集等是Java程序强壮性的重要保障
3. Java语言是跨平台的（利用了底层的JVM虚拟机机制） 简单来说 就是一个编译好的`.class`文件能在多个操作系统上运行

![image-20211029232904556](/images/Java/JavaSE/01-Java的特点/image-20211029232904556.png)

![image-20211025170833865](/images/Java/JavaSE/01-Java的特点/image-20211025170833865.png)

1. Java语言是解释性的

解释性语言：`JavaScript`/`PHP`/`Java`/`Python`等,编译性语言:`C`/`C++`/`C#`/`GoLang`等

解释性语言和编译性语言的区别

- 解释性语言
  - 编译后的代码不能直接被机器执行，需要执行器来执行
- 编译性语言
  - 编译后的代码可以直接被机器执行

## Java开发工具的选择

 刚开始使用的话，建议是用VsCode或者Sublime Text 差不多熟练后再转用IEDA(面试的时候往往都要手搓代码)

## Java运行机制及运行过程

- Java核心机制-Java虚拟机`JVM java virtual machine`
  - 基本介绍
    1. JVM是一个虚拟的计算机，具有指令集并使用不同的存储区域，负责执行命令，管理数据/存储/寄存器，包含在JDK中
    2. 对于不同的平台，有不同的虚拟机
    3. Java虚拟机机制屏蔽了底层运行平台的差别，实现了**一次编译，到处运行**

## 什么是JDK/JRE

### JDK的基本介绍

1. JDK的全程（`Java Development Kit` **Java开发工具包**）
   JDK +JRE+Java的开发工具(Java,JavaC,JavaDoc,Javap等)
2. JDK是提供给Java开发人员使用的，其中包含了Java的开发工具，也包括了Jre，所以安装了JDK，就不用再单独安装Jre了

### JRE基本介绍

1. Jre(`Java Runtime Environment` **Java运行环境**)
   JRE = Jvm+Java核心库[类]
2. 包括Java虚拟机(`JVM java virtual machine`)和Java程序所需的核心类库等，如果想要运行一个开发好的Java程序，计算机中只需要安装JRE即可

## 安装JDK

> 大部分公司使用的都是Jdk1.8,安装的话有两种方法

- 第一个是使用Oracle提供的[Java包](https://www.oracle.com/java/technologies/downloads/#java8)

- 但是我为了便于使用（不想要那烦人的任务栏图标）使用了[OpenJdk](https://developers.redhat.com/products/openjdk/download)

- 关于这两者的[区别](https://blog.csdn.net/longfuhuo/article/details/107561660) 正常商用的话还是安装Oracle的

- 在这一步也可以把JDK11下到来，JDK11包含一些新特性 后续某些项目会用得上

- WIndows安装：现在应该无脑next即可，无需额外配置环境变量

- Linux：

  - ```shell
    # 安装OpenJDk
    # 1.更新软件包列表
    sudo apt-get update
    # 2.安装openjdk-8-jdk
    sudo apt-get install openjdk-8-jdk
    # 3.查看java版本，看看是否安装成功：
    java -version
    ```

  - ```shell
    # 安装oracle Java JDK
    # 1、安装依赖包：
    sudo apt-get install python-software-properties
    # 2、添加仓库源： 这一步应该会在某个时期能省略 先试试能不能直接装吧 不行的话再添加仓库源
    sudo add-apt-repository ppa:webupd8team/java
    # 3、更新软件包列表：
    sudo apt-get update
    #4、安装java JDK：
    sudo apt-get install oracle-java8-installer
    ```
