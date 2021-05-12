import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue"
Vue.use(VueRouter);
// eslint-disable-next-line
const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
    // component: () => import("../views/login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        // router-view拿到的是children的第一个对象页面数据，需要跟uri一一对应
        path: "/console",
        name: "Console",
        component: () => import("../views/Console/index.vue"),
      }
    ]
  },
];

const router = new VueRouter({
  routes,
});

export default router;
