<template>
  <v-dialog v-model="dialog" max-width="480" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus-thick</v-icon> Tambah Gate
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-btn @click="close()" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ selectedGate ? "Ubah Gate" : "Gate Baru" }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-divider inset vertical />
        <v-row>
          <v-col cols="12">
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
              v-model="locationId"
              label="Lokasi"
              :items="locations"
              item-text="name"
              item-value="id"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-select>
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
          <v-col cols="12">
            <v-btn
              @click="submit()"
              :disabled="submitDisabled"
              :loading="submitting"
              color="success"
              block
            >
              <v-icon left>mdi-upload</v-icon> Submit Gate
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
  name: "GateDialog",
  data: () => ({
    dialog: false,
    submitting: false,
    name: null,
    locationId: null,
    type: null,
    types: [
      { text: "Masuk", value: "enter" },
      { text: "Keluar", value: "exit" }
    ]
  }),
  computed: {
    submitDisabled() {
      return this.submitting || !this.name || !this.locationId || !this.type;
    },
    ...mapState("gate", ["selectedGate"]),
    ...mapState("location", ["locations"])
  },
  methods: {
    reset() {
      this.$store.dispatch("gate/select", { gate: null });
      this.name = null;
      this.locationId = null;
      this.type = null;
    },
    close() {
      this.dialog = false;
      if (this.selectedGate) {
        this.reset();
      }
    },
    submit() {
      this.submitting = true;
      this.$store
        .dispatch("gate/create", {
          info: true,
          gate: {
            id: this.selectedGate ? this.selectedGate.id : undefined,
            name: this.name,
            locationId: this.locationId,
            type: this.type
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
    selectedGate(newData) {
      if (newData) {
        this.dialog = true;

        this.name = newData.name;
        this.locationId = newData.locationId;
        this.type = newData.type;
      }
    }
  },
  mounted() {
    this.$store.dispatch("location/findAll");
  }
};
</script>
