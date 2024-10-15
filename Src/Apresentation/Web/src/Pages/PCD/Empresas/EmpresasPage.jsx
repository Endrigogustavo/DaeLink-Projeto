import React from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmpresasList from "./EmpresasList";
import "./EmpresasStyle.css"

import {
    FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";

const EmpresasPage = () => {
    const sidetext = `
       Nesta página, você pode visualizar todas as empresas disponíveis, permitindo que escolha a sua favorita.
        Com a atualização em tempo real, as novas empresas aparecem automaticamente, 
        oferecendo uma visão sempre atualizada das oportunidades. 
       Fique atento para escolher a empresa que mais se alinha com suas aspirações e objetivos profissionais.
    `;


    return (
        <>
            <div className="w-full h-empresashero flex overflow-hidden bg-gray-300">
                <div className="w-1/2 h-full flex items-center justify-center container-side">
                    <img src="https://i.postimg.cc/Kzd0sb42/Login.pngg" className='h-full imgcontainer' alt="side-image" />
                </div>
                <div className="w-1/2 h-full flex flex-col bg-gray-800 items-center justify-center gap-2 container-side text-side">
                    <h1 className='text-2xl font-bold text-white text-center'>Buscando sua Empresa ideal?</h1>
                    <p className='text-white line-clamp-3 w-3/4 text-justify text-base c'>{sidetext}</p>
                </div>
            </div>
            <div className='w-full h-fit py-6 justify-center items-center'>
                <h1 className='text-3xl font-bold text-center '>Empresas Disponíveis</h1>
            </div>
            <EmpresasList />


            <div className="w-full bg-gray-900 h-16 ">
                <div className="flex w-full h-full items-center justify-center gap-4">
                    <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  cardhover" /></Link>
                    <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 cardhover" /></Link>
                    <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 cardhover" /></Link>
                </div>
            </div>
        </>

    )
}

export default EmpresasPage