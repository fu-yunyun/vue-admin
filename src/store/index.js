import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./app.js"
import login from "./login.js"

export default new Vuex.Store({
  state: {

  },
  mutation: {

  },
  actions: {
    login(content, requestData) {
      return new Promise((resolve, reject) => {
        Login(requestData).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
    app,
    login
  }
});
