import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoCloseOutline, IoSearch } from 'react-icons/io5';
import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import { encrypt, decrypt } from '../../../Security/Cryptography_Rotes';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { id } = useParams(); // Obtendo o id da URL
    const decryptedId = decrypt(decodeURIComponent(id)); // Descriptografa o id

    // Função para alternar o menu de navegação
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Tenta obter o perfil usando o id descriptografado
                let idToUse = decryptedId || id;
                if (idToUse) {
                    const PCDdoc = doc(db, "PCD", idToUse);
                    const GetPCDInfo = await getDoc(PCDdoc);
                    if (GetPCDInfo.exists()) {
                        setUserProfile(GetPCDInfo.data());
                        setUserId(idToUse);
                    } else {
                        setUserProfile(null);
                        setUserId(""); // Limpa userId se o usuário não for encontrado
                        alert("No such document!");
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar o perfil do usuário: ", error);
                alert("Ocorreu um erro ao buscar o perfil do usuário.");
            } finally {
                setLoading(false); // Carregamento concluído
            }
        };

        fetchProfile();
    }, [id, decryptedId]); // Dependências do id e decryptedId

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
    const handleButtonClickProfile = (id) => {
        const encryptedId = encrypt(id);
        navigate(`/userprofile/${encodeURIComponent(encryptedId)}`);
    };

    const Navlinks = () => (
        <>
            <button onClick={() => handleButtonClickProcess(userId)}>Processos</button>
            <button onClick={() => handleButtonClickVagas(userId)}>Vagas</button>
            <button onClick={() => handleButtonClickEmpresas(userId)}>Empresas</button>
        </>
    );

    return (
        <>
            <header className="flex justify-between px-12 items-center py-6 bg-state-50 border-b-2 border-gray-500">
                <Link to={`/homeuser/${userId}`}>
                    <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className='max-sm-logo w-40' alt="Logo" />
                </Link>

                <nav className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Navlinks />
                    </div>
                    <IoSearch className='text-black text-2xl cursor-pointer iconhover' />
                    <button onClick={() => handleButtonClickProfile(userId)} className='border-2 border-blue-500 rounded-full'>
                        {loading ? (
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                        ) : userProfile?.imageUrl ? (
                            <img src={userProfile.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div> // Placeholder se não houver imagem
                        )}
                    </button>
                    <div className="flex md:hidden">
                        <button onClick={toggleNavbar}>
                            {isOpen ? <IoCloseOutline className='text-black text-2xl cursor-pointer' /> : <FiMenu className='text-black text-2xl cursor-pointer' />}
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
