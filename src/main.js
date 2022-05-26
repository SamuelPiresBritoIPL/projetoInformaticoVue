import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

import VueSocketIO from 'vue-3-socket.io'

import App from './App.vue'
import router from './router'

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import vueselect from 'vue-select/dist/vue-select.css';
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

import Toaster from "@meforma/vue-toaster";

import vSelect from 'vue-select'

let toastOptions = {
    position: "top",
    timeout: 3000,
    pauseOnHover: true,
    queue: true,
    dismissible: true,
  };

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

const app = createApp(App)

const socketIO = new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8080',
 })

app.use(createPinia())
app.use(router)
app.use(bootstrap)
app.use(vueselect)
app.component('BootstrapIcon', BootstrapIcon)
app.component('v-select', vSelect)
app.use(Toaster, toastOptions)
app.use(socketIO)

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
app.config.globalProperties.$serverUrl = "http://127.0.0.1:8000/";
axios.defaults.headers.common["Authorization"] = `Bearer ${
    sessionStorage.tokenAluno ? sessionStorage.tokenAluno : (sessionStorage.tokenAdmin ? sessionStorage.tokenAdmin : (sessionStorage.tokenCoordenador ? sessionStorage.tokenCoordenador : (sessionStorage.tokenProfessor ? sessionStorage.tokenProfessor : "")))
}`;
app.config.globalProperties.$axios = axios;


app.mount('#app')
