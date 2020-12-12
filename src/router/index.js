import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/location",
    alias: "/",
    name: "LocationList",
    component: () => import("../views/LocationList")
  },
  {
    path: "/card",
    name: "CardList",
    component: () => import("../views/CardList")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

import store from "../store";

router.beforeEach((to, _, next) => {
  store.state.navigation.routes.forEach(route => {
    if (route.path == to.path) {
      store.state.navigation.currentRoute = route;
    }
  });

  next();
});

export default router;
