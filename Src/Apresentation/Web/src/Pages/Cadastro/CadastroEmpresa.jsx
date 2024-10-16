import './CadastroCss.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmpresaFormRegister from './FormEmpresa';
import img from '../../assets/Empresa.png'

const RegisterEmpresa = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-32 w-32 mb-4"></div>
        </div>

      ) : (
        <div className='flex w-full h-formside h-fit'>
          <div className='w-full formside h-full flex items-center justify-center'>
            <EmpresaFormRegister />
          </div>
          <div className='hidden formside items-center justify-center overflow-hidden h-full bg-gray-200'>
            <img src={img} className="object-cover h-5/6" alt="Side Image" />
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterEmpresa;
