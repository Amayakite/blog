const e=JSON.parse('{"key":"v-2631e39a","path":"/JavaLang/Netty/03-Netty-GoogleProtobuf.html","title":"03-Netty-GoogleProtobuf","lang":"zh-CN","frontmatter":{"title":"03-Netty-GoogleProtobuf","date":"2022-05-17T22:54:39.000Z","category":"Netty","tag":["Netty","Google ProtoBuf"],"description":"概述 这里主要说明下咋在Netty中使用一个由Google开发的高性能协议 Google ProtoBuf(基于TCP) 唉，最近找工作有点难受，学历不够做啥都是硬伤..找了几个月都没公司要（2022年5月17日22:56:16），准备老老实实的再学学找找，不行的话可能真得进厂拧螺丝了 编码和解码的介绍 在开始之前，得先了解下这玩意 在编写网络应用的时候，因为数据在网络传输中都是使用的二进制字节码数据，在发送数据时就需要编码，接收数据的时候就要解码 codec(解码器)的组成部分有两个 decoder解码器，负责把字节码数据转换成业务数据 encoder编码器，负责把业务数据转换成字节码数据","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/Netty/03-Netty-GoogleProtobuf.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"03-Netty-GoogleProtobuf"}],["meta",{"property":"og:description","content":"概述 这里主要说明下咋在Netty中使用一个由Google开发的高性能协议 Google ProtoBuf(基于TCP) 唉，最近找工作有点难受，学历不够做啥都是硬伤..找了几个月都没公司要（2022年5月17日22:56:16），准备老老实实的再学学找找，不行的话可能真得进厂拧螺丝了 编码和解码的介绍 在开始之前，得先了解下这玩意 在编写网络应用的时候，因为数据在网络传输中都是使用的二进制字节码数据，在发送数据时就需要编码，接收数据的时候就要解码 codec(解码器)的组成部分有两个 decoder解码器，负责把字节码数据转换成业务数据 encoder编码器，负责把业务数据转换成字节码数据"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Netty"}],["meta",{"property":"article:tag","content":"Google ProtoBuf"}],["meta",{"property":"article:published_time","content":"2022-05-17T22:54:39.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"03-Netty-GoogleProtobuf\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-17T22:54:39.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"编码和解码的介绍","slug":"编码和解码的介绍","link":"#编码和解码的介绍","children":[]},{"level":2,"title":"Protobuf","slug":"protobuf","link":"#protobuf","children":[{"level":3,"title":"基本介绍","slug":"基本介绍","link":"#基本介绍","children":[]}]},{"level":2,"title":"Protobuf-快速入门","slug":"protobuf-快速入门","link":"#protobuf-快速入门","children":[{"level":3,"title":"依赖和Domain的生成","slug":"依赖和domain的生成","link":"#依赖和domain的生成","children":[]},{"level":3,"title":"客户端","slug":"客户端","link":"#客户端","children":[]},{"level":3,"title":"服务端","slug":"服务端","link":"#服务端","children":[]}]},{"level":2,"title":"发送不同类型的对象","slug":"发送不同类型的对象","link":"#发送不同类型的对象","children":[]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":9.37,"words":2811},"filePathRelative":"JavaLang/Netty/03-Netty-GoogleProtobuf.md","localizedDate":"2022年5月17日","excerpt":"<h2> 概述</h2>\\n<p>这里主要说明下咋在Netty中使用一个由Google开发的高性能协议 Google ProtoBuf(基于TCP)</p>\\n<p>唉，最近找工作有点难受，学历不够做啥都是硬伤..找了几个月都没公司要（2022年5月17日22:56:16），准备老老实实的再学学找找，不行的话可能真得进厂拧螺丝了</p>\\n<h2> 编码和解码的介绍</h2>\\n<p>在开始之前，得先了解下这玩意</p>\\n<ul>\\n<li>在编写网络应用的时候，因为数据在网络传输中都是使用的二进制字节码数据，在发送数据时就需要编码，接收数据的时候就要解码</li>\\n<li>codec(解码器)的组成部分有两个\\n<ul>\\n<li>decoder解码器，负责把字节码数据转换成业务数据</li>\\n<li>encoder编码器，负责把业务数据转换成字节码数据</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
