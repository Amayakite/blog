export const data = {
  "key": "v-495f5296",
  "path": "/JavaLang/Thread/6-%E8%BF%9E%E6%8E%A5%E6%B1%A0%E5%92%8C%E7%BA%BF%E7%A8%8B%E6%B1%A0.html",
  "title": "6-连接池和线程池",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "6-连接池和线程池",
    "date": "2022-01-17T17:23:30.000Z",
    "category": [
      "Thread"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "Thread"
    ],
    "summary": "自定义一个连接池 为啥需要连接池？ 例如：一个线上商城应用，QPS达到数千，如果每次请求都重新创建连接和关闭数据库，性能会收到极大的影响，此时如果预先创建好了一批连接，放入连接池。 一次请求到达后，从连接池获取连接，使用完数据后再还给连接池，这样既解约了创建和关闭连接的开销，也实现了连接的重用，不止于让庞大的数据压垮数据库 制作一个简单的连接池 这里面的Mo",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/Thread/6-%E8%BF%9E%E6%8E%A5%E6%B1%A0%E5%92%8C%E7%BA%BF%E7%A8%8B%E6%B1%A0.html"
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
          "content": "6-连接池和线程池"
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
          "content": "2022-01-17T17:23:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "自定义一个连接池",
      "slug": "自定义一个连接池",
      "children": [
        {
          "level": 3,
          "title": "为啥需要连接池？",
          "slug": "为啥需要连接池",
          "children": []
        },
        {
          "level": 3,
          "title": "制作一个简单的连接池",
          "slug": "制作一个简单的连接池",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "自定义线程池",
      "slug": "自定义线程池",
      "children": [
        {
          "level": 3,
          "title": "为什么要有线程池",
          "slug": "为什么要有线程池",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义线程池-阻塞队列",
          "slug": "自定义线程池-阻塞队列",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义线程池-拒绝策略接口",
          "slug": "自定义线程池-拒绝策略接口",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义线程池-线程池类",
          "slug": "自定义线程池-线程池类",
          "children": []
        },
        {
          "level": 3,
          "title": "测试",
          "slug": "测试",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "ThreadPoolExecutor",
      "slug": "threadpoolexecutor",
      "children": [
        {
          "level": 3,
          "title": "线程池的状态",
          "slug": "线程池的状态",
          "children": []
        },
        {
          "level": 3,
          "title": "构造方法",
          "slug": "构造方法",
          "children": []
        },
        {
          "level": 3,
          "title": "newFixedThreadPool",
          "slug": "newfixedthreadpool",
          "children": []
        },
        {
          "level": 3,
          "title": "newCachedThreadPool",
          "slug": "newcachedthreadpool",
          "children": []
        },
        {
          "level": 3,
          "title": "newSingleThreadExecutor",
          "slug": "newsinglethreadexecutor",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "线程池的提交任务",
      "slug": "线程池的提交任务",
      "children": [
        {
          "level": 3,
          "title": "方法一览",
          "slug": "方法一览",
          "children": []
        },
        {
          "level": 3,
          "title": "提交线程-submit",
          "slug": "提交线程-submit",
          "children": []
        },
        {
          "level": 3,
          "title": "提交任务之一次性提交多个任务-invokeAll和invokeAny",
          "slug": "提交任务之一次性提交多个任务-invokeall和invokeany",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "关闭线程池",
      "slug": "关闭线程池",
      "children": [
        {
          "level": 3,
          "title": "shutdown",
          "slug": "shutdown",
          "children": []
        },
        {
          "level": 3,
          "title": "shutdownNow",
          "slug": "shutdownnow",
          "children": []
        },
        {
          "level": 3,
          "title": "其他方法",
          "slug": "其他方法",
          "children": []
        },
        {
          "level": 3,
          "title": "shutdown和shutdownNow演示",
          "slug": "shutdown和shutdownnow演示",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "异步模式之工作线程",
      "slug": "异步模式之工作线程",
      "children": [
        {
          "level": 3,
          "title": "定义",
          "slug": "定义",
          "children": []
        },
        {
          "level": 3,
          "title": "饥饿",
          "slug": "饥饿",
          "children": []
        },
        {
          "level": 3,
          "title": "创建多少个线程池比较合适",
          "slug": "创建多少个线程池比较合适",
          "children": []
        },
        {
          "level": 3,
          "title": "CPU密集型计算应该用的线程池数量",
          "slug": "cpu密集型计算应该用的线程池数量",
          "children": []
        },
        {
          "level": 3,
          "title": "IO密集型计算",
          "slug": "io密集型计算",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "任务调度线程池",
      "slug": "任务调度线程池",
      "children": [
        {
          "level": 3,
          "title": "timer的缺点",
          "slug": "timer的缺点",
          "children": []
        },
        {
          "level": 3,
          "title": "ScheduleThreadPoolExceutor-延时执行",
          "slug": "schedulethreadpoolexceutor-延时执行",
          "children": []
        },
        {
          "level": 3,
          "title": "ScheduleThreadPoolExceutor-定时执行",
          "slug": "schedulethreadpoolexceutor-定时执行",
          "children": []
        },
        {
          "level": 3,
          "title": "正确处理线程池异常的方法",
          "slug": "正确处理线程池异常的方法",
          "children": []
        },
        {
          "level": 3,
          "title": "定时任务的应用-每周四十八点执行任务",
          "slug": "定时任务的应用-每周四十八点执行任务",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Tomcat线程池",
      "slug": "tomcat线程池",
      "children": [
        {
          "level": 3,
          "title": "Connector配置",
          "slug": "connector配置",
          "children": []
        },
        {
          "level": 3,
          "title": "Executor配置",
          "slug": "executor配置",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Fork/Join 线程池",
      "slug": "fork-join-线程池",
      "children": [
        {
          "level": 3,
          "title": "概念",
          "slug": "概念",
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
    "minutes": 32.56,
    "words": 9769
  },
  "filePathRelative": "JavaLang/Thread/6-连接池和线程池.md"
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
