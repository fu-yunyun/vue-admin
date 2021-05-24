const app = {
    state: {
        // 判断是否含有本地存储的数据
        isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
        // count: 10
    },
    mutations: {
        // 测试数据
        // SET_COUNT(state, value) {
        //   state.count = value
        //   console.log(state.count)
        // },
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse
            console.log(state.isCollapse)

            // 本地存储 sessionStorage 临时存储 关闭浏览器时清除
            sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
        }
    }
};

export default app;