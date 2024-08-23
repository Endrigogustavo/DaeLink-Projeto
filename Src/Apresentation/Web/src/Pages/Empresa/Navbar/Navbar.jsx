import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [userProfile, setUserProfile] = useState(null);
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserProfile = async () => {
            const userDoc = doc(db, "Empresa", id);
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                setUserProfile(userSnap.data());
                setUserId(userSnap.id);
            } else {
                setUserProfile(null);
                alert("No such document!");
            }
            setLoading(false); // Carregamento concluído
        };

        getUserProfile();
    }, [id]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

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
        navigate(`/perfilempresa/${id}`);
    };

    const Navlinks = () => (
        <>
            <button onClick={() => handleButtonClick(userId)}>Criar Vaga</button>
            <button onClick={() => handleButtonClickProfile(userId)}>Candidatos</button>
            <button onClick={() => handleButtonClickVaga(userId)}>Processos</button>
        </>
    );

    return (
        <>
            <header className="flex justify-between px-12 items-center py-6 bg-state-50 border-b-2 border-gray-500">
                <Link to={`/homeempresa/${userId}`}>
                    <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className='max-sm-logo w-40' alt="Logo" />
                </Link>
                <nav className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Navlinks />
                    </div>
                    <IoSearch className='text-black text-2xl cursor-pointer iconhover' />
                    <button onClick={() => handleButtonProfileCompany(userId)} className='border-2 border-blue-500 rounded-full'>
                        {loading ? (
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div> // Placeholder enquanto carrega
                        ) : userProfile?.imageUrl ? (
                            <img src={userProfile.imageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
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
