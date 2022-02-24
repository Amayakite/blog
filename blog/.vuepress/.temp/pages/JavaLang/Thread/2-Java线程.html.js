export const data = {
  "key": "v-532a2e6f",
  "path": "/JavaLang/Thread/2-Java%E7%BA%BF%E7%A8%8B.html",
  "title": "2-Java线程",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "2-Java线程",
    "date": "2022-01-15T16:12:30.000Z",
    "category": [
      "Thread"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "Thread"
    ],
    "summary": "创建和运行线程 方法一直接使用Thread 非常简单，只需要实现run方法即可，然后创建线程对象，并调用start方法即可。 方法二使用Runnable配合Thread 把线程和任务(要执行的代码分开)\rThread代表线程; \rRunnable可运行的任务（线程要执行的代码）; 当然，我们可以用lambda表达式来精简代码 方法三FutureTask配合T",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/Thread/2-Java%E7%BA%BF%E7%A8%8B.html"
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
          "content": "2-Java线程"
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
          "content": "2022-01-15T16:12:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "创建和运行线程",
      "slug": "创建和运行线程",
      "children": [
        {
          "level": 3,
          "title": "方法一直接使用Thread",
          "slug": "方法一直接使用thread",
          "children": []
        },
        {
          "level": 3,
          "title": "方法二使用Runnable配合Thread",
          "slug": "方法二使用runnable配合thread",
          "children": []
        },
        {
          "level": 3,
          "title": "方法三FutureTask配合Thread",
          "slug": "方法三futuretask配合thread",
          "children": []
        },
        {
          "level": 3,
          "title": "查看进程线程的方法",
          "slug": "查看进程线程的方法",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "原理之线程运行",
      "slug": "原理之线程运行",
      "children": [
        {
          "level": 3,
          "title": "栈与栈帧",
          "slug": "栈与栈帧",
          "children": []
        },
        {
          "level": 3,
          "title": "线程的上下文切换(Thread Context Switch)",
          "slug": "线程的上下文切换-thread-context-switch",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "线程的方法",
      "slug": "线程的方法",
      "children": [
        {
          "level": 3,
          "title": "常用方法一览",
          "slug": "常用方法一览",
          "children": []
        },
        {
          "level": 3,
          "title": "Sleep",
          "slug": "sleep",
          "children": []
        },
        {
          "level": 3,
          "title": "Yield",
          "slug": "yield",
          "children": []
        },
        {
          "level": 3,
          "title": "线程优先级",
          "slug": "线程优先级",
          "children": []
        },
        {
          "level": 3,
          "title": "join",
          "slug": "join",
          "children": []
        },
        {
          "level": 3,
          "title": "Join的应用实例：同步应用",
          "slug": "join的应用实例-同步应用",
          "children": []
        },
        {
          "level": 3,
          "title": "Join设定最大时间",
          "slug": "join设定最大时间",
          "children": []
        },
        {
          "level": 3,
          "title": "interrupt打断阻塞中的sleep、wait、join的线程",
          "slug": "interrupt打断阻塞中的sleep、wait、join的线程",
          "children": []
        },
        {
          "level": 3,
          "title": "interrupt打断正常的线程",
          "slug": "interrupt打断正常的线程",
          "children": []
        },
        {
          "level": 3,
          "title": "interrupt实例：两阶段终止模式",
          "slug": "interrupt实例-两阶段终止模式",
          "children": []
        },
        {
          "level": 3,
          "title": "Thread.isInterrupted和普通的isInterrupted的区别",
          "slug": "thread-isinterrupted和普通的isinterrupted的区别",
          "children": []
        },
        {
          "level": 3,
          "title": "interrupt打断park线程",
          "slug": "interrupt打断park线程",
          "children": []
        },
        {
          "level": 3,
          "title": "不推荐使用的方法",
          "slug": "不推荐使用的方法",
          "children": []
        },
        {
          "level": 3,
          "title": "主线程和守护线程",
          "slug": "主线程和守护线程",
          "children": []
        },
        {
          "level": 3,
          "title": "线程的五种状态",
          "slug": "线程的五种状态",
          "children": []
        },
        {
          "level": 3,
          "title": "线程的六种状态",
          "slug": "线程的六种状态",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 19.41,
    "words": 5822
  },
  "filePathRelative": "JavaLang/Thread/2-Java线程.md"
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
