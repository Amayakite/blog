const e=JSON.parse('{"key":"v-23ea9f5a","path":"/JavaLang/SpringFrameWork/11-SSM%E6%A1%86%E6%9E%B6%E7%9A%84%E6%95%B4%E5%90%88.html","title":"11-SSM框架的整合","lang":"zh-CN","frontmatter":{"title":"11-SSM框架的整合","date":"2021-12-16T17:12:53.000Z","category":"Spring-FrameWork","tag":["Java","Spring","SpringMVC","Mybatis"],"description":"概述 到了这里为止，SSM三大框架就已经学完了(Spring SpringMVC Mybatis) SS两个框架整合我们都知道了，因为属于同一个生态系统，所以直接合并在一块用即可，但是Mybatis又该怎么整合呢？ 为此，我们这里使用一个简单的例子来贯穿 先在数据库内创建一个表 create database ssm; use ssm; create table account( id int Primary key AUTO_INCREMENT, name varchar(50), money double );","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/SpringFrameWork/11-SSM%E6%A1%86%E6%9E%B6%E7%9A%84%E6%95%B4%E5%90%88.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"11-SSM框架的整合"}],["meta",{"property":"og:description","content":"概述 到了这里为止，SSM三大框架就已经学完了(Spring SpringMVC Mybatis) SS两个框架整合我们都知道了，因为属于同一个生态系统，所以直接合并在一块用即可，但是Mybatis又该怎么整合呢？ 为此，我们这里使用一个简单的例子来贯穿 先在数据库内创建一个表 create database ssm; use ssm; create table account( id int Primary key AUTO_INCREMENT, name varchar(50), money double );"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"SpringMVC"}],["meta",{"property":"article:tag","content":"Mybatis"}],["meta",{"property":"article:published_time","content":"2021-12-16T17:12:53.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"11-SSM框架的整合\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-12-16T17:12:53.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":3,"title":"准备工作-导入依赖","slug":"准备工作-导入依赖","link":"#准备工作-导入依赖","children":[]},{"level":3,"title":"准备工作-实体类","slug":"准备工作-实体类","link":"#准备工作-实体类","children":[]},{"level":3,"title":"准备工作-编写Mapper接口和Service","slug":"准备工作-编写mapper接口和service","link":"#准备工作-编写mapper接口和service","children":[]},{"level":3,"title":"准备工作-AccountController","slug":"准备工作-accountcontroller","link":"#准备工作-accountcontroller","children":[]},{"level":3,"title":"静态页面（使用vue+axios）","slug":"静态页面-使用vue-axios","link":"#静态页面-使用vue-axios","children":[]},{"level":3,"title":"准备相关的配置文件","slug":"准备相关的配置文件","link":"#准备相关的配置文件","children":[]},{"level":3,"title":"jdbc.properties","slug":"jdbc-properties","link":"#jdbc-properties","children":[]},{"level":3,"title":"log4j.properties","slug":"log4j-properties","link":"#log4j-properties","children":[]},{"level":3,"title":"web.xml","slug":"web-xml","link":"#web-xml","children":[]},{"level":3,"title":"applicationContext.xml和spring-mvc.xml","slug":"applicationcontext-xml和spring-mvc-xml","link":"#applicationcontext-xml和spring-mvc-xml","children":[]},{"level":3,"title":"配置Mybatis映射文件和核心配置文件","slug":"配置mybatis映射文件和核心配置文件","link":"#配置mybatis映射文件和核心配置文件","children":[]},{"level":3,"title":"配置ApplicationContext","slug":"配置applicationcontext","link":"#配置applicationcontext","children":[]},{"level":3,"title":"配置Spring-mvc.xml","slug":"配置spring-mvc-xml","link":"#配置spring-mvc-xml","children":[]},{"level":3,"title":"配置web.xml","slug":"配置web-xml","link":"#配置web-xml","children":[]},{"level":3,"title":"扩展-配置json转换器","slug":"扩展-配置json转换器","link":"#扩展-配置json转换器","children":[]},{"level":3,"title":"编写业务层代码","slug":"编写业务层代码","link":"#编写业务层代码","children":[]},{"level":3,"title":"编写访问代码","slug":"编写访问代码","link":"#编写访问代码","children":[]},{"level":3,"title":"测试","slug":"测试","link":"#测试","children":[]},{"level":2,"title":"✨Spring整合MyBatis","slug":"✨spring整合mybatis","link":"#✨spring整合mybatis","children":[{"level":3,"title":"不整合带来的困惑","slug":"不整合带来的困惑","link":"#不整合带来的困惑","children":[]},{"level":3,"title":"整合-合并配置文件","slug":"整合-合并配置文件","link":"#整合-合并配置文件","children":[]}]},{"level":2,"title":"SSM 结束语","slug":"ssm-结束语","link":"#ssm-结束语","children":[]},{"level":2,"title":"整体项目结构","slug":"整体项目结构","link":"#整体项目结构","children":[]},{"level":2,"title":"项目的依赖","slug":"项目的依赖","link":"#项目的依赖","children":[]},{"level":2,"title":"数据源jdbc.properties的配置","slug":"数据源jdbc-properties的配置","link":"#数据源jdbc-properties的配置","children":[]},{"level":2,"title":"Spring-Context的配置","slug":"spring-context的配置","link":"#spring-context的配置","children":[]},{"level":2,"title":"Spring-MVC的配置","slug":"spring-mvc的配置","link":"#spring-mvc的配置","children":[]},{"level":2,"title":"MyBatis的配置","slug":"mybatis的配置","link":"#mybatis的配置","children":[{"level":3,"title":"Mybatis核心配置文件","slug":"mybatis核心配置文件","link":"#mybatis核心配置文件","children":[]},{"level":3,"title":"Mybatis 映射配置文件","slug":"mybatis-映射配置文件","link":"#mybatis-映射配置文件","children":[]}]},{"level":2,"title":"Web.xml","slug":"web-xml-1","link":"#web-xml-1","children":[]},{"level":2,"title":"关于各个Java文件夹的说明","slug":"关于各个java文件夹的说明","link":"#关于各个java文件夹的说明","children":[{"level":3,"title":"Domain","slug":"domain","link":"#domain","children":[]},{"level":3,"title":"Mapper","slug":"mapper","link":"#mapper","children":[]},{"level":3,"title":"Service","slug":"service","link":"#service","children":[]}]},{"level":2,"title":"Controller","slug":"controller","link":"#controller","children":[]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":14.33,"words":4299},"filePathRelative":"JavaLang/SpringFrameWork/11-SSM框架的整合.md","localizedDate":"2021年12月16日","excerpt":"<h1> 概述</h1>\\n<p>到了这里为止，SSM三大框架就已经学完了(Spring SpringMVC Mybatis)</p>\\n<p>SS两个框架整合我们都知道了，因为属于同一个生态系统，所以直接合并在一块用即可，但是Mybatis又该怎么整合呢？</p>\\n<p>为此，我们这里使用一个简单的例子来贯穿</p>\\n<p>先在数据库内创建一个表</p>\\n<div class=\\"language-sql line-numbers-mode\\" data-ext=\\"sql\\"><pre class=\\"language-sql\\"><code><span class=\\"token keyword\\">create</span> <span class=\\"token keyword\\">database</span> ssm<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">use</span> ssm<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">create</span> <span class=\\"token keyword\\">table</span> account<span class=\\"token punctuation\\">(</span>\\n id <span class=\\"token keyword\\">int</span> <span class=\\"token keyword\\">Primary</span> <span class=\\"token keyword\\">key</span> <span class=\\"token keyword\\">AUTO_INCREMENT</span><span class=\\"token punctuation\\">,</span>\\n    name <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">50</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n    money <span class=\\"token keyword\\">double</span>\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
