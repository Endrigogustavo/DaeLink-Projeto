import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CandidatosTable from './CandidatosTable';
import './CandidatosStyle.css'


import {
    FaMagento, FaWpforms,
    FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";

const CandidatosPage = () => {
    return (
        <>

            <CandidatosTable />
            <h1 className='font-bold text-center text-3xl'> Recursos de Busca:</h1>
            <div className='w-full sm:h-96 flex flex-col sm:flex-row justify-center items-center gap-44'>
                
                <div className='h-3/5 w-56 shadow-2xl bg-white rounded-xl flex flex-col items-center pt-10 gap-2'>
                    <FaMagento className='text-3xl  text-center' />
                    <h1 className='text-center font-medium'>Machine Learning</h1>

                </div>
                <div className='h-3/5 w-56 shadow-2xl bg-white rounded-xl flex flex-col items-center pt-10 gap-2'>
                    <FaWpforms className='text-3xl ' />
                    <h1 className='text-center font-medium'>Candidatos</h1>

                </div>
                <div className='h-3/5 w-56 shadow-2xl bg-white rounded-xl flex flex-col items-center pt-10 gap-2'>
                    <IoLogoFirebase className='text-3xl ' />
                    <h1 className='text-center font-medium'>Real-Time Database</h1>

                </div>

            </div>

            <div className='w-full h-criarvaga flex  bg-gray-900 ' >
                <div className='w-1/2 h-full flex justify-center align-center '>
                    <img src="https://i.postimg.cc/bYMRV8d8/Andrew.png" className="object-cover" alt="Side Image" />
                </div>
                <div className='w-1/2 h-full flex justify-center align-center   '>
                    <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
                        <h1 className='text-white text-xl font-bold text-center'>Não encontrou o que procurava?</h1>
                        <p className='text-white line-clamp-3 px-40 text-justify'>Não encontrou um candidato com o cargo designado? Crie uma vaga para algum futuro candidato, ou até que algum usuário se torne capacitado para esta função.</p>
                        <button className='w-36 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all'>Criar Vaga</button>
                    </div>
                </div>

            </div>

            <div className="w-full bg-gray-900 h-16 ">
                <div className="flex w-full h-full items-center justify-center gap-4">
                    <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  mediahover" /></Link>
                    <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
                    <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
                </div>
            </div>
        </>
    )

}

export default CandidatosPage;