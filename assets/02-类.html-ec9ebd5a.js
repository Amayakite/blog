import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-2d4b26c1.js";const e={},p=t(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>嘛，总得来说这个东西和其他的强类型语言差不多，不过类这个东西在 golang 中被称为结构体</p><h2 id="从-type-开始" tabindex="-1"><a class="header-anchor" href="#从-type-开始" aria-hidden="true">#</a> 从 Type 开始</h2><p>就相当于是自定义类型一样，下面来一个简单的示例</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> myInt <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> n myInt
	n <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token function">println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>100
main.myInt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，这里打印的是自己的类型，不过一般也不会这样用来封装基本类型，之后会说明关于它的更详细的使用方法</p><blockquote><p>当然，还有一个类型别名，这个东西和自定义类型的区别是：</p><ul><li>类型别名只在编译之前有效，编译完毕后就没有了</li><li>自定义类型在编译前后都是<strong>始终有效</strong>的</li></ul></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> myInt <span class="token operator">=</span> <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> n myInt
	n <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token function">println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h2><p>就是其他语言的类一样，或者说是 interface?</p><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3><p>我们要定义的话，非常简单，赋值也是只需要简简单单的赋值，就和其他语言一样，取值同理</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	username <span class="token builtin">string</span>
	password <span class="token builtin">string</span>
	age      <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> user User
	user<span class="token punctuation">.</span>username <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span>
	user<span class="token punctuation">.</span>password <span class="token operator">=</span> <span class="token string">&quot;123456789&quot;</span>
	user<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">10</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="匿名结构体" tabindex="-1"><a class="header-anchor" href="#匿名结构体" aria-hidden="true">#</a> 匿名结构体</h3><p>emm 就是匿名内部类一样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> s <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        name <span class="token builtin">string</span>
        age  <span class="token builtin">int</span>
    <span class="token punctuation">}</span>
    s<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">111</span>
    s<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;张三&quot;</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;type:%T,value:%v\\n&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">,</span> s<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type:struct { name string; age int },value:{张三 111}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，还可以创建指针类型的结构体</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name<span class="token punctuation">,</span> gender <span class="token builtin">string</span>
	password     <span class="token operator">*</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">//来一个构造函数hhh</span>
<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> gender <span class="token builtin">string</span><span class="token punctuation">,</span> password <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> gender<span class="token punctuation">:</span> gender<span class="token punctuation">,</span> password<span class="token punctuation">:</span> <span class="token operator">&amp;</span>password<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	user <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;aaa&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;男&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;aaa&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>user<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结构体初始化的几种方式" tabindex="-1"><a class="header-anchor" href="#结构体初始化的几种方式" aria-hidden="true">#</a> 结构体初始化的几种方式</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name<span class="token punctuation">,</span> gender <span class="token builtin">string</span>
	password     <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">//这里返回指针，减少内存消耗</span>
<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> gender <span class="token builtin">string</span><span class="token punctuation">,</span> password <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> gender<span class="token punctuation">:</span> gender<span class="token punctuation">,</span> password<span class="token punctuation">:</span> password<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//	方式1，直接初始化</span>
	<span class="token keyword">var</span> user1 Person
	user1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;张三&quot;</span>
	user1<span class="token punctuation">.</span>gender <span class="token operator">=</span> <span class="token string">&quot;男&quot;</span>
	user1<span class="token punctuation">.</span>password <span class="token operator">=</span> <span class="token string">&quot;Hello&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user1<span class="token punctuation">)</span>

	<span class="token comment">//	方式2：</span>
	user2 <span class="token operator">:=</span> Person<span class="token punctuation">{</span>
		name<span class="token punctuation">:</span>     <span class="token string">&quot;AA&quot;</span><span class="token punctuation">,</span>
		gender<span class="token punctuation">:</span>   <span class="token string">&quot;VV&quot;</span><span class="token punctuation">,</span>
		password<span class="token punctuation">:</span> <span class="token string">&quot;CC&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user2<span class="token punctuation">)</span>
	<span class="token comment">//    方式三，自己写一个构造方法</span>
	user3 <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;女&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123546&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user3<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="给结构体添加方法-重要" tabindex="-1"><a class="header-anchor" href="#给结构体添加方法-重要" aria-hidden="true">#</a> 给结构体添加方法(重要)</h3><p>众所周知，方法分为两种，一种静态的和一种属于某个类的，这里静态的就不演示了，来说明下如何给某个结构体添加指定的方法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name<span class="token punctuation">,</span> gender <span class="token builtin">string</span>
	password     <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewPerson 构造方法</span>
<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> gender <span class="token builtin">string</span><span class="token punctuation">,</span> password <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> gender<span class="token punctuation">:</span> gender<span class="token punctuation">,</span> password<span class="token punctuation">:</span> password<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 注意 这里是指针 或者不用指针也行，不过不用指针的话得确保调用这个方法的实例是一个非指针对象</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>person <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">changePersonName</span><span class="token punctuation">(</span>newName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	person<span class="token punctuation">.</span>name <span class="token operator">=</span> newName
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	person <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;男&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;23123123&quot;</span><span class="token punctuation">)</span>

	person<span class="token punctuation">.</span><span class="token function">changePersonName</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>person<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上方<code>changePersonName</code>中的 person 在其他语言中就相当于<code>this</code>或者 Python 的<code>self</code>一样</p><h3 id="结构体的嵌套使用" tabindex="-1"><a class="header-anchor" href="#结构体的嵌套使用" aria-hidden="true">#</a> 结构体的嵌套使用</h3><p>非常简单，就和其他语言一样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Address <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	city <span class="token builtin">string</span>
	x    <span class="token builtin">int</span>
	y    <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name    <span class="token builtin">string</span>
	age     <span class="token builtin">int</span>
	address Address
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	person <span class="token operator">:=</span> Person<span class="token punctuation">{</span>
		name<span class="token punctuation">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
		age<span class="token punctuation">:</span>  <span class="token number">0</span><span class="token punctuation">,</span>
		address<span class="token punctuation">:</span> Address<span class="token punctuation">{</span>
			city<span class="token punctuation">:</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">,</span>
			x<span class="token punctuation">:</span>    <span class="token number">666</span><span class="token punctuation">,</span>
			y<span class="token punctuation">:</span>    <span class="token number">8888</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h3><p>在 go 语言中没有明确的继承这个概念，所以说得是模拟实现一个继承，不过用起来还是蛮舒服的（除了略微有点繁琐）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
    age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> age<span class="token punctuation">:</span> age<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>person <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s正在动\\n&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Teacher <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token operator">*</span>Person
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>teacher <span class="token operator">*</span>Teacher<span class="token punctuation">)</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;老师%s开始上课\\n&quot;</span><span class="token punctuation">,</span> teacher<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    user <span class="token operator">:=</span> Teacher<span class="token punctuation">{</span><span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    user<span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    user<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者不用指针的话</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
	age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> age<span class="token punctuation">:</span> age<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>person <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s正在动\\n&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Teacher <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Person
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>teacher <span class="token operator">*</span>Teacher<span class="token punctuation">)</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;老师%s开始上课\\n&quot;</span><span class="token punctuation">,</span> teacher<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	user <span class="token operator">:=</span> Teacher<span class="token punctuation">{</span>Person<span class="token punctuation">{</span>
        name<span class="token punctuation">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
        age<span class="token punctuation">:</span>  <span class="token number">666</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">}</span>
	user<span class="token punctuation">.</span><span class="token function">move</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	user<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展-json-的序列化和反序列化" tabindex="-1"><a class="header-anchor" href="#扩展-json-的序列化和反序列化" aria-hidden="true">#</a> 扩展： Json 的序列化和反序列化</h3><p>例如有如下的 json 字符串</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 go 语言中进行序列化和反序列化的话，只需要进行如下操作</p><blockquote><p>序列化</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/json&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 这里是标准写法，第三个标识表示转义后的字段名，且首字母必须大写</span>
<span class="token comment">//  因为首字母大写表示这个字段是公开的，小写表示非公开（private）</span>
<span class="token comment">//  大写相当于(public)</span>
<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
	Age  <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	p1 <span class="token operator">:=</span> Person<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//返回两个对象，一个是序列化后的json byte  一个是err</span>
	marshal<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;转义失败，原因：%s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>marshal<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;张三\\&quot;,\\&quot;age\\&quot;:18}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>反序列化</p></blockquote><p>也非常简单</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/json&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
	Age  <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	str <span class="token operator">:=</span> <span class="token string">&quot;{\\&quot;name\\&quot;:\\&quot;张三\\&quot;,\\&quot;age\\&quot;:18}&quot;</span>

	<span class="token keyword">var</span> person Person

	err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>person<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;出现了错误：%s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;反序列化后的Person对象：%#v\\n&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>反序列化后的Person对象：main.Person{Name:&quot;张三&quot;, Age:18}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="接口-interface" tabindex="-1"><a class="header-anchor" href="#接口-interface" aria-hidden="true">#</a> 接口(interface)</h2><p>在 Golang 中，接口是<strong>一种类型</strong></p><p>Go 语言官方推荐使用面向接口编程</p><h3 id="基本的创建和使用" tabindex="-1"><a class="header-anchor" href="#基本的创建和使用" aria-hidden="true">#</a> 基本的创建和使用</h3><p>感觉略微有点绕</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> speaker <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//只要实现了speak方法的（有这个方法的）都是speaker类型</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> dog <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">type</span> person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c cat<span class="token punctuation">)</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;喵喵喵&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p person<span class="token punctuation">)</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;阿啊啊&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>d dog<span class="token punctuation">)</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;汪汪汪&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">say</span><span class="token punctuation">(</span>x speaker<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	x<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	p1 <span class="token operator">:=</span> person<span class="token punctuation">{</span><span class="token punctuation">}</span>
	c1 <span class="token operator">:=</span> cat<span class="token punctuation">{</span><span class="token punctuation">}</span>
	d1 <span class="token operator">:=</span> dog<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token function">say</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span>
    <span class="token function">say</span><span class="token punctuation">(</span>c1<span class="token punctuation">)</span>
    <span class="token function">say</span><span class="token punctuation">(</span>d1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义一个接口" tabindex="-1"><a class="header-anchor" href="#定义一个接口" aria-hidden="true">#</a> 定义一个接口</h3><p>语法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> <span class="token keyword">interface</span> 接口名<span class="token punctuation">{</span>
	方法<span class="token function">1</span><span class="token punctuation">(</span>参数<span class="token number">1</span><span class="token punctuation">,</span>参数<span class="token number">2.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">(</span>返回值<span class="token number">1</span><span class="token punctuation">,</span>返回值<span class="token number">2.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
	方法<span class="token function">2</span><span class="token punctuation">(</span>参数<span class="token number">1</span><span class="token punctuation">,</span>参数<span class="token number">2.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">(</span>返回值<span class="token number">1</span><span class="token punctuation">,</span>返回值<span class="token number">2.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
	<span class="token operator">...</span><span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>嘛反正就是只能对方法进行限制，而不是对字段进行限制，这个跟 Java 差不多</p><div class="hint-container tip"><p class="hint-container-title">关于 Typescript 之类的 Internet</p><p>在 Typescript 之类的代码中，Interface 可能是用于做来限制字段的（例如 name 必须是整数型等）</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> int<span class="token punctuation">;</span>
  SayHello<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token operator">&lt;</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，在 Java 这类的语言中，并没有这个概念，Interface 往往都是限制需要哪些方法，例如</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

	<span class="token doc-comment comment">/**
	* <span class="token keyword">@param</span> <span class="token punctuation">{</span>user<span class="token punctuation">}</span> 用户的实体对象
	*/</span>
	<span class="token keyword">void</span> <span class="token function">addUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Golang 中，和 Java 一样，Interface 也是用来限制实现类所拥有的的方法</p><p>但是类来实现它并不是像 Java 一样直接<code>impl...</code>来实现某个接口，而是通过创建一个方法，需要接收一个这个接口的对象，来达成想要的效果，这样的灵活性更强（当然相对的，很容易人就晕了）</p></div><p>当然，因为接口是一个类型，所以我们可以声明一个接口类型的变量</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> speaker <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//只要实现了speak方法的变量都是speaker类型</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> dog <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">type</span> person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c cat<span class="token punctuation">)</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;喵喵喵&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p person<span class="token punctuation">)</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;阿啊啊&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>d dog<span class="token punctuation">)</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;汪汪汪&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">say</span><span class="token punctuation">(</span>x speaker<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	x<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> sp speaker
    sp<span class="token operator">=</span> person<span class="token punctuation">{</span><span class="token punctuation">}</span>
    sp<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="值接收者和指针接收者接口的区别" tabindex="-1"><a class="header-anchor" href="#值接收者和指针接收者接口的区别" aria-hidden="true">#</a> 值接收者和指针接收者接口的区别</h3><div class="hint-container tip"><p class="hint-container-title">提示</p><p>先上总结：没有区别，都可以传入</p></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> animal <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">eat</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c cat<span class="token punctuation">)</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;喵喵喵&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c cat<span class="token punctuation">)</span> <span class="token function">eat</span><span class="token punctuation">(</span>food <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;猫猫吃掉了食物%s\\n&quot;</span><span class="token punctuation">,</span> food<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token keyword">var</span> a1 animal
	c1 <span class="token operator">:=</span> cat<span class="token punctuation">{</span><span class="token punctuation">}</span>

	a1 <span class="token operator">=</span> c1
	a1<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token string">&quot;香蕉&quot;</span><span class="token punctuation">)</span>
	a1<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">var</span> a2 animal
	c2 <span class="token operator">:=</span> <span class="token operator">&amp;</span>cat<span class="token punctuation">{</span><span class="token punctuation">}</span>

	a2 <span class="token operator">=</span> c2
	a2<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token string">&quot;苹果&quot;</span><span class="token punctuation">)</span>
	a2<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> a1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> a2<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>猫猫吃掉了食物香蕉
喵喵喵
猫猫吃掉了食物苹果
喵喵喵
main.cat
*main.cat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接口的继承" tabindex="-1"><a class="header-anchor" href="#接口的继承" aria-hidden="true">#</a> 接口的继承</h3><p>这个和 Java 一样的使用方式，或者说和 GoLang 中类的继承是同样的方式，如果你想，可以无线套娃，下面演示一个简单的继承</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> animal <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    mover
    eater
<span class="token punctuation">}</span>

<span class="token keyword">type</span> mover <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> eater <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">eat</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c cat<span class="token punctuation">)</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;喵喵喵&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c cat<span class="token punctuation">)</span> <span class="token function">eat</span><span class="token punctuation">(</span>food <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;猫猫吃掉了食物%s\\n&quot;</span><span class="token punctuation">,</span> food<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">var</span> a1 animal

    c1 <span class="token operator">:=</span> cat<span class="token punctuation">{</span><span class="token punctuation">}</span>

    a1<span class="token operator">=</span><span class="token operator">&amp;</span>c1
    a1<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token string">&quot;阿啊啊&quot;</span><span class="token punctuation">)</span>
    a1<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="空接口" tabindex="-1"><a class="header-anchor" href="#空接口" aria-hidden="true">#</a> 空接口</h3><p>例如接收任意的东西，这个一般不会自己定义，都是写在方法内</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">sayHello</span><span class="token punctuation">(</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// Do Something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这玩意有啥好处呢？</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>所有类型都实现了空接口，也就是类型类型的变量都能保存到空接口当中（能接收任意类型的参数）</p><p>也就相当于 Java 之类<strong>面对对象</strong>语言的<code>Object</code>一样</p></div><p>那么实际用途呢？</p><blockquote><p>例如：我们想创建一个 key 是 String，value 是 Object 类型的 map</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> myMap <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">//别忘了这蛋疼的make</span>
    myMap <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>

	myMap<span class="token punctuation">[</span><span class="token string">&quot;aa&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>

	myMap<span class="token punctuation">[</span><span class="token string">&quot;bb&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;aaa&quot;</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>myMap<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>map[aa:1 bb:aaa]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="空接口类型的判断和断言" tabindex="-1"><a class="header-anchor" href="#空接口类型的判断和断言" aria-hidden="true">#</a> 空接口类型的判断和断言</h3><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>嘛，就是判断一个通过空接口传入的参数是否为某个类型，有预感，之后这种操作会比较常见</p></div><p>先来一个基本的判断，固定写法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">assign</span><span class="token punctuation">(</span>a <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;传入的参数的类型是：%T\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	str<span class="token punctuation">,</span> ok <span class="token operator">:=</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;传入的类型不是一个字符串&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;传进来了一个字符串&quot;</span><span class="token punctuation">,</span> str<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">assign</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>如果可能有多个值的话，则可以使用 Switch</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">assign</span><span class="token punctuation">(</span>a <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token keyword">switch</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;传入了一个字符串：&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;传入了一个数值%d\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;暂时无法处理这种格式：%T\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MyInt <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> aa MyInt <span class="token operator">=</span> <span class="token number">1000</span>
	<span class="token function">assign</span><span class="token punctuation">(</span>aa<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="package-包" tabindex="-1"><a class="header-anchor" href="#package-包" aria-hidden="true">#</a> Package-包</h2><p>emmm 貌似也不需要额外进行介绍这玩意了吧</p><p>反正跟其他语言一样，Go 语言中咋可能少了包的概念</p><h3 id="从一个简单的包开始" tabindex="-1"><a class="header-anchor" href="#从一个简单的包开始" aria-hidden="true">#</a> 从一个简单的包开始</h3><p>我现在的项目结构为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>├─github.com
|     ├─amayakite
|     |     ├─study
|     |     |   ├─main.go
|     |     |   ├─MyPackage
|     |     |   |     └Dog.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>Dog.go</code>中有如下内容</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> MyPackage

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么我该如何在 Main 文件中调用它呢？</p><p>其实很简单（这里我的编辑器是 Jetbrains 的 Golang，如果使用 VsCode 的话可能要配置 GO Mod 之类的东西，关于 Go Mod 这个之后会说），只需要在 main 中写如下代码即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> MyPackage

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>run 了下，正常运行，这就是包</p><div class="hint-container warning"><p class="hint-container-title">重要提示</p><p>在 Golang 中，没有明确的<code>public</code>或者<code>private</code>等标识符</p><p>一个 go 文件中，如果说要对外暴露的方法或者参数，则首字母必须大写</p><p>例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 这样只能在本文件调用</span>
<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 这样可以在任意地方调用</span>
<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="包的别名" tabindex="-1"><a class="header-anchor" href="#包的别名" aria-hidden="true">#</a> 包的别名</h3><p>如果有些包是以数字开头的，则可以取一个别名</p><p>例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>

	myPackage <span class="token string">&quot;xxx.xxx/aaa/113123dasdasd&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	myPackage<span class="token punctuation">.</span><span class="token function">xxx</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container danger"><p class="hint-container-title">注意</p><p>在 Go 语言中，禁止循环导包</p></div>`,104),i=[p];function c(o,l){return s(),a("div",null,i)}const r=n(e,[["render",c],["__file","02-类.html.vue"]]);export{r as default};
