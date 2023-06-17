import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o,c as i,a as n,b as s,d as t,e as p}from"./app-3ab2953d.js";const l={},u=p(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>在 Go 语言的反射机制中，任何接口值都由是一个具体类型和具体类型的值两部分组成的。</p><p>在 Go 语言中反射的相关功能由内置的 reflect 包提供，任意接口值在反射中都可以理解为由 reflect.Type 和 reflect.Value 两部分组成，并且 reflect 包提供了 reflect.TypeOf 和 reflect.ValueOf 两个函数来获取任意对象的 Value 和 Type。</p><p>举个例子，在 go 语言中我们是如何将 json 和对象相互转换的？</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/json&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> ResultResponse <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Code    <span class="token builtin">int</span>    <span class="token string">\`json:&quot;code&quot;\`</span>
	Message <span class="token builtin">string</span> <span class="token string">\`json:&quot;message&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	res <span class="token operator">:=</span> ResultResponse<span class="token punctuation">{</span>
		Code<span class="token punctuation">:</span>    <span class="token number">0</span><span class="token punctuation">,</span>
		Message<span class="token punctuation">:</span> <span class="token string">&quot;Successful response&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	marshal<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>marshal<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一看就用到了反射，接下来就好好的说明下它</p><h2 id="获取对象的类型信息" tabindex="-1"><a class="header-anchor" href="#获取对象的类型信息" aria-hidden="true">#</a> 获取对象的类型信息</h2><p>在 Go 语言中，使用 reflect.TypeOf()函数可以获得任意值的类型对象（reflect.Type），程序通过类型对象可以访问任意值的类型信息。</p>`,8),d={class:"hint-container tip"},k=n("p",{class:"hint-container-title"},"提示",-1),r={href:"http://t.Name",target:"_blank",rel:"noopener noreferrer"},v={href:"http://xn--vnqt02au6u.Name",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,"在 Go 语言中我们可以使用 type 关键字构造很多自定义类型，而种类（Kind）就是指底层的类型，但在反射中，当需要区分指针、结构体、类型别名等大品种的类型时，就会用到种类（Kind）",-1),b=p(`<p>在 reflect 包中定义的 Kind 类型如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Kind <span class="token builtin">uint</span>
<span class="token keyword">const</span> <span class="token punctuation">(</span>
  Invalid Kind <span class="token operator">=</span> <span class="token boolean">iota</span>  <span class="token comment">// 非法类型</span>
  Bool                 <span class="token comment">// 布尔型</span>
  Int                  <span class="token comment">// 有符号整型</span>
  Int8                 <span class="token comment">// 有符号8位整型</span>
  Int16                <span class="token comment">// 有符号16位整型</span>
  Int32                <span class="token comment">// 有符号32位整型</span>
  Int64                <span class="token comment">// 有符号64位整型</span>
  Uint                 <span class="token comment">// 无符号整型</span>
  Uint8                <span class="token comment">// 无符号8位整型</span>
  Uint16               <span class="token comment">// 无符号16位整型</span>
  Uint32               <span class="token comment">// 无符号32位整型</span>
  Uint64               <span class="token comment">// 无符号64位整型</span>
  Uintptr              <span class="token comment">// 指针</span>
  Float32              <span class="token comment">// 单精度浮点数</span>
  Float64              <span class="token comment">// 双精度浮点数</span>
  Complex64            <span class="token comment">// 64位复数类型</span>
  Complex128           <span class="token comment">// 128位复数类型</span>
  Array                <span class="token comment">// 数组</span>
  Chan                 <span class="token comment">// 通道</span>
  Func                 <span class="token comment">// 函数</span>
  Interface            <span class="token comment">// 接口</span>
  Map                  <span class="token comment">// 映射</span>
  Ptr                  <span class="token comment">// 指针</span>
  Slice                <span class="token comment">// 切片</span>
  String               <span class="token comment">// 字符串</span>
  Struct               <span class="token comment">// 结构体</span>
  UnsafePointer        <span class="token comment">// 底层指针</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> myInt <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">reflectType</span><span class="token punctuation">(</span>x <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	k <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//fmt.Printf(&quot;Reflect Type = %v, Name Type : %v,Kind : %s (%d)\\n&quot;, v, v.Name(), k, k)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;反射对象的类型是：&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;反射对象的名称是：&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;类型的名称:&quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;类型的长度是%d\\n&quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;========&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">demo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a <span class="token builtin">int64</span> <span class="token operator">=</span> <span class="token number">100</span>    <span class="token comment">// 整形</span>
	<span class="token keyword">var</span> b <span class="token builtin">float32</span> <span class="token operator">=</span> <span class="token number">3.14</span> <span class="token comment">// 浮点型</span>
	<span class="token keyword">var</span> c <span class="token builtin">rune</span>           <span class="token comment">// 类型别名</span>
	<span class="token keyword">var</span> d myInt <span class="token operator">=</span> <span class="token number">1024</span>   <span class="token comment">// 自定义类型</span>
	<span class="token keyword">type</span> person <span class="token keyword">struct</span> <span class="token punctuation">{</span> <span class="token comment">// 结构体</span>
		name <span class="token builtin">string</span>
		age  <span class="token builtin">int</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">type</span> book <span class="token keyword">struct</span><span class="token punctuation">{</span> title <span class="token builtin">string</span> <span class="token punctuation">}</span>
	<span class="token keyword">var</span> e <span class="token operator">=</span> person<span class="token punctuation">{</span>
		name<span class="token punctuation">:</span> <span class="token string">&quot;WeiyiGeek&quot;</span><span class="token punctuation">,</span>
		age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> f <span class="token operator">=</span> book<span class="token punctuation">{</span>title<span class="token punctuation">:</span> <span class="token string">&quot;《跟WeiyiGeek学Go语言》&quot;</span><span class="token punctuation">}</span>

	<span class="token comment">// 调用查看反射类型</span>
	<span class="token function">reflectType</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	<span class="token function">reflectType</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
	<span class="token function">reflectType</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
	<span class="token function">reflectType</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
	<span class="token function">reflectType</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
	<span class="token function">reflectType</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">demo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>反射对象的类型是： int64
反射对象的名称是： int64
类型的名称: int64
类型的长度是6
========
反射对象的类型是： float32
反射对象的名称是： float32
类型的名称: float32
类型的长度是13
========
反射对象的类型是： int32
反射对象的名称是： int32
类型的名称: int32
类型的长度是5
========
反射对象的类型是： main.myInt
反射对象的名称是： myInt
类型的名称: int
类型的长度是2
========
反射对象的类型是： main.person
反射对象的名称是： person
类型的名称: struct
类型的长度是25
========
反射对象的类型是： main.book
反射对象的名称是： book
类型的名称: struct
类型的长度是25
========
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类型对象值" tabindex="-1"><a class="header-anchor" href="#类型对象值" aria-hidden="true">#</a> 类型对象值</h2><p>reflect.ValueOf()返回的是 reflect.Value 类型，其中包含了原始值的值信息,reflect.Value 与原始值之间可以互相转换。</p><p>通过反射获取值 , reflect.Value 类型提供的获取原始值的方法如下:</p><ul><li>Interface() interface {} : 将值以 interface{} 类型返回，可以通过类型断言转换为指定类型</li><li>Int() int64 : 将值以 int 类型返回，所有有符号整型均可以此方式返回</li><li>Uint() uint64 : 将值以 uint 类型返回，所有无符号整型均可以此方式返回</li><li>Float() float64 : 将值以双精度（float64）类型返回，所有浮点数（float32、float64）均可以此方式返回</li><li>Bool() bool : 将值以 bool 类型返回</li><li>Bytes() []bytes : 将值以字节数组 []bytes 类型返回</li><li>String() string : 将值以字符串类型返回</li></ul><p>通过反射设置变量的值。</p><ul><li><p>在函数中通过反射修改变量的值，如果传递非变量地址值则会报 panic: reflect: reflect.Value.Type using unaddressable value 错误。</p></li><li><p>在函数中通过反射修改变量的值，需要注意函数参数传递的是值拷贝，必须传递变量地址才能修改变量值,而反射中使用专有的 Elem()方法来获取指针对应的值。</p></li></ul><p>例如，下述我们分别采用反射的 ValueOf 方法获取的相关信息进行获取值与设置值</p><h3 id="获取值" tabindex="-1"><a class="header-anchor" href="#获取值" aria-hidden="true">#</a> 获取值</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">10</span>
	T <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
	value <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
	kind <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">//    判断kind的值 如果是数值的话一般是用Int或者Int64,如果有多种规则，则可以通过Switch来进行判断</span>
	<span class="token keyword">if</span> kind <span class="token operator">==</span> reflect<span class="token punctuation">.</span>Int <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;type is int64, value is %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Reflect Type = %v, Reflect Value = %v, Name : %v, Kind : %s (%d)\\n\\n&quot;</span><span class="token punctuation">,</span> T<span class="token punctuation">,</span> value<span class="token punctuation">,</span> T<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改值" tabindex="-1"><a class="header-anchor" href="#修改值" aria-hidden="true">#</a> 修改值</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">10</span>
	T <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
	value <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
	<span class="token comment">//    判断Value的Kind（注意 这个有bug 修改不成功）</span>
	<span class="token keyword">if</span> value<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> reflect<span class="token punctuation">.</span>Int64 <span class="token punctuation">{</span>
		value<span class="token punctuation">.</span><span class="token function">SetInt</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;类型是：%v,修改后的值是：%v\\n&quot;</span><span class="token punctuation">,</span> T<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;通过反射修改完毕后的值是%d\\n&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>

	<span class="token comment">//    如果是指针的话...一般都是通过这种方式来修改值  或者或不管什么情况反射都是通过这种方式来修改值</span>
	<span class="token keyword">var</span> num2 <span class="token operator">=</span> <span class="token number">1000</span>

	T <span class="token operator">=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>num2<span class="token punctuation">)</span>
	value <span class="token operator">=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>num2<span class="token punctuation">)</span>

	<span class="token keyword">if</span> value<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> reflect<span class="token punctuation">.</span>Int64 <span class="token punctuation">{</span>
		value<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetInt</span><span class="token punctuation">(</span><span class="token number">666</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;类型是：%v,修改后的值是：%v\\n&quot;</span><span class="token punctuation">,</span> T<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;通过反射修改完毕后的值：%d\\n&quot;</span><span class="token punctuation">,</span> num2<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反射值判断" tabindex="-1"><a class="header-anchor" href="#反射值判断" aria-hidden="true">#</a> 反射值判断</h2><p>Go 中常用的反射值是否为空以及是否有效常常使用以下两种方法 isNil()和 isValid()：</p><p><code>func (v Value) IsNil() bool</code>: 常被用于判断指针是否为空, 返回 v 持有的值是否为 nil,且分类必须是通道、函数、接口、映射、指针、切片之一；否则 IsNil 函数会导致 panic。</p><p><code>func (v Value) IsValid() bool</code>: 常被用于判定返回值是否有效, 返回 v 是否持有一个值。如果 v 是 Value 零值会返回假，此时 v 除了 IsValid、String、Kind 之外的方法都会导致 panic</p><p>例子：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> b <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>b<span class="token punctuation">)</span> <span class="token function">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
  fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">&quot;我是通过Call调用的Demo方法，&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token number">1024</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// (1) *int类型空指针 : 必须是通道、函数、接口、映射、指针、切片之一</span>
	<span class="token keyword">var</span> a <span class="token operator">*</span><span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;var a *int IsNil:&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsNil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// (2) nil值 : 除了IsValid、String、Kind之外的方法都会导致panic。</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;nil IsValid:&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// (3) 实例化一个匿名结构体</span>
	b1 <span class="token operator">:=</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	b2 <span class="token operator">:=</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		abc <span class="token builtin">string</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// (4) 实例化一个结构体</span>
	b3 <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

	<span class="token comment">// 尝试从结构体中查找&quot;abc&quot;字段</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b1是否存在的结构体成员 abc ? :&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>b1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">FieldByName</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 不存在</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b2是否存在的结构体成员 abc ? :&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>b2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">FieldByName</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 存在</span>

	<span class="token comment">// 尝试从结构体中查找&quot;demo&quot;方法</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b1是否存在的结构体方法 Demo ? :&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>b1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">MethodByName</span><span class="token punctuation">(</span><span class="token string">&quot;Demo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">//不存在</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b3是否存在的结构体方法 Demo ? :&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>b3<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">MethodByName</span><span class="token punctuation">(</span><span class="token string">&quot;Demo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">//存在</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b3结构体Demo方法返回值类型: &quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>b3<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">MethodByName</span><span class="token punctuation">(</span><span class="token string">&quot;Demo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//输出执行其方法以及返回值的类型 （特别注意，先执行调用后返回类型，并输出）</span>


	<span class="token comment">// (4) map 	尝试从map中查找一个不存在的键</span>
	c <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	c<span class="token punctuation">[</span><span class="token string">&quot;WeiyiGeek&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1024</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;map中是否存在WeiyiGeek的键：&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">MapIndex</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token string">&quot;WeiyiGeek&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;map中是否存在Geek的键：&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">MapIndex</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token string">&quot;Geek&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var a *int IsNil: true
nil IsValid: false
b1是否存在的结构体成员 abc ? : false
b2是否存在的结构体成员 abc ? : true
b1是否存在的结构体方法 Demo ? : false
b3是否存在的结构体方法 Demo ? : true
我是通过Call调用的Demo方法，b3结构体Demo方法返回值类型:  [&lt;int Value&gt;]
map中是否存在WeiyiGeek的键： true
map中是否存在Geek的键： false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实践" tabindex="-1"><a class="header-anchor" href="#实践" aria-hidden="true">#</a> 实践</h2><p>下面讲解与结构体相关的反射知识，当任意值通过 reflect.TypeOf()获得反射对象信息后，如果它的类型是结构体，可以通过反射值对象（reflect.Type）的 NumField()方法和 Field()方法获得结构体成员的详细信息。</p><h3 id="结构体获取相关成员的方法" tabindex="-1"><a class="header-anchor" href="#结构体获取相关成员的方法" aria-hidden="true">#</a> 结构体获取相关成员的方法</h3><p>如下表所示 reflect.Type 中与获取结构体成员相关的方法。</p><ul><li><code>NumField() int</code>返回结构体成员字段数量</li><li><code>Field(i int) StructField</code>根据索引位置，返回对应索引结构体信息</li><li><code>FieldByName(name string) (StructField,bool)</code>根据给定字符串返回字符串对应的结构体字段信息</li><li><code>FieldByIndex(index []int) StructField</code>多层成员访问时，根据[]int 提供的每个结构体字段索引，返回字段的信息</li><li><code>FieldByNameFunc(match func(string) bool) (StructField,bool)</code>根据传入的匹配函数匹配需要的字段</li><li><code>NumMethod() int</code>返回该类型的方法集中的方法数目</li><li><code>Method(int) Method</code>返回该类型方法集中的第 i 个方法</li><li><code>MethodByName(string) (Method,bool)</code>根据方法名返回该类型方法集中的方法</li></ul><h3 id="structfield-类型" tabindex="-1"><a class="header-anchor" href="#structfield-类型" aria-hidden="true">#</a> StructField 类型</h3><p>描述: StructField 类型用来描述结构体中的一个字段的信息,StructField  的定义如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> StructField <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  Name    <span class="token builtin">string</span>      <span class="token comment">// 字段的名字。</span>
  PkgPath <span class="token builtin">string</span>      <span class="token comment">// 非导出字段的包路径，对导出字段该字段为&quot;&quot;。参见 http://golang.org/ref/spec#Uniqueness_of_identifiers</span>
  Type      Type      <span class="token comment">// 字段的类型</span>
  Tag       StructTag <span class="token comment">// 字段的标签</span>
  Offset    <span class="token builtin">uintptr</span>   <span class="token comment">// 字段在结构体中的字节偏移量</span>
  Index     <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>     <span class="token comment">// 用于Type.FieldByIndex时的索引切片</span>
  Anonymous <span class="token builtin">bool</span>      <span class="token comment">// 是否匿名字段</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实践案例" tabindex="-1"><a class="header-anchor" href="#实践案例" aria-hidden="true">#</a> 实践案例</h3><p>示例说明, 当我们使用反射得到一个结构体数据之后可以通过索引依次获取其字段信息，也可以通过字段名去获取指定的字段信息，以及通过索引获取方法信息和调用执行该索引指定的方法。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot; person:&quot;weiyigeek&quot;\`</span> <span class="token comment">// 可以有多个 Tag</span>
	Score <span class="token builtin">int</span> <span class="token string">\`json:&quot;score&quot; person:&quot;geek&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token comment">// 给 student 添加两个方法 Study 和 Sleep(注意首字母大写)</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s student<span class="token punctuation">)</span> <span class="token function">Study</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	msg <span class="token operator">:=</span> <span class="token string">&quot;[Study] 好好学习，天天向上。&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> msg
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s student<span class="token punctuation">)</span> <span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	msg <span class="token operator">:=</span> <span class="token string">&quot;[Sleep] 好好睡觉，快快长大。&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> msg
<span class="token punctuation">}</span>

<span class="token comment">// 结构体反射示例演示方法</span>
<span class="token keyword">func</span> <span class="token function">Reflectstruct</span><span class="token punctuation">(</span>x <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// (2) 获取 stu1 对象反射类型信息,输出对象名称以及对象种类</span>
	t <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;reflect.TypeOf -&gt;&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// student struct</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;reflect.ValueOf -&gt;&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// {WeiyiGeek 90} struct</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// (3) 通过for循环遍历结构体的所有字段信息(方式1)</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> t<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    	field <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    	<span class="token comment">//fmt.Print(v.Field(i).Call([]reflect.Value{}))</span>
    	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;name:%s index:%d type:%v json tag: %v  person tag:%v , Field Anonymous: %v\\n&quot;</span><span class="token punctuation">,</span> field<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> field<span class="token punctuation">.</span>Index<span class="token punctuation">,</span> field<span class="token punctuation">.</span>Type<span class="token punctuation">,</span> field<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> field<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;person&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> field<span class="token punctuation">.</span>Anonymous<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// (4) 通过字段名获取指定结构体字段信息(方式2)</span>
    <span class="token keyword">if</span> scoreField<span class="token punctuation">,</span> ok <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">FieldByName</span><span class="token punctuation">(</span><span class="token string">&quot;Score&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
    	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\nname:%s index:%d type:%v json tag:%v , Field Anonymous: %v\\n&quot;</span><span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span>Index<span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span>Type<span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> scoreField<span class="token punctuation">.</span>Anonymous<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// (5) 通过for循环遍历结构体的所有方法信息</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;reflect.TypeOf NumMethod-&gt;&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;reflect.ValueOf NumMethod-&gt;&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> v<span class="token punctuation">.</span><span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    	methodType <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;method name:% s，method: %s\\n&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">,</span> methodType<span class="token punctuation">)</span>
    	<span class="token comment">// 通过反射调用方法传递的参数必须是 []reflect.Value 类型</span>
    	<span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span><span class="token punctuation">}</span>
    	<span class="token comment">// 相当于依次调用结构体中的方法</span>
    	v<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// (6) 通过方法名获取指定的结构体方法并执行</span>
    methodSleep <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">MethodByName</span><span class="token punctuation">(</span><span class="token string">&quot;Sleep&quot;</span><span class="token punctuation">)</span>
    methodSleepType <span class="token operator">:=</span> methodSleep<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Reflect Method ptr:%v，method Type: %v\\n&quot;</span><span class="token punctuation">,</span> methodSleep<span class="token punctuation">,</span> methodSleepType<span class="token punctuation">)</span>
    <span class="token comment">// 通过反射调用方法传递的参数必须是 []reflect.Value 类型</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 相当调用 结构体的 Sleep() 方法</span>
    methodSleep<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">// (1) 实例化 student 结构体</span>
	stu <span class="token operator">:=</span> student<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> <span class="token string">&quot;WeiyiGeek&quot;</span><span class="token punctuation">,</span>
		Score<span class="token punctuation">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token function">Reflectstruct</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>reflect<span class="token punctuation">.</span>TypeOf <span class="token operator">-</span><span class="token operator">&gt;</span> student <span class="token keyword">struct</span>
reflect<span class="token punctuation">.</span>ValueOf <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>WeiyiGeek <span class="token number">90</span><span class="token punctuation">}</span> <span class="token keyword">struct</span>

name<span class="token punctuation">:</span>Name index<span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token keyword">type</span><span class="token punctuation">:</span><span class="token builtin">string</span> json tag<span class="token punctuation">:</span> name person tag<span class="token punctuation">:</span>weiyigeek <span class="token punctuation">,</span> Field Anonymous<span class="token punctuation">:</span> <span class="token boolean">false</span>
name<span class="token punctuation">:</span>Score index<span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">type</span><span class="token punctuation">:</span><span class="token builtin">int</span> json tag<span class="token punctuation">:</span> score person tag<span class="token punctuation">:</span>geek <span class="token punctuation">,</span> Field Anonymous<span class="token punctuation">:</span> <span class="token boolean">false</span>

name<span class="token punctuation">:</span>Score index<span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">type</span><span class="token punctuation">:</span><span class="token builtin">int</span> json tag<span class="token punctuation">:</span>score <span class="token punctuation">,</span> Field Anonymous<span class="token punctuation">:</span> <span class="token boolean">false</span>
reflect<span class="token punctuation">.</span>TypeOf NumMethod<span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token number">2</span>
reflect<span class="token punctuation">.</span>ValueOf NumMethod<span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token number">2</span>
method name<span class="token punctuation">:</span>Sleep，method<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">[</span>Sleep<span class="token punctuation">]</span> 好好睡觉，快快长大。
method name<span class="token punctuation">:</span>Study，method<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">[</span>Study<span class="token punctuation">]</span> 好好学习，天天向上。
Reflect Method ptr<span class="token punctuation">:</span><span class="token number">0x4ae080</span>，method Type<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">[</span>Sleep<span class="token punctuation">]</span> 好好睡觉，快快长大。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反射使用总结" tabindex="-1"><a class="header-anchor" href="#反射使用总结" aria-hidden="true">#</a> 反射使用总结</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//# (1) 反射得到传递对象的类型 (类型相关使用)</span>
t <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;参数校验:&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// # 参数校验 \\*main.Config ptr struct</span>
<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> t<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span> <span class="token comment">// # t.Elem() 拿取指针中的元素属性相关信息</span>
field <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// 遍历单个元素字段信息指定 index。</span>
tag <span class="token operator">:=</span> field<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;ini&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 获取单个元素字段中 ini tag 属性值</span>
<span class="token punctuation">}</span>

<span class="token comment">//# (2) 反射得到传递对象的值 (值相关使用)</span>
v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
sValue <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">FieldByName</span><span class="token punctuation">(</span>structName<span class="token punctuation">)</span> <span class="token comment">// 此处反射得到嵌套结构体指定字段名称值信息</span>
sType <span class="token operator">:=</span> sValue<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 此处反射得到嵌套结构体类型信息</span>
<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> sValue<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span> <span class="token comment">// 字段名称值信息也可获取字段数量，同上面一致</span>
field <span class="token operator">:=</span> sType<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// 反射类型信息中存储了嵌套结构体中的 Tag 信息</span>
fieldType <span class="token operator">=</span> field <span class="token comment">// 反射类型信息中存储了嵌套结构体中的 filed 信息以供后续值类型判断使用}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此 Go 语言中的反射(Reflect)介绍和使用完毕~！</p><h3 id="引出反射" tabindex="-1"><a class="header-anchor" href="#引出反射" aria-hidden="true">#</a> 引出反射</h3><p>我们先来看一段代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/json&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
	Age  <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
	Sex  <span class="token builtin">bool</span>   <span class="token string">\`json:&quot;sex&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>Person<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>  <span class="token number">666</span><span class="token punctuation">,</span>
		Sex<span class="token punctuation">:</span>  <span class="token boolean">false</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上方代码运行结果如下</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">666</span><span class="token punctuation">,</span><span class="token property">&quot;sex&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>好的，现在问题来了，json最终是如何序列化成功并且转换成我们制定的模样呢？</p><p>这就是反射的用途之一，接下来开始说明如何使用它</p><h2 id="reflect" tabindex="-1"><a class="header-anchor" href="#reflect" aria-hidden="true">#</a> Reflect</h2><p>要想在golang中使用反射，就得用到reflect包，<code>import reflect</code></p><p>这个包实现了<strong>运行时反射</strong>，允许程序操作任意类型对象，典型用法是用静态<code>interface{}</code>保存一个值，通过调用<code>TypeOf()</code>获取其动态类型信息</p><p>调用了<code>TypeOf()</code>后，会返回一个<code>Type</code>类型的对象，这个对象包含了这个值的类型信息，包括其名称、类型、字段、方法等</p><p>调用<code>Type</code>对象的<code>ValueOf()</code>返回一个Value类型值，该值代表运行时的数据</p><p><code>Zero</code>接受一个Type类型的参数并返回一个代表该类形<strong>默认值</strong>的Value类型值</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>通过<code>Type</code>可以获取到如下的内容</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Type <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token comment">// Kind返回该接口的具体分类</span>
    <span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Kind
    <span class="token comment">// Name返回该类型在自身包内的类型名，如果是未命名类型会返回&quot;&quot;</span>
    <span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
    <span class="token comment">// PkgPath返回类型的包路径，即明确指定包的import路径，如&quot;encoding/base64&quot;</span>
    <span class="token comment">// 如果类型为内建类型(string, error)或未命名类型(*T, struct{}, []int)，会返回&quot;&quot;</span>
    <span class="token function">PkgPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
    <span class="token comment">// 返回类型的字符串表示。该字符串可能会使用短包名（如用base64代替&quot;encoding/base64&quot;）</span>
    <span class="token comment">// 也不保证每个类型的字符串表示不同。如果要比较两个类型是否相等，请直接用Type类型比较。</span>
    <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
    <span class="token comment">// 返回要保存一个该类型的值需要多少字节；类似unsafe.Sizeof</span>
    <span class="token function">Size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">uintptr</span>
    <span class="token comment">// 返回当从内存中申请一个该类型值时，会对齐的字节数</span>
    <span class="token function">Align</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回当该类型作为结构体的字段时，会对齐的字节数</span>
    <span class="token function">FieldAlign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 如果该类型实现了u代表的接口，会返回真</span>
    <span class="token function">Implements</span><span class="token punctuation">(</span>u Type<span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token comment">// 如果该类型的值可以直接赋值给u代表的类型，返回真</span>
    <span class="token function">AssignableTo</span><span class="token punctuation">(</span>u Type<span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token comment">// 如该类型的值可以转换为u代表的类型，返回真</span>
    <span class="token function">ConvertibleTo</span><span class="token punctuation">(</span>u Type<span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token comment">// 返回该类型的字位数。如果该类型的Kind不是Int、Uint、Float或Complex，会panic</span>
    <span class="token function">Bits</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回array类型的长度，如非数组类型将panic</span>
    <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回该类型的元素类型，如果该类型的Kind不是Array、Chan、Map、Ptr或Slice，会panic</span>
    <span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Type
    <span class="token comment">// 返回map类型的键的类型。如非映射类型将panic</span>
    <span class="token function">Key</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Type
    <span class="token comment">// 返回一个channel类型的方向，如非通道类型将会panic</span>
    <span class="token function">ChanDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span> ChanDir
    <span class="token comment">// 返回struct类型的字段数（匿名字段算作一个字段），如非结构体类型将panic</span>
    <span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回struct类型的第i个字段的类型，如非结构体或者i不在[0, NumField())内将会panic</span>
    <span class="token function">Field</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> StructField
    <span class="token comment">// 返回索引序列指定的嵌套字段的类型，</span>
    <span class="token comment">// 等价于用索引中每个值链式调用本方法，如非结构体将会panic</span>
    <span class="token function">FieldByIndex</span><span class="token punctuation">(</span>index <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> StructField
    <span class="token comment">// 返回该类型名为name的字段（会查找匿名字段及其子字段），</span>
    <span class="token comment">// 布尔值说明是否找到，如非结构体将panic</span>
    <span class="token function">FieldByName</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>StructField<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
    <span class="token comment">// 返回该类型第一个字段名满足函数match的字段，布尔值说明是否找到，如非结构体将会panic</span>
    <span class="token function">FieldByNameFunc</span><span class="token punctuation">(</span>match <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>StructField<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
    <span class="token comment">// 如果函数类型的最后一个输入参数是&quot;...&quot;形式的参数，IsVariadic返回真</span>
    <span class="token comment">// 如果这样，t.In(t.NumIn() - 1)返回参数的隐式的实际类型（声明类型的切片）</span>
    <span class="token comment">// 如非函数类型将panic</span>
    <span class="token function">IsVariadic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token comment">// 返回func类型的参数个数，如果不是函数，将会panic</span>
    <span class="token function">NumIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回func类型的第i个参数的类型，如非函数或者i不在[0, NumIn())内将会panic</span>
    <span class="token function">In</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> Type
    <span class="token comment">// 返回func类型的返回值个数，如果不是函数，将会panic</span>
    <span class="token function">NumOut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回func类型的第i个返回值的类型，如非函数或者i不在[0, NumOut())内将会panic</span>
    <span class="token function">Out</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> Type
    <span class="token comment">// 返回该类型的方法集中方法的数目</span>
    <span class="token comment">// 匿名字段的方法会被计算；主体类型的方法会屏蔽匿名字段的同名方法；</span>
    <span class="token comment">// 匿名字段导致的歧义方法会滤除</span>
    <span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回该类型方法集中的第i个方法，i不在[0, NumMethod())范围内时，将导致panic</span>
    <span class="token comment">// 对非接口类型T或*T，返回值的Type字段和Func字段描述方法的未绑定函数状态</span>
    <span class="token comment">// 对接口类型，返回值的Type字段描述方法的签名，Func字段为nil</span>
    <span class="token function">Method</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span> Method
    <span class="token comment">// 根据方法名返回该类型方法集中的方法，使用一个布尔值说明是否发现该方法</span>
    <span class="token comment">// 对非接口类型T或*T，返回值的Type字段和Func字段描述方法的未绑定函数状态</span>
    <span class="token comment">// 对接口类型，返回值的Type字段描述方法的签名，Func字段为nil</span>
    <span class="token function">MethodByName</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>Method<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
    <span class="token comment">// 内含隐藏或非导出方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="反射的重要函数和概念" tabindex="-1"><a class="header-anchor" href="#反射的重要函数和概念" aria-hidden="true">#</a> 反射的重要函数和概念</h3><p>主要就两个东西</p>`,57),f=n("li",null,[n("code",null,"reflect.TypeOf(变量名)"),s("，获取变量的类型，返回reflect.Type类型")],-1),g=n("code",null,"reflect.ValueOf(变量名)",-1),y=n("code",null,"reflect.Value",-1),h=n("code",null,"reflect.Value",-1),q={href:"https://studygolang.com/pkgdoc",target:"_blank",rel:"noopener noreferrer"},w=n("li",null,[n("strong",null,"重要"),s("：变量、"),n("code",null,"interface{}"),s("、和"),n("code",null,"reflect.Value"),s("是可以相互转换的，这点在实际开发中，会经常使用到，")],-1),T=p(`<p>如何将interface和Value进行相互转换呢？</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">change</span><span class="token punctuation">(</span>obj any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 转换成value</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	<span class="token comment">// 再转换回interface</span>
	a <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 再转换回struct</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要将返回的interface转换成原本的类型，就可以用类型断言<code>a.(String、Object、Int64....)</code>这类的</p><h3 id="反射的基本使用" tabindex="-1"><a class="header-anchor" href="#反射的基本使用" aria-hidden="true">#</a> 反射的基本使用</h3><p>我们先来写一个函数吧</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ReflectTest</span><span class="token punctuation">(</span>obj any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1. 先获取到Reflect.Type对象</span>
	t <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Type:%v\\t&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span>
	<span class="token comment">// 2. 获取到Reflect.Value对象</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Value:%v\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用下它</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
	Age  <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
	Sex  <span class="token builtin">bool</span>   <span class="token string">\`json:&quot;sex&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">,</span> sex <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> name<span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>  age<span class="token punctuation">,</span>
		Sex<span class="token punctuation">:</span>  sex<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">1</span>
	p <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
	<span class="token function">ReflectTest</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
	<span class="token function">ReflectTest</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
	<span class="token keyword">var</span> num2 <span class="token operator">=</span> <span class="token number">6</span> <span class="token operator">+</span> num
	<span class="token function">ReflectTest</span><span class="token punctuation">(</span>num2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReflectTest</span><span class="token punctuation">(</span>obj any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1. 先获取到Reflect.Type对象</span>
	t <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Type:%v\\t&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span>
	<span class="token comment">// 2. 获取到Reflect.Value对象</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Value:%v\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果如下，注意，如果说想要获取反射后的对象类型，例如<code>t</code>，则打印的时候可以通过<code>%T</code>来实现，当然，TypeOf返回的对象都是<code>*reflect.rtype</code>这个类型</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Type:int	Value:1
Type:*main.Person	Value:&amp;{张三 18 true}
Type:int	Value:7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，成功的获取到了值</p><p>那么如何将一个对象转换成Value再转换回来呢？</p><p>其实比较简单，这里我利用了go 1.18的泛型特性，更方便的转换成想要的内容</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> Change<span class="token punctuation">[</span>T any<span class="token punctuation">]</span><span class="token punctuation">(</span>obj T<span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	a <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 断言，转换成需要的类型，也可以填写int之类的东西</span>
	<span class="token keyword">return</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关于类型断言" tabindex="-1"><a class="header-anchor" href="#关于类型断言" aria-hidden="true">#</a> 关于类型断言</h3><p>其实这个玩意返回两个值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ReflectTest</span><span class="token punctuation">(</span>obj any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1. 先获取到Reflect.Type对象</span>
	t <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Type:%T\\t&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span>
	<span class="token comment">// 2. 获取到Reflect.Value对象</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Value:%v\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>

	<span class="token comment">// 转换成interface</span>
	i <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	s<span class="token punctuation">,</span>ok <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然 也可以用Switch</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ReflectTest</span><span class="token punctuation">(</span>obj any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1. 先获取到Reflect.Type对象</span>
	t <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Type:%T\\t&quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span>
	<span class="token comment">// 2. 获取到Reflect.Value对象</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Value:%v\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>

	<span class="token comment">// 转换成interface</span>
	i <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	s<span class="token punctuation">,</span> ok <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 也可以用switch</span>
	<span class="token keyword">switch</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token builtin">string</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;string&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;int&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token builtin">bool</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;bool&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取一个对象对应的常量" tabindex="-1"><a class="header-anchor" href="#获取一个对象对应的常量" aria-hidden="true">#</a> 获取一个对象对应的常量</h3><p>先来一段代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
	Age  <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
	Sex  <span class="token builtin">bool</span>   <span class="token string">\`json:&quot;sex&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">,</span> sex <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> name<span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>  age<span class="token punctuation">,</span>
		Sex<span class="token punctuation">:</span>  sex<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">equalsObject</span><span class="token punctuation">(</span>obj1<span class="token punctuation">,</span> obj2 <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> obj1 <span class="token operator">==</span> obj2 <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
	t1 <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span>
	t2 <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span>
	<span class="token keyword">if</span> t1 <span class="token operator">==</span> t2 <span class="token punctuation">{</span>
		<span class="token keyword">return</span> reflect<span class="token punctuation">.</span><span class="token function">DeepEqual</span><span class="token punctuation">(</span>obj1<span class="token punctuation">,</span> obj2<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span>obj any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	k <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	k2 <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\t%v\\t%v\\n&quot;</span><span class="token punctuation">,</span> obj<span class="token punctuation">,</span> k<span class="token punctuation">,</span> k2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int	int	int
*main.Person	ptr	ptr
main.Person	struct	struct
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们自定义的Person由于引用和直接使用的区别，返回了两种不同的类型，一种直接使用返回的就是构造体，另外一种则是ptr</p><p>那么通过Kind能够获取哪些值呢？</p><p>在官方文档中，可以看到如下内容</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Kind <span class="token builtin">uint</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>是一个unit格式，具体的值是一个常量类型（const 不可变类型）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
    Invalid Kind <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">// iota就是相当于这个开始是0，后续自增</span>
    Bool
    Int
    Int8
    Int16
    Int32
    Int64
    Uint
    Uint8
    Uint16
    Uint32
    Uint64
    Uintptr
    Float32
    Float64
    Complex64
    Complex128
    Array
    Chan
    Func
    Interface
    Map
    Ptr
    Slice
    String
    Struct
    UnsafePointer
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过反射获取对象的值" tabindex="-1"><a class="header-anchor" href="#通过反射获取对象的值" aria-hidden="true">#</a> 通过反射获取对象的值</h3><p>之前我们是通过转换成interface再断言获取，但是如果确定了是某些类型的值的话，则可以这样操作</p><p>例如确定了传入的对象一定是某种int类型，则可以这样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">test</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span>obj any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	i <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上方的代码可以被正常的运行，但是如果你传入了一个string或者其他类型，则会抛出<code>painc</code>异常</p><p>同理，可以获取引用对象的值，只需要</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	num <span class="token operator">:=</span><span class="token number">3</span>
	<span class="token function">test</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>num<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span>obj any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	i <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反射修改对象的值" tabindex="-1"><a class="header-anchor" href="#反射修改对象的值" aria-hidden="true">#</a> 反射修改对象的值</h3><p>比较简单，但是注意，除非你对自己非常有自信，<strong>否则不要修改非引用类型的值</strong>，直接修改非引用类型的值百分之一万会报错的</p><p>核心就是<code>Elem</code>，这个可以获取引用类型的对象</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	str <span class="token operator">:=</span> <span class="token string">&quot;111&quot;</span>
	<span class="token comment">// 直接修改引用类型的值</span>
	reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>str<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetString</span><span class="token punctuation">(</span><span class="token string">&quot;222&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>

	num <span class="token operator">:=</span> <span class="token number">1</span>
	<span class="token function">test</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>num<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
	<span class="token keyword">if</span> v<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> reflect<span class="token punctuation">.</span>Ptr <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;RVal Kind=%v\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token comment">// Switch type</span>
		<span class="token keyword">switch</span> v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> reflect<span class="token punctuation">.</span>Int<span class="token punctuation">:</span>
			v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetInt</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
		<span class="token keyword">case</span> reflect<span class="token punctuation">.</span>String<span class="token punctuation">:</span>
			v<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetString</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">default</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span>
	<span class="token comment">// else do Nothing</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>222
RVal Kind=int
100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43);function x(V,P){const a=c("ExternalLinkIcon");return o(),i("div",null,[u,n("div",d,[k,n("p",null,[s("在反射中关于类型(reflect.TypeOf)还划分为两种：类型（Type）和种类（Kind），即我们常说的 reflect.TypeOf 返回的 t 对象如 "),n("a",r,[s("t.Name"),t(a)]),s("()、 t.Kind()方法获取的信息。")]),n("p",null,[s("在 Go 语言的反射中像数组、切片、Map、指针等类型的变量，"),n("a",v,[s("它们的.Name"),t(a)]),s("()都是返回空。")]),m]),b,n("ol",null,[f,n("li",null,[g,s("，获取变量的值，返回"),y,s("，这是一个结构体类型，通过"),h,s("可以获取到变量的很多信息，详情可以看文档"),n("a",q,[s("https://studygolang.com/pkgdoc"),t(a)])]),w]),T])}const S=e(l,[["render",x],["__file","04-反射.html.vue"]]);export{S as default};
