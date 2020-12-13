<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <v-toolbar-title>
        <b>Smart Tourism Web | </b> {{ currentRoute.title }}
      </v-toolbar-title>
    </v-app-bar>
    <Confirmation />
    <Navigation />
    <Toast />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Confirmation from "./components/Confirmation";
import Navigation from "./components/Navigation";
import Toast from "./components/Toast";

export default {
  name: "App",
  components: {
    Confirmation,
    Navigation,
    Toast
  },
  computed: {
    ...mapState("navigation", ["currentRoute"])
  }
};
</script>
