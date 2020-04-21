const state = {
    count1 : []
}

const mutations = {
    increamentCount1(state,playload) {
        state.test1.count1.push(playload)
    }
}

const actions = {
    increamentCount1({commit},playload) {
        commit('test1.increamentCount1',playload)
    }
}

export {
    state,
    mutations,
    actions
}