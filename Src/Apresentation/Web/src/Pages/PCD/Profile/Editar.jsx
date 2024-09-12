import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../Database/Firebase"; 
import { useParams, useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { decrypt } from "../../../Security/Cryptography_Rotes";

import axios from 'axios'

const EditarPerfil = () => {
  // Função de navegação do site
  const navigate = useNavigate();
  // Utilizado para pegar o id do usuario e da vaga na tela anterior
  const { id } = useParams();
  const decryptedId = decrypt(decodeURIComponent(id))
  const [userId, setUserId] = useState(decryptedId);

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
    alert(userData.name)
    alert(decryptedId)
    const getUserProfile = async () => {
      const userDoc = doc(db, "PCD", decryptedId);
      const GetUser = await getDoc(userDoc);
      if (GetUser.exists()) {
        setUserProfile(GetUser.data());
      } else {
        setUserProfile(null);
        alert("Sem documentos!");
      }
    };
    getUserProfile();
  }, [decryptedId]);

  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      axios.post('https://localhost:3000/updateprofile/'+decryptedId, {userData})
     .then(res =>{
      alert("Perfil atualizado com sucesso")
     })
     .catch(err =>{
      console.log(err)
      alert("Falha ao criar uma vaga, tente novamente.");
    })
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

  const DeleteProfile = async(id) =>{
    var response = confirm("Deseja Deletar a conta?");

    if(response == true){
    try {
      const UserInfo = doc(db, "PCD", id)
      await deleteDoc(UserInfo)
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
      <button type="submit">Adicionar Documento</button>
    </form>
<br/>
<button onClick={() => DeleteProfile(decryptedId)}>Deletar conta</button>
    </>
  );
};

export default EditarPerfil;
