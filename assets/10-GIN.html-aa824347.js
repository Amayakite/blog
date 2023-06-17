import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as p,c as e,e as a,a as n,b as s}from"./app-3ab2953d.js";const c={},o=a(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>这个就相当于是Java中的Spring一样，或许并没有Spring那么强大，不过是大多数人的选择</p><p>是一个<strong>微框架</strong>，封装比较友好，API友好，具有灵活快捷、容错方便等特点</p><h3 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h3><p>首先安装下依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go mod init 
go get <span class="token parameter variable">-u</span> github.com/gin-gonic/gin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后写如下代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;net/http&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.创建路由</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 2.绑定路由规则，执行的函数</span>
	<span class="token comment">// gin.Context，封装了request和response</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;hello World!&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// 3.监听端口，默认在8080</span>
	<span class="token comment">// Run(&quot;里面不指定端口号默认为8080&quot;)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者说些多一点</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;net/http&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.创建路由</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/get&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;code&quot;</span><span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
			<span class="token string">&quot;msg&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;ok&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// post</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/post&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;code&quot;</span><span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
			<span class="token string">&quot;msg&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;ok&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// put</span>
	r<span class="token punctuation">.</span><span class="token function">PUT</span><span class="token punctuation">(</span><span class="token string">&quot;/put&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;code&quot;</span><span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
			<span class="token string">&quot;msg&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;ok&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// delete restful 传入id</span>
	r<span class="token punctuation">.</span><span class="token function">DELETE</span><span class="token punctuation">(</span><span class="token string">&quot;/delete/:id&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;code&quot;</span><span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
			<span class="token string">&quot;msg&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;ok&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;id&quot;</span><span class="token punctuation">:</span>   ctx<span class="token punctuation">.</span><span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// Run(&quot;里面不指定端口号默认为8080&quot;)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于初始化路由和自定义初始化参数" tabindex="-1"><a class="header-anchor" href="#关于初始化路由和自定义初始化参数" aria-hidden="true">#</a> 关于初始化路由和自定义初始化参数</h3><p>我们在初始化的时候调用了<code>gin.Default()</code>，先看看它的代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Engine <span class="token punctuation">{</span>
	<span class="token function">debugPrintWARNINGDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine <span class="token operator">:=</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Recovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 其中是<code>engine := New()</code>new了一个对象出来，然后调用Use调用了两个中间件并return</p><p>一个是Log的，另外一个恢复啥的东西</p><p>所以我们要自定义的话，只需要</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.创建路由 带有中间件</span>
	<span class="token boolean">_</span> <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 2. 创建路由 不带中间件</span>
	<span class="token boolean">_</span> <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="请求" tabindex="-1"><a class="header-anchor" href="#请求" aria-hidden="true">#</a> 请求</h2><h3 id="如何获取api参数" tabindex="-1"><a class="header-anchor" href="#如何获取api参数" aria-hidden="true">#</a> 如何获取API参数</h3><p>无非就三种参数，直接获取即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.创建路由</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// post</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/post/:method&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取路由?参数id</span>
		id <span class="token operator">:=</span> ctx<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span>
		<span class="token comment">// 打印请求参数</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;请求中的id为：&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span>
		<span class="token comment">// 获取请求体</span>
		rc <span class="token operator">:=</span> ctx<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Body
		<span class="token comment">// 读取请求体</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		rc<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token comment">// 打印请求体</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;请求体为：&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token comment">// 获取路径参数</span>
		method <span class="token operator">:=</span> ctx<span class="token punctuation">.</span><span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">&quot;method&quot;</span><span class="token punctuation">)</span>
		<span class="token comment">// 打印路径参数</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;路径参数为：&quot;</span><span class="token punctuation">,</span> method<span class="token punctuation">)</span>
		<span class="token comment">// 返回数据 json</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;id&quot;</span><span class="token punctuation">:</span>     id<span class="token punctuation">,</span>
			<span class="token string">&quot;rc&quot;</span><span class="token punctuation">:</span>     <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token string">&quot;method&quot;</span><span class="token punctuation">:</span> method<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// Run(&quot;里面不指定端口号默认为8080&quot;)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取query参数时候的默认值设置" tabindex="-1"><a class="header-anchor" href="#获取query参数时候的默认值设置" aria-hidden="true">#</a> 获取Query参数时候的默认值设置</h3><p>使用<code>DefaultQuery</code>即可给<code>?xxx=xxx</code>设定默认值</p>`,23),i=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{go:"",class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// 1.创建路由"),s(`
	r `),n("span",{class:"token operator"},":="),s(" gin"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Default"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token comment"},"// post"),s(`
	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"POST"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/post/:method"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("ctx "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 获取路由?参数id"),s(`
		id `),n("span",{class:"token operator"},":="),s(" ctx"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"DefaultQuery"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"id"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"6666"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 打印请求参数"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"请求中的id为："'),n("span",{class:"token punctuation"},","),s(" id"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 获取请求体"),s(`
		rc `),n("span",{class:"token operator"},":="),s(" ctx"),n("span",{class:"token punctuation"},"."),s("Request"),n("span",{class:"token punctuation"},"."),s(`Body
		`),n("span",{class:"token comment"},"// 读取请求体"),s(`
		buf `),n("span",{class:"token operator"},":="),s(),n("span",{class:"token function"},"make"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"byte"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token number"},"1024"),n("span",{class:"token punctuation"},")"),s(`
		rc`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Read"),n("span",{class:"token punctuation"},"("),s("buf"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 打印请求体"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"请求体为："'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token function"},"string"),n("span",{class:"token punctuation"},"("),s("buf"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 获取路径参数"),s(`
		method `),n("span",{class:"token operator"},":="),s(" ctx"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Param"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"method"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 打印路径参数"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"路径参数为："'),n("span",{class:"token punctuation"},","),s(" method"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 返回数据 json"),s(`
		ctx`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusOK"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token string"},'"id"'),n("span",{class:"token punctuation"},":"),s("     id"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token string"},'"rc"'),n("span",{class:"token punctuation"},":"),s("     "),n("span",{class:"token function"},"string"),n("span",{class:"token punctuation"},"("),s("buf"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token string"},'"method"'),n("span",{class:"token punctuation"},":"),s(" method"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	`),n("span",{class:"token comment"},'// Run("里面不指定端口号默认为8080")'),s(`
	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'":8000"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),u=a(`<h3 id="获取请求体" tabindex="-1"><a class="header-anchor" href="#获取请求体" aria-hidden="true">#</a> 获取请求体</h3><p>四种：application/json、form-urlencoded、xml,multipart/form-data</p><p>对于<code>form-urlencoded</code>这种格式，可以通过如下方式来指定获取某个字段的值（原生html的表单提交，ajax之类的提交的都是json，不适用）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.创建路由</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// post</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/post&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取请求体 单独获取某一个字段，获取到的内容都是string</span>
		name <span class="token operator">:=</span> ctx<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
		<span class="token comment">// 获取请求体中的内容，获取某一个字段，设置默认值</span>
		age <span class="token operator">:=</span> ctx<span class="token punctuation">.</span><span class="token function">DefaultPostForm</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> name<span class="token punctuation">,</span>
			<span class="token string">&quot;age&quot;</span><span class="token punctuation">:</span>  age<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// Run(&quot;里面不指定端口号默认为8080&quot;)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于application/json和xml，则只能一次性获取所有请求体</p><h3 id="获取上传的文件" tabindex="-1"><a class="header-anchor" href="#获取上传的文件" aria-hidden="true">#</a> 获取上传的文件</h3><p>上传文件有两种-单个文件和多个文件</p><blockquote><p>上传单个文件</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math/rand&quot;</span>
	<span class="token string">&quot;time&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">randomUUID</span><span class="token punctuation">(</span>length <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token comment">// 生成指定长度的uuid</span>
	str <span class="token operator">:=</span> <span class="token string">&quot;0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&quot;</span>
	bytes <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
	result <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	r <span class="token operator">:=</span> rand<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">NewSource</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		result <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> bytes<span class="token punctuation">[</span>r<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.创建路由</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// post</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/upload&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 1.获取文件 单个文件的获取</span>
		file<span class="token punctuation">,</span> err <span class="token operator">:=</span> ctx<span class="token punctuation">.</span><span class="token function">FormFile</span><span class="token punctuation">(</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 2.获取文件的名称</span>
		filename <span class="token operator">:=</span> file<span class="token punctuation">.</span>Filename
		<span class="token comment">// 3.将文件写入本地 直接调用ctx的方法即可，不需要自己写，默认是存储在当前目录下</span>
		ctx<span class="token punctuation">.</span><span class="token function">SaveUploadedFile</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> <span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token operator">+</span>filename<span class="token punctuation">)</span>
		<span class="token comment">// 4.返回文件名称</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;filename&quot;</span><span class="token punctuation">:</span> filename<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// Run(&quot;里面不指定端口号默认为8080&quot;)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>可以通过file.size来限制大小，或者直接设置全局的限制，如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.创建路由</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 设置文件上传的大小限制 默认为32M</span>
	r<span class="token punctuation">.</span>MaxMultipartMemory <span class="token operator">=</span> <span class="token number">8</span> <span class="token operator">&lt;&lt;</span> <span class="token number">20</span> <span class="token comment">// 8M</span>

	<span class="token comment">// post</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/upload&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 1.获取文件 单个文件的获取</span>
		file<span class="token punctuation">,</span> err <span class="token operator">:=</span> ctx<span class="token punctuation">.</span><span class="token function">FormFile</span><span class="token punctuation">(</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 2.获取文件的名称</span>
		filename <span class="token operator">:=</span> file<span class="token punctuation">.</span>Filename
		<span class="token comment">// 4.返回文件名称</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;filename&quot;</span><span class="token punctuation">:</span> filename<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><blockquote><p>上传多个文件</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1.创建路由</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 设置文件上传的大小限制 默认为32M</span>
	r<span class="token punctuation">.</span>MaxMultipartMemory <span class="token operator">=</span> <span class="token number">8</span> <span class="token operator">&lt;&lt;</span> <span class="token number">20</span> <span class="token comment">// 8M</span>
	<span class="token comment">// post</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/upload&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取所有的上传文件</span>
		<span class="token comment">// 1. 先获取form</span>
		form<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ctx<span class="token punctuation">.</span><span class="token function">MultipartForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token comment">// 2. 获取所有的文件</span>
		files <span class="token operator">:=</span> form<span class="token punctuation">.</span>File<span class="token punctuation">[</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">]</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> file <span class="token operator">:=</span> <span class="token keyword">range</span> files <span class="token punctuation">{</span>
			<span class="token comment">// 获取文件名</span>
			filename <span class="token operator">:=</span> file<span class="token punctuation">.</span>Filename
			<span class="token comment">// 将文件内容写入到指定的目录</span>
			ctx<span class="token punctuation">.</span><span class="token function">SaveUploadedFile</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> filename<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// return ok</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;ok&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// Run(&quot;里面不指定端口号默认为8080&quot;)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重要-接收数据并绑定对象" tabindex="-1"><a class="header-anchor" href="#重要-接收数据并绑定对象" aria-hidden="true">#</a> [重要]接收数据并绑定对象</h3><p>使用起来还是比较简单的，指定解析即可</p>`,14),l=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{go:"",class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"net/http"'),s(`

	`),n("span",{class:"token string"},'"github.com/gin-gonic/gin"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" LoginUser "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// 用户名 form 表单参数，其余的正常参数 uri是路径参数 bingding=required 表示必须有这个字段（不能为空），没有的话会报错"),s(`
	Username `),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token string"},'`form:"username" json:"username" xml:"username" uri:"username"  binding:"required"`'),s(`
	Password `),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token string"},'`form:"password" json:"password" xml:"password" uri:"password"  binding:"required"`'),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	r `),n("span",{class:"token operator"},":="),s(" gin"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Default"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"POST"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/login"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 声明接收的变量"),s(`
		`),n("span",{class:"token keyword"},"var"),s(` user LoginUser
		`),n("span",{class:"token comment"},"// 把接收到的数据绑定到变量上 json"),s(`
		`),n("span",{class:"token comment"},"// 会将request的body中的数据自动解析到结构体 例如上方中，标记了json:username，则会解析请求体中json部分的username字段给到这里"),s(`
		err `),n("span",{class:"token operator"},":="),s(" c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"ShouldBindJSON"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"&"),s("user"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 如果出问题了"),s(`
		`),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token comment"},"// 返回错误信息"),s(`
			`),n("span",{class:"token comment"},"// gin.H封装了生成json的工具"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusBadRequest"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(" err"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Error"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token keyword"},"return"),s(`

		`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token comment"},"// 判断用户名和密码是否正确"),s(`
		`),n("span",{class:"token keyword"},"if"),s(" user"),n("span",{class:"token punctuation"},"."),s("Username "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'"admin"'),s(),n("span",{class:"token operator"},"||"),s(" user"),n("span",{class:"token punctuation"},"."),s("Password "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'"admin"'),s(),n("span",{class:"token punctuation"},"{"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusUnauthorized"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"用户名或密码错误"'),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token keyword"},"return"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token comment"},"// 返回登录成功"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusOK"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"登录成功"'),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'":8000"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),k=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,[s("同理，还可以解析form和xml之类的，或者如下方所示通过"),n("code",null,"Bind"),s("自动推断")])],-1),r=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{go:"",class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"net/http"'),s(`

	`),n("span",{class:"token string"},'"github.com/gin-gonic/gin"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" LoginUser "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// 用户名 form 表单参数，其余的正常参数 uri是路径参数 bingding=required 表示必须有这个字段（不能为空），没有的话会报错"),s(`
	Username `),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token string"},'`form:"username" json:"username" xml:"username" uri:"username"  binding:"required"`'),s(`
	Password `),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token string"},'`form:"password" json:"password" xml:"password" uri:"password"  binding:"required"`'),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	r `),n("span",{class:"token operator"},":="),s(" gin"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Default"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"POST"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/login"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 声明接收的变量"),s(`
		`),n("span",{class:"token keyword"},"var"),s(` user LoginUser
		`),n("span",{class:"token comment"},"// 把接收到的数据绑定到变量上 json"),s(`
		`),n("span",{class:"token comment"},"// 会将request的body中的数据自动解析到结构体"),s(`

		`),n("span",{class:"token comment"},"// 使用c.Bind会根据请求头中的content-type自动解析"),s(`
		err `),n("span",{class:"token operator"},":="),s(" c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Bind"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"&"),s("user"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 如果出问题了"),s(`
		`),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token comment"},"// 返回错误信息"),s(`
			`),n("span",{class:"token comment"},"// gin.H封装了生成json的工具"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusBadRequest"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(" err"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Error"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token keyword"},"return"),s(`

		`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token comment"},"// 判断用户名和密码是否正确"),s(`
		`),n("span",{class:"token keyword"},"if"),s(" user"),n("span",{class:"token punctuation"},"."),s("Username "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'"admin"'),s(),n("span",{class:"token operator"},"||"),s(" user"),n("span",{class:"token punctuation"},"."),s("Password "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'"admin"'),s(),n("span",{class:"token punctuation"},"{"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusUnauthorized"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"用户名或密码错误"'),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token keyword"},"return"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token comment"},"// 返回登录成功"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusOK"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"登录成功"'),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'":8000"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),d=n("div",{class:"hint-container info"},[n("p",{class:"hint-container-title"},"说明"),n("p",null,"当然，也可以直接解析uri中的参数")],-1),m=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{go:"",class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"net/http"'),s(`

	`),n("span",{class:"token string"},'"github.com/gin-gonic/gin"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" LoginUser "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// 用户名 form 表单参数，其余的正常参数 uri是路径参数 bingding=required 表示必须有这个字段（不能为空），没有的话会报错"),s(`
	Username `),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token string"},'`form:"username" json:"username" xml:"username" uri:"username"  binding:"required"`'),s(`
	Password `),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token string"},'`form:"password" json:"password" xml:"password" uri:"password"  binding:"required"`'),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	r `),n("span",{class:"token operator"},":="),s(" gin"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Default"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"POST"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/login/:username/:password"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 声明接收的变量"),s(`
		`),n("span",{class:"token keyword"},"var"),s(` user LoginUser
		`),n("span",{class:"token comment"},"// 把uri中的参数绑定到user中 注意 如果是uri绑定的话，没有传入指定参数则是直接返回404 not found"),s(`
		err `),n("span",{class:"token operator"},":="),s(" c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"ShouldBindUri"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"&"),s("user"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 如果出问题了"),s(`
		`),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token comment"},"// 返回错误信息"),s(`
			`),n("span",{class:"token comment"},"// gin.H封装了生成json的工具"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusBadRequest"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(" err"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Error"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token keyword"},"return"),s(`

		`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token comment"},"// 判断用户名和密码是否正确"),s(`
		`),n("span",{class:"token keyword"},"if"),s(" user"),n("span",{class:"token punctuation"},"."),s("Username "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'"admin"'),s(),n("span",{class:"token operator"},"||"),s(" user"),n("span",{class:"token punctuation"},"."),s("Password "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'"admin"'),s(),n("span",{class:"token punctuation"},"{"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusUnauthorized"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"用户名或密码错误"'),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token keyword"},"return"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token comment"},"// 返回登录成功"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),s("http"),n("span",{class:"token punctuation"},"."),s("StatusOK"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"登录成功"'),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'":8000"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),v=a(`<h2 id="响应" tabindex="-1"><a class="header-anchor" href="#响应" aria-hidden="true">#</a> 响应</h2><p>响应客户端数据的方式有很多，下面简单说明下，一般也是用json比较多</p><h3 id="通常数据-json、xml、yaml等" tabindex="-1"><a class="header-anchor" href="#通常数据-json、xml、yaml等" aria-hidden="true">#</a> 通常数据：Json、XML、Yaml等</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	ri <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		ri<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/exampleJson&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 响应普通的json</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token comment">// 响应对象类型json</span>
		ri<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/exampleJson2&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">var</span> msg <span class="token keyword">struct</span> <span class="token punctuation">{</span>
				Code    <span class="token builtin">int</span>         <span class="token string">\`json:&quot;code&quot;\`</span>
				Message <span class="token builtin">string</span>      <span class="token string">\`json:&quot;message&quot;\`</span>
				Data    <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">\`json:&quot;data&quot;\`</span>
			<span class="token punctuation">}</span>
			msg<span class="token punctuation">.</span>Code <span class="token operator">=</span> <span class="token number">200</span>
			msg<span class="token punctuation">.</span>Message <span class="token operator">=</span> <span class="token string">&quot;hello world&quot;</span>
			msg<span class="token punctuation">.</span>Data <span class="token operator">=</span> <span class="token string">&quot;hello world&quot;</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token comment">// 响应xml</span>
		ri<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/exampleXml&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">XML</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token comment">// 响应Yaml</span>
		ri<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/exampleYaml&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">YAML</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token comment">// 响应文件</span>
		ri<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/exampleFile&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">File</span><span class="token punctuation">(</span><span class="token string">&quot;./main.go&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token comment">// 相应html</span>
		ri<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/exampleHtml&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">HTML</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">&quot;index.tmpl&quot;</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;title&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Main website&quot;</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span>

	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模板渲染html" tabindex="-1"><a class="header-anchor" href="#模板渲染html" aria-hidden="true">#</a> 模板渲染HTML</h3><p>Gin支持加载HTML模板，然后根据模板参数进行配置并返回相应的数据，<strong>本质上就是字符串替换</strong></p><p>使用<code>LoadHtmlGlob()</code>方法可以加载模板文件</p><p>例如我们先写一个简单的支持渲染的html模板<code>templates/index.html</code></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>{{.title}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 下面是一个h1标签 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>{{.message}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后根据语法开始进行渲染</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">LoadHTMLGlob</span><span class="token punctuation">(</span><span class="token string">&quot;templates/*&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 也可以直接加载单个文件 不过一般都不会加载单个文件，而是指定文件夹</span>
	<span class="token comment">// r.LoadHTMLGlob(&quot;templates/index.html&quot;)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 第二个参数是要渲染的文件的文件名，第三个是替换模板的数据</span>
		c<span class="token punctuation">.</span><span class="token function">HTML</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">&quot;index.html&quot;</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;title&quot;</span><span class="token punctuation">:</span>   <span class="token string">&quot;Main website&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着访问，就可以得到如下内容</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Main website<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Hello, World!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向" aria-hidden="true">#</a> 重定向</h3><p>这个也是比较简单的，因为所有内容都封装在了<code>gin.Context</code>内，所以可以非常方便的调用</p><p>我们想要重定向到百度的话，只需要这样做</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/rediect&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ctx<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span><span class="token number">302</span><span class="token punctuation">,</span> <span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异步处理" tabindex="-1"><a class="header-anchor" href="#异步处理" aria-hidden="true">#</a> 异步处理</h3><p>有的时候，想要分批次存储数据的话，或者想异步写日志的话，就可以使用它了</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/sync&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 首先获取一个上下文副本</span>
		copyContex <span class="token operator">:=</span> ctx<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token comment">// 异步处理</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;异步执行结束：&quot;</span><span class="token punctuation">,</span> copyContex<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path<span class="token punctuation">)</span>
			<span class="token comment">// 异步无法返回值</span>
			<span class="token comment">// copyContex.JSON(200, gin.H{</span>
			<span class="token comment">// 	&quot;message&quot;: &quot;异步执行结束&quot;,</span>
			<span class="token comment">// })</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token comment">// 注意 副本没法返回值，必须得用原始的上下文才能返回信息</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;异步执行中&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/no_sync&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 同步执行</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;同步执行结束：&quot;</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path<span class="token punctuation">)</span>
		ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;同步执行结束&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h2><p>这个在Gin框架中并不是复杂的东西，很简单就可以使用了</p><h3 id="设置前置路由-路由组" tabindex="-1"><a class="header-anchor" href="#设置前置路由-路由组" aria-hidden="true">#</a> 设置前置路由（路由组）</h3><p>有的时候，我们希望是访问这样的<code>/user/login</code>或者<code>/user/info</code></p><p>所以这个时候可以通过路由组的方式来实现</p>`,25),b=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{go:"",class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"github.com/gin-gonic/gin"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	r `),n("span",{class:"token operator"},":="),s(" gin"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Default"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

	user `),n("span",{class:"token operator"},":="),s(" r"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Group"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/user"'),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token comment"},"// 下面这个大括号是书写规范，一般相同路由都是写在一个大括号内 "),s(`
	`),n("span",{class:"token punctuation"},"{"),s(`
		user`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"GET"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/:id"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"String"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"200"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"User: %s"'),n("span",{class:"token punctuation"},","),s(" c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Param"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"id"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
		user`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"POST"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/:id"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"String"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"200"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"User: %s"'),n("span",{class:"token punctuation"},","),s(" c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Param"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"id"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'":8000"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),g=a(`<div class="hint-container tip"><p class="hint-container-title">提示</p><p>路由在各大语言中一般是以红黑树的形式存储，这样可以非常方便快捷的查询到想要的路由</p></div><h2 id="中间件" tabindex="-1"><a class="header-anchor" href="#中间件" aria-hidden="true">#</a> 中间件</h2><p>这个应该不陌生了，就相当于是NodeJS/Koa中的中间件，或者说Java的Filter、SpringBoot的Interceptor、handler</p><p>可以在请求前后对数据进行校验、处理、加工等操作</p><ul><li>Gin可以构建中间件，但它只对注册过的路由函数起作用</li><li>对于分组路由，嵌套使用中间件，可以限定中间件的作用范围</li><li>中间件分为全局中间件、单个路由中间件和群组中间件</li><li><strong>Gin中间件必须是一个<code>gin.HandlerFunc</code>类型</strong></li></ul><h3 id="定义一个简单的中间件" tabindex="-1"><a class="header-anchor" href="#定义一个简单的中间件" aria-hidden="true">#</a> 定义一个简单的中间件</h3><p>这里先来定义一个简单的中间件</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 注册全局中间件</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">MiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// get 获取上下文中的变量 如果返回的第二个值是false，则说明没有这个变量</span>
		value<span class="token punctuation">,</span> exists <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> exists <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;获取到上下文的变量：&quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>

		<span class="token punctuation">}</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span>
			<span class="token comment">// 获取上下文的变量 MustGet：如果不存在则抛出异常</span>
			<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> c<span class="token punctuation">.</span><span class="token function">MustGet</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义中间件</span>
<span class="token keyword">func</span> <span class="token function">MiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;中间件开始执行了&quot;</span><span class="token punctuation">)</span>
		<span class="token comment">// 获取请求的路径并打印</span>
		path <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;请求的路径是：&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
		<span class="token comment">// 给上下文添加一个变量</span>
		c<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">)</span>
		<span class="token comment">// 放行 如果这里是鉴权的话，还可以直接返回鉴权错误时要返回的值</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整体来说还是和Node中使用的方式差不多的，上面我们自己写了一个中间件并且注册到了全局，所以说有的请求都会走这个中间件</p><h3 id="全局中间件和局部中间件" tabindex="-1"><a class="header-anchor" href="#全局中间件和局部中间件" aria-hidden="true">#</a> 全局中间件和局部中间件</h3><p>有些时候，不仅仅是全局要走中间件，局部也有可能要单独设立一个中间件，例如<code>/admin</code>路由下的东西需要鉴权才能访问</p><p>所以可以这样操作</p>`,12),f=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{go:"",class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`

	`),n("span",{class:"token string"},'"github.com/gin-gonic/gin"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	r `),n("span",{class:"token operator"},":="),s(" gin"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Default"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token comment"},"// 注册全局中间件"),s(`
	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"GlobalMiddleWare"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token comment"},"// 注册路由"),s(`
	rg `),n("span",{class:"token operator"},":="),s(" r"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Group"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/admin"'),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token comment"},"// 注册局部中间件"),s(`
	rg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"AdminMiddleWare"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"{"),s(`
		rg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"GET"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/index"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"200"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"code"'),n("span",{class:"token punctuation"},":"),s("   "),n("span",{class:"token number"},"200"),n("span",{class:"token punctuation"},","),s(`
				`),n("span",{class:"token string"},'"userId"'),n("span",{class:"token punctuation"},":"),s(" c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"GetInt"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"userId"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
				`),n("span",{class:"token string"},'"Auth"'),n("span",{class:"token punctuation"},":"),s("   c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"GetString"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"Auth"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'":8000"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token comment"},"// 定义全局中间件"),s(`
`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"GlobalMiddleWare"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(" gin"),n("span",{class:"token punctuation"},"."),s("HandlerFunc "),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"全局中间件"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 获取请求的路径并打印"),s(`
		path `),n("span",{class:"token operator"},":="),s(" c"),n("span",{class:"token punctuation"},"."),s("Request"),n("span",{class:"token punctuation"},"."),s("URL"),n("span",{class:"token punctuation"},"."),s(`Path
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"请求的路径是："'),n("span",{class:"token punctuation"},","),s(" path"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 给上下文添加一个变量"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"张三"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 放行 如果这里是鉴权的话，还可以直接返回鉴权错误时要返回的值"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Next"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token comment"},"// 定义admin中间件"),s(`
`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"AdminMiddleWare"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(" gin"),n("span",{class:"token punctuation"},"."),s("HandlerFunc "),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 判断请求头中是否有Authorization"),s(`
		Authorization `),n("span",{class:"token operator"},":="),s(" c"),n("span",{class:"token punctuation"},"."),s("Request"),n("span",{class:"token punctuation"},"."),s("Header"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"Authorization"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token keyword"},"if"),s(" Authorization "),n("span",{class:"token operator"},"=="),s(),n("span",{class:"token string"},'""'),s(),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token comment"},"// auth不存在，返回错误"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"401"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"code"'),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"401"),n("span",{class:"token punctuation"},","),s(`
				`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s("  "),n("span",{class:"token string"},'"请求头中无Authorization"'),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
			fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"鉴权不通过"'),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token comment"},"// 终止请求，不再调用后续的handler和中间件"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Abort"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token keyword"},"return"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token comment"},"// auth存在，TODO 鉴权逻辑"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"鉴权通过"'),n("span",{class:"token punctuation"},")"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"userId"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"Auth"'),n("span",{class:"token punctuation"},","),s(" Authorization"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 放行"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Next"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),q=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,"当然，我们还可以给某个路由单独定义使用额外的中间件，例如："),n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{go:"",class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`

	`),n("span",{class:"token string"},'"github.com/gin-gonic/gin"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	r `),n("span",{class:"token operator"},":="),s(" gin"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Default"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token comment"},"// 注册全局中间件"),s(`
	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Use"),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"GlobalMiddleWare"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`

	`),n("span",{class:"token comment"},"// 针对单个路由注册中间件，则这个路由会额外走一遍指定的中间件"),s(`
	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"GET"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/authApi"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token function"},"AdminMiddleWare"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"200"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token string"},'"code"'),n("span",{class:"token punctuation"},":"),s("   "),n("span",{class:"token number"},"200"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token string"},'"userId"'),n("span",{class:"token punctuation"},":"),s(" c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"GetInt"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"userId"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token string"},'"Auth"'),n("span",{class:"token punctuation"},":"),s("   c"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"GetString"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"Auth"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`

	r`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'":8000"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token comment"},"// 定义全局中间件"),s(`
`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"GlobalMiddleWare"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(" gin"),n("span",{class:"token punctuation"},"."),s("HandlerFunc "),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"全局中间件"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 获取请求的路径并打印"),s(`
		path `),n("span",{class:"token operator"},":="),s(" c"),n("span",{class:"token punctuation"},"."),s("Request"),n("span",{class:"token punctuation"},"."),s("URL"),n("span",{class:"token punctuation"},"."),s(`Path
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"请求的路径是："'),n("span",{class:"token punctuation"},","),s(" path"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 给上下文添加一个变量"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"张三"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 放行 如果这里是鉴权的话，还可以直接返回鉴权错误时要返回的值"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Next"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token comment"},"// 定义admin中间件"),s(`
`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"AdminMiddleWare"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(" gin"),n("span",{class:"token punctuation"},"."),s("HandlerFunc "),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("c "),n("span",{class:"token operator"},"*"),s("gin"),n("span",{class:"token punctuation"},"."),s("Context"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token comment"},"// 判断请求头中是否有Authorization"),s(`
		Authorization `),n("span",{class:"token operator"},":="),s(" c"),n("span",{class:"token punctuation"},"."),s("Request"),n("span",{class:"token punctuation"},"."),s("Header"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"Authorization"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token keyword"},"if"),s(" Authorization "),n("span",{class:"token operator"},"=="),s(),n("span",{class:"token string"},'""'),s(),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token comment"},"// auth不存在，返回错误"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"JSON"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"401"),n("span",{class:"token punctuation"},","),s(" gin"),n("span",{class:"token punctuation"},"."),s("H"),n("span",{class:"token punctuation"},"{"),s(`
				`),n("span",{class:"token string"},'"code"'),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"401"),n("span",{class:"token punctuation"},","),s(`
				`),n("span",{class:"token string"},'"msg"'),n("span",{class:"token punctuation"},":"),s("  "),n("span",{class:"token string"},'"请求头中无Authorization"'),n("span",{class:"token punctuation"},","),s(`
			`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
			fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"鉴权不通过"'),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token comment"},"// 终止请求，不再调用后续的handler和中间件"),s(`
			c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Abort"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
			`),n("span",{class:"token keyword"},"return"),s(`
		`),n("span",{class:"token punctuation"},"}"),s(`
		`),n("span",{class:"token comment"},"// auth存在，TODO 鉴权逻辑"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"鉴权通过"'),n("span",{class:"token punctuation"},")"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"userId"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"Auth"'),n("span",{class:"token punctuation"},","),s(" Authorization"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token comment"},"// 放行"),s(`
		c`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Next"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])],-1),h=a(`<h3 id="例子-中间件统计程序执行用时" tabindex="-1"><a class="header-anchor" href="#例子-中间件统计程序执行用时" aria-hidden="true">#</a> 例子：中间件统计程序执行用时</h3><p>其实非常简单，Next之后是还可以跟代码的，所以只需要这样操作即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">GlobalMiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取当前系统时间</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;全局中间件&quot;</span><span class="token punctuation">)</span>
		<span class="token comment">// 获取请求的路径并打印</span>
		path <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;请求的路径是：&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
		<span class="token comment">// 放行</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token comment">// 获取当前时间</span>
		end <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token comment">// 计算请求时间</span>
		cost <span class="token operator">:=</span> end<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
		<span class="token comment">// 打印花了多少毫秒</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;本次请求用时%d毫秒，%d纳秒\\n&quot;</span><span class="token punctuation">,</span> cost<span class="token punctuation">.</span><span class="token function">Milliseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> cost<span class="token punctuation">.</span><span class="token function">Nanoseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>

	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 注册全局中间件</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">GlobalMiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 针对单个路由注册中间件</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token function">AdminMiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;code&quot;</span><span class="token punctuation">:</span>   <span class="token number">200</span><span class="token punctuation">,</span>
			<span class="token string">&quot;userId&quot;</span><span class="token punctuation">:</span> c<span class="token punctuation">.</span><span class="token function">GetInt</span><span class="token punctuation">(</span><span class="token string">&quot;userId&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token string">&quot;Auth&quot;</span><span class="token punctuation">:</span>   c<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">&quot;Auth&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:8000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义全局中间件</span>
<span class="token keyword">func</span> <span class="token function">GlobalMiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取当前系统时间</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;全局中间件&quot;</span><span class="token punctuation">)</span>
		<span class="token comment">// 获取请求的路径并打印</span>
		path <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;请求的路径是：&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token comment">// 获取当前时间</span>
		end <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token comment">// 计算请求时间</span>
		cost <span class="token operator">:=</span> end<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
		<span class="token comment">// 打印花了多少毫秒</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;本次请求用时%d毫秒，%d纳秒\\n&quot;</span><span class="token punctuation">,</span> cost<span class="token punctuation">.</span><span class="token function">Milliseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> cost<span class="token punctuation">.</span><span class="token function">Nanoseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义admin中间件</span>
<span class="token keyword">func</span> <span class="token function">AdminMiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 判断请求头中是否有Authorization</span>
		Authorization <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> Authorization <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
			<span class="token comment">// auth不存在，返回错误</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;code&quot;</span><span class="token punctuation">:</span> <span class="token number">401</span><span class="token punctuation">,</span>
				<span class="token string">&quot;msg&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;请求头中无Authorization&quot;</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;鉴权不通过&quot;</span><span class="token punctuation">)</span>
			<span class="token comment">// 终止请求，不再调用后续的handler和中间件</span>
			c<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// auth存在，TODO 鉴权逻辑</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;鉴权通过&quot;</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;userId&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Auth&quot;</span><span class="token punctuation">,</span> Authorization<span class="token punctuation">)</span>
		<span class="token comment">// 放行</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="鉴权" tabindex="-1"><a class="header-anchor" href="#鉴权" aria-hidden="true">#</a> 鉴权</h2><h3 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> COOKIE</h3><p>获取和设置比较简单</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token function">AdminMiddleWare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 颁发cookie</span>
	c<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token number">3600</span><span class="token punctuation">,</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
	<span class="token comment">// 获取cookie</span>
	name<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Cookie</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;获取cookie失败&quot;</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;code&quot;</span><span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;获取cookie成功&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>

	c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
		<span class="token string">&quot;code&quot;</span><span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，也可以在中间件内完成获取并鉴权之类的东西</p>`,10),w=[o,i,u,l,k,r,d,m,v,b,g,f,q,h];function y(x,S){return p(),e("div",null,w)}const O=t(c,[["render",y],["__file","10-GIN.html.vue"]]);export{O as default};
