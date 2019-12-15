import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import List from "../pages/List.vue";
import Edit from "../pages/Edit.vue";

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "List",
      component: List
    },
    {
      path: `/todos/:id/edit`,
      name: "Edit",
      component: Edit
    },
    { path: "*", redirect: "/" }
  ]
});

export default router;
