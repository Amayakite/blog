export const data = {
  "key": "v-57c67ef6",
  "path": "/JavaLang/SpringFrameWork/02-Spring%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E6%BA%90.html",
  "title": "02-Spring配置JDBC数据源",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "02-Spring配置JDBC数据源",
    "date": "2021-12-10T00:12:30.000Z",
    "category": [
      "Spring-FrameWork"
    ],
    "tag": [
      "Java",
      "Spring",
      "Jdbc"
    ],
    "summary": "回顾数据源(连接池)的作用 ​ 还记得Druid吗，我是印象深刻（老韩讲的太好了） ​ 数据源就是为了提高程序性能而出现的 ​ 使用数据源的话，我们要先实例化数据源，初始化部分链接资源 ​ 使用连接资源的时候从数据源中读取 ​ 使用完毕后将资源归还给数据源 数据源的开发步骤 1. 导包 2. 创建数据源的对象 3. 设置数据源的基本连接数据 1. Drive",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringFrameWork/02-Spring%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E6%BA%90.html"
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
          "content": "02-Spring配置JDBC数据源"
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
          "content": "Jdbc"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-10T00:12:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "回顾数据源(连接池)的作用",
      "slug": "回顾数据源-连接池-的作用",
      "children": [
        {
          "level": 3,
          "title": "数据源的开发步骤",
          "slug": "数据源的开发步骤",
          "children": []
        },
        {
          "level": 3,
          "title": "导包、配置",
          "slug": "导包、配置",
          "children": []
        },
        {
          "level": 3,
          "title": "补充-Maven项目中配置Druid",
          "slug": "补充-maven项目中配置druid",
          "children": []
        },
        {
          "level": 3,
          "title": "在Spring中配置线程池-普通注入",
          "slug": "在spring中配置线程池-普通注入",
          "children": []
        },
        {
          "level": 3,
          "title": "在Spring中配置数据源-通过Properties配置文件",
          "slug": "在spring中配置数据源-通过properties配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "通过Properties配置文件在Spring中配置JDBC总结",
          "slug": "通过properties配置文件在spring中配置jdbc总结",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 6.91,
    "words": 2073
  },
  "filePathRelative": "JavaLang/SpringFrameWork/02-Spring配置数据源.md"
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
