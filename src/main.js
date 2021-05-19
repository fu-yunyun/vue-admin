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
// // 引入图标文件
import './icons'
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

