import React, { useState, useEffect, useRef } from "react";
import { doc, collection, updateDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db, storage, auth } from "../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { decrypt } from "../../../Security/Cryptography_Rotes";
import { getAuth, updateEmail, sendPasswordResetEmail, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { MdExitToApp } from "react-icons/md";

import Modal from "../Modal/Modal";
import ConfirmModal from "../Modal/ConfirmModal"
import axios from "axios";

import CropEasy from "../../../Components/Imagecrop/CropEasy";

const EditarPerfil = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [profilebackgroundpreview, setProfileBackgroundpreview] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isProfile, setIsProfile] = useState(false);
  const aspectRatio = isProfile ? 1 : 16 / 9;

  const [userId, setUserId] = useState('');
  const [senha, setSenha] = useState("");
  const [tab, setTab] = useState(1);
  const [userName, setUserName] = useState("")
  const [isUserNameSet, setIsUserNameSet] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);

  const [trabalhosearch, setTrabalhosearch] = useState(""); // Estado para o valor digitado
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Controle de visibilidade do dropdown
  const dropdownRef = useRef(null);

  const trabalhos = [
    "Desenvolvedor de Sistemas",
    "Administrador",
    "Marketeiro",
    "Designer",
    "Engenheiro",
    "Recursos Humanos",
    "Vendedor",
    "Economista",
    "Médico",
    "Enfermeiro",
    "Advogado",
    "Professor",
    "Psicólogo",
    "Consultor Financeiro",
    "Arquiteto",
    "Farmacêutico",
    "Cientista de Dados",
    "Analista de Sistemas",
    "Gestor de Projetos",
    "Redator",
    "Publicitário",
    "Nutricionista",
    "Técnico em Informática",
    "Assistente Administrativo",
    "Analista de Marketing",
    "Operador de Máquinas",
    "Contador",
    "Químico",
    "Engenheiro Civil",
    "Engenheiro de Software",
    "Analista de Recursos Humanos",
    "Gerente de Produto",
    "Consultor de Vendas",
  ];


  // Filtra as áreas com base na busca
  const filteredAreas = trabalhos.filter((area) =>
    area.toLowerCase().includes((trabalhosearch || '').toLowerCase())
  );

  const handleBlur = (e) => {
    // Verifica se o foco foi perdido para um elemento fora do dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownVisible(false);
    }
  };

  const handleSelectArea = (selectedArea) => {
    setTrabalhosearch(selectedArea); // Atualiza o input com o valor selecionado
    setIsDropdownVisible(false); // Esconde o dropdown após a seleção
    handleInputChange({ target: { name: 'trabalho', value: selectedArea } });
  };



  const [userData, setUserProfile] = useState({
    name: '',
    email: '',
    trabalho: '',
    descrição: '',
    idade: '',
    sobre: '',
    experiencias: '',
    deficiencia: ''
  });

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [ConfirmModalMessage, setConfirmModalMessage] = useState('');

  const handleOpenModal = () => {
    setConfirmModalMessage('Deseja deletar a Conta?');
    setConfirmModalOpen(true);
  };

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
  };


  const textareaRefs = {
    sobre: useRef(null),
    experiencias: useRef(null),
    descricao: useRef(null),
  };

  const adjustTextareaHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {

    const getUserProfile = async () => {
      const storedUserId = await axios.get('http://localhost:3000/getcookie', { withCredentials: true });
      setUserId(storedUserId.data)
      const userId = storedUserId.data;
      setUserId(userId)

      const userDoc = doc(db, "PCD", userId);
      const GetUser = await getDoc(userDoc);
      if (GetUser.exists()) {
        setUserProfile(GetUser.data());
        const data = GetUser.data()
        setProfileImagePreview(data.imageUrl)
        setProfileBackgroundpreview(data.imageProfile)
        setTrabalhosearch(data.trabalho)
      } else {
        setUserProfile(null);
      }
    };
    getUserProfile();

  }, [userId]);

  useEffect(() => {
    if (userData.name && !isUserNameSet) {
      setUserName(userData.name); // Define o userName apenas uma vez
      setIsUserNameSet(true); // Marca como definido para evitar alterações futuras
    }
  }, [userData, isUserNameSet]);

  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const PassReset = () => {

    const auth = getAuth();
    sendPasswordResetEmail(auth, userData.email)
      .then(() => {
        setWorksModal(true)
        setModalMessage("Email para a alteração de senha foi enviado")
        setModalOpen(true)
        setTimeout(() => {
          setModalOpen(false)
        }, 2200);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  const uploadAndGetDownloadUrl = async (path, file) => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data de nascimento:", userData.idade); // Verifica o valor de userData.idade
    if (!userData.idade) {
      console.error("Idade não definida corretamente.");
      return;
    }

    // Converta a data de nascimento para um objeto Date
    const birthdate = new Date(userData.idade);

    // Verifique se a data foi criada corretamente
    if (isNaN(birthdate.getTime())) {
      console.error("Data de nascimento inválida:", userData.idade);
      return;
    }

    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    const dayDifference = today.getDate() - birthdate.getDate();

    // Ajusta a idade se a data de aniversário ainda não foi completada neste ano
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    // Verifica se a idade está entre 18 e 90 anos
    if (age < 18 || age > 90) {
      setWorksModal(false);
      setModalMessage("Data de Nascimento Inválida");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 4000);
    } else {
      try {

        if (user) {
          await updateEmail(user, userData.email);
          const userDoc = doc(db, "PCD", userId);
          await updateDoc(userDoc, {
            name: userData.name,
            email: userData.email,
            trabalho: userData.trabalho,
            descrição: userData.descrição,
            sobre: userData.sobre,
            experiencias: userData.experiencias,
            idade: userData.idade,
            userId: userId,
            deficiencia: userData.deficiencia,
          });

          const auth = getAuth();
          updateEmailmobile(auth.currentUser, userData.email).then(() => {
            // Email updated!
            // ...
          })
          setWorksModal(true);
          setModalMessage("Conta atualizada com sucesso!");
          setModalOpen(true);
          setTimeout(() => navigate(-2), setModalOpen(false), 4000);
        }
      } catch (error) {
        console.error("Erro ao atualizar conta: ", error);
        let errorMessage = "Erro ao atualizar conta.";
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = "Este e-mail já está em uso.";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "O e-mail informado é inválido.";
        }
        setWorksModal(false);
        setModalMessage(errorMessage);
        setModalOpen(true);
        setTimeout(() => setModalOpen(false), 2200);
      }
    }
  };

  const handleSubmitIMG = async (e) => {
    e.preventDefault();
    try {
      const uploadImage = async (path, image) => {
        if (!image) {
          return null; // Se a imagem não existir, retorna null
        }
        return await uploadAndGetDownloadUrl(path, image);
      };

      const [profileImageURL, backgroundImageURL] = await Promise.all([
        uploadImage(`pcd_profile/${profileImage?.name}`, profileImage),
        uploadImage(`background_profile/${backgroundImage?.name}`, backgroundImage),
      ]);

      if (user) {
        const userDoc = doc(db, "PCD", userId);
        const updateData = {};

        // Somente atualiza o campo se a URL da imagem não for nula
        if (profileImageURL) updateData.imageUrl = profileImageURL;
        if (backgroundImageURL) updateData.imageProfile = backgroundImageURL;

        await updateDoc(userDoc, updateData);

        setWorksModal(true);
        setModalMessage("Conta atualizada com sucesso!");
        setModalOpen(true);
        setTimeout(() => navigate(-2), 4000);
      }

    } catch (error) {
      console.error("Erro ao atualizar conta: ", error);
      let errorMessage = "Erro ao atualizar conta.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este e-mail já está em uso.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "O e-mail informado é inválido.";
      }
      setWorksModal(false);
      setModalMessage(errorMessage);
      setModalOpen(true);
      setTimeout(() => setModalOpen(false), 2200);
    }
  };
  // Função para pegar o primeiro nome e sobrenome
  const getFirstAndLastName = (name) => {
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1] ? nameParts[1] : "";
    return `${firstName} ${lastName}`;
  };

  const handleTabChange = async (tabIndex) => {
    setTab(tabIndex);
  };


  function voltarincon(e) {
    e.preventDefault();
    navigate('/userprofile');
  }

  const DeleteProfile = async (id) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Solicita ao usuário que faça login novamente para reautenticação
      const credential = EmailAuthProvider.credential(
        user.email,
        prompt("Por favor, insira sua senha para confirmar a exclusão da conta:")
      );

      // Reautentica o usuário
      await reauthenticateWithCredential(user, credential);

      // Exclui o documento no Firestore primeiro
      const UserInfo = doc(db, "PCD", id);
      await deleteDoc(UserInfo);

      // Exclui o usuário do Firebase Authentication
      await deleteUser(user);

      // Exibe mensagem de sucesso e abre modal
      setWorksModal(true);
      setModalMessage("Conta deletada com sucesso");
      setModalOpen(true);

      // Aguarda 4 segundos para dar feedback visual antes de redirecionar
      setTimeout(() => {
        navigate('/');
      }, 4000);

    } catch (error) {
      console.error("Erro ao deletar a conta:", error);

      // Exibe mensagem de erro e abre modal
      setWorksModal(false);
      setModalMessage("Erro ao deletar a conta.");
      setModalOpen(true);

      // Fecha o modal após 2.2 segundos
      setTimeout(() => {
        setModalOpen(false);
      }, 2200);
    }
  };


  // Função para verificar o tamanho da tela e trocar os textos
  const checkScreenSize = () => {
    const mediaQuery = window.matchMedia("(max-width: 580px)");
    setIsMobileView(mediaQuery.matches);
  };

  useEffect(() => {
    // Chama a função ao montar o componente
    checkScreenSize();

    // Adiciona um listener para verificar mudanças no tamanho da tela
    window.addEventListener('resize', checkScreenSize);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    const filesize = file.size / 1024 / 1024;

    if (file) {
      if (filesize > 5) {
        setWorksModal(false);
        setModalMessage("Arquivo maior de 5MB");
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
        }, 2200);
        setProfileImage("");
        setProfileImagePreview("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
      } else {
        setIsProfile(true)
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageToCrop(reader.result); // Abre o modal de recorte para a imagem de perfil
          setIsProfile(true); // Indicador de que é para o perfil
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProfileImagePreview("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
    }
  };

  const handleProfileBackgroundChange = (e) => {
    const file = e.target.files[0];
    const filesize = file.size / 1024 / 1024;

    if (file) {
      if (filesize > 5) {
        setWorksModal(false);
        setModalMessage("Arquivo maior de 5MB");
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
        }, 2200);
        setBackgroundImage("");
        setProfileBackgroundpreview("https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png");
      } else {
        setIsProfile(false)
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageToCrop(reader.result); // Abre o modal de recorte para a imagem de fundo
          setIsProfile(false); // Indicador de que é para o background
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProfileBackgroundpreview("https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png");
    }
  };


  return (
    <>

      <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />

      <ConfirmModal
        isWorksModal={isConfirmModalOpen}
        onConfirm={() => DeleteProfile(userId)} // Função só será chamada ao confirmar
        onClose={handleCloseModal}
        message={ConfirmModalMessage}
      />

      {imageToCrop && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50'>
          <div className={` h-fit rounded-3xl border-2 border-gray-300 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden
                                    ${isProfile ? 'w-96  ' : 'w-backgroundcrop'}`}>
            <CropEasy
              imageToCrop={imageToCrop}
              setImageToCrop={setImageToCrop}
              setPreview={isProfile ? setProfileImagePreview : setProfileBackgroundpreview}
              setFile={isProfile ? setProfileImage : setBackgroundImage}
              aspectRatio={aspectRatio}

            />
          </div>
        </div>
      )}

      <div className="h-screen w-full flex items-center justify-center bg-gray-300 editprofile-screen">
        <div className="w-editprofile h-editprofile rounded-3xl flex editprofile-container">
          {/*Lado Esquerdo*/}
          <div className="w-2/6 h-full bg-gray-900 rounded-3xl flex flex-col py-4 gap-24 editprofile-menu">

            <div className="w-full h-fit flex items-center justify-center  gap-2 editprofile-hello">
              <img src={userData.imageUrl} className="w-20 h-20 rounded-full border-4 border-blue-600 object-cover" alt="" />
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-white ">
                  {getFirstAndLastName(userName)}
                </h1>
              </div>
            </div>

            <div className="flex flex-col w-full h-fit editprofile-tabs">

              <div
                className={`w-full h-fit py-4 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 1 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(1)}>
                <p className='font-medium'>
                  {isMobileView ? 'Pessoal' : 'Informações Pessoais'}
                </p>
              </div>

              <div
                className={`w-full h-fit py-4  flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 2 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(2)} >
                <p className='font-medium'>
                  {isMobileView ? 'Carreira' : 'Informações Profissionais'}
                </p>
              </div>

              <div

                className={`w-full h-fit py-4  flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 3 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(3)} >
                <p className='font-medium'>
                  {isMobileView ? 'Carreira' : 'Imagem Perfil'}
                </p>
              </div>

              <div
                className={`w-full h-fit py-4  flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 4 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(4)} >
                <p className='font-medium'>
                  {isMobileView ? 'Senha' : 'Senha e Segurança'}
                </p>
              </div>

              <div
                className={`w-full h-fit py-4  flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 5 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(5)}>
                <p className='font-medium'>Deletar Conta</p>
              </div>
            </div>

            <div className="h-fit w-full flex items-center justify-center tabs-voltar">
              <button onClick={(e) => voltarincon(e)} className='flex h-fit items-center gap-1 iconhover'>
                <p className='font-medium text-white'>Voltar</p>
                <MdExitToApp className='text-4xl text-white  ' />
              </button>
            </div>


          </div>
          {/*Lado Direito*/}
          <div className="w-4/6 h-full flex flex-col items-center justify-center editprofile-form bg-white rounded-3xl">
            <form className="h-full w-full flex flex-col items-center justify-center gap-2">

              <div className="h-fit w-full flex items-center justify-end form-voltar hidden">
                <button onClick={(e) => voltarincon(e)} className='flex h-fit items-center gap-1 iconhover'>
                  <p className='font-medium text-gray-900'>Voltar</p>
                  <MdExitToApp className='text-4xl text-gray-900  ' />
                </button>
              </div>

              {tab === 1 && (
                <>
                  <div className="flex flex-col">
                    <label className="text-lg font-medium">Nome</label>
                    <input required type="text"
                      name="name"
                      className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                      placeholder="Insira seu Nome Completo"
                      value={userData.name}
                      onChange={handleInputChange} />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input required type="text"
                      name="email"
                      className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                      placeholder="Insira seu Nome Completo"
                      value={userData.email}
                      onChange={handleInputChange} />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Data de Nascimento</label>
                    <input required type="date" className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                      name="idade"
                      placeholder="Insira sua Idade"
                      value={userData.idade}
                      onChange={handleInputChange} />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Deficência</label>
                    <select
                      name="deficiencia"
                      value={userData.deficiencia}
                      onChange={handleInputChange}
                      className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                    >
                      <option value="" disabled>Selecione sua Deficiência</option>
                      <option value="Auditiva">Auditiva</option>
                      <option value="Visual">Visual</option>
                      <option value="Física">Física</option>
                      <option value="Intelectual">Intelectual</option>
                      <option value="Múltipla">Múltipla</option>
                      <option value="Psíquica">Psíquica</option>
                    </select>
                  </div>

                </>

              )}

              {tab === 2 && (
                <>
                  <div className="flex flex-col w-80 relative">
                    <label className="text-lg font-medium">Área</label>
                    <input
                      type="text"
                      placeholder="Digite para filtrar a área"
                      name="area"
                      value={trabalhosearch}
                      onChange={(e) => {
                        setTrabalhosearch(e.target.value);
                        handleSelectArea(e.target.value)
                        setIsDropdownVisible(e.target.value.length > 0 && filteredAreas.length > 0);
                      }}
                      onFocus={() => setIsDropdownVisible(trabalhosearch.length > 0 && filteredAreas.length > 0)}
                      onBlur={handleBlur}
                      className="w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                    />
                    {isDropdownVisible && filteredAreas.length > 0 && (
                      <ul
                        className="border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto bg-white absolute top-20 w-full"
                        ref={dropdownRef}
                      >
                        {filteredAreas.map((filteredArea) => (
                          <li
                            key={filteredArea}
                            onMouseDown={() => handleSelectArea(filteredArea)} // Mantém onMouseDown no <li>
                            className="p-2 cursor-pointer hover:bg-gray-200"
                          >
                            {filteredArea}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>


                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Sobre</label>
                    <textarea required
                      name="sobre"
                      ref={textareaRefs.sobre}
                      className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent max-h-24 "
                      placeholder="Fale sobre você"
                      value={userData.sobre}
                      onChange={(e) => {
                        handleInputChange(e);
                        adjustTextareaHeight(textareaRefs.sobre);
                      }}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Experiências</label>
                    <textarea required
                      name="experiencias"
                      ref={textareaRefs.experiencias}
                      className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent max-h-24"
                      placeholder="Fale sobre suas experiências"
                      value={userData.experiencias}
                      onChange={(e) => {
                        handleInputChange(e);
                        adjustTextareaHeight(textareaRefs.experiencias);
                      }}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Descrição</label>
                    <textarea required
                      name="descrição"
                      ref={textareaRefs.descricao}
                      className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent max-h-24 "
                      placeholder="Importante!!! você será recomendado atarvez dessa informação"
                      value={userData.descrição}
                      onChange={(e) => {
                        handleInputChange(e);
                        adjustTextareaHeight(textareaRefs.descricao);
                      }}
                    />
                  </div>

                </>
              )}

              {tab === 3 && (
                <>
                  <div>
                    <label htmlFor="profile-image-input" className='flex flex-col items-center w-fit  h-fit justify-center cursor-pointer gap-1'>
                      <img src={profileImagePreview}
                        className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover" alt="Preview Perfil" />
                      <p className='text-center font-medium'>Foto Perfil</p></label>
                    <input required id="profile-image-input" type="file" className='hidden' accept="image/*" onChange={handleProfileImageChange} />
                  </div>
                  <br />
                  <div>

                    <label htmlFor="background-image-input" className='flex flex-col items-center w-fit  h-fit justify-center cursor-pointer gap-1'>
                      <img src={profilebackgroundpreview}
                        className="w-60 h-32 rounded-3xl border-2 border-blue-600 object-cover" alt="Preview Background" />
                      <p className='text-center font-medium'>Foto Background</p>
                    </label>
                    <input required id="background-image-input" type="file" className='hidden' accept="image/*" onChange={handleProfileBackgroundChange} />
                  </div> <br />
                  <button type="submit" onClick={handleSubmitIMG} className="w-52 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all mt-2">Confirmar Mudanças</button>

                </>

              )}

              {tab === 4 && (
                <>
                  <h1 className="font-medium test-center px-12">Parar trocar de senha prossiga no botão, pois irá enviar o email de verificação</h1>
                  <button onClick={PassReset} type="button" className="w-52 bg-green-500 hover:bg-green-400 text-white font-bold 
                  py-2 px-4 rounded-full transition-all mt-2">Trocar Senha</button>

                </>

              )}

              {tab === 5 && (
                <>
                  <h1 className="font-medium test-center px-12">Irá desativar sua conta, entretanto você pode criar uma nova posteriormente</h1>
                  <button onClick={handleOpenModal} type="button" className="w-52 bg-red-500 hover:bg-red-400 text-white font-bold 
                  py-2 px-4 rounded-full transition-all mt-2">Deletar conta</button>

                </>

              )}

              {tab <= 2 && (
                <button type="submit" onClick={handleSubmit} className="w-52 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all mt-2">Confirmar Mudanças</button>
              )}

            </form>
          </div>
        </div>
      </div >
    </>
  );
};

export default EditarPerfil;
