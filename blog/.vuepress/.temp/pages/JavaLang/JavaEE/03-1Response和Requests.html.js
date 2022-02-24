export const data = {
  "key": "v-ed90a886",
  "path": "/JavaLang/JavaEE/03-1Response%E5%92%8CRequests.html",
  "title": "03-1-Response和Requests",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "03-1-Response和Requests",
    "date": "2021-12-03T16:44:05.000Z",
    "category": [
      "JavaWeb"
    ],
    "tag": [
      "Java",
      "JavaWeb",
      "Request",
      "Response"
    ],
    "summary": "基本概念 嘛，这里主要是了解这两个东西是怎么样一个用法 我们在使用doGet()的时候，可以发现他接受两个对象： 之前一直没怎么说，现在开始具体的说说它 ​ Web服务器(Tomcat)接收到客户端的http请求，针对这个请求，分别创建了两个东西\r代表请求的HttpServletRequest对象; \r如果要获取客户端发过来的参数，找他就对了; \r代表响应的",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/JavaEE/03-1Response%E5%92%8CRequests.html"
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
          "content": "03-1-Response和Requests"
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
          "content": "JavaWeb"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Request"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Response"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-03T16:44:05.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "基本概念",
      "slug": "基本概念",
      "children": [
        {
          "level": 3,
          "title": "Http请求中包含的信息",
          "slug": "http请求中包含的信息",
          "children": []
        },
        {
          "level": 3,
          "title": "HttpServletRequest中获取请求行信息的方法",
          "slug": "httpservletrequest中获取请求行信息的方法",
          "children": []
        },
        {
          "level": 3,
          "title": "HttpServletRequest中获取请求头的相关方法",
          "slug": "httpservletrequest中获取请求头的相关方法",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "HttpServletRequest中获取请求参数",
      "slug": "httpservletrequest中获取请求参数",
      "children": []
    },
    {
      "level": 2,
      "title": "常见应用",
      "slug": "常见应用",
      "children": [
        {
          "level": 3,
          "title": "设置状态码",
          "slug": "设置状态码",
          "children": []
        },
        {
          "level": 3,
          "title": "发送消息",
          "slug": "发送消息",
          "children": []
        },
        {
          "level": 3,
          "title": "发送文件、展示图片",
          "slug": "发送文件、展示图片",
          "children": []
        },
        {
          "level": 3,
          "title": "验证码的实现",
          "slug": "验证码的实现",
          "children": []
        },
        {
          "level": 3,
          "title": "实现重定向",
          "slug": "实现重定向",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 14.49,
    "words": 4347
  },
  "filePathRelative": "JavaLang/JavaEE/03-1Response和Requests.md"
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
