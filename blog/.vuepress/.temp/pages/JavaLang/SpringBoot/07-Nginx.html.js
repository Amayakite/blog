export const data = {
  "key": "v-05aad7db",
  "path": "/JavaLang/SpringBoot/07-Nginx.html",
  "title": "07-Nginx",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "07-Nginx",
    "date": "2021-12-30T11:52:30.000Z",
    "category": [
      "SpringBoot"
    ],
    "tag": [
      "Nginx"
    ],
    "summary": "前言 这是学习Spring Cloud之前的倒数第二个垫脚石 Nginx简介\r\" Nginx是一个高性能的HTTP和反向代理的Web服务器，同时也提供了IMAP/POP3/STMP等各种服务\"\r\"\"\r\" 是老毛子开发的\"\r\"\"\r\" 百分之九十的网站都用了Nginx\"\r\"\"\r\" 这玩意的特点是：占有的内存少，并发能力强，在同类的反向代理服务期内是表现比较好的那",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringBoot/07-Nginx.html"
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
          "content": "07-Nginx"
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
          "content": "2021-12-30T11:52:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "前言",
      "slug": "前言",
      "children": [
        {
          "level": 3,
          "title": "Nginx简介",
          "slug": "nginx简介",
          "children": []
        },
        {
          "level": 3,
          "title": "正向代理的概念",
          "slug": "正向代理的概念",
          "children": []
        },
        {
          "level": 3,
          "title": "反向代理的概念",
          "slug": "反向代理的概念",
          "children": []
        },
        {
          "level": 3,
          "title": "负载均衡",
          "slug": "负载均衡",
          "children": []
        },
        {
          "level": 3,
          "title": "动静分离",
          "slug": "动静分离",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Nginx的安装",
      "slug": "nginx的安装",
      "children": [
        {
          "level": 3,
          "title": "Ubuntu直装",
          "slug": "ubuntu直装",
          "children": []
        },
        {
          "level": 3,
          "title": "Docker",
          "slug": "docker",
          "children": []
        },
        {
          "level": 3,
          "title": "Nginx基本命令",
          "slug": "nginx基本命令",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Nginx的配置文件",
      "slug": "nginx的配置文件",
      "children": [
        {
          "level": 3,
          "title": "第一部分-全局快",
          "slug": "第一部分-全局快",
          "children": []
        },
        {
          "level": 3,
          "title": "第二部分-events块",
          "slug": "第二部分-events块",
          "children": []
        },
        {
          "level": 3,
          "title": "第三部分-http块",
          "slug": "第三部分-http块",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Nginx配置实例1-反向代理",
      "slug": "nginx配置实例1-反向代理",
      "children": [
        {
          "level": 3,
          "title": "Nginx反向代理配置多个路径",
          "slug": "nginx反向代理配置多个路径",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Location内的特殊符号说明",
      "slug": "location内的特殊符号说明",
      "children": []
    },
    {
      "level": 2,
      "title": "Nginx配置负载均衡",
      "slug": "nginx配置负载均衡",
      "children": []
    },
    {
      "level": 2,
      "title": "负载均衡的几种策略",
      "slug": "负载均衡的几种策略",
      "children": [
        {
          "level": 3,
          "title": "轮循（默认）",
          "slug": "轮循-默认",
          "children": []
        },
        {
          "level": 3,
          "title": "Weight权重策略",
          "slug": "weight权重策略",
          "children": []
        },
        {
          "level": 3,
          "title": "ip_hash",
          "slug": "ip-hash",
          "children": []
        },
        {
          "level": 3,
          "title": "fair-响应时间分配",
          "slug": "fair-响应时间分配",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Nginx动静分离",
      "slug": "nginx动静分离",
      "children": [
        {
          "level": 3,
          "title": "静态资源的正向代理-准备工作",
          "slug": "静态资源的正向代理-准备工作",
          "children": []
        },
        {
          "level": 3,
          "title": "配置静态资源",
          "slug": "配置静态资源",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Nginx 集群",
      "slug": "nginx-集群",
      "children": []
    },
    {
      "level": 2,
      "title": "Nginx原理简单说明",
      "slug": "nginx原理简单说明",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 18.72,
    "words": 5615
  },
  "filePathRelative": "JavaLang/SpringBoot/07-Nginx.md"
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
