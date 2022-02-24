export const data = {
  "key": "v-39ddfbf8",
  "path": "/JavaLang/SpringFrameWork/08-AOP.html",
  "title": "08-AOP",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "08-AOP",
    "date": "2021-12-13T21:35:30.000Z",
    "category": [
      "Spring-FrameWork"
    ],
    "tag": [
      "Java",
      "Spring",
      "AOP"
    ],
    "summary": "基本介绍\r\" AOP是 Aspect Oriented Programming的缩写，意思是面向切面编程，是通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术\"\r\"\"\r\" AOP是OOP(面向对象)的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范围，利用AOP可以对业务逻辑的各个部分进行隔离，从而使得",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringFrameWork/08-AOP.html"
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
          "content": "08-AOP"
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
          "content": "AOP"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-13T21:35:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "基本介绍",
      "slug": "基本介绍",
      "children": [
        {
          "level": 3,
          "title": "回顾动态代理",
          "slug": "回顾动态代理",
          "children": []
        },
        {
          "level": 3,
          "title": "AOP的作用及优势",
          "slug": "aop的作用及优势",
          "children": []
        },
        {
          "level": 3,
          "title": "AOP的底层实现",
          "slug": "aop的底层实现",
          "children": []
        },
        {
          "level": 3,
          "title": "常用的动态代理技术(JDK/Cglib)",
          "slug": "常用的动态代理技术-jdk-cglib",
          "children": []
        },
        {
          "level": 3,
          "title": "简单实现动态代理增强(JDK)",
          "slug": "简单实现动态代理增强-jdk",
          "children": []
        },
        {
          "level": 3,
          "title": "简单实现动态代理增强(Cglib)",
          "slug": "简单实现动态代理增强-cglib",
          "children": []
        },
        {
          "level": 3,
          "title": "✨AOP的相关概念",
          "slug": "✨aop的相关概念",
          "children": []
        },
        {
          "level": 3,
          "title": "✨AOP开发明确的事项",
          "slug": "✨aop开发明确的事项",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨AOP编程的快速入门",
      "slug": "✨aop编程的快速入门",
      "children": [
        {
          "level": 3,
          "title": "导入AOP的相关依赖",
          "slug": "导入aop的相关依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "创建目标接口和目标类（内部要有切入点）",
          "slug": "创建目标接口和目标类-内部要有切入点",
          "children": []
        },
        {
          "level": 3,
          "title": "创建切面类（内部有增强方法）",
          "slug": "创建切面类-内部有增强方法",
          "children": []
        },
        {
          "level": 3,
          "title": "在目标类和切面类的对象创建权交给Spring",
          "slug": "在目标类和切面类的对象创建权交给spring",
          "children": []
        },
        {
          "level": 3,
          "title": "在applicationContext.xml中配置织入关系",
          "slug": "在applicationcontext-xml中配置织入关系",
          "children": []
        },
        {
          "level": 3,
          "title": "测试代码",
          "slug": "测试代码",
          "children": []
        },
        {
          "level": 3,
          "title": "AOP标签的说明",
          "slug": "aop标签的说明",
          "children": []
        },
        {
          "level": 3,
          "title": "✨✨切点表达式execution",
          "slug": "✨✨切点表达式execution",
          "children": []
        },
        {
          "level": 3,
          "title": "✨✨通知的类型(aop:before等)",
          "slug": "✨✨通知的类型-aop-before等",
          "children": []
        },
        {
          "level": 3,
          "title": "✨切点表达式的抽取",
          "slug": "✨切点表达式的抽取",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "基于注解的AOP开发",
      "slug": "基于注解的aop开发",
      "children": [
        {
          "level": 3,
          "title": "✨在切面类中使用注解配置织入关系",
          "slug": "✨在切面类中使用注解配置织入关系",
          "children": []
        },
        {
          "level": 3,
          "title": "✨在配置文件中开启组件扫描和AOP的自动代理",
          "slug": "✨在配置文件中开启组件扫描和aop的自动代理",
          "children": []
        },
        {
          "level": 3,
          "title": "测试",
          "slug": "测试",
          "children": []
        },
        {
          "level": 3,
          "title": "✨注解内切面表达式的抽取@Pointcut",
          "slug": "✨注解内切面表达式的抽取-pointcut",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 23.4,
    "words": 7021
  },
  "filePathRelative": "JavaLang/SpringFrameWork/08-AOP.md"
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
