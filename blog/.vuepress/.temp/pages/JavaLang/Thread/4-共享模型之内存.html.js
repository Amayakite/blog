export const data = {
  "key": "v-3f16cce0",
  "path": "/JavaLang/Thread/4-%E5%85%B1%E4%BA%AB%E6%A8%A1%E5%9E%8B%E4%B9%8B%E5%86%85%E5%AD%98.html",
  "title": "4-共享模型之内存",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "4-共享模型之内存",
    "date": "2022-01-16T22:37:40.000Z",
    "category": [
      "Thread"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "Thread"
    ],
    "summary": "Java内存模型 JMM即Java Memory Model，它定义了主存、工作内存抽象概念，底层对应着CPU寄存器、缓存、硬件内存、CPU指令优化等 JMM体现在如下几个方面\r原子性：保证指令不会受到线程上下文切换的影响; \r可见性：保证指令不会受到CPU缓存的影响; \r有序性：保证指令不会受到CPU指令并行优化影响; 可见性问题 这里有一个非常经典的问题",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/Thread/4-%E5%85%B1%E4%BA%AB%E6%A8%A1%E5%9E%8B%E4%B9%8B%E5%86%85%E5%AD%98.html"
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
          "content": "4-共享模型之内存"
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
          "content": "JavaSE"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Thread"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2022-01-16T22:37:40.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Java内存模型",
      "slug": "java内存模型",
      "children": [
        {
          "level": 3,
          "title": "可见性问题",
          "slug": "可见性问题",
          "children": []
        },
        {
          "level": 3,
          "title": "解决可见性问题-volatile关键字",
          "slug": "解决可见性问题-volatile关键字",
          "children": []
        },
        {
          "level": 3,
          "title": "可见性和原子性",
          "slug": "可见性和原子性",
          "children": []
        },
        {
          "level": 3,
          "title": "使用volatile做更优雅的两阶段终止",
          "slug": "使用volatile做更优雅的两阶段终止",
          "children": []
        },
        {
          "level": 3,
          "title": "犹豫模式",
          "slug": "犹豫模式",
          "children": []
        },
        {
          "level": 3,
          "title": "有序性",
          "slug": "有序性",
          "children": []
        },
        {
          "level": 3,
          "title": "如何禁止指令重排序",
          "slug": "如何禁止指令重排序",
          "children": []
        },
        {
          "level": 3,
          "title": "使用volatile完成单例设计模式",
          "slug": "使用volatile完成单例设计模式",
          "children": []
        },
        {
          "level": 3,
          "title": "懒汉单例模式",
          "slug": "懒汉单例模式",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 5.15,
    "words": 1545
  },
  "filePathRelative": "JavaLang/Thread/4-共享模型之内存.md"
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
