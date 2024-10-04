import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../Database/Firebase';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento";
import { BsFillXSquareFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdWork, MdDelete, MdEdit } from "react-icons/md";
import './ProcessoEmpresas.css'

function ProcessosList() {
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ id, setUserId ] = useState('')
    const navigate = useNavigate();

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

    if (vagas.length === 0) {
        return <div>Nenhuma vaga encontrada para esta empresa.</div>;
    }

    const handleButtonClick = (vagaId) => {
        navigate(`/visualizarpessoas/${vagaId}`);
    };

    const atualizarVaga = (vagaId) => {
        navigate(`/atualizarvaga/${vagaId}`);
    };

    

    const deleteVaga = async (vagaId) => {
        const response = window.confirm("Deseja deletar a vaga?");
        if (response) {
            try {
                const vagaDoc = doc(db, "Vagas", vagaId);
                await deleteDoc(vagaDoc);
                alert("Vaga deletada com sucesso");
                setVagas(vagas.filter(vaga => vaga.id !== vagaId)); // Update state to reflect deletion
            } catch (error) {
                alert("Erro ao deletar a vaga: ", error);
            }
        }
    };

    return (
        <div className='w-full h-fit px-2 py-2 '>
            {vagas.map((vaga) => (
                <div key={vaga.id} className='h-56 w-96 rounded-3xl shadow-2xl flex bg-white'>
                    <div className='w-1/4 h-full flex items-center justify-center'>
                        <MdWork className='text-7xl text-gray-900 text-center bg-white p-4 rounded-full' />
                    </div>
                    <div className='w-3/4 h-full flex flex-col items-center'>
                        <div className='w-full h-2/6 text-center flex items-center justify-center text-wrap overflow-hidden'>
                            <h1 className='font-bold text-xl text-center w-4/6'>{vaga.vaga}</h1>
                        </div>
                        <div className='w-full h-2/6 flex flex-col '>
                            <p className='opacity-80'>{vaga.local}</p>
                            <p className='opacity-80'>{vaga.tipo}</p>
                            <p className='opacity-80'>{vaga.salario}</p>
                        </div>
                        <div className='w-full h-2/6 flex justify-center gap-2'>
                            <button onClick={() => handleButtonClick(vaga.id)} type="submit" class="bg-green">
                                <FaUserFriends className='text-3xl text-gray-900 text-center' />
                            </button>

                            <button onClick={() => atualizarVaga(vaga.id)} type="submit" class="">
                                <MdEdit className='text-3xl text-gray-900 text-center ' />
                            </button>

                            <button onClick={() => deleteVaga(vaga.id)} type="submit" class="bg-red">
                                <MdDelete className='text-3xl text-gray-900 text-center' />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {vagas.length === 0 && (
                <div className='w-3/12 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                    <div className='w-2/6 h-full flex items-center justify-center'>
                        <BsFillXSquareFill className='text-5xl text-gray-900 text-center' />
                    </div>
                    <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                        <p className='font-medium text-lg text-center'>Sem vagas disponíveis</p>
                        <p className='font-normal text-base text-center'>Por favor volte em outro momento.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProcessosList;
