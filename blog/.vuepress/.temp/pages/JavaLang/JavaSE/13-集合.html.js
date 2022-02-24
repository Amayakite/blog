export const data = {
  "key": "v-9c19a09a",
  "path": "/JavaLang/JavaSE/13-%E9%9B%86%E5%90%88.html",
  "title": "13-集合",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "13-集合",
    "date": "2021-11-05T17:35:33.000Z",
    "category": [
      "JavaSE"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "Set",
      "Map",
      "List"
    ],
    "summary": "关于数组 好吧，在开始之前，得先了解一些东西，首先回顾一下之前常用的数组，想想他有什么不足的地方... emm大概有以下几点主要的，会让工作比较难受的： 1. 数组的长度开始时必须指定，而且一指定就无法修改其值 2. 保存的必须为同一类型的元素 3. 使用数组进行增加元素比较麻烦 好吧，集合就是来解决这个问题的，接下来开始一个本身并不难但是原理比较复杂的东西",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/JavaSE/13-%E9%9B%86%E5%90%88.html"
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
          "content": "13-集合"
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
          "content": "Set"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Map"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "List"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-11-05T17:35:33.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "关于数组",
      "slug": "关于数组",
      "children": []
    },
    {
      "level": 2,
      "title": "集合的简介",
      "slug": "集合的简介",
      "children": []
    },
    {
      "level": 2,
      "title": "框架体系图",
      "slug": "框架体系图",
      "children": [
        {
          "level": 3,
          "title": "Collection接口的子类构造图(单列集合-value)",
          "slug": "collection接口的子类构造图-单列集合-value",
          "children": []
        },
        {
          "level": 3,
          "title": "Map接口的构造图（双列集合-key-value）",
          "slug": "map接口的构造图-双列集合-key-value",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Collection接口的概述",
      "slug": "collection接口的概述",
      "children": [
        {
          "level": 3,
          "title": "Collection的特点",
          "slug": "collection的特点",
          "children": []
        },
        {
          "level": 3,
          "title": "Collection接口的常用方法",
          "slug": "collection接口的常用方法",
          "children": []
        },
        {
          "level": 3,
          "title": "Collection接口遍历元素的方式-Iterator(迭代器)",
          "slug": "collection接口遍历元素的方式-iterator-迭代器",
          "children": []
        },
        {
          "level": 3,
          "title": "Iterator接口的方法",
          "slug": "iterator接口的方法",
          "children": []
        },
        {
          "level": 3,
          "title": "Collection接口遍历元素的方式-增强for循环",
          "slug": "collection接口遍历元素的方式-增强for循环",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Collection接口的子接口：List实现类",
      "slug": "collection接口的子接口-list实现类",
      "children": [
        {
          "level": 3,
          "title": "List的基本介绍",
          "slug": "list的基本介绍",
          "children": []
        },
        {
          "level": 3,
          "title": "List中额外的方法",
          "slug": "list中额外的方法",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "ArrayList",
      "slug": "arraylist",
      "children": [
        {
          "level": 3,
          "title": "ArrayList注意事项",
          "slug": "arraylist注意事项",
          "children": []
        },
        {
          "level": 3,
          "title": "ArrayList的底层机制和源码分析(重点)",
          "slug": "arraylist的底层机制和源码分析-重点",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Vector",
      "slug": "vector",
      "children": []
    },
    {
      "level": 2,
      "title": "Vector底层结构和ArrayList的比较",
      "slug": "vector底层结构和arraylist的比较",
      "children": []
    },
    {
      "level": 2,
      "title": "LinkedList",
      "slug": "linkedlist",
      "children": [
        {
          "level": 3,
          "title": "底层结构",
          "slug": "底层结构",
          "children": []
        },
        {
          "level": 3,
          "title": "LinkedList底层结构",
          "slug": "linkedlist底层结构",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "ArrayList和LinkedList的比较",
      "slug": "arraylist和linkedlist的比较",
      "children": []
    },
    {
      "level": 2,
      "title": "Collection接口的子接口：Set实现类",
      "slug": "collection接口的子接口-set实现类",
      "children": [
        {
          "level": 3,
          "title": "基本介绍",
          "slug": "基本介绍-1",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "HashSet",
      "slug": "hashset",
      "children": [
        {
          "level": 3,
          "title": "基本介绍",
          "slug": "基本介绍-2",
          "children": []
        },
        {
          "level": 3,
          "title": "HashSet底层机制",
          "slug": "hashset底层机制",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "HashSet添加元素的底层机制",
      "slug": "hashset添加元素的底层机制",
      "children": [
        {
          "level": 3,
          "title": "空的HashSet添加元素的流程",
          "slug": "空的hashset添加元素的流程",
          "children": []
        },
        {
          "level": 3,
          "title": "添加了元素的HashSet继续添加第二个不同的元素",
          "slug": "添加了元素的hashset继续添加第二个不同的元素",
          "children": []
        },
        {
          "level": 3,
          "title": "添加了元素的HashSet继续添加一个相同的元素",
          "slug": "添加了元素的hashset继续添加一个相同的元素",
          "children": []
        },
        {
          "level": 3,
          "title": "总结-LinkedList的添加机制",
          "slug": "总结-linkedlist的添加机制",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "LinkedHashSet",
      "slug": "linkedhashset",
      "children": [
        {
          "level": 3,
          "title": "LinkedHashSet全面说明",
          "slug": "linkedhashset全面说明",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "TreeSet",
      "slug": "treeset",
      "children": [
        {
          "level": 3,
          "title": "基本介绍",
          "slug": "基本介绍-3",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Map接口的特点",
      "slug": "map接口的特点",
      "children": [
        {
          "level": 3,
          "title": "Map存放数据-Node和Entry",
          "slug": "map存放数据-node和entry",
          "children": []
        },
        {
          "level": 3,
          "title": "Map接口的常用方法",
          "slug": "map接口的常用方法",
          "children": []
        },
        {
          "level": 3,
          "title": "Map接口遍历方法",
          "slug": "map接口遍历方法",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "HashMap",
      "slug": "hashmap",
      "children": [
        {
          "level": 3,
          "title": "Put替换解析",
          "slug": "put替换解析",
          "children": []
        },
        {
          "level": 3,
          "title": "HashMap低层机制及源码剖析",
          "slug": "hashmap低层机制及源码剖析",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "HashTable",
      "slug": "hashtable",
      "children": []
    },
    {
      "level": 2,
      "title": "HashMap和HashTable的对比",
      "slug": "hashmap和hashtable的对比",
      "children": []
    },
    {
      "level": 2,
      "title": "Properties",
      "slug": "properties",
      "children": []
    },
    {
      "level": 2,
      "title": "TreeMap",
      "slug": "treemap",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 56.63,
    "words": 16989
  },
  "filePathRelative": "JavaLang/JavaSE/13-集合.md"
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
