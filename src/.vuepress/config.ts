import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
// import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Amayakite Blogs",
  description: "鱼跃此时海，花开彼岸天",

  plugins: [

    // docsearchPlugin({
    //   appId: 'ZN9ZT0G3SP',
    //   apiKey: '0c443a348d38a9f6de9ac2d2d7672024',
    //   indexName: 'BlogSearch',
    //   // 显示最近的搜索结果
    //   disableUserPersonalization: false,
    //   locales: {
    //     '/': {
    //       placeholder: 'Search',
    //       translations: {
    //         button: {
    //           buttonText: '请输入要搜索的内容',
    //         },
    //       },
    //     },
    //   },
    // }),

    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          // @ts-ignore
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          // @ts-ignore
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    }),
  ],


  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

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
        href: "//at.alicdn.com/t/c/font_2768690_kly6b4q33kp.css",
      }
    ],
    // 百度统计
    [
      "script",
      {
        src: "https://hm.baidu.com/hm.js?8b5173a609d63c00dfbb514921e2b3af",
      }
    ]
  ],

});
