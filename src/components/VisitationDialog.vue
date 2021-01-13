<template>
  <v-dialog v-model="dialog" max-width="480" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus-thick</v-icon> Tambah Kunjungan
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-btn @click="close()" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ selectedVisitation ? "Ubah Kunjungan" : "Kunjungan Baru" }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-divider inset vertical />
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="visitorId"
              label="Pengunjung"
              :items="visitors"
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
              v-model="gateId"
              label="Gate"
              :items="gates"
              item-text="name"
              item-value="id"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="timestamp"
              label="Waktu"
              type="datetime-local"
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
              <v-icon left>mdi-upload</v-icon> Submit Kunjungan
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
  name: "VisitationDialog",
  data: () => ({
    dialog: false,
    submitting: false,
    visitorId: null,
    gateId: null,
    timestamp: null
  }),
  computed: {
    submitDisabled() {
      return (
        this.submitting || !this.visitorId || !this.gateId || !this.timestamp
      );
    },
    ...mapState("visitation", ["selectedVisitation"]),
    ...mapState("visitor", ["visitors"]),
    ...mapState("gate", ["gates"])
  },
  methods: {
    reset() {
      this.$store.dispatch("visitation/select", { visitation: null });
      this.visitorId = null;
      this.gateId = null;
      this.timestamp = null;
    },
    close() {
      this.dialog = false;
      if (this.selectedVisitation) {
        this.reset();
      }
    },
    submit() {
      this.submitting = true;
      this.$store
        .dispatch("visitation/create", {
          info: true,
          visitation: {
            id: this.selectedVisitation
              ? this.selectedVisitation.id
              : undefined,
            visitorId: this.visitorId,
            gateId: this.gateId,
            timestamp: this.timestamp
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
    selectedVisitation(newData) {
      if (newData) {
        this.dialog = true;

        this.visitorId = newData.visitorId;
        this.gateId = newData.gateId;
        this.timestamp = newData.timestamp;
      }
    }
  },
  mounted() {
    this.$store.dispatch("visitor/findAll");
    this.$store.dispatch("gate/findAll");
  }
};
</script>
