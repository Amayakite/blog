export const data = {
  "key": "v-4ef6028d",
  "path": "/JavaLang/SpringFrameWork/07-SpringMVC%E6%8B%A6%E6%88%AA%E5%99%A8.html",
  "title": "07-SpringMVC拦截器和异常的处理",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "07-SpringMVC拦截器和异常的处理",
    "date": "2021-12-13T16:25:30.000Z",
    "category": [
      "Spring-FrameWork"
    ],
    "tag": [
      "Java",
      "Spring",
      "SpringMvc",
      "JavaWeb",
      "拦截器",
      "过滤器",
      "异常",
      "Execption"
    ],
    "summary": "拦截器基本介绍 ​ SPringMVC的拦截器类似于Servlet开发中的过滤器filter，用于对处理器进行预处理或后处理 ​ 将拦截器按照一定的顺序连接成一条链，这条链也被称为拦截器链，在访问被拦截方法或字段时，拦截器链中的拦截器就会按其之前定义的顺序被调用，拦截器也是AOP思想的具体实现 拦截器和过滤器的区别 区别 过滤器(Filter) 拦截器(In",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringFrameWork/07-SpringMVC%E6%8B%A6%E6%88%AA%E5%99%A8.html"
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
          "content": "07-SpringMVC拦截器和异常的处理"
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
          "content": "Spring"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "SpringMvc"
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
          "content": "拦截器"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "过滤器"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "异常"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Execption"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-13T16:25:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "拦截器基本介绍",
      "slug": "拦截器基本介绍",
      "children": [
        {
          "level": 3,
          "title": "拦截器和过滤器的区别",
          "slug": "拦截器和过滤器的区别",
          "children": []
        },
        {
          "level": 3,
          "title": "拦截器的快速入门",
          "slug": "拦截器的快速入门",
          "children": []
        },
        {
          "level": 3,
          "title": "✨preHandle 对用户传入的信息进行处理",
          "slug": "✨prehandle-对用户传入的信息进行处理",
          "children": []
        },
        {
          "level": 3,
          "title": "postHandle 对ModelAndView的进一步处理",
          "slug": "posthandle-对modelandview的进一步处理",
          "children": []
        },
        {
          "level": 3,
          "title": "afterCompletion 对异常的处理",
          "slug": "aftercompletion-对异常的处理",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "拦截器的总结以及不拦截某个地址",
      "slug": "拦截器的总结以及不拦截某个地址",
      "children": []
    },
    {
      "level": 2,
      "title": "SpringMVC中异常的处理",
      "slug": "springmvc中异常的处理",
      "children": [
        {
          "level": 3,
          "title": "异常处理的思路",
          "slug": "异常处理的思路",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "异常处理的两种方式",
      "slug": "异常处理的两种方式",
      "children": [
        {
          "level": 3,
          "title": "✨SimpleMapExceptionResolver简单异常处理器",
          "slug": "✨simplemapexceptionresolver简单异常处理器",
          "children": []
        },
        {
          "level": 3,
          "title": "✨HandlerExceptionResolver自定义异常处理器",
          "slug": "✨handlerexceptionresolver自定义异常处理器",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "异常处理的总结",
      "slug": "异常处理的总结",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 10.75,
    "words": 3226
  },
  "filePathRelative": "JavaLang/SpringFrameWork/07-SpringMVC拦截器.md"
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
