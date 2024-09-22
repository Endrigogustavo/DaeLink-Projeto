import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";

function Footer() {

  const FooterLinks = [
    {
      title: "Home",
      link: "/#"
    },
    {
      title: "Empresas",
      link: "/Empresas"
    },
    {
      title: "Vagas",
      link: "/Vagas"
    },
    {
      title: "Visualizar Documentos",
      link: "/Documentos"
    },
  ]

  const FooterLinks2 = [
    {
      title: "Regras",
      link: "/#"
    },
    {
      title: "Termos Legais",
      link: "/Empresas"
    },
    {
      title: "IBM",
      link: "/Vagas"
    },
    {
      title: "Etec da Zona Leste",
      link: "/Documentos"
    },
  ]

  return (
    <>
      <div className="dark:bg-gray-950 border-t-2 border-gray-300">
        <div className="container">
          <div className="grid md:grid-cols-3 pb-20 pt-5">
            {/**DAELINK */}
            <div className="py-8 px-4">
              <Link className="text-subtitle font-bold text-2xl">DAELINK</Link>
              <p className="text-gray-600 lg:pr-24 pt-3">Um sistema focado na melhora pessoal, e profissional.</p>
              <p className="text-gray-500 mt-4 mb-4"> TCC realizado por</p>
              <a className="w-14 bg-blue-500  text-white py-2 px-4 font-bold rounded-full ">Danilo - Alex - Endrigo</a>
            </div>

            <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
              {/**Link 1 */}
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold uppercase sm:text-left mb-3">Conteúdos</h1>
                <ul className="space-y-3">
                  <li>
                    {FooterLinks.map((data, index) => (
                      <li key={index}>
                        <Link to={data.link} className="text-gray-600 iconhover duration-300">{data.title} </Link>
                      </li>
                    ))}
                  </li>
                </ul>
              </div>
              {/**Link 2 */}
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold uppercase sm:text-left mb-3">Sobre</h1>
                <ul className="space-y-3">
                  <li>
                    {FooterLinks2.map((data, index) => (
                      <li key={index}>
                        <Link to={data.link} className="text-gray-600 iconhover duration-300">{data.title} </Link>
                      </li>
                    ))}
                  </li>
                </ul>
              </div>
              {/**Rede Social*/}
              <div className="py-8 px-4 col-span-2 sm:col-auto">
                <h1 className="text-xl font-bold uppercase sm:text-left mb-3">Contatos</h1>
                <div>
                  <div className="flex items-center gap-4 ">
                    <FaLocationArrow className="" />
                    <p>São Paulo, São Paulo</p>
                    <p>Brasil</p>
                  </div>
                  <div className="flex items-center gap-4 ">
                    <CiMobile3 className="" />
                    <p>+55 4002-8922</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      <div className="w-full bg-gray-900 h-16 ">
        <div className="flex w-full h-full items-center justify-center gap-4">
          <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  mediahover" /></Link>
          <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
          <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
        </div>
      </div>

    </>
  )
}

export default Footer
