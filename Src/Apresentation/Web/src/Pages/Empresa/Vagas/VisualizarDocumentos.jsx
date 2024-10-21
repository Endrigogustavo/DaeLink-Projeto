import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db, auth } from '../../../Database/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from '../Navbar/Navbar';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import Modal from '../Modal/Modal';

function VisualizarDocumentos() {
  const navigate = useNavigate();

  // Pegar o id do usuario na tela anterior

  const [vagaId, setVagaId] = useState(null);
  const [id, setId] = useState(null);
  // Variaveis para setar dados do banco
  const [candidatos, setCandidatos] = useState([]);
  const [vaga, setVaga] = useState(null);

  // Variavel para setar os erros
  const [error, setError] = useState('');
  const [empresa, setEmpresa] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);


  useEffect(() => {
    const storedId = localStorage.getItem("IdUserDoc");
    const storedVagaId = localStorage.getItem("vagaId");

    // Verifique se os valores são válidos
    if (storedId && storedVagaId) {
      setId(storedId);
      setVagaId(storedVagaId);
    } else {
      setWorksModal(false)
      setModalMessage("ID da vaga ou do candidato não encontrados no localStorage")
      setModalOpen(true)
      setTimeout(() => {
        setModalOpen(false)
      }, 2200);
    }
  }, []);
  // useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    const GetCandidatos = async () => {
      try {
        const storedId = localStorage.getItem("IdUserDoc");
        const storedVagaId = localStorage.getItem("vagaId");

        if (!storedVagaId || !storedId) {
          throw new Error("ID da vaga ou ID do candidato não fornecido");
        }

        // Tratamento de erros com base no ID da vaga

        // Caminho dos dados da tabela PCD do banco
        const candidatoDoc = doc(db, 'Vagas', storedVagaId, 'candidatos', storedId);
        const CandidatosCollection = collection(candidatoDoc, 'documentos');

        // Pegando dados
        const GetCandidatos = await getDocs(CandidatosCollection);
        // Utilizando a função map para guardar as informações
        const candidatosList = GetCandidatos.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Setando informações
        setCandidatos(candidatosList);

      } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        setError('Erro ao buscar candidatos');
      }
    };

    // Função para procurar vagas
    const GetVaga = async () => {
      try {
        const storedId = localStorage.getItem("IdUserDoc");
        const storedVagaId = localStorage.getItem("vagaId");

        // Tratamento de erro com base no ID da vaga
        if (storedVagaId) {
          // Caminho das informações
          const VagasDoc = doc(db, 'Vagas', storedVagaId);
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
  }, [id, vagaId]);

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
  const ChatUser = async (userId) => {
    try {
      const ChatCollection = collection(db, "Chat");
      await addDoc(ChatCollection, {
        userId: userId,
        empresaId: empresa
      });

      setWorksModal(true)
      setModalMessage("Pessoa adicionada com sucesso!")
      setModalOpen(true)
      setTimeout(() => {
        localStorage.setItem("chatId", userId)
        navigate(`/chat/`);
      }, 4000);



    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
      setWorksModal(false)
      setModalMessage("Erro ao adicionar pessoa.")
      setModalOpen(true)
      setTimeout(() => {
        setModalOpen(false)
      }, 2200);
    }
  };


  return (
    <>
      <Navbar />
      <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />

      <div className='flex justify-center items-center min-h-screen'>
        <div className='px-6 w-3/4'>
          <div className="px-6 sm:px-0 text-center">
            <h3 className="text-base font-semibold leading-7 text-gray-950">Informações do candidato</h3>
          </div>
          <div className="mt-6 border-t border-gray-300">
            <dl className="divide-y divide-gray-100">
              {candidatos.length > 0 ? (
                candidatos.map(candidato => (

                  <>
                    <li key={candidato.id}>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Nome</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{candidato.nome}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{candidato.email}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Experiencia</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{candidato.experiencia1}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Data de nascimento</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{candidato.idade}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Idiomas</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{candidato.idiomas}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Objetivo</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{candidato.objetivo}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Telefone</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{candidato.telefone}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Formação academica 1</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={candidato.formacao_academica1} target="_blank" rel="noopener noreferrer">PDF, DOC ou DOCX</a></dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Formação academica 2</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={candidato.formacao_academica2} target="_blank" rel="noopener noreferrer">PDF, DOC ou DOCX</a></dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Formação academica 3</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={candidato.formacao_academica3} target="_blank" rel="noopener noreferrer">PDF, DOC ou DOCX</a></dd>
                      </div>
                    </li>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button onClick={() => ChatUser(candidato.userId)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-purple-700 border border-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-res-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                        <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Contatar
                      </button>
                    </td>
                  </>
                ))
              ) : (
                <li>Nenhum candidato encontrado.</li>
              )}


            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisualizarDocumentos;
