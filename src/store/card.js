import http from "../plugins/http-common";

const card = {
  namespaced: true,
  state: () => ({
    cards: [],
    selectedCard: null
  }),
  mutations: {
    replace(state, { cards }) {
      state.cards = cards;
    },
    update(state, { card }) {
      let found = false;
      for (const i in state.cards) {
        if (state.cards[i].id === card.id) {
          for (const key in card) {
            state.cards[i][key] = card[key];
          }
          found = true;
        }
      }

      if (!found) {
        state.cards.push(card);
      }
    },
    remove(state, { cardId }) {
      state.cards = state.cards.filter(card => {
        return card.id != cardId;
      });
    },
    select(state, { cardId }) {
      let found = false;
      state.cards.forEach(card => {
        if (card.id === cardId) {
          state.selectedCard = card;
          found = true;
        }
      });

      if (!found) {
        state.selectedCard = null;
      }
    }
  },
  actions: {
    async create({ commit, dispatch }, params) {
      const { info, card } = params || {};
      try {
        const res = card.id
          ? await http.put(`/api/card/${card.id}`, card)
          : await http.post("/api/card", card);

        commit("update", { card: res.data });

        if (info) {
          dispatch(
            "toast/info",
            card.id ? "Sukses mengubah kartu" : "Sukses menambah kartu",
            { root: true }
          );
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
    async findAll({ commit, dispatch }, params) {
      const { info } = params || {};

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
    async remove({ commit, dispatch }, params) {
      const { info, cardId } = params || {};

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
    },
    select({ commit }, { card }) {
      commit("select", { cardId: card ? card.id : null });
    }
  }
};

export default card;
