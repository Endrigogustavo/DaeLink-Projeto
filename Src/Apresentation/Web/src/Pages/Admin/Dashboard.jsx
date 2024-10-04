import React, { useEffect, useState } from 'react';
import { db, auth } from '../../Database/Firebase'
import { collection, getDocs } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate()
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

  const AltListPCD = () => {
    setListAtual(listPCD)
  }
  const AltListVagas = () => {
    setListAtual(listVagas)
  }
  const AltListEmpresa = () => {
    setListAtual(listEmpresas)
  }

  const UpdateInfo = (id, tipo) => {
    if(tipo == "PCD"){
      navigate(`/pcdadm/${id}`)
    }
    if(tipo == "Empresa"){
      navigate(`/empresaadm/${id}`)
    }
  }

  const UpdateVaga = (id) => {
    navigate(`/vagaadm/${id}`)
  }
  return (
    <>
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
            <a
              className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
              href="#"
            >
              <i className="fas mr-2"></i>
              PCD
            </a>
            <a
              className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
              href="#"
            >
              <i className="fas mr-2"></i>
              Vagas
            </a>
            <a
              className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
              href="#"
            >
              <i className="fas mr-2"></i>
              Empresas
            </a>
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
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nome</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Email</th>
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
                    <button onClick={() =>UpdateInfo(list.id, list.tipo)} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Atualizar</button>
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
            <h2 className="text-gray-500 text-lg font-semibold pb-4">Vagas</h2>
            <div className="my-1"></div>
            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Empresa</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Area</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Tipo</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Exigencias</th>
                </tr>
              </thead>
              <tbody>
              {listVagas.map((list) => (
                  <tr className="hover:bg-grey-lighter" key={list.id}>
                    <td className="py-2 px-4 border-b border-grey-light">{list.empresa}</td>
                    <td className="py-2 px-4 border-b border-grey-light">{list.area}</td>
                    <td className="py-2 px-4 border-b border-grey-light">{list.tipo}</td>
                    <td className="py-2 px-4 border-b border-grey-light">{list.exigencias}</td>
                    <button onClick={() =>UpdateVaga(list.id)} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Atualizar Vaga</button>
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
    <br />
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
        <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight text-gray-950 sm:text-5xl">
          Everything you need to deploy your app.
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Mobile friendly
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="size-full object-cover object-top"
                    src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Performance
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.
                </p>
              </div>
              <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                <img
                  className="h-[min(152px,40cqw)] object-cover object-center"
                  src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Powerful APIs
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                  <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                      <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                        NotificationSetting.jsx
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                    </div>
                  </div>
                  <div className="px-6 pb-14 pt-6">{/* Your code example */}</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
