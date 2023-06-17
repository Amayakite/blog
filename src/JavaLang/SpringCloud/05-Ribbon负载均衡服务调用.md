---
title: 05-Ribbon负载均衡服务调用
date: 2022-1-6 17:42:30
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Ribbon
- SpringCloud
---

## 概述

Spring Cloud Ribbon是基于Netfix Ribbon**实现的一套客户端负载均衡工具**

> 简单来说，Ribbon是Netfix发布的开源项目，主要功能是提供客户端软件负载均衡算法服务调用，Ribbon客户端组件提供一系列完善配置项如超时连接，重试等，简单的说，就是在配置文件中列出Load Balancer（简称LB）后面的所有机器，Ribbon会自动帮组你基于某种规则（例如简单查询，随机连接等）去连接这些机器，我们很容易使用Ribbon实现自定义的负载均衡算法

这玩意目前也进入了维护模式<https://github.com/Netflix/ribbon/wiki/Getting-Started>

![image-20220106175441991](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106175441991-16414628822851.png)

虽然已经停止维护了，但是这玩意还是非常好用

![image-20220106175553509](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106175553509.png)

因为它比较主流和成熟（过去式，当然现在也是，蛮好用的据说），所以还是有必要学习下

![image-20220106175752833](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106175752833.png)

前面我们通过了负载均衡（Eureka那里）访问8001/8002

Ribbon最终要做的就是来让这个轮循变成别的

总结：Ribbon其实就是一个软负载均衡的**客户端组件**，它可以和其他所需请求的客户端结合使用，和Eureka结合只是其中的一个实例

![image-20220106181120214](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106181120214.png)

![image-20220106181144789](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106181144789.png)

Eureka自带一个Ribbon

当然 新版已经没有他了，而是loadbalancer（这两个都是同样的用法）

![image-20220106181639702](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106181639702.png)

## 关于RestTemplate的用法

### xxxForEntity

![image-20220106214807667](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106214807667.png)

例如：

```java
    @PostMapping("/payment/create/{paymentName}")
    public ResponseResult<Payment> create(@PathVariable("paymentName") String paymentName) {
        ResponseEntity<ResponseResult> responseResultResponseEntity = restTemplate.postForEntity(Payment_URL + "/payment/create/" + paymentName, null, ResponseResult.class);
        HttpStatus statusCode = responseResultResponseEntity.getStatusCode();
        // 判断响应头是不是2xx
        if (statusCode.is2xxSuccessful()) {
            System.out.println("statusCode:" + statusCode);
        }
        // 获取头信息
        HttpHeaders headers = responseResultResponseEntity.getHeaders();
        ResponseResult<Payment> body = responseResultResponseEntity.getBody();
        return body;
    }
```

## Ribbon的使用

### 较新版本需要手动安装依赖

由于比较新的版本已经没有这玩意了，所以需要手动导入下依赖

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-ribbon -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
    <version>2.2.10.RELEASE</version>
</dependency>

```

通常情况下自己用最新的就行了，因为这啥玩意也不咋更新

这个玩意的类图：

![image-20220106221245002](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106221245002.png)

拥有如下规则

![image-20220106221328331](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106221328331.png)

有这些规则，默认是第一个

不过这已经过时了，新版本中并没有这个东西

还是说下 要自定义的话

建立一个和你main的class父级之上的

![image-20220106224626426](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106224626426.png)

在这里建立

然后写上这些

```java
@Configuration
public class MyRibbonRule {

    @Bean
    public IRule myrule() {
        return new RandomRule();
    }

}
```

接着返回main，配置额外扫描，必须要这样配置，否则不生效

```java
@SpringBootApplication
@EnableEurekaClient
@RibbonClient(name = "CLOUD-PROVIDER-PAYMENT", configuration = MyRibbonRule.class)
public class CloudConsumerOrder80Application {

    public static void main(String[] args) {
        SpringApplication.run(CloudConsumerOrder80Application.class, args);
    }

}
```

## 新版本SpringBoot使用LoadBalancer完成负载均衡

springboot 2020版本 eureka删除了ribbon可以通过@LoadBalancerClient注解来改变LoadBalancer

参考文章：<https://blog.csdn.net/weixin_50518271/article/details/111449560>

和这篇文章<https://www.cnblogs.com/fb010001/p/14613428.html>

先看下面那篇文章

先说下 这玩意目前只有两个实现

第一个是随即实现，第二个是轮循实现

![image-20220106232529165](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220106232529165.png)

而且还无法直接使用…..

必须自定义一个类

不能和application同级

这个类没有任何注解

```java
public class CustomRandomLoadBalancerClient implements ReactorServiceInstanceLoadBalancer {

    // 服务列表
    private ObjectProvider<ServiceInstanceListSupplier> serviceInstanceListSupplierProvider;

    public CustomRandomLoadBalancerClient(ObjectProvider<ServiceInstanceListSupplier> serviceInstanceListSupplierProvider) {
        this.serviceInstanceListSupplierProvider = serviceInstanceListSupplierProvider;
    }

    @Override
    public Mono<Response<ServiceInstance>> choose(Request request) {
        ServiceInstanceListSupplier supplier = serviceInstanceListSupplierProvider.getIfAvailable();
        return supplier.get().next().map(this::getInstanceResponse);
    }

    /**
     * 使用随机数获取服务
     *
     * @param instances
     * @return
     */
    private Response<ServiceInstance> getInstanceResponse(
            List<ServiceInstance> instances) {
        System.out.println("进来了");
        if (instances.isEmpty()) {
            return new EmptyResponse();
        }

        System.out.println("进行随机选取服务");
        // 随机算法
        int size = instances.size();
//        使用ThreadRandom防止出错
        ServiceInstance instance = instances.get(ThreadLocalRandom.current().nextInt(size));

        return new DefaultResponse(instance);
    }


}

```

然后再到main中使用

```java {3}
@SpringBootApplication
@EnableEurekaClient
@LoadBalancerClient(name = "CLOUD-PROVIDER-PAYMENT", configuration = CustomRandomLoadBalancerClient.class)
public class CloudConsumerOrder80Application {

    public static void main(String[] args) {
        SpringApplication.run(CloudConsumerOrder80Application.class, args);
    }

}
```

## 轮循算法是怎么实现的

结论：rest接口第几次请求%服务器集群总数量=实际调用服务下标位置，每次重启后rest重1开始计算

![image-20220107000127620](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220107000127620.png)

![image-20220107000308732](/images/Java/SpringCloud/05-Ribbon负载均衡服务调用/image-20220107000308732.png)

## 如果要自定义LoadBalancer负载均衡规则

md我目前也没有办法，只能说 真要用上了的话，就去看Ribbon的各种负载均衡的源码 然后手动敲一个吧..

没准以后这玩意完善了,,,,或者说干脆之后用nginx之类的来搞搞吧，网上也没有看到太深入的教程

