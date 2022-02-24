<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>具体的不多说了…反正有这玩意我们无论是学习之后的东西，还是干别的事情，都很方便</p>
<p>别TM以为自己回一个 docker run 就会docker了</p>
<h3 id="docker为什么会出现" tabindex="-1"><a class="header-anchor" href="#docker为什么会出现" aria-hidden="true">#</a> Docker为什么会出现</h3>
<p>一款产品：开发===&gt;上线 两套环境：应用环境，应用配置</p>
<p>我在我的电脑上可以运行，但是因为版本更新之类的，导致服务不可用</p>
<p>配置环境是非常麻烦的一件事情，每个机器都要部署Redis、Mysql之类的环境，直接整非常痛苦</p>
<p>发布一个项目（Jar+Redis、Mysql、Rs）项目都不能带上环境打包</p>
<p>之前配置一个Redis、mysql、Es都比较痛苦了，不能跨平台</p>
<p>传统：开发jar，运维来做这些操作</p>
<p>现在：一个人，从头到尾</p>
<p>Docker给以上的问题，提出了解决方案</p>
<p>就像是app一样</p>
<ul>
<li>APK==》发布==》张三下载apk，安装即可</li>
<li>jar（环境）=<mark>》打包项目带上环境（镜像）</mark>=》发布到（docker仓库、商店）===》下载我们发布的镜像，直接运行即可</li>
</ul>
<p>这样说吧，Docker也可以做集群，也可以做Docker集群（这涉及到的东西蛮多，有专门的东西来着，貌似现在K8S非常牛逼，等我开始工作了之后得取了解下K8s）</p>
<p>docker实质是轻量化的虚拟机(就像是VMware之类的，但是那些玩意非常大，非常痛苦)，创建一个空白虚拟机几秒就可以完成</p>
<p>在几年前，一般说到搭环境，首先想到的就是….虚拟机，奈何电脑不允许，开多一丢丢就非常痛苦了</p>
<p>Docker是基于Golang开发的，依赖于Golang天生的高并发，非常牛逼</p>
<p>Docker<a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>非常的清晰 很容易就能上手使用</p>
<blockquote>
<p>DevOps(开发。运维)</p>
</blockquote>
<p>应用更快速的交付和部署</p>
<p>传统：一堆帮助文档，安装程序</p>
<p>Docker：打包镜像发布测试，一键运行</p>
<p>更便捷的升级和扩容：使用了Docker之后，我们的部署应用就跟搭积木一样</p>
<h3 id="docker的基本组成" tabindex="-1"><a class="header-anchor" href="#docker的基本组成" aria-hidden="true">#</a> Docker的基本组成</h3>
<p><img src="/images/SpringCloud/00-Docker/image-20220104155005672.png" alt="image-20220104155005672" loading="lazy"></p>
<p>大概就是这样 嘛反正非常简单就是了，直到DockerFile之前Docker的操作就是非常简单的</p>
<p>反正Docker就三个东西</p>
<ul>
<li>镜像（Image）
<ul>
<li>Docker镜像就好比是一个模板，可以通过这个模板来创建容器服务（tomcat镜像==&gt;run===&gt;tomcat01容器），可以通过这个镜像创建多个容器</li>
</ul>
</li>
<li>容器（container）
<ul>
<li>Docker利用容器技术，独立运行或一组应用，通过镜像来创建</li>
<li>启动、停止、基本命令</li>
<li>目前就可以把这个容器理解成一个简单的linux系统</li>
</ul>
</li>
<li>仓库（repository）
<ul>
<li>仓库就是存放镜像的地方</li>
<li>仓库分为共有和私有仓库
<ul>
<li>Docker Hub 官方</li>
<li>国内 阿里云之类的都有容器服务器</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="安装和使用docker" tabindex="-1"><a class="header-anchor" href="#安装和使用docker" aria-hidden="true">#</a> 安装和使用Docker</h2>
<h3 id="安装和卸载" tabindex="-1"><a class="header-anchor" href="#安装和卸载" aria-hidden="true">#</a> 安装和卸载</h3>
<p>非常简单 不用管原理</p>
<p>自动安装，二选一，两个都可以安装docker</p>
<p>个人推荐是一键安装</p>
<p>注意 安装之前 要sudo su 获取下root权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -fsSL https://get.docker.com <span class="token operator">|</span> <span class="token function">bash</span> -s <span class="token function">docker</span> --mirror Aliyun
<span class="token comment"># 或者</span>
<span class="token function">curl</span> -sSL https://get.daocloud.io/docker <span class="token operator">|</span> <span class="token function">sh</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>效果都是一样的</p>
<p>如果说之前安装过了，想要卸载的话</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> remove <span class="token function">docker</span> docker-engine docker.io containerd runc
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>手动安装的话，步骤稍微有点复杂</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token punctuation">\</span>
    apt-transport-https <span class="token punctuation">\</span>
    ca-certificates <span class="token punctuation">\</span>
    <span class="token function">curl</span> <span class="token punctuation">\</span>
    gnupg-agent <span class="token punctuation">\</span>
    software-properties-common
<span class="token function">curl</span> -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token function">sudo</span> apt-key fingerprint 0EBFCD88
<span class="token function">sudo</span> add-apt-repository <span class="token punctuation">\</span>
   <span class="token string">"deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/ \
  <span class="token variable"><span class="token variable">$(</span>lsb_release -cs<span class="token variable">)</span></span> \
  stable"</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>测试docker是否安装成功</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> run hello-world
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>出现这样的即可</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104160301590.png" alt="image-20220104160301590" loading="lazy"></p>
<h3 id="更换国内源-可选" tabindex="-1"><a class="header-anchor" href="#更换国内源-可选" aria-hidden="true">#</a> 更换国内源（可选）</h3>
<p>需要sudo权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vi</span> /etc/docker/daemon.json
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>填入如下内容</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"registry-mirrors"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"http://hub-mirror.c.163.com"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>然后重启即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这里可以支持的有</p>
<p>Docker中国官方</p>
<p><code>https://registry.docker-cn.com</code></p>
<p>网易</p>
<p><code>http://hub-mirror.c.163.com</code></p>
<p>中科大</p>
<p><code>https://docker.mirrors.ustc.edu.cn</code></p>
<p>阿里云</p>
<p><code>https://{your_id}.mirror.aliyuncs.com</code></p>
<p>腾讯云</p>
<p><code>https://mirror.ccs.tencentyun.com</code></p>
<p>daocloud</p>
<p><code>http://{your_id}.m.daocloud.io</code></p>
<p>一般来说 用网易的或者阿里或者中科大都可</p>
<p>阿里云申请教程
<a href="https://cr.console.aliyun.com/" target="_blank" rel="noopener noreferrer">https://cr.console.aliyun.com/<ExternalLinkIcon/></a>
点进去之后，有一个镜像工具，点进去之后，有一个镜像加速器，里面有大概类似于这样一个地址</p>
<p><a href="https://1234abcd.mirror.aliyuncs.com" target="_blank" rel="noopener noreferrer">https://1234abcd.mirror.aliyuncs.com<ExternalLinkIcon/></a></p>
<p>我的是<code>https://dvxjv1j7.mirror.aliyuncs.com</code></p>
<h3 id="非root用户使用docker" tabindex="-1"><a class="header-anchor" href="#非root用户使用docker" aria-hidden="true">#</a> 非root用户使用docker</h3>
<p>首先来个root用户 输入如下命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#创建docker用户组 最新版本应该不用这一步了 直接下面的步骤即可</span>
 <span class="token function">sudo</span> <span class="token function">groupadd</span> <span class="token function">docker</span>
 <span class="token comment"># 应用用户加入docker用户组</span>
 <span class="token function">sudo</span> <span class="token function">usermod</span> -aG <span class="token function">docker</span> <span class="token variable">${<span class="token environment constant">USER</span>}</span>
 <span class="token comment"># 重启docker服务</span>
 <span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
 <span class="token comment"># 进入指定的user</span>
 <span class="token function">su</span> - <span class="token variable">${<span class="token environment constant">USER</span>}</span>
 <span class="token comment"># 测试</span>
 <span class="token function">docker</span> run hello-world
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220104163355780.png" alt="image-20220104163355780" loading="lazy"></p>
<h2 id="docker常用命令" tabindex="-1"><a class="header-anchor" href="#docker常用命令" aria-hidden="true">#</a> Docker常用命令</h2>
<h3 id="帮助命令" tabindex="-1"><a class="header-anchor" href="#帮助命令" aria-hidden="true">#</a> 帮助命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> version
<span class="token function">docker</span> info <span class="token comment">#显示docker的系统信息</span>
<span class="token function">docker</span> xxx --help
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>官方文档cli<a href="https://docs.docker.com/engine/reference/run/" target="_blank" rel="noopener noreferrer">命令一览<ExternalLinkIcon/></a></p>
<h3 id="images查看image" tabindex="-1"><a class="header-anchor" href="#images查看image" aria-hidden="true">#</a> images查看image</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> images --help

<span class="token comment">## 结果</span>
Usage:  <span class="token function">docker</span> images <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token punctuation">[</span>REPOSITORY<span class="token punctuation">[</span>:TAG<span class="token punctuation">]</span><span class="token punctuation">]</span>

List images

Options:
  -a, --all             列出所有的镜像
      --digests         Show digests
  -f, --filter filter   Filter output based on conditions provided 过滤的
      --format string   Pretty-print images using a Go template 同上
      --no-trunc        Don't truncate output
  -q, --quiet           只显示镜像的id
 <span class="token comment"># 可以组合使用</span>
 <span class="token function">docker</span> images -aq
 <span class="token comment"># 查看所有已经下载的镜像id</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="search搜索image" tabindex="-1"><a class="header-anchor" href="#search搜索image" aria-hidden="true">#</a> search搜索image</h3>
<p>网上搜索：<a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">https://hub.docker.com/<ExternalLinkIcon/></a>左上搜索，请</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> search --help

<span class="token comment"># 结果</span>
Usage:  <span class="token function">docker</span> search <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token environment constant">TERM</span>

Search the Docker Hub <span class="token keyword">for</span> images

Options:
  -f, --filter filter   Filter output based on conditions provided 过滤
      --format string   Pretty-print search using a Go template 渲染
      --limit int       Max number of search results <span class="token punctuation">(</span>default <span class="token number">25</span><span class="token punctuation">)</span> 分页
      --no-trunc        Don't truncate output
      
 <span class="token comment"># 例子： 搜索start大于3000的mysql镜像</span>
 <span class="token function">docker</span> search mysql --filter<span class="token operator">=</span>STARS<span class="token operator">=</span><span class="token number">3000</span>
 
 <span class="token comment"># 结果：</span>
NAME      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql     MySQL is a widely used, open-source relation…   <span class="token number">11905</span>     <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
mariadb   MariaDB Server is a high performing <span class="token function">open</span> sou…   <span class="token number">4556</span>      <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>   
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="pull下载image" tabindex="-1"><a class="header-anchor" href="#pull下载image" aria-hidden="true">#</a> pull下载image</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如果不指定版本，默认是下载最新的</span>
<span class="token function">docker</span> pull mysql

<span class="token comment"># 可以指定版本 一定要在docker hub上找到的到的.. 例如mysql</span>
<span class="token comment"># https://hub.docker.com/_/mysql?tab=tags</span>
docekr pull mysql:5.7
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="rmi删除image" tabindex="-1"><a class="header-anchor" href="#rmi删除image" aria-hidden="true">#</a> rmi删除image</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> rmi mysql
<span class="token comment"># 也可通过镜像id来删除</span>
<span class="token function">docker</span> rmi 7ebbdadjakdjakdladad
<span class="token comment"># 可以同时删除多个</span>
<span class="token function">docker</span> rmi mysql redis wordpress
<span class="token comment"># 当然 id也可以</span>
<span class="token function">docker</span> rmi xxxx xxx xxx

<span class="token comment"># 还可以通过表达式来删除多个，例如删除全部</span>
<span class="token function">docker</span> rmi -f <span class="token variable">${docker images -aq}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2>
<p>我们有了镜像才能创建容器</p>
<p>我们先来拉一个ubuntu镜像吧~</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull ubuntu
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="run命令一览" tabindex="-1"><a class="header-anchor" href="#run命令一览" aria-hidden="true">#</a> run命令一览</h3>
<p>只能说 docker最核心的地方就是这个了
命令相当多</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --help

<span class="token comment"># 结果</span>

Usage:  <span class="token function">docker</span> run <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> IMAGE <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span> <span class="token punctuation">[</span>ARG<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

Run a <span class="token builtin class-name">command</span> <span class="token keyword">in</span> a new container

Options:
      --add-host list                  Add a custom host-to-IP mapping <span class="token punctuation">(</span>host:ip<span class="token punctuation">)</span>
  -a, --attach list                    Attach to STDIN, STDOUT or STDERR
      --blkio-weight uint16            Block IO <span class="token punctuation">(</span>relative weight<span class="token punctuation">)</span>, between <span class="token number">10</span> and <span class="token number">1000</span>, or <span class="token number">0</span> to disable <span class="token punctuation">(</span>default <span class="token number">0</span><span class="token punctuation">)</span>
      --blkio-weight-device list       Block IO weight <span class="token punctuation">(</span>relative device weight<span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      --cap-add list                   Add Linux capabilities
      --cap-drop list                  Drop Linux capabilities
      --cgroup-parent string           Optional parent cgroup <span class="token keyword">for</span> the container
      --cgroupns string                Cgroup namespace to use <span class="token punctuation">(</span>host<span class="token operator">|</span>private<span class="token punctuation">)</span>
                                       <span class="token string">'host'</span><span class="token builtin class-name">:</span>    Run the container <span class="token keyword">in</span> the Docker <span class="token function">host</span><span class="token string">'s cgroup namespace
                                       '</span>private<span class="token string">': Run the container in its own private cgroup namespace
                                       '</span>':        Use the cgroup namespace as configured by the
                                                  default-cgroupns-mode option on the daemon <span class="token punctuation">(</span>default<span class="token punctuation">)</span>
      --cidfile string                 Write the container ID to the <span class="token function">file</span>
      --cpu-period int                 Limit CPU CFS <span class="token punctuation">(</span>Completely Fair Scheduler<span class="token punctuation">)</span> period
      --cpu-quota int                  Limit CPU CFS <span class="token punctuation">(</span>Completely Fair Scheduler<span class="token punctuation">)</span> <span class="token function">quota</span>
      --cpu-rt-period int              Limit CPU real-time period <span class="token keyword">in</span> microseconds
      --cpu-rt-runtime int             Limit CPU real-time runtime <span class="token keyword">in</span> microseconds
  -c, --cpu-shares int                 CPU shares <span class="token punctuation">(</span>relative weight<span class="token punctuation">)</span>
      --cpus decimal                   Number of CPUs
      --cpuset-cpus string             CPUs <span class="token keyword">in</span> <span class="token function">which</span> to allow execution <span class="token punctuation">(</span><span class="token number">0</span>-3, <span class="token number">0,1</span><span class="token punctuation">)</span>
      --cpuset-mems string             MEMs <span class="token keyword">in</span> <span class="token function">which</span> to allow execution <span class="token punctuation">(</span><span class="token number">0</span>-3, <span class="token number">0,1</span><span class="token punctuation">)</span>
  -d, --detach                         Run container <span class="token keyword">in</span> background and print container ID
      --detach-keys string             Override the key sequence <span class="token keyword">for</span> detaching a container
      --device list                    Add a <span class="token function">host</span> device to the container
      --device-cgroup-rule list        Add a rule to the cgroup allowed devices list
      --device-read-bps list           Limit <span class="token builtin class-name">read</span> rate <span class="token punctuation">(</span>bytes per second<span class="token punctuation">)</span> from a device <span class="token punctuation">(</span>default <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      --device-read-iops list          Limit <span class="token builtin class-name">read</span> rate <span class="token punctuation">(</span>IO per second<span class="token punctuation">)</span> from a device <span class="token punctuation">(</span>default <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      --device-write-bps list          Limit <span class="token function">write</span> rate <span class="token punctuation">(</span>bytes per second<span class="token punctuation">)</span> to a device <span class="token punctuation">(</span>default <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      --device-write-iops list         Limit <span class="token function">write</span> rate <span class="token punctuation">(</span>IO per second<span class="token punctuation">)</span> to a device <span class="token punctuation">(</span>default <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      --disable-content-trust          Skip image verification <span class="token punctuation">(</span>default <span class="token boolean">true</span><span class="token punctuation">)</span>
      --dns list                       Set custom DNS servers
      --dns-option list                Set DNS options
      --dns-search list                Set custom DNS search domains
      --domainname string              Container NIS domain name
      --entrypoint string              Overwrite the default ENTRYPOINT of the image
  -e, --env list                       Set environment variables
      --env-file list                  Read <span class="token keyword">in</span> a <span class="token function">file</span> of environment variables
      --expose list                    Expose a port or a range of ports
      --gpus gpu-request               GPU devices to <span class="token function">add</span> to the container <span class="token punctuation">(</span><span class="token string">'all'</span> to pass all GPUs<span class="token punctuation">)</span>
      --group-add list                 Add additional <span class="token function">groups</span> to <span class="token function">join</span>
      --health-cmd string              Command to run to check health
      --health-interval duration       Time between running the check <span class="token punctuation">(</span>ms<span class="token operator">|</span>s<span class="token operator">|</span>m<span class="token operator">|</span>h<span class="token punctuation">)</span> <span class="token punctuation">(</span>default 0s<span class="token punctuation">)</span>
      --health-retries int             Consecutive failures needed to report unhealthy
      --health-start-period duration   Start period <span class="token keyword">for</span> the container to initialize before starting health-retries
                                       countdown <span class="token punctuation">(</span>ms<span class="token operator">|</span>s<span class="token operator">|</span>m<span class="token operator">|</span>h<span class="token punctuation">)</span> <span class="token punctuation">(</span>default 0s<span class="token punctuation">)</span>
      --health-timeout duration        Maximum <span class="token function">time</span> to allow one check to run <span class="token punctuation">(</span>ms<span class="token operator">|</span>s<span class="token operator">|</span>m<span class="token operator">|</span>h<span class="token punctuation">)</span> <span class="token punctuation">(</span>default 0s<span class="token punctuation">)</span>
      --help                           Print usage
  -h, --hostname string                Container <span class="token function">host</span> name
      --init                           Run an init inside the container that forwards signals and reaps processes
  -i, --interactive                    Keep STDIN <span class="token function">open</span> even <span class="token keyword">if</span> not attached
      --ip string                      IPv4 address <span class="token punctuation">(</span>e.g., <span class="token number">172.30</span>.100.104<span class="token punctuation">)</span>
      --ip6 string                     IPv6 address <span class="token punctuation">(</span>e.g., <span class="token number">2001</span>:db8::33<span class="token punctuation">)</span>
      --ipc string                     IPC mode to use
      --isolation string               Container isolation technology
      --kernel-memory bytes            Kernel memory limit
  -l, --label list                     Set meta data on a container
      --label-file list                Read <span class="token keyword">in</span> a line delimited <span class="token function">file</span> of labels
      --link list                      Add <span class="token function">link</span> to another container
      --link-local-ip list             Container IPv4/IPv6 link-local addresses
      --log-driver string              Logging driver <span class="token keyword">for</span> the container
      --log-opt list                   Log driver options
      --mac-address string             Container MAC address <span class="token punctuation">(</span>e.g., <span class="token number">92</span>:d0:c6:0a:29:33<span class="token punctuation">)</span>
  -m, --memory bytes                   Memory limit
      --memory-reservation bytes       Memory soft limit
      --memory-swap bytes              Swap limit equal to memory plus swap: <span class="token string">'-1'</span> to <span class="token builtin class-name">enable</span> unlimited swap
      --memory-swappiness int          Tune container memory swappiness <span class="token punctuation">(</span><span class="token number">0</span> to <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>default -1<span class="token punctuation">)</span>
      --mount <span class="token function">mount</span>                    Attach a filesystem <span class="token function">mount</span> to the container
      --name string                    Assign a name to the container
      --network network                Connect a container to a network
      --network-alias list             Add network-scoped <span class="token builtin class-name">alias</span> <span class="token keyword">for</span> the container
      --no-healthcheck                 Disable any container-specified HEALTHCHECK
      --oom-kill-disable               Disable OOM Killer
      --oom-score-adj int              Tune <span class="token function">host</span><span class="token string">'s OOM preferences (-1000 to 1000)
      --pid string                     PID namespace to use
      --pids-limit int                 Tune container pids limit (set -1 for unlimited)
      --platform string                Set platform if server is multi-platform capable
      --privileged                     Give extended privileges to this container
  -p, --publish list                   Publish a container'</span>s port<span class="token punctuation">(</span>s<span class="token punctuation">)</span> to the <span class="token function">host</span>
  -P, --publish-all                    Publish all exposed ports to random ports
      --pull string                    Pull image before running <span class="token punctuation">(</span><span class="token string">"always"</span><span class="token operator">|</span><span class="token string">"missing"</span><span class="token operator">|</span><span class="token string">"never"</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token string">"missing"</span><span class="token punctuation">)</span>
      --read-only                      Mount the container's root filesystem as <span class="token builtin class-name">read</span> only
      --restart string                 Restart policy to apply when a container exits <span class="token punctuation">(</span>default <span class="token string">"no"</span><span class="token punctuation">)</span>
      --rm                             Automatically remove the container when it exits
      --runtime string                 Runtime to use <span class="token keyword">for</span> this container
      --security-opt list              Security Options
      --shm-size bytes                 Size of /dev/shm
      --sig-proxy                      Proxy received signals to the process <span class="token punctuation">(</span>default <span class="token boolean">true</span><span class="token punctuation">)</span>
      --stop-signal string             Signal to stop a container <span class="token punctuation">(</span>default <span class="token string">"SIGTERM"</span><span class="token punctuation">)</span>
      --stop-timeout int               Timeout <span class="token punctuation">(</span>in seconds<span class="token punctuation">)</span> to stop a container
      --storage-opt list               Storage driver options <span class="token keyword">for</span> the container
      --sysctl map                     Sysctl options <span class="token punctuation">(</span>default map<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      --tmpfs list                     Mount a tmpfs directory
  -t, --tty                            Allocate a pseudo-TTY
      --ulimit <span class="token builtin class-name">ulimit</span>                  Ulimit options <span class="token punctuation">(</span>default <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  -u, --user string                    Username or <span class="token environment constant">UID</span> <span class="token punctuation">(</span>format: <span class="token operator">&lt;</span>name<span class="token operator">|</span>uid<span class="token operator">></span><span class="token punctuation">[</span>:<span class="token operator">&lt;</span>group<span class="token operator">|</span>gid<span class="token operator">></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      --userns string                  User namespace to use
      --uts string                     UTS namespace to use
  -v, --volume list                    Bind <span class="token function">mount</span> a volume
      --volume-driver string           Optional volume driver <span class="token keyword">for</span> the container
      --volumes-from list              Mount volumes from the specified container<span class="token punctuation">(</span>s<span class="token punctuation">)</span>
  -w, --workdir string                 Working directory inside the container
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br></div></div><h3 id="docker最基本的启动容器" tabindex="-1"><a class="header-anchor" href="#docker最基本的启动容器" aria-hidden="true">#</a> docker最基本的启动容器</h3>
<p>为什么说是最基本的呢….因为这玩意非常五花八门</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">[</span>可选参数<span class="token punctuation">]</span> image的名字或者id

<span class="token comment"># 最简单的参数</span>
--name <span class="token string">"abc"</span> 用来区分容器
--name<span class="token operator">=</span><span class="token string">"abc"</span> 同上
-d 			以后台方式启动
-it			使用交互方式运行，进入容器查看内容
-p			指定容器的端口，例如，要将容器内的8080端口映射到本地的6666端口，则：-p <span class="token number">6666</span>:8080
	-p 主机端口:容器端口 实际中百分之九十是用这个方式
	-p ip:主机端口:容器端口
	-p 容器端口
	-p 啥都不填 随机生成 没人用过这种方式
	
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>我们先来启动下刚刚pull的ubuntu</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -it ubuntu <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>进入到ubuntu的bash目录（根路径），然后你可以像正常操作ubuntu那样，键入<code>exit</code>退出</p>
<h3 id="ps查看正在运行的容器" tabindex="-1"><a class="header-anchor" href="#ps查看正在运行的容器" aria-hidden="true">#</a> ps查看正在运行的容器</h3>
<p>语法</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:  <span class="token function">docker</span> <span class="token function">ps</span> <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span>

List containers

Options:
  -a, --all            <span class="token comment"># 列出当前正在运行的容器，和历史运行过的容器</span>
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print containers using a Go template
  -n, --last int       <span class="token comment"># 语法 -n=number 或者 -n number number是int 可以通过这个参数来指定显示最近创建的容器</span>
  -l, --latest          Show the latest created container <span class="token punctuation">(</span>includes all states<span class="token punctuation">)</span>
      --no-trunc        Don't truncate output
  -q, --quiet         <span class="token comment"># 只显示容器的id，可以配合 -a 也就是： -qa 显示出所有的容器</span>
  -s, --size            Display total <span class="token function">file</span> sizes
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>一般都是 -qa -a，用的多</p>
<h3 id="退出容器和不停止退出" tabindex="-1"><a class="header-anchor" href="#退出容器和不停止退出" aria-hidden="true">#</a> 退出容器和不停止退出</h3>
<p>我们先进入下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -it ubuntu <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后你输入<code>exit</code>，再用<code>docker ps</code>什么都看不到</p>
<p>但如果你在进入这个容器后，按下<code>Ctrl+p+q</code> ---没错，就是这种组合快捷键，然后再到ps查看</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104201536544.png" alt="image-20220104201536544" loading="lazy"></p>
<p>你就能看到你的容器了</p>
<h3 id="结束运行的容器和删除容器" tabindex="-1"><a class="header-anchor" href="#结束运行的容器和删除容器" aria-hidden="true">#</a> 结束运行的容器和删除容器</h3>
<p>结束：</p>
<p>比如说刚刚的那个ubuntu 它的id是b5187daa2403</p>
<p>我要直接停止它只需要</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> stop b5187daa2403
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后删除容器只需要</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> b5187daa2403
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>注意 要先停止 再删除</p>
<p>如果一定要直接删除的话</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 不走停止步骤 直接删除</span>
<span class="token function">docker</span> <span class="token function">rm</span> -f b5187daa2403
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>如果要批量删除的话：删除所有容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> -f <span class="token variable">${docker ps -qa}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>或者通过linux的管道符来批量删除</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> -qa <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">docker</span> <span class="token function">rm</span> -f
<span class="token comment"># xargs就是将上个命里的输出作为参数传递给docker rm这个命令</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="启动和停止容器的操作" tabindex="-1"><a class="header-anchor" href="#启动和停止容器的操作" aria-hidden="true">#</a> 启动和停止容器的操作</h3>
<p>比如说我现在启动了一个mysql</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name mysql1 -p:3306:3306 -d mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我想停止它</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> stop mysql
<span class="token comment"># 或者kill，但通常情况下都是stop kill可能存在一些bug</span>
<span class="token comment"># kill是强制停止</span>
<span class="token function">docker</span> <span class="token function">kill</span> mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我想重启它</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> start mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我想直接重启它</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> restart mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="后台启动" tabindex="-1"><a class="header-anchor" href="#后台启动" aria-hidden="true">#</a> 后台启动</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docekr run -d ubuntu
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>有些时候 你启动了一个容器 比如说这个ubuntu</p>
<p>然后你会发现它不在你的ps正在运行的列表中</p>
<p>这是因为 这个容器没有任何正在运行的任务 所以会自动停止</p>
<p>如果docker容器使用后台运行 那么他必须要一个前台进程</p>
<p>docker如果发现没有应用，就会自动停止</p>
<h3 id="logs查看日志" tabindex="-1"><a class="header-anchor" href="#logs查看日志" aria-hidden="true">#</a> logs查看日志</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:  <span class="token function">docker</span> logs <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> CONTAINER

Fetch the logs of a container

Options:
      --details        Show extra details provided to logs 显示提供给日志的额外详细信息
  -f, --follow         Follow log output 按照日志输出
      --since string   Show logs since timestamp <span class="token punctuation">(</span>e.g. <span class="token number">2013</span>-01-02T13:23:37Z<span class="token punctuation">)</span> or relative <span class="token punctuation">(</span>e.g. 42m <span class="token keyword">for</span> <span class="token number">42</span> minutes<span class="token punctuation">)</span>  显示自时间戳记起的日志（例如 <span class="token number">2013</span>-01-02T13： <span class="token number">23</span>:37Z）或相关（例如 42m 为 <span class="token number">42</span> 分钟）
  -n, --tail string    Number of lines to show from the end of the logs <span class="token punctuation">(</span>default <span class="token string">"all"</span><span class="token punctuation">)</span> 从日志末尾显示的行数（默认为“all”） 例如  --tail <span class="token number">10</span> 就是显示最新的十条记录
  -t, --timestamps     Show timestamps 显示时间戳
      --until string   Show logs before a timestamp <span class="token punctuation">(</span>e.g. <span class="token number">2013</span>-01-02T13:23:37Z<span class="token punctuation">)</span> or relative <span class="token punctuation">(</span>e.g. 42m <span class="token keyword">for</span> <span class="token number">42</span> minutes<span class="token punctuation">)</span> 在时间戳（例如 <span class="token number">2013</span>-01-02T13:23:37Z）或相关（例如 42m 为 <span class="token number">42</span> 分钟）之前的日志
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这些一般情况下都有可能用得上 最常用的大概是<code>-t</code>和<code>-f</code>以及<code>-n</code>了</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看最近10条log，包含时间戳</span>
<span class="token function">docker</span> logs -t -n <span class="token number">10</span> 容器
<span class="token comment">#  显示42分钟之前的日志 包含时间戳</span>
 <span class="token function">docker</span> logs --until 42m -t 容器
<span class="token comment"># 显示xxx号开始，40分钟之前的日志 包含时间戳</span>
<span class="token function">docker</span> logs --since <span class="token string">"2011-11-11"</span> --until 40m 容器
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="top查看容器内的进程信息" tabindex="-1"><a class="header-anchor" href="#top查看容器内的进程信息" aria-hidden="true">#</a> top查看容器内的进程信息</h3>
<p>比如我有个容器运行了mysql 我想看看里面的进程信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> <span class="token function">top</span> mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>结果</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104204917613.png" alt="image-20220104204917613" loading="lazy"></p>
<h3 id="inspect查看容器的所有原信息" tabindex="-1"><a class="header-anchor" href="#inspect查看容器的所有原信息" aria-hidden="true">#</a> inspect查看容器的所有原信息</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> inspect mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>结果非常多</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//容器ID</span>
        <span class="token property">"Id"</span><span class="token operator">:</span> <span class="token string">"9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54"</span><span class="token punctuation">,</span>
        <span class="token comment">// 创建时间</span>
        <span class="token property">"Created"</span><span class="token operator">:</span> <span class="token string">"2021-09-26T08:00:11.915899405Z"</span><span class="token punctuation">,</span>
        <span class="token comment">// 默认的bash控制台</span>
        <span class="token property">"Path"</span><span class="token operator">:</span> <span class="token string">"docker-entrypoint.sh"</span><span class="token punctuation">,</span>
        <span class="token comment">// 传递的参数</span>
        <span class="token property">"Args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">"mysqld"</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 状态</span>
        <span class="token property">"State"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Status"</span><span class="token operator">:</span> <span class="token string">"running"</span><span class="token punctuation">,</span>
            <span class="token property">"Running"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">"Paused"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Restarting"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"OOMKilled"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Dead"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Pid"</span><span class="token operator">:</span> <span class="token number">1003688</span><span class="token punctuation">,</span>
            <span class="token property">"ExitCode"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"Error"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"StartedAt"</span><span class="token operator">:</span> <span class="token string">"2022-01-04T12:48:29.623170827Z"</span><span class="token punctuation">,</span>
            <span class="token property">"FinishedAt"</span><span class="token operator">:</span> <span class="token string">"2021-12-21T09:14:39.402134711Z"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// 是通过哪个image创建的</span>
        <span class="token property">"Image"</span><span class="token operator">:</span> <span class="token string">"sha256:0716d6ebcc1a61c5a296fcb187e71f93531e510d4e4400267e2e502103d0194c"</span><span class="token punctuation">,</span>
        <span class="token property">"ResolvConfPath"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/containers/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54/resolv.conf"</span><span class="token punctuation">,</span>
        <span class="token property">"HostnamePath"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/containers/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54/hostname"</span><span class="token punctuation">,</span>
        <span class="token property">"HostsPath"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/containers/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54/hosts"</span><span class="token punctuation">,</span>
        <span class="token property">"LogPath"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/containers/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54-json.log"</span><span class="token punctuation">,</span>
        <span class="token comment">// 主机的配置</span>
        <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"/mysql"</span><span class="token punctuation">,</span>
        <span class="token property">"RestartCount"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">"Driver"</span><span class="token operator">:</span> <span class="token string">"overlay2"</span><span class="token punctuation">,</span>
        <span class="token property">"Platform"</span><span class="token operator">:</span> <span class="token string">"linux"</span><span class="token punctuation">,</span>
        <span class="token property">"MountLabel"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        <span class="token property">"ProcessLabel"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        <span class="token property">"AppArmorProfile"</span><span class="token operator">:</span> <span class="token string">"docker-default"</span><span class="token punctuation">,</span>
        <span class="token property">"ExecIDs"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token comment">// 端口之类的配置</span>
        <span class="token property">"HostConfig"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Binds"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"ContainerIDFile"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"LogConfig"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"Type"</span><span class="token operator">:</span> <span class="token string">"json-file"</span><span class="token punctuation">,</span>
                <span class="token property">"Config"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"NetworkMode"</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
            <span class="token property">"PortBindings"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"3306/tcp"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token property">"HostIp"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                        <span class="token property">"HostPort"</span><span class="token operator">:</span> <span class="token string">"3306"</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"RestartPolicy"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"no"</span><span class="token punctuation">,</span>
                <span class="token property">"MaximumRetryCount"</span><span class="token operator">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"AutoRemove"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"VolumeDriver"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"VolumesFrom"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"CapAdd"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"CapDrop"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"CgroupnsMode"</span><span class="token operator">:</span> <span class="token string">"host"</span><span class="token punctuation">,</span>
            <span class="token property">"Dns"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"DnsOptions"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"DnsSearch"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"ExtraHosts"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"GroupAdd"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"IpcMode"</span><span class="token operator">:</span> <span class="token string">"private"</span><span class="token punctuation">,</span>
            <span class="token property">"Cgroup"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"Links"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"OomScoreAdj"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"PidMode"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"Privileged"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"PublishAllPorts"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"ReadonlyRootfs"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"SecurityOpt"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"UTSMode"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"UsernsMode"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"ShmSize"</span><span class="token operator">:</span> <span class="token number">67108864</span><span class="token punctuation">,</span>
            <span class="token property">"Runtime"</span><span class="token operator">:</span> <span class="token string">"runc"</span><span class="token punctuation">,</span>
            <span class="token property">"ConsoleSize"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token number">0</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"Isolation"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"CpuShares"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"Memory"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"NanoCpus"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"CgroupParent"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"BlkioWeight"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"BlkioWeightDevice"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"BlkioDeviceReadBps"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"BlkioDeviceWriteBps"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"BlkioDeviceReadIOps"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"BlkioDeviceWriteIOps"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"CpuPeriod"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"CpuQuota"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"CpuRealtimePeriod"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"CpuRealtimeRuntime"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"CpusetCpus"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"CpusetMems"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"Devices"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"DeviceCgroupRules"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"DeviceRequests"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"KernelMemory"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"KernelMemoryTCP"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"MemoryReservation"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"MemorySwap"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"MemorySwappiness"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"OomKillDisable"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"PidsLimit"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"Ulimits"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"CpuCount"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"CpuPercent"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"IOMaximumIOps"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"IOMaximumBandwidth"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"MaskedPaths"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"/proc/asound"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/acpi"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/kcore"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/keys"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/latency_stats"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/timer_list"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/timer_stats"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/sched_debug"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/scsi"</span><span class="token punctuation">,</span>
                <span class="token string">"/sys/firmware"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"ReadonlyPaths"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"/proc/bus"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/fs"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/irq"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/sys"</span><span class="token punctuation">,</span>
                <span class="token string">"/proc/sysrq-trigger"</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"GraphDriver"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Data"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"LowerDir"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/overlay2/25d2c9aecfed8840414278a14f2f2549069a27ec07b268e0acd4f9649a462a51-init/diff:/var/lib/docker/overlay2/9f1869bece0ef786bf2728d5a9b5382d35f2d1129b0c34b7c8a4ce0ba96db65b/diff:/var/lib/docker/overlay2/5ba831e614fc8249b892624286b87d99de8a1cf0002af63dd5b1b78c14afb02c/diff:/var/lib/docker/overlay2/7a46fd9b22b210e0e03af3e7769c508ee6c664180d23b231cd4c1807a41c28f3/diff:/var/lib/docker/overlay2/04483e1d79d5ebe5dd267433079c9ae7bfe5f2ae1bd236763afee15631ac040f/diff:/var/lib/docker/overlay2/13875c72f323a9b4494d16aae350ccf2fb7cc017955dfa25b70033b71268e538/diff:/var/lib/docker/overlay2/f796562cea5598a9ad118d294e6a1753c9e56260d6dd9a2ab28c7e7721cb8487/diff:/var/lib/docker/overlay2/d9dce547d72843ffd026fea1a76b77bba364073acbb71ccdd3e03959730fc070/diff:/var/lib/docker/overlay2/2313046eeca90ad031a5210b5de4cb2596d9020e4a434b5a23031b321882cded/diff:/var/lib/docker/overlay2/ad4cb3141a2f4cf39e264b886cf31b0d303b11909a1f56b49fc7422c45035d1a/diff:/var/lib/docker/overlay2/c4c4cfbd4b4b01ca95b7cda32507f45c96e8a4e932c31f15311135416d831676/diff:/var/lib/docker/overlay2/f7eb97beb793d4b34a2d20c526f11f3369a9430fc8c9d22296121b60e1e39940/diff:/var/lib/docker/overlay2/ddbc25b697c64e7f46cb77e545aae9fde56d11d45778a6b2d13578fd61dcb7a6/diff"</span><span class="token punctuation">,</span>
                <span class="token property">"MergedDir"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/overlay2/25d2c9aecfed8840414278a14f2f2549069a27ec07b268e0acd4f9649a462a51/merged"</span><span class="token punctuation">,</span>
                <span class="token property">"UpperDir"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/overlay2/25d2c9aecfed8840414278a14f2f2549069a27ec07b268e0acd4f9649a462a51/diff"</span><span class="token punctuation">,</span>
                <span class="token property">"WorkDir"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/overlay2/25d2c9aecfed8840414278a14f2f2549069a27ec07b268e0acd4f9649a462a51/work"</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"overlay2"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"Mounts"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">"Type"</span><span class="token operator">:</span> <span class="token string">"volume"</span><span class="token punctuation">,</span>
                <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"4e006693351035d468b0b79ddec3dec1710c96cce8424437b65405a4e7e20e03"</span><span class="token punctuation">,</span>
                <span class="token property">"Source"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/volumes/4e006693351035d468b0b79ddec3dec1710c96cce8424437b65405a4e7e20e03/_data"</span><span class="token punctuation">,</span>
                <span class="token property">"Destination"</span><span class="token operator">:</span> <span class="token string">"/var/lib/mysql"</span><span class="token punctuation">,</span>
                <span class="token property">"Driver"</span><span class="token operator">:</span> <span class="token string">"local"</span><span class="token punctuation">,</span>
                <span class="token property">"Mode"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token property">"RW"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">"Propagation"</span><span class="token operator">:</span> <span class="token string">""</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">"Config"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Hostname"</span><span class="token operator">:</span> <span class="token string">"9f21f81da253"</span><span class="token punctuation">,</span>
            <span class="token property">"Domainname"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"User"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStdin"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStdout"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStderr"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"ExposedPorts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"3306/tcp"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token property">"33060/tcp"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"Tty"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"OpenStdin"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"StdinOnce"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Env"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"MYSQL_ROOT_PASSWORD=123456789"</span><span class="token punctuation">,</span>
                <span class="token string">"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"</span><span class="token punctuation">,</span>
                <span class="token string">"GOSU_VERSION=1.12"</span><span class="token punctuation">,</span>
                <span class="token string">"MYSQL_MAJOR=8.0"</span><span class="token punctuation">,</span>
                <span class="token string">"MYSQL_VERSION=8.0.26-1debian10"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"Cmd"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"mysqld"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"Image"</span><span class="token operator">:</span> <span class="token string">"mysql"</span><span class="token punctuation">,</span>
            <span class="token property">"Volumes"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"/var/lib/mysql"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"WorkingDir"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"Entrypoint"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"docker-entrypoint.sh"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"OnBuild"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"Labels"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// 网络的一些信息</span>
        <span class="token property">"NetworkSettings"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Bridge"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"SandboxID"</span><span class="token operator">:</span> <span class="token string">"46656b4e57a5381633087312627c8c66bfd36515ef7dbabb0978f4e94a71ad6a"</span><span class="token punctuation">,</span>
            <span class="token property">"HairpinMode"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"LinkLocalIPv6Address"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"LinkLocalIPv6PrefixLen"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"Ports"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"3306/tcp"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token property">"HostIp"</span><span class="token operator">:</span> <span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span>
                        <span class="token property">"HostPort"</span><span class="token operator">:</span> <span class="token string">"3306"</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        <span class="token property">"HostIp"</span><span class="token operator">:</span> <span class="token string">"::"</span><span class="token punctuation">,</span>
                        <span class="token property">"HostPort"</span><span class="token operator">:</span> <span class="token string">"3306"</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token property">"33060/tcp"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"SandboxKey"</span><span class="token operator">:</span> <span class="token string">"/var/run/docker/netns/46656b4e57a5"</span><span class="token punctuation">,</span>
            <span class="token property">"SecondaryIPAddresses"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"SecondaryIPv6Addresses"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"EndpointID"</span><span class="token operator">:</span> <span class="token string">"1d1797f34b09434542f50e955a80ff45ab5cd6dad3f00c743af8fdacbfc39058"</span><span class="token punctuation">,</span>
            <span class="token property">"Gateway"</span><span class="token operator">:</span> <span class="token string">"172.17.0.1"</span><span class="token punctuation">,</span>
            <span class="token property">"GlobalIPv6Address"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"GlobalIPv6PrefixLen"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"IPAddress"</span><span class="token operator">:</span> <span class="token string">"172.17.0.3"</span><span class="token punctuation">,</span>
            <span class="token property">"IPPrefixLen"</span><span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span>
            <span class="token property">"IPv6Gateway"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"MacAddress"</span><span class="token operator">:</span> <span class="token string">"02:42:ac:11:00:03"</span><span class="token punctuation">,</span>
            <span class="token property">"Networks"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"bridge"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">"IPAMConfig"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                    <span class="token property">"Links"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                    <span class="token property">"Aliases"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                    <span class="token property">"NetworkID"</span><span class="token operator">:</span> <span class="token string">"d00c679d51fa5d3a4485eaadfdfcc7181aa634bfb13f553027f4b0fd4f2a3aa6"</span><span class="token punctuation">,</span>
                    <span class="token property">"EndpointID"</span><span class="token operator">:</span> <span class="token string">"1d1797f34b09434542f50e955a80ff45ab5cd6dad3f00c743af8fdacbfc39058"</span><span class="token punctuation">,</span>
                    <span class="token property">"Gateway"</span><span class="token operator">:</span> <span class="token string">"172.17.0.1"</span><span class="token punctuation">,</span>
                    <span class="token property">"IPAddress"</span><span class="token operator">:</span> <span class="token string">"172.17.0.3"</span><span class="token punctuation">,</span>
                    <span class="token property">"IPPrefixLen"</span><span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span>
                    <span class="token property">"IPv6Gateway"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                    <span class="token property">"GlobalIPv6Address"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                    <span class="token property">"GlobalIPv6PrefixLen"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token property">"MacAddress"</span><span class="token operator">:</span> <span class="token string">"02:42:ac:11:00:03"</span><span class="token punctuation">,</span>
                    <span class="token property">"DriverOpts"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br></div></div><h3 id="exec和attach进入容器" tabindex="-1"><a class="header-anchor" href="#exec和attach进入容器" aria-hidden="true">#</a> exec和attach进入容器</h3>
<p>这是非常重要的命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:  <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> CONTAINER COMMAND <span class="token punctuation">[</span>ARG<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

Run a <span class="token builtin class-name">command</span> <span class="token keyword">in</span> a running container

Options:
  -d, --detach               Detached mode: run <span class="token builtin class-name">command</span> <span class="token keyword">in</span> the background
      --detach-keys string   Override the key sequence <span class="token keyword">for</span> detaching a container
  -e, --env list             Set environment variables
      --env-file list        Read <span class="token keyword">in</span> a <span class="token function">file</span> of environment variables
  -i, --interactive          Keep STDIN <span class="token function">open</span> even <span class="token keyword">if</span> not attached
      --privileged           Give extended privileges to the <span class="token builtin class-name">command</span>
  -t, --tty                  Allocate a pseudo-TTY
  -u, --user string          Username or <span class="token environment constant">UID</span> <span class="token punctuation">(</span>format: <span class="token operator">&lt;</span>name<span class="token operator">|</span>uid<span class="token operator">></span><span class="token punctuation">[</span>:<span class="token operator">&lt;</span>group<span class="token operator">|</span>gid<span class="token operator">></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  -w, --workdir string       Working directory inside the container
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>最常用的是：</p>
<p><code>-it</code> 交互模式</p>
<p>例如进入mysql</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it mysql <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后你就可以自由的更改你的mysql</p>
<p>或者还有一种方式可以进入容器</p>
<p>下面这个是正在运行的命令行（例如mysql 进入后你将会看到正在运行的mysql 注意 实际工程中百分之一万不会用到这个）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> attach mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>docker exec 进入容器后开启一个新的终端 可以在里面操作</li>
<li>docker attach 进入容器正在执行的终端，不会启动新的进程</li>
</ul>
<h3 id="cp-容器和主机的文件互相传递" tabindex="-1"><a class="header-anchor" href="#cp-容器和主机的文件互相传递" aria-hidden="true">#</a> cp--容器和主机的文件互相传递</h3>
<p>从容器内拷贝到主机上</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">cp</span> 容器id:容器内的路径（要从根路径开始） 主机路径（也是要从根路径开始）
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>例如</p>
<p>我现在的ubuntu容器内<code>/home</code>路径下有一个<code>abc.java</code></p>
<p>我想拷贝到我主机的<code>/home/root</code>路径下</p>
<p>无论容器有没有启动，都可以用cp来进行拷贝</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">cp</span> ubuntu:/home/abc.java /home/root
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果说要把主机的拷贝到容器 反着来就行了</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">cp</span> /home/root/abc.java ubuntu:/home
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="✨docker命令一图概括" tabindex="-1"><a class="header-anchor" href="#✨docker命令一图概括" aria-hidden="true">#</a> ✨Docker命令一图概括</h2>
<p><img src="/images/SpringCloud/00-Docker/image-20220104210746142.png" alt="image-20220104210746142" loading="lazy"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ttach    <span class="token comment">#当前shell下attach连接指定运行镜像</span>
build      <span class="token comment">#通过Dockerfile定制镜像</span>
commit      <span class="token comment">#提交当前容器为新的镜像</span>
<span class="token function">cp</span>     <span class="token comment">#从容器中拷贝指定文件或者目录到宿主机中</span>
create      <span class="token comment">#创建一个新的容器，同run 但不启动容器</span>
<span class="token function">diff</span>      <span class="token comment">#查看docker容器变化</span>
events    <span class="token comment">#从docker服务获取容器实时事件</span>
<span class="token builtin class-name">exec</span>    <span class="token comment">#在已存在的容器上运行命令</span>
<span class="token builtin class-name">export</span>    <span class="token comment">#导出容器的内容流作为一个tar归档文件(对应import)</span>
<span class="token function">history</span>    <span class="token comment">#展示一个镜像形成历史</span>
images    <span class="token comment">#列出系统当前镜像</span>
<span class="token function">import</span>    <span class="token comment">#从tar包中的内容创建一个新的文件系统映像(对应export)</span>
info     <span class="token comment">#显示系统相关信息</span>
inspect    <span class="token comment">#查看容器详细信息</span>
<span class="token function">kill</span>    <span class="token comment">#kill指定docker容器</span>
load     <span class="token comment">#从一个tar包中加载一个镜像(对应save)</span>
login    <span class="token comment">#注册或者登陆一个docker源服务器</span>
<span class="token builtin class-name">logout</span>    <span class="token comment">#从当前Docker registry退出</span>
logs    <span class="token comment">#输出当前容器日志信息</span>
pause    <span class="token comment">#暂停容器</span>
port    <span class="token comment">#查看映射端口对应的容器内部源端口</span>
<span class="token function">ps</span>    <span class="token comment">#列出容器列表</span>
pull      <span class="token comment">#从docker镜像源服务器拉取指定镜像或者库镜像</span>
push     <span class="token comment">#推送指定镜像或者库镜像至docker源服务器</span>
<span class="token function">rename</span>     <span class="token comment">#重命名容器</span>
restart    <span class="token comment">#重启运行的容器</span>
<span class="token function">rm</span>    <span class="token comment">#移除一个或者多个容器</span>
rmi    <span class="token comment">#移除一个或多个镜像(无容器使用该镜像才可以删除，否则需要删除相关容器才可以继续或者-f强制删除)</span>
run      <span class="token comment">#创建一个新的容器并运行一个命令</span>
save    <span class="token comment">#保存一个镜像为一个tar包(对应load)</span>
search     <span class="token comment">#在dockerhub中搜索镜像</span>
start   <span class="token comment">#启动容器</span>
stats      <span class="token comment">#统计容器使用资源</span>
stop    <span class="token comment">#停止容器</span>
tag          <span class="token comment">#给源中镜像打标签</span>
<span class="token function">top</span>      <span class="token comment">#查看容器中运行的进程信息</span>
unpause     <span class="token comment">#取消暂停容器</span>
version   <span class="token comment">#查看容器版本号</span>
<span class="token function">wait</span>       <span class="token comment">#截取容器停止时的退出状态值</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h2 id="部署测试" tabindex="-1"><a class="header-anchor" href="#部署测试" aria-hidden="true">#</a> 部署测试</h2>
<h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name nginx01 -p <span class="token number">3344</span>:80 nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>测试：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> localhost:3344
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>结果：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Welcome to nginx!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
            <span class="token selector">html</span> <span class="token punctuation">{</span> <span class="token property">color-scheme</span><span class="token punctuation">:</span> light dark<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token selector">body</span> <span class="token punctuation">{</span> <span class="token property">width</span><span class="token punctuation">:</span> 35em<span class="token punctuation">;</span> <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
                <span class="token property">font-family</span><span class="token punctuation">:</span> Tahoma<span class="token punctuation">,</span> Verdana<span class="token punctuation">,</span> Arial<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Welcome to nginx!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>If you see this page, the nginx web server is successfully installed and
            working. Further configuration is required.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>For online documentation and support please refer to
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://nginx.org/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>nginx.org<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span>
            Commercial support is available at
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://nginx.com/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>nginx.com<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>em</span><span class="token punctuation">></span></span>Thank you for using nginx.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>em</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220104211904044.png" alt="image-20220104211904044" loading="lazy"></p>
<h3 id="tomcat以及启动时-rm命令" tabindex="-1"><a class="header-anchor" href="#tomcat以及启动时-rm命令" aria-hidden="true">#</a> Tomcat以及启动时--rm命令</h3>
<p>关于tomcat 可以在其<a href="https://hub.docker.com/_/tomcat" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>中看到这样一条启动命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -it --rm -p <span class="token number">8888</span>:8080 tomcat:9.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这个<code>--rm</code>意思其实非产简单---用完就自动的删除（退出后自动执行docker rm xxx）</p>
<p>但是image不会删除</p>
<p>接着访问 404 正常</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104214250828.png" alt="image-20220104214250828" loading="lazy"></p>
<p>说明我们的tomcat下没有配置root</p>
<p>我们退出 后台启动并进入一下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name tomcat -p <span class="token number">8888</span>:8080 tomcat:9.0
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it tomcat <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220104214744642.png" alt="image-20220104214744642" loading="lazy"></p>
<p>可以看到 有两个webapps文件夹 已知webapps里面没有东西</p>
<p>所以我们看看webapps.dist</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104214827117.png" alt="image-20220104214827117" loading="lazy"></p>
<p>果真都在这</p>
<p>所以把他重命名即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rm</span> -rf webapps/
<span class="token function">mv</span> webapps.dist/ webapps
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>接着访问，东西就有了</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104215004188.png" alt="image-20220104215004188" loading="lazy"></p>
<h3 id="elasticsearch-kibana图形化面板" tabindex="-1"><a class="header-anchor" href="#elasticsearch-kibana图形化面板" aria-hidden="true">#</a> ElasticSearch+Kibana图形化面板</h3>
<p>md 不太想部署这个玩意 主要是太费内存了</p>
<p>首先看看<a href="https://hub.docker.com/_/elasticsearch" target="_blank" rel="noopener noreferrer">部署文档<ExternalLinkIcon/></a></p>
<p>他需要两行命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 这里是创建一个网关 之后会说</span>
<span class="token function">docker</span> network create somenetwork
<span class="token comment"># -e是额外的参数 -net是指定网关</span>
<span class="token function">docker</span> run -d --name elasticsearch --net somenetwork -p <span class="token number">9200</span>:9200 -p <span class="token number">9300</span>:9300 -e <span class="token string">"discovery.type=single-node"</span> elasticsearch:7.16.2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>启动完毕后 如果你的服务器是1g2h，建议不要这样做…</p>
<p>你可以输入：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> stats
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查看服务状态</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104215807989.png" alt="image-20220104215807989" loading="lazy"></p>
<p>md 两个G太卡了吧这</p>
<p>接下来测试下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> localhost:9200
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>结果</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"81343bfa8cac"</span><span class="token punctuation">,</span>
  <span class="token property">"cluster_name"</span> <span class="token operator">:</span> <span class="token string">"docker-cluster"</span><span class="token punctuation">,</span>
  <span class="token property">"cluster_uuid"</span> <span class="token operator">:</span> <span class="token string">"U-jQ8AFxSFOS2mfEVHbsJw"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"number"</span> <span class="token operator">:</span> <span class="token string">"7.16.2"</span><span class="token punctuation">,</span>
    <span class="token property">"build_flavor"</span> <span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
    <span class="token property">"build_type"</span> <span class="token operator">:</span> <span class="token string">"docker"</span><span class="token punctuation">,</span>
    <span class="token property">"build_hash"</span> <span class="token operator">:</span> <span class="token string">"2b937c44140b6559905130a8650c64dbd0879cfb"</span><span class="token punctuation">,</span>
    <span class="token property">"build_date"</span> <span class="token operator">:</span> <span class="token string">"2021-12-18T19:42:46.604893745Z"</span><span class="token punctuation">,</span>
    <span class="token property">"build_snapshot"</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">"lucene_version"</span> <span class="token operator">:</span> <span class="token string">"8.10.1"</span><span class="token punctuation">,</span>
    <span class="token property">"minimum_wire_compatibility_version"</span> <span class="token operator">:</span> <span class="token string">"6.8.0"</span><span class="token punctuation">,</span>
    <span class="token property">"minimum_index_compatibility_version"</span> <span class="token operator">:</span> <span class="token string">"6.0.0-beta1"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"tagline"</span> <span class="token operator">:</span> <span class="token string">"You Know, for Search"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>问题来了：我们改如何控制它的内存</p>
<p>在它的docker hub主页面内 可以看到一个<a href="https://www.elastic.co/guide/en/elasticsearch/reference/index.html" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a></p>
<p>点进去 找到自己的版本</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104220233176.png" alt="image-20220104220233176" loading="lazy"></p>
<p>emm不对啊 我们用过es  可以通过修改配置文件来解决啊</p>
<p>我们先kill这个玩意</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> -f elasticsearch
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后重新指定参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name elasticsearch --net somenetwork -p <span class="token number">9200</span>:9200 -p <span class="token number">9300</span>:9300 -e <span class="token string">"discovery.type=single-node"</span> -e <span class="token assign-left variable">ES_JAVA_OPTS</span><span class="token operator">=</span><span class="token string">"-Xms64m -Xmx512m"</span> elasticsearch:7.16.2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里是给他启动的时候加参数  我们加了一个jvm的内存限制参数</p>
<p>嘛，JVM的大概就是<a href="https://www.cnblogs.com/likehua/p/3369823.html" target="_blank" rel="noopener noreferrer">这些<ExternalLinkIcon/></a>，目前来说也只需要知道这些就行了，这里就类似于</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>java xxx.class -Xms64m -Xmx512m discovery.type<span class="token operator">=</span>single-node
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220104220735753.png" alt="image-20220104220735753" loading="lazy"></p>
<p>是不是好多了</p>
<p>再访问下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> localhost:9200
<span class="token comment"># 结果</span>
<span class="token punctuation">{</span>
  <span class="token string">"name"</span> <span class="token builtin class-name">:</span> <span class="token string">"d9715b359c73"</span>,
  <span class="token string">"cluster_name"</span> <span class="token builtin class-name">:</span> <span class="token string">"docker-cluster"</span>,
  <span class="token string">"cluster_uuid"</span> <span class="token builtin class-name">:</span> <span class="token string">"VjWWATzsTKWEreDkUfjoPg"</span>,
  <span class="token string">"version"</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"number"</span> <span class="token builtin class-name">:</span> <span class="token string">"7.16.2"</span>,
    <span class="token string">"build_flavor"</span> <span class="token builtin class-name">:</span> <span class="token string">"default"</span>,
    <span class="token string">"build_type"</span> <span class="token builtin class-name">:</span> <span class="token string">"docker"</span>,
    <span class="token string">"build_hash"</span> <span class="token builtin class-name">:</span> <span class="token string">"2b937c44140b6559905130a8650c64dbd0879cfb"</span>,
    <span class="token string">"build_date"</span> <span class="token builtin class-name">:</span> <span class="token string">"2021-12-18T19:42:46.604893745Z"</span>,
    <span class="token string">"build_snapshot"</span> <span class="token builtin class-name">:</span> false,
    <span class="token string">"lucene_version"</span> <span class="token builtin class-name">:</span> <span class="token string">"8.10.1"</span>,
    <span class="token string">"minimum_wire_compatibility_version"</span> <span class="token builtin class-name">:</span> <span class="token string">"6.8.0"</span>,
    <span class="token string">"minimum_index_compatibility_version"</span> <span class="token builtin class-name">:</span> <span class="token string">"6.0.0-beta1"</span>
  <span class="token punctuation">}</span>,
  <span class="token string">"tagline"</span> <span class="token builtin class-name">:</span> <span class="token string">"You Know, for Search"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>接下来再启动下kibana</p>
<p>这个非常简单，看下<a href="https://hub.docker.com/_/kibana" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<p>两条命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network create somenetwork
<span class="token function">docker</span> run -d --name kibana --net somenetwork -p <span class="token number">5601</span>:5601 kibana:tag
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>我们之前已经创建过网关了，所以第一条不需要 只需要第二条即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name kibana --net somenetwork -p <span class="token number">5601</span>:5601 kibana:7.16.2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接着等待一会儿，浏览器进入5601就可以了</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104221743328.png" alt="image-20220104221743328" loading="lazy"></p>
<h3 id="docker可视化web图形管理页面" tabindex="-1"><a class="header-anchor" href="#docker可视化web图形管理页面" aria-hidden="true">#</a> Docker可视化web图形管理页面</h3>
<p>这里先使用<strong>Portainer</strong></p>
<p><a href="https://docs.portainer.io/v/ce-2.9/start/install/agent/docker/linux" target="_blank" rel="noopener noreferrer">https://docs.portainer.io/v/ce-2.9/start/install/agent/docker/linux<ExternalLinkIcon/></a></p>
<p>一条命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d -p <span class="token number">9001</span>:9001 --name portainer_agent --restart<span class="token operator">=</span>always --privileged<span class="token operator">=</span>true -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker/volumes:/var/lib/docker/volumes cr.portainer.io/portainer/agent:2.9.3
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>restart指的是会跟随系统启动而启动</p>
<p>-v 是映射本地路径</p>
<p>–privileged是授权让其能访问docker和其他对应数据的</p>
<p>当然也有国人汉化版本的</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> search portainer
<span class="token comment"># 结果：</span>
NAME                                DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
<span class="token number">6053537</span>/portainer-ce                portainer-ce中文汉化版                               <span class="token number">16</span>
lihaixin/portainer                  <span class="token function">docker</span> ui                                       <span class="token number">15</span>                   <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
<span class="token number">6053537</span>/portainer                   portainer中文版，完整汉化，汉化程度95%以上                     <span class="token number">6</span>
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>所以我们只需要：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d -p <span class="token number">9000</span>:9001 --name portainer_agent --restart<span class="token operator">=</span>always --privileged<span class="token operator">=</span>true -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker/volumes:/var/lib/docker/volumes <span class="token number">6053537</span>/portainer-ce
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我这里省事 设置了9k</p>
<p>等待他部署好，访问<code>9000</code>端口设置账号密码即可</p>
<p>接下来看看最终效果</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104222935979.png" alt="image-20220104222935979" loading="lazy"></p>
<h2 id="docker镜像说明" tabindex="-1"><a class="header-anchor" href="#docker镜像说明" aria-hidden="true">#</a> Docker镜像说明</h2>
<h3 id="镜像是啥" tabindex="-1"><a class="header-anchor" href="#镜像是啥" aria-hidden="true">#</a> 镜像是啥</h3>
<p>镜像是一个轻量级，可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需要的所有内容，包括代码、运行时的库、环境变量和配置文件</p>
<p>所有的应用，直接打包成docker镜像，就可以跑起来</p>
<p>如何得到镜像</p>
<ul>
<li>从远程仓库clone</li>
<li>从朋友那嫖</li>
<li>自己制作一个镜像Dockerfile</li>
</ul>
<h3 id="docker镜像加载原理" tabindex="-1"><a class="header-anchor" href="#docker镜像加载原理" aria-hidden="true">#</a> Docker镜像加载原理</h3>
<blockquote>
<p>UnionFS（联合文件系统）</p>
</blockquote>
<p>这是一种分层、轻量级、高性能的文件系统，<strong>它支持对文件系统的修改作为一次提交来一层层叠加</strong>，同时可以将不同目录挂载到同一个虚拟文件系统下，UnionFS是Docker镜像的基础，镜像可以通过分层来继承（没有父镜像），可以制作各种具体的应用镜像</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104224728009.png" alt="image-20220104224728009" loading="lazy"></p>
<p>特性：一次性同时加载多个文件系统，从外表看起来，只看得到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统包含所有底层的文件目录</p>
<p>比如说我们先有两个 镜像 一个tomcat 一个mysql 都用上了同版本的ubuntu 然后他们其中一个的ubuntu将会公用（也就是有一方不需要启动ubuntu，直接用另外一个的）</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104224931947.png" alt="image-20220104224931947" loading="lazy"></p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104225352499.png" alt="image-20220104225352499" loading="lazy"></p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104225509194.png" alt="image-20220104225509194" loading="lazy"></p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104225522848.png" alt="image-20220104225522848" loading="lazy"></p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104225620567.png" alt="image-20220104225620567" loading="lazy"></p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104225645879.png" alt="image-20220104225645879" loading="lazy"></p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104230006641.png" alt="image-20220104230006641" loading="lazy"></p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104230123481.png" alt="image-20220104230123481" loading="lazy"></p>
<h2 id="✨commit镜像" tabindex="-1"><a class="header-anchor" href="#✨commit镜像" aria-hidden="true">#</a> ✨Commit镜像</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> commit 提交容器成为一个新的副本
<span class="token comment"># 命令和git类似</span>
<span class="token function">docker</span> commit -m<span class="token operator">=</span><span class="token string">"提交的描述信息"</span> -a<span class="token operator">=</span><span class="token string">"作者"</span> 容器id 目标镜像名:<span class="token punctuation">[</span>Tag<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>我们先启动一个镜像 并做一些修改</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name tomcat -p <span class="token number">8888</span>:8080 -d tomcat
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it tomcat <span class="token function">bash</span>
<span class="token function">mv</span> webapps.dist/* webapps/
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>接下来提交</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> commit -a<span class="token operator">=</span><span class="token string">"一个平平淡淡的人"</span> -m<span class="token operator">=</span><span class="token string">"add webapps app"</span> tomcat tomcat02:1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接下来你就能在<code>dokcer images</code>中看到它了</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104231223999.png" alt="image-20220104231223999" loading="lazy"></p>
<p>以后我们就可以直接使用我们修改过后的镜像了</p>
<p>先把正在用的镜像删掉</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> -f tomcat
<span class="token comment"># 再启动自己的</span>
<span class="token function">docker</span> run --name myTomcat -p <span class="token number">8888</span>:8080 -d tomcat02:1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>接下来</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">curl</span> localhost:8888
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>你就能看到我们之前整的内容了</p>
<p>这玩意就像是Git一样 方便快捷好用</p>
<p>好，如果你看到了这里，恭喜你，你已经真正的<strong>入门</strong>了Docker</p>
<h2 id="✨容器数据卷" tabindex="-1"><a class="header-anchor" href="#✨容器数据卷" aria-hidden="true">#</a> ✨容器数据卷</h2>
<h3 id="概述-1" tabindex="-1"><a class="header-anchor" href="#概述-1" aria-hidden="true">#</a> 概述</h3>
<p>我们的数据如果都存储在容器之中，那么只要容器一删除，数据就会丢失</p>
<p>现在有一个需求：让数据持久化到本地硬盘，例如Mysql的</p>
<p>所以说我们可以通过配置容器数据卷 来让数据存储到本地 从而实现持久化</p>
<p>这就是卷技术--人话：将我们容器的目录，挂载到Linux上面</p>
<h3 id="使用数据卷-映射" tabindex="-1"><a class="header-anchor" href="#使用数据卷-映射" aria-hidden="true">#</a> 使用数据卷-映射</h3>
<blockquote>
<p>方式一：直接使用命令来挂载 <code>-v</code></p>
<p>-v 表示， 初始化时，主机目录/文件 覆盖容器目录/文件 之后开始双向同步</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -it -v 主机目录:容器内目录 可以配置多个 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>例如我们把自己之前创建的tomcat镜像内的webappss存放在</p>
<p><code>/home/root/java/webappss</code>这个目录下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name testTomcat -d -p <span class="token number">8888</span>:8080 -v /home/你的用户名/java/webapps:/usr/local/tomcat/webapps tomcat
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接着你会发现无论是容器内还是外部的文件内 都没有任何内容</p>
<p>但是我们可以自己手动添加一个</p>
<p>首先在自己的tomcat目录下新建一个ROOT文件夹和一个index.html，html文件内写一个Hello World（注意 要root权限）</p>
<p>接着curl测试下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">curl</span> localhost:8888
 <span class="token comment"># 结果</span>
 Hello World
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>我们继续看下这个容器的信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> inspect testTomcat
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>可以看到一个信息</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"Mounts"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Type"</span><span class="token operator">:</span> <span class="token string">"bind"</span><span class="token punctuation">,</span>
        <span class="token comment">// 本机地址</span>
        <span class="token property">"Source"</span><span class="token operator">:</span> <span class="token string">"/home/root/java/webapps"</span><span class="token punctuation">,</span>
        <span class="token comment">// 容器内地址</span>
        <span class="token property">"Destination"</span><span class="token operator">:</span> <span class="token string">"/usr/local/tomcat/webapps"</span><span class="token punctuation">,</span>
        <span class="token property">"Mode"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        <span class="token property">"RW"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">"Propagation"</span><span class="token operator">:</span> <span class="token string">"rprivate"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>接下来我们尝试在这个docker容器内加一点东西</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it testTomcat <span class="token function">bash</span>
<span class="token builtin class-name">cd</span> webapps
<span class="token function">mkdir</span> home 
<span class="token builtin class-name">echo</span> <span class="token string">"Hello Home"</span><span class="token operator">></span>index.html
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>接着返回本机 可以看到 本地的路径下也多了个文件夹</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104234146298.png" alt="image-20220104234146298" loading="lazy"></p>
<p>接着我们访问下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> localhost:8888/home/
<span class="token comment"># 结果：Hello Home</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>当然 也可以指定文件 例如nginx制定本机的配置文件映射到容器内 这里就不多做讨论了</p>
<h3 id="具名挂载和匿名挂载" tabindex="-1"><a class="header-anchor" href="#具名挂载和匿名挂载" aria-hidden="true">#</a> 具名挂载和匿名挂载</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 匿名挂载</span>
-v 容器内路径（这个的主机地址之后会说到） 或者 主机路径:容器路径
<span class="token comment"># 这样会自动生成主机路径</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>你可以通过</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>来查看映射卷</p>
<p>通常来说是这样的</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220104235934545.png" alt="image-20220104235934545" loading="lazy"></p>
<p>就相当于是Java的匿名内部类一样</p>
<p>当然 查看想要的卷的信息也非常简单</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> inspect 卷名，例如：0ad3c188c086845507bb70c08b8f0763f5d6f210b92d0529fcd56abbd9edc2ae
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>结果：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"CreatedAt"</span><span class="token operator">:</span> <span class="token string">"2021-09-26T14:46:54+08:00"</span><span class="token punctuation">,</span>
        <span class="token property">"Driver"</span><span class="token operator">:</span> <span class="token string">"local"</span><span class="token punctuation">,</span>
        <span class="token property">"Labels"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">"Mountpoint"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/volumes/0ad3c188c086845507bb70c08b8f0763f5d6f210b92d0529fcd56abbd9edc2ae/_data"</span><span class="token punctuation">,</span>
        <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"0ad3c188c086845507bb70c08b8f0763f5d6f210b92d0529fcd56abbd9edc2ae"</span><span class="token punctuation">,</span>
        <span class="token property">"Options"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">"Scope"</span><span class="token operator">:</span> <span class="token string">"local"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>如果要使用具名挂载的话，只需要：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> run -d -p <span class="token number">5333</span>:80 --name test_nginx -v nginx-test:/etc/nginx nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>接着查看：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> volume <span class="token function">ls</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220105000827945.png" alt="image-20220105000827945" loading="lazy"></p>
<p>接着看看他的信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> inspect nginx-test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">"CreatedAt"</span><span class="token builtin class-name">:</span> <span class="token string">"2022-01-05T00:07:04+08:00"</span>,
        <span class="token string">"Driver"</span><span class="token builtin class-name">:</span> <span class="token string">"local"</span>,
        <span class="token string">"Labels"</span><span class="token builtin class-name">:</span> null,
        <span class="token string">"Mountpoint"</span><span class="token builtin class-name">:</span> <span class="token string">"/var/lib/docker/volumes/nginx-test/_data"</span>,
        <span class="token string">"Name"</span><span class="token builtin class-name">:</span> <span class="token string">"nginx-test"</span>,
        <span class="token string">"Options"</span><span class="token builtin class-name">:</span> null,
        <span class="token string">"Scope"</span><span class="token builtin class-name">:</span> <span class="token string">"local"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>挂载到了<code>/var/lib/docker/volumes/赋予的数据卷的名称/_data目录下</code></p>
<p>所以docker所有没有指定的 都在这</p>
<h3 id="总结以及读写权限" tabindex="-1"><a class="header-anchor" href="#总结以及读写权限" aria-hidden="true">#</a> 总结以及读写权限</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 指定路径挂载形式</span>
<span class="token punctuation">-</span>v 容器内路径 <span class="token comment"># 匿名挂载</span>
<span class="token punctuation">-</span>v 卷名<span class="token punctuation">:</span>容器内路径 <span class="token comment"># 具名挂载</span>
<span class="token punctuation">-</span>v 主机路径<span class="token punctuation">:</span>容器内路径 <span class="token comment"># 指定路径挂载</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后还有一个参数</p>
<p>例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d -p <span class="token number">80</span>:80 nginx -v jump-nginx:/etc/nginx:ro nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这个-ro</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>:ro <span class="token comment">#表示只读 readonly</span>
:rw <span class="token comment">#表示可读可写 readwrite</span>
<span class="token comment"># 如果设置了ro，容器内将无法修改该文件 只能读取该文件</span>

反正看到ro就说明该路径只能是我们主机来操作，容器内部是无法修改的，默认是rw，
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="一个最简单的dockerfile" tabindex="-1"><a class="header-anchor" href="#一个最简单的dockerfile" aria-hidden="true">#</a> 一个最简单的dockerfile</h3>
<p>可以把这个理解为用文件来替代我们手动commit镜像</p>
<p>我们随便找一个文件夹，里面创建一个dockerfile01，无需后缀</p>
<p>然后填入如下内容</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment">#  文件中的内容分为指令和参数 指令大小写不敏感</span>

<span class="token comment"># 导入ubuntu镜像</span>
<span class="token instruction"><span class="token keyword">from</span> ubuntu</span>

<span class="token comment"># 镜像的挂载卷 这里可以指定多个 等同于 -v</span>
<span class="token instruction"><span class="token keyword">volume</span> [<span class="token string">"volume01"</span>,<span class="token string">"volume02"</span>]</span>

<span class="token comment"># 我们要执行的命令</span>
<span class="token instruction"><span class="token keyword">cmd</span> echo <span class="token string">"---end---"</span></span>
<span class="token instruction"><span class="token keyword">cmd</span> /bin/bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>然后在控制台输入如下命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build -f ./dockerfile01 -t my/ubuntu:1.0 <span class="token builtin class-name">.</span>
<span class="token comment">#      构建   通过文件           打上表桥          注意这个点</span>

<span class="token comment"># 结果：</span>
Sending build context to Docker daemon  <span class="token number">2</span>.048kB
Step <span class="token number">1</span>/4 <span class="token builtin class-name">:</span> from ubuntu
 ---<span class="token operator">></span> ba6acccedd29
Step <span class="token number">2</span>/4 <span class="token builtin class-name">:</span> volume <span class="token punctuation">[</span><span class="token string">"volume01"</span>,<span class="token string">"volume02"</span><span class="token punctuation">]</span>
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 05a165d67ad3
Removing intermediate container 05a165d67ad3
 ---<span class="token operator">></span> fe33c84c3f12
Step <span class="token number">3</span>/4 <span class="token builtin class-name">:</span> cmd <span class="token builtin class-name">echo</span> <span class="token string">"---end---"</span>
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> a8e799afcc38
Removing intermediate container a8e799afcc38
 ---<span class="token operator">></span> bef8e13dba1a
Step <span class="token number">4</span>/4 <span class="token builtin class-name">:</span> cmd /bin/bash
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 5a946a331840
Removing intermediate container 5a946a331840
 ---<span class="token operator">></span> 2b87daccb8f7
Successfully built 2b87daccb8f7
Successfully tagged my/ubuntu:1.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>接着我们run一下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> run -it my/ubuntu:1.0
 
 <span class="token comment"># 然后看看容器内文件</span>
 <span class="token function">ls</span> - l
 
 <span class="token comment"># 结果</span>
 total <span class="token number">56</span>
lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">7</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 bin -<span class="token operator">></span> usr/bin
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Apr <span class="token number">15</span>  <span class="token number">2020</span> boot
drwxr-xr-x   <span class="token number">5</span> root root  <span class="token number">360</span> Jan  <span class="token number">5</span> 04:42 dev
drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Jan  <span class="token number">5</span> 04:42 etc
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Apr <span class="token number">15</span>  <span class="token number">2020</span> home
lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">7</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 lib -<span class="token operator">></span> usr/lib
lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">9</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 lib32 -<span class="token operator">></span> usr/lib32
lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">9</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 lib64 -<span class="token operator">></span> usr/lib64
lrwxrwxrwx   <span class="token number">1</span> root root   <span class="token number">10</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 libx32 -<span class="token operator">></span> usr/libx32
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 media
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 mnt
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 opt
dr-xr-xr-x <span class="token number">241</span> root root    <span class="token number">0</span> Jan  <span class="token number">5</span> 04:42 proc
drwx------   <span class="token number">2</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:58 root
drwxr-xr-x   <span class="token number">5</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:58 run
lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">8</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 sbin -<span class="token operator">></span> usr/sbin
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 srv
dr-xr-xr-x  <span class="token number">13</span> root root    <span class="token number">0</span> Jan  <span class="token number">5</span> 04:42 sys
drwxrwxrwt   <span class="token number">2</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:58 tmp
drwxr-xr-x  <span class="token number">13</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:47 usr
drwxr-xr-x  <span class="token number">11</span> root root <span class="token number">4096</span> Oct  <span class="token number">6</span> <span class="token number">16</span>:58 var
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Jan  <span class="token number">5</span> 04:42 volume01
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Jan  <span class="token number">5</span> 04:42 volume02
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>可以看到 最后两个目录，就是我们生成镜像的时候自动挂载的数据卷目录</p>
<p>也就是说 这个卷一定是和外部有一个卷是同步的</p>
<p>但我们之前是<code> volume [&quot;volume01&quot;,&quot;volume02&quot;]</code></p>
<p>匿名挂载的 所以说得通过<code>inspect</code>来查看</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"Mounts"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Type"</span><span class="token operator">:</span> <span class="token string">"volume"</span><span class="token punctuation">,</span>
        <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"6ee8e6c78e4b01f488d22cb35aa55d87713d540e01b45908399e830751222bea"</span><span class="token punctuation">,</span>
        <span class="token property">"Source"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/volumes/6ee8e6c78e4b01f488d22cb35aa55d87713d540e01b45908399e830751222bea/_data"</span><span class="token punctuation">,</span>
        <span class="token property">"Destination"</span><span class="token operator">:</span> <span class="token string">"volume01"</span><span class="token punctuation">,</span>
        <span class="token property">"Driver"</span><span class="token operator">:</span> <span class="token string">"local"</span><span class="token punctuation">,</span>
        <span class="token property">"Mode"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        <span class="token property">"RW"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">"Propagation"</span><span class="token operator">:</span> <span class="token string">""</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Type"</span><span class="token operator">:</span> <span class="token string">"volume"</span><span class="token punctuation">,</span>
        <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"26efe6b8dfad81f3985149cd14daf4f26b44c115a88b89f61ca76c5584b123f8"</span><span class="token punctuation">,</span>
        <span class="token property">"Source"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/volumes/26efe6b8dfad81f3985149cd14daf4f26b44c115a88b89f61ca76c5584b123f8/_data"</span><span class="token punctuation">,</span>
        <span class="token property">"Destination"</span><span class="token operator">:</span> <span class="token string">"volume02"</span><span class="token punctuation">,</span>
        <span class="token property">"Driver"</span><span class="token operator">:</span> <span class="token string">"local"</span><span class="token punctuation">,</span>
        <span class="token property">"Mode"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        <span class="token property">"RW"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">"Propagation"</span><span class="token operator">:</span> <span class="token string">""</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="多个容器之间数据卷共享" tabindex="-1"><a class="header-anchor" href="#多个容器之间数据卷共享" aria-hidden="true">#</a> 多个容器之间数据卷共享</h3>
<p>注意，这个玩意貌似不能实现mysql之类的数据共享</p>
<p>我们先启动一个</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> run -it --name docker01 my/ubuntu:1.0
 <span class="token comment"># 进入后 ctrl+pq暂时退出</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>之前制作过对应的镜像 所以他有两个挂载卷 volume01 和02</p>
<p>我现在想让另一个容器来继承它 和它使用同一个数据卷，只需要</p>
<p>语法：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -it -name 容器名 --volumes-from 父容器 父容器名 镜像
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>实例：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> run -it --name docker02 --volumes-from docker01 my/ubuntu:1.0
 <span class="token comment">#								让容器的数据卷继承指定的容器</span>
 <span class="token comment"># 接着进入docker01容器</span>
  <span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it docker01 <span class="token function">bash</span>
  <span class="token comment"># 接下来 cd 到 v1 然后 touch aaa.txt 并ctrl+pq退出</span>
 <span class="token comment">#接着进入第二个容器</span>
 <span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it docker02 <span class="token function">bash</span>
 <span class="token builtin class-name">cd</span> ./volume01
 <span class="token function">ls</span>
 <span class="token comment"># 然后你就能看到刚刚创建的文件</span>
 <span class="token comment"># 同时你还可以 echo "bbb">bb.txt，然后进入docker01容器查看 他们两之间的数据是互通的</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这个继承是可以套娃的，就像是Java那样</p>
<p>你可以写多个东西来继承docker01 或者docker02 嘛都会自动挂载</p>
<p>并且之后你删掉1 另外两个依旧会共享数据</p>
<p>当然 你可以用portainer来看差数据卷的共享情况，一目了然</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220105131700746.png" alt="image-20220105131700746" loading="lazy"></p>
<p>volumes-from就是捆绑多少个就多少个数据卷共享，即使docker01被停止</p>
<h2 id="✨dockerfile" tabindex="-1"><a class="header-anchor" href="#✨dockerfile" aria-hidden="true">#</a> ✨Dockerfile</h2>
<p>dockerfile是用来构建docker镜像文件的命令参数脚本</p>
<p>构建步骤：</p>
<ul>
<li>编写一个dockerfile文件</li>
<li>docker build成为一个镜像</li>
<li>docker run 运行镜像</li>
<li>docker push 发布镜像（Dockerhub 或者腾讯阿里云之类的）</li>
</ul>
<p>我们先来看看一般的镜像是怎么样的，例如<a href="https://hub.docker.com/_/ubuntu" target="_blank" rel="noopener noreferrer">ubuntu<ExternalLinkIcon/></a></p>
<p>进去后，它有一个链接</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220105140313843.png" alt="image-20220105140313843" loading="lazy"></p>
<p>点击会发现跳转到了github</p>
<p><a href="https://github.com/tianon/docker-brew-ubuntu-core/blob/bf61e139e84e04f9d87fff5dc588a3f0398da627/focal/Dockerfile" target="_blank" rel="noopener noreferrer">https://github.com/tianon/docker-brew-ubuntu-core/blob/bf61e139e84e04f9d87fff5dc588a3f0398da627/focal/Dockerfile<ExternalLinkIcon/></a></p>
<p>然后得到如下内容</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># 这是最基本的镜像 可以理解为Java的Object类</span>
<span class="token instruction"><span class="token keyword">FROM</span> scratch</span>
<span class="token instruction"><span class="token keyword">ADD</span> ubuntu-focal-oci-amd64-root.tar.gz /</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"bash"</span>]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220105141103036.png" alt="image-20220105141103036" loading="lazy"></p>
<p><img src="/images/SpringCloud/00-Docker/image-20220105140848278.png" alt="image-20220105140848278" loading="lazy"></p>
<h3 id="dockerfile命令一览" tabindex="-1"><a class="header-anchor" href="#dockerfile命令一览" aria-hidden="true">#</a> Dockerfile命令一览</h3>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">from</span> 		#	基础镜像，一切重这里开始构建</span>
<span class="token instruction"><span class="token keyword">maintainer</span> 	#	镜像是谁写的==姓名+邮箱</span>
<span class="token instruction"><span class="token keyword">label</span> 		#	同上 目前来说一般通过这个来制定姓名+邮箱</span>
<span class="token instruction"><span class="token keyword">run</span> 		#	镜像构建的时候要运行的命令</span>
<span class="token instruction"><span class="token keyword">add</span> 		#	添加别的内容 例如添加一个tomcat.tar.gz压缩包的内容</span>
<span class="token instruction"><span class="token keyword">workdir</span> 	#	镜像的工作目录</span>
<span class="token instruction"><span class="token keyword">volume</span> 		#	挂载的目录 等同于 -v</span>
<span class="token instruction"><span class="token keyword">expose</span> 		#	保留端口配置 等同于-p</span>
<span class="token instruction"><span class="token keyword">cmd</span> 		#	指定这个容器启动的时候要运行的命令，一行只能写一个命令</span>
<span class="token instruction"><span class="token keyword">entrypoint</span>	#	指定这个容器启动的时候要运行的命令，可以最追加命令 （一行可以写多个命令）</span>
<span class="token instruction"><span class="token keyword">onbuild</span>		#	当构建一个被继承的Dockerfile的时候，就会运行onbuild中的指令，也就是一个触发指令</span>
<span class="token instruction"><span class="token keyword">copy</span>		#	类似于add命令，将我们的文件拷贝到镜像中</span>
<span class="token instruction"><span class="token keyword">env</span>			#	构建的时候设置环境变量</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220105141218399.png" alt="image-20220105141218399" loading="lazy"></p>
<ul>
<li>
<p>FROM-构建镜像基于哪个镜像</p>
</li>
<li>
<p>MAINTAINER-镜像维护者姓名或邮箱地址—目前官方已经不在推荐使用它，而是建议使用label来替代</p>
</li>
<li>
<p>RUN-构建镜像时运行的指令</p>
</li>
<li>
<p>CMD-运行容器时执行的shell环境</p>
</li>
<li>
<p>VOLUME-指定容器挂载点到宿主机自动生成的目录或其他容器</p>
</li>
<li>
<p>USER-为RUN、CMD、和 ENTRYPOINT 执行命令指定运行用户</p>
</li>
<li>
<p>WORKDIR-为 RUN、CMD、ENTRYPOINT、COPY 和 ADD 设置工作目录，就是切换目录</p>
</li>
<li>
<p>HEALTHCHECH-健康检查</p>
</li>
<li>
<p>ARG-构建时指定的一些参数</p>
</li>
<li>
<p>EXPOSE-声明容器的服务端口（仅仅是声明）</p>
</li>
<li>
<p>ENV-设置容器环境变量</p>
</li>
<li>
<p>ADD-拷贝文件或目录到容器中，如果是URL或压缩包便会自动下载或自动解压</p>
</li>
<li>
<p>COPY-拷贝文件或目录到容器中，跟ADD类似，但不具备自动下载或解压的功能</p>
</li>
<li>
<p>ENTRYPOINT 运行容器时执行的shell命令</p>
</li>
</ul>
<h3 id="构建一个自己的镜像" tabindex="-1"><a class="header-anchor" href="#构建一个自己的镜像" aria-hidden="true">#</a> 构建一个自己的镜像</h3>
<p>我们之前看ubuntu的时候，发现有一个特殊的镜像</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> scratch</span>
<span class="token instruction"><span class="token keyword">ADD</span> ubuntu-focal-oci-amd64-root.tar.gz /</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"bash"</span>]</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在<a href="https://docs.docker.com/develop/develop-images/baseimages/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>中，是这样说明的：</p>
<ul>
<li>一个<a href="https://docs.docker.com/glossary/#parent-image" target="_blank" rel="noopener noreferrer">父映像<ExternalLinkIcon/></a>是你的形象是基于图像。它指的是<code>FROM</code>Dockerfile 中指令的内容。Dockerfile 中的每个后续声明都会修改此父映像。大多数 Dockerfile 从父映像开始，而不是从基础映像开始。但是，这些术语有时可以互换使用。</li>
<li><a href="https://docs.docker.com/glossary/#base-image" target="_blank" rel="noopener noreferrer">基本图像<ExternalLinkIcon/></a>具有<code>FROM scratch</code>在其Dockerfile。</li>
</ul>
<p>也就是说，市面上百分之百的镜像都是依赖于它，它就相当于Java的Object类</p>
<p>例如：</p>
<p>PS：这样依旧安装不起vim 反正把run当做是bash命令即可</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># 指定基础镜像</span>
<span class="token instruction"><span class="token keyword">FROM</span> ubuntu</span>
<span class="token comment"># 设置作者</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> amayakite&lt;amayakite@qq.com></span>

<span class="token comment"># 添加一些我们自己的内容</span>
<span class="token instruction"><span class="token keyword">ENV</span> mypath /usr/local</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> <span class="token variable">$mypath</span></span>

<span class="token comment"># 构建时候的命令</span>
<span class="token comment"># 先添加下依赖</span>

<span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">'deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse \n\
           deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse \n\
           deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse \n\
           deb http://mirrors.aliyun.com/ubuntu/ xenial-proposed main restricted universe multiverse \n\
           deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial-proposed main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse \n'</span><span class="token operator">\</span>
              > /etc/apt/sources.list</span>
<span class="token instruction"><span class="token keyword">RUN</span> [<span class="token string">"apt-get"</span>, <span class="token string">"update"</span>]</span>
<span class="token instruction"><span class="token keyword">RUN</span> [<span class="token string">"apt-get"</span>,<span class="token string">"install"</span>,<span class="token string">" vim"</span>,<span class="token string">"-y"</span>]</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 663</span>

<span class="token instruction"><span class="token keyword">CMD</span> echo <span class="token variable">$mypath</span></span>
<span class="token instruction"><span class="token keyword">CMD</span> echo <span class="token string">"---end---"</span></span>
<span class="token instruction"><span class="token keyword">CMD</span> /bin/bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="查看镜像的构成方式" tabindex="-1"><a class="header-anchor" href="#查看镜像的构成方式" aria-hidden="true">#</a> 查看镜像的构成方式</h3>
<p>非常简单 例如我想看nginx是怎么样构成的</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">history</span> mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>结果</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>IMAGE          CREATED        CREATED BY                                      SIZE      COMMENT
0716d6ebcc1a   4 months ago   /bin/sh -c #(nop)  CMD ["mysqld"]               0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop)  EXPOSE 3306 33060            0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c ln -s usr/local/bin/docker-entryp…   34B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop) COPY file:345a22fe55d3e678…   14.5kB
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop) COPY dir:2e040acc386ebd23b…   1.12kB
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop)  VOLUME [/var/lib/mysql]      0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c {   echo mysql-community-server m…   378MB
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c echo 'deb http://repo.mysql.com/a…   55B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop)  ENV MYSQL_VERSION=8.0.26-…   0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop)  ENV MYSQL_MAJOR=8.0          0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c set -ex;  key='A4A9406876FCBD3C45…   1.84kB
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c apt-get update &amp;&amp; apt-get install…   52.2MB
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c mkdir /docker-entrypoint-initdb.d    0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c set -eux;  savedAptMark="$(apt-ma…   4.17MB
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop)  ENV GOSU_VERSION=1.12        0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c apt-get update &amp;&amp; apt-get install…   9.34MB
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c groupadd -r mysql &amp;&amp; useradd -r -…   329kB
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop)  CMD ["bash"]                 0B
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>missing</span><span class="token punctuation">></span></span>      4 months ago   /bin/sh -c #(nop) ADD file:4ff85d9f6aa246746…   69.3MB
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="cmd和entrypoint的区别" tabindex="-1"><a class="header-anchor" href="#cmd和entrypoint的区别" aria-hidden="true">#</a> cmd和entrypoint的区别</h3>
<p>例如：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">from</span> ubuntu</span>
<span class="token instruction"><span class="token keyword">cmd</span> [<span class="token string">"ls"</span>,<span class="token string">"-a"</span>]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>接着运行将会直接列出根路径下的所有内容</p>
<p>但是如果我想在运行的时候追加额外的参数</p>
<p>例如 这里是-a 我想</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run xxx -l
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>你就会发现报错</p>
<p>但是替换成这样</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run xx <span class="token function">ls</span> -al
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>将不会报错</p>
<p>RUN就是：我们在运行的时候输入的命令会替换掉其中的命令</p>
<p>但如果是entrypoint的话 则不会这样</p>
<p>docker run中的命令是直接替换CMD指定的命令与参数，使用ENTRYPOINT命令后，CMD指定的命令则是作为参数列表，作为ENTRYPOINT命令的参数使用</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">from</span> ubuntu</span>
<span class="token instruction"><span class="token keyword">entrypoint</span> [<span class="token string">"ls"</span>,<span class="token string">"-a"</span>]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>你再运行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run xxx -l
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>就能完整的模拟出<code>ls -al</code>的效果</p>
<h3 id="✨docker制作tomcat镜像" tabindex="-1"><a class="header-anchor" href="#✨docker制作tomcat镜像" aria-hidden="true">#</a> ✨docker制作tomcat镜像</h3>
<ol>
<li>准备文件：tomcat压缩包，jdk的压缩包</li>
<li>准备dockerfile文件</li>
</ol>
<p>首先下载java压缩包和tomcat压缩包</p>
<p>JDK：<a href="https://www.oracle.com/java/technologies/downloads/" target="_blank" rel="noopener noreferrer">https://www.oracle.com/java/technologies/downloads/<ExternalLinkIcon/></a>往下拉找到x64 Compressed Archive下载即可</p>
<p>Tomcat：<a href="https://tomcat.apache.org/download-90.cgi" target="_blank" rel="noopener noreferrer">https://tomcat.apache.org/download-90.cgi<ExternalLinkIcon/></a></p>
<p>然后传输到你的服务器上（创建好一个文件夹）</p>
<p>接着我们编写<code>DockerFIle</code>文件，记住这个名字 官方在build的时候会默认寻找这个文件</p>
<p>DockerFIle和那两个压缩包在同一个文件夹内</p>
<p>我这里最终是如下两个文件</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119174116464.png" alt="image-20220119174116464" loading="lazy"></p>
<p>接着创建<code>Dockerfile</code>，然后编写其中的内容</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu</span>

<span class="token instruction"><span class="token keyword">MAINTAINER</span> <span class="token string">"Amayakite"</span></span>

<span class="token comment"># 使用add命令添加文件会自动解压 这里第一个参数是文件名，相对路径</span>
<span class="token comment"># 第二个参数是容器内的路径，解压后的文件将会存放至该路径下</span>

<span class="token comment"># 添加jdk</span>
<span class="token instruction"><span class="token keyword">ADD</span> jdk-8u321-linux-x64.tar.gz /usr/local</span>

<span class="token comment"># 添加tomcat</span>
<span class="token instruction"><span class="token keyword">ADD</span> apache-tomcat-9.0.56.tar.gz /usr/local</span>

<span class="token comment"># 设置工作目录</span>
<span class="token instruction"><span class="token keyword">ENV</span> MYPATH=/usr/local</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> <span class="token variable">$MYPATH</span></span>

<span class="token comment"># 设置JAva的工作目录 这里填写解压后的路径 jdk压缩包解压后默认是还有一个文件夹</span>
<span class="token comment"># 里面是一个Java的版本号：例如:jdk1.8.0_111</span>
<span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME=/usr/local/jdk1.8.0_321</span>

<span class="token instruction"><span class="token keyword">ENV</span> CLASSSPATH=<span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar</span>

<span class="token comment"># 配置tomcat目录</span>
<span class="token instruction"><span class="token keyword">ENV</span> CATALINA_HOME=/usr/local/apache-tomcat-9.0.56</span>

<span class="token comment"># 设置tomcat的运行目录</span>
<span class="token instruction"><span class="token keyword">ENV</span> PATH=<span class="token variable">$PATH</span>:<span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$CATALINA_HOME</span>/lib:<span class="token variable">$CATALINA_HOME</span>/bin</span>

<span class="token comment">## 启动后暴露的端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span>

<span class="token comment"># 启动时运行的命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> <span class="token variable">$CATALINA_HOME</span>/bin/startup.sh &amp;&amp; tail -F <span class="token variable">$CATALINA_HOME</span>/logs/catalina.out</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>接下来运行构建命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build -t mytomcat <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果不出意外，你的控制台应该打印如下内容</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119180519935.png" alt="image-20220119180519935" loading="lazy"></p>
<p>接下来你可以通过<code>docker images</code>看到你刚刚创建的镜像</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119180547179.png" alt="image-20220119180547179" loading="lazy"></p>
<p>emm事后我发现事情并没有我想的那么简单</p>
<p><strong>下载的jdk无法自动解压</strong></p>
<p>于是乎我分别尝试了如下几种方式</p>
<p>使用OpenLogic的<a href="https://www.openlogic.com/openjdk-downloads?field_java_parent_version_target_id=416&amp;field_operating_system_target_id=426&amp;field_architecture_target_id=391&amp;field_java_package_target_id=396" target="_blank" rel="noopener noreferrer">JDK<ExternalLinkIcon/></a></p>
<p>在下载的时候，我突然想到，阿里巴巴不是也有jdk来着，于是也尝试了下阿里巴巴的<a href="https://github.com/alibaba/dragonwell8" target="_blank" rel="noopener noreferrer">JDK<ExternalLinkIcon/></a></p>
<p>但是当我想要下载阿里巴巴的jdk的时候，那啥open啥啥啥的jdk下载好了，于是我就用上了它家的</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu</span>

<span class="token instruction"><span class="token keyword">MAINTAINER</span> <span class="token string">"Amayakite"</span></span>

<span class="token comment"># 使用add命令添加文件会自动解压 这里第一个参数是文件名，相对路径</span>
<span class="token comment"># 第二个参数是容器内的路径，解压后的文件将会存放至该路径下</span>

<span class="token comment"># 添加jdk</span>
<span class="token instruction"><span class="token keyword">ADD</span> openlogic-openjdk-8u262-b10-linux-x64.tar.gz /usr/local</span>

<span class="token comment"># 添加tomcat</span>
<span class="token instruction"><span class="token keyword">ADD</span> apache-tomcat-9.0.56.tar.gz /usr/local</span>

<span class="token comment"># 设置工作目录</span>
<span class="token instruction"><span class="token keyword">ENV</span> MYPATH=/usr/local</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> <span class="token variable">$MYPATH</span></span>

<span class="token comment"># 设置JAva的工作目录 这里填写解压后的路径 jdk压缩包解压后默认是还有一个文件夹</span>
<span class="token comment"># 里面是一个Java的版本号：例如:jdk1.8.0_111</span>
<span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME=/usr/local/openlogic-openjdk-8u262-b10-linux-64</span>

<span class="token instruction"><span class="token keyword">ENV</span> CLASSSPATH=<span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar</span>

<span class="token comment"># 配置tomcat目录</span>
<span class="token instruction"><span class="token keyword">ENV</span> CATALINA_HOME=/usr/local/apache-tomcat-9.0.56</span>

<span class="token comment"># 设置tomcat的运行目录</span>
<span class="token instruction"><span class="token keyword">ENV</span> PATH=<span class="token variable">$PATH</span>:<span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$CATALINA_HOME</span>/lib:<span class="token variable">$CATALINA_HOME</span>/bin</span>

<span class="token comment">## 启动后暴露的端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span>



<span class="token comment"># 启动时运行的命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> <span class="token variable">$CATALINA_HOME</span>/bin/startup.sh &amp;&amp; tail -F <span class="token variable">$CATALINA_HOME</span>/logs/catalina.out</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>成功运行</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119193933882.png" alt="image-20220119193933882" loading="lazy"></p>
<p>然后尝试访问（我这里开的映射是9001）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> localhost:9001
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>成功获取到结果</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119194007032.png" alt="image-20220119194007032" loading="lazy"></p>
<p>并且可以看到容器内都有内容了</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119194245470.png" alt="image-20220119194245470" loading="lazy"></p>
<p>当然你也可以选择挂载卷之类的。。</p>
<h3 id="发布自己的tomcat到dockerhub" tabindex="-1"><a class="header-anchor" href="#发布自己的tomcat到dockerhub" aria-hidden="true">#</a> 发布自己的tomcat到dockerhub</h3>
<ol>
<li>
<p>注册账号<a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">https://hub.docker.com/<ExternalLinkIcon/></a></p>
</li>
<li>
<p>登陆账号</p>
<ol>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> login --help
<span class="token comment"># 查看帮助一览</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>例如</p>
</li>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> login -u youUserName -p youPassord
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
</ol>
</li>
<li>
<p>提交</p>
<ul>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> push --help
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>push的时候要带上自己的名字，上传的镜像名必须是【用户名/镜像名】，所以我们得重新构建一个镜像</p>
</li>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build -t amayakite/diytomcat:1.0.0 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>或者用重命名的方式</p>
</li>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> tag diytomcat amayakite/diytomcat:1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>然后push</p>
</li>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> push amayakite/diytomcat:1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>结果</p>
</li>
<li>
<p><img src="/images/SpringCloud/00-Docker/image-20220119200457890.png" alt="image-20220119200457890" loading="lazy"></p>
</li>
<li>
<p>上传是比较慢的….因为人家是国外的服务器</p>
</li>
<li>
<p>上传完毕后，是这样的</p>
</li>
<li>
<p><img src="/images/SpringCloud/00-Docker/image-20220119200759277.png" alt="image-20220119200759277" loading="lazy"></p>
</li>
<li>
<p>然后你就能在自己的<a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">Docker Hub<ExternalLinkIcon/></a>上看到如下内容了</p>
</li>
<li>
<p><img src="/images/SpringCloud/00-Docker/image-20220119200847859.png" alt="image-20220119200847859" loading="lazy"></p>
</li>
</ul>
</li>
</ol>
<p>可以看到我们的镜像已经上传了(另外那个貌似是创建docker账号的时候自动创建的)</p>
<p>如果你要上传到阿里云或者腾讯云之类的地方的话，可以自行去他们官网上，一般都会要求创建命名空间，创建完毕后，会有详细的push教程</p>
<h3 id="docker打包容器" tabindex="-1"><a class="header-anchor" href="#docker打包容器" aria-hidden="true">#</a> docker打包容器</h3>
<blockquote>
<p>将容器保存成镜像</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#语法：</span>
<span class="token function">docker</span> commit <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> CONTAINER <span class="token punctuation">[</span>REPOSITORY<span class="token punctuation">[</span>:TAG<span class="token punctuation">]</span><span class="token punctuation">]</span>

<span class="token comment"># 例如</span>
<span class="token function">docker</span> commit -a <span class="token string">"Amayakite"</span> mytomcat  imagexxx:1.1.1
-a :提交的镜像作者；
-c :使用Dockerfile指令来创建镜像；
-m :提交时的说明文字；
-p :在commit时，将容器暂停。
imagexxx 是新创建的镜像的名字
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote>
<p>将镜像打包成tar包</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span>  save  -o xxx.tar  imagexxx1.1.1  <span class="token comment"># 当前路径下会生成一个xxx.tar</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>将tar包再次压缩为gz包</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> -zcvf xxx.tar.gz     xxx.tar    <span class="token comment"># 当前路径生成一个xxx.tar.gz压缩包</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后假设你在一台新的电脑上获取了这个tar.gz包并且想要使用它</p>
<blockquote>
<p>解压缩得到tar包</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> -zxvf xxx.tar.gz
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>将tar包生成镜像</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docke load <span class="token operator">&lt;</span> xxx.tar <span class="token comment">#生成的镜像信息和打包之前的一样</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后照常运行即可</p>
<h2 id="docker网络" tabindex="-1"><a class="header-anchor" href="#docker网络" aria-hidden="true">#</a> Docker网络</h2>
<h3 id="docker0网络" tabindex="-1"><a class="header-anchor" href="#docker0网络" aria-hidden="true">#</a> Docker0网络</h3>
<p>当你连接上服务器的时候，应该有注意到过这个玩意</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119212308383.png" alt="image-20220119212308383" loading="lazy"></p>
<p>那么现在我有个问题，例如我有个mysql容器，映射了6000到本地，那么我能不能直接访问它的3306呢</p>
<p>接下来我进入我的mysql容器看看ip</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it mysql <span class="token function">bash</span>
<span class="token function">cat</span> /etc/hosts
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>结果如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
<span class="token number">172.17</span>.0.4      9f21f81da253
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>有个<code>172.17.0.4</code>比较令人在意，那么我尝试下本地ping下</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119214058287.png" alt="image-20220119214058287" loading="lazy"></p>
<p>看来是可以的，也就是说我在容器外面也可以通过访问这个地址的3306来进行访问</p>
<p>换一种方式尝试，我开一个tomcat，映射本地9999</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d -p <span class="token number">9999</span>:8080 -name testTomcat tomcat
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it  testTomcat <span class="token function">bash</span>
<span class="token function">rm</span> -rf webapps <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> webapps.dist/ webapps
<span class="token function">cat</span> /etc/hosts


<span class="token comment"># Host结果为</span>
<span class="token number">127.0</span>.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
<span class="token number">172.17</span>.0.5      b352b627f9c7
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>接下来退出容器，然后访问下这个<code>172.17.0.5:8080</code>试试</p>
<p>得到了html</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119214548354.png" alt="image-20220119214548354" loading="lazy"></p>
<p>那么容器和容器之间是否可以ping通呢？答案是可以的，你可以自行尝试</p>
<p>docker0相当于网卡，同一个网段内是可以互相连接的</p>
<h3 id="容器互联-link" tabindex="-1"><a class="header-anchor" href="#容器互联-link" aria-hidden="true">#</a> 容器互联-link</h3>
<p>好了，下面的话是你学完SpringCloud再过来学的了</p>
<p>我现在有两个服务，tomcat1和tomcat2，能否像在Spring Cloud中的那样(Fegin)，通过服务名来互相调用呢？</p>
<p>我们先给当前的Tomcat安装下ping之类的工具</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mv</span> /etc/apt/sources.list /etc/apt/sources.list.bak

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span>/etc/apt/sources.list</span>
deb http://mirrors.ustc.edu.cn/debian stable main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free
EOF</span>
<span class="token function">apt</span> update
<span class="token function">apt</span> <span class="token function">install</span> iputils-ping
<span class="token function">apt</span> <span class="token function">install</span> net-tools
<span class="token builtin class-name">exit</span>
<span class="token comment"># 然后打包成一个镜像</span>
<span class="token function">docker</span> commit testTomcat mytomcat

<span class="token comment"># 然后运行两个</span>
<span class="token function">docker</span> run -d -p <span class="token number">9001</span>:8080 --name tomcat1 mytomcat
<span class="token function">docker</span> run -d -p <span class="token number">9002</span>:8080 --name tomcat2 mytomcat

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>然后ping一下 是ping不通的</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119222108897.png" alt="image-20220119222108897" loading="lazy"></p>
<p>所以Docker给我们提供了一个解决方案，link</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run  -d -p <span class="token number">9003</span>:8080 --link tomcat2 --name tomcat3 mytomcat
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我们只需要在启动的时候，加一个link命令，指定要桥接的容器即可</p>
<p>接下来进入tomcat3</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it tomcat3 <span class="token function">bash</span>
<span class="token function">ping</span> tomcat2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>可以发现ping通了</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119222336320.png" alt="image-20220119222336320" loading="lazy"></p>
<p>但是此时，tomcat2可以ping通tomcat3吗？</p>
<p>实际上是不可以的….</p>
<p>因为我们没有配置tomcat2的link…</p>
<p>现在，我们来看下docker的网卡信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> network <span class="token function">ls</span>
 <span class="token comment"># 结果</span>
 NETWORK ID     NAME                DRIVER    SCOPE
2addf569c311   bridge              bridge    <span class="token builtin class-name">local</span>
。。。。等一系列网卡信息
<span class="token comment"># 这里的bridge就是docker的基础网卡 我们来看看这个网卡的信息</span>
 <span class="token function">docker</span> network  inspect bridge
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>可以发现你的全部网络，例如tomcat2和3</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119222915944.png" alt="image-20220119222915944" loading="lazy"></p>
<p>那么看着两个的配置不用多说了</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> inspect tomcat3
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>可以看到，在它的<code>HostConfig</code>内，有一个配置</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119223715561.png" alt="image-20220119223715561" loading="lazy"></p>
<p>但是在tomcat2中这个地方是没有东西的</p>
<p>并且你进入Tomcat3，可以在<code> /etc/hosts</code>看到</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it tomcat3 <span class="token function">bash</span>
<span class="token function">cat</span> /etc/hosts
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220119223910780.png" alt="image-20220119223910780" loading="lazy"></p>
<p>这里就是直接来了个转发，就像是windows的修改hosts文件那样，所以可以直接ping通</p>
<p>当然，现在完Docker已经不推荐用<code>--link</code>这个玩意了</p>
<p>因为docker0毕竟是官方默认的，使用过多容易造成混乱，并且不易维护</p>
<h3 id="自定义网络-创建" tabindex="-1"><a class="header-anchor" href="#自定义网络-创建" aria-hidden="true">#</a> 自定义网络-创建</h3>
<p>创建</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network create <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> NETWORK
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>OPtions参数如下</li>
</ul>
<table>
<thead>
<tr>
<th>简参数,参数</th>
<th>默认</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>--attachable</td>
<td></td>
<td>API 1.25+启用手动容器附件</td>
</tr>
<tr>
<td>--aux-address</td>
<td></td>
<td>网络驱动程序使用的辅助IPv4或IPv6地址</td>
</tr>
<tr>
<td>--config-from</td>
<td></td>
<td>API 1.30+从中复制配置的网络</td>
</tr>
<tr>
<td>--config-only</td>
<td></td>
<td>API 1.30+创建仅配置网络</td>
</tr>
<tr>
<td>-d,--driver</td>
<td>bridge</td>
<td>驱动程序来管理网络</td>
</tr>
<tr>
<td><strong>--gateway</strong></td>
<td></td>
<td><strong>主子网的IPv4或IPv6网关</strong><br />这个相当于是暴露给主机的网络</td>
</tr>
<tr>
<td>--ingress</td>
<td></td>
<td>API 1.29+创建群集路由网状网络</td>
</tr>
<tr>
<td>--internal</td>
<td></td>
<td>限制外部访问网络</td>
</tr>
<tr>
<td>--ip-range</td>
<td></td>
<td>从子范围分配容器ip</td>
</tr>
<tr>
<td>--ipam-driver</td>
<td></td>
<td>IP地址管理驱动程序</td>
</tr>
<tr>
<td>--ipam-opt</td>
<td></td>
<td>设置IPAM驱动程序特定选项</td>
</tr>
<tr>
<td>--ipv6</td>
<td></td>
<td>启用IPv6网络</td>
</tr>
<tr>
<td>--label</td>
<td></td>
<td>在网络上设置元数据</td>
</tr>
<tr>
<td>-o,--opt</td>
<td></td>
<td>设置驱动程序特定选项</td>
</tr>
<tr>
<td>--scope</td>
<td></td>
<td>API 1.30+控制网络范围</td>
</tr>
<tr>
<td><strong>--subnet</strong></td>
<td></td>
<td><strong>代表网段的CIDR格式的子网</strong><br />这个比较重要，也就是配置这个网卡的虚拟地址</td>
</tr>
</tbody>
</table>
<p>我们接下来创建一个</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network create --subnet <span class="token number">233.33</span>.0.0/16 --gateway <span class="token number">233.33</span>.0.1 mynet
<span class="token comment"># 这里的16代表双路啥啥啥的，反正最多能创建65535个子网，如果说这里写了24，那就只有255个</span>
<span class="token comment">#貌似也指的是前面16位固定 不过无所谓 反正这玩意知道咋用就行</span>
<span class="token comment"># 后面的表示主机能通过哪个地址来访问到这个网卡</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后就可以看到我们刚刚创建的网卡了</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119232745245.png" alt="image-20220119232745245" loading="lazy"></p>
<p>之后，从<code>233.33.0.2</code>一直到<code>233.33.255.255</code>中都属于他</p>
<p>自此，我们的自定义网络就创建好了，你可以看看他的具体内容</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network inspect  mynet
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>结果：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"mynet"</span><span class="token punctuation">,</span>
        <span class="token property">"Id"</span><span class="token operator">:</span> <span class="token string">"39ac7d62a102c2b9eb7bd179119022942d3db33a317ed03530e0714ba5022cd7"</span><span class="token punctuation">,</span>
        <span class="token property">"Created"</span><span class="token operator">:</span> <span class="token string">"2022-01-19T23:27:03.473039445+08:00"</span><span class="token punctuation">,</span>
        <span class="token property">"Scope"</span><span class="token operator">:</span> <span class="token string">"local"</span><span class="token punctuation">,</span>
        <span class="token property">"Driver"</span><span class="token operator">:</span> <span class="token string">"bridge"</span><span class="token punctuation">,</span>
        <span class="token property">"EnableIPv6"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">"IPAM"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Driver"</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
            <span class="token property">"Options"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"Config"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token property">"Subnet"</span><span class="token operator">:</span> <span class="token string">"233.33.0.0/16"</span><span class="token punctuation">,</span>
                    <span class="token property">"Gateway"</span><span class="token operator">:</span> <span class="token string">"233.33.0.1"</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"Internal"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">"Attachable"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">"Ingress"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">"ConfigFrom"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Network"</span><span class="token operator">:</span> <span class="token string">""</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"ConfigOnly"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token property">"Containers"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"Options"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"Labels"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>emm然后我尝试创建一个容器，桥接这个网卡</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> run -d -p <span class="token number">9001</span>:8080 --net mynet --name tomcat-net1 mytomcat
 <span class="token comment"># -net就是桥接网卡 不填写的话就是默认的那个东西</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>然后发现了如下异常</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119234052518.png" alt="image-20220119234052518" loading="lazy"></p>
<p>大意就是网络地址不可用，没事，我们删掉重新创建一个1xx的</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> -fv tomcat-net1
<span class="token function">docker</span> network <span class="token function">rm</span> mynet
<span class="token function">docker</span> network create --subnet <span class="token number">160.1</span>.0.0/16 --gateway <span class="token number">160.1</span>.0.1 mynet
6503247b85489d8f7e8f68e69c62d9b7ea2632bcb31c56d441559caa288bb3b3
<span class="token function">docker</span> run -d -p <span class="token number">9001</span>:8080 --net mynet --name tomcat-net1 mytomcat
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220119234145202.png" alt="image-20220119234145202" loading="lazy"></p>
<p>创建成功，再来创建一个2吧</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d -p <span class="token number">9002</span>:8080 --net mynet --name tomcat-net2 mytomcat
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>再来尝试ping一下，你就会发现神奇的事情</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span>  -it tomcat-net1 <span class="token function">ping</span> tomcat-net2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220119234338393.png" alt="image-20220119234338393" loading="lazy"></p>
<p>居然ping通了….</p>
<p>这就非常舒服了</p>
<p>原理就是这两个容器都是连的自定义网络，连接在同一个自定义网络的容器之间端口会自动相互暴露，而且不会向以外的显示任何端口，这样就更好的进行了容器见相互通信和隔离</p>
<h3 id="网络连通" tabindex="-1"><a class="header-anchor" href="#网络连通" aria-hidden="true">#</a> 网络连通</h3>
<p>现在我们想把docker0和mynet之间也实现可以通过直接通过名字来访问的方式，又该怎么做呢？</p>
<p>也就是在docker0上面的tomcat1和tomcat2和在mynet上面的tomcat-net1和tomcat-net2如何通过名字来实现互相访问</p>
<p>也就是这样</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119234953131.png" alt="image-20220119234953131" loading="lazy"></p>
<p>这个是想都不用想的，压根不可能的，所以说我们应该换一种想法</p>
<p>让在docekr0上面的容器能连接上mynet</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220119235138175.png" alt="image-20220119235138175" loading="lazy"></p>
<p>在<code>docker networ</code>中，有如下几个命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:  <span class="token function">docker</span> network COMMAND

Manage networks

Commands:
  connect     Connect a container to a network
  create      Create a network
  disconnect  Disconnect a container from a network
  inspect     Display detailed information on one or <span class="token function">more</span> networks
  <span class="token function">ls</span>          List networks
  prune       Remove all unused networks
  <span class="token function">rm</span>          Remove one or <span class="token function">more</span> networks

Run <span class="token string">'docker network COMMAND --help'</span> <span class="token keyword">for</span> <span class="token function">more</span> information on a command.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>其中第一个就是我们要用的：<strong>将容器连接到网络</strong></p>
<p>看看他的参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:  <span class="token function">docker</span> network connect <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> NETWORK CONTAINER

Connect a container to a network

Options:

<span class="token comment"># 为容器添加网络范围的别名</span>
--alias strings           Add network-scoped <span class="token builtin class-name">alias</span> <span class="token keyword">for</span> the container

<span class="token comment">#网络的驱动程序选项</span>
--driver-opt strings      driver options <span class="token keyword">for</span> the network

<span class="token comment">#IPv4 地址（例如，172.30.100.104）</span>
--ip string               IPv4 address <span class="token punctuation">(</span>e.g., <span class="token number">172.30</span>.100.104<span class="token punctuation">)</span>

<span class="token comment">#IPv6 地址（例如，2001:db8::33） </span>
--ip6 string              IPv6 address <span class="token punctuation">(</span>e.g., <span class="token number">2001</span>:db8::33<span class="token punctuation">)</span>

<span class="token comment">#添加到另一个容器的链接</span>
--link list               Add <span class="token function">link</span> to another container

<span class="token comment">#为容器添加链接本地地址</span>
--link-local-ip strings   Add a link-local address <span class="token keyword">for</span> the container

当然这些参数并不是最重要的，它的语句是这样的

<span class="token function">docker</span> network connect <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> 网络 容器
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>所以我们只需要</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network connect mynet tomcat1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>运行之后，没有任何事情发生，但是我们这个时候尝试ping下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span>  -it tomcat1 <span class="token function">ping</span> tomcat-net1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220119235724607.png" alt="image-20220119235724607" loading="lazy"></p>
<p>居然ping通了</p>
<p>那么如何解除呢？</p>
<p>依旧是看看network</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:  <span class="token function">docker</span> network COMMAND

Manage networks

Commands:
<span class="token comment"># 连接</span>
  connect     Connect a container to a network
  <span class="token comment"># 创建</span>
  create      Create a network
  <span class="token comment"># 解除连接</span>
  disconnect  Disconnect a container from a network
  <span class="token comment"># 查看</span>
  inspect     Display detailed information on one or <span class="token function">more</span> networks
  <span class="token comment"># 列表</span>
  <span class="token function">ls</span>          List networks
  <span class="token comment"># 自动删除没人用的</span>
  prune       Remove all unused networks
  <span class="token comment"># 指定删除</span>
  <span class="token function">rm</span>          Remove one or <span class="token function">more</span> networks

Run <span class="token string">'docker network COMMAND --help'</span> <span class="token keyword">for</span> <span class="token function">more</span> information on a command.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>看看取消连接有哪些参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:  <span class="token function">docker</span> network disconnect <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> NETWORK CONTAINER

Disconnect a container from a network

Options:
  -f, --force   Force the container to disconnect from a network 强制容器断开网络连接
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>所以我们只需要</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> network disconnect mynet tomcat1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后再ping，就会发现ping不上了</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120000044659.png" alt="image-20220120000044659" loading="lazy"></p>
<h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> Docker Compose</h2>
<h3 id="概述-2" tabindex="-1"><a class="header-anchor" href="#概述-2" aria-hidden="true">#</a> 概述</h3>
<p>我们现在配置Docker有三个步骤：</p>
<ol>
<li>DockerFIle</li>
<li>Docker Build</li>
<li>Docker Run</li>
</ol>
<p>这三步全都是手动操作，并且一次只能操作单个容器</p>
<p>但是假设我们现在有100个微服务，宕机了我们就要手动重启，非常麻烦，而他们之中还存在依赖关系，配置起来非常麻烦</p>
<p>Docker Compose就是来解决这个问题的，他可以轻松搞笑的管理容器，定义运行多个容器</p>
<p>根据它的<a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>中描述，可以得知，我们使用的话需要三步</p>
<ol>
<li>准备好<code>DockerFile</code></li>
<li>准备好一个<code>docker-compose.yml</code></li>
<li>运行<code>docker-compose up</code></li>
</ol>
<p>作用是：批量容器编排</p>
<p>Compose是Docker官方的开源项目，需要额外自行安装</p>
<p><code>Dockerfile</code>让程序在任何地方可以运行web服务等，web服务、redis、mysql、nginx….多个容器</p>
<p><code>docker-compose.yml</code>让这些容器可以一键部署</p>
<p>官方文档中这个yml的格式为</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3.9"</span>  <span class="token comment"># optional since v1.27.0</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> .
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"5000:5000"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> .<span class="token punctuation">:</span>/code
      <span class="token punctuation">-</span> logvolume01<span class="token punctuation">:</span>/var/log
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">logvolume01</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>这看起来就像是：image用了redis，然后volumes指定了挂在卷，然后定义了端口暴露..</p>
<p>Compose有两个重要的概念</p>
<ul>
<li>服务Service：容器，应用(web/redis/mysql…)</li>
<li>项目Project，一组关联的容器</li>
</ul>
<h3 id="docker-compose的安装" tabindex="-1"><a class="header-anchor" href="#docker-compose的安装" aria-hidden="true">#</a> Docker Compose的安装</h3>
<p>参照官方文档<a href="https://docs.docker.com/compose/install/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/compose/install/<ExternalLinkIcon/></a></p>
<p>文档中有git的命令，于是我去Compose的<a href="https://github.com/docker/compose" target="_blank" rel="noopener noreferrer">仓库<ExternalLinkIcon/></a>看了看</p>
<p>我这里看的最新的是v2.2.3</p>
<p>你可以到这个链接里面去看看<a href="https://github.com/docker/compose/releases" target="_blank" rel="noopener noreferrer">https://github.com/docker/compose/releases<ExternalLinkIcon/></a></p>
<blockquote>
<p>后续补充：不建议用v2.0+的版本，有很多地方不太兼容</p>
<p>建议是用1.29.2</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> -L https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> -s<span class="token variable">`</span></span>-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> -m<span class="token variable">`</span></span> <span class="token operator">></span> /usr/local/bin/docker-compose

<span class="token comment"># 或者另一个加速</span>
<span class="token function">sudo</span> <span class="token function">curl</span> -L <span class="token string">"https://download.fastgit.org/docker/compose/releases/download/1.29.2/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -s<span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m<span class="token variable">)</span></span>"</span> -o /usr/local/bin/docker-compose

<span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> -L <span class="token string">"https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -s<span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m<span class="token variable">)</span></span>"</span> -o /usr/local/bin/docker-compose
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>当然，因为直接下载速度较慢，可以选择加速</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> -L <span class="token string">"https://github.91chi.fun//https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -s<span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m<span class="token variable">)</span></span>"</span> -o /usr/local/bin/docker-compose
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我这里的话，比较块的加速还是这个<a href="https://fastgit.org/" target="_blank" rel="noopener noreferrer">https://fastgit.org/<ExternalLinkIcon/></a></p>
<p>这个加速的使用<a href="https://doc.fastgit.org/zh-cn/guide.html#web-%E7%9A%84%E4%BD%BF%E7%94%A8" target="_blank" rel="noopener noreferrer">教程<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> -L <span class="token string">"https://download.fastgit.org/docker/compose/releases/download/v2.2.3/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -s<span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> -m<span class="token variable">)</span></span>"</span> -o /usr/local/bin/docker-compose
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>以及daocloud的，看个人心情，反正加速的都可以用，最稳的就是这个daocloud</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -L https://get.daocloud.io/docker/compose/releases/download/v2.2.3/docker-compose-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> -s<span class="token variable">`</span></span>-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> -m<span class="token variable">`</span></span> <span class="token operator">></span> /usr/local/bin/docker-compose
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后赋予可执行权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后测试</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> --version
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="/images/SpringCloud/00-Docker/image-20220120114317974.png" alt="image-20220120114317974" loading="lazy"></p>
<p>当然 我们还可以使用Python-pip来进行安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip3 <span class="token function">install</span> <span class="token function">docker-compose</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>或者你可以使用贴心的包管理来一键安装（并不推荐，版本有点旧）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">docker-compose</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>参考官方文档<a href="https://docs.docker.com/compose/gettingstarted/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/compose/gettingstarted/<ExternalLinkIcon/></a></p>
<p>先创建个文件夹</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">mkdir</span> composetest
 <span class="token builtin class-name">cd</span> composetest
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>然后创建一个<code>app.py</code></p>
<p>??貌似用到了redis</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">import</span> <span class="token function">time</span>

<span class="token comment"># 导入redis</span>
<span class="token function">import</span> redis
<span class="token comment"># 导入Flask  这类似于Java的SpringWeb</span>
from flask <span class="token function">import</span> Flask

app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>
<span class="token comment"># 监听redis</span>
cache <span class="token operator">=</span> redis.Redis<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">'redis'</span>, <span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">6379</span><span class="token punctuation">)</span>

<span class="token comment"># 一个方法 反正每次调用都是执行redis的一个自增</span>
def get_hit_count<span class="token punctuation">(</span><span class="token punctuation">)</span>:
    retries <span class="token operator">=</span> <span class="token number">5</span>
    <span class="token keyword">while</span> True:
        try:
            <span class="token builtin class-name">return</span> cache.incr<span class="token punctuation">(</span><span class="token string">'hits'</span><span class="token punctuation">)</span>
        except redis.exceptions.ConnectionError as exc:
            <span class="token keyword">if</span> retries <span class="token operator">==</span> <span class="token number">0</span>:
                raise exc
            retries -<span class="token operator">=</span> <span class="token number">1</span>
            time.sleep<span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span>

<span class="token comment"># 访问根路径调用方法，并使用模板字符串渲染</span>
@app.route<span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span>
def hello<span class="token punctuation">(</span><span class="token punctuation">)</span>:
    count <span class="token operator">=</span> get_hit_count<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token builtin class-name">return</span> <span class="token string">'Hello World! I have been seen {} times.\n'</span>.format<span class="token punctuation">(</span>count<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>然后创建一个pip的<code>requirements.txt</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>flask
redis
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>然后编写一个DockerFile</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># syntax=docker/dockerfile:1</span>
<span class="token instruction"><span class="token keyword">FROM</span> python:3.7-alpine</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /code</span>
<span class="token instruction"><span class="token keyword">ENV</span> FLASK_APP=app.py</span>
<span class="token instruction"><span class="token keyword">ENV</span> FLASK_RUN_HOST=0.0.0.0</span>
<span class="token instruction"><span class="token keyword">RUN</span> apk add --no-cache gcc musl-dev linux-headers</span>
<span class="token instruction"><span class="token keyword">COPY</span> requirements.txt requirements.txt</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install -r requirements.txt</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 5000</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"flask"</span>, <span class="token string">"run"</span>]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li>从 Python 3.7 映像开始构建映像。</li>
<li>将工作目录设置为<code>/code</code>.</li>
<li>设置命令使用的环境变量<code>flask</code>。</li>
<li>安装 gcc 和其他依赖项</li>
<li>复制<code>requirements.txt</code>并安装 Python 依赖项。</li>
<li>向镜像添加元数据以描述容器正在侦听端口 5000</li>
<li>将项目中的当前目录复制<code>.</code>到镜像中的workdir <code>.</code>。</li>
<li>将容器的默认命令设置为<code>flask run</code>.</li>
</ul>
<blockquote>
<p>然后定义我们的service的yml：<code>docker-compose.yml</code></p>
</blockquote>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 版本号</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3.9"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
 <span class="token comment"># 这里是使用DockerFile构建的镜像</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
  <span class="token comment"># 构建目录</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> .
    <span class="token comment"># 暴露的端口</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"5000:5000"</span>
  <span class="token comment"># 下面这里是使用了官方的redis的镜像</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"redis:alpine"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>然后只需要在当前文件夹下执行一条命令即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后你就能看到如下内容</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120120148671.png" alt="image-20220120120148671" loading="lazy"></p>
<p>最后一个下载可能会比较慢…</p>
<p>草，会非常非常的慢，尤其是那个gcc</p>
<p>所以说我们改动下脚本</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120124603233.png" alt="image-20220120124603233" loading="lazy"></p>
<p>这行删掉，重新构建（或者你在那里自己指定代理）</p>
<p>然后你就能得到</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120124734036.png" alt="image-20220120124734036" loading="lazy"></p>
<p>然后开下5000端口，外网访问下看看</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120124915265.png" alt="image-20220120124915265" loading="lazy"></p>
<p>成功，然后尝试下退出</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120125100136.png" alt="image-20220120125100136" loading="lazy"></p>
<p>然后您能得到这两个镜像</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120125230085.png" alt="image-20220120125230085" loading="lazy"></p>
<p>并且在docker images里面多了一个内容</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120125354954.png" alt="image-20220120125354954" loading="lazy"></p>
<p>并且，我们看看network</p>
<p><img src="/images/SpringCloud/00-Docker/image-20220120131325324.png" alt="image-20220120131325324" loading="lazy"></p>
<p>可以看到，多出了一个网络，也就是说我们部署的容器都是可以互通的</p>
<h3 id="compose常用命令一览" tabindex="-1"><a class="header-anchor" href="#compose常用命令一览" aria-hidden="true">#</a> Compose常用命令一览</h3>
<p>注意 以下命令都是要cd到指定文件夹下才行</p>
<blockquote>
<p>普通运行</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>后台运行</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up -d
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>一次性运行</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> run
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>查看正在运行的容器(通过Compose构建的)</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>结束服务</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> stop
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>完全关闭、删除容器，并且删除对应的数据卷</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> down --volumes
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="compose文件编写规则" tabindex="-1"><a class="header-anchor" href="#compose文件编写规则" aria-hidden="true">#</a> Compose文件编写规则</h2>
<p>参照官方文档<a href="https://docs.docker.com/compose/compose-file/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/compose/compose-file/<ExternalLinkIcon/></a></p>
<h3 id="version约定" tabindex="-1"><a class="header-anchor" href="#version约定" aria-hidden="true">#</a> version约定</h3>
<p>表示这个Compose文件支持哪些指定的Docker版本</p>
<p>一般来说现在都是写3.9</p>
<table>
<thead>
<tr>
<th style="text-align:left">版本号</th>
<th style="text-align:left">对应的Docker版本</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Compose specification</td>
<td style="text-align:left">19.03.0+</td>
</tr>
<tr>
<td style="text-align:left">3.8</td>
<td style="text-align:left">19.03.0+</td>
</tr>
<tr>
<td style="text-align:left">3.7</td>
<td style="text-align:left">18.06.0+</td>
</tr>
<tr>
<td style="text-align:left">3.6</td>
<td style="text-align:left">18.02.0+</td>
</tr>
<tr>
<td style="text-align:left">3.5</td>
<td style="text-align:left">17.12.0+</td>
</tr>
<tr>
<td style="text-align:left">3.4</td>
<td style="text-align:left">17.09.0+</td>
</tr>
<tr>
<td style="text-align:left">3.3</td>
<td style="text-align:left">17.06.0+</td>
</tr>
<tr>
<td style="text-align:left">3.2</td>
<td style="text-align:left">17.04.0+</td>
</tr>
<tr>
<td style="text-align:left">3.1</td>
<td style="text-align:left">1.13.1+</td>
</tr>
<tr>
<td style="text-align:left">3.0</td>
<td style="text-align:left">1.13.0+</td>
</tr>
<tr>
<td style="text-align:left">2.4</td>
<td style="text-align:left">17.12.0+</td>
</tr>
<tr>
<td style="text-align:left">2.3</td>
<td style="text-align:left">17.06.0+</td>
</tr>
<tr>
<td style="text-align:left">2.2</td>
<td style="text-align:left">1.13.0+</td>
</tr>
<tr>
<td style="text-align:left">2.1</td>
<td style="text-align:left">1.12.0+</td>
</tr>
<tr>
<td style="text-align:left">2.0</td>
<td style="text-align:left">1.10.0+</td>
</tr>
</tbody>
</table>
<h3 id="compose-service" tabindex="-1"><a class="header-anchor" href="#compose-service" aria-hidden="true">#</a> Compose-Service</h3>
<p>详细的可以去看<a href="https://docs.docker.com/compose/compose-file/compose-file-v3/#service-configuration-reference" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<p>或者这篇<a href="https://blog.csdn.net/qq_36148847/article/details/79427878" target="_blank" rel="noopener noreferrer">博客<ExternalLinkIcon/></a>（这篇博客比较齐全）</p>
<p>反正总共就三层概念</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"版本号"</span>
<span class="token key atrule">service</span><span class="token punctuation">:</span> <span class="token comment">#服务</span>
	<span class="token key atrule">服务1</span><span class="token punctuation">:</span> web
		images
		build
		network
		<span class="token punctuation">...</span>.
    <span class="token key atrule">服务2</span><span class="token punctuation">:</span> redis。。。
    <span class="token key atrule">服务3</span><span class="token punctuation">:</span> redis。。。
<span class="token comment"># 其他配置：网络、数据卷、全局规则</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span> 
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
<span class="token key atrule">configs</span><span class="token punctuation">:</span> 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="编写一个wordpress博客" tabindex="-1"><a class="header-anchor" href="#编写一个wordpress博客" aria-hidden="true">#</a> 编写一个WordPress博客</h3>
<p>随便创建一个文件夹，然后创建一个docker-compose.yml</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.1'</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>

  <span class="token key atrule">wordpress</span><span class="token punctuation">:</span>
  <span class="token comment"># 使用镜像</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> wordpress
    <span class="token comment"># 是否自动启动</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token comment"># 容器端口</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8080<span class="token punctuation">:</span><span class="token number">80</span>
    <span class="token comment"># 容器环境变量</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">WORDPRESS_DB_HOST</span><span class="token punctuation">:</span> db
      <span class="token key atrule">WORDPRESS_DB_USER</span><span class="token punctuation">:</span> exampleuser
      <span class="token key atrule">WORDPRESS_DB_PASSWORD</span><span class="token punctuation">:</span> examplepass
      <span class="token key atrule">WORDPRESS_DB_NAME</span><span class="token punctuation">:</span> exampledb
    <span class="token comment"># 挂载的数据卷</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> wordpress<span class="token punctuation">:</span>/var/www/html

  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> exampledb
      <span class="token key atrule">MYSQL_USER</span><span class="token punctuation">:</span> exampleuser
      <span class="token key atrule">MYSQL_PASSWORD</span><span class="token punctuation">:</span> examplepass
      <span class="token key atrule">MYSQL_RANDOM_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token string">'1'</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db<span class="token punctuation">:</span>/var/lib/mysql

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">wordpress</span><span class="token punctuation">:</span>
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>然后启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后就行了</p>
<p>删除：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> down --volumes
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
