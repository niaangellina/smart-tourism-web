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
          <template v-slot:[`item.visitor`]="{ item }">
            {{ visitorName(item) }}
          </template>
          <template v-slot:[`item.gate`]="{ item }">
            {{ gateName(item) }}
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
    VisitationAdd
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Pengunjung", value: "visitor" },
      { text: "Gate", value: "gate" },
      { text: "Waktu", value: "timestamp" },
      { text: "Perintah", value: "actions", sortable: false }
    ]
  }),
  computed: {
    ...mapState("visitation", ["visitations"]),
    ...mapState("visitor", ["visitors"]),
    ...mapState("gate", ["gates"])
  },
  methods: {
    visitorName(item) {
      const visitor = this.visitors.find(o => o.id === item.visitorId) || {};
      return visitor.name || "-";
    },
    gateName(item) {
      const gate = this.gates.find(o => o.id === item.gateId) || {};
      return gate.name || "-";
    },
    remove(visitation) {
      this.$store.dispatch("confirmation/ask", {
        message: `Apakah anda yakin ingin menghapus kunjungan "${visitation.id}"?`,
        callback: () => {
          return this.$store.dispatch("visitation/remove", {
            info: true,
            visitationId: visitation.id
          });
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("visitation/findAll", { info: true }).then(() => {
      this.$store.dispatch("visitor/findAll");
      this.$store.dispatch("gate/findAll");
    });
  }
};
</script>
