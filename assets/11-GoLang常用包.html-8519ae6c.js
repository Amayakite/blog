import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as p,a as n,b as s,d as i,e as c}from"./app-3ab2953d.js";const l={},u=n("h2",{id:"golang包大全",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#golang包大全","aria-hidden":"true"},"#"),s(" Golang包大全")],-1),r={href:"https://awesome-go.com/",target:"_blank",rel:"noopener noreferrer"},d=c(`<p>翻译成中文即可，里面有能想到的所有的类型的包</p><h2 id="web层" tabindex="-1"><a class="header-anchor" href="#web层" aria-hidden="true">#</a> Web层</h2><h3 id="gin" tabindex="-1"><a class="header-anchor" href="#gin" aria-hidden="true">#</a> Gin</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get github.com/gin-gonic/gin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket" aria-hidden="true">#</a> Websocket</h3><p>导包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get github.com/gorilla/websocket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> upgrader <span class="token operator">=</span> websocket<span class="token punctuation">.</span>Upgrader<span class="token punctuation">{</span>
    ReadBufferSize<span class="token punctuation">:</span>  <span class="token number">1024</span><span class="token punctuation">,</span>
    WriteBufferSize<span class="token punctuation">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
    CheckOrigin<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> upgrader<span class="token punctuation">.</span><span class="token function">Upgrade</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// TODO Do Something in Conn</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="假数据生成" tabindex="-1"><a class="header-anchor" href="#假数据生成" aria-hidden="true">#</a> 假数据生成</h3><p>导包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get github.com/manveru/faker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>

	<span class="token string">&quot;github.com/manveru/faker&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> faker<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;zh-CN&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;异常: %v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据层" tabindex="-1"><a class="header-anchor" href="#数据层" aria-hidden="true">#</a> 数据层</h2><h3 id="单mysql" tabindex="-1"><a class="header-anchor" href="#单mysql" aria-hidden="true">#</a> 单Mysql</h3><p>先导包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get github.com/go-sql-driver/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;database/sql&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>

	<span class="token boolean">_</span> <span class="token string">&quot;github.com/go-sql-driver/mysql&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 先定义一个addr 命名规范：账号:密码@tcp(ip:端口)/数据库名称?对应的参数</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;root:amayakiteProjectMysql@tcp(myserver:13001)/go_data&quot;</span>
	<span class="token comment">// 连接数据库</span>
	db<span class="token punctuation">,</span> err <span class="token operator">:=</span> sql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> addr<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;连接数据库失败，格式有误或账号密码错误&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 看下是否能ping通，能ping通就是连接成功</span>
	err <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;连接数据库失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;连接数据库成功&quot;</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gorm" tabindex="-1"><a class="header-anchor" href="#gorm" aria-hidden="true">#</a> Gorm</h3><h4 id="配合mysql" tabindex="-1"><a class="header-anchor" href="#配合mysql" aria-hidden="true">#</a> 配合Mysql</h4><blockquote><p>导包</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配合sqlite</span>
go get gorm.io/gorm
go get gorm.io/driver/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;gorm.io/driver/mysql&quot;</span>
  <span class="token string">&quot;gorm.io/gorm&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 参考 https://github.com/go-sql-driver/mysql#dsn-data-source-name 获取详情</span>
  dsn <span class="token operator">:=</span> <span class="token string">&quot;user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span>
  db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>mysql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>dsn<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>gorm<span class="token punctuation">.</span>Config<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配合sqlite" tabindex="-1"><a class="header-anchor" href="#配合sqlite" aria-hidden="true">#</a> 配合Sqlite</h4><blockquote><p>导包</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get gorm.io/gorm
go get gorm.io/driver/sqlite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;gorm.io/gorm&quot;</span>
  <span class="token string">&quot;gorm.io/driver/sqlite&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>sqlite<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;test.db&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>gorm<span class="token punctuation">.</span>Config<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;failed to connect database&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31);function k(v,m){const a=t("ExternalLinkIcon");return o(),p("div",null,[u,n("p",null,[s("详情可以看这个网址"),n("a",r,[s("https://awesome-go.com/"),i(a)])]),d])}const h=e(l,[["render",k],["__file","11-GoLang常用包.html.vue"]]);export{h as default};
