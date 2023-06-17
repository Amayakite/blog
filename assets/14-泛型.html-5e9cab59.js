const n=JSON.parse('{"key":"v-1952365f","path":"/JavaLang/JavaSE/14-%E6%B3%9B%E5%9E%8B.html","title":"14-泛型","lang":"zh-CN","frontmatter":{"title":"14-泛型","date":"2021-11-09T12:53:44.000Z","category":"JavaSE","tag":["Java","JavaSE"],"description":"泛型的理解和好处 先看一个需求: 请编写程序,在ArrayList中,添加三个Dog对象 Dog对象含有name和age,并输出name和age(要求用get语句) 先看看用传统的方法是怎么解决的: package com.generic; import java.util.ArrayList; import java.util.Iterator; public class Generic01 { public static void main(String[] args) { // 使用传统的方法来解决 ArrayList arrayList = new ArrayList(); arrayList.add(new Dog(\\"小黄\\", 1)); arrayList.add(new Dog(\\"小蓝\\", 2)); arrayList.add(new Dog(\\"小绿\\", 3)); Iterator iterator = arrayList.iterator(); while (iterator.hasNext()) { Object next = iterator.next(); // 向下转型 Dog dog =(Dog) next; System.out.println(\\"name:\\"+dog.getName()+\\";age:\\"+dog.getAge()); } } } class Dog { private String name; private int age; public Dog(String name, int age) { this.name = name; this.age = age; } public String getName() { return name; } public int getAge() { return age; } }","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/JavaSE/14-%E6%B3%9B%E5%9E%8B.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"14-泛型"}],["meta",{"property":"og:description","content":"泛型的理解和好处 先看一个需求: 请编写程序,在ArrayList中,添加三个Dog对象 Dog对象含有name和age,并输出name和age(要求用get语句) 先看看用传统的方法是怎么解决的: package com.generic; import java.util.ArrayList; import java.util.Iterator; public class Generic01 { public static void main(String[] args) { // 使用传统的方法来解决 ArrayList arrayList = new ArrayList(); arrayList.add(new Dog(\\"小黄\\", 1)); arrayList.add(new Dog(\\"小蓝\\", 2)); arrayList.add(new Dog(\\"小绿\\", 3)); Iterator iterator = arrayList.iterator(); while (iterator.hasNext()) { Object next = iterator.next(); // 向下转型 Dog dog =(Dog) next; System.out.println(\\"name:\\"+dog.getName()+\\";age:\\"+dog.getAge()); } } } class Dog { private String name; private int age; public Dog(String name, int age) { this.name = name; this.age = age; } public String getName() { return name; } public int getAge() { return age; } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaSE"}],["meta",{"property":"article:published_time","content":"2021-11-09T12:53:44.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"14-泛型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-11-09T12:53:44.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"泛型的理解和好处","slug":"泛型的理解和好处","link":"#泛型的理解和好处","children":[]},{"level":2,"title":"泛型的好处","slug":"泛型的好处","link":"#泛型的好处","children":[]},{"level":2,"title":"泛型的基本介绍","slug":"泛型的基本介绍","link":"#泛型的基本介绍","children":[]},{"level":2,"title":"泛型基本语法","slug":"泛型基本语法","link":"#泛型基本语法","children":[{"level":3,"title":"泛型使用的注意事项和细节","slug":"泛型使用的注意事项和细节","link":"#泛型使用的注意事项和细节","children":[]},{"level":3,"title":"扩展-一道 比较经典的泛型习题","slug":"扩展-一道-比较经典的泛型习题","link":"#扩展-一道-比较经典的泛型习题","children":[]}]},{"level":2,"title":"自定义泛型","slug":"自定义泛型","link":"#自定义泛型","children":[{"level":3,"title":"自定义泛型类","slug":"自定义泛型类","link":"#自定义泛型类","children":[]},{"level":3,"title":"自定义泛型接口","slug":"自定义泛型接口","link":"#自定义泛型接口","children":[]},{"level":3,"title":"自定义泛型方法","slug":"自定义泛型方法","link":"#自定义泛型方法","children":[]}]},{"level":2,"title":"泛型的继承和通配符","slug":"泛型的继承和通配符","link":"#泛型的继承和通配符","children":[]},{"level":2,"title":"扩展-Junit-单元测试工具","slug":"扩展-junit-单元测试工具","link":"#扩展-junit-单元测试工具","children":[{"level":3,"title":"引出需求","slug":"引出需求","link":"#引出需求","children":[]},{"level":3,"title":"基本介绍","slug":"基本介绍","link":"#基本介绍","children":[]}]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":15.28,"words":4583},"filePathRelative":"JavaLang/JavaSE/14-泛型.md","localizedDate":"2021年11月9日","excerpt":"<h2> 泛型的理解和好处</h2>\\n<blockquote>\\n<p>先看一个需求:</p>\\n<ol>\\n<li>请编写程序,在ArrayList中,添加三个Dog对象</li>\\n<li>Dog对象含有name和age,并输出name和age(要求用get语句)</li>\\n</ol>\\n</blockquote>\\n<p>先看看用传统的方法是怎么解决的:</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">package</span> <span class=\\"token namespace\\">com<span class=\\"token punctuation\\">.</span>generic</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">import</span> <span class=\\"token import\\"><span class=\\"token namespace\\">java<span class=\\"token punctuation\\">.</span>util<span class=\\"token punctuation\\">.</span></span><span class=\\"token class-name\\">ArrayList</span></span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">import</span> <span class=\\"token import\\"><span class=\\"token namespace\\">java<span class=\\"token punctuation\\">.</span>util<span class=\\"token punctuation\\">.</span></span><span class=\\"token class-name\\">Iterator</span></span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Generic01</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> args<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token comment\\">//        使用传统的方法来解决</span>\\n        <span class=\\"token class-name\\">ArrayList</span> arrayList <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        arrayList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Dog</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"小黄\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        arrayList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Dog</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"小蓝\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        arrayList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Dog</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"小绿\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Iterator</span> iterator <span class=\\"token operator\\">=</span> arrayList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">iterator</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>iterator<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">hasNext</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token class-name\\">Object</span> next <span class=\\"token operator\\">=</span>  iterator<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">next</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">//            向下转型</span>\\n            <span class=\\"token class-name\\">Dog</span> dog <span class=\\"token operator\\">=</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Dog</span><span class=\\"token punctuation\\">)</span> next<span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"name:\\"</span><span class=\\"token operator\\">+</span>dog<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">+</span><span class=\\"token string\\">\\";age:\\"</span><span class=\\"token operator\\">+</span>dog<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getAge</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Dog</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> age<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Dog</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span> age<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>name <span class=\\"token operator\\">=</span> name<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>age <span class=\\"token operator\\">=</span> age<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">getName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">getAge</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> age<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
