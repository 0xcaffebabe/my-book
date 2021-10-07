
import HomePage from "../pages/HomePage.vue"
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: "/home", component: HomePage},
]
export default function() {
  return createRouter({
    history: createWebHashHistory(),
    routes
  })
}