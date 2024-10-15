import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../../Database/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PessoasList from './PessoasList';
import Navbar from '../../Navbar/Navbar';

function VisualizarPessoas() {
  // Função de navegação do site
  const navigate = useNavigate();
  // Pegar o id do usuario na tela anterior
  const { vagaId } = useParams();
  // Variáveis para setar dados do banco
  const [candidatos, setCandidatos] = useState([]);
  const [user, setUser] = useState(null); // Definindo o estado para o usuário autenticado

  useEffect(() => {
    // Pega os dados com base no perfil de empresa logado utilizando o auth do Firebase
    const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => AuthProfile();
  }, []);

  return (
    <>
      <Navbar />
      <PessoasList />
    </>
  );
};

export default VisualizarPessoas;
