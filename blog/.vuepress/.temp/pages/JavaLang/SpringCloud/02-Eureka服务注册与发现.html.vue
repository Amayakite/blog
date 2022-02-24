<template><h2 id="什么是服务治理" tabindex="-1"><a class="header-anchor" href="#什么是服务治理" aria-hidden="true">#</a> 什么是服务治理</h2>
<p>SpringCloud封装了Netfix公司开发的Eureka来实现服务治理</p>
<p>在传统的RPC远程调用框架内，管理每个服务与服务之间的依赖关系比较复杂，管理比较复杂，所以需要使用服务治理，管理服务与服务之间的依赖关系，可以实现服务调用，负载均衡，容错等，实现服务发现与注册</p>
<p>说穿了就是，N多个消费者和N多个服务提供者，你找我我找你的非常麻烦，我们需要管理机制来实现服务治理</p>
<p>Eureka用了CS的设计架构，Eureka Server作为服务注册功能的服务器</p>
<p>它是服务注册中心，而系统中的其他微服务，使用Eureka的客户端连接到Eureka Server并维持心跳连接，这样的系统维护人员可以通过Eureka Server来监控系统中各个微服务是否正常运行</p>
<p>在服务注册与发现中，有一个注册中心，当服务器启动的时候，会把自己的服务器信息，例如 服务器通讯地址等信息以别名的方式注册到注册中心上，另一方（消费者、服务提供者）以改别名的方式去注册中心上获取到实际的服务通讯地址，然后再实现本地RPC远程调用框架核心设计思想，在于注册中心，因为使用注册中心管理每个服务与服务之间的一个依赖关系（服务治理概念），在任何RPC远程框架中，都会有一个注册中心（存放服务地址相关的信息（接口地址））</p>
<p>下图中，左边是Eureka右边是Dubbo</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103194544734.png" alt="image-20220103194544734" loading="lazy"></p>
<p>Eureka包含两个组件：Eureka Server 和 Eureka Client</p>
<p>Eureka Server提供服务注册服务</p>
<p>各个微服务节点通过配置启动后，会在EurekaServer中进行注册，这样EurekaServer中的服务注册中心表中会将存储所有可用节点的信息，服务节点的信息可以在界面中直观的看到</p>
<p>EurekaClient通过注册中心进行访问</p>
<p>是一个Java客户端，用于简化Eureka Server的交互</p>
<p>客户端同时也是一个内置的，使用轮循负载算法的负载均衡器</p>
<p>在应用启动后，将会向Eureka Server发送心跳（默认周期为30S）</p>
<p>如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，它将会从服务注册表中把这个服务节点移除（默认90s）</p>
<h2 id="单机eureka构建步骤" tabindex="-1"><a class="header-anchor" href="#单机eureka构建步骤" aria-hidden="true">#</a> 单机Eureka构建步骤</h2>
<h3 id="创建工程并添加依赖" tabindex="-1"><a class="header-anchor" href="#创建工程并添加依赖" aria-hidden="true">#</a> 创建工程并添加依赖</h3>
<p>我这里由于之前的commons用了那啥mybatis plus 然后这里用上了 所以不知道咋回事得配置下数据库</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.7.18<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.fasterxml.jackson.core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jackson-annotations<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus-annotation<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.4.3.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h3 id="配置spring-boot" tabindex="-1"><a class="header-anchor" href="#配置spring-boot" aria-hidden="true">#</a> 配置spring boot</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7001</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token comment">#eureka服务端的实例名称 注意 是名称</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> localhost
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否要将自己注册进Eureka的服务中</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token comment"># 下面这false表示自己就是服务中心，指责就是维护实例，并不需要去检索服务</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment"># 设置和Eureka Server交互的地址，查询服务和注册中心服务都需要依赖这个地址</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> <span class="token string">"http://${eureka.instance.hostname}:${server.port}/eureka/"</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="启动并测试" tabindex="-1"><a class="header-anchor" href="#启动并测试" aria-hidden="true">#</a> 启动并测试</h3>
<p>启动：</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103211210821.png" alt="image-20220103211210821" loading="lazy"></p>
<p>访问<a href="http://localhost:7001" target="_blank" rel="noopener noreferrer">http://localhost:7001<ExternalLinkIcon/></a></p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103211119857.png" alt="image-20220103211119857" loading="lazy"></p>
<p>发现这个表示成功了</p>
<p>他这里最上面 是空 表示没有服务注册进来</p>
<h2 id="将8001注册到7001内" tabindex="-1"><a class="header-anchor" href="#将8001注册到7001内" aria-hidden="true">#</a> 将8001注册到7001内</h2>
<h3 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖" aria-hidden="true">#</a> 添加依赖</h3>
<p>之前7001是用了server 所以8001被注册的节点用client即可</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>md 注意 这玩意安装完后 一定要点下Maven的clean 找bug找了我十来分钟 结果发现clear一下就好了</p>
<h3 id="配置application" tabindex="-1"><a class="header-anchor" href="#配置application" aria-hidden="true">#</a> 配置application</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 更该端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8001</span>
<span class="token comment"># 开个debug</span>
<span class="token key atrule">logging.level.com.Project</span><span class="token punctuation">:</span> debug
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment">#  应用名称</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment<span class="token punctuation">-</span><span class="token number">8001</span>
  <span class="token comment">#  数据库相关配置</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>


<span class="token key atrule">mybatis-plus</span><span class="token punctuation">:</span>
  <span class="token comment">#  扫mapper.xml</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"classpath*:/mapper/**/*.xml"</span> <span class="token punctuation">]</span>
<span class="token key atrule">springfox</span><span class="token punctuation">:</span>
  <span class="token key atrule">documentation</span><span class="token punctuation">:</span>
    <span class="token key atrule">swagger-ui</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka



</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h3 id="启动并测试-1" tabindex="-1"><a class="header-anchor" href="#启动并测试-1" aria-hidden="true">#</a> 启动并测试</h3>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103212821967.png" alt="image-20220103212821967" loading="lazy"></p>
<p>我们现在8001 和 7001 都是启动着的</p>
<p>然后去服务那看看</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103212847551.png" alt="image-20220103212847551" loading="lazy"></p>
<p>然后在application内 可以看到我们的服务</p>
<p>这个名字<strong>CLOUD-PROVIDER-PAYMENT-8001</strong>就是我们之前在application内配置的</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103212946772.png" alt="image-20220103212946772" loading="lazy"></p>
<p>至于**EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE.**这个是Eureka的自我保护机制 之后会说明</p>
<h2 id="将80注册到7001" tabindex="-1"><a class="header-anchor" href="#将80注册到7001" aria-hidden="true">#</a> 将80注册到7001</h2>
<p>依旧是老一套</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>order<span class="token punctuation">-</span><span class="token number">80</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>启动类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableEurekaClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CloudConsumerOrder80Application</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">CloudConsumerOrder80Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>启动成功后可以看到它也被注册进入了</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103213703370.png" alt="image-20220103213703370" loading="lazy"></p>
<h2 id="eureka集群" tabindex="-1"><a class="header-anchor" href="#eureka集群" aria-hidden="true">#</a> Eureka集群</h2>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103214710700.png" alt="image-20220103214710700" loading="lazy"></p>
<p>秉持着万物皆可集群的原则。。。。</p>
<p>Eureka也可以做集群</p>
<p>它的集群简单来说就是互相注册下</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103215131853.png" alt="image-20220103215131853" loading="lazy"></p>
<p>如果有三个，则：</p>
<ul>
<li>1指向2,3</li>
<li>2指向3,1</li>
<li>3指向1,2</li>
</ul>
<p>其余同理 反正各自都需要给对方注册自己</p>
<h3 id="创建7002" tabindex="-1"><a class="header-anchor" href="#创建7002" aria-hidden="true">#</a> 创建7002</h3>
<p>跟之前一样 依赖如下</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-eureka-server --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-eureka-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.amayakite<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>cloud-api-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
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
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h3 id="修改配置并启动" tabindex="-1"><a class="header-anchor" href="#修改配置并启动" aria-hidden="true">#</a> 修改配置并启动</h3>
<p>这个跟单机的不一样</p>
<p>之前我们是这样配置的</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7001</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token comment">#eureka服务端的实例名称 注意 是名称</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> localhost
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否要将自己注册进Eureka的服务中</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token comment"># 下面这false表示自己就是服务中心，指责就是维护实例，并不需要去检索服务</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment"># 设置和Eureka Server交互的地址，查询服务和注册中心服务都需要依赖这个地址</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> <span class="token string">"http://${eureka.instance.hostname}:${server.port}/eureka/"</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>首先是名字 然后是defaultZone需要修改</p>
<p>我们先把7001的修改下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7001</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token comment">#eureka服务端的实例名称</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server<span class="token punctuation">-</span><span class="token number">7001</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否要将自己注册进Eureka的服务中</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token comment"># 下面这false表示自己就是服务中心，指责就是维护实例，并不需要去检索服务</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment"># 设置和Eureka Server交互的地址，查询服务和注册中心服务都需要依赖这个地址</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> <span class="token string">"http://127.0.0.1:7002/eureka/"</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>注意 链接要配置成7002的</p>
<p>然后7002的同理</p>
<p>然后给7002加一个启动类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableEurekaServer</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EurekaMain7002Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">EurekaMain7002Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>接着依次启动这两个家伙</p>
<p>看看7001</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103220849634.png" alt="image-20220103220849634" loading="lazy"></p>
<p>他之中有一个链接指向7002</p>
<p>再去看看7002</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103220915532.png" alt="image-20220103220915532" loading="lazy"></p>
<p>他之中也有个链接指向7001</p>
<p>这样就搭建好了</p>
<p>当然 感觉这样不好看的可以自己手动修改下电脑的hosts</p>
<p>将127.0.0.1 指向 www.eureka-7001.com 另外一个同理</p>
<p>127.0.0.1—&gt;www.rereka-7002.com</p>
<h3 id="将80服务和8001服务分别注册进进群eureka集群内" tabindex="-1"><a class="header-anchor" href="#将80服务和8001服务分别注册进进群eureka集群内" aria-hidden="true">#</a> 将80服务和8001服务分别注册进进群Eureka集群内</h3>
<p>非常简单</p>
<p>但是 在启动这两个之前 一定要选先启动集群 不然我们的服务一定会报错</p>
<p>先是80，然后8001同理</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7002/eureka
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>order<span class="token punctuation">-</span><span class="token number">80</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>用逗号分开即可 是不是很简单</p>
<p>8001</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 更该端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8001</span>
<span class="token comment"># 开个debug</span>
<span class="token key atrule">logging.level.com.Project</span><span class="token punctuation">:</span> debug
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment">#  应用名称</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment<span class="token punctuation">-</span><span class="token number">8001</span>
  <span class="token comment">#  数据库相关配置</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>


<span class="token key atrule">mybatis-plus</span><span class="token punctuation">:</span>
  <span class="token comment">#  扫mapper.xml</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"classpath*:/mapper/**/*.xml"</span> <span class="token punctuation">]</span>
<span class="token key atrule">springfox</span><span class="token punctuation">:</span>
  <span class="token key atrule">documentation</span><span class="token punctuation">:</span>
    <span class="token key atrule">swagger-ui</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7002/eureka
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>接着启动</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103222059740.png" alt="image-20220103222059740" loading="lazy"></p>
<p>7001成功注册了</p>
<p>接下来看看7002</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103222132429.png" alt="image-20220103222132429" loading="lazy"></p>
<p>依旧是成功</p>
<h2 id="支付微服务-8001-集群设置" tabindex="-1"><a class="header-anchor" href="#支付微服务-8001-集群设置" aria-hidden="true">#</a> 支付微服务（8001）集群设置</h2>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103222342194.png" alt="image-20220103222342194" loading="lazy"></p>
<p>对，Java也可以集群</p>
<p>万物皆可集群</p>
<p>Java 程序集群 可不就是启动多个</p>
<p>所以我们全部都重8001复制过来 然后改个名字 改下yanl即可</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103223546321.png" alt="image-20220103223546321" loading="lazy"></p>
<p>先尝试简单 弄一下 这样应不对</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 更该端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token comment"># 开个debug</span>
<span class="token key atrule">logging.level.com.Project</span><span class="token punctuation">:</span> debug
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment">#  应用名称</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment<span class="token punctuation">-</span><span class="token number">8002</span>
  <span class="token comment">#  数据库相关配置</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>


<span class="token key atrule">mybatis-plus</span><span class="token punctuation">:</span>
  <span class="token comment">#  扫mapper.xml</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"classpath*:/mapper/**/*.xml"</span> <span class="token punctuation">]</span>
<span class="token key atrule">springfox</span><span class="token punctuation">:</span>
  <span class="token key atrule">documentation</span><span class="token punctuation">:</span>
    <span class="token key atrule">swagger-ui</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7002/eureka



</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>结果是这样的</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103223638609.png" alt="image-20220103223638609" loading="lazy"></p>
<p>这就不对了 我们应该是要同一个名字 然后有两个微服务</p>
<p>所以得变动两个微服务</p>
<h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3>
<p>Java程序的集群，应该是这样的：即使在不同的服务器，不同的端口上运行</p>
<p>服务名都应该是一样的 唯一有区别的可能只有 端口 和服务器</p>
<p>所以我们只需要给他们相同的应用名称 然后给予不同的端口即可</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 更该端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8001</span>
<span class="token comment"># 开个debug</span>
<span class="token key atrule">logging.level.com.Project</span><span class="token punctuation">:</span> debug
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment">#  应用名称</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
  <span class="token comment">#  数据库相关配置</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>


<span class="token key atrule">mybatis-plus</span><span class="token punctuation">:</span>
  <span class="token comment">#  扫mapper.xml</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"classpath*:/mapper/**/*.xml"</span> <span class="token punctuation">]</span>
<span class="token key atrule">springfox</span><span class="token punctuation">:</span>
  <span class="token key atrule">documentation</span><span class="token punctuation">:</span>
    <span class="token key atrule">swagger-ui</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7002/eureka
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>接着启动看看集群</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103224040514.png" alt="image-20220103224040514" loading="lazy"></p>
<p>好 变成两个了</p>
<p>也就是说 我们一个服务 可以是两个 也可以是两万个。。</p>
<h3 id="验证微服务集群" tabindex="-1"><a class="header-anchor" href="#验证微服务集群" aria-hidden="true">#</a> 验证微服务集群</h3>
<p>为了验证下是否是同一个微服务上的</p>
<p>我在他们的查询方法上 加了一个 serverport的返回值</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${server.port}"</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> serverPort<span class="token punctuation">;</span>


<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/query"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> query <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    query<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">Payment</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> paymentService<span class="token punctuation">.</span><span class="token function">getMap</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> serverPort<span class="token punctuation">,</span> paymentService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>好，现在的压力来到了我们的80</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token class-name">Payment_URL</span> <span class="token operator">=</span> <span class="token string">"http://localhost:8001"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/create/{paymentName}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"paymentName"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> paymentName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">postForObject</span><span class="token punctuation">(</span><span class="token class-name">Payment_URL</span> <span class="token operator">+</span> <span class="token string">"/payment/create/"</span> <span class="token operator">+</span> paymentName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">ResponseResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Collection</span><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">getPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        注意这个 Collection 非常重要 可以预防list和map的类型转换异常</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token class-name">Payment_URL</span> <span class="token operator">+</span> <span class="token string">"/payment/query"</span><span class="token punctuation">,</span>
<span class="token comment">//                指定是ResponseResult&lt;List&lt;Payment>>类型</span>
                <span class="token class-name">ResponseResult</span><span class="token punctuation">.</span><span class="token keyword">class</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>我们该怎么用这个微服务的地址</p>
<p>其实非产简单</p>
<p>还记得我们之前给微服务（8001 8002）设置的名称吗:<code>cloud-provider-payment</code></p>
<p>我们只需要把这玩意改成全大写的再丢进去</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token class-name">Payment_URL</span> <span class="token operator">=</span> <span class="token string">"http://CLOUD-PROVIDER-PAYMENT"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/create/{paymentName}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"paymentName"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> paymentName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">postForObject</span><span class="token punctuation">(</span><span class="token class-name">Payment_URL</span> <span class="token operator">+</span> <span class="token string">"/payment/create/"</span> <span class="token operator">+</span> paymentName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">ResponseResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Collection</span><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">getPayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        注意这个 Collection 非常重要 可以预防list和map的类型转换异常</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token class-name">Payment_URL</span> <span class="token operator">+</span> <span class="token string">"/payment/query"</span><span class="token punctuation">,</span>
<span class="token comment">//                指定是ResponseResult&lt;List&lt;Payment>>类型</span>
                <span class="token class-name">ResponseResult</span><span class="token punctuation">.</span><span class="token keyword">class</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>然后还要做一步：</p>
<p>赋予RestTemplate负载均衡的能力。。。</p>
<p>我也不知道为啥要这样 反正要在80的config内设置一下</p>
<p>说是这样加一个注解就可以让这个对象调用集群内对象就是了</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">getRestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>接着我们重启这玩个玩意 然后访问80的接口</p>
<p>因为懒 我这里用js模拟下并发请求了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> axios <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"axios"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//const { randomUUID, randomInt } = require("crypto");</span>
<span class="token comment">//let pet = "aa,18";</span>
countOne <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
countTwo <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
errorCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">run</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"http://localhost:80/consumer/payment"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>msg<span class="token operator">===</span><span class="token string">"8001"</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            countOne<span class="token operator">++</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"countOne="</span><span class="token punctuation">,</span>countOne<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            countTwo<span class="token operator">++</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"countTwo="</span><span class="token punctuation">,</span>countTwo<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">++</span>errorCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103232603375.png" alt="image-20220103232603375" loading="lazy"></p>
<p>貌似没问题 但是JS是一个单线程语言 没有锁 所以我们用万能的Java来写一个demo</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">class</span> <span class="token class-name">CloudConsumerOrder80ApplicationTests</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token class-name">Integer</span> one <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">Integer</span> two <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">ResponseResult</span> forObject <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token string">"http://CLOUD-PROVIDER-PAYMENT"</span> <span class="token operator">+</span> <span class="token string">"/payment/query"</span><span class="token punctuation">,</span> <span class="token class-name">ResponseResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>forObject<span class="token punctuation">.</span><span class="token function">getMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"8001"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                one<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>two<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    two<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"error:{}"</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"one:{}"</span><span class="token punctuation">,</span> one<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"two:{}"</span><span class="token punctuation">,</span> two<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><p>运行结果：</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103234126276.png" alt="image-20220103234126276" loading="lazy"></p>
<p>恩 看起来确实是轮番查询</p>
<p>好了，这玩意其实使用到Ribbon 这个玩意之后会说明</p>
<p>总之，他们两配合在一起后，我们的消费者Consumer可以直接调用服务而不用再担心端口号，而且服务还有负载均衡功能了</p>
<p>至于 负载均衡的轮循和按照能力来 之后会说到</p>
<h2 id="一些额外的配置" tabindex="-1"><a class="header-anchor" href="#一些额外的配置" aria-hidden="true">#</a> 一些额外的配置</h2>
<h3 id="主机名称和服务名称的修改" tabindex="-1"><a class="header-anchor" href="#主机名称和服务名称的修改" aria-hidden="true">#</a> 主机名称和服务名称的修改</h3>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220103235322600.png" alt="image-20220103235322600" loading="lazy"></p>
<p>可改可不改</p>
<p>我们规范的要求一般是只有服务名 而不出现主机名称</p>
<p>并且这里并没有发现IP地址，以后我们的微服务肯定是要分配到不同的机子上面 端口分别是多少这样来进行操作</p>
<p>比方说部署到192.168.11.23:1111端口</p>
<p>所以 我们要想办法让他们显示出来</p>
<p>首先我们来自定义下显示的名称</p>
<p>我们就只对**8001和8002（两个莫得感情的查询微服务）**进行配置</p>
<p>非常简单</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 更该端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token comment"># 开个debug</span>
<span class="token key atrule">logging.level.com.Project</span><span class="token punctuation">:</span> debug
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment">#  应用名称</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
  <span class="token comment">#  数据库相关配置</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>


<span class="token key atrule">mybatis-plus</span><span class="token punctuation">:</span>
  <span class="token comment">#  扫mapper.xml</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"classpath*:/mapper/**/*.xml"</span> <span class="token punctuation">]</span>
<span class="token key atrule">springfox</span><span class="token punctuation">:</span>
  <span class="token key atrule">documentation</span><span class="token punctuation">:</span>
    <span class="token key atrule">swagger-ui</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7002/eureka
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> <span class="token string">"查询二号机"</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>另外一个同理 加一个instance-id即可</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220104000029298.png" alt="image-20220104000029298" loading="lazy"></p>
<p>效果如上</p>
<p>然后接着是让访问连接变成IP地址（现在直接点一号机二号机你会发现进了docker.xxxx的网址）</p>
<p>其实也很简单 在接着上面那个操作之后 加一句</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> <span class="token string">"查询二号机"</span>
    <span class="token comment">#访问路径可以显示ip地址</span>
    <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>接着通过连接点进去就是真实的IP地址了</p>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220104000422367.png" alt="image-20220104000422367" loading="lazy"></p>
<h2 id="服务发现discovery" tabindex="-1"><a class="header-anchor" href="#服务发现discovery" aria-hidden="true">#</a> 服务发现Discovery</h2>
<p>对于注册进Eureka里面的微服务，可以通过服务发现来获取该服务的信息</p>
<p>其实非常简单就能获取得到</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
     * 服务发现 Client端  注意 这玩意的包有两个 org.springframework.cloud.client.discovery.DiscoveryClient 要用这个
     */</span>
<span class="token annotation punctuation">@Resource</span>
<span class="token keyword">private</span> <span class="token class-name">DiscoveryClient</span> discoveryClient<span class="token punctuation">;</span>

<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/discover"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">discover</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ArrayList</span> arrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//        获取服务清单列表</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> services <span class="token operator">=</span> discoveryClient<span class="token punctuation">.</span><span class="token function">getServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> service <span class="token operator">:</span> services<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"**********service: {}"</span><span class="token punctuation">,</span> service<span class="token punctuation">)</span><span class="token punctuation">;</span>
        arrayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>service<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//        根据具体的服务名称进一步地获取服务的相关信息</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">></span></span> instances <span class="token operator">=</span> discoveryClient<span class="token punctuation">.</span><span class="token function">getInstances</span><span class="token punctuation">(</span><span class="token string">"CLOUD-PROVIDER-PAYMENT"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ServiceInstance</span> instance <span class="token operator">:</span> instances<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"**********instance: {}"</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> instance<span class="token punctuation">.</span><span class="token function">getUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        arrayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arrayList<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>启动完毕这个微服务后，需要等待一段时间让他自检，不然获取不到对应的配置</p>
<p>我的电脑 目前开了5个服务的情况下 大概需要等待 20s左右</p>
<p>如果说没有下面那样的效果 可以在main中添加一个注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span><span class="token string">"com.Project.mapper"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableEurekaClient</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CloudProvider8001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ConfigurableApplicationContext</span> run <span class="token operator">=</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">CloudProvider8001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>运行结果：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token comment">// 两个服务</span>
    <span class="token string">"cloud-provider-payment"</span><span class="token punctuation">,</span>
    <span class="token string">"cloud-consumer-order-80"</span><span class="token punctuation">,</span>
    <span class="token comment">// 两个CLOUD-PROVIDER-PAYMENT服务</span>
    <span class="token punctuation">{</span>
        <span class="token property">"scheme"</span><span class="token operator">:</span> <span class="token string">"http"</span><span class="token punctuation">,</span>
        <span class="token property">"host"</span><span class="token operator">:</span> <span class="token string">"192.168.31.234"</span><span class="token punctuation">,</span>
        <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">8001</span><span class="token punctuation">,</span>
        <span class="token property">"metadata"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"management.port"</span><span class="token operator">:</span> <span class="token string">"8001"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"secure"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">"uri"</span><span class="token operator">:</span> <span class="token string">"http://192.168.31.234:8001"</span><span class="token punctuation">,</span>
        <span class="token property">"instanceId"</span><span class="token operator">:</span> <span class="token string">"查询一号机"</span><span class="token punctuation">,</span>
        <span class="token property">"serviceId"</span><span class="token operator">:</span> <span class="token string">"CLOUD-PROVIDER-PAYMENT"</span><span class="token punctuation">,</span>
        <span class="token property">"instanceInfo"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"instanceId"</span><span class="token operator">:</span> <span class="token string">"查询一号机"</span><span class="token punctuation">,</span>
            <span class="token property">"app"</span><span class="token operator">:</span> <span class="token string">"CLOUD-PROVIDER-PAYMENT"</span><span class="token punctuation">,</span>
            <span class="token property">"appGroupName"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"ipAddr"</span><span class="token operator">:</span> <span class="token string">"192.168.31.234"</span><span class="token punctuation">,</span>
            <span class="token property">"sid"</span><span class="token operator">:</span> <span class="token string">"na"</span><span class="token punctuation">,</span>
            <span class="token property">"homePageUrl"</span><span class="token operator">:</span> <span class="token string">"http://192.168.31.234:8001/"</span><span class="token punctuation">,</span>
            <span class="token property">"statusPageUrl"</span><span class="token operator">:</span> <span class="token string">"http://192.168.31.234:8001/actuator/info"</span><span class="token punctuation">,</span>
            <span class="token property">"healthCheckUrl"</span><span class="token operator">:</span> <span class="token string">"http://192.168.31.234:8001/actuator/health"</span><span class="token punctuation">,</span>
            <span class="token property">"secureHealthCheckUrl"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"vipAddress"</span><span class="token operator">:</span> <span class="token string">"cloud-provider-payment"</span><span class="token punctuation">,</span>
            <span class="token property">"secureVipAddress"</span><span class="token operator">:</span> <span class="token string">"cloud-provider-payment"</span><span class="token punctuation">,</span>
            <span class="token property">"countryId"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"dataCenterInfo"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"@class"</span><span class="token operator">:</span> <span class="token string">"com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo"</span><span class="token punctuation">,</span>
                <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"MyOwn"</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"hostName"</span><span class="token operator">:</span> <span class="token string">"192.168.31.234"</span><span class="token punctuation">,</span>
            <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"UP"</span><span class="token punctuation">,</span>
            <span class="token property">"overriddenStatus"</span><span class="token operator">:</span> <span class="token string">"UNKNOWN"</span><span class="token punctuation">,</span>
            <span class="token property">"leaseInfo"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"renewalIntervalInSecs"</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
                <span class="token property">"durationInSecs"</span><span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
                <span class="token property">"registrationTimestamp"</span><span class="token operator">:</span> <span class="token number">1641226834227</span><span class="token punctuation">,</span>
                <span class="token property">"lastRenewalTimestamp"</span><span class="token operator">:</span> <span class="token number">1641226834227</span><span class="token punctuation">,</span>
                <span class="token property">"evictionTimestamp"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">"serviceUpTimestamp"</span><span class="token operator">:</span> <span class="token number">1641226834227</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"isCoordinatingDiscoveryServer"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"metadata"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"management.port"</span><span class="token operator">:</span> <span class="token string">"8001"</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"lastUpdatedTimestamp"</span><span class="token operator">:</span> <span class="token number">1641226834227</span><span class="token punctuation">,</span>
            <span class="token property">"lastDirtyTimestamp"</span><span class="token operator">:</span> <span class="token number">1641226834180</span><span class="token punctuation">,</span>
            <span class="token property">"actionType"</span><span class="token operator">:</span> <span class="token string">"ADDED"</span><span class="token punctuation">,</span>
            <span class="token property">"asgName"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">"scheme"</span><span class="token operator">:</span> <span class="token string">"http"</span><span class="token punctuation">,</span>
        <span class="token property">"host"</span><span class="token operator">:</span> <span class="token string">"192.168.31.234"</span><span class="token punctuation">,</span>
        <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">8002</span><span class="token punctuation">,</span>
        <span class="token property">"metadata"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"management.port"</span><span class="token operator">:</span> <span class="token string">"8002"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"secure"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">"uri"</span><span class="token operator">:</span> <span class="token string">"http://192.168.31.234:8002"</span><span class="token punctuation">,</span>
        <span class="token property">"instanceId"</span><span class="token operator">:</span> <span class="token string">"查询二号机"</span><span class="token punctuation">,</span>
        <span class="token property">"serviceId"</span><span class="token operator">:</span> <span class="token string">"CLOUD-PROVIDER-PAYMENT"</span><span class="token punctuation">,</span>
        <span class="token property">"instanceInfo"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"instanceId"</span><span class="token operator">:</span> <span class="token string">"查询二号机"</span><span class="token punctuation">,</span>
            <span class="token property">"app"</span><span class="token operator">:</span> <span class="token string">"CLOUD-PROVIDER-PAYMENT"</span><span class="token punctuation">,</span>
            <span class="token property">"appGroupName"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"ipAddr"</span><span class="token operator">:</span> <span class="token string">"192.168.31.234"</span><span class="token punctuation">,</span>
            <span class="token property">"sid"</span><span class="token operator">:</span> <span class="token string">"na"</span><span class="token punctuation">,</span>
            <span class="token property">"homePageUrl"</span><span class="token operator">:</span> <span class="token string">"http://192.168.31.234:8002/"</span><span class="token punctuation">,</span>
            <span class="token property">"statusPageUrl"</span><span class="token operator">:</span> <span class="token string">"http://192.168.31.234:8002/actuator/info"</span><span class="token punctuation">,</span>
            <span class="token property">"healthCheckUrl"</span><span class="token operator">:</span> <span class="token string">"http://192.168.31.234:8002/actuator/health"</span><span class="token punctuation">,</span>
            <span class="token property">"secureHealthCheckUrl"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"vipAddress"</span><span class="token operator">:</span> <span class="token string">"cloud-provider-payment"</span><span class="token punctuation">,</span>
            <span class="token property">"secureVipAddress"</span><span class="token operator">:</span> <span class="token string">"cloud-provider-payment"</span><span class="token punctuation">,</span>
            <span class="token property">"countryId"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"dataCenterInfo"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"@class"</span><span class="token operator">:</span> <span class="token string">"com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo"</span><span class="token punctuation">,</span>
                <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"MyOwn"</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"hostName"</span><span class="token operator">:</span> <span class="token string">"192.168.31.234"</span><span class="token punctuation">,</span>
            <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"UP"</span><span class="token punctuation">,</span>
            <span class="token property">"overriddenStatus"</span><span class="token operator">:</span> <span class="token string">"UNKNOWN"</span><span class="token punctuation">,</span>
            <span class="token property">"leaseInfo"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"renewalIntervalInSecs"</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
                <span class="token property">"durationInSecs"</span><span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
                <span class="token property">"registrationTimestamp"</span><span class="token operator">:</span> <span class="token number">1641225799412</span><span class="token punctuation">,</span>
                <span class="token property">"lastRenewalTimestamp"</span><span class="token operator">:</span> <span class="token number">1641226910280</span><span class="token punctuation">,</span>
                <span class="token property">"evictionTimestamp"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token property">"serviceUpTimestamp"</span><span class="token operator">:</span> <span class="token number">1641225799412</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"isCoordinatingDiscoveryServer"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"metadata"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"management.port"</span><span class="token operator">:</span> <span class="token string">"8002"</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"lastUpdatedTimestamp"</span><span class="token operator">:</span> <span class="token number">1641225799412</span><span class="token punctuation">,</span>
            <span class="token property">"lastDirtyTimestamp"</span><span class="token operator">:</span> <span class="token number">1641225799361</span><span class="token punctuation">,</span>
            <span class="token property">"actionType"</span><span class="token operator">:</span> <span class="token string">"ADDED"</span><span class="token punctuation">,</span>
            <span class="token property">"asgName"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br></div></div><h2 id="eureka的保护模式" tabindex="-1"><a class="header-anchor" href="#eureka的保护模式" aria-hidden="true">#</a> Eureka的保护模式</h2>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220104123204598.png" alt="image-20220104123204598" loading="lazy"></p>
<p>一句话概括：某个时刻某一个微服务不可用了，Eureka不会立刻清理，依旧会对该微服务的信息进行保存</p>
<p>为什么会有这个玩意？</p>
<blockquote>
<p>为了防止EurekaClient可以正常运行，但是和EurekaServer网路不通的情况下，EurekaServer<strong>不会立刻</strong>将Eurekaclient服务剔除</p>
</blockquote>
<p>什么市自我保护模式？</p>
<blockquote>
<p>默认情况下，如果EurekaServer在一定时间没有接收到某个微服务的心跳，Eureka将会注销实例（默认90s）</p>
<p>但是当网络分区故障发生（延时、卡顿、拥挤）时，微服务与EurekaServer之间无法正常通讯，以上行为将会变得非常危险了，因为微服务本身是健康的，<strong>此时本不应该注销这个微服务</strong></p>
<p>Eureka通过进入自我保护模式，来解决这个问题---当Eureka短时间内丢失过多客户端时（可能发生了网络分区故障）那么这个节点就会进入自我保护模式</p>
<p>这有一个比例：短时间超过85%的实例没有心跳就进入自我保护机制</p>
</blockquote>
<p><img src="/images/SpringCloud/02-Eureka服务注册与发现/image-20220104130057168.png" alt="image-20220104130057168" loading="lazy"></p>
<h3 id="禁止自我保护" tabindex="-1"><a class="header-anchor" href="#禁止自我保护" aria-hidden="true">#</a> 禁止自我保护</h3>
<p>服务端加几行配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">7002</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token comment">#eureka服务端的实例名称</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server<span class="token punctuation">-</span><span class="token number">7002</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment"># 是否要将自己注册进Eureka的服务中</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token comment"># 下面这false表示自己就是服务中心，指责就是维护实例，并不需要去检索服务</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token comment"># 设置和Eureka Server交互的地址，查询服务和注册中心服务都需要依赖这个地址</span>
      <span class="token comment"># 集群指向其他的Eureka 单机指向自己的地址即可</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> <span class="token string">"http://127.0.0.1:7001/eureka/"</span>
  <span class="token key atrule">server</span><span class="token punctuation">:</span>
    <span class="token comment"># 关闭自我保护机制，保证不可用服务及时的被剔除</span>
    <span class="token key atrule">enable-self-preservation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token comment"># 两秒</span>
    <span class="token key atrule">eviction-interval-timer-in-ms</span><span class="token punctuation">:</span> <span class="token number">2000</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>接着要在我们的微服务（Client）端加几行配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 更该端口</span>
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8001</span>
<span class="token comment"># 开个debug</span>
<span class="token key atrule">logging.level.com.Project</span><span class="token punctuation">:</span> debug
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment">#  应用名称</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>payment
  <span class="token comment">#  数据库相关配置</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/cloud
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>


<span class="token key atrule">mybatis-plus</span><span class="token punctuation">:</span>
  <span class="token comment">#  扫mapper.xml</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"classpath*:/mapper/**/*.xml"</span> <span class="token punctuation">]</span>
<span class="token key atrule">springfox</span><span class="token punctuation">:</span>
  <span class="token key atrule">documentation</span><span class="token punctuation">:</span>
    <span class="token key atrule">swagger-ui</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7002/eureka
  <span class="token key atrule">instance</span><span class="token punctuation">:</span>
    <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> <span class="token string">"查询一号机"</span>
    <span class="token comment">#访问路径可以显示ip地址</span>
    <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># Eureka客户端发送心跳的时间间隔，单位为秒（默认是30秒）</span>
    <span class="token key atrule">lease-renewal-interval-in-seconds</span><span class="token punctuation">:</span> <span class="token number">1</span>
    <span class="token comment"># Eureka服务端在收到最后一次心跳后等待的时间上限，单位是秒（默认90s），超时将剔除服务</span>
    <span class="token key atrule">lease-expiration-duration-in-seconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>这样即可</p>
</template>
