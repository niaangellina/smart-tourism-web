<template>
  <v-dialog v-model="dialog" max-width="480" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus-thick</v-icon> Tambah Pengunjung
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-btn @click="close()" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Pengunjung Baru</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-divider inset vertical />
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="name"
              label="Nama"
              :disabled="submitting"
              clearable
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="age"
              label="Umur"
              type="number"
              :disabled="submitting"
              clearable
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="gender"
              label="Jenis Kelamin"
              :disabled="submitting"
              clearable
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="city"
              label="Asal"
              :disabled="submitting"
              clearable
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
              <v-icon left>mdi-upload</v-icon> Submit Pengunjung
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "VisitorAdd",
  data: () => ({
    dialog: false,
    submitting: false,
    name: null,
    age: null,
    gender: null,
    city: null,
  }),
  computed: {
    submitDisabled() {
      return (
        this.submitting || !this.name || !this.age || !this.gender || !this.city
      );
    },
  },
  methods: {
    reset() {
      this.name = null;
      this.age = null;
      this.gender = null;
      this.city = null;
    },
    close() {
      this.dialog = false;
    },
    submit() {
      this.submitting = true;
      this.$store
        .dispatch("visitor/create", {
          visitor: {
            name: this.name,
            age: this.age,
            gender: this.gender,
            city: this.city,
          },
        })
        .then(() => {
          this.close();
          this.reset();
        })
        .finally(() => {
          this.submitting = false;
        });
    },
  },
};
</script>
