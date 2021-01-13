<template>
  <v-dialog v-model="dialog" max-width="480" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus-thick</v-icon> Tambah Kartu
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-btn @click="close()" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ selectedCard ? "Ubah Kartu" : "Kartu Baru" }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-divider inset vertical />
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="tagId"
              label="ID Tag"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="validityDate"
              label="Tanggal Berlaku"
              type="date"
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
              <v-icon left>mdi-upload</v-icon> Submit Kartu
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
  name: "CardDialog",
  data: () => ({
    dialog: false,
    submitting: false,
    tagId: null,
    validityDate: null
  }),
  computed: {
    submitDisabled() {
      return this.submitting || !this.tagId || !this.validityDate;
    },
    ...mapState("card", ["selectedCard"])
  },
  methods: {
    reset() {
      this.$store.dispatch("card/select", { card: null });
      this.tagId = null;
      this.validityDate = null;
    },
    close() {
      this.dialog = false;
      if (this.selectedCard) {
        this.reset();
      }
    },
    submit() {
      this.submitting = true;
      this.$store
        .dispatch("card/create", {
          info: true,
          card: {
            id: this.selectedCard ? this.selectedCard.id : undefined,
            tagId: this.tagId,
            validityDate: this.validityDate
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
    selectedCard(newData) {
      if (newData) {
        this.dialog = true;

        this.tagId = newData.tagId;
        this.validityDate = newData.validityDate;
      }
    }
  }
};
</script>
