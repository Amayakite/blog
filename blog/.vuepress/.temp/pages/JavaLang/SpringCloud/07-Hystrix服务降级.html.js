export const data = {
  "key": "v-589b90d6",
  "path": "/JavaLang/SpringCloud/07-Hystrix%E6%9C%8D%E5%8A%A1%E9%99%8D%E7%BA%A7.html",
  "title": "07-Hystrix服务降级",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "07-Hystrix服务降级",
    "date": "2022-01-07T15:38:30.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Hystrix",
      "SpringCloud"
    ],
    "summary": "概述 我们在分布式系统中难免会遇到如下问题 复杂的分布式体系结构中的应用由数十个依赖关系，每个依赖关系在某些时候不可避免的失败 服务雪崩警告 emm说人话吧\r\" 假设我们在服务调用的时候，A调用B，B调用C，如果C垮了，那么全员GG\"\r\"\"\r\" ABCD的调用也被称为扇出效应，如果扇出的链路上某个微服务响应时间过长或者不可用，对微服务A的调用就会占用越来越多",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/07-Hystrix%E6%9C%8D%E5%8A%A1%E9%99%8D%E7%BA%A7.html"
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
          "content": "07-Hystrix服务降级"
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
          "content": "Spring Cloud Hystrix"
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
          "content": "2022-01-07T15:38:30.000Z"
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
      "title": "Hystrix的重要概念",
      "slug": "hystrix的重要概念",
      "children": [
        {
          "level": 3,
          "title": "服务降级",
          "slug": "服务降级",
          "children": []
        },
        {
          "level": 3,
          "title": "服务熔断",
          "slug": "服务熔断",
          "children": []
        },
        {
          "level": 3,
          "title": "服务限流",
          "slug": "服务限流",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "准备工作",
      "slug": "准备工作",
      "children": [
        {
          "level": 3,
          "title": "新建一个8001的依赖",
          "slug": "新建一个8001的依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "配置文件、service、controller、main的准备",
          "slug": "配置文件、service、controller、main的准备",
          "children": []
        },
        {
          "level": 3,
          "title": "高并发测试Jemeter",
          "slug": "高并发测试jemeter",
          "children": []
        },
        {
          "level": 3,
          "title": "80消费者加入",
          "slug": "_80消费者加入",
          "children": []
        },
        {
          "level": 3,
          "title": "二者一起测试",
          "slug": "二者一起测试",
          "children": []
        },
        {
          "level": 3,
          "title": "解决问题",
          "slug": "解决问题",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务降级",
      "slug": "服务降级-1",
      "children": [
        {
          "level": 3,
          "title": "基本使用",
          "slug": "基本使用",
          "children": []
        },
        {
          "level": 3,
          "title": "应用到80端",
          "slug": "应用到80端",
          "children": []
        },
        {
          "level": 3,
          "title": "全局服务降级",
          "slug": "全局服务降级",
          "children": []
        },
        {
          "level": 3,
          "title": "使用更优雅的通配进行服务降级",
          "slug": "使用更优雅的通配进行服务降级",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务熔断",
      "slug": "服务熔断-1",
      "children": [
        {
          "level": 3,
          "title": "基本概念（重要）",
          "slug": "基本概念-重要",
          "children": []
        },
        {
          "level": 3,
          "title": "使用",
          "slug": "使用",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务限流",
      "slug": "服务限流-1",
      "children": []
    },
    {
      "level": 2,
      "title": "服务监控仪表盘",
      "slug": "服务监控仪表盘",
      "children": [
        {
          "level": 3,
          "title": "搭建",
          "slug": "搭建",
          "children": []
        },
        {
          "level": 3,
          "title": "使用",
          "slug": "使用-1",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 18.45,
    "words": 5536
  },
  "filePathRelative": "JavaLang/SpringCloud/07-Hystrix服务降级.md"
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
