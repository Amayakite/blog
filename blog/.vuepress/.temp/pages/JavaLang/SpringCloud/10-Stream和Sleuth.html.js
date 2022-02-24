export const data = {
  "key": "v-472b50d4",
  "path": "/JavaLang/SpringCloud/10-Stream%E5%92%8CSleuth.html",
  "title": "10-Stream和Sleuth",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "10-Stream和Sleuth",
    "date": "2022-01-09T13:57:40.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Stream",
      "Spring Cloud Sleuth",
      "SpringCloud"
    ],
    "summary": "Stream概述 先说说为啥要有这玩意 消息中间件不止有RabbitMQ一个，还有ActiveMQ、RocketMQ、Kafka等 实际开发中，有概率存在两种中间件，例如RabbitMQ和Kafka，众所周知，中间件想搞明白并不简单（Kafka也不是那么简单滴）但是又不能追求统一而始终使用相同的中间件，导致我们在技术切换、技术使用的过程中遇到了一堆麻烦 所以",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/10-Stream%E5%92%8CSleuth.html"
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
          "content": "10-Stream和Sleuth"
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
          "content": "Spring Cloud Stream"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Spring Cloud Sleuth"
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
          "content": "2022-01-09T13:57:40.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Stream概述",
      "slug": "stream概述",
      "children": [
        {
          "level": 3,
          "title": "为什么用Cloud Stream",
          "slug": "为什么用cloud-stream",
          "children": []
        },
        {
          "level": 3,
          "title": "Binder",
          "slug": "binder",
          "children": []
        },
        {
          "level": 3,
          "title": "编码和常见注解",
          "slug": "编码和常见注解",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "简单使用",
      "slug": "简单使用",
      "children": [
        {
          "level": 3,
          "title": "生产者构建",
          "slug": "生产者构建",
          "children": []
        },
        {
          "level": 3,
          "title": "服务消费者",
          "slug": "服务消费者",
          "children": []
        },
        {
          "level": 3,
          "title": "防止重复消费和持久化",
          "slug": "防止重复消费和持久化",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Sleuth链路跟踪",
      "slug": "sleuth链路跟踪",
      "children": [
        {
          "level": 3,
          "title": "安装Zipkin",
          "slug": "安装zipkin",
          "children": []
        },
        {
          "level": 3,
          "title": "客户端的准备和配置",
          "slug": "客户端的准备和配置",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 13.06,
    "words": 3917
  },
  "filePathRelative": "JavaLang/SpringCloud/10-Stream和Sleuth.md"
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
