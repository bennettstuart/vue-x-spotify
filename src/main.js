import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import store from "./store";
import router from "./router";

Vue.use(VueResource);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
