import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db, storage, auth } from "../../../Database/Firebase"; 
import { useParams, useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { decrypt } from "../../../Security/Cryptography_Rotes";
import { getAuth, updateEmail, sendPasswordResetEmail, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

import axios from 'axios'



const EditarPerfil = () => {

  const auth = getAuth();
  const user = auth.currentUser;



  // Função de navegação do site
  const navigate = useNavigate();
  // Utilizado para pegar o id do usuario e da vaga na tela anterior
 
  const [userId, setUserId] = useState('');

  const [senha, setSenha] = useState("");
  // Informações do usuario
  const [userData, setUserProfile] = useState({
    name: '',
    email: '',
    trabalho: '',
    descrição: '',
    idade: '',
    sobre: '',
    experiencias: '',
    deficiencia: ''
  });



  // Carregar as informações do usuário do banco de dados
  useEffect(() => {

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        const userId = storedUserId;
        setUserId(userId)
    }

    const getUserProfile = async () => {
      const userDoc = doc(db, "PCD", userId);
      const GetUser = await getDoc(userDoc);
      if (GetUser.exists()) {
        setUserProfile(GetUser.data());
      } else {
        setUserProfile(null);
        alert("Sem documentos!");
      }
    };
    getUserProfile();
  }, [userId]);

  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  {/*
  // Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      axios.post('https://localhost:3000/updateprofile/'+id, {userData})
     .then(res =>{
      alert("Perfil atualizado com sucesso")
     })
     .catch(err =>{
      console.log(err)
      alert("Falha ao atualizar, tente novamente.");
    })
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

  */}

  const PassReset = () =>{

const auth = getAuth();
sendPasswordResetEmail(auth, userData.email)
  .then(() => {
   alert("Email para a alteração de senha foi enviado")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const credential = EmailAuthProvider.credential(
        user.email,
        senha 
      );
    
      reauthenticateWithCredential(user, credential).then(() => {
      })

      if (user) {
        updateEmail(user, userData.email)
          .then(() => {
            alert('Email atualizado com sucesso');
          })
          .catch((error) => {
            alert(error.message);
          });
      
      const userDoc = doc(db, "PCD", userId);

      await updateDoc(userDoc, {
        
        name: userData.name,
        email: userData.email,
        trabalho: userData.trabalho,
        descrição: userData.descrição,
        sobre: userData.sobre,
        experiencias: userData.experiencias,
        idade: userData.idade,
        userId: userId,
        deficiencia: userData.deficiencia,
      });

    }
      alert("Conta atualizada com sucesso!");
      navigate(-2);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

  const DeleteProfile = async(id) =>{
    var response = confirm("Deseja Deletar a conta?");

    if(response == true){
    try {
      const auth = getAuth();
const user = auth.currentUser;

deleteUser(user).then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});
      const UserInfo = doc(db, "PCD", id)
      await deleteDoc(UserInfo)
      localStorage.removeItem('userId');
      navigate('/');
    } catch (error) {
      alert("Erro", error)
    }
  }

  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={userData.name}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="trabalho"
          placeholder="Trabalho"
          value={userData.trabalho}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="descrição"
          placeholder="Descrição"
          value={userData.descrição}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="date"
          name="idade"
          placeholder="Idade"
          value={userData.idade}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="sobre"
          placeholder="Sobre"
          value={userData.sobre}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="experiencias"
          placeholder="Experiencias"
          value={userData.experiencias}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="deficiencia"
          placeholder="Deficiencia"
          value={userData.deficiencia}
          onChange={handleInputChange}
        />
      </div>
           <br />
   
      <button type="submit">Adicionar Documento</button>
    </form>
<br/>
<button onClick={() => DeleteProfile(id)}>Deletar conta</button>
<button onClick={PassReset}>Trocar senha</button>
    </>
  );
};

export default EditarPerfil;
