import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router' 
import './style.css' 

const app = createApp(App)

app.use(createPinia()) // 👈 instala Pinia
app.use(router) 
app.mount('#app')
