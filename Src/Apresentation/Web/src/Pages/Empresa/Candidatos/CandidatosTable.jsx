import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import DaeLogo from '../../../Img/Recommendation.png'
import { BsFillXSquareFill } from 'react-icons/bs';

const CandidatosTable = () => {
    const navigate = useNavigate();
    const [empresaid, setEmpresa] = useState(null);
    const [trabalho, setTrabalho] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [hasSearched, setHasSearched] = useState(false);
    const [recommendError, setRecommendError] = useState("")

    const defaultbackground = "https://c4.wallpaperflare.com/wallpaper/251/165/174/building-lights-usa-night-wallpaper-preview.jpg";

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
        setRecommendations([]);
        try {
            const response = await axios.post('http://localhost:5000/recommend', { trabalho: trabalho });
            setRecommendations(response.data);

            if (!recommendations == null) {
                alert("Erro ao achar a vaga")
                setRecommendations(null)
                setRecommendError("Nenhuma vaga encontrada, tente novamente")
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false); // Termina o carregamento
        }
    };

    const handleButtonClick = (id) => {
        localStorage.setItem("Candidato", id)
        navigate(`/profileadd/`);
    };

    return (
        <>
            <section className='w-full h-80 flex flex-col justify-center items-center gap-y-3 overflow-hidden'>
                <img src={DaeLogo} alt="" className='h-24' />
                <h1 className='text-xl font-bold text-center'>Procure candidatos conforme a vaga necessária:</h1>
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
                className={`w-full h-fit overflow-x-hidden  Pcdscontainer gap-4 justify-items-center justify-center items-center ${hasSearched ? 'py-6 grid ' : ''}`}
            >
                {loading ? (
                    // Exibe skeleton loaders enquanto está carregando
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className='h-profilecard w-72 rounded-3xl flex flex-col items-center justify-center border-gray-400 border-2 shadow-2xl overflow-hiddenanimate-pulse'>
                            <div className="rounded-full bg-gray-400 w-28 h-28"></div>
                            <div className="h-6 bg-gray-400 w-40 rounded"></div>
                            <div className="h-4 bg-gray-400 w-32 rounded"></div>
                            <div className="h-4 bg-gray-400 w-48 rounded"></div>
                            <div className="h-10 bg-gray-400 w-36 rounded-full"></div>
                        </div>
                    ))
                ) : (

                    recommendations.map((rec) => {
                        return (
                            <>
                                <React.Fragment key={rec.id}> {/* Use React.Fragment para o JSX não gerar elementos extras */}
                                    {recommendError && <p className="text-red-500">{recommendError}</p>}
                                    <div className='h-profilecard w-72 rounded-3xl flex flex-col items-center justify-center border-gray-400 border-2 shadow-2xl overflow-hidden'>
                                        <div className='h-profilecardbanner w-full flex items-center justify-center overflow-hidden relative'>
                                            <img src={rec.backgroundImage || rec.imageProfile || defaultbackground} className='h-full w-full object-cover opacity-20 backprofile-opacity' />
                                            <img src={rec.profileImage || rec.imageUrl} className="mt-12 absolute shadow-2xl rounded-full w-28 h-28 object-cover border-4 border-blue-600" />
                                        </div>
                                        <div className='h-profilecarditems w-full flex flex-col items-center overflow-hidden'>
                                            <div className='h-2/6 w-full flex flex-col justify-center items-center  py-1'>
                                                <h1 className='text-xl font-bold text-center'>{rec.name}</h1>
                                                <h2 className='opacity-75 text-sm truncate'>{rec.trabalho}</h2>
                                            </div>
                                            <div className='h-2/6 w-full flex overflow-hidden justify-center items-center '>
                                                <p className='text-sm px-2 truncate-multiline text-center '>{rec.descrição}</p>
                                            </div>
                                            <div className='h-2/6 w-full flex overflow-hidden justify-center items-center '>
                                                <button onClick={() => handleButtonClick(rec.id)} type="submit"
                                                    className='w-36 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all'>Visitar</button>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            </>
                        );
                    })


                )}
            </div>


        </>
    );
}

export default CandidatosTable;
