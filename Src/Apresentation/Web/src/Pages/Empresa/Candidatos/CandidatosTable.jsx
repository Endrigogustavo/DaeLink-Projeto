import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import DaeLogo from '../../../assets/Dae.svg'

const CandidatosTable = () => {
    const navigate = useNavigate();
    const [empresaid, setEmpresa] = useState(null);
    const [trabalho, setTrabalho] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [hasSearched, setHasSearched] = useState(false); // Estado para rastrear se a pesquisa foi feita

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                const userId = storedUserId;
                setEmpresa(userId)
            }
        
    }, []);

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true); // Inicia o carregamento
        setHasSearched(true); // Define que a pesquisa foi feita
        try {
            const response = await axios.post('http://localhost:5000/recommend', { trabalho: trabalho });
            setRecommendations(response.data);

            if(!recommendations == null){
                alert("Erro ao achar a vaga")
                setRecommendations(null)
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false); // Termina o carregamento
        }
    };

    const handleButtonClick = (id) => {
        navigate(`/profileadd/${id}/`);
    };

    return (
        <>
            <section className='w-full h-96 flex flex-col justify-center items-center gap-y-3 overflow-hidden'>
                <img src={DaeLogo} alt="" className='h-24 Dae' />
                <h1 className='text-2xl font-bold text-center'>Procure candidatos conforme a vaga necessária:</h1>
                <form onSubmit={handleSubmit} className="flex">
                    <div className='flex w-80 h-16 border-2 border-gray-900 rounded-full p-4 mt-1 bg-transparent items-center'>
                        <input value={trabalho} onChange={(e) => setTrabalho(e.target.value)} type="text" className='h-full w-full bg-transparent border-0 focus:outline-none' placeholder="Procurar candidato" required />
                        <button type='submit' className='flex bg-blue-500 rounded-full'>
                            <FaSearch className='p-1 text-2xl' />
                        </button>
                    </div>
                </form>
                {!hasSearched && !loading && (
                    <p className="text-black font-normal opacity-80">Comece fazendo uma pesquisa básica.</p>
                )}
            </section>

            <div
                className={`w-full h-fit overflow-x-hidden grid Pcdscontainer gap-4 justify-items-center items-center ${hasSearched ? 'pb-6' : ''}`}
            >
                {loading ? (
                    // Exibe skeleton loaders enquanto está carregando
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className='h-80 w-72 bg-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 border-blue-300 border-4 animate-pulse'>
                            <div className="rounded-full bg-gray-400 w-28 h-28"></div>
                            <div className="h-6 bg-gray-400 w-40 rounded"></div>
                            <div className="h-4 bg-gray-400 w-32 rounded"></div>
                            <div className="h-4 bg-gray-400 w-48 rounded"></div>
                            <div className="h-10 bg-gray-400 w-36 rounded-full"></div>
                        </div>
                    ))
                ) : (
                    recommendations.map((rec) => (
                        <div key={rec.id} className='h-80 w-72 bg-gray-900 rounded-xl flex flex-col items-center justify-center gap-2 border-blue-500 border-4 overflow-x-hidden'>
                            <img src={rec.imageUrl} className="rounded-full w-28 h-28" alt="" />
                            <h1 className='text-lg font-medium text-white text-center'>{rec.name}<h2 className='opacity-75 text-sm'>{rec.trabalho}</h2></h1>
                            <p className='text-white text-justify w-5/6 truncate-multiline'>{rec.descrição}</p>
                            <button onClick={() => handleButtonClick(rec.id)} type="submit"
                                className='w-36 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all'>Visitar</button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default CandidatosTable;
