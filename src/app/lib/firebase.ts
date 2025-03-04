import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1JjaFR42gTi_gpd2wP3rp0-vXsF0-biU",
  authDomain: "folio-6e7d4.firebaseapp.com",
  projectId: "folio-6e7d4",
  storageBucket: "folio-6e7d4.firebasestorage.app",
  messagingSenderId: "700252176129",
  appId: "1:700252176129:web:d89798edf79954f1b7a500",
  measurementId: "G-761WH6KVCF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };