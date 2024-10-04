import React from "react";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import ImgHome from '../../Img/HomeImg.png'
import './Home.css'


const Banner = () => {
    return (
        <>
            <div className=" w-full h-88vh banner overflow-hidden ">
                <div className="w-full h-full flex items-center max-sm-flex-col">
                    <div className="w-1/2 h-full  pb-24 pl-12 justify-center flex flex-col max-sm-w-full max-sm-pb-0 max-sm-pl-0 max-sm-text-center" >
                        <h1 className="text-5xl font-bold block">DAELINK</h1>
                        <h1 className="text-subtitle pb-8 text-2xl font-bold block">A Plataforma de Empregabilidade PCD</h1>
                        <p className="text-justify pb-10 line-clamp-3">Somos uma empresa que visamos a integração social dos PCD ao mercado de trabalho por meio de nossa plataforma, fazendo uso de um sistema próximo ao de redes sociais profissionais com uma execução ágil diminuindo os processos de recrutamento.</p>

                        <div className="flex w-full items-center max-sm-jusify">
                            <Link to={"cadastrouser"}><button className=" w-40 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all">Cadastrar-se</button></Link>
                            <Link to={"loginu"} className="ml-5  flex items-center iconhover">Entrar <CiLogin className="flex text-2xl  " /> </Link>
                        </div>
                    </div>
                    <div className="w-1/2 h-full justify-end items-center flex relative">
                        <img
                            src={ImgHome}
                            className="h-full absolute top-[-50px] right-[-50px] imgFun w-auto min-w-full min-h-full object-cover"
                        />
                    </div>

                </div>
            </div>
        </>
    )


}

export default Banner;
