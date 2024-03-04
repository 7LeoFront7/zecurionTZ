import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue'
import './style.css'



createApp(App).use(autoAnimatePlugin).use(VueSweetalert2).mount('#app')
