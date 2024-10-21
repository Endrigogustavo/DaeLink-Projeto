import React from "react";

const ConfirmModal = ({ isWorksModal, onConfirm, onClose, message }) => {
  if (!isWorksModal) return null; // Evita renderizar o modal se `isWorksModal` for falso

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="h-36 w-80 rounded-3xl shadow-2xl flex flex-col items-center justify-center bg-white border-gray-400 border-2">
        <div className="w-full h-3/6 flex flex-col items-center justify-center text-center gap-2 pt-1">

          <h2 className="text-lg font-medium text-center">{message}</h2>

        </div>

        <div className="w-full h-3/6 flex items-center justify-center gap-2">
          <button
            onClick={onConfirm}
            className="w-32 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full transition-all"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="w-32 bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition-all"
          >
            Cancelar
          </button>

        </div>
      </div>

    </div>
  );
};

export default ConfirmModal;
