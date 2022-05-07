export const themeData = {
  "blog": {
    "description": "Amayakite",
    "intro": "/intro.html",
    "medias": {
      "Github": "https://github.com/Amayakite",
      "Email": "Amayakite@qq.com",
      "Gitee": "https://gitee.com/Amayakite",
      "QQ": "http://wpa.qq.com/msgrd?v=3&uin=2542896626&site=qq&menu=yes"
    }
  },
  "encrypt": {
    "global": false
  },
  "pure": false,
  "iconPrefix": "iconfont icon-",
  "darkmode": "auto-switch",
  "themeColor": {
    "blue": "#2196f3",
    "red": "#f26d6d",
    "green": "#3eaf7c",
    "orange": "#fb9b5f"
  },
  "fullscreen": true,
  "locales": {
    "/": {
      "blog": {},
      "repoDisplay": true,
      "navbarIcon": true,
      "navbarAutoHide": "mobile",
      "hideSiteNameonMobile": true,
      "sidebar": {
        "/JavaLang/": [
          {
            "text": "1-基础部分",
            "icon": "java",
            "prefix": "JavaSE/",
            "collapsable": true,
            "children": [
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
              "23-正则表达式.md"
            ]
          },
          {
            "text": "2-JavaWeb",
            "icon": "web",
            "prefix": "JavaEE/",
            "collapsable": true,
            "children": [
              "01-初识JavaWeb.md",
              "02-Maven.md",
              "02-1-通过空白的Maven模板搭建一个Web项目.md",
              "03-Servlet.md",
              "3-0规范的学习Servlet.md",
              "03-1Response和Requests.md",
              "04-在开始后面东西前要做的事情.md",
              "05-JSP.md"
            ]
          },
          {
            "text": "3-SpringFrameWork",
            "icon": "spring",
            "prefix": "SpringFrameWork/",
            "collapsable": true,
            "children": [
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
              "12-MyBatis-Plus.md"
            ]
          },
          {
            "text": "4-SpringBoot",
            "icon": "spring-boot",
            "collapsable": true,
            "prefix": "SpringBoot/",
            "children": [
              "01-Spring_Boot基础.md",
              "02-Spring_Boot核心功能.md",
              "03-Spring_Boot整合数据访问.md",
              "04-Redis.md",
              "05-SpringSecurity.md",
              "06-RabbitMQ.md",
              "07-Nginx.md",
              "08-Elasticsearch.md"
            ]
          },
          {
            "text": "5-SpringCloud",
            "icon": "spring-cloud",
            "collapsable": true,
            "prefix": "SpringCloud/",
            "children": [
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
              "24-本地事务失效解决方案.md"
            ]
          },
          {
            "text": "6-Thread",
            "icon": "thread",
            "collapsable": true,
            "prefix": "Thread/",
            "children": [
              "1-线程的基本介绍.md",
              "2-Java线程.md",
              "3-共享模型之管程.md",
              "4-共享模型之内存.md",
              "5-共享模型之无锁.md",
              "6-连接池和线程池.md",
              "7-JUC.md"
            ]
          }
        ],
        "/GoLang/": [
          {
            "collapsable": true,
            "text": "Golang基础",
            "icon": "golang",
            "prefix": "Base/",
            "children": [
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
              "11-GoLang常用包.md"
            ]
          }
        ]
      },
      "sidebarIcon": true,
      "headerDepth": 2,
      "headingDepth": 4,
      "author": {
        "name": "Amayakite",
        "url": "https://github.com/Amayakite"
      },
      "logo": "/logo.svg",
      "repo": "https://github.com/Amayakite/blog",
      "repoLabel": "GitHub",
      "docsRepo": "https://github.com/Amayakite/blog",
      "docsBranch": "master",
      "docsDir": "blog",
      "lastUpdated": true,
      "contributors": true,
      "editLink": true,
      "navbar": [
        "/",
        {
          "text": "Java学习笔记",
          "link": "/JavaLang/",
          "icon": "java"
        },
        {
          "text": "Go学习笔记",
          "link": "/GoLang/",
          "icon": "golang"
        },
        {
          "text": "Golang常用包",
          "link": "/GoLang/Base/11-Golang常用包.md",
          "icon": "golang"
        },
        {
          "text": "实用链接",
          "icon": "note",
          "children": [
            {
              "text": "VuePressTheme-Hope",
              "icon": "vue",
              "link": "https://vuepress-theme-hope.github.io/v2/zh/"
            },
            {
              "text": "Java常用网站",
              "icon": "java",
              "children": [
                {
                  "text": "JDK1.8手册",
                  "icon": "note",
                  "link": "https://www.matools.com/api/java8"
                },
                {
                  "text": "HuTool工具类库",
                  "icon": "plugin",
                  "link": "https://www.hutool.cn/"
                },
                {
                  "text": "Sa-Token文档",
                  "icon": "lock",
                  "link": "https://sa-token.dev33.cn/doc/index.html#/"
                },
                {
                  "text": "Maven仓库地址",
                  "icon": "list",
                  "link": "https://mvnrepository.com/"
                },
                {
                  "text": "Spring官网",
                  "icon": "leaf",
                  "link": "https://spring.io/"
                },
                {
                  "text": "Json在线解析",
                  "icon": "script",
                  "link": "https://www.json.cn/"
                }
              ]
            },
            {
              "text": "GoLang常用网站",
              "icon": "creative",
              "children": [
                {
                  "text": "GoLang官网",
                  "icon": "golang",
                  "link": "https://golang.org/"
                },
                {
                  "text": "Golang仓库",
                  "icon": "list",
                  "link": "https://pkg.go.dev/"
                },
                {
                  "text": "GoLang学习文档",
                  "icon": "group",
                  "link": "https://www.topgoer.com/"
                }
              ]
            }
          ]
        }
      ],
      "footer": "鱼跃此时海，花开彼岸天",
      "displayFooter": true,
      "metaLocales": {
        "editLink": "编辑此页",
        "prev": "上一页",
        "next": "下一页",
        "lastUpdated": "上次编辑于",
        "contributors": "贡献者"
      },
      "lang": "zh-CN",
      "navbarLocales": {
        "langName": "简体中文",
        "selectLangText": "选择语言",
        "selectLangAriaLabel": "选择语言"
      },
      "blogLocales": {
        "article": "文章",
        "articleList": "文章列表",
        "category": "分类",
        "tag": "标签",
        "timeline": "时间轴",
        "timelineTitle": "昨日不在",
        "all": "全部",
        "intro": "个人介绍",
        "star": "收藏",
        "slides": "幻灯片",
        "encrypt": "加密"
      },
      "outlookLocales": {
        "themeColor": "主题色",
        "darkmode": "外观",
        "fullscreen": "全屏"
      },
      "encryptLocales": {
        "title": "请输入密码",
        "errorHint": "请输入正确密码"
      },
      "routeLocales": {
        "404msg": [
          "这里什么也没有",
          "我们是怎么来到这儿的？",
          "这 是 四 零 四 !",
          "看起来你访问了一个失效的链接"
        ],
        "back": "返回上一页",
        "home": "带我回家"
      }
    }
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
