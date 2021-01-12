import http from "../plugins/http-common";

const location = {
  namespaced: true,
  state: () => ({
    locations: [],
    selectedLocation: null
  }),
  mutations: {
    replace(state, { locations }) {
      state.locations = locations;
    },
    update(state, { location }) {
      let found = false;
      for (const i in state.locations) {
        if (state.locations[i].id === location.id) {
          for (const key in location) {
            state.locations[i][key] = location[key];
          }
          found = true;
        }
      }

      if (!found) {
        state.locations.push(location);
      }
    },
    remove(state, { locationId }) {
      state.locations = state.locations.filter(location => {
        return location.id != locationId;
      });
    },
    select(state, { locationId }) {
      let found = false;
      state.locations.forEach(location => {
        if (location.id === locationId) {
          state.selectedLocation = location;
          found = true;
        }
      });

      if (!found) {
        state.selectedLocation = null;
      }
    }
  },
  actions: {
    async create({ commit, dispatch }, params) {
      const { info, location } = params || {};

      try {
        const res = location.id
          ? await http.put(`/api/location/${location.id}`, location)
          : await http.post("/api/location", location);

        commit("update", { location: res.data });

        if (info) {
          dispatch(
            "toast/info",
            location.id ? "Sukses mengubah lokasi" : "Sukses menambah lokasi",
            { root: true }
          );
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
    async findAll({ commit, dispatch }, params) {
      const { info } = params || {};

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
    async remove({ commit, dispatch }, params) {
      const { info, locationId } = params || {};

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
    },
    select({ commit }, { location }) {
      commit("select", { locationId: location ? location.id : null });
    }
  }
};

export default location;
