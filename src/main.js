import Vue from 'vue'
// eslint - disable
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueCompositionApi from '@vue/composition-api'
// 引入token校验 全局引用
import premit from "./router/premit.js"
//自定义全局组件   全局注入
import './icons/index.js'
// 自定义全局方法 全局注入
import global from "./utils/global.js"
Vue.use(global)
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

