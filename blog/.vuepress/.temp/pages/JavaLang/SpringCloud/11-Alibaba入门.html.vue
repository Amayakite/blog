<template><h2 id="入门简介" tabindex="-1"><a class="header-anchor" href="#入门简介" aria-hidden="true">#</a> 入门简介</h2>
<p>只能说，这就是分布式究极解决方案</p>
<h3 id="为什么会出现spring-cloud-alibaba" tabindex="-1"><a class="header-anchor" href="#为什么会出现spring-cloud-alibaba" aria-hidden="true">#</a> 为什么会出现Spring Cloud Alibaba</h3>
<p>主要原因是<strong>Spring Cloud Netflix</strong>项目进入了维护模式</p>
<p><img src="/images/SpringCloud/11-Alibaba入门/image-20220110131758625.png" alt="image-20220110131758625" loading="lazy"></p>
<p>当让这并不包括Eureka或并发限制模块</p>
<p>什么是维护模式？</p>
<blockquote>
<p>不会对模块添加新功能，只会修复bug，而且是稍微有点重大的BUG</p>
</blockquote>
<p>我们都知道Spring Cloud号称版本迭代王。。。所以Netflix拉下的东西必须得有其他东西来代替</p>
<p>所以这不就来了</p>
<p><img src="/images/SpringCloud/11-Alibaba入门/image-20220110141014724.png" alt="image-20220110141014724" loading="lazy"></p>
<p>那么Alibaba为什么这么出色呢？</p>
<p>因为有阿里云，Spring Cloud Alibaba跟阿里云生态圈适配的非常好…</p>
<p><img src="/images/SpringCloud/11-Alibaba入门/image-20220110141541587.png" alt="image-20220110141541587" loading="lazy"></p>
<p>能干嘛？</p>
<p><a href="https://github.com/alibaba/spring-cloud-alibaba" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/spring-cloud-alibaba<ExternalLinkIcon/></a></p>
<p>因为是国人开发的，所以有中文文档</p>
<p><a href="https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md<ExternalLinkIcon/></a></p>
<ul>
<li><strong>服务限流降级</strong>：默认支持 WebServlet、WebFlux、OpenFeign、RestTemplate、Spring Cloud Gateway、Zuul、Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。</li>
<li><strong>服务注册与发现</strong>：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。</li>
<li><strong>分布式配置管理</strong>：支持分布式系统中的外部化配置，配置更改时自动刷新。</li>
<li><strong>消息驱动能力</strong>：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。</li>
<li><strong>分布式事务</strong>：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。</li>
<li><strong>阿里云对象存储</strong>：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。</li>
<li><strong>分布式任务调度</strong>：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。</li>
<li><strong>阿里云短信服务</strong>：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。</li>
</ul>
<p>使用：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-alibaba-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>版本<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Spring官方文档</p>
<p><a href="https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/en-us/index.html" target="_blank" rel="noopener noreferrer">https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/en-us/index.html<ExternalLinkIcon/></a></p>
<p>中文</p>
<p><a href="https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html" target="_blank" rel="noopener noreferrer">https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html<ExternalLinkIcon/></a></p>
</template>
