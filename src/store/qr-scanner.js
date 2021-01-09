const qrScanner = {
  namespaced: true,
  state: () => ({
    data: null,
    enabled: false
  }),
  mutations: {
    enable(state) {
      state.data = null;
      state.enabled = true;
    },
    disable(state, { data }) {
      state.data = data;
      state.enabled = false;
    }
  },
  actions: {
    enable({ commit }) {
      commit("enable");
    },
    disable({ commit }, { data }) {
      commit("disable", {
        data: data
      });
    }
  }
};

export default qrScanner;
