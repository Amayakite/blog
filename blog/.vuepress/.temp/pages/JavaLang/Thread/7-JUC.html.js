export const data = {
  "key": "v-1d256216",
  "path": "/JavaLang/Thread/7-JUC.html",
  "title": "7-JUC",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "7-JUC",
    "date": "2022-01-18T15:52:30.000Z",
    "category": [
      "Thread"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "Thread"
    ],
    "summary": "JUC概述 这玩意是这个java.util.concurrent包的简称，是Java给我们提供的一个并发编程的工具包。 里面有非常多的工具类 AQS 为什么要先说这个？它是一个抽象的接口java.util.concurrent.locks.AbstractQueuedSynchronizer。 翻译过来就是阻塞式锁和相关同步器工具的框架 其他工具都是基于它来",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/Thread/7-JUC.html"
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
          "content": "7-JUC"
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
          "content": "2022-01-18T15:52:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "JUC概述",
      "slug": "juc概述",
      "children": []
    },
    {
      "level": 2,
      "title": "AQS",
      "slug": "aqs",
      "children": [
        {
          "level": 3,
          "title": "利用AbstractQueuedSynchronizer自定义锁",
          "slug": "利用abstractqueuedsynchronizer自定义锁",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "公平锁和非公平锁的区别",
      "slug": "公平锁和非公平锁的区别",
      "children": []
    },
    {
      "level": 2,
      "title": "读写锁",
      "slug": "读写锁",
      "children": [
        {
          "level": 3,
          "title": "ReentrantReadWriteLock",
          "slug": "reentrantreadwritelock",
          "children": []
        },
        {
          "level": 3,
          "title": "ReentrantReadWriteLock注意事项",
          "slug": "reentrantreadwritelock注意事项",
          "children": []
        },
        {
          "level": 3,
          "title": "缓存的应用-数据库的查询缓存",
          "slug": "缓存的应用-数据库的查询缓存",
          "children": []
        },
        {
          "level": 3,
          "title": "简单实现-不涉及锁",
          "slug": "简单实现-不涉及锁",
          "children": []
        },
        {
          "level": 3,
          "title": "缓存更新策略-问题分析",
          "slug": "缓存更新策略-问题分析",
          "children": []
        },
        {
          "level": 3,
          "title": "缓存更新策略-实现",
          "slug": "缓存更新策略-实现",
          "children": []
        },
        {
          "level": 3,
          "title": "StampedLock",
          "slug": "stampedlock",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Semaphore-控制访问量",
      "slug": "semaphore-控制访问量",
      "children": []
    },
    {
      "level": 2,
      "title": "CountdownLatch-倒计时锁",
      "slug": "countdownlatch-倒计时锁",
      "children": [
        {
          "level": 3,
          "title": "基本使用",
          "slug": "基本使用",
          "children": []
        },
        {
          "level": 3,
          "title": "CountdownLatch实例：在分布式服务中分布式的获取结果",
          "slug": "countdownlatch实例-在分布式服务中分布式的获取结果",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "CyclicBarrier-循环栅栏-可以重用的CountdownLatch",
      "slug": "cyclicbarrier-循环栅栏-可以重用的countdownlatch",
      "children": [
        {
          "level": 3,
          "title": "使用",
          "slug": "使用",
          "children": []
        },
        {
          "level": 3,
          "title": "注意事项",
          "slug": "注意事项",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "线程安全集合类",
      "slug": "线程安全集合类",
      "children": []
    },
    {
      "level": 2,
      "title": "ConcurrentHashMap",
      "slug": "concurrenthashmap",
      "children": []
    },
    {
      "level": 2,
      "title": "Concurrent的方法一览",
      "slug": "concurrent的方法一览",
      "children": []
    },
    {
      "level": 2,
      "title": "CurrentLinkedQueue",
      "slug": "currentlinkedqueue",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 23.95,
    "words": 7186
  },
  "filePathRelative": "JavaLang/Thread/7-JUC.md"
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
