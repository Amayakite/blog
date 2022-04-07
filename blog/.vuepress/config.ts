import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  base: "/",
  plugins: [
    [
      // npm i @gerhobbelt/markdown-it-replace-link
      '@vuepress/docsearch',
      {
        appId: 'ZN9ZT0G3SP',
        apiKey: '0c443a348d38a9f6de9ac2d2d7672024',
        indexName: 'BlogSearch',
        // 显示最近的搜索结果
        disableUserPersonalization: false,
        locales: {
          '/': {
            placeholder: 'Search',
            translations: {
              button: {
                buttonText: '请输入要搜索的内容',
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
        href: "//at.alicdn.com/t/font_2768690_m8k7h6kvufb.css",
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
