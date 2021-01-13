<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="visitations"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Daftar Kunjungan</v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <VisitationAdd />
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
import VisitationAdd from "../components/VisitationAdd";
import { mapState } from "vuex";

export default {
  name: "VisitationList",
  components: {
    VisitationAdd,
  },
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Id Pengunjung", value: "visitorId" },
      { text: "Id Gate", value: "gateId" },
      { text: "Waktu", value: "timestamp" },
      { text: "Perintah", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("visitation", ["visitations"]),
  },
  methods: {
    remove(item) {
      this.$store.dispatch("confirmation/ask", {
        message: `Apakah anda yakin ingin menghapus visitation "${item.name}"?`,
        callback: () => {
          return this.$store.dispatch("visitation/remove", {
            visitationId: item.id,
          });
        },
      });
    },
  },
  mounted() {
    this.$store.dispatch("visitation/findAll");
  },
};
</script>
