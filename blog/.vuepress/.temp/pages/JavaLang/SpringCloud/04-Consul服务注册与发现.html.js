export const data = {
  "key": "v-5a1cc93a",
  "path": "/JavaLang/SpringCloud/04-Consul%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0.html",
  "title": "04-Consul服务注册与发现",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "04-Consul服务注册与发现",
    "date": "2022-01-06T16:01:03.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Consul",
      "SpringCloud"
    ],
    "summary": "简介 这玩意可以跳过，Consul公司貌似之前发过公告，国内使用必须要官方授权还是啥的，具体的可以百度 简单了解下即可 不过，美国人都在用它（百分之七十以上的企业） 官网不错，是拿go语言写的 Zookeeper用的比较少（可能银行之类的用的多） 提供了微服务系统中的服务治理、配置中心、控制总线等功能，这些功能中的每个都可以根据需求单独使用，也可以一起构建全",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/04-Consul%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0.html"
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
          "content": "04-Consul服务注册与发现"
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
          "content": "Spring Cloud Consul"
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
          "content": "2022-01-06T16:01:03.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "简介",
      "slug": "简介",
      "children": [
        {
          "level": 3,
          "title": "安装",
          "slug": "安装",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "通过SpringCloud使用",
      "slug": "通过springcloud使用",
      "children": [
        {
          "level": 3,
          "title": "服务提供方8004的依赖准备",
          "slug": "服务提供方8004的依赖准备",
          "children": []
        },
        {
          "level": 3,
          "title": "配置文件和主启动类和Controller",
          "slug": "配置文件和主启动类和controller",
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
          "title": "客户端80的依赖准备",
          "slug": "客户端80的依赖准备",
          "children": []
        },
        {
          "level": 3,
          "title": "配置文件和main以及restTemplate和Controller",
          "slug": "配置文件和main以及resttemplate和controller",
          "children": []
        },
        {
          "level": 3,
          "title": "测试",
          "slug": "测试",
          "children": []
        },
        {
          "level": 3,
          "title": "如果用docker之类的配置出现问题",
          "slug": "如果用docker之类的配置出现问题",
          "children": []
        },
        {
          "level": 3,
          "title": "多个相同服务之间的别名区分",
          "slug": "多个相同服务之间的别名区分",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "三个注册中心的相同点（CAP）",
      "slug": "三个注册中心的相同点-cap",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 5.07,
    "words": 1521
  },
  "filePathRelative": "JavaLang/SpringCloud/04-Consul服务注册与发现.md"
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
