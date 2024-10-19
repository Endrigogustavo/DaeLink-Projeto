import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();
    const defaultempresaicon = "https://th.bing.com/th/id/OIP.9C1wSMkDpVtwSZbuxNwEZAAAAA?w=474&h=474&rs=1&pid=ImgDetMain";

  

    useEffect(() => {
        const getPCDprofile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-company', { withCredentials: true });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error.response ? error.response.data : error.message);
            }
        };
        getPCDprofile();

    }, []);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleButtonClick = (id) => {
        navigate(`/homeempresa/cadastrovaga/`);
    };

    const handleButtonClickProfile = () => {
        navigate(`/candidatos`);
    };

    const handleButtonClickVaga = () => {
        navigate(`/processos/`);
    };

    const handleButtonProfileCompany = () => {
        navigate(`/perfilempresa/`);
    };

    const Navlinks = () => (
        <>
            <button onClick={() => handleButtonClick()}>Criar Vaga</button>
            <button onClick={() => handleButtonClickProfile()}>Candidatos</button>
            <button onClick={() => handleButtonClickVaga()}>Processos</button>
        </>
    );

    return (
        <>
            <header className="flex justify-between px-12 items-center py-6 bg-state-50 border-b-2 border-gray-500">
                <Link to={`/homeempresa/`}>
                    <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className='max-sm-logo w-40' alt="Logo" />
                </Link>
                <nav className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Navlinks />
                    </div>
                  
                    <button onClick={() => handleButtonProfileCompany()} className='border-2 border-blue-500 rounded-full'>
                    {loading ? (
                            <img
                                src={userProfile?.imageUrl || defaultempresaicon}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                        ) : userProfile?.imageUrl ? (
                            <img
                                src={userProfile.imageUrl}
                                alt=""
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div> // Placeholder se não houver imagem
                        )}
                    </button>
                    <div className="flex md:hidden">
                        <button onClick={toggleNavbar}>
                            {isOpen ? (
                                <IoCloseOutline className='text-black text-2xl cursor-pointer' />
                            ) : (
                                <FiMenu className='text-black text-2xl cursor-pointer' />
                            )}
                        </button>
                    </div>
                </nav>
            </header>
            {isOpen && (
                <div className="md:hidden flex basis-full flex-col items-center gap-3 z-50 bg-state-50">
                    <Navlinks />
                </div>
            )}
        </>
    );
}
