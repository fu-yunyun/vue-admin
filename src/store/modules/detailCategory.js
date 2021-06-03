const detailCategory = {
    state: {
        // 判断是否含有本地存储的数据
        id: "" || JSON.parse(sessionStorage.getItem("detailId")),
    },
    mutations: {

        SET_DETAILID(state, value) {
            state.id = value;
            // 本地存储 sessionStorage 临时存储 关闭浏览器时清除
            sessionStorage.setItem("detailId", JSON.stringify(state.id))
        }
    }
}
export default detailCategory;