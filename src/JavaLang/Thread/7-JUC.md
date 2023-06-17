---
title: 7-JUC
date: 2022-1-18 15:52:30
category: Thread
tag:
- Java
- JavaSE
- Thread
---

## JUC概述

这玩意是这个`java.util.concurrent`包的简称，是Java给我们提供的一个并发编程的工具包。

里面有非常多的工具类

## AQS

为什么要先说这个？它是一个抽象的接口`java.util.concurrent.locks.AbstractQueuedSynchronizer`。

翻译过来就是阻塞式锁和相关同步器工具的框架

其他工具都是基于它来实现的

- 用state来表示资源的状态(分为独享模式和共享模式)，子类需要定义和维护这个状态，控制如何获取锁和释放锁
    - getState()-获取状态
    - setState(int newState)-设置状态
    - compareAndSetState(int expect, int update)-比较状态，如果相等就更新状态
    - 独占模式是只有一个线程能获取锁，共享模式是多个线程能获取锁
- 提供了基于FIFO的等待队列，类似于Monitor的EntryList
- 条件变量来实现等待、唤醒机制，支持多个条件变量，类似于Monitor的WaitSet

子类需要实现如下方法（默认抛出UnsupportedOperationException）

- tryAcquire(int acquires)：尝试获取锁，如果成功返回true，否则返回false
- tryRelease(int releases)：尝试释放锁，如果成功返回true，否则返回false
- tryAcquireShared(int acquires)：尝试获取共享锁，如果成功返回true，否则返回false
- tryReleaseShared(int releases)：尝试释放共享锁，如果成功返回true，否则返回false
- isHeldExclusively()：检查是否已经获取锁
- acquireQueued(Thread t, int arg)：当获取锁失败时，将线程加入等待队列
- releaseQueued(Thread t, int arg)：当释放锁失败时，将线程从等待队列中移除
- getExclusiveOwnerThread()：获取锁的线程
- hasContended()：检查是否已经竞争过锁

![使用](/images/JavaThread/7-JUC/1642492926139.png)

### 利用AbstractQueuedSynchronizer自定义锁

其实用了它基本上就用不着我们做什么了...

```java
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.AbstractQueuedSynchronizer;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;

/**
 * @author Amayakite
 * @version 1.0.0
 * @date 2022/1/18 16:21
 * @since 1.8
 */
@Slf4j(topic = "c.AQS")
public class TestAqs {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2, new ThreadFactory() {

            private AtomicInteger count = new AtomicInteger(1);

            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "MyThead-" + count.getAndIncrement());
            }
        });

        MyLock myLock = new MyLock();

        executorService.execute(() -> {
            myLock.lock();
            try {
                log.debug("locking...");
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                log.debug("unlocking...");
                myLock.unlock();
            }
        });
        executorService.execute(() -> {
            myLock.lock();
            try {
                log.debug("locking...");
            } finally {
                log.debug("unlocking...");
                myLock.unlock();
            }
        });

        executorService.shutdown();
        try {
            executorService.awaitTermination(1, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

/**
 * 自定义锁（不可重入）
 */
class MyLock implements Lock {

    /**
     * 独占锁 同步器类
     */
    class MySync extends AbstractQueuedSynchronizer {

        /**
         * 尝试获取锁 这里我们设计的是一个不可重入锁，所以直接写死用不着args
         */
        @Override
        protected boolean tryAcquire(int arg) {
            if (compareAndSetState(0, 1)) {
//                加上了锁 并设置owner为当前线程
                setExclusiveOwnerThread(Thread.currentThread());
                return true;
            }
            return false;
        }

        /**
         * 尝试释放锁
         */
        @Override
        protected boolean tryRelease(int arg) {
//            将owner置为null 这里一定要是这个顺序..
            setExclusiveOwnerThread(null);
//            直接将state设置为0
            setState(0);
            return true;
        }

        /**
         * 是否持有独占锁
         */
        @Override
        protected boolean isHeldExclusively() {
            return getState() == 1;
        }

        /**
         * 获取一个Condition对象
         */
        public Condition newCondition() {
            return new ConditionObject();
        }

    }

    private MySync sync = new MySync();

    /**
     * 加锁（不成功就会进入到等待队列等待）
     */
    @Override
    public void lock() {
        sync.acquire(1);
    }

    /**
     * 加锁，可以打断
     */
    @Override
    public void lockInterruptibly() throws InterruptedException {
        sync.acquireSharedInterruptibly(1);
    }

    /**
     * 尝试加锁（一次）
     */
    @Override
    public boolean tryLock() {
        return sync.tryAcquire(1);
    }

    /**
     * 尝试加锁，带有超时时间
     */
    @Override
    public boolean tryLock(long time, TimeUnit unit) throws InterruptedException {
        return sync.tryAcquireNanos(1, unit.toNanos(time));
    }

    /**
     * 解锁
     */
    @Override
    public void unlock() {
        sync.release(1);
    }

    /**
     * 创建条件变量
     */
    @Override
    public Condition newCondition() {
        return sync.newCondition();
    }
}
```

运行结果：

```text
16:47:17.177 [MyThead-1] DEBUG c.AQS - locking...
16:47:18.185 [MyThead-1] DEBUG c.AQS - unlocking...
16:47:18.185 [MyThead-2] DEBUG c.AQS - locking...
16:47:18.185 [MyThead-2] DEBUG c.AQS - unlocking...
```

## 公平锁和非公平锁的区别

这里说下，JUC的全部锁类都支持额外的构造参数fair，传入一个布尔值，默认是false

- false就是非公平锁，就是按照顺序来获取锁
- true就是公平锁，就是按照等待时间来获取锁

打个比方把，假设说我现在有5个线程在等待锁（队列中），然后又来了一个新的线程，这个时候锁空出来了

- 如果是非公平锁，则是让所有线程一起抢锁
- 如果是公平锁，则优先让等待队列中的线程获取到锁，新来的线程进入等待，也就是说先让队列中的获取锁，而不是让新来的线程有机会获取锁

## 读写锁

ReentrantLock可重入锁之前已经已经用过了，这里就不做原理的展开说明，有兴趣的话可以去看看黑马的视频，总的来说比较复杂......

当读操作远高于写操作时，这时候就要用到读写锁，这个锁可以读可以写，但是写的时候只能有一个线程写，而读的时候可以有多个线程读，这种类型的锁被统一称之为读写锁

类似于数据库中的`select...from... lock in share mode`

也就是读取操作可以并发，读写操作是互斥的

### ReentrantReadWriteLock

提供一个`数据容器类`分别使用读锁保护数据的`read`方法，写锁保护数据的`write`方法

我们先来一个类，对应着其资源

```java

@Slf4j(topic = "c.DataContainer")
class DataContainer {
    /**
     * 这个data就是我们要读写的资源
     */
    private Object data;

    private ReentrantReadWriteLock rw = new ReentrantReadWriteLock();

    /**
     * 读锁
     */
    private ReentrantReadWriteLock.ReadLock readLock = rw.readLock();

    /**
     * 写锁
     */
    private ReentrantReadWriteLock.WriteLock writeLock = rw.writeLock();

    public Object read() {
        readLock.lock();
        log.debug("获取读锁");
        try {
            log.debug("读取操作");
            TimeUnit.SECONDS.sleep(1);
            return data;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            log.debug("释放读锁");
            readLock.unlock();
        }
    }

    public void write(Object data) {
        writeLock.lock();
        log.debug("获取写锁");
        try {
            log.debug("写入操作");
            this.data = data;
        } finally {
            log.debug("释放写锁");
            writeLock.unlock();
        }
    }

}

```

接着试用下它

```java

@Slf4j(topic = "c.TestReadWriteLock")
public class TestReadWriteLock {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2, new ThreadFactory() {

            private AtomicInteger count = new AtomicInteger(1);

            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "线程" + count.getAndIncrement());
            }
        });

        DataContainer dataContainer = new DataContainer();

        pool.execute(dataContainer::read);
        Thread.sleep(100);
        pool.execute(() -> dataContainer.write(new Object()));


        pool.shutdown();


    }
}
```

可以发现，虽然我们手动了延迟一百毫秒，但是写入操作并没有在我们的延迟的一百毫秒后正确的正常地执行，而是直至我们的读取操作获取完成内容后，才开始进行写入

```text
18:34:05.850 [线程1] DEBUG c.DataContainer - 获取读锁
18:34:05.852 [线程1] DEBUG c.DataContainer - 读取操作
18:34:06.853 [线程1] DEBUG c.DataContainer - 释放读锁

# 可以看到 在读取完全完毕后，才开是获取到写锁
18:34:06.853 [线程2] DEBUG c.DataContainer - 获取写锁
18:34:06.853 [线程2] DEBUG c.DataContainer - 写入操作
18:34:06.853 [线程2] DEBUG c.DataContainer - 释放写锁
```

那如果我们两个读取呢？

```java

@Slf4j(topic = "c.TestReadWriteLock")
public class TestReadWriteLock {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(2, new ThreadFactory() {

            private AtomicInteger count = new AtomicInteger(1);

            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "线程" + count.getAndIncrement());
            }
        });

        DataContainer dataContainer = new DataContainer();

        pool.execute(dataContainer::read);
        Thread.sleep(100);
        log.debug("延迟一百毫秒结束");
        pool.execute(dataContainer::read);

        pool.shutdown();
    }
}
```

结果如下

```text
18:37:14.718 [线程1] DEBUG c.DataContainer - 获取读锁
18:37:14.721 [线程1] DEBUG c.DataContainer - 读取操作
18:37:14.816 [main] DEBUG c.TestReadWriteLock - 延迟一百毫秒结束
18:37:14.817 [线程2] DEBUG c.DataContainer - 获取读锁
18:37:14.817 [线程2] DEBUG c.DataContainer - 读取操作
18:37:15.730 [线程1] DEBUG c.DataContainer - 释放读锁
18:37:15.823 [线程2] DEBUG c.DataContainer - 释放读锁
```

可以看到，虽然说我们的线程并不是同时运行的，但是在延迟一百毫秒结束之后，另一个线程立刻就获取到了锁，也就是说

我们同时可以有多个线程来读取，但是如果要读写操作一块进行的话，就会将其中的一个线程锁死，直至另一方释放锁

总结：

- 读和读：无限制
- 写和写：有限制，必须得有一方将锁释放，另一方才能获取到锁
- 读和写：有限制，必须得有一方将锁释放，另一方才能获取到锁
- 读读可以并发，读写或者写写是互斥的

### ReentrantReadWriteLock注意事项

1. 读锁不支持条件变量
2. 重入时升级**不支持**：即持有读锁的情况下去获取写锁，会导致写锁永久等待

![image](/images/JavaThread/7-JUC/1642502550191.png)

- 重入时降级**支持**：即持有写锁的情况下去获取读锁

![image](/images/JavaThread/7-JUC/1642502620467.png)

### 缓存的应用-数据库的查询缓存

我这里就直接以springboot加上mybatis-plus工程为例了

依赖如下

```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jdbc</artifactId>
    </dependency>

    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.4.3.4</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

准备的数据表结构大概是这个样子

![table](/images/JavaThread/7-JUC/1642510213790.png)

然后因为要修改的东西都比较简单，我就用了mybatis的插件来完成domian和service之类的生成

### 简单实现-不涉及锁

我现在准备一个类，用于做查询数据的缓存：构思是：当用户查询第一次后，将查询内容存储到一个map集合中，然后id为key，用户查询的时候，会先检查map是否有内容

如果有的话，就直接用map里面的，如果没有的话，就到数据库里面去查

如果说有东西把这张表的任意内容更新了，缓存直接清零

所以直接上实现

```java
import com.amayakite.datasourcedemo8001.domain.User;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Hashtable;
import java.util.Map;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 32-Thread
 * @BelongsPackage com.amayakite.datasourcedemo8001.service
 * @date 2022/1/18 19:24
 * @description 项目描述
 * @since 1.8
 */
@Service
@Slf4j
public class CacheQueryService {

    @Resource
    UserService userService;

    /**
     * 存放缓存角色的实体表
     */
    public static final Map<Integer, User> userList = new Hashtable<>();

    /**
     * 通过id查询一个角色
     * 优先在缓存中查询，如果没有，则从数据库中查询
     *
     * @param id 角色的id
     * @return 返回一个角色，如果没有任何结果返回null
     */
    public User queryEmpById(Integer id) {
        User user = userList.get(id);
        if (user != null) {
            log.debug("从缓存中查询到了角色：{}", user);
            return user;
        }
        user = userService.getById(id);
        if (user != null) {
            log.debug("从数据库查询用户数据成功，结果：{}", user);
            userList.put(id, user);
            return user;
        }
        return null;
    }

    public boolean updateEmp(Wrapper<User> wrapper) {

        boolean update = userService.update(wrapper);
        if (update) {
            log.debug("更新数据成功");
            userList.clear();
            log.debug("清空缓存成功");
            return true;
        }
        return false;
    }
}

```

看起来貌似没有问题了，但是我们是高并发操作。。。这样显然并不合适（百分之一百定会出现用户不及时更新的情况）

### 缓存更新策略-问题分析

我们上面可能会遇到这几种问题

如果是先清除缓存的话：

![先清缓存](/images/JavaThread/7-JUC/1642510428615.png)

如果是先更新数据库的话

![更新数据库](/images/JavaThread/7-JUC/1642510552545.png)

总结

1. 我们的这个集合类用的貌似不是很合适
2. 我们这个保护机制并不是特别好-缓存的机制没有起到作用
3. 必须得先更新库再清空缓存

### 缓存更新策略-实现

```java
import com.amayakite.datasourcedemo8001.domain.User;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Hashtable;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 32-Thread
 * @BelongsPackage com.amayakite.datasourcedemo8001.service
 * @date 2022/1/18 19:24
 * @description 项目描述
 * @since 1.8
 */
@Service
@Slf4j
public class CacheQueryService {

    @Resource
    UserService userService;

    public final Map<Integer, User> userList = new Hashtable<>();

    private final ReentrantReadWriteLock rw = new ReentrantReadWriteLock();

    private final ReentrantReadWriteLock.WriteLock writeLock = rw.writeLock();

    private final ReentrantReadWriteLock.ReadLock readLock = rw.readLock();


    /**
     * 通过id查询一个角色
     * 优先在缓存中查询，如果没有，则从数据库中查询
     *
     * @param id 角色的id
     * @return 返回一个角色，如果没有任何结果返回null
     */
    public User queryEmpById(Integer id) {
//        通过读写锁来解决线程安全问题
//        1  先从缓存中查询
//        2  缓存中查不到，再到数据库去查下
        User user = userList.get(id);
        readLock.lock();
        try {
            if (user != null) {
                log.debug("从缓存中查询到了角色：{}", user);
                return user;
            }
        } finally {
//            释放读锁 因为不支持从读锁到写锁的升级
            readLock.unlock();
        }
//        缓存中没有，去数据库查询，加个写锁防止并发导致数据最新的数据不能即刻地查询出来
        writeLock.lock();
        try {
//            二次查询
            user = userList.get(id);
            if (user != null) {
                log.debug("从缓存中查询到了角色：{}", user);
                return user;
            }
            user = userService.getById(id);
            if (user != null) {
                log.debug("从数据库查询用户数据成功，结果：{}", user);
                userList.put(id, user);
                return user;
            }
            return null;
        } finally {
            writeLock.unlock();
        }

    }

    public boolean updateEmp(Wrapper<User> wrapper) {
        writeLock.lock();
        try {
            boolean update = userService.update(wrapper);
            if (update) {
                log.debug("更新数据成功");
                userList.clear();
                log.debug("清空缓存成功");
                return true;
            }
            return false;
        } finally {
            writeLock.unlock();
        }
    }
}
```

> 注意 以上实现只是实现一个简单的读写锁，并不能实际投入到生产环境中，如果要投入到生产环境，还有很多内容有待优化

- 没有考虑的问题
    - 适合读写多少，如果操作写比较频繁，以上实现性能低
    - 没有考虑缓存容量
    - 没有考虑缓存过期
    - 只适合单机，并不能适用于分布式微服务
    - 并发性能较低，目前只会用一把锁
    - 更新方法太过简单粗暴，清空了所有key（考虑按照分区或重新设计key）

### StampedLock

这个类是在JDK8的时候加入的，目的是为了进一步地优化读性能，它的特点是在使用读锁、写锁的时候，都必须配合`戳`使用

> 读取锁的上锁和解除

```java
long stamp=lock.readLock();
        lock.unlockRead(stamp);
```

> 写锁的上锁和解除

```java
long stamp=lock.writeLock();
        lock.unlockWrite(stamp;)
```

乐观读，StampedLock支持`tryOptimisticRead()`方法（乐观读），读取完毕后需要做一次`戳校验`，如果校验通过，表示这期间确实没有写操作，数据完全可以使用

如果说校验没有通过，就要重新获取锁，保证数据安全

```java
long stamp=lock.tryOptimisticRead();
//验戳
        if(!lock.validate(stamp)){
//    锁升级
        }
```

提供一个数据容器类，内部分别使用读锁保护的`read()`方法，写锁保护数据的`write()`方法

我们先来写一个类模拟下

```java

@Slf4j(topic = "c.DataContainerStampedLock")
class DataContainerStamped {
    private int data;
    private final StampedLock lock = new StampedLock();

    public DataContainerStamped(int data) {
        this.data = data;
    }

    @SneakyThrows
    public int read(int readTime) {
//        上乐观锁
        long stamp = lock.tryOptimisticRead();
        log.debug("optimistic read stamp is {}", stamp);
//        延迟指定时间 （模拟业务所需要的时间）
        TimeUnit.SECONDS.sleep(readTime);
//        对stamp进行比较，如果不一致，则说明有写操作，需要重新读取
        if (lock.validate(stamp)) {
//            如果验证成功则返回true，表示数据并没有收到任何影响，直接返回即可
            log.debug("validate stamp is {}", stamp);
            return data;
        }
        log.debug("锁的版本不符合，升级为读锁");
        stamp = lock.readLock();
        try {
            log.debug("read lock stamp is {}", stamp);
            TimeUnit.SECONDS.sleep(readTime);
            log.debug("read finish stamp is {}", stamp);
            return data;
        } finally {
            log.debug("read unlock stamp is {}", stamp);
            lock.unlock(stamp);
        }
    }

    public void write(int newDate) {
        long stamp = lock.writeLock();
        log.debug("write lock stamp is {}", stamp);
        try {
            TimeUnit.SECONDS.sleep(2);
            data = newDate;
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            log.debug("write unlock stamp is {}", stamp);
            lock.unlockWrite(stamp);
        }
    }
}
```

然后在写个测试来看看效果

> 只有读取

```java
public class TestStampedLock {
    public static void main(String[] args) {
        DataContainerStamped dataContainerStamped = new DataContainerStamped(1);
        ExecutorService pool = Executors.newFixedThreadPool(2);
        pool.execute(() -> dataContainerStamped.read(1));
        pool.execute(() -> dataContainerStamped.read(1));
        pool.shutdown();
    }
}
```

结果：

```text
21:54:13.333 [pool-1-thread-1] DEBUG c.DataContainerStampedLock - optimistic read stamp is 256
21:54:13.333 [pool-1-thread-2] DEBUG c.DataContainerStampedLock - optimistic read stamp is 256
21:54:14.348 [pool-1-thread-2] DEBUG c.DataContainerStampedLock - validate stamp is 256
21:54:14.348 [pool-1-thread-1] DEBUG c.DataContainerStampedLock - validate stamp is 256
```

试一试有读取和写入

```java
public class TestStampedLock {
    public static void main(String[] args) {
        DataContainerStamped dataContainerStamped = new DataContainerStamped(1);
        ExecutorService pool = Executors.newFixedThreadPool(2);
        pool.execute(() -> dataContainerStamped.read(1));
        pool.execute(() -> dataContainerStamped.write(10));
        pool.shutdown();
    }
}
```

结果：

```text
21:59:03.384 [pool-1-thread-1] DEBUG c.DataContainerStampedLock - optimistic read stamp is 256
21:59:03.384 [pool-1-thread-2] DEBUG c.DataContainerStampedLock - write lock stamp is 384
21:59:04.389 [pool-1-thread-1] DEBUG c.DataContainerStampedLock - 锁的版本不符合，升级为读锁
21:59:05.403 [pool-1-thread-2] DEBUG c.DataContainerStampedLock - write unlock stamp is 384
21:59:05.403 [pool-1-thread-1] DEBUG c.DataContainerStampedLock - read lock stamp is 513
21:59:06.404 [pool-1-thread-1] DEBUG c.DataContainerStampedLock - read finish stamp is 513
21:59:06.404 [pool-1-thread-1] DEBUG c.DataContainerStampedLock - read unlock stamp is 513
```

可以看到，当版本变化后，乐观读就升级成了锁读，并且此时因为有写锁的存在，它将会延迟到写锁解锁后解除

> 注意

1. StampedLock不支持条件变量
2. StampedLock不支持可重入

## Semaphore-控制访问量

信号量，用来限制能同时访问贡献资源的线程上限，也就限流，限制的不是QPS，而是线程数（还记得Sentinel的选项吗..对就是那玩意）

使用比较简单,我们先来一个例子吧

```java

@Slf4j(topic = "c.TestSemaphore")
public class TestSemaphore {
    public static void main(String[] args) {
//      10个线程同时运行
        ExecutorService pool = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 10; i++) {
            pool.execute(() -> {
                log.debug("running....");
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                log.debug("end...");
            });
        }
        pool.shutdown();
    }
}

```

这里开了十个线程同时运行，结果也如果我们所料，全部都正常的运行完毕了

![结果](/images/JavaThread/7-JUC/1642515922149.png)

接下来我们使用Semaphore对线程的每秒个数进行限制

```java

@Slf4j(topic = "c.TestSemaphore")
public class TestSemaphore {
    public static void main(String[] args) {
//      1.  创建 Semaphore 对象，参数为线程数量，限制的是每秒的数量
        Semaphore semaphore = new Semaphore(3);

//      2. 10个线程同时运行
        ExecutorService pool = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 10; i++) {
            pool.execute(() -> {
//                获取许可
                try {
                    semaphore.acquire();
                } catch (InterruptedException e) {
//                    获取许可之后可以被打断
                    e.printStackTrace();
                }

                log.debug("running....");
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                log.debug("end...");

//                释放许可 让其他人也能获取到许可
                semaphore.release();
            });
        }
        pool.shutdown();
    }
}
```

运行结果

![结果](/images/JavaThread/7-JUC/1642516092468.png)

## CountdownLatch-倒计时锁

用来进行线程同步协作，等待所有线程完成倒计时

其中构造参数用来初始化等待计数值，await()用来等待计数归零，countDown()用来让计数-1

好像想起了之前在学SpringBoot还是Cloud的时候，有一个视频用到了这个锁来进行协调...貌似是RabbitMQ？

使用起来也是非常地简单， 反正就是让要等待的线程调用它的await方法即可，然后别的线程调用它的countDown方法，直至它的计数器归零，然后等待的线程才会恢复

> 为什么要用它，用join不好吗？
>
> 我们以后都是不可能直接创建线程，而是用线程池内的对象，阿里巴巴开发手册也是这样写的，而众所周知，线程池内的核心线程是不会结束的，因此用join的话....你根本不能确定它什么时候会结束..
>
> 应用场景：例如一局游戏内，所有玩家都加载完毕

### 基本使用

```java

@Slf4j(topic = "c.TestLatch")
public class TestLatch {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(3);
        ExecutorService pool = Executors.newFixedThreadPool(3);

        pool.execute(() -> {
            log.debug("begin...");
            sleep(1);
//            计数器-1
            latch.countDown();
            log.debug("end...");
        });
        pool.execute(() -> {
            log.debug("begin...");
            sleep(2);
//            计数器-1
            latch.countDown();
            log.debug("end...");
        });
        pool.execute(() -> {
            log.debug("begin...");
            sleep(3);
//            计数器-1
            latch.countDown();
            log.debug("end...");
        });

        log.debug("主线程开始阻塞");
        latch.await();
        log.debug("主线程阻塞完毕，开始关闭连接池...");
        pool.shutdown();
    }

    public static void sleep(int time) {
        try {
            TimeUnit.SECONDS.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

运行结果：

```text
22:39:14.525 [pool-1-thread-1] DEBUG c.TestLatch - begin...
22:39:14.525 [main] DEBUG c.TestLatch - 主线程开始阻塞
22:39:14.525 [pool-1-thread-2] DEBUG c.TestLatch - begin...
22:39:14.525 [pool-1-thread-3] DEBUG c.TestLatch - begin...
22:39:15.532 [pool-1-thread-1] DEBUG c.TestLatch - end...
22:39:16.534 [pool-1-thread-2] DEBUG c.TestLatch - end...
22:39:17.533 [pool-1-thread-3] DEBUG c.TestLatch - end...
22:39:17.533 [main] DEBUG c.TestLatch - 主线程阻塞完毕，开始关闭连接池...
```

### CountdownLatch实例：在分布式服务中分布式的获取结果

例如我现在有一个这样的需求：要分别去三个服务器上获取三个不同的资源，都是获取资源，这里用一个简单的单实例来模拟下

依赖：一个faker库用来生成随机数据,注意要排除那个yaml，不然会和Springboot不兼容

```xml

<dependency>
    <groupId>com.github.javafaker</groupId>
    <artifactId>javafaker</artifactId>
    <version>1.0.2</version>
    <exclusions>
        <exclusion>
            <groupId>org.yaml</groupId>
            <artifactId>snakeyaml</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

接着编写一个Controller

```java

@RestController
@Slf4j
public class TestController {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class ResultMessage {
        private String name;
        private String message;
    }


    public static final Faker faker = new Faker(new Locale("zh-CN"));

    @GetMapping("/logistics/{id}")
    public ResultMessage getMessage(@PathVariable("id") Integer id) throws InterruptedException {
//        传入的数值是多少，就等待多少秒
        TimeUnit.SECONDS.sleep(id);
        return new ResultMessage(faker.company().name(), faker.gameOfThrones().character());
    }

    @GetMapping("/test")
    public String test() {
        long start = System.currentTimeMillis();
        RestTemplate restTemplate = new RestTemplate();
        for (int i = 1; i < 5; i++) {
            ResultMessage result = restTemplate.getForObject("http://localhost:8001/logistics/{id}", ResultMessage.class, i);
            log.debug("从接口获取到了数据: {}", result);
        }
        long timer = System.currentTimeMillis() - start;
        log.debug("总耗时：{} 毫秒====={}秒", timer, timer / 1000);
        return "over";
    }
}
```

接着运行，可以看到结果：

![结果](/images/JavaThread/7-JUC/1642519473451.png)

花费了海量时间，所以我们可以选择通过使用CountdownLatch和线程池配合着来解决这个问题

```java

@RestController
@Slf4j
public class TestController {

    //.....其他的方法

    @GetMapping("/test")
    public String test() throws InterruptedException {
        long start = System.currentTimeMillis();
        RestTemplate restTemplate = new RestTemplate();
//        创建线程池
        ExecutorService pool = Executors.newCachedThreadPool();
        int number = 5;
//        创建一个计数器
        CountDownLatch countDownLatch = new CountDownLatch(number);
        for (int i = 1; i <= number; i++) {
            int finalI = i;
            pool.submit(() -> {
                ResultMessage result = restTemplate.getForObject("http://localhost:8001/logistics/{id}", ResultMessage.class, finalI);
                log.debug("从接口获取到了数据: {}", result);
                countDownLatch.countDown();
            });
        }
//        挂起等待线程结束
        countDownLatch.await();
//        关闭线程池
        pool.shutdown();
        long timer = System.currentTimeMillis() - start;
        log.debug("总耗时：{} 毫秒====={}秒", timer, timer / 1000);
        return "over";
    }

}
```

最终五个只花费了他们之间的最长时间-五秒，极大程度提高了我们的速率 并且如果你想要返回值的话，因为submit是可以返回一个Future或者用一个ArrayList存储结果之类的，交给主线程处理

![结果](/images/JavaThread/7-JUC/1642520108643.png)

## CyclicBarrier-循环栅栏-可以重用的CountdownLatch

latch问题如图，也就是说我们有些情况下想要循环的使用计数器，但是实际上每次循环之类的都要创建一个CountdownLatch太痛苦了，且不好管控（一般情况下都不是循环，而是其他的业务场景）

![问题](/images/JavaThread/7-JUC/1642520684450.png)

所以这玩意就可以来解决上述问题：【循环栅栏】，用来进行线程协作，等待线程满足某个技术

- 构造时设置【计数个数】
- 每个线程执行到需要【同步】的时刻调用`await()`方法进行等待
- 当等待的线程数满足【计数个数】时，继续执行

### 使用

可以在它的构造方法内，传入一个Runnable，他将会在计数器归零的时候调用该内容，并且，所有的`await`操作都会让他的计数器减一

并且，在他的计数器为零的时候，下一次计数，将会从初始化的时候给定的值-1来进行计数（例如初始化2，然后通过await变成0了，下一次使用await的结果是：0+2-1=1）

```java

@Slf4j(topic = "c.TestCyclicBarrier")
public class TestCyclicBarrier {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2);
        CyclicBarrier cyclicBarrier = new CyclicBarrier(2, () -> {
            log.info("所有线程都汇总完毕了，当前的线程是：{}", Thread.currentThread().getName());
        });

        for (int i = 0; i < 2; i++) {
            pool.execute(() -> {
                log.debug("线程{}执行", Thread.currentThread().getName());
                sleep(1);
                try {
                    //                当执行它的await的时候，计数器会-1 这个和countDown的作用有点不一样、、
                    cyclicBarrier.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
                log.info("线程{}执行完毕", Thread.currentThread().getName());
            });
            pool.execute(() -> {
                log.debug("线程{}执行", Thread.currentThread().getName());
                sleep(2);
                try {
                    //                当执行它的await的时候，计数器会-1 这个和countDown的作用有点不一样、、
                    cyclicBarrier.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
                log.debug("线程{}执行完毕", Thread.currentThread().getName());
            });
        }
        pool.shutdown();
    }

    public static void sleep(long time) {
        try {
            TimeUnit.SECONDS.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
```

运行结果：

```text
00:02:22.666 [pool-1-thread-1] DEBUG c.TestCyclicBarrier - 线程pool-1-thread-1执行
00:02:22.666 [pool-1-thread-2] DEBUG c.TestCyclicBarrier - 线程pool-1-thread-2执行
00:02:24.680 [pool-1-thread-2] INFO c.TestCyclicBarrier - 所有线程都汇总完毕了，当前的线程是：pool-1-thread-2
00:02:24.680 [pool-1-thread-2] DEBUG c.TestCyclicBarrier - 线程pool-1-thread-2执行完毕
00:02:24.680 [pool-1-thread-1] INFO c.TestCyclicBarrier - 线程pool-1-thread-1执行完毕
00:02:24.680 [pool-1-thread-1] DEBUG c.TestCyclicBarrier - 线程pool-1-thread-1执行
00:02:24.680 [pool-1-thread-2] DEBUG c.TestCyclicBarrier - 线程pool-1-thread-2执行
00:02:26.684 [pool-1-thread-2] INFO c.TestCyclicBarrier - 所有线程都汇总完毕了，当前的线程是：pool-1-thread-2
00:02:26.684 [pool-1-thread-2] DEBUG c.TestCyclicBarrier - 线程pool-1-thread-2执行完毕
00:02:26.685 [pool-1-thread-1] INFO c.TestCyclicBarrier - 线程pool-1-thread-1执行完毕
```

### 注意事项

使用这个玩意的时候，线程池的线程数（也就是最终执行方法的线程数）应该和这玩意的构造参数是一致的

例如，我现在线程池是3，它是2

那么计数器将是这样的

- 第一轮执行的是：task1 task2 task1
- 第二轮： task2 task1 task2
- .....

如果说task1的运行时间是1秒，task2的运行时间是2秒，那么在两个task1执行完毕之后，将会进行重置，这个时候这玩意会认为task1和task2都是执行完了，而并非是两个task1执行完了，所以最终可能会导致和我们预想的结果有偏差

## 线程安全集合类

![汇众](/images/JavaThread/7-JUC/1642522202534.png)

大致分为如上三个种类

- 遗留的线程安全集合：HashTable，Vector
    - 并发性比较低，全程synchronized，不推荐使用
- 使用Collections装饰的线程安全集合
    - `Collections.synchroizedCollection`
    - `Collections.synchroizedList`
    - `Collections.synchroizedMap`
    - `Collections.synchroizedSet`
    - `Collections.synchroizedNavigableMap`
    - `Collections.synchroizedNavigableSet`
    - 也就是把一个不安全的集合，封装成一个集合
    - 但是并没有进行过多的更该，也只是简简单单的用synchronized封装了下...
    - ![代码](/images/JavaThread/7-JUC/1642522532982.png)
- JUC提供的`java.util.concurrent.*`
    - 这里面也有非常多的类
    - 类名中带有`Blocking`的类
    - 类名中带有`CopyOnWrite`的类
    - 类名中带有`Concurrent`的类

这里只说下JUC中提供的这些类，他们含有Blocking、CopyOnWrite、Concurrent三个关键字

- Blocking大部分实现基于锁，并提供用来阻塞的方法
    - 内部才用Reent之类的锁完成
    - 会让线程在不满足条件时阻塞住
- CopyOnWrite之类的容器修改开销相对较重
    - 内部才用了修改时拷贝的方式...避免读写时的安全，所以每一次修改的成本都是极高的
    - 一般适用于读多写少的场景
- Concurrent类型的容器
    - 内部很多操作使用CAS优化，一般可以提高吞吐量
    - 弱一致性
        - 遍历弱一致性时，例如：当利用迭代器遍历的时候，如果容器发生修改，迭代器依旧可以继续进行遍历，不过获取到的结果是旧的
        - 求大小弱一致性的时候，size操作未必百分之百准确
        - 读取弱一致性

遍历时如果发生了修改，对于非安全容器来说，使用`fail-fast`(快速失败)机制抛出ConcurrentModificationException，不再继续遍历

## ConcurrentHashMap

使用起来和普通的hashmap没啥区别，这里说下坑

我们先来准备一些数据，存储到文件中

```java

@Slf4j(topic = "c.TestConcurrent")
public class TestConcurrent {
    static final String ALPHA = "abcdefghijklmnopqrstuvwxyz";

    public static void main(String[] args) throws FileNotFoundException {
        int length = ALPHA.length();
        int count = 200;
        ArrayList<String> strings = new ArrayList<>(count * length);
        for (int i = 0; i < length; i++) {
            char c = ALPHA.charAt(i);
            for (int j = 0; j < count; j++) {
                strings.add(String.valueOf(c));
            }
        }
//        打乱列表
        Collections.shuffle(strings);
//        存储到26个文件中
        for (int i = 0; i < 26; i++) {
            PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(new FileOutputStream("tmp/" + (i + 1) + ".txt"), StandardCharsets.UTF_8));
            String stream = strings.subList(i * count, (i + 1) * count).stream().collect(Collectors.joining("\n"));
            printWriter.print(stream);
            printWriter.close();
        }
    }
}
```

执行完上面的代码，可以得到如下26个文件

![file](/images/JavaThread/7-JUC/1642524456120.png)

接下来，我们使用map来统计下单词的出现次数，开26个线程，如果不出意外的话应该是每个单词200个

先用普通的hashmap看看效果

```java

@Slf4j(topic = "c.TestConcurrent")
public class TestConcurrent {
  static final String ALPHA = "abcdefghijklmnopqrstuvwxyz";

  public static void main(String[] args) throws FileNotFoundException, InterruptedException {
    ExecutorService executorService = Executors.newCachedThreadPool();

    HashMap<String, Integer> list = new HashMap<>();

    File[] temps = new File("tmp").listFiles();
    assert temps != null;
    CountDownLatch countDownLatch = new CountDownLatch(temps.length);
    String filepath = "tmp/";
    for (File file : temps) {
      executorService.execute(() -> {
        try {
          BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8));
          bufferedReader.lines().forEach(
                  s -> {
                    if (list.get(s) == null) {
                      list.put(s, 1);
                      return;
                    }
                    list.put(s, list.get(s) + 1)
                  }
          );
        } catch (FileNotFoundException e) {
          e.printStackTrace();
        } finally {
          countDownLatch.countDown();
        }
      });
    }

    countDownLatch.await();
    log.debug("运行结束，当前list的统计结果为：");
    list.forEach((k, v) -> {
      log.debug("{}的数量为：{}", k, v);
    });

    executorService.shutdown();
  }
}
```

显而易见的出现问题了

![err](/images/JavaThread/7-JUC/1642525168387.png)

但是当我使用这个新鲜玩意的时候，依然出现了问题

![error](/images/JavaThread/7-JUC/1642526557042.png)


所以说这玩意归根结底是：里面的每个方法是线程安全的，但是何在一块就不是线程安全的了，我们这里是用了两个方法put 和 get put

所以说，它里面提供了一个原子性的增加方法`computeIfAbsent`

- 功能是根据key获取对应的值，如果没有，则根据传入的表达式生成，如果有的话，则不调用表达式，直接返回该value

```java
@Slf4j(topic = "c.TestConcurrent")
public class TestConcurrent {
  static final String ALPHA = "abcdefghijklmnopqrstuvwxyz";

  public static void main(String[] args) throws FileNotFoundException, InterruptedException {
    ExecutorService executorService = Executors.newCachedThreadPool();

    ConcurrentMap<String, LongAdder> list = new ConcurrentHashMap<>();

    File[] temps = new File("tmp").listFiles();
    assert temps != null;
    CountDownLatch countDownLatch = new CountDownLatch(temps.length);
    String filepath = "tmp/";
    for (File file : temps) {
      executorService.execute(() -> {
        try {
          BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8));
          bufferedReader.lines().forEach(
                  s -> {
//                                如果缺少一个key，则计算生成一个值，将key和value都存放在map中
//                                如果有的话，返回value
                    LongAdder longAdder = list.computeIfAbsent(s, k -> new LongAdder());
//                               因为longadder默认是0，所以直接+1即可
                    longAdder.increment();

                  }
          );
        } catch (FileNotFoundException e) {
          e.printStackTrace();
        } finally {
          countDownLatch.countDown();
        }
      });
    }

    countDownLatch.await();
    log.debug("运行结束，当前list的统计结果为：");
    list.forEach((k, v) -> {
      log.debug("{}的数量为：{}", k, v);
    });

    executorService.shutdown();
  }
}
```

再次运行看看：

![完美解决](/images/JavaThread/7-JUC/1642526913512.png)

## Concurrent的方法一览

详细的方法可以看看[这里](https://www.matools.com/file/manual/jdk_api_1.8_google/java/util/concurrent/ConcurrentHashMap.html)

- `computeIfAbsent(K key,Function<K,V>)` 当指定的key不存在的时候，运行Function内的方法
- `computeIfPresent(K key,Function<K,V>)`当指定的key存在的时候，运行Function内的方法

常用的上面两，其他的用得上了再去查即可

完美解决了问题

## CurrentLinkedQueue

![image](/images/JavaThread/7-JUC/1642527058934.png)
