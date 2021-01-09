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

        dispatch("toast/info", "Sukses menambah kartu", { root: true });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            `Gagal menambah kartu, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch("toast/info", "Gagal menambah kartu, tidak ada jaringan", {
            root: true
          });
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
            `Gagal mengambil daftar kartu, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch(
            "toast/info",
            "Gagal mengambil daftar kartu, tidak ada jaringan",
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

        dispatch("toast/info", "Sukses menghapus kartu", { root: true });

        return res.data;
      } catch (err) {
        if (err.response) {
          dispatch(
            "toast/info",
            `Gagal menghapus kartu, kesalahan server ${err.response.status}`,
            { root: true }
          );
        } else {
          dispatch("toast/info", "Gagal menghapus kartu, tidak ada jaringan", {
            root: true
          });
        }

        throw err;
      }
    }
  }
};

export default card;
