export const data = {
  "key": "v-1646c967",
  "path": "/JavaLang/SpringCloud/09-Config%E5%92%8CBus.html",
  "title": "09-Config和Bus-服务配置和服务总线",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "09-Config和Bus-服务配置和服务总线",
    "date": "2022-01-08T12:10:11.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Config",
      "Spring Cloud Bus",
      "SpringCloud"
    ],
    "summary": "Config概述 Spring Cloud Config是做服务配置的，Bus则是做服务总线的，他们两都做的非常好，但奈何阿里巴巴的Nacos太过强大..几乎垄断了半壁江山 在开始之前，我们先看看目前分布式系统中存在的问题 不知不觉已经这么多了啊…. 不知道你有没有注意到，我们的每个工程内都有application.yaml 虽然说东西并不多，但是每个都写起",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/09-Config%E5%92%8CBus.html"
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
          "content": "09-Config和Bus-服务配置和服务总线"
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
          "content": "Spring Cloud Config"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Spring Cloud Bus"
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
      "title": "Config概述",
      "slug": "config概述",
      "children": []
    },
    {
      "level": 2,
      "title": "简单使用Config",
      "slug": "简单使用config",
      "children": [
        {
          "level": 3,
          "title": "前期准备",
          "slug": "前期准备",
          "children": []
        },
        {
          "level": 3,
          "title": "配置中心的创建",
          "slug": "配置中心的创建",
          "children": []
        },
        {
          "level": 3,
          "title": "配置中心使用",
          "slug": "配置中心使用",
          "children": []
        },
        {
          "level": 3,
          "title": "客户端的搭建-依赖",
          "slug": "客户端的搭建-依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "配置文件-Bootstrap.yml",
          "slug": "配置文件-bootstrap-yml",
          "children": []
        },
        {
          "level": 3,
          "title": "编写启动类、controller并测试",
          "slug": "编写启动类、controller并测试",
          "children": []
        },
        {
          "level": 3,
          "title": "手动实现动态更新",
          "slug": "手动实现动态更新",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Bus概述",
      "slug": "bus概述",
      "children": [
        {
          "level": 3,
          "title": "刷新的两种方式",
          "slug": "刷新的两种方式",
          "children": []
        },
        {
          "level": 3,
          "title": "服务总线依赖添加",
          "slug": "服务总线依赖添加",
          "children": []
        },
        {
          "level": 3,
          "title": "修改配置文件",
          "slug": "修改配置文件",
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
          "title": "Bus动态刷新-定点通知",
          "slug": "bus动态刷新-定点通知",
          "children": []
        },
        {
          "level": 3,
          "title": "总线总结",
          "slug": "总线总结",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 13.69,
    "words": 4106
  },
  "filePathRelative": "JavaLang/SpringCloud/09-Config和Bus.md"
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
