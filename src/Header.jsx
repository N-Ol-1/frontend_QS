import React from 'react';

export const Header = ({ isSidebarVisible, setSidebarVisible }) => {
  return (
    <div className="bg-slate-100 h-20 w-full flex items-center justify-between px-4 border-2 border-black relative">
      {/* Sidebar Toggle Button */}
      {!isSidebarVisible && (
        <button
          className="text-lg px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
          onClick={() => setSidebarVisible(true)}
        >
          Consultar mapas
        </button>
      )}
      {/* Header Title */}
      <div className="text-3xl text-black flex-grow text-center">
        UPT - Mapas de Avaliação
      </div>
    </div>
  );
};
