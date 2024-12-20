import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FaClipboardUser, FaChartLine, FaDove } from "react-icons/fa6";
import axios from 'axios';

const AboutEmpresa = () => {
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const getPCDprofile = async () => {
        try {
            const response = await axios.get('http://localhost:3000/get-company', { withCredentials: true });
            setUserProfile(response.data);
            setLoading(false)
        } catch (error) {
            console.error('Erro ao buscar os usuários:', error.response ? error.response.data : error.message);
        }
        
    };
    getPCDprofile();

}, []);

  if (loading) {
    return <div>Loading...</div>; // Exibe um loading enquanto os dados estão sendo carregados
  }

  if (!userProfile) {
    return <div>Perfil não encontrado</div>; // Exibe uma mensagem caso o perfil não seja encontrado
  }


  const texto1 = `Analisar os processos de contatação ativos
    irá trazer uma melhora constante para sua empresa, já que novos 
    candidatos surgem
    a todo momento.`

  const texto2 = `A evolução da sua empresa não se dá apenas financeiramente, 
    mas sua imagem também impacta
    já quem é visto de forma agradável é sempre lembrado.`

  const texto3 = `Sinta-se livre para disponibilizar novas vaga, 
    entretanto faça uso do sistema de recomendação
    já que ele está aqui apenas para ajudar.`

  return (
    <>
      <div className="h-75vh flex justify-center items-center  aboutcontainer overflow-hidden ">
        <img src="https://i.postimg.cc/8ktnc47C/Girl-About.png" alt="" className="flex h-full aboutimg" />
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-4/6 h-5/6 rounded-64px flex aboutextcontainer">
          <div className="content w-full h-full flex flex-col items-center  gap-8 py-20">
            <div className="flex flex-col items-center ">
              <h1 className="text-3xl font-bold uppercase text-white pt-2 text-center">{userProfile.name}</h1>
              <h2 className="text-2xl font-medium text-white pb-8 text-center ">O que podemos fazer hoje?</h2>
            </div>
            <div className="flex w-full  justify-center px-16 gap-8 pb-8  itemscontentsd">
              {/* Item 1 */}
              <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                <FaClipboardUser className="text-white text-3xl" />
                <p className="text-justify  h-4/5 text-white bg-gray-800 p-3 rounded-lg font-normal w-full textinbox">
                  {texto1}
                </p>
              </div>

              {/* Item 2 */}
              <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                <FaChartLine className="text-white text-3xl" />
                <p className="text-justify h-4/5 text-white bg-gray-800 p-3 rounded-lg font-normal w-full textinbox">
                  {texto2}
                </p>
              </div>

              {/* Item 3 */}
              <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                <FaDove className="text-white text-3xl" />
                <p className="text-justify  h-4/5 text-white bg-gray-800 p-3 rounded-lg font-normal w-full textinbox">
                  {texto3}
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>

    </>
  )

}

export default AboutEmpresa;