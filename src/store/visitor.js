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
    async create({ commit, dispatch }, { visitor }) {
      try {
        const res = await http.post("/api/visitor", visitor);
        commit("update", { visitor: res.data });

        dispatch(
          "toast/info",
          { message: "Sukses menambah pengunjung" },
          { root: true }
        );

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal menambah pengunjung, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal menambah pengunjung, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    },
    async findAll({ commit, dispatch }) {
      try {
        const res = await http.get("/api/visitor");
        commit("replace", { visitors: res.data });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal mengambil daftar pengunjung, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal mengambil daftar pengunjung, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    },
    async remove({ commit, dispatch }, { visitorId }) {
      try {
        const res = await http.delete(`/api/visitor/${visitorId}`);
        commit("remove", { visitorId: res.data.id });

        dispatch(
          "toast/info",
          { message: "Sukses menghapus pengunjung" },
          { root: true }
        );

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal menghapus pengunjung, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal menghapus pengunjung, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    }
  }
};

export default visitor;
