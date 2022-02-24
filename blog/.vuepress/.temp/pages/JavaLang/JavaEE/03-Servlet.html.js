export const data = {
  "key": "v-23c3c992",
  "path": "/JavaLang/JavaEE/03-Servlet.html",
  "title": "03-Servle",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "03-Servle",
    "date": "2021-12-02T17:26:20.000Z",
    "category": [
      "JavaWeb"
    ],
    "tag": [
      "Java",
      "JavaWeb"
    ],
    "summary": "Servlet简介\rServlet是Sun公司开发动态web的一门技术; \rSun在这些API中提供了一个接口，接口名为：Servlet; 也就是说，这玩意是一个接口，所以我们实际使用过程中可以知道\r可以自己实现这个接口; \r编写一个类，实现Servlet接口; \r把编写好的Java类部署到服务器中; \r所用的现成的API都是实现了这个接口; 有点绕的一句话",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/JavaEE/03-Servlet.html"
        }
      ],
      [
        "meta",
        {
          "property": "og:site_name",
          "content": "Amayakite Blogs"
        }
      ],
      [
        "meta",
        {
          "property": "og:title",
          "content": "03-Servle"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "article"
        }
      ],
      [
        "meta",
        {
          "property": "og:locale",
          "content": "zh-CN"
        }
      ],
      [
        "meta",
        {
          "name": "twitter:card",
          "content": "summary_large_image"
        }
      ],
      [
        "meta",
        {
          "name": "twitter:image:alt",
          "content": "Amayakite Blogs"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Java"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "JavaWeb"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-02T17:26:20.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Servlet简介",
      "slug": "servlet简介",
      "children": [
        {
          "level": 3,
          "title": "开始学习前的准备工作",
          "slug": "开始学习前的准备工作",
          "children": []
        },
        {
          "level": 3,
          "title": "扩展-Maven父子工程的理解",
          "slug": "扩展-maven父子工程的理解",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "HttpServlet源码分析",
      "slug": "httpservlet源码分析",
      "children": [
        {
          "level": 3,
          "title": "配置Servlet的映射(Router)",
          "slug": "配置servlet的映射-router",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Servlet访问流程详解（未涉及tomcat底层）",
      "slug": "servlet访问流程详解-未涉及tomcat底层",
      "children": []
    },
    {
      "level": 2,
      "title": "web.xml中Servlet-mapping配置项可以兼容的地方",
      "slug": "web-xml中servlet-mapping配置项可以兼容的地方",
      "children": [
        {
          "level": 3,
          "title": "单个Servlet绑定单个Servlet-mapping",
          "slug": "单个servlet绑定单个servlet-mapping",
          "children": []
        },
        {
          "level": 3,
          "title": "单个Servlet绑定多个Servlet-mapping",
          "slug": "单个servlet绑定多个servlet-mapping",
          "children": []
        },
        {
          "level": 3,
          "title": "单个Servlet绑定某个字段下的所有路径",
          "slug": "单个servlet绑定某个字段下的所有路径",
          "children": []
        },
        {
          "level": 3,
          "title": "覆盖所有页面",
          "slug": "覆盖所有页面",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义后缀",
          "slug": "自定义后缀",
          "children": []
        },
        {
          "level": 3,
          "title": "Mapping的优先级问题",
          "slug": "mapping的优先级问题",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Servlet的生命周期",
      "slug": "servlet的生命周期",
      "children": []
    },
    {
      "level": 2,
      "title": "正式开始Servlet",
      "slug": "正式开始servlet",
      "children": []
    },
    {
      "level": 2,
      "title": "ServletContext",
      "slug": "servletcontext",
      "children": [
        {
          "level": 3,
          "title": "域对象介绍",
          "slug": "域对象介绍",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "ServletContext中常用的方法",
      "slug": "servletcontext中常用的方法",
      "children": [
        {
          "level": 3,
          "title": "读写共享参数",
          "slug": "读写共享参数",
          "children": []
        },
        {
          "level": 3,
          "title": "读取全局配置参数（web.xml中的内容）",
          "slug": "读取全局配置参数-web-xml中的内容",
          "children": []
        },
        {
          "level": 3,
          "title": "使用ServletContext完成请求转发（不是重定向）",
          "slug": "使用servletcontext完成请求转发-不是重定向",
          "children": []
        },
        {
          "level": 3,
          "title": "使用ServletContext搜索当前工程目录下面的资源文件(XML/Properties)",
          "slug": "使用servletcontext搜索当前工程目录下面的资源文件-xml-properties",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "使用注解的方式绕重复在xml中写内容来注册Servlet",
      "slug": "使用注解的方式绕重复在xml中写内容来注册servlet",
      "children": [
        {
          "level": 3,
          "title": "@WebServlet注解",
          "slug": "webservlet注解",
          "children": []
        },
        {
          "level": 3,
          "title": "urlPatterns",
          "slug": "urlpatterns",
          "children": []
        },
        {
          "level": 3,
          "title": "缺省-关于静态文件和404 Not Found界面的处理方式",
          "slug": "缺省-关于静态文件和404-not-found界面的处理方式",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 34.98,
    "words": 10494
  },
  "filePathRelative": "JavaLang/JavaEE/03-Servlet.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
