const state = {
    count2 : 100
}

const mutations = {
    reduceCount2(state) {
        state.test2.count2 -= 1
    }
}

const actions = {
    reduceCount2({commit}) {
        commit('test2.reduceCount2')
    },
}

export {
    state,
    mutations,
    actions
}