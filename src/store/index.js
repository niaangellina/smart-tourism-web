import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import confirmation from "./confirmation";
import navigation from "./navigation";
import toast from "./toast";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    confirmation: confirmation,
    navigation: navigation,
    toast: toast
  }
});
