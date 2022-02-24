export const data = {
  "key": "v-007a3c54",
  "path": "/JavaLang/SpringCloud/20-Session%E5%85%B1%E4%BA%AB.html",
  "title": "20-Session共享",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "20-Session共享",
    "date": "2022-02-04T22:53:25.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "Redis",
      "Session"
    ],
    "summary": "概述 就是让Redis来让session之间能够共享 虽然说可以通过tomcat的hash负载来解决，但是那样太拉胯了 依赖和配置 然后配置文件中配置好redis，这个东西会自动找redis的工厂来用 然后启动类上要额外加一个注解 然后照常使用HttpSession即可 配置cookie存档的信息以及自定义序列化方式 1. 配置cookie的存储名字之类的 ",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/20-Session%E5%85%B1%E4%BA%AB.html"
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
          "content": "20-Session共享"
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
          "content": "Redis"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Session"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-02-04T22:53:25.000Z"
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
          "title": "依赖和配置",
          "slug": "依赖和配置",
          "children": []
        },
        {
          "level": 3,
          "title": "配置cookie存档的信息以及自定义序列化方式",
          "slug": "配置cookie存档的信息以及自定义序列化方式",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 1,
    "words": 300
  },
  "filePathRelative": "JavaLang/SpringCloud/20-Session共享.md"
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
