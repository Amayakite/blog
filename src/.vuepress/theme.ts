import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "http://www.amayakite.github.io",

  author: {
    name: "Amayakite",
    url: "https://github.com/Amayakite",
  },


  // 主题颜色配置
  themeColor: true,

  // 嵌套的深度
  headerDepth: 4,

  iconAssets: "fontawesome-with-brands",

  iconPrefix: "iconfont icon-",


  logo: "/logo.svg",

  // 仓库的地址
  repo: "https://github.com/Amayakite/blog",
  repoLabel: "GitHub",
  // 文档在的仓库
  docsRepo: "https://github.com/Amayakite/blog",
  // 文档在的分支
  docsBranch: "master",

  docsDir: "src",
  pure: true,

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "鱼跃此时海，花开彼岸天",

  displayFooter: true,

  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  blog: {
    description: "Amayakite",
    intro: "/intro.html",
    medias: {
      Github: "https://github.com/Amayakite",
      Email: "Amayakite@qq.com",
      Gitee: "https://gitee.com/Amayakite",
    },
  },

  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": ["1234"],
  //   },
  // },


  plugins: {
    blog: true,


    // comment: {
    //   // You should generate and use your own comment service
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },
    // 不启用评论功能
    comment: false,

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
