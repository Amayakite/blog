export const data = {
  "key": "v-e3057198",
  "path": "/JavaLang/JavaSE/18-IO%E6%B5%81.html",
  "title": "18-IO流",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "18-IO流",
    "date": "2021-11-13T20:42:30.000Z",
    "category": [
      "JavaSE"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "IO"
    ],
    "summary": "文件 对于这玩意我们已经习以为常了，就是保存数据的地方，比如一张图片，一个文档，一个表格，一个json数据集等 不过那些都不是重点，接下来说说文件流的概念 文件流 文件在程序中是以流的形式来操作的 流：数据在数据源（文件）和程序（内存）之间经历的路径 输入流：数据从数据源（文件）到程序（内存）的路径 输出流：程序从（内存）到数据源（文件）的路径 上面这些是比",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/JavaSE/18-IO%E6%B5%81.html"
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
          "content": "18-IO流"
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
          "content": "IO"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-11-13T20:42:30.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "文件",
      "slug": "文件",
      "children": [
        {
          "level": 3,
          "title": "文件流",
          "slug": "文件流",
          "children": []
        },
        {
          "level": 3,
          "title": "File-常用的文件操作",
          "slug": "file-常用的文件操作",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "IO流原理及流的分类",
      "slug": "io流原理及流的分类",
      "children": [
        {
          "level": 3,
          "title": "流的分类",
          "slug": "流的分类",
          "children": []
        },
        {
          "level": 3,
          "title": "Java IO流结构图",
          "slug": "java-io流结构图",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "InputerStream 字节输入流",
      "slug": "inputerstream-字节输入流",
      "children": [
        {
          "level": 3,
          "title": "FileInputStream文件字节输入流",
          "slug": "fileinputstream文件字节输入流",
          "children": []
        },
        {
          "level": 3,
          "title": "FileOutputStream 文件字节输出流",
          "slug": "fileoutputstream-文件字节输出流",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "FileReader和FileWriter",
      "slug": "filereader和filewriter",
      "children": []
    },
    {
      "level": 2,
      "title": "节点流和处理流",
      "slug": "节点流和处理流",
      "children": [
        {
          "level": 3,
          "title": "节点流和处理流的区别和联系",
          "slug": "节点流和处理流的区别和联系",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "处理流-BufferedReader和BufferedWriter",
      "slug": "处理流-bufferedreader和bufferedwriter",
      "children": []
    },
    {
      "level": 2,
      "title": "处理流-BufferedInputStream和BufferedOutputStream",
      "slug": "处理流-bufferedinputstream和bufferedoutputstream",
      "children": []
    },
    {
      "level": 2,
      "title": "深入理解处理/包装流",
      "slug": "深入理解处理-包装流",
      "children": []
    },
    {
      "level": 2,
      "title": "对象流-ObjectInputStream和ObjectOutputStream",
      "slug": "对象流-objectinputstream和objectoutputstream",
      "children": [
        {
          "level": 3,
          "title": "序列化和反序列化",
          "slug": "序列化和反序列化",
          "children": []
        },
        {
          "level": 3,
          "title": "ObjectOutPutStream和ObjectInputStream的简单介绍",
          "slug": "objectoutputstream和objectinputstream的简单介绍",
          "children": []
        },
        {
          "level": 3,
          "title": "对象读写流及序列化的注意事项和使用细节",
          "slug": "对象读写流及序列化的注意事项和使用细节",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "标准输入输出流",
      "slug": "标准输入输出流",
      "children": []
    },
    {
      "level": 2,
      "title": "转换流-InputStreamReader和OutputStreamWriter",
      "slug": "转换流-inputstreamreader和outputstreamwriter",
      "children": [
        {
          "level": 3,
          "title": "基本介绍及使用",
          "slug": "基本介绍及使用",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "打印流-PrintStream和PrintWriter",
      "slug": "打印流-printstream和printwriter",
      "children": []
    },
    {
      "level": 2,
      "title": "Properties类",
      "slug": "properties类",
      "children": [
        {
          "level": 3,
          "title": "Properties的使用",
          "slug": "properties的使用",
          "children": []
        },
        {
          "level": 3,
          "title": "扩展-小练",
          "slug": "扩展-小练",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 31.32,
    "words": 9396
  },
  "filePathRelative": "JavaLang/JavaSE/18-IO流.md"
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
