// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAB_EtOGn5m_rNzXr7SG7D61KcOwDsKgE",
  authDomain: "daelink-projeto.firebaseapp.com",
  projectId: "daelink-projeto",
  storageBucket: "daelink-projeto.appspot.com",
  messagingSenderId: "775363508579",
  appId: "1:775363508579:web:0426976db91adb4bd8fb56",
  measurementId: "G-TXSH5BXCHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };