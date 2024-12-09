import React, { useState } from 'react';

export const login = () => {
  const [isSigningUp, setIsSigningUp] = useState(false); // Alterna entre Login e Sign Up
  const [name, setName] = useState(''); // Campo de nome para Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSigningUp) {
      console.log('Sign Up action:');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      console.log('Log In action:');
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSigningUp ? 'Sign Up' : 'Mapas de Avaliação da Universidade Portucalense'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de Nome apenas no modo Sign Up */}
          {isSigningUp && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mb-2"
          >
            {isSigningUp ? 'Sign Up' : 'Log In'}
          </button>
          <button
            type="button"
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            {isSigningUp ? 'Switch to Log In' : 'Switch to Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};
