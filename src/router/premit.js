import router from "./index.js"
import { getToKen, removeToKen, removeUserName } from "@/utils/app"
import store from "../store/index"

// 定义白名单：不需要进行token验证即可跳转页面 例如进入登录页面
const whiteRouter = ["/login"]
// 守卫路由 路由跳转执行   全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {
    if (getToKen()) {
        if (to.path == "/login") {
            removeToKen();
            removeUserName();
            store.commit("REMOVE_TOKEN", "")
            store.commit("REMOVE_USERNAME", "")
            next();
        }
        else {
            next()
        }
        // 路由的动态添加， 分配菜单，每个角色分配不同的菜单
        // if (store.getters["roles"].length == 0) {
        //     store.dispatch("getUserRoles_store").then(response => {
        //         store.dispatch("createDynaRouters_store", response).then(response => {
        //             let addRouters = store.getters["addRouters"]
        //             let allRouters = store.getters["allRouters"]
        //             // 更新视图渲染路由
        //             router.options.routes = allRouters;
        //             // 将新增的路由添加进路由  进行路由跳转
        //             router.addRoute(addRouters)
        //             //
        //             next({ ...next, replace: true })
        //         }).catch(error => {

        //         })
        //     }).catch(error => {

        //     })
        // } else {
        //     // 退出时需要清除roles值 防止roles的长度不为0直接跳转
        //     next()
        // }



    } else {
        // 判断是否未白名单路由
        // to.path 获取跳转页面的路由
        if (whiteRouter.indexOf(to.path) != -1) {
            next();
        } else {
            next("/login");  //路由指向 跳转
        }
        // 跳转至登录界面

    }
    // console.log(to)  //下一个页面   到...页面
    // console.log(from) //上一个页面  从...页面
    // console.log(next)
    // next()  // to
    //token
})