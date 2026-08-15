import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8UKR6kVEFVU63G19a1EfpzFY07V9H7IA",
  authDomain: "fe-firebase-react-ecommerce.firebaseapp.com",
  projectId: "fe-firebase-react-ecommerce",
  storageBucket: "fe-firebase-react-ecommerce.firebasestorage.app",
  messagingSenderId: "737405285811",
  appId: "1:737405285811:web:d5dd2554a7ea27590f47c6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);