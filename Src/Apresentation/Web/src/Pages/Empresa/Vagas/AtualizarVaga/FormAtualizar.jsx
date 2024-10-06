import React, { useState, useEffect, useRef } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { MdWork } from "react-icons/md";
import './AtualizarVaga.css'

const FormEditarVaga = () => {
    const navigate = useNavigate();
    const { vagaId } = useParams();

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

    // Carregar as informações do usuário do banco de dados
    useEffect(() => {
        const getCompanyProfile = async () => {
            const CompanyDoc = doc(db, "Vagas", vagaId);
            const GetCompany = await getDoc(CompanyDoc);
            if (GetCompany.exists()) {
                setUserProfile(GetCompany.data());
            } else {
                alert("Sem documentos!");
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

            alert("Vaga atualizada com sucesso!");
            navigate(-1);
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            alert("Erro ao adicionar documento.");
        }
    };

    // Funções para atualizar o status da vaga
    const VagaPreenchida = async () => {
        try {
            const vagaRef = doc(db, "Vagas", vagaId);
            await updateDoc(vagaRef, {
                status: "Preenchida"
            });
            alert("Situação enviada com sucesso!");
            navigate(0); // Recarrega a página
        } catch (e) {
            console.error("Erro ao atualizar a situação: ", e);
            alert("Erro ao atualizar a situação.");
        }
    };

    const FecharVaga = async () => {
        try {
            const vagaRef = doc(db, "Vagas", vagaId);
            await updateDoc(vagaRef, {
                status: "Fechada"
            });
            alert("Situação enviada com sucesso!");
            navigate(0);
        } catch (e) {
            console.error("Erro ao atualizar a situação: ", e);
            alert("Erro ao atualizar a situação.");
        }
    };

    const AbrirVaga = async () => {
        try {
            const vagaRef = doc(db, "Vagas", vagaId);
            await updateDoc(vagaRef, {
                status: "Aberta"
            });
            alert("Situação enviada com sucesso!");
            navigate(0);
        } catch (e) {
            console.error("Erro ao atualizar a situação: ", e);
            alert("Erro ao atualizar a situação.");
        }
    };

    return (
        <>
            <div className="w-full h-64 flex items-center justify-center">
                <div className="h-52 w-80 rounded-3xl shadow-2xl flex flex-col items-center justify-center bg-white border-gray-500 border-2 gap-1 py-2">
                    <div className="w-full h-3/6 flex flex-col items-center justify-center mt-1">
                        <MdWork className='text-7xl text-gray-900 text-center bg-white p-4 rounded-full border-gray-500 border-2' />
                        <h1 className="font-bold text-center">Status: {userData.status}</h1>
                    </div>
                    <div className="w-full h-3/6 flex flex-col items-center justify-center gap-1 py-2 mb-2">

                        <button type="button" onClick={AbrirVaga} className="w-40 bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-full transition-all">
                            Abrir Vaga</button>
                        <button type="button" onClick={VagaPreenchida} className="w-40 bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-4 rounded-full transition-all">
                            Preencher</button>
                        <button type="button" onClick={FecharVaga} className="w-40 bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-4 rounded-full transition-all">
                            Fechar Vaga</button>
                    </div>
                </div>

            </div>
            <h1 className='font-bold text-2xl text-center'>Informações da Vaga</h1>
            <form onSubmit={handleSubmit} className="w-full h-fit p-4 editvaga-div gap-2">
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
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent"
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
                    <input
                        type="text"
                        name="tipo"
                        placeholder="tipo"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        value={userData.tipo}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col ">
                    <label className="text-lg font-medium">Detalhes</label>
                    <textarea
                        ref={textareaRefs.detalhes}
                        name="detalhes"
                        placeholder="detalhes"
                        value={userData.detalhes}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent"
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
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent"
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
