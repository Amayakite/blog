---
title: 20-Session共享
date: 2022-2-4 22:53:25
category: 分布式-微服务
tag:
- Redis
- Session
---

## 概述

就是让Redis来让session之间能够共享

虽然说可以通过tomcat的hash负载来解决，但是那样太拉胯了

![image-20220204231014917](/images/Java/SpringCloud/20-Session共享/image-20220204231014917.png)

### 依赖和配置

```xml
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

然后配置文件中配置好redis，这个东西会自动找redis的工厂来用

```yaml
--- #############################################################################
spring:
  redis:
    host: myserver
    port: 13002
    password: amayakiteProjectRedis
    database: 0

--- #
spring:
  session:
    # 启用redis作为session管理器 还可以选择其他的session管理器，例如MongoDB，jdbc等
    store-type: redis
    # session的过期时间，单位为秒
    timeout: 7200
    redis:
      # 启用cookie时，cookie的命名空间
      namespace: "amayakiteProjectSession:session"
```

然后启动类上要额外加一个注解

```java {1}
@SpringBootApplication
@EnableFeignClients(basePackages = "com.amayakite.shop.auth.feign")
public class AuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }
}
```

然后照常使用HttpSession即可

### 配置cookie存档的信息以及自定义序列化方式

1. 配置cookie的存储名字之类的
2. 配置使用json来创建和解析对应的内容（默认是jdk序列化，需要实体类实现序列化接口）

```java
@Configuration
public class SessionConfig {

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer defaultCookieSerializer = new DefaultCookieSerializer();
        defaultCookieSerializer.setCookieMaxAge(60 * 60 * 24 * 7);
        defaultCookieSerializer.setCookieName("SHOP_SESSION");
        defaultCookieSerializer.setDomainName("my-shop.com");

        defaultCookieSerializer.setUseBase64Encoding(true);
        return defaultCookieSerializer;
    }

    @Bean
    public RedisSerializer<Object> redisSerializer() {
        return new GenericJackson2JsonRedisSerializer();
    }
}
```
