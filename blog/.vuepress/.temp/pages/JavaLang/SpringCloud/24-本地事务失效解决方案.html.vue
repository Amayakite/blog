<template><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>在SpringBoot中，可以使用<code>@Transactional</code>来开启一个事务（自动配置好了，原理可以看之前的springframework）</p>
<p>但是，如果我们想要在同一个service内通过事务对象调用本类的事务对象</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span>REPEATABLE_READ<span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span>REQUIRED<span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">10</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span>READ_COMMITTED<span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span>REQUIRED<span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">20</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        do something;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span>READ_COMMITTED<span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span>REQUIRES_NEW<span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">20</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        do something;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>上方代码中，b和c的<code>@Transactional</code>注解都会失效，因为这个事务实际上是依赖于动态代理，如果说我们调用的是其他类的，例如<code>Aservice.b()</code>则会照常进行，b上标注的注解也会正常生效</p>
<p>但是本类之间的调用是行不通的，上面的代码中，c的事务传播依旧是遵循了A的REQUIRED，b和c的事务隔离也依旧是继承自A的REPEATABLE_READ：可重复度，超时时间同理</p>
<p>如果说我们想要同一个类内的各种事物之间的调用能够得到自定义，可以这样做</p>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2>
<p>第一步，引入依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-aop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>第二步：加一个注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableAspectJAutoProxy</span><span class="token punctuation">(</span>exposeProxy <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">OrderApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>这里实现了两个功能</p>
<ol>
<li>使用了AspectJ来实现事务代理</li>
<li><code>exposeProxy = true</code>对外暴露代理对象</li>
<li>嘛，就和之前Spring通过xml来配置的方式差不多</li>
</ol>
<p>接着我们使用代理对象本类互调即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestReviseMessage</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span>REPEATABLE_READ<span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span>REQUIRED<span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">10</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
        <span class="token comment">// 通过AopContext获取当前代理对象，放心转换成当前类然后调用即可</span>
        <span class="token class-name">TestReviseMessage</span> testReviseMessage <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">TestReviseMessage</span><span class="token punctuation">)</span> <span class="token class-name">AopContext</span><span class="token punctuation">.</span><span class="token function">currentProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        testReviseMessage<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        testReviseMessage<span class="token punctuation">.</span><span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span>READ_COMMITTED<span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span>REQUIRED<span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">20</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        do something;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span>READ_COMMITTED<span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span>REQUIRES_NEW<span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">20</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        do something;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div></template>
