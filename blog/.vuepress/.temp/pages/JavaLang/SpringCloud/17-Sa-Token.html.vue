<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>因为SpringSecurity的OAuth2的教程并不是那么容易，并且比较旧…所以我选择了国人开发的这款鉴权系统</p>
<p><a href="https://sa-token.dev33.cn/doc/index.html#/" target="_blank" rel="noopener noreferrer">https://sa-token.dev33.cn/doc/index.html#/<ExternalLinkIcon/></a></p>
<p>看官方文档应该比看我的文章更容易懂一些..建议看官方的</p>
<p>这是一个学习成本超级低的框架，看一眼就非常喜欢..</p>
<h2 id="简单的单体应用" tabindex="-1"><a class="header-anchor" href="#简单的单体应用" aria-hidden="true">#</a> 简单的单体应用</h2>
<p>这里的全都非常重要，最好是看官方文档或者把这里的所有内容都看完</p>
<blockquote>
<p>下面内容中，根据标题确定重要程度，✨表示重要，✨✨表示非常重要，✨✨✨表示特别重要</p>
</blockquote>
<h3 id="✨依赖准备和配置文件" tabindex="-1"><a class="header-anchor" href="#✨依赖准备和配置文件" aria-hidden="true">#</a> ✨依赖准备和配置文件</h3>
<p>Spring Boot的版本理论应该无所谓，我这里2.6.2和2.4.1都可以成功</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/cn.dev33/sa-token-spring-boot-starter --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>这里开始全部都是按照官方文档来进行操作的</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
    <span class="token comment"># 端口</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8081</span>

<span class="token comment"># Sa-Token配置</span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span> 
    <span class="token comment"># token名称 (同时也是cookie名称)</span>
    <span class="token key atrule">token-name</span><span class="token punctuation">:</span> satoken
    <span class="token comment"># token有效期，单位s 默认30天, -1代表永不过期 </span>
    <span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">2592000</span>
    <span class="token comment"># token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒</span>
    <span class="token key atrule">activity-timeout</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token comment"># 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录) </span>
    <span class="token key atrule">is-concurrent</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token) </span>
    <span class="token key atrule">is-share</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token comment"># token风格</span>
    <span class="token key atrule">token-style</span><span class="token punctuation">:</span> uuid
    <span class="token comment"># 是否输出操作日志 </span>
    <span class="token key atrule">is-log</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="启动类和controller" tabindex="-1"><a class="header-anchor" href="#启动类和controller" aria-hidden="true">#</a> 启动类和Controller</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringSecurityApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SpringSecurityApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"启动成功，Sa-Token的配置如下 {}"</span><span class="token punctuation">,</span> <span class="token class-name">SaManager</span><span class="token punctuation">.</span><span class="token function">getConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Controller</p>
<p>这玩意爽就爽在，一个Stp和一个SaResult搞定所有内容…</p>
<p>​</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/acc"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginController</span> <span class="token punctuation">{</span>

    <span class="token comment">// 测试登录  ---- http://localhost:8081/acc/doLogin?name=zhang&amp;pwd=123456</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/doLogin"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">doLogin</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> pwd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 此处仅作模拟示例，真实项目需要从数据库中查询数据进行比对</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"zhang"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token string">"123456"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>pwd<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"登录成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"登录失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 查询登录状态  ---- http://localhost:8081/acc/isLogin</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/isLogin"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"是否登录："</span> <span class="token operator">+</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 查询 Token 信息  ---- http://localhost:8081/acc/tokenInfo</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/tokenInfo"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">tokenInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 测试注销  ---- http://localhost:8081/acc/logout</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/logout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="✨用户的权限的授予和获取" tabindex="-1"><a class="header-anchor" href="#✨用户的权限的授予和获取" aria-hidden="true">#</a> ✨用户的权限的授予和获取</h3>
<p>官方文档<a href="https://sa-token.dev33.cn/doc/index.html#/use/jur-auth" target="_blank" rel="noopener noreferrer">https://sa-token.dev33.cn/doc/index.html#/use/jur-auth<ExternalLinkIcon/></a></p>
<p>非常简单，实际生产中，我们的用户是拥有指定权限的，当然对应的权限也对应着相对的权限列表</p>
<p>所以根据官方文档，我们只需要创建一个类即可完成用户的权限查询及获取</p>
<p>注意：下方方法返回值是固定的，还并没有引入数据库</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StpInterfaceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">StpInterface</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 返回一个账号的所有权限码集合 就相当于是数据库内的权限的单独信息那样
     *
     * <span class="token keyword">@param</span> <span class="token parameter">loginId</span>
     * <span class="token keyword">@param</span> <span class="token parameter">loginType</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">getPermissionList</span><span class="token punctuation">(</span><span class="token class-name">Object</span> loginId<span class="token punctuation">,</span> <span class="token class-name">String</span> loginType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"getPermissionList====>loginId:{}\tloginType:{}"</span><span class="token punctuation">,</span> loginId<span class="token punctuation">,</span> loginType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"101"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"user-add"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"user-delete"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"user-update"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"user-get"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"article-get"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回一个角色拥有的权限标识集合（就相当于是数据库中的角色列表那样）
     *
     * <span class="token keyword">@param</span> <span class="token parameter">loginId</span>
     * <span class="token keyword">@param</span> <span class="token parameter">loginType</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">getRoleList</span><span class="token punctuation">(</span><span class="token class-name">Object</span> loginId<span class="token punctuation">,</span> <span class="token class-name">String</span> loginType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"getRoleList====>loginId:{}\tloginType:{}"</span><span class="token punctuation">,</span> loginId<span class="token punctuation">,</span> loginType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"super-admin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span>  list<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p>接着来写个Controller测试下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testAuth"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">testAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 判断：当前账号是否含有指定权限, 返回true或false</span>
    <span class="token comment">//        StpUtil.hasPermission("user-update");</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"判断当前账号是否拥有user-update权限：{}"</span><span class="token punctuation">,</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"user-update"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 校验：当前账号是否含有指定权限, 如果验证未通过，则抛出异常: NotPermissionException</span>
    <span class="token comment">//        StpUtil.checkPermission("user-update");</span>
    
    <span class="token comment">// 校验：当前账号是否含有指定权限 [指定多个，必须全部验证通过]</span>
    <span class="token comment">//        StpUtil.checkPermissionAnd("user-update", "user-delete");</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"当前账号是否指定的[user-update和user-delete]这两个权限：{}"</span><span class="token punctuation">,</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermissionAnd</span><span class="token punctuation">(</span><span class="token string">"user-update"</span><span class="token punctuation">,</span> <span class="token string">"user-delete"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//  校验：当前账号是否含有指定权限 [指定多个，只要其一验证通过即可]</span>
    <span class="token comment">//        StpUtil.checkPermissionOr("user-update", "user-delete");</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"当前账号是否指定的[user-update和user-delete]这两个权限的其中一个：{}"</span><span class="token punctuation">,</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermissionOr</span><span class="token punctuation">(</span><span class="token string">"user-update"</span><span class="token punctuation">,</span> <span class="token string">"user-delete"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//        ===========也可以通过角色来验证权限==========</span>

    <span class="token comment">// 判断：当前账号是否拥有指定角色, 返回true或false</span>
    <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"super-admin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"判断当前账号是否拥有super-admin角色：{}"</span><span class="token punctuation">,</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">"super-admin"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 校验：当前账号是否含有指定角色标识, 如果验证未通过，则抛出异常: NotRoleException</span>
    <span class="token comment">//        StpUtil.checkRole("super-admin");</span>

    <span class="token comment">// 校验：当前账号是否含有指定角色标识 [指定多个，必须全部验证通过]</span>
    <span class="token comment">//        StpUtil.checkRoleAnd("super-admin", "shop-admin");</span>

    <span class="token comment">// 校验：当前账号是否含有指定角色标识 [指定多个，只要其一验证通过即可]</span>
    <span class="token comment">//        StpUtil.checkRoleOr("super-admin", "shop-admin");</span>
    <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getRoleList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>可以看到，这个StpUtil是直接调用了我们刚刚的<code>StpInterfaceImpl</code>类，所以直接打印出来了该类中的内容</p>
<p><img src="/images/SpringCloud/17-Sa-Token/image-20220121154717209.png" alt="image-20220121154717209" loading="lazy"></p>
<p>前端中返回的内容</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">"code"</span><span class="token operator">:</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token property">"msg"</span><span class="token operator">:</span><span class="token string">"ok"</span><span class="token punctuation">,</span><span class="token property">"data"</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"admin"</span><span class="token punctuation">,</span><span class="token string">"super-admin"</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
<span class="token comment">// 因为我是只返回了角色信息，也可以通过getPermissionList来返回具体的权限信息给前端</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>官方文档中还给出了一个全局异常处理器</p>
<blockquote>
<p>你可以创建一个全局异常拦截器，统一返回给前端的格式，参考： <a href="https://gitee.com/dromara/sa-token/blob/master/sa-token-demo/sa-token-demo-springboot/src/main/java/com/pj/current/GlobalException.java" target="_blank" rel="noopener noreferrer">码云：GlobalException.java<ExternalLinkIcon/></a></p>
</blockquote>
<p>还有权限通配符</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 当拥有 user* 权限时</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"user-add"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// true</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"user-update"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// true</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"art-add"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// false</span>

<span class="token comment">// 当拥有 *-delete 权限时</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"user-add"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// false</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"user-delete"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// true</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"art-delete"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// true</span>

<span class="token comment">// 当拥有 *.js 权限时</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"index.js"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// true</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"index.css"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// false</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token string">"index.html"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// false</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>我曹，还贴心的给出了Vue的验证….</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>arr.indexOf(<span class="token punctuation">'</span>user:delete<span class="token punctuation">'</span>) > -1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="全局异常处理器" tabindex="-1"><a class="header-anchor" href="#全局异常处理器" aria-hidden="true">#</a> 全局异常处理器</h3>
<p>这里给出的是官方放出的</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>pj<span class="token punctuation">.</span>current</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ControllerAdvice</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ExceptionHandler</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ResponseBody</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">com<span class="token punctuation">.</span>pj<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">AjaxJson</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">cn<span class="token punctuation">.</span>dev33<span class="token punctuation">.</span>satoken<span class="token punctuation">.</span>exception<span class="token punctuation">.</span></span><span class="token class-name">DisableLoginException</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">cn<span class="token punctuation">.</span>dev33<span class="token punctuation">.</span>satoken<span class="token punctuation">.</span>exception<span class="token punctuation">.</span></span><span class="token class-name">NotLoginException</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">cn<span class="token punctuation">.</span>dev33<span class="token punctuation">.</span>satoken<span class="token punctuation">.</span>exception<span class="token punctuation">.</span></span><span class="token class-name">NotPermissionException</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">cn<span class="token punctuation">.</span>dev33<span class="token punctuation">.</span>satoken<span class="token punctuation">.</span>exception<span class="token punctuation">.</span></span><span class="token class-name">NotRoleException</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 全局异常处理 
 */</span>
<span class="token annotation punctuation">@ControllerAdvice</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GlobalException</span> <span class="token punctuation">{</span>

	<span class="token comment">// 全局异常拦截（拦截项目中的所有异常）</span>
	<span class="token annotation punctuation">@ResponseBody</span>
	<span class="token annotation punctuation">@ExceptionHandler</span>
	<span class="token keyword">public</span> <span class="token class-name">AjaxJson</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">,</span> <span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span>
			<span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

		<span class="token comment">// 打印堆栈，以供调试</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"全局异常---------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

		<span class="token comment">// 不同异常返回不同状态码 </span>
		<span class="token class-name">AjaxJson</span> aj <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">NotLoginException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>	<span class="token comment">// 如果是未登录异常</span>
			<span class="token class-name">NotLoginException</span> ee <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">NotLoginException</span><span class="token punctuation">)</span> e<span class="token punctuation">;</span>
			aj <span class="token operator">=</span> <span class="token class-name">AjaxJson</span><span class="token punctuation">.</span><span class="token function">getNotLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setMsg</span><span class="token punctuation">(</span>ee<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> 
		<span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">NotRoleException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>		<span class="token comment">// 如果是角色异常</span>
			<span class="token class-name">NotRoleException</span> ee <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">NotRoleException</span><span class="token punctuation">)</span> e<span class="token punctuation">;</span>
			aj <span class="token operator">=</span> <span class="token class-name">AjaxJson</span><span class="token punctuation">.</span><span class="token function">getNotJur</span><span class="token punctuation">(</span><span class="token string">"无此角色："</span> <span class="token operator">+</span> ee<span class="token punctuation">.</span><span class="token function">getRole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> 
		<span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">NotPermissionException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>	<span class="token comment">// 如果是权限异常</span>
			<span class="token class-name">NotPermissionException</span> ee <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">NotPermissionException</span><span class="token punctuation">)</span> e<span class="token punctuation">;</span>
			aj <span class="token operator">=</span> <span class="token class-name">AjaxJson</span><span class="token punctuation">.</span><span class="token function">getNotJur</span><span class="token punctuation">(</span><span class="token string">"无此权限："</span> <span class="token operator">+</span> ee<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> 
		<span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">DisableLoginException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>	<span class="token comment">// 如果是被封禁异常</span>
			<span class="token class-name">DisableLoginException</span> ee <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DisableLoginException</span><span class="token punctuation">)</span> e<span class="token punctuation">;</span>
			aj <span class="token operator">=</span> <span class="token class-name">AjaxJson</span><span class="token punctuation">.</span><span class="token function">getNotJur</span><span class="token punctuation">(</span><span class="token string">"账号被封禁："</span> <span class="token operator">+</span> ee<span class="token punctuation">.</span><span class="token function">getDisableTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"秒后解封"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> 
		<span class="token keyword">else</span> <span class="token punctuation">{</span>	<span class="token comment">// 普通异常, 输出：500 + 异常信息 </span>
			aj <span class="token operator">=</span> <span class="token class-name">AjaxJson</span><span class="token punctuation">.</span><span class="token function">getError</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		
		<span class="token comment">// 返回给前端</span>
		<span class="token keyword">return</span> aj<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><h3 id="注销、下线和账号封禁" tabindex="-1"><a class="header-anchor" href="#注销、下线和账号封禁" aria-hidden="true">#</a> 注销、下线和账号封禁</h3>
<p>这里要说的一点是，我们之前的登陆接口中</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/doLogin"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">doLogin</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> pwd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 此处仅作模拟示例，真实项目需要从数据库中查询数据进行比对</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"zhang"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token string">"123456"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>pwd<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里的id实际上应该是由数据库内获取的,所以每个用户的都得是唯一且不重复的</span>
        <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"登录成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"登录失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote>
<p>强制注销</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                    <span class="token comment">// 强制指定账号注销下线 </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token string">"PC"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>              <span class="token comment">// 强制指定账号指定端注销下线 </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">logoutByTokenValue</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 强制指定 Token 注销下线 </span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote>
<p>踢人下线</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">kickout</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                    <span class="token comment">// 将指定账号踢下线 </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">kickout</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token string">"PC"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>              <span class="token comment">// 将指定账号指定端踢下线</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">kickoutByTokenValue</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 将指定 Token 踢下线</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>强制注销 和 踢人下线 的区别在于：</p>
<ul>
<li>强制注销等价于对方主动调用了注销方法，再次访问会提示：Token无效。</li>
<li>踢人下线不会清除Token信息，而是将其打上特定标记，再次访问会提示：Token已被踢下线。</li>
</ul>
<blockquote>
<p>账号封禁</p>
<p>官方原文：对于违规账号，有时候我们仅仅将其踢下线还是远远不够的，我们还需要对其进行<strong>账号封禁</strong>防止其再次登录</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 封禁指定账号 </span>
<span class="token comment">// 参数一：账号id</span>
<span class="token comment">// 参数二：封禁时长，单位：秒  (86400秒=1天，此值为-1时，代表永久封禁)</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token number">86400</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 获取指定账号是否已被封禁 (true=已被封禁, false=未被封禁) </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isDisable</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 获取指定账号剩余封禁时间，单位：秒</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getDisableTime</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 解除封禁</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">untieDisable</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><blockquote>
<p>注意：</p>
<p>对于正在登录的账号，对其账号封禁时并不会使其立刻注销
如果需要将其封禁后立即掉线，可采取先踢再封禁的策略，例如：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 先踢下线</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">kickout</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// 再封禁账号</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token number">86400</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="✨注解式鉴权" tabindex="-1"><a class="header-anchor" href="#✨注解式鉴权" aria-hidden="true">#</a> ✨注解式鉴权</h3>
<p>有注解就方便很多了</p>
<p>首先要注册一个拦截器，也就是在Spring Web中新增一个</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span>
            <span class="token keyword">new</span> <span class="token class-name">SaAnnotationInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 注册注解拦截器，并排除不需要注解鉴权的接口地址 (与登录拦截器无关)</span>
        <span class="token comment">// 反正标配写法 这样写即可</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>然后就能获取如下注解了</p>
<ul>
<li><code>@SaCheckLogin</code>: 登录认证 —— 只有登录之后才能进入该方法</li>
<li><code>@SaCheckRole(&quot;admin&quot;)</code>: 角色认证 —— 必须具有指定角色标识才能进入该方法</li>
<li><code>@SaCheckPermission(&quot;user:add&quot;)</code>: 权限认证 —— 必须具有指定权限才能进入该方法</li>
<li><code>@SaCheckSafe</code>: 二级认证校验 —— 必须二级认证之后才能进入该方法</li>
<li><code>@SaCheckBasic</code>: HttpBasic认证 —— 只有通过 Basic 认证后才能进入该方法</li>
</ul>
<p>上面的注解可以写在类上，也可以写在方法上（仅限Controller标注的）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 登录认证：只有登录之后才能进入该方法 </span>
<span class="token annotation punctuation">@SaCheckLogin</span>                        
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"info"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"查询用户信息"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 角色认证：必须具有指定角色才能进入该方法 </span>
<span class="token annotation punctuation">@SaCheckRole</span><span class="token punctuation">(</span><span class="token string">"super-admin"</span><span class="token punctuation">)</span>        
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"add"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"用户增加"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 权限认证：必须具有指定权限才能进入该方法 </span>
<span class="token annotation punctuation">@SaCheckPermission</span><span class="token punctuation">(</span><span class="token string">"user-add"</span><span class="token punctuation">)</span>        
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"add"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"用户增加"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 二级认证：必须二级认证之后才能进入该方法 </span>
<span class="token annotation punctuation">@SaCheckSafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>        
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"add"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"用户增加"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Http Basic 认证：只有通过 Basic 认证后才能进入该方法 </span>
<span class="token annotation punctuation">@SaCheckBasic</span><span class="token punctuation">(</span>account <span class="token operator">=</span> <span class="token string">"sa:123456"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"add"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"用户增加"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><blockquote>
<p><code>@SaCheckRole</code>与<code>@SaCheckPermission</code>注解可设置校验模式，例如：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 注解式鉴权：只要具有其中一个权限即可通过校验 </span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"atJurOr"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SaCheckPermission</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"user-add"</span><span class="token punctuation">,</span> <span class="token string">"user-all"</span><span class="token punctuation">,</span> <span class="token string">"user-delete"</span><span class="token punctuation">}</span><span class="token punctuation">,</span> mode <span class="token operator">=</span> <span class="token class-name">SaMode</span><span class="token punctuation">.</span>OR<span class="token punctuation">)</span>        
<span class="token keyword">public</span> <span class="token class-name">AjaxJson</span> <span class="token function">atJurOr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">AjaxJson</span><span class="token punctuation">.</span><span class="token function">getSuccessData</span><span class="token punctuation">(</span><span class="token string">"用户信息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>orRole 字段代表权限认证未通过时的次要选择，两者只要其一认证成功即可通过校验，其有三种写法：</p>
<ul>
<li>写法一：<code>orRole = &quot;admin&quot;</code>，代表需要拥有角色 admin 。</li>
<li>写法二：<code>orRole = {&quot;admin&quot;, &quot;manager&quot;, &quot;staff&quot;}</code>，代表具有三个角色其一即可。</li>
<li>写法三：<code>orRole = {&quot;admin, manager, staff&quot;}</code>，代表必须同时具有三个角色。</li>
</ul>
<blockquote>
<p>注意，以上方法并不能用于Service层面</p>
<p>如果一定要用于@Service或者其他的，可以参照官方提供的<a href="https://sa-token.dev33.cn/doc/index.html#/plugin/aop-at" target="_blank" rel="noopener noreferrer">AOP注解鉴权<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="✨✨路由拦截器鉴权-配置式鉴权" tabindex="-1"><a class="header-anchor" href="#✨✨路由拦截器鉴权-配置式鉴权" aria-hidden="true">#</a> ✨✨路由拦截器鉴权（配置式鉴权）</h3>
<p>适用场景：</p>
<blockquote>
<p>项目中所有接口均需要登录认证，只有'登录接口'本身对外开放</p>
</blockquote>
<p>最基本的使用非常简单</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaTokenConfigure</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>
    <span class="token comment">// 注册拦截器</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 注册Sa-Token的路由拦截器 注意 光注册这个并不能实现注解式鉴权</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SaRouteInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">excludePathPatterns</span><span class="token punctuation">(</span><span class="token string">"/user/doLogin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><blockquote>
<p>以上代码，我们注册了一个登录认证拦截器，并且排除了<code>/user/doLogin</code>接口用来开放登录（除了<code>/user/doLogin</code>以外的所有接口都需要登录才能访问）
那么我们如何进行权限认证拦截呢，且往下看</p>
</blockquote>
<ol>
<li>你可以使用函数式编程自定义认证规则，例如：</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaTokenConfigure</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 注册路由拦截器，自定义认证规则 </span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SaRouteInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token comment">// 根据路由划分模块，不同模块不同鉴权 </span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/user/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/admin/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/goods/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"goods"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/orders/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"orders"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/notice/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"notice"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/comment/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"comment"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>SaRouter.match() 匹配函数有两个参数：</p>
<ul>
<li>参数一：要匹配的path路由。</li>
<li>参数二：要执行的校验函数。</li>
</ul>
<p>在校验函数内不只可以使用 <code>StpUtil.checkPermission(&quot;xxx&quot;)</code> 进行权限校验，你还可以写任意代码，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        这个是让Controller可以使用注解</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span>
                <span class="token keyword">new</span> <span class="token class-name">SaAnnotationInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">//        注册路由拦截器，自定义认证规则</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SaRouteInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> handler<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token comment">// 登录认证 -- 拦截所有路由，并排除/user/doLogin 用于开放登录</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">,</span> <span class="token string">"/user/doLogin"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 角色认证 -- 拦截以 admin 开头的路由，必须具备 admin 角色或者 super-admin 角色才可以通过认证</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/admin/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkRoleOr</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">,</span> <span class="token string">"super-admin"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 权限认证 -- 不同模块认证不同权限</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/user/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/admin/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/goods/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"goods"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/orders/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"orders"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/notice/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"notice"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/comment/**"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkPermission</span><span class="token punctuation">(</span><span class="token string">"comment"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 甚至你可以随意的写一个打印语句（这里演示下匿名内部类的写法 可以看到是返回一个void）</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">SaParamFunction</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SaRouterStaff</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token annotation punctuation">@Override</span>
                <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SaRouterStaff</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"----啦啦啦----"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 连缀写法</span>
            <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>r <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"----啦啦啦----"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p>除了上述示例的 path 路由匹配，还可以根据很多其它特征进行匹配，以下是所有可匹配的特征：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 基础写法样例：匹配一个path，执行一个校验函数 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/user/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 根据 path 路由匹配   ——— 支持写多个path，支持写 restful 风格路由 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/user/**"</span><span class="token punctuation">,</span> <span class="token string">"/goods/**"</span><span class="token punctuation">,</span> <span class="token string">"/art/get/{id}"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span> <span class="token comment">/* 要执行的校验函数 */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 根据 path 路由排除匹配 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">notMatch</span><span class="token punctuation">(</span><span class="token string">"*.html"</span><span class="token punctuation">,</span> <span class="token string">"*.css"</span><span class="token punctuation">,</span> <span class="token string">"*.js"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span> <span class="token comment">/* 要执行的校验函数 */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 根据请求类型匹配 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token class-name">SaHttpMethod</span><span class="token punctuation">.</span>GET<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span> <span class="token comment">/* 要执行的校验函数 */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 根据一个 boolean 条件进行匹配 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span> <span class="token comment">/* 要执行的校验函数 */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 根据一个返回 boolean 结果的lambda表达式匹配 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span> r <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span> <span class="token comment">/* 要执行的校验函数 */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 多个条件一起使用 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token class-name">SaHttpMethod</span><span class="token punctuation">.</span>GET<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span> <span class="token comment">/* 要执行的校验函数 */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 可以无限连缀下去 </span>
<span class="token class-name">SaRouter</span>
    <span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token class-name">SaHttpMethod</span><span class="token punctuation">.</span>GET<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/admin/**"</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/user/**"</span><span class="token punctuation">)</span> 
    <span class="token punctuation">.</span><span class="token function">notMatch</span><span class="token punctuation">(</span><span class="token string">"/**/*.js"</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">notMatch</span><span class="token punctuation">(</span><span class="token string">"/**/*.css"</span><span class="token punctuation">)</span>
    <span class="token comment">// ....</span>
    <span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span> <span class="token comment">/* 只有上述所有条件都匹配成功，才会执行最后的check校验函数 */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><blockquote>
<p>使用 <code>SaRouter.stop()</code> 可以提前退出匹配链，例：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SaRouteInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> handler<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
    <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>r <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"进入1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>r <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"进入2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>r <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"进入3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如上示例，代码运行至第2条匹配链时，会在stop函数处提前退出整个匹配函数，从而忽略掉剩余的所有match匹配</p>
<blockquote>
<p>除了<code>stop()</code>函数，<code>SaRouter</code>还提供了 <code>back()</code> 函数，用于：停止匹配，结束执行，直接向前端返回结果</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 执行back函数后将停止匹配，也不会进入Controller，而是直接将 back参数 作为返回值输出到前端</span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/user/back"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token string">"参数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>stop() 与 back() 函数的区别在于：</p>
<ul>
<li><code>SaRouter.stop()</code> 会停止匹配，进入Controller。</li>
<li><code>SaRouter.back()</code> 会停止匹配，直接返回结果到前端。</li>
</ul>
<blockquote>
<p>而且还有作用域：</p>
<p>free() 的作用是：打开一个独立的作用域，使内部的 stop() 不再一次性跳出整个 Auth 函数，而是仅仅跳出当前 free 作用域。</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 进入 free 独立作用域 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">free</span><span class="token punctuation">(</span>r <span class="token operator">-></span> <span class="token punctuation">{</span>
    <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/a/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span><span class="token comment">/* --- */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/a/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span><span class="token comment">/* --- */</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/a/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span><span class="token comment">/* --- */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 执行 stop() 函数跳出 free 后继续执行下面的 match 匹配 </span>
<span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span><span class="token comment">/* --- */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="✨user-session" tabindex="-1"><a class="header-anchor" href="#✨user-session" aria-hidden="true">#</a> ✨User-Session</h3>
<blockquote>
<p>提起Session，你脑海中最先浮现的可能就是 JSP 中的 HttpSession，它的工作原理可以大致总结为：</p>
<p>客户端每次与服务器第一次握手时，会被强制分配一个 <code>[唯一id]</code> 作为身份标识，注入到 Cookie 之中， 之后每次发起请求时，客户端都要将它提交到后台，服务器根据 <code>[唯一id]</code> 找到每个请求专属的Session对象，维持会话</p>
</blockquote>
<p>这种机制简单粗暴，却有N多明显的缺点：</p>
<ol>
<li>同一账号分别在PC、APP登录，会被识别为两个不相干的会话</li>
<li>一个设备难以同时登录两个账号</li>
<li>每次一个新的客户端访问服务器时，都会产生一个新的Session对象，即使这个客户端只访问了一次页面</li>
<li>在不支持Cookie的客户端下，这种机制会失效</li>
</ol>
<p><strong>Sa-Token Session</strong>可以理解为 HttpSession 的<strong>升级版</strong>：</p>
<ol>
<li>Sa-Token只在调用<code>StpUtil.login(id)</code>登录会话时才会产生Session，不会为每个陌生会话都产生Session，节省性能</li>
<li>在登录时产生的Session，是分配给账号id的，而不是分配给指定客户端的，也就是说在PC、APP上登录的同一账号所得到的Session也是同一个，所以两端可以非常轻松的同步数据</li>
<li>Sa-Token支持Cookie、Header、body三个途径提交Token，而不是仅限于Cookie</li>
<li>由于不强依赖Cookie，所以只要将Token存储到不同的地方，便可以做到一个客户端同时登录多个账号</li>
</ol>
<p>这种为账号id分配的Session，它有一个好听的名字：<code>User-Session</code>，可以通过如下方式操作它：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 获取当前会话的 User-Session </span>
<span class="token class-name">SaSession</span> session <span class="token operator">=</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 从 User-Session 中读取、写入数据 </span>
session<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
session<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"张三"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>它对应的API如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 获取当前账号id的Session (必须是登录后才能调用)</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取当前账号id的Session, 并决定在Session尚未创建时，是否新建并返回</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取账号id为10001的Session</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSessionByLoginId</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取账号id为10001的Session, 并决定在Session尚未创建时，是否新建并返回</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSessionByLoginId</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取SessionId为xxxx-xxxx的Session, 在Session尚未创建时, 返回null </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSessionBySessionId</span><span class="token punctuation">(</span><span class="token string">"xxxx-xxxx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="✨token-session" tabindex="-1"><a class="header-anchor" href="#✨token-session" aria-hidden="true">#</a> ✨Token-Session</h3>
<p>随着业务推进，我们还可能会遇到一些需要数据隔离的场景：</p>
<blockquote>
<p>指定客户端超过两小时无操作就自动下线，如果两小时内有操作，就再续期两小时，直到新的两小时无操作</p>
</blockquote>
<p>那么这种请求访问记录应该存储在哪里呢？放在 User-Session 里吗？</p>
<p>可别忘了，PC端和APP端可是共享的同一个 User-Session ，如果把数据放在这里， 那就意味着，即使用户在PC端一直无操作，只要手机上用户还在不间断的操作，那PC端也不会过期！</p>
<p>解决这个问题的关键在于，虽然两个设备登录的是同一账号，但是两个它们得到的token是不一样的， Sa-Token针对会话登录，不仅为账号id分配了<code>User-Session</code>，同时还为每个token分配了不同的<code>Token-Session</code></p>
<p>不同的设备端，哪怕登录了同一账号，只要它们得到的token不一致，它们对应的 <code>Token-Session</code> 就不一致，这就为我们不同端的独立数据读写提供了支持：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 获取当前会话的 Token-Session </span>
<span class="token class-name">SaSession</span> session <span class="token operator">=</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 从 Token-Session 中读取、写入数据 </span>
session<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
session<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"张三"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>对应的api如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 获取当前token的专属Session </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取指定token的专属Session </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenSessionByToken</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="✨custom-session" tabindex="-1"><a class="header-anchor" href="#✨custom-session" aria-hidden="true">#</a> ✨Custom-Session</h3>
<p>一句话概括：我们自己定义的一个可以全局通用的Session</p>
<p>除了以上两种Session，Sa-Token还提供了第三种Session，那就是：<code>Custom-Session</code>，你可以将其理解为：自定义Session</p>
<p>Custom-Session不依赖特定的 账号id 或者 token，而是依赖于你提供的SessionId：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 获取指定key的 Custom-Session </span>
<span class="token class-name">SaSession</span> session <span class="token operator">=</span> <span class="token class-name">SaSessionCustomUtil</span><span class="token punctuation">.</span><span class="token function">getSessionById</span><span class="token punctuation">(</span><span class="token string">"goods-10001"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 从 Custom-Session 中读取、写入数据 </span>
session<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
session<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"张三"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>只要两个自定义Session的Id一致，它们就是同一个Session</p>
<p>API</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 查询指定key的Session是否存在</span>
<span class="token class-name">SaSessionCustomUtil</span><span class="token punctuation">.</span><span class="token function">isExists</span><span class="token punctuation">(</span><span class="token string">"goods-10001"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取指定key的Session，如果没有，则新建并返回</span>
<span class="token class-name">SaSessionCustomUtil</span><span class="token punctuation">.</span><span class="token function">getSessionById</span><span class="token punctuation">(</span><span class="token string">"goods-10001"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取指定key的Session，如果没有，第二个参数决定是否新建并返回  </span>
<span class="token class-name">SaSessionCustomUtil</span><span class="token punctuation">.</span><span class="token function">getSessionById</span><span class="token punctuation">(</span><span class="token string">"goods-10001"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   

<span class="token comment">// 删除指定key的Session</span>
<span class="token class-name">SaSessionCustomUtil</span><span class="token punctuation">.</span><span class="token function">deleteSessionById</span><span class="token punctuation">(</span><span class="token string">"goods-10001"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="✨session结构模型图" tabindex="-1"><a class="header-anchor" href="#✨session结构模型图" aria-hidden="true">#</a> ✨Session结构模型图</h3>
<p>三种Session创建时机：</p>
<ul>
<li><code>User-Session</code>: 指的是框架为每个 账号id 分配的 Session
<ul>
<li>也就是说，当我们调用<code>StpUtil.login(id)</code>会产生它，同一个id下，这个User-Session是互通的</li>
</ul>
</li>
<li><code>Token-Session</code>: 指的是框架为每个 token 分配的 Session
<ul>
<li>也就是，当上述的方法执行完毕后，会为当前访问的用户在创建User-Session的前提下</li>
<li>创建一个额外的Session，这个Session区分用户的系统（每个设备之间不互通）</li>
</ul>
</li>
<li><code>Custom-Session</code>: 指的是以一个 特定的值 作为SessionId，来分配的 Session
<ul>
<li>就是我们自定义的Session，相当于在JavaWeb中的全局上下文对象那样</li>
</ul>
</li>
</ul>
<p><strong>假设三个客户端登录同一账号，且配置了不共享token，那么此时的Session模型是：</strong></p>
<p><img src="/images/SpringCloud/17-Sa-Token/session-model3.png" alt="session-model" loading="lazy"></p>
<p>简而言之：</p>
<ul>
<li><code>User-Session</code> 以UserId为主，只要token指向的UserId一致，那么对应的Session对象就一致</li>
<li><code>Token-Session</code> 以token为主，只要token不同，那么对应的Session对象就不同</li>
<li><code>Custom-Session</code> 以特定的key为主，不同key对应不同的Session对象，同样的key指向同一个Session对象</li>
</ul>
<h3 id="✨✨获取到的session对象的操作" tabindex="-1"><a class="header-anchor" href="#✨✨获取到的session对象的操作" aria-hidden="true">#</a> ✨✨获取到的Session对象的操作</h3>
<blockquote>
<p>注意：</p>
<ol>
<li><code>SaSession</code> 与 <code>HttpSession</code> 没有任何关系，在<code>HttpSession</code>上写入的值，在<code>SaSession</code>中无法取出</li>
<li><code>HttpSession</code>并未被框架接管，在使用Sa-Token时，请在任何情况下均使用<code>SaSession</code>，不要使用<code>HttpSession</code></li>
</ol>
</blockquote>
<p>这个操作的时候，建议使用线程锁之类的锁下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 返回此Session的id </span>
session<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                          

<span class="token comment">// 返回此Session的创建时间 (时间戳) </span>
session<span class="token punctuation">.</span><span class="token function">getCreateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                  

<span class="token comment">// 在Session上获取一个值 </span>
session<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token char">'name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             

<span class="token comment">// 在Session上获取一个值，并指定取不到值时返回的默认值</span>
session<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token char">'name'</span><span class="token punctuation">,</span> <span class="token char">'zhang'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    

<span class="token comment">// 在Session上写入一个值 </span>
session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token char">'name'</span><span class="token punctuation">,</span> <span class="token char">'zhang'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    

<span class="token comment">// 在Session上移除一个值 </span>
session<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token char">'name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          

<span class="token comment">// 清空此Session的所有值 </span>
session<span class="token punctuation">.</span><span class="token function">clearAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                 

<span class="token comment">// 获取此Session是否含有指定key (返回true或false)</span>
session<span class="token punctuation">.</span><span class="token function">containsAttribute</span><span class="token punctuation">(</span><span class="token char">'name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        

<span class="token comment">// 获取此Session会话上所有key (返回Set&lt;String>)</span>
session<span class="token punctuation">.</span><span class="token function">attributeKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                  

<span class="token comment">// 返回此Session会话上的底层数据对象（如果更新map里的值，请调用session.update()方法避免产生脏数据）</span>
session<span class="token punctuation">.</span><span class="token function">getDataMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                     

<span class="token comment">// 将这个Session从持久库更新一下</span>
session<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                         

<span class="token comment">// 注销此Session会话 (从持久库删除此Session)</span>
session<span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                         

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><blockquote>
<p>由于Session存取值默认的类型都是Object，因此我们通常会写很多不必要类型转换代码
为了简化操作，Sa-Token自<code>v1.15.0</code>封装了存取值API的类型转换，你可以非常方便的调用以下方法：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 写值 </span>
session<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"zhang"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 写值 (只有在此key原本无值的时候才会写入)</span>
session<span class="token punctuation">.</span><span class="token function">setDefaultValue</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"zhang"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 取值</span>
session<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 取值 (指定默认值)</span>
session<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"&lt;defaultValue>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 取值 (转String类型)</span>
session<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 取值 (转int类型)</span>
session<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 取值 (转long类型)</span>
session<span class="token punctuation">.</span><span class="token function">getLong</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 取值 (转double类型)</span>
session<span class="token punctuation">.</span><span class="token function">getDouble</span><span class="token punctuation">(</span><span class="token string">"result"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 取值 (转float类型)</span>
session<span class="token punctuation">.</span><span class="token function">getFloat</span><span class="token punctuation">(</span><span class="token string">"result"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 取值 (指定转换类型)</span>
session<span class="token punctuation">.</span><span class="token function">getModel</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 取值 (指定转换类型, 并指定值为Null时返回的默认值)</span>
session<span class="token punctuation">.</span><span class="token function">getModel</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">,</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token generics"><span class="token punctuation">&lt;</span>defaultValue<span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 是否含有某个key</span>
session<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h3 id="框架的配置" tabindex="-1"><a class="header-anchor" href="#框架的配置" aria-hidden="true">#</a> 框架的配置</h3>
<p>建议看看官方的文档<a href="https://sa-token.dev33.cn/doc/index.html#/use/config" target="_blank" rel="noopener noreferrer">https://sa-token.dev33.cn/doc/index.html#/use/config<ExternalLinkIcon/></a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Sa-Token 配置</span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span> 
    <span class="token comment"># token名称 (同时也是cookie名称)</span>
    <span class="token key atrule">token-name</span><span class="token punctuation">:</span> satoken
    <span class="token comment"># token有效期，单位s 默认30天, -1代表永不过期 </span>
    <span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">2592000</span>
    <span class="token comment"># token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒</span>
    <span class="token key atrule">activity-timeout</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token comment"># 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录) </span>
    <span class="token key atrule">is-concurrent</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token) </span>
    <span class="token key atrule">is-share</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># token风格</span>
    <span class="token key atrule">token-style</span><span class="token punctuation">:</span> uuid
    <span class="token comment"># 是否输出操作日志 </span>
    <span class="token key atrule">is-log</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>可以配置的参数如下：</p>
<table>
<thead>
<tr>
<th>参数名称</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>tokenName</td>
<td>String</td>
<td>satoken</td>
<td>token名称 (同时也是cookie名称)</td>
</tr>
<tr>
<td>timeout</td>
<td>long</td>
<td>2592000</td>
<td>token有效期，单位/秒 默认30天，-1代表永久有效 <a href="https://sa-token.dev33.cn/doc/index.html#/fun/token-timeout" target="_blank" rel="noopener noreferrer">参考：token有效期详解<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>activityTimeout</td>
<td>long</td>
<td>-1</td>
<td>token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒, 默认-1 代表不限制 (例如可以设置为1800代表30分钟内无操作就过期) <a href="https://sa-token.dev33.cn/doc/index.html#/fun/token-timeout" target="_blank" rel="noopener noreferrer">参考：token有效期详解<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>isConcurrent</td>
<td>Boolean</td>
<td>true</td>
<td>是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)</td>
</tr>
<tr>
<td>isShare</td>
<td>Boolean</td>
<td>true</td>
<td>在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)</td>
</tr>
<tr>
<td>isReadBody</td>
<td>Boolean</td>
<td>true</td>
<td>是否尝试从 请求体 里读取 Token</td>
</tr>
<tr>
<td>isReadHead</td>
<td>Boolean</td>
<td>true</td>
<td>是否尝试从 header 里读取 Token</td>
</tr>
<tr>
<td>isReadCookie</td>
<td>Boolean</td>
<td>true</td>
<td>是否尝试从 cookie 里读取 Token</td>
</tr>
<tr>
<td>tokenStyle</td>
<td>String</td>
<td>uuid</td>
<td>token风格, <a href="https://sa-token.dev33.cn/doc/index.html#/up/token-style" target="_blank" rel="noopener noreferrer">参考：自定义Token风格<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>dataRefreshPeriod</td>
<td>int</td>
<td>30</td>
<td>默认dao层实现类中，每次清理过期数据间隔的时间 (单位: 秒) ，默认值30秒，设置为-1代表不启动定时清理</td>
</tr>
<tr>
<td>tokenSessionCheckLogin</td>
<td>Boolean</td>
<td>true</td>
<td>获取 <code>Token-Session</code> 时是否必须登录 (如果配置为true，会在每次获取 <code>Token-Session</code> 时校验是否登录)</td>
</tr>
<tr>
<td>autoRenew</td>
<td>Boolean</td>
<td>true</td>
<td>是否打开自动续签 (如果此值为true, 框架会在每次直接或间接调用 <code>getLoginId()</code> 时进行一次过期检查与续签操作)</td>
</tr>
<tr>
<td>tokenPrefix</td>
<td>String</td>
<td>null</td>
<td>token前缀, 例如填写 <code>Bearer</code> 实际传参 <code>satoken: Bearer xxxx-xxxx-xxxx-xxxx</code> <a href="https://sa-token.dev33.cn/doc/index.html#/up/token-prefix" target="_blank" rel="noopener noreferrer">参考：自定义Token前缀<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>isPrint</td>
<td>Boolean</td>
<td>true</td>
<td>是否在初始化配置时打印版本字符画</td>
</tr>
<tr>
<td>isLog</td>
<td>Boolean</td>
<td>false</td>
<td>是否打印操作日志</td>
</tr>
<tr>
<td>jwtSecretKey</td>
<td>String</td>
<td>null</td>
<td>jwt秘钥 (只有集成 <code>sa-token-temp-jwt</code> 模块时此参数才会生效)</td>
</tr>
<tr>
<td>idTokenTimeout</td>
<td>long</td>
<td>86400</td>
<td>Id-Token的有效期 (单位: 秒)</td>
</tr>
<tr>
<td>basic</td>
<td>String</td>
<td>&quot;&quot;</td>
<td>Http Basic 认证的账号和密码 <a href="https://sa-token.dev33.cn/doc/index.html#/up/basic-auth" target="_blank" rel="noopener noreferrer">参考：Http Basic 认证<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>currDomain</td>
<td>String</td>
<td>null</td>
<td>配置当前项目的网络访问地址</td>
</tr>
<tr>
<td>checkIdToken</td>
<td>Boolean</td>
<td>false</td>
<td>是否校验Id-Token（部分rpc插件有效）</td>
</tr>
<tr>
<td>sso</td>
<td>Object</td>
<td>new SaSsoConfig()</td>
<td>SSO 单点登录相关配置</td>
</tr>
<tr>
<td>cookie</td>
<td>Object</td>
<td>new SaCookieConfig()</td>
<td>Cookie配置对象</td>
</tr>
</tbody>
</table>
<h2 id="深入" tabindex="-1"><a class="header-anchor" href="#深入" aria-hidden="true">#</a> 深入</h2>
<h3 id="✨集成redis" tabindex="-1"><a class="header-anchor" href="#✨集成redis" aria-hidden="true">#</a> ✨集成Redis</h3>
<p>Sa-token默认将数据保存在内存中，此模式读写速度最快，且避免了序列化与反序列化带来的性能消耗，但是此模式也有一些缺点，比如：</p>
<ol>
<li>重启后数据会丢失</li>
<li>无法在分布式环境中共享数据</li>
</ol>
<p>为此，Sa-Token提供了扩展接口，你可以轻松将会话数据存储在 <code>Redis</code>、<code>Memcached</code>等专业的缓存中间件中， 做到重启数据不丢失，而且保证分布式环境下多节点的会话一致性</p>
<p>官方提供了两种整合方式</p>
<blockquote>
<p>使用JDK的序列化方式</p>
<p>优点：兼容性好，缺点：Session序列化后基本不可读，对开发者来讲等同于乱码</p>
</blockquote>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- Sa-Token 整合 Redis （使用jdk默认序列化方式） --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-dao-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote>
<p>第二种：Jackson</p>
<p>优点：Session序列化后可读性强，可灵活手动修改，缺点：兼容性稍差</p>
</blockquote>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- Sa-Token 整合 Redis （使用jackson序列化方式） --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-dao-redis-jackson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在使用它们之前，我们得先把自己的redis配置好</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我这里就不用Redis集群了….Redis集群要用到Jedis这个依赖，直接单台Redis</p>
<p>最终我添加的依赖为</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-dao-redis-jackson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--注意这个东西不能漏了，就相当于是Mysql的 comm一样--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>配置文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token comment"># 端口</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8081</span>

<span class="token comment"># Sa-Token配置</span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
  <span class="token comment"># token名称 (同时也是cookie名称)</span>
  <span class="token key atrule">token-name</span><span class="token punctuation">:</span> satoken
  <span class="token comment"># token有效期，单位s 默认30天, -1代表永不过期</span>
  <span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">2592000</span>
  <span class="token comment"># token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒</span>
  <span class="token key atrule">activity-timeout</span><span class="token punctuation">:</span> <span class="token number">-1</span>
  <span class="token comment"># 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)</span>
  <span class="token key atrule">is-concurrent</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token comment"># 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)</span>
  <span class="token key atrule">is-share</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token comment"># token风格</span>
  <span class="token key atrule">token-style</span><span class="token punctuation">:</span> uuid
  <span class="token comment"># 是否输出操作日志</span>
  <span class="token key atrule">is-log</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># redis配置</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token comment"># Redis数据库索引（默认为0）</span>
    <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">1</span>
    <span class="token comment"># Redis服务器地址</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> myserver
    <span class="token comment"># Redis服务器连接端口</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">13355</span>
    <span class="token comment"># Redis服务器连接密码（默认为空）</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> amayakite
    <span class="token comment"># 连接超时时间</span>
    <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 10s
    <span class="token key atrule">lettuce</span><span class="token punctuation">:</span>
      <span class="token key atrule">pool</span><span class="token punctuation">:</span>
        <span class="token comment"># 连接池最大连接数</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">200</span>
        <span class="token comment"># 连接池最大阻塞等待时间（使用负值表示没有限制）</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>1ms
        <span class="token comment"># 连接池中的最大空闲连接</span>
        <span class="token key atrule">max-idle</span><span class="token punctuation">:</span> <span class="token number">10</span>
        <span class="token comment"># 连接池中的最小空闲连接</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">0</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>接着正常启动即可，不用做任何额外的配置，对没错，任何额外的配置都不需要</p>
<p>然后正常登陆，你就能在你的Redis内看到如下内容</p>
<p><img src="/images/SpringCloud/17-Sa-Token/image-20220121171641113.png" alt="image-20220121171641113" loading="lazy"></p>
<p>注意：</p>
<blockquote>
<p>Sa-Token-Redis 集成包的版本尽量与 Sa-Token-Starter 集成包的版本一致，否则可能出现兼容性问题</p>
</blockquote>
<h3 id="✨前后端分离-使用token" tabindex="-1"><a class="header-anchor" href="#✨前后端分离-使用token" aria-hidden="true">#</a> ✨前后端分离-使用Token</h3>
<p>无Cookie：特指不支持Cookie功能的终端，通俗来讲就是我们常说的 —— <strong>前后台分离模式</strong></p>
<p>常规PC端鉴权方法，一般由<code>Cookie模式</code>完成，而 Cookie 有两个特性:</p>
<ol>
<li>可由后端控制写入</li>
<li>每次请求自动提交</li>
</ol>
<p>这就使得我们在前端代码中，无需任何特殊操作，就能完成鉴权的全部流程（因为整个流程都是后端控制完成的）
而在app、小程序等前后台分离场景中，一般是没有 Cookie 这一功能的，此时大多数人都会一脸懵逼，咋进行鉴权啊？</p>
<p>见招拆招，其实答案很简单：</p>
<ul>
<li>不能后端控制写入了，就前端自己写入（难点在<strong>后端如何将token传递到前端</strong>）</li>
<li>每次请求不能自动提交了，那就手动提交（难点在<strong>前端如何将token传递到后端</strong>，同时<strong>后端将其读取出来</strong>）</li>
</ul>
<blockquote>
<p>将Token返回到前端的方式</p>
</blockquote>
<ol>
<li>首先调用 <code>StpUtil.login(id)</code> 进行登录</li>
<li>调用<code>StpUtil.getTokenInfo()</code>返回当前会话的token详细参数
<ul>
<li>此方法返回一个对象，其有两个关键属性：<code>tokenName</code>和<code>tokenValue</code>（token 的名称和 token 的值）</li>
<li>将此对象传递到前台，让前端人员将这两个值保存到本地</li>
</ul>
</li>
</ol>
<p>该方法返回值一览：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 这个可以更该的，详情看前面的：框架的配置部分</span>
    <span class="token property">"tokenName"</span><span class="token operator">:</span> <span class="token string">"satoken"</span><span class="token punctuation">,</span>
    <span class="token property">"tokenValue"</span><span class="token operator">:</span> <span class="token string">"a44c4dfb-c4c0-40c9-a9c8-ab736c2b8508"</span><span class="token punctuation">,</span>
    <span class="token property">"isLogin"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">"loginId"</span><span class="token operator">:</span> <span class="token string">"10001"</span><span class="token punctuation">,</span>
    <span class="token property">"loginType"</span><span class="token operator">:</span> <span class="token string">"login"</span><span class="token punctuation">,</span>
    <span class="token property">"tokenTimeout"</span><span class="token operator">:</span> <span class="token number">2591671</span><span class="token punctuation">,</span>
    <span class="token property">"sessionTimeout"</span><span class="token operator">:</span> <span class="token number">2591671</span><span class="token punctuation">,</span>
    <span class="token property">"tokenSessionTimeout"</span><span class="token operator">:</span> <span class="token number">-2</span><span class="token punctuation">,</span>
    <span class="token property">"tokenActivityTimeout"</span><span class="token operator">:</span> <span class="token number">-1</span><span class="token punctuation">,</span>
    <span class="token property">"loginDevice"</span><span class="token operator">:</span> <span class="token string">"default-device"</span><span class="token punctuation">,</span>
    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>当然，<code>SaTokenInfo tokenInfo = StpUtil.getTokenInfo();</code>你也可以通过返回对象中的内容进行提取，只返回那两个值给前端</p>
<p>然后我们在前端访问只需要额外加一个请求头，名字为tokenName，value为tokenValue即可</p>
<p><img src="/images/SpringCloud/17-Sa-Token/image-20220121172519180.png" alt="image-20220121172519180" loading="lazy"></p>
<p>然后普通的解决方式这里就不说了，这里说下UniAPP的发送方式</p>
<blockquote>
<p>方式1，普通粗暴</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1、首先在登录时，将 tokenValue 存储在本地，例如：</span>
uni<span class="token punctuation">.</span><span class="token function">setStorageSync</span><span class="token punctuation">(</span><span class="token string">'tokenValue'</span><span class="token punctuation">,</span> tokenValue<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 2、在发起ajax请求的地方，获取这个值，并塞到header里 </span>
uni<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'https://www.example.com/request'</span><span class="token punctuation">,</span> <span class="token comment">// 仅为示例，并非真实接口地址。</span>
    <span class="token literal-property property">header</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"content-type"</span><span class="token operator">:</span> <span class="token string">"application/x-www-form-urlencoded"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"satoken"</span><span class="token operator">:</span> uni<span class="token punctuation">.</span><span class="token function">getStorageSync</span><span class="token punctuation">(</span><span class="token string">'tokenValue'</span><span class="token punctuation">)</span>        <span class="token comment">// 关键代码, 注意参数名字是 satoken </span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>    
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>或者用更加灵活的方式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1、首先在登录时，将tokenName和tokenValue一起存储在本地，例如：</span>
uni<span class="token punctuation">.</span><span class="token function">setStorageSync</span><span class="token punctuation">(</span><span class="token string">'tokenName'</span><span class="token punctuation">,</span> tokenName<span class="token punctuation">)</span><span class="token punctuation">;</span> 
uni<span class="token punctuation">.</span><span class="token function">setStorageSync</span><span class="token punctuation">(</span><span class="token string">'tokenValue'</span><span class="token punctuation">,</span> tokenValue<span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 2、在发起ajax的地方，获取这两个值, 并组织到head里 </span>
<span class="token keyword">var</span> tokenName <span class="token operator">=</span> uni<span class="token punctuation">.</span><span class="token function">getStorageSync</span><span class="token punctuation">(</span><span class="token string">'tokenName'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 从本地缓存读取tokenName值</span>
<span class="token keyword">var</span> tokenValue <span class="token operator">=</span> uni<span class="token punctuation">.</span><span class="token function">getStorageSync</span><span class="token punctuation">(</span><span class="token string">'tokenValue'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 从本地缓存读取tokenValue值</span>
<span class="token keyword">var</span> header <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"content-type"</span><span class="token operator">:</span> <span class="token string">"application/x-www-form-urlencoded"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>tokenName <span class="token operator">!=</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> tokenName <span class="token operator">!=</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    header<span class="token punctuation">[</span>tokenName<span class="token punctuation">]</span> <span class="token operator">=</span> tokenValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 3、后续在发起请求时将 header 对象塞到请求头部 </span>
uni<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'https://www.example.com/request'</span><span class="token punctuation">,</span> <span class="token comment">// 仅为示例，并非真实接口地址。</span>
    <span class="token literal-property property">header</span><span class="token operator">:</span> header<span class="token punctuation">,</span>
    <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>    
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><blockquote>
<p>当然，如何封装这里就不提了，比较简单</p>
</blockquote>
<p>如果你对 Cookie 非常了解，那你就会明白，所谓 Cookie ，本质上就是一个特殊的<code>header</code>参数而已， 而既然它只是一个 header 参数，我们就能手动模拟实现它，从而完成鉴权操作</p>
<p>这其实是对<code>无Cookie模式</code>的另一种解决方案，有兴趣的同学可以百度了解一下，在此暂不赘述</p>
<h3 id="自定义token的生成风格" tabindex="-1"><a class="header-anchor" href="#自定义token的生成风格" aria-hidden="true">#</a> 自定义token的生成风格</h3>
<p>Sa-Token默认的token生成策略是uuid风格，其模样类似于：<code>623368f0-ae5e-4475-a53f-93e4225f16ae</code>
如果你对这种风格不太感冒，还可以将token生成设置为其他风格</p>
<p>怎么设置呢？只需要在yml配置文件里设置 <code>sa-token.token-style=风格类型</code> 即可，其有多种取值：</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># 1. token-style=uuid    —— uuid风格 (默认风格)</span>
"623368f0-ae5e-4475-a53f-93e4225f16ae"

<span class="token comment"># 2. token-style=simple-uuid    —— 同上，uuid风格, 只不过去掉了中划线</span>
"6fd4221395024b5f87edd34bc3258ee8"

<span class="token comment"># 3. token-style=random-32    —— 随机32位字符串</span>
"qEjyPsEA1Bkc9dr8YP6okFr5umCZNR6W"

<span class="token comment"># 4. token-style=random-64    —— 随机64位字符串</span>
"v4ueNLEpPwMtmOPMBtOOeIQsvP8z9gkMgIVibTUVjkrNrlfra5CGwQkViDjO8jcc"

<span class="token comment"># 5. token-style=random-128    —— 随机128位字符串</span>
"nojYPmcEtrFEaN0Otpssa8I8jpk8FO53UcMZkCP9qyoHaDbKS6dxoRPky9c6QlftQ0pdzxRGXsKZmUSrPeZBOD6kJFfmfgiRyUmYWcj4WU4SSP2ilakWN1HYnIuX0Olj"

<span class="token comment"># 6. token-style=tik    —— tik风格</span>
"gr_SwoIN0MC1ewxHX_vfCW3BothWDZMMtx__"
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><blockquote>
<p>如果你觉着以上风格都不是你喜欢的类型，那么你还可以<strong>自定义token生成策略</strong>，来定制化token生成风格</p>
<p>怎么做呢？只需要重写 <code>SaStrategy</code> 策略类的 <code>createToken</code> 算法即可</p>
</blockquote>
<ul>
<li>在<code>SaTokenConfigure</code>配置类中添加代码：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaTokenConfigure</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 重写 Sa-Token 框架内部算法策略 
     */</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rewriteSaStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 重写 Token 生成策略 </span>
        <span class="token class-name">SaStrategy</span><span class="token punctuation">.</span>me<span class="token punctuation">.</span>createToken <span class="token operator">=</span> <span class="token punctuation">(</span>loginId<span class="token punctuation">,</span> loginType<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">SaFoxUtil</span><span class="token punctuation">.</span><span class="token function">getRandomString</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 随机60位长度字符串</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ul>
<li>再次调用 <code>StpUtil.login(10001)</code>方法进行登录，观察其生成的token样式:</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>gfuPSwZsnUhwgz08GTCH4wOgasWtc3odP4HLwXJ7NDGOximTvT4OlW19zeLH
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="自定义token前缀" tabindex="-1"><a class="header-anchor" href="#自定义token前缀" aria-hidden="true">#</a> 自定义Token前缀</h3>
<p>在某些系统中，前端提交token时会在前面加个固定的前缀，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">{</span>
    <span class="token string">"satoken"</span><span class="token operator">:</span> <span class="token string">"Bearer xxxx-xxxx-xxxx-xxxx"</span>
<span class="token punctuation">}</span>
<span class="token comment">//md 想起来了Node的JWT，就是这种前缀</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<p>此时后端如果不做任何特殊处理，框架将会把<code>Bearer</code>视为token的一部分，无法正常读取token信息，导致鉴权失败</p>
</blockquote>
<p>为此，我们需要在yml中添加如下配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">sa-token</span><span class="token punctuation">:</span> 
    <span class="token comment"># token前缀</span>
    <span class="token key atrule">token-prefix</span><span class="token punctuation">:</span> Bearer
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>此时 Sa-Token 便可在读取 Token 时裁剪掉 <code>Bearer</code>，成功获取<code>xxxx-xxxx-xxxx-xxxx</code></p>
<h3 id="记住我-模式和token有效期-单独设置" tabindex="-1"><a class="header-anchor" href="#记住我-模式和token有效期-单独设置" aria-hidden="true">#</a> [记住我]模式和token有效期（单独设置）</h3>
<p>如图所示，一般网站的登录界面都会有一个 <strong><code>[记住我]</code></strong> 按钮，当你勾选它后，即使你关闭浏览器再次打开网站，也依然会处于登录状态，无须重复验证密码</p>
<p><img src="/images/SpringCloud/17-Sa-Token/login-view.png" alt="../static/login-view.png" loading="lazy"></p>
<p>那么在Sa-Token中，如何做到 [ 记住我 ] 功能呢？</p>
<p>Sa-Token的登录授权，<strong>默认就是<code>[记住我]</code>模式</strong>，为了实现<code>[非记住我]</code>模式, 你需要在登录时如下设置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 设置登录账号id为10001，第二个参数指定是否为[记住我]，当此值为false后，关闭浏览器后再次打开需要重新登录</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>那么，Sa-Token实现<code>[记住我]</code>的具体原理是？</p>
<p>Cookie作为浏览器提供的默认会话跟踪机制，其生命周期有两种形式，分别是：</p>
<ul>
<li>临时Cookie：有效期为本次会话，只要关闭浏览器窗口，Cookie就会消失</li>
<li>永久Cookie：有效期为一个具体的时间，在时间未到期之前，即使用户关闭了浏览器Cookie也不会消失</li>
</ul>
<p>利用Cookie的此特性，我们便可以轻松实现 [记住我] 模式：</p>
<ul>
<li>勾选 [记住我] 按钮时：调用<code>StpUtil.login(10001, true)</code>，在浏览器写入一个<code>永久Cookie</code>储存 Token，此时用户即使重启浏览器 Token 依然有效</li>
<li>不勾选 [记住我] 按钮时：调用<code>StpUtil.login(10001, false)</code>，在浏览器写入一个<code>临时Cookie</code>储存 Token，此时用户在重启浏览器后 Token 便会消失，导致会话失效</li>
</ul>
<blockquote>
<p>前后端分离的模式下如何实现？</p>
</blockquote>
<p>此时机智的你😏很快发现一个问题，Cookie虽好，却无法在前后端分离环境下使用，那是不是代表上述方案在APP、小程序等环境中无效？</p>
<p>准确的讲，答案是肯定的，任何基于Cookie的认证方案在前后台分离环境下都会失效（原因在于这些客户端默认没有实现Cookie功能），不过好在，这些客户端一般都提供了替代方案， 唯一遗憾的是，此场景中token的生命周期需要我们在前端手动控制</p>
<p>以经典跨端框架 <a href="https://uniapp.dcloud.io/" target="_blank" rel="noopener noreferrer">uni-app<ExternalLinkIcon/></a> 为例，我们可以使用如下方式达到同样的效果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 使用本地存储保存token，达到 [永久Cookie] 的效果</span>
uni<span class="token punctuation">.</span><span class="token function">setStorageSync</span><span class="token punctuation">(</span><span class="token string">"satoken"</span><span class="token punctuation">,</span> <span class="token string">"xxxx-xxxx-xxxx-xxxx-xxx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用globalData保存token，达到 [临时Cookie] 的效果</span>
<span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>globalData<span class="token punctuation">.</span>satoken <span class="token operator">=</span> <span class="token string">"xxxx-xxxx-xxxx-xxxx-xxx"</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote>
<p>如果你决定在PC浏览器环境下进行前后台分离模式开发，那么更加简单：</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 使用 localStorage 保存token，达到 [永久Cookie] 的效果</span>
localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">"satoken"</span><span class="token punctuation">,</span> <span class="token string">"xxxx-xxxx-xxxx-xxxx-xxx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用 sessionStorage 保存token，达到 [临时Cookie] 的效果</span>
sessionStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">"satoken"</span><span class="token punctuation">,</span> <span class="token string">"xxxx-xxxx-xxxx-xxxx-xxx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>登陆时指定Token有效期</p>
<blockquote>
<p>登录时不仅可以指定是否为<code>[记住我]</code>模式，还可以指定一个特定的时间作为token有效时长，如下示例：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 示例1：</span>
<span class="token comment">// 指定token有效期(单位: 秒)，如下所示token七天有效</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">SaLoginModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ----------------------- 示例2：所有参数</span>
<span class="token comment">// `SaLoginModel`为登录参数Model，其有诸多参数决定登录时的各种逻辑，例如：</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">SaLoginModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token comment">// 此次登录的客户端设备标识, 用于[同端互斥登录]时指定此次登录的设备名称</span>
              <span class="token punctuation">.</span><span class="token function">setDevice</span><span class="token punctuation">(</span><span class="token string">"PC"</span><span class="token punctuation">)</span>
              <span class="token comment">// 是否为持久Cookie（临时Cookie在浏览器关闭时会自动删除，持久Cookie在重新打开后依然存在）</span>
              <span class="token punctuation">.</span><span class="token function">setIsLastingCookie</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
              <span class="token comment">// 指定此次登录token的有效期, 单位:秒 （如未指定，自动取全局配置的timeout值）</span>
              <span class="token punctuation">.</span><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">7</span><span class="token punctuation">)</span>
             <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="模拟他人" tabindex="-1"><a class="header-anchor" href="#模拟他人" aria-hidden="true">#</a> 模拟他人</h3>
<p>以上介绍的api都是操作当前账号，对当前账号进行各种鉴权操作，你可能会问，我能不能对别的账号进行一些操作？
比如：查看账号10001有无某个权限码、获取 账号id=10002 的 <code>User-Session</code>，等等...</p>
<p>Sa-Token在api设计时充分考虑了这一点，暴露出多个api进行此类操作</p>
<blockquote>
<p>简单来说就是超级管理员想体验普通用户的账号但是不想自己注册一个</p>
</blockquote>
<ul>
<li>有关操作其他账号的api</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 获取指定账号10001的`tokenValue`值 </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenValueByLoginId</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 将账号10001的会话注销登录</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取账号10001的Session对象, 如果session尚未创建, 则新建并返回</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSessionByLoginId</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取账号10001的Session对象, 如果session尚未创建, 则返回null </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSessionByLoginId</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取账号10001是否含有指定角色标识 </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token string">"super-admin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取账号10001是否含有指定权限码</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token string">"user:add"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>当然</p>
<blockquote>
<p>有时候，我们需要直接将当前会话的身份切换为其它账号，比如：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 将当前会话[身份临时切换]为其它账号 </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">switchTo</span><span class="token punctuation">(</span><span class="token number">10044</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 此时再调用此方法会返回 10044 (我们临时切换到的账号id)</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getLoginId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 结束 [身份临时切换]</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">endSwitch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>你还可以: 直接在一个代码段里方法内，临时切换身份为指定loginId（此方式无需手动调用<code>StpUtil.endSwitch()</code>关闭身份切换）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------- [身份临时切换]调用开始..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">switchTo</span><span class="token punctuation">(</span><span class="token number">10044</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"是否正在身份临时切换中: "</span> <span class="token operator">+</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isSwitch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取当前登录账号id: "</span> <span class="token operator">+</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getLoginId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------- [身份临时切换]调用结束..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="同端互斥登陆" tabindex="-1"><a class="header-anchor" href="#同端互斥登陆" aria-hidden="true">#</a> 同端互斥登陆</h3>
<p>如果你经常使用腾讯QQ，就会发现它的登录有如下特点：它可以手机电脑同时在线，但是不能在两个手机上同时登录一个账号
同端互斥登录，指的就是像腾讯QQ一样，在同一类型设备上只允许单地点登录，在不同类型设备上允许同时在线</p>
<p>在 Sa-Token 中如何做到同端互斥登录?
首先在配置文件中，将 <code>isConcurrent</code> 配置为false，然后调用登录等相关接口时声明设备标识即可：</p>
<blockquote>
<p>指定设备标识登陆</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 指定`账号id`和`设备标识`进行登录</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token string">"PC"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>调用此方法登录后，同设备的会被顶下线（不同设备不受影响），再次访问系统时会抛出 <code>NotLoginException</code> 异常，场景值=<code>-4</code></p>
<blockquote>
<p>指定设备强制注销</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 指定`账号id`和`设备标识`进行强制注销 </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token string">"PC"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>如果第二个参数填写null或不填，代表将这个账号id所有在线端强制注销，被踢出者再次访问系统时会抛出 <code>NotLoginException</code> 异常，场景值=<code>-2</code></p>
<blockquote>
<p>查询当前登陆的设备标识</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 返回当前token的登录设备</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getLoginDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote>
<p>ID反查Token</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 获取指定loginId指定设备端的tokenValue </span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenValueByLoginId</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">,</span> <span class="token string">"APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="二级认证" tabindex="-1"><a class="header-anchor" href="#二级认证" aria-hidden="true">#</a> 二级认证</h3>
<p>在某些敏感操作下，我们需要对已登录的会话进行二次验证</p>
<p>比如代码托管平台的仓库删除操作，尽管我们已经登录了账号，当我们点击 <strong>[删除]</strong> 按钮时，还是需要再次输入一遍密码，这么做主要为了两点：</p>
<ol>
<li>保证操作者是当前账号本人</li>
<li>增加操作步骤，防止误删除重要数据</li>
<li>例如GitHub，在你删除仓库的时候，如果说挂了梯子，有概率会要求你进行再次输入密码，并且就算你是安全的还会额外让你输入指定的标识仓库名称，后者非常简单，前者就emm有点怪了</li>
</ol>
<p>这就是我们本篇要讲的 —— 二级认证，即：在已登录会话的基础上，进行再次验证，提高会话的安全性。</p>
<blockquote>
<p>在<code>Sa-Token</code>中进行二级认证非常简单，只需要使用以下API：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 在当前会话 开启二级认证，时间为120秒</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">openSafe</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 获取：当前会话是否处于二级认证时间内</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isSafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 检查当前会话是否已通过二级认证，如未通过则抛出异常</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkSafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 获取当前会话的二级认证剩余有效时间 (单位: 秒, 返回-2代表尚未通过二级认证)</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getSafeTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 在当前会话 结束二级认证</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">closeSafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><blockquote>
<p>使用注解开启二级认证</p>
<p>在一个方法上使用 <code>@SaCheckSafe</code> 注解，可以在代码进入之前此方法之前进行一次二级认证</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 二级认证：必须二级认证之后才能进入该方法 </span>
<span class="token annotation punctuation">@SaCheckSafe</span>      
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"add"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"用户增加"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="http-basic认证" tabindex="-1"><a class="header-anchor" href="#http-basic认证" aria-hidden="true">#</a> Http Basic认证</h3>
<p>这个认证目前来说基本没什么企业和人会用了，比较局限</p>
<p>Http Basic 是 http 协议中最基础的认证方式，其有两个特点：</p>
<ul>
<li>简单、易集成。</li>
<li>功能支持度低。</li>
</ul>
<p>在 Sa-Token 中使用 Http Basic 认证非常简单，只需调用几个简单的方法</p>
<blockquote>
<p>首先我们在一个接口中，调用 Http Basic 校验：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"test3"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SaBasicUtil</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span><span class="token string">"sa:123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后我们访问这个接口时，浏览器会强制弹出一个表单：</p>
<p><img src="/images/SpringCloud/17-Sa-Token/sa-basic.png" alt="sa-basic.png" loading="lazy"></p>
<p>当我们输入账号密码后 <code>（sa / 123456）</code>，才可以继续访问数据：</p>
<p><img src="/images/SpringCloud/17-Sa-Token/sa-basic-ok.png" alt="sa-basic-ok.png" loading="lazy"></p>
<blockquote>
<p>其他启用方式</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 对当前会话进行 Basic 校验，账号密码为 yml 配置的值（例如：sa-token.basic=sa:123456）</span>
<span class="token class-name">SaBasicUtil</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 对当前会话进行 Basic 校验，账号密码为：`sa / 123456`</span>
<span class="token class-name">SaBasicUtil</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span><span class="token string">"sa:123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 以注解方式启用 Basic 校验</span>
<span class="token annotation punctuation">@SaCheckBasic</span><span class="token punctuation">(</span>account <span class="token operator">=</span> <span class="token string">"sa:123456"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"test3"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在全局拦截器 或 过滤器中启用 Basic 认证 </span>
<span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">SaServletFilter</span> <span class="token function">getSaServletFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SaServletFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">addInclude</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addExclude</span><span class="token punctuation">(</span><span class="token string">"/favicon.ico"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setAuth</span><span class="token punctuation">(</span>obj <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/test/**"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token class-name">SaBasicUtil</span><span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span><span class="token string">"sa:123456"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><blockquote>
<p>除了访问后再输入账号密码外，我们还可以在 URL 中直接拼接账号密码通过 Basic 认证，例如：</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> http://sa:123456@127.0.0.1:8081/test/test3
<span class="token comment"># 浏览器直接请求</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="密码加密" tabindex="-1"><a class="header-anchor" href="#密码加密" aria-hidden="true">#</a> 密码加密</h3>
<p>严格来讲，密码加密不属于 [权限认证] 的范畴，但是对于大多数系统来讲，密码加密又是安全认证不可或缺的部分， 所以，<code>Sa-Token</code>在<code>v1.14版本</code>添加密码加密模块，该模块非常简单，仅仅封装了一些常见的加密算法</p>
<p>使用的画风应该是这样的</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/doLogin"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">doLogin</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> pwd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里进行数据库匹配之前，把用户传入的密码进行加解密</span>
        <span class="token class-name">String</span> xxx <span class="token operator">=</span> xxx<span class="token punctuation">.</span><span class="token function">xxx</span><span class="token punctuation">(</span>pwd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//...数据库擦操作</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"数据库认证通过"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"登录成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"登录失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><blockquote>
<p>md5、sha1、sha256</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// md5加密 </span>
<span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">md5</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// sha1加密 </span>
<span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">sha1</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// sha256加密 </span>
<span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">sha256</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// md5加盐加密: md5(md5(str) + md5(salt)) </span>
<span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">md5BySalt</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">,</span> <span class="token string">"salt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><blockquote>
<p>AES对称加密</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 定义秘钥和明文</span>
<span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">"123456"</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">"Sa-Token 一个轻量级java权限认证框架"</span><span class="token punctuation">;</span>

<span class="token comment">// 加密 </span>
<span class="token class-name">String</span> ciphertext <span class="token operator">=</span> <span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">aesEncrypt</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"AES加密后："</span> <span class="token operator">+</span> ciphertext<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 解密 </span>
<span class="token class-name">String</span> text2 <span class="token operator">=</span> <span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">aesDecrypt</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> ciphertext<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"AES解密后："</span> <span class="token operator">+</span> text2<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><blockquote>
<p>RSA加密（非对称加密）</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 定义私钥和公钥 </span>
<span class="token class-name">String</span> privateKey <span class="token operator">=</span> <span class="token string">"MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAO+wmt01pwm9lHMdq7A8gkEigk0XKMfjv+4IjAFhWCSiTeP7dtlnceFJbkWxvbc7Qo3fCOpwmfcskwUc3VSgyiJkNJDs9ivPbvlt8IU2bZ+PBDxYxSCJFrgouVOpAr8ar/b6gNuYTi1vt3FkGtSjACFb002/68RKUTye8/tdcVilAgMBAAECgYA1COmrSqTUJeuD8Su9ChZ0HROhxR8T45PjMmbwIz7ilDsR1+E7R4VOKPZKW4Kz2VvnklMhtJqMs4MwXWunvxAaUFzQTTg2Fu/WU8Y9ha14OaWZABfChMZlpkmpJW9arKmI22ZuxCEsFGxghTiJQ3tK8npj5IZq5vk+6mFHQ6aJAQJBAPghz91Dpuj+0bOUfOUmzi22obWCBncAD/0CqCLnJlpfOoa9bOcXSusGuSPuKy5KiGyblHMgKI6bq7gcM2DWrGUCQQD3SkOcmia2s/6i7DUEzMKaB0bkkX4Ela/xrfV+A3GzTPv9bIBamu0VIHznuiZbeNeyw7sVo4/GTItq/zn2QJdBAkEA8xHsVoyXTVeShaDIWJKTFyT5dJ1TR++/udKIcuiNIap34tZdgGPI+EM1yoTduBM7YWlnGwA9urW0mj7F9e9WIQJAFjxqSfmeg40512KP/ed/lCQVXtYqU7U2BfBTg8pBfhLtEcOg4wTNTroGITwe2NjL5HovJ2n2sqkNXEio6Ji0QQJAFLW1Kt80qypMqot+mHhS+0KfdOpaKeMWMSR4Ij5VfE63WzETEeWAMQESxzhavN1WOTb3/p6icgcVbgPQBaWhGg=="</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> publicKey <span class="token operator">=</span> <span class="token string">"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvsJrdNacJvZRzHauwPIJBIoJNFyjH47/uCIwBYVgkok3j+3bZZ3HhSW5Fsb23O0KN3wjqcJn3LJMFHN1UoMoiZDSQ7PYrz275bfCFNm2fjwQ8WMUgiRa4KLlTqQK/Gq/2+oDbmE4tb7dxZBrUowAhW9NNv+vESlE8nvP7XXFYpQIDAQAB"</span><span class="token punctuation">;</span>

<span class="token comment">// 文本</span>
<span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">"Sa-Token 一个轻量级java权限认证框架"</span><span class="token punctuation">;</span>

<span class="token comment">// 使用公钥加密</span>
<span class="token class-name">String</span> ciphertext <span class="token operator">=</span> <span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">rsaEncryptByPublic</span><span class="token punctuation">(</span>publicKey<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"公钥加密后："</span> <span class="token operator">+</span> ciphertext<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用私钥解密</span>
<span class="token class-name">String</span> text2 <span class="token operator">=</span> <span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">rsaDecryptByPrivate</span><span class="token punctuation">(</span>privateKey<span class="token punctuation">,</span> ciphertext<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"私钥解密后："</span> <span class="token operator">+</span> text2<span class="token punctuation">)</span><span class="token punctuation">;</span> 

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>你可能会有疑问，私钥和公钥这么长的一大串，我怎么弄出来，手写吗？当然不是，调用以下方法生成即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 生成一对公钥和私钥，其中Map对象 (private=私钥, public=公钥)</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">SaSecureUtil</span><span class="token punctuation">.</span><span class="token function">rsaGenerateKeyPair</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote>
<p>Base64的编码和解码</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 文本</span>
<span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">"Sa-Token 一个轻量级java权限认证框架"</span><span class="token punctuation">;</span>

<span class="token comment">// 使用Base64编码</span>
<span class="token class-name">String</span> base64Text <span class="token operator">=</span> <span class="token class-name">SaBase64Util</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Base64编码后："</span> <span class="token operator">+</span> base64Text<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用Base64解码</span>
<span class="token class-name">String</span> text2 <span class="token operator">=</span> <span class="token class-name">SaBase64Util</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>base64Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Base64解码后："</span> <span class="token operator">+</span> text2<span class="token punctuation">)</span><span class="token punctuation">;</span> 

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>当然，要实现更多的加解密，可以参考Hutool工具类库</p>
<h3 id="会话治理" tabindex="-1"><a class="header-anchor" href="#会话治理" aria-hidden="true">#</a> 会话治理</h3>
<p>尽管框架将大部分操作提供了简易的封装，但在一些特殊场景下，我们仍需要绕过框架，直达数据底层进行一些操作
Sa-Token提供以下API助你直接操作会话列表</p>
<p>具体的API：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 查询所有token</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">searchTokenValue</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyword<span class="token punctuation">,</span> <span class="token keyword">int</span> start<span class="token punctuation">,</span> <span class="token keyword">int</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 查询所有账号Session会话</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">searchSessionId</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyword<span class="token punctuation">,</span> <span class="token keyword">int</span> start<span class="token punctuation">,</span> <span class="token keyword">int</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 查询所有令牌Session会话</span>
<span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">searchTokenSessionId</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyword<span class="token punctuation">,</span> <span class="token keyword">int</span> start<span class="token punctuation">,</span> <span class="token keyword">int</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul>
<li><code>keyword</code>: 查询关键字，只有包括这个字符串的token值才会被查询出来</li>
<li><code>start</code>: 数据开始处索引, 值为-1时代表一次性取出所有数据</li>
<li><code>size</code>: 要获取的数据条数</li>
</ul>
<p>例子：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 查询value包括1000的所有token，结果集从第0条开始，返回10条</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> tokenList <span class="token operator">=</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">searchTokenValue</span><span class="token punctuation">(</span><span class="token string">"1000"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> token <span class="token operator">:</span> tokenList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote>
<p>注意事项</p>
</blockquote>
<p>由于会话查询底层采用了遍历方式获取数据，当数据量过大时此操作将会比较耗时，有多耗时呢？这里提供一份参考数据：</p>
<ul>
<li>单机模式下：百万会话取出10条token平均耗时 <code>0.255s</code></li>
<li>Redis模式下：百万会话取出10条token平均耗时 <code>3.322s</code></li>
</ul>
<p>请根据业务实际水平合理调用API</p>
<blockquote>
<p>如果需要实时获取当前登录人数或者需要在用户退出后自动触发某事件等, 建议采用websocket技术</p>
</blockquote>
<h3 id="全局侦听器" tabindex="-1"><a class="header-anchor" href="#全局侦听器" aria-hidden="true">#</a> 全局侦听器</h3>
<p>接口<code>SaTokenListener</code>是Sa-Token的全局侦听器，通过实现此接口，你可以在用户登陆、退出、被踢下线等关键性操作时进行一些AOP操作</p>
<p>框架对此侦听器的默认实现是log日志输出，你可以通过配置<code>sa-token.is-log=true</code>开启</p>
<blockquote>
<p>下面我们演示一下如何自定义侦听器的实现</p>
</blockquote>
<p>新建<code>MySaTokenListener.java</code>，继承<code>SaTokenListener</code>接口，并添加上注解<code>@Component</code>，保证此类被<code>SpringBoot</code>扫描到</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 自定义侦听器的实现 
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MySaTokenListener</span> <span class="token keyword">implements</span> <span class="token class-name">SaTokenListener</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/** 每次登录时触发 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doLogin</span><span class="token punctuation">(</span><span class="token class-name">String</span> loginType<span class="token punctuation">,</span> <span class="token class-name">Object</span> loginId<span class="token punctuation">,</span> <span class="token class-name">SaLoginModel</span> loginModel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... </span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** 每次注销时触发 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doLogout</span><span class="token punctuation">(</span><span class="token class-name">String</span> loginType<span class="token punctuation">,</span> <span class="token class-name">Object</span> loginId<span class="token punctuation">,</span> <span class="token class-name">String</span> tokenValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... </span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** 每次被踢下线时触发 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doKickout</span><span class="token punctuation">(</span><span class="token class-name">String</span> loginType<span class="token punctuation">,</span> <span class="token class-name">Object</span> loginId<span class="token punctuation">,</span> <span class="token class-name">String</span> tokenValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... </span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** 每次被顶下线时触发 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doReplaced</span><span class="token punctuation">(</span><span class="token class-name">String</span> loginType<span class="token punctuation">,</span> <span class="token class-name">Object</span> loginId<span class="token punctuation">,</span> <span class="token class-name">String</span> tokenValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... </span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** 每次被封禁时触发 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doDisable</span><span class="token punctuation">(</span><span class="token class-name">String</span> loginType<span class="token punctuation">,</span> <span class="token class-name">Object</span> loginId<span class="token punctuation">,</span> <span class="token keyword">long</span> disableTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... </span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** 每次被解封时触发 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doUntieDisable</span><span class="token punctuation">(</span><span class="token class-name">String</span> loginType<span class="token punctuation">,</span> <span class="token class-name">Object</span> loginId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... </span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** 每次创建Session时触发 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doCreateSession</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... </span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** 每次注销Session时触发 */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doLogoutSession</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... </span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><h3 id="全局过滤器-filter" tabindex="-1"><a class="header-anchor" href="#全局过滤器-filter" aria-hidden="true">#</a> 全局过滤器（Filter）</h3>
<p>这里建议看看官方文档<a href="https://sa-token.dev33.cn/doc/index.html#/up/global-filter" target="_blank" rel="noopener noreferrer">https://sa-token.dev33.cn/doc/index.html#/up/global-filter<ExternalLinkIcon/></a></p>
<p>之前的章节中，我们学习了“根据拦截器实现路由拦截鉴权”，其实在大多数web框架中，使用过滤器可以实现同样的功能，本章我们就利用Sa-Token全局过滤器来实现路由拦截器鉴权。</p>
<p>首先我们先梳理清楚一个问题，既然拦截器已经可以实现路由鉴权，为什么还要用过滤器再实现一遍呢？简而言之：</p>
<ol>
<li>相比于拦截器，过滤器更加底层，执行时机更靠前，有利于防渗透扫描</li>
<li>过滤器可以拦截静态资源，方便我们做一些权限控制</li>
<li>部分Web框架根本就没有提供拦截器功能，但几乎所有的Web框架都会提供过滤器机制</li>
</ol>
<p>但是过滤器也有一些缺点，比如：</p>
<ol>
<li>由于太过底层，导致无法率先拿到<code>HandlerMethod</code>对象，无法据此添加一些额外功能</li>
<li>由于拦截的太全面了，导致我们需要对很多特殊路由(如<code>/favicon.ico</code>)做一些额外处理</li>
<li>在Spring中，过滤器中抛出的异常无法进入全局<code>@ExceptionHandler</code>，我们必须额外编写代码进行异常处理</li>
</ol>
<p>Sa-Token同时提供过滤器和拦截器机制，不是为了让谁替代谁，而是为了让大家根据自己的实际业务合理选择，拥有更多的发挥空间。</p>
<blockquote>
<p>同拦截器一样，为了避免不必要的性能浪费，Sa-Token全局过滤器默认处于关闭状态，若要使用过滤器组件，首先你需要注册它到项目中：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * [Sa-Token 权限认证] 配置类 
 * <span class="token keyword">@author</span> kong
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaTokenConfigure</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 注册 [Sa-Token全局过滤器] 
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SaServletFilter</span> <span class="token function">getSaServletFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SaServletFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

                <span class="token comment">// 指定 拦截路由 与 放行路由</span>
                <span class="token punctuation">.</span><span class="token function">addInclude</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addExclude</span><span class="token punctuation">(</span><span class="token string">"/favicon.ico"</span><span class="token punctuation">)</span>

                <span class="token comment">// 认证函数: 每次请求执行 </span>
                <span class="token punctuation">.</span><span class="token function">setAuth</span><span class="token punctuation">(</span>obj <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"---------- 进入Sa-Token全局认证 -----------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token comment">// 登录认证 -- 拦截所有路由，并排除/user/doLogin 用于开放登录 </span>
                    <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">,</span> <span class="token string">"/user/doLogin"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">checkLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token comment">// 更多拦截处理方式，请参考“路由拦截式鉴权”章节 </span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>

                <span class="token comment">// 异常处理函数：每次认证函数发生异常时执行此函数 </span>
                <span class="token punctuation">.</span><span class="token function">setError</span><span class="token punctuation">(</span>e <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"---------- 进入Sa-Token异常处理 -----------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> <span class="token class-name">AjaxJson</span><span class="token punctuation">.</span><span class="token function">getError</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>

                <span class="token comment">// 前置函数：在每次认证函数之前执行</span>
                <span class="token punctuation">.</span><span class="token function">setBeforeAuth</span><span class="token punctuation">(</span>r <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token comment">// ---------- 设置一些安全响应头 ----------</span>
                    <span class="token class-name">SaHolder</span><span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token comment">// 服务器名称 </span>
                    <span class="token punctuation">.</span><span class="token function">setServer</span><span class="token punctuation">(</span><span class="token string">"sa-server"</span><span class="token punctuation">)</span>
                    <span class="token comment">// 是否可以在iframe显示视图： DENY=不可以 | SAMEORIGIN=同域下可以 | ALLOW-FROM uri=指定域名下可以 </span>
                    <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"X-Frame-Options"</span><span class="token punctuation">,</span> <span class="token string">"SAMEORIGIN"</span><span class="token punctuation">)</span>
                    <span class="token comment">// 是否启用浏览器默认XSS防护： 0=禁用 | 1=启用 | 1; mode=block 启用, 并在检查到XSS攻击时，停止渲染页面 </span>
                    <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"X-XSS-Protection"</span><span class="token punctuation">,</span> <span class="token string">"1; mode=block"</span><span class="token punctuation">)</span>
                    <span class="token comment">// 禁用浏览器内容嗅探 </span>
                    <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"X-Content-Type-Options"</span><span class="token punctuation">,</span> <span class="token string">"nosniff"</span><span class="token punctuation">)</span>
                    <span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><h3 id="多账号认证" tabindex="-1"><a class="header-anchor" href="#多账号认证" aria-hidden="true">#</a> 多账号认证</h3>
<p>看<a href="https://sa-token.dev33.cn/doc/index.html#/up/many-account" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>，需要重写代码（当然，官方提供了解决方案）</p>
</template>
