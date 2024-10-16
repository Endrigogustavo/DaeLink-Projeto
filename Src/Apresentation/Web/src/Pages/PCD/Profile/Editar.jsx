import React, { useState, useEffect, useRef } from "react";
import { doc, collection, updateDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db, storage, auth } from "../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { decrypt } from "../../../Security/Cryptography_Rotes";
import { getAuth, updateEmail, sendPasswordResetEmail, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

import { MdExitToApp } from "react-icons/md";

const EditarPerfil = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [senha, setSenha] = useState("");
  const [tab, setTab] = useState(1);
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
      } else {
        setUserProfile(null);
        alert("Sem documentos!");
      }
    };
    getUserProfile();
  }, [userId]);

  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  {/*
// Botão para guardar as informações no banco
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    axios.post('https://localhost:3000/updateprofile/'+id, {userData})
   .then(res =>{
    alert("Perfil atualizado com sucesso")
   })
   .catch(err =>{
    console.log(err)
    alert("Falha ao atualizar, tente novamente.");
  })
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
    alert("Erro ao adicionar documento.");
  }
};

*/}

  const PassReset = () => {

    const auth = getAuth();
    sendPasswordResetEmail(auth, userData.email)
      .then(() => {
        alert("Email para a alteração de senha foi enviado")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        senha
      );

      reauthenticateWithCredential(user, credential).then(() => {
      })

      if (user) {
        updateEmail(user, userData.email)
          .then(() => {
            alert('Email atualizado com sucesso');
          })
          .catch((error) => {
            alert(error.message);
          });

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
      }
      alert("Conta atualizada com sucesso!");
      navigate(-2);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

  // Função para pegar o primeiro nome e sobrenome
  const getFirstAndLastName = (name) => {
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1] ? nameParts[1] : ""; // Verifica se há sobrenome
    return `${firstName} ${lastName}`;
  };

  const handleTabChange = (tabIndex) => {
    setTab(tabIndex);
  };

  function voltarincon() {
    navigate(-1);
  }

  const DeleteProfile = async (id) => {
    var response = confirm("Deseja Deletar a conta?");

    if (response == true) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        deleteUser(user).then(() => {
          // User deleted.
        }).catch((error) => {
          // An error ocurred
          // ...
        });
        const UserInfo = doc(db, "PCD", id)
        await deleteDoc(UserInfo)
        localStorage.removeItem('userId');
        alert("Conta deletada com sucesso")
        navigate('/');
      } catch (error) {
        alert("Erro", error)
      }
    }

  }

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="bg-gray-200 w-editprofile h-editprofile rounded-3xl flex editprofile-container">
          {/*Lado Esquerdo*/}
          <div className="w-2/6 h-full bg-gray-900 rounded-3xl flex flex-col py-4 gap-32 editprofile-menu">

            <div className="w-full h-fit flex items-center justify-center  gap-2 editprofile-hello">
              <img src={userData.imageUrl} className="w-20 h-20 rounded-full border-4 border-blue-600" alt="" />
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-white ">
                  Olá {getFirstAndLastName(userData.name)}
                </h1>
              </div>
            </div>

            <div className="flex flex-col w-full h-fit editprofile-tabs">
              <div
                className={`w-full h-fit py-4 flex items-center justify-center  cursor-pointer transitiontabs
                  ${tab === 1 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(1)}
              >
                <p className='font-medium'>Informações Pessoais</p>
              </div>
              <div
                className={`w-full h-fit py-4 flex items-center justify-center  cursor-pointer transitiontabs
                  ${tab === 2 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(2)}
              >
                <p className='font-medium'>Informações Profissionais</p>
              </div>
              <div
                className={`w-full h-fit py-4 flex items-center justify-center cursor-pointer transitiontabs
                                ${tab === 3 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(3)}
              >
                <p className='font-medium'>Senha e Segurança</p>
              </div>
              <div
                className={`w-full h-fit py-4 flex items-center justify-center cursor-pointer transitiontabs
                                ${tab === 4 ? 'bg-gray-200' : 'bg-gray-800 text-white'}`}
                onClick={() => handleTabChange(4)}
              >
                <p className='font-medium'>Deletar Conta</p>
              </div>
            </div>

            <div className="h-fit w-full flex items-center justify-center">
              <button onClick={voltarincon} className='flex h-fit items-center gap-1'>
                <p className='font-medium text-white'>Voltar</p>
                <MdExitToApp className='text-4xl text-white iconhover ' />
              </button>
            </div>


          </div>
          {/*Lado Direito*/}
          <div className="w-4/6 h-full flex flex-col items-center justify-center editprofile-form">
            <form onSubmit={handleSubmit} className="h-full w-full flex flex-col items-center justify-center gap-2">
              {tab === 1 && (
                <>
                  <div className="flex flex-col">
                    <label className="text-lg font-medium">Nome</label>
                    <input required type="text"
                      className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                      placeholder="Insira seu Nome Completo"
                      value={userData.name}
                      onChange={handleInputChange} />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input required type="text"
                      className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                      placeholder="Insira seu Nome Completo"
                      value={userData.email}
                      onChange={handleInputChange} />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Data de Nascimento</label>
                    <input required type="date" className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                      placeholder="Insira sua Idade"
                      value={userData.idade}
                      onChange={handleInputChange} />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Sobre</label>
                    <textarea required
                      ref={textareaRefs.sobre}
                      className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                      placeholder="Fale sobre você"
                      value={userData.sobre}
                      onChange={(e) => {
                        handleInputChange;
                        adjustTextareaHeight(textareaRefs.sobre);
                      }}
                    />
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
                    <label className="text-lg font-medium">Experiências</label>
                    <textarea required
                      ref={textareaRefs.experiencias}
                      className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                      placeholder="Fale sobre suas experiências"
                      value={userData.experiencias}
                      onChange={(e) => {
                        handleInputChange;
                        adjustTextareaHeight(textareaRefs.experiencias);
                      }}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-lg font-medium">Área</label>
                    <select
                      name="area"
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
                    <label className="text-lg font-medium">Descrição</label>
                    <textarea required
                      ref={textareaRefs.descricao}
                      className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                      placeholder="Importante!!! você será recomendado atarvez dessa informação"
                      value={userData.descrição}
                      onChange={(e) => {
                        handleInputChange;
                        adjustTextareaHeight(textareaRefs.descricao);
                      }}
                    />
                  </div>

                </>
              )

              }

              {tab === 3 && (
                <>
                  <h1 className="font-medium test-center px-12">Parar trocar de senha prossiga no botão, pois irá enviar o email de verificação</h1>
                  <button onClick={PassReset} className="w-52 bg-green-500 hover:bg-green-400 text-white font-bold 
                  py-2 px-4 rounded-full transition-all mt-2">Trocar Senha</button>

                </>

              )}

              {tab === 4 && (
                <>
                  <h1 className="font-medium test-center px-12">Irá desativar sua conta, entretanto você pode criar uma nova posteriormente</h1>
                  <button onClick={() => DeleteProfile(userId)} className="w-52 bg-red-500 hover:bg-red-400 text-white font-bold 
                  py-2 px-4 rounded-full transition-all mt-2">Deletar conta</button>

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
