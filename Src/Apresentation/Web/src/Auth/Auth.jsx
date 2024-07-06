import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { auth, db, storage } from "../Database/Firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const registerUser = async (email, password, idade, deficiencia, image, additionalData) => {
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

export const registerEmpresa = async (email, password, cnpj, endereco, cep, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, cnpj, endereco, cep, additionalData);
    const user = userCredential.user;

    const dataToSave = {      
      email,
      cnpj,
       endereco,
        cep,
      ...additionalData};

    // Adicione o usuário ao Firestore
    const docRef = doc(db, "Empresa", user.uid);
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


export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    console.log("User logged in successfully:", uid);

    // Acessar a tabela específica com base no UID
    const userDocRef = doc(db, "PCD", uid); // Supondo que a coleção seja chamada "users" e o documento seja o UID do usuário
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User data:", userDoc.data());
      return userDoc.data(); // Retorne os dados do usuário
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Login error: ", error.code, error.message);
    return false;
  }
};



export const loginEmpresa = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    console.log("User logged in successfully:", uid);

    // Acessar a tabela específica com base no UID
    const userDocRef = doc(db, "Empresa", uid); // Supondo que a coleção seja chamada "users" e o documento seja o UID do usuário
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User data:", userDoc.data());
      return userDoc.data(); // Retorne os dados do usuário
    } else {
      console.log("No such document!");
      return null;
    }
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