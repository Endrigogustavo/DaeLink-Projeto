import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db, storage, auth } from "../../../Database/Firebase"; 
import { useParams, useNavigate } from 'react-router-dom';
import { logout } from '../../../Auth/Auth';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const EditarPerfil = () => {
  // Função de navegação do site
  const navigate = useNavigate();
  // Utilizado para pegar o id do usuario e da vaga na tela anterior
 
  const [userId, setUserId] = useState('');

  // Informações do usuario
  const [userData, setUserProfile] = useState({
    cep: '',
    email: '',
    name: '',
    cnpj: '',
    endereco: '',
    sobre: '',
    area: ''
  });

  // Carregar as informações do usuário do banco de dados
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        const userId = storedUserId;
        setUserId(userId)
    }
    const getCompanyProfile = async () => {
      const CompanyDoc = doc(db, "Empresa", userId);
      const GetCompany = await getDoc(CompanyDoc);
      if (GetCompany.exists()) {
        setUserProfile(GetCompany.data());
      } else {
        setUserProfile(null);
        alert("Sem documentos!");
      }
    };
    getCompanyProfile();
  }, [userId]);

  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function LogoutProfile() {
    var response = confirm("Deseja fazer Logout?");
    if (response == true) {
        //Função do Auth.jsx para deslogar
        logout();
        // Redireciona para a página de login após o logout
        navigate('/');
    }

}

  // Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, "Empresa", userId);

      await updateDoc(userDoc, {
        cep: userData.cep,
        email: userData.email,
        name: userData.name,
        cnpj: userData.cnpj,
        endereco: userData.endereco,
        sobre: userData.sobre,
        area: userData.area,
        userId: userId,
      });

      alert("Conta atualizada com sucesso!");
      navigate(-1);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

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
          name="cnpj"
          placeholder="cnpj"
          value={userData.cnpj}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="endereco"
          placeholder="endereco"
          value={userData.endereco}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="sobre"
          placeholder="sobre"
          value={userData.sobre}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="area"
          placeholder="area"
          value={userData.area}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <button type="submit">Adicionar Documento</button>
    </form>
    <br />
    <button onClick={LogoutProfile}>Logout</button>
    </>
  );
};

export default EditarPerfil;
