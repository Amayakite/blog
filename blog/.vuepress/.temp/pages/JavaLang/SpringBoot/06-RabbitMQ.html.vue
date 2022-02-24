<template><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>感觉没啥好说的 暂时可以把这个玩意当成另一个Mysql或者Redis来看待，总之 是为了之后的Spring Cloud做铺垫</p>
<p>这里的课程看的是狂神的</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy7a8af1c2-b406-46d9-965e-df81525649cd.png" alt="cardImage" loading="lazy"></p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudyb888e5f0-2c0f-4576-af88-0176abfa7832.png" alt="cardImage2" loading="lazy"></p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211227231239303.png" alt="image-20211227231239303" loading="lazy"></p>
<p>这样说吧</p>
<p>RabbitMq具有接受数据、接受请求、存储数据、发送数据等技术服务</p>
<p>它有消息队列：负责数据的接收、存储和传递，性能远高于我们的Java代码</p>
<p>而消息中间件采用的并不是http协议，而常见的消息中间件协议有：OpenWire、AMQP、MQTT、Kafka，OpenMessage协议。</p>
<blockquote>
<p><strong>面试题：为什么消息中间件不直接使用http协议呢？</strong></p>
<ol>
<li>因为http请求报文头和响应报文头是比较复杂的，包含了cookie，数据的加密解密，状态码，响应码等附加的功能，但是对 于一个消息而言，我们并不需要这么复杂，也没有这个必要性，它其实就是负责数据传递，存储，分发就行，一定要追求的是高性能。尽量简洁，快速。</li>
<li>大部分情况下http大部分都是短链接，在实际的交互过程中，一个请求到响应很有可能会中断，中断以后就不会就行持久化，就会造成请求的丢失。这样就不利于消息中间件的业务场景，因为消息中间件可能是一个长期的获取消息的过程，出现问题和故障要对数据或消息就行持久化等，目的是为了保证消息和数据的高可靠和稳健的运行。</li>
</ol>
</blockquote>
<h3 id="amqp协议" tabindex="-1"><a class="header-anchor" href="#amqp协议" aria-hidden="true">#</a> AMQP协议</h3>
<blockquote>
<p>AMQP：(全称：Advanced Message Queuing Protocol) 是高级消息队列协议。由摩根大通集团联合其他公司共同设计。是一个提供统一消息服务的应用层标准高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计。基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同的开发语言等条件的限制。<strong>Erlang</strong>中的实现有RabbitMQ等。
特性：
1：分布式事务支持。
2：消息的持久化支持。
3：高性能和高可靠的消息处理优势。</p>
</blockquote>
<p>支持这个协议的有</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy1705264a-5917-4bf7-99a8-2ed993b463fa-16406198611524.png" alt="img" loading="lazy"></p>
<p>这个协议是基于Erlang 所以使用它需要安装Erlang 就像使用Java要安装JDK一样</p>
<h3 id="mqtt协议" tabindex="-1"><a class="header-anchor" href="#mqtt协议" aria-hidden="true">#</a> MQTT协议</h3>
<p>MQTT协议：（Message Queueing Telemetry Transport）消息队列是IBM开放的一个即时通讯协议，物联网系统架构中的重要组成部分。
特点：
1：轻量
2：结构简单
3：传输快，不支持事务
4：没有持久化设计。
应用场景：
1：适用于计算能力有限
2：低带宽
3：网络不稳定的场景。
支持者：同AMQP</p>
<h3 id="openmessage协议" tabindex="-1"><a class="header-anchor" href="#openmessage协议" aria-hidden="true">#</a> OpenMessage协议</h3>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy579c94ed-0947-439e-95e7-2ca6b425dc79.png" alt="img" loading="lazy"></p>
<p>是近几年由阿里、雅虎和滴滴出行、Stremalio等公司共同参与创立的分布式消息中间件、流处理等领域的应用开发标准。
特点：
1：结构简单
2：解析速度快
3：支持事务和持久化设计。</p>
<h3 id="kafka协议" tabindex="-1"><a class="header-anchor" href="#kafka协议" aria-hidden="true">#</a> Kafka协议</h3>
<p>Kafka协议是基于TCP/IP的二进制协议。消息内部是通过长度来分割，由一些基本数据类型组成。
特点是：
1：结构简单
2：解析速度快
3：无事务支持
4：有持久化设计</p>
<h3 id="消息分发策略的机制和对比" tabindex="-1"><a class="header-anchor" href="#消息分发策略的机制和对比" aria-hidden="true">#</a> 消息分发策略的机制和对比</h3>
<table>
<thead>
<tr>
<th></th>
<th>ActiveMQ</th>
<th>RabbitMQ</th>
<th>Kafka</th>
<th>RocketMQ</th>
</tr>
</thead>
<tbody>
<tr>
<td>发布订阅</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>轮询分发</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>/</td>
</tr>
<tr>
<td>公平分发</td>
<td>/</td>
<td>支持</td>
<td>支持</td>
<td>/</td>
</tr>
<tr>
<td>重发</td>
<td>支持</td>
<td>支持</td>
<td>/</td>
<td>支持</td>
</tr>
<tr>
<td>消息拉取</td>
<td>/</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
</tr>
</tbody>
</table>
<p>这里看一眼就可以 以后会具体了解</p>
<p>轮询是消息的负载均衡  ,公平是服务器的负载均衡</p>
<h2 id="rabbitmq的入门及安装" tabindex="-1"><a class="header-anchor" href="#rabbitmq的入门及安装" aria-hidden="true">#</a> RabbitMQ的入门及安装</h2>
<p>RabbitMQ是一个开源的遵循AMQP协议实现基于Erlang语言编写支持多种客户端</p>
<p>用于在分布式系统内存储消息、转发消息，且具有高可用、高可扩性、易用性等特征</p>
<p>这玩意Spring的团队也参与了维护 所以和spring家族的兼容性非常好</p>
<p><a href="https://www.rabbitmq.com/" target="_blank" rel="noopener noreferrer">https://www.rabbitmq.com/<ExternalLinkIcon/></a></p>
<p>下载可以看官网说明</p>
<p><a href="https://www.rabbitmq.com/download.html" target="_blank" rel="noopener noreferrer">https://www.rabbitmq.com/download.html<ExternalLinkIcon/></a></p>
<h3 id="普通的安装方式" tabindex="-1"><a class="header-anchor" href="#普通的安装方式" aria-hidden="true">#</a> 普通的安装方式</h3>
<p>要安装它  首先得安装ErLang</p>
<p>这里以ubuntu为例</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> erlang
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接着 将在官网下载的安装包用dpkg命令安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dpkg -i xxx.deb
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start rabbitmq-server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查看状态</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl status rabbitmq-server.service
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接这 如果在avtive中看到了一个绿色的running 表示成功运行</p>
<p>绑定开机启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> rabbitmq-server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>停止</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl stop rabbitmq-server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后RabbitMQ有一个WEB管理界面，默认是未安装的 需要手动安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_management
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>说明 rabbitmq有一个账号默认账号密码是 <code>guest</code> 默认情况下是只能在localhost下访问</p>
<p>所以需要添加一个远程登录的账户</p>
</blockquote>
<p>安装完毕后 重启服务即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart rabbitmq-server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>安装完毕后访问你的<code>ip:15672</code>（注意之前要放行对应的端口）</p>
<p>就可以访问</p>
<p>当然默认你输入guest是访问不了滴</p>
<p>所以需要</p>
<p>新增用户</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmqctl add_user admin 密码
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>前面的是账号后面的是密码</p>
<p>然后分配操作权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmqctl set_user_tags admin administrator
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里说下权限的级别：</p>
<ol>
<li>Administrator 可以登陆控制台、查看所有信息，可以对rabbitmq进行管理</li>
<li>monitoring 监控者 可以登陆控制台、查看所有信息</li>
<li>policymaker 策略定制者 登陆控制台 指定策略</li>
<li>manmgement 普通管理员 登陆控制台</li>
</ol>
<p>上面这四个有的玩意都不一样 反正Administrator是最大的</p>
<p>接下来添加能从什么地方访问</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmqctl set_permissions -p / admin <span class="token string">".*"</span> <span class="token string">".*"</span> <span class="token string">".*"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里是授予这个admin在所有地方访问这个根节点的权限</p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<h3 id="docker的安装方式" tabindex="-1"><a class="header-anchor" href="#docker的安装方式" aria-hidden="true">#</a> docker的安装方式</h3>
<p>先拉取下镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull rabbitmq:management
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接着前台启动下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name  rabbitmq  -p <span class="token number">5672</span>:5672 -p <span class="token number">15672</span>:15672 rabbitmq:management
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接着进入容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it rabbitmq <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后按照正常安装的方式配置用户：</p>
<p>安装RabbitMQ的WEB管理界面</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_management
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>说明 rabbitmq有一个账号默认账号密码是 <code>guest</code> 默认情况下是只能在localhost下访问</p>
<p>所以需要添加一个远程登录的账户</p>
</blockquote>
<p>安装完毕后 重启服务即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart rabbitmq-server
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>安装完毕后访问你的<code>ip:15672</code>（注意之前要放行对应的端口）</p>
<p>就可以访问</p>
<p>当然默认你输入guest是访问不了滴</p>
<p>所以需要</p>
<p>新增用户</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmqctl add_user admin 密码
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>前面的是账号后面的是密码</p>
<p>然后分配操作权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmqctl set_user_tags admin administrator
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里说下权限的级别：</p>
<ol>
<li>Administrator 可以登陆控制台、查看所有信息，可以对rabbitmq进行管理</li>
<li>monitoring 监控者 可以登陆控制台、查看所有信息</li>
<li>policymaker 策略定制者 登陆控制台 指定策略</li>
<li>manmgement 普通管理员 登陆控制台</li>
</ol>
<p>上面这四个有的玩意都不一样 反正Administrator是最大的</p>
<p>接下来添加能从什么地方访问</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmqctl set_permissions -p / admin <span class="token string">".*"</span> <span class="token string">".*"</span> <span class="token string">".*"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里是授予这个admin在所有地方访问这个根节点的权限</p>
<p>然后访问即可</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228163633439.png" alt="image-20211228163633439" loading="lazy"></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<p><strong>访问后一定要在admin标签内删除guest</strong></p>
<h3 id="rabbitmq的角色权限相关说明" tabindex="-1"><a class="header-anchor" href="#rabbitmq的角色权限相关说明" aria-hidden="true">#</a> RabbitMQ的角色权限相关说明</h3>
<ol>
<li>None
<ul>
<li>不能访问management plugin</li>
</ul>
</li>
<li>management：查看自己相关节点信息
<ul>
<li>列出自己可以通过AMQP登入的虚拟机</li>
<li>查看自己的虚拟机节点 virtual hosts的queues,exchanges和bindings信息</li>
<li>查看和关闭自己的channels和connections</li>
<li>查看有关自己的虚拟机节点virtual hosts的统计信息。包括其他用户在这个节点virtual hosts中的活动信息。</li>
</ul>
</li>
<li>Policymaker
<ul>
<li>包含management所有权限</li>
<li>查看和创建和删除自己的virtual hosts所属的policies和parameters信息。</li>
</ul>
</li>
<li>Monitoring
<ul>
<li>包含management所有权限</li>
<li>罗列出所有的virtual hosts，包括不能登录的virtual hosts。</li>
<li>查看其他用户的connections和channels信息</li>
<li>查看节点级别的数据如clustering和memory使用情况</li>
<li>查看所有的virtual hosts的全局统计信息。</li>
</ul>
</li>
<li>Administrator
<ul>
<li>最高权限</li>
<li>可以创建和删除virtual hosts</li>
<li>可以查看，创建和删除users</li>
<li>查看创建permisssions</li>
<li>关闭所有用户的connections</li>
</ul>
</li>
</ol>
<h2 id="rabbitmq入门案例-simple简单模式" tabindex="-1"><a class="header-anchor" href="#rabbitmq入门案例-simple简单模式" aria-hidden="true">#</a> RabbitMQ入门案例-Simple简单模式</h2>
<h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3>
<p>可以在官网看到入门案例<a href="https://www.rabbitmq.com/getstarted.html" target="_blank" rel="noopener noreferrer">https://www.rabbitmq.com/getstarted.html<ExternalLinkIcon/></a></p>
<p>我们这里就先不用springboot了 先用个原生的依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/com.rabbitmq/amqp-client --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.rabbitmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>amqp-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.14.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--下面这两个是标配了 日至相关和lombok--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.slf4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>slf4j-simple<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.7.32<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.18.22<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>接下来先简单使用下</p>
<p>消费者</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">//        1. 创建连接工程</span>
        <span class="token class-name">ConnectionFactory</span> connectionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span><span class="token string">"你服务器的IP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        注意 这里在云上也要开放对应的端口</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token number">5672</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        设置账号密码</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"你的账号"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"你的密码"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        设置虚拟访问节点 在根节点上</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setVirtualHost</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        2. 创建连接Connection</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> connectionFactory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token string">"消费者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        3. 通过连接获取Channel</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span><span class="token string">"queue1"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">DeliverCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">,</span> <span class="token class-name">Delivery</span> message<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"收到消息："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">CancelCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"接收消息失败.."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"开始接受消息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        close</span>
        channel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>生产者</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token comment">//        所有中间件都是基于TCP/IP协议之上构建的新规范，rabbitmq遵循的是amqp</span>
        <span class="token comment">//        ip :port</span>

        <span class="token comment">//        1. 创建连接工程</span>
        <span class="token class-name">ConnectionFactory</span> connectionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span><span class="token string">"你服务器的IP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        注意 这里在云上也要开放对应的端口</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token number">5672</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        设置账号密码</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"你的账号"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"你的密码"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        设置虚拟访问节点 在根节点上</span>
        connectionFactory<span class="token punctuation">.</span><span class="token function">setVirtualHost</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        2. 创建连接Connection</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> connectionFactory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token string">"生产者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        3. 通过连接获取Channel</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        4. 通过创建交换机，声明队列，绑定关系，路由key，发送消息，和接收消息</span>
        <span class="token class-name">String</span> queueName <span class="token operator">=</span> <span class="token string">"queue1"</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>
            <span class="token comment">//                队列名称</span>
            queueName<span class="token punctuation">,</span>
            <span class="token comment">//                是否要持久化 true 的话 会持久化</span>
            <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token comment">//                排他性 是否是一个独占队列</span>
            <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token comment">//                是否会自动删除 随着最后一个消费者消费完消息之后是否要把队列删除</span>
            <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token comment">//                携带一些附加参数</span>
            <span class="token keyword">null</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        4. 准备消息内容</span>
        <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"hello world"</span><span class="token punctuation">;</span>
        <span class="token comment">//        6. 发送消息给队列queue</span>
        channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span>UTF_8<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        7. 关闭连接</span>
        channel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        8. 关闭通道</span>
        connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p>接下来先运行下这个生产者：</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228205739324.png" alt="image-20211228205739324" loading="lazy"></p>
<p>你接着能在这个Queues内看到它</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228205821025.png" alt="image-20211228205821025" loading="lazy"></p>
<p>并且还可以在Channels中看到一个玩意</p>
<p>紧接着我们运行下消费者</p>
<p>成功接收到了刚刚生产者发送的消息</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228210020027.png" alt="image-20211228210020027" loading="lazy"></p>
<p>好了 这就是一次简单AMQP消息传递的流程</p>
<h3 id="什么是amqp" tabindex="-1"><a class="header-anchor" href="#什么是amqp" aria-hidden="true">#</a> 什么是AMQP</h3>
<blockquote>
<p>AMQP的全程：Advanced Message Queuing Protocol（高级消息队列协议）</p>
<p>是应用层协议的一个开发标准，为面向消息的中间件</p>
</blockquote>
<p>它的流程大概是这样</p>
<p>生产者的流程：</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy7c8a41b8-e3bf-4821-a1f1-a18860277663.png" alt="img" loading="lazy"></p>
<p>首先 建立连接</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//        1. 创建连接工程</span>
<span class="token class-name">ConnectionFactory</span> connectionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
connectionFactory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span><span class="token string">"你服务器的IP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        注意 这里在云上也要开放对应的端口</span>
connectionFactory<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token number">5672</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        设置账号密码</span>
connectionFactory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"你的账号"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
connectionFactory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"你的密码"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        设置虚拟访问节点 在根节点上</span>
connectionFactory<span class="token punctuation">.</span><span class="token function">setVirtualHost</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        2. 创建连接Connection</span>
<span class="token class-name">Connection</span> connection <span class="token operator">=</span> connectionFactory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token string">"生产者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>接下来开启通道 发送消息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//        3. 通过连接获取Channel</span>
<span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        4. 通过创建交换机，声明队列，绑定关系，路由key，发送消息，和接收消息</span>
<span class="token class-name">String</span> queueName <span class="token operator">=</span> <span class="token string">"queue1"</span><span class="token punctuation">;</span>
channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>
    <span class="token comment">//                队列名称</span>
    queueName<span class="token punctuation">,</span>
    <span class="token comment">//                是否要持久化 true 的话 会持久化</span>
    <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">//                排他性 是否是一个独占队列</span>
    <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">//                是否会自动删除 随着最后一个消费者消费完消息之后是否要把队列删除</span>
    <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">//                携带一些附加参数</span>
    <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        4. 准备消息内容</span>
<span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"hello world"</span><span class="token punctuation">;</span>
<span class="token comment">//        6. 发送消息给队列queue</span>
channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span>UTF_8<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>RabbitMq为什么是基于通道去处理的，而不是连接呢？</p>
<p>在我们的Redis、Mysql中，存放数据之类的都是通过连接来进行管理</p>
<p>但是在RabbitMq中，貌似最重要的是这个连接</p>
<p>实际上想一想就非常清楚</p>
<p>向我们常用的HTTP协议</p>
<p>每次连接的时候 都需要请求头等一系列参数 这样就会让这个连接变得臃肿 每次连接和被连接都是需要时间的</p>
<p>（尤其是三次握手、四次挥手环节都消耗一定的时间）</p>
<p>而且每次连接又开有关会造成很大的性能开销</p>
<p>所以在AMQP协议中，连接是一个长连接</p>
<p>一个长连接内，包含很多的信道（Channel）---在我们高并发的场景下 这个信道的效率就会非常高</p>
<p>一个连接可能会常见多个信道来处理消息 减少了连接的开销 所以效率非常高</p>
<p>这就有点类似于数据库的连接池----一个连接，多次复用</p>
<p>接下来看看消费者的流转过程：</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy081077ba-eced-43f9-b148-6f63987f1d2f.png" alt="img" loading="lazy"></p>
<p>和我们的生产者差不多 但是 这里的连接也有可能是从同一个连接内出来的</p>
<p>所以我们以后有可能会遇到这样的情况：连接只有一个，但是通道有非常多</p>
<h3 id="rabbitmq的组件和架构" tabindex="-1"><a class="header-anchor" href="#rabbitmq的组件和架构" aria-hidden="true">#</a> RabbitMQ的组件和架构</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span>UTF_8<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>可能你刚刚已经注意到了这个方法</p>
<p>这个方法内接受四个参数</p>
<ol>
<li>交换机地址</li>
<li>队列、路由key</li>
<li>消息的状态控制</li>
<li>消息的内容主题</li>
</ol>
<p>有一道面试题：可以存在没有交换机的队列吗</p>
<p>答：不可能的，虽然我们像上面一样没有指定交换机，但是一定会存在一个默认的<strong>交换机</strong></p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy62a1f9e3-027d-408a-8fb4-a176bd184d23.png" alt="img" loading="lazy"></p>
<ul>
<li>Broker就是我们的RabbitMq 可能同时存在多个Broker（以后集群的话会涉及到），Broker就像是Mysql的database</li>
<li>在Broker内 为了更好的区分和分辨 也整出了一个东西 ---虚拟机节点
<ul>
<li>这个东西就像是电脑的硬盘那样 为了我们更好的区分 分成了类似于 c 、d、e、f盘</li>
<li>在我们的项目中，可能我们的订单要发消息，我们的用户要发消息，我们的其他业务也要发消息，全局堆积在一个根下面的话 其实会很杂乱的，且很庞大的</li>
<li>所以RabbitMq就整了一个虚拟机节点来做隔离，这个东西就相当于是Mysql的table那样</li>
</ul>
</li>
</ul>
<p>我们可以在Rabbit的管理面板中添加额外的节点</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228212755591.png" alt="image-20211228212755591" loading="lazy"></p>
<p>添加完毕后 就能看到</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228212814207.png" alt="image-20211228212814207" loading="lazy"></p>
<p>我们之后就可以在设置访问节点的时候 指定为我们的节点</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>connectionFactory<span class="token punctuation">.</span><span class="token function">setVirtualHost</span><span class="token punctuation">(</span><span class="token string">"/order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接下来总结下：</p>
<blockquote>
<p><strong>Server</strong>：又称Broker ,接受客户端的连接，实现AMQP实体服务。 安装rabbitmq-server
<strong>Connection</strong>：连接，应用程序与Broker的网络连接 TCP/IP/ 三次握手和四次挥手
<strong>Channel</strong>：网络信道，几乎所有的操作都在Channel中进行，Channel是进行消息读写的通道，客户端可以建立对各Channel，每个Channel代表一个会话任务。
<strong>Message</strong> :消息：服务与应用程序之间传送的数据，由Properties和body组成，Properties可是对消息进行修饰，比如消息的优先级，延迟等高级特性，Body则就是消息体的内容。
<strong>Virtual Host</strong> 虚拟地址，用于进行逻辑隔离，最上层的消息路由，一个虚拟主机理由可以有若干个Exhange和Queueu，同一个虚拟主机里面不能有相同名字的Exchange
<strong>Exchange</strong>：交换机，接受消息，根据路由键发送消息到绑定的队列。(<mark>不具备消息存储的能力</mark>)
<strong>Bindings</strong>：Exchange和Queue之间的虚拟连接，binding中可以保护多个routing key.
<strong>Routing key</strong>：是一个路由规则，虚拟机可以用它来确定如何路由一个特定消息。
<strong>Queue</strong>：队列：也成为Message Queue,消息队列，保存消息并将它们转发给消费者。</p>
</blockquote>
<p>然后回到我们的交换机问题</p>
<p>我们首先让生产者再生产一条消息</p>
<p>然后点进这个queue内查看它的详细信息</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228213330143.png" alt="image-20211228213330143" loading="lazy"></p>
<p>查看它的绑定</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228213402643.png" alt="image-20211228213402643" loading="lazy"></p>
<p>可以看到 即使我们没有绑定交换机 它依旧是有一个默认的交换机</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228213436236.png" alt="image-20211228213436236" loading="lazy"></p>
<p>我们也可以直接到这个面板查看所有的交换机</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228213535065.png" alt="image-20211228213535065" loading="lazy"></p>
<p>非常显眼的 Default</p>
<p>接着点进去 看下它的绑定 上面就直接说明了</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228213606264.png" alt="image-20211228213606264" loading="lazy"></p>
<p>默认交换隐式绑定到每个队列，路由键等于队列名称。无法明确绑定到默认交换或从默认交换中解除绑定。它也无法删除。</p>
<p>也就是 这是一个默认的交换机 当我们在开发过程中队列的名字或者路由的名字没有指定我们的交换机</p>
<p>所以在开发当中，我们常常都会去指定交换机</p>
<p>接下来再说说Routing key</p>
<p>路由key</p>
<p>我们目前开发的demo实现的效果是 一个生产者 生产的消息可能由多个消费者收到</p>
<p>但是实际中我们可能只想要固定类型的消费者（例如比较有钱的）收到特定的消息</p>
<p>那怎么辨别呢？</p>
<p>非常简单 就像是让富人出示钱包那样 我们可以让接收者符合一定的条件</p>
<p>例如：<code>where routerkey=XXXX</code></p>
<p>嘛 总体流程大概是这样</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy2704cee9-3595-45de-892d-ee658e848806.png" alt="img" loading="lazy"></p>
<h2 id="图形化操作" tabindex="-1"><a class="header-anchor" href="#图形化操作" aria-hidden="true">#</a> 图形化操作</h2>
<h3 id="使用图形化界面完成helloworld" tabindex="-1"><a class="header-anchor" href="#使用图形化界面完成helloworld" aria-hidden="true">#</a> 使用图形化界面完成HelloWorld</h3>
<p>这就像是那啥一样------我们的最简单的Java Socket那样</p>
<p>一个人发 一个人收</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/python-one.png" alt="img" loading="lazy"></p>
<p>始终要记住的一点：我们无论是否指定交换机 都将有交换机来为我们处理数据 没有指定的时候用的就是默认的default交换机</p>
<p>我们先进入到Queues 可以看到如下内容</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228221743907.png" alt="image-20211228221743907" loading="lazy"></p>
<p>它的发送消息有两种模式</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228221809042.png" alt="image-20211228221809042" loading="lazy"></p>
<p>一种是不持久化（服务宕机或者重启后数据会丢失）另一种则是持久化存储</p>
<p>我们先补到这里发消息，而是去交换机那</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228221849246.png" alt="image-20211228221849246" loading="lazy"></p>
<p>因为我们之前没有指定交换机 所以这里直接进入默认的</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228221933399.png" alt="image-20211228221933399" loading="lazy"></p>
<p>我们可以在队列名称中填入我们的队列queue1</p>
<p>然后消息体来个 Hello RabbitMQ</p>
<p>然后点击发布</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228222014231.png" alt="image-20211228222014231" loading="lazy"></p>
<p>发布成功会有这个提示</p>
<p>TIPS：这一步的时候一定要把之前的 Java接收端程序关了 不然你会发现你这个时候发送的消息在那边自动接收了</p>
<p>下一步我们开始接受</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228222221041.png" alt="image-20211228222221041" loading="lazy"></p>
<p>注意 这里它的模式好几种</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228222253379.png" alt="image-20211228222253379" loading="lazy"></p>
<p>一定要选择第一种 其他的三个都想当于实际接受了数据（会把消息从队列中删除 在生产环境中这可是一个大问题）</p>
<p>接着我们点击获取</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228222344554.png" alt="image-20211228222344554" loading="lazy"></p>
<p>成功获取到了刚刚发送的消息</p>
<p>你在这里可以尝试下第二个 其他的两个就先别去试了 也可以在Queues内尝试发送消息 效果和在队列中是一样的</p>
<h3 id="fanout-生产消费者模式-控制面板实现" tabindex="-1"><a class="header-anchor" href="#fanout-生产消费者模式-控制面板实现" aria-hidden="true">#</a> Fanout-生产消费者模式-控制面板实现</h3>
<p>就是一个消息 可以传递到多个队列中 让多个接收方接收</p>
<p>我们现在管理界面的交换机处创建一个新的交换机</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228222857157.png" alt="image-20211228222857157" loading="lazy"></p>
<p>这个type一定要选择fanout</p>
<p>接下来我们去队列那创建两个队列，分别叫q2和q3吧</p>
<p>这个auto delete就是当最后一个message发送出去的时候是否删除整个队列 我们就保持默认no即可</p>
<p>实际工作中也是no较多</p>
<p>Durability 表示是否持久化 我们这里依旧使用默认的Durability即可 另外一个就是不持久化</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223004267.png" alt="image-20211228223004267" loading="lazy"></p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223014827.png" alt="image-20211228223014827" loading="lazy"></p>
<p>创建完毕后大概这样</p>
<p>接着我们进入到这两个队列中 发现都没有绑定我们指定的交换机 于是可以手动绑定下</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223317469.png" alt="image-20211228223317469" loading="lazy"></p>
<p>绑定完毕后</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223423655.png" alt="image-20211228223423655" loading="lazy"></p>
<p>当然，也可以到交换机处绑定</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223450574.png" alt="image-20211228223450574" loading="lazy"></p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223454946.png" alt="image-20211228223454946" loading="lazy"></p>
<p>接下来我们在交换机中发送消息-但是无需指定接收方</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223706076.png" alt="image-20211228223706076" loading="lazy"></p>
<p>回到队列中 你就会发现这两个家伙都接受到消息了</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223744663.png" alt="image-20211228223744663" loading="lazy"></p>
<p>接下来发布多条试试</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228223813850.png" alt="image-20211228223813850" loading="lazy"></p>
<p>效果依旧</p>
<h3 id="routing模式-路由模式-面板实现" tabindex="-1"><a class="header-anchor" href="#routing模式-路由模式-面板实现" aria-hidden="true">#</a> Routing模式-路由模式-面板实现</h3>
<p>看看模式</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy33427b78-879d-4511-9dd7-42fb33108339.png" alt="img" loading="lazy"></p>
<p>可以看到 这貌似是在发布则模式上增加了亿点点东西完成的</p>
<p>接下来我们创建一个对应的交换机</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228230744821.png" alt="image-20211228230744821" loading="lazy"></p>
<p>注意 type要选择direct_change</p>
<p>接下来我们进入并绑定</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228230942800.png" alt="image-20211228230942800" loading="lazy">、</p>
<p>这里routingkey 取一个自己喜欢的</p>
<p>然后在如法炮制一个q3 收发邮件的</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228231053723.png" alt="image-20211228231053723" loading="lazy"></p>
<p>而且可以给一个队列 分配多个 routing key</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228231208575.png" alt="image-20211228231208575" loading="lazy"></p>
<p>接下来我们可以指定发送的router key</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228231310698.png" alt="image-20211228231310698" loading="lazy"></p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228231325958.png" alt="image-20211228231325958" loading="lazy"></p>
<p>2收到了 3 也收到了</p>
<p>再尝试下course</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228231408936.png" alt="image-20211228231408936" loading="lazy"></p>
<p>只有2收到了</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228231432912.png" alt="image-20211228231432912" loading="lazy"></p>
<h3 id="topic-模糊匹配的面板实现" tabindex="-1"><a class="header-anchor" href="#topic-模糊匹配的面板实现" aria-hidden="true">#</a> Topic-模糊匹配的面板实现</h3>
<p><img src="/images/SpringBoot/06-RabbitMQ/python-five.png" alt="img" loading="lazy"></p>
<p>创建</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228232005779.png" alt="image-20211228232005779" loading="lazy"></p>
<p>注意 type要选择topic</p>
<p>绑定队列</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228232238825.png" alt="image-20211228232238825" loading="lazy"></p>
<p>分别绑定四个</p>
<p>规则是有点类似于正则匹配的</p>
<ul>
<li><code>#</code>：匹配路由键的一个或多个词 或者啥都不传入 可以有多个 0个 一个等</li>
<li><code>*</code>：匹配路由键的<strong>一个词</strong> 就是 <strong>不能为空</strong> 有且只有一个</li>
</ul>
<p>上面这些的实例的话：</p>
<ul>
<li>com.abc.edf 能匹配上第一个</li>
<li><code>.sources.</code>能匹配上第二个</li>
<li>com.source.abc 能匹配上第一个和第二个</li>
<li><code>order</code>能匹配上第三个</li>
<li><code>caadasd.dadasd.adsada.order.sadasd</code>能匹配上第三个</li>
<li><code>user.</code>能匹配上第四个</li>
<li><code>aaddd.user.aadas.dasdas</code>能匹配上第四个</li>
</ul>
<h3 id="header模式-面板实现" tabindex="-1"><a class="header-anchor" href="#header模式-面板实现" aria-hidden="true">#</a> Header模式-面板实现</h3>
<p>先创建一个交换机 选择header模式</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228235852863.png" alt="image-20211228235852863" loading="lazy"></p>
<p>接着依旧是要进入添加队列</p>
<p>但是在添加队列的时候 可以额外指定一些参数</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211228235939199.png" alt="image-20211228235939199" loading="lazy"></p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229000003575.png" alt="image-20211229000003575" loading="lazy"></p>
<p>就相当于 emm  往这里存放参数 需要携带固定的header</p>
<p>并且我们添加参数 也可以直接指定headers的方式来进行添加</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229000040388.png" alt="image-20211229000040388" loading="lazy"></p>
<h2 id="代码实现-1" tabindex="-1"><a class="header-anchor" href="#代码实现-1" aria-hidden="true">#</a> 代码实现</h2>
<h3 id="准备工作-工具类" tabindex="-1"><a class="header-anchor" href="#准备工作-工具类" aria-hidden="true">#</a> 准备工作-工具类</h3>
<p>简单的封装了下固定的操作为工具类使用 close可以有更多的方法来关闭 这里就先这样了</p>
<p>然后是通过resources下的rabbit.properties来进行配置的</p>
<p>实际上可以省略这个properties 自己写死在里面</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">host</span><span class="token punctuation">=</span><span class="token attr-value">你服务器的端口或者127.0.0.1</span>
<span class="token attr-name">port</span><span class="token punctuation">=</span><span class="token attr-value">5672</span>
<span class="token attr-name">username</span><span class="token punctuation">=</span><span class="token attr-value">账号</span>
<span class="token attr-name">password</span><span class="token punctuation">=</span><span class="token attr-value">密码</span>
<span class="token attr-name">virtualHost</span><span class="token punctuation">=</span><span class="token attr-value">/</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>实体类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMQ</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ConnectionFactory</span> CONNECTION_FACTORY<span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        CONNECTION_FACTORY <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            properties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">"rabbit.properties"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            CONNECTION_FACTORY<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span>properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"host"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            CONNECTION_FACTORY<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"port"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            CONNECTION_FACTORY<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span>properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            CONNECTION_FACTORY<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span>properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            CONNECTION_FACTORY<span class="token punctuation">.</span><span class="token function">setVirtualHost</span><span class="token punctuation">(</span>properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"virtualHost"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建连接
     *
     * <span class="token keyword">@param</span> <span class="token parameter">name</span> 连接的名字
     * <span class="token keyword">@return</span> 一个RabbitMQ的连接对象
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IOException</span></span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">TimeoutException</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Connection</span> <span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> CONNECTION_FACTORY<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 关闭连接
     * 因为这玩意可以直接通过channel来获取connection，所以只需要传入一个即可
     *
     * <span class="token keyword">@param</span> <span class="token parameter">channel</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token class-name">Channel</span> channel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>channel <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Connection</span> connection <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                channel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">TimeoutException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><h3 id="fanout-生产消费者模式" tabindex="-1"><a class="header-anchor" href="#fanout-生产消费者模式" aria-hidden="true">#</a> Fanout-生产消费者模式</h3>
<p>首先 我们之前已经创建好了对应的队列</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229131848356.png" alt="image-20211229131848356" loading="lazy"></p>
<p>然后在交换机fanout-exchange中绑定了三个队列</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229131931673.png" alt="image-20211229131931673" loading="lazy"></p>
<p>接着我们来使用生产者生产下消息发送到这三个队列内</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"生产者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        准备消息和交换机</span>
        <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"Hello Fanout"</span><span class="token punctuation">;</span>
        <span class="token comment">//        注意 交换机是我们之前创建好的</span>
        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"fanout-exchange"</span><span class="token punctuation">;</span>
        <span class="token comment">//        路由key 我们这里不需要 所以为空</span>
        <span class="token class-name">String</span> routeKey <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
        <span class="token comment">//        指定交换机的类型</span>
        <span class="token class-name">String</span> type <span class="token operator">=</span> <span class="token string">"fanout"</span><span class="token punctuation">;</span>
        <span class="token comment">//        投递消息</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span>
            <span class="token comment">//                指定交换机</span>
            exchangeName<span class="token punctuation">,</span> 
            <span class="token comment">//                指定route名称 也就是队列名称</span>
            routeKey<span class="token punctuation">,</span> 
            <span class="token comment">//                指定消息的属性 </span>
            <span class="token keyword">null</span><span class="token punctuation">,</span>
            <span class="token comment">//                消息体</span>
            message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消息投递成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//        close</span>
        <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>然后可以在消息列表内看到我们的三个消息</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229132158261.png" alt="image-20211229132158261" loading="lazy"></p>
<p>然后我们使用线程来创建三个消费者</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token class-name">String</span> queueName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//        获取连接</span>
            <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"消费者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//        获取channel</span>
            channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span>
                <span class="token comment">//                    队列的名称</span>
                queueName<span class="token punctuation">,</span>
                <span class="token comment">//                    是否是取出消息</span>
                <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token comment">//                    接收成功的回调</span>
                <span class="token keyword">new</span> <span class="token class-name">DeliverCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">,</span> <span class="token class-name">Delivery</span> message<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收到消息："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token comment">//                    接受失败的回调</span>
                <span class="token keyword">new</span> <span class="token class-name">CancelCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">TimeoutException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>channel <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        开启三个线程模拟并发获取</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"q1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"q2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"q3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><p>接着运行 可以看到 成功接收到了对应的消息</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>消费者在队列q1接收到消息：Hello Fanout
消费者在队列q2接收到消息：Hello Fanout
消费者在队列q3接收到消息：Hello Fanout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>同时队列内的消息也是同步变成0了</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229132449143.png" alt="image-20211229132449143" loading="lazy"></p>
<h3 id="routing-路由模式" tabindex="-1"><a class="header-anchor" href="#routing-路由模式" aria-hidden="true">#</a> Routing-路由模式</h3>
<p>我们现在的route-exchange交换机绑定如下</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229142319931.png" alt="image-20211229142319931" loading="lazy"></p>
<p>接下来使用它给email发送消息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>

        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"生产者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        准备消息和交换机</span>
        <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"Hello Routing"</span><span class="token punctuation">;</span>
<span class="token comment">//        注意 交换机是我们之前创建好的</span>
        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"routing_exchange"</span><span class="token punctuation">;</span>
<span class="token comment">//        路由key</span>
        <span class="token class-name">String</span> routeKey <span class="token operator">=</span> <span class="token string">"email"</span><span class="token punctuation">;</span>
<span class="token comment">//        指定交换机的类型</span>
        <span class="token class-name">String</span> type <span class="token operator">=</span> <span class="token string">"direct"</span><span class="token punctuation">;</span>

<span class="token comment">//        投递消息</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span>
<span class="token comment">//                指定交换机</span>
                exchangeName<span class="token punctuation">,</span>
<span class="token comment">//                指定route名称 也就是队列名称</span>
                routeKey<span class="token punctuation">,</span>
<span class="token comment">//                指定消息的属性</span>
                <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token comment">//                消息体</span>
                message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消息投递成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        close</span>
        <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>接收</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token class-name">String</span> queueName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//        获取连接</span>
            <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"消费者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        获取channel</span>
            channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span>
<span class="token comment">//                    队列的名称</span>
                    queueName<span class="token punctuation">,</span>
<span class="token comment">//                    是否是取出消息</span>
                    <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token comment">//                    接收成功的回调</span>
                    <span class="token keyword">new</span> <span class="token class-name">DeliverCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token annotation punctuation">@Override</span>
                        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">,</span> <span class="token class-name">Delivery</span> message<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收到消息："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">//                    接受失败的回调</span>
                    <span class="token keyword">new</span> <span class="token class-name">CancelCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token annotation punctuation">@Override</span>
                        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">TimeoutException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>channel <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        开启三个线程模拟并发获取</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"q1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                   <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"q2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"q3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><h3 id="topic-模糊匹配" tabindex="-1"><a class="header-anchor" href="#topic-模糊匹配" aria-hidden="true">#</a> Topic-模糊匹配</h3>
<p>交换机如图</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229143147758.png" alt="image-20211229143147758" loading="lazy"></p>
<p>我们现在想让q2和q4收到消息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>

        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"生产者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        准备消息和交换机</span>
        <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"Hello Topic"</span><span class="token punctuation">;</span>
<span class="token comment">//        注意 交换机是我们之前创建好的</span>
        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"topic_exchange"</span><span class="token punctuation">;</span>
<span class="token comment">//        路由key</span>
        <span class="token class-name">String</span> routeKey <span class="token operator">=</span> <span class="token string">"com.abc.order.myfilter"</span><span class="token punctuation">;</span>
<span class="token comment">//        指定交换机的类型</span>
        <span class="token class-name">String</span> type <span class="token operator">=</span> <span class="token string">"topic"</span><span class="token punctuation">;</span>

<span class="token comment">//        投递消息</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span>
<span class="token comment">//                指定交换机</span>
                exchangeName<span class="token punctuation">,</span>
<span class="token comment">//                指定route名称 也就是队列名称</span>
                routeKey<span class="token punctuation">,</span>
<span class="token comment">//                指定消息的属性</span>
                <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token comment">//                消息体</span>
                message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消息投递成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        close</span>
        <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>这样既可 接收的话看之前的代码</p>
<h2 id="通过代码来完成绑定交换机和队列" tabindex="-1"><a class="header-anchor" href="#通过代码来完成绑定交换机和队列" aria-hidden="true">#</a> 通过代码来完成绑定交换机和队列</h2>
<p>通常情况下来说 我们都需要在程序内提前声明好对应的交换机和队列 可以在发送方声明 也可以在接收方声明</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>

        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"生产者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        准备消息和交换机</span>
        <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"Hello driect"</span><span class="token punctuation">;</span>
<span class="token comment">//        创建自己的交换机</span>
        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"direct_message_exchange"</span><span class="token punctuation">;</span>
<span class="token comment">//        指定交换机的类型</span>
        <span class="token class-name">String</span> type <span class="token operator">=</span> <span class="token string">"direct"</span><span class="token punctuation">;</span>

<span class="token comment">//        创建一个交换机 第一个参数名字 第二个参数类型 第三个参数表示是否持久化</span>
        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> type<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        声明队列</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>
<span class="token comment">//                队列名称</span>
                <span class="token string">"f1"</span><span class="token punctuation">,</span>
<span class="token comment">//                是否持久化</span>
                <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token comment">//                是否为独占的队列（只有我们当前这个连接可以用）</span>
                <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">//                是否自动删除</span>
                <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">//                队列需要携带的参数 这个是只有我们在使用header模式才需要用的 可以接收一个Map&lt;String,Object>的参数</span>
                <span class="token keyword">null</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token string">"f2"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span><span class="token string">"f3"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//        绑定队列和交换机的关系</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token string">"f1"</span><span class="token punctuation">,</span> exchangeName<span class="token punctuation">,</span> <span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token string">"f2"</span><span class="token punctuation">,</span> exchangeName<span class="token punctuation">,</span> <span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span><span class="token string">"f3"</span><span class="token punctuation">,</span> exchangeName<span class="token punctuation">,</span> <span class="token string">"course"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">//        路由key</span>
        <span class="token class-name">String</span> routeKey <span class="token operator">=</span> <span class="token string">"order"</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span>
<span class="token comment">//                指定交换机</span>
                exchangeName<span class="token punctuation">,</span>
<span class="token comment">//                指定route名称 也就是队列名称</span>
                routeKey<span class="token punctuation">,</span>
<span class="token comment">//                指定消息的属性</span>
                <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token comment">//                消息体</span>
                message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消息投递成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        close</span>
        <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><p>接下来接收消息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token class-name">String</span> queueName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//        获取连接</span>
            <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"消费者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        获取channel</span>
            channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span>
<span class="token comment">//                    队列的名称</span>
                    queueName<span class="token punctuation">,</span>
<span class="token comment">//                    是否是取出消息</span>
                    <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token comment">//                    接收成功的回调</span>
                    <span class="token keyword">new</span> <span class="token class-name">DeliverCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token annotation punctuation">@Override</span>
                        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">,</span> <span class="token class-name">Delivery</span> message<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收到消息："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">//                    接受失败的回调</span>
                    <span class="token keyword">new</span> <span class="token class-name">CancelCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token annotation punctuation">@Override</span>
                        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"消费者在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">TimeoutException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>channel <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        开启三个线程模拟并发获取</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"f1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"f2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"f3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br></div></div><p>发送多次测试 均只有1.2接收到了消息</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229150022504.png" alt="image-20211229150022504" loading="lazy"></p>
<h2 id="work-工作队列模式" tabindex="-1"><a class="header-anchor" href="#work-工作队列模式" aria-hidden="true">#</a> Work-工作队列模式</h2>
<p>这个模式分为两种</p>
<ul>
<li>轮询模式：一个消费者只能消费一条消息，<strong>按均分配</strong></li>
<li>公平分发模式：根据消费者的能力进行公平分配，处理快的处理的多，反之亦然，按劳分配</li>
</ul>
<p><img src="/images/SpringBoot/06-RabbitMQ/python-two.png" alt="img" loading="lazy"></p>
<h3 id="轮询模式" tabindex="-1"><a class="header-anchor" href="#轮询模式" aria-hidden="true">#</a> 轮询模式</h3>
<p>RabbitMQ默认就是这个模式 比较公平 接下来用代码测试下</p>
<p>发布着 发布十条消息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">String</span> queueName <span class="token operator">=</span> <span class="token string">"queue1"</span><span class="token punctuation">;</span>
<span class="token comment">// 注意要把自动删除设置为false</span>
channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"hello world"</span> <span class="token operator">+</span> i<span class="token punctuation">;</span>
    channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> queueName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span>UTF_8<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>消费者代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> queueName<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"消费者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">long</span> finalTime <span class="token operator">=</span> time<span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span>
                queueName<span class="token punctuation">,</span>
                <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">DeliverCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">,</span> <span class="token class-name">Delivery</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">"在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收到消息："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">try</span> <span class="token punctuation">{</span>
                            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>finalTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token comment">//                    接受失败的回调</span>
                <span class="token keyword">new</span> <span class="token class-name">CancelCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">"在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">TimeoutException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>channel <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        开启三个线程模拟并发获取</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"消费者1"</span><span class="token punctuation">,</span> <span class="token string">"queue1"</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"消费者2"</span><span class="token punctuation">,</span> <span class="token string">"queue1"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><p>接着我们先运行第一次生产者和消费者</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>消费者2在队列queue1接收到消息：hello world1
消费者1在队列queue1接收到消息：hello world2
消费者2在队列queue1接收到消息：hello world3
消费者2在队列queue1接收到消息：hello world5
消费者2在队列queue1接收到消息：hello world7
消费者2在队列queue1接收到消息：hello world9
消费者1在队列queue1接收到消息：hello world4
消费者1在队列queue1接收到消息：hello world6
消费者1在队列queue1接收到消息：hello world8
消费者1在队列queue1接收到消息：hello world10
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>你就能看到 虽然说消费者1比消费者2慢非常多</p>
<p>消费者2 每100毫秒获取一次</p>
<p>消费者2 每1秒获取一次</p>
<p>但是他们那两个最终获取到的东西都是相同的</p>
<p>消费者1 获取到了 1 3 5 7 9</p>
<p>2 获取到了 2 4 6 8 10</p>
<p>这就是轮询模式----无论多少人 始终保持平均分配</p>
<h3 id="公平分发模式" tabindex="-1"><a class="header-anchor" href="#公平分发模式" aria-hidden="true">#</a> 公平分发模式</h3>
<p>公平分发必须改为手动应答，不然怎么知道你啥时候处理完，又怎么能实现能者多劳。因此就需要手动应答了</p>
<p>这里先放代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> queueName<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//        获取连接</span>
            <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"消费者"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        获取channel</span>
            channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 定义常量 方便在内部类中读取</span>
            <span class="token keyword">long</span> finalTime <span class="token operator">=</span> time<span class="token punctuation">;</span>
            <span class="token class-name">Channel</span> finalChannel <span class="token operator">=</span> channel<span class="token punctuation">;</span>
            
<span class="token comment">//            qos代表的就是每次从队列中取出的数据量  这个根据服务器的好坏来决定 例如以后每秒有一千条数据 五台服务器  就可以设置为1000/5/2=100 </span>
<span class="token comment">//            当然 这也只是估算值 建议的话保持1  速率也是非常快的 除非有特殊需求 再设定为指定的数值才是好的</span>
<span class="token comment">//            例如 网站每天要处理海量的数据</span>
            finalChannel<span class="token punctuation">.</span><span class="token function">basicQos</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            channel<span class="token punctuation">.</span><span class="token function">basicConsume</span><span class="token punctuation">(</span>
<span class="token comment">//                    队列的名称</span>
                    queueName<span class="token punctuation">,</span>
<span class="token comment">//                    是否是取出消息 注意 这类要设置为false 取消自动应答 让我们来手动应答消息</span>
                    <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token comment">//                    接收成功的回调</span>
                    <span class="token keyword">new</span> <span class="token class-name">DeliverCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token annotation punctuation">@Override</span>
                        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">,</span> <span class="token class-name">Delivery</span> message<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">"在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收到消息："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>finalTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
<span class="token comment">//                            这里是手动应答消息</span>
                            finalChannel<span class="token punctuation">.</span><span class="token function">basicAck</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getEnvelope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeliveryTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">//                    接受失败的回调</span>
                    <span class="token keyword">new</span> <span class="token class-name">CancelCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token annotation punctuation">@Override</span>
                        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerTag<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">"在队列"</span> <span class="token operator">+</span> queueName <span class="token operator">+</span> <span class="token string">"接收失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">TimeoutException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>channel <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">RabbitMQ</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        开启三个线程模拟并发获取</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"消费者1"</span><span class="token punctuation">,</span> <span class="token string">"queue1"</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>
                <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token function">runPro</span><span class="token punctuation">(</span><span class="token string">"消费者2"</span><span class="token punctuation">,</span> <span class="token string">"queue1"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br></div></div><p>运行结果：能者多劳</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>消费者2在队列queue1接收到消息：hello world1
消费者1在队列queue1接收到消息：hello world2
消费者2在队列queue1接收到消息：hello world3
消费者2在队列queue1接收到消息：hello world5
消费者2在队列queue1接收到消息：hello world7
消费者2在队列queue1接收到消息：hello world9
消费者1在队列queue1接收到消息：hello world4
消费者1在队列queue1接收到消息：hello world6
消费者1在队列queue1接收到消息：hello world8
消费者1在队列queue1接收到消息：hello world10
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="rabbitmq的实际应用场景" tabindex="-1"><a class="header-anchor" href="#rabbitmq的实际应用场景" aria-hidden="true">#</a> RabbitMq的实际应用场景</h2>
<p><a href="https://www.bilibili.com/video/BV1dX4y1V73G?p=26&amp;spm_id_from=pageDriver" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1dX4y1V73G?p=26&amp;spm_id_from=pageDriver<ExternalLinkIcon/></a></p>
<p>这里面的面试部分建议全文背诵</p>
<p>然后这里用一个简单的例子</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy3c16e7cd-e504-497e-a9fc-2260f74e5e51.png" alt="img" loading="lazy"></p>
<p>我们平常如果给用户发一个消息的话，需要三步 并且都需要时间</p>
<p>这时候可以考虑用线程池来解决</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy29bb193d-94fe-41a5-8d53-8e460316a7ba.png" alt="img" loading="lazy"></p>
<p>当然在Java中线程从来不是一个简单的东西…维护之类的极其繁琐，并且耦合性极高</p>
<p>存在问题：
1：耦合度高
2：需要自己写线程池自己维护成本太高
3：出现了消息可能会丢失，需要你自己做消息补偿
4：如何保证消息的可靠性你自己写
5：如果服务器承载不了，你需要自己去写高可用</p>
<p>所以我们就可以用RabbitMQ的异步消息队列模式</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudydfbeb825-015d-4be0-abba-d2dc7084cb84.png" alt="img" loading="lazy"></p>
<p><strong>好处</strong>
1：完全解耦，用MQ建立桥接
2：有独立的线程池和运行模型
3：出现了消息可能会丢失，MQ有持久化功能
4：如何保证消息的可靠性，死信队列和消息转移的等
5：如果服务器承载不了，你需要自己去写高可用，HA镜像模型高可用。
按照以上约定，用户的响应时间相当于是订单信息写入数据库的时间，也就是50毫秒。注册邮件，发送短信写入消息队列后，直接返回，因此写入消息队列的速度很快，基本可以忽略，因此用户的响应时间可能是50毫秒。因此架构改变后，系统的吞吐量提高到每秒20 QPS。比串行提高了3倍，比并行提高了两倍</p>
<p>并且还可以通过它来对整个项目进行解耦合 使维护更加方便</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudya1f53997-b01d-443f-98cd-86a38223fe19.png" alt="img" loading="lazy"></p>
<p>还可以完成非常有效的秒杀队列、流量削峰</p>
<p><img src="https://kuangstudy.oss-cn-beijing.aliyuncs.com/bbs/2021/03/04/kuangstudyf2d1ac21-e710-45dc-a166-6b531c95945f.png" alt="img" loading="lazy"></p>
<p>04、分布式事务的可靠消费和可靠生产
05、索引、缓存、静态化处理的数据同步
06、流量监控
07、日志监控（ELK）
08、下单、订单分发、抢票</p>
<h2 id="springboot整合rabbitmq" tabindex="-1"><a class="header-anchor" href="#springboot整合rabbitmq" aria-hidden="true">#</a> SpringBoot整合RabbitMQ</h2>
<h3 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖" aria-hidden="true">#</a> 添加依赖</h3>
<p>我们先创建一个project</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229170017594.png" alt="image-20211229170017594" loading="lazy"></p>
<p>首先 可以在pom中看到这样一个依赖包</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后依赖有这些</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229170546479.png" alt="image-20211229170546479" loading="lazy"></p>
<p>跟着包我们可以直接进入spring的autoconfiguration中查看</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229170232886.png" alt="image-20211229170232886" loading="lazy"></p>
<p>在autoconfiguration内</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnClass</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token class-name">RabbitTemplate</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">Channel</span><span class="token punctuation">.</span><span class="token keyword">class</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableConfigurationProperties</span><span class="token punctuation">(</span><span class="token class-name">RabbitProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token class-name">RabbitAnnotationDrivenConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">RabbitStreamConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitAutoConfiguration</span> <span class="token punctuation">{</span>
   
    <span class="token comment">// 这里一堆bean</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>绑定的是<code>RabbitProperties</code>这个配置类</p>
<p>接下来看看这个文件中绑定的是哪个配置项</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"spring.rabbitmq"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitProperties</span> <span class="token punctuation">{</span>
    <span class="token comment">// 相关的配置</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>可以得出 我们以后只需要修改spring.rabbitmq中的配置即可</p>
<p>然后还可以看到 里面有一个默认的账号和密码可以给我们使用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">String</span> host <span class="token operator">=</span> <span class="token string">"localhost"</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">Integer</span> port<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token string">"guest"</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> password <span class="token operator">=</span> <span class="token string">"guest"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 你的服务器IP
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> 你的账户名
    <span class="token key atrule">password</span><span class="token punctuation">:</span> 你的密码
    <span class="token key atrule">virtual-host</span><span class="token punctuation">:</span> /
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="fanout模式-生产者" tabindex="-1"><a class="header-anchor" href="#fanout模式-生产者" aria-hidden="true">#</a> Fanout模式-生产者</h3>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy61c5b87b-d787-4d62-9e7c-85e8f26b02f8.png" alt="img" loading="lazy"></p>
<p>开始之前 我们先把所有用不上的交换机和队列之类的都删了（就像是恢复到刚刚装上那样）</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229173328022.png" alt="image-20211229173328022" loading="lazy"></p>
<p>接下来我们先写一个service</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 模拟用户下单
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span>
     * <span class="token keyword">@param</span> <span class="token parameter">productId</span>
     * <span class="token keyword">@param</span> <span class="token parameter">num</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">markOrder</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">,</span> <span class="token class-name">String</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        1 根据商品id查询商品是否充足</span>
        <span class="token comment">//        2 保存订单</span>
        <span class="token class-name">String</span> orderId <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户下单，订单id：{}"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//        3 通过MQ完成消息的分发</span>
        <span class="token comment">//        参数1 交换机</span>
        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"fanout_order_exchange"</span><span class="token punctuation">;</span>
        <span class="token comment">//        参数2 路由key/queue队里名称</span>
        <span class="token class-name">String</span> routingKey <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
        <span class="token comment">//        参数3 消息内容</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span>routingKey<span class="token punctuation">,</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>现在service有了 我们该如何创建交换机和队列以及让他们互相关联呢？</p>
<p>其实非常简单 我们先创建一个RabbitMQ的配置类RabbitMqConfiguration</p>
<p>然后</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMqConfiguration</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 1. 声明fanout模式的交换机
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">FanoutExchange</span> <span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        第二个参数是持久化 第三个是是否自动删除</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FanoutExchange</span><span class="token punctuation">(</span><span class="token string">"fanout_order_exchange"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 2. 声明队列
     * sms.fanout.queue
     * email.fanout.queue
     * duanxin.fanout.queue
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">smsQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        第二个参数：开启持久化</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">"sms.fanout.queue"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">emailQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        第二个参数：开启持久化</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">"email.fanout.queue"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">duanxinQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        第二个参数：开启持久化</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">"duanxin.fanout.queue"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 3. 将队列绑定到交换机
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">smsBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        把指定的队列绑定到指定的交换机上</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">smsQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">emailBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        把指定的队列绑定到指定的交换机上</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">emailQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">duanxinBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        把指定的队列绑定到指定的交换机上</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">duanxinQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div><p>接下来使用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">OrderServiceTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">markOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    orderService<span class="token punctuation">.</span><span class="token function">markOrder</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">,</span><span class="token string">"1"</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Log内成功打印了如下内容 80d0bf04-43ec-4553-8ff9-f1d8957f4d46</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229181417541.png" alt="image-20211229181417541" loading="lazy"></p>
<p>接下来我们看下rabbitmq</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229181448440.png" alt="image-20211229181448440" loading="lazy"></p>
<p>三个队列内都有消息了 现在随便打开一个看看获取到的消息内容</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229181508511.png" alt="image-20211229181508511" loading="lazy"></p>
<p>和我们发送的一模一样</p>
<p>好了，接下来我们该完成消费者的部分</p>
<h3 id="fanout模式-消费者" tabindex="-1"><a class="header-anchor" href="#fanout模式-消费者" aria-hidden="true">#</a> Fanout模式-消费者</h3>
<p>我们先创建一个fanout文件夹，然后依次创建三个类</p>
<ul>
<li><code>@RabbitListener(queues = &quot;duanxin.fanout.queue&quot;)</code>代表要监听的队列</li>
<li><code>@RabbitHandler</code>表示接收到消息执行的回调</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token string">"duanxin.fanout.queue"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span><span class="token punctuation">(</span>topic <span class="token operator">=</span> <span class="token string">"FanoutDuanxinConsumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FanoutDuanxinConsumer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reviseMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"FanoutDuanxinConsumer队列接收到了消息：{}"</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>上面这个是短信的，再创建一个sms和一个email的</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token string">"email.fanout.queue"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span><span class="token punctuation">(</span>topic <span class="token operator">=</span> <span class="token string">"FanoutEmailConsumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FanoutEmailConsumer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"FanoutEmailConsumer接收到消息：{}"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token string">"sms.fanout.queue"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span><span class="token punctuation">(</span>topic <span class="token operator">=</span> <span class="token string">"FanoutSmsConsumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FanoutSmsConsumer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receive</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"FanoutSmsConsumer接收到了消息: {}"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>最终结构如下</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229193954231.png" alt="image-20211229193954231" loading="lazy"></p>
<p>然后我们启动这个application</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229194006577.png" alt="image-20211229194006577" loading="lazy"></p>
<p>启动完毕后是什么都没有的</p>
<p>但是紧接着运行我们之前测试类内的消费者</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229194059678.png" alt="image-20211229194059678" loading="lazy"></p>
<p>得到了订单号763c256b-7c28-40a3-a8ba-460abdebadb3</p>
<p>我们再回到application进程中</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229194120447.png" alt="image-20211229194120447" loading="lazy"></p>
<p>可以看到成功接收到了消息..</p>
<h3 id="routing-direct-模式-路由" tabindex="-1"><a class="header-anchor" href="#routing-direct-模式-路由" aria-hidden="true">#</a> Routing(direct)模式-路由</h3>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy61c5b87b-d787-4d62-9e7c-85e8f26b02f8-16407782199107.png" alt="img" loading="lazy"></p>
<p>应该是这样的</p>
<p>所以我们应该先去定义下对应的交换机和队列的关系 然后再通过交换机投递消息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMqConfiguration</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 1. 声明 Direct模式的交换机
     *   
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DirectExchange</span> <span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        第二个参数是持久化 第三个是是否自动删除</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DirectExchange</span><span class="token punctuation">(</span><span class="token string">"direct_order_exchange"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 2. 声明队列
     * sms.fanout.queue
     * email.fanout.queue
     * duanxin.fanout.queue
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">smsQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        第二个参数：开启持久化  注意明明规范 路由模式要以xxx.direct.xxx命名</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">"sms.direct.queue"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">emailQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        第二个参数：开启持久化</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">"email.direct.queue"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">duanxinQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//        第二个参数：开启持久化</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">"duanxin.direct.queue"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 3. 将队列绑定到交换机 同时指定绑定的路由key
     *    with("xxxx");绑定的同时指定路由key 
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">smsBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">smsQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token string">"sms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">emailBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">emailQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token string">"email"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">duanxinBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">duanxinQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token function">fanoutExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token string">"duanxin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><p>接着在我们的service中添加对应的方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 模拟用户下单
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span>
     * <span class="token keyword">@param</span> <span class="token parameter">productId</span>
     * <span class="token keyword">@param</span> <span class="token parameter">num</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">markOrder</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">,</span> <span class="token class-name">String</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        1 根据商品id查询商品是否充足</span>
<span class="token comment">//        2 保存订单</span>
        <span class="token class-name">String</span> orderId <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户下单，订单id：{}"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        3 通过MQ完成消息的分发</span>
<span class="token comment">//        参数1 交换机</span>
        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"fanout_order_exchange"</span><span class="token punctuation">;</span>
<span class="token comment">//        参数2 路由key/queue队里名称</span>
        <span class="token class-name">String</span> routingKey <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
<span class="token comment">//        参数3 消息内容</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> routingKey<span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 通过Driect(精准匹配，也叫路由)模式完成消息的分发
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span>
     * <span class="token keyword">@param</span> <span class="token parameter">productId</span>
     * <span class="token keyword">@param</span> <span class="token parameter">num</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">makeOrderDirect</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">,</span> <span class="token class-name">String</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        1 根据商品id查询商品是否充足</span>
<span class="token comment">//        2 保存订单</span>
        <span class="token class-name">String</span> orderId <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户下单，订单id：{}"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        3 通过MQ完成消息的分发</span>
<span class="token comment">//        参数1 交换机</span>
        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"direct_order_exchange"</span><span class="token punctuation">;</span>
<span class="token comment">//        参数3 消息内容 第一个参数指定交换机 第二个参数指定路由key 第三个参数指定内容</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> <span class="token string">"sms"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> <span class="token string">"email"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p>消费者和fanout内是一模一样的</p>
<p>接下来我们在测试类中改动下方法的调用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">OrderServiceTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">markOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        orderService<span class="token punctuation">.</span><span class="token function">makeOrderDirect</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>紧接着 因为我们更改了队列名 所以说在监听队列的类中也要做相应的变动</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token string">"duanxin.direct.queue"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span><span class="token punctuation">(</span>topic <span class="token operator">=</span> <span class="token string">"FanoutDuanxinConsumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FanoutDuanxinConsumer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reviseMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"FanoutDuanxinConsumer队列接收到了消息：{}"</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这里就不放另外两个了  按照这个方式改动下即可，当然你也可以为了规范把类名之类的都改成DriectXXXXX</p>
<p>然后先启动主线程，再启动测试类</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229195750062.png" alt="image-20211229195750062" loading="lazy"></p>
<p>我们代码中是制定了向sms和email发送消息</p>
<p>然后发送了c036ba6e-054c-449d-a4c3-12264adbccba</p>
<p>接下来回到application进程 看看效果</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229195828914.png" alt="image-20211229195828914" loading="lazy"></p>
<p>只有email和sms收到了消息</p>
<h4 id="关于交换机和队列的绑定放在生产者还是消费者的问题" tabindex="-1"><a class="header-anchor" href="#关于交换机和队列的绑定放在生产者还是消费者的问题" aria-hidden="true">#</a> 关于交换机和队列的绑定放在生产者还是消费者的问题</h4>
<p>我们实际开发过程中</p>
<p>生产者和消费者可能是分开来的</p>
<p>例如 两个java进程 均不知道是否有对方的存在</p>
<p>这个时候我们的配置文件（交换机和队列绑定的configuration）应该放在谁那里呢？</p>
<p>通常情况下为了排除错误之类 一般两边都会放  但如果是实际生产环境中 有可能是偏向于只放在<strong>消费者那儿</strong></p>
<p>在启动过程中 如果消费者没有找到队列 会直接报错（消费者只和队列打交道）</p>
<h3 id="topic模式-模糊匹配-额外附带注解替换配置类" tabindex="-1"><a class="header-anchor" href="#topic模式-模糊匹配-额外附带注解替换配置类" aria-hidden="true">#</a> TOPIC模式-模糊匹配（额外附带注解替换配置类）</h3>
<p>嘛 之前总是通过配置类来配置太麻烦了 这次用注解吧</p>
<p>其实蛮简单的</p>
<p>但是实际开发中并不推荐这样用 更难维护了..</p>
<p>PS：这个@RabbitListener注解官方是推荐放在方法上 但是大部分都是放在类上 更好辨别</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>
    bindings <span class="token operator">=</span> <span class="token annotation punctuation">@QueueBinding</span><span class="token punctuation">(</span>
        <span class="token comment">// 配置队列 第一个队列名 第二个是否持久化 第三个是否自动删除 md这开发者脑袋有点问题 好好的布尔值不用非要用字符串</span>
        value <span class="token operator">=</span> <span class="token annotation punctuation">@Queue</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"duanxin.topic.queue"</span><span class="token punctuation">,</span> declare <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">,</span> autoDelete <span class="token operator">=</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 配置交换机 第二个参数是交换机的类型 要用ExchangeTypes枚举类指定</span>
        exchange <span class="token operator">=</span> <span class="token annotation punctuation">@Exchange</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"topic_order_exchange"</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">ExchangeTypes</span><span class="token punctuation">.</span>TOPIC<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 这里是配置router key 按照我们之前topic的规则来即可</span>
        key <span class="token operator">=</span> <span class="token string">"#.duanxin.#"</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span><span class="token punctuation">(</span>topic <span class="token operator">=</span> <span class="token string">"TopicDuanxinConsumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TopicDuanxinConsumer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reviseMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"TopicDuanxinConsumer队列接收到了消息：{}"</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>接下来另外两个同理</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>
    bindings <span class="token operator">=</span> <span class="token annotation punctuation">@QueueBinding</span><span class="token punctuation">(</span>
        value <span class="token operator">=</span> <span class="token annotation punctuation">@Queue</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"email.topic.queue"</span><span class="token punctuation">,</span> declare <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">,</span> autoDelete <span class="token operator">=</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        exchange <span class="token operator">=</span> <span class="token annotation punctuation">@Exchange</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"topic_order_exchange"</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">ExchangeTypes</span><span class="token punctuation">.</span>TOPIC<span class="token punctuation">)</span><span class="token punctuation">,</span>
        key <span class="token operator">=</span> <span class="token string">"#.email.#"</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span><span class="token punctuation">(</span>topic <span class="token operator">=</span> <span class="token string">"TopicEmailConsumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TopicEmailConsumer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"TopicEmailConsumer接收到消息：{}"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>
    bindings <span class="token operator">=</span> <span class="token annotation punctuation">@QueueBinding</span><span class="token punctuation">(</span>
        value <span class="token operator">=</span> <span class="token annotation punctuation">@Queue</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"sms.topic.queue"</span><span class="token punctuation">,</span> declare <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">,</span> autoDelete <span class="token operator">=</span> <span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        exchange <span class="token operator">=</span> <span class="token annotation punctuation">@Exchange</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"topic_order_exchange"</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token class-name">ExchangeTypes</span><span class="token punctuation">.</span>TOPIC<span class="token punctuation">)</span><span class="token punctuation">,</span>
        key <span class="token operator">=</span> <span class="token string">"#.sms.#"</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Slf4j</span><span class="token punctuation">(</span>topic <span class="token operator">=</span> <span class="token string">"TopicSmsConsumer"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TopicSmsConsumer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receive</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"TopicSmsConsumer接收到了消息: {}"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>然后我们继续来写一下生产者内的方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">makeOrderTopic</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">,</span> <span class="token class-name">String</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//        1 根据商品id查询商品是否充足</span>
    <span class="token comment">//        2 保存订单</span>
    <span class="token class-name">String</span> orderId <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户下单，订单id：{}"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        3 通过MQ完成消息的分发</span>
    <span class="token comment">//        参数1 交换机</span>
    <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"topic_order_exchange"</span><span class="token punctuation">;</span>
    <span class="token comment">//        参数3 消息内容</span>
    rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> <span class="token string">"com.abcdefg.email.aaa"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>接着先启动消费者的application</p>
<p>然后再到生产者的测试类内调用这个方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">OrderServiceTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">OrderService</span> orderService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">markOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        orderService<span class="token punctuation">.</span><span class="token function">makeOrderTopic</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>结果：</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229203720902.png" alt="image-20211229203720902" loading="lazy"></p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229203726541.png" alt="image-20211229203726541" loading="lazy"></p>
<h2 id="rabbitmq高级开发" tabindex="-1"><a class="header-anchor" href="#rabbitmq高级开发" aria-hidden="true">#</a> RabbitMQ高级开发</h2>
<p>在之前的学习中 我们始终没有说到过在队列中的这些东西</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229204411755.png" alt="image-20211229204411755" loading="lazy"></p>
<p>接下来一个一个的说明</p>
<h3 id="过期时间ttl" tabindex="-1"><a class="header-anchor" href="#过期时间ttl" aria-hidden="true">#</a> 过期时间TTL</h3>
<blockquote>
<p>过期时间TTL表示可以对消息设置预期的时间</p>
<p>在这个时间内都可以被消费者消费获取</p>
<p>过了之后消息将自动删除</p>
<p>RabbitMQ可以对 <strong>消息和队列</strong> 设置TTL 目前有两种方式来设置</p>
<ul>
<li>第一种方式是通过队列属性设置，队列中的所有消息都有相同的过期时间</li>
<li>第二种方式是对消息进行单独设置，每条消息都将可以不同</li>
</ul>
<p>如果上述两种方式同时使用，则过期时间取两者内更短的那个数值</p>
<p>消息队列的消息一旦超过设置的ttl值，就成为dead message 被投递到死信队列</p>
<p>消费者将无法收到该类消息</p>
</blockquote>
<p>我们设置ttl非常简单</p>
<h4 id="给队列设置过期时间" tabindex="-1"><a class="header-anchor" href="#给队列设置过期时间" aria-hidden="true">#</a> 给队列设置过期时间</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMqConfiguration</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 1. 声明fanout模式的交换机
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DirectExchange</span> <span class="token function">ttlDirectExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        第二个参数是持久化 第三个是是否自动删除</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DirectExchange</span><span class="token punctuation">(</span><span class="token string">"ttl_direct_order_exchange"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 2. 声明队列
     * sms.fanout.queue
     * email.fanout.queue
     * duanxin.fanout.queue
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">ttlSmsQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> args <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        设置队列的过期时间 单位是毫秒 这里一定得是一个int类型（整形） 不然会报错</span>
        args<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-message-ttl"</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        第二个参数 是否持久化</span>
<span class="token comment">//        第三个参数 是否是单前连接私有队列</span>
<span class="token comment">//        第四个参数 是否自动删除</span>
<span class="token comment">//        第五个参数 为我们的args-附带额外值</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">"ttl.sms.fanout.queue"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 3. 将队列绑定到交换机 同时指定绑定的路由key
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">smsBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">ttlSmsQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token function">ttlDirectExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span><span class="token string">"sms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><p>绑定任意的交换机都可</p>
<p>接着我们正常写service即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">ttlMakeOrderDirect</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">,</span> <span class="token class-name">String</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//        1 根据商品id查询商品是否充足</span>
    <span class="token comment">//        2 保存订单</span>
    <span class="token class-name">String</span> orderId <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户下单，订单id：{}"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        3 通过MQ完成消息的分发</span>
    <span class="token comment">//        参数1 交换机</span>
    <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"ttl_direct_order_exchange"</span><span class="token punctuation">;</span>
    <span class="token comment">//        参数3 消息内容</span>
    rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> <span class="token string">"sms"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> <span class="token string">"email"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>十秒内访问（我们设置的过期时间是10秒）</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229211750899.png" alt="image-20211229211750899" loading="lazy"></p>
<p>十秒后访问</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229211808038.png" alt="image-20211229211808038" loading="lazy"></p>
<p>并且可以看到上面有一个配置项</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229211847472.png" alt="image-20211229211847472" loading="lazy"></p>
<p>明确的说明了过期时间</p>
<p>并且还能在队列内明确的发现 这是一个带有TTL过期时间的队列</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229211944694.png" alt="image-20211229211944694" loading="lazy"></p>
<p>但是这个过期并非是真正的删除 还有一个死信队列可以来接收过期的队列</p>
<h4 id="给消息设置单独的过期时间" tabindex="-1"><a class="header-anchor" href="#给消息设置单独的过期时间" aria-hidden="true">#</a> 给消息设置单独的过期时间</h4>
<p><strong>无论消息队列是否是ttl的 都可以这样单独的给一条消息设置过期时间 但是实际上并不怎么会用这个方式</strong></p>
<p>如果说队列和消息均有过期时间，则使用更短的那个</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">ttlMakeOrderDirect</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">,</span> <span class="token class-name">String</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        1 根据商品id查询商品是否充足</span>
<span class="token comment">//        2 保存订单</span>
        <span class="token class-name">String</span> orderId <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户下单，订单id：{}"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        3 通过MQ完成消息的分发</span>
<span class="token comment">//        参数1 交换机</span>
        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">"direct_order_exchange"</span><span class="token punctuation">;</span>
<span class="token comment">//        参数3 消息内容</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> <span class="token string">"sms"</span><span class="token punctuation">,</span> orderId<span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">MessagePostProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token class-name">Message</span> <span class="token function">postProcessMessage</span><span class="token punctuation">(</span><span class="token class-name">Message</span> message<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">AmqpException</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 设置过期时间</span>
                        message<span class="token punctuation">.</span><span class="token function">getMessageProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span><span class="token string">"5000"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">// 设置编码</span>
                        message<span class="token punctuation">.</span><span class="token function">getMessageProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">return</span> message<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="死信队列" tabindex="-1"><a class="header-anchor" href="#死信队列" aria-hidden="true">#</a> 死信队列</h3>
<p>当消息在一个队列变成死信后，可以被重新发送到另一个交换机内，这个交换机就是DLX（dead leffet exchange）绑定的DLX就被称之为死信队列</p>
<p>消息变成死信可能是由于如下原因</p>
<ul>
<li>消息被拒绝</li>
<li>消息过期</li>
<li>队列达到最大长度</li>
</ul>
<p>DLX也是一个正常的交换机 和一般的交换机没有区别</p>
<p>它能在任何的队列上被指定</p>
<p>实际上就是设置某一个队列的属性</p>
<p>当这个队列中存在死信时，RabbitMQ会自动的将这个消息重新发布到指定的DLX内，进而路由另一个队列，即死信队列</p>
<p>想要使用死信，只需要再定义列表的时候设置队列参数：<code>x-dead-letter-exchange</code>然后指定交换机即可</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy95eb209a-1bcd-487b-832a-e09d88da3beb.png" alt="img" loading="lazy"></p>
<p>我们这里是这样的</p>
<p>前置步骤 先创建一个交换机 及其对应的队列 命名规范应该为 dead_xxx_xxx，队列同理 应该为 dead.com.xxx.xxx</p>
<p>然后在我们的普通队列中进行如下配置</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">ttlSmsQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> args <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        设置队列的过期时间 单位是毫秒 这里一定得是一个int类型（整形） 不然会报错</span>
    args<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-message-ttl"</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        指定死信队列交换机</span>
    args<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-exchange"</span><span class="token punctuation">,</span> <span class="token string">"dead_direct_exchange"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        设置死信队列的路由key  如果说是fanout模式 则下面不需要配置</span>
    args<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"x-dead-letter-routing-key"</span><span class="token punctuation">,</span> <span class="token string">"sms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//        第二个参数 是否持久化</span>
    <span class="token comment">//        第三个参数 是否是单前连接私有队列</span>
    <span class="token comment">//        第四个参数 是否自动删除</span>
    <span class="token comment">//        第五个参数 为我们的args-附带额外值</span>
    <span class="token comment">//        PS：这里如果之前创建过队列了 需要先删掉 再创建 不会额外自动创建的 而是会报错 但是如果在实际工作中 千万不能直接删除 而是要一步一步的替换掉</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">"ttl.sms.fanout.queue"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>这样即可 这里就不做案例测试了</p>
<p>当然我们还可以设置一个队列的最长值</p>
<p><code>x-max-length</code> 需要传入一个int</p>
<p>当超过限制的长度的时候 新添加的内容将会被转移到死信队列</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy4b80ded8-9524-4986-9485-aad2946124b2.png" alt="img" loading="lazy"></p>
<h2 id="rabbit内存磁盘的监控" tabindex="-1"><a class="header-anchor" href="#rabbit内存磁盘的监控" aria-hidden="true">#</a> Rabbit内存磁盘的监控</h2>
<p>当内存使用超过配置的阈值或者磁盘空间剩余空间对于配置的阈值时，RabbitMQ会暂时阻塞客户端的连接，并且停止接收从客户端发来的消息，以此避免服务器的崩溃，客户端与服务端的心态检测机制也会失效。</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229220308754.png" alt="image-20211229220308754" loading="lazy">如下图：</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/kuangstudy414d826e-5cea-4caa-aba2-92cd30be34f4.png" alt="img" loading="lazy"></p>
<p>当队列出现blocking或blocked话说明到达了阈值和以及高负荷运行了。</p>
<p>然后这里面可以调整内存的分配 具体这里就不说了 可以看这个视频<a href="https://www.bilibili.com/video/BV1dX4y1V73G?p=34&amp;spm_id_from=pageDriver" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1dX4y1V73G?p=34&amp;spm_id_from=pageDriver<ExternalLinkIcon/></a></p>
<p>修改内存的最大大小</p>
<p>修改配置文件<code>/etc/rabbitmq/rabbitmq.conf</code></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment">#默认</span>
<span class="token comment">#vm_memory_high_watermark.relative = 0.4</span>
<span class="token comment"># 使用relative相对值进行设置fraction,建议取值在04~0.7之间，不建议超过0.7.</span>
<span class="token key attr-name">vm_memory_high_watermark.relative</span> <span class="token punctuation">=</span> <span class="token value attr-value">0.6</span>
<span class="token comment"># 使用absolute的绝对值的方式，单位是KB,MB,GB 对应的命令如下</span>
<span class="token key attr-name">vm_memory_high_watermark.absolute</span> <span class="token punctuation">=</span> <span class="token value attr-value">2GB</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>里面的两种方式二选一 ，一般是上面那个百分比的多一些</p>
<p>设置完毕后重启即可</p>
<p>然后就是内存换页</p>
<p>在某个Broker节点及内存阻塞生产者之前，它会尝试将队列中的消息换页到磁盘以释放内存空间，持久化和非持久化的消息都会写入磁盘中，其中持久化的消息本身就在磁盘中有一个副本，所以在转移的过程中持久化的消息会先从内存中清除掉。</p>
<blockquote>
<p>默认情况下，内存到达的阈值是50%时就会换页处理。
也就是说，在默认情况下该内存的阈值是0.4的情况下，当内存超过0.4*0.5=0.2时，会进行换页动作。</p>
</blockquote>
<p>比如有1000MB内存，当内存的使用率达到了400MB,已经达到了极限，但是因为配置的换页内存0.5，这个时候会在达到极限400mb之前，会把内存中的200MB进行转移到磁盘中。从而达到稳健的运行。</p>
<p>可以通过设置 <code>vm_memory_high_watermark_paging_ratio</code> 来进行调整</p>
<p>依旧是在<code>/etc/rabbitmq/rabbitmq.conf</code>内配置</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token key attr-name">vm_memory_high_watermark.relative</span> <span class="token punctuation">=</span> <span class="token value attr-value">0.4</span>
<span class="token key attr-name">vm_memory_high_watermark_paging_ratio</span> <span class="token punctuation">=</span> <span class="token value attr-value">0.7（设置小于1的值）</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>为什么设置小于1，以为你如果你设置为1的阈值。内存都已经达到了极限了。你在去换页意义不是很大了。</p>
<p>然后就是RabbitMQ的磁盘预警</p>
<p>当磁盘的剩余空间低于确定的阈值时，RabbitMQ同样会阻塞生产者，这样可以避免因非持久化的消息持续换页而耗尽磁盘空间导致服务器崩溃。</p>
<blockquote>
<p>默认情况下：磁盘预警为50MB的时候会进行预警。表示当前磁盘空间第50MB的时候会阻塞生产者并且停止内存消息换页到磁盘的过程。
这个阈值可以减小，但是不能完全的消除因磁盘耗尽而导致崩溃的可能性。比如在两次磁盘空间的检查空隙内，第一次检查是：60MB ，第二检查可能就是1MB,就会出现警告。</p>
</blockquote>
<p>通过命令方式修改如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rabbitmqctl set_disk_free_limit  <span class="token operator">&lt;</span>disk_limit<span class="token operator">></span>
rabbitmqctl set_disk_free_limit memory_limit  <span class="token operator">&lt;</span>fraction<span class="token operator">></span>
<span class="token comment"># disk_limit：固定单位 KB MB GB</span>
<span class="token comment"># fraction ：是相对阈值，建议范围在:1.0~2.0之间。（相对于内存）</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>配置文件的话就是</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token key attr-name">disk_free_limit.relative</span> <span class="token punctuation">=</span> <span class="token value attr-value">3.0</span>
<span class="token key attr-name">disk_free_limit.absolute</span> <span class="token punctuation">=</span> <span class="token value attr-value">50mb</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="rabbitmq的集群搭建" tabindex="-1"><a class="header-anchor" href="#rabbitmq的集群搭建" aria-hidden="true">#</a> RabbitMQ的集群搭建</h2>
<h3 id="主从节点" tabindex="-1"><a class="header-anchor" href="#主从节点" aria-hidden="true">#</a> 主从节点</h3>
<p>普通搭建看视频即可<a href="https://www.bilibili.com/video/BV1dX4y1V73G?p=35&amp;spm_id_from=pageDriver" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1dX4y1V73G?p=35&amp;spm_id_from=pageDriver<ExternalLinkIcon/></a></p>
<p>建议是先看一遍视频 再来开始用docker 搭建 会少蛮多坑</p>
<p>我这里使用docker搭建</p>
<p>看的教程是<a href="https://www.cnblogs.com/vipstone/p/9362388.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/vipstone/p/9362388.html<ExternalLinkIcon/></a></p>
<p>先把之前的容器全部删了</p>
<p>然后重新创建三个</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --hostname rabbit1 --name myrabbit1 -p <span class="token number">15672</span>:15672 -p <span class="token number">5672</span>:5672 -e <span class="token assign-left variable">RABBITMQ_ERLANG_COOKIE</span><span class="token operator">=</span><span class="token string">'rabbitcookie'</span> rabbitmq:management

<span class="token function">docker</span> run -d --hostname rabbit2 --name myrabbit2 -p <span class="token number">5673</span>:5672 --link myrabbit1:rabbit1 -e <span class="token assign-left variable">RABBITMQ_ERLANG_COOKIE</span><span class="token operator">=</span><span class="token string">'rabbitcookie'</span> rabbitmq:management

<span class="token function">docker</span> run -d --hostname rabbit3 --name myrabbit3 -p <span class="token number">5674</span>:5672 --link myrabbit1:rabbit1 --link myrabbit2:rabbit2 -e <span class="token assign-left variable">RABBITMQ_ERLANG_COOKIE</span><span class="token operator">=</span><span class="token string">'rabbitcookie'</span> rabbitmq:management
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>接着进入到第一个并执行对应的命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it myrabbit1 <span class="token function">bash</span>
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这里百分之一百会弹出这样一个警告</p>
<p><code>RABBITMQ_ERLANG_COOKIE env variable support is deprecated and will be REMOVED in a future version. Use the $HOME/.erlang.cookie file or the --erlang-cookie switch instead.</code></p>
<p>不用管他</p>
<p>然后进入到第二个 设置集群</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it myrabbit2 <span class="token function">bash</span>
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbit1
rabbitmqctl start_app
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>第三个同理</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it myrabbit3 <span class="token function">bash</span>
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbit1
rabbitmqctl start_app
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>接着我们访问对应的网址 用默认账号 guest 密码guest登陆</p>
<p><img src="/images/SpringBoot/06-RabbitMQ/image-20211229233609159.png" alt="image-20211229233609159" loading="lazy"></p>
<p>可以看到集群搭建好了（记得要在admin处新建你的用户并把guest删掉 不然分分钟变成肉鸡）</p>
<h2 id="镜像集群" tabindex="-1"><a class="header-anchor" href="#镜像集群" aria-hidden="true">#</a> 镜像集群</h2>
<p><a href="https://www.bilibili.com/video/BV1dE411K7MG?p=20" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1dE411K7MG?p=20<ExternalLinkIcon/></a></p>
<p>看看这个视频吧 我目前用不太上 先过了</p>
<h3 id="springboot连接集群" tabindex="-1"><a class="header-anchor" href="#springboot连接集群" aria-hidden="true">#</a> SpringBoot连接集群</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
<span class="token comment">#    host: 你的IP</span>
<span class="token comment">#    port: 端口</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> amayakite
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456789</span>
    <span class="token key atrule">virtual-host</span><span class="token punctuation">:</span> /
    <span class="token key atrule">addresses</span><span class="token punctuation">:</span> 你的IP<span class="token punctuation">:</span>端口

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>之后还有一些高并发 集群相关的 等到学完Spring Cloud再说了</p>
</template>
