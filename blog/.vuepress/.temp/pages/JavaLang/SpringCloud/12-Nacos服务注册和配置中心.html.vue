<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>见名知意</p>
<p>首先是服务注册，我们首先想到的就是Eureka、Zookeeper、Consul</p>
<p>其次是配置中心，我们想到了Spring Cloud Config和Spring Cloud Bus</p>
<p>它就是来替代如上六位的</p>
<blockquote>
<p>Nacos（Naming Configuration Service）</p>
<p>一个更易于构建云原生应用的动态服务发现、配置管理和服务平台</p>
<p>Nacos就是注册中心+配置中心的组合，Nacos等价于Consul+Config+Bus</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110142942130-16417961842531.png" alt="image-20220110142942130" loading="lazy"></p>
<p>官网<a href="https://nacos.io/zh-cn/index.html" target="_blank" rel="noopener noreferrer">https://nacos.io/zh-cn/index.html<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="安装和运行nacos" tabindex="-1"><a class="header-anchor" href="#安装和运行nacos" aria-hidden="true">#</a> 安装和运行Nacos</h2>
<p>这里只演示Windows，Linux同理，Docker可以去看<a href="https://nacos.io/zh-cn/docs/quick-start.html" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>部署</p>
<p>先去下载下对应的压缩包<a href="https://github.com/alibaba/nacos/releases" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/nacos/releases<ExternalLinkIcon/></a></p>
<p>注意，需要事先准备好Jdk1.8+和Maven3.2+</p>
<p>下载解压后可以得到这些</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110144423601.png" alt="image-20220110144423601" loading="lazy"></p>
<p>启动很简单，进入到bin</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>startup.cmd -m standalone
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>standalone代表着单机模式运行，非集群模式</p>
<p>看到这样就表示成功了</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110144828637.png" alt="image-20220110144828637" loading="lazy"></p>
<p>接着访问<a href="http://localhost:8848/nacos" target="_blank" rel="noopener noreferrer">http://localhost:8848/nacos<ExternalLinkIcon/></a></p>
<p>就能看到如下内容</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110144954427.png" alt="image-20220110144954427" loading="lazy"></p>
<p><strong>默认的账号密码都是<code>nacos</code>，直接登陆即可</strong></p>
<p>登陆后可以看到如下页面</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110145113196.png" alt="image-20220110145113196" loading="lazy"></p>
<p>我React亮了，说明这玩意是一个React前端Project，应该是用了阿里自家的Ant Design For React框架</p>
<p>IEDA插件alibaba  cloud toolkit 目前看很多人说可以装 不过我也不知道有啥用 先不装了</p>
<h2 id="服务提供者注册" tabindex="-1"><a class="header-anchor" href="#服务提供者注册" aria-hidden="true">#</a> 服务提供者注册</h2>
<h3 id="父pom依赖准备" tabindex="-1"><a class="header-anchor" href="#父pom依赖准备" aria-hidden="true">#</a> 父pom依赖准备</h3>
<p>参照官方文档<a href="https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html" target="_blank" rel="noopener noreferrer">https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html<ExternalLinkIcon/></a></p>
<p>为了防止我眼花，我这里新建一个Project</p>
<p>根据官网，我这里要现在父工程添加上依赖，依赖是在<a href="https://github.com/alibaba/spring-cloud-alibaba" target="_blank" rel="noopener noreferrer">github<ExternalLinkIcon/></a>上面看</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-alibaba-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.7.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>切记 一定要在github上看到的依赖 才是最新的 spring那不是最新的.,</p>
<p><strong>并且上面这样还不行</strong>，官文内这样说：</p>
<blockquote>
<p>项目版本号为xxx形式，其中x为数字，从0开始，不限于0~9范围。项目处于孵化器阶段时，版本号为0.xx</p>
<p>由于 Spring Boot 1 和 Spring Boot 2 的接口和注解在 Actuator 模块中发生了很大的变化，而 spring-cloud-commons 从 1.xx 到 2.0.0 也发生了很大的变化，我们采用相同的版本规则为SpringBoot 版本号。</p>
<ul>
<li>1.5.x 用于 Spring Boot 1.5.x</li>
<li>2.0.x 用于 Spring Boot 2.0.x</li>
<li>2.1.x 用于 Spring Boot 2.1.x</li>
<li>2.2.x 用于 Spring Boot 2.2.x</li>
<li>2020.x 用于 Spring Boot 2.4.x</li>
<li>所以我现在用的2.5.8的springboot应该用2021.x 为了防止万一就用2021.1吧</li>
</ul>
<p>然后我看了下官方<a href="https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E" target="_blank" rel="noopener noreferrer">wiki<ExternalLinkIcon/></a>的版本推荐，草太乱了，我还是用这上面的SPring文档来整</p>
<p>反正最终我的那玩意版本是2021.1</p>
</blockquote>
<p>最终root pom：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">></span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>31-cloud-alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>packaging</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>packaging</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modules</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span><span class="token punctuation">></span></span>cloud-alibaba-provider-payment-9001<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>module</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modules</span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--    统一管理Jar包版本--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project.build.sourceEncoding</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project.build.sourceEncoding</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>spring.cloud-version</span><span class="token punctuation">></span></span>2020.0.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>spring.cloud-version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>spring.boot.version</span><span class="token punctuation">></span></span>2.5.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>spring.boot.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>spring.boot.alibaba.version</span><span class="token punctuation">></span></span>2021.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>spring.boot.alibaba.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mysql.version</span><span class="token punctuation">></span></span>8.0.27<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mysql.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>druid-spring-boot-starter.version</span><span class="token punctuation">></span></span>1.2.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>druid-spring-boot-starter.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>junit.version</span><span class="token punctuation">></span></span>5.8.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>junit.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mybatis.plus.version</span><span class="token punctuation">></span></span>3.4.3.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mybatis.plus.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>lombok.version</span><span class="token punctuation">></span></span>1.18.22<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>lombok.version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>springfox-swagger.version</span><span class="token punctuation">></span></span>3.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>springfox-swagger.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--    引入依赖dependencyManagement 是锁定版本 让子工程不用写groupId和version --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--            spring boot 版本控制--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${spring.boot.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--            spring cloud 版本控制--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${spring.cloud-version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-alibaba-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${spring.boot.alibaba.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mysql.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${druid-spring-boot-starter.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.baomidou<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-plus-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mybatis.plus.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--junit--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.junit.jupiter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit-jupiter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${junit.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${lombok.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.springfox<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>springfox-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${springfox-swagger.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>


    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br></div></div><h3 id="子项目9001搭建" tabindex="-1"><a class="header-anchor" href="#子项目9001搭建" aria-hidden="true">#</a> 子项目9001搭建</h3>
<p>好了，接下来创建<code>cloud-alibaba-provider-payment-9001</code>，添加如下依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
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

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>然后配置下配置文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token comment"># 配置nacos</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
<span class="token comment"># 暴露监控端口</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>接着一个main</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CloudNacos9001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">CloudNacos9001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>再来一个controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${server.port}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverPort<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/nacos/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPayment</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"nacos registry, serverPort: "</span> <span class="token operator">+</span> serverPort <span class="token operator">+</span> <span class="token string">"\t id"</span> <span class="token operator">+</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>好了，接下来我们启动这个module，然后进入nacos看看</p>
<p>为了方便之后查看，我给nacos添加一个host</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>127.0.0.1 mynacos.com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>可以看到，服务成功注册</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110164428972.png" alt="image-20220110164428972" loading="lazy"></p>
<p>接下来访问下</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110164535145.png" alt="image-20220110164535145" loading="lazy"></p>
<h3 id="服务提供者9002的快速构建" tabindex="-1"><a class="header-anchor" href="#服务提供者9002的快速构建" aria-hidden="true">#</a> 服务提供者9002的快速构建</h3>
<p>我们这里再建立一个9002来模拟负载均衡</p>
<p>这里我就懒得多弄一个9002了</p>
<p>首先，我们打开idea</p>
<p>在服务这里（如果你的9001启动不是在服务而是在运行那里的话）</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110165319308.png" alt="image-20220110165319308" loading="lazy"></p>
<p>点进去，搜spring 找到 spring boot 添加即可</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110165346610.png" alt="image-20220110165346610" loading="lazy"></p>
<p>然后右键它</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110165411157.png" alt="image-20220110165411157" loading="lazy"></p>
<p>然后这样配置</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110170010504.png" alt="image-20220110170010504" loading="lazy"></p>
<p>接着你就能得到两个微服务 注意 <strong>这不能在生产环境中使用！！！</strong></p>
<p>当然 你也可以选择也可以用<code>-Dspring.profiles.active=</code>，也就是配置<code>spring.profiles.active</code>的方式来动态切换，下面会说</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110170028078.png" alt="image-20220110170028078" loading="lazy"></p>
<p>在Nacos中也能看到</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110170102206.png" alt="image-20220110170102206" loading="lazy"></p>
<p>接下来换一种方式吧，使用profile 更方便的我们自定义内容</p>
<p>我们先创建两个application</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110171451266.png" alt="image-20220110171451266" loading="lazy"></p>
<p>9001和9002</p>
<p>9001的内容</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>9002同理</p>
<p>接着在application.yaml中添加内容</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token comment"># 配置nacos</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
  <span class="token comment"># 默认使用9001内的相关配置 这些配置会覆盖application.yaml内的</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> <span class="token number">9001</span>
<span class="token comment"># 暴露监控端口</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>当然第一二行看不顺眼的话可以删了</p>
<p>接着运行 然后依旧是复制一份 改下vm配置</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110171710633.png" alt="image-20220110171710633" loading="lazy"></p>
<p>然后就可以了</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110171719292.png" alt="image-20220110171719292" loading="lazy"></p>
<p>你就能得到两个</p>
<p>运行起来效果也是跟之前一样的，一般这样使用的比较多，因为通过profile的方式我们可以更加自由的自定义一些其他东西</p>
<p>nacos内正常显示</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110171819338.png" alt="image-20220110171819338" loading="lazy"></p>
<h3 id="服务消费者80" tabindex="-1"><a class="header-anchor" href="#服务消费者80" aria-hidden="true">#</a> 服务消费者80</h3>
<p>我们新建一个module：<code>cloud-alibaba-consumer-payment-80</code></p>
<p>依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>接着，写下配置文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>order<span class="token punctuation">-</span>consumer
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> mynacos.com<span class="token punctuation">:</span><span class="token number">8848</span>

<span class="token comment"># 这里是等下要调用的（Controller中的链接）</span>
<span class="token key atrule">service-url</span><span class="token punctuation">:</span>
  <span class="token key atrule">nacos-user-service</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>然后创建main</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer80Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Consumer80Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>接着注册下restTemplate</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>然后写一个controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${service-url.nacos-user-service}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> serverURL<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/nacos/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span>serverURL <span class="token operator">+</span> <span class="token string">"/payment/nacos/"</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>接着访问即可</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110182348674.png" alt="image-20220110182348674" loading="lazy"></p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110182355351.png" alt="image-20220110182355351" loading="lazy"></p>
<h3 id="负载均衡遇到的坑" tabindex="-1"><a class="header-anchor" href="#负载均衡遇到的坑" aria-hidden="true">#</a> 负载均衡遇到的坑</h3>
<p>md这个坑 困扰了我十多分钟</p>
<p>如果你用的是较新版本的<code>spring-cloud-starter-alibaba-nacos-discovery</code>，则上面中，访问80端口的<code>/payment/nacos/{id}</code>会报错，解决方法有两种</p>
<p>首先我们的得知道问题在哪里，先看看nacos的依赖</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110182528922.png" alt="image-20220110182528922" loading="lazy"></p>
<p>新版本spring-cloud-alibaba-dependencies（version 2021.1）内是没有ribbon和loadbalancer，因此无法实现负载均衡</p>
<p>所以我们现在有两个解决方案</p>
<ol>
<li>
<p>添加loadbalancer的依赖（Spring现在对ribbon不再支持也不推荐用了 可以用但是配置起来比较麻烦），添加完就可以正常的负载均衡</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-loadbalancer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
<li>
<p>添加OpenFegin和loadbalancer，因为OpenFegin是不带负载均衡的，所以也要手动装依赖</p>
<ol>
<li>
<p>添加依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-loadbalancer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li>
<li>
<p>注册service</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span><span class="token string">"nacos-payment-provider"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentFeignService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/nacos/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li>
<li>
<p>调用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">PaymentFeignService</span> paymentFeignService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/nacos/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> paymentFeignService<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></li>
</ol>
</li>
</ol>
<h2 id="nacos服务中心对比提升" tabindex="-1"><a class="header-anchor" href="#nacos服务中心对比提升" aria-hidden="true">#</a> Nacos服务中心对比提升</h2>
<table>
<thead>
<tr>
<th>组件名</th>
<th>语言</th>
<th>CAP</th>
<th>服务健康检查</th>
<th>对外暴露接口</th>
<th>Spring Cloud集成</th>
</tr>
</thead>
<tbody>
<tr>
<td>Eureka</td>
<td>Java</td>
<td>AP</td>
<td>可配支持</td>
<td>HTTP，有web界面</td>
<td>已集成</td>
</tr>
<tr>
<td>Consul</td>
<td>Go</td>
<td>CP</td>
<td>支持</td>
<td>HTTP/DNS，有web界面</td>
<td>已集成</td>
</tr>
<tr>
<td>Zookeeper</td>
<td>Java</td>
<td>CP</td>
<td>支持</td>
<td>客户端</td>
<td>已集成</td>
</tr>
<tr>
<td>Nacos</td>
<td>Java</td>
<td>AP/CP</td>
<td>支持</td>
<td>HTTP/DNS/UDP，有Web界面</td>
<td>已集成</td>
</tr>
</tbody>
</table>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110204438870.png" alt="image-20220110204438870" loading="lazy"></p>
<p>如何选择是AP还是CP？</p>
<ul>
<li>如果不需要存储服务级别的信息且服务实例时通过nacos-client注册， 并能够保持上报心跳，那么就可以选择AP模式，当前主流的Spring Cloud 和 Dubbo都适用于AP模式，AP模式为了服务的可能性而削减了一致性，因此AP模式只支持注册临时实例</li>
<li>如果需要在服务级别编辑或存储配置信息，那么CP是必须，K8s服务和DNS服务则适用于CP模式，CP模式下则支持注册持久化实例，此时则是以Raft协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误</li>
</ul>
<p>如何切换？</p>
<p>默认是AP，执行如下命令可以切换到CP 不过我们通常情况下没必要切换</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -X PUT <span class="token string">'$NACOS_SERVER:8848/nacos/v1/ns/operator/switches?entry=serverMode&amp;value=CP'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="nacos作为配置中心-基础配置" tabindex="-1"><a class="header-anchor" href="#nacos作为配置中心-基础配置" aria-hidden="true">#</a> Nacos作为配置中心-基础配置</h2>
<p>没错，这玩意还能拿来做配置中心的</p>
<h3 id="依赖准备" tabindex="-1"><a class="header-anchor" href="#依赖准备" aria-hidden="true">#</a> 依赖准备</h3>
<p>我们首先创建一个cloud-alibaba-config-nacos-client-3377</p>
<p>然后填入如下依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        Nacos Config--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-config<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        Nacos--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        Spring CLoud Bootstrap 用于支持配置文件的优先加载 这个老版本不用（2.x.x）,新版本（2021.x，2020.x）开始都需要--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bootstrap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        Web + Actuator--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        LomBok--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="配置文件和对应类" tabindex="-1"><a class="header-anchor" href="#配置文件和对应类" aria-hidden="true">#</a> 配置文件和对应类</h3>
<p>我们要准备两个配置文件</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110210905360.png" alt="image-20220110210905360" loading="lazy"></p>
<p>这也是他们设计的时候考虑到的事情，目的就是为了让Config和Nacos之间的迁移变得更加简单</p>
<p>Spring 2.4以后需要加入spring-cloud-starter-bootstrap依赖</p>
<p>bootstrap</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3377</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>config<span class="token punctuation">-</span>client
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token comment"># 连接服务中心</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> mynacos.com<span class="token punctuation">:</span><span class="token number">8848</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token comment"># 连接配置中心</span>
          <span class="token comment">#Nacos作为配置中心的地址</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> mynacos.com<span class="token punctuation">:</span><span class="token number">8848</span>
          <span class="token comment"># 指定yaml格式的配置文件</span>
        <span class="token key atrule">file-extension</span><span class="token punctuation">:</span> yaml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>application</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token comment"># 表示开发环境</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>启动类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NacosConfig3377Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">NacosConfig3377Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Project</span><span class="token punctuation">.</span>controller<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Value</span><span class="token punctuation">;</span>
<span class="token comment">// 注意是这个 别导错了</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>context<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RefreshScope</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">GetMapping</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * RefreshScope 支持Nacos的动态刷新功能 这个是SpringCLoud的原生注解 Nacos对齐做了兼容
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RefreshScope</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigClientController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${config.info}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> configInfo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/config/info"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConfigInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> configInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="编辑启动配置" tabindex="-1"><a class="header-anchor" href="#编辑启动配置" aria-hidden="true">#</a> 编辑启动配置</h3>
<p>我们参考官方文档<a href="https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html" target="_blank" rel="noopener noreferrer">https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html<ExternalLinkIcon/></a></p>
<p>里面是这样说的</p>
<blockquote>
<p>在 Nacos Spring Cloud 中，<code>dataId</code> 的完整格式如下：</p>
<div class="language-plain ext-plain line-numbers-mode"><pre v-pre class="language-plain"><code>${prefix}-${spring.profiles.active}.${file-extension}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li><code>prefix</code> 默认为 <code>spring.application.name</code> 的值，也可以通过配置项 <code>spring.cloud.nacos.config.prefix</code>来配置。</li>
<li><code>spring.profiles.active</code> 即为当前环境对应的 profile，详情可以参考 <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html#boot-features-profiles" target="_blank" rel="noopener noreferrer">Spring Boot文档<ExternalLinkIcon/></a>。 <strong>注意：当 <code>spring.profiles.active</code> 为空时，对应的连接符 <code>-</code> 也将不存在，dataId 的拼接格式变成 <code>${prefix}.${file-extension}</code></strong></li>
<li><code>file-exetension</code> 为配置内容的数据格式，可以通过配置项 <code>spring.cloud.nacos.config.file-extension</code> 来配置。目前只支持 <code>properties</code> 和 <code>yaml</code> 类型。</li>
</ul>
<p>通过 Spring Cloud 原生注解 <code>@RefreshScope</code> 实现配置自动更新：</p>
</blockquote>
<p>也就是说，我们配置的应用名称就为前缀，我们配置的spring.profiles.active就是中间的东西，我们之前设置的yaml就是后缀</p>
<p>所以说我们的3344实际上的对应的是<code>nacos-config-client-dev.yaml</code></p>
<p>最后的公式为</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接下来，我们进入那nacos的网页，进行设置</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110213603115.png" alt="image-20220110213603115" loading="lazy"></p>
<p>然后新增，填入我们刚刚推断出来的内容，并选择格式</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214104213.png" alt="image-20220110214104213" loading="lazy"></p>
<p>接着可以得到这个 注意 这里的那啥ID的名字结尾<strong>必须</strong>是<code>yaml</code>，不能是<code>yml</code>（因为我们之前在file-extension内定义的是yaml，所以必须是这个，<strong>如果说你之前定义的是yml，则这里必须为yml</strong>）</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214518643.png" alt="image-20220110214518643" loading="lazy"></p>
<p>然后启动项目，尝试run一下</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214121163.png" alt="image-20220110214121163" loading="lazy"></p>
<p>看起来没有问题了，接下来尝试下更新后能不能访问到最新的</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"Hello 这里是Dev的配置文件啊啊啊啊"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214236341.png" alt="image-20220110214236341" loading="lazy"></p>
<p>我曹 不用重启，同步更新</p>
<p>总结：</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110214449502.png" alt="image-20220110214449502" loading="lazy"></p>
<h3 id="如果无法正常的获取到配置中心的内容" tabindex="-1"><a class="header-anchor" href="#如果无法正常的获取到配置中心的内容" aria-hidden="true">#</a> 如果无法正常的获取到配置中心的内容</h3>
<p>如果说你这样无法获取配置中心的内容的话(读取的时候不报错，但是最终读取出来的是null或者空白)</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RefreshScope</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigClientController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${config.info}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> configInfo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/config/info"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConfigInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> configInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>加上一个字段即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RefreshScope</span><span class="token punctuation">(</span>proxyMode <span class="token operator">=</span> <span class="token class-name">ScopedProxyMode</span><span class="token punctuation">.</span>DEFAULT<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigClientController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${config.info}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> configInfo<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/config/info"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getConfigInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> configInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="nacos作为配置中心-分类配置" tabindex="-1"><a class="header-anchor" href="#nacos作为配置中心-分类配置" aria-hidden="true">#</a> Nacos作为配置中心-分类配置</h2>
<h3 id="概念引出" tabindex="-1"><a class="header-anchor" href="#概念引出" aria-hidden="true">#</a> 概念引出</h3>
<p>实际上我们开发中通常会准备</p>
<blockquote>
<p>dev开发环境</p>
<p>test测试环境</p>
<p>prod生产环境</p>
</blockquote>
<p>如何保证指定环境启动时服务能正确读取到Nacos上对应环境的配置文件呢？</p>
<p>或者说</p>
<blockquote>
<p>一个大型分布式微服务系统会有很多微服务子项目</p>
<p>每个微服务项目又都会有相应的开发环境、测试环境、预发环境、正式环境….</p>
<p>那么怎么对这些微服务配置进行管理呢？</p>
</blockquote>
<p>我们之前在配置文件的时候，有一个东西并没有说</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110221116379.png" alt="image-20220110221116379" loading="lazy"></p>
<p>这个GROUP</p>
<p>我们只需要对这个东西进行配置，即可完成分类配置</p>
<p>在这之前，我们首先要了解下命名空间</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110221240152.png" alt="image-20220110221240152" loading="lazy"></p>
<p>在Nacos中，有三大块，分别是Namespace+Group+DATAID，其中DATAID我们之前已经用过了，Group刚刚也提到了，Namespace嘛，这个如果你接触过C# 或者C++之类的，应该对齐不陌生</p>
<p>就相当于是Java中的包</p>
<ul>
<li>Namespace===&gt;Java的package</li>
<li>Group===&gt;Java的类</li>
<li>DataID====&gt;类中的属性</li>
</ul>
<p>Group和DataID是拿来逻辑上区分两个目标对象的</p>
<p>他们三者的关系如下</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110221551421.png" alt="image-20220110221551421" loading="lazy"></p>
<p>默认的情况下：</p>
<ul>
<li>Namespace=<code>public</code></li>
<li>Group=<code>DEFAULT_GROUP</code></li>
<li>Cluster=<code>DEFAULT</code></li>
</ul>
<p>接下来具体说说</p>
<ul>
<li>Nacos默认的命名空间是public，命名空间这玩意主要是用来实现隔离
<ul>
<li>比方说我们现在有个三个环境：开发、测试、生产环境，我们就可以创建三个namespace，不同的namespace之间是隔离的</li>
</ul>
</li>
<li>Group默认是<code>DEFAULT_GROUP</code>，这玩意可以把不同的微服务划分到一个分组里面去（就像之前的Stream那样，把几个相同类型的微服务统一指定分组）</li>
<li>Service就是微服务
<ul>
<li>一个Service可以包含多个Cluster（集群），Nacos的Cluster默认是Default，Cluster是对指定的微服务的一个虚拟划分</li>
<li>比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，这个时候就可以给杭州机房的Service微服务起一个集群名称（HZ），给广州机房的service微服务起一个集群名称（GZ），还可以尽量让同一个机房的微服务互相调用，以提升性能</li>
</ul>
</li>
<li>最后的instance，就是微服务的实例</li>
</ul>
<p>具体的可以看看官方文档<a href="https://www.yuque.com/nacos/ebook/ynstox" target="_blank" rel="noopener noreferrer">https://www.yuque.com/nacos/ebook/ynstox<ExternalLinkIcon/></a>，超级详细</p>
<h3 id="dataid的方案" tabindex="-1"><a class="header-anchor" href="#dataid的方案" aria-hidden="true">#</a> DataID的方案</h3>
<p>三步</p>
<ol>
<li>指定spring.profile.active和配置文件的DataID来使不同环境下读取不同的配置，这个也是最常用的</li>
<li>默认空间+默认分组+新建dev和test两个DataID</li>
<li>通过spring.profile.active属性就能进行多环境下配置文件的读取</li>
</ol>
<p>接下来开始</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># dev</span>
<span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"这里是dev的配置nacos-config-client-dev.yaml"</span>

<span class="token comment"># test</span>
<span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"这里是test的配置nacos-config-client-test.yaml"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110222837191.png" alt="image-20220110222837191" loading="lazy"></p>
<p>接下来使用，我们只需要去修本地项目中对应的application内的值即可</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token comment"># 表示开发环境</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>当然 这样比较麻烦</p>
<p>我选择IDEA中的附加vm</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110223037564.png" alt="image-20220110223037564" loading="lazy"></p>
<p>在vm选项中输入如下内容</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>-Dspring.profiles.active=test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>也就是这样</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110223152016.png" alt="image-20220110223152016" loading="lazy"></p>
<p>接着启动并访问，就能得到</p>
<div class="language-http ext-http line-numbers-mode"><pre v-pre class="language-http"><code>GET http://localhost:3377/config/info

HTTP/1.1 200 
<span class="token header"><span class="token header-name keyword">Content-Type</span><span class="token punctuation">:</span> <span class="token header-value">text/plain;charset=UTF-8</span></span>
<span class="token header"><span class="token header-name keyword">Content-Length</span><span class="token punctuation">:</span> <span class="token header-value">51</span></span>
<span class="token header"><span class="token header-name keyword">Date</span><span class="token punctuation">:</span> <span class="token header-value">Mon, 10 Jan 2022 14:32:12 GMT</span></span>
<span class="token header"><span class="token header-name keyword">Keep-Alive</span><span class="token punctuation">:</span> <span class="token header-value">timeout=60</span></span>
<span class="token header"><span class="token header-name keyword">Connection</span><span class="token punctuation">:</span> <span class="token header-value">keep-alive</span></span>

这里是test的配置nacos-config-client-test.yaml

Response code: 200; Time: 97ms; Content length: 39 bytes
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="group方案" tabindex="-1"><a class="header-anchor" href="#group方案" aria-hidden="true">#</a> Group方案</h3>
<p>根据我们之前的了解，可以知道，是有一个默认的group---<code>DEFAULT_GROUP</code>，所以我们的实现理论上需要三步</p>
<ol>
<li>新建group</li>
<li>在nacos中配置对应group内的DataID</li>
<li>然后再到bootstrap和application配置文件内进行修改</li>
</ol>
<p>其实非常简单，我们只需要在新建配置的时候手动输入即可</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224301586.png" alt="image-20220110224301586" loading="lazy"></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"这里是来自DEV_GROUP内的nacos-config-client-info.yaml"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>创建完毕后，多了一个Group</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224316269.png" alt="image-20220110224316269" loading="lazy"></p>
<p>我们再来一个</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224512764-16418259138501.png" alt="image-20220110224512764" loading="lazy"></p>
<p>最终得到了两个不同的组</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224539709.png" alt="image-20220110224539709" loading="lazy"></p>
<p>他们现在我们有两个dataid一样的，但是group不一样的配置文件</p>
<p>接下来的修改非常简单</p>
<p>首先在bootstrap内增加一条group的配置</p>
<p><code>spring.cloud.nacos.config.group=组名</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3377</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>config<span class="token punctuation">-</span>client
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token comment"># 连接服务中心</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> mynacos.com<span class="token punctuation">:</span><span class="token number">8848</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token comment"># 连接配置中心</span>
          <span class="token comment">#Nacos作为配置中心的地址</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> mynacos.com<span class="token punctuation">:</span><span class="token number">8848</span>
          <span class="token comment"># 指定yaml格式的配置文件</span>
        <span class="token key atrule">file-extension</span><span class="token punctuation">:</span> yaml
        <span class="token comment"># 指定组</span>
        <span class="token key atrule">group</span><span class="token punctuation">:</span> DEV_GROUP
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>然后别忘了修改下application，让其的active指向我们刚刚创建的info</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> info
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>接下来启动测试</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110224913873.png" alt="image-20220110224913873" loading="lazy"></p>
<p>dev的获取到了，接下来修改下vm选项然后重启试试</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>-Dspring.cloud.nacos.config.group=TEST_GROUP
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225015785.png" alt="image-20220110225015785" loading="lazy"></p>
<p>成功获取</p>
<p>总结：</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225042704.png" alt="image-20220110225042704" loading="lazy"></p>
<h3 id="namespace方案" tabindex="-1"><a class="header-anchor" href="#namespace方案" aria-hidden="true">#</a> Namespace方案</h3>
<ol>
<li>新建对应的namespace</li>
<li>按照域名配置填写</li>
</ol>
<p>我们新建命名空间非常简单，只需要</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225801344.png" alt="image-20220110225801344" loading="lazy"></p>
<p>第一个ID通常让其自动生成即可，接着如法炮制一个test</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225844405.png" alt="image-20220110225844405" loading="lazy"></p>
<p>接着回到配置管理</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225859430.png" alt="image-20220110225859430" loading="lazy"></p>
<p>可以看得到多出了我们刚刚创建的</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110225913120.png" alt="image-20220110225913120" loading="lazy"></p>
<p>点进去啥也没有我们现在开始给dev和test添加配置吧</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"这里是dev命名空间的nacos-config-client-info.yaml"</span>

<span class="token comment"># 分割</span>
<span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">info</span><span class="token punctuation">:</span> <span class="token string">"这里是test命名空间的nacos-config-client-info.yaml"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110230053271.png" alt="image-20220110230053271" loading="lazy"></p>
<p>我现在的命名空间是这样的</p>
<table>
<thead>
<tr>
<th style="text-align:left">命名空间名称</th>
<th style="text-align:left">命名空间ID</th>
<th style="text-align:left">配置数</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">public(保留空间)</td>
<td style="text-align:left"></td>
<td style="text-align:left">4</td>
</tr>
<tr>
<td style="text-align:left">dev</td>
<td style="text-align:left">4699fa93-f7ec-404c-b2d5-d520b20d3972</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">test</td>
<td style="text-align:left">e0649097-a3bd-4e60-a40c-3d9161fd63cc</td>
<td style="text-align:left">1</td>
</tr>
</tbody>
</table>
<p>接着返回我们的boostrap，添加如下配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3377</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>config<span class="token punctuation">-</span>client
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token comment"># 连接服务中心</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> mynacos.com<span class="token punctuation">:</span><span class="token number">8848</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token comment"># 连接配置中心</span>
          <span class="token comment">#Nacos作为配置中心的地址</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> mynacos.com<span class="token punctuation">:</span><span class="token number">8848</span>
          <span class="token comment"># 指定yaml格式的配置文件</span>
        <span class="token key atrule">file-extension</span><span class="token punctuation">:</span> yaml
        <span class="token comment"># 这里的namespace是配置中心的namespace的id</span>
        <span class="token key atrule">namespace</span><span class="token punctuation">:</span> 4699fa93<span class="token punctuation">-</span>f7ec<span class="token punctuation">-</span>404c<span class="token punctuation">-</span>b2d5<span class="token punctuation">-</span>d520b20d3972
        <span class="token comment">#group: DEV_GROUP  如果有需要的话 group也可以填上</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>配置的路径为：<code>spring.cloud.nacos.config.namespace=命名空间ID</code></p>
<p>接着启动（如果之前配置过vm记得删了）</p>
<p>测试</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110230619129.png" alt="image-20220110230619129" loading="lazy"></p>
<p>切换成Test:</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>-Dspring.cloud.nacos.config.namespace=你的Test命名空间ID
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>测试：</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110230736784.png" alt="image-20220110230736784" loading="lazy"></p>
<p>注意 一般情况下 都是三者一块使用，而不是像我这些案例一样配合着使用</p>
<h3 id="总结分类配置" tabindex="-1"><a class="header-anchor" href="#总结分类配置" aria-hidden="true">#</a> 总结分类配置</h3>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># 分DataId</span>
<span class="token attr-name">spring.profiles.active</span><span class="token punctuation">=</span><span class="token attr-value">test</span>
<span class="token comment"># 分组</span>
<span class="token attr-name">spring.cloud.nacos.config.group</span><span class="token punctuation">=</span><span class="token attr-value">TEST_GROUP</span>
<span class="token comment"># 分命名空间</span>
<span class="token attr-name">pring.cloud.nacos.config.namespace</span><span class="token punctuation">=</span><span class="token attr-value">test</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="✨nacos集群和持久化" tabindex="-1"><a class="header-anchor" href="#✨nacos集群和持久化" aria-hidden="true">#</a> ✨Nacos集群和持久化</h2>
<p>这是从Spring cloud开始的第一个✨标，足以证明重要程度</p>
<p>实际开发中，如果要用上Nacos，最少要三台</p>
<p>参考文档<a href="https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html" target="_blank" rel="noopener noreferrer">https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html<ExternalLinkIcon/></a></p>
<p>首先是一张图和三句话</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/deployDnsVipMode-16418282349783.jpg" alt="deployDnsVipMode.jpg" loading="lazy"></p>
<p><code>http://ip1:port/openAPI</code> 直连ip模式，机器挂则需要修改ip才可以使用。</p>
<p><code>http://SLB:port/openAPI</code> 挂载SLB模式(内网SLB，不可暴露到公网，以免带来安全风险)，直连SLB即可，下面挂server真实ip，可读性不好。</p>
<p><code>http://nacos.com:port/openAPI</code> 域名 + SLB模式(内网SLB，不可暴露到公网，以免带来安全风险)，可读性好，而且换ip方便，推荐模式</p>
<p>这里的SLB(Server Load Balancer 是不是瞬间明白了)之前写的是VIP(virtual ip，虚拟IP)</p>
<p>也就是，通过nginx之类的工具反代，打到负载均衡</p>
<p>并且还需要配置<strong>数据库</strong></p>
<p>所以我们最终的样子应该是</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110232922725.png" alt="image-20220110232922725" loading="lazy"></p>
<p>到了这里 你可能会有疑问 那之前nacos用的是啥来存储数据</p>
<p>我们看看nacos的文件</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110233202948.png" alt="image-20220110233202948" loading="lazy"></p>
<p>conf里有好几个sql文件…啊这说明它有一个内嵌式的数据库derby（非常小巧，有点像是sqllite）</p>
<p>在它的<a href="https://github.com/alibaba/nacos/blob/develop/pom.xml" target="_blank" rel="noopener noreferrer">GitHub仓库<ExternalLinkIcon/></a>内的Pom文件中可以看到如下内容</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- JDBC libs --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${mysql-connector-java.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.derby<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>derby<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${derby.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--接着看看版本--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mysql-connector-java.version</span><span class="token punctuation">></span></span>8.0.21<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mysql-connector-java.version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>derby.version</span><span class="token punctuation">></span></span>10.14.2.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>derby.version</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>数据库5.7 nacos 1.4.1  需要在密码用户上加上.0在不报错</p>
<p>而且在官方文档中，可以发现，目前我们只能给他mysql数据库</p>
<h3 id="持久化的数据库配置" tabindex="-1"><a class="header-anchor" href="#持久化的数据库配置" aria-hidden="true">#</a> 持久化的数据库配置</h3>
<p>首先，我们打开nacos的conf文件夹</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110234759443.png" alt="image-20220110234759443" loading="lazy"></p>
<p>把这个sql文件执行</p>
<p>命令行方式</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mysql -u账号 -p密码
<span class="token comment"># 然后要先创建一个数据库 名字是固定的</span>
create database nacos_config<span class="token punctuation">;</span>
use nacos_config<span class="token punctuation">;</span>
<span class="token builtin class-name">source</span> 路径xxxx文件.sql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110235523555.png" alt="image-20220110235523555" loading="lazy"></p>
<p>最终的表结构应该是：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">tables</span><span class="token punctuation">;</span>
<span class="token comment"># 结果：</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token operator">|</span> Tables_in_nacos_config <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token operator">|</span> config_info            <span class="token operator">|</span>
<span class="token operator">|</span> config_info_aggr       <span class="token operator">|</span>
<span class="token operator">|</span> config_info_beta       <span class="token operator">|</span>
<span class="token operator">|</span> config_info_tag        <span class="token operator">|</span>
<span class="token operator">|</span> config_tags_relation   <span class="token operator">|</span>
<span class="token operator">|</span> group_capacity         <span class="token operator">|</span>
<span class="token operator">|</span> his_config_info        <span class="token operator">|</span>
<span class="token operator">|</span> permissions            <span class="token operator">|</span>
<span class="token operator">|</span> roles                  <span class="token operator">|</span>
<span class="token operator">|</span> tenant_capacity        <span class="token operator">|</span>
<span class="token operator">|</span> tenant_info            <span class="token operator">|</span>
<span class="token operator">|</span> users                  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------------+</span>
<span class="token number">12</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span> <span class="token punctuation">(</span><span class="token number">0.04</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>接着，我们打开conf下的这个配置文件</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220110235817256-16418302993504.png" alt="image-20220110235817256" loading="lazy"></p>
<p>按照文档的要求，配置如下内容</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment">#*************** Config Module Related Configurations ***************#</span>
<span class="token comment">### If use MySQL as datasource:</span>
<span class="token attr-name">spring.datasource.platform</span><span class="token punctuation">=</span><span class="token attr-value">mysql</span>

<span class="token comment">### Count of DB: 这个和上面的是固定的</span>
<span class="token attr-name">db.num</span><span class="token punctuation">=</span><span class="token attr-value">1</span>

<span class="token comment">### Connect URL of DB: 这里你自由发挥 后面的那啥路径不要动 就动ip和端口和数据库 database一定要选择刚刚通过脚本创建的哪个</span>
<span class="token attr-name">db.url.0</span><span class="token punctuation">=</span><span class="token attr-value">jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;useUnicode=true&amp;useSSL=false&amp;serverTimezone=UTC</span>
<span class="token attr-name">db.user.0</span><span class="token punctuation">=</span><span class="token attr-value">nacos</span>
<span class="token attr-name">db.password.0</span><span class="token punctuation">=</span><span class="token attr-value">nacos</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>我的最终配置</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">spring.datasource.platform</span><span class="token punctuation">=</span><span class="token attr-value">mysql</span>

<span class="token attr-name">db.num</span><span class="token punctuation">=</span><span class="token attr-value">1</span>
<span class="token attr-name">db.url.0</span><span class="token punctuation">=</span><span class="token attr-value">jdbc:mysql://localhost:3306/nacos_config?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;useUnicode=true&amp;useSSL=false&amp;serverTimezone=UTC</span>
<span class="token attr-name">db.user.0</span><span class="token punctuation">=</span><span class="token attr-value">root</span>
<span class="token attr-name">db.password.0</span><span class="token punctuation">=</span><span class="token attr-value">123456</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>接着我们重启nacos</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./shutdown.cmd
./startup.cmd -m standalone
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>之前我们配置过的信息如下</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111000418726.png" alt="image-20220111000418726" loading="lazy"></p>
<p>重启后</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111000718543.png" alt="image-20220111000718543" loading="lazy"></p>
<p>全都没了，说明我们配置数据库成功了</p>
<p>如果说你想要自定义数据库版本的话：</p>
<ol>
<li>去下载一个mysql-connector-java-你想要的版本.jar</li>
<li>放在nacos\plugins\mysql目录下</li>
<li>例如5.7</li>
<li>mysql8.0+后面加上时区serverTimezone=UTC 不加百分百报错</li>
</ol>
<p>接着我们随便新建一个Data项，名为<code>aaa.yaml</code>，再去看看数据库</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111001121547.png" alt="image-20220111001121547" loading="lazy"></p>
<p>内容就是content</p>
<h3 id="集群搭建-下载nacos" tabindex="-1"><a class="header-anchor" href="#集群搭建-下载nacos" aria-hidden="true">#</a> 集群搭建-下载nacos</h3>
<p>我们要搭建集群，需要准备</p>
<ul>
<li>一个Nginx</li>
<li>最少要三个Nacos注册中心</li>
<li>一个Mysql</li>
</ul>
<blockquote>
<p>下载解压nacos</p>
</blockquote>
<p>首先，到Github上面下载<a href="https://github.com/alibaba/nacos/releases" target="_blank" rel="noopener noreferrer">https://github.com/alibaba/nacos/releases<ExternalLinkIcon/></a>对应的包</p>
<p>然后如果你没有安装java或者maven的话</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装java</span>
<span class="token comment"># OpenJDK</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> openjdk-8-jdk
java --version

<span class="token comment"># oracle Java JDK</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> python-software-properties
<span class="token function">sudo</span> add-apt-repository ppa:webupd8team/java
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> oracle-java8-installer
java --version


<span class="token comment"># 安装maven</span>
<span class="token comment"># 一键安装</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> maven
<span class="token comment"># 查看安装路径</span>
<span class="token function">whereis</span> maven
<span class="token comment"># 配置文件默认在/etc/maven内</span>
<span class="token builtin class-name">cd</span> /etc/maven

<span class="token comment"># 手动安装</span>
<span class="token function">wget</span> https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.8.4/binaries/apache-maven-3.8.4-bin.tar.gz -O <span class="token string">"maven.tar.gz"</span>
<span class="token function">tar</span> zxvf maven.tar.gz
<span class="token comment"># 然后cd进去 进入到conf修改内容 修改内容看下面</span>
<span class="token comment"># 修改完毕后：</span>

<span class="token comment"># 移动到固定目录（可选）</span>
<span class="token function">mkdir</span> /usr/local/maven
<span class="token function">sudo</span> <span class="token function">mv</span> apache-maven-3.8.4 /usr/local/maven/

<span class="token comment"># 配置环境变量，让path能够找到maven的可执行文件   注意 只对当前用户生效</span>
<span class="token builtin class-name">echo</span> <span class="token string">"MAVEN_HOME=/usr/local/maven"</span> <span class="token operator">>></span> ~/.bashrc
<span class="token builtin class-name">echo</span> <span class="token string">"PATH=\<span class="token variable">${<span class="token environment constant">PATH</span>}</span>:\<span class="token variable">${MAVEN_HOME}</span>/bin"</span> <span class="token operator">>></span> ~/.bashrc
<span class="token builtin class-name">echo</span> <span class="token string">"export PATH"</span> <span class="token operator">>></span> ~/.bashrc
<span class="token builtin class-name">source</span> ~/.bashrc

<span class="token comment"># 检查maven是否安装成功</span>
mvn -v
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p>修改maven配置</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code># 切换仓库下载路径
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>localRepository</span><span class="token punctuation">></span></span>/你想要的路径<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>localRepository</span><span class="token punctuation">></span></span>
# 换源
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrors</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirror</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>aliyunmaven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrorOf</span><span class="token punctuation">></span></span>*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrorOf</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>阿里云公共仓库<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">></span></span>https://maven.aliyun.com/repository/public<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirror</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrors</span><span class="token punctuation">></span></span>

# 设置Java版本 可选
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>然后下载maven</p>
<p>我这里看到的最新是2.0.3</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下载</span>
<span class="token function">wget</span> https://github.91chi.fun//https://github.com//alibaba/nacos/releases/download/2.0.3/nacos-server-2.0.3.tar.gz -O <span class="token string">"nacos.tar.gz"</span>
<span class="token comment"># 解压</span>
<span class="token function">tar</span> -zvxf nacos.tar.gz
<span class="token builtin class-name">cd</span> nacos/
ll
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>结果：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>总用量 44
drwxrwxr-x 5 root root  4096 1月  11 13:55 ./
drwxr-xr-x 4 root root  4096 1月  11 13:55 ../
drwxrwxr-x 2 root root  4096 1月  11 13:55 bin/
drwxr-xr-x 2 root root  4096 7月  27 14:18 conf/
-rw-r--r-- 1 root root 16583 3月  18  2021 LICENSE
-rw-r--r-- 1 root root  1305 5月  14  2020 NOTICE
drwxrwxr-x 2 root root  4096 1月  11 13:55 target/
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="集群搭建-配置nacos" tabindex="-1"><a class="header-anchor" href="#集群搭建-配置nacos" aria-hidden="true">#</a> 集群搭建-配置nacos</h3>
<p>注意：用nacos2以上的，貌似就用不了这个模拟集群的方法了，老实复制3个nacos文件夹再逐个启动</p>
<p>注意：用nacos2以上的，貌似就用不了这个模拟集群的方法了，老实复制3个nacos文件夹再逐个启动</p>
<p>注意：用nacos2以上的，貌似就用不了这个模拟集群的方法了，老实复制3个nacos文件夹再逐个启动</p>
<p>我们先把bin内的原始启动文件备份一下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> nacos/bin
<span class="token function">cp</span> startup.sh startup.sh.bk
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111140117497.png" alt="image-20220111140117497" loading="lazy"></p>
<p>在修改之前，我们首先要把sql之类的配置好</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> nacos_config<span class="token punctuation">;</span>
<span class="token comment"># 然后通过source 或者第三方软件 把conf目录下的nacos-mysql.sql导入并运行 或者直接复制sql脚本粘贴即可</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>然后修改下application.properties，末尾添加如下内容，适配mysql</p>
<p>注意，这里有一个天坑：如果你的mysql是通过docker部署的，则一定要写容器在docker内的ip</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111155538577.png" alt="image-20220111155538577" loading="lazy"></p>
<p>不然百分百报错，md这个错找了我半个小时</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">spring.datasource.platform</span><span class="token punctuation">=</span><span class="token attr-value">mysql</span>

<span class="token attr-name">db.num</span><span class="token punctuation">=</span><span class="token attr-value">1</span>
<span class="token attr-name">db.url.0</span><span class="token punctuation">=</span><span class="token attr-value">jdbc:mysql://127.17.0.3:3306/nacos_config?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;useUnicode=true&amp;useSSL=false&amp;serverTimezone=UTC</span>
<span class="token attr-name">db.user.0</span><span class="token punctuation">=</span><span class="token attr-value">root</span>
<span class="token attr-name">db.password.0</span><span class="token punctuation">=</span><span class="token attr-value">123456</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后我们要在confi的这个文件内配置集群</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111142148661.png" alt="image-20220111142148661" loading="lazy"></p>
<p>先复制下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span> cluster.conf.example cluster.conf
<span class="token function">cat</span> cluster.conf
<span class="token comment"># 结果:</span>

<span class="token comment">#</span>
<span class="token comment"># Copyright 1999-2018 Alibaba Group Holding Ltd.</span>
<span class="token comment">#</span>
<span class="token comment"># Licensed under the Apache License, Version 2.0 (the "License");</span>
<span class="token comment"># you may not use this file except in compliance with the License.</span>
<span class="token comment"># You may obtain a copy of the License at</span>
<span class="token comment">#</span>
<span class="token comment">#      http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">#</span>
<span class="token comment"># Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment"># distributed under the License is distributed on an "AS IS" BASIS,</span>
<span class="token comment"># WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
<span class="token comment"># See the License for the specific language governing permissions and</span>
<span class="token comment"># limitations under the License.</span>
<span class="token comment">#</span>
<span class="token comment">#it is ip</span>
<span class="token comment">#example</span>
<span class="token number">192.168</span>.16.101:8847
<span class="token number">192.168</span>.16.102
<span class="token number">192.168</span>.16.103
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>emm看着配置很简单</p>
<p>配置之前 一定要看看自己网卡</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">hostname</span> -I
<span class="token comment"># 注意 是大写的I，我这里的结果是：</span>
<span class="token comment"># 10.0.4.6 172.38.0.1 172.17.0.1 172.18.0.1 172.19.0.1 172.20.0.1</span>
<span class="token comment"># 这上面随便用哪个都可以 绝对不能用localhost或者127.0.0.1</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>我的最终配置</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">10.0.4.6</span><span class="token punctuation">:</span><span class="token attr-value">14561</span>
<span class="token attr-name">10.0.4.6</span><span class="token punctuation">:</span><span class="token attr-value">14562</span>
<span class="token attr-name">10.0.4.6</span><span class="token punctuation">:</span><span class="token attr-value">14563</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>接下来我们修改startup脚本，让其能启动不同的端口，<strong>我们希望传递不同的端口号传递不同的实例</strong></p>
<p>例如：<code>startup -p 1111</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">cygwin</span><span class="token operator">=</span>false
<span class="token assign-left variable">darwin</span><span class="token operator">=</span>false
<span class="token assign-left variable">os400</span><span class="token operator">=</span>false
<span class="token keyword">case</span> <span class="token string">"<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span><span class="token variable">`</span></span>"</span> <span class="token keyword">in</span>
CYGWIN*<span class="token punctuation">)</span> <span class="token assign-left variable">cygwin</span><span class="token operator">=</span>true<span class="token punctuation">;</span><span class="token punctuation">;</span>
Darwin*<span class="token punctuation">)</span> <span class="token assign-left variable">darwin</span><span class="token operator">=</span>true<span class="token punctuation">;</span><span class="token punctuation">;</span>
OS400*<span class="token punctuation">)</span> <span class="token assign-left variable">os400</span><span class="token operator">=</span>true<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
<span class="token function-name function">error_exit</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"ERROR: <span class="token variable">$1</span> !!"</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token punctuation">[</span> <span class="token operator">!</span> -e <span class="token string">"<span class="token variable">$JAVA_HOME</span>/bin/java"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/jdk/java
<span class="token punctuation">[</span> <span class="token operator">!</span> -e <span class="token string">"<span class="token variable">$JAVA_HOME</span>/bin/java"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/java
<span class="token punctuation">[</span> <span class="token operator">!</span> -e <span class="token string">"<span class="token variable">$JAVA_HOME</span>/bin/java"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/opt/taobao/java
<span class="token punctuation">[</span> <span class="token operator">!</span> -e <span class="token string">"<span class="token variable">$JAVA_HOME</span>/bin/java"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">unset</span> JAVA_HOME

<span class="token keyword">if</span> <span class="token punctuation">[</span> -z <span class="token string">"<span class="token variable">$JAVA_HOME</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token keyword">if</span> <span class="token variable">$darwin</span><span class="token punctuation">;</span> <span class="token keyword">then</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> -x <span class="token string">'/usr/libexec/java_home'</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span>/usr/libexec/java_home<span class="token variable">`</span></span>

    <span class="token keyword">elif</span> <span class="token punctuation">[</span> -d <span class="token string">"/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span><span class="token string">"/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home"</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">else</span>
    <span class="token assign-left variable">JAVA_PATH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">dirname</span> <span class="token punctuation">$(</span>readlink -f <span class="token punctuation">$(</span>which javac<span class="token punctuation">))</span><span class="token variable">`</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"x<span class="token variable">$JAVA_PATH</span>"</span> <span class="token operator">!=</span> <span class="token string">"x"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">dirname</span> $JAVA_PATH <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null<span class="token variable">`</span></span>
    <span class="token keyword">fi</span>
  <span class="token keyword">fi</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> -z <span class="token string">"<span class="token variable">$JAVA_HOME</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        error_exit <span class="token string">"Please set the JAVA_HOME variable in your environment, We need java(x64)! jdk8 or later is better!"</span>
  <span class="token keyword">fi</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">export</span> <span class="token assign-left variable">SERVER</span><span class="token operator">=</span><span class="token string">"nacos-server"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MODE</span><span class="token operator">=</span><span class="token string">"cluster"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">FUNCTION_MODE</span><span class="token operator">=</span><span class="token string">"all"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MEMBER_LIST</span><span class="token operator">=</span><span class="token string">""</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">EMBEDDED_STORAGE</span><span class="token operator">=</span><span class="token string">""</span>
<span class="token comment"># 新版本这里有个p了 我们换成别的来指定</span>
<span class="token comment"># 原先：while getopts ":m:f:s:c:p:" opt</span>
<span class="token comment"># 现在 1. 定义变量</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">SERVER_PORT</span><span class="token operator">=</span><span class="token string">""</span>
<span class="token comment"># 第二 添加属性 获取分支</span>
<span class="token keyword">while</span> <span class="token builtin class-name">getopts</span> <span class="token string">":m:f:s:c:p:r:"</span> opt
<span class="token keyword">do</span>
    <span class="token keyword">case</span> <span class="token variable">$opt</span> <span class="token keyword">in</span>
        m<span class="token punctuation">)</span>
            <span class="token assign-left variable">MODE</span><span class="token operator">=</span><span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        f<span class="token punctuation">)</span>
            <span class="token assign-left variable">FUNCTION_MODE</span><span class="token operator">=</span><span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        s<span class="token punctuation">)</span>
            <span class="token assign-left variable">SERVER</span><span class="token operator">=</span><span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        c<span class="token punctuation">)</span>
            <span class="token assign-left variable">MEMBER_LIST</span><span class="token operator">=</span><span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        p<span class="token punctuation">)</span>
            <span class="token assign-left variable">EMBEDDED_STORAGE</span><span class="token operator">=</span><span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token comment"># 这里添加一个分支</span>
        r<span class="token punctuation">)</span>  
        	<span class="token assign-left variable">SERVER_PORT</span><span class="token operator">=</span><span class="token variable">$OPTARG</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        ?<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">"Unknown parameter"</span>
        <span class="token builtin class-name">exit</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">export</span> JAVA_HOME
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$JAVA_HOME</span>/bin/java"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">BASE_DIR</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">cd</span> <span class="token punctuation">$(</span>dirname $0<span class="token punctuation">)</span>/<span class="token punctuation">..</span><span class="token punctuation">;</span> <span class="token builtin class-name">pwd</span><span class="token variable">`</span></span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CUSTOM_SEARCH_LOCATIONS</span><span class="token operator">=</span>file:<span class="token variable">${BASE_DIR}</span>/conf/

<span class="token comment">#===========================================================================================</span>
<span class="token comment"># JVM Configuration</span>
<span class="token comment">#===========================================================================================</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${MODE}</span>"</span> <span class="token operator">==</span> <span class="token string">"standalone"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Xms512m -Xmx512m -Xmn256m"</span>
    <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Dnacos.standalone=true"</span>
<span class="token keyword">else</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${EMBEDDED_STORAGE}</span>"</span> <span class="token operator">==</span> <span class="token string">"embedded"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -DembeddedStorage=true"</span>
    <span class="token keyword">fi</span>
    <span class="token comment"># 如果是单机跑集群一定要修改下这玩意 不然你的服务器扛不住...</span>
    <span class="token comment"># 原本：JAVA_OPT="${JAVA_OPT} -server -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"</span>
   <span class="token comment"># -Xmx3550m：设置JVM最大可用内存为3550M。</span>
	<span class="token comment">#-Xms3550m：设置JVM促使内存为3550m。此值可以设置与-Xmx相同，以避免每次垃圾回收完成后JVM重新分配内存。</span>
	<span class="token comment">#-Xmn2g：设置年轻代大小</span>
	<span class="token comment">#-Xss128k：设置每个线程的堆栈大小。</span>
    <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -server -Xms512m -Xmx512m -Xmn256m"</span>
    <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=<span class="token variable">${BASE_DIR}</span>/logs/java_heapdump.hprof"</span>
    <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -XX:-UseLargePages"</span>
<span class="token keyword">fi</span>



<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${FUNCTION_MODE}</span>"</span> <span class="token operator">==</span> <span class="token string">"config"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Dnacos.functionMode=config"</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${FUNCTION_MODE}</span>"</span> <span class="token operator">==</span> <span class="token string">"naming"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Dnacos.functionMode=naming"</span>
<span class="token keyword">fi</span>

<span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Dnacos.member.list=<span class="token variable">${MEMBER_LIST}</span>"</span>

<span class="token assign-left variable">JAVA_MAJOR_VERSION</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>$JAVA -version <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">|</span> <span class="token function">sed</span> -E -n <span class="token string">'s/.* version "([0-9]*).*$/\1/p'</span><span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$JAVA_MAJOR_VERSION</span>"</span> -ge <span class="token string">"9"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Xlog:gc*:file=<span class="token variable">${BASE_DIR}</span>/logs/nacos_gc.log:time,tags:filecount=10,filesize=102400"</span>
<span class="token keyword">else</span>
  <span class="token assign-left variable">JAVA_OPT_EXT_FIX</span><span class="token operator">=</span><span class="token string">"-Djava.ext.dirs=<span class="token variable">${JAVA_HOME}</span>/jre/lib/ext:<span class="token variable">${JAVA_HOME}</span>/lib/ext"</span>
  <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Xloggc:<span class="token variable">${BASE_DIR}</span>/logs/nacos_gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M"</span>
<span class="token keyword">fi</span>

<span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Dloader.path=<span class="token variable">${BASE_DIR}</span>/plugins/health,<span class="token variable">${BASE_DIR}</span>/plugins/cmdb"</span>
<span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -Dnacos.home=<span class="token variable">${BASE_DIR}</span>"</span>
<span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> -jar <span class="token variable">${BASE_DIR}</span>/target/<span class="token variable">${SERVER}</span>.jar"</span>
<span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> <span class="token variable">${JAVA_OPT_EXT}</span>"</span>
<span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> --spring.config.additional-location=<span class="token variable">${CUSTOM_SEARCH_LOCATIONS}</span>"</span>
<span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> --logging.config=<span class="token variable">${BASE_DIR}</span>/conf/nacos-logback.xml"</span>
<span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${JAVA_OPT}</span> --server.max-http-header-size=524288"</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> -d <span class="token string">"<span class="token variable">${BASE_DIR}</span>/logs"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token function">mkdir</span> <span class="token variable">${BASE_DIR}</span>/logs
<span class="token keyword">fi</span>

<span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$JAVA</span> <span class="token variable">$JAVA_OPT_EXT_FIX</span> <span class="token variable">${JAVA_OPT}</span>"</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${MODE}</span>"</span> <span class="token operator">==</span> <span class="token string">"standalone"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"nacos is starting with standalone"</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"nacos is starting with cluster"</span>
<span class="token keyword">fi</span>

<span class="token comment"># check the start.out log output file</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> -f <span class="token string">"<span class="token variable">${BASE_DIR}</span>/logs/start.out"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token function">touch</span> <span class="token string">"<span class="token variable">${BASE_DIR}</span>/logs/start.out"</span>
<span class="token keyword">fi</span>
<span class="token comment"># start 启动的时候额外增加serverport</span>
<span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$JAVA</span> <span class="token variable">$JAVA_OPT_EXT_FIX</span> <span class="token variable">${JAVA_OPT}</span>"</span> <span class="token operator">></span> <span class="token variable">${BASE_DIR}</span>/logs/start.out <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
<span class="token function">nohup</span> <span class="token string">"<span class="token variable">$JAVA</span>"</span> -Dserver.port<span class="token operator">=</span><span class="token variable">${SERVER_PORT}</span> <span class="token string">"<span class="token variable">$JAVA_OPT_EXT_FIX</span>"</span> <span class="token variable">${JAVA_OPT}</span> nacos.nacos <span class="token operator">>></span> <span class="token variable">${BASE_DIR}</span>/logs/start.out <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
<span class="token builtin class-name">echo</span> <span class="token string">"nacos is starting，you can check the <span class="token variable">${BASE_DIR}</span>/logs/start.out"</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br></div></div><p>我们接下来只需要</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./startup.sh -r <span class="token number">14561</span>
./startup.sh -r <span class="token number">14562</span>
./startup.sh -r <span class="token number">14563</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>运行一个后 看到这玩意表示成功</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>这里省略一堆东西
nacos is starting with cluster
nacos is starting，you can check the /home/root/javatest/nacos/logs/start.out
172.17.0.1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>启动完毕后 输入<code> ps aux</code></p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111151648492.png" alt="image-20220111151648492" loading="lazy"></p>
<p>。。。。md反正我这里第一个启动成功，二三个全部失败，算了，单击还是Docker吧</p>
<h3 id="docker-集群搭建" tabindex="-1"><a class="header-anchor" href="#docker-集群搭建" aria-hidden="true">#</a> Docker-集群搭建</h3>
<p>参考官方文档即可<a href="https://github.com/nacos-group/nacos-docker/blob/master/README_ZH.md" target="_blank" rel="noopener noreferrer">https://github.com/nacos-group/nacos-docker/blob/master/README_ZH.md<ExternalLinkIcon/></a></p>
<p>步骤：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone --depth <span class="token number">1</span> https://github.com/nacos-group/nacos-docker.git
<span class="token builtin class-name">cd</span> nacos-docker
tree
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>结果：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>.
├── build
│   ├── bin
│   │   └── docker-startup.sh
│   ├── conf
│   │   └── application.properties
│   ├── Dockerfile
│   └── Dockerfile.Slim
├── changlog
<span class="token title important"><span class="token punctuation">#</span> 这里是对应的环境变量配置文件</span>
├── env
│   ├── mysql.env #mysql配置文件
│   ├── nacos-embedded.env
│   ├── nacos-hostname.env
│   ├── nacos-ip.env  #下面的对应的配置文件
│   └── nacos-standlone-mysql.env
<span class="token title important"><span class="token punctuation">#</span> 这里是启动文件 默认的sql账号密码是nacos，nacos也是这个 可以在上面那里配置</span>
├── example
│   ├── cluster-embedded.yaml
│   ├── cluster-hostname.yaml # 用这个即可 这里可以修改下mysql的版本为8+ 看习惯
│   ├── cluster-ip.yaml
│   ├── standalone-derby.yaml
│   ├── standalone-mysql-5.7.yaml
│   └── standalone-mysql-8.yaml
├── README.md
└── README_ZH.md
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="nginx配置" tabindex="-1"><a class="header-anchor" href="#nginx配置" aria-hidden="true">#</a> Nginx配置</h3>
<p>我们之前已经搭建好了nacos，接下来用nginx来配置吧</p>
<p>注意 这里用了网卡 如果你没有用的话 后续的端口应该是127.17.0.1:8848~8850这样</p>
<p>我这里的是8435 你可以改成你喜欢的</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --network example_nacos_net -p <span class="token number">8435</span>:80 --name nginx_nacos nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后修改这个文件</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111164417136.png" alt="image-20220111164417136" loading="lazy"></p>
<p>配置如下内容即可</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> cluster</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> 172.16.238.10:8848</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 172.16.238.11:8848</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 172.16.238.12:8848</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> [::]:80</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>

    <span class="token comment">#access_log  /var/log/nginx/host.access.log  main;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://cluster</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span> index.html index.htm</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">#error_page  404              /404.html;</span>

    <span class="token comment"># redirect server error pages to the static page /50x.html</span>
    <span class="token comment">#</span>
    <span class="token directive"><span class="token keyword">error_page</span> <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span> /50x.html</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>然后重启nginx即可</p>
<p>访问后，如果你不是通过端口转发来访问服务器 需要第一时间修改下nacos的密码（或者在创建集群的时候就要修改）</p>
<h3 id="连接集群的nacos" tabindex="-1"><a class="header-anchor" href="#连接集群的nacos" aria-hidden="true">#</a> 连接集群的Nacos</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>payment<span class="token punctuation">-</span>provider
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token comment"># 配置nacos</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
      <span class="token comment"># 这里填写你集群的地址即可(Nginx地址)</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
<span class="token comment"># 暴露监控端口</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>效果：</p>
<p><img src="/images/SpringCloud/12-Nacos服务注册和配置中心/image-20220111191959811.png" alt="image-20220111191959811" loading="lazy"></p>
<h3 id="集群搭建总结" tabindex="-1"><a class="header-anchor" href="#集群搭建总结" aria-hidden="true">#</a> 集群搭建总结</h3>
<p>非常简单，首先是<code>/conf</code>下的cluster.conf写入对应的ip和端口（开多少台就写多少个）</p>
<p>然后再到application.properties中开启数据库</p>
<p>然后通过nginx反代配置来实现负载均衡</p>
<p>然后客户端连接的话直接连nginx即可</p>
</template>
