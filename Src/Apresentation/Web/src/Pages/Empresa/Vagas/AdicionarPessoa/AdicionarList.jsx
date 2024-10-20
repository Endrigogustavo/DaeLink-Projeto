import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../Database/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import { BsFillXSquareFill } from "react-icons/bs";
import { MdWork, MdDelete, MdEdit } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

import Modal from '../../Modal/Modal';

const AdicionarList = () => {
    //Função de navegação do site
    const navigate = useNavigate()
    //Pegar o id do usuario na tela anterior

    //Variaveis para setar dados do banco
    const [id, setId] = useState("")
    const [userInfo, setUserInfo] = useState(null);
    const [user, setUser] = useState(null);
    const [vagas, setVagas] = useState([]);
    const [situação, setSituação] = useState("Pendente");
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);


    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        //Pega os dados com base no perfil de empresa logado utilizando o auth do Firebase
        const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchUserData(currentUser.uid);
            } else {
                setUser(null);
            }
        });

        return () => AuthProfile();
    }, []);

    useEffect(() => {
        //Informações do usuario
        const getPCDProfile = async () => {
            try {
                const id = localStorage.getItem("Candidato")
                const PCDdoc = doc(db, "PCD", id);
                const GetPCDresult = await getDoc(PCDdoc);

                if (GetPCDresult.exists()) {
                    setUserInfo(GetPCDresult.data());
                } else {
                    console.log('Nenhum documento encontrado com o ID:', id);
                    setUserInfo(null);
                }
            } catch (error) {
                console.error('Erro ao buscar documento:', error);
                setUserInfo(null);
            }
        };
        getPCDProfile();
    }, []);

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const GetVagas = async () => {
            //utilizando o user como parametro de tratamento
            if (user) {
                try {
                    //Caminho dos dados da tabela PCD do banco
                    const VagasCollection = collection(db, 'Vagas');
                    //Utilizando o query e o where para pegar as informações de uma empresa especifica
                    const QueryVagas = query(VagasCollection, where('empresaId', '==', user.uid));
                    //Pegando dados com o tratamento
                    const GetVagasResult = await getDocs(QueryVagas);

                    //utilizando de uma função map para listar as informações
                    const vagasList = GetVagasResult.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    //Setando os dados em uma variavel
                    setVagas(vagasList);
                } catch (error) {
                    console.error('Error fetching vagas:', error);
                }
            }
        };

        GetVagas();
    }, [user]);

    const AddUserToVaga = async (VagaId, IdEmpresa) => {
        if (userInfo && userInfo.name && userInfo.email) {

            try {
                const id = localStorage.getItem("Candidato")
                const VagaDoc = doc(db, "Vagas", VagaId);
                const CandidatosCollection = collection(VagaDoc, 'candidatos');
                await addDoc(CandidatosCollection, {
                    userId: id,
                    name: userInfo.name,
                    email: userInfo.email,
                    situação: situação
                });

                setWorksModal(true)
                setModalMessage("Pessoa adicionada com sucesso!")
                setModalOpen(true)
                setTimeout(() => {
                    navigate(`/homeempresa/`)
                }, 2200);

            } catch (error) {
                console.error('Erro ao adicionar pessoa:', error);
                setWorksModal(false)
                setModalMessage("Erro ao adicionar pessoa.")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false)
                }, 2200);
            }
        } else {
            console.error('Informações do usuário incompletas:', userInfo);
            setWorksModal(false)
            setModalMessage("Informações do usuário imcompletas.")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
            }, 2200);
        }
    };


    return (
        <>
            <div>
                <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
            </div>
            <div className={`w-full h-fit flex justify-center items-center flex-col py-4 ${vagas.length > 0 ? 'grid ProcessosEmpresas gap-y-6 justify-items-center items-center' : ''}`}>
                {vagas.map((vaga) => (
                    <div key={vaga.id} className='h-56 w-96 rounded-3xl shadow-2xl flex bg-white border-gray-400 border-2 w-processsosempresa'>
                        <div className='w-1/4 h-full flex items-center justify-center bg-gray-200  rounded-3xl'>
                            <MdWork className='text-7xl text-gray-900 text-center bg-white p-4 rounded-full border-2 border-blue-600' />
                        </div>
                        <div className='w-3/4 h-full flex flex-col items-center'>
                            <div className='w-full h-2/6 text-center flex items-center justify-center text-wrap overflow-hidden'>
                                <h1 className='font-bold text-xl text-center w-4/6 processo-title' >{vaga.vaga}</h1>
                            </div>
                            <div className='w-full h-2/6 flex flex-col px-2'>
                                <p className='opacity-80 truncate'>{vaga.local}</p>
                                <p className='opacity-80'>{vaga.tipo}</p>
                                <p className='opacity-80'>R${vaga.salario}</p>
                            </div>
                            <div className='w-full h-2/6 flex justify-center items-center gap-2'>
                                <button onClick={() => AddUserToVaga(vaga.id, vaga.empresaId)} type="submit"
                                    class="w-32 flex h-fit items-center justify-center 
                                     bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all gap-2">
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {vagas.length === 0 && (
                    <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                        <div className='w-2/6 h-full flex items-center justify-center'>
                            <BsFillXSquareFill className='text-5xl text-gray-900 text-center' />
                        </div>
                        <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                            <p className='font-medium text-lg text-center'>Sem Vagas disponíveis</p>
                            <p className='font-normal text-base text-center'>Por Favor, crie uma.</p>
                        </div>
                    </div>
                )}
            </div>

        </>
    )

}

export default AdicionarList;