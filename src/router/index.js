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
];

const router = new VueRouter({
  routes,
});

export default router;
