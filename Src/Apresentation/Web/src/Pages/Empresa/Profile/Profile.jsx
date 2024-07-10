import './Profile.css'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';

function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.post('http://localhost:5000/profile', { id: id });
                setRecommendations(response.data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        const getUserProfile = async () => {
            const userDoc = doc(db, "PCD", id);
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                setUserProfile(userSnap.data());
            } else {
                setUserProfile(null);
                alert("No such document!");
            }
        };

        fetchRecommendations();
        getUserProfile();
    }, [id]);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    const ButtonClickAdd = () =>{
        navigate(`/addpessoa/${id}`)
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
                            <h3 class="text-gray-600 font-lg text-semibold leading-6">{userProfile.trabalho}</h3>
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
                                <span>Outros semelhantes</span>
                            </div>
                            {recommendations.map((rec) => (
                            <div class="grid grid-cols-3">
                                <div class="text-center my-2">
                                    <img class="h-16 w-16 rounded-full mx-auto"
                                        src={rec.imageUrl}
                                        alt="" />
                                    <a href="#" class="text-main-color">{rec.name}</a>
                                </div>
                            </div>
                            ))}
                        </div>

                    </div>

                    <div class="w-full md:w-10/12 profile-user mx-2 h-64">
                        <div class="sm:block hidden">
                            <button
                                type="button"
                                onClick={ButtonClickAdd}
                                class="flex button-profile -mt-12 w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0"
                            >
                                Adicionar a vaga
                            </button>
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
                                    <span class="tracking-wide">Sobre o trabalho</span>
                                </div>
                                <div class="text-gray-700">
                                    <div class="grid md:grid-cols-2 text-sm">
                                    {userProfile.descrição}
                                       
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
                                            <span class="tracking-wide">Experiencias</span>
                                        </div>
                                        <p>
                                           {
                                            userProfile.experiencias
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
                                            <span class="tracking-wide">Sobre a pessoa</span>
                                        </div>

                                        <div class="">
                                            <div class="flex-1 bg-white rounded-lg ">
                                                <ul class="mt-2 text-gray-700">
                                                    <li class="flex border-y py-2">
                                                        <span class="font-bold w-24">Nome:</span>
                                                        <span class="text-gray-700">{userProfile.name}</span>
                                                    </li>
                                                    <li class="flex border-b py-2">
                                                        <span class="font-bold w-24">Aniversario</span>
                                                        <span class="text-gray-700">{userProfile.idade}</span>
                                                    </li>

                                                    <li class="flex border-b py-2">
                                                        <span class="font-bold w-24">Deficiencia:</span>
                                                        <span class="text-gray-700">{userProfile.deficiencia}</span>
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
