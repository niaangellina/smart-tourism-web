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
    async create({ commit, dispatch }, { location }) {
      try {
        const res = await http.post("/api/location", location);
        commit("update", { location: res.data });

        dispatch("toast/info", "Sukses menambah lokasi", { root: true });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            `Gagal menambah lokasi, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch("toast/info", "Gagal menambah lokasi, tidak ada jaringan", {
            root: true
          });
        }

        throw err;
      }
    },
    async findAll({ commit, dispatch }) {
      try {
        const res = await http.get("/api/location");
        commit("replace", { locations: res.data });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            `Gagal mengambil daftar lokasi, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            "Gagal mengambil daftar lokasi, tidak ada jaringan",
            { root: true }
          );
        }

        throw err;
      }
    },
    async remove({ commit, dispatch }, { locationId }) {
      try {
        const res = await http.delete(`/api/location/${locationId}`);
        commit("remove", { locationId: res.data.id });

        dispatch("toast/info", "Sukses menghapus lokasi", { root: true });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            `Gagal menghapus lokasi, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch("toast/info", "Gagal menghapus lokasi, tidak ada jaringan", {
            root: true
          });
        }

        throw err;
      }
    }
  }
};

export default location;
