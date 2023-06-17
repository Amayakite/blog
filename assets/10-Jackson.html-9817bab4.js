const t=JSON.parse('{"key":"v-64339cac","path":"/JavaLang/SpringBoot/10-Jackson.html","title":"10-Jackson","lang":"zh-CN","frontmatter":{"title":"10-Jackson","date":"2022-06-11T21:12:34.000Z","category":"SpringBoot","tag":["Json","FastJson","SpringBoot"],"description":"概述 如果你用了Springboot，应该会发现他有个很神奇的自带功能，就是可以将实体类转换成json对象返回给客户端，其底层就是用到了Jackson 不过json转换器目前不止有Jackson，还有 Google提供的Gson Alibaba提供的FastJson 当然三者各有千秋吧，不过SpringBoot竟然默认是使用Jackson，所以就有必要了解下如何使用了 官网：FasterXML/jackson: Main Portal page for the Jackson project (github.com)","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/SpringBoot/10-Jackson.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"10-Jackson"}],["meta",{"property":"og:description","content":"概述 如果你用了Springboot，应该会发现他有个很神奇的自带功能，就是可以将实体类转换成json对象返回给客户端，其底层就是用到了Jackson 不过json转换器目前不止有Jackson，还有 Google提供的Gson Alibaba提供的FastJson 当然三者各有千秋吧，不过SpringBoot竟然默认是使用Jackson，所以就有必要了解下如何使用了 官网：FasterXML/jackson: Main Portal page for the Jackson project (github.com)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T13:54:23.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Json"}],["meta",{"property":"article:tag","content":"FastJson"}],["meta",{"property":"article:tag","content":"SpringBoot"}],["meta",{"property":"article:published_time","content":"2022-06-11T21:12:34.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T13:54:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"10-Jackson\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-11T21:12:34.000Z\\",\\"dateModified\\":\\"2023-06-17T13:54:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"Jackson的安装","slug":"jackson的安装","link":"#jackson的安装","children":[]},{"level":2,"title":"将Java对象转换成Json字符串","slug":"将java对象转换成json字符串","link":"#将java对象转换成json字符串","children":[]},{"level":2,"title":"Json自定义转换器","slug":"json自定义转换器","link":"#json自定义转换器","children":[]},{"level":2,"title":"解析Json字符串","slug":"解析json字符串","link":"#解析json字符串","children":[]},{"level":2,"title":"@JsonProperty设定别名","slug":"jsonproperty设定别名","link":"#jsonproperty设定别名","children":[]},{"level":2,"title":"@JsonIgnore和@JsonIgnoreProperties忽略属性","slug":"jsonignore和-jsonignoreproperties忽略属性","link":"#jsonignore和-jsonignoreproperties忽略属性","children":[]},{"level":2,"title":"@JsonCreator来自定义构造函数","slug":"jsoncreator来自定义构造函数","link":"#jsoncreator来自定义构造函数","children":[]},{"level":2,"title":"附录-在Kotlin中使用Jackson","slug":"附录-在kotlin中使用jackson","link":"#附录-在kotlin中使用jackson","children":[]}],"git":{"createdTime":1687006308000,"updatedTime":1687010063000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":2}]},"readingTime":{"minutes":8.58,"words":2574},"filePathRelative":"JavaLang/SpringBoot/10-Jackson.md","localizedDate":"2022年6月11日","excerpt":"<h2> 概述</h2>\\n<p>如果你用了Springboot，应该会发现他有个很神奇的自带功能，就是可以将实体类转换成json对象返回给客户端，其底层就是用到了Jackson</p>\\n<p>不过json转换器目前不止有Jackson，还有</p>\\n<ul>\\n<li>Google提供的Gson</li>\\n<li>Alibaba提供的FastJson</li>\\n</ul>\\n<p>当然三者各有千秋吧，不过SpringBoot竟然默认是使用Jackson，所以就有必要了解下如何使用了</p>\\n<p>官网：<a href=\\"https://github.com/FasterXML/jackson\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">FasterXML/jackson: Main Portal page for the Jackson project (github.com)</a></p>","autoDesc":true}');export{t as data};
