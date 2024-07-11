
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../Database/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDocs, collection, addDoc, query, where } from 'firebase/firestore';
const UserData = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vagasRef = collection(db, 'PCD');
        const querySnapshot = await getDocs(vagasRef);

        const vagasListUser = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setUserInfo(vagasListUser);
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchVagas = async () => {
      if (user) {
        try {
          const vagasRef = collection(db, 'Vagas');
          const q = query(vagasRef, where('empresaId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          const vagasList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setVagas(vagasList);
        } catch (error) {
          console.error('Error fetching vagas:', error);
        }
      }
    };

    fetchVagas();
  }, [user]);

  const AddUserToVaga = async (VagaId, IdEmpresa) => {
    try {
      const userToAdd = userInfo[0];

      const vagaRef = doc(db, "Vagas", VagaId);
      const candidatosRef = collection(vagaRef, 'candidatos');
      await addDoc(candidatosRef, {
        userId: userToAdd.id,
        nome: userToAdd.name,
        email: userToAdd.email
      });

      alert("Pessoa adicionada com sucesso!");
      navigate(`/homeempresa/${IdEmpresa}`)
    } catch (error) {
      console.error("Erro ao adicionar pessoa:", error);
    }
  };


  return (
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
                    <button onClick={() => AddUserToVaga(vaga.id, vaga.empresaId)} type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Candidatos
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;