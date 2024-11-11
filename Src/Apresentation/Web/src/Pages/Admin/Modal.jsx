import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { BsFillXSquareFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg'; // Ícone de loading

const Modal = ({ isOpen, message, Works }) => {
    const [loading, setLoading] = useState(true); // Estado para controlar o loading
    const [result, setResult] = useState(null); // Estado para o resultado

    useEffect(() => {
        if (isOpen) {
            // Simula um carregamento
            setLoading(true);
            const timer = setTimeout(() => {
                setResult(Works); // Define o resultado após 1 segundo
                setLoading(false);
            }, 1400); // Altere o tempo conforme necessário

            return () => clearTimeout(timer); // Limpa o timeout se o modal for fechado
        }
    }, [isOpen, Works]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="h-28 w-80 rounded-3xl shadow-2xl flex 
                items-center justify-center gap-6 bg-white border-gray-400 border-2">
                <div className='w-2/6 h-full flex items-center justify-center'>
                    {loading ? (
                        <CgSpinner className='text-4xl text-blue-500 animate-spin' /> // Ícone de loading
                    ) : result ? (
                        <FaCheck className='text-4xl text-green-500 text-center' />
                    ) : (
                        <BsFillXSquareFill className='text-4xl text-red-500 text-center' />
                    )}
                </div>
                <div className='w-4/6 h-full flex items-center justify-center px-4'>
                    <h2 className="text-base font-medium text-center">{message}</h2>
                </div>
            </div>
        </div>
    );
};

export default Modal;
