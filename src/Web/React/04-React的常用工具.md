---
title: 04-React的常用工具
date: 2023-3-19 18:19:10
category: React
tag:
 - React
 - React Util
 - Mobx
 - Immutable
---

## Immutable-深拷贝

官网：[immutable-js/immutable-js: Immutable persistent data collections for Javascript which increase efficiency and simplicity. (github.com)](https://github.com/immutable-js/immutable-js)

**深拷贝**这里就不多赘述了，有很多实现方式，Immutable给的方式比较另类，详情见例子

::: tip

如果你还不明白深拷贝是什么，建议去了解下Object

:::

> 安装

```shell
npm i immutable
pnpm i immutable
yarn i immutable
```

> 再react中的简单使用示例

```tsx
import Immutable from "immutable"
import { useState } from "react"


// 使用Immutable.fromJS()方法将某个转换为Immutable对象
const immutableObj = Immutable.fromJS({
    name: 'test',
    age: 18,
})

const MyComponent: React.FC = () => {

    const [objState, setObjState] = useState(
        // 这里使用toJS()方法将Immutable对象转换为普通对象
        // 转换后的对象实际上是一个深拷贝，与原对象没有任何关系
        immutableObj.toJS()
    )


    return (
        <div>
            <h1>TestCopy</h1>
            <p>objState.name: {objState.name}</p>
            <p>objState.age: {objState.age}</p>
            <button onClick={() => {
                // 这里使用setIn()方法修改对象中的某个属性
                // setIn()方法会返回一个新的Immutable对象
                const newObj = immutableObj.setIn(['name'], 'newName')
                // 这里使用toJS()方法将Immutable对象转换为普通对象
                // 转换后的对象实际上是一个深拷贝，与原对象没有任何关系
                setObjState(newObj.toJS())
            }}>修改name</button>
        </div>
    )
}
export default MyComponent
```

嘛，感觉整体来说不如一些例如lodash之类的方便，估计是在特定的场合好用...

## Mobx

这东西是一个功能比较强大的，**上手简单的状态管理工具**，就像是Vue的[Pinia](https://pinia.vuejs.org/zh)那样，主要用途是替代redux

文档地址：[MobX 中文文档](https://cn.mobx.js.org/)

![MobX unidirectional flow](/images/Web/React/04-React的常用工具/flow.png)

Mobx实际上运用到的技术和Vue挺像的，利用了Object.defineProperties添加get/set，写法上偏向OOP，且并非单一store，可以多store

::: tip

Redux默认以Javascript原生对象形式存储数据，而Mobx使用可观察对象

:::

> 优点：

- 学习成本小
- Typescript友好

> 缺点

- 过于自由，Mobx提供的约定比较少，团队编码风格容易不统一
- 中间件较少（目前

### 安装

安装

```shell
npm install mobx
pnpm install mobx
yarn add mobx
```

默认是安装5.+的版本，如果需要兼容老的浏览器例如IE11，请安装`npm i mobx@4`

### 简单使用

#### 了解observable和autorun

先来一个简单的例子

```ts
import { cloneDeep } from "lodash"
import { autorun, observable } from "mobx"


// Q:observable.box() 是什么?
// A:observable.box() 是一个函数, 用来创建一个可观察的值, 该值可以被观察, 也可以被修改,就像是Vue3中的ref()一样
const count = observable.box(0)

// Q:observable.object() 是什么?
// A:observable.object() 是一个函数, 用来创建一个可观察的对象, 该对象可以被观察, 也可以被修改,就像是Vue3中的reactive()一样
const user = observable.object({
    name: "张三",
    age: 18,
    address: {
        province: "广东省",
        city: "广州市"
    }
})


// Q:observable.array() 是什么?
// A:observable.array() 是一个函数, 用来创建一个可观察的数组, 该数组可以被观察, 也可以被修改,就像是Vue3中的reactive()一样
const list = observable.array([1, 2, 3])


// 当然，你可以直接用observable()函数来创建一个可观察的对象 这样创建就相当于是observable.object()函数创建的
const dog = observable({
    name: "旺财",
    age: 2
})


// 总之，observable()函数可以创建可观察的值、对象、数组，如果你想要基础类型的值，那么就用observable.box()函数创建

// 如何监听值的变化？
// Q:autorun() 是什么?
// A:autorun() 是一个函数, 用来监听值的变化, 当值发生变化时, 会自动执行回调函数
autorun(() => {
    console.log("count:", count.get())
})
// 上方代码中，只要count的值发生变化，就会自动执行回调函数，打印出count的值
// 注意，在初始化的时候，也会执行一次回调函数，所以，上方代码会打印出count的值，也就是0 

// Q：是否可以深度监听值的变化？
// A：当然可以
autorun(() => {
    console.log("user:", cloneDeep(user))
    throw new Error("error")
},
    // Autorun 接收第二个参数，它是一个参数对象，有如下可选的参数:
    {
        // delay: number, // 延迟执行回调函数的时间，单位是毫秒
        delay: 1000,
        // name: string, // 用于调试的名称 这个东西主要是用于全局监听器spy()的，我们暂时不用管它
        name: "user",
        // scheduler: (callback: () => void) => void, // 用于调度回调函数的调用
        // 也就是设置了这个，将会覆盖delay参数
        // 这里的callback，就是第一个参数，也就是autorun的回调函数
        scheduler: (callback) => {
            setTimeout(callback, 100)
        },
        // onError: (error: any) => void, // 当回调函数抛出异常时，会调用这个函数
        // 如果不设置，那么异常会被抛出
        onError: (error) => {
            console.log("error:", error)
        }
    }
)

// 尝试一下
count.set(1)
setTimeout(() => {
    user.address.city = "深圳市"
}, 300);
```

![image-20230320211257752](/images/Web/React/04-React的常用工具/image-20230320211257752.png)

#### 简单结合react使用

以下是一个最简单演示

> store

```ts
import { observable } from "mobx";


const store = observable({
    name: "John",
    age: 30,
    get info() {
        return `${this.name} is ${this.age} years old`;
    },
    addressList: [
        {
            id: 1,
            address: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001"
        },
    ]
})

export default store;

```









```tsx
import React, { useEffect, useState } from 'react'
import store from "./store"
import { autorun } from "mobx"


const App: React.FC = () => {

    useEffect(() => {
        const ev = autorun(() => {
            console.log(store.name)
        })
        return () => {
            ev()
        }

    }, [])

    return (
        <>
            <div>{store.name}</div>
            <Child />
        </>
    )
}

const Child: React.FC = () => {

    const changeUserName = () => {
        store.name = "change name"+Math.random().toFixed(2)
    }
    const [name, setName] = useState(store.name)
    useEffect(() => {
        const ev = autorun(() => {
            setName(store.name)
        })
        return () => {
            ev()
        }
    })



    return (
        <>
            <div>Child</div>
            <button onClick={changeUserName}>点我更改store Name</button>

            <h2>
                current Name is {name}
            </h2>
        </>
    )


}



export default App
```

### configure

这里也可以来配置`Mobx`的一些内容

如果希望规范的开发，建议将`enforceActions`设置为`never`，设了后我们上面章节的操作将会引发error

```ts
import { observable, configure } from "mobx";


// Q:configure可以配置哪些内容？
configure({
    // 1. 是否允许在动作外部修改状态
    // "observed" | "never" | "always"
    // 默认是"observed"，只有在动作中修改状态才会报错
    // "never"：不允许在动作外部修改状态
    // "always"：允许在动作外部修改状态
    // 动作外指的是不在action中的代码
    enforceActions: "observed", 
    // 2. computedRequiresReaction
    // 是否要求计算值必须在React中使用
    // 默认是false
    computedRequiresReaction: false,
    // 3. reactionRequiresObservable
    // 是否要求反应必须在可观察的上下文中使用
    // 默认是false
    reactionRequiresObservable: false,
    // 4. observableRequiresReaction
    // 是否要求可观察的必须在反应的上下文中使用
    // 默认是false
    observableRequiresReaction: false,
    // 5. isolateGlobalState
    // 是否隔离全局状态
    // 默认是false,如果为true，那么在一个模块中创建的observable对象，只能在该模块中使用
    isolateGlobalState: false,
    // 6. disableErrorBoundaries
    // 是否禁用错误边界 也就是不捕获错误
    // 默认是false 
    disableErrorBoundaries: false,
    // 7. useProxies
    // 使用的代理类型 "always" | "never" | "ifavailable"
    // 默认是"ifavailable" 如果不支持代理，那么就使用ES5的方式
    // "always"：总是使用代理(Es6 Proxy)
    // "never"：总是使用ES5的方式
    // "ifavailable"：如果支持代理，那么就使用代理，否则使用ES5的方式
    useProxies: "ifavailable",
    // 8. safeDescriptors
    // 是否使用安全的描述符
    // 默认是false
    // 如果为true，那么在使用action时，会使用Object.defineProperty()来设置属性
    // 如果为false，那么在使用action时，会使用Object.assign()来设置属性
    safeDescriptors: false,
    // 9. reactionScheduler
    // 反应调度程序
    // 默认是undefined
    // 如果设置了，那么在使用reaction时，会使用该调度程序来调度反应
    // 如果没有设置，那么就使用默认的调度程序
    reactionScheduler: undefined,
});
```

### action

这里有很多种方法，这里先来看看最简单的

#### 内联action

```ts {19-22,24-25}
import { observable, action } from "mobx";


const store = observable({
    name: "John",
    age: 30,
    get info() {
        return `${this.name} is ${this.age} years old`;
    },
    addressList: [
        {
            id: 1,
            address: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001"
        },
    ],
    // 创造一个func
    changeName(name: string) {
        this.name = name;
    }
}, {
    // 将这个func申明为action
    changeName: action,
}
)

export default store;

```

使用

```tsx {29}
import React, { useEffect, useState } from 'react'
import store from "./store"
import { autorun } from "mobx"


const App: React.FC = () => {

    useEffect(() => {
        const ev = autorun(() => {
            console.log(store.name)
        })
        return () => {
            ev()
        }

    }, [])

    return (
        <>
            <div>{store.name}</div>
            <Child />
        </>
    )
}

const Child: React.FC = () => {

    const changeUserName = () => {
       store.changeName("new name")
    }
    const [name, setName] = useState(store.name)
    useEffect(() => {
        const ev = autorun(() => {
            setName(store.name)
        })
        return () => {
            ev()
        }
    })



    return (
        <>
            <div>Child</div>
            <button onClick={changeUserName}>点我更改store Name</button>

            <h2>
                current Name is {name}
            </h2>
        </>
    )


}



export default App
```

### 使用装饰器

#### 注解前置知识-装饰器

这个是ES7开始有的特性，大概就像是其他语言的注解那样

```ts
function log(target: Object, name: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
        console.log(`the method ${name} is called with ${JSON.stringify(args)}`)
        const result = originalMethod.apply(this, args)
        console.log(`the method ${name} is called with ${JSON.stringify(args)},the result is ${JSON.stringify(result)}`)

    }
    return descriptor
}


class Person {
    @log
    public sayHello(name: string) {
        console.log(`hello ${name}`)
        return `hello ${name}`
    }
}
```

上面是一个简单的例子，可以通过它来进行AOP，貌似这玩意只能用于class?

效果：

![image-20230322190827633](/images/Web/React/04-React的常用工具/image-20230322190827633.png)

#### 装饰器的使用前置条件-babel的额外配置

如果你的项目可以正常的运行[下方](###使用Mobx的注解)的代码并且能够成功的输出，那么可以跳过这一步

首先安装几个包

```shell
npm i @babel/core @babel/plugin-proposal-decorators @babel/preset-env customize-cra react-app-rewired
```

然后更改`package.json`的脚本内容成这样

```json
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
```

接着，根目录新建`.babelrc`

```json
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
           
        ]
    ]
}
```

再然后根目录新建一个`config-overrides.js`

```js
const path = require('path');
const { override, addDecoratorsLegacy } = require('customize-cra');


function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

const customize = () => (config, env) => {
    config.resolve.alias['@'] = resolve('src');
    if (env === 'production') {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            'react-router': 'ReactRouter',
        }            
    }
    // 如果你使用了antd之类的，这里可以加上对应的配置
    
    return config;
}

module.exports = override(addDecoratorsLegacy(), customize());
```







### 使用Mobx的注解

下面是一个简单的带有action的例子，可以让代码变得非常顺畅

```ts
import { observable, action, configure, makeAutoObservable } from "mobx";

// 开启装饰器
configure({ enforceActions: "observed" });


class Store {
    @observable
    count: number = 0;

    @action
    increment = () => {
        this.count++;
    };

    @observable
    name: string = "John";

    @action
    changeName = (name: string) => {
        this.name = name;
        console.log(this.name);
    }
	
    
    // 参考官方文档https://zh.mobx.js.org/enabling-decorators.html#%E5%90%AF%E7%94%A8%E8%A3%85%E9%A5%B0%E5%99%A8%E8%AF%AD%E6%B3%95-
    // 在mobx6之后 ，都需要使用makeAutoObservable来激活装饰器
    constructor() {
        makeAutoObservable(this);
    }


}

const store = new Store();

export default store;
```

使用

```tsx
import React, { useEffect, useState } from 'react'
import store from "./store"
import { autorun } from "mobx"


const App: React.FC = () => {

    return (
        <>
            <Child />
        </>
    )
}

const Child: React.FC = () => {

    const changeUserName = () => {
        store.changeName(Math.random().toString(36).substring(7))
    }
    const [name, setName] = useState(store.name)

    useEffect(() => {
        autorun(() => {
            setName(store.name)
            console.log("autorun")
        })
    }, [])
    

    return (
        <>
            <div>Child</div>
            <button onClick={changeUserName}>点我更改store Name</button>

            <h2>
                current Name is {name}
            </h2>
        </>
    )
}

export default App
```

效果如下(`mobx@6`)

![image-20230322194529830](/images/Web/React/04-React的常用工具/image-20230322194529830.png)

### 异步action-runInAction

我们刚刚都是进行的同步操作，如果需要进行异步操作，则需要这样（如果你不是严格模式下，不这样做也无所谓 不过还是建议加上

```ts {51-63)
import { observable, action, configure, makeAutoObservable, runInAction } from "mobx";
const faker = require('faker');

faker.locale = "zh_CN";

type CustomUser = {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    address: string;
    company: string;
}

// 开启装饰器
configure({ enforceActions: "observed" });


class Store {
    @observable
    count: number = 0;

    @action
    increment = () => {
        this.count++;
    };

    @observable
    name: string = "John";

    @action
    changeName = (name: string) => {
        this.name = name;
        // console.log(this.name);
        this.fetchUserList();
    }

    constructor() {
        makeAutoObservable(this);
    }


    @observable
    userList: CustomUser[] = [];

	@action
    async fetchUserList() {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        runInAction(() => {
            this.userList = data.map((item: any) => {
                return {
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    avatar: faker.image.avatar(),
                    address: faker.address.streetAddress(),
                    company: faker.company.companyName(),
                }
            });
        })
        console.log(JSON.stringify(this.userList));
    }


}

const store = new Store();

export default store;
```

### 计算属性-computed

这里就不说普通的使用方式了 在注解的使用中，只需要`@computed` 然后接上get 即可

```ts {26-29}
import { observable, action, configure, makeAutoObservable, runInAction, computed } from "mobx";


type CustomUser = {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    address: string;
    company: string;
}

// 开启装饰器
configure({ enforceActions: "observed" });


class Store {
    @observable
    count: number = 0;

    @action
    increment = () => {
        this.count++;
    };
    @computed
    get doubleCount() {
        return this.count * 2;
    }
    constructor() {
        makeAutoObservable(this);
    }

}

const store = new Store();

export default store;
```



## mobx-react的使用

有没有发现，刚刚写代码还是跟之前写最开始的redux一样，不舒服，当然，官方是准备了react配套的

```shell
npm i mobx-react-lite
# 注意 这里是有个lite，mobx在6.+后推荐这样 同时玩法和之前版本也有不同 如果你想了解之前版本如何操作 请百度
```

store文件

```ts
import { observable, action, configure, makeAutoObservable, runInAction, computed } from "mobx";
const faker = require('faker');

faker.locale = "zh_CN";

type CustomUser = {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    address: string;
    company: string;
}

// 开启装饰器
configure({ enforceActions: "observed" });


class Store {
    @observable
    count: number = 0;

    @action
    increment = () => {
        this.count++;
    };
    @computed
    get doubleCount() {
        return this.count * 2;
    }

    constructor() {
        makeAutoObservable(this);
    }


}

const store = new Store();

export default store;
```

### 函数式

使用非常简单，不需要在到`index.tsx`中写入其他东西，相当舒服了

```tsx
import { useObserver } from 'mobx-react-lite';
import React from 'react'
import store from "./store"


const App: React.FC = () => {
    return useObserver(() => (
        <div>
            <h1>App</h1>
            <h2>{store.doubleCount}</h2>
            <button onClick={() => store.increment()}>Increment</button>
        </div>
    ));
}

export default App

```

> 当然，如果你赶紧这样太麻烦，也可以改成：
>
> ```tsx
> import { useObserver, Observer } from 'mobx-react-lite';
> import React from 'react'
> import store from "./store"
> 
> 
> const App: React.FC = () => {
>     // return useObserver(() => (
>     //     <div>
>     //         <h1>App</h1>
>     //         <h2>{store.doubleCount}</h2>
>     //         <button onClick={() => store.increment()}>Increment</button>
>     //     </div>
>     // ));
>     // 改成使用Observer组件
>     return (
>         <Observer>
>             {() => (
>                 <div>
>                     <h1>App</h1>
>                     <h2>{store.doubleCount}</h2>
>                     <button onClick={() => store.increment()}>Increment</button>
>                 </div>
>             )}
>         </Observer>
>     )
> }
> export default App
> ```
>
> 



效果：

![msedge_pHxIbr7fku](/images/Web/React/04-React的常用工具/msedge_pHxIbr7fku.gif)

### OOP

这个相对来说比函数式简单些，看个人习惯吧

```tsx
import { observer } from 'mobx-react-lite';
import counterStore from './store';

@observer
class Counter extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => counterStore.increment()}>+</button>
        <span>{counterStore.count}</span>
        <button onClick={() => counterStore.decrement()}>-</button>
      </div>
    );
  }
}

export default Counter;

```

## Styled-components

### 概述

一句话概括：`all in js`

虽然不如vue那样方便，但是react中这样做可以很好的实现语法上的css提示

同时扩展性非常好

不过主要式锦上添花用的，实际可能并用不上 

### 安装和快速使用

安装

```shell
npm i styled-components
pnpm i styled-components
yarn add styled-components
```

接着使用

```tsx
import React from 'react'
import styled from 'styled-components'


const App: React.FC = () => {
	
    // 这里可以直接生成一个带着样式的组件
    const MyDivComponent = styled.div`
        background-color: red;
        padding: 10px;
        border: 1px solid black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    `

    return (
        <div>
            <MyDivComponent>
                <h1>My Div Component</h1>
            </MyDivComponent>
        </div>
    )
}

export default App
```

效果：

![image-20230327191108945](/images/Web/React/04-React的常用工具/image-20230327191108945.png)



接着看看className，发现是随机的

![image-20230327191129900](/images/Web/React/04-React的常用工具/image-20230327191129900.png)

emm感觉目前唯一的缺点是 没有代码提示 比较难受

当然，这玩意是直接支持`sass`语法的

```tsx
import React from 'react'
import styled from 'styled-components'


const App: React.FC = () => {

    const MyDivComponent = styled.div`
        background-color: red;
        padding: 10px;
        border: 1px solid black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        h1{
            font-size: 20px;
            // 下划线
            text-decoration: underline;
        }
    `

    return (
        <div>
            <MyDivComponent>
                <h1>My Div Component</h1>
            </MyDivComponent>
        </div>
    )
}

export default App

```

![image-20230327191252694](/images/Web/React/04-React的常用工具/image-20230327191252694.png)

### 特性-穿透props

例子：

```tsx
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'


const App: React.FC = () => {

    const [color, setColor] = useState('red')

    const changeColor = () => {
        // 生成随机颜色
        const randomColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
        setColor(randomColor)
    }

    return (
        <div>
            <Child color={color} fontSize={60} onClicked={changeColor} />

        </div>
    )
}


const Child = (props: { color: string, fontSize: string | number, onClicked?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }) => {
    // 我们这里可以直接传一个props或者state进去，他会自动帮我们重渲染
    const ChildDiv = styled.div`
        color: ${props.color}; // PS 一般情况下这建议使用函数接受：props=>{props.color}
        font-size: ${typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize};
    `
    return (
        <ChildDiv onClick={props.onClicked}>
            <p>Child</p>
        </ChildDiv>
    )
}



export default App

```

![msedge_iEv9JSrU9C](/images/Web/React/04-React的常用工具/msedge_iEv9JSrU9C.gif)

### 特性-扩展样式

可以给任意组件扩展样式 注意这式通过他会传递一个className给对应组件实现的

```tsx
import React from 'react'
import styled from 'styled-components'


const App: React.FC = () => {

    const MyChild = styled(Child)`
        color: red;
    `
    return (
        <div>
            {/* @ts-ignore */}
            <MyChild />
        </div>
    )
}


const Child = (props: { className: string }) => {
    return (
        <div className={props.className}>
            Child
        </div>
    )
}



export default App



```

## TODO 单元测试
