---
title: 11-Alibaba入门简介
date: 2022-1-10 13:14:10
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Alibaba
- SpringCloud
---

## 入门简介

只能说，这就是分布式究极解决方案

### 为什么会出现Spring Cloud Alibaba

主要原因是**Spring Cloud Netflix**项目进入了维护模式

![image-20220110131758625](/images/Java/SpringCloud/11-Alibaba入门/image-20220110131758625.png)

当让这并不包括Eureka或并发限制模块

什么是维护模式？

> 不会对模块添加新功能，只会修复bug，而且是稍微有点重大的BUG

我们都知道Spring Cloud号称版本迭代王。。。所以Netflix拉下的东西必须得有其他东西来代替

所以这不就来了

![image-20220110141014724](/images/Java/SpringCloud/11-Alibaba入门/image-20220110141014724.png)

那么Alibaba为什么这么出色呢？

因为有阿里云，Spring Cloud Alibaba跟阿里云生态圈适配的非常好…

![image-20220110141541587](/images/Java/SpringCloud/11-Alibaba入门/image-20220110141541587.png)

能干嘛？

<https://github.com/alibaba/spring-cloud-alibaba>

因为是国人开发的，所以有中文文档

<https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md>

- **服务限流降级**：默认支持 WebServlet、WebFlux、OpenFeign、RestTemplate、Spring Cloud Gateway、Zuul、Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。
- **服务注册与发现**：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。
- **分布式配置管理**：支持分布式系统中的外部化配置，配置更改时自动刷新。
- **消息驱动能力**：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。
- **分布式事务**：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。
- **阿里云对象存储**：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。
- **分布式任务调度**：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。
- **阿里云短信服务**：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。

使用：

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>版本</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Spring官方文档

<https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/en-us/index.html>

中文

<https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html>





