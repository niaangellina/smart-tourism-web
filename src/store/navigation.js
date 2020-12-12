const navigation = {
  namespaced: true,
  state: () => ({
    currentRoute: {
      path: "/location"
    },
    routes: [
      {
        title: "Daftar Lokasi",
        icon: "mdi-view-list",
        path: "/location"
      },
      {
        title: "Daftar Kartu",
        icon: "mdi-view-list",
        path: "/card"
      }
    ]
  }),
  mutations: {
    push(state, { app, route }) {
      if (app.$route.path != route.path) {
        app.$router.push(route.path);
        state.currentRoute = route;
      }
    }
  },
  actions: {
    push({ commit }, { app, route }) {
      commit("push", {
        app: app,
        route: route
      });
    }
  }
};

export default navigation;
