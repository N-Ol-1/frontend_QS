import React from 'react';

export const Header = ({ isSidebarVisible, setSidebarVisible, setNewMapVisible }) => {
  return (
    <div className="bg-[#fafafa] h-20 w-full flex items-center justify-between px-4 gap-2 fixed top-0 left-0 z-50">
      {/* Sidebar Toggle Button */}
      <button
        className="text-lg px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? 'Esconder mapas' : 'Consultar mapas'}
      </button>

      {/* New Map Button */}
      <button
        className="text-lg px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
        onClick={() => setNewMapVisible(true)} // Toggle visibility of NewMap
      >
        Criar mapa
      </button>

      {/* Header Title */}
      <div className="text-3xl text-[#50aeea] flex-grow text-center">
        UPT - Mapas de Avaliação
      </div>
    </div>
  );
};
