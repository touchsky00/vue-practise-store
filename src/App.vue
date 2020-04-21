<template>
  <div id="app">
    <div v-if="test1.count1.length>0">
      <div v-for="(item,index) in test1.count1" :key="index">
        {{item}}
      </div>
    </div>
    <div>输入数值<input v-model="count1State" placeholder="输入添加内容" @keyup.enter="increamentTest1"/></div>
    <button @click="increamentTest1">添加test1</button>
    <hr />
    <div>{{test2.count2}}</div>
    <button @click="reduceTest2">添加test2</button>
    <hr />
    <input v-model="count3Id" placeholder="需要调整的id" @keyup.enter="resetTest3"/>
    <div>全部{{test3.count3}}</div>
    <br />
    <br />
    <div>已做完{{todoDone}}</div>
    <button @click="resetTest3">调整test3</button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex' 

export default {
  name: 'App',
  computed: {
    ...mapGetters(["todoDone"]),
    ...mapState(['test1','test2','test3']),
    count: function(){
    } 
  },
  data() {
    return {
      count1State:'',
      count3Id:'',

    }
  },
  methods: {
    // test1.js
    increamentTest1() {
      this.$store.dispatch("test1.increamentCount1",this.count1State)
      this.count1State = ''
    },
    // test2.js
    reduceTest2() {
      this.$store.dispatch("test2.reduceCount2")
    },
    // test3.js
    resetTest3() {
      this.$store.dispatch("test3.refreshTodoDisplay", this.count3Id)
      this.count3Id = ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
