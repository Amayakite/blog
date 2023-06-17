import { navbar } from "vuepress-theme-hope";
export default navbar([
  "/",
  // "/home",
  { text: "Java学习笔记", link: "/JavaLang/", icon: "java" },
  { text: "Go学习笔记", link: "/GoLang/", icon: "golang" },
  { text: "Golang常用包", link: "/GoLang/Base/11-Golang常用包.md", icon: "golang" },
  {
    text: "实用链接",
    icon: "note",
    children: [
      { text: "VuePressTheme-Hope", icon: "vue", link: "https://theme-hope.vuejs.press/zh/" },
      {
        text: "Java常用网站", icon: 'java',
        children: [
          { text: "JDK1.8手册", icon: 'note', link: "https://www.matools.com/api/java8" },
          { text: "HuTool工具类库", icon: 'plugin', link: "https://www.hutool.cn/" },
          { text: "Sa-Token文档", icon: 'lock', link: "https://sa-token.dev33.cn/doc/index.html#/" },
          { text: "Maven仓库地址", icon: 'list', link: "https://mvnrepository.com/" },
          { text: "Spring官网", icon: 'leaf', link: "https://spring.io/" },
          { text: "Json在线解析", icon: 'script', link: "https://www.json.cn/" }
        ]
      }, {
        text: "GoLang常用网站", icon: 'creative',
        children: [
          { text: "GoLang官网", icon: 'golang', link: "https://golang.org/" },
          { text: "Golang仓库", icon: 'list', link: "https://pkg.go.dev/" },
          // { text: "GoLang中文文档", icon: 'group', link: "https://studygolang.com/pkgdoc" },
          { text: "GoLang学习文档", icon: 'group', link: "https://www.topgoer.com/" },
        ]
      }
    ],
  },
]);
