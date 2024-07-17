import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }
    //Função de navegação do site
    const navigate = useNavigate();
    //Pegar o id do usuario na tela anterior
    const { id } = useParams();
    //Variaveis para setar dados do banco
    const [userProfile, setUserProfile] = useState("");
    const [userId, setUserId] = useState("");

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const getUserProfile = async () => {
            //Caminho do documento por base do ID na tabela PCD
            const userDoc = doc(db, "Empresa", id);
            //Pegando dados
            const userSnap = await getDoc(userDoc);
            //Tratamento para setar os dados
            if (userSnap.exists()) {
                //Sucesso
                setUserProfile(userSnap.data());
                setUserId(userSnap.id);
            } else {
                //Erro
                setUserProfile(null);
                alert("No such document!");
            }
        };

        getUserProfile();
    }, [id]);

    //Botões de Link
    const handleButtonClick = (id) => {
        navigate(`/homeempresa/cadastrovaga/${id}`);
    };
    const handleButtonClickProfile = (IdEmpresa) => {
        navigate(`/candidatos/${IdEmpresa}`);
    };
    const handleButtonClickVaga = (IdEmpresa) => {
        navigate(`/processos/${IdEmpresa}`);
    };

    const Navlinks = () => {
        return (
            <>
                <button onClick={() => handleButtonClick(userId)}>Criar Vaga</button>
                <button onClick={() => handleButtonClickProfile(userId)}>Candidatos</button>
                <button onClick={() => handleButtonClickVaga(userId)}>Processos</button>
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
                    <button>
                    <img src={userProfile.imageProfile} alt="" class="w-10 h-10 rounded-full" />
                    </button>
                    <div className="flex  md:hidden">
                        <button onClick={toggleNavbar}>{isOpen ? <IoCloseOutline className='text-black text-2xl cursor-pointer' /> : <FiMenu className='text-black text-2xl cursor-pointer' />}</button>

                    </div>
                </nav>
            </header>
            <hr className="hr-bg h-2"></hr>
            {isOpen && (
                <div className=" md:hidden flex basis-full flex-col items-center gap-3 z-50 bg-state-50" >
                    <Navlinks></Navlinks>
                </div>
            )}
        </>
    );
}
