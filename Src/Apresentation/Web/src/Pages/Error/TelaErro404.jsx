import React from "react";
import { useNavigate } from 'react-router-dom';
import './style.css'

import error from '../../Img/404.svg'


//https://www.deviantart.com/wabisabiwonders/gallery

const Tela404 = () => {
    const navigate = useNavigate()
    const BackView =() =>{
     navigate(-1)
    }

    return (
        <>
            <div className="w-screen h-screen bg-gray-900 flex">
                <div className="w-5/12 h-full flex items-center justify-center bg-gray-300 img-container">
                    <img src={error} className="" alt="" />
                </div>

                <div className="w-7/12 h-full flex items-center  side-container flex-col justify-center gap-2">
                    <img src="https://i.postimg.cc/nh7bpn6C/pnglogo.png" alt=""  className="hidden logoimg h-28 pb-4"/>
                    <h1 className="text-4xl text-white font-medium">Erro 404</h1>
                    <p className="text-white text-justify text-lg opacity-80">Nada Encontrado</p>
                    <p className="text-white text-justify r">Talvez essa página não exista ou tenha sido movida</p>
                    <button
                        type="submit"
                        onClick={BackView}
                        className='w-44 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all'
                    >
                        Voltar
                    </button>
                </div>

            </div>
        </>
    )

}

export default Tela404;

