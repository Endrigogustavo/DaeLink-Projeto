import React from 'react';
import { FaCheck } from "react-icons/fa";

const Modal = ({ isOpen, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="h-28 w-80 rounded-3xl shadow-2xl flex 
                items-center justify-center gap-6 bg-white border-gray-400 border-2">
                <div className='w-2/6 h-full flex items-center justify-center'>
                    <FaCheck className='text-4xl text-green-500 text-center ' />
                </div>
                <div className='w-4/6 h-full flex items-center justify-center px-4'>
                    <h2 className="text-base font-medium text-center">{message}</h2>
                </div>
            </div>
        </div>
    );
};

export default Modal;
