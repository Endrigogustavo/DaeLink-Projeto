import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc, where, query, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../../../Database/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { BsFillXSquareFill } from "react-icons/bs";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import Modal from '../../Modal/Modal';

function PessoasList() {
    const navigate = useNavigate();
    const [vagaId, setVaga] = useState("")
    const [candidatos, setCandidatos] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [userPCD, setUserPCD] = useState('');

    const fotodefault = "https://th.bing.com/th/id/OIP.9C1wSMkDpVtwSZbuxNwEZAAAAA?w=474&h=474&rs=1&pid=ImgDetMain"
    const defaultbackground = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyxP3MrFgQfwxomoeOz9ceoA1Dq7O9s2v8Iw&s";
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);

    useEffect(() => {
        const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => AuthProfile();
    }, []);

    useEffect(() => {
        const GetCandidatos = async () => {
            try {
                const vagaId = localStorage.getItem("vagaId")
                setVaga(vagaId)
                const CandidatosCollection = collection(db, 'Vagas', vagaId, 'candidatos');
                const GetCandidatos = await getDocs(CandidatosCollection);

                const candidatosList = GetCandidatos.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Usar o Promise.all para garantir que todas as operações assíncronas terminem
                const updatedCandidatosList = await Promise.all(candidatosList.map(async (candidato) => {
                    if (candidato.userId) {
                        const PCDDoc = await getDoc(doc(db, "PCD", candidato.userId));
                        if (PCDDoc.exists()) {
                            const PCDData = PCDDoc.data();
                            return {
                                ...candidato,
                                profileImage: PCDData.imageUrl || fotodefault, // Atribui imagem padrão se não existir
                                backgroundImage: PCDData.imageProfile || defaultbackground, // Atribui imagem padrão se não existir
                                name: PCDData.name || "Nome não disponível", // Certifique-se de que há um nome
                                trabalho: PCDData.trabalho || "Trabalho não disponível"
                            };
                        } else {
                            console.log(`PCD não encontrado para o candidato ${candidato.userId}`);
                            return { ...candidato }; // Retorna candidato sem mudanças se não encontrar PCD
                        }
                    } else {
                        return { ...candidato }; // Retorna candidato sem mudanças se não houver userId
                    }
                }));

                setCandidatos(updatedCandidatosList);

            } catch (error) {
                console.error('Erro ao buscar candidatos:', error);
                setError('Erro ao buscar candidatos');
            }
        };

        GetCandidatos();
    }, []);


    const handleButtonClick = (id) => {
        localStorage.setItem("IdUserDoc", id)
        navigate(`/visualizardocumentos/`);
    };

    const AceitarCandidato = async (id) => {
        try {
            const GetDoc = collection(db, "Vagas", vagaId, 'candidatos', id, 'documentos');
            const DocResult = await getDocs(GetDoc);
            if (!DocResult.empty) {
                try {
                    const situação = "Aprovado";
                    const vagaRef = doc(db, "Vagas", vagaId, 'candidatos', id);

                    await updateDoc(vagaRef, {
                        situação: situação
                    });

                    setWorksModal(true)
                    setModalMessage("Candidato aprovado com sucesso!")
                    setModalOpen(true)
                    setTimeout(() => {
                        navigate(0);
                    }, 4000);

                } catch (e) {
                    console.error("Erro ao aprovar candidato: ", e);
                    setWorksModal(false)
                    setModalMessage("Erro ao aprovar candidato")
                    setModalOpen(true)
                    setTimeout(() => {
                        setModalOpen(false)
                    }, 2200);
                }
            } else {
                setWorksModal(false)
                setModalMessage("Sem documentos para aprovação")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false)
                }, 2200);
            }
        } catch (e) {
            console.error("Erro ao aprovar candidato: ", e);
            setWorksModal(false)
            setModalMessage("Erro ao Recusar candidato")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 2200);
        }
    };

    const RecusarCandidato = async (id) => {
        try {
            const GetDoc = collection(db, "Vagas", vagaId, 'candidatos', id, 'documentos');
            const DocResult = await getDocs(GetDoc);
            if (!DocResult.empty) {
                try {
                    const situação = "Recusado";
                    const vagaRef = doc(db, "Vagas", vagaId, 'candidatos', id);

                    await updateDoc(vagaRef, {
                        situação: situação
                    });
                    
                    alert()
                    const ChatColletion = collection(db, "Chat")
                    const GetQueryCompanyId = query(ChatColletion, where("empresaId", "==", user.uid));
                    const GetQueryPCDId = query(GetQueryCompanyId, where("userId", "==", id));
                    const GetVagaId = query(GetQueryPCDId, where("vagaId", "==", vagaId));
                    const querySnapshot = await getDocs(GetVagaId);
                    for (const doc of querySnapshot.docs) {
                        // Delete cada documento encontrado na consulta
                        await deleteDoc(doc.ref);
                    }
                    setWorksModal(true)
                    setModalMessage("Candidato Recusado com Sucesso")
                    setModalOpen(true)
                    setTimeout(() => {
                        navigate(0);
                    }, 4000);
                } catch (e) {
                    console.error("Erro ao recusar candidato: ", e);
                    setWorksModal(false)
                    setModalMessage("Erro ao Recusar candidato")
                    setModalOpen(true)
                    setTimeout(() => {
                        setModalOpen(false)
                    }, 2200);
                }
            } else {
                setWorksModal(false)
                setModalMessage("Sem documentos para recusa.")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false)
                }, 2200);
            }
        } catch (e) {
            console.error("Erro ao recusar candidato: ", e);
            setWorksModal(false)
            setModalMessage("Erro ao Recusar candidato")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 2200);

        }
    };

    const ChatUser = async (userId) => {
        try {

            const vagaId = localStorage.getItem("vagaId")
            const ChatCollection = collection(db, "Chat");
            
            await addDoc(ChatCollection, {
                userId: userId,
                vagaId:vagaId,
                empresaId: user.uid
            });

            setWorksModal(true);
            setModalMessage("Chat Carregado com sucesso!");
            setModalOpen(true);
            setTimeout(() => {
                localStorage.setItem("chatId", userId);
                navigate(`/chat/`);
            }, 4000);

        } catch (error) {
            console.error('Erro ao iniciar chat:', error);
            setWorksModal(false);
            setModalMessage("Erro ao iniciar chat.");
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
            }, 2200);
        }
    };

    return (
        <>
            <div>
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
            </div>

            <div className='w-full h-44 flex items-center justify-center'>
                <div className='w-96 h-20 rounded-3xl shadow-2xl flex bg-gray-900 border-2 items-center justify-center px-2'>
                    <h1 className='font-bold text-2xl text-white text-center'>Candidatos Disponiveis </h1>
                </div>
            </div>


            <div className={`w-full h-fit overflow-x-hidden  Pcdscontainer gap-4 justify-items-center justify-center items-center ${candidatos.length > 0 ? 'py-12 grid ' : ''}`}>

                {candidatos.map(candidato => (
                    <div key={candidato.id} className='h-profilecard w-72  rounded-3xl flex flex-col 
                     items-center justify-center border-gray-400 border-2 shadow-2xl overflow-hidden '>
                        <div className='h-profilecardbanner w-full flex items-center justify-center overflow-hidden relative'>
                            <img src={candidato.backgroundImage} className='h-full w-full object-cover opacity-20 backprofile-opacity' />
                            <img src={candidato.profileImage} className="mt-12 absolute shadow-2xl rounded-full w-28 h-28 object-cover border-4 border-blue-600" />
                        </div>
                        <div className='h-profilecarditems w-full flex flex-col items-center overflow-hidden'>

                            <div className='h-2/6 w-full flex flex-col justify-center items-center  pt-1'>
                                <h1 className='text-xl font-bold text-center'>{candidato.name}</h1>
                                <h2 className='opacity-75 text-sm truncate'>{candidato.trabalho}</h2>
                            </div>

                            <div className='w-full h-4/6 flex flex-col justify-center items-center py-2 '>
                                <div className='w-full h-2/5 flex flex-col justify-center px-4'>
                                    <h1 className='opacity-75 text-sm truncate'>{candidato.email}</h1>
                                    <h2 className='opacity-75 text-sm truncate font-bold'>{candidato.situação}</h2>
                                </div>
                                <div className='w-full h-3/5 flex flex-col justify-center items-center '>
                                    <p className='font-medium text-center text-xl'>Ações</p>
                                    <div className='w-full flex justify-center gap-2'>
                                        <button onClick={() => AceitarCandidato(candidato.id)} type="submit"
                                            className='bg-green-400 rounded-2xl px-2 py-1 h-12'>
                                            <FaCheck className='text-2xl text-white text-center cardhover' />
                                        </button>
                                        <button onClick={() => RecusarCandidato(candidato.id)} type="submit"
                                            className='bg-red-400 rounded-2xl px-2 py-1 h-12'>
                                            <FaTimes className='text-2xl text-white text-center cardhover' />
                                        </button>

                                        <button onClick={() => handleButtonClick(candidato.id)} type="submit"
                                            className='bg-gray-700 rounded-2xl px-2 py-1 h-12'>
                                            <IoDocumentsSharp className='text-2xl text-white text-center cardhover' />
                                        </button>

                                        <button onClick={() => ChatUser(candidato.userId)} type="submit"
                                            className='bg-indigo-700 rounded-2xl px-2 py-1 h-12'>
                                            <IoMdChatbubbles className='text-2xl text-white text-center cardhover' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
                {candidatos.length === 0 && (
                    <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4 mt-4'>
                        <div className='w-2/6 h-full flex items-center justify-center'>
                            <BsFillXSquareFill className='text-5xl text-gray-900 text-center' />
                        </div>
                        <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                            <p className='font-medium text-lg text-center'>Sem Candidatos no momento</p>
                            <p className='font-normal text-base text-center'>Apenas espere que irão aparecer.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PessoasList;
