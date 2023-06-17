const e=JSON.parse('{"key":"v-00b7e233","path":"/JavaLang/JavaEE/05-JSP.html","title":"05-Jsp","lang":"zh-CN","frontmatter":{"title":"05-Jsp","date":"2021-12-04T22:19:50.000Z","category":"JavaWeb","tag":["Java","JavaWeb","Jsp"],"description":"基本介绍 ​ Jsp的全称是 Java Server Pages，Java的服务器页面 ​ JSP的主要作用是替代Servlet程序回传HTML页面的数据 ​ 因为Servlet程序回传HTML页面数据是一件非常繁琐的事情，开发成本和维护成本都极高 ​ (我上一个文章用的并非是完整的SSM思想，正确的SSM思想是在收到用户数据后回传HTML页面，并让用户跳转到指定页面) ​ Jsp目前来说可以算是一个过时的东西，前后端分离才是主流 ​ 或者说SSM也是一个过时的东西（耦合性太高了）","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/JavaEE/05-JSP.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"05-Jsp"}],["meta",{"property":"og:description","content":"基本介绍 ​ Jsp的全称是 Java Server Pages，Java的服务器页面 ​ JSP的主要作用是替代Servlet程序回传HTML页面的数据 ​ 因为Servlet程序回传HTML页面数据是一件非常繁琐的事情，开发成本和维护成本都极高 ​ (我上一个文章用的并非是完整的SSM思想，正确的SSM思想是在收到用户数据后回传HTML页面，并让用户跳转到指定页面) ​ Jsp目前来说可以算是一个过时的东西，前后端分离才是主流 ​ 或者说SSM也是一个过时的东西（耦合性太高了）"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaWeb"}],["meta",{"property":"article:tag","content":"Jsp"}],["meta",{"property":"article:published_time","content":"2021-12-04T22:19:50.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"05-Jsp\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-12-04T22:19:50.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"基本介绍","slug":"基本介绍","link":"#基本介绍","children":[{"level":3,"title":"JSP的本质","slug":"jsp的本质","link":"#jsp的本质","children":[]},{"level":3,"title":"头部的page指令和它的属性","slug":"头部的page指令和它的属性","link":"#头部的page指令和它的属性","children":[]}]},{"level":2,"title":"Jsp中的常用脚本","slug":"jsp中的常用脚本","link":"#jsp中的常用脚本","children":[{"level":3,"title":"声明脚本","slug":"声明脚本","link":"#声明脚本","children":[]},{"level":3,"title":"使用声明脚本导入自己的类的时候注意事项","slug":"使用声明脚本导入自己的类的时候注意事项","link":"#使用声明脚本导入自己的类的时候注意事项","children":[]},{"level":3,"title":"表达式脚本(目前来说较少使用)","slug":"表达式脚本-目前来说较少使用","link":"#表达式脚本-目前来说较少使用","children":[]},{"level":3,"title":"代码脚本","slug":"代码脚本","link":"#代码脚本","children":[]},{"level":3,"title":"JSP中的三种注释方式","slug":"jsp中的三种注释方式","link":"#jsp中的三种注释方式","children":[]}]},{"level":2,"title":"JSP的九大内置对象","slug":"jsp的九大内置对象","link":"#jsp的九大内置对象","children":[{"level":3,"title":"四大域对象","slug":"四大域对象","link":"#四大域对象","children":[]},{"level":3,"title":"jsp中的out输出和res.getWrite输出的区别","slug":"jsp中的out输出和res-getwrite输出的区别","link":"#jsp中的out输出和res-getwrite输出的区别","children":[]},{"level":3,"title":"out.write和out.print的区别","slug":"out-write和out-print的区别","link":"#out-write和out-print的区别","children":[]}]},{"level":2,"title":"JSP常用的标签","slug":"jsp常用的标签","link":"#jsp常用的标签","children":[{"level":3,"title":"静态包含","slug":"静态包含","link":"#静态包含","children":[]},{"level":3,"title":"JSP动态包含","slug":"jsp动态包含","link":"#jsp动态包含","children":[]},{"level":3,"title":"JSP请求转发标签","slug":"jsp请求转发标签","link":"#jsp请求转发标签","children":[]}]},{"level":2,"title":"Listener监听器","slug":"listener监听器","link":"#listener监听器","children":[{"level":3,"title":"ServletContextListener监听器","slug":"servletcontextlistener监听器","link":"#servletcontextlistener监听器","children":[]}]},{"level":2,"title":"EL表达式","slug":"el表达式","link":"#el表达式","children":[{"level":3,"title":"El表达式搜索区域的顺序","slug":"el表达式搜索区域的顺序","link":"#el表达式搜索区域的顺序","children":[]},{"level":3,"title":"EL表达式输出Bean的普通属性、数组属性、List集合属性、Map集合属性","slug":"el表达式输出bean的普通属性、数组属性、list集合属性、map集合属性","link":"#el表达式输出bean的普通属性、数组属性、list集合属性、map集合属性","children":[]},{"level":3,"title":"EL表达式-运算","slug":"el表达式-运算","link":"#el表达式-运算","children":[]},{"level":3,"title":"EL表达式中的11个内置对象","slug":"el表达式中的11个内置对象","link":"#el表达式中的11个内置对象","children":[]}]},{"level":2,"title":"JSTL标签库","slug":"jstl标签库","link":"#jstl标签库","children":[{"level":3,"title":"基本功能","slug":"基本功能","link":"#基本功能","children":[]}]},{"level":2,"title":"文件的上传和下载","slug":"文件的上传和下载","link":"#文件的上传和下载","children":[{"level":3,"title":"文件的上传","slug":"文件的上传","link":"#文件的上传","children":[]},{"level":3,"title":"实现将用户上传的文件存储","slug":"实现将用户上传的文件存储","link":"#实现将用户上传的文件存储","children":[]},{"level":3,"title":"文件下载（发送给客户端）","slug":"文件下载-发送给客户端","link":"#文件下载-发送给客户端","children":[]},{"level":3,"title":"发送其他文件并让客户端直接下载","slug":"发送其他文件并让客户端直接下载","link":"#发送其他文件并让客户端直接下载","children":[]}]},{"level":2,"title":"Cookie","slug":"cookie","link":"#cookie","children":[{"level":3,"title":"基本介绍","slug":"基本介绍-1","link":"#基本介绍-1","children":[]},{"level":3,"title":"新增cookie","slug":"新增cookie","link":"#新增cookie","children":[]},{"level":3,"title":"接收cookie","slug":"接收cookie","link":"#接收cookie","children":[]},{"level":3,"title":"删除、修改cookie","slug":"删除、修改cookie","link":"#删除、修改cookie","children":[]},{"level":3,"title":"关于Cookie的Path","slug":"关于cookie的path","link":"#关于cookie的path","children":[]}]},{"level":2,"title":"Session","slug":"session","link":"#session","children":[{"level":3,"title":"基本介绍","slug":"基本介绍-2","link":"#基本介绍-2","children":[]},{"level":3,"title":"创建和获取Session","slug":"创建和获取session","link":"#创建和获取session","children":[]},{"level":3,"title":"读取和写入session","slug":"读取和写入session","link":"#读取和写入session","children":[]},{"level":3,"title":"关于session的时长（超时）控制","slug":"关于session的时长-超时-控制","link":"#关于session的时长-超时-控制","children":[]},{"level":3,"title":"让session立刻超时（销毁）","slug":"让session立刻超时-销毁","link":"#让session立刻超时-销毁","children":[]},{"level":3,"title":"Session的细节说明（重要）","slug":"session的细节说明-重要","link":"#session的细节说明-重要","children":[]},{"level":3,"title":"Session的实例-验证码","slug":"session的实例-验证码","link":"#session的实例-验证码","children":[]}]},{"level":2,"title":"Filter过滤器","slug":"filter过滤器","link":"#filter过滤器","children":[{"level":3,"title":"Filter的初体验","slug":"filter的初体验","link":"#filter的初体验","children":[]},{"level":3,"title":"创建一个简单的filter","slug":"创建一个简单的filter","link":"#创建一个简单的filter","children":[]},{"level":3,"title":"实现doFilter方法","slug":"实现dofilter方法","link":"#实现dofilter方法","children":[]},{"level":3,"title":"配置过滤器","slug":"配置过滤器","link":"#配置过滤器","children":[]},{"level":3,"title":"Filter的生命周期","slug":"filter的生命周期","link":"#filter的生命周期","children":[]},{"level":3,"title":"FilterConfig类","slug":"filterconfig类","link":"#filterconfig类","children":[]},{"level":3,"title":"FilterChain过滤器链","slug":"filterchain过滤器链","link":"#filterchain过滤器链","children":[]},{"level":3,"title":"Filter的三种拦截匹配模式","slug":"filter的三种拦截匹配模式","link":"#filter的三种拦截匹配模式","children":[]}]},{"level":2,"title":"配置自定义的错误页面","slug":"配置自定义的错误页面","link":"#配置自定义的错误页面","children":[]},{"level":2,"title":"I18N国际化","slug":"i18n国际化","link":"#i18n国际化","children":[{"level":3,"title":"国际化的相关要素","slug":"国际化的相关要素","link":"#国际化的相关要素","children":[]},{"level":3,"title":"在网页中使用I18N","slug":"在网页中使用i18n","link":"#在网页中使用i18n","children":[]},{"level":3,"title":"如何让用户自己选择语言","slug":"如何让用户自己选择语言","link":"#如何让用户自己选择语言","children":[]},{"level":3,"title":"使用JSTL标签实现国际化","slug":"使用jstl标签实现国际化","link":"#使用jstl标签实现国际化","children":[]}]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":40.4,"words":12120},"filePathRelative":"JavaLang/JavaEE/05-JSP.md","localizedDate":"2021年12月4日","excerpt":"<h2> 基本介绍</h2>\\n<p>​  Jsp的全称是 Java Server Pages，Java的服务器页面</p>\\n<p>​  JSP的主要作用是替代Servlet程序回传HTML页面的数据</p>\\n<p>​  因为Servlet程序回传HTML页面数据是一件非常繁琐的事情，开发成本和维护成本都极高</p>\\n<p>​  (我上一个文章用的并非是完整的SSM思想，正确的SSM思想是在收到用户数据后回传HTML页面，并让用户跳转到指定页面)</p>\\n<p>​  <strong>Jsp目前来说可以算是一个过时的东西，前后端分离才是主流</strong></p>\\n<p>​  或者说SSM也是一个过时的东西（耦合性太高了）</p>","autoDesc":true}');export{e as data};
