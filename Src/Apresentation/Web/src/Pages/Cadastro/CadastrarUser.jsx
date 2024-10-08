import './CadastroCss.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Auth/Auth';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { FaCloudUploadAlt, FaUser, FaIdCard, FaClipboardList } from 'react-icons/fa';
import InputMask from 'react-input-mask';

import CadastroU from '../../Img/CadastroU.png';

const Register = () => {
  const [step, setStep] = useState(1);
  const [laudomedico, setLaudoMedico] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [trabalho, setTrabalho] = useState("");
  const [descricao, setDescricao] = useState("");
  const [idade, setIdade] = useState("");
  const [sobre, setSobre] = useState("");
  const [CPF, setCPF] = useState("");
  const [cpfError, setCpfError] = useState('');
  const [experiencias, setExperiencia] = useState("");
  const [deficiencia, setDeficiencia] = useState("");
  const [tipo, setTipo] = useState("PCD");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validações
    
    if (!isChecked) {
      alert("Você deve aceitar os termos de uso.");
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
    const response = await registerUser(name, email, password, idade, deficiencia, descricao, trabalho, profileImage, backgroundImage, sobre, experiencias, tipo, laudomedico, CPF, {});
    
    try {
      if (response.success) {
        const auth = getAuth();
        const user = auth.currentUser; // Certifique-se de obter o 'user' da autenticação
        const id = user.uid; // Pegue o UID do usuário autenticado
        localStorage.setItem('userId', id);
        
        await sendEmailVerification(auth.currentUser)
          .then(() => {
            alert("Email de verificação enviado com sucesso!!!");
          });
        
        alert("Cadastrado com sucesso");
        navigate(`/homeuser/`);
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false); // Desativar o loading
    }
    
  }

  const handleNext = () => {
    let isValid = true;

    // Validação para a etapa 1
    if (step === 1) {
      if (!name || !email || !password) {
        alert("Por favor, preencha todos os campos da Etapa 1.");
        isValid = false;
      }
    }

    const validateDate = (dateString) => {
      const today = new Date();
      const selectedDate = new Date(dateString);

      // Verifica se a data é válida e não está no futuro
      return selectedDate <= today && !isNaN(selectedDate);
    };

    // Validação para a etapa 2
    if (step === 2) {
      if (!idade || !trabalho || !descricao || !experiencias) {
        alert("Por favor, preencha todos os campos da Etapa 2.");
        isValid = false;
      } else if (!validateDate(idade)) {
        alert("Data de nascimento inválida. Por favor, escolha uma data válida.");
        isValid = false;
      }
    }

    // Se todas as validações forem bem-sucedidas, avançar para o próximo passo
    if (isValid) {
      setStep(step + 1);
    }
  };

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

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleClear = () => {
    setProfileImage(null);
    setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    setBackgroundImage(null);
    setEmail("");
    setPassword("");
    setName("");
    setTrabalho("");
    setDescricao("");
    setIdade("");
    setSobre("");
    setExperiencia("");
    setDeficiencia("");
    setTipo("PCD");
    setStep(1); // Reiniciar para o primeiro passo
  };

  const validateCPF = (value) => {
    const cleanCPF = value.replace(/\D/g, '');
    if (cleanCPF.length !== 11) {
      return false;
    }

    let sum = 0;
    let remainder;

    if (cleanCPF === "00000000000") return false;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanCPF.charAt(9))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanCPF.charAt(10))) {
      return false;
    }

    return true;
  };

  const handleCpfChange = (e) => {
    const value = e.target.value;
    setCPF(value);
    if (validateCPF(value)) {
      setCpfError('');
    } else {
      setCpfError('CPF inválido');
    }
  };


  const progressPercentage = (step / 3) * 100; // Calcular a porcentagem de progresso

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
                  <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Cadastro de usuario</h2>
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
                      <span className={`${step === 2 ? 'text-blue-500' : 'text-gray-400'}`}>Detalhes</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaClipboardList size={30} className={`${step === 3 ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span className={`${step === 3 ? 'text-blue-500' : 'text-gray-400'}`}>Laudo Médico</span>
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
                          <input required type="text" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Insira seu Nome Completo" value={name} onChange={(e) => setName(e.target.value)} />
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
                          <label className="text-lg font-medium">Idade</label>
                          <input required type="date" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Insira sua Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
                        </div>
                        <div className="flex flex-col w-full items-center">
                          <br />
                          <label className="text-lg font-medium">CPF</label>
                          <InputMask
                            required
                            mask="999.999.999-99"
                            value={CPF}
                            onChange={handleCpfChange}
                            className={`w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent ${cpfError ? 'border-red-500' : ''}`}
                            placeholder="Digite seu CPF"
                          />
                          {cpfError && <span className="text-red-500 text-sm">{cpfError}</span>}
                        </div>
                        <br />
                        <div className="flex flex-col w-full items-center">
                          <label className="text-lg font-medium">Área de Atuação</label>
                          <input required type="text" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Insira sua área de atuação" value={trabalho} onChange={(e) => setTrabalho(e.target.value)} />
                        </div>
                        <br />
                        <div className="flex flex-col w-full items-center">
                          <label className="text-lg font-medium">Descrição</label>
                          <textarea required className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Importante!!! você será recomendado atarvez dessa informação" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <br />
                        <div className="flex flex-col w-full items-center">
                          <label className="text-lg font-medium">Experiências anteriores</label>
                          <textarea required className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Descreva suas experiências anteriores" value={experiencias} onChange={(e) => setExperiencia(e.target.value)} />
                        </div>
                        <br />
                        <div className="flex flex-col w-full items-center">
                          <label className="text-lg font-medium">Sobre você</label>
                          <textarea required className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Fale um pouco sobre você" value={sobre} onChange={(e) => setSobre(e.target.value)} />
                        </div>
                      </>
                    )}

                    {/* Etapa 3: Laudo Médico */}
                    {step === 3 && (
                      <>
                       <div className="flex flex-col w-full items-center">
                          <label className="text-lg font-medium">Deficiencia</label>
                          <input required type="text" className="w-96 border-2 border-gray-300 rounded-full p-2 mt-1 bg-transparent" placeholder="Insira sua deficiencia" value={deficiencia} onChange={(e) => setDeficiencia(e.target.value)} />
                        </div>
                        <br />
                        <div className="flex flex-col w-full items-center">
                          <label className="text-lg font-medium">Laudo Médico</label>
                          <input type="file" className="mt-2" accept=".pdf,.doc,.docx" onChange={(e) => setLaudoMedico(e.target.files[0])} />
                        </div>
                        <br />
                      </>
                    )}

                    <br /><br />
                    <div className="flex flex-row w-full items-center justify-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span className="text-gray-700">
                        Aceito os <Link to="/termos" className="text-blue-700">Termos</Link> de Uso
                      </span>
                    </div>

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
