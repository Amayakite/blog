import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/JavaLang/": [
    {
      text: "1-基础部分",
      icon: "java",
      prefix: "JavaSE/",
      collapsible: true,
      children: [
        "01-Java的特点.md",
        "02-开始使用Java.md",
        "03-变量.md",
        "04-键盘输入语句.md",
        "05-流程控制.md",
        "06-数组.md",
        "07-类与对象.md",
        "08-包_封装与继承.md",
        "09-面对对象编程.md",
        "10-枚举和注解.md",
        "11-Exception.md",
        "12-常用类.md",
        "13-集合.md",
        "14-泛型.md",
        "15-Java绘图坐标体系.md",
        "16-初识线程.md",
        "17-扩展Lambda表达式.md",
        "18-IO流.md",
        "19-网络编程.md",
        "20-反射.md",
        "21-MySql.md",
        "22-JDBC和数据库连接池.md",
        "23-正则表达式.md",
      ]
    }, {
      text: "2-JavaWeb",
      icon: "web",
      prefix: "JavaEE/",
      collapsible: true,
      children: [
        '01-初识JavaWeb.md',
        '02-Maven.md',
        '02-1-通过空白的Maven模板搭建一个Web项目.md',
        '03-Servlet.md',
        '3-0规范的学习Servlet.md',
        '03-1Response和Requests.md',
        '04-在开始后面东西前要做的事情.md',
        '05-JSP.md',
      ]
    }, {
      text: "3-SpringFrameWork",
      icon: "spring",
      prefix: "SpringFrameWork/",
      collapsible: true,
      children: [
        "01-Spring.md",
        "02-Spring配置数据源.md",
        "03-Spring注解开发.md",
        "04-Spring-Web.md",
        "04-1-扩展-注解.md",
        "05-SpringMVC.md",
        "06-JdbcTemplate.md",
        "07-SpringMVC拦截器.md",
        "08-AOP.md",
        "09-事务控制.md",
        "10-Mybatis.md",
        "11-SSM框架的整合.md",
        "12-MyBatis-Plus.md",
      ]
    }, {
      text: "4-SpringBoot",
      icon: "spring-boot",
      collapsible: true,
      prefix: "SpringBoot/",
      children: [
        "01-Spring_Boot基础.md",
        "02-Spring_Boot核心功能.md",
        "03-Spring_Boot整合数据访问.md",
        "04-Redis.md",
        "05-SpringSecurity.md",
        "06-RabbitMQ.md",
        "07-Nginx.md",
        "08-Elasticsearch.md",
        "10-Jackson.md"
      ]
    }, {
      text: "5-SpringCloud",
      icon: "spring-cloud",
      collapsible: true,
      prefix: "SpringCloud/",
      children: [
        "00-Docker.md",
        "01-微服务.md",
        "02-Eureka服务注册与发现.md",
        "03-Zookeeper服务注册与发现.md",
        "04-Consul服务注册与发现.md",
        "05-Ribbon负载均衡服务调用.md",
        "06-OpenFeign服务调用.md",
        "07-Hystrix服务降级.md",
        "08-GateWay服务网关.md",
        "09-Config和Bus.md",
        "10-Stream和Sleuth.md",
        "11-Alibaba入门.md",
        "12-Nacos服务注册和配置中心.md",
        "13-Sentinel熔断与限流.md",
        "14-Seata分布式事务.md",
        "14-1-Seata部署全流程.md",
        "15-雪花算法.md",
        "16-Nginx-进阶.md",
        "17-Sa-Token.md",
        "17-1-Sa-Token单点认证.md",
        "17-2-OAuth.md",
        "18-数据校验.md",
        "19-分布式缓存.md",
        "20-Session共享.md",
        "21-Spring操作RabbitMQ.md",
        "22-Feign远程调用丢失请求头.md",
        "23-幂等性问题.md",
        "24-本地事务失效解决方案.md",
      ]
    }, {
      text: "6-Thread",
      icon: "thread",
      collapsible: true,
      prefix: "Thread/",
      children: [
        "1-线程的基本介绍.md",
        "2-Java线程.md",
        "3-共享模型之管程.md",
        "4-共享模型之内存.md",
        "5-共享模型之无锁.md",
        "6-连接池和线程池.md",
        "7-JUC.md",
      ]
    }, {
      text: "7-Netty",
      icon: "reactor-netty",
      prefix: "Netty/",
      collapsible: true,
      children: [
        "01-NIO.md",
        "02-Netty入门.md",
        "03-Netty-GoogleProtobuf.md",
        "04-Netty-RPC.md",
        "05-Dubbo入门.md",
      ]

    }
  ],
  "/GoLang/": [
    {
      collapsible: true,
      text: "Golang基础",
      icon: "golang",
      prefix: "Base/",
      children: [
        "01-初识GoLang.md",
        "02-类.md",
        "03-IO.md",
        "04-反射.md",
        "05-线程.md",
        "06-网络和测试.md",
        "07-操作数据库.md",
        "08-依赖管理和包.md",
        "09-Etdc和Es.md",
        "10-GIN.md",
        "11-GoLang常用包.md",
      ]
    }
  ]
});
