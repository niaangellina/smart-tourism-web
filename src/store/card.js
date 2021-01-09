import http from "../plugins/http-common";

const card = {
  namespaced: true,
  state: () => ({
    cards: []
  }),
  mutations: {
    replace(state, { cards }) {
      state.cards = cards;
    },
    update(state, { card }) {
      let found = false;
      state.cards.forEach((_, index, array) => {
        if (array[index].id == card.id) {
          array[index] = card;
          found = true;
        }
      });

      if (!found) {
        state.cards.push(card);
      }
    },
    remove(state, { cardId }) {
      state.cards = state.cards.filter(card => {
        return card.id != cardId;
      });
    }
  },
  actions: {
    async create({ commit, dispatch }, { info, card }) {
      try {
        const res = await http.post("/api/card", card);
        commit("update", { card: res.data });

        if (info) {
          dispatch("toast/info", "Sukses menambah kartu", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menambah kartu, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    },
    async findAll({ commit, dispatch }, { info }) {
      try {
        const res = await http.get("/api/card");
        commit("replace", { cards: res.data });

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal mengambil daftar kartu, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    },
    async remove({ commit, dispatch }, { info, cardId }) {
      try {
        const res = await http.delete(`/api/card/${cardId}`);
        commit("remove", { cardId: res.data.id });

        if (info) {
          dispatch("toast/info", "Sukses menghapus kartu", { root: true });
        }

        return res.data;
      } catch (err) {
        if (info) {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          dispatch("toast/info", `Gagal menghapus kartu, ${errInfo}`, {
            root: true
          });
        } else {
          throw err;
        }
      }
    }
  }
};

export default card;
