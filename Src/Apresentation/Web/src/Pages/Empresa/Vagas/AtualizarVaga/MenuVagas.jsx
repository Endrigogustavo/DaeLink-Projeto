import React, { useState } from "react";
import { MdWork, MdWorkHistory, MdWorkOff } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

const MenuVagas = ({ AbrirVaga, VagaPreenchida, FecharVaga }) => {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <>
            {/* Overlay para escurecer a tela */}
            {menuAberto && <div className="overlay fixed inset-0 bg-black bg-opacity-50 z-10"></div>}

            {/* Menu principal */}
            <div className="fixed flex justify-center py-10 gap-2 inset-x-0 bottom-0 start-0 EditMenu z-20">
                <button onClick={toggleMenu} type="button" className="w-24 bg-gray-700 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                    {menuAberto ? (
                        <>
                            <MdOutlineClose className='text-3xl text-white text-center' />
                            <p className="text-white">Fechar</p>
                        </>
                    ) : (
                        <>
                            <IoMenu className='text-3xl text-white text-center' />
                            <p className="text-white">Situação</p>
                        </>
                    )}
                </button>

                {menuAberto && (
                    <>
                        <button onClick={AbrirVaga} type="button" className="w-24 bg-green-400 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                            <MdWork className='text-3xl text-white text-center' />
                            <p className="text-white">Abrir</p>
                        </button>

                        <button onClick={VagaPreenchida} type="button" className="w-24 bg-gray-700 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                            <MdWorkHistory className='text-3xl text-white text-center ' />
                            <p className="text-white">Preencher</p>
                        </button>

                        <button onClick={FecharVaga} type="button" className="w-24 bg-red-400 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                            <MdWorkOff className='text-3xl text-white text-center' />
                            <p className="text-white">Fechar</p>
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default MenuVagas;
