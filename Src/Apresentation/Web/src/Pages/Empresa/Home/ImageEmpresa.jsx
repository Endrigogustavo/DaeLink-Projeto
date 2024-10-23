import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Empresa.css'

const ImageEmpresa = () => {
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [userProfile, setUserProfile] = useState(null);


    useEffect(() => {
        const getPCDprofile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-company', { withCredentials: true });
                setUserProfile(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error.response ? error.response.data : error.message);
            }
            
        };
        getPCDprofile();

    }, []);


    if (loading) {
        return <div>Loading...</div>; // Exibe um loading enquanto os dados estão sendo carregados
    }

    if (!userProfile) {
        return <div>Perfil não encontrado</div>; // Exibe uma mensagem caso o perfil não seja encontrado
    }

    const texto = `Quanto maior a empresa, maiores as necessidades
    por isso queremos lhe ajudar, e ajudar os PCD's em seus objetivos
    facilitando esse processo de comunicação entre os dois.`


    return (
        <>
            <div className='h-EmpresaImg w-full flex EmpresaImgContainer bg-gray-800 overflow-hidden'>
                <div className="w-1/2 h-full flex items-center justify-center side-container">
                    <img src={userProfile.imageProfile} className='EmpresaImgPr rounded-3xl' />
                </div>
                <div className="w-1/2 h-full flex items-center justify-center side-container bg-gray-900 textempresa-side">
                    <div className='w-full h-full flex items-center justify-center flex-col gap-2'>
                        <h1 className="text-white carousel-text text-2xl font-bold flex">Seu Crescimento é nosso Foco</h1>
                        <p className="text-white text-justify font-normal w-4/5 ">{texto}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ImageEmpresa;