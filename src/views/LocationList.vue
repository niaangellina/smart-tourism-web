<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="locations"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Daftar Lokasi</v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
              <LocationAdd />
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
import LocationAdd from "../components/LocationAdd";
import { mapState } from "vuex";

export default {
  name: "LocationList",
  components: {
    LocationAdd
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Nama", value: "name" },
      { text: "Jenis", value: "type" },
      { text: "Sudut Bujur", value: "longitude" },
      { text: "Sudut Lintang", value: "latitude" },
      { text: "Perintah", value: "actions", sortable: false }
    ]
  }),
  computed: {
    ...mapState("location", ["locations"])
  },
  methods: {
    remove(location) {
      this.$store.dispatch("confirmation/ask", {
        message: `Apakah anda yakin ingin menghapus lokasi "${location.name}"?`,
        callback: () => {
          return this.$store.dispatch("location/remove", {
            locationId: location.id
          });
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("location/findAll");
  }
};
</script>
