import { PaperClipIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../Database/Firebase';
import { doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore'; // Importando addDoc
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../../Navbar/Navbar';
import Modal from '../../Modal/Modal';

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
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);

        const PCDDoc = await getDoc(doc(db, "PCD", storedUserId));
        if (PCDDoc.exists()) {
          const PCDData = { id: PCDDoc.id, ...PCDDoc.data() };
          setPessoaId(PCDData);
        } else {
          console.log("Pessoa não encontrada!");
        }
      } else {
        console.log("ID do usuário não encontrado no localStorage.");
      }
    };

    getInfoPCD();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = confirm("Deseja entrar na vaga?");

    if (response === true) {
      try {
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

        const userExists = candidatosSnapshot.docs.some(doc => doc.data().userId === pessoaId.id);

        if (userExists) {
          setWorksModal(true)
          setModalMessage("Você já se candidatou a esta vaga.")
          setModalOpen(true)

          setTimeout(() => {

            navigate("/processos");
            return;
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
          localStorage.removeItem('VagaId');

          setTimeout(() => {

            navigate(`/processos`);
          }, 4000);
        }

      } catch (e) {
        console.error("Erro ao adicionar pessoa: ", e);

        setWorksModal(false)
        setModalMessage("Erro ao se Candidatar")
        setModalOpen(true)
      }
    }
  };


  return (
    <>
      <Navbar />
      <div>
        <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
      </div>

      <br />
      <div className='flex justify-center items-center min-h-screen'>
        <div className='px-6 w-3/4'>
          <div className="px-6 sm:px-0 text-center">
            <h3 className="text-base font-semibold leading-7 text-gray-950">Informações da vaga</h3>
          </div>
          <div className="mt-6 border-t border-gray-300">
            <dl className="divide-y divide-gray-100">
              {/** Nome da Empresa */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Nome da empresa</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa ? empresa.name : 'Carregando...'}</dd>
              </div>
              {/** Vaga */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Vaga</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vaga ? vaga.vaga : 'Carregando...'}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Área da vaga</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vaga ? vaga.area : 'Carregando...'}</dd>
              </div>
              {/** Email Address */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa ? empresa.email : 'Carregando...'}</dd>
              </div>
              {/** Salário */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Salário</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">${vaga ? vaga.salario : 'Carregando...'}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tipo de vaga</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vaga ? vaga.tipo : 'Carregando...'}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Endereço da empresa</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{vaga ? vaga.local : 'Carregando...'}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Situação da vaga</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><h1>{vaga ? vaga.status : 'Carregando...'}</h1></dd>
              </div>
              {/** Descrição da vaga */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Descrição da vaga</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {vaga ? vaga.detalhes : 'Carregando...'}
                </dd>
              </div>
              {/** Attachments */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    {/** Attachment Item 1 */}
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                      </div>
                    </li>
                    {/** Attachment Item 2 */}
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">resume_front_end_developer.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">3.2mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p>Status: {vaga ? vaga.status : 'Carregando...'}</p>
            {vaga && vaga.status === 'Aberta' && (
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={handleSubmit}>Candidatar</button>
            )}
            {vaga && vaga.status === 'Fechada' && <p>A vaga está fechada.</p>}
            {vaga && vaga.status === 'Preenchida' && <p>A vaga ja foi preenchida.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
