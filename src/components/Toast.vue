<template>
  <v-snackbar v-model="snackbar" timeout="-1" top>
    {{ currentMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="closeSnackbar()">
        <span v-if="messages.length > 0">Berikut ({{ messages.length }})</span>
        <span v-else>Tutup</span>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Toast",
  data: () => ({
    snackbar: false,
    timeout: null
  }),
  computed: {
    ...mapState("toast", ["currentMessage", "messages"])
  },
  methods: {
    timer(callback, duration) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(callback, duration);
    },
    showSnackbar() {
      console.log(this.snackbar);
      this.snackbar = true;
      this.timer(() => {
        this.closeSnackbar();
      }, 4000);
    },
    closeSnackbar() {
      this.snackbar = false;
      this.timer(() => {
        this.$store.dispatch("toast/close");
        this.showSnackbar();
      }, 200);
    }
  },
  watch: {
    currentMessage(newValue) {
      if (newValue != null) {
        this.showSnackbar();
      } else {
        this.snackbar = false;
      }
    }
  }
};
</script>
