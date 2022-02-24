export const data = {
  "key": "v-3b00154c",
  "path": "/JavaLang/Thread/5-%E5%85%B1%E4%BA%AB%E6%A8%A1%E5%9E%8B%E4%B9%8B%E6%97%A0%E9%94%81.html",
  "title": "5-共享模型之无锁",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "5-共享模型之无锁",
    "date": "2022-01-17T12:28:20.000Z",
    "category": [
      "Thread"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "Thread"
    ],
    "summary": "乐观锁(无锁) 保护共享资源-加锁实现 有如下需求，保证account.withdraw取款方法的线程安全 接着我们来写一个线程不安全的实现类 然后再来写一个main测试下 最终测试结果：430 cost 0ms，这是因为线程不安全的实现类中的balance变量是共享的，所以线程不安全的实现类中的withdrawBalance方法会导致线程不安全的问题 所以",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/Thread/5-%E5%85%B1%E4%BA%AB%E6%A8%A1%E5%9E%8B%E4%B9%8B%E6%97%A0%E9%94%81.html"
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
          "content": "5-共享模型之无锁"
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
          "content": "2022-01-17T12:28:20.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "乐观锁(无锁)",
      "slug": "乐观锁-无锁",
      "children": [
        {
          "level": 3,
          "title": "保护共享资源-加锁实现",
          "slug": "保护共享资源-加锁实现",
          "children": []
        },
        {
          "level": 3,
          "title": "保护共享资源-无锁实现",
          "slug": "保护共享资源-无锁实现",
          "children": []
        },
        {
          "level": 3,
          "title": "CAS与volatile",
          "slug": "cas与volatile",
          "children": []
        },
        {
          "level": 3,
          "title": "volatile",
          "slug": "volatile",
          "children": []
        },
        {
          "level": 3,
          "title": "为什么无锁效率更高",
          "slug": "为什么无锁效率更高",
          "children": []
        },
        {
          "level": 3,
          "title": "CAS的特点",
          "slug": "cas的特点",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "原子整数",
      "slug": "原子整数",
      "children": [
        {
          "level": 3,
          "title": "基本使用",
          "slug": "基本使用",
          "children": []
        },
        {
          "level": 3,
          "title": "手动实现updateAndGet",
          "slug": "手动实现updateandget",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "原子引用",
      "slug": "原子引用",
      "children": [
        {
          "level": 3,
          "title": "基本概念及使用",
          "slug": "基本概念及使用",
          "children": []
        },
        {
          "level": 3,
          "title": "原子引用-ABA问题",
          "slug": "原子引用-aba问题",
          "children": []
        },
        {
          "level": 3,
          "title": "AtomicStampedReference",
          "slug": "atomicstampedreference",
          "children": []
        },
        {
          "level": 3,
          "title": "AtomicMarkeableReference",
          "slug": "atomicmarkeablereference",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "原子数组",
      "slug": "原子数组",
      "children": [
        {
          "level": 3,
          "title": "线程不安全的数组",
          "slug": "线程不安全的数组",
          "children": []
        },
        {
          "level": 3,
          "title": "原子数组",
          "slug": "原子数组-1",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "字段更新器",
      "slug": "字段更新器",
      "children": []
    },
    {
      "level": 2,
      "title": "原子累加器Adder",
      "slug": "原子累加器adder",
      "children": [
        {
          "level": 3,
          "title": "基本使用",
          "slug": "基本使用-1",
          "children": []
        },
        {
          "level": 3,
          "title": "LongAdder底层分析",
          "slug": "longadder底层分析",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Unsafe",
      "slug": "unsafe",
      "children": []
    },
    {
      "level": 2,
      "title": "日期的不可变类-DateTimeFormatter",
      "slug": "日期的不可变类-datetimeformatter",
      "children": []
    },
    {
      "level": 2,
      "title": "不可变类的设计-String",
      "slug": "不可变类的设计-string",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 17.31,
    "words": 5193
  },
  "filePathRelative": "JavaLang/Thread/5-共享模型之无锁.md"
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
