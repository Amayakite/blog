export const data = {
  "key": "v-446149ea",
  "path": "/JavaLang/SpringCloud/22-Feign%E8%BF%9C%E7%A8%8B%E8%B0%83%E7%94%A8%E4%B8%A2%E5%A4%B1%E8%AF%B7%E6%B1%82%E5%A4%B4.html",
  "title": "22-Feign远程调用丢失请求头",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "22-Feign远程调用丢失请求头",
    "date": "2022-02-05T22:21:09.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud OpenFeign",
      "SpringCloud"
    ],
    "summary": "概述 解决 异步调用丢失（开新线程调用） 实际工作中，一般都是异步调用 Thread对象只对当前线程管用，在其他线程拿不到其中的内容 解决：ThreadLocal 有个子类InheritableThreadLocal 可以继承父线程的信息 spring security使用的令牌在请求头区分登录信息，和springsession一样，使用远程调用和多线程也要",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/22-Feign%E8%BF%9C%E7%A8%8B%E8%B0%83%E7%94%A8%E4%B8%A2%E5%A4%B1%E8%AF%B7%E6%B1%82%E5%A4%B4.html"
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
          "content": "22-Feign远程调用丢失请求头"
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
          "content": "Spring Cloud OpenFeign"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "SpringCloud"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-02-05T22:21:09.000Z"
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
      "title": "解决",
      "slug": "解决",
      "children": []
    },
    {
      "level": 2,
      "title": "异步调用丢失（开新线程调用）",
      "slug": "异步调用丢失-开新线程调用",
      "children": []
    },
    {
      "level": 2,
      "title": "解决方案",
      "slug": "解决方案",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 1.95,
    "words": 585
  },
  "filePathRelative": "JavaLang/SpringCloud/22-Feign远程调用丢失请求头.md"
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
