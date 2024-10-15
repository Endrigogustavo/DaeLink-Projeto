import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../../Home/Home.css'
import './Empresa.css'

import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

const BannerEmpresa = () => {
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [userProfile, setUserProfile] = useState(null);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const getUserProfile = async () => {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                const userId = storedUserId;
                setUserId(userId)
            }

            const userDoc = doc(db, "Empresa", userId);
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                setUserProfile(userSnap.data());
                setUserId(userSnap.id);
            } else {
                setUserProfile(null);
                ("No such document!");
            }
            setLoading(false); // Carregamento concluído
        };

        getUserProfile();
    }, [userId]);

    const handleButtonClick = (id) => {
        navigate(`/homeempresa/cadastrovaga/${id}`);
    };

    const handleButtonClickVaga = (IdEmpresa) => {
        navigate(`/processos/${IdEmpresa}`);
    };

    if (loading) {
        return <div>Loading...</div>; // Exibe um loading enquanto os dados estão sendo carregados
    }

    if (!userProfile) {
        return <div>Perfil não encontrado</div>; // Exibe uma mensagem caso o perfil não seja encontrado
    }

    return (
        <>
            <div className="w-full h-88vh banner overflow-hidden">
                <div className="w-full h-full flex items-center max-sm-flex-col">
                    <div className="w-1/2 h-full pb-24 pl-12 justify-center flex flex-col max-sm-w-full max-sm-pb-0 max-sm-pl-0 max-sm-text-center">
                        {/* Exibindo o nome da empresa com verificação de existência */}
                        <h1 className="text-5xl font-bold block">{userProfile?.name}</h1>
                        <h1 className="text-subtitle pb-8 text-2xl font-bold block">{userProfile?.area}</h1>
                        <p className="text-justify  line-clamp-4 sobretext">
                            {userProfile?.sobre}
                        </p>

                        <div className="flex w-full items-center max-sm-jusify gap-2 pt-2">
                            <button className="w-40 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all"
                                onClick={() => handleButtonClick(userId)}>
                                Criar Vaga
                            </button>
                            <button onClick={() => handleButtonClickVaga(userId)}>Processos</button>
                        </div>
                    </div>
                    <div className="w-1/2 h-full justify-center items-center flex overflow-hidden">
                        {userProfile?.imageUrl && (
                            <img src={userProfile.imageUrl} className='w-4/6 rounded-xl border-2 border-blue-500 profilepic' alt="Imagem da Empresa" />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BannerEmpresa;
