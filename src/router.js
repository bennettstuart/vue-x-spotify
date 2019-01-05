import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/artist",
      name: "artist",
      component: () => import("./views/Artist.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/album",
      name: "album",
      component: () => import("./views/Album.vue"),
      meta: { requiresAuth: true }
    }
  ]
});

export default router;
