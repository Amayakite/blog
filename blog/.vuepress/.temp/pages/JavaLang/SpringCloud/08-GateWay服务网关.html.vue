<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>其实本来应该学下Zuul的，但是那玩意分歧比较大（Zuul和Zuul2杂七杂八的瓜）</p>
<p>反正GateWay是它的替代品</p>
<p>Zuul的网站<a href="https://github.com/Netflix/zuul/wiki" target="_blank" rel="noopener noreferrer">https://github.com/Netflix/zuul/wiki<ExternalLinkIcon/></a></p>
<p>GateWay的网站<a href="https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/" target="_blank" rel="noopener noreferrer">https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/<ExternalLinkIcon/></a></p>
<p>Spring Cloud全家桶中有个很重要的组件就是网关，在1.x版本中使用的都是Zuul网关</p>
<p>但在2.x版本中，Zuul的升级一直跳票，SpringCloud最后自己研发了一个网关替代Zuul</p>
<p>也就是 Spring Cloud Gateway 一句话：gateway就是原zuul1.x版本的替代（貌似现在Zuul2.x出了 有机会可以去了解下）</p>
<p>Spring Cloud Gateway 是基于Webflux框架实现的，而WebFlux框架底层则使用了高性能的Reactor模式通信框架Netty</p>
<p>PS：Netty也是一个蛮牛逼的东西，以后要去了解下，好像老韩讲过这类的课程（主要是这个Netty非常抽象，我们一般都是用现成的）</p>
<p>它能做啥？</p>
<ul>
<li>反向代理</li>
<li>鉴权</li>
<li>流量控制</li>
<li>熔断</li>
<li>日志监控</li>
</ul>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108125324893.png" alt="image-20220108125324893" loading="lazy"></p>
<p>网关是所有微服务的入口</p>
<p>Spring Cloud Gateway具有以下特性</p>
<ol>
<li>基于Spring FrameWork 5、Project Reactor 和 Spring Boot 2.0进行重构</li>
<li>动态路由：能够匹配任何请求属性</li>
<li>可以对路由指定Predicate(断言)和Filter(过滤器)</li>
<li>集成Hystrix的断路器功能</li>
<li>集成Spring Cloud服务发现功能</li>
<li>易于编写的Predicate(断言)和Filter(过滤器)</li>
<li>请求限流功能</li>
<li>支持路径重写</li>
</ol>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108125859245.png" alt="image-20220108125859245" loading="lazy"></p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108130508461.png" alt="image-20220108130508461" loading="lazy"></p>
<h2 id="gateway的三大核心概念" tabindex="-1"><a class="header-anchor" href="#gateway的三大核心概念" aria-hidden="true">#</a> Gateway的三大核心概念</h2>
<h3 id="路由route" tabindex="-1"><a class="header-anchor" href="#路由route" aria-hidden="true">#</a> 路由Route</h3>
<p>构建网关的基本模块，它由ID，目标URL，一系列的断言和过滤器组成，如果断言为true，则表示匹配该路由</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108130822519.png" alt="image-20220108130822519" loading="lazy"></p>
<h3 id="断言predicate" tabindex="-1"><a class="header-anchor" href="#断言predicate" aria-hidden="true">#</a> 断言Predicate</h3>
<p>参考Java8的<code>java.util.function.Predicate</code></p>
<p>开发人员可以匹配HTTP请求中的所有内容（例如请求头或请求参数），如果请求与断言匹配则进行路由</p>
<h3 id="过滤filter" tabindex="-1"><a class="header-anchor" href="#过滤filter" aria-hidden="true">#</a> 过滤Filter</h3>
<p>指的是Spring框架中的GatewayFilter的实例，使用过滤器，可在请求路由前后对请求进行修改</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108134245168.png" alt="image-20220108134245168" loading="lazy"></p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108134429435.png" alt="image-20220108134429435" loading="lazy"></p>
<p>就有点像是SpringSecurity那样</p>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<h3 id="gateway9527的搭建" tabindex="-1"><a class="header-anchor" href="#gateway9527的搭建" aria-hidden="true">#</a> Gateway9527的搭建</h3>
<p>依赖， 注意 没有web和actuator 这玩意不需要</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-gateway<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-consul-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#端口号</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9527</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway
  <span class="token comment"># consul注册中心地址</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
<span class="token comment">#        hostname: 127.0.0.1</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>然后主启动类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CloudGateway9527Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">CloudGateway9527Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="router路由" tabindex="-1"><a class="header-anchor" href="#router路由" aria-hidden="true">#</a> Router路由</h2>
<h3 id="配置route" tabindex="-1"><a class="header-anchor" href="#配置route" aria-hidden="true">#</a> 配置Route</h3>
<p>我现在的8001有如下的controller</p>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>我想在8001外面再套一层9527，可能你这个时候会想，为什么不用Nginx，那玩意不是也可以做到吗？</p>
<p>Gateway和Nginx的区别就是：Nginx是对外网关，GateWay是对内网关</p>
<p>我们要使用route也非常简单，就像是Vue那样</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#端口号</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9527</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway
  <span class="token comment"># consul注册中心地址</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
    <span class="token comment">#        hostname: 127.0.0.1</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
    <span class="token comment"># 注册route</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
          <span class="token comment"># 路由的ID，没有固定规则但要求唯一，一般来说都是配合服务名称定义</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route1
          <span class="token comment"># 匹配后提供服务的路由地址 注意这里是uri别写成url了</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8001</span>
          <span class="token comment"># 断言 路径相匹配进行路由</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/ok/<span class="token important">**</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route2
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8001</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/timeout/<span class="token important">**</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route3
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8001</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/error/<span class="token important">**</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="启动并测试" tabindex="-1"><a class="header-anchor" href="#启动并测试" aria-hidden="true">#</a> 启动并测试</h3>
<p>如果你之前没有移除web和actuator这连个依赖，Gateway在启动的时候将会报错</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108140811736.png" alt="image-20220108140811736" loading="lazy"></p>
<p>我这里用的是consul，所以外部启动，然后依次启动两个服务即可</p>
<p>接着你可以看到9527这里标了一把×，这个不用管，是因为它更不提供服务导致的，它只有服务转发</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108141422980.png" alt="image-20220108141422980" loading="lazy"></p>
<p>接着我们get 8001 <a href="http://localhost:8001/payment/hystrix/ok/1" target="_blank" rel="noopener noreferrer">http://localhost:8001/payment/hystrix/ok/1<ExternalLinkIcon/></a></p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108141456256.png" alt="image-20220108141456256" loading="lazy"></p>
<p>没问题</p>
<p>那么换成9527呢？ <a href="http://localhost:9527/payment/hystrix/ok/1" target="_blank" rel="noopener noreferrer">http://localhost:9527/payment/hystrix/ok/1<ExternalLinkIcon/></a></p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108141515201.png" alt="image-20220108141515201" loading="lazy"></p>
<p>依旧没问题</p>
<p>并且无论是error</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108141615360.png" alt="image-20220108141615360" loading="lazy"></p>
<p>或者是timeout</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108141629093.png" alt="image-20220108141629093" loading="lazy"></p>
<p>都可以直接通过9527进行访问</p>
<h3 id="关于yaml的说明" tabindex="-1"><a class="header-anchor" href="#关于yaml的说明" aria-hidden="true">#</a> 关于YAML的说明</h3>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108141751711.png" alt="image-20220108141751711" loading="lazy"></p>
<p>接下来尝试一下给8001添加一个路由</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/test"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"ls"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">ls</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\n8001\n"</span> <span class="token operator">+</span> <span class="token string">"hello world"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>然后我们同理在9527内进行配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
          <span class="token comment"># 路由的ID，没有固定规则但要求唯一，一般来说都是配合服务名称定义</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route1
          <span class="token comment"># 匹配后提供服务的路由地址 注意这里是uri别写成url了</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8001</span>
          <span class="token comment"># 断言 路径相匹配进行路由</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/ok/<span class="token important">**</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route2
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8001</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/timeout/<span class="token important">**</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route3
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8001</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/error/<span class="token important">**</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_test_ls
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8001</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
             <span class="token punctuation">-</span> Path=/test/ls
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>然后重启这两位，访问下9527</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108142221668.png" alt="image-20220108142221668" loading="lazy"></p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108151632842.png" alt="image-20220108151632842" loading="lazy"></p>
<p>依旧是成功的</p>
<p>用人话来概括就是：9527是唐伯虎点秋香中，星爷的下人编号</p>
<h3 id="gateway的router的第二种方式-bean" tabindex="-1"><a class="header-anchor" href="#gateway的router的第二种方式-bean" aria-hidden="true">#</a> GateWay的Router的第二种方式-Bean</h3>
<p>我们除了像之前那样在yaml中进行配置，还可以通过在代码中注入RouteLocator的bean来进行配置(不过有点恶心)</p>
<p>它通过bean来配置的话，和Angular的路由配置书写风格很像</p>
<p>我们现在换一种方式吧，通过9527，访问到<a href="http://news.baidu.com/guonei" target="_blank" rel="noopener noreferrer">百度新闻<ExternalLinkIcon/></a>的地址，就像是在Nginx中做的那样，又或者通过它，跳转到bilibili的<a href="https://bilibili.com/anime" target="_blank" rel="noopener noreferrer">番剧区<ExternalLinkIcon/></a></p>
<p>其实配置还是比较友好的，整体来说</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GateWayConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RouteLocator</span> <span class="token function">routes</span><span class="token punctuation">(</span><span class="token class-name">RouteLocatorBuilder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RouteLocatorBuilder<span class="token punctuation">.</span>Builder</span> routes <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        routes<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">"baidu_new_guonei"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PredicateSpec</span><span class="token punctuation">,</span> <span class="token class-name">Buildable</span><span class="token punctuation">&lt;</span><span class="token class-name">Route</span><span class="token punctuation">></span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Buildable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Route</span><span class="token punctuation">></span></span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">PredicateSpec</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 这里的第一个参数是本地的路径 第二个参数是要最终跳转到的url</span>
                <span class="token keyword">return</span> r<span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">"/guonei"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">"http://news.baidu.com/guonei"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 上面的简写</span>
        routes<span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">"bilibili_home_page"</span><span class="token punctuation">,</span> r <span class="token operator">-></span> r<span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">"/anime"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">"https://bilibili.com/anime"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> routes<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>访问<code>/guonei</code></p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108144047808.png" alt="image-20220108144047808" loading="lazy"></p>
<p>访问<code>/anime</code></p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108144136434.png" alt="image-20220108144136434" loading="lazy"></p>
<p>这个是由于啊b的重定向导致的..</p>
<p>gateway人称小nginx也就是这么来的</p>
<h3 id="通过微服务名配置动态路由" tabindex="-1"><a class="header-anchor" href="#通过微服务名配置动态路由" aria-hidden="true">#</a> 通过微服务名配置动态路由</h3>
<p>我们想要的效果应该是这样的</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108145543353.png" alt="image-20220108145543353" loading="lazy"></p>
<p>客户端 网关 注册中心 服务端 应该是这样的</p>
<blockquote>
<p>在默认情况下， GateWay会根据注册中心注册 服务列表，以<strong>注册中心</strong>上<strong>微服务名为路径</strong>创建动态路由进行转发，从而实现动态路由功能</p>
</blockquote>
<p>我们现在在再来创建一个8002</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#端口号</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
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
        <span class="token comment"># 服务提供方1也加上对应的别名</span>
        <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> 服务提供方2

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108150830914.png" alt="image-20220108150830914" loading="lazy"></p>
<p>然后开始配置，只需要两步即可</p>
<ol>
<li>开启<code>spring.gateway,discovery.locator.enabled=true</code>
<ol>
<li>开启enable: true, 可以不用写routes, 即可通过服务名访问, 默认负载均衡为轮询方式</li>
<li>enable: true的功能:
<ul>
<li>自动以注册中心的服务名, 进行路由注册</li>
<li>则此时可以通过ip:端口/注册服务名/请求URI进行访问</li>
<li>如果设置routes的话, 则访问只需要 ip:端口/路径即可.</li>
<li>但是, 不配置routes的话, 是无法完成更复杂的断言和筛选的</li>
</ul>
</li>
</ol>
</li>
<li>将服务的url替换成以<code>lb://</code>开头（替换掉原本的<code>http://</code>）并将最终地址改成我们的服务名
<ol>
<li>uri以lb://开头（lb代表从注册中心获取服务），后面接的就是你需要转发到的服务名称</li>
<li>lb：是指路由的一种通信协议，它实现了负载均衡通信功能</li>
<li>路由方式有三种
<ul>
<li><code>ws://host:port</code>（websocket方式）</li>
<li><code>http://host:port</code>（HTTP方式）</li>
<li><code>lb://微服务名</code></li>
</ul>
</li>
</ol>
</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#端口号</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9527</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>gateway
  <span class="token comment"># consul注册中心地址</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">consul</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8500</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">service-name</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
    <span class="token comment">#        hostname: 127.0.0.1</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">locator</span><span class="token punctuation">:</span>
          <span class="token comment"># 开启从服务中心动态创建路由的功能，利用微服务名进行路由</span>
          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
          <span class="token comment"># 路由的ID，没有固定规则但要求唯一，一般来说都是配合服务名称定义</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route1
          <span class="token comment"># 把原本的http换成lb://服务名即可</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//consul<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
          <span class="token comment"># 断言 路径相匹配进行路由</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/ok/<span class="token important">**</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route2
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//consul<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/timeout/<span class="token important">**</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_route3
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//consul<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/payment/hystrix/error/<span class="token important">**</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_test_ls
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//consul<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
             <span class="token punctuation">-</span> Path=/test/ls
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>接着重启，然后尝试访问</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108151653127.png" alt="image-20220108151653127" loading="lazy"></p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108151658449.png" alt="image-20220108151658449" loading="lazy"></p>
<p>可以发现，这里是采用了轮循来进行负载均衡</p>
<h2 id="predicate断言" tabindex="-1"><a class="header-anchor" href="#predicate断言" aria-hidden="true">#</a> Predicate断言</h2>
<p>在<a href="https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/#gateway-request-predicates-factories" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>中，我们可以看到很多对应的配置</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108152655804.png" alt="image-20220108152655804" loading="lazy"></p>
<p>光看名字的话 emm前后前后然后cookie还有path之类的校验？</p>
<p>我们来看看第一个，简介内是这样说的：</p>
<blockquote>
<p>This predicate matches requests that happen after the specified datetime. The following example configures an after route predicate:</p>
<p>配置只在对应时间后发的请求才回进行处理</p>
</blockquote>
<p>然后给出了如下的内容</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> after_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> After=2017<span class="token punctuation">-</span>01<span class="token punctuation">-</span>20T17<span class="token punctuation">:</span>42<span class="token punctuation">:</span>47.789<span class="token punctuation">-</span>07<span class="token punctuation">:</span>00<span class="token punctuation">[</span>America/Denver<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>接下来根据文档得知所有断言<code>Predicate</code>的父类是<code>RoutePredicateFactory&lt;C&gt;</code>这个类，类图如下，拥有这些实现类</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108153024021.png" alt="image-20220108153024021" loading="lazy"></p>
<p>接下来简单说下使用</p>
<h3 id="常用的predicate" tabindex="-1"><a class="header-anchor" href="#常用的predicate" aria-hidden="true">#</a> 常用的Predicate</h3>
<p>我们有这些可以开箱即用</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108153228339.png" alt="image-20220108153228339" loading="lazy"></p>
<h3 id="时间断言" tabindex="-1"><a class="header-anchor" href="#时间断言" aria-hidden="true">#</a> 时间断言</h3>
<ol>
<li>在指定的时间之后访问</li>
<li>在指定的时间之前访问</li>
<li>在指定的时间段内进行访问</li>
</ol>
<p>官方文档的格式是：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> after_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token comment"># 指定的时间后才能进行访问</span>
        <span class="token punctuation">-</span> After=2017<span class="token punctuation">-</span>01<span class="token punctuation">-</span>20T17<span class="token punctuation">:</span>42<span class="token punctuation">:</span>47.789<span class="token punctuation">-</span>07<span class="token punctuation">:</span>00<span class="token punctuation">[</span>America/Denver<span class="token punctuation">]</span>
        <span class="token comment"># 指定的时间之前 才能进行访问</span>
        <span class="token punctuation">-</span> Before=2017<span class="token punctuation">-</span>01<span class="token punctuation">-</span>20T17<span class="token punctuation">:</span>42<span class="token punctuation">:</span>47.789<span class="token punctuation">-</span>07<span class="token punctuation">:</span>00<span class="token punctuation">[</span>America/Denver<span class="token punctuation">]</span>
        <span class="token comment"># 在指定的时间段内之间 才能进行访问 第一个是开始时间，第二个是结束时间</span>
        <span class="token punctuation">-</span> Between=2017<span class="token punctuation">-</span>01<span class="token punctuation">-</span>20T17<span class="token punctuation">:</span>42<span class="token punctuation">:</span>47.789<span class="token punctuation">-</span>07<span class="token punctuation">:</span>00<span class="token punctuation">[</span>America/Denver<span class="token punctuation">]</span><span class="token punctuation">,</span> 2017<span class="token punctuation">-</span>01<span class="token punctuation">-</span>21T17<span class="token punctuation">:</span>42<span class="token punctuation">:</span>47.789<span class="token punctuation">-</span>07<span class="token punctuation">:</span>00<span class="token punctuation">[</span>America/Denver<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>如果没有在指定的时间限制内进行访问，将会返回<code>404 not found</code></p>
<p>应用场景：游戏开服，秒杀开始等（一般都是做游戏开服hhh秒杀也用不上这玩意）</p>
<blockquote>
<p>然后是时间应该怎么填写的问题</p>
</blockquote>
<p>根据对时间的了解，<code>2017-01-20T17:42:47.789-07:00[America/Denver]</code>指的是西时区<code>-7:00</code>也就是西七区标识是美国丹佛，而我国是东八区<code>+8:00</code>，然后标识是中国上海，<code>PRC</code> 也可以代表 中国时区，不过一般都是用上海</p>
<p>所以只需要</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> after_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token comment"># 指定的时间后</span>
        <span class="token punctuation">-</span> After=2017<span class="token punctuation">-</span>01<span class="token punctuation">-</span>20T17<span class="token punctuation">:</span>42<span class="token punctuation">:</span>47.789+08<span class="token punctuation">:</span>00<span class="token punctuation">[</span>Asia/Shanghai<span class="token punctuation">]</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>我们也可以通过java8中的ZoneDateTime来生成</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> test <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">t1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        默认时区</span>
        <span class="token class-name">ZonedDateTime</span> now <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"默认时区："</span> <span class="token operator">+</span> now<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        指定时区上海</span>
        <span class="token class-name">ZonedDateTime</span> now1 <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"Asia/Shanghai"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"上海:Asia/Shanghai时区："</span> <span class="token operator">+</span> now1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        美国</span>
        <span class="token class-name">ZonedDateTime</span> now2 <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"America/New_York"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"美国:America/New_York时区："</span> <span class="token operator">+</span> now2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        日本</span>
        <span class="token class-name">ZonedDateTime</span> now3 <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"Asia/Tokyo"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"日本:Asia/Tokyo时区："</span> <span class="token operator">+</span> now3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        法国</span>
        <span class="token class-name">ZonedDateTime</span> now4 <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"Europe/Paris"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"法国:Europe/Paris时区："</span> <span class="token operator">+</span> now4<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        澳大利亚</span>
        <span class="token class-name">ZonedDateTime</span> now5 <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"Australia/Sydney"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"澳大利亚:Australia/Sydney时区："</span> <span class="token operator">+</span> now5<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        格林威治 属于英国伦敦，为世界标准时间，没有时区</span>
        <span class="token class-name">ZonedDateTime</span> now6 <span class="token operator">=</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token class-name">ZoneId</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">"Europe/London"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"格林威治:Europe/London时区："</span> <span class="token operator">+</span> now6<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>结果：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>默认时区：2022-01-08T15:42:57.509+08:00[Asia/Shanghai]
上海:Asia/Shanghai时区：2022-01-08T15:42:57.510+08:00[Asia/Shanghai]
美国:America/New_York时区：2022-01-08T02:42:57.512-05:00[America/New_York]
日本:Asia/Tokyo时区：2022-01-08T16:42:57.514+09:00[Asia/Tokyo]
法国:Europe/Paris时区：2022-01-08T08:42:57.515+01:00[Europe/Paris]
澳大利亚:Australia/Sydney时区：2022-01-08T18:42:57.516+11:00[Australia/Sydney]
格林威治:Europe/London时区：2022-01-08T07:42:57.517Z[Europe/London]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="cookie断言" tabindex="-1"><a class="header-anchor" href="#cookie断言" aria-hidden="true">#</a> Cookie断言</h3>
<p>语法很简单</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> cookie_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Cookie=chocolate<span class="token punctuation">,</span> ch.p
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Cookie Route Predicate需要接受两个参数</p>
<ul>
<li>一个是Cookie name</li>
<li>一个是正则表达式</li>
</ul>
<p>路由规则会通过获取对应的cookie name 值和 正则表达式去匹配，如果匹配上就去执行路由，否则不执行</p>
<p>我们现在来写一个简单的</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_test_ls
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//consul<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/test/ls
            <span class="token punctuation">-</span> Cookie=username<span class="token punctuation">,</span>zzyy
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>认证用oauth2，用token而不是cookie来做认证，当然token会实际放到headers里，但并不需要在这里做认证，请求都会通过oauth2的资源服务器(即当前服务)转发到认证服务器认证</p>
<p>接下来我们重启，并打开cmd（Powershell没有curl）或者shell进行测试</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108160241641.png" alt="image-20220108160241641" loading="lazy"></p>
<p>可以看到 当我们没有带cookie的时候 访问失败 返回404</p>
<p>带了cookie，则返回我们想要的内容</p>
<p>如果说想要正则表达式的话，切记要这样写：例如我想验证cookie的email是一个邮箱格式</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>[\w!#$%<span class="token entity named-entity" title="&amp;">&amp;amp;</span>'<span class="token italic"><span class="token punctuation">*</span><span class="token content">+/=?^_`{|}~-]+(?:\.[\w!#$%&amp;amp;'</span><span class="token punctuation">*</span></span>+/=?^_`{|}~-]+)<span class="token italic"><span class="token punctuation">*</span><span class="token content">@(?:[\w](?:[\w-]</span><span class="token punctuation">*</span></span>[\w])?\.)+<span class="token url">[<span class="token content">\w</span>](<span class="token url">?:[\w-]*[\w]</span>)</span>?
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>则这里也直接这样写就可以了，不要像在Java中使用正则表达式那样加两个<code>\</code>（YAML会自动帮我们转义）</p>
<p>也就是：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> payment_test_ls
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//consul<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/test/ls
            <span class="token punctuation">-</span> Cookie=email<span class="token punctuation">,</span>^<span class="token punctuation">[</span>a<span class="token punctuation">-</span>zA<span class="token punctuation">-</span>Z0<span class="token punctuation">-</span>9_<span class="token punctuation">-</span><span class="token punctuation">]</span>+@<span class="token punctuation">[</span>a<span class="token punctuation">-</span>zA<span class="token punctuation">-</span>Z0<span class="token punctuation">-</span>9_<span class="token punctuation">-</span><span class="token punctuation">]</span>+(\.<span class="token punctuation">[</span>a<span class="token punctuation">-</span>zA<span class="token punctuation">-</span>Z0<span class="token punctuation">-</span>9_<span class="token punctuation">-</span><span class="token punctuation">]</span>+)+$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>测试结果</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108161018403.png" alt="image-20220108161018403" loading="lazy"></p>
<p>传入错误的值：</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108161035796.png" alt="image-20220108161035796" loading="lazy"></p>
<h3 id="请求头断言" tabindex="-1"><a class="header-anchor" href="#请求头断言" aria-hidden="true">#</a> 请求头断言</h3>
<p>使用和cookie一样</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> header_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Header=X<span class="token punctuation">-</span>Request<span class="token punctuation">-</span>Id<span class="token punctuation">,</span> \d+
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>上面指的是请求头要有<code>X-Request-Id</code>并且值为整数</p>
<p>如果验证不成功，返回404</p>
<h3 id="指定的请求方法断言" tabindex="-1"><a class="header-anchor" href="#指定的请求方法断言" aria-hidden="true">#</a> 指定的请求方法断言</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> method_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token comment"># 可以是一个 可以是多个</span>
        <span class="token punctuation">-</span> Method=GET<span class="token punctuation">,</span>POST
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="指定的rest风格地址断言" tabindex="-1"><a class="header-anchor" href="#指定的rest风格地址断言" aria-hidden="true">#</a> 指定的rest风格地址断言</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> path_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Path=/red/<span class="token punctuation">{</span>segment<span class="token punctuation">}</span><span class="token punctuation">,</span>/blue/<span class="token punctuation">{</span>segment<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>这里是放在path上的，然后这里放了两个</p>
<ul>
<li>匹配<code>/red/{segment}</code></li>
<li>匹配<code>/blud/{segment}</code></li>
</ul>
<p>也可以只放一个，也可以多段的放，例如：<code>/red/{abc}/123/{aaa}</code></p>
<h3 id="指定的请求参数" tabindex="-1"><a class="header-anchor" href="#指定的请求参数" aria-hidden="true">#</a> 指定的请求参数</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> query_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Query=username<span class="token punctuation">,</span>\d+
        <span class="token punctuation">-</span> Query=password
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>这里可以为正则表达式</p>
<p>第一个参数字段</p>
<p>第二个参数值</p>
<p>如果说没有填第二个参数的话表示只要有该字段即可</p>
<h3 id="指定的ip地址-host才能访问" tabindex="-1"><a class="header-anchor" href="#指定的ip地址-host才能访问" aria-hidden="true">#</a> 指定的ip地址/Host才能访问</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> remoteaddr_route
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//example.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token comment"># ip地址 可以配置多个 可以支持通配符*</span>
        <span class="token punctuation">-</span> RemoteAddr=192.168.1.1/24<span class="token punctuation">,</span>111.11.111.*
        <span class="token comment"># 主机  可以配置多个</span>
        <span class="token punctuation">-</span> Host=<span class="token important">**.somehost.org</span><span class="token punctuation">,</span><span class="token important">**.abc.com</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>注意 remoteaddr是用户不可以自定义的，host是用户可以自定义的</p>
<h3 id="设置权重形负载均衡" tabindex="-1"><a class="header-anchor" href="#设置权重形负载均衡" aria-hidden="true">#</a> 设置权重形负载均衡</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> weight_high
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//weighthigh.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Weight=group1<span class="token punctuation">,</span> <span class="token number">8</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> weight_low
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//weightlow.org
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Weight=group1<span class="token punctuation">,</span> <span class="token number">2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Weight接收两个参数</p>
<ul>
<li>组名</li>
<li>权重值（int）</li>
</ul>
<p>组名相同的，将会按照权重值来进行分配</p>
<p>上面如果进行访问的话，百分之八十的访问会分配到<code>https://weighthigh.org</code></p>
<p>剩余百分之二十会被分配到<code> https://weightlow.org</code></p>
<h2 id="filter过滤器" tabindex="-1"><a class="header-anchor" href="#filter过滤器" aria-hidden="true">#</a> Filter过滤器</h2>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108163539594.png" alt="image-20220108163539594" loading="lazy"></p>
<p>这就像是Spring Security的过滤器那样 可以用于修改Http请求和返回的HTTP响应，路由过滤器只能只能指定路由进行使用</p>
<p>Spring Cloud Gateway内置了多种路由过滤器，他们都由GatewayFilterFactory工厂类来产生</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108163832946.png" alt="image-20220108163832946" loading="lazy"></p>
<h3 id="生命周期和种类以及内置的过滤器" tabindex="-1"><a class="header-anchor" href="#生命周期和种类以及内置的过滤器" aria-hidden="true">#</a> 生命周期和种类以及内置的过滤器</h3>
<p>有两个生命周期</p>
<ul>
<li>pre：业务逻辑之前</li>
<li>post：业务逻辑之后</li>
</ul>
<p>种类也有两种</p>
<ul>
<li>GetawayFilter当前的
<ul>
<li><a href="https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/#gatewayfilter-factories" target="_blank" rel="noopener noreferrer">https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/#gatewayfilter-factories<ExternalLinkIcon/></a></li>
<li>有三十一种内置的单一过滤器</li>
</ul>
</li>
<li>GlobalFilter全局的
<ul>
<li><a href="https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/#global-filters" target="_blank" rel="noopener noreferrer">https://docs.spring.io/spring-cloud-gateway/docs/3.0.5-SNAPSHOT/reference/html/#global-filters<ExternalLinkIcon/></a></li>
<li>近十来个全局的</li>
</ul>
</li>
</ul>
<p>草 接近41个</p>
<p>这里就不一一说明了</p>
<h3 id="自定义全局过滤器globalfilter" tabindex="-1"><a class="header-anchor" href="#自定义全局过滤器globalfilter" aria-hidden="true">#</a> 自定义全局过滤器GlobalFilter</h3>
<p>这能干啥嘞？</p>
<ul>
<li>全局日志记录</li>
<li>统一网关鉴权</li>
<li>…</li>
</ul>
<p>为啥不用自带的？</p>
<p>因为不太好使，不如自己配置来的方便一些</p>
<p>我们要使用，只需要写一个自定义类，并实现两个接口即可<code>implements GlobalFilter, Ordered</code></p>
<p>文件<code>filter/MyLogGateWayFilter.java</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyLogGateWayFilter</span> <span class="token keyword">implements</span> <span class="token class-name">GlobalFilter</span><span class="token punctuation">,</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Mono</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">ServerWebExchange</span> exchange<span class="token punctuation">,</span> <span class="token class-name">GatewayFilterChain</span> chain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        获取ip地址</span>
        <span class="token class-name">String</span> ip <span class="token operator">=</span> exchange<span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRemoteAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getHostAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        服务器收到了来自IP地址为xx的访问，时间为</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"服务器收到了来自IP地址为{}的访问，时间为{}"</span><span class="token punctuation">,</span> ip<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> username <span class="token operator">=</span> exchange<span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getQueryParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFirst</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户名为空,非法用户"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ServerHttpResponse</span> response <span class="token operator">=</span> exchange<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            response<span class="token punctuation">.</span><span class="token function">setStatusCode</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span>NOT_ACCEPTABLE<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> exchange<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> chain<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>exchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 加载过滤器的顺序，数值越小，优先级越高
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span>MIN_VALUE<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>这样就可以了 接着我们重启下服务，然后尝试访问</p>
<ul>
<li>不带参数：</li>
</ul>
<p>服务端日志为：</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108170828570.png" alt="image-20220108170828570" loading="lazy"></p>
<p>客户端响应为：</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108170742279.png" alt="image-20220108170742279" loading="lazy"></p>
<p>带上我们指定的参数：</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108170856987.png" alt="image-20220108170856987" loading="lazy"></p>
<p>客户端成功获取</p>
<p><img src="/images/SpringCloud/08-GateWay服务网关/image-20220108170906434.png" alt="image-20220108170906434" loading="lazy"></p>
<p>服务端成功打印</p>
</template>
