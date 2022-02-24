<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>​  想了想，在正式学习Spring Boot 之前 还是来接着学习下Mybatis好一些。。。</p>
<p>2021年12月17日14:22:59 补： 先别看这玩意 还是学完Spring Boot再来整 新版本的MybatisPlus都得会Spring Boot才能学好</p>
<p>​  毕竟SPring Boot 的内容真的不多</p>
<p>​  Mybatis-Plus是一个Mybatis的增强工具包，只做增强，功能不变，为简化开发工作，提高生产效率而生</p>
<p>​  这玩意的目标是成为Mybatis最好的搭档</p>
<p>​  有了这玩意是非常丝滑的</p>
<p>​  这玩意是国人开发的，所以说有中文文档和<a href="https://baomidou.com/" target="_blank" rel="noopener noreferrer">中文官网<ExternalLinkIcon/></a></p>
<h3 id="快速入门" tabindex="-1"><a class="header-anchor" href="#快速入门" aria-hidden="true">#</a> 快速入门</h3>
<h4 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h4>
<p>我们先创建一个测试表</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token keyword">user</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">user</span>
<span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">auto_increment</span> <span class="token keyword">COMMENT</span> <span class="token string">'主键ID'</span><span class="token punctuation">,</span>
    name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'姓名'</span><span class="token punctuation">,</span>
    age <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'年龄'</span><span class="token punctuation">,</span>
    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'邮箱'</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> <span class="token keyword">user</span><span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">user</span> <span class="token punctuation">(</span>id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> email<span class="token punctuation">)</span> <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'Jone'</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">'test1@baomidou.com'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token string">'test2@baomidou.com'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token string">'test3@baomidou.com'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">'Sandy'</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token string">'test4@baomidou.com'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">'Billie'</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">,</span> <span class="token string">'test5@baomidou.com'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>接着新建一个project，在domain中新建一个JavaBean</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这里get和 set 和 toString自行添加</p>
<h4 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖" aria-hidden="true">#</a> 添加依赖</h4>
<p>使用了MybatisPlus就不需要引入Mybatis和Mybatis-spring了</p>
<p>反正其他的都和原来一样 除了那两位合二为一变成了mybatis-plus</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/com.baomidou/mybatis-plus --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.4.3.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/log4j/log4j --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.17<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>8.0.27<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/com.alibaba/druid --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.springframework/spring-context --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-context<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.springframework/spring-tx --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-tx<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.springframework/spring-test --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/junit/junit --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.13.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><h3 id="相关的配置文件" tabindex="-1"><a class="header-anchor" href="#相关的配置文件" aria-hidden="true">#</a> 相关的配置文件</h3>
<h4 id="mybatis核心配置文件-sqlmapconfig" tabindex="-1"><a class="header-anchor" href="#mybatis核心配置文件-sqlmapconfig" aria-hidden="true">#</a> Mybatis核心配置文件-sqlMapConfig</h4>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token comment">&lt;!--mybatis-config约束--></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">configuration</span> <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Config 3.0//EN"</span> <span class="token string">"http://mybatis.org/dtd/mybatis-3-config.dtd"</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
    
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="log4j配置文件" tabindex="-1"><a class="header-anchor" href="#log4j配置文件" aria-hidden="true">#</a> log4j配置文件</h4>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment">### direct log messages to stdout ###</span>
<span class="token attr-name">log4j.appender.stdout</span><span class="token punctuation">=</span><span class="token attr-value">org.apache.log4j.ConsoleAppender</span>
<span class="token attr-name">log4j.appender.stdout.Target</span><span class="token punctuation">=</span><span class="token attr-value">System.out</span>
<span class="token attr-name">log4j.appender.stdout.layout</span><span class="token punctuation">=</span><span class="token attr-value">org.apache.log4j.PatternLayout</span>
<span class="token attr-name">log4j.appender.stdout.layout.ConversionPattern</span><span class="token punctuation">=</span><span class="token attr-value">%d{ABSOLUTE} %5p %c{1}:%L - %m%n</span>

<span class="token comment">### direct messages to file mylog.log ###</span>
<span class="token attr-name">log4j.appender.file</span><span class="token punctuation">=</span><span class="token attr-value">org.apache.log4j.FileAppender</span>
<span class="token attr-name">log4j.appender.file.File</span><span class="token punctuation">=</span><span class="token attr-value">c:/mylog.log</span>
<span class="token attr-name">log4j.appender.file.layout</span><span class="token punctuation">=</span><span class="token attr-value">org.apache.log4j.PatternLayout</span>
<span class="token attr-name">log4j.appender.file.layout.ConversionPattern</span><span class="token punctuation">=</span><span class="token attr-value">%d{ABSOLUTE} %5p %c{1}:%L - %m%n</span>

<span class="token comment">### set log levels - for more verbose logging change 'info' to 'debug' ###</span>
<span class="token comment">### 这里要改动的就只有这个info 可以改成debug  其余的不需要动</span>
<span class="token attr-name">log4j.rootLogger</span><span class="token punctuation">=</span><span class="token attr-value">info, stdout</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h4 id="jdbc" tabindex="-1"><a class="header-anchor" href="#jdbc" aria-hidden="true">#</a> JDBC</h4>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">jdbc.username</span><span class="token punctuation">=</span><span class="token attr-value">root</span>
<span class="token attr-name">jdbc.password</span><span class="token punctuation">=</span><span class="token attr-value">123456</span>
<span class="token attr-name">jdbc.driver</span><span class="token punctuation">=</span><span class="token attr-value">com.mysql.cj.jdbc.Driver</span>
<span class="token attr-name">jdbc.url</span><span class="token punctuation">=</span><span class="token attr-value">jdbc:mysql://localhost:3306/mbp</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="applicationcontext" tabindex="-1"><a class="header-anchor" href="#applicationcontext" aria-hidden="true">#</a> applicationContext</h4>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/context<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>tx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/tx<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>aop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/aop<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--扫包--></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mb<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!--下面是Mybatis相关--></span>

    <span class="token comment">&lt;!--    加载properties文件--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>property-placeholder</span> <span class="token attr-name">location</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:jdbc.properties<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!--    配置数据源信息--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.alibaba.druid.pool.DruidDataSource<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.url}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClassName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.driver}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.username}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.password}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--    配置session工厂--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis.spring.SqlSessionFactoryBean<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sessionFactory<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token comment">&lt;!--        加载mybatis核心配置文件--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>configLocation<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:sqlMapConfig.xml<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--    扫描mapper所在的包，为mapper创建实现类--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis.spring.mapper.MapperScannerConfigurer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>basePackage<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mb.mapper<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--    声明式事务控制--></span>
    <span class="token comment">&lt;!--    声明平台事务管理器--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DataSourceTransactionManager<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--    配置事务增强--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>advice</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txAdvice<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>attributes</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>* <span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">tx:</span>attributes</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">tx:</span>advice</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--    配置事务的织入--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>pointcut</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txAdvice<span class="token punctuation">"</span></span> <span class="token attr-name">expression</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>execution(* com.ssm.service.*(..))<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringJUnit4ClassRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span><span class="token string">"classpath:applicationContext.xml"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserMapperTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"userMapper"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> all <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>all<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>TMD我知道现在知道，测试的时候 log4j会自动打印消息</p>
<p><img src="/images/SpringFrameWork/12-MyBatis-Plus/image-20211217001624446.png" alt="image-20211217001624446" loading="lazy"></p>
<p>不信你可以把log4j.properties删掉试试</p>
<h3 id="扩展-log4j2的使用" tabindex="-1"><a class="header-anchor" href="#扩展-log4j2的使用" aria-hidden="true">#</a> 扩展-log4j2的使用</h3>
<p>用之前要把log4j依赖去掉，然后添加如下两个依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.logging.log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>log4j-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.16.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-api --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.logging.log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>log4j-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.16.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>关于配置文件：</p>
<p>log4j 2.x版本不再支持像1.x中的.properties后缀的文件配置方式，2.x版本配置文件后缀名只能为&quot;.xml&quot;,&quot;.json&quot;或者&quot;.jsn&quot;.</p>
<p>系统选择配置文件的优先级(从先到后)如下：</p>
<ol>
<li>classpath下的名为log4j2-test.json 或者log4j2-test.jsn的文件.</li>
<li>classpath下的名为log4j2-test.xml的文件</li>
<li>classpath下名为log4j2.json 或者log4j2.jsn的文件</li>
<li>classpath下名为log4j2.xml的文件.</li>
</ol>
<p>我们一般默认使用log4j2.xml进行命名。如果本地要测试，可以把log4j2-test.xml放到classpath，而正式环境使用log4j2.xml，则在打包部署的时候不要打包log4j2-test.xml即可。</p>
<p>配置文件 直接搬过去即可 然后要用啥加啥</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token comment">&lt;!--日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL --></span>
<span class="token comment">&lt;!--status="WARN" :用于设置log4j2自身内部日志的信息输出级别，默认是OFF--></span>
<span class="token comment">&lt;!--monitorInterval="30"  :间隔秒数,自动检测配置文件的变更和重新配置本身--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span> <span class="token attr-name">status</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>WARN<span class="token punctuation">"</span></span> <span class="token attr-name">monitorInterval</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>30<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Properties</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--自定义一些常量，之后使用${变量名}引用--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logFilePath<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Property</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logFileName<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>test.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Properties</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--appenders:定义输出内容,输出格式,输出方式,日志保存策略等,常用其下三种标签[console,File,RollingFile]--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appenders</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--console :控制台输出的配置--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>console</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Console<span class="token punctuation">"</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>SYSTEM_OUT<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--PatternLayout :输出日志的格式,LOG4J2定义了输出代码,详见第二部分--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PatternLayout</span> <span class="token attr-name">pattern</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>console</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--        &amp;lt;!&amp;ndash;File :同步输出日志到本地文件&amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--        &amp;lt;!&amp;ndash;append="false" :根据其下日志策略,每次清空文件重新输入日志,可用于测试&amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--        &lt;File name="log" fileName="${logFilePath}/${logFileName}" append="false">--></span>
        <span class="token comment">&lt;!--            &lt;PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level %class{36} %L %M - %msg%xEx%n"/>--></span>
        <span class="token comment">&lt;!--        &lt;/File>--></span>
        <span class="token comment">&lt;!--        &amp;lt;!&amp;ndash;SMTP :邮件发送日志&amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--        &lt;SMTP name="Mail" subject="****SaaS系统正式版异常信息" to="message@message.info" from="message@lengjing.info" smtpUsername="message@message.info" smtpPassword="LENG****1234" smtpHost="mail.lengjing.info" smtpDebug="false" smtpPort="25" bufferSize="10">--></span>
        <span class="token comment">&lt;!--            &lt;PatternLayout pattern="[%-5p]:%d{YYYY-MM-dd HH:mm:ss} [%t] %c{1}:%L - %msg%n" />--></span>
        <span class="token comment">&lt;!--        &lt;/SMTP>--></span>
        <span class="token comment">&lt;!-- ${sys:user.home} :项目路径 --></span>
        <span class="token comment">&lt;!--        &lt;RollingFile name="RollingFileInfo" fileName="${sys:user.home}/logs/info.log"--></span>
        <span class="token comment">&lt;!--                     filePattern="${sys:user.home}/logs/$${date:yyyy-MM}/info-%d{yyyy-MM-dd}-%i.log">--></span>
        <span class="token comment">&lt;!--            &amp;lt;!&amp;ndash;ThresholdFilter :日志输出过滤&amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--            &amp;lt;!&amp;ndash;level="info" :日志级别,onMatch="ACCEPT" :级别在info之上则接受,onMismatch="DENY" :级别在info之下则拒绝&amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--            &lt;ThresholdFilter level="info" onMatch="ACCEPT" onMismatch="DENY"/>--></span>
        <span class="token comment">&lt;!--            &lt;PatternLayout pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n"/>--></span>
        <span class="token comment">&lt;!--            &amp;lt;!&amp;ndash; Policies :日志滚动策略&amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--            &lt;Policies>--></span>
        <span class="token comment">&lt;!--                &amp;lt;!&amp;ndash; TimeBasedTriggeringPolicy :时间滚动策略,默认0点小时产生新的文件,interval="6" : 自定义文件滚动时间间隔,每隔6小时产生新文件, modulate="true" : 产生文件是否以0点偏移时间,即6点,12点,18点,0点&amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--                &lt;TimeBasedTriggeringPolicy interval="6" modulate="true"/>--></span>
        <span class="token comment">&lt;!--                &amp;lt;!&amp;ndash; SizeBasedTriggeringPolicy :文件大小滚动策略&amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--                &lt;SizeBasedTriggeringPolicy size="100 MB"/>--></span>
        <span class="token comment">&lt;!--            &lt;/Policies>--></span>
        <span class="token comment">&lt;!--            &amp;lt;!&amp;ndash; DefaultRolloverStrategy属性如不设置，则默认为最多同一文件夹下7个文件，这里设置了20 &amp;ndash;&amp;gt;--></span>
        <span class="token comment">&lt;!--            &lt;DefaultRolloverStrategy max="20"/>--></span>
        <span class="token comment">&lt;!--        &lt;/RollingFile>--></span>

        <span class="token comment">&lt;!--        &lt;RollingFile name="RollingFileWarn" fileName="${sys:user.home}/logs/warn.log"--></span>
        <span class="token comment">&lt;!--                     filePattern="${sys:user.home}/logs/$${date:yyyy-MM}/warn-%d{yyyy-MM-dd}-%i.log">--></span>
        <span class="token comment">&lt;!--            &lt;ThresholdFilter level="warn" onMatch="ACCEPT" onMismatch="DENY"/>--></span>
        <span class="token comment">&lt;!--            &lt;PatternLayout pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n"/>--></span>
        <span class="token comment">&lt;!--            &lt;Policies>--></span>
        <span class="token comment">&lt;!--                &lt;TimeBasedTriggeringPolicy/>--></span>
        <span class="token comment">&lt;!--                &lt;SizeBasedTriggeringPolicy size="100 MB"/>--></span>
        <span class="token comment">&lt;!--            &lt;/Policies>--></span>
        <span class="token comment">&lt;!--        &lt;/RollingFile>--></span>
        <span class="token comment">&lt;!--        &lt;RollingFile name="RollingFileError" fileName="${sys:user.home}/logs/error.log"--></span>
        <span class="token comment">&lt;!--                     filePattern="${sys:user.home}/logs/$${date:yyyy-MM}/error-%d{yyyy-MM-dd}-%i.log">--></span>
        <span class="token comment">&lt;!--            &lt;ThresholdFilter level="error" onMatch="ACCEPT" onMismatch="DENY"/>--></span>
        <span class="token comment">&lt;!--            &lt;PatternLayout pattern="[%d{HH:mm:ss:SSS}] [%p] - %l - %m%n"/>--></span>
        <span class="token comment">&lt;!--            &lt;Policies>--></span>
        <span class="token comment">&lt;!--                &lt;TimeBasedTriggeringPolicy/>--></span>
        <span class="token comment">&lt;!--                &lt;SizeBasedTriggeringPolicy size="100 MB"/>--></span>
        <span class="token comment">&lt;!--            &lt;/Policies>--></span>
        <span class="token comment">&lt;!--        &lt;/RollingFile>--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appenders</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--然后定义logger，只有定义了logger并引入的appender，appender才会生效--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>loggers</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--过滤掉spring和mybatis的一些无用的DEBUG信息--></span>
        <span class="token comment">&lt;!--Logger节点用来单独指定日志的形式，name为包路径,比如要为org.springframework包下所有日志指定为INFO级别等。 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework<span class="token punctuation">"</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INFO<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>logger</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis<span class="token punctuation">"</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INFO<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>logger</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- Root节点用来指定项目的根日志，如果没有单独指定Logger，那么就会默认使用该Root日志输出 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>all<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Console<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
            <span class="token comment">&lt;!--            &lt;appender-ref ref="RollingFileInfo"/>--></span>
            <span class="token comment">&lt;!--            &lt;appender-ref ref="RollingFileWarn"/>--></span>
            <span class="token comment">&lt;!--            &lt;appender-ref ref="RollingFileError"/>--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--AsyncLogger :异步日志,LOG4J有三种日志模式,全异步日志,混合模式,同步日志,性能从高到底,线程越多效率越高,也可以避免日志卡死线程情况发生--></span>
        <span class="token comment">&lt;!--        additivity="false" : additivity设置事件是否在root logger输出，为了避免重复输出，可以在Logger 标签下设置additivity为”false”--></span>
        <span class="token comment">&lt;!--        &lt;AsyncLogger name="AsyncLogger" level="trace" includeLocation="true" additivity="false">--></span>
        <span class="token comment">&lt;!--            &lt;appender-ref ref="RollingFileError"/>--></span>
        <span class="token comment">&lt;!--        &lt;/AsyncLogger>--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>loggers</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br></div></div><h3 id="✨集成mybatisplus" tabindex="-1"><a class="header-anchor" href="#✨集成mybatisplus" aria-hidden="true">#</a> ✨集成MybatisPlus</h3>
<p>我们在配置mybatis的时候（集成到ApplicationContext中），是如下进行配置bean的</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--    配置session工厂--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis.spring.SqlSessionFactoryBean<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sessionFactory<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--配置数据源--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!--        加载mybatis核心配置文件--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>configLocation<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:sqlMapConfig.xml<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>其实集成mybatis-plus只需要做一件事：</p>
<p>把这个SqlSessionFactoryBean换成MybatisSqlSessionFactoryBean..</p>
<p>也就是这样：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--    配置session工厂--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sessionFactory<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--配置数据源--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!--        加载mybatis核心配置文件--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>configLocation<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:sqlMapConfig.xml<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>没错 这就是它所有的配置项... 其余配置不需要做任何的修改..</p>
<p>完整配置文件：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/context<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>tx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/tx<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>aop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/aop<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/aop https://www.springframework.org/schema/aop/spring-aop.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--扫包--></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mb<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!--下面是Mybatis相关--></span>

    <span class="token comment">&lt;!--    加载properties文件--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>property-placeholder</span> <span class="token attr-name">location</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:jdbc.properties<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!--    配置数据源信息--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.alibaba.druid.pool.DruidDataSource<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.url}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClassName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.driver}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.username}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.password}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--    配置session工厂--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sessionFactory<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token comment">&lt;!--        加载mybatis核心配置文件--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>configLocation<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:sqlMapConfig.xml<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--    扫描mapper所在的包，为mapper创建实现类--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.mybatis.spring.mapper.MapperScannerConfigurer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>basePackage<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mb.mapper<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--    声明式事务控制--></span>
    <span class="token comment">&lt;!--    声明平台事务管理器--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DataSourceTransactionManager<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--    配置事务增强--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>advice</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txAdvice<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>attributes</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>*<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">tx:</span>attributes</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">tx:</span>advice</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--    配置事务的织入--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>pointcut</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txAdvice<span class="token punctuation">"</span></span> <span class="token attr-name">expression</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>execution(* com.ssm.service.*(..))<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><h2 id="mybatis-plus使用" tabindex="-1"><a class="header-anchor" href="#mybatis-plus使用" aria-hidden="true">#</a> Mybatis-plus使用</h2>
<h3 id="通用crud" tabindex="-1"><a class="header-anchor" href="#通用crud" aria-hidden="true">#</a> 通用CRUD</h3>
<p>问题：</p>
<p>​  假设我们已经存在一张table user 表 并且已经有对应的实体类User 实现基于它的CRUD需要做哪些事情？</p>
<ul>
<li>
<p>基于Mybatis</p>
<ul>
<li>
<p>编写UserMapper接口，并手动编写CRUD方法</p>
</li>
<li>
<p>需要提供UserMapper.xml映射文件 或者通过注解的方式，手动编写每个方法对应的SQL语句</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserMapper</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select * from user"</span><span class="token punctuation">)</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
</ul>
</li>
<li>
<p>基于MyBatis-Plus</p>
<ul>
<li>
<p>只需要创建EmployeeMapper<strong>接口</strong>，并<strong>继承BaseMapper接口</strong></p>
</li>
<li>
<p>对，不需要配置文件...而且里面什么都不用写</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Mapper接口：
 * 让XXXmapper接口继承BaseMapper接口即可
 *  baseMapper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">></span></span>:指定泛型，就是当前Mapper接口所操作的实体类
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserMapper</span>  <span class="token keyword">extends</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li>
</ul>
</li>
</ul>
<h3 id="basemapper接口源码初步分析" tabindex="-1"><a class="header-anchor" href="#basemapper接口源码初步分析" aria-hidden="true">#</a> BaseMapper接口源码初步分析</h3>
<p>对没错 注释都是中文的</p>
<p>它包含如下非常直观的方法：</p>
<p><img src="/images/SpringFrameWork/12-MyBatis-Plus/image-20211217121846161.png" alt="image-20211217121846161" loading="lazy"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Mapper 继承该接口后，无需编写 mapper.xml 文件，即可获得CRUD功能
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>这个 Mapper 支持 id 泛型<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
 *
 * <span class="token keyword">@author</span> hubin
 * <span class="token keyword">@since</span> 2016-01-23
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BaseMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 插入一条记录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">entity</span> 实体对象
     */</span>
    <span class="token keyword">int</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">T</span> entity<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 ID 删除
     *
     * <span class="token keyword">@param</span> <span class="token parameter">id</span> 主键ID
     */</span>
    <span class="token keyword">int</span> <span class="token function">deleteById</span><span class="token punctuation">(</span><span class="token class-name">Serializable</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据实体(ID)删除
     *
     * <span class="token keyword">@param</span> <span class="token parameter">entity</span> 实体对象
     * <span class="token keyword">@since</span> 3.4.4
     */</span>
    <span class="token keyword">int</span> <span class="token function">deleteById</span><span class="token punctuation">(</span><span class="token class-name">T</span> entity<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 columnMap 条件，删除记录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">columnMap</span> 表字段 map 对象
     */</span>
    <span class="token keyword">int</span> <span class="token function">deleteByMap</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>COLUMN_MAP<span class="token punctuation">)</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> columnMap<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 entity 条件，删除记录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">queryWrapper</span> 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
     */</span>
    <span class="token keyword">int</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 删除（根据ID 批量删除）
     *
     * <span class="token keyword">@param</span> <span class="token parameter">idList</span> 主键ID列表(不能为 null 以及 empty)
     */</span>
    <span class="token keyword">int</span> <span class="token function">deleteBatchIds</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>COLLECTION<span class="token punctuation">)</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Serializable</span><span class="token punctuation">></span></span> idList<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 ID 修改
     *
     * <span class="token keyword">@param</span> <span class="token parameter">entity</span> 实体对象
     */</span>
    <span class="token keyword">int</span> <span class="token function">updateById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>ENTITY<span class="token punctuation">)</span> <span class="token class-name">T</span> entity<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 whereEntity 条件，更新记录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">entity</span>        实体对象 (set 条件值,可以为 null)
     * <span class="token keyword">@param</span> <span class="token parameter">updateWrapper</span> 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
     */</span>
    <span class="token keyword">int</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>ENTITY<span class="token punctuation">)</span> <span class="token class-name">T</span> entity<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> updateWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 ID 查询
     *
     * <span class="token keyword">@param</span> <span class="token parameter">id</span> 主键ID
     */</span>
    <span class="token class-name">T</span> <span class="token function">selectById</span><span class="token punctuation">(</span><span class="token class-name">Serializable</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 查询（根据ID 批量查询）
     *
     * <span class="token keyword">@param</span> <span class="token parameter">idList</span> 主键ID列表(不能为 null 以及 empty)
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">selectBatchIds</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>COLLECTION<span class="token punctuation">)</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Serializable</span><span class="token punctuation">></span></span> idList<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 查询（根据 columnMap 条件）
     *
     * <span class="token keyword">@param</span> <span class="token parameter">columnMap</span> 表字段 map 对象
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">selectByMap</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>COLUMN_MAP<span class="token punctuation">)</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> columnMap<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 entity 条件，查询一条记录
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>查询一条记录，例如 qw.last("limit 1") 限制取一条记录, 注意：多条数据会报异常<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
     *
     * <span class="token keyword">@param</span> <span class="token parameter">queryWrapper</span> 实体对象封装操作类（可以为 null）
     */</span>
    <span class="token keyword">default</span> <span class="token class-name">T</span> <span class="token function">selectOne</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> queryWrapper<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> ts <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">selectList</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>ts<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ts<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token class-name">ExceptionUtils</span><span class="token punctuation">.</span><span class="token function">mpe</span><span class="token punctuation">(</span><span class="token string">"One record is expected, but the query result is multiple records"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> ts<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据 Wrapper 条件，查询总记录数
     *
     * <span class="token keyword">@param</span> <span class="token parameter">queryWrapper</span> 实体对象封装操作类（可以为 null）
     */</span>
    <span class="token class-name">Long</span> <span class="token function">selectCount</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 entity 条件，查询全部记录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">queryWrapper</span> 实体对象封装操作类（可以为 null）
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">selectList</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 Wrapper 条件，查询全部记录
     *
     * <span class="token keyword">@param</span> <span class="token parameter">queryWrapper</span> 实体对象封装操作类（可以为 null）
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">selectMaps</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 Wrapper 条件，查询全部记录
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>注意： 只返回第一个字段的值<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
     *
     * <span class="token keyword">@param</span> <span class="token parameter">queryWrapper</span> 实体对象封装操作类（可以为 null）
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">selectObjs</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 entity 条件，查询全部记录（并翻页）
     *
     * <span class="token keyword">@param</span> <span class="token parameter">page</span>         分页查询条件（可以为 RowBounds.DEFAULT）
     * <span class="token keyword">@param</span> <span class="token parameter">queryWrapper</span> 实体对象封装操作类（可以为 null）
     */</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">P</span> <span class="token keyword">extends</span> <span class="token class-name">IPage</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token class-name">P</span> <span class="token function">selectPage</span><span class="token punctuation">(</span><span class="token class-name">P</span> page<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据 Wrapper 条件，查询全部记录（并翻页）
     *
     * <span class="token keyword">@param</span> <span class="token parameter">page</span>         分页查询条件
     * <span class="token keyword">@param</span> <span class="token parameter">queryWrapper</span> 实体对象封装操作类
     */</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">P</span> <span class="token keyword">extends</span> <span class="token class-name">IPage</span><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token class-name">P</span> <span class="token function">selectMapsPage</span><span class="token punctuation">(</span><span class="token class-name">P</span> page<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span>WRAPPER<span class="token punctuation">)</span> <span class="token class-name">Wrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br></div></div><h3 id="insert" tabindex="-1"><a class="header-anchor" href="#insert" aria-hidden="true">#</a> Insert</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringJUnit4ClassRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span><span class="token string">"classpath:applicationContext.xml"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserMapperTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"userMapper"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">UserMapper</span> userMapper<span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 测试通用的插入操作
     */</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">"aaa.abc@dd.com"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token string">"插入成功"</span> <span class="token operator">:</span> <span class="token string">"插入失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>然后不出意外的出意外了</p>
<p><img src="/images/SpringFrameWork/12-MyBatis-Plus/image-20211217123932091.png" alt="image-20211217123932091" loading="lazy"></p>
<p>我们现在大概能猜出来原因---应该是这玩意如果检测到空值会转换成某些最大值赋值给数据库</p>
<p>在<a href="https://baomidou.com/pages/223848/#tableid" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>中，我们可以看到一个@TableId的注解</p>
<p><img src="/images/SpringFrameWork/12-MyBatis-Plus/image-20211217124716328.png" alt="image-20211217124716328" loading="lazy"></p>
<p>也就是说，可以通过它来制定主键ID是什么样的</p>
<p>接下来测试一下：</p>
<table>
<thead>
<tr>
<th style="text-align:left">值</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">AUTO</td>
<td style="text-align:left">数据库 ID 自增</td>
</tr>
<tr>
<td style="text-align:left">NONE</td>
<td style="text-align:left">无状态，该类型为未设置主键类型（注解里等于跟随全局，全局里约等于 INPUT），默认值</td>
</tr>
<tr>
<td style="text-align:left">INPUT</td>
<td style="text-align:left">insert 前自行 set 主键值</td>
</tr>
<tr>
<td style="text-align:left">ASSIGN_ID</td>
<td style="text-align:left">分配 ID(主键类型为 Number(Long 和 Integer)或 String)(since 3.3.0),使用接口<code>IdentifierGenerator</code>的方法<code>nextId</code>(默认实现类为<code>DefaultIdentifierGenerator</code>雪花算法)</td>
</tr>
<tr>
<td style="text-align:left">ASSIGN_UUID</td>
<td style="text-align:left">分配 UUID,主键类型为 String(since 3.3.0),使用接口<code>IdentifierGenerator</code>的方法<code>nextUUID</code>(默认 default 方法)</td>
</tr>
<tr>
<td style="text-align:left"><s>ID_WORKER</s></td>
<td style="text-align:left">分布式全局唯一 ID 长整型类型(please use <code>ASSIGN_ID</code>)</td>
</tr>
<tr>
<td style="text-align:left"><s>UUID</s></td>
<td style="text-align:left">32 位 UUID 字符串(please use <code>ASSIGN_UUID</code>)</td>
</tr>
<tr>
<td style="text-align:left"><s>ID_WORKER_STR</s></td>
<td style="text-align:left">分布式全局唯一 ID 字符串类型(please use <code>ASSIGN_ID</code>)</td>
</tr>
</tbody>
</table>
<p>一看就知道要用第一个</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>value<span class="token operator">=</span><span class="token string">"id"</span><span class="token punctuation">,</span>type <span class="token operator">=</span> <span class="token class-name">IdType</span><span class="token punctuation">.</span>AUTO<span class="token punctuation">)</span>
    <span class="token comment">//这里的value对应数据库内的字段</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>结果：完美运行</p>
<p><img src="/images/SpringFrameWork/12-MyBatis-Plus/image-20211217125223213.png" alt="image-20211217125223213" loading="lazy"></p>
<p><img src="/images/SpringFrameWork/12-MyBatis-Plus/image-20211217125239536.png" alt="image-20211217125239536" loading="lazy"></p>
<h3 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> Select</h3>
<p>​</p>
<h2 id="✨mybatis-plus的相关注解" tabindex="-1"><a class="header-anchor" href="#✨mybatis-plus的相关注解" aria-hidden="true">#</a> ✨Mybatis-Plus的相关注解</h2>
<h3 id="tablename-指定实体类对应的表" tabindex="-1"><a class="header-anchor" href="#tablename-指定实体类对应的表" aria-hidden="true">#</a> @TableName-指定实体类对应的表</h3>
<p>例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@TableName</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="tableid-指定主键以及对应的生成方式" tabindex="-1"><a class="header-anchor" href="#tableid-指定主键以及对应的生成方式" aria-hidden="true">#</a> @TableId 指定主键以及对应的生成方式</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@TableName</span><span class="token punctuation">(</span><span class="token string">"sys_user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>type<span class="token operator">=</span><span class="token class-name">IdType</span><span class="token punctuation">.</span>AUTO<span class="token punctuation">)</span> <span class="token comment">// 主键自增长</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    
    
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:left">属性</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">必须指定</th>
<th style="text-align:left">默认值</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">value</td>
<td style="text-align:left">String</td>
<td style="text-align:left">否</td>
<td style="text-align:left">&quot;&quot;</td>
<td style="text-align:left">主键字段名</td>
</tr>
<tr>
<td style="text-align:left">type</td>
<td style="text-align:left">Enum</td>
<td style="text-align:left">否</td>
<td style="text-align:left">IdType.NONE</td>
<td style="text-align:left">指定主键类型</td>
</tr>
</tbody>
</table>
<p>相应属性可以看这个<a href="https://baomidou.com/pages/223848/#idtype" target="_blank" rel="noopener noreferrer">链接<ExternalLinkIcon/></a>，当然如果你懒的话</p>
<table>
<thead>
<tr>
<th style="text-align:left">值</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">AUTO</td>
<td style="text-align:left">数据库 ID 自增</td>
</tr>
<tr>
<td style="text-align:left">NONE</td>
<td style="text-align:left">无状态，该类型为未设置主键类型（注解里等于跟随全局，全局里约等于 INPUT），默认值</td>
</tr>
<tr>
<td style="text-align:left">INPUT</td>
<td style="text-align:left">insert 前自行 set 主键值</td>
</tr>
<tr>
<td style="text-align:left">ASSIGN_ID</td>
<td style="text-align:left">分配 ID(主键类型为 Number(Long 和 Integer)或 String)(since 3.3.0),使用接口<code>IdentifierGenerator</code>的方法<code>nextId</code>(默认实现类为<code>DefaultIdentifierGenerator</code>雪花算法)</td>
</tr>
<tr>
<td style="text-align:left">ASSIGN_UUID</td>
<td style="text-align:left">分配 UUID,主键类型为 String(since 3.3.0),使用接口<code>IdentifierGenerator</code>的方法<code>nextUUID</code>(默认 default 方法)</td>
</tr>
<tr>
<td style="text-align:left"><s>ID_WORKER</s></td>
<td style="text-align:left">分布式全局唯一 ID 长整型类型(please use <code>ASSIGN_ID</code>)</td>
</tr>
<tr>
<td style="text-align:left"><s>UUID</s></td>
<td style="text-align:left">32 位 UUID 字符串(please use <code>ASSIGN_UUID</code>)</td>
</tr>
<tr>
<td style="text-align:left"><s>ID_WORKER_STR</s></td>
<td style="text-align:left">分布式全局唯一 ID 字符串类型(please use <code>ASSIGN_ID</code>)</td>
</tr>
</tbody>
</table>
<h4 id="额外说明-插入时会自动给传入的对象填充id属性" tabindex="-1"><a class="header-anchor" href="#额外说明-插入时会自动给传入的对象填充id属性" aria-hidden="true">#</a> 额外说明-插入时会自动给传入的对象填充id属性</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"李四"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">"aaa.abc@dd.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token string">"插入成功"</span> <span class="token operator">:</span> <span class="token string">"插入失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>我当前是这样插入的，获取到的结果为：</p>
<p><img src="/images/SpringFrameWork/12-MyBatis-Plus/image-20211217134750080.png" alt="image-20211217134750080" loading="lazy"></p>
<h3 id="tablefiled-指定属性对应表的哪个字段" tabindex="-1"><a class="header-anchor" href="#tablefiled-指定属性对应表的哪个字段" aria-hidden="true">#</a> @TableFiled-指定属性对应表的哪个字段</h3>
<p>例如，我们实体类中是name 但在表中是user_name</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@TableName</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">IdType</span><span class="token punctuation">.</span>AUTO<span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span><span class="token string">"user_name"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>支持的东西蛮多的，直接看<a href="https://baomidou.com/pages/223848/#tablefield" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>吧</p>
<p>常用的有exists:指定某个属性将不会插入到数据库内</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@TableName</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@TableId</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">IdType</span><span class="token punctuation">.</span>AUTO<span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@TableField</span><span class="token punctuation">(</span>exists<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token comment">//指定false时 这个属性将不会被插入到数据库内</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>也就是会变成这样：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token keyword">user</span><span class="token punctuation">(</span>age<span class="token punctuation">,</span>email<span class="token punctuation">)</span> <span class="token keyword">values</span><span class="token punctuation">(</span>?<span class="token punctuation">,</span>?<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
