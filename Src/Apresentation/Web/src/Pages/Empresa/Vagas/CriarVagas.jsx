import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { registerVaga } from '../../../Auth/Auth';

import axios from 'axios'
const RegisterVaga = () => {
  //Pegar o id do usuario na tela anterior

  //Variaveis para enviar os dados para o banco
  const [vaga, setVaga] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [salario, setSalario] = useState("");
  const [exigencias, setExigencias] = useState("");
  const [area, setArea] = useState("");
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState("");
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
        alert("Tente novamente!");
      }
    };
    //Iniciando a função
    getCompanyProfile();
  }, [userId]);

  useEffect(() => {
    if (userProfile) {
        setEmpresa(userProfile.name || '');
        setLocal(userProfile.endereco || '');
    }
}, [userProfile]);
  
  //Botão de registrar vaga
  const handleRegister = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    //Função registrar vaga que esta no Auth.jsx enviando parametros do form

    axios.post('http://localhost:3000/criarvaga/' + userId, { tipo, empresa, detalhes, salario, exigencias, area, local, vaga, empresaId })
      .then(res => {
        alert("Vaga criada com sucesso")
        navigate(`/homeempresa/`);
      })
      .catch(err => {
        console.log(err)
        alert("Falha ao criar uma vaga, tente novamente.");
      })
  };

  return (
    <div >
      <section id="team" className="section relative pt-20 pb-8 md:pt-16 bg-white dark:bg-gray-800">
        <div className="container xl:max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <header className="text-center mx-auto mb-12">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
              <span className="font-light">Criar</span> Vaga
            </h2>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 60" style={{ margin: '0 auto', height: '35px' }}>
              <circle cx="50.1" cy="30.4" r="5" className="stroke-primary" style={{ fill: 'transparent', strokeWidth: '2', strokeMiterlimit: '10' }} />
              <line x1="55.1" y1="30.4" x2="100" y2="30.4" className="stroke-primary" style={{ strokeWidth: '2', strokeMiterlimit: '10' }} />
              <line x1="45.1" y1="30.4" x2="0" y2="30.4" className="stroke-primary" style={{ strokeWidth: '2', strokeMiterlimit: '10' }} />
            </svg>
          </header>
          {/* End Section Header */}

          {/* Team Row */}
          <div className="flex flex-wrap flex-row -mx-4 justify-center">
            {/* Team Member 1 */}
            <div className="flex-shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6">
              <div className="relative overflow-hidden bg-white dark:bg-gray-800 mb-12 hover-grayscale-0">
                <div className="relative overflow-hidden px-6">
                  <img src="https://tailone.tailwindtemplate.net/src/img/dummy/avatar1.png" className="max-w-full h-auto mx-auto rounded-full bg-gray-50 grayscale" alt="Joe Antonio" />
                </div>
                <div className="pt-6 text-center">
                  <p className="text-lg leading-normal font-bold mb-1">Joe Antonio</p>
                  <p className="text-gray-500 leading-relaxed font-light">Founder CEO</p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="flex-shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6">
              <div className="relative overflow-hidden bg-white dark:bg-gray-800 mb-12 hover-grayscale-0">
                <div className="relative overflow-hidden px-6">
                  <img src="https://tailone.tailwindtemplate.net/src/img/dummy/avatar3.png" className="max-w-full h-auto mx-auto rounded-full bg-gray-50 grayscale" alt="Sarah Daeva" />
                </div>
                <div className="pt-6 text-center">
                  <p className="text-lg leading-normal font-bold mb-1">Sarah Daeva</p>
                  <p className="text-gray-500 leading-relaxed font-light">Marketing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<div className="h-fit w-full grid grid-cols-2 gap-y-2 items-center justify-items-center py-8">

      <div className="flex flex-col">
        <label className="text-lg font-medium">Titulo da vaga</label>
        <textarea

          className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent"
          placeholder="Fale brevemente sobre a vaga"
          value={vaga}
          onChange={(e) => {
            setVaga(e.target.value);
          }}
        />
      </div>

      
      <div className="flex flex-col">
        <label className="text-lg font-medium">Detalhes</label>
        <textarea

          className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent"
          placeholder="Fale sobre a descrição da vaga"
          value={detalhes}
          onChange={(e) => {
            setDetalhes(e.target.value);
          }}
        />
      </div>
      <input
        type="text"
        placeholder="Detalhes da vaga"
        value={detalhes}
        onChange={(e) => setDetalhes(e.target.value)}
      />
      <input
        type="text"
        placeholder="Area especifica"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome da empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salario"
        value={salario}
        onChange={(e) => setSalario(e.target.value)}
      />
      <input
        type="text"
        placeholder="Presencial ou online?"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Local da empresa"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />
      <input
        type="textarea"
        placeholder="Qual as certificaçoes nescessarias?"
        value={exigencias}
        onChange={(e) => setExigencias(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default RegisterVaga;
