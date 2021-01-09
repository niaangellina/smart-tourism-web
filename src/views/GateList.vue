<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="gates"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Daftar Gate</v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <GateAdd />
            </v-toolbar>
          </template>
          <template v-slot:[`item.location`]="{ item }">
            {{ locationName(item) }}
          </template>
          <template v-slot:[`item.type`]="{ item }">
            {{ typeText(item) }}
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
import GateAdd from "../components/GateAdd";
import { mapState } from "vuex";

export default {
  name: "GateList",
  components: {
    GateAdd
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Nama", value: "name" },
      { text: "Lokasi", value: "location" },
      { text: "Jenis", value: "type" },
      { text: "Perintah", value: "actions", sortable: false }
    ]
  }),
  computed: {
    ...mapState("gate", ["gates"]),
    ...mapState("location", ["locations"])
  },
  methods: {
    locationName(item) {
      const location = this.locations.find(o => o.id === item.locationId) || {};
      return location.name || "-";
    },
    typeText(item) {
      switch (item.type) {
        case "enter":
          return "Masuk";
        case "exit":
          return "Keluar";
        default:
          return "-";
      }
    },
    remove(gate) {
      this.$store.dispatch("confirmation/ask", {
        message: `Apakah anda yakin ingin menghapus gate "${gate.id}"?`,
        callback: () => {
          return this.$store.dispatch("gate/remove", {
            info: true,
            gateId: gate.id
          });
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("gate/findAll", { info: true }).then(() => {
      this.$store.dispatch("location/findAll");
    });
  }
};
</script>
