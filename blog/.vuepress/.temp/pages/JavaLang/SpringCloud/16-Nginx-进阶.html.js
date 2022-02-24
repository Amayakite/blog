export const data = {
  "key": "v-5bbb8f0c",
  "path": "/JavaLang/SpringCloud/16-Nginx-%E8%BF%9B%E9%98%B6.html",
  "title": "16-Nginx-进阶",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "16-Nginx-进阶",
    "date": "2022-01-20T15:00:30.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "Nginx"
    ],
    "summary": "概述 之前nginx并不是学习的特别的深入，这里深入了解下 Nginx的变量一览 这里过一遍就好了，以后有需要的时候回来查 官方变量 和Request有关的变量\r\" $arg_name\" 请求行中，名称为name的参数的值。 比如，当请求行是GET /nginx/varindex/?from=rss HTTP/1.1时，$arg_from的值是\"rss\" 当",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/16-Nginx-%E8%BF%9B%E9%98%B6.html"
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
          "content": "16-Nginx-进阶"
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
          "content": "Nginx"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-01-20T15:00:30.000Z"
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
      "title": "Nginx的变量一览",
      "slug": "nginx的变量一览",
      "children": [
        {
          "level": 3,
          "title": "和Request有关的变量",
          "slug": "和request有关的变量",
          "children": []
        },
        {
          "level": 3,
          "title": "和Response的相关变量",
          "slug": "和response的相关变量",
          "children": []
        },
        {
          "level": 3,
          "title": "常用变量",
          "slug": "常用变量",
          "children": []
        },
        {
          "level": 3,
          "title": "与upstream相关的变量",
          "slug": "与upstream相关的变量",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "配置文件初步解读",
      "slug": "配置文件初步解读",
      "children": []
    },
    {
      "level": 2,
      "title": "Nginx常用命令",
      "slug": "nginx常用命令",
      "children": []
    },
    {
      "level": 2,
      "title": "Nginx-日志切割",
      "slug": "nginx-日志切割",
      "children": [
        {
          "level": 3,
          "title": "手动",
          "slug": "手动",
          "children": []
        },
        {
          "level": 3,
          "title": "定时",
          "slug": "定时",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "配置静态资源访问",
      "slug": "配置静态资源访问",
      "children": [
        {
          "level": 3,
          "title": "基本配置",
          "slug": "基本配置",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Gzip的压缩配置",
      "slug": "gzip的压缩配置",
      "children": []
    },
    {
      "level": 2,
      "title": "Location匹配规则说明",
      "slug": "location匹配规则说明",
      "children": [
        {
          "level": 3,
          "title": "规则一览",
          "slug": "规则一览",
          "children": []
        },
        {
          "level": 3,
          "title": "普通匹配",
          "slug": "普通匹配",
          "children": []
        },
        {
          "level": 3,
          "title": "精准匹配",
          "slug": "精准匹配",
          "children": []
        },
        {
          "level": 3,
          "title": "正则表达式匹配",
          "slug": "正则表达式匹配",
          "children": []
        },
        {
          "level": 3,
          "title": "限制以某个字符路径开头请求（指定路径匹配）",
          "slug": "限制以某个字符路径开头请求-指定路径匹配",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "配置Cors跨域",
      "slug": "配置cors跨域",
      "children": []
    },
    {
      "level": 2,
      "title": "配置防盗链",
      "slug": "配置防盗链",
      "children": []
    },
    {
      "level": 2,
      "title": "Nginx的模块化体系",
      "slug": "nginx的模块化体系",
      "children": []
    },
    {
      "level": 2,
      "title": "负载均衡反向代理的搭建",
      "slug": "负载均衡反向代理的搭建",
      "children": [
        {
          "level": 3,
          "title": "基本搭建-带有真实ip转发",
          "slug": "基本搭建-带有真实ip转发",
          "children": []
        },
        {
          "level": 3,
          "title": "upstream的参数",
          "slug": "upstream的参数",
          "children": []
        },
        {
          "level": 3,
          "title": "Keepalive",
          "slug": "keepalive",
          "children": []
        },
        {
          "level": 3,
          "title": "负载均衡-ip_hash",
          "slug": "负载均衡-ip-hash",
          "children": []
        },
        {
          "level": 3,
          "title": "通过访问的URI进行负载均衡",
          "slug": "通过访问的uri进行负载均衡",
          "children": []
        },
        {
          "level": 3,
          "title": "最少的连接数优先进行负载均衡",
          "slug": "最少的连接数优先进行负载均衡",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "缓存",
      "slug": "缓存",
      "children": [
        {
          "level": 3,
          "title": "静态资源缓存",
          "slug": "静态资源缓存",
          "children": []
        },
        {
          "level": 3,
          "title": "反向代理的缓存",
          "slug": "反向代理的缓存",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "关于HTTPS证书的配置",
      "slug": "关于https证书的配置",
      "children": []
    },
    {
      "level": 2,
      "title": "Nginx集群",
      "slug": "nginx集群",
      "children": [
        {
          "level": 3,
          "title": "Keepalived双机主备",
          "slug": "keepalived双机主备",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 23.63,
    "words": 7088
  },
  "filePathRelative": "JavaLang/SpringCloud/16-Nginx-进阶.md"
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
