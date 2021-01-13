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
              <CardDialog />
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="edit(item)" small class="mr-2">
              mdi-pencil
            </v-icon>
            <v-icon @click="remove(item)" small class="mr-2">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data> Tidak ada data </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardDialog from "../components/CardDialog";
import { mapState } from "vuex";

export default {
  name: "CardList",
  components: {
    CardDialog
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "ID Tag", value: "tagId" },
      { text: "Tanggal Berlaku", value: "validityDate" },
      { text: "Perintah", value: "actions", sortable: false }
    ]
  }),
  computed: {
    ...mapState("card", ["cards"])
  },
  methods: {
    edit(card) {
      this.$store.dispatch("card/select", { card: card });
    },
    remove(card) {
      this.$store.dispatch("confirmation/ask", {
        message: `Apakah anda yakin ingin menghapus kartu "${card.id}"?`,
        callback: () => {
          return this.$store.dispatch("card/remove", {
            info: true,
            cardId: card.id
          });
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("card/findAll", { info: true });
  }
};
</script>
