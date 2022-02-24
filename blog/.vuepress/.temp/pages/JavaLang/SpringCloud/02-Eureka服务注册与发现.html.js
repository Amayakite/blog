export const data = {
  "key": "v-336eb216",
  "path": "/JavaLang/SpringCloud/02-Eureka%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0.html",
  "title": "02-Eureka服务注册与发现",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "02-Eureka服务注册与发现",
    "date": "2022-01-03T19:37:20.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "SpringCloud",
      "Spring Cloud Eureka"
    ],
    "summary": "什么是服务治理 SpringCloud封装了Netfix公司开发的Eureka来实现服务治理 在传统的RPC远程调用框架内，管理每个服务与服务之间的依赖关系比较复杂，管理比较复杂，所以需要使用服务治理，管理服务与服务之间的依赖关系，可以实现服务调用，负载均衡，容错等，实现服务发现与注册 说穿了就是，N多个消费者和N多个服务提供者，你找我我找你的非常麻烦，我们",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/02-Eureka%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0.html"
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
          "content": "02-Eureka服务注册与发现"
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
          "content": "SpringCloud"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Spring Cloud Eureka"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-01-03T19:37:20.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "什么是服务治理",
      "slug": "什么是服务治理",
      "children": []
    },
    {
      "level": 2,
      "title": "单机Eureka构建步骤",
      "slug": "单机eureka构建步骤",
      "children": [
        {
          "level": 3,
          "title": "创建工程并添加依赖",
          "slug": "创建工程并添加依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "配置spring boot",
          "slug": "配置spring-boot",
          "children": []
        },
        {
          "level": 3,
          "title": "启动并测试",
          "slug": "启动并测试",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "将8001注册到7001内",
      "slug": "将8001注册到7001内",
      "children": [
        {
          "level": 3,
          "title": "添加依赖",
          "slug": "添加依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "配置application",
          "slug": "配置application",
          "children": []
        },
        {
          "level": 3,
          "title": "启动并测试",
          "slug": "启动并测试-1",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "将80注册到7001",
      "slug": "将80注册到7001",
      "children": []
    },
    {
      "level": 2,
      "title": "Eureka集群",
      "slug": "eureka集群",
      "children": [
        {
          "level": 3,
          "title": "创建7002",
          "slug": "创建7002",
          "children": []
        },
        {
          "level": 3,
          "title": "修改配置并启动",
          "slug": "修改配置并启动",
          "children": []
        },
        {
          "level": 3,
          "title": "将80服务和8001服务分别注册进进群Eureka集群内",
          "slug": "将80服务和8001服务分别注册进进群eureka集群内",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "支付微服务（8001）集群设置",
      "slug": "支付微服务-8001-集群设置",
      "children": [
        {
          "level": 3,
          "title": "配置文件",
          "slug": "配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "验证微服务集群",
          "slug": "验证微服务集群",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "一些额外的配置",
      "slug": "一些额外的配置",
      "children": [
        {
          "level": 3,
          "title": "主机名称和服务名称的修改",
          "slug": "主机名称和服务名称的修改",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务发现Discovery",
      "slug": "服务发现discovery",
      "children": []
    },
    {
      "level": 2,
      "title": "Eureka的保护模式",
      "slug": "eureka的保护模式",
      "children": [
        {
          "level": 3,
          "title": "禁止自我保护",
          "slug": "禁止自我保护",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 19.13,
    "words": 5740
  },
  "filePathRelative": "JavaLang/SpringCloud/02-Eureka服务注册与发现.md"
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
