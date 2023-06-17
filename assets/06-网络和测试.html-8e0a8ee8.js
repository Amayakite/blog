import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-2d4b26c1.js";const p={},e=t(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>嘛，这个也不多说了，之前在Java学习的过程中也了解了一些网络的内容，其实总体来说就一句话</p><blockquote><p><strong>万物基于TCP，所有的协议都基于Socket</strong></p></blockquote><h2 id="socket" tabindex="-1"><a class="header-anchor" href="#socket" aria-hidden="true">#</a> Socket</h2><h3 id="tcp服务端" tabindex="-1"><a class="header-anchor" href="#tcp服务端" aria-hidden="true">#</a> TCP服务端</h3><p>也就是Socket服务端，一个TCP服务端可以连接多个客户端，因为在Go语言中创建多个goRoutine非常的简单和高效，所以我们可以每当在建立一次连接时就创建一个goroutie去处理</p><p>TCP需要完成如下内容</p><ol><li>监听端口</li><li>接收客户端请求建立连接</li><li>创建goroutine处理连接</li></ol><p>我们要实现一个服务端，只需要这样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1. 监听端口</span>
	server<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;:8080&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;listen error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> server<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 2. 接收客户端请求建立连接</span>
	connection<span class="token punctuation">,</span> err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;和客户端建立连接失败，err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 3. 创建goroutine处理连接</span>
	<span class="token keyword">var</span> tmp <span class="token punctuation">[</span><span class="token number">128</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
	<span class="token comment">// 这里是阻塞接收的</span>
	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>tmp<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;读取客户端数据失败，err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;客户端发送的数据为：&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>tmp<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端" aria-hidden="true">#</a> 客户端</h3><p>其实非常简单</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	connection<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;:8080&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;和服务端端建立连接失败，err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 发送数据</span>
	connection<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;hello, i am client&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，剩余的地方就非常的简单了，可以通过这个connection来自由的发送和接收数据</p><h3 id="扩展-获取程序启动时的附带参数" tabindex="-1"><a class="header-anchor" href="#扩展-获取程序启动时的附带参数" aria-hidden="true">#</a> 扩展-获取程序启动时的附带参数</h3><p>有可能需要在程序启动的时候获取下其他对应的参数，例如指定端口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./server.exe <span class="token number">8888</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>则可以这样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取所有参数并打印</span>
		<span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> os<span class="token punctuation">.</span>Args <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
			<span class="token comment">// 这里就可以使用更高级的操作了，比如：value==&quot;-port&quot;，则获取下一个参数os.Args[index+1]==&quot;xxxx&quot;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展-获取命令行输入" tabindex="-1"><a class="header-anchor" href="#扩展-获取命令行输入" aria-hidden="true">#</a> 扩展-获取命令行输入</h3><p>可以使用fmt包下的Scanln来获取</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bufio&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">bufioDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 从标准输入获取对象</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdin<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">&quot;Please Input Message and Enter Click:&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 读取到换行</span>
	text<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">&#39;\\n&#39;</span><span class="token punctuation">)</span>
	<span class="token comment">// 转换小写</span>
	text <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;你输入的内容是：%s\\n&quot;</span><span class="token punctuation">,</span> text<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">bufioDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="http" tabindex="-1"><a class="header-anchor" href="#http" aria-hidden="true">#</a> Http</h2><p>这个也不需要过多介绍了...之后会使用比较强大的gin框架，目前就先用自带的吧</p><h3 id="服务端的基本搭建" tabindex="-1"><a class="header-anchor" href="#服务端的基本搭建" aria-hidden="true">#</a> 服务端的基本搭建</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token comment">// 监听一个路由的访问，第一个参数是路径，第二个是处理函数</span>
	<span class="token comment">// 注意，必须得先声明路由，最后再声明后面的监听端口，否则不生效</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> getPath<span class="token punctuation">)</span>

	<span class="token comment">// 第二个参数好像是配置上下文访问资源路径，这里先不配置了</span>
	http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getPath</span><span class="token punctuation">(</span>res http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 可以接收到两个参数，res和req</span>
	<span class="token comment">// 遍历循环打印所有请求头</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> req<span class="token punctuation">.</span>Header <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;key:&quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> <span class="token string">&quot;value:&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	res<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;h1&gt;Hello, Go Web!&lt;/h1&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>当然，可以配合<code>ioutil.ReadFile(&quot;./index.html&quot;)</code>这类操作来完成网页的渲染，这里不多做讲解了（之后八辈子估计都用不上原生的）</p></div><h3 id="服务端中获取请求的相关参数" tabindex="-1"><a class="header-anchor" href="#服务端中获取请求的相关参数" aria-hidden="true">#</a> 服务端中获取请求的相关参数</h3><p>嘛，总之都是可以直接获取的，param获取到了之后就是一个map，可以直接通过xx获取</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">getPath</span><span class="token punctuation">(</span>res http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 可以接收到两个参数，res和req</span>
	<span class="token comment">// 获取请求的method</span>
	method <span class="token operator">:=</span> req<span class="token punctuation">.</span>Method
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;method:&quot;</span><span class="token punctuation">,</span> method<span class="token punctuation">)</span>
	<span class="token comment">// 获取请求的param参数</span>
	param <span class="token operator">:=</span> req<span class="token punctuation">.</span>URL<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;param:&quot;</span><span class="token punctuation">,</span> param<span class="token punctuation">)</span>
	<span class="token comment">// 获取请求的body</span>
	body <span class="token operator">:=</span> req<span class="token punctuation">.</span>Body
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;body:&quot;</span><span class="token punctuation">,</span> body<span class="token punctuation">)</span>
	<span class="token comment">// 获取请求的cookie</span>
	cookie <span class="token operator">:=</span> req<span class="token punctuation">.</span><span class="token function">Cookies</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;cookie:&quot;</span><span class="token punctuation">,</span> cookie<span class="token punctuation">)</span>
	res<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;h1&gt;Hello, Go Web!&lt;/h1&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="http客户端" tabindex="-1"><a class="header-anchor" href="#http客户端" aria-hidden="true">#</a> HTTP客户端</h3><p>这个目前用这还是有点略微的蛋疼，或许之后用上工具类库会更好些</p><p>get请求貌似没法附带请求体，但是post可以，这里不做演示了</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io/ioutil&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;http get error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 使用ioutil.ReadAll()读取数据并转换成字符串</span>
	body<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;read body error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getPath</span><span class="token punctuation">(</span>res http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 可以接收到两个参数，res和req</span>
	<span class="token comment">// 遍历循环打印所有请求头</span>
	res<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;h1&gt;Hello, Go Web!&lt;/h1&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试" aria-hidden="true">#</a> 单元测试</h2><p>顾名思义，之后应该经常要用的上，现在了解下先</p><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3><p>首先，文件名必须是xxx_test这样的，例如<code>controllerGet_test</code></p><p>每个测试函数必须要导入<code>testing</code>包，测试函数的基本格式（签名）如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestName</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">//... Do Something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试函数的名字必须是大写并且以<code>Test</code>开头，举几个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestAdd</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">TestSum</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">TestLog</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中t用于报告测试失败和附加的日志信息，<code>testing.T</code>拥有一堆方法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Errorf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">FailNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Failed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Fatal</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Fatalf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Log</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Logf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Parallel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> f <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>T<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Skip</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">SkipNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Skipf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>T<span class="token punctuation">)</span> <span class="token function">Skipped</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用测试" tabindex="-1"><a class="header-anchor" href="#使用测试" aria-hidden="true">#</a> 使用测试</h3><p>文件：<code>spilt_test.go</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> string_test

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
	<span class="token string">&quot;testing&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Split</span><span class="token punctuation">(</span>str <span class="token builtin">string</span><span class="token punctuation">,</span> sep <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token comment">// str：abc，sep：a,return：[b,c]</span>
	<span class="token comment">// 首先将字符串分割成字符串数组</span>
	strs <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> sep<span class="token punctuation">)</span>
	<span class="token comment">// 创建一个空的字符串数组</span>
	<span class="token keyword">var</span> result <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	<span class="token comment">// 然后将其中value和sep相同的元素删除</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>strs<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> strs<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> sep <span class="token operator">||</span> strs<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">&quot; &quot;</span> <span class="token punctuation">{</span>
			<span class="token comment">// 不等于sep的添加到新的数组</span>
			result <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> strs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestSplit</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	arr <span class="token operator">:=</span> <span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;aaaabbbdaskldjaskldaa&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在控制台输入<code>go test</code>即可看到测试结果和总体耗时</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果控制台上出现了</p><p><code>go: go.mod file not found in current directory or any parent directory; see &#39;go help modules&#39;</code></p><p>这样的报错，有两种解决方式（都可以，二选一，之后多模块的时候也会说到）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方法1</span>
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>auto

<span class="token comment"># 方法2</span>
go mod init XXX 
<span class="token comment">#xxx代表文件夹名,之后会新建一个go.mod文件，那个就类似于Js的package.json或者Java的pom.xml一样</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>同理，可以在一个文件夹内新建多个单元测试，或者一个文件内填写多个单元测试，例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token keyword">func</span> <span class="token function">TestSplit</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	arr <span class="token operator">:=</span> <span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;aaaabbbdaskldjaskldaa&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestSplit2</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	arr <span class="token operator">:=</span> <span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;dasdfqweqwedqwdasdas&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后运行 <code>go test</code> 即可</p><h2 id="基准测试" tabindex="-1"><a class="header-anchor" href="#基准测试" aria-hidden="true">#</a> 基准测试</h2><p>顾名思义，就是测试在一定的工作负载情况下程序性能的一种方法，语法格式如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">BenchmarkXXX</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">//....do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基准测试以<code>Benchmark</code>为前缀，需要接收一个<code>*testing.B</code>类型的参数B，基准测试必须执行<code>b.N</code>次，这个值是根据实际情况去算的，从而保证稳定性，<code>testing.B</code>拥有的方法如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Errorf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">FailNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Failed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Fatal</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Fatalf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Log</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Logf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">ReportAllocs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">ResetTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> f <span class="token keyword">func</span><span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">RunParallel</span><span class="token punctuation">(</span>body <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>PB<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">SetBytes</span><span class="token punctuation">(</span>n <span class="token builtin">int64</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">SetParallelism</span><span class="token punctuation">(</span>p <span class="token builtin">int</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Skip</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">SkipNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Skipf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">Skipped</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">StartTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>B<span class="token punctuation">)</span> <span class="token function">StopTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用基准测试" tabindex="-1"><a class="header-anchor" href="#使用基准测试" aria-hidden="true">#</a> 使用基准测试</h3><p>首先编写下代码，和之前普通测试没啥区别</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> string_test

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
	<span class="token string">&quot;testing&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Split</span><span class="token punctuation">(</span>str <span class="token builtin">string</span><span class="token punctuation">,</span> sep <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token comment">// str：abc，sep：a,return：[b,c]</span>
	<span class="token comment">// 首先将字符串分割成字符串数组</span>
	strs <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> sep<span class="token punctuation">)</span>
	<span class="token comment">// 创建一个空的字符串数组</span>
	<span class="token keyword">var</span> result <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	<span class="token comment">// 然后将其中value和sep相同的元素删除</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>strs<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> strs<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> sep <span class="token operator">||</span> strs<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">&quot; &quot;</span> <span class="token punctuation">{</span>
			<span class="token comment">// 不等于sep的添加到新的数组</span>
			result <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> strs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">BenchmarkSplit</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	arr <span class="token operator">:=</span> <span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;aaaabbbdaskldjaskldaa&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后开始测试</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token builtin class-name">test</span> <span class="token parameter variable">-bench</span><span class="token operator">=</span>Split
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意这个<code>-bench=Split</code>,Split就是我们要测试的方法</p><p>运行结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[    bbbd skldj skld  ]
goos: windows
goarch: amd64
cpu: Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz
BenchmarkSplit-8        [    bbbd skldj skld  ]
[    bbbd skldj skld  ]
[    bbbd skldj skld  ]
[    bbbd skldj skld  ]
[    bbbd skldj skld  ]
1000000000               0.0005262 ns/op
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到两个东西：执行了1000000000次，每次耗时0.0005262纳秒</p><p>貌似是一秒内的数据？</p><p>然后我们也可以通过<code>go test -v -bench=Split -benchmem --run=none</code>这样来看到更详细的数据</p><p>执行结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goos: windows
goarch: amd64
cpu: Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz
BenchmarkSplit
[    bbbd skldj skld  ]
[    bbbd skldj skld  ]
[    bbbd skldj skld  ]
[    bbbd skldj skld  ]
[    bbbd skldj skld  ]
[    bbbd skldj skld  ]
BenchmarkSplit-8        1000000000               0.0005319 ns/op               0 B/op          0 allocs/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>0 B/op</code>表示每次操作内存分配了0个字节，<code>0 allocs/op</code>表示每次操作进行了三次内存分配，，，感觉我这数据有点奇怪，正常来说应该不是这样的</p><h3 id="多个函数的性能测试" tabindex="-1"><a class="header-anchor" href="#多个函数的性能测试" aria-hidden="true">#</a> 多个函数的性能测试</h3><p>有的时候，我们往往想要对多个函数来进行测试以获取其中的最快的那一个，go语言中支持这种操作，代码命名规范只需要加个数字即可，下面是一个简单的斐波那契数列的测试</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> string_test

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;testing&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Fib</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> n <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> n
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">Fib</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">Fib</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">benchmarkFib</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">,</span> n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> b<span class="token punctuation">.</span>N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token function">Fib</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">BenchmarkFib1</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">benchmarkFib</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">BenchmarkFib2</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">benchmarkFib</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">BenchmarkFib3</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">benchmarkFib</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码比较简单，接下来运行下，只需要</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go <span class="token builtin class-name">test</span> <span class="token parameter variable">-bench</span><span class="token operator">=</span>Fib 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会自动找到名字中带有Fib的并全部进行测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goos: windows
goarch: amd64
cpu: Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz
BenchmarkFib1-8          4435746               273.2 ns/op
BenchmarkFib2-8            35330             33155 ns/op
BenchmarkFib3-8              295           4184499 ns/op
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，这样有点草率，所以可以看看更详细的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> go <span class="token builtin class-name">test</span> <span class="token parameter variable">-bench</span><span class="token operator">=</span>Fib  <span class="token parameter variable">-benchmem</span> <span class="token parameter variable">--run</span><span class="token operator">=</span>none
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goos: windows
goarch: amd64
pkg: Aadasd
cpu: Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz
BenchmarkFib1-8          4401226               285.9 ns/op             0 B/op          0 allocs/op
BenchmarkFib2-8            32847             37753 ns/op               0 B/op          0 allocs/op
BenchmarkFib3-8              276           4374191 ns/op               0 B/op          0 allocs/op
PASS
ok      Aadasd  4.845s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，最后一个在一秒内（应该是一秒内吧）执行了276次，另外两个都更多，说以是第一个效率最高</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>默认情况下，每个基准测试至少运行1秒。如果在Benchmark函数返回时没有到1秒，则b.N的值会按 1,2,5,10,20,50，… 增加，并且函数再次运行。</p><p>如果说想比较2和20的话，则命令行可以这样：<code>go test -bench=Fib2 -benchmem --run=none</code>,200同理</p></div><h3 id="手动开始测试" tabindex="-1"><a class="header-anchor" href="#手动开始测试" aria-hidden="true">#</a> 手动开始测试</h3><p>有的时候，我们连接数据库，打开文件等并不想被计算在测试的时间内，所以可以这样操作</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestFib1</span><span class="token punctuation">(</span>m <span class="token operator">*</span>testing<span class="token punctuation">.</span>M<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;开始测试前做的事情...&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 这里开始测试</span>
	retCode <span class="token operator">:=</span> m<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;测试完毕后的一些其他工作&quot;</span><span class="token punctuation">)</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span>retCode<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="example-示例" tabindex="-1"><a class="header-anchor" href="#example-示例" aria-hidden="true">#</a> Example-示例</h2><p>emmm就相当于在告诉别人某些东西应该被怎么用，一般文件名以example开头，函数也以Example开头，函数不需要传入任何内容，也没有哦返回值</p><p>例如想告诉别人斐波那契该咋用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> string_test

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Fib</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> n <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> n
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">Fib</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">Fib</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ExampleFib</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Fib</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样即可</p><h2 id="flag包-更优雅的从命令行获取内容" tabindex="-1"><a class="header-anchor" href="#flag包-更优雅的从命令行获取内容" aria-hidden="true">#</a> Flag包-更优雅的从命令行获取内容</h2><p>例如我们启动一个程序的时候想要<code>-name xxx -age xxx -server.port xxx</code></p><p>则可以通过flag包来实现</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;flag&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	name <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;姓名&quot;</span><span class="token punctuation">)</span>
	age <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">&quot;年龄&quot;</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">*</span>name<span class="token punctuation">,</span> <span class="token operator">*</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./main <span class="token parameter variable">-name</span> <span class="token number">666</span> <span class="token parameter variable">-age</span> <span class="token number">111</span>
<span class="token comment"># 运行结果：666 111</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个是参数名称，第二个是参数默认值，第三个是提示语，然后可以声明接收一个咋样的参数</p><p>当然还支持时间字段，时间字段的输入格式为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>300ms
-1.5h
2h24m
合法的单位有ns/us/ms/s/m/h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接收方式为：<code>cTime :=flag.Duration(&quot;time&quot;,time.Second,&quot;Life Time&quot;)</code></p><p>例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;flag&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cTime <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span><span class="token string">&quot;time&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span> <span class="token string">&quot;Life Time&quot;</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>cTime<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要让获取到的值赋值给某个变量的话，则可以这样:使用val并且传入指针即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;flag&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> name <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;everyone&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;The greeting object.&quot;</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, %s!\\n&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,106),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","06-网络和测试.html.vue"]]);export{k as default};
