import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../Database/Firebase';

function Visualizar_Processo() {
    //Pegar o id do usuario na tela anterior
    const { id } = useParams();
    //Variaveis para setar dados do banco
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);

    //Função de navegação do site
    const navigate = useNavigate()

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const fetchVagas = async () => {
            try {
                //Caminho dos dados da tabela PCD do banco
                const vagasRef = collection(db, 'Vagas');
                //Tratando a pesquisa com query e where para pegar os dados de uma empresa 
                const q = query(vagasRef, where('empresaId', '==', id));
                //Pegando dados
                const querySnapshot = await getDocs(q);

                //Utilizando a funçã0 map para guardar os valos para serem listados
                const vagasList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                //Setando resultado em uma variavel
                setVagas(vagasList);
                console.log(vagasList)
            } catch (error) {
                console.error('Erro ao buscar vagas: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVagas();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (vagas.length === 0) {
        return <div>Nenhuma vaga encontrada para esta empresa.</div>;
    }

    const handleButtonClick = (vagaId) => {
        navigate(`/visualizarpessoas/${vagaId}`);
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
                                                <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Candidatos
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
