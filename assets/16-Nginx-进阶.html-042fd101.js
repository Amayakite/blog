import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as o,a as n,b as s,d as a,e as i}from"./app-2d4b26c1.js";const p="/images/SpringCloud/16-Nginx-进阶/image-20220120174953645.png",r="/images/SpringCloud/16-Nginx-进阶/image-20220120183653791.png",d="/images/SpringCloud/16-Nginx-进阶/image-20220120204553430-16426827540471.png",u="/images/SpringCloud/16-Nginx-进阶/image-20220120204737403.png",v="/images/SpringCloud/16-Nginx-进阶/image-20220120211041639.png",m="/images/SpringCloud/16-Nginx-进阶/image-20220120220118212.png",k="/images/SpringCloud/16-Nginx-进阶/image-20220120224852192.png",b="/images/SpringCloud/16-Nginx-进阶/image-20220120225014639.png",h={},g=n("h2",{id:"概述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#概述","aria-hidden":"true"},"#"),s(" 概述")],-1),_=n("p",null,"之前nginx并不是学习的特别的深入，这里深入了解下",-1),x=n("h2",{id:"nginx的变量一览",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx的变量一览","aria-hidden":"true"},"#"),s(" Nginx的变量一览")],-1),y=n("p",null,"这里过一遍就好了，以后有需要的时候回来查",-1),q={href:"http://nginx.org/en/docs/varindex.html",target:"_blank",rel:"noopener noreferrer"},w=i(`<h3 id="和request有关的变量" tabindex="-1"><a class="header-anchor" href="#和request有关的变量" aria-hidden="true">#</a> 和Request有关的变量</h3><blockquote><p><code>$arg_name</code></p></blockquote><p>请求行中，名称为<em>name</em>的参数的值。</p><p>比如，当请求行是<code>GET /nginx/varindex/?from=rss HTTP/1.1</code>时，<code>$arg_from</code>的值是&quot;rss&quot;</p><p>当请求行中没有名称为<em>name</em>的参数时，<code>$arg_name</code>的值是空字符串</p><blockquote><p><code>$is_args</code></p></blockquote><p>如果请求行中包含参数，那么<code>$is_args</code>的值是&quot;?&quot;，否则是空字符串</p><blockquote><p><code>$args、$query_string</code></p></blockquote><p>请求行中的全部参数（也就是查询字符串）。</p><p>比如，当请求行是<code>GET /nginx/varindex/?a=b&amp;c=d HTTP/1.1</code>时，<code>$args</code>的值是<strong>a=b&amp;c=d</strong></p><p>当请求行中没有任何参数时，<code>$args</code>的值是空字符串</p><blockquote><p><code>$cookie_name</code></p></blockquote><p>名称为<em>name</em>的cookie的值</p><blockquote><p><code>$request</code></p></blockquote><p>完整的原始的请求行</p><p>比如<code>&quot;GET /b/../a?a=b HTTP/1.1</code>（uri不会被规范化）</p><blockquote><p><code>$http_name</code></p></blockquote><p>用来获取任意请求头的值。<br> HTTP header的命名方式是：</p><p>每个单词的首字母大写，其余字母小写，单词之间用中划线（&quot;-&quot;）连接</p><p>比如，User-Agent、Content-Type、<code>X-Forwarded-For</code>等<br> 请求头名称和name之间的转换方式是</p><p>将请求头名称转换成小写形式，并将中划线（&quot;-&quot;）替换成下划线（&quot;_&quot;）</p><ul><li>比如：<code>$http_x_forwarded_for</code></li></ul><blockquote><p><code>$request_length</code></p></blockquote><p>请求的长度，包含请求行、请求头和请求体</p><blockquote><p><code>$request_method</code></p></blockquote><p>请求方法，比如GET或POST</p><blockquote><p><code>$request_uri</code></p></blockquote><p>完整的原始的URI（带参数）</p><blockquote><p><code>$scheme</code></p></blockquote><p>请求模式，http或https</p><blockquote><p><code>$content_length</code></p></blockquote><p>&quot;Content-Length&quot;请求头的值</p><blockquote><p><code>$content_type</code></p></blockquote><p>&quot;Content-Type&quot;请求头的值</p><blockquote><p><code>$document_root</code></p></blockquote><p>应用于当前请求的root或alias指令的值</p><blockquote><p><code>$document_uri</code>、<code>$uri</code></p></blockquote><p><strong>规范化后的URI。所谓的规范化是指：将 以&quot;%XX&quot;形式编码的文本进行解码 之后，解决对相对地址&quot;.&quot;和&quot;..&quot;的引用，并将多个相邻的&quot;/&quot;压缩成一个。<br> 请求处理期间，$uri的值可能发生改变，比如在发生内部重定向或者使用index文件的时候</strong></p><blockquote><p><code>$host</code></p></blockquote><p>Nginx按照下面的优先级顺序，设置<code>$host</code>的值：</p><ul><li>从请求行中获取到的主机名</li><li>从&quot;Host&quot;请求头中获取到的主机名</li><li>处理请求的虚拟主机的名称</li></ul><p>一般情况下，请求行中只会包含 Request URI ，也就是 URI 和 QUERY STRING ，不会包含 host name。但是，当使用Nginx做HTTP正向代理服务器的时候，请求行中会包含host name</p><blockquote><p><code>$proxy_add_x_fowarded_for</code></p></blockquote><p>在客户端传递来的X-Forwarded-For请求头后面追加<code>$remote_addr</code>（用逗号分隔）</p><p>如果客户端没有传递X-Forwarded-For请求头，那么该变量等于<code>$remote_addr</code></p><ul><li>比如，客户端传递来的XFF请求头是： <ul><li><code>192.168.1.1, 192.168.1.2</code></li><li><code>$remote_addr</code>是192.168.1.3</li></ul></li><li>那么$proxy_add_x_forwarded_for等于<code>192.168.1.1,192.168.1.2,192.168.1.3</code></li></ul><blockquote><p><code>$realpath_root</code></p></blockquote><p>应用于当前请求的root或alias指令的值所对应的绝对路径，所有的符号连接都会被解析成真实路径</p><blockquote><p><code>$server_protocol</code></p></blockquote><p>请求协议，通常是&quot;HTTP/1.0&quot;、&quot;HTTP/1.1&quot;、&quot;HTTP/2.0&quot;</p><blockquote><p><code>$request_filename</code></p></blockquote><p>当前请求对应的资源的路径。<br> 该变量的值是基于root（或alias）指令的值，以及请求的URI计算出来的。比如，当root指令的值是/data/w3，URI是/images/logo.jpg时，该变量等于/data/w3/images/logo.jpg</p><h3 id="和response的相关变量" tabindex="-1"><a class="header-anchor" href="#和response的相关变量" aria-hidden="true">#</a> 和Response的相关变量</h3><blockquote><p><code>$body_bytes_sent</code></p></blockquote><p>下发给客户端的字节数（不包含响应头）</p><blockquote><p><code>$request_time</code></p></blockquote><p>从 接收到请求的第一个字节 到 把响应的最后一个字节发送给客户端，所经历的时间。单位是秒，精确到毫秒</p><blockquote><p><code>$send_http_*name*</code></p></blockquote><p>用于获取下发给客户端的任意响应头的值。响应头名称和<em>name</em>之间的转换方式是：将响应头名称转换成小写形式，并将中划线（&quot;-&quot;）替换成下划线（&quot;_&quot;）</p><blockquote><p><code>$status</code></p></blockquote><p>下发给客户端的响应码</p><h3 id="常用变量" tabindex="-1"><a class="header-anchor" href="#常用变量" aria-hidden="true">#</a> 常用变量</h3><blockquote><p><code>$binary_remote_addr</code></p></blockquote><p>二进制形式的客户端地址。对于IPV4地址，该值的长度是4字节，对于IPV6地址该值的长度是16字节</p><blockquote><p><code>$connection</code></p></blockquote><p>连接的序号</p><blockquote><p><code>$connection_requests</code></p></blockquote><p>在开启keepalive的情况下，客户端可以使用一条连接发起多个请求，该变量用于记录通过一条连接发起的请求数</p><blockquote><p><code>$date_local</code></p></blockquote><p>本地时区的当前时间</p><blockquote><p><code>$date_gmt</code></p></blockquote><p>GMT格式的当前时间</p><blockquote><p><code>$hostname</code></p></blockquote><p>运行Nginx的主机的主机名，比如：vm016_centos</p><blockquote><p><code>$msec</code></p></blockquote><p>当前的时间戳，精确到毫秒。比如，1551609371.088</p><blockquote><p><code>$nginx_version</code></p></blockquote><p>Nginx的版本号</p><blockquote><p><code>$pid</code></p></blockquote><p>Worker进程的PID</p><blockquote><p><code>$proxy_host</code></p></blockquote><p>在proxy_pass指令中指定的被代理服务的名称（可能是upstream的名称）</p><blockquote><p><code>$proxy_port</code></p></blockquote><p>在proxy_pass指令中指定的被代理服务的端口。如果在proxy_pass指令中未指定端口，那么该变量等于协议的默认端口</p><blockquote><p><code>$remote_addr</code></p></blockquote><p>客户端地址</p><blockquote><p><code>$remote_port</code></p></blockquote><p>客户端端口</p><blockquote><p><code>$remote_user</code></p></blockquote><p>在开启basic authentication的时候，客户端所使用的用户名</p><blockquote><p><code>$server_addr</code></p></blockquote><p>接收请求的虚拟主机的地址</p><blockquote><p><code>$server_port</code></p></blockquote><p>接收请求的虚拟主机的端口</p><blockquote><p><code>$server_name</code></p></blockquote><p>接收请求的虚拟主机的名称</p><blockquote><p><code>$time_iso8601</code></p></blockquote><p>ISO 8601标准格式的本地时间</p><blockquote><p><code>$time_local</code></p></blockquote><p>通用日志格式的本地时间</p><h3 id="与upstream相关的变量" tabindex="-1"><a class="header-anchor" href="#与upstream相关的变量" aria-hidden="true">#</a> 与upstream相关的变量</h3><blockquote><p><code>$upstream_addr</code></p></blockquote><p>保存upstream server的ip地址和端口，或Unix套接字的路径。</p><p>在请求处理期间，如果请求被代理到多个upstream server，那么它们的地址之间用&quot;,&quot;分隔</p><p>比如：&quot;192.168.1.1:80, 192.168.1.2:80, unix:/tmp/sock&quot;。</p><p>当发生（由error_page等发起的）从一个server group到另外一个server group的内部重定向时，不同的server group之间用&quot;:&quot;分隔，比如：&quot;192.168.1.1:80, 192.168.1.2:80, unix:/tmp/sock : 192.168.10.1:80, 192.168.10.2:80&quot;。</p><p>如果server group中没有可用的server，那么该变量的值是server group的名字</p><blockquote><p><code>$upstream_bytes_received</code></p></blockquote><p>从upstream server接收到的字节数。来自于多个连接的值，像$upstream_addr中的地址一样，用&quot;,&quot;和&quot;:&quot;分隔</p><blockquote><p><code>$upstream_bytes_sent</code><br> （Nginx 1.15.8 起 可用）<br> 发送到upstream server的字节数。来自多个连接的值，像$upstream_addr中的地址一样，用&quot;,&quot;和&quot;:&quot;分隔</p></blockquote><blockquote><p><code>$upstream_cache_status</code></p></blockquote><p>该变量用来显示缓存的使用情况。其值是：</p><ul><li>HIT：命中缓存</li><li>MISS：未命中缓存</li><li>EXPIRED：缓存已过期</li><li>BYPASS：客户端强制不使用缓存</li><li>STALE：使用了过期的缓存。可以通过proxy_cache_use_stale指令，指定在什么情况下，使用过期的缓存，比如http_502、error、timeout等</li><li>UPDATING：缓存正在更新</li><li>REVALIDATE：缓存重新生效 <ul><li>在启用客户端缓存的情况下，服务端可以通过以下两种方式，来判断客户端的缓存是否失效：</li><li>ETag响应头 和 If-None-Match请求头</li><li>Last-Modified响应头 和 If-Modified-Since请求头</li><li>当客户端访问一个URL的时候，如果客户端没有缓存或缓存失效，那么服务端会下发资源，以及Last-Modified（资源的最后修改时间）和ETag（Entity Tag，服务端计算的资源指纹，当资源发生改变时，ETag也会改变）响应头。</li><li>以后，客户端再访问该URL时，会带上If-Modified-Since和If-None-Match请求头。其中，If-Modified-Since的值是上次返回的响应中的Last-Modified头的值，If-None-Match的值是上次返回的响应中的ETag头的值。</li></ul></li><li>下面是Nginx的处理流程，与别的文档的描述不同，Nginx的相关源码在：github，Mozilla的说明在：MDN <ul><li>如果存在IMS请求头，并且IMS的值小于资源的最后修改时间，那么返回200，以及新的ETag和Last-Modified</li><li>如果存在INM请求头，并且资源的ETag值与INM的值不匹配，那么返回200，以及新的Etag和Last-Modified，否则，认为资源未被修改，返回304，以及空的响应体</li></ul></li></ul><p>当开启<code>proxy_cache_revalidate</code>时，Nginx会通过If-Modified-Since和If-None-Match请求头，来使过期的缓存条目重新生效</p><blockquote><p><code>$upstream_connect_time</code></p></blockquote><p>建立到upstream server的连接所花费的时间。单位是秒，精确到毫秒。对于SSL连接，该时间也包含SSL握手所花费的时间。建立多个连接所花费的时间之间，像$upstream_addr中的地址一样，用&quot;,&quot;和&quot;:&quot;分隔</p><blockquote><p><code>$upstream_cookie_name</code></p></blockquote><p>upstream server返回的&quot;Set-Cookie&quot;响应头中的，名称name的cookie的值。只有最后一个server返回的响应中的cookie会被保存</p><blockquote><p><code>$upstream_header_time</code></p></blockquote><p>从upstream server接收响应头所花费的时间。单位是秒，精确到毫秒。多个响应所花费的时间之间，像$upstream_addr中的地址一样，用&quot;,&quot;和&quot;:&quot;分隔</p><blockquote><p><code>$upstream_http_name</code></p></blockquote><p>用于获取upstream server返回的任意响应头的值。<br> 响应头名称和name之间的转换方式是：将响应头名称转换成小写形式，并将中划线替换成下划线。<br> 只有最后一个server的响应头会被保存</p><blockquote><p><code>$upstream_response_length</code></p></blockquote><p>保存从upstream server获取到的响应的长度。单位是字节。多个响应的长度之间，像$upstream_addr中的地址一样，用&quot;,&quot;和&quot;:&quot;分隔</p><blockquote><p><code>$upstream_response_time</code></p></blockquote><p>保存从upstream server接收响应所花费的时间。单位是秒，精确到毫秒。多个响应所花费的时间之间，像$upstream_addr中的地址一样，用&quot;,&quot;和&quot;:&quot;分隔</p><blockquote><p><code>$upstream_status</code></p></blockquote><p>保存从upstream server获取到的响应的状态码。多个响应的状态码之间，像$upstream_addr中的地址一样，用&quot;,&quot;和&quot;:&quot;分隔</p><h2 id="配置文件初步解读" tabindex="-1"><a class="header-anchor" href="#配置文件初步解读" aria-hidden="true">#</a> 配置文件初步解读</h2><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># user-运行的用户，可以指定是哪个用户来运行，默认是当前用户（nobody），一般情况下不动</span>
<span class="token comment">#user  nobody;</span>

<span class="token comment"># 这个是程序的进程数量，默认是1，可以改成和服务器CPU数量一致 或者auto 这个根据心情来决定，docker内貌似默认是auto来着</span>
<span class="token comment"># 但是服务器上如果还有别的中间件在运行的话，例如还有一个tomcat，就可以设置为n-1</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>

<span class="token comment"># 日志的存放路径，这里是错误日志的存放路径</span>
<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment"># notice是日志的级别，可以设置为debug，info，notice，warn，error，crit</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment"># debug，info，notice，warn，error，crit</span>
<span class="token comment"># 上述级别中，debug是最低的，crit是最严重的</span>


<span class="token comment">#pid        logs/nginx.pid;</span>


<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 每个进程最多处理的请求数量，默认是1024，通常情况下都会改成一到两万左右 不建议改更高</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">10240</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment"># http的设置</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 导入一个文件</span>
    <span class="token comment"># 这个mine.type里面包含了所有的文件类型（http的数据类型，例如application/json等）</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token comment"># 默认的文件类型，如果没有设置，默认是text/html</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token comment"># 这里主要是对日志的格式做一个配置，默认就是如下内容，如果想要自定义的话吧注释放开然后自己变动即可</span>
    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>



    <span class="token comment"># 这里是用户请求的日志存放路径，也就是有用户访问的时候，控制台上的内容对应的文件</span>
    <span class="token comment">#access_log  logs/access.log  main;</span>

    <span class="token comment"># 这个是用于进行文件的高效传输，不变动即可</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token comment"># 当我们的数据包累计到一定的大小之后再进行发送，如果要启动的话，sendfile也得抱枕是on状态</span>
    <span class="token comment"># 反正开启后能提高传输的效率</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment"># 在和客户端完成通讯之后保持多长时间的连接，0的话就是用不超时（一直保持连接），可以设定为秒数，默认是65s</span>
    <span class="token comment">#keepalive_timeout  0;</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

    <span class="token comment"># 是否开启gzip压缩，开启了之后，js、css、html之类的传输的数据都会进行压缩，让体积变小，从而让传输效率更快，并解约服务器带宽</span>
    <span class="token comment"># 对应的，开启了压缩后，会消耗一定的服务器的性能，这个自行斟酌</span>
    <span class="token comment"># 当然 实际生产环境的时候，都会开启</span>
    <span class="token directive"><span class="token keyword">gzip</span>  <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    

    
    
    <span class="token comment"># server的配置，代表这是一个服务，一个http块中能够包含多个服务</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token comment"># 监听的端口号</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">listen</span>       [::]:80</span> <span class="token punctuation">;</span>

        <span class="token comment"># 服务名称 可以配置一个ip 或者一个域名</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>

        <span class="token comment"># 访问对应路径返回的内容</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># 当发生页面不存在（404）错误的时候，返回哪些内容给客户端，可以自行配置，可以是html、json、xml等</span>
        <span class="token comment"># 注意 最后面的 /404.html 是一个规则名 详情看下面的</span>
        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># 发生错误的时候（指定多个），返回哪些页面给客户端</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        
        <span class="token comment"># 规则名，访问/50x.html的时候，返回的内容</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx常用命令" tabindex="-1"><a class="header-anchor" href="#nginx常用命令" aria-hidden="true">#</a> Nginx常用命令</h2><blockquote><p>启动</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>关闭，关闭之前会处理完已经连接的用户的请求(HTTP，其他请求都会直接ban)</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>不优雅的关闭 会立刻关闭和所有用户的连接</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>平滑的重启</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>检查自己的配置文件是否有误</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-t</span>
<span class="token comment"># 如果有错误的话，会打印出来 没有错误的话 会打印success之类的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>启动的时候指定配置文件的路径</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-c</span> /abc/aaa/aaa/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="nginx-日志切割" tabindex="-1"><a class="header-anchor" href="#nginx-日志切割" aria-hidden="true">#</a> Nginx-日志切割</h2><p>我们在使用nginx的时候，日志默认是保存在一个文件夹内的，这样日积月累起来，之后查看日志会非常的不方便，并且也不易维护</p><h3 id="手动" tabindex="-1"><a class="header-anchor" href="#手动" aria-hidden="true">#</a> 手动</h3><p>创建一个sh脚本，<code>logback.sh</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 指定日志和切割后日志备份的目录</span>
<span class="token assign-left variable">YEAR</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y<span class="token variable">)</span></span>
<span class="token assign-left variable">MONTH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%m<span class="token variable">)</span></span>
<span class="token assign-left variable">DAY</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%d<span class="token variable">)</span></span>
<span class="token assign-left variable">YESTERDAY</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +%Y-%m-%d<span class="token variable">)</span></span>
<span class="token comment"># 这里第一个填写你的nginx日志路径</span>
<span class="token assign-left variable">LOGS_PATH</span><span class="token operator">=</span>/var/log/nginx
<span class="token comment"># 这里填写想把日志存放在那个路径</span>
<span class="token assign-left variable">LOGS_BAK_PATH</span><span class="token operator">=</span>/var/log/nginx/back

<span class="token comment"># 得到1级目录名</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$((</span>$DAY<span class="token variable">))</span></span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token keyword">then</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$((</span>$MONTH<span class="token variable">))</span></span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
      <span class="token keyword">then</span>
        <span class="token assign-left variable">LOGS_BAK_PATH</span><span class="token operator">=</span><span class="token variable">$LOGS_BAK_PATH</span>/<span class="token variable"><span class="token variable">$((</span>\${YEAR}<span class="token operator">-</span><span class="token number">1</span><span class="token variable">))</span></span>-12
    <span class="token keyword">else</span>
      <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$((</span>$MONTH<span class="token variable">))</span></span> <span class="token parameter variable">-gt</span> <span class="token number">10</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
        <span class="token keyword">then</span>
          <span class="token assign-left variable">LOGS_BAK_PATH</span><span class="token operator">=</span><span class="token variable">$LOGS_BAK_PATH</span>/<span class="token variable">\${YEAR}</span>-<span class="token variable"><span class="token variable">$((</span>\${MONTH}<span class="token operator">-</span><span class="token number">1</span><span class="token variable">))</span></span>
      <span class="token keyword">else</span>
          <span class="token assign-left variable">LOGS_BAK_PATH</span><span class="token operator">=</span><span class="token variable">$LOGS_BAK_PATH</span>/<span class="token variable">\${YEAR}</span>-0<span class="token variable"><span class="token variable">$((</span>\${MONTH}<span class="token operator">-</span><span class="token number">1</span><span class="token variable">))</span></span>
      <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
<span class="token keyword">else</span>
    <span class="token assign-left variable">LOGS_BAK_PATH</span><span class="token operator">=</span><span class="token variable">$LOGS_BAK_PATH</span>/<span class="token variable">\${YEAR}</span>-<span class="token variable">\${MONTH}</span>
<span class="token keyword">fi</span>

<span class="token comment"># 创建目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$LOGS_BAK_PATH</span>/<span class="token variable">\${YESTERDAY}</span>

<span class="token comment"># 复制当前的日志文件到备份的目录</span>
<span class="token function">cp</span> <span class="token variable">\${LOGS_PATH}</span>/access.log <span class="token variable">\${LOGS_BAK_PATH}</span>/<span class="token variable">\${YESTERDAY}</span>/access_<span class="token variable">\${YESTERDAY}</span>.log
<span class="token function">cp</span> <span class="token variable">\${LOGS_PATH}</span>/admin_access.log <span class="token variable">\${LOGS_BAK_PATH}</span>/<span class="token variable">\${YESTERDAY}</span>/admin_access_<span class="token variable">\${YESTERDAY}</span>.log
<span class="token function">cp</span> <span class="token variable">\${LOGS_PATH}</span>/error.log <span class="token variable">\${LOGS_BAK_PATH}</span>/<span class="token variable">\${YESTERDAY}</span>/error_<span class="token variable">\${YESTERDAY}</span>.log

<span class="token comment"># 清空日志</span>
<span class="token operator">&gt;</span> <span class="token variable">\${LOGS_PATH}</span>/access.log
<span class="token operator">&gt;</span> <span class="token variable">\${LOGS_PATH}</span>/admin_access.log
<span class="token operator">&gt;</span> <span class="token variable">\${LOGS_PATH}</span>/error.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后把这个玩意添加下可执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x loback.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后执行即可</p><h3 id="定时" tabindex="-1"><a class="header-anchor" href="#定时" aria-hidden="true">#</a> 定时</h3><p>编辑下文件<code>vi /etc/crontab</code></p><p>添加定时任务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 每天0:00执行该脚本</span>
<span class="token number">0</span> <span class="token number">0</span> * * * root <span class="token function">bash</span> /opt/sh/logback.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>重启crontab</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart crond
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>至于docker的话…以后遇上了再查吧 打个TODO</p><h2 id="配置静态资源访问" tabindex="-1"><a class="header-anchor" href="#配置静态资源访问" aria-hidden="true">#</a> 配置静态资源访问</h2><h3 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置" aria-hidden="true">#</a> 基本配置</h3><p>在server里面配置下即可</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>    <span class="token number">90</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    
    <span class="token comment"># 根路径 这个没必要多说啥</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token comment"># 这里配置绝对路径即可</span>
        <span class="token directive"><span class="token keyword">root</span> /home/project/xxxxproject</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment"># 下面这里额外说明 这里如果请求 http://ip:port/images/abc.jpg</span>
    <span class="token comment"># 访问的是 /home/project/images里面的内容 也就是</span>
    <span class="token comment"># 			/home/project/images/abc.jpg</span>
   	<span class="token comment"># 在举个例子，例如访问的是 ip:port/images/video/1.mp4</span>
    <span class="token comment"># 则对应的本地文件为： /home/project/images/video/1.mp4</span>
    <span class="token comment"># 在使用这种方式匹配的时候，必须得确保，这个/images必须是在/home/project内的，不然匹配不到</span>
    <span class="token directive"><span class="token keyword">location</span> /images</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /home/project</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment"># 当然 上面这样做的话，我们就必须确保images在project文件夹内</span>
    <span class="token comment">#那么是否可以给他起个别名呢？</span>
    <span class="token comment"># 例如访问 /abc 则为 /home/project/images,则可以通过另一种形式来进行配置</span>
    
    <span class="token comment"># 当用户访问/static之后，所有的内容都会在/home/project这个路径之后去找</span>
    <span class="token comment"># 例如访问 /static/1.jpg 则等同于访问 /home/project/1.jpg</span>
    <span class="token directive"><span class="token keyword">location</span> /static</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">alias</span> /home/project</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存并重启即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="gzip的压缩配置" tabindex="-1"><a class="header-anchor" href="#gzip的压缩配置" aria-hidden="true">#</a> Gzip的压缩配置</h2>`,165),f={href:"https://blog.csdn.net/jessonlv/article/details/8016284",target:"_blank",rel:"noopener noreferrer"},$=i(`<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>

    <span class="token comment"># 是否开启gzip压缩</span>
    <span class="token directive"><span class="token keyword">gzip</span>  <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># 限制最小压缩 下面这样小于1024个字节(1kb)的文件就不会压缩了</span>
    <span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">1024</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># 这个是设置压缩比例（级别）值越大，压缩比例也就越大，最终产生的文件理论上来说就越小</span>
    <span class="token comment"># 当然 设置的太大的话会额外占用CPU，一般设置为3~5左右就差不多了</span>
    <span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">3</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># 要对哪些类型进行压缩 用空格进行分割 通常来说网站上可能有啥内容有填啥内容</span>
    <span class="token directive"><span class="token keyword">gzip_types</span>  text/plain application/x-javascript text/css text/html application/xml</span><span class="token punctuation">;</span>
    
    <span class="token comment"># 识别http的协议版本。由于早期的一些浏览器或者http客户端，可能不支持gzip自解压，用户就会看到乱码，所以做一些判断还是有必要的。</span>
    <span class="token comment"># 注：21世纪都来了，现在除了类似于百度的蜘蛛之类的东西不支持自解压（百度就是SX，我就不说了），99.99%的浏览器基本上都支持gzip解压了</span>
    <span class="token comment"># 默认是1.1 一般不动</span>
    <span class="token directive"><span class="token keyword">gzip_http_version</span> 1.1</span><span class="token punctuation">;</span>
    
    <span class="token comment">#这个下面说</span>
    <span class="token directive"><span class="token keyword">gzip_proxied</span> any</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>gzip_proxied</p></blockquote><p>Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果，匹配的前提是后端服务器必须要返回包含&quot;Via&quot;的 header头。</p><ul><li>off - 关闭所有的代理结果数据的压缩</li><li>expired - 启用压缩，如果header头中包含 &quot;Expires&quot; 头信息</li><li>no-cache - 启用压缩，如果header头中包含 &quot;Cache-Control:no-cache&quot; 头信息</li><li>no-store - 启用压缩，如果header头中包含 &quot;Cache-Control:no-store&quot; 头信息</li><li>private - 启用压缩，如果header头中包含 &quot;Cache-Control:private&quot; 头信息</li><li>no_last_modified - 启用压缩,如果header头中不包含 &quot;Last-Modified&quot; 头信息</li><li>no_etag - 启用压缩 ,如果header头中不包含 &quot;ETag&quot; 头信息</li><li>auth - 启用压缩 , 如果header头中包含 &quot;Authorization&quot; 头信息</li><li>any - 无条件启用压缩</li></ul><h2 id="location匹配规则说明" tabindex="-1"><a class="header-anchor" href="#location匹配规则说明" aria-hidden="true">#</a> Location匹配规则说明</h2><h3 id="规则一览" tabindex="-1"><a class="header-anchor" href="#规则一览" aria-hidden="true">#</a> 规则一览</h3><figure><img src="`+p+`" alt="image-20220120174953645" tabindex="0" loading="lazy"><figcaption>image-20220120174953645</figcaption></figure><h3 id="普通匹配" tabindex="-1"><a class="header-anchor" href="#普通匹配" aria-hidden="true">#</a> 普通匹配</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token comment">#.....</span>
    
    <span class="token comment"># 这样就是普通匹配，你访问斜杠相当于访问/home/project</span>
    <span class="token comment"># 访问斜杆中的内容，就相当于访问/home/project中的资源</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        root   /home/project；
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="精准匹配" tabindex="-1"><a class="header-anchor" href="#精准匹配" aria-hidden="true">#</a> 精准匹配</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token comment">#.....</span>
    
    <span class="token comment"># 精准匹配 只有请求路径完全符合我们的规则（规则必须设定为固定的内容）</span>
    <span class="token comment"># 如下所示，我只有访问/static/img/face1.png</span>
    <span class="token comment"># 才等同于访问 /home/project/img/face1.png</span>
    <span class="token comment"># 如果我访问  /static/img/face2.png 那么这里因为没有注册过对应的location，所以是访问不了的</span>
    <span class="token directive"><span class="token keyword">location</span> = /static/img/face1.png</span> <span class="token punctuation">{</span>
        root   /home/project；
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="正则表达式匹配" tabindex="-1"><a class="header-anchor" href="#正则表达式匹配" aria-hidden="true">#</a> 正则表达式匹配</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token comment">#.....</span>
    
    <span class="token comment"># 正则表达式匹配以 ~ 波浪号开头</span>
    <span class="token comment"># 正则表达式，*号代表不区分大小写的来进行匹配</span>
    
    <span class="token comment"># 下面这样 例如我的/home/static文件夹下有一个 aaa.jpg</span>
    <span class="token comment"># 则我可以通过 /static/AAA.jpg 可以访问到</span>
 	
    <span class="token comment"># 如果你把下面这个*号去掉，则不支持不区分大小写来进行访问</span>
    <span class="token directive"><span class="token keyword">location</span> ~* \\.(gif|jpg|bmp|png|jpeg)</span> <span class="token punctuation">{</span>
        root   /home；
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),T={href:"https://www.cnblogs.com/whm-blog/p/13273503.html",target:"_blank",rel:"noopener noreferrer"},A=i(`<h3 id="限制以某个字符路径开头请求-指定路径匹配" tabindex="-1"><a class="header-anchor" href="#限制以某个字符路径开头请求-指定路径匹配" aria-hidden="true">#</a> 限制以某个字符路径开头请求（指定路径匹配）</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token comment">#.....</span>
    
    <span class="token comment"># 这里相当于是</span>
    <span class="token comment"># 必须得请求 /static/img才能匹配到 /home/static/img下的资源</span>
    <span class="token comment"># 如果说想请求 static下img文件夹之外的资源会被拒绝</span>
    <span class="token comment"># 相当于是必须得完全匹配我们制定的路径</span>
    <span class="token directive"><span class="token keyword">location</span> ^~ /static/img</span> <span class="token punctuation">{</span>
        root   /home；
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置cors跨域" tabindex="-1"><a class="header-anchor" href="#配置cors跨域" aria-hidden="true">#</a> 配置Cors跨域</h2>`,3),S={href:"https://blog.csdn.net/yujia_666/article/details/108490178",target:"_blank",rel:"noopener noreferrer"},E=i(`<p>正常来说，只要把下面的东西复制粘贴即可 不用深究</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>

    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span>       [::]:80</span> <span class="token punctuation">;</span>

	<span class="token comment"># 反正这样配置就得了...具体原理不用太在意，可以单独放在location里面</span>
    
    <span class="token comment"># 允许跨域的请求，*代表所有</span>
    <span class="token directive"><span class="token keyword">add_header</span> Access-Control-Allow-Origin *</span><span class="token punctuation">;</span>
    
    <span class="token comment"># 允许带上cookie请求</span>
    <span class="token directive"><span class="token keyword">add_header</span> Access-Control-Allow-Credentials <span class="token string">&#39;true&#39;</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># 运行请求的方法，逗号分隔，例如这样写 ： &#39;GET,POST,OPTIONS,PUT,DELETE&#39;</span>
    <span class="token comment"># 也可以直接用通配符进行啥请求都运行跨域</span>
    <span class="token directive"><span class="token keyword">add_header</span> Access-Control-Allow-Methods <span class="token string">&#39;*&#39;</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># 运行请求的header， 下面也可以用通配符进行替换</span>
    <span class="token directive"><span class="token keyword">add_header</span> Access-Control-Allow-Headers <span class="token string">&#39;DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization&#39;</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>  
        <span class="token directive"><span class="token keyword">root</span> /home</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置防盗链" tabindex="-1"><a class="header-anchor" href="#配置防盗链" aria-hidden="true">#</a> 配置防盗链</h2>`,3),N={href:"https://www.cnblogs.com/imcati/p/11743922.html",target:"_blank",rel:"noopener noreferrer"},P=i(`<p>简单来说，就是防止我们网站上的资源，被其他网站之类的拿去用了</p><p>防止第三方引用链接访问我们的图片，消耗服务器资源和网络流量，我们可以在服务器上做防盗链限制。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>

    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span>       [::]:80</span> <span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> www.myserver.com</span><span class="token punctuation">;</span>
    
    <span class="token comment"># 对于源站点进行验证</span>
    <span class="token directive"><span class="token keyword">valid_refers</span> *.myserver.com</span><span class="token punctuation">;</span>
    
    <span class="token comment"># 如果请求不是来自上方的站点，则下方判断条件为真</span>
    <span class="token directive"><span class="token keyword">if($invalid_referer)</span></span><span class="token punctuation">{</span>
        // 返回404页面
        <span class="token directive"><span class="token keyword">return</span> <span class="token number">404</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>  
        <span class="token directive"><span class="token keyword">root</span> /home</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然 也可以选择另一种配置方式</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    
   <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    
   <span class="token directive"><span class="token keyword">server_name</span> www.imcati.com refer-test.imcati.com</span><span class="token punctuation">;</span>
    
   <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span>
    
    
   <span class="token directive"><span class="token keyword">location</span> ~*\\.(gif|jpg|jpeg|png|bmp|swf)$</span> <span class="token punctuation">{</span>
        
        <span class="token directive"><span class="token keyword">valid_referers</span> none blocked www.imcati.com</span><span class="token punctuation">;</span>
        
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$invalid_referer</span>)</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
           <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

<span class="token comment">#valid_referers: 指定资源访问是通过以下几种方式为合法，即白名单。</span>
<span class="token comment">#none：允许缺失的头部访问。</span>
<span class="token comment">#blocked：允许referer没有对应值的请求。</span>
<span class="token comment">#server_names：若referer站点域名与server_name中本机配的域名一样允许访问。</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx的模块化体系" tabindex="-1"><a class="header-anchor" href="#nginx的模块化体系" aria-hidden="true">#</a> Nginx的模块化体系</h2><figure><img src="`+r+`" alt="image-20220120183653791" tabindex="0" loading="lazy"><figcaption>image-20220120183653791</figcaption></figure><ul><li>nginx core：核心模块，底层的通信协议之类的，并且给其他模块之类的提供了运行时的环境</li><li>http 核心模块的副本</li><li>mail 邮件相关</li><li>event module 事件模块，在操作系统层面的处理机制</li><li>phase handler 用于处理客户端的一些请求，并负责响应内容的响应</li><li>output file过滤器，过滤掉一部分的内容（例如gzip就属于它），把内容再返回到浏览器</li><li>upstream 反向代理模块，会把真正的请求转发到真正的服务器里去响应真实的内容</li><li>load balancer 负载均衡 可以实现集群之类的配置 以及实现了一些负载均衡的算法</li><li>extend module 继承模块，如果要使用第三方的模块，就会使用到它</li></ul><h2 id="负载均衡反向代理的搭建" tabindex="-1"><a class="header-anchor" href="#负载均衡反向代理的搭建" aria-hidden="true">#</a> 负载均衡反向代理的搭建</h2><h3 id="基本搭建-带有真实ip转发" tabindex="-1"><a class="header-anchor" href="#基本搭建-带有真实ip转发" aria-hidden="true">#</a> 基本搭建-带有真实ip转发</h3><p>例如三个tomcat，分别是8001 8002 8003</p><p>使用的话这样即可</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>

    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span>       [::]:80</span> <span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">upstream</span> myserver</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8081</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8082</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8083</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
	
    <span class="token comment"># 下面这里是在将请求发送给服务器的时候，将客户端的真实ip信息之类的也一并转发过去</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
    <span class="token comment"># 这个和</span>
    
    
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://myserver</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然你的upstream也可以放在它的外面--也就是http里面（一般来说都是放到http里面）</p><p>那个proxy看情况，也能放在外面</p><p>默认的负载均衡是轮循机制</p><p>如果要改成按照权重的话</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 监听的端口号</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> [::]:80</span> <span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">upstream</span> myserver</span> <span class="token punctuation">{</span>
        <span class="token comment"># 通过weight来设置权重 weight默认全都是1</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8081 weight=1</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8082 weight=3</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8083 weight=5</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://myserver</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

       
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="upstream的参数" tabindex="-1"><a class="header-anchor" href="#upstream的参数" aria-hidden="true">#</a> upstream的参数</h3><blockquote><p>针对单个链接</p></blockquote><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> myserver</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> localhost:8081 weight=1 max_conns=2</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> localhost:8082 weight=3 slow_start=60s</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> localhost:8083 weight=5 down</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> localhost:8084 weight=7 backup</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> localhost:8085 weight=9 max_fails=2 fail_timeout=15s</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>max_conns：设置这个机子的最大同时连接数（默认是0，没有上限，不是QPS，类似于线程），注意 如果说设置了线程数量并且大于1的话，则计算规则为：这里设置的值*线程数量，如果超过了这个数量的话，就返回502</p></li><li><p>slow_start：就像是那啥sentinel的预热一样，不让请求一次性冲跨服务器</p><ul><li>参数是时间如果说设置了这个项，则必须要配合上weight来配合使用，最少要配合两个或者两个以上的服务器(server)才能配合这玩意来使用</li><li>上方案例中配置的是60秒钟之内，权重会慢慢的从0提升到3</li></ul></li><li><p>down：标识这台服务器是不可用的（也就是说会排除在负载均衡之外，无论用户咋样都访问不到），可以用于预防某些特殊情况</p></li><li><p>backup：标识这台服务器是一个备用机，当其他的服务都是可访问的状态的时候，访问不到这台，其他服务器挂掉了之后，才能被用户访问到</p></li><li><p>max_files和fail_timeout：这个就是熔断</p><ul><li>max_files设置错误次数</li><li>fail_timeout设置时间</li><li>当在fail_timeout的指定时间内，错误次数达到了max_files次数之后，nginx将不会将请求发送到这台服务器上，时间为fail_timeout设定的时间</li><li>例如 次数我设置成了2次，时间我设置成了15秒，则在15秒内，错误次数达到了两次，则nginx将会从第二次错误开始计数，15秒内将不会有任何连接到达这台服务器</li></ul></li></ul><h3 id="keepalive" tabindex="-1"><a class="header-anchor" href="#keepalive" aria-hidden="true">#</a> Keepalive</h3><p>keepalive，保持和服务器的长连接数量</p><p>嘛大意就是，保持跟服务的连接，减少频繁断开的次数，提高吞吐量，固定的设置方式</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 监听的端口号</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span> [::]:80</span> <span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">upstream</span> myserver</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8081</span> <span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8082</span> <span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> localhost:8083</span><span class="token punctuation">;</span>
        <span class="token comment"># 1. 设置长连接是数量，</span>
        <span class="token directive"><span class="token keyword">keepalive</span> <span class="token number">32</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://myserver</span><span class="token punctuation">;</span>
        
        <span class="token comment"># 2. 下面这里也是固定的配置 http要设置成1.1发送给我们的tomcat服务器</span>
        <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Connection <span class="token string">&quot;&quot;</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="负载均衡-ip-hash" tabindex="-1"><a class="header-anchor" href="#负载均衡-ip-hash" aria-hidden="true">#</a> 负载均衡-ip_hash</h3><p>嘛，就是根据用户的ip来动态分配服务器，也就是说当用户第一次连接之后，后面每次连接都是到同一个服务器上</p><figure><img src="`+d+'" alt="image-20220120204553430" tabindex="0" loading="lazy"><figcaption>image-20220120204553430</figcaption></figure><p>算法如下</p><figure><img src="'+u+'" alt="image-20220120204737403" tabindex="0" loading="lazy"><figcaption>image-20220120204737403</figcaption></figure><p>使用如下</p>',32),H=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"# 监听的端口号"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"80")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:80")]),s(),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token comment"},"# 服务名称 可以配置一个ip 或者一个域名"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" localhost")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" myserver")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8081")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8082")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8083")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ip_hash")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://myserver")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),L=n("p",null,"注意 这玩意不能和权重共存",-1),j=n("p",null,"并且要注意一点，如果在使用的时候，有一台服务器down了，不要把他删除，而是要标记为down",-1),I=n("p",null,"官方文档如此说道",-1),O=n("figure",null,[n("img",{src:v,alt:"image-20220120211041639",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20220120211041639")],-1),C=n("h3",{id:"通过访问的uri进行负载均衡",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#通过访问的uri进行负载均衡","aria-hidden":"true"},"#"),s(" 通过访问的URI进行负载均衡")],-1),R=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"# 监听的端口号"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"80")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:80")]),s(),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token comment"},"# 服务名称 可以配置一个ip 或者一个域名"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" localhost")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" myserver")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8081")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8082")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8083")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"hash"),s(),n("span",{class:"token variable"},"$request_uri")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://myserver")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),z=n("p",null,"这个用的比较少…也不太建议使用",-1),M=n("h3",{id:"最少的连接数优先进行负载均衡",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#最少的连接数优先进行负载均衡","aria-hidden":"true"},"#"),s(" 最少的连接数优先进行负载均衡")],-1),G=n("p",null,"如其名，来的请求优先去连接数较少的那个服务",-1),Y=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"# 监听的端口号"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"80")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:80")]),s(),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token comment"},"# 服务名称 可以配置一个ip 或者一个域名"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" localhost")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" myserver")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8081")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8082")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" localhost:8083")]),s(),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"least_conn")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://myserver")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),D=n("h2",{id:"缓存",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#缓存","aria-hidden":"true"},"#"),s(" 缓存")],-1),B=n("h3",{id:"静态资源缓存",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#静态资源缓存","aria-hidden":"true"},"#"),s(" 静态资源缓存")],-1),U=n("p",null,"非常简单 ，两种配置方式",-1),K=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{nginx:"",class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"80")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:80")]),s(),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" localhost")]),n("span",{class:"token punctuation"},";"),s(`



    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /static")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"alias"),s(" /home/imooc")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# 规定时间来进行配置，例如"),s(`
        `),n("span",{class:"token comment"},"#	10s 	就是10秒 "),s(`
        `),n("span",{class:"token comment"},"# 	10m		就是10分钟 "),s(`
        `),n("span",{class:"token comment"},"#	10h		就是10个小时 "),s(`
        `),n("span",{class:"token comment"},"#	10d		就是10天"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"exprires"),s(),n("span",{class:"token number"},"10s")]),n("span",{class:"token punctuation"},";"),s(` 
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /static2")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"alias"),s(" /home/imooc2222")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# 指定过期时间为今天的22点30分，如果用户过了这个时间再来访问的话，就是明天的22点30分"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"exprires"),s(" @22h30m")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token comment"},"# expires -1h; 立刻过期"),s(`
        `),n("span",{class:"token comment"},"# expires epoch; 不让客户端缓存（将过期时间设置为1970年）"),s(`
        `),n("span",{class:"token comment"},"# expires off; 默认的 nginx不缓存内容，让客户端自行处理"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`



`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),X=i('<h3 id="反向代理的缓存" tabindex="-1"><a class="header-anchor" href="#反向代理的缓存" aria-hidden="true">#</a> 反向代理的缓存</h3><p>这个一般比较少配置。。应该</p><figure><img src="'+m+`" alt="image-20220120220118212" tabindex="0" loading="lazy"><figcaption>image-20220120220118212</figcaption></figure><p>这个只针对server的静态资源有效</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>

    <span class="token comment"># 设置缓存保存的目录</span>
    <span class="token comment"># 第一个 设置换成保存的路径</span>
    <span class="token comment"># 第二个 keyzone 设置名字，:5m 设置缓存占用的空间大小(内存)</span>
    <span class="token comment"># 第三个 max_size 设置缓存的文件大小</span>
    <span class="token comment"># 第四个 inactive 缓存清空的时间，也就是每隔多少时间清空一次缓存</span>
    <span class="token comment"># 第五个 use_temp_path 是否开启临时目录 一般都会关掉</span>
    <span class="token directive"><span class="token keyword">proxy_cache_path</span> 
        /usr/local/nginx/upstreamCache
        keys_zone=mycache:5m
        max_size=1g
        inactive=1m
        use_temp_path=off</span>
        <span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token comment"># 监听的端口号</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">listen</span> [::]:80</span> <span class="token punctuation">;</span>

        <span class="token comment"># 服务名称 可以配置一个ip 或者一个域名</span>
        <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">upstream</span> myserver</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">server</span> localhost:8081</span> <span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">server</span> localhost:8082</span> <span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">server</span> localhost:8083</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># 开启并且使用缓存</span>
        <span class="token directive"><span class="token keyword">proxy_cache</span> mycache</span><span class="token punctuation">;</span>
        
        <span class="token comment"># 针对200和304状态码的缓存设置过期时间</span>
        <span class="token directive"><span class="token keyword">proxy_cache_valid</span> <span class="token number">200</span> <span class="token number">304</span> <span class="token number">8h</span></span><span class="token punctuation">;</span>
        
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://myserver</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于https证书的配置" tabindex="-1"><a class="header-anchor" href="#关于https证书的配置" aria-hidden="true">#</a> 关于HTTPS证书的配置</h2><p>因为我目前还没有整域名，所以说没得教程</p>`,7),F={href:"https://blog.csdn.net/weixin_43909881/article/details/105635737",target:"_blank",rel:"noopener noreferrer"},V=i('<h2 id="nginx集群" tabindex="-1"><a class="header-anchor" href="#nginx集群" aria-hidden="true">#</a> Nginx集群</h2><h3 id="keepalived双机主备" tabindex="-1"><a class="header-anchor" href="#keepalived双机主备" aria-hidden="true">#</a> Keepalived双机主备</h3><figure><img src="'+k+'" alt="image-20220120224852192" tabindex="0" loading="lazy"><figcaption>image-20220120224852192</figcaption></figure><p>大概就是这样</p><figure><img src="'+b+'" alt="image-20220120225014639" tabindex="0" loading="lazy"><figcaption>image-20220120225014639</figcaption></figure><p>这里安装我使用docker-compose了</p>',6),Q={href:"https://www.docker.com/products/docker-desktop",target:"_blank",rel:"noopener noreferrer"};function W(J,Z){const e=t("ExternalLinkIcon");return c(),o("div",null,[g,_,x,y,n("p",null,[s("官方变量"),n("a",q,[s("http://nginx.org/en/docs/varindex.html"),a(e)])]),w,n("p",null,[s("更新详细都可以看"),n("a",f,[s("这篇文章"),a(e)])]),$,n("p",null,[s("详细的正则规则可以参考"),n("a",T,[s("这篇文章"),a(e)])]),A,n("p",null,[s("详细的可以看"),n("a",S,[s("这篇文章"),a(e)])]),E,n("p",null,[s("参考文章"),n("a",N,[s("https://www.cnblogs.com/imcati/p/11743922.html"),a(e)])]),P,H,L,j,I,O,C,R,z,M,G,Y,D,B,U,K,X,n("p",null,[s("以后如果用上了可以参照"),n("a",F,[s("这篇博客"),a(e)])]),V,n("p",null,[s("PS：因为懒得上服务器，所以我这里用了"),n("a",Q,[s("Docker Desktop"),a(e)])])])}const en=l(h,[["render",W],["__file","16-Nginx-进阶.html.vue"]]);export{en as default};
