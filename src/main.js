import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const app = createApp(App)

const instance = axios.create({
    baseURL: `http://localhost:${process.env.VUE_APP_BACKEND_PORT}`
})

app.config.globalProperties.$axios = instance
store.$axios = instance

app.use(store).use(router).mount('#app')
