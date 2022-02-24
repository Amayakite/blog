export const data = {
  "key": "v-db954014",
  "path": "/JavaLang/SpringBoot/03-Spring_Boot%E6%95%B4%E5%90%88%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE.html",
  "title": "03-Spring_Boot整合数据访问",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "03-Spring_Boot整合数据访问",
    "date": "2021-12-21T15:06:03.000Z",
    "category": [
      "SpringBoot"
    ],
    "tag": [
      "Java",
      "SpringBoot",
      "Jdbc",
      "Mybatis",
      "MybatisPlus"
    ],
    "summary": "概述 首先我们打开官方文档 发现跟操作数据库有关的 全都有一个data 接下来我们要用jdbc 于是看看有哪些jdbc相关的 看到了个名字最短的 应该就是他了 导入依赖 然后可以看到如下内容 貌似少了点什么？ 我们的mysql数据库驱动呢？ 因为官方不知道我们接下来要用哪个数据库.. 所以我们接下里我们要操作什么数据库 就安装什么数据库的驱动即可 如果你用的",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringBoot/03-Spring_Boot%E6%95%B4%E5%90%88%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE.html"
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
          "content": "03-Spring_Boot整合数据访问"
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
          "content": "Java"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "SpringBoot"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Jdbc"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Mybatis"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "MybatisPlus"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-21T15:06:03.000Z"
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
          "title": "导入依赖",
          "slug": "导入依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "分析自动配置",
          "slug": "分析自动配置",
          "children": []
        },
        {
          "level": 3,
          "title": "配置数据源",
          "slug": "配置数据源",
          "children": []
        },
        {
          "level": 3,
          "title": "测试使用",
          "slug": "测试使用",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "使用Druid数据源",
      "slug": "使用druid数据源",
      "children": [
        {
          "level": 3,
          "title": "才用传统方法配置druid",
          "slug": "才用传统方法配置druid",
          "children": []
        },
        {
          "level": 3,
          "title": "通过state方式来使用druid",
          "slug": "通过state方式来使用druid",
          "children": []
        },
        {
          "level": 3,
          "title": "配置druid",
          "slug": "配置druid",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "整合Mybatis",
      "slug": "整合mybatis",
      "children": [
        {
          "level": 3,
          "title": "准备依赖",
          "slug": "准备依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "使用mybatis-配置文件",
          "slug": "使用mybatis-配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "使用mybatis",
          "slug": "使用mybatis",
          "children": []
        },
        {
          "level": 3,
          "title": "整合Mybatis的一些配置（驼峰命名等）",
          "slug": "整合mybatis的一些配置-驼峰命名等",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "整合MybatisPlus",
      "slug": "整合mybatisplus",
      "children": [
        {
          "level": 3,
          "title": "添加依赖",
          "slug": "添加依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "使用Mybatis-Plus",
          "slug": "使用mybatis-plus",
          "children": []
        },
        {
          "level": 3,
          "title": "注解标注表名、字段名等",
          "slug": "注解标注表名、字段名等",
          "children": []
        },
        {
          "level": 3,
          "title": "规范的使用Mybatis-plus",
          "slug": "规范的使用mybatis-plus",
          "children": []
        },
        {
          "level": 3,
          "title": "Mybatis-Plus的分页功能的使用",
          "slug": "mybatis-plus的分页功能的使用",
          "children": []
        },
        {
          "level": 3,
          "title": "扩展-IEDA的MybatisX插件的使用",
          "slug": "扩展-ieda的mybatisx插件的使用",
          "children": []
        },
        {
          "level": 3,
          "title": "扩展-Junit5的额外注解",
          "slug": "扩展-junit5的额外注解",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 19.81,
    "words": 5943
  },
  "filePathRelative": "JavaLang/SpringBoot/03-Spring_Boot整合数据访问.md"
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
