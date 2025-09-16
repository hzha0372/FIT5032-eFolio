import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIpTWXZkILcrc5O8OQn3nD3YEqkpimOeg",
  authDomain: "fit5032-efolio-e5f9a.firebaseapp.com",
  projectId: "fit5032-efolio-e5f9a",
  storageBucket: "fit5032-efolio-e5f9a.firebasestorage.app",
  messagingSenderId: "1033048435465",
  appId: "1:1033048435465:web:b493494c21383bc80ac1d8"
};

// Initialize Firebase
initializeApp(firebaseConfig);