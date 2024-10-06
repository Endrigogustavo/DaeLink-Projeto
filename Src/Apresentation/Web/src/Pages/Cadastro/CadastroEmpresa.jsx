import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmpresa } from '../../Auth/Auth';
import { auth } from '../../Database/Firebase'
import { FaCloudUploadAlt } from "react-icons/fa";
import './CadastroCss.css';
import CadastroE from '../../Img/CadastroE.png'
import { getAuth, sendEmailVerification } from 'firebase/auth';

const Register = () => {
  //Variaveis onde as informações serão setadas
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [sobre, setSobre] = useState("");
  const [area, setArea] = useState("");
  //Variavel para fazer gerenciamento de nivel de acesso
  const [tipo] = useState("Empresa");
  //Função de navegação do site
  const navigate = useNavigate();

  const textareaRefs = {
    sobre: useRef(null),
    area: useRef(null),
  };


  const handleClear = () => {
    setProfileImage(null);
    setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    setBackgroundImage(null);
    setEmail("");
    setPassword("");
    setName("");
    setArea("");
    setEndereco("");
    setIdade("");
    setCnpj("");
    setSobre("");
    setTipo("PCD");
  };

  // Borão para fazer Cadastro
  const handleRegister = async () => {
    // Verificar se o formato do e-mail é válido
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("O formato de email é invalido, tente novamente.");
      return;
    }


    //Função do Auth.jsx para fazer login enviando os parametros do form
    const response = await registerEmpresa(email, password, sobre, area, cnpj, endereco, cep, tipo, profileImage, backgroundImage, { name });
    if (response.success) {
      const auth = getAuth
      await sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Email de verificação enviado com sucesso!!!")
        });

      alert("Cadastrado com sucesso");
      navigate(`/homeempresa/${response.uid}`);
    } else {
      alert("Falha ao criar um registro, tente novamente.");
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

  return (
    <div className='w-full flex w-full h-screen  '>
      <div className='hidden lg:flex lg:w-3/6 h-full items-center justify-center'>
        {/*<img src="https://i.postimg.cc/Jzsv83S9/Sem-T-tulo-1.png" className="object-cover" alt="Side Image" /> */}
        <img src={CadastroE} className="object-cover Img-Cadastro" alt="Side Image" />
      </div>
      <div className='w-full  lg:w-3/6 overflow-hidden overflow-y-scroll px-4 lg:px-0 containerresponsiveform '>
        <h1 className='font-bold text-2xl text-center my-4 uppercase'>Cadastro de Empresa</h1>
        <div className='bg-gray-100 my-4 h-max py-4  w-full px-4 grid-responsiveform grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-2 justify-items-center rounded-3xl border-2 border-blue-500 lg:border-none '>

          <div className='flex flex-col items-center gap-4 '>

            <img src={profileImagePreview} className="w-32 h-32 rounded-full border-4 border-gray-500" alt="Preview Perfil" />
            <p className='text-lg font-medium mb-2 text-center'>Foto de Perfil</p>
            <label htmlFor="profile-image-input" className='text-center w-32 border-2 border-gray-500 font-bold py-2 px-4 rounded-full transition-all hover:bg-gray-500 cursor-pointer hover:text-white'>Upload</label>
            <input id="profile-image-input" type="file" className='hidden' accept="image/*" onChange={handleProfileImageChange} />
          </div>

          <div>
            <p className='text-lg font-medium text-center'>Wallpaper de Perfil</p>
            <label htmlFor="background-image-input" className='w-max lg:h-40 border-2 border-blue-500 font-bold py-2 px-4 rounded-xl transition-all hover:bg-blue-500 cursor-pointer hover:text-white flex gap-2 items-center justify-center'>
              <FaCloudUploadAlt size={18} /> Upload Wallpaper
            </label>
            <input id="background-image-input" type="file" className='hidden' accept="image/*" onChange={(e) => setBackgroundImage(e.target.files[0])} />
          </div>

          <div className="flex flex-col ">
            <label className="text-lg font-medium">Nome da empresa</label>
            <input
              type="text"
              className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
              placeholder="Insira seu Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Sobre a empresa</label>
            <textarea
              ref={textareaRefs.sobre}
              className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent respon-w-input "
              placeholder="Fale um pouco sobre você"
              value={sobre}
              onChange={(e) => {
                setSobre(e.target.value);
                adjustTextareaHeight(textareaRefs.sobre);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Área da empresa</label>
            <textarea
              ref={textareaRefs.area}
              className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent respon-w-input "
              placeholder="Nos diga sobre as áreas de trabalho da sua empresa"
              value={area}
              onChange={(e) => {
                setArea(e.target.value);
                adjustTextareaHeight(textareaRefs.area);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Email</label>
            <input
              type="text"
              className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
              placeholder="Insira seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Senha</label>
            <input
              type="password"
              className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
              placeholder="Insira sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">CNPJ</label>
            <input
              type="text"
              className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
              placeholder="Coloque o CNPJ da empresa"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Endereço da empresa</label>
            <textarea
              ref={textareaRefs.endereco}
              className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent respon-w-input "
              placeholder="Fale o endereço da sua empresa"
              value={endereco}
              onChange={(e) => {
                setEndereco(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium">CEP</label>
            <textarea
              ref={textareaRefs.cep}
              className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent respon-w-input "
              placeholder="Nos diga um pouco do seu trabalho"
              value={cep}
              onChange={(e) => {
                setCep(e.target.value);
              }}
            />
          </div>

          <div className='w-full px-19 flex justify-center items-center gap-5'>
            <button onClick={handleRegister} className="w-32 h-12 bg-blue-500 hover:bg-blue-700 transition-all text-white py-2 px-4 rounded-full">Cadastrar</button>
            <button onClick={handleClear} className="w-32 h-12 bg-gray-500  hover:bg-gray-700 transition-al text-white py-2 px-4 rounded-full">Limpar</button>
          </div>

        </div>
      </div>



    </div>
  );
};

export default Register;
