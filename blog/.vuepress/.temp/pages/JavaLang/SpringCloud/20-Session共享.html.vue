<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>就是让Redis来让session之间能够共享</p>
<p>虽然说可以通过tomcat的hash负载来解决，但是那样太拉胯了</p>
<p><img src="/images/SpringCloud/20-Session共享/image-20220204231014917.png" alt="image-20220204231014917" loading="lazy"></p>
<h3 id="依赖和配置" tabindex="-1"><a class="header-anchor" href="#依赖和配置" aria-hidden="true">#</a> 依赖和配置</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.session<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-session-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后配置文件中配置好redis，这个东西会自动找redis的工厂来用</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span> <span class="token comment">#############################################################################</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> myserver
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">13002</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> amayakiteProjectRedis
    <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">0</span>

<span class="token punctuation">---</span> <span class="token comment">#</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">session</span><span class="token punctuation">:</span>
    <span class="token comment"># 启用redis作为session管理器 还可以选择其他的session管理器，例如MongoDB，jdbc等</span>
    <span class="token key atrule">store-type</span><span class="token punctuation">:</span> redis
    <span class="token comment"># session的过期时间，单位为秒</span>
    <span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">7200</span>
    <span class="token key atrule">redis</span><span class="token punctuation">:</span>
      <span class="token comment"># 启用cookie时，cookie的命名空间</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token string">"amayakiteProjectSession:session"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>然后启动类上要额外加一个注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableFeignClients</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token string">"com.amayakite.shop.auth.feign"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">AuthApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>然后照常使用HttpSession即可</p>
<h3 id="配置cookie存档的信息以及自定义序列化方式" tabindex="-1"><a class="header-anchor" href="#配置cookie存档的信息以及自定义序列化方式" aria-hidden="true">#</a> 配置cookie存档的信息以及自定义序列化方式</h3>
<ol>
<li>配置cookie的存储名字之类的</li>
<li>配置使用json来创建和解析对应的内容（默认是jdk序列化，需要实体类实现序列化接口）</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SessionConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">CookieSerializer</span> <span class="token function">cookieSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DefaultCookieSerializer</span> defaultCookieSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultCookieSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        defaultCookieSerializer<span class="token punctuation">.</span><span class="token function">setCookieMaxAge</span><span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        defaultCookieSerializer<span class="token punctuation">.</span><span class="token function">setCookieName</span><span class="token punctuation">(</span><span class="token string">"SHOP_SESSION"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        defaultCookieSerializer<span class="token punctuation">.</span><span class="token function">setDomainName</span><span class="token punctuation">(</span><span class="token string">"my-shop.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        defaultCookieSerializer<span class="token punctuation">.</span><span class="token function">setUseBase64Encoding</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> defaultCookieSerializer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">redisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">GenericJackson2JsonRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div></template>
