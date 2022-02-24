export const data = {
  "key": "v-4d4f7b90",
  "path": "/JavaLang/SpringFrameWork/10-Mybatis.html",
  "title": "10-MyBatis",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "10-MyBatis",
    "date": "2021-12-15T00:32:37.000Z",
    "category": [
      "Spring-FrameWork"
    ],
    "tag": [
      "Java",
      "Spring",
      "Mysql",
      "Jdbc",
      "Mybatis"
    ],
    "summary": "基本介绍 回想下我们之前是怎么进行JDBC操作的 原始的JDBC开发存在的问题如下： 1. 数据库链接创建。释放频繁造成系统资源浪费从而影响系统性能 2. sql语句在代码中硬编码，造成代码不易维护，实际应用sql变化的可能较大， sql变动需要更改java代码 3. 查询操作时，需要手冻僵结果集中的数据手动封装到实体中，插入操作时，需要手动将实体的数据设置",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringFrameWork/10-Mybatis.html"
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
          "content": "10-MyBatis"
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
          "property": "article:tag",
          "content": "Mybatis"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-15T00:32:37.000Z"
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
      "children": []
    },
    {
      "level": 2,
      "title": "Mybatis的快速入门",
      "slug": "mybatis的快速入门",
      "children": [
        {
          "level": 3,
          "title": "添加Mybatis的依赖",
          "slug": "添加mybatis的依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "编写User的数据表和实体User类",
          "slug": "编写user的数据表和实体user类",
          "children": []
        },
        {
          "level": 3,
          "title": "编写映射文件UserMapper.xml",
          "slug": "编写映射文件usermapper-xml",
          "children": []
        },
        {
          "level": 3,
          "title": "编写核心文件SqlMapConfig.xml",
          "slug": "编写核心文件sqlmapconfig-xml",
          "children": []
        },
        {
          "level": 3,
          "title": "测试",
          "slug": "测试",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨Mybatis的映射文件概述",
      "slug": "✨mybatis的映射文件概述",
      "children": [
        {
          "level": 3,
          "title": "✨增删改查",
          "slug": "✨增删改查",
          "children": []
        },
        {
          "level": 3,
          "title": "Mybatis插入操作时的注意事项",
          "slug": "mybatis插入操作时的注意事项",
          "children": []
        },
        {
          "level": 3,
          "title": "Mybatis修改操作",
          "slug": "mybatis修改操作",
          "children": []
        },
        {
          "level": 3,
          "title": "✨增删改查映射配置与API",
          "slug": "✨增删改查映射配置与api",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨Mybatis核心配置文件概述",
      "slug": "✨mybatis核心配置文件概述",
      "children": [
        {
          "level": 3,
          "title": "environment 配置数据源环境",
          "slug": "environment-配置数据源环境",
          "children": []
        },
        {
          "level": 3,
          "title": "mappers 配置映射器",
          "slug": "mappers-配置映射器",
          "children": []
        },
        {
          "level": 3,
          "title": "通过Properties动态加载jdbc配置文件",
          "slug": "通过properties动态加载jdbc配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "typeAliases标签-设定别名-自定义别名",
          "slug": "typealiases标签-设定别名-自定义别名",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Mybatis相应的API",
      "slug": "mybatis相应的api",
      "children": [
        {
          "level": 3,
          "title": "SqlSession工厂构建器SqlSessionFactoryBuilder",
          "slug": "sqlsession工厂构建器sqlsessionfactorybuilder",
          "children": []
        },
        {
          "level": 3,
          "title": "✨SqlSessionFactory类",
          "slug": "✨sqlsessionfactory类",
          "children": []
        },
        {
          "level": 3,
          "title": "✨SqlSession会话对象类",
          "slug": "✨sqlsession会话对象类",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "MyBatis的Dao层实现",
      "slug": "mybatis的dao层实现",
      "children": [
        {
          "level": 3,
          "title": "传统实现",
          "slug": "传统实现",
          "children": []
        },
        {
          "level": 3,
          "title": "✨代理开发方式-注意事项",
          "slug": "✨代理开发方式-注意事项",
          "children": []
        },
        {
          "level": 3,
          "title": "✨代理开发方式-简单实现",
          "slug": "✨代理开发方式-简单实现",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "动态Sql语句",
      "slug": "动态sql语句",
      "children": [
        {
          "level": 3,
          "title": "✨动态SQL语句-IF",
          "slug": "✨动态sql语句-if",
          "children": []
        },
        {
          "level": 3,
          "title": "✨动态SQL语句-FOREACH",
          "slug": "✨动态sql语句-foreach",
          "children": []
        },
        {
          "level": 3,
          "title": "✨SQL对象的抽取（SQL模板）",
          "slug": "✨sql对象的抽取-sql模板",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "TypeHandlers标签",
      "slug": "typehandlers标签",
      "children": [
        {
          "level": 3,
          "title": "✨重写/自定义类转换器",
          "slug": "✨重写-自定义类转换器",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨✨Plugins标签（插件标签）",
      "slug": "✨✨plugins标签-插件标签",
      "children": [
        {
          "level": 3,
          "title": "扩展-pagehelper的配置",
          "slug": "扩展-pagehelper的配置",
          "children": []
        },
        {
          "level": 3,
          "title": "使用分页插件进行分页",
          "slug": "使用分页插件进行分页",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Mybatis的多表操作",
      "slug": "mybatis的多表操作",
      "children": [
        {
          "level": 3,
          "title": "一对一查询的模式",
          "slug": "一对一查询的模式",
          "children": []
        },
        {
          "level": 3,
          "title": "一对一查询的方式1---使用result普通属性接收",
          "slug": "一对一查询的方式1-使用result普通属性接收",
          "children": []
        },
        {
          "level": 3,
          "title": "✨一对一查询的方式2",
          "slug": "✨一对一查询的方式2",
          "children": []
        },
        {
          "level": 3,
          "title": "✨一对多的查询--使用Collection集合接收",
          "slug": "✨一对多的查询-使用collection集合接收",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Mybatis注解开发",
      "slug": "mybatis注解开发",
      "children": [
        {
          "level": 3,
          "title": "注解一览",
          "slug": "注解一览",
          "children": []
        },
        {
          "level": 3,
          "title": "✨注解开发-基本使用",
          "slug": "✨注解开发-基本使用",
          "children": []
        },
        {
          "level": 3,
          "title": "Mybatis注解实现复杂的映射开发（多表查询）",
          "slug": "mybatis注解实现复杂的映射开发-多表查询",
          "children": []
        },
        {
          "level": 3,
          "title": "✨@One注解",
          "slug": "✨-one注解",
          "children": []
        },
        {
          "level": 3,
          "title": "✨✨@Many注解",
          "slug": "✨✨-many注解",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 39.94,
    "words": 11981
  },
  "filePathRelative": "JavaLang/SpringFrameWork/10-Mybatis.md"
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
