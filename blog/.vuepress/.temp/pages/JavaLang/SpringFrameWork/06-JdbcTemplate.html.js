export const data = {
  "key": "v-53dc6721",
  "path": "/JavaLang/SpringFrameWork/06-JdbcTemplate.html",
  "title": "06-JdbcTemplate",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "06-JdbcTemplate",
    "date": "2021-12-13T00:03:05.000Z",
    "category": [
      "Spring-FrameWork"
    ],
    "tag": [
      "Java",
      "Spring",
      "SpringMvc",
      "JavaWeb"
    ],
    "summary": "概述 ​ 它是Spring框架中提供的一个对象，是对原始繁琐的JDBC APi对象进行简单封装，Spring为我们集成了多个消息模板类，例如：\r操作关系型数据库的JdbcTemplate和HibernateTemplate; \r操作Nosql数据库的RedisTemplate; \r操作消息队列的JmsTemplate; 等等诸多玩意 JDBCtemplate",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringFrameWork/06-JdbcTemplate.html"
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
          "content": "06-JdbcTemplate"
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
          "content": "SpringMvc"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "JavaWeb"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-13T00:03:05.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "概述",
      "slug": "概述",
      "children": [
        {
          "level": 3,
          "title": "JDBCtemplate就像是apache jdbc utils 跟那玩意差不多的作用",
          "slug": "jdbctemplate就像是apache-jdbc-utils-跟那玩意差不多的作用",
          "children": []
        },
        {
          "level": 3,
          "title": "JDBCTemplate开发步骤",
          "slug": "jdbctemplate开发步骤",
          "children": []
        },
        {
          "level": 3,
          "title": "Spring产生JDBCTemplate对象（配置文件 、注解配置文件）",
          "slug": "spring产生jdbctemplate对象-配置文件-、注解配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "使用JDBCTemplate进行增删改",
          "slug": "使用jdbctemplate进行增删改",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "使用jdbcTemplate进行查询的操作",
      "slug": "使用jdbctemplate进行查询的操作",
      "children": [
        {
          "level": 3,
          "title": "RowMapper接口",
          "slug": "rowmapper接口",
          "children": []
        },
        {
          "level": 3,
          "title": "✨BeanPropertyRowMapper的使用",
          "slug": "✨beanpropertyrowmapper的使用",
          "children": []
        },
        {
          "level": 3,
          "title": "✨queryForObject查询单个对象",
          "slug": "✨queryforobject查询单个对象",
          "children": []
        },
        {
          "level": 3,
          "title": "JDBCtemplate使用了RowMapper接口后接收参数",
          "slug": "jdbctemplate使用了rowmapper接口后接收参数",
          "children": []
        },
        {
          "level": 3,
          "title": "✨查询单个字段-queryForObject传入class",
          "slug": "✨查询单个字段-queryforobject传入class",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨✨  JdbcTemplate总结",
      "slug": "✨✨-jdbctemplate总结",
      "children": [
        {
          "level": 3,
          "title": "引入依赖",
          "slug": "引入依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "配置文件",
          "slug": "配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "增删改查",
          "slug": "增删改查",
          "children": []
        },
        {
          "level": 3,
          "title": "查询",
          "slug": "查询",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "其他操作",
      "slug": "其他操作",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 6.63,
    "words": 1989
  },
  "filePathRelative": "JavaLang/SpringFrameWork/06-JdbcTemplate.md"
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
