import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as p,c as o,a as n,b as s,d as l,e as a}from"./app-2d4b26c1.js";const i="/images/SpringCloud/06-OpenFeign服务调用/image-20220107002216095.png",u="/images/SpringCloud/06-OpenFeign服务调用/image-20220107002433314.png",r="/images/SpringCloud/06-OpenFeign服务调用/image-20220107140006892.png",k="/images/SpringCloud/06-OpenFeign服务调用/image-20220107140639004.png",d="/images/SpringCloud/06-OpenFeign服务调用/image-20220107151236540.png",g="/images/SpringCloud/06-OpenFeign服务调用/image-20220107153359361.png",m="/images/SpringCloud/06-OpenFeign服务调用/image-20220107153506807.png",v={},b=a('<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><blockquote><p>是啥？</p></blockquote><figure><img src="'+i+'" alt="image-20220107002216095" tabindex="0" loading="lazy"><figcaption>image-20220107002216095</figcaption></figure><p>是一个声明式的Web客户端服务端，让web服务客户端变得非常容易，我们只需要创建一个接口并在接口上添加注解即可</p><figure><img src="'+u+'" alt="image-20220107002433314" tabindex="0" loading="lazy"><figcaption>image-20220107002433314</figcaption></figure><h2 id="快速使用" tabindex="-1"><a class="header-anchor" href="#快速使用" aria-hidden="true">#</a> 快速使用</h2><h3 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h3><p>非常简单，我们只需要添加一个依赖，为了防止冲突 我这里重新建立了一个包</p><p>依赖：</p>',9),h=n("div",{class:"language-xml line-numbers-mode","data-ext":"xml"},[n("pre",{xml:"",class:"language-xml"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependencies")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.springframework.cloud"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("spring-cloud-starter-openfeign"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`

    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.springframework.cloud"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("spring-cloud-starter-netflix-eureka-client"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`

    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.springframework.boot"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("spring-boot-starter-web"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.springframework.boot"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("spring-boot-starter-actuator"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.springframework.boot"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("spring-boot-devtools"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("scope")]),n("span",{class:"token punctuation"},">")]),s("runtime"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("scope")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("optional")]),n("span",{class:"token punctuation"},">")]),s("true"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("optional")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.springframework.boot"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("spring-boot-configuration-processor"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("optional")]),n("span",{class:"token punctuation"},">")]),s("true"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("optional")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.projectlombok"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("lombok"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("optional")]),n("span",{class:"token punctuation"},">")]),s("true"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("optional")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.springframework.boot"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("spring-boot-starter-test"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("scope")]),n("span",{class:"token punctuation"},">")]),s("test"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("scope")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("com.amayakite"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("cloud-api-commons"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("version")]),n("span",{class:"token punctuation"},">")]),s("1.0-SNAPSHOT"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("version")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s("org.jetbrains"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("groupId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s("annotations"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("artifactId")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("version")]),n("span",{class:"token punctuation"},">")]),s("RELEASE"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("version")]),n("span",{class:"token punctuation"},">")]),s(`
        `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("scope")]),n("span",{class:"token punctuation"},">")]),s("compile"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("scope")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependency")]),n("span",{class:"token punctuation"},">")]),s(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("dependencies")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),y=n("h3",{id:"主程序和配置文件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#主程序和配置文件","aria-hidden":"true"},"#"),s(" 主程序和配置文件")],-1),f=n("p",null,"我这里依旧使用的是Eureka，使用其他的main程序配置同理",-1),_=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{java:"",class:"language-java"},[n("code",null,[n("span",{class:"token annotation punctuation"},"@SpringBootApplication"),s(`
`),n("span",{class:"token annotation punctuation"},"@EnableEurekaClient"),s(`
`),n("span",{class:"token annotation punctuation"},"@EnableFeignClients"),s(`
`),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"OrderFeign80Application"),s(),n("span",{class:"token punctuation"},"{"),s(`

    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"static"),s(),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"String"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(" args"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token class-name"},"SpringApplication"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"run"),n("span",{class:"token punctuation"},"("),n("span",{class:"token class-name"},"OrderFeign80Application"),n("span",{class:"token punctuation"},"."),n("span",{class:"token keyword"},"class"),n("span",{class:"token punctuation"},","),s(" args"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),I=a(`<p>这里的<code>@EnableFeignClients</code>表示开启feign服务</p><p>配置文件，连接Eureka</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token comment"># 配置Eureka</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token comment">#表示是否将自己注册进EurekaServer 默认true</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># 是否从EurekaServer抓取自己的注册信息，默认为true，单节点无所谓，集群必须设置为true才能配合ribbon使用均衡负载</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># EurekaServer的地址，默认为localhost:8761</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7001/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>7002/eureka
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> cloud<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>order<span class="token punctuation">-</span><span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="services" tabindex="-1"><a class="header-anchor" href="#services" aria-hidden="true">#</a> services</h3><p>我们只需要简单配置下service<strong>接口</strong>就能使用了，就像是mybatis那样</p><p>这个feign就相当于封装了restTemplate</p>`,6),x=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{java:"",class:"language-java"},[n("code",null,[n("span",{class:"token annotation punctuation"},"@Service"),s(`
`),n("span",{class:"token annotation punctuation"},"@FeignClient"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"CLOUD-PROVIDER-PAYMENT"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"interface"),s(),n("span",{class:"token class-name"},"PaymentFeignService"),s(),n("span",{class:"token punctuation"},"{"),s(`
    
    `),n("span",{class:"token annotation punctuation"},"@GetMapping"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/payment/test"'),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token class-name"},"String"),s(),n("span",{class:"token function"},"test"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"highlight-lines"},[n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=a(`<p>这里的<code>@FeignClient</code>表示使用哪个服务，然后下面的<code>@getmapping</code>就相当于是访问指定服务的指定接口</p><p>这里的<code>/payment/test</code>我在8001和8002上对应的方法为：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//8001</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/payment/test&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;8001 test&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 8002</span>
<span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/payment/test&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;8002 test&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="controller" tabindex="-1"><a class="header-anchor" href="#controller" aria-hidden="true">#</a> Controller</h3>`,4),S=n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{java:"",class:"language-java"},[n("code",null,[n("span",{class:"token annotation punctuation"},"@RestController"),s(`
`),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token class-name"},"OrderController"),s(),n("span",{class:"token punctuation"},"{"),s(`

    `),n("span",{class:"token annotation punctuation"},"@Autowired"),s(`
    `),n("span",{class:"token class-name"},"PaymentFeignService"),s(" paymentFeignService"),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token annotation punctuation"},"@GetMapping"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/test"'),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"public"),s(),n("span",{class:"token class-name"},"String"),s(),n("span",{class:"token function"},"test"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"return"),s(" paymentFeignService"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"test"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),E=a('<p>我们使用的话也非常简单，只需要注入这个接口就行，然后调用刚刚我们定义的方法</p><h3 id="启动并测试" tabindex="-1"><a class="header-anchor" href="#启动并测试" aria-hidden="true">#</a> 启动并测试</h3><p>启动后照常访问即可，结果就像是我们手动调用restTemplate那样</p><p>使用它的好处是：我们不用手动写RestTemplate了</p><figure><img src="'+r+`" alt="image-20220107140006892" tabindex="0" loading="lazy"><figcaption>image-20220107140006892</figcaption></figure><h2 id="openfeign的超时控制" tabindex="-1"><a class="header-anchor" href="#openfeign的超时控制" aria-hidden="true">#</a> OpenFeign的超时控制</h2><p>比方说我现在的8001服务处理需要时间，例如三秒钟</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&quot;8001 test&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们启动并测试，确实三秒多返回了结果（PS：552ms是因为第一次请求，所以要较长时间，之后就是20ms左右）</p><figure><img src="`+k+`" alt="image-20220107140639004" tabindex="0" loading="lazy"><figcaption>image-20220107140639004</figcaption></figure><p>如果是旧版本 默认是1s 也就是1s之后没有结果 抛出异常，新版本则是60s</p><p>旧版本修改默认超时时间为5s</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#设置feign客户端超时时间(OpenFeign默认支持ribbon)</span>
<span class="token key atrule">ribbon</span><span class="token punctuation">:</span>
<span class="token comment">#指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间</span>
  <span class="token key atrule">ReadTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
<span class="token comment">#指的是建立连接后从服务器读取到可用资源所用的时间</span>
  <span class="token key atrule">ConnectTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新版本修改默认超时时间为5s</p>`,14),j={href:"https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/#timeout-handling",target:"_blank",rel:"noopener noreferrer"},F=a(`<p>这官方文档就tm的绕</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span>
      <span class="token comment"># 这里使用驼峰也可以 都能那啥</span>
        <span class="token key atrule">connect-timeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token key atrule">read-timeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
<span class="token comment"># 如果要指定某个服务的超时，例如CLOUD-PROVIDER-PAYMENT：</span>
 <span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token comment"># 这里的服务名一定要是注册的服务名，如果不是Eureka，则要注意下大小写</span>
      <span class="token key atrule">CLOUD-PROVIDER-PAYMENT</span><span class="token punctuation">:</span>
        <span class="token key atrule">connectTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token key atrule">readTimeout</span><span class="token punctuation">:</span> <span class="token number">61000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="openfeign的日志打印" tabindex="-1"><a class="header-anchor" href="#openfeign的日志打印" aria-hidden="true">#</a> OpenFeign的日志打印</h2><figure><img src="`+d+`" alt="image-20220107151236540" tabindex="0" loading="lazy"><figcaption>image-20220107151236540</figcaption></figure><p>有四个级别</p><p>旧版本（使用ribbon的版本）需要手动注册下bean</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignConfig</span><span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span> <span class="token function">feginLoggerLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Logger<span class="token punctuation">.</span>Lever</span><span class="token punctuation">.</span><span class="token constant">FULL</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着在yaml中配置下debug级别即可</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">logging.level.com.Project.cloud</span><span class="token punctuation">:</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果说是最新版本：直接在yaml中配置如下的即可</p><p>注意 配置的loggerLevel打印只在<code>logging.level.你项目的包</code>为debug模式的时候生效</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
<span class="token comment">#      指定哪一个服务</span>
      <span class="token key atrule">CLOUD-PROVIDER-PAYMENT</span><span class="token punctuation">:</span>
        <span class="token key atrule">connectTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token key atrule">readTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token key atrule">loggerLevel</span><span class="token punctuation">:</span> full
<span class="token key atrule">logging.level.com.Project.cloud</span><span class="token punctuation">:</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><figure><img src="`+g+'" alt="image-20220107153359361" tabindex="0" loading="lazy"><figcaption>image-20220107153359361</figcaption></figure><p>非常的详细</p><figure><img src="'+m+'" alt="image-20220107153506807" tabindex="0" loading="lazy"><figcaption>image-20220107153506807</figcaption></figure>',16);function O(C,L){const t=c("ExternalLinkIcon");return p(),o("div",null,[b,h,y,f,_,I,x,w,S,E,n("p",null,[s("官方文档"),n("a",j,[s("https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/#timeout-handling"),l(t)])]),F])}const q=e(v,[["render",O],["__file","06-OpenFeign服务调用.html.vue"]]);export{q as default};
