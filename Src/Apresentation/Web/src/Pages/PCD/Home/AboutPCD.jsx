import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaBuilding, FaAccessibleIcon } from 'react-icons/fa';



import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';


const AboutPCD = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const getPCDprofile = async () => {
            const PCDdoc = doc(db, "PCD", id);
            const GetPCDInfo = await getDoc(PCDdoc);
            if (GetPCDInfo.exists()) {
                setUserProfile(GetPCDInfo.data());
            } else {
                setUserProfile(null);
                alert("Sem documentos!");
            }
        };
        getPCDprofile();

    }, [id]);


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
                <img src="https://i.postimg.cc/CKmTv0yD/Bellingham.png" alt="" className="flex " />
                <div className="bg-gray-900 w-4/6 h-5/6 rounded-64px flex aboutextcontainer">
                    <div className="content w-full h-full flex flex-col items-center  gap-8 py-20">
                        <div className="flex flex-col items-center ">
                            <h1 className="text-3xl font-bold uppercase text-white pt-2 text-center">{userProfile?.name}</h1>
                            <h2 className="text-2xl font-medium text-white pb-8 text-center ">O que vamos melhorar hoje?</h2>
                        </div>
                        <div className="flex w-full justify-center px-16 gap-8 pb-8  itemscontentsd">
                            <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                                <FaGraduationCap className='text-white text-3xl ' />
                                <p className="text-justify text-white bg-gray-800 h-4/5 p-3 rounded-lg  font-normal">{texto1}</p>
                            </div>
                            <div className="w-1/3 flex flex-col items-center gap-4 itemstextboxsd">
                                <FaBuilding className='text-white text-3xl  ' />
                                <p className="text-justify text-white bg-gray-800 h-4/5 p-3 rounded-lg font-normal">{texto2}</p>
                            </div>
                            <div className="w-1/3 flex flex-col items-center gap-4  itemstextboxsd">
                                <FaAccessibleIcon className='text-white text-3xl  ' />
                                <p className="text-justify text-white bg-gray-800 h-4/5 px-3 rounded-lg font-normal">{texto3}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>


    )

}

export default AboutPCD;