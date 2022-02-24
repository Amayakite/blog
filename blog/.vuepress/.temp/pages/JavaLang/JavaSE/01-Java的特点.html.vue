<template><h1 id="java的特点" tabindex="-1"><a class="header-anchor" href="#java的特点" aria-hidden="true">#</a> Java的特点</h1>
<ol>
<li>
<p>Java是面向对象的(oop)</p>
</li>
<li>
<p>Java语言是健壮性的</p>
<ul>
<li>Java的强类型机制/异常处理/垃圾的自动收集等是Java程序强壮性的重要保障</li>
</ul>
</li>
<li>
<p>Java语言是跨平台的（利用了底层的JVM虚拟机机制） 简单来说 就是一个编译好的<code>.class</code>文件能在多个操作系统上运行</p>
</li>
</ol>
<p><img src="/images/JavaSE/01-Java的特点/image-20211029232904556.png" alt="image-20211029232904556" loading="lazy"></p>
<p><img src="/images/JavaSE/01-Java的特点/image-20211025170833865.png" alt="image-20211025170833865" loading="lazy"></p>
<ol>
<li>Java语言是解释性的</li>
</ol>
<p>解释性语言：<code>JavaScript</code>/<code>PHP</code>/<code>Java</code>/<code>Python</code>等,编译性语言:<code>C</code>/<code>C++</code>/<code>C#</code>/<code>GoLang</code>等</p>
<p>解释性语言和编译性语言的区别</p>
<ul>
<li>解释性语言
<ul>
<li>编译后的代码不能直接被机器执行，需要执行器来执行</li>
</ul>
</li>
<li>编译性语言
<ul>
<li>编译后的代码可以直接被机器执行</li>
</ul>
</li>
</ul>
<h2 id="java开发工具的选择" tabindex="-1"><a class="header-anchor" href="#java开发工具的选择" aria-hidden="true">#</a> Java开发工具的选择</h2>
<p>​ 刚开始使用的话，建议是用VsCode或者Sublime Text 差不多熟练后再转用IEDA(面试的时候往往都要手搓代码)</p>
<h2 id="java运行机制及运行过程" tabindex="-1"><a class="header-anchor" href="#java运行机制及运行过程" aria-hidden="true">#</a> Java运行机制及运行过程</h2>
<ul>
<li>Java核心机制-Java虚拟机<code>JVM java virtual machine</code>
<ul>
<li>基本介绍
<ol>
<li>JVM是一个虚拟的计算机，具有指令集并使用不同的存储区域，负责执行命令，管理数据/存储/寄存器，包含在JDK中</li>
<li>对于不同的平台，有不同的虚拟机</li>
<li>Java虚拟机机制屏蔽了底层运行平台的差别，实现了<strong>一次编译，到处运行</strong></li>
</ol>
</li>
</ul>
</li>
</ul>
<h2 id="什么是jdk-jre" tabindex="-1"><a class="header-anchor" href="#什么是jdk-jre" aria-hidden="true">#</a> 什么是JDK/JRE</h2>
<h3 id="jdk的基本介绍" tabindex="-1"><a class="header-anchor" href="#jdk的基本介绍" aria-hidden="true">#</a> JDK的基本介绍</h3>
<ol>
<li>JDK的全程（<code>Java Development Kit</code> <strong>Java开发工具包</strong>）
JDK +JRE+Java的开发工具(Java,JavaC,JavaDoc,Javap等)</li>
<li>JDK是提供给Java开发人员使用的，其中包含了Java的开发工具，也包括了Jre，所以安装了JDK，就不用再单独安装Jre了</li>
</ol>
<h3 id="jre基本介绍" tabindex="-1"><a class="header-anchor" href="#jre基本介绍" aria-hidden="true">#</a> JRE基本介绍</h3>
<ol>
<li>Jre(<code>Java Runtime Environment</code> <strong>Java运行环境</strong>)
JRE = Jvm+Java核心库[类]</li>
<li>包括Java虚拟机(<code>JVM java virtual machine</code>)和Java程序所需的核心类库等，如果想要运行一个开发好的Java程序，计算机中只需要安装JRE即可</li>
</ol>
<h2 id="安装jdk" tabindex="-1"><a class="header-anchor" href="#安装jdk" aria-hidden="true">#</a> 安装JDK</h2>
<blockquote>
<p>大部分公司使用的都是Jdk1.8,安装的话有两种方法</p>
</blockquote>
<ul>
<li>
<p>第一个是使用Oracle提供的<a href="https://www.oracle.com/java/technologies/downloads/#java8" target="_blank" rel="noopener noreferrer">Java包<ExternalLinkIcon/></a></p>
</li>
<li>
<p>但是我为了便于使用（不想要那烦人的任务栏图标）使用了<a href="https://developers.redhat.com/products/openjdk/download" target="_blank" rel="noopener noreferrer">OpenJdk<ExternalLinkIcon/></a></p>
</li>
<li>
<p>关于这两者的<a href="https://blog.csdn.net/longfuhuo/article/details/107561660" target="_blank" rel="noopener noreferrer">区别<ExternalLinkIcon/></a> 正常商用的话还是安装Oracle的</p>
</li>
<li>
<p>在这一步也可以把JDK11下到来，JDK11包含一些新特性 后续某些项目会用得上</p>
</li>
<li>
<p>WIndows安装：现在应该无脑next即可，无需额外配置环境变量</p>
</li>
<li>
<p>Linux：</p>
<ul>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装OpenJDk</span>
<span class="token comment"># 1.更新软件包列表</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token comment"># 2.安装openjdk-8-jdk</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> openjdk-8-jdk
<span class="token comment"># 3.查看java版本，看看是否安装成功：</span>
java -version
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装oracle Java JDK</span>
<span class="token comment"># 1、安装依赖包：</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> python-software-properties
<span class="token comment"># 2、添加仓库源： 这一步应该会在某个时期能省略 先试试能不能直接装吧 不行的话再添加仓库源</span>
<span class="token function">sudo</span> add-apt-repository ppa:webupd8team/java
<span class="token comment"># 3、更新软件包列表：</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token comment">#4、安装java JDK：</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> oracle-java8-installer
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li>
</ul>
</li>
</ul>
</template>
