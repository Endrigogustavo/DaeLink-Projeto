import './Navbar.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

function Navbar() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [userProfile, setUserProfile] = useState([]);
    const [userId, setUserId] = useState("");
    
    useEffect(() => {
        const getUserProfile = async () => {
            const userDoc = doc(db, "PCD", id);
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                setUserProfile(userSnap.data());
                setUserId(userSnap.id); // Define o ID do usuário no estado
            } else {
                setUserProfile(null);
                alert("No such document!");
            }
        };

        getUserProfile();
    }, [id]);

    const handleButtonClick = (id) => {
        navigate(`/homeuser/vagas/${id}`);
    };

    const handleButtonClickProcess = (id) => {
        navigate(`/homeuser/processos/${id}`);
    };


    return (
        <>
            <header>
                <nav class="fixed z-20 w-full bg-white/90 dark:bg-gray-900/80 backdrop-blur navbar shadow-2xl shadow-gray-600/5 border-b border-gray-100 dark:border-gray-800 peer-checked:navbar-active dark:shadow-none">
                    <div class="xl:container m-auto px-6 md:px-12 lg:px-6">
                        <div class="flex flex-wrap items-center justify-between gap-6 md:py-3 ">
                            <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" alt="" className='Logo' />

                            <div class="navmenu hidden w-full flex justify-end items-center mb-16 space-y-8 p-6 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0">
                            <center>
                                <div class="text-gray-600 navbar-itens items-center justify-center dark:text-gray-300">
                                    <ul class="space-y-6 tracking-wide font-medium text-base lg:text-sm items-center justify-center lg:flex lg:space-y-0">
                                        <li>
                                            <center>
                                                <button  onClick={() => handleButtonClickProcess(userId)} class="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">
                                                    <svg data-name="Layer 2" width="25px" height="25px" id="Layer_2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                        <path class="cls-1" d="M30,15a1,1,0,0,1-.58-.19L16,5.23,2.58,14.81a1,1,0,0,1-1.16-1.62l14-10a1,1,0,0,1,1.16,0l14,10A1,1,0,0,1,30,15Z" /><path class="cls-1" d="M5,9A1,1,0,0,1,4,8V4A1,1,0,0,1,5,3H9A1,1,0,0,1,9,5H6V8A1,1,0,0,1,5,9Z" /><path class="cls-1" d="M25,29H20a1,1,0,0,1-1-1V21H13v7a1,1,0,0,1-1,1H7a3,3,0,0,1-3-3V16a1,1,0,0,1,2,0V26a1,1,0,0,0,1,1h4V20a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v7h4a1,1,0,0,0,1-1V16a1,1,0,0,1,2,0V26A3,3,0,0,1,25,29Z" />
                                                    </svg>
                                                </button>
                                                <span>Processos</span>
                                            </center>
                                        </li>
                                        <li>
                                            <Link  to="/candidatos" class="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">
                                                <center>
                                                    <svg viewBox="0 0 64 64" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="Teamwork">
                                                            <path d="M22.2837,13.3631l2.9538,2.1461a1.9827,1.9827,0,0,1,.72,2.2168L24.83,21.1986a1.9827,1.9827,0,0,0,3.051,2.2166l2.9541-2.1461a1.9823,1.9823,0,0,1,2.3306,0l2.9541,2.1461a1.9827,1.9827,0,0,0,3.051-2.2166L38.042,17.726a1.9828,1.9828,0,0,1,.72-2.2168l2.9539-2.1461a1.9827,1.9827,0,0,0-1.1655-3.5867H36.9a1.9831,1.9831,0,0,1-1.8857-1.37L33.8857,4.9338a1.9826,1.9826,0,0,0-3.7712,0L28.9861,8.4064A1.9829,1.9829,0,0,1,27.1,9.7764H23.4492A1.9827,1.9827,0,0,0,22.2837,13.3631Z" /><path d="M37.4387,44.1386a1.1737,1.1737,0,0,1-.71-1.0786,1.1966,1.1966,0,0,1,.3718-.8779c.0725-.0691.1419-.1372.1939-.192a7.3474,7.3474,0,0,0,.9675-1.2707,7.3009,7.3009,0,0,0-7.637-10.9231,7.134,7.134,0,0,0-5.758,5.5937A7.3,7.3,0,0,0,26.88,42.1668a1.2386,1.2386,0,0,1,.3862.8793v.0061a1.1751,1.1751,0,0,1-.71,1.09,12.0152,12.0152,0,0,0-6.46,6.4014,15.2866,15.2866,0,0,0-1.274,6.2953v1.56A2.547,2.547,0,0,0,21.37,60.9459h21.261a2.5468,2.5468,0,0,0,2.5466-2.5468V56.8234a15.2521,15.2521,0,0,0-1.2761-6.292A12.0124,12.0124,0,0,0,37.4387,44.1386Z" /><path d="M60.8821,47.0135A12.0119,12.0119,0,0,0,54.42,40.6208a1.1745,1.1745,0,0,1-.71-1.0786,1.1973,1.1973,0,0,1,.3719-.878c.0725-.0692.1421-.1372.1938-.1921a7.3327,7.3327,0,0,0,.9676-1.27,7.3007,7.3007,0,0,0-7.6368-10.9232,7.1333,7.1333,0,0,0-5.758,5.5937,7.3,7.3,0,0,0,2.0129,6.7768,1.2373,1.2373,0,0,1,.3862.8792v.0063a1.1745,1.1745,0,0,1-.71,1.09,11.8293,11.8293,0,0,0-3.1953,1.9487,14.7374,14.7374,0,0,1,6.0188,6.8459,17.8408,17.8408,0,0,1,1.5161,7.405v.6043H59.6116a2.5468,2.5468,0,0,0,2.5468-2.5466V53.3056A15.25,15.25,0,0,0,60.8821,47.0135Z" /><path d="M23.66,42.5729a11.8205,11.8205,0,0,0-3.2026-1.9521,1.1744,1.1744,0,0,1-.71-1.0786,1.1968,1.1968,0,0,1,.3721-.878c.0722-.0692.1418-.1372.1938-.1921a7.341,7.341,0,0,0,.9673-1.27,7.3006,7.3006,0,0,0-7.6367-10.9232,7.1338,7.1338,0,0,0-5.7581,5.5937,7.3007,7.3007,0,0,0,2.013,6.7768,1.2369,1.2369,0,0,1,.3862.8792v.0063a1.1747,1.1747,0,0,1-.71,1.09,12.0156,12.0156,0,0,0-6.46,6.4013,15.2875,15.2875,0,0,0-1.2742,6.2953l0,1.5607a2.5465,2.5465,0,0,0,2.5466,2.5466H16.1228v-.5893a17.8839,17.8839,0,0,1,1.5127-7.4058A14.74,14.74,0,0,1,23.66,42.5729Z" /></g>
                                                    </svg>
                                                    <span>Empresas</span>
                                                </center>
                                            </Link>
                                        </li>
                                        <li>
                                            <button  onClick={() => handleButtonClick(userId)} class="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight">

                                                <center>
                                                    <svg viewBox="0 0 64 64" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg"><g id="Networking"><path d="M32,25.07a3.59,3.59,0,1,0,3.59,3.59A3.59,3.59,0,0,0,32,25.07Zm0,5.18a1.59,1.59,0,1,1,1.59-1.59A1.59,1.59,0,0,1,32,30.25Z" /><path d="M55.07,26.07A5.92,5.92,0,0,0,49.23,31H42.76a10.77,10.77,0,0,0-2.45-5.9l4.58-4.58a5.91,5.91,0,0,0,7.62-.64,6,6,0,0,0,0-8.39h0a5.93,5.93,0,0,0-9,7.62L38.9,23.69A10.77,10.77,0,0,0,33,21.24V14.77a5.93,5.93,0,1,0-2,0v6.47a10.77,10.77,0,0,0-5.9,2.45l-4.57-4.58a5.83,5.83,0,0,0,1.09-3.42,5.93,5.93,0,1,0-5.93,5.93,6,6,0,0,0,3.42-1.1l4.58,4.58A10.77,10.77,0,0,0,21.24,31H14.78a5.93,5.93,0,1,0,0,2h6.46a10.77,10.77,0,0,0,2.45,5.9l-4.58,4.58a5.92,5.92,0,1,0,2.51,4.83,5.83,5.83,0,0,0-1.09-3.42l4.57-4.58A10.77,10.77,0,0,0,31,42.76v6.47a5.93,5.93,0,1,0,2,0V42.76a10.77,10.77,0,0,0,5.9-2.45l4.58,4.58a5.93,5.93,0,1,0,1.41-1.41L40.31,38.9A10.77,10.77,0,0,0,42.76,33h6.47a5.93,5.93,0,1,0,5.84-6.93ZM45.53,12.91a3.94,3.94,0,0,1,5.56,0h0a3.93,3.93,0,1,1-5.56,5.56h0A3.94,3.94,0,0,1,45.53,12.91Zm-17.46-4A3.93,3.93,0,1,1,32,12.86,3.93,3.93,0,0,1,28.07,8.93ZM12.91,18.47a3.93,3.93,0,1,1,5.56,0h0A3.94,3.94,0,0,1,12.91,18.47Zm-4,17.46A3.93,3.93,0,1,1,12.87,32,3.94,3.94,0,0,1,8.93,35.93ZM32,40.81a8.8,8.8,0,0,1-5.67-2.08,6.44,6.44,0,0,1,11.34,0A8.8,8.8,0,0,1,32,40.81ZM18.47,51.09a3.93,3.93,0,1,1,0-5.56h0a3.94,3.94,0,0,1,0,5.56Zm17.46,4A3.93,3.93,0,1,1,32,51.14,3.93,3.93,0,0,1,35.93,55.07Zm15.16-9.54a3.93,3.93,0,1,1-5.56,0h0a3.94,3.94,0,0,1,5.56,0Zm-12-8.33a8.44,8.44,0,0,0-14.18,0A8.76,8.76,0,0,1,23.19,32h0a8.81,8.81,0,1,1,15.9,5.21Zm16-1.27A3.93,3.93,0,0,1,51.14,32h0a3.93,3.93,0,1,1,3.93,3.93Z" /></g></svg>
                                                    <span>Vagas</span>
                                                </center>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                </center>
                                <div class="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l">
                                    <Link  to="/vagas" class="relative flex  items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-sky-600/10 dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px" height="30px">
                                            <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038ZM4.622,9.311a1,1,0,0,1,2,0A2.692,2.692,0,0,0,9.311,12a1,1,0,0,1,0,2A4.7,4.7,0,0,1,4.622,9.311Z" />
                                        </svg>

                                    </Link>
                                    <Link  to="/logout">
                                    <img src={userProfile.imageUrl} alt="" class="w-10 h-10 rounded-full" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            
        </>
    )
}

export default Navbar
