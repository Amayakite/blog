<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>官网<a href="https://github.com/alibaba/Sentinel" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/Sentinel<ExternalLinkIcon/></a></p>
<p>中文文档<a href="https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/Sentinel/wiki/介绍<ExternalLinkIcon/></a></p>
<p>介绍是：分布式系统的流量防卫兵</p>
<p>一句话概括：Hystrix的阿里版</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111192750054.png" alt="image-20220111192750054" loading="lazy"></p>
<p>官方是这样介绍的</p>
<blockquote>
<p>Sentinel 具有以下特征:</p>
<ul>
<li><strong>丰富的应用场景</strong>：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。</li>
<li><strong>完备的实时监控</strong>：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。</li>
<li><strong>广泛的开源生态</strong>：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Apache Dubbo、gRPC、Quarkus 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。同时 Sentinel 提供 Java/Go/C++ 等多语言的原生实现。</li>
<li><strong>完善的 SPI 扩展机制</strong>：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。</li>
</ul>
<p>当看到双十一的时候，就应该知道这玩意不是一般的牛逼</p>
</blockquote>
<h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h2>
<h3 id="下载安装和运行" tabindex="-1"><a class="header-anchor" href="#下载安装和运行" aria-hidden="true">#</a> 下载安装和运行</h3>
<p>下载<a href="https://github.com/alibaba/Sentinel/releases/" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/Sentinel/releases/<ExternalLinkIcon/></a></p>
<p>加速下载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.91chi.fun//https://github.com//alibaba/Sentinel/releases/download/你想要的版本/sentinel-dashboard-你想要的版本.jar
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>下载完毕后得到一个jar包</p>
<p>Sentinel分为两个部分</p>
<ul>
<li>核心库（Java客户端，就是我们刚刚下载到的那个）不依赖任何框架/库，能够运行于所有Java运行时环境，都是对Dubbo、Spring Cloud等框架也有较好的支持</li>
<li>控制台（Dashboard）基于Spring Boot开发，打包后可以直接运行，不需要额外的tomcat等应用容器</li>
</ul>
<p>我们先运行jar吧</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>java <span class="token operator">-</span>jar <span class="token punctuation">.</span>\sentinel-dashboard-1<span class="token punctuation">.</span>8<span class="token punctuation">.</span>3<span class="token punctuation">.</span>jar
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果启动成功的话，应该显示如下页面</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111194433238.png" alt="image-20220111194433238" loading="lazy"></p>
<p>这个时候访问<a href="http://localhost:8080/" target="_blank" rel="noopener noreferrer">http://localhost:8080/<ExternalLinkIcon/></a>即可得到如下页面</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111194509918.png" alt="image-20220111194509918" loading="lazy"></p>
<p>默认的用户和密码都是sentinel</p>
<p>如果要更该对应的参数的话 可以在启动的时候添加VM命令<code>-Dxxx=xxx</code>来实现</p>
<p>具体可以配置的参数看官方文档<a href="https://github.com/alibaba/Sentinel/wiki/%E6%8E%A7%E5%88%B6%E5%8F%B0#%E6%8E%A7%E5%88%B6%E5%8F%B0%E9%85%8D%E7%BD%AE%E9%A1%B9" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/Sentinel/wiki/控制台#控制台配置项<ExternalLinkIcon/></a></p>
<p>不过因为这个是jar包的原因….所以要参考<a href="https://www.cnblogs.com/coder-wzr/p/9987906.html" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a>进入jar包后改一点内容才行</p>
<p>但是万能的spring boot早就给我们想到了这一点了，查了下，有一篇<a href="https://www.jianshu.com/p/fed7a174bfb8" target="_blank" rel="noopener noreferrer">文章<ExternalLinkIcon/></a>说了解决方案</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>java <span class="token operator">-</span>jar <span class="token punctuation">.</span>\sentinel-dashboard-1<span class="token punctuation">.</span>8<span class="token punctuation">.</span>3<span class="token punctuation">.</span>jar <span class="token operator">--</span>server<span class="token punctuation">.</span>port=8181
<span class="token comment"># 这样就可以修改端口了，修改其他的同理</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>登陆后，可以得到这个</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111194649812.png" alt="image-20220111194649812" loading="lazy"></p>
<h3 id="使用-依赖" tabindex="-1"><a class="header-anchor" href="#使用-依赖" aria-hidden="true">#</a> 使用-依赖</h3>
<p>官方文档</p>
<p><a href="https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/en-us/index.html#_spring_cloud_alibaba_sentinel" target="_blank" rel="noopener noreferrer">https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/en-us/index.html#_spring_cloud_alibaba_sentinel<ExternalLinkIcon/></a></p>
<p>我们新建一个module：cloud-alibaba-sentinel-service-8401</p>
<p>然后准备如下依赖 阿里的这三以后基本上是常客了</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        这个后续持久化的时候要用到--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.csp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sentinel-datasource-nacos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        Sentinel--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-sentinel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        Nacos--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        openfeign--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        基本组件--></span>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><h3 id="使用-配置" tabindex="-1"><a class="header-anchor" href="#使用-配置" aria-hidden="true">#</a> 使用-配置</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8401</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>alibaba<span class="token punctuation">-</span>sentinel<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456789</span>
    <span class="token comment"># 配置Sentinel</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token comment"># 配置Sentinel dashboard的地址</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8181</span>
        <span class="token comment"># 配置Sentinel端口，默认是8719，如果被占用，会从8719开始依次+1扫描，直至找到空闲的端口</span>
        <span class="token comment"># 8719是http通信服务【sentinel后台监控服务】</span>
        <span class="token comment"># 它监控8401【微服务】的同时，还与8080【sentinel前台展示服务】交互数据，将监控到的数据在dashboard上展现。</span>
        <span class="token comment"># spring.cloud.sentinel.transport.port：指定应用与Sentinel控制台交互的端口，应用本地会起一个该端口占用的HttpServer</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>
<span class="token comment"># 暴露监控</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">jmx</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>然后准备下controller和main</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlowLimitController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testA"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"testA"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testB"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"testB"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>main</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sentinel8401Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Sentinel8401Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<p>我们启动服务后</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202253926.png" alt="image-20220111202253926" loading="lazy"></p>
<p>没有报错就算成功，然后我们访问下sentinel的控制面板</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202312199.png" alt="image-20220111202312199" loading="lazy"></p>
<p>发现什么也没有</p>
<p>其实这玩意用了懒加载机制，我们只需要访问下我们服务内的接口，这里就有显示了</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202344360.png" alt="image-20220111202344360" loading="lazy"></p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202400354.png" alt="image-20220111202400354" loading="lazy"></p>
<p>我们多访问几次A和B，就能看到有内容了</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111202556671.png" alt="image-20220111202556671" loading="lazy"></p>
<p>这就是它的实时监控</p>
<h2 id="流控规则" tabindex="-1"><a class="header-anchor" href="#流控规则" aria-hidden="true">#</a> 流控规则</h2>
<h3 id="基本介绍" tabindex="-1"><a class="header-anchor" href="#基本介绍" aria-hidden="true">#</a> 基本介绍</h3>
<p>就是这张图</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111203003636.png" alt="image-20220111202908226" loading="lazy"></p>
<p>上面的名词：</p>
<ul>
<li>资源名：唯一名称，默认是请求路径</li>
<li>针对来源：Sentinel可以对调用者进行限流，填写微服务名，默认default（不区分来源）</li>
<li>阀值类型/单机阀值
<ul>
<li>QPS：每秒钟的请求数量，当调用该API的QPS达到阀值的时候，进行限流</li>
<li>线程数：当调用该API的线程数打到阀值的时候，进行限流</li>
</ul>
</li>
<li>是否集群：就是这个接口是不是一个集群的接口</li>
<li>流控模式
<ul>
<li>直接：API打到限流条件时，直接限流</li>
<li>关联：当关联的资源达到阀值的时候，就限流自己</li>
<li>链路：只记录指定链路上的流量（指定资源从入口资源进来的流量，如果打到阀值，就进行限流，API级别的针对来源）</li>
</ul>
</li>
<li>流控效果
<ul>
<li>快速失败：直接失败，抛异常</li>
<li>Warm UP：根据CodeFactor（冷加载因子，默认3）的值，从阀值/CodeFactor，经过预热时长，才达到设置的QPS阀值</li>
<li>排队等待：匀速排队，让请求以匀速的速度通过，阀值类型必须设为QPS，否则无效</li>
</ul>
</li>
</ul>
<h3 id="流控模式-qps直接失败" tabindex="-1"><a class="header-anchor" href="#流控模式-qps直接失败" aria-hidden="true">#</a> 流控模式-QPS直接失败</h3>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111203918916.png" alt="image-20220111203918916" loading="lazy"></p>
<p>我们先来新建一个规则， 单机阀值设定为QPS-1，也就是每秒限制一个访问，其余的默认</p>
<p>然后快速访问</p>
<p>第一次</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111204039334.png" alt="image-20220111204039334" loading="lazy"></p>
<p>第二次，抛出了这个东西：Blocked by Sentinel (flow limiting) 被Sentinel阻塞(流量限制)</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111204050691.png" alt="image-20220111204050691" loading="lazy"></p>
<p>恩，看起来没问题了，轻轻松松的就做到了限流</p>
<p>但是这个过程中也存在问题</p>
<blockquote>
<p>直接调用的是默认报错信息，技术方面OK，但是，是否可以像Hystrix那样应该有我们自己的后续处理？是不是应该有个fallback的兜底方法</p>
<p>这个之后会说到</p>
</blockquote>
<h3 id="流控模式-线程数直接失败" tabindex="-1"><a class="header-anchor" href="#流控模式-线程数直接失败" aria-hidden="true">#</a> 流控模式-线程数直接失败</h3>
<p>当调用该API的线程数打到阀值的时候，进行限流</p>
<p>这个跟QPS不是同一个东西，QPS是每秒的访问量，线程数是并行的访问量</p>
<p>线程数是只每秒访问api接口的线程数   妹的  怪不得没效果</p>
<p>而且我们可以发现，这玩意并没有直接失败之类的东西</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111204942886.png" alt="image-20220111204942886" loading="lazy"></p>
<p>简单来说，线程数和QPS可以用一张图概括</p>
<p>QPS就是限制最多进来多少人，一旦每秒超过这个阀值，剩余的人就进不来</p>
<p>线程数就是，无论你多少人我都可以进来，但是我每秒只有一个线程在处理业务，也就是银行始终只有一个前台业务员，如果说这个线程正在处于忙碌状态并且有其他人进来了的情况，将会直接拒绝掉其他人的请求</p>
<blockquote>
<p>就是说同时只允许一个工作线程(配置=1)，如果当前线程还没有执行完，其他线程请求就会限流</p>
</blockquote>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111205109440.png" alt="image-20220111205109440" loading="lazy"></p>
<p>你直接访问是察觉不出效果的，因为线程的处理速度飞快</p>
<p>所以我们可以手动加一个延迟</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlowLimitController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testA"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">800</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"testA"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testB"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"testB"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>就能得到我们想要的效果</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111205548424.png" alt="image-20220111205548424" loading="lazy"></p>
<h3 id="流控模式-关联" tabindex="-1"><a class="header-anchor" href="#流控模式-关联" aria-hidden="true">#</a> 流控模式-关联</h3>
<p>关联：当关联的资源达到阀值的时候，就限流自己</p>
<p>比如果与A关联的资源B达到阀值后，就限流A自己</p>
<p>B惹事，A挂了</p>
<p>应用场景：支持接口达到阀值之后，限流下订单的接口，防止连坐效应，好比医生都生病不搞了，前台还使劲卖他的号，有用吗？</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111210133863.png" alt="image-20220111210133863" loading="lazy"></p>
<p>B每秒超过一个访问，A将不能正常访问，但是B依旧可以正常访问</p>
<p>如果说要让B也不能访问，只需要给他自己加个直连限制即可</p>
<h3 id="流控模式-链路" tabindex="-1"><a class="header-anchor" href="#流控模式-链路" aria-hidden="true">#</a> 流控模式-链路</h3>
<p>这个目前有问题，用不了（草，都一年了还没修好）</p>
<p>如果有兴趣的话可以了解看这个<a href="https://blog.csdn.net/qq_31155349/article/details/108478190" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/qq_31155349/article/details/108478190<ExternalLinkIcon/></a></p>
<p>以及这个<a href="https://blog.csdn.net/qq_42130098/article/details/111906577" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/qq_42130098/article/details/111906577<ExternalLinkIcon/></a></p>
<p>反正就是如果链路上有a和b，a凉了，那么b也跟着凉</p>
<p>链路还涉及了之后的注解还有版本问题，绝对是最麻烦最难的…</p>
<p>找到解决方案了，参考<a href="https://blog.csdn.net/weixin_44353507/article/details/113815458?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164190905016780271537604%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&amp;request_id=164190905016780271537604&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-4-113815458.nonecase&amp;utm_term=Alibaba&amp;spm=1018.2226.3001.4450" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a></p>
<p>有点绕，一定要按照这一套来，不然行不通</p>
<p>首先添加一个依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.csp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sentinel-web-servlet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后要在application.yaml中修改一个配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8401</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>alibaba<span class="token punctuation">-</span>sentinel<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
    <span class="token comment"># 配置Sentinel</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8181</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>
      <span class="token comment"># 注意 和transport平级</span>
      <span class="token key atrule">web-context-unify</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token comment"># 暴露监控</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">jmx</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>然后要加一个config类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FilterContextConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">FilterRegistrationBean</span> <span class="token function">sentinelFilterRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">FilterRegistrationBean</span> registration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FilterRegistrationBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        registration<span class="token punctuation">.</span><span class="token function">setFilter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CommonFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        registration<span class="token punctuation">.</span><span class="token function">addUrlPatterns</span><span class="token punctuation">(</span><span class="token string">"/*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 入口资源关闭聚合</span>
        registration<span class="token punctuation">.</span><span class="token function">addInitParameter</span><span class="token punctuation">(</span><span class="token class-name">CommonFilter</span><span class="token punctuation">.</span>WEB_CONTEXT_UNIFY<span class="token punctuation">,</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        registration<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"sentinelFilter"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        registration<span class="token punctuation">.</span><span class="token function">setOrder</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> registration<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>接着写一个service，注意<strong>一定要用</strong>service之类的注解写一个类才行</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SentinelService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * @SentinelResource: 可以理解就是一个资源名
     */</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span><span class="token string">"myresource"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">sentinelChain</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"调用该资源成功！！！！！"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>然后写Controller方法调用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlowLimitController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">SentinelService</span> sentinelService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testC"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sentinelService<span class="token punctuation">.</span><span class="token function">sentinelChain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testD"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testD</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sentinelService<span class="token punctuation">.</span><span class="token function">sentinelChain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>如果说没问题的话，你在启动后分别访问完testc和d后是这样的</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111220251931.png" alt="image-20220111220251931" loading="lazy"></p>
<p>接着，给这个myresource添加限流</p>
<p>这里给TestC中的它添加</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111220353476.png" alt="image-20220111220353476" loading="lazy"></p>
<p>添加完毕后，当你每秒访问过多次的testC之后，就会出现这样的情况</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111220422331.png" alt="image-20220111220422331" loading="lazy"></p>
<p>但是无论这里有没有出现问题，myresource的另外一个调用者：testD是不受影响的</p>
<p>也可以从数据中得到，我这里是两个同时访问了五十多次之后的结果（Chrome可以按住alt选中两个页面同时刷新）</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111220724345.png" alt="image-20220111220724345" loading="lazy"></p>
<h3 id="流控-预热-warm-up削峰填谷" tabindex="-1"><a class="header-anchor" href="#流控-预热-warm-up削峰填谷" aria-hidden="true">#</a> 流控-预热(Warm Up削峰填谷)</h3>
<p>公式：阀值除于clodFactor(默认值是3)，经过预热时长后才会达到阀值</p>
<p>就相当于防止服务瞬间被DDOS给整挂掉了</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111221130006.png" alt="image-20220111221130006" loading="lazy"></p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111221139041.png" alt="image-20220111221139041" loading="lazy"></p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111221949556.png" alt="image-20220111221949556" loading="lazy"></p>
<p>10/3等于每秒访问量，5秒之后恢复10访问量</p>
<p>冷加载因子是写进了源码里的</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111222048858.png" alt="image-20220111222048858" loading="lazy"></p>
<p>应用场景：秒杀系统开启瞬间，会有很多流量上来，有可能把系统整挂了，预热方式就是保护系统，让流量慢慢的进来，慢慢的增长到设定的阀值，防止一开始缓存还没成型，被击穿</p>
<p>已知被使用过的实际场景：淘宝双十一</p>
<h3 id="流控-排队等待" tabindex="-1"><a class="header-anchor" href="#流控-排队等待" aria-hidden="true">#</a> 流控-排队等待</h3>
<p>一句话，都排队等，没轮到的慢慢排，愿意等就等，不愿意等就自己超时重试</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111222704429.png" alt="image-20220111222704429" loading="lazy"></p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111222837017.png" alt="image-20220111222837017" loading="lazy"></p>
<ul>
<li>QPS=1，每个一秒处理一个请求</li>
<li>2,500毫秒</li>
<li>3,334毫秒</li>
<li>4,250毫秒</li>
<li>以此类推</li>
<li>如果超过20还没轮到，则就按照限流处理</li>
</ul>
<h2 id="降级-熔断-规则" tabindex="-1"><a class="header-anchor" href="#降级-熔断-规则" aria-hidden="true">#</a> 降级（熔断）规则</h2>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111223347592.png" alt="image-20220111223347592" loading="lazy"></p>
<p>这玩意和Hystrix的相似度非常高</p>
<p>他有三个参数</p>
<ul>
<li>慢调用比例(秒级)
<ul>
<li>慢调用比例 (<code>SLOW_REQUEST_RATIO</code>)：选择以慢调用比例作为阈值，需要设置允许的慢调用 RT（即最大的响应时间），请求的响应时间大于该值则统计为慢调用。当单位统计时长（<code>statIntervalMs</code>）内请求数目大于设置的最小请求数目，并且慢调用的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求响应时间小于设置的慢调用 RT 则结束熔断，若大于设置的慢调用 RT 则会再次被熔断。异常比率的阈值范围是 <code>[0.0, 1.0]</code>，代表 0% - 100%。</li>
<li>平均响应时间<strong>超出阀值</strong>且在<strong>时间窗口内通过的请求&gt;=5</strong>，两个条件同时满足后触发降级，窗口期(统计时长)过后关闭断路器</li>
<li>最大阀值是4900，需要更大的话需要在启动sentinel的时候附带参数<code>csp.sentinel.statistic.max.rt=xxx</code>才能生效
<ul>
<li>1.8之前需要这样配置</li>
<li>1.8之后官方修复了，最新版本随便造</li>
</ul>
</li>
</ul>
</li>
<li>异常比例
<ul>
<li>单位统计时长（<code>statIntervalMs</code>）内请求数目大于设置的最小请求数目，并且异常的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。异常比率的阈值范围是 <code>[0.0, 1.0]</code>，代表 0% - 100%。</li>
<li>QPS&gt;=5且异常比例超过阀值时，触发降级，时间窗口结束后，关闭降级</li>
</ul>
</li>
<li>异常数
<ul>
<li>当单位统计时长内的异常数目超过阈值之后会自动进行熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。</li>
<li>超过指定的阀值，就会触发降级，时间窗口结束后，关闭降级</li>
</ul>
</li>
</ul>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111224619923.png" alt="image-20220111224619923" loading="lazy"></p>
<p>Sentinel 1.8.0 版本对熔断降级特性进行了全新的改进升级 有恢复状态（HALF-OPEN 状态），而不单单只是之前的关和开，中间多出了一个半开</p>
<h3 id="慢调用比例-rt" tabindex="-1"><a class="header-anchor" href="#慢调用比例-rt" aria-hidden="true">#</a> 慢调用比例(RT)</h3>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111231448891.png" alt="image-20220111231448891" loading="lazy"></p>
<p>例子：</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111231958689.png" alt="image-20220111231958689" loading="lazy"></p>
<h3 id="异常比例" tabindex="-1"><a class="header-anchor" href="#异常比例" aria-hidden="true">#</a> 异常比例</h3>
<p>总体来说和慢调用比例差不多，唯一的区别就是，满调用比例是我们手动抛，这里是程序抛</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111232846091.png" alt="image-20220111232846091" loading="lazy"></p>
<h3 id="异常数" tabindex="-1"><a class="header-anchor" href="#异常数" aria-hidden="true">#</a> 异常数</h3>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111233414286.png" alt="image-20220111233414286" loading="lazy"></p>
<p>和异常比例差不多，不过将比例换成了次数而已</p>
<p>经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态）</p>
<p>若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。</p>
<h2 id="热点规则" tabindex="-1"><a class="header-anchor" href="#热点规则" aria-hidden="true">#</a> 热点规则</h2>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220111234745115.png" alt="image-20220111234745115" loading="lazy"></p>
<p>就是这个玩意</p>
<p><a href="https://github.com/alibaba/Sentinel/wiki/%E7%83%AD%E7%82%B9%E5%8F%82%E6%95%B0%E9%99%90%E6%B5%81" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>内是这样说的</p>
<blockquote>
<p>何为热点？热点即经常访问的数据。很多时候我们希望统计某个热点数据中访问频次最高的 Top K 数据，并对其访问进行限制。比如：</p>
<ul>
<li>商品 ID 为参数，统计一段时间内最常购买的商品 ID 并进行限制</li>
<li>用户 ID 为参数，针对一段时间内频繁访问的用户 ID 进行限制</li>
</ul>
<p>热点参数限流会统计传入参数中的热点参数，并根据配置的限流阈值与模式，对包含热点参数的资源调用进行限流。热点参数限流可以看做是一种特殊的流量控制，仅对包含热点参数的资源调用生效。</p>
</blockquote>
<p>源码在<code>com.alibaba.csp.sentinel.slots.block.BlockException</code></p>
<h3 id="自定义兜底方法" tabindex="-1"><a class="header-anchor" href="#自定义兜底方法" aria-hidden="true">#</a> 自定义兜底方法</h3>
<p>在开始热点之前，我们得了解下新的东西</p>
<blockquote>
<p>兜底方法</p>
</blockquote>
<p>这玩意分为系统默认和用户自定义，两种</p>
<p>我们之前的测试，限流出问题后，都使用sentinel系统的默认提示：<code>Blocked By Sentinel(Flow limiting)</code></p>
<p>我们能否自定义？类似于Hystrix，某个方法出现问题了，找对应的兜底降级方法</p>
<p>阿里当让也为我们提供了一个注解<code>@SentinelResource</code>，等同于之前Hystrix内的<code>@HystrixCommand</code></p>
<p>接下来简单演示下吧</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlowLimitController</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testA"</span><span class="token punctuation">)</span>
    <span class="token comment">// value是用来标识资源名称 这个启动后访问下可以得到</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"testAResource"</span><span class="token punctuation">,</span> blockHandler <span class="token operator">=</span> <span class="token string">"testACallBack"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"testA"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token comment">// 和Hystrix一样的流程 唯一不同的是 这里要额外接收一个BlockException参数</span>
    <span class="token comment">// 然后就可以对齐进行自定义处理 如果说上面的那个方法要接收参数 这里也要</span>
    <span class="token comment">// 例如 上面的接收String a,那么这里就要接受 String a 和 BlockException ex</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testACallBack</span><span class="token punctuation">(</span><span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"-----testA出现异常了"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>然后正常限流之类的就可以看得到效果了</p>
<h3 id="热点规则-设置" tabindex="-1"><a class="header-anchor" href="#热点规则-设置" aria-hidden="true">#</a> 热点规则-设置</h3>
<p>我们首先定义下Controller，并为其打上@SentinelResource标签和指定对应的错误回调方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlowLimitController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testHotKey"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"testHotKey"</span><span class="token punctuation">,</span> blockHandler <span class="token operator">=</span> <span class="token string">"dealTestHotKey"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testHotKey</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"p1"</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p1<span class="token punctuation">,</span>
                             <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"p2"</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"-----testHotKey"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">dealTestHotKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> p1<span class="token punctuation">,</span> <span class="token class-name">String</span> p2<span class="token punctuation">,</span> <span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"-----deal_testHotKey"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>这里接收两个参数 都是可选的，接下来开始对齐进行热点规则设置</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112133141502.png" alt="image-20220112133141502" loading="lazy"></p>
<p>接着访问</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112133224572.png" alt="image-20220112133224572" loading="lazy"></p>
<p>一秒内第一次正常</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112133238261.png" alt="image-20220112133238261" loading="lazy"></p>
<p>第二次异常</p>
<p>反正只要带了这个参数的都会受到限制</p>
<p>当然我们也可以字自定义的排除一些</p>
<p>注意 下面这样操作的话 参数类型一定要写和我们在Java的方法声明中一样的类型，否则不生效</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112133751268.png" alt="image-20220112133751268" loading="lazy"></p>
<p>但要注意的是，如果我们是在程序中出现了异常</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/testHotKey"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"testHotKey"</span><span class="token punctuation">,</span> blockHandler <span class="token operator">=</span> <span class="token string">"dealTestHotKey"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">testHotKey</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"p1"</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p1<span class="token punctuation">,</span>
                         <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"p2"</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> p2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">"-----testHotKey"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>是无法进行处理的（另外几个也是无法处理，这个处理方式之后会说）</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112141258458.png" alt="image-20220112141258458" loading="lazy"></p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112141250165.png" alt="image-20220112141250165" loading="lazy"></p>
<h2 id="系统规则-自适应限流" tabindex="-1"><a class="header-anchor" href="#系统规则-自适应限流" aria-hidden="true">#</a> 系统规则-自适应限流</h2>
<p><a href="https://github.com/alibaba/Sentinel/wiki/%E7%B3%BB%E7%BB%9F%E8%87%AA%E9%80%82%E5%BA%94%E9%99%90%E6%B5%81" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<blockquote>
<p>Sentinel 系统自适应限流从整体维度<strong>对应用入口流量进行控制</strong>，结合应用的 Load、CPU 使用率、总体平均 RT、入口 QPS 和并发线程数等几个维度的监控指标，通过自适应的流控策略，让系统的入口流量和系统的负载达到一个平衡，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。</p>
</blockquote>
<p>在这里配置</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112141943800.png" alt="image-20220112141943800" loading="lazy"></p>
<ul>
<li><strong>Load 自适应</strong>（仅对 Linux/Unix-like 机器生效）：系统的 load1 作为启发指标，进行自适应系统保护。当系统 load1 超过设定的启发值，且系统当前的并发线程数超过估算的系统容量时才会触发系统保护（BBR 阶段）。系统容量由系统的 <code>maxQps * minRt</code> 估算得出。设定参考值一般是 <code>CPU cores * 2.5</code>。</li>
<li><strong>CPU usage</strong>（1.5.0+ 版本）：当系统 CPU 使用率超过阈值即触发系统保护（取值范围 0.0-1.0），比较灵敏。</li>
<li><strong>平均 RT</strong>：当单台机器上所有入口流量的平均 RT 达到阈值即触发系统保护，单位是毫秒。
<ul>
<li>也就是平均处理时间</li>
</ul>
</li>
<li><strong>并发线程数</strong>：当单台机器上所有入口流量的并发线程数达到阈值即触发系统保护。</li>
<li><strong>入口 QPS</strong>：当单台机器上所有入口流量的 QPS 达到阈值即触发系统保护。</li>
</ul>
<blockquote>
<p>这玩意是全局的，如果设置了的话是高于我们自己额外设定的</p>
<p>但是整体来说用的特别少，基本用不上</p>
</blockquote>
<h2 id="sentinelresource" tabindex="-1"><a class="header-anchor" href="#sentinelresource" aria-hidden="true">#</a> @SentinelResource</h2>
<h3 id="按资源名称进行限流" tabindex="-1"><a class="header-anchor" href="#按资源名称进行限流" aria-hidden="true">#</a> 按资源名称进行限流</h3>
<p>代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RateLimitController</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/byResource"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"byResource"</span><span class="token punctuation">,</span>blockHandler <span class="token operator">=</span> <span class="token string">"handlerException"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">byResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"按照资源名称限流"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"资源名称被限流,暂时无法访问"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>设定规则</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112143231499.png" alt="image-20220112143231499" loading="lazy"></p>
<p>一秒内</p>
<p>第一次访问</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>http://localhost:8401/byResource

HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8
Content-Length: 24
Date: Wed, 12 Jan 2022 06:32:43 GMT
Keep-Alive: timeout=60
Connection: keep-alive

按照资源名称限流

Response code: 200; Time: 6ms; Content length: 8 bytes
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>第二次访问</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>http://localhost:8401/byResource

HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8
Content-Length: 40
Date: Wed, 12 Jan 2022 06:32:48 GMT
Keep-Alive: timeout=60
Connection: keep-alive

资源名称被限流,暂时无法访问

Response code: 200; Time: 19ms; Content length: 14 bytes
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>但这里我们就有一个问题</p>
<blockquote>
<p>我们这个服务是开在8401端口上的，当我们关闭8401，再重新打开后，所有的规则之类的都没有了</p>
<p>这个之前也有遇到过，说明是临时的，之后会解决</p>
</blockquote>
<h3 id="按照url限流" tabindex="-1"><a class="header-anchor" href="#按照url限流" aria-hidden="true">#</a> 按照URL限流</h3>
<p>非常简单，跟之前的一样</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RateLimitController</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 注意 如果说是按照URL来限流而并非是资源名的话 我们的自定义blockHandler是无效的
     * <span class="token keyword">@return</span> String 
     */</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/byResource"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"res"</span><span class="token punctuation">,</span>blockHandler <span class="token operator">=</span> <span class="token string">"handlerException"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">byResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"按照URL进行限流"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"URL被限流,暂时无法访问"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112144252118.png" alt="image-20220112144252118" loading="lazy"></p>
<p>第一次访问</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112144303604.png" alt="image-20220112144303604" loading="lazy"></p>
<p>第二次访问</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112144312165.png" alt="image-20220112144312165" loading="lazy"></p>
<h3 id="目前兜底方案中的问题" tabindex="-1"><a class="header-anchor" href="#目前兜底方案中的问题" aria-hidden="true">#</a> 目前兜底方案中的问题</h3>
<ol>
<li>系统默认的，没有体现我们自己的业务要求</li>
<li>依照现有条件，我们自定义的处理方法又和业务代码耦合在一块，不直观</li>
<li>每个业务方法都添加一个兜底的，那代码膨胀加剧</li>
<li>全局统一的处理方法没有体现</li>
<li>如果我们抛出自定义异常，比如空指针之类的无法处理</li>
<li>不存在持久化，我们每次重启服务后都要手动在sentinel内进行配置</li>
</ol>
<h3 id="自定义限流处理逻辑" tabindex="-1"><a class="header-anchor" href="#自定义限流处理逻辑" aria-hidden="true">#</a> 自定义限流处理逻辑</h3>
<p>我们先来一个Controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RateLimitController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/rateLimit/customerBlockHandler"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"customerBlockHandler"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">customerBlockHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"按自定义限流，这里是通过了的-OK"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这个时候我们还没有自定义过处理，所以一定走的是默认的，但是我又不想在controller内写过多的业务代码，所以这个时候可以通过新建一个Handler类来进行解耦合</p>
<p>位置：<code>handler/CustomerBlockHandler</code></p>
<p>代码 不需要加任何的bean之类的，但是注意方法需要为static的</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerBlockHandler</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">handlerException</span><span class="token punctuation">(</span><span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"自定义限流处理---ERROR-----1"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">handlerException2</span><span class="token punctuation">(</span><span class="token class-name">BlockException</span> exception<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"自定义限流处理---ERROR-----2"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>接着回到controller，填上我们的内容</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RateLimitController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/rateLimit/customerBlockHandler"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>
        value <span class="token operator">=</span> <span class="token string">"customerBlockHandler"</span><span class="token punctuation">,</span>
        <span class="token comment">// 找哪个类</span>
        blockHandlerClass <span class="token operator">=</span> <span class="token class-name">CustomerBlockHandler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> 
        <span class="token comment">// 指定类中的哪个方法 如果说没有指定类的话 默认是找本类的</span>
        blockHandler <span class="token operator">=</span> <span class="token string">"handlerException2"</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">customerBlockHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"按自定义限流，这里是通过了的-OK"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>接着我们对自己的<strong>资源</strong>进行下限流</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112150037005.png" alt="image-20220112150037005" loading="lazy"></p>
<p>访问过多的时候返回了我们想要的内容</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112150052275.png" alt="image-20220112150052275" loading="lazy"></p>
<h3 id="sentinelresource-参数说明" tabindex="-1"><a class="header-anchor" href="#sentinelresource-参数说明" aria-hidden="true">#</a> @SentinelResource 参数说明</h3>
<p>参照<a href="https://github.com/alibaba/Sentinel/wiki/%E6%B3%A8%E8%A7%A3%E6%94%AF%E6%8C%81" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<blockquote>
<p>注意：注解方式埋点不支持 private 方法。</p>
</blockquote>
<p><code>@SentinelResource</code> 用于定义资源，并提供可选的异常处理和 fallback 配置项。 <code>@SentinelResource</code> 注解包含以下属性：</p>
<blockquote>
<ul>
<li><code>value</code>：资源名称，必需项（不能为空）</li>
<li><code>entryType</code>：entry 类型，可选项（默认为 <code>EntryType.OUT</code>）</li>
<li><code>blockHandler</code> / <code>blockHandlerClass</code>: <code>blockHandler</code> 对应处理 <code>BlockException</code> 的函数名称，可选项。
<ul>
<li>blockHandler 函数访问范围需要是 <code>public</code>，返回类型需要与原方法相匹配，参数类型需要和原方法相匹配并且最后加一个额外的参数，类型为 <code>BlockException</code></li>
<li>blockHandler 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 <code>blockHandlerClass</code> 为对应的类的 <code>Class</code> 对象，<strong>注意对应的函数必需为 static 函数</strong>，否则无法解析。</li>
</ul>
</li>
<li><code>fallback</code> / <code>fallbackClass</code>：fallback 函数名称，可选项，用于在抛出异常的时候提供 fallback 处理逻辑。fallback 函数可以针对所有类型的异常（除了 <code>exceptionsToIgnore</code> 里面排除掉的异常类型）进行处理。fallback 函数签名和位置要求：
<ul>
<li>返回值类型必须与原函数返回值类型一致；</li>
<li>方法参数列表需要和原函数一致，或者可以额外多一个 <code>Throwable</code> 类型的参数用于接收对应的异常。</li>
<li>fallback 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 <code>fallbackClass</code> 为对应的类的 <code>Class</code> 对象，注意对应的函数必需为 static 函数，否则无法解析。</li>
</ul>
</li>
<li><code>defaultFallback</code>（since 1.6.0）：默认的 fallback 函数名称，可选项，通常用于通用的 fallback 逻辑（即可以用于很多服务或方法）。默认 fallback 函数可以针对所有类型的异常（除了 <code>exceptionsToIgnore</code> 里面排除掉的异常类型）进行处理。若同时配置了 fallback 和 defaultFallback，则只有 fallback 会生效。defaultFallback 函数签名要求：
<ul>
<li>返回值类型必须与原函数返回值类型一致；</li>
<li>方法参数列表需要为空，或者可以额外多一个 <code>Throwable</code> 类型的参数用于接收对应的异常。</li>
<li>defaultFallback 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 <code>fallbackClass</code> 为对应的类的 <code>Class</code> 对象，注意对应的函数必需为 static 函数，否则无法解析。</li>
</ul>
</li>
<li><code>exceptionsToIgnore</code>（since 1.6.0）：用于指定哪些异常被排除掉，不会计入异常统计中，也不会进入 fallback 逻辑中，而是会原样抛出。</li>
</ul>
</blockquote>
<p>1.8.0 版本开始，<code>defaultFallback</code> 支持在类级别进行配置。</p>
<blockquote>
<p>注：1.6.0 之前的版本 fallback 函数只针对降级异常（<code>DegradeException</code>）进行处理，<strong>不能针对业务异常进行处理</strong>。</p>
</blockquote>
<p>特别地，若 blockHandler 和 fallback 都进行了配置，则被限流降级而抛出 <code>BlockException</code> 时只会进入 <code>blockHandler</code> 处理逻辑。若未配置 <code>blockHandler</code>、<code>fallback</code> 和 <code>defaultFallback</code>，则被限流降级时会将 <code>BlockException</code> <strong>直接抛出</strong>（若方法本身未定义 throws BlockException 则会被 JVM 包装一层 <code>UndeclaredThrowableException</code>）。</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112152219401.png" alt="image-20220112152219401" loading="lazy"></p>
<h2 id="sentinel整合loadbalancer和feign" tabindex="-1"><a class="header-anchor" href="#sentinel整合loadbalancer和feign" aria-hidden="true">#</a> Sentinel整合LoadBalancer和Feign</h2>
<h3 id="工程准备-服务提供者的搭建" tabindex="-1"><a class="header-anchor" href="#工程准备-服务提供者的搭建" aria-hidden="true">#</a> 工程准备-服务提供者的搭建</h3>
<p>服务提供者9001、9002</p>
<p>消费者80</p>
<p>我这里懒得弄杂七杂八的配置数据库了，正好刚刚在知乎看到Java有一个Faker库，所以直接拿来用用</p>
<p>Faker库的<a href="https://github.com/DiUS/java-faker" target="_blank" rel="noopener noreferrer">地址<ExternalLinkIcon/></a></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--Faker库，注意 这里要排除掉那啥 不然会报错--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.github.javafaker<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>javafaker<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.yaml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>snakeyaml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--        Nacos--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>



    <span class="token comment">&lt;!--        基本组件--></span>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>配置文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos

<span class="token comment"># 暴露监控端口</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>main启动类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CloudNacos9001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">CloudNacos9001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>controller，这里和service以及dao弄一块了，懒得搞别的</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${server.port}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverPort<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/faker/{number}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResopnseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"number"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getRandomUser</span><span class="token punctuation">(</span><span class="token string">"success-----"</span> <span class="token operator">+</span> serverPort<span class="token punctuation">,</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 用于生成假的随机数据
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Faker</span> FAKER <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Faker</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Locale</span><span class="token punctuation">(</span><span class="token string">"zh-CN"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 测试类
     */</span>
    <span class="token annotation punctuation">@Data</span>
    <span class="token annotation punctuation">@AllArgsConstructor</span>
    <span class="token annotation punctuation">@NoArgsConstructor</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> phone<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Data</span>
    <span class="token annotation punctuation">@AllArgsConstructor</span>
    <span class="token annotation punctuation">@NoArgsConstructor</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ResopnseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> code<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">T</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 生成User假数据
     *
     * <span class="token keyword">@param</span> <span class="token parameter">number</span> 生成的数量
     * <span class="token keyword">@return</span> User列表
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ResopnseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">getRandomUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">,</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> users <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> number<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            users<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span>FAKER<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fullName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> FAKER<span class="token punctuation">.</span><span class="token function">internet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> FAKER<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fullAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> FAKER<span class="token punctuation">.</span><span class="token function">phoneNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">cellPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResopnseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> message<span class="token punctuation">,</span> users<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><p>请求结果：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// 请求： GET http://localhost:9001/faker/1</span>
<span class="token punctuation">{</span>
  <span class="token property">"code"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"success-----9001"</span><span class="token punctuation">,</span>
  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"田熠彤"</span><span class="token punctuation">,</span>
      <span class="token property">"password"</span><span class="token operator">:</span> <span class="token string">"wvxrhu5ht5f"</span><span class="token punctuation">,</span>
      <span class="token property">"address"</span><span class="token operator">:</span> <span class="token string">"Apt. 728 魏侬3084号, 库尔勒, 京 581915"</span><span class="token punctuation">,</span>
      <span class="token property">"phone"</span><span class="token operator">:</span> <span class="token string">"17836909687"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>不得不说，Java的工具类库玩起来是真的舒服..</p>
<h3 id="消费者80的搭建" tabindex="-1"><a class="header-anchor" href="#消费者80的搭建" aria-hidden="true">#</a> 消费者80的搭建</h3>
<p>首先是依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--        Sentinel持久化 这个后续持久化的时候要用到--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.csp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sentinel-datasource-nacos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        Sentinel--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-sentinel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        Nacos--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        负载均衡--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-loadbalancer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p>然后是配置文件，开启sentinel</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>order<span class="token punctuation">-</span>consumer
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
    <span class="token comment">#nacos</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8080</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>
<span class="token comment"># 暴露监控端口</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>启动类 记得开启Fegin</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer80Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Consumer80Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>两个domain</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ResopnseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> code<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> data<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> address<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> phone<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>一个fegin的service接口</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span><span class="token string">"nacos-payment-provider"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentFeignService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/faker/{number}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResopnseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"number"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>一个controller 注意 <strong>这里带有Sentinel</strong>以及异常</p>
<p>低于5个没有异常，等于2333抛异常，大于5个抛异常</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">PaymentFeignService</span> paymentFeignService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"test/{count}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span><span class="token string">"fakerFallback"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResopnseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUsers</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"count"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> paymentFeignService<span class="token punctuation">.</span><span class="token function">fakerUser</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">2333</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"参数异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token string">"超过5个"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>访问效果：</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112161742038.png" alt="image-20220112161742038" loading="lazy"></p>
<p>第二次：</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112161757094.png" alt="image-20220112161757094" loading="lazy"></p>
<p>负载均衡 Get</p>
<p>经过以上的配置，最终在nacos内的</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112162206114.png" alt="image-20220112162206114" loading="lazy"></p>
<p>在sentinel内的</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112162449708.png" alt="image-20220112162449708" loading="lazy"></p>
<h3 id="✨服务熔断只配置fallback-服务降级-处理自定义异常" tabindex="-1"><a class="header-anchor" href="#✨服务熔断只配置fallback-服务降级-处理自定义异常" aria-hidden="true">#</a> ✨服务熔断只配置fallback(服务降级-处理自定义异常)</h3>
<p>我们刚刚手动写过两个错误，如果说直接抛出给用户的话不太友好</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"test/{count}"</span><span class="token punctuation">)</span>
<span class="token comment">// 这里没有配置fallback</span>
<span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span><span class="token string">"fakerFallback"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUsers</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"count"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentFeignService<span class="token punctuation">.</span><span class="token function">fakerUser</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">2333</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"参数异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token string">"超过5个"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>如果说按照以往的思路，我们可以通过自定义一个SpringMVC的异常配置来进行处理，返回漂亮的结果</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@ControllerAdvice</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ControllerExceptionHandler</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">IllegalArgumentException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token annotation punctuation">@ResponseStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span>INTERNAL_SERVER_ERROR<span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">handleException</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setCode</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setMessage</span><span class="token punctuation">(</span><span class="token string">"服务器内部错误"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>访问返回了json</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"code"</span><span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"服务器内部错误"</span><span class="token punctuation">,</span>
    <span class="token property">"data"</span><span class="token operator">:</span> <span class="token string">"超过5个"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>但是这显然没有达到我们的目的，接下来通过Sentinel来配置吧</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">PaymentFeignService</span> paymentFeignService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"test/{count}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"fakerFallback"</span><span class="token punctuation">,</span> fallback <span class="token operator">=</span> <span class="token string">"handlerFallback"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUsers</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"count"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> paymentFeignService<span class="token punctuation">.</span><span class="token function">fakerUser</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">2333</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"参数异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token string">"超过5个"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">handlerFallback</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">"兜底异常handlerFallback触发"</span><span class="token punctuation">,</span> <span class="token string">"exception的内容:"</span> <span class="token operator">+</span> throwable<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><blockquote>
<p>特别说明：<strong>这个handlerFallback中的参数 如果要返回给用户异常之类的信息 一定要把之前fakerUsers这个方法内的参数（int number）也挪过来，不然百分之百不成功…</strong></p>
</blockquote>
<p>效果</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112170024390.png" alt="image-20220112170024390" loading="lazy"></p>
<h3 id="✨只配置blockhandler-处理sentinel控制台配置违规异常" tabindex="-1"><a class="header-anchor" href="#✨只配置blockhandler-处理sentinel控制台配置违规异常" aria-hidden="true">#</a> ✨只配置BlockHandler(处理sentinel控制台配置违规异常)</h3>
<p>草，我才发现..这玩意有两个block 太草了</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>METHOD<span class="token punctuation">,</span> <span class="token class-name">ElementType</span><span class="token punctuation">.</span>TYPE<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Inherited</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SentinelResource</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

    <span class="token class-name">EntryType</span> <span class="token function">entryType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token class-name">EntryType</span><span class="token punctuation">.</span>OUT<span class="token punctuation">;</span>

    <span class="token keyword">int</span> <span class="token function">resourceType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">blockHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">blockHandlerClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">fallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">defaultFallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">fallbackClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Throwable</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">exceptionsToTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token class-name">Throwable</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Throwable</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">exceptionsToIgnore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>配置</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">PaymentFeignService</span> paymentFeignService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"test/{count}"</span><span class="token punctuation">)</span>
    <span class="token comment">//    @SentinelResource(value = "fakerFallback", fallback = "handlerFallback")</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"fakerFallback"</span><span class="token punctuation">,</span> blockHandler <span class="token operator">=</span> <span class="token string">"sentinelFallBack"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUsers</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"count"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> paymentFeignService<span class="token punctuation">.</span><span class="token function">fakerUser</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">2333</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"参数异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token string">"超过5个"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">handlerFallback</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">"兜底异常handlerFallback触发"</span><span class="token punctuation">,</span> <span class="token string">"exception的内容:"</span> <span class="token operator">+</span> throwable<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">sentinelFallBack</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">"控制台异常sentinelFallBack触发"</span><span class="token punctuation">,</span> <span class="token string">"exception的内容:"</span> <span class="token operator">+</span> throwable<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>然后手动的给他上一个buff</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112171045872.png" alt="image-20220112171045872" loading="lazy"></p>
<p>然后多次访问正确的</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112171327548.png" alt="image-20220112171327548" loading="lazy"></p>
<p>单次访问错误的</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112171346760.png" alt="image-20220112171346760" loading="lazy"></p>
<p>多次访问错误的</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112171356489.png" alt="image-20220112171356489" loading="lazy"></p>
<h3 id="目前两种配置方式存在的缺陷" tabindex="-1"><a class="header-anchor" href="#目前两种配置方式存在的缺陷" aria-hidden="true">#</a> 目前两种配置方式存在的缺陷</h3>
<p>只配置fallback的话，sentinel控制台的异常将捕获不到，反之亦然，解决方案也很简单，就是两个都配置</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112172309539.png" alt="image-20220112172309539" loading="lazy"></p>
<h3 id="✨fallback和blockhandler都配置" tabindex="-1"><a class="header-anchor" href="#✨fallback和blockhandler都配置" aria-hidden="true">#</a> ✨Fallback和BlockHandler都配置</h3>
<p>直接按照下方代码走一遭即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">PaymentFeignService</span> paymentFeignService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"test/{count}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"fakerFallback"</span><span class="token punctuation">,</span> blockHandler <span class="token operator">=</span> <span class="token string">"sentinelFallBack"</span><span class="token punctuation">,</span> fallback <span class="token operator">=</span> <span class="token string">"handlerFallback"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUsers</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"count"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> paymentFeignService<span class="token punctuation">.</span><span class="token function">fakerUser</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">2333</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"参数异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token string">"超过5个"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 本例是Fallback
     *
     * <span class="token keyword">@param</span> <span class="token parameter">number</span>
     * <span class="token keyword">@param</span> <span class="token parameter">throwable</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">handlerFallback</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">"兜底异常handlerFallback触发"</span><span class="token punctuation">,</span> <span class="token string">"exception的内容:"</span> <span class="token operator">+</span> throwable<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 本例是BlockHandler
     *
     * <span class="token keyword">@param</span> <span class="token parameter">number</span>
     * <span class="token keyword">@param</span> <span class="token parameter">throwable</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">sentinelFallBack</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">,</span> <span class="token class-name">BlockException</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">"控制台异常sentinelFallBack触发"</span><span class="token punctuation">,</span> <span class="token string">"exception的内容:"</span> <span class="token operator">+</span> throwable<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>然后加个debuff</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112172744056.png" alt="image-20220112172744056" loading="lazy"></p>
<p>直接访问错误的：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"code"</span><span class="token operator">:</span> <span class="token number">400</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"兜底异常handlerFallback触发"</span><span class="token punctuation">,</span>
    <span class="token property">"data"</span><span class="token operator">:</span> <span class="token string">"exception的内容:超过5个"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>多次访问错误的：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">{</span>
    <span class="token string">"code"</span><span class="token operator">:</span> <span class="token number">400</span><span class="token punctuation">,</span>
    <span class="token string">"message"</span><span class="token operator">:</span> <span class="token string">"控制台异常sentinelFallBack触发"</span><span class="token punctuation">,</span>
    <span class="token string">"data"</span><span class="token operator">:</span> <span class="token string">"exception的内容:null"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="忽略指定的异常" tabindex="-1"><a class="header-anchor" href="#忽略指定的异常" aria-hidden="true">#</a> 忽略指定的异常</h3>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112173728910.png" alt="image-20220112173728910" loading="lazy"></p>
<p>就是不捕获，让其自生自灭某个异常，在工作中应该用的上（人工修Bug的时候）</p>
<h3 id="✨使用fegin来完成服务宕机的熔断处理" tabindex="-1"><a class="header-anchor" href="#✨使用fegin来完成服务宕机的熔断处理" aria-hidden="true">#</a> ✨使用Fegin来完成服务宕机的熔断处理</h3>
<p>配置文件先加上开启fegin</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>order<span class="token punctuation">-</span>consumer
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
    <span class="token comment">#nacos</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8080</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>
<span class="token comment"># 暴露监控端口</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">circuitbreaker</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>然后写一个FallbackFactory</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentFeignServiceFallbackImpl</span> <span class="token keyword">implements</span> <span class="token class-name">FallbackFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PaymentFeignService</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">PaymentFeignService</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> cause<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PaymentFeignServiceImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PaymentFeignServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">PaymentFeignService</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUser</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">411</span><span class="token punctuation">,</span> <span class="token string">"友好的服务降级"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>然后到service中引入</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"nacos-payment-provider"</span><span class="token punctuation">,</span> fallbackFactory <span class="token operator">=</span> <span class="token class-name">PaymentFeignServiceFallbackImpl</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentFeignService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/faker/{number}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUser</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"number"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>再到controller内使用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">PaymentFeignService</span> paymentFeignService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"test/{count}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"fakerFallback"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">fakerUsers</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"count"</span><span class="token punctuation">)</span> <span class="token keyword">int</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"经过了我的方法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> paymentFeignService<span class="token punctuation">.</span><span class="token function">fakerUser</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">==</span> <span class="token number">2333</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"参数异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token string">"超过5个"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>最终main方法不要忘了加上</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer80Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Consumer80Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>然后访问</p>
<p>当我们的服务正常的时候返回的值</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"code"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"success-----9001"</span><span class="token punctuation">,</span>
    <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"郑鹤轩"</span><span class="token punctuation">,</span>
            <span class="token property">"password"</span><span class="token operator">:</span> <span class="token string">"4eg5si5mc"</span><span class="token punctuation">,</span>
            <span class="token property">"address"</span><span class="token operator">:</span> <span class="token string">"严路079号, 武汉, 新 151681"</span><span class="token punctuation">,</span>
            <span class="token property">"phone"</span><span class="token operator">:</span> <span class="token string">"15708796654"</span>
        <span class="token punctuation">}</span>▸
    <span class="token punctuation">]</span>▸
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>当我们服务宕机的时候</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112180715043.png" alt="image-20220112180715043" loading="lazy"></p>
<p>返回的值</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"code"</span><span class="token operator">:</span> <span class="token number">411</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"友好的服务降级"</span><span class="token punctuation">,</span>
    <span class="token property">"data"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="熔断框架比较" tabindex="-1"><a class="header-anchor" href="#熔断框架比较" aria-hidden="true">#</a> 熔断框架比较</h3>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112180954657.png" alt="image-20220112180954657" loading="lazy"></p>
<p>最后一个国外用的多一些</p>
<h2 id="规则持久化" tabindex="-1"><a class="header-anchor" href="#规则持久化" aria-hidden="true">#</a> 规则持久化</h2>
<p>说了好久了，一旦我们重启应用，Sentinel规则将消失，所以需要持久化来帮我们手动配置</p>
<h3 id="如何持久化" tabindex="-1"><a class="header-anchor" href="#如何持久化" aria-hidden="true">#</a> 如何持久化</h3>
<p>只要有一个持久化的媒介即可，正好nacos支持配置存储，当然我们也可以选择redis之类的，反正只要能存储数据就行</p>
<p>本来我还纳闷为啥一定要中间件…不能直接存储吗…直到我看到了他们WIKI中的<a href="https://github.com/alibaba/Sentinel/wiki/AHAS-Sentinel-%E6%8E%A7%E5%88%B6%E5%8F%B0" target="_blank" rel="noopener noreferrer">这个<ExternalLinkIcon/></a></p>
<p>阿里还提供了AHAS Sentinel 控制台，功能比这个更丰富</p>
<p>懂了，要么自己折腾，要么花钱用他们家的</p>
<p>先自己折腾吧</p>
<h3 id="依赖准备" tabindex="-1"><a class="header-anchor" href="#依赖准备" aria-hidden="true">#</a> 依赖准备</h3>
<p>除了Nacos，它还支持非常多的方式，可以在<a href="https://mvnrepository.com/search?q=sentinel-datasource" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>看到</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>


        <span class="token comment">&lt;!--        Sentinel持久化For Nacos--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.csp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>sentinel-datasource-nacos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--        Sentinel--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-sentinel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--        Nacos--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!--        其他组件--></span>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>order<span class="token punctuation">-</span>consumer
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
    <span class="token comment">#nacos</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8080</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8719</span>
      <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
        <span class="token comment"># 这里相当于是它配置一个数据源 名字是ds1 这个千万不能漏了...</span>
       <span class="token key atrule">ds1</span><span class="token punctuation">:</span>
         <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
           <span class="token comment"># Nacos的地址</span>
           <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
           <span class="token comment"># DataID</span>
           <span class="token key atrule">dataID</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
           <span class="token comment"># 分组</span>
           <span class="token key atrule">groupID</span><span class="token punctuation">:</span> DEFAULT_GROUP
           <span class="token comment"># 账号以及密码</span>
           <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
           <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
           <span class="token comment"># 读取配置文件为json</span>
           <span class="token key atrule">data-type</span><span class="token punctuation">:</span> json
           <span class="token comment"># 流控规则 就是我们之前配置的限流等（有好几种：flow、degrade、authority、system、param-flow，gw-flow，gw-api-group）</span>
           <span class="token key atrule">rule-type</span><span class="token punctuation">:</span> flow
     <span class="token comment"># 关闭懒加载 启动的时候直接加载所有的配置</span>
      <span class="token key atrule">eager</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token comment">#      web-context-unify: false</span>
<span class="token comment"># 暴露监控端口</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><h3 id="nacos控制台配置" tabindex="-1"><a class="header-anchor" href="#nacos控制台配置" aria-hidden="true">#</a> Nacos控制台配置</h3>
<p>规则的种类可以在<a href="https://github.com/alibaba/Sentinel/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8#%E8%A7%84%E5%88%99%E7%9A%84%E7%A7%8D%E7%B1%BB" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>查看</p>
<p>这里只展示<strong>流量控制规则</strong></p>
<table>
<thead>
<tr>
<th>Field</th>
<th>说明</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>resource</td>
<td>资源名，资源名是限流规则的作用对象</td>
<td></td>
</tr>
<tr>
<td>count</td>
<td>限流阈值</td>
<td></td>
</tr>
<tr>
<td>grade</td>
<td>限流阈值类型，QPS 模式（1）或并发线程数模式（0）</td>
<td>QPS 模式</td>
</tr>
<tr>
<td>limitApp</td>
<td>流控针对的调用来源</td>
<td><code>default</code>，代表不区分调用来源</td>
</tr>
<tr>
<td>strategy</td>
<td>调用关系限流策略：直接、链路、关联(0,1,2)</td>
<td>根据资源本身（直接）</td>
</tr>
<tr>
<td>controlBehavior</td>
<td>流控效果（直接拒绝/WarmUp/匀速+排队等待），不支持按调用关系限流(0,1,2)</td>
<td>直接拒绝</td>
</tr>
<tr>
<td>clusterMode</td>
<td>是否集群限流(true/false)</td>
<td>否</td>
</tr>
</tbody>
</table>
<p>Json：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"resource"</span><span class="token operator">:</span><span class="token string">"/test/{count}"</span><span class="token punctuation">,</span>
        <span class="token property">"limitApp"</span><span class="token operator">:</span><span class="token string">"default"</span><span class="token punctuation">,</span>
        <span class="token property">"grade"</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token property">"count"</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">"strategy"</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">"controlBehavior"</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">"clusterMode"</span><span class="token operator">:</span><span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112195509106.png" alt="image-20220112195509106" loading="lazy"></p>
<h3 id="测试-1" tabindex="-1"><a class="header-anchor" href="#测试-1" aria-hidden="true">#</a> 测试</h3>
<p>刚启动 我啥都还没整，规则就有了</p>
<p><img src="/images/SpringCloud/13-Sentinel熔断与限流/image-20220112195417529.png" alt="image-20220112195417529" loading="lazy"></p>
<h2 id="如何自定义sentinel-让其自动持久化推送到nacos" tabindex="-1"><a class="header-anchor" href="#如何自定义sentinel-让其自动持久化推送到nacos" aria-hidden="true">#</a> 如何自定义Sentinel-让其自动持久化推送到Nacos</h2>
<p>一句话概括：要改sentinel的源码</p>
<p>懒得改，用别人的吧</p>
<p><a href="https://www.jianshu.com/p/9c5ad75ddfa5" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/9c5ad75ddfa5<ExternalLinkIcon/></a></p>
<p><a href="https://www.jianshu.com/p/9a6cf8634805" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/9a6cf8634805<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/weixin_42942786/article/details/108679948" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/weixin_42942786/article/details/108679948<ExternalLinkIcon/></a></p>
<p><a href="https://www.jianshu.com/p/637ce8acc271" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/637ce8acc271<ExternalLinkIcon/></a></p>
<p>主要是改不来 试了三个小时 依旧摸不着头脑，代码按照前面三个改动了 debug跑也正常 但nacos内就是不变更，感觉像是两边的api都有所变动导致的不对等造成的..</p>
<p>百度 <code>sentinel 集成 nacos</code></p>
</template>
