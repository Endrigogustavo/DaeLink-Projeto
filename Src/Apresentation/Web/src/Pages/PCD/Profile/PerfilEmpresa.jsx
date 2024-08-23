import './Profile.css'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { logout } from '../../../Auth/Auth';
import { decrypt } from '../../../Secutity/Cryptography_Rotes';


function Profile() {
    const navigate = useNavigate();
    //Utilizado para pegar o id do usuario e da vaga na tela anterior
    const { id } = useParams();

    const decryptedId = decrypt(decodeURIComponent(id))
    //Variaveis onde as informações serão setadas
    const [userProfile, setUserProfile] = useState(null);

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const getCompanyProfile = async () => {
            //Caminho das informações do banco com base no ID
            const CompanyDoc = doc(db, "Empresa", decryptedId);
            //Pegando os dados
            const GetCompany = await getDoc(CompanyDoc);
            //Tratamento e setando dados recebidos em uma variavel
            if (GetCompany.exists()) {
                setUserProfile(GetCompany.data());
            } else {
                setUserProfile(null);
                alert("Sem documentos!");
            }
        };
        //Iniciando a função
        getCompanyProfile();
    }, [decryptedId]);

    if (!userProfile) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="w-full background h-[700px]">
                <img src={userProfile.imageProfile} className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover" />
            </div>

            <div class="container mx-auto my-5 p-5">
                <div class="md:flex profile no-wrap md:-mx-2 ">
                    <div class="w-full md:w-4/12 md:mx-2">
                        <div class="">
                            <div class="image overflow-hidden">
                                <img class="mx-auto ImgProfile flex-shrink-0 rounded-full"
                                    src={userProfile.imageUrl}
                                    alt="" />
                            </div>
                            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{userProfile.name}</h1>
                            <h3 class="text-gray-600 font-lg text-semibold leading-6">{userProfile.area}</h3>
                            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                {userProfile.sobre}
                            </p>

                        </div>

                        <div class="my-4"></div>

                        <div class="bg-white p-3 hover:shadow">
                            <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                <span class="text-green-500">
                                    <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </span>

                            </div>
                        </div>

                    </div>

                    <div class="w-full md:w-10/12 profile-user mx-2 h-64">
                        <div class="sm:block hidden">
                            <br />
                            <div class="bg-white p-3 shadow-sm rounded-sm">
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">

                                        <span clas="text-green-500">
                                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>


                                    </span>
                                    <span class="tracking-wide">Sobre a empresa</span>
                                </div>
                                <div class="text-gray-700">
                                    <div class="grid md:grid-cols-2 text-sm">
                                        {userProfile.sobre}

                                    </div>
                                </div>
                            </div>

                            <div class="my-4"></div>


                            <div class="bg-white p-3 shadow-sm rounded-sm">

                                <div class="grid ">
                                    <div>
                                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                            <span clas="text-green-500">
                                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </span>
                                            <span class="tracking-wide">Area da empresa</span>
                                        </div>
                                        <p>
                                            {
                                                userProfile.area
                                            } </p>
                                    </div>
                                    <div>
                                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                            <span clas="text-green-500">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="bg-white p-3 shadow-sm rounded-sm">

                                <div class="grid ">
                                    <div>
                                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span class="tracking-wide">Informações </span>
                                        </div>

                                        <div class="">
                                            <div class="flex-1 bg-white rounded-lg ">
                                                <ul class="mt-2 text-gray-700">
                                                    <li class="flex border-y py-2">
                                                        <span class="font-bold w-24">Nome:</span>
                                                        <span class="text-gray-700">{userProfile.name}</span>
                                                    </li>
                                                    <li class="flex border-b py-2">
                                                        <span class="font-bold w-24">Endereço</span>
                                                        <span class="text-gray-700">{userProfile.endereco}</span>
                                                    </li>
                                                    <li class="flex border-b py-2">
                                                        <span class="font-bold w-24">Email:</span>
                                                        <span class="text-gray-700">{userProfile.email}</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                                    <span clas="text-green-500">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
