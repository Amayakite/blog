export const data = {
  "key": "v-4a924692",
  "path": "/JavaLang/SpringFrameWork/09-%E4%BA%8B%E5%8A%A1%E6%8E%A7%E5%88%B6.html",
  "title": "09-事务控制",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "09-事务控制",
    "date": "2021-12-14T17:26:54.000Z",
    "category": [
      "Spring-FrameWork"
    ],
    "tag": [
      "Java",
      "Spring",
      "Mysql",
      "Jdbc"
    ],
    "summary": "概述 ​ 在正式开始之前，需要一些内容 ​ 我们之前在控制事务的时候（Jdbc事务），都是自己来开启事务、提交事务、回滚事务 ​ 这种就叫编程式控制事务---我们通过自己写代码的方式来控制事务 ​ 那么我们这里主要学习什么？ ​ 这里的目的就是我们不去自己写事务控制的代码，将事务控制全权交给Spring来进行控制，而我们只需要进行一些简单的配置即可 ​ 这样",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringFrameWork/09-%E4%BA%8B%E5%8A%A1%E6%8E%A7%E5%88%B6.html"
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
          "content": "09-事务控制"
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
          "content": "Mysql"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Jdbc"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-14T17:26:54.000Z"
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
      "title": "编程式事务控制",
      "slug": "编程式事务控制",
      "children": [
        {
          "level": 3,
          "title": "PlatformTransactionManager",
          "slug": "platformtransactionmanager",
          "children": []
        },
        {
          "level": 3,
          "title": "TransactionDefination",
          "slug": "transactiondefination",
          "children": []
        },
        {
          "level": 3,
          "title": "TransactionStatus",
          "slug": "transactionstatus",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "基于XML的声明式事务控制",
      "slug": "基于xml的声明式事务控制",
      "children": [
        {
          "level": 3,
          "title": "准备环境搭建",
          "slug": "准备环境搭建",
          "children": []
        },
        {
          "level": 3,
          "title": "使用事务前的准备工作",
          "slug": "使用事务前的准备工作",
          "children": []
        },
        {
          "level": 3,
          "title": "使用声明式事务控制的明确事项",
          "slug": "使用声明式事务控制的明确事项",
          "children": []
        },
        {
          "level": 3,
          "title": "✨XML事务的快速配置",
          "slug": "✨xml事务的快速配置",
          "children": []
        },
        {
          "level": 3,
          "title": "✨✨事务属性的配置",
          "slug": "✨✨事务属性的配置",
          "children": []
        },
        {
          "level": 3,
          "title": "XML声明式事务控制的要点",
          "slug": "xml声明式事务控制的要点",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "基于注解的声明式事务控制",
      "slug": "基于注解的声明式事务控制",
      "children": [
        {
          "level": 3,
          "title": "✨Configuration",
          "slug": "✨configuration",
          "children": []
        },
        {
          "level": 3,
          "title": "✨设置切入点",
          "slug": "✨设置切入点",
          "children": []
        },
        {
          "level": 3,
          "title": "测试",
          "slug": "测试",
          "children": []
        },
        {
          "level": 3,
          "title": "✨使用配置文件+注解",
          "slug": "✨使用配置文件-注解",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 16.21,
    "words": 4862
  },
  "filePathRelative": "JavaLang/SpringFrameWork/09-事务控制.md"
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
