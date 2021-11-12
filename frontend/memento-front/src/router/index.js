import { createRouter, createWebHashHistory } from "vue-router";
import Workspaceone from "../views/Workspaceone.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/loisir",
    name: "Workspaceone",
    component: Workspaceone,
    beforeEnter(route, redirect, next) {
      if (store.state.enter === true) {
        next();
      } else {
        next({ name: "Signup" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
