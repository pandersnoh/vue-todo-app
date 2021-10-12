import { createRouter, createWebHashHistory } from 'vue-router'
import TodoIndex from '~/components/TodoIndex.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'TodoIndex',
      component: TodoIndex
    }
  ]
})