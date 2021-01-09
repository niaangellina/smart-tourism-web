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
    async create({ commit, dispatch }, params) {
      const { info, gate } = params || {};

      try {
        const res = await http.post("/api/gate", gate);
        commit("update", { gate: res.data });

        if (info) {
          dispatch("toast/info", "Sukses menambah gate", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menambah gate, ${errInfo}`, {
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
        const res = await http.get("/api/gate");
        commit("replace", { gates: res.data });

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal mengambil daftar gate, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    },
    async remove({ commit, dispatch }, params) {
      const { info, gateId } = params || {};

      try {
        const res = await http.delete(`/api/gate/${gateId}`);
        commit("remove", { gateId: res.data.id });

        if (info) {
          dispatch("toast/info", "Sukses menghapus gate", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menghapus gate, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    }
  }
};

export default gate;
