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
    async create({ commit, dispatch }, { card }) {
      try {
        const res = await http.post("/api/card", card);
        commit("update", { card: res.data });

        dispatch(
          "toast/info",
          { message: "Sukses menambah card" },
          { root: true }
        );

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal menambah card, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal menambah card, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    },
    async findAll({ commit, dispatch }) {
      try {
        const res = await http.get("/api/card");
        commit("replace", { cards: res.data });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal mengambil daftar card, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal mengambil daftar card, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    },
    async remove({ commit, dispatch }, { cardId }) {
      try {
        const res = await http.delete(`/api/card/${cardId}`);
        commit("remove", { cardId: res.data.id });

        dispatch(
          "toast/info",
          { message: "Sukses menghapus card" },
          { root: true }
        );

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            {
              message: `Gagal menghapus card, kesalahan server ${err.response.status}`
            },
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            { message: "Gagal menghapus card, tidak ada jaringan" },
            { root: true }
          );
        }

        throw err;
      }
    }
  }
};

export default card;
