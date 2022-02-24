---
title: 02-SpringBoot核心功能
date: 2021-12-18 14:03:05
category: SpringBoot
tag:
- Java
- SpringBoot
- SpringMvc
- JavaWeb
---

# 配置文件

## properties配置文件

就和我们之前的properties一样

## yaml

​YAML是`YAML Ain't Markup Langurage` (YAML 不是一种标记语言) 的递归缩写，在开发的这种语言时候，YAML的意思是`Yet Another Markup Language`（任然是一种标记语言）

​所以江湖人称：薛定谔的YAML

​非常适合用来做以数据为中心的配置文件

​这玩意比properties和xml和json方便很多  直观很多 语法更容易懂

语法：

```yaml
key: value
# 大小写敏感 用# 注释 字符型内容建议用“”或者''包裹 注意 key: 和value之间有一个空格
user:
 name: "张三"
 age: 14
 #允许缩进表示层级关系 缩进必须用空格
 cat:
name: "tomcat"
color: "绿色"
 
# 上面这个可以简写：
user: {name: "张三",age: 14}
# 关于数组/集合
list:
 - "起床"
 - "吃饭"
 - "睡觉"
 # 普通写法： 空格-空格内容
# 简写
```

来一个直观的例子：

我们先价格lombok依赖 自动生成下字段

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

然后一个宠物类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pet {
    private String name;
    /**
     * 体重
     */
    private Double weight;
}

```

和一个Person类：

```java
@ConfigurationProperties(prefix = "person") //读取配置文件中的前缀为person的东西自动注入
@Component //注册组件
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    private String userName;
    private Boolean boss;
    private Date birth;
    private Integer age;
    private Pet pet;
    private String[] interests;
    private List<String> animals;
    private Map<String, Object> score;
    private Set<Double> salarys;
    private Map<String, List<Pet>> allPets;
}
```

接下来再创建一个`application.yaml`或者`application.yml` 两者都是一样的，后者的名称是简写而已，spring boot 会自动扫描是否有叫application开头的xml peoperties 或者yml 并自动导入（注意，三者可以同时存在，例如propertes和yml都有 或者三者都有）

```yaml
person:
  userName: "张三"
  boss: true
  birth: 2019/12/12
  age: 18
  interests:
    - 篮球
    - 足球
    - 睡觉
  animals: [猫，狗]
  score:
    math: 100
    chinese: 90
    english: 80
    programming: 90
  salarys:
    - 9999
    - 8888
    - 7777
    - 6666
  pet:
    name: 小白
    weight: 999.9
  allPets:
    sick:
      - {name: 啊狗,weight: 99.99}
      - {name: 阿猫,weight: 88.88}
      - name: 啊虫
        weight: 77.77
    healthy:
      - {name: 小白,weight: 999.9}
      - {name: 小红,weight: 888.8}
      - {name: 小黑,weight: 777.7}
      - {name: 小白,weight: 666.6}
```

接着编写一下Controller:

```java
@RestController
public class HelloController {

    @Autowired
    private Person person;

    @RequestMapping("/person")
    public Person person() {
        return person;
    }
}

```

然后启动下spring boot（如果你在这之前用了mybatis或者redis之类的依赖包但是还没配置的话 先把那些包注释掉 然后刷新maven再启动 不然会报错）

访问：获取到如下内容

![image-20211218152759601](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218152759601.png)

```json
{
    "userName":"张三",
    "boss":true,
    "birth":"2019-12-11T16:00:00.000+00:00",
    "age":18,"pet":{"name":"小白","weight":999.9},
    "interests":["篮球","足球","睡觉"],
    "animals":["猫，狗"],
    "score":{"math":100,"chinese":90,"english":80,"programming":90},
    "salarys":[9999.0,8888.0,7777.0,6666.0],
    "allPets":{
        "sick":[
            {"name":"啊狗","weight":99.99},
            {"name":"阿猫","weight":88.88},
            {"name":"啊虫","weight":77.77}
        ],
        "healthy":[
            {"name":"小白","weight":999.9},
            {"name":"小红","weight":888.8},
            {"name":"小黑","weight":777.7},
            {"name":"小白","weight":666.6}
        ]
    }
}
```

当然，我们也可以在yaml中配置spring相关的内容，非常方便

```yaml
spring:
  banner:
    image:
      bitdepth: 8
  cache:
    jcache:
      config: application.yml
```

**优先原则：xml>properties>yml>yaml**

### YML补充说明-换行和转义

如果使用双引号

```yaml
username: "张三\n今年18"
```

输出（控制台）：

```
张三
# 中间有个换行符
今年10
```

如果使用单引号：

```yaml
username: '张三\n今年18'
```

输出（控制台）：

```
张三\\n今年18
```

总结：**单引号会将`\n`作为字符串输出**，**双引号会将`\n`作为换行符输出**

双引号不会转义 单引号会转义

### 扩展-Spring的注释智能提示

可能你会发现，我们在编写自己的配置的时候，spring没有给我们任何提示

但是在写官方的配置的时候，却给了我们一大堆

为此官方也提供了[解决方法](https://docs.spring.io/spring-boot/docs/current/reference/html/configuration-metadata.html#configuration-metadata.annotation-processor.configuring)

在pom.xml中添加如下依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

接着你编写xml的时候就能看到智能提示了

![image-20211218155524231](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218155524231.png)

如果我们文件中是才用驼峰命名法 则这里可以才用中横线命名 最终spring会自动帮我们进行转换

# Web开发

## SpringMVC自动配置的内容概览

[官方文档](<https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator>

SpringBoot对SpringMVC做了非常多的配置，**大多数场景下我们都无需自定义配置**

- `ConTentNegotiatingViewResolver`和`BeanNameViewResolver`

  - 内容协商视图解析器和BeanName视图解析器

- 自动注册`Converter/GenericConverter/Formatter` 转换器 解析器

- 支持`HttpMessageConverters` 这玩意之后会说是啥

- 自动注册`MessageCodeResolver`国际化用

- 静态`index.html`支持 OHHHH支持我们的Vue Project了

- 可以自定义`Favicon`

- 自动使用`ConfigurableWebBindingInitializer`

  - DataBinder负责将请求数据绑定到JavaBean上

    >不用@EnableWebMvc注解，使用@Configuration+WebMVcConfigurer自定义规则

### 简单功能分析

#### 创建项目

![image-20211218161453497](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218161453497.png)

勾上这些 都是我们要用的

## 静态资源规则和定制化

[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/web.html#web.servlet.spring-mvc.static-content)上面说

> ​By default, Spring Boot serves static content from a directory called `/static` (or `/public` or `/resources` or `/META-INF/resources`) in the classpath or from the root of the `ServletContext`. It uses the `ResourceHttpRequestHandler` from Spring MVC so that you can modify that behavior by adding your own `WebMvcConfigurer` and overriding the `addResourceHandlers` method.
>
> ​默认情况下，Spring Boot 提供来自**类路径**中名为`/static`（或`/public`或`/resources`或`/META-INF/resources`）的目录或从`ServletContext`. 它使用`ResourceHttpRequestHandler`来自 Spring MVC 的，以便您可以通过添加自己`WebMvcConfigurer`的`addResourceHandlers`方法并覆盖该方法来修改该行为。

注意，这几个目录都是在resources资源目录下，访问任意一个目录等同于访问根路径下的相应资源

他们几个可以共存

### 指定静态资源前缀

默认映射的路径是`/**`也就当前项目的根路径，可以更该映射路径，例如指定一下要访问myPublic才能访问指定的资源

通常情况下 静态资源都会加一个前缀，和其他接口区分开来，方便使用

```properties
spring.mvc.static-path-pattern=/Mypublic/**
```

![image-20211218165149046](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218165149046.png)

至于访问级别，依旧是跟SPringMVC中一样，如果说我们加了一个和他相同路径的Controller

```java
@RestController
public class HelloController {

    @RequestMapping("/Mypublic/1.jpg")
    public String hello() {
        return "hello";
    }

}
```

![image-20211218165529215](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218165529215.png)

那么依旧是这个Controller优先显示

请求进来，先去找Controller看看能不能处理，不能的话再去找静态资源 如果还没有就抛404

### 修改静态资源路径

你可以通过如下方式来指定静态资源的路径，可以指定多个

```yaml
spring:
  web:
    resources:
      static-locations:
        - classpath:/META-INF/resources/
        - classpath:/resources/
        - classpath:/MyPublic/
        - classpath:/static/
# 如果是指定一个的话：
spring:
  web:
    resources:
      static-locations:/MyPublic/
```

如果要在properties中指定的话

指定多个：

```properties
spring.web.resources.static-locations[0]=classpath:/Mypublic/
spring.web.resources.static-locations[1]=classpath:/META-INF/resources/
```

指定一个：

```properties
spring.web.resources.static-locations=classpath:/Mypublic/
```

### 关于欢迎页面(index.html)

​我们在static之类的目录下创建一个index.html页面即可 该页面会作为我们的欢迎页面

但是通常情况下这类文件夹是要加前缀的，所以我们有时候并不能直接从根路径下访问到

例如我们制定了前缀

```xml
spring.mvc.static-path-pattern=/Mypublic/**
```

如果我们要设置一个根路径下的欢迎页面，需要：

添加1个依赖包

PS：不建议这种方式 建议往下翻 看最后一种笨方法 这个玩意有问题

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

我们在`templates`目录下新建一个index.html

![image-20211218174232690](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218174232690.png)

访问

![image-20211218175951773](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218175951773.png)

但是这样的话，static之类里面定义的index.html就失效了，也就是说我们访问`/Mypublic`并不会跳转到相应目录下的`index.html` 好像本来就是这样的？我也不太清楚是怎么一回事 以后遇到了再说

而且，`/Mypublic`下一般都是存放静态文件 所以说也不一定需要index.html

当然 我们也可以选择整一个Controller来配置欢迎页

但是最好的方式是：

**我们在相应的static目录下新建相关的public目录，专门用于存放静态资源**

static文件夹本身就应该是一个根路径

这样就可以解决一切问题。。

### 静态资源配置原理

SpringBoot启动的时候默认加载xxxAutoConfiguration类(自动配置)

主要是这个类

![image-20211218194410609](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218194410609.png)

SpringMVC功能的自动配置大多数集中在这个WebMvcAutoConfiguration这个类内

我们先来看它是否生效

```java
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
```

第一个 判断是不是一个Servlet应用 我们这里是 所以成功

第二个 判断 判断是否有这几个类 我们都没标红  所以生效

第三个 判断容器中没有WebMvcConfigurationSupport这个类的组件的时候才会注册 这个我们后面再说 目前是已经生效了（没有WebMvcConfigurationSupport这个类的组件）

接下来看看都配置了什么

- 这是SpringMVC兼容RestFul风格的Bean 表单可以提交 `ip:port/project/{name}`这种类型的请求

```java
@Bean
@ConditionalOnMissingBean(HiddenHttpMethodFilter.class)
@ConditionalOnProperty(prefix = "spring.mvc.hiddenmethod.filter", name = "enabled")
public OrderedHiddenHttpMethodFilter hiddenHttpMethodFilter() {
    return new OrderedHiddenHttpMethodFilter();
}
```

- 表单内容过滤器

```java
@Bean
@ConditionalOnMissingBean(FormContentFilter.class)
@ConditionalOnProperty(prefix = "spring.mvc.formcontent.filter", name = "enabled", matchIfMissing = true)
public OrderedFormContentFilter formContentFilter() {
    return new OrderedFormContentFilter();
}
```

然后看到了一个内部类

```java
@Configuration(proxyBeanMethods = false)
@Import(EnableWebMvcConfiguration.class)
@EnableConfigurationProperties({ WebMvcProperties.class, WebProperties.class })
@Order(0)
public static class WebMvcAutoConfigurationAdapter implements WebMvcConfigurer, ServletContextAware {
    ...
}
```

看到这个properties 就该知道 会把配置文件中的某些东西 跟这个类进行绑定

- WebMvcProperties是跟SpringMVC的配置进行了相应的绑定
- WebProperties同理

接着，可以看到这个类里面只有一个有参构造器

```java
public WebMvcAutoConfigurationAdapter(
    WebProperties webProperties,
    WebMvcProperties mvcProperties,
    ListableBeanFactory beanFactory,
    ObjectProvider<HttpMessageConverters> messageConvertersProvider,
    ObjectProvider<ResourceHandlerRegistrationCustomizer> resourceHandlerRegistrationCustomizerProvider,
    ObjectProvider<DispatcherServletPath> dispatcherServletPath,
    ObjectProvider<ServletRegistrationBean<?>> servletRegistrations
) {
    this.resourceProperties = webProperties.getResources();
    this.mvcProperties = mvcProperties;
    this.beanFactory = beanFactory;
    this.messageConvertersProvider = messageConvertersProvider;
    this.resourceHandlerRegistrationCustomizer = resourceHandlerRegistrationCustomizerProvider.getIfAvailable();
    this.dispatcherServletPath = dispatcherServletPath;
    this.servletRegistrations = servletRegistrations;
    this.mvcProperties.checkConfiguration();
}
```

也就是说这个类的所有参数的值都会从容器当中找

- WebProperties：绑定了Spring的WebProperties绑定的所有属性值
- WebMvcProperties：绑定了spring.mvc绑定的所有属性值
- ListableBeanFactory：Spring的Bean工厂，也就是Spring的Bean容器
- `ObjectProvider<HttpMessageConverters>`找到容器中所有的HttpMessageConverters
- `ObjectProvider<ResourceHandlerRegistrationCustomizer>`找到容器内的所有资源处理器的自定义器
- `ObjectProvider<DispatcherServletPath>` DispatcherServlet处理的路径
- `ObjectProvider<ServletRegistrationBean<?>>` 这是给应用注册Servlet、filter之类的时候用的

接着我们能在这个类中看到非常多的bean 当让大部分跟我们都没什么关系

直接看这个

#### 资源处理的默认规则

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    if (!this.resourceProperties.isAddMappings()) {
        logger.debug("Default resource handling disabled");
        return;
    }
    addResourceHandler(registry, "/webjars/**", "classpath:/META-INF/resources/webjars/");
    addResourceHandler(registry, this.mvcProperties.getStaticPathPattern(), (registration) -> {
        registration.addResourceLocations(this.resourceProperties.getStaticLocations());
        if (this.servletContext != null) {
            ServletContextResource resource = new ServletContextResource(this.servletContext, SERVLET_LOCATION);
            registration.addResourceLocations(resource);
        }
    });
}
```

我们打一个debug，然后运行程序 看看他会运行什么

![image-20211218200551745](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218200551745.png)

首先就看到这玩意是false 但这是一个反向判断(True变false) 所以我们进下这个isAddMappings看看里面都是啥

```java
/**
* Whether to enable default resource handling.
是否启用默认资源处理
*/
private boolean addMappings = true;
```

也就是说这玩意配置成false 上面那代码下面的所有内容都不生效

如果是true的话 ，如下内容将生效

```java
addResourceHandler(registry, "/webjars/**", "classpath:/META-INF/resources/webjars/");
addResourceHandler(registry, this.mvcProperties.getStaticPathPattern(), (registration) -> {
  registration.addResourceLocations(this.resourceProperties.getStaticLocations());
    if (this.servletContext != null) {
        ServletContextResource resource = new ServletContextResource(this.servletContext, SERVLET_LOCATION);
        registration.addResourceLocations(resource);
    }
});
```

这里我就直接说了-这玩意就是配置静态资源的映射

我们到配置文件看看是否有对应的项目

![image-20211218201813936](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218201813936.png)

有这个玩意，接下来我们把他改成false

```yaml
spring:
  web:
    resources:
      add-mappings: false
```

也就是我们所有的静态资源以后都访问不了

接下来我们访问项目内的所有静态资源都访问不了了

那我们还是设置成为true吧

然后我们看看为true会执行那些代码

首先是

```java
addResourceHandler(registry, "/webjars/**", "classpath:/META-INF/resources/webjars/");
```

这里的意思大概是：/META-INF/resources/webjars/这个目录的所有资源，映射到`/webjars`这个路径下（PS：webjars也是一个springboot 的依赖 可以通过它对项目增加vue jquery nodejs之类的前端js框架代码 不过现在没几个人用了..）

接着就是这个

可以看到 跟上面的代码差不多的样子

- `getStaticPathPattern`这里指向`private String staticPathPattern = "/**";`

- `getStaticLocations`这里指向

  - ```java
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
          "classpath:/resources/", "classpath:/static/", "classpath:/public/" };
    ```

- 根据上面代码的内容 可以知道 这里是将CLASSPATH_RESOURCE_LOCATIONS的路径映射到`/**`目录下

```java
addResourceHandler(registry, this.mvcProperties.getStaticPathPattern(), (registration) -> {
    registration.addResourceLocations(this.resourceProperties.getStaticLocations());
    if (this.servletContext != null) {
        ServletContextResource resource = new ServletContextResource(this.servletContext, SERVLET_LOCATION);
        registration.addResourceLocations(resource);
    }
});
```

接着这里判断servletContext是否为null 根据我们前面的了解 感觉这里肯定是不为null的（都到了这里来了）

接着它执行了一个方法 new 了一个ServletContextResource()

> 创建新的ServletContextResource。 Servlet规范要求资源路径以斜杠开头，即使许多容器也接受没有前导斜杠的路径。因此，如果给定的路径尚未以斜杠开始，则它将以斜杠作为前缀。 形参: servletContext–要从中加载的servletContext 路径–资源的路径
>
> 支持的参数`ServletContext servletContext, String path`

这里就不多说了，我们接着看后面的源码

然后看到了另外一个内部类

```java
@Configuration(proxyBeanMethods = false)
 @EnableConfigurationProperties(WebProperties.class)
 public static class EnableWebMvcConfiguration extends DelegatingWebMvcConfiguration implements ResourceLoaderAware {......}
```

接着我们看到了一个非常眼熟的玩意

```java
@Bean
public WelcomePageHandlerMapping welcomePageHandlerMapping(
    ApplicationContext applicationContext,                                     
    FormattingConversionService mvcConversionService,
    ResourceUrlProvider mvcResourceUrlProvider
) {
    WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(
        new TemplateAvailabilityProviders(applicationContext), applicationContext, getWelcomePage(),
        this.mvcProperties.getStaticPathPattern());
    welcomePageHandlerMapping.setInterceptors(getInterceptors(mvcConversionService, mvcResourceUrlProvider));
    welcomePageHandlerMapping.setCorsConfigurations(getCorsConfigurations());
    return welcomePageHandlerMapping;
}
```

- HandlerMapping：顾名思义：处理器映射器，保存了每一个hanlder能处理的请求（SpringMVC的）

- 接着它那参数，new了一个WelcomePageHandlerMapping，然后传入了一堆参数

- 其中就有一个`this.mvcProperties.getStaticPathPattern()`

- 也就是我们之前配置的指定静态资源前缀

- 这个默认是`staticPathPattern = "/**"`

- 接着我们回到这个 new WelcomePageHandlerMapping看看源码

- ```java {6}
  WelcomePageHandlerMapping(
      TemplateAvailabilityProviders templateAvailabilityProviders, 
      ApplicationContext applicationContext, Resource welcomePage, 
      String staticPathPattern) {
      
      if (welcomePage != null && "/**".equals(staticPathPattern)) {
          logger.info("Adding welcome page: " + welcomePage);
          setRootViewName("forward:index.html");
      }
      else if (welcomeTemplateExists(templateAvailabilityProviders, applicationContext)) {
          logger.info("Adding welcome page template: index");
          setRootViewName("index");
      }
      
  }
  ```

- 看到那个if了吗 staticPathPattern  就是我们传入的路径 他这里对比是不是根路径 如果是 才有欢迎页 否则毛都没有

- 绝了 妈的 而且这里是写死了的， 写在构造方法里的 传入的值也是固定的 我们没法更改

### 禁用所有静态资源

```yaml
spring:
  web:
    resources:
      add-mappings: false
```

### 静态资源返回给浏览器的缓存时间控制

```yaml
spring:
  web:
    resources:
      cache:
        period: 3600
        # 这里配置时间即可 以表为单位
```

## 请求参数处理

### 请求映射

众所周知，现在流行Rest风格的请求

- /user
- get 获取用户 delete 删除用户 put 修改用户 post 保存用户

以前是要通过配置核心filter`HiddenHttpMethodFilter`来实现 当然spring boot 已经帮我们做过了

我们只需要编写自己的代码即可轻松完成相应的操作

```java
@RestController
public class HelloController {

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public String getUser() {
        return "Get User";
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public String postUser() {
        return "Post User";
    }

    @RequestMapping(value = "/user", method = RequestMethod.PUT)
    public String putUser() {
        return "Put User";
    }

    @RequestMapping(value = "/user", method = RequestMethod.DELETE)
    public String deleteUser() {
        return "Delete User";
    }


}

```

补充：如果不使用ajax请求，使用普通的表单，提交put和delete需要这样做：

```html
<form action="/user" method="POST">
    <input name="_method" type="hidden" value="DELETE" />
</form>
```

并且要在配置文件中额外加上这项

```properties
spring.mvc.hiddenmethod.filter.enabled=true
```

那么为什么需要这样呢？我们直接看源码吧

```java
@Bean
@ConditionalOnMissingBean(HiddenHttpMethodFilter.class)
@ConditionalOnProperty(prefix = "spring.mvc.hiddenmethod.filter", name = "enabled")
// 这里创建了一个 OrderedHiddenHttpMethodFilter 然后注入了一个spring.mvc.hiddenmethod.filter.enabled
public OrderedHiddenHttpMethodFilter hiddenHttpMethodFilter() {
    return new OrderedHiddenHttpMethodFilter();
}
```

接着看下这个new 的类

```java
public class OrderedHiddenHttpMethodFilter extends HiddenHttpMethodFilter implements OrderedFilter {
    public static final int DEFAULT_ORDER = REQUEST_WRAPPER_FILTER_MAX_ORDER - 10000;
    private int order = DEFAULT_ORDER;
    @Override
    public int getOrder() {
        return this.order;
    }
    public void setOrder(int order) {
        this.order = order;
    }
}

```

平平无奇 甚至没有方法 说明它的父类有点东西 发现这个方法

```java
public class HiddenHttpMethodFilter extends OncePerRequestFilter {
    //......

    @Override
    protected void doFilterInternal(
        HttpServletRequest request, 
        HttpServletResponse response, FilterChain filterChain
    ) // 获取到的都是原生的属性 一看就明白 一个chain
        throws ServletException, IOException
    {

        HttpServletRequest requestToUse = request;
        //获取请求
        if (
            "POST".equals(request.getMethod())  // 判断是不是post请求
            && 
            request.getAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE) 
            // 判断这个请求是否正确
            == null) 
        {
            String paramValue = request.getParameter(this.methodParam);
            //获取param中名为`_method`的value

            //判断这个value是否为null 并且长度是不是0
            if (StringUtils.hasLength(paramValue)) {
                // 转换成大写
                String method = paramValue.toUpperCase(Locale.ENGLISH);
                // 判断是否存在我们的rest风格中
                //Arrays.asList(HttpMethod.PUT.name(),HttpMethod.DELETE.name(),HttpMethod.PATCH.name()  PUT  DELETE   PATCH
                if (ALLOWED_METHODS.contains(method)) {
                    //转换成对应的请求方式并交给下一代
                    // 草 之前那个定义的局部变量厉害啊
                    requestToUse = new HttpMethodRequestWrapper(request, method);
                }
            }
        }

        filterChain.doFilter(requestToUse, response);
    }


    //接下来我们看看那个HttpMethodRequestWrapper
    private static class HttpMethodRequestWrapper extends HttpServletRequestWrapper {

        private final String method;

        // 可以看到 这里就做了一件事--重写method的值
        public HttpMethodRequestWrapper
            (HttpServletRequest request, String method) {
            super(request);
            this.method = method;
        }

        @Override
        public String getMethod() {
            return this.method;
        }
    }

}

}
```

那如果是通过Ajax呢？

可以很负责任的告诉你 它并不会走这一遭 这就是给某些浏览器用  现在市面上大部分浏览器都支持各式各样的表单请求了。。。

AJax 是直接走的PUT的请求，而不是POST+_method 所以并不会走这一条 也就是原生的PUT

但是毕竟之后是要做微服务嘛，谁也不知道到底是啥玩意在请求 所以最好也开启下那个配置

### @RequestMapping(val,met)的缩写--@GetMapping()

草 这也是SpringMVC有的功能  只是之前不知道

这个注解就是封装了@Requestmapping...

![image-20211218215448830](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218215448830.png)

```java

@RestController
public class HelloController {

    @GetMapping("/user")
    public String getUser() {
        return "Get User";
    }

    @PostMapping("/user")
    public String postUser() {
        return "Post User";
    }

    @PutMapping("/user")
    public String putUser() {
        return "Put User";
    }

    @DeleteMapping("/user")
    public String deleteUser() {
        return "Delete User";
    }


}

```

### 扩展-如何在表单提交时将_method改变成我们喜欢的名字

很简单 新建一个配置类 覆盖原本的bean即可（Spring Boot的条件装配 如果用户配置了，则覆盖默认的）

```java
@Configuration(proxyBeanMethods = false)
public class WebConfig {

    @Bean
    public HiddenHttpMethodFilter hiddenHttpMethodFilter() {
        HiddenHttpMethodFilter hiddenHttpMethodFilter = new HiddenHttpMethodFilter();
        hiddenHttpMethodFilter.setMethodParam("_abc");

        return hiddenHttpMethodFilter;
    }


}
```

### 关于@Mapping注解的方法是如何被找到的(请求映射原理)

看这个[视频](https://www.bilibili.com/video/BV19K4y1L7MT?p=28&spm_id_from=pageDriver)

面试八股文预定

### 获取请求参数的注解一览

### @PathVariable 获取Restful风格的请求参数

`ip:port/{id}`

```java
@GetMapping("/car/{id}/own/{username}")
public String getCar(
    @PathVariable("id") Integer id,
    @PathVariable("username") String username，
    //还可以获取简直对形式 并且和前两项不冲突 但是只能获取string类型的键值对
    @PathVariable Map<String,String> pv
    // 这里相当于获取到的是 id=? 和 username=?
    // id和username是key ？分别是他们两的value
){
    // do something
}
```

### @RequestHeader 获取请求头

```java
@GetMapping("/car")
public String getCar(
 @RequestHeader  Map<String,String> headers, //直接用的话 是获取所有请求头key-value对
    @RequestHeader("AdminToken") String tokne // 获取指定的请求头 可以和上面的共存 
){
    // do something
}
```

### @RequestParam 获取请求参数

```java
@RequestParam("age") Integer age// 获取单个 
@RequestParam("inters") List<String> inters // 获取多个
@RequestParam Map<String,String> allparams// 获取全部 
```

### @CookieValue 获取指定cookie的值

```java
@CookieValue("admin_token") String token
也可以设定返回值为COOKIE 获取这个COOKIE的全部信息;
@CookieValue("admin_token") Cookie token;
```

### @RequestBody 获取请求体的值

get方法是没有请求体的，其他的都有

```java
@PostMapping("/save")
public  postMap(@RequestBody User user){
    return user;
}
```

注意 @requestBody只能这样声明 或者加一个required=false，这样就很难辨别用户传入的数据的真伪

但是有解决方案

### @Valid 配合@RequestBody验证用户传入的内容

我们现在先来创建一个User吧

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private Integer id;
    private String username;
    private String password;

}

```

紧接着，在创建一个postmapping

```java
@PostMapping("/login")
public User login(@RequestBody User user) {
    return user;
}
```

正常来说我们传入的参数不符合的话 就会抛出405 并且抛出我们的代码

![image-20211218231915629](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218231915629.png)

所以说这个时候就要用到@Validated来进行验证了

首先需要添加下依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

接着在我们的方法中加上这个@Validated

```java
@PostMapping(value = "/login")
public User login(@RequestBody @Validated User user, HttpServletResponse response) {
    return user;
}
```

然后修改我们的domain--加上验证类型

```java
public class User {

    private Integer id;

    @NotBlank(message = "用户名不能为空")
    private String username;

    @NotBlank(message = "密码不能为空")
    private String password;

}
```

当让不止这一种验证类型，还有：

![img](/images/SpringBoot/02-Spring_Boot核心功能/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMzUyNzc3,size_16,color_FFFFFF,t_70.png)

这样做还是会有异常 的 但是异常的信息我们就都知道了 之后会说明怎么在spring boot中定制化异常处理

![image-20211218233619837](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218233619837.png)

尝试下正确的值：

![image-20211218234351542](/images/SpringBoot/02-Spring_Boot核心功能/image-20211218234351542.png)

### @RequestAttribute 获取请求域中的信息

一个代码概括

```java
@Controller
public class RequestController {

    @GetMapping("/goto")
    public String goToPage(HttpServletRequest request) {
        request.setAttribute("msg", "成功了");
        request.setAttribute("code", 200);
        return "forward:/goback";
    }

    @GetMapping(value = "/goback", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String goback(
        @RequestAttribute("msg") String msg, //获取request的信息
        @RequestAttribute("code") int code
    ) {
        //        返回json
        return "{\"msg\":\"" + msg + "\",\"code\":" + code + "}";
    }


}

```

### @MatrixVariable 获取矩阵变量

实际工作中用的并不多

大概是获取这样的参数：

`http://ip:port/张三;name=xxx/123456789;age=xxx/xxx?xxxx`

这样的玩意  ：

`http://ip:port/${username};name=?...`

详细可以看这个[视频](https://www.bilibili.com/video/BV19K4y1L7MT?p=31&spm_id_from=pageDriver) 需要做额外的配置

### 关于SpringMVC是如何获取到参数的

看视频<https://www.bilibili.com/video/BV19K4y1L7MT?p=32>

md底层嵌套太痛苦了 感觉前几年就先用着吧 不去过多了解底层

### 向request域中放数据的几种方式

- Map
- Model
- HttpServletRequest

无论我们是 Map 还是Model 底层都是调用了mavContatiner.getModel --> BindingAwareModelMap-->LinkedMap获取到的值 这玩意又是 Model 又是 Map，本质上是同一个对象 一个请求中的Map和Model都是在同一个`BindingAwareModelMap`上的

例如：

```java
@GetMapping("/test1")
public String t1(
    Map<String, Object> map,
    Model model,
    HttpServletRequest req,
    HttpServletResponse res
) {
    map.put("hello", 666);
    model.addAttribute("world", 7777);
    req.setAttribute("message", "hello world");
    Cookie cookie = new Cookie("userToken", "123456");
    res.addCookie(cookie);
    return "forward:/success";
}

@GetMapping("/success")
@ResponseBody
public Map<String, Object> success(HttpServletRequest req) {
    Object hello = req.getAttribute("hello");
    Object world = req.getAttribute("world");
    Object message = req.getAttribute("message");
    Map<String, Object> map = new HashMap<>(3);
    map.put("hello", hello);
    map.put("world", world);
    map.put("message", message);
    return map;
}
```

结果：

![image-20211219132659882](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219132659882.png)

### ✨自定义接收参数类型转换器

md 这里 有大坑

先说下坑吧 我们处理数据的时候，只能处理参数，不能处理`请求体`的内容：

例如我们想要存放一只cat  但是我们是这样传入值的：

`http://localhost:8080/testpet?pet=aa,123456`

名字和age中间用逗号分隔，而不是说分开来 例如name=xxx，age=xxx

这个时候我们可以通过自定义类型转换器来解决，但如果说你要在@RequestBody内对pet进行转换，那就会报错，也就是说，如果我们要在请求的时候，例如ajax请求：

```js
axios.post("xxx",{...data},{params:{xxx}})
这种样子的参数始终应该在params内 它不应该在data内，否则无法被解析
```

好了，接下来说下怎么配置pet=aa,123456时我们应该做的转换器

有两种实现方式 一种以后更好维护，一种不用创建那么多文件

这里更推荐这种

其实,之前我们在SPringMVC的时候，知道该怎么样去自定义类型转换器，当然那是在配置文件中，现在可以换成注解来了

```java
@Configuration  // 在一个configuration内
public class WebConfig {

    @Bean // 注册一个WebMvcConfigurer类型的bean 里面的内容将会自动添加到springmvc的配置内
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addFormatters(FormatterRegistry registry) {
                // 添加一个转换器 new出来 要接受两个泛型 第一个是要转换的类型 第二个是转换后的类型
                registry.addConverter(new Converter<String, Pet>() {
                    @Override
                    public Pet convert(String source) {
   
                        // 通过逻辑进行转换
                        String[] data = source.split(",");
                        Pet pet = new Pet();
                        pet.setName(data[0]);
                        pet.setAge(Integer.valueOf(data[1]));
                        return pet;
                    }
                });
            }
        };
    }

}

```

另外一个种 这里就直接说 不放代码 写一个类 实现Converter接口 逻辑写上面的那些

再写一个类 实现webMvcConfigurer接口 然后加上@configuration注解

接着重写第二个类的addFormatters方法，然后用registry.addConverter（new 第一个类）即可

### 关于内容协商和自动通过客户端类型返回json/xml

内容协商原理建议看[这个视频](https://www.bilibili.com/video/BV19K4y1L7MT?p=39&spm_id_from=pageDriver)

这里简单说下

首先 我们返回数据的时候，springmvc会先判断我们是否有指定返回类型

即：Get/Post...Mapping("")中是否有`produces = "xxx/xxx"`

如果有的话，就按照我们的来

如果没有的话，就来进行一系列的循环判断 它内置了很多xxxConverter来进行指定的匹配 例如json 有jackson能来匹配json和json+

当然，在这里之前要它会先获取到客户端支持接收的类型，例如chrome浏览器：

`text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`

支持这些 那么spring就会按照顺序的一个一个进行匹配

匹配流程就是 从浏览器的**accept**中一个一个取出来 和带有的所有处理器进行匹配 如果说没有匹配上的就接着下一个

我们想让spring返回一个xml的话只需要做这一步即可：

具体原理也可以看[这篇文章](https://blog.csdn.net/axiang_/article/details/107317763)，和视频中的内容差不多 但是没有视频那么直观

```xml
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
</dependency>
```

当然此时不指定返回值类型为json

```java
@GetMapping("/testAuto")
public User user(){
    return new User(1,"root", "123456",new Pet("dog", 66));
}

```

只指定是一个@responseBody

接着测试

![image-20211219220148275](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219220148275.png)

xml返回成功

![image-20211219220204011](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219220204011.png)

json也返回成功！根据客户端要求的数据不同自动匹配

### 开启请求参数进行内容协商

原理在[这个视频](https://www.bilibili.com/video/BV19K4y1L7MT?p=40&spm_id_from=pageDriver)

我们之前配置了可以让访问返回xml的方法，但是那样太痛苦了，因为浏览器的请求头内，xml的优先级高于json 这样就会导致我们浏览器每次请求到的数据都是xml

![image-20211219221958671](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219221958671.png)

所以说我们可以通过开启参数匹配的方式来决定优先返回哪些内容

配置非常简单，只需要：

```properties
spring.mvc.contentnegotiation.favor-parameter=true
```

在配置文件中加上一个这个

然后在我们请求的时候加上`http://localhost:8080/testAuto?format=json`

format=需要接收的类型字段

即可

![image-20211219222246417](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219222246417.png)

## ✨自定义返回值处理器

视频地址<https://www.bilibili.com/video/BV19K4y1L7MT?p=41&spm_id_from=pageDriver>

1. @Response响应数据出去 调用 RequestResponseBodyMethodProcessor处理
2. Processor处理方法返回值，通过MessageConverter处理
3. 所有的MessageConverter合起来可以支持各种媒体类型的数据操作（读/写）
4. 内容协商找到最终的MessageConverter

假设我们现在有一个需求，同一个接口下：

- 浏览器请求[application/xml] 返回xml
- ajax请求[application/json]返回json
- 自己做的app请求[application/x-my-project]返回我们自定义类型的project类型的数据

如果按照之前的思路

1. 写三个方法 三个方法请求路径不一样，浏览器给1，ajax给2，app给3
2. 但是现在不一样了，我们可以通过内容协商来配置相关的内容
   1. 因为浏览器默认是xml 所以xml优先  jacksonXMLConverter
   2. ajax是json 所以是json优先  jacksonJsonConverter
   3. 我们的app是x-my-project所以是我们自定义的project优先   MyProjectConverter 自定义的MessageConverter
      - 扩展：`application/x-????`表示我们自定义类型的扩展数据

所以我们的实现步骤为：

1. 添加自定义的MessageConverter进系统底层
2. 系统底层每次在内容协商的时候就会统计出所有MessageConverter能操作那些类型
3. 进行客户端内容协商
   1. 客户端说要`x-my-project`类型的数据 巧了 我们正好有一个xxxConverter来适配 所以就能进行相应的操作处理

根据以往的坑位，和官方文档的说明，在WebMvcConfigurer下，我们可以看到一个非常眼熟的东西

![image-20211219224340957](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219224340957.png)

（PS：官方特地说明了 要自定义一些相关的SPringMVC有关的内容 都到这个类里面找）

好了，我们现在希望自己的类型是这样的：属性值1;属性值2; 这种类型的返回值

也就是：

```js
{name:"xxx",age:10}
--->
    xxx;18;
```

这样传输起来就更快了hhh

先上代码 首先编写一个类

```java
package com.SpringBootWeb.converter;

import com.SpringBootWeb.domain.User;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;

import java.io.IOException;
import java.util.List;

public class MyProjectMessageConverter implements HttpMessageConverter<User> {

    /**
     * 这个方法是用来解析请求参数的， 我们现在用不上 所以直接返回false
     * 因为暂时还不需要解析我们这种专属类型的参数
     *
     * @param clazz
     * @param mediaType
     * @return
     */
    @Override
    public boolean canRead(Class<?> clazz, MediaType mediaType) {
        return false;
    }

    /**
     * 这里是声明我们能写哪些内容 返回一个布尔值
     *
     * @param clazz
     * @param mediaType
     * @return
     */
    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        // 因为传入了clazz 所以我们只要判断这个clazz是不是一个person对象即可
        return clazz.isAssignableFrom(User.class);
    }

    /**
     * application/x-my-project
     * 这里就是告诉spring 我们这里能解析哪种数据类型
     * 要返回一个集合 这里直接用MediaType.parseMediaTypes("application/x-my-project") 返回一个集合
     *
     * @return
     */
    @Override
    public List<MediaType> getSupportedMediaTypes() {
        return MediaType.parseMediaTypes("application/x-my-project");
    }

    /**
     * 这个是读取的 不管 直接返回null即可
     *
     * @param clazz
     * @param inputMessage
     * @return
     * @throws IOException
     * @throws HttpMessageNotReadableException
     */
    @Override
    public User read(Class<? extends User> clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        return null;
    }

    /**
     * 这里就是自定义写入的数据格式
     *
     * @param user
     * @param contentType
     * @param outputMessage
     * @throws IOException
     * @throws HttpMessageNotWritableException
     */
    @Override
    public void write(User user, MediaType contentType, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
//        自定义协议数据的写出
        String data = user.getId() + ";" + user.getUsername() + ";" + user.getPassword() + ";";
//        写出
        outputMessage.getBody().write(data.getBytes());
        outputMessage.getBody().close();

    }
}

```

接着，在webMVCConfigurer中添加它

```java
@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
                converters.add(new MyProjectMessageConverter());
            }
        }

    }
}
```

访问即可

![image-20211219231117070](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219231117070.png)

### ✨返回值处理器额外补充-配置内容协商

原理依旧看这个视频<https://www.bilibili.com/video/BV19K4y1L7MT?p=42&spm_id_from=pageDriver> 权重那里面有仔细说明

目的是：

原本我们开启内容协商

`http://localhost:8080/testAuto?format=json` 可以指定访问json的数据

现在我们想要指定访问自定义类型的数据

`http://localhost:8080/testAuto?format=my-project`

直接上代码：

```java
@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
                converters.add(new MyProjectMessageConverter());
            }

            // 重写 configureContentNegotiation
            @Override
            public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
                // 创建一个map
                HashMap<String, MediaType> mediaTypes = new HashMap<>();
                //                指定支持解析哪些参数对应的哪些类信息
                mediaTypes.put("json", MediaType.APPLICATION_JSON);
                mediaTypes.put("xml", MediaType.APPLICATION_XML);
                // 添加自定义参数的解析  规定 mp--->application/x-my-project
                mediaTypes.put("mp", MediaType.parseMediaType("application/x-my-project"));
                // 下面这里和创建上面创建map 的语句 以及 json  和 xml  基本上是固定死了的写法 实际开发中按照这套模板套即可
                ParameterContentNegotiationStrategy strategy = new ParameterContentNegotiationStrategy(mediaTypes);
                configurer.strategies(Collections.singletonList(strategy));

                // 再创建一个基于请求头的策略 不这样做的话 只能适配参数
                HeaderContentNegotiationStrategy headerContentNegotiationStrategy = new HeaderContentNegotiationStrategy();
                configurer.strategies(Collections.singletonList(headerContentNegotiationStrategy));


            }


        };

    }

}

```

接着访问 就能获取到我们自定义类型的数据

![image-20211219233642650](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219233642650.png)

## 视图解析与模板引擎（服务端渲染）

视图解析：SpringBoot默认不支持JSP 需要引入第三方模板引擎技术实现

spring有很多第三方的服务端渲染 但是用的比较多的是`thymeleaf` ，但是实际项目并不会用上它，一般项目都是前后端分离  前端用Vue  react之类的框架做ajax比直接后台ssr渲染方便多了

当然 现在一般都是 前后端分离 但是人不分离（笑）

[官网地址](https://www.thymeleaf.org/)

语法有点像jsp 然后 使用`#{}`来填充内容

### thymeleaf语法一览

语法就这些

![image-20211219235343409](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219235343409.png)

![image-20211219235935155](/images/SpringBoot/02-Spring_Boot核心功能/image-20211219235935155.png)

当然 还有判断之类的

thymeleaf的精髓在于 他不需要经过java编译的 动态静态都可以 jsp就不支持静态

### tyhmeleaf使用

#### 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

这玩意配置好了SpringTemplateEngine

和ThymeleafViewResolver

我们只需要开发页面即可

他有两个默认final的配置项

```java
public static final String DEFAULT_PREFIX = "classpath:/templates/";
public static final String DEFAULT_SUFFIX=".html";
```

也就是我们以后页面要放的位置

### 基本使用

可以直接获取request域中的数据

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <h1 th:text="${message}"> </h1>
        <h2>
            <a th:href="${url}" href="#">百度</a>
        </h2>
    </body>
</html>
```

```java
@Controller
public class ViewTestController {

    @GetMapping("/welcome")
    public String abs(Model model) {
        model.addAttribute("message", "测试内容");
        model.addAttribute("url", "https://bilibli.com");
        return "success";
    }

}

```

访问

![image-20211220120951898](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220120951898.png)

### 设置全局访问前缀

默认是`/`根路径下 可以通过如下方式更该访问路径

```properties
server.servlet.context-path=/world
```

注意 **这是更该整个项目的访问路径** 例如我现在有一个mapping是在根路径下的`/welcome`

```java
@Controller
public class ViewTestController {

    @GetMapping("/welcome")
    public String abs(Model model) {
        model.addAttribute("message", "测试内容");
        model.addAttribute("url", "https://bilibli.com");
        return "success";
    }

}

```

并且正常是直接这样访问

![image-20211220121036039](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220121036039.png)

但是我加上了之后

![image-20211220121047134](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220121047134.png)

只能通过我们指定的前缀进行访问 这就有点像Tomcat那味道了

![image-20211220121058329](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220121058329.png)

并且如果是动态链接的话 也会自动生成前缀

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <h1 th:text="${message}"> </h1>
        <h2>
            <a th:href="${url}" href="#">百度</a>
        </h2>
        <h2 th:text="@{/aaa.txt}"></h2>
    </body>
</html>
```

![image-20211220121547276](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220121547276.png)

### Web实验-实现admin后台管理系统

先创建一个project

![image-20211220122312891](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220122312891.png)

接下来是html页面

链接: <https://pan.baidu.com/s/1x99zecULb3sKyksmqOECMw> 提取码: rk3x

你也可以自己写

我是懒得写这种又丑又长的了

然后你就得到了这些

![image-20211220122508011](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220122508011.png)

根据开发规范 静态资源 统一放到静态资源路径下

其余的放到templates路径下

![image-20211220122624280](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220122624280.png)

接着配置一个简单的登录页

```java
@Controller
public class indexContoller {

    /**
     * 访问 /  和login 都是访问登录页
     *
     * @return
     */
    @GetMapping(value = {"/", "/login"})
    public String loginPage() {
        return "login";
    }

}

```

接着访问 可以看到 页面成功的有了

因为html中的js之类的静态文件夹默认是在当前路径下的  而且我们没有修改静态资源的解析路径 所以目前来说所有的js 、css、font等静态资源都是可以正常访问的

![image-20211220123607758](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220123607758.png)

接着，我们把index.html重命名为main.html

方便以后作区分 这个页面为登录后的主页

然后框架先搭上

```java
/**
     * 处理登陆的请求 登录成功后跳转到index（主页面）页面
     * @param username
     * @param password
     * @return
     */
@PostMapping("/login")
public String login(String username, String password) {
    return "main";
}
```

接着修改一下login.html的内容 这里是通过tyhmeleaf的语法@{}来生成超链接 接下来尝试访问下

```html
<form class="form-signin"
      th:action="@{/login}" method="post">
    <div class="form-signin-heading text-center">
        <h1 class="sign-title">登录</h1>
        <img src="images/login-logo.png" alt=""/>
    </div>
```

当让 别忘了给这两个玩意加name（原本是没有name的）

![image-20211220131816329](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220131816329.png)

成功跳转了

![image-20211220124335304](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220124335304.png)

但是这样又有一个问题 我们刷新页面就相当于表单重复提交

所以说得这样  因为tyhmeleaf 本身是无法直接访问到template下的main页面

![image-20211220124756543](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220124756543.png)

所以我们可以通过加一个mapping来重定向到相应的页面

```java
/**
     * 处理登陆的请求 登录成功后跳转到index（主页面）页面
     *
     * @param username
     * @param password
     * @return
     */
@PostMapping("/login")
public String login(String username, String password) {
    return "redirect:/main.html";
}

/**
     * 登录成功 重定向到main页面
     * @return
     */
@GetMapping("/main.html")
public String mainPage() {
    return "main";
}
```

这样在login之后就不用担心 表单重复提交了 我们在这个页面刷新 相当于刷新的是

`@GetMapping("/main.html")` 就不会导致我们post表单的重复提交

![image-20211220124900736](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220124900736.png)

但是现在又延伸出一个问题 我们这个main页面必须登陆成功才能访问 我们这样设置之后 直接访问main.html即可

这样在任何浏览器 无论是否登陆 都能直接访问这个页面

 所以我们可以在login路由先添加一个验证

```java
/**
     * 处理登陆的请求 登录成功后跳转到index（主页面）页面
     * @param user  用户信息
     *              用户名
     *              密码
     *
     * @return
     */
@PostMapping("/login")
public String login(User user, HttpSession session, Model model) {
    //        判断username和password是否不为空
    if (!StringUtils.isEmpty(user.getUsername()) && !StringUtils.isEmpty(user.getPassword())) {
        //            不为空的话 就存一个session
        session.setAttribute("loginUser", user);

        //            并且跳转到主页面
        return "redirect:/main.html";
    }
    //        否则的话 就跳转到登陆页面 并且返回一个错误信息
    model.addAttribute("errorMessage","用户名或密码错误");
    return "login";
}
```

接着如果输入账户密码的话 就会一直卡在login页面

![image-20211220130858186](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220130858186.png)

接下来就是main页面的处理 我们不可能给后续所有页面都加上获取session 并判断

所以以后可以通过拦截器来解决这个问题

但是现在 我们就简单判断下loginUser

```java
@GetMapping("main.html")
public String mainPage(HttpSession session, Model model) {
    if (session.getAttribute("loginUser") == null) {
        model.addAttribute("errorMessage", "请先登录");
        return "login";
    }
    return "main";

}
```

接下来尝试不登录 直接访问

![image-20211220131415959](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220131415959.png)

会直接跳转回主页

 登录后将会正常跳转

但是我们如果登录出错的话  errormessage将不会被显示出来

所以可以在html中这样做

```html
<div class="login-wrap">
    <label style="color:red" th:text="${errorMessage}"></label>
    <input type="text"  name="username" class="form-control" placeholder="用户名" autofocus>
    <input type="password" name="password" class="form-control" placeholder="密码">

    <button class="btn btn-lg btn-login btn-block" type="submit">
        <i class="fa fa-check"></i>
    </button>
```

接着直接访问下登录页并且不输入账号密码试试

![image-20211220132147975](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220132147975.png)

然后尝试直接访问main.html

![image-20211220132440033](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220132440033.png)

接下来又有一个问题 我想把main页面内右上角的别的名字去掉

```html
<li>
    <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <img src="images/photos/user-avatar.png" alt="" />
        John Doe
        <span class="caret"></span>
    </a>
```

但是这玩意的属性在这个特殊的的位置 所以得去看文档了

根据[官方文档](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#inlining) 我们可以得到这种行内写法

`<p>Hello, [[${session.user.name}]]!</p>`

所以只需要 搜索John Doe 全局替换下

```html
[[${session.loginUser.username}]]
```

即可

![image-20211220143228870](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220143228870.png)

接下来 我们就实现data tables页面的跳转吧

先把这几个移动到table文件夹下

![image-20211220143728543](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220143728543.png)

当然为了让整体文件看起来不那么乱 我就先把其他的页面删掉了 有需要再加进来

![image-20211220144023370](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220144023370.png)

好了 但是接下来我们看到了这几个页面的侧边栏顶部栏的代码都是大同小异的 接下来我们抽取出来得到一个单独的文件

#### 抽取公共资源

这里就省略 过程了 5个文件  替换的话我们用正则表达式来替换

![image-20211220151201425](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220151201425.png)

然后公共资源我们就统一放在common文件夹下 大概总体长这样 公共的一些资源我们动态的加上 修饰符 这里我是全部用正则来操作的 现在基本所有ide 都支持正则替换 小括号内的内容 用$1 $2 之类的来表示

```html
<!doctype html>
<html lang="en"  xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>所有公共信息</title>

    <!--common-->
    <link th:href="@{/css/style.css}" rel="stylesheet">
    <link th:href="@{/css/style-responsive.css}" rel="stylesheet">


    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script th:src="@{/js/html5shiv.js}"></script>
    <script th:src="@{/js/respond.min.js}"></script>
    <![endif]-->
</head>
<body>
<!-- left side start-->
<div class="left-side sticky-left-side">

    <!--logo and iconic logo start-->
    <div class="logo">
        <a href="main.html"><img th:src="@{/images/logo.png}" alt=""></a>
    </div>

    <div class="logo-icon text-center">
        <a href="main.html"><img th:src="@{/images/logo_icon.png}" alt=""></a>
    </div>
    <!--logo and iconic logo end-->

    <div class="left-side-inner">

        <!-- visible to small devices only -->
        <div class="visible-xs hidden-sm hidden-md hidden-lg">
            <div class="media logged-user">
                <img alt="" th:src="@{/images/photos/user-avatar.png}" class="media-object">
                <div class="media-body">
                    <h4><a href="#">[[${session.loginUser.username}]]</a></h4>
                    <span>"Hello There..."</span>
                </div>
            </div>

            <h5 class="left-nav-title">Account Information</h5>
            <ul class="nav nav-pills nav-stacked custom-nav">
                <li><a href="#"><i class="fa fa-user"></i> <span>Profile</span></a></li>
                <li><a href="#"><i class="fa fa-cog"></i> <span>Settings</span></a></li>
                <li><a href="#"><i class="fa fa-sign-out"></i> <span>Sign Out</span></a></li>
            </ul>
        </div>

        <!--sidebar nav start-->
        <ul class="nav nav-pills nav-stacked custom-nav">
            <li class="menu-list nav-active"><a href="main.html"><i class="fa fa-home"></i>
                <span>Dashboard</span></a>
                <ul class="sub-menu-list">
                    <li><a href="index_alt.html"> Dashboard 1</a></li>
                    <li class="active"><a href="main.html"> Dashboard 2</a></li>
                </ul>
            </li>

            <li class="menu-list"><a href=""><i class="fa fa-laptop"></i> <span>Layouts</span></a>
                <ul class="sub-menu-list">
                    <li><a href="blank_page.html"> Blank Page</a></li>
                    <li><a href="boxed_view.html"> Boxed Page</a></li>
                    <li><a href="leftmenu_collapsed_view.html"> Sidebar Collapsed</a></li>
                    <li><a href="horizontal_menu.html"> Horizontal Menu</a></li>

                </ul>
            </li>
            <li class="menu-list"><a href=""><i class="fa fa-book"></i> <span>UI Elements</span></a>
                <ul class="sub-menu-list">
                    <li><a href="general.html"> General</a></li>
                    <li><a href="buttons.html"> Buttons</a></li>
                    <li><a href="tabs-accordions.html"> Tabs & Accordions</a></li>
                    <li><a href="typography.html"> Typography</a></li>
                    <li><a href="slider.html"> Slider</a></li>
                    <li><a href="panels.html"> Panels</a></li>
                    <li><a href="widgets.html"> Widgets</a></li>
                </ul>
            </li>
            <li class="menu-list"><a href=""><i class="fa fa-cogs"></i> <span>Components</span></a>
                <ul class="sub-menu-list">
                    <li><a href="grids.html"> Grids</a></li>
                    <li><a href="gallery.html"> Media Gallery</a></li>
                    <li><a href="calendar.html"> Calendar</a></li>
                    <li><a href="tree_view.html"> Tree View</a></li>
                    <li><a href="nestable.html"> Nestable</a></li>

                </ul>
            </li>

            <li><a href="fontawesome.html"><i class="fa fa-bullhorn"></i> <span>Fontawesome</span></a></li>

            <li class="menu-list"><a href=""><i class="fa fa-envelope"></i> <span>Mail</span></a>
                <ul class="sub-menu-list">
                    <li><a href="mail.html"> Inbox</a></li>
                    <li><a href="mail_compose.html"> Compose Mail</a></li>
                    <li><a href="mail_view.html"> View Mail</a></li>
                </ul>
            </li>

            <li class="menu-list"><a href=""><i class="fa fa-tasks"></i> <span>Forms</span></a>
                <ul class="sub-menu-list">
                    <li><a href="form_layouts.html"> Form Layouts</a></li>
                    <li><a href="form_advanced_components.html"> Advanced Components</a></li>
                    <li><a href="form_wizard.html"> Form Wizards</a></li>
                    <li><a href="form_validation.html"> Form Validation</a></li>
                    <li><a href="editors.html"> Editors</a></li>
                    <li><a href="inline_editors.html"> Inline Editors</a></li>
                    <li><a href="pickers.html"> Pickers</a></li>
                    <li><a href="dropzone.html"> Dropzone</a></li>
                </ul>
            </li>
            <li class="menu-list"><a href=""><i class="fa fa-bar-chart-o"></i> <span>Charts</span></a>
                <ul class="sub-menu-list">
                    <li><a href="flot_chart.html"> Flot Charts</a></li>
                    <li><a href="morris.html"> Morris Charts</a></li>
                    <li><a href="chartjs.html"> Chartjs</a></li>
                    <li><a href="c3chart.html"> C3 Charts</a></li>
                </ul>
            </li>
            <li class="menu-list"><a href="#"><i class="fa fa-th-list"></i> <span>Data Tables</span></a>
                <ul class="sub-menu-list">
                    <li><a th:href="@{/basic_table}"> Basic Table</a></li>
                    <li><a th:href="@{/dynamic_table}"> Advanced Table</a></li>
                    <li><a th:href="@{/responsive_table}"> Responsive Table</a></li>
                    <li><a th:href="@{/editable_table}"> Edit Table</a></li>
                </ul>
            </li>

            <li class="menu-list"><a href="#"><i class="fa fa-map-marker"></i> <span>Maps</span></a>
                <ul class="sub-menu-list">
                    <li><a href="google_map.html"> Google Map</a></li>
                    <li><a href="vector_map.html"> Vector Map</a></li>
                </ul>
            </li>
            <li class="menu-list"><a href=""><i class="fa fa-file-text"></i> <span>Extra Pages</span></a>
                <ul class="sub-menu-list">
                    <li><a href="profile.html"> Profile</a></li>
                    <li><a href="invoice.html"> Invoice</a></li>
                    <li><a href="pricing_table.html"> Pricing Table</a></li>
                    <li><a href="timeline.html"> Timeline</a></li>
                    <li><a href="blog_list.html"> Blog List</a></li>
                    <li><a href="blog_details.html"> Blog Details</a></li>
                    <li><a href="directory.html"> Directory </a></li>
                    <li><a href="chat.html"> Chat </a></li>
                    <li><a href="404.html"> 404 Error</a></li>
                    <li><a href="500.html"> 500 Error</a></li>
                    <li><a href="registration.html"> Registration Page</a></li>
                    <li><a href="lock_screen.html"> Lockscreen </a></li>
                </ul>
            </li>
            <li><a href="login.html"><i class="fa fa-sign-in"></i> <span>Login Page</span></a></li>

        </ul>
        <!--sidebar nav end-->

    </div>
</div>
<!-- left side end-->

<!-- header section start-->
<div class="header-section">

    <!--toggle button start-->
    <a class="toggle-btn"><i class="fa fa-bars"></i></a>
    <!--toggle button end-->

    <!--search start-->
    <form class="searchform"
          action="http://view.jqueryfuns.com/2014/4/10/7_df25ceea231ba5f44f0fc060c943cdae/index.html"
          method="post">
        <input type="text" class="form-control" name="keyword" placeholder="Search here..."/>
    </form>
    <!--search end-->

    <!--notification menu start -->
    <div class="menu-right">
        <ul class="notification-menu">
            <li>
                <a href="#" class="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
                    <i class="fa fa-tasks"></i>
                    <span class="badge">8</span>
                </a>
                <div class="dropdown-menu dropdown-menu-head pull-right">
                    <h5 class="title">You have 8 pending task</h5>
                    <ul class="dropdown-list user-list">
                        <li class="new">
                            <a href="#">
                                <div class="task-info">
                                    <div>Database update</div>
                                </div>
                                <div class="progress progress-striped">
                                    <div style="width: 40%" aria-valuemax="100" aria-valuemin="0"
                                         aria-valuenow="40" role="progressbar"
                                         class="progress-bar progress-bar-warning">
                                        <span class="">40%</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="new">
                            <a href="#">
                                <div class="task-info">
                                    <div>Dashboard done</div>
                                </div>
                                <div class="progress progress-striped">
                                    <div style="width: 90%" aria-valuemax="100" aria-valuemin="0"
                                         aria-valuenow="90" role="progressbar"
                                         class="progress-bar progress-bar-success">
                                        <span class="">90%</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="task-info">
                                    <div>Web Development</div>
                                </div>
                                <div class="progress progress-striped">
                                    <div style="width: 66%" aria-valuemax="100" aria-valuemin="0"
                                         aria-valuenow="66" role="progressbar"
                                         class="progress-bar progress-bar-info">
                                        <span class="">66% </span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="task-info">
                                    <div>Mobile App</div>
                                </div>
                                <div class="progress progress-striped">
                                    <div style="width: 33%" aria-valuemax="100" aria-valuemin="0"
                                         aria-valuenow="33" role="progressbar"
                                         class="progress-bar progress-bar-danger">
                                        <span class="">33% </span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="task-info">
                                    <div>Issues fixed</div>
                                </div>
                                <div class="progress progress-striped">
                                    <div style="width: 80%" aria-valuemax="100" aria-valuemin="0"
                                         aria-valuenow="80" role="progressbar" class="progress-bar">
                                        <span class="">80% </span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="new"><a href="">See All Pending Task</a></li>
                    </ul>
                </div>
            </li>
            <li>
                <a href="#" class="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
                    <i class="fa fa-envelope-o"></i>
                    <span class="badge">5</span>
                </a>
                <div class="dropdown-menu dropdown-menu-head pull-right">
                    <h5 class="title">You have 5 Mails </h5>
                    <ul class="dropdown-list normal-list">
                        <li class="new">
                            <a href="">
                                <span class="thumb"><img th:src="@{/images/photos/user1.png}" alt=""/></span>
                                <span class="desc">
                                          <span class="name">[[${session.loginUser.username}]] <span
                                                  class="badge badge-success">new</span></span>
                                          <span class="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="thumb"><img th:src="@{/images/photos/user2.png}" alt=""/></span>
                                <span class="desc">
                                          <span class="name">Jonathan Smith</span>
                                          <span class="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="thumb"><img th:src="@{/images/photos/user3.png}" alt=""/></span>
                                <span class="desc">
                                          <span class="name">Jane Doe</span>
                                          <span class="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="thumb"><img th:src="@{/images/photos/user4.png}" alt=""/></span>
                                <span class="desc">
                                          <span class="name">Mark Henry</span>
                                          <span class="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="thumb"><img th:src="@{/images/photos/user5.png}" alt=""/></span>
                                <span class="desc">
                                          <span class="name">Jim Doe</span>
                                          <span class="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                            </a>
                        </li>
                        <li class="new"><a href="">Read All Mails</a></li>
                    </ul>
                </div>
            </li>
            <li>
                <a href="#" class="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
                    <i class="fa fa-bell-o"></i>
                    <span class="badge">4</span>
                </a>
                <div class="dropdown-menu dropdown-menu-head pull-right">
                    <h5 class="title">Notifications</h5>
                    <ul class="dropdown-list normal-list">
                        <li class="new">
                            <a href="">
                                <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                <span class="name">Server #1 overloaded.  </span>
                                <em class="small">34 mins</em>
                            </a>
                        </li>
                        <li class="new">
                            <a href="">
                                <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                <span class="name">Server #3 overloaded.  </span>
                                <em class="small">1 hrs</em>
                            </a>
                        </li>
                        <li class="new">
                            <a href="">
                                <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                <span class="name">Server #5 overloaded.  </span>
                                <em class="small">4 hrs</em>
                            </a>
                        </li>
                        <li class="new">
                            <a href="">
                                <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                <span class="name">Server #31 overloaded.  </span>
                                <em class="small">4 hrs</em>
                            </a>
                        </li>
                        <li class="new"><a href="">See All Notifications</a></li>
                    </ul>
                </div>
            </li>
            <li>
                <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <img th:src="@{/images/photos/user-avatar.png}" alt=""/>
                    [[${session.loginUser.username}]]
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
                    <li><a href="#"><i class="fa fa-user"></i> Profile</a></li>
                    <li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
                    <li><a href="#"><i class="fa fa-sign-out"></i> Log Out</a></li>
                </ul>
            </li>

        </ul>
    </div>
    <!--notification menu end -->

</div>
<!-- header section end-->


<!-- Placed js at the end of the document so the pages load faster -->
<script th:src="@{/js/jquery-1.10.2.min.js}"></script>
<script th:src="@{/js/jquery-ui-1.9.2.custom.min.js}"></script>
<script th:src="@{/js/jquery-migrate-1.2.1.min.js}"></script>
<script th:src="@{/js/bootstrap.min.js}"></script>
<script th:src="@{/js/modernizr.min.js}"></script>
<script th:src="@{/js/jquery.nicescroll.js}"></script>

<!--easy pie chart-->
<script th:src="@{/js/easypiechart/jquery.easypiechart.js}"></script>
<script th:src="@{/js/easypiechart/easypiechart-init.js}"></script>

<!--Sparkline Chart-->
<script th:src="@{/js/sparkline/jquery.sparkline.js}"></script>
<script th:src="@{/js/sparkline/sparkline-init.js}"></script>

<!--icheck -->
<script th:src="@{/js/iCheck/jquery.icheck.js}"></script>
<script th:src="@{/js/icheck-init.js}"></script>

<!-- jQuery Flot Chart-->
<script th:src="@{/js/flot-chart/jquery.flot.js}"></script>
<script th:src="@{/js/flot-chart/jquery.flot.tooltip.js}"></script>
<script th:src="@{/js/flot-chart/jquery.flot.resize.js}"></script>
<script th:src="@{/js/flot-chart/jquery.flot.pie.resize.js}"></script>
<script th:src="@{/js/flot-chart/jquery.flot.selection.js}"></script>
<script th:src="@{/js/flot-chart/jquery.flot.stack.js}"></script>
<script th:src="@{/js/flot-chart/jquery.flot.time.js}"></script>
<script th:src="@{/js/main-chart.js}"></script>

<!--common scripts for all pages-->
<script th:src="@{/js/scripts.js}"></script>
</body>
</html>
```

#### 使用公共资源-模板引擎

根据官网的描述<https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#template-layout>

![image-20211220151622608](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220151622608.png)

可以得到 设置模板引擎为

```html
<!DOCTYPE html>

<html xmlns:th="http://www.thymeleaf.org">

  <body>
  
    <div th:fragment="copy">
      &copy; 2011 The Good Thymes Virtual Grocery
    </div>

  </body>
  
</html>
```

设置模板引擎目前只有一种方式 之前可以通过id来 但是那样会浪费资源 貌似官方不建议那样用了

使用模板引擎为

```html
<body>

  ...

  <div th:insert="~{footer :: copy}"></div>
  
</body>
```

上面的也可以缩写成

```html
<body>

    ...

    <div th:insert="footer :: copy"></div>

</body>
```

当然 插入不止有insert 总共有三种方式

- insert：保留所有内容
- include：保留使用者的头标签
- replace：保留模板方的头标签

例如：

```html
<footer th:fragment="copy">
    &copy; 2011 The Good Thymes Virtual Grocery
</footer>
```

使用三种不同的方式 获得三种不同的结果

```html
<body>

  ...

  <div th:insert="footer :: copy"></div>

  <div th:replace="footer :: copy"></div>

  <div th:include="footer :: copy"></div>
  
</body>
```

结果

```html
<body>

    ...
 
    Insert 会保留双方的头标签
    <div> 
        <footer>
            &copy; 2011 The Good Thymes Virtual Grocery
        </footer>
    </div>
 
    replace 会保留模板方的头标签
    <footer>
        &copy; 2011 The Good Thymes Virtual Grocery
    </footer>
 
    include 会保留使用方的头标签
    <div>
        &copy; 2011 The Good Thymes Virtual Grocery
    </div>

</body>
```

接下来我们如法炮制 在公共页面中加上相应的标签

![image-20211220155052991](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220155052991.png)

其他的就省略了先 太多代码了  md 不前后端分离这代码就没法看了

接着使用 这里就放张图把 **头部引入用include  其他的一律用replace即可**

![image-20211220155134074](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220155134074.png)

剩下的内容和文件同上操作即可

### 关于thymeleaf的遍历

语法参照<https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#iteration>

```html
<table>
    <tr>
        <th>NAME</th>
        <th>PRICE</th>
        <th>IN STOCK</th>
    </tr>
    <tr th:each="prod,iterStat : ${prods}" th:class="${iterStat.odd}? 'odd'">
        <td th:text="${prod.name}">Onions</td>
        <td th:text="${prod.price}">2.41</td>
        <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
    </tr>
</table>
```

大概就这这种方式来获取指定的值 `实际对象,state : ${要被遍历的session域中的对象}`

state可以获取一些相关的信息

![image-20211220162153988](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220162153988.png)

实际使用：

```java
@GetMapping("/dynamic_table")
public String dynamicTable(Model model) {
    List<User> list = Arrays.asList(
        new User("张三", "1234578"),
        new User("李四", "1234578"),
        new User("王五", "1234578"));
    model.addAttribute("users", list);
    return "table/dynamic_table";
}
```

Arrays.asList可以将动态参数 转换成一个ArrayList

使用

```html
<tr class="gradeX" th:each="user,state : ${users}">
    <td th:text="${state.index+1}">Trident</td>
    <td  th:text="${user.username}">UserName</td >
    <td th:text="${user.password}">Password</td>
</tr>
```

效果

![image-20211220162306373](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220162306373.png)

## ✨拦截器

之前在SpringMVC中已经用过了，这里就简单做个拦截

```java

@Slf4j  // 加了这个能在我们的这个类中使用log 打印日志 以后具体的了解下这玩意
public class LoginInterceptor implements HandlerInterceptor {

    /**
     * 目标方法执行之前
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //        检查登陆逻辑
        HttpSession session = request.getSession();
        log.info("拦截请求的路径是{}",request.getRequestURI());
        Object user = session.getAttribute("loginUser");
        if (user != null) {
            //            有登陆的用户 放行
           // 注意 我这里只是做了一个 session会话域的验证  实际上应该是以cookie之类的来验证
            // session域中的东西 会因为你代码中的请求重定向而丢失
            return true;
        }
        //        拦截住 重定向到登录页
        response.sendRedirect("/");
        return false;
    }


}

```

接下来配置下拦截器-依旧是使用我们的老伙伴WebMvcConfigurer

```java
package com.MyProject.webadmin.config;

import com.MyProject.webadmin.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 24-tyhmeleaf-webadmin
 * @BelongsPackage com.MyProject.webadmin.config
 * @date 2021/12/20 17:40
 * @description 项目描述
 */
@Configuration
public class Webconfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor()).
            //指定拦截的路径
            addPathPatterns("/**")
            // 额外放行的路径
            .excludePathPatterns("/", 
                            "/login",
                                 // 下面这里就都是静态资源了 如果你的项目中额外配置了spring.mvc.static-path-pattern的话 可以直接配置那里指定的前缀下的所有路径
                                 "/css/**","/js/**","/fonts/**","/images/**");

    }
}

```

![image-20211220203337063](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220203337063.png)

拦截器的原理可以看这个[视频](https://www.bilibili.com/video/BV19K4y1L7MT?p=49&spm_id_from=pageDriver)

![image-20211220205945527](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220205945527.png)

## ✨过滤器

看[这篇文章](https://blog.csdn.net/jacksonary/article/details/84572701)

实际过程中要使用的话 建议是直接写一个类 继承自Spring提供的`OncePerRequestFilter` 这样可以防止多次拦截/过滤

```java
@Component
public class XXXX extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 你的过滤规则

        
        // 通过规则了调用这个方法
        filterChain.doFilter(request, response);

    }
}

```

其他的地方还是和普通的一样hh

## 接收文件@RequestPart

前端代码 有单文件和多文件

```html
<form role="form" th:action="@{/upload}" method="post" enctype="multipart/form-data">
    <div class="form-group">
        <label for="exampleInputEmail1">邮箱</label>
        <input type="email" name="email" class="form-control" id="exampleInputEmail1"
               placeholder="Enter email">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">名字</label>
        <input type="text" name="name" class="form-control" id="exampleInputPassword1"
               placeholder="Enter Name">
    </div>
    <div class="form-group">
        <label for="exampleInputFile">头像</label>
        <input type="file" name="avatar_file" id="exampleInputFile">
        <p class="help-block">Example block-level help text here.</p>
    </div>
    <div class="form-group">
        <label for="exampleInputFile">生活照</label>
        <input type="file" name="zhaopian_file" id="file" multiple>
        <p class="help-block">Example block-level help text here.</p>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox"> Check me out
        </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

如果说我们上传的的文件特别多的话

```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=500MB
```

第一个是配置单个文件上传大小，第二个是配置总文件大小

接着编写代码 来接收客户端发送过来的数据

```java
@Slf4j
@Controller
public class FormTestController {
    @GetMapping("/form_layouts")
    public String formLayouts() {
        return "form/form_layouts";
    }


    @PostMapping("/upload")
    public String upload(
 // 在接受到form-data的参数时， 非file参数是以param形式传入的
        @RequestParam("name") String name,
        @RequestParam("email") String email,
        // 文件可以用MultipartFile 来接收 MultipartFile里自带了很多文件相关的功能
        @RequestPart("avatar_file") MultipartFile avatarFile,
        @RequestPart("photos") MultipartFile[] photos
    ) {
        log.info("上传的信息:email={},name={},头像文件大小:{},photos数量{}", email, name, avatarFile.getSize(), photos.length);
        return "/main";
    }


}
```

访问结果：

![image-20211220220030528](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220220030528.png)

```md
上传的信息:email=Amayakite@qq.com,name=Aykte,头像文件大小:2803579,photos数量3
```

接着 来完成对文件的保存 注意 如果是保存在本地 务必先创建好对应的文件夹！

```java
@PostMapping("/upload")
public String upload(
    @RequestParam("name") String name,
    @RequestParam("email") String email,
    @RequestPart("avatar_file") MultipartFile avatarFile,
    @RequestPart("photos") MultipartFile[] photos
) throws IOException {
    log.info("上传的信息:email={},name={},头像文件大小:{},photos数量{}", email, name, avatarFile.getSize(), photos.length);

    // 一般上传之前都会重命名之类 用UUIDV4还是啥 生成时间戳的文件名

    //判断文件是否不为空
    if (!avatarFile.isEmpty()) {
        //            这里可以存储到 文件服务器 或者本地等
        //            创建UUID 文件名用 uuid + 文件后缀
        String uuid = UUID.randomUUID().toString().replace("-", "");
        avatarFile.transferTo(new File("D:\\upload\\avatar\\" +
                                       uuid + avatarFile.getOriginalFilename().trim().substring(avatarFile.getOriginalFilename().lastIndexOf("."))));

    }
    //        判断文件数量
    if (photos.length > 0 && photos.length <= 3) {
        for (MultipartFile photo : photos) {
            String uuid = UUID.randomUUID().toString().replace("-", "");

            photo.transferTo(new File("D:\\upload\\photos\\" +
                                      uuid + photo.getOriginalFilename().trim().substring(photo.getOriginalFilename().lastIndexOf("."))));

        }
    }


    return "/main";
}
```

最终结果：

![image-20211220221612943](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220221612943.png)

当然 这里文件名还可以用 别的 例如  username+datetime+uuid的加密值

### 文件上传原理

建议看这个视频<https://www.bilibili.com/video/BV19K4y1L7MT?p=51&spm_id_from=pageDriver>

## SpringBoot默认错误处理

1. 默认情况下，SpringBoot提供`/error`处理所有错误的映射
2. 对于机器客户端，它生成json数据，其中包含错误，http状态码，http状态和异常消息的详细信息，对于客户端浏览器，响应一个`WHiteLable`错误视图，以HTML格式呈现相同的数据
3. 若要对齐进行自定义，添加`View`解析为`error`
4. 要完全替换默认行为，可以实现`ErrorController` 并注册该类型的`@Bean`定义，或添加`ErrorAttributes`类型组件以使用现有机制但替换其内容
5. error下的4xx，5xx会被自动解析

我们可以发现 当试图访问不存在的页面时，会有404 出现

![image-20211220225601033](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220225601033.png)

并且 如果是 用Postman或者ajax之类的访问 会发现它返回json值 说明底层有自的来协商返回值

![image-20211220225701089](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220225701089.png)

json格式为：

```json
{
    "timestamp": "2021-12-20T14:55:09.185+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "No message available",
    "path": "/dddddddddd"
}
```

### ✨自定义错误处理的流程-覆盖error页面

这种方式只能覆盖掉网页端的错误信息展示方式 无法覆盖掉json

- 首先在templates文件夹（static也可）放一个error文件夹 里面存放相应的error页面，然后把相应的页面丢进去 文件命名必须是4xx 或者 5xx 不能是 404 400等  
  ![image-20211220230749313](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220230749313.png)

- 因为我们这个页面需要过一遍模板引擎thymeleaf，所以要在html文件头中加上模板引擎声明空间

  ```html
  <html lang="en"  xmlns:th="http://www.thymeleaf.org">
  ```

然后修改好我们的html页面 适配下thymeleaf引擎之类的

![image-20211220231812178](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220231812178.png)

接着重启服务器 访问 不存在的页面

![image-20211220231826761](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220231826761.png)

也可以通过这种方式来讲消息展示给客户端

![image-20211221123532970](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221123532970.png)

消息的类型根据异常的不同来决定 404 和 400（参数不对） 和 405 和 500 和 503 的错误信息都不太一样 具体的可以自己试一下 然后用postman来请求  就知道哪些错误 分别会出现哪些参数了

比如 404 就只有这些

```json
{
    "timestamp": "2021-12-20T14:55:09.185+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "No message available",
    "path": "/dddddddddd"
}
```

### 异常自动处理原理

首先我们打开ErrorMvcAutoConfiguration这个文件（一眼就看着像是处理异常的）

 一打开就看见了一个Bean

```java
@Bean
@ConditionalOnMissingBean(value = ErrorAttributes.class, search = SearchStrategy.CURRENT) // 当容器中不存在ErrorAttributes的对象的时候才会创建
public DefaultErrorAttributes errorAttributes() {
    return new DefaultErrorAttributes();
}
```

还放了一个

```java
@Bean
@ConditionalOnMissingBean(value = ErrorController.class, search = SearchStrategy.CURRENT) // 当容器中不存在ErrorController才注册
public BasicErrorController basicErrorController(
    ErrorAttributes errorAttributes,
    ObjectProvider<ErrorViewResolver> errorViewResolvers) 
{
    return new BasicErrorController(
        errorAttributes, 
        this.serverProperties.getError(),
        errorViewResolvers.orderedStream().collect(Collectors.toList()));
}
```

接着我们可以看到这个ErrorController这个类里面是这样写的

```java
@Controller
@RequestMapping("${server.error.path:${error.path:/error}}")
public class BasicErrorController extends AbstractErrorController {...}
```

这里是一个标准的....emm三元表达式把 反正默认是处理最后面那个`/error`路径下的请求

我们可以通过自定义的方式

```properties
server.error.path=/指定你的error路径
```

![image-20211220233514835](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220233514835.png)

而且可以看到它这里有两个mapping 第一个是响应html页面的 第二个是响应json数据的

并且我们还可以通过代码知道

```java
@RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
    HttpStatus status = getStatus(request);
    Map<String, Object> model = Collections
        .unmodifiableMap(getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.TEXT_HTML)));
    response.setStatus(status.value());
    ModelAndView modelAndView = resolveErrorView(request, response, status, model);
    return (modelAndView != null) ? modelAndView : new ModelAndView("error", model);
}
```

这玩意返回的是一个ModelAndView只要是这玩意 说明容器中一定有一个对应的ModelAndView的Bean，名为error

接着我们回到ErrorMVCConfiguration

可以看到有一个类的在初始化的时候创建了一个VIew对象，并且创建了一个Bean

![image-20211220235058027](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220235058027.png)

接着我们跳转到这个类 就可以发现

它代码中有着一个非常熟悉的玩意

![image-20211220235136241](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220235136241.png)

接着我们看下它的兄弟类

![image-20211220235502550](/images/SpringBoot/02-Spring_Boot核心功能/image-20211220235502550.png)

```java
static {
    Map<Series, String> views = new EnumMap<>(Series.class);
    views.put(Series.CLIENT_ERROR, "4xx");
    views.put(Series.SERVER_ERROR, "5xx");
    SERIES_VIEWS = Collections.unmodifiableMap(views);
}
```

...在后面的就有点饶了

去看这个视频吧..

<https://www.bilibili.com/video/BV19K4y1L7MT?p=53&spm_id_from=pageDriver>

53P 和 54P一起看

### ✨自定义异常处理-@ControllerAdvice处理全局异常

![image-20211221125655710](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221125655710.png)

使用方式

先创建一个exception文件夹 里面创建一个GlobalExceptionHandler.java

![image-20211221125743184](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221125743184.png)

然后这里面这样写

```java
/**
 * - @ControllerAdvice 处理整个 web Controller的异常
 */
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * @return 返回一个 Model And View(系统自动封装 也可以自己手动的返回一个Model And View 传值)
     * @ExceptionHandler 表示当前是一个异常处理器
     * 它可以接收一个数组要传入 class 参数，表示只处理这些异常
      这里只处理数学运算异常和空指针异常
     */
    @ExceptionHandler({ArithmeticException.class, NullPointerException.class})
    public String handleArityException(Exception e) {

        log.error("获取到的异常是：{}" + e.getMessage());
        //     直接返回的话是返回一个视图地址    返回的东西最终都会转换成ModelAndView 我们也可以指定一个modelAndView
        return "login";
    }


}
```

只要那样做就可以了

接下来编写一个controller测试一下

```java
@GetMapping("/testerror")
@ResponseBody
public String testError() {
    int i = 1 / 0;
    return "error";
}
```

访问

![image-20211221125951088](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221125951088.png)

当然 这种处理返回的始终是一个Model And View ..

### ✨自定义异常处理-@ResponseStatus 处理自定义异常

![image-20211221132338978](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221132338978.png)

我们先自定义一个异常

```java
// ResponseStatus的value 是要接收一个http异常状态码 reason 
// 表示 发送给客户端的异常语句 一般来说 不指定的话 就用我们new异常时候指定的语句
@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "用户数量超过限制")
public class UserTooManyException extends RuntimeException {
    public UserTooManyException() {
    }

    public UserTooManyException(String message) {
        super(message);
    }
}
```

接着编写一个触发这个自定义异常的mapping

```java
@GetMapping("/test_error2")
@ResponseBody
public List<User> testError2() {
    ArrayList<User> users = new ArrayList<>();
    users.add(new User());
    users.add(new User());
    users.add(new User());
    users.add(new User());
    users.add(new User());
    if (users.size() >= 3) {
        throw new UserTooManyException("用户数量过多");
    }
    return users;
}
```

结果：

![image-20211221131446781](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221131446781.png)

用postman访问的话

```json
{
    "timestamp": "2021-12-21T05:08:12.937+00:00",
    "status": 403,
    "error": "Forbidden",
    "trace": "com.MyProject.webadmin.exception.UserTooManyException: 用户数量过多\r\n\tat com.MyProject.webadmin.controller.IndexController.testError2(IndexController.java:98)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat ... 这里省略一大堆信息",
    "message": "用户数量超过限制",
    "path": "/test_error2"
}
```

如果说我们没有指定reason的话

```java

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class UserTooManyException extends RuntimeException {
    public UserTooManyException() {
    }

    public UserTooManyException(String message) {
        super(message);
    }
}
```

并且访问的时候指定了异常message

```java
@GetMapping("/test_error2")
@ResponseBody
public List<User> testError2() {
ArrayList<User> users = new ArrayList<>();
users.add(new User());
users.add(new User());
users.add(new User());
users.add(new User());
users.add(new User());
if (users.size() >= 3) {
throw new UserTooManyException("用户数量过多");
}
return users;
}
```

![image-20211221131951107](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221131951107.png)

### ✨✨自定义全局异常处理器

原理看视频<https://www.bilibili.com/video/BV19K4y1L7MT?p=55>

这里我就简单说下 系统底层自带两个异常解析处理器 默认情况下可以通过他们来处理绝大部分异常的行为

**我们自定义的异常处理 可以处理除了 404 之外貌似任意的异常 包括参数之类的**

我们如果要自定义异常处理器的话 只需要这样

```java
@Order(value = Ordered.HIGHEST_PRECEDENCE)
// 这里是设置 这个异常处理的优先级 数值越小 ，优先级越高
// 可以穿入 整数 也可以 像这样 这样是最小的整数 优先级最高
@Component // 注册组件
public class CustomerHandlerExceptionResolver implements HandlerExceptionResolver {  // 实现HandlerExceptionResolver接口
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

        // 这里可以对上面几个参数做判断 看下是那种类型的异常
        // 这里就直接省略

        try {
            // 直接send异常
            response.sendError(511, "我希望的错误");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // 如果返回的是null 则代表我们这个处理器处理不了这个异常
        // 否则将会处理这个异常 并按照我们期望的值进行send
        return new ModelAndView();
    }
}

```

在这之后访问有异常的页面，例如原本是503的异常

![image-20211221142151392](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221142151392.png)

访问一个需要参数的mapping

````java
@PostMapping("/upload")
public String upload(
    @RequestParam("name") String name,
    @RequestParam("email") String email,
    @RequestPart("avatar_file") MultipartFile avatarFile,
    @RequestPart("photos") MultipartFile[] photos
) throws IOException {
    // do nothing
    return "/main";
}
````

并且不附带任何参数 返回的也是我们希望的异常

![image-20211221142631787](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221142631787.png)

### 使用原生Servlet组件

建议直接看视频<https://www.bilibili.com/video/BV19K4y1L7MT?p=56&spm_id_from=pageDriver>

总结就是

我们可以按照正常的流程注册@webServlet @webfilter 还有@weblistener监听器等

然后在main方法中额外加一个注解`@ServletComponentScan(扫包路径)`

来使用它们

注意 因为是原生的东西 所以Servlet不走springmvc的拦截器 过滤器 只走自己的（Spring的拦截器对它无效 但是filter对spring的访问有影响）

当然还有更多  具体看视频 这玩意实际工作中基本上应该用不着

应用场景只有：老的WebServlet项目要一步步重构到spring项目时的转换过程

### SpringBoot定制化开发

看这个视频<https://www.bilibili.com/video/BV19K4y1L7MT?p=59>

![image-20211221150340498](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221150340498.png)

![image-20211221150436564](/images/SpringBoot/02-Spring_Boot核心功能/image-20211221150436564.png)
