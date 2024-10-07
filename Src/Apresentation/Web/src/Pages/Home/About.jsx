import React from "react";
import { FaChartLine, FaClipboardUser, FaDove, FaGear } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

const About = () => {

  return (
    <>
      <div className="h-75vh flex justify-center items-center  aboutcontainer overflow-hidden ">
        <img src="https://i.postimg.cc/8ktnc47C/Girl-About.png" alt="" className="flex " />
        <div className="bg-gray-900 w-4/6 h-5/6 rounded-64px flex aboutextcontainer">
          <div className="content w-full h-full flex flex-col items-center  gap-8 py-20">
            <div className="flex flex-col items-center ">
              <h1 className="text-3xl font-bold uppercase text-white pt-2 text-center">Quem Somos</h1>
              <h2 className="text-2xl font-medium text-white pb-8 text-center ">O que fazemos, como e o porquê.</h2>
            </div>

            <div className="flex w-full  justify-center px-16 gap-8 pb-8  itemscontentsd">
              {/* Item 1 */}
              <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                <FaClipboardUser className="text-white text-3xl" />
                <p className="text-justify text-white bg-gray-800 p-3 rounded-lg font-normal w-full h-4/5 ">
                  Fazemos a integração entre as empresas e as pessoas com deficiência (PCD) de forma ampla, em que a funcionalidade de nossa plataforma é projetada para o maior uso empresarial.
                </p>
              </div>

              {/* Item 2 */}
              <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                <FaChartLine className="text-white text-3xl" />
                <p className="text-justify text-white bg-gray-800 p-3 rounded-lg font-normal w-full h-4/5 ">
                  Simplificamos o recrutamento de pessoas com deficiência (PCD), através de um sistema de vagas e de encontro de candidatos (Matchs) tornando esse processo mais prático possível.
                </p>
              </div>

              {/* Item 3 */}
              <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                <FaDove className="text-white text-3xl" />
                <p className="text-justify text-white bg-gray-800 p-3 rounded-lg font-normal w-full h-4/5 ">
                  Acreditamos que iniciativas através da tecnologia possa trazer uma melhora significativa a vida de pessoas marginalizadas socialmente como em nosso caso os PCD.
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>

    </>
  )

}

export default About;