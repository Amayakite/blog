import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as e,e as o,a as n,b as s}from"./app-2d4b26c1.js";const c={},p=o(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>在SpringBoot中，可以使用<code>@Transactional</code>来开启一个事务（自动配置好了，原理可以看之前的springframework）</p><p>但是，如果我们想要在同一个service内通过事务对象调用本类的事务对象</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span><span class="token constant">REPEATABLE_READ</span><span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span><span class="token constant">REQUIRED</span><span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">10</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span><span class="token constant">READ_COMMITTED</span><span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span><span class="token constant">REQUIRED</span><span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">20</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        do something;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>
            rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
            isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span><span class="token constant">READ_COMMITTED</span><span class="token punctuation">,</span>
            propagation <span class="token operator">=</span> <span class="token class-name">Propagation</span><span class="token punctuation">.</span><span class="token constant">REQUIRES_NEW</span><span class="token punctuation">,</span>
            timeout <span class="token operator">=</span> <span class="token number">20</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        do something;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上方代码中，b和c的<code>@Transactional</code>注解都会失效，因为这个事务实际上是依赖于动态代理，如果说我们调用的是其他类的，例如<code>Aservice.b()</code>则会照常进行，b上标注的注解也会正常生效</p><p>但是本类之间的调用是行不通的，上面的代码中，c的事务传播依旧是遵循了A的REQUIRED，b和c的事务隔离也依旧是继承自A的REPEATABLE_READ：可重复度，超时时间同理</p><p>如果说我们想要同一个类内的各种事物之间的调用能够得到自定义，可以这样做</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2><p>第一步，引入依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-aop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步：加一个注解</p>`,11),l=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{java:"",class:"language-java"},[n("code",null,[n("span",{class:"token annotation punctuation"},"@EnableAspectJAutoProxy"),n("span",{class:"token punctuation"},"("),s("exposeProxy "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token annotation punctuation"},"@SpringBootApplication"),s(`
`),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"OrderApplication"),s(),n("span",{class:"token punctuation"},"{"),s(`

    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"static"),s(),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"String"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(" args"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token class-name"},"SpringApplication"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"OrderApplication"),n("span",{class:"token punctuation"},"."),n("span",{class:"token keyword"},"class"),n("span",{class:"token punctuation"},","),s(" args"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),i=n("p",null,"这里实现了两个功能",-1),u=n("ol",null,[n("li",null,"使用了AspectJ来实现事务代理"),n("li",null,[n("code",null,"exposeProxy = true"),s("对外暴露代理对象")]),n("li",null,"嘛，就和之前Spring通过xml来配置的方式差不多")],-1),r=n("p",null,"接着我们使用代理对象本类互调即可",-1),k=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{java:"",class:"language-java"},[n("code",null,[n("span",{class:"token annotation punctuation"},"@Service"),s(`
`),n("span",{class:"token annotation punctuation"},"@Slf4j"),s(`
`),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"TestReviseMessage"),s(),n("span",{class:"token punctuation"},"{"),s(`

    `),n("span",{class:"token annotation punctuation"},"@Transactional"),n("span",{class:"token punctuation"},"("),s(`
            rollbackFor `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Exception"),n("span",{class:"token punctuation"},"."),n("span",{class:"token keyword"},"class"),n("span",{class:"token punctuation"},","),s(`
            isolation `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Isolation"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"REPEATABLE_READ"),n("span",{class:"token punctuation"},","),s(`
            propagation `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Propagation"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"REQUIRED"),n("span",{class:"token punctuation"},","),s(`
            timeout `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"10"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"a"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        
        `),n("span",{class:"token comment"},"// 通过AopContext获取当前代理对象，放心转换成当前类然后调用即可"),s(`
        `),n("span",{class:"token class-name"},"TestReviseMessage"),s(" testReviseMessage "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"TestReviseMessage"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token class-name"},"AopContext"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"currentProxy"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        testReviseMessage`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"b"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        testReviseMessage`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"c"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
        
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token annotation punctuation"},"@Transactional"),n("span",{class:"token punctuation"},"("),s(`
            rollbackFor `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Exception"),n("span",{class:"token punctuation"},"."),n("span",{class:"token keyword"},"class"),n("span",{class:"token punctuation"},","),s(`
            isolation `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Isolation"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"READ_COMMITTED"),n("span",{class:"token punctuation"},","),s(`
            propagation `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Propagation"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"REQUIRED"),n("span",{class:"token punctuation"},","),s(`
            timeout `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"20"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"b"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
`),n("span",{class:"token comment"},"//        do something;"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token annotation punctuation"},"@Transactional"),n("span",{class:"token punctuation"},"("),s(`
            rollbackFor `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Exception"),n("span",{class:"token punctuation"},"."),n("span",{class:"token keyword"},"class"),n("span",{class:"token punctuation"},","),s(`
            isolation `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Isolation"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"READ_COMMITTED"),n("span",{class:"token punctuation"},","),s(`
            propagation `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token class-name"},"Propagation"),n("span",{class:"token punctuation"},"."),n("span",{class:"token constant"},"REQUIRES_NEW"),n("span",{class:"token punctuation"},","),s(`
            timeout `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"20"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"c"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
`),n("span",{class:"token comment"},"//        do something;"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`


`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),d=[p,l,i,u,r,k];function v(b,m){return t(),e("div",null,d)}const _=a(c,[["render",v],["__file","24-本地事务失效解决方案.html.vue"]]);export{_ as default};
