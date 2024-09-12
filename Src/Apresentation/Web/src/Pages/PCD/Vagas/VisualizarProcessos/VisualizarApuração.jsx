import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../Database/Firebase';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento"
import { decrypt } from '../../../../Security/Cryptography_Rotes';
import Navbar from '../../Navbar/Navbar';

import {
    FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";



function Visualizar_Processo() {
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
                console.log(vagasList)
            } catch (error) {
                console.error('Erro ao buscar vagas: ', error);
            } finally {
                setLoading(false);
            }
        };

        GetVagas();
    }, [id]);

    if (loading) {
        return <CarregamentoTela />;
    }

    if (vagas.length === 0) {
        return <div>Nenhuma vaga encontrada para esta empresa.</div>;
    }

    const handleButtonClick = (vagaId) => {
        navigate(`/visualizarpessoas/${vagaId}`);
    };

    return (
        <>
            <Navbar />

            <div className='w-full h-apuracaostatus flex items-center justify-center'>
                <div className='w-fit h-fit bg-gray-800 rounded-xl p-8 flex flex-col'>
                    {vagas.map((vaga) => (
                        <div key={vaga.id}> {/* Adiciona a key aqui */}
                            <h1 className={`w-40 text-white text-center font-bold text-sm py-2 px-4 rounded-full ${vaga.situação ? 'bg-blue-700' : 'bg-red-600'}`}>
                                {vaga.situação ? vaga.situação : 'Pendente'}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full bg-gray-900 h-16 ">
                <div className="flex w-full h-full items-center justify-center gap-4">
                    <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  mediahover" /></Link>
                    <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
                    <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
                </div>
            </div>
        </>
    );

}

export default Visualizar_Processo;
