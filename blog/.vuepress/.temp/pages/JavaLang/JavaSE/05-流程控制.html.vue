<template><h2 id="程序流程控制介绍" tabindex="-1"><a class="header-anchor" href="#程序流程控制介绍" aria-hidden="true">#</a> 程序流程控制介绍</h2>
<p>在程序中，程序运行的流程控制决定程序是如何执行的，是必须掌握的，主要有三大流程控制语句</p>
<ol>
<li>顺序控制</li>
<li>分支控制</li>
<li>循环控制</li>
</ol>
<h3 id="顺序控制" tabindex="-1"><a class="header-anchor" href="#顺序控制" aria-hidden="true">#</a> 顺序控制</h3>
<blockquote>
<p>顺序控制就是程序从上到下逐行的执行，中间没有任何判断和跳转</p>
</blockquote>
<p>也就是代码从头到位没有任何判断啊循环啊直接运行完了，比如<code>HelloWorld.java</code></p>
<h3 id="分支控制" tabindex="-1"><a class="header-anchor" href="#分支控制" aria-hidden="true">#</a> 分支控制</h3>
<p>分支也就是判断，语法<code>if-else</code>，让程序<strong>有选择的执行</strong>，分支控制有三种</p>
<ol>
<li>
<p>单分支
基本语法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//IF01.java</span>
<span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>a<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1等于1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"程序结束"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// IF02.java</span>
<span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>b<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"2等于1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"程序结束"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></li>
<li>
<p>双分支
语法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">String</span> name <span class="token operator">=</span><span class="token string">"小明"</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> age <span class="token operator">=</span><span class="token number">18</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>name <span class="token operator">==</span><span class="token string">"小明"</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"你的名字是小明！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>age <span class="token operator">==</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"你的年龄是10岁，恭喜恭喜"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"你的年龄是"</span><span class="token operator">+</span>age<span class="token operator">+</span><span class="token string">"岁"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"你的名字不是小明！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></li>
<li>
<p>多分枝
语法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">String</span> <span class="token class-name">YouPassWord</span><span class="token operator">=</span><span class="token string">"123,456,489"</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">YouPassWord</span> <span class="token operator">==</span> <span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"登陆成功，本次登陆密码为123456789"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">YouPassWord</span> <span class="token operator">==</span> <span class="token string">"123,456,789"</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"登陆成功，本次登陆密码为123,456,789"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"登陆失败，密码错误"</span><span class="token punctuation">)</span>；
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li>
</ol>
<p>这玩意其实没啥好多说的，反正天天都得用上的东西</p>
<h4 id="switch分支" tabindex="-1"><a class="header-anchor" href="#switch分支" aria-hidden="true">#</a> Switch分支</h4>
<ol>
<li>Switch关键字表示Swtich分支</li>
<li>表达式对应一个值</li>
<li>case 常量1：当表达式的值等于常量1，就执行语句块1</li>
<li>break 表示退出swtich</li>
<li>如果case1和常量1匹配，就执行语句常量1，如果没有匹配，就继续匹配case 常量2</li>
<li>如果一个都没有匹配上，则执行default</li>
<li>跟if else的区别就是一个break 大部分情况下还是if...else用的多一些</li>
<li>示例</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> testSwitch <span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">switch</span><span class="token punctuation">(</span>testSwitch<span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">break</span><span class="token punctuation">;</span>
 <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">break</span><span class="token punctuation">;</span>
 <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">break</span><span class="token punctuation">;</span>
 <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">break</span><span class="token punctuation">;</span>
 <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">break</span><span class="token punctuation">;</span>
 <span class="token keyword">case</span> <span class="token number">6</span><span class="token operator">:</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">break</span><span class="token punctuation">;</span>
 <span class="token keyword">default</span><span class="token operator">:</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"not found"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>for 和while 和do-while 略过 太基础了，唯一值得说的就是  do-while是先执行一次后判断，while是先判断后执行</p>
<blockquote>
<p>break:用于跳出当前循环/判断</p>
<p>continue：跳出当次循环，继续进行下一次循环</p>
<p>return: 跳出所在方法，</p>
</blockquote>
</template>
