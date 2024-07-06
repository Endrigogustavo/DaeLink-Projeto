// src/utils/auth.js
// src/utils/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../Database/Firebase";

export const register = async (email, password, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Adicione o usuário ao Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      ...additionalData
    });

    return true;
  } catch (error) {
    console.error("Registration error: ", error);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Login error: ", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error: ", error);
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};