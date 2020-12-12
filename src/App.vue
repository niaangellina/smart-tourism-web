<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <v-toolbar-title>
        <b>Smart Visitor Web</b>
      </v-toolbar-title>
    </v-app-bar>
    <Navigation />
    <!-- <Toast :app="this" />
    <Confirmation :app="this" /> -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
// import Toast from './components/Toast'
// import Confirmation from './components/Confirmation'

export default {
  name: "App",
  components: {
    Navigation
    // Toast,
    // Confirmation
  }
};
</script>
