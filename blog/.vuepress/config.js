const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Amayakite Blogs",
  description: "记录我",

  dest: "./dist",

  // 页头配置
  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],
  // I18N配置
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Amayakite Blogs",
      description: "使用vuepress-theme-hope的Blog",
    }

  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope-demo.mrhope.site",
    author: "Amayakite",
    repo: "https://github.com/Amayakite/Amayakite.github.io",

    // 配置Algolia搜索
    

    locales: {
      "/": {
        nav: require('./navBar'),
        sidebar:require('./sabBar'),
      },
    },

    // 个人信息相关配置
    blog: {
      name: "Amayakite",
      intro: "/intro/",
      sidebarDisplay: "mobile",

      // 不裁切头像
      roundAvatar: false,

      links: {
        Github: "https://github.com/Amayakite",
        Email: "Amayakite@qq.com",
      },
    },
    // 自定义主题色，第一个就是默认主题设
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
      Purple: "#b37feb",
    },
    footer: {
      display: true,
      content: "道阻且长，将行则至",
    },

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },
    copyright: {
      status: "global",
    },

    git: {
      timezone: "Asia/Shanghai",
    },
    // 开启markdown的mermaid流程图

    mdEnhance: {
      mermaid: true,
      // enableAll: true,
      // presentation: {
      //   plugins: [
      //     "highlight",
      //     "math",
      //     "search",
      //     "notes",
      //     "zoom",
      //     "anything",
      //     "audio",
      //     "chalkboard",
      //   ],
      // },
    },


    // // / 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    // repo: "vuejs/vuepress",
    // // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: "查看源码",
    // // 是否在导航栏右侧显示仓库链接，默认为 `true`
    // repoDisplay: true,

    // // 以下为可选的编辑链接选项

    // // 假如你的文档仓库和项目本身不在一个仓库:
    // docsRepo: "vuejs/vuepress",
    // // 假如文档不是放在仓库的根目录下:
    // docsDir: "docs",
    // // 假如文档放在一个特定的分支下，默认为 'main':
    // docsBranch: "main",
    // // 默认是 false, 设置为 true 来启用
    // editLinks: true,
    // // 默认为 "Edit this page"
    // editLinkText: "帮助我们改善此页面！",


    pwa: {
      favicon: "/logo.svg",
      // favicon: "/favicon.ico",
      cachePic: true,
      // apple: {
      //   icon: "/assets/icon/apple-icon-152.png",
      //   statusBarColor: "black",
      // },
      // msTile: {
      //   image: "/assets/icon/ms-icon-144.png",
      //   color: "#ffffff",
      // },
      //#region 
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
      //#endregion

    },
  },
});
