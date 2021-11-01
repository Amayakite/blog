module.exports = [
    { text: "博客主页", link: "/", icon: "home" },
    { text: "Java学习笔记", link: "/JavaLang/", icon: "java" },
    {
        text: "实用链接",
        icon: "note",
        items: [
            { text: "VuePressTheme-Hope", icon: "vue", link: "https://vuepress-theme-hope.github.io/zh/" },
            {
                text: "Java常用网站", icon: 'java',
                items: [
                    { text: "JDK1.8手册", icon: 'note', link: "https://www.matools.com/api/java8" },
                    { text: "HuTool工具类库", icon: 'plugin', link: "https://www.hutool.cn/" }
                ]
            },
        ]
    },
]