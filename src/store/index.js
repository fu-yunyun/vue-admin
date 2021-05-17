import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
    count: 10
  },
  getters: {
    //类似于 computed 可以对数据进行处理
    count: () => state.count + 10
  },
  mutations: {
    // 测试数据
    // SET_COUNT(state, value) {
    //   state.count = value
    //   console.log(state.count)
    // },
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      // console.log(state.isCollapse)
    }
  },
  actions: {},
  modules: {},
});
