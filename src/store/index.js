import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import navigation from "./navigation";
import toast from "./toast";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    navigation: navigation,
    toast: toast
  }
});
