import React from "react";
import './PCD.css'

const AppPCD = () => {
    const texto = `Oportunidades não precisam parar por aqui! Com o Aplicativo Companion, 
    você pode continuar sua jornada profissional de forma acessível e prática. 
    Receba atualizações em tempo real sobre vagas inclusivas, 
    conecte-se com empresas que valorizam a diversidade e acompanhe seus processos seletivos diretamente no app.`

    return (
        <>
            <div className='h-AppPCD w-full flex AppPCDContainer bg-gray-800'>
                <div className="w-1/2 h-full flex items-center justify-center side-container bg-gray-900">
                    <img src="https://i.postimg.cc/zf6BdTYT/Dispon-vel-para-Iphone-e-Android.png" className='APPimg rounded-xl' />
                </div>
                <div className="w-1/2 h-full flex items-center justify-center side-container app-textside ">
                    <div className='w-full h-full flex items-center justify-center flex-col gap-2'>
                        <h1 className="text-white carousel-text text-2xl font-bold flex">Por que parar agora?</h1>
                        <p className="text-white text-justify font-normal w-4/5 ">{texto}</p>
                    </div>
                </div>

            </div>


        </>
    )



}

export default AppPCD;