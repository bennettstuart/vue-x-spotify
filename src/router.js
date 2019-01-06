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
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/artist/:id",
      name: "artist",
      component: () => import("./views/Artist.vue"),
      children: [
        {
          path: "",
          name: "discography",
          component: () => import("./views/Discography.vue")
        },
        {
          path: "album/:albumId",
          name: "album",
          component: () => import("./views/Album.vue")
        }
      ]
    }
  ]
});

export default router;
