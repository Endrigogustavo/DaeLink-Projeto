import React, { useEffect, useState } from 'react';
import { db, auth } from '../../Database/Firebase'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa6";
import { MdWork, MdExitToApp, MdDashboard } from "react-icons/md";
import { BiSolidBusiness } from "react-icons/bi";
import { CgSpinner } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { logout } from '../../Auth/Auth';

import "./adminpage.css"
import user from "../../Img/admin/users.png"
import job from "../../Img/admin/job.png"
import job2 from "../../Img/admin/job2.png"
import empresa from "../../Img/admin/empresa.png"
import empresa2 from "../../Img/admin/empresa2.png"
import profile from "../../Img/admin/profile.png"

const Dashboard = () => {

  const navigate = useNavigate()
  const [listPCD, setListPCD] = useState([])
  const [listVagas, setListVagas] = useState([])
  const [listEmpresas, setListEmpresas] = useState([])
  const [listAtual, setListAtual] = useState(1)

  const [Pcdquantidade, setPcdquantidade] = useState(0);
  const [Vagaquantidade, setVagaquantidade] = useState(0);
  const [Empresaquantidade, setEmpresaquantidade] = useState(0);
  const [loading, setLoading] = useState(false);
  const [menuSide, setMenuSide] = useState(false);

  useEffect(() => {
    const ListPCD = async () => {
      localStorage.removeItem('PCD');
      localStorage.removeItem('Empresa');
      localStorage.removeItem('Vaga');
      const PCDref = collection(db, "PCD")
      const data = await getDocs(PCDref)
      setPcdquantidade(data.size);

      setListPCD(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));

    }

    const ListVagas = async () => {
      const Vagasref = collection(db, "Vagas");
      const data = await getDocs(Vagasref);
      setVagaquantidade(data.size);
      const vagasArray = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      // Criando o objeto temporário para armazenar as informações das empresas
      let empresasTemp = {};

      // Aguardando todas as promessas de busca das empresas
      await Promise.all(vagasArray.map(async (vaga) => {
        if (vaga.empresaId) {
          const empresaDoc = await getDoc(doc(db, "Empresa", vaga.empresaId));
          if (empresaDoc.exists()) {
            // Armazena tanto o imageProfile quanto o imageUrl
            const empresaData = empresaDoc.data();
            empresasTemp[vaga.empresaId] = {
              imageUrl: empresaData.imageUrl,
              imageProfile: empresaData.imageProfile,
              empresaname: empresaData.name
            };
          } else {
            console.log(`Empresa não encontrada: ${vaga.empresaId}`);
          }
        }
      }));

      // Atualizando o estado com as vagas e as informações das empresas
      setListVagas(vagasArray.map(vaga => ({
        ...vaga,
        empresa: empresasTemp[vaga.empresaId] || {}  // Adicionando os dados da empresa à vaga
      })));
    };

    const ListEmpresas = async () => {
      const Empresasref = collection(db, "Empresa")
      const data = await getDocs(Empresasref)
      setEmpresaquantidade(data.size);
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
    if (tipo == "PCD") {
      localStorage.setItem('PCD', id);
      navigate(`/pcdadm/`)
    }
    if (tipo == "Empresa") {
      localStorage.setItem('Empresa', id);
      navigate(`/empresaadm/`)
    }
  }

  const UpdateVaga = (id) => {
    localStorage.setItem('Vaga', id);
    navigate(`/vagaadm/`)
  }

  const handleTabChange = async (tabIndex) => {
    setLoading(true); // Set loading true when switching tabs
    setTimeout(() => {
      setListAtual(tabIndex);
      setLoading(false);
    }, 620);
  };

  async function LogoutProfile() {
    //Função do Auth.jsx para deslogar
    logout();
    localStorage.removeItem('userId');
    // Redireciona para a página de login após o logout
    navigate('/');
  }

  const menuopen = () => {
    setMenuSide(true);
  }

  const menuclose = () => {
    setMenuSide(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 870) {
        setMenuSide(false);
      }
    };

    // Adiciona o event listener
    window.addEventListener('resize', handleResize);

    // Remove o event listener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>


      <div className='h-full w-full flex dashboard-screen '>
        <div className={` h-full w-3/12  shadow-2xl border-r-2  border-gray-300 flex flex-col ${menuSide ? ' bg-white w-sidebar z-20 absolute' : 'dash-nav '} `}>
          {menuSide ?
            <div className='w-full h-fit flex justify-end absolute px-4'>
              <IoCloseOutline className='text-4xl cursor-pointer z-30 ' onClick={menuclose} />
            </div>
            :
            <></>
          }


          <div className='w-full h-1/6 flex border-b-2 border-gray-200 items-end  pb-2 justify-center' >
            <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className='max-sm-logo w-36' alt="Logo" />
          </div>
          <div className='flex flex-col h-3/6  justify-center items-center'>

            <div className='w-full h-fit flex pb-2 pl-4 '>
              <h1 className='font-bold italic text-base  text-gray-900 '> Opções</h1>
            </div>

            <div className={`w-full h-fit flex gap-4 items-center pl-4  cursor-pointer py-4 px-2 rounded-3xl  hover:bg-gray-200 
                hover:shadow-3xl  transition duration-300 ease-in-out
                ${listAtual === 1 ? 'bg-gray-200 text-blue-500' : ''}`}
              onClick={() => handleTabChange(1)}>
              <MdDashboard className='text-2xl' />
              <h1 className='text-base '> Dashboard</h1>
            </div>

            <div className={`w-full h-fit flex gap-4 items-center pl-4  cursor-pointer py-4 px-2 rounded-3xl  hover:bg-gray-200 
                hover:shadow-3xl  transition duration-300 ease-in-out
                ${listAtual === 2 ? 'bg-gray-200 text-blue-500' : ''}`}
              onClick={() => handleTabChange(2)}>
              <FaUsers className='text-2xl' />
              <h1 className='text-base '> Usuários</h1>
            </div>

            <div className={`w-full h-fit flex gap-4 items-center pl-4  cursor-pointer py-4 px-2 rounded-3xl  hover:bg-gray-200 
                hover:shadow-3xl  transition duration-300 ease-in-out
                ${listAtual === 3 ? 'bg-gray-200 text-blue-500' : ''}`}
              onClick={() => handleTabChange(3)}
            >
              <BiSolidBusiness className='text-2xl' />
              <h1 className='text-base '> Empresas</h1>
            </div>


            <div className={`w-full h-fit flex gap-4 items-center pl-4  cursor-pointer py-4 px-2 rounded-3xl  hover:bg-gray-200 
                hover:shadow-3xl  transition duration-300 ease-in-out
                ${listAtual === 4 ? 'bg-gray-200 text-blue-500' : ''}`}
              onClick={() => handleTabChange(4)}>
              <MdWork className='text-2xl' />
              <h1 className='text-base '> Vagas</h1>
            </div>

          </div>

          <div className='h-2/6 w-full flex  gap-4 justify-center items-center   '>
            <button onClick={LogoutProfile} className='flex h-fit items-center gap-1 text-blue-600  py-4 px-4 rounded-3xl 
            bg-gradient-to-br from-gray-300 to-gray-100  border-gray-300 border cardhover '>
              <MdExitToApp className='text-2xl ' /><h1 className='text-base '> Logout</h1>
            </button>
          </div>

        </div>

        <div className='h-full w-9/12 dash-content'>
          <div className='h-20 w-full flex px-12 hidden menu-div items-center relative'>
            {menuSide ?
              <></>
              :
              <FiMenu className='text-4xl cursor-pointer ' onClick={menuopen} />
            }
          </div>

          {loading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <CgSpinner className='text-4xl text-blue-500 animate-spin' />
            </div>
          ) : (
            <>

              {listAtual === 1 && (
                <>
                  <div className='w-full h-full flex flex-col items-center py-12 container-tabs'>
                    <div className='w-full h-36 flex items-center justify-center'>
                      <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gradient-to-br from-gray-900 to-gray-700  
                      border-2 items-center justify-center px-5 mb-16 '>
                        <h1 className='font-bold text-2xl text-white'>Admin</h1>
                      </div>
                    </div>

                    <div className='w-full h-fit px-12 mb-16'>
                      <h1 className='font-bold text-2xl capitalize '>O que vamos rever hoje?</h1>
                    </div>

                    <div className='w-full h-fit grid grid-cols-3  justify-items-center dash-cards-1' >
                      <div className='h-64 w-52 rounded-3xl bg-gradient-to-br from-red-500 to-gray-400 shadow-2xl cardhover 
                      cursor-pointer flex flex-col overflow-hidden'
                        onClick={() => handleTabChange(2)}>
                        <div className='w-full h-3/6 flex flex-col justify-center pl-4 gap-2'>
                          <h2 className='font-semibold text-white text-xl'>Usuários Cadastrados:</h2>
                          <p className=' text-2xl font-bold text-white '>{Pcdquantidade}</p>
                        </div>
                        <div className='w-full h-3/6 flex items-center justify-center '>
                          <img src={user} alt="" />
                        </div>

                      </div>



                      <div className='h-64 w-52 rounded-3xl bg-gradient-to-br from-blue-500 to-gray-400 shadow-2xl cardhover 
                  cursor-pointer flex flex-col overflow-hidden'
                        onClick={() => handleTabChange(3)} >

                        <div className='w-full h-3/6 flex flex-col justify-center pl-4 gap-2'>
                          <h2 className='font-semibold text-white text-xl'>Empresas Registradas:</h2>
                          <p className=' text-2xl font-bold text-white '>{Empresaquantidade}</p>
                        </div>
                        <div className='w-full h-3/6 flex items-center justify-center '>
                          <img src={empresa} alt="" />
                        </div>

                      </div>

                      <div className='h-64 w-52 rounded-3xl bg-gradient-to-br from-green-500 to-gray-400 shadow-2xl cardhover 
                  cursor-pointer flex flex-col overflow-hidden'
                        onClick={() => handleTabChange(4)} >

                        <div className='w-full h-3/6 flex flex-col justify-center pl-4 gap-2'>
                          <h2 className='font-semibold text-white text-xl'>Vagas Registradas:</h2>
                          <p className=' text-2xl font-bold text-white '>{Vagaquantidade}</p>
                        </div>
                        <div className='w-full h-3/6 flex items-center justify-center '>
                          <img src={job} alt="" />
                        </div>

                      </div>

                    </div>

                  </div>

                </>
              )}

              {listAtual === 2 && (
                <>
                  <div className='w-full h-full flex flex-col items-center pt-12 px-4 container-tabs'>
                    <div className='w-full h-36 flex items-center justify-center'>
                      <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gradient-to-br from-red-500 to-gray-400  
                border-2 items-center justify-center px-5 mb-16 banner-tab '>
                        <h1 className='font-bold text-2xl text-white'>Usuários</h1>
                      </div>
                    </div>

                    <div className='w-full h-fit items-center justify-center flex gap-8 mb-4 dash-cards-2'>
                      <div className='h-52 w-52 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl cardhover 
                  cursor-pointer flex flex-col overflow-hidden'
                      >
                        <div className='w-full h-3/6 flex flex-col p-4 gap-4'>
                          <h1 className='font-semibold text-xl'>Total de Usuários</h1>
                          <h2 className='font-bold text-3xl z-10'>{Pcdquantidade}</h2>
                        </div>
                        <div className='w-full h-3/6 flex flex-col justify-center items-center'>
                          <img src={user} alt="" />
                        </div>

                      </div>

                      <div className='h-52 w-96 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl cardhover 
                  cursor-pointer flex flex-col overflow-hidden'
                      >
                        <div className='w-full h-3/6 flex flex-col p-4'>
                          <h1 className='font-semibold text-xl'>Monitore as Atividades</h1>
                        </div>
                        <div className='w-full h-3/6 flex flex-col justify-center items-center'>
                          <img src={profile} alt="" />
                        </div>

                      </div>
                    </div>

                    <h1 className='my-4 font-medium text-xl'>Utilize o Scroll para ver todos:</h1>

                    <div className='h-table-admin w-full overflow-x-hidden overflow-y-scroll grid grid-cols-2 gap-y-8 justify-items-center py-4'>

                      {listPCD.map((list) => (
                        <div className='h-20 w-96 border-2 border-gray-300 rounded-full shadow-2xl flex'>
                          <div className='h-full w-2/6 flex items-center justify-center '>
                            <img src={list.profileImage || list.imageUrl} className='w-12 h-12 rounded-full object-cover bg-gray-200 border-2 border-blue-400' alt="" />
                          </div>
                          <div className='h-full w-2/6 flex flex-col  items-center justify-center overflow-hidden'>
                            <h1 className='font-bold text-center'>{list.name}</h1>
                            <p className='font-normal text-center'>{list.trabalho}</p>
                          </div>

                          <div className='h-full w-2/6 flex flex-col  items-center justify-center '>
                            <button onClick={() => UpdateInfo(list.id, list.tipo)} type="submit"
                              className='w-24 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all'>Editar</button>
                          </div>

                        </div>
                      ))}


                    </div>

                  </div>

                </>
              )}

              {listAtual === 3 && (
                <>
                  <div className='w-full h-full flex flex-col items-center pt-12 px-4 container-tabs'>
                    <div className='w-full h-36 flex items-center justify-center'>
                      <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gradient-to-br from-blue-500 to-gray-400  
                border-2 items-center justify-center px-5 mb-16 banner-tab'>
                        <h1 className='font-bold text-2xl text-white'>Empresas</h1>
                      </div>
                    </div>

                    <div className='w-full h-fit items-center justify-center flex gap-8 mb-4 dash-cards-2'>
                      <div className='h-52 w-52 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl cardhover 
                  cursor-pointer flex flex-col overflow-hidden'
                      >
                        <div className='w-full h-3/6 flex flex-col p-4 gap-4'>
                          <h1 className='font-semibold text-xl'>Total de Empresas</h1>
                          <h2 className='font-bold text-3xl z-10'>{Empresaquantidade}</h2>
                        </div>
                        <div className='w-full h-3/6 flex flex-col justify-center items-center'>
                          <img src={empresa} alt="" />
                        </div>

                      </div>

                      <div className='h-52 w-96 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl cardhover 
                  cursor-pointer flex flex-col overflow-hidden'
                      >
                        <div className='w-full h-3/6 flex flex-col p-4'>
                          <h1 className='font-semibold text-xl'>Monitore as Atividades</h1>
                        </div>
                        <div className='w-full h-3/6 flex flex-col justify-center items-center'>
                          <img src={empresa2} alt="" />
                        </div>

                      </div>
                    </div>

                    <h1 className='my-4 font-medium text-xl'>Utilize o Scroll para ver todos:</h1>

                    <div className='h-table-admin w-full overflow-x-hidden overflow-y-scroll grid grid-cols-2 gap-y-8 justify-items-center py-4'>

                      {listEmpresas.map((list) => (
                        <div className='h-20 w-96 border-2 border-gray-300 rounded-full shadow-2xl flex'>
                          <div className='h-full w-2/6 flex items-center justify-center '>
                            <img src={list.profileImage || list.imageUrl} className='w-12 h-12 rounded-full object-cover bg-gray-200 border-2 border-blue-400' alt="" />
                          </div>
                          <div className='h-full w-2/6 flex flex-col  items-center justify-center overflow-hidden'>
                            <h1 className='font-bold text-center'>{list.name}</h1>
                            <p className='font-normal text-center'>{list.area}</p>
                          </div>

                          <div className='h-full w-2/6 flex flex-col  items-center justify-center '>
                            <button onClick={() => UpdateInfo(list.id, list.tipo)} type="submit"
                              className='w-24 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all'>Editar</button>
                          </div>

                        </div>
                      ))}


                    </div>

                  </div>

                </>
              )}

              {listAtual === 4 && (
                <>
                  <div className='w-full h-full flex flex-col items-center pt-12 px-4 container-tabs'>

                    <div className='w-full h-36 flex items-center justify-center'>
                      <div className='w-64 h-20 rounded-3xl shadow-2xl flex bg-gradient-to-br from-green-500 to-gray-400 
                border-2 items-center justify-center px-5 mb-16 banner-tab '>
                        <h1 className='font-bold text-2xl text-white'>Vagas</h1>
                      </div>
                    </div>

                    <div className='w-full h-fit items-center justify-center flex gap-8 mb-4 dash-cards-2'>
                      <div className='h-52 w-52 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl cardhover 
                  cursor-pointer flex flex-col overflow-hidden' >
                        <div className='w-full h-3/6 flex flex-col p-4 gap-4'>
                          <h1 className='font-semibold text-xl'>Total de Vagas</h1>
                          <h2 className='font-bold text-3xl z-10'>{Vagaquantidade}</h2>
                        </div>
                        <div className='w-full h-3/6 flex flex-col justify-center items-center'>
                          <img src={job} alt="" />
                        </div>

                      </div>

                      <div className='h-52 w-96 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl cardhover 
                  cursor-pointer flex flex-col overflow-hidden'
                      >
                        <div className='w-full h-3/6 flex flex-col p-4'>
                          <h1 className='font-semibold text-xl'>Monitore as Atividades</h1>
                        </div>
                        <div className='w-full h-3/6 flex flex-col justify-center items-center'>
                          <img src={job2} alt="" className='pt-32' />
                        </div>

                      </div>
                    </div>

                    <h1 className='my-4 font-medium text-xl'>Utilize o Scroll para ver todos:</h1>

                    <div className='h-table-admin w-full overflow-x-hidden overflow-y-scroll grid grid-cols-2 gap-y-8 justify-items-center py-4'>

                      {listVagas.map((list) => {
                        const empresa = list.empresa || {};  // Garantindo que a empresa existe ou um objeto vazio
                        return (
                          <div key={list.id} className='h-20 w-96 border-2 border-gray-300 rounded-full shadow-2xl flex'>
                            <div className='h-full w-2/6 flex items-center justify-center'>
                              {/* Usando imageProfile como chave correta */}
                              <img src={empresa.imageUrl} className='w-12 h-12 rounded-full object-cover bg-gray-200 border-2 border-blue-400' alt="Imagem da empresa" />
                            </div>
                            <div className='h-full w-2/6 flex flex-col items-center justify-center overflow-hidden'>
                              <h1 className='font-bold text-center'>{list.vaga}</h1>
                              <p className='font-normal text-center'>{empresa.empresaname || 'Empresa não encontrada'}</p> {/* Caso o nome da empresa não seja encontrado */}
                            </div>
                            <div className='h-full w-2/6 flex flex-col items-center justify-center'>
                              <button onClick={() => UpdateVaga(list.id)} type="submit"
                                className='w-24 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all'>
                                Editar
                              </button>
                            </div>
                          </div>
                        );
                      })}



                    </div>

                  </div>

                </>
              )}

            </>)}

        </div>

      </div>

    </>
  );
};

export default Dashboard;
