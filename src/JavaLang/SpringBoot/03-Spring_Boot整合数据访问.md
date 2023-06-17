---
title: 03-Spring_Boot整合数据访问
date: 2021-12-21 15:06:03
category: SpringBoot
tag:
- Java
- SpringBoot
- Jdbc
- Mybatis
- MybatisPlus
---

## 概述

首先我们打开官方文档

<https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters>

发现跟操作数据库有关的 全都有一个data

![image-20211221150913345](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221150913345.png)

接下来我们要用jdbc 于是看看有哪些jdbc相关的

![image-20211221151209917](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221151209917.png)

看到了个名字最短的 应该就是他了

### 导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

然后可以看到如下内容

![image-20211221151310736](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221151310736.png)

貌似少了点什么？

我们的mysql数据库驱动呢？

因为官方不知道我们接下来要用哪个数据库..

所以我们接下里我们要操作什么数据库 就安装什么数据库的驱动即可

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

如果你用的是最新版本 这里可以不用写版本号

因为spring官方已经对它做了一个版本仲裁（最新的版本）

![image-20211221151826037](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221151826037.png)

如果你还在用5.x  那么可以自定仲裁 版本号为了规范写在这里即可

![image-20211221151640601](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221151640601.png)

### 分析自动配置

首先我们能看到springboot 的 autoconfiguration内有一个jdbc的包

并且里面第一个就是DataSourceAutoconfiguration

连接池相关 可以看到

```java
@ConditionalOnClass({ DataSource.class, EmbeddedDatabaseType.class })
```

当我们没有配置任何连接池相关的bean的时候 就会使用它默认的

![image-20211221152823431](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221152823431.png)

而且还能看到一个DataSourceTransactionManagerAutoConfiguration 看着就是是事务管理器的配置

![image-20211221153017125](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221153017125.png)

还有一个jdbcTemplate

![image-20211221153229580](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221153229580.png)

额外说下 还有个分布式事务的相关控制 XADataSourceAutoConfiguration这个我们目前暂时用不到 之后学spring cloud的时候应该用得上

![image-20211221153348274](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221153348274.png)

接着我们看看DataSource的Properteis

![image-20211221154104327](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221154104327.png)

可以看到很多熟悉的东西 也就是说我们可以直接按照上面的来配置数据源了

### 配置数据源

我这里就直接在yaml最终配置了（虽然说这样的写在properties里面看起来更规范一些）

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/db1
    username: root
    password: 123456
```

### 测试使用

因为spring boot直接给我们提供好了 test 文件 所以我们只需要直接注入jdbctemplate即可

```java
@SpringBootTest
@Slf4j
class ApplicationTests {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {
        List<User> query = jdbcTemplate.query(
            "select * from db1.admin", 
            (rs, rowNum) ->new User(
                rs.getString("name"),rs.getString("password")));
        Iterator<User> iterator = query.iterator();
        while (iterator.hasNext()) {
            User next =  iterator.next();
            log.info("User:{}", next);
        }
    }

}

```

测试结果：

![image-20211221160137403](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221160137403.png)

接着 我们发现它这里貌似有一个数据源相关的东西

HikariDataSource

搜了下 貌似是当前世界上最快的数据源管理包

但是我们平常可能因为一些别的需要

例如Druid：主要是德鲁伊会提供数据监控等等   后边分布式的时候监控很有用

接下里安装下druid吧

## 使用Druid数据源

我们整合第三方数据源有两种方式

- 自定义
  - 引入下druid的包
  - 以前的方法就是在xml或者bean中或者注册一个DruidDataSource
  - 就是我们之前的配置的方式。。然后要额外配置蛮多东西..
  - 详情的可以看<https://www.bilibili.com/video/BV19K4y1L7MT?p=61&spm_id_from=pageDriver>
- 找starter

### 才用传统方法配置druid

全部按照官方文档来<https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98>

我们首先安装下druid的依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.8</version>
</dependency>
```

接下来配置

自己配肯定是懒得配的 于是乎去druid的wiki上面找了找

<https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98>

发现上面都有现成的了 于是乎我们按照它那里的顺序来做即可

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/db1
    username: root
    password: 123456
    filters: stat,log4j2
```

```java
@Configuration
public class MyDataSourceConfig {

    /**
     * 配置druid
     *
     * @return
     */
    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource dataSource() {
        return new DruidDataSource();
    }
    
 // 这里是设置监控的访问路径
    @Bean
    public ServletRegistrationBean servletRegistrationBean() {

        StatViewServlet statViewServlet = new StatViewServlet();


        ServletRegistrationBean<StatViewServlet> bean = new ServletRegistrationBean<>(statViewServlet, "/druid/*");

        return bean;

    }

    /**
     * 监控web应用
     */
    @Bean
    public FilterRegistrationBean webFilterRegistation() {
        WebStatFilter webStatFilter = new WebStatFilter();
        FilterRegistrationBean<WebStatFilter> bean = new FilterRegistrationBean<>(webStatFilter);
        bean.addUrlPatterns("/*");
        bean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        return bean;

    }

    @Bean
    public DruidStatInterceptor druidStatInterceptor(){
        return new DruidStatInterceptor();
    }



}
```

程序启动后，我们访问下

![image-20211221204925951](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221204925951.png)

### 通过state方式来使用druid

于是还真的发现了

<https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter>

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.8</version>
    <!--version可以去这里看看最新是什么版本
 https://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter
 -->
</dependency>
```

接下来我们看看这玩意有什么东西

![image-20211221205315712](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221205315712.png)

首先是druid 然后是slf4j 然后是 autoconfig

我们就直奔autoconfig

![image-20211221205429053](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221205429053.png)

我们首先可以看到它有如下注解

```java {2}
@ConditionalOnClass({DruidDataSource.class})
@AutoConfigureBefore({DataSourceAutoConfiguration.class})
@EnableConfigurationProperties({DruidStatProperties.class, DataSourceProperties.class})
```

这里重点看第二行 自动配置应在其他指定的自动配置类之前应用

我们可以知道 官方的哪个DataSource注册有一个条件：当前容器内没有dataSource的@Bean才注册

接着它倒入了四个包

```java
@Import({
    DruidSpringAopConfiguration.class, 
    DruidStatViewServletConfiguration.class, 
    DruidWebStatFilterConfiguration.class,
    DruidFilterConfiguration.class
        })
```

第一个是监控SpringBean的（AOP），配置项是`spring.datasource.druid.aop-patterns`

![image-20211221210024410](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221210024410.png)

第二个是监控页的配置相关 默认开启了(havingValue)

`spring.datasource.druid.stat-view-servlet.enabled`

![image-20211221210211177](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221210211177.png)

第三个是配置了监控页 默认开启

![image-20211221210338604](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221210338604.png)

第四个给容器中添加了蛮多的组件

这些的作用是开启防火墙之类的功能

![image-20211221210417054](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221210417054.png)

### 配置druid

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

接下来尝试访问下项目路径内的druid

![image-20211221213429121](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221213429121.png)

看起来没问题了

当然也可以自定义访问路径

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
        #  自定义访问路径 注意 自定义访问路径之后 必须得通过 xxx/myproject/index.html
        # 这个index.html 不可以省略
        url-pattern: '/myproject/*'
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

## 整合Mybatis

### 准备依赖

<https://github.com/mybatis/spring-boot-starter>

在这上面的spring-boot-stater文件夹内可以获取到我们想要的pom

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.0</version>
</dependency>
```

当然 我还是选择在maven仓库内的

![image-20211221223203128](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221223203128.png)

可以看到最终引入了springbootstate和jdbc 以及自动配置文件之类的

回想下我们之前还是怎么用mybatis的

- 准备全局mapper配置器
- 然后准备单个文件的mapper映射
- 然后准备mapper准建
- 然后注册SqlSessionFactory工厂

接下来我们老样子 先看看mybatis的autoconfig

![image-20211221223606137](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221223606137.png)

首先这玩意的判断是

```java
@Configuration
// 必须要包含xxx
@ConditionalOnClass({SqlSessionFactory.class, SqlSessionFactoryBean.class})
// 全局有且只有一个DataSource
@ConditionalOnSingleCandidate(DataSource.class)
// 加载配置文件
@EnableConfigurationProperties({MybatisProperties.class})
// 在自动加载完毕后加载的项
@AutoConfigureAfter({DataSourceAutoConfiguration.class, MybatisLanguageDriverAutoConfiguration.class})
```

接着我们看下MybatisProperties这个文件内绑定的是什么字段的配置

```java
@ConfigurationProperties(
    prefix = "mybatis"
)
public class MybatisProperties {

    public static final String MYBATIS_PREFIX = "mybatis";

    private static final ResourcePatternResolver resourceResolver = new PathMatchingResourcePatternResolver();

    /**
   * Location of MyBatis xml config file.
   */
    private String configLocation;

    /**
   * Locations of MyBatis mapper files.
   */
    private String[] mapperLocations;

    /**
   * Packages to search type aliases. (Package delimiters are ",; \t\n")
   */
    private String typeAliasesPackage;

    /**
   * The super class for filtering type alias. If this not specifies, the MyBatis deal as type alias all classes that
   * searched from typeAliasesPackage.
   */
    private Class<?> typeAliasesSuperType;

    /**
   * Packages to search for type handlers. (Package delimiters are ",; \t\n")
   */
    private String typeHandlersPackage;

    /**
   * Indicates whether perform presence check of the MyBatis xml config file.
   */
    private boolean checkConfigLocation = false;

    /**
   * Execution mode for {@link org.mybatis.spring.SqlSessionTemplate}.
   */
    private ExecutorType executorType;

    /**
   * The default scripting language driver class. (Available when use together with mybatis-spring 2.0.2+)
   */
    private Class<? extends LanguageDriver> defaultScriptingLanguageDriver;

    /**
   * Externalized properties for MyBatis configuration.
   */
    private Properties configurationProperties;
}
```

接着我们看看是否有配置好SQLsessionFactory

在autoconfig中发现了

![image-20211221224057991](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211221224057991.png)

@ConditionalOnMissingBean是在容器内找datasource并放进去 其他东西都是在配置文件中取的

紧接着 我们在这个配置文件的最底下发现了这些

```java
@org.springframework.context.annotation.Configuration
    @Import(AutoConfiguredMapperScannerRegistrar.class)
    @ConditionalOnMissingBean({ MapperFactoryBean.class, MapperScannerConfigurer.class })
    public static class MapperScannerRegistrarNotFoundConfiguration implements InitializingBean {

        @Override
        public void afterPropertiesSet() {
            logger.debug(
                "Not found configuration for registering mapper bean using @MapperScan, MapperFactoryBean and MapperScannerConfigurer.");
        }

    }
```

其他的倒是没什么

只有这个`@Import(AutoConfiguredMapperScannerRegistrar.class)`

我们之前整合SSM的时候 mybatis需要配置一个扫包路径 这玩意就是来帮助我们扫包的 默认情况下会扫描项目路径下的所有包 也就是说 我们无须手动再编写扫mapper包的代码了

也就是说 只要我们写的操作mybatis的接口标注了@Mapper注解 就会被扫进来

### 使用mybatis-配置文件

我们先创建如下配置文件

![image-20211222002928765](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222002928765.png)

一个mybatis-config

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
</configuration>
```

还有一个admin的mapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.MyProject.webadmin.mapper.AdminMapper">

    <select id="getAdminById" parameterType="int"
            resultType="com.MyProject.webadmin.domain.Admin">
        select * from db1.admin2 where id = #{id}
    </select>
</mapper>
```

接着在spring的配置文件中增加这两项

```yaml
# 配置mybatis的规则
mybatis:
  # 配置mybatis的全局配置文件
  config-location: classpath:mybatis/mybatis-config.xml
  # 指定mapper映射文件路径
  mapper-locations: classpath:mybatis/mapper/*.xml

```

### 使用mybatis

三层架构

![image-20211222003213478](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222003213478.png)

这里我查的是admin表 对应字段

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    private Integer id;
    private String name;
    private String password;

}

```

写一个mapper来完成数据访问

```java
@Mapper //注意 这个mapper不能省略
public interface AdminMapper {

     Admin getAdminById(Integer id);
}
```

再写一个service来完成操作

```java
@Service
public class AdminService {
    @Autowired
    private AdminMapper adminMapper;


    public Admin getAdminById(Integer id) {
        return adminMapper.getAdminById(id);
    }

}
```

接着写一个请求测试

```java
@RestController
public class DataSourceController {


    @Autowired
    AdminService adminService;

    @GetMapping("/admin/{id}")
    public Admin getAdmin(@PathVariable("id") Integer id) {
        return adminService.getAdminById(id);
    }

}

```

![image-20211222003302412](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222003302412-16401043826611.png)

成功

### 整合Mybatis的一些配置（驼峰命名等）

在官方文档中<https://mybatis.org/mybatis-3/zh/configuration.html#settings>

可以看到，设置驼峰命名是通过设置mapUnderscoreToCamelCase为true来完成的

所以我们有两个选择--在xml或者在spring配置文件中配置

注意 这两个不能同时存在

例如：

- 在XML中配置了，则不能再yaml之类的配置文件中配置configuration

- 反之亦然，如果说两者一齐存在，会报错

- 通常情况下 我们并不会创建mybatis的核心配置文件，而是像这样，全部都在spring的配置文件中配置核心设置

  ```yaml
  # 配置mybatis的规则
  mybatis:
    #     这里不指定 mybatis的全局核心配置文件 而是通过下面的configuration来配置对应的项目
  #  config-location: classpath:mybatis/mybatis-config.xml
    # 指定mapper映射文件路径
    mapper-locations: classpath:mybatis/mapper/*.xml
    
    # 如果你配置了mybatis的核心配置文件 则这里千万不要写这个configuration项，铁定会报错
    configuration:
      map-underscore-to-camel-case: true
  ```

在xml中

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```

在spring配置文件中

```yaml {7,8}
# 配置mybatis的规则
mybatis:
  # 配置mybatis的全局配置文件
  config-location: classpath:mybatis/mybatis-config.xml
  # 指定mapper映射文件路径
  mapper-locations: classpath:mybatis/mapper/*.xml
  configuration:
    map-underscore-to-camel-case: true
```

当然 你可以选择删掉mybatis核心配置xml文件 全部都在spring内进行配置

这个通常根据项目情况来决定

但是，XXXMapper--表的查询文件最好不要删 一般情况下来说 简单的查询用注解 ，复杂的一定要用xxxMapper.xml的

## 整合MybatisPlus

MybatisPlus是一个Mybatis的增强工具，在Mybatis的基础上只做增强不做改变，为简化开发，提高效率而生

国人制作的，官网<https://baomidou.com/>

封装了很多基本的增删改查

我们就直接按照官方文档的上手操作了

### 添加依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.3.4</version>
</dependency>
```

接着我们可以发现它引入了如下的依赖

![image-20211222122423789](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222122423789.png)

引入了mybatis jdbc以及额外的autoconfiguration

说明这里已经给我们引入了mybatis 不需要额外的引入其他内容

可以在autoconfiguration中看到如下内容

![image-20211222122531840](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222122531840.png)

```properties
# Auto Configure
org.springframework.boot.env.EnvironmentPostProcessor=\
  com.baomidou.mybatisplus.autoconfigure.SafetyEncryptProcessor
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.baomidou.mybatisplus.autoconfigure.IdentifierGeneratorAutoConfiguration,\
  com.baomidou.mybatisplus.autoconfigure.MybatisPlusLanguageDriverAutoConfiguration,\
  com.baomidou.mybatisplus.autoconfigure.MybatisPlusAutoConfiguration

```

EnableAutoConfiguration是启动时额外要加载的类

接下来我们看看MybatisPlusAutoConfiguration

```java {4}
@ConditionalOnClass({SqlSessionFactory.class, SqlSessionFactoryBean.class})
@ConditionalOnSingleCandidate(DataSource.class)
@EnableConfigurationProperties({MybatisPlusProperties.class})
@AutoConfigureAfter({DataSourceAutoConfiguration.class, MybatisPlusLanguageDriverAutoConfiguration.class})
public class MybatisPlusAutoConfiguration implements InitializingBean {}
```

这个自动配置类在容器中放了一堆Bean，关联了MybatisPlusProperties，也就是说，我们以后要更改的话 只需要修改`mybatis-plus`的配置即可

接着我们继续看看AutoConciguration配置 了哪些bean

首先是一个

![image-20211222123148327](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222123148327.png)

设置好了Mybatis的SqlSessionFactory

@Bean标注的对象，如果参数是一个对象，那么就会从容器中自动的传入这个组件

而我们此时的容器中正好是一个Druid的是数据源

所以使用的将是我们的druid数据源

接着我们看看第一个if

```java
if (StringUtils.hasText(this.properties.getConfigLocation())) {
    factory.setConfigLocation(this.resourceLoader.getResource(this.properties.getConfigLocation()));
}
```

这个是我们有没有mybatis的全局配置文件 如果没有配 就不用管了

接下来还有非常多的配置

例如一个configuration

```java
if (this.properties.getConfigurationProperties() != null) {
 factory.setConfigurationProperties(this.properties.getConfigurationProperties());
}
```

接下来我们再看看这个MybatisPlusProperties

首先就能看到配置了一个mapper的位置-mapperLocations

![image-20211222123917205](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222123917205.png)

`classpath*:/mapper/**/*.xml`

任意包下的类路径下的所有mapper文件夹下任意路径下的xml都是sql映射文件

相当于给我们把mapper的映射也配置好了

所以说我们以后需要增加mapper配置文件 只需要在我们的resources文件夹下的mapper文件夹里一放就可以了

接着我们还可以发现 它给我们配置好了sqlsessionTemplate

```java
@Bean
@ConditionalOnMissingBean
public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
    ExecutorType executorType = this.properties.getExecutorType();
    if (executorType != null) {
        return new SqlSessionTemplate(sqlSessionFactory, executorType);
    } else {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

我们继续下翻

看到了有一个额外的静态内部类，并且导入了一个AutoConfiguredMapperScannerRegistrar

```java {2}
@Configuration(proxyBeanMethods = false)
@Import(AutoConfiguredMapperScannerRegistrar.class)
@ConditionalOnMissingBean({MapperFactoryBean.class, MapperScannerConfigurer.class})
public static class MapperScannerRegistrarNotFoundConfiguration implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        logger.debug(
            "Not found configuration for registering mapper bean using @MapperScan, MapperFactoryBean and MapperScannerConfigurer.");
    }
}
```

接下来看看这个AutoConfiguredMapperScannerRegistrar

![image-20211222124513280](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222124513280.png)

可以发现 是和@mapper注解有关的，也就是说，我们无需额外的配置mapper注解的少报位置 它将会自动给我们进行扫描@mapper标注的接口

### 使用Mybatis-Plus

我们参照官方文档 先在main文件中额外加一个扫描的路径

```java {2}
@SpringBootApplication
@MapperScan("com.MyProject.webadmin.mapper")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}

```

这样在写mapper的时候就无需额外标注@mapper了

接下来我们依旧是创建一个admin类

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    private Integer id;
    private String name;
    private String password;

}
```

对应的数据源

![image-20211222125419223](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222125419223.png)

接着我们编写一个mapper接口AdminMapper

接着让其继承BaseMapper接口，并传入我们的Admin类泛型

```java
public interface AdminMapper extends BaseMapper<Admin> {

}
```

在BaseMapper中，我们可以看到有非常多的定义好的封装好的东西，基本的增删改查全部都有的

（注意 如果说要对数据库进行优化 则不太建议使用这里面的一些东西 还是建议手写）

![image-20211222125657921](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222125657921.png)

也就是我们现在无需对自己的AdminMapper再进行额外的任何操作 就可以拥有CRUD的功能

接下来我们简单使用下

```java
@SpringBootTest
@Slf4j
class ApplicationTests {


    @Autowired
    AdminMapper adminMapper;

    @Test
    void contextLoads() {
        Admin admin = adminMapper.selectById(1);
        log.info("admin={}", admin);
    }

}
```

接着喜闻热见的报错了--我们的表名是admin_2，这里用的类是admin 默认情况下它会去找admin2的表 所以说我们根据官方文档

### 注解标注表名、字段名等

<https://baomidou.com/pages/223848/#tablename>

发现可以指定表名

于是乎在admin上标注下表名

```java {4}
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("admin2")
public class Admin {
    private Integer id;
    private String name;
    private String password;

}

```

运行：

![image-20211222130736751](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222130736751.png)

### 规范的使用Mybatis-plus

我们正常的使用过程中 应该是这样的

Java Bean

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("admin2")
public class Admin {
    private Integer id;
    private String name;
    private String password;

}

```

然后是mapper

```java
@Mapper
public interface AdminMapper extends BaseMapper<Admin> {

}
```

这个时候我们突然想起 应该规范的开发

也就是service分为两个 一个 接口 一个impl

但是这样又引出了一个问题 因为我们要使用BaseMapper所提供的查询，所以说要手动给service写一堆BaseMapper中的方法 并且让Impl再实现这个借口，再调用AdminMapper的一些方法不太现实

所以Mybatis-plus提供了一个神器接口

`IService<T>`

![image-20211222152228461](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222152228461.png)

这个接口里面定义了超多的方法和返回值，和baseMapper几乎一一对应 需要传入一个泛型

所以我们只需要这样：

```java
public interface AdminService extends IService<Admin> {
}

```

但是问题又来了

我们总不可能在IMPL中一个一个的去实现这么多方法吧

![image-20211222152412179](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222152412179.png)

所以mybatis也做了一个超级强大的类

`ServiceImpl<M,T>`  这是一个对顶级Service接口的实现类

使用它的时候 继承它并传入两个泛型即可

第一个泛型M----Mapper接口

第二个泛型T----实体domain类

所以我们只需要

```java
@Service
public class AdminServiceImpl extends ServiceImpl<AdminMapper, Admin> implements AdminService {
}

```

这里有相当多的增删改查方法 这里就不展示了 接下来使用它

```java
@SpringBootTest
@Slf4j
class ApplicationTests {


    @Autowired
    AdminService adminService;

    @Test
    void contextLoads() {
        Admin admin = adminService.getById(1);
        log.info("admin:{}",admin);
    }

}

```

![image-20211222153704752](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222153704752.png)

### Mybatis-Plus的分页功能的使用

官方是这样说明的

<https://baomidou.com/pages/8f40ae/>

说以我们要先注册一个Bean 这里官方文有分新旧版本 我们就用新版即可

```java
//Spring boot方式
@Configuration
@MapperScan("com.baomidou.cloud.service.*.mapper*")
public class MybatisPlusConfig {

    // 旧版
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        // 设置请求的页面大于最大页后操作， true调回到首页，false 继续请求  默认false
        // paginationInterceptor.setOverflow(false);
        // 设置最大单页限制数量，默认 500 条，-1 不受限制
        // paginationInterceptor.setLimit(500);
        // 开启 count 的 join 优化,只针对部分 left join
        paginationInterceptor.setCountSqlParser(new JsqlParserCountOptimize(true));
        return paginationInterceptor;
    }

    // 最新版
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }

}


```

我们使用最新版本的

```java
@Configuration
@MapperScan("com.MyProject.webadmin.mapper")
public class MybatisConfiguration {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        //        设置分页拦截器
        PaginationInnerInterceptor interceptor1 = new PaginationInnerInterceptor(DbType.H2);
        //        设置每一页最多有多少个结果 这里设置成100
        interceptor1.setMaxLimit(100L);
        interceptor.addInnerInterceptor(interceptor1);

        return interceptor;
    }
}

```

接下来写个代码测试一下：

```java
@SpringBootTest
@Slf4j
class ApplicationTests {


    @Autowired
    AdminService adminService;

    @Test
    void contextLoads() {
        //        首先要创建一个page 传入两个参数 第一个是从哪个index开始查 第二个是要查询多少条记录
        Page<Admin> adminPage = new Page<>(1, 10);
        //        然后使用service创建一个查询结果对象  第一个参数是page对象 第二个是查询条件（这里先不指定查询条件）
        Page<Admin> page = adminService.page(adminPage, null);
        System.out.println("每页显示条数" + page.getSize());
        System.out.println("总条数" + page.getTotal());
        System.out.println("总页数" + page.getPages());
        System.out.println("当前页" + page.getCurrent());
        System.out.println("当前页的数据");
        page.getRecords().forEach(System.out::println);


    }

}

```

运行结果：

![image-20211222172853573](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222172853573.png)

### 扩展-IEDA的MybatisX插件的使用

这玩意非常方便..

比方说我们现在有一张表

![image-20211222132241034](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222132241034.png)

右键

![image-20211222132256102](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222132256102.png)

接着几个设置大概这样 其他的都可以不动

![image-20211222132633012](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222132633012.png)

![image-20211222132850756](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222132850756.png)

接着你就能在你的项目中额外得到这些东西

![image-20211222132956925](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222132956925.png)

Domain

```java
package webadmin.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;


@TableName(value ="mes")
@Data
public class Mes implements Serializable {


    private Integer id;

    private String content;

    private Date sendTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Mes other = (Mes) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getContent() == null ? other.getContent() == null : this.getContent().equals(other.getContent()))
            && (this.getSendTime() == null ? other.getSendTime() == null : this.getSendTime().equals(other.getSendTime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getContent() == null) ? 0 : getContent().hashCode());
        result = prime * result + ((getSendTime() == null) ? 0 : getSendTime().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", content=").append(content);
        sb.append(", sendTime=").append(sendTime);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}
```

Mapper

```java
public interface MesMapper extends BaseMapper<Mes> {

}
```

service

```java
public interface MesService extends IService<Mes> {

}

```

serviceImpl

```java
    @Service
    public class MesServiceImpl extends ServiceImpl<MesMapper, Mes>
        implements MesService{

    }

```

### 扩展-Junit5的额外注解

![image-20211222174450513](/images/Java/SpringBoot/03-Spring_Boot整合数据访问/image-20211222174450513.png)

注意 在所有springboot的相关项目中 要使用spring容器内的内容 都需要：

在类名处加上@SpringBootTest注解

还有一些其他的东西暂时先不学 了 等过了spring cloud再说
