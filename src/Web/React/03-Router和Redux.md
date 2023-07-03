---
title: 03-React-Router和Redux
date: 2022-5-4 15:12:38
category: React
tag:
 - React
 - ReactRouter
 - ReactRedux
---

## Router

### 概述

根据不同的url地址暂时不同的内容或者页面

### 安装和基本使用

安装

```shell
yarn add react-router-dom
```

然后在src下新建一个router或者view文件夹（根据个人喜好）

接着创建Index.tsx，写入如下内容

```tsx
import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";


function IndexPage() {
    return (<div>This is a IndexPage</div>)
}

function HomePage() {
    return (<div>This is a Home</div>)
}

function AboutPage() {
    return (<div>This is a About</div>)
}

export default class App extends Component {
    render() {
        return (
            <div>
                {/*还有一个HashRouter，HashRouter是加了#的*/}
                <BrowserRouter>
                    {/*
                        如果你装的是react-router-dom@5，则下面的
                        element要换成component，同时传入的不是html对象，而是直接传HomePage/AboutPage
                        且如果是react-router-dom@5，则routers可以省略
                    */}
                    <Routes>
                        <Route path={"/"}  element={<IndexPage/>}/>

                        <Route path={"/home"} element={<HomePage/>}/>
                        <Route path={"/about"} element={<AboutPage/>}/>
                    </Routes>

                </BrowserRouter>
                <h3>Hello World</h3>
            </div>
        );
    }
}
```

效果

![image-20220504171011586](/images/Web/React/03-Router和Redux/image-20220504171011586.png)

![image-20220504171022781](/images/Web/React/03-Router和Redux/image-20220504171022781.png)

是不是非常简单

### 路由重定向

想要重定向某个路由，例如我访问`/`的时候，重定向到`/home`，则可以这样（注意，5和6使用方式不同，这里演示的是6）：

```tsx
import React, {Component, useEffect} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";


/**
 * 在react-router-dom@5中，无需这样做，但是建议自己手搓一个，6及以后，只能自己手动搓一个
 * 下方的原理先不用管
 * @param to
 * @constructor
 */
function Redirect({to}: { to: string }): JSX.Element | null {
    let navigate = useNavigate();
    useEffect(() => {
        //这个东西相当于vue中的 router.push({path:to})一样
        navigate(to);
    });
    return null;
}


function HomePage() {
    return (<div>This is a Home</div>)
}

function AboutPage() {
    return (<div>This is a About</div>)
}

export default class App extends Component {
    render() {
        return (
            <div>
                {/*还有一个HashRouter，HashRouter是加了#的*/}
                <BrowserRouter>
                    {/*
                        如果你装的是react-router-dom@5，则下面的
                        element要换成component，同时传入的不是html对象，而是直接传HomePage/AboutPage
                        且如果是react-router-dom@5，则routers可以省略
                    */}
                    <Routes>

                        <Route path={"/home"} element={<HomePage/>}/>
                        <Route path={"/about"} element={<AboutPage/>}/>
                        {/*如果是在@5中，有一个内置的Redirect，直接使用那个并传入：from="/" to="/home"，但是不推荐，那样是模糊匹配，容易出bug */}
                        <Route path={"/"} element={<Redirect to={"/home"}/>}/>
                    </Routes>

                </BrowserRouter>
                <h3>Hello World</h3>
            </div>
        );
    }
}



```

### 404页面的处理

比较简单，path处使用`*`进行匹配即可，路由的搜索是默认先匹配看有没有，最后再到`*`处理，所以无论放在最前面还是最后面都无所谓

在这里有特殊的含义。仅当没有其他路由匹配时，它才会匹配。`"*"`

路由优先度：精准=>模糊=>兜底

```tsx {23-24,40}
import React, {Component, useEffect} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";


function Redirect({to}: { to: string }): JSX.Element | null {
    let navigate = useNavigate();
    useEffect(() => {
        //这个东西相当于vue中的 router.push({path:to})一样
        navigate(to);
    });
    return null;
}


function HomePage() {
    return (<div>This is a Home</div>)
}

function AboutPage() {
    return (<div>This is a About</div>)
}

function NotFoundPage() {
    return (<div>404 Not Found</div>)
}

export default class App extends Component {
    render() {
        return (
            <div>
                {/*还有一个HashRouter，HashRouter是加了#的*/}
                <BrowserRouter>

                    <Routes>

                        <Route path={"/home"} element={<HomePage/>}/>
                        <Route path={"/about"} element={<AboutPage/>}/>

                        <Route path={"/"} element={<Redirect to={"/home"}/>}/>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                    </Routes>

                </BrowserRouter>
                <h3>Hello World</h3>
            </div>
        );
    }
}
```

### 嵌套路由（子路由）

如果说想使用嵌套路由的话，则需要在父路由路径加上`/*`来提供模糊匹配，**并且把子路由丢到该路由组件内（务必在组件内记得加上`<Routes/>`，就像是Vue中view-router标签那样）**

> 方式1（可用 不太推荐）

```tsx {22-24,44}
import React, {Component, useEffect} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";


function Redirect({to}: { to: string }): JSX.Element | null {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}


function HomePage() {
    return (<div>This is a Home</div>)
}

function AboutPage() {
    return (
        <>
            <div>This is a About</div>
            <Routes>
                <Route path={"/aaaa"} element={<HomePage/>}/>
            </Routes>

        </>

    )
}

function NotFoundPage() {
    return (<div>404 Not Found</div>)
}

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>

                    <Routes>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                        <Route path={"/home"} element={<HomePage/>}/>
                        <Route path={"/about/*"} element={<AboutPage/>}/>
                    </Routes>

                </BrowserRouter>
                <h3>Hello World</h3>
            </div>
        );
    }
}
```

效果

![image-20220504182504827](/images/Web/React/03-Router和Redux/image-20220504182504827.png)

> 方式二（通常情况下更推荐）

就是这样的：

```tsx
<Route path="/aaaa" element={<App />}>
    // 注意下面的不要加前缀/ 不然会抛err
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
</Route>
```

这样更直观，当然在`<App/>`内部一样要加上Routes

### 嵌套子路由额外说明（精准匹配-exact

例如现在我**不想在一个Route中写其子路由**，我想写

```jsx
<Route path="/home" element={<Home />} />
<Route path="/home/aabcd" element={<Abcd />} />
```

这个时候你访问`/home/abcd`将还是会给你返回Home的内容。要解决它有两种方式，一种是像上面那样进行嵌套处理，还有一种就是

```jsx
<Route path="/home" element={<Home />} exact />
<Route path="/home/aabcd" element={<Abcd />} />
```

给你的Home加上精准匹配exact，加了这玩意表示路径得完全匹配才行，当然，一般情况下还是建议用嵌套，各种意义上都更方便



### 接收路径参数

例如访问`/user/{userId}`，返回对应用户的信息

这里我找了一下，没找到关于Class的使用方式，只有hooks，所以先用hooks了（class以后再说吧，估计也用不上）

```tsx
import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    useParams
} from "react-router-dom";


function NotFoundPage() {
    return (<div>404 Not Found</div>)
}

function SearchUser() {
    //在函数式编程中只能这样获取，不过也挺方便
    // 有点像是vue中的useRoute().params.xxx一样
    let params = useParams<{ userId: string }>();
    console.log(params)
    console.log(params.userId)
    return (
        <div>
            <h2>UserId:{params.userId}</h2>
        </div>
    )
}

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                        <Route path={"/user/:userId"} element={<SearchUser/>}/>
                    </Routes>
                </BrowserRouter>
                <h3>Hello World</h3>
            </div>
        );
    }
}
```

效果

![image-20220504213720380](/images/Web/React/03-Router和Redux/image-20220504213720380.png)

### 接收query参数（?a=b）

查询参数也是有一个hooks来进行处理

```tsx
import React, {Component, useEffect} from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    useParams, useSearchParams
} from "react-router-dom";


function NotFoundPage() {
    return (<div>404 Not Found</div>)
}

function SearchUser() {
    //获取查询参数 这里传入的参数是给定的初始值（也可以什么东西都不传）
    //会返回一个map<string,string>和一个方法，这个方法可以调整这里面的值
    let [query, setQuery] = useSearchParams({name: "张三", age: "18"});
    useEffect(() => {
        if (query.get("sex") === null || typeof query.get("sex") === "undefined") {
            setQuery({
                //    这里可以重新赋值
                name: "李四",
                age: "18",
                sex: "男"
            })
        }
    }, [])

    return (
        <div>
            <h2>UserName:{query.get("name")}</h2>
            <h2>UserName:{query.get("age")}</h2>
            <h2>UserName:{query.get("sex")}</h2>
        </div>
    )
}

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                        <Route path={"/user"} element={<SearchUser/>}/>
                    </Routes>
                </BrowserRouter>
                <h3>Hello World</h3>
            </div>
        );
    }
}
```

效果（**直接访问的情况下**）：

![image-20220504214435507](/images/Web/React/03-Router和Redux/image-20220504214435507.png)

### State传参

这个要用到Navigate或者`NavLink`标签，用法都是一样的，这里以函数式编程为例：

```typescript
function AAA(){
    const navigateFunction = useNavigate();
    navigateFunction("/bbb",{state:"你想要传入的参数"})
}

function BBB(){
    var location = useLocation();
    //这里获取的是上面state传入的内容的toString，如果上面填写的是一个obj，则要Json.xxx来解析
    let search = location.search;
}

```

通常不会用这个玩意，它貌似是在请求头加东西来传参的

### 让用户跳转路由的方式

两种，第一种声明式导航

```tsx
<NavLink to="这里填写要跳转的路径是哪个" activeClassName="当前路由是to中指定的路由时，这里的className">这里写你想要的内容，比如说主页、个人中心</NavLink>

// 例如：
<NavLink to="/home/1" activeClassName="active">第一页</NavLink>
<NavLink to="/home/2" activeClassName="active">第二页</NavLink>
<NavLink to="/home/3" activeClassName="active">第三页</NavLink>
```

第二种编程式导航，例如自己写一个按钮

```tsx
function MyApp(){
    const navigateFunction = useNavigate();

    const handleChangeRouter=()=>{
        navigateFunction(参数1:string|一个特定的Map，参数2:一个特定的Map)
        // 例如： navigateFunction('/home')
    }

    return (
        <div>
            <button onClick={handleChangeRouter}></button>
        </div>
    )
}

// 参数1特定的map
export interface Path {

    // 要跳转到那个路径
    pathname: Pathname;

    // query参数
    search: Search;

    // 这个不管
    hash: Hash;
}
// 参数2特定的map
export interface NavigateOptions {
    replace?: boolean;
    state?: any;
}
// 当然，参数1可以直接填一个string（要到达的路径），参数2可以忽略
```

### 路由守卫（鉴权）

这里直接上代码了，没有新的东西，自己封装鉴权，当然在element中也可以用{aa && xxx}的表达式来，这里就不演示了（那个局限性有点大）

```tsx
import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {
    BrowserRouter,
    Route,
    Routes, useNavigate
} from "react-router-dom";


const LoginPage = () => {
    return <h3>Please Login!</h3>
}

export default class App extends Component {
    render() {
        return (
            <div>
                <h3>Hello World</h3>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/admin"} element={
                            <AuthPage>
                                <h1>This is a Admin Page</h1>
                            </AuthPage>
                        }/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

const AuthPage = ({children}: { children: JSX.Element }) => {
//    例如获取Authorized并发送给服务器校验
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const navigateFunction = useNavigate();
    useEffect(() => {
        const item = window.sessionStorage.getItem("Authorized");
        if (item) {
            //       假设这里进行了校验之类的，并且通过了
            setIsAuth(true)
            return
        }
        //    否则的话，则跳转
        navigateFunction("/login");
    })
    return isAuth ? children : null;

}
```

### 路由懒加载

如下，只能这样整。。。但是可以通过map之类的来批量生成下



```tsx
import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {
    BrowserRouter,
    Route,
    Routes, useNavigate
} from "react-router-dom";

// 注意这里的lazy，要使用下面的，就必须这样配合的来整
const LoginPage = React.lazy(()=>import("../Login"))

export default class App extends Component {
    render() {
        return (
            <div>
                <h3>Hello World</h3>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/login"} element={
                                // 懒加载 fallback是加载中显示的内容 这里也可以换成自定义的东西
                                <React.Suspense fallback={<h1>Loading</h1>}>
                                    <LoginPage/>
                                </React.Suspense>
                            }/>

                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}


```

#### 关于监听路由的销毁

在使用函数式编程中，可以直接通过useEffect来进行监听初始化完毕和销毁事件

```jsx
const MyFuncComponent: React.FC = function () {
    useEffect(() => {
        console.log("这个组件创建完毕了")
        return ()=>{
            console.log("这个组件即将被销毁....")
        }
    }, [])
    
    return (
        <>
            <h3>这里是第二个子元素的内容</h3>
        </>
    )
}
```

### 扩展-高阶函数withRotuer

有这样一个情况，我们有某个组件不在`Router`的映射范畴外，例如/index 是跳转到App这个组件，但是App这个组件里面有一个子组件Child，这个组件需要通过当前的路由参数来做某些事情，但是App不穿的话他又拿不到，所以可以这样

```tsx
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom' // 引入react-router-dom/react-router中的withRouter
class Child extends Component{
    console.log(this.props);  // {match: {…}, location: {…}, history: {…}, 等}
    render(){return (<div >你好啊</div>)
    }
}
export default withRouter(Child);  // 这里通过WithRouter将路由参数传入props中

```

函数式同理

## Redux

### 安装

PS：从这里开始，我使用的包管理工具从yarn换成了pnpm(学着学着因为工作，断了三个月，2022年8月28日)

首先要安装redux

```shell
pnpm i redux
```

### 基本使用

例如我现在有一个这样的场景

```jsx
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = function (): JSX.Element {
    const [userPost, setUsePost] = useState(0)
    return (<>
        <h1>这里是HomePage</h1>
        <OneTitle />
    </>)
}

const OneTitle = function (): JSX.Element {
    return (
        <>
            <h2>这里是第一个子元素的内容</h2>
            <TwoTitle />
            <ThreeTitle />
        </>
    )
}


const TwoTitle: React.FC = function () {
    return (
        <>
            <h3>这里是第二个子元素的内容</h3>
        </>
    )
}

const ThreeTitle: React.FC = function () {
    return (
        <>
            <h3>这里是第三个子元素的内容</h3>
        </>
    )
}
```

当我 想在ThreeTitle挂载完毕的时候，由第ThreeTitle来修改TwoTitle的值。。。。按照以往的做法那件相当复杂…

### Store的两个概念

1. 订阅`subsribe `
2. 通知`dispatch`

和其他的订阅发布模式一样，react也是通过接收者和发送者的方式来进行传递消息的（订阅发布模式）

### 创建一个store

我们在src下新建一个`store`目录，然后在其中新建一个`index.ts`

```ts
/* 
1. pnpm i redux
2. 导入createStore（这里显示已废弃是正常的，不用管
*/
import { createStore } from "redux";

/* 
 1. store只是一个保存数据的地方，它并不能更改数据
 2. 更改数据需要专门的东西-reducers来进行处理
    2.1 reduce就像是一个打工人，store就像是一个老板
    2.2 老板懒得处理，只管收钱，所以所有东西都是打工人来处理
 3. 所以store需要接收一个reduce来完成我们的数据操作
*/
const store = createStore(

    /**
     * 这里直接使用匿名函数来完成reduce的创建
     * @param prevState 老的状态
     * @param action 动作的名称
     */
    (prevState, action) => {
        // 好了 剩余的东西先不管，返回修改dom
    }
);
export default store
```

### 尝试监听和发布消息

```jsx
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "../store";

export const App = function (): JSX.Element {
    const [userPost, setUsePost] = useState(0)
    return (<>
        <h1>这里是HomePage</h1>
        <OneTitle />
    </>)
}

const OneTitle = function (): JSX.Element {
    return (
        <>
            <h2>这里是第一个子元素的内容</h2>
            <TwoTitle />
            <ThreeTitle />
        </>
    )
}


const TwoTitle: React.FC = function () {
    // dom挂载完毕的时候
    useEffect(() => {
        // 开始监听事件
        store.subscribe(() => {
            console.log("收到了store的消息")
        })
    }, [])

    return (
        <>
            <h3>这里是第二个子元素的内容</h3>
        </>
    )
}

const ThreeTitle: React.FC = function () {
    // dom挂载完毕的时候
    useEffect(() => {
        // 发送通知
        store.dispatch({
            // 这里的type随便写，只是给我们标记用的，就像是ref中的id一样 或者学过消息中间件的 就像是那里面的route一样
            type: "change-text",
        })
    }, [])

    return (
        <>
            <h3>这里是第三个子元素的内容</h3>
        </>
    )
}
```

接着回到store文件中，来处理我们的change-text消息

### 处理消息

在进行下一步之前，你可以启一下项目，在浏览器中，你可以看到TwoTitle成功的接收到了事件并且调用了console.log的回调` console.log("收到了store的消息")`，当然，你可以随便的修改TwoTitle和ThreeTitle的加载顺序，可以发现store都能被成功的触发

让我们可以尝试在store中做一点操作

```ts
/* 
1. pnpm i redux
2. 导入createStore（这里显示已废弃是正常的，不用管
*/
import { createStore } from "redux";

/* 
 1. store只是一个保存数据的地方，它并不能更改数据
 2. 更改数据需要专门的东西-reducers来进行处理
    2.1 reduce就像是一个打工人，store就像是一个老板
    2.2 老板懒得处理，只管收钱，所以所有东西都是打工人来处理
 3. 所以store需要接收一个reduce来完成我们的数据操作
*/
const store = createStore(

    /**
     * 这里直接使用匿名函数来完成reduce的创建
     * @param prevState 老的状态
     * @param action 动作的名称
     */
    (prevState, action) => {
        // 打印下action
        console.log(action)
        // 返回老的状态
        return prevState

    }
);
export default store
```

然后刷新网页，发现打印两个action

```json
// 这个应该是初始化时的action
{type: '@@redux/INIT4.3.y.5.n.5'}
// 这个是我们自己的action
{type: 'change-text'}
```

所以我们可以这样操作

```ts
/* 
1. pnpm i redux
2. 导入createStore（这里显示已废弃是正常的，不用管
*/
import { createStore } from "redux";

/* 
 1. store只是一个保存数据的地方，它并不能更改数据
 2. 更改数据需要专门的东西-reducers来进行处理
    2.1 reduce就像是一个打工人，store就像是一个老板
    2.2 老板懒得处理，只管收钱，所以所有东西都是打工人来处理
 3. 所以store需要接收一个reduce来完成我们的数据操作
*/
const store = createStore(

    /**
     * 这里直接使用匿名函数来完成reduce的创建
     * @param prevState 老的状态 给一个默认值（初始化的时候，这里一定是undefined，所以需要转换成obj下
     * @param action 动作的名称
     */
    (prevState = {}, action) => {
        // 打印下action
        // console.log(action)
        switch (action.type) {
            case 'change-text':
                // 如果是我们的事件
                return {
                    // @ts-ignore 这里是让新的状态来覆盖老的数据，保证有效性
                    ...prevState,
                    text: ((Math.random() * 100) + 1).toFixed(2)
                }
            default:
                return prevState
        }
    },
);



export default store
```

### 查看store中的state

上一步中，我们已经将返回值处理好了

所以可以这样做

```jsx
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "../store";

export const App = function (): JSX.Element {
    const [userPost, setUsePost] = useState(0)
    return (<>
        <h1>这里是HomePage</h1>
        <OneTitle />
    </>)
}

const OneTitle = function (): JSX.Element {
    return (
        <>
            <h2>这里是第一个子元素的内容</h2>
            <TwoTitle />
            <ThreeTitle />
        </>
    )
}


const TwoTitle: React.FC = function () {
    const [text, setText] = useState("Default Text")
    // dom挂载完毕的时候
    useEffect(() => {
        // 开始监听事件
        store.subscribe(() => {
            console.log("收到了store的消息")
            // 直接获取当前的store
            const currentStore = store.getState()
            console.log("当前的的store", currentStore)
            // @ts-ignore
            if (currentStore.text) {
                // @ts-ignore
                setText(currentStore.text)
            }
        })
    }, [])

    return (
        <>
            <h3>这里是第二个子元素的内容</h3>
            <h4>下面是通过store接收到的内容</h4>
            {text}
        </>
    )
}

const ThreeTitle: React.FC = function () {
    // dom挂载完毕的时候
    useEffect(() => {
        // 发送通知
        store.dispatch({
            // 这里的type随便写，只是给我们标记用的，就像是ref中的id一样 或者学过消息中间件的 就像是那里面的route一样
            type: "change-text",
        })
    }, [])
    const sendMessage = () => {
        store.dispatch({
            type: "change-text",
        })
    }
    return (
        <>
            <h3 >这里是第三个子元素的内容</h3>
            <button onClick={sendMessage}>点我切换数据</button>
        </>

    )
}
```

### dispatch携带额外的参数

非常简单，只需要这样即可

> 发送

```jsx
const ThreeTitle: React.FC = function () {

    const sendMessage = () => {
        store.dispatch({
            type: "change-text",
            myMessage:"额外的参数"
        })
    }
    return (
        <>
            <h3 >这里是第三个子元素的内容</h3>
            <button onClick={sendMessage}>点我切换数据</button>
        </>

    )
}
```

然后接受的时候，action中就可以获取到它，从而实现更高的自定义事件

```ts
import { createStore } from "redux";

const store = createStore(

    (prevState = {}, action) => {
        // 打印下action
        console.log(action)
        switch (action.type) {
            case 'change-text':
                // 如果有myMessage
                if (action.myMessage){
                    // DO Something
                }
                //如果没有 DO something
            default:
                return prevState
        }
    },
);



export default store
```

### 优雅的管理多个reduce（合并reducer）

例如我们现在有这样的一个场景：

```js
const state  = {
    userName:"张三",
    cityName:"北京"
}
```

如果正常情况下管理，我们应该是有两个事件或者说是这样，例如：

```js
import { createStore } from "redux";


const store = createStore(

    /**
     * @param prevState 老的状态 给一个默认值（初始化的时候，这里一定是undefined，所以需要转换成obj下
     * @param action 动作的名称
     */
    (prevState = {
        userName: "张三",
        cityName: "北京"
    }, action) => {
        // 如果action.type是change
        if (action.type === 'change') {
            // @ts-ignore
            const newState = { ...prevState }
            // 如果需要变更userName
            // @ts-ignore
            if (action.changeUserName) {
                newState.userName = "王老五"
            }
            // @ts-ignore
            if (action.changeCityName) {
                newState.cityName = "深圳"
            }
            return newState
        }
        return prevState
    },
);



export default store
```



那么，如果我想单独抽离出来解耦合该怎么做呢？

很简单，我们在`store`目录下再单独新建一个文件夹`reduces`并在其中新建两个文件：`userReduce`/`cityReduce`

就像这样

![image-20221101152238924](/images/Web/React/03-Router和Redux/image-20221101152238924.png)

接着，再给他们两单独的写reduce,reduce就是一个简单的处理函数，所有我们只需要:

```js


export default (prevState = {
    // 这里只有cityName
    cityName: "北京"
}, action: any) => {
    // 如果action.type是change  这里只处理cityName，所以可以直接这样
    // @ts-ignore
    if (action.type === 'change' && action.changeCityName) {
        // @ts-ignore
        const newState = { ...prevState }
        newState.cityName = "深圳"
        return newState
    }
    return prevState
}



```

user同理

```js

export default (prevState = {
    // 这里也只有userName
    userName: "张三"
}, action: any) => {
    // 如果action.type是change  这里只处理userName，所以可以直接这样
    // @ts-ignore
    if (action.type === 'change' && action.changeUserName) {
        // @ts-ignore
        const newState = { ...prevState }
        newState.userName = "王老五"
        return newState
    }
    return prevState
}

```

接着，我们在`store/index.ts`中来合并这两个reduces，只需要使用`combineReducers`这个函数即可

```js
import { combineReducers, createStore } from "redux";
import userReduce from "./reduces/userReduce";
import cityReduce from "./reduces/cityReduce";

const reduces = combineReducers({
    userReduce, cityReduce
})

const store = createStore(reduces)


export default store
```

接下来尝试使用

```tsx
import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "../store";

export const App = function (): JSX.Element {
    const [userPost, setUsePost] = useState(0)
    return (<>
        <h1>这里是HomePage</h1>
        <OneTitle />
        <TwoTitle />
    </>)
}

const OneTitle = function (): JSX.Element {
    // 因为合并了reduce，所以这里得通过cityReduce来单独获取下值
    const [cityName, setCityName] = useState(store.getState().cityReduce.cityName)
    const changeUserName = () => {
        store.dispatch({
            type: "change",
            changeUserName: true,
        })
    }
    useEffect(() => {
        store.subscribe(() => {
            setCityName(store.getState().cityReduce.cityName)
        })
    })
    return (
        <>
            <h2>这里是第一个子元素（City）的值{cityName}
                <button onClick={changeUserName}>点击我，变更第二个子元素的值</button>
            </h2>
        </>
    )
}
const TwoTitle: React.FC = () => {
    const [userName, setUserName] = useState(store.getState().userReduce.userName)
    const changeCityName = () => {
        store.dispatch({
            type: "change",
            changeCityName: true,
        })
    }
    useEffect(() => {
        store.subscribe(() => {
            setUserName(store.getState().userReduce.userName)
        })
    })
    return (
        <>
            <h2>这里是第二个子元素（User）的值{userName}
                <button onClick={changeCityName}>点击我，变更第一个子元素的值</button>
            </h2>

        </>
    )
}
```

![image-20221101154424079](/images/Web/React/03-Router和Redux/image-20221101154424079.png)

完美运行

### Redux的异步问题和中间件引出

之前所有的内容都是同步执行，所以目前来看貌似一切都很完美，但是假设你把任意的reducer改成了的`async`或者发返回Promise，那就走不通了….甚至ide都会直接警告

解决方案貌似也有，只要能在action和reducer的过程中干点什么来处理异步就好了，或许有这种中间件？

例如我们现在有这样一个场景：

```tsx
import React, { useEffect, useState } from "react"
import store from "../store";

export const App = function (): JSX.Element {
    var [fatherName, setFatherName] = useState(store.getState().fatherReduce.fatherName)
    useEffect(() => {
        store.subscribe(() => {
            setFatherName(store.getState().fatherReduce.fatherName)
        })
    })
    return (<>
        <h1>这里是Father元素，其元素内容为: 【{fatherName}】</h1>
        <MyChild />
    </>)
}

const MyChild: React.FC = () => {

    const changeFather = () => {
        store.dispatch({
            type: "change",
            changeFatherName: true
        })
    }
    return (<>
        <div>
            <button onClick={changeFather}>点击我，异步修改父元素的文本</button>
        </div>
    </>)
}
```

store如下：

> fatherReduce.ts

```ts

export default (prevState = {
    fatherName: "父元素默认文本"
}, action: any) => {
    // @ts-ignore
    if (action.type === 'change' && action.changeFatherName) {
        // @ts-ignore
        const newState = { ...prevState }
        newState.fatherName = "new FatherName"
        return newState
    }
    return prevState
}

```

> index.ts

```ts
import { combineReducers, createStore } from "redux";
import fatherReduce from "./reduces/fatherReduce";

const reduces = combineReducers({
    fatherReduce
})

const store = createStore(reduces)


export default store
```

默认效果

![image-20221206141616313](/images/Web/React/03-Router和Redux/image-20221206141616313.png)

点击后

![image-20221206141624296](/images/Web/React/03-Router和Redux/image-20221206141624296.png)

但是，如果我把`reduce`改成了异步，如下

```ts

export default (prevState = {
    // 这里也只有userName
    fatherName: "父元素默认文本"
}, action: any) => {
    // 如果action.type是change  这里只处理userName，所以可以直接这样
    // @ts-ignore
    if (action.type === 'change' && action.changeFatherName) {

        // 假设改成了异步 这里模拟延迟
        timeSleep(300).then(() => {
            // @ts-ignore
            const newState = { ...prevState }
            newState.fatherName = "new FatherName"
            return newState
        })

    } else {
        return prevState
    }

}


const timeSleep = (sleepTime: number) => {
    return new Promise<void>(res => {
        setTimeout(() => {
            res()
        }, sleepTime);
    })
}
```

则此时，你会发现浏览器直接抛了一个异常出来

![image-20221206142211556](/images/Web/React/03-Router和Redux/image-20221206142211556.png)

直接提示默认值可能未定义

所以说这个时候，我们可能需要一个默认的处理规则来解决它，如果你给那两个地方加上了ts的注解，则会出现如下错误

![image-20221206142711188](/images/Web/React/03-Router和Redux/image-20221206142711188.png)

大意是我们会须可以使用这个`redux-thunk`这个中间件来解决这个问题？

这玩意就是在`action`和`reducer`中架起一座桥梁，用于处理**异步**的，也就是说，我们的redux在没有中间件的情况下，是只能支持同步的…

### 常用异步中间件-redux-thunk

这玩意简单点来说，就是通过将我们的`dispath`(调用方)的参数改成**一个函数**来解决问题的

在使用之前，只需要把我们的代码改成这样

> App.tsx

```ts {29-46}
import React, { useEffect, useState } from "react"
import { AnyAction } from "redux";
import store from "../store";

export const App = function (): JSX.Element {
    var [fatherName, setFatherName] = useState(store.getState().fatherReduce.fatherName)
    useEffect(() => {
        store.subscribe(() => {
            setFatherName(store.getState().fatherReduce.fatherName)
        })
    })
    return (<>
        <h1>这里是Father元素，其元素内容为: 【{fatherName}】</h1>
        <MyChild />
    </>)
}

const MyChild: React.FC = () => {

    const timeSleep = (sleepTime: number) => {
        return new Promise<void>(res => {
            setTimeout(() => {
                res()
            }, sleepTime);
        })
    }

    const changeFather = () => {
        // 主要是dispatch的修改，这里传入一个函数，里面有一个参数
        store.dispatch(
            // @ts-ignore
            (dispath) => {
                // 这里的disPatch实际上就是我们之前用的那个dispath，需要的时候，直接dispath({type:xxx,xxx:xx})即可
                // dispath({
                //     type: "xx"
                // })
                timeSleep(300).then(() => {
                    // 需要的时候，直接调用dispath，以完成我们的异步操作
                    dispath({
                        type: "change",
                        changeFatherName: true,
                        name: "New FatherName" + Math.random().toFixed(2)
                    })
                })
            }
        )
    }
    return (<>
        <div>
            <button onClick={changeFather}>点击我，异步修改父元素的文本</button>
        </div>
    </>)
}
```

然后是reducer

> fatherReduce.ts

```ts {11-12}

export default (prevState = {
    // 这里也只有userName
    fatherName: "父元素默认文本"
}, action: any) => {
    // 如果action.type是change  这里只处理userName，所以可以直接这样
    // @ts-ignore
    if (action.type === 'change' && action.changeFatherName) {
        // @ts-ignore
        const newState = { ...prevState }
        // 这里就直接拿dispath传过来的了
        newState.fatherName = action.name
        return newState

    } else {
        return prevState
    }

}

```

好了，接下来开始安装我们的中间件

```shell
pnpm i redux-thunk
```

接着，在store中引入并使用它

```ts {3,1-11)
import { applyMiddleware, combineReducers, createStore } from "redux";
import fatherReduce from "./reduces/fatherReduce";
import reduxThunk from "redux-thunk"

const reduces = combineReducers({
    userReduce, cityReduce, fatherReduce
})

const store = createStore(reduces,
    // 附件中间件:applyMiddleware 应用中间件
    applyMiddleware(reduxThunk)
)


export default store
```

接下来就可以发现，我们的内容奇迹般的可以使用了

![image-20221206145315781](/images/Web/React/03-Router和Redux/image-20221206145315781.png)

![image-20221206145321327](/images/Web/React/03-Router和Redux/image-20221206145321327.png)

### redux-thunk源码解析

刚刚到底发生了什么呢？我们首先看看源码，能发现，它的源码非常少

![image-20221206145446179](/images/Web/React/03-Router和Redux/image-20221206145446179.png)

只有一个index是能看的，这里直接看看index.js吧（index.ts上全都是typescript类型相关，看着有点头大）

```ts

function createThunkMiddleware(extraArgument) {

  var middleware = function middleware(_ref) {
      // 这里的_ref 就是整个Store对象，可以获取其内容
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
      // 可以看到 这里有一个next，应该是redux需要的函数，然后它需要传入一个object 的Action
    return function (next) {
        // 这里的action就是我们传入的action
      return function (action) {
     	// 判断是否是fun
        if (typeof action === 'function') {
         // 如果是，交给我们自己处理，然后我们自己调用dispatch后，会再次回到这个函数，并执行下面的next
          return action(dispatch, getState, extraArgument);
        } 
        return next(action);
      };
    };
  };

  return middleware;
}

var thunk = createThunkMiddleware(); 

thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```

### 扩展-如何取消订阅

假如我们现在想要取消订阅某个store。则可以这样

```jsx
export const App = function (): JSX.Element {
    var [fatherName, setFatherName] = useState(store.getState().fatherReduce.fatherName)
    useEffect(() => {
        // 订阅后可以获取到一个取消订阅的函数
        const unSub = store.subscribe(() => {
            setFatherName(store.getState().fatherReduce.fatherName)
        })
        // 在销毁的时候调用即可
        return ()=>{
            unSub()
        }
        
    })
    return (<>
        <h1>这里是Father元素，其元素内容为: 【{fatherName}】</h1>
        <MyChild />
    </>)
}
```



### Redux-Promise中间件

redux-thunk用起来可能不一定舒服，因为它是callback风格的，目前环境下更多人用的是redux-promise

安装：

```shell
npm i redux-promise
pnpm i redux-promise

# 同时需要安装下types
npm i --save-dev @types/redux-promise
```

要使用他，首先必须要明白一点，**我们始终是要传入一个Action对象交给Reducer处理**，而这些插件，是可以将我们的Func解析出对象给Reducer处理

这里首先在store.ts中引入

```ts

import { applyMiddleware, createStore } from "redux";
import reduxPromise from "redux-promise";

const defaultState = {
    name: "张三",
}
type StoreState = {
    name: string;
    age: number;
}
type actionTypes = "ADD" ;
const store = createStore(

    (prevState: StoreState = defaultState, action: { type: actionTypes, param?: any }) => {
        switch (action.type) {
            case "CHANGE_NAME":
                const name = action.param.name;
                if (!name) {
                    return prevState;
                }
                return {
                    ...prevState,
                    name
                }
        }
        return prevState;

    },
    // PS 这里可以放多个中间件，用逗号分隔即可
    //applyMiddleware(reduxPromise,reduxThunk......)
    applyMiddleware(reduxPromise)
);
export default store
```

我们的reducer始终只是做一个赋值的操作（目前来看

接再来，我们撰写组件

```tsx
import {useEffect, useState} from "react"
import store from "../store"

const changeNameAsyncFunc  = async (name:string) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({
                type: "CHANGE_NAME",
                param:{
                    name: name
                }
            })
        },1000)
    })
}


export const OneChild: React.FC = () => {
    const { dispatch } = store
    const changeName = () => {
        const name = "李四"+Math.random().toFixed(2)
        // 这里就是直接传入一个返回Promise的Func，然后需要返回一个能够被Reduce接受的信息（resolve上
        // 至于这个对象要延迟多久，它丝毫不关心，他只会.then，然后将值提供给reduce
        // @ts-ignore
        dispatch(changeNameAsyncFunc(name))
    }

    const [name, setName] = useState(store.getState().name)
    
    useEffect(()=>{
        const unsubscribe = store.subscribe(()=>{
            setName(store.getState().name)
        })
        return ()=>{
            unsubscribe()
        }
    },[])


    return (
        <div>
            <h1>OneChild</h1>
            <h2>name: {name}</h2>
            <button onClick={changeName}>change name</button>
        </div>
    )
}
```

### 扩展-react-devtool

这个就是可以让你在浏览器中看到对应操作的插件，首先需要：

```shell
npm i redux-devtools-extension
```

接着这样子改动：

```tsx
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';

const middleware = [promiseMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
```

然后**安装浏览器插件**即可（搜下redux，第一个就是

实例：

```tsx

import { applyMiddleware, createStore,compose } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState = {
    name: "张三",
    age: 18,
}
 type StoreState = {
    name: string;
    age: number;
}

type actionTypes = "ADD" | "CHANGE_NAME" | "CHANGE_AGE";

const middlewares = [reduxPromise];


const store = createStore(
    (prevState: StoreState = defaultState, action: { type: actionTypes, param?: any }) => {
        switch (action.type) {
            case "ADD":
                return {
                    ...prevState,
                    age: prevState.age + 1
                }
            case "CHANGE_NAME":
                const name = action.param.name;
                if (!name) {
                    return prevState;
                }
                return {
                    ...prevState,
                    name
                }
            case "CHANGE_AGE":
                const age = action.param.age;
                if (!age) {
                    return prevState;
                }
                return {
                    ...prevState,
                    age
                }
        }
        return prevState;

    },
    composeWithDevTools(applyMiddleware(...middlewares))
   
);
export default store
```

效果

![image-20230319171853659](/images/Web/React/03-Router和Redux/image-20230319171853659.png)



## React-Redux

### 概述

我们再刚刚成功过完了`redux`，如果你使用的是typescript，那么应该不难发现，这玩意是真TM的有点难受，例如你引入了`redux-promise`后，是绝对会出现红色波浪线的hhh，只能*@ts-ignore*来处理

而且过程中，需要自己手动去订阅和取消订阅，过于难受

基于上面这两点（当然还有很多因素），就有了`react-redux`，他能帮我们简化很多东西

> react-redux是基于redux的，所以store本身是不变的，变动的是我们页面UI的调用方式

### 安装和使用

首先安装

```shell
yarn add react-redux
pnpm i react-redux
npm i react-redux
```

他的原理稍微有点复杂，嘛，先用着就行

![image-20230319153300743](/images/Web/React/03-Router和Redux/image-20230319153300743.png)

安装好后，我们首先需要在`index.tsx`中进行注入，来让后续的组件可以直接使用`react-redux`的功能，使用他需要传入一个`redux`的`store`对象

```tsx {4-6,14-16}
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 引入redux-store和store
import { Provider } from "react-redux"
import store from "./store"

const root = ReactDOM.createRoot(
    //绑定id
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
```

store如下

```ts

import { applyMiddleware, createStore,compose } from "redux";
import reduxPromise from "redux-promise";

const defaultState = {
    name: "张三",
    age: 18,
}
type StoreState = {
    name: string;
    age: number;
}

type actionTypes = "ADD" | "CHANGE_NAME";



const store = createStore(
    (prevState: StoreState = defaultState, action: { type: actionTypes, param?: any }) => {
        switch (action.type) {
            case "ADD":
                return {
                    ...prevState,
                    age: prevState.age + 1
                }
            case "CHANGE_NAME":
                const name = action.param.name;
                if (!name) {
                    return prevState;
                }
                return {
                    ...prevState,
                    name
                }
        }
        return prevState;

    },/* preloadedState, */
    applyMiddleware(reduxPromise)
);
export default store
```



接着，还要改动下我们的app

```tsx
import React, { useEffect } from "react";
// 这里额外引入connect 他是一个高阶组件
import { connect } from "react-redux/es/exports";
const App: React.FC = (props) => {

    useEffect(()=>{
        console.log("App接收到的props",props)
    },[])


    return (
        <div>
           Hello World
        </div>
    )
};

// 然后修改返回值 这里connect的语法稍微有点怪
// 但基本这样写就行，需要传入一个func，func接受state，这里你可以对state进行任意加工
export default connect(
    (state: any) => {
        return {
            ...state,
            isApp: true
        }
    }
)(App)

```

接着，打开网页，可以看到

![redux-store](/images/Web/React/03-Router和Redux/image-20230319155128896.png)

可以看到，成功的拿到了整个store对象，并且我们传入的isApp也拿到了

那么问题来了，这个该怎么用呢？这里稍微改下App你就知道了

```tsx
import React, { useEffect } from "react";
import { connect } from "react-redux/es/exports";
const App: React.FC = (props:any) => {
    const { dispatch } = props
    const changeName = () => {
        const name = "李四" + Math.random().toFixed(2)
        // @ts-ignore
        dispatch({
            type: "CHANGE_NAME",
            param: {
                name: name
            }
        })
    }

    return (
        <div>
            <h2>User Name: {props.name}</h2>
            <button onClick={changeName}>change name</button>
        </div>
    )
};

export default connect(
    (state: any) => {
        return state
    }
)(App)

```

可能你还有点懵，这里做了什么？？

有没有发现，useState和useEffect用不上了，我们可以直接在组件中调用props的数据，还可以直接在props中更改数据

那么这个`connect`的意思也很明显了，他就是将一个组件封装成一个store的接受者，我们传入的第一个函数，就是在每次state发生变换时，自动调用的，

也就是，我们可以在第一个函数中给原本state的值其一些别名，例如这样

```tsx
export default connect(
    (state: any) => {
        return {
            ...state,
            userName:state.name,
            userAge:state.age
            //.....
        }
    }
)(App)
```

妙啊，现在根本不需要自己去订阅了hhh

这里的Provider是拿来跨级通讯的，也就是说，我们可以在任意一级使用他，接下来简单测试下

```tsx
import React, { useEffect } from "react";
import { connect } from "react-redux/es/exports";
const App: React.FC = (props: any) => {
    const { dispatch } = props
    const changeName = () => {
        const name = "李四" + Math.random().toFixed(2)
        // @ts-ignore
        dispatch({
            type: "CHANGE_NAME",
            param: {
                name: name
            }
        })
    }

    return (
        <div>
            <h2>User Name: {props.name}</h2>
            <button onClick={changeName}>change name</button>
            <MyChild />
        </div>
    )
};

export default connect(
    (state: any) => {
        return state
    }
)(App)


const Child = (props: any) => {
    const { dispatch } = props
    const changeAge = () => {
        const age = Math.floor(Math.random() * 100)
        dispatch({
            type: "CHANGE_AGE",
            param: {
                age: age
            }
        })
    }
    return (
        <div>
            <h2>User Age: {props.age}</h2>
            <button onClick={changeAge}>change age</button>
        </div>
    )
}
        

const MyChild = connect(
    (state: any) => {
        return state
    })
(Child)
```

![image-20230319160623435](/images/Web/React/03-Router和Redux/image-20230319160623435.png)

在App的子组件内也是可以正常调用的

### Connect的第二个参数

Connect还有一个参数可以传入，如果你传入了的话，那么你将获取不到dispatch

```tsx
import React, { useEffect } from "react";
import { connect } from "react-redux/es/exports";
const App: React.FC = (props: any) => {
    const { dispatch } = props
    const changeName = () => {
        const name = "李四" + Math.random().toFixed(2)
        // @ts-ignore
        dispatch({
            type: "CHANGE_NAME",
            param: {
                name: name
            }
        })
    }

    return (
        <div>
            <h2>User Name: {props.name}</h2>
            <button onClick={changeName}>change name</button>
            <MyChild />
        </div>
    )
};

export default connect(
    (state: any) => {
        return state
    }
)(App)


const Child = (props: any) => {
    const { dispatch } = props
    const changeAge = () => {
        const age = Math.floor(Math.random() * 100)
        props.changeAge(age)
        props.changeRamdomName(dispatch)
    }
    useEffect(() => {
        console.log("Child useEffect")
        console.log(props)
    }, [props])
    return (
        <div>
            <h2>User Age: {props.age}</h2>
            <button onClick={changeAge}>change age</button>
        </div>
    )
}


const MyChild = connect(
    (state: any) => {
        return state
    }
    ,
    // 第二个参数，返回一个Obj，Obj里面全都要是方法
    {
        // 这里返回的值会直接被dispatch
        changeRamdomName() {
            return {
                type: "CHANGE_NAME",
                param: {
                    name: "张三" + Math.random().toFixed(2)
                }
            }
        },
        changeAge(age: number){
            return {
                type: "CHANGE_AGE",
                param: {
                    age: age
                }
            }
        }
    }
)(Child
)
```

### 如何在使用connect的时候父组件额外传递参数给子组件

只需要这样

```tsx {20-21,41-42,54-60}
import React, { useEffect } from "react";
import { connect } from "react-redux/es/exports";
const App: React.FC = (props: any) => {
    const { dispatch } = props
    const changeName = () => {
        const name = "李四" + Math.random().toFixed(2)
        // @ts-ignore
        dispatch({
            type: "CHANGE_NAME",
            param: {
                name: name
            }
        })
    }

    return (
        <div>
            <h2>User Name: {props.name}</h2>
            <button onClick={changeName}>change name</button>
            {/* @ts-ignore */}
            <MyChild customProps={{name:"张三"}} />
        </div>
    )
};

export default connect(
    (state: any) => {
        return state
    }
)(App)


const Child = (props: any) => {
    const { dispatch } = props
    const changeAge = () => {
        const age = Math.floor(Math.random() * 100)
        props.changeAge(age)
        props.changeRamdomName(dispatch)
    }
    useEffect(() => {
        console.log("Child useEffect")
        console.log(props)
    }, [props])
    return (
        <div>
            <h2>User Age: {props.age}</h2>
            <button onClick={changeAge}>change age</button>
        </div>
    )
}


const MyChild = connect(
    (state: any,otherProps) => {
        return {
            ...state,
            // @ts-ignore 这里otherProps就是父组件传递的propsObject
            propsName: otherProps.customProps.name
        }
    }
    ,
    {
        changeRamdomName() {
            return {
                type: "CHANGE_NAME",
                param: {
                    name: "张三" + Math.random().toFixed(2)
                }
            }
        },
        changeAge(age: number){
            return {
                type: "CHANGE_AGE",
                param: {
                    age: age
                }
            }
        }
    }
)(Child
)
```

结果如下，你在结果中也可以直接拿到父组件传递的props

![image-20230319164107962](/images/Web/React/03-Router和Redux/image-20230319164107962.png)

### 如何在Typescript中优雅的给connect包装后的组件传递数据

我们首先将父子组件需要的功能说明白，父组件显示store的Name，可以传递一个字符串给子组件，子组件可以调用某个方法，修改store中的Name为刚刚父组件传递的

```tsx
import { ConnectedProps, connect } from "react-redux"
// 首先声明下store的state类型
type StoreState = {
    name: string;
    age: number;
}

// 定义父组件的connector
const fatherConnector = connect((state: StoreState) => state)
// 定义props的类型 这样父组件就有良好的typescript提示了
type FatherProps = ConnectedProps<typeof fatherConnector>

const Father: React.FC<FatherProps> = (props) => {
    return (
        <div>
            <h2>User Name: {props.name}</h2>
            <ExportChild  customName="王老五" />
        </div>
    )
}
export default fatherConnector(Father)

// 子组件要接受的额外的props
interface OwnProps {
    customName: string
}
const childConnector = connect(
    /**
     * 这里可以接收到两个参数 第一个是store的state 第二个是父组件传递的props
     */
    (state: StoreState, ownProps: OwnProps) => ({
        name: state.name,
        customName: ownProps.customName
    }),
    // dispatch可以通过函数的方式调用
    (dispatch) => ({
        // 这里可以写dispatch
        changeName: (name: string) => dispatch({
            type: "CHANGE_NAME",
            param:{
                name
            }
         })
    })
)
// 定义子组件的props类型 这里的 & OwnProps 用于取并集
type ChildProps = ConnectedProps<typeof childConnector> & OwnProps
const Child: React.FC<ChildProps> = (props) => {
    const changeName = () => {
        props.changeName(props.customName)
    }
    return (
        <div>
            <button onClick={changeName}>ChangeName</button>
        </div>
    )
}
const ExportChild = childConnector(Child)
```

效果

![image-20230319170801942](/images/Web/React/03-Router和Redux/image-20230319170801942.png)

# 扩展-Redux持久化

某些情况下，需要持久化Redux到本地,或者说选择性的讲一些东西存储在localStorage中

当然不可能自己写咯，这里只需要借助一个库即可

```shell
npm i redux-persist
pnpm i redux-persist
yarn add redux-persist
```

使用他，需要进行几步操作，先看看reduce的样子（只有一个userReduce

```ts


const defaultState = {
    name: "张三",
    age: 18,
}
type StoreState = {
    name: string;
    age: number;
}

type actionTypes = "ADD" | "CHANGE_NAME" | "CHANGE_AGE";

export default (prevState: StoreState = defaultState, action: { type: actionTypes, param?: any }) => {
    switch (action.type) {
        case "ADD":
            return {
                ...prevState,
                age: prevState.age + 1
            }
        case "CHANGE_NAME":
            const name = action.param.name;
            if (!name) {
                return prevState;
            }
            return {
                ...prevState,
                name
            }
        case "CHANGE_AGE":
            const age = action.param.age;
            if (!age) {
                return prevState;
            }
            return {
                ...prevState,
                age
            }
    }
    return prevState;

}
```

这里没有要改的，直接动`store`

```ts {6-8,17-24,26-27,37-38}

import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from 'redux-devtools-extension';
import userReduce from "./userReduce";
// 引入持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


const reducers = combineReducers({
    user: userReduce
});

const middlewares = [reduxPromise];

// 持久化配置
const persistConfig = {
    // localStorage的key
    key: 'my-app-test-application',
    storage,
    // 只存储某些reducer
    whitelist: ['user'] // 只储存userReducer
}

// 持久化reducer
const persistedReducer = persistReducer(persistConfig, reducers)



export const store = createStore(
    persistedReducer
    , composeWithDevTools(applyMiddleware(...middlewares))

);

// 持久化store
export const persistor = persistStore(store)


export default store

```

你可能会问，`persistor`是干啥用的？

别急，还要到`Index.tsx`中加一点点内容

```tsx {4-6,15-21}
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"
import {persistor,store} from "./store"
import {PersistGate} from "redux-persist/integration/react"

// 创建react实例
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/* 
                    这里的loading是异步加载的loading组件，可以自定义，这里为了方便就直接写null了
                    也就是说，如果loading不为null，那么在异步加载完成之前，会显示loading组件
                */}
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
```

这里基本是固定写法，不会变动的

效果：

![image-20230319175442039](/images/Web/React/03-Router和Redux/image-20230319175442039.png)



