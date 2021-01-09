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
        <v-toolbar-title>Lokasi Baru</v-toolbar-title>
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
            <v-text-field
              v-model="type"
              label="Jenis"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-text-field>
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
export default {
  name: "LocationAdd",
  data: () => ({
    dialog: false,
    submitting: false,
    name: null,
    type: null,
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
    }
  },
  methods: {
    reset() {
      this.name = null;
      this.type = null;
      this.longitude = null;
      this.latitude = null;
    },
    close() {
      this.dialog = false;
    },
    submit() {
      this.submitting = true;
      this.$store
        .dispatch("location/create", {
          location: {
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
  }
};
</script>
