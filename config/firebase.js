// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbnxhSTKXnLIFb__wYWJTRIUZBbCGEVQE",
    authDomain: "money-buddy-9a5bb.firebaseapp.com",
    projectId: "money-buddy-9a5bb",
    storageBucket: "money-buddy-9a5bb.firebasestorage.app",
    messagingSenderId: "504814382142",
    appId: "1:504814382142:web:3016ec947ab9e90064756f",
    measurementId: "G-RGZ9Q6VTTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const firestore = getFirestore();