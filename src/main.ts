import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { i18n } from '@/plugins/i18n'

const app = createApp(App)

// Todo: 主题色切换改变!
app.use(createPinia)
app.use(i18n)
app.use(router)

app.mount('#app')
