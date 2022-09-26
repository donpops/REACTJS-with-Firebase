// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";//import firebase from "./firebase";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDh3UCGCgjjx6umiYTDazAUgdERSJcd0w",
  authDomain: "fireact-56c05.firebaseapp.com",
  projectId: "fireact-56c05",
  storageBucket: "fireact-56c05.appspot.com",
  messagingSenderId: "423083837901",
  appId: "1:423083837901:web:8a35db998d7e1d58c61c84",
  measurementId: "G-398M9FZ32D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Get a list of cities from your database
 

export default db;