import Vue from "vue";
import Router from "vue-router";
import login from "../pages/login.vue";
import p from "../pages/pictures/pictures";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/p",
      name: "p",
      component: p
    }
  ]
});

export default router;
