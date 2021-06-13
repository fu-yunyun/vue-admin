import { getUserRole_api } from "@/api/user.js"
import { defaultRoutes, dynaRouters } from "@/router"
const premission = {
    state: {
        roles: [],
        // 角色权限增加的路由 负责路由跳转
        addRouters: [],
        // 角色权限增加的路由加上默认的路由，进行导航栏渲染
        allRouters: []
    },
    getters: {
        roles: state => state.roles,
        addRouters: state => state.addRouters,
        allRouters: state => state.allRouters
    },

    actions: {
        getUserRoles_store(state, requestData) {
            return new Promise((resolve, reject) => {
                getUserRole_api().then(response => {
                    console.log(response)
                    resolve(response)
                }).catch(error => {
                    console.log(error)
                })
            })
        },
        /**
         * 创建动态路由
         *  */
        createDynaRouters_store({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                // 获取用户权限
                let role = data;
                let addRouters = []
                // 超级管理员
                if (role == 'SystemAdmin') {
                    addRouters = dynaRouters;
                } else {  // 普通管理员
                    // 将动态路由进行匹配，拿到匹配相符的整个路由数据
                    addRouters = dynaRouters.filter(item => {
                        console.log(item.meta.system)
                        if (role.include(item.meta.system)) {
                            return item;
                        }
                    })
                    // 添加动态路由的最后一个路由 404页面
                    addRouters.push(dynaRouters[dynaRouters.length - 1])
                }
                //更新路由
                commit("SET_ROUTERS", addRouters)
                resolve();
            })
        }
    },
    mutations: {
        SET_ROUTERS(state, addRouters) {
            // 将路由传给state共享管理
            state.addRouters = addRouters;
            // 更新全部路由，将动态路由添加给默认路由
            state.allRouters = defaultRoutes.concat(addRouters);

        }
    }
}


export default premission;