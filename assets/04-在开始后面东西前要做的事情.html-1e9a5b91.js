import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as n,b as s,d as p,e}from"./app-3ab2953d.js";const i="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211204222310139.png",u="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211205001820005.png",k="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211205124137570.png",r="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211205154054107.png",d="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211205154532394.png",m="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211205162249295.png",v="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211205172912530.png",b="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211205231138772.png",y="/images/Java/JavaEE/04-在开始后面东西前要做的事情/image-20211205231149807.png",w={},g=n("p",null,"把前面的内容结合一下，制作一个简单的书城登录程序吧",-1),h=n("h2",{id:"前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),s(" 前言")],-1),f=n("p",null,"在正式开始后续的学习前，得先了解下JavaWeb应用的三层架构：",-1),q=n("figure",null,[n("img",{src:i,alt:"image-20211204222310139",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20211204222310139")],-1),S=n("p",null,"分层的目的是为了解耦，解耦就是为了降低代码的耦合度，方便后期的维护和升级",-1),U={href:"http://com.books.web",target:"_blank",rel:"noopener noreferrer"},j=e("<li>Service层 <ul><li>com.books.service Service接口包</li><li>com.books.service.impl 接口实现包</li></ul></li><li>dao持久层 <ul><li>com.book.dao Dao接口包</li><li>com.books.dao.impl 接口实现类</li></ul></li><li>实体bean对象 <ul><li>com.books/entity/domain/bean JavaBean类</li></ul></li><li>测试包 <ul><li>com.booksProject.test/junit</li></ul></li><li>工具类 <ul><li>com.books.utils</li></ul></li>",5),_=e('<p>基本上这些包就够了</p><p>我们来创建一个新的项目:并且创建如下的内容：</p><figure><img src="'+u+`" alt="image-20211205001820005" tabindex="0" loading="lazy"><figcaption>image-20211205001820005</figcaption></figure><p>然后首先就是设计下数据库，我们就来个book数据库吧</p><h2 id="设计数据库" tabindex="-1"><a class="header-anchor" href="#设计数据库" aria-hidden="true">#</a> 设计数据库</h2><p>我这里是mysql8 到时候密码用sha1来进行加密</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">drop</span> <span class="token keyword">database</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> book<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">database</span> book<span class="token punctuation">;</span>
<span class="token keyword">use</span> book<span class="token punctuation">;</span>
<span class="token comment">-- 存放用户数据的</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span> t_user<span class="token punctuation">(</span>
 id <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span>
    username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">unique</span><span class="token punctuation">,</span>
    password <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    email <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t_user <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token boolean">null</span><span class="token punctuation">,</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456&quot;</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> t_user<span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">----+----------+----------+-------+</span>
<span class="token operator">|</span> id <span class="token operator">|</span> username <span class="token operator">|</span> password <span class="token operator">|</span> email <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+----------+----------+-------+</span>
<span class="token operator">|</span>  <span class="token number">1</span> <span class="token operator">|</span> admin    <span class="token operator">|</span> <span class="token number">123456</span>   <span class="token operator">|</span> <span class="token boolean">NULL</span>  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+----------+----------+-------+</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后要在Java中设计一个User类的bean对象</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>pojo</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.pojo
 * <span class="token keyword">@date</span> 2021/12/5 0:26
 * <span class="token keyword">@description</span> User的bean（pojo）对象
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 无参是为了后面使用 那啥来着-管理数据库查询结果的类更好的匹配上
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>username <span class="token operator">=</span> username<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>password <span class="token operator">=</span> password<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>email <span class="token operator">=</span> email<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//相关的getset和tostring</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，还要做一个JDBCUtils来更方便的获取连接</p>`,10),x={href:"https://mvnrepository.com/artifact/com.alibaba/druid",target:"_blank",rel:"noopener noreferrer"},C={href:"https://mvnrepository.com/artifact/mysql/mysql-connector-java",target:"_blank",rel:"noopener noreferrer"},E={href:"https://mvnrepository.com/artifact/commons-dbutils/commons-dbutils",target:"_blank",rel:"noopener noreferrer"},B=e('<h2 id="完成jdbcutils和读取db-properties" tabindex="-1"><a class="header-anchor" href="#完成jdbcutils和读取db-properties" aria-hidden="true">#</a> 完成JDBCUtils和读取db.properties</h2><p>这里走了一点坑：<code>db.utils</code>放在resources文件夹下</p><figure><img src="'+k+'" alt="image-20211205124137570" tabindex="0" loading="lazy"><figcaption>image-20211205124137570</figcaption></figure><p>然后再读取这个文件：</p><p>用到的方法：通过反射来读取配置文件：</p><p><code>JdbcUtils.class.getClassLoader().getResourceAsStream(&quot;db.properties&quot;)</code></p>',6),J=n("li",null,"获取JdbcUtils的class",-1),D=n("li",null,"获取类加载器(getClassLoader)",-1),O=n("li",null,"通过给定名称获取指定资源(getResourceAsStream)",-1),R=n("li",null,"这玩意具体的要到JVM底层才能了解到，目前来说上面这句话的意思就是：",-1),P=n("li",null,"当前项目根路径读取资源，如果是WebApp，那么默认就在部署后的classes文件夹下读取资源",-1),L={href:"https://www.cnblogs.com/macwhirr/p/8116583.html",target:"_blank",rel:"noopener noreferrer"},H=e(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>dao<span class="token punctuation">.</span>impl</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">JdbcUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbutils<span class="token punctuation">.</span></span><span class="token class-name">QueryRunner</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbutils<span class="token punctuation">.</span>handlers<span class="token punctuation">.</span></span><span class="token class-name">BeanHandler</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbutils<span class="token punctuation">.</span>handlers<span class="token punctuation">.</span></span><span class="token class-name">BeanListHandler</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbutils<span class="token punctuation">.</span>handlers<span class="token punctuation">.</span></span><span class="token class-name">ScalarHandler</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">Connection</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">SQLException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.dao
 * <span class="token keyword">@date</span> 2021/12/5 11:48
 * <span class="token keyword">@description</span> 开发BasicDao，是其他Dao的父类
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BasicDao</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token class-name">QueryRunner</span> queryRunner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 通用的修改方法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 可选字段
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
<span class="token comment">//            关闭和数据库的连接</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 执行其他的sql语句
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 参数 可选
     * <span class="token keyword">@return</span> 一个int  代表受影响的行数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
<span class="token comment">//            关闭和数据库的连接</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 通用的查找方法 查找结果返回一个List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">clazz</span>  一个类的Class对象
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 可选字段
     * <span class="token keyword">@return</span> List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BeanListHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
<span class="token comment">//            关闭和数据库的连接</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 通用的查找方法 查找结果返回一个T
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">clazz</span>  一个类的Class对象
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 可选字段
     * <span class="token keyword">@return</span> T
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">selectForOne</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BeanHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回单行某个字段
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 可选 参数列表
     * <span class="token keyword">@return</span> 一个Object，Object的运行类型根据返回值而定
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">selectForOneField</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ScalarHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
<span class="token comment">//            关闭和数据库的连接</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="完成basicdao和userdao" tabindex="-1"><a class="header-anchor" href="#完成basicdao和userdao" aria-hidden="true">#</a> 完成BasicDao和UserDao</h2><h3 id="basicdao" tabindex="-1"><a class="header-anchor" href="#basicdao" aria-hidden="true">#</a> BasicDao</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>dao</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">JdbcUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbutils<span class="token punctuation">.</span></span><span class="token class-name">QueryRunner</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbutils<span class="token punctuation">.</span>handlers<span class="token punctuation">.</span></span><span class="token class-name">BeanHandler</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbutils<span class="token punctuation">.</span>handlers<span class="token punctuation">.</span></span><span class="token class-name">BeanListHandler</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbutils<span class="token punctuation">.</span>handlers<span class="token punctuation">.</span></span><span class="token class-name">ScalarHandler</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">Connection</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">SQLException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.dao
 * <span class="token keyword">@date</span> 2021/12/5 11:48
 * <span class="token keyword">@description</span> 开发BasicDao，是其他Dao的父类
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BasicDao</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token class-name">QueryRunner</span> queryRunner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 通用的修改方法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 可选字段
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
<span class="token comment">//            关闭和数据库的连接</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 执行其他的sql语句
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 参数 可选
     * <span class="token keyword">@return</span> 一个int  代表受影响的行数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
<span class="token comment">//            关闭和数据库的连接</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 通用的查找方法 查找结果返回一个List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">clazz</span>  一个类的Class对象
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 可选字段
     * <span class="token keyword">@return</span> List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>T</span><span class="token punctuation">&gt;</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">select</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BeanListHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
<span class="token comment">//            关闭和数据库的连接</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 通用的查找方法 查找结果返回一个T
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">clazz</span>  一个类的Class对象
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 可选字段
     * <span class="token keyword">@return</span> T
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">selectOne</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BeanHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回单行某个字段
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>    String sql
     * <span class="token keyword">@param</span> <span class="token parameter">params</span> 可选 参数列表
     * <span class="token keyword">@return</span> 一个Object，Object的运行类型根据返回值而定
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">selectOne</span><span class="token punctuation">(</span><span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> queryRunner<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ScalarHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
<span class="token comment">//            关闭和数据库的连接</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span> connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="userdao" tabindex="-1"><a class="header-anchor" href="#userdao" aria-hidden="true">#</a> UserDao</h3><p>分为接口和实现</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>dao</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.dao
 * <span class="token keyword">@date</span> 2021/12/5 13:48
 * <span class="token keyword">@description</span> User类的查询接口
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserDao</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 通过用户名和密码来匹配一个用户
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userName</span> 用户名
     * <span class="token keyword">@param</span> <span class="token parameter">password</span> 密码
     * <span class="token keyword">@return</span> 用户对象
     */</span>
    <span class="token class-name">User</span> <span class="token function">queryUserByUserNameAndPassword</span><span class="token punctuation">(</span><span class="token class-name">String</span> userName<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 通过用户名判断一个用户是否存在
     *
     * <span class="token keyword">@param</span> <span class="token parameter">userName</span> 用户名
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">queryUserByUserName</span><span class="token punctuation">(</span><span class="token class-name">String</span> userName<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 保存一个用户
     *
     * <span class="token keyword">@param</span> <span class="token parameter">user</span> User对象
     * <span class="token keyword">@return</span> 返回一个int 大于0 表示保存成功 如果返回-1表示用户重复 插入失败
     */</span>
    <span class="token keyword">int</span> <span class="token function">saveUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>dao<span class="token punctuation">.</span>impl</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>dao<span class="token punctuation">.</span></span><span class="token class-name">UserDao</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.dao
 * <span class="token keyword">@date</span> 2021/12/5 12:00
 * <span class="token keyword">@description</span> 对于User的增删改查操作
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl</span> <span class="token keyword">extends</span> <span class="token class-name">BasicDao</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">queryUserByUserNameAndPassword</span><span class="token punctuation">(</span><span class="token class-name">String</span> userName<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">selectForOne</span><span class="token punctuation">(</span><span class="token string">&quot;select * from t_user where userName=? and password=?&quot;</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span>
                <span class="token punctuation">,</span> userName<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">queryUserByUserName</span><span class="token punctuation">(</span><span class="token class-name">String</span> userName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> count <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span> <span class="token function">selectForOneField</span><span class="token punctuation">(</span><span class="token string">&quot;select count(*) from t_user where username=?  &quot;</span><span class="token punctuation">,</span> userName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">saveUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token string">&quot;insert into t_user(username, password, email) VALUES(?,?,?)&quot;</span><span class="token punctuation">,</span>
                    user<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="目前结构" tabindex="-1"><a class="header-anchor" href="#目前结构" aria-hidden="true">#</a> 目前结构</h2><p>ServletTestSql是测试SQL是否有用的HttpServlet，testdao是测试能否在控制台获取sql数据</p><figure><img src="`+r+`" alt="image-20211205154054107" tabindex="0" loading="lazy"><figcaption>image-20211205154054107</figcaption></figure><h3 id="两个测试文件" tabindex="-1"><a class="header-anchor" href="#两个测试文件" aria-hidden="true">#</a> 两个测试文件</h3><p>一个在控制台测试下数据库池是否正常</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">Connection</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage PACKAGE_NAME
 * <span class="token keyword">@date</span> 2021/12/5 12:01
 * <span class="token keyword">@description</span> 项目描述
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> testDao <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token class-name">MyThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyThread</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个测试下用户是否能够正常访问到数据库</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;ServletTestSql&quot;</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;/ServletTestSql&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ServletTestSql</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">UserDao</span> userDao <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> select <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&quot;select * from t_user&quot;</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">&quot;text/html;charset=utf-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>select<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展-快速的创建单元测试文件" tabindex="-1"><a class="header-anchor" href="#扩展-快速的创建单元测试文件" aria-hidden="true">#</a> 扩展-快速的创建单元测试文件</h3><p>默认快捷键<code>ctrl+shift+t</code>我的快捷键：<code>ctrl+alt+右边小键盘上的9</code>（或者alt+insert里面也有）</p><p>比方说给UserDaoImpl快速新建一个测试类，在该文件中按下上面这内容后出现如下页面</p><figure><img src="`+d+`" alt="image-20211205154532394" tabindex="0" loading="lazy"><figcaption>image-20211205154532394</figcaption></figure><p>勾上那三个想要测试的方法，然后点击确定，就会在test目录下新建这个文件</p><p>然后根据自己的需求去写相应的内容即可</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token keyword">static</span> <span class="token import static"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span></span><span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.test
 * <span class="token keyword">@date</span> 2021/12/5 15:48
 * <span class="token keyword">@description</span> 项目描述
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImplTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">queryUserByUserNameAndPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">queryUserByUserName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务端完成对用户的登陆注册等操作的处理-service" tabindex="-1"><a class="header-anchor" href="#服务端完成对用户的登陆注册等操作的处理-service" aria-hidden="true">#</a> 服务端完成对用户的登陆注册等操作的处理（Service）</h3><p>这里还未涉及到网络通讯</p><p>一个接口一个类：</p><figure><img src="`+m+`" alt="image-20211205162249295" tabindex="0" loading="lazy"><figcaption>image-20211205162249295</figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.service
 * <span class="token keyword">@date</span> 2021/12/5 16:06
 * <span class="token keyword">@description</span> 用户相关的services接口
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserServices</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 注册用户
     *
     * <span class="token keyword">@param</span> <span class="token parameter">user</span> 用户对象
     */</span>
    <span class="token keyword">void</span> <span class="token function">registerUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 登录用户
     *
     * <span class="token keyword">@param</span> <span class="token parameter">username</span> 用户名
     * <span class="token keyword">@param</span> <span class="token parameter">password</span> 密码
     * <span class="token keyword">@return</span> 返回用户对象 如果返回null则表示登陆失败：用户名或密码错误
     */</span>
    <span class="token class-name">User</span> <span class="token function">loginUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 根据用户名查找用户是否已存在
     *
     * <span class="token keyword">@param</span> <span class="token parameter">username</span> 用户名
     * <span class="token keyword">@return</span> 返回true则表示已存在，false表示用户还未存在
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">existsUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * 更新用户
     */</span>
    <span class="token keyword">void</span> <span class="token function">updateUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 删除用户
     */</span>
    <span class="token keyword">void</span> <span class="token function">deleteUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现类：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>service<span class="token punctuation">.</span>impl</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>dao<span class="token punctuation">.</span>impl<span class="token punctuation">.</span></span><span class="token class-name">UserDaoImpl</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">UserServices</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.service.impl
 * <span class="token keyword">@date</span> 2021/12/5 16:11
 * <span class="token keyword">@description</span> 项目描述
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServicesImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserServices</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">UserDaoImpl</span> userDao <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserDaoImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">registerUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        userDao<span class="token punctuation">.</span><span class="token function">saveUser</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">loginUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userDao<span class="token punctuation">.</span><span class="token function">queryUserByUserNameAndPassword</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">existsUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userDao<span class="token punctuation">.</span><span class="token function">queryUserByUserName</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        以后再完善</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteUser</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        以后再完善</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务端响应客户端发送的数据" tabindex="-1"><a class="header-anchor" href="#服务端响应客户端发送的数据" aria-hidden="true">#</a> 服务端响应客户端发送的数据</h2>`,32),T={href:"https://www.hutool.cn/",target:"_blank",rel:"noopener noreferrer"},A={href:"https://www.hutool.cn/docs/#/json/JSONUtil?id=jsonutil",target:"_blank",rel:"noopener noreferrer"},z=e('<p>​ 来帮助我们快速的返回数据给客户端</p><p>说下流程，当客户端发送注册的ajax请求给服务器的时候：</p><figure><img src="'+v+`" alt="image-20211205172912530" tabindex="0" loading="lazy"><figcaption>image-20211205172912530</figcaption></figure><ul><li>首先客户端请求验证码的时候，返回一个验证码和一个加密的字段：<code>VerificationCode</code></li><li>然后在客户端要来进行注册的时候，通过客户端发送的明文验证码和加密字段（在服务器收到加密字段后解密）来进行验证，如果验证成功则继续下一步，否则告诉客户端验证码错误</li><li>然后检查用户名是否可用</li><li>可用的话就给他注册并返回对应的消息给客户端</li><li>否则的话就返回个用户名不可用</li><li>挺简单的</li></ul><h3 id="验证码和加密生成类" tabindex="-1"><a class="header-anchor" href="#验证码和加密生成类" aria-hidden="true">#</a> 验证码和加密生成类</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>utils</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>captcha<span class="token punctuation">.</span></span><span class="token class-name">CaptchaUtil</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>captcha<span class="token punctuation">.</span></span><span class="token class-name">LineCaptcha</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span>symmetric<span class="token punctuation">.</span></span><span class="token class-name">SymmetricAlgorithm</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span>symmetric<span class="token punctuation">.</span></span><span class="token class-name">SymmetricCrypto</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>nio<span class="token punctuation">.</span>charset<span class="token punctuation">.</span></span><span class="token class-name">StandardCharsets</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Properties</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.utils
 * <span class="token keyword">@date</span> 2021/12/5 18:21
 * <span class="token keyword">@description</span> 验证工具类
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VerificationUtils</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 加密信息，可以调用，然后传入字符串自由的加密解密
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">SymmetricCrypto</span> <span class="token constant">DES</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
<span class="token comment">//            动态读取token.properties</span>
            properties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">VerificationUtils</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">&quot;/token.properties&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//            我这里加密是随便用了个工具生成了个长度为100的String</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tokens <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;userRegisterToken&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token constant">DES</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SymmetricCrypto</span><span class="token punctuation">(</span><span class="token class-name">SymmetricAlgorithm</span><span class="token punctuation">.</span><span class="token constant">DES</span><span class="token punctuation">,</span> tokens<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 对一个字符串进行加密，返回一个字符串
     *
     * <span class="token keyword">@param</span> <span class="token parameter">str</span> String
     * <span class="token keyword">@return</span> 加密后的字符串
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getVerificationStr</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">DES</span><span class="token punctuation">.</span><span class="token function">encryptHex</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 解密，对一个加密后的字符串进行解密，返回一个字符串
     *
     * <span class="token keyword">@param</span> <span class="token parameter">verificationStr</span> 加密后的字符串
     * <span class="token keyword">@return</span> 明文
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getDecryptionStr</span><span class="token punctuation">(</span><span class="token class-name">String</span> verificationStr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">DES</span><span class="token punctuation">.</span><span class="token function">decryptStr</span><span class="token punctuation">(</span>verificationStr<span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取一个图片验证码对象
     *
     * <span class="token keyword">@return</span> LineCaptcha
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">LineCaptcha</span> <span class="token function">getLineCaptcha</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">CaptchaUtil</span><span class="token punctuation">.</span><span class="token function">createLineCaptcha</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="给用户发送验证码图片" tabindex="-1"><a class="header-anchor" href="#给用户发送验证码图片" aria-hidden="true">#</a> 给用户发送验证码图片</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>web</span><span class="token punctuation">;</span>


<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cn<span class="token punctuation">.</span>hutool<span class="token punctuation">.</span>captcha<span class="token punctuation">.</span></span><span class="token class-name">LineCaptcha</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">VerificationUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ServletException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">WebServlet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServlet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletResponse</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.web
 * <span class="token keyword">@date</span> 2021/12/5 17:38
 * <span class="token keyword">@description</span> 项目描述
 */</span>
<span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span>
        name <span class="token operator">=</span> <span class="token string">&quot;ImageAuthenticationCode&quot;</span><span class="token punctuation">,</span>
        urlPatterns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;/ImageAuthenticationCode&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ImageAuthenticationCode</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> resp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
<span class="token comment">//        返回json</span>
        resp<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">&quot;application/json;charset=utf-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">LineCaptcha</span> lineCaptcha <span class="token operator">=</span> <span class="token class-name">VerificationUtils</span><span class="token punctuation">.</span><span class="token function">getLineCaptcha</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> code <span class="token operator">=</span> lineCaptcha<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> verificationStr <span class="token operator">=</span> <span class="token class-name">VerificationUtils</span><span class="token punctuation">.</span><span class="token function">getVerificationStr</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
        resp<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;code&quot;</span><span class="token punctuation">,</span> verificationStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        返回base64的图片</span>
        resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;{&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\&quot;ImagePath\\&quot;:&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\&quot;&quot;</span> <span class="token operator">+</span> lineCaptcha<span class="token punctuation">.</span><span class="token function">getImageBase64Data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\&quot;&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用户注册" tabindex="-1"><a class="header-anchor" href="#用户注册" aria-hidden="true">#</a> 用户注册</h3><p>注册类：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>web</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>dao<span class="token punctuation">.</span>impl<span class="token punctuation">.</span></span><span class="token class-name">UserDaoImpl</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">VerificationUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ServletException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">WebServlet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServlet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletResponse</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.web
 * <span class="token keyword">@date</span> 2021/12/5 17:13
 * <span class="token keyword">@description</span> 项目描述
 */</span>
<span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;registerServlet&quot;</span><span class="token punctuation">,</span> urlPatterns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;/register&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RegisterServlet</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doPost</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> resp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
<span class="token comment">//       获取用户传递进来的username password 和email</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;收到了客户端发过来的消息&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;token&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> validateCode <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;validateCode&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        resp<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">&quot;application/json;charset=utf-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">VerificationUtils</span><span class="token punctuation">.</span><span class="token function">getDecryptionStr</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>validateCode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;验证码正确&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//            继续验证账号密码</span>
            <span class="token class-name">String</span> username <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">UserDaoImpl</span> userDao <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserDaoImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>userDao<span class="token punctuation">.</span><span class="token function">queryUserByUserName</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;用户名可用&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> password <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> email <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;email&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">,</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> i <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">saveUser</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;注册成功&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                    给客户端发送 code = 200 message = 注册成功</span>
                    resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;code\\&quot;:200,\\&quot;message\\&quot;:\\&quot;注册成功\\&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;注册失败&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                    给客户端发送 code = 500 message = 注册失败</span>
                    resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;code\\&quot;:500,\\&quot;message\\&quot;:\\&quot;注册失败\\&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;用户名已存在&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//                给客户端发送 code = 500 message = 用户名已存在</span>
                resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;code\\&quot;:500,\\&quot;message\\&quot;:\\&quot;用户名已存在\\&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;验证码错误&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//        返回json</span>
            resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;code\\&quot;:500,\\&quot;message\\&quot;:\\&quot;验证码错误\\&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> resp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
<span class="token comment">//       客户端请求这里的时候，返回一个图片验证码和加密后的图片验证码明文</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用户登录-cookie存放" tabindex="-1"><a class="header-anchor" href="#用户登录-cookie存放" aria-hidden="true">#</a> 用户登录--COOKIE存放</h3><p>如下操作就行。。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Cookie</span> cookie <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cookie</span><span class="token punctuation">(</span><span class="token string">&quot;cookie名称&quot;</span><span class="token punctuation">,</span>你想要存放的内容<span class="token punctuation">)</span><span class="token punctuation">;</span>
cookie<span class="token punctuation">.</span><span class="token function">setMaxAge</span><span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
resp<span class="token punctuation">.</span><span class="token function">addCookie</span><span class="token punctuation">(</span>cookie<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>读取同理，非常简单..当让也可以设置<code>setHttpOnly</code>之类的，看Cookie源码即可</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>web</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>dao<span class="token punctuation">.</span>impl<span class="token punctuation">.</span></span><span class="token class-name">UserDaoImpl</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>books<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">VerificationUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ServletException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">WebServlet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">Cookie</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServlet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletResponse</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * @BelongsProject 17-Servlet
 * @BelongsPackage com.books.web
 * <span class="token keyword">@date</span> 2021/12/5 22:49
 * <span class="token keyword">@description</span> 项目描述
 */</span>
<span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;login&quot;</span><span class="token punctuation">,</span> urlPatterns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;/userLogin&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Login</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> resp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> username <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> password <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getParameter</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">UserDaoImpl</span> userDao <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserDaoImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">User</span> user<span class="token punctuation">;</span>
<span class="token comment">//        返回json</span>
        resp<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">&quot;application/json;charset=utf-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>user <span class="token operator">=</span> userDao<span class="token punctuation">.</span><span class="token function">queryUserByUserNameAndPassword</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//            验证成功</span>
            resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;code\\&quot;:0,\\&quot;message\\&quot;:\\&quot;登录成功\\&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//            设置cookie</span>
            <span class="token class-name">Cookie</span> cookie <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cookie</span><span class="token punctuation">(</span><span class="token string">&quot;userToken&quot;</span><span class="token punctuation">,</span> <span class="token class-name">VerificationUtils</span><span class="token punctuation">.</span><span class="token function">getVerificationStr</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cookie<span class="token punctuation">.</span><span class="token function">setMaxAge</span><span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            resp<span class="token punctuation">.</span><span class="token function">addCookie</span><span class="token punctuation">(</span>cookie<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="token comment">//            验证失败</span>
            resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;{\\&quot;code\\&quot;:1,\\&quot;message\\&quot;:\\&quot;登录失败,用户名或密码错误\\&quot;}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="做一个简单的login和注册界面" tabindex="-1"><a class="header-anchor" href="#做一个简单的login和注册界面" aria-hidden="true">#</a> 做一个简单的login和注册界面</h2><p>我这里制作的挺简单的，如果你是刚刚学完jQuery，应该能做的更快更好</p><p>技术栈：HTML + Bootstrap4+Jquery带的ajax</p>`,19),I={href:"https://pan.baidu.com/s/1JOaUtZkDwDckZ4WZ5pziNw",target:"_blank",rel:"noopener noreferrer"},N=n("em",null,"uyxq",-1),Q=e('<p>哦额外要说明一下，这玩意在写的时候得用相对路径，例如请求<code>/login</code>则：<code>login</code>即可</p><p>因为使用<code>/login</code>就成了：<code>localhost:8080/login</code></p><p>而不是<code>localhost:8080/项目名称/login</code></p><p>登录</p><figure><img src="'+b+'" alt="image-20211205231138772" tabindex="0" loading="lazy"><figcaption>image-20211205231138772</figcaption></figure><p>注册：</p><figure><img src="'+y+'" alt="image-20211205231149807" tabindex="0" loading="lazy"><figcaption>image-20211205231149807</figcaption></figure><h3 id="一些问题" tabindex="-1"><a class="header-anchor" href="#一些问题" aria-hidden="true">#</a> 一些问题</h3><p>有没有发现用HTML来跟后端操作会有些吃力（虽然说以后学Spring就没有这种问题了）</p><p>比如说页面的跳转之类的，一直都是相对路径啥的，如果你不是懒鬼自己写的HTML代码，就会发现这种操作方式相当难受..</p><p>所以就得用到我们的JSP了，这玩意虽然说以后用得不多，但是得学（现在项目大部分都是React、Vue之类的前端了，虽然有SSM渲染）</p>',11);function V(W,M){const a=o("ExternalLinkIcon");return c(),l("div",null,[g,h,f,q,S,n("ul",null,[n("li",null,[s("Web层 "),n("ul",null,[n("li",null,[n("a",U,[s("com.books.web"),p(a)])])])]),j]),_,n("p",null,[s("首先几个依赖："),n("a",x,[s("Druid"),p(a)]),s("、"),n("a",C,[s("Mysql"),p(a)]),s("、"),n("a",E,[s("commone-dbutils"),p(a)]),s("都自行安装下：")]),B,n("ol",null,[J,D,O,R,P,n("li",null,[s("关于getResourcesAsStaream的具体说明可以看"),n("a",L,[s("这篇文章"),p(a)])])]),H,n("p",null,[s("​ 这里引出一个工具："),n("a",T,[s("HuTool"),p(a)]),s("l中的"),n("a",A,[s("JSONUtil"),p(a)]),s("和它的验证码生成器以及它的加密字段，具体的看它文档做就可以了")]),z,n("p",null,[s("具体就不做说明了，都是些再简单不过的玩意，"),n("a",I,[s("源码"),p(a)]),s("放在度盘，提取码："),N]),Q])}const Z=t(w,[["render",V],["__file","04-在开始后面东西前要做的事情.html.vue"]]);export{Z as default};
