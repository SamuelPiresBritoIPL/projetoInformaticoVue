import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

import App from './App.vue'
import router from './router'

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

import Toaster from "@meforma/vue-toaster";

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

app.use(createPinia())
app.use(router)
app.use(bootstrap)
app.component('BootstrapIcon', BootstrapIcon)
app.use(Toaster, toastOptions)

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
app.config.globalProperties.$serverUrl = "http://127.0.0.1:8000/";
axios.defaults.headers.common["Authorization"] = `Bearer ${
    sessionStorage.tokenAluno ? sessionStorage.tokenAluno : (sessionStorage.tokenAdmin ? sessionStorage.tokenAdmin : (sessionStorage.tokenCoordenador ? sessionStorage.tokenCoordenador : (sessionStorage.tokenProfessor ? sessionStorage.tokenProfessor : "")))
}`;
app.config.globalProperties.$axios = axios;


app.mount('#app')
