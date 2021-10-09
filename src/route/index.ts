
import HomePage from "../pages/HomePage.vue"
import DocPage from "../pages/doc/DocPage.vue"
import WordCloud from "../pages/WordCloud.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", component: HomePage},
  { path: "/wc", component: WordCloud},
  { path: "/doc/:doc", component: DocPage},
]
export default function() {
  return createRouter({
    history: createWebHistory(),
    routes
  })
}