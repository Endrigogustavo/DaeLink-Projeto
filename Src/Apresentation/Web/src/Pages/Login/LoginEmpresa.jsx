import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginEmpresa } from '../../Auth/Auth';

import ImgEmpresa from '../../Img/LoginEmpresa.png'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = await loginEmpresa(email, password); // Chama sua função de login

      if (userData) {
        console.log("User data:", userData); // Verifique os dados do usuário recebidos
        navigate(`/homeempresa/${userData.uid}`); // Navega para a página usando o UID retornado
      } else {
        alert("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Failed to login. Please check your credentials.");
    }
  };
  return (

    <>
      <div className="bg-white relative lg:py-20">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img src={ImgEmpresa} className="btn-" />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">

              <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10">

                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Login - Empresa</p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Email</p>
                    <input value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="John" type="text" className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
                  </div>
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Senha</p>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" type="password" className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
                  </div>
                  <div className="relative">
                    <button onClick={handleLogin}>
                      <a className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease">Login</a>
                    </button>
                    <br /><br />
                    <p>Não tem uma conta? <Link to="/register">Cadastrar agora</Link></p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default Login;
