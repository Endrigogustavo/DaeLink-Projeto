import React, { useState, useEffect, useRef } from "react";
import { doc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db, storage, auth } from "../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { logout } from '../../../Auth/Auth';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { MdExitToApp } from "react-icons/md";
import InputMask from 'react-input-mask';
import Modal from "../Modal/Modal";
import { getAuth, sendPasswordResetEmail, updateEmail } from "firebase/auth";

const EditarPerfil = () => {
  // Função de navegação do site
  const navigate = useNavigate();
  // Utilizado para pegar o id do usuario e da vaga na tela anterior

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [profilebackgroundpreview, setProfileBackgroundpreview] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [userId, setUserId] = useState('');
  const [tab, setTab] = useState(1);
  const [userName, setUserName] = useState("")
  const [isUserNameSet, setIsUserNameSet] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);

  const [CNPJError, setCNPJErro] = useState('')
  // Informações do usuario
  const [userData, setUserProfile] = useState({
    cep: '',
    email: '',
    name: '',
    cnpj: '',
    endereco: '',
    sobre: '',
    area: ''
  });

  const textareaRefs = {
    sobre: useRef(null),
  };

  const adjustTextareaHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };


  // Carregar as informações do usuário do banco de dados
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const userId = storedUserId;
      setUserId(userId)
    }
    const getCompanyProfile = async () => {
      const CompanyDoc = doc(db, "Empresa", userId);
      const GetCompany = await getDoc(CompanyDoc);
      if (GetCompany.exists()) {
        setUserProfile(GetCompany.data());
        const data = GetCompany.data()
        setProfileImagePreview(data.imageUrl)
        setProfileBackgroundpreview(data.imageProfile)
      } else {
        setUserProfile(null);
      }
    };
    getCompanyProfile();
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

  const uploadAndGetDownloadUrl = async (path, file) => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };


  // Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const userDoc = doc(db, "Empresa", userId);

      await updateDoc(userDoc, {
        cep: userData.cep,
        email: userData.email,
        name: userData.name,
        cnpj: userData.cnpj,
        endereco: userData.endereco,
        sobre: userData.sobre,
        area: userData.area,
        userId: userId,
      });

      const auth = getAuth();
      updateEmail(auth.currentUser, userData.email).then(() => {
        // Email updated!
        // ...
      })
      setWorksModal(true)
      setModalMessage("Conta Atualizada com sucesso.")
      setModalOpen(true)
      setTimeout(() => {
        navigate(-1);
      }, 2200);

    } catch (e) {
      console.error("Erro ao Atualizar ", e);

      setWorksModal(false)
      setModalMessage("Erro ao Atualizar a Conta.")
      setModalOpen(true)
      setTimeout(() => {
        setModalOpen(false)
      }, 2200);
    }
  };

  const handleSubmitImg = async (e) => {
    e.preventDefault();
    try {

      const uploadImage = async (path, image) => {
        if (!image) {
          return null; // Se a imagem não existir, retorna null
        }
        return await uploadAndGetDownloadUrl(path, image);
      };
      const userDoc = doc(db, "Empresa", userId);
      const [profileImageURL, backgroundImageURL] = await Promise.all([
        uploadImage(`images_company/${profileImage?.name}`, profileImage),
        uploadImage(`background_profile_company/${backgroundImage?.name}`,
          backgroundImage
        ),
      ]);
      const updateData = {};


      if (profileImageURL) updateData.imageUrl = profileImageURL;
      if (backgroundImageURL) updateData.imageProfile = backgroundImageURL;

      await updateDoc(userDoc, updateData);

      setWorksModal(true)
      setModalMessage("Conta Atualizada com sucesso.")
      setModalOpen(true)
      setTimeout(() => {
        navigate(-1);
      }, 2200);

    } catch (e) {
      console.error("Erro ao Atualizar ", e);

      setWorksModal(false)
      setModalMessage("Erro ao Atualizar a Conta.")
      setModalOpen(true)
      setTimeout(() => {
        setModalOpen(false)
      }, 2200);
    }
  };

  const getFirstAndLastName = (name) => {
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1] ? nameParts[1] : ""; // Verifica se há sobrenome
    return `${firstName} ${lastName}`;
  };

  function voltarincon(e) {
    e.preventDefault();
    navigate('/perfilempresa');
  }

  const handleTabChange = (tabIndex) => {
    setTab(tabIndex);
  };

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
  return (
    <>
      <div>
        <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
      </div>

      <div className="h-screen w-full flex items-center justify-center bg-gray-300 editprofile-screen">
        <div className="w-editprofile h-editprofile rounded-3xl flex editprofile-container">
          {/*Lado Esquerdo*/}
          <div className="w-2/6 h-full bg-gray-900 rounded-3xl flex flex-col py-4 gap-32 editprofile-menu">

            <div className="w-full h-fit flex items-center justify-center  gap-2 editprofile-hello">
              <img src={userData.imageUrl} className="w-20 h-20 rounded-full border-4 border-blue-600" alt="" />
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
                  {isMobileView ? 'Empresa' : 'Informações Empresariais'}
                </p>
              </div>
              <div

                className={`w-full h-fit py-4 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 2 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(2)} >
                <p className='font-medium'>
                  {isMobileView ? 'Perfil' : 'Perfil Empresarial'}
                </p>
              </div>

              <div

                className={`w-full h-fit py-4 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 3 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(3)} >
                <p className='font-medium'>
                  {isMobileView ? 'Perfil' : 'Imagem Perfil'}
                </p>
              </div>

              <div

                className={`w-full h-fit py-4 flex items-center justify-center cursor-pointer transitiontabs responsivetabs bordertabs
                ${tab === 4 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(4)} >
                <p className='font-medium'>
                  {isMobileView ? 'Perfil' : 'Trocar Senha'}
                </p>
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
            <form onSubmit={handleSubmit} className="h-full w-full flex flex-col items-center justify-center gap-2">

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
                    <label className="text-lg font-medium">CNPJ</label>
                    <InputMask
                      required
                      name="cnpj"
                      mask="99.999.999/9999-99"
                      value={userData.cnpj}
                      onChange={handleInputChange}
                      readOnly
                      className={`w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent ${CNPJError ? 'border-red-500' : ''}`}
                      placeholder="Digite seu CNPJ"
                    />
                    {CNPJError && <span className="text-red-500 text-sm">{CNPJError}</span>}
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">CEP</label>
                    <InputMask
                      required
                      mask="99999-999"
                      name="cep"
                      value={userData.cep}
                      onChange={handleInputChange}
                      className={`w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent ${CNPJError ? 'border-red-500' : ''}`}
                      placeholder="Digite seu CEP"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-lg font-medium">Endereço</label>
                    <input required
                      name="endereco"
                      className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                      placeholder="insira o Endereço"
                      value={userData.endereco}
                      onChange={handleInputChange} />
                  </div>



                </>

              )}

              {tab === 2 && (
                <>
                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Ramo da Empresa</label>
                    <select
                      name="area"
                      value={userData.area}
                      onChange={handleInputChange}
                      className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                    >
                      <option value="" disabled>Selecione a área de atuação</option>
                      <option value="Alimentação">Alimentação</option>
                      <option value="Automotivo">Automotivo</option>
                      <option value="Comércio">Comércio</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Educação">Educação</option>
                      <option value="Entretenimento">Entretenimento</option>
                      <option value="Entretenimento Digital">Entretenimento Digital</option>
                      <option value="Esportes">Esportes</option>
                      <option value="Finanças">Finanças</option>
                      <option value="Logística">Logística</option>
                      <option value="Marketing Digital">Marketing Digital</option>
                      <option value="Moda">Moda</option>
                      <option value="Saúde e Bem-Estar">Saúde e Bem-Estar</option>
                      <option value="Segurança">Segurança</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Tecnologia da Informação">Tecnologia da Informação</option>
                      <option value="Varejo">Varejo</option>

                    </select>
                  </div>


                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Sobre</label>
                    <textarea required
                      name="sobre"
                      ref={textareaRefs.sobre}
                      className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent min-h-24 max-h-28 "
                      placeholder="Fale sobre você"
                      value={userData.sobre}
                      onChange={(e) => {
                        handleInputChange(e);
                        adjustTextareaHeight(textareaRefs.sobre);
                      }}
                    />
                  </div>
                </>
              )

              }

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
                  <br />
                  <button type="submit" className="w-52 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all mt-2" onClick={handleSubmitImg}>Confirmar Mudanças</button>

                </>

              )}

              {tab === 4 && (
                <>
                  <h1 className="font-medium test-center px-12">Parar trocar de senha prossiga no botão, pois irá enviar o email de verificação</h1>
                  <button onClick={PassReset} className="w-52 bg-green-500 hover:bg-green-400 text-white font-bold 
                  py-2 px-4 rounded-full transition-all mt-2">Trocar Senha</button>
                </>
              )}



              {tab <= 2 && (
                <button type="submit" className="w-52 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all mt-2">Confirmar Mudanças</button>
              )}

            </form>
          </div>
        </div>
      </div >
    </>
  );
};

export default EditarPerfil;
