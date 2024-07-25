// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBT5c1uhDYJ2qQ01xWGpy4Pj_1eGUhAE5s",
    authDomain: "placapedia-c7bce.firebaseapp.com",
    projectId: "placapedia-c7bce",
    storageBucket: "placapedia-c7bce.appspot.com",
    messagingSenderId: "407141037523",
    appId: "1:407141037523:web:78029998cba46519feab26",
    measurementId: "G-13DW3Q8M02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);