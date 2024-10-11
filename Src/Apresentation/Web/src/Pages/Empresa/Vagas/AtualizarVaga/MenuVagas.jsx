import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { BsFillXSquareFill } from "react-icons/bs";

const MenuVagas = ({ AbrirVaga, VagaPreenchida, FecharVaga }) => {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <div className="fixed flex justify-center py-10 gap-2 inset-x-0 bottom-0 start-0 EditMenu">
            <button onClick={toggleMenu} type="button" className="bg-gray-700 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                {menuAberto ? (
                    <>
                        <BsFillXSquareFill className='text-3xl text-white text-center' />
                        <p className="text-white">Fechar </p>
                    </>
                ) : (
                    <>
                        <IoMenu className='text-3xl text-white text-center' />
                        <p className="text-white">Menu</p>
                    </>
                )}
            </button>

            {menuAberto && (
                <>
                    <button onClick={AbrirVaga} type="button" className="bg-green-400 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                        <FaUserFriends className='text-3xl text-white text-center' />
                        <p className="text-white">Abrir Vaga</p>
                    </button>

                    <button onClick={VagaPreenchida} type="button" className="bg-gray-700 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                        <MdEdit className='text-3xl text-white text-center ' />
                        <p className="text-white">Preencher Vaga</p>
                    </button>

                    <button onClick={FecharVaga} type="button" className="bg-red-400 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                        <MdDelete className='text-3xl text-white text-center' />
                        <p className="text-white">Fechar Vaga</p>
                    </button>
                </>
            )}
        </div>
    );
};

export default MenuVagas;
