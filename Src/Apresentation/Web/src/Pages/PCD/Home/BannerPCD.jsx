import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../../Home/Home.css'
import './PCD.css'

import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import { encrypt } from '../../../Security/Cryptography_Rotes';


const BannerPCD = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [motivationalText, setMotivationalText] = useState('');

    useEffect(() => {
        alert(id);
        const getPCDprofile = async () => {
            const PCDdoc = doc(db, "PCD", id);
            const GetPCDInfo = await getDoc(PCDdoc);
            if (GetPCDInfo.exists()) {
                setUserProfile(GetPCDInfo.data());
            } else {
                setUserProfile(null);
                alert("Sem documentos!");
            }
        };
        getPCDprofile();

        // Array de textos motivacionais
        const motivationalTexts = [
            "Oportunidades surgem para quem está preparado! Continue aprimorando suas habilidades e buscando novos desafios.",
            "Acredite no seu potencial e nunca subestime o impacto do seu trabalho. Cada experiência é um degrau a mais rumo ao crescimento profissional!",
            "Mudanças de carreira podem parecer desafiadoras, mas trazem novas chances de aprender e crescer.",
            "A busca pelo emprego dos sonhos exige persistência e resiliência. Não desista!",
            "Trabalhe com paixão e propósito. O sucesso se torna uma consequência natural!"
        ];

        // Seleciona uma frase aleatória
        const randomText = motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)];
        setMotivationalText(randomText);
    }, [id]);

    const handleButtonClickProcess = (id) => {
        const encryptedId = encrypt(id);
        navigate(`/homeuser/processos/${encodeURIComponent(encryptedId)}`);
    };

    const handleButtonClickProfile = (id) => {
        const encryptedId = encrypt(id);
        navigate(`/userprofile/${encodeURIComponent(encryptedId)}`);
    };

    return (
        <>
            <div className="w-full h-88vh banner overflow-hidden">
                <div className="w-full h-full flex items-center max-sm-flex-col">
                    <div className="w-1/2 h-full pb-24 pl-12 justify-center flex flex-col max-sm-w-full max-sm-pb-0 max-sm-pl-0 max-sm-text-center">
                        <h1 className="text-5xl font-bold block">Olá {userProfile?.name}!</h1>
                        <h1 className="pb-8 text-xl font-bold block">Como vai meu {userProfile?.trabalho} favorito?</h1>
                        <p className="text-justify line-clamp-4">
                            Frase do momento: "{motivationalText}"
                        </p>

                        <div className="flex w-full items-center max-sm-jusify gap-2 pt-2">
                            <button className="w-48 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all"
                                onClick={() => handleButtonClickProcess(id)}>
                                Verificar Processos
                            </button>
                            <button onClick={() => handleButtonClickProfile(id)}>Perfil</button>
                        </div>
                    </div>
                    <div className="w-1/2 h-full justify-center items-center flex overflow-hidden">
                        {userProfile?.imageUrl && (
                            <img src={userProfile.imageUrl} className='h-3/4 rounded-xl border-2 border-blue-500' alt="Imagem da Empresa" />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerPCD;