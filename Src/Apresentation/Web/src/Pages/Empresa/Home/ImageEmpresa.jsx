import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import './Empresa.css'

const ImageEmpresa = () => {
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [userProfile, setUserProfile] = useState(null);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserProfile = async () => {
            const userDoc = doc(db, "Empresa", id);
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                setUserProfile(userSnap.data());
                setUserId(userSnap.id);
            } else {
                setUserProfile(null);
                alert("Sem documentos!");
            }
            setLoading(false); // Carregamento concluído
        };

        getUserProfile();
    }, [id]);


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
            <div className='h-EmpresaImg w-full flex EmpresaImgContainer bg-gray-800'>
                <div className="w-1/2 h-full flex items-center justify-center side-container">
                    <img src={userProfile.imageProfile} className='EmpresaImgPr rounded-xl' />
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