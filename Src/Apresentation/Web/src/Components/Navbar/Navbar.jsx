import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

export default function Navbar({ userType }) {
    const [isOpen, setIsOpen] = useState(false);


    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const Navlinks = () => {
        return (
            <>
                <NavLink to="/candidatos">Network</NavLink>
                <NavLink to="/vagas">Vagas</NavLink>
                <NavLink to="/empresas">Empresas</NavLink>
            </>
        )
    }

    const NavlinksPCD = () => {
        return (
            <>
                <button onClick={() => handleButtonClickProcess(userId)}>Processos</button>
                <button onClick={() => handleButtonClickVagas(userId)}>Vagas</button>
                <button onClick={() => handleButtonClickEmpresas(userId)}>Empresas</button>
            </>
        )
    }

    // Função para navegar para a tela de vagas
    const handleButtonClickVagas = (id) => {
        const encryptedId = encrypt(id);
        navigate(`/homeuser/vagas/${encodeURIComponent(encryptedId)}`);
    };

    const handleButtonClickEmpresas = (id) => {
        const encryptedId = encrypt(id);
        navigate(`/homeuser/empresas/${encodeURIComponent(encryptedId)}`);
    };

    // Função para navegar para a tela de processos
    const handleButtonClickProcess = (id) => {
        const encryptedId = encrypt(id);
        navigate(`/homeuser/processos/${encodeURIComponent(encryptedId)}`);
    };

    // Função para navegar para a tela de perfil do usuário


    const NavlinksEmpresa = () => {
        return (
            <>
                <button onClick={() => handleButtonClick(userId)}>Criar Vaga</button>
                <button onClick={() => handleButtonClickProfile(userId)}>Candidatos</button>
                <button onClick={() => handleButtonClickVaga(userId)}>Processos</button>
            </>
        )
    }

    const handleButtonClick = (id) => {
        navigate(`/homeempresa/cadastrovaga/${id}`);
    };

    const handleButtonClickProfile = (IdEmpresa) => {
        navigate(`/candidatos/${IdEmpresa}`);
    };

    const handleButtonClickVaga = (IdEmpresa) => {
        navigate(`/processos/${IdEmpresa}`);
    };

    const handleButtonProfileCompany = (id) => {
        navigate(`/editempresa/${id}`);
    };



    return (
        <>
            <header className="flex justify-between px-12 items-center py-6 bg-state-50 border-b-2 border-gray-500">
                <Link to="/"><img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className=' max-sm-logo w-40' /></Link>

                <nav className=" flex items-center gap-4">
                    <div className=" hidden md:flex items-center gap-4">
                        {userType === '' && <Navlinks></Navlinks>}
                        {userType === 'PCD' && <NavlinksPCD></NavlinksPCD>}
                        {userType === 'Empresa' && <NavlinksEmpresa></NavlinksEmpresa>}

                    </div>
                  
                    <Link to="/loginu">
                        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#1C274C" />
                        </svg></Link>
                    <div className="flex  md:hidden">
                        <button onClick={toggleNavbar}>{isOpen ? <IoCloseOutline className='text-black text-2xl cursor-pointer' /> : <FiMenu className='text-black text-2xl cursor-pointer' />}</button>

                    </div>
                </nav>
            </header>
            {isOpen && (
                <div className=" md:hidden flex basis-full flex-col items-center gap-3 z-50 bg-state-50" >
                    <Navlinks></Navlinks>
                </div>
            )}
        </>
    );
}
