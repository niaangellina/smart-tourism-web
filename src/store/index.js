import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import card from "./card";
import confirmation from "./confirmation";
import gate from "./gate";
import location from "./location";
import navigation from "./navigation";
import qrScanner from "./qr-scanner";
import toast from "./toast";
import visitation from "./visitation";
import visitor from "./visitor";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    card: card,
    confirmation: confirmation,
    gate: gate,
    location: location,
    navigation: navigation,
    qrScanner: qrScanner,
    toast: toast,
    visitation: visitation,
    visitor: visitor
  }
});
