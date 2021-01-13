<template>
  <v-dialog v-model="dialog" max-width="480" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus-thick</v-icon> Tambah Lokasi
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-btn @click="close()" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ selectedLocation ? "Ubah Lokasi" : "Lokasi Baru" }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-divider inset vertical />
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="name"
              label="Nama"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="type"
              label="Jenis"
              :items="types"
              item-text="text"
              item-value="value"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="longitude"
              label="Sudut Bujur"
              type="number"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="latitude"
              label="Sudut Lintang"
              type="number"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              @click="submit()"
              :disabled="submitDisabled"
              :loading="submitting"
              color="success"
              block
            >
              <v-icon left>mdi-upload</v-icon> Submit Lokasi
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LocationDialog",
  data: () => ({
    dialog: false,
    submitting: false,
    name: null,
    type: null,
    types: [
      { text: "Informasi", value: "information" },
      { text: "Galeri", value: "gallery" },
      { text: "Taman", value: "garden" },
      { text: "Wahana", value: "rides" },
      { text: "Tempat Parkir", value: "parking_area" },
      { text: "Toilet", value: "Restroom" },
      { text: "Toko Suvernir", value: "gift_shop" },
      { text: "Tempat Makan", value: "food_court" }
    ],
    longitude: null,
    latitude: null
  }),
  computed: {
    submitDisabled() {
      return (
        this.submitting ||
        !this.name ||
        !this.type ||
        !this.longitude ||
        !this.latitude
      );
    },
    ...mapState("location", ["selectedLocation"])
  },
  methods: {
    reset() {
      this.$store.dispatch("location/select", { location: null });
      this.name = null;
      this.type = null;
      this.longitude = null;
      this.latitude = null;
    },
    close() {
      this.dialog = false;
      if (this.selectedLocation) {
        this.reset();
      }
    },
    submit() {
      this.submitting = true;
      this.$store
        .dispatch("location/create", {
          info: true,
          location: {
            id: this.selectedLocation ? this.selectedLocation.id : undefined,
            name: this.name,
            type: this.type,
            longitude: this.longitude,
            latitude: this.latitude
          }
        })
        .then(() => {
          this.close();
          this.reset();
        })
        .finally(() => {
          this.submitting = false;
        });
    }
  },
  watch: {
    selectedLocation(newData) {
      if (newData) {
        this.dialog = true;

        this.name = newData.name;
        this.type = newData.type;
        this.longitude = newData.longitude;
        this.latitude = newData.latitude;
      }
    }
  }
};
</script>
