const app = {
    state: {
        // 判断是否含有本地存储的数据
        isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
        count: 10
    },
    getters: {
        //类似于 computed 可以对数据进行处理
        // count: () => state.count + 10
    },
    //    必须的 同步 不需要回调处理事件
    mutations: {
        // 测试数据
        // SET_COUNT(state, value) {
        //   state.count = value
        //   console.log(state.count)
        // },
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse
            // console.log(state.isCollapse)

            // 本地存储 sessionStorage 临时存储 关闭浏览器时清除
            sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
        }
    },
    // 可同步(mutation)
    // action中的方法通过dispatch触发事件
    // 异步
    actions: {},
    modules: {},
}
export default app;