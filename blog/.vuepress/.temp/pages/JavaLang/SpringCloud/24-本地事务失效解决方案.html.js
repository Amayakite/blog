export const data = {
  "key": "v-b5dbad80",
  "path": "/JavaLang/SpringCloud/24-%E6%9C%AC%E5%9C%B0%E4%BA%8B%E5%8A%A1%E5%A4%B1%E6%95%88%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html",
  "title": "24-本地事务失效解决方案",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "24-本地事务失效解决方案",
    "date": "2022-02-06T13:13:27.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "Transactional"
    ],
    "summary": "概述 在SpringBoot中，可以使用@Transactional来开启一个事务（自动配置好了，原理可以看之前的springframework） 但是，如果我们想要在同一个service内通过事务对象调用本类的事务对象 上方代码中，b和c的@Transactional注解都会失效，因为这个事务实际上是依赖于动态代理，如果说我们调用的是其他类的，例如Aser",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/24-%E6%9C%AC%E5%9C%B0%E4%BA%8B%E5%8A%A1%E5%A4%B1%E6%95%88%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html"
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
          "content": "24-本地事务失效解决方案"
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
          "content": "Transactional"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-02-06T13:13:27.000Z"
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
      "title": "解决方案",
      "slug": "解决方案",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 1.56,
    "words": 469
  },
  "filePathRelative": "JavaLang/SpringCloud/24-本地事务失效解决方案.md"
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
