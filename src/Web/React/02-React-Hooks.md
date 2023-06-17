---
title: 02-React-Hooks
date: 2022-5-3 19:16:03
category: React
tag:
 - React
 - ReactHooks
---

## 概述

面对对象在React中有如下几个缺陷

1. 高阶组件为了复用，导致代码层级变得复杂
2. 生命周期复杂
3. 写成function组件（函数式组件），又因为其无状态性，需要状态，又改成了class，成本高

所以有了React Hooks

现在一般用React都是Hooks+Typescript用的多，用class的没几个（生产中）

## Use State状态

在function中使用state，只需要这样

```tsx {9,13-19}
import React, {useState} from 'react';

export default function FuncDemo(): JSX.Element {

    /**
     * 这里结构获取到了两个值：一个是动态对象，一个是修改这个动态对象的方法
     * 这里结构赋值因为是用数组来赋值的，所以说起的名字随意，不过一般都是用state，name之类的来声明
     */
    const [message, setMessage] = useState<string>("Hello World")

    return (
        <>
            {/*显示对象*/}
            {message}
            <button onClick={() => {
                //修改对象
                setMessage(message + message)
            }}>Change Message
            </button>
        </>
    )
}
```

如果你学习过Vue（Vue3 setup），那么对这个语法应该不陌生了，它相当于Vue中的一个动态决定的`ref`或者`reactive`

在它里面也可以放一个obj，同时更新的时候如果是一个对象则必须得全量更新，如下，你也可以尝试不全量更新，那样没被更新的值将会默认赋予undefended

```tsx
import React, {useState} from 'react';

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {

    const [user, setUser] = useState<User>({name: "张三", age: 18});

    return (
        <>
            <h3>User的信息为：</h3>
            <p>姓名：{user.name}</p>
            <p>年龄：{user.age}</p>
            <button onClick={() => {
                //注意，这里更新必须得是全量更新，如果说没有给某一个东西一个值，则其将会被赋予空值(null|undefended)
                setUser({age: user.age + 1, name: user.name})
            }}>年龄+1
            </button>
        </>
    )
}
```

当然，也可以给input绑定

```tsx
import React, {useState} from 'react';

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {

    const [user, setUser] = useState<User>({name: "张三", age: 18});

    const ChangeUserName = (userName: string) => {
        setUser({
            name: userName,
            age: user.age
        })
    }

    return (
        <>
            <h3>User的信息为：</h3>
            <input type="text" value={user.name} onChange={event => ChangeUserName(event.target.value)}/>
            <p>年龄：{user.age}</p>
            <button onClick={() => {
                //注意，这里更新必须得是全量更新，如果说没有给某一个东西一个值，则其将会被赋予空值(null|undefended)
                setUser({age: user.age + 1, name: user.name})
            }}>年龄+1
            </button>

        </>
    )
}
```

## UseEffect 监听属性和初始化值

你可以尝试下在函数中直接编写一个ajax请求，并执行（例如`axios.get()`），然后你就会发现这个请求一直在被执行，因为每当有数据更新的时候，就会触发重新渲染，而react的class中重新渲染是调用render方法，function中重新渲染是直接让这个function重新run，所以将会出现那种情况（不信的话你自个试试）

在Vue中，有一个UseEffect，用途是监听某个值，在React中同理，它有几种写法

### 初始化值

首先是第一种

```tsx {20-22}
import React, {useEffect, useState} from 'react';
import {createBScroll} from "@better-scroll/core";

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {

    const [user, setUser] = useState<User>({name: "张三", age: 18});

    const ChangeUserName = (userName: string) => {
        setUser({
            name: userName,
            age: user.age
        })
    }
    // 主要是第二个参数，如果第二个参数是一个空数组的话，那么useEffect中的第一个回调参数只会在被创建的时候执行一次
    useEffect(() => {
        // 这里就相当于是vue中的 onMount 挂在完毕 可以访问dom的生命周期一样
        setUser({name: user.name, age: user.age + 1})
    }, [])

    return (
        <>
            <h3>User的信息为：</h3>
            <input type="text" value={user.name} onChange={event => ChangeUserName(event.target.value)}/>
            <p>年龄：{user.age}</p>
            <button onClick={() => {
                //注意，这里更新必须得是全量更新，如果说没有给某一个东西一个值，则其将会被赋予空值(null|undefended)
                setUser({age: user.age + 1, name: user.name})
            }}>年龄+1
            </button>

        </>
    )
}
```

效果

![image-20220503223213351](/images/Web/React/02-React-Hooks/image-20220503223213351.png)



### 监听属性

那么第二个参数应该传递什么呢？在Vue中这个东西是起到监听某个值的作用，所以说....这里第二个参数可以穿一批要监听的值，例如我想每次修改name的时候让其自动变成首字母大写，即可这样

```tsx
import React, {useEffect, useState} from 'react';
import {createBScroll} from "@better-scroll/core";

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {

    const [user, setUser] = useState<User>({name: "张三", age: 18});

    const ChangeUserName = (userName: string) => {
        setUser({
            name: userName,
            age: user.age
        })
    }
    useEffect(() => {
        setUser({name: user.name, age: user.age + 1})
    }, [])
    useEffect(() => {
        setUser({
            age: user.age,
            //加三元防止空值
            name: user.name ? user.name[0].toUpperCase() + user.name.slice(1, user.name.length) : ""
        })
        console.log("首字母自动大写了")
    }, [user.name])

    return (
        <>
            <h3>User的信息为：</h3>
            <input type="text" value={user.name} onChange={event => ChangeUserName(event.target.value)}/>
            <p>年龄：{user.age}</p>
            <button onClick={() => {
                //注意，这里更新必须得是全量更新，如果说没有给某一个东西一个值，则其将会被赋予空值(null|undefended)
                setUser({age: user.age + 1, name: user.name})
            }}>年龄+1
            </button>

        </>
    )
}
```

绑定特定的值的话，会在初始化的时候和该值更新的时候触发

效果：

![image-20220503223800651](/images/Web/React/02-React-Hooks/image-20220503223800651.png)





::: warning

不要对useEffect的第二个值(dept)撒谎，如果你明明使用了某个变量，却没有声明在依赖中，等于向react撒了谎，后果就是，当依赖的变量改变时，useEffect也不会再执行，eslint会警告

PS：上方第二个例子中实际上也是撒了谎的，但是不知道为啥还是会执行，一般来说，useState监听的是一个变量（str，number等），向监听一个obj的属性的话...最好还是把一个属性抽离出来

:::

### 监听销毁

这样即可

```tsx {25-28}
import React, {useEffect, useState} from 'react';
import {createBScroll} from "@better-scroll/core";

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {

    const [user, setUser] = useState<User>({name: "张三", age: 18});

    const ChangeUserName = (userName: string) => {
        setUser({
            name: userName,
            age: user.age
        })
    }
    useEffect(() => {
        setUser({name: user.name, age: user.age + 1})
        let timer = setInterval(() => {
            console.log("Hello World")
        }, 1000);
        // return一个func出去，如果这个组件被销毁了，这会调用这个函数,如果说下方的数组内有值的话，则每次在更新的时候，下方的函数也会被执行
        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <>
            <h3>User的信息为：</h3>
            <input type="text" value={user.name} onChange={event => ChangeUserName(event.target.value)}/>
            <p>年龄：{user.age}</p>
            <button onClick={() => {
                //注意，这里更新必须得是全量更新，如果说没有给某一个东西一个值，则其将会被赋予空值(null|undefended)
                setUser({age: user.age + 1, name: user.name})
            }}>年龄+1
            </button>

        </>
    )
}
```

### useLayoutEffect

这个语法和useEffect一致，不同的地方是这个东西是同步的，而useEffect是异步的，也就是useLayoutEffect可以有效**防止页面抖动**

这样说吧，如果想要ajax，则useEffect，否则的话就useLayoutEffect（例如拿它来给首字母大小写变换等）

例如刚刚的年龄+1，你用`useEffect`的话能明显的看到开始的默认值18，但是用了`useLayoutEffect`则不会

```tsx {20}
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {createBScroll} from "@better-scroll/core";

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {

    const [user, setUser] = useState<User>({name: "张三", age: 18});

    const ChangeUserName = (userName: string) => {
        setUser({
            name: userName,
            age: user.age
        })
    }
    useLayoutEffect(() => {
        setUser({name: user.name, age: user.age + 1})
        let timer = setInterval(() => {
            console.log("Hello World")
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <>
        <h3>User的信息为：</h3>
        <input type="text" value={user.name} onChange={event => ChangeUserName(event.target.value)}/>
        <p>年龄：{user.age}</p>
        <button onClick={() => {
                //注意，这里更新必须得是全量更新，如果说没有给某一个东西一个值，则其将会被赋予空值(null|undefended)
                setUser({age: user.age + 1, name: user.name})
            }}>年龄+1
        </button>

        </>
    )
}
```

## UseCallback

首先我们知道useState创建的东西并不会随着东西变化而重新赋值

```tsx
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {createBScroll} from "@better-scroll/core";

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {

    const [count, setCount] = useState<number>(0)

    const addCount = () => {
        setCount(count + 1)
    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <h1>{count}</h1>
            <button onClick={addCount}>Count++</button>
        </div>


    )
}
```

但如果是一个普通的数值的话，例如

```typescript
let count = 0
```

我们想让这个变量在每次更新的时候不会重新赋值

或者说我想要一个可以动态修改但是不会触发页面更新的值

只需要用到useCallBack即可，它的语法和useEffect之类的一样，作用就是让一个常规变量具有`记忆`属性

```tsx
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {createBScroll} from "@better-scroll/core";

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {


    let count = 0


    const addCount = useCallback(() => {
        count++
        console.log(count)
    }, [count])

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <h1>{count}</h1>
            <button onClick={addCount}>Count++</button>
        </div>


    )
}
```

当然，这种变量的更新并不能导致页面的更新，useCallback的作用就是让我们始终保留一个值，不会随着页面的更新而重新定义和创建

![image-20220504133626946](/images/Web/React/02-React-Hooks/image-20220504133626946.png)

## UseMemo

useCallBack的功能完全可以由useMemo所取代，如果想使用useMemo返回一个记忆函数也是完全可以的

他们两个的语法区别：

```typescript
// useCallBack: 他这里并没有执行我们传入的函数，只是将这个函数的缓存重新返回给我们了
useCallback(fn:(any)=>void,[] as any[])
// useMemo 会执行这个函数，并将结果返回给我们
useMemo(fn:(any)=>fn(any)=>any,[] as any[])
```

例子：

```tsx
import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {createBScroll} from "@better-scroll/core";

interface User {
    name: string,
    age: number,
}


export default function FuncDemo(): JSX.Element {


    let count = 0


    const addCount = useMemo(() => () => {
        count++
        console.log(count)
        return count
    }, [count])

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <h1>{count}</h1>
            <button onClick={addCount}>Count++</button>
        </div>


    )
}
```

当然，这玩意也不会造成页面更新，作用就是可以获取某个成员的最新的值

## UseRef

也就是获取dom对象，例子

```tsx
import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';


export default function FuncDemo(): JSX.Element {

    /**
     * Typescript使用的时候必须得先赋值一个null（初始值），否则会爆红
     */
    const userInputRef = useRef<HTMLInputElement>(null)
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            // 绑定Ref
            <input type="text" ref={userInputRef} onChange={
                () => {
                    // 不禁止的话也会报错，这里current可以获取dom
                    // @ts-ignore
                    console.log(userInputRef.current.value)
                }
            }/>
        </div>


    )
}
```

## useContext

这个东西比原来的Context好用多了，相当于不需要那样贼难看的标签就可以使用Context

useContext的作用是消费Context，并不能发布数据，例子：

```tsx {7,15}
import React, {createContext, useContext} from 'react';


const MyContext = createContext<string>("Hello World")

export default function FuncDemo(): JSX.Element {
    const context = useContext(MyContext);
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <h2>这里是消费者，获取到的context内容为:{context}</h2>
        </div>
    )
}
```

页面效果

![image-20220504144743469](/images/Web/React/02-React-Hooks/image-20220504144743469.png)

## useReducer

这个就是一小的状态共享器，没啥用，比较鸡肋，所以不多说明了，之后有Redux替代

## 扩展-Http请求和跨域处理

这里使用的假数据:[JSONPlaceholder - Free Fake REST API (typicode.com)](https://jsonplaceholder.typicode.com/)

Http请求使用老一套Axios就行

```shell
pnpm i axios
```

然后写一个请求的Demo 这里以简单获取一个`/posts`为例

```tsx
import { useState } from "react"
import axios from "axios"
interface Post {
    id: number,
    title: string,
    body: string,
    userId: number
}

export default function (): JSX.Element {
    const [userPost, setUsePost] = useState<Post>()
    const getUserPost = async () => {
        const result = await axios.get(`/api/posts/${Math.round(Math.random() * 100)}`)
        setUsePost(result.data)
    }
    return (<>
        <h1>Hello World</h1>
        <button  onClick={getUserPost}>Click Me Show Http Result</button>
        <div>
            {userPost &&
                <>
                    <h1>{userPost.title}</h1>
                    <h2>{userPost.body}</h2>
                </>
            }
        </div>
    </>)
}
```

接着是解决跨域，Dev环境中解决方案为

```shell
pnpm i http-proxy-middleware
```

然后在`src`目录下新建`setupProxy.js`文件，注意，是js文件（我目前也没搞懂为啥）

然后无脑填这个就行，如果有多个要代理的应该是在use里挂多个createProxy吧…

```js
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(
            "/api",
            {
                target: 'https://jsonplaceholder.typicode.com',
                changeOrigin: true,
                pathRewrite: (path) => {
                    console.log(path)
                    return path.replace(/^\/api/, "")
                },
                ws: true,
            }
        ),
    );
}
```

## 扩展-React结合Twindcss

