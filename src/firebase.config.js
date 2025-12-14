// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// TODO: Replace with your actual config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDw9ebEXSxni56S6Z7DFjq4sYDbGtvOKzM",
    authDomain: "stock-broker-44781.firebaseapp.com",
    projectId: "stock-broker-44781",
    storageBucket: "stock-broker-44781.firebasestorage.app",
    messagingSenderId: "660200191194",
    appId: "1:660200191194:web:b40fdec9928aa457a6e1e3",
    measurementId: "G-F2BXVJWL6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
