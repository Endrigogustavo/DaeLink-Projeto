import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../../Database/Firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { decrypt, encrypt } from '../../../../Security/Cryptography_Rotes';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento";
import { FaSquareXmark } from "react-icons/fa6";

const ProcessosList = () => {
    const { encryptedId } = useParams();
    const decryptedId = decrypt(decodeURIComponent(encryptedId));
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const GetVagas = async () => {
            try {
                const vagasRef = collection(db, 'Vagas');
                const ResultVagas = await getDocs(vagasRef);
                let vagasDoCandidato = [];

                for (const doc of ResultVagas.docs) {
                    const candidatosRef = collection(doc.ref, 'candidatos');
                    const QueryCandidatos = query(candidatosRef, where('userId', '==', decryptedId));
                    const GetResultCandidatos = await getDocs(QueryCandidatos);

                    if (!GetResultCandidatos.empty) {
                        vagasDoCandidato.push({ id: doc.id, ...doc.data() });
                    }
                }

                // Fetch empresa details for each vaga using Promise.all
                const vagasWithEmpresaDetails = await Promise.all(
                    vagasDoCandidato.map(async (vaga) => {
                        if (vaga.empresaId) {
                            const empresaDoc = await getDoc(doc(db, "Empresa", vaga.empresaId));
                            if (empresaDoc.exists()) {
                                const empresaData = empresaDoc.data();
                                return {
                                    ...vaga,
                                    empresa: {
                                        imageUrl: empresaData.imageUrl,
                                        imageProfile: empresaData.imageProfile,
                                    }
                                };
                            } else {
                                console.log(`Empresa não encontrada para o ID: ${vaga.empresaId}`);
                                return vaga;
                            }
                        }
                        return vaga;
                    })
                );

                setVagas(vagasWithEmpresaDetails);
            } catch (error) {
                console.error('Erro ao buscar vagas: ', error);
            } finally {
                setLoading(false);
            }
        };

        GetVagas();
    }, [encryptedId, decryptedId]);

    const EnviarDoc = (vagaId) => {
        const encryptedId = encodeURIComponent(encrypt(decryptedId))
        navigate(`/enviardocumento/${encryptedId}/${vagaId}`);
    };

    const ChatEmpresa = (empresaId) => {
        navigate(`/chatpcd/${encryptedId}/${empresaId}`);
    };

    return (
        <>
            <div className='h-fit w-full grid gap-4 justify-items-center items-center py-4'>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    </div>
                ) : (
                    Array.isArray(vagas) && vagas.length > 0 ? (
                        vagas.map((vaga) => {
                            return (
                                <div key={vaga.id} className='h-processocard w-processocard shadow-xl bg-gray-800 rounded-2xl flex flex-col border-2 overflow-hidden'>
                                    {/* Render empresa details */}
                                    {vaga.empresa && (
                                        <div className='w-full h-3/6 flex flex-col items-center justify-center gap-3'>
                                            <img src={vaga.empresa.imageProfile} alt="Empresa Profile" className='w-full h-full relative object-cover opacity-80' />
                                            <img src={vaga.empresa.imageUrl} alt="Empresa Logo" className='rounded-full w-24 h-24 object-cover absolute border-blue-500 border-4' />
                                        </div>
                                    )}
                                    {
                                        <>
                                            <div className="w-full flex flex-col justify-center">
                                                <h1 className='font-medium text-xl text-center text-white'>{vaga.vaga}</h1>
                                                <p className='text-white opacity-80 text-sm px-4 truncate'>Cod-Vaga: {vaga.id} </p>
                                                <p className='text-white opacity-80 text-sm px-4 truncate'>Tipo: {vaga.tipo}  </p>
                                                <p className='text-white opacity-80 text-sm px-4 truncate'>Salário: {vaga.salario}</p>
                                            </div>
                                            <div className='w-full flex justify-center'>
                                                <button
                                                    onClick={() => EnviarDoc(vaga.id)}
                                                    type="submit"
                                                    className='w-44 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all'
                                                >
                                                    Enviar Documentos
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>
                            );
                        })
                    ) : (
                        <div className='w-3/12 h-32 shadow-2xl bg-white border-gray-700 border-4 rounded-full flex overflow-hidden px-4'>
                            <div className='w-2/6 h-full flex items-center justify-center'>
                                <FaSquareXmark className='text-5xl text-gray-900 text-center' />
                            </div>
                            <div className='w-5/6 h-full flex items-center justify-center flex-col'>
                                <p className='font-medium text-lg text-center'>Sem Processos Iniciados</p>
                                <p className='font-normal text-base text-center'>Comece algum ou apenas espere o contato.</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    )
}

export default ProcessosList;
