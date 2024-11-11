import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../Database/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, addDoc, query, where } from 'firebase/firestore';

import Navbar from '../../Navbar/Navbar'
import AdicionarList from './AdicionarList';
import {
  FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";

const AddPessoa = () => {
  ///Função de navegação do site
  const navigate = useNavigate()
  //Pegar o id do usuario na tela anterior

  //Variaveis para setar dados do banco
  const [id, setId] = useState("")
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [vagas, setVagas] = useState([]);
  const [situação, setSituação] = useState("Pendente");


  //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    //Pega os dados com base no perfil de empresa logado utilizando o auth do Firebase
    const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => AuthProfile();
  }, []);

  useEffect(() => {
    //Informações do usuario
    const getPCDProfile = async () => {
      try {
        const id = localStorage.getItem("Candidato")
        const PCDdoc = doc(db, "PCD", id);
        const GetPCDresult = await getDoc(PCDdoc);

        if (GetPCDresult.exists()) {
          setUserInfo(GetPCDresult.data());
        } else {
          console.log('Nenhum documento encontrado com o ID:', id);
          setUserInfo(null);

        }
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
        setUserInfo(null);

      }
    };
    getPCDProfile();
  }, []);

  //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    const GetVagas = async () => {
      //utilizando o user como parametro de tratamento
      if (user) {
        try {
          //Caminho dos dados da tabela PCD do banco
          const VagasCollection = collection(db, 'Vagas');
          //Utilizando o query e o where para pegar as informações de uma empresa especifica
          const QueryVagas = query(VagasCollection, where('empresaId', '==', user.uid));
          //Pegando dados com o tratamento
          const GetVagasResult = await getDocs(QueryVagas);

          //utilizando de uma função map para listar as informações
          const vagasList = GetVagasResult.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          //Setando os dados em uma variavel
          setVagas(vagasList);
        } catch (error) {
          console.error('Error fetching vagas:', error);
        }
      }
    };

    GetVagas();
  }, [user]);



  return (
    <>
      <Navbar />

      <div className='w-full h-36 flex items-center justify-center'>
        <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gradient-to-br from-gray-900 to-gray-800  border-2 items-center justify-center px-5'>
          <h1 className='font-bold text-2xl text-white text-center'>Adicionar a Vaga </h1>
        </div>
      </div>
      <AdicionarList />

      <div className="w-full bg-gray-900 h-16 ">
        <div className="flex w-full h-full items-center justify-center gap-4">
          <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  cardhover" /></Link>
          <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 cardhover" /></Link>
          <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 cardhover" /></Link>
        </div>
      </div>

    </>
  );
};

export default AddPessoa;