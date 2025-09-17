// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
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
const db = getFirestore()
export default db