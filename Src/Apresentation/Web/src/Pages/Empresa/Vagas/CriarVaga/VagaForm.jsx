import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import Modal from '../../Modal/Modal';

import axios from 'axios'
const VagaForm = () => {
    //Pegar o id do usuario na tela anterior

    //Variaveis para enviar os dados para o banco
    const [vaga, setVaga] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [salario, setSalario] = useState("");
    const [exigencias, setExigencias] = useState("");
    const [area, setArea] = useState("");
    const [local, setLocal] = useState("");
    const [tipo, setTipo] = useState("");
    const [userProfile, setUserProfile] = useState(null);
    const [userId, setUserId] = useState("");
    const [empresaId] = useState(userId);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);



    const textareaRefs = {
        exigencias: useRef(null),
        area: useRef(null),
        detalhes: useRef(null),
    };

    // Função para ajustar a altura dos textareas
    const adjustTextareaHeight = (ref) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    //Função de navegação do site
    const navigate = useNavigate();

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const getPCDprofile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-company', { withCredentials: true });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error.response ? error.response.data : error.message);
            }
            
        };
        getPCDprofile();

    }, []);

    useEffect(() => {
        if (userProfile) {
            setEmpresa(userProfile.name || '');
            setLocal(userProfile.endereco || '');
        }
    }, [userProfile]);


    //Botão de registrar vaga
    const handleRegister = async (event) => {
        event.preventDefault();
        const user = auth.currentUser;
        //Função registrar vaga que esta no Auth.jsx enviando parametros do form

        axios.post('http://localhost:3000/criarvaga/', { tipo, empresa, detalhes, salario, exigencias, area, local, vaga, empresaId }, { withCredentials: true })
            .then(res => {
                setWorksModal(true)
                setModalMessage("Vaga criada com Sucesso")
                setModalOpen(true)
                setTimeout(() => {
                    navigate(`/processos`);
                }, 4000);
            })
            .catch(err => {
                console.log(err)
                setWorksModal(true)
                setModalMessage("Erro ao criar Vaga")
                setModalOpen(true)
                setTimeout(() => {
                    setWorksModal(false)
                }, 4000);
            })
    };

    const HandleCancel = (e) => {
        e.preventDefault(); // Impede o envio do formulário
        navigate(-1); // Navega para a página anterior
    }


    return (
        <>
            <div>
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
            </div>

            <div className='w-full h-36 flex items-center justify-center'>
                <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gray-900 border-2 items-center justify-center px-5'>
                    <h1 className='font-bold text-2xl text-white'>Criar Vaga</h1>
                </div>
            </div>
            <div className="h-fit w-full grid grid-cols-2 gap-y-2 items-center justify-items-center py-8 form-gridadjust">

                <div className="flex flex-col ">
                    <label className="text-lg font-medium">Cargo</label>
                    <input
                    required
                        type="text"
                        name="vaga"
                        placeholder="Digite o nome da Vaga"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        value={vaga}
                        onChange={(e) => {
                            setVaga(e.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-col ">
                    <label className="text-lg font-medium">Detalhes</label>
                    <textarea
                        ref={textareaRefs.detalhes}
                        name="detalhes"
                        placeholder="Descreva a vaga"
                        value={detalhes}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                        onChange={(e) => {
                            setDetalhes(e.target.value);
                            adjustTextareaHeight(textareaRefs.detalhes);
                        }}
                    />
                </div>

                <div className="flex flex-col ">
                    <label className="text-lg font-medium">Área</label>
                    <textarea
                        ref={textareaRefs.area}
                        name="area"
                        placeholder="Selecione a área dessa vaga"
                        value={area}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                        onChange={(e) => {
                            setArea(e.target.value);
                            adjustTextareaHeight(textareaRefs.area);
                        }}
                    />
                </div>

                <input
                required
                    type="text"
                    placeholder="Nome da empresa"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    readOnly
                    hidden
                />


                <div className="flex flex-col ">
                    <label className="text-lg font-medium">Salário</label>
                    <input
                    required
                        type="number"
                        placeholder="Apenas Números"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        value={salario}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Permite apenas números
                            if (!isNaN(value) && value.trim() !== '') {
                                setSalario(value);
                            } else {
                                setSalario("Apenas Números")
                            }
                        }}
                    />
                </div>


                <div className="flex flex-col">
                    <label className="text-lg font-medium">Tipo</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                    >
                        <option value="" disabled>Selecione o tipo</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Online">Online</option>
                        <option value="Híbrido">Híbrido</option>
                    </select>
                </div>

                <div className="flex flex-col ">
                    <label className="text-lg font-medium">Endereço</label>
                    <input
                    required
                        type="text"
                        placeholder="Insira o endereço da empresa"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent overflow-y-hidden"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                    />
                </div>

                <div className="flex flex-col ">
                    <label className="text-lg font-medium">Exigências</label>
                    <textarea
                        ref={textareaRefs.exigencias}
                        name="exigencias"
                        placeholder="Fale as suas necessidades"
                        value={exigencias}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                        onChange={(e) => {
                            setExigencias(e.target.value);
                            adjustTextareaHeight(textareaRefs.exigencias);
                        }}
                    />
                </div>

                <div className="flex gap-2">
                    <button onClick={handleRegister} className='w-32 h-12 bg-blue-500 hover:bg-blue-700 transition-all text-white py-2 px-4 rounded-full'
                    >Registrar</button>
                    <button onClick={HandleCancel} className="w-32 h-12 bg-red-500 hover:bg-red-700 transition-all text-white py-2 px-4 rounded-full"
                    > Cancelar</button>
                </div>
            </div>

        </>
    );
};

export default VagaForm;
