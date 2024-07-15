import React from "react";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import ImgBanner from '../../Img/HomeImg.png'

import './Css/Home.css'
function Banner() {
    return (
        <>
            <div className=" w-full h-88vh banner-color banner ">
                <div className="w-full flex items-center max-sm-flex-col">
                    <div className="w-1/2 h-full  pb-24 pl-12 justify-center flex flex-col max-sm-w-full max-sm-pb-0 max-sm-pl-0 max-sm-text-center" >
                        <h1 className="text-6xl font-bold block">DAELINK</h1>
                        <h1 className="text-subtitle pb-8 text-2xl font-bold block">A Plataforma de Empregabilidade PCD</h1>
                        <p className="text-justify pb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium iusto nesciunt quia sunt molestias aspernatur saepe quaerat atque corrupti, perferendis dicta natus libero alias repudiandae modi, possimus debitis voluptas ad.</p>

                        <div className="flex w-full items-center max-sm-jusify">
                            <button className=" w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all">Cadastrar-se</button>
                            <Link to={""} className="ml-5  flex items-center iconhover">Login <CiLogin className="flex text-2xl  " /> </Link>
                        </div>
                    </div>
                    <div className="w-1/2 h-full justify-center flex">

                        <img src={ImgBanner} className="image" alt="" />
                        {/**<img src="https://i.postimg.cc/Jzsv83S9/Sem-T-tulo-1.png" className="" alt=""> / */}
                    </div>

                </div>



            </div>

        </>
    )


}

export default Banner;