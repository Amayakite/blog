export const data = {
  "key": "v-cd13e2a4",
  "path": "/JavaLang/SpringBoot/05-SpringSecurity.html",
  "title": "05-SpringSecurity",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "05-SpringSecurity",
    "date": "2021-12-24T14:35:20.000Z",
    "category": [
      "SpringBoot"
    ],
    "tag": [
      "SpringSecurity",
      "SpringBoot"
    ],
    "summary": "简介 这里我看的是这位Up主的视频来学习的 感觉比ssg和hm的好非常多 ​Spring Security是Spring家族中的一个安全管理框架，相比于另一个安全框架Shiro，它提供了更丰富的功能，社区资源也比Shiro丰富 ​一般来说中大型的项目都是用这个玩意来做安全框架，小项目用Shiro可能多一些，因为相比于这玩意，SHiro上手更简单一些 ​这玩意",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringBoot/05-SpringSecurity.html"
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
          "content": "05-SpringSecurity"
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
          "content": "SpringSecurity"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "SpringBoot"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-24T14:35:20.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "简介",
      "slug": "简介",
      "children": []
    },
    {
      "level": 2,
      "title": "快速入门",
      "slug": "快速入门",
      "children": [
        {
          "level": 3,
          "title": "准备工作",
          "slug": "准备工作",
          "children": []
        },
        {
          "level": 3,
          "title": "引入springSecurity",
          "slug": "引入springsecurity",
          "children": []
        },
        {
          "level": 3,
          "title": "登陆校验的流程",
          "slug": "登陆校验的流程",
          "children": []
        },
        {
          "level": 3,
          "title": "SpringSecurity的基本原理",
          "slug": "springsecurity的基本原理",
          "children": []
        },
        {
          "level": 3,
          "title": "依赖准备",
          "slug": "依赖准备",
          "children": []
        },
        {
          "level": 3,
          "title": "sql表准备",
          "slug": "sql表准备",
          "children": []
        },
        {
          "level": 3,
          "title": "SpringBoot配置文件准备",
          "slug": "springboot配置文件准备",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "相关工具类的准备",
      "slug": "相关工具类的准备",
      "children": [
        {
          "level": 3,
          "title": "RedisJson序列化Utils",
          "slug": "redisjson序列化utils",
          "children": []
        },
        {
          "level": 3,
          "title": "JWT工具类",
          "slug": "jwt工具类",
          "children": []
        },
        {
          "level": 3,
          "title": "RedisUtils",
          "slug": "redisutils",
          "children": []
        },
        {
          "level": 3,
          "title": "WebUtils",
          "slug": "webutils",
          "children": []
        },
        {
          "level": 3,
          "title": "返回类型：ResponseResult类",
          "slug": "返回类型-responseresult类",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Config类",
      "slug": "config类",
      "children": [
        {
          "level": 3,
          "title": "RedisConfig",
          "slug": "redisconfig",
          "children": []
        },
        {
          "level": 3,
          "title": "Domain准备",
          "slug": "domain准备",
          "children": []
        },
        {
          "level": 3,
          "title": "测试sql",
          "slug": "测试sql",
          "children": []
        },
        {
          "level": 3,
          "title": "✨实现我们的用户登录功能-数据库校验用户",
          "slug": "✨实现我们的用户登录功能-数据库校验用户",
          "children": []
        },
        {
          "level": 3,
          "title": "✨关于密码的加密存储",
          "slug": "✨关于密码的加密存储",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义基于Hutool的JWT工具类",
          "slug": "自定义基于hutool的jwt工具类",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义登陆接口的流程说明",
          "slug": "自定义登陆接口的流程说明",
          "children": []
        },
        {
          "level": 3,
          "title": "✨自定义登陆接口的实现",
          "slug": "✨自定义登陆接口的实现",
          "children": []
        },
        {
          "level": 3,
          "title": "✨Token认证过滤器",
          "slug": "✨token认证过滤器",
          "children": []
        },
        {
          "level": 3,
          "title": "✨退出登录",
          "slug": "✨退出登录",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "关于认证配置configuration方法的说明",
      "slug": "关于认证配置configuration方法的说明",
      "children": []
    },
    {
      "level": 2,
      "title": "授权",
      "slug": "授权",
      "children": [
        {
          "level": 3,
          "title": "权限系统的应用",
          "slug": "权限系统的应用",
          "children": []
        },
        {
          "level": 3,
          "title": "授权的基本流程",
          "slug": "授权的基本流程",
          "children": []
        },
        {
          "level": 3,
          "title": "✨限制资源访问所需要的权限",
          "slug": "✨限制资源访问所需要的权限",
          "children": []
        },
        {
          "level": 3,
          "title": "✨封装权限信息",
          "slug": "✨封装权限信息",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "从数据库中查询权限信息",
      "slug": "从数据库中查询权限信息",
      "children": [
        {
          "level": 3,
          "title": "✨RBAC权限模型",
          "slug": "✨rbac权限模型",
          "children": []
        },
        {
          "level": 3,
          "title": "✨准备工作-创建表",
          "slug": "✨准备工作-创建表",
          "children": []
        },
        {
          "level": 3,
          "title": "✨代码实现",
          "slug": "✨代码实现",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨自定义失败处理",
      "slug": "✨自定义失败处理",
      "children": []
    },
    {
      "level": 2,
      "title": "跨域",
      "slug": "跨域",
      "children": []
    },
    {
      "level": 2,
      "title": "关于@PreAuthorize的额外说明及其他的权限校验注解",
      "slug": "关于-preauthorize的额外说明及其他的权限校验注解",
      "children": [
        {
          "level": 3,
          "title": "定义多个校验规则",
          "slug": "定义多个校验规则",
          "children": []
        },
        {
          "level": 3,
          "title": "有前缀的校验规则",
          "slug": "有前缀的校验规则",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义权限校验方法",
          "slug": "自定义权限校验方法",
          "children": []
        },
        {
          "level": 3,
          "title": "基于配置的权限控制",
          "slug": "基于配置的权限控制",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "关于CSRF跨站攻击",
      "slug": "关于csrf跨站攻击",
      "children": []
    },
    {
      "level": 2,
      "title": "归档",
      "slug": "归档",
      "children": [
        {
          "level": 3,
          "title": "核心流程图",
          "slug": "核心流程图",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 48.81,
    "words": 14643
  },
  "filePathRelative": "JavaLang/SpringBoot/05-SpringSecurity.md"
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
