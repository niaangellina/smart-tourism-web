import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import navigation from "./navigation";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    navigation: navigation
  }
});
