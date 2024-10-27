import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

import '../../Home/Home.css'
import './Empresa.css'

const BannerEmpresa = () => {
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const getPCDprofile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-company', { withCredentials: true });
                setUserProfile(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error.response ? error.response.data : error.message);
                navigate(0)
            }
            
        };
        getPCDprofile();

    }, []);

    const handleButtonClick = () => {
        navigate(`/homeempresa/cadastrovaga/`);
    };

    const handleButtonClickVaga = () => {
        navigate(`/processos/`);
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
                                onClick={() => handleButtonClick()}>
                                Criar Vaga
                            </button>
                            <button onClick={() => handleButtonClickVaga()}>Processos</button>
                        </div>
                    </div>
                    <div className="w-1/2 h-full justify-center items-center flex overflow-hidden">
                        {userProfile?.imageUrl && (
                            <img src={userProfile.imageUrl} className='w-4/6 rounded-3xl border-2 border-blue-500 profilepic' alt="Imagem da Empresa" />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BannerEmpresa;
