<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <v-toolbar-title>
        <b>Smart Visitor Web</b>
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
import Confirmation from "./components/Confirmation";
import Navigation from "./components/Navigation";
import Toast from "./components/Toast";

export default {
  name: "App",
  components: {
    Confirmation,
    Navigation,
    Toast
  }
};
</script>
