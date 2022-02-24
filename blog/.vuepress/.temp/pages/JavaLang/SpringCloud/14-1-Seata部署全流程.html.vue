<template><h2 id="先说总结" tabindex="-1"><a class="header-anchor" href="#先说总结" aria-hidden="true">#</a> 先说总结</h2>
<p>除非万不得已，不然千万别用本地配置..非常多的BUG</p>
<h2 id="数据库准备-服务端" tabindex="-1"><a class="header-anchor" href="#数据库准备-服务端" aria-hidden="true">#</a> 数据库准备（服务端）</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> seata<span class="token punctuation">;</span>
<span class="token keyword">use</span> seata<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>global_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>                       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span>            <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>                    <span class="token keyword">TINYINT</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_id<span class="token punctuation">`</span></span>            <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_service_group<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_name<span class="token punctuation">`</span></span>          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>timeout<span class="token punctuation">`</span></span>                   <span class="token keyword">INT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>begin_time<span class="token punctuation">`</span></span>                <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_data<span class="token punctuation">`</span></span>          <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>                <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>              <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_gmt_modified_status<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_transaction_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token comment">-- the table to store BranchSession data</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>branch_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>         <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>               <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span>    <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_group_id<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_id<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_type<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>            <span class="token keyword">TINYINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>client_id<span class="token punctuation">`</span></span>         <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>application_data<span class="token punctuation">`</span></span>  <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>        <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>      <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_xid<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token comment">-- the table to store lock data</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>lock_table<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>row_key<span class="token punctuation">`</span></span>        <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>            <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>transaction_id<span class="token punctuation">`</span></span> <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>      <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>resource_id<span class="token punctuation">`</span></span>    <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span>     <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>pk<span class="token punctuation">`</span></span>             <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span>         <span class="token keyword">TINYINT</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'0:locked ,1:rollbacking'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_create<span class="token punctuation">`</span></span>     <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>gmt_modified<span class="token punctuation">`</span></span>   <span class="token keyword">DATETIME</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>row_key<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_status<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>idx_branch_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8<span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>lock_key<span class="token punctuation">`</span></span>       <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>lock_value<span class="token punctuation">`</span></span>     <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>expire<span class="token punctuation">`</span></span>         <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>lock_key<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8mb4<span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'AsyncCommitting'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'RetryCommitting'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'RetryRollbacking'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>distributed_lock<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>lock_key<span class="token punctuation">,</span> lock_value<span class="token punctuation">,</span> expire<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'TxTimeoutCheck'</span><span class="token punctuation">,</span> <span class="token string">' '</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><h2 id="服务端搭建-server-本地" tabindex="-1"><a class="header-anchor" href="#服务端搭建-server-本地" aria-hidden="true">#</a> 服务端搭建(Server)-本地</h2>
<p>虽然是本地，但是通讯还是要用到Nacos</p>
<h3 id="registry-conf" tabindex="-1"><a class="header-anchor" href="#registry-conf" aria-hidden="true">#</a> registry.conf</h3>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>registry {
  <span class="token comment"># file 、nacos 、eureka、redis、zk、consul、etcd3、sofa 这里必须选择nacos</span>
  <span class="token key attr-name">type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
  nacos {
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata-server</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">myserver:8435</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">029fa2f3-e90a-400c-91ac-7f1b83dc4785</span>"</span>
    <span class="token comment"># 注意这玩意 非常重要 你最终的成败都在cluster上边</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
  }
  eureka {
    <span class="token key attr-name">serviceUrl</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:8761/eureka</span>"</span>
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">weight</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">1</span>"</span>
  }
  redis {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">localhost:6379</span>"</span>
    <span class="token key attr-name">db</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
  }
  zk {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:2181</span>"</span>
    <span class="token key attr-name">sessionTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">6000</span>
    <span class="token key attr-name">connectTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  consul {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:8500</span>"</span>
    <span class="token key attr-name">aclToken</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  etcd3 {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:2379</span>"</span>
  }
  sofa {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:9603</span>"</span>
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">region</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">DEFAULT_ZONE</span>"</span>
    <span class="token key attr-name">datacenter</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">DefaultDataCenter</span>"</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token key attr-name">addressWaitTime</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">3000</span>"</span>
  }
  file {
    <span class="token key attr-name">name</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">file.conf</span>"</span>
  }
}

config {
  <span class="token comment"># file、nacos 、apollo、zk、consul、etcd3 这里选择file，读取本地文件</span>
  <span class="token key attr-name">type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">file</span>"</span>

  nacos {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">myserver:8435</span>"</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">029fa2f3-e90a-400c-91ac-7f1b83dc4785</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">dataId</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seataServer.properties</span>"</span>
  }
  consul {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:8500</span>"</span>
    <span class="token key attr-name">aclToken</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  apollo {
    <span class="token key attr-name">appId</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata-server</span>"</span>
    <span class="token comment">## apolloConfigService will cover apolloMeta</span>
    <span class="token key attr-name">apolloMeta</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://192.168.1.204:8801</span>"</span>
    <span class="token key attr-name">apolloConfigService</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://192.168.1.204:8080</span>"</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">application</span>"</span>
    <span class="token key attr-name">apolloAccesskeySecret</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata</span>"</span>
  }
  zk {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:2181</span>"</span>
    <span class="token key attr-name">sessionTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">6000</span>
    <span class="token key attr-name">connectTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">nodePath</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">/seata/seata.properties</span>"</span>
  }
  etcd3 {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:2379</span>"</span>
  }
  file {
    <span class="token key attr-name">name</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">file.conf</span>"</span>
  }
}

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br></div></div><h3 id="file-conf" tabindex="-1"><a class="header-anchor" href="#file-conf" aria-hidden="true">#</a> file.conf</h3>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment"># 传输模块 这个不用管 直接用即可</span>
transport {
    <span class="token comment"># tcp, unix-domain-socket</span>
    <span class="token key attr-name">type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">TCP</span>"</span>
    <span class="token comment">#NIO, NATIVE</span>
    <span class="token key attr-name">server</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NIO</span>"</span>
    <span class="token comment">#enable heartbeat</span>
    <span class="token key attr-name">heartbeat</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
    <span class="token comment"># the client batch send request enable</span>
    <span class="token key attr-name">enableClientBatchSendRequest</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token comment">#thread factory for netty</span>
    threadFactory {
        <span class="token key attr-name">bossThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyBoss</span>"</span>
        <span class="token key attr-name">workerThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyServerNIOWorker</span>"</span>
        <span class="token key attr-name">serverExecutorThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyServerBizHandler</span>"</span>
        <span class="token key attr-name">shareBossWorker</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
        <span class="token key attr-name">clientSelectorThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyClientSelector</span>"</span>
        <span class="token key attr-name">clientSelectorThreadSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
        <span class="token key attr-name">clientWorkerThreadPrefix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">NettyClientWorkerThread</span>"</span>
        <span class="token comment"># netty boss thread size</span>
        <span class="token key attr-name">bossThreadSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
        <span class="token comment">#auto default pin or 8</span>
        <span class="token key attr-name">workerThreadSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    }
    shutdown {
        <span class="token comment"># when destroy server, wait seconds</span>
        <span class="token key attr-name">wait</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span>
    }
    <span class="token key attr-name">serialization</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata</span>"</span>
    <span class="token key attr-name">compressor</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">none</span>"</span>
}
<span class="token comment"># 这里是指定service 一定要配置</span>
service {
    <span class="token comment"># 这个是事务分组 开始是使用了一个默认的 这里要改成自己的 这里随便取一个名字就可以了，顺手就行</span>
   <span class="token key attr-name">vgroupMapping.default_tx_group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
   <span class="token comment"># 可以配置多个</span>
   <span class="token key attr-name">vgroupMapping.seata-order-service-tx_group</span><span class="token punctuation">=</span><span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
   <span class="token key attr-name">vgroupMapping.seata-account-service-tx_group</span><span class="token punctuation">=</span><span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
   <span class="token key attr-name">vgroupMapping.seata-storage-service-tx_group</span><span class="token punctuation">=</span><span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token comment"># TC服务列表 这个不用管，仅注册中心为file时使用</span>
    <span class="token key attr-name">default.grouplist</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:8091</span>"</span>
    <span class="token key attr-name">enableDegrade</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token comment"># 全局事务开关 默认false。false为开启，true为关闭</span>
    <span class="token key attr-name">disableGlobalTransaction</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
}
<span class="token comment"># 下面这里也是固定操作 不用管</span>
client {
    rm {
        <span class="token key attr-name">asyncCommitBufferLimit</span> <span class="token punctuation">=</span> <span class="token value attr-value">10000</span>
        <span class="token key attr-name">lock.retryInterval</span> <span class="token punctuation">=</span> <span class="token value attr-value">10</span>
        <span class="token key attr-name">lock.retryTimes</span> <span class="token punctuation">=</span> <span class="token value attr-value">30</span>
        <span class="token key attr-name">lock.retryPolicyBranchRollbackOnConflict</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
        <span class="token key attr-name">reportRetryCount</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
        <span class="token key attr-name">tableMetaCheckEnable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
        <span class="token key attr-name">tableMetaCheckerInterval</span> <span class="token punctuation">=</span> <span class="token value attr-value">60000</span>
        <span class="token key attr-name">sqlParserType</span> <span class="token punctuation">=</span> <span class="token value attr-value">druid</span>
        <span class="token key attr-name">reportSuccessEnable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
        <span class="token key attr-name">sagaBranchRegisterEnable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    }
    tm {
        <span class="token key attr-name">commitRetryCount</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
        <span class="token key attr-name">rollbackRetryCount</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
        <span class="token key attr-name">defaultGlobalTransactionTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">60000</span>
        <span class="token key attr-name">degradeCheck</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
        <span class="token key attr-name">degradeCheckAllowTimes</span> <span class="token punctuation">=</span> <span class="token value attr-value">10</span>
        <span class="token key attr-name">degradeCheckPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>

    }
}


<span class="token comment">## transaction log store, only used in seata-server</span>
store {
    <span class="token comment">## store mode: file、db、redis 这里是让你选择存储模式，db就是mysql，file就是文件，redis就是用redis来存储数据</span>
    <span class="token key attr-name">mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">db</span>"</span>
    <span class="token comment">## rsa decryption public key 这里是公钥之类的配置 先不管</span>
    <span class="token key attr-name">publicKey</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token comment">## file store property</span>
    file {
        <span class="token comment">## store location dir</span>
        <span class="token key attr-name">dir</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">sessionStore</span>"</span>
        <span class="token comment"># branch session size , if exceeded first try compress lockkey, still exceeded throws exceptions</span>
        <span class="token key attr-name">maxBranchSessionSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">16384</span>
        <span class="token comment"># globe session size , if exceeded throws exceptions</span>
        <span class="token key attr-name">maxGlobalSessionSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">512</span>
        <span class="token comment"># file buffer size , if exceeded allocate new buffer</span>
        <span class="token key attr-name">fileWriteBufferCacheSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">16384</span>
        <span class="token comment"># when recover batch read size</span>
        <span class="token key attr-name">sessionReloadReadSize</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
        <span class="token comment"># async, sync</span>
        <span class="token key attr-name">flushDiskMode</span> <span class="token punctuation">=</span> <span class="token value attr-value">async</span>
    }

    <span class="token comment">## database store property 我们上面选择了DB，所以这里要配置一些基本的连接信息</span>
    db {
        <span class="token comment">## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp)/HikariDataSource(hikari) etc.</span>
        <span class="token key attr-name">datasource</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">druid</span>"</span>
        <span class="token comment">## mysql/oracle/postgresql/h2/oceanbase etc.</span>
        <span class="token key attr-name">dbType</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">mysql</span>"</span>
        <span class="token comment"># 注意 这里如果你用的是mysql8以下的话 要com.mysql.jdbc.Driver 否则 com.mysql.cj.jdbc.Driver</span>
        <span class="token key attr-name">driverClassName</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">com.mysql.cj.jdbc.Driver</span>"</span>
        <span class="token comment">## if using mysql to store the data, recommend add rewriteBatchedStatements=true in jdbc connection param</span>
        <span class="token key attr-name">url</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">jdbc:mysql://localhost:3306/seata?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;rewriteBatchedStatements=true&amp;&amp;serverTimezone=UTC</span>"</span>
        <span class="token key attr-name">user</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">root</span>"</span>
        <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">123456</span>"</span>
        <span class="token key attr-name">minConn</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
        <span class="token key attr-name">maxConn</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
        <span class="token key attr-name">globalTable</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">global_table</span>"</span>
        <span class="token key attr-name">branchTable</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">branch_table</span>"</span>
        <span class="token key attr-name">lockTable</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">lock_table</span>"</span>
        <span class="token key attr-name">queryLimit</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
        <span class="token key attr-name">maxWait</span> <span class="token punctuation">=</span> <span class="token value attr-value">5000</span>
    }

    <span class="token comment">## redis store property</span>
    redis {
        <span class="token comment">## redis mode: single、sentinel</span>
        <span class="token key attr-name">mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">single</span>"</span>
        <span class="token comment">## single mode property</span>
        single {
            <span class="token key attr-name">host</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1</span>"</span>
            <span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">6379</span>"</span>
        }
        <span class="token comment">## sentinel mode property</span>
        sentinel {
            <span class="token key attr-name">masterName</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
            <span class="token comment">## such as "10.28.235.65:26379,10.28.235.65:26380,10.28.235.65:26381"</span>
            <span class="token key attr-name">sentinelHosts</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
        }
        <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
        <span class="token key attr-name">database</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">0</span>"</span>
        <span class="token key attr-name">minConn</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
        <span class="token key attr-name">maxConn</span> <span class="token punctuation">=</span> <span class="token value attr-value">10</span>
        <span class="token key attr-name">maxTotal</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
        <span class="token key attr-name">queryLimit</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
    }
}
<span class="token comment">## server configuration, only used in server side 下面都是固定配置 一般不用管</span>
server {
    recovery {
        <span class="token comment">#schedule committing retry period in milliseconds</span>
        <span class="token key attr-name">committingRetryPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span>
        <span class="token comment">#schedule asyn committing retry period in milliseconds</span>
        <span class="token key attr-name">asynCommittingRetryPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span>
        <span class="token comment">#schedule rollbacking retry period in milliseconds</span>
        <span class="token key attr-name">rollbackingRetryPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span>
        <span class="token comment">#schedule timeout retry period in milliseconds</span>
        <span class="token key attr-name">timeoutRetryPeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span>
    }
    undo {
        <span class="token key attr-name">logSaveDays</span> <span class="token punctuation">=</span> <span class="token value attr-value">7</span>
        <span class="token comment">#schedule delete expired undo_log in milliseconds</span>
        <span class="token key attr-name">logDeletePeriod</span> <span class="token punctuation">=</span> <span class="token value attr-value">86400000</span>
    }
    <span class="token comment">#check auth</span>
    <span class="token key attr-name">enableCheckAuth</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
    <span class="token comment">#unit ms,s,m,h,d represents milliseconds, seconds, minutes, hours, days, default permanent</span>
    <span class="token key attr-name">maxCommitRetryTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">-1</span>"</span>
    <span class="token key attr-name">maxRollbackRetryTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">-1</span>"</span>
    <span class="token key attr-name">rollbackRetryTimeoutUnlockEnable</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token key attr-name">retryDeadThreshold</span> <span class="token punctuation">=</span> <span class="token value attr-value">130000</span>
}


<span class="token comment">## metrics configuration, only used in server side</span>
metrics {
    <span class="token key attr-name">enabled</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token key attr-name">registryType</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">compact</span>"</span>
    <span class="token comment"># multi exporters use comma divided</span>
    <span class="token key attr-name">exporterList</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">prometheus</span>"</span>
    <span class="token key attr-name">exporterPrometheusPort</span> <span class="token punctuation">=</span> <span class="token value attr-value">9898</span>
}

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br></div></div><h2 id="服务端搭建-server-nacos" tabindex="-1"><a class="header-anchor" href="#服务端搭建-server-nacos" aria-hidden="true">#</a> 服务端搭建(Server)-Nacos</h2>
<h3 id="registry-conf-1" tabindex="-1"><a class="header-anchor" href="#registry-conf-1" aria-hidden="true">#</a> registry.conf</h3>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>registry {
  <span class="token comment"># file 、nacos 、eureka、redis、zk、consul、etcd3、sofa</span>
  <span class="token key attr-name">type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
  nacos {
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata-server</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">myserver:8435</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token comment"># 这里的命名空间要提前到nacos内创建好</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">029fa2f3-e90a-400c-91ac-7f1b83dc4785</span>"</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
  }
  eureka {
    <span class="token key attr-name">serviceUrl</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:8761/eureka</span>"</span>
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">weight</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">1</span>"</span>
  }
  redis {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">localhost:6379</span>"</span>
    <span class="token key attr-name">db</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
  }
  zk {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:2181</span>"</span>
    <span class="token key attr-name">sessionTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">6000</span>
    <span class="token key attr-name">connectTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  consul {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:8500</span>"</span>
    <span class="token key attr-name">aclToken</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  etcd3 {
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:2379</span>"</span>
  }
  sofa {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:9603</span>"</span>
    <span class="token key attr-name">application</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">region</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">DEFAULT_ZONE</span>"</span>
    <span class="token key attr-name">datacenter</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">DefaultDataCenter</span>"</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">default</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token key attr-name">addressWaitTime</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">3000</span>"</span>
  }
  file {
    <span class="token key attr-name">name</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">file.conf</span>"</span>
  }
}

config {
  <span class="token comment"># file、nacos 、apollo、zk、consul、etcd3</span>
  <span class="token key attr-name">type</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>

  nacos {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">myserver:8435</span>"</span>
    <span class="token comment"># 这里和上面用同样的</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">029fa2f3-e90a-400c-91ac-7f1b83dc4785</span>"</span>
    <span class="token key attr-name">group</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">SEATA_GROUP</span>"</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">nacos</span>"</span>
    <span class="token key attr-name">dataId</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seataServer.properties</span>"</span>
  }
  consul {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:8500</span>"</span>
    <span class="token key attr-name">aclToken</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
  }
  apollo {
    <span class="token key attr-name">appId</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata-server</span>"</span>
    <span class="token comment">## apolloConfigService will cover apolloMeta</span>
    <span class="token key attr-name">apolloMeta</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://192.168.1.204:8801</span>"</span>
    <span class="token key attr-name">apolloConfigService</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://192.168.1.204:8080</span>"</span>
    <span class="token key attr-name">namespace</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">application</span>"</span>
    <span class="token key attr-name">apolloAccesskeySecret</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">cluster</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">seata</span>"</span>
  }
  zk {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">127.0.0.1:2181</span>"</span>
    <span class="token key attr-name">sessionTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">6000</span>
    <span class="token key attr-name">connectTimeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>
    <span class="token key attr-name">username</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">password</span> <span class="token punctuation">=</span> <span class="token value attr-value">""</span>
    <span class="token key attr-name">nodePath</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">/seata/seata.properties</span>"</span>
  }
  etcd3 {
    <span class="token key attr-name">serverAddr</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">http://localhost:2379</span>"</span>
  }
  file {
    <span class="token key attr-name">name</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">file.conf</span>"</span>
  }
}

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br></div></div><h3 id="文件上传到nacos的脚本" tabindex="-1"><a class="header-anchor" href="#文件上传到nacos的脚本" aria-hidden="true">#</a> 文件上传到Nacos的脚本</h3>
<p>因为官方的有问题，所以用这一版的</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python3</span>
<span class="token comment">#  -*- coding: UTF-8 -*-</span>

<span class="token keyword">import</span> http<span class="token punctuation">.</span>client
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> getopt <span class="token keyword">as</span> opts
<span class="token keyword">import</span> urllib<span class="token punctuation">.</span>parse
<span class="token keyword">import</span> re


<span class="token comment"># 下面这个params填写你响应的信息 第一个是ip 第二个是端口 第三个是命名空间 第四个是分组 其余的是账号密码</span>
<span class="token keyword">def</span> <span class="token function">get_params</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">dict</span><span class="token punctuation">:</span>
    params <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">'-h'</span><span class="token punctuation">:</span> <span class="token string">'myserver'</span><span class="token punctuation">,</span>
        <span class="token string">'-p'</span><span class="token punctuation">:</span> <span class="token string">'8435'</span><span class="token punctuation">,</span>
        <span class="token string">'-t'</span><span class="token punctuation">:</span> <span class="token string">'029fa2f3-e90a-400c-91ac-7f1b83dc4785'</span><span class="token punctuation">,</span>
        <span class="token string">'-g'</span><span class="token punctuation">:</span> <span class="token string">'SEATA_GROUP'</span><span class="token punctuation">,</span>
        <span class="token string">'-u'</span><span class="token punctuation">:</span> <span class="token string">'nacos'</span><span class="token punctuation">,</span>
        <span class="token string">'-w'</span><span class="token punctuation">:</span> <span class="token string">'nacos'</span>
    <span class="token punctuation">}</span>
    inputs<span class="token punctuation">,</span> args <span class="token operator">=</span> opts<span class="token punctuation">.</span>getopt<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span> shortopts<span class="token operator">=</span><span class="token string">'h:p:t:g:u:w:'</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> inputs<span class="token punctuation">:</span>
        params<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> v
    <span class="token keyword">print</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>
    <span class="token keyword">return</span> params

<span class="token keyword">def</span> <span class="token function">error_exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'python nacos-config.py [-h host] [-p port] [-t tenant] [-g group] [-u username] [-w password]'</span><span class="token punctuation">)</span>
    exit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">get_pair</span><span class="token punctuation">(</span>line<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">tuple</span><span class="token punctuation">:</span>
    res <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token keyword">match</span><span class="token punctuation">(</span><span class="token string">r"([\.\w-]+)=(.*)"</span><span class="token punctuation">,</span>line<span class="token punctuation">)</span>
    <span class="token keyword">return</span> res<span class="token punctuation">.</span>groups<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">if</span> res <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span> <span class="token keyword">else</span> <span class="token punctuation">[</span><span class="token string">''</span><span class="token punctuation">,</span><span class="token string">''</span><span class="token punctuation">]</span>


headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">'content-type'</span><span class="token punctuation">:</span> <span class="token string">"application/x-www-form-urlencoded"</span>
<span class="token punctuation">}</span>

hasError <span class="token operator">=</span> <span class="token boolean">False</span>

params <span class="token operator">=</span> get_params<span class="token punctuation">(</span><span class="token punctuation">)</span>

url_prefix <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>params<span class="token punctuation">[</span><span class="token string">'-h'</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span>params<span class="token punctuation">[</span><span class="token string">'-p'</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">"</span></span>
tenant <span class="token operator">=</span> params<span class="token punctuation">[</span><span class="token string">'-t'</span><span class="token punctuation">]</span>
username <span class="token operator">=</span> params<span class="token punctuation">[</span><span class="token string">'-u'</span><span class="token punctuation">]</span>
password <span class="token operator">=</span> params<span class="token punctuation">[</span><span class="token string">'-w'</span><span class="token punctuation">]</span>
group <span class="token operator">=</span> params<span class="token punctuation">[</span><span class="token string">'-g'</span><span class="token punctuation">]</span>
url_postfix_base <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f'/nacos/v1/cs/configs?group=</span><span class="token interpolation"><span class="token punctuation">{</span>group<span class="token punctuation">}</span></span><span class="token string">&amp;tenant=</span><span class="token interpolation"><span class="token punctuation">{</span>tenant<span class="token punctuation">}</span></span><span class="token string">'</span></span>

<span class="token keyword">if</span> username <span class="token operator">!=</span> <span class="token string">''</span> <span class="token keyword">and</span> password <span class="token operator">!=</span> <span class="token string">''</span><span class="token punctuation">:</span>
    url_postfix_base <span class="token operator">+=</span> <span class="token string-interpolation"><span class="token string">f'&amp;username=</span><span class="token interpolation"><span class="token punctuation">{</span>username<span class="token punctuation">}</span></span><span class="token string">&amp;password=</span><span class="token interpolation"><span class="token punctuation">{</span>password<span class="token punctuation">}</span></span><span class="token string">'</span></span>

<span class="token keyword">if</span> url_prefix <span class="token operator">==</span> <span class="token string">':'</span><span class="token punctuation">:</span>
    error_exit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> line <span class="token keyword">in</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">'../config.txt'</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    pair <span class="token operator">=</span> get_pair<span class="token punctuation">(</span>line<span class="token punctuation">.</span>rstrip<span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>pair<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>pair<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token keyword">or</span> pair<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">''</span> <span class="token keyword">or</span> pair<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">''</span><span class="token punctuation">:</span>
        <span class="token keyword">continue</span>
    url_postfix <span class="token operator">=</span> url_postfix_base <span class="token operator">+</span> <span class="token string-interpolation"><span class="token string">f'&amp;dataId=</span><span class="token interpolation"><span class="token punctuation">{</span>urllib<span class="token punctuation">.</span>parse<span class="token punctuation">.</span>quote<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>pair<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&amp;content=</span><span class="token interpolation"><span class="token punctuation">{</span>urllib<span class="token punctuation">.</span>parse<span class="token punctuation">.</span>quote<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>pair<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">'</span></span>
    conn <span class="token operator">=</span> http<span class="token punctuation">.</span>client<span class="token punctuation">.</span>HTTPConnection<span class="token punctuation">(</span>url_prefix<span class="token punctuation">)</span>
    conn<span class="token punctuation">.</span>request<span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> url_postfix<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
    res <span class="token operator">=</span> conn<span class="token punctuation">.</span>getresponse<span class="token punctuation">(</span><span class="token punctuation">)</span>
    data <span class="token operator">=</span> res<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> data <span class="token operator">!=</span> <span class="token string">"true"</span><span class="token punctuation">:</span>
        hasError <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>pair<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token punctuation">{</span>pair<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token punctuation">{</span>data <span class="token keyword">if</span> hasError <span class="token keyword">else</span> <span class="token string">'success'</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token keyword">if</span> hasError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"init nacos config fail."</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"init nacos config finished, please start seata-server."</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br></div></div><h3 id="上传的内容准备" tabindex="-1"><a class="header-anchor" href="#上传的内容准备" aria-hidden="true">#</a> 上传的内容准备</h3>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token attr-name">transport.type</span><span class="token punctuation">=</span><span class="token attr-value">TCP</span>
<span class="token attr-name">transport.server</span><span class="token punctuation">=</span><span class="token attr-value">NIO</span>
<span class="token attr-name">transport.heartbeat</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">transport.enableClientBatchSendRequest</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">transport.threadFactory.bossThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyBoss</span>
<span class="token attr-name">transport.threadFactory.workerThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyServerNIOWorker</span>
<span class="token attr-name">transport.threadFactory.serverExecutorThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyServerBizHandler</span>
<span class="token attr-name">transport.threadFactory.shareBossWorker</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">transport.threadFactory.clientSelectorThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyClientSelector</span>
<span class="token attr-name">transport.threadFactory.clientSelectorThreadSize</span><span class="token punctuation">=</span><span class="token attr-value">1</span>
<span class="token attr-name">transport.threadFactory.clientWorkerThreadPrefix</span><span class="token punctuation">=</span><span class="token attr-value">NettyClientWorkerThread</span>
<span class="token attr-name">transport.threadFactory.bossThreadSize</span><span class="token punctuation">=</span><span class="token attr-value">1</span>
<span class="token attr-name">transport.threadFactory.workerThreadSize</span><span class="token punctuation">=</span><span class="token attr-value">default</span>
<span class="token attr-name">transport.shutdown.wait</span><span class="token punctuation">=</span><span class="token attr-value">3</span>
<span class="token comment"># 这里可以配置多个 这条注释记得删了</span>
<span class="token attr-name">service.vgroupMapping.my_test_tx_group</span><span class="token punctuation">=</span><span class="token attr-value">default</span>
<span class="token attr-name">service.vgroupMapping.seata-order-service-tx_group</span><span class="token punctuation">=</span><span class="token attr-value">default</span>
<span class="token attr-name">service.vgroupMapping.seata-account-service-tx_group</span><span class="token punctuation">=</span><span class="token attr-value">default</span>
<span class="token attr-name">service.vgroupMapping.seata-storage-service-tx_group</span><span class="token punctuation">=</span><span class="token attr-value">default</span>
<span class="token attr-name">service.default.grouplist</span><span class="token punctuation">=</span><span class="token attr-value">127.0.0.1:8091</span>
<span class="token attr-name">service.enableDegrade</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">service.disableGlobalTransaction</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.rm.asyncCommitBufferLimit</span><span class="token punctuation">=</span><span class="token attr-value">10000</span>
<span class="token attr-name">client.rm.lock.retryInterval</span><span class="token punctuation">=</span><span class="token attr-value">10</span>
<span class="token attr-name">client.rm.lock.retryTimes</span><span class="token punctuation">=</span><span class="token attr-value">30</span>
<span class="token attr-name">client.rm.lock.retryPolicyBranchRollbackOnConflict</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">client.rm.reportRetryCount</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token attr-name">client.rm.tableMetaCheckEnable</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.rm.tableMetaCheckerInterval</span><span class="token punctuation">=</span><span class="token attr-value">60000</span>
<span class="token attr-name">client.rm.sqlParserType</span><span class="token punctuation">=</span><span class="token attr-value">druid</span>
<span class="token attr-name">client.rm.reportSuccessEnable</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.rm.sagaBranchRegisterEnable</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.tm.commitRetryCount</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token attr-name">client.tm.rollbackRetryCount</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token attr-name">client.tm.defaultGlobalTransactionTimeout</span><span class="token punctuation">=</span><span class="token attr-value">60000</span>
<span class="token attr-name">client.tm.degradeCheck</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.tm.degradeCheckAllowTimes</span><span class="token punctuation">=</span><span class="token attr-value">10</span>
<span class="token attr-name">client.tm.degradeCheckPeriod</span><span class="token punctuation">=</span><span class="token attr-value">2000</span>
<span class="token comment"># 配置数据源和对应的驱动 这条注释记得删了</span>
<span class="token attr-name">store.mode</span><span class="token punctuation">=</span><span class="token attr-value">db</span>
<span class="token attr-name">store.publicKey</span><span class="token punctuation">=</span>
<span class="token attr-name">store.file.dir</span><span class="token punctuation">=</span><span class="token attr-value">file_store/data</span>
<span class="token attr-name">store.file.maxBranchSessionSize</span><span class="token punctuation">=</span><span class="token attr-value">16384</span>
<span class="token attr-name">store.file.maxGlobalSessionSize</span><span class="token punctuation">=</span><span class="token attr-value">512</span>
<span class="token attr-name">store.file.fileWriteBufferCacheSize</span><span class="token punctuation">=</span><span class="token attr-value">16384</span>
<span class="token attr-name">store.file.flushDiskMode</span><span class="token punctuation">=</span><span class="token attr-value">async</span>
<span class="token attr-name">store.file.sessionReloadReadSize</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">store.db.datasource</span><span class="token punctuation">=</span><span class="token attr-value">druid</span>
<span class="token attr-name">store.db.dbType</span><span class="token punctuation">=</span><span class="token attr-value">mysql</span>
<span class="token attr-name">store.db.driverClassName</span><span class="token punctuation">=</span><span class="token attr-value">com.mysql.cj.jdbc.Driver</span>
<span class="token attr-name">store.db.url</span><span class="token punctuation">=</span><span class="token attr-value">jdbc:mysql://localhost:3306/seata?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;rewriteBatchedStatements=true&amp;&amp;serverTimezone=UTC</span>
<span class="token attr-name">store.db.user</span><span class="token punctuation">=</span><span class="token attr-value">root</span>
<span class="token attr-name">store.db.password</span><span class="token punctuation">=</span><span class="token attr-value">123456</span>
<span class="token attr-name">store.db.minConn</span><span class="token punctuation">=</span><span class="token attr-value">5</span>
<span class="token attr-name">store.db.maxConn</span><span class="token punctuation">=</span><span class="token attr-value">30</span>
<span class="token attr-name">store.db.globalTable</span><span class="token punctuation">=</span><span class="token attr-value">global_table</span>
<span class="token attr-name">store.db.branchTable</span><span class="token punctuation">=</span><span class="token attr-value">branch_table</span>
<span class="token attr-name">store.db.queryLimit</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">store.db.lockTable</span><span class="token punctuation">=</span><span class="token attr-value">lock_table</span>
<span class="token attr-name">store.db.maxWait</span><span class="token punctuation">=</span><span class="token attr-value">5000</span>
<span class="token attr-name">store.redis.mode</span><span class="token punctuation">=</span><span class="token attr-value">single</span>
<span class="token attr-name">store.redis.single.host</span><span class="token punctuation">=</span><span class="token attr-value">127.0.0.1</span>
<span class="token attr-name">store.redis.single.port</span><span class="token punctuation">=</span><span class="token attr-value">6379</span>
<span class="token attr-name">store.redis.sentinel.masterName</span><span class="token punctuation">=</span>
<span class="token attr-name">store.redis.sentinel.sentinelHosts</span><span class="token punctuation">=</span>
<span class="token attr-name">store.redis.maxConn</span><span class="token punctuation">=</span><span class="token attr-value">10</span>
<span class="token attr-name">store.redis.minConn</span><span class="token punctuation">=</span><span class="token attr-value">1</span>
<span class="token attr-name">store.redis.maxTotal</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">store.redis.database</span><span class="token punctuation">=</span><span class="token attr-value">0</span>
<span class="token attr-name">store.redis.password</span><span class="token punctuation">=</span>
<span class="token attr-name">store.redis.queryLimit</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">server.recovery.committingRetryPeriod</span><span class="token punctuation">=</span><span class="token attr-value">1000</span>
<span class="token attr-name">server.recovery.asynCommittingRetryPeriod</span><span class="token punctuation">=</span><span class="token attr-value">1000</span>
<span class="token attr-name">server.recovery.rollbackingRetryPeriod</span><span class="token punctuation">=</span><span class="token attr-value">1000</span>
<span class="token attr-name">server.recovery.timeoutRetryPeriod</span><span class="token punctuation">=</span><span class="token attr-value">1000</span>
<span class="token attr-name">server.maxCommitRetryTimeout</span><span class="token punctuation">=</span><span class="token attr-value">-1</span>
<span class="token attr-name">server.maxRollbackRetryTimeout</span><span class="token punctuation">=</span><span class="token attr-value">-1</span>
<span class="token attr-name">server.rollbackRetryTimeoutUnlockEnable</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">client.undo.dataValidation</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">client.undo.logSerialization</span><span class="token punctuation">=</span><span class="token attr-value">jackson</span>
<span class="token attr-name">client.undo.onlyCareUpdateColumns</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">server.undo.logSaveDays</span><span class="token punctuation">=</span><span class="token attr-value">7</span>
<span class="token attr-name">server.undo.logDeletePeriod</span><span class="token punctuation">=</span><span class="token attr-value">86400000</span>
<span class="token attr-name">client.undo.logTable</span><span class="token punctuation">=</span><span class="token attr-value">undo_log</span>
<span class="token attr-name">client.undo.compress.enable</span><span class="token punctuation">=</span><span class="token attr-value">true</span>
<span class="token attr-name">client.undo.compress.type</span><span class="token punctuation">=</span><span class="token attr-value">zip</span>
<span class="token attr-name">client.undo.compress.threshold</span><span class="token punctuation">=</span><span class="token attr-value">64k</span>
<span class="token attr-name">log.exceptionRate</span><span class="token punctuation">=</span><span class="token attr-value">100</span>
<span class="token attr-name">transport.serialization</span><span class="token punctuation">=</span><span class="token attr-value">seata</span>
<span class="token attr-name">transport.compressor</span><span class="token punctuation">=</span><span class="token attr-value">none</span>
<span class="token attr-name">metrics.enabled</span><span class="token punctuation">=</span><span class="token attr-value">false</span>
<span class="token attr-name">metrics.registryType</span><span class="token punctuation">=</span><span class="token attr-value">compact</span>
<span class="token attr-name">metrics.exporterList</span><span class="token punctuation">=</span><span class="token attr-value">prometheus</span>
<span class="token attr-name">metrics.exporterPrometheusPort</span><span class="token punctuation">=</span><span class="token attr-value">9898</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br></div></div><h2 id="数据库准备-客户端" tabindex="-1"><a class="header-anchor" href="#数据库准备-客户端" aria-hidden="true">#</a> 数据库准备（客户端）</h2>
<p>最终应该和业务库再一个库内</p>
<p><img src="/images/SpringCloud/14-1-Seata部署全流程/image-20220114225612986.png" alt="image-20220114225612986" loading="lazy"></p>
<p>如果有多个业务库 需要分别创建</p>
<p><img src="/images/SpringCloud/14-1-Seata部署全流程/image-20220114225637546.png" alt="image-20220114225637546" loading="lazy"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- for AT mode you must to init this sql for you business database. the seata server not need it.</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>undo_log<span class="token punctuation">`</span></span>
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span>     <span class="token keyword">BIGINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'branch transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span>           <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'global transaction id'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>context<span class="token punctuation">`</span></span>       <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'undo_log context,such as serialization'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>rollback_info<span class="token punctuation">`</span></span> <span class="token keyword">LONGBLOB</span>     <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'rollback info'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_status<span class="token punctuation">`</span></span>    <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span>      <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'0:normal status,1:defense status'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_created<span class="token punctuation">`</span></span>   <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'create datetime'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>log_modified<span class="token punctuation">`</span></span>  <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'modify datetime'</span><span class="token punctuation">,</span>
    <span class="token keyword">UNIQUE</span> <span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>ux_undo_log<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>xid<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>branch_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span>
  <span class="token keyword">AUTO_INCREMENT</span> <span class="token operator">=</span> <span class="token number">1</span>
  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span> utf8 <span class="token keyword">COMMENT</span> <span class="token operator">=</span><span class="token string">'AT transaction mode undo table'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端" aria-hidden="true">#</a> 客户端</h2>
<h3 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>seata.version</span><span class="token punctuation">></span></span>1.4.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>seata.version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--        这里是参考官方文档，引入和我们使用的seata server相同版本的seata 替换掉spring-cloud-alibaba-seata自带的--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${seata.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--        Nacos--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        微服务之间的调用--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-loadbalancer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


    <span class="token comment">&lt;!--        基本组件--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--        自己的api--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>cloud-api-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">2001</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>order<span class="token punctuation">-</span>service
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> myserver<span class="token punctuation">:</span><span class="token number">8435</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> nacos
        <span class="token key atrule">password</span><span class="token punctuation">:</span> nacos
        <span class="token comment"># 这里的命名空间无所谓 填啥都可以 跟seata没关系</span>
 <span class="token comment">#       namespace: 029fa2f3-e90a-400c-91ac-7f1b83dc4785</span>
  <span class="token comment">#    alibaba:</span>
  <span class="token comment">#      seata:</span>
  <span class="token comment"># 老版本要用这种方式开启（0.9.x） 新版本直接用下面那种</span>
  <span class="token comment">#        tx-service-group: ${spring.application.name}-tx_group</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
    <span class="token key atrule">username</span><span class="token punctuation">:</span> root
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/seata_order<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;rewriteBatchedStatements=true&amp;&amp;serverTimezone=UTC</span>
<span class="token comment"># 这里是开下log记录下回滚</span>
<span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">io</span><span class="token punctuation">:</span>
      <span class="token key atrule">seata</span><span class="token punctuation">:</span> info
<span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token comment"># 这里配置应用程序ID，和我们当前服务在Nacos注册的一致</span>
  <span class="token key atrule">application-id</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
  <span class="token comment"># 这里是选择分组 和之前在file.conf内注册的service一致（我之前注册的是seata-order-service-tx_group=default ）</span>
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span><span class="token punctuation">-</span>tx_group
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
      <span class="token comment"># 这里 是配置分组和服务的映射关系 我们之前把之前写的seata-order-service-tx_group=default搬过来就行</span>
      <span class="token key atrule">seata-order-service-tx_group</span><span class="token punctuation">:</span> default
  <span class="token comment"># 配置通讯</span>
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token comment"># 下面这里 配置我们在seata-server内配置的内容即可</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">application</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>server
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.cloud.nacos.discovery.server<span class="token punctuation">-</span>addr<span class="token punctuation">}</span>
      <span class="token key atrule">group</span><span class="token punctuation">:</span> <span class="token string">"SEATA_GROUP"</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token string">"029fa2f3-e90a-400c-91ac-7f1b83dc4785"</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token string">"nacos"</span>
      <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">"nacos"</span>

<span class="token comment"># 杂项</span>
<span class="token key atrule">mybatis-plus</span><span class="token punctuation">:</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> classpath<span class="token important">*:/mapper/**/*.xml</span>
  <span class="token key atrule">configuration</span><span class="token punctuation">:</span>
    <span class="token key atrule">log-impl</span><span class="token punctuation">:</span> org.apache.ibatis.logging.stdout.StdOutImpl
<span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span>
        <span class="token comment">#建立连接所用的时间，适用于网络状况正常的情况下，两端连接所需要的时间</span>
        <span class="token key atrule">ConnectTimeOut</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token comment">#指建立连接后从服务端读取到可用资源所用的时间 这里是为了等下分布式事务做准备</span>
        <span class="token key atrule">ReadTimeOut</span><span class="token punctuation">:</span> <span class="token number">5000</span>


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div><h3 id="主启动类关闭自动加载数据库" tabindex="-1"><a class="header-anchor" href="#主启动类关闭自动加载数据库" aria-hidden="true">#</a> 主启动类关闭自动加载数据库</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>exclude <span class="token operator">=</span> <span class="token class-name">DataSourceAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"com.Project.mapper"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderService2001Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">OrderService2001Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="自定义数据源" tabindex="-1"><a class="header-anchor" href="#自定义数据源" aria-hidden="true">#</a> 自定义数据源</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token class-name">Project</span><span class="token punctuation">.</span>config<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>druid<span class="token punctuation">.</span>pool<span class="token punctuation">.</span></span><span class="token class-name">DruidDataSource</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">com<span class="token punctuation">.</span>baomidou<span class="token punctuation">.</span>mybatisplus<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>spring<span class="token punctuation">.</span></span><span class="token class-name">MybatisSqlSessionFactoryBean</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactory</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span></span><span class="token class-name">SpringManagedTransactionFactory</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Value</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>core<span class="token punctuation">.</span>io<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">PathMatchingResourcePatternResolver</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> Amayakite
 * <span class="token keyword">@version</span> 1.0.0
 * <span class="token keyword">@date</span> 2022/1/13 21:54
 * <span class="token keyword">@description</span> 自定义数据源
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSourceProxyConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${mybatis-plus.mapper-locations}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mapperLocations<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"spring.datasource"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">druidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DruidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">sqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">MybatisSqlSessionFactoryBean</span> sqlSessionFactoryBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MybatisSqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setMapperLocations</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PathMatchingResourcePatternResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span>mapperLocations<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setTransactionFactory</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SpringManagedTransactionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>在需要开分布式的方法上加个注解即可</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">OrderMapper</span> orderMapper<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">AccountService</span> accountService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">StorageService</span> storageService<span class="token punctuation">;</span>


    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> SUCCESS_CODE <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建订单-》调用库存扣减库存-》调用账户服务扣减账户余额-》修改订单状态
     * 444 ERR 200 Success
     *
     * <span class="token keyword">@param</span> <span class="token parameter">order</span>
     */</span>
    <span class="token annotation punctuation">@GlobalTransactional</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"fsp-create-order"</span><span class="token punctuation">,</span> rollbackFor <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">TOrder</span> order<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"开始新建订单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       orderMapper<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"orderID:{}"</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        TODO</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用库存微服务进行扣减---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> decrease <span class="token operator">=</span> storageService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getProductId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>decrease<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>SUCCESS_CODE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用库存微服务进行扣减----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用账户微服务进行扣减---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> decreaseMoney <span class="token operator">=</span> accountService<span class="token punctuation">.</span><span class="token function">decrease</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> order<span class="token punctuation">.</span><span class="token function">getMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>decreaseMoney<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>SUCCESS_CODE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始调用账户微服务进行扣减----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始更新订单状态---START"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                orderMapper<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"订单微服务开始更新订单状态----END"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"下订单结束了 O(∩_∩)O哈哈~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token string">"下订单成功"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token string">"账户扣减失败"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">"库存扣减失败"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div></template>
