import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9jZ3j6dTO0RTIm5VtqXKdT-SXxng5-F0",
  authDomain: "fire-crud-fc0d8.firebaseapp.com",
  projectId: "fire-crud-fc0d8",
  storageBucket: "fire-crud-fc0d8.appspot.com",
  messagingSenderId: "1067655724092",
  appId: "1:1067655724092:web:bc7cbfd0f9b75d7cba9739"
};

const firebase = initializeApp(firebaseConfig); 
export const db = getFirestore();
export default firebase;




