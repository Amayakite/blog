export const data = {
  "key": "v-c1fe1740",
  "path": "/JavaLang/SpringCloud/14-Seata%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1.html",
  "title": "14-Seata分布式事务",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "14-Seata分布式事务",
    "date": "2022-01-12T22:07:51.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Alibaba",
      "Seata",
      "SpringCloud"
    ],
    "summary": "概述 这玩意我在使用的时候经历了一天的在配置上找BUG，如此感叹：不愧是马云家的玩意儿！对于其配置的怪异程度远远超出了我的想象 我们实际上使用数据库不单单是一对一，还有可能 一对一，一对多，多对多之间的数据同步性 这就是分布式事务（单机没有这种问题） 为此，就要用到阿里开发的Seata了 官网： 在正式开始前，有几个术语需要了解下 1. Translatio",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/14-Seata%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1.html"
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
          "content": "14-Seata分布式事务"
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
          "content": "Seata"
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
          "content": "2022-01-12T22:07:51.000Z"
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
      "title": "Seata的下载和安装",
      "slug": "seata的下载和安装",
      "children": [
        {
          "level": 3,
          "title": "下载",
          "slug": "下载",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Seata-Server的配置及启动",
      "slug": "seata-server的配置及启动",
      "children": [
        {
          "level": 3,
          "title": "相关SQL脚本的链接",
          "slug": "相关sql脚本的链接",
          "children": []
        },
        {
          "level": 3,
          "title": "registry.conf",
          "slug": "registry-conf",
          "children": []
        },
        {
          "level": 3,
          "title": "config.conf",
          "slug": "config-conf",
          "children": []
        },
        {
          "level": 3,
          "title": "导入脚本到sql、配置nacos",
          "slug": "导入脚本到sql、配置nacos",
          "children": []
        },
        {
          "level": 3,
          "title": "配置脚本导入数据到nacos",
          "slug": "配置脚本导入数据到nacos",
          "children": []
        },
        {
          "level": 3,
          "title": "启动Seata",
          "slug": "启动seata",
          "children": []
        },
        {
          "level": 3,
          "title": "使用本地文件和使用Nacos内容的区别",
          "slug": "使用本地文件和使用nacos内容的区别",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Seata的分布式事务解决方案",
      "slug": "seata的分布式事务解决方案",
      "children": [
        {
          "level": 3,
          "title": "订单、库存、账户数据库的准备",
          "slug": "订单、库存、账户数据库的准备",
          "children": []
        },
        {
          "level": 3,
          "title": "业务需求梳理",
          "slug": "业务需求梳理",
          "children": []
        },
        {
          "level": 3,
          "title": "公共模块",
          "slug": "公共模块",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "相关模块的准备",
      "slug": "相关模块的准备",
      "children": [
        {
          "level": 3,
          "title": "依赖引入",
          "slug": "依赖引入",
          "children": []
        },
        {
          "level": 3,
          "title": "配置文件的准备",
          "slug": "配置文件的准备",
          "children": []
        },
        {
          "level": 3,
          "title": "准备对应的Mapper",
          "slug": "准备对应的mapper",
          "children": []
        },
        {
          "level": 3,
          "title": "准备Service",
          "slug": "准备service",
          "children": []
        },
        {
          "level": 3,
          "title": "取消数据库自动配置-自定义数据库代理配置",
          "slug": "取消数据库自动配置-自定义数据库代理配置",
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
      "title": "使用@GlobalTransaction解决问题",
      "slug": "使用-globaltransaction解决问题",
      "children": []
    },
    {
      "level": 2,
      "title": "简单的原理解析",
      "slug": "简单的原理解析",
      "children": [
        {
          "level": 3,
          "title": "基本流程",
          "slug": "基本流程",
          "children": []
        },
        {
          "level": 3,
          "title": "AT模式",
          "slug": "at模式",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 29.29,
    "words": 8788
  },
  "filePathRelative": "JavaLang/SpringCloud/14-Seata分布式事务.md"
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
