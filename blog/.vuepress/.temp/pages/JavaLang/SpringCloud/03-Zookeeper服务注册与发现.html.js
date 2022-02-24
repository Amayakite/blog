export const data = {
  "key": "v-3250b324",
  "path": "/JavaLang/SpringCloud/03-Zookeeper%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0.html",
  "title": "03-Zookeeper服务注册与发现",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "03-Zookeeper服务注册与发现",
    "date": "2022-01-04T13:46:30.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Zookeeper",
      "SpringCloud"
    ],
    "summary": "关于Eureka停止更新 我们之前的1.x是一个长期维护的版本，但非常遗憾的是Eureka的2.x已经是停止更新了 所以这玩意目前来说不推荐使用 所以SpringCloud整合了Zookeeper来替换Eureka 要用这个玩意，我们得先去学下Zookeeper 好！又一个中间件 Zookeeper概述 开源的分布式的，为分布式框架提供协调服务的Apache",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/03-Zookeeper%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0.html"
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
          "content": "03-Zookeeper服务注册与发现"
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
          "content": "Spring Cloud Zookeeper"
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
          "content": "2022-01-04T13:46:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "关于Eureka停止更新",
      "slug": "关于eureka停止更新",
      "children": []
    },
    {
      "level": 2,
      "title": "Zookeeper概述",
      "slug": "zookeeper概述",
      "children": [
        {
          "level": 3,
          "title": "Zookeeper的特点",
          "slug": "zookeeper的特点",
          "children": []
        },
        {
          "level": 3,
          "title": "Zookeeper的数据结构",
          "slug": "zookeeper的数据结构",
          "children": []
        },
        {
          "level": 3,
          "title": "应用场景",
          "slug": "应用场景",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Zookeeper的下载和安装",
      "slug": "zookeeper的下载和安装",
      "children": [
        {
          "level": 3,
          "title": "基本的Linux下载安装操作",
          "slug": "基本的linux下载安装操作",
          "children": []
        },
        {
          "level": 3,
          "title": "Zookeeper的相关参数解读",
          "slug": "zookeeper的相关参数解读",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "集群的安装",
      "slug": "集群的安装",
      "children": []
    },
    {
      "level": 2,
      "title": "Zookeeper的选举机制",
      "slug": "zookeeper的选举机制",
      "children": [
        {
          "level": 3,
          "title": "服务器刚刚启动的时候",
          "slug": "服务器刚刚启动的时候",
          "children": []
        },
        {
          "level": 3,
          "title": "非第一次启动",
          "slug": "非第一次启动",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "客户端命令行操作",
      "slug": "客户端命令行操作",
      "children": [
        {
          "level": 3,
          "title": "基本语法",
          "slug": "基本语法",
          "children": []
        },
        {
          "level": 3,
          "title": "节点的基本操作和节点类型",
          "slug": "节点的基本操作和节点类型",
          "children": []
        },
        {
          "level": 3,
          "title": "监听器",
          "slug": "监听器",
          "children": []
        },
        {
          "level": 3,
          "title": "节点的删除以及查看",
          "slug": "节点的删除以及查看",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Java-基本Api操作",
      "slug": "java-基本api操作",
      "children": [
        {
          "level": 3,
          "title": "安装依赖",
          "slug": "安装依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "创建数据",
          "slug": "创建数据",
          "children": []
        },
        {
          "level": 3,
          "title": "监听节点变化",
          "slug": "监听节点变化",
          "children": []
        },
        {
          "level": 3,
          "title": "判断节点是否存在",
          "slug": "判断节点是否存在",
          "children": []
        },
        {
          "level": 3,
          "title": "写入原理",
          "slug": "写入原理",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务动态上下线",
      "slug": "服务动态上下线",
      "children": []
    },
    {
      "level": 2,
      "title": "Zookeeper分布式锁",
      "slug": "zookeeper分布式锁",
      "children": [
        {
          "level": 3,
          "title": "Curator框架实现分布式锁案例",
          "slug": "curator框架实现分布式锁案例",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Zookeeper应用到我们当前的分布式项目内",
      "slug": "zookeeper应用到我们当前的分布式项目内",
      "children": [
        {
          "level": 3,
          "title": "构建项目-服务提供者",
          "slug": "构建项目-服务提供者",
          "children": []
        },
        {
          "level": 3,
          "title": "编写配置文件",
          "slug": "编写配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "编写main和controller",
          "slug": "编写main和controller",
          "children": []
        },
        {
          "level": 3,
          "title": "运行",
          "slug": "运行",
          "children": []
        },
        {
          "level": 3,
          "title": "可能遇到的问题",
          "slug": "可能遇到的问题",
          "children": []
        },
        {
          "level": 3,
          "title": "它是临时节点还是持久节点？",
          "slug": "它是临时节点还是持久节点",
          "children": []
        },
        {
          "level": 3,
          "title": "构建服务-消费者",
          "slug": "构建服务-消费者",
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
          "title": "main和restTemplate",
          "slug": "main和resttemplate",
          "children": []
        },
        {
          "level": 3,
          "title": "controller",
          "slug": "controller",
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
      "title": "Zookeeper的结束语",
      "slug": "zookeeper的结束语",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 21.39,
    "words": 6417
  },
  "filePathRelative": "JavaLang/SpringCloud/03-Zookeeper服务注册与发现.md"
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
