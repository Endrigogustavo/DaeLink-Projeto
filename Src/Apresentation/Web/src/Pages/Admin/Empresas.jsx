import React, { useState, useEffect, useRef } from "react";
import { doc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "./Modal"
import InputMask from 'react-input-mask';
import { MdExitToApp } from "react-icons/md";
import { BiSolidBusiness } from "react-icons/bi";

const EditarPerfil = () => {
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
    const getCompanyProfile = async () => {
      const id = localStorage.getItem("Empresa");
      const CompanyDoc = doc(db, "Empresa", id);
      const GetCompany = await getDoc(CompanyDoc);
      if (GetCompany.exists()) {
        setUserProfile(GetCompany.data());
        setRamosearch(userData.area)
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
      const id = localStorage.getItem("Empresa");
      const userDoc = doc(db, "Empresa", id);

      await updateDoc(userDoc, {
        cep: userData.cep,
        email: userData.email,
        name: userData.name,
        cnpj: userData.cnpj,
        endereco: userData.endereco,
        sobre: userData.sobre,
        area: userData.area,
        userId: id,
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

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Controle de visibilidade do dropdown
  const dropdownRef = useRef(null);
  const [ramosearch, setRamosearch] = useState("");

  const ramos = [
    "Alimentação",
    "Automotivo",
    "Comércio",
    "E-commerce",
    "Educação",
    "Entretenimento",
    "Entretenimento Digital",
    "Esportes",
    "Finanças",
    "Logística",
    "Marketing Digital",
    "Moda",
    "Saúde e Bem-Estar",
    "Segurança",
    "Tecnologia",
    "Tecnologia da Informação",
    "Varejo",
  ];

  // Filtra as áreas com base na busca
  const filteredAreas = ramos.filter((area) =>
    area.toLowerCase().includes(ramosearch.toLowerCase())
  );

  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownVisible(false);
    }
  };

  const handleSelectArea = (selectedArea) => {
    setRamosearch(selectedArea); // Atualiza o input com o valor selecionado
    setIsDropdownVisible(false); // Esconde o dropdown após a seleção
    handleInputChange({ target: { name: 'area', value: selectedArea } });
  };

  useEffect(() => {
    if (userData.area) {
      setRamosearch(userData.area);
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
          <h1 className='font-bold text-2xl text-white'>Editar Empresa </h1>
        </div>
      </div>

      <div className='h-fit w-full flex items-center justify-center gap-4'>
        <img
          src={userData.imageUrl}
          alt=""
          className='w-32 h-32 rounded-3xl shadow-2xl border-4 border-blue-600 object-cover'
        />

        <div className='h-fit w-fit flex flex-col justify-center items-center gap-2'>
          <BiSolidBusiness className='text-8xl text-gray-900 text-center bg-white p-4 rounded-full shadow-2xl' />
          <p className='font-semibold text-base text-center'>{userData.name || 'Carregando...'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full z-40 h-fit p-4 editvaga-div gap-2 ">

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
          <label className="text-lg font-medium">CEP</label>
          <InputMask
            required
            mask="99999-999"
            name="cep"
            value={userData.cep}
            onChange={handleInputChange}
            className={`w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent `}
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

        <div className="flex flex-col w-80 relative">
          <label className="text-lg font-medium">Ramo da Empresa</label>
          <input
            type="text"
            placeholder="Digite para filtrar a área"
            name="area"
            value={ramosearch}
            onChange={(e) => {
              setRamosearch(e.target.value);
              handleSelectArea(e.target.value);
              setIsDropdownVisible(e.target.value.length > 0 && filteredAreas.length > 0);
            }}
            onFocus={() => setIsDropdownVisible(ramosearch.length > 0 && filteredAreas.length > 0)}
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

        <button type="submit" className="w-48 h-12 bg-blue-700 hover:bg-blue-500 transition-all text-white py-2 px-4 rounded-full ">Atualizar Empresa</button>
      </form>

    </>
  );
};

export default EditarPerfil;
