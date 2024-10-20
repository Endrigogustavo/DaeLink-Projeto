import './Profile.css'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import axios from 'axios';
import Cookies from 'js-cookie';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import CarregamentoTela from '../../../Components/TelaCarregamento/Carregamento';

import { IoDocumentText } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import Navbar from '../Navbar/Navbar';

function Profile() {
    //Pegar o id do usuario na tela anterior

    //Função de navegação do site
    const [id, setId] = useState("")
    const navigate = useNavigate();
    //Variaveis para setar dados do banco
    const [userProfile, setUserProfile] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [idempresa, setUserId] = useState('');

    const [tab, setTab] = useState(1);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const storedUserId = localStorage.getItem('IdUser');
        if (storedUserId) {
            const userId = storedUserId;
            setUserId(userId)
        }
        const id = localStorage.getItem("Candidato")
        setId(id)
        //Pegando o sistema de recomendação do App.py para listar usuarios semelhantes
        const Recommendations = async () => {
            try {
                const id = localStorage.getItem("userId")
                //Rota do sistema de recomendação utilizando o axios no react e do flask do python
                //Utilizando o Id como base pesquisa
                const response = await axios.post('http://localhost:5000/profile', { id: id });
                //Setando informações aa variavel 
                setRecommendations(response.data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        //Informações do usuario
        const getPCDProfile = async () => {
            //Caminho do documento por base do ID na tabela PCD
            const PCDdoc = doc(db, "PCD", id);
            //Pegando dados
            const GetPCD = await getDoc(PCDdoc);
            //Tratamento para setar os dados
            if (GetPCD.exists()) {
                //Sucesso
                setUserProfile(GetPCD.data());
            } else {
                //Erro
                setUserProfile(null);

            }
        };
        //Iniciando as funções
        Recommendations();
        getPCDProfile();
    }, [id]);

    //Tela de carregamento
    if (!userProfile) {
        return <CarregamentoTela />;
    }

    //Botão para adicionar uma pessoa a vaga
    const ButtonClickAdd = () => {
        const id = localStorage.getItem("Candidato")
        navigate(`/addpessoa/`)
    }

    const ChatUser = async () => {
        try {
            const ChatCollection = collection(db, "Chat");
            await addDoc(ChatCollection, {
                userId: id,
                empresaId: idempresa
            });

            setWorksModal(true)
            setModalMessage("Chat Iniciado com Sucesso")
            setModalOpen(true)
            setTimeout(() => {
                localStorage.setItem("chatId", id)
                navigate(`/chat/`)
            }, 2200);

        } catch (error) {
            console.error('Erro ao iniciar chat:', error);
            setWorksModal(false)
            setModalMessage("Erro ao iniciar Chat")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 2200);
        }
    }

    const handleTabChange = (tabIndex) => {
        setTab(tabIndex);
    };

    return (
        <>
            <Navbar />
            <div>
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
            </div>
            <div className='h-80 w-full profilebackground border-b-4 border-gray-300'>
                <img src={userProfile.imageProfile} className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover" />
            </div>
            <div className='h-fit w-full flex px-8 responsiveprofilepage'>
                <div className='w-2/6 h-fit flex flex-col items-center relative transform -translate-y-24 gap-2 profilepicelement'>
                    <img class="w-64 h-64 rounded-full border-4 border-white object-cover"
                        src={userProfile.imageUrl}
                        alt="" />
                    <div className='w-full h-fit flex flex-col items-center'>
                        <div className='w-4/5 profilecontent-responsive'>
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
                            <p className='font-medium'>Ações</p>
                        </div>

                    </div>
                    <div className={`w-full h-fit flex  py-2 gap-1 responsivecontentprofile ${tab === 1 ? 'gap-4' : ''}`}>
                        {tab === 1 && (
                            <>

                                <div className='w-80 h-fit flex flex-col rounded-3xl shadow-2xl border-2 border-gray-900 p-4 gap-2'>
                                    <div className='flex w-full justify-center gap-1'>
                                        <FaUser className='text-2xl' />
                                        <h2 className='font-medium text-lg'>Informações</h2>
                                    </div>

                                    <div className='flex gap-1 h-fit items-center'>
                                        <h2 className='font-medium text-lg'>Email:</h2>
                                        {userProfile.email}

                                    </div>

                                    <div className='flex gap-1 h-fit items-center'>
                                        <h2 className='font-medium text-lg'>Deficiência:</h2>
                                        {userProfile.deficiencia}

                                    </div>

                                    <div className='flex gap-1 h-fit items-center'>
                                        <h2 className='font-medium text-lg'>Idade:</h2>
                                        {userProfile.idade}

                                    </div>


                                </div>

                                <div className='w-72 h-fit rounded-3xl shadow-2xl border-2 border-gray-300 p-4 gap-2'>
                                    <div className='flex w-full justify-center gap-1'>
                                        <FaNoteSticky className='text-2xl' />
                                        <h2 className='font-semibold text-lg'>Descrição</h2>
                                    </div>
                                    {userProfile.descrição}

                                </div>

                                <div className='w-72 h-fit rounded-3xl shadow-2xl border-2 border-gray-300 p-4 gap-2'>
                                    <div className='flex w-full justify-center gap-1'>
                                        <IoDocumentText className='text-2xl' />
                                        <h2 className='font-semibold text-lg'>Experiências</h2>
                                    </div>
                                    {userProfile.experiencias}

                                </div>

                            </>

                        )}
                        {tab === 2 && (
                            <>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='font-bold text-2xl '>Opções</h1>
                                    <div className='flex gap-2 buttonoptions'>
                                        <button className=" w-40 bg-transparent hover:bg-green-400 font-bold 
                                             py-2 px-4 rounded-full transition-all border-2 border-gray-300"
                                            onClick={ChatUser}
                                        >Chat</button>
                                        <button className=" w-44 bg-transparent hover:bg-blue-400 font-bold 
                                             py-2 px-4 rounded-full transition-all border-2 border-gray-300"
                                            onClick={ButtonClickAdd}
                                        >Adicionar Vaga</button>
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
