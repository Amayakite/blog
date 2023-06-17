const e=JSON.parse('{"key":"v-c2940eea","path":"/JavaLang/JavaEE/3-0%E8%A7%84%E8%8C%83%E7%9A%84%E5%AD%A6%E4%B9%A0Servlet.html","title":"03-0规范的学习下Servlet","lang":"zh-CN","frontmatter":{"title":"03-0规范的学习下Servlet","date":"2021-12-04T13:19:20.000Z","category":"JavaWeb","tag":["Java","JavaWeb","Servlet"],"description":"日了，服了某些自己都没搞明白的人怎么敢来放网课教程（虽然是免费的），我假设你看过我的前一个文章，知道了它的基本用法 接下来系统的学习下这玩意 Servlet的简介和基本使用 什么是Servlet 是JavaEE的规范之一，规范就是接口 Servlet是Javaweb的三大组件之一，三大组件分别是Servlet程序、Filter过滤器、Listener监听器 Servlet是运行在服务器（Tomcat）上的一个Java小程序，他可以接收客户端发送过来的请求，并响应数据给客户端","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/JavaEE/3-0%E8%A7%84%E8%8C%83%E7%9A%84%E5%AD%A6%E4%B9%A0Servlet.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"03-0规范的学习下Servlet"}],["meta",{"property":"og:description","content":"日了，服了某些自己都没搞明白的人怎么敢来放网课教程（虽然是免费的），我假设你看过我的前一个文章，知道了它的基本用法 接下来系统的学习下这玩意 Servlet的简介和基本使用 什么是Servlet 是JavaEE的规范之一，规范就是接口 Servlet是Javaweb的三大组件之一，三大组件分别是Servlet程序、Filter过滤器、Listener监听器 Servlet是运行在服务器（Tomcat）上的一个Java小程序，他可以接收客户端发送过来的请求，并响应数据给客户端"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaWeb"}],["meta",{"property":"article:tag","content":"Servlet"}],["meta",{"property":"article:published_time","content":"2021-12-04T13:19:20.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"03-0规范的学习下Servlet\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-12-04T13:19:20.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"Servlet的简介和基本使用","slug":"servlet的简介和基本使用","link":"#servlet的简介和基本使用","children":[{"level":3,"title":"什么是Servlet","slug":"什么是servlet","link":"#什么是servlet","children":[]},{"level":3,"title":"自己实现一个Servlet","slug":"自己实现一个servlet","link":"#自己实现一个servlet","children":[]}]},{"level":2,"title":"Servlet原理","slug":"servlet原理","link":"#servlet原理","children":[]},{"level":2,"title":"Servlet的生命周期","slug":"servlet的生命周期","link":"#servlet的生命周期","children":[]},{"level":2,"title":"引出doGet和doPost","slug":"引出doget和dopost","link":"#引出doget和dopost","children":[]},{"level":2,"title":"HttpServlet的使用","slug":"httpservlet的使用","link":"#httpservlet的使用","children":[{"level":3,"title":"扩展-通过IEDA快速的的创建相关的HttpServlet及配置web.xml","slug":"扩展-通过ieda快速的的创建相关的httpservlet及配置web-xml","link":"#扩展-通过ieda快速的的创建相关的httpservlet及配置web-xml","children":[]}]},{"level":2,"title":"HttpServlet的继承关系","slug":"httpservlet的继承关系","link":"#httpservlet的继承关系","children":[]},{"level":2,"title":"ServletConfig类","slug":"servletconfig类","link":"#servletconfig类","children":[{"level":3,"title":"ServletConfig的注意事项","slug":"servletconfig的注意事项","link":"#servletconfig的注意事项","children":[]}]},{"level":2,"title":"ServletContext(上下文)","slug":"servletcontext-上下文","link":"#servletcontext-上下文","children":[{"level":3,"title":"域对象","slug":"域对象","link":"#域对象","children":[]},{"level":3,"title":"ServletContext类的四个作用","slug":"servletcontext类的四个作用","link":"#servletcontext类的四个作用","children":[]},{"level":3,"title":"Servlet常用方法一：读取上下文，工程路径，绝对路径","slug":"servlet常用方法一-读取上下文-工程路径-绝对路径","link":"#servlet常用方法一-读取上下文-工程路径-绝对路径","children":[]},{"level":3,"title":"Servlet常用方法二：让Servlet通信","slug":"servlet常用方法二-让servlet通信","link":"#servlet常用方法二-让servlet通信","children":[]},{"level":3,"title":"Servlet常用方法三：读取prperties等配置文件","slug":"servlet常用方法三-读取prperties等配置文件","link":"#servlet常用方法三-读取prperties等配置文件","children":[]}]},{"level":2,"title":"HTTP回顾","slug":"http回顾","link":"#http回顾","children":[{"level":3,"title":"请求的HTTP协议格式","slug":"请求的http协议格式","link":"#请求的http协议格式","children":[]},{"level":3,"title":"常用请求头说明","slug":"常用请求头说明","link":"#常用请求头说明","children":[]},{"level":3,"title":"Get请求和Post请求的区分","slug":"get请求和post请求的区分","link":"#get请求和post请求的区分","children":[]},{"level":3,"title":"响应的HTTP格式","slug":"响应的http格式","link":"#响应的http格式","children":[]},{"level":3,"title":"常见的响应状态吗","slug":"常见的响应状态吗","link":"#常见的响应状态吗","children":[]},{"level":3,"title":"MIME类型说明(Context-Type)","slug":"mime类型说明-context-type","link":"#mime类型说明-context-type","children":[]}]},{"level":2,"title":"HttpServletRequest类","slug":"httpservletrequest类","link":"#httpservletrequest类","children":[{"level":3,"title":"基本介绍","slug":"基本介绍","link":"#基本介绍","children":[]},{"level":3,"title":"常用方法","slug":"常用方法","link":"#常用方法","children":[]},{"level":3,"title":"请求转发","slug":"请求转发","link":"#请求转发","children":[]},{"level":3,"title":"解决Post请求中中文参数乱码的问题","slug":"解决post请求中中文参数乱码的问题","link":"#解决post请求中中文参数乱码的问题","children":[]},{"level":3,"title":"扩展-HTML-Base标签的作用及解决请求转发的问题","slug":"扩展-html-base标签的作用及解决请求转发的问题","link":"#扩展-html-base标签的作用及解决请求转发的问题","children":[]}]},{"level":2,"title":"HttpServletResponse","slug":"httpservletresponse","link":"#httpservletresponse","children":[]},{"level":2,"title":"Response的两个输出流","slug":"response的两个输出流","link":"#response的两个输出流","children":[{"level":3,"title":"设置流的编码，返回格式","slug":"设置流的编码-返回格式","link":"#设置流的编码-返回格式","children":[]},{"level":3,"title":"请求重定向","slug":"请求重定向","link":"#请求重定向","children":[]}]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":25.46,"words":7639},"filePathRelative":"JavaLang/JavaEE/3-0规范的学习Servlet.md","localizedDate":"2021年12月4日","excerpt":"<p>日了，服了某些自己都没搞明白的人怎么敢来放网课教程（虽然是免费的），我假设你看过我的前一个文章，知道了它的基本用法</p>\\n<p>接下来系统的学习下这玩意</p>\\n<h2> Servlet的简介和基本使用</h2>\\n<h3> 什么是Servlet</h3>\\n<ol>\\n<li>是JavaEE的规范之一，规范就是接口</li>\\n<li>Servlet是Javaweb的三大组件之一，三大组件分别是Servlet程序、Filter过滤器、Listener监听器</li>\\n<li>Servlet是运行在服务器（Tomcat）上的一个Java小程序，他可以接收客户端发送过来的请求，并响应数据给客户端</li>\\n</ol>","autoDesc":true}');export{e as data};
