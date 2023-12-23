// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz_-N20aKrjSmxtJsWJE3ylhC7dA-CX7s",
  authDomain: "auth-music-app.firebaseapp.com",
  projectId: "auth-music-app",
  storageBucket: "auth-music-app.appspot.com",
  messagingSenderId: "779072786560",
  appId: "1:779072786560:web:633111d0463bf129c85665",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
