import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetAlert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)


app.use(VueSweetAlert2)
app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)

app.mount('#app')
