import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

//读取model下面js文件
const modulsFiles = require.context('./modules',true, /\.js$/)
const state = {} ,mutations = {} , actions = {}

// 把模块js内容汇总在该文件(目的在模块文件中可以跨文件访问数据)
const modules = modulsFiles.keys().reduce((prevModule,curModule)=>{

    // 提取不同js文件名称
    const moduleName = curModule.replace(/^\.\/(.*)\.\w+$/, '$1')
    // 获取当前模块export对象
    const moduleObj = modulsFiles(curModule)

    // 把js文件导出的state汇在当前文件state中
    if(moduleObj.state && moduleObj.state instanceof Object) {
        state[moduleName] = moduleObj.state
    }

    // 把js文件导出的mutation汇在当前文件mutation中,并重命名为“文件名.函数名”
    if(moduleObj.mutations && moduleObj.mutations instanceof Object) {
        for(let fun in moduleObj.mutations) {
            mutations[ moduleName + '.' + fun] = moduleObj.mutations[fun]
        }
    }
    
    // 把js文件导出的actions汇在当前文件actions中,并重命名为“文件名.函数名”
    if(moduleObj.actions && moduleObj.actions instanceof Object) {  
        for(let fun in moduleObj.actions) {
            actions[ moduleName + '.' + fun ] = moduleObj.actions[fun]
        }
    }

    return modules
},{})


const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store