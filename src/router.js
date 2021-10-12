import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '~/components/HelloWorld.vue'
import Example from '~/components/Example.vue'
import TodoIndex from '~/components/TodoIndex.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/example',
      name: 'Example',
      component: Example
    },
    {
      path: '/todos',
      name: 'TodoIndex',
      component: TodoIndex
    },
  ]
})