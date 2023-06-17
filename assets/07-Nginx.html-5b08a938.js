import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as p,c,a as n,b as s,d as i,e as a}from"./app-3ab2953d.js";const o="/images/Java/SpringBoot/07-Nginx/image-20211230120343736.png",r="/images/Java/SpringBoot/07-Nginx/image-20211230121146260.png",d="/images/Java/SpringBoot/07-Nginx/image-20211230122132179.png",u="/images/Java/SpringBoot/07-Nginx/image-20211230122934893.png",v="/images/Java/SpringBoot/07-Nginx/image-20211230123555818.png",k="/images/Java/SpringBoot/07-Nginx/image-20211230123712085.png",m="/images/Java/SpringBoot/07-Nginx/image-20211230142610498.png",g="/images/Java/SpringBoot/07-Nginx/image-20211230163638948.png",b="/images/Java/SpringBoot/07-Nginx/image-20211230165105012.png",h="/images/Java/SpringBoot/07-Nginx/image-20211230174250562.png",x="/images/Java/SpringBoot/07-Nginx/image-20211230174354165.png",f="/images/Java/SpringBoot/07-Nginx/image-20211230174832678.png",y="/images/Java/SpringBoot/07-Nginx/image-20211230175117919.png",w="/images/Java/SpringBoot/07-Nginx/image-20211230175221571.png",_="/images/Java/SpringBoot/07-Nginx/image-20211230180701609.png",q="/images/Java/SpringBoot/07-Nginx/image-20211230182449742.png",N="/images/Java/SpringBoot/07-Nginx/image-20211230184107188.png",S="/images/Java/SpringBoot/07-Nginx/image-20211230184120999.png",B="/images/Java/SpringBoot/07-Nginx/image-20211230191723582.png",J="/images/Java/SpringBoot/07-Nginx/image-20211230194525973.png",z="/images/Java/SpringBoot/07-Nginx/image-20211230195615620.png",$="/images/Java/SpringBoot/07-Nginx/image-20211230195809173.png",j="/images/Java/SpringBoot/07-Nginx/image-20211230213847818.png",O="/images/Java/SpringBoot/07-Nginx/image-20211230213902858.png",I="/images/Java/SpringBoot/07-Nginx/image-20211230214230070.png",T="/images/Java/SpringBoot/07-Nginx/image-20211230214648202.png",E="/images/Java/SpringBoot/07-Nginx/image-20211230215018345.png",P="/images/Java/SpringBoot/07-Nginx/image-20211230215330918.png",M="/images/Java/SpringBoot/07-Nginx/image-20211230222442992.png",C="/images/Java/SpringBoot/07-Nginx/image-20211230222725945.png",F={},V=a('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>这是学习Spring Cloud之前的倒数第二个垫脚石</p><h3 id="nginx简介" tabindex="-1"><a class="header-anchor" href="#nginx简介" aria-hidden="true">#</a> Nginx简介</h3><blockquote><p>Nginx是一个高性能的<strong>HTTP</strong>和<strong>反向代理</strong>的Web服务器，同时也提供了IMAP/POP3/STMP等各种服务</p><p>是老毛子开发的</p><p>百分之九十的网站都用了Nginx</p><p>这玩意的特点是：占有的内存少，并发能力强，在同类的反向代理服务期内是表现比较好的那一种</p><p>Nginx专门为性能优化而开发，能承受高负载的考验，貌似可以接收50000个并发连接/s</p></blockquote><h3 id="正向代理的概念" tabindex="-1"><a class="header-anchor" href="#正向代理的概念" aria-hidden="true">#</a> 正向代理的概念</h3><p>如果把局域网外的Internet想象成一个巨大的资源库，则局域网中的客户端要访问Internet，则需要通过代理服务器来访问</p><p>这种代理服务就被称为正向代理</p><p>就像是我们挂梯子访问github、google那样，梯子就是代理服务器，nginx就可以成为这样的服务器</p><figure><img src="'+o+'" alt="image-20211230120343736" tabindex="0" loading="lazy"><figcaption>image-20211230120343736</figcaption></figure><p>浏览器中配置代理服务器，通过代理服务器去绑定网址，最终将内容返回，这个过程就叫做正向代理</p><p>人话就是：搭梯子</p><h3 id="反向代理的概念" tabindex="-1"><a class="header-anchor" href="#反向代理的概念" aria-hidden="true">#</a> 反向代理的概念</h3><p>通过反向代理，其实客户端对代理是没有感知的，因为客户端无需配置就可以进行访问，我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，再返回给客户端，此时反向代理服务器和目标服务器对外一是同一个服务器，暴露的是代理服务器的IP地址，隐藏了真实服务器IP地址</p><ul><li><strong>正向代理隐藏真实客户端，反向代理隐藏真实服务端</strong></li></ul><p>正向代理访问的外部内容，反向代理访问的是内部内容</p><figure><img src="'+r+'" alt="image-20211230121146260" tabindex="0" loading="lazy"><figcaption>image-20211230121146260</figcaption></figure><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3><p>客户端发送多个请求到服务器，服务器处理请求，有一些可能要与数据库交互，服务器处理完毕后，再将结果返回给客户端</p><p>这种架构模式对于早期的系统相对单一，并发和请求相对较少的情况下是比较合适的，成本也比较低，但是随着信息数据的不断增长，访问量和数据量飞速增长，以及业务系统的复杂程度增加，这种架构会造成服务器响应客户端的请求变慢，并发量特别大的时候，还很容易导致服务器崩溃，这很明显是由于服务器性能的瓶颈造成的问题，，那么如何解决这种情况呢</p><figure><img src="'+d+'" alt="image-20211230122132179" tabindex="0" loading="lazy"><figcaption>image-20211230122132179</figcaption></figure><p>首先我们可能想到的是给服务器加配，但是这也是有上限的</p><p>例如双十一的当天，某个商品的瞬间访问量是非常大的，那么类似于上面的操作 将电脑配置拉满，是不能解决需求的</p><p>也就是说，纵向解决问题的方法行不通了，那么横向增加服务器的数量呢？</p><p>这个时候集群的概念产生了，单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器的情况改变为将请求分配到多个服务器上，将负载分发到不同的服务器，这也就是我们说的负载均衡</p><figure><img src="'+u+'" alt="image-20211230122934893" tabindex="0" loading="lazy"><figcaption>image-20211230122934893</figcaption></figure><h3 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离" aria-hidden="true">#</a> 动静分离</h3><p>为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力</p><p>原本是这样</p><figure><img src="'+v+'" alt="image-20211230123555818" tabindex="0" loading="lazy"><figcaption>image-20211230123555818</figcaption></figure><p>动静分离就是</p><figure><img src="'+k+`" alt="image-20211230123712085" tabindex="0" loading="lazy"><figcaption>image-20211230123712085</figcaption></figure><p>就有点像是IOC..</p><h2 id="nginx的安装" tabindex="-1"><a class="header-anchor" href="#nginx的安装" aria-hidden="true">#</a> Nginx的安装</h2><h3 id="ubuntu直装" tabindex="-1"><a class="header-anchor" href="#ubuntu直装" aria-hidden="true">#</a> Ubuntu直装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译安装这里就不说了 估计也没多少人会这样装</p><p>启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着访问80端口即可</p><figure><img src="`+m+`" alt="image-20211230142610498" tabindex="0" loading="lazy"><figcaption>image-20211230142610498</figcaption></figure><h3 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h3><p>拉取镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> 容器名称 <span class="token parameter variable">-p</span> 你想要的端口:80 <span class="token parameter variable">-d</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我这里就丢在80端口启动了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> nginx <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-d</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="nginx基本命令" tabindex="-1"><a class="header-anchor" href="#nginx基本命令" aria-hidden="true">#</a> Nginx基本命令</h3><p>查看版本号</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-v</span>
<span class="token comment"># 结果：nginx version: nginx/1.21.5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>关闭nginx 如果是在docker容器内操作 容器也会被关闭</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动nginx</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 如果不是docker</span>
nginx

<span class="token comment"># docker</span>
<span class="token function">docker</span> start nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新加载nginx（不重启 重新加载配置文件）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 不是docker</span>
nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx的配置文件" tabindex="-1"><a class="header-anchor" href="#nginx的配置文件" aria-hidden="true">#</a> Nginx的配置文件</h2><p>配置文件可能存在两个位置</p><p>如果说是普通启动的话 应该是在</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/nginx
<span class="token comment"># 或者可能在</span>
<span class="token builtin class-name">cd</span> /etc/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果说是在docker内启动的话 则在</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果说你不确定的话 <strong>可以通过系统自带的命令来查看配置文件的位置</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 这个是查看nginx的安装路径</span>
<span class="token function">whereis</span> nginx
<span class="token comment"># docker结果：nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx</span>

<span class="token comment"># 搜索nginx的配置文件路径</span>
<span class="token function">find</span> / <span class="token parameter variable">-name</span> <span class="token string">&#39;nginx.conf&#39;</span>
<span class="token comment"># 结果：/etc/nginx/nginx.conf</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们到了之后 可以通过 <code>cat nginx.conf</code>查看它的配置文件内都配置了什么</p><p>如果你是直装 那么文件应该不像下面一样简陋 而是有非常多的注释</p><p>如果你是docker安装 就会像下面一样 只有这些内容</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">user</span>  nginx</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  auto</span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">error_log</span>  /var/log/nginx/error.log notice</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">pid</span>        /var/run/nginx.pid</span><span class="token punctuation">;</span>


<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       /etc/nginx/mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">access_log</span>  /var/log/nginx/access.log  main</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>

    <span class="token directive"><span class="token keyword">include</span> /etc/nginx/conf.d/*.conf</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Nginx的配置文件有三个部分组成</p><h3 id="第一部分-全局快" tabindex="-1"><a class="header-anchor" href="#第一部分-全局快" aria-hidden="true">#</a> 第一部分-全局快</h3><p>从配置文件最开始到events块之前的内容，主要会设置一些影响nginx服务器整体运行的配置指令，主要包括配置运行nginx服务器的用户(组)、允许生成的worker process数，进程PID存放路径，日志存放路径和类型及配置文件的引入等</p><p>默认是这些</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">user</span>  nginx</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  auto</span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">error_log</span>  /var/log/nginx/error.log notice</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">pid</span>        /var/run/nginx.pid</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先说明下worker_processes：<strong>worker_processes，工作进程数</strong></p><p>这是nginx服务器并发处理服务的关键配置，可以穿入数值或者auto，如果传入的是数值，则数值越大，可以支持处理的并发量越多，但是会收到硬件、软件等设备的约束</p><p>简单来说 就是启动的进程数量，最多不能超过CPU的核心数量</p><p>一般来说保持auto即可 当然官方推荐是1</p><h3 id="第二部分-events块" tabindex="-1"><a class="header-anchor" href="#第二部分-events块" aria-hidden="true">#</a> 第二部分-events块</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一款主要是负责nginx服务器和用户的网络连接：<strong>worker_connections，单个工作进程可以允许同时建立外部连接的数量</strong></p><ul><li>默认：worker_connections: 1024</li><li>调大：worker_connections: 100000，（调大到10万连接）</li></ul><p>当然这个玩意不能随便设置</p><ul><li>connections不是随便设置的，而是与两个指标有重要关联，一是内存，二是操作系统级别的“进程最大可打开文件数</li><li>内存：每个连接数分别对应一个read_event、一个write_event事件 <ul><li>一个连接数大概占用232字节</li><li>2个事件总占用96字节</li><li>那么一个连接总共占用328字节</li><li>通过数学公式可以算出100000个连接数大概会占用 31M = 100000 * 328 / 1024 / 1024</li><li>当然这只是nginx启动时，connections连接数所占用的nginx</li></ul></li><li>进程最大可打开文件数 <ul><li><strong>进程最大可打开文件数受限于操作系统</strong>，可通过 <code>ulimit -n</code> 命令查询</li><li>以前是1024，现在是65535</li><li>nginx提供了<code>worker_rlimit_nofile</code>指令</li><li>这是除了<code>ulimit</code>的一种设置可用的描述符的方式</li><li>该指令与使用<code>ulimit</code>对用户的设置是同样的效果。此指令的值将覆盖<code>ulimit</code>的值 <ul><li>如：<code>worker_rlimit_nofile 20960</code>;</li></ul></li></ul></li></ul>`,83),L=n("div",{class:"language-ini line-numbers-mode","data-ext":"ini"},[n("pre",{ini:"",class:"language-ini"},[n("code",null,`worker_processes auto; 
worker_rlimit_nofile 2;
error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;
events { 
   worker_connections 65535; 
}
`)]),n("div",{class:"highlight-lines"},[n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),W=a(`<h3 id="第三部分-http块" tabindex="-1"><a class="header-anchor" href="#第三部分-http块" aria-hidden="true">#</a> 第三部分-http块</h3><p>前面的都是一些全局配置 基本上抄一抄就完事了 最重要的是接下来的HTTP块 这个是最重要的部分</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       /etc/nginx/mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">access_log</span>  /var/log/nginx/access.log  main</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>

    <span class="token directive"><span class="token keyword">include</span> /etc/nginx/conf.d/*.conf</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先 注意最后一句话 这个<code>include</code>类似于Java或者其他语言内的导包<code>import xxx.xxx.xx</code></p><p>他这里应该是有点正则匹配的那味道 我们接下来看看<code>/etc/nginx/conf.d/*.conf</code>目录下有多少个conf文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/nginx/conf.d/
<span class="token function">find</span> *.conf
<span class="token comment"># 结果:default.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来看看这个conf内有哪些内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token function">find</span> *.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span>  [::]:80</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

    <span class="token comment">#access_log  /var/log/nginx/host.access.log  main;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">#error_page  404              /404.html;</span>

    <span class="token comment"># redirect server error pages to the static page /50x.html</span>
    <span class="token comment">#</span>
    <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
    <span class="token comment">#</span>
    <span class="token comment">#location ~ \\.php$ {</span>
    <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
    <span class="token comment">#}</span>

    <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
    <span class="token comment">#</span>
    <span class="token comment">#location ~ \\.php$ {</span>
    <span class="token comment">#    root           html;</span>
    <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
    <span class="token comment">#    fastcgi_index  index.php;</span>
    <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
    <span class="token comment">#    include        fastcgi_params;</span>
    <span class="token comment">#}</span>

    <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
    <span class="token comment"># concurs with nginx&#39;s one</span>
    <span class="token comment">#</span>
    <span class="token comment">#location ~ /\\.ht {</span>
    <span class="token comment">#    deny  all;</span>
    <span class="token comment">#}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以他们两组合在一起 应该是：</p><p>每个Http块可以包含多个server块，而每个server就相当于一个虚拟主机</p><p>而每个server块也分为全局server块，以及同时可以包含多个location块</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       /etc/nginx/mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">access_log</span>  /var/log/nginx/access.log  main</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

 <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">listen</span>  [::]:80</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>


        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx配置实例1-反向代理" tabindex="-1"><a class="header-anchor" href="#nginx配置实例1-反向代理" aria-hidden="true">#</a> Nginx配置实例1-反向代理</h2><p>我们首先使用spring整一个简单的hello world</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span><span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在pom.xml中加入build</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着运行右边maven的package 就能得到jar文件 丢到服务器上即可</p><p>端口我设置的是8888</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">server.port</span><span class="token punctuation">=</span><span class="token value attr-value">8888</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着在服务器上</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">screen</span> <span class="token parameter variable">-S</span> helloWorld
<span class="token function">java</span> <span class="token parameter variable">-jar</span> xxxx.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接着按ctrl+a+d暂时关闭这个窗口 进入到我们的nginx内</p><p>我们想要访问localhost:80/hello 跳转为我们这个spring工程的hello</p><p>接着 如果说你是docker装的nginx 先记下这个端口</p><figure><img src="`+g+`" alt="image-20211230163638948" tabindex="0" loading="lazy"><figcaption>image-20211230163638948</figcaption></figure><p>连接的时候会跳出来的docker绑定的ip</p><p>默认一般都是<code>172.17.0.1</code></p><p>然后如果你是docker的话 先进入容器 然后安装下vim</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mv</span> /etc/apt/sources.list /etc/apt/sources.list.bak

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span>/etc/apt/sources.list</span>
deb http://mirrors.ustc.edu.cn/debian stable main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free
EOF</span>

<span class="token function">apt</span> update

<span class="token function">apt</span> <span class="token function">install</span> <span class="token function">vim</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着编辑配置Server的文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/nginx/conf.d/default.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先可以看到默认的配置如下</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
 <span class="token comment"># 这个server的端口</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token comment"># 这里的[::]:80; 表示本机的任意地址的80都是它</span>
    <span class="token directive"><span class="token keyword">listen</span>  [::]:80</span><span class="token punctuation">;</span>
    <span class="token comment"># 这里是这个server的名字 可以自由更该</span>
    <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

 <span class="token comment"># 这里是访问根路径下的一些对应操作</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只需要做如下的更该</p>`,37),D=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s("       "),n("span",{class:"token number"},"80")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s("  [::]:80")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s("  localhost")]),n("span",{class:"token punctuation"},";"),s(`


    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"root"),s("   /usr/share/nginx/html")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token comment"},"# 如果你不是docker的话 下面这个proxy_pass的路径设置为 http://localhost:8888或者127.0.0.1即可"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://172.17.0.1:8888")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"index"),s("  index.html index.htm")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"error_page"),s("   "),n("span",{class:"token number"},"500"),s(),n("span",{class:"token number"},"502"),s(),n("span",{class:"token number"},"503"),s(),n("span",{class:"token number"},"504"),s("  /50x.html")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" = /50x.html")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"root"),s("   /usr/share/nginx/html")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`


`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),A=a(`<p>接着重载nginx</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后你就可以正常访问了</p><figure><img src="`+b+`" alt="image-20211230165105012" tabindex="0" loading="lazy"><figcaption>image-20211230165105012</figcaption></figure><h3 id="nginx反向代理配置多个路径" tabindex="-1"><a class="header-anchor" href="#nginx反向代理配置多个路径" aria-hidden="true">#</a> Nginx反向代理配置多个路径</h3><p>假设说我们现在有这样一个需求</p><ul><li>访问<code>localhost:655/baidu</code>跳转到<code>www.baidu.com</code></li><li>访问<code>localhost:655/bilibili</code>跳转到<code>www.bilibili.com</code></li></ul><p>你也可以改成自己写的java程序 或者其他的东西 这里我就懒得整了</p><p>这里说下docker run的时候派发多个端口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-p</span> <span class="token number">655</span>:655 <span class="token parameter variable">--name</span> nginx nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来我们依旧是到default.conf内 <strong>追加</strong>如下数据</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">655</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> [::]:655</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> MyLocal</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> ~ /bilibili/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> https://www.bilibili.com</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> ~ /baidu/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> https://www.baidu.com</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后 nginx -s reload</p><p>接着访问</p><figure><img src="`+h+'" alt="image-20211230174250562" tabindex="0" loading="lazy"><figcaption>image-20211230174250562</figcaption></figure><p>发现err</p><p>这其实是正常的效果，看console可以发现</p><figure><img src="'+x+'" alt="image-20211230174354165" tabindex="0" loading="lazy"><figcaption>image-20211230174354165</figcaption></figure><p>有很多东西 没法代理，当然 如果是你自己整两个tomcat上去 并不会出现这样的问题</p><h2 id="location内的特殊符号说明" tabindex="-1"><a class="header-anchor" href="#location内的特殊符号说明" aria-hidden="true">#</a> Location内的特殊符号说明</h2><p>我们刚刚在配置的时候 使用了一个特殊的符号</p>',21),H=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" MyLocal")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" ~ /bilibili/")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" https://www.bilibili.com")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" ~ /baidu/")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" https://www.baidu.com")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),R=a('<p><code>~ /bilibili/</code>和<code>~ /baidu/</code> 其他的好理解 代表访问自定路径balabala的 那么这个<code>~</code>呢？</p><p>其实nginx给我们准备了四个特殊的玩意</p><figure><img src="'+f+'" alt="image-20211230174832678" tabindex="0" loading="lazy"><figcaption>image-20211230174832678</figcaption></figure><ol><li><code>=</code> 用于不含正则表达式的uri前，要求请求字符串与uri严格匹配，如果是匹配成功，就停止继续向下搜索饼立刻处理该请求</li><li><code>~</code>用户表示uri包含正则表达式，并且区分大小写</li><li><code>~*</code> 用于表示uri包含正则表达式，并且不区分大小写</li><li><code>^~</code>用于不含正则表达式的uri前，要求nginx服务器找到标识uri和请求字符串<strong>匹配度最高</strong>的location之后，立刻使用该location处理请求，而不再使用location块中的正则uri和请求字符串能做匹配</li></ol><p>如果uri包含正则表达式，则必须包含有<code>~</code>或者<code>~*</code>的标识</p><p>也就是说 我们之前定义的规则可以通过这样访问</p><figure><img src="'+y+'" alt="image-20211230175117919" tabindex="0" loading="lazy"><figcaption>image-20211230175117919</figcaption></figure><p>也可以这样</p><figure><img src="'+w+`" alt="image-20211230175221571" tabindex="0" loading="lazy"><figcaption>image-20211230175221571</figcaption></figure><h2 id="nginx配置负载均衡" tabindex="-1"><a class="header-anchor" href="#nginx配置负载均衡" aria-hidden="true">#</a> Nginx配置负载均衡</h2><p>我们现在有一个需求</p><p>现在有两个一模一样的nginx服务器 里面的内容都一样</p><p>区别就在于一个在7777端口 一个在 8888 端口</p><p>我们先准备下tomcat</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull tomcat
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">7777</span>:8080 <span class="token parameter variable">--name</span> tomcat1  tomcat
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8888</span>:8080 <span class="token parameter variable">--name</span> tomcat2  tomcat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着在两个的webapps内都添加对应的页面</p><figure><img src="`+_+`" alt="image-20211230180701609" tabindex="0" loading="lazy"><figcaption>image-20211230180701609</figcaption></figure><p>7777的index</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>7777<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    这里是7777端口的tomcat
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外一个同理 注意 tomcat默认是10.x 所以webinf也要10.x的（5.0+）</p><p>用命令来操作的话 大概是这样（两个容器内都是这样操作）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> /usr/local/tomcat/webapps/ROOT/
<span class="token function">mkdir</span> /usr/local/tomcat/webapps/ROOT/WEB-INF/
<span class="token function">touch</span> /usr/local/tomcat/webapps/ROOT/index.html
<span class="token function">touch</span> /usr/local/tomcat/webapps/ROOT/WEB-INF/web.xml
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /usr/local/tomcat/webapps/ROOT/WEB-INF/web.xml</span>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;web-app xmlns=&quot;https://jakarta.ee/xml/ns/jakartaee&quot;
  xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
  xsi:schemaLocation=&quot;https://jakarta.ee/xml/ns/jakartaee
                      https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd&quot;
  version=&quot;5.0&quot;
  metadata-complete=&quot;true&quot;&gt;

  &lt;display-name&gt;Welcome to Tomcat&lt;/display-name&gt;
  &lt;description&gt;
     Welcome to Tomcat
  &lt;/description&gt;

&lt;/web-app&gt;
EOF</span>
<span class="token function">cat</span>  <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /usr/local/tomcat/webapps/ROOT/index.html</span>
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;8888&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    这里是8888端口的tomcat
&lt;/body&gt;
&lt;/html&gt;
EOF</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果感觉自己没有配置好 可以自己在vscode中开个端口转发测试</p><figure><img src="`+q+'" alt="image-20211230182449742" tabindex="0" loading="lazy"><figcaption>image-20211230182449742</figcaption></figure><p>接着开始配置nginx</p><p>在default.conf内添加如下内容</p>',26),U=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token comment"},"# 这里是配置一个负载均衡站点"),s(`
`),n("span",{class:"token comment"},"# 相当于之后可以指定这里为一个网址 然后访问这里 随机访问一个站点 如果你不是docker 这里填写本机(localhost)即可"),s(`
`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" myServer")]),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 172.17.0.1:7777")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 172.17.0.1:8888")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" MyLocal")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"# 指定访问路径为负载均衡站点 注意 http:// 不能省略"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://myServer")]),n("span",{class:"token punctuation"},";"),s(`
        
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"root"),s(" /usr/share/nginx/html")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"index"),s(" index.html index.htm")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),G=a(`<p>接着重载服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着访问</p><figure><img src="`+N+'" alt="image-20211230184107188" tabindex="0" loading="lazy"><figcaption>image-20211230184107188</figcaption></figure><figure><img src="'+S+'" alt="image-20211230184120999" tabindex="0" loading="lazy"><figcaption>image-20211230184120999</figcaption></figure><p>你会发现每次访问的都不一样</p><h2 id="负载均衡的几种策略" tabindex="-1"><a class="header-anchor" href="#负载均衡的几种策略" aria-hidden="true">#</a> 负载均衡的几种策略</h2><h3 id="轮循-默认" tabindex="-1"><a class="header-anchor" href="#轮循-默认" aria-hidden="true">#</a> 轮循（默认）</h3><p>默认是轮循（就像是RabbitMQ那样，固定的分配 如果说你多访问几次就会发现上面的案例中的结果 第一次是7 第二次一定是8 以此类推）</p><p>轮循分配：每个请求按照时间顺序逐一分配到不同的后端服务器，如果服务器down掉了，能自动剔除</p><h3 id="weight权重策略" tabindex="-1"><a class="header-anchor" href="#weight权重策略" aria-hidden="true">#</a> Weight权重策略</h3><p>顾名思义 根据权重来分配客户端的访问倾斜度</p><p>默认所有的权重都是1</p><p>权重越高 分配到的客户端越多</p>',14),X=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" myServer")]),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 172.17.0.1:7777 weight=5")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 172.17.0.1:8888 weight=10")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" MyLocal")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"# 指定访问路径为负载均衡站点"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://myServer")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"root"),s(" /usr/share/nginx/html")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"index"),s(" index.html index.htm")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),Y=n("h3",{id:"ip-hash",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#ip-hash","aria-hidden":"true"},"#"),s(" ip_hash")],-1),K=n("p",null,[s("每个请求按照访问ip的hash结果分配，这样"),n("strong",null,"每个访客可以固定访问一个后端服务器"),s("，可以解决普通前后端不分离项目中的session问题")],-1),Q=n("p",null,"比如说下面这个配置 我第一次访问的时候分配到了8888 后面也会一直被分配到8888",-1),Z=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" myServer")]),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ip_hash")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 172.17.0.1:7777")]),s(),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 172.17.0.1:8888")]),s(),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" MyLocal")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"# 指定访问路径为负载均衡站点"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://myServer")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"root"),s(" /usr/share/nginx/html")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"index"),s(" index.html index.htm")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),nn=n("h3",{id:"fair-响应时间分配",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#fair-响应时间分配","aria-hidden":"true"},"#"),s(" fair-响应时间分配")],-1),sn=n("p",null,"按照后端服务器的响应时间来动态分配 响应时间短的优先分配",-1),an=n("p",null,"注意 这种方式需要自己手动给nginx安装第三方模块upstream-fair 具体方法百度",-1),en=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" myServer")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 172.17.0.1:7777")]),s(),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 172.17.0.1:8888")]),s(),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fair")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:655")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" MyLocal")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"# 指定访问路径为负载均衡站点"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://myServer")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"root"),s(" /usr/share/nginx/html")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"index"),s(" index.html index.htm")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),tn=a('<h2 id="nginx动静分离" tabindex="-1"><a class="header-anchor" href="#nginx动静分离" aria-hidden="true">#</a> Nginx动静分离</h2><p>简单来说就是把动态和静态资源的请求分开</p><p>也就是前后端分离 各做各的</p><blockquote><p>可以理解成 Nginx处理静态页面，我们的Java程序处理动态页面</p></blockquote><p>目前来说有两种实现方案</p><ul><li>存储把静态文件独立成单独的域名，放在独立的服务器上，这也是主流推崇的方案</li><li>另一种是动态和静态文件混合在一起发布，通过nginx分开</li></ul><figure><img src="'+B+`" alt="image-20211230191723582" tabindex="0" loading="lazy"><figcaption>image-20211230191723582</figcaption></figure><p>通过<code>location</code>指定不同的后缀名实现不同的转发请求，通过<code>expries</code>参数设置，可以使浏览器缓存过期时间，减少与服务器之间的请求和流量</p><h3 id="静态资源的正向代理-准备工作" tabindex="-1"><a class="header-anchor" href="#静态资源的正向代理-准备工作" aria-hidden="true">#</a> 静态资源的正向代理-准备工作</h3><p>我这里就用vite+Vue3整一个简单的hello World吧</p><p>package.json:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test-vue3-vite&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite build&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;preview&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite preview&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;axios&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^0.24.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;sass&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.45.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;sass-loader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^12.4.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.2.25&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;@vitejs/plugin-vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;vite&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.7.2&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>App.vue</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>Hello World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>add<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Click Me Add Count<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/reactivity&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/runtime-core&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  count<span class="token punctuation">.</span>value <span class="token operator">=</span> count<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>

  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
  <span class="token selector">button</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>225<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 255<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token selector">// 点击变色
    &amp;:active</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 255<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> background-color 0.5s ease<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span>aliceblue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>页面效果</p><figure><img src="`+J+`" alt="image-20211230194525973" tabindex="0" loading="lazy"><figcaption>image-20211230194525973</figcaption></figure><p>接着，将相应的打包好的资源拷贝到docker目录内</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">cp</span> /xxx/xxx/dist nginx:/data/www/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后再拷贝一点静态文件进去</p><figure><img src="`+z+`" alt="image-20211230195615620" tabindex="0" loading="lazy"><figcaption>image-20211230195615620</figcaption></figure><p>附-重命名脚本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">names</span> <span class="token keyword">in</span> ./images/Java/*
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$names</span>&quot;</span>
    <span class="token assign-left variable">news</span><span class="token operator">=</span><span class="token variable">$i</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$news</span>&quot;</span>
    <span class="token function">mv</span> <span class="token variable">$names</span> ./images/Java/<span class="token variable">$news</span>.png
    <span class="token builtin class-name">let</span> <span class="token assign-left variable">i</span><span class="token operator">=</span>i+1
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终结构</p><figure><img src="`+$+`" alt="image-20211230195809173" tabindex="0" loading="lazy"><figcaption>image-20211230195809173</figcaption></figure><h3 id="配置静态资源" tabindex="-1"><a class="header-anchor" href="#配置静态资源" aria-hidden="true">#</a> 配置静态资源</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> [::]:80</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>

    <span class="token comment"># 正常情况下 我们的html之类的都是放在根目录下的</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /data/www/</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span> index.html index.htm</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> /static/</span> <span class="token punctuation">{</span>
        <span class="token comment"># 注意 其他静态资源 都要通过alias配置 不然读取不到 我也不知道为啥</span>
        <span class="token directive"><span class="token keyword">alias</span> /data/images/Java/</span><span class="token punctuation">;</span>
        <span class="token comment"># 这个是文件树 默认是不开启的</span>
        <span class="token directive"><span class="token keyword">autoindex</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token comment"># 这个是设置客户端的静态资源缓存时间</span>
        <span class="token directive"><span class="token keyword">expires</span> <span class="token number">3d</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>nginx指定文件路径有两种方式root和alias，指令的使用方法和作用域：</p><blockquote><p>[root]<br> 语法：root path<br> 默认值：root html<br> 配置段：http、server、location、if<br> [alias]<br> 语法：alias path<br> 配置段：location</p></blockquote><ul><li>root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。</li><li>root的处理结果是：root路径＋location路径</li><li>alias的处理结果是：使用alias路径替换location路径</li><li>alias是一个目录别名的定义，root则是最上层目录的定义。</li><li>还有一个重要的区别是alias后面必须要用“/”结束，否则会找不到文件的。。。而root则可有可无</li></ul><p><code>expries</code>定义：</p><blockquote><p>是给一个资源设定一个过期时间，也就是说无需去服务端做认证，直接通过浏览器自身确认是否过期即可</p><p>所以不会产生额外的流量</p><p>此种方法非常适合不经常变动的静态资源（如果经常更新一个文件，则不推荐用expries来缓存）</p><p>语法：<br> expires times<br> times 可以是：</p><ul><li>2s 2秒</li><li>2m 2分钟</li><li>2h 2小时</li><li>2d 2天</li><li>-1 不缓存，用于过期</li><li>0 比-1更好用 立刻过期</li></ul><p>max ：31 December2037 23:59:59GMT</p></blockquote></blockquote><p>访问根路径</p><figure><img src="`+j+'" alt="image-20211230213847818" tabindex="0" loading="lazy"><figcaption>image-20211230213847818</figcaption></figure><p>访问static</p><figure><img src="'+O+'" alt="image-20211230213902858" tabindex="0" loading="lazy"><figcaption>image-20211230213902858</figcaption></figure><p>访问static路径下的资源</p><figure><img src="'+I+'" alt="image-20211230214230070" tabindex="0" loading="lazy"><figcaption>image-20211230214230070</figcaption></figure><h2 id="nginx-集群" tabindex="-1"><a class="header-anchor" href="#nginx-集群" aria-hidden="true">#</a> Nginx 集群</h2><p>没错 这玩意也有集群..</p><figure><img src="'+T+'" alt="image-20211230214648202" tabindex="0" loading="lazy"><figcaption>image-20211230214648202</figcaption></figure><p>草 真就万物都可集群…绝了</p><p>Nginx的大概长这样</p><figure><img src="'+E+'" alt="image-20211230215018345" tabindex="0" loading="lazy"><figcaption>image-20211230215018345</figcaption></figure><p>然后需要一个额外的东西-KeepAlived来实现</p><figure><img src="'+P+'" alt="image-20211230215330918" tabindex="0" loading="lazy"><figcaption>image-20211230215330918</figcaption></figure><p>这里就不说了 实际上这玩意非常稳 很少用到集群（除非托大的project）</p>',42),ln={href:"https://www.bilibili.com/video/BV1zJ411w7SV?p=15&spm_id_from=pageDriver",target:"_blank",rel:"noopener noreferrer"},pn=n("p",null,[s("不过据说实际项目中一般都不会用这种方式来配置 而是用另一个玩意："),n("code",null,"lvs"),s("来配置")],-1),cn=n("h2",{id:"nginx原理简单说明",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx原理简单说明","aria-hidden":"true"},"#"),s(" Nginx原理简单说明")],-1),on={href:"https://www.bilibili.com/video/BV1zJ411w7SV?p=17&spm_id_from=pageDriver",target:"_blank",rel:"noopener noreferrer"},rn=n("p",null,"就客户是骨头",-1),dn=n("p",null,"worker是狗",-1),un=n("p",null,"master进程是狗狗管理员即可",-1),vn=n("figure",null,[n("img",{src:M,alt:"image-20211230222442992",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20211230222442992")],-1),kn=n("figure",null,[n("img",{src:C,alt:"image-20211230222725945",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20211230222725945")],-1);function mn(gn,bn){const e=l("ExternalLinkIcon");return p(),c("div",null,[V,L,W,D,A,H,R,U,G,X,Y,K,Q,Z,nn,sn,an,en,tn,n("p",null,[s("详细使用看这个视频"),n("a",ln,[s("https://www.bilibili.com/video/BV1zJ411w7SV?p=15&spm_id_from=pageDriver"),i(e)])]),pn,cn,n("p",null,[s("稍微具体一点的原理可以看这个视频"),n("a",on,[s("https://www.bilibili.com/video/BV1zJ411w7SV?p=17&spm_id_from=pageDriver"),i(e)])]),rn,dn,un,vn,kn])}const fn=t(F,[["render",mn],["__file","07-Nginx.html.vue"]]);export{fn as default};
