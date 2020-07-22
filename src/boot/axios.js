import Vue from "vue";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.API_BASE_URL;

Vue.prototype.$axios = axios;
