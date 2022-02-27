import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  // 部署的域名
  //  hostname: "http://www.amayakite.gitee.io",
  hostname: "http://www.amayakite.github.io",

  // 嵌套的深度
  headingDepth: 3,

  // 深色配置 auto
  darkmode: "auto-switch",

  // 主题颜色配置
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },


  author: {
    name: "Amayakite",
    url: "https://github.com/Amayakite",
  },

  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",

  // 仓库的地址
  repo: "https://github.com/Amayakite/blog",
  repoLabel: "GitHub",
  // 文档在的仓库
  docsRepo: "https://github.com/Amayakite/blog",
  // 文档在的分支
  docsBranch: "master",
  docsDir: "blog",

  lastUpdated: true,
  contributors: true,
  editLink: true,


  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "鱼跃此时海，花开彼岸天",

  displayFooter: true,


  // page meta
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
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=2542896626&site=qq&menu=yes"
    },
  },

  // 加密配置 暂时用不上
  // encrypt: {
  //   config: {
  //     "/guide/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {


    // blog:true,

    blog: {
      // 给每个文章生成摘录
      autoExcerpt: true,
    },
    // 代码复制
    copyCode: {
      showInMobile: true,
    },

    comment: {
      type: "waline",
      // 不启用评论的功能
      comment: false,
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      enableAll: true,
      // 开启标注
      container: true,
      // 开启任务列表
      tasklist: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    pwa: {
      maxPicSize: 1024 * 2000,
      maxSize: 1024 * 20000,
      favicon: "/favicon.ico",
      cachePic: true,
      // apple: {
      //   icon: "/assets/icon/apple-icon-152.png",
      //   statusBarColor: "black",
      // },
      // msTile: {
      //   image: "/assets/icon/ms-icon-144.png",
      //   color: "#ffffff",
      // },
      // manifest: {
      //   icons: [
      //     {
      //       src: "/assets/icon/chrome-mask-512.png",
      //       sizes: "512x512",
      //       purpose: "maskable",
      //       type: "image/png",
      //     },
      //     {
      //       src: "/assets/icon/chrome-mask-192.png",
      //       sizes: "192x192",
      //       purpose: "maskable",
      //       type: "image/png",
      //     },
      //     {
      //       src: "/assets/icon/chrome-512.png",
      //       sizes: "512x512",
      //       type: "image/png",
      //     },
      //     {
      //       src: "/assets/icon/chrome-192.png",
      //       sizes: "192x192",
      //       type: "image/png",
      //     },
      //   ],
      //   shortcuts: [
      //     {
      //       name: "Guide",
      //       short_name: "Guide",
      //       url: "/guide/",
      //       icons: [
      //         {
      //           src: "/assets/icon/guide-maskable.png",
      //           sizes: "192x192",
      //           purpose: "maskable",
      //           type: "image/png",
      //         },
      //         {
      //           src: "/assets/icon/guide-monochrome.png",
      //           sizes: "192x192",
      //           purpose: "monochrome",
      //           type: "image/png",
      //         },
      //       ],
      //     },
      //   ],
      // },
    },
  },
});
