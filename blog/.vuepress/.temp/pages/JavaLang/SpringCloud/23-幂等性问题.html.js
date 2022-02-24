export const data = {
  "key": "v-144f0379",
  "path": "/JavaLang/SpringCloud/23-%E5%B9%82%E7%AD%89%E6%80%A7%E9%97%AE%E9%A2%98.html",
  "title": "23-幂等性问题",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "23-幂等性问题",
    "date": "2022-02-05T23:08:56.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "幂等性问题"
    ],
    "summary": "概述 简单来说，就是一个订单的按钮，你点击一次，和点击一百次 或者一个登陆的按钮，你点击一次，和点击一百次，效果都是一样的 获取，对比，删除 解决方案一览 有一种思路是验证码方式，可以运用在登陆的场景，每次生成的验证码都不一样，用完即删，使用Lua脚本进行验证，若不存在就那啥.. 在其他场景，例如订单提交，则就可以在进入提交页面之后，发送一个获取订单令牌的请",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/23-%E5%B9%82%E7%AD%89%E6%80%A7%E9%97%AE%E9%A2%98.html"
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
          "content": "23-幂等性问题"
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
          "content": "微服务"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "幂等性问题"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-02-05T23:08:56.000Z"
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
      "title": "解决方案一览",
      "slug": "解决方案一览",
      "children": []
    },
    {
      "level": 2,
      "title": "订单提交的令牌处理",
      "slug": "订单提交的令牌处理",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 3.83,
    "words": 1150
  },
  "filePathRelative": "JavaLang/SpringCloud/23-幂等性问题.md"
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
