import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

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
app.component('font', FontAwesomeIcon)
app.component('BootstrapIcon', BootstrapIcon);



app.mount('#app')
