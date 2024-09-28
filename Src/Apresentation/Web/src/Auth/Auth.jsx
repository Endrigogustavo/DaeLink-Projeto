import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../Database/Firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

//Função para cadastrar um novo usuario
export const registerUser = async (name, email, password, idade, deficiencia, descrição, trabalho, image, background, sobre, experiencias, tipo, laudomedico, additionalData) => {
  try {
    //Autenticador do Firebase
    const PCDCredential = await createUserWithEmailAndPassword(auth, email, password);
    //Autenticar usuario unico
    const user = PCDCredential.user;



    // Upload da imagem de perfil
    const profileImageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(profileImageRef, image);
    const profileImageUrl = await getDownloadURL(profileImageRef);

    // Upload da imagem de fundo
    const backgroundImageRef = ref(storage, `background_profile/${background.name}`);
    await uploadBytes(backgroundImageRef, background);
    const backgroundImageUrl = await getDownloadURL(backgroundImageRef);

    // Upload laudo medico
    const LaudoDoc = ref(storage, `laudo_medico/${laudomedico.name}`);
    await uploadBytes(LaudoDoc, laudomedico);
    const LaudoURL = await getDownloadURL(LaudoDoc);


    //Dados a serem salvos em uma variavel
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
      ...additionalData
    };

    const TesteEmail = collection(db, "PCD")
    const q = query(TesteEmail, where("email", "==", email));
    const VerifiEmail = getDocs(q)

    if(VerifiEmail.exists()){
      alert("Erro, Tente novamente")
    }else{
    // Adicione o usuário ao Firestore
    const PCDdoc = doc(db, "PCD", user.uid);
    //Adicionando os dados junto do usuario no banco
    await setDoc(PCDdoc, dataToSave);
    }


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

//Constante de registrar empresa

export const registerEmpresa = async (
  email,
  password,
  sobre,
  area,
  cnpj,
  endereco,
  cep,
  tipo,
  image,
  background,
  additionalData
) => {
  try {
    // Autenticação do Firebase
    const CompanyCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = CompanyCredential.user;

    // Upload da imagem do perfil
    const profileImageRef = ref(storage, `images_company/${image.name}`);
    await uploadBytes(profileImageRef, image);
    const profileImageUrl = await getDownloadURL(profileImageRef);

    // Upload da imagem de fundo
    const backgroundImageRef = ref(storage, `background_profile_company/${background.name}`);
    await uploadBytes(backgroundImageRef, background);
    const backgroundImageUrl = await getDownloadURL(backgroundImageRef);

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

    // Adiciona o usuário ao Firestore
    const CompanyDoc = doc(db, "Empresa", user.uid);
    await setDoc(CompanyDoc, dataToSave);
    return { success: true, uid: user.uid };
  } catch (error) {
    console.error("Erro ao registrar, tente novamente: ", error);
    if (error.code === 'auth/email-already-in-use') {
      alert("O email utilizado está em uso, tente outro email");
    }
    return { success: false, message: error.message };
  }
};


export const registerVaga = async (tipo, empresa, detalhes, salario, exigencias, area, local, vaga, empresaId, additionalData) => {
  try {
    // Dados a serem salvos no Firestore
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
    const VagaDocAdd = await addDoc(collection(db, "Vagas"), dataToSave);

    console.log("Vaga adicionada com ID: ", VagaDocAdd.id);


    return true;
  } catch (error) {
    console.error("Registration error: ", error);
    return false;
  }
};


export const loginUser = async (email, password) => {
  try {
    const PCDCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = PCDCredential.user.uid;
    console.log("User logged in successfully:", uid);

    // Acessar a tabela específica com base no UID
    const PCDDocRef = doc(db, "PCD", uid);
    const GetPCDDoc = await getDoc(PCDDocRef);

    if (GetPCDDoc.exists()) {
      console.log("User data:", GetPCDDoc.data());
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
    console.log("User logged in successfully:", uid);

    // Acessar a tabela específica com base no UID
    const CompanyDoc = doc(db, "Empresa", uid);
    const GetCompanyDoc = await getDoc(CompanyDoc);

    if (GetCompanyDoc.exists()) {
      console.log("User data:", GetCompanyDoc.data());
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
