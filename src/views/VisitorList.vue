<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="visitors"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Daftar Pengunjung</v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <VisitorDialog />
            </v-toolbar>
          </template>
          <template v-slot:[`item.card`]="{ item }">
            {{ cardTagId(item) }}
          </template>
          <template v-slot:[`item.gender`]="{ item }">
            {{ genderText(item) }}
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
import VisitorDialog from "../components/VisitorDialog";
import { mapState } from "vuex";

export default {
  name: "VisitorList",
  components: {
    VisitorDialog
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Kartu", value: "card" },
      { text: "Nama", value: "name" },
      { text: "Umur", value: "age" },
      { text: "Jenis Kelamin", value: "gender" },
      { text: "Perintah", value: "actions", sortable: false }
    ]
  }),
  computed: {
    ...mapState("visitor", ["visitors"]),
    ...mapState("card", ["cards"])
  },
  methods: {
    cardTagId(item) {
      const card = this.cards.find(o => o.id === item.cardId) || {};
      return card.tagId || "-";
    },
    genderText(item) {
      switch (item.gender) {
        case "male":
          return "Laki-laki";
        case "female":
          return "Perempuan";
        default:
          return "-";
      }
    },
    edit(visitor) {
      this.$store.dispatch("visitor/select", { visitor: visitor });
    },
    remove(visitor) {
      this.$store.dispatch("confirmation/ask", {
        message: `Apakah anda yakin ingin menghapus pengunjung "${visitor.name}"?`,
        callback: () => {
          return this.$store.dispatch("visitor/remove", {
            info: true,
            visitorId: visitor.id
          });
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("visitor/findAll", { info: true }).then(() => {
      this.$store.dispatch("card/findAll");
    });
  }
};
</script>
