export const data = {
  "key": "v-0cb0f7f0",
  "path": "/JavaLang/SpringFrameWork/05-SpringMVC.html",
  "title": "05-SpringMVC",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "05-SpringMVC",
    "date": "2021-12-11T11:39:23.000Z",
    "category": [
      "Spring-FrameWork"
    ],
    "tag": [
      "Java",
      "Spring",
      "SpringMvc",
      "JavaWeb"
    ],
    "summary": "概述\r\" ​ SpringMvc是一种基于Java实现Mvc设计模型的请求驱动类的轻量级Web框架，属于SpringFrameWork的后续产品，已经融合在Spring web Flow中\"\r\"\"\r\" - M：module，模型，主要用于数据封装和业务逻辑处理\"\r\" - V：view，视图，用于数据的展示\"\r\" - C：controller，控制器，用于分发",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringFrameWork/05-SpringMVC.html"
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
          "content": "05-SpringMVC"
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
          "content": "Spring"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "SpringMvc"
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
          "content": "2021-12-11T11:39:23.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "概述",
      "slug": "概述",
      "children": [
        {
          "level": 3,
          "title": "简单的实现共有行为-BaseServlet",
          "slug": "简单的实现共有行为-baseservlet",
          "children": []
        },
        {
          "level": 3,
          "title": "baseServlet代码实现",
          "slug": "baseservlet代码实现",
          "children": []
        },
        {
          "level": 3,
          "title": "baseServlet的弊端",
          "slug": "baseservlet的弊端",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "SpringMVC的开发步骤",
      "slug": "springmvc的开发步骤",
      "children": [
        {
          "level": 3,
          "title": "SpringMVC的快速入门",
          "slug": "springmvc的快速入门",
          "children": []
        },
        {
          "level": 3,
          "title": "分析Spring-MVC在启动的时候都做了什么",
          "slug": "分析spring-mvc在启动的时候都做了什么",
          "children": []
        },
        {
          "level": 3,
          "title": "📕SpringMVC的执行流程",
          "slug": "📕springmvc的执行流程",
          "children": []
        },
        {
          "level": 3,
          "title": "@RequestMapping",
          "slug": "requestmapping",
          "children": []
        },
        {
          "level": 3,
          "title": "✨@RequestMapping的参数",
          "slug": "✨-requestmapping的参数",
          "children": []
        },
        {
          "level": 3,
          "title": "SpringMVC跳转时的前缀和后缀",
          "slug": "springmvc跳转时的前缀和后缀",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "SpringMVC的数据响应",
      "slug": "springmvc的数据响应",
      "children": [
        {
          "level": 3,
          "title": "页面跳转",
          "slug": "页面跳转",
          "children": []
        },
        {
          "level": 3,
          "title": "回写数据",
          "slug": "回写数据",
          "children": []
        },
        {
          "level": 3,
          "title": "✨@ResponseBody 标注不进行页面跳转",
          "slug": "✨-responsebody-标注不进行页面跳转",
          "children": []
        },
        {
          "level": 3,
          "title": "返回Json给客户端-使用jackson",
          "slug": "返回json给客户端-使用jackson",
          "children": []
        },
        {
          "level": 3,
          "title": "✨返回对象或者集合，配置处理器适配器转换成JSon",
          "slug": "✨返回对象或者集合-配置处理器适配器转换成json",
          "children": []
        },
        {
          "level": 3,
          "title": "✨✨返回对象或集合-让Spring自动配置Json解析器(jackson)",
          "slug": "✨✨返回对象或集合-让spring自动配置json解析器-jackson",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨SpringMVC获取请求数据",
      "slug": "✨springmvc获取请求数据",
      "children": [
        {
          "level": 3,
          "title": "获得基本类型参数",
          "slug": "获得基本类型参数",
          "children": []
        },
        {
          "level": 3,
          "title": "获取POJO类型参数",
          "slug": "获取pojo类型参数",
          "children": []
        },
        {
          "level": 3,
          "title": "获取数组类型的参数",
          "slug": "获取数组类型的参数",
          "children": []
        },
        {
          "level": 3,
          "title": "✨✨@RequestBody获取请求体（附带跨域的解决）",
          "slug": "✨✨-requestbody获取请求体-附带跨域的解决",
          "children": []
        },
        {
          "level": 3,
          "title": "✨SpringMVC中直接访问静态资源的访问配置",
          "slug": "✨springmvc中直接访问静态资源的访问配置",
          "children": []
        },
        {
          "level": 3,
          "title": "配置全局请求编码-解决请求数据乱码的问题",
          "slug": "配置全局请求编码-解决请求数据乱码的问题",
          "children": []
        },
        {
          "level": 3,
          "title": "✨@RequestParam获取param参数",
          "slug": "✨-requestparam获取param参数",
          "children": []
        },
        {
          "level": 3,
          "title": "Restful风格的参数",
          "slug": "restful风格的参数",
          "children": []
        },
        {
          "level": 3,
          "title": "✨获得Restful风格的参数",
          "slug": "✨获得restful风格的参数",
          "children": []
        },
        {
          "level": 3,
          "title": "✨自定义类型转换器",
          "slug": "✨自定义类型转换器",
          "children": []
        },
        {
          "level": 3,
          "title": "获取Servlet相关的API(Req,Res,Session等)",
          "slug": "获取servlet相关的api-req-res-session等",
          "children": []
        },
        {
          "level": 3,
          "title": "✨@RequestHeader获取请求头",
          "slug": "✨-requestheader获取请求头",
          "children": []
        },
        {
          "level": 3,
          "title": "✨@CookieValue 获取cookie",
          "slug": "✨-cookievalue-获取cookie",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "文件上传",
      "slug": "文件上传",
      "children": [
        {
          "level": 3,
          "title": "单文件上传实现",
          "slug": "单文件上传实现",
          "children": []
        },
        {
          "level": 3,
          "title": "多文件上传实现",
          "slug": "多文件上传实现",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 42.09,
    "words": 12628
  },
  "filePathRelative": "JavaLang/SpringFrameWork/05-SpringMVC.md"
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
