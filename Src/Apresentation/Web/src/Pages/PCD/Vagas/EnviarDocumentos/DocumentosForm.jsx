import React, { useState, useRef, useEffect,useCallback } from "react";
import { doc, collection, addDoc, getDocs, query, where, getDoc } from "firebase/firestore";
import { db, storage } from "../../../../Database/Firebase";
import { useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import DocumentosStates from "./DocumentosStates";
import { FaFile } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";
import InputMask from 'react-input-mask';
import './FormGrid.css'
import axios from "axios";
import Modal from "../../Modal/Modal";

const DocumentosForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
    const [isLoading, setIsLoading] = useState(false);
    const [pessoaId, setPessoaId] = useState(null);
    const [Doclist, setDoclistState] = useState(false);
    const doclistRef = useRef(null);

    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const toggleDropdown = (index) => {
        setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleClickOutside = useCallback((event) => {
        // Verifica se o clique está fora da referência
        if (doclistRef.current && !doclistRef.current.contains(event.target)) {
            setActiveDropdownIndex(null); // Fecha o dropdown ao clicar fora
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside); // Detecta clique fora do Doclist
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Limpa o ouvinte ao desmontar o componente
        };
    }, [handleClickOutside]);

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
        idiomas, setIdiomas,
        documento, setDocumento
    } = DocumentosStates();

    const navigate = useNavigate();
    const inputFileRefs = [useRef(null), useRef(null), useRef(null)];
    const [fileNames, setFileNames] = useState(["", "", ""]); // Armazena os nomes dos arquivos
    const enderecoRef = useRef(null);
    const experienciaRef = useRef(null);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);

    useEffect(() => {
        const getInfoPCD = async () => {
            const storedUserId = await axios.get('http://localhost:3000/getcookie', { withCredentials: true });

            if (storedUserId) {
                setUserId(storedUserId.data)
                const PCDDoc = await getDoc(doc(db, "PCD", storedUserId.data));
                if (PCDDoc.exists()) {
                    setPessoaId({ id: PCDDoc.id, ...PCDDoc.data() });
                } else {
                    console.log("Pessoa não encontrada!");
                }
            }
        };

        getInfoPCD();
    }, [setUserId]);

    useEffect(() => {
        if (pessoaId) {
            setNome(pessoaId.name || '');
            setEmail(pessoaId.email || '');
            setTelefone(pessoaId.telefone || '');
            setEndereco(pessoaId.endereco || '');
            setIdade(pessoaId.idade || '');
            setExperiencia1(pessoaId.experiencias || '');
            setIdiomas(pessoaId.idiomas || '');
        }
    }, [pessoaId, setNome, setEmail, setTelefone, setEndereco, setIdade, setExperiencia1, setIdiomas]);

    const adjustTextareaHeight = (ref) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight(enderecoRef);
        adjustTextareaHeight(experienciaRef);
    }, []);

    const handleFileChange = (index) => (e) => {
        const file = e.target.files[0];
        const filesize = e.target.files[0].size / 1024 / 1024
        if (file) {
            if (filesize > 25) {
                setWorksModal(false)
                setModalMessage("Arquivo maior de 25MB")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
            } else {
                const updatedFiles = [...selectedFiles];
                updatedFiles[index] = file;
                setSelectedFiles(updatedFiles);

                const updatedFileNames = [...fileNames];
                updatedFileNames[index] = file.name;
                setFileNames(updatedFileNames);

                inputFileRefs[index].current.style.display = 'none'; // Esconde o input
            }

        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (selectedFiles.every(file => !file)) {
                setWorksModal(false)
                setModalMessage("Arquivo maior de 25MB")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
            }

            const uploadFile = async (file) => {
                const storageRef = ref(storage, `documentos/${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            };

            const downloadURLs = await Promise.all(selectedFiles.map(file => file ? uploadFile(file) : null));

            const candidatosRef = collection(db, "Vagas", vagaUid, "candidatos");
            const QueryCandidatos = query(candidatosRef, where("userId", "==", userId));
            const ResultCandidatos = await getDocs(QueryCandidatos);

            if (!ResultCandidatos.empty) {
                const candidatoDoc = ResultCandidatos.docs[0];
                const candidatoDocRef = doc(db, "Vagas", vagaUid, "candidatos", candidatoDoc.id);
                const documentosRef = collection(candidatoDocRef, "documentos");

                await addDoc(documentosRef, {
                    nome,
                    endereco,
                    telefone,
                    email,
                    idade,
                    objetivo,
                    experiencia1,
                    formacao_academica1: selectedFiles[0] ? downloadURLs[0] : null,
                    formacao_academica2: selectedFiles[1] ? downloadURLs[1] : null,
                    formacao_academica3: selectedFiles[2] ? downloadURLs[2] : null,
                    idiomas,
                    userId
                });

                setWorksModal(true)
                setModalMessage("Documento adicionado com sucesso!")
                setModalOpen(true)
                setTimeout(() => {
                    setSelectedFiles([null, null, null]);
                    setDocumento(null);
                    navigate(`/homeuser`);
                }, 4000);

            } else {
                console.error("Candidato não encontrado.");
                setWorksModal(false)
                setModalMessage("Candidato não encontrado.")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false)
                }, 2200);
            }
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            setWorksModal(false)
            setModalMessage("Erro ao adicionar documento.")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 2200);
        } finally {
            setIsLoading(false);
        }
    };

    const renderFileNameWithExtension = (fileName) => {
        const maxNameLength = 10; // Ajuste para limitar o nome a um certo número de caracteres
        const [name, extension] = fileName.split(/(?=\.[^.]+$)/);

        // Corta o nome se ultrapassar o limite
        const displayName = name.length > maxNameLength
            ? name.substring(0, maxNameLength) + ""
            : name;

        return (
            <p className="text-xs break-words text-center font-semibold normal-case">
                {displayName} {extension}
            </p>
        );
    };

    const Doclistdropdown = () => {
        setDoclistState(true)

    }

    return (
        <>
            <div>
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
            </div>

            <div className="h-64 w-full flex items-center justify-center">
                <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                    <div className='w-2/6 h-full flex items-center justify-center'>
                        <FaFile className='text-5xl text-gray-900 text-center' />
                    </div>
                    <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                        <p className='font-medium text-lg text-center'>Documentos</p>
                        <p className='font-normal text-base text-center w-full'>
                            Envie seus certificados, conforme a vaga.
                        </p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="h-fit w-full grid grid-cols-2 gap-y-2 items-center justify-items-center py-8 form-gridadjust">
                {[
                    { label: "Nome", type: "text", value: nome, setter: setNome, placeholder: "Insira seu Nome Completo", readOnly: true },
                    { label: "Email", type: "email", value: email, setter: setEmail, placeholder: "Insira seu Email", readOnly: true },
                    { label: "Telefone", type: "masked", value: telefone, setter: setTelefone, placeholder: "Insira seu telefone", InputComponent: InputMask, mask: "(99) 99999-9999" },
                    { label: "Endereço", type: "textarea", value: endereco, setter: setEndereco, ref: enderecoRef, placeholder: "Insira seu Endereço" },
                    { label: "Idade", type: "date", value: idade, setter: setIdade },
                    { label: "Experiências", type: "textarea", value: experiencia1, setter: setExperiencia1, ref: experienciaRef, placeholder: "Insira suas Experiências" },
                    { label: "Objetivo", type: "text", value: objetivo, setter: setObjetivo, placeholder: "Insira seu Objetivo" },
                ].map((input, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="text-lg font-medium">{input.label}</label>
                        {input.type === "masked" ? (
                            <InputMask
                                mask={input.mask}
                                value={input.value}
                                onChange={(e) => input.setter(e.target.value)}
                                className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                placeholder={input.placeholder}
                                required
                            />
                        ) : input.type === "textarea" ? (
                            <textarea
                                ref={input.ref}
                                value={input.value}
                                onChange={(e) => {
                                    input.setter(e.target.value);
                                    adjustTextareaHeight(input.ref);
                                }}
                                className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                                placeholder={input.placeholder}
                                required
                            />
                        ) : (
                            <input
                                type={input.type}
                                value={input.value}
                                onChange={(e) => input.setter(e.target.value)}
                                className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                placeholder={input.placeholder}
                                readOnly={input.readOnly} // Torna o campo apenas leitura
                                required
                            />
                        )}
                    </div>
                ))}
                {/* Idioma Secundário */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Idioma Secundário</label>
                    <select
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        value={idiomas}
                        onChange={(e) => setIdiomas(e.target.value)}
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="Inglês">Inglês</option>
                        <option value="Espanhol">Espanhol</option>
                        <option value="Francês">Francês</option>
                    </select>
                </div>

                {/* Inputs de Documentos */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium items-center flex gap-2">
                        Formações
                        <p className="opacity-80 text-sm">Max 3</p>
                    </label>
                    <div className="flex gap-2">
                        {["1º Documento", "2º Documento", "3º Documento"].map((label, index) => (
                            <div key={index} className="flex flex-col relative">
                                <label
                                    htmlFor={fileNames[index] ? '' : inputFileRefs[index].current?.id}
                                    className={`h-fit shadow-2xl rounded-2xl flex border-gray-400 border-2 relative 
                                    flex flex-col items-center justify-center cursor-pointer ${fileNames[index] ? ' w-28 h-24 text-wrap overflow-hidden ' : 'w-16 py-3 px-1'
                                        }`}
                                        onClick={fileNames[index] ? () => toggleDropdown(index) : undefined}
                                >
                                    {fileNames[index] ? (
                                        <>
                                            <div className="w-full h-3/6 flex items-center justify-center">
                                                <FaFile size={28} className="text-blue-900" />
                                            </div>
                                            <div className="w-full h-2/6 flex items-center justify-center overflow-hidden">
                                                {renderFileNameWithExtension(fileNames[index])}
                                            </div>
                                        </>
                                    ) : (
                                        <IoAddCircleSharp size={32} />
                                    )}
                                </label>
                                <input
                                    id={`input-file-${index}`}
                                    type="file"
                                    accept=".pdf,.doc,.docx,.png,.jpg"
                                    ref={inputFileRefs[index]}
                                    onChange={handleFileChange(index)}
                                    hidden
                                />

                                {/* Dropdown de opções */}
                                {activeDropdownIndex === index && ( // Apenas exibe o dropdown se o índice ativo corresponder
                                    <ul
                                        className="border border-gray-300 rounded-lg bg-white absolute left-full ml-2 mt-1 z-20 w-40 shadow-lg"
                                        ref={doclistRef}
                                    >
                                        <li
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => {
                                                // Permitir seleção de novo arquivo (Edit)
                                                inputFileRefs[index].current?.click();
                                            }}
                                        >
                                            Editar
                                        </li>
                                        <li
                                            className="p-2 cursor-pointer hover:bg-gray-200 text-red-600"
                                            onClick={() => {
                                                const updatedFiles = [...selectedFiles];
                                                updatedFiles[index] = null;
                                                setSelectedFiles(updatedFiles);
                                                const updatedFileNames = [...fileNames];
                                                updatedFileNames[index] = '';
                                                setFileNames(updatedFileNames);
                                                setActiveDropdownIndex(null); // Fecha o dropdown após excluir
                                            }}
                                        >
                                            Excluir
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isLoading ? "Enviando..." : "Enviar Documentos"}
                </button>
            </form>
        </>
    );
};

export default DocumentosForm;
