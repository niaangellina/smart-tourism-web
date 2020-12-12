const confirmation = {
  namespaced: true,
  state: () => ({
    message: null,
    callback: null,
    promise: null
  }),
  mutations: {
    ask(state, { message, callback }) {
      state.message = message;
      state.callback = callback;
      state.promise = null;
    },
    accept(state) {
      state.promise = null;
      if (typeof state.callback === "function") {
        state.promise = state.callback();
      }

      if (typeof state.promise !== "undefined" && state.promise != null) {
        state.promise.finally(() => {
          state.message = null;
        });
      } else {
        state.message = null;
      }
    },
    cancel(state) {
      state.message = null;
    }
  },
  actions: {
    ask({ commit }, { message, callback }) {
      commit("ask", {
        message: message,
        callback: callback
      });
    },
    accept({ commit }) {
      commit("accept");
    },
    cancel({ commit }) {
      commit("cancel");
    }
  }
};

export default confirmation;
