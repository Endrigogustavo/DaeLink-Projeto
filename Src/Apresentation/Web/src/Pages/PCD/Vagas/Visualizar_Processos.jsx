import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Visualizar_Processo() {
    //Utilizado para pegar o id do usuario na tela anterior
    const { id } = useParams();

    //setVagas vai guardar todas as informações recebidas no getDocs
    const [vagas, setVagas] = useState([]);

    //Tela de carregamento
    const [loading, setLoading] = useState(true);

    //Função de navegação do site
    const navigate = useNavigate()

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        //Função assincrona de pegar as vagas
        const fetchVagas = async () => {
            try {
                //Informando a tabela do banco
                const vagasRef = collection(db, 'Vagas');
                //Pegando as informações do banco
                const querySnapshot = await getDocs(vagasRef);
                //Inicializando uma matriz vazia
                let vagasDoCandidato = [];

                //Tratamento de erro
                for (const doc of querySnapshot.docs) {
                    //Pegando os dados encontrados anteriormente e analizando com a tabela candidatos do banco
                    const candidatosRef = collection(doc.ref, 'candidatos');
                    //Utilizando o query e where para trazer as vagas que pertecem ao usuario do ID
                    const q = query(candidatosRef, where('userId', '==', id));
                    //Pegando os dados tratados
                    const candidatosSnapshot = await getDocs(q);
                    //Tratamento de erro caso não pegue nenhum valor
                    if (!candidatosSnapshot.empty) {
                        //Adicionando valores do banco na matriz em branco
                        vagasDoCandidato.push({ id: doc.id, ...doc.data() });
                    }
                }
                //Guardando as informações na varial vagas
                setVagas(vagasDoCandidato);
            } catch (error) {
                console.error('Erro ao buscar vagas: ', error);
            } finally {
                setLoading(false);
            }
        };
        //Inicializando a função
        fetchVagas();
    }, [id]);

    //Função de tela de loading
    if (loading) {
        return <p>Carregando...</p>;
    }

    //Botão para is para a tela de enviar documento, enviando o ID do usuario e o da vaga
    const handleButtonClick = (vagaId) => {
        navigate(`/enviardocumento/${id}/${vagaId}`);
    };


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
                                            Vaga
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Area
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Empresa
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Exigencias
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Salario
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Tipo
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Local
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Começo da função map de listar os dados */}
                                    {vagas.map((vaga) => (
                                        <tr>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {vaga.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {vaga.area}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {vaga.empresa}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {vaga.exigencias}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {vaga.salario}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {vaga.tipo}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {vaga.local}
                                                </p>
                                            </td>
                                            <button onClick={() => handleButtonClick(vaga.id)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

export default Visualizar_Processo;
