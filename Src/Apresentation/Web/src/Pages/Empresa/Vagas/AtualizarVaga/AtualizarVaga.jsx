import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db, storage, auth } from "../../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import FormEditarVaga from "./FormAtualizar";
import Navbar from "../../Navbar/Navbar";


const EditarVaga = () => {
  // Função de navegação do site
  const navigate = useNavigate();
  // Utilizado para pegar o id do usuario e da vaga na tela anterior
  const { vagaId } = useParams();
  const [vagaInfoId, setvagaInfoId] = useState(vagaId);

  // Carregar as informações do usuário do banco de dados
  useEffect(() => {
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
  }, [vagaId]);

  return (
    <>
      <Navbar/>
      <FormEditarVaga/>
    
    </>

  )
};

export default EditarVaga;
