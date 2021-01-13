import http from "../plugins/http-common";

const gate = {
  namespaced: true,
  state: () => ({
    gates: []
  }),
  mutations: {
    replace(state, { gates }) {
      state.gates = gates;
    },
    update(state, { gate }) {
      let found = false;
      state.gates.forEach((_, index, array) => {
        if (array[index].id == gate.id) {
          array[index] = gate;
          found = true;
        }
      });

      if (!found) {
        state.gates.push(gate);
      }
    },
    remove(state, { gateId }) {
      state.gates = state.gates.filter(gate => {
        return gate.id != gateId;
      });
    }
  },
  actions: {
    async create({ commit, dispatch }, { gate }) {
      try {
        const res = await http.post("/api/gate", gate);
        commit("update", { gate: res.data });

        dispatch(
          "toast/info",
          { message: "Sukses menambah gate" },
          { root: true }
        );

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal menambah gate, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal menambah gate, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    },
    async findAll({ commit, dispatch }) {
      try {
        const res = await http.get("/api/gate");
        commit("replace", { gates: res.data });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal mengambil daftar gate, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal mengambil daftar gate, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    },
    async remove({ commit, dispatch }, { gateId }) {
      try {
        const res = await http.delete(`/api/gate/${gateId}`);
        commit("remove", { gateId: res.data.id });

        dispatch(
          "toast/info",
          { message: "Sukses menghapus gate" },
          { root: true }
        );

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal menghapus gate, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal menghapus gate, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    }
  }
};

export default gate;
