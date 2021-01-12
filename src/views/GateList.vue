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
              <GateDialog />
            </v-toolbar>
          </template>
          <template v-slot:[`item.location`]="{ item }">
            {{ locationName(item) }}
          </template>
          <template v-slot:[`item.type`]="{ item }">
            {{ typeText(item) }}
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
import GateDialog from "../components/GateDialog";
import { mapState } from "vuex";

export default {
  name: "GateList",
  components: {
    GateDialog
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
    edit(gate) {
      this.$store.dispatch("gate/select", { gate: gate });
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
