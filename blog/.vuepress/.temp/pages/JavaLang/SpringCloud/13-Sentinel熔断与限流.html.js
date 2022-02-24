export const data = {
  "key": "v-5bb1dcec",
  "path": "/JavaLang/SpringCloud/13-Sentinel%E7%86%94%E6%96%AD%E4%B8%8E%E9%99%90%E6%B5%81.html",
  "title": "13-Sentinel熔断与限流",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "13-Sentinel熔断与限流",
    "date": "2022-01-11T19:23:22.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Alibaba",
      "Sentinel",
      "SpringCloud"
    ],
    "summary": "概述 官网 中文文档 介绍是：分布式系统的流量防卫兵 一句话概括：Hystrix的阿里版 官方是这样介绍的\r\"Sentinel 具有以下特征:\"\r\"\"\r\"- 丰富的应用场景：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。\"\r\"-",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/13-Sentinel%E7%86%94%E6%96%AD%E4%B8%8E%E9%99%90%E6%B5%81.html"
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
          "content": "13-Sentinel熔断与限流"
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
          "content": "Spring Cloud Alibaba"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Sentinel"
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
          "content": "2022-01-11T19:23:22.000Z"
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
      "title": "基本使用",
      "slug": "基本使用",
      "children": [
        {
          "level": 3,
          "title": "下载安装和运行",
          "slug": "下载安装和运行",
          "children": []
        },
        {
          "level": 3,
          "title": "使用-依赖",
          "slug": "使用-依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "使用-配置",
          "slug": "使用-配置",
          "children": []
        },
        {
          "level": 3,
          "title": "测试",
          "slug": "测试",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "流控规则",
      "slug": "流控规则",
      "children": [
        {
          "level": 3,
          "title": "基本介绍",
          "slug": "基本介绍",
          "children": []
        },
        {
          "level": 3,
          "title": "流控模式-QPS直接失败",
          "slug": "流控模式-qps直接失败",
          "children": []
        },
        {
          "level": 3,
          "title": "流控模式-线程数直接失败",
          "slug": "流控模式-线程数直接失败",
          "children": []
        },
        {
          "level": 3,
          "title": "流控模式-关联",
          "slug": "流控模式-关联",
          "children": []
        },
        {
          "level": 3,
          "title": "流控模式-链路",
          "slug": "流控模式-链路",
          "children": []
        },
        {
          "level": 3,
          "title": "流控-预热(Warm Up削峰填谷)",
          "slug": "流控-预热-warm-up削峰填谷",
          "children": []
        },
        {
          "level": 3,
          "title": "流控-排队等待",
          "slug": "流控-排队等待",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "降级（熔断）规则",
      "slug": "降级-熔断-规则",
      "children": [
        {
          "level": 3,
          "title": "慢调用比例(RT)",
          "slug": "慢调用比例-rt",
          "children": []
        },
        {
          "level": 3,
          "title": "异常比例",
          "slug": "异常比例",
          "children": []
        },
        {
          "level": 3,
          "title": "异常数",
          "slug": "异常数",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "热点规则",
      "slug": "热点规则",
      "children": [
        {
          "level": 3,
          "title": "自定义兜底方法",
          "slug": "自定义兜底方法",
          "children": []
        },
        {
          "level": 3,
          "title": "热点规则-设置",
          "slug": "热点规则-设置",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "系统规则-自适应限流",
      "slug": "系统规则-自适应限流",
      "children": []
    },
    {
      "level": 2,
      "title": "@SentinelResource",
      "slug": "sentinelresource",
      "children": [
        {
          "level": 3,
          "title": "按资源名称进行限流",
          "slug": "按资源名称进行限流",
          "children": []
        },
        {
          "level": 3,
          "title": "按照URL限流",
          "slug": "按照url限流",
          "children": []
        },
        {
          "level": 3,
          "title": "目前兜底方案中的问题",
          "slug": "目前兜底方案中的问题",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义限流处理逻辑",
          "slug": "自定义限流处理逻辑",
          "children": []
        },
        {
          "level": 3,
          "title": "@SentinelResource 参数说明",
          "slug": "sentinelresource-参数说明",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Sentinel整合LoadBalancer和Feign",
      "slug": "sentinel整合loadbalancer和feign",
      "children": [
        {
          "level": 3,
          "title": "工程准备-服务提供者的搭建",
          "slug": "工程准备-服务提供者的搭建",
          "children": []
        },
        {
          "level": 3,
          "title": "消费者80的搭建",
          "slug": "消费者80的搭建",
          "children": []
        },
        {
          "level": 3,
          "title": "✨服务熔断只配置fallback(服务降级-处理自定义异常)",
          "slug": "✨服务熔断只配置fallback-服务降级-处理自定义异常",
          "children": []
        },
        {
          "level": 3,
          "title": "✨只配置BlockHandler(处理sentinel控制台配置违规异常)",
          "slug": "✨只配置blockhandler-处理sentinel控制台配置违规异常",
          "children": []
        },
        {
          "level": 3,
          "title": "目前两种配置方式存在的缺陷",
          "slug": "目前两种配置方式存在的缺陷",
          "children": []
        },
        {
          "level": 3,
          "title": "✨Fallback和BlockHandler都配置",
          "slug": "✨fallback和blockhandler都配置",
          "children": []
        },
        {
          "level": 3,
          "title": "忽略指定的异常",
          "slug": "忽略指定的异常",
          "children": []
        },
        {
          "level": 3,
          "title": "✨使用Fegin来完成服务宕机的熔断处理",
          "slug": "✨使用fegin来完成服务宕机的熔断处理",
          "children": []
        },
        {
          "level": 3,
          "title": "熔断框架比较",
          "slug": "熔断框架比较",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "规则持久化",
      "slug": "规则持久化",
      "children": [
        {
          "level": 3,
          "title": "如何持久化",
          "slug": "如何持久化",
          "children": []
        },
        {
          "level": 3,
          "title": "依赖准备",
          "slug": "依赖准备",
          "children": []
        },
        {
          "level": 3,
          "title": "配置文件",
          "slug": "配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "Nacos控制台配置",
          "slug": "nacos控制台配置",
          "children": []
        },
        {
          "level": 3,
          "title": "测试",
          "slug": "测试-1",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "如何自定义Sentinel-让其自动持久化推送到Nacos",
      "slug": "如何自定义sentinel-让其自动持久化推送到nacos",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 34.13,
    "words": 10240
  },
  "filePathRelative": "JavaLang/SpringCloud/13-Sentinel熔断与限流.md"
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
