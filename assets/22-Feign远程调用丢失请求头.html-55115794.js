const n=JSON.parse('{"key":"v-446149ea","path":"/JavaLang/SpringCloud/22-Feign%E8%BF%9C%E7%A8%8B%E8%B0%83%E7%94%A8%E4%B8%A2%E5%A4%B1%E8%AF%B7%E6%B1%82%E5%A4%B4.html","title":"22-Feign远程调用丢失请求头","lang":"zh-CN","frontmatter":{"title":"22-Feign远程调用丢失请求头","date":"2022-02-05T22:21:09.000Z","category":"分布式-微服务","tag":["微服务","Spring Cloud OpenFeign","SpringCloud"],"description":"概述 image-20220205222122234 解决 @Configuration public class FeignConfig { // 这个名称不知道是否是必须要的 貌似是来着... @Bean(\\"requestInterceptor\\") public RequestInterceptor requestInterceptor() { return new RequestInterceptor() { @Override public void apply(RequestTemplate requestTemplate) { /* * 这里实际上底层也是使用ThreadLocal提前获取好了请求的属性，我们强转成ServletRequestAttributes即可 * */ ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes(); HttpServletRequest request = requestAttributes.getRequest(); Enumeration&lt;String&gt; headerNames = request.getHeaderNames(); // 这里是直接将全部值都拿出来了，如果有需要可以按照需求进行处理 // 例如：只拿token值，可以这样写 // requestTemplate.header(\\"token\\", request.getHeader(\\"token\\")); HashMap&lt;String, Collection&lt;String&gt;&gt; stringArrayListHashMap = new HashMap&lt;&gt;(); while (headerNames.hasMoreElements()) { String name = headerNames.nextElement(); String value = request.getHeader(name); if (stringArrayListHashMap.containsKey(name)) { stringArrayListHashMap.get(name).add(value); } else { ArrayList&lt;String&gt; o = new ArrayList&lt;&gt;(); o.add(value); stringArrayListHashMap.put(name, o); } } requestTemplate.headers(stringArrayListHashMap); } }; } }","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/SpringCloud/22-Feign%E8%BF%9C%E7%A8%8B%E8%B0%83%E7%94%A8%E4%B8%A2%E5%A4%B1%E8%AF%B7%E6%B1%82%E5%A4%B4.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"22-Feign远程调用丢失请求头"}],["meta",{"property":"og:description","content":"概述 image-20220205222122234 解决 @Configuration public class FeignConfig { // 这个名称不知道是否是必须要的 貌似是来着... @Bean(\\"requestInterceptor\\") public RequestInterceptor requestInterceptor() { return new RequestInterceptor() { @Override public void apply(RequestTemplate requestTemplate) { /* * 这里实际上底层也是使用ThreadLocal提前获取好了请求的属性，我们强转成ServletRequestAttributes即可 * */ ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes(); HttpServletRequest request = requestAttributes.getRequest(); Enumeration&lt;String&gt; headerNames = request.getHeaderNames(); // 这里是直接将全部值都拿出来了，如果有需要可以按照需求进行处理 // 例如：只拿token值，可以这样写 // requestTemplate.header(\\"token\\", request.getHeader(\\"token\\")); HashMap&lt;String, Collection&lt;String&gt;&gt; stringArrayListHashMap = new HashMap&lt;&gt;(); while (headerNames.hasMoreElements()) { String name = headerNames.nextElement(); String value = request.getHeader(name); if (stringArrayListHashMap.containsKey(name)) { stringArrayListHashMap.get(name).add(value); } else { ArrayList&lt;String&gt; o = new ArrayList&lt;&gt;(); o.add(value); stringArrayListHashMap.put(name, o); } } requestTemplate.headers(stringArrayListHashMap); } }; } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"微服务"}],["meta",{"property":"article:tag","content":"Spring Cloud OpenFeign"}],["meta",{"property":"article:tag","content":"SpringCloud"}],["meta",{"property":"article:published_time","content":"2022-02-05T22:21:09.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"22-Feign远程调用丢失请求头\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-05T22:21:09.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"解决","slug":"解决","link":"#解决","children":[]},{"level":2,"title":"异步调用丢失（开新线程调用）","slug":"异步调用丢失-开新线程调用","link":"#异步调用丢失-开新线程调用","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":2.09,"words":628},"filePathRelative":"JavaLang/SpringCloud/22-Feign远程调用丢失请求头.md","localizedDate":"2022年2月5日","excerpt":"<h2> 概述</h2>\\n<figure><img src=\\"/images/SpringCloud/22-Feign远程调用丢失请求头/image-20220205222122234.png\\" alt=\\"image-20220205222122234\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20220205222122234</figcaption></figure>\\n<h2> 解决</h2>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Configuration</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">FeignConfig</span> <span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token comment\\">// 这个名称不知道是否是必须要的 貌似是来着...</span>\\n    <span class=\\"token annotation punctuation\\">@Bean</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"requestInterceptor\\"</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">RequestInterceptor</span> <span class=\\"token function\\">requestInterceptor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RequestInterceptor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token annotation punctuation\\">@Override</span>\\n            <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">apply</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">RequestTemplate</span> requestTemplate<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                <span class=\\"token comment\\">/*\\n                 * 这里实际上底层也是使用ThreadLocal提前获取好了请求的属性，我们强转成ServletRequestAttributes即可\\n                 * */</span>\\n                <span class=\\"token class-name\\">ServletRequestAttributes</span> requestAttributes <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">ServletRequestAttributes</span><span class=\\"token punctuation\\">)</span> <span class=\\"token class-name\\">RequestContextHolder</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getRequestAttributes</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n                <span class=\\"token class-name\\">HttpServletRequest</span> request <span class=\\"token operator\\">=</span> requestAttributes<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getRequest</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token class-name\\">Enumeration</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span> headerNames <span class=\\"token operator\\">=</span> request<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getHeaderNames</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">//                这里是直接将全部值都拿出来了，如果有需要可以按照需求进行处理</span>\\n<span class=\\"token comment\\">//                例如：只拿token值，可以这样写</span>\\n<span class=\\"token comment\\">//                requestTemplate.header(\\"token\\", request.getHeader(\\"token\\"));</span>\\n\\n                <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Collection</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">&gt;</span></span> stringArrayListHashMap <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">HashMap</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                <span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>headerNames<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">hasMoreElements</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                    <span class=\\"token class-name\\">String</span> name <span class=\\"token operator\\">=</span> headerNames<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">nextElement</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                    <span class=\\"token class-name\\">String</span> value <span class=\\"token operator\\">=</span> request<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getHeader</span><span class=\\"token punctuation\\">(</span>name<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>stringArrayListHashMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">containsKey</span><span class=\\"token punctuation\\">(</span>name<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n                        stringArrayListHashMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span>name<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>value<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                    <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n                        <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span> o <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                        o<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>value<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                        stringArrayListHashMap<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">put</span><span class=\\"token punctuation\\">(</span>name<span class=\\"token punctuation\\">,</span> o<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n                    <span class=\\"token punctuation\\">}</span>\\n                <span class=\\"token punctuation\\">}</span>\\n                requestTemplate<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">headers</span><span class=\\"token punctuation\\">(</span>stringArrayListHashMap<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n            <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
