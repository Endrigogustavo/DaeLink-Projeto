import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaBuilding, FaAccessibleIcon } from 'react-icons/fa';
import axios from 'axios'


const AboutPCD = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const getPCDprofile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-PCD', { withCredentials: true });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error.response ? error.response.data : error.message);
            }
        };
        getPCDprofile();

    }, []);


    const texto1 = `A busca pelo crescimento profissional é constante. Invista em novas habilidades, 
    participe de cursos, e mantenha-se atualizado com as tendências do mercado. `
    const texto2 = `Já pensou em uma empresa e se imaginou trabalhando nela? porque não
    dá uma chance para esse pensamento apenas a procure `
    const texto3 = `Se sente limitado pela ${userProfile?.deficiencia}?  a 
    inclusão dessas pessoas no mercado de trabalho mostra que talento e competência não são barrados. 
    Juntos, construímos um mercado mais inclusivo e inovador.`;


    return (
        <>
            <div className="h-75vh flex justify-center items-center  aboutcontainer overflow-hidden ">
                <img src="https://i.postimg.cc/8ktnc47C/Girl-About.png" alt="" className="flex h-full aboutimg" />
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-4/6 h-5/6 rounded-64px flex aboutextcontainer">
                    <div className="content w-full h-full flex flex-col items-center  gap-8 py-20">
                        <div className="flex flex-col items-center ">
                            <h1 className="text-3xl font-bold uppercase text-white pt-2 text-center">{userProfile?.name}</h1>
                            <h2 className="text-2xl font-medium text-white pb-8 text-center ">O que vamos melhorar hoje?</h2>
                        </div>
                        <div className="flex w-full justify-center px-16 gap-8 pb-8  itemscontentsd">
                            <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                                <FaGraduationCap className='text-white text-3xl ' />
                                <p className="text-justify text-white bg-gray-800 h-4/5 p-3 rounded-lg  font-normal textinbox">{texto1}</p>
                            </div>
                            <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                                <FaBuilding className='text-white text-3xl  ' />
                                <p className="text-justify text-white bg-gray-800 h-4/5 p-3 rounded-lg font-normal textinbox">{texto2}</p>
                            </div>
                            <div className="w-1/3 flex flex-col items-center gap-4  itemstextboxsd">
                                <FaAccessibleIcon className='text-white text-3xl  ' />
                                <p className="text-justify text-white bg-gray-800 h-4/5 p-3 rounded-lg font-normal textinbox">{texto3}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>


    )

}

export default AboutPCD;