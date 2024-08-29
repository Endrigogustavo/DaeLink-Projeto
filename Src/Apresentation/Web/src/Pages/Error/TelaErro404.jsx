import React from "react";
import './style.css'


//https://www.deviantart.com/wabisabiwonders/gallery

const Tela404 = () => {

    return (
        <>
            <div className="w-screen h-screen bg-gray-900 flex">
                <div className="w-5/12 h-full flex items-center justify-center bg-gray-300">
                    <img src="https://i.postimg.cc/0NdyNLyF/Bellingham.png" className="" alt="" />
                </div>

                <div className="w-7/12 h-full flex items-center flex-col justify-center gap-2">
                    <h1 className="text-4xl text-white font-medium">Erro 404</h1>
                    <p className="text-white text-justify text-lg opacity-80">Nada Encontrado</p>
                    <p className="text-white text-justify">Talvez essa página não exista ou tenha sido movida</p>
                    <button
                        type="submit"
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

