import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import confirmation from "./confirmation";
import location from "./location";
import gate from "./gate";
import navigation from "./navigation";
import toast from "./toast";
import visitation from "./visitation";
import visitor from "./visitor";
import card from "./card";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    confirmation: confirmation,
    location: location,
    gate: gate,
    navigation: navigation,
    toast: toast,
    visitation: visitation,
    visitor: visitor,
    card: card
  }
});
