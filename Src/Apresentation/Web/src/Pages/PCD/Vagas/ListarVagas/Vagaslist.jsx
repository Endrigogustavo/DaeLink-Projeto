import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from '../../../../Database/Firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { decrypt, encrypt } from '../../../../Auth/Cryptography_Rotes';

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

    useEffect(() => {
        const decryptedId = decrypt(decodeURIComponent(id));
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

            const empresasTemp = {};

            await Promise.all(vagasArray.map(async (vaga) => {
                if (vaga.empresaId) {
                    const empresaDoc = await getDoc(doc(db, "Empresa", vaga.empresaId));
                    if (empresaDoc.exists()) {
                        empresasTemp[vaga.empresaId] = empresaDoc.data().imageUrl;
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
                    vagas.map((vaga) => (
                        <div key={vaga.id} className='h-vagacard w-vagacard shadow-xl bg-gray-800 rounded-2xl flex border-2 overflow-hidden '>
                            <div className='flex flex-col h-full w-2/6 justify-center items-center gap-1'>
                                <img
                                    src={empresas[vaga.empresaId] || defaultempresaicon}
                                    className="w-12 h-12 object-cover rounded-full border-2 border-blue-600 "
                                    alt="logo empresa"
                                />
                                <h1 className='font-medium text-white text-center text-lg'> {vaga.empresa}</h1>
                            </div>
                            <div className='flex flex-col bg-gray-900 rounded-2xl h-full w-4/6 justify-center items-center overflow-hidden gap-1'>
                                <h1 className='text-white text-xl font-medium text-center'>{vaga.area}</h1>
                                <div className='flex flex-row gap-2 justify-center w-full'>
                                    <p className='text-white opacity-90 text-base'>{vaga.vaga} </p>
                                    <p className='text-white opacity-90 text-base'>-</p>
                                    <p className='text-white opacity-90 text-base'>{vaga.tipo}</p>
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <p className='text-white opacity-80 text-sm px-4'>Salario: {vaga.salario} </p>
                                    <p className='text-white opacity-80 text-sm px-4'>Exigências: {vaga.exigencias} </p>
                                    <p className='text-white opacity-80 text-sm px-4'>Local: {vaga.local} </p>
                                </div>
                                <button className='w-40 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all'
                                    type='submit' onClick={() => handleButtonClick(vaga.id)}>Visualizar Vaga</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Sem vagas disponíveis</p>
                )
            )}
        </div>
    );
};

export default Vagaslist;
