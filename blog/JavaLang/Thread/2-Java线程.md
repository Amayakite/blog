---
title: 2-Java线程
date: 2022-1-15 16:12:30
category: Thread
tag:
- Java
- JavaSE
- Thread
---

## 创建和运行线程

### 方法一直接使用Thread

非常简单，只需要实现run方法即可，然后创建线程对象，并调用start方法即可。

```java
import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "c.testThread")
public class MyThread extends Thread {
    public void run() {
//        创建线程对象，并重写run方法，这个之前已经看腻了
        Thread t = new Thread(() -> log.info("这是线程的run方法"));
//        指定线程名称
        t.setName("我是线程1");
//        启动线程
        t.start();

        log.debug("主线程");
    }
}
```

### 方法二使用Runnable配合Thread

把*线程*和*任务*(要执行的代码分开)

- Thread代表线程
- Runnable可运行的任务（线程要执行的代码）

```java
public class MyThread {
    public static void main(String[] args) {
        Runnable runnable = () -> {
//                要执行的任务
        };
//        创建线程对象 并指定名称
        Thread t = new Thread(runnable, "我是线程1");
//        启动线程
        t.start();
    }
}
```

当然，我们可以用`lambda`表达式来精简代码

```java
public class MyThread {
    public static void main(String[] args) {
        new Thread(() -> System.out.println("这是线程的run方法"), "我是线程1").start();
    }
}
```

### 方法三FutureTask配合Thread

`FutureTask`能够接收`Callable`类型的参数，用来处理有返回结果的情况

```java
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.FutureTask;

@Slf4j
public class MyThread {
    public static void main(String[] args) {
        FutureTask<Integer> futureTask = new FutureTask<>(() -> {
            log.debug("Hello");
            return 100;
        });

//        参数1是任务对象，参数2是线程名称
        new Thread(futureTask, "t3").start();

//        主线程阻塞，同步等待task执行完毕的结果
        Integer integer = null;
        try {
            integer = futureTask.get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        log.debug("结果是：{}", integer);
    }
}
```

运行结果：

```text
16:30:47.991 [t3] DEBUG c.FutureTask - Hello

16:30:47.995 [main] DEBUG c.FutureTask - 结果是：100
```

### 查看进程线程的方法

- Windows

> Windows下，可以使用`tasklist`查看进程线程, 但是这个命令不能查看到线程的状态,可以使用`tasklist /FI "STATUS eq RUNNING"`来查看进程线程的状态
>
> 可以使用`taskkill`来杀死进程

- Linux

> Linux下，可以使用`ps -ef`查看进程线程, 但是这个命令不能查看到线程的状态,可以使用`ps -ef | grep java`来查看进程线程的状态
>
> 可以使用`kill -9`来杀死进程
>
> 可以使用`top`命令来动态的查看线程的目前状态
>
> 可以使用`top`按大写H切换是否显示进程，`top -H -p <PID>`查看某个进程(PID)的所有信息

- Java

> Java可以使用`jps`查看所有Java进程
>
> `jstack <PID>` 用来看某个Java进程(PID)的所有线程状态(只能抓取这个瞬间的快照)
>
> `jconsole` 来查看某个java进程中线程的运行情况(图形页面 之前用过这里就不做说明了)

## 原理之线程运行

### 栈与栈帧

Java Virtual Machine Stacks(Java虚拟栈)

在JVM中，由堆、栈、方法区所组成，其中栈内存是给谁用的呢？其实就是给线程用的， 每个线程启动后，虚拟机就会为其分配一块栈内存

- 每个栈由多个栈帧(Frame)组成，对应每次方法调用所占的内存
- 每个线程只能有一个活动栈帧，对应着当前正在执行的那个方法

为了更好地了解这个内容，我们来写一写代码

```java {6}
import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "c.MyThread")
public class MyThread {
    public static void main(String[] args) {
        method1(10);
    }

    private static void method1(int x) {
        int y = x + 1;
        Object method2 = method2();
        System.out.println(method2);
    }

    private static Object method2() {
        Object o = new Object();
        return o;
    }

}
```

接着，我们在main方法上打debug，然后看看内容

首先是可以看到x在栈帧内部的值

![栈帧1](/images/JavaThread/2-Java线程/1642237335675.png)

接着能看到y的值

![栈帧2](/images/JavaThread/2-Java线程/1642237476489.png)

继续执行，就可以看到我们的Object被创建出来了，栈帧内同理显示了对应的值

![栈帧3](/images/JavaThread/2-Java线程/1642237536732.png)

可能这样不是特别直观，接下来用图解的方式来说明

- 首先在加载的时候，我们的所有内容都会被加载到方法区

![原理1](/images/JavaThread/2-Java线程/1642237635205.png)

然后我们的main线程启动，并调用method1的画风是这样的

![原理2](/images/JavaThread/2-Java线程/1642237846435.png)

这里的程序计数器是用来记录下一个要执行啥，我们在这一步已经执行完method1的main中的method方法，接下来要调用method中的对应方法

![原理3](/images/JavaThread/2-Java线程/1642237953000.png)

自此，已经执行完毕method1内的`int y = x +1;`接下来要执行它之中调用method2的方法

![原理4](/images/JavaThread/2-Java线程/1642238083279.png)

在method2被调用完毕后，它这里面的内存就没啥用了，因此会被释放掉

![原理5](/images/JavaThread/2-Java线程/1642238125268.png)

接下来是执行打印，打印完毕后，我们的method1也完成了，它的内存也会被释放掉

![原理6](/images/JavaThread/2-Java线程/1642238196793.png)

接下来主方法也没啥要做的，自此程序结束

### 线程的上下文切换(Thread Context Switch)

因为如下原因导致CPU不再执行当前线程，转而执行另一个线程的代码

- 线程的CPU时间用完
- 垃圾回收
- 有更高优先级的线程需要运行
- 线程自己调用了
    - `sleep`
    - `yield`
    - `wait`
    - `join`
    - `park`
    - `synchronized`
    - `lock`
    - 等相关方法

当Thread Context Switch发生时，需要由操作系统保存当前线程状态，并恢复另一个线程的状态，Java中对应的概念就是程序计数器(Program Counter Register)，
它的作用是记住下一条JVM指令的执行地址，是线程私有的

- 状态程序包括程序计数器，虚拟机栈内存中的每个栈帧信息，如局部变量、操作数栈、返回地址等
- Context Switch频繁发生会影响性能

![Context Switch](/images/JavaThread/2-Java线程/1642238680325.png)

## 线程的方法

### 常用方法一览

|      方法名      | static         | 功能说明                                       | 注意                                                                                                                                                                                                   |
| :--------------: | :------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     start()      | 启动一个新线程 | 启动一个新线程，在新的线程 运行run方法中的代码 | start 方法只是让线程进入就绪，里面代码不一定立刻 运行（CPU 的时间片还没分给它）。<br/>每个线程对象的 start方法只能调用一次，如果调用了多次会出现IllegalThreadStateException                            |
|      run()       |                | 新线程启动后会调用的方法                       | 如果在构造 Thread 对象时传递了 Runnable 参数，则线程启动后会调用 Runnable 中的 run 方法，否则默 认不执行任何操作。但可以创建 Thread 的子类对象， 来覆盖默认行为                                        |
|      join()      |                | 等待线程运行结束 join(long n)                  | 等待线程运行结 束,最多等待 n 毫秒                                                                                                                                                                      |
|     getId()      |                | 获取线程长整型的 id                            | id是唯一的                                                                                                                                                                                             |
|    getName()     |                | 获取线程名                                     |                                                                                                                                                                                                        |
| setName(String)  |                | 修改线程名                                     |                                                                                                                                                                                                        |
|  getPriority()   |                | 获取线程优先级                                 |                                                                                                                                                                                                        |
| setPriority(int) |                | 修改线程优先级                                 | java中规定线程优先级是1~10 的整数，较大的优先级 能提高该线程被 CPU 调度的机率                                                                                                                          |
|    getState()    |                | 获取线程状态 Java 中线程状态                   | Java 中线程状态是用 6 个 enum 表示，分别为：<br />`NEW`<br />`RUNNABLE`<br />`BLOCKEDWAITING`<br />`TIMED_WAITING`<br />`TERMINATED`                                                                   |
| isInterrupted()  |                | 判断是否被打断                                 | 不会清除打断标记                                                                                                                                                                                       |
|   interrupt()    |                | 打断线程                                       | 如果被打断线程正在 sleep，wait，join状态下 <br />会导致被打断的线程抛出 InterruptedException，并清除 打断标记<br />如果打断的正在运行的线程，则会设置打断标记<br />park 的线程被打断，也会设置打断标记 |
|  interrupted()   | static         | 判断当前线程是否被打断                         | 会清除打断标记                                                                                                                                                                                         |
|    isAlive()     |                | 线程是否存活                                   | 判断是否还没有运行完毕                                                                                                                                                                                 |
| currentThread()  | static         | 获取当前正在执行的线程                         |                                                                                                                                                                                                        |
|  sleep(long n)   | static         | 让当前执行的线 程休眠n毫秒                     | 休眠时让出cpu的时间片给其它线程                                                                                                                                                                        |
|     yield()      | static         | 提示线程调度器 让出当前线程对 CPU的使用        | 主要是为了测试和调试 不一定成功                                                                                                                                                                        |

### Sleep

1. 调用Sleep会让当前线程从Running进入Time Waiting状态
2. 其他线程可以使用`interrupt`方法打断正在睡眠的线程，这时sleep会抛出`InterruptedException`
3. 睡眠结束后的线程未必能立刻得到执行
4. 建议用`TimeUnit`的`sleep`代替`Thread.sleep`来获取更好的可读性

> 实例

```java
package com.Project.thread;

import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "c.MyThread")
public class MyThread {
    public static void main(String[] args) {

        Thread myThread = new Thread(() -> {
            String name = Thread.currentThread().getName();
            log.info("{}Start!", name);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                log.warn("{}Interrupted!", name);
            }
            log.info("{}End!", name);
        }, "MyThread");

        myThread.start();
        log.info("主线程启动，开始执行打断");
        myThread.interrupt();
    }
}
```

结果：

```text
17:50:13.539 [MyThread] INFO c.MyThread - MyThreadStart!

17:50:13.539 [main] INFO c.MyThread - 主线程启动，开始执行打断

17:50:13.542 [MyThread] WARN c.MyThread - MyThreadInterrupted!

17:50:13.542 [MyThread] INFO c.MyThread - MyThreadEnd!
```

当然，我们可以通过`TimeUnit`来更优雅的休眠

```java {11-12}
import lombok.extern.slf4j.Slf4j;
import java.util.concurrent.TimeUnit;

@Slf4j(topic = "c.MyThread")
public class MyThread {
    public static void main(String[] args) {
        Thread myThread = new Thread(() -> {
            String name = Thread.currentThread().getName();
            log.info("{}Start!", name);
            try {
//                这里是 延迟两秒 更美观
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                log.warn("{}Interrupted!", name);
            }
            log.info("{}End!", name);
        }, "MyThread");

        myThread.start();
        log.info("主线程启动，开始执行打断");
        myThread.interrupt();
    }
}
```

### Yield

1. 调用yield会让当前线程从running状态进入到Runnable状态，然后调度器执行其他线程
2. 礼让，不一定成功，具体地实现由CPU来决定

```java
public class MyThread {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("子线程开始");
            Thread.yield();
            System.out.println("子线程继续运行");
        });
        thread.start();
        System.out.println("主线程启动");
    }
}
```

### 线程优先级

- 线程优先级会提示(hint)调度器会优先调度该线程，但它仅仅只是一个提示，调度区(CPU)可以忽略它
- 如果CPU比较忙，那么优先级高的线程将会获取更多的时间片，但CPU闲暇的时候，这玩意没有任何作用
- 比较不靠谱，一般情况下用的也比较少

> 例子

```java
import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "c.Async")
public class TestHint {
    public static void main(String[] args) {
        Runnable task1 = () -> {
            int count = 0;
            do {
                log.info("Thread1====>{}", ++count);
            } while (count < 100);
        };
        Runnable task2 = () -> {
            int count = 0;
            do {
                log.info("-------------Thread2====>{}", ++count);
            } while (count < 100);
        };
        new Thread(task1).start();
        new Thread(task2).start();

    }
}
```

正常情况下他们两应该是差不多的时间执行完毕，你可以在Thread2内加一个`Thread.yield()`来手动让出查看效果，这里我就不演示了

或者说通过设定线程优先级的方式，来让我们的Thread2优先执行

```java {21-22}
import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "c.Async")
public class TestHint {
    public static void main(String[] args) {
        Runnable task1 = () -> {
            int count = 0;
            do {
                log.info("Thread1====>{}", ++count);
            } while (count < 100);
        };
        Runnable task2 = () -> {
            int count = 0;
            do {
                log.info("-------------Thread2====>{}", ++count);
            } while (count < 100);
        };
        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);

        thread1.setPriority(Thread.MIN_PRIORITY);
        thread2.setPriority(Thread.MAX_PRIORITY);
        thread1.start();
        thread2.start();

    }
}
```

这里很明显地能看到，线程2比线程1早了一大堆数值提前完成内容

![Thread](/images/JavaThread/2-Java线程/1642241640367.png)

### join

我们现在有如下代码

```java
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.TimeUnit;

@Slf4j(topic = "c.MyThread")
public class MyThread {

    private static int i = 0;

    public static void main(String[] args) {

        new Thread(() -> {
            log.info("子线程启动了");
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            i = 10;
            log.info("子线程结束了");
        }).start();

        log.info("主线程启动了");
        log.info("i的值为：{}", i);
    }
}

```

运行结果是非常显而易见的，主线程最终获取到的i的值为0，因为子线程休眠1秒，要1秒后才能取到数据

那如果我想要主线程获取到最行的值呢？目前有两种解决方法

- 主线程也用Thread.sleep，但是这样的话耦合性就太高了，因为我们并不知道我子线程执行到底要多少时间...
- 所以就可以用上join了
    - join：让当前线程等待某个线程执行完毕，也就是阻塞

代码：

```java {23}
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.TimeUnit;

@Slf4j(topic = "c.MyThread")
public class MyThread {

    private static int i = 0;

    public static void main(String[] args) throws InterruptedException {

        Thread thread = new Thread(() -> {
            log.info("子线程启动了");
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            i = 10;
            log.info("子线程结束了");
        });
        thread.start();
        thread.join();
        log.info("主线程启动了");
        log.info("i的值为：{}", i);
    }
}

```

最终结果：

```text
18:33:31.859 [Thread-0] INFO c.MyThread - 子线程启动了
18:33:32.874 [Thread-0] INFO c.MyThread - 子线程结束了
18:33:32.874 [main] INFO c.MyThread - 主线程启动了
18:33:32.874 [main] INFO c.MyThread - i的值为：10
```

### Join的应用实例：同步应用

我们实际开发过程中，往往会遇到一堆线程需要同步的，这里简单演示下，如何使用join更高效的完成线程同步

```java
package com.Project.thread;

import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.TimeUnit;

@Slf4j(topic = "c.MyThread")
public class MyThread {

    private static int i = 0;

    public static void main(String[] args) throws InterruptedException {

        Thread thread1 = new Thread(() -> {
            log.info("{}启动了", Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            i = 10;
            log.info("{}结束了", Thread.currentThread().getName());
        }, "thread1");

        Thread thread2 = new Thread(() -> {
            log.info("{}启动了", Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            i = 20;
            log.info("{}结束了", Thread.currentThread().getName());
        }, "thread2");
        thread1.start();
        thread2.start();
        long startTime = System.currentTimeMillis();
        thread1.join();
        thread2.join();
        log.info("主线程启动了");
        log.info("i的值为：{}", i);
        log.info("主线程结束了，耗时：{}ms", System.currentTimeMillis() - startTime);
    }
}
```

你觉得主线程的耗时是多少呢？现在无非就两个选择，2s和3s，接下来看看实际情况

```text
18:47:28.266 [thread1] INFO c.MyThread - thread1启动了
18:47:28.266 [thread2] INFO c.MyThread - thread2启动了
18:47:29.279 [thread1] INFO c.MyThread - thread1结束了
18:47:30.277 [thread2] INFO c.MyThread - thread2结束了
18:47:30.278 [main] INFO c.MyThread - 主线程启动了
18:47:30.278 [main] INFO c.MyThread - i的值为：20
 结果不出意外的是2s
18:47:30.278 [main] INFO c.MyThread - 主线程结束了，耗时：2014ms
```

也就是

![ThreadJoin](/images/JavaThread/2-Java线程/1642243700670.png)

### Join设定最大时间

语法：`thread实例对象.join(毫秒数)`即可，如果说超过了时间，就不等了，继续运行当前线程（join不会打断线程）

### interrupt打断阻塞中的sleep、wait、join的线程

如果说打断阻塞状态的线程，会触发线程内部的InterruptedException异常抛出

这里以sleep为例

```java

@Slf4j(topic = "c.MyThread")
public class MyThread {

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                TimeUnit.SECONDS.sleep(100);
                log.info("子线程正常执行结束");
            } catch (InterruptedException e) {
                log.info("子线程执行异常，{}", e.getMessage());
            }
        });
        thread.start();
//        主线程睡一会儿，防止子线程还没有进入sleep就打断了
        Thread.sleep(1000);
        thread.interrupt();
        log.debug("打断状态：{}", thread.isInterrupted());
    }
}
```

运行结果：

```text
18:59:07.786 [Thread-0] INFO c.MyThread - 子线程执行异常，sleep interrupted
18:59:07.786 [main] DEBUG c.MyThread - 打断状态：false
```

首先 可以知道的是，打断了一个处于阻塞状态的线程，然后获取**打断标记**的时候`thread.isInterrupted()`返回结果为false

相当于可以知道我们这个子线程在被打断后是一个继续运行(没有阻塞的内容)还是说终止(有阻塞内容)的情况

并且，该操作会造成线程内的`InterruptedException`异常触发

### interrupt打断正常的线程

```java

@Slf4j(topic = "c.MyThread")
public class MyThread {

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (true) {
//                DO Nothing
                System.out.println("t1");
            }
        }, "t1");
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
        log.debug("打断状态：{}", thread.isInterrupted());
    }
}
```

可以看到，我们获取到的打断状态为**true**，但是该线程却并没有因此而结束运行，而是一直再运行

```text
9:01:58.559 [main] DEBUG c.MyThread - 打断状态：true
......程序并未停止，因为子线程没有结束，打断不等于将线程结束
```

那么有没有办法让被打断的普通线程停止运行呢？

其实是有的，因为打断标记在我我们调用了打断之后，其值将会变为true(如果没有调用的话则是false)，所以说可以通过这一点来在线程内部做一点事情

```java

@Slf4j(topic = "c.MyThread")
public class MyThread {

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (true) {
//                通过Thead获取当前线程
                boolean interrupted = Thread.currentThread().isInterrupted();
                if (interrupted) {
                    log.info("线程被中断");
                    break;
                }
            }
        }, "t1");
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
        log.debug("打断状态：{}", thread.isInterrupted());
    }
}
```

运行结果：

```text
19:10:37.056 [main] DEBUG c.MyThread - 打断状态：true
19:10:37.056 [t1] INFO c.MyThread - 线程被中断
```

### interrupt实例：两阶段终止模式

> 两阶段种终止模式(Two Phase Termination)
>
> 例如我们想在一个线程T1内优雅地终止T2线程（这里优雅指的是是给T2一个料理后事的机会）

先来看看错误的思路：

1. 使用线程对象的`stop()`方法停止线程
    - stop方法会真正地杀死线程，这个时候如果线程锁住了共享资源，那么它在被杀死后就再也没有机会释放锁，其他线程将永远无法获取锁
2. 使用System.exit(int)方法停止线程
    - 目的仅仅是停止一个线程，如果使用了这个方法，会结束当前的所有线程，让进程终止

再来看看两阶段终止模式

![两阶段终止模式](/images/JavaThread/2-Java线程/1642245490789.png)

实现也是非常地简单，注意这个两阶段终止模式，以后要用的

```java

@Slf4j(topic = "c.MyThread")
public class MyThread {

    public static void main(String[] args) {
        TwoPhaseTermination twoPhaseTermination = new TwoPhaseTermination();
        twoPhaseTermination.start();

        TimeUnit.SECONDS.sleep(5);
        twoPhaseTermination.stop();
    }
}

@Slf4j(topic = "c.TwoPhaseTermination")
class TwoPhaseTermination {
    private Thread monitor;

    /**
     * 启动监控线程
     */
    public void start() {
        monitor = new Thread(() -> {
            while (true) {
                Thread thread = Thread.currentThread();
                log.info("当前线程的打断状态:{}", thread.isInterrupted());
//                获取当前线程的打断状态
                if (thread.isInterrupted()) {
                    log.debug("料理后事");
                    break;
                }
                try {
                    TimeUnit.SECONDS.sleep(1);
                    log.info("执行监控线程");
                } catch (InterruptedException e) {
                    e.printStackTrace();
//                    重新设置打断标记 注意 如果是在睡眠中的线程被打断，将会进入到这个异常内，并且打断标记为false 所以需要手动设置打断标记
//                  如果是在TimeUnit.SECONDS.sleep(1);之外进行了打断，那么打断标记将会被设置为true
//                  在 log.info("执行监控线程");这行代码内也是
                    log.warn("被打断时候打断标记的值是：{}", thread.isInterrupted());
                    thread.interrupt();

                }
            }
        });
        monitor.start();
    }

    /**
     * 停止监控线程
     */
    public void stop() {
        monitor.interrupt();
    }
}
```

运行结果：

![两阶段终止打断模式](/images/JavaThread/2-Java线程/1642246422569.png)

### Thread.isInterrupted和普通的isInterrupted的区别

正常情况下不会直接用`Thread.isInterrupted`而是用`Thread.currentThread().isInterrupted()`，除非你对线程非常熟悉，否则不要直接用

`Thread.isInterrupted`会将当前线程的打断标记清除，清除是什么概念呢？

- 如果当前线程的打断标记为`true`,则用了这个方法后,获取到的值为`true`，同时线程的打断标记将会变为`false`
- 如果当前线程当前的打断标记为`false`,则不变动,获取到的值也为`false`

打断标记的清空与否就是true和false的区别，**如果被打断了就是true，还没有被打断过就是false**

### interrupt打断park线程

park并不是一个基础的玩意，是JUC(之后会学到)中的一个玩意，打断它将不会清空打断状态，这里先简单模拟下，具体的以后再说

```java

@Slf4j(topic = "c.MyThread")
public class MyThread {

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            log.debug("park...");
            LockSupport.park();
            log.debug("unpark.....");
            log.debug("打断状态:{}", Thread.currentThread().isInterrupted());

            LockSupport.park();
            log.debug("unpark.....");
        });
        thread.start();
        TimeUnit.SECONDS.sleep(2);
        thread.interrupt();

    }
}
```

运行结果：

```text
19:50:00.916 [Thread-0] DEBUG c.MyThread - park...
19:50:02.927 [Thread-0] DEBUG c.MyThread - unpark.....
19:50:02.927 [Thread-0] DEBUG c.MyThread - 打断状态:true
19:50:02.930 [Thread-0] DEBUG c.MyThread - unpark.....
```

这个park你可以理解为当当前打断标记为false的时候，他将会阻塞

如果说我们想让第二个`park`正常的阻塞，只需要将他前面的那行代码改成`log.debug("打断状态:{}", Thread.isInterrupted());`

刚刚也说过，`Thread.isInterrupted()`这个方法是会清除打断标记，即获取到true后又将打断标记设置为false，所以说可以让后面的park继续阻塞

### 不推荐使用的方法

| 方法名    | static | 功能说明             |
| --------- | ------ | -------------------- |
| stop()    | false  | 停止线程运行         |
| suspend() | false  | 挂起(暂停)线程的运行 |
| resume()  | false  | 恢复线程运行         |

不推荐使用的原因非常简单，他们都是直接暂停之类的，**会造成对象的锁得不到释放，从而导致线程死锁，程序出问题**

当然他们也都有对应的解决方案，其中`stop`的解决方案就是我们的**两阶段终止模式**，其余的解决方案在之后也都会说明

我们也可以在方法上看到不推荐使用的原因

![不推荐使用的线程方法](/images/JavaThread/2-Java线程/1642247789049.png)

### 主线程和守护线程

默认的情况下，Java进程需要等待所有程序都运行结束，才会结束

当然有一种特殊的线程叫做守护线程，只要其他的非守护线程都结束了，即使守护线程的代码没有执行完毕，也会强制结束

我们先来看下正常情况下的线程

```java

@Slf4j(topic = "c.MyThread")
public class MyThread {

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (true) {
                if (Thread.currentThread().isInterrupted()) {
                    break;
                }
            }
            log.debug("线程{}结束", Thread.currentThread().getName());
        }, "t1");
        thread.start();

        TimeUnit.SECONDS.sleep(1);
        log.debug("主线程结束");
    }
}
```

运行：

![主线程和守护线程1](/images/JavaThread/2-Java线程/1642248115066.png)

可以看到，虽然我们的主线程结束了，但是我们的附属线程t1并没有结束，所以整个Java进程还没有结束

接下来我们用用守护线程

```java {13-14}
public class MyThread {

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (true) {
                if (Thread.currentThread().isInterrupted()) {
                    break;
                }
            }
            log.debug("线程{}结束", Thread.currentThread().getName());
        }, "t1");

//        设置该线程为守护线程
        thread.setDaemon(true);
        thread.start();

        TimeUnit.SECONDS.sleep(1);
        log.debug("主线程结束");
    }
}
```

然后你就能看到

![主线程和守护线程2](/images/JavaThread/2-Java线程/1642248337058.png)

你可以看到，t1方法内的最后一句话没有打印出来，因为他是在循环内直接强制结束的，所以后续的代码也不会继续执行

> 注意

1. 垃圾回收(GC)就是一种守护线程
2. Tomcat中的Accept和Poller线程都是守护线程，所以在tomcat接收到shutdown命令后，不会等待他们处理完成当前请求

### 线程的五种状态

这是从操作系统的角度来看的

![线程的五种状态](/images/JavaThread/2-Java线程/1642248656488.png)

- 【初始状态-NEW】：仅仅是在语言层面创建了线程对象，还未与操作系统线程关联
- 【可运行状态-RUNNABLE】：也就是就绪状态，说明线程准备好了，CPU可以来执行它了
- 【运行状态--RUNNING】：指获取了CPU时间片正在运行中的状态
    - 当CPU时间片用完后，会从【运行状态】转换至【可运行状态】，会导致线程的上下文切换
- 【阻塞状态】
    - 如果调用了阻塞API，例如BIO读写文件，这个时候该线程实际不会用到CPU，会导致线程上下文切换，进入【阻塞状态】
    - 等BIO操作完毕，会由操作系统唤醒阻塞线程，转换至【可运行状态】
- 【终止状态】：表示线程已经运行完毕，生命周期已经结束，不再会转变为其他状态

### 线程的六种状态

这是从Java API层面来描述的，根据`Thread.State`枚举，分为六种状态

![线程的六种状态](/images/JavaThread/2-Java线程/1642249035413.png)

当然这个我们在之前的Java基础中也完完整整的了解过了，这里还是搬出韩顺平老师的那张图片

![线程的完整状态](/images/JavaThread/2-Java线程/Java线程生命周期-16367276068553.svg)

- NEW 线程刚刚被创建的时候，但是还没有调用`start()`方法
- RUNNABLE 当调用了`start()`方法之后，注意，**Java API**层面导致的`RUNNABLE`状态涵盖了操作系统层面的【可运行状态】、【运行状态】和【阻塞状态】（由于BIO导致的线程阻塞，在Java内无法区分，依旧认为是可运行）
- BLOCKED，WAITING，TIMED_WAITING都是**Java API**层面对【阻塞状态】的部分
- TERMINATED 当线程代码运行结束
