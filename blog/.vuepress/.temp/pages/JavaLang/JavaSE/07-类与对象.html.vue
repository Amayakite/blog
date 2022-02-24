<template><blockquote>
<p>在正式开始前，先看一个养猫的问题</p>
<p>张老太养了两只猫，一只猫叫小白，今年1岁，白色，一只猫叫小花，今年10岁，黑色。请运用现有技术编写一个程序，显示该猫的名字，年龄，颜色，如果用户输入的小猫名字错误则显示张老太没有这只猫</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> _010Object01<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> xiaoHua <span class="token operator">=</span><span class="token string">"小花"</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> xiaoHuaAge <span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span>  xiaoHuaColor <span class="token operator">=</span><span class="token string">"black"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> xiaoBai <span class="token operator">=</span><span class="token string">"小白"</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> xiaoBaiAge <span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span>  xiaoBaiColor <span class="token operator">=</span><span class="token string">"white"</span><span class="token punctuation">;</span>
        <span class="token class-name">Scanner</span> userInput <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入张老太养的猫的名字:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> userInputCat<span class="token operator">=</span>userInput<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>userInputCat<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"flowers"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>xiaoHua<span class="token operator">+</span>xiaoHuaAge<span class="token operator">+</span>xiaoHuaColor<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>userInputCat<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"white"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>xiaoBai<span class="token operator">+</span>xiaoBaiAge<span class="token operator">+</span>xiaoBaiColor<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"张老太没有"</span><span class="token operator">+</span>userInputCat<span class="token operator">+</span><span class="token string">"这只猫!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        userInput<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>...可以看到，完成是能完成，就是非常痛苦，假设说张老太不止有这两只猫，而是有十只/二十只......</p>
<p>这时候就要引用到类了</p>
<h2 id="类-面对对象" tabindex="-1"><a class="header-anchor" href="#类-面对对象" aria-hidden="true">#</a> 类-面对对象</h2>
<blockquote>
<p>这个玩意其实有点抽象，在Java中有句话：万物皆对象，没有对象就new一个</p>
<p>所以实际上你写的所有.java文件都是一个对象</p>
<p>那么类是什么？比如人 有手有脚会走路会吃饭，猫，有四条腿，狗会汪汪叫....这些可以理解为现实的对象</p>
<p>那么Java中的对象又该怎么创造？</p>
<p>这就要用到类了，它在java中就像是万物的载体一样，先简单使用对象来完成一下上方的案例：</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> _010Object01<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建一只猫</span>
        <span class="token class-name">Cat</span> whiteCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"小白"</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"白色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> huaCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"小花"</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">"黑色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第一只猫的属性"</span><span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>name<span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>age<span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第二只猫的属性"</span><span class="token operator">+</span>huaCat<span class="token punctuation">.</span>name<span class="token operator">+</span>huaCat<span class="token punctuation">.</span>age<span class="token operator">+</span>huaCat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>whiteCat<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>huaCat<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Cat</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
    <span class="token keyword">public</span>  <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token keyword">int</span> age <span class="token punctuation">,</span><span class="token class-name">String</span> color<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span>name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">=</span>color<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">=</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Name:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">+</span><span class="token string">";Color:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">+</span><span class="token string">";Age:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">+</span><span class="token string">";"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>可以看出，我非常简单的就获取到了猫的属性，而非一个一个的去创建变量..</p>
<p>简而言之，Java中的对象和其他语言中的基本没啥不同，只是流程稍许有些变化，对象始终式应用类型（比C语言的指针乱串倒是要好不少）</p>
<h3 id="属性-成员变量" tabindex="-1"><a class="header-anchor" href="#属性-成员变量" aria-hidden="true">#</a> 属性/成员变量</h3>
<ol>
<li>从概念的叫法上看，成员变量=属性=field（字段）（即： 成员变量是用来表示属性的）
例如：Cat(name,age,color)</li>
<li>属性式类的一个组成部分，一般是基本数据类型，也可以是引用类型（对象，数组），比如Cat中的int age 就是属性</li>
<li>属性的定义语法如同变量：实例： 访问修饰符 属性类型 属性名
有三种访问修饰符： public(默认)/proctected/private</li>
<li>属性（非引用类型的）如果不赋值，有默认值，具体值和基本类型的默认值一致；</li>
</ol>
<p><img src="/images/JavaSE/07-类与对象/image-20211027171842695.png" alt="image-20211027171842695" loading="lazy"></p>
<p><img src="/images/JavaSE/07-类与对象/image-20211027171809834.png" alt="image-20211027171809834" loading="lazy"></p>
<h3 id="成员的方法" tabindex="-1"><a class="header-anchor" href="#成员的方法" aria-hidden="true">#</a> 成员的方法</h3>
<p>我一般喜欢管这个叫函数..</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> _010Object01<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建一只猫</span>
        <span class="token class-name">Cat</span> whiteCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"小白"</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"白色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> huaCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"小花"</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">"黑色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> testCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第一只猫的属性"</span><span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>name<span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>age<span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第二只猫的属性"</span><span class="token operator">+</span>huaCat<span class="token punctuation">.</span>name<span class="token operator">+</span>huaCat<span class="token punctuation">.</span>age<span class="token operator">+</span>huaCat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>whiteCat<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>huaCat<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token namespace">whiteCat<span class="token punctuation">.</span></span>PrintMe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat<span class="token punctuation">.</span>PrintMe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>whiteCat<span class="token punctuation">.</span><span class="token function">addNumber</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Cat</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
    <span class="token keyword">public</span>  <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token keyword">int</span> age <span class="token punctuation">,</span><span class="token class-name">String</span> color<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span>name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">=</span>color<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">=</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Name:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">+</span><span class="token string">";Color:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">+</span><span class="token string">";Age:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">+</span><span class="token string">";"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token class-name">PrintMe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span>  <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token class-name">PrintMeSt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello world Static"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">addNumber</span><span class="token punctuation">(</span><span class="token keyword">int</span> a <span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p>分为静态的（Static）可以直接被调用， 如果不是静态的就需要new，跟其他语言差不多</p>
<p>返回值Void可以看成没有返回值 也可以返回任意类型的值，如String number Cat ...</p>
<h4 id="克隆对象" tabindex="-1"><a class="header-anchor" href="#克隆对象" aria-hidden="true">#</a> 克隆对象</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> _010Object01<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建一只猫</span>
        <span class="token class-name">Cat</span> whiteCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"小白"</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"白色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> cat2 <span class="token operator">=</span><span class="token class-name"><span class="token namespace">whiteCat<span class="token punctuation">.</span></span>CopyCat</span><span class="token punctuation">(</span>whiteCat<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cat2<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>whiteCat<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//false</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cat2 <span class="token keyword">instanceof</span> <span class="token class-name">Cat</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>
        whiteCat<span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">"hello"</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>whiteCat<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>cat2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Name:hello;Color:白色;Age:1;</span>
        <span class="token comment">// Name:小白;Color:白色;Age:1;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Cat</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
    <span class="token keyword">public</span>  <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token keyword">int</span> age <span class="token punctuation">,</span><span class="token class-name">String</span> color<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span>name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">=</span>color<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">=</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Name:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">+</span><span class="token string">";Color:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">+</span><span class="token string">";Age:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">+</span><span class="token string">";"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">cat</span> 克隆对象
     * <span class="token keyword">@return</span> CatObject
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span> <span class="token class-name">CopyCat</span><span class="token punctuation">(</span><span class="token class-name">Cat</span> cat<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span>cat<span class="token punctuation">.</span>name<span class="token punctuation">,</span>cat<span class="token punctuation">.</span>age<span class="token punctuation">,</span>cat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h3 id="递归" tabindex="-1"><a class="header-anchor" href="#递归" aria-hidden="true">#</a> 递归</h3>
<p>这玩意本质上就是自己调用自己
<a href="https://www.bilibili.com/video/BV1fh411y7R8?p=215" target="_blank" rel="noopener noreferrer">韩老师视频<ExternalLinkIcon/></a></p>
<h3 id="方法重载" tabindex="-1"><a class="header-anchor" href="#方法重载" aria-hidden="true">#</a> 方法重载</h3>
<p>顾名思义，重载一个方法， 让一个方法有多元性：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Test</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">geadd</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span>  a<span class="token operator">+</span>b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">geadd</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">double</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span><span class="token punctuation">(</span>b<span class="token operator">+</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>细节：</p>
<ul>
<li>方法名必须相同</li>
<li>参数列表必须不同(参数类型或者个数不同，至少有一样不同，参数名无要求)</li>
<li>返回类型：无要求</li>
</ul>
<h3 id="可变参数" tabindex="-1"><a class="header-anchor" href="#可变参数" aria-hidden="true">#</a> 可变参数</h3>
<p>Java中运行将同一个类中多个同名功能但是餐宿个数不同的方法封装成同一个方法</p>
<p>基本语法：<code>访问修饰符 返回类型 方法名(数据类型...形参名){}</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VarParamenter</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HspMethod</span> hspMethod <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HspMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Sum:"</span><span class="token operator">+</span>hspMethod<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">61</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">456</span><span class="token punctuation">,</span><span class="token number">459</span><span class="token punctuation">,</span><span class="token number">456</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">HspMethod</span><span class="token punctuation">{</span>
    <span class="token comment">// 实现两个数 三个数 四个数的和</span>
    <span class="token comment">// 虽然可以用方法重载，但是比较难受，没意义</span>
    <span class="token comment">// 这时候就要用到可变参数：多个同名同功能 但是 参数个数不同 的方法，封装成一个方法</span>
    <span class="token comment">// int... 表示接收的是可变参数，类型是int，即可以接收多个int(0~无限);</span>
    <span class="token comment">// 使用可变参数时，可以当作数组来使用nums</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>nums<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"接收的参数个数是："</span><span class="token operator">+</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sum <span class="token operator">+=</span>i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>注意事项</p>
<ul>
<li>
<p>可变参数的实参可以为0个或者任意多个</p>
</li>
<li>
<p>可变参数的实参可以为数组</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VarParamenter</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">61</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">456</span><span class="token punctuation">,</span><span class="token number">459</span><span class="token punctuation">,</span><span class="token number">456</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token class-name">HspMethod</span> hspMethod <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HspMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//放数组</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Sum:"</span><span class="token operator">+</span>hspMethod<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li>
<li>
<p>可变参数的本质是数组</p>
</li>
<li>
<p><strong>可变参数</strong>可以和<strong>普通类型</strong>的参数<strong>一起</strong>放在形参列表，但是必须保证<strong>可变参数在最后</strong></p>
</li>
</ul>
<h3 id="作用域" tabindex="-1"><a class="header-anchor" href="#作用域" aria-hidden="true">#</a> 作用域</h3>
<blockquote>
<p>这玩意通俗一点讲就是变量啊，方法啊的适用范围</p>
</blockquote>
<p>根据我个人的经验之谈，可以理解为这样：</p>
<ul>
<li>
<p>首先，一个类内的声明的变量只能在这个类的实例中使用（如果是static变量也是要靠这个类来调用）</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">soutA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">soutB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">soutB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"this is  B Function"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//上方这样执行的结果是：A中找不到soutB，，因为A类中根本没有soutB这个方法，两个类之间的数据本质上是不互通的，如果想在soutA中调用B：</span>
<span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">soutA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">B</span> myB <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myB<span class="token punctuation">.</span><span class="token function">soutB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 就要这样。。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div></li>
<li>
<p>类内的方法同上</p>
</li>
<li>
<p>类内的方法内定义的变量，类，方法只属于这个方法，无法在外部调用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">C</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> a <span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//上面这例中，main方法调用A可以直接获得10（因为a和main在同一个作用域中(C类)，且两者的关系为 a>main>）</span>
<span class="token comment">// 但是调用b无法获得，因为getnumBer和main的关系为getnumber==main 即为同级，getNumber的b作用域只属于getNumber()这个方法， 所以在main中调用它无异于自寻死路，程序直接抛出异常</span>
<span class="token comment">//解决方法：动动脑子解决。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></li>
<li>
<p>这玩意本质上就是一个靠经验来了解的玩意，刚开始接触肯定是有点懵懵懂懂的，但是实际上使用后就知道是为啥了...</p>
</li>
</ul>
<h3 id="构造器" tabindex="-1"><a class="header-anchor" href="#构造器" aria-hidden="true">#</a> 构造器</h3>
<p>不知道你有没有注意到本章我写第一个Cat的Demo时调用的方法，停下不用滚上去。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> _010Object01<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建一只猫</span>
        <span class="token class-name">Cat</span> whiteCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"小白"</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"白色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> huaCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"小花"</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">"黑色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第一只猫的属性"</span><span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>name<span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>age<span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第二只猫的属性"</span><span class="token operator">+</span>huaCat<span class="token punctuation">.</span>name<span class="token operator">+</span>huaCat<span class="token punctuation">.</span>age<span class="token operator">+</span>huaCat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>whiteCat<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>huaCat<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Cat</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
    <span class="token keyword">public</span>  <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token keyword">int</span> age <span class="token punctuation">,</span><span class="token class-name">String</span> color<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span>name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">=</span>color<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">=</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Name:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">+</span><span class="token string">";Color:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">+</span><span class="token string">";Age:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">+</span><span class="token string">";"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>有没有发现里面有个没有返回类型的方法，普通方法往往应该是返回个值，或者void，但是我那个<code>public Cat(...)</code>却不用</p>
<p>并且我调用new cat的时候是直接<code>new Cat(&quot;小白&quot;,1,&quot;白色&quot;)</code> 这又是啥</p>
<p>它就是构造器，如果说我没有用它的话，正常情况下应该是这样的：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> _010Object01<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建一只猫</span>
        <span class="token class-name">Cat</span> whiteCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        whiteCat<span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">"xxx"</span><span class="token punctuation">;</span>
        whiteCat<span class="token punctuation">.</span>age<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
        whiteCat<span class="token punctuation">.</span>color<span class="token operator">=</span><span class="token string">"white"</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> huaCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
            
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第一只猫的属性"</span><span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>name<span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>age<span class="token operator">+</span>whiteCat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"第二只猫的属性"</span><span class="token operator">+</span>huaCat<span class="token punctuation">.</span>name<span class="token operator">+</span>huaCat<span class="token punctuation">.</span>age<span class="token operator">+</span>huaCat<span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>whiteCat<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>huaCat<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Cat</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Name:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">+</span><span class="token string">";Color:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">+</span><span class="token string">";Age:"</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">+</span><span class="token string">";"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>是不是感觉顿时清晰了不少，构造器就是在初始化（实例化）对象时给对象构造初始值的方法，它不能定义返回值，它的名称必须和class名相同，它可以重载：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> _010Object01<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建一只猫</span>
        <span class="token class-name">Cat</span> whiteCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"小白"</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"白色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> c1 <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> c2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> c3 <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Cat</span> c4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span> <span class="token punctuation">(</span><span class="token string">"小兰"</span><span class="token punctuation">,</span>“深海蓝”<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Cat</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
    <span class="token keyword">public</span>  <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token keyword">int</span> age <span class="token punctuation">,</span><span class="token class-name">String</span> color<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span>name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token operator">=</span>color<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">=</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//无值构造</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//这个之后会说明</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span>name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">=</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token class-name">String</span> color<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span>name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">=</span>age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><blockquote>
<p>简而言之</p>
</blockquote>
<ul>
<li>基本语法：
<code>修饰符 方法名(形参列表){方法体}</code></li>
<li>构造器的修饰符可以实默认，也可以是public protected private</li>
<li>构造器没有返回值</li>
<li>方法名和类名字必须一样</li>
<li>参数列表和成员方法一样的规则</li>
<li>构造器的调用由系统来自动完成</li>
<li>构造器在别的语言中也有被称为构造函数的（比如Javascript中构造器的声明为class中使用constructor()）</li>
</ul>
<h2 id="this关键字" tabindex="-1"><a class="header-anchor" href="#this关键字" aria-hidden="true">#</a> This关键字</h2>
<blockquote>
<p>这玩意应该涵盖了所有编程语言吧....</p>
</blockquote>
<p>这个没什么好多说的，this顾名思义就是自己，this的作用域为类，比如在类的方法中调用this.age，返回的是本类中public定义的this..不明白的话就去看看<a href="https://www.bilibili.com/video/BV1fh411y7R8?p=246" target="_blank" rel="noopener noreferrer">老韩的视频<ExternalLinkIcon/></a></p>
<h3 id="扩展-练习" tabindex="-1"><a class="header-anchor" href="#扩展-练习" aria-hidden="true">#</a> 扩展：练习</h3>
<ol>
<li>
<p>编写类A01，定义方法max，实现求某个double数组的最大值，并返回</p>
</li>
<li>
<p>编写类A02 定义方法s 实现查找某个字符串数组中的元素查找，并返回索引，如果找不到则返回-1</p>
</li>
<li>
<p>编写类Book，定义方法updatePrice，实现基本更改某本书的价格：具体：如果价格&gt;150，则更改为150，如果价格&gt;100，则更改为100，否则不变</p>
</li>
<li>
<p>编写类A03 实现数组的复制功能CopyArr 输入旧数组返回一个新数组，元素和旧书组一样</p>
</li>
<li>
<p>定义一个圆类Circle，定义属性：半径，提示显示圆周长功能的方法，提供显示圆面积的方法</p>
</li>
<li>
<p>创建一个Cale计算类，在其中定义2个变量表示两个操作数，定义四个方法实现求和，乘，差，商（要求除数为0的话，要提示），并创建两个对象，分别测试</p>
</li>
<li>
<p>设计一个Dog类，有名字，颜色和年龄属性，定义输出方法show()显示其信息，并创建对象，进行测试</p>
</li>
<li>
<p>给定一个Java程序的代码如下图所示，则编译运行后，输出的结果是：____</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span><span class="token number">9</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">count1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        count <span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">prinln</span><span class="token punctuation">(</span><span class="token string">"count1:"</span><span class="token operator">+</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">count2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">prinln</span><span class="token punctuation">(</span><span class="token string">"count2:"</span><span class="token operator">+</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Test</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">count2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">count2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></li>
<li>
<p>定义Music类，里面有音乐名，音乐时常，并有play播放功能和返回本省属性信息的功能方法getInfo();</p>
</li>
<li>
<p>在测试方法中，调用method方法，代码如下，编译正确，试图写出method方法的定义形式，调用语句为<code>System.out.println(method(method(10.0,20.0),100));</code></p>
</li>
<li>
<p>定义一个Employee类，属性有[名字 性别 年龄 职位 薪水] 提供三个构造函数，可以初始化</p>
<ol>
<li>名字 性别 年龄 职位 薪水</li>
<li>名字 性别  年龄</li>
<li>职位 薪水</li>
</ol>
</li>
<li>
<p>将对象作为参数传递给方法</p>
<ol>
<li>定义一个Circle类，包含一个double形的radius属性代表圆的半径，---findArea()返回圆的面积</li>
<li>定义一个类PassObject 在类中定义一个方法printAreas() 该方法的定义如下：
<code>public void  printArears(Circle c,int times)</code></li>
<li>在上方printArears方法中应当输出1到times之间的每个整数半径值，以及对应的面积，
例如，times为5，则输出半径1,2,3,4,5以及对应的圆面积</li>
<li>在main方法中调用printArears方法，调用完毕后输出当前半径值，程序结果如图所示
<img src="/images/JavaSE/07-类与对象/image-20211027231511915.png" alt="image-20211027231511915" loading="lazy"></li>
</ol>
</li>
<li>
<p>扩展：有个人 Tome设计它的成员变量，变量方法，可以电脑猜拳，电脑每次都会随机生成0,1,2</p>
<ol>
<li>0 石头 1 剪刀 2 布</li>
<li>并要可以显示Tom的输赢次数</li>
</ol>
</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Random</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ObjectOverFill</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// A01.max({1.0,2.5,5654.3,1654,53147.1});</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>A02<span class="token punctuation">.</span><span class="token function">searchStr</span><span class="token punctuation">(</span><span class="token string">"amayakite"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">TomeCom</span><span class="token punctuation">.</span><span class="token function">gameStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Circle</span> circle <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">PassObject</span> passObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PassObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    passObject<span class="token punctuation">.</span><span class="token function">printArears</span><span class="token punctuation">(</span>circle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"-=---"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    passObject<span class="token punctuation">.</span><span class="token function">printArears</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编写类A01，定义方法max，实现求某个double数组的最大值，并返回</span>
<span class="token keyword">class</span> A01 <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> maxNumber <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">double</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">></span> maxNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        maxNumber <span class="token operator">=</span> num<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> maxNumber<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编写类A02 定义方法searchStr 实现查找某个字符串数组中的元素查找，并返回索引，如果找不到则返回-1</span>
<span class="token keyword">class</span> A02 <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">searchStr</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// defining a string array</span>
    <span class="token class-name">String</span> message <span class="token operator">=</span> <span class="token string">"Hello world my name is amayakite"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrStr <span class="token operator">=</span> message<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> messageStr <span class="token operator">:</span> arrStr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>messageStr <span class="token operator">==</span> str<span class="token punctuation">)</span>
        <span class="token keyword">return</span> messageStr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">"not found"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编写类Book，定义方法updatePrice，</span>
<span class="token comment">// 实现基本更改某本书的价格：具体：如果价格>150，则更改为150，如果价格>100，则更改为100，否则不变</span>
<span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">int</span> price <span class="token operator">=</span> <span class="token number">999</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>price<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updatePrice</span><span class="token punctuation">(</span><span class="token keyword">int</span> newPrice<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newPrice <span class="token operator">></span> <span class="token number">150</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> <span class="token number">150</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>newPrice <span class="token operator">></span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编写类A03 实现数组的复制功能CopyArr 输入旧数组返回一个新数组，元素和旧书组一样</span>
<span class="token keyword">class</span> A03 <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">copyArr</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> oldArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> newArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>oldArray<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> oldArray<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      newArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> oldArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> newArr<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个圆类Circle，定义属性：半径，提示显示圆周长功能的方法，提供显示圆面积的方法</span>
<span class="token keyword">class</span> <span class="token class-name">Circle1</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">double</span> radius<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token class-name">Circle1</span><span class="token punctuation">(</span><span class="token keyword">double</span> radius<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>radius <span class="token operator">=</span> radius<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getZhou</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span>PI <span class="token operator">*</span> <span class="token punctuation">(</span>radius <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span>PI <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> radius <span class="token operator">^</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建一个Cale计算类，在其中定义2个变量表示两个操作数，</span>
<span class="token comment">// 定义四个方法实现求和，乘，差，商（要求除数为0的话，要提示），并创建两个对象，分别测试</span>
<span class="token keyword">class</span> <span class="token class-name">Calc</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">double</span> num1<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">double</span> num2<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token class-name">Calc</span><span class="token punctuation">(</span><span class="token keyword">double</span> num1<span class="token punctuation">,</span> <span class="token keyword">double</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>num1 <span class="token operator">=</span> num1<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>num2 <span class="token operator">=</span> num2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">subtract</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1 <span class="token operator">-</span> num2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1 <span class="token operator">*</span> num2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">cha</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1 <span class="token operator">%</span> num2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">chu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>num2 <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Error Number to Number2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> num1 <span class="token operator">/</span> num2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 设计一个Dog类，有名字，颜色和年龄属性，定义输出方法show()显示其信息，并创建对象，进行测试</span>
<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Dog Name: %s ; Age：%s ,Color: %s\n"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义Music类，里面有音乐名，音乐时长，并有play播放功能和返回本省属性信息的功能方法getInfo();</span>
<span class="token keyword">class</span> <span class="token class-name">Music</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> time<span class="token punctuation">;</span>
  <span class="token comment">// 省略,基本如上个案例相同 这里是不用实现实际播放的..</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在测试方法中，调用method方法，代码如下，</span>
<span class="token comment">// 编译正确，试图写出method方法的定义形式，</span>
<span class="token comment">// 调用语句为System.out.println(method(method(10.0,20.0),100));</span>
<span class="token keyword">class</span> <span class="token class-name">TestMethod</span> <span class="token punctuation">{</span>
  <span class="token comment">// 由上可知：该题 method 接收两个实参 double int 或者 double double</span>
  <span class="token comment">// 并返回一个double 由此可知 用重载即可解决;</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token keyword">double</span> num1<span class="token punctuation">,</span><span class="token keyword">double</span> num2<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1<span class="token operator">+</span>num2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token keyword">double</span> num1<span class="token punctuation">,</span><span class="token keyword">int</span> num2<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1<span class="token operator">+</span>num2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

<span class="token comment">// 定义一个Employee类，属性有[名字 性别 年龄 职位 薪水] 提供三个构造函数，可以初始化 略</span>

<span class="token comment">// 将对象作为参数传递给方法</span>
<span class="token comment">/*
 * 1. 定义一个Circle类，包含一个double形的radius属性代表圆的半径，
 ---findArea()返回圆的面积 2.
 * 定义一个类PassObject 在类中定义一个方法printAreas()
 该方法的定义如下： `public void  printArears(Circle c,int times)`
 3.在上方printArears方法中应当输出1到times之间的每个整数半径值，以及对应的面积，
 * 例如，times为5，则输出半径1,2,3,4,5以及对应的圆面积
 4. 在main方法中调用printArears方法，调用完毕后输出当前半径值
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Circle</span><span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">double</span> radius<span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token keyword">double</span> radius<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>radius<span class="token operator">=</span>radius<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">getRadius</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>radius<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">PassObject</span><span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printArears</span><span class="token punctuation">(</span><span class="token keyword">int</span> times<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Radius\t\tArea"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span>times<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%4.1f\t\t%9.9f\n"</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span>i<span class="token punctuation">,</span><span class="token class-name">Math</span><span class="token punctuation">.</span>PI <span class="token operator">*</span> <span class="token punctuation">(</span> i<span class="token operator">*</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printArears</span><span class="token punctuation">(</span><span class="token class-name">Circle</span> c<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Radius\t\tArea"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%4.1f\t\t%9.9f\n"</span><span class="token punctuation">,</span>c<span class="token punctuation">.</span><span class="token function">getRadius</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token class-name">Math</span><span class="token punctuation">.</span>PI <span class="token operator">*</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">getRadius</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span>c<span class="token punctuation">.</span><span class="token function">getRadius</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">/*
 * 扩展：有个人 Tome设计它的成员变量，变量方法，可以电脑猜拳，电脑每次都会随机生成0,1,2 1. 0 石头 1 剪刀 2 布 2.
 * 并要可以显示Tom的输赢次数
 */</span>

<span class="token keyword">class</span> <span class="token class-name">TomeCom</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">gameStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"开始紧张刺激的猜拳吧~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> comNumber <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">Scanner</span> userInput <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> userNumber<span class="token punctuation">;</span>
    <span class="token keyword">int</span> userWin <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">ComWind</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> isContinue<span class="token punctuation">;</span>

    <span class="token class-name">Random</span> df <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"请输入一个0~3的数值(0 石头 1 剪刀 2 布)："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      userNumber <span class="token operator">=</span> userInput<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span>userNumber<span class="token operator">></span><span class="token number">2</span><span class="token operator">||</span> userNumber<span class="token operator">&lt;</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"你输入的值有误，游戏重新运行......"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      comNumber <span class="token operator">=</span> df<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>comNumber <span class="token operator">==</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> userNumber <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ComWind</span><span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"电脑赢了,电脑出的是："</span> <span class="token operator">+</span> comNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>comNumber <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> userNumber <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        userWin<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"你赢了,电脑出的是："</span> <span class="token operator">+</span> comNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>userNumber <span class="token operator">></span> comNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        userWin<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"你赢了,电脑出的是："</span> <span class="token operator">+</span> comNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>userNumber <span class="token operator">&lt;</span> comNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ComWind</span><span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"电脑赢了,电脑出的是："</span> <span class="token operator">+</span> comNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span>  <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"竟然达成了平局,电脑出的是："</span> <span class="token operator">+</span> comNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"本局游戏结束，当前你的得分为：%s分,电脑的得分为：%s分\n是否继续游戏(y/N):"</span><span class="token punctuation">,</span> userWin<span class="token punctuation">,</span> <span class="token class-name">ComWind</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      isContinue <span class="token operator">=</span> userInput<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isContinue<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"y"</span><span class="token punctuation">)</span> <span class="token operator">||</span> isContinue<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"Y"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"游戏继续"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"游戏结束，当前你的得分为：%s分,电脑的得分为：%s分"</span><span class="token punctuation">,</span> userWin<span class="token punctuation">,</span> <span class="token class-name">ComWind</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br></div></div><h2 id="扩展-开始使用idea编写java吧" tabindex="-1"><a class="header-anchor" href="#扩展-开始使用idea编写java吧" aria-hidden="true">#</a> 扩展-开始使用Idea编写Java吧</h2>
<blockquote>
<p>IDEA全程Intellij IEDA 是公认的最好用的Java开发工具(就跟Visual Studio在C中的开发一样)</p>
<p>IEDA除了支持Java开发，还支持Html,CSS,PHP,Mysql,python等</p>
<p><a href="https://www.jetbrains.com/idea/" target="_blank" rel="noopener noreferrer">https://www.jetbrains.com/idea/<ExternalLinkIcon/></a></p>
<p>可以自行选择高级版或者乞丐版(反正我是不太习惯用乞丐版)</p>
<p>若想在试用期结束后白嫖:<a href="https://zhile.io/" target="_blank" rel="noopener noreferrer">https://zhile.io/<ExternalLinkIcon/></a> 当然，IEDA也有学生通道，凭借学校.edu邮箱可以嫖好几年</p>
<p>个人配置文件备份：<a href="https://github.com/Amayakite/IDEASettings" target="_blank" rel="noopener noreferrer">https://github.com/Amayakite/IDEASettings<ExternalLinkIcon/></a></p>
<p>​ 配置文件：Vscode风格快捷键，自定义了部分快捷键..</p>
<p>​ 一般来说，快捷键根据自己的习惯来配置就好了.</p>
<p>安装后，在setting-plugins中可以安装插件，建议安装的插件：</p>
<p>Chinese 让界面变成简体中文</p>
<p>Key PromoterX 快捷键提示</p>
<p>one Dark theme 超级好用的主题</p>
<p>Translation 翻译</p>
<p>Tabline(或者kite) 代码只能 提示插件（推荐TabLine 比kite占用内存要少一些)</p>
<p>HighlightBracketPair 括号颜色</p>
</blockquote>
<p><img src="/images/JavaSE/07-类与对象/image-20211028150112697.png" alt="" loading="lazy"></p>
<p>左边豪华右边乞丐</p>
<p>当然，还有Eclipse也可以用作Java开发，Eclipse优点是开源的，缺点是。。。有点点过时，主要看个人习惯，</p>
<p>在正式使用IEDA或者Eclipse之前，建议是将截至至类之前的所有内容都能手动敲出来</p>
<p>创建项目流程：</p>
<p>文件-新建项目（或者是打开后主页面有个create）</p>
<p><img src="/images/JavaSE/07-类与对象/image-20211028150325870.png" alt="image-20211028150325870" loading="lazy"></p>
<p>这里JDK版本选择1.8就好（系统上安装的），然后点击下一步</p>
<p>如果这一步没有找到JDK，就点击下拉菜单，然后通过系统的path中找到java安装路径，填入即可；例如：</p>
<p><img src="/images/JavaSE/07-类与对象/image-20211028150739228.png" alt="image-20211028150739228" loading="lazy"></p>
<p>找到它了，填写：C:\Program Files\Eclipse Foundation\jdk-8.0.302.8-hotspot 即可</p>
<p><img src="/images/JavaSE/07-类与对象/image-20211028150350712.png" alt="image-20211028150350712" loading="lazy"></p>
<p>这里暂时不用管，下一步</p>
<p><img src="/images/JavaSE/07-类与对象/image-20211028150411990.png" alt="image-20211028150411990" loading="lazy"></p>
<p>这里起个名字，随意取，位置自己定</p>
<p><img src="/images/JavaSE/07-类与对象/image-20211028151237080.png" alt="image-20211028151237080" loading="lazy"></p>
<p>创建好后如图所示，正常情况下来说，代码都是写在src目录下的</p>
<p>...当然，更多的建议看<a href="https://www.bilibili.com/video/BV1fh411y7R8?p=266" target="_blank" rel="noopener noreferrer">老韩<ExternalLinkIcon/></a></p>
</template>
