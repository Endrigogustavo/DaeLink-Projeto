import './Profile.css'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { logout } from '../../../Auth/Auth';
import { decrypt } from '../../../Security/Cryptography_Rotes';
import CarregamentoTela from "../../../Components/TelaCarregamento/Carregamento"
import Navbar from "../Navbar/Navbar"

import { MdWork } from "react-icons/md";
import { FaUser } from "react-icons/fa";


function Profile() {
    const navigate = useNavigate();
    // Utilizado para pegar o id do usuário e da vaga na tela anterior
    const [id, setId] = useState("");
    // Variáveis onde as informações serão setadas
    const [userProfile, setUserProfile] = useState(null);
    const [vagas, setVagas] = useState([]);
    const [tab, setTab] = useState(1);
    const [loading, setLoading] = useState(true); // Estado de carregamento

    // useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const getCompanyProfileAndVagas = async () => {
            const storedUserId = localStorage.getItem('IdEmpresa');
            if (storedUserId) {
                setId(storedUserId);
            }

            try {
                // Caminho das informações da empresa no banco com base no ID
                const companyDocRef = doc(db, "Empresa", storedUserId);
                const companyDoc = await getDoc(companyDocRef);

                // Tratamento e setando dados recebidos em uma variável
                if (companyDoc.exists()) {
                    setUserProfile(companyDoc.data());

                    // Agora, buscar as vagas com base no empresaId
                    const vagasRef = collection(db, "Vagas"); // Referência à coleção de vagas
                    const q = query(vagasRef, where("empresaId", "==", storedUserId)); // Query para vagas da empresa
                    const vagasSnapshot = await getDocs(q);

                    // Mapeando e armazenando as vagas
                    const vagasList = vagasSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    // Definir as vagas no estado
                    setVagas(vagasList);
                } else {
                    setUserProfile(null);
                    alert("Sem documentos da empresa!");
                }
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            } finally {
                setLoading(false); // Parar carregamento após a busca
            }
        };

        // Iniciando a função
        getCompanyProfileAndVagas();
    }, [id]); // `id` como dependência para garantir que a busca execute após ele ser setado

    if (loading) {
        return <CarregamentoTela />;
    }

    if (!userProfile) {
        return <div>Erro ao carregar o perfil da empresa.</div>;
    }

    const handleTabChange = (tabIndex) => {
        setTab(tabIndex);
    };

    const handleButtonClick = (vagaId) => {
        localStorage.setItem('vagaId', vagaId);
        navigate(`/vagainfo/`);
    };

    return (
        <>
            <Navbar />

            <div className='h-80 w-full profilebackground border-b-4 border-gray-300'>
                <img src={userProfile.imageProfile} className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover" />
            </div>
            <div className='h-fit w-full flex px-8 responsiveprofilepage'>
                <div className='w-2/6 h-fit flex flex-col items-center relative transform -translate-y-24 gap-2 profilepicelement'>
                    <img class="w-64 h-64 rounded-full border-4 border-white "
                        src={userProfile.imageUrl}
                        alt="" />
                    <div className='w-full h-fit flex flex-col items-center'>
                        <div className='w-4/5'>
                            <h1 class="text-gray-900 font-bold text-xl leading-8">{userProfile.name}</h1>
                            <h3 class="text-gray-900 font-lg text-semibold leading-6">{userProfile.area}</h3>
                            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 ">
                                {userProfile.sobre}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-4/6 h-fit flex flex-col items-center pl-8  tabs-container'>
                    <div className='w-full flex justify-start items-center gap-2 responsive-tabsprofile'>
                        <div
                            className={`w-28 h-fit py-4 flex items-center justify-center rounded-b-lg cursor-pointer transitiontabs
                                ${tab === 1 ? 'bg-gray-900 text-white' : 'bg-gray-300'}`}
                            onClick={() => handleTabChange(1)}
                        >
                            <p className='font-medium'>Sobre</p>
                        </div>
                        <div
                            className={`w-28 h-fit py-4 flex items-center justify-center rounded-b-lg cursor-pointer transitiontabs
                                ${tab === 2 ? 'bg-gray-900 text-white' : 'bg-gray-300'}`}
                            onClick={() => handleTabChange(2)}
                        >
                            <p className='font-medium'>Vagas</p>
                        </div>

                    </div>
                    <div className={`w-full h-fit flex  py-2 gap-1 responsivecontentprofile ${tab === 1 ? 'gap-4' : ''}`}>
                        {tab === 1 && (
                            <>
                                <div className='w-80 h-fit rounded-3xl shadow-2xl border-2 border-gray-900 p-4 gap-2'>
                                    <div className='flex w-full justify-center gap-1'>
                                        <FaUser className='text-2xl' />
                                        <h2 className='font-medium text-lg'>Informações</h2>
                                    </div>
                                    <div className='flex gap-1 h-fit items-center'>
                                        <h2 className='font-medium text-lg'>Email:</h2>
                                        {userProfile.email}
                                    </div>

                                    <div className='flex gap-1 h-fit items-center'>
                                        <h2 className='font-medium text-lg'>Endereço:</h2>
                                        {userProfile.endereco}

                                    </div>

                                    <div className='flex gap-1 h-fit items-center'>
                                        <h2 className='font-medium text-lg'>CEP:</h2>
                                        {userProfile.cep}

                                    </div>

                                </div>

                            </>
                        )}
                        {tab === 2 && (
                            <>
                                <div className='flex flex-col gap-2 w-full'>
                                    <h1 className='font-bold text-2xl '>Vagas</h1>
                                    <div className='w-full grid  gap-4 overflow-x-hidden p-4 vagasprofilelist'>
                                        {vagas.map((vaga) => (
                                            <div key={vaga.id} className='h-36 w-80 rounded-3xl shadow-2xl flex 
                                            items-center justify-center gap-4 bg-white border-gray-400 
                                            border-2 cursor-pointer cardhover'>
                                                <div className='w-2/6 h-full flex items-center justify-center'>
                                                    <MdWork className='text-7xl text-gray-900 text-center bg-white p-4 rounded-full border-2 border-blue-600' />
                                                </div>
                                                <div className='w-4/6 h-full items-center justify-center flex flex-col pt-2'>
                                                    <div className='h-4/6 w-full flex flex-col justify-center'>
                                                        <h1 className='font-medium text-lg text-center px-1'>{vaga.vaga}</h1>
                                                        <p>R${vaga.salario}</p>
                                                        <p>{vaga.tipo}</p>
                                                    </div>
                                                    <div className='h-2/6 w-full flex items-center justify-center'>
                                                        <button className='w-28 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all'
                                                            type='submit' onClick={() => handleButtonClick(vaga.id)}>Visualizar</button>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </>
                        )}
                    </div>
                </div>

            </div >

        </>
    )
}

export default Profile
