
import HomePage from "../pages/HomePage.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", component: HomePage},
]
export default function() {
  return createRouter({
    history: createWebHistory(),
    routes
  })
}