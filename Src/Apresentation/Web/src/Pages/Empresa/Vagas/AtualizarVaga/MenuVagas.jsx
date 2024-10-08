import React from "react";
import { FaUserFriends } from "react-icons/fa"
import { MdWork, MdDelete, MdEdit } from "react-icons/md";

const MenuVagas = ({ AbrirVaga, VagaPreenchida, FecharVaga }) => {

    return (

        <>
            <div className="fixed flex justify-center py-10 gap-2 inset-x-0 bottom-0 start-0">
                <button onClick={AbrirVaga} type="submit" class="bg-green-400 flex flex-col items-center rounded-2xl p-2 h-fit">
                    <FaUserFriends className='text-3xl text-white text-center' />
                    <p className="text-white">Abrir Vaga</p>
                </button>

                <button onClick={VagaPreenchida} type="submit" class="bg-gray-700 flex flex-col items-center rounded-2xl p-2 h-fit">
                    <MdEdit className='text-3xl text-white text-center ' />
                    <p className="text-white">Preencher Vaga</p>
                </button>

                <button onClick={FecharVaga} type="submit" class="bg-red-400 flex flex-col items-center rounded-2xl p-2 h-fit">
                    <MdDelete className='text-3xl text-white text-center' />
                    <p className="text-white">Fechar Vaga</p>
                </button>


            </div>

        </>
    )


}


export default MenuVagas;