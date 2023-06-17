---
title: 01-初识React
date: 2022-4-29 20:48:24
category: React
tag:
 - React
---

## 概述

现在的时间是2022年4月29日，为啥要学习React呢？

我之前已经学习过一次React了，大概在去年的七月份，当然我平常用的都是Vue，这次记笔记相当于React二次学习样，我学习它的理由比较简单

- 忘了React咋用
- 想了解下React最新版本（React18）
- 感觉React和Typescript契合比较好

本系列文章使用的React版本为React18，一些简单的东西将会一笔带过，不会深入的说明（例如state之类的简单的绑定）

::: warning

在你开始学习这里前，我希望你拥有以下技能

- HTML、CSS、JavaScript的基本使用
- 了解或学习过**Typescript**（非常重要，或者熟悉常用的面对对象的编程语言的语法）
- 学习过VueJs（2或者3都可 最好是3+Typescript）
- Nodejs的基本使用
- http之类的基本了解（熟悉后端最好）

:::

## Hello React

这里就不使用Vite之类的进阶框架来搭建了，使用[官方文档](https://react.docschina.org/docs/create-a-new-react-app.html)中描述的来进行搭建

首先给npm或者yarn换源（就是换成[淘宝源](https://npmmirror.com/)）

```shell
# npm
npm config set registry https://registry.npmmirror.com
# yarn
yarn config set registry https://registry.npmmirror.com
```

然后

```shell
npx create-react-app 01-react
# 如果想用yarn
yarn create react-app 01-react

# 使用Typescript（推荐，个人使用的时候将一直用它）
npx create-react-app 01-react --template typescript
# or 
yarn create react-app 01-react --template typescript
```

我这里使用的是yarn（习惯了hhh）

它实际上安装了三个大件

- React：顶级库
- React-dom：因为React有很多运行环境，例如app端的react-native，要在web上运行就用react-dom即可
- react-scripts：包含运行和打包react应用程序的所有脚本和配置

额外说明：scripts是基于Webpack构建的

安装完毕后，cd进去，运行

```shell
npm run start
yarn start
```

不出意外的话，你将能看到如下界面

![image-20220429212454706](/images/Web/React/01-初识React/image-20220429212454706.png)

为了统一规范，后续的学习我将默认你使用的是yarn和Typescript

接下来删除掉Src目录下的所有文件(除了index.tsx)

然后index.tsx替换成如下的代码

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 创建react实例
const root = ReactDOM.createRoot(
   //绑定id
  document.getElementById('root') as HTMLElement
);
// 渲染内容 这里直接写dom即可
root.render(
    // 这里的StrictMode是开启严格模式，不符合规范的代码console(包括子组件)会报error 如果不需要可以直接换成别的 例如<></>
  <React.StrictMode>
    <h1>Hello World</h1>
  </React.StrictMode>
);
```

接下来刷新月面，可以看到你的Hello World出来了

![image-20220429214214724](/images/Web/React/01-初识React/image-20220429214214724.png)

## 组件-Component

如果你学过Vue或者说Java的SpringBoot的话，对这个应该不陌生，无论是路由导航或者是MVC概念，接下来我们建立一个自己的组件Person

### 创建一个组件-组件式

```tsx
// src\component\Person\index.tsx
import React, { Component } from 'react'

// 注意继承下这个Component，否则将无法使用
// 同时render()这个函数是固定的，无法更换
// PS:在vscode中装个react插件然后输入rcc可以快速生成
export default class Person extends Component {
    render() {
        // 注意 这里面有一个Return
        return (
            <div>
                <p>Name: <span>张三</span></p>
                <p>Age: <span>18</span></p>
            </div>
        )
    }
}
```

接下来在APP.tsx中引用它

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Person from './component/Person';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Person />
  </React.StrictMode>
);
```

然后就能看到页面更新成了我们想要的内容

![image-20220429220237792](/images/Web/React/01-初识React/image-20220429220237792.png)

当然，这个东西是可以嵌套使用的，这里就不多做展示了

### 创建一个组件-函数式

```tsx
function Person(){
    return (
        <div>
            <p>Name: <span>张三</span></p>
            <p>Age: <span>18</span></p>
        </div>
    )
}
export default Person
```

这个的作用等效于上面的组件式，也叫函数式组件，React之后有一个叫hook的东西，就是简历在函数式组件的基础上的，这个之后再说明，目前来说，你可以这样写

```tsx
import React, { Component } from 'react'

const PersonInfo = () => {
    return (
        <div>
            <p>Name: <span>张三</span></p>
            <p>Age: <span>18</span></p>
        </div>
    )
}

const UserPage = ():JSX.Element => {
    return (
        <>
            Hello This is a User page
        </>
    )
}

export default class Person extends Component {
    render() {
        return (
            <div>
                <PersonInfo />
                <UserPage />
            </div>
        )
    }
}

```

当然你还可以再次简化，让其全部变成函数的，这里也不多做展示了

### 渲染简单的数据和样式绑定

例如渲染一点数值或者函数，只需要进行如下的操作即可，也就是使用`{}`

```tsx
import React, { Component } from 'react'


const UserName = "张三"
const UserAge1 = 10
const UserAge2 = 20


export default class Person extends Component {
    render() {
        return (
            <div>
                <p>UserName:{UserName}</p>
                <p>UserAge:{UserAge1 + UserAge2}</p>
            </div>
        )
    }
}
```

如果你学习过Vue，对这个这个大括号不陌生，这里跟Vue的不同之处在于，Vue是双大括号，而React中是单大括号

同理，如果你想要渲染CSS样式的话，也是需要这样操作，style只能这样绑定

```tsx
import React, { Component } from 'react'


const UserName = "张三"
const UserAge1 = 10
const UserAge2 = 20

const cssStyle: React.CSSProperties = {
    backgroundColor: "blue",
    fontSize: "30px"
}

export default class Person extends Component {
    render() {
        return (
            <div>
                {/* 使用变量 */}
                <p style={cssStyle}>UserName:{UserName}</p>
                {/* 内联变量 */}
                <p style={{backgroundColor:"gray",fontSize:"11px"}}>UserAge:{UserAge1 + UserAge2}</p>
            </div>
        )
    }
}

```

### Input和Check组件的默认值绑定

可以这样

```tsx
<input type="text" defaultValue="默认值" />
```

Check之类的同理，

### 绑定样式-外链、scoped、scss

这里我拿`scss`举例，要在react中使用它，需要先安装个node-sass

```shell
yarn add  -D node-sass@版本号
```

> PS:Node-sass安装有坑
>
> 首先看看自己的nodejs版本
>
> ```shell
> node -v
> # v16.14.2
> ```
>
> 然后进入官网[sass/node-sass: Node.js bindings to libsass (github.com)](https://github.com/sass/node-sass/tree/master)
>
> | NodeJS版本 | Supported node-sass version<br />Node-Sass兼容的版本 | Node Module |
> | ---------- | ---------------------------------------------------- | ----------- |
> | Node 17    | 7.0+                                                 | 102         |
> | Node 16    | 6.0+                                                 | 93          |
> | Node 15    | 5.0+, <7.0                                           | 88          |
> | Node 14    | 4.14+                                                | 83          |
> | Node 13    | 4.13+, <5.0                                          | 79          |
> | Node 12    | 4.12+                                                | 72          |
> | Node 11    | 4.10+, <5.0                                          | 67          |
> | Node 10    | 4.9+, <6.0                                           | 64          |
> | Node 8     | 4.5.3+, <5.0                                         | 57          |
> | Node <8    | <5.0                                                 | <57         |
>
> 可以看到如上内容，根据自己的版本来进行安装
>
> 例如我是node16，根据上方提示，可以安装6.0+，目前我这里看到的最新的是7.0.1，则我这样：
>
> ```shell
> yarn add -D node-sass@7 
> ```
>
> 即可，其他版本同理
>
> > **注意**：接下来的步骤比较重要，对于Typescript而言，**不进行下面的后面的scpoed将无法正常使用**
> >
> > 首先在项目的根路径（package.json同级别下）创建`typed-css.d.ts`文件
> >
> > ```typescript
> > //typed-css.d.ts
> > declare module '*.module.css' {
> >     const classes: { readonly [key: string]: string }
> >     export default classes
> > }
> > 
> > declare module '*.module.sass' {
> >     const classes: { readonly [key: string]: string }
> >     export default classes
> > }
> > 
> > declare module '*.module.scss' {
> >     const classes: { readonly [key: string]: string }
> >     export default classes
> > }
> > 
> > ```
> >
> > 接着在tsconfig.json中加入
> >
> > ```json {25}
> > {
> >   "compilerOptions": {
> >     "target": "es5",
> >     "lib": [
> >       "dom",
> >       "dom.iterable",
> >       "esnext"
> >     ],
> >     "allowJs": true,
> >     "skipLibCheck": true,
> >     "esModuleInterop": true,
> >     "allowSyntheticDefaultImports": true,
> >     "strict": true,
> >     "forceConsistentCasingInFileNames": true,
> >     "noFallthroughCasesInSwitch": true,
> >     "module": "esnext",
> >     "moduleResolution": "node",
> >     "resolveJsonModule": true,
> >     "isolatedModules": true,
> >     "noEmit": true,
> >     "jsx": "react-jsx"
> >   },
> >   "include": [
> >     "src",
> >     "typed-css.d.ts"
> >   ]
> > }
> > ```
> >
> > 不加的话后面会报错

当然你也可以用普通的css

接着创建一个文件

```scss
// style.scss
.person {
    background-color: aqua;
    font-size: 30px;
    color: rgb(240, 4, 4);
}

```

接着使用

```tsx
import React, { Component } from 'react'
import "./style.scss"

const UserName = "张三"
const UserAge1 = 10
const UserAge2 = 20

export default class Person extends Component {
    render() {
        return (
            <div>
                {/* 直接使用 */}
                <p className="person">UserName:{UserName}</p>
                <p >UserAge:{UserAge1 + UserAge2}</p>
            </div>
        )
    }
}

```

当然，开发中往往很多地方可能要用到局部的（也就是不会对之后的文件，无论是父还是子组件都不会受影响的样式）

则可以这样做

```scss
//style.module.scss
.person {
    background-color: aqua;
    font-size: 30px;
    color: rgb(240, 4, 4);
}
```

接着这样调用

```tsx {12}
import React, { Component } from 'react'
import myStyle from "./style.module.scss"

const UserName = "张三"
const UserAge1 = 10
const UserAge2 = 20

export default class Person extends Component {
    render() {
        return (
            <div>
                <p className={myStyle["person"]}>UserName:{UserName}</p>
                <p >UserAge:{UserAge1 + UserAge2}</p>
            </div>
        )
    }
}
```

接着看页面

![image-20220430230709095](/images/Web/React/01-初识React/image-20220430230709095.png)

类名已经正确的变动了

### 扩展-如何在React中使用Dart-sass

node-sass强制跟nodejs版本绑定，这很不舒服，所以就有了这样的操作

> **npm6.9支持一个新功能，叫做package alias**

这个功能有什么用呢？就是偷梁换柱，create-react-app本身是不允许使用dart-sass的，所以只需要

```shell
npm install node-sass@npm:dart-sass -D
# or
pnpm install node-sass@npm:dart-sass -D
# or
yarn add node-sass@npm:dart-sass -D
```

接着像使用node-sass那样使用即可



### 扩展-如果想在module.css中声明全局样式

Example：

```scss
.my-button{
	color:red;
}
```

在正常引入`import xxx as 'xxx.module.scss'`后，它将会自动给这玩意加上个hash值，如果不想要，也就是改成全局的样式，则可以

```scss
::global(.my-button){
	color:red;
}
```



### 事件绑定

这里以`Click`为例

```tsx
import React, { Component } from 'react'

const clickEvent = () => {
    alert("Hello World")
}

export default class Person extends Component {
    render() {
        return (
            <div>
                <button
                    onClick={clickEvent}
                    style={{
                        border:"1px solid #blue",
                        background:"white",
                        color:"black"
                    }}>
                    Click Me Show Alert
                </button>
            </div>
        )
    }
}
```

或者写成类里面的

```tsx
import React, { Component } from 'react'


export default class Person extends Component {
    private handlerClick = () => {
        alert("Hello World")
    }
    
    render() {
        return (
            <div>
                <button
                    onClick={this.handlerClick}
                    style={{
                        border: "1px solid #blue",
                        background: "white",
                        color: "black"
                    }}>
                    Click Me Show Alert
                </button>
            </div>
        )
    }
}
```

整体来说还是和原生的比较像，或者也可以像下面一样写成箭头函数

```tsx
import React, { Component } from 'react'


export default class Person extends Component {
    render() {
        return (
            <div>
                <button
                    onClick={()=>{
                        alert("Hello World")
                    }}
                    style={{
                        border:"1px solid #blue",
                        background:"white",
                        color:"black"
                    }}>
                    Click Me Show Alert
                </button>
            </div>
        )
    }
}
```

::: tip

React中的所有事件实际上都是绑定在根节点之上的，才用冒泡的形式来进行传播到根节点，然后根节点再进行统一的处理

:::

### ✨事件对象

例如点击，可以获取一个`SyntheticBaseEvent `对象

> PS:这里调用this.handlerClick的时候还可以额外通过bind来传递额外的参数，例如那边分别想接收event和一个id，则可以这样调用
>
> ```typescript
> this.handlerClick.bind(this,"id00001")
> ```
>
> 下方是一个没有额外参数的例子

```tsx
import React, { Component } from 'react'


export default class Person extends Component {
    private handlerClick = (event: React.BaseSyntheticEvent) => {
        console.log(event)
    }
    render() {
        return (
            <div>
                <button
                    onClick={this.handlerClick}
                    style={{
                        border: "1px solid #blue",
                        background: "white",
                        color: "black"
                    }}>
                    Click Me Show Alert
                </button>
            </div>
        )
    }
}

```

同理，可以通过事件对象来阻值事件继续传播

```tsx {8-9}
import React, { ButtonHTMLAttributes, Component, MouseEvent } from 'react'


export default class Person extends Component {
    private baseName = "Hello world"
    private handlerClick = (event: React.BaseSyntheticEvent) => {
        console.log(event)
        event.preventDefault()
        event.stopPropagation()
    }
    render() {
        return (
            <div>
                <button
                    onClick={this.handlerClick}
                    style={{
                        border: "1px solid #blue",
                        background: "white",
                        color: "black"
                    }}>
                    Click Me Show Alert
                </button>
            </div>
        )
    }
}
```

## ✨Ref-直接操作Dom

在React中使用Ref比在Vue3 Setup中操作ref舒服很多（目前）

有旧的方法，直接字符串绑定，不推荐，编辑器都会报错显示value不存在

```tsx
import React, { Component } from 'react'


export default class Person extends Component {


     clickHandler=()=>{
       let userInputValue =  this.refs.myInput.value
       console.log(userInputValue)
    }

    render() {
        return (
            <div>
                // 声明ref
                <input type="text" ref="myInput" />
                <button
                    style={{
                        border: "1px solid #blue",
                        background: "white",
                        color: "black"
                    }}>
                    Click Me Show Alert
                </button>
            </div>
        )
    }
}
```

官方推荐的方式是

```tsx {7,10,22}
import React, { Component } from 'react'


export default class Person extends Component {

	// 注意ts中这里的泛型
    private UserInputRef = React.createRef<HTMLInputElement>()

    private clickHandler = () => {
        let userInputValue = this.UserInputRef.current?.value
        // if null
        if (userInputValue === null || userInputValue === ""){
            console.log("this is a null")
            return 
        }
        console.log(userInputValue)
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.UserInputRef} />
                <button
                    onClick={this.clickHandler}
                    style={{
                        border: "1px solid #blue",
                        background: "white",
                        color: "black"
                    }}>
                    Click Me Show Alert
                </button>
            </div>
        )
    }
}
```

上方代码中，`current`获取到的就是一个html对象

## State

一句话概括：属性绑定

### 基本使用

例如我想动态变更我的Age，使用react提供的`setState`即可

```tsx
import React, { Component } from 'react'


export default class Person extends Component {

    public state = {
        Age: 18
    }
    render() {
        return (
            <div>
                <p>Age:{this.state.Age}</p>

                <button
                    onClick={() => {
                        this.setState({
                            Age: this.state.Age + 1
                        })
                    }}
                    style={{
                        border: "1px solid #blue",
                        background: "white",
                        color: "black"
                    }}>Add Age 
                </button>
            </div>
        )
    }
}

```

当然，如果要使用外部的函数（类中，除了render外的地方），使用js的bind来绑定this的指向即可

```tsx {21}
import React, { Component } from 'react'


export default class Person extends Component {

    public state = {
        Age: 18
    }
    private AddAge(){
        this.setState({
            Age: this.state.Age + 1
        })
    }

    render() {
        return (
            <div>
                <p>Age:{this.state.Age}</p>

                <button
                    onClick={this.AddAge.bind(this)}
                    style={{
                        border: "1px solid #blue",
                        background: "white",
                        color: "black"
                    }}>Add Age 
                </button>
            </div>
        )
    }
}
```

你也可以将要操作数据的函数就在render里面，render是一个函数，所以直接用const之类的即可，即可免去手动输入bind，如下

```tsx
import React, { Component } from 'react'


export default class Person extends Component {


    public state = {
        isTrue: false,
    }
    render() {
        const changeState = () => {
            this.setState({
                isTrue: !this.state.isTrue
            })
        }
        return (
            <div>
                <h1>Hello Person!</h1>
                <button onClick={changeState}>{this.state.isTrue ? "取消收藏" : "收藏"}</button>
            </div>
        )
    }
}
```

### ✨绑定Input的数据

这个稍微有点特殊，因为React中不存在向Vue那样的直接双向绑定，所以需要自己手动绑定值

```tsx
import React, {Component} from 'react'


export default class Person extends Component {
    state = {
        message: "" as string
    }

    render() {
        let {message} = this.state
        return (
            <>
                <h3>输入框内容为：{message}</h3>
            // 手动绑定input的value属性，同时监听变化，一旦发生变化，获取event，然后更新value
                <input type="text" value={message} onChange={(event) => {
                    this.setState({
                        message: event.target.value
                    })
                }}/>
            </>
        )
    }
}

```

又或者说，在要用到这个值的时候，通过ref获取即可，两种方式都可用，不过ref没有这个这么灵活

### 列表渲染

稍微有点特殊

```tsx {19-22,30-36}
import React, {Component} from 'react'

interface User {
    UserName: string,
    Age: number
}

export default class Person extends Component {

    state = {
        isTrue: false,
        UserList: [] as User[]
    }

    render() {
        const addUser = () => {
            this.setState({
                	//添加用户 注意这里用了es6的三个点
                    UserList: [...this.state.UserList, {
                        Age: this.state.UserList.length,
                        UserName: `张${this.state.UserList.length}`
                    }]
                }
            )
        }
        return (
            <div>
                <button onClick={addUser}>添加用户</button>
                {
                    // 一定要用map来渲染
                    this.state.UserList.map(i => {
                        // 注意 循环里面的标签内放内容要用js的模板字符串（${}）
                        // 属性放内容和其他地方无异
                        return <p key={i.UserName}>用户名:${i.UserName}，年龄：${i.Age}</p>
                    })
                }
            </div>
        )
    }
}
```

当然，我们可以在这上面稍作优化，让代码看起来更美观一些

比如这样

```tsx
import React, {Component} from 'react'

interface User {
    UserName: string,
    Age: number
}

export default class Person extends Component {

    state = {
        isTrue: false,
        UserList: [] as User[]
    }

    render() {
        const addUser = () => {
            this.setState({
                    UserList: [...this.state.UserList, {
                        Age: this.state.UserList.length,
                        UserName: `张${this.state.UserList.length}`
                    }]
                }
            )
        }

        let renderUserList = this.state.UserList.map(i => {
            return <p key={i.UserName}>用户名:${i.UserName}，年龄：${i.Age}</p>
        })

        return (
            <div>
                <button onClick={addUser}>添加用户</button>
                {renderUserList}
            </div>
        )
    }
}
```

或者换一个方式，使用**函数式编程**来再声明一个组件

> 方式1，在render内或者定义一个全局的

```tsx
import React, {Component} from 'react'

interface User {
    UserName: string,
    Age: number
}

// props：接收传入的值，必须得是这种命名规范
const UserListRender = (props: { userList: User[] }): JSX.Element => {
    return (
        <>
            {
                props.userList.map(user => <p key={user.UserName}>用户名:${user.UserName}，年龄：${user.Age}</p>)
            }
        </>
    )
}

export default class Person extends Component {

    state = {
        isTrue: false,
        UserList: [] as User[]
    }


    render() {
        const addUser = () => {
            this.setState({
                    UserList: [...this.state.UserList, {
                        Age: this.state.UserList.length,
                        UserName: `张${this.state.UserList.length}`
                    }]
                }
            )
        }

        return (
            <div>
                <button onClick={addUser}>添加用户</button>
                <UserListRender userList={this.state.UserList}/>
            </div>
        )
    }
}
```

> 方式二：在class内使用private之类的

```tsx
import React, {Component} from 'react'

interface User {
    UserName: string,
    Age: number
}


export default class Person extends Component {

    state = {
        isTrue: false,
        UserList: [] as User[]
    }
    private UserListRender = (props: { userList?: User[] }): JSX.Element => {
        let {userList} = props;
        if (userList === null || typeof userList === "undefined" || userList.length === 0) {
            return <></>
        }
        return (
            <>
                {
                    userList.map(user => <p key={user.UserName}>用户名:${user.UserName}，年龄：${user.Age}</p>)
                }
            </>
        )
    }


    render() {
        const addUser = () => {
            this.setState({
                    UserList: [...this.state.UserList, {
                        Age: this.state.UserList.length,
                        UserName: `张${this.state.UserList.length}`
                    }]
                }
            )
        }

        return (
            <div>
                <button onClick={addUser}>添加用户</button>
                <this.UserListRender userList={this.state.UserList}/>
            </div>
        )
    }
}
```

### 条件渲染-两种方式

> 方式1

```tsx
render(){
    const event = "aaa";
    return (
        // 只在前面这个表达式成立的时候（）渲染后面的内容
    	{event==="aaa" && <h2>Hello world</h2>}
    )
}
```

> 方式2:三元运算符，懂得都懂

```tsx
render(){
    const isTrue = false;
    return (
    	{isTrue?"成立":"不成立"}
    )
}
```



### 增删Demo

修改查询同理，修改就emm直接替换，查询也是filter，不过实际开发过程中修改和查询都是和后台对接的

让最终代码看起来比较清晰的方式就是**拆分开发**，能解耦的就解耦

> 条件渲染就是三元表达式罢了，没啥好多说的，语法：`{表达式?成立的东西:不成立的东西}`，例如
>
> ```typescript
> let response = 1>0?"1大于0":"1小于0"
> console.log(response)
> ```
>
> 同理，这个东西能放在jsx的任意地方，例如某些标签中间`<div>{渲染表达式}</div>`
>
> 或者放在标签属性那儿：`<div className={this.xxx=xxx:"very":"none"}></div>`

Demo：

```tsx
import React, {Component} from 'react'

interface User {
    UserName: string,
    Age: number
}


export default class Person extends Component {

    state = {
        UserList: [] as User[],
        UserCount: 0 as number
    }

    private UserListRender = (props: { userList: User[], callBack: (userIndex: number) => void, }): JSX.Element => {
        let {userList} = props;
        return (
            <>
                {
                    userList.map((user, index) =>
                        <p key={user.UserName}>用户名:${user.UserName}，年龄：${user.Age} | <button onClick={() => {
                            props.callBack(index)
                        }}>删除</button>
                        </p>)
                }
            </>
        )
    }

    render() {
        /**
         * 添加一个用户
         */
        const addUser = () => {
            let newCount = this.state.UserCount + 1
            this.setState({
                    UserList: [...this.state.UserList, {
                        Age: newCount,
                        UserName: `张${newCount}`
                    }],
                    UserCount: newCount
                }
            )
        }
        /**
         * 删除一个用户
         * @param userIndex 用户索引
         * @constructor this对象
         */
        const RemoveUser = (userIndex: number) => {
            let newUserList = this.state.UserList.filter((user, index) => {
                return index !== userIndex
            })
            this.setState({
                UserList: [...newUserList],
            })
        }

        return (
            <div>
                <button onClick={addUser}>添加用户</button>
                {
                    this.state.UserList.length>0?<this.UserListRender
                        callBack={RemoveUser}
                        userList={this.state.UserList}/>:<p>暂无用户</p>
                }
            </div>
        )
    }
}

```

效果

![image-20220501214805118](/images/Web/React/01-初识React/image-20220501214805118.png)



### 直接渲染HTML(会被XSS)

看到xss应该就该明白的差不多了，使用方式：

```tsx
import React, {Component} from 'react'


export default class Person extends Component {

    state = {
        message: "<h1>Hello World</h1>"
    }

    render() {

        return (
            <>
                <h3>渲染普通的消息（不会当成html）</h3>
                <p>{this.state.message}</p>
                <h3>渲染消息（会被当成html）</h3>
            // 这里语法是固定的，只能这样写 两个标签内部包裹这一个__html，html的value将会被当成html渲染
            // 要使用它的话注意防止xss
                <p
                    dangerouslySetInnerHTML={
                        {
                            __html: this.state.message
                        }
                    }
                ></p>
            </>
        )
    }
}
```

结果

![image-20220501221729347](/images/Web/React/01-初识React/image-20220501221729347.png)

### ✨网络请求数据渲染和跨域解决

我这里以golang服务为例

```shell
go get github.com/gin-gonic/gin
# 假数据生成
go get github.com/bxcodec/faker/v3
```

然后编写一个简单的后台服务

```go
package main

import (
	"math/rand"

	"github.com/bxcodec/faker/v3"
	"github.com/gin-gonic/gin"
)

type User struct {
	UserName   string `faker:"username" json:"username"`
	Email      string `faker:"email" json:"email"`
	DomainName string `faker:"domain_name" json:"domain_name"`
	Jwt        string `faker:"jwt" json:"jwt"`
}

func main() {
	router := gin.Default()
	router.GET("/userList", func(ctx *gin.Context) {
		// 生成一个10~1024的随机数
		num := 10 + rand.Intn(1024-10)
		userList := make([]User, num)
		for i := 0; i < num; i++ {
			user := User{}
			faker.FakeData(&user)
			userList[i] = user
		}
		resp := struct {
			UserList []User `json:"userList"`
			Count    int    `json:"count"`
		}{
			UserList: userList,
			Count:    num,
		}
		ctx.JSON(200, resp)
	})
	// 监听8080
	router.Run(":8080")
}
```

测试请求没问题

![image-20220501224749728](/images/Web/React/01-初识React/image-20220501224749728.png)

接下来尝试下使用react来进行通讯

首先安装一个`axios`以及配合`http-proxy-middleware`(解决跨域)来使用

```shell
yarn add axios http-proxy-middleware
```

然后在`src`路径下新建一个`setupProxy.js`，注意，这里必须得是**.js**，否则无法识别，**语法也必须和下方一致**

然后在里面填写如下内容

```js
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        // 反正一个地址就一个createProxyMiddleware
        createProxyMiddleware(
            "/api",
            {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                pathRewrite: (path) => {
                    console.log(path)
                    return path.replace(/^\/api/, "")
                }
            }
        ),
    );
}
```

接着回到react中使用它

```tsx
import React, {Component} from 'react'
import axios from "axios";


interface User {
    username: string,
    email: string,
    domain_name: string,
    jwt: string
}

interface ResponseData {
    userList: User[],
    count: number
}

export default class Person extends Component {

    state = {
        UserList: [] as User[],
        Count: 0 as number,
    }

    render() {

        const getServer = async () => {
            let response = await axios.get("/api/userList");
            let data: ResponseData = response.data
            this.setState({
                // 保证最近获取的在最上面
                UserList: [...data.userList, ...this.state.UserList],
                Count: this.state.Count + data.count
            })
        }

        return (
            <>
                <button onClick={getServer}>渲染远程数据</button>
                <h2>当前用户数量为:{this.state.Count}</h2>
                <hr/>
                {
                    this.state.UserList.map(user => {
                        return (
                            <div style={{margin: "10px"}}>
                                <span>用户名：</span>${user.username}
                                <span>邮箱：</span>${user.email}
                                <br/>
                                <span>用户所属网址：</span>${user.domain_name}
                                <span>用户登陆凭证：</span>${user.jwt}
                            </div>
                        )

                    })
                }
            </>
        )
    }
}

```

效果

![image-20220502115110691](/images/Web/React/01-初识React/image-20220502115110691.png)

### SetState注意事项（set后获取最新的值）

首先来看一段代码

```tsx
import React, {Component} from 'react'

export default class Person extends Component {
    state = {
        Count: 0 as number,
    }

    render() {
        const addCount = () => {
            this.setState({
                Count: this.state.Count + 1
            })
            console.log(`1===当前Count的值是${this.state.Count}`)
            this.setState({
                Count: this.state.Count + 1
            })
            console.log(`2===当前Count的值是${this.state.Count}`)
            this.setState({
                Count: this.state.Count + 1
            })
            console.log(`3===当前Count的值是${this.state.Count}`)
        }

        return (
            <>
                <h1>计数器的值{this.state.Count}</h1>
                <button onClick={addCount}>计数器的值+3</button>
            </>
        )
    }
}
```

按照常理来说，这里点击一次应该加3

但是是实际点击后只加了1

![image-20220502120925898](/images/Web/React/01-初识React/image-20220502120925898.png)

::: warning

因为React中的setState是一个异步更新的，所以说没法保证set完毕之后能立刻获取最新的值（所以能看到三个clg语句都是没被阻塞的，获取到的都是最老的值）

:::

想要更新完毕后获取最新的值，只需要加一个callback即可（回调地狱警告）

```tsx {10-23}
import React, {Component} from 'react'

export default class Person extends Component {
    state = {
        Count: 0 as number,
    }

    render() {
        const addCount = () => {
            this.setState({
                Count: this.state.Count + 1
            }, () => {
                console.log(`1===当前Count的值是${this.state.Count}`)
                this.setState({
                    Count: this.state.Count + 1
                }, () => {
                    console.log(`2===当前Count的值是${this.state.Count}`)
                    this.setState({
                        Count: this.state.Count + 1
                    }, () => {
                        console.log(`3===当前Count的值是${this.state.Count}`)
                    })
                })
            })
        }

        return (
            <>
                <h1>计数器的值{this.state.Count}</h1>
                <button onClick={addCount}>计数器的值+3</button>
            </>
        )
    }
}
```

::: tip

或者你不想要让其是回调地狱的话，也可以通过js的`async await`语法糖来简化

:::

```tsx {10-21}
import React, {Component} from 'react'

export default class Person extends Component {
    state = {
        Count: 0 as number,
    }

    render() {
        const addCount = async () => {
            await this.setState({
                Count: this.state.Count + 1
            })
            console.log(`1===当前Count的值是${this.state.Count}`)
            await this.setState({
                Count: this.state.Count + 1
            })
            console.log(`2===当前Count的值是${this.state.Count}`)
            await this.setState({
                Count: this.state.Count + 1
            })
            console.log(`3===当前Count的值是${this.state.Count}`)

        }

        return (
            <>
                <h1>计数器的值{this.state.Count}</h1>
                <button onClick={addCount}>计数器的值+3</button>
            </>
        )
    }
}
```

### SetState实例，移动端滚动

也就是实时的动态渲染某些数据

现在有一个库：[ustbhuangyi/better-scroll: inspired by iscroll, and it supports more features and has a better scroll perfermance (github.com)](https://github.com/ustbhuangyi/better-scroll)

它的作用是移动端获取更好的滚动，要使用的话只需要new它即可，我们要实时渲染一些更好滚动的数据，前提是先准备好了对应的dom节点（dom节点上有内容）

要使用它，只需要这样

```shell
yarn add @better-scroll/core
```

然后写一点代码

```tsx
import React, {Component} from 'react'
import axios from "axios";
import BScroll from '@better-scroll/core'

interface User {
    username: string,
    email: string,
    domain_name: string,
    jwt: string
}

interface ResponseData {
    userList: User[],
    count: number
}

export default class Person extends Component {

    state = {
        UserList: [] as User[],
        Count: 0 as number,
    }
    private DivRef = React.createRef<HTMLDivElement>()

    render() {

        const getServer = async () => {
            let response = await axios.get("/api/userList");
            let data: ResponseData = response.data
            this.setState({
                UserList: [...data.userList, ...this.state.UserList],
                Count: this.state.Count + data.count
            }, () => {
                //在callBack内使用
                // 获取className
                const className = this.DivRef.current?.className;
                // 空判断
                if (className !== null && typeof className !== "undefined") {
                    let stringList = className.split(" ");
                    // 保证始终获取的是第一个classname 当然 这里也可以用id之类的来替代
                    if (stringList.length === 1) {
                        new BScroll("." + className)
                    } else {
                        new BScroll("." + stringList[0])
                    }
                }
            })
        }

        return (
            <>
                <button onClick={getServer}>渲染远程数据</button>
                <h2>当前用户数量为:{this.state.Count}</h2>
                <hr/>
                <div ref={this.DivRef} className="hello aaa bbb ccc ddd"
                     style={{overflow: "hidden", height: "500px", backgroundColor: "greenyellow"}}>
                    <ul>
                        {
                            this.state.UserList.map(user => {
                                return (
                                    <li>
                                        <span>用户名：</span>${user.username}
                                        <span>邮箱：</span>${user.email}
                                        <br/>
                                        <span>用户所属网址：</span>${user.domain_name}
                                        <span>用户登陆凭证：</span>${user.jwt}
                                    </li>
                                )

                            })
                        }
                    </ul>

                </div>

            </>
        )
    }
}
```

运行结果

![image-20220502143310115](/images/Web/React/01-初识React/image-20220502143310115.png)

## Props

这个就是父子组件互相传值

### 基本使用

例如我们有一个navbar组件

```tsx
import React, {Component} from 'react';

class NavBar extends Component {
    render() {
        return (
            <>
            	<h1>这里是NavBar</h1>
            </>
        );
    }
}

export default NavBar;
```

然后使用

```tsx
import React, {Component} from 'react'
import NavBar from "../NavBar";


export default class Person extends Component {

    render() {

        return (
            <>
                <NavBar/>
                <NavBar/>
                <NavBar/>

                <h1>三个导航栏</h1>

            </>
        )
    }
}
```

结果

![image-20220502172442612](/images/Web/React/01-初识React/image-20220502172442612.png)

如果说想要动态的赋予值的话，比如说我想给每个组件传递一个title的属性，例如：

```tsx
<NavBar title="首页"/>
<NavBar title="购物车"/>
<NavBar title="个人中心"/>
```

那么只需要这样来声明接收即可

```tsx
import React, {Component} from 'react';

/**
 * 声明接收的接口
 */
interface NavBarProps {
    /**
     *  标题
     */
    title: string;
}

/**
 * 定义的时候加一个泛型来约束，固定写法
 */
class NavBar extends Component<NavBarProps> {
    render() {
        return (
            <>
                <h1>{this.props.title}</h1>
            </>
        );
    }
}

export default NavBar;
```

效果

![image-20220502173451023](/images/Web/React/01-初识React/image-20220502173451023.png)

### ✨Props设置默认属性

有些时候有些属性是不想自个传值的，这个时候就可以用默认值来进行处理

```tsx {22-27}
import React, {Component} from 'react';

/**
 * 声明接收的接口
 */
interface NavBarProps {
    /**
     *  标题
     */
    title: string;
    /**
     * 是否居中展示，默认false
     */
    isCenter?: boolean;
}

/**
 * 定义的时候加一个泛型来约束，固定写法
 */
class NavBar extends Component<NavBarProps> {

    /**
     * 使用defaultProps来声明默认值，没有声明的话则必填，声明了或上面interface内也是?定义的话则可以不用填
     */
    static defaultProps = {
        isCenter: false
    }

    render() {
        return (
            <>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: this.props.isCenter ? "center" : "start"
                }}>
                    <h1>{this.props.title}</h1>
                </div>
            </>
        );
    }
}

export default NavBar;
```

::: tip

如果感觉render中直接写一堆this太累的话，可以这样

```tsx
render() {
    // 使用结构赋值 因为render本质就是一个函数
    let {isCenter,title}=this.props
    return (
        <>
        <div style={{
                display: "flex",
                    alignItems: "center",
                        justifyContent: isCenter ? "center" : "start"
            }}>
            <h1>{title}</h1>
        </div>
        </>
    );
}
```

:::

接下来简单使用下

```tsx
<NavBar title="首页" isCenter={true}/>
<NavBar title="购物车"/>
<NavBar title="个人中心"/>
```

效果

![image-20220502174523823](/images/Web/React/01-初识React/image-20220502174523823.png)

### Props传递函数（修改父组件）

定义interface的时候这样即可

```tsx
/**
 * 声明接收的接口
 */
interface NavBarProps {
    /**
     *  标题
     */
    title: string;
    /**
     * 是否居中展示，默认false
     */
    isCenter?: boolean;
    /**
     * 点击change时候触发的事件
     * @param event 
     * @param title
     */
    handlerChange?: (event: React.BaseSyntheticEvent, title: string) => void
}
```

然后调用其的父组件创建一个符合这个风格的方法传入即可，如果父组件中的改方法运行了setState，**修改的是父组件的State**

### 函数式编程中接收props

例子，还是比面对对象稍微简洁些的

```tsx
export function NavBarFunc(props: { title: string, isCenter?: boolean }): JSX.Element {
    let {title, isCenter} = props
    //默认值之类的就直接在这里判断即可

    return (
        <>
        <div style={{
                display: "flex",
                    alignItems: "center",
                        justifyContent: isCenter ? "center" : "start"
            }}>
            <h1>{title}</h1>
        </div>
        </>
    )
}
```

## ✨Context-跨组件状态共享

简而言之，就是子组件的子组件传值

来看一个简单的例子：我想要在一个嵌套两层深的组件中调用第一层组件传递的值

或者说一个值传递给多个子组件，这玩意就是最佳的选择

```tsx
import React, {ChangeEvent, Component} from 'react'


/**
 * 创建上下文，并且给予默认值
 */
const MyContext = React.createContext({
    name: "Admin",
    age: 111,
    handlerChange: (event: ChangeEvent<HTMLInputElement>) => {
    }
})

export default class Person extends Component {
    state = {
        name: "root",
        age: 666
    }

    render() {
        return (

            <>
                {/*消费者提供值：使用Context对象.Provider即可，使用这个组件的所有子组件用的context都将会使用这里的值*/}
                <MyContext.Provider value={{
                    name: this.state.name, age: this.state.age, handlerChange: (event) => {
                        this.setState({name: event.target.value})
                    }
                }}>
    				//给R1，看看R1是否能用这里给定的值
                    <R1/>
                </MyContext.Provider>
            </>
        )
    }
}

function R1() {
    return (
        <>
            <h3>R1收到的内容：</h3>
            <MyContext.Consumer>
                {
                    obj => {
                        return (
                            <>
                                {obj.name}===={obj.age}
                            </>
                        )
                    }
                }
            </MyContext.Consumer>
            <R2/>
        </>
    )
}

class R2 extends React.Component {
    // static contextType = MyContext

    render() {
        return (
            <div>
                <h3>R2收到的内容</h3>
                <MyContext.Consumer>
                    {
                        ({name, age, handlerChange}) => {
                            return (
                                <>
                                    <h3>Name:{name}</h3>
                                    <h3>Age:{age}</h3>
                                	// 尝试修改对应的值
                                    <input type="text" value={name} onChange={handlerChange}/>
                                </>
                            )
                        }
                    }
                </MyContext.Consumer>
            </div>
        )
    }
}
```

实际效果：

![image-20220502230646529](/images/Web/React/01-初识React/image-20220502230646529.png)

可以看到，在R2中修改值，R1和定级组件的值都同时变动了(定级组件这里没做展示)，总之大体就是这样子，**语法确实比较奇怪，不过也确实好用**

```tsx
// 定义个Context 这里也可以用export default之类的导出去让其他文件中的子组件调用
const ContextName = React.createContext<泛型 可选，不填的话自动通过默认值推断>(默认值，如果是一个对象就{}，如果是字符串之类的就直接填即可)

// 发布消息
<ContextName.Provider value={你要传递的消息}>
	<子组件></子组件>
</ContextName.Provider>

// 接收消息，如果有父组件的就用父组件提供的，没有的话就使用默认的值
<ContextName.Consumer>
    {
        // 这里的value就是Context中的内容，也可以使用解构赋值的方式来获取
        (value)=>{
            return (
            	你想要渲染的内容
                <h2 className={value.ClassName}>xxx.xxx.xxx.xxx</h2>
        		{value.name}
                xxxxx...
            )
        }
    }
</ContextName.Consumer>
```

## 插槽

其实就是换了一种方式的Props，可以更方便的调用主类中的方法之类的

### 匿名插槽

非常简单

```tsx
import React, {Component} from 'react'


// 接收固定的children参数
function NewNavBar(props: { children?: any }) {
    return (<>
            <h3>这里是navBar的内容</h3>
            {props.children}
        </>
    )
}

export default class Person extends Component {


    render() {
        return (

            <>
                <NewNavBar>
                    <h3>这里是插入插槽的内容</h3>
                </NewNavBar>
            </>
        )
    }
}
```

结果

![image-20220502233126113](/images/Web/React/01-初识React/image-20220502233126113.png)

### 具名插槽

实际上就和传递Props没啥区别

```tsx
import React, {Component} from 'react'


function NewNavBar(props: { children?: any, LastSlot?: JSX.Element }) {
    return (<>
            <h3>这里是navBar的内容</h3>
            {props.children}
            {props.LastSlot}
        </>
    )
}

export default class Person extends Component {


    render() {
        return (

            <>
                <NewNavBar LastSlot={<span>我是</span>}>
                    <h3>这里是插入插槽的内容</h3>
                </NewNavBar>
            </>
        )
    }
}
```

## ✨生命周期

嘛，反正就几个钩子函数

### 概览

![image-20220503152919110](/images/Web/React/01-初识React/image-20220503152919110.png)



> 官方已经不推荐用的：
>
> - componentWillMount：**这个东西在ssr渲染中（后面会了解到的nextjs）会被多次调用，所以会触发多遍，同时在这里如果绑定事件，将无法解绑，导致内存泄露**
> - componentWillReceiveProps：外部组件多次频繁更新传入多次不同的props，会导致不必要的异步请求
> - componseWillUpdate：已经不推荐使用

::: tip

通常来说，最多用的应该就是初始化的`componentDidMount`和`componentWillUnmount`

更新的时候，想要判断是否应该更新：`shouldComponentUpdate`来判断是否应该更新，更新完毕后最新的dom数据`componentDidUpdate`

:::

- componentWillMount：**请求ajax数据**，官方现在已经不推荐现在做，而是建议去constructor或者`componentDidMount`进行操作
  - 现在直接使用会抛出警告
  - 例如要请求ajax数据然后再进行渲染的话，建议是到`constructor`去处理，或者到**componentDidMount去处理（更建议）**
  - 设置定时器也要在componentDidMount中处理，在构造函数中会有问题

- componentDidMount：**利用一些需要操作dom的插件进行渲染，例如[渲染滚动数据](https://github.com/ustbhuangyi/better-scroll)**

- componentWillUnmount：销毁时触发回调之类的，如果要销毁定时器的话，直接把定时器绑定到this上即可，例如

  - ```tsx
    import React, {Component} from 'react'
    
    
    export default class Person extends Component {
    
        state = {
            isShow: true
        }
    
        render() {
            let {isShow} = this.state
            return (
                <>
                    <button onClick={() => {
                        this.setState({isShow: !isShow})
                    }}>{isShow ? "销毁" : "创建"}</button>
                    {isShow && <Child/>}
                </>
            )
        }
    
    }
    
    
    class Child extends Component {
    
        /**
         * 这里声明的时候注意是NodeJS.Timer | undefined
         * @private
         */
        private _timer: NodeJS.Timer | undefined
    
    
        componentDidMount() {
            this._timer = setInterval(() => {
                console.log("Hello World")
            }, 1000);
        }
    
        componentWillUnmount() {
            //这里一定是存在的，所以加一个断言
            clearInterval(this._timer as NodeJS.Timeout)
            console.log("定时器销毁了")
        }
    
        render() {
            return (
                <div>
                    This is a Child
                </div>
            );
        }
    }
    ```

上方代码效果

![image-20220503163229247](/images/Web/React/01-初识React/image-20220503163229247.png)

### 新生命周期

官方提供了两个新的生命周期

- `getDerivedStateFromProps`，**第一次初始化组件以及后续的更新过程中(setState)**（包括自身更新以及父传子）返回一个对象作为新的state，返回null则说明这里不需要更新state

例子

```tsx
import React, {Component} from 'react'


export default class Person extends Component {

    state = {
        isShow: true
    }

    /**
     * 第一次初始化组件以及后续的更新过程中（包括自身更新以及父传子）返回一个对象作为新的state，返回null则说明这里不需要更新state
     * 这个可以对一些数据进行处理，比如字符串首字母大写，时间日期格式化等操作
     * @param nextProps 新的props
     * @param nextState 新的state
     */
    static getDerivedStateFromProps(nextProps: Readonly<{}>, nextState: Readonly<{isShow:boolean}>) {

        //    反正能获取到这两个，然后需要返回一个新的state即可
        return {
            isShow: nextState.isShow
        }
    }

    render() {
        return (
            <>

            </>
        )
    }

}
```

- `getSnapshotBeforeUpdate`，取代了componentWillUpdate，触发时间为update发生的时候，**在render之后dom渲染之前返回一个值**，作为**componentDidUpdate**的第三个参数，这个东西不是Static的

```tsx
import React, {Component} from 'react'


export default class Person extends Component {

    state = {
        isShow: true
    }

    /**
     * 第一次初始化组件以及后续的更新过程中（包括自身更新以及父传子）返回一个对象作为新的state，返回null则说明这里不需要更新state
     * 一般用不上这玩意
     * @param nextProps 新的props
     * @param nextState 新的state
     */
    static getDerivedStateFromProps(nextProps: Readonly<{}>, nextState: Readonly<{ isShow: boolean }>) {
        //    反正能获取到这两个，然后需要返回一个新的state即可
        return {
            isShow: nextState.isShow
        }
    }

    getSnapshotBeforeUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>): number {
        return 1;
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: number) {
        console.log("snapshot:::" + snapshot);
    }

    render() {
        return (
            <>
                <button onClick={() => {
                    this.setState({
                        isShow: !this.state.isShow
                    } as { isShow: boolean })
                }}>AAA
                </button>

            </>
        )
    }

}
```

