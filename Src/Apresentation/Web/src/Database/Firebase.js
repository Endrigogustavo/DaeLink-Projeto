// Import the functions you need from the SDKs you need
import { getAuth, } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  

const firebaseConfig = {
  apiKey: "AIzaSyA-aYVeTIWTQWhBXG11iaCaBSWikfQWvlI",
  authDomain: "daelink-producao.firebaseapp.com",
  projectId: "daelink-producao",
  storageBucket: "daelink-producao.appspot.com",
  messagingSenderId: "1037795223095",
  appId: "1:1037795223095:web:0803dc2cc54b676a4e01b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)


auth.useDeviceLanguage();

export { auth, db, storage };
