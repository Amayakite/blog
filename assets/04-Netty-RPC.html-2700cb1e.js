const e=JSON.parse('{"key":"v-ae805216","path":"/JavaLang/Netty/04-Netty-RPC.html","title":"04-Netty-RPC","lang":"zh-CN","frontmatter":{"title":"04-Netty-RPC","date":"2022-05-21T20:53:00.000Z","category":"Netty","tag":["Netty","RPC"],"description":"RPC的基本介绍 Remote Procedure Call——远程调用过程，是一个计算机通讯协议，该协议允许运行于一台计算机程序端调用另一台计算机的子程序，而程序员无序额外的为这个交互作用编程 两个或者多个应用程序都分布在不同的服务器上，他们之间的调用都像是本地的方法互调一样 image-20220521205517334","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/Netty/04-Netty-RPC.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"04-Netty-RPC"}],["meta",{"property":"og:description","content":"RPC的基本介绍 Remote Procedure Call——远程调用过程，是一个计算机通讯协议，该协议允许运行于一台计算机程序端调用另一台计算机的子程序，而程序员无序额外的为这个交互作用编程 两个或者多个应用程序都分布在不同的服务器上，他们之间的调用都像是本地的方法互调一样 image-20220521205517334"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Netty"}],["meta",{"property":"article:tag","content":"RPC"}],["meta",{"property":"article:published_time","content":"2022-05-21T20:53:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"04-Netty-RPC\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-21T20:53:00.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"RPC的基本介绍","slug":"rpc的基本介绍","link":"#rpc的基本介绍","children":[]},{"level":2,"title":"整体思路","slug":"整体思路","link":"#整体思路","children":[]},{"level":2,"title":"简单的接口准备","slug":"简单的接口准备","link":"#简单的接口准备","children":[]},{"level":2,"title":"服务端（Netty）的搭建","slug":"服务端-netty-的搭建","link":"#服务端-netty-的搭建","children":[{"level":3,"title":"NettyServer","slug":"nettyserver","link":"#nettyserver","children":[]},{"level":3,"title":"ServerHandler","slug":"serverhandler","link":"#serverhandler","children":[]}]},{"level":2,"title":"客户端Client的搭建","slug":"客户端client的搭建","link":"#客户端client的搭建","children":[{"level":3,"title":"ClientHandler","slug":"clienthandler","link":"#clienthandler","children":[]},{"level":3,"title":"Client","slug":"client","link":"#client","children":[]},{"level":3,"title":"ClientBootstrap","slug":"clientbootstrap","link":"#clientbootstrap","children":[]}]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":7.38,"words":2214},"filePathRelative":"JavaLang/Netty/04-Netty-RPC.md","localizedDate":"2022年5月21日","excerpt":"<h2> RPC的基本介绍</h2>\\n<p>Remote Procedure Call——远程调用过程，是一个计算机通讯协议，该协议允许运行于一台计算机程序端调用另一台计算机的子程序，而程序员无序额外的为这个交互作用编程</p>\\n<p>两个或者多个应用程序都分布在不同的服务器上，他们之间的调用都像是本地的方法互调一样</p>\\n<figure><img src=\\"/images/Netty/04-Netty-RPC/image-20220521205517334.png\\" alt=\\"image-20220521205517334\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20220521205517334</figcaption></figure>","autoDesc":true}');export{e as data};
