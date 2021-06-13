import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue"
Vue.use(VueRouter);
// 引入布局组件
// import Layout from "../views/Layout/index.vue"
// 默认读取index
import Layout from "../views/Layout"

/**
 * 默认加载路由
 */
export const defaultRoutes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    },
  },
  /*************************************************************************************** */
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录",
    },
    component: Login
    // component: () => import("../views/login/index.vue")

  },
  /*************************************************************************************** */
  {
    path: "/console",
    name: "Console",
    redirect: "Index",
    meta: {
      name: "控制台",
      iconName: "console"
    },
    component: Layout,
    children: [
      {
        // router-view拿到的是children的第一个对象页面数据，需要跟导航栏中的uri一一对应
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue"),
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      system: "InfoAdmin",
      name: "信息管理",
      iconName: "info"
    },
    component: Layout,
    children: [
      {
        path: "/infoindex",
        name: "InfoIndex",
        meta: {
          keepAlive: true,
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          keepAlive: true,
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue"),
      },
      {
        path: "/detailCategory",
        name: "detailCategory",
        hidden: true,
        meta: {
          name: "详细编辑"
        },
        component: () => import("../views/Info/infoComponents/detailCategory.vue"),
      }
    ]
  },
  /*************************************************************************************** */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      system: "UserAdmin",
      iconName: "user"
    },
    // Layout
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/userindex",
        name: "UserIndex",
        meta: {
          keepAlive: false,
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue"),
      }
    ]
  },
  {
    path: "/page404",
    meta: {
      iconName: "404"
    },
    hidden: true,
    // Layout
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/404",
        component: () => import("../views/404NotFound/index.vue"),
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

/*************************************************************************************** */
/**
 * 动态路由
 */
export const dynaRouters = [

]


const router = new VueRouter({
  // 加载默认路由
  routes: defaultRoutes,
});

export default router;