import React, { useState, useEffect, useRef } from "react";
import { doc, collection, updateDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios'
import Modal from "./Modal"
import { MdExitToApp } from "react-icons/md";
import { FaUser } from "react-icons/fa";


const EditarPerfil = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);

  // Função de navegação do site
  const navigate = useNavigate();
  // Utilizado para pegar o id do usuario e da vaga na tela anterior
  const [userId, setUserId] = useState("");

  const [senha, setSenha] = useState("");
  // Informações do usuario
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



  // Carregar as informações do usuário do banco de dados
  useEffect(() => {
    const getUserProfile = async () => {
      const id = localStorage.getItem("PCD");
      setUserId(id)
      const userDoc = doc(db, "PCD", id);
      const GetUser = await getDoc(userDoc);
      if (GetUser.exists()) {
        setUserProfile(GetUser.data());
      } else {
        setUserProfile(null);
        alert("Sem documentos!");
      }
    };
    getUserProfile();
  }, []);

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

      axios.post('https://localhost:3000/updateprofile/'+decryptedId, {userData})
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
        const id = localStorage.getItem("PCD");
        const userDoc = doc(db, "PCD", id);

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


        setWorksModal(true)
        setModalMessage("Conta atualizada com sucesso!")
        setModalOpen(true)
        setTimeout(() => {
          navigate(-1);
        }, 4000);
      } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        setWorksModal(false)
        setModalMessage("Erro ao Atualizar")
        setModalOpen(true)
        setTimeout(() => {
          setModalOpen(false)
        }, 4000);
      }
    }
  };

  const DeleteProfile = async () => {
    const id = localStorage.getItem("PCD");
    var response = confirm("Deseja Deletar a conta?");

    if (response == true) {
      try {

        const UserInfo = doc(db, "PCD", id)
        await deleteDoc(UserInfo)
        navigate(-1);
      } catch (error) {
        alert("Erro", error)
      }
    }

  }

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
    Object.values(textareaRefs).forEach(adjustTextareaHeight);
  }, [userData]);

  function voltarincon(e) {
    e.preventDefault();
    navigate(-1);
  }

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

  useEffect(() => {
    if (userData.trabalho) {
      setTrabalhosearch(userData.trabalho);
    }
  }, [userData]);

  return (
    <>

      <div>
        <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
      </div>

      <div className="h-20 w-full flex items-center justify-end px-12">
        <button onClick={(e) => voltarincon(e)} className='flex h-fit items-center gap-1 text-blue-600  py-2 px-4 rounded-3xl 
            bg-gradient-to-br from-gray-300 to-gray-100  border-gray-300 border cardhover'>
          <p className='font-medium'>Voltar</p>
          <MdExitToApp className='text-4xl  ' />
        </button>
      </div>

      <div className='w-full h-36 flex items-center justify-center'>
        <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gradient-to-br from-gray-900 to-gray-800 border-2 items-center justify-center px-5'>
          <h1 className='font-bold text-2xl text-white'>Editar PCD </h1>
        </div>
      </div>

      <div className='h-fit w-full flex items-center justify-center gap-4'>
        <img
          src={userData.imageUrl}
          alt=""
          className='w-32 h-32 rounded-3xl shadow-2xl border-4 border-blue-600 object-cover'
        />

        <div className='h-fit w-fit flex flex-col justify-center items-center gap-2'>
          <FaUser className='text-8xl text-gray-900 text-center bg-white p-4 rounded-full shadow-2xl' />
          <p className='font-semibold text-base text-center'>{userData.name || 'Carregando...'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full z-40 h-fit p-4 editvaga-div gap-2">
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

        <div className="flex gap-2">

          <button type="submit" className="w-48 h-12 bg-blue-700 hover:bg-blue-500 transition-all text-white py-2 px-4 rounded-full ">
            Atualizar PCD</button>
          <button type="button" onClick={DeleteProfile} className="w-48 h-12 bg-red-500 hover:bg-red-400 transition-all text-white py-2 px-4 rounded-full ">Deletar conta</button>
        </div>
      </form>

    </>
  );
};


export default EditarPerfil;
