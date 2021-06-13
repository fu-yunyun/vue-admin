
import { Login } from "@/api/login"
import { getUserName, removeToKen, removeUserName, setToKen, setUserName } from "../../utils/app.js"
const login = {
    state: {
        username: getUserName() || "",
        token: ""
    },
    mutations: {
        SET_TOKEN(state, value) {
            state.token = value
        },
        SET_USERNAME(state, value) {
            state.username = value
        },
        REMOVE_TOKEN(state, value) {
            state.token = value
        },
        REMOVE_USERNAME(state, value) {
            state.username = value
        }
    },
    actions: {
        login({ commit, state }, requestData) {
            return new Promise((resolve, reject) => {
                Login(requestData).then((response) => {
                    // 存储cookie值，设置路由防卫
                    setToKen("admin_token");
                    setUserName(requestData.username);
                    // 设置共享存储状态
                    commit("SET_TOKEN", "admin_token");
                    commit("SET_USERNAME", requestData.username);
                    // end
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        exit({ commit }) {
            return new Promise((resolve) => {
                // 清除cookie和vuex中的值
                removeToKen();
                removeUserName();
                commit("REMOVE_TOKEN", "")
                commit("REMOVE_USERNAME", "")
                resolve()
            })
        }
    },
    modules: {
    }
}
export default login;