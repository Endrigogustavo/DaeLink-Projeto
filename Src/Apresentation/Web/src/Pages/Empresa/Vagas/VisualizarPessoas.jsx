import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../Database/Firebase';
import { onAuthStateChanged } from 'firebase/auth';


function VisualizarPessoas() {
  //Função de navegação do site
  const navigate = useNavigate()
  //Pegar o id do usuario na tela anterior
  const { vagaId } = useParams();
  //Variaveis para setar dados do banco
  const [candidatos, setCandidatos] = useState([]);
  const [vaga, setVaga] = useState(null);
  const [user, setUser] = useState(null);
  //Variavel para setar erros
  const [error, setError] = useState('');

  useEffect(() => {
    //Pega os dados com base no perfil de empresa logado utilizando o auth do Firebase
    const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => AuthProfile();
  }, []);


  //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    const GetCandidatos = async () => {
      try {
        //Tratamento de erros com base do ID da vaga
        if (vagaId) {
          //Caminho dos dados da tabela PCD do banco
          const CandidatosCollection = collection(db, 'Vagas', vagaId, 'candidatos');
          
          //Pegando dados
          const GetCandidatos = await getDocs(CandidatosCollection);
          //Utilizando a função map para guardar as informações
          const candidatosList = GetCandidatos.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
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

    const GetVaga = async () => {
      try {
        //Função para procurar vagas
        if (vagaId) {
          //Caminho das informações
          const VagaDoc = doc(db, 'Vagas', vagaId);
         
          //Pegando as informações
          const GetVagas = await getDoc(VagaDoc);

          //Tratamento e setando dados em variaveis
          if (GetVagas.exists()) {
            //Sucesso
            const vagaData = { id: GetVagas.id, ...GetVagas.data() };
            ('Vaga:', vagaData);
            setVaga(vagaData);
          } else {
            //Erro
            ('Nenhum documento encontrado!');
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

    GetCandidatos();
    GetVaga();
  }, [vagaId]);

  {
    candidatos.map(candidato => (
      <li key={candidato.id}>{candidato.nome}</li>
    ))
  }

  const handleButtonClick = (id) => {
    navigate(`/visualizardocumentos/${id}/${vagaId}`)
  }

  const AceitarCandidato = async (id) => {
    try {
      const GetDoc = collection(db, "Vagas", vagaId, 'candidatos', id, 'documentos')
      const DocResult = await getDocs(GetDoc)
      if(!DocResult.empty){
        try {
          const situação = "Aprovado"
          const vagaRef = doc(db, "Vagas", vagaId, 'candidatos', id)
         
          await updateDoc(vagaRef, {
            situação: situação
          });
          alert("Apuração enviada com sucesso!")
          navigate(0)
        } catch (e) {
          console.error("Erro ao adicionar pessoa: ", e)
          alert("Erro ao adicionar pessoa.")
        }
      }else{
        alert("Sem documentos para poder apurar, aguarde!!!")
      }
    } catch (e) {
      console.error("Erro ao adicionar pessoa: ", e)
      alert("Erro ao adicionar pessoa.")
    }
  };

  const RecusarCandidato = async (id) => {
    try {
      const GetDoc = collection(db, "Vagas", vagaId, 'candidatos', id, 'documentos')
      const DocResult = await getDocs(GetDoc)
      if(!DocResult.empty){
        try {
          const situação = "Recusado"
          const vagaRef = doc(db, "Vagas", vagaId, 'candidatos', id)
         
          await updateDoc(vagaRef, {
            situação: situação
          });
          alert("Apuração enviada com sucesso!")
          navigate(0)
        } catch (e) {
          console.error("Erro ao adicionar pessoa: ", e)
          alert("Erro ao adicionar pessoa.")
        }
      }else{
        alert("Sem documentos para poder apurar, aguarde!!!")
      }
    } catch (e) {
      console.error("Erro ao adicionar pessoa: ", e)
      alert("Erro ao adicionar pessoa.")
    }
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
                      Nome
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Situação
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
                              {candidato.name}
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
                        <p className="text-gray-900 whitespace-no-wrap">
                          {candidato.situação}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button onClick={() => handleButtonClick(candidato.id)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Documentos
                        </button>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button onClick={() => AceitarCandidato(candidato.id)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-green-700 border border-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                          <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Aceitar Candidato
                        </button>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button onClick={() => RecusarCandidato(candidato.id)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-red-700 border border-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-res-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Recusar Candidato
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