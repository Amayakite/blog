export const data = {
  "key": "v-3b4739e2",
  "path": "/JavaLang/SpringCloud/14-1-Seata%E9%83%A8%E7%BD%B2%E5%85%A8%E6%B5%81%E7%A8%8B.html",
  "title": "14-1-Seata部署全流程",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "14-1-Seata部署全流程",
    "date": "2022-01-14T12:13:30.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Alibaba",
      "Seata"
    ],
    "summary": "先说总结 除非万不得已，不然千万别用本地配置..非常多的BUG 数据库准备（服务端） 服务端搭建(Server)-本地 虽然是本地，但是通讯还是要用到Nacos registry.conf file.conf 服务端搭建(Server)-Nacos registry.conf 文件上传到Nacos的脚本 因为官方的有问题，所以用这一版的 上传的内容准备 数据",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/14-1-Seata%E9%83%A8%E7%BD%B2%E5%85%A8%E6%B5%81%E7%A8%8B.html"
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
          "content": "14-1-Seata部署全流程"
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
          "property": "article:published_time",
          "content": "2022-01-14T12:13:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "先说总结",
      "slug": "先说总结",
      "children": []
    },
    {
      "level": 2,
      "title": "数据库准备（服务端）",
      "slug": "数据库准备-服务端",
      "children": []
    },
    {
      "level": 2,
      "title": "服务端搭建(Server)-本地",
      "slug": "服务端搭建-server-本地",
      "children": [
        {
          "level": 3,
          "title": "registry.conf",
          "slug": "registry-conf",
          "children": []
        },
        {
          "level": 3,
          "title": "file.conf",
          "slug": "file-conf",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "服务端搭建(Server)-Nacos",
      "slug": "服务端搭建-server-nacos",
      "children": [
        {
          "level": 3,
          "title": "registry.conf",
          "slug": "registry-conf-1",
          "children": []
        },
        {
          "level": 3,
          "title": "文件上传到Nacos的脚本",
          "slug": "文件上传到nacos的脚本",
          "children": []
        },
        {
          "level": 3,
          "title": "上传的内容准备",
          "slug": "上传的内容准备",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "数据库准备（客户端）",
      "slug": "数据库准备-客户端",
      "children": []
    },
    {
      "level": 2,
      "title": "客户端",
      "slug": "客户端",
      "children": [
        {
          "level": 3,
          "title": "依赖",
          "slug": "依赖",
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
          "title": "主启动类关闭自动加载数据库",
          "slug": "主启动类关闭自动加载数据库",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义数据源",
          "slug": "自定义数据源",
          "children": []
        },
        {
          "level": 3,
          "title": "使用",
          "slug": "使用",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 10.27,
    "words": 3082
  },
  "filePathRelative": "JavaLang/SpringCloud/14-1-Seata部署全流程.md"
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
