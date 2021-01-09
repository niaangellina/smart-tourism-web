import http from "../plugins/http-common";

const visitation = {
  namespaced: true,
  state: () => ({
    visitations: []
  }),
  mutations: {
    replace(state, { visitations }) {
      state.visitations = visitations;
    },
    update(state, { visitation }) {
      let found = false;
      state.visitations.forEach((_, index, array) => {
        if (array[index].id == visitation.id) {
          array[index] = visitation;
          found = true;
        }
      });

      if (!found) {
        state.visitations.push(visitation);
      }
    },
    remove(state, { visitationId }) {
      state.visitations = state.visitations.filter(visitation => {
        return visitation.id != visitationId;
      });
    }
  },
  actions: {
    async create({ commit, dispatch }, { visitation }) {
      try {
        const res = await http.post("/api/visitation", visitation);
        commit("update", { visitation: res.data });

        dispatch("toast/info", "Sukses menambah kunjungan", { root: true });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            `Gagal menambah kunjungan, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            "Gagal menambah kunjungan, tidak ada jaringan",
            { root: true }
          );
        }

        throw err;
      }
    },
    async findAll({ commit, dispatch }) {
      try {
        const res = await http.get("/api/visitation");
        commit("replace", { visitations: res.data });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            `Gagal mengambil daftar kunjungan, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            "Gagal mengambil daftar kunjungan, tidak ada jaringan",
            { root: true }
          );
        }

        throw err;
      }
    },
    async remove({ commit, dispatch }, { visitationId }) {
      try {
        const res = await http.delete(`/api/visitation/${visitationId}`);
        commit("remove", { visitationId: res.data.id });

        dispatch("toast/info", "Sukses menghapus kunjungan", { root: true });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            `Gagal menghapus kunjungan, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            "Gagal menghapus kunjungan, tidak ada jaringan",
            { root: true }
          );
        }

        throw err;
      }
    }
  }
};

export default visitation;
