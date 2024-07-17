import './CadastroCss.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../Auth/Auth';
import { FaCloudUploadAlt } from "react-icons/fa";

const Register = () => {
  //Variaveis onde as informações serão setadas
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [trabalho, setTrabalho] = useState("");
  const [descrição, setDescrição] = useState("");
  const [idade, setIdade] = useState("");
  const [sobre, setSobre] = useState("");
  const [experiencias, setExperiencia] = useState("");
  const [deficiencia, setDeficiencia] = useState("");
  //Variavel para fazer gerenciamento de nivel de acesso
  const [tipo, setTipo] = useState("PCD");
  //Função de navegação do site
  const navigate = useNavigate();

  const textareaRefs = {
    sobre: useRef(null),
    experiencias: useRef(null),
    trabalho: useRef(null),
    descrição: useRef(null),
  };

  // Borão para fazer Cadastro

  const handleRegister = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("O formato de email é invalido, tente novamente.");
      return;
    }

    //Função do Auth.jsx para fazer login enviando os parametros do form

    const response = await registerUser(email, password, idade, deficiencia, descrição, trabalho, profileImage, backgroundImage, sobre, experiencias, tipo, {});
    if (response.success) {
      //Sucesso
      alert("Cadastrado com sucesso");
      navigate(`/homeuser/${response.uid}`);
    } else {
      //Erro
      alert("Falha ao cadastrar, tente novamente.");
    }
  };

  const adjustTextareaHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    Object.values(textareaRefs).forEach(adjustTextareaHeight);
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    }
  };

  const handleClear = () => {
    setProfileImage(null);
    setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    setBackgroundImage(null);
    setEmail("");
    setPassword("");
    setName("");
    setTrabalho("");
    setDescrição("");
    setIdade("");
    setSobre("");
    setExperiencia("");
    setDeficiencia("");
    setTipo("PCD");
  };

  return (
    <>
      <header className='w-full h-20  bg-gray-200 flex items-center px-20 border-b-2 border-gray-300 '>
        <Link to="/"><img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className='w-40' alt="" /></Link>
      </header>
      <div className='bg-gray-100 my-4 h-max py-4 px-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center rounded-3xl border-2 border-blue-800 lg:border-none '>

        <div className='flex flex-col items-center gap-4'>
          <h1 className='font-medium text-2xl text-center'>Insira seus dados para cadastrar:</h1>
          <img src={profileImagePreview} className="w-32 h-32 rounded-full border-4 border-gray-500" alt="Preview Perfil" />
          <p className='text-lg font-medium mb-2 text-center'>Foto de Perfil</p>
          <label htmlFor="profile-image-input" className='text-center w-32 border-2 border-gray-500 font-bold py-2 px-4 rounded-full transition-all hover:bg-gray-500 cursor-pointer hover:text-white'>Upload</label>
          <input id="profile-image-input" type="file" className='hidden' accept="image/*" onChange={handleProfileImageChange} />
        </div>

        <div>
          <p className='text-lg font-medium text-center'>Wallpaper de Perfil</p>
          <label htmlFor="background-image-input" className='w-max lg:h-40 border-2 border-gray-500 font-bold py-2 px-4 rounded-xl transition-all hover:bg-gray-500 cursor-pointer hover:text-white flex gap-2 items-center justify-center'>
            <FaCloudUploadAlt size={18} /> Upload Wallpaper
          </label>
          <input id="background-image-input" type="file" className='hidden' accept="image/*" onChange={(e) => setBackgroundImage(e.target.files[0])} />
        </div>

        <div className="flex flex-col px-4">
          <label className="text-lg font-medium">Nome</label>
          <input
            type="text"
            className="w-96 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Insira seu Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium">Sobre Você</label>
          <textarea
            ref={textareaRefs.sobre}
            className="w-96 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Fale um pouco sobre você"
            value={sobre}
            onChange={(e) => {
              setSobre(e.target.value);
              adjustTextareaHeight(textareaRefs.sobre);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium">Experiências</label>
          <textarea
            ref={textareaRefs.experiencias}
            className="w-96 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Nos diga algumas de suas experiências"
            value={experiencias}
            onChange={(e) => {
              setExperiencia(e.target.value);
              adjustTextareaHeight(textareaRefs.experiencias);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium">Email</label>
          <input
            type="text"
            className="w-96 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Insira seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium">Senha</label>
          <input
            type="password"
            className="w-96 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Insira sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium">Idade</label>
          <input
            type="date"
            className="w-96 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Coloque sua idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium">Area de atuação</label>
          <textarea
            ref={textareaRefs.trabalho}
            className="w-96 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Fale sobre sua área de atuação"
            value={trabalho}
            onChange={(e) => {
              setTrabalho(e.target.value);
              adjustTextareaHeight(textareaRefs.trabalho);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium">Descrição do trabalho</label>
          <textarea
            ref={textareaRefs.descrição}
            className="w-96 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Nos diga um pouco do seu trabalho"
            value={descrição}
            onChange={(e) => {
              setDescrição(e.target.value);
              adjustTextareaHeight(textareaRefs.descrição);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium">Deficiência</label>
          <input
            type="text"
            className="w-96 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Fale sua deficiência"
            value={deficiencia}
            onChange={(e) => setDeficiencia(e.target.value)}
          />
        </div>


        <div className='w-full px-20 flex justify-center mt-4 gap-8'>
          <button onClick={handleRegister} className="w-32 h-12 bg-blue-500  text-white py-2 px-4 rounded-full">Cadastrar</button>
          <button onClick={handleClear} className="w-32 h-12 bg-gray-400 text-white py-2 px-4 rounded-full">Limpar</button>
        </div>

      </div>
    </>
  );
}

export default Register;
