import { createRouter, createWebHashHistory } from 'vue-router'
import Workspaceone from '../views/Workspaceone.vue'
import Workspacetwo from '../views/Workspacetwo.vue'
import Workspacethree from '../views/Workspacethree.vue'

const routes = [
  {
    path: '/loisir',
    name: 'Workspaceone',
    component: Workspaceone
  },
  {
    path: '/travail',
    name: 'Workspacetwo',
    component: Workspacetwo
  },
  {
    path: '/divers',
    name: 'Workspacethree',
    component: Workspacethree
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
