import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const CandidatosTable = () => {
    const navigate = useNavigate();
    const { idempresa } = useParams();
    const [empresaid, setEmpresa] = useState(null);
    const [trabalho, setTrabalho] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        alert(idempresa);
        setEmpresa(idempresa);
    }, [idempresa]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/recommend', { trabalho: trabalho });
            setRecommendations(response.data);
            setHasSearched(true); // Oculta o texto após a pesquisa
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    const handleButtonClick = (id) => {
        navigate(`/profileadd/${id}/${idempresa}`);
    };

    return (
        <>
            <section className='w-full h-96 flex flex-col justify-center items-center gap-y-3'>
                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png" alt=""  className='h-24' />
                <h1 className='text-2xl font-bold block'>Procure candidatos conforme a vaga necessária:</h1>
                <form onSubmit={handleSubmit} className="flex">
                    <div className='flex w-80 h-16 border-2 border-gray-500 rounded-full p-4 mt-1 bg-transparent items-center'>
                        <input value={trabalho} onChange={(e) => setTrabalho(e.target.value)} type="text" className='h-full w-full bg-transparent border-0 focus:outline-none' placeholder="Procurar vagas" required />
                        <button type='submit' className='flex bg-blue-500 rounded-full'>
                            <FaSearch className='p-1 text-2xl' />
                        </button>
                    </div>
                </form>
                    <p className="text-black font-normal opacity-80">Comece fazendo uma pesquisa básica.</p>
            </section>

                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden mt-8">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Foto</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trabalho</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descrição</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Perfil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendations.map((rec) => (
                                <tr key={rec.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <img src={rec.imageUrl} alt="" className="w-32 h-32 object-cover rounded-2xl" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">{rec.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{rec.trabalho}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{rec.descrição}</p>
                                    </td>
                                    <td>
                                        <button onClick={() => handleButtonClick(rec.id)} type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Perfil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </>
    );
}

export default CandidatosTable;
