import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../Database/Firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const registerUser = async (name, email, password, idade, deficiencia, descrição, trabalho, image, background, sobre, experiencias, tipo, laudomedico, CPF, additionalData) => {
  try {
    // Autenticador do Firebase
    const PCDCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = PCDCredential.user;

    // Upload das imagens em paralelo
    const [profileImageUrl, backgroundImageUrl, LaudoURL] = await Promise.all([
      uploadAndGetDownloadUrl(`images/${image.name}`, image),
      uploadAndGetDownloadUrl(`background_profile/${background.name}`, background),
      uploadAndGetDownloadUrl(`laudo_medico/${laudomedico.name}`, laudomedico)
    ]);

    // Dados a serem salvos em uma variável
    const dataToSave = {
      name,
      email,
      deficiencia,
      trabalho,
      descrição,
      idade,
      tipo,
      imageUrl: profileImageUrl,
      sobre,
      experiencias,
      imageProfile: backgroundImageUrl,
      laudo: LaudoURL,
      CPF,
      ...additionalData
    };

    // Verifica se o email já está em uso
    const emailQuery = query(collection(db, "PCD"), where("email", "==", email));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      alert("Erro, Tente novamente");
      return false;
    }

    const PCDdoc = doc(db, "PCD", user.uid);
    await setDoc(PCDdoc, dataToSave);

    return { success: true, uid: user.uid };
  } catch (error) {
    console.error("Erro ao registrar, tente novamente: ", error);
    if (error.code === 'auth/email-already-in-use') {
      alert("O email utilizado está em uso, tente outro email");
    }
    return false;
  }
};

// Função para upload e obter URL
const uploadAndGetDownloadUrl = async (path, file) => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

// Constante de registrar empresa
export const registerEmpresa = async (email, password, sobre, area, cnpj, endereco, cep, tipo, image, background, additionalData) => {
  try {
    // Autenticação do Firebase
    const CompanyCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = CompanyCredential.user;

    // Upload das imagens em paralelo
    const [profileImageUrl, backgroundImageUrl] = await Promise.all([
      uploadAndGetDownloadUrl(`images_company/${image.name}`, image),
      uploadAndGetDownloadUrl(`background_profile_company/${background.name}`, background)
    ]);

    // Informações para salvar no banco
    const dataToSave = {
      email,
      cnpj,
      sobre,
      area,
      endereco,
      cep,
      tipo,
      imageProfile: backgroundImageUrl,
      imageUrl: profileImageUrl,
      ...additionalData
    };

    // Verifica se o email já está em uso
    const emailQuery = query(collection(db, "PCD"), where("email", "==", email));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      alert("Erro, Tente novamente");
      return false;
    }

    const EmpresaDoc = doc(db, "Empresa", user.uid);
    await setDoc(EmpresaDoc, dataToSave);

    return { success: true, uid: user.uid };
  } catch (error) {
    console.error("Erro ao registrar, tente novamente: ", error);
    if (error.code === 'auth/email-already-in-use') {
      alert("O email utilizado está em uso, tente outro email");
    }
    return { success: false, message: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const PCDCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = PCDCredential.user.uid;
    // Acessar a tabela específica com base no UID
    const PCDDocRef = doc(db, "PCD", uid);
    const GetPCDDoc = await getDoc(PCDDocRef);

    if (GetPCDDoc.exists()) {
      return { uid, ...GetPCDDoc.data() };
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
    const CompanyCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = CompanyCredential.user.uid;
 

    // Acessar a tabela específica com base no UID
    const CompanyDoc = doc(db, "Empresa", uid);
    const GetCompanyDoc = await getDoc(CompanyDoc);

    if (GetCompanyDoc.exists()) {
    
      return { uid, ...GetCompanyDoc.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Login error: ", error.code, error.message);
    throw error; // Lançar o erro para lidar com ele no componente React
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
  const CompanyDoc = await getDoc(doc(db, "Empresa", uid));
  const PCDDoc = await getDoc(doc(db, "PCD", uid));
  if (CompanyDoc.exists()) {
    return CompanyDoc.data();
  }
  if (PCDDoc.exists()) {
    return PCDDoc.data();
  }
  else {
    throw new Error("User not found");
  }
};
