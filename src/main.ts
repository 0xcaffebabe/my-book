import {createApp} from 'vue'
import App from './App.vue'
import createRouter from './route'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import './code-hl-vsc.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(createRouter())
app.mount('#app')
