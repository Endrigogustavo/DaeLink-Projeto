import React, { useState, useRef, useEffect, useCallback } from "react";
import { doc, collection, updateDoc, getDocs, query, where, deleteDoc, getDoc } from "firebase/firestore";
import { db, storage, auth } from "../../../../Database/Firebase";
import { useNavigate, useParams } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import DocumentosStates from "./DocumentosStates";
import { FaFile } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from "axios";
import Modal from "../../Modal/Modal";
import InputMask from 'react-input-mask';
import Navbar from "../../Navbar/Navbar";

const DocumentosForm = () => {

    const [idDoc, setDoc] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
    const [fileNames, setFileNames] = useState(["", "", ""]);
    const inputFileRefs = [useRef(null), useRef(null), useRef(null)];
    const [userUid, setUserUid] = useState(null)
    const [docProfile, setDocProfile] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        idade: '',
        experiencia1: '',
        idiomas: '',
    });


    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);

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
        formacao1a, setFormacao1a,
        formacao2a, setFormacao2a,
        formacao3a, setFormacao3a,
        idiomas, setIdiomas,
        documento, setDocumento
    } = DocumentosStates();

    const navigate = useNavigate();

    const enderecoRef = useRef(null);
    const experienciaRef = useRef(null);

    const adjustTextareaHeight = (ref) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        const getInfoPCD = async () => {
            const doc = localStorage.getItem('IdDoc');
            if (doc) {
                const userId = doc;
                setDoc(userId)
            }
            const storedUserId = await axios.get('http://localhost:3000/getcookie', { withCredentials: true });
            setUserId(storedUserId.data)
            if (storedUserId) {
                const userId = storedUserId.data;
                setUserId(userId)

                const PCDDoc = await getDoc(collection(db, "PCD", userId));

                const PCDData = { id: PCDDoc.id, ...PCDDoc.data() };
                setPessoaId(PCDData);
            }

        };

        getInfoPCD();
    }, [userId]);


    useEffect(() => {
        if (enderecoRef.current) {
            adjustTextareaHeight(enderecoRef); // Ajustar o textarea de endereço
        }
        if (experienciaRef.current) {
            adjustTextareaHeight(experienciaRef); // Ajustar o textarea de experiência
        }
    }, []);

    useEffect(() => {
        const getDocPCD = async () => {
            try {
                const vagaId = localStorage.getItem('vagaId');
                const candidatoDoc = localStorage.getItem('candidatoDoc');
                const IdDoc = localStorage.getItem('IdDoc');
                const response = await axios.post(`http://localhost:3000/get-doc/`, { vagaId, candidatoDoc, IdDoc }, { withCredentials: true });

                console.log('Resposta recebida:', response.data); // Adiciona esse log para inspecionar a resposta

                setDocProfile(response.data);

                // Verificando se as respostas contêm referências de arquivos ou URLs
                const fileRefs = [
                    response.data.formacao_academica1,
                    response.data.formacao_academica2,
                    response.data.formacao_academica3
                ];

                console.log('Referências de arquivos:', fileRefs); // Verificando as referências de arquivos

                // Se os arquivos forem referências de Firebase ou URLs
                const fetchFileNames = async () => {
                    const names = await Promise.all(fileRefs.map(async (fileRef) => {
                        if (fileRef && fileRef.getMetadata) {
                            const metadata = await fileRef.getMetadata(); // Se for uma referência de arquivo, pegar os metadados
                            console.log('Metadados:', metadata); // Verifique os metadados
                            return metadata.name;
                        } else if (fileRef && fileRef.name) {
                            // Se for um arquivo direto com nome
                            return fileRef.name;
                        }
                        return 'Nome não disponível';
                    }));

                    console.log('Arquivo:', names); // Exibindo os nomes dos arquivos
                    setFileNames(names);
                };

                fetchFileNames();

                setSelectedFiles(fileRefs);
            } catch (error) {
                console.error("Erro ao buscar documentos:", error);
                setWorksModal(false);
                setModalMessage("Ocorreu um erro ao buscar documentos.");
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
            }
        };

        getDocPCD();
    }, []); // Dependências podem ser ajustadas conforme necessário, por exemplo, `vagaUid` e `userId`



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDocProfile(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Verifica se um arquivo foi selecionado
            if (!selectedFiles.some(file => file !== null)) {
                setWorksModal(false)
                setModalMessage("Selecione pelo menos um documento para enviar.")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false)
                    return;
                }, 2200);

            }

            // Função para fazer o upload de um arquivo e obter sua URL
            const uploadFile = async (file) => {
                const storageRef = ref(storage, `documentos/${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            };

            // Obtemos a URL de download de todos os arquivos selecionados
            const downloadURLs = await Promise.all(
                selectedFiles.map(file => file ? uploadFile(file) : null)
            );

            // Referência para a coleção de candidatos
            const candidatosRef = collection(db, "Vagas", vagaUid, "candidatos");
            const QueryCandidatos = query(candidatosRef, where("userId", "==", userId));
            const ResultCandidatos = await getDocs(QueryCandidatos);

            if (!ResultCandidatos.empty) {
                const candidatoDoc = ResultCandidatos.docs[0];
                const candidatoId = candidatoDoc.id;
                const candidatoDocRef = doc(db, "Vagas", vagaUid, "candidatos", candidatoId);
                const documentoDocRef = doc(candidatoDocRef, "documentos", idDoc);


                // Adiciona o documento à coleção de documentos do candidato
                await updateDoc(documentoDocRef, {
                    nome: docProfile.nome,
                    endereco: docProfile.endereco,
                    telefone: docProfile.telefone,
                    email: docProfile.email,
                    idade: docProfile.idade,
                    objetivo: docProfile.objetivo,
                    experiencia1: docProfile.experiencia1,
                    formacao_academica1: selectedFiles[0] ? downloadURLs[0] : null,
                    formacao_academica2: selectedFiles[1] ? downloadURLs[1] : null,
                    formacao_academica3: selectedFiles[2] ? downloadURLs[2] : null,
                    idiomas: docProfile.idiomas,
                    userId
                });

                setWorksModal(true)
                setModalMessage("Documento atualizado com sucesso!")
                setModalOpen(true)
                setTimeout(() => {
                    setSelectedFiles([null, null, null]);
                    setDocumento(null);
                    navigate(`/processos`);
                }, 2200);

            } else {
                console.error("Candidato não encontrado.");
                setWorksModal(false)
                setModalMessage("Candidato não encontrado")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false)
                }, 2200);

            }
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            setWorksModal(false)
            setModalMessage("Erro ao adicionar documento")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 2200);
        }
    };

    const DeletarDoc = async () => {

        try {
            const candidatosRef = collection(db, "Vagas", vagaUid, "candidatos");
            const QueryCandidatos = query(candidatosRef, where("userId", "==", userId));
            const ResultCandidatos = await getDocs(QueryCandidatos);
            const candidatoDoc = ResultCandidatos.docs[0];
            const candidatoId = candidatoDoc.id;
            const candidatoDocRef = doc(db, "Vagas", vagaUid, "candidatos", candidatoId);
            const documentoDocRef = doc(candidatoDocRef, "documentos", idDoc);
            await deleteDoc(documentoDocRef)

            setWorksModal(true)
            setModalMessage("Documento deletado com sucesso")
            setModalOpen(true)
            setTimeout(() => {
                navigate(`/homeuser`);
            }, 4000);

        } catch (error) {
            console.log(error)
            setWorksModal(false)
            setModalMessage("Erro ao deletar documento")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 2200);
        }
    }

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

    const handleFileChange = (index) => (e) => {
        const file = e.target.files[0];
        const filesize = file.size / 1024 / 1024;
        if (file) {
            if (filesize > 25) {
                setWorksModal(false);
                setModalMessage("Arquivo maior de 25MB");
                setModalOpen(true);
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

                inputFileRefs[index].current.style.display = 'none'; // Hide the input after selecting the file
            }
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
            </div>

            <div className="h-64 w-full flex items-center justify-center">
                <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                    <div className='w-2/6 h-full flex items-center justify-center'>
                        <FaFile className='text-5xl text-gray-900 text-center' />
                    </div>
                    <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                        <p className='font-medium text-lg text-center'>Atualização de Documentos</p>
                        <p className='font-normal text-base text-left w-full'>
                            Modifique conforme as atualizações.
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
                        name="nome"
                        value={docProfile.nome}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input
                        type="text"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent "
                        placeholder="Insira seu Email"
                        value={docProfile.email}
                        name="email"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Telefone</label>
                    <InputMask
                        type="text"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        placeholder="Insira seu Telefone"
                        value={docProfile.telefone
                        }
                        mask="(99) 99999-9999"
                        name="telefone"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Endereço</label>
                    <textarea
                        ref={enderecoRef}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                        placeholder="Insira seu Endereço"
                        value={docProfile.endereco}
                        name="endereco"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Idade</label>
                    <input
                        type="date"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        value={docProfile.idade}
                        name="idade"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Experiências</label>
                    <textarea
                        ref={experienciaRef}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                        placeholder="Fale brevemente de suas experiências profissionais"
                        value={docProfile.experiencia1}
                        name="experiencia1"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg font-medium">Idioma Secundário</label>
                    <select
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        value={docProfile.idiomas}
                        name="idiomas"
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione um idioma</option>
                        <option value="Inglês">Inglês</option>
                        <option value="Castellano">Castellano</option>
                        <option value="Alemão">Alemão</option>
                        <option value="Italiano">Italiano</option>
                    </select>
                </div>

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
                                            onClick={() => window.open(selectedFiles[index], '_blank')}
                                        >
                                            Visualizar
                                        </li>
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

                <div className="flex gap-2 items-center justify-center">
                    <button
                        type="submit"
                        className="w-32 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-3 px-4 rounded-full transition-all"
                    >
                        Atualizar 
                    </button>

                    <button
                        onClick={() => DeletarDoc()}
                        type="button"
                        className="w-32 bg-red-500 hover:bg-red-400 text-white font-bold text-sm py-3 px-4 rounded-full transition-all"
                    >
                        Deletar Doc
                    </button>
                </div>


            </form>

        </>
    );
};

export default DocumentosForm;