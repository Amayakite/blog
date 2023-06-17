import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c,a as s,b as n,d as t,e}from"./app-3ab2953d.js";const l={},u=e('<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>长篇大论这里就不多说明了，总之 ，这是一门高并发非常牛逼的语言</p><p>额外说一嘴，这并不是一门高级语言，而是一门偏向底层的语言</p><p>性能优异的同时，带来的损失为：少了高级语言例如 Java 中一些灵活的特性，如泛型等</p><p>在学习这门语言之前，个人建议是先熟悉使用其他任意一两门语言</p><p>例如本人是在会用</p><ul><li>Java</li><li>JavaScript</li><li>Typescript</li><li>Python</li></ul><p>才开始学习 Golang，如果是初学者，建议咋样也得先过一遍 C++ 之类的语言，或者 Java、C#这类的高级语言</p><h3 id="安装和配置" tabindex="-1"><a class="header-anchor" href="#安装和配置" aria-hidden="true">#</a> 安装和配置</h3>',9),r={href:"https://go.dev/",target:"_blank",rel:"noopener noreferrer"},d=e(`<p>直接无脑 Next</p><p>Linux 的话，这里以 Ubuntu 为例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> golang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你想要源码安装的话</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#1.下载二进制源码包并将将下载的源码包解压至 /usr/local目录</span>
<span class="token function">wget</span> https://dl.google.com/go/go1.16.6.linux-amd64.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-C</span> /usr/local <span class="token parameter variable">-xzf</span> go1.16.6.linux-amd64.tar.gz

<span class="token comment">#2.将 /usr/local/go/bin 目录添加至PATH环境变量</span>
<span class="token comment">#在/root/.profile进行添加</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOROOT</span><span class="token operator">=</span>/usr/local/go  <span class="token comment"># 安装目录</span>
<span class="token comment">#GOROOT 第三方包的安装包路径</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span>/home/go/      <span class="token comment"># 项目路径一般指向src</span>
<span class="token comment">#需要BIN目录和GOPATH</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$GOROOT</span>/bin

<span class="token comment">#3.验证是否安装成功, 可以打开终端窗口输入go version命令，查看安装的Go版本。</span>
go <span class="token function">env</span>
go version go version go1.16.6 linux/amd64

<span class="token comment">#4.go语言程序编译运行</span>
package main
<span class="token function">import</span> <span class="token string">&quot;fmt&quot;</span>
func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt.Println<span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">#5.编译运行hello.go</span>
go build hello.go
go run hello.go <span class="token operator">&amp;&amp;</span> ./hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gopath-的配置" tabindex="-1"><a class="header-anchor" href="#gopath-的配置" aria-hidden="true">#</a> GOPATH 的配置</h3><p>这个东西就相当于是配置 maven 的打包之类的路径一样，有个默认值</p><p>Windows: 在<code>%USERPROFILE%/go</code>中</p><p>Linux: <code>$HOME/go</code></p><p>这个自己看着修改即可，Windows 直接修改环境变量，加一个<code>GOPATH</code>即可</p><p>例如：<code>C:\\goPath</code>，然后要在这个文件夹下分别新建三个目录</p><ul><li><code>bin</code> 用来存放编译后生成的可执行文件</li><li><code>pkg</code> 用来存放编译后生成的归档文件</li><li><code>src</code> 用来存放源码文件</li></ul><p>然后再到<strong>PATH</strong>环境变量中，把刚刚的<code>GOPATH</code>中的 bin 丢进去，也就是：<code>%GOPATH%/bin</code></p><p>PS：这个 GOPATH 电脑上有默认值的，一般直接修改默认值即可</p><p>至于 Linux 嘛，这里以 Ubuntu 为例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> ~/.profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在文件末尾添加如下内容即可</p><div class="language-profile line-numbers-mode" data-ext="profile"><pre class="language-profile"><code>export GOROOT=&quot;/usr/lib/go-1.8&quot; // 引号内设置为你自己的go安装目录 如果是 apt安装的可以通过whereis golang来查看安装目录
export GOBIN=$GOROOT/bin
export GOPATH=&quot;/home/test/gopath&quot; // 引号内设置为自己的go项目的工作区间
export PATH=$PATH:$GOPATH/bin // 原路径后用冒号连接新路径\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我的 ubuntu 流程为</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 环境变量</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/profile.d/golang-env.sh
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOROOT</span><span class="token operator">=</span>/home/weiyigeek/app/program/go
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span>/home/weiyigeek/app/program/project/go
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">\${<span class="token environment constant">PATH</span>}</span><span class="token builtin class-name">:</span><span class="token variable">\${GOROOT}</span>/bin

<span class="token comment"># 创建 bin,pkg,src</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-vp</span> <span class="token variable">\${GOPATH}</span>/<span class="token punctuation">{</span>bin,pkg,src<span class="token punctuation">}</span>

<span class="token comment"># 重开Shell验证版本</span>
<span class="token function">sudo</span>  <span class="token builtin class-name">source</span> /etc/profile
go version
  <span class="token comment"># go version go1.16.6 linux/amd64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于-go-的项目路径" tabindex="-1"><a class="header-anchor" href="#关于-go-的项目路径" aria-hidden="true">#</a> 关于 go 的项目路径</h3><p>根据上面的 gopath 可以知道，我们的项目一般都是直接源码丢在 gopath 的 src 内</p><p>那么如何命名呢？</p><p>因为跟 java 不同 使用 golang 的可能是学生，所以一般命名方法是使用 github 名称来</p><p>例如我的话想要个 blog 项目和一个 shop 项目，则应该是</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>github.com/amayakite/blog
github.com/amayakite/shop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一个文件格式，总之和 java 也差不多</p><p>或者用我自己的域名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>example.org/amayakite/blog
example.org/amayakite/shop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于编辑器" tabindex="-1"><a class="header-anchor" href="#关于编辑器" aria-hidden="true">#</a> 关于编辑器</h3>`,30),k={href:"https://code.visualstudio.com/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.jetbrains.com/go",target:"_blank",rel:"noopener noreferrer"},m=e(`<p>PS：其实 IEDA 也可以写 go</p><p>如果你选择了 Vscode，只需要安装一个 go 插件就可以很舒服的使用了</p><p>如果你选择的是 Jetbrains 的 GoLang，那么开箱即用就行</p><h2 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> Hello World</h2><p>这里我创建的工程路径为<code>C:\\go\\src\\github.com\\amayakite\\study</code></p><p>其中<code>C:\\go</code>是 GOPATH 的工程路径</p><p>然后其中加一个文件，文件名随意，之后写入如下代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特别<strong>注意</strong> 这个 package 是 main 而不是其他的 否则将无法正确的运行</p><p>接下来你只需要在终端中输入<code>go build</code>或者点下运行按钮之类的即可看到控制台有内容输出</p><p>如果说你输入的是 go build 则还可以 看到同级目录下生成了一个<em>exe</em>可执行文件（Windows 下的话，Linux 同理）</p><p>当然 go build 也可以这样用：<code>go build github.com/amayakite/study</code></p><p>然后就能在<code>github.com\\amayakite</code>目录下看到打包好的可执行文件</p><h3 id="如何跨平台编译" tabindex="-1"><a class="header-anchor" href="#如何跨平台编译" aria-hidden="true">#</a> 如何跨平台编译</h3><p>默认我们 go build 的可执行文件都是当前操作系统可执行的文件，如果我想在 windows 下编译一个 linux 下可执行文件，那需要怎么做呢？</p><p>只需要指定目标操作系统的平台和处理器架构即可，例如 Windows 平台 cmd 下按如下方式指定环境变量编译出的可以执行文件则可以在 Linux 操作系统 amd64 处理器中执行,然后再执行 go build 命令，得到的就是能够在 Linux 平台运行的可执行文件了。</p><p>PS 下面这里我也没搞成功，以后有机会去查查文档即可</p><p>Windows 编译方式如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>SET <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span>  <span class="token comment"># 禁用CGO</span>
SET <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux     <span class="token comment"># 目标平台是linux</span>
SET <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64   <span class="token comment"># 目标处理器架构是amd64</span>
go build <span class="token comment"># 打包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：如果你使用的是 PowerShell 终端，那么设置环境变量的语法为 <code>$ENV:CGO_ENABLED=0</code></p><p>Linux 和 Mac 下多平台的方式如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 目标平台是linux</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build
<span class="token comment"># 目标平台Windows</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>windows <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build
<span class="token comment"># 目标平台Mac</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>darwin <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="go-run" tabindex="-1"><a class="header-anchor" href="#go-run" aria-hidden="true">#</a> go-run</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法：go run xxx.go</span>
go run main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>就像是运行 Python 那样</p><h3 id="go-install" tabindex="-1"><a class="header-anchor" href="#go-install" aria-hidden="true">#</a> go-install</h3><p><code>go install fileName</code></p><ol><li>先编译得到一个可执行文件</li><li>将这个文件复制到 GOPATH 下的<code>bin</code>文件夹下</li></ol><h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2><p>带过一下，main 包的话就相当于是 Java 中的<code>public static void main(Stirng args[])</code>那样</p><p>通过<code>package main</code>标注的文件，其中的 main 方法将会自动作为程序的主方法</p><h3 id="声明变量" tabindex="-1"><a class="header-anchor" href="#声明变量" aria-hidden="true">#</a> 声明变量</h3><p>注意 在 go 语言中，所有变量声明了 就必须使用，否则编译不给过</p><p>当然 可以先声明，然后在方法中赋值 都是可以的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
 <span class="token string">&quot;fmt&quot;</span>
 <span class="token string">&quot;strconv&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> name <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;张三&quot;</span>
<span class="token keyword">var</span> age <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">var</span> isOk <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;name:&quot;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span>
    <span class="token comment">//数值转换Str</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;age:&quot;</span> <span class="token operator">+</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>isOk<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模板字符串输出" tabindex="-1"><a class="header-anchor" href="#模板字符串输出" aria-hidden="true">#</a> 模板字符串输出</h3><p>使用<code>Printf</code>即可，然后<code>%s</code>表示要格式化成一个字符串</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span><span class="token string">&quot;fmt&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> name <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;张三&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;name:%s\\n&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="匿名变量" tabindex="-1"><a class="header-anchor" href="#匿名变量" aria-hidden="true">#</a> 匿名变量</h3><p>先看代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> s<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Amaya-kite&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>当调用一个会返回多个返回值的函数时，如果不想要其中的某些返回值，可以使用<code>_</code>来接收，这样就不会报错，并且其余的可以正常使用（额外说下，这多个返回值看着还是蛮舒服的）</p></blockquote><p>PS：匿名变量不占用命名空间，不会分配内存，所以匿名变量之间不存在重复声明</p><p>注意：</p><ol><li>函数外的每个语句都必须以关键字开始（var、const、func 等）</li><li><code>_</code>多用于占位，表示忽略该值</li></ol><h3 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h3><p>就像是用 JavaScript 那样，或者 Java 中的<code>Final</code>那样，这玩意需要在声明的时候赋值：</p><p>语法很简单，就一个：<code>const xx string = xx</code></p><h3 id="同时声明多个变量或者常量" tabindex="-1"><a class="header-anchor" href="#同时声明多个变量或者常量" aria-hidden="true">#</a> 同时声明多个变量或者常量</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">var</span> <span class="token punctuation">(</span>
    name <span class="token operator">=</span>  <span class="token string">&quot;张三&quot;</span>
    age <span class="token operator">=</span> <span class="token number">10</span>
    sex <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
    city  <span class="token operator">=</span> <span class="token string">&quot;ShangHai&quot;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如果想省略-var" tabindex="-1"><a class="header-anchor" href="#如果想省略-var" aria-hidden="true">#</a> 如果想省略 var</h3><p>注意 只能在方法内这样用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    f1 <span class="token operator">:=</span> <span class="token number">1.23456</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>f1<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="iota-自增" tabindex="-1"><a class="header-anchor" href="#iota-自增" aria-hidden="true">#</a> IOTA(自增)</h3><p>应用场景应该是一些枚举之类的自增吧,当然这里面也可以使用<code>_</code>来略过某一个数值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
    a1 <span class="token operator">=</span> <span class="token boolean">iota</span>
    a2
    a3
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a1:%d\\n&quot;</span><span class="token punctuation">,</span> a1<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a2:%d\\n&quot;</span><span class="token punctuation">,</span> a2<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a3:%d\\n&quot;</span><span class="token punctuation">,</span> a3<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    a1:0
    a2:1
    a3:2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然也可以插队</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
    a1 <span class="token operator">=</span> <span class="token boolean">iota</span>
    a2 <span class="token operator">=</span> <span class="token number">100</span>
    a3 <span class="token operator">=</span> <span class="token boolean">iota</span>
    a4
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a1:%d\\n&quot;</span><span class="token punctuation">,</span> a1<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a2:%d\\n&quot;</span><span class="token punctuation">,</span> a2<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a3:%d\\n&quot;</span><span class="token punctuation">,</span> a3<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a4:%d\\n&quot;</span><span class="token punctuation">,</span> a4<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a1:0
a2:100
a3:2
a4:3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进阶用法：例如存储 KB</p><p>（这里的&lt;&lt;表示左移操作，1&lt;&lt;10 表示将 1 的二进制表示向左移 10 位，也就是由 1 变成了 10000000000，也就是十进制的 1024。同理 2&lt;&lt;2 表示将 2 的二进制表示向左移 2 位，也就是由 10 变成了 1000，也就是十进制的 8。）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
    <span class="token boolean">_</span>  <span class="token operator">=</span> <span class="token boolean">iota</span>
    KB <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token boolean">iota</span><span class="token punctuation">)</span>
    MB <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token boolean">iota</span><span class="token punctuation">)</span>
    GB <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token boolean">iota</span><span class="token punctuation">)</span>
    TB <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token boolean">iota</span><span class="token punctuation">)</span>
    PB <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">*</span> <span class="token boolean">iota</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;KB:%d\\n&quot;</span><span class="token punctuation">,</span> KB<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;MB:%d\\n&quot;</span><span class="token punctuation">,</span> MB<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;GB:%d\\n&quot;</span><span class="token punctuation">,</span> GB<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;TB:%d\\n&quot;</span><span class="token punctuation">,</span> TB<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;PB:%d\\n&quot;</span><span class="token punctuation">,</span> PB<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>KB:1024
MB:1048576
GB:1073741824
TB:1099511627776
PB:1125899906842624
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于整数的进制" tabindex="-1"><a class="header-anchor" href="#关于整数的进制" aria-hidden="true">#</a> 关于整数的进制</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//十进制</span>
    <span class="token keyword">var</span> i1 <span class="token operator">=</span> <span class="token number">101</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> i1<span class="token punctuation">)</span>
    <span class="token comment">// 八进制</span>
    <span class="token keyword">var</span> i2 <span class="token operator">=</span> <span class="token number">077</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> i2<span class="token punctuation">)</span>
    <span class="token comment">// 十六进制</span>
    <span class="token keyword">var</span> i3 <span class="token operator">=</span> <span class="token number">0x123456789</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> i3<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转换的话，例如转换成 int8，则需要<code>int8(132113)</code></p><h3 id="关于浮点数" tabindex="-1"><a class="header-anchor" href="#关于浮点数" aria-hidden="true">#</a> 关于浮点数</h3><p>默认类型是<code>float64</code>类型的</p><p>声明：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    f1 <span class="token operator">:=</span> <span class="token number">1.23456</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>f1<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要定义 float32，则这样<code>f1 = float32(111.111)</code></p><h3 id="关于-boolean" tabindex="-1"><a class="header-anchor" href="#关于-boolean" aria-hidden="true">#</a> 关于 Boolean</h3><blockquote><p>如果不赋值的话 默认是 false</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    myBool <span class="token operator">:=</span> <span class="token boolean">true</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%t\\n&quot;</span><span class="token punctuation">,</span> myBool<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于字符串的转义符" tabindex="-1"><a class="header-anchor" href="#关于字符串的转义符" aria-hidden="true">#</a> 关于字符串的转义符</h3><ul><li><code>\\r</code>回车符（跳转到下一行行首）</li><li><code>\\n</code>换行符（直接跳转到下一行同列位置）</li><li><code>\\t</code>制表符</li><li><code>\\&#39;</code>单引号</li><li><code>\\&quot;</code>双引号</li><li><code>\\\\</code>反斜杠</li></ul><p>和 Java 之类的是一样的</p><h3 id="字符串的修改" tabindex="-1"><a class="header-anchor" href="#字符串的修改" aria-hidden="true">#</a> 字符串的修改</h3><p>直接修改的话 是这种画风</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    str1 <span class="token operator">:=</span> <span class="token string">&quot;兔子&quot;</span>
    <span class="token comment">//转换成char数组 这里也叫rune</span>
    str2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>str1<span class="token punctuation">)</span>
    <span class="token comment">//指定位置的替换</span>
    str2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;猴&#39;</span>
    <span class="token comment">//然后再转换成字符串</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>str2<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然 可以通过这种方式来获取字符串的长度</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;字符串的长度为：%d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">strCount</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">strCount</span><span class="token punctuation">(</span>str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于-if-判断" tabindex="-1"><a class="header-anchor" href="#关于-if-判断" aria-hidden="true">#</a> 关于 if 判断</h3><p>基本语法和其他的语言没啥区别</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    age <span class="token operator">:=</span> <span class="token number">18</span>
    name <span class="token operator">:=</span> <span class="token string">&quot;张三&quot;</span>

    <span class="token keyword">if</span> age <span class="token operator">&gt;=</span> <span class="token number">18</span> <span class="token operator">&amp;&amp;</span> name <span class="token operator">==</span> <span class="token string">&quot;李四&quot;</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Say Hello &quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是在 go 中，可以声明只在 if 语句内起作用的变量</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span> age <span class="token operator">:=</span> <span class="token number">19</span><span class="token punctuation">;</span> age <span class="token operator">&gt;</span> <span class="token number">18</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;年龄大于18&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 age 的作用域为这个 if 的语句内（包括后续的 else 之类 的）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span> age <span class="token operator">:=</span> <span class="token function">strCount</span><span class="token punctuation">(</span><span class="token string">&quot;adsadsadsadsada&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> age <span class="token operator">&gt;</span> <span class="token number">18</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;长度大于18&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> age <span class="token operator">&lt;</span> <span class="token number">18</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;长度小于18&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">strCount</span><span class="token punctuation">(</span>str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于-for-循环" tabindex="-1"><a class="header-anchor" href="#关于-for-循环" aria-hidden="true">#</a> 关于 for 循环</h3><p>基本的使用和其他语言没啥区别</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;Hello &quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增强 for 的话，语法是这样的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    str <span class="token operator">:=</span> <span class="token string">&quot;Hello World&quot;</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> str <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 这相当于是一个语法糖，获取到的 i 本质还是一个 0 开始的数值</p><p>如果想要通过其来获取 str 的内容的话 可以这样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    str <span class="token operator">:=</span> <span class="token string">&quot;Hello World&quot;</span>

    strArray <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> str <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>strArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要无限循环的话：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">for</span><span class="token punctuation">{</span>
    循环体语句
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于-switch" tabindex="-1"><a class="header-anchor" href="#关于-switch" aria-hidden="true">#</a> 关于 switch</h3><p>使用起来和其他语言没有区别（不过不用写 break）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    n <span class="token operator">:=</span> <span class="token number">5</span>
    <span class="token keyword">switch</span> n <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;four&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，在 Switch 中可以跟很多值，例如<code>case 1,3,5,7,9</code>，这里就不演示了</p><p>也可以跟判断，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    n <span class="token operator">:=</span> <span class="token number">5</span>
    <span class="token keyword">switch</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> n <span class="token operator">&gt;</span> <span class="token number">30</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;n is greater than 30&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> n <span class="token operator">&gt;</span> <span class="token number">20</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;n is greater than 20&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> n <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;n is greater than 10&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;n is less than 10&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="goto-跳到指定的位置" tabindex="-1"><a class="header-anchor" href="#goto-跳到指定的位置" aria-hidden="true">#</a> GOTO 跳到指定的位置</h3><p>我们都知道<code>break</code>是调出循环，然后<code>continue</code>是进入下一轮循环</p><p>如果想在 go 语言的循环的循环中调出所有循环，就可以使用 GOTO</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> i<span class="token operator">*</span>j <span class="token operator">==</span> <span class="token number">1000</span> <span class="token punctuation">{</span>
                <span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">*</span> j<span class="token punctuation">)</span>
                <span class="token keyword">goto</span> end
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
end<span class="token punctuation">:</span> <span class="token comment">// 这里是label标签 嘛反正通常是跟goto一起使用的</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="golang-中的字符串对比" tabindex="-1"><a class="header-anchor" href="#golang-中的字符串对比" aria-hidden="true">#</a> GoLang 中的字符串对比</h3><p>这个放心，直接<code>==</code>对比就行了，是直接对比值的，和 Java 不一样的</p><h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
 <span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 声明，不指定值 注意 如果声明的是int类型，那么默认值为0</span>
    <span class="token comment">// 如果声明的是string类型，那么默认值为空字符串</span>
    <span class="token comment">// 如果声明的是bool类型，那么默认值为false</span>
    <span class="token keyword">var</span> arr <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">string</span>
    arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span>
    <span class="token function">println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;_&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 声明，指定值</span>
    arr2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">}</span>
    <span class="token function">println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>arr2<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;_&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 声明，根据初始化值自动确定长度</span>
    arr3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">}</span>
    <span class="token function">println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>arr3<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;_&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;数组长度：&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>arr3<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 声明，根据索引来初始化指定位置的值</span>
    arr4 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">:</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">}</span>
    <span class="token function">println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>arr4<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;_&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 数组的遍历</span>

    <span class="token comment">// 先创建一个数组，长度为10 string</span>
    arr5 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;g&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;h&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;j&quot;</span><span class="token punctuation">}</span>

    <span class="token comment">// 使用普通for循环遍历</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>arr5<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span>arr5<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 使用range遍历 i就是索引，v就是值</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> arr5 <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建一个二维数组</span>
    arr6 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> arr6 <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v2 <span class="token operator">:=</span> <span class="token keyword">range</span> v <span class="token punctuation">{</span>
            <span class="token function">println</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="切片" tabindex="-1"><a class="header-anchor" href="#切片" aria-hidden="true">#</a> 切片</h3><p>emm 就是不给定初始长度的数组</p><p>注意 如果说通过赋值的方式传递值</p><p>例如说通过拷贝数组的方式，则是指针传递，也就是传过去后，修改原来数组的指定位置的值，对应的，切片内的值也会被修改</p><p>它自己本身没有任何值，全都是引用其他地方的</p><p>那个 append 之后会说明</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> arrt <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>

    <span class="token comment">// 添加方式1 支持扩容的</span>
    arrt <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>arrt<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    arrt <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>arrt<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
    arrt <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>arrt<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
    arrt <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>arrt<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arrt<span class="token punctuation">)</span>

    <span class="token comment">// 添加方式2</span>
    <span class="token keyword">var</span> arrt2 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
    arr <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
    arrt2 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>arrt2<span class="token punctuation">,</span> arr<span class="token operator">...</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arrt2<span class="token punctuation">)</span>

    <span class="token comment">// 添加方式3</span>
    <span class="token keyword">var</span> attr3 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
    <span class="token comment">// 包左不包右</span>
    attr3 <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>
    <span class="token comment">// 注意 这里都是指针传递</span>
    arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>attr3<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="切片的本质" tabindex="-1"><a class="header-anchor" href="#切片的本质" aria-hidden="true">#</a> 切片的本质</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 创建一个切片，类型是int，长度是5，容量是10</span>
    <span class="token comment">// 长度就相当于初始的数组的长度</span>
    <span class="token comment">// 容量就相当于最大的数量</span>
    s1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;s1=%v, len(s1)=%d, cap(s1)=%d\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// s1=[0 0 0 0 0], len(s1)=5, cap(s1)=10</span>
    <span class="token comment">// 添加11个元素</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">11</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    <span class="token comment">// append：给指定的切片添加一个元素</span>
    s1 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;s1=%v, len(s1)=%d, cap(s1)=%d\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// s1=[0 0 0 0 0 0 1 2 3 4 5 6 7 8 9 10], len(s1)=16, cap(s1)=20</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>嘛，这东西，越用越像 Java 的 ArrayList，可以看到，内容是动态添加的....，并且还会*2 的扩容</p><p>貌似是 Java 中 LinkedList 的扩容机制</p><p>就是一个框，框柱了一块连续的内存</p><p>所以，要判断一个切片是否绑定了数组，需要<code>arr==nil</code>,要判断一个切片是否为空，则需要用<code>len(arr)==0</code></p><blockquote><p>PS:<code>nil</code>值切片的长度和容量都是 0</p></blockquote><p>两个切片之间是不能通过<code>==</code>来判断是否相等的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> s0 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>

    <span class="token comment">// true</span>
    <span class="token function">println</span><span class="token punctuation">(</span>s0 <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>

    s1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment">// false</span>
    <span class="token function">println</span><span class="token punctuation">(</span>s1 <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="切片的-append-和-copy" tabindex="-1"><a class="header-anchor" href="#切片的-append-和-copy" aria-hidden="true">#</a> 切片的 append 和 copy</h3><p>就是给切片尾部追加一个元素，达到上限的时候会触发动态扩容机制</p><blockquote><p>PS 动态扩容机制：开始*2，如果老的容量大于等于 1024 时，则是 1/4 的增长 也就是 a + (0.25xa)</p></blockquote><p>使用的时候必须调用原来的切片接收返回值(相当于返回一个对象，就跟 Java 中 ArrayList 的底层扩容机制似的，一个数组的长度是不可变的，要想增加只能创建一个新数组并替换老的数组)</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    s1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">}</span>

    s1 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">)</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，Append 还可以删除指定的元素，这里就不多做说明了（用到了再去百度）</p><p>至于 Copy 嘛，就非常简单了，就是将一个老的切片的内容复制给一个新的切片</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    arr1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span>
    arr2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token comment">// 第一个参数：接收方</span>
    <span class="token comment">// 第二个参数：源</span>
    <span class="token function">copy</span><span class="token punctuation">(</span>arr2<span class="token punctuation">,</span> arr1<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr2<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 上面的运行结果为：<code>[1 2 3 4 5]</code>，也就是说，接收方没法接收大于自己长度的切片 超过自己长度的将会被省略</p><h2 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h2><p>在 Go 语言中，这玩意被封装的还是比较简单的</p><p>Go 语言中不存在指针的操作，只需要记住两个符号即可</p><ol><li><code>&amp;</code>获取指针的地址</li><li><code>*</code>根据地址取值</li></ol><p>对 没错 就这两个，接下来测试下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    n <span class="token operator">:=</span> <span class="token number">18</span>
    <span class="token comment">// 打印内存地址</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>n<span class="token punctuation">)</span>

    p <span class="token operator">:=</span> <span class="token operator">&amp;</span>n
    <span class="token comment">// 类型是一个指针类型*int</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;类型为%T\\n&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>

    <span class="token comment">// 打印指针的值(根据地址取值)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;指针的值为%d\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>p<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建指针和指针值的修改" tabindex="-1"><a class="header-anchor" href="#创建指针和指针值的修改" aria-hidden="true">#</a> 创建指针和指针值的修改</h3><p>非常简单</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> a <span class="token operator">*</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
    <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token number">10</span>
    <span class="token comment">// 分别打印地址和值</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;地址:&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;值:&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>反正只要记住两点，&amp;是操纵地址，*是操纵(获取)实际的值</p><h3 id="关于-make-方法" tabindex="-1"><a class="header-anchor" href="#关于-make-方法" aria-hidden="true">#</a> 关于 make 方法</h3><p><code>make</code>也是用于内存分配的，区别于<code>new</code>，它只适用于<code>slice</code>、<code>map</code>、<code>channel</code>的内存创建，而且它的返回值类型就是这三个类型的本身，因为这三种类型本身就是引用类型，所以就没有必要返回他们的指针了，make 函数的函数签名如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">make</span><span class="token punctuation">(</span>t Type<span class="token punctuation">,</span>size <span class="token operator">...</span>IntegerType<span class="token punctuation">)</span> Type
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>make 函数是无可替代的，在我们使用 slice、map 以及 channel 的时候，都需要使用 make 进行初始化，然后才可以进行对他们的操作，关于<code>channel</code>会在后面说明</p><p>总结就是如下几点：</p><ol><li>make 和 new 都是用来申请内存的</li><li>new 很少用，一般都是来给基本的数据类型申请内存，例如 string/int 等</li><li>make 是用来给<code>slice</code>、<code>map</code>、<code>channel</code>申请内存的，make 函数返回对应的这三个类型本身</li></ol><h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h2><p>emm 这东西就相当于 Java 的 HashMap 或者说 JavaScript 的 Object,用法层面更像是 JavaScript</p><p>底层实现是 hash，也就是无序的 key-value 结构，并且 key 是不重复的</p><p>在 go 语言中使用它的时候，必须得先定义才能使用，定义的语法如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">map</span><span class="token punctuation">[</span>keyType<span class="token punctuation">]</span>valueType
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>keyType</code>:键的类型</li><li><code>valueType</code>:值的类型</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
 <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> myMap <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span>

    <span class="token comment">// 在使用之前必须使用make来创建 这里和上面的可以合并成一句话</span>
    <span class="token comment">// 上面只是声明，并没有初始化，就像是Java中 public HashMap map;一样</span>
    myMap <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>

    <span class="token comment">// 赋值 固定方法</span>
    myMap<span class="token punctuation">[</span><span class="token string">&quot;key1&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;value1&quot;</span>
    myMap<span class="token punctuation">[</span><span class="token string">&quot;key2&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;value2&quot;</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;myMap: %v\\n&quot;</span><span class="token punctuation">,</span> myMap<span class="token punctuation">)</span>

    <span class="token comment">// 取指定值</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;myMap[key1]: %v\\n&quot;</span><span class="token punctuation">,</span> myMap<span class="token punctuation">[</span><span class="token string">&quot;key1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment">// 改变值</span>
    myMap<span class="token punctuation">[</span><span class="token string">&quot;key1&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;value1-new&quot;</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;myMap[key1]: %v\\n&quot;</span><span class="token punctuation">,</span> myMap<span class="token punctuation">[</span><span class="token string">&quot;key1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment">// 删除指定值 如果删除一个不存在的啥也不会发生</span>
    <span class="token function">delete</span><span class="token punctuation">(</span>myMap<span class="token punctuation">,</span> <span class="token string">&quot;key1&quot;</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;myMap: %v\\n&quot;</span><span class="token punctuation">,</span> myMap<span class="token punctuation">)</span>

    <span class="token comment">// 判断是否存在指定值</span>
    value<span class="token punctuation">,</span> ok <span class="token operator">:=</span>  <span class="token punctuation">[</span><span class="token string">&quot;key1&quot;</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> ok <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;myMap[key1]: %v\\n&quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;myMap[key1] is not exist\\n&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 打印map的长度</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;myMap length: %v\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>myMap<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 添加一些内容，并遍历打印</span>
    myMap<span class="token punctuation">[</span><span class="token string">&quot;key3&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;value3&quot;</span>
    myMap<span class="token punctuation">[</span><span class="token string">&quot;key4&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;value4&quot;</span>
    <span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> myMap <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;key: %v, value: %v\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><p>和其他语言不同的是，如果有返回值的情况下</p><p>可以给返回值指定名字</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> <span class="token punctuation">(</span>
        a <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span>
        b <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">2</span>
    <span class="token punctuation">)</span>

    <span class="token function">println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token function">add2</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token function">add3</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">,</span> <span class="token operator">&amp;</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token comment">// 命名返回值，return的时候可以省略后面的内容（前提是返回值的内容要赋值过）</span>
<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ret <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ret <span class="token operator">=</span> x <span class="token operator">+</span> y
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token comment">// 下面这等价于上面</span>
<span class="token keyword">func</span> <span class="token function">add2</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token comment">// 也也可以用指针的方式</span>
<span class="token keyword">func</span> <span class="token function">add3</span><span class="token punctuation">(</span>x <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">*</span>x <span class="token operator">+</span> <span class="token operator">*</span>y
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要使用可变参数，则可以这样(本质也是传数组罢了)</p><p>下方案例中，y 的类型是<strong>切片类型</strong></p><p>可以传一个、多个、或者不传，但是一定要放在最后</p><p>在 Go 语言中，和 Java 一样，没有默认参数这个概念</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token function">testArr</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">testArr</span><span class="token punctuation">(</span>x <span class="token builtin">string</span><span class="token punctuation">,</span> y <span class="token operator">...</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> y <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数中的-defer" tabindex="-1"><a class="header-anchor" href="#函数中的-defer" aria-hidden="true">#</a> 函数中的 defer</h3><p>这个东西用法有点特殊</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">deferDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">deferDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Start&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">defer</span> <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;这话将在最后执行&quot;</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>defer println(&quot;这话将在最后执行&quot;)</code>这行代码将会在 end 之后执行</p><p>使用了<code>defer</code>标注的语句 将会在整个方法执行结束前执行，一般这个东西是用于<strong>释放 IO 资源</strong>之类的</p><p>也就是省的自己忘了那啥释放资源</p><p>当然，这个东西也可以定义多个，如果有多个的话，则按照<code>defer</code></p><p>使用了<code>defer</code>标注的语句 将会在整个方法执行结束前执行，一般这个东西是用于<strong>释放 IO 资源</strong>之类的</p><p>也就是省的自己忘了那啥释放资源</p><p>当然，这个东西也可以定义多个，如果有多个的话，则按照<code>defer</code>的顺序逆序执行（优先执行最后使用 defer 定义的）</p><p>额外说明一嘴：如果说加了 defer，则整个函数的执行将不是原子性的</p><p>如果说没有加 defer，例如<code>return x</code></p><ul><li>返回值=x</li><li>return 指令</li></ul><p>如果有了 defer</p><ul><li>返回值=x</li><li>运行 defer</li><li>return 指令</li></ul><h3 id="匿名函数" tabindex="-1"><a class="header-anchor" href="#匿名函数" aria-hidden="true">#</a> 匿名函数</h3><p>这个嘛，就和 JavaScript 中的一样</p><p>用法：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;add&quot;</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数作为参数类型和返回值" tabindex="-1"><a class="header-anchor" href="#函数作为参数类型和返回值" aria-hidden="true">#</a> 函数作为参数类型和返回值</h3><p>见名知意，那么该如何使用呢？</p><p>首先来看看一段代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">100</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a <span class="token operator">:=</span> f1
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
    b <span class="token operator">:=</span> f2
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func()
func() int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>所以说我们将它做当成一个参数使用只需要</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">myFunction</span><span class="token punctuation">(</span>x <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ret <span class="token operator">:=</span> <span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">10</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">myFunction</span><span class="token punctuation">(</span>getNumber<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当成一个返回值只需要</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>

	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">10</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	x <span class="token operator">:=</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="异常" tabindex="-1"><a class="header-anchor" href="#异常" aria-hidden="true">#</a> 异常</h2><p>这有可能是 Go 语言中最傻*的地方，之后写代码有概率满屏幕的<code>if(err!=null)</code>之类的语句出现，对，都是因为异常捕获机制造成的...</p><h3 id="不推荐使用的异常捕获方式" tabindex="-1"><a class="header-anchor" href="#不推荐使用的异常捕获方式" aria-hidden="true">#</a> 不推荐使用的异常捕获方式</h3><p>不同于其他语言的<code>try...catch</code>，在 go 中，异常有两个定义</p><ul><li>抛出异常：<code>panic</code></li><li>试图捕获异常：<code>recover</code></li></ul><p>先看看怎么抛出一个异常</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">funcA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;AAAAAAAA&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">funcB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;出现了严重的错误&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;BBBB&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">funcC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;CCCCC&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">funcA</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">funcB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">funcC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当程序执行到 funcB 的时候，panic 将会抛出异常，并且让这个线程剩余的代码停止运行并结束</p><p>PS：如果在有 panic 的语句中加入了 <code>defer</code>之类声明的函数，则在 panic 抛出之前，defer 代码的内容将会执行</p><p>如果想要捕获这个异常，则：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">funcA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;AAAAAAAA&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">funcB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;出现了严重的错误&quot;</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;BBBB&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">funcC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;CCCCC&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">funcA</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">funcB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">funcC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>AAAAAAAA
出现了严重的错误
CCCCC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这......用起来是真的有点蛋疼</p><p>所以使用这个东西记住两点：</p><ol><li><strong>recover()必须搭配 defer 使用</strong></li><li>defer 一定要在<strong>可能会产生</strong> panic 的代码之前定义</li></ol><p>这个已经过时了，现在不推荐这样使用，而是这样</p><h3 id="定义异常" tabindex="-1"><a class="header-anchor" href="#定义异常" aria-hidden="true">#</a> 定义异常</h3><p>在 Golang 中利用 error 类型实现了 error 接口，并且可以通过 errors.New 或者 fmt.Errorf 来快速创建错误实例。</p><p>主要应用场景: 在 Go 语言中，错误是可以预期的，并且不是非常严重，不会影响程序的运行。对于这类问题可以用返回错误给调用者的方法，让调用者自己决定如何处理，通常采用 error 接口进行实现。</p><p>error 接口定义:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> <span class="token builtin">error</span> <span class="token keyword">interface</span> <span class="token punctuation">{</span>
  <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go 语言的标准库代码包 errors 方法：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 方式1.在errors包中的New方法（Go 1.13 版本）。</span>
<span class="token keyword">package</span> errors
<span class="token comment">// go提供了errorString结构体，其则实现了error接口</span>
<span class="token keyword">type</span> errorString <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  text <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>errorString<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> e<span class="token punctuation">.</span>text
<span class="token punctuation">}</span>

<span class="token comment">// 在errors包中，还提供了New函数，来实例化errorString，如下：</span>
<span class="token keyword">func</span> <span class="token function">New</span><span class="token punctuation">(</span>text <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&amp;</span>errorString<span class="token punctuation">{</span>text<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方式2.另一个可以生成error类型值的方法是调用fmt包中的Errorf函数(Go 1.13 版本以后)</span>
<span class="token keyword">package</span> fmt
<span class="token keyword">import</span> <span class="token string">&quot;errors&quot;</span>
<span class="token keyword">func</span> <span class="token function">Errorf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span><span class="token punctuation">{</span>
	<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>format<span class="token punctuation">,</span>args<span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采用 errors 包中装饰一个错误;</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>errors<span class="token punctuation">.</span><span class="token function">Unwrap</span><span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span>	<span class="token comment">//通过 errors.Unwrap 函数得到被嵌套的 error。</span>
errors<span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> target <span class="token builtin">error</span><span class="token punctuation">)</span>	<span class="token comment">//用来判断两个 error 是否是同一个</span>
errors<span class="token punctuation">.</span><span class="token function">As</span><span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">,</span> target <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>	<span class="token comment">//error 断言</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际示例 1:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 错误处理</span>
<span class="token comment">// 1.Error</span>
<span class="token keyword">func</span> <span class="token function">demo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.声明并初始化为error类型</span>
	<span class="token keyword">var</span> errNew <span class="token builtin">error</span> <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;# 错误信息来自 errors.New 方法。&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>errNew<span class="token punctuation">)</span>

	<span class="token comment">// 2.调用标准库中Errorf方法</span>
	errorfFun <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;- %s&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;错误信息来自 fmt.Errorf 方法。&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>errorfFun<span class="token punctuation">)</span>

	<span class="token comment">// 3.实际案例</span>
	result<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ret <span class="token builtin">float64</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> <span class="token boolean">nil</span>
		<span class="token keyword">if</span> b <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;此处幂指数不能为0值,其结果都为1&quot;</span><span class="token punctuation">)</span>
			ret <span class="token operator">=</span> <span class="token number">1</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			ret <span class="token operator">=</span> math<span class="token punctuation">.</span><span class="token function">Pow</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;# 输出错误信息:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;5 ^ 0 = %v&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;5 ^ 2 = %v&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">demo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>错误信息来自 errors.New 方法。
错误信息来自 fmt.Errorf 方法。
输出错误信息: 此处幂指数不能为 0 值,其结果都为 1
5 ^ 0 = 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际示例 2:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义一个 DivideError 结构 (值得学习)</span>
<span class="token keyword">type</span> DivideError <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  dividee <span class="token builtin">int</span>
  divider <span class="token builtin">int</span>
<span class="token punctuation">}</span>
<span class="token comment">// 实现 \`error\` 接口 (值得学习)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>de <span class="token operator">*</span>DivideError<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  strFormat <span class="token operator">:=</span> <span class="token string">\`
  Cannot proceed, the divider is zero.
  dividee: %d
  divider: 0
\`</span>
  <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>strFormat<span class="token punctuation">,</span> de<span class="token punctuation">.</span>dividee<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 \`int\` 类型除法运算的函数</span>
<span class="token keyword">func</span> <span class="token function">Divide</span><span class="token punctuation">(</span>varDividee <span class="token builtin">int</span><span class="token punctuation">,</span> varDivider <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>result <span class="token builtin">int</span><span class="token punctuation">,</span> errorMsg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> varDivider <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
    dData <span class="token operator">:=</span> DivideError<span class="token punctuation">{</span>
            dividee<span class="token punctuation">:</span> varDividee<span class="token punctuation">,</span>
            divider<span class="token punctuation">:</span> varDivider<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    errorMsg <span class="token operator">=</span> dData<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> varDividee <span class="token operator">/</span> varDivider<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 正常情况</span>
  <span class="token keyword">if</span> result<span class="token punctuation">,</span> errorMsg <span class="token operator">:=</span> <span class="token function">Divide</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> errorMsg <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;100/10 = &quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 当除数为零的时候会返回错误信息</span>
  <span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> errorMsg <span class="token operator">:=</span> <span class="token function">Divide</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> errorMsg <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;errorMsg is: &quot;</span><span class="token punctuation">,</span> errorMsg<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>100/10 =  10
errorMsg is:
  Cannot proceed, the divider is zero.
  dividee: 100
  divider: 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用库-fmt" tabindex="-1"><a class="header-anchor" href="#常用库-fmt" aria-hidden="true">#</a> 常用库-fmt</h2><p>这个东西嘛，就是拿来打印东西的</p>`,240),b={href:"https://studygolang.com/pkgdoc",target:"_blank",rel:"noopener noreferrer"},g=e(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># 通用</span>

%v	值的默认格式表示
%+v	类似%v，但输出结构体时会添加字段名
%<span class="token comment">#v	值的Go语法表示</span>
%T	值的类型的Go语法表示
%%	百分号

<span class="token comment"># boolean</span>

%t	单词true或false

<span class="token comment"># number</span>

%b	表示为二进制
%c	该值对应的unicode码值
%d	表示为十进制
%o	表示为八进制
%q	该值对应的单引号括起来的go语法字符字面值，必要时会采用安全的转义表示
%x	表示为十六进制，使用a-f
%X	表示为十六进制，使用A-F
%U	表示为Unicode格式：U+1234，等价于<span class="token string">&quot;U+%04X&quot;</span>

<span class="token comment"># float</span>

%b	无小数部分、二进制指数的科学计数法，如-123456p-78；参见strconv.FormatFloat
%e	科学计数法，如-1234.456e+78
%E	科学计数法，如-1234.456E+78
%f	有小数部分但无指数部分，如123.456
%F	等价于%f
%g	根据实际情况采用%e或%f格式（以获得更简洁、准确的输出）
%G	根据实际情况采用%E或%F格式（以获得更简洁、准确的输出）

<span class="token comment"># string</span>

%s	直接输出字符串或者<span class="token punctuation">[</span><span class="token punctuation">]</span>byte
%q	该值对应的双引号括起来的go语法字符串字面值，必要时会采用安全的转义表示
%x	每个字节用两字符十六进制数表示（使用a-f）
%X	每个字节用两字符十六进制数表示（使用A-F）

<span class="token comment"># 指针</span>

%p	表示为十六进制，并加上前导的0x

<span class="token comment"># 关于精度</span>

%f:    默认宽度，默认精度
%9f    宽度9，默认精度
%.2f   默认宽度，精度2
%9.2f  宽度9，精度2
%9.f   宽度9，精度0

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function f(h,q){const a=i("ExternalLinkIcon");return o(),c("div",null,[u,s("p",null,[n("Windows 直接在官网下载安装最新版本即可"),s("a",r,[n("https://go.dev/"),t(a)])]),d,s("p",null,[n("看个人喜欢，微软的"),s("a",k,[n("VsCode"),t(a)]),n("或者 Jetbrains 的"),s("a",v,[n("GoLang"),t(a)]),n("都可")]),m,s("p",null,[n("这里额外说下对应的转义符，相应的东西如果要用上了再去看文档即可："),s("a",b,[n("文档链接"),t(a)])]),g])}const x=p(l,[["render",f],["__file","01-初识GoLang.html.vue"]]);export{x as default};
