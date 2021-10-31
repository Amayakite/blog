module.exports = {
    "/JavaLang/": [
        require('../JavaLang/sabBar'),
    ],
}

let a = {
    // "/": [
    //     "",
    //     "home",
    //     "slides",
    //     "layout",
    //     {
    //       title: "Guide",
    //       icon: "creative",
    //       prefix: "guide/",
    //       children: ["", "page", "markdown", "disable", "encrypt"],
    //     },
    //   ],
    "/JavaLang/": [
        {
            title: "1-基础部分",
            icon: "creative",
            prefix: "JavaLang/",
            // children: require('../JavaLang/sabBar')
            children: [
                "notes/01-Java的特点",
                "notes/02-开始使用Java",
                "notes/03-变量",
                "notes/04-键盘输入语句",
                "notes/05-流程控制",
                "notes/06-数组",
                "notes/07-类与对象",
                "notes/08-包_封装与继承"]
        },
    ],

}
