export const data = {
  "key": "v-3224c299",
  "path": "/JavaLang/SpringCloud/21-Spring%E6%93%8D%E4%BD%9CRabbitMQ.html",
  "title": "21-Spring操作RabbitMQ",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "21-Spring操作RabbitMQ",
    "date": "2022-02-05T18:41:23.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "RabbitMQ",
      "SpringBoot"
    ],
    "summary": "概述 使用RabbitMQ的核心原则是：为了防止我们的服务被超多的并发冲跨，所以说让Rabbitmq来处理缓冲这些内容 rabbitmq的消息接受在SpringBoot中是串行的（不是并行），执行完一个消息处理后才能接着处理下一个 依赖 配置 主类需要的东西 创建交换机、队列、队列和交换机之间的绑定 发送消息 配置序列化方式 默认我也不知道是啥，这里可以换成",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/21-Spring%E6%93%8D%E4%BD%9CRabbitMQ.html"
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
          "content": "21-Spring操作RabbitMQ"
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
          "content": "RabbitMQ"
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
          "content": "2022-02-05T18:41:23.000Z"
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
      "title": "依赖",
      "slug": "依赖",
      "children": []
    },
    {
      "level": 2,
      "title": "配置",
      "slug": "配置",
      "children": []
    },
    {
      "level": 2,
      "title": "主类需要的东西",
      "slug": "主类需要的东西",
      "children": []
    },
    {
      "level": 2,
      "title": "创建交换机、队列、队列和交换机之间的绑定",
      "slug": "创建交换机、队列、队列和交换机之间的绑定",
      "children": []
    },
    {
      "level": 2,
      "title": "发送消息",
      "slug": "发送消息",
      "children": []
    },
    {
      "level": 2,
      "title": "配置序列化方式",
      "slug": "配置序列化方式",
      "children": []
    },
    {
      "level": 2,
      "title": "接收消息",
      "slug": "接收消息",
      "children": []
    },
    {
      "level": 2,
      "title": "@RabbitListener和@RabbitHandler",
      "slug": "rabbitlistener和-rabbithandler",
      "children": []
    },
    {
      "level": 2,
      "title": "消息确认机制",
      "slug": "消息确认机制",
      "children": []
    },
    {
      "level": 2,
      "title": "可靠投递",
      "slug": "可靠投递",
      "children": []
    },
    {
      "level": 2,
      "title": "可靠抵达",
      "slug": "可靠抵达",
      "children": []
    },
    {
      "level": 2,
      "title": "可靠接收-手动确认",
      "slug": "可靠接收-手动确认",
      "children": []
    },
    {
      "level": 2,
      "title": "延时队列",
      "slug": "延时队列",
      "children": []
    },
    {
      "level": 2,
      "title": "通过注解方式来完成延时队列",
      "slug": "通过注解方式来完成延时队列",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 9.29,
    "words": 2786
  },
  "filePathRelative": "JavaLang/SpringCloud/21-Spring操作RabbitMQ.md"
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
