export const data = {
  "key": "v-999358a2",
  "path": "/JavaLang/JavaSE/20-%E5%8F%8D%E5%B0%84.html",
  "title": "20-反射",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "20-反射",
    "date": "2021-11-18T14:18:23.000Z",
    "category": [
      "JavaSE"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "Class"
    ],
    "summary": "一个需求引出反射 先看一个问题： 1. 根据配置文件re.properties指定信息，创建对象并调用方法(创建Cat对象并调用方法hi) 思考：使用现有技术该如何实现 2. 这样的需求在学习框架的阶段时特别多，即通过外部文件配置，在不修改源码的情况下，来控制程序，也符合设计模式的ocp原则（开闭原则：不修改源码，扩展功能） 接下来使用反射机制来解决这个问题",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/JavaSE/20-%E5%8F%8D%E5%B0%84.html"
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
          "content": "20-反射"
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
          "content": "Class"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-11-18T14:18:23.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一个需求引出反射",
      "slug": "一个需求引出反射",
      "children": []
    },
    {
      "level": 2,
      "title": "反射机制(Reflection)",
      "slug": "反射机制-reflection",
      "children": []
    },
    {
      "level": 2,
      "title": "Java反射机制原理(重要)",
      "slug": "java反射机制原理-重要",
      "children": [
        {
          "level": 3,
          "title": "反射的优点和缺点",
          "slug": "反射的优点和缺点",
          "children": []
        },
        {
          "level": 3,
          "title": "反射调用优化-关闭访问检查",
          "slug": "反射调用优化-关闭访问检查",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Class类",
      "slug": "class类",
      "children": [
        {
          "level": 3,
          "title": "基本介绍",
          "slug": "基本介绍",
          "children": []
        },
        {
          "level": 3,
          "title": "Class类常用方法",
          "slug": "class类常用方法",
          "children": []
        },
        {
          "level": 3,
          "title": "获取Class类对象的六种方式",
          "slug": "获取class类对象的六种方式",
          "children": []
        },
        {
          "level": 3,
          "title": "哪些类型有Class对象",
          "slug": "哪些类型有class对象",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "类加载",
      "slug": "类加载",
      "children": [
        {
          "level": 3,
          "title": "基本说明",
          "slug": "基本说明",
          "children": []
        },
        {
          "level": 3,
          "title": "类加载时机",
          "slug": "类加载时机",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "类加载初步深入了解",
      "slug": "类加载初步深入了解",
      "children": [
        {
          "level": 3,
          "title": "类加载流程图",
          "slug": "类加载流程图",
          "children": []
        },
        {
          "level": 3,
          "title": "类加载各个阶段完成任务",
          "slug": "类加载各个阶段完成任务",
          "children": []
        },
        {
          "level": 3,
          "title": "加载阶段(Loading)",
          "slug": "加载阶段-loading",
          "children": []
        },
        {
          "level": 3,
          "title": "连接阶段-验证(Versification)",
          "slug": "连接阶段-验证-versification",
          "children": []
        },
        {
          "level": 3,
          "title": "连接阶段-准备(Preparation)",
          "slug": "连接阶段-准备-preparation",
          "children": []
        },
        {
          "level": 3,
          "title": "连接阶段-解析(Resolution)",
          "slug": "连接阶段-解析-resolution",
          "children": []
        },
        {
          "level": 3,
          "title": "初始化(Initialization)",
          "slug": "初始化-initialization",
          "children": []
        },
        {
          "level": 3,
          "title": "通过反射获取类的结构信息",
          "slug": "通过反射获取类的结构信息",
          "children": []
        },
        {
          "level": 3,
          "title": "通过反射创建对象",
          "slug": "通过反射创建对象",
          "children": []
        },
        {
          "level": 3,
          "title": "通过反射访问属性",
          "slug": "通过反射访问属性",
          "children": []
        },
        {
          "level": 3,
          "title": "通过反射访问方法",
          "slug": "通过反射访问方法",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 27.02,
    "words": 8105
  },
  "filePathRelative": "JavaLang/JavaSE/20-反射.md"
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
