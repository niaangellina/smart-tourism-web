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
        <v-toolbar-title>
          {{ selectedVisitor ? "Ubah Pengunjung" : "Pengunjung Baru" }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-divider inset vertical />
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="cardId"
              label="Kartu"
              :items="cards"
              item-text="tagId"
              item-value="id"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-select>
          </v-col>
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
              v-model="age"
              label="Umur"
              type="number"
              :disabled="submitting"
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="gender"
              label="Jenis Kelamin"
              :items="genders"
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
              <v-icon left>mdi-upload</v-icon> Submit Pengunjung
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
  name: "VisitorDialog",
  data: () => ({
    dialog: false,
    submitting: false,
    cardId: null,
    name: null,
    age: null,
    gender: null,
    genders: [
      { text: "Laki-laki", value: "male" },
      { text: "Perempuan", value: "female" }
    ]
  }),
  computed: {
    submitDisabled() {
      return (
        this.submitting ||
        !this.cardId ||
        !this.name ||
        !this.age ||
        !this.gender
      );
    },
    ...mapState("visitor", ["selectedVisitor"]),
    ...mapState("card", ["cards"])
  },
  methods: {
    reset() {
      this.$store.dispatch("visitor/select", { visitor: null });
      this.cardId = null;
      this.name = null;
      this.age = null;
      this.gender = null;
    },
    close() {
      this.dialog = false;
      if (this.selectedVisitor) {
        this.reset();
      }
    },
    submit() {
      this.submitting = true;
      this.$store
        .dispatch("visitor/create", {
          info: true,
          visitor: {
            id: this.selectedVisitor ? this.selectedVisitor.id : undefined,
            cardId: this.cardId,
            name: this.name,
            age: this.age,
            gender: this.gender
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
    selectedVisitor(newData) {
      if (newData) {
        this.dialog = true;

        this.cardId = newData.cardId;
        this.name = newData.name;
        this.age = newData.age;
        this.gender = newData.gender;
      }
    }
  },
  mounted() {
    this.$store.dispatch("card/findAll");
  }
};
</script>
