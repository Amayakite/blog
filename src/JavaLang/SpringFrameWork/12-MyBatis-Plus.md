---
title: 12-Mybatis-Plus
date: 2021-12-16 23:17:15
category: Spring-FrameWork
tag:
- Java
- Spring
- Mysql
- Jdbc
- Mybatis
- MybatisPlus
---

## 概述

​  想了想，在正式学习Spring Boot 之前 还是来接着学习下Mybatis好一些。。。

2021年12月17日14:22:59 补： 先别看这玩意 还是学完Spring Boot再来整 新版本的MybatisPlus都得会Spring Boot才能学好

​  毕竟SPring Boot 的内容真的不多

​  Mybatis-Plus是一个Mybatis的增强工具包，只做增强，功能不变，为简化开发工作，提高生产效率而生

​  这玩意的目标是成为Mybatis最好的搭档

​  有了这玩意是非常丝滑的

​  这玩意是国人开发的，所以说有中文文档和[中文官网](https://baomidou.com/)

### 快速入门

#### 准备工作

我们先创建一个测试表

```sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    id BIGINT(20) NOT NULL auto_increment COMMENT '主键ID',
    name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
    age INT(11) NULL DEFAULT NULL COMMENT '年龄',
    email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (id)
);

DELETE FROM user;

INSERT INTO user (id, name, age, email) VALUES
(1, 'Jone', 18, 'test1@baomidou.com'),
(2, 'Jack', 20, 'test2@baomidou.com'),
(3, 'Tom', 28, 'test3@baomidou.com'),
(4, 'Sandy', 21, 'test4@baomidou.com'),
(5, 'Billie', 24, 'test5@baomidou.com');

```

接着新建一个project，在domain中新建一个JavaBean

```java
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private String email;
}
```

这里get和 set 和 toString自行添加

#### 添加依赖

使用了MybatisPlus就不需要引入Mybatis和Mybatis-spring了

反正其他的都和原来一样 除了那两位合二为一变成了mybatis-plus

```xml
<!-- https://mvnrepository.com/artifact/com.baomidou/mybatis-plus -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>3.4.3.4</version>
</dependency>
<!-- https://mvnrepository.com/artifact/log4j/log4j -->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.27</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.8</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.13</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-tx -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.3.13</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.3.13</version>
    <scope>test</scope>
</dependency>

<!-- https://mvnrepository.com/artifact/junit/junit -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
<!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.13</version>
</dependency>

```

### 相关的配置文件

#### Mybatis核心配置文件-sqlMapConfig

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--mybatis-config约束-->
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    
</configuration>
```

#### log4j配置文件

```properties
### direct log messages to stdout ###
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

### direct messages to file mylog.log ###
log4j.appender.file=org.apache.log4j.FileAppender
log4j.appender.file.File=c:/mylog.log
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

### set log levels - for more verbose logging change 'info' to 'debug' ###
### 这里要改动的就只有这个info 可以改成debug  其余的不需要动
log4j.rootLogger=info, stdout

```

#### JDBC

```properties
jdbc.username=root
jdbc.password=123456
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mbp
```

#### applicationContext

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--扫包-->

    <context:component-scan base-package="com.mb"/>

    <!--下面是Mybatis相关-->

    <!--    加载properties文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <!--    配置数据源信息-->
    <bean class="com.alibaba.druid.pool.DruidDataSource" id="dataSource">
        <property name="url" value="${jdbc.url}"/>
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--    配置session工厂-->
    <bean class="org.mybatis.spring.SqlSessionFactoryBean" id="sessionFactory">
        <property name="dataSource" ref="dataSource"/>
        <!--        加载mybatis核心配置文件-->
        <property name="configLocation" value="classpath:sqlMapConfig.xml"/>
    </bean>
    <!--    扫描mapper所在的包，为mapper创建实现类-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.mb.mapper"/>
    </bean>

    <!--    声明式事务控制-->
    <!--    声明平台事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--    配置事务增强-->
    <tx:advice id="txAdvice">
        <tx:attributes>
            <tx:method name="* "/>
        </tx:attributes>
    </tx:advice>
    <!--    配置事务的织入-->
    <aop:config>
        <aop:pointcut id="txAdvice" expression="execution(* com.ssm.service.*(..))"/>
    </aop:config>
</beans>
```

### 测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class UserMapperTest {

    @Resource(name = "userMapper")
    private UserMapper userMapper;


    @Test
    public void findAll() {
        List<User> all = userMapper.findAll();
        System.out.println(all);
    }
}
```

TMD我知道现在知道，测试的时候 log4j会自动打印消息

![image-20211217001624446](/images/Java/SpringFrameWork/12-MyBatis-Plus/image-20211217001624446.png)

不信你可以把log4j.properties删掉试试

### 扩展-log4j2的使用

用之前要把log4j依赖去掉，然后添加如下两个依赖

```xml
<!-- https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.16.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-api -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.16.0</version>
</dependency>
```

关于配置文件：

　　　　log4j 2.x版本不再支持像1.x中的.properties后缀的文件配置方式，2.x版本配置文件后缀名只能为".xml",".json"或者".jsn".

　　　　系统选择配置文件的优先级(从先到后)如下：

1. classpath下的名为log4j2-test.json 或者log4j2-test.jsn的文件.
2. classpath下的名为log4j2-test.xml的文件
3. classpath下名为log4j2.json 或者log4j2.jsn的文件
4. classpath下名为log4j2.xml的文件.

我们一般默认使用log4j2.xml进行命名。如果本地要测试，可以把log4j2-test.xml放到classpath，而正式环境使用log4j2.xml，则在打包部署的时候不要打包log4j2-test.xml即可。

配置文件 直接搬过去即可 然后要用啥加啥

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL -->
<!--status="WARN" :用于设置log4j2自身内部日志的信息输出级别，默认是OFF-->
<!--monitorInterval="30"  :间隔秒数,自动检测配置文件的变更和重新配置本身-->
<configuration status="WARN" monitorInterval="30">
    <Properties>
        <!--自定义一些常量，之后使用${变量名}引用-->
        <Property name="logFilePath">log</Property>
        <Property name="logFileName">test.log</Property>
    </Properties>
    <!--appenders:定义输出内容,输出格式,输出方式,日志保存策略等,常用其下三种标签[console,File,RollingFile]-->
    <appenders>
        <!--console :控制台输出的配置-->
        <console name="Console" target="SYSTEM_OUT">
            <!--PatternLayout :输出日志的格式,LOG4J2定义了输出代码,详见第二部分-->
            <PatternLayout pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n"/>
        </console>
        <!--        &lt;!&ndash;File :同步输出日志到本地文件&ndash;&gt;-->
        <!--        &lt;!&ndash;append="false" :根据其下日志策略,每次清空文件重新输入日志,可用于测试&ndash;&gt;-->
        <!--        <File name="log" fileName="${logFilePath}/${logFileName}" append="false">-->
        <!--            <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level %class{36} %L %M - %msg%xEx%n"/>-->
        <!--        </File>-->
        <!--        &lt;!&ndash;SMTP :邮件发送日志&ndash;&gt;-->
        <!--        <SMTP name="Mail" subject="****SaaS系统正式版异常信息" to="message@message.info" from="message@lengjing.info" smtpUsername="message@message.info" smtpPassword="LENG****1234" smtpHost="mail.lengjing.info" smtpDebug="false" smtpPort="25" bufferSize="10">-->
        <!--            <PatternLayout pattern="[%-5p]:%d{YYYY-MM-dd HH:mm:ss} [%t] %c{1}:%L - %msg%n" />-->
        <!--        </SMTP>-->
        <!-- ${sys:user.home} :项目路径 -->
        <!--        <RollingFile name="RollingFileInfo" fileName="${sys:user.home}/logs/info.log"-->
        <!--                     filePattern="${sys:user.home}/logs/$${date:yyyy-MM}/info-%d{yyyy-MM-dd}-%i.log">-->
        <!--            &lt;!&ndash;ThresholdFilter :日志输出过滤&ndash;&gt;-->
        <!--            &lt;!&ndash;level="info" :日志级别,onMatch="ACCEPT" :级别在info之上则接受,onMismatch="DENY" :级别在info之下则拒绝&ndash;&gt;-->
        <!--            <ThresholdFilter level="info" onMatch="ACCEPT" onMismatch="DENY"/>-->
        <!--            <PatternLayout pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n"/>-->
        <!--            &lt;!&ndash; Policies :日志滚动策略&ndash;&gt;-->
        <!--            <Policies>-->
        <!--                &lt;!&ndash; TimeBasedTriggeringPolicy :时间滚动策略,默认0点小时产生新的文件,interval="6" : 自定义文件滚动时间间隔,每隔6小时产生新文件, modulate="true" : 产生文件是否以0点偏移时间,即6点,12点,18点,0点&ndash;&gt;-->
        <!--                <TimeBasedTriggeringPolicy interval="6" modulate="true"/>-->
        <!--                &lt;!&ndash; SizeBasedTriggeringPolicy :文件大小滚动策略&ndash;&gt;-->
        <!--                <SizeBasedTriggeringPolicy size="100 MB"/>-->
        <!--            </Policies>-->
        <!--            &lt;!&ndash; DefaultRolloverStrategy属性如不设置，则默认为最多同一文件夹下7个文件，这里设置了20 &ndash;&gt;-->
        <!--            <DefaultRolloverStrategy max="20"/>-->
        <!--        </RollingFile>-->

        <!--        <RollingFile name="RollingFileWarn" fileName="${sys:user.home}/logs/warn.log"-->
        <!--                     filePattern="${sys:user.home}/logs/$${date:yyyy-MM}/warn-%d{yyyy-MM-dd}-%i.log">-->
        <!--            <ThresholdFilter level="warn" onMatch="ACCEPT" onMismatch="DENY"/>-->
        <!--            <PatternLayout pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n"/>-->
        <!--            <Policies>-->
        <!--                <TimeBasedTriggeringPolicy/>-->
        <!--                <SizeBasedTriggeringPolicy size="100 MB"/>-->
        <!--            </Policies>-->
        <!--        </RollingFile>-->
        <!--        <RollingFile name="RollingFileError" fileName="${sys:user.home}/logs/error.log"-->
        <!--                     filePattern="${sys:user.home}/logs/$${date:yyyy-MM}/error-%d{yyyy-MM-dd}-%i.log">-->
        <!--            <ThresholdFilter level="error" onMatch="ACCEPT" onMismatch="DENY"/>-->
        <!--            <PatternLayout pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n"/>-->
        <!--            <Policies>-->
        <!--                <TimeBasedTriggeringPolicy/>-->
        <!--                <SizeBasedTriggeringPolicy size="100 MB"/>-->
        <!--            </Policies>-->
        <!--        </RollingFile>-->
    </appenders>
    <!--然后定义logger，只有定义了logger并引入的appender，appender才会生效-->
    <loggers>
        <!--过滤掉spring和mybatis的一些无用的DEBUG信息-->
        <!--Logger节点用来单独指定日志的形式，name为包路径,比如要为org.springframework包下所有日志指定为INFO级别等。 -->
        <logger name="org.springframework" level="INFO"></logger>
        <logger name="org.mybatis" level="INFO"></logger>
        <!-- Root节点用来指定项目的根日志，如果没有单独指定Logger，那么就会默认使用该Root日志输出 -->
        <root level="all">
            <appender-ref ref="Console"/>
            <!--            <appender-ref ref="RollingFileInfo"/>-->
            <!--            <appender-ref ref="RollingFileWarn"/>-->
            <!--            <appender-ref ref="RollingFileError"/>-->
        </root>
        <!--AsyncLogger :异步日志,LOG4J有三种日志模式,全异步日志,混合模式,同步日志,性能从高到底,线程越多效率越高,也可以避免日志卡死线程情况发生-->
        <!--        additivity="false" : additivity设置事件是否在root logger输出，为了避免重复输出，可以在Logger 标签下设置additivity为”false”-->
        <!--        <AsyncLogger name="AsyncLogger" level="trace" includeLocation="true" additivity="false">-->
        <!--            <appender-ref ref="RollingFileError"/>-->
        <!--        </AsyncLogger>-->
    </loggers>
</configuration>
```

### ✨集成MybatisPlus

我们在配置mybatis的时候（集成到ApplicationContext中），是如下进行配置bean的

```xml
<!--    配置session工厂-->
<bean class="org.mybatis.spring.SqlSessionFactoryBean" id="sessionFactory">
    <!--配置数据源-->
    <property name="dataSource" ref="dataSource"/>
    <!--        加载mybatis核心配置文件-->
    <property name="configLocation" value="classpath:sqlMapConfig.xml"/>
</bean>
```

其实集成mybatis-plus只需要做一件事：

把这个SqlSessionFactoryBean换成MybatisSqlSessionFactoryBean..

也就是这样：

```xml
<!--    配置session工厂-->
<bean class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean" id="sessionFactory">
    <!--配置数据源-->
    <property name="dataSource" ref="dataSource"/>
    <!--        加载mybatis核心配置文件-->
    <property name="configLocation" value="classpath:sqlMapConfig.xml"/>
</bean>
```

没错 这就是它所有的配置项... 其余配置不需要做任何的修改..

完整配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--扫包-->

    <context:component-scan base-package="com.mb"/>

    <!--下面是Mybatis相关-->

    <!--    加载properties文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <!--    配置数据源信息-->
    <bean class="com.alibaba.druid.pool.DruidDataSource" id="dataSource">
        <property name="url" value="${jdbc.url}"/>
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--    配置session工厂-->
    <bean class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean" id="sessionFactory">
        <property name="dataSource" ref="dataSource"/>
        <!--        加载mybatis核心配置文件-->
        <property name="configLocation" value="classpath:sqlMapConfig.xml"/>
    </bean>

    <!--    扫描mapper所在的包，为mapper创建实现类-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.mb.mapper"/>
    </bean>

    <!--    声明式事务控制-->
    <!--    声明平台事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--    配置事务增强-->
    <tx:advice id="txAdvice">
        <tx:attributes>
            <tx:method name="*"/>
        </tx:attributes>
    </tx:advice>
    <!--    配置事务的织入-->
    <aop:config>
        <aop:pointcut id="txAdvice" expression="execution(* com.ssm.service.*(..))"/>
    </aop:config>
</beans>
```

## Mybatis-plus使用

### 通用CRUD

问题：

​  假设我们已经存在一张table user 表 并且已经有对应的实体类User 实现基于它的CRUD需要做哪些事情？

- 基于Mybatis

  - 编写UserMapper接口，并手动编写CRUD方法

  - 需要提供UserMapper.xml映射文件 或者通过注解的方式，手动编写每个方法对应的SQL语句

    ```java
    public interface UserMapper {
        @Select("select * from user")
        List<User> findAll();
    }
    ```

- 基于MyBatis-Plus

  - 只需要创建EmployeeMapper**接口**，并**继承BaseMapper接口**

  - 对，不需要配置文件...而且里面什么都不用写

    ```java
    /**
     * Mapper接口：
     * 让XXXmapper接口继承BaseMapper接口即可
     *  baseMapper<T>:指定泛型，就是当前Mapper接口所操作的实体类
     */
    public interface UserMapper  extends BaseMapper<User> {
    }
    ```

### BaseMapper接口源码初步分析

对没错 注释都是中文的

它包含如下非常直观的方法：

![image-20211217121846161](/images/Java/SpringFrameWork/12-MyBatis-Plus/image-20211217121846161.png)

```java
/**
 * Mapper 继承该接口后，无需编写 mapper.xml 文件，即可获得CRUD功能
 * <p>这个 Mapper 支持 id 泛型</p>
 *
 * @author hubin
 * @since 2016-01-23
 */
public interface BaseMapper<T> extends Mapper<T> {

    /**
     * 插入一条记录
     *
     * @param entity 实体对象
     */
    int insert(T entity);

    /**
     * 根据 ID 删除
     *
     * @param id 主键ID
     */
    int deleteById(Serializable id);

    /**
     * 根据实体(ID)删除
     *
     * @param entity 实体对象
     * @since 3.4.4
     */
    int deleteById(T entity);

    /**
     * 根据 columnMap 条件，删除记录
     *
     * @param columnMap 表字段 map 对象
     */
    int deleteByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);

    /**
     * 根据 entity 条件，删除记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
     */
    int delete(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 删除（根据ID 批量删除）
     *
     * @param idList 主键ID列表(不能为 null 以及 empty)
     */
    int deleteBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);

    /**
     * 根据 ID 修改
     *
     * @param entity 实体对象
     */
    int updateById(@Param(Constants.ENTITY) T entity);

    /**
     * 根据 whereEntity 条件，更新记录
     *
     * @param entity        实体对象 (set 条件值,可以为 null)
     * @param updateWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
     */
    int update(@Param(Constants.ENTITY) T entity, @Param(Constants.WRAPPER) Wrapper<T> updateWrapper);

    /**
     * 根据 ID 查询
     *
     * @param id 主键ID
     */
    T selectById(Serializable id);

    /**
     * 查询（根据ID 批量查询）
     *
     * @param idList 主键ID列表(不能为 null 以及 empty)
     */
    List<T> selectBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);

    /**
     * 查询（根据 columnMap 条件）
     *
     * @param columnMap 表字段 map 对象
     */
    List<T> selectByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);

    /**
     * 根据 entity 条件，查询一条记录
     * <p>查询一条记录，例如 qw.last("limit 1") 限制取一条记录, 注意：多条数据会报异常</p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    default T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper) {
        List<T> ts = this.selectList(queryWrapper);
        if (CollectionUtils.isNotEmpty(ts)) {
            if (ts.size() != 1) {
                throw ExceptionUtils.mpe("One record is expected, but the query result is multiple records");
            }
            return ts.get(0);
        }
        return null;
    }

    /**
     * 根据 Wrapper 条件，查询总记录数
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    Long selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 entity 条件，查询全部记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录
     * <p>注意： 只返回第一个字段的值</p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 entity 条件，查询全部记录（并翻页）
     *
     * @param page         分页查询条件（可以为 RowBounds.DEFAULT）
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    <P extends IPage<T>> P selectPage(P page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录（并翻页）
     *
     * @param page         分页查询条件
     * @param queryWrapper 实体对象封装操作类
     */
    <P extends IPage<Map<String, Object>>> P selectMapsPage(P page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
}

```

### Insert

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class UserMapperTest {

    @Resource(name = "userMapper")
    private UserMapper userMapper;


    /**
     * 测试通用的插入操作
     */
    @Test
    public void save() {
        int i = userMapper.insert(new User("张三", 18, "aaa.abc@dd.com"));
        System.out.println(i > 0 ? "插入成功" : "插入失败");
    }
}
```

然后不出意外的出意外了

![image-20211217123932091](/images/Java/SpringFrameWork/12-MyBatis-Plus/image-20211217123932091.png)

我们现在大概能猜出来原因---应该是这玩意如果检测到空值会转换成某些最大值赋值给数据库

在[官方文档](https://baomidou.com/pages/223848/#tableid)中，我们可以看到一个@TableId的注解

![image-20211217124716328](/images/Java/SpringFrameWork/12-MyBatis-Plus/image-20211217124716328.png)

也就是说，可以通过它来制定主键ID是什么样的

接下来测试一下：

| 值                | 描述                                                                                                                                                            |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUTO              | 数据库 ID 自增                                                                                                                                                  |
| NONE              | 无状态，该类型为未设置主键类型（注解里等于跟随全局，全局里约等于 INPUT），默认值                                                                                |
| INPUT             | insert 前自行 set 主键值                                                                                                                                        |
| ASSIGN_ID         | 分配 ID(主键类型为 Number(Long 和 Integer)或 String)(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextId`(默认实现类为`DefaultIdentifierGenerator`雪花算法) |
| ASSIGN_UUID       | 分配 UUID,主键类型为 String(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextUUID`(默认 default 方法)                                                       |
| ~~ID_WORKER~~     | 分布式全局唯一 ID 长整型类型(please use `ASSIGN_ID`)                                                                                                            |
| ~~UUID~~          | 32 位 UUID 字符串(please use `ASSIGN_UUID`)                                                                                                                     |
| ~~ID_WORKER_STR~~ | 分布式全局唯一 ID 字符串类型(please use `ASSIGN_ID`)                                                                                                            |

一看就知道要用第一个

```java
public class User {
    @TableId(value="id",type = IdType.AUTO)
    //这里的value对应数据库内的字段
    private Integer id;
    
    private String name;
    private Integer age;
    private String email;
}
```

结果：完美运行

![image-20211217125223213](/images/Java/SpringFrameWork/12-MyBatis-Plus/image-20211217125223213.png)

![image-20211217125239536](/images/Java/SpringFrameWork/12-MyBatis-Plus/image-20211217125239536.png)

### Select

​ 

## ✨Mybatis-Plus的相关注解

### @TableName-指定实体类对应的表

例如：

```java
@TableName("user")
public class User{
    .....
}
```

### @TableId 指定主键以及对应的生成方式

```java
@TableName("sys_user")
public class User {
    @TableId(type=IdType.AUTO) // 主键自增长
    private Long id;
    
    
    private String name;
    private Integer age;
    private String email;
}
```

| 属性  | 类型   | 必须指定 | 默认值      | 描述         |
| :---- | :----- | :------- | :---------- | :----------- |
| value | String | 否       | ""          | 主键字段名   |
| type  | Enum   | 否       | IdType.NONE | 指定主键类型 |

相应属性可以看这个[链接](https://baomidou.com/pages/223848/#idtype)，当然如果你懒的话

| 值                | 描述                                                                                                                                                            |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUTO              | 数据库 ID 自增                                                                                                                                                  |
| NONE              | 无状态，该类型为未设置主键类型（注解里等于跟随全局，全局里约等于 INPUT），默认值                                                                                |
| INPUT             | insert 前自行 set 主键值                                                                                                                                        |
| ASSIGN_ID         | 分配 ID(主键类型为 Number(Long 和 Integer)或 String)(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextId`(默认实现类为`DefaultIdentifierGenerator`雪花算法) |
| ASSIGN_UUID       | 分配 UUID,主键类型为 String(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextUUID`(默认 default 方法)                                                       |
| ~~ID_WORKER~~     | 分布式全局唯一 ID 长整型类型(please use `ASSIGN_ID`)                                                                                                            |
| ~~UUID~~          | 32 位 UUID 字符串(please use `ASSIGN_UUID`)                                                                                                                     |
| ~~ID_WORKER_STR~~ | 分布式全局唯一 ID 字符串类型(please use `ASSIGN_ID`)                                                                                                            |

#### 额外说明-插入时会自动给传入的对象填充id属性

```java
@Test
public void save() {
    User user = new User("李四", 18, "aaa.abc@dd.com");
    int i = userMapper.insert(user);
    System.out.println(i > 0 ? "插入成功" : "插入失败");
    System.out.println(user);
}
```

我当前是这样插入的，获取到的结果为：

![image-20211217134750080](/images/Java/SpringFrameWork/12-MyBatis-Plus/image-20211217134750080.png)

### @TableFiled-指定属性对应表的哪个字段

例如，我们实体类中是name 但在表中是user_name

```java
@TableName("user")
public class User {
    @TableId(type = IdType.AUTO)
    private Integer id;

    @TableField("user_name")
    private String name;
    private Integer age;
    private String email;
}
```

支持的东西蛮多的，直接看[官方文档](https://baomidou.com/pages/223848/#tablefield)吧

常用的有exists:指定某个属性将不会插入到数据库内

```java
@TableName("user")
public class User {
    @TableId(type = IdType.AUTO)
    private Integer id;

    @TableField(exists=false) //指定false时 这个属性将不会被插入到数据库内
    private String name;
    private Integer age;
    private String email;
}
```

也就是会变成这样：

```sql
insert into user(age,email) values(?,?)
```
