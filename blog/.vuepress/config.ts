import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  base: "/",

  plugins:[
    [
      '@vuepress/docsearch',
      {
        appId:'ZN9ZT0G3SP',
        apiKey: '0c443a348d38a9f6de9ac2d2d7672024',
        indexName: 'BlogSearch',
        // 显示最近的搜索结果
        disableUserPersonalization:true,
        locales: {
          '/': {
            placeholder: '搜索',
            translations: {
              button: {
                buttonText: '搜索文档',
              },
            },
          },
        },
      },
    ],
  ],

  title: "Amayakite Blogs",
  description: "记录我",

  dest: "./dist",
  
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      }
    ], [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2768690_h3hg655zy5.css",
      }
    ]
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Amayakite Blogs",
      description: "鱼跃此时海，花开彼岸天",
    }
  },

  themeConfig,
});
