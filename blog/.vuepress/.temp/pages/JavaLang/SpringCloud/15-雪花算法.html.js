export const data = {
  "key": "v-b9bd0882",
  "path": "/JavaLang/SpringCloud/15-%E9%9B%AA%E8%8A%B1%E7%AE%97%E6%B3%95.html",
  "title": "15-雪花算法",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "15-雪花算法",
    "date": "2022-01-14T21:14:30.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "snowflake",
      "雪花 算法"
    ],
    "summary": "前言\r\" 集群高并发情况下如何保证分布式唯一ID的生成？\" 是不是看起来很简单的样子.. 先说需求 以前我们是单机 所以随便自己用UUID，或者SQL之类的 瞎玩即可 但现在是一个多机的系统，就有时钟和机器配置不同步的问题，导致我们可能会产生出相同的ID 我们对于ID生成规则有着如下的硬性要求 1. 全局唯一：不能出现重复的ID号，既然是唯一标识，这是最基本",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/15-%E9%9B%AA%E8%8A%B1%E7%AE%97%E6%B3%95.html"
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
          "content": "15-雪花算法"
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
          "content": "snowflake"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "雪花 算法"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-01-14T21:14:30.000Z"
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
      "children": [
        {
          "level": 3,
          "title": "雪花算法的介绍",
          "slug": "雪花算法的介绍",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "使用雪花算法",
      "slug": "使用雪花算法",
      "children": []
    },
    {
      "level": 2,
      "title": "整合SpringBoot",
      "slug": "整合springboot",
      "children": []
    },
    {
      "level": 2,
      "title": "雪花算法的优缺点",
      "slug": "雪花算法的优缺点",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 8.48,
    "words": 2544
  },
  "filePathRelative": "JavaLang/SpringCloud/15-雪花算法.md"
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
