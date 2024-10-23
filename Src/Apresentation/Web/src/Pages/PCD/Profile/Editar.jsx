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

const EditarPerfil = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [profilebackgroundpreview, setProfileBackgroundpreview] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [userId, setUserId] = useState('');
  const [senha, setSenha] = useState("");
  const [tab, setTab] = useState(1);
  const [userName, setUserName] = useState("")
  const [isUserNameSet, setIsUserNameSet] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);
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
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const userId = storedUserId;
      setUserId(userId);
    }

    const getUserProfile = async () => {
      const userDoc = doc(db, "PCD", userId);
      const GetUser = await getDoc(userDoc);
      if (GetUser.exists()) {
        setUserProfile(GetUser.data());
        const data = GetUser.data()
        setProfileImagePreview(data.imageUrl)
        setProfileBackgroundpreview(data.imageProfile)
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

  const handleTabChange = (tabIndex) => {
    setTab(tabIndex);
  };

  function voltarincon(e) {
    e.preventDefault();
    navigate('/userprofile');
  }

  const DeleteProfile = async (id) => {
    console.log("Tentando deletar o usuário com ID:", id);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Exibe mensagem de sucesso e abre modal
      setWorksModal(true);
      setModalMessage("Conta deletada com sucesso");
      setModalOpen(true);

      // Exclui o documento no Firestore primeiro
      const UserInfo = doc(db, "PCD", id);
      await deleteDoc(UserInfo);

      // Exclui o usuário do Firebase Authentication
      await deleteUser(user);

      // Remove o ID do localStorage
      localStorage.removeItem('userId');

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

  const handleProfileBackgroundChange = (e) => {
    const file = e.target.files[0]
    setBackgroundImage(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileBackgroundpreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileBackgroundpreview('https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png');
    }

  }


  return (
    <>

      <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
      <ConfirmModal
        isWorksModal={isConfirmModalOpen}
        onConfirm={() => DeleteProfile(userId)} // Função só será chamada ao confirmar
        onClose={handleCloseModal}
        message={ConfirmModalMessage}
      />

      <div className="h-screen w-full flex items-center justify-center bg-gray-300 editprofile-screen">
        <div className="w-editprofile h-editprofile rounded-3xl flex editprofile-container">
          {/*Lado Esquerdo*/}
          <div className="w-2/6 h-full bg-gray-900 rounded-3xl flex flex-col py-4 gap-30 editprofile-menu">

            <div className="w-full h-fit flex items-center justify-center  gap-2 editprofile-hello">
              <img src={userData.imageUrl} className="w-20 h-20 rounded-full border-4 border-blue-600" alt="" />
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-white ">
                  Olá {getFirstAndLastName(userName)}
                </h1>
              </div>
            </div>

            <div className="flex flex-col w-full h-fit editprofile-tabs">

              <div
                className={`w-full h-fit py-2 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 1 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(1)}>
                <p className='font-medium'>
                  {isMobileView ? 'Pessoal' : 'Informações Pessoais'}
                </p>
              </div>

              <div
                className={`w-full h-fit py-2 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 2 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(2)} >
                <p className='font-medium'>
                  {isMobileView ? 'Carreira' : 'Informações Profissionais'}
                </p>
              </div>

              <div

                className={`w-full h-fit py-2 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 3 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(3)} >
                <p className='font-medium'>
                  {isMobileView ? 'Carreira' : 'Imagem Perfil'}
                </p>
              </div>

              <div
                className={`w-full h-fit py-2 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 4 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(4)} >
                <p className='font-medium'>
                  {isMobileView ? 'Senha' : 'Senha e Segurança'}
                </p>
              </div>

              <div
                className={`w-full h-fit py-2 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 5 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(5)}>
                <p className='font-medium'>Deletar Conta</p>
              </div>
            </div>

            <div className="h-fit w-full flex items-center justify-center tabs-voltar">
              <button onClick={(e) => voltarincon(e)} className='flex h-fit items-center gap-1'>
                <p className='font-medium text-white'>Voltar</p>
                <MdExitToApp className='text-4xl text-white iconhover ' />
              </button>
            </div>


          </div>
          {/*Lado Direito*/}
          <div className="w-4/6 h-full flex flex-col items-center justify-center editprofile-form bg-white rounded-3xl">
            <form className="h-full w-full flex flex-col items-center justify-center gap-2">

              <div className="h-fit w-full flex items-center justify-end form-voltar hidden">
                <button onClick={(e) => voltarincon(e)} className='flex h-fit items-center gap-1'>
                  <p className='font-medium text-gray-900'>Voltar</p>
                  <MdExitToApp className='text-4xl text-gray-900 iconhover ' />
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
                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Área</label>
                    <select
                      name="trabalho"
                      value={userData.trabalho}
                      onChange={handleInputChange}
                      className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                    >
                      <option value="" disabled>Selecione sua Área</option>
                      <option value="Desenvolvedor de Sistemas">Desenvolvedor de Sistemas</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Marketeiro">Marketeiro</option>
                      <option value="Designer">Designer</option>
                      <option value="Engenheiro">Engenheiro</option>
                      <option value="Recursos Humanos">Recursos Humanos</option>
                      <option value="Vendedor">Vendedor</option>
                      <option value="Economista">Economista</option>
                      <option value="Médico">Médico</option>

                    </select>

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
                      <p className='text-center font-medium'>Background Perfil</p>
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
