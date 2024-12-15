import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Initialize navigate using the useNavigate hook
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post('http://localhost:8080/api/v1/login', { email, password });
        if (response.data.userType === 'admin') {
          navigate('/admin'); // Redirect to Admin page */
        } else if (response.data.userType === 'user') {
          navigate('/user'); // Redirect to User page */
        }
      } catch (error) {
        alert(error.response?.data?.message || 'Erro a fazer o Login');
      }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-[url('./upt_background.jpg')] bg-cover bg-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-start mb-6">
          Mapas de Avaliação da Universidade Portucalense
        </h2>
        <form onSubmit={handleSubmit}>


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
            className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mb-2"
          >
            Log In
          </button>
          {error && ( // Display the error message
              <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </form>
      </div>
  </div>
);
};