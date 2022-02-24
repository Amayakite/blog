export const data = {
  "key": "v-67c80a25",
  "path": "/JavaLang/SpringCloud/17-Sa-Token.html",
  "title": "17-Sa-Token",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "17-Sa-Token",
    "date": "2022-01-21T15:13:30.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "Sa-Token",
      "Security"
    ],
    "summary": "概述 因为SpringSecurity的OAuth2的教程并不是那么容易，并且比较旧…所以我选择了国人开发的这款鉴权系统 看官方文档应该比看我的文章更容易懂一些..建议看官方的 这是一个学习成本超级低的框架，看一眼就非常喜欢.. 简单的单体应用 这里的全都非常重要，最好是看官方文档或者把这里的所有内容都看完\r\" 下面内容中，根据标题确定重要程度，✨表示重要，",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/17-Sa-Token.html"
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
          "content": "17-Sa-Token"
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
          "content": "Sa-Token"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Security"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-01-21T15:13:30.000Z"
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
      "children": []
    },
    {
      "level": 2,
      "title": "简单的单体应用",
      "slug": "简单的单体应用",
      "children": [
        {
          "level": 3,
          "title": "✨依赖准备和配置文件",
          "slug": "✨依赖准备和配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "启动类和Controller",
          "slug": "启动类和controller",
          "children": []
        },
        {
          "level": 3,
          "title": "✨用户的权限的授予和获取",
          "slug": "✨用户的权限的授予和获取",
          "children": []
        },
        {
          "level": 3,
          "title": "全局异常处理器",
          "slug": "全局异常处理器",
          "children": []
        },
        {
          "level": 3,
          "title": "注销、下线和账号封禁",
          "slug": "注销、下线和账号封禁",
          "children": []
        },
        {
          "level": 3,
          "title": "✨注解式鉴权",
          "slug": "✨注解式鉴权",
          "children": []
        },
        {
          "level": 3,
          "title": "✨✨路由拦截器鉴权（配置式鉴权）",
          "slug": "✨✨路由拦截器鉴权-配置式鉴权",
          "children": []
        },
        {
          "level": 3,
          "title": "✨User-Session",
          "slug": "✨user-session",
          "children": []
        },
        {
          "level": 3,
          "title": "✨Token-Session",
          "slug": "✨token-session",
          "children": []
        },
        {
          "level": 3,
          "title": "✨Custom-Session",
          "slug": "✨custom-session",
          "children": []
        },
        {
          "level": 3,
          "title": "✨Session结构模型图",
          "slug": "✨session结构模型图",
          "children": []
        },
        {
          "level": 3,
          "title": "✨✨获取到的Session对象的操作",
          "slug": "✨✨获取到的session对象的操作",
          "children": []
        },
        {
          "level": 3,
          "title": "框架的配置",
          "slug": "框架的配置",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "深入",
      "slug": "深入",
      "children": [
        {
          "level": 3,
          "title": "✨集成Redis",
          "slug": "✨集成redis",
          "children": []
        },
        {
          "level": 3,
          "title": "✨前后端分离-使用Token",
          "slug": "✨前后端分离-使用token",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义token的生成风格",
          "slug": "自定义token的生成风格",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义Token前缀",
          "slug": "自定义token前缀",
          "children": []
        },
        {
          "level": 3,
          "title": "[记住我]模式和token有效期（单独设置）",
          "slug": "记住我-模式和token有效期-单独设置",
          "children": []
        },
        {
          "level": 3,
          "title": "模拟他人",
          "slug": "模拟他人",
          "children": []
        },
        {
          "level": 3,
          "title": "同端互斥登陆",
          "slug": "同端互斥登陆",
          "children": []
        },
        {
          "level": 3,
          "title": "二级认证",
          "slug": "二级认证",
          "children": []
        },
        {
          "level": 3,
          "title": "Http Basic认证",
          "slug": "http-basic认证",
          "children": []
        },
        {
          "level": 3,
          "title": "密码加密",
          "slug": "密码加密",
          "children": []
        },
        {
          "level": 3,
          "title": "会话治理",
          "slug": "会话治理",
          "children": []
        },
        {
          "level": 3,
          "title": "全局侦听器",
          "slug": "全局侦听器",
          "children": []
        },
        {
          "level": 3,
          "title": "全局过滤器（Filter）",
          "slug": "全局过滤器-filter",
          "children": []
        },
        {
          "level": 3,
          "title": "多账号认证",
          "slug": "多账号认证",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 43.9,
    "words": 13171
  },
  "filePathRelative": "JavaLang/SpringCloud/17-Sa-Token.md"
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
