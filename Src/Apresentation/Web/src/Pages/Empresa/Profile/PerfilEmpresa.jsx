import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { logout } from '../../../Auth/Auth';
import CarregamentoTela from '../../../Components/TelaCarregamento/Carregamento';

import Navbar from "../Navbar/Navbar"

import { FaUser } from "react-icons/fa";

function Profile() {
    const navigate = useNavigate();
    //Utilizado para pegar o id do usuario e da vaga na tela anterior
    const [userId, setUserId] = useState('');
    //Variaveis onde as informações serão setadas
    const [userProfile, setUserProfile] = useState(null);
    const [tab, setTab] = useState(1);

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            const userId = storedUserId;
            setUserId(userId)
        }
        const getCompanyProfile = async () => {
            const CompanyDoc = doc(db, "Empresa", userId);
            const GetCompany = await getDoc(CompanyDoc);
            if (GetCompany.exists()) {
                setUserProfile(GetCompany.data());
            } else {
                setUserProfile(null);
            }
        };
        getCompanyProfile();
    }, [userId]);

    if (!userProfile) {
        return <CarregamentoTela />;
    }


    const EditProfile = (userId) => {
        navigate(`/editempresa/`)
    }

    async function LogoutProfile() {
        var response = confirm("Deseja fazer Logout?");
        if (response == true) {
            //Função do Auth.jsx para deslogar
            logout();
            localStorage.removeItem('userId');
            await axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
            Cookies.remove('userType')
            // Redireciona para a página de login após o logout
            navigate('/');
        }

    }

    const handleTabChange = (tabIndex) => {
        setTab(tabIndex);
    };


    return (
        <>
            <Navbar />

            <div className='h-80 w-full profilebackground border-b-4 border-gray-300'>
                <img src={userProfile.imageProfile} className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover" />
            </div>
            <div className='h-fit w-full flex px-8 responsiveprofilepage'>
                <div className='w-2/6 h-fit flex flex-col items-center relative transform -translate-y-24 gap-2 profilepicelement'>
                    <img class="w-64 h-64 rounded-full border-4 border-white  object-cover"
                        src={userProfile.imageUrl}
                        alt="" />
                    <div className='w-full h-fit flex flex-col items-center'>
                        <div className='w-4/5 profilecontent-responsive'>
                            <h1 class="text-gray-900 font-bold text-xl leading-8">{userProfile.name}</h1>
                            <h3 class="text-gray-900 font-lg text-semibold leading-6">{userProfile.trabalho}</h3>
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
                            <p className='font-medium'>Config</p>
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
                                <div className='flex flex-col gap-2'>
                                    <h1 className='font-bold text-2xl '>Opções</h1>
                                    <div className='flex gap-2 buttonoptions'>
                                        <button className=" w-40 bg-transparent hover:bg-green-400 font-bold 
                                             py-2 px-4 rounded-full transition-all border-2 border-gray-300"
                                            onClick={() => EditProfile(userId)}
                                        >Editar Perfil</button>
                                        <button className=" w-40 bg-transparent hover:bg-red-400 font-bold 
                                             py-2 px-4 rounded-full transition-all border-2 border-gray-300"
                                            onClick={LogoutProfile}
                                        >Logout</button>
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
