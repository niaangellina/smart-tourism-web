const navigation = {
  namespaced: true,
  state: () => ({
    currentRoute: {
      title: "Registrasi Pengunjung",
      icon: "mdi-file-edit",
      path: "/visitor-registration"
    },
    routes: [
      {
        title: "Registrasi Pengunjung",
        icon: "mdi-file-edit",
        path: "/visitor-registration"
      },
      {
        title: "Statistik lokasi",
        icon: "mdi-chart-areaspline",
        path: "/location-statistic"
      },
      {
        title: "Daftar Kartu",
        icon: "mdi-view-list",
        path: "/card"
      },
      {
        title: "Daftar Pengunjung",
        icon: "mdi-view-list",
        path: "/visitor"
      },
      {
        title: "Daftar Lokasi",
        icon: "mdi-view-list",
        path: "/location"
      },
      {
        title: "Daftar Gate",
        icon: "mdi-view-list",
        path: "/gate"
      },
      {
        title: "Daftar Kunjungan",
        icon: "mdi-view-list",
        path: "/visitation"
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
