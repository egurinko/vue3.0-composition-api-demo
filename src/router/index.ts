import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import List from "../pages/List.vue";

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "List",
      component: List
    },
    { path: "*", redirect: "/" }
  ]
});

export default router;
