<template><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>​终于到了学习Java最为兴奋的环节了！！！</p>
<p>​我们先来回顾一下Spring能做什么：这里直接看<a href="https://spring.io/" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a>的了</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217143002083.png" alt="image-20211217143002083" loading="lazy"></p>
<p>可以看到，他能完成非常多的事情，但是这些玩意坑顶不单单是一个Spring FrameWork(Spring context Spring mvc...)能来完成的</p>
<p>我们之前学习的Spring 基础部分 就属性 Spring Framework</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217143125919.png" alt="image-20211217143125919" loading="lazy"></p>
<p>可以看到，距离学完Spring 还有辣么大一截。。。</p>
<p>Spring并不单单指的是一个框架，而是一个非常庞大的生态圈，就如同它的名字一样：春天，衍生万物</p>
<p>也就是说，当我们学习到这里时，是<strong>半个脚踏入Java</strong>了</p>
<p>如果说你能把Spring的所有涵盖的内容都学习完毕之后....你可以真正意义上的月入10k+</p>
<p>那Spring Boot是拿来做什么的呢？</p>
<p>​我们之前配置Spring的时候，光是整合一个Spring jdbc 就需要话费非常大的力气</p>
<p>​而它的出现就是来简化这个问题的</p>
<p>​这是一个高层的框架，它的底层是Spring FrameWork</p>
<p>​它可以帮我们整合整个Spring系列集框架，来完成我们整个应用的开发，这样做在以后就可以免于写一大堆又臭又长的配置文件了，只需要专心于我们的业务文件</p>
<blockquote>
<p>Spring的作用就是让我们快速创建出Spring应用</p>
</blockquote>
<p>优点：</p>
<ul>
<li>创建独立的Spring应用</li>
<li>内嵌Web服务器（内嵌了Tomcat、Jetty等）</li>
<li>自动starter依赖，简化结构配置
<ul>
<li>自动导入相应的依赖，并且配置好版本之间的兼容性</li>
</ul>
</li>
<li>自动配置Spring以及第三方功能</li>
<li>提供伸长级别的监控、健康检查及外部化配置</li>
<li>无代码生成、无序编写XML</li>
</ul>
<p>缺点：</p>
<ul>
<li>人称版本帝，迭代块，需要时刻关注变化</li>
<li>封装非常深，内部原理极其复杂，非常难以精通</li>
</ul>
<h3 id="微服务的概念" tabindex="-1"><a class="header-anchor" href="#微服务的概念" aria-hidden="true">#</a> 微服务的概念</h3>
<ul>
<li>微服务是一种架构风格</li>
<li>一个应用拆分成一组小型服务</li>
<li>每个服务运行在自己的进程内，也就是可以独立部署和升级</li>
<li>服务之间使用轻量级Http交互</li>
<li>服务围绕业务功能拆分</li>
<li>可以由全自动部署机制独立部署</li>
<li>去中心化、服务自治、服务可以使用不同的语言，不同的存储技术</li>
</ul>
<p>这个看起来很简单对吧，实际上涉及到了非常多的问题，以及需要众多的解决方案</p>
<p>比如Nginx、Spring Cloud 、Docker 、K8S等等等等Super多的玩意</p>
<p>如果全部学完了，至少是月薪30k起步</p>
<h3 id="快速入门spring-boot" tabindex="-1"><a class="header-anchor" href="#快速入门spring-boot" aria-hidden="true">#</a> 快速入门Spring Boot</h3>
<p>如果你是想完整的入门，建议去看看尚硅谷的<a href="https://www.bilibili.com/video/BV19K4y1L7MT?p=1&amp;spm_id_from=pageDriver" target="_blank" rel="noopener noreferrer">视频<ExternalLinkIcon/></a></p>
<p>因为涉及到很多的小细节，这里就不多做说明了</p>
<p>这里我用的是spring boot 2.6.1</p>
<p>先看下官方文档按照Spring boot 2.6.1需要哪些<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started" target="_blank" rel="noopener noreferrer">准备工作<ExternalLinkIcon/></a></p>
<p>JDK 1.8+ Maven版本要在3.5+ 我这里maven是3.8.4</p>
<h4 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h4>
<p>conf/setting.xml的配置如下</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>settings</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/SETTINGS/1.2.0<span class="token punctuation">"</span></span> 
<span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
 <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

  <span class="token comment">&lt;!-- 更换为在maven目录下 --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>localRepository</span><span class="token punctuation">></span></span>D:\apache-maven-3.8.4\maven-repo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>localRepository</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrors</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 

    Mirrors：镜像：方便下载使用
    Maven自带的镜像是国外的，国内有强，我们访问外网会非常的慢
    可以通过设置成国内镜像或者使用梯子的方式解决

   --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirror</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>aliyunmaven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrorOf</span><span class="token punctuation">></span></span>*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrorOf</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>阿里云公共仓库<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">></span></span>https://maven.aliyun.com/repository/public<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirror</span><span class="token punctuation">></span></span>


  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrors</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--配置JDK版本--></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profiles</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>jdk-1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeByDefault</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeByDefault</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>jdk</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>jdk</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.compilerVersion</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.compilerVersion</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profiles</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>settings</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h4 id="导入依赖" tabindex="-1"><a class="header-anchor" href="#导入依赖" aria-hidden="true">#</a> 导入依赖</h4>
<p>接着创建一个空的Maven项目并按照<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started.first-application" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>的说明加入如下依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">></span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>21-SpringBoot-HelloWorld<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--实际上你只需要加下面这句话即可--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.6.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>接着根据<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started.first-application.dependencies" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>的说明，我们要导入Web依赖只需要用普通的形式添加一个依赖即可：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>接着我们来看下目前项目中都有哪些内容</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217153403927.png" alt="image-20211217153403927" loading="lazy"></p>
<p>可以看到，一大堆我们非常熟悉的功能：</p>
<p>jakson spring context spring mvc spring aoc 等全都被导入进来了</p>
<h4 id="编写代码" tabindex="-1"><a class="header-anchor" href="#编写代码" aria-hidden="true">#</a> 编写代码</h4>
<p>接下来我们创建下java文件 com.springboot.boot.MainApplication.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>scanBasePackages <span class="token operator">=</span> <span class="token string">"com.springboot"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainApplication</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 这里的main方法也是固定写法 SpringApplication.run(MainApplication.class, args);
     * <span class="token keyword">@param</span> <span class="token parameter">args</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>接着，我们在com.springboot.controller文件夹下新建一个HelloController.java</p>
<p>并写上相应的web逻辑</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 说明： @RestController就是@Controller和@ResponseBody的合体内容 相当于封装了那两个
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/hello"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Hello Spring Boot!"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="开始测试" tabindex="-1"><a class="header-anchor" href="#开始测试" aria-hidden="true">#</a> 开始测试</h4>
<p>紧接着，我们启动MainApplication.java</p>
<p>接着访问<a href="http://localhost:8080/hello" target="_blank" rel="noopener noreferrer">http://localhost:8080/hello<ExternalLinkIcon/></a></p>
<p>你就能看到学习Spring以来最神奇的事情</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217155636396.png" alt="image-20211217155636396" loading="lazy"></p>
<p>草，几行代码 直接把整个SpringMVC的配置都一笔带过了</p>
<p>接着还有更神奇的事情</p>
<p>我们在resources文件夹下新建<code>application.properties</code></p>
<p>在里面写一句话（在你打service的时候IEDA应该就有智能提示了）</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">server.port</span><span class="token punctuation">=</span><span class="token attr-value">8888</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接着重启服务，你就能在你的8888端口上成功的访问到我们相应的资源</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217160013819.png" alt="image-20211217160013819" loading="lazy"></p>
<p>关于这个配置文件，我们可以在spring的<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>内看到相应能配置的东西，非常之多...</p>
<h4 id="简化打包" tabindex="-1"><a class="header-anchor" href="#简化打包" aria-hidden="true">#</a> 简化打包</h4>
<p>之前我们要将Spring项目打包成tomcat 项目 需要在pom.xml中手动添加</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>packaging</span><span class="token punctuation">></span></span>war<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>packaging</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>让其打包成war包 并且手动丢进tomcat文件夹内</p>
<p>接着，我们看下Spring<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started.first-application.executable-jar" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>内的说明</p>
<blockquote>
<p>我们通过创建一个完全独立的可执行 jar 文件来完成我们的示例，我们可以在生产中运行该文件。可执行 jar（有时称为“fat jar”(小胖jar，里面啥都有)）是包含已编译类以及代码运行所需的所有 jar 依赖项的档案。</p>
<p>要创建一个可执行的JAR，我们需要添加<code>spring-boot-maven-plugin</code>到我们<code>pom.xml</code>。为此，请在该<code>dependencies</code>部分下方插入以下几行：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></blockquote>
<p>我们添加完毕之后，打开Maven控制，点击package</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217160748984.png" alt="image-20211217160748984" loading="lazy"></p>
<p>接着就能在我们的target文件夹中看到一个jar文件</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217160841354.png" alt="image-20211217160841354" loading="lazy"></p>
<p>接着进入到这个文件夹内（用资源管理器之类的 ）</p>
<p>然后打开终端，输入</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> java -jar 刚刚打包的jar文件
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217161024867.png" alt="image-20211217161024867" loading="lazy"></p>
<p>我曹 一个项目就好了？</p>
<p>浏览器访问：</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217161049179.png" alt="image-20211217161049179" loading="lazy"></p>
<p>并且这玩意打开速率比Tomcat快多了 草真的爽</p>
<p>刚刚学完SSM的我惊呆了</p>
<h2 id="springboot的特点" tabindex="-1"><a class="header-anchor" href="#springboot的特点" aria-hidden="true">#</a> SpringBoot的特点</h2>
<h3 id="依赖管理" tabindex="-1"><a class="header-anchor" href="#依赖管理" aria-hidden="true">#</a> 依赖管理</h3>
<p>首先就是副项目做依赖管理，我们最开始导入了一个包：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--parent 父项目依赖 子项目只要继承了这个父项目，以后子项目写依赖就不需要添加版本号了
 所以我们之后添加的spring-boot-starter-web 也没有写上版本号
--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.6.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>

ctrl+鼠标左键点击spring-boot-starter-parent 看看里面都有什么： 可以看到还有一个父项目
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.6.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>
再进去 可以看到这里声明了一大堆jar包的版本
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activemq.version</span><span class="token punctuation">></span></span>5.16.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activemq.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>antlr2.version</span><span class="token punctuation">></span></span>2.7.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>antlr2.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appengine-sdk.version</span><span class="token punctuation">></span></span>1.9.92<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appengine-sdk.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artemis.version</span><span class="token punctuation">></span></span>2.19.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artemis.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>aspectj.version</span><span class="token punctuation">></span></span>1.9.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>aspectj.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assertj.version</span><span class="token punctuation">></span></span>3.21.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>assertj.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>atomikos.version</span><span class="token punctuation">></span></span>4.0.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>atomikos.version</span><span class="token punctuation">></span></span>
    ........
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>

比如说 log4j 和 logback 和 mysql
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>log4j2.version</span><span class="token punctuation">></span></span>2.14.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>log4j2.version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logback.version</span><span class="token punctuation">></span></span>1.2.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>logback.version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mysql.version</span><span class="token punctuation">></span></span>8.0.27<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mysql.version</span><span class="token punctuation">></span></span>

几乎声明了我们所有开发中所有常用的jar的版本号
所以我们无需写版本号

如果我们需要自定义版本 也是只需要在写驱动版本的时候自己的添加properties限定mysql版本
例如mysql5
在自己的pom.xml中
注意 加了这个properties是更方便管理版本，也可以按照之前的方式来在depedency中加上version来控制，但是那样就不方便管理
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mysql.version</span><span class="token punctuation">></span></span>5.1.49<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mysql.version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><h3 id="关于spring-boot-starter-web" tabindex="-1"><a class="header-anchor" href="#关于spring-boot-starter-web" aria-hidden="true">#</a> 关于spring-boot-starter-web</h3>
<p>在Spring的<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>中，我们可以获取到如下信息</p>
<blockquote>
<p>Starters 是一组方便的依赖描述符，您可以将它们包含在您的应用程序中。您可以获得所需的所有 Spring 和相关技术的一站式服务，而无需搜索示例代码和复制粘贴加载的依赖项描述符。例如，如果您想开始使用 Spring 和 JPA 进行数据库访问，请<code>spring-boot-starter-data-jpa</code>在您的项目中包含依赖项。</p>
<p>starters 包含许多依赖项，您需要这些依赖项来快速启动和运行项目，并使用一组一致的、受支持的托管传递依赖项。</p>
<p>所有<strong>官方</strong>首发都遵循类似的命名模式；<code>spring-boot-starter-*</code>，其中<code>*</code>是特定类型的应用程序。此命名结构旨在在您需要查找入门时提供帮助。许多 IDE 中的 Maven 集成允许您按名称搜索依赖项。例如，安装适当的 Eclipse 或 Spring Tools 插件后，您可以<code>ctrl-space</code>在 POM 编辑器中按并键入“spring-boot-starter”以获得完整列表。</p>
<p>正如“<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-auto-configuration.custom-starter" target="_blank" rel="noopener noreferrer">创建您自己的启动器<ExternalLinkIcon/></a>”部分所述，第三方启动器不应以 开头<code>spring-boot</code>，因为它是为官方 Spring Boot 工件保留的。相反，第三方启动器通常以项目名称开头。例如，名为的第三方启动项目<code>thirdpartyproject</code>通常命名为<code>thirdpartyproject-spring-boot-starter</code>。</p>
</blockquote>
<p>然后可以看到有很多<code>spring-boot-starter-*</code></p>
<p>也就是说，根据我们项目需要的starter，这个场景所有常规需要的依赖，都会自动引入（根据Maven的特性）</p>
<p>SpringBoot所有支持的场景都可以在<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>中看到</p>
<p>当然我们也可以使用一些自定义或者第三方的starter这些以后会遇上</p>
<p>当让：我们自己创建的stater不要以spring-boot-starter开头，以免和官方的包混淆</p>
<p>例如：<code>ZhangSan-spring-boot-starter</code></p>
<p>一看到这种类型的名字 也就应该知道 这个是第三方的starter</p>
<h3 id="自动配置" tabindex="-1"><a class="header-anchor" href="#自动配置" aria-hidden="true">#</a> 自动配置</h3>
<ul>
<li>
<p>自动配好Tomcat</p>
<ul>
<li>
<p>引入了Tomcat的依赖（在spring-boot-starter-web中）</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-tomcat<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.6.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
<li>
<p>配置了Tomcat 这个我们之后会了解到 自动配置的原理</p>
</li>
</ul>
</li>
<li>
<p>自动配置好SpringMVC</p>
<ul>
<li>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-webmvc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></li>
</ul>
</li>
<li>
<p>自动配置好了WEB常见功能</p>
<ul>
<li>
<p>例如我们之前要用SpringMVC的话，就得在web.xml中配置DispatcherServlet并设定为缺省值，现在，我们可以通过如下方法获取到spring boot 有没有配置它</p>
</li>
<li>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//        返回我们的IOC容器</span>
    <span class="token class-name">ConfigurableApplicationContext</span> run <span class="token operator">=</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        查看容器里面的组件</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> name <span class="token operator">:</span> run<span class="token punctuation">.</span><span class="token function">getBeanDefinitionNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"组件名称："</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li>
<li>
<p>结果：
<img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217165321078.png" alt="image-20211217165321078" loading="lazy"></p>
</li>
</ul>
</li>
<li>
<p>并且还配置好了characterEncodingFilter 字符编码拦截器 保证我们返回给客户端的中文不会乱码</p>
</li>
<li>
<p>并且还有multpartResolver文件上传功能等等等等诸多的常见功能</p>
</li>
</ul>
<h3 id="关于扫包" tabindex="-1"><a class="header-anchor" href="#关于扫包" aria-hidden="true">#</a> 关于扫包</h3>
<p>​在Spring的<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.structuring-your-code" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>中，我们可以看到如下信息：</p>
<blockquote>
<p>我们通常建议您将主应用程序类放在其他类之上的根包中。该<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.using-the-springbootapplication-annotation" target="_blank" rel="noopener noreferrer"><code>@SpringBootApplication</code>注解<ExternalLinkIcon/></a>往往放在你的主类，它隐含地定义为某些项目一基地“搜索包”。例如，如果您正在编写 JPA 应用程序，<code>@SpringBootApplication</code>则使用带注释的类的包来搜索<code>@Entity</code>项目。使用根包还允许组件扫描仅应用于您的项目。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>如果您不想使用<code>@SpringBootApplication</code>，它导入的<code>@EnableAutoConfiguration</code>和<code>@ComponentScan</code>注释定义了该行为，因此您也可以改用它们。</p>
</div>
<p>以下清单显示了一个典型的布局：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>com
 +- example
     +- myapplication
         +- MyApplication.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></blockquote>
<p>也就是主程序所在的包及其下面的所有子包里面的组件都会被默认扫描</p>
<p>也就是说我们可以把我们的项目结构改成这样</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217170444501.png" alt="image-20211217170444501" loading="lazy"></p>
<p>接着在MainApplication中把之前的扫包代码<code>@SpringBootApplication(scanBasePackages = &quot;com.springboot&quot;)</code></p>
<p>删掉 只保留<code>@SpringBootApplication</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ConfigurableApplicationContext</span> run <span class="token operator">=</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> name <span class="token operator">:</span> run<span class="token punctuation">.</span><span class="token function">getBeanDefinitionNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"组件名称："</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>接着启动试试</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217170749178.png" alt="image-20211217170749178" loading="lazy"></p>
<p>依旧能够正常的访问到我们的内容</p>
<h3 id="关于各种默认配置" tabindex="-1"><a class="header-anchor" href="#关于各种默认配置" aria-hidden="true">#</a> 关于各种默认配置</h3>
<p>其实在我们写application.xml的时候，你能发现写port之前有默认提示和默认值</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217171616232.png" alt="image-20211217171616232" loading="lazy"></p>
<p>我们也可以看到 例如文件上传的一些默认值</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217171657641.png" alt="image-20211217171657641" loading="lazy"></p>
<p>每个文件最大是1mb 总计最多上传10mb等</p>
<p>也就是说 每个配置都有默认的值，并且最终都是映射到某一个类上面的</p>
<p>比方说我们设置下文件的最大值</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">spring.servlet.multipart.max-file-size</span><span class="token punctuation">=</span><span class="token attr-value">5MB</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后左键点击它 就能跳转到对应的类内</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217171914961.png" alt="image-20211217171914961" loading="lazy"></p>
<p>并且由于我们修改了值，左边还贴心的给我们标识了。。</p>
<p>所以说，配置文件的值最终都会绑定到类上面，这个类会在容器中创建对象</p>
<p>并且它有按需加载自动匹配项</p>
<p>我们现在只引入了web的starter 所以程序在启动的时候，容器内并不含有jdbc相关的对象</p>
<p>但如果我们以后引入了jdbc的starter 那么该场景的jdbc自动配置将会被开启、容器内也会创建相应的对象</p>
<p>SpringBoot的所有配置功能都在<code>spring-boot-autoconfigura</code>这个依赖里边</p>
<p>PS：该依赖在web下的spring-boot-starter（Spring boot核心配置文件包）内</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217172803061.png" alt="image-20211217172803061" loading="lazy"></p>
<p>当然目前你能看有很多包下的类都是发红的，具体原因之后再说</p>
<p>但是就目前来说的话，应该是我们有了某种场景，相应的包才能生效</p>
<h2 id="组件添加" tabindex="-1"><a class="header-anchor" href="#组件添加" aria-hidden="true">#</a> 组件添加</h2>
<h3 id="configuration配置类注解的额外说明-单例-proxy-和多例" tabindex="-1"><a class="header-anchor" href="#configuration配置类注解的额外说明-单例-proxy-和多例" aria-hidden="true">#</a> @Configuration配置类注解的额外说明-单例(Proxy)和多例</h3>
<p>在之前学习Spring的过程中，我们常常食用@Configuration来标注某个类是一个配置类，在spring boot中同理</p>
<p>我现在创建一个user 和 cat的domain 具体内容就不多谈了，总之，user中含有一个对象cat</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Tom"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"Tomcat"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"Orange"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>接着在main方法中测试下 这玩意是否为单例的</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//        返回我们的IOC容器</span>
    <span class="token class-name">ConfigurableApplicationContext</span> run <span class="token operator">=</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        在容器中，configuration也是一个bean对象</span>
    <span class="token class-name">MyConfig</span> bean <span class="token operator">=</span> run<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">MyConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> bean<span class="token punctuation">.</span><span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">User</span> user1 <span class="token operator">=</span> bean<span class="token punctuation">.</span><span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Cat</span> cat <span class="token operator">=</span> bean<span class="token punctuation">.</span><span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user1<span class="token operator">==</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"cat====="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cat<span class="token operator">==</span>user<span class="token punctuation">.</span><span class="token function">getCat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>bean<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>运行结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>true
cat=====
true
class com.springboot.boot.config.MyConfig$$EnhancerBySpringCGLIB$$9cde7f34
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这里我们成功的得到了几个ture，这和之前学SPring的时候性质一样-----相应的对象都在<strong>容器</strong>创建的时候创建好了，我们user中的<code>cat()</code>也是如此，它底层转换为xml大概是这个样子：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cat<span class="token punctuation">"</span></span> <span class="token attr-name">xxxx</span><span class="token punctuation">></span></span>
...构造方法传参
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">xxxx</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>构造参数xxx</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cat<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cat<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>而且容器默认是单例模式---如果我们要修改成多例的话，只知道能在xml中配置：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token operator">&lt;</span>bean id<span class="token operator">=</span><span class="token string">"cat"</span> xxxx  scope<span class="token operator">=</span><span class="token string">"prototype"</span><span class="token operator">></span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>构造方法传参
<span class="token operator">&lt;</span><span class="token operator">/</span>bean<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在@Bean方法中是没有办法定义的，那么我们该如何在java配置中开启多例模式呢？</p>
<p>按照之前学习的，可以这样</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token string">"prototype"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Tom"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>但是这样cat依旧是那一个cat，我们想要给整个类开启多例模式的话--可以这样做：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token comment">// 配置proxyBeanMethods  这项默认为true  即：单例模式（代理模式）</span>
<span class="token comment">// 可以配置为false 关闭单例模式（代理模式） </span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Tom"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"Tomcat"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"Orange"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>运行结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>false
cat=====
false
class com.springboot.boot.config.MyConfig
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这里并不是说单例和多例模式的注解应该怎么用</p>
<ul>
<li>在我们相应的bean并不会被进行多次调用 并且是应该是动态的时候（例如创建一个虚拟的user对象，一个虚拟的cat 临时的密码等） 应该用多例模式
<ul>
<li>使用多例模式的话，在程序启动的时候，SPring并不会帮助我们去创建对象， 而是在需要的时候（被调用的时候）才会创建相应的对象，所以说可以有效降低一些资源占用</li>
<li>并且多例模式可以正常的被gc(垃圾回收机制)进行回收处理，单例则不行</li>
</ul>
</li>
<li>如果我们需要一个全局唯一的对象，例如全局的一个DataSource，这样就必须得使用单例模式，虽然说会占用一些内存，但是可以有效提高之后的运行效率和速度</li>
</ul>
<p>在实际使用中，单例模式也被称为FULL模式，方法调用会得到单例，开始时就创建好相应的内容</p>
<p>多例模式也被称为lite模式，类组件之间无依赖关系，按需加载</p>
<p>总结： 如果为true，得到的配置对象是代理对象，调用多次方法都会从容器中寻找，不会创建。 如果为false，得到的配置对象是一个普通对象，调用方法就是执行代码，调用几次，就创建几个对象</p>
<h3 id="import注解-可以导入class自动生成对象" tabindex="-1"><a class="header-anchor" href="#import注解-可以导入class自动生成对象" aria-hidden="true">#</a> @Import注解-可以导入class自动生成对象</h3>
<p>我们现在有一个Person类，里面有username和password属性</p>
<p>接下来在我们的配置类中加入@Import注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>就相当于自动生成了一个Bean对象，它可以传入一个数组{Person.class,Student.class}，<strong>自动调用无参构造</strong></p>
<p>使用：通过run获取即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//        返回我们的IOC容器</span>
    <span class="token class-name">ConfigurableApplicationContext</span> run <span class="token operator">=</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        在容器中，configuration也是一个bean对象</span>
    <span class="token class-name">Person</span> bean <span class="token operator">=</span> run<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>bean<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="conditional-条件装配" tabindex="-1"><a class="header-anchor" href="#conditional-条件装配" aria-hidden="true">#</a> @Conditional 条件装配</h3>
<p>满足Conditional指定条件，则进行组件注入，否则不进行注入</p>
<p>它是一个根注解，有很多派生注解</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217212137538.png" alt="image-20211217212137538" loading="lazy"></p>
<p>除了这些还有个叫@Propfile的</p>
<p>这些注解都言简意赅，比方说onBean 当某个容器内包含某个Bean的时候，才会进行注入， onClass当某个容器内包含某个Class的时候才会进行注入 onResources 当这个组件的项目类路径内存在某个资源的时候才进行注入，onJava 当满足指定的一些java版本号才会进行注入 onWebapplication 当是一个web应用的时候才会进行注入</p>
<p>这里以@ConditionalOnBean来示例</p>
<p>我们在myConfig.java中把Cat的Bean注释掉</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Tom"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">//@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"Tomcat"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"Orange"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>接下来测试一下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//        返回我们的IOC容器</span>
    <span class="token class-name">ConfigurableApplicationContext</span> run <span class="token operator">=</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//       如果@Bean时，没有指定名字，默认是按照方法名创建</span>
    <span class="token keyword">boolean</span> cat <span class="token operator">=</span> run<span class="token punctuation">.</span><span class="token function">containsBean</span><span class="token punctuation">(</span><span class="token string">"cat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"容器内是否有cat组件"</span><span class="token operator">+</span>cat<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> user <span class="token operator">=</span> run<span class="token punctuation">.</span><span class="token function">containsBean</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"容器内是否有user组件"</span><span class="token operator">+</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>容器内是否有cat组件false
容器内是否有user组件true
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>接下来我们给MyConfig的User添加一个条件装备</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     *这里也可以通过 @ConditionalOnBean("cat")来进行判断
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConditionalOnBean</span><span class="token punctuation">(</span><span class="token class-name">Cat</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> 
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Tom"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"Tomcat"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"Orange"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>再度运行的结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>容器内是否有cat组件false
容器内是否有user组件false
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>甚至可以把这玩意标注在这个类上</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnBean</span><span class="token punctuation">(</span><span class="token class-name">Cat</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Tom"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"Tomcat"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"Orange"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>当让也可以反向实现：当容器中没有cat的时候，才会进行对相应bean的注册：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnMissingBean</span><span class="token punctuation">(</span><span class="token string">"cat"</span><span class="token punctuation">)</span> 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Tom"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span> <span class="token function">cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"Tomcat"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"Orange"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>也就是当这个类中有bean组件的时候，这个类中的所有bean注册才生效，否则全都不生效</p>
<p><strong>加了条件注解，代码执行到此处会先记录忽略，等容器其他组件加载完，再来判断是否注册组件</strong></p>
<p>我们之后在看底层的时候会看到非常非常多的条件装配，到时候可以看到</p>
<h3 id="importresource-导入资源" tabindex="-1"><a class="header-anchor" href="#importresource-导入资源" aria-hidden="true">#</a> @ImportResource 导入资源</h3>
<p>比方说我们现在有一个原生的xml配置文件：mybeans.xml</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.springboot.boot.domain.Person<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>zhangSan<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>张三<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>123456<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.springboot.boot.domain.User<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userRoot<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>age<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>18<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cat<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tim<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.springboot.boot.domain.Cat<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tim<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>小花猫<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>age<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>彩色<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>我们想把这个玩意一点一点的迁移到Java注解中，但是因为懒惰或者老板不让而放弃了</p>
<p>只需要这样做就可以将其导入到我们的Java注解配置类中</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ImportResource</span><span class="token punctuation">(</span>locations <span class="token operator">=</span> <span class="token string">"classpath:myBeans.xml"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfig</span> <span class="token punctuation">{</span>
<span class="token comment">// 这里写你自己的代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>@-&gt;XML:没想到吧，时代变了，大人</p>
<p>使用：就像在application对象中那样丝滑 不对</p>
<p>ConfigurableApplicationContext就是ApplicationContext类的实现...</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//        返回我们的IOC容器</span>
    <span class="token class-name">ConfigurableApplicationContext</span> run <span class="token operator">=</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">User</span> userRoot <span class="token operator">=</span> run<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"userRoot"</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userRoot<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>运行结果：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>User{name='root', age=18, cat=Cat{name='小花猫', age=1, color='彩色'}}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="configurationproperties-配置绑定" tabindex="-1"><a class="header-anchor" href="#configurationproperties-配置绑定" aria-hidden="true">#</a> @ConfigurationProperties 配置绑定</h2>
<h3 id="配合-component" tabindex="-1"><a class="header-anchor" href="#配合-component" aria-hidden="true">#</a> 配合@Component</h3>
<p>使用Java读取Properties文件的内容，并将其封装到JavaBean中</p>
<p>比方说我们现在有一个类 Car</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> brand<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> price<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后我们在application.properties中加入如下内容</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">server.port</span><span class="token punctuation">=</span><span class="token attr-value">8888</span>

<span class="token attr-name">mycar.brand</span><span class="token punctuation">=</span><span class="token attr-value">BYD</span>
<span class="token attr-name">mycar.price</span><span class="token punctuation">=</span><span class="token attr-value">100000</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>接着回到Car类中</p>
<p>@ConfigurationProperties内有一个属性prefix</p>
<p>这个的意思是，查找在application.properties文件内 有指定字段前缀的属性</p>
<p>比方说下面的 prefix = &quot;mycar&quot; 这代表着查找 <code>mycar.*</code>的内容，并通过查找到的key自动匹配我们这个类的属性（PS：properties文件是不支持中文值的，即使你是utf-8的编码....）</p>
<p>我们在加上ConfigurationProperties之后，一定得加上容器标识符，否则是无法使用spring boot提供的强大功能呢的</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"mycar"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> brand<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> price<span class="token punctuation">;</span>
 <span class="token comment">//......</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>接下来我们在helloController中测试一下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>
 
    <span class="token comment">//注入bean</span>
    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">Car</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Car</span> car<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/hello"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"世界你好"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/car"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Car</span> <span class="token function">car</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> car<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>结果：（PS：json转换器jackson 它也给我们配置好了）</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217222725283.png" alt="image-20211217222725283" loading="lazy"></p>
<h3 id="配合-enableconfigurationproperties" tabindex="-1"><a class="header-anchor" href="#配合-enableconfigurationproperties" aria-hidden="true">#</a> 配合@EnableConfigurationProperties</h3>
<p>在某些情况下，我们并不想为了一个bean而去注册一个Component容器</p>
<p>或者说某些情况下无法为其创建一个容器</p>
<p>所以说Spring也提供了一个方法给我们这样配置</p>
<p>注意 @ConfigurationProperties这个玩意在Spring Boot的底层非常容易见到</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//@Component 这个注释掉</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"mycar"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> brand<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> price<span class="token punctuation">;</span>
 <span class="token comment">//......</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>然后在我们的main坐在的Class内加上</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableConfigurationProperties</span><span class="token punctuation">(</span><span class="token class-name">Car</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token comment">//这里可以传入一个数组class 相当于把这个Car自动注册到容器内</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainApplication</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">MainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="spring-boot自动配置原理入门" tabindex="-1"><a class="header-anchor" href="#spring-boot自动配置原理入门" aria-hidden="true">#</a> Spring Boot自动配置原理入门</h2>
<h3 id="springbootapplication的构成" tabindex="-1"><a class="header-anchor" href="#springbootapplication的构成" aria-hidden="true">#</a> @SpringBootApplication的构成</h3>
<p>我们在编写Spring Boot程序的时候，写的第一句话是</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这个注解是干嘛用的呢？</p>
<p>我们先看源码，发现它有三个组合注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootConfiguration</span>
<span class="token annotation punctuation">@EnableAutoConfiguration</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span>excludeFilters <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span>CUSTOM<span class="token punctuation">,</span> classes <span class="token operator">=</span> <span class="token class-name">TypeExcludeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span>CUSTOM<span class="token punctuation">,</span> classes <span class="token operator">=</span> <span class="token class-name">AutoConfigurationExcludeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>第三个我们都非常眼熟了，扫包的，但是前两个</p>
<p><code>@SpringBootConfiguration</code>和<code>@EnableAutoConfiguration</code>又是干嘛用的呢？</p>
<h3 id="springbootconfiguration" tabindex="-1"><a class="header-anchor" href="#springbootconfiguration" aria-hidden="true">#</a> @SpringBootConfiguration</h3>
<p>这个当我们看到proxyBeanMethods的时候就应该知道</p>
<p>代表这个类当前是一个配置类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>TYPE<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@Indexed</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SpringBootConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@AliasFor</span><span class="token punctuation">(</span>annotation <span class="token operator">=</span> <span class="token class-name">Configuration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">boolean</span> <span class="token function">proxyBeanMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="enableautoconfiguration" tabindex="-1"><a class="header-anchor" href="#enableautoconfiguration" aria-hidden="true">#</a> @EnableAutoConfiguration</h3>
<p>一个@AutoConfigurationPackage？ 自动配置包？</p>
<p>还有一个是啥？@Import了什么？</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@AutoConfigurationPackage</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">AutoConfigurationImportSelector</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">EnableAutoConfiguration</span> <span class="token punctuation">{</span>


 <span class="token class-name">String</span> ENABLED_OVERRIDE_PROPERTY <span class="token operator">=</span> <span class="token string">"spring.boot.enableautoconfiguration"</span><span class="token punctuation">;</span>


 <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">exclude</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>


 <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">excludeName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>接下来我们看看@AutoConfigurationPackage</p>
<h4 id="autoconfigurationpackage" tabindex="-1"><a class="header-anchor" href="#autoconfigurationpackage" aria-hidden="true">#</a> @AutoConfigurationPackage</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">AutoConfigurationPackages<span class="token punctuation">.</span>Registrar</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">AutoConfigurationPackage</span> <span class="token punctuation">{</span>


 <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">basePackages</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>


 <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">basePackageClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>也就是说核心是这个AutoConfigurationPackages.Registrar.class</p>
<h5 id="autoconfigurationpackages-registrar-class" tabindex="-1"><a class="header-anchor" href="#autoconfigurationpackages-registrar-class" aria-hidden="true">#</a> AutoConfigurationPackages.Registrar.class</h5>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Registrar</span> <span class="token keyword">implements</span> <span class="token class-name">ImportBeanDefinitionRegistrar</span><span class="token punctuation">,</span> <span class="token class-name">DeterminableImports</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">registerBeanDefinitions</span><span class="token punctuation">(</span><span class="token class-name">AnnotationMetadata</span> metadata<span class="token punctuation">,</span> <span class="token class-name">BeanDefinitionRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">register</span><span class="token punctuation">(</span>registry<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">PackageImports</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPackageNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">determineImports</span><span class="token punctuation">(</span><span class="token class-name">AnnotationMetadata</span> metadata<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PackageImports</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>这里就言简意赅的概括下这里是干嘛用的</p>
<p>最主要的是这个方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">registerBeanDefinitions</span><span class="token punctuation">(</span><span class="token class-name">AnnotationMetadata</span> metadata<span class="token punctuation">,</span> <span class="token class-name">BeanDefinitionRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">register</span><span class="token punctuation">(</span>registry<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">PackageImports</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPackageNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>metadata就是我们正在运行的这个main方法，com.springboot.boot.MainApplication</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217231817272-16397542988091.png" alt="image-20211217231817272" loading="lazy"></p>
<p>然后代码中的new packageImports 获取到我们这个main方法所在包的包名</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217231944074.png" alt="image-20211217231944074" loading="lazy"></p>
<p>接着使用array+String接收</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217232038410.png" alt="image-20211217232038410" loading="lazy"></p>
<p>也就是最终获取到了我们这个包名</p>
<p>接着就是register方法，根据官方文档，可以看到它完成了如下内容：</p>
<blockquote>
<p>以编程方式注册自动配置包名称。后续调用将把给定的包名添加到已经注册的包名中。您可以使用此方法手动定义将用于给定BeanDefinitionRegistry的基本包。通常，建议您不要直接调用此方法，而是依赖默认约定，其中包名是从@EnableAutoConfiguration类设置的。</p>
<p>形参:</p>
<p>​ registry–bean定义注册表</p>
<p>​ packageNames–要设置的包名称</p>
</blockquote>
<p>也就是说，我们传入一个包名 它会自动帮我们注册到包名列表</p>
<p>此配置用于记录包扫描入口，常用于扫描@Mapper注解，区别于@MapperScan的另一种方式</p>
<p>所以说我们默认的包路径是main这个路径下，原因就在这</p>
<p>接着就是导入了</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">determineImports</span><span class="token punctuation">(</span><span class="token class-name">AnnotationMetadata</span> metadata<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PackageImports</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="autoconfigurationimportselector" tabindex="-1"><a class="header-anchor" href="#autoconfigurationimportselector" aria-hidden="true">#</a> AutoConfigurationImportSelector</h4>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211217233624905.png" alt="image-20211217233624905" loading="lazy"></p>
<p>我只能说 关于这玩意太复杂了</p>
<p>反正是通过了这三个内部类 来获取到所有的组件名到一个LinkedList到一个集合中</p>
<p>md我跳过了 以后回来在看 视频<a href="https://www.bilibili.com/video/BV19K4y1L7MT?p=14&amp;spm_id_from=pageDriver" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV19K4y1L7MT?p=14&amp;spm_id_from=pageDriver<ExternalLinkIcon/></a></p>
<h4 id="按需加载" tabindex="-1"><a class="header-anchor" href="#按需加载" aria-hidden="true">#</a> 按需加载</h4>
<p>虽然说我们导入的类所有自动配置的启动的时候都会默认加载，但是按照条件装配规则（@conditional），最终会按需配置（即：是否有某个依赖之类的才会进行加载）</p>
<h4 id="自动配置的原理" tabindex="-1"><a class="header-anchor" href="#自动配置的原理" aria-hidden="true">#</a> 自动配置的原理</h4>
<p>建议还是看这个<a href="https://www.bilibili.com/video/BV19K4y1L7MT?p=15" target="_blank" rel="noopener noreferrer">视频<ExternalLinkIcon/></a></p>
<p>我们现在随便打开spring-boot-autoconfigure的某个包，这里以aop为例</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"spring.aop"</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">"auto"</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">,</span> matchIfMissing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AopAutoConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConditionalOnClass</span><span class="token punctuation">(</span><span class="token class-name">Advice</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">AspectJAutoProxyingConfiguration</span> <span class="token punctuation">{</span>

<span class="token comment">///.......</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>首先可以看到第二行的</p>
<p><code>@ConditionalOnProperty(prefix = &quot;spring.aop&quot;, name = &quot;auto&quot;, havingValue = &quot;true&quot;, matchIfMissing = true)</code></p>
<p>这里前面的我们都看得懂  spring.aop.auto=true 对应前面三个 ，然后就是matchIfMissing</p>
<p>这个属性的含义是---如果没有设定属性，条件是否匹配---也就是说  如果我们没有配置对应的属性，是否应该也匹配上前面的配置，如果为false 则不匹配 则不加载 如果为true 则匹配 进行加载</p>
<p>这里为true 所以自动加载，</p>
<p>接下来是<code>@ConditionalOnClass(Advice.class)</code></p>
<p>因为我们并没有安装aop相关的，它这里依赖的是aspectj相关的包</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218115315943.png" alt="image-20211218115315943" loading="lazy"></p>
<p>所以这里将不会匹配，这个AspectJAutoProxyingConfiguration将不会被加载</p>
<h3 id="如何使用springboot" tabindex="-1"><a class="header-anchor" href="#如何使用springboot" aria-hidden="true">#</a> 如何使用springboot</h3>
<ul>
<li>引入对应的场景依赖
<ul>
<li><a href="https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters" target="_blank" rel="noopener noreferrer">https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>查看自动配置了哪些
<ul>
<li>自己分析，引入场景后在autoconfiguration内查看 例如web就是里面的web</li>
<li>在application.properties中加入<code>debug=true</code>，然后看console里打印出来的含有Did not Match的都是不生效的(ctrl+F 搜索Negative matches 那下面的就是)
<img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218122100906.png" alt="image-20211218122100906" loading="lazy"></li>
</ul>
</li>
<li>是否需要修改
<ul>
<li>参照<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties" target="_blank" rel="noopener noreferrer">配置文档<ExternalLinkIcon/></a>进行修改配置项</li>
<li>自己按照感觉修改</li>
<li>比方说我现在觉得spring启动的时候的banner图片不好看
<img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218122337635.png" alt="image-20211218122337635" loading="lazy"></li>
<li>我想换成自己的，一搜索image发现了如下匹配项
<img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218122410302.png" alt="image-20211218122410302" loading="lazy"></li>
<li>接着发现支持
<img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218122634928.png" alt="image-20211218122634928" loading="lazy"></li>
<li>修改：你可以到这个网站去生成一个spring boot banner<a href="https://www.bootschool.net/ascii" target="_blank" rel="noopener noreferrer">https://www.bootschool.net/ascii<ExternalLinkIcon/></a></li>
<li>当然你甚至可以用txt
<img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218123227901.png" alt="image-20211218123227901" loading="lazy"></li>
</ul>
</li>
<li>当然 你也可以自定义加入或者替换组件，原理看这个<a href="https://www.bilibili.com/video/BV19K4y1L7MT?p=15&amp;spm_id_from=pageDriver" target="_blank" rel="noopener noreferrer">视频<ExternalLinkIcon/></a></li>
</ul>
<h3 id="开发小技巧" tabindex="-1"><a class="header-anchor" href="#开发小技巧" aria-hidden="true">#</a> 开发小技巧</h3>
<h4 id="lombok-自动生成getset" tabindex="-1"><a class="header-anchor" href="#lombok-自动生成getset" aria-hidden="true">#</a> Lombok-自动生成getset</h4>
<p>第一步，添加依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>provided<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>第二步：安装这个插件</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218124027221.png" alt="image-20211218124027221" loading="lazy"></p>
<p>新版本的IEDA自带 无序安装</p>
<p>然后在你想要的类上 比如User</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Cat</span> cat<span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Integer</span> age<span class="token punctuation">,</span> <span class="token class-name">Cat</span> cat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cat <span class="token operator">=</span> cat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>把get set 什么的都去掉 加上@Data</p>
<p>然后运行下程序 你就可以得到如下内容Get Set  hashcode equals  tostring 等（IEDA 2021.1.3）</p>
<p>当然你也可以这样写</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span> <span class="token comment">//自动加上有参构造器 注意 有参构造器 是把所有参数都弄进去 如果要指定哪几个参数的话 要自己写</span>
<span class="token annotation punctuation">@NoArgsConstructor</span> <span class="token comment">//自动加上无参构造器</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Cat</span> cat<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//</span>
<span class="token comment">// Source code recreated from a .class file by IntelliJ IDEA</span>
<span class="token comment">// (powered by FernFlower decompiler)</span>
<span class="token comment">//</span>

<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>springboot<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>domain</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Cat</span> cat<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Integer</span> age<span class="token punctuation">,</span> <span class="token class-name">Cat</span> cat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cat <span class="token operator">=</span> cat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Cat</span> <span class="token function">getCat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Integer</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setCat</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Cat</span> cat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cat <span class="token operator">=</span> cat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">User</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">User</span> other <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span>o<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>other<span class="token punctuation">.</span><span class="token function">canEqual</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                label47<span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Object</span> <span class="token keyword">this</span>$age <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">Object</span> other$age <span class="token operator">=</span> other<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span>$age <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>other$age <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">break</span> label47<span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span>$age<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other$age<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">break</span> label47<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token class-name">Object</span> <span class="token keyword">this</span>$name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Object</span> other$name <span class="token operator">=</span> other<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span>$name <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>other$name <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span>$name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other$name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token class-name">Object</span> <span class="token keyword">this</span>$cat <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getCat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Object</span> other$cat <span class="token operator">=</span> other<span class="token punctuation">.</span><span class="token function">getCat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span>$cat <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>other$cat <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span>$cat<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other$cat<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">canEqual</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Object</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> other <span class="token keyword">instanceof</span> <span class="token class-name">User</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> PRIME <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> $age <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> result <span class="token operator">*</span> <span class="token number">59</span> <span class="token operator">+</span> <span class="token punctuation">(</span>$age <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">43</span> <span class="token operator">:</span> $age<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> $name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result <span class="token operator">=</span> result <span class="token operator">*</span> <span class="token number">59</span> <span class="token operator">+</span> <span class="token punctuation">(</span>$name <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">43</span> <span class="token operator">:</span> $name<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> $cat <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getCat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result <span class="token operator">=</span> result <span class="token operator">*</span> <span class="token number">59</span> <span class="token operator">+</span> <span class="token punctuation">(</span>$cat <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">43</span> <span class="token operator">:</span> $cat<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"User(name="</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">", age="</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">", cat="</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getCat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">")"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br></div></div><h4 id="热更新" tabindex="-1"><a class="header-anchor" href="#热更新" aria-hidden="true">#</a> 热更新</h4>
<p>有两个选择</p>
<p>第一个是spring-boot-devtools 添加下这个依赖，官方推荐用这个</p>
<p><a href="https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools" target="_blank" rel="noopener noreferrer">https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools<ExternalLinkIcon/></a></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-devtools<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>然后正常运行，需要热部署的时候用这个构建即可</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218130947744.png" alt="image-20211218130947744" loading="lazy"></p>
<p><strong>springboot的devtools本质上是重启项目</strong></p>
<p>这玩意并不是真正的热更新，官方是这样说的：推荐使用JRebel</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218131426831.png" alt="image-20211218131426831" loading="lazy"></p>
<p><a href="https://blog.csdn.net/lianghecai52171314/article/details/105637251" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/lianghecai52171314/article/details/105637251<ExternalLinkIcon/></a></p>
<h3 id="spring-initializr-快速创建spring-boot-project" tabindex="-1"><a class="header-anchor" href="#spring-initializr-快速创建spring-boot-project" aria-hidden="true">#</a> Spring-initializr 快速创建spring boot project</h3>
<p>如果说服务器连接不上的话 可以更换成阿里的<code>https://start.aliyun.com</code></p>
<p>不过<strong>阿里云的版本非常低</strong> 建议有能力的话还是挂个梯子</p>
<p>刚刚又看到了几个解决方案 优先推荐：</p>
<ul>
<li><code>http://start.spring.io</code></li>
<li><code>https://start.springboot.io</code> 推荐使用这个 不知道为啥就这个最快最稳定</li>
</ul>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218131951227.png" alt="image-20211218131951227" loading="lazy"></p>
<p>然后就可以自由的选择需要哪种类型的开发</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218134535632.png" alt="image-20211218134535632" loading="lazy"></p>
<p>比方说我这里选择了WEB Mybatis 和一个redis</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218134642400.png" alt="image-20211218134642400" loading="lazy"></p>
<p>紧接着你就能得到如下文件</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218135032347.png" alt="image-20211218135032347" loading="lazy"></p>
<p>src目录结构如下</p>
<p><img src="/images/SpringBoot/01-Spring_Boot基础/image-20211218140059920.png" alt="image-20211218140059920" loading="lazy"></p>
</template>
