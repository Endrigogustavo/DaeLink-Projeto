import './Profile.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

function Profile() {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
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

        getUserProfile();
    }, [id]);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div class="w-full background h-[500px]">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg" />
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
                            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                                <span>Similar Profiles</span>
                            </div>
                            <div class="grid grid-cols-3">
                                <div class="text-center my-2">
                                    <img class="h-16 w-16 rounded-full mx-auto"
                                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                        alt="" />
                                    <a href="#" class="text-main-color">Kojstantin</a>
                                </div>
                                <div class="text-center my-2">
                                    <img class="h-16 w-16 rounded-full mx-auto"
                                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                        alt="" />
                                    <a href="#" class="text-main-color">James</a>
                                </div>
                                <div class="text-center my-2">
                                    <img class="h-16 w-16 rounded-full mx-auto"
                                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                        alt="" />
                                    <a href="#" class="text-main-color">Natie</a>
                                </div>
                                <div class="text-center my-2">
                                    <img class="h-16 w-16 rounded-full mx-auto"
                                        src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                                        alt="" />
                                    <a href="#" class="text-main-color">Casey</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="w-full md:w-10/12 profile-user mx-2 h-64">
                        <div class="sm:block hidden">
                            <button
                                type="button"
                                class="flex button-profile -mt-12 w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0"
                            >
                                Edit profile
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
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
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
                                                        <span class="font-bold w-24">Mobile:</span>
                                                        <span class="text-gray-700">(123) 123-1234</span>
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
