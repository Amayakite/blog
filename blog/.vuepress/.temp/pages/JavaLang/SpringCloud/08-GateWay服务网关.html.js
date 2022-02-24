export const data = {
  "key": "v-7072ef0d",
  "path": "/JavaLang/SpringCloud/08-GateWay%E6%9C%8D%E5%8A%A1%E7%BD%91%E5%85%B3.html",
  "title": "08-GateWay服务网关",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "08-GateWay服务网关",
    "date": "2022-01-08T12:10:11.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud GateWay",
      "SpringCloud"
    ],
    "summary": "概述 其实本来应该学下Zuul的，但是那玩意分歧比较大（Zuul和Zuul2杂七杂八的瓜） 反正GateWay是它的替代品 Zuul的网站 GateWay的网站 Spring Cloud全家桶中有个很重要的组件就是网关，在1.x版本中使用的都是Zuul网关 但在2.x版本中，Zuul的升级一直跳票，SpringCloud最后自己研发了一个网关替代Zuul 也",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/08-GateWay%E6%9C%8D%E5%8A%A1%E7%BD%91%E5%85%B3.html"
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
          "content": "08-GateWay服务网关"
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
          "content": "Spring Cloud GateWay"
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
          "content": "2022-01-08T12:10:11.000Z"
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
      "title": "Gateway的三大核心概念",
      "slug": "gateway的三大核心概念",
      "children": [
        {
          "level": 3,
          "title": "路由Route",
          "slug": "路由route",
          "children": []
        },
        {
          "level": 3,
          "title": "断言Predicate",
          "slug": "断言predicate",
          "children": []
        },
        {
          "level": 3,
          "title": "过滤Filter",
          "slug": "过滤filter",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "使用",
      "slug": "使用",
      "children": [
        {
          "level": 3,
          "title": "Gateway9527的搭建",
          "slug": "gateway9527的搭建",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Router路由",
      "slug": "router路由",
      "children": [
        {
          "level": 3,
          "title": "配置Route",
          "slug": "配置route",
          "children": []
        },
        {
          "level": 3,
          "title": "启动并测试",
          "slug": "启动并测试",
          "children": []
        },
        {
          "level": 3,
          "title": "关于YAML的说明",
          "slug": "关于yaml的说明",
          "children": []
        },
        {
          "level": 3,
          "title": "GateWay的Router的第二种方式-Bean",
          "slug": "gateway的router的第二种方式-bean",
          "children": []
        },
        {
          "level": 3,
          "title": "通过微服务名配置动态路由",
          "slug": "通过微服务名配置动态路由",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Predicate断言",
      "slug": "predicate断言",
      "children": [
        {
          "level": 3,
          "title": "常用的Predicate",
          "slug": "常用的predicate",
          "children": []
        },
        {
          "level": 3,
          "title": "时间断言",
          "slug": "时间断言",
          "children": []
        },
        {
          "level": 3,
          "title": "Cookie断言",
          "slug": "cookie断言",
          "children": []
        },
        {
          "level": 3,
          "title": "请求头断言",
          "slug": "请求头断言",
          "children": []
        },
        {
          "level": 3,
          "title": "指定的请求方法断言",
          "slug": "指定的请求方法断言",
          "children": []
        },
        {
          "level": 3,
          "title": "指定的rest风格地址断言",
          "slug": "指定的rest风格地址断言",
          "children": []
        },
        {
          "level": 3,
          "title": "指定的请求参数",
          "slug": "指定的请求参数",
          "children": []
        },
        {
          "level": 3,
          "title": "指定的ip地址/Host才能访问",
          "slug": "指定的ip地址-host才能访问",
          "children": []
        },
        {
          "level": 3,
          "title": "设置权重形负载均衡",
          "slug": "设置权重形负载均衡",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Filter过滤器",
      "slug": "filter过滤器",
      "children": [
        {
          "level": 3,
          "title": "生命周期和种类以及内置的过滤器",
          "slug": "生命周期和种类以及内置的过滤器",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义全局过滤器GlobalFilter",
          "slug": "自定义全局过滤器globalfilter",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 15.24,
    "words": 4573
  },
  "filePathRelative": "JavaLang/SpringCloud/08-GateWay服务网关.md"
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
