import { createApp } from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'

const app = createApp(App)

app.use(createProvider())

app.mount('#app')
