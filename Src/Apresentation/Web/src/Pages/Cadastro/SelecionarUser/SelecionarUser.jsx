import React from 'react';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdExitToApp } from "react-icons/md";
import './Selecionar.css'
import img from '../../../assets/Select.png'
const SelecionarCadastro = () => {

  const navigate = useNavigate()

  const Empresa = () => {
    navigate('/cadastroempresa')
  }

  const PCD = () => {
    navigate('/cadastrouser')
  }

  function voltarincon(e) {
    navigate('/loginu');
  }


  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full lg:w-1/2 flex items-center justify-center '>

          <div className='px-6 py-10 flex flex-col gap-2 rounded-3xl border-4 border-blue-600  items-center justify-center w-full max-w-lg mx-auto overflow-hidden'>
            <div className='w-full justify-end flex items-center'>
              <button onClick={(e) => voltarincon(e)} className='flex h-fit items-center gap-1 iconhover'>
                <p className='font-medium'>Voltar</p>
                <MdExitToApp className='text-4xl  ' />
              </button>
            </div>

            <div className='w-full flex flex-col items-center'>
              <h1 className="font-extrabold text-3xl">Cadastre-se</h1>

              <p className="font-semibold text-wrap mt-2 text-black opacity-80">
                Selecione o tipo de Cadastro
              </p>
            </div>

            <div className='w-full flex flex-col items-center gap-4'>
              <div onClick={PCD} className='h-20 w-80 rounded-3xl shadow-2xl flex 
                items-center justify-center gap-4 bg-white border-gray-400 border-2 cursor-pointer cardhover cadastrooption'>
                <FaUserTie className='text-4xl text-gray-900 text-center ' />
                <h1 className='font-medium text-xl'>Como PCD</h1>
              </div>
              
              <div onClick={Empresa} className='h-20 w-80 rounded-3xl shadow-2xl flex 
                  items-center justify-center gap-4 bg-white border-gray-400 border-2 cursor-pointer cardhover cadastrooption'>
                <FaBuilding className='text-4xl text-gray-900 text-center ' />
                <h1 className='font-medium text-xl'>Como Empresa</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden h-full bg-gray-200'>
          {/*<img src="" className="object-cover" alt="Side Image" />*/}
          <img src={img} className="object-cover h-5/6" alt="Side Image" />
        </div>
      </div >
    </>
  );
};

export default SelecionarCadastro;
