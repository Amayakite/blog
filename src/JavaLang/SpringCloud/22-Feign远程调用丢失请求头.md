---
title: 22-Feign远程调用丢失请求头
date: 2022-2-5 22:21:09
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud OpenFeign
- SpringCloud
---

## 概述

![image-20220205222122234](/images/Java/SpringCloud/22-Feign远程调用丢失请求头/image-20220205222122234.png)

## 解决

```java
@Configuration
public class FeignConfig {

    // 这个名称不知道是否是必须要的 貌似是来着...
    @Bean("requestInterceptor")
    public RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate requestTemplate) {
                /*
                 * 这里实际上底层也是使用ThreadLocal提前获取好了请求的属性，我们强转成ServletRequestAttributes即可
                 * */
                ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

                HttpServletRequest request = requestAttributes.getRequest();
                Enumeration<String> headerNames = request.getHeaderNames();
//                这里是直接将全部值都拿出来了，如果有需要可以按照需求进行处理
//                例如：只拿token值，可以这样写
//                requestTemplate.header("token", request.getHeader("token"));

                HashMap<String, Collection<String>> stringArrayListHashMap = new HashMap<>();
                while (headerNames.hasMoreElements()) {
                    String name = headerNames.nextElement();
                    String value = request.getHeader(name);
                    if (stringArrayListHashMap.containsKey(name)) {
                        stringArrayListHashMap.get(name).add(value);
                    } else {
                        ArrayList<String> o = new ArrayList<>();
                        o.add(value);
                        stringArrayListHashMap.put(name, o);
                    }
                }
                requestTemplate.headers(stringArrayListHashMap);
            }
        };

    }
}

```

## 异步调用丢失（开新线程调用）

![image-20220205225154600](/images/Java/SpringCloud/22-Feign远程调用丢失请求头/image-20220205225154600.png)

实际工作中，一般都是异步调用

Thread对象只对当前线程管用，在其他线程拿不到其中的内容

解决：ThreadLocal 有个子类InheritableThreadLocal  可以继承父线程的信息

spring security使用的令牌在请求头区分登录信息，和springsession一样，使用远程调用和多线程也要考虑丢失请求头的问题。拦截器+请求头信息共享

## 解决方案

```java
@Autowired
ThreadPoolExecutor threadPoolExecutor;

@GetMapping("/test")
public R test() {
    //        先获取当前线程的
    RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

    CompletableFuture<Void> voidCompletableFuture1 = CompletableFuture.runAsync(() -> {
        //            每一个请求都共享下之前的请求数据
        RequestContextHolder.setRequestAttributes(requestAttributes);
        //            做你向做的事情
    }, threadPoolExecutor);

    CompletableFuture<Void> voidCompletableFuture2 = CompletableFuture.runAsync(() -> {
        //            每一个请求都共享下之前的请求数据
        RequestContextHolder.setRequestAttributes(requestAttributes);
        //            做你向做的事情
    }, threadPoolExecutor);

    CompletableFuture.allOf(voidCompletableFuture1, voidCompletableFuture2).join();

    return R.ok();
}
```

然后fegin的配置和之前一样

```java
@Configuration
public class FeignConfig {

    // 这个名称不知道是否是必须要的 貌似是来着...
    @Bean("requestInterceptor")
    public RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate requestTemplate) {
                /*
                 * 这里实际上底层也是使用ThreadLocal提前获取好了请求的属性，我们强转成ServletRequestAttributes即可
                 * */
                ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

                HttpServletRequest request = requestAttributes.getRequest();
                Enumeration<String> headerNames = request.getHeaderNames();
//                这里是直接将全部值都拿出来了，如果有需要可以按照需求进行处理
//                例如：只拿token值，可以这样写
//                requestTemplate.header("token", request.getHeader("token"));

                HashMap<String, Collection<String>> stringArrayListHashMap = new HashMap<>();
                while (headerNames.hasMoreElements()) {
                    String name = headerNames.nextElement();
                    String value = request.getHeader(name);
                    if (stringArrayListHashMap.containsKey(name)) {
                        stringArrayListHashMap.get(name).add(value);
                    } else {
                        ArrayList<String> o = new ArrayList<>();
                        o.add(value);
                        stringArrayListHashMap.put(name, o);
                    }
                }
                requestTemplate.headers(stringArrayListHashMap);
            }
        };

    }
}

```

