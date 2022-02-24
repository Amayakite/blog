export const siteData = {
  "base": "/",
  "lang": "en-US",
  "title": "Amayakite Blogs",
  "description": "记录我",
  "head": [
    [
      "link",
      {
        "rel": "stylesheet",
        "href": "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css"
      }
    ],
    [
      "link",
      {
        "rel": "stylesheet",
        "href": "//at.alicdn.com/t/font_2768690_h3hg655zy5.css"
      }
    ],
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "link",
      {
        "rel": "manifest",
        "href": "/manifest.webmanifest",
        "crossorigin": "use-credentials"
      }
    ],
    [
      "meta",
      {
        "name": "theme-color",
        "content": "#46bd87"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
      }
    ]
  ],
  "locales": {
    "/": {
      "lang": "zh-CN",
      "title": "Amayakite Blogs",
      "description": "鱼跃此时海，花开彼岸天"
    }
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
