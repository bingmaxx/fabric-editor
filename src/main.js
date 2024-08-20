import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PubSvg from '@/components/PubSvg.vue'

const app = createApp(App)

app.component('PubSvg', PubSvg)

app.use(router)

app.mount('#app')
