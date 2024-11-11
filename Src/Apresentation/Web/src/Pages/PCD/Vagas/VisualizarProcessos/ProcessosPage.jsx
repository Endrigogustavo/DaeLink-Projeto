import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../../../../Database/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { decrypt, encrypt } from '../../../../Security/Cryptography_Rotes';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento"
import "./ProcessosStyle.css";
import ProcessosList from './ProcessosList';


import {
    FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";


function Processos_Page() {
    const { encryptedId } = useParams();
    const decryptedId = decrypt(decodeURIComponent(encryptedId));

    const sidetext = `
        Com um sistema em tempo real, todas as novas oportunidades de contratação e as vagas disponíveis são atualizadas
         automaticamente na página, facilitando a busca por novas jornadas em empresas, sejam elas novas ou conhecidas. 
         No entanto, é importante ficar atento aos processos de contratação que já foram iniciados. Acompanhe atentamente as etapas 
         e atualizações desses processos para garantir que você não perca nenhuma oportunidade ou atualização importante. 
        Mantenha-se informado sobre o andamento das suas candidaturas e prepare-se para os próximos passos.
    `;

    return (
        <>
            <div className='w-full h-36 flex items-center justify-center'>
                <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gradient-to-br from-gray-900 to-gray-800  border-2 items-center justify-center px-5'>
                    <h1 className='font-bold text-2xl text-white'>Processos </h1>
                </div>
            </div>

            <ProcessosList />

            <div className='h-processoshero w-full flex overflow-hidden bg-gray-300 '>
                <div className='w-1/2 h-full container-side flex justify-center items-center '>
                    <img src="https://i.postimg.cc/8ktnc47C/Girl-About.png" className='h-full imgcontainer' alt="side-image" />
                </div>
                <div className='w-1/2 h-full container-side text-side flex flex-col justify-center items-center bg-gray-800 gap-2 '>
                    <h1 className='text-2xl font-bold text-white text-center'>Processos Ativos</h1>
                    <p className='text-white line-clamp-3 w-3/4 text-justify text-base c'>{sidetext}</p>
                </div>
            </div>

            <div className="w-full bg-gray-900 h-16 ">
                <div className="flex w-full h-full items-center justify-center gap-4">
                    <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  cardhover" /></Link>
                    <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 cardhover" /></Link>
                    <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 cardhover" /></Link>
                </div>
            </div>

        </>
    );
}

export default Processos_Page;
