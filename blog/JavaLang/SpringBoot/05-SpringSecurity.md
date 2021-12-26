---
title: 05-SpringSecurity
date: 2021-12-24 14:35:20
category: SpringBoot
tags:
- SpringSecurity
- SpringBoot 
---

## 简介

这里我看的是这位Up主的视频来学习的

https://www.bilibili.com/video/BV1mm4y1X7Hc?from=search&seid=15641836746784921754&spm_id_from=333.337.0.0

感觉比ssg和hm的好非常多

​		Spring Security是Spring家族中的一个安全管理框架，相比于另一个安全框架Shiro，它提供了更丰富的功能，社区资源也比Shiro丰富

​		一般来说中大型的项目都是用这个玩意来做安全框架，小项目用Shiro可能多一些，因为相比于这玩意，SHiro上手更简单一些

​		这玩意的用处：

​		一般的Web应用需要进行认证和授权

​		认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户

​		授权：经过认证后判断当前用户是否有权限进行某个操作

而认证和授权也是Spring Security作为安全框架的核心功能

## 快速入门

### 准备工作

创建一个SpringBoot工程

![image-20211224145742822](/images/SpringBoot/05-SpringSecurity/image-20211224145742822.png)

准备一个Mapping

```java
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String hello() {
        return "hello";
    }
}

```

访问是可以正常访问的，返回hello 这个和之前没有什么区别

### 引入springSecurity

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

引入之后，重启下项目，访问hello

你会发现

![image-20211224150944761](/images/SpringBoot/05-SpringSecurity/image-20211224150944761.png)

自动跳转到了http://localhost:8080/login

这个页面

那么我们该输入啥用户名呢

其实用户名叫user

密码会输出在控制台，我这里的是

`Using generated security password: 35a459bf-74c7-4c8d-8e91-d5cb7b6ba280`

我们输入后就能正常访问hello

​		也就是说，引入依赖后我们去尝试访问之前的接口就会自动跳转到springSecurity的默认登陆页面，默认用户名是user，默认密码在控制台打印

​		必须登录之后才能对接口进行访问

### 登陆校验的流程

1. 前端：携带用户密码访问登陆接口
2. 服务端去sql中验证这两项
   1. 如果验证正确，使用用户名、密码生成一个jwt
   2. 把jwt响应给前端
3. 前端：登录后访问其他请求，需要在请求头中携带token
4. 服务端：根据请求头中的token进行解析，获取userID
   1. 根据用户id获取用户的相关信息，如果有权限则允许访问相关资源
   2. 访问目标资源，响应给前端

![image-20211224152333989](/images/SpringBoot/05-SpringSecurity/image-20211224152333989.png)

### SpringSecurity的基本原理

实际上就是一个过滤器链，内部包含了提供各种功能的过滤器，入门案例中的过滤器如下所示

![image-20211224153100740](/images/SpringBoot/05-SpringSecurity/image-20211224153100740.png)

图中只显示了核心过滤器，其他非核心的过滤器并没有展示

**UsernamePasswordAuthenticationFilter**：负责处理我们在登陆页面填写了用户名密码后的登陆请求，入门案例的认证工作由它负责

**ExceptionTranslationFilter**：处理过滤器链中抛出的任何AccessDeniedException和AuthenticationException

**FilterSecurityInterceptor**：负责权限校验过滤器

![image-20211224161503101](/images/SpringBoot/05-SpringSecurity/image-20211224161503101.png)

![image-20211224161937762](/images/SpringBoot/05-SpringSecurity/image-20211224161937762.png)

Authentication接口：它的实现类表示当前访问的用户，封装了用户相关信息

AuthenticationManager接口：定义了认证Authentication的方法

UserDetailService接口：加载用户特定数据的核心接口，里面定义了一个根据用户名查询用户的方法

UserDetails接口：提供核心用户信息，通过UserDetailService根据用户名获取的处理用户要封装成UserDetail对象返回，让后将这些信息封装到Authentication对象中

![image-20211224162759407](/images/SpringBoot/05-SpringSecurity/image-20211224162759407.png)

![image-20211224162913216](/images/SpringBoot/05-SpringSecurity/image-20211224162913216.png)

解决方案——Redis缓存

![image-20211224180639419](/images/SpringBoot/05-SpringSecurity/image-20211224180639419.png)

### 依赖准备

第一个是redis 第二个是做json转换 第三个是之后用jwt时候的依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.79</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.8</version>
    <!--version可以去这里看看最新是什么版本
            https://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter
            -->
</dependency>
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.3.4</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

```

#### sql表准备

```sql
create table `sys_user`(
	id bigint(20) not null auto_increment primary key  comment '主键',
    user_name varchar(64) not null default "null" comment '用户名',
    nick_name varchar(64) not null default "null" comment '昵称',
    pass_word varchar(64) not null default "null" comment '密码',
    `status` char(1) default "0" comment '账号状态（0正常，1停用）',
	 `email` varchar(64) not null default "null" comment '邮箱',
    phone varchar(32) default null comment '手机号' ,
    sex char(1) default '2' comment '用户性别(0男1女2未知)',
    avatar varchar(128) default null comment '头像',
    user_type char(1) not null default '1' comment '用户类别 0 管理员 1 普通用户',
    create_by bigint(20) default null comment '创建人的用户id',
    create_time datetime default null comment '创建时间',
    update_by bigint(20) default null comment '更新人',
    update_time datetime default null comment '更新时间',
    del_flag int(11) default '0' comment "删除标志0代表未删除，1表示已删除" 
)auto_increment=2 charset=utf8mb4 comment="用户表";
```

#### SpringBoot配置文件准备

```yaml

# 数据源的绑定
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/db1
    username: root
    password: 123456
    druid:
      stat-view-servlet:
        # 开启监控统计功能 就是那个网页访问的功能
        enabled: true
        # 配置访问监控页的账号和密码
        login-password: 123456
        login-username: root
        # 是否能重置
        reset-enable: false
      # 监控web应用相关
      web-stat-filter:
        # 是否开启监控
        enabled: true
        # 监控的路径
        url-pattern: /*
        # 排除的路径
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'
      # 监听器和防火墙相关的设置开启
      filters: stat,wall

      filter:
        stat:
          # 开启监控
          enabled: true
          # 让druid 统计 慢于1000ms的查询 都统计到慢查询上面去
          slow-sql-millis: 1000
          # 是否记录慢查询
          log-slow-sql: true
        wall:
          #开启防火墙
          enabled: true
          # 这里可以指定一些防火墙的规则 例如 update不能操作 直接 :
          config:
            # 不允许修改表
            drop-table-allow: false
            # 不允许在无条件的状态下删除数据
            delete-where-none-check: false
            # wall的详细配置看这里 https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE-wallfilter
      #          config:
      #            update-allow:
      # 要监控的包（AOP增强）
      aop-patterns: com.MyProject.webadmin.*
  jdbc:
    template:
      # 设置查询超时时间 单位为秒
      query-timeout: 30
```

#### 相关工具类的准备

##### RedisJson序列化Utils

```java
package com.myspringproject.springsecurity.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.ParserConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 27-SpringSecurity
 * @BelongsPackage com.myspringproject.springsecurity.utils
 * @date 2021/12/25 15:16
 * @description Redis使用FastJson序列化
 */
public class FastJsonRedisSerializer<T> implements RedisSerializer<T> {
    public static final Charset DEFAULT_CHARSET = StandardCharsets.UTF_8;

    private Class<T> clazz;

    static {
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
    }

    public FastJsonRedisSerializer(Class<T> clazz) {
        super();
        this.clazz = clazz;
    }

    @Override
    public byte[] serialize(T t) throws SerializationException {
        if (t == null) {
            return new byte[0];
        }

        return JSON.toJSONString(t, SerializerFeature.WriteClassName).getBytes(DEFAULT_CHARSET);
    }

    @Override
    public T deserialize(byte[] bytes) throws SerializationException {
        if (bytes == null || bytes.length <= 0) {
            return null;

        }
        String str = new String(bytes, DEFAULT_CHARSET);
        return JSON.parseObject(str, clazz);
    }

    protected JavaType getJavaType(Class<?> clazz) {
        return TypeFactory.defaultInstance().constructType(clazz);
    }
}

```

##### JWT工具类

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.7.18</version>
</dependency>
```

建议使用[hutool](https://www.hutool.cn/docs/#/jwt/%E6%A6%82%E8%BF%B0)而不是使用下面的

```java
package com.myspringproject.springsecurity.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 27-SpringSecurity
 * @BelongsPackage com.myspringproject.springsecurity.utils
 * @date 2021/12/25 15:34
 * @description JWT工具类
 */
public class JwtUtils {
    /**
     * 默认的有效时长为1h
     */
    public static final Long JWT_TIME = 60 * 60 * 100L;

    /**
     * JWT签名密钥
     */
    public static final String JWT_KEY = "MyProject";

    /**
     * 生成一个UUID 没有横杠
     *
     * @return
     */
    public static String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }


    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SignatureAlgorithm hs256 = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowTimeMillis = System.currentTimeMillis();
        Date nowTime = new Date(nowTimeMillis);
        if (ttlMillis == null) {
            ttlMillis = JWT_TIME;
        }
        Date date = new Date(nowTimeMillis + ttlMillis);
        return Jwts.builder()
                // 设置jwt的唯一身份标识
                .setId(uuid)
//                主题 json数据
                .setSubject(subject)
//                颁发时间
                .setIssuedAt(nowTime)
//                颁发者
                .setIssuer("World")
//                对称算法加密
                .signWith(SignatureAlgorithm.HS256, secretKey)
//                过期时间
                .setExpiration(date);

    }

    /**
     * 生成一个默认超时时间的jwt
     * @param subject
     * @return
     */
    public static String createJWT(String subject) {
        return getJwtBuilder(subject, null, getUUID()).compact();

    }

    /**
     * 生成JWT
     *
     * @param subject   token中要存放的数据（JSON格式）
     * @param ttlMillis 超时时间
     * @return
     */
    public static String createJWT(String subject, Long ttlMillis) {
        return getJwtBuilder(subject, ttlMillis, getUUID()).compact();
    }


    /**
     * 生成加密后的秘钥 SecretKey
     *
     * @return SecretKey
     */
    public static SecretKey generalKey() {
        byte[] decode = Base64.getDecoder().decode(JwtUtils.JWT_KEY);
        return new SecretKeySpec(decode, 0, decode.length, "AES");
    }

    /**
     * 解析jwt
     *
     * @param jwt
     * @return
     */
    public static Claims parseJWT(String jwt) {
        SecretKey secretKey = generalKey();
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody();
    }


}

```

##### RedisUtils

```java
package com.myspringproject.springsecurity.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 27-SpringSecurity
 * @BelongsPackage com.myspringproject.springsecurity.utils
 * @date 2021/12/25 16:05
 * @description Redis操作封装
 */
@Component
public class RedisCache {
    @Autowired
    public RedisTemplate redisTemplate;

    /**
     * 缓存基本的对象 Integer，实体类等
     *
     * @param key   缓存的键
     * @param value 缓存的值
     */
    public <T> void setCacheObject(final String key, final T value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 缓存对象的同时设置时间
     *
     * @param key      缓存的键
     * @param value    缓存的值
     * @param timeout  缓存的时间
     * @param timeUnit 时间单位
     * @param <T>
     */
    public <T> void setCacheObject(final String key, final T value, final long timeout, final TimeUnit timeUnit) {
        redisTemplate.opsForValue().set(key, value, timeout, timeUnit);
    }

    /**
     * 设置有效时间
     *
     * @param key     缓存的键
     * @param timeout 缓存的时间 秒为单位
     * @return true 成功 false 失败
     */
    public boolean expire(final String key, final long timeout) {
        return redisTemplate.expire(key, timeout, TimeUnit.SECONDS);
    }

    /**
     * 获取缓存的对象
     *
     * @param key 缓存的键
     * @return 缓存的值
     */
    public <T> T getCacheObject(final String key) {
        return (T) redisTemplate.opsForValue().get(key);
    }

    /**
     * 删除单个对象
     *
     * @param key 缓存的键
     * @return true 成功 false 失败
     */
    public boolean deleteCacheObject(final String key) {
        return redisTemplate.delete(key);
    }

    /**
     * 删除集合对象
     *
     * @param collection 集合
     * @return true 成功 false 失败
     */
    public long deleteCacheObject(final Collection collection) {
        return redisTemplate.delete(collection);
    }

    /**
     * 缓存list数据
     *
     * @param key      缓存的键
     * @param datalist 缓存的值
     * @param <T>泛型
     * @return 0：存放失败，1：存放成功
     */
    public <T> long setCacheList(final String key, final List<T> datalist) {
        Long aLong = redisTemplate.opsForList().leftPushAll(key, datalist);
        return aLong == null ? 0 : aLong;
    }


    /**
     * 获取list数据
     *
     * @param key   缓存的键
     * @param <T>泛型
     * @return list数据
     */
    public <T> List<T> getCacheList(final String key) {
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    /**
     * 缓存Set
     *
     * @param key     缓存的键
     * @param dataSet 缓存的值
     * @param <T>泛型
     * @return 数据缓存的对象
     */
    public <T> BoundSetOperations<String, T> setCacheSet(final String key, final Set<T> dataSet) {
        BoundSetOperations ops = redisTemplate.boundSetOps(key);
        Iterator<T> iterator = dataSet.iterator();
        while (iterator.hasNext()) {
            ops.add(iterator.next());
        }
        return ops;
    }

    /**
     * 获取Set
     *
     * @param key   缓存的键
     * @param <T>泛型
     * @return 数据缓存的对象
     */
    public <T> Set<T> getCacheSet(final String key) {
        return redisTemplate.boundSetOps(key).members();
    }

    /**
     * 获得缓存的map
     *
     * @param key   缓存的键
     * @param <T>泛型
     * @return 缓存的map
     */
    public <T> Map<String, T> getCacheMap(final String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * 在hash中存入数据
     * @param key Redis键
     * @param hkey Hash键
     * @param value 值
     * @param <T> 泛型
     */
    public <T> void setCacheMapValue(final String key, final String hkey, final T value) {
        redisTemplate.opsForHash().put(key, hkey, value);
    }

    /**
     * 删除hash中的数据
     * @param key Redis KEY
     * @param hkey Hash键
     */
    public void delCacheMapValue(final String key, final String hkey){
        redisTemplate.opsForHash().delete(key,hkey);

    }

    /**
     * 获取多个hash中的值
     * @param key Redis键
     * @param hkeys Hash键
     * @param <T> 泛型
     * @return Hash对象集合
     */
    public <T> List<T> getMultiCacheMapValue(final String key ,final Collection<Object> hkeys){
         return redisTemplate.opsForHash().multiGet(key,hkeys);
    }

    /**
     * 获取缓存的基本对象列表
     * @param pattern
     * @return
     */
    public Collection<String> keys(final String pattern){
        return redisTemplate.keys(pattern);
    }

}

```

##### WebUtils

```java
package com.myspringproject.springsecurity.utils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 27-SpringSecurity
 * @BelongsPackage com.myspringproject.springsecurity.utils
 * @date 2021/12/25 16:33
 * @description WebUtils
 */
public class WebUtils {

    /**
     *  将字符串渲染到客户端
     * @param response  响应对象
     * @param string    待渲染的字符串
     * @return null 如果出错抛出异常
     */
    public static String redderString(HttpServletResponse response, String string) {
        try {
            response.setStatus(200);
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(string);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


}

```

#### 返回类型：ResponseResult类

这个是拿来统一返回类型的 

JsonInclude这个注解详细说明可以看[这篇文章](https://blog.csdn.net/weixin_44130081/article/details/89678450)  简单来说  按照下面那个写法 为null的字段将不会被序列化到最终生成的json字符串中

```java
package com.myspringproject.springsecurity.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 27-SpringSecurity
 * @BelongsPackage com.myspringproject.springsecurity.controller
 * @date 2021/12/26 20:24
 * @description 响应类
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
public class ResponseResult<T> {

    /**
     * 状态码
     */
    private Integer code;

    /**
     * 提示信息
     */
    private String msg;

    /**
     * 查询到的结果
     */
    private T data;

    public ResponseResult(Integer code) {
        this.code = code;
    }

    public ResponseResult(Integer code, T data) {
        this.code = code;
        this.data = data;
    }

    public ResponseResult(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}

```



#### Config类

##### RedisConfig

```java
@Configuration
public class RedisConfig {

    /**
     * 这里是解决乱码的现象
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        FastJsonRedisSerializer<Object> objectFastJsonRedisSerializer = new FastJsonRedisSerializer<>(Object.class);

        //        使用StringRedisSerializer反序列化redis 的key值
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(objectFastJsonRedisSerializer);

        //        hash的key也采用StringRedisSerializer
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(objectFastJsonRedisSerializer);

        template.afterPropertiesSet();
        return template;


    }

}
```

#### Domain准备

注意 配置完毕后需要手动给userMapper加上@mapper或者在main中加上mapper扫描

![image-20211225172619558](/images/SpringBoot/05-SpringSecurity/image-20211225172619558.png)

接着按照这些勾上

![image-20211225172630429](/images/SpringBoot/05-SpringSecurity/image-20211225172630429.png)

你就能得到这些

![image-20211225172659349](/images/SpringBoot/05-SpringSecurity/image-20211225172659349.png)

#### 测试sql

```java
@SpringBootTest
@Slf4j
class ApplicationTests {

    @Autowired
    SysUserService sysUserService;

    @Test
    void contextLoads() {

        SysUser sysUser = new SysUser();
        sysUser.setUserName("admin");
        sysUser.setPassWord("123456");
        sysUser.setEmail("admin@xx.com");
        sysUser.setPhone("123456789");
        sysUser.setStatus("1");
        sysUser.setSex("1");
        sysUser.setAvatar("https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif");
        sysUser.setUserType("1");
        sysUser.setCreateBy(1111L);
        boolean save = sysUserService.save(sysUser);
        log.info("save result: {}", save);
    }

}

```

### ✨实现我们的用户登录功能-数据库校验用户

首先 我们已经通过前面的初步原理分析 知道了数据最终是交给UserDetails来处理

所以我们现在service.impl包下新建一个UserDetailServiceImpl，继承自UserDetailsService 并将sysUserService传入

```java
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private SysUserService sysUserService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //        查询对应用户的信息
        LambdaQueryWrapper<SysUser> wrapper = new LambdaQueryWrapper<>();
        //        这里相当于是 select * from sys_user where username=传入的username
        wrapper.eq(SysUser::getUserName, username);
        SysUser user = sysUserService.getOne(wrapper);
        if (Objects.isNull(user)) {
            //            如果没有查询到用户就先抛出异常
            throw new UsernameNotFoundException("用户名不存在");
        }
        //        把数据封装成userdetails返回
        LoginUser loginUser = new LoginUser(user);
        //      TODO  查询对应用户的权限信息
        return loginUser;
    }
}
```

它要返回一个UserDetails对象 这个UserDetails是一个接口 我们要使用的话得创建一个实现类

所以我们在domain下新建一个LoginUser

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginUser implements UserDetails {
    private SysUser user;

    /**
     * 这个是获取权限信息 我们暂时先返回null
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }


    @Override
    public String getPassword() {
        return user.getPassWord();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    /**
     * 是否没有过期
     *
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 是否没有超时
     *
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 是否可用
     *
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
```

接着启动尝试连接

但是发现了一个问题

![image-20211225183046928](/images/SpringBoot/05-SpringSecurity/image-20211225183046928.png)

There is no PasswordEncoder mapped for the id "null"

这个问题之后会说明 现在说一个最简单的解决方案

在sql中的password字段上面加上一个前缀`{noop}` 表示这个密码是一个明文

![image-20211225183130223](/images/SpringBoot/05-SpringSecurity/image-20211225183130223.png)

接着就可以成功访问了

![image-20211225183200323](/images/SpringBoot/05-SpringSecurity/image-20211225183200323.png)

### ✨关于密码的加密存储

​		前面我们刚刚遇到一个问题，就是不在密码前加东西就会抛异常

实际的流程是这样的：

- 用户请求
- 收到请求 经过杂七杂八的流程之后，将用户名传递给我们的`UserDetailsService`内
- 这个方法要返回一个UserDetailsService对象
- 在返回之后 就有其他的东西来验证这个对象中的账号 和 密码 是不是和用户传入的完全一致
- 来验证密码的是一个叫`PasswordEncoder`的玩意
- 如果一致 就过了 如果不一致 就GG
- 

​		实际项目中，我们并不会把密码的明文存储到数据库中

​		所以这个玩意默认使用的PasswordEncoder要求数据库中的密码格式为：`{id}password`，它会根据id去判断密码的加密方式，但是我们一般不会才用这种方式，所以就需要替换PasswordEncoder

​		替换的方式比较简单

​		一般使用springSecurity为我们提供的BCyptpasswordEncoder

​		我们需要定一个那玩意，并注入到spring容器内，springSecurity就会使用它来进行密码校验

​		**我们可以自定义一个springSecurity配置类，这个配置类要继承WebSecurityConfigurationAdapter，就像是SpringMVC那样**

我们写的话非常简单 只需要

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}

```

但是问题来了--这个BCryptPasswordEncoder是拿来干嘛的？

为此，我写了个test来测试下

这玩意我看了 只有两个方法 encode 和 matches

encode非常简单 就是加密

matches 就是验证 明文 和密文 是否匹配

```java
@Test
public void testBCryptPasswordEncoder() {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    //        测试每次生成的密码都不一样
    String password1 = encoder.encode("123456789");
    String password2 = encoder.encode("123456789");
    String password3 = encoder.encode("123456789");
    String password4 = encoder.encode("123456789");
    //        打印
    log.info("password1={},验证结果：{}", password1,encoder.matches("123456789", password1));
    log.info("password2={},验证结果：{}", password2,encoder.matches("123456789", password2));
    log.info("password3={},验证结果：{}", password3,encoder.matches("123456789", password3));
    log.info("password4={},验证结果：{}", password4,encoder.matches("123456789", password4));

}
```

运行结果：

```md
2021-12-25 20:39:05.027  password1=$2a$10$9w.GEgmRE/Rjlw.9.gC2q.4UY05DG/MHzzlzFZ26Labs2XFUJa4GG,验证结果：true
2021-12-25 20:39:05.121  password2=$2a$10$ebS0MgTx.PxaXiB4Qxg7ie5emD1BEEJuQdzvxobWYPveYOhtA8o6y,验证结果：true
2021-12-25 20:39:05.201  password3=$2a$10$iL1DCLTRlCkIlSu6.2QG0ux8Cs6gz/h6A.8XH/QGJrKUiik0ZvIlu,验证结果：true
2021-12-25 20:39:05.269  password4=$2a$10$23sHgmy44kdQ.gTZwcRhfuP3nFlP6e8Npljl3pQGDFtcy9gZAVXbS,验证结果：true
```

可以看到 每次生成的密码都不一样 但是能发现他们的共同点：

`$2a$10` 头部的这个玩意是相同的，在密码学中，这个东西被称为加盐--就像是炒菜放盐一样 最终炒出来的菜变了，但是除去盐，其他的东西都一样

接下来我debug看下 

我们登陆的时候 这玩意是怎么被调用的

首先我把`$2a$10$9w.GEgmRE/Rjlw.9.gC2q.4UY05DG/MHzzlzFZ26Labs2XFUJa4GG`存放到我的数据库密码内 然后再输入明文账号admin和密码123456789

接着debug这个matches方法

发现调用它的是这个方法

![image-20211225204445884](/images/SpringBoot/05-SpringSecurity/image-20211225204445884.png)

additionalAuthenticationChecks

以及一堆链式调用层 这个就之后再研究了 总之 我们现在知道 密码进来了 明文会被拿的去和密文匹配

![image-20211225204656463](/images/SpringBoot/05-SpringSecurity/image-20211225204656463.png)

密文就是我们之前存储在数据库内的玩意

![image-20211225204620921](/images/SpringBoot/05-SpringSecurity/image-20211225204620921.png)

### 自定义基于Hutool的JWT工具类

之前我们引入过了一个JWT工具类 当然实际开发中一般都是直接用Hutool的二度封装一下

这里就简单封装下：

```java
package com.myspringproject.springsecurity.utils;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.exceptions.ValidateException;
import cn.hutool.jwt.*;
import cn.hutool.jwt.signers.JWTSigner;
import cn.hutool.jwt.signers.JWTSignerUtil;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 27-SpringSecurity
 * @BelongsPackage com.myspringproject.springsecurity.utils
 * @date 2021/12/25 15:34
 * @description JWT工具类
 */
public class JwtUtils {
    /**
     * 默认的有效时长为1个小时(60分钟)
     */
    public static final Integer JWT_TIME = 60;

    /**
     * JWT签名密钥
     */
    public static final byte[] JWT_KEY = "MyProject".getBytes(StandardCharsets.UTF_8);

    public static final JWTSigner JWT_SIGNER = JWTSignerUtil.hs256(JWT_KEY);

    /**
     * 生成一个UUID 没有横杠
     *
     * @return
     */
    @SuppressWarnings("all")
    public static String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * 创建JWT
     *
     * @param value 载荷中的数据 存放的数据存放在data内
     * @param uuid  唯一标识
     * @param time  有效时长
     * @return
     */
    public static JWT createJWT(String value, String uuid, int time) {
        JWT jwt = JWT.create();
        DateTime dateTime = new DateTime();
        jwt.setPayload("jti", uuid);
        jwt.setPayload("data", value);
        jwt.setExpiresAt(DateUtil.offsetMinute(dateTime, time));
        jwt.setIssuedAt(dateTime);
        jwt.setNotBefore(dateTime);
        jwt.setSigner(JWT_SIGNER);
        return jwt;
    }

    public static String createToken(String value) {
        return createJWT(value, getUUID(), JWT_TIME).sign();
    }

    public static String createToken(String value, int time) {
        return createJWT(value, getUUID(), time).sign();
    }

    public static String createToken(String value, int time, String uuid) {
        return createJWT(value, uuid, time).sign();
    }

    /**
     * 解析tonken 使用默认的秘钥
     *
     * @param token
     * @return
     */
    public static JWTPayload descToken(String token) {
        JWT jwt = JWTUtil.parseToken(token);
        try {
            JWTValidator.of(jwt).validateAlgorithm(JWT_SIGNER).validateDate();
        } catch (ValidateException e) {
            e.printStackTrace();
        }
        return jwt.getPayload();

    }

    /**
     * 解析token 使用自定义的秘钥
     *
     * @param token
     * @param lock
     * @return
     */
    public static JWTPayload descToken(String token, String lock) {
        JWT jwt = JWTUtil.parseToken(token);
        try {
            JWTValidator.of(jwt).validateAlgorithm(JWTSignerUtil.hs256(lock.getBytes(StandardCharsets.UTF_8))).validateDate();
        } catch (ValidateException e) {
            e.printStackTrace();
        }
//        返回荷载中的数据
        return jwt.getPayload();
    }

//    TODO map之类的加解密

}

```

### 自定义登陆接口的流程说明

​		首先是自定义登陆接口，然后让SpringSecurity对这个接口进行放行，让用户访问这个接口的时候不用登录也能访问

​		在接口中我们通过AuthenticationManager的authentication方法来进行用户验证，所以只需要在Security中配置把AuthenticationManager注入容器

​		认证成功的话生成一个JWT，放入响应中返回，并且为了让用户下次请求时通过JWT识别出具体是哪个用户，我们需要把用户信息存入Redis，可以把用户的id作为key

我们按照用户登录的时间线来进程处理

### ✨自定义登陆接口的实现

首先，我们得明确的知道 用户得通过什么接口来进行登录 为此 我写了一个UserLoginController

前后端分离 那肯定是返回一个Json数据 我们应该返回一个之前定义好的ResponseResult类（密码之类的处理在之前星标处实现）

```java
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;


    @PostMapping("/user/login")
    public ResponseResult<?> login(@RequestBody SysUser user) {
        //        TODO Login
        return loginService.login(user);
    }

}
```

那么处理登陆就交给loginService来实现 但是我们目前并没有这个类

所以我们创建下，interface和实现类

```java
public interface LoginService {
    ResponseResult<? extends Map> login(SysUser user);

}
```

这里应该要返回一个map，里面存储了对应的token

例如：

```java
data={
    code:200,
    msg:"登陆成功",
    data:{
        token:"token"
    }
}
```

这样一个格式

失败的话 另说

那么接下来该如何实现呢？

前面说过 **在接口中我们通过AuthenticationManager的authentication方法来进行用户验证，所以只需要在Security中配置把AuthenticationManager注入容器**

所以我们先要获取到AuthenticationManager 这个又改如何定义呢？

其实仔细想想 这个玩意肯定就得在SpringSecurity的配置类中配置

所以我们就去WebSecurityConfigurerAdapter的方法中找

接着看到了这个方法

```java
/**
	 * Gets the {@link AuthenticationManager} to use. The default strategy is if
	 * {@link #configure(AuthenticationManagerBuilder)} method is overridden to use the
	 * {@link AuthenticationManagerBuilder} that was passed in. Otherwise, autowire the
	 * {@link AuthenticationManager} by type.
	 * @return the {@link AuthenticationManager} to use
	 * @throws Exception
	 */
protected AuthenticationManager authenticationManager() throws Exception {
    if (!this.authenticationManagerInitialized) {
        configure(this.localConfigureAuthenticationBldr);
        if (this.disableLocalConfigureAuthenticationBldr) {
            this.authenticationManager = this.authenticationConfiguration.getAuthenticationManager();
        }
        else {
            this.authenticationManager = this.localConfigureAuthenticationBldr.build();
        }
        this.authenticationManagerInitialized = true;
    }
    return this.authenticationManager;
}
```

大意是 要使用它的话 直接重写 然后加上一个@bean即可获取

所以我们就照葫芦画瓢 直接在自己的配置类中加上即可

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean(name = "MyAuthenticationManager")
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


}
```

好了 接下来 因为这里注入了Bean 所以我们在自己的Service中直接使用即可

这个东西使用非常简单 

调用它需要传入一个Authentication 这个玩意是一个接口 我们直接看他的实现类

![image-20211226221154954](/images/SpringBoot/05-SpringSecurity/image-20211226221154954.png)

其中最下面那个家伙非常眼熟 就是一个验证用户和密码的 所以直接用它

使用它的时候 只需要new 然后传入账号密码即可 这之后这个类会调用我们之前写的那个**UserDetails**类来进行验证



```java
@Service
public class LoginServiceImpl implements LoginService {

    @Resource(name = "MyAuthenticationManager")
    private AuthenticationManager authenticationManager;

    // 这个之后肯定是用得上的
    @Autowired
    RedisCache redisCache;

    @Override
    public ResponseResult<Map<String, String>> login(SysUser user) {
//        获取AuthenticationManager的authentication进行认证
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassWord()));
//        如果认证没通过 给出对应的提示 例如抛出异常的方式 如果认证不通过 上面的返回值是一个null
//        如果认证通过 使用UserID生成JWT Token

//        获取用户ID
//        把完整的用户信息存入redis userid作为key
        return null;

    }
}
```

我们debug下 然后用postman来链接 看下这一步出现了什么

可以看到 它最终返回了一个这样的对象

![image-20211226221502630](/images/SpringBoot/05-SpringSecurity/image-20211226221502630.png)

里面有我们之前在UserDetail中返回的loginUser

```java
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private SysUserService sysUserService;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        查询对应用户的信息
        LambdaQueryWrapper<SysUser> wrapper = new LambdaQueryWrapper<>();
//        这里相当于是 select * from sys_user where username=传入的username
        wrapper.eq(SysUser::getUserName, username);
        SysUser user = sysUserService.getOne(wrapper);
        if (Objects.isNull(user)) {
//            如果没有查询到用户就先抛出异常
            throw new UsernameNotFoundException("用户名不存在");
        }
//        把数据封装成userdetails返回
        LoginUser loginUser = new LoginUser(user);
//      TODO  查询对应用户的权限信息
        return loginUser;
    }
}
```

loginUser内我们之前定义过一个 是为了让其符合返回值 所以继承了UserDetails并实现了对应的方法

所以说我们接下来的操作就简单了

首先在application中配置下redis

```yaml
spring:
  redis:
    host: ip地址
    port: 端口
    password: 你的密码
    username: default
```

然后完成一下这个类

```java
@Service
public class LoginServiceImpl implements LoginService {

    @Resource(name = "MyAuthenticationManager")
    private AuthenticationManager authenticationManager;

    @Autowired
    RedisCache redisCache;

    @Override
    public ResponseResult<Map<String, String>> login(SysUser user) {
//        获取AuthenticationManager的authentication进行认证
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassWord()));
//        如果认证没通过 给出对应的提示 例如抛出异常的方式 如果认证不通过 上面的返回值是一个null

        if (Objects.isNull(authenticate)) {
            throw new RuntimeException("登陆失败");
        }
//        如果认证通过 使用UserID生成JWT Token
		
        // 之前debug看到了返回值类型 这里直接获取
        LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
//        获取用户ID
        Long id = loginUser.getUser().getId();
        String token = JwtUtils.createToken(id.toString());
//        把完整的用户信息存入redis userid作为key  RedisTemplate和JdbcTemplate一样 会自动封装对象成为键值对形式
        redisCache.setCacheObject("login:"+id, loginUser);
        
        // 将map返回 
        HashMap<String, String> map = new HashMap<>();
        map.put("token", token);
        return new ResponseResult<>(200, "登录成功", map);
    }
}
```

好了，那么接下来该如何让我们这个@Controller成为一个登陆的接口呢？

这里直接放配置 原理之后说

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean(name = "MyAuthenticationManager")
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * 定义访问权限
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
//                关闭csrf  csrf 是 前后端分离的时候要关闭的 之后 会说明
                .csrf().disable()
//                不通过session获取SecurityContext（登陆之后的用户认证信息 默认是在session中获取）
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
//                对于登录接口，允许匿名访问
                .antMatchers("/user/login").anonymous()
//                对于其他接口需要身份认证（除了上面的请求外全都要鉴权认证）
                .anyRequest().authenticated();

    }
}
```

接下来尝试访问

![image-20211226222558533](/images/SpringBoot/05-SpringSecurity/image-20211226222558533.png)

可以看到成功了

当让我们也可以配置下验证失败的

```java {11}
@Service
public class LoginServiceImpl implements LoginService {

    @Resource(name = "MyAuthenticationManager")
    private AuthenticationManager authenticationManager;

    @Autowired
    RedisCache redisCache;

    @Override
    public ResponseResult<Map<String, String>> login(SysUser user) {
        try {
            //        获取AuthenticationManager的authentication进行认证
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassWord()));
//        如果认证通过 使用UserID生成JWT Token

            LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
//        获取用户ID
            Long id = loginUser.getUser().getId();
            String token = JwtUtils.createToken(id.toString());
//        把完整的用户信息存入redis userid作为key
            HashMap<String, String> map = new HashMap<>();
            map.put("token", token);
            redisCache.setCacheObject("login:" + id, loginUser);
            return new ResponseResult<>(200, "登录成功", map);
        } catch (BadCredentialsException e) {
//            因为认证不通过抛出的是我们之前的哪个异常 org.springframework.security.authentication.BadCredentialsException: 用户名或密码错误 所以这里直接捕获并返回我们定义的值
            return new ResponseResult<>(400,"登陆失败");
        }
    }
}

```

认证失败 会直接在该行抛出错误 所以我们直接捕获处理即可

![image-20211226223054208](/images/SpringBoot/05-SpringSecurity/image-20211226223054208.png)

接下来检查一下redis内存储的数据

![image-20211226223129041](/images/SpringBoot/05-SpringSecurity/image-20211226223129041.png)

emm没问题

```json
{
    "@type": "com.myspringproject.springsecurity.domain.LoginUser",
    "accountNonExpired": true,
    "accountNonLocked": true,
    "credentialsNonExpired": true,
    "enabled": true,
    "password": "$2a$10$cdz7szFqlVtXBrzsFLEhNOcqgecvUsl7jqEu7/PoOXG7v9XDb8cGC",
    "user": {
        "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        "createBy": 1111,
        "delFlag": 0,
        "email": "admin@xx.com",
        "id": 2,
        "nickName": "null",
        "passWord": "$2a$10$cdz7szFqlVtXBrzsFLEhNOcqgecvUsl7jqEu7/PoOXG7v9XDb8cGC",
        "phone": "123456789",
        "sex": "1",
        "status": "1",
        "userName": "admin",
        "userType": "1"
    },
    "username": "admin"
}
```

PS 这个avatar是emm写着写着代码那个GitHub的代码提示插件提示的hhh

### ✨Token认证过滤器

流程：

1. 获取token
2. 解析token中的userid
3. 从redis内获取用户信息
4. 存入SpringSecurity

首先我们得设置一个**过滤器**而并非是一个拦截器

使用最基本的过滤器有概率出现一次访问多次拦截的问题 所以我们可以用Spring给我们提供的

`OncePerRequestFilter`

使用起来跟原生的过滤器没什么两样 并且可以省去扫包操作

为啥要用过滤器呢？

![image-20211226224724154](/images/SpringBoot/05-SpringSecurity/image-20211226224724154.png)

因为这个SpringSecurity是一个过滤器链！！！

所以我们必须得在它之前设定一个过滤器。。

这里就直接上代码了 首先写下过滤器并@component 方便等下注册

```java
@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //        获取token
        String token = request.getHeader("token");
        //        判断token是否为空
        if (StringUtils.isEmpty(token)) {
            //            放行 不做任何处理 之后SpringSecurity会直接拒绝
            filterChain.doFilter(request, response);
            //        如果这里没有加这个return 响应回来的时候还会走一遍过滤器链
            //            当然 上面也可以改成其他的 例如返回一句话之类的
            return;
        }

        //        解析token

        String userId;
        try {
            JWTPayload jwtPayload = JwtUtils.descToken(token);
            userId = (String) jwtPayload.getClaim("data");


        } catch (Exception e) {
            throw new RuntimeException("token错误");
        }
        //        从redis中获取用户信息
        String redisKey = "login:" + userId;
        //        我们在redisUtils中定义了方法泛型 所以会根据我们的调用自动转换成对应的类型 而无需我们手动转换
        LoginUser cacheObject = redisCache.getCacheObject(redisKey);
        if(Objects.isNull(cacheObject)){
            throw new RuntimeException("用户未登录");
        }

        //        存入SpringSecurity
        SecurityContextHolder.getContext().setAuthentication(
            //                这里说下 这个方法的传入的参数表示
            //                首先 为什么要调用它的三个参数的构造方法 因为这个方法可以让之后免除验证（不再做额外的账号密码校验）
            //                第一个参数 我们的用户认证信息
            //                第二个参数 证书信息 这个一般填null即可
            //              TODO  第三个参数 是关于权限认证的 这里先不写 以后来填坑
            new UsernamePasswordAuthenticationToken(cacheObject,null,null));
        //        放行
        filterChain.doFilter(request, response);
    }
}
```

接下来注册这个过滤器 因为是SpringSecurity家的  我们要加在验证用户密码前面 所以可以这样：

在SecurityConfig的文件中进行如下操作  -加三行代码即可

```java

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean(name = "MyAuthenticationManager")
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * 定义访问权限
     *
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
//                关闭csrf  csrf 是 前后端分离的时候要关闭的 之后 会说明
                .csrf().disable()
//                不通过session获取SecurityContext（登陆之后的用户认证信息 默认是在session中获取）
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
//                对于登录接口，允许匿名访问
                .antMatchers("/user/login").anonymous()
//                对于其他接口需要身份认证（除了上面的请求外全都要鉴权认证）
                .anyRequest().authenticated();

//        两个参数：
//        1. 过滤器
//        2. 过滤器在哪个过滤器前执行（插入）
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Autowired
    JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

}

```

测试：先获取token

![image-20211226235712796](/images/SpringBoot/05-SpringSecurity/image-20211226235712796.png)

再用token访问其他页面

![image-20211226235730181](/images/SpringBoot/05-SpringSecurity/image-20211226235730181.png)

### ✨退出登录

我们只需要定义一个退出登陆的Controller，然后获取SecurityContext中的认证信息  删除redis内对应的数据即可

非常简单 先来个接口

```java
@RequestMapping("/user/logout")
public ResponseResult<?> logout() {
    return loginService.logout();
}
```

这个接口是只有登陆后才能访问 接下来编写下实例方法

```java
package com.myspringproject.springsecurity.service.impl;

import com.myspringproject.springsecurity.controller.ResponseResult;
import com.myspringproject.springsecurity.domain.LoginUser;
import com.myspringproject.springsecurity.domain.SysUser;
import com.myspringproject.springsecurity.service.LoginService;
import com.myspringproject.springsecurity.utils.JwtUtils;
import com.myspringproject.springsecurity.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 27-SpringSecurity
 * @BelongsPackage com.myspringproject.springsecurity.service.impl
 * @date 2021/12/26 20:33
 * @description LoginService的实现
 */
@Service
public class LoginServiceImpl implements LoginService {

    @Resource(name = "MyAuthenticationManager")
    private AuthenticationManager authenticationManager;

    @Autowired
    RedisCache redisCache;

    @Override
    public ResponseResult<Map<String, String>> login(SysUser user) {
        try {
            //        获取AuthenticationManager的authentication进行认证
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassWord()));


//        如果认证通过 使用UserID生成JWT Token

            LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
//        获取用户ID
            Long id = loginUser.getUser().getId();
            String token = JwtUtils.createToken(id.toString());
//        把完整的用户信息存入redis userid作为key
            HashMap<String, String> map = new HashMap<>();
            map.put("token", token);
            redisCache.setCacheObject("login:" + id, loginUser);
            return new ResponseResult<>(200, "登录成功", map);
        } catch (BadCredentialsException e) {
//            因为认证不通过抛出的是我们之前的哪个异常 org.springframework.security.authentication.BadCredentialsException: 用户名或密码错误 所以这里直接捕获并返回我们定义的值
            return new ResponseResult<>(400, "登陆失败");
        }
    }

    @Override
    public ResponseResult<?> logout() {
//        获取SecurityContext中的用户id
        LoginUser principal = (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id = principal.getUser().getId();
        String userId = "login:" + id, loginUser;

//        删除redis中的缓存
        boolean b = redisCache.deleteCacheObject(userId);
        return new ResponseResult<>(200, b ? "退出成功" : "退出失败");
    }
}

```

测试 携带token第一次访问

![image-20211227001921341](/images/SpringBoot/05-SpringSecurity/image-20211227001921341.png)

携带token第二次访问

![image-20211227001943800](/images/SpringBoot/05-SpringSecurity/image-20211227001943800.png)

![image-20211227001950122](/images/SpringBoot/05-SpringSecurity/image-20211227001950122.png)



