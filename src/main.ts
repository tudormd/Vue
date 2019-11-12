import Vue from "vue";
import "materialize-css/dist/js/materialize.min";

import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import toast from "@/utils/toasts";

Vue.use(toast);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
