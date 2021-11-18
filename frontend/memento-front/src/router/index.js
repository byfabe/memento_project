import { createRouter, createWebHistory } from "vue-router";
import Workspaceone from "../views/Workspaceone.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Profile from "../views/Profile.vue";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/board",
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
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
