import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios'



const EditarPerfil = () => {

  // Função de navegação do site
  const navigate = useNavigate();
  // Utilizado para pegar o id do usuario e da vaga na tela anterior
  const [userId, setUserId] = useState("");

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
    const getUserProfile = async () => {
      const id = localStorage.getItem("PCD");
      setUserId(id)
      const userDoc = doc(db, "PCD", id);
      const GetUser = await getDoc(userDoc);
      if (GetUser.exists()) {
        setUserProfile(GetUser.data());
      } else {
        setUserProfile(null);
        alert("Sem documentos!");
      }
    };
    getUserProfile();
  }, []);

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

      axios.post('https://localhost:3000/updateprofile/'+decryptedId, {userData})
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("PCD");
      const userDoc = doc(db, "PCD", id);

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


      alert("Conta atualizada com sucesso!");
      navigate(-1);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

  const DeleteProfile = async () => {
    const id = localStorage.getItem("PCD");
    var response = confirm("Deseja Deletar a conta?");

    if (response == true) {
      try {
        
        const UserInfo = doc(db, "PCD", id)
        await deleteDoc(UserInfo)
        navigate(-1);
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
            disabled
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
      <br />
      <button onClick={DeleteProfile()}>Deletar conta</button>
    </>
  );
};


export default EditarPerfil;
