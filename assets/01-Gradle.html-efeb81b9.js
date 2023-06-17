import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c as o,a as n,b as s,d as i,e as a}from"./app-3ab2953d.js";const c="/images/Java/Android/01-Gradle/image-20220505143500414.png",r="/images/Java/Android/01-Gradle/image-20220505154733905.png",d="/images/Java/Android/01-Gradle/image-20220505162149169.png",u="/images/Java/Android/01-Gradle/image-20220505160721709.png",v="/images/Java/Android/01-Gradle/image-20220505163829544.png",m="/images/Java/Android/01-Gradle/image-20220505170931310.png",k="/images/Java/Android/01-Gradle/image-20220506132417604.png",b="/images/Java/Android/01-Gradle/image-20220505181804228.png",g={},h=a('<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>嘛，最近是发现越来越多新型项目都是使用的gradle作为包管理工具而不是maven了，所以觉得有必要去学习下它，并且近期SpringBoot也发文说明下一代将使用JDK17为默认版本以及gradle为默认构建脚本</p><p>这玩意好处比较多，坏处是学习起来比较费劲（指目前没有几个好的资料）</p><p>这东西是谷歌开发的给Android背书的工具，所以对于Java方面市面上的资料并不多</p><div class="hint-container tip"><p class="hint-container-title">背景</p><p>2000年第一款管理工具ant诞生，纯java</p><p>2004年，maven发布</p><p>2012年，gradle goole背书的一款项目管理工具</p><ul><li>优势：简洁、groovy语法，build速度比maven快</li><li>Spring源码采用gradle管理</li><li>依赖配置文件比较庞大</li><li>劣势：每一个版本都较上次有非常大的改动，没有做好向上兼容，例如现在我这最新版本是7，那么如果跑6的项目则会报错</li><li>学习成本高，需要用到groovy脚本语言</li></ul></div><h2 id="安装和配置" tabindex="-1"><a class="header-anchor" href="#安装和配置" aria-hidden="true">#</a> 安装和配置</h2>',6),y={href:"https://gradle.org/releases/",target:"_blank",rel:"noopener noreferrer"},f=a('<p>然后选择你能看到的最新的附带源码的包下载即可（Binary-only二进制，complete带有文档，选择下载即可，一般都是二进制即可（））</p><figure><img src="'+c+`" alt="image-20220505143500414" tabindex="0" loading="lazy"><figcaption>image-20220505143500414</figcaption></figure><p>得到压缩包后解压即可，是一个标准的java文件目录</p><p>接着创建一个环境变量<code>GRADLE_HOME</code>，为刚刚解压的路径，然后在path中（windows）加上<code>%GRADLE_HOME%\\bin</code></p><p>然后打开shell，输入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gradle <span class="token parameter variable">-v</span>
<span class="token comment"># 如果之前没问题的话，将会输出这些</span>
Welcome to Gradle <span class="token number">7.4</span>.2<span class="token operator">!</span>

------------------------------------------------------------
Gradle <span class="token number">7.4</span>.2
------------------------------------------------------------

Build time:   <span class="token number">2022</span>-03-31 <span class="token number">15</span>:25:29 UTC
Revision:     540473b8118064efcc264694cbcaa4b677f61041

Kotlin:       <span class="token number">1.5</span>.31
Groovy:       <span class="token number">3.0</span>.9
Ant:          Apache Ant<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> version <span class="token number">1.10</span>.11 compiled on July <span class="token number">10</span> <span class="token number">2021</span>
JVM:          <span class="token number">17.0</span>.2 <span class="token punctuation">(</span>Eclipse Adoptium <span class="token number">17.0</span>.2+8<span class="token punctuation">)</span>
OS:           Windows <span class="token number">10</span> <span class="token number">10.0</span> amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gradle-helloworld" tabindex="-1"><a class="header-anchor" href="#gradle-helloworld" aria-hidden="true">#</a> Gradle HelloWorld</h2><p>在Gradle中有两大对象：<code>Project</code>和<code>Task</code></p><ul><li>一个构建脚本就是一个Project，任何一个Gradle构建都是由一个或者多个Project组成，可以吧一个Project比作一个<code>POM</code>模块或者jar包，每一个Project都是一个<code>groovy</code>脚本文件</li><li>Task：顾名思义就是任务，它是Gradle中的最小执行单元，类似...java中的方法，go中的func，JavaScript中的function函数，如编译、打包、生成javadoc等，一个Project中会有多个tasks</li></ul><p>回到Hello World上，我们先随便创建一个文件夹，然后在里面创建一个<code>build.gradle</code>文件，输入如下内容</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>task say<span class="token punctuation">{</span>
	println <span class="token interpolation-string"><span class="token string">&quot;Hello World&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后打开shell，输入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gradle <span class="token parameter variable">-q</span> say
<span class="token comment"># 结果</span>
Hello World
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时当前目录下生成了一个文件夹</p><figure><img src="`+r+'" alt="image-20220505154733905" tabindex="0" loading="lazy"><figcaption>image-20220505154733905</figcaption></figure><p>这...是否有点像Python...</p><p>其实我们刚刚编写的实际上是一个groovy脚本，所以它能够被执行</p><p><code>build.gradle</code>这个文件是官方指定的，就像是maven中的<code>pom.xml</code>，nodeJs的<code>package.json</code>，golang的<code>pom.xml</code>等</p><p>刚刚这个task实际上继承自DefaultTask，详细文档可以看</p>',19),_={href:"https://docs.gradle.org/current/dsl/org.gradle.api.DefaultTask.html",target:"_blank",rel:"noopener noreferrer"},q=a(`<p>它内部有很多函数，这里找两个出来测试下</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>task sayDoLast<span class="token punctuation">{</span>
    doLast<span class="token punctuation">{</span>
        println <span class="token interpolation-string"><span class="token string">&quot;Destory&quot;</span></span>
    <span class="token punctuation">}</span>
    doFirst<span class="token punctuation">{</span>
        println <span class="token interpolation-string"><span class="token string">&quot;Init&quot;</span></span>
    <span class="token punctuation">}</span>
    println <span class="token interpolation-string"><span class="token string">&quot;Running&quot;</span></span>
<span class="token punctuation">}</span>
<span class="token comment">// 运行结果：</span>
Running
Init
Destory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">额外说明</p><p>刚刚有一个<code>gradle -q taskName</code>中的 -q没有说明，下面说明下</p><ul><li>-q：输出QUITE级别以及其之上的日志信息</li><li>-i：输出INFO级别以及其之上的日志信息</li><li>-d：输出DEBUG级别以及其之上的日志信息</li></ul><blockquote><p>每一个task都是DefaultTask类型，没有例外，就像是Object那样</p></blockquote></div><h2 id="gradle项目文件说明" tabindex="-1"><a class="header-anchor" href="#gradle项目文件说明" aria-hidden="true">#</a> Gradle项目文件说明</h2><p>我们再次随便找一个文件夹，打开shell输入如下内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gradle init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后进入了如下流程</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>选择应用的类型
Select <span class="token builtin class-name">type</span> of project to generate:
<span class="token number">1</span>: basic
<span class="token number">2</span>: application 应用程序
<span class="token number">3</span>: library 第三方插件
<span class="token number">4</span>: Gradle plugin gradle插件
Enter selection <span class="token punctuation">(</span>default: basic<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token number">2</span>

选择语言
Select implementation language:
<span class="token number">1</span>: C++
<span class="token number">2</span>: Groovy
<span class="token number">3</span>: Java
<span class="token number">4</span>: Kotlin
<span class="token number">5</span>: Scala
<span class="token number">6</span>: Swift
Enter selection <span class="token punctuation">(</span>default: Java<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">6</span><span class="token punctuation">]</span> <span class="token number">3</span>

该应用是否是一个多模块（就像是maven的一个父pom管理很多子pom样，默认fasle）
Split functionality across multiple subprojects?:
<span class="token number">1</span>: no - only one application project
<span class="token number">2</span>: <span class="token function">yes</span> - application and library projects
Enter selection <span class="token punctuation">(</span>default: no - only one application project<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token number">1</span>

管理脚本，默认Groovy
Select build script DSL:
<span class="token number">1</span>: Groovy
<span class="token number">2</span>: Kotlin
Enter selection <span class="token punctuation">(</span>default: Groovy<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token number">1</span>

<span class="token comment"># 是否使用最新版本的（dev ）api（可能会被删除的）</span>
Generate build using new APIs and behavior <span class="token punctuation">(</span>some features may change <span class="token keyword">in</span> the next minor release<span class="token punctuation">)</span>? <span class="token punctuation">(</span>default: no<span class="token punctuation">)</span> <span class="token punctuation">[</span>yes, no<span class="token punctuation">]</span>                                                                                                                       no

<span class="token comment"># 测试包版本</span>
Select <span class="token builtin class-name">test</span> framework:
<span class="token number">1</span>: JUnit <span class="token number">4</span>
<span class="token number">2</span>: TestNG
<span class="token number">3</span>: Spock
<span class="token number">4</span>: JUnit Jupiter
Enter selection <span class="token punctuation">(</span>default: JUnit Jupiter<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token number">1</span>

<span class="token comment"># 项目名称</span>
Project name <span class="token punctuation">(</span>default: TestGradle<span class="token punctuation">)</span>:
<span class="token comment"># 包名</span>
Source package <span class="token punctuation">(</span>default: TestGradle<span class="token punctuation">)</span>:

<span class="token operator">&gt;</span> Task :init
Get <span class="token function">more</span> <span class="token builtin class-name">help</span> with your project: https://docs.gradle.org/7.4.2/samples/sample_building_java_applications.html

BUILD SUCCESSFUL <span class="token keyword">in</span> 3m 9s
<span class="token number">2</span> actionable tasks: <span class="token number">2</span> executed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完了会得到这一堆东西</p><figure><img src="`+d+'" alt="image-20220505162149169" tabindex="0" loading="lazy"><figcaption>image-20220505162149169</figcaption></figure><p>接着看看SpringBoot的结构</p>',11),w={href:"https://start.spring.io/",target:"_blank",rel:"noopener noreferrer"},x=a('<figure><img src="'+u+'" alt="image-20220505160721709" tabindex="0" loading="lazy"><figcaption>image-20220505160721709</figcaption></figure><p>得到了如下文件</p><figure><img src="'+v+`" alt="image-20220505163829544" tabindex="0" loading="lazy"><figcaption>image-20220505163829544</figcaption></figure><p>文件结构如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── build.gradle // 核心文件，类似于pom.xml
├── gradlew
├── gradlew.bat // 这个和上面的是打包和推包之类的时候要用到的脚本,bat是windows下的，另一个是linux下使用的
├── gradle 
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── HELP.md
├── settings.gradle // 包含了一些设置，例如任务和项目之间的依赖关系（相当于项目的简介一样）等，暂时没啥特别的用途
└── src
	<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来对比下自己的build.gradle和springboot的</p><p>自己的：(在app目录下)</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    <span class="token comment">// Apply the application plugin to add support for building a CLI application in Java.</span>
    id <span class="token string">&#39;application&#39;</span>
<span class="token punctuation">}</span>

repositories <span class="token punctuation">{</span>
    <span class="token comment">// Use Maven Central for resolving dependencies.</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    <span class="token comment">// Use JUnit test framework.</span>
    testImplementation <span class="token string">&#39;junit:junit:4.13.2&#39;</span>

    <span class="token comment">// This dependency is used by the application.</span>
    implementation <span class="token string">&#39;com.google.guava:guava:30.1.1-jre&#39;</span>
<span class="token punctuation">}</span>

application <span class="token punctuation">{</span>
    <span class="token comment">// Define the main class for the application.</span>
    mainClass <span class="token operator">=</span> <span class="token string">&#39;TestGradle.App&#39;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringBoot的</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">//项目用到的插件,相当于导入了某个包内的所有task</span>
plugins <span class="token punctuation">{</span>
    <span class="token comment">// 例如导入了springboot，则可以通过gradle -q bootRun 来运行，gradle bootJar来打包</span>
	id <span class="token string">&#39;org.springframework.boot&#39;</span> version <span class="token string">&#39;2.6.7&#39;</span>
	id <span class="token string">&#39;io.spring.dependency-management&#39;</span> version <span class="token string">&#39;1.0.11.RELEASE&#39;</span>
    <span class="token comment">// java的插件</span>
	id <span class="token string">&#39;java&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 和maven一样</span>
group <span class="token operator">=</span> <span class="token string">&#39;com.example&#39;</span>
version <span class="token operator">=</span> <span class="token string">&#39;0.0.1-SNAPSHOT&#39;</span>
<span class="token comment">// 源代码编译的版本</span>
sourceCompatibility <span class="token operator">=</span> <span class="token string">&#39;17&#39;</span>

configurations <span class="token punctuation">{</span>
	compileOnly <span class="token punctuation">{</span>
		extendsFrom annotationProcessor
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义仓库</span>
repositories <span class="token punctuation">{</span>
<span class="token comment">// 使用maven的中央仓库</span>
    <span class="token comment">// 这里也可以选择 jcenter() 谷歌推的给Android的仓库（cdn多） 还有google()</span>
    <span class="token comment">// 也可以三个一起全部写上</span>
	<span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 依赖包管理（项目依赖）</span>
dependencies <span class="token punctuation">{</span>
    <span class="token comment">//implementation：运行时需要的依赖</span>
	implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-web&#39;</span>
    <span class="token comment">// 只编译，不在运行时参合的依赖</span>
	compileOnly <span class="token string">&#39;org.projectlombok:lombok&#39;</span>
    <span class="token comment">// 额外的注释处理器</span>
	annotationProcessor <span class="token string">&#39;org.projectlombok:lombok&#39;</span>
    <span class="token comment">//testImplementation测试环境下需要的依赖</span>
	testImplementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-test&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 声明单元测试的平台</span>
tasks<span class="token punctuation">.</span><span class="token function">named</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="idea使用gradle" tabindex="-1"><a class="header-anchor" href="#idea使用gradle" aria-hidden="true">#</a> IDEA使用Gradle</h3><p>首先，我们打开刚刚download的SpringBoot项目中的<code>gradle\\wrapper\\gradle-wrapper.properties</code></p><p>可以看到有如下内容</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">distributionBase</span><span class="token punctuation">=</span><span class="token value attr-value">GRADLE_USER_HOME</span>
<span class="token key attr-name">distributionPath</span><span class="token punctuation">=</span><span class="token value attr-value">wrapper/dists</span>
<span class="token key attr-name">//</span> <span class="token value attr-value">gradle依赖版本的链接</span>
<span class="token key attr-name">distributionUrl</span><span class="token punctuation">=</span><span class="token value attr-value">https\\://services.gradle.org/distributions/gradle-7.4.1-bin.zip</span>
<span class="token key attr-name">zipStoreBase</span><span class="token punctuation">=</span><span class="token value attr-value">GRADLE_USER_HOME</span>
<span class="token key attr-name">zipStorePath</span><span class="token punctuation">=</span><span class="token value attr-value">wrapper/dists</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你把这玩意拖进ieda里面，就会非常惊奇的发现，idea自动给你又下了一遍gradle，内容就是这个zip...这就是gradle坑爹的地方，他初心是说在任何机器上无论有没有转gradle都可以run，这就显得我们自己下载的gradle非常多余了起来</p><p>而且注意另外两个文件<code>gradlew</code>和<code>gradlew.bat</code></p><p>他们的名字中有一个<code>w</code>，这表示他们在运行的时候将默认使用<code>gradle\\wrapper</code>下的对应版本的gradle进行运行，而不是像我们在控制台那样直接调用环境变量的运行</p><p>所以说ieda自动给你下的gradle就不要管了，但是可以改动下存储的位置</p><div class="hint-container warning"><p class="hint-container-title">不推荐</p><figure><img src="`+m+`" alt="image-20220505170931310" tabindex="0" loading="lazy"><figcaption>image-20220505170931310</figcaption></figure><p>例如改到其他盘下</p><p>PS：还要在设置-新项目设置 内改动下，让全局生效</p></div><p>当然，刚刚在新建项目的时候还是会默认的去下载到刚刚的默认位置，为啥呢？回到配置文件</p><p><code>gradle\\wrapper\\gradle-wrapper.properties</code></p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">//</span> <span class="token value attr-value">gradle的用户路径 找这个环境变量，默认是在当前用户/.gradle下</span>
<span class="token key attr-name">distributionBase</span><span class="token punctuation">=</span><span class="token value attr-value">GRADLE_USER_HOME</span>
<span class="token key attr-name">distributionPath</span><span class="token punctuation">=</span><span class="token value attr-value">wrapper/dists</span>
<span class="token key attr-name">distributionUrl</span><span class="token punctuation">=</span><span class="token value attr-value">https\\://services.gradle.org/distributions/gradle-7.4.1-bin.zip</span>
<span class="token key attr-name">zipStoreBase</span><span class="token punctuation">=</span><span class="token value attr-value">GRADLE_USER_HOME</span>
<span class="token key attr-name">zipStorePath</span><span class="token punctuation">=</span><span class="token value attr-value">wrapper/dists</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>推荐的做法</p></blockquote><p>所以说要解决这个问题的话，我们只需要新建一个环境变量，改成自己想要的地方即可</p><h3 id="如何导包" tabindex="-1"><a class="header-anchor" href="#如何导包" aria-hidden="true">#</a> 如何导包</h3><p>其实非常单件，在dependencies内输入即可</p><p>例如：</p>`,27),G=n("div",{class:"language-groovy line-numbers-mode","data-ext":"groovy"},[n("pre",{groovy:"",class:"language-groovy"},[n("code",null,[s("dependencies "),n("span",{class:"token punctuation"},"{"),s(`
    implementation `),n("span",{class:"token string"},"'com.github.javafaker:javafaker:1.0.2'"),s(`
    implementation `),n("span",{class:"token string"},"'com.alibaba:fastjson:1.2.80'"),s(`
    implementation `),n("span",{class:"token string"},"'org.springframework.boot:spring-boot-starter-web'"),s(`
    compileOnly `),n("span",{class:"token string"},"'org.projectlombok:lombok'"),s(`
    annotationProcessor `),n("span",{class:"token string"},"'org.projectlombok:lombok'"),s(`
    testImplementation `),n("span",{class:"token string"},"'org.springframework.boot:spring-boot-starter-test'"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),j=a(`<p>faker和fastjson都是我导入的，直接去maven仓库或者安装一个maven search插件即可</p><h2 id="✨导包细节" tabindex="-1"><a class="header-anchor" href="#✨导包细节" aria-hidden="true">#</a> ✨导包细节</h2><p>Gradle 依赖的粒度控制相较于 Maven 也更加精细，Maven 只有 <code>compile</code>、<code>provided</code>、<code>test</code>、\`runtime·四种 scope，而 Gradle 有以下几种 scope：</p><ul><li><code>implementation</code> ：默认的 scope。implementation 的作用域会让依赖在编译和运行时均包含在内，但是不会暴露在类库使用者的编译时。举例，如果我们的类库包含了 gson，那么其他人使用我们的类库时，编译时不会出现 gson 的依赖。</li><li><code>api</code> :和 implementation 类似，都是编译和运行时都可见的依赖。但是 api 允许我们将自己类库的依赖暴露给我们类库的使用者。</li><li><code>compileOnly</code> 和<code>runtimeOnly</code> :这两种顾名思义，一种只在编译时可见，一种只在运行时可见。而<code>runtimeOnly</code>和 Maven 的<code>provided</code>比较接近。</li><li><code>testImplementation</code> :这种依赖在测试编译时和运行时可见，类似于 Maven 的<code>test</code>作用域。</li><li><code>testCompileOnly</code>和<code>testRuntimeOnly</code> ：两种类似于<code>compileOnly</code>和<code>runtimeOnly</code>，但是作用于测试编译时和运行时。</li></ul><p>通过简短精悍的依赖配置和多种多样的作用与选择，Gradle 可以为我们提供比 Maven 更加优秀的依赖管理功能。</p><h2 id="✨配置代理仓库" tabindex="-1"><a class="header-anchor" href="#✨配置代理仓库" aria-hidden="true">#</a> ✨配置代理仓库</h2><p>这里以阿里云为例，在<code>%GRADLE_USER_HOME%</code>目录下新建一个<code>init.gradle</code></p><p>然后写入如下内容</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">// %GRADLE_USER_HOME%/init.gradle</span>
allprojects <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        <span class="token comment">// 额外使用阿里云的maven仓库</span>
        maven <span class="token punctuation">{</span>
            url <span class="token interpolation-string"><span class="token string">&quot;https://maven.aliyun.com/repository/public/&quot;</span></span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token interpolation-string"><span class="token string">&quot;https://maven.aliyun.com/repository/jcenter/&quot;</span></span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token interpolation-string"><span class="token string">&quot;https://maven.aliyun.com/repository/spring/&quot;</span></span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token interpolation-string"><span class="token string">&quot;https://maven.aliyun.com/repository/spring-plugin/&quot;</span></span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token interpolation-string"><span class="token string">&quot;https://maven.aliyun.com/repository/Gradle-plugin/&quot;</span></span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token interpolation-string"><span class="token string">&quot;https://maven.aliyun.com/repository/google/&quot;</span></span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token interpolation-string"><span class="token string">&quot;https://maven.aliyun.com/repository/grails-core/&quot;</span></span>
        <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span>
            url <span class="token interpolation-string"><span class="token string">&quot;https://maven.aliyun.com/repository/apache-snapshots/&quot;</span></span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 以及本地仓库</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以生效了，对，其他什么操作都不用做</p><p>更新依赖时效果：</p><figure><img src="`+k+'" alt="image-20220506132417604" tabindex="0" loading="lazy"><figcaption>image-20220506132417604</figcaption></figure><h2 id="groovy语法" tabindex="-1"><a class="header-anchor" href="#groovy语法" aria-hidden="true">#</a> Groovy语法</h2><p>因为gradle的build.gradle就是这玩意整的，所以需要学下它</p>',14),S=n("p",null,"PS：后续我懒得用ieda，所以用了人家的在线编译器",-1),E={href:"http://www.dooccn.com/groovy/",target:"_blank",rel:"noopener noreferrer"},A=a(`<h3 id="基础语法" tabindex="-1"><a class="header-anchor" href="#基础语法" aria-hidden="true">#</a> 基础语法</h3><p>和Python有点像</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token function">println</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;Hello World&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment">// 创建变量</span>

<span class="token keyword">def</span> domain <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;张三&quot;</span></span>

<span class="token comment">// 创建函数</span>
<span class="token keyword">def</span> <span class="token function">buildString</span><span class="token punctuation">(</span>String a <span class="token punctuation">,</span>String b<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">a</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">b</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token comment">// 模板字符串</span>
    <span class="token keyword">return</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">a</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">b</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行函数，传入变量</span>
<span class="token keyword">def</span> result <span class="token operator">=</span> <span class="token function">buildString</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;Hello&quot;</span></span><span class="token punctuation">,</span>domain<span class="token punctuation">)</span>

<span class="token function">println</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;result:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">result</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Hello World
Hello-张三
result:Hello-张三
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其余运算之类的和java的差不多，这里不展示了</p><h3 id="字符串的额外说明" tabindex="-1"><a class="header-anchor" href="#字符串的额外说明" aria-hidden="true">#</a> 字符串的额外说明</h3><p>有三种引号，单引号、双引号、三引号</p><p>单引号没法使用模板字符串($变量名)，双引号可以，三引号可以渲染多行字符串（保留换行缩进之类的），但是不支持使用模板字符串</p><p>如果直接使用<code>$变量名</code>感觉变扭的话，可以使用js的方式<code>\${变量名}</code></p><h3 id="循环的额外说明" tabindex="-1"><a class="header-anchor" href="#循环的额外说明" aria-hidden="true">#</a> 循环的额外说明</h3><p>有个闭包玩法</p><p>emm在java中不太直观，就拿golang的语法来举例子吧</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">zeroAddAndCallBack</span><span class="token punctuation">(</span>num <span class="token builtin">int</span> <span class="token punctuation">,</span> f <span class="token keyword">func</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>num<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">{</span>
        <span class="token function">f</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">zeroAddAndCallBack</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token keyword">func</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就类似于这样，传入函数即闭包</p><p>在groovy中，获取闭包中的值通过it即可，这种语法比较常见</p><figure><img src="`+b+`" alt="image-20220505181804228" tabindex="0" loading="lazy"><figcaption>image-20220505181804228</figcaption></figure><h3 id="使用javabean" tabindex="-1"><a class="header-anchor" href="#使用javabean" aria-hidden="true">#</a> 使用JavaBean</h3><p>直接用即可</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    <span class="token keyword">def</span> name <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;张三&quot;</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

println person<span class="token punctuation">.</span>name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>groovy会给类中每个<strong>没有可见性修饰符的属性</strong>，自动生成get/set方法，我们访问这些属性的时候实际上是在调用这些方法</p><h3 id="list和map" tabindex="-1"><a class="header-anchor" href="#list和map" aria-hidden="true">#</a> List和Map</h3><blockquote><p>List</p><p>除了普通的下标索引，还支持负下标索引（-1开始，最后一位）和范围索引</p></blockquote><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">def</span> nameList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;1&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;3&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;5&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;7&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;9&quot;</span></span><span class="token punctuation">]</span>
println nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
println nameList<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
println nameList<span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">..</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token comment">// 第一个到第三个</span>
println nameList<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// 倒数第一个到正数第一个，倒序打印</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Map</p><p>可以使用instanceof来判断是不是一个hashMap</p><p>注意，在groovy语法中，key始终都是string</p></blockquote><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">def</span> map <span class="token operator">=</span> <span class="token punctuation">[</span>
    Name<span class="token punctuation">:</span><span class="token interpolation-string"><span class="token string">&quot;User&quot;</span></span><span class="token punctuation">,</span>
    Age<span class="token punctuation">:</span><span class="token number">111</span>
<span class="token punctuation">]</span>
println map <span class="token keyword">instanceof</span> <span class="token class-name">HashMap</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;Name&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    println map<span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;Name&quot;</span></span><span class="token punctuation">]</span>
    map<span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;Name&quot;</span></span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;aaa&quot;</span></span>
<span class="token punctuation">}</span>
map<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span>v<span class="token operator">-&gt;</span>println <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">k</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">v</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>e <span class="token keyword">in</span> map<span class="token punctuation">)</span><span class="token punctuation">{</span>
    println e<span class="token punctuation">.</span>key<span class="token operator">+</span>e<span class="token punctuation">.</span>value
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好，暂时先这样吧，以后有啥不懂得再去看看视频</p>`,27),L={href:"https://www.bilibili.com/video/BV1ja411a7fW?p=13&spm_id_from=333.880.my_history.page.click&t=2.2",target:"_blank",rel:"noopener noreferrer"};function J(P,O){const e=p("ExternalLinkIcon");return l(),o("div",null,[h,n("p",null,[s("首先去他的下载地址<"),n("a",y,[s("Gradle | Releases"),i(e)]),s(">")]),f,n("p",null,[n("a",_,[s("DefaultTask - Gradle DSL Version 7.4.2"),i(e)])]),q,n("p",null,[s("首先去"),n("a",w,[s("Spring Initializr"),i(e)]),s("，选择好对应的内容（LomBok、Web）然后选择Gradle构建，然后下载zip包")]),x,G,j,n("blockquote",null,[S,n("p",null,[n("a",E,[s("groovy在线编译器 (dooccn.com)"),i(e)])])]),A,n("p",null,[s("Mark下"),n("a",L,[s("视频地址"),i(e)])])])}const U=t(g,[["render",J],["__file","01-Gradle.html.vue"]]);export{U as default};
