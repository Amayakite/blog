---
title: 17-2-OAuth
date: 2022-1-22 0:35:30
category: 分布式-微服务
tag:
- Sa-Token
- Security
- OAuth
---

## 关于OAuth

总之，如果涉及到微信小程序之类的，基本上这个玩意是首选的

简单来讲，OAuth2.0的应用场景可以理解为单点登录的升级版，单点登录解决了多个系统间会话的共享，OAuth2.0在此基础上增加了应用之间的权限控制

这玩意整体来说有点绕，不过你可以参考下面的介绍很快的了解这玩意（摘抄自阮一峰老师的[博客](https://www.ruanyifeng.com/blog/2019/04/oauth_design.html)）

### OAuth概述-快递员问题

1. 我住在一个大型的居民小区
2. 小区有门禁系统
3. 进入的时候需要输入密码
4. 我经常网购和外卖，每天都有快递员来送货。我必须找到一个办法，让快递员通过门禁系统，进入小区

> 如果我把自己的密码，告诉快递员，他就拥有了与我同样的权限，这样好像不太合适。万一我想取消他进入小区的权力，也很麻烦，我自己的密码也得跟着改了，还得通知其他的快递员。

有没有一种办法，让快递员能够自由进入小区，又不必知道小区居民的密码，而且他的唯一权限就是送货，其他需要密码的场合，他都没有权限？

于是，我设计了一套授权机制

1. 门禁系统的密码输入器下面，增加一个按钮，叫做"**获取授权**"。快递员需要首先按这个按钮，去申请授权
2. 他按下按钮以后，屋主（也就是我）的手机就会跳出对话框：有人正在要求授权。系统还会显示该快递员的姓名、工号和所属的快递公司
   - 我确认请求属实，就点击按钮，告诉门禁系统，我同意给予他进入小区的授权
3. 门禁系统得到我的确认以后，向快递员显示一个进入小区的令牌（access token）。令牌就是类似密码的一串数字，只在短期内（比如七天）有效
4. 快递员向门禁系统输入令牌，进入小区

有人可能会问，为什么不是远程为快递员开门，而要为他单独生成一个令牌？

这是因为快递员可能每天都会来送货，第二天他还可以复用这个令牌。另外，有的小区有多重门禁，快递员可以使用同一个令牌通过它们

> 互联网场景

我们把上面的例子搬到互联网，就是 OAuth 的设计了。

首先，居民小区就是**储存用户数据的网络服务**。比如，微信储存了我的好友信息，获取这些信息，就必须经过微信的"门禁系统"。

其次，快递员（或者说快递公司）就是**第三方应用**，想要穿过门禁系统，进入小区。

最后，我就是用户本人，**同意授权第三方应用**进入小区，获取我的数据

**简单说，OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。**

> 令牌(Token)与密码(Password)

令牌（token）与密码（password）的作用是一样的，都可以进入系统，但是有三点差异

1. 令牌是短期的，到期会自动失效，用户自己无法修改。密码一般长期有效，用户不修改，就不会发生变化
2. 令牌可以被数据所有者撤销，会立即失效。以上例而言，屋主可以随时取消快递员的令牌。密码一般不允许被他人撤销
3. 令牌有权限范围（scope），比如只能进小区的二号门。对于网络服务来说，只读令牌就比读写令牌更安全。密码一般是完整权限

上面这些设计，保证了令牌既可以让第三方应用获得权限，同时又随时可控，不会危及系统安全。这就是 OAuth 2.0 的优点

注意，只要知道了令牌，就能进入系统。系统一般不会再次确认身份，所以**令牌必须保密，泄漏令牌与泄漏密码的后果是一样的。** 这也是为什么令牌的有效期，一般都设置得很短的原因。

OAuth 2.0 对于如何颁发令牌的细节，规定得非常详细。具体来说，一共分成四种授权类型（authorization grant），即四种颁发令牌的方式，适用于不同的互联网场景。

### RFC-6749标准

OAuth 2.0 的标准是 [RFC 6749](https://tools.ietf.org/html/rfc6749) 文件。该文件先解释了 OAuth 是什么。

> OAuth 引入了一个授权层，用来分离两种不同的角色：客户端和资源所有者。......资源所有者同意以后，资源服务器可以向客户端颁发令牌。客户端通过令牌，去请求数据。

这段话的意思就是，**OAuth 的核心就是向第三方应用颁发令牌。**然后，RFC 6749 接着写道：

> （由于互联网有多种场景）本标准定义了获得令牌的四种授权方式（authorization grant ）

也就是说，**OAuth 2.0 规定了四种获得令牌的流程。你可以选择最适合自己的那一种，向第三方应用颁发令牌。**下面就是这四种授权方式

> - 授权码（authorization-code）
> - 隐藏式（implicit）
> - 密码式（password）
> - 客户端凭证（client credentials）

注意，不管哪一种授权方式，第三方应用申请令牌之前，**都必须先到系统备案**，说明自己的身份，然后会拿到**两个身份识别码**：客户端 ID（client ID）和客户端密钥（client secret）。这是为了防止令牌被滥用，没有备案过的第三方应用，是不会拿到令牌的。

### 方式一：授权码

**授权码（authorization code）方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌。**

这种方式是最常用的流程，安全性也最高，它适用于那些有后端的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。

> 第一步，A 网站提供一个链接，用户点击后就会跳转到 B 网站，授权用户数据给 A 网站使用。下面就是 A 网站跳转 B 网站的一个示意链接。

```md
https://b.com/oauth/authorize?
      response_type=code&
      client_id=CLIENT_ID&
      redirect_uri=CALLBACK_URL&
      scope=read
```

上面 URL 中

- `response_type`参数表示要求返回授权码(code)
- `client_id`参数让B知道是谁在请求
- `redirect_uri`参数是B接受或拒绝请求后跳转的网址
- `scope`参数表示要求的授权范围（这里是只读read）

![img](/images/SpringCloud/17-2-OAuth/bg2019040902.jpg)

> 第二步：用户跳转后，B 网站会要求用户登录，然后询问是否同意给予 A 网站授权。用户表示同意，这时 B 网站就会跳回`redirect_uri`参数指定的网址。跳转时，会传回一个授权码，就像下面这样。

```md
https://a.com/callback?code=AUTHORIZATION_CODE
```

上面 URL 中，`code`参数就是授权码

![img](/images/SpringCloud/17-2-OAuth/bg2019040907.jpg)

> 第三步，A 网站拿到授权码以后，就可以在后端，向 B 网站请求令牌

```md
https://b.com/oauth/token?
     client_id=CLIENT_ID&
     client_secret=CLIENT_SECRET&
     grant_type=authorization_code&
     code=AUTHORIZATION_CODE&
     redirect_uri=CALLBACK_URL
```

上面的URL中

- `client_id`和`client_secret`参数用来让B确认A的身份
  - `client_sercet`参数是保密的，因此只能在后端发起请求
- `grant_type`的值是`AUTHORIZATION_CODE`，表示使用的授权方式是授权码
- `code`是第二步中拿到的授权码
- `redirect_uri`参数是令牌颁发后的回调网址

![img](/images/SpringCloud/17-2-OAuth/bg2019040904.jpg)

> 第四步，B网站收到请求后，就会颁发令牌，具体做法是向`rediect_uri`指定的网段，发送一段json数据

```json
{    
  "access_token":"ACCESS_TOKEN",
  "token_type":"bearer",
  "expires_in":2592000,
  "refresh_token":"REFRESH_TOKEN",
  "scope":"read",
  "uid":100101,
  "info":{...}
}
```

上面 JSON 数据中，`access_token`字段就是令牌，A 网站在后端拿到了。

![img](/images/SpringCloud/17-2-OAuth/bg2019040905.jpg)

### 方式二：隐藏式

有些 Web 应用是纯前端应用，没有后端。这时就不能用上面的方式了，必须将令牌储存在前端。**RFC 6749 就规定了第二种方式，允许直接向前端颁发令牌。这种方式没有授权码这个中间步骤，所以称为（授权码）"隐藏式"（implicit）。**

> 第一步，A 网站提供一个链接，要求用户跳转到 B 网站，授权用户数据给 A 网站使用。

```md
https://b.com/oauth/authorize?
      response_type=token&
      client_id=CLIENT_ID&
      redirect_uri=CALLBACK_URL&
      scope=read
```

上面 URL 中，`response_type`参数为`token`，表示要求直接返回令牌，其他几个参数和方式一致分别是声明自己的`id`和`uri`以及需要的`权限`

> 第二步，用户跳转到 B 网站，登录后同意给予 A 网站授权。这时，B 网站就会跳回`redirect_uri`参数指定的跳转网址，并且把令牌作为 URL 参数，传给 A 网站。

```md
https://a.com/callback#token=ACCESS_TOKEN
```

上面 URL 中，`token`参数就是令牌，A 网站因此直接在前端拿到令牌

注意，令牌的位置是 URL 锚点（fragment），而不是查询字符串（querystring），这是因为 OAuth 2.0 允许跳转网址是 HTTP 协议，因此存在"中间人攻击"的风险，而浏览器跳转时，锚点不会发到服务器，就减少了泄漏令牌的风险。

![img](/images/SpringCloud/17-2-OAuth/bg2019040906.jpg)

这种方式把令牌直接传给前端，是很不安全的。因此，只能用于一些安全要求不高的场景，并且令牌的有效期必须非常短，通常就是会话期间（session）有效，浏览器关掉，令牌就失效了。

### 方式三：密码式

**如果你高度信任某个应用，RFC 6749 也允许用户把用户名和密码，直接告诉该应用。该应用就使用你的密码，申请令牌，这种方式称为"密码式"（password）。**

> 第一步，A 网站要求用户提供 B 网站的用户名和密码。拿到以后，A 就直接向 B 请求令牌。

```md
https://oauth.b.com/token?
      grant_type=password&
      username=USERNAME&
      password=PASSWORD&
      client_id=CLIENT_ID
```

上面 URL 中，`grant_type`参数是授权方式，这里的`password`表示"密码式"，`username`和`password`是 B 的用户名和密码。

> 第二步，B 网站验证身份通过后，直接给出令牌。注意，这时不需要跳转，而是把令牌放在 JSON 数据里面，作为 HTTP 回应，A 因此拿到令牌。

这种方式需要用户给出自己的用户名/密码，显然风险很大，因此只适用于其他授权方式都无法采用的情况，而且必须是用户高度信任的应用。

### 方式四：凭证式

**最后一种方式是凭证式（client credentials），适用于没有前端的命令行应用，即在命令行下请求令牌。**

> 第一步，A 应用在命令行向 B 发出请求

```md
https://oauth.b.com/token?
      grant_type=client_credentials&
      client_id=CLIENT_ID&
      client_secret=CLIENT_SECRET
```

上面 URL 中，`grant_type`参数等于`client_credentials`表示采用凭证式，`client_id`和`client_secret`用来让 B 确认 A 的身份

> 第二步，B 网站验证通过以后，直接返回令牌。

这种方式给出的令牌，是针对第三方应用的，而不是针对用户的，即有可能多个用户共享同一个令牌

### 获取到令牌后的使用

> A 网站拿到令牌以后，就可以向 B 网站的 API 请求数据了

此时，每个发到 API 的请求，都必须带有令牌。具体做法是在请求的头信息，加上一个`Authorization`字段，令牌就放在这个字段里面

```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
"https://api.b.com"
```

上面命令中，`ACCESS_TOKEN`就是拿到的令牌。

### 更新令牌

> 令牌的有效期到了，如果让用户重新走一遍上面的流程，再申请一个新的令牌，很可能体验不好，而且也没有必要。OAuth 2.0 允许用户自动更新令牌

具体方法是，B 网站颁发令牌的时候，一次性颁发两个令牌，一个用于获取数据，另一个用于获取新的令牌（refresh token 字段）。令牌到期前，用户使用 refresh token 发一个请求，去更新令牌

```md
https://b.com/oauth/token?
      grant_type=refresh_token&
      client_id=CLIENT_ID&
      client_secret=CLIENT_SECRET&
      refresh_token=REFRESH_TOKEN
```

上面 URL 中

- `grant_type`参数为`refresh_token`表示要求更新令牌
- `client_id`参数和`client_secret`参数用于确认身份
- `refresh_token`参数就是用于更新令牌的令牌

B网站验证通过后，就会办法新的令牌

### 实例：使用GitHub来实现一个最简单的第三方登陆

所谓第三方登录，实质就是 OAuth 授权。

用户想要登录 A 网站，A 网站让用户提供第三方网站的数据，证明自己的身份。获取第三方网站的身份数据，就需要 OAuth 授权。

举例来说，A 网站允许 GitHub 登录，背后就是下面的流程。

> 1. A 网站让用户跳转到 GitHub。
> 2. GitHub 要求用户登录，然后询问"A 网站要求获得 xx 权限，你是否同意？"
> 3. 用户同意，GitHub 就会重定向回 A 网站，同时发回一个授权码。
> 4. A 网站使用授权码，向 GitHub 请求令牌。
> 5. GitHub 返回令牌.
> 6. A 网站使用令牌，向 GitHub 请求用户数据。

首先，我们通过前面的了解，已经知道一个应用要求OAuth授权，必须先到对方网站登记，让对方知道是谁在请求

所以，我们要先去GitHub[登记](https://github.com/settings/applications/new)一下

这样填写

![image-20220122132204686](/images/SpringCloud/17-2-OAuth/image-20220122132204686.png)

应用的名称随便填

主页 URL 填写`http://localhost:8080`

跳转网址填写 `http://localhost:8080/oauth/redirect`

提交表单以后，GitHub 应该会返回客户端 ID（client ID）和客户端密钥（client secret），这就是应用的身份识别码

![image-20220122132511389](/images/SpringCloud/17-2-OAuth/image-20220122132511389.png)

id： 5c87602a9e7c5818af38

secrect：06cc126ea698f7a931647aa1761f684efed603a6

接着，clone下阮一峰老师的下面这个仓库，这是一个Nodejs+Koa的仓库

```bash
git clone https://github.com/ruanyf/node-oauth-demo.git
cd node-oauth-demo
#自行使用yarn或者npm install安装
```

然后在`index.js`内填入你的clientID和clientSecret

以及`public/index.html`中的client_id改成你的

接着启动

```bash
node index.js
```

然后浏览器访问<http://localhost:8080/>

就能看到这个页面

![image-20220122135418708](/images/SpringCloud/17-2-OAuth/image-20220122135418708.png)

示例的首页很简单，就是一个链接，让用户跳转到 GitHub。

跳转的 URL 如下。

```md
https://github.com/login/oauth/authorize?
  client_id=你的client_id
  redirect_uri=http://localhost:8080/oauth/redirect
```

这个 URL 指向 GitHub 的 OAuth 授权网址，带有两个参数：`client_id`告诉 GitHub 谁在请求，`redirect_uri`是稍后跳转回来的网址

> 用户点击到了 GitHub，GitHub 会要求用户登录，确保是本人在操作。

你点击之后，会跳转到github

![image-20220122135555575](/images/SpringCloud/17-2-OAuth/image-20220122135555575.png)

这里同意授权

接着你就能看到

![image-20220122135652611](/images/SpringCloud/17-2-OAuth/image-20220122135652611.png)

```md
http://localhost:8080/oauth/redirect?
  code=授权码
```

后端收到这个请求以后，就拿到了授权码（`code`参数）

同时你的后端也能获取到对应的内容

然后看看这个时候后端的实现

```javascript
// 0. 你的对应的id和Secret
const clientID = ''
const clientSecret = ''

const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const axios = require('axios');

const app = new Koa();

const main = serve(path.join(__dirname + '/public'));

// 2.
const oauth = async ctx => {
  // 获取请求中的params参数 code
  const requestToken = ctx.request.query.code;
  // 打印code
  console.log('authorization code:', requestToken);
	
  // 3. 这里是精髓
  const tokenResponse = await axios({
    method: 'post',
      // 请求github给定的链接
    url: 'https://github.com/login/oauth/access_token?' +
      // 参数client_id和client_secret
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      //code是我们刚刚获取到的
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  });
	
  // 将结果保存在变量内 这里获取到的是用户的令牌
  const accessToken = tokenResponse.data.access_token;
   // 打印令牌
  console.log(`access token: ${accessToken}`);

    //再通过这个令牌请求github，获取对应的用户信息
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });
  // 打印用户信息
  console.log(result.data);
  const name = result.data.name;
   // 重定向到我们的html，并且附带上参数
  ctx.response.redirect(`/welcome.html?name=${name}`);
};

app.use(main);
// 1. 这里是刚刚github重定向的连接，调用了oauth这个方法
app.use(route.get('/oauth/redirect', oauth));

app.listen(8080);

```

然后你的浏览器中，就可以看到这样的内容

![image-20220122140647710](/images/SpringCloud/17-2-OAuth/image-20220122140647710.png)

并且在控制台上，能看到我们用户的相关信息

![image-20220122140716682](/images/SpringCloud/17-2-OAuth/image-20220122140716682.png)

拆解下

这里的关键是针对`/oauth/redirect`的请求，编写一个路由，完成 OAuth 认证。

```javascript
const oauth = async ctx => {
  // ...
};

app.use(route.get('/oauth/redirect', oauth));
```

上面代码中，`oauth`函数就是路由的处理函数。下面的代码都写在这个函数里面。

路由函数的第一件事，是从 URL 取出授权码。

```javascript
const requestToken = ctx.request.query.code;
```

接着，后端使用这个授权码，向 GitHub 请求令牌。

```javascript
const tokenResponse = await axios({
  method: 'post',
  url: 'https://github.com/login/oauth/access_token?' +
    `client_id=${clientID}&` +
    `client_secret=${clientSecret}&` +
    `code=${requestToken}`,
  headers: {
    accept: 'application/json'
  }
});
```

面代码中，GitHub 的令牌接口`https://github.com/login/oauth/access_token`需要提供三个参数。

> - `client_id`：客户端的 ID
> - `client_secret`：客户端的密钥
> - `code`：授权码

作为回应，GitHub 会返回一段 JSON 数据，里面包含了令牌`accessToken`。

```javascript
const accessToken = tokenResponse.data.access_token;
```

有了令牌以后，就可以向 API 请求数据了。

```javascript
const result = await axios({
  method: 'get',
  url: `https://api.github.com/user`,
  headers: {
    accept: 'application/json',
    Authorization: `token ${accessToken}`
  }
});
```

上面代码中，GitHub API 的地址是`https://api.github.com/user`，请求的时候必须在 HTTP 头信息里面带上令牌`Authorization: token 361507da`

然后，就可以拿到用户数据，得到用户的身份。

```javascript
const name = result.data.name;
ctx.response.redirect(`/welcome.html?name=${name}`);
```

### OAuth和单点登陆如何选择？

| 功能点             | SSO单点登录 | OAuth2.0 |
| ------------------ | ----------- | -------- |
| 统一认证           | 支持度高    | 支持度高 |
| 统一注销           | 支持度高    | 支持度低 |
| 多个系统会话一致性 | 强一致      | 弱一致   |
| 第三方应用授权管理 | 不支持      | 支持度高 |
| 自有系统授权管理   | 支持度高    | 支持度低 |
| Client级的权限校验 | 不支持      | 支持度高 |
| 集成简易度         | 比较简单    | 难度中等 |

按需选择即可

注：以上仅为在 Sa-Token 中两种技术的差异度比较，不同框架的实现可能略有差异，但整体思想是一致的。

## 使用Sa-OAuth搭建OAuth2-Server

之前的过程中，我们已经使用了github给我们提供的对应的接口

那么如何自己实现一个呢？

注意：OAuth2和单点登录之间选型是比较重要的，单点登录的特点就是说一个账户密码可以在多个地方登陆

虽然说OAuth2也可以通过密码式来这样做，但是就有了一种杀鸡焉用宰牛刀的感觉…

a-OAuth2 模块基于 [RFC-6749 标准](https://tools.ietf.org/html/rfc6749) 编写，基于不同的使用场景，OAuth2.0设计了四种模式：

1. 授权码（Authorization Code）：OAuth2.0标准授权步骤，Server端向Client端下放Code码，Client端再用Code码换取授权Token
2. 隐藏式（Implicit）：无法使用授权码模式时的备用选择，Server端使用URL重定向方式直接将Token下放到Client端页面
3. 密码式（Password）：Client直接拿着用户的账号密码换取授权Token
4. 客户端凭证（Client Credentials）：Server端针对Client级别的Token，代表应用自身的资源授权

![https://oss.dev33.cn/sa-token/doc/oauth2/sa-oauth2-setup.png](/images/SpringCloud/17-2-OAuth/sa-oauth2-setup.png)

### 准备工作

我们首先修改下Hosts文件

- WIndows `C:\windows\system32\drivers\etc\hosts`
- Linux `/etc/hosts`

方便之后的测试

```md
127.0.0.1 sa-oauth-server.com
127.0.0.1 sa-oauth-client.com
```

### 依赖准备

```xml
<dependencies>
    <!-- Sa-Token-OAuth2.0 模块 -->
    <dependency>
        <groupId>cn.dev33</groupId>
        <artifactId>sa-token-oauth2</artifactId>
        <version>1.28.0</version>
    </dependency>

    <!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ -->
    <dependency>
        <groupId>cn.dev33</groupId>
        <artifactId>sa-token-spring-boot-starter</artifactId>
        <version>1.28.0</version>
    </dependency>

    <!-- 提供Redis连接池 -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-pool2</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <!-- Sa-Token 整合 Redis （使用jackson序列化方式） -->
    <dependency>
        <groupId>cn.dev33</groupId>
        <artifactId>sa-token-dao-redis-jackson</artifactId>
        <version>1.28.0</version>
    </dependency>

    <!--        基础内容-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

### 配置文件

```yaml
server:
  port: 8001

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

### 开放服务-SaOAuth2TemplateImpl

路径：`template/SaOAuth2TemplateImpl`

```java
@Component
public class SaOAuth2TemplateImpl extends SaOAuth2Template {
    // 根据 id 获取 Client 信息
    @Override
    public SaClientModel getClientModel(String clientId) {
        // 此为模拟数据，真实环境需要从数据库查询
        if("1001".equals(clientId)) {
            return new SaClientModel()
                    .setClientId("10001")
                    .setClientSecret("aaaa-bbbb-cccc-dddd-eeee")
                    .setAllowUrl("*")
                    .setContractScope("userinfo");
        }
        return null;
    }

    // 根据ClientId 和 LoginId 获取openid
    @Override
    public String getOpenid(String clientId, Object loginId) {
        // 此为模拟数据，真实环境需要从数据库查询
        return "gr_SwoIN0MC1ewxHX_vfCW3BothWDZMMtx__";
    }

}
```

### 开放路由-SaOAuth2ServerController

```java
/**
 * Sa-OAuth2 Server端 控制器 
 */
@RestController
public class SaOAuth2ServerController {

    // 处理所有OAuth相关请求 
    @RequestMapping("/oauth2/*")
    public Object request() {
        System.out.println("------- 进入请求: " + SaHolder.getRequest().getUrl());
        return SaOAuth2Handle.serverRequest();
    }

    // Sa-OAuth2 定制化配置 
    @Autowired
    public void setSaOAuth2Config(SaOAuth2Config cfg) {
        cfg.
            // 配置：未登录时返回的View 
            setNotLoginView(() -> {
                String msg = "当前会话在SSO-Server端尚未登录，请先访问"
                            + "<a href='/oauth2/doLogin?name=sa&pwd=123456' target='_blank'> doLogin登录 </a>"
                            + "进行登录之后，刷新页面开始授权";
                return msg;
            }).
            // 配置：登录处理函数 
            setDoLoginHandle((name, pwd) -> {
                if("sa".equals(name) && "123456".equals(pwd)) {
                    StpUtil.login(10001);
                    return SaResult.ok();
                }
                return SaResult.error("账号名或密码错误");
            }).
            // 配置：确认授权时返回的View 
            setConfirmView((clientId, scope) -> {
                String msg = "<p>应用 " + clientId + " 请求授权：" + scope + "</p>"
                        + "<p>请确认：<a href='/oauth2/doConfirm?client_id=" + clientId + "&scope=" + scope + "' target='_blank'> 确认授权 </a></p>"
                        + "<p>确认之后刷新页面</p>";
                return msg;
            })
            ;
    }

    // 全局异常拦截  
    @ExceptionHandler
    public SaResult handlerException(Exception e) {
        e.printStackTrace(); 
        return SaResult.error(e.getMessage());
    }

}

```

### 访问测试

对，只要经过上面的配置就可以了…

由于暂未搭建Client端，我们可以使用Sa-Token官网作为重定向URL进行测试：

```md
http://sa-oauth-server.com:8001/oauth2/authorize?response_type=code&client_id=1001&redirect_uri=http://sa-token.dev33.cn/&scope=userinfo
```

由于首次访问，我们在OAuth-Server端暂未登录，会被转发到登录视图

![image-20220122145439501](/images/SpringCloud/17-2-OAuth/image-20220122145439501.png)

点击doLogin进行登录之后刷新页面，会提示我们确认授权

![sa-oauth2-server-login-view](/images/SpringCloud/17-2-OAuth/sa-oauth2-server-scope.png)

点击确认授权之后刷新页面，我们会被重定向至 redirect_uri 页面，并携带了code参数

![sa-oauth2-server-code](/images/SpringCloud/17-2-OAuth/sa-oauth2-server-code.png)





我们拿着code参数，访问以下地址：

```md
http://sa-oauth-server.com:8001/oauth2/token?grant_type=authorization_code&client_id=1001&client_secret=aaaa-bbbb-cccc-dddd-eeee&code=你刚刚获取到的code
```

就可以获取如下内容： `Access-Token`、`Refresh-Token`、`openid`等授权信息

![image-20220122150139471](/images/SpringCloud/17-2-OAuth/image-20220122150139471.png)

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "access_token": "nKmkSgOkDLWnoBz9ssnapiqvSet3LKNd7bYn0RDz1deZGwztJmkSzDUxHRkJ",
        "refresh_token": "EvPoUaxy7Vs4eZQISi1bEU2YKxmyZBFilZ8msfjvH98EsEccYNqnRHveZ7AX",
        "expires_in": 7199,
        "refresh_expires_in": 2591999,
        "client_id": "1001",
        "scope": "userinfo",
        "openid": "gr_SwoIN0MC1ewxHX_vfCW3BothWDZMMtx__"
    }
}
```

接着就可以用这个做很多事情了..

## API列表

### 方式一：授权码

#### 获取获取授权码

根据以下格式构建URL，引导用户访问 （复制时请注意删减掉相应空格和换行符）

```md
http://sa-oauth-server.com:8001/oauth2/authorize
    ?response_type=code
    &client_id={value}
    &redirect_uri={value}
    &scope={value}
    $state={value}
```

参数详解：

| 参数          | 是否必填 | 说明                                                |
| ------------- | -------- | --------------------------------------------------- |
| response_type | 是       | 返回类型，这里请填写：code                          |
| client_id     | 是       | 应用id                                              |
| redirect_uri  | 是       | 用户确认授权后，重定向的url地址                     |
| scope         | 否       | 具体请求的权限，多个用逗号隔开                      |
| state         | 否       | 随机值，此参数会在重定向时追加到url末尾，不填不追加 |

注意点：

1. 如果用户在Server端尚未登录：会被转发到登录视图，你可以参照文档或官方示例自定义登录页面
2. 如果scope参数为空，或者请求的权限用户近期已确认过，则无需用户再次确认，达到静默授权的效果，否则需要用户手动确认，服务器才可以下放code授权码

用户确认授权之后，会被重定向至`redirect_uri`，并追加code参数与state参数，形如：

```md
redirect_uri?code={code}&state={state}
```

Code授权码具有以下特点：

1. 每次授权产生的Code码都不一样
2. Code码用完即废，不能二次使用
3. 一个Code的有效期默认为五分钟，超时自动作废
4. 每次授权产生新Code码，会导致旧Code码立即作废，即使旧Code码尚未使用

#### 根据授权码获取access-token

获得Code码后，我们可以通过以下接口，获取到用户的`Access-Token`、`Refresh-Token`、`openid`等关键信息

```md
http://sa-oauth-server.com:8001/oauth2/token
    ?grant_type=authorization_code
    &client_id={value}
    &client_secret={value}
    &code={value}
```

参数详解：

| 参数          | 是否必填 | 说明                                     |
| ------------- | -------- | ---------------------------------------- |
| grant_type    | 是       | 授权类型，这里请填写：authorization_code |
| client_id     | 是       | 应用id                                   |
| client_secret | 是       | 应用秘钥                                 |
| code          | 是       | 步骤1.1中获取到的授权码                  |

接口返回示例：

```json
{
    "code": 200,    // 200表示请求成功，非200标识请求失败, 以下不再赘述 
    "msg": "ok",
    "data": {
        "access_token": "7Ngo1Igg6rieWwAmWMe4cxT7j8o46mjyuabuwLETuAoN6JpPzPO2i3PVpEVJ",    
        // Access-Token值
        "refresh_token": "ZMG7QbuCVtCIn1FAJuDbgEjsoXt5Kqzii9zsPeyahAmoir893ARA4rbmeR66",    
        // Refresh-Token值
        "expires_in": 7199,                 
        // Access-Token剩余有效期，单位秒  
        "refresh_expires_in": 2591999,      
        // Refresh-Token剩余有效期，单位秒  
        "client_id": "1001",                
        // 应用id
        "scope": "userinfo",                
        // 此令牌包含的权限
        "openid": "gr_SwoIN0MC1ewxHX_vfCW3BothWDZMMtx__"     
        // openid 
    }
}

```

#### 刷新Token

Access-Token的有效期较短，如果每次过期都需要重新授权的话，会比较影响用户体验，因此我们可以在后台通过`Refresh-Token` 刷新 `Access-Token`

```md
http://sa-oauth-server.com:8001/oauth2/refresh
    ?grant_type=refresh_token
    &client_id={value}
    &client_secret={value}
    &refresh_token={value}
```

参数详解：

| 参数          | 是否必填 | 说明                                |
| ------------- | -------- | ----------------------------------- |
| grant_type    | 是       | 授权类型，这里请填写：refresh_token |
| client_id     | 是       | 应用id                              |
| client_secret | 是       | 应用秘钥                            |
| refresh_token | 是       | 步骤1.2中获取到的`Refresh-Token`值  |

#### 在Access-Token过期前主动将其回收

> 也就是回收Token，如果需要的话：

```md
http://sa-oauth-server.com:8001/oauth2/revoke
    ?client_id={value}
    &client_secret={value}
    &access_token={value}
```

参数详解：

| 参数          | 是否必填 | 说明                              |
| ------------- | -------- | --------------------------------- |
| client_id     | 是       | 应用id                            |
| client_secret | 是       | 应用秘钥                          |
| access_token  | 是       | 步骤1.2中获取到的`Access-Token`值 |

返回值样例：

```json
{
    "code": 200,
    "msg": "ok",
    "data": null
}
```

#### 根据 Access-Token 获取相应用户的账号信息

> 注：此接口为官方仓库模拟接口，正式项目中大家可以根据此样例，自定义需要的接口及参数

```md
http://sa-oauth-server.com:8001/oauth2/userinfo?access_token={value}
```

返回值：

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "nickname": "shengzhang_",         // 账号昵称
        "avatar": "http://xxx.com/1.jpg",  // 头像地址
        "age": "18",                       // 年龄
        "sex": "男",                       // 性别
        "address": "山东省 青岛市 城阳区"   // 所在城市 
    }
}
```

#### 方式二：隐藏式

根据以下格式构建URL，引导用户访问：

```md
http://sa-oauth-server.com:8001/oauth2/authorize
    ?response_type=token
    &client_id={value}
    &redirect_uri={value}
    &scope={value}
    $state={value}
```

参数详解：

| 参数          | 是否必填 | 说明                                                |
| ------------- | -------- | --------------------------------------------------- |
| response_type | 是       | 返回类型，这里请填写：token                         |
| client_id     | 是       | 应用id                                              |
| redirect_uri  | 是       | 用户确认授权后，重定向的url地址                     |
| scope         | 否       | 具体请求的权限，多个用逗号隔开                      |
| state         | 否       | 随机值，此参数会在重定向时追加到url末尾，不填不追加 |

此模式会越过授权码的步骤，直接返回Access-Token到前端页面，形如：

```md
redirect_uri#token=xxxx-xxxx-xxxx-xxxx
```

#### 方式三：密码式

首先在Client端构建表单，让用户输入Server端的账号和密码，然后在Client端访问接口

```md
http://sa-oauth-server.com:8001/oauth2/token
    ?grant_type=password
    &client_id={value}
    &username={value}
    &password={value}复制到剪贴板错误复制成功12345
```

参数详解：

参数详解：

| 参数       | 是否必填 | 说明                           |
| ---------- | -------- | ------------------------------ |
| grant_type | 是       | 返回类型，这里请填写：password |
| client_id  | 是       | 应用id                         |
| username   | 是       | 用户的Server端账号             |
| password   | 是       | 用户的Server端密码             |
| scope      | 否       | 具体请求的权限，多个用逗号隔开 |

接口返回示例：

```json
{
    "code": 200,    // 200表示请求成功，非200标识请求失败, 以下不再赘述 
    "msg": "ok",
    "data": {
        "access_token": "7Ngo1Igg6rieWwAmWMe4cxT7j8o46mjyuabuwLETuAoN6JpPzPO2i3PVpEVJ",     // Access-Token值
        "refresh_token": "ZMG7QbuCVtCIn1FAJuDbgEjsoXt5Kqzii9zsPeyahAmoir893ARA4rbmeR66",    // Refresh-Token值
        "expires_in": 7199,                 // Access-Token剩余有效期，单位秒  
        "refresh_expires_in": 2591999,      // Refresh-Token剩余有效期，单位秒  
        "client_id": "1001",                // 应用id
        "scope": "",                        // 此令牌包含的权限
        "openid": "gr_SwoIN0MC1ewxHX_vfCW3BothWDZMMtx__"     // openid 
    }
}
```

#### 方式四：凭证式

以上三种模式获取的都是用户的 `Access-Token`，代表用户对第三方应用的授权， 在OAuth2.0中还有一种针对 Client级别的授权， 即：`Client-Token`，代表应用自身的资源授权

在Client端的后台访问以下接口：

```md
http://sa-oauth-server.com:8001/oauth2/client_token
    ?grant_type=client_credentials
    &client_id={value}
    &client_secret={value}
```

参数详解：

| 参数          | 是否必填 | 说明                                     |
| ------------- | -------- | ---------------------------------------- |
| grant_type    | 是       | 返回类型，这里请填写：client_credentials |
| client_id     | 是       | 应用id                                   |
| client_secret | 是       | 应用秘钥                                 |
| scope         | 否       | 申请权限                                 |

接口返回值样例：

```js
{
    "code": 200,
    "msg": "ok",
    "data": {
        "client_token": "HmzPtaNuIqGrOdudWLzKJRSfPadN497qEJtanYwE7ZvHQWDy0jeoZJuDIiqO",    // Client-Token 值
        "expires_in": 7199,     // Token剩余有效时间，单位秒 
        "client_id": "1001",    // 应用id
        "scope": null           // 包含权限 
    }
}
```

注：`Client-Token`具有延迟作废特性，即：在每次获取最新`Client-Token`的时候，旧`Client-Token`不会立即过期，而是作为`Past-Token`再次储存起来， 资源请求方只要携带其中之一便可通过Token校验，这种特性保证了在大量并发请求时不会出现“新旧Token交替造成的授权失效”， 保证了服务的高可用

## Sa-OAuth2模块常用方法

官方示例只提供了基本的授权流程，以及userinfo资源的开放，如果您需要开放更多的接口，则二次开发时用到以下相关API方法

```java
// 根据 id 获取 Client 信息, 如果 Client 为空，则抛出异常 
SaOAuth2Util.checkClientModel(clientId);

// 获取 Access-Token，如果Access-Token为空则抛出异常 
SaOAuth2Util.checkAccessToken(accessToken);

// 获取 Client-Token，如果Client-Token为空则抛出异常
SaOAuth2Util.checkClientToken(clientToken);

// 获取 Access-Token 所代表的LoginId
SaOAuth2Util.getLoginIdByAccessToken(accessToken);

// 校验：指定 Access-Token 是否具有指定 Scope
SaOAuth2Util.checkScope(accessToken, scopes);

// 根据 code码 生成 Access-Token 
SaOAuth2Util.generateAccessToken(code);

// 根据 Refresh-Token 生成一个新的 Access-Token
SaOAuth2Util.refreshAccessToken(refreshToken);

// 构建 Client-Token 
SaOAuth2Util.generateClientToken(clientId, scope);

// 回收 Access-Token 
SaOAuth2Util.revokeAccessToken(accessToken);

// 持久化：用户授权记录 
SaOAuth2Util.saveGrantScope(clientId, loginId, scope);

// 获取：Refresh-Token Model
SaOAuth2Util.getRefreshToken(refreshToken);

```

## 相关的配置表

| 参数名称            | 类型    | 默认值  | 说明                                                                      |
| ------------------- | ------- | ------- | ------------------------------------------------------------------------- |
| isCode              | Boolean | true    | 是否打开模式：授权码（Authorization Code）                                |
| isImplicit          | Boolean | false   | 是否打开模式：隐藏式（Implicit）                                          |
| isPassword          | Boolean | false   | 是否打开模式：密码式（Password）                                          |
| isClient            | Boolean | false   | 是否打开模式：凭证式（Client Credentials）                                |
| isNewRefresh        | Boolean | false   | 是否在每次 Refresh-Token 刷新 Access-Token 时，产生一个新的 Refresh-Token |
| codeTimeout         | long    | 300     | Code授权码 保存的时间(单位秒) 默认五分钟                                  |
| accessTokenTimeout  | long    | 7200    | Access-Token 保存的时间(单位秒) 默认两个小时                              |
| refreshTokenTimeout | long    | 2592000 | Refresh-Token 保存的时间(单位秒) 默认30 天                                |
| clientTokenTimeout  | long    | 7200    | Client-Token 保存的时间(单位秒) 默认两个小时                              |

配置示例：

```yaml
# Sa-Token 配置
sa-token: 
    token-name: satoken-server
    # OAuth2.0 配置 
    oauth2: 
        is-code: true
        is-implicit: true
        is-password: true
        is-client: true
```

