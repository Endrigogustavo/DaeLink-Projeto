import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Database/Firebase';


function VisualizarPessoas() {
  //Função de navegação do site
  const navigate = useNavigate()
  //Pegar o id do usuario na tela anterior
  const { vagaId } = useParams();
  //Variaveis para setar dados do banco
  const [candidatos, setCandidatos] = useState([]);
  const [vaga, setVaga] = useState(null);
  //Variavel para setar erros
  const [error, setError] = useState('');

  //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        //Tratamento de erros com base do ID da vaga
        if (vagaId) {
          //Caminho dos dados da tabela PCD do banco
          const candidatosCollection = collection(db, 'Vagas', vagaId, 'candidatos');
          //Mensagem dos dados coletados
          console.log('candidatosCollection:', candidatosCollection);
          //Pegando dados
          const candidatosSnapshot = await getDocs(candidatosCollection);
          //Utilizando a função map para guardar as informações
          const candidatosList = candidatosSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          //Mensagem das informações
          console.log('Candidatos:', candidatosList);
          //Setando informações
          setCandidatos(candidatosList);
        } else {
          setError('ID da vaga não fornecido');
        }
      } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        setError('Erro ao buscar candidatos');
      }
    };

    const fetchVaga = async () => {
      try {
        //Função para procurar vagas
        if (vagaId) {
          //Caminho das informações
          const vagaDoc = doc(db, 'Vagas', vagaId);
          //Mensagem para ver se esta ok
          console.log('vagaDoc:', vagaDoc);
          //Pegando as informações
          const vagaSnapshot = await getDoc(vagaDoc);

          //Tratamento e setando dados em variaveis
          if (vagaSnapshot.exists()) {
            //Sucesso
            const vagaData = { id: vagaSnapshot.id, ...vagaSnapshot.data() };
            console.log('Vaga:', vagaData);
            setVaga(vagaData);
          } else {
            //Erro
            console.log('Nenhum documento encontrado!');
            setError('Nenhuma vaga encontrada');
          }
        } else {
          setError('ID da vaga não fornecido');
        }
      } catch (error) {
        console.error('Erro ao buscar vaga:', error);
        setError('Erro ao buscar vaga');
      }
    };

    fetchCandidatos();
    fetchVaga();
  }, [vagaId]);

  {
    candidatos.map(candidato => (
      <li key={candidato.id}>{candidato.nome}</li>
    ))
  }

  const handleButtonClick = (id) => {
    navigate(`/visualizardocumentos/${id}/${vagaId}`)
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
                      Nome
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Documentos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidatos.map(candidato => (
                    <tr>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {candidato.nome}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {candidato.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button onClick={() => handleButtonClick(candidato.id)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Documentos
                        </button>
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
};

export default VisualizarPessoas;
