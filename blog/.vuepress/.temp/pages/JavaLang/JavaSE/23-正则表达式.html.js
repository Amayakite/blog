export const data = {
  "key": "v-72bde952",
  "path": "/JavaLang/JavaSE/23-%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html",
  "title": "23-正则表达式",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "23-正则表达式",
    "date": "2021-11-29T21:49:05.000Z",
    "category": [
      "JavaSE"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "RegExp"
    ],
    "summary": "初始正则表达式 假设你现在通过爬虫之类的东西，从百度中爬取到了以下文本 现在有一个需求，获取到文章中的所有英文单词 使用传统的方法将要: 二十六个字母大小写都要过一遍，并且要识别下一个是不字母，是的话拼接，不是的话return 接下来使用正则表达式来解决这个问题 可以看到，完美的打印出了我想要的内容： 好，接下来尝试匹配数字 只需要替换一段话即可 然后再匹配",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/JavaSE/23-%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html"
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
          "content": "23-正则表达式"
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
          "content": "RegExp"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-11-29T21:49:05.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "初始正则表达式",
      "slug": "初始正则表达式",
      "children": []
    },
    {
      "level": 2,
      "title": "正则表达式的底层实现",
      "slug": "正则表达式的底层实现",
      "children": [
        {
          "level": 3,
          "title": "find方法和group(0)的源码分析",
          "slug": "find方法和group-0-的源码分析",
          "children": []
        },
        {
          "level": 3,
          "title": "在分组情况下的源码分析",
          "slug": "在分组情况下的源码分析",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "正则表达式语法",
      "slug": "正则表达式语法",
      "children": [
        {
          "level": 3,
          "title": "元字符-转义号及常用匹配符",
          "slug": "元字符-转义号及常用匹配符",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "正则表达式-元字符-字符匹配符",
      "slug": "正则表达式-元字符-字符匹配符",
      "children": []
    },
    {
      "level": 2,
      "title": "元字符-选择匹配符",
      "slug": "元字符-选择匹配符",
      "children": []
    },
    {
      "level": 2,
      "title": "元字符-限定符",
      "slug": "元字符-限定符",
      "children": []
    },
    {
      "level": 2,
      "title": "元字符-定位符",
      "slug": "元字符-定位符",
      "children": []
    },
    {
      "level": 2,
      "title": "分组和捕获",
      "slug": "分组和捕获",
      "children": []
    },
    {
      "level": 2,
      "title": "几个常用的分组形式-非捕获匹配",
      "slug": "几个常用的分组形式-非捕获匹配",
      "children": []
    },
    {
      "level": 2,
      "title": "正则表达式一览表（全）",
      "slug": "正则表达式一览表-全",
      "children": [
        {
          "level": 3,
          "title": "补充-贪婪匹配和非贪婪匹配",
          "slug": "补充-贪婪匹配和非贪婪匹配",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "正则匹配实例",
      "slug": "正则匹配实例",
      "children": [
        {
          "level": 3,
          "title": "匹配汉字",
          "slug": "匹配汉字",
          "children": []
        },
        {
          "level": 3,
          "title": "邮政编码",
          "slug": "邮政编码",
          "children": []
        },
        {
          "level": 3,
          "title": "QQ号码",
          "slug": "qq号码",
          "children": []
        },
        {
          "level": 3,
          "title": "手机号码",
          "slug": "手机号码",
          "children": []
        },
        {
          "level": 3,
          "title": "URL链接",
          "slug": "url链接",
          "children": []
        },
        {
          "level": 3,
          "title": "邮箱",
          "slug": "邮箱",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "正则表达式三个常用类",
      "slug": "正则表达式三个常用类",
      "children": [
        {
          "level": 3,
          "title": "Pattern类",
          "slug": "pattern类",
          "children": []
        },
        {
          "level": 3,
          "title": "Matcher类",
          "slug": "matcher类",
          "children": []
        },
        {
          "level": 3,
          "title": "PatternSyntaxExeception",
          "slug": "patternsyntaxexeception",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "分组、捕获、反向引用",
      "slug": "分组、捕获、反向引用",
      "children": [
        {
          "level": 3,
          "title": "外部反向引用使用-使用外部反向引用解决结巴的问题",
          "slug": "外部反向引用使用-使用外部反向引用解决结巴的问题",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "在String类中使用正则表达式",
      "slug": "在string类中使用正则表达式",
      "children": []
    },
    {
      "level": 2,
      "title": "扩展-验证一个数字是否是整数或者小数",
      "slug": "扩展-验证一个数字是否是整数或者小数",
      "children": []
    },
    {
      "level": 2,
      "title": "扩展-解析出一个URL中的字段",
      "slug": "扩展-解析出一个url中的字段",
      "children": []
    },
    {
      "level": 2,
      "title": "扩展-Java正则表达式大全",
      "slug": "扩展-java正则表达式大全",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 42.58,
    "words": 12774
  },
  "filePathRelative": "JavaLang/JavaSE/23-正则表达式.md"
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
