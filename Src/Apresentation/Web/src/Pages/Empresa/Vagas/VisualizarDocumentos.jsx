import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db, auth } from '../../../Database/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from '../Navbar/Navbar';
import { PaperClipIcon } from '@heroicons/react/24/outline';

function VisualizarDocumentos() {
  const navigate = useNavigate();

  // Pegar o id do usuario na tela anterior
  const { vagaId, id } = useParams();

  // Variaveis para setar dados do banco
  const [candidatos, setCandidatos] = useState([]);
  const [vaga, setVaga] = useState(null);
  
  // Variavel para setar os erros
  const [error, setError] = useState('');
  const [empresa, setEmpresa] = useState('');

  // useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    const GetCandidatos = async () => {
      try {
        // Tratamento de erros com base no ID da vaga
        if (vagaId && id) {
          // Caminho dos dados da tabela PCD do banco
          const CandidatosCollection = collection(db, 'Vagas', vagaId, 'candidatos', id, 'documentos');
          
          // Pegando dados
          const GetCandidatos = await getDocs(CandidatosCollection);
          // Utilizando a função map para guardar as informações
          const candidatosList = GetCandidatos.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // Setando informações
          setCandidatos(candidatosList);
        } else {
          setError('ID da vaga ou candidato não fornecido');
        }
      } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        setError('Erro ao buscar candidatos');
      }
    };

    // Função para procurar vagas
    const GetVaga = async () => {
      try {
        // Tratamento de erro com base no ID da vaga
        if (vagaId) {
          // Caminho das informações
          const VagasDoc = doc(db, 'Vagas', vagaId);
          // Pegando as informações
          const GetVagas = await getDoc(VagasDoc);

          // Tratamento e setando dados em variáveis
          if (GetVagas.exists()) {
            // Sucesso
            const vagaData = { id: GetVagas.id, ...GetVagas.data() };
            setVaga(vagaData);
          } else {
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

    // Chamando as funções
    GetCandidatos();
    GetVaga();
  }, [vagaId, id]);

  // Controle de autenticação
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmpresa(user.uid);
      } else {
        setEmpresa(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Função para iniciar o chat com um usuário
  const ChatUser = async(userId) => {
    try {
        const ChatCollection = collection(db, "Chat");
        await addDoc(ChatCollection, {
            userId: userId,
            empresaId: empresa
        });
        alert("Pessoa adicionada com sucesso!");
        navigate(`/chat/${userId}`);
    } catch (error) {
        console.error('Erro ao adicionar pessoa:', error);
        alert(`Erro ao adicionar pessoa: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className='flex justify-center items-center min-h-screen'>
        <div className='px-6 w-3/4'> 
          <div className="px-6 sm:px-0 text-center">
            <h3 className="text-base font-semibold leading-7 text-gray-950">Informações da vaga</h3>
          </div>
          <div className="mt-6 border-t border-gray-300">
            <dl className="divide-y divide-gray-100">
              {vaga && (
                <>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nome da empresa</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vaga.nome}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Descrição da vaga</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vaga.descricao}</dd>
                  </div>
                </>
              )}

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Candidatos</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc">
                    {candidatos.length > 0 ? (
                      candidatos.map(candidato => (
                        <li key={candidato.id}>{candidato.nome}</li>
                      
                      ))
                    ) : (
                      <li>Nenhum candidato encontrado.</li>
                    )}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          <div className='flex justify-between mt-8'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
            >
              Candidatar-se
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisualizarDocumentos;
