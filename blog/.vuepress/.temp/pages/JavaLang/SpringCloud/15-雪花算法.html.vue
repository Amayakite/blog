<template><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<blockquote>
<p>集群高并发情况下如何保证分布式唯一ID的生成？</p>
</blockquote>
<p>是不是看起来很简单的样子..</p>
<p>先说需求</p>
<p>以前我们是单机</p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114211815157.png" alt="image-20220114211815157" loading="lazy"></p>
<p>所以随便自己用UUID，或者SQL之类的 瞎玩即可</p>
<p>但现在是一个多机的系统，就有时钟和机器配置不同步的问题，导致我们可能会产生出相同的ID</p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114211922258.png" alt="image-20220114211922258" loading="lazy"></p>
<p>我们对于ID生成规则有着如下的硬性要求</p>
<ol>
<li>全局唯一：不能出现重复的ID号，既然是唯一标识，这是最基本的要求</li>
<li>趋势递增：在Mysql中使用的InnoDB引擎中使用的是聚集索引，由于多数RDMB使用的B数树的数据结构来存储索引数据，在主键的选择上面我们应该尽量使用有序的主键来保证写入性能</li>
<li>单调递增：保证下一个ID一定大于上一个ID，例如事务版本号，IM增量信息，排序等特殊要求</li>
<li>信息安全：如果ID是连续的，恶意用户的爬取工作就非常容易做了，直接按照顺序下载指定URL即可，如果是订单号就更危险了，竞争对手可以直接的知道我们一天的单量，所以在一些应用场景下，需要ID无规则不规则，让竞争对手不好猜</li>
<li>含时间戳：这样就能在开发中快速了解这个分布式ID的生成时间</li>
</ol>
<p>看起来是不是非常的。。。苛刻</p>
<p>并且还要求这个生成系统的可用性及其高，假设是在Mysql下，宕机了，就GG</p>
<p>所以要具备如下三点</p>
<ul>
<li>高可用：发一个分布式请求，有99.99999%的情况下给我们直接生成一个全局唯一ID</li>
<li>低延迟：毫秒级，不接受超过30ms</li>
<li>高QPS：例如一秒给我10W个</li>
</ul>
<p>我们之前主要有三种</p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114213341695.png" alt="image-20220114213341695" loading="lazy"></p>
<blockquote>
<p>UUID</p>
</blockquote>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114213358792.png" alt="image-20220114213358792" loading="lazy"></p>
<p>但是UUID会使得存入数据库的性能变差，并且不易维护</p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114213507167.png" alt="image-20220114213507167" loading="lazy"></p>
<blockquote>
<p>主键</p>
</blockquote>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114213644500.png" alt="image-20220114213644500" loading="lazy"></p>
<p>虽然说可以，但是我们如果在分布式情况下就会遇到两个问题</p>
<ol>
<li>扛不住高并发</li>
<li>生成的ID是有序的，容易被人认出来</li>
</ol>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114213830933.png" alt="image-20220114213830933" loading="lazy"></p>
<p>说到高性能，那不就得是Redis</p>
<blockquote>
<p>Redis</p>
</blockquote>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114214203206.png" alt="image-20220114214203206" loading="lazy"></p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114214155239.png" alt="image-20220114214155239" loading="lazy"></p>
<p>但是Redis的坏处也摆在那</p>
<p>为了生成一个UUID，我们要部署一个集群，划不来，而且如果使用过程中有机器宕机了，生成的id还会缺斤少两的，容易造成重复</p>
<h3 id="雪花算法的介绍" tabindex="-1"><a class="header-anchor" href="#雪花算法的介绍" aria-hidden="true">#</a> 雪花算法的介绍</h3>
<p>这是Twitter的分布式自增ID算法，名称为Snowflake</p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114214914399.png" alt="image-20220114214914399" loading="lazy"></p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114214924909.png" alt="image-20220114214924909" loading="lazy"></p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114215023087.png" alt="image-20220114215023087" loading="lazy"></p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114215357825.png" alt="image-20220114215357825" loading="lazy"></p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114215413689.png" alt="image-20220114215413689" loading="lazy"></p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114215522386.png" alt="image-20220114215522386" loading="lazy"></p>
<p>官网<a href="https://github.com/twitter-archive/snowflake" target="_blank" rel="noopener noreferrer">https://github.com/twitter-archive/snowflake<ExternalLinkIcon/></a></p>
<p>没错 已经归档了</p>
<p>但是我们首先得了解下这东西 首先看看他的最大值</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>11111111111111111111111111111111111111111
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里有41个1，他被翻译成十进制就是（因为这个算法内只有0和1，所以可以看做是二进制）</p>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114220121690.png" alt="image-20220114220121690" loading="lazy"></p>
<p>也就是2199023255551L（Long）</p>
<p>把他转换成Date的话就是：<code>2039-09-07</code></p>
<p>也就是说 这个算法可以用到2040年</p>
<p>2039-1970=69年，em貌似也没错</p>
<h2 id="使用雪花算法" tabindex="-1"><a class="header-anchor" href="#使用雪花算法" aria-hidden="true">#</a> 使用雪花算法</h2>
<p>这玩意由于官方用的是一种没见过的语言写的，所以略过</p>
<p>我们直接那啥用别人做好了的就行</p>
<p>一般生产环境中都是直接用Hutool的</p>
<p>当然网上也有人写好了</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IdWorker</span> <span class="token punctuation">{</span>
 
	<span class="token comment">//因为二进制里第一个 bit 为如果是 1，那么都是负数，但是我们生成的 id 都是正数，所以第一个 bit 统一都是 0。</span>
 
	<span class="token comment">//机器ID  2进制5位  32位减掉1位 31个</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> workerId<span class="token punctuation">;</span>
	<span class="token comment">//机房ID 2进制5位  32位减掉1位 31个</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> datacenterId<span class="token punctuation">;</span>
	<span class="token comment">//代表一毫秒内生成的多个id的最新序号  12位 4096 -1 = 4095 个</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> sequence<span class="token punctuation">;</span>
	<span class="token comment">//设置一个时间初始值    2^41 - 1   差不多可以用69年</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> twepoch <span class="token operator">=</span> <span class="token number">1585644268888L</span><span class="token punctuation">;</span>
	<span class="token comment">//5位的机器id</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> workerIdBits <span class="token operator">=</span> <span class="token number">5L</span><span class="token punctuation">;</span>
	<span class="token comment">//5位的机房id</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> datacenterIdBits <span class="token operator">=</span> <span class="token number">5L</span><span class="token punctuation">;</span>
	<span class="token comment">//每毫秒内产生的id数 2 的 12次方</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> sequenceBits <span class="token operator">=</span> <span class="token number">12L</span><span class="token punctuation">;</span>
	<span class="token comment">// 这个是二进制运算，就是5 bit最多只能有31个数字，也就是说机器id最多只能是32以内</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> maxWorkerId <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> workerIdBits<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">// 这个是一个意思，就是5 bit最多只能有31个数字，机房id最多只能是32以内</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> maxDatacenterId <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> datacenterIdBits<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
	<span class="token keyword">private</span> <span class="token keyword">long</span> workerIdShift <span class="token operator">=</span> sequenceBits<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> datacenterIdShift <span class="token operator">=</span> sequenceBits <span class="token operator">+</span> workerIdBits<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> timestampLeftShift <span class="token operator">=</span> sequenceBits <span class="token operator">+</span> workerIdBits <span class="token operator">+</span> datacenterIdBits<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> sequenceMask <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> sequenceBits<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">//记录产生时间毫秒数，判断是否是同1毫秒</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> lastTimestamp <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getWorkerId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span> workerId<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getDatacenterId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> datacenterId<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getTimestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
 
 
 
	<span class="token keyword">public</span> <span class="token class-name">IdWorker</span><span class="token punctuation">(</span><span class="token keyword">long</span> workerId<span class="token punctuation">,</span> <span class="token keyword">long</span> datacenterId<span class="token punctuation">,</span> <span class="token keyword">long</span> sequence<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
		<span class="token comment">// 检查机房id和机器id是否超过31 不能小于0</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>workerId <span class="token operator">></span> maxWorkerId <span class="token operator">||</span> workerId <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span>
					<span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"worker Id can't be greater than %d or less than 0"</span><span class="token punctuation">,</span>maxWorkerId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
 
		<span class="token keyword">if</span> <span class="token punctuation">(</span>datacenterId <span class="token operator">></span> maxDatacenterId <span class="token operator">||</span> datacenterId <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
			<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span>
					<span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"datacenter Id can't be greater than %d or less than 0"</span><span class="token punctuation">,</span>maxDatacenterId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>workerId <span class="token operator">=</span> workerId<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>datacenterId <span class="token operator">=</span> datacenterId<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>sequence <span class="token operator">=</span> sequence<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
 
	<span class="token comment">// 这个是核心方法，通过调用nextId()方法，让当前这台机器上的snowflake算法程序生成一个全局唯一的id</span>
	<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">long</span> <span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 这儿就是获取当前时间戳，单位是毫秒</span>
		<span class="token keyword">long</span> timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>timestamp <span class="token operator">&lt;</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
			<span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span>
					<span class="token string">"clock is moving backwards. Rejecting requests until %d."</span><span class="token punctuation">,</span> lastTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>
					<span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"Clock moved backwards. Refusing to generate id for %d milliseconds"</span><span class="token punctuation">,</span>
							lastTimestamp <span class="token operator">-</span> timestamp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
 
		<span class="token comment">// 下面是说假设在同一个毫秒内，又发送了一个请求生成一个id</span>
		<span class="token comment">// 这个时候就得把seqence序号给递增1，最多就是4096</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>lastTimestamp <span class="token operator">==</span> timestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
			<span class="token comment">// 这个意思是说一个毫秒内最多只能有4096个数字，无论你传递多少进来，</span>
			<span class="token comment">//这个位运算保证始终就是在4096这个范围内，避免你自己传递个sequence超过了4096这个范围</span>
			sequence <span class="token operator">=</span> <span class="token punctuation">(</span>sequence <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> sequenceMask<span class="token punctuation">;</span>
			<span class="token comment">//当某一毫秒的时间，产生的id数 超过4095，系统会进入等待，直到下一毫秒，系统继续产生ID</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>sequence <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				timestamp <span class="token operator">=</span> <span class="token function">tilNextMillis</span><span class="token punctuation">(</span>lastTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
 
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			sequence <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 这儿记录一下最近一次生成id的时间戳，单位是毫秒</span>
		lastTimestamp <span class="token operator">=</span> timestamp<span class="token punctuation">;</span>
		<span class="token comment">// 这儿就是最核心的二进制位运算操作，生成一个64bit的id</span>
		<span class="token comment">// 先将当前时间戳左移，放到41 bit那儿；将机房id左移放到5 bit那儿；将机器id左移放到5 bit那儿；将序号放最后12 bit</span>
		<span class="token comment">// 最后拼接起来成一个64 bit的二进制数字，转换成10进制就是个long型</span>
		<span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>timestamp <span class="token operator">-</span> twepoch<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> timestampLeftShift<span class="token punctuation">)</span> <span class="token operator">|</span>
				<span class="token punctuation">(</span>datacenterId <span class="token operator">&lt;&lt;</span> datacenterIdShift<span class="token punctuation">)</span> <span class="token operator">|</span>
				<span class="token punctuation">(</span>workerId <span class="token operator">&lt;&lt;</span> workerIdShift<span class="token punctuation">)</span> <span class="token operator">|</span> sequence<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
 
	<span class="token doc-comment comment">/**
	 * 当某一毫秒的时间，产生的id数 超过4095，系统会进入等待，直到下一毫秒，系统继续产生ID
	 * <span class="token keyword">@param</span> <span class="token parameter">lastTimestamp</span>
	 * <span class="token keyword">@return</span>
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> <span class="token function">tilNextMillis</span><span class="token punctuation">(</span><span class="token keyword">long</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
		<span class="token keyword">long</span> timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
		<span class="token keyword">while</span> <span class="token punctuation">(</span>timestamp <span class="token operator">&lt;=</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> timestamp<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//获取当前时间戳</span>
	<span class="token keyword">private</span> <span class="token keyword">long</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
 
	<span class="token doc-comment comment">/**
	 *  main 测试类
	 * <span class="token keyword">@param</span> <span class="token parameter">args</span>
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">&amp;</span><span class="token number">4596</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token operator">&amp;</span><span class="token number">4596</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token operator">&amp;</span><span class="token number">4596</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token operator">&amp;</span><span class="token number">4596</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token operator">&amp;</span><span class="token number">4596</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token operator">&amp;</span><span class="token number">4596</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//		IdWorker worker = new IdWorker(1,1,1);</span>
<span class="token comment">//		for (int i = 0; i &lt; 22; i++) {</span>
<span class="token comment">//			System.out.println(worker.nextId());</span>
<span class="token comment">//		}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br></div></div><p>当然 我这里就懒得用一般的了，直接上<a href="https://www.hutool.cn/docs/#/core/%E5%B7%A5%E5%85%B7%E7%B1%BB/%E5%94%AF%E4%B8%80ID%E5%B7%A5%E5%85%B7-IdUtil" target="_blank" rel="noopener noreferrer">Hutool<ExternalLinkIcon/></a></p>
<p>它的文档中是这样说的</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//参数1为终端ID</span>
<span class="token comment">//参数2为数据中心ID</span>
<span class="token class-name">Snowflake</span> snowflake <span class="token operator">=</span> <span class="token class-name">IdUtil</span><span class="token punctuation">.</span><span class="token function">getSnowflake</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> id <span class="token operator">=</span> snowflake<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后还说</p>
<blockquote>
<p>注意 <code>IdUtil.createSnowflake</code>每次调用会创建一个新的Snowflake对象，不同的Snowflake对象创建的ID可能会有重复，因此请自行维护此对象为单例，或者使用<code>IdUtil.getSnowflake</code>使用全局单例对象。</p>
</blockquote>
<p>使用非常简单</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Snowflake</span> snowflake <span class="token operator">=</span> <span class="token class-name">IdUtil</span><span class="token punctuation">.</span><span class="token function">getSnowflake</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> l <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>snowflake<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"所耗时长="</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> l<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="/images/SpringCloud/15-雪花算法/image-20220114221518793.png" alt="image-20220114221518793" loading="lazy"></p>
<p>100w 五秒</p>
<h2 id="整合springboot" tabindex="-1"><a class="header-anchor" href="#整合springboot" aria-hidden="true">#</a> 整合SpringBoot</h2>
<p>非常简单，我们先来准备下依赖</p>
<p>这里我就懒得cloud了</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.7.18<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>然后准备一个类即可 至于怎么调用 这里就不多做说明了</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Project</span><span class="token punctuation">.</span>service<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">cn<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>core<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">Snowflake</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">cn<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>core<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span><span class="token class-name">NetUtil</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">cn<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>core<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">IdUtil</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostConstruct</span><span class="token punctuation">;</span>


<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IdGeneratorSnowflake</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">long</span> workerId <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> datacenterId <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Snowflake</span> snowflake <span class="token operator">=</span> <span class="token class-name">IdUtil</span><span class="token punctuation">.</span><span class="token function">getSnowflake</span><span class="token punctuation">(</span>workerId<span class="token punctuation">,</span> datacenterId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 注意 这个注解不是请求之类的 是拿来在初始化完毕之后做一些其他的工作的
     */</span>
    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//        获取本机的ip的long形式</span>
            workerId <span class="token operator">=</span> <span class="token class-name">NetUtil</span><span class="token punctuation">.</span><span class="token function">ipv4ToLong</span><span class="token punctuation">(</span><span class="token class-name">NetUtil</span><span class="token punctuation">.</span><span class="token function">getLocalhostStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"本机的ip（workerId）是：{}"</span><span class="token punctuation">,</span> workerId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">"获取本机的ip失败，默认使用本机网卡地址作为workerId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            workerId <span class="token operator">=</span> <span class="token class-name">NetUtil</span><span class="token punctuation">.</span><span class="token function">getLocalhostStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"本机的ip（workerId）是：{}"</span><span class="token punctuation">,</span> workerId<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取一个id
     *
     * <span class="token keyword">@return</span> 一个long
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">long</span> <span class="token function">snowflakeId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> snowflake<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 自定义的终端ID和数据中心ID生成雪花算法ID
     * <span class="token keyword">@param</span> <span class="token parameter">workerId</span> 终端ID
     * <span class="token keyword">@param</span> <span class="token parameter">datacenterId</span> 数据中心ID
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">long</span> <span class="token function">snowflakeId</span><span class="token punctuation">(</span><span class="token keyword">long</span> workerId<span class="token punctuation">,</span> <span class="token keyword">long</span> datacenterId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">IdUtil</span><span class="token punctuation">.</span><span class="token function">getSnowflake</span><span class="token punctuation">(</span>workerId<span class="token punctuation">,</span> datacenterId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><h2 id="雪花算法的优缺点" tabindex="-1"><a class="header-anchor" href="#雪花算法的优缺点" aria-hidden="true">#</a> 雪花算法的优缺点</h2>
<p><img src="/images/SpringCloud/15-雪花算法/image-20220114223724086.png" alt="image-20220114223724086" loading="lazy"></p>
<p>当然 还有其他的解决方案</p>
<ol>
<li>百度开源的分布式唯一ID生成器<a href="https://github.com/baidu/uid-generator" target="_blank" rel="noopener noreferrer">UIDGenerator<ExternalLinkIcon/></a></li>
<li>美团点评开源的分布式ID生成系统-<a href="https://github.com/Meituan-Dianping/Leaf" target="_blank" rel="noopener noreferrer">Leaf<ExternalLinkIcon/></a></li>
</ol>
<p>使用起来都是大同小异 没啥根本区别</p>
<p>当然 除非是托大的项目 不然用不上他们两的</p>
<p>个人更推荐使用Leaf，因为它文档上的一句话让我产生了好感</p>
<blockquote>
<p>There are no two identical leaves in the world.</p>
<p>世界上没有两片完全相同的树叶。</p>
<p>— 莱布尼茨</p>
</blockquote>
</template>
