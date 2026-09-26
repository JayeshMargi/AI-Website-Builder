// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-6e5a8.firebaseapp.com",
  projectId: "genwebai-6e5a8",
  storageBucket: "genwebai-6e5a8.firebasestorage.app",
  messagingSenderId: "951835026758",
  appId: "1:951835026758:web:2f60c7eacfa497c7273147"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
