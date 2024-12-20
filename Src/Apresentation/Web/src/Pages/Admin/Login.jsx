import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../../Database/Firebase'
import axios from 'axios';

import ImgEmpresa from '../../Img/LoginE.png'
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Modal from './Modal';

const LoginEmpresa = () => {
  //Variaveis onde as informações serão setadas
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Função de navegação do site
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);

  // Borão para fazer Login
  const handleLogin = async () => {
    try {
      //Função do Auth.jsx para fazer o Login de empresa
      const PCDCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = PCDCredential.user.uid;
      
      {/*
        await updateProfile(PCDCredential.user, {
        displayName: "Adm",
      });
      */}
      const PCDDocRef = doc(db, "Admin", uid);
      const GetPCDDoc = await getDoc(PCDDocRef);

      if (GetPCDDoc.exists()) {
        setWorksModal(true)
        setModalMessage("Autenticado com sucesso")
        setModalOpen(true)
        setTimeout(() => {
          axios.post('http://localhost:3000/cookie', { uid }, {
            withCredentials: true
          });
          const id = uid;
          localStorage.setItem('userId', id);
          navigate(`/adm`);
        }, 2200);

      } else {
        setWorksModal(false)
        setModalMessage("Não foi possível fazer login.")
        setModalOpen(true)
        setTimeout(() => {
          setModalOpen(false)
        }, 2200);
      }
    } catch (error) {
      setWorksModal(false)
      setModalMessage("Não foi possível fazer login.")
      setModalOpen(true)
      setTimeout(() => {
        setModalOpen(false)
      }, 2200);
    }
  };


  return (
    <>
      <div>
        <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
      </div>
      <div className='flex w-full h-screen'>
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
          <div className="px-6 py-10 rounded-3xl border-4 border-blue-600 w-full max-w-lg mx-auto">
            <h1 className="font-extrabold text-3xl">Bem Vindo!</h1>
            <p className="font-semibold text-wrap mt-2 text-black opacity-80">
              Preencha os campos de acordo com as informações:
            </p>
            <div className="mt-8">
              <div className="flex flex-col">
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                  placeholder="Insira seu Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Senha</label>
                <input
                  type="password"
                  className="w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                  placeholder="Insira sua Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-center mt-8">
              <button
                onClick={handleLogin}
                className="w-32 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden'>
          {/*<img src="https://i.postimg.cc/Jzsv83S9/Sem-T-tulo-1.png" className="object-cover" alt="Side Image" />*/}
          <img src={ImgEmpresa} className="object-cover h-full" alt="Side Image" />
        </div>
      </div>
    </>
  );
};

export default LoginEmpresa;

