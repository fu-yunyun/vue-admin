
import { Login } from "@/api/login"
import { getUserName, removeToKen, removeUserName } from "../../utils/app.js"
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
                    // 查看后台返回数据
                    // console.log(response)
                    // // 获取后台相应的数据data对象
                    // let data = response.data.data
                    // // 设置共享管理状态
                    // commit("SET_TOKEN", data.token)
                    // commit("SET_USERNAME", data.username)
                    // // 将username和token存入cookie 数据请求不成功 未能执行
                    // setToKen(state.token)
                    // setUserName(state.username)
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