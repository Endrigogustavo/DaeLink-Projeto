import React, { useState, useEffect, useRef } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { MdWork } from "react-icons/md";
import './AtualizarVaga.css'
import MenuVagas from "./MenuVagas";
import Modal from "../../Modal/Modal";

const FormEditarVaga = () => {
    const navigate = useNavigate();
    const [vagaId, setVaga] = useState("")
    // Informações do usuário
    const [userData, setUserProfile] = useState({
        vaga: '',
        area: '',
        detalhes: '',
        empresa: '',
        exigencias: '',
        local: '',
        salario: '',
        tipo: '',
        status: ''
    });

    // Referências para os textareas
    const textareaRefs = {
        exigencias: useRef(null),
        area: useRef(null),
        detalhes: useRef(null),
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);

    // Carregar as informações do usuário do banco de dados
    useEffect(() => {
        const getCompanyProfile = async () => {
            const vagaId = localStorage.getItem("vagaId");
            setVaga(vagaId)
            const CompanyDoc = doc(db, "Vagas", vagaId);
            const GetCompany = await getDoc(CompanyDoc);
            if (GetCompany.exists()) {
                setUserProfile(GetCompany.data());
            } else {

            }
        };
        getCompanyProfile();
    }, [vagaId]);

    // Função para ajustar a altura dos textareas
    const adjustTextareaHeight = (ref) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        Object.values(textareaRefs).forEach(adjustTextareaHeight);
    }, [userData]);

    // Função para lidar com as mudanças nos inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const HandleCancel = (e) => {
        e.preventDefault(); // Impede o envio do formulário
        navigate(-1); // Navega para a página anterior
    }

    // Botão para guardar as informações no banco
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDoc = doc(db, "Vagas", vagaId);

            await updateDoc(userDoc, {
                ...userData,
            });

            setWorksModal(true)
            setModalMessage("Vaga Atualizada com sucesso.")
            setModalOpen(true)
            setTimeout(() => {
                navigate(-1);
            }, 4000);
        } catch (e) {
            console.error("Erro ao atualizar vaga: ", e);
            setWorksModal(false)
            setModalMessage("Erro ao atualizar vaga")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 4000);
        }
    };

    // Funções para atualizar o status da vaga
    const VagaPreenchida = async () => {
        try {
            const vagaRef = doc(db, "Vagas", vagaId);
            await updateDoc(vagaRef, {
                status: "Preenchida"
            });
            setWorksModal(true)
            setModalMessage("Situação Atualizada com Sucesso")
            setModalOpen(true)
            setTimeout(() => {
                navigate(0);
            }, 4000);
        } catch (e) {
            console.error("Erro ao atualizar a situação: ", e);
            setWorksModal(false)
            setModalMessage("Erro ao atualizar situação")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 4000);
        }
    };

    const FecharVaga = async () => {
        try {
            const vagaRef = doc(db, "Vagas", vagaId);
            await updateDoc(vagaRef, {
                status: "Fechada"
            });
            setWorksModal(true)
            setModalMessage("Situação Atualizada com Sucesso")
            setModalOpen(true)
            setTimeout(() => {
                navigate(0);
            }, 4000);
        } catch (e) {
            console.error("Erro ao atualizar a situação: ", e);
            setWorksModal(false)
            setModalMessage("Erro ao atualizar situação")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 4000);
        }
    };

    const AbrirVaga = async () => {
        try {
            const vagaRef = doc(db, "Vagas", vagaId);
            await updateDoc(vagaRef, {
                status: "Aberta"
            });
            setWorksModal(true)
            setModalMessage("Situação Atualizada com Sucesso")
            setModalOpen(true)
            setTimeout(() => {
                navigate(0);
            }, 4000);

        } catch (e) {
            console.error("Erro ao atualizar a situação: ", e);
            setWorksModal(false)
            setModalMessage("Erro ao atualizar situação")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 4000);
        }
    };

    return (
        <>
            <div>
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
            </div>

            <MenuVagas AbrirVaga={AbrirVaga} VagaPreenchida={VagaPreenchida} FecharVaga={FecharVaga} />

            <div className='w-full h-36 flex items-center justify-center'>
                <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gradient-to-br from-gray-900 to-gray-800 border-2 items-center justify-center px-5'>
                    <h1 className='font-bold text-2xl text-white'>Editar Vaga </h1>
                </div>
            </div>
            <h1 className='font-bold text-2xl text-center'>Situação: {userData.status}</h1>
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

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="w-32 h-12 bg-blue-500 hover:bg-blue-700 transition-all text-white py-2 px-4 rounded-full"
                    >
                        Editar
                    </button>

                    <button
                        onClick={HandleCancel}
                        className="w-32 h-12 bg-red-500 hover:bg-red-700 transition-all text-white py-2 px-4 rounded-full"
                    >
                        Cancelar
                    </button>
                </div>
            </form>


        </>
    );
};

export default FormEditarVaga;
