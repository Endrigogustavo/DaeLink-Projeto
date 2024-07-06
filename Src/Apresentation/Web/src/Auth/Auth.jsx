import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db, storage } from "../Database/Firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const register = async (email, password, idade, deficiencia, image, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, idade, deficiencia, image, additionalData);
    const user = userCredential.user;

    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);

    const dataToSave = {      
      email,
      idade,
      deficiencia,
      imageUrl: url ,
      ...additionalData};

    // Adicione o usuário ao Firestore
    const docRef = doc(db, "PCD", user.uid);
    await setDoc(docRef, dataToSave);

    return true;
  } catch (error) {
    console.error("Registration error: ", error);
    if (error.code === 'auth/email-already-in-use') {
      // Manipular o erro de email já registrado
      alert("Email already in use. Please use a different email.");
    }
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully:", userCredential.user.uid);
    return true;
  } catch (error) {
    console.error("Login error: ", error.code, error.message);
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