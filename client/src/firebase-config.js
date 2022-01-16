// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKlPMURS5oVYj4H5pEOUUS4qwsLwMd_KU",
  authDomain: "cloud-compare-679b2.firebaseapp.com",
  projectId: "cloud-compare-679b2",
  storageBucket: "cloud-compare-679b2.appspot.com",
  messagingSenderId: "162305654071",
  appId: "1:162305654071:web:7d2361e60e56ce8f732eb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);