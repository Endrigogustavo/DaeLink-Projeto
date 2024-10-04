import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../Database/Firebase';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento"
import { decrypt } from '../../../../Security/Cryptography_Rotes';

function VisualizarApuração() {
    //Pegar o id do usuario na tela anterior
    const { encryptedId, vagaId } = useParams();
    const id = decodeURIComponent(decrypt(encryptedId))
    //Variaveis para setar dados do banco
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);

    //Função de navegação do site
    const navigate = useNavigate()

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
    useEffect(() => {
        const GetVagas = async () => {
            try {
                //Caminho dos dados da tabela PCD do banco
                const VagasCollection = collection(db, 'Vagas', vagaId, 'candidatos');
                //Tratando a pesquisa com query e where para pegar os dados de uma empresa 
                const QueryVagas = query(VagasCollection, where('userId', '==', id));
                //Pegando dados
                const GetVagasResult = await getDocs(QueryVagas);

                //Utilizando a funçã0 map para guardar os valos para serem listados
                const vagasList = GetVagasResult.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                //Setando resultado em uma variavel
                setVagas(vagasList);
            } catch (error) {
                console.error('Erro ao buscar vagas: ', error);
            } finally {
                setLoading(false);
            }
        };

        GetVagas();
    }, [id]);

    if (loading) {
        return <CarregamentoTela/>;
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
                                            Apuração
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
                                                            {vaga.situação}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
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

export default VisualizarApuração;