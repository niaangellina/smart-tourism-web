import http from "../plugins/http-common";

const visitation = {
  namespaced: true,
  state: () => ({
    visitations: [],
    selectedVisitation: null
  }),
  mutations: {
    replace(state, { visitations }) {
      state.visitations = visitations;
    },
    update(state, { visitation }) {
      let found = false;
      for (const i in state.visitations) {
        if (state.visitations[i].id === visitation.id) {
          for (const key in visitation) {
            state.visitations[i][key] = visitation[key];
          }
          found = true;
        }
      }

      if (!found) {
        state.visitations.push(visitation);
      }
    },
    remove(state, { visitationId }) {
      state.visitations = state.visitations.filter(visitation => {
        return visitation.id != visitationId;
      });
    },
    select(state, { visitationId }) {
      let found = false;
      state.visitations.forEach(visitation => {
        if (visitation.id === visitationId) {
          state.selectedVisitation = visitation;
          found = true;
        }
      });

      if (!found) {
        state.selectedVisitation = null;
      }
    }
  },
  actions: {
    async create({ commit, dispatch }, params) {
      const { info, visitation } = params || {};

      try {
        const res = visitation.id
          ? await http.put(`/api/visitation/${visitation.id}`, visitation)
          : await http.post("/api/visitation", visitation);

        commit("update", { visitation: res.data });

        if (info) {
          dispatch(
            "toast/info",
            visitation.id
              ? "Sukses mengubah kunjungan"
              : "Sukses menambah kunjungan",
            { root: true }
          );
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
    },
    select({ commit }, { visitation }) {
      commit("select", { visitationId: visitation ? visitation.id : null });
    }
  }
};

export default visitation;
