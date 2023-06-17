const e=JSON.parse('{"key":"v-999358a2","path":"/JavaLang/JavaSE/20-%E5%8F%8D%E5%B0%84.html","title":"20-反射","lang":"zh-CN","frontmatter":{"title":"20-反射","date":"2021-11-18T14:18:23.000Z","category":"JavaSE","tag":["Java","JavaSE","Class"],"description":"一个需求引出反射 先看一个问题： 根据配置文件re.properties指定信息，创建对象并调用方法(创建Cat对象并调用方法hi) classfullpath = com.test.Cat method=hi","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/JavaSE/20-%E5%8F%8D%E5%B0%84.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"20-反射"}],["meta",{"property":"og:description","content":"一个需求引出反射 先看一个问题： 根据配置文件re.properties指定信息，创建对象并调用方法(创建Cat对象并调用方法hi) classfullpath = com.test.Cat method=hi"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaSE"}],["meta",{"property":"article:tag","content":"Class"}],["meta",{"property":"article:published_time","content":"2021-11-18T14:18:23.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"20-反射\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-11-18T14:18:23.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"一个需求引出反射","slug":"一个需求引出反射","link":"#一个需求引出反射","children":[]},{"level":2,"title":"反射机制(Reflection)","slug":"反射机制-reflection","link":"#反射机制-reflection","children":[]},{"level":2,"title":"Java反射机制原理(重要)","slug":"java反射机制原理-重要","link":"#java反射机制原理-重要","children":[{"level":3,"title":"反射的优点和缺点","slug":"反射的优点和缺点","link":"#反射的优点和缺点","children":[]},{"level":3,"title":"反射调用优化-关闭访问检查","slug":"反射调用优化-关闭访问检查","link":"#反射调用优化-关闭访问检查","children":[]}]},{"level":2,"title":"Class类","slug":"class类","link":"#class类","children":[{"level":3,"title":"基本介绍","slug":"基本介绍","link":"#基本介绍","children":[]},{"level":3,"title":"Class类常用方法","slug":"class类常用方法","link":"#class类常用方法","children":[]},{"level":3,"title":"获取Class类对象的六种方式","slug":"获取class类对象的六种方式","link":"#获取class类对象的六种方式","children":[]},{"level":3,"title":"哪些类型有Class对象","slug":"哪些类型有class对象","link":"#哪些类型有class对象","children":[]}]},{"level":2,"title":"类加载","slug":"类加载","link":"#类加载","children":[{"level":3,"title":"基本说明","slug":"基本说明","link":"#基本说明","children":[]},{"level":3,"title":"类加载时机","slug":"类加载时机","link":"#类加载时机","children":[]}]},{"level":2,"title":"类加载初步深入了解","slug":"类加载初步深入了解","link":"#类加载初步深入了解","children":[{"level":3,"title":"类加载流程图","slug":"类加载流程图","link":"#类加载流程图","children":[]},{"level":3,"title":"类加载各个阶段完成任务","slug":"类加载各个阶段完成任务","link":"#类加载各个阶段完成任务","children":[]},{"level":3,"title":"加载阶段(Loading)","slug":"加载阶段-loading","link":"#加载阶段-loading","children":[]},{"level":3,"title":"连接阶段-验证(Versification)","slug":"连接阶段-验证-versification","link":"#连接阶段-验证-versification","children":[]},{"level":3,"title":"连接阶段-准备(Preparation)","slug":"连接阶段-准备-preparation","link":"#连接阶段-准备-preparation","children":[]},{"level":3,"title":"连接阶段-解析(Resolution)","slug":"连接阶段-解析-resolution","link":"#连接阶段-解析-resolution","children":[]},{"level":3,"title":"初始化(Initialization)","slug":"初始化-initialization","link":"#初始化-initialization","children":[]},{"level":3,"title":"通过反射获取类的结构信息","slug":"通过反射获取类的结构信息","link":"#通过反射获取类的结构信息","children":[]},{"level":3,"title":"通过反射创建对象","slug":"通过反射创建对象","link":"#通过反射创建对象","children":[]},{"level":3,"title":"通过反射访问属性","slug":"通过反射访问属性","link":"#通过反射访问属性","children":[]},{"level":3,"title":"通过反射访问方法","slug":"通过反射访问方法","link":"#通过反射访问方法","children":[]}]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":27.7,"words":8311},"filePathRelative":"JavaLang/JavaSE/20-反射.md","localizedDate":"2021年11月18日","excerpt":"<h2> 一个需求引出反射</h2>\\n<p>先看一个问题：</p>\\n<ol>\\n<li>根据配置文件<code>re.properties</code>指定信息，<strong>创建对象并调用方法</strong>(创建Cat对象并调用方法hi)</li>\\n</ol>\\n<div class=\\"language-properties line-numbers-mode\\" data-ext=\\"properties\\"><pre class=\\"language-properties\\"><code><span class=\\"token key attr-name\\">classfullpath</span> <span class=\\"token punctuation\\">=</span> <span class=\\"token value attr-value\\">com.test.Cat</span>\\n<span class=\\"token key attr-name\\">method</span><span class=\\"token punctuation\\">=</span><span class=\\"token value attr-value\\">hi</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
