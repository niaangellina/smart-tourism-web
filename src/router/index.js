import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/visitor-registration",
    alias: "/",
    name: "VisitorRegistration",
    component: () => import("../views/VisitorRegistration")
  },
  {
    path: "/location-statistic",
    name: "LocationStatistic",
    component: () => import("../views/LocationStatistic")
  },
  {
    path: "/location",
    name: "LocationList",
    component: () => import("../views/LocationList")
  },
  {
    path: "/gate",
    name: "GateList",
    component: () => import("../views/GateList")
  },
  {
    path: "/visitor",
    name: "VisitorList",
    component: () => import("../views/VisitorList")
  },
  {
    path: "/visitation",
    name: "VisitationList",
    component: () => import("../views/VisitationList")
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
