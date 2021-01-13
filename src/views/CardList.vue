<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="cards"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Daftar Kartu</v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <CardAdd />
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="remove(item)" color="error" small>
              <v-icon left>mdi-delete</v-icon> hapus
            </v-btn>
          </template>
          <template v-slot:no-data> Tidak ada data </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardAdd from "../components/CardAdd";
import { mapState } from "vuex";

export default {
  name: "CardList",
  components: {
    CardAdd,
  },
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Id Tag", value: "tagId" },
      { text: "Tanggal Berlaku", value: "validityDate" },
      { text: "Perintah", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("card", ["cards"]),
  },
  methods: {
    remove(item) {
      this.$store.dispatch("confirmation/ask", {
        message: `Apakah anda yakin ingin menghapus card "${item.id}"?`,
        callback: () => {
          return this.$store.dispatch("card/remove", {
            cardId: item.id,
          });
        },
      });
    },
  },
  mounted() {
    this.$store.dispatch("card/findAll");
  },
};
</script>
