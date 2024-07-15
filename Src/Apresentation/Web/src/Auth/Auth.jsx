import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore , addDoc, collection} from "firebase/firestore"; 
import { auth, db, storage } from "../Database/Firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

//Função para cadastrar um novo usuario
export const registerUser = async (email, password, idade, deficiencia, descrição, trabalho, image, background, sobre, experiencias, tipo, additionalData) => {
  try {
    //Autenticador do Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //Autenticar usuario unico
    const user = userCredential.user;

    // Upload da imagem de perfil
    const profileImageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(profileImageRef, image);
    const profileImageUrl = await getDownloadURL(profileImageRef);

    // Upload da imagem de fundo
    const backgroundImageRef = ref(storage, `background_profile/${background.name}`);
    await uploadBytes(backgroundImageRef, background);
    const backgroundImageUrl = await getDownloadURL(backgroundImageRef);

    //Dados a serem salvos em uma variavel
    const dataToSave = {
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
      ...additionalData
    };

    // Adicione o usuário ao Firestore
    const docRef = doc(db, "PCD", user.uid);
    //Adicionando os dados junto do usuario no banco
    await setDoc(docRef, dataToSave);

    return { success: true, uid: user.uid };
  } catch (error) {
    console.error("Erro ao registrar, tente novamente: ", error);
    if (error.code === 'auth/email-already-in-use') {
      // Manipular o erro de email já registrado
      alert("O email utilizado esta em uso, tente outro email");
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
    return { success: true, uid: user.uid };

    return true;
  } catch (error) {
    console.error("Erro ao registrar, tente novamente: ", error);
    if (error.code === 'auth/email-already-in-use') {
      // Manipular o erro de email já registrado
      alert("O email utilizado esta em uso, tente outro email");
    }
    return false;
  }
};


export const registerVaga = async (tipo, empresa, detalhes, salario, exigencias, area, local, vaga, empresaId, additionalData) => {
  try {

    const dataToSave = {
      vaga,
      detalhes,
      area,
      empresa,
      salario,
      tipo,
      local,
      exigencias,
      empresaId,
      ...additionalData
    };

    // Adicione a vaga ao Firestore
    const docRef = await addDoc(collection(db, "Vagas"), dataToSave);

    console.log("Vaga adicionada com ID: ", docRef.id);

    
    return { success: true, uid: user.uid };
  } catch (error) {
    console.error("Registration error: ", error);
    return false;
  }
};



export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    console.log("User logged in successfully:", uid);

    // Acessar a tabela específica com base no UID
    const userDocRef = doc(db, "PCD", uid); 
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User data:", userDoc.data());
      return { uid, ...userDoc.data() };
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
    const userDocRef = doc(db, "Empresa", uid); 
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User data:", userDoc.data());
      return { uid, ...userDoc.data() }; 
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
  const userDoc = await getDoc(doc(db, "Empresa", uid));
  const userDocPCD = await getDoc(doc(db, "PCD", uid));
  if (userDoc.exists()) {
    return userDoc.data();
  } 
  if(userDocPCD.exists()){
    return userDocPCD.data();
  }
    else {
    throw new Error("User not found");
  }
};
