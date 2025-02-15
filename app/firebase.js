import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

require('dotenv').config();

const api = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: api,
  authDomain: "hospital-a1608.firebaseapp.com",
  projectId: "hospital-a1608",
  storageBucket: "hospital-a1608.firebasestorage.app",
  messagingSenderId: "191937732775",
  appId: "1:191937732775:web:2d15e95237f76949f97b82",
  measurementId: "G-MM2P5G7LEW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
