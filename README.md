# my-vue-practise

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


vuex( 状态管模式，多个视图依赖于同一状态，来自不同视图的行为需要变更同一状态)

核心：　store
-
.Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新
.改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。

    import Vuex from 'Vuex"


    Vue.use(Vuex)

    const store = new Vuex.Store({
        state: {
            count: 0;
        },
        mutations: {
            increment(state) {
                state.count++
            }
        }
    })

    //变更store.state的数据
    store.commit(increments)
    console.log(store.state.count)


state
-
vue从vuex获取状态数据最简单方法在computed中获取

    computed: {
        count() {
            return store.state.count
        }
    }

Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中

    //main.js

    new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
    })
    //通过实例中store注册，所有子组件可以通this.$store获取

    computed: {
        count() {
            return this.$store.state.count
        }
    }


辅助函数mapState，计算多个状态时帮助我们生成计算属性

    import { mapState } from 'vuex'

    export default {
        computed: mapState({
            count: state => state.count,
            countAlias: 'count',
            countPlusLocalState (state) {
                return state.count + this.localCount
            }
        })
    }


    computed: {
        ...mapState({
            // ...
        })
    }


getter
-
Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）

辅助函数mapGetter
-

    import { mapGetters } from 'vuex'

    export default {
    // ...
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
        ])
    }
    }


mutation
-
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，不能直接修改mutation，需要通过调用store.commit()方法唤醒

    //提交载荷（Payload）传入的额外参数
    mutations: {
        increment (state, payload) {
            state.count += payload.amount
        }
    }

    //唤醒
    store.commit('increment',10)


    //对象风格的提交方式
    store.commit({
        type: 'increment',
        amount: 10
    })


action 
-
Action 提交的是 mutation，而不是直接变更状态,Action 可以包含任意异步操作


    const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    },
    actions: {
        increment (context) {
            context.commit('increment')
        }
    }
    })

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，Action 通过 store.dispatch 方法触发：

    store.dispatch('increment')


组合Promise的Action

    action: {
        actionA( { commit } ) {
            return new Promise ((resolve,reject)=>{
                setTimeout(()=>{
                    commit('someMutation')
                    resolve()
                },1000)
            })
        }
    }

    //现在可判断action结束
    store.dispacth('actionA').then(()=>{
        ...
    })

    利用async／await，可以组合action
    // 假设 getData() 和 getOtherData() 返回的是 Promise

    actions: {
        async actionA ({ commit }) {
            commit('gotData', await getData())
        },
        async actionB ({ dispatch, commit }) {
            await dispatch('actionA') // 等待 actionA 完成
            commit('gotOtherData', await getOtherData())
        }
    }


Module
-
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿,为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

    const moduleA = {
        state: { ... },
        mutations: { ... },
        actions: { ... },
        getters: { ... }
    }

    const moduleB = {
        state: { ... },
        mutations: { ... },
        actions: { ... }
    }

    const store = new Vuex.Store({
        modules: {
            a: moduleA,
            b: moduleB
        }
    })

    store.state.a // -> moduleA 的状态
    store.state.b // -> moduleB 的状态