const e=JSON.parse('{"key":"v-495f5296","path":"/JavaLang/Thread/6-%E8%BF%9E%E6%8E%A5%E6%B1%A0%E5%92%8C%E7%BA%BF%E7%A8%8B%E6%B1%A0.html","title":"6-连接池和线程池","lang":"zh-CN","frontmatter":{"title":"6-连接池和线程池","date":"2022-01-17T17:23:30.000Z","category":"Thread","tag":["Java","JavaSE","Thread"],"description":"自定义一个连接池 为啥需要连接池？ 例如：一个线上商城应用，QPS达到数千，如果每次请求都重新创建连接和关闭数据库，性能会收到极大的影响，此时如果预先创建好了一批连接，放入连接池。 一次请求到达后，从连接池获取连接，使用完数据后再还给连接池，这样既解约了创建和关闭连接的开销，也实现了连接的重用，不止于让庞大的数据压垮数据库 制作一个简单的连接池 这里面的MockConnection是一个自己实现了Connection的类，里面加了个name属性，和一个name属性的构造方法，没有实现其他的任何代码","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/JavaLang/Thread/6-%E8%BF%9E%E6%8E%A5%E6%B1%A0%E5%92%8C%E7%BA%BF%E7%A8%8B%E6%B1%A0.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"6-连接池和线程池"}],["meta",{"property":"og:description","content":"自定义一个连接池 为啥需要连接池？ 例如：一个线上商城应用，QPS达到数千，如果每次请求都重新创建连接和关闭数据库，性能会收到极大的影响，此时如果预先创建好了一批连接，放入连接池。 一次请求到达后，从连接池获取连接，使用完数据后再还给连接池，这样既解约了创建和关闭连接的开销，也实现了连接的重用，不止于让庞大的数据压垮数据库 制作一个简单的连接池 这里面的MockConnection是一个自己实现了Connection的类，里面加了个name属性，和一个name属性的构造方法，没有实现其他的任何代码"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaSE"}],["meta",{"property":"article:tag","content":"Thread"}],["meta",{"property":"article:published_time","content":"2022-01-17T17:23:30.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"6-连接池和线程池\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-17T17:23:30.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"自定义一个连接池","slug":"自定义一个连接池","link":"#自定义一个连接池","children":[{"level":3,"title":"为啥需要连接池？","slug":"为啥需要连接池","link":"#为啥需要连接池","children":[]},{"level":3,"title":"制作一个简单的连接池","slug":"制作一个简单的连接池","link":"#制作一个简单的连接池","children":[]}]},{"level":2,"title":"自定义线程池","slug":"自定义线程池","link":"#自定义线程池","children":[{"level":3,"title":"为什么要有线程池","slug":"为什么要有线程池","link":"#为什么要有线程池","children":[]},{"level":3,"title":"自定义线程池-阻塞队列","slug":"自定义线程池-阻塞队列","link":"#自定义线程池-阻塞队列","children":[]},{"level":3,"title":"自定义线程池-拒绝策略接口","slug":"自定义线程池-拒绝策略接口","link":"#自定义线程池-拒绝策略接口","children":[]},{"level":3,"title":"自定义线程池-线程池类","slug":"自定义线程池-线程池类","link":"#自定义线程池-线程池类","children":[]},{"level":3,"title":"测试","slug":"测试","link":"#测试","children":[]}]},{"level":2,"title":"ThreadPoolExecutor","slug":"threadpoolexecutor","link":"#threadpoolexecutor","children":[{"level":3,"title":"线程池的状态","slug":"线程池的状态","link":"#线程池的状态","children":[]},{"level":3,"title":"构造方法","slug":"构造方法","link":"#构造方法","children":[]},{"level":3,"title":"newFixedThreadPool","slug":"newfixedthreadpool","link":"#newfixedthreadpool","children":[]},{"level":3,"title":"newCachedThreadPool","slug":"newcachedthreadpool","link":"#newcachedthreadpool","children":[]},{"level":3,"title":"newSingleThreadExecutor","slug":"newsinglethreadexecutor","link":"#newsinglethreadexecutor","children":[]}]},{"level":2,"title":"线程池的提交任务","slug":"线程池的提交任务","link":"#线程池的提交任务","children":[{"level":3,"title":"方法一览","slug":"方法一览","link":"#方法一览","children":[]},{"level":3,"title":"提交线程-submit","slug":"提交线程-submit","link":"#提交线程-submit","children":[]},{"level":3,"title":"提交任务之一次性提交多个任务-invokeAll和invokeAny","slug":"提交任务之一次性提交多个任务-invokeall和invokeany","link":"#提交任务之一次性提交多个任务-invokeall和invokeany","children":[]}]},{"level":2,"title":"关闭线程池","slug":"关闭线程池","link":"#关闭线程池","children":[{"level":3,"title":"shutdown","slug":"shutdown","link":"#shutdown","children":[]},{"level":3,"title":"shutdownNow","slug":"shutdownnow","link":"#shutdownnow","children":[]},{"level":3,"title":"其他方法","slug":"其他方法","link":"#其他方法","children":[]},{"level":3,"title":"shutdown和shutdownNow演示","slug":"shutdown和shutdownnow演示","link":"#shutdown和shutdownnow演示","children":[]}]},{"level":2,"title":"异步模式之工作线程","slug":"异步模式之工作线程","link":"#异步模式之工作线程","children":[{"level":3,"title":"定义","slug":"定义","link":"#定义","children":[]},{"level":3,"title":"饥饿","slug":"饥饿","link":"#饥饿","children":[]},{"level":3,"title":"创建多少个线程池比较合适","slug":"创建多少个线程池比较合适","link":"#创建多少个线程池比较合适","children":[]},{"level":3,"title":"CPU密集型计算应该用的线程池数量","slug":"cpu密集型计算应该用的线程池数量","link":"#cpu密集型计算应该用的线程池数量","children":[]},{"level":3,"title":"IO密集型计算","slug":"io密集型计算","link":"#io密集型计算","children":[]}]},{"level":2,"title":"任务调度线程池","slug":"任务调度线程池","link":"#任务调度线程池","children":[{"level":3,"title":"timer的缺点","slug":"timer的缺点","link":"#timer的缺点","children":[]},{"level":3,"title":"ScheduleThreadPoolExceutor-延时执行","slug":"schedulethreadpoolexceutor-延时执行","link":"#schedulethreadpoolexceutor-延时执行","children":[]},{"level":3,"title":"ScheduleThreadPoolExceutor-定时执行","slug":"schedulethreadpoolexceutor-定时执行","link":"#schedulethreadpoolexceutor-定时执行","children":[]},{"level":3,"title":"正确处理线程池异常的方法","slug":"正确处理线程池异常的方法","link":"#正确处理线程池异常的方法","children":[]},{"level":3,"title":"定时任务的应用-每周四十八点执行任务","slug":"定时任务的应用-每周四十八点执行任务","link":"#定时任务的应用-每周四十八点执行任务","children":[]}]},{"level":2,"title":"Tomcat线程池","slug":"tomcat线程池","link":"#tomcat线程池","children":[{"level":3,"title":"Connector配置","slug":"connector配置","link":"#connector配置","children":[]},{"level":3,"title":"Executor配置","slug":"executor配置","link":"#executor配置","children":[]}]},{"level":2,"title":"Fork/Join 线程池","slug":"fork-join-线程池","link":"#fork-join-线程池","children":[{"level":3,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":3,"title":"使用","slug":"使用","link":"#使用","children":[]}]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":32.78,"words":9834},"filePathRelative":"JavaLang/Thread/6-连接池和线程池.md","localizedDate":"2022年1月17日","excerpt":"<h2> 自定义一个连接池</h2>\\n<h3> 为啥需要连接池？</h3>\\n<p>例如：一个线上商城应用，QPS达到数千，如果每次请求都重新创建连接和关闭数据库，性能会收到极大的影响，此时如果预先创建好了一批连接，放入连接池。<br>\\n一次请求到达后，从连接池获取连接，使用完数据后再还给连接池，这样既解约了创建和关闭连接的开销，也实现了连接的重用，不止于让庞大的数据压垮数据库</p>\\n<h3> 制作一个简单的连接池</h3>\\n<p>这里面的MockConnection是一个自己实现了Connection的类，里面加了个name属性，和一个name属性的构造方法，没有实现其他的任何代码</p>\\n","autoDesc":true}');export{e as data};
