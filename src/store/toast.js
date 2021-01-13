const toast = {
  namespaced: true,
  state: () => ({
    currentMessage: null,
    messages: []
  }),
  mutations: {
    showMessage(state, { message }) {
      if (state.currentMessage != null) {
        state.messages.push(message);
      } else {
        state.currentMessage = message;
      }
    },
    closeMessage(state) {
      if (state.messages.length > 0) {
        state.currentMessage = state.messages.shift();
      } else {
        state.currentMessage = null;
      }
    }
  },
  actions: {
    info({ commit }, { message }) {
      commit("showMessage", {
        message: message
      });
    },
    close({ commit }) {
      commit("closeMessage");
    }
  }
};

export default toast;
