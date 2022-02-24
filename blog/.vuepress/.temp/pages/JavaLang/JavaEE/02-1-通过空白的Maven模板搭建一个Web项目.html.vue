<template><p>我TM真的有点服了某些讲课的...硬生生的看了一下午的视频，不如自己动手折腾两下</p>
<p>在开始前，必须要明确的点是：</p>
<p>Maven就一个包管理工具 Maven就一个包管理工具 Maven就一个包管理工具 Maven就一个包管理工具</p>
<h2 id="创建一个空白项目前需要做的事情" tabindex="-1"><a class="header-anchor" href="#创建一个空白项目前需要做的事情" aria-hidden="true">#</a> 创建一个空白项目前需要做的事情</h2>
<h3 id="设置下默认的maven版本、配置文件、仓库路径" tabindex="-1"><a class="header-anchor" href="#设置下默认的maven版本、配置文件、仓库路径" aria-hidden="true">#</a> 设置下默认的maven版本、配置文件、仓库路径</h3>
<p>防止每次都需要自己手动到设置中调</p>
<p>如果说你已经打开了一个项目，就：</p>
<p>如果没打开的话应该也是能找到这个配置，反正在这里面能够找到Maven的路径，然后进行修改即可：</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202161214531.png" alt="image-20211202161214531" loading="lazy"></p>
<p>理论上来说，新版的IDEA，会在你读取Maven的主路径的时候，自动读取<code>本地仓库</code>地址</p>
<h2 id="创建一个空白项目-并检查相关配置" tabindex="-1"><a class="header-anchor" href="#创建一个空白项目-并检查相关配置" aria-hidden="true">#</a> 创建一个空白项目，并检查相关配置</h2>
<p>就按照往常的来，新建一个空白的maven项目，然后填写下相关的信息</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202161437222.png" alt="image-20211202161437222" loading="lazy"></p>
<p>这个工作坐标之类的随意填写，或者就按照默认的来即可，不影响</p>
<h2 id="准备工作-创建一系列的文件" tabindex="-1"><a class="header-anchor" href="#准备工作-创建一系列的文件" aria-hidden="true">#</a> 准备工作-创建一系列的文件</h2>
<p>首先，在src-main目录下，创建一个webapp文件夹</p>
<p>然后打开tomcat的webapps文件夹，把里面的ROOT文件夹中的<code>WEB-INF</code>文件夹整个拷贝过来</p>
<p>然后在这个<code>WEB-INF</code>文件夹内新建一个<code>index.jsp</code></p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202162008344.png" alt="image-20211202162008344" loading="lazy"></p>
<p>当你放置完这些文件的时候，右下角百分之一千会出现一个：配置web框架</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202162231845.png" alt="image-20211202162231845" loading="lazy"></p>
<p>如果说没有的话，按下<code>ctrl+alt+shift+s</code>或者点击<code>文件-项目结构</code>调出项目配置，在里面这样配置</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202162747976.png" alt="image-20211202162747976" loading="lazy"></p>
<p>还有那个<strong>创建工作</strong> 一定要点一下（右下角的）</p>
<p>然后把那个index.jsp删了，重新创建一个，系统会给你一个模板 不要删 不管他</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;%--
  Created by IntelliJ IDEA.
  User: Amayakite
  Date: 2021/12/2
  Time: 16:28
  To change this template use File | Settings | File Templates.
--%>
&lt;%@ page contentType="text/html;charset=UTF-8" language="java" %>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="创建java文件-让我们的java中的内容能在网页上显示" tabindex="-1"><a class="header-anchor" href="#创建java文件-让我们的java中的内容能在网页上显示" aria-hidden="true">#</a> 创建Java文件，让我们的Java中的内容能在网页上显示</h2>
<p>完成上面的步骤之后，接下来要做的就是：在java中创建一个MyApps文件</p>
<p>如果你要追求规范，也可以这样创建：<code>com.localhost.www.MyApps.java</code></p>
<p>这里我选择后者吧，毕竟以后都是要这样做的</p>
<p>然后你就能得到一个这样的文件：</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163103074.png" alt="image-20211202163103074" loading="lazy"></p>
<p>接下来打开tomcat，看下里面的examples中的案例-我们该怎样在Java中来渲染网页</p>
<p>启动完tomcat后，我们进入到examples目录下，选择第一个</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163705993.png" alt="image-20211202163705993" loading="lazy"></p>
<p>然后可以看到各种案例模板，每个案例左边是预览，右边是代码，我们直接点右边（在网页上渲染一个Hello World）</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163733098.png" alt="image-20211202163733098" loading="lazy"></p>
<p>得到了如下代码：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class HelloWorld extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("&lt;html>");
        out.println("&lt;head>");
        out.println("&lt;title>Hello World!&lt;/title>");
        out.println("&lt;/head>");
        out.println("&lt;body>");
        out.println("&lt;h1>Hello World!&lt;/h1>");
        out.println("&lt;/body>");
        out.println("&lt;/html>");
    }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>然后我们在IEDA中先输入这个<code>HttpServlet</code>，看看当前有没有这个包</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163907316.png" alt="image-20211202163907316" loading="lazy"></p>
<p>发现没有，这个时候有个添加Maven依赖项</p>
<p>点进去，发现啥都没有</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202163937171.png" alt="image-20211202163937171" loading="lazy"></p>
<p>如果有的话，就直接从这里面选就行了，但是这里没有</p>
<h3 id="去maven仓库找到对应的包-并加入依赖" tabindex="-1"><a class="header-anchor" href="#去maven仓库找到对应的包-并加入依赖" aria-hidden="true">#</a> 去Maven仓库找到对应的包，并加入依赖</h3>
<p>首先，我们得到的代码中包含了如下信息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token punctuation">;</span>

    说明这个<span class="token class-name">HttpServlet</span>一定是在jakarta<span class="token punctuation">.</span>servlet或者jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http这个包下的，所以只需要去仓库中搜索
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>在<a href="https://mvnrepository.com/" target="_blank" rel="noopener noreferrer">Maven仓库<ExternalLinkIcon/></a>中搜索，得到了如下结果</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164457153.png" alt="image-20211202164457153" loading="lazy"></p>
<p>接下来进去找到对应版本的包：</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164615204.png" alt="image-20211202164615204" loading="lazy"></p>
<p>得到了如下安装代码：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.tomcat<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>tomcat-servlet-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>10.0.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后再加入到<code>pom.xml</code>中即可</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;?xml version="1.0" encoding="UTF-8"?>
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    &lt;modelVersion>4.0.0&lt;/modelVersion>

    &lt;groupId>org.example&lt;/groupId>
    &lt;artifactId>16-myJavaWebProjcet&lt;/artifactId>
    &lt;version>1.0-SNAPSHOT&lt;/version>

    &lt;properties>
        &lt;maven.compiler.source>8&lt;/maven.compiler.source>
        &lt;maven.compiler.target>8&lt;/maven.compiler.target>
    &lt;/properties>
    
    &lt;dependencies>
    &lt;!-- 在这里插入-->
        &lt;!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-servlet-api -->
        &lt;dependency>
            &lt;groupId>org.apache.tomcat&lt;/groupId>
            &lt;artifactId>tomcat-servlet-api&lt;/artifactId>
            &lt;version>10.0.13&lt;/version>
        &lt;/dependency>
    &lt;/dependencies>
&lt;/project>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>然后点击这个加载变更</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164738547.png" alt="image-20211202164738547" loading="lazy"></p>
<p>过了几秒后，能看到Maven的依赖库中多了个玩意出来</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164820053.png" alt="image-20211202164820053" loading="lazy"></p>
<p>回到代码，尝试写入</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202164841675.png" alt="image-20211202164841675" loading="lazy"></p>
<p>直接就有个导入类了，看来是没错的</p>
<p>然后继续把剩下的代码粘贴上去，哪里红了导哪里</p>
<p>我这里额外加了一句设置编码的，防止乱码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>localhost<span class="token punctuation">.</span>www</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">PrintWriter</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 16-myJavaWebProjcet
 * @BelongsPackage com.localhost.www
 * <span class="token keyword">@date</span> 2021/12/2 16:30
 * <span class="token keyword">@description</span> 项目描述
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyApps</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"text/html"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//设置UTF-8编码</span>
        response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PrintWriter</span> out <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;html>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;head>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;title>Hello World!&lt;/title>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;/head>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;body>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;h1>Hello World!&lt;/h1>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;h1>Hello World!22222&lt;/h1>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;h1>Hello World!22222&lt;/h1>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;h1>Hello World!3333&lt;/h1>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;h1>Hello World!44444&lt;/h1>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;/body>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"&lt;/html>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>至此，Java代码部分就完成了</p>
<h2 id="配置web-xml文件-添加路由" tabindex="-1"><a class="header-anchor" href="#配置web-xml文件-添加路由" aria-hidden="true">#</a> 配置web.xml文件-添加路由</h2>
<p>md大部分鸟人这里讲的云里雾里的，我这里先放最终文件吧</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token comment">&lt;!--这里是我们直接拷贝的tomcat的配置文件头--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>web-app</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://jakarta.ee/xml/ns/jakartaee<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://jakarta.ee/xml/ns/jakartaee
                      https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd<span class="token punctuation">"</span></span>
         <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>5.0<span class="token punctuation">"</span></span>
         <span class="token attr-name">metadata-complete</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--    注册一个Servlet 这个就相当于注册一个路由一样--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--        这里是这个路由的名字--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-name</span><span class="token punctuation">></span></span>MyApps<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-name</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--        这里是这个路由的实际文件位置(class文件)--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-class</span><span class="token punctuation">></span></span>com.localhost.www.MyApps<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-class</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--    然后将这个路由绑定到指定的路由地址中  就相当于这里创建了一个真正的Router 然后绑定一个个的route--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-mapping</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--        这里是绑定的路由--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-name</span><span class="token punctuation">></span></span>MyApps<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-name</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--  这个是请求路径--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url-pattern</span><span class="token punctuation">></span></span>/hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url-pattern</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-mapping</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--这两个可以省略--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>display-name</span><span class="token punctuation">></span></span>Welcome to Tomcat<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>display-name</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">></span></span>
        Welcome to Tomcat
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>web-app</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>接下来一点一点的分析：实际上我们就添加了两端代码</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--    注册一个Servlet 这个就相当于注册一个路由一样--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        这里是这个路由的名字--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-name</span><span class="token punctuation">></span></span>MyApps<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-name</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        这里是这个路由的实际文件位置(class文件)--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-class</span><span class="token punctuation">></span></span>com.localhost.www.MyApps<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-class</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这里就相当于是申明了一个route，就像在Vue Router中声明了一个字路由（没有path的那种）一样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>route<span class="token operator">=</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"Myapps"</span><span class="token punctuation">,</span>
    <span class="token function-variable function">component</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"com/local/www/Myapps"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后是：这里就相当于是一个总<strong>Router</strong>，里面可以给各个子路由配置相关的路径</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--    然后将这个路由绑定到指定的路由地址中  就相当于这里创建了一个真正的Router 然后绑定一个个的route--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-mapping</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        这里是绑定的路由--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-name</span><span class="token punctuation">></span></span>MyApps<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-name</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--  这个是请求路径--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url-pattern</span><span class="token punctuation">></span></span>/hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url-pattern</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-mapping</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>如果放在Vue router中 大概长这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>router <span class="token operator">=</span><span class="token punctuation">{</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span>router<span class="token punctuation">.</span>component<span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>router<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">"/hello"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果说你没有学过其他的语言的话就当没看到这个js吧。</p>
<h2 id="配置tomcat" tabindex="-1"><a class="header-anchor" href="#配置tomcat" aria-hidden="true">#</a> 配置tomcat</h2>
<p>在左上角或者右上角找到这个添加配置</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202170123541.png" alt="image-20211202170123541" loading="lazy"></p>
<p>然后Tomcat的路径之类的这里就不说明了，在部署这里选择刚刚创建的工作</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202170701479.png" alt="image-20211202170701479" loading="lazy"></p>
<p>如果说你点击这个加号没有显示工作的话</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202170737182.png" alt="image-20211202170737182" loading="lazy"></p>
<p>那就先回到这一步<code>打开项目结构</code>：<code>ctrl+alt+shift+s</code></p>
<p>检查右下角这个是不是像这样提示，如果是的话，点击创建工作，然后返回tomcat继续配置即可</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202170831500.png" alt="image-20211202170831500" loading="lazy"></p>
<p>然后我们再把上下文该个好记的</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171146353.png" alt="image-20211202171146353" loading="lazy"></p>
<p>然后运行tomcat：</p>
<p>你就能得到一个啥都没有的页面：</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171207069.png" alt="image-20211202171207069" loading="lazy"></p>
<p>为啥呢？</p>
<p>你还记得之前配置的Servlet(Router)吗</p>
<p>我们的router是绑定了一个在该目录下的<code>hello</code></p>
<p>我们接下来进入<code>/hello</code>试试</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171218874.png" alt="image-20211202171218874" loading="lazy"></p>
<p>是不是有一丢丢小激动</p>
<p>TMD，这玩意坑倒是不多，讲课的SB多。</p>
<h2 id="补充-更新页面" tabindex="-1"><a class="header-anchor" href="#补充-更新页面" aria-hidden="true">#</a> 补充-更新页面</h2>
<p>比方说，我在Java程序中添加了一些其他的话：</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171334898.png" alt="image-20211202171334898" loading="lazy"></p>
<p>这个时候刷新页面是不管用的，点一下这里</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171416767.png" alt="image-20211202171416767" loading="lazy"></p>
<p>选择这个</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171505255.png" alt="image-20211202171505255" loading="lazy"></p>
<p>然后刷新网页，你就能看到更新后的内容了</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171519474.png" alt="image-20211202171519474" loading="lazy"></p>
<p>当然如果没有动java文件，只需要点那个<strong>更新类和资源即</strong>可</p>
<p>如果说你要在这个网站中添加一些其他的页面，比如a.html</p>
<p>那么添加完毕后直接访问相对应的资源即可</p>
<p>我这里创建一个my.html演示</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myapps<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    My Apps

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.myapps</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> #4160d7<span class="token punctuation">;</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">padding-top</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> aliceblue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>点击更新类和资源</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202171956804.png" alt="image-20211202171956804" loading="lazy"></p>
<p>进入这个页面</p>
<p><img src="/images/JavaEE/02-1-通过空白的Maven模板搭建一个Web项目/image-20211202172009924.png" alt="image-20211202172009924" loading="lazy"></p>
<p>好了，项目配置完毕，接下来去学些更令人舒畅的玩意吧</p>
</template>
