import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../../Database/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { BsFillXSquareFill } from "react-icons/bs";
import { FaCheck, FaTimes } from "react-icons/fa";

function PessoasList() {
    const navigate = useNavigate();
    const { vagaId } = useParams();

    const [candidatos, setCandidatos] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [userPCD, setUserPCD] = useState('');

    const fotodefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5JltdoarPr9bRcq-0QN5k6F_v8kYxj5oj8A&s"

    useEffect(() => {
        const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => AuthProfile();
    }, []);

    useEffect(() => {
        const GetCandidatos = async () => {
            try {
                if (vagaId) {
                    const CandidatosCollection = collection(db, 'Vagas', vagaId, 'candidatos');
                    const GetCandidatos = await getDocs(CandidatosCollection);

                    const candidatosList = GetCandidatos.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));


                    await Promise.all(candidatosList.map(async (candidato) => {
                        if (candidato.id) {
                            const PCDDoc = await getDoc(doc(db, "PCD", candidato.id));
                            if (PCDDoc.exists()) {
                                const PCDData = PCDDoc.data();
                                // Verifica se há uma imagem de perfil e atribui uma imagem padrão, se necessário
                                candidato.imageProfile = PCDData.imageProfile || '/default-image.png';
                            } else {
                                console.log(`PCD não encontrado para o candidato ${candidato.id}`);
                            }
                        }
                    }));

                    setCandidatos(candidatosList);
                } else {
                    setError('ID da vaga não fornecido');
                }
            } catch (error) {
                console.error('Erro ao buscar candidatos:', error);
                setError('Erro ao buscar candidatos');
            }
        };

        GetCandidatos();
    }, [vagaId]);

    const handleButtonClick = (id) => {
        navigate(`/visualizardocumentos/${id}/${vagaId}`);
    };

    const AceitarCandidato = async (id) => {
        try {
            const GetDoc = collection(db, "Vagas", vagaId, 'candidatos', id, 'documentos');
            const DocResult = await getDocs(GetDoc);
            if (!DocResult.empty) {
                try {
                    const situação = "Aprovado";
                    const vagaRef = doc(db, "Vagas", vagaId, 'candidatos', id);

                    await updateDoc(vagaRef, {
                        situação: situação
                    });
                    alert("Candidato aprovado com sucesso!");
                    navigate(0); // Recarregar a página
                } catch (e) {
                    console.error("Erro ao aprovar candidato: ", e);
                    alert("Erro ao aprovar candidato.");
                }
            } else {
                alert("Sem documentos para aprovação.");
            }
        } catch (e) {
            console.error("Erro ao aprovar candidato: ", e);
            alert("Erro ao aprovar candidato.");
        }
    };

    const RecusarCandidato = async (id) => {
        try {
            const GetDoc = collection(db, "Vagas", vagaId, 'candidatos', id, 'documentos');
            const DocResult = await getDocs(GetDoc);
            if (!DocResult.empty) {
                try {
                    const situação = "Recusado";
                    const vagaRef = doc(db, "Vagas", vagaId, 'candidatos', id);

                    await updateDoc(vagaRef, {
                        situação: situação
                    });
                    alert("Candidato recusado com sucesso!");
                    navigate(0); // Recarregar a página
                } catch (e) {
                    console.error("Erro ao recusar candidato: ", e);
                    alert("Erro ao recusar candidato.");
                }
            } else {
                alert("Sem documentos para recusa.");
            }
        } catch (e) {
            console.error("Erro ao recusar candidato: ", e);
            alert("Erro ao recusar candidato.");
        }
    };

    return (
        <>



            {candidatos.length > 0 && (
                <div className='w-full h-44 flex items-center justify-center'>
                    <div className='w-96 h-20 rounded-3xl shadow-2xl flex bg-gray-900 border-2 items-center justify-center px-2'>
                        <h1 className='font-bold text-2xl text-white'>Candidatos Disponiveis </h1>
                    </div>
                </div>
            )}

            <div className={`w-full h-fit flex overflow-x-hidden justify-center items-center ${candidatos.length > 0 ? 'grid Pcdscontainer gap-4 justify-items-center' : ''}`}>

                {candidatos.map(candidato => (
                    <div key={candidato.id} className='h-profilecard w-72  rounded-3xl flex flex-col 
                     items-center justify-center border-gray-400 border-2 shadow-2xl overflow-hidden '>
                        <div className='h-profilecardbanner w-full flex items-center justify-center overflow-hidden relative'>
                            <img src={candidato.imageProfile} className='h-full w-full object-cover opacity-20 backprofile-opacity' />
                            <img src={candidato.imageUrl} className="mt-12 absolute shadow-2xl rounded-full w-28 h-28 object-cover border-4 border-blue-600" />
                        </div>
                        <div className='h-profilecarditems w-full flex flex-col items-center overflow-hidden'>

                            <div className='h-2/6 w-full flex flex-col justify-center items-center  py-1'>
                                <h1 className='text-xl font-bold text-center'>{candidato.name}</h1>
                                <h2 className='opacity-75 text-sm truncate'>{candidato.trabalho}</h2>
                            </div>

                            <div className='w-full h-2/6 flex justify-center'>

                                <button onClick={() => AceitarCandidato(candidato.id)} type="submit"
                                    className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full transition-all'>
                                    <FaCheck className='text-xl text-white text-center' />
                                </button>
                                <button onClick={() => RecusarCandidato(candidato.id)} type="submit"
                                    className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full transition-all'>
                                    <FaTimes className='text-xl text-white text-center' />
                                </button>
                            </div>
                            <div className='h-2/6 w-full flex overflow-hidden justify-center items-center '>
                                <button onClick={() => handleButtonClick(candidato.id)} type="submit"
                                    className='w-36 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-1 rounded-full transition-all'>
                                    Visualizar Docs
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {candidatos.length === 0 && (
                    <div className='w-96 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4 mt-4'>
                        <div className='w-2/6 h-full flex items-center justify-center'>
                            <BsFillXSquareFill className='text-5xl text-gray-900 text-center' />
                        </div>
                        <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                            <p className='font-medium text-lg text-center'>Sem Candidatos no momento</p>
                            <p className='font-normal text-base text-center'>Apenas espere que irão aparecer.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PessoasList;
