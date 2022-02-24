export const data = {
  "key": "v-7ec58a7d",
  "path": "/JavaLang/SpringBoot/04-Redis.html",
  "title": "04-Redis",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "04-Redis",
    "date": "2021-12-22T18:08:20.000Z",
    "category": [
      "SpringBoot"
    ],
    "tag": [
      "Redis",
      "SpringBoot"
    ],
    "summary": "Redis Console 简介 这玩意 不太想多说是啥了 简单来说 就是一个在内存上的数据库，IO速度非常快~ 属于NOSql：不仅仅有SQL 主要是做并发之类的用的 以及解决集群之间数据的共享问题 Nosql可以在百亿数据集达到毫秒级查询 还可以减少sql压力之类的，例如查询到的结果存放到nosql中 以后别人要数据 如果nosql中有，直接在那里面拿 ",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringBoot/04-Redis.html"
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
          "content": "04-Redis"
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
          "content": "Redis"
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
          "content": "2021-12-22T18:08:20.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "简介",
      "slug": "简介",
      "children": []
    },
    {
      "level": 2,
      "title": "安装Redis",
      "slug": "安装redis",
      "children": []
    },
    {
      "level": 2,
      "title": "Redis的基本使用",
      "slug": "redis的基本使用",
      "children": []
    },
    {
      "level": 2,
      "title": "✨基本的操作",
      "slug": "✨基本的操作",
      "children": [
        {
          "level": 3,
          "title": "原子性操作",
          "slug": "原子性操作",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "String字符串",
      "slug": "string字符串",
      "children": []
    },
    {
      "level": 2,
      "title": "List列表",
      "slug": "list列表",
      "children": [
        {
          "level": 3,
          "title": "✨列表的常用操作",
          "slug": "✨列表的常用操作",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Set集合",
      "slug": "set集合",
      "children": [
        {
          "level": 3,
          "title": "✨Set集合的基本操作",
          "slug": "✨set集合的基本操作",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Hash（键值对）",
      "slug": "hash-键值对",
      "children": [
        {
          "level": 3,
          "title": "✨Hash的常用命令",
          "slug": "✨hash的常用命令",
          "children": []
        },
        {
          "level": 3,
          "title": "Hash的数据结构",
          "slug": "hash的数据结构",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Zset(有序集合)",
      "slug": "zset-有序集合",
      "children": [
        {
          "level": 3,
          "title": "✨Zset常用命令",
          "slug": "✨zset常用命令",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨Redis配置文件-基本配置",
      "slug": "✨redis配置文件-基本配置",
      "children": []
    },
    {
      "level": 2,
      "title": "Redis的发布和订阅",
      "slug": "redis的发布和订阅",
      "children": [
        {
          "level": 3,
          "title": "用Redis实现一个简单的消息订阅",
          "slug": "用redis实现一个简单的消息订阅",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Redis6的新数据类型",
      "slug": "redis6的新数据类型",
      "children": [
        {
          "level": 3,
          "title": "Bitmaps",
          "slug": "bitmaps",
          "children": []
        },
        {
          "level": 3,
          "title": "✨bitMaps的指令",
          "slug": "✨bitmaps的指令",
          "children": []
        },
        {
          "level": 3,
          "title": "BitMaps和set的对比",
          "slug": "bitmaps和set的对比",
          "children": []
        },
        {
          "level": 3,
          "title": "HyperLoglog",
          "slug": "hyperloglog",
          "children": []
        },
        {
          "level": 3,
          "title": "✨HyperLoglog的使用",
          "slug": "✨hyperloglog的使用",
          "children": []
        },
        {
          "level": 3,
          "title": "Geospatial",
          "slug": "geospatial",
          "children": []
        },
        {
          "level": 3,
          "title": "✨Geo的使用",
          "slug": "✨geo的使用",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Jedis--让Java操作Redis",
      "slug": "jedis-让java操作redis",
      "children": [
        {
          "level": 3,
          "title": "安装依赖",
          "slug": "安装依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "扩展-Docker修改容器端口",
          "slug": "扩展-docker修改容器端口",
          "children": []
        },
        {
          "level": 3,
          "title": "连接并使用redis",
          "slug": "连接并使用redis",
          "children": []
        },
        {
          "level": 3,
          "title": "Jedis实例-手机验证码",
          "slug": "jedis实例-手机验证码",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "✨SpringBoot整合redis",
      "slug": "✨springboot整合redis",
      "children": [
        {
          "level": 3,
          "title": "添加依赖",
          "slug": "添加依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "简单使用Spring-Redis",
          "slug": "简单使用spring-redis",
          "children": []
        },
        {
          "level": 3,
          "title": "配置Application中的redis项",
          "slug": "配置application中的redis项",
          "children": []
        },
        {
          "level": 3,
          "title": "使用jedis替换Lettuce",
          "slug": "使用jedis替换lettuce",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Redis的事务",
      "slug": "redis的事务",
      "children": [
        {
          "level": 3,
          "title": "✨Multi、Exec、Discard",
          "slug": "✨multi、exec、discard",
          "children": []
        },
        {
          "level": 3,
          "title": "事务解决数据冲突的问题",
          "slug": "事务解决数据冲突的问题",
          "children": []
        },
        {
          "level": 3,
          "title": "悲观锁",
          "slug": "悲观锁",
          "children": []
        },
        {
          "level": 3,
          "title": "乐观锁",
          "slug": "乐观锁",
          "children": []
        },
        {
          "level": 3,
          "title": "✨Watch key [key...]",
          "slug": "✨watch-key-key",
          "children": []
        },
        {
          "level": 3,
          "title": "unwatch",
          "slug": "unwatch",
          "children": []
        },
        {
          "level": 3,
          "title": "Redis事务三特性",
          "slug": "redis事务三特性",
          "children": []
        },
        {
          "level": 3,
          "title": "模拟一个简单的售票系统",
          "slug": "模拟一个简单的售票系统",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Lua",
      "slug": "lua",
      "children": []
    },
    {
      "level": 2,
      "title": "Redis持久化",
      "slug": "redis持久化",
      "children": [
        {
          "level": 3,
          "title": "RDB",
          "slug": "rdb",
          "children": []
        },
        {
          "level": 3,
          "title": "Rreis持久化路径的配置",
          "slug": "rreis持久化路径的配置",
          "children": []
        },
        {
          "level": 3,
          "title": "AOF",
          "slug": "aof",
          "children": []
        },
        {
          "level": 3,
          "title": "持久化的补充说明",
          "slug": "持久化的补充说明",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Redis主从复制",
      "slug": "redis主从复制",
      "children": [
        {
          "level": 3,
          "title": "配置主从集群",
          "slug": "配置主从集群",
          "children": []
        },
        {
          "level": 3,
          "title": "主从复制的特点",
          "slug": "主从复制的特点",
          "children": []
        },
        {
          "level": 3,
          "title": "哨兵模式",
          "slug": "哨兵模式",
          "children": []
        },
        {
          "level": 3,
          "title": "配置哨兵",
          "slug": "配置哨兵",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "集群",
      "slug": "集群",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 51.77,
    "words": 15530
  },
  "filePathRelative": "JavaLang/SpringBoot/04-Redis.md"
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
