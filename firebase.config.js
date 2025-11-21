// firebase.config.js
import { getDrawerStatusFromState } from "@react-navigation/drawer";
import { initializeApp } from "firebase/app";
import { getAdditionalUserInfo, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCb0JiqyYbLdbbyUP66Hg6roYmqtZCz9H0",
  authDomain: "primerproyecto-24141.firebaseapp.com",
  databaseURL: "https://primerproyecto-24141-default-rtdb.firebaseio.com",
  projectId: "primerproyecto-24141",
  storageBucket: "primerproyecto-24141.firebasestorage.app",
  messagingSenderId: "398115710102",
  appId: "1:398115710102:web:567796c851f927a5238eb7",
  measurementId: "G-066PZZWB63"
};

// Inicializa Firebase solo una vez
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db=getDatabase(app);
