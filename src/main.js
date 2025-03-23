import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import directives from '@/directives'
import uiComponents from '@/ui'
import '@/assets/app.css'


const pinia = createPinia()
const app = createApp(App)

uiComponents.forEach((x) => { console.debug(x.__name); app.component(x.__name, x) })
directives.forEach((x) => { app.directive(x.__name, x) })

app.use(pinia)
app.mount('#app')
