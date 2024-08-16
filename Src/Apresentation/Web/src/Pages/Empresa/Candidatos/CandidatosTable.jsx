import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const CandidatosTable = () => {
    const text = "Robert Nesta Marley foi um cantor e compositor jamaicano, o mais conhecido músico de reggae de todos os tempos, famoso por popularizar internacionalmente o gênero. Já vendeu mais de 75 milhões de discos e, em 1978, três anos antes de sua morte, foi condecorado pela ONU com a Medalha da Paz do Terceiro Mundo"
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
            <section className='w-full h-96 flex flex-col justify-center items-center gap-y-3 overflow-hidden'>
                <img src="https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png" alt="" className='h-24' />
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

            <div className='w-full h-fit overflow-x-hidden grid grid-cols-1 sm:grid-cols-4 gap-4 justify-items-center items-center'>
                {recommendations.map((rec) => (
                    <div key={rec.id} className=' h-80 w-72 bg-gray-900 rounded-xl flex flex-col items-center justify-center gap-2 overflow-x-hidden'>
                        <img src={rec.imageUrl} className="rounded-full h-28 w-28 " alt="" />
                        <h1 className='text-lg font-medium text-white text-center'>{rec.name}<h2 className='opacity-75 text-sm' >{rec.trabalho}</h2></h1>
                        <p className='text-white text-justify px-5 truncate-multiline'>{rec.descrição}</p>
                        <button onClick={() => handleButtonClick(rec.id)} type="submit"
                            className='w-36 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all'>Visitar</button>
                    </div>
                ))}
            </div>

        </>
    );
}

export default CandidatosTable;
