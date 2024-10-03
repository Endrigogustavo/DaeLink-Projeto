import React from 'react';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SelecionarCadastro = () => {
    
const navigate = useNavigate()

const Empresa = () => {
navigate('/cadastroempresa')
}

const PCD = () => {
    navigate('/cadastrouser')
}


  return (
    <div className="p-16 sm:p-16 md:p-24 flex flex-col items-center justify-center">
      {/* Texto de seleção */}
      <h2 className="text-3xl font-bold text-black mb-10">Escolher opção de cadastro</h2>

      <div className="flex flex-wrap items-center justify-center gap-12">
        {/* Card para Empresa */}
        <button onClick={Empresa} className="flex-shrink-0 m-4 sm:m-6 relative overflow-hidden border-2 border-black bg-transparent rounded-lg w-80 sm:w-80 md:w-96 shadow-lg cursor-pointer transition-transform duration-300 hover:border-blue-800 hover:text-blue-800 focus:outline-none">
          <div className="relative pt-16 px-12 flex items-center justify-center">
            {/* Ícone de Empresa */}
            <FaBuilding className="relative w-28 h-28 text-black transition-colors duration-300 hover:text-blue-800" />
          </div>
          <div className="relative text-black px-6 pb-6 mt-6">
            <div className="flex justify-between">
              <span className="block font-semibold text-2xl transition-colors duration-300 hover:text-blue-800">
                Cadastre uma Empresa
              </span>
            </div>
          </div>
        </button>

        {/* Card para PCD */}
        <button onClick={PCD} className="flex-shrink-0 m-4 sm:m-6 relative overflow-hidden border-2 border-black bg-transparent rounded-lg w-80 sm:w-80 md:w-96 shadow-lg cursor-pointer transition-transform duration-300 hover:border-blue-800 hover:text-blue-800 focus:outline-none">
          <div className="relative pt-16 px-12 flex items-center justify-center">
            {/* Ícone de Usuário Normal */}
            <FaUserTie className="relative w-28 h-28 text-black transition-colors duration-300 hover:text-blue-800" />
          </div>
          <div className="relative  text-black px-6 pb-6 mt-6">
            <div className="flex justify-between">
              <span className="block font-semibold text-2xl transition-colors duration-300 hover:text-blue-800">
                Cadastre um PCD
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SelecionarCadastro;
