import React from 'react';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Selecionar.css'

const SelecionarCadastro = () => {

  const navigate = useNavigate()

  const Empresa = () => {
    navigate('/cadastroempresa')
  }

  const PCD = () => {
    navigate('/cadastrouser')
  }


  return (
    <>
      <div className='h-screen w-full flex flex-col items-center justify-center gap-2 overflow-hidden'>
        <div className='w-90 h-20 rounded-3xl shadow-2xl flex bg-gray-900 border-2 items-center justify-center px-6'>
          <h1 className='font-bold text-2xl text-white'>Cadastre-se</h1>
        </div>

        <div className='h-4/6 w-full flex items-center justify-center gap-20'>
          <div onClick={PCD}
            className='h-96 w-80 gap-2 rounded-3xl shadow-2xl flex flex-col items-center justify-center 
            bg-white border-gray-500 border-2 cursor-pointer selecthover'>
            <FaUserTie className='text-9xl text-gray-900 text-center bg-white p-4 rounded-full border-gray-500 border-2' />
            <h1 className='font-medium text-xl'>Cadastre-se como PCD</h1>
          </div>
          <div onClick={Empresa}
            className='h-96 w-80 gap-2 rounded-3xl shadow-2xl flex flex-col items-center justify-center 
            bg-white border-gray-500 border-2 cursor-pointer selecthover '>
            <FaBuilding className='text-9xl text-gray-900 text-center bg-white p-4 rounded-full border-gray-500 border-2' />
            <h1 className='font-medium text-xl'>Cadastre-se como Empresa</h1>
          </div>
        </div>

      </div>
    </>
  );
};

export default SelecionarCadastro;
