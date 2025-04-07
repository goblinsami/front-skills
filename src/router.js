// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Board from './components/Board.vue'
import Home from './components/Home.vue'
const routes = [
    { path: '/', name: 'Home', component: Home },           // 👈 Ruta por defecto
    { path: '/board', name: 'Board', component: Board },
]

const router = createRouter({
  history: createWebHistory(), // Usa la historia del navegador (sin #)
  routes,
})

export default router
