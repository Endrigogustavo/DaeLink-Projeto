import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { encrypt } from '../../../Auth/Cryptography_Rotes';

function Empresas() {
    //Variaveis onde as informações serão setadas
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);
    //Função de navegação do site
    const navigate = useNavigate()

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        //Caminho das informações no banco
        const CompanyCollection = collection(db, "Empresa");
        //Pegando dados
        const getUsers = async () => {
            //Colocando os dados em uma função map para listar
            const data = await getDocs(CompanyCollection);
            setVagas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        //Inicializando função
        getUsers();

    }, []);

    const ViewCompanyProfile = (id) =>{
        const encryptedId = encodeURIComponent(encrypt(id));

        navigate(`/visualizperfilempresa/${encryptedId}`)
    }

    return (
        <>
            <div className="bg-white p-8 rounded-md w-full">
                <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Empresa
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Endereço
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vagas.map((vaga) => (
                                        <tr>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {vaga.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {vaga.email}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {vaga.endereco}
                                                </p>
                                            </td>
                                            <button onClick={() => ViewCompanyProfile(vaga.id)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Documentos
                                            </button>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Empresas;
