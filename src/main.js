import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

import VueSocketIO from "vue-3-socket.io";

import App from "./App.vue";
import router from "./router";



//Bootstrap support
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
// Old way
//import "bootstrap/dist/css/bootstrap.css";


import "vue-select/dist/vue-select.css";
// import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

import Toaster from "@meforma/vue-toaster";

import vSelect from "vue-select";

let toastOptions = {
	position: "top",
	timeout: 3000,
	pauseOnHover: true,
	queue: true,
	dismissible: true,
};

/* import the fontawesome core */
// import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
// import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


import "gitart-vue-dialog/dist/style.css";
import { GDialog } from "gitart-vue-dialog";
import { plugin as dialogPlugin } from "gitart-vue-dialog";
import VueCal from "vue-cal";
import "vue-cal/dist/i18n/pt-br.es.js";
import "vue-cal/dist/vuecal.css";

// library.add(faUserSecret);

const app = createApp(App);

//O que é para usar localmente
const apiDomain = "http://127.0.0.1:8000";
const wsConnection = "http://localhost:8080";

/*
//O que está no servidor
const apiDomain="http://172.22.21.128"
const wsConnection="http://172.22.21.128"
*/

/*
//Ver se conseguimos usar o .env
const apiDomain = process.env.VUE_APP_API_DOMAIN
const wsConnection = process.env.VUE_APP_WS_CONNECTION
*/

const socketIO = new VueSocketIO({
	debug: true,
	connection: wsConnection,
});

app.use(createPinia());
app.use(router);
// app.use(bootstrap);
// app.use(bootstrapJS);
// app.use(boostrapIcons);
// app.use(vueselect);
// app.use(vuecalptbr);
// app.use(vuecalcss);
// app.component("BootstrapIcon", BootstrapIcon);
app.component("v-select", vSelect);
app.component("GDialog", GDialog);
app.component("vue-cal", VueCal);
app.use(dialogPlugin);
app.use(Toaster, toastOptions);
app.use(socketIO);

axios.defaults.baseURL = `${apiDomain}/api`;
app.config.globalProperties.$serverUrl = apiDomain;
axios.defaults.headers.common["Authorization"] = `Bearer ${
	sessionStorage.tokenAluno
		? sessionStorage.tokenAluno
		: sessionStorage.tokenAdmin
		? sessionStorage.tokenAdmin
		: sessionStorage.tokenCoordenador
		? sessionStorage.tokenCoordenador
		: sessionStorage.tokenProfessor
		? sessionStorage.tokenProfessor
		: ""
}`;
app.config.globalProperties.$axios = axios;

app.mount("#app");
