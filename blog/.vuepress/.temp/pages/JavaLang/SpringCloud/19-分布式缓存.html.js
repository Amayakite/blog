export const data = {
  "key": "v-09a6c835",
  "path": "/JavaLang/SpringCloud/19-%E5%88%86%E5%B8%83%E5%BC%8F%E7%BC%93%E5%AD%98.html",
  "title": "19-分布式缓存",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "19-分布式缓存",
    "date": "2022-02-01T21:50:05.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "分布式缓存",
      "Redis",
      "Redisson",
      "SpringCache"
    ],
    "summary": "概述 需求非常简单 也就是为了解决mysql之类的查询速度太慢的问题，所以加了一层缓存中间件 使用前一定要确保，当前需要缓存的数据对数据一致性不高 最简单的缓存方式是map 流程： 当然这只是针对单体应用，如果是分布式应用，就会出现如下的问题\r三次都要查询数据库; \r数据进行了修改，无法正确同步数据; 简单使用Redis-依赖和配置 然后配置下对应的内容，直",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/19-%E5%88%86%E5%B8%83%E5%BC%8F%E7%BC%93%E5%AD%98.html"
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
          "content": "19-分布式缓存"
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
          "content": "分布式缓存"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Redis"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Redisson"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "SpringCache"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-02-01T21:50:05.000Z"
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
          "title": "简单使用Redis-依赖和配置",
          "slug": "简单使用redis-依赖和配置",
          "children": []
        },
        {
          "level": 3,
          "title": "简单的存储和查询",
          "slug": "简单的存储和查询",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "实现一个业务并测试",
      "slug": "实现一个业务并测试",
      "children": [
        {
          "level": 3,
          "title": "较老版本中SpringBoot整合Redis可能会遇到的问题",
          "slug": "较老版本中springboot整合redis可能会遇到的问题",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "缓存穿透、雪崩、击穿",
      "slug": "缓存穿透、雪崩、击穿",
      "children": [
        {
          "level": 3,
          "title": "解决方案汇总",
          "slug": "解决方案汇总",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "加锁解决缓存击穿的问题",
      "slug": "加锁解决缓存击穿的问题",
      "children": [
        {
          "level": 3,
          "title": "Redis的特性",
          "slug": "redis的特性",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "更专业的工具-Redisson",
      "slug": "更专业的工具-redisson",
      "children": [
        {
          "level": 3,
          "title": "基本使用-依赖和配置",
          "slug": "基本使用-依赖和配置",
          "children": []
        },
        {
          "level": 3,
          "title": "使用可重入锁",
          "slug": "使用可重入锁",
          "children": []
        },
        {
          "level": 3,
          "title": "读写锁",
          "slug": "读写锁",
          "children": []
        },
        {
          "level": 3,
          "title": "信号量",
          "slug": "信号量",
          "children": []
        },
        {
          "level": 3,
          "title": "闭锁CountDownLatch",
          "slug": "闭锁countdownlatch",
          "children": []
        },
        {
          "level": 3,
          "title": "关于如何缓存",
          "slug": "关于如何缓存",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Spring-Cache",
      "slug": "spring-cache",
      "children": [
        {
          "level": 3,
          "title": "安装和配置",
          "slug": "安装和配置",
          "children": []
        },
        {
          "level": 3,
          "title": "缓存的基本使用",
          "slug": "缓存的基本使用",
          "children": []
        },
        {
          "level": 3,
          "title": "@Cacheable细节",
          "slug": "cacheable细节",
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
          "title": "自定义缓存value",
          "slug": "自定义缓存value",
          "children": []
        },
        {
          "level": 3,
          "title": "@CacheEvict清除缓存，CachePut更新缓存",
          "slug": "cacheevict清除缓存-cacheput更新缓存",
          "children": []
        },
        {
          "level": 3,
          "title": "@Caching",
          "slug": "caching",
          "children": []
        },
        {
          "level": 3,
          "title": "SpringCache的不足和缓存击穿的解决",
          "slug": "springcache的不足和缓存击穿的解决",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 18.49,
    "words": 5546
  },
  "filePathRelative": "JavaLang/SpringCloud/19-分布式缓存.md"
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
