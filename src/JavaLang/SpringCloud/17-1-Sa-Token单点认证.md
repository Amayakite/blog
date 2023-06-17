---
title: 17-1-Sa-Token单点认证
date: 2022-1-21 18:35:30
category: 分布式-微服务
tag:
- Sa-Token
- Security
---

## 概述

凡是稍微上点规模的系统，统一认证中心都是绕不过去的槛。而单点登录——便是我们搭建统一认证中心的关键。

那么什么是单点登陆，它能解决哪些问题呢？

举个场景，假设我们的系统被切割为N个部分：商城、论坛、直播、社交…… 如果用户每访问一个模块都要登录一次，那么用户将会疯掉， 为了优化用户体验，我们急需一套机制将这N个系统的认证授权互通共享，让用户在一个系统登录之后，便可以畅通无阻的访问其它所有系统。

单点登录——就是为了解决这个问题而生！

简而言之，单点登录可以做到：**`在多个互相信任的系统中，用户只需登录一次，就可以访问所有系统。`**

对于单点登录，网上教程大多以CAS模式为主，其实对于不同的系统架构，实现单点登录的步骤也大为不同，Sa-Token 由简入难将其划分为三种模式：

| 系统架构                                         | 采用模式 | 简介                 |
| ------------------------------------------------ | -------- | -------------------- |
| 前端同域 + 后端同 Redis                          | 模式一   | 共享 Cookie 同步会话 |
| 前端不同域 + 后端同 Redis                        | 模式二   | URL重定向传播会话    |
| 前端不同域 + 后端不同 Redis（Client端没有Redis） | 模式三   | Http请求获取会话     |

1. 前端同域：就是指多个系统可以部署在同一个主域名之下，比如：`c1.domain.com`、`c2.domain.com`、`c3.domain.com`。
2. 后端同Redis：就是指多个系统可以连接同一个Redis，其它的缓存数据中心亦可。PS：这里并不需要把所有项目的数据都放在同一个Redis中，Sa-Token提供了 **`[权限缓存与业务缓存分离]`** 的解决方案，详情戳：[Alone独立Redis插件](http://sa-token.dev33.cn/doc/index.html#/plugin/alone-redis)。
3. 如果既无法做到前端同域，也无法做到后端同Redis，那么只能走模式三，Http请求获取会话（Sa-Token对SSO提供了完整的封装，你只需要按照示例从文档上复制几段代码便可以轻松集成）。
4. 技术选型一定要根据系统架构对症下药，切不可胡乱选择。

## 🎉统一认证中心SSO-Server

我们首先需要一个地方来统一处理用户的权限校验值类的，所以单独创建一个module

### 依赖

除了 **sa-token-spring-boot-starter** 以外，其它包都是可选的：

- 在SSO模式三时 Redis 相关包是可选的
- 在前后端分离模式下可以删除 thymeleaf 相关包
- 在不需要SSO模式三单点注销的情况下可以删除 http 工具包

建议先完整测试三种模式之后再对pom依赖进行酌情删减。

```xml
<!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.28.0</version>
</dependency>

<!-- Sa-Token 整合 Redis (使用 jackson 序列化方式) -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-dao-redis-jackson</artifactId>
    <version>1.28.0</version>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
<!-- Sa-Token插件：权限缓存与业务缓存分离 这个可选 -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-alone-redis</artifactId>
    <version>1.28.0</version>
</dependency>

<!-- 视图引擎（在前后端不分离模式下提供视图支持） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

<!-- Http请求工具（在模式三的单点注销功能下用到，如不需要可以注释掉） -->
<dependency>
    <groupId>com.ejlchina</groupId>
    <artifactId>okhttps</artifactId>
    <version>3.4.2</version>
</dependency>

<!--        基础内容-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

```

### 配置文件

下面的根据自己用到的对应的模式开启

```yaml
# 端口
server:
  port: 9000

# Sa-Token 配置
sa-token:
  # 首先是标准配置
  # token名称 (同时也是cookie名称)
  token-name: satoken
  # token有效期，单位s 默认30天, -1代表永不过期
  timeout: 2592000
  # token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒
  activity-timeout: -1
  # 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)
  is-concurrent: true
  # 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)
  is-share: false
  # token风格
  token-style: uuid
  # 是否输出操作日志
  is-log: false

  # -------------- SSO-模式一相关配置  (非模式一不需要配置) 前端同域 + 后端同 Redis
  # cookie:
  # 配置Cookie作用域  这里会彪黄，不影响，注意，是要在cookie的下后方
  # domain: stp.com

    # ------- SSO-模式二相关配置  前端不同域 + 后端同 Redis
  sso:
    # Ticket有效期 (单位: 秒)，默认五分钟
    ticket-timeout: 300
    # 所有允许的授权回调地址
    allow-url: "*"
    # 是否打开单点注销功能
    is-slo: true

    # ------- SSO-模式三相关配置 前端不同域 + 后端不同 Redis
    #（下面的配置在SSO模式三并且 is-slo=true 时打开）
    # 是否打开模式三
    isHttp: true
    # 接口调用秘钥（用于SSO模式三的单点注销功能）
    secretkey: kQwIOrYvnXmSDkwEiFngrKidMcdrgKor
    # ---- 除了以上配置项，你还需要为 Sa-Token 配置http请求处理器（文档有步骤说明）
spring:
  # Redis配置 （SSO模式一和模式二使用Redis来同步会话）
  redis:
    # Redis数据库索引（默认为0）
    database: 1
    # Redis服务器地址
    host: myserver
    # Redis服务器连接端口
    port: 13355
    # Redis服务器连接密码（默认为空）
    password: amayakite
    # 连接超时时间
    timeout: 10s
    lettuce:
      pool:
        # 连接池最大连接数
        max-active: 200
        # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms
        # 连接池中的最大空闲连接
        max-idle: 10
        # 连接池中的最小空闲连接
        min-idle: 0

```



### 设置登陆Controller

> 注：在`setDoLoginHandle`函数里如果要获取name, pwd以外的参数
>
> 可通过`SaHolder.getRequest().getParam("xxx")`来获取
>
> 下面的Controller建议直接复制，当然那个sso可以换成别的

```java {29-30}
@RestController
public class SsoServiceController {


    /**
     * SSO-Server端：处理所有SSO相关的请求，之后的章节会说明它的作用
     *
     * @return
     */
    @RequestMapping("/sso/*")
    public Object ssoRequest() {
        return SaSsoHandle.serverRequest();
    }


    @Autowired
    private void configSso(SaTokenConfig cfg) {
//        配置：未登录的时候返回的view
        cfg.sso.setNotLoginView(() -> {
            String msg = "当前会话在SSO-Server端尚未登录，请先访问"
                    + "<a href='/sso/doLogin?name=user&pwd=123456' target='_blank'> doLogin登录 </a>"
                    + "进行登录之后，刷新页面开始授权";
            return msg;
        });
//        配置：处理登陆函数
        cfg.sso.setDoLoginHandle((name, pwd) -> {
//           TODO 目前只是模拟登陆，真实登陆的话，要该改成通过数据库来验证
            if ("user".equals(name) && "123456".equals(pwd)) {
//                 注意 这个login非常非常非常重要，一定不能忘了。。
                StpUtil.login(10001);
//                这里返回啥都行（接收Object，这个SaResult相当于我们自己的手动搓一个返回值模板一样）
                return SaResult.ok("登陆成功").setData(StpUtil.getTokenValue());
            }
            return SaResult.error("登陆失败");
        });

//        配置HTTP处理请求（在模式三(前端不同域 + 后端不同 Redis)的单点注销功能下用到，如不需要可以注释掉）
//        cfg.sso.setSendHttp(url -> {
//            return OkHttps.sync(url).get().getBody().toString();
//        });
    }


}

```

### 配置全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * 全局异常拦截
     */
    @ExceptionHandler
    public SaResult handlerException(Exception e) {
        e.printStackTrace();
        return SaResult.error(e.getMessage());
    }
}

```

### 测试

完成上面的内容后，你手动写一个简简单单的main，然后开启

接着访问<http://localhost:9000/sso/auth>

注意，这里千万不要开例如`Cla**`之类的代理，不然你绝对访问不成功（MD找了半天BUG）

如果说你前面都是正常配置的话，这里应该是这样的

![image-20220121214051416](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121214051416.png)

点击后，可以看到

![image-20220121223317742](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223317742.png)

注意 如果没有这个token的话，表示登陆失败

### 🎉sso路径下的API列表

如果你仅仅使用 Sa-Token 搭建 SSO-Server 端，而 Client 端使用其它框架的话，那么下面的 API 列表将给你的对接步骤做一份参考。

如果你在 Client 端也用到了 Sa-Token 框架，那么你可以选择跳过本小节，Sa-Token 对 Client 端也提供了相应的封装，

> 单点登陆授权地址

```md
http://{host}:{port}/sso/auth
```

接收参数：

| 参数     | 是否必填 | 说明                                                                                                  |
| -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| redirect | 是       | 登录成功后的重定向地址，一般填写 location.href（从哪来回哪去）                                        |
| mode     | 否       | 授权模式，取值 [simple, ticket]，simple=登录后直接重定向，ticket=带着ticket参数重定向，默认值为ticket |

访问接口后有两种情况：

- 情况一：当前会话在 SSO 认证中心未登录，会进入登录页开始登录。
- 情况二：当前会话在 SSO 认证中心已登录，会被重定向至 `redirect` 地址，并携带 `ticket` 参数。

> 登陆接口

```md
http://{host}:{port}/sso/doLogin
```

接收参数：

| 参数 | 是否必填 | 说明   |
| ---- | -------- | ------ |
| name | 是       | 用户名 |
| pwd  | 是       | 密码   |

此接口属于 RestAPI (使用ajax访问)，会进入后端配置的 `setDoLoginHandle` 函数中，另外需要注意： 此接口并非只能携带 name、pwd 参数，因为你可以在 setDoLoginHandle 函数里通过 `SaHolder.getRequest().getParam("xxx")` 来获取其它参数。

> Ticket校验接口

此接口仅配置模式三 `(isHttp=true)` 时打开

```md
http://{host}:{port}/sso/checkTicket
```

接收参数：

| 参数          | 是否必填 | 说明                                                            |
| ------------- | -------- | --------------------------------------------------------------- |
| ticket        | 是       | 在步骤 5.1 中授权重定向时的 ticket 参数                         |
| ssoLogoutCall | 否       | 单点注销时的回调通知地址，只在SSO模式三单点注销时需要携带此参数 |

返回值场景：

- 返回空，代表校验失败。
- 返回具体的 loginId，例如10001，代表校验成功，值为此 ticket 码代表的用户id。

> 单点注销接口

```md
http://{host}:{port}/sso/logout 
```

接受参数：

| 参数      | 是否必填 | 说明                   |
| --------- | -------- | ---------------------- |
| loginId   | 否       | 要注销的账号id         |
| secretkey | 否       | 接口通信秘钥           |
| back      | 否       | 注销成功后的重定向地址 |

此接口有两种调用方式

1. 在 Client 的前端页面引导用户直接跳转，并带有 back 参数

   - 例如：`http://{host}:{port}/sso/logout?back=xxx`，代表用户注销成功后返回back地址

2. 在 Client 的后端通过 http 工具来调用

   - 例如：`http://{host}:{port}/sso/logout?loginId={value}&secretkey={value}`

   - 代表注销 账号=loginId 的账号，返回json数据结果，形如：

     - ```json
       {
           "code": 200,    // 200表示请求成功，非200标识请求失败
           "msg": "单点注销成功",
           "data": null
       }
       ```

SSO 认证中心只有这四个接口，接下来让我一起来看一下 Client 端的对接流程

## 前端同域 + 后端同 Redis

### 思路

首先我们分析一下多个系统之间，为什么无法同步登录状态？

1. 前端的 `Token` 无法在多个系统下共享。
2. 后端的 `Session` 无法在多个系统间共享。

所以单点登录第一招，就是对症下药：

1. 使用 `共享Cookie` 来解决 Token 共享问题。
2. 使用 `Redis` 来解决 Session 共享问题。

所谓共享Cookie，就是主域名Cookie在二级域名下的共享，举个例子：

- 写在父域名`stp.com`下的Cookie，在`s1.stp.com`、`s2.stp.com`等子域名都是可以共享访问的。

而共享Redis，并不需要我们把所有项目的数据都放在同一个Redis中，Sa-Token提供了 **[权限缓存与业务缓存分离]** 的解决方案，详情戳：[Alone独立Redis插件](https://sa-token.dev33.cn/doc/index.html#/plugin/alone-redis)

这个插件使用还是比较简单的， 装即用

### 准备工作

首先修改hosts文件`(C:\windows\system32\drivers\etc\hosts)`，添加以下IP映射，方便我们进行测试：

```md
127.0.0.1 sso.stp.com
127.0.0.1 s1.stp.com
127.0.0.1 s2.stp.com
127.0.0.1 s3.stp.com
```

PS:这里建议使用[SwitchHosts](https://github.com/oldj/SwitchHosts/releases)来进行管理（PS：安装后右键图标，设置下一管理员身份运行）

### 指定Cookie的作用域

在`sso.stp.com`访问服务器，其Cookie也只能写入到`sso.stp.com`下，为了将Cookie写入到其父级域名`stp.com`下，我们需要更改 SSO-Server 端的 yml 配置：

```yaml
sa-token:
    cookie:
        # 配置Cookie作用域  会彪黄，不影响
        domain: stp.com
```

这个配置原本是被注释掉的，现在将其打开。另外我们格外需要注意： 在SSO模式一测试完毕之后，一定要将这个配置再次注释掉，因为模式一与模式二三使用不同的授权流程，这行配置会影响到我们模式二和模式三的正常运行。

### 搭建Client项目

创建个：` sa-token-demo-sso1-client`项目，依赖如下

#### 依赖准备

```xml
<!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>${sa-token-version}</version>
</dependency>

<!-- Sa-Token 整合redis (使用jackson序列化方式) -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-dao-redis-jackson</artifactId>
    <version>${sa-token-version}</version>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>

<!-- Sa-Token插件：权限缓存与业务缓存分离 -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-alone-redis</artifactId>
    <version>${sa-token-version}</version>
</dependency>

```

#### Controller控制器

```java
@RestController
public class SsoClientController {

    @RequestMapping("/*")
    public String index() {
        String authUrl = SaManager.getConfig().getSso().getAuthUrl();
        String solUrl = SaManager.getConfig().getSso().getSloUrl();
        String str = "<h2>Sa-Token SSO-Client 应用端</h2>" +
                "<p>当前会话是否登录：" + StpUtil.isLogin() + "</p>" +
                "<p><a href=\"javascript:location.href='" + authUrl + "?mode=simple&redirect=' + encodeURIComponent(location.href);\">登录</a> " +
                "<a href=\"javascript:location.href='" + solUrl + "?back=' + encodeURIComponent(location.href);\">注销</a> </p>";
        return str;
    }

    /**
     * 全局异常拦截
     */
    @ExceptionHandler
    public SaResult handlerException(Exception e) {
        e.printStackTrace();
        return SaResult.error(e.getMessage());
    }

}
```

#### application.yml配置

这里嫌麻烦的话…可以用Nacos的配置中心来一步到位…

如果说你的服务端配置好了独立的[Redis插件](https://sa-token.dev33.cn/doc/index.html#/plugin/alone-redis)的话，这里也要对应的配置下，我这里就不演示了

```yaml
# 端口
server:
  port: 9001

# sa-token配置
sa-token:
  # SSO-相关配置
  sso:
    # SSO-Server端-单点登录授权地址
    auth-url: http://sso.stp.com:9000/sso/auth
    # SSO-Server端-单点注销地址
    slo-url: http://sso.stp.com:9000/sso/logout

    

spring:
  # Redis配置 （SSO模式一和模式二使用Redis来同步会话）
  redis:
    # Redis数据库索引（默认为0）
    database: 1
    # Redis服务器地址
    host: myserver
    # Redis服务器连接端口
    port: 13355
    # Redis服务器连接密码（默认为空）
    password: amayakite
    # 连接超时时间
    timeout: 10s
    lettuce:
      pool:
        # 连接池最大连接数
        max-active: 200
        # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms
        # 连接池中的最大空闲连接
        max-idle: 10
        # 连接池中的最小空闲连接
        min-idle: 0

```

#### 启动类

```java
/**
 * SSO模式一，Client端 Demo 
 */
@SpringBootApplication
public class SaSsoClientApplication {
    public static void main(String[] args) {
        SpringApplication.run(SaSsoClientApplication.class, args);
        System.out.println("\nSa-Token SSO模式一 Client端启动成功");
    }
}
```

### 访问测试

启动项目，依次访问三个应用端：

- <http://s1.stp.com:9001/>
- <http://s2.stp.com:9002/>
- <http://s3.stp.com:9003/>

你直接访问，是这个内容

![image-20220121223234108](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223234108.png)

点击登录后，会跳转到

![image-20220121223249009](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223249009.png)

登录

![image-20220121223259316](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223259316.png)



然后返回

![image-20220121223342782](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223342782.png)

能发现登录成功了，并且你访问其他两个也会发现登陆成功

![image-20220121223410580](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223410580.png)

好了，模式1就到这里，是不是非常简单….



## 🎉前端不同域 + 后端同 Redis

如果我们的多个系统：部署在不同的域名之下，但是后端可以连接同一个Redis，那么便可以使用 **`[URL重定向传播会话]`** 的方式做到单点登录。

### 思路

首先我们再次复习一下，多个系统之间为什么无法同步登录状态？

1. 前端的`Token`无法在多个系统下共享。
2. 后端的`Session`无法在多个系统间共享。

关于第二点，使用 [Alone独立Redis插件](https://sa-token.dev33.cn/doc/index.html#/plugin/alone-redis) 做到权限缓存直连 SSO-Redis 数据中心，或者直接配置通用Redis，反正横竖都解决了，这里就不多赘述

> 而第一点，才是我们解决问题的关键所在，在跨域模式下，意味着 "共享Cookie方案" 的失效，我们必须采用一种新的方案来传递Token。

1. 用户在 子系统 点击 `[登录]` 按钮。
2. 用户跳转到子系统登录接口 `/sso/login`，并携带 `back参数` 记录初始页面URL。
   - 形如：`http://{sso-client}/sso/login?back=xxx`
3. 子系统检测到此用户尚未登录，再次将其重定向至SSO认证中心，并携带`redirect参数`记录子系统的登录页URL。
   - 形如：`http://{sso-server}/sso/auth?redirect=xxx?back=xxx`
4. 用户进入了 SSO认证中心 的登录页面，开始登录。
   - 形如：`http://{sso-client}/sso/login?back=xxx&ticket=xxxxxxxxx`
5. 用户输入账号密码 并 登录成功，SSO认证中心再次将用户重定向至子系统的登录接口`/sso/login`，并携带`ticket码`参数。
6. 子系统根据 `ticket码` 从 `SSO-Redis` 中获取账号id，并在子系统登录此账号会话。
7. 子系统将用户再次重定向至最初始的 `back` 页面。

整个过程，除了第四步用户在SSO认证中心登录时会被打断，其余过程均是自动化的，当用户在另一个子系统再次点击`[登录]`按钮，由于此用户在SSO认证中心已有会话存在， 所以第四步也将自动化，也就是单点登录的最终目的 —— **一次登录，处处通行**。

### 准备工作-修改Hosts

该host，方便测试

```md
127.0.0.1 sa-sso-server.com
127.0.0.1 sa-sso-client1.com
127.0.0.1 sa-sso-client2.com
127.0.0.1 sa-sso-client3.com
```

### 搭建Client

#### 去除SSO-Server中的cookie作用域配置

在SSO模式一章节中我们打开了配置：

```yaml
sa-token: 
# 下面的要注释掉
    #cookie:
        # 配置Cookie作用域
        #domain: stp.com
```

此为模式一专属配置，现在我们将其注释掉，并按照注释提示打开其他相应的注释

Client的依赖

```xml
<!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.28.0</version>
</dependency>

<!-- Sa-Token 整合redis (使用jackson序列化方式) -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-dao-redis-jackson</artifactId>
    <version>1.28.0</version>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>

<!-- Sa-Token插件：权限缓存与业务缓存分离 可选 -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-alone-redis</artifactId>
    <version>1.28.0</version>
</dependency>

<!-- 视图引擎（在前后端不分离模式下提供视图支持） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

```

#### Controller

同 SSO-Server 一样，Sa-Token 为 SSO-Client 端所需代码也提供了完整的封装，你只需提供一个访问入口，接入 Sa-Token 的方法即可。

```java

/**
 * Sa-Token-SSO Client端 Controller 
 */
@RestController
public class SsoClientController {

    // 首页 
    @RequestMapping("/")
    public String index() {
        String str = "<h2>Sa-Token SSO-Client 应用端</h2>" + 
                    "<p>当前会话是否登录：" + StpUtil.isLogin() + "</p>" + 
                    "<p><a href=\"javascript:location.href='/sso/login?back=' + encodeURIComponent(location.href);\">登录</a> " + 
                    "<a href='/sso/logout?back=self'>注销</a></p>";
        return str;
    }

    /*
     * SSO-Client端：处理所有SSO相关请求 
     
     *         http://{host}:{port}/sso/login         
     -- Client端登录地址，接受参数：back=登录后的跳转地址 
     *         http://{host}:{port}/sso/logout        
     -- Client端单点注销地址（isSlo=true时打开），接受参数：back=注销后的跳转地址 
     *         http://{host}:{port}/sso/logoutCall    
     -- Client端单点注销回调地址（isSlo=true时打开），此接口为框架回调，开发者无需关心
     */
    @RequestMapping("/sso/*")
    public Object ssoRequest() {
        return SaSsoHandle.clientRequest();
    }
}
```

#### 配置SSO认证中心地址（配置文件）

```yaml
# 端口
server:
    port: 9001

# sa-token配置 
sa-token:
  # SSO-相关配置
  sso:
    # SSO-Server端 统一认证地址 
    auth-url: http://sa-sso-server.com:9000/sso/auth
    # 打开单点注销功能 
    is-slo: true

    # 配置Sa-Token单独使用的Redis连接 （此处需要和SSO-Server端连接同一个Redis）
    # 如果你那啥装了alone的话
    alone-redis: 
        # Redis数据库索引 (默认为0)
        database: 1
        # Redis服务器地址
        host: 127.0.0.1
        # Redis服务器连接端口
        port: 6379
        # Redis服务器连接密码（默认为空）
        password: 

# 如果没有装的话
spring:
  # Redis配置 （SSO模式一和模式二使用Redis来同步会话）
  redis:
    # Redis数据库索引（默认为0）
    database: 1
    # Redis服务器地址
    host: myserver
    # Redis服务器连接端口
    port: 13355
    # Redis服务器连接密码（默认为空）
    password: amayakite
    # 连接超时时间
    timeout: 10s
    lettuce:
      pool:
        # 连接池最大连接数
        max-active: 200
        # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms
        # 连接池中的最大空闲连接
        max-idle: 10
        # 连接池中的最小空闲连接
        min-idle: 0


```

### 测试访问

启动类照常写即可

依次启动 `SSO-Server` 与 `SSO-Client`（Client启动三个 9001 9002 9003）

然后从浏览器访问：<http://sa-sso-client1.com:9001/>

第一次访问的话 百分之一千是false

![image-20220121230119402](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230119402.png)

然后你走一遍登陆流程

变成true了

![image-20220121230137950](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230137950.png)

接着你访问下同域名下的9002<http://sa-sso-client1.com:9002/>

![image-20220121230153955](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230153955.png)

在访问下不同域名下的9003

![image-20220121230303156](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230303156.png)

你会发现是false但是，当点击登录按钮之后

![image-20220121230319911](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230319911.png)

立刻变成true了（就是点了下按钮）

> 可以看出，除了在`Client1`端我们需要手动登录一次之外，在`Client2端`和`Client3端`都是可以无需再次认证，直接登录成功的。
>
> 你可以在控制台中看到请求过程
>
> ![image-20220121230429840](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230429840.png)

以上流程解决了跨域模式下的单点登录，但是后端仍然采用了共享Redis来同步会话，如果我们的架构设计中Client端与Server端无法共享Redis，又该怎么完成单点登录？

## 🎉🎉后端不同 Redis（Client端没有Redis）

如果既无法做到前端同域，也无法做到后端同Redis，那么可以使用模式三完成单点登录

> 阅读本篇之前请务必先熟读SSO模式二！因为模式三仅仅属于模式二的一个特殊场景，熟读模式二有助于您快速理解本章内容

### 问题分析

我们先来分析一下，当后端不使用共享 Redis 时，会对架构产生哪些影响：

1. Client 端无法直连 Redis 校验 ticket，取出账号id。
2. Client 端无法与 Server 端共用一套会话，需要自行维护子会话。
3. 由于不是一套会话，所以无法“一次注销，全端下线”，需要额外编写代码完成单点注销。

所以模式三的主要目标：也就是在 模式二的基础上 解决上述 三个难题

### 在Client端更该Ticker校验方式

#### 修改SSO-Server的配置

打开一个，模式二不关

```yaml
sa-token: 
    sso: 
        # 打开模式三（使用Http请求校验ticket）
        is-http: true
        # SSO-Server端 ticket校验地址 
        check-ticket-url: http://sa-sso-server.com:9000/sso/checkTicket

```

最终应该是这样的

注意 这里额外添加了一个秘钥，之后会用到

```yaml {36-41}
# 端口
server:
  port: 9000

# Sa-Token 配置
sa-token:
  # 首先是标准配置
  # token名称 (同时也是cookie名称)
  token-name: satoken
  # token有效期，单位s 默认30天, -1代表永不过期
  timeout: 2592000
  # token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒
  activity-timeout: -1
  # 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)
  is-concurrent: true
  # 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)
  is-share: false
  # token风格
  token-style: uuid
  # 是否输出操作日志
  is-log: false
  # -------------- SSO-模式一相关配置  (非模式一不需要配置) 前端同域 + 后端同 Redis
  # cookie:
  # 配置Cookie作用域  这里会彪黄，不影响，注意，是要在cookie的下后方
  # domain: stp.com

  # ------- SSO-模式二相关配置  前端不同域 + 后端同 Redis
  sso:
    # Ticket有效期 (单位: 秒)，默认五分钟
    ticket-timeout: 300
    # 所有允许的授权回调地址
    allow-url: "*"
    # 是否打开单点注销功能
    is-slo: true

    # ------- SSO-模式三相关配置 前端不同域 + 后端不同 Redis
    #（下面的配置在SSO模式三并且 is-slo=true 时打开）
    # 是否打开模式三
    isHttp: true
    # 接口调用秘钥（用于SSO模式三的单点注销功能）
    secretkey: kQwIOrYvnXmSDkwEiFngrKidMcdrgKor
    # ---- 除了以上配置项，你还需要为 Sa-Token 配置http请求处理器（文档有步骤说明）

spring:
  # Redis配置 （SSO模式一和模式二使用Redis来同步会话）
  redis:
    # Redis数据库索引（默认为0）
    database: 1
    # Redis服务器地址
    host: myserver
    # Redis服务器连接端口
    port: 13355
    # Redis服务器连接密码（默认为空）
    password: amayakite
    # 连接超时时间
    timeout: 10s
    lettuce:
      pool:
        # 连接池最大连接数
        max-active: 200
        # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms
        # 连接池中的最大空闲连接
        max-idle: 10
        # 连接池中的最小空闲连接
        min-idle: 0

```

#### 修改SSO-Server端的Controller

新增一个内容

```java {32-34}
@RestController
public class SsoServiceController {


    @RequestMapping("/sso/*")
    public Object ssoRequest() {
        return SaSsoHandle.serverRequest();
    }


    @Autowired
    private void configSso(SaTokenConfig cfg) {
//        配置：未登录的时候返回的view
        cfg.sso.setNotLoginView(() -> {
            String msg = "当前会话在SSO-Server端尚未登录，请先访问"
                    + "<a href='/sso/doLogin?name=user&pwd=123456' target='_blank'> doLogin登录 </a>"
                    + "进行登录之后，刷新页面开始授权";
            return msg;
        });
//        配置：处理登陆函数
        cfg.sso.setDoLoginHandle((name, pwd) -> {
//           TODO 目前只是模拟登陆，真实登陆的话，要该改成通过数据库来验证
            if ("user".equals(name) && "123456".equals(pwd)) {
//                 注意 这个login非常非常非常重要，一定不能忘了。。
                StpUtil.login(10001);
//                这里返回啥都行（接收Object，这个SaResult相当于我们自己的手动搓一个返回值模板一样）
                return SaResult.ok("登陆成功").setData(StpUtil.getTokenValue());
            }
            return SaResult.error("登陆失败");
        });
        
//        配置HTTP处理请求（在模式三(前端不同域 + 后端不同 Redis)的单点注销功能下用到，如不需要可以注释掉）
        cfg.sso.setSendHttp(url -> {
            return OkHttps.sync(url).get().getBody().toString();
        });
    }
}
```

#### Client端-Controller新增内容

```java {20-28}
@RestController
public class SsoClientController {

    @RequestMapping("/")
    public String index() {
        String str = "<h2>Sa-Token SSO-Client 应用端</h2>" +
                "<p>当前会话是否登录：" + StpUtil.isLogin() + "</p>" +
                "<p><a href=\"javascript:location.href='/sso/login?back=' + encodeURIComponent(location.href);\">登录</a> " +
                "<a href='/sso/logout?back=self'>注销</a></p>";
        return str;
    }


    @RequestMapping("/sso/*")
    public Object ssoRequest() {
        return SaSsoHandle.clientRequest();
    }

    // 配置SSO相关参数
    @Autowired
    private void configSso(SaTokenConfig cfg) {
        // ... 其他代码

        // 配置 Http 请求处理器
        cfg.sso.setSendHttp(url -> {
            return OkHttps.sync(url).get().getBody().toString();
        });
    }


    /**
     * 异常处理
     */
    @ExceptionHandler
    public SaResult handlerException(Exception e) {
        e.printStackTrace();
        return SaResult.error(e.getMessage());
    }

}

```

#### Client端-yaml配置

首先在yml中新增或者变动成如下内容 这里你可以把相关的和Sa-Token的Redis之类依赖和配置的去掉了

```yaml 
sa-token:
  # SSO-相关配置
  sso:
    # SSO-Server端 统一认证地址 
    auth-url: http://sa-sso-server.com:9000/sso/auth
    # 使用Http请求校验ticket 
    is-http: true
    # SSO-Server端 ticket校验地址 
    check-ticket-url: http://sa-sso-server.com:9000/sso/checkTicket
    # 打开单点注销功能 
    is-slo: true
    # 单点注销地址 
    slo-url: http://sa-sso-server.com:9000/sso/logout
     # 接口调用秘钥  这个别忘了配
    secretkey: kQwIOrYvnXmSDkwEiFngrKidMcdrgKor
    # SSO-Server端 查询userinfo地址 这个下面要用到 
    userinfo-url: http://sa-sso-server.com:9000/sso/userinfo
```

#### 新增Controller

注意 确保上面的userinfo配置好了

```java
// 查询我的账号信息 
@RequestMapping("/sso/myinfo")
public Object myinfo() {
    Object userinfo = SaSsoUtil.getUserinfo(StpUtil.getLoginId());
    System.out.println("--------info：" + userinfo);
    return userinfo;
}
```

访问测试：<http://sa-sso-client1.com:9001/sso/myinfo>

![image-20220121233439308](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121233439308.png)

这样表示成功

### 启动并测试

重启项目，访问测试：<http://sa-sso-client1.com:9001/>， 我们主要的测试点在于 `单点注销`，正常登录即可。

![sso-type3-client-index.png](/images/SpringCloud/17-1-Sa-Token单点认证/sso-type3-client-index.png)

点击 **`[注销]`** 按钮，即可单点注销成功。

![sso-type3-slo-index.png](/images/SpringCloud/17-1-Sa-Token单点认证/sso-type3-slo-index.png)

> PS：这里我们为了方便演示，使用的是超链接跳页面的形式，**正式项目中使用 Ajax 调用接口即可做到无刷单点登录退出**

![image-20220121234154695](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121234154695.png)

## 三种配置模式的总结

当我们熟读三种模式的单点登录之后，其实不难发现：所谓单点登录，其本质就是多个系统之间的会话共享。

当我们理解这一点之后，三种模式的工作原理也浮出水面：

- 模式一：采用共享 Cookie 来做到前端 Token 的共享，从而达到后端的 Session 会话共享。
  - 这个没多少人用了
- 模式二：采用 URL 重定向，以 ticket 码为授权中介，做到多个系统间的会话传播。
  - 这个一般来说，如果你的微服务愿意接受全都装上那啥Sa-Token的话就可以
- 模式三：采用 Http 请求主动查询会话，做到 Client 端与 Server 端的会话同步。
  - 当你 微服务的服务端不想装上和Sa-Token配套的Redis的时候用这个

##  🎉配置域名校验

### 目前存在的漏洞

在前面章节的 SSO-Server 示例中，配置项 `sa-token.sso.allow-url=*` 意为配置所有允许的Client端授权地址，不在此配置项中的URL将无法单点登录成功

为了方便测试，上述代码将其配置为`*`，但是，在生产环境中，此配置项绝对不能配置为 * ，否则会有被 Ticket 劫持的风险

假设攻击者根据模仿我们的授权地址，巧妙的构造一个URL

> <http://sa-sso-server.com:9000/sso/auth?redirect=https://www.baidu.com/>

这个时候不知情的用户访问到了这个URL的时候，它将被重定向至百度首页

![image-20220121234818516](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121234818516.png)

可以看到，代表着用户身份的 Ticket 码也显现到了URL之中，借此漏洞，攻击者完全可以构建一个URL将小红的 Ticket 码自动提交到攻击者自己的服务器，伪造小红身份登录网站

### 防范方法

造成此漏洞的直接原因就是SSO-Server认证中心没有对 `redirect地址` 进行任何的限制，防范的方法也很简单，就是对`redirect参数`进行校验，如果其不在指定的URL列表中时，拒绝下放ticket

我们将其配置为一个具体的URL：`allow-url=http://sa-sso-client1.com:9001/sso/login`

```yaml {29}
# server端
# 端口
server:
  port: 9000

# Sa-Token 配置
sa-token:
  # 首先是标准配置
  # token名称 (同时也是cookie名称)
  token-name: satoken
  # token有效期，单位s 默认30天, -1代表永不过期
  timeout: 2592000
  # token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒
  activity-timeout: -1
  # 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)
  is-concurrent: true
  # 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)
  is-share: false
  # token风格
  token-style: uuid
  # 是否输出操作日志
  is-log: false

  # ------- SSO-模式二相关配置  前端不同域 + 后端同 Redis
  sso:
    # Ticket有效期 (单位: 秒)，默认五分钟
    ticket-timeout: 300
    # 所有允许的授权回调地址
    allow-url: "http://sa-sso-client1.com:9001"
    # 是否打开单点注销功能
    is-slo: true

    # ------- SSO-模式三相关配置 前端不同域 + 后端不同 Redis
    #（下面的配置在SSO模式三并且 is-slo=true 时打开）
    # 是否打开模式三
    isHttp: true
    # 接口调用秘钥（用于SSO模式三的单点注销功能）
    secretkey: kQwIOrYvnXmSDkwEiFngrKidMcdrgKor
    # ---- 除了以上配置项，你还需要为 Sa-Token 配置http请求处理器（文档有步骤说明）

spring:
  # Redis配置 （SSO模式一和模式二使用Redis来同步会话）
  redis:
    # Redis数据库索引（默认为0）
    database: 1
    # Redis服务器地址
    host: myserver
    # Redis服务器连接端口
    port: 13355
    # Redis服务器连接密码（默认为空）
    password: amayakite
    # 连接超时时间
    timeout: 10s
    lettuce:
      pool:
        # 连接池最大连接数
        max-active: 200
        # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms
        # 连接池中的最大空闲连接
        max-idle: 10
        # 连接池中的最小空闲连接
        min-idle: 0

```

再次访问上述连接：

<http://sa-sso-server.com:9000/sso/auth?redirect=https://www.baidu.com/>

可以看到如下内容

![image-20220121235128539](/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121235128539.png)

域名没有通过校验，拒绝授权

### 🎉配置安全性参考表

| 配置方式       | 举例                                       | 安全性 | 建议                     |
| -------------- | ------------------------------------------ | ------ | ------------------------ |
| 配置为*        | `*`                                        | 低     | **禁止在生产环境下使用** |
| 配置到域名     | `http://sa-sso-client1.com/*`              | 中     | 不建议在生产环境下使用   |
| 配置到详细地址 | `http://sa-sso-client1.com:9001/sso/login` | 高     | 可以在生产环境下使用     |

> 为什么不直接回传-token，而是先回传-ticket，再用-ticket-去查询对应的账号id？
>
> Token 作为长时间有效的会话凭证，在任何时候都不应该直接暴露在 URL 之中（虽然 Token 直接的暴露本身不会造成安全漏洞，但会为很多漏洞提供可乘之机）
>
> 为了不让系统安全处于亚健康状态，Sa-Token-SSO 选择先回传 Ticket，再由 Ticket 获取账号id，且 Ticket 一次性用完即废，提高安全性。

## 定制化登陆界面

### 何时引导用户去登陆

#### 前端按钮跳转

前端页面准备一个**`[登录]`**按钮，当用户点击按钮时，跳转到登录接口

```html
<a href="javascript:location.href='/sso/login?back=' + encodeURIComponent(location.href);">登录</a>

```

#### 后端拦截重定向

在后端注册全局过滤器（或拦截器、或全局异常处理），拦截需要登录后才能访问的页面资源，将未登录的访问重定向至登录接口

```java
/**
 * Sa-Token 配置类 
 */
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    /** 注册 [Sa-Token全局过滤器] */
    @Bean
    public SaServletFilter getSaServletFilter() {
        return new SaServletFilter()
                .addInclude("/**")
                .addExclude("/sso/*", "/favicon.ico")
                .setAuth(obj -> {
                    if(StpUtil.isLogin() == false) {
                        String back = SaFoxUtil.joinParam(SaHolder.getRequest().getUrl(), SpringMVCUtil.getRequest().getQueryString());
                        SaHolder.getResponse().redirect("/sso/login?back=" + SaFoxUtil.encodeUrl(back));
                        SaRouter.back();
                    }
                })
                ;
    }
}

```

#### 🎉推荐：后端拦截-前端跳转

首先，后端仍需要提供拦截，但是不直接引导用户重定向，而是返回未登录的提示信息

```java
/**
 * Sa-Token 配置类 
 */
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    /** 注册 [Sa-Token全局过滤器] */
    @Bean
    public SaServletFilter getSaServletFilter() {
        return new SaServletFilter()
                .addInclude("/**")
                .addExclude("/sso/*", "/favicon.ico")
                .setAuth(obj -> {
                    if(StpUtil.isLogin() == false) {
                        // 与前端约定好，code=401时代表会话未登录 
                        SaRouter.back(SaResult.ok().setCode(401));
                    }
                })
                ;
    }
}

```

前端接受到返回结果 `code=401` 时，开始跳转至登录接口

```javascript
if(res.code == 401) {
    location.href = '/sso/login?back=' + encodeURIComponent(location.href);
}
```

这种方案比较适合以 Ajax 访问的 RestAPI 接口重定向

### 如何自定义登陆API的地址

#### 如果只是想在-setdologinhandle-函数里获取除-name、pwd-以外的参数

```java
// 在任意代码处获取前端提交的参数 
String xxx = SaHolder.getRequest().getParam("xxx");

```

#### 想完全自定义一个接口来接受前端登录请求

```java
// 直接定义一个拦截路由为 `/sso/doLogin` 的接口即可 
@RequestMapping("/sso/doLogin")
public SaResult ss(String name, String pwd) {
    System.out.println("------ 请求进入了自定义的API接口 ---------- ");
    if("sa".equals(name) && "123456".equals(pwd)) {
        StpUtil.login(10001);
        return SaResult.ok("登录成功！");
    }
    return SaResult.error("登录失败！");
}

```

## 🎉自定义API的路由

### 修改全局变量的方式

在之前的章节中，我们演示了如何搭建一个SSO认证中心

```java
/**
 * Sa-Token-SSO Server端 Controller 
 */
@RestController
public class SsoServerController {

    // SSO-Server端：处理所有SSO相关请求 
    @RequestMapping("/sso/*")
    public Object ssoRequest() {
        return SaSsoHandle.serverRequest();
    }

    // ... 其它代码

}

```

这种写法集成简单但却不够灵活。例如认证中心地址只能是：`http://{host}:{port}/sso/auth`，如果我们想要自定义其API地址，应该怎么做呢？

我们可以打开SSO模块相关源码，有关 API 的设计都定义在：[SaSsoConsts.java](https://gitee.com/dromara/sa-token/blob/master/sa-token-core/src/main/java/cn/dev33/satoken/sso/SaSsoConsts.java) 中，这些值从架构设计上来讲属于常量却并未使用 `final` 修饰，目的就是为了方便我们对其二次修改。

例如，我们可以在 Main 方法启动类或者 SSO 配置方法中修改变量值：

```java
// 配置SSO相关参数 
@Autowired
private void configSso(SaTokenConfig cfg) {
    // 自定义API地址
    SaSsoConsts.Api.ssoAuth = "/sso/auth2";
    // ... 

    // SSO 相关配置
    cfg.sso.setXxx ... ;
}

```

启动项目，统一认证地址就被我们修改成了：`http://{host}:{port}/sso/auth2`

### 拆分路由入口的方式

根据上述路由入口：`@RequestMapping("/sso/*")`，我们给它起一个合适的名字 —— 聚合式路由。

与之对应的，我们可以将其修改为拆分式路由：

```java
/**
 * Sa-Token-SSO Server端 Controller 
 */
@RestController
public class SsoServerController {

    // SSO-Server：统一认证地址 
    @RequestMapping("/sso/auth")
    public Object ssoAuth() {
        return SaSsoHandle.ssoAuth();
    }

    // SSO-Server：RestAPI 登录接口 
    @RequestMapping("/sso/doLogin")
    public Object ssoDoLogin() {
        return SaSsoHandle.ssoDoLogin();
    }

    // SSO-Server：校验ticket 获取账号id 
    @RequestMapping("/sso/checkTicket")
    public Object ssoCheckTicket() {
        return SaSsoHandle.ssoCheckTicket();
    }

    // SSO-Server：单点注销 
    @RequestMapping("/sso/logout")
    public Object ssoLogout() {
        return SaSsoHandle.ssoServerLogout();
    }

    // ... 其它方法 

}

```

拆分式路由 与 聚合式路由 在功能上完全等价，且提供了更为细致的路由管控。

## 🎉前后端分离的整合方案

之前的案例中，我们使用的都是前后端不分离：服务器渲染了html页面

这里以改造案例2(Client端)为例

### 新增H5Controller接口

```java
/**
 * 前后台分离架构下集成SSO所需的代码 
 */
@RestController
public class H5Controller {

    // 当前是否登录 
    @RequestMapping("/isLogin")
    public Object isLogin() {
        return SaResult.data(StpUtil.isLogin());
    }

    // 返回SSO认证中心登录地址 
    @RequestMapping("/getSsoAuthUrl")
    public SaResult getSsoAuthUrl(String clientLoginUrl) {
        String serverAuthUrl = SaSsoUtil.buildServerAuthUrl(clientLoginUrl, "");
        return SaResult.data(serverAuthUrl);
    }

    // 根据ticket进行登录 
    @RequestMapping("/doLoginByTicket")
    public SaResult doLoginByTicket(String ticket) {
        Object loginId = SaSsoHandle.checkTicket(ticket, "/doLoginByTicket");
        if(loginId != null) {
            StpUtil.login(loginId);
            return SaResult.data(StpUtil.getTokenValue());
        }
        return SaResult.error("无效ticket：" + ticket); 
    }

    // 全局异常拦截 
    @ExceptionHandler
    public SaResult handlerException(Exception e) {
        e.printStackTrace(); 
        return SaResult.error(e.getMessage());
    }

}

```

### 增加跨域过滤器

```java
package com.pj.h5;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * 跨域过滤器
 * @author kong 
 */
@Component
@Order(-200)
public class CorsFilter implements Filter {

	static final String OPTIONS = "OPTIONS";

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		
		// 允许指定域访问跨域资源
		response.setHeader("Access-Control-Allow-Origin", "*");
		// 允许所有请求方式
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		// 有效时间
		response.setHeader("Access-Control-Max-Age", "3600");
		// 允许的header参数
		response.setHeader("Access-Control-Allow-Headers", "x-requested-with,satoken");

		// 如果是预检请求，直接返回
		if (OPTIONS.equals(request.getMethod())) {
			System.out.println("=======================浏览器发来了OPTIONS预检请求==========");
			response.getWriter().print("");
			return;
		}

		// System.out.println("*********************************过滤器被使用**************************");
		chain.doFilter(req, res);
	}

	@Override
	public void init(FilterConfig filterConfig) {
	}

	@Override
	public void destroy() {
	}

}

```

### 改造Server端

疑问：上述代码都是针对 Client 端进行拆分，如果我想在 SSO-Server 端也进行前后台分离改造，应该怎么做？

> 答：解决思路都是大同小异的，与Client一样，我们需要把原本在 “后端处理的授权重定向逻辑” 拿到前端来实现

跨域和上面你的一样，改一改Controller

```java
@RestController
public class H5Controller {
	
	/**
	 * 获取 redirectUrl 
	 */
	@RequestMapping("/getRedirectUrl")
	private Object getRedirectUrl(String redirect, String mode) {
		// 未登录情况下，返回 code=401 
		if(StpUtil.isLogin() == false) {
			return SaResult.code(401);
		}
		// 已登录情况下，构建 redirectUrl 
		if(SaSsoConsts.MODE_SIMPLE.equals(mode)) {
			// 模式一 
			SaSsoUtil.checkRedirectUrl(SaFoxUtil.decoderUrl(redirect));
			return SaResult.data(redirect);
		} else {
			// 模式二或模式三 
			String redirectUrl = SaSsoUtil.buildRedirectUrl(StpUtil.getLoginId(), redirect);
			return SaResult.data(redirectUrl);
		}
	}

	// 全局异常拦截 
	@ExceptionHandler
	public SaResult handlerException(Exception e) {
		e.printStackTrace(); 
		return SaResult.error(e.getMessage());
	}
	
}
```

然后更该下client端的配置即可

```yaml
sa-token:
    sso: 
        # SSO-Server端 统一认证地址 
        auth-url: http://127.0.0.1:8848/你的最终配置
```

## 相关的配置表

### Server端

| 参数名称      | 类型    | 默认值 | 说明                                                                                                                                                                       |
| ------------- | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticketTimeout | long    | 300    | ticket 有效期 （单位: 秒）                                                                                                                                                 |
| allowUrl      | String  | *      | 所有允许的授权回调地址，多个用逗号隔开（不在此列表中的URL将禁止下放ticket），参考：[SSO整合：配置域名校验](https://sa-token.dev33.cn/doc/index.html#/sso/sso-check-domain) |
| isSlo         | Boolean | false  | 是否打开单点注销功能                                                                                                                                                       |
| isHttp        | Boolean | false  | 是否打开模式三（此值为 true 时将使用 http 请求：校验ticket值、单点注销、获取userinfo）                                                                                     |
| secretkey     | String  | null   | 调用秘钥 （用于SSO模式三单点注销的接口通信身份校验）                                                                                                                       |

### Client 端

| 参数名称       | 类型    | 默认值 | 说明                                                                                   |
| -------------- | ------- | ------ | -------------------------------------------------------------------------------------- |
| authUrl        | String  | null   | 配置 Server 端单点登录授权地址                                                         |
| isSlo          | Boolean | false  | 是否打开单点注销功能                                                                   |
| isHttp         | Boolean | false  | 是否打开模式三（此值为 true 时将使用 http 请求：校验ticket值、单点注销、获取userinfo） |
| checkTicketUrl | String  | null   | 配置 Server 端的 ticket 校验地址                                                       |
| userinfoUrl    | String  | null   | 配置 Server 端查询 userinfo 地址                                                       |
| sloUrl         | String  | null   | 配置 Server 端单点注销地址                                                             |
| ssoLogoutCall  | String  | null   | 配置当前 Client 端的单点注销回调URL （为空时自动获取）                                 |
| secretkey      | String  | null   | 接口调用秘钥 （用于SSO模式三单点注销的接口通信身份校验）                               |

### 配置示例

```yaml
# Sa-Token 配置
sa-token: 
    # SSO-相关配置
    sso: 
        # SSO-Server端 单点登录授权地址 
        auth-url: http://sa-sso-server.com:9000/sso/auth

```





