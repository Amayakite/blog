export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "博客主页",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "layout": "Blog",
    "icon": "home",
    "title": "博客主页",
    "heroImage": "/logo.svg",
    "heroText": "Amayakite Blog",
    "heroFullScreen": true,
    "tagline": "鱼跃此时海，花开彼岸天",
    "projects": [
      {
        "type": "project",
        "name": "项目名称",
        "desc": "项目详细描述",
        "link": "https://你的项目链接"
      },
      {
        "type": "link",
        "name": "链接名称",
        "desc": "链接详细描述",
        "link": "https://链接地址"
      },
      {
        "type": "book",
        "name": "书籍名称",
        "desc": "书籍详细描述",
        "link": "https://你的书籍链接"
      },
      {
        "type": "article",
        "name": "文章名称",
        "desc": "文章详细描述",
        "link": "https://你的文章链接"
      }
    ],
    "footer": "自定义你的页脚文字",
    "summary": "",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://www.amayakite.github.io/"
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
          "content": "博客主页"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "website"
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
      ]
    ]
  },
  "excerpt": "",
  "headers": [],
  "readingTime": {
    "minutes": 0.17,
    "words": 50
  },
  "filePathRelative": "README.md"
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
