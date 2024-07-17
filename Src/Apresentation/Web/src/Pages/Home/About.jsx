import React from "react";
import { FaGear } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

const About = () => {

    return (
        <>
            <div className="h-75vh flex justify-center items-center  aboutcontainer overflow-hidden ">
                <img src="https://i.postimg.cc/8ktnc47C/Girl-About.png" alt="" className="flex " />
                <div className="bg-gray-900 w-4/6 h-5/6 rounded-64px flex aboutextcontainer">
                    <div className="content w-full h-full flex flex-col items-center  gap-16 py-20">
                        <div className="flex flex-col items-center ">
                            <h1 className="text-3xl font-bold uppercase text-white pt-2 text-center">Quem Somos</h1>
                            <h2 className="text-2xl font-semibold text-white pb-8 text-center ">O que fazemos, como e o porquê....</h2>
                            <p className="text-justify px-20 text-white sm-textrun">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatem nulla quam ex quidem maxime nemo beatae libero! Quisquam unde ea earum, cumque fugit in!</p>
                        </div>
                        <div className="flex w-full  justify-center px-16 gap-8 pb-8  itemscontentsd">
                            <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                                <FaGear className='text-white text-3xl cursor-pointer ' />
                                <p className="text-justify text-white bg-gray-800 px-4 py-4 rounded-lg " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ab in nulla!</p>
                            </div>
                            <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                                <FaBook className='text-white text-3xl cursor-pointer' />
                                <p className="text-justify text-white bg-gray-800 px-4 py-4 rounded-lg " >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae inventore voluptatem.</p>
                            </div>
                            <div className="w-1/3 flex flex-col items-center gap-4  itemstextboxsd">
                                <FaCircleInfo className='text-white text-3xl cursor-pointer ' />
                                <p className="text-justify text-white bg-gray-800 px-4 py-4 rounded-lg ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet neque autem temporibus!</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )

}

export default About;