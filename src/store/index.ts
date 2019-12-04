import Vue from "vue";
import Vuex from "vuex";

import moment from "moment";

import auth from "./auth";
import info from "./info";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      return await (await fetch(
        `http://pki.maib.md/rates/BNM${moment().format("YYYYMMDD")}.json`
      )).json();
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info
  }
});
