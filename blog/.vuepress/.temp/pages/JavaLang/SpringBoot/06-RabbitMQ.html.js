export const data = {
  "key": "v-14a0023e",
  "path": "/JavaLang/SpringBoot/06-RabbitMQ.html",
  "title": "06-RabbitMQ",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "06-RabbitMQ",
    "date": "2021-12-27T22:56:30.000Z",
    "category": [
      "SpringBoot"
    ],
    "tag": [
      "RabbitMQ",
      "SpringBoot"
    ],
    "summary": "简介 感觉没啥好说的 暂时可以把这个玩意当成另一个Mysql或者Redis来看待，总之 是为了之后的Spring Cloud做铺垫 这里的课程看的是狂神的 这样说吧 RabbitMq具有接受数据、接受请求、存储数据、发送数据等技术服务 它有消息队列：负责数据的接收、存储和传递，性能远高于我们的Java代码 而消息中间件采用的并不是http协议，而常见的消息中",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/JavaLang/SpringBoot/06-RabbitMQ.html"
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
          "content": "06-RabbitMQ"
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
          "content": "RabbitMQ"
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
          "content": "2021-12-27T22:56:30.000Z"
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
      "children": [
        {
          "level": 3,
          "title": "AMQP协议",
          "slug": "amqp协议",
          "children": []
        },
        {
          "level": 3,
          "title": "MQTT协议",
          "slug": "mqtt协议",
          "children": []
        },
        {
          "level": 3,
          "title": "OpenMessage协议",
          "slug": "openmessage协议",
          "children": []
        },
        {
          "level": 3,
          "title": "Kafka协议",
          "slug": "kafka协议",
          "children": []
        },
        {
          "level": 3,
          "title": "消息分发策略的机制和对比",
          "slug": "消息分发策略的机制和对比",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "RabbitMQ的入门及安装",
      "slug": "rabbitmq的入门及安装",
      "children": [
        {
          "level": 3,
          "title": "普通的安装方式",
          "slug": "普通的安装方式",
          "children": []
        },
        {
          "level": 3,
          "title": "docker的安装方式",
          "slug": "docker的安装方式",
          "children": []
        },
        {
          "level": 3,
          "title": "RabbitMQ的角色权限相关说明",
          "slug": "rabbitmq的角色权限相关说明",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "RabbitMQ入门案例-Simple简单模式",
      "slug": "rabbitmq入门案例-simple简单模式",
      "children": [
        {
          "level": 3,
          "title": "代码实现",
          "slug": "代码实现",
          "children": []
        },
        {
          "level": 3,
          "title": "什么是AMQP",
          "slug": "什么是amqp",
          "children": []
        },
        {
          "level": 3,
          "title": "RabbitMQ的组件和架构",
          "slug": "rabbitmq的组件和架构",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "图形化操作",
      "slug": "图形化操作",
      "children": [
        {
          "level": 3,
          "title": "使用图形化界面完成HelloWorld",
          "slug": "使用图形化界面完成helloworld",
          "children": []
        },
        {
          "level": 3,
          "title": "Fanout-生产消费者模式-控制面板实现",
          "slug": "fanout-生产消费者模式-控制面板实现",
          "children": []
        },
        {
          "level": 3,
          "title": "Routing模式-路由模式-面板实现",
          "slug": "routing模式-路由模式-面板实现",
          "children": []
        },
        {
          "level": 3,
          "title": "Topic-模糊匹配的面板实现",
          "slug": "topic-模糊匹配的面板实现",
          "children": []
        },
        {
          "level": 3,
          "title": "Header模式-面板实现",
          "slug": "header模式-面板实现",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "代码实现",
      "slug": "代码实现-1",
      "children": [
        {
          "level": 3,
          "title": "准备工作-工具类",
          "slug": "准备工作-工具类",
          "children": []
        },
        {
          "level": 3,
          "title": "Fanout-生产消费者模式",
          "slug": "fanout-生产消费者模式",
          "children": []
        },
        {
          "level": 3,
          "title": "Routing-路由模式",
          "slug": "routing-路由模式",
          "children": []
        },
        {
          "level": 3,
          "title": "Topic-模糊匹配",
          "slug": "topic-模糊匹配",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "通过代码来完成绑定交换机和队列",
      "slug": "通过代码来完成绑定交换机和队列",
      "children": []
    },
    {
      "level": 2,
      "title": "Work-工作队列模式",
      "slug": "work-工作队列模式",
      "children": [
        {
          "level": 3,
          "title": "轮询模式",
          "slug": "轮询模式",
          "children": []
        },
        {
          "level": 3,
          "title": "公平分发模式",
          "slug": "公平分发模式",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "RabbitMq的实际应用场景",
      "slug": "rabbitmq的实际应用场景",
      "children": []
    },
    {
      "level": 2,
      "title": "SpringBoot整合RabbitMQ",
      "slug": "springboot整合rabbitmq",
      "children": [
        {
          "level": 3,
          "title": "添加依赖",
          "slug": "添加依赖",
          "children": []
        },
        {
          "level": 3,
          "title": "修改配置文件",
          "slug": "修改配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "Fanout模式-生产者",
          "slug": "fanout模式-生产者",
          "children": []
        },
        {
          "level": 3,
          "title": "Fanout模式-消费者",
          "slug": "fanout模式-消费者",
          "children": []
        },
        {
          "level": 3,
          "title": "Routing(direct)模式-路由",
          "slug": "routing-direct-模式-路由",
          "children": []
        },
        {
          "level": 3,
          "title": "TOPIC模式-模糊匹配（额外附带注解替换配置类）",
          "slug": "topic模式-模糊匹配-额外附带注解替换配置类",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "RabbitMQ高级开发",
      "slug": "rabbitmq高级开发",
      "children": [
        {
          "level": 3,
          "title": "过期时间TTL",
          "slug": "过期时间ttl",
          "children": []
        },
        {
          "level": 3,
          "title": "死信队列",
          "slug": "死信队列",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Rabbit内存磁盘的监控",
      "slug": "rabbit内存磁盘的监控",
      "children": []
    },
    {
      "level": 2,
      "title": "RabbitMQ的集群搭建",
      "slug": "rabbitmq的集群搭建",
      "children": [
        {
          "level": 3,
          "title": "主从节点",
          "slug": "主从节点",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "镜像集群",
      "slug": "镜像集群",
      "children": [
        {
          "level": 3,
          "title": "SpringBoot连接集群",
          "slug": "springboot连接集群",
          "children": []
        }
      ]
    }
  ],
  "readingTime": {
    "minutes": 49.47,
    "words": 14840
  },
  "filePathRelative": "JavaLang/SpringBoot/06-RabbitMQ.md"
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
