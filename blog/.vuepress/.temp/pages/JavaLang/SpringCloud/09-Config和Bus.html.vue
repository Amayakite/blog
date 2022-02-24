<template><h2 id="config概述" tabindex="-1"><a class="header-anchor" href="#config概述" aria-hidden="true">#</a> Config概述</h2>
<p>Spring Cloud Config是做服务配置的，Bus则是做服务总线的，他们两都做的非常好，但奈何阿里巴巴的Nacos太过强大..几乎垄断了半壁江山</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108171346242.png" alt="image-20220108171346242" loading="lazy"></p>
<p>在开始之前，我们先看看目前分布式系统中存在的问题</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108171543877.png" alt="image-20220108171543877" loading="lazy"></p>
<p>不知不觉已经这么多了啊….</p>
<p>不知道你有没有注意到，我们的每个工程内都有<code>application.yaml</code></p>
<p>虽然说东西并不多，但是每个都写起来非常痛苦，加啥我们现在最下面的4个module都要连接同一个数据库，那么我们没有一个统一的配置的玩意的话，这些都需要自己手动配置，非常痛苦</p>
<p>而且这还是4个的情况，如果是40个的话…要改40次</p>
<p>而且我们实际工作中，往往有一堆对应的环境，例如dev，prod，test，就需要三套配置</p>
<p>大厂中更多：dev、test、SIT、UAT、准生产、生产</p>
<p>所以SpringCloud提供了ConfigServer来解决这个问题</p>
<p>它使用方便，且一次配置处处生效</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108172329947.png" alt="image-20220108172329947" loading="lazy"></p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108172730837.png" alt="image-20220108172730837" loading="lazy"></p>
<p>至于配置文件存放到哪里</p>
<blockquote>
<p>由于Spring Cloud Config默认使用git来存储配置文件（也有其他方式，比如支持<a href="https://baike.baidu.com/item/SVN/3311103?fr=aladdin" target="_blank" rel="noopener noreferrer">SVN<ExternalLinkIcon/></a>(SVN现在没啥人用了)和本地文件），但最推荐的还是用Git，而且使用的是Http/Https访问形式</p>
<p>Git的话，国内推荐Gitee，局域网推荐GitLab</p>
<p>PS：GitLab汉化版Docker部署看这个<a href="https://hub.docker.com/r/twang2218/gitlab-ce-zh" target="_blank" rel="noopener noreferrer">链接<ExternalLinkIcon/></a>，不过不太推荐在自己的服务器上跑 要2G左右的内存</p>
</blockquote>
<h2 id="简单使用config" tabindex="-1"><a class="header-anchor" href="#简单使用config" aria-hidden="true">#</a> 简单使用Config</h2>
<h3 id="前期准备" tabindex="-1"><a class="header-anchor" href="#前期准备" aria-hidden="true">#</a> 前期准备</h3>
<p>这里我假设你会用git了，然后我现在用的是GitLab的仓库 你也可以自己在github上新建仓库</p>
<p>spring-cloud-config</p>
<p>然后克隆到本地</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108180050474.png" alt="image-20220108180050474" loading="lazy"></p>
<p>新建如上文件 并提交</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -m <span class="token string">"init yml"</span>
<span class="token function">git</span> push origin master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="/images/SpringCloud/09-Config和Bus/image-20220108180229992.png" alt="image-20220108180229992" loading="lazy"></p>
<p>我这里用的是gitlab</p>
<h3 id="配置中心的创建" tabindex="-1"><a class="header-anchor" href="#配置中心的创建" aria-hidden="true">#</a> 配置中心的创建</h3>
<p>都是刚需 主要是第一个，hystrix不用也可</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-config-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.10.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>接着编辑下你的配置文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3344</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>server
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span>
        <span class="token key atrule">git</span><span class="token punctuation">:</span>
          <span class="token comment"># git上面的仓库地址 可以是ssh url也可以是http/https 如果使用ssh的话要先准备好公钥</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//xxxxxxx.xxxx.xxxx/xxxxx/spring<span class="token punctuation">-</span>cloud<span class="token punctuation">-</span>config.git
          <span class="token comment"># 搜索目录</span>
          <span class="token key atrule">search-paths</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> spring<span class="token punctuation">-</span>cloud<span class="token punctuation">-</span>config
          <span class="token comment"># 如果使用的是https或者ssh协议 都需要提供账号密码之类的（密码可以是token】）</span>
          <span class="token key atrule">password</span><span class="token punctuation">:</span> xxxxx
          <span class="token key atrule">username</span><span class="token punctuation">:</span> xxxxx
          <span class="token comment"># 如果使用的是https，则需要加上下面这个配置</span>
         <span class="token comment">#skip-ssl-validation: true</span>
      <span class="token comment"># 分支</span>
      <span class="token key atrule">label</span><span class="token punctuation">:</span> master
    <span class="token comment"># Consul相关配置</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
        <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> 全局配置中心
<span class="token comment">#        hostname: 127.0.0.1</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>接着编辑下启动类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableConfigServer</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigCloud3344Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ConfigCloud3344Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>注意第三行的代码不要漏了</p>
<h3 id="配置中心使用" tabindex="-1"><a class="header-anchor" href="#配置中心使用" aria-hidden="true">#</a> 配置中心使用</h3>
<p>返回git，给config-dev.yaml添加一点内容并提交</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"master branch,spring-cloud-config/config-dev.yaml version=1"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="/images/SpringCloud/09-Config和Bus/image-20220108190011583.png" alt="image-20220108190011583" loading="lazy"></p>
<p>接着，打开浏览器，访问<a href="http://localhost:3344/master/config-dev.yaml" target="_blank" rel="noopener noreferrer">http://localhost:3344/master/config-dev.yaml<ExternalLinkIcon/></a></p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108190055153.png" alt="image-20220108190055153" loading="lazy"></p>
<p>支持的Controller</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108190113967.png" alt="image-20220108190113967" loading="lazy"></p>
<p>这个格式稍微有点奇怪，但是总得来说可以分为三种，注意，只支持如下三种，也就是说我们在Git上的文件必须是中横线风格命名的方式</p>
<ol>
<li><code>/{label}/{applicatgion}-{profile}.yaml||yml</code>
<ol>
<li>这种就是典型的分支名称--配置名.yml，例如：
<ul>
<li><a href="http://localhost:3344/master/config-dev.yaml" target="_blank" rel="noopener noreferrer">http://localhost:3344/master/config-dev.yaml<ExternalLinkIcon/></a></li>
<li><a href="http://localhost:3344/master/config-prod.yaml" target="_blank" rel="noopener noreferrer">http://localhost:3344/master/config-prod.yaml<ExternalLinkIcon/></a></li>
<li><a href="http://localhost:3344/master/config-test.yaml" target="_blank" rel="noopener noreferrer">http://localhost:3344/master/config-test.yaml<ExternalLinkIcon/></a></li>
<li>或者<code>/dev/xxxx-xxx.yml</code>也可以，不过要访问dev分支的话，需要仓库内先有dev分支</li>
</ul>
</li>
</ol>
</li>
<li>第二种，通过<code>/{application}-{profile}.yml</code>进行访问（没有前缀）
<ul>
<li><a href="http://localhost:3344/config-dev.yaml" target="_blank" rel="noopener noreferrer">http://localhost:3344/config-dev.yaml<ExternalLinkIcon/></a></li>
<li><a href="http://localhost:3344/config-prod.yaml" target="_blank" rel="noopener noreferrer">http://localhost:3344/config-prod.yaml<ExternalLinkIcon/></a></li>
<li><a href="http://localhost:3344/config-test.yaml" target="_blank" rel="noopener noreferrer">http://localhost:3344/config-test.yaml<ExternalLinkIcon/></a></li>
<li>它这里是使用的仓库默认分支 你仓库默认是什么分支 它就是什么内容</li>
</ul>
</li>
<li>第三种，<code>/{application}/{profile}[/{label}]</code>
<ul>
<li><a href="http://localhost:3344/config/dev/master" target="_blank" rel="noopener noreferrer">http://localhost:3344/config/dev/master<ExternalLinkIcon/></a></li>
<li><a href="http://localhost:3344/config/prod/master" target="_blank" rel="noopener noreferrer">http://localhost:3344/config/prod/master<ExternalLinkIcon/></a></li>
<li>如果要用默认分支 可以省略下，这样写<a href="http://localhost:3344/config/dev" target="_blank" rel="noopener noreferrer">http://localhost:3344/config/dev<ExternalLinkIcon/></a></li>
<li>返回的是Json字符串而并非是yaml
<img src="/images/SpringCloud/09-Config和Bus/image-20220108191650052.png" alt="image-20220108191650052" loading="lazy"></li>
<li>….就是把第一个反过来一样，这个用的比较少，因为需要手动解析</li>
</ul>
</li>
</ol>
<blockquote>
<p>至此，我们成功实现了Spring Cloud Config通过GitHub获取配置信息</p>
</blockquote>
<h3 id="客户端的搭建-依赖" tabindex="-1"><a class="header-anchor" href="#客户端的搭建-依赖" aria-hidden="true">#</a> 客户端的搭建-依赖</h3>
<p>我们新建一个cloud-config-client-3355</p>
<p>依赖  注意 有两个额外的 一个是config的客户端  另一个待会说</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-config<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bootstrap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-consul-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.10.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h3 id="配置文件-bootstrap-yml" tabindex="-1"><a class="header-anchor" href="#配置文件-bootstrap-yml" aria-hidden="true">#</a> 配置文件-Bootstrap.yml</h3>
<p>为啥要这个？</p>
<p>application.yml是用户级的资源配置项</p>
<p>bootstarp.yml是系统级的，<strong>优先级更高</strong></p>
<blockquote>
<p>Spring Cloud会创建一个<code>Bootstarp Context</code>作为Spring应用<code>Application Context</code>的父上下文，初始化的时候，<code>Bootstarp Context</code>负责从<strong>外部源</strong>加载配置属性并解析配置</p>
<p>这两个上下文共享一个从外部获取的<code>Environment</code></p>
</blockquote>
<p><code>Bootstarp</code>内的属性拥有高优先级，默认情况下，他们不会被本地覆盖，<code>Bootstarp Context</code>和<code>Application Context</code>有着不同的约定，所以新增了一个<code>Bootstarp.yml</code>配置文件，保证<code>Bootstarp Context</code>和<code>Application Context</code>配置的分离</p>
<p>要将Client模块下的<code>application.yml</code>文件改为<code>bootstrap.yml</code>这是很关键的</p>
<p>因为bootstrap.yml是比application.yml先加载，所以优先于高于application</p>
<p>bootstrap &gt; extension &gt; application</p>
<p>我们要使用它，必须要确保这个依赖装上了，不然启动的时候百分之一万会报错( spring cloud2020之前的版本不需要)</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bootstrap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>接着配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># bootstrap.yml</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3355</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>client
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token comment"># Config客户端的配置</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token comment"># 分支名称</span>
      <span class="token key atrule">label</span><span class="token punctuation">:</span> dev
      <span class="token comment"># 配置文件名称</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> config
      <span class="token comment"># 读取后缀名称</span>
      <span class="token key atrule">profile</span><span class="token punctuation">:</span> dev
      <span class="token comment"># 配置中心地址</span>
      <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">3344</span>
      <span class="token comment"># 综上所述，dev分支上config-dev.yaml配置文件将被读取：http://localhost:3344/dev/config-dev.yaml</span>

    <span class="token comment">#consul的配置</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
        <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> 微服务提供者
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="编写启动类、controller并测试" tabindex="-1"><a class="header-anchor" href="#编写启动类、controller并测试" aria-hidden="true">#</a> 编写启动类、controller并测试</h3>
<p>我们编写一个常规的启动类即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CloudClient3355Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">CloudClient3355Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>然后在编写一个controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigClientController</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${config.info}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> configInfo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/configInfo"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConfigInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> configInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>注意 这里注入了我们git上之前配置的内容</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108215121638.png" alt="image-20220108215121638" loading="lazy"></p>
<p>dev分支 访问的应该是这句话</p>
<p>接下来启动3344和3355 注意启动顺序</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108215221391.png" alt="image-20220108215221391" loading="lazy"></p>
<p>然后我们访问下3355的这个接口</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108215245821.png" alt="image-20220108215245821" loading="lazy"></p>
<p>看来没问题，这样说明我们切换分支之类的都是可以的</p>
<p>那动态更新呢？</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108215335793.png" alt="image-20220108215335793" loading="lazy"></p>
<p>我提交了下</p>
<p>然后访问</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108215355430.png" alt="image-20220108215355430" loading="lazy"></p>
<p>但是我访问3344，却显示的是正常的内容</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108215605239.png" alt="image-20220108215605239" loading="lazy"></p>
<p>我接着重启了3355，才能获取到修改后的内容</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108215443902.png" alt="image-20220108215443902" loading="lazy"></p>
<p>我们现在遇到的问题就是</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108215454549.png" alt="image-20220108215454549" loading="lazy"></p>
<h3 id="手动实现动态更新" tabindex="-1"><a class="header-anchor" href="#手动实现动态更新" aria-hidden="true">#</a> 手动实现动态更新</h3>
<p>为了解决之前遇到的问题，我们应该去定时或者说在啥情况下要刷新下配置</p>
<p>我们首先要保证3355（微服务提供方）保证有如下依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>接下来修改下<code>bootstrap.yml</code>，添加一些内容</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3355</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>client
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token comment"># Config客户端的配置</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token comment"># 分支名称</span>
      <span class="token key atrule">label</span><span class="token punctuation">:</span> dev
      <span class="token comment"># 配置文件名称</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> config
      <span class="token comment"># 读取后缀名称</span>
      <span class="token key atrule">profile</span><span class="token punctuation">:</span> dev
      <span class="token comment"># 配置中心地址</span>
      <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">3344</span>
      <span class="token comment"># 综上所述，master分支上config-dev.yaml配置文件将被读取：http://localhost:3344/master/config-dev.yaml</span>

    <span class="token comment">#consul的配置</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
        <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> 微服务提供者

<span class="token comment"># 暴露监控端点</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>接下来在我们的业务类上添加一个新的注解@RefreshScope，原理不清楚，反正通过它可以动态刷新我们的内容</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RefreshScope</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigClientController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${config.info}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> configInfo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/configInfo"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConfigInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> configInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>接下来我先修改下git上面的内容</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108221335357.png" alt="image-20220108221335357" loading="lazy"></p>
<p>然后启动 并访问</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108221355017.png" alt="image-20220108221355017" loading="lazy"></p>
<p>获取是没问题，那么我修改下呢？</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"version=888888"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>接着访问 发现依旧还是原来的内容</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108221454309.png" alt="image-20220108221454309" loading="lazy"></p>
<p>其实这里并没有问题 还记得我们之前暴露了监控端点吗，没错，就是要通过那个玩意来手动刷新…</p>
<p>我们要<code>POST</code>请求<code>http://localhost:3355/actuator/refresh</code>这个地址，才能实现刷新</p>
<p>接下来测试下</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108221626341.png" alt="image-20220108221626341" loading="lazy"></p>
<p>再次访问</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108221636942.png" alt="image-20220108221636942" loading="lazy"></p>
<p>新内容就出来了</p>
<p>但是这样。。。。会不会太麻烦了，那如果有上百台客户端，运维人员是不是要发送100次不同的请求？</p>
<p>虽然说可以通过写一个sh脚本来每分钟轮循发送，但是这样我们不更新的话不就是造成了性能浪费吗？</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108222037135.png" alt="image-20220108222037135" loading="lazy"></p>
<p>所以就得用到另外的东西来解决这个问题</p>
<h2 id="bus概述" tabindex="-1"><a class="header-anchor" href="#bus概述" aria-hidden="true">#</a> Bus概述</h2>
<p>我们现在是想实现一个自动的、动态的刷新功能，然后Spring Cloud Bus可以配合Config来实现动态刷新的功能</p>
<p>Bus支持RabbitMq和Kafuka</p>
<p>Spring Cloud Bus配合Spring Cloud Config使用可以实现配置动态刷新</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108222704984.png" alt="image-20220108222704984" loading="lazy"></p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108222837482.png" alt="image-20220108222837482" loading="lazy"></p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108222934588.png" alt="image-20220108222934588" loading="lazy"></p>
<pre><code>### 配置RabbitMQ环境
</code></pre>
<p>我们先启动一个rabbitmq</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d -p <span class="token number">5672</span>:5672 -p <span class="token number">15672</span>:15672 --name rabbitmqSpringCloud -e <span class="token assign-left variable">RABBITMQ_DEFAULT_USER</span><span class="token operator">=</span>admin -e <span class="token assign-left variable">RABBITMQ_DEFAULT_PASS</span><span class="token operator">=</span>aaaabbbbcccceeeddfj1113433 rabbitmq:management
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里配置了账号密码 你可以自由的修改</p>
<p>接着访问15672</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108224139699.png" alt="image-20220108224139699" loading="lazy"></p>
<p>注意这个版本：RabbitMQ 3.9.11，待会依赖不要安装错了</p>
<p>接下来我们整一份3366 功能和3355一致</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108224929613.png" alt="image-20220108224929613" loading="lazy"></p>
<p>PS：当只有一个配置文件的时候，<strong>据说</strong>叫application或者bootstrap都可以，不过保险起见，涉及到总线操作的建议统一命名为bootstrap.yml更好</p>
<h3 id="刷新的两种方式" tabindex="-1"><a class="header-anchor" href="#刷新的两种方式" aria-hidden="true">#</a> 刷新的两种方式</h3>
<p>我们有两种方式可以刷新客户端</p>
<ol>
<li>通过消息总线触发一个客户端的<code>/bus/refresh</code>，而刷新所有客户端的配置
<img src="/images/SpringCloud/09-Config和Bus/image-20220108225807785.png" alt="image-20220108225807785" loading="lazy"></li>
<li>利用消息总线触发一个服务端ConfigServer的<code>/bus/refesh</code>端点，而刷新所有客户顿的配置
<img src="/images/SpringCloud/09-Config和Bus/image-20220108225832255.png" alt="image-20220108225832255" loading="lazy"></li>
</ol>
<p>一般情况下来说，都是直通知Server端，为啥是它呢？</p>
<p>因为客户端打破了微服务的指责单一性，因为微服务本身是业务模块，它本不应该承当刷新配置的指责</p>
<p>并且还破坏了微服务各个节点的对等性、还有一定的局限性：例如：微服务正在迁移时，它的网络地址通常会发生变化，此时如果想要做到自动刷新，就要增加更多的客户端</p>
<h3 id="服务总线依赖添加" tabindex="-1"><a class="header-anchor" href="#服务总线依赖添加" aria-hidden="true">#</a> 服务总线依赖添加</h3>
<p>我们先在服务端（3344）添加RabbitMq的bus，完成服务总线的支持</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bus-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>添加了这个依赖，就相当于同时添加了Spring Cloud Bus 和Spring Boot AMQP</p>
<p>接着3355 3366 也添加这个依赖</p>
<h3 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h3>
<p>首先是服务端3344需要修改 需要增加一些</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 3344 application</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3344</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>server
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span>
        <span class="token key atrule">git</span><span class="token punctuation">:</span>
          <span class="token comment"># git上面的仓库地址 可以是ssh url也可以是http/https</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//81.68.162.137<span class="token punctuation">:</span>3000/amayakite/spring<span class="token punctuation">-</span>cloud<span class="token punctuation">-</span>config.git
          <span class="token comment"># 搜索目录</span>
          <span class="token key atrule">search-paths</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> spring<span class="token punctuation">-</span>cloud<span class="token punctuation">-</span>config
          <span class="token comment"># 如果使用的是https或者ssh协议 都需要提供账号密码之类的（密码可以是token】）</span>
          <span class="token key atrule">password</span><span class="token punctuation">:</span> MRRf47ncEdGcAfS
          <span class="token key atrule">username</span><span class="token punctuation">:</span> amayakite
          <span class="token comment"># 如果使用的是https，则需要加上下面这个配置</span>
         <span class="token comment">#skip-ssl-validation: true</span>
      <span class="token comment"># 分支</span>
      <span class="token key atrule">label</span><span class="token punctuation">:</span> dev
    <span class="token comment"># Consul相关配置</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
        <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> 全局配置中心
  <span class="token comment"># rabbitMQ 的相关配置</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 你的服务器
    <span class="token key atrule">username</span><span class="token punctuation">:</span> admin
    <span class="token key atrule">password</span><span class="token punctuation">:</span> aaaabbbbcccceeeddfj1113433

<span class="token comment">#        hostname: 127.0.0.1</span>
<span class="token key atrule">logging.level.com.Project</span><span class="token punctuation">:</span> debug

<span class="token comment"># rabbitmq相关配置，暴露bus刷新配置的端点</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token comment"># bus-refresh 是actuator的刷新操作</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"bus-refresh"</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p>接着是3355 3366 这两个只需要添加rabbitmq的依赖即可</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3355</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>client
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token comment"># Config客户端的配置</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token comment"># 分支名称</span>
      <span class="token key atrule">label</span><span class="token punctuation">:</span> dev
      <span class="token comment"># 配置文件名称</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> config
      <span class="token comment"># 读取后缀名称</span>
      <span class="token key atrule">profile</span><span class="token punctuation">:</span> dev
      <span class="token comment"># 配置中心地址</span>
      <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">3344</span>
      <span class="token comment"># 综上所述，master分支上config-dev.yaml配置文件将被读取：http://localhost:3344/master/config-dev.yaml</span>

    <span class="token comment">#consul的配置</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
        <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> 微服务提供者1
  <span class="token comment"># rabbitMQ 的相关配置</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 你的服务器
    <span class="token key atrule">username</span><span class="token punctuation">:</span> admin
    <span class="token key atrule">password</span><span class="token punctuation">:</span> aaaabbbbcccceeeddfj1113433

<span class="token comment"># 暴露监控端点</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h3 id="启动并测试" tabindex="-1"><a class="header-anchor" href="#启动并测试" aria-hidden="true">#</a> 启动并测试</h3>
<p>对，没错，只要配置了就完了</p>
<p>为了方便区分，我这里给3355和3366的Controller添加上端口号</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RefreshScope</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigClientController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${server.port}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverPort<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${config.info}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> configInfo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/configInfo"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConfigInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"serverPort: "</span> <span class="token operator">+</span> serverPort <span class="token operator">+</span> <span class="token string">"\t\n\n configInfo: "</span> <span class="token operator">+</span> configInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>接着开启三个服务开始测试</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108232415761.png" alt="image-20220108232415761" loading="lazy"></p>
<p>3355第一次访问</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108232423863.png" alt="image-20220108232423863" loading="lazy"></p>
<p>3366第一次访问</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108232434128.png" alt="image-20220108232434128" loading="lazy"></p>
<p>接着修改下数据</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108232507071.png" alt="image-20220108232507071" loading="lazy"></p>
<p>这时候我们只需要刷下3344<code>http://localhost:3344/actuator/busrefresh</code></p>
<p>（注意 旧版本的话用的是访问bus-refresh来刷新，但新旧版本配置都是同一个，具体的可以看服务-Actuator-映射中的路径）</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108234237871.png" alt="image-20220108234237871" loading="lazy"></p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108232712902.png" alt="image-20220108232712902" loading="lazy"></p>
<p>然后访问另外两位</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108232730938.png" alt="image-20220108232730938" loading="lazy"></p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108232735432.png" alt="image-20220108232735432" loading="lazy"></p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108234341945.png" alt="image-20220108234341945" loading="lazy"></p>
<p>如果你感觉这样麻烦的话，实际工作环境内，可以写个git actions脚本 一旦发现提交立马触发脚本自动发送post请求</p>
<h3 id="bus动态刷新-定点通知" tabindex="-1"><a class="header-anchor" href="#bus动态刷新-定点通知" aria-hidden="true">#</a> Bus动态刷新-定点通知</h3>
<p>上面我们已经配置完了自动的全局广播</p>
<p>那么现在问题来了，我如果只想通知其中一个，而不是通知全部刷新，也就是要精确通知，减少资源开销</p>
<p>其实实现比较简单</p>
<p>只需要POST请求<code>http://localhost:配置中心的端口号/actuator/busrefresh/{destination}</code></p>
<p><code>destination</code>：这个Rest风格的参数指定要更新配置的服务或实例</p>
<p>注意：旧版本中，请求路径的<code>busrefresh</code>要替换成<code>bus-refresh</code>（应该是2020之前的版本都是这样）</p>
<p>比方说我现在只想要通知3355，它在服务中心注册的服务名称是config-client，那么我只需使用服务名称+端口即可精准通知</p>
<p>使用：<code>curl -X POST http://localhost:3344/actuator/busrefresh/config-client:3355</code></p>
<p>发送之前修改的内容</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108235416183.png" alt="image-20220108235416183" loading="lazy"></p>
<p>发送之后，3305访问</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108235429862.png" alt="image-20220108235429862" loading="lazy"></p>
<p>3360访问，还是之前的内容</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108235440607.png" alt="image-20220108235440607" loading="lazy"></p>
<p>当然 也可以不指定端口号 让该类的所有服务都刷新（一般也是这样用的）</p>
<p>更新内容</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108235530802.png" alt="image-20220108235530802" loading="lazy"></p>
<p>发送请求：<code>curl -X POST http://localhost:3344/actuator/busrefresh/config-client</code></p>
<p>3355</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108235552600.png" alt="image-20220108235552600" loading="lazy"></p>
<p>3366</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108235602407.png" alt="image-20220108235602407" loading="lazy"></p>
<h3 id="总线总结" tabindex="-1"><a class="header-anchor" href="#总线总结" aria-hidden="true">#</a> 总线总结</h3>
<p>一张图概括</p>
<p><img src="/images/SpringCloud/09-Config和Bus/image-20220108235856681.png" alt="image-20220108235856681" loading="lazy"></p>
</template>
