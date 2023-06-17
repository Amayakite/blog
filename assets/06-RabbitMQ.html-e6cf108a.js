const e=JSON.parse('{"key":"v-14a0023e","path":"/JavaLang/SpringBoot/06-RabbitMQ.html","title":"06-RabbitMQ","lang":"zh-CN","frontmatter":{"title":"06-RabbitMQ","date":"2021-12-27T22:56:30.000Z","category":"SpringBoot","tag":["RabbitMQ","SpringBoot"],"description":"简介 感觉没啥好说的 暂时可以把这个玩意当成另一个Mysql或者Redis来看待，总之 是为了之后的Spring Cloud做铺垫 这里的课程看的是狂神的 cardImage cardImage2","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/SpringBoot/06-RabbitMQ.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"06-RabbitMQ"}],["meta",{"property":"og:description","content":"简介 感觉没啥好说的 暂时可以把这个玩意当成另一个Mysql或者Redis来看待，总之 是为了之后的Spring Cloud做铺垫 这里的课程看的是狂神的 cardImage cardImage2"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"RabbitMQ"}],["meta",{"property":"article:tag","content":"SpringBoot"}],["meta",{"property":"article:published_time","content":"2021-12-27T22:56:30.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"06-RabbitMQ\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-12-27T22:56:30.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[{"level":3,"title":"AMQP协议","slug":"amqp协议","link":"#amqp协议","children":[]},{"level":3,"title":"MQTT协议","slug":"mqtt协议","link":"#mqtt协议","children":[]},{"level":3,"title":"OpenMessage协议","slug":"openmessage协议","link":"#openmessage协议","children":[]},{"level":3,"title":"Kafka协议","slug":"kafka协议","link":"#kafka协议","children":[]},{"level":3,"title":"消息分发策略的机制和对比","slug":"消息分发策略的机制和对比","link":"#消息分发策略的机制和对比","children":[]}]},{"level":2,"title":"RabbitMQ的入门及安装","slug":"rabbitmq的入门及安装","link":"#rabbitmq的入门及安装","children":[{"level":3,"title":"普通的安装方式","slug":"普通的安装方式","link":"#普通的安装方式","children":[]},{"level":3,"title":"docker的安装方式","slug":"docker的安装方式","link":"#docker的安装方式","children":[]},{"level":3,"title":"RabbitMQ的角色权限相关说明","slug":"rabbitmq的角色权限相关说明","link":"#rabbitmq的角色权限相关说明","children":[]}]},{"level":2,"title":"RabbitMQ入门案例-Simple简单模式","slug":"rabbitmq入门案例-simple简单模式","link":"#rabbitmq入门案例-simple简单模式","children":[{"level":3,"title":"代码实现","slug":"代码实现","link":"#代码实现","children":[]},{"level":3,"title":"什么是AMQP","slug":"什么是amqp","link":"#什么是amqp","children":[]},{"level":3,"title":"RabbitMQ的组件和架构","slug":"rabbitmq的组件和架构","link":"#rabbitmq的组件和架构","children":[]}]},{"level":2,"title":"图形化操作","slug":"图形化操作","link":"#图形化操作","children":[{"level":3,"title":"使用图形化界面完成HelloWorld","slug":"使用图形化界面完成helloworld","link":"#使用图形化界面完成helloworld","children":[]},{"level":3,"title":"Fanout-生产消费者模式-控制面板实现","slug":"fanout-生产消费者模式-控制面板实现","link":"#fanout-生产消费者模式-控制面板实现","children":[]},{"level":3,"title":"Routing模式-路由模式-面板实现","slug":"routing模式-路由模式-面板实现","link":"#routing模式-路由模式-面板实现","children":[]},{"level":3,"title":"Topic-模糊匹配的面板实现","slug":"topic-模糊匹配的面板实现","link":"#topic-模糊匹配的面板实现","children":[]},{"level":3,"title":"Header模式-面板实现","slug":"header模式-面板实现","link":"#header模式-面板实现","children":[]}]},{"level":2,"title":"代码实现","slug":"代码实现-1","link":"#代码实现-1","children":[{"level":3,"title":"准备工作-工具类","slug":"准备工作-工具类","link":"#准备工作-工具类","children":[]},{"level":3,"title":"Fanout-生产消费者模式","slug":"fanout-生产消费者模式","link":"#fanout-生产消费者模式","children":[]},{"level":3,"title":"Routing-路由模式","slug":"routing-路由模式","link":"#routing-路由模式","children":[]},{"level":3,"title":"Topic-模糊匹配","slug":"topic-模糊匹配","link":"#topic-模糊匹配","children":[]}]},{"level":2,"title":"通过代码来完成绑定交换机和队列","slug":"通过代码来完成绑定交换机和队列","link":"#通过代码来完成绑定交换机和队列","children":[]},{"level":2,"title":"Work-工作队列模式","slug":"work-工作队列模式","link":"#work-工作队列模式","children":[{"level":3,"title":"轮询模式","slug":"轮询模式","link":"#轮询模式","children":[]},{"level":3,"title":"公平分发模式","slug":"公平分发模式","link":"#公平分发模式","children":[]}]},{"level":2,"title":"RabbitMq的实际应用场景","slug":"rabbitmq的实际应用场景","link":"#rabbitmq的实际应用场景","children":[]},{"level":2,"title":"SpringBoot整合RabbitMQ","slug":"springboot整合rabbitmq","link":"#springboot整合rabbitmq","children":[{"level":3,"title":"添加依赖","slug":"添加依赖","link":"#添加依赖","children":[]},{"level":3,"title":"修改配置文件","slug":"修改配置文件","link":"#修改配置文件","children":[]},{"level":3,"title":"Fanout模式-生产者","slug":"fanout模式-生产者","link":"#fanout模式-生产者","children":[]},{"level":3,"title":"Fanout模式-消费者","slug":"fanout模式-消费者","link":"#fanout模式-消费者","children":[]},{"level":3,"title":"Routing(direct)模式-路由","slug":"routing-direct-模式-路由","link":"#routing-direct-模式-路由","children":[]},{"level":3,"title":"TOPIC模式-模糊匹配（额外附带注解替换配置类）","slug":"topic模式-模糊匹配-额外附带注解替换配置类","link":"#topic模式-模糊匹配-额外附带注解替换配置类","children":[]}]},{"level":2,"title":"RabbitMQ高级开发","slug":"rabbitmq高级开发","link":"#rabbitmq高级开发","children":[{"level":3,"title":"过期时间TTL","slug":"过期时间ttl","link":"#过期时间ttl","children":[]},{"level":3,"title":"死信队列","slug":"死信队列","link":"#死信队列","children":[]}]},{"level":2,"title":"Rabbit内存磁盘的监控","slug":"rabbit内存磁盘的监控","link":"#rabbit内存磁盘的监控","children":[]},{"level":2,"title":"RabbitMQ的集群搭建","slug":"rabbitmq的集群搭建","link":"#rabbitmq的集群搭建","children":[{"level":3,"title":"主从节点","slug":"主从节点","link":"#主从节点","children":[]}]},{"level":2,"title":"镜像集群","slug":"镜像集群","link":"#镜像集群","children":[{"level":3,"title":"SpringBoot连接集群","slug":"springboot连接集群","link":"#springboot连接集群","children":[]}]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":48.98,"words":14695},"filePathRelative":"JavaLang/SpringBoot/06-RabbitMQ.md","localizedDate":"2021年12月27日","excerpt":"<h2> 简介</h2>\\n<p>感觉没啥好说的 暂时可以把这个玩意当成另一个Mysql或者Redis来看待，总之 是为了之后的Spring Cloud做铺垫</p>\\n<p>这里的课程看的是狂神的</p>\\n<figure><img src=\\"/images/SpringBoot/06-RabbitMQ/kuangstudy7a8af1c2-b406-46d9-965e-df81525649cd.png\\" alt=\\"cardImage\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>cardImage</figcaption></figure>\\n<figure><img src=\\"/images/SpringBoot/06-RabbitMQ/kuangstudyb888e5f0-2c0f-4576-af88-0176abfa7832.png\\" alt=\\"cardImage2\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>cardImage2</figcaption></figure>","autoDesc":true}');export{e as data};