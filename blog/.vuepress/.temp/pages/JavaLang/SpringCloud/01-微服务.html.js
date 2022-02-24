export const data = {
  "key": "v-67187a7e",
  "path": "/JavaLang/SpringCloud/01-%E5%BE%AE%E6%9C%8D%E5%8A%A1.html",
  "title": "01-微服务",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "01-微服务",
    "date": "2022-01-02T18:31:06.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "SpringCloud"
    ],
    "summary": "概述 这是Java中和多线程一样让人头秃的东西 微服务是一种加加购模式 它提倡将单一应用程序划分成一组小的服务，服务之间互相协调，互相配合，为用户提供最终价值 每个服务运行在其独立的进程中，服务与服务间才用轻量级的通信机制互相协作（通常是基于Http或者RestFul API） 每个服务都围绕着具体一个服务而言，应根据业务上下文，选择合适的语言、工具对齐进行",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/01-%E5%BE%AE%E6%9C%8D%E5%8A%A1.html"
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
          "content": "01-微服务"
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
          "property": "article:published_time",
          "content": "2022-01-02T18:31:06.000Z"
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
      "children": [
        {
          "level": 3,
          "title": "关于SpringCloud版本的选择",
          "slug": "关于springcloud版本的选择",
          "children": []
        },
        {
          "level": 3,
          "title": "更具体的依赖选型",
          "slug": "更具体的依赖选型",
          "children": []
        },
        {
          "level": 3,
          "title": "Cloud内停用的组件",
          "slug": "cloud内停用的组件",
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
          "title": "添加总依赖",
          "slug": "添加总依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "创建子项目，并添加依赖",
          "slug": "创建子项目-并添加依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "准备数据库",
          "slug": "准备数据库",
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
          "title": "准备返回值统一类-ResponseResult",
          "slug": "准备返回值统一类-responseresult",
          "children": []
        },
        {
          "level": 3,
          "title": "准备接口并测试",
          "slug": "准备接口并测试",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "扩展-使用swagger替代PostMan",
      "slug": "扩展-使用swagger替代postman",
      "children": [
        {
          "level": 3,
          "title": "添加依赖和简单使用",
          "slug": "添加依赖和简单使用",
          "children": []
        },
        {
          "level": 3,
          "title": "Docket的配置一览",
          "slug": "docket的配置一览",
          "children": []
        },
        {
          "level": 3,
          "title": "配置API文档",
          "slug": "配置api文档",
          "children": []
        },
        {
          "level": 3,
          "title": "生产环境下关闭",
          "slug": "生产环境下关闭",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "准备工作2-消费者",
      "slug": "准备工作2-消费者",
      "children": [
        {
          "level": 3,
          "title": "使用RestTemplate来完成两个进程的沟通",
          "slug": "使用resttemplate来完成两个进程的沟通",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "目前项目中的问题及解决",
      "slug": "目前项目中的问题及解决",
      "children": [
        {
          "level": 3,
          "title": "最终pom文件",
          "slug": "最终pom文件",
          "children": []
        },
        {
          "level": 3,
          "title": "准备工作-结束",
          "slug": "准备工作-结束",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 19.8,
    "words": 5939
  },
  "filePathRelative": "JavaLang/SpringCloud/01-微服务.md"
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
