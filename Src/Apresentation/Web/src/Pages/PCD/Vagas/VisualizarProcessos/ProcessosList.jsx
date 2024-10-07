import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../../Database/Firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { FaSquareXmark } from "react-icons/fa6";

const ProcessosList = () => {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setUserId] = useState(null);
    const navigate = useNavigate();

    const defaultempresaicon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7OOS70yj8sex-Sw9mgQOnJKzNsUN3uWZCw&s";
    const defaultempresawallpaper = "https://c4.wallpaperflare.com/wallpaper/251/165/174/building-lights-usa-night-wallpaper-preview.jpg";

    useEffect(() => {
        const GetVagas = async () => {
            setLoading(true);
            try {
                const storedUserId = localStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                }

                const vagasRef = collection(db, 'Vagas');
                const ResultVagas = await getDocs(vagasRef);
                let vagasDoCandidato = [];

                for (const doc of ResultVagas.docs) {
                    const candidatosRef = collection(doc.ref, 'candidatos');
                    const QueryCandidatos = query(candidatosRef, where('userId', '==', id));
                    const GetResultCandidatos = await getDocs(QueryCandidatos);

                    if (!GetResultCandidatos.empty) {
                        const candidatoData = GetResultCandidatos.docs[0].data();
                        vagasDoCandidato.push({ id: doc.id, ...doc.data(), situação: candidatoData.situação });
                    }
                }

                const vagasWithEmpresaDetails = await Promise.all(
                    vagasDoCandidato.map(async (vaga) => {
                        if (vaga.empresaId) {
                            const empresaDoc = await getDoc(doc(db, "Empresa", vaga.empresaId));
                            if (empresaDoc.exists()) {
                                const empresaData = empresaDoc.data();
                                return {
                                    ...vaga,
                                    empresa: {
                                        imageUrl: empresaData.imageUrl,
                                        imageProfile: empresaData.imageProfile,
                                    }
                                };
                            }
                        }
                        return vaga;
                    })
                );

                setVagas(vagasWithEmpresaDetails);
            } catch (error) {
                console.error('Erro ao buscar vagas: ', error);
            } finally {
                setLoading(false);
            }
        };

        GetVagas();
    }, [id]);

    const EnviarDoc = async (vagaId) => {
        const VagaInfo = collection(db, "Vagas", vagaId, "candidatos");
        const QueryDocs = query(VagaInfo, where("userId", "==", id));

        const DocResult = await getDocs(QueryDocs);

        if (!DocResult.empty) {
            const candidatoDoc = DocResult.docs[0];
            const DocRef = collection(db, "Vagas", vagaId, "candidatos", candidatoDoc.id, "documentos");
            const GetDoc = await getDocs(DocRef);

            if (!GetDoc.empty) {
                const idDoc = GetDoc.docs[0].id;
                alert("Documentos já existem");
                navigate(`/atualizardocumento/${vagaId}/${idDoc}`);
            } else {
                alert("Sem documentos");
                navigate(`/enviardocumento/${vagaId}`);
            }
        } else {
            alert("Usuário não encontrado");
        }
    };

    const ChatEmpresa = (empresaId) => {
        navigate(`/chatpcd/${empresaId}`);
    };

    const getSituacaoClass = (situacao) => {
        switch (situacao) {
            case 'Aprovado':
                return 'bg-green-500'; // Verde para aprovado
            case 'Reprovado':
                return 'bg-red-600'; // Vermelho para reprovado
            case 'Pendente':
                return 'bg-gray-500'; // Cinza para pendente
            default:
                return 'bg-yellow-500'; // Cor padrão se necessário
        }
    };

    return (
        <div className={`w-full h-fit flex justify-center items-center flex-col ${loading ? '' : (vagas.length > 0 ? 'grid Processoscontainer gap-4 justify-items-center items-center pb-4' : 'flex pb-8')}`}>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            ) : (
                Array.isArray(vagas) && vagas.length > 0 ? (
                    vagas.map((vaga) => (
                        <div key={vaga.id} className='h-processocard w-processocard shadow-xl bg-gray-800 rounded-2xl flex border-2 overflow-hidden'>
                            {vaga.empresa && (
                                <div className='flex flex-col h-full w-2/6 justify-center items-center relative'>
                                    <img src={vaga.empresa.imageProfile || defaultempresawallpaper} alt="Empresa Profile" className='w-full h-full relative object-cover opacity-80' />
                                    <img src={vaga.empresa.imageUrl || defaultempresaicon} alt="Empresa Logo" className='rounded-full w-24 h-24 object-cover absolute border-blue-500 border-4' />
                                    <h1 className='font-medium text-white text-center text-lg'>{vaga.empresa.name}</h1>
                                </div>
                            )}
                            <div className='flex flex-col bg-gray-900 rounded-2xl h-full w-4/6 justify-center items-center overflow-hidden gap-2'>
                                <div className="w-full flex flex-col justify-center gap-1">
                                    <h1 className='font-medium text-xl text-center text-white'>{vaga.vaga}</h1>
                                    <h1 className={`w-32 text-white text-center font-bold text-sm py-2 px-2 rounded-full ml-2 ${getSituacaoClass(vaga.situação)}`}>
                                        {vaga.situação || 'Indefinido'}
                                    </h1>
                                    <p className='text-white opacity-80 text-sm px-4 truncate'>Tipo: {vaga.tipo}</p>
                                    <p className='text-white opacity-80 text-sm px-4 truncate'>Salário: {vaga.salario}</p>
                                </div>
                                <div className='w-full flex justify-center'>
                                    <button onClick={() => ChatEmpresa(vaga.empresaId)} className='w-44 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all ml-2'>
                                        Chat
                                    </button>
                                    <button onClick={() => EnviarDoc(vaga.id)} className='w-44 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all m-2'>
                                        Enviar Documentos
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                        <div className='w-2/6 h-full flex items-center justify-center'>
                            <FaSquareXmark className='text-5xl text-gray-900 text-center' />
                        </div>
                        <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                            <p className='font-medium text-lg text-center'>Sem Processos Iniciados</p>
                            <p className='font-normal text-base text-center'>Comece algum ou apenas espere o contato.</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default ProcessosList;
