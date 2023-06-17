import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o,c,a as n,b as s,d as i,e as a}from"./app-2d4b26c1.js";const l={},u=a(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>这玩意也是 Go 语言中比较核心的两个东西</p><p>为啥说是两个？</p><div class="hint-container info"><p class="hint-container-title">Go 语言的线程</p><p>在 Go 语言中的并发通过<code>goroutine</code>实现，<code>goroutine</code>并不是真正的系统层面的线程，而是用户态的线程</p><p>我们可以更具需求创建上千万个<code>goroutine</code>并发工作，<code>goroutine</code>是由 Go 语言的运行时<code>runtime</code>调度完成</p><p>而线程是由操作系统调度完成</p><p>GO 语言还提供<code>channel</code>在多个<code>goroutine</code>间进行通讯，<code>goroutine</code>和<code>channel</code>是 Go 语言秉承的 CSP 并发模式的重要实现基础</p><p>CSP：Communicating Sequentinal Process</p></div><h2 id="goroutine-的概念" tabindex="-1"><a class="header-anchor" href="#goroutine-的概念" aria-hidden="true">#</a> GoRoutine 的概念</h2><p>在 Java/C++中我们需要实现并发编程的时候，通常需要自己去维护一个线程池并且还要包装一个又一个的任务</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">MyPool</span> pool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyPool</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">&quot;my-thread&quot;</span><span class="token punctuation">,</span><span class="token number">60000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    pool<span class="token punctuation">.</span><span class="token function">excute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Hello,World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">//......</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些操作往往会消费我们大量的心智，那么有没有一种机制---我们只需要定义很多个任务</p><p>让系统去帮我们把这些任务分配到 CPU 上实现并发执行呢？</p><blockquote><p>GO 语言中的<code>goruntine</code>就是这样一种概念，它的概念类似于线程，但是其是由 GO 运行时调度和管理的</p><p>GO 程序会智能的将<code>goroutine</code>中的任务合理的分配给每个 CPU</p><p>GO 语言之所以被称为现代化的编程语言，就是因为它在语言层面上已经内置的调度和上下文切换机制</p></blockquote><p>在 Go 语言中，不需要自己去写进程、线程、协程，只需要一个<code>goroutine</code>，当需要让某个任务并发执行的时候</p><p>只需要将这个任务包装成一个函数，开启一个<code>goroutine</code>去执行这个函数即可</p><h2 id="使用-goroutine" tabindex="-1"><a class="header-anchor" href="#使用-goroutine" aria-hidden="true">#</a> 使用 GoRoutine</h2><p>Go 语言中使用这个东西非常简单，只需要在调用函数的时候前面加上一个<code>go</code>关键字，就可以让这个函数成为一个<code>goroutine</code></p><p>一个<code>goroutine</code>必定对应一个函数，可以创建多个<code>goroutine</code>去执行相同的函数</p><h3 id="启动单个-goroutine" tabindex="-1"><a class="header-anchor" href="#启动单个-goroutine" aria-hidden="true">#</a> 启动单个 GoRoutine</h3><p>先上例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">go</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Main Start...&quot;</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Main End...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Main Start...
Hello World
Main End...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，线程并不是立刻启动，而是等待调度</p><p>并且 main 线程并不是守护线程，并不会等待其他线程执行完毕后才会结束</p><p>为了验证严谨性，多开一点线程试试</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">hello</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Main Start...&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Main End...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">hello</span><span class="token punctuation">(</span>num <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>emmm 貌似又可以成功的等待全部线程结束，可能是因为加了 for 的原因，for 执行也要时间的</p><h3 id="等待多个线程执行完毕" tabindex="-1"><a class="header-anchor" href="#等待多个线程执行完毕" aria-hidden="true">#</a> 等待多个线程执行完毕</h3><p>这个其实非常简单，直接看代码即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 创建一个计数器 就类似于Java才那啥指示灯一样</span>
<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Main Started&quot;</span><span class="token punctuation">)</span>

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token comment">//让计数+1</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token function">hello</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//阻塞直至计数器归零</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Main End&quot;</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">hello</span><span class="token punctuation">(</span>num <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//让计数-1</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="匿名函数来开一个线程" tabindex="-1"><a class="header-anchor" href="#匿名函数来开一个线程" aria-hidden="true">#</a> 匿名函数来开一个线程</h3><p>非常简单，只需要注意参数最好得自己传递即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>
<span class="token comment">// 方式1，常规函数方式</span>
<span class="token keyword">func</span> <span class="token function">hello</span><span class="token punctuation">(</span>count <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;欢迎你第 %d 次\\n&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">demo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">hello</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// 开启一个单独的goroutine去执行hello函数(任务)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方式2.匿名函数方式</span>
<span class="token keyword">func</span> <span class="token function">demo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>count <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;第 %d 次欢迎你\\n&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 程序启动之后会创建一个主Goroutine去执行。</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;[*] main start&quot;</span><span class="token punctuation">)</span>
	<span class="token function">demo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">demo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>  <span class="token comment">// 最暴力简单的延时函数</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;[-] main end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 如果main函数结束了，则由main启动的goroutine也结束了。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="goruntime-原理" tabindex="-1"><a class="header-anchor" href="#goruntime-原理" aria-hidden="true">#</a> GoRuntime 原理</h2><p>GPM 是 Go 语言运行时（runtime）层面的实现，是 go 语言自己实现的一套调度系统。区别于操作系统调度 OS 线程，它比起 OS 的调度更轻量级些。</p><blockquote><p>goroutine GMP 模型:</p></blockquote><ul><li>G 其就是个 goroutine 里面除了存放本 goroutine 信息外，还存放与所在 P 的绑定等信息。</li><li>P 管理着一组 goroutine 队列，P 里面会存储当前 goroutine 运行的上下文环境（函数指针，堆栈地址及地址边界），P 会对自己管理的 goroutine 队列做一些调度（比如把占用 CPU 时间较长的 goroutine 暂停、运行后续的 goroutine 等等）当自己的队列消费完了就去全局队列里取，如果全局队列里也消费完了会去其他 P 的队列里抢任务。</li><li>M (machine) 是 Go 运行时（runtime）对操作系统内核线程的虚拟，M 与内核线程(Kernel Thread)一般是一一映射的关系，一个 groutine 最终是要放到 M 上执行的；</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Q: P 与 M 有何关系?</p><p>描述: P 与 M 通常是一一对应的,他们关系是 P 管理着一组 G 挂载在 M 上运行。当一个 G 长久阻塞在一个 M 上时，runtime 会新建一个 M，阻塞 G 所在的 P 会把其他的 G 挂载在新建的 M 上，当旧的 G 阻塞完成或者认为其已经死掉时则回收旧的 M。</p></div><p>P 的个数是通过  runtime.GOMAXPROCS 设定（最大 256 核），Go1.5 版本之后默认为物理线程数。在并发量大的时候会增加一些 P 和 M，但不会太多，切换上下文太频繁的话得不偿失。</p><p>单从线程调度讲，Go 语言相比起其他语言的优势在于 OS 线程是由 OS 内核来调度的，goroutine 则是由 Go 运行时（runtime）自己的调度器调度的，这个调度器使用一个称为 m:n 调度的技术（复用/调度 m 个 goroutine 到 n 个 OS 线程）。 其一大特点是 goroutine 的调度是在用户态下完成的， 不涉及内核态与用户态之间的频繁切换，包括内存的分配与释放，都是在用户态维护着一块大的内存池， 不直接调用系统的 malloc 函数（除非内存池需要改变），成本比调度 OS 线程低很多。 另一方面充分利用了多核的硬件资源，近似的把若干 goroutine 均分在物理线程上， 再加上本身 goroutine 的超轻量，以上种种保证了 go 调度方面的性能。</p><p>Tips: goroutine 组最终是要放在 M(内核态)中执行，不过在此之前 goroutine 已经将任务进行排好队列（底层实现线程池），然后等待分别到操作系统之中。</p>`,39),k={href:"https://www.cnblogs.com/sunsky303/p/9705727.html",target:"_blank",rel:"noopener noreferrer"},d=a(`<blockquote><p>Goroutine 线程数<br> 描述: Go 运行时的调度器使用 GOMAXPROCS 参数来设置使用多少个 OS 线程来同时执行 Go 代码，其默认值是机器上的 CPU 核心数。</p></blockquote><p>Go 语言中可以通过 runtime.GOMAXPROCS(NUMBER)函数, 设置当前程序并发时占用的 CPU 逻辑核心数。并可以通过  runtime.NumCPU()  与  runtime.NumGoroutine()  分别查看机器中的逻辑 CPU 数和当前存在的 goroutine 数。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Go1.5 版本之前，默认使用的是单核心执行。</p><p>Go1.5 版本之后，默认使用全部的 CPU 逻辑核心数。</p></div><p>例如，在一个 8 核心的机器上，调度器会把 Go 代码同时调度到 8 个 OS 线程上（GOMAXPROCS 是 m:n 调度中的 n）。</p><p>Q: 什么是 M:N?<br> 答: M:N  即把 m 个 goroutine 任务分配给 n 个操作系统线程去执行。</p><p>Go 语言中的操作系统线程和 goroutine 的关系：</p><p>一个操作系统线程对应用户态的多个 goroutine。</p><p>go 语言程序可以同时使用多个操作系统线程。</p><p>go 语言中的 goroutine 与 OS 线程是多对多的关系，即 m:n 的关系。</p><p>我们可以通过将任务分配到不同的 CPU 逻辑核心上实现并行的效果：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Func A() :&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Func B() :&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;[*] Main Start&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;当前机器的 CPU 核心数:&quot;</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span><span class="token function">NumCPU</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// NumCPU返回当前进程可用的逻辑CPU数量。</span>
	runtime<span class="token punctuation">.</span><span class="token function">GOMAXPROCS</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment">// 占用cpu的两个核</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 并发调用a函数（后输出）</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 并发调用a函数（先输出）</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;当前机器的 goroutine 数:&quot;</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// NumGoroutine返回当前存在的goroutine数。</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;[*] Main End&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[*] Main Start
当前机器的 CPU 核心数: 8
当前机器的 goroutine 数: 3
Func A() : 0
Func A() : 1
Func A() : 2
Func A() : 3
Func A() : 4
Func A() : 5
Func B() : 0
Func B() : 1
Func B() : 2
Func B() : 3
Func B() : 4
Func B() : 5
[*] Main End
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="channel" tabindex="-1"><a class="header-anchor" href="#channel" aria-hidden="true">#</a> Channel</h2><p>单纯地将函数并发执行是没有意义的，函数与函数间需要交换数据才能体现并发执行函数的意义。</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>虽然可以使用共享内存进行数据交换，但是共享内存在不同的 goroutine 中容易发生竞态问题，所以为了保证数据交换的正确性，就必须使用互斥量对内存进行加锁，但是这种做法势必造成性能方面的问题。</p><p>为了解决上述问题,Go 语言的并发模型采用得是(CSP-Communicating Sequential Processes), 它提倡通过<strong>通信共享内存</strong>而不是通过共享内存而实现通信,其引入了 channel 的概念。</p><p>如果说 goroutine 是 Go 程序并发的执行体，而 channel (英 [ˈtʃænl]) 就是它们之间的连接通道, channel 是可以让一个 goroutine 发送特定值到另一个 goroutine 的通信机制。</p><p>简单的说: 即通过 Channel 实现多个 goroutine 之间的通信。</p></div><p>Go 语言中的通道（channel）是一种特殊的类型, 通道像一个传送带或者队列，总是遵循先入先出（First In First Out）的规则，保证收发数据的顺序。每一个通道都是一个具体类型的导管，也就是声明 channel 的时候需要为其指定元素类型。</p><h3 id="channel-的类型" tabindex="-1"><a class="header-anchor" href="#channel-的类型" aria-hidden="true">#</a> Channel 的类型</h3><p>channel 是特殊类型(一种引用类型), 其声明通道类型的格式如下：<code>var 变量 chan 元素类型</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> ch1 <span class="token keyword">chan</span> <span class="token builtin">int</span>   <span class="token comment">// 声明一个传递整型的通道</span>
<span class="token keyword">var</span> ch2 <span class="token keyword">chan</span> <span class="token builtin">bool</span>  <span class="token comment">// 声明一个传递布尔型的通道</span>
<span class="token keyword">var</span> ch3 <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token comment">// 声明一个传递int切片的通道</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本使用-channel" tabindex="-1"><a class="header-anchor" href="#基本使用-channel" aria-hidden="true">#</a> 基本使用 Channel</h3><p>还是比较简单的，非常像是之前学习 RabbitMQ 时候的通道机制了</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 需要制定通道中的元素类型</span>
<span class="token keyword">var</span> b <span class="token keyword">chan</span> <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token comment">//通道的初始化 必须项 不使用make初始化则无法使用</span>
	<span class="token comment">//看具体消息的数量，初始化一个带缓冲区的通道，例如16等，如果消息少的话，就不要传数字了</span>
	b <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

	<span class="token comment">//    发送一个值到通道中</span>
	b <span class="token operator">&lt;-</span> <span class="token number">100</span>

	<span class="token comment">//    从通道中获取一个值 也可以不写接收方（接收一个值并且忽略结果）</span>
	x <span class="token operator">:=</span> <span class="token operator">&lt;-</span>b
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	<span class="token comment">//    关闭通道，这是通过内置的close来关闭</span>
	<span class="token function">close</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>如果说一个通道在 GO 语言看来不会在接受任何消息的时候，再尝试使用它接受消息，将会抛出让死锁异常：</p><p>fatal error: all goroutines are asleep - deadlock!</p></div><p>举个简单的线程通讯的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 需要制定通道中的元素类型</span>
<span class="token keyword">var</span> b <span class="token keyword">chan</span> <span class="token builtin">int</span>

<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	b <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i <span class="token operator">:=</span> <span class="token operator">&lt;-</span>b
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;接收到了消息:&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	b <span class="token operator">&lt;-</span> <span class="token number">10</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;10发送到通道b中了&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来一个简单的两个线程之间传递值（MD 咋感觉这就是生产消费者了）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewUser</span><span class="token punctuation">(</span>username <span class="token builtin">string</span><span class="token punctuation">,</span> password <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>User <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span>Username<span class="token punctuation">:</span> username<span class="token punctuation">,</span> Password<span class="token punctuation">:</span> password<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> userChannels <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>User<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Main starting...&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">//    启动接收user的</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//	启动十个创建User的</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token function">setUser</span><span class="token punctuation">(</span><span class="token function">NewUser</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;12312321&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main end&quot;</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	user <span class="token operator">:=</span> <span class="token operator">&lt;-</span>userChannels
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;接收到了User,%#v\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>user<span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">setUser</span><span class="token punctuation">(</span>user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	userChannels <span class="token operator">&lt;-</span> user
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;发送了User:%#v\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="带缓冲和不带缓冲的区别" tabindex="-1"><a class="header-anchor" href="#带缓冲和不带缓冲的区别" aria-hidden="true">#</a> 带缓冲和不带缓冲的区别</h3><p>使用无缓冲通道进行通信将导致发送和接收的 goroutine 同步化,因此无缓冲通道也被称为同步通道。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">10</span>  <span class="token comment">// 代码会阻塞在 ch &lt;- 10这一行代码形成死锁</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;发送成功&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这段代码能够通过编译，但是执行的时候会出现以下错误：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fatal error: all goroutines are asleep - deadlock!
goroutine 1 [chan send]:
main.main()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>为什么会出现 deadlock 错误呢？</p></blockquote><p>因为我们使用 ch := make(chan int)创建的是无缓冲的通道，无缓冲的通道只有在有人接收值的时候才能发送值。<br> 例如: 就像你住的小区如果没有快递柜和代收点，快递员给你打电话必须要把这个物品送到你的手中，简单来说就是无缓冲的通道必须有接收才能发送。</p><blockquote><p>那如何解决这个问题呢？</p></blockquote><p>一种方法是启用一个 goroutine 去接收值，另外一种方式就是采用带缓冲的通道（后续介绍）。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">recv</span><span class="token punctuation">(</span>c <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ret <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;接收成功&quot;</span><span class="token punctuation">,</span> ret<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">recv</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span> <span class="token comment">// 启用goroutine从通道接收值</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">10</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;发送成功&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Tips: 在无缓冲通道上的发送操作会阻塞，直到另一个 goroutine 在该通道上执行接收操作，这时值才能发送成功，两个 goroutine 将继续执行。</p><p>Tips: 在无缓冲通道上的如果接收操作先执行，接收方的 goroutine 将阻塞，直到另一个 goroutine 在该通道上发送一个值。</p><blockquote><p>使用有缓冲区的通道可以解决无缓冲的通道阻塞问题, 我们可以在使用 make 函数初始化通道的时候为其指定通道的容量，例如</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 创建一个容量为1的有缓冲区通道</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">10</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;发送成功&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要通道的容量大于零，那么该通道就是有缓冲的通道，通道的容量表示通道中能存放元素的数量, 就像你小区的快递柜只有那么个多格子，格子满了就装不下了就阻塞了，等到别人取走一个快递员就能往里面放一个。</p><p>同时我们可以使用内置的 len 函数获取通道内元素的数量，使用 cap 函数获取通道的容量，虽然我们很少会这么做。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// make 函数申请内存空间的传入对象（实例化三种类型）</span>
<span class="token keyword">var</span> s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>          <span class="token comment">// slice 切片</span>
<span class="token keyword">var</span> m <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token comment">// map 字典映射</span>
<span class="token keyword">var</span> c <span class="token keyword">chan</span> <span class="token builtin">int</span>       <span class="token comment">// 指定通道中元素的类型</span>

<span class="token comment">// 定义全局的waitGroup</span>
<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token comment">// 无缓冲的通道示例</span>
<span class="token keyword">func</span> <span class="token function">noBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>      <span class="token comment">// 未初始化的通道返回 nil （未向内存中申请空间）</span>
	c <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token comment">// 不带缓冲区通道的初始化 （但必须有对应的接收）</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;将 10 发生到 channel c 之中&quot;</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 并行任务的顺序非常重要，此处不能放在 c &lt;- 10 后否则终端将会一直处于阻塞状态</span>
		<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		x <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Backgroup Goroutine 从 channel c 中取得 %v \\n\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	c <span class="token operator">&lt;-</span> <span class="token number">10</span> <span class="token comment">// 将 10 发生到 channel c 之中（注意此行放的顺序）</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token comment">// 关闭通道</span>
<span class="token punctuation">}</span>

<span class="token comment">// 有缓冲的通道示例</span>
<span class="token keyword">func</span> <span class="token function">useBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>        <span class="token comment">// 未初始化的通道返回 nil （未向内存中申请空间）</span>
	c <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// 带缓冲区通道的初始化</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;通道缓冲数量（发送前）:&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
	c <span class="token operator">&lt;-</span> <span class="token number">10</span>                                <span class="token comment">// 将 10 发生到 channel c 之中</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;同样将 10 发生到 channel c 之中&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 此处将不会阻塞</span>
	c <span class="token operator">&lt;-</span> <span class="token number">20</span>                                <span class="token comment">// 将 10 发生到 channel c 之中</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;然后将 20 发生到 channel c 之中&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 如何缓冲区通道初始化为1，则此处将阻塞,如果初始化通道缓冲区大于等于2将会不阻塞</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;通道缓冲数量（发送后）:&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
	x <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;第一次，从channel c中取到了 %v\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	x <span class="token operator">=</span> <span class="token operator">&lt;-</span>c
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;第二次，从channel c中取到了 %v\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;channel c ptr = %p \\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token comment">// 关闭通道</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">noBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">useBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;nil&gt;
将 10 发生到 channel c 之中
Backgroup Goroutine 从 channel c 中取得 10

&lt;nil&gt;
通道缓冲数量: 0
同样将 10 发生到 channel c 之中
然后将 20 发生到 channel c 之中
通道缓冲数量: 2
第一次，从channel c中取到了 10
第二次，从channel c中取到了 20
channel c ptr = 0xc0000240e0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="channel-遍历" tabindex="-1"><a class="header-anchor" href="#channel-遍历" aria-hidden="true">#</a> Channel 遍历</h3><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>当一个通道发送到通道队列里有多个值时, 此时我们想取出通道队列的所有值时，我们可以使用 for range 遍历通道，并且当通道被关闭的时候就会退出 for range 遍历。</p><p>当向通道中发送完数据时，我们可以通过 close 函数来关闭通道，如果此时再往该通道发送值会引发 panic，从该通道取值的操作会先取完通道中的值，再然后取到的值一直都是对应类型的零值。</p></div><blockquote><p>那如何判断一个通道是否被关闭了呢？</p></blockquote><ul><li>第一种方法&lt;-ch</li><li>第二种方法 for range 遍历通道</li></ul><p>例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// channel 遍历实践操作</span>
<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token comment">// 方式1</span>
<span class="token keyword">func</span> <span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token comment">// 不带缓冲区</span>
	ch2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token comment">// 开启goroutine将1~9的数发送到ch1中</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			ch1 <span class="token operator">&lt;-</span> i
		<span class="token punctuation">}</span>
		<span class="token function">close</span><span class="token punctuation">(</span>ch1<span class="token punctuation">)</span> <span class="token comment">// 关闭通道 ch2 （此时只能读不能写）</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 开启goroutine从ch1中接收值，并将该值的平方发送到ch2中</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			i<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch1 <span class="token comment">// 通道关闭后再取值到末尾时，ok=false 【关键点值得学习】</span>
			<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			ch2 <span class="token operator">&lt;-</span> i <span class="token operator">*</span> i <span class="token comment">// 同样求取通道的平方</span>
		<span class="token punctuation">}</span>
		<span class="token function">close</span><span class="token punctuation">(</span>ch2<span class="token punctuation">)</span> <span class="token comment">// 关闭通道 ch2 （此时只能读不能写）</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 在主goroutine中从ch2中接收值打印</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;方式1:&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> ch2 <span class="token punctuation">{</span> <span class="token comment">// 通道关闭后会退出for range循环</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 负责将10～19发送到ch1中</span>
<span class="token keyword">func</span> <span class="token function">f1</span><span class="token punctuation">(</span>ch1 <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">10</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		ch1 <span class="token operator">&lt;-</span> i
	<span class="token punctuation">}</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch1<span class="token punctuation">)</span> <span class="token comment">// 关闭通道 ch1 （此时只能读不能写）</span>
<span class="token punctuation">}</span>

<span class="token comment">// 负责将接收ch1值的值进行平方运算</span>
<span class="token keyword">func</span> <span class="token function">f2</span><span class="token punctuation">(</span>ch1<span class="token punctuation">,</span> ch2 <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> num <span class="token operator">:=</span> <span class="token keyword">range</span> ch1 <span class="token punctuation">{</span>   【关键点】
		ch2 <span class="token operator">&lt;-</span> num <span class="token operator">*</span> num
	<span class="token punctuation">}</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch2<span class="token punctuation">)</span> <span class="token comment">// 关闭通道 ch2 （此时只能读不能写）</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方式2</span>
<span class="token keyword">func</span> <span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">// 带缓冲区</span>
	ch2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token comment">// goroutine 等待组数量设置</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token comment">// 开启 goroutine</span>
	<span class="token keyword">go</span> <span class="token function">f1</span><span class="token punctuation">(</span>ch1<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">f2</span><span class="token punctuation">(</span>ch1<span class="token punctuation">,</span> ch2<span class="token punctuation">)</span>
	<span class="token comment">// 等待全部 goroutine 任务执行完毕</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;方式2:&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 通道关闭后会退出for range循环</span>
	<span class="token keyword">for</span> ret <span class="token operator">:=</span> <span class="token keyword">range</span> ch2 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &quot;</span><span class="token punctuation">,</span> ret<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 匿名函数</span>
	<span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 常规函数</span>
	<span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单向通道" tabindex="-1"><a class="header-anchor" href="#单向通道" aria-hidden="true">#</a> 单向通道</h3><p>有些时候，我们只想让某些函数来进行发送或者只接受消息</p><p>就像是使用消息中间件那样，明确<strong>消费者</strong>和<strong>接收者</strong></p><p>所以在这样场景下 Go 语言中提供了单向通道来处理这种情况</p><ul><li><p><code>out chan&lt;- int</code> 是一个只写单向通道（只能对其写入 int 类型值），可以对其执行发送操作但是不能执行接收操作;</p></li><li><p><code>in &lt;-chan int</code> 是一个只读单向通道（只能从其读取 int 类型值），可以对其执行接收操作但是不能执行发送操作;</p></li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在函数传参及任何赋值操作中可以将双向通道转换为单向通道，但反过来是不可以的。</p></div><p>接下来举个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewUser</span><span class="token punctuation">(</span>username <span class="token builtin">string</span><span class="token punctuation">,</span> password <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>User <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span>Username<span class="token punctuation">:</span> username<span class="token punctuation">,</span> Password<span class="token punctuation">:</span> password<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> userChannels <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>User<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Main starting...&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">//    启动接收user的</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">getUser</span><span class="token punctuation">(</span>userChannels<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//	启动十个创建User的</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token function">setUser</span><span class="token punctuation">(</span>userChannels<span class="token punctuation">,</span> <span class="token function">NewUser</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;12312321&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main end&quot;</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token comment">// 只能接收信息的通道</span>
<span class="token keyword">func</span> <span class="token function">getUser</span><span class="token punctuation">(</span>input <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	user <span class="token operator">:=</span> <span class="token operator">&lt;-</span>input
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;接收到了User,%#v\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>user<span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 只能发送信息的通道</span>
<span class="token keyword">func</span> <span class="token function">setUser</span><span class="token punctuation">(</span>out <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token operator">*</span>User<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out <span class="token operator">&lt;-</span> user
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;发送了User:%#v\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="线程池" tabindex="-1"><a class="header-anchor" href="#线程池" aria-hidden="true">#</a> 线程池</h2><p>emm 这个 GoLang 没有类似于 JUC 的工具类，所以一般得用第三方的或者自己手动的写一个线程池</p><p>其实手动实现一个也不难，只需要这样即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">,</span> jobs <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> result <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token keyword">range</span> jobs <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;worker:%d start jobs:%d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> j<span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;worker:%d end jobs:%d\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">,</span> j<span class="token punctuation">)</span>
		result <span class="token operator">&lt;-</span> j <span class="token operator">*</span> <span class="token number">2</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	jobs <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
	result <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>

	<span class="token comment">// 开启3个worker</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> jobs<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 五个任务</span>
	<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
		jobs <span class="token operator">&lt;-</span> j
	<span class="token punctuation">}</span>
	<span class="token comment">// 关闭输入通道</span>
	<span class="token function">close</span><span class="token punctuation">(</span>jobs<span class="token punctuation">)</span>
	<span class="token comment">// 输出结果</span>
	<span class="token keyword">for</span> a <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> a <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> a<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token operator">&lt;-</span>result
	<span class="token punctuation">}</span>
	<span class="token comment">// 关闭输出通道</span>
	<span class="token function">close</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>例子：使用Goruntine和Channel实现一个计算int64随机数各位数的程序</p><ol><li>开启一个goRoutine循环生成int64类型的随机数，发送到<code>jobChan</code></li><li>开启24个<code>goroutine</code>从<code>jobChan</code>中取出随机数计算各位数的合，将结果发送到<code>resultChan</code></li><li>主<code>goroutine</code>从resultChan中取出结果并打印输出</li></ol></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math/rand&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Job <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	value <span class="token builtin">int64</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> Result <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Job
	result <span class="token builtin">int64</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> jobChan <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Job<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> resultChan <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Result<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token comment">// 生成随机数，并存放到jobChan内</span>
<span class="token keyword">func</span> <span class="token function">zhoulin</span><span class="token punctuation">(</span>job <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token operator">*</span>Job<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 循环生成int64类型的整数，并且放入jobChan中</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		x <span class="token operator">:=</span> rand<span class="token punctuation">.</span><span class="token function">Int63</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		newJob <span class="token operator">:=</span> <span class="token operator">&amp;</span>Job<span class="token punctuation">{</span>
			value<span class="token punctuation">:</span> x<span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		jobChan <span class="token operator">&lt;-</span> newJob
		<span class="token comment">// sleep半秒</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Microsecond <span class="token operator">*</span> <span class="token number">500</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 第一个取值，第二个存放值</span>
<span class="token keyword">func</span> <span class="token function">getValue</span><span class="token punctuation">(</span>job <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token operator">*</span>Job<span class="token punctuation">,</span> result <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token operator">*</span>Result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 从jobChan中取出随机数计算各位数的和，将结果存放到result</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		jobValue <span class="token operator">:=</span> <span class="token operator">&lt;-</span>job
		resultValue <span class="token operator">:=</span> jobValue<span class="token punctuation">.</span>value
		<span class="token keyword">var</span> sum <span class="token builtin">int64</span>
		<span class="token keyword">for</span> jobValue<span class="token punctuation">.</span>value <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			sum <span class="token operator">+=</span> jobValue<span class="token punctuation">.</span>value <span class="token operator">%</span> <span class="token number">10</span>
			jobValue<span class="token punctuation">.</span>value <span class="token operator">/=</span> <span class="token number">10</span>
		<span class="token punctuation">}</span>
		newResult <span class="token operator">:=</span> <span class="token operator">&amp;</span>Result<span class="token punctuation">{</span>
			Job<span class="token punctuation">:</span>    <span class="token operator">*</span><span class="token operator">&amp;</span>Job<span class="token punctuation">{</span>value<span class="token punctuation">:</span> resultValue<span class="token punctuation">}</span><span class="token punctuation">,</span>
			result<span class="token punctuation">:</span> sum<span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		resultChan <span class="token operator">&lt;-</span> newResult
		<span class="token comment">// 垃圾回收</span>
		runtime<span class="token punctuation">.</span><span class="token function">GC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">zhoulin</span><span class="token punctuation">(</span>jobChan<span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">24</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">getValue</span><span class="token punctuation">(</span>jobChan<span class="token punctuation">,</span> resultChan<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 获取结果</span>
	<span class="token keyword">for</span> result <span class="token operator">:=</span> <span class="token keyword">range</span> resultChan <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;value:%d, result:%d\\n&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span>Job<span class="token punctuation">,</span> result<span class="token punctuation">.</span>result<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h2><p>这个嘛，懂得都懂，先看一个例子吧</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>

<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上方代码中，count的值大概率是奇奇怪怪的，例如我几次下来都不一样，为此就需要锁来解决这个问题了</p><blockquote><p>PS:如果一次是10000那么多试几次即可</p></blockquote><p>接下来使用锁来解决这个问题</p><h3 id="互斥锁" tabindex="-1"><a class="header-anchor" href="#互斥锁" aria-hidden="true">#</a> 互斥锁</h3><p>使用<code>sync</code>包下的<code>Mutex</code>即可完成</p><p>使用起来非常简单，就像是Java中使用<code>ReentLock</code>那样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>

<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
<span class="token keyword">var</span> lock sync<span class="token punctuation">.</span>Mutex

<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
	lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>注意加锁位置，如果说太细的了话，那也会造成资源浪费</p></div><h3 id="读写锁" tabindex="-1"><a class="header-anchor" href="#读写锁" aria-hidden="true">#</a> 读写锁</h3><p>这个和在Java中一样的概念</p><ul><li>同一个时间段内，可以有多个读，但是如果有写的话，读写都会阻塞，也就是 <ul><li>读读不阻塞</li><li>读写阻塞</li><li>写写阻塞</li></ul></li></ul><blockquote><p>PS:防止脏数据的话可以<strong>写写阻塞</strong>中<strong>判断哈希值</strong>或者其他方式完成</p></blockquote><p>使用方法很简单</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>

<span class="token comment">// 创建一个读写锁</span>
<span class="token keyword">var</span> lock sync<span class="token punctuation">.</span>RWMutex

<span class="token comment">// 读锁函数</span>
<span class="token keyword">func</span> <span class="token function">read</span><span class="token punctuation">(</span>x <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	lock<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 读取</span>
	lock<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 写锁函数</span>
<span class="token keyword">func</span> <span class="token function">write</span><span class="token punctuation">(</span>x <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 写入</span>
	lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 读锁</span>
	<span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;read&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 写锁</span>
	<span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;write&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="waitgroup信号量" tabindex="-1"><a class="header-anchor" href="#waitgroup信号量" aria-hidden="true">#</a> WaitGroup信号量</h3><p>这个也一直在用，就不多说明了，简单的代码例子：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>

<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token comment">// 增加一个计数</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token comment">// 减少一个计数</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 等待所有计数为0</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sync-once" tabindex="-1"><a class="header-anchor" href="#sync-once" aria-hidden="true">#</a> Sync.Once</h3><p>这个是一种进阶的玩意，例如说某些情况下需要加载一个内容，但是又不想让这个内容在一开始的时候就被加载</p><p>也就是懒加载，但是在使用到的这个东西的时候又有可能面临着并发的问题</p><p>所以就可以使用<strong>Sync.Once</strong>来解决这个问题</p><p>具体可以参考下方例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	icons        <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	loadIconOnce sync<span class="token punctuation">.</span>Once
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">loadIcons</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	icons <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;left&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;left.jpg&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;right&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;right.jpg&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;up&quot;</span><span class="token punctuation">:</span>    <span class="token string">&quot;up.jpg&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;down&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;down.jpg&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getIcon</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token comment">// 传入一个函数，它会保证这个函数的内容全局只会执行一次</span>
	<span class="token comment">// 适用于需要在程序运行时，只执行一次的操作</span>
	<span class="token comment">// 例如懒加载配置文件，懒加载资源文件等</span>
	loadIconOnce<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>loadIcons<span class="token punctuation">)</span>
	<span class="token keyword">return</span> icons<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token function">getIcon</span><span class="token punctuation">(</span><span class="token string">&quot;left&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token function">getIcon</span><span class="token punctuation">(</span><span class="token string">&quot;right&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token function">getIcon</span><span class="token punctuation">(</span><span class="token string">&quot;up&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span><span class="token function">getIcon</span><span class="token punctuation">(</span><span class="token string">&quot;down&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>扩展场景：<strong>例如保证某个通道只会关闭一次</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>

<span class="token keyword">var</span> loadOnce sync<span class="token punctuation">.</span>Once

<span class="token keyword">var</span> chan1 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> chan2 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token comment">// 因为close需要传入一个参数，所以这里需要闭包来完成</span>
	loadOnce<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chan1<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="sync-map" tabindex="-1"><a class="header-anchor" href="#sync-map" aria-hidden="true">#</a> Sync.Map</h3><p>众所周知，Map通常情况下都是不安全的，所以Go语言中也有线程安全的Map类，也就是<code>Sync.Map</code></p><p>这玩意是开箱即用的，同时线程安全</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> mymap <span class="token operator">=</span> sync<span class="token punctuation">.</span>Map<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> wg  sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">200</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			key <span class="token operator">:=</span> <span class="token string">&quot;key&quot;</span> <span class="token operator">+</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
			<span class="token comment">// 存储数据</span>
			mymap<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
			<span class="token comment">// 读取数据</span>
			value<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> mymap<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;key:%v, value:%v\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Program end&quot;</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原子操作" tabindex="-1"><a class="header-anchor" href="#原子操作" aria-hidden="true">#</a> 原子操作</h3><p>就拿<code>i++</code>举例子吧，转换成原子操作只需要通过原子包<code>sync/atomic</code>即可实现</p><p>注意，这是系统底层实现，所以说不用关心底层源码（C++）是啥样子的，就像是Java中的native方法那样</p><p>当然，它之中还有其他的方法，例如比较并交换<code>CompareAndSwapInt64(指针，旧值，新值)</code>会返回一个布尔值</p><p>用上了再去看看文档即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;sync/atomic&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">var</span> counter <span class="token builtin">int64</span> <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 原子加1，需要传入指针</span>
	atomic<span class="token punctuation">.</span><span class="token function">AddInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>counter<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	num <span class="token operator">:=</span> <span class="token number">10000</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> num<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,104);function r(v,m){const t=e("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[s("课外扩展: "),n("a",k,[s("https://www.cnblogs.com/sunsky303/p/9705727.html"),i(t)])]),d])}const f=p(l,[["render",r],["__file","05-线程.html.vue"]]);export{f as default};
