import { CombinedVueInstance } from "vue/types/vue";
import { i18n } from "@/utils/i18n";

import Vue from "vue";
import Vuelidate from "vuelidate";

import firebase from "firebase/app";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "@/utils/toasts";
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from "@/directive/tooltip.directive";

//@ts-ignore
import Loader from "@/components/app/Loader";
//@ts-ignore
import FlagIcon from "vue-flag-icon";
//@ts-ignore
import Paginate from "vuejs-paginate";

import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
import "firebase/auth";
import "firebase/database";

Vue.use(toast);
Vue.use(FlagIcon);
Vue.use(Vuelidate);

//@ts-ignore
Vue.directive("tooltip", tooltipDirective);
Vue.filter("currency", currencyFilter);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyAW8H9LHmwTadUmiU8TId9f_koAYvAZPu0",
  authDomain: "vuejs-365fe.firebaseapp.com",
  databaseURL: "https://vuejs-365fe.firebaseio.com",
  projectId: "vuejs-365fe",
  storageBucket: "vuejs-365fe.appspot.com",
  messagingSenderId: "589879166837",
  appId: "1:589879166837:web:a4849bb7c1544e2cd4b53c",
  measurementId: "G-B5JL0T6PRG"
});

let app: CombinedVueInstance<Vue, object, object, object, Record<never, any>>;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      i18n,
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
