import { createRouter, createWebHashHistory } from "vue-router";
import Workspaceone from "../views/Workspaceone.vue";
import Workspacetwo from "../views/Workspacetwo.vue";
import Workspacethree from "../views/Workspacethree.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

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
  },
  {
    path: "/travail",
    name: "Workspacetwo",
    component: Workspacetwo,
  },
  {
    path: "/divers",
    name: "Workspacethree",
    component: Workspacethree,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
