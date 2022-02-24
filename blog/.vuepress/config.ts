import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  base: "/",

  plugins:[
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: '搜索',
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
