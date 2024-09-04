import React, { useRef, useEffect } from "react";
import { doc, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../../../Database/Firebase";
import { useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import DocumentosStates from "./DocumentosStates";

const DocumentosForm = () => {
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
        experiencia2, setExperiencia2,
        experiencia3, setExperiencia3,
        formacao1a, setFormacao1a,
        formacao2a, setFormacao2a,
        formacao3a, setFormacao3a,
        formacao1c, setFormacao1c,
        formacao2c, setFormacao2c,
        formacao3c, setFormacao3c,
        qualificacao1, setQualificacao1,
        qualificacao2, setQualificacao2,
        qualificacao3, setQualificacao3,
        qualificacao4, setQualificacao4,
        qualificacao5, setQualificacao5,
        idiomas1, setIdiomas1,
        idiomas2, setIdiomas2,
        informatica, setInformatica,
        documento, setDocumento
    } = DocumentosStates();

    const navigate = useNavigate();
    const textareaRef = useRef(null);

    const adjustTextareaHeight = (ref) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            adjustTextareaHeight(textareaRef);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!documento) {
                alert("Por favor, selecione um documento para enviar.");
                return;
            }

            const storageRef = ref(storage, `documentos/${documento.name}`);
            await uploadBytes(storageRef, documento);
            const downloadURL = await getDownloadURL(storageRef);

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
                    experiencia2,
                    experiencia3,
                    formacao_academica1: formacao1a,
                    formacao_academica2: formacao2a,
                    formacao_academica3: formacao3a,
                    formacao_complementar1: formacao1c,
                    formacao_complementar2: formacao2c,
                    formacao_complementar3: formacao3c,
                    qualificacao1,
                    qualificacao2,
                    qualificacao3,
                    qualificacao4,
                    qualificacao5,
                    idioma1: idiomas1,
                    idioma2: idiomas2,
                    informatica,
                    url: downloadURL,
                    userId
                });

                alert("Documento adicionado com sucesso!");
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
        <form onSubmit={handleSubmit}>
            <div className="w-full h-fit flex flex-col gap-2">
                <div className="flex flex-col ">
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
                        className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
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
                        ref={textareaRef}
                        className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent"
                        placeholder="Insira seu Endereço"
                        value={endereco}
                        onChange={(e) => {
                            setEndereco(e.target.value);
                            adjustTextareaHeight(textareaRef);
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
            </div>

            <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Documento:</label>
                <input
                    type="file"
                    onChange={(e) => setDocumento(e.target.files[0])}
                />
            </div>
            <button
                type="submit"
                className="mt-4 p-2 bg-blue-500 text-white rounded-full"
            >
                Adicionar Documento
            </button>
        </form>
    );
};

export default DocumentosForm;
