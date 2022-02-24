export const data = {
  "key": "v-719d6ef7",
  "path": "/JavaLang/SpringBoot/08-Elasticsearch.html",
  "title": "08-ElasticSearch",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "08-ElasticSearch",
    "date": "2021-12-30T22:45:50.000Z",
    "category": [
      "SpringBoot"
    ],
    "tag": [
      "ElasticSearch",
      "SpringBoot"
    ],
    "summary": "简介 我们在实际开发过程中可能会遇到三种数据类型\r结构化数据; \r例如用户的账号、密码、年龄等; \r这些信息是有关系的，所以我们可以保存到关系型数据库内; \r但是这玩意也有缺点; \r结构是固定死了的，我们已经有了固定结构之后在想添加新的字段扩展不方便; \r非结构化数据; \r人话：我们无法用二维表表示的东西; \r比方说服务器日志、我们的通信记录、我们的工作文档",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringBoot/08-Elasticsearch.html"
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
          "content": "08-ElasticSearch"
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
          "content": "ElasticSearch"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "SpringBoot"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-12-30T22:45:50.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "ElasticSearch概述",
      "slug": "elasticsearch概述",
      "children": [
        {
          "level": 3,
          "title": "全文搜索引擎",
          "slug": "全文搜索引擎",
          "children": []
        },
        {
          "level": 3,
          "title": "ElasticSearch And Solr",
          "slug": "elasticsearch-and-solr",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "下载及安装",
      "slug": "下载及安装",
      "children": []
    },
    {
      "level": 2,
      "title": "数据格式",
      "slug": "数据格式",
      "children": [
        {
          "level": 3,
          "title": "创建索引-PUT",
          "slug": "创建索引-put",
          "children": []
        },
        {
          "level": 3,
          "title": "索引的查询、删除-GET/DELETE",
          "slug": "索引的查询、删除-get-delete",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "创建文档-POST",
      "slug": "创建文档-post",
      "children": []
    },
    {
      "level": 2,
      "title": "查询文档-主键查询",
      "slug": "查询文档-主键查询",
      "children": []
    },
    {
      "level": 2,
      "title": "查询文档-全查询",
      "slug": "查询文档-全查询",
      "children": []
    },
    {
      "level": 2,
      "title": "修改文档-全量修改",
      "slug": "修改文档-全量修改",
      "children": []
    },
    {
      "level": 2,
      "title": "修改文档-局部修改",
      "slug": "修改文档-局部修改",
      "children": []
    },
    {
      "level": 2,
      "title": "删除文档",
      "slug": "删除文档",
      "children": []
    },
    {
      "level": 2,
      "title": "查询文档-条件查询",
      "slug": "查询文档-条件查询",
      "children": []
    },
    {
      "level": 2,
      "title": "查询文档-分页查询",
      "slug": "查询文档-分页查询",
      "children": []
    },
    {
      "level": 2,
      "title": "查询文档-指定返回字段",
      "slug": "查询文档-指定返回字段",
      "children": []
    },
    {
      "level": 2,
      "title": "查询文档-结果排序",
      "slug": "查询文档-结果排序",
      "children": []
    },
    {
      "level": 2,
      "title": "查询文档-多条件查询、范围查询",
      "slug": "查询文档-多条件查询、范围查询",
      "children": []
    },
    {
      "level": 2,
      "title": "文档查询-完全匹配查询",
      "slug": "文档查询-完全匹配查询",
      "children": []
    },
    {
      "level": 2,
      "title": "文档查询-结果高亮显示",
      "slug": "文档查询-结果高亮显示",
      "children": []
    },
    {
      "level": 2,
      "title": "文章查询-聚合查询",
      "slug": "文章查询-聚合查询",
      "children": [
        {
          "level": 3,
          "title": "分组",
          "slug": "分组",
          "children": []
        },
        {
          "level": 3,
          "title": "只取统计的字段",
          "slug": "只取统计的字段",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "平均值等",
      "slug": "平均值等",
      "children": []
    },
    {
      "level": 2,
      "title": "字段类型的约束（声明类型）",
      "slug": "字段类型的约束-声明类型",
      "children": []
    },
    {
      "level": 2,
      "title": "Java API",
      "slug": "java-api",
      "children": [
        {
          "level": 3,
          "title": "环境准备",
          "slug": "环境准备",
          "children": []
        },
        {
          "level": 3,
          "title": "创建索引",
          "slug": "创建索引",
          "children": []
        },
        {
          "level": 3,
          "title": "查询索引",
          "slug": "查询索引",
          "children": []
        },
        {
          "level": 3,
          "title": "删除索引",
          "slug": "删除索引",
          "children": []
        },
        {
          "level": 3,
          "title": "新建文档",
          "slug": "新建文档",
          "children": []
        },
        {
          "level": 3,
          "title": "修改文档",
          "slug": "修改文档",
          "children": []
        },
        {
          "level": 3,
          "title": "查询文档",
          "slug": "查询文档",
          "children": []
        },
        {
          "level": 3,
          "title": "删除文档",
          "slug": "删除文档-1",
          "children": []
        },
        {
          "level": 3,
          "title": "批量插入",
          "slug": "批量插入",
          "children": []
        },
        {
          "level": 3,
          "title": "文档操作-批量删除",
          "slug": "文档操作-批量删除",
          "children": []
        },
        {
          "level": 3,
          "title": "高级查询-全量查询",
          "slug": "高级查询-全量查询",
          "children": []
        },
        {
          "level": 3,
          "title": "条件查询",
          "slug": "条件查询",
          "children": []
        },
        {
          "level": 3,
          "title": "分页查询",
          "slug": "分页查询",
          "children": []
        },
        {
          "level": 3,
          "title": "查询结果排序",
          "slug": "查询结果排序",
          "children": []
        },
        {
          "level": 3,
          "title": "过滤字段",
          "slug": "过滤字段",
          "children": []
        },
        {
          "level": 3,
          "title": "组合查询",
          "slug": "组合查询",
          "children": []
        },
        {
          "level": 3,
          "title": "范围查询",
          "slug": "范围查询",
          "children": []
        },
        {
          "level": 3,
          "title": "模糊查询",
          "slug": "模糊查询",
          "children": []
        },
        {
          "level": 3,
          "title": "高量查询",
          "slug": "高量查询",
          "children": []
        },
        {
          "level": 3,
          "title": "最大值查询",
          "slug": "最大值查询",
          "children": []
        },
        {
          "level": 3,
          "title": "分组查询",
          "slug": "分组查询",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "单机和集群",
      "slug": "单机和集群",
      "children": []
    },
    {
      "level": 2,
      "title": "集群Cluster",
      "slug": "集群cluster",
      "children": []
    },
    {
      "level": 2,
      "title": "节点Node",
      "slug": "节点node",
      "children": []
    },
    {
      "level": 2,
      "title": "Windows下部署集群",
      "slug": "windows下部署集群",
      "children": []
    },
    {
      "level": 2,
      "title": "Linux下的ES的安装",
      "slug": "linux下的es的安装",
      "children": []
    },
    {
      "level": 2,
      "title": "原理分析",
      "slug": "原理分析",
      "children": [
        {
          "level": 3,
          "title": "单节点集群和故障转移",
          "slug": "单节点集群和故障转移",
          "children": []
        },
        {
          "level": 3,
          "title": "水平扩容",
          "slug": "水平扩容",
          "children": []
        },
        {
          "level": 3,
          "title": "应对故障",
          "slug": "应对故障",
          "children": []
        },
        {
          "level": 3,
          "title": "路由计算和分片控制",
          "slug": "路由计算和分片控制",
          "children": []
        },
        {
          "level": 3,
          "title": "数据写流程",
          "slug": "数据写流程",
          "children": []
        },
        {
          "level": 3,
          "title": "数据读流程",
          "slug": "数据读流程",
          "children": []
        },
        {
          "level": 3,
          "title": "更新流程和批量处理流程",
          "slug": "更新流程和批量处理流程",
          "children": []
        },
        {
          "level": 3,
          "title": "分片原理和倒排索引",
          "slug": "分片原理和倒排索引",
          "children": []
        },
        {
          "level": 3,
          "title": "文档搜索-索引更新规则",
          "slug": "文档搜索-索引更新规则",
          "children": []
        },
        {
          "level": 3,
          "title": "文档分析",
          "slug": "文档分析",
          "children": []
        },
        {
          "level": 3,
          "title": "内置分析器",
          "slug": "内置分析器",
          "children": []
        },
        {
          "level": 3,
          "title": "分析器的使用场景",
          "slug": "分析器的使用场景",
          "children": []
        },
        {
          "level": 3,
          "title": "指定分词器",
          "slug": "指定分词器",
          "children": []
        },
        {
          "level": 3,
          "title": "IK分词器",
          "slug": "ik分词器",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义分析器",
          "slug": "自定义分析器",
          "children": []
        },
        {
          "level": 3,
          "title": "文档冲突的解决方案",
          "slug": "文档冲突的解决方案",
          "children": []
        },
        {
          "level": 3,
          "title": "乐观并发控制",
          "slug": "乐观并发控制",
          "children": []
        },
        {
          "level": 3,
          "title": "外部系统版本控制",
          "slug": "外部系统版本控制",
          "children": []
        },
        {
          "level": 3,
          "title": "Kibana",
          "slug": "kibana",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Spring Data框架集成",
      "slug": "spring-data框架集成",
      "children": [
        {
          "level": 3,
          "title": "Spring Data介绍",
          "slug": "spring-data介绍",
          "children": []
        },
        {
          "level": 3,
          "title": "Spring Boot集成",
          "slug": "spring-boot集成",
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
          "title": "索引的基本添加和删除",
          "slug": "索引的基本添加和删除",
          "children": []
        },
        {
          "level": 3,
          "title": "文档的基本操作",
          "slug": "文档的基本操作",
          "children": []
        },
        {
          "level": 3,
          "title": "文档搜索",
          "slug": "文档搜索",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Spark和Filnk框架集成ES",
      "slug": "spark和filnk框架集成es",
      "children": []
    },
    {
      "level": 2,
      "title": "硬件的选择",
      "slug": "硬件的选择",
      "children": []
    },
    {
      "level": 2,
      "title": "分片策略",
      "slug": "分片策略",
      "children": []
    },
    {
      "level": 2,
      "title": "写入优化",
      "slug": "写入优化",
      "children": []
    },
    {
      "level": 2,
      "title": "内存设置",
      "slug": "内存设置",
      "children": []
    },
    {
      "level": 2,
      "title": "重要配置项",
      "slug": "重要配置项",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 75.97,
    "words": 22790
  },
  "filePathRelative": "JavaLang/SpringBoot/08-Elasticsearch.md"
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
