import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../Database/Firebase';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento";
import { BsFillXSquareFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdWork, MdDelete, MdEdit } from "react-icons/md";
import './ProcessoEmpresas.css'

import Modal from '../../Modal/Modal';
import ConfirmModal from '../../Modal/ConfirmModal';

function ProcessosList() {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setUserId] = useState('')
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);

    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [ConfirmModalMessage, setConfirmModalMessage] = useState('');
    const [vagaToDelete, setVagaToDelete] = useState(null);


    const handleOpenModal = (vagaId) => {
        setVagaToDelete(vagaId);
        setConfirmModalMessage('Deseja deletar esta vaga?');
        setConfirmModalOpen(true);
    };

    const handleCloseModal = () => {
        setConfirmModalOpen(false);
    };

    useEffect(() => {
        const getVagas = async () => {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                const userId = storedUserId;
                setUserId(userId)
            }

            try {
                const vagasCollection = collection(db, 'Vagas');
                const queryVagas = query(vagasCollection, where('empresaId', '==', id));
                const getVagasResult = await getDocs(queryVagas);
                const vagasList = getVagasResult.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setVagas(vagasList);
            } catch (error) {
                console.error('Erro ao buscar vagas: ', error);
            } finally {
                setLoading(false);
            }
        };

        getVagas();
    }, [id]);

    if (loading) {
        return <CarregamentoTela />;
    }


    const handleButtonClick = (vagaId) => {
        localStorage.setItem('vagaId', vagaId);
        navigate(`/visualizarpessoas/`);
    };

    const atualizarVaga = (vagaId) => {
        localStorage.setItem('vagaId', vagaId);
        navigate(`/atualizarvaga`);
    };



    const deleteVaga = async () => {
        try {
            const vagaDoc = doc(db, "Vagas", vagaToDelete);
            await deleteDoc(vagaDoc);
            setWorksModal(true);
            setModalMessage("Vaga Deletada com Sucesso");
            setModalOpen(true);
            setTimeout(() => {
                setVagas(vagas.filter(vaga => vaga.id !== vagaToDelete));
                setModalOpen(false);
            }, 4000);
        } catch (error) {
            setConfirmModalOpen(false)
            setWorksModal(false);
            setModalMessage("Erro ao deletar a vaga");
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
            }, 2200);
        } finally {
            handleCloseModal();
        }
    };

    return (
        <>
            
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
                <ConfirmModal
                    isWorksModal={isConfirmModalOpen}
                    onConfirm={deleteVaga}
                    onClose={handleCloseModal}
                    message={ConfirmModalMessage}
                />
            

            <div className={`w-full h-fit flex justify-center items-center flex-col py-4 ${vagas.length > 0 ? 'grid ProcessosEmpresas gap-y-6 justify-items-center items-center' : ''}`}>
                {vagas.map((vaga) => (
                    <div key={vaga.id} className='h-56 w-96 rounded-3xl shadow-2xl flex bg-white border-gray-400 border-2 w-processsosempresa'>
                        <div className='w-1/4 h-full flex items-center justify-center bg-gray-200  rounded-3xl'>
                            <MdWork className='text-7xl text-gray-900 text-center bg-white p-4 rounded-full border-2 border-blue-600' />
                        </div>
                        <div className='w-3/4 h-full flex flex-col items-center'>
                            <div className='w-full h-2/6 text-center flex items-center justify-center text-wrap overflow-hidden'>
                                <h1 className='font-bold text-xl text-center w-4/6 processo-title' >{vaga.vaga}</h1>
                            </div>
                            <div className='w-full h-2/6 flex flex-col px-2'>
                                <p className='opacity-80 truncate'>{vaga.local}</p>
                                <p className='opacity-80'>{vaga.tipo}</p>
                                <p className='opacity-80'>R${vaga.salario}</p>
                            </div>
                            <div className='w-full h-2/6 flex justify-center items-center gap-2'>
                                <button onClick={() => handleButtonClick(vaga.id)} type="submit" class="bg-green-400 rounded-2xl p-2 h-fit">
                                    <FaUserFriends className='text-3xl text-white text-center cardhover' />
                                </button>

                                <button onClick={() => atualizarVaga(vaga.id)} type="submit" class="bg-gray-700 rounded-2xl p-2 h-fit">
                                    <MdEdit className='text-3xl text-white text-center cardhover' />
                                </button>

                                <button onClick={() => handleOpenModal(vaga.id)} type="submit" class="bg-red-400 rounded-2xl p-2 h-fit">
                                    <MdDelete className='text-3xl text-white text-center cardhover' />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {vagas.length === 0 && (
                    <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                        <div className='w-2/6 h-full flex items-center justify-center'>
                            <BsFillXSquareFill className='text-5xl text-gray-900 text-center' />
                        </div>
                        <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                            <p className='font-medium text-lg text-center'>Sem vagas disponíveis</p>
                            <p className='font-normal text-base text-center'>Por Favor, crie uma.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProcessosList;
