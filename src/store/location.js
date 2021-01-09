import http from "../plugins/http-common";

const location = {
  namespaced: true,
  state: () => ({
    locations: []
  }),
  mutations: {
    replace(state, { locations }) {
      state.locations = locations;
    },
    update(state, { location }) {
      let found = false;
      state.locations.forEach((_, index, array) => {
        if (array[index].id == location.id) {
          array[index] = location;
          found = true;
        }
      });

      if (!found) {
        state.locations.push(location);
      }
    },
    remove(state, { locationId }) {
      state.locations = state.locations.filter(location => {
        return location.id != locationId;
      });
    }
  },
  actions: {
    async create({ commit, dispatch }, { info, location }) {
      try {
        const res = await http.post("/api/location", location);
        commit("update", { location: res.data });

        if (info) {
          dispatch("toast/info", "Sukses menambah lokasi", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menambah lokasi, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    },
    async findAll({ commit, dispatch }, { info }) {
      try {
        const res = await http.get("/api/location");
        commit("replace", { locations: res.data });

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal mengambil daftar lokasi, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    },
    async remove({ commit, dispatch }, { info, locationId }) {
      try {
        const res = await http.delete(`/api/location/${locationId}`);
        commit("remove", { locationId: res.data.id });

        if (info) {
          dispatch("toast/info", "Sukses menghapus lokasi", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menghapus lokasi, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    }
  }
};

export default location;
