import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Fechar
        </button>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default Modal;
