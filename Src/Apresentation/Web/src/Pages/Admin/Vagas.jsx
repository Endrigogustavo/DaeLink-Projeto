import React, { useState, useEffect, useRef } from "react";
import { doc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "./Modal"
import { MdExitToApp } from "react-icons/md";


const EditarVaga = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);

  // Função de navegação do site
  const navigate = useNavigate();
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

  // Carregar as informações do usuário do banco de dados
  useEffect(() => {
    const vagaId = localStorage.getItem("Vaga");
    const getCompanyProfile = async () => {
      const CompanyDoc = doc(db, "Vagas", vagaId);
      const GetCompany = await getDoc(CompanyDoc);
      if (GetCompany.exists()) {
        setUserProfile(GetCompany.data());
      } else {
        setUserProfile(null);
        alert("Sem documentos!");
      }
    };
    getCompanyProfile();
  }, []);


  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vagaId = localStorage.getItem("Vaga");
      const userDoc = doc(db, "Vagas", vagaId);

      await updateDoc(userDoc, {
        area: userData.area,
        detalhes: userData.detalhes,
        empresa: userData.empresa,
        exigencias: userData.exigencias,
        local: userData.local,
        salario: userData.salario,
        tipo: userData.tipo,
        vaga: userData.vaga,
      });

      setWorksModal(true)
      setModalMessage("Vaga atualizada com sucesso!")
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
  };

  const textareaRefs = {
    exigencias: useRef(null),
    area: useRef(null),
    detalhes: useRef(null),
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
          <h1 className='font-bold text-2xl text-white'>Editar Vaga </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full z-40 h-fit p-4 editvaga-div gap-2">
        <div className="flex flex-col ">
          <label className="text-lg font-medium">Cargo</label>
          <input
            type="text"
            name="vaga"
            placeholder="vaga"
            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
            value={userData.vaga}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col ">
          <label className="text-lg font-medium">Área</label>
          <textarea
            ref={textareaRefs.area}
            name="area"
            placeholder="area"
            value={userData.area}
            className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
            onChange={(e) => {
              handleInputChange(e);
              adjustTextareaHeight(textareaRefs.area);
            }}
          />
        </div>

        <div className="flex flex-col ">
          <label className="text-lg font-medium">Local</label>
          <input
            type="text"
            name="local"
            placeholder="local"
            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
            value={userData.local}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col ">
          <label className="text-lg font-medium">Salário</label>
          <input
            type="text"
            name="salario"
            placeholder="salario"
            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
            value={userData.salario}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col ">
          <label className="text-lg font-medium">Tipo</label>
          <select
            name="tipo"
            value={userData.tipo}
            onChange={handleInputChange}
            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
          >
            <option value="" disabled>Selecione o tipo</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Online">Online</option>
            <option value="Presencial">Presencial</option>
          </select>
        </div>

        <div className="flex flex-col ">
          <label className="text-lg font-medium">Detalhes</label>
          <textarea
            ref={textareaRefs.detalhes}
            name="detalhes"
            placeholder="detalhes"
            value={userData.detalhes}
            className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
            onChange={(e) => {
              handleInputChange(e);
              adjustTextareaHeight(textareaRefs.detalhes);
            }}
          />
        </div>

        <div className="flex flex-col ">
          <label className="text-lg font-medium">Exigências</label>
          <textarea
            ref={textareaRefs.exigencias}
            name="exigencias"
            placeholder="exigencias"
            value={userData.exigencias}
            className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
            onChange={(e) => {
              handleInputChange(e);
              adjustTextareaHeight(textareaRefs.exigencias);
            }}
          />
        </div>

        <button type="submit" className="w-40 h-12 bg-blue-700 hover:bg-blue-500 transition-all text-white py-2 px-4 rounded-full">
          Atualizar Vaga</button>
      </form>
    </>
  );
};

export default EditarVaga;
