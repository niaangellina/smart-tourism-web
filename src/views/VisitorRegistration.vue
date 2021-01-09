<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="tagId"
                      label="ID Tag"
                      :disabled="submitting"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Nama"
                      :disabled="submitting"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="age"
                      label="Umur"
                      type="number"
                      :disabled="submitting"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="gender"
                      label="Jenis Kelamin"
                      :items="genders"
                      item-text="text"
                      item-value="value"
                      :disabled="submitting"
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
                <v-col cols="12">
                  <v-btn
                    @click="submit()"
                    :disabled="submitDisabled"
                    :loading="submitting"
                    color="success"
                    block
                  >
                    <v-icon left>mdi-upload</v-icon> Registrasi Pengunjung
                  </v-btn>
                </v-col>
              </v-col>
              <v-col>
                <v-img
                  src="https://picsum.photos/id/0/300/300"
                  max-width="500"
                  max-height="300"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../plugins/utility";

export default {
  name: "VisitorRegistration",
  data: () => ({
    submitting: false,
    tagId: null,
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
        !this.tagId ||
        !this.name ||
        !this.age ||
        !this.gender
      );
    }
  },
  methods: {
    reset() {
      this.tagId = null;
      this.name = null;
      this.age = null;
      this.gender = null;
    },
    submit() {
      this.submitting = true;
      this.$store
        .dispatch("card/create", {
          card: {
            tagId: this.tagId,
            validityDate: (new Date()).toDateInput()
          }
        })
        .then(card => {
          this.$store
            .dispatch("visitor/create", {
              visitor: {
                cardId: card.id,
                name: this.name,
                age: this.age,
                gender: this.gender
              }
            })
            .then(() => {
              this.$store.dispatch(
                "toast/info",
                "Sukses meregistrasi pengunjung"
              );

              this.reset();
              this.submitting = false;
            })
            .catch(err => {
              const errInfo = err.response
                ? `kesalahan server ${err.response.status}`
                : "tidak ada jaringan";

              this.$store.dispatch(
                "toast/info",
                `Gagal menambah pengunjung ketika registrasi pengunjung, ${errInfo}`
              );

              this.submitting = false;
            });
        })
        .catch(err => {
          const errInfo = err.response
            ? `kesalahan server ${err.response.status}`
            : "tidak ada jaringan";

          this.$store.dispatch(
            "toast/info",
            `Gagal menambah kartu ketika registrasi pengunjung, ${errInfo}`
          );

          this.submitting = false;
        });
    }
  }
};
</script>
