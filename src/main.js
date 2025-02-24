import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Poll from './components/Poll.vue'


const app = createApp(App)
app.component('Poll', Poll) // Register globally
app.mount('#app')
