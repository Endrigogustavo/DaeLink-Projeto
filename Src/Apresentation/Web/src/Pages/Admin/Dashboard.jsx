import React, { useEffect, useState } from 'react';
import { db, auth } from '../../Database/Firebase'
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const [listPCD, setListPCD] = useState([])
  const [listVagas, setListVagas] = useState([])
  const [listEmpresas, setListEmpresas] = useState([])
  const [listAtual, setListAtual] = useState([])

  useEffect(() => {
    const ListPCD = async () => {
      const PCDref = collection(db, "PCD")
      const data = await getDocs(PCDref)
      setListPCD(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));

    }

    const ListVagas = async () => {
      const Vagasref = collection(db, "Vagas")
      const data = await getDocs(Vagasref)
      setListVagas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }

    const ListEmpresas = async () => {
      const Empresasref = collection(db, "Empresa")
      const data = await getDocs(Empresasref)
      setListEmpresas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }

    ListPCD()
    ListEmpresas()
    ListVagas()

  }, [])

  const AltListPCD = () =>{
    setListAtual(listPCD)
  } 
  const AltListVagas = () =>{
    setListAtual(listVagas)
  } 
  const AltListEmpresa = () =>{
    setListAtual(listEmpresas)
  } 
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Barra de navegação superior */}
      <div className="bg-white text-white shadow w-full p-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              src="https://i.postimg.cc/vB5MHPX1/DaeLink.png"
              alt="Logo"
              className="w-28 h-18 mr-2"
            />
          </div>
          <div className="md:hidden flex items-center">
            <button id="menuBtn">
              <i className="fas fa-bars text-gray-500 text-lg"></i>
            </button>
          </div>
        </div>

        <div className="space-x-5">
          <button>
            <i className="fas fa-bell text-gray-500 text-lg"></i>
          </button>
          <button>
            <i className="fas fa-user text-gray-500 text-lg"></i>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-wrap">
        {/* Barra lateral de navegação (oculta em dispositivos pequenos) */}
        <div className="p-2 bg-white w-full md:w-60 flex flex-col md:flex hidden" id="sideNav">
          <nav>
            {['Inicio', 'Autorizaciones', 'Usuarios', 'Comercios', 'Transacciones'].map((item, index) => (
              <a
                key={index}
                className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="#"
              >
                <i className={`fas fa-${item.toLowerCase()} mr-2`}></i>
                {item}
              </a>
            ))}
          </nav>

          <a
            className="block text-gray-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white mt-auto"
            href="#"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Cerrar sesión
          </a>

          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
        </div>

        {/* Área de conteúdo principal */}
        <div className="flex-1 p-4 w-full md:w-1/2">
          {/* Contenedor de Gráficas */}
          <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
            {/* Seção 1 - Gráfica de Usuários */}
            <button onClick={AltListPCD} className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">Usuarios</h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <div className="chart-container" style={{ position: 'relative', height: '150px', width: '100%' }}>
                <canvas id="usersChart"></canvas>
              </div>
            </button>

            {/* Seção 2 - Gráfica de Comercios */}
            <button onClick={AltListVagas} className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">Vagas</h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <div className="chart-container" style={{ position: 'relative', height: '150px', width: '100%' }}>
                <canvas id="commercesChart"></canvas>
              </div>
            </button>

            {/* Seção 1 - Gráfica de Usuários */}
            <button onClick={AltListEmpresa} className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">Empresas</h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <div className="chart-container" style={{ position: 'relative', height: '150px', width: '100%' }}>
                <canvas id="usersChart"></canvas>
              </div>
            </button>

          </div>

          {/* Seção 3 - Tabla de Autorizaciones Pendientes */}
          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <h2 className="text-gray-500 text-lg font-semibold pb-4">Usuarios</h2>
            <div className="my-1"></div>
            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Foto</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Rol</th>
                </tr>
              </thead>
              <tbody>

                {listAtual.map((list) => (
                  <tr className="hover:bg-grey-lighter" key={list.id}>
                    <td className="py-2 px-4 border-b border-grey-light">
                      <img src={list.imageProfile} alt="Foto Perfil" className="rounded-full h-10 w-10" />
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">{list.name}</td>
                    <td className="py-2 px-4 border-b border-grey-light">{list.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">Ver más</button>
            </div>
          </div>

          {/* Seção 4 - Tabla de Transacciones */}
          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <h2 className="text-gray-500 text-lg font-semibold pb-4">Transacciones</h2>
            <div className="my-1"></div>
            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Fecha</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Carlos Sánchez", date: "27/07/2023", amount: "$1500" },
                  { name: "Pedro Hernández", date: "02/08/2023", amount: "$1950" },
                  { name: "Sara Ramírez", date: "03/08/2023", amount: "$1200" },
                  { name: "Luz María", date: "04/08/2023", amount: "$3000" },
                  { name: "Juan Carlos", date: "05/08/2023", amount: "$1800" },
                ].map((transaction, index) => (
                  <tr className="hover:bg-grey-lighter" key={index}>
                    <td className="py-2 px-4 border-b border-grey-light">{transaction.name}</td>
                    <td className="py-2 px-4 border-b border-grey-light">{transaction.date}</td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">Ver más</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
