import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../../Database/Firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { FaSquareXmark } from "react-icons/fa6";
import { IoMdChatbubbles } from "react-icons/io";
import { IoDocumentAttach } from "react-icons/io5";
import Modal from '../../Modal/Modal';

const ProcessosList = () => {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setUserId] = useState(null);
    const navigate = useNavigate();

    const defaultempresaicon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7OOS70yj8sex-Sw9mgQOnJKzNsUN3uWZCw&s";
    const defaultempresawallpaper = "https://c4.wallpaperflare.com/wallpaper/251/165/174/building-lights-usa-night-wallpaper-preview.jpg";

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);


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
                localStorage.setItem('vagaId', vagaId);
                localStorage.setItem('IdDoc', idDoc);
                setWorksModal(true)
                setModalMessage("Documentos pré-existentes, redirecionando")
                setModalOpen(true)
                setTimeout(() => {
                    navigate(`/atualizardocumento/`);
                }, 4000);

            } else {
                localStorage.setItem('vagaId', vagaId);
                navigate(`/enviardocumento`);
            }
        } else {
            setWorksModal(false)
            setModalMessage("Usuário não encontrado.")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 2200);
        }
    };

    const ChatEmpresa = (empresaId) => {
        localStorage.setItem('IdEmpresa', empresaId);
        navigate(`/chatpcd`);
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
        <>
            <div>
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
            </div>
            <div className={`w-full h-fit flex justify-center items-center flex-col ${loading ? '' : (vagas.length > 0 ? 'grid Processoscontainer gap-4 justify-items-center items-center pb-4' : 'flex pb-8')}`}>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    </div>
                ) : (
                    Array.isArray(vagas) && vagas.length > 0 ? (
                        vagas.map((vaga) => (
                            <div key={vaga.id} className='h-vagacard w-vagacard shadow-2xl rounded-2xl flex border-gray-400 border-2 overflow-hidden cardhover'>
                                {vaga.empresa && (
                                    <div className='w-2/6 h-full flex flex-col bg-gray-200 justify-center items-center gap-2'>
                                        <div className='h-4/6 w-full flex items-end justify-center'>
                                            <img
                                                src={vaga.empresa.imageUrl}
                                                className="w-16 h-16 object-cover rounded-full border-2 border-blue-600 "
                                                alt="logo empresa"
                                            />
                                        </div>
                                        <div className='h-2/6 w-full  flex justify-center'>
                                            <h1 className='font-medium text-center text-base text-wrap overflow-x-hidden'>{vaga.empresa.name}</h1>
                                        </div>
                                    </div>
                                )}

                                <div className='w-4/6 h-full flex flex-col items-center justify-center'>
                                    <div className='w-full h-2/6 text-center flex items-center justify-center text-wrap overflow-hidden'>
                                        <h1 className='font-bold text-xl text-center w-4/6'>{vaga.vaga}</h1>
                                    </div>
                                    <div className='w-full h-2/6 flex flex-col px-2 '>
                                        <p className='opacity-80 '>{vaga.situação || 'Indefinido'}</p>
                                        <p className='opacity-80'>{vaga.tipo}</p>
                                        <p className='opacity-80'>R${vaga.salario}</p>
                                    </div>
                                    <div className='w-full h-2/6 flex justify-center items-center gap-2'>
                                        <button onClick={() => ChatEmpresa(vaga.empresaId)} className='bg-green-400 rounded-2xl p-2 h-fit'>
                                            <IoMdChatbubbles className='text-3xl text-white text-center cardhover' />
                                        </button>
                                        <button onClick={() => EnviarDoc(vaga.id)} className='bg-gray-700 rounded-2xl p-2 h-fit'>
                                            <IoDocumentAttach className='text-3xl text-white text-center cardhover' />
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
        </>
    );
}

export default ProcessosList;
