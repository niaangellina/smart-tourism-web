<template>
  <v-navigation-drawer app clipped permanent>
    <v-list nav>
      <v-list-item-group v-model="selectedRoute">
        <v-list-item
          v-for="route in routes"
          :key="route.title"
          :disabled="route.path == currentRoute.path"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapState("navigation", ["routes", "currentRoute"]),
    selectedRoute: {
      get() {
        let selectedIndex = 0;
        this.routes.forEach((route, index) => {
          if (this.currentRoute.path == route.path) {
            selectedIndex = index;
          }
        });

        return selectedIndex;
      },
      set(index) {
        this.$store.dispatch("navigation/push", {
          app: this,
          route: this.routes[index]
        });
      }
    }
  }
};
</script>
