import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginEmpresa } from '../../Auth/Auth';

import ImgEmpresa from '../../Img/LoginUser.png'

const LoginEmpresa = () => {
  //Variaveis onde as informações serão setadas
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Função de navegação do site
  const navigate = useNavigate();

  // Borão para fazer Login
  const handleLogin = async () => {
    try {
      //Função do Auth.jsx para fazer o Login de empresa
      const userData = await loginEmpresa(email, password);
      //Tratamento dos dados
      if (userData) {
        //Sucesso
        console.log("User data:", userData);
        navigate(`/homeempresa/${userData.uid}`);
      } else {
        alert("Erro ao fazer Login, tente novamente!");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Erro ao fazer Login, tente novamente mais tarde!");
    }
  };


  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <div className="px-6 py-10 rounded-3xl border-2 border-blue-800 w-full max-w-lg mx-auto">
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
                <div className="w-full mt-4 text-center">
                    <p className="mb-2">
                        Não possui conta? <Link to="/cadastroempresa" className="text-blue-700">Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
        <div className='hidden lg:flex lg:w-1/2 items-center justify-center'>
          {/*<img src="https://i.postimg.cc/Jzsv83S9/Sem-T-tulo-1.png" className="object-cover" alt="Side Image" />*/}
          <img src={ImgEmpresa} className="object-cover" alt="Side Image" />
        </div>
      </div>
    </>
  );
};

export default LoginEmpresa;

