<template>
  <v-dialog v-model="dialog" max-width="480" persistent>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Konfirmasi</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="body-1">
            {{ message }}
          </v-col>
          <v-col cols="6">
            <v-btn
              @click="onAccept()"
              :disabled="submitting"
              :loading="submitting"
              color="success"
              block
            >
              <v-icon left>mdi-check-bold</v-icon> Ya
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              @click="onCancel()"
              :disabled="submitting"
              color="error"
              block
            >
              <v-icon left>mdi-close-thick</v-icon> Tidak
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
  name: "Confirmation",
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapState("confirmation", ["message", "promise"]),
    submitting() {
      return this.promise != null;
    }
  },
  methods: {
    onAccept() {
      this.$store.dispatch("confirmation/accept");
    },
    onCancel() {
      this.$store.dispatch("confirmation/cancel");
    }
  },
  watch: {
    message(newValue) {
      this.dialog = newValue != null;
    }
  }
};
</script>
