<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>这玩意我在使用的时候经历了一天的在配置上找BUG，如此感叹：不愧是马云家的玩意儿！对于其配置的怪异程度远远超出了我的想象</p>
<p>我们实际上使用数据库不单单是一对一，还有可能</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220112224744828.png" alt="image-20220112224744828" loading="lazy"></p>
<p>一对一，一对多，多对多之间的数据同步性</p>
<p>这就是分布式事务（单机没有这种问题）</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220112224841410.png" alt="image-20220112224841410" loading="lazy"></p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220112224919602.png" alt="image-20220112224919602" loading="lazy"></p>
<p>为此，就要用到阿里开发的Seata了</p>
<p>官网：<a href="https://seata.io/zh-cn/" target="_blank" rel="noopener noreferrer">https://seata.io/zh-cn/<ExternalLinkIcon/></a></p>
<p>在正式开始前，有几个术语需要了解下</p>
<ol>
<li><code>Translation ID XID</code>：全局唯一事务ID</li>
<li>三组件概念
<ul>
<li>TC (Transaction Coordinator) - 事务协调者
<ul>
<li>维护全局和分支事务的状态，驱动全局事务提交或回滚。</li>
<li>也就是协调开启全局事务的提交或者回滚</li>
</ul>
</li>
<li>TM (Transaction Manager) - 事务管理器
<ul>
<li>定义全局事务的范围：开始全局事务、提交或回滚全局事务。</li>
<li>也就是控制全局事务的边界，负责开启一个事务和发起最终全局提交或者全局回滚的决议</li>
</ul>
</li>
<li>RM (Resource Manager) - 资源管理器
<ul>
<li>管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。</li>
</ul>
</li>
</ul>
</li>
<li>以上两点面试百分之七十会问</li>
</ol>
<p>处理过程如图所示</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/TB1rDpkJAvoK1RjSZPfXXXPKFXa-794-478.png" alt="img" loading="lazy"></p>
<p>执行步骤：</p>
<ol>
<li>TM向TC申请开启一个全局事务，全局事务创建成功会生成一个全局唯一的XID</li>
<li>XID在微服务调用链路的上下文进行传播</li>
<li>RM向TC注册分支事务，将其纳入XID对应全局事务的管辖</li>
<li>TM对TC发起针对XID的全局提交或者回滚协议</li>
<li>TC调度XID下管辖的全部分支事务完成提交或回滚请求</li>
</ol>
<p>人话</p>
<blockquote>
<p>把着整个玩意看成一个班级，TC就是班主任，TM就是上课的老师</p>
<ul>
<li>现在上课的老师向班主任申请开启一个网络讲堂，班主任同意后就去网络上建一个QQ群</li>
<li>这个QQ群就相当于是XID，在学生之间传播</li>
<li>学生要进网络课堂，需要先在班主任那登记，报备对应信息（网课开摄像头）</li>
<li>老师向班主任发起让所有人打卡的需求</li>
<li>班主任收到后，通过QQ群通知已经报备的所有人进行上课打卡</li>
</ul>
<p>就是这样</p>
</blockquote>
<h2 id="seata的下载和安装" tabindex="-1"><a class="header-anchor" href="#seata的下载和安装" aria-hidden="true">#</a> Seata的下载和安装</h2>
<h3 id="下载" tabindex="-1"><a class="header-anchor" href="#下载" aria-hidden="true">#</a> 下载</h3>
<p>到<a href="https://seata.io/zh-cn/blog/download.html" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>或者GitHub上下载即可，我的选择到<a href="https://github,com/seata/seata/release" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a>上</p>
<p>已经有半年多没有更新了hhh</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220112235620331.png" alt="image-20220112235620331" loading="lazy"></p>
<p>下载好后怎么用？</p>
<ul>
<li>本地@Translation</li>
<li>全局@GlobalTranslation</li>
</ul>
<p>两个注解就完了</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113000401578.png" alt="image-20220113000401578" loading="lazy"></p>
<p>下载解压后，我们能得到这些文件</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113000552374.png" alt="image-20220113000552374" loading="lazy"></p>
<h2 id="seata-server的配置及启动" tabindex="-1"><a class="header-anchor" href="#seata-server的配置及启动" aria-hidden="true">#</a> Seata-Server的配置及启动</h2>
<p>先说下，这玩意是配置超级痛苦，使用非常舒服的…所以配置时间会大于编码时间</p>
<p>我这里的Seata是1.4，参考<a href="https://blog.csdn.net/zhang18024666607/article/details/113118599" target="_blank" rel="noopener noreferrer">这篇<ExternalLinkIcon/></a>配置文章 具体自己版本的可以在百度上搜<code>seata 1.x</code>来</p>
<p>然后如果是<code>1.x</code>之前的话，可以看<a href="https://www.bilibili.com/video/BV18E411x7eT?p=140" target="_blank" rel="noopener noreferrer">视频<ExternalLinkIcon/></a>来配置</p>
<p>配置的第一步，是看官方文档<a href="https://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html" target="_blank" rel="noopener noreferrer">https://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html<ExternalLinkIcon/></a></p>
<p>最终我参考的文章是<a href="https://blog.csdn.net/weixin_43831049/article/details/117446071" target="_blank" rel="noopener noreferrer">这篇<ExternalLinkIcon/></a>和<a href="https://blog.csdn.net/zhang18024666607/article/details/113118599" target="_blank" rel="noopener noreferrer">这篇<ExternalLinkIcon/></a>，并且成功配置启动成功</p>
<p>Seata分TC、TM和RM三个角色，TC（Server端）为单独服务端部署，TM和RM（Client端）由业务系统集成。</p>
<ul>
<li>TC--班主任</li>
<li>TM-上课老师</li>
<li>RM-学生</li>
</ul>
<h3 id="相关sql脚本的链接" tabindex="-1"><a class="header-anchor" href="#相关sql脚本的链接" aria-hidden="true">#</a> 相关SQL脚本的链接</h3>
<p>注意 我这里是1.4.2，不同的版本，对应的脚本链接也不同</p>
<p>链接<a href="https://github.com/seata/seata/tree/1.4.2/script" target="_blank" rel="noopener noreferrer">https://github.com/seata/seata/tree/1.4.2/script<ExternalLinkIcon/></a></p>
<p>——–后续补充：1.3+的一律用默认分支的脚本：<a href="https://github.com/seata/seata/tree/develop/script" target="_blank" rel="noopener noreferrer">https://github.com/seata/seata/tree/develop/script<ExternalLinkIcon/></a>，不然出大问题</p>
<p>你可以根据你正在使用的版本，将上面链接改成指定的地址</p>
<p>首先是Server端，我的脚本链接为<a href="https://github.com/seata/seata/blob/develop/script/server/db" target="_blank" rel="noopener noreferrer">https://github.com/seata/seata/blob/develop/script/server/db<ExternalLinkIcon/></a></p>
<p>内容为</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- -------------------------------- The script used when storeMode is 'db' --------------------------------</span>
<span class="token comment">-- the table to store GlobalSession data</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>global_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>                       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span>            <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>                    <span class="token keyword">TINYINT</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_id<span class="token punctuation">`</span></span>            <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_service_group<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_name<span class="token punctuation">`</span></span>          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>timeout<span class="token punctuation">`</span></span>                   <span class="token keyword">INT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>begin_time<span class="token punctuation">`</span></span>                <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_data<span class="token punctuation">`</span></span>          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>                <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>              <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_gmt_modified_status<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_transaction_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token comment">-- the table to store BranchSession data</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>branch_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>         <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>               <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span>    <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_group_id<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_id<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_type<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>            <span class="token keyword">TINYINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>client_id<span class="token punctuation">`</span></span>         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_data<span class="token punctuation">`</span></span>  <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>        <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>      <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_xid<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token comment">-- the table to store lock data</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>lock_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>row_key<span class="token punctuation">`</span></span>        <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>            <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>      <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_id<span class="token punctuation">`</span></span>    <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span>     <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>pk<span class="token punctuation">`</span></span>             <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>         <span class="token keyword">TINYINT</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'0:locked ,1:rollbacking'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>     <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>   <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>row_key<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_status<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_branch_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>lock_key<span class="token punctuation">`</span></span>       <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>lock_value<span class="token punctuation">`</span></span>     <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>expire<span class="token punctuation">`</span></span>         <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>lock_key<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'AsyncCommitting'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'RetryCommitting'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'RetryRollbacking'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'TxTimeoutCheck'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><p>然后是client端，对应的脚本链接为：<a href="https://github.com/seata/seata/tree/develop/script/client" target="_blank" rel="noopener noreferrer">https://github.com/seata/seata/tree/develop/script/client<ExternalLinkIcon/></a></p>
<p>对应的脚本内容为</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- for AT mode you must to init this sql for you business database. the seata server not need it.</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>undo_log<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>     <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'branch transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>           <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'global transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>context<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'undo_log context,such as serialization'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>rollback_info<span class="token punctuation">`</span></span> <span class="token keyword">LONGBLOB</span>     <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'rollback info'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_status<span class="token punctuation">`</span></span>    <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'0:normal status,1:defense status'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_created<span class="token punctuation">`</span></span>   <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'create datetime'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_modified<span class="token punctuation">`</span></span>  <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'modify datetime'</span><span class="token punctuation">,</span>
    <span class="token keyword">UNIQUE</span> <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>ux_undo_log<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">AUTO_INCREMENT</span> <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8 <span class="token keyword">COMMENT</span> <span class="token operator">=</span><span class="token string">'AT transaction mode undo table'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="registry-conf" tabindex="-1"><a class="header-anchor" href="#registry-conf" aria-hidden="true">#</a> registry.conf</h3>
<p>我们这里用的是Nacos，所以修改registry.conf的注册中心和配置中心为nacos</p>
<p>注意这两个namespace，等下要用到</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>registry {
  <span class="token comment"># file 、nacos 、eureka、redis、zk、consul、etcd3、sofa</span>
  <span class="token key attr-name">type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>

  nacos {
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata-server</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">myserver:8435</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">029fa2f3-e90a-400c-91ac-7f1b83dc4785</span>"</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
  }
  eureka {
    <span class="token key attr-name">serviceUrl</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:8761/eureka</span>"</span>
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">weight</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">1</span>"</span>
  }
  redis {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">localhost:6379</span>"</span>
    <span class="token key attr-name">db</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
  }
  zk {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:2181</span>"</span>
    <span class="token key attr-name">sessionTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">6000</span>
    <span class="token key attr-name">connectTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  consul {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:8500</span>"</span>
    <span class="token key attr-name">aclToken</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  etcd3 {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:2379</span>"</span>
  }
  sofa {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:9603</span>"</span>
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">region</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">DEFAULT_ZONE</span>"</span>
    <span class="token key attr-name">datacenter</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">DefaultDataCenter</span>"</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token key attr-name">addressWaitTime</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">3000</span>"</span>
  }
  file {
    <span class="token key attr-name">name</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">file.conf</span>"</span>
  }
}

config {
  <span class="token comment"># file、nacos 、apollo、zk、consul、etcd3</span>
  <span class="token key attr-name">type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>

  nacos {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">myserver:8435</span>"</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">029fa2f3-e90a-400c-91ac-7f1b83dc4785</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">dataId</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seataServer.properties</span>"</span>
  }
  consul {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:8500</span>"</span>
    <span class="token key attr-name">aclToken</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  apollo {
    <span class="token key attr-name">appId</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata-server</span>"</span>
    <span class="token comment">## apolloConfigService will cover apolloMeta</span>
    <span class="token key attr-name">apolloMeta</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://192.168.1.204:8801</span>"</span>
    <span class="token key attr-name">apolloConfigService</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://192.168.1.204:8080</span>"</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">application</span>"</span>
    <span class="token key attr-name">apolloAccesskeySecret</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata</span>"</span>
  }
  zk {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:2181</span>"</span>
    <span class="token key attr-name">sessionTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">6000</span>
    <span class="token key attr-name">connectTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">nodePath</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">/seata/seata.properties</span>"</span>
  }
  etcd3 {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:2379</span>"</span>
  }
  file {
    <span class="token key attr-name">name</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">file.conf</span>"</span>
  }
}

</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br></div></div><h3 id="config-conf" tabindex="-1"><a class="header-anchor" href="#config-conf" aria-hidden="true">#</a> config.conf</h3>
<p>接着，我们想要seata的内容存放在mysql内，所以要修改<code>conf/file.conf</code>这个文件</p>
<p>注意，这个文件原本并没有啥内容，主要是参照这着同级目录下的另一个文件<code>file.conf.example</code>来进行修改</p>
<p>我们这里主要做了三件事</p>
<ol>
<li>自定义事务组名称</li>
<li>事务存储模式为db</li>
<li>数据库连接信息</li>
</ol>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment"># 传输模块 这个不用管 直接用即可</span>
transport {
    <span class="token comment"># tcp, unix-domain-socket</span>
    <span class="token key attr-name">type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">TCP</span>"</span>
    <span class="token comment">#NIO, NATIVE</span>
    <span class="token key attr-name">server</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NIO</span>"</span>
    <span class="token comment">#enable heartbeat</span>
    <span class="token key attr-name">heartbeat</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
    <span class="token comment"># the client batch send request enable</span>
    <span class="token key attr-name">enableClientBatchSendRequest</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token comment">#thread factory for netty</span>
    threadFactory {
        <span class="token key attr-name">bossThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyBoss</span>"</span>
        <span class="token key attr-name">workerThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyServerNIOWorker</span>"</span>
        <span class="token key attr-name">serverExecutorThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyServerBizHandler</span>"</span>
        <span class="token key attr-name">shareBossWorker</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
        <span class="token key attr-name">clientSelectorThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyClientSelector</span>"</span>
        <span class="token key attr-name">clientSelectorThreadSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
        <span class="token key attr-name">clientWorkerThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyClientWorkerThread</span>"</span>
        <span class="token comment"># netty boss thread size</span>
        <span class="token key attr-name">bossThreadSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
        <span class="token comment">#auto default pin or 8</span>
        <span class="token key attr-name">workerThreadSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    }
    shutdown {
        <span class="token comment"># when destroy server, wait seconds</span>
        <span class="token key attr-name">wait</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span>
    }
    <span class="token key attr-name">serialization</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata</span>"</span>
    <span class="token key attr-name">compressor</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">none</span>"</span>
}
<span class="token comment"># 这里是指定service 一定要配置</span>
service {
    <span class="token comment"># 这个是事务分组 开始是使用了一个默认的 这里要改成自己的 这里随便取一个名字就可以了，顺手就行</span>
    <span class="token comment"># 不过一般来说，我们的值都要以 tx_group结尾，例如aaa_tx_group</span>
    vgroupMapping {
        <span class="token key attr-name">seata_samples_tx_group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">fsp_tx_group</span>"</span>
    }
    <span class="token comment"># TC服务列表 这个不用管，仅注册中心为file时使用</span>
    <span class="token key attr-name">default.grouplist</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:8091</span>"</span>
    <span class="token key attr-name">enableDegrade</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token comment"># 全局事务开关 默认false。false为开启，true为关闭</span>
    <span class="token key attr-name">disableGlobalTransaction</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
}
<span class="token comment"># 下面这里也是固定操作 不用管</span>
client {
    rm {
        <span class="token key attr-name">asyncCommitBufferLimit</span> <span class="token punctuation">=</span> <span class="token value attr-value">10000</span>
        <span class="token key attr-name">lock.retryInterval</span> <span class="token punctuation">=</span> <span class="token value attr-value">10</span>
        <span class="token key attr-name">lock.retryTimes</span> <span class="token punctuation">=</span> <span class="token value attr-value">30</span>
        <span class="token key attr-name">lock.retryPolicyBranchRollbackOnConflict</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
        <span class="token key attr-name">reportRetryCount</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
        <span class="token key attr-name">tableMetaCheckEnable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
        <span class="token key attr-name">tableMetaCheckerInterval</span> <span class="token punctuation">=</span> <span class="token value attr-value">60000</span>
        <span class="token key attr-name">sqlParserType</span> <span class="token punctuation">=</span> <span class="token value attr-value">druid</span>
        <span class="token key attr-name">reportSuccessEnable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
        <span class="token key attr-name">sagaBranchRegisterEnable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    }
    tm {
        <span class="token key attr-name">commitRetryCount</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
        <span class="token key attr-name">rollbackRetryCount</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
        <span class="token key attr-name">defaultGlobalTransactionTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">60000</span>
        <span class="token key attr-name">degradeCheck</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
        <span class="token key attr-name">degradeCheckAllowTimes</span> <span class="token punctuation">=</span> <span class="token value attr-value">10</span>
        <span class="token key attr-name">degradeCheckPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>

    }
}


<span class="token comment">## transaction log store, only used in seata-server</span>
store {
    <span class="token comment">## store mode: file、db、redis 这里是让你选择存储模式，db就是mysql，file就是文件，redis就是用redis来存储数据</span>
    <span class="token key attr-name">mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">db</span>"</span>
    <span class="token comment">## rsa decryption public key 这里是公钥之类的配置 先不管</span>
    <span class="token key attr-name">publicKey</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token comment">## file store property</span>
    file {
        <span class="token comment">## store location dir</span>
        <span class="token key attr-name">dir</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">sessionStore</span>"</span>
        <span class="token comment"># branch session size , if exceeded first try compress lockkey, still exceeded throws exceptions</span>
        <span class="token key attr-name">maxBranchSessionSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">16384</span>
        <span class="token comment"># globe session size , if exceeded throws exceptions</span>
        <span class="token key attr-name">maxGlobalSessionSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">512</span>
        <span class="token comment"># file buffer size , if exceeded allocate new buffer</span>
        <span class="token key attr-name">fileWriteBufferCacheSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">16384</span>
        <span class="token comment"># when recover batch read size</span>
        <span class="token key attr-name">sessionReloadReadSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
        <span class="token comment"># async, sync</span>
        <span class="token key attr-name">flushDiskMode</span> <span class="token punctuation">=</span> <span class="token value attr-value">async</span>
    }

    <span class="token comment">## database store property 我们上面选择了DB，所以这里要配置一些基本的连接信息</span>
    db {
        <span class="token comment">## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp)/HikariDataSource(hikari) etc.</span>
        <span class="token key attr-name">datasource</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">druid</span>"</span>
        <span class="token comment">## mysql/oracle/postgresql/h2/oceanbase etc.</span>
        <span class="token key attr-name">dbType</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">mysql</span>"</span>
        <span class="token comment"># 注意 这里如果你用的是mysql8以下的话 要com.mysql.jdbc.Driver 否则 com.mysql.cj.jdbc.Driver</span>
        <span class="token key attr-name">driverClassName</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">com.mysql.cj.jdbc.Driver</span>"</span>
        <span class="token comment">## if using mysql to store the data, recommend add rewriteBatchedStatements=true in jdbc connection param</span>
        <span class="token key attr-name">url</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">jdbc:mysql://localhost:3306/seata?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;rewriteBatchedStatements=true&amp;&amp;serverTimezone=UTC</span>"</span>
        <span class="token key attr-name">user</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">root</span>"</span>
        <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">123456</span>"</span>
        <span class="token key attr-name">minConn</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
        <span class="token key attr-name">maxConn</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
        <span class="token key attr-name">globalTable</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">global_table</span>"</span>
        <span class="token key attr-name">branchTable</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">branch_table</span>"</span>
        <span class="token key attr-name">lockTable</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">lock_table</span>"</span>
        <span class="token key attr-name">queryLimit</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
        <span class="token key attr-name">maxWait</span> <span class="token punctuation">=</span> <span class="token value attr-value">5000</span>
    }

    <span class="token comment">## redis store property</span>
    redis {
        <span class="token comment">## redis mode: single、sentinel</span>
        <span class="token key attr-name">mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">single</span>"</span>
        <span class="token comment">## single mode property</span>
        single {
            <span class="token key attr-name">host</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1</span>"</span>
            <span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">6379</span>"</span>
        }
        <span class="token comment">## sentinel mode property</span>
        sentinel {
            <span class="token key attr-name">masterName</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
            <span class="token comment">## such as "10.28.235.65:26379,10.28.235.65:26380,10.28.235.65:26381"</span>
            <span class="token key attr-name">sentinelHosts</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
        }
        <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
        <span class="token key attr-name">database</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">0</span>"</span>
        <span class="token key attr-name">minConn</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
        <span class="token key attr-name">maxConn</span> <span class="token punctuation">=</span> <span class="token value attr-value">10</span>
        <span class="token key attr-name">maxTotal</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
        <span class="token key attr-name">queryLimit</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
    }
}
<span class="token comment">## server configuration, only used in server side 下面都是固定配置 一般不用管</span>
server {
    recovery {
        <span class="token comment">#schedule committing retry period in milliseconds</span>
        <span class="token key attr-name">committingRetryPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span>
        <span class="token comment">#schedule asyn committing retry period in milliseconds</span>
        <span class="token key attr-name">asynCommittingRetryPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span>
        <span class="token comment">#schedule rollbacking retry period in milliseconds</span>
        <span class="token key attr-name">rollbackingRetryPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span>
        <span class="token comment">#schedule timeout retry period in milliseconds</span>
        <span class="token key attr-name">timeoutRetryPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span>
    }
    undo {
        <span class="token key attr-name">logSaveDays</span> <span class="token punctuation">=</span> <span class="token value attr-value">7</span>
        <span class="token comment">#schedule delete expired undo_log in milliseconds</span>
        <span class="token key attr-name">logDeletePeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">86400000</span>
    }
    <span class="token comment">#check auth</span>
    <span class="token key attr-name">enableCheckAuth</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
    <span class="token comment">#unit ms,s,m,h,d represents milliseconds, seconds, minutes, hours, days, default permanent</span>
    <span class="token key attr-name">maxCommitRetryTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">-1</span>"</span>
    <span class="token key attr-name">maxRollbackRetryTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">-1</span>"</span>
    <span class="token key attr-name">rollbackRetryTimeoutUnlockEnable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token key attr-name">retryDeadThreshold</span> <span class="token punctuation">=</span> <span class="token value attr-value">130000</span>
}


<span class="token comment">## metrics configuration, only used in server side</span>
metrics {
    <span class="token key attr-name">enabled</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token key attr-name">registryType</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">compact</span>"</span>
    <span class="token comment"># multi exporters use comma divided</span>
    <span class="token key attr-name">exporterList</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">prometheus</span>"</span>
    <span class="token key attr-name">exporterPrometheusPort</span> <span class="token punctuation">=</span> <span class="token value attr-value">9898</span>
}

</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br></div></div><h3 id="导入脚本到sql、配置nacos" tabindex="-1"><a class="header-anchor" href="#导入脚本到sql、配置nacos" aria-hidden="true">#</a> 导入脚本到sql、配置nacos</h3>
<p>我们之前指定了<code>jdbc:mysql://127.0.0.1:3306/seata</code>这个数据库，所以要先配置下</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- -------------------------------- The script used when storeMode is 'db' --------------------------------</span>
<span class="token comment">-- the table to store GlobalSession data</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>global_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>                       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span>            <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>                    <span class="token keyword">TINYINT</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_id<span class="token punctuation">`</span></span>            <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_service_group<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_name<span class="token punctuation">`</span></span>          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>timeout<span class="token punctuation">`</span></span>                   <span class="token keyword">INT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>begin_time<span class="token punctuation">`</span></span>                <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_data<span class="token punctuation">`</span></span>          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>                <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>              <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_gmt_modified_status<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_transaction_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token comment">-- the table to store BranchSession data</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>branch_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>         <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>               <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span>    <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_group_id<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_id<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_type<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>            <span class="token keyword">TINYINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>client_id<span class="token punctuation">`</span></span>         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_data<span class="token punctuation">`</span></span>  <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>        <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>      <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_xid<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token comment">-- the table to store lock data</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>lock_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>row_key<span class="token punctuation">`</span></span>        <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>            <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>      <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_id<span class="token punctuation">`</span></span>    <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span>     <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>pk<span class="token punctuation">`</span></span>             <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>         <span class="token keyword">TINYINT</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'0:locked ,1:rollbacking'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>     <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>   <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>row_key<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_status<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_branch_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>lock_key<span class="token punctuation">`</span></span>       <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>lock_value<span class="token punctuation">`</span></span>     <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>expire<span class="token punctuation">`</span></span>         <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>lock_key<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'AsyncCommitting'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'RetryCommitting'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'RetryRollbacking'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'TxTimeoutCheck'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><p>然后我们在nacos中新建一个命名空间</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113133626909.png" alt="image-20220113133626909" loading="lazy"></p>
<p>这里唯一id填写我们刚刚生成的，或者你也可以让他自己生成，回头我们再写入到那啥里面</p>
<h3 id="配置脚本导入数据到nacos" tabindex="-1"><a class="header-anchor" href="#配置脚本导入数据到nacos" aria-hidden="true">#</a> 配置脚本导入数据到nacos</h3>
<p>这一步是将我们的配置数据转为远程存储，如果说你不需要的话 可以略过，直接到下一步（registry.conf的那两个type要改回file）</p>
<p>我们到这里<a href="https://github.com/seata/seata/tree/1.4.2/script/config-center" target="_blank" rel="noopener noreferrer">https://github.com/seata/seata/tree/1.4.2/script/config-center<ExternalLinkIcon/></a> 后续补充：别点这个链接，点下面那个</p>
<p>注意 这个config.txt要下载下来</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113134813184.png" alt="image-20220113134813184" loading="lazy"></p>
<blockquote>
<p>后续补充：<strong>千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本</strong></p>
<p><strong>用默认分支的脚本，不然百分之一万会出错</strong></p>
<p>默认分支的脚本<a href="https://github.com/seata/seata/tree/develop/script/config-center" target="_blank" rel="noopener noreferrer">https://github.com/seata/seata/tree/develop/script/config-center<ExternalLinkIcon/></a></p>
</blockquote>
<p>这里，我们在nacos-server内新建一个script文件夹，然后这个文件夹内的路径应该如下所示</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>script
├── config.txt
└── nacos
    ├── nacos-config.py
    └── nacos-config.sh
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>接着，修改config.txt的内容，它里面的内容是properties语法</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">transport.type</span><span class="token punctuation">=</span><span class="token attr-value">TCP</span>
<span class="token attr-name">transport.server</span><span class="token punctuation">=</span><span class="token attr-value">NIO</span>
<span class="token attr-name">transport.heartbeat</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">transport.enableClientBatchSendRequest</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">transport.threadFactory.bossThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyBoss</span>
<span class="token attr-name">transport.threadFactory.workerThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyServerNIOWorker</span>
<span class="token attr-name">transport.threadFactory.serverExecutorThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyServerBizHandler</span>
<span class="token attr-name">transport.threadFactory.shareBossWorker</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">transport.threadFactory.clientSelectorThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyClientSelector</span>
<span class="token attr-name">transport.threadFactory.clientSelectorThreadSize</span><span class="token punctuation">=</span><span class="token attr-value">1</span>
<span class="token attr-name">transport.threadFactory.clientWorkerThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyClientWorkerThread</span>
<span class="token attr-name">transport.threadFactory.bossThreadSize</span><span class="token punctuation">=</span><span class="token attr-value">1</span>
<span class="token attr-name">transport.threadFactory.workerThreadSize</span><span class="token punctuation">=</span><span class="token attr-value">default</span>
<span class="token attr-name">transport.shutdown.wait</span><span class="token punctuation">=</span><span class="token attr-value">3</span>
<span class="token comment"># 这里是分布式事务组的配置 默认是default</span>
<span class="token attr-name">service.vgroupMapping.my_test_tx_group</span><span class="token punctuation">=</span><span class="token attr-value">fsp_tx_group</span>
<span class="token attr-name">service.default.grouplist</span><span class="token punctuation">=</span><span class="token attr-value">127.0.0.1:8091</span>
<span class="token attr-name">service.enableDegrade</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">service.disableGlobalTransaction</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.rm.asyncCommitBufferLimit</span><span class="token punctuation">=</span><span class="token attr-value">10000</span>
<span class="token attr-name">client.rm.lock.retryInterval</span><span class="token punctuation">=</span><span class="token attr-value">10</span>
<span class="token attr-name">client.rm.lock.retryTimes</span><span class="token punctuation">=</span><span class="token attr-value">30</span>
<span class="token attr-name">client.rm.lock.retryPolicyBranchRollbackOnConflict</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">client.rm.reportRetryCount</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token attr-name">client.rm.tableMetaCheckEnable</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.rm.tableMetaCheckerInterval</span><span class="token punctuation">=</span><span class="token attr-value">60000</span>
<span class="token attr-name">client.rm.sqlParserType</span><span class="token punctuation">=</span><span class="token attr-value">druid</span>
<span class="token attr-name">client.rm.reportSuccessEnable</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.rm.sagaBranchRegisterEnable</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.tm.commitRetryCount</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token attr-name">client.tm.rollbackRetryCount</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token attr-name">client.tm.defaultGlobalTransactionTimeout</span><span class="token punctuation">=</span><span class="token attr-value">60000</span>
<span class="token attr-name">client.tm.degradeCheck</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.tm.degradeCheckAllowTimes</span><span class="token punctuation">=</span><span class="token attr-value">10</span>
<span class="token attr-name">client.tm.degradeCheckPeriod</span><span class="token punctuation">=</span><span class="token attr-value">2000</span>
<span class="token comment"># 修改db配置为我们之前的配置 这个注释要删掉</span>
<span class="token attr-name">store.mode</span><span class="token punctuation">=</span><span class="token attr-value">db</span>
<span class="token attr-name">store.publicKey</span><span class="token punctuation">=</span>
<span class="token attr-name">store.file.dir</span><span class="token punctuation">=</span><span class="token attr-value">file_store/data</span>
<span class="token attr-name">store.file.maxBranchSessionSize</span><span class="token punctuation">=</span><span class="token attr-value">16384</span>
<span class="token attr-name">store.file.maxGlobalSessionSize</span><span class="token punctuation">=</span><span class="token attr-value">512</span>
<span class="token attr-name">store.file.fileWriteBufferCacheSize</span><span class="token punctuation">=</span><span class="token attr-value">16384</span>
<span class="token attr-name">store.file.flushDiskMode</span><span class="token punctuation">=</span><span class="token attr-value">async</span>
<span class="token attr-name">store.file.sessionReloadReadSize</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">store.db.datasource</span><span class="token punctuation">=</span><span class="token attr-value">druid</span>
<span class="token attr-name">store.db.dbType</span><span class="token punctuation">=</span><span class="token attr-value">mysql</span>
<span class="token comment"># 注意这里的包名  这个注释要删掉</span>
<span class="token attr-name">store.db.driverClassName</span><span class="token punctuation">=</span><span class="token attr-value">com.mysql.cj.jdbc.Driver</span>
<span class="token attr-name">store.db.url</span><span class="token punctuation">=</span><span class="token attr-value">jdbc:mysql://localhost:3306/seata?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;rewriteBatchedStatements=true&amp;&amp;serverTimezone=UTC</span>
<span class="token attr-name">store.db.user</span><span class="token punctuation">=</span><span class="token attr-value">root</span>
<span class="token attr-name">store.db.password</span><span class="token punctuation">=</span><span class="token attr-value">123456</span>
<span class="token attr-name">store.db.minConn</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token attr-name">store.db.maxConn</span><span class="token punctuation">=</span><span class="token attr-value">30</span>
<span class="token attr-name">store.db.globalTable</span><span class="token punctuation">=</span><span class="token attr-value">global_table</span>
<span class="token attr-name">store.db.branchTable</span><span class="token punctuation">=</span><span class="token attr-value">branch_table</span>
<span class="token attr-name">store.db.queryLimit</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">store.db.lockTable</span><span class="token punctuation">=</span><span class="token attr-value">lock_table</span>
<span class="token attr-name">store.db.maxWait</span><span class="token punctuation">=</span><span class="token attr-value">5000</span>
<span class="token attr-name">store.redis.mode</span><span class="token punctuation">=</span><span class="token attr-value">single</span>
<span class="token attr-name">store.redis.single.host</span><span class="token punctuation">=</span><span class="token attr-value">127.0.0.1</span>
<span class="token attr-name">store.redis.single.port</span><span class="token punctuation">=</span><span class="token attr-value">6379</span>
<span class="token attr-name">store.redis.sentinel.masterName</span><span class="token punctuation">=</span>
<span class="token attr-name">store.redis.sentinel.sentinelHosts</span><span class="token punctuation">=</span>
<span class="token attr-name">store.redis.maxConn</span><span class="token punctuation">=</span><span class="token attr-value">10</span>
<span class="token attr-name">store.redis.minConn</span><span class="token punctuation">=</span><span class="token attr-value">1</span>
<span class="token attr-name">store.redis.maxTotal</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">store.redis.database</span><span class="token punctuation">=</span><span class="token attr-value">0</span>
<span class="token attr-name">store.redis.password</span><span class="token punctuation">=</span>
<span class="token attr-name">store.redis.queryLimit</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">server.recovery.committingRetryPeriod</span><span class="token punctuation">=</span><span class="token attr-value">1000</span>
<span class="token attr-name">server.recovery.asynCommittingRetryPeriod</span><span class="token punctuation">=</span><span class="token attr-value">1000</span>
<span class="token attr-name">server.recovery.rollbackingRetryPeriod</span><span class="token punctuation">=</span><span class="token attr-value">1000</span>
<span class="token attr-name">server.recovery.timeoutRetryPeriod</span><span class="token punctuation">=</span><span class="token attr-value">1000</span>
<span class="token attr-name">server.maxCommitRetryTimeout</span><span class="token punctuation">=</span><span class="token attr-value">-1</span>
<span class="token attr-name">server.maxRollbackRetryTimeout</span><span class="token punctuation">=</span><span class="token attr-value">-1</span>
<span class="token attr-name">server.rollbackRetryTimeoutUnlockEnable</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.undo.dataValidation</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">client.undo.logSerialization</span><span class="token punctuation">=</span><span class="token attr-value">jackson</span>
<span class="token attr-name">client.undo.onlyCareUpdateColumns</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">server.undo.logSaveDays</span><span class="token punctuation">=</span><span class="token attr-value">7</span>
<span class="token attr-name">server.undo.logDeletePeriod</span><span class="token punctuation">=</span><span class="token attr-value">86400000</span>
<span class="token attr-name">client.undo.logTable</span><span class="token punctuation">=</span><span class="token attr-value">undo_log</span>
<span class="token attr-name">client.undo.compress.enable</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">client.undo.compress.type</span><span class="token punctuation">=</span><span class="token attr-value">zip</span>
<span class="token attr-name">client.undo.compress.threshold</span><span class="token punctuation">=</span><span class="token attr-value">64k</span>
<span class="token attr-name">log.exceptionRate</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">transport.serialization</span><span class="token punctuation">=</span><span class="token attr-value">seata</span>
<span class="token attr-name">transport.compressor</span><span class="token punctuation">=</span><span class="token attr-value">none</span>
<span class="token attr-name">metrics.enabled</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">metrics.registryType</span><span class="token punctuation">=</span><span class="token attr-value">compact</span>
<span class="token attr-name">metrics.exporterList</span><span class="token punctuation">=</span><span class="token attr-value">prometheus</span>
<span class="token attr-name">metrics.exporterPrometheusPort</span><span class="token punctuation">=</span><span class="token attr-value">9898</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div><p>接着我们运行脚本，需要加参数</p>
<p>推荐使用sh，但如果你的nacos中的用户名和密码还是默认的nacos的话 可以使用py</p>
<p>sh脚本的使用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>-h nacos地址
-p 端口
-t 命名空间不写默认public
-u 用户名
-w 密码

<span class="token function">sh</span> nacos-config.sh -h myserver -p <span class="token number">8435</span> -g SEATA_GROUP -t 029fa2f3-e90a-400c-91ac-7f1b83dc4785 -u nacos -w nacos
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Py脚本同理</p>
<p>接着，你就可以在你的nacos内看到如下配置</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113141356702.png" alt="image-20220113141356702" loading="lazy"></p>
<h3 id="启动seata" tabindex="-1"><a class="header-anchor" href="#启动seata" aria-hidden="true">#</a> 启动Seata</h3>
<p>我们接着到bin目录中启动服务端</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113133058737.png" alt="image-20220113133058737" loading="lazy"></p>
<p>支持的参数  这些会覆盖掉我们配置的内容</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>-h: 注册到注册中心的ip
-p: Server rpc 监听端口 也就是seata监听的端口
-m: 全局事务会话信息存储模式，file、db、redis，优先读取启动参数 (Seata-Server 1.3及以上版本支持redis)
-n: Server node，多个Server时，需区分各自节点，用于生成不同区间的transactionId，以免冲突
-e: 多环境配置参考 http://seata.io/en-us/docs/ops/multi-configuration-isolation.html
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这个一般我们指定下端口即可</p>
<p>当然 我选择三个全都要</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>.<span class="token punctuation">\</span>seata-server.bat -p <span class="token number">8366</span> -h <span class="token number">192.168</span>.1.1 -m db
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果说你能看到最后端口号冒出来了，表示成功</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>15:38:19.557  INFO --- [                     main] io.seata.config.FileConfiguration        : The file name of the operation is registry
15:38:19.562  INFO --- [                     main] io.seata.config.FileConfiguration        : The configuration file used is D:\java_Program\seata-server-1.4.2\conf\registry.conf
15:38:22.158  INFO --- [                     main] com.alibaba.druid.pool.DruidDataSource   : {dataSource-1} inited
15:38:22.970  INFO --- [                     main] i.s.core.rpc.netty.NettyServerBootstrap  : Server started, listen port: 8366
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>如果说没有冒出来，<strong>表示你的registry内的nacos之类的信息没有配置正确</strong>，要仔细检查下</p>
<p>如果说你始终不成功的话</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113165743916.png" alt="image-20220113165743916" loading="lazy"></p>
<p>把这里面的sql版本换成你自己的即可</p>
<p>然后你就能在nacos的服务列表内看到它了</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113142831087.png" alt="image-20220113142831087" loading="lazy"></p>
<h3 id="使用本地文件和使用nacos内容的区别" tabindex="-1"><a class="header-anchor" href="#使用本地文件和使用nacos内容的区别" aria-hidden="true">#</a> 使用本地文件和使用Nacos内容的区别</h3>
<p>如果你要指定是本地文件还是Nacos文件，只需要在<code>registry.conf</code>内指定两个属性即可</p>
<p>registry.type是指定我们要把服务注册到哪</p>
<p>config.type是我们从哪里读取配置文件（从哪里读conig.conf）</p>
<h2 id="seata的分布式事务解决方案" tabindex="-1"><a class="header-anchor" href="#seata的分布式事务解决方案" aria-hidden="true">#</a> Seata的分布式事务解决方案</h2>
<h3 id="订单、库存、账户数据库的准备" tabindex="-1"><a class="header-anchor" href="#订单、库存、账户数据库的准备" aria-hidden="true">#</a> 订单、库存、账户数据库的准备</h3>
<p>这里就懒得说了，随便找个数据库</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113171026035.png" alt="image-20220113171026035" loading="lazy"></p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113171938191.png" alt="image-20220113171938191" loading="lazy"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> seata_order<span class="token punctuation">;</span>
<span class="token keyword">USE</span> seata_order<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t_order<span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">,</span>
    user_id <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户id'</span><span class="token punctuation">,</span>
    product_id <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'产品id'</span><span class="token punctuation">,</span>
    count <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'数量'</span><span class="token punctuation">,</span>
    money <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'金额'</span><span class="token punctuation">,</span>
    <span class="token keyword">status</span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'订单状态：0创建中，1已完结'</span>
<span class="token punctuation">)</span><span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">7</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> seata_storage<span class="token punctuation">;</span>
<span class="token keyword">USE</span> seata_storage<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t_storage<span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">,</span>
    product_id <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'产品id'</span><span class="token punctuation">,</span>
    total <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'总库存'</span><span class="token punctuation">,</span>
    used <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'已用库存'</span><span class="token punctuation">,</span>
    residue <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'剩余库存'</span>
<span class="token punctuation">)</span><span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">7</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> t_storage<span class="token punctuation">(</span>id<span class="token punctuation">,</span> product_id<span class="token punctuation">,</span> total<span class="token punctuation">,</span> used<span class="token punctuation">,</span> residue<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> seata_account<span class="token punctuation">;</span>
<span class="token keyword">USE</span> seata_account<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t_account<span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">,</span>
    user_id <span class="token keyword">BIGINT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户id'</span><span class="token punctuation">,</span>
    total <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'总额度'</span><span class="token punctuation">,</span>
    used <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'已用额度'</span><span class="token punctuation">,</span>
    residue <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span> <span class="token keyword">COMMENT</span> <span class="token string">'剩余可用额度'</span>
<span class="token punctuation">)</span><span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">7</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> t_account<span class="token punctuation">(</span>id<span class="token punctuation">,</span> user_id<span class="token punctuation">,</span> total<span class="token punctuation">,</span> used<span class="token punctuation">,</span> residue<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>我们最终建立好的库为</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113172101572.png" alt="image-20220113172101572" loading="lazy"></p>
<p>别以为这样就完了。。。还有一步，在三个库下分别建立对应的日志回滚表，日志回滚表都是一套模板的，Seata提供的，链接:<a href="https://github.com/seata/seata/blob/develop/script/client/at/db/mysql.sql" target="_blank" rel="noopener noreferrer">https://github.com/seata/seata/blob/develop/script/client/at/db/mysql.sql<ExternalLinkIcon/></a></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">USE</span> seata_order<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>undo_log<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>     <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'branch transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>           <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'global transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>context<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'undo_log context,such as serialization'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>rollback_info<span class="token punctuation">`</span></span> <span class="token keyword">LONGBLOB</span>     <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'rollback info'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_status<span class="token punctuation">`</span></span>    <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'0:normal status,1:defense status'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_created<span class="token punctuation">`</span></span>   <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'create datetime'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_modified<span class="token punctuation">`</span></span>  <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'modify datetime'</span><span class="token punctuation">,</span>
    <span class="token keyword">UNIQUE</span> <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>ux_undo_log<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">AUTO_INCREMENT</span> <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8 <span class="token keyword">COMMENT</span> <span class="token operator">=</span><span class="token string">'AT transaction mode undo table'</span><span class="token punctuation">;</span>
  <span class="token keyword">USE</span> seata_storage<span class="token punctuation">;</span>
  <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>undo_log<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>     <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'branch transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>           <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'global transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>context<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'undo_log context,such as serialization'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>rollback_info<span class="token punctuation">`</span></span> <span class="token keyword">LONGBLOB</span>     <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'rollback info'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_status<span class="token punctuation">`</span></span>    <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'0:normal status,1:defense status'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_created<span class="token punctuation">`</span></span>   <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'create datetime'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_modified<span class="token punctuation">`</span></span>  <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'modify datetime'</span><span class="token punctuation">,</span>
    <span class="token keyword">UNIQUE</span> <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>ux_undo_log<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">AUTO_INCREMENT</span> <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8 <span class="token keyword">COMMENT</span> <span class="token operator">=</span><span class="token string">'AT transaction mode undo table'</span><span class="token punctuation">;</span>
  <span class="token keyword">USE</span> seata_account<span class="token punctuation">;</span>
  <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>undo_log<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>     <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'branch transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>           <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'global transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>context<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'undo_log context,such as serialization'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>rollback_info<span class="token punctuation">`</span></span> <span class="token keyword">LONGBLOB</span>     <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'rollback info'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_status<span class="token punctuation">`</span></span>    <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'0:normal status,1:defense status'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_created<span class="token punctuation">`</span></span>   <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'create datetime'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_modified<span class="token punctuation">`</span></span>  <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'modify datetime'</span><span class="token punctuation">,</span>
    <span class="token keyword">UNIQUE</span> <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>ux_undo_log<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">AUTO_INCREMENT</span> <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8 <span class="token keyword">COMMENT</span> <span class="token operator">=</span><span class="token string">'AT transaction mode undo table'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>最终结构</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220113172656263.png" alt="image-20220113172656263" loading="lazy"></p>
<h3 id="业务需求梳理" tabindex="-1"><a class="header-anchor" href="#业务需求梳理" aria-hidden="true">#</a> 业务需求梳理</h3>
<ol>
<li>下订单</li>
<li>减库存</li>
<li>扣余额</li>
<li>改订单状态
<ol>
<li>如果支持成功，订单表的状态应该变为1，已完成</li>
</ol>
</li>
</ol>
<h3 id="公共模块" tabindex="-1"><a class="header-anchor" href="#公共模块" aria-hidden="true">#</a> 公共模块</h3>
<p>cloud-api-commons，用于统一各个地方的返回值以及公共类的存放，防止等下乱了</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.7.18<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.fasterxml.jackson.core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jackson-annotations<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>然后新建包project.domain</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@JsonInclude</span><span class="token punctuation">(</span><span class="token class-name">JsonInclude<span class="token punctuation">.</span>Include</span><span class="token punctuation">.</span>NON_NULL<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> code<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> data<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> code<span class="token punctuation">,</span> <span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> message<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>订单类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TAccount</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 唯一ID
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> user_id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 总额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> total<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 已用额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> used<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 剩余可用额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> residue<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>库存类：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TStorage</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 唯一ID
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 产品id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> product_id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 总库存
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> total<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 已用库存
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> used<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 剩余库存
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> residue<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>账户类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TAccount</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 唯一ID
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> user_id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 总额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> total<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 已用额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> used<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 剩余可用额度
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> residue<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h2 id="相关模块的准备" tabindex="-1"><a class="header-anchor" href="#相关模块的准备" aria-hidden="true">#</a> 相关模块的准备</h2>
<p>三个模块同理</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114183253532.png" alt="image-20220114183253532" loading="lazy"></p>
<p>最终我们想要的是： 创建订单-》调用库存扣减库存-》调用账户服务扣减账户余额-》修改订单状态</p>
<p>这样一个效果</p>
<p>这里我省略库存和账户服务的构建，那里面就是非常简单的CRUD，只保留订单的创建过程</p>
<p>名称为：<code>seata-order-service-2001</code></p>
<h3 id="依赖引入" tabindex="-1"><a class="header-anchor" href="#依赖引入" aria-hidden="true">#</a> 依赖引入</h3>
<p>seata固定死了是三个依赖，不要多也不要少，不然都会报错（DEBUG了两天的我如此说道）</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>seata.version</span><span class="token punctuation">></span></span>1.4.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>seata.version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--        这里是参考官方文档，引入和我们使用的seata server相同版本的seata 替换掉spring-cloud-alibaba-seata自带的--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${seata.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${seata.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>



    <span class="token comment">&lt;!--        Nacos--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        微服务之间的调用--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-loadbalancer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--        基本组件--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        自己的api--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>cloud-api-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br></div></div><h3 id="配置文件的准备" tabindex="-1"><a class="header-anchor" href="#配置文件的准备" aria-hidden="true">#</a> 配置文件的准备</h3>
<p>务必按照这套模板来做</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">2001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>order<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">namespace</span><span class="token punctuation">:</span> 029fa2f3<span class="token punctuation">-</span>e90a<span class="token punctuation">-</span>400c<span class="token punctuation">-</span>91ac<span class="token punctuation">-</span>7f1b83dc4785
  <span class="token comment">#    alibaba:</span>
  <span class="token comment">#      seata:</span>
  <span class="token comment"># 老版本要用这种方式开启（0.9.x） 新版本直接用下面那种</span>
  <span class="token comment">#        tx-service-group: ${spring.application.name}-tx_group</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/seata_order<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;rewriteBatchedStatements=true&amp;&amp;serverTimezone=UTC</span>
<span class="token comment"># 这里是开下log记录下回滚</span>
<span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">io</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span> info
<span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token comment"># 这里配置应用程序ID，和我们当前服务在Nacos注册的一致</span>
  <span class="token key atrule">application-id</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
  <span class="token comment"># 这里是选择分组 和之前在file.conf内注册的service一致（我之前注册的是seata-order-service-tx_group=default ） </span>
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span><span class="token punctuation">-</span>tx_group
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
      <span class="token comment"># 这里 是配置分组和服务的映射关系 我们之前把之前写的seata-order-service-tx_group=default搬过来就行</span>
      <span class="token key atrule">seata-order-service-tx_group</span><span class="token punctuation">:</span> default
  <span class="token comment"># 配置通讯</span>
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token comment"># 下面这里 配置我们在seata-server内配置的内容即可</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">application</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>server
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.cloud.nacos.discovery.server<span class="token punctuation">-</span>addr<span class="token punctuation">}</span>
      <span class="token key atrule">group</span><span class="token punctuation">:</span> <span class="token string">"SEATA_GROUP"</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token string">"029fa2f3-e90a-400c-91ac-7f1b83dc4785"</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token string">"nacos"</span>
      <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">"nacos"</span>

<span class="token comment"># 杂项</span>
<span class="token key atrule">mybatis-plus</span><span class="token punctuation">:</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> classpath<span class="token important">*:/mapper/**/*.xml</span>
  <span class="token key atrule">configuration</span><span class="token punctuation">:</span>
    <span class="token key atrule">log-impl</span><span class="token punctuation">:</span> org.apache.ibatis.logging.stdout.StdOutImpl
<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span>
        <span class="token comment">#建立连接所用的时间，适用于网络状况正常的情况下，两端连接所需要的时间</span>
        <span class="token key atrule">ConnectTimeOut</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token comment">#指建立连接后从服务端读取到可用资源所用的时间 这里是为了等下分布式事务做准备</span>
        <span class="token key atrule">ReadTimeOut</span><span class="token punctuation">:</span> <span class="token number">5000</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><h3 id="准备对应的mapper" tabindex="-1"><a class="header-anchor" href="#准备对应的mapper" aria-hidden="true">#</a> 准备对应的Mapper</h3>
<p>我们的Mapper需要这样</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderMapper</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 创建订单
     *
     * <span class="token keyword">@param</span> <span class="token parameter">order</span>
     */</span>
    <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">TOrder</span> order<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 修改订单状态
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span> 用户ID
     * <span class="token keyword">@param</span> <span class="token parameter">status</span> 订单状态：0未完成 1 已完成
     */</span>
    <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"userID"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">"status"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> status<span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>然后是手动写xml</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8" ?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mapper</span>
        <span class="token name">PUBLIC</span> <span class="token string">"-//mybatis.org//DTD Mapper 3.0//EN"</span>
        <span class="token string">"http://mybatis.org/dtd/mybatis-3-mapper.dtd"</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mapper</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.Project.mapper.OrderMapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resultMap</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BaseResultMapper<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>project.domain.TOrder<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user_id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>userId<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>product_id<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>productId<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>BIGINT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>count<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>count<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INTEGER<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>money<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>money<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DECIMAL<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>result</span> <span class="token attr-name">column</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>status<span class="token punctuation">"</span></span> <span class="token attr-name">property</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>status<span class="token punctuation">"</span></span> <span class="token attr-name">jdbcType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INTEGER<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resultMap</span><span class="token punctuation">></span></span>



    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>insert</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>create<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
        insert into seata_order.t_order(id, user_id, product_id, count, money, status)
        values (null, #{userId}, #{productId}, #{count}, #{money}, 0)
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>insert</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>update</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>update<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        update seata_order.t_order
        set status = 1
        where user_id = #{userID}
          and status = #{status}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>update</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mapper</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="准备service" tabindex="-1"><a class="header-anchor" href="#准备service" aria-hidden="true">#</a> 准备Service</h3>
<blockquote>
<p>首先是我们的订单service，用于创建订单</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">TOrder</span> order<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>接着因为我们之后还会调用另外两个模块的对应方法，这里先定义好FeginService来</p>
<blockquote>
<p>账户模块的接口</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span><span class="token string">"seata-account-service"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AccountService</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 扣减账户余额
     * <span class="token keyword">@param</span> <span class="token parameter">userId</span> 用户id
     * <span class="token keyword">@param</span> <span class="token parameter">money</span> 金额
     * <span class="token keyword">@return</span> 返回一个CommonResult 如果修改成功，那么其data值等于传入的money
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/account/decrease"</span><span class="token punctuation">)</span>
    <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"userId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"money"</span><span class="token punctuation">)</span> <span class="token class-name">BigDecimal</span> money<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><blockquote>
<p>库存模块的接口</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span><span class="token string">"seata-storage-service"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StorageService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 扣减指定数量的商品
     *
     * <span class="token keyword">@param</span> <span class="token parameter">productId</span> 商品ID
     * <span class="token keyword">@param</span> <span class="token parameter">count</span>     数量
     * <span class="token keyword">@return</span> 返回一个CommonResult 如果修改成功，那么其data值等于传入的count
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/storage/decrease"</span><span class="token punctuation">)</span>
    <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"productId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> productId<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">"count"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><blockquote>
<p>接着是我们订单模块的实现类，这里一定要知道自己这个业务是如何走的</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">OrderMapper</span> orderMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">AccountService</span> accountService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">StorageService</span> storageService<span class="token punctuation">;</span>


    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> SUCCESS_CODE <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建订单-》调用库存扣减库存-》调用账户服务扣减账户余额-》修改订单状态
     * 返回444 ERR  200 Success
     *
     * <span class="token keyword">@param</span> <span class="token parameter">order</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">TOrder</span> order<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"开始新建订单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       orderMapper<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"orderID:{}"</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        TODO</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用库存微服务进行扣减---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> decrease <span class="token operator">=</span> storageService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getProductId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>decrease<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>SUCCESS_CODE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用库存微服务进行扣减----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用账户微服务进行扣减---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> decreaseMoney <span class="token operator">=</span> accountService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>decreaseMoney<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>SUCCESS_CODE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用账户微服务进行扣减----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始更新订单状态---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                orderMapper<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始更新订单状态----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"下订单结束了 O(∩_∩)O哈哈~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token string">"下订单成功"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token string">"账户扣减失败"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">"库存扣减失败"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h3 id="取消数据库自动配置-自定义数据库代理配置" tabindex="-1"><a class="header-anchor" href="#取消数据库自动配置-自定义数据库代理配置" aria-hidden="true">#</a> 取消数据库自动配置-自定义数据库代理配置</h3>
<p>我们要给数据库设定一个代理才能在等下正常的使用</p>
<p>首先是main方法中，要加上排除数据库的自动配置</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>exclude <span class="token operator">=</span> <span class="token class-name">DataSourceAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"com.Project.mapper"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderService2001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">OrderService2001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>然后编写一个配置类，自己来配置数据库的数据源 这都是固定写法 以后直接搬过去就行</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSourceProxyConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${mybatis-plus.mapper-locations}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mapperLocations<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"spring.datasource"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">druidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DruidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">sqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">MybatisSqlSessionFactoryBean</span> sqlSessionFactoryBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MybatisSqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setMapperLocations</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PathMatchingResourcePatternResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                                                 <span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span>mapperLocations<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setTransactionFactory</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SpringManagedTransactionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<p>我刚刚完成了一个模块 还有两个模块，如果你有兴趣就自己搭建</p>
<p>最终应该是</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114193507737.png" alt="image-20220114193507737" loading="lazy"></p>
<p>2001调用2002，2002 调用结束后，2001再调用2003</p>
<p>我这里也省略测试了，直接run是跑得通的</p>
<p>但是如果我们此时在2003的业务方法上加上一个延迟</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AccountServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">AccountService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">AccountMapper</span> accountMapper<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token class-name">Long</span> userId<span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span> money<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Integer</span> decrease <span class="token operator">=</span> accountMapper<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span> money<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>decrease <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> decrease <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">444</span><span class="token punctuation">,</span> <span class="token string">"扣款失败"</span><span class="token punctuation">,</span> decrease<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">"扣款成功"</span><span class="token punctuation">,</span> decrease<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>总所周知，之前我们在2001内设置过了超时时间为5s，这样做无异于直接那啥了</p>
<p>所以说运行起来是绝对会报错的</p>
<p>我们再来捋一捋思路：</p>
<ol>
<li>下订单，标记status为0</li>
<li>减库存</li>
<li>扣钱</li>
<li>标记status为1</li>
</ol>
<p>如果说在减库存之后的扣钱的地方或者在最后标记之前出了问题，就会导致</p>
<ul>
<li>库存减了</li>
<li>钱减了</li>
<li>status没有标记为1</li>
</ul>
<h2 id="使用-globaltransaction解决问题" tabindex="-1"><a class="header-anchor" href="#使用-globaltransaction解决问题" aria-hidden="true">#</a> 使用@GlobalTransaction解决问题</h2>
<p>之前就说过，实际上我们使用起来非常简单</p>
<p>我们只需要在我们最开始的2001的业务类内加上一个注解就行</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">OrderMapper</span> orderMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">AccountService</span> accountService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">StorageService</span> storageService<span class="token punctuation">;</span>


    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> SUCCESS_CODE <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建订单-》调用库存扣减库存-》调用账户服务扣减账户余额-》修改订单状态
     * 444 ERR 200 Success
     *  
     * <span class="token keyword">@param</span> <span class="token parameter">order</span>
     */</span>
    <span class="token comment">// 这个GlobalTransactional的名称随便取 还记得之前我们的基本概念吗</span>
    <span class="token comment">// TC 这个就是我们的seata服务器</span>
    <span class="token comment">// TM 就是这个注解 整个事务的发起人</span>
    <span class="token comment">// RM 就是我们的三个数据库 </span>
   <span class="token comment">// 所以这个name就是这次事务的名称，取啥都行，保证全局唯一即可</span>
    <span class="token comment">// 然后这个rollbackFor 表示发生什么异常将会触发回滚 我们这里直接那啥捕获全部异常</span>
    <span class="token comment">// 当然 这样的话就是直接抛异常给客户了，所以我们之后可以在COntroller内添加对应的降级规则</span>
    <span class="token comment">// 这个@GlobalTransactional不止接收这几个参数 还能接受别的，具体可以看源码，例如可以排除指定异常</span>
    <span class="token annotation punctuation">@GlobalTransactional</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"fsp-create-order"</span><span class="token punctuation">,</span> rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">TOrder</span> order<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"开始新建订单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       orderMapper<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"orderID:{}"</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        TODO</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用库存微服务进行扣减---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> decrease <span class="token operator">=</span> storageService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getProductId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>decrease<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>SUCCESS_CODE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用库存微服务进行扣减----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用账户微服务进行扣减---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> decreaseMoney <span class="token operator">=</span> accountService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>decreaseMoney<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>SUCCESS_CODE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用账户微服务进行扣减----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始更新订单状态---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                orderMapper<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始更新订单状态----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"下订单结束了 O(∩_∩)O哈哈~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token string">"下订单成功"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token string">"账户扣减失败"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">"库存扣减失败"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><p>接下来你测试下 一定是出了错误后 数据库已经进行的所有操作都恢复没操作之前的，具体我这里就不演示了</p>
<h2 id="简单的原理解析" tabindex="-1"><a class="header-anchor" href="#简单的原理解析" aria-hidden="true">#</a> 简单的原理解析</h2>
<h3 id="基本流程" tabindex="-1"><a class="header-anchor" href="#基本流程" aria-hidden="true">#</a> 基本流程</h3>
<blockquote>
<p>Seata是蚂蚁金服的产物，所以说值得信赖</p>
<p>你可能会问，它是不是有…没错，GTS(<strong>G</strong>lobal<strong>T</strong>ran<strong>s</strong>actional的缩写)是阿里推出的服付费项目，有非常好的集群之类的玩意</p>
</blockquote>
<p>它的整体三组件，可以用一张图概括</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114195801910.png" alt="image-20220114195801910" loading="lazy"></p>
<p>它的执行流程为：</p>
<ol>
<li>TM开启分布式事务（TM向TC注册全局事务记录）</li>
<li>按业务场景，编排数据库，服务等事务内资源（RM向TC汇报资源准备状态）</li>
<li>TM结束分布式事务，事务一阶段结束（TM通知TC来提交/回滚事务）</li>
<li>TC汇总事务，决定分布式事务是提交还是回滚</li>
<li>TC通知所有RM提交/回滚资源，事务二阶段结束</li>
</ol>
<h3 id="at模式" tabindex="-1"><a class="header-anchor" href="#at模式" aria-hidden="true">#</a> AT模式</h3>
<p>官方文档中是这样说的</p>
<blockquote>
<p>Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。</p>
</blockquote>
<p>这几个模式没啥好说的，反正用AT即可</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114200431812.png" alt="image-20220114200431812" loading="lazy"></p>
<p>当然，阿里云主推的GTS比AT强非常多</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114200812457.png" alt="image-20220114200812457" loading="lazy"></p>
<p>这句话代表着啥呢？</p>
<p>就是我们每一个操作，都会记录在</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114200719502.png" alt="image-20220114200719502" loading="lazy"></p>
<p>这个表中，然后统一的，在这些表中提现</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114200742919.png" alt="image-20220114200742919" loading="lazy"></p>
<p>它总共分为三个阶段</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114200854020.png" alt="image-20220114200854020" loading="lazy"></p>
<p>这就相当于Spring的AOP：前置通知和后置通知</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114201148826.png" alt="image-20220114201148826" loading="lazy"></p>
<p>然后是三阶段</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114201348572.png" alt="image-20220114201348572" loading="lazy"></p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114201355998.png" alt="image-20220114201355998" loading="lazy"></p>
<p>可能你会说 啥都没有看到</p>
<p>DEBUG一下就看得到了hhh</p>
<p>先打个断点</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114201716474.png" alt="image-20220114201716474" loading="lazy"></p>
<p>然后你就能在你的seata库内看到内容</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114201731704.png" alt="image-20220114201731704" loading="lazy"></p>
<p>出现了三个ID</p>
<p>我们可以看到中间的 XID 三个一模一样 并且 规则都是相同的这就是我们全局的事务ID（TM的ID）</p>
<p>然后左边的是分支ID，三个都不相同</p>
<p>最终是这样的，我们的xid加上这个分支id来决定我们的全部内容</p>
<p>并且你还可以在这后面看到他们所有的详细内容</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114202011787.png" alt="image-20220114202011787" loading="lazy"></p>
<p>接下来我们看看其他表的情况</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114202053947.png" alt="image-20220114202053947" loading="lazy"></p>
<p>首先看订单表 他这个undo_log就多出了一些内容</p>
<p>首先第二个和第三个 和之前的一样 分支id和全局事务id，我们主要看后面的</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114202214494.png" alt="image-20220114202214494" loading="lazy"></p>
<p>rollback_info 这又是个啥玩意?</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114202308873.png" alt="image-20220114202308873" loading="lazy"></p>
<p>把他提取出来后 可以看到两个 一个beforeImage 一个afterImage</p>
<p>也就是我们在执行前和执行后的内容，都被封装成了一个内部类 保存在内存中</p>
<p>接着我们回过头来看看原理</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114202448744.png" alt="image-20220114202448744" loading="lazy"></p>
<p>就相当于是这样的</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114202606699.png" alt="image-20220114202606699" loading="lazy"></p>
<p>我们在执行业务之前 都先哪一个小本本记录下当前的状态 执行完毕后同理</p>
<p>那么操作之后如果成功了倒没啥，如果失败了就要进行反补</p>
<p>反补又是什么呢？</p>
<p>我们前面做了insert 它就会执行delete</p>
<p>我们前面做了update 它就会执行方向update回退</p>
<p>我们也知道 它是有一两个镜像来记录我们修改之前的值和修改之后的值，所以说他们将会直接用镜像内的内容来进行修改</p>
<blockquote>
<p>当然 这之前还有一个验证脏写的过程：对比当前数据库内的数据和存放的afterImage内的数据，如果结果一致，就直接进行反补</p>
<p>如果说不一样 那就…需要转人工处理</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114203246779.png" alt="image-20220114203246779" loading="lazy"></p>
</blockquote>
<p>我们的前置数据和后置数据都在镜像内存储的明明白白的</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114203435775.png" alt="image-20220114203435775" loading="lazy"></p>
<p>然后我们再来看看这张表</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114203540728.png" alt="image-20220114203540728" loading="lazy"></p>
<p>这里的内容就是一个xid 非常明显，就是我们的@GlobalTransaction发起的</p>
<p>然后还有一个lock表</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114203617419.png" alt="image-20220114203617419" loading="lazy"></p>
<p>能非常直观的看到，这里把我们的三张表全给锁了</p>
<p>接着你取消debug之后，全部内容都没了，也印证了官方文档的那句话</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114203827692.png" alt="image-20220114203827692" loading="lazy"></p>
<p>所以最终的流程为</p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114203955251.png" alt="image-20220114203955251" loading="lazy"></p>
<p><img src="/images/SpringCloud/14-Seata分布式事务/image-20220114204036254.png" alt="image-20220114204036254" loading="lazy"></p>
<p>代理数据源：就是我们自己配置的@bean之类的</p>
</template>
