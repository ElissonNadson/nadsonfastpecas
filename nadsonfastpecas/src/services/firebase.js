// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9W1XMOVbb68QAHHLf8Uc7V-RammOZ8Ik",
  authDomain: "nadsonfastpecas.firebaseapp.com",
  projectId: "nadsonfastpecas",
  storageBucket: "nadsonfastpecas.appspot.com",
  messagingSenderId: "341291428803",
  appId: "1:341291428803:web:e0a44cda84f0bd2dfb6b76",
  measurementId: "G-3F99TGERTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;