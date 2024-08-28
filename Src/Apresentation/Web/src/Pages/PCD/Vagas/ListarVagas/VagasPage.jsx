import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from '../../../../Database/Firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import Vagaslist from './Vagaslist';
import './VagasStyle.css';

import {
    FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";

const VagasPage = () => {
    const sidetext = `
        Com a utilização de um sistema em tempo real, todas as novas vagas e as que 
        estão disponíveis aparecem automaticamente na página, para sua próxima 
        jornada em uma nova ou conhecida empresa. Entretanto, fique ligado nos 
        processos que foram iniciados.
    `;

    return (
        <>
            <div className='h-vagashero w-full flex overflow-hidden bg-gray-300 '>
                <div className='w-1/2 h-full container-side flex justify-center items-center '>
                    <img src="https://i.postimg.cc/0NdyNLyF/Bellingham.png" className='h-full imgcontainer'  alt="side-image" />
                </div>
                <div className='w-1/2 h-full container-side text-side flex flex-col justify-center items-center bg-gray-800 gap-2 '>
                    <h1 className='text-2xl font-bold text-white text-center'>Está a procura de uma vaga ?</h1>
                    <p className='text-white line-clamp-3 w-3/4 text-justify text-base c'>{sidetext}</p>
                </div>
            </div>

            <div className='w-full h-fit py-6 justify-center items-center'>
                    <h1 className='text-3xl font-bold text-center '>Vagas Disponíveis</h1>
            </div>

            <Vagaslist />

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

export default VagasPage;