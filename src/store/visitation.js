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
    async create({ commit, dispatch }, params) {
      const { info, visitation } = params || {};

      try {
        const res = await http.post("/api/visitation", visitation);
        commit("update", { visitation: res.data });

        if (info) {
          dispatch("toast/info", "Sukses menambah kunjungan", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menambah kunjungan, ${errInfo}`, {
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
        const res = await http.get("/api/visitation");
        commit("replace", { visitations: res.data });

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch(
            "toast/info",
            `Gagal mengambil daftar kunjungan, ${errInfo}`,
            { root: true }
          );
        } else {
          throw err;
        }
      }
    },
    async remove({ commit, dispatch }, params) {
      const { info, visitationId } = params || {};

      try {
        const res = await http.delete(`/api/visitation/${visitationId}`);
        commit("remove", { visitationId: res.data.id });

        if (info) {
          dispatch("toast/info", "Sukses menghapus kunjungan", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menghapus kunjungan, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    }
  }
};

export default visitation;
