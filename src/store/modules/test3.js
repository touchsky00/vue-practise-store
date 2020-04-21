const state = {
    count3 : [
        {id : 1 , todo: false },
        {id : 2 , todo: false },
        {id : 3 , todo: false },
        {id : 4 , todo: true },
        {id : 5 , todo: true },
        {id : 6 , todo: false },
    ],
}

const mutations = {
    refreshTodoDisplay(state,playload) {
        state.test3.count3.forEach(item => {
            if(item.id == playload) {
                item.todo = !item.todo
            }
        });
    }
}

const actions = {
    refreshTodoDisplay({commit},playload) {
        commit('test3.refreshTodoDisplay',playload)
    }
}

export {
    state,
    mutations,
    actions
}