export const data = {
  "key": "v-86046bfc",
  "path": "/JavaLang/SpringCloud/05-Ribbon%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%9C%8D%E5%8A%A1%E8%B0%83%E7%94%A8.html",
  "title": "05-Ribbon负载均衡服务调用",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "05-Ribbon负载均衡服务调用",
    "date": "2022-01-06T17:42:30.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "微服务",
      "Spring Cloud Ribbon",
      "SpringCloud"
    ],
    "summary": "概述 Spring Cloud Ribbon是基于Netfix Ribbon实现的一套客户端负载均衡工具\r\" 简单来说，Ribbon是Netfix发布的开源项目，主要功能是提供客户端软件负载均衡算法服务调用，Ribbon客户端组件提供一系列完善配置项如超时连接，重试等，简单的说，就是在配置文件中列出Load Balancer（简称LB）后面的所有机器，Rib",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/05-Ribbon%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%9C%8D%E5%8A%A1%E8%B0%83%E7%94%A8.html"
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
          "content": "05-Ribbon负载均衡服务调用"
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
          "content": "Spring Cloud Ribbon"
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
          "content": "2022-01-06T17:42:30.000Z"
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
      "title": "关于RestTemplate的用法",
      "slug": "关于resttemplate的用法",
      "children": [
        {
          "level": 3,
          "title": "xxxForEntity",
          "slug": "xxxforentity",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Ribbon的使用",
      "slug": "ribbon的使用",
      "children": [
        {
          "level": 3,
          "title": "较新版本需要手动安装依赖",
          "slug": "较新版本需要手动安装依赖",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "新版本SpringBoot使用LoadBalancer完成负载均衡",
      "slug": "新版本springboot使用loadbalancer完成负载均衡",
      "children": []
    },
    {
      "level": 2,
      "title": "轮循算法是怎么实现的",
      "slug": "轮循算法是怎么实现的",
      "children": []
    },
    {
      "level": 2,
      "title": "如果要自定义LoadBalancer负载均衡规则",
      "slug": "如果要自定义loadbalancer负载均衡规则",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 4.18,
    "words": 1253
  },
  "filePathRelative": "JavaLang/SpringCloud/05-Ribbon负载均衡服务调用.md"
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
