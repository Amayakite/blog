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
    "bgImage": "/homeBackground.jpg",
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
