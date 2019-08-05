import Vue from "vue";
import Router from "vue-router";
import login from "../pages/login.vue";


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: login,
      mata: {
        requireAuth: false
      }
    },
    
  ]
});

router.beforeEach((to, from, next) => {
 
});
export default router;
