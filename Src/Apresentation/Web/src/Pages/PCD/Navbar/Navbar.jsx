import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    //Função de navegação do site
    const navigate = useNavigate();
    //Utilizado para pegar o id do usuario e da vaga na tela anterior
    const { id } = useParams();
    //Variaveis onde as informações serão setadas
    const [userProfile, setUserProfile] = useState([]);
    const [userId, setUserId] = useState("");

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const getUserProfile = async () => {
            //Caminho das informações do banco com base no ID
            const userDoc = doc(db, "PCD", id);
            //Pegando os dados
            const userSnap = await getDoc(userDoc);
            //Tratamento e setando dados recebidos em uma variavel
            if (userSnap.exists()) {
                setUserProfile(userSnap.data());
                setUserId(userSnap.id);
            } else {
                setUserProfile(null);
                alert("No such document!");
            }
        };
        //Iniciando a função
        getUserProfile();
    }, [id]);

    //Botão onde entra na tela de vagas com base no ID do user
    const handleButtonClick = (id) => {
        navigate(`/homeuser/vagas/${id}`);
    };

    //Botão onde entra na tela de processos com base no ID do user
    const handleButtonClickProcess = (id) => {
        navigate(`/homeuser/processos/${id}`);
    };

    //Botão onde entre na tela de perfil de usuario
    const handleButtonClickProfile = (id) => {
        navigate(`/userprofile/${id}`);
    };

    const Navlinks = () => {
        return (
            <>
                <button onClick={() => handleButtonClickProcess(userId)}>Processos</button>
                <button onClick={() => handleButtonClick(userId)}>Vagas</button>
                <NavLink to="/empresas">Empresas</NavLink>
            </>
        )
    }

    return (
        <>
            <header className="flex justify-between px-12 items-center py-6 bg-state-50 border-b-2 border-gray-500">
                <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className=' max-sm-logo w-40' />

                <nav className=" flex items-center gap-4">
                    <div className=" hidden md:flex items-center gap-4">
                        <Navlinks></Navlinks>

                    </div>
                    <IoSearch className='text-black text-2xl cursor-pointer iconhover' />
                    <button onClick={() => handleButtonClickProfile(userId)}>
                    <img src={userProfile.imageUrl} alt="" class="w-10 h-10 rounded-full" /></button>
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
