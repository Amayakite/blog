import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c as o,a as n,b as s,d as c,e as a}from"./app-3ab2953d.js";const l={},u=a(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>这里就简单说明下go语言该如何操作mysql和redis</p><p>准备工作的话先准备下Mysql和Redis，这里用DockerCompose来进行部署了</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.9&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data/mysql/log<span class="token punctuation">:</span>/var/log/mysql<span class="token punctuation">:</span>rw
      <span class="token punctuation">-</span> ./data/mysql/data<span class="token punctuation">:</span>/var/lib/mysql<span class="token punctuation">:</span>rw
      <span class="token punctuation">-</span> ./data/mysql/mysql<span class="token punctuation">-</span>files<span class="token punctuation">:</span>/var/lib/mysql<span class="token punctuation">-</span>files<span class="token punctuation">:</span>rw
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token string">&quot;amayakiteProjectMysql&quot;</span>
    <span class="token comment"># restart: always</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;13001:3306&quot;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> TestProject
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data/redis/data<span class="token punctuation">:</span>/data<span class="token punctuation">:</span>rw
      <span class="token punctuation">-</span> ./data/redis/redis.conf<span class="token punctuation">:</span>/etc/redis/redis.conf<span class="token punctuation">:</span>rw
    <span class="token comment"># restart: always</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;13002:6379&quot;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> TestProject
    <span class="token comment"># 启动的额外命令</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server /etc/redis/redis.conf
<span class="token comment"># 网卡的配置</span>
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">TestProject</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
    <span class="token key atrule">ipam</span><span class="token punctuation">:</span>
      <span class="token key atrule">driver</span><span class="token punctuation">:</span> default
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">subnet</span><span class="token punctuation">:</span> <span class="token string">&quot;171.133.0.0/16&quot;</span>
          <span class="token key atrule">gateway</span><span class="token punctuation">:</span> <span class="token string">&quot;171.133.0.1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后redis的配置文件<code>./data/redis/redis.conf</code>如下</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment"># Redis的配置</span>
<span class="token comment">#bind 127.0.0.1 </span>
<span class="token comment">#注释掉这部分，这是限制redis只能本地访问</span>

protected-mode no 
<span class="token comment">#默认yes，开启保护模式，限制为本地访问</span>

daemonize no
<span class="token comment">#默认no，改为yes意为以守护进程方式启动，可后台运行，除非kill进程，改为yes会使配置文件方式启动redis失败</span>

databases 16 
<span class="token comment">#数据库个数（可选），我修改了这个只是查看是否生效。。</span>

dir  ./ 
<span class="token comment">#输入本地redis数据库存放文件夹（可选） 不动即可</span>

appendonly yes 
<span class="token comment">#redis持久化（可选）</span>

requirepass  amayakiteProjectRedis 
<span class="token comment">#配置redis访问密码</span>

<span class="token comment"># 调整最大内存使用</span>

<span class="token comment"># 编辑redis配置文件，加入最大内存使用限制，我根据服务器的情况设置为3G</span>
maxmemory 268435456

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着就可以访问了</p><ul><li>Mysql <ul><li>Addr: myserver:13001</li><li>UserName: root</li><li>PassWord: amayakiteProjectMysql</li></ul></li><li>Redis <ul><li>Addr: myserver:13002</li><li>PassWord: amayakiteProjectRedis</li></ul></li></ul><h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> Mysql</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Go语言中的<code>database/sql</code>包提供了保证SQL或类SQl数据库的泛用接口，就像是Java的Jdbc一样，使用这个玩意的时候，必须注入（至少）一个数据库驱动</p></div><h3 id="安装驱动" tabindex="-1"><a class="header-anchor" href="#安装驱动" aria-hidden="true">#</a> 安装驱动</h3><p>我们常用的数据库驱动基本上都是第三方实现的，Mysql也是如此，要想使用Mysql，先要安装下对应的驱动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get <span class="token parameter variable">-u</span> github.com/go-sql-driver/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下载过程可能会比较慢</p><p>这里先不用gomod 依赖会默认下载到默认goPath下的pkg的mod内，如果没有指定gopath，则Windows在<code>%USERPROFILE%/go</code>这个路径下</p><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3><p>首先创建一个数据库</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> go_data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后连接并查询，md果真一个屏幕的err</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;database/sql&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>

	<span class="token boolean">_</span> <span class="token string">&quot;github.com/go-sql-driver/mysql&quot;</span>
    <span class="token comment">// 这里导入就类似于Java中mysql的自动装配一样，它会自动设置下方的open中mysql的对应驱动为它</span>
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
	<span class="token comment">// 创建表product, 如果表已经存在，则忽略</span>
	sql <span class="token operator">:=</span> <span class="token string">\`
		CREATE TABLE IF NOT EXISTS product(
			id INT(10) NOT NULL AUTO_INCREMENT,
			name VARCHAR(20) NOT NULL,
			price INT(10) NOT NULL,
			PRIMARY KEY (id)
		);
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;创建表失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 插入数据</span>
	sql <span class="token operator">=</span> <span class="token string">\`
		INSERT INTO product(name, price) VALUES
			(&quot;鼠标&quot;, 23),
			(&quot;键盘&quot;, 33),
			(&quot;显示器&quot;, 43);
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;插入数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 查询数据</span>
	sql <span class="token operator">=</span> <span class="token string">\`
		SELECT * FROM product;
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	rows<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 打印数据</span>
	<span class="token keyword">for</span> rows<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">var</span> id <span class="token builtin">int</span>
		<span class="token keyword">var</span> name <span class="token builtin">string</span>
		<span class="token keyword">var</span> price <span class="token builtin">int</span>
		<span class="token comment">// 取出每一行数据</span>
		rows<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token operator">&amp;</span>price<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id: %d, name: %s, price: %d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 关闭游标</span>
	rows<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询数据成功&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 删除所有数据</span>
	sql <span class="token operator">=</span> <span class="token string">\`
		DELETE FROM product;
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;删除数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 退出</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;程序结束&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分函数单例操作" tabindex="-1"><a class="header-anchor" href="#分函数单例操作" aria-hidden="true">#</a> 分函数单例操作</h3><div class="hint-container tip"><p class="hint-container-title">提示</p><p>我们可以将基本的操作分成函数来操作，一般实际工作中也是这样进行</p></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;database/sql&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>

	<span class="token boolean">_</span> <span class="token string">&quot;github.com/go-sql-driver/mysql&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> connection <span class="token operator">*</span>sql<span class="token punctuation">.</span>DB
<span class="token keyword">var</span> once sync<span class="token punctuation">.</span>Once

<span class="token keyword">func</span> <span class="token function">initDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	db<span class="token punctuation">,</span> err <span class="token operator">:=</span> sql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;root:amayakiteProjectMysql@tcp(myserver:13001)/go_data&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;连接数据库失败，格式有误或账号密码错误&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 看下是否能ping通，能ping通就是连接成功</span>
	err <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;连接数据库失败，格式有误或账号密码错误&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;连接数据库成功&quot;</span><span class="token punctuation">)</span>
	connection <span class="token operator">=</span> db
	<span class="token comment">// 创建表product, 如果表已经存在，则忽略</span>
	sql <span class="token operator">:=</span> <span class="token string">\`
	CREATE TABLE IF NOT EXISTS product(
		id INT(10) NOT NULL AUTO_INCREMENT,
		name VARCHAR(20) NOT NULL,
		price INT(10) NOT NULL,
		PRIMARY KEY (id)
	);
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;创建表失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;初始化数据库成功&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// close</span>
	connection<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;程序结束&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>initDb<span class="token punctuation">)</span>
	sql <span class="token operator">:=</span> <span class="token string">\`
	INSERT INTO product(name, price) VALUES
		(&quot;鼠标&quot;, 23),
		(&quot;键盘&quot;, 33),
		(&quot;显示器&quot;, 43);
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;插入数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;插入数据成功&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>initDb<span class="token punctuation">)</span>
	<span class="token comment">// 查询数据</span>
	sql <span class="token operator">:=</span> <span class="token string">\`
		SELECT * FROM product;
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	rows<span class="token punctuation">,</span> err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 打印数据</span>
	<span class="token keyword">for</span> rows<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">var</span> id <span class="token builtin">int</span>
		<span class="token keyword">var</span> name <span class="token builtin">string</span>
		<span class="token keyword">var</span> price <span class="token builtin">int</span>
		<span class="token comment">// 取出每一行数据</span>
		rows<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token operator">&amp;</span>price<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id: %d, name: %s, price: %d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 关闭游标</span>
	rows<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询数据成功&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>initDb<span class="token punctuation">)</span>
	<span class="token comment">// 删除所有数据</span>
	sql <span class="token operator">:=</span> <span class="token string">\`
		DELETE FROM product;
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;删除数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;删除数据成功&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询单条数据和多条数据" tabindex="-1"><a class="header-anchor" href="#查询单条数据和多条数据" aria-hidden="true">#</a> 查询单条数据和多条数据</h3><p>单数据：<code>connection.QueryRow(sql语句)</code>，多条则是直接query</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>initDb<span class="token punctuation">)</span>
	<span class="token comment">// 查询数据</span>
	sql <span class="token operator">:=</span> <span class="token string">\`
		SELECT * FROM product;
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	rows<span class="token punctuation">,</span> err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 打印数据</span>
	<span class="token keyword">for</span> rows<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">var</span> id <span class="token builtin">int</span>
		<span class="token keyword">var</span> name <span class="token builtin">string</span>
		<span class="token keyword">var</span> price <span class="token builtin">int</span>
		<span class="token comment">// 取出每一行数据</span>
		rows<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token operator">&amp;</span>price<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id: %d, name: %s, price: %d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 关闭游标</span>
	rows<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询数据成功&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 查询单条数据</span>
	sql <span class="token operator">=</span> <span class="token string">\`
		SELECT * FROM product WHERE name = &quot;鼠标&quot;;
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	row <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">QueryRow</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">var</span> id <span class="token builtin">int</span>
	<span class="token keyword">var</span> name <span class="token builtin">string</span>
	<span class="token keyword">var</span> price <span class="token builtin">int</span>
	<span class="token comment">// 取出每一行数据</span>
	row<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token operator">&amp;</span>price<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id: %d, name: %s, price: %d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置连接池和释放连接" tabindex="-1"><a class="header-anchor" href="#设置连接池和释放连接" aria-hidden="true">#</a> 设置连接池和释放连接</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 设置连接池的最大连接数</span>
connection<span class="token punctuation">.</span><span class="token function">SetMaxOpenConns</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
<span class="token comment">// 设置连接池空闲的时候最多保留多少个连接</span>
connection<span class="token punctuation">.</span><span class="token function">SetMaxIdleConns</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p><strong>注意</strong>：在查询等东西调用完毕的时候，务必调用返回值的<code>Scan()</code>方法关闭连接，否则将会一直占用连接数</p></div><h3 id="查询传参" tabindex="-1"><a class="header-anchor" href="#查询传参" aria-hidden="true">#</a> 查询传参</h3><p>这个就跟其他的语言一样了</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">getById</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>initDb<span class="token punctuation">)</span>
	<span class="token comment">// 查询单条数据</span>
	sql <span class="token operator">:=</span> <span class="token string">\`
		SELECT * FROM product WHERE id = ?;
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	row <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">QueryRow</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> id<span class="token punctuation">)</span>
	<span class="token keyword">var</span> name <span class="token builtin">string</span>
	<span class="token keyword">var</span> price <span class="token builtin">int</span>
	<span class="token comment">// 取出数据</span>
	row<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token operator">&amp;</span>price<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id: %d, name: %s, price: %d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意，如果查询结果为空，则查询参数的值，例如id也依旧是有的，像name和price则会返回空值<code>nil</code></p></div><h3 id="查询多条数据的注意事项" tabindex="-1"><a class="header-anchor" href="#查询多条数据的注意事项" aria-hidden="true">#</a> 查询多条数据的注意事项</h3><blockquote><p>一定要<strong>关闭游标</strong>，否则也会占用连接</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>initDb<span class="token punctuation">)</span>
<span class="token comment">// 查询数据</span>
sql <span class="token operator">:=</span> <span class="token string">\`
    SELECT * FROM product;
\`</span>
<span class="token comment">// 执行sql语句</span>
rows<span class="token punctuation">,</span> err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
<span class="token keyword">defer</span>  rows<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 打印数据</span>
<span class="token keyword">for</span> rows<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> id <span class="token builtin">int</span>
    <span class="token keyword">var</span> name <span class="token builtin">string</span>
    <span class="token keyword">var</span> price <span class="token builtin">int</span>
    <span class="token comment">// 取出每一行数据</span>
    rows<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token operator">&amp;</span>price<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id: %d, name: %s, price: %d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询数据成功&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插入数据并获取id和受影响行数" tabindex="-1"><a class="header-anchor" href="#插入数据并获取id和受影响行数" aria-hidden="true">#</a> 插入数据并获取id和受影响行数</h3><p>就是利用了sql的那啥last函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>initDb<span class="token punctuation">)</span>
	sql <span class="token operator">:=</span> <span class="token string">\`
	INSERT INTO product(name, price) VALUES
		(&quot;鼠标&quot;, 23),
		(&quot;键盘&quot;, 33),
		(&quot;显示器&quot;, 43);
	\`</span>
	<span class="token comment">// 执行sql语句</span>
	ret<span class="token punctuation">,</span> err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;插入数据失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;插入数据成功&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 打印id</span>
	id<span class="token punctuation">,</span> err <span class="token operator">:=</span> ret<span class="token punctuation">.</span><span class="token function">LastInsertId</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;获取id失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;id:&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span>
	<span class="token comment">// 获取影响的行数</span>
	rows<span class="token punctuation">,</span> err <span class="token operator">:=</span> ret<span class="token punctuation">.</span><span class="token function">RowsAffected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;获取影响的行数失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;影响的行数:&quot;</span><span class="token punctuation">,</span> rows<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mysql预处理" tabindex="-1"><a class="header-anchor" href="#mysql预处理" aria-hidden="true">#</a> Mysql预处理</h3><p>总之，都是为了安全，防止Sql注入，并且可提高效率(我们服务端不用每次都拼接字符串了)</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">preareQueryDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">initDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 语句</span>
	sqlStr <span class="token operator">:=</span> <span class="token string">&quot;SELECT * FROM product WHERE id = ?&quot;</span>
    <span class="token comment">// 创建预处理对象，实际生产环境的话可以放到全局变量内</span>
	stmt<span class="token punctuation">,</span> err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Prepare</span><span class="token punctuation">(</span>sqlStr<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;预编译失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;预编译成功&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 关闭</span>
	<span class="token keyword">defer</span> stmt<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 执行sql语句</span>
	row <span class="token operator">:=</span> stmt<span class="token punctuation">.</span><span class="token function">QueryRow</span><span class="token punctuation">(</span><span class="token number">55</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> id <span class="token builtin">int</span>
	<span class="token keyword">var</span> name <span class="token builtin">string</span>
	<span class="token keyword">var</span> price <span class="token builtin">int</span>
	<span class="token comment">// 取出数据</span>
	row<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token operator">&amp;</span>price<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id: %d, name: %s, price: %d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> price<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用事务" tabindex="-1"><a class="header-anchor" href="#使用事务" aria-hidden="true">#</a> 使用事务</h3><p>嘛，其实就三个</p><ul><li>开启事务：<code>tx,err := connection.Begin()</code></li><li>回滚事务：<code>err := tx.Rollback()</code></li><li>提交事务：<code>err := tx.Commit()</code></li></ul><p>这里也不做例子了，开启事务会返回一个两个东西</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>tx<span class="token punctuation">,</span>err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 如果异常不为空，则后续可以通过tx对象来进行增删改查操作和使用它来进行回滚及提交操作</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sqlx" tabindex="-1"><a class="header-anchor" href="#sqlx" aria-hidden="true">#</a> SqlX</h2><p>这个东西就相当于是一个Golang版的Mybatis一样，一般情况下都是使用它来替代原生的golang自带的sql操作</p><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get github.com/jmoiron/sqlx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用" aria-hidden="true">#</a> 简单使用</h3><p>查的话比起原生的方便不少,其余的和<strong>原生的一致</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>

	<span class="token boolean">_</span> <span class="token string">&quot;github.com/go-sql-driver/mysql&quot;</span>
	<span class="token string">&quot;github.com/jmoiron/sqlx&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> connection <span class="token operator">*</span>sqlx<span class="token punctuation">.</span>DB

<span class="token keyword">type</span> Product <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id    <span class="token builtin">int</span>    <span class="token string">\`db:&quot;id&quot;\`</span>
	Name  <span class="token builtin">string</span> <span class="token string">\`db:&quot;name&quot;\`</span>
	Price <span class="token builtin">int</span>    <span class="token string">\`db:&quot;price&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">initDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	db<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> sqlx<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;root:amayakiteProjectMysql@tcp(myserver:13001)/go_data&quot;</span><span class="token punctuation">)</span>
	connection <span class="token operator">=</span> db
	connection<span class="token punctuation">.</span><span class="token function">SetMaxOpenConns</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
	connection<span class="token punctuation">.</span><span class="token function">SetMaxIdleConns</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">initDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> connection<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> product Product
	connection<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">,</span> <span class="token string">&quot;select * from product where id = ?&quot;</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">)</span>
	<span class="token comment">// 如果查询不到数据的话，则会返回该类型的默认值</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>product<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>注意，一定要传递指针来接收返回值，而并非是直接传入对象</p></div><h3 id="查询单个对象和多个对象的区别" tabindex="-1"><a class="header-anchor" href="#查询单个对象和多个对象的区别" aria-hidden="true">#</a> 查询单个对象和多个对象的区别</h3><p>单个对象和上面一样，使用get然后传递一个指针即可，要获取多个对象的话可以使用列表接收，由于列表本就是引用类型，所以直接传即可</p><p>注意，下面使用的是Select，而并非是Get来查询多个对象</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">initDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> connection<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> productList <span class="token punctuation">[</span><span class="token punctuation">]</span>Product
	<span class="token comment">// 查询</span>
	sql <span class="token operator">:=</span> <span class="token string">&quot;select * from product&quot;</span>
	err <span class="token operator">:=</span> connection<span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>productList<span class="token punctuation">,</span> sql<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;查询成功&quot;</span><span class="token punctuation">,</span> productList<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果说使用的是Get来查询，但是在数据库中查找到了多个对象，则会抛出异常：<code> scannable dest type slice with &gt;1 columns (查询到的数值) in result</code></p><h3 id="不同数据库的占位符" tabindex="-1"><a class="header-anchor" href="#不同数据库的占位符" aria-hidden="true">#</a> 不同数据库的占位符</h3><p>注意，不同数据库之间模板的占位符是不一样的</p><ul><li>Mysql：？问号</li><li>Postgresql：$1、$2等</li><li>Sqlite: ？和$1都可</li><li>Oracle：:name或者:age等</li></ul><h3 id="如何防止sql注入" tabindex="-1"><a class="header-anchor" href="#如何防止sql注入" aria-hidden="true">#</a> 如何防止Sql注入</h3><p>使用SqlX的模板字符串即可，无论在什么时候都不要自己手动拼接sql语句</p><h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h2><p>这个也不用多说了，缓存小能手</p><h3 id="安装依赖" tabindex="-1"><a class="header-anchor" href="#安装依赖" aria-hidden="true">#</a> 安装依赖</h3><p>当然是要准备依赖的了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 不建议用这个</span>
go get github.com/garyburd/redigo/redis

<span class="token comment"># 用这个</span>
go get github.com/go-redis/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本使用-1" tabindex="-1"><a class="header-anchor" href="#基本使用-1" aria-hidden="true">#</a> 基本使用</h3>`,73),r={href:"https://pkg.go.dev/github.com/go-redis/redis?utm_source=gopls",target:"_blank",rel:"noopener noreferrer"},d=a(`<p>感觉这个应该有更好的替代品</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/json&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>

	<span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 声明全局变量</span>
<span class="token keyword">var</span> redisDb <span class="token operator">*</span>redis<span class="token punctuation">.</span>Client

<span class="token comment">// 初始化连接</span>
<span class="token keyword">func</span> <span class="token function">initRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	redisDb <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
		Addr<span class="token punctuation">:</span>     <span class="token string">&quot;myserver:13002&quot;</span><span class="token punctuation">,</span>
		Password<span class="token punctuation">:</span> <span class="token string">&quot;amayakiteProjectRedis&quot;</span><span class="token punctuation">,</span>
		DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> redisDb<span class="token punctuation">.</span><span class="token function">Ping</span><span class="token punctuation">(</span>redisDb<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;redis连接失败&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;redis连接成功&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
	Age  <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">initRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 存储一个数据，过期时间为1个小时</span>
	err <span class="token operator">:=</span> redisDb<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>redisDb<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Hour<span class="token operator">*</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 创建一个user并存储json</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> <span class="token string">&quot;amayakite&quot;</span><span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 转换为json字符串</span>
	userJson<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
	<span class="token comment">// 转换为json存储</span>
	err <span class="token operator">=</span> redisDb<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>redisDb<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> userJson<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Hour<span class="token operator">*</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 获取user</span>
	userGet<span class="token punctuation">,</span> err <span class="token operator">:=</span> redisDb<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>redisDb<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 转换为user</span>
	<span class="token keyword">var</span> userGetUser User
	json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>userGet<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>userGetUser<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>userGetUser<span class="token punctuation">)</span>
	<span class="token comment">// 删除user</span>
	err <span class="token operator">=</span> redisDb<span class="token punctuation">.</span><span class="token function">Del</span><span class="token punctuation">(</span>redisDb<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function k(v,m){const t=p("ExternalLinkIcon");return i(),o("div",null,[u,n("p",null,[s("还是比较简单的，当然详细的可以看看官方文档"),n("a",r,[s("https://pkg.go.dev/github.com/go-redis/redis?utm_source=gopls"),c(t)])]),d])}const g=e(l,[["render",k],["__file","07-操作数据库.html.vue"]]);export{g as default};
