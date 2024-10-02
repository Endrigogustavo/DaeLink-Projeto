import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { encrypt } from '../../../Security/Cryptography_Rotes';
import { FaSquareXmark } from "react-icons/fa6";

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
                const CompanyCollection = collection(db, "Empresa");
                const data = await getDocs(CompanyCollection);
                setEmpresas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Erro ao buscar empresas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmpresas();
    }, []);

    const ViewCompanyProfile = (id) => {
        const encryptedId = encodeURIComponent(encrypt(id));
        navigate(`/visualizperfilempresa/${encryptedId}`);
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
                className={`w-full h-fit flex justify-center items-center flex-col ${loading ? '' : 'grid Empresascontainer gap-y-6 justify-items-center items-center pb-4 pt-4'}`}
            >
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    </div>
                ) : (
                    empresas.length > 0 ? (
                        empresas.map((empresa) => (
                            <div
                                key={empresa.id}
                                className='empresa-item h-80 w-72 bg-gray-900 rounded-xl flex flex-col gap-2 border-blue-500 border-4 overflow-hidden opacity-0 transform transition-opacity transition-transform duration-500 ease-out'
                            >
                                <div className='w-full h-3/6 flex flex-col items-center justify-center gap-3'>
                                    <img
                                        src={empresa.imageProfile || defaultempresawallpaper}
                                        alt="Empresa Wallpaper"
                                        className='w-full h-full relative object-cover opacity-80'
                                    />
                                    <img
                                        src={empresa.imageUrl || defaultempresaicon}
                                        alt="Empresa Logo"
                                        className='rounded-full w-24 h-24 object-cover absolute border-blue-500 border-4'
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-center">
                                    <h1 className='font-medium text-xl text-center text-white'>{empresa.name || "Nome"}</h1>
                                    <p className='text-white opacity-80 text-sm px-4 truncate'>{empresa.email}</p>
                                    <p className='text-white opacity-80 text-sm px-4 truncate'>{empresa.endereco}</p>
                                    <p className='text-white opacity-80 text-sm px-4 truncate'>{empresa.area}</p>
                                </div>
                                <div className='w-full flex justify-center'>
                                    <button
                                        onClick={() => ViewCompanyProfile(empresa.id)}
                                        type="submit"
                                        className='w-44 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all'
                                    >
                                        Visualizar Empresa
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='w-3/12 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                            <div className='w-2/6 h-full flex items-center justify-center'>
                                <FaSquareXmark className='text-5xl text-gray-900  text-center' />
                            </div>
                            <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                                <p className='font-medium text-lg text-center'>Sem empresas disponíveis</p>
                                <p className='font-normal text-base text-center'>Por favor volte em outro momento.</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
}

export default EmpresasList;
