import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from '../../../../Database/Firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { BsFillXSquareFill } from "react-icons/bs";
import { decrypt, encrypt } from '../../../../Security/Cryptography_Rotes';



const Vagaslist = () => {
    const [userId, setUserId] = useState("");
    const [vagas, setVagas] = useState([]);
    const [empresas, setEmpresas] = useState({});
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const decryptedId = decrypt(decodeURIComponent(id));
    const navigate = useNavigate();
    const defaultempresaicon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7OOS70yj8sex-Sw9mgQOnJKzNsUN3uWZCw&s";
    const defaultempresawallpaper = "https://c4.wallpaperflare.com/wallpaper/251/165/174/building-lights-usa-night-wallpaper-preview.jpg";

    useEffect(() => {
        const getUserProfile = async () => {
            const ProfileUser = doc(db, "PCD", decryptedId);
            const GetProfileUser = await getDoc(ProfileUser);
            if (GetProfileUser.exists()) {
                setUserProfile(GetProfileUser.data());
                setUserId(GetProfileUser.id);
            } else {
                setUserProfile(null);
                alert("Nenhum usuário encontrado");
            }
        };
        getUserProfile();
    }, [decryptedId]);

    useEffect(() => {
        const getVagas = async () => {
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
                        console.log(`Empresa não encontrada para o ID: ${vaga.empresaId}`);
                    }
                }
            }));

            setVagas(vagasArray);
            setEmpresas(empresasTemp);
            setLoading(false);
        };

        getVagas();
    }, []);

    const handleButtonClick = (vagaId) => {
        const encryptedVaga = encrypt(vagaId);
        navigate(`/entrarvaga/${encodeURIComponent(encryptedVaga)}`);
    };

    return (
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
                    <div className='w-3/12 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
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
    );
};

export default Vagaslist;
