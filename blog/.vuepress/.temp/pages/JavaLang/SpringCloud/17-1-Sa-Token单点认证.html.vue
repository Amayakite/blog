<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>凡是稍微上点规模的系统，统一认证中心都是绕不过去的槛。而单点登录——便是我们搭建统一认证中心的关键。</p>
<p>那么什么是单点登陆，它能解决哪些问题呢？</p>
<p>举个场景，假设我们的系统被切割为N个部分：商城、论坛、直播、社交…… 如果用户每访问一个模块都要登录一次，那么用户将会疯掉， 为了优化用户体验，我们急需一套机制将这N个系统的认证授权互通共享，让用户在一个系统登录之后，便可以畅通无阻的访问其它所有系统。</p>
<p>单点登录——就是为了解决这个问题而生！</p>
<p>简而言之，单点登录可以做到：<strong><code>在多个互相信任的系统中，用户只需登录一次，就可以访问所有系统。</code></strong></p>
<p>对于单点登录，网上教程大多以CAS模式为主，其实对于不同的系统架构，实现单点登录的步骤也大为不同，Sa-Token 由简入难将其划分为三种模式：</p>
<table>
<thead>
<tr>
<th>系统架构</th>
<th>采用模式</th>
<th>简介</th>
</tr>
</thead>
<tbody>
<tr>
<td>前端同域 + 后端同 Redis</td>
<td>模式一</td>
<td>共享 Cookie 同步会话</td>
</tr>
<tr>
<td>前端不同域 + 后端同 Redis</td>
<td>模式二</td>
<td>URL重定向传播会话</td>
</tr>
<tr>
<td>前端不同域 + 后端不同 Redis（Client端没有Redis）</td>
<td>模式三</td>
<td>Http请求获取会话</td>
</tr>
</tbody>
</table>
<ol>
<li>前端同域：就是指多个系统可以部署在同一个主域名之下，比如：<code>c1.domain.com</code>、<code>c2.domain.com</code>、<code>c3.domain.com</code>。</li>
<li>后端同Redis：就是指多个系统可以连接同一个Redis，其它的缓存数据中心亦可。PS：这里并不需要把所有项目的数据都放在同一个Redis中，Sa-Token提供了 <strong><code>[权限缓存与业务缓存分离]</code></strong> 的解决方案，详情戳：<a href="http://sa-token.dev33.cn/doc/index.html#/plugin/alone-redis" target="_blank" rel="noopener noreferrer">Alone独立Redis插件<ExternalLinkIcon/></a>。</li>
<li>如果既无法做到前端同域，也无法做到后端同Redis，那么只能走模式三，Http请求获取会话（Sa-Token对SSO提供了完整的封装，你只需要按照示例从文档上复制几段代码便可以轻松集成）。</li>
<li>技术选型一定要根据系统架构对症下药，切不可胡乱选择。</li>
</ol>
<h2 id="🎉统一认证中心sso-server" tabindex="-1"><a class="header-anchor" href="#🎉统一认证中心sso-server" aria-hidden="true">#</a> 🎉统一认证中心SSO-Server</h2>
<p>我们首先需要一个地方来统一处理用户的权限校验值类的，所以单独创建一个module</p>
<h3 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h3>
<p>除了 <strong>sa-token-spring-boot-starter</strong> 以外，其它包都是可选的：</p>
<ul>
<li>在SSO模式三时 Redis 相关包是可选的</li>
<li>在前后端分离模式下可以删除 thymeleaf 相关包</li>
<li>在不需要SSO模式三单点注销的情况下可以删除 http 工具包</li>
</ul>
<p>建议先完整测试三种模式之后再对pom依赖进行酌情删减。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Sa-Token 整合 Redis (使用 jackson 序列化方式) --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-dao-redis-jackson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- Sa-Token插件：权限缓存与业务缓存分离 这个可选 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-alone-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- 视图引擎（在前后端不分离模式下提供视图支持） --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-thymeleaf<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Http请求工具（在模式三的单点注销功能下用到，如不需要可以注释掉） --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.ejlchina<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>okhttps<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.4.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!--        基础内容--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3>
<p>下面的根据自己用到的对应的模式开启</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9000</span>

<span class="token comment"># Sa-Token 配置</span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
  <span class="token comment"># 首先是标准配置</span>
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

  <span class="token comment"># -------------- SSO-模式一相关配置  (非模式一不需要配置) 前端同域 + 后端同 Redis</span>
  <span class="token comment"># cookie:</span>
  <span class="token comment"># 配置Cookie作用域  这里会彪黄，不影响，注意，是要在cookie的下后方</span>
  <span class="token comment"># domain: stp.com</span>

    <span class="token comment"># ------- SSO-模式二相关配置  前端不同域 + 后端同 Redis</span>
  <span class="token key atrule">sso</span><span class="token punctuation">:</span>
    <span class="token comment"># Ticket有效期 (单位: 秒)，默认五分钟</span>
    <span class="token key atrule">ticket-timeout</span><span class="token punctuation">:</span> <span class="token number">300</span>
    <span class="token comment"># 所有允许的授权回调地址</span>
    <span class="token key atrule">allow-url</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
    <span class="token comment"># 是否打开单点注销功能</span>
    <span class="token key atrule">is-slo</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># ------- SSO-模式三相关配置 前端不同域 + 后端不同 Redis</span>
    <span class="token comment">#（下面的配置在SSO模式三并且 is-slo=true 时打开）</span>
    <span class="token comment"># 是否打开模式三</span>
    <span class="token key atrule">isHttp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 接口调用秘钥（用于SSO模式三的单点注销功能）</span>
    <span class="token key atrule">secretkey</span><span class="token punctuation">:</span> kQwIOrYvnXmSDkwEiFngrKidMcdrgKor
    <span class="token comment"># ---- 除了以上配置项，你还需要为 Sa-Token 配置http请求处理器（文档有步骤说明）</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># Redis配置 （SSO模式一和模式二使用Redis来同步会话）</span>
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

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br></div></div><h3 id="设置登陆controller" tabindex="-1"><a class="header-anchor" href="#设置登陆controller" aria-hidden="true">#</a> 设置登陆Controller</h3>
<blockquote>
<p>注：在<code>setDoLoginHandle</code>函数里如果要获取name, pwd以外的参数</p>
<p>可通过<code>SaHolder.getRequest().getParam(&quot;xxx&quot;)</code>来获取</p>
<p>下面的Controller建议直接复制，当然那个sso可以换成别的</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SsoServiceController</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * SSO-Server端：处理所有SSO相关的请求，之后的章节会说明它的作用
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/*"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">serverRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">configSso</span><span class="token punctuation">(</span><span class="token class-name">SaTokenConfig</span> cfg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        配置：未登录的时候返回的view</span>
        cfg<span class="token punctuation">.</span>sso<span class="token punctuation">.</span><span class="token function">setNotLoginView</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token string">"当前会话在SSO-Server端尚未登录，请先访问"</span>
                    <span class="token operator">+</span> <span class="token string">"&lt;a href='/sso/doLogin?name=user&amp;pwd=123456' target='_blank'> doLogin登录 &lt;/a>"</span>
                    <span class="token operator">+</span> <span class="token string">"进行登录之后，刷新页面开始授权"</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        配置：处理登陆函数</span>
        cfg<span class="token punctuation">.</span>sso<span class="token punctuation">.</span><span class="token function">setDoLoginHandle</span><span class="token punctuation">(</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> pwd<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
<span class="token comment">//           TODO 目前只是模拟登陆，真实登陆的话，要该改成通过数据库来验证</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token string">"123456"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>pwd<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//                 注意 这个login非常非常非常重要，一定不能忘了。。</span>
                <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                这里返回啥都行（接收Object，这个SaResult相当于我们自己的手动搓一个返回值模板一样）</span>
                <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"登陆成功"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"登陆失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        配置HTTP处理请求（在模式三(前端不同域 + 后端不同 Redis)的单点注销功能下用到，如不需要可以注释掉）</span>
<span class="token comment">//        cfg.sso.setSendHttp(url -> {</span>
<span class="token comment">//            return OkHttps.sync(url).get().getBody().toString();</span>
<span class="token comment">//        });</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h3 id="配置全局异常处理" tabindex="-1"><a class="header-anchor" href="#配置全局异常处理" aria-hidden="true">#</a> 配置全局异常处理</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestControllerAdvice</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GlobalExceptionHandler</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 全局异常拦截
     */</span>
    <span class="token annotation punctuation">@ExceptionHandler</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<p>完成上面的内容后，你手动写一个简简单单的main，然后开启</p>
<p>接着访问<a href="http://localhost:9000/sso/auth" target="_blank" rel="noopener noreferrer">http://localhost:9000/sso/auth<ExternalLinkIcon/></a></p>
<p>注意，这里千万不要开例如<code>Cla**</code>之类的代理，不然你绝对访问不成功（MD找了半天BUG）</p>
<p>如果说你前面都是正常配置的话，这里应该是这样的</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121214051416.png" alt="image-20220121214051416" loading="lazy"></p>
<p>点击后，可以看到</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223317742.png" alt="image-20220121223317742" loading="lazy"></p>
<p>注意 如果没有这个token的话，表示登陆失败</p>
<h3 id="🎉sso路径下的api列表" tabindex="-1"><a class="header-anchor" href="#🎉sso路径下的api列表" aria-hidden="true">#</a> 🎉sso路径下的API列表</h3>
<p>如果你仅仅使用 Sa-Token 搭建 SSO-Server 端，而 Client 端使用其它框架的话，那么下面的 API 列表将给你的对接步骤做一份参考。</p>
<p>如果你在 Client 端也用到了 Sa-Token 框架，那么你可以选择跳过本小节，Sa-Token 对 Client 端也提供了相应的封装，</p>
<blockquote>
<p>单点登陆授权地址</p>
</blockquote>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>http://{host}:{port}/sso/auth
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接收参数：</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>是否必填</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>redirect</td>
<td>是</td>
<td>登录成功后的重定向地址，一般填写 location.href（从哪来回哪去）</td>
</tr>
<tr>
<td>mode</td>
<td>否</td>
<td>授权模式，取值 [simple, ticket]，simple=登录后直接重定向，ticket=带着ticket参数重定向，默认值为ticket</td>
</tr>
</tbody>
</table>
<p>访问接口后有两种情况：</p>
<ul>
<li>情况一：当前会话在 SSO 认证中心未登录，会进入登录页开始登录。</li>
<li>情况二：当前会话在 SSO 认证中心已登录，会被重定向至 <code>redirect</code> 地址，并携带 <code>ticket</code> 参数。</li>
</ul>
<blockquote>
<p>登陆接口</p>
</blockquote>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>http://{host}:{port}/sso/doLogin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接收参数：</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>是否必填</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td>是</td>
<td>用户名</td>
</tr>
<tr>
<td>pwd</td>
<td>是</td>
<td>密码</td>
</tr>
</tbody>
</table>
<p>此接口属于 RestAPI (使用ajax访问)，会进入后端配置的 <code>setDoLoginHandle</code> 函数中，另外需要注意： 此接口并非只能携带 name、pwd 参数，因为你可以在 setDoLoginHandle 函数里通过 <code>SaHolder.getRequest().getParam(&quot;xxx&quot;)</code> 来获取其它参数。</p>
<blockquote>
<p>Ticket校验接口</p>
</blockquote>
<p>此接口仅配置模式三 <code>(isHttp=true)</code> 时打开</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>http://{host}:{port}/sso/checkTicket
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接收参数：</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>是否必填</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>ticket</td>
<td>是</td>
<td>在步骤 5.1 中授权重定向时的 ticket 参数</td>
</tr>
<tr>
<td>ssoLogoutCall</td>
<td>否</td>
<td>单点注销时的回调通知地址，只在SSO模式三单点注销时需要携带此参数</td>
</tr>
</tbody>
</table>
<p>返回值场景：</p>
<ul>
<li>返回空，代表校验失败。</li>
<li>返回具体的 loginId，例如10001，代表校验成功，值为此 ticket 码代表的用户id。</li>
</ul>
<blockquote>
<p>单点注销接口</p>
</blockquote>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>http://{host}:{port}/sso/logout 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接受参数：</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>是否必填</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>loginId</td>
<td>否</td>
<td>要注销的账号id</td>
</tr>
<tr>
<td>secretkey</td>
<td>否</td>
<td>接口通信秘钥</td>
</tr>
<tr>
<td>back</td>
<td>否</td>
<td>注销成功后的重定向地址</td>
</tr>
</tbody>
</table>
<p>此接口有两种调用方式</p>
<ol>
<li>
<p>在 Client 的前端页面引导用户直接跳转，并带有 back 参数</p>
<ul>
<li>例如：<code>http://{host}:{port}/sso/logout?back=xxx</code>，代表用户注销成功后返回back地址</li>
</ul>
</li>
<li>
<p>在 Client 的后端通过 http 工具来调用</p>
<ul>
<li>
<p>例如：<code>http://{host}:{port}/sso/logout?loginId={value}&amp;secretkey={value}</code></p>
</li>
<li>
<p>代表注销 账号=loginId 的账号，返回json数据结果，形如：</p>
<ul>
<li>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"code"</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>    <span class="token comment">// 200表示请求成功，非200标识请求失败</span>
    <span class="token property">"msg"</span><span class="token operator">:</span> <span class="token string">"单点注销成功"</span><span class="token punctuation">,</span>
    <span class="token property">"data"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
</ul>
</li>
</ul>
</li>
</ol>
<p>SSO 认证中心只有这四个接口，接下来让我一起来看一下 Client 端的对接流程</p>
<h2 id="前端同域-后端同-redis" tabindex="-1"><a class="header-anchor" href="#前端同域-后端同-redis" aria-hidden="true">#</a> 前端同域 + 后端同 Redis</h2>
<h3 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h3>
<p>首先我们分析一下多个系统之间，为什么无法同步登录状态？</p>
<ol>
<li>前端的 <code>Token</code> 无法在多个系统下共享。</li>
<li>后端的 <code>Session</code> 无法在多个系统间共享。</li>
</ol>
<p>所以单点登录第一招，就是对症下药：</p>
<ol>
<li>使用 <code>共享Cookie</code> 来解决 Token 共享问题。</li>
<li>使用 <code>Redis</code> 来解决 Session 共享问题。</li>
</ol>
<p>所谓共享Cookie，就是主域名Cookie在二级域名下的共享，举个例子：</p>
<ul>
<li>写在父域名<code>stp.com</code>下的Cookie，在<code>s1.stp.com</code>、<code>s2.stp.com</code>等子域名都是可以共享访问的。</li>
</ul>
<p>而共享Redis，并不需要我们把所有项目的数据都放在同一个Redis中，Sa-Token提供了 <strong>[权限缓存与业务缓存分离]</strong> 的解决方案，详情戳：<a href="https://sa-token.dev33.cn/doc/index.html#/plugin/alone-redis" target="_blank" rel="noopener noreferrer">Alone独立Redis插件<ExternalLinkIcon/></a></p>
<p>这个插件使用还是比较简单的， 装即用</p>
<h3 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h3>
<p>首先修改hosts文件<code>(C:\windows\system32\drivers\etc\hosts)</code>，添加以下IP映射，方便我们进行测试：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>127.0.0.1 sso.stp.com
127.0.0.1 s1.stp.com
127.0.0.1 s2.stp.com
127.0.0.1 s3.stp.com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>PS:这里建议使用<a href="https://github.com/oldj/SwitchHosts/releases" target="_blank" rel="noopener noreferrer">SwitchHosts<ExternalLinkIcon/></a>来进行管理（PS：安装后右键图标，设置下一管理员身份运行）</p>
<h3 id="指定cookie的作用域" tabindex="-1"><a class="header-anchor" href="#指定cookie的作用域" aria-hidden="true">#</a> 指定Cookie的作用域</h3>
<p>在<code>sso.stp.com</code>访问服务器，其Cookie也只能写入到<code>sso.stp.com</code>下，为了将Cookie写入到其父级域名<code>stp.com</code>下，我们需要更改 SSO-Server 端的 yml 配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
    <span class="token key atrule">cookie</span><span class="token punctuation">:</span>
        <span class="token comment"># 配置Cookie作用域  会彪黄，不影响</span>
        <span class="token key atrule">domain</span><span class="token punctuation">:</span> stp.com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这个配置原本是被注释掉的，现在将其打开。另外我们格外需要注意： 在SSO模式一测试完毕之后，一定要将这个配置再次注释掉，因为模式一与模式二三使用不同的授权流程，这行配置会影响到我们模式二和模式三的正常运行。</p>
<h3 id="搭建client项目" tabindex="-1"><a class="header-anchor" href="#搭建client项目" aria-hidden="true">#</a> 搭建Client项目</h3>
<p>创建个：<code> sa-token-demo-sso1-client</code>项目，依赖如下</p>
<h4 id="依赖准备" tabindex="-1"><a class="header-anchor" href="#依赖准备" aria-hidden="true">#</a> 依赖准备</h4>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${sa-token-version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Sa-Token 整合redis (使用jackson序列化方式) --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-dao-redis-jackson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${sa-token-version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Sa-Token插件：权限缓存与业务缓存分离 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-alone-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${sa-token-version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h4 id="controller控制器" tabindex="-1"><a class="header-anchor" href="#controller控制器" aria-hidden="true">#</a> Controller控制器</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SsoClientController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/*"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> authUrl <span class="token operator">=</span> <span class="token class-name">SaManager</span><span class="token punctuation">.</span><span class="token function">getConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSso</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAuthUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> solUrl <span class="token operator">=</span> <span class="token class-name">SaManager</span><span class="token punctuation">.</span><span class="token function">getConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSso</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSloUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"&lt;h2>Sa-Token SSO-Client 应用端&lt;/h2>"</span> <span class="token operator">+</span>
                <span class="token string">"&lt;p>当前会话是否登录："</span> <span class="token operator">+</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"&lt;/p>"</span> <span class="token operator">+</span>
                <span class="token string">"&lt;p>&lt;a href=\"javascript:location.href='"</span> <span class="token operator">+</span> authUrl <span class="token operator">+</span> <span class="token string">"?mode=simple&amp;redirect=' + encodeURIComponent(location.href);\">登录&lt;/a> "</span> <span class="token operator">+</span>
                <span class="token string">"&lt;a href=\"javascript:location.href='"</span> <span class="token operator">+</span> solUrl <span class="token operator">+</span> <span class="token string">"?back=' + encodeURIComponent(location.href);\">注销&lt;/a> &lt;/p>"</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 全局异常拦截
     */</span>
    <span class="token annotation punctuation">@ExceptionHandler</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h4 id="application-yml配置" tabindex="-1"><a class="header-anchor" href="#application-yml配置" aria-hidden="true">#</a> application.yml配置</h4>
<p>这里嫌麻烦的话…可以用Nacos的配置中心来一步到位…</p>
<p>如果说你的服务端配置好了独立的<a href="https://sa-token.dev33.cn/doc/index.html#/plugin/alone-redis" target="_blank" rel="noopener noreferrer">Redis插件<ExternalLinkIcon/></a>的话，这里也要对应的配置下，我这里就不演示了</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>

<span class="token comment"># sa-token配置</span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
  <span class="token comment"># SSO-相关配置</span>
  <span class="token key atrule">sso</span><span class="token punctuation">:</span>
    <span class="token comment"># SSO-Server端-单点登录授权地址</span>
    <span class="token key atrule">auth-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sso.stp.com<span class="token punctuation">:</span>9000/sso/auth
    <span class="token comment"># SSO-Server端-单点注销地址</span>
    <span class="token key atrule">slo-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sso.stp.com<span class="token punctuation">:</span>9000/sso/logout

    

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># Redis配置 （SSO模式一和模式二使用Redis来同步会话）</span>
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

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h4 id="启动类" tabindex="-1"><a class="header-anchor" href="#启动类" aria-hidden="true">#</a> 启动类</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * SSO模式一，Client端 Demo 
 */</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaSsoClientApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SaSsoClientApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"\nSa-Token SSO模式一 Client端启动成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="访问测试" tabindex="-1"><a class="header-anchor" href="#访问测试" aria-hidden="true">#</a> 访问测试</h3>
<p>启动项目，依次访问三个应用端：</p>
<ul>
<li><a href="http://s1.stp.com:9001/" target="_blank" rel="noopener noreferrer">http://s1.stp.com:9001/<ExternalLinkIcon/></a></li>
<li><a href="http://s2.stp.com:9002/" target="_blank" rel="noopener noreferrer">http://s2.stp.com:9002/<ExternalLinkIcon/></a></li>
<li><a href="http://s3.stp.com:9003/" target="_blank" rel="noopener noreferrer">http://s3.stp.com:9003/<ExternalLinkIcon/></a></li>
</ul>
<p>你直接访问，是这个内容</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223234108.png" alt="image-20220121223234108" loading="lazy"></p>
<p>点击登录后，会跳转到</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223249009.png" alt="image-20220121223249009" loading="lazy"></p>
<p>登录</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223259316.png" alt="image-20220121223259316" loading="lazy"></p>
<p>然后返回</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223342782.png" alt="image-20220121223342782" loading="lazy"></p>
<p>能发现登录成功了，并且你访问其他两个也会发现登陆成功</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121223410580.png" alt="image-20220121223410580" loading="lazy"></p>
<p>好了，模式1就到这里，是不是非常简单….</p>
<h2 id="🎉前端不同域-后端同-redis" tabindex="-1"><a class="header-anchor" href="#🎉前端不同域-后端同-redis" aria-hidden="true">#</a> 🎉前端不同域 + 后端同 Redis</h2>
<p>如果我们的多个系统：部署在不同的域名之下，但是后端可以连接同一个Redis，那么便可以使用 <strong><code>[URL重定向传播会话]</code></strong> 的方式做到单点登录。</p>
<h3 id="思路-1" tabindex="-1"><a class="header-anchor" href="#思路-1" aria-hidden="true">#</a> 思路</h3>
<p>首先我们再次复习一下，多个系统之间为什么无法同步登录状态？</p>
<ol>
<li>前端的<code>Token</code>无法在多个系统下共享。</li>
<li>后端的<code>Session</code>无法在多个系统间共享。</li>
</ol>
<p>关于第二点，使用 <a href="https://sa-token.dev33.cn/doc/index.html#/plugin/alone-redis" target="_blank" rel="noopener noreferrer">Alone独立Redis插件<ExternalLinkIcon/></a> 做到权限缓存直连 SSO-Redis 数据中心，或者直接配置通用Redis，反正横竖都解决了，这里就不多赘述</p>
<blockquote>
<p>而第一点，才是我们解决问题的关键所在，在跨域模式下，意味着 &quot;共享Cookie方案&quot; 的失效，我们必须采用一种新的方案来传递Token。</p>
</blockquote>
<ol>
<li>用户在 子系统 点击 <code>[登录]</code> 按钮。</li>
<li>用户跳转到子系统登录接口 <code>/sso/login</code>，并携带 <code>back参数</code> 记录初始页面URL。
<ul>
<li>形如：<code>http://{sso-client}/sso/login?back=xxx</code></li>
</ul>
</li>
<li>子系统检测到此用户尚未登录，再次将其重定向至SSO认证中心，并携带<code>redirect参数</code>记录子系统的登录页URL。
<ul>
<li>形如：<code>http://{sso-server}/sso/auth?redirect=xxx?back=xxx</code></li>
</ul>
</li>
<li>用户进入了 SSO认证中心 的登录页面，开始登录。
<ul>
<li>形如：<code>http://{sso-client}/sso/login?back=xxx&amp;ticket=xxxxxxxxx</code></li>
</ul>
</li>
<li>用户输入账号密码 并 登录成功，SSO认证中心再次将用户重定向至子系统的登录接口<code>/sso/login</code>，并携带<code>ticket码</code>参数。</li>
<li>子系统根据 <code>ticket码</code> 从 <code>SSO-Redis</code> 中获取账号id，并在子系统登录此账号会话。</li>
<li>子系统将用户再次重定向至最初始的 <code>back</code> 页面。</li>
</ol>
<p>整个过程，除了第四步用户在SSO认证中心登录时会被打断，其余过程均是自动化的，当用户在另一个子系统再次点击<code>[登录]</code>按钮，由于此用户在SSO认证中心已有会话存在， 所以第四步也将自动化，也就是单点登录的最终目的 —— <strong>一次登录，处处通行</strong>。</p>
<h3 id="准备工作-修改hosts" tabindex="-1"><a class="header-anchor" href="#准备工作-修改hosts" aria-hidden="true">#</a> 准备工作-修改Hosts</h3>
<p>该host，方便测试</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>127.0.0.1 sa-sso-server.com
127.0.0.1 sa-sso-client1.com
127.0.0.1 sa-sso-client2.com
127.0.0.1 sa-sso-client3.com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="搭建client" tabindex="-1"><a class="header-anchor" href="#搭建client" aria-hidden="true">#</a> 搭建Client</h3>
<h4 id="去除sso-server中的cookie作用域配置" tabindex="-1"><a class="header-anchor" href="#去除sso-server中的cookie作用域配置" aria-hidden="true">#</a> 去除SSO-Server中的cookie作用域配置</h4>
<p>在SSO模式一章节中我们打开了配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">sa-token</span><span class="token punctuation">:</span> 
<span class="token comment"># 下面的要注释掉</span>
    <span class="token comment">#cookie:</span>
        <span class="token comment"># 配置Cookie作用域</span>
        <span class="token comment">#domain: stp.com</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>此为模式一专属配置，现在我们将其注释掉，并按照注释提示打开其他相应的注释</p>
<p>Client的依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Sa-Token 整合redis (使用jackson序列化方式) --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-dao-redis-jackson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Sa-Token插件：权限缓存与业务缓存分离 可选 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.dev33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sa-token-alone-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.28.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- 视图引擎（在前后端不分离模式下提供视图支持） --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-thymeleaf<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h4 id="controller" tabindex="-1"><a class="header-anchor" href="#controller" aria-hidden="true">#</a> Controller</h4>
<p>同 SSO-Server 一样，Sa-Token 为 SSO-Client 端所需代码也提供了完整的封装，你只需提供一个访问入口，接入 Sa-Token 的方法即可。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * Sa-Token-SSO Client端 Controller 
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SsoClientController</span> <span class="token punctuation">{</span>

    <span class="token comment">// 首页 </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"&lt;h2>Sa-Token SSO-Client 应用端&lt;/h2>"</span> <span class="token operator">+</span> 
                    <span class="token string">"&lt;p>当前会话是否登录："</span> <span class="token operator">+</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"&lt;/p>"</span> <span class="token operator">+</span> 
                    <span class="token string">"&lt;p>&lt;a href=\"javascript:location.href='/sso/login?back=' + encodeURIComponent(location.href);\">登录&lt;/a> "</span> <span class="token operator">+</span> 
                    <span class="token string">"&lt;a href='/sso/logout?back=self'>注销&lt;/a>&lt;/p>"</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     * SSO-Client端：处理所有SSO相关请求 
     
     *         http://{host}:{port}/sso/login         
     -- Client端登录地址，接受参数：back=登录后的跳转地址 
     *         http://{host}:{port}/sso/logout        
     -- Client端单点注销地址（isSlo=true时打开），接受参数：back=注销后的跳转地址 
     *         http://{host}:{port}/sso/logoutCall    
     -- Client端单点注销回调地址（isSlo=true时打开），此接口为框架回调，开发者无需关心
     */</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/*"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">clientRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="配置sso认证中心地址-配置文件" tabindex="-1"><a class="header-anchor" href="#配置sso认证中心地址-配置文件" aria-hidden="true">#</a> 配置SSO认证中心地址（配置文件）</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>

<span class="token comment"># sa-token配置 </span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
  <span class="token comment"># SSO-相关配置</span>
  <span class="token key atrule">sso</span><span class="token punctuation">:</span>
    <span class="token comment"># SSO-Server端 统一认证地址 </span>
    <span class="token key atrule">auth-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sa<span class="token punctuation">-</span>sso<span class="token punctuation">-</span>server.com<span class="token punctuation">:</span>9000/sso/auth
    <span class="token comment"># 打开单点注销功能 </span>
    <span class="token key atrule">is-slo</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># 配置Sa-Token单独使用的Redis连接 （此处需要和SSO-Server端连接同一个Redis）</span>
    <span class="token comment"># 如果你那啥装了alone的话</span>
    <span class="token key atrule">alone-redis</span><span class="token punctuation">:</span> 
        <span class="token comment"># Redis数据库索引 (默认为0)</span>
        <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">1</span>
        <span class="token comment"># Redis服务器地址</span>
        <span class="token key atrule">host</span><span class="token punctuation">:</span> 127.0.0.1
        <span class="token comment"># Redis服务器连接端口</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
        <span class="token comment"># Redis服务器连接密码（默认为空）</span>
        <span class="token key atrule">password</span><span class="token punctuation">:</span> 

<span class="token comment"># 如果没有装的话</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># Redis配置 （SSO模式一和模式二使用Redis来同步会话）</span>
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


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><h3 id="测试访问" tabindex="-1"><a class="header-anchor" href="#测试访问" aria-hidden="true">#</a> 测试访问</h3>
<p>启动类照常写即可</p>
<p>依次启动 <code>SSO-Server</code> 与 <code>SSO-Client</code>（Client启动三个 9001 9002 9003）</p>
<p>然后从浏览器访问：<a href="http://sa-sso-client1.com:9001/" target="_blank" rel="noopener noreferrer">http://sa-sso-client1.com:9001/<ExternalLinkIcon/></a></p>
<p>第一次访问的话 百分之一千是false</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230119402.png" alt="image-20220121230119402" loading="lazy"></p>
<p>然后你走一遍登陆流程</p>
<p>变成true了</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230137950.png" alt="image-20220121230137950" loading="lazy"></p>
<p>接着你访问下同域名下的9002<a href="http://sa-sso-client1.com:9002/" target="_blank" rel="noopener noreferrer">http://sa-sso-client1.com:9002/<ExternalLinkIcon/></a></p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230153955.png" alt="image-20220121230153955" loading="lazy"></p>
<p>在访问下不同域名下的9003</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230303156.png" alt="image-20220121230303156" loading="lazy"></p>
<p>你会发现是false但是，当点击登录按钮之后</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230319911.png" alt="image-20220121230319911" loading="lazy"></p>
<p>立刻变成true了（就是点了下按钮）</p>
<blockquote>
<p>可以看出，除了在<code>Client1</code>端我们需要手动登录一次之外，在<code>Client2端</code>和<code>Client3端</code>都是可以无需再次认证，直接登录成功的。</p>
<p>你可以在控制台中看到请求过程</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121230429840.png" alt="image-20220121230429840" loading="lazy"></p>
</blockquote>
<p>以上流程解决了跨域模式下的单点登录，但是后端仍然采用了共享Redis来同步会话，如果我们的架构设计中Client端与Server端无法共享Redis，又该怎么完成单点登录？</p>
<h2 id="🎉🎉后端不同-redis-client端没有redis" tabindex="-1"><a class="header-anchor" href="#🎉🎉后端不同-redis-client端没有redis" aria-hidden="true">#</a> 🎉🎉后端不同 Redis（Client端没有Redis）</h2>
<p>如果既无法做到前端同域，也无法做到后端同Redis，那么可以使用模式三完成单点登录</p>
<blockquote>
<p>阅读本篇之前请务必先熟读SSO模式二！因为模式三仅仅属于模式二的一个特殊场景，熟读模式二有助于您快速理解本章内容</p>
</blockquote>
<h3 id="问题分析" tabindex="-1"><a class="header-anchor" href="#问题分析" aria-hidden="true">#</a> 问题分析</h3>
<p>我们先来分析一下，当后端不使用共享 Redis 时，会对架构产生哪些影响：</p>
<ol>
<li>Client 端无法直连 Redis 校验 ticket，取出账号id。</li>
<li>Client 端无法与 Server 端共用一套会话，需要自行维护子会话。</li>
<li>由于不是一套会话，所以无法“一次注销，全端下线”，需要额外编写代码完成单点注销。</li>
</ol>
<p>所以模式三的主要目标：也就是在 模式二的基础上 解决上述 三个难题</p>
<h3 id="在client端更该ticker校验方式" tabindex="-1"><a class="header-anchor" href="#在client端更该ticker校验方式" aria-hidden="true">#</a> 在Client端更该Ticker校验方式</h3>
<h4 id="修改sso-server的配置" tabindex="-1"><a class="header-anchor" href="#修改sso-server的配置" aria-hidden="true">#</a> 修改SSO-Server的配置</h4>
<p>打开一个，模式二不关</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">sa-token</span><span class="token punctuation">:</span> 
    <span class="token key atrule">sso</span><span class="token punctuation">:</span> 
        <span class="token comment"># 打开模式三（使用Http请求校验ticket）</span>
        <span class="token key atrule">is-http</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token comment"># SSO-Server端 ticket校验地址 </span>
        <span class="token key atrule">check-ticket-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sa<span class="token punctuation">-</span>sso<span class="token punctuation">-</span>server.com<span class="token punctuation">:</span>9000/sso/checkTicket

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>最终应该是这样的</p>
<p>注意 这里额外添加了一个秘钥，之后会用到</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9000</span>

<span class="token comment"># Sa-Token 配置</span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
  <span class="token comment"># 首先是标准配置</span>
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
  <span class="token comment"># -------------- SSO-模式一相关配置  (非模式一不需要配置) 前端同域 + 后端同 Redis</span>
  <span class="token comment"># cookie:</span>
  <span class="token comment"># 配置Cookie作用域  这里会彪黄，不影响，注意，是要在cookie的下后方</span>
  <span class="token comment"># domain: stp.com</span>

  <span class="token comment"># ------- SSO-模式二相关配置  前端不同域 + 后端同 Redis</span>
  <span class="token key atrule">sso</span><span class="token punctuation">:</span>
    <span class="token comment"># Ticket有效期 (单位: 秒)，默认五分钟</span>
    <span class="token key atrule">ticket-timeout</span><span class="token punctuation">:</span> <span class="token number">300</span>
    <span class="token comment"># 所有允许的授权回调地址</span>
    <span class="token key atrule">allow-url</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
    <span class="token comment"># 是否打开单点注销功能</span>
    <span class="token key atrule">is-slo</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># ------- SSO-模式三相关配置 前端不同域 + 后端不同 Redis</span>
    <span class="token comment">#（下面的配置在SSO模式三并且 is-slo=true 时打开）</span>
    <span class="token comment"># 是否打开模式三</span>
    <span class="token key atrule">isHttp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 接口调用秘钥（用于SSO模式三的单点注销功能）</span>
    <span class="token key atrule">secretkey</span><span class="token punctuation">:</span> kQwIOrYvnXmSDkwEiFngrKidMcdrgKor
    <span class="token comment"># ---- 除了以上配置项，你还需要为 Sa-Token 配置http请求处理器（文档有步骤说明）</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># Redis配置 （SSO模式一和模式二使用Redis来同步会话）</span>
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

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br></div></div><h4 id="修改sso-server端的controller" tabindex="-1"><a class="header-anchor" href="#修改sso-server端的controller" aria-hidden="true">#</a> 修改SSO-Server端的Controller</h4>
<p>新增一个内容</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SsoServiceController</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/*"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">serverRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">configSso</span><span class="token punctuation">(</span><span class="token class-name">SaTokenConfig</span> cfg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        配置：未登录的时候返回的view</span>
        cfg<span class="token punctuation">.</span>sso<span class="token punctuation">.</span><span class="token function">setNotLoginView</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token string">"当前会话在SSO-Server端尚未登录，请先访问"</span>
                    <span class="token operator">+</span> <span class="token string">"&lt;a href='/sso/doLogin?name=user&amp;pwd=123456' target='_blank'> doLogin登录 &lt;/a>"</span>
                    <span class="token operator">+</span> <span class="token string">"进行登录之后，刷新页面开始授权"</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        配置：处理登陆函数</span>
        cfg<span class="token punctuation">.</span>sso<span class="token punctuation">.</span><span class="token function">setDoLoginHandle</span><span class="token punctuation">(</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> pwd<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
<span class="token comment">//           TODO 目前只是模拟登陆，真实登陆的话，要该改成通过数据库来验证</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token string">"123456"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>pwd<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//                 注意 这个login非常非常非常重要，一定不能忘了。。</span>
                <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                这里返回啥都行（接收Object，这个SaResult相当于我们自己的手动搓一个返回值模板一样）</span>
                <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"登陆成功"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"登陆失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
<span class="token comment">//        配置HTTP处理请求（在模式三(前端不同域 + 后端不同 Redis)的单点注销功能下用到，如不需要可以注释掉）</span>
        cfg<span class="token punctuation">.</span>sso<span class="token punctuation">.</span><span class="token function">setSendHttp</span><span class="token punctuation">(</span>url <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">OkHttps</span><span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h4 id="client端-controller新增内容" tabindex="-1"><a class="header-anchor" href="#client端-controller新增内容" aria-hidden="true">#</a> Client端-Controller新增内容</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SsoClientController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"&lt;h2>Sa-Token SSO-Client 应用端&lt;/h2>"</span> <span class="token operator">+</span>
                <span class="token string">"&lt;p>当前会话是否登录："</span> <span class="token operator">+</span> <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"&lt;/p>"</span> <span class="token operator">+</span>
                <span class="token string">"&lt;p>&lt;a href=\"javascript:location.href='/sso/login?back=' + encodeURIComponent(location.href);\">登录&lt;/a> "</span> <span class="token operator">+</span>
                <span class="token string">"&lt;a href='/sso/logout?back=self'>注销&lt;/a>&lt;/p>"</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/*"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">clientRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 配置SSO相关参数</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">configSso</span><span class="token punctuation">(</span><span class="token class-name">SaTokenConfig</span> cfg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ... 其他代码</span>

        <span class="token comment">// 配置 Http 请求处理器</span>
        cfg<span class="token punctuation">.</span>sso<span class="token punctuation">.</span><span class="token function">setSendHttp</span><span class="token punctuation">(</span>url <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">OkHttps</span><span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 异常处理
     */</span>
    <span class="token annotation punctuation">@ExceptionHandler</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h4 id="client端-yaml配置" tabindex="-1"><a class="header-anchor" href="#client端-yaml配置" aria-hidden="true">#</a> Client端-yaml配置</h4>
<p>首先在yml中新增或者变动成如下内容 这里你可以把相关的和Sa-Token的Redis之类依赖和配置的去掉了</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
  <span class="token comment"># SSO-相关配置</span>
  <span class="token key atrule">sso</span><span class="token punctuation">:</span>
    <span class="token comment"># SSO-Server端 统一认证地址 </span>
    <span class="token key atrule">auth-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sa<span class="token punctuation">-</span>sso<span class="token punctuation">-</span>server.com<span class="token punctuation">:</span>9000/sso/auth
    <span class="token comment"># 使用Http请求校验ticket </span>
    <span class="token key atrule">is-http</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># SSO-Server端 ticket校验地址 </span>
    <span class="token key atrule">check-ticket-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sa<span class="token punctuation">-</span>sso<span class="token punctuation">-</span>server.com<span class="token punctuation">:</span>9000/sso/checkTicket
    <span class="token comment"># 打开单点注销功能 </span>
    <span class="token key atrule">is-slo</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 单点注销地址 </span>
    <span class="token key atrule">slo-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sa<span class="token punctuation">-</span>sso<span class="token punctuation">-</span>server.com<span class="token punctuation">:</span>9000/sso/logout
     <span class="token comment"># 接口调用秘钥  这个别忘了配</span>
    <span class="token key atrule">secretkey</span><span class="token punctuation">:</span> kQwIOrYvnXmSDkwEiFngrKidMcdrgKor
    <span class="token comment"># SSO-Server端 查询userinfo地址 这个下面要用到 </span>
    <span class="token key atrule">userinfo-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sa<span class="token punctuation">-</span>sso<span class="token punctuation">-</span>server.com<span class="token punctuation">:</span>9000/sso/userinfo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="新增controller" tabindex="-1"><a class="header-anchor" href="#新增controller" aria-hidden="true">#</a> 新增Controller</h4>
<p>注意 确保上面的userinfo配置好了</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 查询我的账号信息 </span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/myinfo"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">myinfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Object</span> userinfo <span class="token operator">=</span> <span class="token class-name">SaSsoUtil</span><span class="token punctuation">.</span><span class="token function">getUserinfo</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getLoginId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------info："</span> <span class="token operator">+</span> userinfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> userinfo<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>访问测试：<a href="http://sa-sso-client1.com:9001/sso/myinfo" target="_blank" rel="noopener noreferrer">http://sa-sso-client1.com:9001/sso/myinfo<ExternalLinkIcon/></a></p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121233439308.png" alt="image-20220121233439308" loading="lazy"></p>
<p>这样表示成功</p>
<h3 id="启动并测试" tabindex="-1"><a class="header-anchor" href="#启动并测试" aria-hidden="true">#</a> 启动并测试</h3>
<p>重启项目，访问测试：<a href="http://sa-sso-client1.com:9001/" target="_blank" rel="noopener noreferrer">http://sa-sso-client1.com:9001/<ExternalLinkIcon/></a>， 我们主要的测试点在于 <code>单点注销</code>，正常登录即可。</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/sso-type3-client-index.png" alt="sso-type3-client-index.png" loading="lazy"></p>
<p>点击 <strong><code>[注销]</code></strong> 按钮，即可单点注销成功。</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/sso-type3-slo-index.png" alt="sso-type3-slo-index.png" loading="lazy"></p>
<blockquote>
<p>PS：这里我们为了方便演示，使用的是超链接跳页面的形式，<strong>正式项目中使用 Ajax 调用接口即可做到无刷单点登录退出</strong></p>
</blockquote>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121234154695.png" alt="image-20220121234154695" loading="lazy"></p>
<h2 id="三种配置模式的总结" tabindex="-1"><a class="header-anchor" href="#三种配置模式的总结" aria-hidden="true">#</a> 三种配置模式的总结</h2>
<p>当我们熟读三种模式的单点登录之后，其实不难发现：所谓单点登录，其本质就是多个系统之间的会话共享。</p>
<p>当我们理解这一点之后，三种模式的工作原理也浮出水面：</p>
<ul>
<li>模式一：采用共享 Cookie 来做到前端 Token 的共享，从而达到后端的 Session 会话共享。
<ul>
<li>这个没多少人用了</li>
</ul>
</li>
<li>模式二：采用 URL 重定向，以 ticket 码为授权中介，做到多个系统间的会话传播。
<ul>
<li>这个一般来说，如果你的微服务愿意接受全都装上那啥Sa-Token的话就可以</li>
</ul>
</li>
<li>模式三：采用 Http 请求主动查询会话，做到 Client 端与 Server 端的会话同步。
<ul>
<li>当你 微服务的服务端不想装上和Sa-Token配套的Redis的时候用这个</li>
</ul>
</li>
</ul>
<h2 id="🎉配置域名校验" tabindex="-1"><a class="header-anchor" href="#🎉配置域名校验" aria-hidden="true">#</a> 🎉配置域名校验</h2>
<h3 id="目前存在的漏洞" tabindex="-1"><a class="header-anchor" href="#目前存在的漏洞" aria-hidden="true">#</a> 目前存在的漏洞</h3>
<p>在前面章节的 SSO-Server 示例中，配置项 <code>sa-token.sso.allow-url=*</code> 意为配置所有允许的Client端授权地址，不在此配置项中的URL将无法单点登录成功</p>
<p>为了方便测试，上述代码将其配置为<code>*</code>，但是，在生产环境中，此配置项绝对不能配置为 * ，否则会有被 Ticket 劫持的风险</p>
<p>假设攻击者根据模仿我们的授权地址，巧妙的构造一个URL</p>
<blockquote>
<p><a href="http://sa-sso-server.com:9000/sso/auth?redirect=https://www.baidu.com/" target="_blank" rel="noopener noreferrer">http://sa-sso-server.com:9000/sso/auth?redirect=https://www.baidu.com/<ExternalLinkIcon/></a></p>
</blockquote>
<p>这个时候不知情的用户访问到了这个URL的时候，它将被重定向至百度首页</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121234818516.png" alt="image-20220121234818516" loading="lazy"></p>
<p>可以看到，代表着用户身份的 Ticket 码也显现到了URL之中，借此漏洞，攻击者完全可以构建一个URL将小红的 Ticket 码自动提交到攻击者自己的服务器，伪造小红身份登录网站</p>
<h3 id="防范方法" tabindex="-1"><a class="header-anchor" href="#防范方法" aria-hidden="true">#</a> 防范方法</h3>
<p>造成此漏洞的直接原因就是SSO-Server认证中心没有对 <code>redirect地址</code> 进行任何的限制，防范的方法也很简单，就是对<code>redirect参数</code>进行校验，如果其不在指定的URL列表中时，拒绝下放ticket</p>
<p>我们将其配置为一个具体的URL：<code>allow-url=http://sa-sso-client1.com:9001/sso/login</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># server端</span>
<span class="token comment"># 端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9000</span>

<span class="token comment"># Sa-Token 配置</span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
  <span class="token comment"># 首先是标准配置</span>
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

  <span class="token comment"># ------- SSO-模式二相关配置  前端不同域 + 后端同 Redis</span>
  <span class="token key atrule">sso</span><span class="token punctuation">:</span>
    <span class="token comment"># Ticket有效期 (单位: 秒)，默认五分钟</span>
    <span class="token key atrule">ticket-timeout</span><span class="token punctuation">:</span> <span class="token number">300</span>
    <span class="token comment"># 所有允许的授权回调地址</span>
    <span class="token key atrule">allow-url</span><span class="token punctuation">:</span> <span class="token string">"http://sa-sso-client1.com:9001"</span>
    <span class="token comment"># 是否打开单点注销功能</span>
    <span class="token key atrule">is-slo</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># ------- SSO-模式三相关配置 前端不同域 + 后端不同 Redis</span>
    <span class="token comment">#（下面的配置在SSO模式三并且 is-slo=true 时打开）</span>
    <span class="token comment"># 是否打开模式三</span>
    <span class="token key atrule">isHttp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 接口调用秘钥（用于SSO模式三的单点注销功能）</span>
    <span class="token key atrule">secretkey</span><span class="token punctuation">:</span> kQwIOrYvnXmSDkwEiFngrKidMcdrgKor
    <span class="token comment"># ---- 除了以上配置项，你还需要为 Sa-Token 配置http请求处理器（文档有步骤说明）</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># Redis配置 （SSO模式一和模式二使用Redis来同步会话）</span>
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

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br></div></div><p>再次访问上述连接：</p>
<p><a href="http://sa-sso-server.com:9000/sso/auth?redirect=https://www.baidu.com/" target="_blank" rel="noopener noreferrer">http://sa-sso-server.com:9000/sso/auth?redirect=https://www.baidu.com/<ExternalLinkIcon/></a></p>
<p>可以看到如下内容</p>
<p><img src="/images/SpringCloud/17-1-Sa-Token单点认证/image-20220121235128539.png" alt="image-20220121235128539" loading="lazy"></p>
<p>域名没有通过校验，拒绝授权</p>
<h3 id="🎉配置安全性参考表" tabindex="-1"><a class="header-anchor" href="#🎉配置安全性参考表" aria-hidden="true">#</a> 🎉配置安全性参考表</h3>
<table>
<thead>
<tr>
<th>配置方式</th>
<th>举例</th>
<th>安全性</th>
<th>建议</th>
</tr>
</thead>
<tbody>
<tr>
<td>配置为*</td>
<td><code>*</code></td>
<td>低</td>
<td><strong>禁止在生产环境下使用</strong></td>
</tr>
<tr>
<td>配置到域名</td>
<td><code>http://sa-sso-client1.com/*</code></td>
<td>中</td>
<td>不建议在生产环境下使用</td>
</tr>
<tr>
<td>配置到详细地址</td>
<td><code>http://sa-sso-client1.com:9001/sso/login</code></td>
<td>高</td>
<td>可以在生产环境下使用</td>
</tr>
</tbody>
</table>
<blockquote>
<p>为什么不直接回传-token，而是先回传-ticket，再用-ticket-去查询对应的账号id？</p>
<p>Token 作为长时间有效的会话凭证，在任何时候都不应该直接暴露在 URL 之中（虽然 Token 直接的暴露本身不会造成安全漏洞，但会为很多漏洞提供可乘之机）</p>
<p>为了不让系统安全处于亚健康状态，Sa-Token-SSO 选择先回传 Ticket，再由 Ticket 获取账号id，且 Ticket 一次性用完即废，提高安全性。</p>
</blockquote>
<h2 id="定制化登陆界面" tabindex="-1"><a class="header-anchor" href="#定制化登陆界面" aria-hidden="true">#</a> 定制化登陆界面</h2>
<h3 id="何时引导用户去登陆" tabindex="-1"><a class="header-anchor" href="#何时引导用户去登陆" aria-hidden="true">#</a> 何时引导用户去登陆</h3>
<h4 id="前端按钮跳转" tabindex="-1"><a class="header-anchor" href="#前端按钮跳转" aria-hidden="true">#</a> 前端按钮跳转</h4>
<p>前端页面准备一个**<code>[登录]</code>**按钮，当用户点击按钮时，跳转到登录接口</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript:location.href=<span class="token punctuation">'</span>/sso/login?back=<span class="token punctuation">'</span> + encodeURIComponent(location.href);<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>登录<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="后端拦截重定向" tabindex="-1"><a class="header-anchor" href="#后端拦截重定向" aria-hidden="true">#</a> 后端拦截重定向</h4>
<p>在后端注册全局过滤器（或拦截器、或全局异常处理），拦截需要登录后才能访问的页面资源，将未登录的访问重定向至登录接口</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Sa-Token 配置类 
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaTokenConfigure</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/** 注册 [Sa-Token全局过滤器] */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SaServletFilter</span> <span class="token function">getSaServletFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SaServletFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addInclude</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addExclude</span><span class="token punctuation">(</span><span class="token string">"/sso/*"</span><span class="token punctuation">,</span> <span class="token string">"/favicon.ico"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setAuth</span><span class="token punctuation">(</span>obj <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">String</span> back <span class="token operator">=</span> <span class="token class-name">SaFoxUtil</span><span class="token punctuation">.</span><span class="token function">joinParam</span><span class="token punctuation">(</span><span class="token class-name">SaHolder</span><span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">SpringMVCUtil</span><span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getQueryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">SaHolder</span><span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string">"/sso/login?back="</span> <span class="token operator">+</span> <span class="token class-name">SaFoxUtil</span><span class="token punctuation">.</span><span class="token function">encodeUrl</span><span class="token punctuation">(</span>back<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h4 id="🎉推荐-后端拦截-前端跳转" tabindex="-1"><a class="header-anchor" href="#🎉推荐-后端拦截-前端跳转" aria-hidden="true">#</a> 🎉推荐：后端拦截-前端跳转</h4>
<p>首先，后端仍需要提供拦截，但是不直接引导用户重定向，而是返回未登录的提示信息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Sa-Token 配置类 
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaTokenConfigure</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/** 注册 [Sa-Token全局过滤器] */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SaServletFilter</span> <span class="token function">getSaServletFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SaServletFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addInclude</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addExclude</span><span class="token punctuation">(</span><span class="token string">"/sso/*"</span><span class="token punctuation">,</span> <span class="token string">"/favicon.ico"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setAuth</span><span class="token punctuation">(</span>obj <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 与前端约定好，code=401时代表会话未登录 </span>
                        <span class="token class-name">SaRouter</span><span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setCode</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>前端接受到返回结果 <code>code=401</code> 时，开始跳转至登录接口</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>code <span class="token operator">==</span> <span class="token number">401</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">'/sso/login?back='</span> <span class="token operator">+</span> <span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span>href<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这种方案比较适合以 Ajax 访问的 RestAPI 接口重定向</p>
<h3 id="如何自定义登陆api的地址" tabindex="-1"><a class="header-anchor" href="#如何自定义登陆api的地址" aria-hidden="true">#</a> 如何自定义登陆API的地址</h3>
<h4 id="如果只是想在-setdologinhandle-函数里获取除-name、pwd-以外的参数" tabindex="-1"><a class="header-anchor" href="#如果只是想在-setdologinhandle-函数里获取除-name、pwd-以外的参数" aria-hidden="true">#</a> 如果只是想在-setdologinhandle-函数里获取除-name、pwd-以外的参数</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 在任意代码处获取前端提交的参数 </span>
<span class="token class-name">String</span> xxx <span class="token operator">=</span> <span class="token class-name">SaHolder</span><span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getParam</span><span class="token punctuation">(</span><span class="token string">"xxx"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="想完全自定义一个接口来接受前端登录请求" tabindex="-1"><a class="header-anchor" href="#想完全自定义一个接口来接受前端登录请求" aria-hidden="true">#</a> 想完全自定义一个接口来接受前端登录请求</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 直接定义一个拦截路由为 `/sso/doLogin` 的接口即可 </span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/doLogin"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">ss</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> pwd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------ 请求进入了自定义的API接口 ---------- "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"sa"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token string">"123456"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>pwd<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token number">10001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"登录成功！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"登录失败！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="🎉自定义api的路由" tabindex="-1"><a class="header-anchor" href="#🎉自定义api的路由" aria-hidden="true">#</a> 🎉自定义API的路由</h2>
<h3 id="修改全局变量的方式" tabindex="-1"><a class="header-anchor" href="#修改全局变量的方式" aria-hidden="true">#</a> 修改全局变量的方式</h3>
<p>在之前的章节中，我们演示了如何搭建一个SSO认证中心</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Sa-Token-SSO Server端 Controller 
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SsoServerController</span> <span class="token punctuation">{</span>

    <span class="token comment">// SSO-Server端：处理所有SSO相关请求 </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/*"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">serverRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ... 其它代码</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>这种写法集成简单但却不够灵活。例如认证中心地址只能是：<code>http://{host}:{port}/sso/auth</code>，如果我们想要自定义其API地址，应该怎么做呢？</p>
<p>我们可以打开SSO模块相关源码，有关 API 的设计都定义在：<a href="https://gitee.com/dromara/sa-token/blob/master/sa-token-core/src/main/java/cn/dev33/satoken/sso/SaSsoConsts.java" target="_blank" rel="noopener noreferrer">SaSsoConsts.java<ExternalLinkIcon/></a> 中，这些值从架构设计上来讲属于常量却并未使用 <code>final</code> 修饰，目的就是为了方便我们对其二次修改。</p>
<p>例如，我们可以在 Main 方法启动类或者 SSO 配置方法中修改变量值：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 配置SSO相关参数 </span>
<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">configSso</span><span class="token punctuation">(</span><span class="token class-name">SaTokenConfig</span> cfg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 自定义API地址</span>
    <span class="token class-name">SaSsoConsts<span class="token punctuation">.</span>Api</span><span class="token punctuation">.</span>ssoAuth <span class="token operator">=</span> <span class="token string">"/sso/auth2"</span><span class="token punctuation">;</span>
    <span class="token comment">// ... </span>

    <span class="token comment">// SSO 相关配置</span>
    cfg<span class="token punctuation">.</span>sso<span class="token punctuation">.</span>setXxx <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>启动项目，统一认证地址就被我们修改成了：<code>http://{host}:{port}/sso/auth2</code></p>
<h3 id="拆分路由入口的方式" tabindex="-1"><a class="header-anchor" href="#拆分路由入口的方式" aria-hidden="true">#</a> 拆分路由入口的方式</h3>
<p>根据上述路由入口：<code>@RequestMapping(&quot;/sso/*&quot;)</code>，我们给它起一个合适的名字 —— 聚合式路由。</p>
<p>与之对应的，我们可以将其修改为拆分式路由：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Sa-Token-SSO Server端 Controller 
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SsoServerController</span> <span class="token punctuation">{</span>

    <span class="token comment">// SSO-Server：统一认证地址 </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/auth"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">ssoAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// SSO-Server：RestAPI 登录接口 </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/doLogin"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoDoLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">ssoDoLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// SSO-Server：校验ticket 获取账号id </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/checkTicket"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoCheckTicket</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">ssoCheckTicket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// SSO-Server：单点注销 </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/sso/logout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">ssoLogout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">ssoServerLogout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ... 其它方法 </span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>拆分式路由 与 聚合式路由 在功能上完全等价，且提供了更为细致的路由管控。</p>
<h2 id="🎉前后端分离的整合方案" tabindex="-1"><a class="header-anchor" href="#🎉前后端分离的整合方案" aria-hidden="true">#</a> 🎉前后端分离的整合方案</h2>
<p>之前的案例中，我们使用的都是前后端不分离：服务器渲染了html页面</p>
<p>这里以改造案例2(Client端)为例</p>
<h3 id="新增h5controller接口" tabindex="-1"><a class="header-anchor" href="#新增h5controller接口" aria-hidden="true">#</a> 新增H5Controller接口</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 前后台分离架构下集成SSO所需的代码 
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">H5Controller</span> <span class="token punctuation">{</span>

    <span class="token comment">// 当前是否登录 </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/isLogin"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 返回SSO认证中心登录地址 </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/getSsoAuthUrl"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">getSsoAuthUrl</span><span class="token punctuation">(</span><span class="token class-name">String</span> clientLoginUrl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> serverAuthUrl <span class="token operator">=</span> <span class="token class-name">SaSsoUtil</span><span class="token punctuation">.</span><span class="token function">buildServerAuthUrl</span><span class="token punctuation">(</span>clientLoginUrl<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>serverAuthUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 根据ticket进行登录 </span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/doLoginByTicket"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">doLoginByTicket</span><span class="token punctuation">(</span><span class="token class-name">String</span> ticket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> loginId <span class="token operator">=</span> <span class="token class-name">SaSsoHandle</span><span class="token punctuation">.</span><span class="token function">checkTicket</span><span class="token punctuation">(</span>ticket<span class="token punctuation">,</span> <span class="token string">"/doLoginByTicket"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>loginId <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span>loginId<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getTokenValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"无效ticket："</span> <span class="token operator">+</span> ticket<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>

    <span class="token comment">// 全局异常拦截 </span>
    <span class="token annotation punctuation">@ExceptionHandler</span>
    <span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h3 id="增加跨域过滤器" tabindex="-1"><a class="header-anchor" href="#增加跨域过滤器" aria-hidden="true">#</a> 增加跨域过滤器</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>pj<span class="token punctuation">.</span>h5</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">Filter</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">FilterChain</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">FilterConfig</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ServletException</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ServletRequest</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ServletResponse</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>core<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Order</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 跨域过滤器
 * <span class="token keyword">@author</span> kong 
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CorsFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>

	<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> OPTIONS <span class="token operator">=</span> <span class="token string">"OPTIONS"</span><span class="token punctuation">;</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> res<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> chain<span class="token punctuation">)</span>
			<span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
		<span class="token class-name">HttpServletRequest</span> request <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> req<span class="token punctuation">;</span>
		<span class="token class-name">HttpServletResponse</span> response <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">)</span> res<span class="token punctuation">;</span>
		
		<span class="token comment">// 允许指定域访问跨域资源</span>
		response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Origin"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 允许所有请求方式</span>
		response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Methods"</span><span class="token punctuation">,</span> <span class="token string">"POST, GET, OPTIONS, DELETE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 有效时间</span>
		response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Max-Age"</span><span class="token punctuation">,</span> <span class="token string">"3600"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 允许的header参数</span>
		response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Headers"</span><span class="token punctuation">,</span> <span class="token string">"x-requested-with,satoken"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 如果是预检请求，直接返回</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>OPTIONS<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"=======================浏览器发来了OPTIONS预检请求=========="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// System.out.println("*********************************过滤器被使用**************************");</span>
		chain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">FilterConfig</span> filterConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br></div></div><h3 id="改造server端" tabindex="-1"><a class="header-anchor" href="#改造server端" aria-hidden="true">#</a> 改造Server端</h3>
<p>疑问：上述代码都是针对 Client 端进行拆分，如果我想在 SSO-Server 端也进行前后台分离改造，应该怎么做？</p>
<blockquote>
<p>答：解决思路都是大同小异的，与Client一样，我们需要把原本在 “后端处理的授权重定向逻辑” 拿到前端来实现</p>
</blockquote>
<p>跨域和上面你的一样，改一改Controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">H5Controller</span> <span class="token punctuation">{</span>
	
	<span class="token doc-comment comment">/**
	 * 获取 redirectUrl 
	 */</span>
	<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/getRedirectUrl"</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">getRedirectUrl</span><span class="token punctuation">(</span><span class="token class-name">String</span> redirect<span class="token punctuation">,</span> <span class="token class-name">String</span> mode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 未登录情况下，返回 code=401 </span>
		<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">code</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 已登录情况下，构建 redirectUrl </span>
		<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">SaSsoConsts</span><span class="token punctuation">.</span>MODE_SIMPLE<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>mode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 模式一 </span>
			<span class="token class-name">SaSsoUtil</span><span class="token punctuation">.</span><span class="token function">checkRedirectUrl</span><span class="token punctuation">(</span><span class="token class-name">SaFoxUtil</span><span class="token punctuation">.</span><span class="token function">decoderUrl</span><span class="token punctuation">(</span>redirect<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>redirect<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token comment">// 模式二或模式三 </span>
			<span class="token class-name">String</span> redirectUrl <span class="token operator">=</span> <span class="token class-name">SaSsoUtil</span><span class="token punctuation">.</span><span class="token function">buildRedirectUrl</span><span class="token punctuation">(</span><span class="token class-name">StpUtil</span><span class="token punctuation">.</span><span class="token function">getLoginId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> redirect<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>redirectUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 全局异常拦截 </span>
	<span class="token annotation punctuation">@ExceptionHandler</span>
	<span class="token keyword">public</span> <span class="token class-name">SaResult</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
		<span class="token keyword">return</span> <span class="token class-name">SaResult</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>然后更该下client端的配置即可</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">sa-token</span><span class="token punctuation">:</span>
    <span class="token key atrule">sso</span><span class="token punctuation">:</span> 
        <span class="token comment"># SSO-Server端 统一认证地址 </span>
        <span class="token key atrule">auth-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span>8848/你的最终配置
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="相关的配置表" tabindex="-1"><a class="header-anchor" href="#相关的配置表" aria-hidden="true">#</a> 相关的配置表</h2>
<h3 id="server端" tabindex="-1"><a class="header-anchor" href="#server端" aria-hidden="true">#</a> Server端</h3>
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
<td>ticketTimeout</td>
<td>long</td>
<td>300</td>
<td>ticket 有效期 （单位: 秒）</td>
</tr>
<tr>
<td>allowUrl</td>
<td>String</td>
<td>*</td>
<td>所有允许的授权回调地址，多个用逗号隔开（不在此列表中的URL将禁止下放ticket），参考：<a href="https://sa-token.dev33.cn/doc/index.html#/sso/sso-check-domain" target="_blank" rel="noopener noreferrer">SSO整合：配置域名校验<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>isSlo</td>
<td>Boolean</td>
<td>false</td>
<td>是否打开单点注销功能</td>
</tr>
<tr>
<td>isHttp</td>
<td>Boolean</td>
<td>false</td>
<td>是否打开模式三（此值为 true 时将使用 http 请求：校验ticket值、单点注销、获取userinfo）</td>
</tr>
<tr>
<td>secretkey</td>
<td>String</td>
<td>null</td>
<td>调用秘钥 （用于SSO模式三单点注销的接口通信身份校验）</td>
</tr>
</tbody>
</table>
<h3 id="client-端" tabindex="-1"><a class="header-anchor" href="#client-端" aria-hidden="true">#</a> Client 端</h3>
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
<td>authUrl</td>
<td>String</td>
<td>null</td>
<td>配置 Server 端单点登录授权地址</td>
</tr>
<tr>
<td>isSlo</td>
<td>Boolean</td>
<td>false</td>
<td>是否打开单点注销功能</td>
</tr>
<tr>
<td>isHttp</td>
<td>Boolean</td>
<td>false</td>
<td>是否打开模式三（此值为 true 时将使用 http 请求：校验ticket值、单点注销、获取userinfo）</td>
</tr>
<tr>
<td>checkTicketUrl</td>
<td>String</td>
<td>null</td>
<td>配置 Server 端的 ticket 校验地址</td>
</tr>
<tr>
<td>userinfoUrl</td>
<td>String</td>
<td>null</td>
<td>配置 Server 端查询 userinfo 地址</td>
</tr>
<tr>
<td>sloUrl</td>
<td>String</td>
<td>null</td>
<td>配置 Server 端单点注销地址</td>
</tr>
<tr>
<td>ssoLogoutCall</td>
<td>String</td>
<td>null</td>
<td>配置当前 Client 端的单点注销回调URL （为空时自动获取）</td>
</tr>
<tr>
<td>secretkey</td>
<td>String</td>
<td>null</td>
<td>接口调用秘钥 （用于SSO模式三单点注销的接口通信身份校验）</td>
</tr>
</tbody>
</table>
<h3 id="配置示例" tabindex="-1"><a class="header-anchor" href="#配置示例" aria-hidden="true">#</a> 配置示例</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Sa-Token 配置</span>
<span class="token key atrule">sa-token</span><span class="token punctuation">:</span> 
    <span class="token comment"># SSO-相关配置</span>
    <span class="token key atrule">sso</span><span class="token punctuation">:</span> 
        <span class="token comment"># SSO-Server端 单点登录授权地址 </span>
        <span class="token key atrule">auth-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//sa<span class="token punctuation">-</span>sso<span class="token punctuation">-</span>server.com<span class="token punctuation">:</span>9000/sso/auth

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></template>
