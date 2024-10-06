import React from "react";
import ProcessosList from "./ProcessosList";
import Navbar from "../../Navbar/Navbar";
import './ProcessoEmpresas.css'

const ProcessosPage = () => {

    const sidetext = `
        Nesta Página você conseguirá visualizar suas vagas criadas, e modifica-las conforme sua necessidade.
    `

    return (
        <>
            <Navbar />
            <div className="w-full h-empresashero flex overflow-hidden bg-gray-300">
                <div className="w-1/2 h-full flex items-center justify-center container-side">
                    <img src="https://i.postimg.cc/Kzd0sb42/Login.pngg" className='h-full imgcontainer' alt="side-image" />
                </div>
                <div className="w-1/2 h-full flex flex-col bg-gray-800 items-center justify-center gap-2 container-side text-side">
                    <h1 className='text-2xl font-bold text-white text-center'>Processos Ativos</h1>
                    <p className='text-white line-clamp-3 w-3/4 text-justify text-base'>{sidetext}</p>
                </div>
            </div>

            <ProcessosList />
        </>
    )
}


export default ProcessosPage;
