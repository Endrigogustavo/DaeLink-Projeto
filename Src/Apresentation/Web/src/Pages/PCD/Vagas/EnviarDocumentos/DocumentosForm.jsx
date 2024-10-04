import React, { useState, useRef, useEffect } from "react";
import { doc, collection, addDoc, getDocs, query, where, getDoc } from "firebase/firestore";
import { db, storage } from "../../../../Database/Firebase";
import { useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import DocumentosStates from "./DocumentosStates";
import { FaFile } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";
import InputMask from 'react-input-mask';

const DocumentosForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
    const [isLoading, setIsLoading] = useState(false);
    const [pessoaId, setPessoaId] = useState(null);

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
    const inputFileRefs = [useRef(null), useRef(null), useRef(null)];
    const enderecoRef = useRef(null);
    const experienciaRef = useRef(null);

    useEffect(() => {
        const getInfoPCD = async () => {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                const userId = storedUserId;
                setUserId(userId)

                const PCDDoc = await getDoc(doc(db, "PCD", userId));
                if (PCDDoc.exists()) {
                    const PCDData = { id: PCDDoc.id, ...PCDDoc.data() };
                    setPessoaId(PCDData);
                } else {
                    console.log("Pessoa não encontrada!");
                }
            }
        };

        getInfoPCD();
    }, [userId]);

    // Atualiza os estados quando o pessoaId for carregado
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
    }, [pessoaId]);

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
        if (file) {
            const updatedFiles = [...selectedFiles];
            updatedFiles[index] = file;
            setSelectedFiles(updatedFiles);
            inputFileRefs[index].current.style.display = 'none';
        }
    };

    const uploadFile = async (file) => {
        const storageRef = ref(storage, `documentos/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (selectedFiles.every(file => !file)) {
                alert("Por favor, selecione pelo menos um documento para enviar.");
                setIsLoading(false);
                return;
            }

            const downloadURLs = await Promise.all(selectedFiles.map(file => file ? uploadFile(file) : null));

            const candidatosRef = collection(db, "Vagas", vagaUid, "candidatos");
            const QueryCandidatos = query(candidatosRef, where("userId", "==", userId));
            const ResultCandidatos = await getDocs(QueryCandidatos);

            if (!ResultCandidatos.empty) {
                const candidatoDoc = ResultCandidatos.docs[0];
                const candidatoId = candidatoDoc.id;
                const candidatoDocRef = doc(db, "Vagas", vagaUid, "candidatos", candidatoId);
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

                alert("Documento adicionado com sucesso!");
                setSelectedFiles([null, null, null]);
                setDocumento(null);
                navigate(`/homeuser`);
            } else {
                console.error("Candidato não encontrado.");
                alert("Erro ao adicionar documento: candidato não encontrado.");
            }
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            alert("Erro ao adicionar documento.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="h-64 w-full flex items-center justify-center">
                <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
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
                        value={nome} // Estado controlado
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input
                        type="email"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent "
                        placeholder="Insira seu Email"
                        value={email} // Estado controlado
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Telefone</label>
                    <InputMask
                        mask="(99) 99999-9999"
                        value={telefone} // Estado controlado
                        onChange={(e) => setTelefone(e.target.value)}
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        placeholder="Insira seu telefone"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Endereço</label>
                    <textarea
                        ref={enderecoRef}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent "
                        placeholder="Insira seu Endereço"
                        value={endereco} // Estado controlado
                        onChange={(e) => {
                            setEndereco(e.target.value);
                            adjustTextareaHeight(enderecoRef);
                        }}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Idade</label>
                    <input
                        type="date"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        value={idade} // Estado controlado
                        onChange={(e) => setIdade(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Experiências</label>
                    <textarea
                        ref={experienciaRef}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent"
                        placeholder="Insira suas Experiências"
                        value={experiencia1} // Estado controlado
                        onChange={(e) => {
                            setExperiencia1(e.target.value);
                            adjustTextareaHeight(experienciaRef);
                        }}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Idiomas</label>
                    <input
                        type="text"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent "
                        placeholder="Insira os Idiomas"
                        value={idiomas} // Estado controlado
                        onChange={(e) => setIdiomas(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Objetivo</label>
                    <input
                        type="text"
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        placeholder="Insira seu Objetivo"
                        value={objetivo} // Estado controlado
                        onChange={(e) => setObjetivo(e.target.value)}
                        required
                    />
                </div>

                {selectedFiles.map((file, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="text-lg font-medium">Documento {index + 1}</label>
                        <input
                            ref={inputFileRefs[index]}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange(index)}
                            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                            required={!file}
                        />
                        {file && <p className="text-sm">Arquivo: {file.name}</p>}
                    </div>
                ))}

                <div className="col-span-2 flex justify-center">
                    <button type="submit" className="w-48 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        {isLoading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default DocumentosForm;
