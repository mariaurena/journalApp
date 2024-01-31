// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNfD0N-d2qHpppXTYkBKyzl2P4laNLzCE",
  authDomain: "react-cursos-82706.firebaseapp.com",
  projectId: "react-cursos-82706",
  storageBucket: "react-cursos-82706.appspot.com",
  messagingSenderId: "867856954618",
  appId: "1:867856954618:web:0995d6b6ef229e954a0543"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig )
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB   = getFirestore( FirebaseApp )