import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as e,e as o,a as n,b as s}from"./app-2d4b26c1.js";const c={},p=o(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>这也是Go语言中早期最为诟病的地方....非常的蛋疼</p><p>所以GoLang官方在1.13版本后提供了<code>go module</code>这个东西</p><p>要启用这个玩意，首先要设置下环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看环境变量</span>
go <span class="token function">env</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到第一个：<code>GO111MODULE=</code>没有值，<strong>默认是auto</strong>,有三个值</p><ul><li>off：禁用模块支持，编译的时候会默认的去goPath中找依赖</li><li>on:启动模块支持，编译的时候会忽略goPath去找，只会去项目的<code>go.mod</code>文件下去找</li><li>auto:当项目在<code>$GOPATH/src</code>外且根目录有<code>go.mod</code>的时候，开启模块支持</li></ul><p>简单来说，设置为on之后就可以使用<code>go module</code>了，以后就没有必要在GOPATH中创建项目了，并且还能够很好的管理第三方包</p><p>使用<code>go module</code>管理依赖后会在项目根目录下生成两个文件<code>go.mod</code>和<code>go.sum</code></p><h3 id="配置gomodule和配置依赖代理" tabindex="-1"><a class="header-anchor" href="#配置gomodule和配置依赖代理" aria-hidden="true">#</a> 配置goModule和配置依赖代理</h3><p>启用goModule很简单，只需要</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开启</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on
<span class="token comment"># 关闭</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>off
<span class="token comment"># 自动</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>auto
<span class="token comment"># 查看</span>
go <span class="token function">env</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后配置代理，使用七牛云即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://goproxy.cn,direct
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用gomodule" tabindex="-1"><a class="header-anchor" href="#使用gomodule" aria-hidden="true">#</a> 使用goModule</h3><p>要初始化一个项目很简单，随便找一个文件夹，打开shell或者cmd，输入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go mod init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后可以得到一个这样的go.mod文件</p><div class="language-mod line-numbers-mode" data-ext="mod"><pre class="language-mod"><code>module github.com/amayakite/study

go 1.17
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以正常使用了</p><h2 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h2><p>某些情况下，我们想要控制某个函数停止运行，可能会产生如下的画风</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> exitChan <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;F函数执行了&quot;</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>exitChan<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;F函数退出了&quot;</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
	<span class="token punctuation">}</span>
	<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	exitChan <span class="token operator">&lt;-</span> <span class="token boolean">true</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，也可以通过其他方式来解决这个问题，例如使用其他的正常的值来判定下是否要退出，但是这样的话，感觉有点没必要</p><blockquote><p>在Go Http的Server中，每一个请求都有一个对应的goroutine去处理，请求处理函数通常会启动额外的goroutine用来访问后端服务，比如数据库RPC服务，用来处理goroutine通常需要访问一些与请求特定的数据</p></blockquote><div class="hint-container info"><p class="hint-container-title">例子</p><p>比如终端用户的身份认证信息，验证相关的Token，请求的截止时间，每当一个请求被取消或超时的时候，所有用来处理该请求的goroutine都应该迅速退出，然后系统才能释放这些goroutine占用的资源</p><p>简单来说，这相当于Java中的ThreadLocal</p></div><h3 id="使用context" tabindex="-1"><a class="header-anchor" href="#使用context" aria-hidden="true">#</a> 使用Context</h3><p>使用起来还是比较简单的，指的一说的是，如果有多个函数链式调用的话，可以通过一个ctx退出所有的</p><p>获取一个上下文对象副本，注意，是副本，需要传入一个上下文对象才行，一般都是传入一个context.Background()，也就是当前线程的上下文对象</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;F函数执行了&quot;</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
Lookup<span class="token punctuation">:</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;F函数退出了&quot;</span><span class="token punctuation">)</span>
			<span class="token keyword">break</span> Lookup
		<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个context 需要传入一个上下文，这里的Background()是默认的上下文</span>
	ctx<span class="token punctuation">,</span> cache <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">// 这里还可以使用WithCancel来穿件，传入上下文的同时还需要传入一个时间，也就是指定时间后会过期，自动释放</span>
	<span class="token keyword">go</span> <span class="token function">f</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token function">cache</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，使用递归也可以的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;F函数执行了&quot;</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;F函数退出了&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
	<span class="token punctuation">}</span>
	<span class="token function">f</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个context 需要传入一个上下文，这里的Background()是默认的上下文</span>
	ctx<span class="token punctuation">,</span> cache <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">f</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token function">cache</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main ending&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="context中的方法" tabindex="-1"><a class="header-anchor" href="#context中的方法" aria-hidden="true">#</a> Context中的方法</h3><p>获取到的ctx对象有如下方法</p><ul><li><code>Deadline()</code>，返回两个值，一个是time.Time，一个bool值，bool值如果为true则表示这个ctx已经被结束，时间对象表示结束的时间</li><li><code>Done()</code>返回一个channel，这个Channel会在当前上下文完成后被关闭，多次调用这个方法只会返回一个Channel</li><li><code>Err()</code>返回当前Context结束的原因，它只会在<code>Done()</code>返回的Channel被关闭的时候才回返回非空(nil)的时候才有值 <ul><li>如果当前<code>Context</code>被取消，则会返回<code>Caceled</code>错误</li><li>如果当前<code>Context</code>超时就会被返回<code>DeadLineExceeded</code>错误</li></ul></li><li><code>Value()</code>会从Context中返回键对应的值，对于同一个上下文来说，多次调用<code>Value()</code>并传入相同的key会返回相同的结果，该方法只用于传递API和进程间跟请求域的数据</li></ul><h3 id="指定时间过期的context-withtimeout" tabindex="-1"><a class="header-anchor" href="#指定时间过期的context-withtimeout" aria-hidden="true">#</a> 指定时间过期的Context-WithTimeout</h3><p>传入时间即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;F函数执行了&quot;</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;F函数退出了&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
	<span class="token punctuation">}</span>
	<span class="token function">f</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个context 需要传入一个上下文，这里的Background()是默认的上下文</span>
	ctx<span class="token punctuation">,</span> cache <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">f</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token function">cache</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main ending&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="上下文传值" tabindex="-1"><a class="header-anchor" href="#上下文传值" aria-hidden="true">#</a> 上下文传值</h3><p>有的时候，想要在上下文传值，则可以这样做，注意，提供的key必须是可以比较的，并且不能是String类型，以避免上下文传递时发生冲突</p><p>使用如下</p>`,41),i=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{go:"",class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"context"'),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
	`),n("span",{class:"token string"},'"sync"'),s(`
	`),n("span",{class:"token string"},'"time"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" TraceCode "),n("span",{class:"token builtin"},"string"),s(`

`),n("span",{class:"token keyword"},"var"),s(" wg sync"),n("span",{class:"token punctuation"},"."),s(`WaitGroup

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"worker"),n("span",{class:"token punctuation"},"("),s("ctx context"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	key `),n("span",{class:"token operator"},":="),s(),n("span",{class:"token function"},"TraceCode"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"trace"'),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token comment"},"//在这里获取trace"),s(`
	value `),n("span",{class:"token operator"},":="),s(" ctx"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Value"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token comment"},"//在这里打印trace"),s(`
	`),n("span",{class:"token keyword"},"if"),s(" value "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("value"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
LOOP`),n("span",{class:"token punctuation"},":"),s(`
	`),n("span",{class:"token keyword"},"for"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token keyword"},"select"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token operator"},"<-"),s("ctx"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Done"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},":"),s(`
			`),n("span",{class:"token keyword"},"break"),s(` LOOP
		`),n("span",{class:"token keyword"},"default"),n("span",{class:"token punctuation"},":"),s(`
			time`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Sleep"),n("span",{class:"token punctuation"},"("),s("time"),n("span",{class:"token punctuation"},"."),s("Second"),n("span",{class:"token punctuation"},")"),s(`
			fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"worker"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"done"'),n("span",{class:"token punctuation"},")"),s(`
	wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Done"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"//先创建一个context"),s(`
	ctx`),n("span",{class:"token punctuation"},","),s(" cache "),n("span",{class:"token operator"},":="),s(" context"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"WithCancel"),n("span",{class:"token punctuation"},"("),s("context"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Background"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token comment"},"//给ctx添加一个key value 注意，这里的上下文对象是刚刚的ctx"),s(`
	ctx `),n("span",{class:"token operator"},"="),s(" context"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"WithValue"),n("span",{class:"token punctuation"},"("),s("ctx"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token function"},"TraceCode"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"trace"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"123"'),n("span",{class:"token punctuation"},")"),s(`
	wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Add"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token keyword"},"go"),s(),n("span",{class:"token function"},"worker"),n("span",{class:"token punctuation"},"("),s("ctx"),n("span",{class:"token punctuation"},")"),s(`
	time`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Sleep"),n("span",{class:"token punctuation"},"("),s("time"),n("span",{class:"token punctuation"},"."),s("Second "),n("span",{class:"token operator"},"*"),s(),n("span",{class:"token number"},"3"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token function"},"cache"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 结束"),s(`
	wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Wait"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"main done"'),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),l=[p,i];function u(d,r){return t(),e("div",null,l)}const m=a(c,[["render",u],["__file","08-依赖管理和包.html.vue"]]);export{m as default};
