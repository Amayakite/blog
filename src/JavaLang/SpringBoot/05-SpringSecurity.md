---
title: 05-SpringSecurity
date: 2021-12-24 14:35:20
category: SpringBoot
tag:
- SpringSecurity
- SpringBoot 
---

## 简介

这里我看的是这位Up主的视频来学习的

<https://www.bilibili.com/video/BV1mm4y1X7Hc?from=search&seid=15641836746784921754&spm_id_from=333.337.0.0>

感觉比ssg和hm的好非常多

​Spring Security是Spring家族中的一个安全管理框架，相比于另一个安全框架Shiro，它提供了更丰富的功能，社区资源也比Shiro丰富

​一般来说中大型的项目都是用这个玩意来做安全框架，小项目用Shiro可能多一些，因为相比于这玩意，SHiro上手更简单一些

​这玩意的用处：

​一般的Web应用需要进行认证和授权

​认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户

​授权：经过认证后判断当前用户是否有权限进行某个操作

而认证和授权也是Spring Security作为安全框架的核心功能

## 快速入门

### 准备工作

创建一个SpringBoot工程

![image-20211224145742822](/images/Java/SpringBoot/05-SpringSecurity/image-20211224145742822.png)

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

![image-20211224150944761](/images/Java/SpringBoot/05-SpringSecurity/image-20211224150944761.png)

自动跳转到了<http://localhost:8080/login>

这个页面

那么我们该输入啥用户名呢

其实用户名叫user

密码会输出在控制台，我这里的是

`Using generated security password: 35a459bf-74c7-4c8d-8e91-d5cb7b6ba280`

我们输入后就能正常访问hello

​也就是说，引入依赖后我们去尝试访问之前的接口就会自动跳转到springSecurity的默认登陆页面，默认用户名是user，默认密码在控制台打印

​必须登录之后才能对接口进行访问

### 登陆校验的流程

1. 前端：携带用户密码访问登陆接口
2. 服务端去sql中验证这两项
   1. 如果验证正确，使用用户名、密码生成一个jwt
   2. 把jwt响应给前端
3. 前端：登录后访问其他请求，需要在请求头中携带token
4. 服务端：根据请求头中的token进行解析，获取userID
   1. 根据用户id获取用户的相关信息，如果有权限则允许访问相关资源
   2. 访问目标资源，响应给前端

![image-20211224152333989](/images/Java/SpringBoot/05-SpringSecurity/image-20211224152333989.png)

### SpringSecurity的基本原理

实际上就是一个过滤器链，内部包含了提供各种功能的过滤器，入门案例中的过滤器如下所示

![image-20211224153100740](/images/Java/SpringBoot/05-SpringSecurity/image-20211224153100740.png)

图中只显示了核心过滤器，其他非核心的过滤器并没有展示

**UsernamePasswordAuthenticationFilter**：负责处理我们在登陆页面填写了用户名密码后的登陆请求，入门案例的认证工作由它负责

**ExceptionTranslationFilter**：处理过滤器链中抛出的任何AccessDeniedException和AuthenticationException

**FilterSecurityInterceptor**：负责权限校验过滤器

![image-20211224161503101](/images/Java/SpringBoot/05-SpringSecurity/image-20211224161503101.png)

![image-20211224161937762](/images/Java/SpringBoot/05-SpringSecurity/image-20211224161937762.png)

Authentication接口：它的实现类表示当前访问的用户，封装了用户相关信息

AuthenticationManager接口：定义了认证Authentication的方法

UserDetailService接口：加载用户特定数据的核心接口，里面定义了一个根据用户名查询用户的方法

UserDetails接口：提供核心用户信息，通过UserDetailService根据用户名获取的处理用户要封装成UserDetail对象返回，让后将这些信息封装到Authentication对象中

![image-20211224162759407](/images/Java/SpringBoot/05-SpringSecurity/image-20211224162759407.png)

![image-20211224162913216](/images/Java/SpringBoot/05-SpringSecurity/image-20211224162913216.png)

解决方案——Redis缓存

![image-20211224180639419](/images/Java/SpringBoot/05-SpringSecurity/image-20211224180639419.png)

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

### sql表准备

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

### SpringBoot配置文件准备

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

## 相关工具类的准备

### RedisJson序列化Utils

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

### JWT工具类

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

### RedisUtils

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

### WebUtils

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

### 返回类型：ResponseResult类

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

## Config类

### RedisConfig

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

### Domain准备

注意 配置完毕后需要手动给userMapper加上@mapper或者在main中加上mapper扫描

![image-20211225172619558](/images/Java/SpringBoot/05-SpringSecurity/image-20211225172619558.png)

接着按照这些勾上

![image-20211225172630429](/images/Java/SpringBoot/05-SpringSecurity/image-20211225172630429.png)

你就能得到这些

![image-20211225172659349](/images/Java/SpringBoot/05-SpringSecurity/image-20211225172659349.png)

### 测试sql

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

![image-20211225183046928](/images/Java/SpringBoot/05-SpringSecurity/image-20211225183046928.png)

There is no PasswordEncoder mapped for the id "null"

这个问题之后会说明 现在说一个最简单的解决方案

在sql中的password字段上面加上一个前缀`{noop}` 表示这个密码是一个明文

![image-20211225183130223](/images/Java/SpringBoot/05-SpringSecurity/image-20211225183130223.png)

接着就可以成功访问了

![image-20211225183200323](/images/Java/SpringBoot/05-SpringSecurity/image-20211225183200323.png)

### ✨关于密码的加密存储

​前面我们刚刚遇到一个问题，就是不在密码前加东西就会抛异常

实际的流程是这样的：

- 用户请求
- 收到请求 经过杂七杂八的流程之后，将用户名传递给我们的`UserDetailsService`内
- 这个方法要返回一个UserDetailsService对象
- 在返回之后 就有其他的东西来验证这个对象中的账号 和 密码 是不是和用户传入的完全一致
- 来验证密码的是一个叫`PasswordEncoder`的玩意
- 如果一致 就过了 如果不一致 就GG

​实际项目中，我们并不会把密码的明文存储到数据库中

​所以这个玩意默认使用的PasswordEncoder要求数据库中的密码格式为：`{id}password`，它会根据id去判断密码的加密方式，但是我们一般不会才用这种方式，所以就需要替换PasswordEncoder

​替换的方式比较简单

​一般使用springSecurity为我们提供的BCyptpasswordEncoder

​我们需要定一个那玩意，并注入到spring容器内，springSecurity就会使用它来进行密码校验

​**我们可以自定义一个springSecurity配置类，这个配置类要继承WebSecurityConfigurationAdapter，就像是SpringMVC那样**

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

![image-20211225204445884](/images/Java/SpringBoot/05-SpringSecurity/image-20211225204445884.png)

additionalAuthenticationChecks

以及一堆链式调用层 这个就之后再研究了 总之 我们现在知道 密码进来了 明文会被拿的去和密文匹配

![image-20211225204656463](/images/Java/SpringBoot/05-SpringSecurity/image-20211225204656463.png)

密文就是我们之前存储在数据库内的玩意

![image-20211225204620921](/images/Java/SpringBoot/05-SpringSecurity/image-20211225204620921.png)

### 自定义基于Hutool的JWT工具类

之前我们引入过了一个JWT工具类 当然实际开发中一般都是直接用Hutool的二度封装一下

这里就简单封装下： 注意 这里没有全完封装

```java
package com.myspringproject.springsecurity.utils;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.exceptions.ValidateException;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import cn.hutool.jwt.JWTValidator;
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
            throw new RuntimeException(e);
        }
//        返回荷载中的数据
        return jwt.getPayload();
    }

//    TODO map之类的加解密

}

```

### 自定义登陆接口的流程说明

​首先是自定义登陆接口，然后让SpringSecurity对这个接口进行放行，让用户访问这个接口的时候不用登录也能访问

​在接口中我们通过AuthenticationManager的authentication方法来进行用户验证，所以只需要在Security中配置把AuthenticationManager注入容器

​认证成功的话生成一个JWT，放入响应中返回，并且为了让用户下次请求时通过JWT识别出具体是哪个用户，我们需要把用户信息存入Redis，可以把用户的id作为key

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

![image-20211226221154954](/images/Java/SpringBoot/05-SpringSecurity/image-20211226221154954.png)

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

![image-20211226221502630](/images/Java/SpringBoot/05-SpringSecurity/image-20211226221502630.png)

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

![image-20211226222558533](/images/Java/SpringBoot/05-SpringSecurity/image-20211226222558533.png)

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

![image-20211226223054208](/images/Java/SpringBoot/05-SpringSecurity/image-20211226223054208.png)

接下来检查一下redis内存储的数据

![image-20211226223129041](/images/Java/SpringBoot/05-SpringSecurity/image-20211226223129041.png)

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

![image-20211226224724154](/images/Java/SpringBoot/05-SpringSecurity/image-20211226224724154.png)

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

![image-20211226235712796](/images/Java/SpringBoot/05-SpringSecurity/image-20211226235712796.png)

再用token访问其他页面

![image-20211226235730181](/images/Java/SpringBoot/05-SpringSecurity/image-20211226235730181.png)

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

![image-20211227001921341](/images/Java/SpringBoot/05-SpringSecurity/image-20211227001921341.png)

携带token第二次访问

![image-20211227001943800](/images/Java/SpringBoot/05-SpringSecurity/image-20211227001943800.png)

![image-20211227001950122](/images/Java/SpringBoot/05-SpringSecurity/image-20211227001950122.png)

## 关于认证配置configuration方法的说明

我们之前在SpringSecurity中配置了一个继承的方法

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        //                关闭csrf  csrf 是 前后端分离的时候要关闭的 之后 会说明
        .csrf().disable()
        //                不通过session获取SecurityContext（登陆之后的用户认证信息 默认是在session中获取）
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        //                对于登录接口，允许匿名访问 登录后不可以访问
        .antMatchers("/user/login").anonymous()
        //                对于其他的接口任意的访问都需要身份认证（除了上面的请求外全都要鉴权认证）
        .anyRequest().authenticated();

    //        两个参数：
    //        1. 过滤器
    //        2. 过滤器在哪个过滤器前执行（插入）
    http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
}
```

这里来简单说下这个方法

首先看看它重写之前长啥样

```java
 /**
  * Override this method to configure the {@link HttpSecurity}. Typically subclasses
  * should not invoke this method by calling super as it may override their
  * configuration. The default configuration is:
  *
  * <pre>
  * http.authorizeRequests().anyRequest().authenticated().and().formLogin().and().httpBasic();
  * </pre>
  *
  * Any endpoint that requires defense against common vulnerabilities can be specified
  * here, including public ones. See {@link HttpSecurity#authorizeRequests} and the
  * `permitAll()` authorization rule for more details on public endpoints.
  * @param http the {@link HttpSecurity} to modify
  * @throws Exception if an error occurs
  */
 protected void configure(HttpSecurity http) throws Exception {
        this.logger.debug("Using default configure(HttpSecurity). "
            + "If subclassed this will potentially override subclass configure(HttpSecurity).");
        http.authorizeRequests((requests) -> requests.anyRequest().authenticated());
      http.formLogin();
    http.httpBasic();
 }
```

> 重写此方法以配置HttpSecurity。通常，子类不应该通过调用super来调用此方法，因为它可能会覆盖它们的配置。默认配置为： http.authorizeRequests().anyRequest().authenticated().and().formLogin().and().httpBasic();
>
> 此处可以指定需要防御常见漏洞的任何端点，包括公共漏洞。
>
> 请参阅HttpSecurity。authorizeRequests和`permitAll()`
>
> 授权规则以获取有关公共端点的更多详细信息。 形参: http–要修改的HttpSecurity 抛出: 异常–如果发生错误

这就好说 了 我们使用它就需要重写它 然后在这个HttpSecurity中定义自己的规则

接下来说说它这些方法

```java
http
    //                关闭csrf  csrf 是 前后端分离的时候要关闭的 之后 会说明
    .csrf().disable()
    //                不通过session获取SecurityContext（登陆之后的用户认证信息 默认是在session中获取）
    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    .and()
    .authorizeRequests()
    //                对于登录接口，允许匿名访问 登录后不可以访问
    .antMatchers("/user/login").anonymous()
    //                对于其他的接口任意的访问都需要身份认证（除了上面的请求外全都要鉴权认证）
    .anyRequest().authenticated();
```

第一个是固定写法  前后端分离一定要做的，调用这个方法会返回一个`HttpSecurity`

大概是这样的 我们调用`HttpSecurity.csrf()` 能获取他的csrf对象，然后自定义对齐进行配置，他之中有些方法会返回自身(HttpSecurity) 所以方便在后面陆续添加更多的操作

第二个也就是 `SessionCreationPolicy.STATELESS`表示Spring Security永远不会创建HttpSession，也永远不会使用它来获取SecurityContext

然后调用`sessionManagement`的and返回HttpSecurity，继续下一步配置

第三个 就比较重要了，`Matchers`对象内包含很多对路径处理的方法 它有三个构造

```java

public C antMatchers(HttpMethod method) {
    return antMatchers(method, "/**");
}


public C antMatchers(HttpMethod method, String... antPatterns) {
    Assert.state(!this.anyRequestConfigured, "Can't configure antMatchers after anyRequest");
    return chainRequestMatchers(RequestMatchers.antMatchers(method, antPatterns));
}


public C antMatchers(String... antPatterns) {
    Assert.state(!this.anyRequestConfigured, "Can't configure antMatchers after anyRequest");
    return chainRequestMatchers(RequestMatchers.antMatchers(antPatterns));
}
```

这就非常清楚了嘛

第一个是指定一个`HttpMethod`然后定义的规则将会对指定method方法下的所有路径生效

第二个是是同时指定它和路径

第三个是单单指定路径 然后所有请求都会放行

它返回一个`RequestMatcher`对象，在这个对象内 我们可以对指定路径进行指定形式的放行

看了一眼 方法有这些

![image-20211227131019201](/images/Java/SpringBoot/05-SpringSecurity/image-20211227131019201.png)

这里说下目前常用的

- `permitAll`：任何人都可以访问（无论是否登陆）
- `authenticated`：只有经过了身份认证的才可以访问
- `anonymous`：只允许没有登陆的才可以访问
- `denyAll` ：任何人都不可以访问
- 然后那几个带有hash的都是跟权限相关，这几个之后再说

所以我们可以这样配置

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
//                关闭csrf  csrf 是 前后端分离的时候要关闭的 之后 会说明
                .csrf().disable()
//                不通过session获取SecurityContext（登陆之后的用户认证信息 默认是在session中获取）
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
//                对于登录接口，允许匿名访问 登录后不可以访问
                .antMatchers("/user/login").anonymous()
//                对于/hello 运行未登录和登录的都可以访问
                .antMatchers("/hello").permitAll()
//                放行 static路径下的所有资源
                .antMatchers("/static/**").permitAll()
//                对于其他的接口任意的访问都需要身份认证（除了上面的请求外全都要鉴权认证）
                .anyRequest().authenticated();

//        两个参数：
//        1. 过滤器
//        2. 过滤器在哪个过滤器前执行（插入）
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }
```

然后`.anyRequest().authenticated()`这个是固定写法 也就是除了上方路径以外 都需要验证后才可以访问

## 授权

### 权限系统的应用

> 例如一个图书管理系统，如果是普通学生就能看到借书还书的功能，不可能让他去看到并且使用书籍的增删改功能
>
> 但是一个图书管理员账号登陆了 则所有功能都可以使用
>
> 总结起来就是：**不同的用户使用不同的功能**，这就是权限管理要去实现的效果
>
> 我们不能只依赖前端去判断用户的权限选择来显示哪些菜单哪些按钮，因为如果只是这样，如果有人知道了对应功能的接口地址就可以不通过前端，直接去发送请求来实现相关的功能
>
> 我们还需要再后台进行用户权限的判断，判断当前用户是否有对应的权限，必须基于所需权限才能进行对应的操作

### 授权的基本流程

在SpringSecurity中，会使用默认的`FilterSecurityInterceptor`来进行权限校验，它会从SecurityContextHolder获取其中的AUthentication，然后获取其中的权限信息，当前用户是否拥有访问当前资源所需权限

所以我们在项目中只需要把当前用户的权限信息也存入Authentication

然后设置我们的资源所需要的权限即可

### ✨限制资源访问所需要的权限

SpringSecurity为我们提供了基于注解的权限控制方案，这也是我们项目中主要用的形式（还有一种基于配置的，用的比较少，一般也是用来配置静态资源）

我们可以使用注解的方式去指定访问对应的资源所需要的权限

要是用它 我们需要先开启相关的配置

在SpringSecurity中添加一个注解即可

```java {2}
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    //......
}
```

`@EnableGlobalMethodSecurity(prePostEnabled = true)`就是开启权限校验

接下来我们创建一个AdminController

```java {3}
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('admin')")
public class AdminController {

    @GetMapping("/hello")
    public String hello() {
        return "hello admin";
    }

}
```

`@PreAuthorize("hasAuthority('admin')")`

这句话的意思是：

- `PreAuthorize`启动访问前的权限校验
- 然后他的value是要传入一个规则，就像是Mybatis注解中的那啥ex表达式一样
- `hasAuthority('admin')`这句话非常简单 意思就是：在访问这个接口/接口集的时候，需要指定的权限，比如上方所示的**admin**

好了 限制已经完成了 接下来我们要封装下权限信息

### ✨封装权限信息

还记得我们之前配置的**UserDetailService**吗

当时留了一个TODO 接下来完成它

```java {18}
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

//      TODO  查询对应用户的权限信息

//        把数据封装成userdetails返回
        LoginUser loginUser = new LoginUser(user);
        return loginUser;
    }
}
```

我们首先明确的是 这个权限是在LoginUser内

我们返回LoginUser这个类 中 可以看到之前略过的的一个方法

```java
@Data
@NoArgsConstructor
public class LoginUser implements UserDetails {
    public LoginUser(SysUser user) {
        this.user = user;
    }

    private SysUser user;

    /**
     * 这个是获取权限信息 我们暂时先返回null
     *
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    // 其他的相关方法
}

```

他这里需要返回一个集合 但是我们并不知道该返回谁

所以我们先添加一个属性，接收一个集合进来

```java
@Data
@NoArgsConstructor
public class LoginUser implements UserDetails {
    public LoginUser(SysUser user) {
        this.user = user;
    }

    private SysUser user;

    public LoginUser(SysUser user, List<String> permissions) {
        this.user = user;
        this.permissions = permissions;
    }

    private List<String> permissions;

    /**
     * 这个是获取权限信息 我们暂时先返回null
     *
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null
    }
}
```

接下来返回service 我们这里就先写死了 给予用户固定的两个权限字段

```java {20}
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

//      TODO  查询对应用户的权限信息
        ArrayList<String> strings = new ArrayList<>(Arrays.asList("test", "admin"));
//        把数据封装成userdetails返回
        LoginUser loginUser = new LoginUser(user,strings);
        return loginUser;
    }
}
```

给一个test和一个admin

然后我们接下来该去完善下LoginUser内的getAuthorities方法

可以看到它需要接收一个集合类型 这个集合类型必须得继承GrantedAuthority

`Collection<? extends GrantedAuthority>`

然后我们可以看到这个GrantedAuthority是一个接口

```java
public interface GrantedAuthority extends Serializable {
 String getAuthority();
}
```

接下来看看它有没有什么实现类

![image-20211227150349442](/images/Java/SpringBoot/05-SpringSecurity/image-20211227150349442.png)

发现三个 这里不说别的了 直接用中间这个

```java
@Data
@NoArgsConstructor
public class LoginUser implements UserDetails {
    public LoginUser(SysUser user) {
        this.user = user;
    }

    private SysUser user;

    public LoginUser(SysUser user, List<String> permissions) {
        this.user = user;
        this.permissions = permissions;
    }

    private List<String> permissions;

    /**
     * 让这个成员变量不被序列化到Redis当中 JSONField(serialize = false)
     * 
     */
    @JSONField(serialize = false)
    private List<SimpleGrantedAuthority> collect = null;

    /**
     * 这个是获取权限信息 我们暂时先返回null
     *
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        HashSet<SimpleGrantedAuthority> simpleGrantedAuthorities = new HashSet<>();
//        for (String permission : permissions) {
//            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(permission);
//            simpleGrantedAuthorities.add(simpleGrantedAuthority);
//        }
//
//        return simpleGrantedAuthorities;
        
        // 使用成员变量 让每次访问的时候访问成员变量 而不是每次都new一个出来
        if (collect == null &&permissions!=null) {
//        注释掉的那段的简写形式 
            collect = permissions.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        }
        return collect;
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

好了  接下来还有一步：还记得我们的filter吗 当用户访问的时候 要验证jwttoken 然后当时我们打了一个todo的`setAuthentication`内的权限验证

接下来我们只需要填充这一块即可 由于我们的权限现在可以直接通过loginUser获取了 所以直接拿到我们对应的信息即可

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
        if (Objects.isNull(cacheObject)) {

            throw new RuntimeException("用户未登录");
        }

//        存入SpringSecurity
        SecurityContextHolder.getContext().setAuthentication(
//                这里说下 这个方法的传入的参数表示
//                首先 为什么要调用它的三个参数的构造方法 因为这个方法可以让之后免除验证（不再做额外的账号密码校验）
//                第一个参数 我们的用户认证信息
//                第二个参数 证书信息 这个一般填null即可
//              TODO 第三个参数填坑 直接获取LoginUser的权限信息交给他
                new UsernamePasswordAuthenticationToken(cacheObject, null, cacheObject.getAuthorities()));
//        放行
        filterChain.doFilter(request, response);
    }
}

```

好了 接下来重启服务器测试一下（注意 要重新获取下token，不然权限信息进不去）

![image-20211227151005808](/images/Java/SpringBoot/05-SpringSecurity/image-20211227151005808.png)

同时在我们的redis内也能看到对应的权限信息了

![image-20211227151056815](/images/Java/SpringBoot/05-SpringSecurity/image-20211227151056815.png)

但是这样的话 我们的权限信息相当于写死了 实际生产环境中 应该是动态的来在数据库内获取对应的权限信息

## 从数据库中查询权限信息

### ✨RBAC权限模型

RBAC权限模型（Role-Based Access Control）

基于角色的控制权限，这是目前来说最多人用 最简单的数据模型

![image-20211227151413231](/images/Java/SpringBoot/05-SpringSecurity/image-20211227151413231.png)

![image-20211227151705510](/images/Java/SpringBoot/05-SpringSecurity/image-20211227151705510.png)

三张表 外加两张中间表

![image-20211227152111453](/images/Java/SpringBoot/05-SpringSecurity/image-20211227152111453.png)

### ✨准备工作-创建表

```sql
# 角色表 之前创建过了这里可以省略
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

# 权限表
create table sys_menu(
    id bigint(20) primary key auto_increment,
    menu_name varchar(64) not null default "NULL" comment "菜单名",
    `path` varchar(200) default null comment "路由地址",
    component varchar(255) default null comment "组件路径",
    `visible` char(1) default '0' comment '菜单状态（0正常 1隐藏）',
    `status` char(1) default '0' comment '菜单状态(0正常 1停用)',
    perms varchar(100) default null comment '权限标识',
    icon varchar(100) default "#" comment '菜单图标',
    create_by bigint(20) default null comment '创建人的用户id',
    create_time datetime default null comment '创建时间',
    update_by bigint(20) default null comment '更新人',
    update_time datetime default null comment '更新时间',
    del_flag int(11) default '0' comment '是否删除 0 未删除 1 已删除',
    remark varchar(500) default null comment '备注'
)charset=utf8mb4 comment="权限菜单表";

create table sys_role(
 id bigint(20) primary key auto_increment,
    name varchar(128) default null,
    role_key varchar(100) default null comment '角色权限字符串',
    `status` char(1) default '0' comment '角色状态(0正常 1停用)',
    del_flag int(1) default '0' comment '是否删除 0 未删除 1 已删除',
    create_by bigint(20) default null comment '创建人的用户id',
    create_time datetime default null comment '创建时间',
    update_by bigint(20) default null comment '更新人',
    update_time datetime default null comment '更新时间',
    remark varchar(500) default null comment '备注'
)charset=utf8mb4 comment="角色表";


# 这里用到了复合主键 防止重复权限
create table sys_role_menu(
 role_id bigint(200) not null auto_increment comment '角色ID',
    menu_id bigint(200) not null default '0' comment '菜单ID',
    primary key(role_id,menu_id)
)charset=utf8mb4 comment="角色菜单关联表";

create table sys_user_role(
 user_id bigint(200) not null auto_increment comment '用户ID',
    role_id bigint(200) not null default '0' comment '角色ID',
    primary key(user_id,role_id)
)charset=utf8mb4 comment="用户角色关联表";

```

接下来添加一点数据

![image-20211227155800811](/images/Java/SpringBoot/05-SpringSecurity/image-20211227155800811.png)

![image-20211227155813963](/images/Java/SpringBoot/05-SpringSecurity/image-20211227155813963.png)

![image-20211227155820741](/images/Java/SpringBoot/05-SpringSecurity/image-20211227155820741.png)

![image-20211227155859528](/images/Java/SpringBoot/05-SpringSecurity/image-20211227155859528.png)

![image-20211227155907549](/images/Java/SpringBoot/05-SpringSecurity/image-20211227155907549.png)

现在我们必须得明确需要查找的内容：**通过userid查找对应的权限关键字的一个列表**

例如：

- admin用户

  - system:dept:list
  - system:test:list

  并且他们两的visible和status都必须得是0（正常状态）

所以接下来来一个联表查询

```sql
# 通过userid查找对应的角色 DISTINCT 去重
SELECT
 DISTINCT m.perms
FROM
 sys_user_role AS `ur`
 LEFT JOIN sys_role AS `r` ON ur.role_id = r.id 
 LEFT JOIN sys_role_menu as rm ON ur.role_id=rm.role_id
 left JOIN sys_menu as m on m.id=rm.menu_id
WHERE
 user_id = 2 
 AND r.`status` = 0
 and m.`status`=0;
```

### ✨代码实现

我们先在ieda中右键sys_menu创建下mapper之类的

然后在domain类中加上如下注解

```java
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
```

![image-20211227161336723](/images/Java/SpringBoot/05-SpringSecurity/image-20211227161336723.png)

其实接下来的实现就非常简单了

在mapper类中加一个方法，并且标注component

```java
@Component
public interface SysMenuMapper extends BaseMapper<SysMenu> {

    List<String> selectPermsByUserid(Long userid);
}

```

然后到xml中去修改下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.myspringproject.springsecurity.mapper.SysMenuMapper">

    <resultMap id="BaseResultMap" type="com.myspringproject.springsecurity.domain.SysMenu">
            <id property="id" column="id" jdbcType="BIGINT"/>
            <result property="menuName" column="menu_name" jdbcType="VARCHAR"/>
            <result property="path" column="path" jdbcType="VARCHAR"/>
            <result property="component" column="component" jdbcType="VARCHAR"/>
            <result property="visible" column="visible" jdbcType="CHAR"/>
            <result property="status" column="status" jdbcType="CHAR"/>
            <result property="perms" column="perms" jdbcType="VARCHAR"/>
            <result property="icon" column="icon" jdbcType="VARCHAR"/>
            <result property="createBy" column="create_by" jdbcType="BIGINT"/>
            <result property="createTime" column="create_time" jdbcType="TIMESTAMP"/>
            <result property="updateBy" column="update_by" jdbcType="BIGINT"/>
            <result property="updateTime" column="update_time" jdbcType="TIMESTAMP"/>
            <result property="delFlag" column="del_flag" jdbcType="INTEGER"/>
            <result property="remark" column="remark" jdbcType="VARCHAR"/>
    </resultMap>

    <sql id="Base_Column_List">
        id,menu_name,path,
        component,visible,status,
        perms,icon,create_by,
        create_time,update_by,update_time,
        del_flag,remark
    </sql>
    <select id="selectPermsByUserid" parameterType="long" resultType="java.lang.String">
        # 通过userid查找对应的角色 DISTINCT 去重
        SELECT
            DISTINCT m.perms
        FROM
            db1.sys_user_role AS `ur`
                LEFT JOIN db1.sys_role AS `r` ON ur.role_id = r.id
                LEFT JOIN db1.sys_role_menu as rm ON ur.role_id=rm.role_id
                left JOIN db1.sys_menu as m on m.id=rm.menu_id
        WHERE
            user_id = #{id}
          AND r.`status` = 0
          and m.`status`=0;
    </select>
</mapper>

```

接下来写一个测试方法测试：

```java
@Autowired
SysMenuMapper menuMapper;

@Test
public void testMenu(){
    List<String> strings = menuMapper.selectPermsByUserid(2L);
    log.info("strings={}", strings);
}
```

恩，没有问题 然后我们修改下UserDetailServiceImpl吧

```java
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private SysMenuMapper sysMenuMapper;

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

//      TODO  查询对应用户的权限信息
        List<String> permsByUserid = sysMenuMapper.selectPermsByUserid(user.getId());
//        把数据封装成userdetails返回
        return new LoginUser(user, permsByUserid);
    }
}

```

接下来改下我们的controller

```java
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('system:dept:list')")
public class AdminController {

    @GetMapping("/hello")
    public String hello() {
        return "hello admin";
    }

}

```

测试（注意 要获取下新的token）：

![image-20211227163757078](/images/Java/SpringBoot/05-SpringSecurity/image-20211227163757078.png)

成功

## ✨自定义失败处理

> 我们还希望在认证失败或者授权失败的情况下也能和我们的ResoponseResult接口返回一样结构的json，这样可以让前端对响应进行统一的处理，需要实现这个功能我们需要知道SpringSecurity的异常处理机制
>
> 这玩意之中，如果我们在认证或者授权的时候出现了异常，会被ExceptionTranslationFilter拦截到，在ExceptionTranslationFilter中会去判断是认证失败还是授权失败出现的异常

- 如果是认证过程中出现的异常会被封装成AuthenticationException然后调用**AuthenticationEntryPoint**方法进行处理

- 如果是授权过程中出现的异常会被封装成AccessDeniedException然后调用**AccessDeniedHandler**对象的方法去进行异常的处理

所以我们要自定义异常处理 只需要自定义AuthenticationEntryPoint或者AccessDeniedHandler然后配置给SpringSecurity即可

其实非常简单 我们先定义两个类

![image-20211227171523659](/images/Java/SpringBoot/05-SpringSecurity/image-20211227171523659.png)

```java
@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ResponseResult<Object> result = new ResponseResult<>(403, "权限不足");
        String s = JSON.toJSONString(request);
        WebUtils.redderString(response, s);
    }
}
```

```java
@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
//        处理异常
        ResponseResult<Object> result = new ResponseResult<>(401, "用户认证失败请重新登录");
        String s = JSON.toJSONString(result);
        WebUtils.redderString(response, s);
    }
}
```

接下来在SpringSecurity内注册即可

```java
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
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
//                对于登录接口，允许匿名访问 登录后不可以访问
                .antMatchers("/user/login").anonymous()
//                对于/hello 运行未登录和登录的都可以访问
                .antMatchers("/hello").permitAll()
//                放行 static路径下的所有资源
                .antMatchers("/static/**").permitAll()
//                对于其他的接口任意的访问都需要身份认证（除了上面的请求外全都要鉴权认证）
                .anyRequest().authenticated();

//        过滤器两个参数：
//        1. 过滤器
//        2. 过滤器在哪个过滤器前执行（插入）
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

//        异常处理器
        http.exceptionHandling()
//                认证失败处理器
                .authenticationEntryPoint(authenticationEntryPoint)
//                无权限处理器
                .accessDeniedHandler(accessDeniedHandler);

    }

    @Autowired
    AccessDeniedHandlerImpl accessDeniedHandler;

    @Autowired
    AuthenticationEntryPointImpl authenticationEntryPoint;

    @Autowired
    JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

}

```

## 跨域

![image-20211227172302453](/images/Java/SpringBoot/05-SpringSecurity/image-20211227172302453.png)

​前后端分离百分之一万都是不同源的 所以肯定存在跨域请求问题

前后端处理方案都有 这里说下后端的 不单单只要设置SpringMvcConfig

先设置SpringMVCConfig

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
//        设置允许跨域的路径
        registry.addMapping("/**")
//                设置允许跨域请求的域名
                .allowedOriginPatterns("*")
//                是否允许cookie
                .allowCredentials(true)
//                允许的方法
                .allowedMethods("GET", "POST", "DELETE", "PUT")
//                允许的头信息
                .allowedHeaders("*")
//                跨域允许时间
                .maxAge(3600);

    }
}
```

然后还需要在SpringSecurity中加一句话

```java {51,52}
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
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
//                对于登录接口，允许匿名访问 登录后不可以访问
                .antMatchers("/user/login").anonymous()
//                对于/hello 运行未登录和登录的都可以访问
                .antMatchers("/hello").permitAll()
//                放行 static路径下的所有资源
                .antMatchers("/static/**").permitAll()
//                对于其他的接口任意的访问都需要身份认证（除了上面的请求外全都要鉴权认证）
                .anyRequest().authenticated();

//        过滤器两个参数：
//        1. 过滤器
//        2. 过滤器在哪个过滤器前执行（插入）
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

//        异常处理器
        http.exceptionHandling()
//                认证失败处理器
                .authenticationEntryPoint(authenticationEntryPoint)
//                无权限处理器
                .accessDeniedHandler(accessDeniedHandler);
//        允许跨域
        http.cors();

    }

    @Autowired
    AccessDeniedHandlerImpl accessDeniedHandler;

    @Autowired
    AuthenticationEntryPointImpl authenticationEntryPoint;

    @Autowired
    JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

}

```

## 关于@PreAuthorize的额外说明及其他的权限校验注解

```java {3}
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('system:dept:list')")
public class AdminController {

    @GetMapping("/hello")
    public String hello() {
        return "hello admin";
    }

}
```

在ieda中可以很明显的看到这是一个方法

![image-20211227174941675](/images/Java/SpringBoot/05-SpringSecurity/image-20211227174941675.png)

点进去看到了这样一个方法

```java
@Override
public final boolean hasAuthority(String authority) {
    return hasAnyAuthority(authority);
}
```

目前来说我们也不知道它是干嘛的 所以debug看一看

可以看到 访问指定页面的时候 这里接收的参数就是我们写死的那一个

![image-20211227175146752](/images/Java/SpringBoot/05-SpringSecurity/image-20211227175146752.png)

步入可以看到

![image-20211227175223794](/images/Java/SpringBoot/05-SpringSecurity/image-20211227175223794.png)

调用了顶一个方法 给prefix区域传入了null

并且还可以知道 另外一个方法内 传入的是可变参数

```java
 @Override
 public final boolean hasAnyAuthority(String... authorities) {
return hasAnyAuthorityName(null, authorities);
 }

```

也就是之后我们可以通过调用这个hasAnyAuthority来实现----只要有多个权限中的一个即可访问

然后跳转到了这个方法

```java
private boolean hasAnyAuthorityName(String prefix, String... roles) {
    Set<String> roleSet = getAuthoritySet();
    for (String role : roles) {
        String defaultedRole = getRoleWithDefaultPrefix(prefix, role);
        if (roleSet.contains(defaultedRole)) {
            return true;
        }
    }
    return false;
}
```

![image-20211227175727003](/images/Java/SpringBoot/05-SpringSecurity/image-20211227175727003.png)

可以看到 第一个`Set<String> roleSet = getAuthoritySet();` 是获取到了我们用户的AuthoritySet集合

然后遍历循环我们的核对参数 ，在通过set的contains来匹配 如果匹配成功返回true 反之亦然

至于`String defaultedRole = getRoleWithDefaultPrefix(prefix, role);` 这个看样子应该是拿了一个前缀和我们的字符串进行拼接 之前我们并没有传入前缀 所以说此时前缀为null

### 定义多个校验规则

```java {3}
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAnyAuthority('system:dept:list','aaa','bbb')")
public class AdminController {

    @GetMapping("/hello")
    public String hello() {
        return "hello admin";
    }

}
```

满足三个中的一个就会通过

### 有前缀的校验规则

```java
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('system:dept:list')")
public class AdminController {

    @GetMapping("/hello")
    public String hello() {
        return "hello admin";
    }

}
```

源码就不放了 自己点进去看看里面就知道 默认会给这个`system:dept:list`字符串加上一个前缀：

`ROLE_`

说以最终结果将是:`ROLE_system:dept:list`

这个方法用的特别少 要给我们的那啥都手动加上前缀。。

也就是在sql中的所有规则字段都要加前缀

一般情况下不会用它

### 自定义权限校验方法

其实非常简单

我们先定义一个类 然后丢到容器内 注意这个ex

```java {1}
@Component("ex")
public class MyExpression {

    public boolean hasAuthority(String authority) {
//        获取当前用户的权限
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        List<String> permissions = loginUser.getPermissions();
//        判断用户权限集合中是否存在authority
        return permissions.contains(authority);
    }

}
```

紧接着 我们依旧是正常调用@PreAuthorize，但是传入的参数不同

传入的是一个特殊的表达式----SPEL表达式

```java {3}
@RestController
@RequestMapping("/admin")
@PreAuthorize("@ex.hasAuthority('system:dept:list')")
public class AdminController {

    @GetMapping("/hello")
    public String hello() {
        return "hello admin";
    }

}
```

这玩意别想的那么复杂 目前来说 @ex相当于能获取容器中的指定的bean（前提是我们给这个bean定义过姓名之类的）

接着使用方法和往常一样即可，当然这样做之后就有了高扩展性 例如你可以定义一些正则语法来匹配对应的字符串

### 基于配置的权限控制

和在注解中没啥两样   但是统一性更好些 方便一次性修改某些值 适用于一些静态资源路径

```java {6}
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/aaa").hasAnyAuthority("xxxxx");
    }

}

```

## 关于CSRF跨站攻击

> CSRF是指跨站请求伪造（Cross-site request forgery），是Web常见的攻击之一

![image-20211227212004659](/images/Java/SpringBoot/05-SpringSecurity/image-20211227212004659.png)

SpringSecurity去防止CSRF的攻击方式就是通过CSRF_TOKEN

后端会生成一个csrf_token，前端发起请求的时候需要携带这个csrf_token

后端会有过滤器进行校验 如果没有携带或者是伪造的就不允许访问

我们可以发现CSRF攻击主要依靠的是cookie所携带的认证信息，但是前后端分离中**我们的认证信息其实是token**，token并不存在于cookie中，并且需要前端代码去把token设置到请求头中才可以，所以CSRF攻击就不用担心了

前后端分离的项目天然就是不怕CSRF这玩意

所以我们之前才会关闭这个玩意

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
//                关闭csrf  csrf 是 前后端分离的时候要关闭的 之后 会说明
                .csrf().disable()
//                .........

    }
```

## 归档

### 核心流程图

务必牢记这张图 未来可以通过这张图来进行五花八门的扩展自定义验证

![image-20211227214243138](/images/Java/SpringBoot/05-SpringSecurity/image-20211227214243138.png)
