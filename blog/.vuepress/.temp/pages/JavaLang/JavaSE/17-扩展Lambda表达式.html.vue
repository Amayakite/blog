<template><h2 id="简要信息" tabindex="-1"><a class="header-anchor" href="#简要信息" aria-hidden="true">#</a> 简要信息</h2>
<ul>
<li>
<p>λ（alt+42699）希腊字母表中的第十一位字符，英语名称为Lambda</p>
</li>
<li>
<p>支持的版本：<code>JDK8，8+</code>，是由JDK8开始引入的，使用它设计的代码会更加简洁，通过Lambda表达式，可以替代我们以前经常写的匿名内部类来实现接口，Lambda表达式的本质是一个函数</p>
</li>
<li>
<p>用途:</p>
<ul>
<li>避免匿名内部类定义过多</li>
<li>其实质属于函数式编程的概念</li>
</ul>
</li>
<li>
<p>为什么要使用Lambda表达式？</p>
<ul>
<li>避免匿名内部类定义过多</li>
<li>可以让代码看起来更简洁</li>
<li>去掉了一堆没有意义的代码，只留下核心的逻辑</li>
</ul>
</li>
<li>
<p>也许刚刚用它的时候，不但不觉得简介，反而觉得更乱了，看不懂，那是因为还没习惯，习惯就好（就和其他语言中的匿名函数，匿名方法一样，刚开始用的时候不习惯，用习惯了习惯用）</p>
</li>
<li>
<p>在正式开始之前，得先了解一些东西</p>
<ul>
<li><code>Function Interface</code>（函数式接口）是lambda表达式的关键所在</li>
<li>函数式接口的定义：
<ul>
<li>任何接口，如果<strong>只包含唯一一个抽象方法</strong>，那么他就是一个函数式接口</li>
<li>对于函数式接口，可以通过lambda表达式来创建该接口的对象</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="表达式的使用" tabindex="-1"><a class="header-anchor" href="#表达式的使用" aria-hidden="true">#</a> 表达式的使用</h2>
<p>可能看完上面的会有点懵，但是它使用起来是非常简单的，而且在某些情况下能够节约一大堆敲代码的时间</p>
<p>接下来，使用传统的方法，来实现一个add方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lambda_</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Lambda01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Cal</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">interface</span> <span class="token class-name">Cal</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>可以看到，当我们想在方法中去创建一个匿名内部类，实现一些方法，还是需要点代码的，虽然在IDEA的加持下，并不需要多长时间，但是这个流程可以通过lambda更加简化:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lambda_</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Lambda01</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Cal</span> c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span><span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">interface</span> <span class="token class-name">Cal</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//效果一样，但是更加简化</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>是不是感觉轻松了不少...如果之前你接触过go/python/JavaScript这类语言，可能立马就会发现，唉这玩意好手熟，name接下来说说他的语法：</p>
<p><code>(int a, int b) -&gt; {return a + b;};</code></p>
<p>这个本质是还一个函数/方法，一般的函数类似如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>有<strong>返回值，方法名，参数列表，方法体</strong></p>
<p>Lambda表达式函数的话，<strong>只有参数列表、方法体</strong>：</p>
<p><code>(参数列表)-&gt;{方法体}</code></p>
<p>说明:</p>
<ul>
<li><code>()</code>用来描述参数列表</li>
<li><code>{}</code>用来描述方法体</li>
<li><code>-&gt;</code>Lambda运算符，可以叫做箭头符号，或者叫 <em>goes to</em></li>
</ul>
<h2 id="lambda语法细讲" tabindex="-1"><a class="header-anchor" href="#lambda语法细讲" aria-hidden="true">#</a> Lambda语法细讲</h2>
<p>Lambda函数式中语法的可能性并不多（只有六种）</p>
<ul>
<li>
<p>无参数无返回值<code>void test(){}</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">If1</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
    * 无参数无返回值
    */</span>
    <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
main<span class="token punctuation">{</span>
    <span class="token class-name">If1</span> if1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    if1<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//其他的同理 但要注意的是，Lambda实现识别接口中只能有一个方法...</span>
<span class="token comment">//如果我在If1中多定义了一个方法</span>
<span class="token keyword">interface</span> <span class="token class-name">If1</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> <span class="token function">orun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 那就会报错...所以说这玩意目前而言是有些鸡肋的</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div></li>
<li>
<p>无参数有返回值<code>test(){return XXX}</code></p>
</li>
<li>
<p>单个参数无返回值<code>void test(T t){ }</code></p>
</li>
<li>
<p>多个参数无返回值<code>void test(T t,E e...){}</code></p>
</li>
<li>
<p>单个参数有返回值<code>void test(T t){ return xxx}</code></p>
</li>
<li>
<p>多个参数有返回值<code>void test(T t,E e...){ return xxx}</code></p>
</li>
</ul>
<h2 id="进一步精简语法" tabindex="-1"><a class="header-anchor" href="#进一步精简语法" aria-hidden="true">#</a> 进一步精简语法</h2>
<p>以下情况， 可以再进一步的精简语法</p>
<ol>
<li>
<p>参数类型可以忽略</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">If1</span><span class="token punctuation">{</span>
 <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//把int省略了</span>
    <span class="token class-name">If1</span> <span class="token keyword">if</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li>
<li>
<p>如果<strong>只有一个</strong>参数，<code>()</code>可以省略</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">If1</span> <span class="token keyword">if</span> <span class="token operator">=</span> a <span class="token operator">-></span><span class="token punctuation">{</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>如果方法只有一条语句,<code>{}</code>可以省略</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">If1</span> <span class="token keyword">if</span> <span class="token operator">=</span> a <span class="token operator">-></span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>如果方法中的一条语句是<code>return</code>返回语句，那么<strong>省略大括号的同时</strong><code>return</code>语句也<strong>也要</strong>省略</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">If2</span><span class="token punctuation">{</span>
 <span class="token keyword">int</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token keyword">int</span> number<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">If2</span> <span class="token keyword">if</span> <span class="token operator">=</span> a<span class="token operator">-></span>a<span class="token operator">*</span><span class="token number">5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
</ol>
<h2 id="方法引用" tabindex="-1"><a class="header-anchor" href="#方法引用" aria-hidden="true">#</a> 方法引用</h2>
<p>有时候多个lambda表达式实现函数是一样的，我们可以封装成通用方法，以便于维护</p>
<p>这时候可以用方法引用实现</p>
<p>语法是：<code>对象::方法</code></p>
<p>假如是<code>static</code>方法，可以直接<code>类名::方法</code></p>
<p>可能看着会有点懵逼，接下来用实例演示下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lambda_</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Lambda02</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token comment">//        比方说有一个业务就是实现a-2</span>
        <span class="token class-name">If1</span> if1 <span class="token operator">=</span> a <span class="token operator">-></span> a <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>if1<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//8</span>

<span class="token comment">//        假设又有个地方又整了个这个出来，并且他们两的业务逻辑一模一样：</span>
<span class="token comment">//        就可以通过方法引用的方式来简化</span>
<span class="token comment">//        If1 if2 =a->a-2;</span>
        <span class="token class-name">If1</span> if2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Lambda02</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">::</span><span class="token function">test</span><span class="token punctuation">;</span> <span class="token comment">//简写，可以拆分为：</span>
        <span class="token class-name">Lambda02</span> lambda02 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Lambda02</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">If1</span> if3 <span class="token operator">=</span> lambda02<span class="token operator">::</span><span class="token function">test</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>if2<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token number">555</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//553</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>if3<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token number">666</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//664</span>

<span class="token comment">//        如果是静态的，实例也不用new了:</span>
        <span class="token class-name">If1</span> if4 <span class="token operator">=</span> <span class="token class-name">Lambda02</span><span class="token operator">::</span><span class="token class-name">NumberTT</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>if4<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token number">66</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//64</span>

    <span class="token punctuation">}</span>

    <span class="token comment">//    定义函数</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//    静态</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token class-name">NumberTT</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">interface</span> <span class="token class-name">If1</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 单个参数有返回值
         *
         * <span class="token keyword">@param</span> <span class="token parameter">a</span> number
         * <span class="token keyword">@return</span> number
         */</span>
        <span class="token keyword">int</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h2 id="构造方法引用" tabindex="-1"><a class="header-anchor" href="#构造方法引用" aria-hidden="true">#</a> 构造方法引用</h2>
<p>如果函数式的接口刚好可以通过调用一个类的构造方法来实现，那么就可以使用构造方法引用</p>
<p>语法：<code>类名::new</code></p>
<p>实例：</p>
<p>其实非常简单...</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lambda_</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Lambda03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        传统的方法来创建：</span>
        <span class="token class-name">DogService1</span> dog <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>dog<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Dog{name='null', age=0}</span>

<span class="token comment">//        使用lambda构造方法引用：</span>
        <span class="token class-name">DogService1</span> dog1 <span class="token operator">=</span> <span class="token class-name">Dog</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>dog1<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Dog{name='null', age=0}</span>
<span class="token comment">//        有参：</span>
        <span class="token class-name">DogService2</span> dog2 <span class="token operator">=</span> <span class="token class-name">Dog</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>dog2<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">,</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Dog{name='张三', age=111}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//定义两个接口</span>
<span class="token keyword">interface</span> <span class="token class-name">DogService1</span> <span class="token punctuation">{</span>
    <span class="token class-name">Dog</span> <span class="token function">getDog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">DogService2</span> <span class="token punctuation">{</span>
    <span class="token class-name">Dog</span> <span class="token function">getDog</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"有参构造方法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"无参构造方法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Dog{"</span> <span class="token operator">+</span>
                <span class="token string">"name='"</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">'\''</span> <span class="token operator">+</span>
                <span class="token string">", age="</span> <span class="token operator">+</span> age <span class="token operator">+</span>
                <span class="token char">'}'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><h2 id="lambda的实际应用" tabindex="-1"><a class="header-anchor" href="#lambda的实际应用" aria-hidden="true">#</a> Lambda的实际应用</h2>
<p>比如说：要在一个<code>ArrayList</code>中添加一大堆对象...然后排个序</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lambda_</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">com<span class="token punctuation">.</span>sun<span class="token punctuation">.</span>org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>bcel<span class="token punctuation">.</span>internal<span class="token punctuation">.</span>generic<span class="token punctuation">.</span></span>NEW<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Comparator</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Lambda03</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dog</span><span class="token punctuation">></span></span> dogs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DogService2</span> getDog <span class="token operator">=</span> <span class="token class-name">Dog</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">;</span>
        dogs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>getDog<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token string">"小兰"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dogs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>getDog<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token string">"小黄"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dogs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>getDog<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token string">"小白"</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dogs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>getDog<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token string">"小绿"</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dogs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>getDog<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token string">"小紫"</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dogs<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>getDog<span class="token punctuation">.</span><span class="token function">getDog</span><span class="token punctuation">(</span><span class="token string">"小黑"</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        再来排个序:  原本的排序需要这样：</span>
<span class="token comment">//        dogs.sort(new Comparator&lt;Dog>() {</span>
<span class="token comment">//            @Override</span>
<span class="token comment">//            public int compare(Dog o1, Dog o2) {</span>
<span class="token comment">//                 return o2.getAge()- o1.getAge();</span>
<span class="token comment">//            }</span>
<span class="token comment">//        });</span>
        dogs<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span>o1<span class="token punctuation">,</span> o2<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> o2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> o1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        再度简化就是：</span>
        dogs<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span>o1<span class="token punctuation">,</span> o2<span class="token punctuation">)</span> <span class="token operator">-></span> o2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> o1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>dogs<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        然后还可以通过lambda来方便遍历：</span>
        dogs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//定义两个接口</span>
<span class="token keyword">interface</span> <span class="token class-name">DogService1</span> <span class="token punctuation">{</span>
    <span class="token class-name">Dog</span> <span class="token function">getDog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">DogService2</span> <span class="token punctuation">{</span>
    <span class="token class-name">Dog</span> <span class="token function">getDog</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"有参构造方法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"无参构造方法"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Dog{"</span> <span class="token operator">+</span>
                <span class="token string">"name='"</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">'\''</span> <span class="token operator">+</span>
                <span class="token string">", age="</span> <span class="token operator">+</span> age <span class="token operator">+</span>
                <span class="token char">'}'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br></div></div><h2 id="functionallinterface注解" tabindex="-1"><a class="header-anchor" href="#functionallinterface注解" aria-hidden="true">#</a> @FunctionallInterface注解</h2>
<p>首先打开<code>Comparator</code>源码，可以看到里面有个这玩意：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这个注解是函数式注解，所谓的函数式接口，当然首先是一个接口，其次这个接口里面<strong>只能有一个</strong>抽象方法</p>
<p>这种接口类型也称为<code>SAM</code>接口：<code>Single Abstract Method interface</code></p>
<p>特点：</p>
<ul>
<li>接口只允许有一个抽象方法</li>
<li>运行定义静态方法</li>
<li>运行定义默认方法</li>
<li>允许<code>java.lang.Object</code>中的<code>public</code>方法</li>
<li>改注解不是必须的，如果一个接口符合<strong>函数式接口</strong>的话，加不加抖无所谓，加上这玩意是让编译器更好的检查（就跟<code>@Override</code>和<code>@SuppressWarnings({&quot;all&quot;})</code>）一样，加不加抖无所谓，但是如果不符合函数式接口，并且加上了<code>@FunctionallInterface</code>接口的话，编译器就会报错</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">interface</span> <span class="token class-name">DogService2</span> <span class="token punctuation">{</span>
    <span class="token comment">//    一个抽象的方法</span>
    <span class="token class-name">Dog</span> <span class="token function">getDog</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//    n个Object类提供的方法</span>

    <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o1<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//    默认方法</span>
    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">defaultMetod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//DO Nothing</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//    静态方法:</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token class-name">StaticMetod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"hello world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//这样编译器是可以正常通过的，且lambda表达式也可以正常调用</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="java内置函数式接口" tabindex="-1"><a class="header-anchor" href="#java内置函数式接口" aria-hidden="true">#</a> Java内置函数式接口</h3>
<p>看看<a href="https://blog.csdn.net/m2606707610/article/details/83754507" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a>，用的也不多，基本上都是自己实现</p>
</template>
