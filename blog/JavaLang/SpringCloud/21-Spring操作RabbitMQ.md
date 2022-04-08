---
title: 21-Spring操作RabbitMQ
date: 2022-2-5 18:41:23
category: 分布式-微服务
tag:
- RabbitMQ
- SpringBoot
---

## 概述

使用RabbitMQ的核心原则是：为了防止我们的服务被超多的并发冲跨，所以说让Rabbitmq来处理缓冲这些内容

rabbitmq的消息接受在SpringBoot中是串行的（不是并行），执行完一个消息处理后才能接着处理下一个

## 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

## 配置

```yaml
--- #
spring:
  rabbitmq:
    host: myserver
    port: 13009
    username: myProjectRabbitMq
    password: myProjectRabbitMq
    virtual-host: /
```

## 主类需要的东西

```java {2}
@SpringBootApplication
@EnableRabbit
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

}
```

## 创建交换机、队列、队列和交换机之间的绑定

```java
@Slf4j
@SpringBootTest
class OrderApplicationTests {

    @Autowired
    AmqpAdmin amqpAdmin;

    @Test
    void createExchange() {

        /*
        DirectExchange 队列类型是Direct的
         * 参数1 交换机名称
         * 参数2 是否持久化
         * 参数3 是否自动删除
         * */
        DirectExchange directExchange = new DirectExchange("amaya.order.exchange", true, false);
        amqpAdmin.declareExchange(directExchange);
        /*
         * 参数1 队列名称
         * 参数2 是否持久化
         * 参数3 是否排他（只有当前连接才能使用这个队列）
         * 参数4 是否自动删除
         * */
        amqpAdmin.declareQueue(new Queue("amaya.order.queue", true, false, false));
        /*
         * 绑定参数：
         * 1. 队列
         * 2. 交换机的类型
         * 3. 交换机
         * 4. 路由key
         * 5. 自定义参数
         * */
        Binding binding = new Binding("amaya.order.queue", Binding.DestinationType.QUEUE, "amaya.order.exchange", "hello.java", null);
        amqpAdmin.declareBinding(binding);

    }
}

```

## 发送消息

```java
@Slf4j
@SpringBootTest
class OrderApplicationTests {


    @Autowired
    RabbitTemplate rabbitTemplate;

    @Test
    void sendMessage() {
//        发送普通消息
//        rabbitTemplate.convertAndSend("amaya.order.exchange","hello.java","hello world");
//        发送对象消息
        OrderReturnReasonEntity orderReturnReasonEntity = new OrderReturnReasonEntity();
        orderReturnReasonEntity.setCreateTime(new Date());
        orderReturnReasonEntity.setId(1L);
        orderReturnReasonEntity.setSort(1);
        orderReturnReasonEntity.setName("aaa");
        rabbitTemplate.convertAndSend("amaya.order.exchange", "hello.java", orderReturnReasonEntity);
        log.info("发送消息成功，消息内容：{}", orderReturnReasonEntity);
    }

}

```

## 配置序列化方式

默认我也不知道是啥，这里可以换成json

```java
package com.amayakite.shop.order.config;

// 注意是这几个包，建议复制
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject shop
 * @BelongsPackage com.amayakite.shop.order.config
 * @date 2022/2/5 18:36
 * @description 项目描述
 * @since 1.8
 */
@Configuration
public class RabbitConfig {

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}

```

切换成功后发送消息会在header后看得到类名

![image-20220205184528032](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205184528032.png)

## 接收消息

```java
@Service
public class TestReviseMessage {

    // queues指定接收的队列
    @RabbitListener(queues = {"amaya.order.queue"})
    public void reviveMessage(Object message) {
        System.out.println("接收到消息：" + message + "类型是：" + message.getClass());
    }
}

```

发送一条后，收到的消息为：

```md
收到消息：
(
	Body:'[B@4ad120cb(byte[71])' MessageProperties 
[
headers={__TypeId__=com.amayakite.shop.order.entity.OrderReturnReasonEntity}, contentType=application/json, 
contentEncoding=UTF-8, 
contentLength=0, 
receivedDeliveryMode=PERSISTENT, 
priority=0, 
redelivered=false, 
receivedExchange=amaya.order.exchange, 
receivedRoutingKey=hello.java, 
deliveryTag=1, 
consumerTag=amq.ctag-V7EguqSCz3b4XW_nYiWp1Q, 
consumerQueue=amaya.order.queue
])，
消息的类型是：class org.springframework.amqp.core.Message
```

类型是`org.springframework.amqp.core.Message`，所以我们可以直接接收这种类型，但是它的body是一个数组，转换器来比较麻烦，所以可以这样做

```java
package com.amayakite.shop.order.service;

import com.amayakite.shop.order.entity.OrderReturnReasonEntity;
import com.rabbitmq.client.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject shop
 * @BelongsPackage com.amayakite.shop.order.service
 * @date 2022/2/5 18:46
 * @description 项目描述
 * @since 1.8
 */
@Service
@Slf4j
public class TestReviseMessage {

    /**
     * queues : 接收队列名称 可以是多个
     *
     * @param message 原生的消息类型，头+体
     * @param context 这里是我们自己的实体类 直接声明获取即可
     * @param channel 接收消息的通道
     */
    @RabbitListener(queues = {"amaya.order.queue"})
    public void reviveMessage(
            Message message,
            OrderReturnReasonEntity context,
            Channel channel
    ) {
        log.info("收到消息：{}，消息的类型是：{}", message, message.getClass());
        log.info("消息内容是：{}", context);
        log.info("消息通道为：{}", channel);
    }
}

```

结果：

```md
消息内容是：
OrderReturnReasonEntity(id=1, name=aaa, sort=1, status=null, createTime=Sat Feb 05 19:26:31 CST 2022)
消息通道为：
Cached Rabbit Channel: AMQChannel(amqp://myProjectRabbitMq@127.0.0.1:13009/,1), conn: Proxy@1a8e209b Shared Rabbit Connection: SimpleConnection@559baea1 [delegate=amqp://myProjectRabbitMq@127.0.0.1:13009/, localPort= 56487]
```

## @RabbitListener和@RabbitHandler

`@RabbitListener`这个东西可以放在类上，一般用于声明要监听的队列

另外一位则是只能标注在方法上

也就是说我们可以这样用

注意 这里的方法不能重载，一个方法只能声明接受一种类型的消息，如果说通过重载来声明接受多个则会报错

```java
@Service
@Slf4j
@RabbitListener(queues = {"amaya.order.queue"})
public class TestReviseMessage {

    @RabbitHandler
    public void reviveMessage1(OrderReturnReasonEntity context) {
        log.info("reviveMessage-OrderReturnReasonEntity消息内容是：{}", context);
    }

    @RabbitHandler
    public void reviveMessage2(String context) {
        log.info("reviveMessage-String消息内容是：{}", context);
    }
}
```

然后写一个类测试

```java
@RestController
public class TestController {
    @Autowired
    RabbitTemplate rabbitTemplate;

    @GetMapping("/test1")
    public R test1() {
        OrderReturnReasonEntity orderReturnReasonEntity = new OrderReturnReasonEntity();
        orderReturnReasonEntity.setCreateTime(new Date());
        orderReturnReasonEntity.setId(1L);
        orderReturnReasonEntity.setSort(1);
        orderReturnReasonEntity.setName("aaa");
        rabbitTemplate.convertAndSend("amaya.order.exchange", "hello.java", orderReturnReasonEntity);
        return R.ok();
    }

    @GetMapping("/test2")
    public R test2() {
        rabbitTemplate.convertAndSend("amaya.order.exchange", "hello.java", "hello world");
        return R.ok();
    }
}

```

## 消息确认机制

emm性能下降250倍时官方说的，是真的.

![image-20220205195053992](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205195053992.png)

## 可靠投递

开一个设置即可

![image-20220205195732361](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205195732361.png)

当然 SpringBoot2.2之后这玩意已经被废弃了，无法配置，需要这样来进行配置：

```yaml {9}
--- #
spring:
  rabbitmq:
    host: myserver
    port: 13009
    username: myProjectRabbitMq
    password: myProjectRabbitMq
    virtual-host: /
    publisher-confirm-type: correlated
--- # 防止bean之间相互注入冲突，这个配置不可放进nacos
spring:
  main:
    allow-circular-references: true
```

然后加一个配置类

```java
@Configuration
@Slf4j
public class RabbitConfig {

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Autowired
    RabbitTemplate rabbitTemplate;

    /**
     * -@PostConstruct 在这个rabbitconfig对象创建完成后执行通过这个注解标注的方法
     */
    @PostConstruct
    public void initRabbitTemplate(){
        rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {
            /**
             *
             * @param correlationData 当前消息的唯一关联数据（消息的唯一id） 如果说投递成功这里是null
             * @param b 消息是否成功收到
             * @param s 失败的原因
             */
            @Override
            public void confirm(CorrelationData correlationData, boolean b, String s) {
                log.info("消息的CorrelationData为：{}",correlationData);
                log.info("消息是否成功收到：{}",b);
                log.info("如果失败了，失败的原因：{}",s);
            }
        });
    }


}
```

## 可靠抵达

![image-20220205201946676](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205201946676.png)

Spring2.5+这样配置

```yaml
--- #
spring:
  rabbitmq:
    host: myserver
    port: 13009
    username: myProjectRabbitMq
    password: myProjectRabbitMq
    virtual-host: /
    # 发送端确认
    publisher-confirm-type: correlated
    # 消息抵达队列确认
    publisher-returns: true
    template:
      # 只要抵达队列，以异步模式优先回调我们这个returnCallback 可选 可以不配置
      mandatory: true

--- # 防止bean之间相互注入冲突，这个配置不可放进nacos
spring:
  main:
    allow-circular-references: true
```

然后配置类这样配置

```java
package com.amayakite.shop.order.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.ReturnedMessage;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject shop
 * @BelongsPackage com.amayakite.shop.order.config
 * @date 2022/2/5 18:36
 * @description 项目描述
 * @since 1.8
 */
@Configuration
@Slf4j
public class RabbitConfig {

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Autowired
    RabbitTemplate rabbitTemplate;

    /**
     * -@PostConstruct 在这个rabbitconfig对象创建完成后执行通过这个注解标注的方法
     */
    @PostConstruct
    public void initRabbitTemplate() {
        /**
         * 这里是消息只要发出，就会触发这个函数
         */
        rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {
            /**
             * 只要消息抵达了Broker（也就是RabbitMQ）就返回true，没抵达，才会返回false
             * @param correlationData 当前消息的唯一关联数据（消息的唯一id）
             * @param b 消息是否成功收到
             * @param s 失败的原因
             */
            @Override
            public void confirm(CorrelationData correlationData, boolean b, String s) {
                log.info("消息的CorrelationData为：{}", correlationData);
                log.info("消息是否成功收到：{}", b);
                log.info("如果失败了，失败的原因：{}", s);
            }
        });

        /*
        * 这里的回调函数只有在消息发送失败的时候才会调用，如果消息发送成功，则不会调用
        * */
        rabbitTemplate.setReturnsCallback(new RabbitTemplate.ReturnsCallback() {
            @Override
            public void returnedMessage(ReturnedMessage returnedMessage) {
                Message message = returnedMessage.getMessage();
                log.info("消息的内容为：{}", message.getBody());
                String exchange = returnedMessage.getExchange();
                log.info("消息的交换机为：{}", exchange);
                String routingKey = returnedMessage.getRoutingKey();
                log.info("消息的路由键为：{}", routingKey);
                int replyCode = returnedMessage.getReplyCode();
                log.info("消息的回复码为：{}", replyCode);
                String replyText = returnedMessage.getReplyText();
                log.info("消息的回复内容为：{}", replyText);
            }
        });
    }
}

```

接着你可以写一个不存在的队列或者不存在的交换机来进行测试

## 可靠接收-手动确认

![image-20220205210226231](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205210226231.png)

配置：

```yaml {9-11}
--- #
spring:
  rabbitmq:
    host: myserver
    port: 13009
    username: myProjectRabbitMq
    password: myProjectRabbitMq
    virtual-host: /
    listener:
      simple:
        acknowledge-mode: manual
```

开启后，如果有队列正在监听对应的消息，并且没有签收，消息是处于Unacked状态

![image-20220205210531384](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205210531384.png)

如果没有东西在监听，则会处于ready状态

接收需要如下操作，正常来说会再加一个redis缓冲，收到对象后将对象的唯一id存储在redis内进行确认有没有重复的，如果有就在这里直接接收，如果没有就进行处理之后再来接收

```java
@RabbitHandler
public void reviveMessage1(OrderReturnReasonEntity context, Message message, Channel channel) {
    log.info("当前的线程是：{}",Thread.currentThread().getName());
    log.info("reviveMessage-OrderReturnReasonEntity消息内容是：{}", context);

    //        这个deliveryTag 是自增且不重复的，在一个channel中是唯一的
    long deliveryTag = message.getMessageProperties().getDeliveryTag();
    try {
        // 需要通过deliveryTag来确认接收，第二个参数是是否批量确认，true为批量确认，false为单个确认
        // 如果是true 的话 例如deliveryTag=3，则1,2,3都会被确认
        channel.basicAck(deliveryTag, false);
    }
    catch (Exception e) {
        //            这里的异常只有可能是网络异常，可以啥都不做
        e.printStackTrace();
    }

}
```

当然 也可以拒绝

![image-20220205211904110](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205211904110.png)

## 延时队列

![image-20220206150949655](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206150949655.png)

就是想定时的去做什么事情，例如订单的删除之类的，自己整又不太精确，所以就可以这样

首先回顾下RabbitMQ的TTL 存活时间

![image-20220206151113888](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206151113888.png)

以及死信队列

![image-20220206151604776](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206151604776.png)

所以说，我们可以让消费者读取死信队列来完成这一套操作

![image-20220206151929790](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206151929790.png)

例如：

![image-20220206152351536](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206152351536.png)

也就是：

![image-20220206153004294](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206153004294.png)

## 通过注解方式来完成延时队列

注意 在SpringBoot中，**这些bean的加载是懒加载**….也就是当我们调用了什么rabbitMQTempalte之类的才会加载…. 所以**发送方和接收方都需要声明好**

做完了之后，正常的发送和接收即可

```java
@Configuration
public class MyRabbitVoConfig {

    /**
     * 容器中的bean 只要是交换机、队列、绑定等，都会自动在RabbitMQ中创建(前提是RabbitMQ中没有)，只要加一个@bean即可
     * 交换机命名规范：中横线
     * 队列命名规范：点
     * 绑定规范（router）：下划线
     */
    @Bean
    public Exchange orderEventExchange() {
//        声明交换机，如果一个交换机要绑定多个队列的话，一般都是用Topic
        return new TopicExchange("order-event-exchange", true, false);
    }

    @Bean
    public Queue orderDelayQueue() {
        /*
         * x-dead-letter-exchange 声明了队列里的死信转发到的DLX名称，也就是目标交换机
         * x-dead-letter-routing-key 声明了这些死信在转发时携带的 routing-key 名称 也就是具体要投递到哪个队列
         * x-message-ttl 声明了这些死信在转发到交换机前的存活时间，单位是毫秒。
         * */
        HashMap<String, Object> arguments = new HashMap<>();
        arguments.put("x-dead-letter-exchange", "order-event-exchange");
        arguments.put("x-dead-letter-routing-key", "order_release_key");
//        过期时间， 这里为了方便测试，先来个60s
        arguments.put("x-message-ttl", 60 * 1000);

        Queue queue = new Queue("order.delay.queue", true, false, false, arguments);

        return queue;
    }

    /**
     * 死信的接收队列
     */
    @Bean
    public Queue orderReleaseQueue() {
//        不需要额外的参数之类的
        return new Queue("order.release.queue", true, false, false);
    }

    /**
     * 绑定普通的队列和交换机
     */
    @Bean
    public Binding orderCreateOrderBinding() {
        return new Binding(
                //                第一个参数，目的地的名称，也就是队列名称
                "order.delay.queue",
                //                第二个参数，目的地的类型 也就是队列类型
                Binding.DestinationType.QUEUE,
                //                第三个参数，交换机名称
                "order-event-exchange",
                //                第四个参数，router key
                "order_create_key",
                //                第五个参数 可选 arguments
                null
        );
    }

    @Bean
    public Binding orderReleaseOrderBinding() {
        return new Binding(
                //                第一个参数，目的地的名称，也就是队列名称
                "order.release.queue",
                //                第二个参数，目的地的类型 也就是队列类型
                Binding.DestinationType.QUEUE,
                //                第三个参数，交换机名称
                "order-event-exchange",
                //                第四个参数，router key
                "order_release_key",
                //                第五个参数 可选 arguments
                null
        );
    }
}
```

创建好了之后，随便发送一条消息，等待一分钟后的队列情况如下

![image-20220206160845719](/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206160845719.png)

