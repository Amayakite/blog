export const data = {
  "key": "v-3993bcd5",
  "path": "/JavaLang/SpringCloud/12-Nacos%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E5%92%8C%E9%85%8D%E7%BD%AE%E4%B8%AD%E5%BF%83.html",
  "title": "12-Nacos服务注册和配置中心",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "12-Nacos服务注册和配置中心",
    "date": "2022-01-10T14:25:10.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Alibaba",
      "Nacos",
      "SpringCloud"
    ],
    "summary": "概述 见名知意 首先是服务注册，我们首先想到的就是Eureka、Zookeeper、Consul 其次是配置中心，我们想到了Spring Cloud Config和Spring Cloud Bus 它就是来替代如上六位的\r\" Nacos（Naming Configuration Service）\"\r\"\"\r\" 一个更易于构建云原生应用的动态服务发现、配置管理和",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/12-Nacos%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E5%92%8C%E9%85%8D%E7%BD%AE%E4%B8%AD%E5%BF%83.html"
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
          "content": "12-Nacos服务注册和配置中心"
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
          "content": "Nacos"
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
          "content": "2022-01-10T14:25:10.000Z"
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
      "title": "安装和运行Nacos",
      "slug": "安装和运行nacos",
      "children": []
    },
    {
      "level": 2,
      "title": "服务提供者注册",
      "slug": "服务提供者注册",
      "children": [
        {
          "level": 3,
          "title": "父pom依赖准备",
          "slug": "父pom依赖准备",
          "children": []
        },
        {
          "level": 3,
          "title": "子项目9001搭建",
          "slug": "子项目9001搭建",
          "children": []
        },
        {
          "level": 3,
          "title": "服务提供者9002的快速构建",
          "slug": "服务提供者9002的快速构建",
          "children": []
        },
        {
          "level": 3,
          "title": "服务消费者80",
          "slug": "服务消费者80",
          "children": []
        },
        {
          "level": 3,
          "title": "负载均衡遇到的坑",
          "slug": "负载均衡遇到的坑",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Nacos服务中心对比提升",
      "slug": "nacos服务中心对比提升",
      "children": []
    },
    {
      "level": 2,
      "title": "Nacos作为配置中心-基础配置",
      "slug": "nacos作为配置中心-基础配置",
      "children": [
        {
          "level": 3,
          "title": "依赖准备",
          "slug": "依赖准备",
          "children": []
        },
        {
          "level": 3,
          "title": "配置文件和对应类",
          "slug": "配置文件和对应类",
          "children": []
        },
        {
          "level": 3,
          "title": "编辑启动配置",
          "slug": "编辑启动配置",
          "children": []
        },
        {
          "level": 3,
          "title": "如果无法正常的获取到配置中心的内容",
          "slug": "如果无法正常的获取到配置中心的内容",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Nacos作为配置中心-分类配置",
      "slug": "nacos作为配置中心-分类配置",
      "children": [
        {
          "level": 3,
          "title": "概念引出",
          "slug": "概念引出",
          "children": []
        },
        {
          "level": 3,
          "title": "DataID的方案",
          "slug": "dataid的方案",
          "children": []
        },
        {
          "level": 3,
          "title": "Group方案",
          "slug": "group方案",
          "children": []
        },
        {
          "level": 3,
          "title": "Namespace方案",
          "slug": "namespace方案",
          "children": []
        },
        {
          "level": 3,
          "title": "总结分类配置",
          "slug": "总结分类配置",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨Nacos集群和持久化",
      "slug": "✨nacos集群和持久化",
      "children": [
        {
          "level": 3,
          "title": "持久化的数据库配置",
          "slug": "持久化的数据库配置",
          "children": []
        },
        {
          "level": 3,
          "title": "集群搭建-下载nacos",
          "slug": "集群搭建-下载nacos",
          "children": []
        },
        {
          "level": 3,
          "title": "集群搭建-配置nacos",
          "slug": "集群搭建-配置nacos",
          "children": []
        },
        {
          "level": 3,
          "title": "Docker-集群搭建",
          "slug": "docker-集群搭建",
          "children": []
        },
        {
          "level": 3,
          "title": "Nginx配置",
          "slug": "nginx配置",
          "children": []
        },
        {
          "level": 3,
          "title": "连接集群的Nacos",
          "slug": "连接集群的nacos",
          "children": []
        },
        {
          "level": 3,
          "title": "集群搭建总结",
          "slug": "集群搭建总结",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 30.41,
    "words": 9122
  },
  "filePathRelative": "JavaLang/SpringCloud/12-Nacos服务注册和配置中心.md"
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
