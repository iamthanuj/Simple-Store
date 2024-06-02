import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6NB9-Rr3jCfNIzY_nDaxLQVZJLMQbtmg",
  authDomain: "simple-store-b5772.firebaseapp.com",
  projectId: "simple-store-b5772",
  storageBucket: "simple-store-b5772.appspot.com",
  messagingSenderId: "1011634409242",
  appId: "1:1011634409242:web:c1911cf976c63fb2cae6a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)