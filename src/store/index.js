import Vue from "vue";
import app from "./modules/app.js"
import login from "./modules/login.js"
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    app,
    login
  }
});
