export const data = {
  "key": "v-a139ba66",
  "path": "/JavaLang/SpringCloud/18-%E6%95%B0%E6%8D%AE%E6%A0%A1%E9%AA%8C.html",
  "title": "18-数据校验",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "18-数据校验",
    "date": "2022-01-26T17:59:20.000Z",
    "category": [
      "分布式-微服务"
    ],
    "tag": [
      "Validation",
      "数据校验"
    ],
    "summary": "概述 因为比较简单，这里就不说明具体的细节了，直接用即可 总之，这个是做对数据的验证，也就是防止小人的 依赖 使用 在domain加上对应的注解 使用的是 import javax.validation.constraints.*; 这个包下的一些内容，以及 import org.hibernate.validator.constraints这个包下的一些内",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringCloud/18-%E6%95%B0%E6%8D%AE%E6%A0%A1%E9%AA%8C.html"
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
          "content": "18-数据校验"
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
          "content": "Validation"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "数据校验"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-01-26T17:59:20.000Z"
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
          "title": "依赖",
          "slug": "依赖",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "使用",
      "slug": "使用",
      "children": [
        {
          "level": 3,
          "title": "在domain加上对应的注解",
          "slug": "在domain加上对应的注解",
          "children": []
        },
        {
          "level": 3,
          "title": "Controller接收并处理",
          "slug": "controller接收并处理",
          "children": []
        },
        {
          "level": 3,
          "title": "全局的处理方式",
          "slug": "全局的处理方式",
          "children": []
        },
        {
          "level": 3,
          "title": "关于异常状态码",
          "slug": "关于异常状态码",
          "children": []
        },
        {
          "level": 3,
          "title": "进阶-分组校验（分环境）",
          "slug": "进阶-分组校验-分环境",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义校验注解",
          "slug": "自定义校验注解",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 5.4,
    "words": 1619
  },
  "filePathRelative": "JavaLang/SpringCloud/18-数据校验.md"
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
