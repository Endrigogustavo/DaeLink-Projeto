import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from '../../../../Database/Firebase';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { BsFillXSquareFill } from "react-icons/bs";
import { decrypt, encrypt } from '../../../../Security/Cryptography_Rotes';
import { FaSearch } from 'react-icons/fa';
import Fuse from 'fuse.js';
import axios from 'axios'



const Vagaslist = () => {
    const [id, SetUserId] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [vagas, setVagas] = useState([]);
    const [vagasAll, setVagasAll] = useState([]);
    const [empresas, setEmpresas] = useState({});
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const defaultempresaicon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7OOS70yj8sex-Sw9mgQOnJKzNsUN3uWZCw&s";
    const defaultempresawallpaper = "https://c4.wallpaperflare.com/wallpaper/251/165/174/building-lights-usa-night-wallpaper-preview.jpg";

    useEffect(() => {
        const getVagas = async () => {
            localStorage.removeItem('VagaId');
    
            const VagasCollection = collection(db, "Vagas");
            const data = await getDocs(VagasCollection);
            const vagasArray = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Para armazenar as imagens das empresas associadas às vagas
            const empresasTemp = {};

            await Promise.all(vagasArray.map(async (vaga) => {
                if (vaga.empresaId) {
                    const empresaDoc = await getDoc(doc(db, "Empresa", vaga.empresaId));
                    if (empresaDoc.exists()) {
                        // Armazena tanto o imageProfile quanto o imageUrl
                        const empresaData = empresaDoc.data();
                        empresasTemp[vaga.empresaId] = {
                            imageUrl: empresaData.imageUrl,
                            imageProfile: empresaData.imageProfile
                        };
                    } else {
                        console.log(`Empresa não encontrada `);
                    }
                }
            }));

            setVagas(vagasArray);
            setVagasAll(vagasArray);
            setEmpresas(empresasTemp);
            setLoading(false);
        };

        getVagas();
    }, []);

    const handleButtonClick = (vagaId) => {
        localStorage.setItem('vagaId', vagaId);
        navigate(`/vagainfo/`);
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
          alert('Digite um nome de vaga para pesquisar');
          return;
        }
    
        // Configurações do Fuse.js para busca fuzzy
        const options = {
          includeScore: true,  
          keys: ['area']   
        };
    
        const fuse = new Fuse(vagasAll, options);
        const result = fuse.search(searchTerm);
    
        // Extrair apenas os resultados relevantes
        const matches = result.map(({ item }) => item);
        setVagas(matches);
      };
    
    return (
        <>
            <section className='w-full flex flex-col justify-center items-center gap-y-3 overflow-hidden'>
                <div className='flex w-80 h-16 border-2 border-gray-900 rounded-full p-4 mt-1 bg-transparent items-center justify-center'>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" className='h-full w-full bg-transparent border-0 focus:outline-none' placeholder="Procurar vagas" required />
                    <button onClick={handleSearch} type='submit' className='flex bg-blue-500 rounded-full'>
                        <FaSearch className='p-1 text-2xl' />
                    </button>
                </div>
            </section>
            <br /><br />
            <div className={`w-full h-fit flex justify-center items-center flex-col ${loading ? '' : 'grid Vagascontainer gap-4 justify-items-center items-center pb-4'}`}>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    </div>
                ) : (
                    Array.isArray(vagas) && vagas.length > 0 ? (
                        vagas.map((vaga) => {
                            const empresa = empresas[vaga.empresaId] || {};
                            return (
                                <div key={vaga.id} className='h-vagacard w-vagacard shadow-xl bg-gray-800 rounded-2xl flex border-2 overflow-hidden '>
                                    <div className='flex flex-col h-full w-2/6 justify-center items-center relative'>
                                        <img
                                            src={empresa.imageProfile || defaultempresawallpaper}
                                            alt="Empresa Wallpaper"
                                            className='w-full h-full relative object-cover object-center opacity-40'
                                        />
                                        <div className='h-full w-full flex flex-col items-center justify-center absolute gap-1'>
                                            <img
                                                src={empresa.imageUrl || defaultempresaicon}
                                                className="w-12 h-12 object-cover rounded-full border-2 border-blue-600 "
                                                alt="logo empresa"
                                            />
                                            <h1 className='font-medium text-white text-center text-lg'>{vaga.empresa}</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-col bg-gray-900 rounded-2xl h-full w-4/6 justify-center items-center overflow-hidden gap-1'>
                                        <h1 className='text-white text-xl font-medium text-center'>{vaga.area}</h1>
                                        <div className='flex flex-row gap-2 justify-center w-full'>

                                            <p className='text-white opacity-90 text-base'>{vaga.vaga}</p>
                                            <p className='text-white opacity-90 text-base'>-</p>
                                            <p className='text-white opacity-90 text-base'>{vaga.tipo}</p>
                                        </div>
                                        <div className='flex flex-col w-full gap-1'>
                                            <p className='text-white opacity-80 text-sm px-4'>{vaga.status}</p>
                                            <p className='text-white opacity-80 text-sm px-4'>Salário: {vaga.salario}</p>
                                            <p className='text-white opacity-80 text-sm px-4'>Exigências: {vaga.exigencias}</p>
                                            <p className='text-white opacity-80 text-sm px-4'>Local: {vaga.local}</p>
                                        </div>
                                        <button className='w-40 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all'
                                            type='submit' onClick={() => handleButtonClick(vaga.id)}>Visualizar Vaga</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className='w-90 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                            <div className='w-2/6 h-full flex items-center justify-center'>
                                <BsFillXSquareFill className='text-5xl text-gray-900  text-center' />
                            </div>
                            <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                                <p className='font-medium text-lg text-center'>Sem vagas disponíveis</p>
                                <p className='font-normal text-base text-center'>Por favor volte em outro momento.</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default Vagaslist;
