import { PaperClipIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../Database/Firebase';
import { doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore'; // Importando addDoc
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../../Navbar/Navbar';
import Modal from '../../Modal/Modal';
import ConfirmModal from '../../Modal/ConfirmModal';
import { MdWork } from "react-icons/md";
import axios from 'axios';
export default function Example() {
  const navigate = useNavigate();

  const [vaga, setVaga] = useState(null);
  const [empresa, setEmpresas] = useState(null);
  const [pessoaId, setPessoaId] = useState(null);
  const [id, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [vagaId, setVagaId] = useState("")
  const [situação, setSituação] = useState("Pendente");

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('Processando...');
  const [isWorksModal, setWorksModal] = useState(false);

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [ConfirmModalMessage, setConfirmMessage] = useState('Deseja se Candidatar?');

  const handleOpenModal = () => {
    setConfirmModalOpen(true);
  };

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
  };

  useEffect(() => {
    const getInfo = async () => {
      const VagaIdStorage = localStorage.getItem('vagaId');
      if (VagaIdStorage) {
        const VagaId = VagaIdStorage;
        setVagaId(VagaId)


        const vagaDoc = doc(db, "Vagas", VagaId);
        const vagaSnapshot = await getDoc(vagaDoc);

        if (vagaSnapshot.exists()) {
          const vagaData = { id: vagaSnapshot.id, ...vagaSnapshot.data() };
          setVaga(vagaData); // Armazena os dados da vaga

          // Busca a empresa, garantindo que vagaData está definido
          const empresaDoc = await getDoc(doc(db, "Empresa", vagaData.empresaId));
          if (empresaDoc.exists()) {
            const empresaData = { id: empresaDoc.id, ...empresaDoc.data() };
            setEmpresas(empresaData);
          } else {
            console.log("Empresa não encontrada!");
          }
        } else {
          console.log("Vaga não encontrada!");
        }
      }

    };

    getInfo();
  }, []);

  useEffect(() => {
    const getInfoPCD = async () => {
      const storedUserId = await axios.get('http://localhost:3000/getcookie', { withCredentials: true });
      setUserId(storedUserId.data)
      if (storedUserId) {
        const PCDDoc = await getDoc(doc(db, "PCD", storedUserId.data));
        if (PCDDoc.exists()) {
          const PCDData = { id: PCDDoc.id, ...PCDDoc.data() };
          setPessoaId(PCDData);
        } else {
          console.log("Pessoa não encontrada!");
        }
      } else {
       
      }
    };

    getInfoPCD();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setConfirmModalOpen(false)
      const vagaRef = doc(db, "Vagas", vagaId);
      const candidatosRef = collection(vagaRef, 'candidatos');

      // Verifica se pessoaId está definido
      if (!pessoaId || !pessoaId.id) {
        setWorksModal(false)
        setModalMessage("Informações do candidato não carregadas corretamente.")
        setModalOpen(true)
        setTimeout(() => {
          return;
        }, 4000);
      }

      // Buscar todos os candidatos da vaga
      const candidatosSnapshot = await getDocs(candidatosRef);
      const storedUserId = await axios.get('http://localhost:3000/getcookie', { withCredentials: true });
      const userExists = candidatosSnapshot.docs.some(doc => doc.data().userId === storedUserId.data);

      if (userExists) {
        setWorksModal(true)
        setModalMessage("Você já se candidatou a esta vaga.")
        setModalOpen(true)

        setTimeout(() => {

          navigate("/processos");
        }, 4000);

      } else {

        // Se o userId não existir, adicione o novo candidato
        await addDoc(candidatosRef, {
          userId: pessoaId.id,
          name: pessoaId.name,
          email: pessoaId.email,
          situação: situação
        });

        setWorksModal(true)
        setModalMessage("Candidatado com Sucesso")
        setModalOpen(true)
        setTimeout(() => {
          localStorage.removeItem('VagaId');
          navigate(`/processos`);
        }, 4000);
      }

    } catch (e) {
      console.error("Erro ao adicionar pessoa: ", e);

      setWorksModal(false)
      setModalMessage("Erro ao se Candidatar")
      setModalOpen(true)
      setTimeout(() => {
        setModalOpen(false)
      }, 2200);
    }
  };


  return (
    <>
      <Navbar />

      <ConfirmModal
        isWorksModal={isConfirmModalOpen}
        onConfirm={handleSubmit}
        onClose={handleCloseModal}
        message={ConfirmModalMessage}
      />

      <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />

      <div className='min-h-screen h-fit w-full flex flex-col py-16 items-center gap-2'>

        <div className='h-fit w-full flex items-center justify-center gap-4'>
          {empresa && (
            <img
              src={empresa.imageUrl}
              alt=""
              className='w-32 h-32 rounded-3xl shadow-2xl border-4 border-blue-600 object-cover'
            />
          )}
          <div className='h-fit w-fit flex flex-col justify-center items-center gap-2'>
            <MdWork className='text-8xl text-gray-900 text-center bg-white p-4 rounded-full shadow-2xl' />
            <p className='font-semibold text-base text-center'>{vaga?.vaga || 'Carregando...'}</p>
          </div>
        </div>

        <div className='w-3/4 h-fit flex flex-col items-center gap-2'>
          <div className='w-32 h-12 rounded-3xl shadow-2xl flex bg-gray-900 border-2 items-center justify-center px-5'>
            <p className='text-white text-base font-medium'>{vaga ? vaga.status : 'Carregando...'}</p>
          </div>

          <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
            <h2 className='font-medium text-gray-900'>Área:</h2>
            <p className='text-base font-normal'>{vaga?.area || 'Carregando...'}</p> {/* Verificação para vaga.area */}
          </div>

          <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
            <h2 className='font-medium text-gray-900'>Salário:</h2>
            <p className='text-base font-normal'>R${vaga?.salario || 'Carregando...'}</p> {/* Verificação para vaga.salario */}
          </div>

          <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
            <h2 className='font-medium text-gray-900'>Tipo:</h2>
            <p className='text-base font-normal'>{vaga?.tipo || 'Carregando...'}</p> {/* Verificação para vaga.salario */}
          </div>

          <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
            <h2 className='font-medium text-gray-900'>Endereço:</h2>
            <p className='text-base font-normal'>{vaga?.local || 'Carregando...'}</p> {/* Verificação para vaga.local */}
          </div>

          <div className='w-3/4 h-fit border-b-2 py-2 border-gray-300 flex gap-4'>
            <h2 className='font-medium text-gray-900'>Descrição:</h2>
            <p className='text-base font-normal px-16 capitalize'>{vaga?.detalhes || 'Carregando...'}</p> {/* Verificação para vaga.detalhes */}
          </div>




          <div>{vaga && vaga.status === 'Aberta' && (
            <button className='w-40 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all'
              onClick={handleOpenModal}>Candidatar-se</button>
          )}
          </div>


        </div>

      </div >

    </>
  );
}
