import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as p,e as a,a as n,b as s}from"./app-2d4b26c1.js";const o="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205184528032.png",i="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205195053992.png",c="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205195732361.png",l="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205201946676.png",u="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205210226231.png",r="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205210531384.png",d="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220205211904110.png",k="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206150949655.png",m="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206151113888.png",v="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206151604776.png",b="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206151929790.png",g="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206152351536.png",y="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206153004294.png",f="/images/SpringCloud/21-Spring操作RabbitMQ/image-20220206160845719.png",h={},w=a(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>使用RabbitMQ的核心原则是：为了防止我们的服务被超多的并发冲跨，所以说让Rabbitmq来处理缓冲这些内容</p><p>rabbitmq的消息接受在SpringBoot中是串行的（不是并行），执行完一个消息处理后才能接着处理下一个</p><h2 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span> <span class="token comment">#</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> myserver
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">13009</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> myProjectRabbitMq
    <span class="token key atrule">password</span><span class="token punctuation">:</span> myProjectRabbitMq
    <span class="token key atrule">virtual-host</span><span class="token punctuation">:</span> /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="主类需要的东西" tabindex="-1"><a class="header-anchor" href="#主类需要的东西" aria-hidden="true">#</a> 主类需要的东西</h2>`,8),q=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{java:"",class:"language-java"},[n("code",null,[n("span",{class:"token annotation punctuation"},"@SpringBootApplication"),s(`
`),n("span",{class:"token annotation punctuation"},"@EnableRabbit"),s(`
`),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"OrderApplication"),s(),n("span",{class:"token punctuation"},"{"),s(`

    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"static"),s(),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"String"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(" args"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token class-name"},"SpringApplication"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"OrderApplication"),n("span",{class:"token punctuation"},"."),n("span",{class:"token keyword"},"class"),n("span",{class:"token punctuation"},","),s(" args"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),R=a(`<h2 id="创建交换机、队列、队列和交换机之间的绑定" tabindex="-1"><a class="header-anchor" href="#创建交换机、队列、队列和交换机之间的绑定" aria-hidden="true">#</a> 创建交换机、队列、队列和交换机之间的绑定</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">OrderApplicationTests</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">AmqpAdmin</span> amqpAdmin<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">createExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">/*
        DirectExchange 队列类型是Direct的
         * 参数1 交换机名称
         * 参数2 是否持久化
         * 参数3 是否自动删除
         * */</span>
        <span class="token class-name">DirectExchange</span> directExchange <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DirectExchange</span><span class="token punctuation">(</span><span class="token string">&quot;amaya.order.exchange&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        amqpAdmin<span class="token punctuation">.</span><span class="token function">declareExchange</span><span class="token punctuation">(</span>directExchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/*
         * 参数1 队列名称
         * 参数2 是否持久化
         * 参数3 是否排他（只有当前连接才能使用这个队列）
         * 参数4 是否自动删除
         * */</span>
        amqpAdmin<span class="token punctuation">.</span><span class="token function">declareQueue</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">&quot;amaya.order.queue&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/*
         * 绑定参数：
         * 1. 队列
         * 2. 交换机的类型
         * 3. 交换机
         * 4. 路由key
         * 5. 自定义参数
         * */</span>
        <span class="token class-name">Binding</span> binding <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Binding</span><span class="token punctuation">(</span><span class="token string">&quot;amaya.order.queue&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Binding<span class="token punctuation">.</span>DestinationType</span><span class="token punctuation">.</span><span class="token constant">QUEUE</span><span class="token punctuation">,</span> <span class="token string">&quot;amaya.order.exchange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hello.java&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        amqpAdmin<span class="token punctuation">.</span><span class="token function">declareBinding</span><span class="token punctuation">(</span>binding<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发送消息" tabindex="-1"><a class="header-anchor" href="#发送消息" aria-hidden="true">#</a> 发送消息</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">OrderApplicationTests</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        发送普通消息</span>
<span class="token comment">//        rabbitTemplate.convertAndSend(&quot;amaya.order.exchange&quot;,&quot;hello.java&quot;,&quot;hello world&quot;);</span>
<span class="token comment">//        发送对象消息</span>
        <span class="token class-name">OrderReturnReasonEntity</span> orderReturnReasonEntity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderReturnReasonEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderReturnReasonEntity<span class="token punctuation">.</span><span class="token function">setCreateTime</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderReturnReasonEntity<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderReturnReasonEntity<span class="token punctuation">.</span><span class="token function">setSort</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderReturnReasonEntity<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;aaa&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token string">&quot;amaya.order.exchange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hello.java&quot;</span><span class="token punctuation">,</span> orderReturnReasonEntity<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;发送消息成功，消息内容：{}&quot;</span><span class="token punctuation">,</span> orderReturnReasonEntity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置序列化方式" tabindex="-1"><a class="header-anchor" href="#配置序列化方式" aria-hidden="true">#</a> 配置序列化方式</h2><p>默认我也不知道是啥，这里可以换成json</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>amayakite<span class="token punctuation">.</span>shop<span class="token punctuation">.</span>order<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token comment">// 注意是这几个包，建议复制</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>support<span class="token punctuation">.</span>converter<span class="token punctuation">.</span></span><span class="token class-name">Jackson2JsonMessageConverter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>support<span class="token punctuation">.</span>converter<span class="token punctuation">.</span></span><span class="token class-name">MessageConverter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject shop
 * @BelongsPackage com.amayakite.shop.order.config
 * <span class="token keyword">@date</span> 2022/2/5 18:36
 * <span class="token keyword">@description</span> 项目描述
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">MessageConverter</span> <span class="token function">messageConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Jackson2JsonMessageConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切换成功后发送消息会在header后看得到类名</p><figure><img src="`+o+`" alt="image-20220205184528032" tabindex="0" loading="lazy"><figcaption>image-20220205184528032</figcaption></figure><h2 id="接收消息" tabindex="-1"><a class="header-anchor" href="#接收消息" aria-hidden="true">#</a> 接收消息</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestReviseMessage</span> <span class="token punctuation">{</span>

    <span class="token comment">// queues指定接收的队列</span>
    <span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;amaya.order.queue&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reviveMessage</span><span class="token punctuation">(</span><span class="token class-name">Object</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;接收到消息：&quot;</span> <span class="token operator">+</span> message <span class="token operator">+</span> <span class="token string">&quot;类型是：&quot;</span> <span class="token operator">+</span> message<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发送一条后，收到的消息为：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>收到消息：
(
	Body:&#39;[B@4ad120cb(byte[71])&#39; MessageProperties 
[
headers={<span class="token bold"><span class="token punctuation">__</span><span class="token content">TypeId</span><span class="token punctuation">__</span></span>=com.amayakite.shop.order.entity.OrderReturnReasonEntity}, contentType=application/json, 
contentEncoding=UTF-8, 
contentLength=0, 
receivedDeliveryMode=PERSISTENT, 
priority=0, 
redelivered=false, 
receivedExchange=amaya.order.exchange, 
receivedRoutingKey=hello.java, 
deliveryTag=1, 
consumerTag=amq.ctag-V7EguqSCz3b4XW_nYiWp1Q, 
consumerQueue=amaya.order.queue
])，
消息的类型是：class org.springframework.amqp.core.Message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型是<code>org.springframework.amqp.core.Message</code>，所以我们可以直接接收这种类型，但是它的body是一个数组，转换器来比较麻烦，所以可以这样做</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>amayakite<span class="token punctuation">.</span>shop<span class="token punctuation">.</span>order<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>amayakite<span class="token punctuation">.</span>shop<span class="token punctuation">.</span>order<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">OrderReturnReasonEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">Channel</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">Message</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>rabbit<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RabbitListener</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject shop
 * @BelongsPackage com.amayakite.shop.order.service
 * <span class="token keyword">@date</span> 2022/2/5 18:46
 * <span class="token keyword">@description</span> 项目描述
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestReviseMessage</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * queues : 接收队列名称 可以是多个
     *
     * <span class="token keyword">@param</span> <span class="token parameter">message</span> 原生的消息类型，头+体
     * <span class="token keyword">@param</span> <span class="token parameter">context</span> 这里是我们自己的实体类 直接声明获取即可
     * <span class="token keyword">@param</span> <span class="token parameter">channel</span> 接收消息的通道
     */</span>
    <span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;amaya.order.queue&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reviveMessage</span><span class="token punctuation">(</span>
            <span class="token class-name">Message</span> message<span class="token punctuation">,</span>
            <span class="token class-name">OrderReturnReasonEntity</span> context<span class="token punctuation">,</span>
            <span class="token class-name">Channel</span> channel
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;收到消息：{}，消息的类型是：{}&quot;</span><span class="token punctuation">,</span> message<span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息内容是：{}&quot;</span><span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息通道为：{}&quot;</span><span class="token punctuation">,</span> channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>消息内容是：
OrderReturnReasonEntity(id=1, name=aaa, sort=1, status=null, createTime=Sat Feb 05 19:26:31 CST 2022)
消息通道为：
Cached Rabbit Channel: AMQChannel(amqp://myProjectRabbitMq@127.0.0.1:13009/,1), conn: Proxy@1a8e209b Shared Rabbit Connection: SimpleConnection@559baea1 [delegate=amqp://myProjectRabbitMq@127.0.0.1:13009/, localPort= 56487]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rabbitlistener和-rabbithandler" tabindex="-1"><a class="header-anchor" href="#rabbitlistener和-rabbithandler" aria-hidden="true">#</a> @RabbitListener和@RabbitHandler</h2><p><code>@RabbitListener</code>这个东西可以放在类上，一般用于声明要监听的队列</p><p>另外一位则是只能标注在方法上</p><p>也就是说我们可以这样用</p><p>注意 这里的方法不能重载，一个方法只能声明接受一种类型的消息，如果说通过重载来声明接受多个则会报错</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;amaya.order.queue&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestReviseMessage</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reviveMessage1</span><span class="token punctuation">(</span><span class="token class-name">OrderReturnReasonEntity</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;reviveMessage-OrderReturnReasonEntity消息内容是：{}&quot;</span><span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reviveMessage2</span><span class="token punctuation">(</span><span class="token class-name">String</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;reviveMessage-String消息内容是：{}&quot;</span><span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后写一个类测试</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/test1&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">OrderReturnReasonEntity</span> orderReturnReasonEntity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderReturnReasonEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderReturnReasonEntity<span class="token punctuation">.</span><span class="token function">setCreateTime</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderReturnReasonEntity<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderReturnReasonEntity<span class="token punctuation">.</span><span class="token function">setSort</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderReturnReasonEntity<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;aaa&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token string">&quot;amaya.order.exchange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hello.java&quot;</span><span class="token punctuation">,</span> orderReturnReasonEntity<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/test2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token string">&quot;amaya.order.exchange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hello.java&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="消息确认机制" tabindex="-1"><a class="header-anchor" href="#消息确认机制" aria-hidden="true">#</a> 消息确认机制</h2><p>emm性能下降250倍时官方说的，是真的.</p><figure><img src="`+i+'" alt="image-20220205195053992" tabindex="0" loading="lazy"><figcaption>image-20220205195053992</figcaption></figure><h2 id="可靠投递" tabindex="-1"><a class="header-anchor" href="#可靠投递" aria-hidden="true">#</a> 可靠投递</h2><p>开一个设置即可</p><figure><img src="'+c+'" alt="image-20220205195732361" tabindex="0" loading="lazy"><figcaption>image-20220205195732361</figcaption></figure><p>当然 SpringBoot2.2之后这玩意已经被废弃了，无法配置，需要这样来进行配置：</p>',32),x=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml"},[n("pre",{yaml:"",class:"language-yaml"},[n("code",null,[n("span",{class:"token punctuation"},"---"),s(),n("span",{class:"token comment"},"#"),s(`
`),n("span",{class:"token key atrule"},"spring"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"rabbitmq"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"host"),n("span",{class:"token punctuation"},":"),s(` myserver
    `),n("span",{class:"token key atrule"},"port"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"13009"),s(`
    `),n("span",{class:"token key atrule"},"username"),n("span",{class:"token punctuation"},":"),s(` myProjectRabbitMq
    `),n("span",{class:"token key atrule"},"password"),n("span",{class:"token punctuation"},":"),s(` myProjectRabbitMq
    `),n("span",{class:"token key atrule"},"virtual-host"),n("span",{class:"token punctuation"},":"),s(` /
    `),n("span",{class:"token key atrule"},"publisher-confirm-type"),n("span",{class:"token punctuation"},":"),s(` correlated
`),n("span",{class:"token punctuation"},"---"),s(),n("span",{class:"token comment"},"# 防止bean之间相互注入冲突，这个配置不可放进nacos"),s(`
`),n("span",{class:"token key atrule"},"spring"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"main"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"allow-circular-references"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token boolean important"},"true"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),M=a(`<p>然后加一个配置类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">MessageConverter</span> <span class="token function">messageConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Jackson2JsonMessageConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * -@PostConstruct 在这个rabbitconfig对象创建完成后执行通过这个注解标注的方法
     */</span>
    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initRabbitTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setConfirmCallback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RabbitTemplate<span class="token punctuation">.</span>ConfirmCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             *
             * <span class="token keyword">@param</span> <span class="token parameter">correlationData</span> 当前消息的唯一关联数据（消息的唯一id） 如果说投递成功这里是null
             * <span class="token keyword">@param</span> <span class="token parameter">b</span> 消息是否成功收到
             * <span class="token keyword">@param</span> <span class="token parameter">s</span> 失败的原因
             */</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token class-name">CorrelationData</span> correlationData<span class="token punctuation">,</span> <span class="token keyword">boolean</span> b<span class="token punctuation">,</span> <span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息的CorrelationData为：{}&quot;</span><span class="token punctuation">,</span>correlationData<span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息是否成功收到：{}&quot;</span><span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;如果失败了，失败的原因：{}&quot;</span><span class="token punctuation">,</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可靠抵达" tabindex="-1"><a class="header-anchor" href="#可靠抵达" aria-hidden="true">#</a> 可靠抵达</h2><figure><img src="`+l+`" alt="image-20220205201946676" tabindex="0" loading="lazy"><figcaption>image-20220205201946676</figcaption></figure><p>Spring2.5+这样配置</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span> <span class="token comment">#</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> myserver
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">13009</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> myProjectRabbitMq
    <span class="token key atrule">password</span><span class="token punctuation">:</span> myProjectRabbitMq
    <span class="token key atrule">virtual-host</span><span class="token punctuation">:</span> /
    <span class="token comment"># 发送端确认</span>
    <span class="token key atrule">publisher-confirm-type</span><span class="token punctuation">:</span> correlated
    <span class="token comment"># 消息抵达队列确认</span>
    <span class="token key atrule">publisher-returns</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">template</span><span class="token punctuation">:</span>
      <span class="token comment"># 只要抵达队列，以异步模式优先回调我们这个returnCallback 可选 可以不配置</span>
      <span class="token key atrule">mandatory</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

<span class="token punctuation">---</span> <span class="token comment"># 防止bean之间相互注入冲突，这个配置不可放进nacos</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">main</span><span class="token punctuation">:</span>
    <span class="token key atrule">allow-circular-references</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后配置类这样配置</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>amayakite<span class="token punctuation">.</span>shop<span class="token punctuation">.</span>order<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">Message</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">ReturnedMessage</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>rabbit<span class="token punctuation">.</span>connection<span class="token punctuation">.</span></span><span class="token class-name">CorrelationData</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>rabbit<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">RabbitTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>support<span class="token punctuation">.</span>converter<span class="token punctuation">.</span></span><span class="token class-name">Jackson2JsonMessageConverter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>amqp<span class="token punctuation">.</span>support<span class="token punctuation">.</span>converter<span class="token punctuation">.</span></span><span class="token class-name">MessageConverter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostConstruct</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject shop
 * @BelongsPackage com.amayakite.shop.order.config
 * <span class="token keyword">@date</span> 2022/2/5 18:36
 * <span class="token keyword">@description</span> 项目描述
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">MessageConverter</span> <span class="token function">messageConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Jackson2JsonMessageConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * -@PostConstruct 在这个rabbitconfig对象创建完成后执行通过这个注解标注的方法
     */</span>
    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initRabbitTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 这里是消息只要发出，就会触发这个函数
         */</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setConfirmCallback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RabbitTemplate<span class="token punctuation">.</span>ConfirmCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             * 只要消息抵达了Broker（也就是RabbitMQ）就返回true，没抵达，才会返回false
             * <span class="token keyword">@param</span> <span class="token parameter">correlationData</span> 当前消息的唯一关联数据（消息的唯一id）
             * <span class="token keyword">@param</span> <span class="token parameter">b</span> 消息是否成功收到
             * <span class="token keyword">@param</span> <span class="token parameter">s</span> 失败的原因
             */</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">confirm</span><span class="token punctuation">(</span><span class="token class-name">CorrelationData</span> correlationData<span class="token punctuation">,</span> <span class="token keyword">boolean</span> b<span class="token punctuation">,</span> <span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息的CorrelationData为：{}&quot;</span><span class="token punctuation">,</span> correlationData<span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息是否成功收到：{}&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;如果失败了，失败的原因：{}&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
        * 这里的回调函数只有在消息发送失败的时候才会调用，如果消息发送成功，则不会调用
        * */</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">setReturnsCallback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RabbitTemplate<span class="token punctuation">.</span>ReturnsCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">returnedMessage</span><span class="token punctuation">(</span><span class="token class-name">ReturnedMessage</span> returnedMessage<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Message</span> message <span class="token operator">=</span> returnedMessage<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息的内容为：{}&quot;</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> exchange <span class="token operator">=</span> returnedMessage<span class="token punctuation">.</span><span class="token function">getExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息的交换机为：{}&quot;</span><span class="token punctuation">,</span> exchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> routingKey <span class="token operator">=</span> returnedMessage<span class="token punctuation">.</span><span class="token function">getRoutingKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息的路由键为：{}&quot;</span><span class="token punctuation">,</span> routingKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> replyCode <span class="token operator">=</span> returnedMessage<span class="token punctuation">.</span><span class="token function">getReplyCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息的回复码为：{}&quot;</span><span class="token punctuation">,</span> replyCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> replyText <span class="token operator">=</span> returnedMessage<span class="token punctuation">.</span><span class="token function">getReplyText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;消息的回复内容为：{}&quot;</span><span class="token punctuation">,</span> replyText<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着你可以写一个不存在的队列或者不存在的交换机来进行测试</p><h2 id="可靠接收-手动确认" tabindex="-1"><a class="header-anchor" href="#可靠接收-手动确认" aria-hidden="true">#</a> 可靠接收-手动确认</h2><figure><img src="`+u+'" alt="image-20220205210226231" tabindex="0" loading="lazy"><figcaption>image-20220205210226231</figcaption></figure><p>配置：</p>',12),C=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml"},[n("pre",{yaml:"",class:"language-yaml"},[n("code",null,[n("span",{class:"token punctuation"},"---"),s(),n("span",{class:"token comment"},"#"),s(`
`),n("span",{class:"token key atrule"},"spring"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"rabbitmq"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"host"),n("span",{class:"token punctuation"},":"),s(` myserver
    `),n("span",{class:"token key atrule"},"port"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"13009"),s(`
    `),n("span",{class:"token key atrule"},"username"),n("span",{class:"token punctuation"},":"),s(` myProjectRabbitMq
    `),n("span",{class:"token key atrule"},"password"),n("span",{class:"token punctuation"},":"),s(` myProjectRabbitMq
    `),n("span",{class:"token key atrule"},"virtual-host"),n("span",{class:"token punctuation"},":"),s(` /
    `),n("span",{class:"token key atrule"},"listener"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token key atrule"},"simple"),n("span",{class:"token punctuation"},":"),s(`
        `),n("span",{class:"token key atrule"},"acknowledge-mode"),n("span",{class:"token punctuation"},":"),s(` manual
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," ")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),S=a('<p>开启后，如果有队列正在监听对应的消息，并且没有签收，消息是处于Unacked状态</p><figure><img src="'+r+`" alt="image-20220205210531384" tabindex="0" loading="lazy"><figcaption>image-20220205210531384</figcaption></figure><p>如果没有东西在监听，则会处于ready状态</p><p>接收需要如下操作，正常来说会再加一个redis缓冲，收到对象后将对象的唯一id存储在redis内进行确认有没有重复的，如果有就在这里直接接收，如果没有就进行处理之后再来接收</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RabbitHandler</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reviveMessage1</span><span class="token punctuation">(</span><span class="token class-name">OrderReturnReasonEntity</span> context<span class="token punctuation">,</span> <span class="token class-name">Message</span> message<span class="token punctuation">,</span> <span class="token class-name">Channel</span> channel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;当前的线程是：{}&quot;</span><span class="token punctuation">,</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;reviveMessage-OrderReturnReasonEntity消息内容是：{}&quot;</span><span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//        这个deliveryTag 是自增且不重复的，在一个channel中是唯一的</span>
    <span class="token keyword">long</span> deliveryTag <span class="token operator">=</span> message<span class="token punctuation">.</span><span class="token function">getMessageProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeliveryTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 需要通过deliveryTag来确认接收，第二个参数是是否批量确认，true为批量确认，false为单个确认</span>
        <span class="token comment">// 如果是true 的话 例如deliveryTag=3，则1,2,3都会被确认</span>
        channel<span class="token punctuation">.</span><span class="token function">basicAck</span><span class="token punctuation">(</span>deliveryTag<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//            这里的异常只有可能是网络异常，可以啥都不做</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然 也可以拒绝</p><figure><img src="`+d+'" alt="image-20220205211904110" tabindex="0" loading="lazy"><figcaption>image-20220205211904110</figcaption></figure><h2 id="延时队列" tabindex="-1"><a class="header-anchor" href="#延时队列" aria-hidden="true">#</a> 延时队列</h2><figure><img src="'+k+'" alt="image-20220206150949655" tabindex="0" loading="lazy"><figcaption>image-20220206150949655</figcaption></figure><p>就是想定时的去做什么事情，例如订单的删除之类的，自己整又不太精确，所以就可以这样</p><p>首先回顾下RabbitMQ的TTL 存活时间</p><figure><img src="'+m+'" alt="image-20220206151113888" tabindex="0" loading="lazy"><figcaption>image-20220206151113888</figcaption></figure><p>以及死信队列</p><figure><img src="'+v+'" alt="image-20220206151604776" tabindex="0" loading="lazy"><figcaption>image-20220206151604776</figcaption></figure><p>所以说，我们可以让消费者读取死信队列来完成这一套操作</p><figure><img src="'+b+'" alt="image-20220206151929790" tabindex="0" loading="lazy"><figcaption>image-20220206151929790</figcaption></figure><p>例如：</p><figure><img src="'+g+'" alt="image-20220206152351536" tabindex="0" loading="lazy"><figcaption>image-20220206152351536</figcaption></figure><p>也就是：</p><figure><img src="'+y+`" alt="image-20220206153004294" tabindex="0" loading="lazy"><figcaption>image-20220206153004294</figcaption></figure><h2 id="通过注解方式来完成延时队列" tabindex="-1"><a class="header-anchor" href="#通过注解方式来完成延时队列" aria-hidden="true">#</a> 通过注解方式来完成延时队列</h2><p>注意 在SpringBoot中，<strong>这些bean的加载是懒加载</strong>….也就是当我们调用了什么rabbitMQTempalte之类的才会加载…. 所以<strong>发送方和接收方都需要声明好</strong></p><p>做完了之后，正常的发送和接收即可</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyRabbitVoConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 容器中的bean 只要是交换机、队列、绑定等，都会自动在RabbitMQ中创建(前提是RabbitMQ中没有)，只要加一个@bean即可
     * 交换机命名规范：中横线
     * 队列命名规范：点
     * 绑定规范（router）：下划线
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Exchange</span> <span class="token function">orderEventExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        声明交换机，如果一个交换机要绑定多个队列的话，一般都是用Topic</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TopicExchange</span><span class="token punctuation">(</span><span class="token string">&quot;order-event-exchange&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">orderDelayQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/*
         * x-dead-letter-exchange 声明了队列里的死信转发到的DLX名称，也就是目标交换机
         * x-dead-letter-routing-key 声明了这些死信在转发时携带的 routing-key 名称 也就是具体要投递到哪个队列
         * x-message-ttl 声明了这些死信在转发到交换机前的存活时间，单位是毫秒。
         * */</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> arguments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        arguments<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;x-dead-letter-exchange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;order-event-exchange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        arguments<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;x-dead-letter-routing-key&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;order_release_key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        过期时间， 这里为了方便测试，先来个60s</span>
        arguments<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;x-message-ttl&quot;</span><span class="token punctuation">,</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Queue</span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">&quot;order.delay.queue&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> queue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 死信的接收队列
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">orderReleaseQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        不需要额外的参数之类的</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">&quot;order.release.queue&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 绑定普通的队列和交换机
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">orderCreateOrderBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Binding</span><span class="token punctuation">(</span>
                <span class="token comment">//                第一个参数，目的地的名称，也就是队列名称</span>
                <span class="token string">&quot;order.delay.queue&quot;</span><span class="token punctuation">,</span>
                <span class="token comment">//                第二个参数，目的地的类型 也就是队列类型</span>
                <span class="token class-name">Binding<span class="token punctuation">.</span>DestinationType</span><span class="token punctuation">.</span><span class="token constant">QUEUE</span><span class="token punctuation">,</span>
                <span class="token comment">//                第三个参数，交换机名称</span>
                <span class="token string">&quot;order-event-exchange&quot;</span><span class="token punctuation">,</span>
                <span class="token comment">//                第四个参数，router key</span>
                <span class="token string">&quot;order_create_key&quot;</span><span class="token punctuation">,</span>
                <span class="token comment">//                第五个参数 可选 arguments</span>
                <span class="token keyword">null</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">orderReleaseOrderBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Binding</span><span class="token punctuation">(</span>
                <span class="token comment">//                第一个参数，目的地的名称，也就是队列名称</span>
                <span class="token string">&quot;order.release.queue&quot;</span><span class="token punctuation">,</span>
                <span class="token comment">//                第二个参数，目的地的类型 也就是队列类型</span>
                <span class="token class-name">Binding<span class="token punctuation">.</span>DestinationType</span><span class="token punctuation">.</span><span class="token constant">QUEUE</span><span class="token punctuation">,</span>
                <span class="token comment">//                第三个参数，交换机名称</span>
                <span class="token string">&quot;order-event-exchange&quot;</span><span class="token punctuation">,</span>
                <span class="token comment">//                第四个参数，router key</span>
                <span class="token string">&quot;order_release_key&quot;</span><span class="token punctuation">,</span>
                <span class="token comment">//                第五个参数 可选 arguments</span>
                <span class="token keyword">null</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建好了之后，随便发送一条消息，等待一分钟后的队列情况如下</p><figure><img src="`+f+'" alt="image-20220206160845719" tabindex="0" loading="lazy"><figcaption>image-20220206160845719</figcaption></figure>',26),j=[w,q,R,x,M,C,S];function _(T,E){return t(),p("div",null,j)}const A=e(h,[["render",_],["__file","21-Spring操作RabbitMQ.html.vue"]]);export{A as default};
