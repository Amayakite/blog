export const data = {
  "key": "v-186399e8",
  "path": "/JavaLang/JavaEE/04-%E5%9C%A8%E5%BC%80%E5%A7%8B%E5%90%8E%E9%9D%A2%E4%B8%9C%E8%A5%BF%E5%89%8D%E8%A6%81%E5%81%9A%E7%9A%84%E4%BA%8B%E6%83%85.html",
  "title": "04-在继续学习JavaWeb前要做的事情",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "04-在继续学习JavaWeb前要做的事情",
    "date": "2021-12-04T22:19:50.000Z",
    "category": [
      "JavaWeb"
    ],
    "tag": [
      "Java",
      "JavaWeb"
    ],
    "summary": "把前面的内容结合一下，制作一个简单的书城登录程序吧 前言 在正式开始后续的学习前，得先了解下JavaWeb应用的三层架构： 分层的目的是为了解耦，解耦就是为了降低代码的耦合度，方便后期的维护和升级\rWeb层; \rcom.books.web; \rService层; \rcom.books.service Service接口包; \rcom.books.servic",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/JavaEE/04-%E5%9C%A8%E5%BC%80%E5%A7%8B%E5%90%8E%E9%9D%A2%E4%B8%9C%E8%A5%BF%E5%89%8D%E8%A6%81%E5%81%9A%E7%9A%84%E4%BA%8B%E6%83%85.html"
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
          "content": "04-在继续学习JavaWeb前要做的事情"
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
          "content": "2021-12-04T22:19:50.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "前言",
      "slug": "前言",
      "children": []
    },
    {
      "level": 2,
      "title": "设计数据库",
      "slug": "设计数据库",
      "children": []
    },
    {
      "level": 2,
      "title": "完成JDBCUtils和读取db.properties",
      "slug": "完成jdbcutils和读取db-properties",
      "children": []
    },
    {
      "level": 2,
      "title": "完成BasicDao和UserDao",
      "slug": "完成basicdao和userdao",
      "children": [
        {
          "level": 3,
          "title": "BasicDao",
          "slug": "basicdao",
          "children": []
        },
        {
          "level": 3,
          "title": "UserDao",
          "slug": "userdao",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "目前结构",
      "slug": "目前结构",
      "children": [
        {
          "level": 3,
          "title": "两个测试文件",
          "slug": "两个测试文件",
          "children": []
        },
        {
          "level": 3,
          "title": "扩展-快速的创建单元测试文件",
          "slug": "扩展-快速的创建单元测试文件",
          "children": []
        },
        {
          "level": 3,
          "title": "服务端完成对用户的登陆注册等操作的处理（Service）",
          "slug": "服务端完成对用户的登陆注册等操作的处理-service",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务端响应客户端发送的数据",
      "slug": "服务端响应客户端发送的数据",
      "children": [
        {
          "level": 3,
          "title": "验证码和加密生成类",
          "slug": "验证码和加密生成类",
          "children": []
        },
        {
          "level": 3,
          "title": "给用户发送验证码图片",
          "slug": "给用户发送验证码图片",
          "children": []
        },
        {
          "level": 3,
          "title": "用户注册",
          "slug": "用户注册",
          "children": []
        },
        {
          "level": 3,
          "title": "用户登录--COOKIE存放",
          "slug": "用户登录-cookie存放",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "做一个简单的login和注册界面",
      "slug": "做一个简单的login和注册界面",
      "children": [
        {
          "level": 3,
          "title": "一些问题",
          "slug": "一些问题",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 12.99,
    "words": 3898
  },
  "filePathRelative": "JavaLang/JavaEE/04-在开始后面东西前要做的事情.md"
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
