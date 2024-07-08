import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; 
import { auth, db, storage } from "../Database/Firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const registerUser = async (email, password, idade, deficiencia,descrição, trabalho, image, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, idade, deficiencia, descrição, trabalho, image, additionalData);
    const user = userCredential.user;
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);

    const dataToSave = {      
      email,
      deficiencia,
      trabalho,
      descrição,
      idade,
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

export const registerEmpresa = async (email, password, cnpj, endereco, cep, tipo, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, cnpj, endereco, cep,tipo, additionalData);
    const user = userCredential.user;

    const dataToSave = {      
      email,
      cnpj,
      endereco,
      cep,
      tipo,
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
  const auth = getAuth();
  return onAuthStateChanged(auth, callback);
};

// Função para obter dados adicionais do usuário do Firestore
export const getUserData = async (uid) => {
  const db = getFirestore();
  const userDoc = await getDoc(doc(db, "Empresa", uid));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("User not found");
  }
};