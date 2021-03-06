import { defineUserConfig } from "vuepress";
import themeConfig from "./themeConfig";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default defineUserConfig({
  base: "/",
  plugins: [
    docsearchPlugin({
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
    }),
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
      // 下面这个才是自己的 上面的是官方的
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2768690_hmnt01bfrp8.css",
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

  theme: themeConfig,
});
