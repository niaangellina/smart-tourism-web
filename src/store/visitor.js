import http from "../plugins/http-common";

const visitor = {
  namespaced: true,
  state: () => ({
    visitors: [],
    selectedVisitor: null
  }),
  mutations: {
    replace(state, { visitors }) {
      state.visitors = visitors;
    },
    update(state, { visitor }) {
      let found = false;
      for (const i in state.visitors) {
        if (state.visitors[i].id === visitor.id) {
          for (const key in visitor) {
            state.visitors[i][key] = visitor[key];
          }
          found = true;
        }
      }

      if (!found) {
        state.visitors.push(visitor);
      }
    },
    remove(state, { visitorId }) {
      state.visitors = state.visitors.filter(visitor => {
        return visitor.id != visitorId;
      });
    },
    select(state, { visitorId }) {
      let found = false;
      state.visitors.forEach(visitor => {
        if (visitor.id === visitorId) {
          state.selectedVisitor = visitor;
          found = true;
        }
      });

      if (!found) {
        state.selectedVisitor = null;
      }
    }
  },
  actions: {
    async create({ commit, dispatch }, params) {
      const { info, visitor } = params || {};

      try {
        const res = visitor.id
          ? await http.put(`/api/visitor/${visitor.id}`, visitor)
          : await http.post("/api/visitor", visitor);

        commit("update", { visitor: res.data });

        if (info) {
          dispatch(
            "toast/info",
            visitor.id
              ? "Sukses mengubah pengunjung"
              : "Sukses menambah pengunjung",
            { root: true }
          );
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menambah pengunjung, ${errInfo}`, {
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
        const res = await http.get("/api/visitor");
        commit("replace", { visitors: res.data });

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch(
            "toast/info",
            `Gagal mengambil daftar pengunjung, ${errInfo}`,
            { root: true }
          );
        } else {
          throw err;
        }
      }
    },
    async remove({ commit, dispatch }, params) {
      const { info, visitorId } = params || {};

      try {
        const res = await http.delete(`/api/visitor/${visitorId}`);
        commit("remove", { visitorId: res.data.id });

        if (info) {
          dispatch("toast/info", "Sukses menghapus pengunjung", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menghapus pengunjung, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    },
    select({ commit }, { visitor }) {
      commit("select", { visitorId: visitor ? visitor.id : null });
    }
  }
};

export default visitor;
