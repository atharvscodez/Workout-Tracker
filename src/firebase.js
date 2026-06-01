import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNbnrYeogHANxJAm83SU4yGgLey1dA4Js",
  authDomain: "workout-tracker-f205a.firebaseapp.com",
  projectId: "workout-tracker-f205a",
  storageBucket: "workout-tracker-f205a.firebasestorage.app",
  messagingSenderId: "566582969275",
  appId: "1:566582969275:web:ab2e28f1864b647b24ba9e",
  measurementId: "G-YVPZ2E8TBG",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
