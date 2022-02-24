export const data = {
  "key": "v-5bab3f14",
  "path": "/JavaLang/JavaSE/22-JDBC%E5%92%8C%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5%E6%B1%A0.html",
  "title": "22-JDBC和数据库连接池",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "22-JDBC和数据库连接池",
    "date": "2021-11-23T16:16:50.000Z",
    "category": [
      "JavaSE"
    ],
    "tag": [
      "Java",
      "JavaSE",
      "Mysql",
      "Jdbc"
    ],
    "summary": "JDBC概述 1. JDBC为访问不同的数据库提供了统一的接口，为使用者屏蔽了细节问题 2. Java程序员使用JDBC，可以连接任何提供了JDBC驱动程序的数据库系统，从而完成对数据库的基本操作 3. JBDC的原理图 4. 模拟一个简单的JDBC 先定义一个接口; 然后在定义一个实现类 然后给用户使用 其他数据库就是--实现那个接口，并完成相应的方法，以",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/JavaSE/22-JDBC%E5%92%8C%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5%E6%B1%A0.html"
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
          "content": "22-JDBC和数据库连接池"
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
          "content": "Mysql"
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
          "content": "2021-11-23T16:16:50.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "JDBC概述",
      "slug": "jdbc概述",
      "children": []
    },
    {
      "level": 2,
      "title": "JDBC快速入门",
      "slug": "jdbc快速入门",
      "children": [
        {
          "level": 3,
          "title": "注册驱动",
          "slug": "注册驱动",
          "children": []
        },
        {
          "level": 3,
          "title": "获取连接",
          "slug": "获取连接",
          "children": []
        },
        {
          "level": 3,
          "title": "执行增删改查和释放资源",
          "slug": "执行增删改查和释放资源",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "获取数据库连接的5种方式",
      "slug": "获取数据库连接的5种方式",
      "children": [
        {
          "level": 3,
          "title": "扩展-小练",
          "slug": "扩展-小练",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "查询-Select语句和ResultSet结果集",
      "slug": "查询-select语句和resultset结果集",
      "children": []
    },
    {
      "level": 2,
      "title": "Statement对象详解",
      "slug": "statement对象详解",
      "children": [
        {
          "level": 3,
          "title": "使用Statement演示sql注入",
          "slug": "使用statement演示sql注入",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "PreparedStatement的使用-预防SQL注入",
      "slug": "preparedstatement的使用-预防sql注入",
      "children": [
        {
          "level": 3,
          "title": "PreparedStatement-查询",
          "slug": "preparedstatement-查询",
          "children": []
        },
        {
          "level": 3,
          "title": "PreparedStatement-增删改记录",
          "slug": "preparedstatement-增删改记录",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "JDBC API一览（常用API）",
      "slug": "jdbc-api一览-常用api",
      "children": []
    },
    {
      "level": 2,
      "title": "封装 JDBCUtils",
      "slug": "封装-jdbcutils",
      "children": [
        {
          "level": 3,
          "title": "创建JbdcUtils工具类",
          "slug": "创建jbdcutils工具类",
          "children": []
        },
        {
          "level": 3,
          "title": "使用JbdcUtils工具类",
          "slug": "使用jbdcutils工具类",
          "children": []
        },
        {
          "level": 3,
          "title": "增删改模板",
          "slug": "增删改模板",
          "children": []
        },
        {
          "level": 3,
          "title": "查询模板",
          "slug": "查询模板",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "JBCD的事务",
      "slug": "jbcd的事务",
      "children": [
        {
          "level": 3,
          "title": "基本介绍",
          "slug": "基本介绍",
          "children": []
        },
        {
          "level": 3,
          "title": "应用案例：转账业务",
          "slug": "应用案例-转账业务",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "批处理",
      "slug": "批处理",
      "children": [
        {
          "level": 3,
          "title": "批处理源码的解析",
          "slug": "批处理源码的解析",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Mysql 数据库连接池",
      "slug": "mysql-数据库连接池",
      "children": [
        {
          "level": 3,
          "title": "传统获取Connection问题分析",
          "slug": "传统获取connection问题分析",
          "children": []
        },
        {
          "level": 3,
          "title": "数据库连接池的基本介绍",
          "slug": "数据库连接池的基本介绍",
          "children": []
        },
        {
          "level": 3,
          "title": "数据库连接池的种类",
          "slug": "数据库连接池的种类",
          "children": []
        },
        {
          "level": 3,
          "title": "C3P0连接池的使用",
          "slug": "c3p0连接池的使用",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Druid-最好的连接池",
      "slug": "druid-最好的连接池",
      "children": []
    },
    {
      "level": 2,
      "title": "JDBCUtils改进-使用Druid工具类",
      "slug": "jdbcutils改进-使用druid工具类",
      "children": []
    },
    {
      "level": 2,
      "title": "Apache-DButils",
      "slug": "apache-dbutils",
      "children": [
        {
          "level": 3,
          "title": "Apache-DButils的概述",
          "slug": "apache-dbutils的概述",
          "children": []
        },
        {
          "level": 3,
          "title": "Apache-DButils安装及使用",
          "slug": "apache-dbutils安装及使用",
          "children": []
        },
        {
          "level": 3,
          "title": "SQL中各个类型和JavaBean类型的对应关系",
          "slug": "sql中各个类型和javabean类型的对应关系",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "BasicDao",
      "slug": "basicdao",
      "children": [
        {
          "level": 3,
          "title": "DAO和增删改查通用方法-写一个basicDao",
          "slug": "dao和增删改查通用方法-写一个basicdao",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 38.25,
    "words": 11475
  },
  "filePathRelative": "JavaLang/JavaSE/22-JDBC和数据库连接池.md"
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
