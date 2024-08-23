import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../../../Database/Firebase"; 
import { useParams, useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { decrypt } from "../../../Secutity/Cryptography_Rotes";

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
      const PCDdoc = doc(db, "PCD", userId);

      await updateDoc(PCDdoc, {
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
      navigate(`/userprofile/${userId}`);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

  return (
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
  );
};

export default EditarPerfil;
