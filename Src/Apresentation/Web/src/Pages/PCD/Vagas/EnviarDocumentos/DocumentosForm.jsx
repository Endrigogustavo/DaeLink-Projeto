import React, { useState, useRef, useEffect } from "react";
import { doc, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../../../Database/Firebase";
import { useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import DocumentosStates from "./DocumentosStates";
import { FaFile } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";

const DocumentosForm = () => {
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);

    const {
        userId, setUserId,
        vagaUid, setVagaUid,
        nome, setNome,
        email, setEmail,
        telefone, setTelefone,
        endereco, setEndereco,
        idade, setIdade,
        objetivo, setObjetivo,
        experiencia1, setExperiencia1,
        formacao1a, setFormacao1a,
        formacao2a, setFormacao2a,
        formacao3a, setFormacao3a,
        qualificacao1, setQualificacao1,
        qualificacao2, setQualificacao2,
        qualificacao3, setQualificacao3,
        idiomas1, setIdiomas1,
        idiomas2, setIdiomas2,
        informatica, setInformatica,
        documento, setDocumento
    } = DocumentosStates();

    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const inputFileRef1 = useRef(null);
    const inputFileRef2 = useRef(null);
    const inputFileRef3 = useRef(null);

    const enderecoRef = useRef(null);
    const experienciaRef = useRef(null);

    const adjustTextareaHeight = (ref) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if (enderecoRef.current) {
            adjustTextareaHeight(enderecoRef); // Ajustar o textarea de endereço
        }
        if (experienciaRef.current) {
            adjustTextareaHeight(experienciaRef); // Ajustar o textarea de experiência
        }
    }, []);


    const handleFileChange1 = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile1(file);
            setFormacao1a(file);
            inputFileRef1.current.style.display = 'none';

        }
    };

    const handleFileChange2 = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile2(file);
            setFormacao2a(file);
            inputFileRef2.current.style.display = 'none';
        }
    };

    const handleFileChange3 = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile3(file);
            setFormacao3a(file);
            inputFileRef3.current.style.display = 'none';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Verifica se um arquivo foi selecionado
            if (!selectedFile1 && !selectedFile2 && !selectedFile3) {
                alert("Por favor, selecione pelo menos um documento para enviar.");
                return;
            }

            // Função para fazer o upload de um arquivo e obter sua URL
            const uploadFile = async (file) => {
                const storageRef = ref(storage, `documentos/${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            };

            // Obtemos a URL de download de todos os arquivos selecionados
            const downloadURLs = await Promise.all([
                selectedFile1 ? uploadFile(selectedFile1) : null,
                selectedFile2 ? uploadFile(selectedFile2) : null,
                selectedFile3 ? uploadFile(selectedFile3) : null,
            ]);

            // Referência para a coleção de candidatos
            const candidatosRef = collection(db, "Vagas", vagaUid, "candidatos");
            const QueryCandidatos = query(candidatosRef, where("userId", "==", userId));
            const ResultCandidatos = await getDocs(QueryCandidatos);

            if (!ResultCandidatos.empty) {
                const candidatoDoc = ResultCandidatos.docs[0];
                const candidatoId = candidatoDoc.id;
                const candidatoDocRef = doc(db, "Vagas", vagaUid, "candidatos", candidatoId);
                const documentosRef = collection(candidatoDocRef, "documentos");

                // Adiciona o documento à coleção de documentos do candidato
                await addDoc(documentosRef, {
                    nome,
                    endereco,
                    telefone,
                    email,
                    idade,
                    objetivo,
                    experiencia1,
                    formacao_academica1: selectedFile1 ? downloadURLs[0] : null,
                    formacao_academica2: selectedFile2 ? downloadURLs[1] : null,
                    formacao_academica3: selectedFile3 ? downloadURLs[2] : null,
                    qualificacao1,
                    qualificacao2,
                    qualificacao3,
                    idioma1: idiomas1,
                    idioma2: idiomas2,
                    informatica,
                    userId
                });

                alert("Documento adicionado com sucesso!");
                setSelectedFile1(null);
                setSelectedFile2(null);
                setSelectedFile3(null);
                setDocumento(null);
                navigate(`/homeuser/${userId}`);
            } else {
                console.error("Candidato não encontrado.");
                alert("Erro ao adicionar documento: candidato não encontrado.");
            }
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            alert("Erro ao adicionar documento.");
        }
    };


    return (
        <>
            <div className="h-64 w-full flex items-center justify-center">
                <div className='w-3/12 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                    <div className='w-2/6 h-full flex items-center justify-center'>
                        <FaFile className='text-5xl text-gray-900 text-center' />
                    </div>
                    <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                        <p className='font-medium text-lg text-center'>Envio de Documentos</p>
                        <p className='font-normal text-base text-left w-full'>
                            Coloque aqueles que comprovem sua Deficiência, Currículo, Diplomas...
                        </p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="h-fit w-full grid grid-cols-2 gap-y-2 items-center justify-items-center py-8">
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Nome</label>
                    <input
                        type="text"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        placeholder="Insira seu Nome Completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input
                        type="text"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent "
                        placeholder="Insira seu Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Telefone</label>
                    <input
                        type="text"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        placeholder="Insira seu Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Endereço</label>
                    <textarea
                        ref={enderecoRef}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent "
                        placeholder="Insira seu Endereço"
                        value={endereco}
                        onChange={(e) => {
                            setEndereco(e.target.value);
                            adjustTextareaHeight(enderecoRef);
                        }}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Idade</label>
                    <input
                        type="date"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium items-center flex gap-2">
                        Formações
                        <p className="opacity-80 text-sm">limite 3</p>
                    </label>
                    <div className="flex gap-2">
                        {/* Formacao 1 */}
                        <div>
                            <label
                                htmlFor="formacao1-input"
                                className={`h-fit py-3 px-3 border-2 border-blue-500 font-bold rounded-xl flex flex-col items-center justify-center cursor-pointer ${selectedFile1 ? 'w-32' : 'w-16'
                                    }`}
                            >
                                {selectedFile1 ? (
                                    <>
                                        <FaFile size={32} />
                                        <p className="truncate w-5/6">{selectedFile1.name}</p>
                                    </>
                                ) : (
                                    <IoAddCircleSharp size={32} />
                                )}
                            </label>
                            <input
                                id="formacao1-input"
                                type="file"
                                className='hidden'
                                accept=".pdf,.doc,.docx"
                                ref={inputFileRef1}
                                onChange={handleFileChange1}
                            />
                        </div>

                        {/* Formacao 2 */}
                        <div>
                            <label
                                htmlFor="formacao2-input"
                                className={`h-fit py-3 px-3 border-2 border-blue-500 font-bold rounded-xl flex flex-col items-center justify-center cursor-pointer ${selectedFile2 ? 'w-32' : 'w-16'
                                    }`}
                            >
                                {selectedFile2 ? (
                                    <>
                                        <FaFile size={32} />
                                        <p className="truncate  w-5/6"> {selectedFile2.name}</p>
                                    </>
                                ) : (
                                    <IoAddCircleSharp size={32} />
                                )}
                            </label>
                            <input
                                id="formacao2-input"
                                type="file"
                                className='hidden'
                                accept=".pdf,.doc,.docx"
                                ref={inputFileRef2}
                                onChange={handleFileChange2}
                            />
                        </div>

                        {/* Formacao 3 */}
                        <div>
                            <label
                                htmlFor="formacao3-input"
                                className={`h-fit py-3 px-3 border-2 border-blue-500 font-bold rounded-xl flex flex-col items-center justify-center cursor-pointer ${selectedFile3 ? 'w-32' : 'w-16'
                                    }`}>
                                {selectedFile3 ? (
                                    <>
                                        <FaFile size={32} />
                                        <p className="truncate w-5/6">{selectedFile3.name}</p>
                                    </>
                                ) : (
                                    <IoAddCircleSharp size={32} />
                                )}
                            </label>
                            <input
                                id="formacao3-input"
                                type="file"
                                className='hidden'
                                accept=".pdf,.doc,.docx"
                                ref={inputFileRef3}
                                onChange={handleFileChange3}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Experiências</label>
                    <textarea
                        ref={experienciaRef}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent"
                        placeholder="Fale brevemente de suas experiências profissionais"
                        value={experiencia1}
                        onChange={(e) => {
                            setExperiencia1(e.target.value);
                            adjustTextareaHeight(experienciaRef);
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="w-52 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all"
                >
                    Adicionar Documentos
                </button>
            </form>
        </>
    );
};

export default DocumentosForm;
