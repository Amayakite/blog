---
title: 17-Sa-Token
date: 2022-1-21 15:13:30
category: 分布式-微服务
tag:
- Sa-Token
- Security
---

## 概述

因为SpringSecurity的OAuth2的教程并不是那么容易，并且比较旧…所以我选择了国人开发的这款鉴权系统

<https://sa-token.dev33.cn/doc/index.html#/>

看官方文档应该比看我的文章更容易懂一些..建议看官方的

这是一个学习成本超级低的框架，看一眼就非常喜欢..

## 简单的单体应用

这里的全都非常重要，最好是看官方文档或者把这里的所有内容都看完

> 下面内容中，根据标题确定重要程度，✨表示重要，✨✨表示非常重要，✨✨✨表示特别重要

### ✨依赖准备和配置文件

Spring Boot的版本理论应该无所谓，我这里2.6.2和2.4.1都可以成功

```xml
<dependencies>

    <!-- https://mvnrepository.com/artifact/cn.dev33/sa-token-spring-boot-starter -->
    <dependency>
        <groupId>cn.dev33</groupId>
        <artifactId>sa-token-spring-boot-starter</artifactId>
        <version>1.28.0</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>


    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

这里开始全部都是按照官方文档来进行操作的

```yaml
server:
    # 端口
    port: 8081

# Sa-Token配置
sa-token: 
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
```

### 启动类和Controller

```java
@Slf4j
@SpringBootApplication
public class SpringSecurityApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityApplication.class, args);
        log.info("启动成功，Sa-Token的配置如下 {}", SaManager.getConfig());
    }

}
```

Controller

这玩意爽就爽在，一个Stp和一个SaResult搞定所有内容…

​	

```java
@RestController
@RequestMapping("/acc")
public class LoginController {

    // 测试登录  ---- http://localhost:8081/acc/doLogin?name=zhang&pwd=123456
    @RequestMapping("/doLogin")
    public SaResult doLogin(String name, String pwd) {
        // 此处仅作模拟示例，真实项目需要从数据库中查询数据进行比对
        if ("zhang".equals(name) && "123456".equals(pwd)) {
            StpUtil.login(10001);
            return SaResult.ok("登录成功");
        }
        return SaResult.error("登录失败");
    }

    // 查询登录状态  ---- http://localhost:8081/acc/isLogin
    @RequestMapping("/isLogin")
    public SaResult isLogin() {
        return SaResult.ok("是否登录：" + StpUtil.isLogin());
    }

    // 查询 Token 信息  ---- http://localhost:8081/acc/tokenInfo
    @RequestMapping("/tokenInfo")
    public SaResult tokenInfo() {
        return SaResult.data(StpUtil.getTokenInfo());
    }

    // 测试注销  ---- http://localhost:8081/acc/logout
    @RequestMapping("/logout")
    public SaResult logout() {
        StpUtil.logout();
        return SaResult.ok();
    }
}

```

### ✨用户的权限的授予和获取

官方文档<https://sa-token.dev33.cn/doc/index.html#/use/jur-auth>

非常简单，实际生产中，我们的用户是拥有指定权限的，当然对应的权限也对应着相对的权限列表

所以根据官方文档，我们只需要创建一个类即可完成用户的权限查询及获取

注意：下方方法返回值是固定的，还并没有引入数据库

```java
@Component
@Slf4j
public class StpInterfaceImpl implements StpInterface {
    /**
     * 返回一个账号的所有权限码集合 就相当于是数据库内的权限的单独信息那样
     *
     * @param loginId
     * @param loginType
     * @return
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        log.info("getPermissionList====>loginId:{}\tloginType:{}", loginId, loginType);
        ArrayList<String> list = new ArrayList<>();
        list.add("101");
        list.add("user-add");
        list.add("user-delete");
        list.add("user-update");
        list.add("user-get");
        list.add("article-get");
        return null;
    }

    /**
     * 返回一个角色拥有的权限标识集合（就相当于是数据库中的角色列表那样）
     *
     * @param loginId
     * @param loginType
     * @return
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        log.info("getRoleList====>loginId:{}\tloginType:{}", loginId, loginType);
        ArrayList<String> list = new ArrayList<>();
        list.add("admin");
        list.add("super-admin");
        return  list;
    }

}
```

接着来写个Controller测试下

```java
@GetMapping("/testAuth")
public SaResult testAuth() {

    // 判断：当前账号是否含有指定权限, 返回true或false
    //        StpUtil.hasPermission("user-update");
    log.info("判断当前账号是否拥有user-update权限：{}", StpUtil.hasPermission("user-update"));
    
    // 校验：当前账号是否含有指定权限, 如果验证未通过，则抛出异常: NotPermissionException
    //        StpUtil.checkPermission("user-update");
    
    // 校验：当前账号是否含有指定权限 [指定多个，必须全部验证通过]
    //        StpUtil.checkPermissionAnd("user-update", "user-delete");
    log.info("当前账号是否指定的[user-update和user-delete]这两个权限：{}", StpUtil.hasPermissionAnd("user-update", "user-delete"));
    //  校验：当前账号是否含有指定权限 [指定多个，只要其一验证通过即可]
    //        StpUtil.checkPermissionOr("user-update", "user-delete");
    log.info("当前账号是否指定的[user-update和user-delete]这两个权限的其中一个：{}", StpUtil.hasPermissionOr("user-update", "user-delete"));

    //        ===========也可以通过角色来验证权限==========

    // 判断：当前账号是否拥有指定角色, 返回true或false
    StpUtil.hasRole("super-admin");
    log.info("判断当前账号是否拥有super-admin角色：{}", StpUtil.hasRole("super-admin"));

    // 校验：当前账号是否含有指定角色标识, 如果验证未通过，则抛出异常: NotRoleException
    //        StpUtil.checkRole("super-admin");

    // 校验：当前账号是否含有指定角色标识 [指定多个，必须全部验证通过]
    //        StpUtil.checkRoleAnd("super-admin", "shop-admin");

    // 校验：当前账号是否含有指定角色标识 [指定多个，只要其一验证通过即可]
    //        StpUtil.checkRoleOr("super-admin", "shop-admin");
    return SaResult.data(StpUtil.getRoleList());

}
```

可以看到，这个StpUtil是直接调用了我们刚刚的`StpInterfaceImpl`类，所以直接打印出来了该类中的内容

![image-20220121154717209](/images/Java/SpringCloud/17-Sa-Token/image-20220121154717209.png)

前端中返回的内容

```json
{"code":200,"msg":"ok","data":["admin","super-admin"]}
// 因为我是只返回了角色信息，也可以通过getPermissionList来返回具体的权限信息给前端
```

官方文档中还给出了一个全局异常处理器

> 你可以创建一个全局异常拦截器，统一返回给前端的格式，参考： [码云：GlobalException.java](https://gitee.com/dromara/sa-token/blob/master/sa-token-demo/sa-token-demo-springboot/src/main/java/com/pj/current/GlobalException.java)

还有权限通配符

```java
// 当拥有 user* 权限时
StpUtil.hasPermission("user-add");        // true
StpUtil.hasPermission("user-update");     // true
StpUtil.hasPermission("art-add");         // false

// 当拥有 *-delete 权限时
StpUtil.hasPermission("user-add");        // false
StpUtil.hasPermission("user-delete");     // true
StpUtil.hasPermission("art-delete");      // true

// 当拥有 *.js 权限时
StpUtil.hasPermission("index.js");        // true
StpUtil.hasPermission("index.css");       // false
StpUtil.hasPermission("index.html");      // false

```

我曹，还贴心的给出了Vue的验证….

```html
<button v-if="arr.indexOf('user:delete') > -1">删除按钮</button>
```

### 全局异常处理器

这里给出的是官方放出的

```java
package com.pj.current;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pj.util.AjaxJson;

import cn.dev33.satoken.exception.DisableLoginException;
import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.exception.NotRoleException;

/**
 * 全局异常处理 
 */
@ControllerAdvice
public class GlobalException {

	// 全局异常拦截（拦截项目中的所有异常）
	@ResponseBody
	@ExceptionHandler
	public AjaxJson handlerException(Exception e, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		// 打印堆栈，以供调试
		System.out.println("全局异常---------------");
		e.printStackTrace(); 

		// 不同异常返回不同状态码 
		AjaxJson aj = null;
		if (e instanceof NotLoginException) {	// 如果是未登录异常
			NotLoginException ee = (NotLoginException) e;
			aj = AjaxJson.getNotLogin().setMsg(ee.getMessage());
		} 
		else if(e instanceof NotRoleException) {		// 如果是角色异常
			NotRoleException ee = (NotRoleException) e;
			aj = AjaxJson.getNotJur("无此角色：" + ee.getRole());
		} 
		else if(e instanceof NotPermissionException) {	// 如果是权限异常
			NotPermissionException ee = (NotPermissionException) e;
			aj = AjaxJson.getNotJur("无此权限：" + ee.getCode());
		} 
		else if(e instanceof DisableLoginException) {	// 如果是被封禁异常
			DisableLoginException ee = (DisableLoginException) e;
			aj = AjaxJson.getNotJur("账号被封禁：" + ee.getDisableTime() + "秒后解封");
		} 
		else {	// 普通异常, 输出：500 + 异常信息 
			aj = AjaxJson.getError(e.getMessage());
		}
		
		// 返回给前端
		return aj;
	}
	
}

```

### 注销、下线和账号封禁

这里要说的一点是，我们之前的登陆接口中

```java {5}
@RequestMapping("/doLogin")
public SaResult doLogin(String name, String pwd) {
    // 此处仅作模拟示例，真实项目需要从数据库中查询数据进行比对
    if ("zhang".equals(name) && "123456".equals(pwd)) {
        // 这里的id实际上应该是由数据库内获取的,所以每个用户的都得是唯一且不重复的
        StpUtil.login(10001);
        return SaResult.ok("登录成功");
    }
    return SaResult.error("登录失败");
}
```

> 强制注销

```java
StpUtil.logout(10001);                    // 强制指定账号注销下线 
StpUtil.logout(10001, "PC");              // 强制指定账号指定端注销下线 
StpUtil.logoutByTokenValue("token");      // 强制指定 Token 注销下线 
```

> 踢人下线

```java
StpUtil.kickout(10001);                    // 将指定账号踢下线 
StpUtil.kickout(10001, "PC");              // 将指定账号指定端踢下线
StpUtil.kickoutByTokenValue("token");      // 将指定 Token 踢下线
```

强制注销 和 踢人下线 的区别在于：

- 强制注销等价于对方主动调用了注销方法，再次访问会提示：Token无效。
- 踢人下线不会清除Token信息，而是将其打上特定标记，再次访问会提示：Token已被踢下线。

> 账号封禁
>
> 官方原文：对于违规账号，有时候我们仅仅将其踢下线还是远远不够的，我们还需要对其进行**账号封禁**防止其再次登录

```java
// 封禁指定账号 
// 参数一：账号id
// 参数二：封禁时长，单位：秒  (86400秒=1天，此值为-1时，代表永久封禁)
StpUtil.disable(10001, 86400); 

// 获取指定账号是否已被封禁 (true=已被封禁, false=未被封禁) 
StpUtil.isDisable(10001); 

// 获取指定账号剩余封禁时间，单位：秒
StpUtil.getDisableTime(10001); 

// 解除封禁
StpUtil.untieDisable(10001); 

```

> 注意：
>
> 对于正在登录的账号，对其账号封禁时并不会使其立刻注销
> 如果需要将其封禁后立即掉线，可采取先踢再封禁的策略，例如：

```java
// 先踢下线
StpUtil.kickout(10001); 
// 再封禁账号
StpUtil.disable(10001, 86400); 

```

### ✨注解式鉴权

有注解就方便很多了

首先要注册一个拦截器，也就是在Spring Web中新增一个

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(
            new SaAnnotationInterceptor()
        ).addPathPatterns("/**");
        // 注册注解拦截器，并排除不需要注解鉴权的接口地址 (与登录拦截器无关)
        // 反正标配写法 这样写即可
    }
}

```

然后就能获取如下注解了

- `@SaCheckLogin`: 登录认证 —— 只有登录之后才能进入该方法
- `@SaCheckRole("admin")`: 角色认证 —— 必须具有指定角色标识才能进入该方法
- `@SaCheckPermission("user:add")`: 权限认证 —— 必须具有指定权限才能进入该方法
- `@SaCheckSafe`: 二级认证校验 —— 必须二级认证之后才能进入该方法
- `@SaCheckBasic`: HttpBasic认证 —— 只有通过 Basic 认证后才能进入该方法

上面的注解可以写在类上，也可以写在方法上（仅限Controller标注的）

```java
// 登录认证：只有登录之后才能进入该方法 
@SaCheckLogin                        
@RequestMapping("info")
public String info() {
    return "查询用户信息";
}

// 角色认证：必须具有指定角色才能进入该方法 
@SaCheckRole("super-admin")        
@RequestMapping("add")
public String add() {
    return "用户增加";
}

// 权限认证：必须具有指定权限才能进入该方法 
@SaCheckPermission("user-add")        
@RequestMapping("add")
public String add() {
    return "用户增加";
}

// 二级认证：必须二级认证之后才能进入该方法 
@SaCheckSafe()        
@RequestMapping("add")
public String add() {
    return "用户增加";
}

// Http Basic 认证：只有通过 Basic 认证后才能进入该方法 
@SaCheckBasic(account = "sa:123456")
@RequestMapping("add")
public String add() {
    return "用户增加";
}

```

> `@SaCheckRole`与`@SaCheckPermission`注解可设置校验模式，例如：

```java
// 注解式鉴权：只要具有其中一个权限即可通过校验 
@RequestMapping("atJurOr")
@SaCheckPermission(value = {"user-add", "user-all", "user-delete"}, mode = SaMode.OR)        
public AjaxJson atJurOr() {
    return AjaxJson.getSuccessData("用户信息");
}

```

orRole 字段代表权限认证未通过时的次要选择，两者只要其一认证成功即可通过校验，其有三种写法：

- 写法一：`orRole = "admin"`，代表需要拥有角色 admin 。
- 写法二：`orRole = {"admin", "manager", "staff"}`，代表具有三个角色其一即可。
- 写法三：`orRole = {"admin, manager, staff"}`，代表必须同时具有三个角色。

> 注意，以上方法并不能用于Service层面
>
> 如果一定要用于@Service或者其他的，可以参照官方提供的[AOP注解鉴权](https://sa-token.dev33.cn/doc/index.html#/plugin/aop-at)

### ✨✨路由拦截器鉴权（配置式鉴权）

适用场景：

> 项目中所有接口均需要登录认证，只有'登录接口'本身对外开放

最基本的使用非常简单

```java
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    // 注册拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册Sa-Token的路由拦截器 注意 光注册这个并不能实现注解式鉴权
        registry.addInterceptor(new SaRouteInterceptor())
            .addPathPatterns("/**")
            .excludePathPatterns("/user/doLogin"); 
    }
}

```

> 以上代码，我们注册了一个登录认证拦截器，并且排除了`/user/doLogin`接口用来开放登录（除了`/user/doLogin`以外的所有接口都需要登录才能访问）
> 那么我们如何进行权限认证拦截呢，且往下看

1. 你可以使用函数式编程自定义认证规则，例如：

```java
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册路由拦截器，自定义认证规则 
        registry.addInterceptor(new SaRouteInterceptor((req, res, handler)->{
            // 根据路由划分模块，不同模块不同鉴权 
            SaRouter.match("/user/**", r -> StpUtil.checkPermission("user"));
            SaRouter.match("/admin/**", r -> StpUtil.checkPermission("admin"));
            SaRouter.match("/goods/**", r -> StpUtil.checkPermission("goods"));
            SaRouter.match("/orders/**", r -> StpUtil.checkPermission("orders"));
            SaRouter.match("/notice/**", r -> StpUtil.checkPermission("notice"));
            SaRouter.match("/comment/**", r -> StpUtil.checkPermission("comment"));
        })).addPathPatterns("/**");
    }
}

```

SaRouter.match() 匹配函数有两个参数：

- 参数一：要匹配的path路由。
- 参数二：要执行的校验函数。

在校验函数内不只可以使用 `StpUtil.checkPermission("xxx")` 进行权限校验，你还可以写任意代码，例如：

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        这个是让Controller可以使用注解
        registry.addInterceptor(
                new SaAnnotationInterceptor()
        ).addPathPatterns("/**");


//        注册路由拦截器，自定义认证规则
        registry.addInterceptor(new SaRouteInterceptor((req, res, handler) -> {
            // 登录认证 -- 拦截所有路由，并排除/user/doLogin 用于开放登录
            SaRouter.match("/**", "/user/doLogin", r -> StpUtil.checkLogin());

            // 角色认证 -- 拦截以 admin 开头的路由，必须具备 admin 角色或者 super-admin 角色才可以通过认证
            SaRouter.match("/admin/**", r -> StpUtil.checkRoleOr("admin", "super-admin"));

            // 权限认证 -- 不同模块认证不同权限
            SaRouter.match("/user/**", r -> StpUtil.checkPermission("user"));
            SaRouter.match("/admin/**", r -> StpUtil.checkPermission("admin"));
            SaRouter.match("/goods/**", r -> StpUtil.checkPermission("goods"));
            SaRouter.match("/orders/**", r -> StpUtil.checkPermission("orders"));
            SaRouter.match("/notice/**", r -> StpUtil.checkPermission("notice"));
            SaRouter.match("/comment/**", r -> StpUtil.checkPermission("comment"));

            // 甚至你可以随意的写一个打印语句（这里演示下匿名内部类的写法 可以看到是返回一个void）
            SaRouter.match("/**", new SaParamFunction<SaRouterStaff>() {
                @Override
                public void run(SaRouterStaff r) {
                    System.out.println("----啦啦啦----");
                }
            });

            // 连缀写法
            SaRouter.match("/**").check(r -> System.out.println("----啦啦啦----"));
            
        })).addPathPatterns("/**");
    }
}
```

除了上述示例的 path 路由匹配，还可以根据很多其它特征进行匹配，以下是所有可匹配的特征：

```java
// 基础写法样例：匹配一个path，执行一个校验函数 
SaRouter.match("/user/**").check(r -> StpUtil.checkLogin());

// 根据 path 路由匹配   ——— 支持写多个path，支持写 restful 风格路由 
SaRouter.match("/user/**", "/goods/**", "/art/get/{id}").check( /* 要执行的校验函数 */ );

// 根据 path 路由排除匹配 
SaRouter.match("/**").notMatch("*.html", "*.css", "*.js").check( /* 要执行的校验函数 */ );

// 根据请求类型匹配 
SaRouter.match(SaHttpMethod.GET).check( /* 要执行的校验函数 */ );

// 根据一个 boolean 条件进行匹配 
SaRouter.match( StpUtil.isLogin() ).check( /* 要执行的校验函数 */ );

// 根据一个返回 boolean 结果的lambda表达式匹配 
SaRouter.match( r -> StpUtil.isLogin() ).check( /* 要执行的校验函数 */ );

// 多个条件一起使用 
SaRouter.match(SaHttpMethod.GET).match("/**").check( /* 要执行的校验函数 */ );

// 可以无限连缀下去 
SaRouter
    .match(SaHttpMethod.GET)
    .match("/admin/**")
    .match("/user/**") 
    .notMatch("/**/*.js")
    .notMatch("/**/*.css")
    // ....
    .check( /* 只有上述所有条件都匹配成功，才会执行最后的check校验函数 */ );

```

> 使用 `SaRouter.stop()` 可以提前退出匹配链，例：

```java
registry.addInterceptor(new SaRouteInterceptor((req, res, handler) -> {
    SaRouter.match("/**").check(r -> System.out.println("进入1"));
    SaRouter.match("/**").check(r -> System.out.println("进入2")).stop();
    SaRouter.match("/**").check(r -> System.out.println("进入3"));
})).addPathPatterns("/**");
```

如上示例，代码运行至第2条匹配链时，会在stop函数处提前退出整个匹配函数，从而忽略掉剩余的所有match匹配

> 除了`stop()`函数，`SaRouter`还提供了 `back()` 函数，用于：停止匹配，结束执行，直接向前端返回结果

```java
// 执行back函数后将停止匹配，也不会进入Controller，而是直接将 back参数 作为返回值输出到前端
SaRouter.match("/user/back").back("参数");
```

stop() 与 back() 函数的区别在于：

- `SaRouter.stop()` 会停止匹配，进入Controller。
- `SaRouter.back()` 会停止匹配，直接返回结果到前端。

> 而且还有作用域：
>
> free() 的作用是：打开一个独立的作用域，使内部的 stop() 不再一次性跳出整个 Auth 函数，而是仅仅跳出当前 free 作用域。

```java
// 进入 free 独立作用域 
SaRouter.match("/**").free(r -> {
    SaRouter.match("/a/**").check(/* --- */);
    SaRouter.match("/a/**").check(/* --- */).stop();
    SaRouter.match("/a/**").check(/* --- */);
});
// 执行 stop() 函数跳出 free 后继续执行下面的 match 匹配 
SaRouter.match("/**").check(/* --- */);

```

### ✨User-Session

> 提起Session，你脑海中最先浮现的可能就是 JSP 中的 HttpSession，它的工作原理可以大致总结为：
>
> 客户端每次与服务器第一次握手时，会被强制分配一个 `[唯一id]` 作为身份标识，注入到 Cookie 之中， 之后每次发起请求时，客户端都要将它提交到后台，服务器根据 `[唯一id]` 找到每个请求专属的Session对象，维持会话

这种机制简单粗暴，却有N多明显的缺点：

1. 同一账号分别在PC、APP登录，会被识别为两个不相干的会话
2. 一个设备难以同时登录两个账号
3. 每次一个新的客户端访问服务器时，都会产生一个新的Session对象，即使这个客户端只访问了一次页面
4. 在不支持Cookie的客户端下，这种机制会失效

**Sa-Token Session**可以理解为 HttpSession 的**升级版**：

1. Sa-Token只在调用`StpUtil.login(id)`登录会话时才会产生Session，不会为每个陌生会话都产生Session，节省性能
2. 在登录时产生的Session，是分配给账号id的，而不是分配给指定客户端的，也就是说在PC、APP上登录的同一账号所得到的Session也是同一个，所以两端可以非常轻松的同步数据
3. Sa-Token支持Cookie、Header、body三个途径提交Token，而不是仅限于Cookie
4. 由于不强依赖Cookie，所以只要将Token存储到不同的地方，便可以做到一个客户端同时登录多个账号

这种为账号id分配的Session，它有一个好听的名字：`User-Session`，可以通过如下方式操作它：

```java
// 获取当前会话的 User-Session 
SaSession session = StpUtil.getSession();

// 从 User-Session 中读取、写入数据 
session.get("name");
session.set("name", "张三");

```

它对应的API如下

```java
// 获取当前账号id的Session (必须是登录后才能调用)
StpUtil.getSession();

// 获取当前账号id的Session, 并决定在Session尚未创建时，是否新建并返回
StpUtil.getSession(true);

// 获取账号id为10001的Session
StpUtil.getSessionByLoginId(10001);

// 获取账号id为10001的Session, 并决定在Session尚未创建时，是否新建并返回
StpUtil.getSessionByLoginId(10001, true);

// 获取SessionId为xxxx-xxxx的Session, 在Session尚未创建时, 返回null 
StpUtil.getSessionBySessionId("xxxx-xxxx");

```



### ✨Token-Session

随着业务推进，我们还可能会遇到一些需要数据隔离的场景：

> 指定客户端超过两小时无操作就自动下线，如果两小时内有操作，就再续期两小时，直到新的两小时无操作

那么这种请求访问记录应该存储在哪里呢？放在 User-Session 里吗？

可别忘了，PC端和APP端可是共享的同一个 User-Session ，如果把数据放在这里， 那就意味着，即使用户在PC端一直无操作，只要手机上用户还在不间断的操作，那PC端也不会过期！

解决这个问题的关键在于，虽然两个设备登录的是同一账号，但是两个它们得到的token是不一样的， Sa-Token针对会话登录，不仅为账号id分配了`User-Session`，同时还为每个token分配了不同的`Token-Session`

不同的设备端，哪怕登录了同一账号，只要它们得到的token不一致，它们对应的 `Token-Session` 就不一致，这就为我们不同端的独立数据读写提供了支持：

```java
// 获取当前会话的 Token-Session 
SaSession session = StpUtil.getTokenSession();

// 从 Token-Session 中读取、写入数据 
session.get("name");
session.set("name", "张三");

```

对应的api如下

```java
// 获取当前token的专属Session 
StpUtil.getTokenSession();

// 获取指定token的专属Session 
StpUtil.getTokenSessionByToken(token);
```

### ✨Custom-Session

一句话概括：我们自己定义的一个可以全局通用的Session

除了以上两种Session，Sa-Token还提供了第三种Session，那就是：`Custom-Session`，你可以将其理解为：自定义Session

Custom-Session不依赖特定的 账号id 或者 token，而是依赖于你提供的SessionId：

```java
// 获取指定key的 Custom-Session 
SaSession session = SaSessionCustomUtil.getSessionById("goods-10001");

// 从 Custom-Session 中读取、写入数据 
session.get("name");
session.set("name", "张三");
```

只要两个自定义Session的Id一致，它们就是同一个Session

API

```java
// 查询指定key的Session是否存在
SaSessionCustomUtil.isExists("goods-10001");

// 获取指定key的Session，如果没有，则新建并返回
SaSessionCustomUtil.getSessionById("goods-10001");

// 获取指定key的Session，如果没有，第二个参数决定是否新建并返回  
SaSessionCustomUtil.getSessionById("goods-10001", false);   

// 删除指定key的Session
SaSessionCustomUtil.deleteSessionById("goods-10001");

```

### ✨Session结构模型图

三种Session创建时机：

- `User-Session`: 指的是框架为每个 账号id 分配的 Session
  - 也就是说，当我们调用`StpUtil.login(id)`会产生它，同一个id下，这个User-Session是互通的
- `Token-Session`: 指的是框架为每个 token 分配的 Session
  - 也就是，当上述的方法执行完毕后，会为当前访问的用户在创建User-Session的前提下
  - 创建一个额外的Session，这个Session区分用户的系统（每个设备之间不互通）
- `Custom-Session`: 指的是以一个 特定的值 作为SessionId，来分配的 Session
  - 就是我们自定义的Session，相当于在JavaWeb中的全局上下文对象那样

**假设三个客户端登录同一账号，且配置了不共享token，那么此时的Session模型是：**

![session-model](/images/Java/SpringCloud/17-Sa-Token/session-model3.png)

简而言之：

- `User-Session` 以UserId为主，只要token指向的UserId一致，那么对应的Session对象就一致
- `Token-Session` 以token为主，只要token不同，那么对应的Session对象就不同
- `Custom-Session` 以特定的key为主，不同key对应不同的Session对象，同样的key指向同一个Session对象

### ✨✨获取到的Session对象的操作

> 注意：
>
> 1. `SaSession` 与 `HttpSession` 没有任何关系，在`HttpSession`上写入的值，在`SaSession`中无法取出
> 2. `HttpSession`并未被框架接管，在使用Sa-Token时，请在任何情况下均使用`SaSession`，不要使用`HttpSession`

这个操作的时候，建议使用线程锁之类的锁下

```java
// 返回此Session的id 
session.getId();                          

// 返回此Session的创建时间 (时间戳) 
session.getCreateTime();                  

// 在Session上获取一个值 
session.getAttribute('name');             

// 在Session上获取一个值，并指定取不到值时返回的默认值
session.getAttribute('name', 'zhang');    

// 在Session上写入一个值 
session.setAttribute('name', 'zhang');    

// 在Session上移除一个值 
session.removeAttribute('name');          

// 清空此Session的所有值 
session.clearAttribute();                 

// 获取此Session是否含有指定key (返回true或false)
session.containsAttribute('name');        

// 获取此Session会话上所有key (返回Set<String>)
session.attributeKeys();                  

// 返回此Session会话上的底层数据对象（如果更新map里的值，请调用session.update()方法避免产生脏数据）
session.getDataMap();                     

// 将这个Session从持久库更新一下
session.update();                         

// 注销此Session会话 (从持久库删除此Session)
session.logout();                         

```

> 由于Session存取值默认的类型都是Object，因此我们通常会写很多不必要类型转换代码
> 为了简化操作，Sa-Token自`v1.15.0`封装了存取值API的类型转换，你可以非常方便的调用以下方法：

```java
// 写值 
session.set("name", "zhang"); 

// 写值 (只有在此key原本无值的时候才会写入)
session.setDefaultValue("name", "zhang");

// 取值
session.get("name");

// 取值 (指定默认值)
session.get("name", "<defaultValue>"); 

// 取值 (转String类型)
session.getString("name"); 

// 取值 (转int类型)
session.getInt("age"); 

// 取值 (转long类型)
session.getLong("age"); 

// 取值 (转double类型)
session.getDouble("result"); 

// 取值 (转float类型)
session.getFloat("result"); 

// 取值 (指定转换类型)
session.getModel("key", Student.class); 

// 取值 (指定转换类型, 并指定值为Null时返回的默认值)
session.getModel("key", Student.class, <defaultValue>); 

// 是否含有某个key
session.has("key"); 

```

### 框架的配置

建议看看官方的文档<https://sa-token.dev33.cn/doc/index.html#/use/config>

```yaml
# Sa-Token 配置
sa-token: 
    # token名称 (同时也是cookie名称)
    token-name: satoken
    # token有效期，单位s 默认30天, -1代表永不过期 
    timeout: 2592000
    # token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒
    activity-timeout: -1
    # 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录) 
    is-concurrent: true
    # 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token) 
    is-share: true
    # token风格
    token-style: uuid
    # 是否输出操作日志 
    is-log: false

```

可以配置的参数如下：

| 参数名称               | 类型    | 默认值               | 说明                                                                                                                                                                                                            |
| ---------------------- | ------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenName              | String  | satoken              | token名称 (同时也是cookie名称)                                                                                                                                                                                  |
| timeout                | long    | 2592000              | token有效期，单位/秒 默认30天，-1代表永久有效 [参考：token有效期详解](https://sa-token.dev33.cn/doc/index.html#/fun/token-timeout)                                                                              |
| activityTimeout        | long    | -1                   | token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒, 默认-1 代表不限制 (例如可以设置为1800代表30分钟内无操作就过期) [参考：token有效期详解](https://sa-token.dev33.cn/doc/index.html#/fun/token-timeout) |
| isConcurrent           | Boolean | true                 | 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)                                                                                                                                      |
| isShare                | Boolean | true                 | 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)                                                                                                         |
| isReadBody             | Boolean | true                 | 是否尝试从 请求体 里读取 Token                                                                                                                                                                                  |
| isReadHead             | Boolean | true                 | 是否尝试从 header 里读取 Token                                                                                                                                                                                  |
| isReadCookie           | Boolean | true                 | 是否尝试从 cookie 里读取 Token                                                                                                                                                                                  |
| tokenStyle             | String  | uuid                 | token风格, [参考：自定义Token风格](https://sa-token.dev33.cn/doc/index.html#/up/token-style)                                                                                                                    |
| dataRefreshPeriod      | int     | 30                   | 默认dao层实现类中，每次清理过期数据间隔的时间 (单位: 秒) ，默认值30秒，设置为-1代表不启动定时清理                                                                                                               |
| tokenSessionCheckLogin | Boolean | true                 | 获取 `Token-Session` 时是否必须登录 (如果配置为true，会在每次获取 `Token-Session` 时校验是否登录)                                                                                                               |
| autoRenew              | Boolean | true                 | 是否打开自动续签 (如果此值为true, 框架会在每次直接或间接调用 `getLoginId()` 时进行一次过期检查与续签操作)                                                                                                       |
| tokenPrefix            | String  | null                 | token前缀, 例如填写 `Bearer` 实际传参 `satoken: Bearer xxxx-xxxx-xxxx-xxxx` [参考：自定义Token前缀](https://sa-token.dev33.cn/doc/index.html#/up/token-prefix)                                                  |
| isPrint                | Boolean | true                 | 是否在初始化配置时打印版本字符画                                                                                                                                                                                |
| isLog                  | Boolean | false                | 是否打印操作日志                                                                                                                                                                                                |
| jwtSecretKey           | String  | null                 | jwt秘钥 (只有集成 `sa-token-temp-jwt` 模块时此参数才会生效)                                                                                                                                                     |
| idTokenTimeout         | long    | 86400                | Id-Token的有效期 (单位: 秒)                                                                                                                                                                                     |
| basic                  | String  | ""                   | Http Basic 认证的账号和密码 [参考：Http Basic 认证](https://sa-token.dev33.cn/doc/index.html#/up/basic-auth)                                                                                                    |
| currDomain             | String  | null                 | 配置当前项目的网络访问地址                                                                                                                                                                                      |
| checkIdToken           | Boolean | false                | 是否校验Id-Token（部分rpc插件有效）                                                                                                                                                                             |
| sso                    | Object  | new SaSsoConfig()    | SSO 单点登录相关配置                                                                                                                                                                                            |
| cookie                 | Object  | new SaCookieConfig() | Cookie配置对象                                                                                                                                                                                                  |

## 深入

### ✨集成Redis

Sa-token默认将数据保存在内存中，此模式读写速度最快，且避免了序列化与反序列化带来的性能消耗，但是此模式也有一些缺点，比如：

1. 重启后数据会丢失
2. 无法在分布式环境中共享数据

为此，Sa-Token提供了扩展接口，你可以轻松将会话数据存储在 `Redis`、`Memcached`等专业的缓存中间件中， 做到重启数据不丢失，而且保证分布式环境下多节点的会话一致性

官方提供了两种整合方式

> 使用JDK的序列化方式
>
> 优点：兼容性好，缺点：Session序列化后基本不可读，对开发者来讲等同于乱码

```xml
<!-- Sa-Token 整合 Redis （使用jdk默认序列化方式） -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-dao-redis</artifactId>
    <version>1.28.0</version>
</dependency>

```

>  第二种：Jackson
>
> 优点：Session序列化后可读性强，可灵活手动修改，缺点：兼容性稍差

```xml
<!-- Sa-Token 整合 Redis （使用jackson序列化方式） -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-dao-redis-jackson</artifactId>
    <version>1.28.0</version>
</dependency>
```

在使用它们之前，我们得先把自己的redis配置好

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

我这里就不用Redis集群了….Redis集群要用到Jedis这个依赖，直接单台Redis

最终我添加的依赖为

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-dao-redis-jackson</artifactId>
    <version>1.28.0</version>
</dependency>
<!--注意这个东西不能漏了，就相当于是Mysql的 comm一样-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

配置文件

```yaml
server:
  # 端口
  port: 8081

# Sa-Token配置
sa-token:
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
spring:
  # redis配置
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

接着正常启动即可，不用做任何额外的配置，对没错，任何额外的配置都不需要

然后正常登陆，你就能在你的Redis内看到如下内容

![image-20220121171641113](/images/Java/SpringCloud/17-Sa-Token/image-20220121171641113.png)

注意：

> Sa-Token-Redis 集成包的版本尽量与 Sa-Token-Starter 集成包的版本一致，否则可能出现兼容性问题

### ✨前后端分离-使用Token

无Cookie：特指不支持Cookie功能的终端，通俗来讲就是我们常说的 —— **前后台分离模式**

常规PC端鉴权方法，一般由`Cookie模式`完成，而 Cookie 有两个特性:

1. 可由后端控制写入
2. 每次请求自动提交

这就使得我们在前端代码中，无需任何特殊操作，就能完成鉴权的全部流程（因为整个流程都是后端控制完成的）
而在app、小程序等前后台分离场景中，一般是没有 Cookie 这一功能的，此时大多数人都会一脸懵逼，咋进行鉴权啊？

见招拆招，其实答案很简单：

- 不能后端控制写入了，就前端自己写入（难点在**后端如何将token传递到前端**）
- 每次请求不能自动提交了，那就手动提交（难点在**前端如何将token传递到后端**，同时**后端将其读取出来**）

>  将Token返回到前端的方式

1. 首先调用 `StpUtil.login(id)` 进行登录
2. 调用`StpUtil.getTokenInfo()`返回当前会话的token详细参数
   - 此方法返回一个对象，其有两个关键属性：`tokenName`和`tokenValue`（token 的名称和 token 的值）
   - 将此对象传递到前台，让前端人员将这两个值保存到本地

该方法返回值一览：

```json
{
    // 这个可以更该的，详情看前面的：框架的配置部分
    "tokenName": "satoken",
    "tokenValue": "a44c4dfb-c4c0-40c9-a9c8-ab736c2b8508",
    "isLogin": true,
    "loginId": "10001",
    "loginType": "login",
    "tokenTimeout": 2591671,
    "sessionTimeout": 2591671,
    "tokenSessionTimeout": -2,
    "tokenActivityTimeout": -1,
    "loginDevice": "default-device",
    "tag": null
}
```

当然，`SaTokenInfo tokenInfo = StpUtil.getTokenInfo();`你也可以通过返回对象中的内容进行提取，只返回那两个值给前端

然后我们在前端访问只需要额外加一个请求头，名字为tokenName，value为tokenValue即可

![image-20220121172519180](/images/Java/SpringCloud/17-Sa-Token/image-20220121172519180.png)

然后普通的解决方式这里就不说了，这里说下UniAPP的发送方式

> 方式1，普通粗暴

```javascript
// 1、首先在登录时，将 tokenValue 存储在本地，例如：
uni.setStorageSync('tokenValue', tokenValue);

// 2、在发起ajax请求的地方，获取这个值，并塞到header里 
uni.request({
    url: 'https://www.example.com/request', // 仅为示例，并非真实接口地址。
    header: {
        "content-type": "application/x-www-form-urlencoded",
        "satoken": uni.getStorageSync('tokenValue')        // 关键代码, 注意参数名字是 satoken 
    },
    success: (res) => {
        console.log(res.data);    
    }
});

```

或者用更加灵活的方式

```javascript
// 1、首先在登录时，将tokenName和tokenValue一起存储在本地，例如：
uni.setStorageSync('tokenName', tokenName); 
uni.setStorageSync('tokenValue', tokenValue); 

// 2、在发起ajax的地方，获取这两个值, 并组织到head里 
var tokenName = uni.getStorageSync('tokenName');    // 从本地缓存读取tokenName值
var tokenValue = uni.getStorageSync('tokenValue');    // 从本地缓存读取tokenValue值
var header = {
    "content-type": "application/x-www-form-urlencoded"
};
if (tokenName != undefined && tokenName != '') {
    header[tokenName] = tokenValue;
}

// 3、后续在发起请求时将 header 对象塞到请求头部 
uni.request({
    url: 'https://www.example.com/request', // 仅为示例，并非真实接口地址。
    header: header,
    success: (res) => {
        console.log(res.data);    
    }
});

```

> 当然，如何封装这里就不提了，比较简单

如果你对 Cookie 非常了解，那你就会明白，所谓 Cookie ，本质上就是一个特殊的`header`参数而已， 而既然它只是一个 header 参数，我们就能手动模拟实现它，从而完成鉴权操作

这其实是对`无Cookie模式`的另一种解决方案，有兴趣的同学可以百度了解一下，在此暂不赘述

### 自定义token的生成风格

Sa-Token默认的token生成策略是uuid风格，其模样类似于：`623368f0-ae5e-4475-a53f-93e4225f16ae`
如果你对这种风格不太感冒，还可以将token生成设置为其他风格

怎么设置呢？只需要在yml配置文件里设置 `sa-token.token-style=风格类型` 即可，其有多种取值：

```properties
# 1. token-style=uuid    —— uuid风格 (默认风格)
"623368f0-ae5e-4475-a53f-93e4225f16ae"

# 2. token-style=simple-uuid    —— 同上，uuid风格, 只不过去掉了中划线
"6fd4221395024b5f87edd34bc3258ee8"

# 3. token-style=random-32    —— 随机32位字符串
"qEjyPsEA1Bkc9dr8YP6okFr5umCZNR6W"

# 4. token-style=random-64    —— 随机64位字符串
"v4ueNLEpPwMtmOPMBtOOeIQsvP8z9gkMgIVibTUVjkrNrlfra5CGwQkViDjO8jcc"

# 5. token-style=random-128    —— 随机128位字符串
"nojYPmcEtrFEaN0Otpssa8I8jpk8FO53UcMZkCP9qyoHaDbKS6dxoRPky9c6QlftQ0pdzxRGXsKZmUSrPeZBOD6kJFfmfgiRyUmYWcj4WU4SSP2ilakWN1HYnIuX0Olj"

# 6. token-style=tik    —— tik风格
"gr_SwoIN0MC1ewxHX_vfCW3BothWDZMMtx__"
```

> 如果你觉着以上风格都不是你喜欢的类型，那么你还可以**自定义token生成策略**，来定制化token生成风格
>
> 怎么做呢？只需要重写 `SaStrategy` 策略类的 `createToken` 算法即可

- 在`SaTokenConfigure`配置类中添加代码：

```java
@Configuration
public class SaTokenConfigure {
    /**
     * 重写 Sa-Token 框架内部算法策略 
     */
    @Autowired
    public void rewriteSaStrategy() {
        // 重写 Token 生成策略 
        SaStrategy.me.createToken = (loginId, loginType) -> {
            return SaFoxUtil.getRandomString(60);    // 随机60位长度字符串
        };
    }
}

```

- 再次调用 `StpUtil.login(10001)`方法进行登录，观察其生成的token样式:

```java
gfuPSwZsnUhwgz08GTCH4wOgasWtc3odP4HLwXJ7NDGOximTvT4OlW19zeLH
```

### 自定义Token前缀

在某些系统中，前端提交token时会在前面加个固定的前缀，例如：

```java
{
    "satoken": "Bearer xxxx-xxxx-xxxx-xxxx"
}
//md 想起来了Node的JWT，就是这种前缀
```

> 此时后端如果不做任何特殊处理，框架将会把`Bearer`视为token的一部分，无法正常读取token信息，导致鉴权失败

为此，我们需要在yml中添加如下配置：

```yaml
sa-token: 
    # token前缀
    token-prefix: Bearer
```

此时 Sa-Token 便可在读取 Token 时裁剪掉 `Bearer`，成功获取`xxxx-xxxx-xxxx-xxxx`

### [记住我]模式和token有效期（单独设置）

如图所示，一般网站的登录界面都会有一个 **`[记住我]`** 按钮，当你勾选它后，即使你关闭浏览器再次打开网站，也依然会处于登录状态，无须重复验证密码

![../static/login-view.png](/images/Java/SpringCloud/17-Sa-Token/login-view.png)

那么在Sa-Token中，如何做到 [ 记住我 ] 功能呢？

Sa-Token的登录授权，**默认就是`[记住我]`模式**，为了实现`[非记住我]`模式, 你需要在登录时如下设置：

```java
// 设置登录账号id为10001，第二个参数指定是否为[记住我]，当此值为false后，关闭浏览器后再次打开需要重新登录
StpUtil.login(10001, false);
```

那么，Sa-Token实现`[记住我]`的具体原理是？

Cookie作为浏览器提供的默认会话跟踪机制，其生命周期有两种形式，分别是：

- 临时Cookie：有效期为本次会话，只要关闭浏览器窗口，Cookie就会消失
- 永久Cookie：有效期为一个具体的时间，在时间未到期之前，即使用户关闭了浏览器Cookie也不会消失

利用Cookie的此特性，我们便可以轻松实现 [记住我] 模式：

- 勾选 [记住我] 按钮时：调用`StpUtil.login(10001, true)`，在浏览器写入一个`永久Cookie`储存 Token，此时用户即使重启浏览器 Token 依然有效
- 不勾选 [记住我] 按钮时：调用`StpUtil.login(10001, false)`，在浏览器写入一个`临时Cookie`储存 Token，此时用户在重启浏览器后 Token 便会消失，导致会话失效

> 前后端分离的模式下如何实现？

此时机智的你😏很快发现一个问题，Cookie虽好，却无法在前后端分离环境下使用，那是不是代表上述方案在APP、小程序等环境中无效？

准确的讲，答案是肯定的，任何基于Cookie的认证方案在前后台分离环境下都会失效（原因在于这些客户端默认没有实现Cookie功能），不过好在，这些客户端一般都提供了替代方案， 唯一遗憾的是，此场景中token的生命周期需要我们在前端手动控制

以经典跨端框架 [uni-app](https://uniapp.dcloud.io/) 为例，我们可以使用如下方式达到同样的效果：

```javascript
// 使用本地存储保存token，达到 [永久Cookie] 的效果
uni.setStorageSync("satoken", "xxxx-xxxx-xxxx-xxxx-xxx");

// 使用globalData保存token，达到 [临时Cookie] 的效果
getApp().globalData.satoken = "xxxx-xxxx-xxxx-xxxx-xxx";

```

> 如果你决定在PC浏览器环境下进行前后台分离模式开发，那么更加简单：

```javascript
// 使用 localStorage 保存token，达到 [永久Cookie] 的效果
localStorage.setItem("satoken", "xxxx-xxxx-xxxx-xxxx-xxx");

// 使用 sessionStorage 保存token，达到 [临时Cookie] 的效果
sessionStorage.setItem("satoken", "xxxx-xxxx-xxxx-xxxx-xxx");

```

登陆时指定Token有效期

> 登录时不仅可以指定是否为`[记住我]`模式，还可以指定一个特定的时间作为token有效时长，如下示例：

```java
// 示例1：
// 指定token有效期(单位: 秒)，如下所示token七天有效
StpUtil.login(10001, new SaLoginModel().setTimeout(60 * 60 * 24 * 7));

// ----------------------- 示例2：所有参数
// `SaLoginModel`为登录参数Model，其有诸多参数决定登录时的各种逻辑，例如：
StpUtil.login(10001, new SaLoginModel()
              // 此次登录的客户端设备标识, 用于[同端互斥登录]时指定此次登录的设备名称
              .setDevice("PC")
              // 是否为持久Cookie（临时Cookie在浏览器关闭时会自动删除，持久Cookie在重新打开后依然存在）
              .setIsLastingCookie(true)
              // 指定此次登录token的有效期, 单位:秒 （如未指定，自动取全局配置的timeout值）
              .setTimeout(60 * 60 * 24 * 7)
             );
```

### 模拟他人

以上介绍的api都是操作当前账号，对当前账号进行各种鉴权操作，你可能会问，我能不能对别的账号进行一些操作？
比如：查看账号10001有无某个权限码、获取 账号id=10002 的 `User-Session`，等等...

Sa-Token在api设计时充分考虑了这一点，暴露出多个api进行此类操作

> 简单来说就是超级管理员想体验普通用户的账号但是不想自己注册一个

- 有关操作其他账号的api

```java
// 获取指定账号10001的`tokenValue`值 
StpUtil.getTokenValueByLoginId(10001);

// 将账号10001的会话注销登录
StpUtil.logout(10001);

// 获取账号10001的Session对象, 如果session尚未创建, 则新建并返回
StpUtil.getSessionByLoginId(10001);

// 获取账号10001的Session对象, 如果session尚未创建, 则返回null 
StpUtil.getSessionByLoginId(10001, false);

// 获取账号10001是否含有指定角色标识 
StpUtil.hasRole(10001, "super-admin");

// 获取账号10001是否含有指定权限码
StpUtil.hasPermission(10001, "user:add");

```

当然

> 有时候，我们需要直接将当前会话的身份切换为其它账号，比如：

```java
// 将当前会话[身份临时切换]为其它账号 
StpUtil.switchTo(10044);

// 此时再调用此方法会返回 10044 (我们临时切换到的账号id)
StpUtil.getLoginId();

// 结束 [身份临时切换]
StpUtil.endSwitch();

```

你还可以: 直接在一个代码段里方法内，临时切换身份为指定loginId（此方式无需手动调用`StpUtil.endSwitch()`关闭身份切换）

```java
System.out.println("------- [身份临时切换]调用开始...");
StpUtil.switchTo(10044, () -> {
    System.out.println("是否正在身份临时切换中: " + StpUtil.isSwitch()); 
    System.out.println("获取当前登录账号id: " + StpUtil.getLoginId());
});
System.out.println("------- [身份临时切换]调用结束...");

```

### 同端互斥登陆

如果你经常使用腾讯QQ，就会发现它的登录有如下特点：它可以手机电脑同时在线，但是不能在两个手机上同时登录一个账号
同端互斥登录，指的就是像腾讯QQ一样，在同一类型设备上只允许单地点登录，在不同类型设备上允许同时在线

在 Sa-Token 中如何做到同端互斥登录?
首先在配置文件中，将 `isConcurrent` 配置为false，然后调用登录等相关接口时声明设备标识即可：

> 指定设备标识登陆

```java
// 指定`账号id`和`设备标识`进行登录
StpUtil.login(10001, "PC"); 
```

调用此方法登录后，同设备的会被顶下线（不同设备不受影响），再次访问系统时会抛出 `NotLoginException` 异常，场景值=`-4`

> 指定设备强制注销

```java
// 指定`账号id`和`设备标识`进行强制注销 
StpUtil.logout(10001, "PC");
```

如果第二个参数填写null或不填，代表将这个账号id所有在线端强制注销，被踢出者再次访问系统时会抛出 `NotLoginException` 异常，场景值=`-2`

> 查询当前登陆的设备标识

```java
// 返回当前token的登录设备
StpUtil.getLoginDevice();
```

> ID反查Token

```java
// 获取指定loginId指定设备端的tokenValue 
StpUtil.getTokenValueByLoginId(10001, "APP");
```

### 二级认证

在某些敏感操作下，我们需要对已登录的会话进行二次验证

比如代码托管平台的仓库删除操作，尽管我们已经登录了账号，当我们点击 **[删除]** 按钮时，还是需要再次输入一遍密码，这么做主要为了两点：

1. 保证操作者是当前账号本人
2. 增加操作步骤，防止误删除重要数据
3. 例如GitHub，在你删除仓库的时候，如果说挂了梯子，有概率会要求你进行再次输入密码，并且就算你是安全的还会额外让你输入指定的标识仓库名称，后者非常简单，前者就emm有点怪了

这就是我们本篇要讲的 —— 二级认证，即：在已登录会话的基础上，进行再次验证，提高会话的安全性。

> 在`Sa-Token`中进行二级认证非常简单，只需要使用以下API：

```java
// 在当前会话 开启二级认证，时间为120秒
StpUtil.openSafe(120); 

// 获取：当前会话是否处于二级认证时间内
StpUtil.isSafe(); 

// 检查当前会话是否已通过二级认证，如未通过则抛出异常
StpUtil.checkSafe(); 

// 获取当前会话的二级认证剩余有效时间 (单位: 秒, 返回-2代表尚未通过二级认证)
StpUtil.getSafeTime(); 

// 在当前会话 结束二级认证
StpUtil.closeSafe(); 

```

> 使用注解开启二级认证
>
> 在一个方法上使用 `@SaCheckSafe` 注解，可以在代码进入之前此方法之前进行一次二级认证

```java
// 二级认证：必须二级认证之后才能进入该方法 
@SaCheckSafe      
@RequestMapping("add")
public String add() {
    return "用户增加";
}
```

### Http Basic认证

这个认证目前来说基本没什么企业和人会用了，比较局限

Http Basic 是 http 协议中最基础的认证方式，其有两个特点：

- 简单、易集成。
- 功能支持度低。

在 Sa-Token 中使用 Http Basic 认证非常简单，只需调用几个简单的方法

> 首先我们在一个接口中，调用 Http Basic 校验：

```java
@RequestMapping("test3")
public SaResult test3() {
    SaBasicUtil.check("sa:123456");
    return SaResult.ok();
}

```

然后我们访问这个接口时，浏览器会强制弹出一个表单：

![sa-basic.png](/images/Java/SpringCloud/17-Sa-Token/sa-basic.png)

当我们输入账号密码后 `（sa / 123456）`，才可以继续访问数据：

![sa-basic-ok.png](/images/Java/SpringCloud/17-Sa-Token/sa-basic-ok.png)

> 其他启用方式

```java
// 对当前会话进行 Basic 校验，账号密码为 yml 配置的值（例如：sa-token.basic=sa:123456）
SaBasicUtil.check();

// 对当前会话进行 Basic 校验，账号密码为：`sa / 123456`
SaBasicUtil.check("sa:123456");

// 以注解方式启用 Basic 校验
@SaCheckBasic(account = "sa:123456")
@RequestMapping("test3")
public SaResult test3() {
    return SaResult.ok();
}

// 在全局拦截器 或 过滤器中启用 Basic 认证 
@Bean
public SaServletFilter getSaServletFilter() {
    return new SaServletFilter()
            .addInclude("/**").addExclude("/favicon.ico")
            .setAuth(obj -> {
                SaRouter.match("/test/**", () -> SaBasicUtil.check("sa:123456"));
            });
}

```

> 除了访问后再输入账号密码外，我们还可以在 URL 中直接拼接账号密码通过 Basic 认证，例如：

```bash
curl http://sa:123456@127.0.0.1:8081/test/test3
# 浏览器直接请求
```

### 密码加密

严格来讲，密码加密不属于 [权限认证] 的范畴，但是对于大多数系统来讲，密码加密又是安全认证不可或缺的部分， 所以，`Sa-Token`在`v1.14版本`添加密码加密模块，该模块非常简单，仅仅封装了一些常见的加密算法

使用的画风应该是这样的

```java
    @RequestMapping("/doLogin")
    public SaResult doLogin(String name, String pwd) {
        // 这里进行数据库匹配之前，把用户传入的密码进行加解密
        String xxx = xxx.xxx(pwd);
        //...数据库擦操作
        if ("数据库认证通过") {
            StpUtil.login(10001);
            return SaResult.ok("登录成功");
        }
        return SaResult.error("登录失败");
    }
```



> md5、sha1、sha256

```java
// md5加密 
SaSecureUtil.md5("123456");

// sha1加密 
SaSecureUtil.sha1("123456");

// sha256加密 
SaSecureUtil.sha256("123456");

// md5加盐加密: md5(md5(str) + md5(salt)) 
SaSecureUtil.md5BySalt("123456", "salt");

```

> AES对称加密

```java
// 定义秘钥和明文
String key = "123456";
String text = "Sa-Token 一个轻量级java权限认证框架";

// 加密 
String ciphertext = SaSecureUtil.aesEncrypt(key, text);
System.out.println("AES加密后：" + ciphertext);

// 解密 
String text2 = SaSecureUtil.aesDecrypt(key, ciphertext);
System.out.println("AES解密后：" + text2);

```

> RSA加密（非对称加密）

```java
// 定义私钥和公钥 
String privateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAO+wmt01pwm9lHMdq7A8gkEigk0XKMfjv+4IjAFhWCSiTeP7dtlnceFJbkWxvbc7Qo3fCOpwmfcskwUc3VSgyiJkNJDs9ivPbvlt8IU2bZ+PBDxYxSCJFrgouVOpAr8ar/b6gNuYTi1vt3FkGtSjACFb002/68RKUTye8/tdcVilAgMBAAECgYA1COmrSqTUJeuD8Su9ChZ0HROhxR8T45PjMmbwIz7ilDsR1+E7R4VOKPZKW4Kz2VvnklMhtJqMs4MwXWunvxAaUFzQTTg2Fu/WU8Y9ha14OaWZABfChMZlpkmpJW9arKmI22ZuxCEsFGxghTiJQ3tK8npj5IZq5vk+6mFHQ6aJAQJBAPghz91Dpuj+0bOUfOUmzi22obWCBncAD/0CqCLnJlpfOoa9bOcXSusGuSPuKy5KiGyblHMgKI6bq7gcM2DWrGUCQQD3SkOcmia2s/6i7DUEzMKaB0bkkX4Ela/xrfV+A3GzTPv9bIBamu0VIHznuiZbeNeyw7sVo4/GTItq/zn2QJdBAkEA8xHsVoyXTVeShaDIWJKTFyT5dJ1TR++/udKIcuiNIap34tZdgGPI+EM1yoTduBM7YWlnGwA9urW0mj7F9e9WIQJAFjxqSfmeg40512KP/ed/lCQVXtYqU7U2BfBTg8pBfhLtEcOg4wTNTroGITwe2NjL5HovJ2n2sqkNXEio6Ji0QQJAFLW1Kt80qypMqot+mHhS+0KfdOpaKeMWMSR4Ij5VfE63WzETEeWAMQESxzhavN1WOTb3/p6icgcVbgPQBaWhGg==";
String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvsJrdNacJvZRzHauwPIJBIoJNFyjH47/uCIwBYVgkok3j+3bZZ3HhSW5Fsb23O0KN3wjqcJn3LJMFHN1UoMoiZDSQ7PYrz275bfCFNm2fjwQ8WMUgiRa4KLlTqQK/Gq/2+oDbmE4tb7dxZBrUowAhW9NNv+vESlE8nvP7XXFYpQIDAQAB";

// 文本
String text = "Sa-Token 一个轻量级java权限认证框架";

// 使用公钥加密
String ciphertext = SaSecureUtil.rsaEncryptByPublic(publicKey, text);
System.out.println("公钥加密后：" + ciphertext);

// 使用私钥解密
String text2 = SaSecureUtil.rsaDecryptByPrivate(privateKey, ciphertext);
System.out.println("私钥解密后：" + text2); 

```

你可能会有疑问，私钥和公钥这么长的一大串，我怎么弄出来，手写吗？当然不是，调用以下方法生成即可

```java
// 生成一对公钥和私钥，其中Map对象 (private=私钥, public=公钥)
System.out.println(SaSecureUtil.rsaGenerateKeyPair());
```

> Base64的编码和解码

```java
// 文本
String text = "Sa-Token 一个轻量级java权限认证框架";

// 使用Base64编码
String base64Text = SaBase64Util.encode(text);
System.out.println("Base64编码后：" + base64Text);

// 使用Base64解码
String text2 = SaBase64Util.decode(base64Text);
System.out.println("Base64解码后：" + text2); 

```

当然，要实现更多的加解密，可以参考Hutool工具类库

### 会话治理

尽管框架将大部分操作提供了简易的封装，但在一些特殊场景下，我们仍需要绕过框架，直达数据底层进行一些操作
Sa-Token提供以下API助你直接操作会话列表

具体的API：

```java
// 查询所有token
StpUtil.searchTokenValue(String keyword, int start, int size);

// 查询所有账号Session会话
StpUtil.searchSessionId(String keyword, int start, int size);

// 查询所有令牌Session会话
StpUtil.searchTokenSessionId(String keyword, int start, int size);
```

- `keyword`: 查询关键字，只有包括这个字符串的token值才会被查询出来
- `start`: 数据开始处索引, 值为-1时代表一次性取出所有数据
- `size`: 要获取的数据条数

例子：

```java
// 查询value包括1000的所有token，结果集从第0条开始，返回10条
List<String> tokenList = StpUtil.searchTokenValue("1000", 0, 10);    
for (String token : tokenList) {
    System.out.println(token);
}
```

> 注意事项

由于会话查询底层采用了遍历方式获取数据，当数据量过大时此操作将会比较耗时，有多耗时呢？这里提供一份参考数据：

- 单机模式下：百万会话取出10条token平均耗时 `0.255s`
- Redis模式下：百万会话取出10条token平均耗时 `3.322s`

请根据业务实际水平合理调用API

> 如果需要实时获取当前登录人数或者需要在用户退出后自动触发某事件等, 建议采用websocket技术

### 全局侦听器

接口`SaTokenListener`是Sa-Token的全局侦听器，通过实现此接口，你可以在用户登陆、退出、被踢下线等关键性操作时进行一些AOP操作

框架对此侦听器的默认实现是log日志输出，你可以通过配置`sa-token.is-log=true`开启

>  下面我们演示一下如何自定义侦听器的实现

新建`MySaTokenListener.java`，继承`SaTokenListener`接口，并添加上注解`@Component`，保证此类被`SpringBoot`扫描到

```java
/**
 * 自定义侦听器的实现 
 */
@Component
public class MySaTokenListener implements SaTokenListener {

    /** 每次登录时触发 */
    @Override
    public void doLogin(String loginType, Object loginId, SaLoginModel loginModel) {
        // ... 
    }

    /** 每次注销时触发 */
    @Override
    public void doLogout(String loginType, Object loginId, String tokenValue) {
        // ... 
    }

    /** 每次被踢下线时触发 */
    @Override
    public void doKickout(String loginType, Object loginId, String tokenValue) {
        // ... 
    }

    /** 每次被顶下线时触发 */
    @Override
    public void doReplaced(String loginType, Object loginId, String tokenValue) {
        // ... 
    }

    /** 每次被封禁时触发 */
    @Override
    public void doDisable(String loginType, Object loginId, long disableTime) {
        // ... 
    }

    /** 每次被解封时触发 */
    @Override
    public void doUntieDisable(String loginType, Object loginId) {
        // ... 
    }

    /** 每次创建Session时触发 */
    @Override
    public void doCreateSession(String id) {
        // ... 
    }

    /** 每次注销Session时触发 */
    @Override
    public void doLogoutSession(String id) {
        // ... 
    }

}

```

### 全局过滤器（Filter）

这里建议看看官方文档<https://sa-token.dev33.cn/doc/index.html#/up/global-filter>

之前的章节中，我们学习了“根据拦截器实现路由拦截鉴权”，其实在大多数web框架中，使用过滤器可以实现同样的功能，本章我们就利用Sa-Token全局过滤器来实现路由拦截器鉴权。

首先我们先梳理清楚一个问题，既然拦截器已经可以实现路由鉴权，为什么还要用过滤器再实现一遍呢？简而言之：

1. 相比于拦截器，过滤器更加底层，执行时机更靠前，有利于防渗透扫描
2. 过滤器可以拦截静态资源，方便我们做一些权限控制
3. 部分Web框架根本就没有提供拦截器功能，但几乎所有的Web框架都会提供过滤器机制

但是过滤器也有一些缺点，比如：

1. 由于太过底层，导致无法率先拿到`HandlerMethod`对象，无法据此添加一些额外功能
2. 由于拦截的太全面了，导致我们需要对很多特殊路由(如`/favicon.ico`)做一些额外处理
3. 在Spring中，过滤器中抛出的异常无法进入全局`@ExceptionHandler`，我们必须额外编写代码进行异常处理

Sa-Token同时提供过滤器和拦截器机制，不是为了让谁替代谁，而是为了让大家根据自己的实际业务合理选择，拥有更多的发挥空间。

>  同拦截器一样，为了避免不必要的性能浪费，Sa-Token全局过滤器默认处于关闭状态，若要使用过滤器组件，首先你需要注册它到项目中：

```java
/**
 * [Sa-Token 权限认证] 配置类 
 * @author kong
 */
@Configuration
public class SaTokenConfigure {

    /**
     * 注册 [Sa-Token全局过滤器] 
     */
    @Bean
    public SaServletFilter getSaServletFilter() {
        return new SaServletFilter()

                // 指定 拦截路由 与 放行路由
                .addInclude("/**").addExclude("/favicon.ico")

                // 认证函数: 每次请求执行 
                .setAuth(obj -> {
                    System.out.println("---------- 进入Sa-Token全局认证 -----------");

                    // 登录认证 -- 拦截所有路由，并排除/user/doLogin 用于开放登录 
                    SaRouter.match("/**", "/user/doLogin", () -> StpUtil.checkLogin());

                    // 更多拦截处理方式，请参考“路由拦截式鉴权”章节 
                })

                // 异常处理函数：每次认证函数发生异常时执行此函数 
                .setError(e -> {
                    System.out.println("---------- 进入Sa-Token异常处理 -----------");
                    return AjaxJson.getError(e.getMessage());
                })

                // 前置函数：在每次认证函数之前执行
                .setBeforeAuth(r -> {
                    // ---------- 设置一些安全响应头 ----------
                    SaHolder.getResponse()
                    // 服务器名称 
                    .setServer("sa-server")
                    // 是否可以在iframe显示视图： DENY=不可以 | SAMEORIGIN=同域下可以 | ALLOW-FROM uri=指定域名下可以 
                    .setHeader("X-Frame-Options", "SAMEORIGIN")
                    // 是否启用浏览器默认XSS防护： 0=禁用 | 1=启用 | 1; mode=block 启用, 并在检查到XSS攻击时，停止渲染页面 
                    .setHeader("X-XSS-Protection", "1; mode=block")
                    // 禁用浏览器内容嗅探 
                    .setHeader("X-Content-Type-Options", "nosniff")
                    ;
                })
                ;
    }

}

```

### 多账号认证

看[官方文档](https://sa-token.dev33.cn/doc/index.html#/up/many-account)，需要重写代码（当然，官方提供了解决方案）

