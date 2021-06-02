const detailCategory = {
    namespace: true,
    state: {
        // 判断是否含有本地存储的数据
        id: "" || sessionStorage.getItem("tableListId"),

    },
    mutations: {
        SET_DETAILID(state, data) {
            state.id = data.id;
            // 本地存储 sessionStorage 临时存储 关闭浏览器时清除
            sessionStorage.setItem("tableListId", state.id)
        },

    }
}
export default detailCategory;
