import React from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProcessosList from "./ProcessosList";
import Navbar from "../../Navbar/Navbar";
import './ProcessoEmpresas.css'

import {
    FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";

const ProcessosPage = () => {

    const sidetext = `
        Nesta Página você conseguirá visualizar suas vagas criadas, e modifica-las conforme sua necessidade.
    `

    return (
        <>
            <Navbar />

            <div className='w-full h-36 flex items-center justify-center'>
                <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gray-900 border-2 items-center justify-center px-5'>
                    <h1 className='font-bold text-2xl text-white'>Processos </h1>
                </div>
            </div>

            <ProcessosList />
            <div className="w-full h-empresashero flex overflow-hidden bg-gray-300">
                <div className="w-1/2 h-full flex items-center justify-center container-side">
                    <img src="https://i.postimg.cc/Kzd0sb42/Login.pngg" className='h-full imgcontainer' alt="side-image" />
                </div>
                <div className="w-1/2 h-full flex flex-col bg-gray-800 items-center justify-center gap-2 container-side text-side">
                    <h1 className='text-2xl font-bold text-white text-center'>Processos Ativos</h1>
                    <p className='text-white line-clamp-3 w-3/4 text-justify text-base'>{sidetext}</p>
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
    )
}


export default ProcessosPage;
