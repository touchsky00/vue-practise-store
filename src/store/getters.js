const getters = {
    todoDone: state => state.test3.count3.filter(item=>item.todo)
}

export default getters