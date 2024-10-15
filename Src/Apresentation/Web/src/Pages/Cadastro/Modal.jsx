import React from 'react';
import { FaCheck } from "react-icons/fa";

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="h-20 w-80 rounded-3xl shadow-2xl flex 
                items-center justify-center gap-4 bg-white border-gray-400 border-2 cursor-pointer">
                <FaCheck className='text-4xl text-green-500 text-center ' />
                <h2 className="text-lg font-semibold">{message}</h2>
            </div>
        </div>
    );
};

export default Modal;
