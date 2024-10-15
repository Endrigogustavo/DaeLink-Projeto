import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmpresa } from '../../Auth/Auth';
import { auth } from '../../Database/Firebase'
import { FaClipboardList, FaCloudUploadAlt, FaIdCard, FaUser } from "react-icons/fa";
import './CadastroCss.css';
import CadastroE from '../../Img/CadastroE.png'
import { getAuth, sendEmailVerification } from 'firebase/auth';
import InputMask from 'react-input-mask';
import axios from 'axios';


const Register = () => {
  //Variaveis onde as informações serão setadas
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [sobre, setSobre] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [CNPJError, setCNPJErro] = useState('')

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
    setTipo("Empresa");
  };

  // Borão para fazer Cadastro
  const handleRegister = async () => {
    // Verificar se o formato do e-mail é válido
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("O formato de email é invalido, tente novamente.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("O formato de email é inválido, tente novamente.");
      return;
    }

    setLoading(true);

    //Função do Auth.jsx para fazer login enviando os parametros do form
    const response = await registerEmpresa(email, password, sobre, area, cnpj, endereco, cep, tipo, profileImage, backgroundImage, { name });
    if (response.success) {
      const auth = getAuth();
      const user = auth.currentUser; // Certifique-se de obter o 'user' da autenticação
      const id = user.uid; // Pegue o UID do usuário autenticado
      localStorage.setItem('userId', id);

      await sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Email de verificação enviado com sucesso!!!")
        });

      alert("Cadastrado com sucesso");
      setLoading(false);
      navigate(`/homeempresa/`);
    } else {
      alert("Falha ao criar um registro, tente novamente.");
      setLoading(false);
    }
  };

  const adjustTextareaHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };


  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    let isValid = true;

    // Validação para a etapa 1
    if (step === 1) {
      if (!name || !email || !password) {
        alert("Por favor, preencha todos os campos da Etapa 1.");
        isValid = false;
      }
    }

    // Validação para a etapa 2
    if (step === 2) {
      if (!cep || !cnpj || !endereco) {
        alert("Por favor, preencha todos os campos da Etapa 2.");
        isValid = false;
      } 
      
    }

    // Se todas as validações forem bem-sucedidas, avançar para o próximo passo
    if (isValid) {
      setStep(step + 1);
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

  const progressPercentage = (step / 3) * 100; // Calcular a porcentagem de progresso
  const validateCNPJ = (cnpj) => {
    // Remove caracteres especiais
    cnpj = cnpj.replace(/[^\d]+/g, '');
    console.log("CNPJ sem caracteres especiais:", cnpj); // Debug

    // CNPJ deve ter 14 dígitos
    if (cnpj.length !== 14) {
        console.log("CNPJ inválido: deve ter 14 dígitos."); // Debug
        return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 11111111111111)
    if (/^(\d)\1+$/.test(cnpj)) {
        console.log("CNPJ inválido: todos os dígitos são iguais."); // Debug
        return false;
    }

    // Cálculo do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj[i]) * (5 - (i % 8));
    }
    let firstVerifier = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    console.log("Primeiro dígito verificador calculado:", firstVerifier); // Debug

    if (firstVerifier !== parseInt(cnpj[12])) {
        console.log("CNPJ inválido: primeiro dígito verificador não corresponde."); // Debug
        return false;
    }

    // Cálculo do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj[i]) * (6 - (i % 8));
    }
    let secondVerifier = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    console.log("Segundo dígito verificador calculado:", secondVerifier); // Debug

    if (secondVerifier !== parseInt(cnpj[13])) {
        console.log("CNPJ inválido: segundo dígito verificador não corresponde."); // Debug
        return false;
    }

    return true; 
};


  const handleCNPJChange = (e) => {
    const value = e.target.value;
    setCnpj(value);
    if (validateCNPJ(value)) {
      setCNPJErro('');
    } else {
      setCNPJErro('CNPJ inválido');
    }
  };

  return (
    <>
    {loading ? (
      <div className="flex justify-center items-center min-h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-32 w-32 mb-4"></div>
    </div>
  
    ) : (
      <div className="relative py-10 bg-gradient-to-br from-sky-50 to-gray-200 w-full">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto lg:w-8/12 xl:w-7/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" loading="lazy" className="w-40" alt="tailus logo" />
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Cadastro de empresa</h2>
              </div>
              <div className="mt-16 grid space-y-4">

                {/* Barra de Progresso */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                {/* Ícones das Etapas */}
                <div className="flex justify-between mb-4 w-full">
                  <div className="flex flex-col items-center">
                    <FaUser size={30} className={`${step === 1 ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`${step === 1 ? 'text-blue-500' : 'text-gray-400'}`}>Informações </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaIdCard size={30} className={`${step === 2 ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`${step === 2 ? 'text-blue-500' : 'text-gray-400'}`}>Documentos</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaClipboardList size={30} className={`${step === 3 ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`${step === 3 ? 'text-blue-500' : 'text-gray-400'}`}>Sobre</span>
                  </div>
                </div>

                <div className=' flex flex-col items-center'>

                  {/* Etapa 1: Informações Pessoais */}
                  {step === 1 && (
                    <>


                      <img src={profileImagePreview} className="w-32 h-32 rounded-full border-4 border-gray-500" alt="Preview Perfil" />
                      <p className='text-lg font-medium mb-2 text-center'>Foto de Perfil</p>
                      <label htmlFor="profile-image-input" className='text-center w-32 border-1 border-gray-500 font-bold py-2 px-4 rounded-full transition-all hover:bg-gray-500 cursor-pointer hover:text-white'>Upload</label>
                      <input required id="profile-image-input" type="file" className='hidden' accept="image/*" onChange={handleProfileImageChange} />

                      <br />

                      <div>
                        <p className='text-lg font-medium text-center'>Wallpaper de Perfil</p>
                        <label htmlFor="background-image-input" className='w-max lg:h-40 border-2 border-blue-500 font-bold py-2 px-4 rounded-xl transition-all hover:bg-blue-500 cursor-pointer hover:text-white flex gap-2 items-center justify-center'>
                          <FaCloudUploadAlt size={18} /> Upload Wallpaper
                        </label>
                        <input required id="background-image-input" type="file" className='hidden' accept="image/*" onChange={(e) => setBackgroundImage(e.target.files[0])} />
                      </div>
                      <br />
                      <div className="flex flex-col w-full items-center">
                        <label className="text-lg font-medium">Nome</label>
                        <input required type="text" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Insira seu Nome da empresa" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <br />
                      <div className="flex flex-col w-full items-center">
                        <label className="text-lg font-medium">Email</label>
                        <input required type="text" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Insira seu Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <br />
                      <div className="flex flex-col w-full items-center">
                        <label className="text-lg font-medium">Senha</label>
                        <input required type="password" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Insira sua Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <br />
                      <div className="flex flex-col w-full items-center">
                        <label className="text-lg font-medium">Confirmar senha</label>
                        <input required type="password" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Insira sua Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      </div>
                    </>
                  )}

                  {/* Etapa 2: Detalhes */}
                  {step === 2 && (
                    <>
                  
                      <div className="flex flex-col w-full items-center">
                        <br />
                        <label className="text-lg font-medium">CNPJ</label>
                        <InputMask
                          required
                          mask="99.999.999/9999-99"
                          value={cnpj}
                          onChange={handleCNPJChange}
                          className={`w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent ${CNPJError ? 'border-red-500' : ''}`}
                          placeholder="Digite seu CNPJ"
                        />
                        {CNPJError && <span className="text-red-500 text-sm">{CNPJError}</span>}
                      </div>
                      <br />
                      <div className="flex flex-col w-full items-center">
                        <label className="text-lg font-medium">CEP</label>
                          <InputMask
                          required
                          mask="99999-999"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          className={`w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent ${CNPJError ? 'border-red-500' : ''}`}
                          placeholder="Digite seu CEP"
                        />
                        </div>
                      <br />
                      <div className="flex flex-col w-full items-center">
                        <label className="text-lg font-medium">Endereço</label>
                        <textarea required className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Descreva o endereço da empresa" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                      </div>
                      <br />
                    </>
                  )}

                  {/* Etapa 3: Laudo Médico */}
                  {step === 3 && (
                    <>
                        <div className="flex flex-col w-full items-center">
                        <label className="text-lg font-medium">Area da empresa</label>
                        <input required type="text" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Fale sobre a area da sua empresa" value={area} onChange={(e) => setArea(e.target.value)} />
                      </div>
                      <br />
                     <div className="flex flex-col w-full items-center">
                        <label className="text-lg font-medium">Sobre a empresa</label>
                        <input required type="text" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Fale sobre a empresa" value={sobre} onChange={(e) => setSobre(e.target.value)} />
                      </div>
                      <br />
                    </>
                  )}

                  <br /><br />

                  {/* Botões de Navegação */}
                  <div className="mt-6 flex justify-between w-full">
                    {step > 1 && (
                      <button onClick={handlePrevious} className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full hover:bg-gray-400 transition-colors">Voltar</button>
                    )}
                    {step < 3 ? (
                      <button onClick={handleNext} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors">Próximo</button>
                    ) : (
                      <button onClick={handleRegister} disabled={loading} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-colors">Cadastrar</button>
                    )}
                  </div>
                  <br />
                  <button onClick={handleClear} className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-colors">Limpar Campos</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  </>
  );
};

export default Register;
