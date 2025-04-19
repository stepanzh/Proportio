import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import directives from '@/directives'
import uiComponents from '@/ui'
import '@/assets/app.css'

// Routes
import ProportioView from './views/proportio/ProportioView.vue'


const pinia = createPinia()
const app = createApp(App)

uiComponents.forEach((x) => { console.debug(x.__name); app.component(x.__name, x) })
directives.forEach((x) => { app.directive(x.__name, x) })

// TODO. Load base url from vite.config.js
const router = createRouter({
    history: createWebHistory('/Proportio/'),
    routes: [
        { path: '/', component: ProportioView },
    ],
})

app.use(router)
app.use(pinia)
app.mount('#app')
