import http from "../plugins/http-common";

const visitor = {
  namespaced: true,
  state: () => ({
    visitors: []
  }),
  mutations: {
    replace(state, { visitors }) {
      state.visitors = visitors;
    },
    update(state, { visitor }) {
      let found = false;
      state.visitors.forEach((_, index, array) => {
        if (array[index].id == visitor.id) {
          array[index] = visitor;
          found = true;
        }
      });

      if (!found) {
        state.visitors.push(visitor);
      }
    },
    remove(state, { visitorId }) {
      state.visitors = state.visitors.filter(visitor => {
        return visitor.id != visitorId;
      });
    }
  },
  actions: {
    async create({ commit, dispatch }, { info, visitor }) {
      try {
        const res = await http.post("/api/visitor", visitor);
        commit("update", { visitor: res.data });

        if (info) {
          dispatch("toast/info", "Sukses menambah pengunjung", { root: true });
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
    async findAll({ commit, dispatch }, { info }) {
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
    async remove({ commit, dispatch }, { info, visitorId }) {
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
    }
  }
};

export default visitor;
