import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';



const EditarVaga = () => {
  // Função de navegação do site
  const navigate = useNavigate();
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
    const vagaId = localStorage.getItem("Vaga");
    const getCompanyProfile = async () => {
      const CompanyDoc = doc(db, "Vagas", vagaId);
      const GetCompany = await getDoc(CompanyDoc);
      if (GetCompany.exists()) {
        setUserProfile(GetCompany.data());
      } else {
        setUserProfile(null);
        alert("Sem documentos!");
      }
    };
    getCompanyProfile();
  }, []);


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
      const vagaId = localStorage.getItem("Vaga");
      const userDoc = doc(db, "Vagas", vagaId);

      await updateDoc(userDoc, {
        area: userData.area,
        detalhes: userData.detalhes,
        empresa: userData.empresa,
        exigencias: userData.exigencias,
        local: userData.local,
        salario: userData.salario,
        tipo: userData.tipo,
        vaga: userData.vaga,
      });

      alert("Vaga atualizada com sucesso!");
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
            name="area"
            placeholder="area"
            value={userData.area}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            name="detalhes"
            placeholder="detalhes"
            value={userData.detalhes}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            name="empresa"
            placeholder="empresa"
            value={userData.empresa}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            name="exigencias"
            placeholder="exigencias"
            value={userData.exigencias}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            name="local"
            placeholder="local"
            value={userData.local}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            name="salario"
            placeholder="salario"
            value={userData.salario}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            name="tipo"
            placeholder="tipo"
            value={userData.tipo}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            name="vaga"
            placeholder="vaga"
            value={userData.vaga}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <button type="submit">Adicionar Documento</button>
      </form>
      <br />
    </>
  );
};

export default EditarVaga;
