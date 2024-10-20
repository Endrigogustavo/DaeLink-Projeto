import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import VagaForm from './VagaForm';
import Navbar from '../../Navbar/Navbar';

import axios from 'axios'
const RegisterVaga = () => {
  //Pegar o id do usuario na tela anterior
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState("");
  const [empresaId] = useState(userId);

  

  //Função de navegação do site
  const navigate = useNavigate();

  //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    const getCompanyProfile = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
          const userId = storedUserId;
          setUserId(userId)
      }
  
      //Caminho dos dados da tabela Empresa do banco com base no ID
      const CompanyDoc = doc(db, "Empresa", userId);
      //Pegando dados tratados
      const GetCompanyDoc = await getDoc(CompanyDoc);
      //Tratamento e setando as variaveis
      if (GetCompanyDoc.exists()) {
        const CompanyData = { id: GetCompanyDoc.id, ...GetCompanyDoc.data() };
        setUserProfile(CompanyData);
      } else {
        setUserProfile(null);
      }
    };
    //Iniciando a função
    getCompanyProfile();
  }, [userId]);

  
  
  return (
      <>  
        <Navbar/>
        <VagaForm/>
      
      </>
  );
};

export default RegisterVaga;
