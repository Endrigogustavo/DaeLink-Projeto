import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { encrypt } from '../../../Security/Cryptography_Rotes';
import { FaSquareXmark } from "react-icons/fa6";
import axios from 'axios';

function EmpresasList() {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const defaultempresaicon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7OOS70yj8sex-Sw9mgQOnJKzNsUN3uWZCw&s";
    const defaultempresawallpaper = "https://c4.wallpaperflare.com/wallpaper/251/165/174/building-lights-usa-night-wallpaper-preview.jpg";

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-all-company', { withCredentials: true });
                setEmpresas(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error.response ? error.response.data : error.message);
            }
        };

        fetchEmpresas();
    }, []);

    const ViewCompanyProfile = (id) => {
        localStorage.setItem('IdEmpresa', id);
        navigate(`/visualizperfilempresa`);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fadeIn');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = containerRef.current.querySelectorAll('.empresa-item');
        elements.forEach((element) => observer.observe(element));

        return () => {
            if (containerRef.current) {
                observer.disconnect();
            }
        };
    }, [empresas]);

    return (
        <>
            <div
                ref={containerRef}
                className={`w-full h-fit flex justify-center items-center flex-col ${
                    (loading || empresas.length > 0) && 'grid Empresascontainer gap-4   gap-y-12 justify-items-center items-center py-4 pb-8'
                }`}
            >
                {loading ? (
                    // Exibe skeleton loaders enquanto está carregando
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className='h-profilecard w-72 rounded-3xl flex flex-col items-center justify-center border-gray-400 border-2 shadow-2xl overflow-hidden animate-pulse'>
                            <div className="rounded-full bg-gray-400 w-28 h-28"></div>
                            <div className="h-6 bg-gray-400 w-40 rounded"></div>
                            <div className="h-4 bg-gray-400 w-32 rounded"></div>
                            <div className="h-4 bg-gray-400 w-48 rounded"></div>
                            <div className="h-10 bg-gray-400 w-36 rounded-full"></div>
                        </div>
                    ))
                ) : empresas.length > 0 ? (
                    empresas.map((empresa) => (
                        <div key={empresa.id} className='h-profilecard w-72  rounded-3xl flex flex-col 
                        items-center justify-center border-gray-400 border-2 shadow-2xl overflow-hidden'>
                            <div className='h-profilecardbanner w-full flex items-center justify-center overflow-hidden relative'>
                                <img src={empresa.imageProfile} className='h-full w-full object-cover opacity-20 backprofile-opacity' />
                                <img src={empresa.imageUrl || fotodefault} className="mt-12 absolute shadow-2xl rounded-full w-28 h-28 object-cover border-4 border-blue-600 object-cover" />
                            </div>
                            <div className='h-profilecarditems w-full flex flex-col items-center overflow-hidden'>
                                <div className='h-2/6 w-full flex flex-col justify-center items-center  py-1'>
                                    <h1 className='text-xl font-bold text-center'>{empresa.name}</h1>
                                    <h2 className='opacity-75 text-sm truncate'>{empresa.area}</h2>
                                </div>
                                <div className='h-2/6 w-full flex overflow-hidden justify-center items-center'>
                                    <p className='text-sm px-2 truncate-multiline text-center'>{empresa.sobre}</p>
                                </div>
                                <div className='h-2/6 w-full flex overflow-hidden justify-center items-center'>
                                    <button
                                        onClick={() => ViewCompanyProfile(empresa.id)}
                                        type="submit"
                                        className='w-32 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all'
                                    >
                                        Conhecer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                        <div className='w-2/6 h-full flex items-center justify-center'>
                            <FaSquareXmark className='text-5xl text-gray-900  text-center' />
                        </div>
                        <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                            <p className='font-medium text-lg text-center'>Sem empresas disponíveis</p>
                            <p className='font-normal text-base text-center'>Por favor volte em outro momento.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default EmpresasList;
