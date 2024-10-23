import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db, auth } from '../../../Database/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from '../Navbar/Navbar';
import { IoDocumentAttachSharp } from "react-icons/io5";
import Modal from '../Modal/Modal';
import { FaUser } from "react-icons/fa";

//Existem dois atributos CSS, que são puxados do ProcessosEmpresas.css

function VisualizarDocumentos() {
  const navigate = useNavigate();

  const [vagaId, setVagaId] = useState(null);
  const [id, setId] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [vaga, setVaga] = useState(null);
  const [error, setError] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [currentCandidate, setCurrentCandidate] = useState(null); // Nova constante para armazenar candidato atual

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("IdUserDoc");
    const storedVagaId = localStorage.getItem("vagaId");

    if (storedId && storedVagaId) {
      setId(storedId);
      setVagaId(storedVagaId);
    } else {
      setWorksModal(false);
      setModalMessage("ID da vaga ou do candidato não encontrados no localStorage");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 2200);
    }
  }, []);

  useEffect(() => {
    const GetCandidatoESeusDocumentos = async () => {
      try {
        const storedId = localStorage.getItem("IdUserDoc");
        const storedVagaId = localStorage.getItem("vagaId");

        if (!storedId || !storedVagaId) {
          throw new Error("ID da vaga ou ID do candidato não fornecido");
        }

        // Primeira busca: obter dados do candidato na coleção 'Vagas'
        const candidatoDoc = doc(db, 'Vagas', storedVagaId, 'candidatos', storedId);
        const candidatoSnapshot = await getDoc(candidatoDoc);

        if (candidatoSnapshot.exists()) {
          const candidatoData = candidatoSnapshot.data();
          const userId = candidatoData.userId; // Obtém o userId do candidato
          console.log('UserID do candidato:', userId);

          // Segunda busca: buscar os dados na coleção 'PCD' utilizando o userId
          const candidatoPCDRef = doc(db, 'PCD', userId); // Usando o userId para buscar na coleção PCD
          const candidatoPCDSnapshot = await getDoc(candidatoPCDRef);

          if (candidatoPCDSnapshot.exists()) {
            const candidatoPCDData = candidatoPCDSnapshot.data();
            console.log(candidatoPCDData)
            setCurrentCandidate({ id: candidatoPCDSnapshot.id, ...candidatoPCDData }); // Armazena o candidato da coleção PCD
          } else {
            setError('Candidato não encontrado na coleção PCD.');
          }

          // Busca de documentos: documentos do candidato na subcoleção 'documentos' dentro da vaga
          const CandidatosCollection = collection(db, 'Vagas', storedVagaId, 'candidatos', storedId, 'documentos');
          const documentosSnapshot = await getDocs(CandidatosCollection);

          const documentosList = documentosSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setCandidatos(documentosList); // Armazena os documentos encontrados

        } else {
          setError('Candidato não encontrado na vaga.');
        }

      } catch (error) {
        console.error('Erro ao buscar informações do candidato e seus documentos:', error);
        setError('Erro ao buscar informações do candidato e seus documentos');
      }
    };

    GetCandidatoESeusDocumentos();
  }, [id, vagaId]);

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

  const ChatUser = async (userId) => {
    try {
      const ChatCollection = collection(db, "Chat");
      await addDoc(ChatCollection, {
        userId: userId,
        empresaId: empresa
      });

      setWorksModal(true);
      setModalMessage("Pessoa adicionada com sucesso!");
      setModalOpen(true);
      setTimeout(() => {
        localStorage.setItem("chatId", userId);
        navigate(`/chat/`);
      }, 4000);

    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
      setWorksModal(false);
      setModalMessage("Erro ao adicionar pessoa.");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 2200);
    }
  };

  const handleback = async () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
      <div className='min-h-screen h-fit w-full flex flex-col py-16 items-center gap-4'>

        {currentCandidate ? (
          <>
            <div className='h-fit w-full flex items-center justify-center gap-4'>
              <img
                src={currentCandidate.imageUrl}
                alt=""
                className='w-32 h-32 rounded-3xl shadow-2xl border-4 border-blue-600'
              />

              <div className='h-fit w-fit flex flex-col justify-center items-center gap-2'>
                <FaUser className='text-8xl text-gray-900 text-center bg-white p-4 rounded-full shadow-2xl' />
                <p className='font-semibold text-base text-center'>{currentCandidate.name || 'Carregando...'}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Carregando informações do candidato...</p>
        )}

        {candidatos.length > 0 ? (
          candidatos.map((candidato, index) => (
            <div key={index} className='w-3/4 h-fit flex flex-col items-center gap-2 contentdoccandidate'>

              <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
                <h2 className='font-medium text-gray-900'>Email:</h2>
                <p className='text-base font-normal'>{candidato?.email || 'Carregando...'}</p>
              </div>

              <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
                <h2 className='font-medium text-gray-900'>Telefone:</h2>
                <p className='text-base font-normal'>{candidato?.telefone || 'Carregando...'}</p>
              </div>

              <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
                <h2 className='font-medium text-gray-900'>Data de Nascimento:</h2>
                <p className='text-base font-normal'>{candidato?.idade || 'Carregando...'}</p>
              </div>

              <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
                <h2 className='font-medium text-gray-900'>Segundo Idioma:</h2>
                <p className='text-base font-normal'>{candidato?.idiomas || 'Carregando...'}</p>
              </div>

              <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
                <h2 className='font-medium text-gray-900'>Experiências:</h2>
                <p className='text-base font-normal px-16 capitalize'>{candidato?.experiencia1 || 'Carregando...'}</p>
              </div>

              <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
                <h2 className='font-medium text-gray-900'>Objetivo:</h2>
                <p className='text-base font-normal px-16 capitalize'>{candidato?.objetivo || 'Carregando...'}</p>
              </div>

              <div className='w-3/4 h-fit py-2 flex gap-4 flex'>
                <h2 className='font-medium text-gray-900'>Documentos:</h2>
              </div>

              <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 gap-4 grid grid-cols-2 justify-items-center doclist'>
                {currentCandidate?.laudo || currentCandidate?.laudomedico ? (
                  <Link to={currentCandidate.laudo || currentCandidate.laudomedico} target="_blank" rel="noopener noreferrer">
                    <label className='h-16 w-64 rounded-3xl flex items-center justify-center gap-4 
                      bg-transparent border-gray-400 border-2 cursor-pointer'>
                      <IoDocumentAttachSharp className='text-3xl text-gray-900 text-center ' />
                      <h1 className='font-medium text-lg truncate'>Laudo Médico</h1>
                    </label>
                  </Link>
                ) : (
                  <p>Laudo médico não encontrado.</p>
                )}

                <Link to={candidato.formacao_academica1} target="_blank" rel="noopener noreferrer">
                  <label className='h-16 w-64 rounded-3xl flex items-center justify-center gap-4 
                bg-transparent border-gray-400 border-2 cursor-pointer'>
                    <IoDocumentAttachSharp className='text-3xl text-gray-900 text-center ' />
                    <h1 className='font-medium text-lg truncate'>Formação 1</h1>
                  </label>
                </Link>

                <Link to={candidato.formacao_academica2} target="_blank" rel="noopener noreferrer">
                  <label className='h-16 w-64 rounded-3xl flex items-center justify-center gap-4 
                bg-transparent border-gray-400 border-2 cursor-pointer'>
                    <IoDocumentAttachSharp className='text-3xl text-gray-900 text-center ' />
                    <h1 className='font-medium text-lg truncate'>Formação 2</h1>
                  </label>
                </Link>

                <Link to={candidato.formacao_academica3} target="_blank" rel="noopener noreferrer" >
                  <label className='h-16 w-64 rounded-3xl flex items-center justify-center gap-4 
                bg-transparent border-gray-400 border-2 cursor-pointer'>
                    <IoDocumentAttachSharp className='text-3xl text-gray-900 text-center ' />
                    <h1 className='font-medium text-lg truncate'>Formação 3</h1>
                  </label>
                </Link>

              </div>

              <div>
                <button className='w-32 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all mt-2'
                  onClick={() => ChatUser(candidato.userId)}>
                  Contatar
                </button>
              </div>


            </div>
          ))
        ) : (
          <button className='w-32 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all mt-2'
            onClick={handleback}>
            Voltar
          </button>
        )}


      </div>
    </>
  );
}

export default VisualizarDocumentos;
