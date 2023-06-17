import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as n,b as s,d as t,e}from"./app-2d4b26c1.js";const l={},u=n("h2",{id:"etcd",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#etcd","aria-hidden":"true"},"#"),s(" ETCD")],-1),r=n("p",null,"这玩意类似于Zookeeper或者说是Consul，反正是一个管理的东西",-1),d=n("p",null,"大概东西就是：它的目标是构建一个高可用的分布式键值(key-value)数据库。etcd内部采用raft协议作为一致性算法，etcd基于Go语言实现。",-1),k=n("h3",{id:"下载和安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#下载和安装","aria-hidden":"true"},"#"),s(" 下载和安装")],-1),v={href:"https://github.com/etcd-io/etcd/releases/tag/v3.5.2",target:"_blank",rel:"noopener noreferrer"},m=e(`<p>我这里看到最新的是3.5.2</p><p>下载安装好后，先去修改下系统变量</p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意，下方操作非常重要，不可省略</p></div><p>WIndows:</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>SET ETCDCTL_API=3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Mac和Linux:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后启动下载好的压缩包内的<code>etcd</code>可执行程序即可</p><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3><p>刚刚启动好了ETCD之后，默认占用2379端口，这个时候就可以通过自带的<code>etcdctl</code>来操作它</p><p>它是一个kv数据库，所以可以自由的在其中添加可以k-v</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code># 添加数据
 .\\etcdctl.exe --endpoints=http://localhost:2379 put name &quot;Amayakite&quot;
# 获取数据
.\\etcdctl.exe --endpoints=http://localhost:2379 get name
# 删除数据，返回受影响的行数
.\\etcdctl.exe --endpoints=http://localhost:2379 del name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作无非就get和put以及del</p><h3 id="使用go语言操作etcd" tabindex="-1"><a class="header-anchor" href="#使用go语言操作etcd" aria-hidden="true">#</a> 使用GO语言操作ETCD</h3><p>还是比较简单的，需要安装的依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get go.etcd.io/etcd/client/v3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>emm这玩意我直接安装不成功，最后再ieda里面点击标红的来进行get才成功的，不知道为啥</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;go.etcd.io/etcd/client/v3&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> clientv3<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>clientv3<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
		<span class="token comment">//这里传入etdc地址切片</span>
		Endpoints<span class="token punctuation">:</span>   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;localhost:2379&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		DialTimeout<span class="token punctuation">:</span> <span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// handle error!</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cli <span class="token operator">*</span>clientv3<span class="token punctuation">.</span>Client<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token comment">//    DO Nothings</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span>cli<span class="token punctuation">)</span>
	timeout<span class="token punctuation">,</span> cancelFunc <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>timeout<span class="token punctuation">,</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//等待1秒</span>
	<span class="token function">cancelFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// handle error!</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//    获取值</span>
	timeout<span class="token punctuation">,</span> cancelFunc <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>timeout<span class="token punctuation">,</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//等待1秒</span>
	<span class="token function">cancelFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// handle error!</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ev <span class="token operator">:=</span> <span class="token keyword">range</span> resp<span class="token punctuation">.</span>Kvs <span class="token punctuation">{</span>
		<span class="token comment">//获取到的是byte类型，所以都要转换成string</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>ev<span class="token punctuation">.</span>Key<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>ev<span class="token punctuation">.</span>Value<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//    删除</span>
	timeout<span class="token punctuation">,</span> cancelFunc <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>timeout<span class="token punctuation">,</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//等待1秒</span>
	<span class="token function">cancelFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// handle error!</span>

	<span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;程序结束&quot;</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监听一个值" tabindex="-1"><a class="header-anchor" href="#监听一个值" aria-hidden="true">#</a> 监听一个值</h3><p>这个还是比较简单的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;context&quot;</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;go.etcd.io/etcd/client/v3&quot;</span>
    <span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> clientv3<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>clientv3<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
		<span class="token comment">//这里传入etdc地址切片</span>
		Endpoints<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;localhost:2379&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">//这里是超时时间</span>
		DialTimeout<span class="token punctuation">:</span> <span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// handle error!</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cli <span class="token operator">*</span>clientv3<span class="token punctuation">.</span>Client<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token comment">//    DO Nothings</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span>cli<span class="token punctuation">)</span>
	<span class="token comment">//这里拍一个哨兵监听值的变化（增删改查），返回一个只读的chan</span>
	watch <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Watch</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//这里是一个循环，监听值的变化</span>
	<span class="token keyword">for</span> wresp <span class="token operator">:=</span> <span class="token keyword">range</span> watch <span class="token punctuation">{</span>
		<span class="token comment">//事件类型：如果返回的是put事件，则返回的是一个put事件，如果返回的是delete事件，则返回的是一个delete事件</span>
		eventType <span class="token operator">:=</span> wresp<span class="token punctuation">.</span>Events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Type
    <span class="token comment">//    判断是不是删除</span>
        <span class="token keyword">if</span> eventType <span class="token operator">==</span> clientv3<span class="token punctuation">.</span>EventTypeDelete <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;被删除了&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token comment">//无论是更新还是创建，都会返回一个put事件</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;被改变了&quot;</span><span class="token punctuation">,</span>eventType<span class="token punctuation">)</span>
        <span class="token comment">//    打印最新的值</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>wresp<span class="token punctuation">.</span>Events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Kv<span class="token punctuation">.</span>Value<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Hour<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="elasticsearch" tabindex="-1"><a class="header-anchor" href="#elasticsearch" aria-hidden="true">#</a> ElasticSearch</h2><p>这个也不多介绍了，虽然说我也不太熟用这玩意</p><p>目前来说看到的官方已经出v8了emm看着鉴权完善了很多，我这里选择的版本是<strong>7.17.1</strong></p>`,24),b={href:"https://www.elastic.co/cn/downloads/elasticsearch",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,"PS：主要是因为上服务器得再配置密码，懒得整",-1),h=n("p",null,[s("下载好了之后直接启动bin下的"),n("code",null,"elasticsearch.bat"),s("即可")],-1),f=n("h3",{id:"go操作elasticsearch",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#go操作elasticsearch","aria-hidden":"true"},"#"),s(" GO操作ElasticSearch")],-1),q={href:"https://pkg.go.dev/search?q=elasticsearch",target:"_blank",rel:"noopener noreferrer"},w=e(`<p>我的是7.17.1，选择的依赖是</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get github.com/elastic/go-elasticsearch/v7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后直接使用即可，md这玩意新版本有点蛋疼，要把字符串转换成流才可以传入...</p><p>还有其他的API用上了去百度即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;encoding/json&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strings&quot;</span>

	<span class="token string">&quot;github.com/elastic/go-elasticsearch/v7&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name    <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
	Age     <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
	Married <span class="token builtin">bool</span>   <span class="token string">\`json:&quot;married&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token comment">// 构造函数</span>
<span class="token keyword">func</span> <span class="token function">NewStudent</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">,</span> married <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token operator">*</span>Student <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Student<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span>    name<span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>     age<span class="token punctuation">,</span>
		Married<span class="token punctuation">:</span> married<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	client<span class="token punctuation">,</span> err <span class="token operator">:=</span> elasticsearch<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span>elasticsearch<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
		Addresses<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;http://localhost:9200&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Error creating the client: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;链接客户端成功&quot;</span><span class="token punctuation">,</span> client<span class="token punctuation">)</span>
	s <span class="token operator">:=</span> <span class="token function">NewStudent</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
	<span class="token comment">// 序列化</span>
	data<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	r<span class="token punctuation">,</span> err2 <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;sutdent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err2 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Error creating the document: %s\\n&quot;</span><span class="token punctuation">,</span> err2<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;创建文档成功,文档id为：&quot;</span><span class="token punctuation">,</span>r<span class="token punctuation">.</span>Id<span class="token punctuation">)</span>

	<span class="token comment">// 查询 名字中带有张的</span>
	query<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span>
		client<span class="token punctuation">.</span>Search<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		client<span class="token punctuation">.</span>Search<span class="token punctuation">.</span><span class="token function">WithIndex</span><span class="token punctuation">(</span><span class="token string">&quot;sutdent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		client<span class="token punctuation">.</span>Search<span class="token punctuation">.</span><span class="token function">WithBody</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">\`{
			&quot;query&quot;: {
				&quot;match&quot;: {
					&quot;name&quot;: &quot;张&quot;
				}
			}
		}\`</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Error getting the response: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> query<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 删除</span>
	r<span class="token punctuation">,</span> err3 <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token string">&quot;sutdent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err3 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Error deleting the document: %s\\n&quot;</span><span class="token punctuation">,</span> err3<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function y(_,x){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,r,d,k,n("p",null,[s("首先去官网下载对应系统的安装包"),n("a",v,[s("https://github.com/etcd-io/etcd/releases/tag/v3.5.2"),t(a)])]),m,n("p",null,[s("由于我懒得上服务器，所以直接在官网"),n("a",b,[s("https://www.elastic.co/cn/downloads/elasticsearch"),t(a)]),s("下载后到本地跑起来")]),g,h,f,n("p",null,[s("首先要选择对应的依赖，依赖上这里找"),n("a",q,[s("https://pkg.go.dev/search?q=elasticsearch"),t(a)])]),w])}const C=p(l,[["render",y],["__file","09-Etdc和Es.html.vue"]]);export{C as default};
