<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>我们在分布式系统中难免会遇到如下问题</p>
<p>复杂的分布式体系结构中的应用由数十个依赖关系，每个依赖关系在某些时候不可避免的失败</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107154127516.png" alt="image-20220107154127516" loading="lazy"></p>
<p>服务雪崩警告</p>
<p>emm说人话吧</p>
<blockquote>
<p>假设我们在服务调用的时候，A调用B，B调用C，如果C垮了，那么全员GG</p>
<p>ABCD的调用也被称为扇出效应，如果扇出的链路上某个微服务响应时间过长或者不可用，对微服务A的调用就会占用越来越多的资源，进而引起系统崩溃，这也是所谓的雪崩效应</p>
<p>也就是说，对于高流量的应用的话，单一的后端依赖可能会导致所有服务器上的资源都在几秒钟之内饱和。。。非常恐怖</p>
<p>所以就需要服务降级了</p>
</blockquote>
<p>Hysterix就是来解决这个问题的，它是一个用于分布式系统的延迟和容错的开源库，在分布式系统里，很多依赖会不可避免的调用失败，比如超时、异常等，它能够保证在一个依赖出问题的情况下，不导致整体服务失败，避免级联故障，以提高分布式系统的弹性</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107154732421.png" alt="image-20220107154732421" loading="lazy"></p>
<p>遗憾的是，它目前已经停更了（在2017年就无了）</p>
<p>wiki<a href="https://github.com/Netflix/Hystrix/wiki" target="_blank" rel="noopener noreferrer">https://github.com/Netflix/Hystrix/wiki<ExternalLinkIcon/></a></p>
<p>停更：</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107155057161.png" alt="image-20220107155057161" loading="lazy"></p>
<p>虽然说他这里面说了替代品resilience4j，但是国内嘛。。Java还是得阿里巴巴牛逼</p>
<h2 id="hystrix的重要概念" tabindex="-1"><a class="header-anchor" href="#hystrix的重要概念" aria-hidden="true">#</a> Hystrix的重要概念</h2>
<p>只能说 面试会问</p>
<p>服务熔断是客户端无法给消费端提供服务，然后断开连接。</p>
<p>服务降级是高级的连接无法达成，那么就降级用自己这端的方法。</p>
<p>服务限流是防止高峰导致服务器直接宕机，限制指定时间段内的访问数量</p>
<h3 id="服务降级" tabindex="-1"><a class="header-anchor" href="#服务降级" aria-hidden="true">#</a> 服务降级</h3>
<p>一般也会称为fallback</p>
<p>emm举一个简单的例子吧</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">if</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    <span class="token comment">// 对方系统不可用了，给一个兜底的解决方案</span>
<span class="token punctuation">}</span>
<span class="token comment">// 或者</span>
<span class="token keyword">switch</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">case</span> a<span class="token operator">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> b<span class="token operator">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>也就是：服务忙，稍后再试，不让客户等待并立刻返回一个友好提示，fallback</p>
<blockquote>
<p>那些情况会出现降级？</p>
</blockquote>
<ul>
<li>程序运行异常</li>
<li>超时</li>
<li>服务熔断触发降级</li>
<li>线程池、信号量打满也会导致服务降级</li>
</ul>
<h3 id="服务熔断" tabindex="-1"><a class="header-anchor" href="#服务熔断" aria-hidden="true">#</a> 服务熔断</h3>
<p>一般也会称为break</p>
<blockquote>
<p>就像是我们家中必备的保险丝一样，达到最大服务访问后，直接拒绝访问（避免自己挂了），拉闸限电，然后调用服务降级的方法返回友好提示</p>
<p>说穿了就是保险丝：服务的降级-&gt;进而熔断-&gt;恢复调用链路</p>
</blockquote>
<h3 id="服务限流" tabindex="-1"><a class="header-anchor" href="#服务限流" aria-hidden="true">#</a> 服务限流</h3>
<p>一般也会被称为flowlimit</p>
<blockquote>
<p>秒杀等高并发操作，严禁一蜂窝的过来拥挤，大家排队，一秒钟N个，有序的运行</p>
</blockquote>
<h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2>
<h3 id="新建一个8001的依赖" tabindex="-1"><a class="header-anchor" href="#新建一个8001的依赖" aria-hidden="true">#</a> 新建一个8001的依赖</h3>
<p>我们先只保留一个服务中心，这里我就懒得用Eureka了，改成用<strong>Consul</strong>（Eureka启动起来有点烦人，当然你也可以继续选择使用Eureka）</p>
<p>集群就懒得搭建了，也是只保留一个</p>
<p>接下来准备下module:<code>cloud-provider-consul-hystrix-payment-8001</code></p>
<p>依赖我就懒得弄这么多了 保留几个最经典的，以及我们的新伙伴</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.10.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-consul-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
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
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="配置文件、service、controller、main的准备" tabindex="-1"><a class="header-anchor" href="#配置文件、service、controller、main的准备" aria-hidden="true">#</a> 配置文件、service、controller、main的准备</h3>
<p>配置文件 这里就简单配置下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#端口号</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> consul<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
  <span class="token comment"># consul注册中心地址</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
<span class="token comment">#        hostname: 127.0.0.1</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>main 标准写法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProviderConsul8001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ProviderConsul8001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>一个service，这里懒得写接口之类的了</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 正常访问Ok的方法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">id</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfo</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"线程池:"</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\tPaymentInfo,id:"</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">"\tOk"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 抛出异常的方法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">id</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfoError</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"*****模拟抛出异常*****"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo,id:" + id + "\tOk";</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 延时返回的方法
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfoTimeout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">"线程池:"</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\tPaymentInfo_TIMEOUT,id:"</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">"\tOk,耗时3秒"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>还有一个controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProviderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token class-name">PaymentService</span> paymentService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${server.port}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverPort<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentOk</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">paymentService<span class="token punctuation">.</span></span>PaymentInfo</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"******result:"</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentTimeout</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">paymentService<span class="token punctuation">.</span></span>PaymentInfoTimeout</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"******result:"</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/error/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentError</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">paymentService<span class="token punctuation">.</span></span>PaymentInfoError</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"******result:"</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>反正正反都可以成功访问不是error的那个</p>
<h3 id="高并发测试jemeter" tabindex="-1"><a class="header-anchor" href="#高并发测试jemeter" aria-hidden="true">#</a> 高并发测试Jemeter</h3>
<p>上述的玩意（两个正常的controller）在非高并发的情况下，足以满足需求，但如果是高并发的话..</p>
<p>这里可以用postman来测试</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107171925536.png" alt="image-20220107171925536" loading="lazy"></p>
<p>或者使用Apache的jmeter<a href="https://jmeter.apache.org/" target="_blank" rel="noopener noreferrer">https://jmeter.apache.org/<ExternalLinkIcon/></a></p>
<p>非常简单</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107172147001.png" alt="image-20220107172147001" loading="lazy"></p>
<p>下载，解压后得到一个文件夹，进入到bin运行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>java -jar .<span class="token punctuation">\</span>ApacheJMeter.jar
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107172227468.png" alt="image-20220107172227468" loading="lazy"></p>
<p>结果：</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107172242770.png" alt="image-20220107172242770" loading="lazy"></p>
<p>使用的话：</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107172803879.png" alt="image-20220107172803879" loading="lazy"></p>
<p>这一步如果你电脑很勇的话建议第三个或者第一个值设置为原来的10倍或者100倍</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107172847131.png" alt="image-20220107172847131" loading="lazy"></p>
<p>然后</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107172902293.png" alt="image-20220107172902293" loading="lazy"></p>
<p>接着</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107172930204.png" alt="image-20220107172930204" loading="lazy"></p>
<p>接着 你点进运行即可</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107173625286.png" alt="image-20220107173625286" loading="lazy"></p>
<p>右上角表示还没有结束的线程数量</p>
<p>这个时候你访问<a href="http://localhost:8001/payment/hystrix/timeout/1" target="_blank" rel="noopener noreferrer">http://localhost:8001/payment/hystrix/timeout/1<ExternalLinkIcon/></a></p>
<p>能感觉到明显的不止3秒钟，如果说刚刚你第一个值设置的比较多的话 应该就是10来秒 甚至拒绝响应..</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107173834926.png" alt="image-20220107173834926" loading="lazy"></p>
<p>第一个参数是线程数 第二个参数是每个运行的间隔时间，第三个参数是每个线程要轮循执行多少次</p>
<p>如果你第一个设置为2w，则模拟的是每秒2w个线程并发访问（还差150W就能达到12306的春运水平）</p>
<p>上面的服务还只是8001自己测试，如果此时消费者80也来访问，那么消费者只能干等，最终导致消费者80端不满意，服务端8001被拖死</p>
<h3 id="_80消费者加入" tabindex="-1"><a class="header-anchor" href="#_80消费者加入" aria-hidden="true">#</a> 80消费者加入</h3>
<p>老一套 先创建项目，添加依赖，我这里懒得用maven了，直接用Spring创建</p>
<p><code>cloud-consumer-feign-hystrix-order-80</code></p>
<p>依赖</p>
<p>hystrix 在消费端和服务端都可，降级用在消费侧，熔断用在服务侧</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        
        <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-hystrix --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.10.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-consul-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
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

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#端口号</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> consul<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>order
  <span class="token comment"># consul注册中心地址</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
<span class="token comment">#        hostname: 127.0.0.1</span>
<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span>
        <span class="token key atrule">connectTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token comment"># 来个10秒</span>
        <span class="token key atrule">readTimeout</span><span class="token punctuation">:</span> <span class="token number">10000</span>


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>然后main</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignHystrixConsumer80Application</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">FeignHystrixConsumer80Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>service</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span><span class="token string">"consul-provider-payment"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentOk</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentTimeout</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/error/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentError</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignHystrixController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token class-name">PaymentService</span> paymentService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentOk</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentTimeout</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/error/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentError</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>启动后访问正常</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107180805463.png" alt="image-20220107180805463" loading="lazy"></p>
<h3 id="二者一起测试" tabindex="-1"><a class="header-anchor" href="#二者一起测试" aria-hidden="true">#</a> 二者一起测试</h3>
<p>我们接下来用Jemeter和80端口测试</p>
<p>Jemeter开1w个线程</p>
<p>已知<code>readTimeout: 10000</code></p>
<p>开1w个</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107182752216.png" alt="image-20220107182752216" loading="lazy"></p>
<p>完美超时</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107182824410.png" alt="image-20220107182824410" loading="lazy"></p>
<p>并且你会发现你访问ok也不成功</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107183113983.png" alt="image-20220107183113983" loading="lazy"></p>
<h3 id="解决问题" tabindex="-1"><a class="header-anchor" href="#解决问题" aria-hidden="true">#</a> 解决问题</h3>
<p>我们现在要解决的是</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107183459964.png" alt="image-20220107183459964" loading="lazy"></p>
<h2 id="服务降级-1" tabindex="-1"><a class="header-anchor" href="#服务降级-1" aria-hidden="true">#</a> 服务降级</h2>
<h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3>
<p>所以我们要先从服务端找问题，需要设置自身调用超时时间的峰值，峰值内可以正常运行，超过了就调用一个兜底性的方法处理，做服务降级fallback</p>
<p>实际上非常简单</p>
<p>我们只需要在8001上添加如下代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentService</span> <span class="token punctuation">{</span>
    <span class="token comment">//....其他方法</span>
    <span class="token doc-comment comment">/**
     * 延时返回的方法
     * HystrixCommand 第一个fallbackMethod设置服务降级时要运行的方法，第二个commandProperties则是Hystrix在什么时候要进行服务降级
     */</span>
    <span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"PaymentInfoTimeoutHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里是只要这个方法的运行时间超过三秒，就进行服务降级</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"3000"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfoTimeout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 这里是延迟5秒</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">"线程池:"</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\tPaymentInfo_TIMEOUT,id:"</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">"\tOk,耗时3秒"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfoTimeoutHandler</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"线程池:"</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\tPaymentInfo_TIMEOUT_Handler,id:"</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">"\tOk,系统繁忙，请稍后再试"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>然后在主启动类内加上一个注解即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableCircuitBreaker</span> <span class="token comment">// 老版本只要加这个 新版本 只需要加下面那个即可</span>
<span class="token annotation punctuation">@EnableHystrix</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProviderConsul8001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ProviderConsul8001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>接下来我们启动并访问</p>
<p>8001:
<img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107195743528.png" alt="image-20220107195743528" loading="lazy"></p>
<p>80:</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107195755158.png" alt="image-20220107195755158" loading="lazy"></p>
<p>并且可以看到我们的线程被打断了</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107195907040.png" alt="image-20220107195907040" loading="lazy"></p>
<p>然后你是否还有注意到一点，返回值是：</p>
<p>这样的：<code>线程池:HystrixTimer-1	PaymentInfo_TIMEOUT_Handler,id:1	Ok,系统繁忙，请稍后再试</code></p>
<p>说明了Hystrix有一个专门的线程池来处理这个</p>
<p>我们再来一个对异常的兜底</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"paymentInfoErrorHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value<span class="token operator">=</span><span class="token string">"3000"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfoError</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"*****模拟抛出异常*****"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo,id:" + id + "\tOk";</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfoErrorHandler</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"线程池:"</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\tPaymentInfo_TIMEOUT_Handler,id:"</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">"\tOk,系统错误，请稍后再试"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>测试：</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107200618261.png" alt="image-20220107200618261" loading="lazy"></p>
<p>依旧能够返回我们预先设置的值</p>
<p>并且我可以把那个超时的去掉</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"paymentInfoErrorHandler"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfoError</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"*****模拟抛出异常*****"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//return "线程池:" + Thread.currentThread().getName() + "\tPaymentInfo,id:" + id + "\tOk";</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfoErrorHandler</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"线程池:"</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\tPaymentInfo_TIMEOUT_Handler,id:"</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">"\tOk,系统错误，请稍后再试"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>相当于HystrixCommand就是来做当出现异常的时候要执行的方法，我们可以用commandProperties来手动抛出异常</p>
<p>既然这样的话 finally是否有效呢？</p>
<p>我接着测试下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"PaymentInfoTimeoutHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"3000"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfoTimeout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"开始延迟"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"被打断了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"关闭资源等操作"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">"线程池:"</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\tPaymentInfo_TIMEOUT,id:"</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">"\tOk,耗时3秒"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token class-name">PaymentInfoTimeoutHandler</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"进行兜底操作"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">"线程池:"</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\tPaymentInfo_TIMEOUT_Handler,id:"</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">"\tOk,系统繁忙，请稍后再试"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>发现是可以进行处理的</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107203215813.png" alt="image-20220107203215813" loading="lazy"></p>
<p>也就是说，我们之后，无论是消费者还是服务提供者，都可以通过这种方式来做服务降级</p>
<p>但我们一般都是放在<strong>客户端</strong>，因为客户端是头，早发现问题早断开连接</p>
<h3 id="应用到80端" tabindex="-1"><a class="header-anchor" href="#应用到80端" aria-hidden="true">#</a> 应用到80端</h3>
<p>我们先把之前服务端的相应的东西都删掉（除了那个异常的）</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107212038356.png" alt="image-20220107212038356" loading="lazy"></p>
<p>然后去80端进行修改</p>
<p>main：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token annotation punctuation">@EnableHystrix</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignHystrixConsumer80Application</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">FeignHystrixConsumer80Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>接着修改controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignHystrixController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token class-name">PaymentService</span> paymentService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentOk</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"errorCallBackHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"5000"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentTimeout</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/error/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentError</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">errorCallBackHandler</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"网络过慢，请稍后再试！！！"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>接着正常测试没问题</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107212717005.png" alt="image-20220107212717005" loading="lazy"></p>
<p>接着开5k个线程并发（PS：别忘了重启微服务）</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107212747672.png" alt="image-20220107212747672" loading="lazy"></p>
<p>结果：</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107212753289.png" alt="image-20220107212753289" loading="lazy"></p>
<h3 id="全局服务降级" tabindex="-1"><a class="header-anchor" href="#全局服务降级" aria-hidden="true">#</a> 全局服务降级</h3>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107213535425.png" alt="image-20220107213535425" loading="lazy"></p>
<p>我们只需要把这个注解往80的controller上面一粘贴就行</p>
<p>如果说某个需要专有的 就单独的在@HystrixCommand写上内容即可即可 遵循就近原则</p>
<p>使用步骤：</p>
<ol>
<li>加一个全局的@DefaultProperties</li>
<li>设置全局的方法</li>
<li>给需要进行服务降级的controller加上@HystrixCommand
<ol>
<li>如果说降级服务有其他需求，则额外增加即可</li>
</ol>
</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@DefaultProperties</span><span class="token punctuation">(</span>defaultFallback <span class="token operator">=</span> <span class="token string">"defaultCallBackHandler"</span><span class="token punctuation">,</span> commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"4000"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignHystrixController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">PaymentService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token class-name">PaymentService</span> paymentService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentOk</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@HystrixCommand</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentTimeout</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/error/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentError</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">defaultCallBackHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"你的网络有问题，不是服务器有问题"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107214515555.png" alt="image-20220107214515555" loading="lazy"></p>
<p>然后开并发，并单独开一个请求</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107214506708.png" alt="image-20220107214506708" loading="lazy"></p>
<h3 id="使用更优雅的通配进行服务降级" tabindex="-1"><a class="header-anchor" href="#使用更优雅的通配进行服务降级" aria-hidden="true">#</a> 使用更优雅的通配进行服务降级</h3>
<p>我们直接在80的controller上面加太容易导致混乱了。。。而且耦合程度过高</p>
<p>正常来说 确实是应该给每一个方法配置对应的fallback，但是不应该再controller处</p>
<p>假设：客户端去调用服务端，碰上服务端全部宕机或者关闭了，难不成全部都这样做吗..</p>
<p>我们以后工作无非就是三个异常</p>
<ul>
<li>运行</li>
<li>超时</li>
<li>宕机</li>
</ul>
<p>前面两个我们之前都解决了，接下来解决宕机</p>
<p>还记得之前我们配置过的service吗</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107214836543.png" alt="image-20220107214836543" loading="lazy"></p>
<p>是不是可以对这个接口的微服务进行统一的处理，而不是在controller内处理呢？</p>
<p>当然是可以的</p>
<p>先看看这个service</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span><span class="token string">"consul-provider-payment"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentOk</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentTimeout</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/error/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentError</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>这个其实用到了<strong>Feign</strong></p>
<p>我们现在配置中开启下（注意 这里是3.0之后的，3.0之前的网上教程一大堆）</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">circuitbreaker</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span>
        <span class="token key atrule">connectTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token key atrule">readTimeout</span><span class="token punctuation">:</span> <span class="token number">4000</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>做到这一步的时候一定要确保你的man方法内有一个玩意：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableHystrix</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignHystrixConsumer80Application</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">FeignHystrixConsumer80Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>我就是不知道咋删了然后忘记加 导致找了办个小时的bug</p>
<p>接着，我们有两个选择</p>
<blockquote>
<p>写一个类，实现我们的service接口</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentFallBackService</span> <span class="token keyword">implements</span> <span class="token class-name">PaymentService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentOk</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"=====PaymentFallBackService===>paymentOk===>Error"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentTimeout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"=====PaymentFallBackService===>paymentTimeout===>Error"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentError</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"=====PaymentFallBackService===>paymentError===>Error"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><blockquote>
<p>或者写一个类，实现<code>FallbackFactory&lt;T&gt;</code>接口，个人更推荐这样</p>
<p>上面那样的话我们就相当于有两个PaymentService的Bean，就需要具名调用</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyFallbackFactory</span> <span class="token keyword">implements</span> <span class="token class-name">FallbackFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PaymentService</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">PaymentService</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> cause<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PaymentFallBackService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PaymentFallBackService</span> <span class="token keyword">implements</span> <span class="token class-name">PaymentService</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentOk</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">"=====PaymentFallBackService===>paymentOk===>Error"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentTimeout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">"=====PaymentFallBackService===>paymentTimeout===>Error"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentError</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">"=====PaymentFallBackService===>paymentError===>Error"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>接着，回到我们的service，加上一个fallbackFactory属性即可（如果你是直接 implements PaymentService，那这里就换成<code>fallback=PaymentFallBackService.class</code>即可）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"consul-provider-payment"</span><span class="token punctuation">,</span>fallbackFactory <span class="token operator">=</span> <span class="token class-name">MyFallbackFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentOk</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentTimeout</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/error/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentError</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>写在controller类内部的处理，并加上默认或者指定降级处理。<strong>如果存在一个继承service的降级处理，他处理的是客户端自身的异常</strong></p>
<p><strong>他们俩都能处理服务端异常，但是如果都存在，则service优先处理服务端出现的异常。</strong></p>
<p><strong>官方是通过实现<code>FallbackFactory&lt;T&gt;</code>接口通过匿名内部类实现兜底方案</strong></p>
<p>接下来测试：</p>
<p>当我们两个服务都完好无损时</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107232320047.png" alt="image-20220107232320047" loading="lazy"></p>
<p>请求结果正常</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107232330963.png" alt="image-20220107232330963" loading="lazy"></p>
<p>当我们的8001挂掉时</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107232344486.png" alt="image-20220107232344486" loading="lazy"></p>
<p>返回了我们的fallback工厂内的东西</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107232359906.png" alt="image-20220107232359906" loading="lazy"></p>
<h2 id="服务熔断-1" tabindex="-1"><a class="header-anchor" href="#服务熔断-1" aria-hidden="true">#</a> 服务熔断</h2>
<h3 id="基本概念-重要" tabindex="-1"><a class="header-anchor" href="#基本概念-重要" aria-hidden="true">#</a> 基本概念（重要）</h3>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107232855289.png" alt="image-20220107232855289" loading="lazy"></p>
<ol>
<li>调用失败会触发降级，而降级会调用fallback方法</li>
<li>但无论如何降级的流程一定会先调用正常方法再调用fallback方法</li>
<li>假如单位时间内调用失败次数过多，也就是降级次数过多，则触发熔断</li>
<li>熔断以后就会跳过正常方法直接调用fallback方法</li>
<li>所谓“熔断后服务不可用”就是因为跳过了正常方法直接执行fallback</li>
</ol>
<p>记住这六点，面试应该会问</p>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>我们现在有一个简单的controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/ok/{id}"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"idErrorHandler"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"id不能为负数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentOk</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">idErrorHandler</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"id不能为负数"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>这个时候我们传入一个异常的数值</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107234143634.png" alt="image-20220107234143634" loading="lazy"></p>
<p>是正常的</p>
<p>接下来我们加上服务熔断</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/ok/{id}"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"idErrorHandler"</span><span class="token punctuation">,</span>commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.enabled"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// 是否开启断路器</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.requestVolumeThreshold"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"10"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 请求次数</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.sleepWindowInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"10000"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 时间窗口期</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.errorThresholdPercentage"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"60"</span><span class="token punctuation">)</span> <span class="token comment">// 失败率达到多少后跳闸</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"id不能为负数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentOk</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">idErrorHandler</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"id不能为负数"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>我们额外增加的@HystrixProperty的意思是：在10秒内(10000毫秒)，十次访问，失败率达到60%，就跳闸限电</p>
<p>拉闸限电后这10秒内的其他所有请求都会直接跳转到我们的<code>idErrorHandler</code>方法，10秒后恢复，重头开始</p>
<p>官网上的说明</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107235303403.png" alt="image-20220107235303403" loading="lazy"></p>
<p>可以看一下HystrixPropertiesManager这个类  里面包含了所有的 限制类型</p>
<p>以及 这玩意有默认配置的，如果我们加了@HystrixCommand注解但是没有其他任何内容（除了callback），那么默认调用的是这个HystrixCommandProperties类的玩意</p>
<p>可以看到这个类内有非常多的配置项，包括我们之前的超时时间</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220107235803670.png" alt="image-20220107235803670" loading="lazy"></p>
<p>这个超时时间默认是1s</p>
<p>为了验证熔断是否成功，我们再次改动一下代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/ok/{id}"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"idErrorHandler"</span><span class="token punctuation">,</span>commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.enabled"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// 是否开启断路器</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.requestVolumeThreshold"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"10"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 请求次数</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.sleepWindowInMilliseconds"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"10000"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 时间窗口期</span>
    <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.errorThresholdPercentage"</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">"60"</span><span class="token punctuation">)</span> <span class="token comment">// 失败率达到多少后跳闸</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ok</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"正常的方法被调用了红红火火恍恍惚惚哈哈哈哈哈哈哈哈"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"id不能为负数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> paymentService<span class="token punctuation">.</span><span class="token function">paymentOk</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">idErrorHandler</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"熔断的方法被调用了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">"id不能为负数"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>接下来开一百个线程试试</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220108000043391.png" alt="image-20220108000043391" loading="lazy"></p>
<p>这一百个有问题的线程执行完毕之后我立刻执行一次没有问题的get请求</p>
<p>然后没有问题的请求也返回了奇怪的值</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220108000944973.png" alt="image-20220108000944973" loading="lazy"></p>
<p>过了一会儿正确的值再次访问</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220108001023508.png" alt="image-20220108001023508" loading="lazy"></p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220108001629301.png" alt="image-20220108001629301" loading="lazy"></p>
<h2 id="服务限流-1" tabindex="-1"><a class="header-anchor" href="#服务限流-1" aria-hidden="true">#</a> 服务限流</h2>
<p>这个之后阿里巴巴再说，毕竟这个玩意已经过时了</p>
<h2 id="服务监控仪表盘" tabindex="-1"><a class="header-anchor" href="#服务监控仪表盘" aria-hidden="true">#</a> 服务监控仪表盘</h2>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220108002802786.png" alt="image-20220108002802786" loading="lazy"></p>
<h3 id="搭建" tabindex="-1"><a class="header-anchor" href="#搭建" aria-hidden="true">#</a> 搭建</h3>
<p>我们创建一个module并cloud-cosumer-hystrix-dashboard-9001并添加如下依赖</p>
<p>主要就是第一个</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-hystrix --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix-dashboard<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.10.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-consul-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
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
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>然后配置文件依旧</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#端口号</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>cosumer<span class="token punctuation">-</span>hystrix<span class="token punctuation">-</span>dashboard
  <span class="token comment"># consul注册中心地址</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
<span class="token comment">#        hostname: 127.0.0.1</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>接着main</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableHystrixDashboard</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HystrixDashboard9001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">HystrixDashboard9001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>注意 所有要被监控的服务，都需要有</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这个依赖，否则监控不了</p>
<p>接下来我们访问<a href="http://localhost:9001/hystrix" target="_blank" rel="noopener noreferrer">http://localhost:9001/hystrix<ExternalLinkIcon/></a></p>
<p>如果出现如下页面，表示启动成功</p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220108003635296.png" alt="image-20220108003635296" loading="lazy"></p>
<h3 id="使用-1" tabindex="-1"><a class="header-anchor" href="#使用-1" aria-hidden="true">#</a> 使用</h3>
<p>我们要在被监控的服务端的主启动类上额外添加一个配置，比如8001</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableHystrix</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProviderConsul8001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ProviderConsul8001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 这个玩意是为了服务监控而配置
     * 和服务容错本身无关，SpringCLoud升级后的坑
     * ServletRegistrationBean因为springboot的默认路径不是/hystrix.stream
     * 所以要自己配置
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ServletRegistrationBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HystrixMetricsStreamServlet</span><span class="token punctuation">></span></span> <span class="token function">getServlet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HystrixMetricsStreamServlet</span> hystrixMetricsStreamServlet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HystrixMetricsStreamServlet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ServletRegistrationBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HystrixMetricsStreamServlet</span><span class="token punctuation">></span></span> hystrBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServletRegistrationBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>hystrixMetricsStreamServlet<span class="token punctuation">)</span><span class="token punctuation">;</span>
        hystrBean<span class="token punctuation">.</span><span class="token function">setLoadOnStartup</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        hystrBean<span class="token punctuation">.</span><span class="token function">addUrlMappings</span><span class="token punctuation">(</span><span class="token string">"/hystrix.stream"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        hystrBean<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"HystrixMetricsStreamServlet"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> hystrBean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>management: enabled: false endpoints:  web:  exposure:  include: hystrix.stream       base-path: /</p>
<p>出错的在9001配置文件加上hystrix:   dashboard:     proxy-stream-allow-list: &quot;*&quot;</p>
<p>接着访问即可，在<a href="http://localhost:9001/hystrix" target="_blank" rel="noopener noreferrer">http://localhost:9001/hystrix<ExternalLinkIcon/></a>内输入<a href="http://localhost:8001/hystrix.stream" target="_blank" rel="noopener noreferrer">http://localhost:8001/hystrix.stream<ExternalLinkIcon/></a></p>
<p><img src="/images/SpringCloud/07-Hystrix服务降级/image-20220108004425099.png" alt="image-20220108004425099" loading="lazy"></p>
<p>…这玩意貌似坑还不少 算了 没必要用。。真用上了去看看<a href="https://www.bilibili.com/video/BV18E411x7eT?p=64&amp;spm_id_from=pageDriver" target="_blank" rel="noopener noreferrer">视频<ExternalLinkIcon/></a></p>
</template>
