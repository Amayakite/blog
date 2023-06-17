import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as n,b as s,d as p,e as a}from"./app-3ab2953d.js";const i="/images/Web/React/04-React的常用工具/flow.png",u="/images/Web/React/04-React的常用工具/image-20230320211257752.png",r="/images/Web/React/04-React的常用工具/image-20230322190827633.png",k="/images/Web/React/04-React的常用工具/image-20230322194529830.png",d="/images/Web/React/04-React的常用工具/msedge_pHxIbr7fku.gif",v="/images/Web/React/04-React的常用工具/image-20230327191108945.png",m="/images/Web/React/04-React的常用工具/image-20230327191129900.png",b="/images/Web/React/04-React的常用工具/image-20230327191252694.png",g="/images/Web/React/04-React的常用工具/msedge_iEv9JSrU9C.gif",f={},h=n("h1",{id:"immutable-深拷贝",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#immutable-深拷贝","aria-hidden":"true"},"#"),s(" Immutable-深拷贝")],-1),y={href:"https://github.com/immutable-js/immutable-js",target:"_blank",rel:"noopener noreferrer"},w=a(`<p><strong>深拷贝</strong>这里就不多赘述了，有很多实现方式，Immutable给的方式比较另类，详情见例子</p><p>::: tips</p><p>如果你还不明白深拷贝是什么，建议去了解下Object</p><p>:::</p><blockquote><p>安装</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i immutable
<span class="token function">pnpm</span> i immutable
<span class="token function">yarn</span> i immutable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>再react中的简单使用示例</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> Immutable <span class="token keyword">from</span> <span class="token string">&quot;immutable&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span>


<span class="token comment">// 使用Immutable.fromJS()方法将某个转换为Immutable对象</span>
<span class="token keyword">const</span> immutableObj <span class="token operator">=</span> Immutable<span class="token punctuation">.</span><span class="token function">fromJS</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> MyComponent<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> <span class="token punctuation">[</span>objState<span class="token punctuation">,</span> setObjState<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span>
        <span class="token comment">// 这里使用toJS()方法将Immutable对象转换为普通对象</span>
        <span class="token comment">// 转换后的对象实际上是一个深拷贝，与原对象没有任何关系</span>
        immutableObj<span class="token punctuation">.</span><span class="token function">toJS</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>


    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">TestCopy</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">objState.name: </span><span class="token punctuation">{</span>objState<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">objState.age: </span><span class="token punctuation">{</span>objState<span class="token punctuation">.</span>age<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token comment">// 这里使用setIn()方法修改对象中的某个属性</span>
                <span class="token comment">// setIn()方法会返回一个新的Immutable对象</span>
                <span class="token keyword">const</span> newObj <span class="token operator">=</span> immutableObj<span class="token punctuation">.</span><span class="token function">setIn</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;newName&#39;</span><span class="token punctuation">)</span>
                <span class="token comment">// 这里使用toJS()方法将Immutable对象转换为普通对象</span>
                <span class="token comment">// 转换后的对象实际上是一个深拷贝，与原对象没有任何关系</span>
                <span class="token function">setObjState</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span><span class="token function">toJS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">修改name</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> MyComponent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>嘛，感觉整体来说不如一些例如lodash之类的方便，估计是在特定的场合好用...</p><h1 id="mobx" tabindex="-1"><a class="header-anchor" href="#mobx" aria-hidden="true">#</a> Mobx</h1>`,10),x=n("strong",null,"上手简单的状态管理工具",-1),q={href:"https://pinia.vuejs.org/zh",target:"_blank",rel:"noopener noreferrer"},C={href:"https://cn.mobx.js.org/",target:"_blank",rel:"noopener noreferrer"},_=a('<figure><img src="'+i+`" alt="MobX unidirectional flow" tabindex="0" loading="lazy"><figcaption>MobX unidirectional flow</figcaption></figure><p>Mobx实际上运用到的技术和Vue挺像的，利用了Object.defineProperties添加get/set，写法上偏向OOP，且并非单一store，可以多store</p><p>::: tips</p><p>Redux默认以Javascript原生对象形式存储数据，而Mobx使用可观察对象</p><p>:::</p><blockquote><p>优点：</p></blockquote><ul><li>学习成本小</li><li>Typescript友好</li></ul><blockquote><p>缺点</p></blockquote><ul><li>过于自由，Mobx提供的约定比较少，团队编码风格容易不统一</li><li>中间件较少（目前</li></ul><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> mobx
<span class="token function">pnpm</span> <span class="token function">install</span> mobx
<span class="token function">yarn</span> <span class="token function">add</span> mobx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认是安装5.+的版本，如果需要兼容老的浏览器例如IE11，请安装<code>npm i mobx@4</code></p><h2 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用" aria-hidden="true">#</a> 简单使用</h2><h3 id="了解observable和autorun" tabindex="-1"><a class="header-anchor" href="#了解observable和autorun" aria-hidden="true">#</a> 了解observable和autorun</h3><p>先来一个简单的例子</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> cloneDeep <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;lodash&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> autorun<span class="token punctuation">,</span> observable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span>


<span class="token comment">// Q:observable.box() 是什么?</span>
<span class="token comment">// A:observable.box() 是一个函数, 用来创建一个可观察的值, 该值可以被观察, 也可以被修改,就像是Vue3中的ref()一样</span>
<span class="token keyword">const</span> count <span class="token operator">=</span> observable<span class="token punctuation">.</span><span class="token function">box</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token comment">// Q:observable.object() 是什么?</span>
<span class="token comment">// A:observable.object() 是一个函数, 用来创建一个可观察的对象, 该对象可以被观察, 也可以被修改,就像是Vue3中的reactive()一样</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> observable<span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
    address<span class="token operator">:</span> <span class="token punctuation">{</span>
        province<span class="token operator">:</span> <span class="token string">&quot;广东省&quot;</span><span class="token punctuation">,</span>
        city<span class="token operator">:</span> <span class="token string">&quot;广州市&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">// Q:observable.array() 是什么?</span>
<span class="token comment">// A:observable.array() 是一个函数, 用来创建一个可观察的数组, 该数组可以被观察, 也可以被修改,就像是Vue3中的reactive()一样</span>
<span class="token keyword">const</span> list <span class="token operator">=</span> observable<span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>


<span class="token comment">// 当然，你可以直接用observable()函数来创建一个可观察的对象 这样创建就相当于是observable.object()函数创建的</span>
<span class="token keyword">const</span> dog <span class="token operator">=</span> <span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&quot;旺财&quot;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">// 总之，observable()函数可以创建可观察的值、对象、数组，如果你想要基础类型的值，那么就用observable.box()函数创建</span>

<span class="token comment">// 如何监听值的变化？</span>
<span class="token comment">// Q:autorun() 是什么?</span>
<span class="token comment">// A:autorun() 是一个函数, 用来监听值的变化, 当值发生变化时, 会自动执行回调函数</span>
<span class="token function">autorun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;count:&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 上方代码中，只要count的值发生变化，就会自动执行回调函数，打印出count的值</span>
<span class="token comment">// 注意，在初始化的时候，也会执行一次回调函数，所以，上方代码会打印出count的值，也就是0 </span>

<span class="token comment">// Q：是否可以深度监听值的变化？</span>
<span class="token comment">// A：当然可以</span>
<span class="token function">autorun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;user:&quot;</span><span class="token punctuation">,</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// Autorun 接收第二个参数，它是一个参数对象，有如下可选的参数:</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// delay: number, // 延迟执行回调函数的时间，单位是毫秒</span>
        delay<span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
        <span class="token comment">// name: string, // 用于调试的名称 这个东西主要是用于全局监听器spy()的，我们暂时不用管它</span>
        name<span class="token operator">:</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// scheduler: (callback: () =&gt; void) =&gt; void, // 用于调度回调函数的调用</span>
        <span class="token comment">// 也就是设置了这个，将会覆盖delay参数</span>
        <span class="token comment">// 这里的callback，就是第一个参数，也就是autorun的回调函数</span>
        <span class="token function-variable function">scheduler</span><span class="token operator">:</span> <span class="token punctuation">(</span>callback<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">setTimeout</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// onError: (error: any) =&gt; void, // 当回调函数抛出异常时，会调用这个函数</span>
        <span class="token comment">// 如果不设置，那么异常会被抛出</span>
        <span class="token function-variable function">onError</span><span class="token operator">:</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;error:&quot;</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token comment">// 尝试一下</span>
count<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    user<span class="token punctuation">.</span>address<span class="token punctuation">.</span>city <span class="token operator">=</span> <span class="token string">&quot;深圳市&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+u+`" alt="image-20230320211257752" tabindex="0" loading="lazy"><figcaption>image-20230320211257752</figcaption></figure><h3 id="简单结合react使用" tabindex="-1"><a class="header-anchor" href="#简单结合react使用" aria-hidden="true">#</a> 简单结合react使用</h3><p>以下是一个最简单演示</p><blockquote><p>store</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> observable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
    <span class="token keyword">get</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> years old</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    addressList<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            address<span class="token operator">:</span> <span class="token string">&quot;123 Main St&quot;</span><span class="token punctuation">,</span>
            city<span class="token operator">:</span> <span class="token string">&quot;New York&quot;</span><span class="token punctuation">,</span>
            state<span class="token operator">:</span> <span class="token string">&quot;NY&quot;</span><span class="token punctuation">,</span>
            zip<span class="token operator">:</span> <span class="token string">&quot;10001&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> store<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useEffect<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&quot;./store&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> autorun <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span>


<span class="token keyword">const</span> App<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> ev <span class="token operator">=</span> <span class="token function">autorun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">ev</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>store<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Child</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Child<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> <span class="token function-variable function">changeUserName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        store<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;change name&quot;</span><span class="token operator">+</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>name<span class="token punctuation">,</span> setName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> ev <span class="token operator">=</span> <span class="token function">autorun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">setName</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">ev</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>



    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Child</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>changeUserName<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">点我更改store Name</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">

            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                current Name is </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>


<span class="token punctuation">}</span>



<span class="token keyword">export</span> <span class="token keyword">default</span> App
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="configure" tabindex="-1"><a class="header-anchor" href="#configure" aria-hidden="true">#</a> configure</h3><p>这里也可以来配置<code>Mobx</code>的一些内容</p><p>如果希望规范的开发，建议将<code>enforceActions</code>设置为<code>never</code>，设了后我们上面章节的操作将会引发error</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> observable<span class="token punctuation">,</span> configure <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span><span class="token punctuation">;</span>


<span class="token comment">// Q:configure可以配置哪些内容？</span>
<span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// 1. 是否允许在动作外部修改状态</span>
    <span class="token comment">// &quot;observed&quot; | &quot;never&quot; | &quot;always&quot;</span>
    <span class="token comment">// 默认是&quot;observed&quot;，只有在动作中修改状态才会报错</span>
    <span class="token comment">// &quot;never&quot;：不允许在动作外部修改状态</span>
    <span class="token comment">// &quot;always&quot;：允许在动作外部修改状态</span>
    <span class="token comment">// 动作外指的是不在action中的代码</span>
    enforceActions<span class="token operator">:</span> <span class="token string">&quot;observed&quot;</span><span class="token punctuation">,</span> 
    <span class="token comment">// 2. computedRequiresReaction</span>
    <span class="token comment">// 是否要求计算值必须在React中使用</span>
    <span class="token comment">// 默认是false</span>
    computedRequiresReaction<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">// 3. reactionRequiresObservable</span>
    <span class="token comment">// 是否要求反应必须在可观察的上下文中使用</span>
    <span class="token comment">// 默认是false</span>
    reactionRequiresObservable<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">// 4. observableRequiresReaction</span>
    <span class="token comment">// 是否要求可观察的必须在反应的上下文中使用</span>
    <span class="token comment">// 默认是false</span>
    observableRequiresReaction<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">// 5. isolateGlobalState</span>
    <span class="token comment">// 是否隔离全局状态</span>
    <span class="token comment">// 默认是false,如果为true，那么在一个模块中创建的observable对象，只能在该模块中使用</span>
    isolateGlobalState<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">// 6. disableErrorBoundaries</span>
    <span class="token comment">// 是否禁用错误边界 也就是不捕获错误</span>
    <span class="token comment">// 默认是false </span>
    disableErrorBoundaries<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">// 7. useProxies</span>
    <span class="token comment">// 使用的代理类型 &quot;always&quot; | &quot;never&quot; | &quot;ifavailable&quot;</span>
    <span class="token comment">// 默认是&quot;ifavailable&quot; 如果不支持代理，那么就使用ES5的方式</span>
    <span class="token comment">// &quot;always&quot;：总是使用代理(Es6 Proxy)</span>
    <span class="token comment">// &quot;never&quot;：总是使用ES5的方式</span>
    <span class="token comment">// &quot;ifavailable&quot;：如果支持代理，那么就使用代理，否则使用ES5的方式</span>
    useProxies<span class="token operator">:</span> <span class="token string">&quot;ifavailable&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// 8. safeDescriptors</span>
    <span class="token comment">// 是否使用安全的描述符</span>
    <span class="token comment">// 默认是false</span>
    <span class="token comment">// 如果为true，那么在使用action时，会使用Object.defineProperty()来设置属性</span>
    <span class="token comment">// 如果为false，那么在使用action时，会使用Object.assign()来设置属性</span>
    safeDescriptors<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token comment">// 9. reactionScheduler</span>
    <span class="token comment">// 反应调度程序</span>
    <span class="token comment">// 默认是undefined</span>
    <span class="token comment">// 如果设置了，那么在使用reaction时，会使用该调度程序来调度反应</span>
    <span class="token comment">// 如果没有设置，那么就使用默认的调度程序</span>
    reactionScheduler<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="action" tabindex="-1"><a class="header-anchor" href="#action" aria-hidden="true">#</a> action</h2><p>这里有很多种方法，这里先来看看最简单的</p><h3 id="内联action" tabindex="-1"><a class="header-anchor" href="#内联action" aria-hidden="true">#</a> 内联action</h3>`,30),R=n("div",{class:"language-typescript line-numbers-mode","data-ext":"ts"},[n("pre",{ts:"",class:"language-typescript"},[n("code",null,[n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" observable"),n("span",{class:"token punctuation"},","),s(" action "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},'"mobx"'),n("span",{class:"token punctuation"},";"),s(`


`),n("span",{class:"token keyword"},"const"),s(" store "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"observable"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
    name`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"John"'),n("span",{class:"token punctuation"},","),s(`
    age`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"30"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token keyword"},"get"),s(),n("span",{class:"token function"},"info"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"}," is "),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("age"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"}," years old"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    addressList`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token punctuation"},"{"),s(`
            id`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},","),s(`
            address`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"123 Main St"'),n("span",{class:"token punctuation"},","),s(`
            city`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"New York"'),n("span",{class:"token punctuation"},","),s(`
            state`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"NY"'),n("span",{class:"token punctuation"},","),s(`
            zip`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"10001"'),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token comment"},"// 创造一个func"),s(`
    `),n("span",{class:"token function"},"changeName"),n("span",{class:"token punctuation"},"("),s("name"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("name "),n("span",{class:"token operator"},"="),s(" name"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// 将这个func申明为action"),s(`
    changeName`),n("span",{class:"token operator"},":"),s(" action"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(" store"),n("span",{class:"token punctuation"},";"),s(`

`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),S=n("p",null,"使用",-1),A=n("div",{class:"language-tsx line-numbers-mode","data-ext":"tsx"},[n("pre",{tsx:"",class:"language-tsx"},[n("code",null,[n("span",{class:"token keyword"},"import"),s(" React"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"{"),s(" useEffect"),n("span",{class:"token punctuation"},","),s(" useState "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'react'"),s(`
`),n("span",{class:"token keyword"},"import"),s(" store "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},'"./store"'),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" autorun "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},'"mobx"'),s(`


`),n("span",{class:"token keyword"},"const"),s(" App"),n("span",{class:"token operator"},":"),s(" React"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function-variable function"},"FC"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`

    `),n("span",{class:"token function"},"useEffect"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"const"),s(" ev "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"autorun"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token builtin"},"console"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),s("store"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token function"},"ev"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"("),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
            `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token punctuation"},"{"),s("store"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
            `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),n("span",{class:"token class-name"},"Child")]),s(),n("span",{class:"token punctuation"},"/>")]),n("span",{class:"token plain-text"},`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"const"),s(" Child"),n("span",{class:"token operator"},":"),s(" React"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function-variable function"},"FC"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`

    `),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"changeUserName"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
       store`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"changeName"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"new name"'),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"["),s("name"),n("span",{class:"token punctuation"},","),s(" setName"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"useState"),n("span",{class:"token punctuation"},"("),s("store"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token function"},"useEffect"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"const"),s(" ev "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"autorun"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token function"},"setName"),n("span",{class:"token punctuation"},"("),s("store"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token function"},"ev"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`



    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"("),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
            `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},"Child"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
            `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("button")]),s(),n("span",{class:"token attr-name"},"onClick"),n("span",{class:"token script language-javascript"},[n("span",{class:"token script-punctuation punctuation"},"="),n("span",{class:"token punctuation"},"{"),s("changeUserName"),n("span",{class:"token punctuation"},"}")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},"点我更改store Name"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("button")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`

            `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("h2")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
                current Name is `),n("span",{class:"token punctuation"},"{"),s("name"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token plain-text"},`
            `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("h2")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token punctuation"},")"),s(`


`),n("span",{class:"token punctuation"},"}"),s(`



`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(` App
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),j=a(`<h3 id="使用装饰器" tabindex="-1"><a class="header-anchor" href="#使用装饰器" aria-hidden="true">#</a> 使用装饰器</h3><h4 id="注解前置知识-装饰器" tabindex="-1"><a class="header-anchor" href="#注解前置知识-装饰器" aria-hidden="true">#</a> 注解前置知识-装饰器</h4><p>这个是ES7开始有的特性，大概就像是其他语言的注解那样</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">log</span><span class="token punctuation">(</span>target<span class="token operator">:</span> Object<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> descriptor<span class="token operator">:</span> PropertyDescriptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> originalMethod <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>value

    descriptor<span class="token punctuation">.</span><span class="token function-variable function">value</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">the method </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> is called with </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">originalMethod</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">the method </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> is called with </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,the result is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> descriptor
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">log</span></span>
    <span class="token keyword">public</span> <span class="token function">sayHello</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面是一个简单的例子，可以通过它来进行AOP，貌似这玩意只能用于class?</p><p>效果：</p><figure><img src="`+r+`" alt="image-20230322190827633" tabindex="0" loading="lazy"><figcaption>image-20230322190827633</figcaption></figure><h3 id="装饰器的使用前置条件-babel的额外配置" tabindex="-1"><a class="header-anchor" href="#装饰器的使用前置条件-babel的额外配置" aria-hidden="true">#</a> 装饰器的使用前置条件-babel的额外配置</h3><p>如果你的项目可以正常的运行<a href="###%E4%BD%BF%E7%94%A8Mobx%E7%9A%84%E6%B3%A8%E8%A7%A3">下方</a>的代码并且能够成功的输出，那么可以跳过这一步</p><p>首先安装几个包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i @babel/core @babel/plugin-proposal-decorators @babel/preset-env customize-cra react-app-rewired
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后更改<code>package.json</code>的脚本内容成这样</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code> <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;start&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-app-rewired start&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-app-rewired build&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-app-rewired test&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;eject&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-app-rewired eject&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，根目录新建<code>.babelrc</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;@babel/preset-env&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">[</span>
            <span class="token string">&quot;@babel/plugin-proposal-decorators&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;legacy&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span>
           
        <span class="token punctuation">]</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再然后根目录新建一个<code>config-overrides.js</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> override<span class="token punctuation">,</span> addDecoratorsLegacy <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;customize-cra&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">function</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;.&#39;</span><span class="token punctuation">,</span> dir<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">customize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token parameter">config<span class="token punctuation">,</span> env</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>resolve<span class="token punctuation">.</span>alias<span class="token punctuation">[</span><span class="token string">&#39;@&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>env <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>externals <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string-property property">&#39;react&#39;</span><span class="token operator">:</span> <span class="token string">&#39;React&#39;</span><span class="token punctuation">,</span>
            <span class="token string-property property">&#39;react-dom&#39;</span><span class="token operator">:</span> <span class="token string">&#39;ReactDOM&#39;</span><span class="token punctuation">,</span>
            <span class="token string-property property">&#39;react-router-dom&#39;</span><span class="token operator">:</span> <span class="token string">&#39;ReactRouterDOM&#39;</span><span class="token punctuation">,</span>
            <span class="token string-property property">&#39;react-router&#39;</span><span class="token operator">:</span> <span class="token string">&#39;ReactRouter&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>            
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果你使用了antd之类的，这里可以加上对应的配置</span>
    
    <span class="token keyword">return</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">override</span><span class="token punctuation">(</span><span class="token function">addDecoratorsLegacy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">customize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用mobx的注解" tabindex="-1"><a class="header-anchor" href="#使用mobx的注解" aria-hidden="true">#</a> 使用Mobx的注解</h3><p>下面是一个简单的带有action的例子，可以让代码变得非常顺畅</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> observable<span class="token punctuation">,</span> action<span class="token punctuation">,</span> configure<span class="token punctuation">,</span> makeAutoObservable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 开启装饰器</span>
<span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">{</span> enforceActions<span class="token operator">:</span> <span class="token string">&quot;observed&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">Store</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">observable</span></span>
    count<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">action</span></span>
    <span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">observable</span></span>
    name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">action</span></span>
    <span class="token function-variable function">changeName</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
	
    
    <span class="token comment">// 参考官方文档https://zh.mobx.js.org/enabling-decorators.html#%E5%90%AF%E7%94%A8%E8%A3%85%E9%A5%B0%E5%99%A8%E8%AF%AD%E6%B3%95-</span>
    <span class="token comment">// 在mobx6之后 ，都需要使用makeAutoObservable来激活装饰器</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">makeAutoObservable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Store</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> store<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useEffect<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&quot;./store&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> autorun <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span>


<span class="token keyword">const</span> App<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Child</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Child<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> <span class="token function-variable function">changeUserName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        store<span class="token punctuation">.</span><span class="token function">changeName</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>name<span class="token punctuation">,</span> setName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>name<span class="token punctuation">)</span>

    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">autorun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">setName</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;autorun&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Child</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>changeUserName<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">点我更改store Name</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">

            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                current Name is </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下(<code>mobx@6</code>)</p><figure><img src="`+k+`" alt="image-20230322194529830" tabindex="0" loading="lazy"><figcaption>image-20230322194529830</figcaption></figure><h2 id="异步action-runinaction" tabindex="-1"><a class="header-anchor" href="#异步action-runinaction" aria-hidden="true">#</a> 异步action-runInAction</h2><p>我们刚刚都是进行的同步操作，如果需要进行异步操作，则需要这样（如果你不是严格模式下，不这样做也无所谓 不过还是建议加上</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> observable<span class="token punctuation">,</span> action<span class="token punctuation">,</span> configure<span class="token punctuation">,</span> makeAutoObservable<span class="token punctuation">,</span> runInAction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> faker <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;faker&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

faker<span class="token punctuation">.</span>locale <span class="token operator">=</span> <span class="token string">&quot;zh_CN&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">CustomUser</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    email<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    phone<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    avatar<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    address<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    company<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 开启装饰器</span>
<span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">{</span> enforceActions<span class="token operator">:</span> <span class="token string">&quot;observed&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">Store</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">observable</span></span>
    count<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">action</span></span>
    <span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">observable</span></span>
    name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">action</span></span>
    <span class="token function-variable function">changeName</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token comment">// console.log(this.name);</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchUserList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">makeAutoObservable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token decorator"><span class="token at operator">@</span><span class="token function">observable</span></span>
    userList<span class="token operator">:</span> CustomUser<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token decorator"><span class="token at operator">@</span><span class="token function">action</span></span>
    <span class="token keyword">async</span> <span class="token function">fetchUserList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&quot;https://jsonplaceholder.typicode.com/users&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">runInAction</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>userList <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span>
                    id<span class="token operator">:</span> item<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
                    name<span class="token operator">:</span> item<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
                    email<span class="token operator">:</span> item<span class="token punctuation">.</span>email<span class="token punctuation">,</span>
                    phone<span class="token operator">:</span> item<span class="token punctuation">.</span>phone<span class="token punctuation">,</span>
                    avatar<span class="token operator">:</span> faker<span class="token punctuation">.</span>image<span class="token punctuation">.</span><span class="token function">avatar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    address<span class="token operator">:</span> faker<span class="token punctuation">.</span>address<span class="token punctuation">.</span><span class="token function">streetAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    company<span class="token operator">:</span> faker<span class="token punctuation">.</span>company<span class="token punctuation">.</span><span class="token function">companyName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>userList<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Store</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> store<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="计算属性-computed" tabindex="-1"><a class="header-anchor" href="#计算属性-computed" aria-hidden="true">#</a> 计算属性-computed</h2><p>这里就不说普通的使用方式了 在注解的使用中，只需要<code>@computed</code> 然后接上get 即可</p>`,29),N=n("div",{class:"language-typescript line-numbers-mode","data-ext":"ts"},[n("pre",{ts:"",class:"language-typescript"},[n("code",null,[n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" observable"),n("span",{class:"token punctuation"},","),s(" action"),n("span",{class:"token punctuation"},","),s(" configure"),n("span",{class:"token punctuation"},","),s(" makeAutoObservable"),n("span",{class:"token punctuation"},","),s(" runInAction"),n("span",{class:"token punctuation"},","),s(" computed "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},'"mobx"'),n("span",{class:"token punctuation"},";"),s(`


`),n("span",{class:"token keyword"},"type"),s(),n("span",{class:"token class-name"},"CustomUser"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),s(`
    id`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"number"),n("span",{class:"token punctuation"},";"),s(`
    name`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},";"),s(`
    email`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},";"),s(`
    phone`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},";"),s(`
    avatar`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},";"),s(`
    address`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},";"),s(`
    company`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token comment"},"// 开启装饰器"),s(`
`),n("span",{class:"token function"},"configure"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(" enforceActions"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"observed"'),s(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`


`),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"Store"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token decorator"},[n("span",{class:"token at operator"},"@"),n("span",{class:"token function"},"observable")]),s(`
    count`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"number"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token decorator"},[n("span",{class:"token at operator"},"@"),n("span",{class:"token function"},"action")]),s(`
    `),n("span",{class:"token function-variable function"},"increment"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("count"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token decorator"},[n("span",{class:"token at operator"},"@"),n("span",{class:"token function"},"computed")]),s(`
    `),n("span",{class:"token keyword"},"get"),s(),n("span",{class:"token function"},"doubleCount"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("count "),n("span",{class:"token operator"},"*"),s(),n("span",{class:"token number"},"2"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token function"},"constructor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"makeAutoObservable"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"const"),s(" store "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"Store"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(" store"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),O=a(`<h2 id="mobx-react的使用" tabindex="-1"><a class="header-anchor" href="#mobx-react的使用" aria-hidden="true">#</a> mobx-react的使用</h2><p>有没有发现，刚刚写代码还是跟之前写最开始的redux一样，不舒服，当然，官方是准备了react配套的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i mobx-react-lite
<span class="token comment"># 注意 这里是有个lite，mobx在6.+后推荐这样 同时玩法和之前版本也有不同 如果你想了解之前版本如何操作 请百度</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>store文件</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> observable<span class="token punctuation">,</span> action<span class="token punctuation">,</span> configure<span class="token punctuation">,</span> makeAutoObservable<span class="token punctuation">,</span> runInAction<span class="token punctuation">,</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;mobx&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> faker <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;faker&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

faker<span class="token punctuation">.</span>locale <span class="token operator">=</span> <span class="token string">&quot;zh_CN&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">CustomUser</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    email<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    phone<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    avatar<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    address<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    company<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 开启装饰器</span>
<span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">{</span> enforceActions<span class="token operator">:</span> <span class="token string">&quot;observed&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">Store</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">observable</span></span>
    count<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">action</span></span>
    <span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">computed</span></span>
    <span class="token keyword">get</span> <span class="token function">doubleCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">makeAutoObservable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Store</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> store<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数式" tabindex="-1"><a class="header-anchor" href="#函数式" aria-hidden="true">#</a> 函数式</h3><p>使用非常简单，不需要在到<code>index.tsx</code>中写入其他东西，相当舒服了</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useObserver <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mobx-react-lite&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&quot;./store&quot;</span>


<span class="token keyword">const</span> App<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">useObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">App</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>store<span class="token punctuation">.</span>doubleCount<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Increment</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>当然，如果你赶紧这样太麻烦，也可以改成：</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useObserver<span class="token punctuation">,</span> Observer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mobx-react-lite&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&quot;./store&quot;</span>


<span class="token keyword">const</span> App<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// return useObserver(() =&gt; (</span>
    <span class="token comment">//     &lt;div&gt;</span>
    <span class="token comment">//         &lt;h1&gt;App&lt;/h1&gt;</span>
    <span class="token comment">//         &lt;h2&gt;{store.doubleCount}&lt;/h2&gt;</span>
    <span class="token comment">//         &lt;button onClick={() =&gt; store.increment()}&gt;Increment&lt;/button&gt;</span>
    <span class="token comment">//     &lt;/div&gt;</span>
    <span class="token comment">// ));</span>
    <span class="token comment">// 改成使用Observer组件</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Observer</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">App</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>store<span class="token punctuation">.</span>doubleCount<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Increment</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
            <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Observer</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> App
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p>效果：</p><figure><img src="`+d+`" alt="msedge_pHxIbr7fku" tabindex="0" loading="lazy"><figcaption>msedge_pHxIbr7fku</figcaption></figure><h3 id="oop" tabindex="-1"><a class="header-anchor" href="#oop" aria-hidden="true">#</a> OOP</h3><p>这个相对来说比函数式简单些，看个人习惯吧</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> observer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mobx-react-lite&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> counterStore <span class="token keyword">from</span> <span class="token string">&#39;./store&#39;</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">observer</span></span>
<span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token keyword">extends</span> <span class="token class-name">React</span><span class="token punctuation">.</span>Component <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> counterStore<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">+</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>counterStore<span class="token punctuation">.</span>count<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> counterStore<span class="token punctuation">.</span><span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">-</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Counter<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="styled-components" tabindex="-1"><a class="header-anchor" href="#styled-components" aria-hidden="true">#</a> Styled-components</h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>一句话概括：<code>all in js</code></p><p>虽然不如vue那样方便，但是react中这样做可以很好的实现语法上的css提示</p><p>同时扩展性非常好</p><p>不过主要式锦上添花用的，实际可能并用不上</p><h2 id="安装和快速使用" tabindex="-1"><a class="header-anchor" href="#安装和快速使用" aria-hidden="true">#</a> 安装和快速使用</h2><p>安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i styled-components
<span class="token function">pnpm</span> i styled-components
<span class="token function">yarn</span> <span class="token function">add</span> styled-components
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着使用</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>


<span class="token keyword">const</span> App<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	
    <span class="token comment">// 这里可以直接生成一个带着样式的组件</span>
    <span class="token keyword">const</span> MyDivComponent <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        background-color: red;
        padding: 10px;
        border: 1px solid black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    </span><span class="token template-punctuation string">\`</span></span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">MyDivComponent</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">My Div Component</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">MyDivComponent</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p><figure><img src="`+v+'" alt="image-20230327191108945" tabindex="0" loading="lazy"><figcaption>image-20230327191108945</figcaption></figure><p>接着看看className，发现是随机的</p><figure><img src="'+m+`" alt="image-20230327191129900" tabindex="0" loading="lazy"><figcaption>image-20230327191129900</figcaption></figure><p>emm感觉目前唯一的缺点是 没有代码提示 比较难受</p><p>当然，这玩意是直接支持<code>sass</code>语法的</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>


<span class="token keyword">const</span> App<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> MyDivComponent <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        background-color: red;
        padding: 10px;
        border: 1px solid black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        h1{
            font-size: 20px;
            // 下划线
            text-decoration: underline;
        }
    </span><span class="token template-punctuation string">\`</span></span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">MyDivComponent</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">My Div Component</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">MyDivComponent</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+b+`" alt="image-20230327191252694" tabindex="0" loading="lazy"><figcaption>image-20230327191252694</figcaption></figure><h2 id="特性-穿透props" tabindex="-1"><a class="header-anchor" href="#特性-穿透props" aria-hidden="true">#</a> 特性-穿透props</h2><p>例子：</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>


<span class="token keyword">const</span> App<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> <span class="token punctuation">[</span>color<span class="token punctuation">,</span> setColor<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;red&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token function-variable function">changeColor</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 生成随机颜色</span>
        <span class="token keyword">const</span> randomColor <span class="token operator">=</span> <span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0xffffff</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">padEnd</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">)</span>
        <span class="token function">setColor</span><span class="token punctuation">(</span>randomColor<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Child</span></span> <span class="token attr-name">color</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>color<span class="token punctuation">}</span></span> <span class="token attr-name">fontSize</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">60</span><span class="token punctuation">}</span></span> <span class="token attr-name">onClicked</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>changeColor<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">

        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token keyword">const</span> <span class="token function-variable function">Child</span> <span class="token operator">=</span> <span class="token punctuation">(</span>props<span class="token operator">:</span> <span class="token punctuation">{</span> color<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> fontSize<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">,</span> onClicked<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> React<span class="token punctuation">.</span>MouseEvent<span class="token operator">&lt;</span>HTMLDivElement<span class="token punctuation">,</span> MouseEvent<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 我们这里可以直接传一个props或者state进去，他会自动帮我们重渲染</span>
    <span class="token keyword">const</span> ChildDiv <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        color: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">; // PS 一般情况下这建议使用函数接受：props=&gt;{props.color}
        font-size: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">typeof</span> props<span class="token punctuation">.</span>fontSize <span class="token operator">===</span> <span class="token string">&#39;number&#39;</span> <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>fontSize<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> props<span class="token punctuation">.</span>fontSize<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
    </span><span class="token template-punctuation string">\`</span></span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ChildDiv</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>onClicked<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Child</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">ChildDiv</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>



<span class="token keyword">export</span> <span class="token keyword">default</span> App

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+g+`" alt="msedge_iEv9JSrU9C" tabindex="0" loading="lazy"><figcaption>msedge_iEv9JSrU9C</figcaption></figure><h2 id="特性-扩展样式" tabindex="-1"><a class="header-anchor" href="#特性-扩展样式" aria-hidden="true">#</a> 特性-扩展样式</h2><p>可以给任意组件扩展样式 注意这式通过他会传递一个className给对应组件实现的</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>


<span class="token keyword">const</span> App<span class="token operator">:</span> React<span class="token punctuation">.</span><span class="token function-variable function">FC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> MyChild <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>Child<span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        color: red;
    </span><span class="token template-punctuation string">\`</span></span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span><span class="token comment">/* @ts-ignore */</span><span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">MyChild</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token keyword">const</span> <span class="token function-variable function">Child</span> <span class="token operator">=</span> <span class="token punctuation">(</span>props<span class="token operator">:</span> <span class="token punctuation">{</span> className<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>className<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            Child
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>



<span class="token keyword">export</span> <span class="token keyword">default</span> App



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试" aria-hidden="true">#</a> 单元测试</h1>`,41);function E(M,I){const t=o("ExternalLinkIcon");return c(),l("div",null,[h,n("p",null,[s("官网："),n("a",y,[s("immutable-js/immutable-js: Immutable persistent data collections for Javascript which increase efficiency and simplicity. (github.com)"),p(t)])]),w,n("p",null,[s("这东西是一个功能比较强大的，"),x,s("，就像是Vue的"),n("a",q,[s("Pinia"),p(t)]),s("那样，主要用途是替代redux")]),n("p",null,[s("文档地址："),n("a",C,[s("MobX 中文文档"),p(t)])]),_,R,S,A,j,N,O])}const J=e(f,[["render",E],["__file","04-React的常用工具.html.vue"]]);export{J as default};
