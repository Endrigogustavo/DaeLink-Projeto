import React, { useState } from "react";
import { MdWork, MdWorkHistory, MdWorkOff } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
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
            
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 EditMenu z-20 py-4">
                <button onClick={toggleMenu} type="button" className="w-24 bg-gray-700 flex flex-col items-center rounded-2xl p-2 h-fit menuitenhover">
                    {menuAberto ? (
                        <>
                            <MdOutlineClose className='text-3xl text-white text-center' />
                            <p className="text-white">Fechar</p>
                        </>
                    ) : (
                        <>
                            <FiSettings className='text-3xl text-white text-center' />
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
