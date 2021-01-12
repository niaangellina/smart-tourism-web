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
              <VisitationDialog />
            </v-toolbar>
          </template>
          <template v-slot:[`item.visitor`]="{ item }">
            {{ visitorName(item) }}
          </template>
          <template v-slot:[`item.gate`]="{ item }">
            {{ gateName(item) }}
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
import VisitationDialog from "../components/VisitationDialog";
import { mapState } from "vuex";

export default {
  name: "VisitationList",
  components: {
    VisitationDialog
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
    edit(visitation) {
      this.$store.dispatch("visitation/select", { visitation: visitation });
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
